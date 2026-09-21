document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  document.querySelectorAll("pre").forEach((block) => {
    if (block.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
      const code = block.querySelector("code");
      const text = code ? code.textContent : block.textContent;

      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 2000);
    });

    block.style.position = "relative";
    block.appendChild(button);
  });

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.setAttribute("aria-expanded", "false");

    header.addEventListener("click", () => {
      const accordion = header.closest(".accordion");
      const content = header.nextElementSibling;
      const isOpen = accordion.classList.contains("open");

      document.querySelectorAll(".accordion").forEach((item) => {
        item.classList.remove("open");
        const panel = item.querySelector(".accordion-content");
        const toggle = item.querySelector(".accordion-header");
        if (panel) panel.style.maxHeight = null;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });

      if (!isOpen && content) {
        accordion.classList.add("open");
        header.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
