import panelCss from "./panel.css?inline";

const HOST_ID = "legal-ai-companion-root";
const ALLOWED_ORIGIN = "https://internet.garant.ru";
const MAX_SELECTION_LENGTH = 12_000;
const DEFAULT_QUESTION = "Объясните выделенный фрагмент простыми словами.";
const MOCK_RESPONSE =
  "Демонстрационный ответ: выделенный фрагмент получен. Для юридического анализа потребуется подключение проверяемого источника.";

type State = {
  isOpen: boolean;
  lastSelection: string;
  capturedText: string;
  mockResponse: string;
};

export type CompanionController = {
  host: HTMLElement;
  destroy: () => void;
};

export function isAllowedPage(location: Pick<Location, "origin">): boolean {
  return location.origin === ALLOWED_ORIGIN;
}

function installStyles(shadow: ShadowRoot): void {
  if (
    "adoptedStyleSheets" in shadow &&
    typeof CSSStyleSheet !== "undefined" &&
    "replaceSync" in CSSStyleSheet.prototype
  ) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(panelCss);
    shadow.adoptedStyleSheets = [sheet];
    return;
  }

  const style = shadow.ownerDocument.createElement("style");
  style.textContent = panelCss;
  shadow.append(style);
}

export function mountLegalAiCompanion(
  doc: Document = document,
  pageWindow: Window = window
): CompanionController | null {
  if (doc.getElementById(HOST_ID)) return null;

  const state: State = {
    isOpen: false,
    lastSelection: "",
    capturedText: "",
    mockResponse: ""
  };

  const host = doc.createElement("div");
  host.id = HOST_ID;
  host.style.all = "initial";
  const shadow = host.attachShadow({ mode: "open" });
  installStyles(shadow);

  const app = doc.createElement("div");
  app.className = "app";
  app.innerHTML = `
    <button class="launcher" type="button" aria-expanded="false" aria-controls="legal-ai-panel">
      Открыть помощника
    </button>
    <aside class="panel" id="legal-ai-panel" aria-label="Legal AI Companion" hidden>
      <header class="header">
        <h2 tabindex="-1">Legal AI Companion</h2>
        <button class="close" type="button" aria-label="Закрыть панель">×</button>
      </header>
      <div class="actions">
        <button class="secondary capture" type="button">Захватить выделение</button>
        <button class="primary send" type="button" disabled>Отправить</button>
      </div>
      <p class="hint" role="status" aria-live="polite"></p>
      <section class="card" aria-labelledby="preview-heading">
        <h3 id="preview-heading">Предпросмотр</h3>
        <p class="content preview placeholder">Выделите текст на странице и нажмите «Захватить выделение».</p>
      </section>
      <label class="question-label" for="legal-ai-question">Вопрос</label>
      <textarea id="legal-ai-question" class="question" rows="3" maxlength="1000">${DEFAULT_QUESTION}</textarea>
      <section class="card" aria-labelledby="response-heading">
        <h3 id="response-heading">Ответ</h3>
        <p class="content response placeholder">Ответ появится после отправки.</p>
      </section>
      <p class="status">Демонстрационный ответ. Правовые нормы не проверялись</p>
    </aside>
  `;
  shadow.append(app);
  doc.documentElement.append(host);

  const launcher = shadow.querySelector<HTMLButtonElement>(".launcher")!;
  const panel = shadow.querySelector<HTMLElement>(".panel")!;
  const heading = shadow.querySelector<HTMLElement>("h2")!;
  const closeButton = shadow.querySelector<HTMLButtonElement>(".close")!;
  const captureButton = shadow.querySelector<HTMLButtonElement>(".capture")!;
  const sendButton = shadow.querySelector<HTMLButtonElement>(".send")!;
  const hint = shadow.querySelector<HTMLElement>(".hint")!;
  const preview = shadow.querySelector<HTMLElement>(".preview")!;
  const question = shadow.querySelector<HTMLTextAreaElement>(".question")!;
  const response = shadow.querySelector<HTMLElement>(".response")!;
  let contextUrl = pageWindow.location.href;

  const resetContent = (message: string): void => {
    state.lastSelection = "";
    state.capturedText = "";
    state.mockResponse = "";
    preview.textContent = "Выделите текст на странице и нажмите «Захватить выделение».";
    preview.classList.add("placeholder");
    response.textContent = "Ответ появится после отправки.";
    response.classList.add("placeholder");
    hint.textContent = message;
    sendButton.disabled = true;
  };

  const ensureFreshContext = (): boolean => {
    if (pageWindow.location.href === contextUrl) return false;
    contextUrl = pageWindow.location.href;
    resetContent("Документ изменился. Выделите нужный текст заново.");
    return true;
  };

  const readSelection = (): string => pageWindow.getSelection()?.toString().trim() ?? "";

  const rememberSelection = (): void => {
    if (ensureFreshContext()) return;
    const selectedText = readSelection();
    if (selectedText) state.lastSelection = selectedText;
  };

  const openPanel = (): void => {
    ensureFreshContext();
    state.isOpen = true;
    panel.hidden = false;
    launcher.hidden = true;
    launcher.setAttribute("aria-expanded", "true");
    heading.focus();
  };

  const closePanel = (): void => {
    state.isOpen = false;
    panel.hidden = true;
    launcher.hidden = false;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  };

  const captureSelection = (): void => {
    if (ensureFreshContext()) return;
    rememberSelection();
    if (!state.lastSelection) {
      hint.textContent = "Сначала выделите текст на странице.";
      return;
    }
    if (state.lastSelection.length > MAX_SELECTION_LENGTH) {
      resetContent(
        `Выделение слишком длинное: максимум ${MAX_SELECTION_LENGTH.toLocaleString("ru-RU")} символов.`
      );
      return;
    }

    state.capturedText = state.lastSelection;
    state.mockResponse = "";
    preview.textContent = state.capturedText;
    preview.classList.remove("placeholder");
    response.textContent = "Ответ появится после отправки.";
    response.classList.add("placeholder");
    hint.textContent = "Выделение добавлено в предпросмотр.";
    sendButton.disabled = false;
  };

  const send = (): void => {
    if (ensureFreshContext()) return;
    if (!state.capturedText) return;
    const submittedQuestion = question.value.trim() || DEFAULT_QUESTION;
    state.mockResponse = `${MOCK_RESPONSE}\n\nВопрос: ${submittedQuestion}`;
    response.textContent = state.mockResponse;
    response.classList.remove("placeholder");
    hint.textContent = "Показан демонстрационный ответ без сетевого запроса.";
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && state.isOpen) closePanel();
  };

  doc.addEventListener("keydown", onKeyDown);
  launcher.addEventListener("pointerdown", rememberSelection);
  launcher.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);
  captureButton.addEventListener("pointerdown", rememberSelection);
  captureButton.addEventListener("click", captureSelection);
  sendButton.addEventListener("click", send);

  return {
    host,
    destroy: () => {
      doc.removeEventListener("keydown", onKeyDown);
      host.remove();
    }
  };
}

if (window.top === window && isAllowedPage(window.location)) {
  mountLegalAiCompanion();
}
