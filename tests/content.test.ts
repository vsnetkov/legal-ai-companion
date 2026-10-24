import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isAllowedPage,
  mountLegalAiCompanion,
  type CompanionController
} from "../src/content";

let controller: CompanionController | null = null;

afterEach(() => {
  controller?.destroy();
  controller = null;
  document.body.replaceChildren();
  history.replaceState({}, "", "/");
});

function mount() {
  controller = mountLegalAiCompanion();
  const shadow = controller!.host.shadowRoot!;
  return {
    shadow,
    launcher: shadow.querySelector<HTMLButtonElement>(".launcher")!,
    panel: shadow.querySelector<HTMLElement>(".panel")!,
    close: shadow.querySelector<HTMLButtonElement>(".close")!,
    capture: shadow.querySelector<HTMLButtonElement>(".capture")!,
    send: shadow.querySelector<HTMLButtonElement>(".send")!,
    preview: shadow.querySelector<HTMLElement>(".preview")!,
    question: shadow.querySelector<HTMLTextAreaElement>(".question")!,
    response: shadow.querySelector<HTMLElement>(".response")!,
    status: shadow.querySelector<HTMLElement>(".status")!,
    hint: shadow.querySelector<HTMLElement>(".hint")!
  };
}

function select(text: string) {
  vi.spyOn(window, "getSelection").mockReturnValue({
    toString: () => text
  } as Selection);
}

describe("Legal AI Companion", () => {
  it("не монтируется автоматически на неразрешённом сайте", () => {
    expect(window.location.hostname).toBe("example.test");
    expect(document.querySelector("#legal-ai-companion-root")).toBeNull();
  });

  it("разрешает только точный HTTPS origin", () => {
    expect(isAllowedPage(new URL("https://internet.garant.ru/document/1"))).toBe(true);
    expect(isAllowedPage(new URL("http://internet.garant.ru/document/1"))).toBe(false);
    expect(isAllowedPage(new URL("https://sub.internet.garant.ru/"))).toBe(false);
  });

  it("создаёт только один Shadow DOM host", () => {
    const ui = mount();

    expect(ui.shadow.mode).toBe("open");
    expect(mountLegalAiCompanion()).toBeNull();
    expect(document.querySelectorAll("#legal-ai-companion-root")).toHaveLength(1);
  });

  it("открывает, закрывает кнопкой и возвращает фокус", () => {
    const ui = mount();

    ui.launcher.click();
    expect(ui.panel.hidden).toBe(false);
    expect(ui.launcher.getAttribute("aria-expanded")).toBe("true");

    ui.close.click();
    expect(ui.panel.hidden).toBe(true);
    expect(ui.launcher.getAttribute("aria-expanded")).toBe("false");
    expect(ui.shadow.activeElement).toBe(ui.launcher);
  });

  it("закрывается по Escape", () => {
    const ui = mount();
    ui.launcher.click();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(ui.panel.hidden).toBe(true);
    expect(ui.shadow.activeElement).toBe(ui.launcher);
  });

  it("просит выделить текст и не разрешает отправку", () => {
    const ui = mount();
    select("   ");

    ui.capture.click();

    expect(ui.hint.textContent).toContain("Сначала выделите");
    expect(ui.send.disabled).toBe(true);
  });

  it("показывает предпросмотр и детерминированный mock-ответ", () => {
    const ui = mount();
    select("Статья 1. Тестовая норма.");

    ui.capture.click();
    expect(ui.preview.textContent).toBe("Статья 1. Тестовая норма.");
    expect(ui.send.disabled).toBe(false);

    ui.send.click();
    expect(ui.response.textContent).toContain("Демонстрационный ответ");
    expect(ui.response.textContent).toContain("Объясните выделенный фрагмент простыми словами.");
    expect(ui.status.textContent).toBe("Демонстрационный ответ. Правовые нормы не проверялись");
  });

  it("принимает короткий пользовательский вопрос как безопасный текст", () => {
    const ui = mount();
    select("Правовая норма");
    ui.capture.click();
    ui.question.value = '<img src=x onerror="alert(1)"> Что это значит?';

    ui.send.click();

    expect(ui.response.textContent).toContain(ui.question.value);
    expect(ui.response.querySelector("img")).toBeNull();
  });

  it("сбрасывает ответ после нового захвата", () => {
    const ui = mount();
    select("Первый фрагмент");
    ui.capture.click();
    ui.send.click();

    select("Второй фрагмент");
    ui.capture.click();

    expect(ui.preview.textContent).toBe("Второй фрагмент");
    expect(ui.response.textContent).toBe("Ответ появится после отправки.");
  });

  it("принимает 12 000 символов и отклоняет 12 001", () => {
    const ui = mount();
    select("а".repeat(12_000));
    ui.capture.click();
    expect(ui.send.disabled).toBe(false);

    select("б".repeat(12_001));
    ui.capture.click();

    expect(ui.send.disabled).toBe(true);
    expect(ui.hint.textContent).toContain("максимум 12 000 символов");
  });

  it("показывает HTML-подобный текст как инертный текст", () => {
    const ui = mount();
    const hostile = '<script>window.pwned = true</script><img src=x onerror="alert(1)"> **текст**';
    select(hostile);

    ui.capture.click();

    expect(ui.preview.textContent).toBe(hostile);
    expect(ui.preview.querySelector("script")).toBeNull();
    expect(ui.preview.querySelector("img")).toBeNull();
  });

  it("сбрасывает контекст после смены маршрута", () => {
    const ui = mount();
    select("Старый документ");
    ui.capture.click();
    ui.send.click();

    history.pushState({}, "", "/new-document");
    ui.send.click();

    expect(ui.send.disabled).toBe(true);
    expect(ui.preview.textContent).not.toContain("Старый документ");
    expect(ui.hint.textContent).toContain("Документ изменился");
  });

  it("не выполняет сетевые вызовы", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const xhrSpy = vi.spyOn(XMLHttpRequest.prototype, "open");
    const ui = mount();
    select("Локальный фрагмент");

    ui.capture.click();
    ui.send.click();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSpy).not.toHaveBeenCalled();
  });
});
