const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

function closeMenu() {
  if (!menuButton || !mobileNav) return;

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  mobileNav.hidden = true;
  document.body.classList.remove("menu-open");
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";

    menuButton.setAttribute("aria-expanded", String(opening));

    menuButton.setAttribute(
      "aria-label",
      opening ? "Fechar menu" : "Abrir menu",
    );

    mobileNav.hidden = !opening;
    document.body.classList.toggle("menu-open", opening);
  });
}

if (mobileNav) {
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    closeMenu();
  }
});

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const profileResults = {
  rotina: {
    title: "Você precisa de uma estratégia que simplifique.",

    text: "Seu primeiro passo pode ser organizar escolhas práticas para os dias corridos, sem buscar uma rotina perfeita. No acompanhamento, o plano nasce da agenda que você já tem.",
  },

  culpa: {
    title: "Você precisa recuperar a tranquilidade ao comer.",

    text: "Seu primeiro passo pode ser sair do ciclo de proibição e compensação. O acompanhamento ajuda a construir equilíbrio, clareza e escolhas sem culpa.",
  },

  resultado: {
    title: "Você precisa de um processo que consiga sustentar.",

    text: "Seu primeiro passo pode ser trocar soluções rápidas por uma estratégia individual, acompanhada e ajustada ao longo do caminho.",
  },
};

const mapQuestion = document.querySelector("#map-question");

const mapResult = document.querySelector("#map-result");

const resultTitle = document.querySelector("#result-title");

const resultText = document.querySelector("#result-text");

const progressBar = document.querySelector(".map-progress span");

document.querySelectorAll(".map-options button").forEach((button) => {
  button.addEventListener("click", () => {
    const result = profileResults[button.dataset.profile];

    if (
      !result ||
      !mapQuestion ||
      !mapResult ||
      !resultTitle ||
      !resultText ||
      !progressBar
    ) {
      return;
    }

    resultTitle.textContent = result.title;
    resultText.textContent = result.text;

    mapQuestion.hidden = true;
    mapResult.hidden = false;
    progressBar.style.width = "100%";
  });
});

const mapReset = document.querySelector("#map-reset");

if (mapReset && mapResult && mapQuestion && progressBar) {
  mapReset.addEventListener("click", () => {
    mapResult.hidden = true;
    mapQuestion.hidden = false;
    progressBar.style.width = "50%";
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}
