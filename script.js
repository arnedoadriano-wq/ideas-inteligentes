const promptForm = document.querySelector("#prompt-form");
const goalField = document.querySelector("#goal");
const toneField = document.querySelector("#tone");
const audienceField = document.querySelector("#audience");
const resultBox = document.querySelector("#prompt-result");
const promptOutput = document.querySelector("#prompt-output");
const copyButton = document.querySelector("#copy-prompt");
const copyFeedback = document.querySelector("#copy-feedback");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (promptForm && goalField && toneField && audienceField && resultBox && promptOutput) {
  promptForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const goal = goalField.value.trim();
    if (!goal) {
      goalField.focus();
      return;
    }

    promptOutput.textContent = `Actúa como un asistente experto y ${toneField.value}. Ayúdame a ${goal}. Escribe la respuesta ${audienceField.value}. Si te falta información importante, hazme preguntas antes de responder. Organiza la respuesta de forma clara y señala cualquier dato que deba verificar.`;
    resultBox.hidden = false;
    if (copyFeedback) copyFeedback.textContent = "";
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

if (copyButton && promptOutput && copyFeedback) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(promptOutput.textContent);
      copyFeedback.textContent = "Prompt copiado al portapapeles.";
    } catch (error) {
      copyFeedback.textContent = "No se pudo copiar automáticamente. Selecciona y copia el texto.";
    }
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("is-open", !isExpanded);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
