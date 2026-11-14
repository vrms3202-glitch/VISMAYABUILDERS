(() => {
  "use strict";

  const WHATSAPP_NUMBER = "919846619455";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const dateInput = document.querySelector("#date");
  if (dateInput) {
    // Prevent selecting a date in the past; use local calendar date.
    const now = new Date();
    const localToday = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");
    dateInput.min = localToday;
  }

  const form = document.querySelector("#appointmentForm");
  const status = document.querySelector("#formStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const date = String(data.get("date") || "").trim();
      const time = String(data.get("time") || "").trim();
      const details = String(data.get("message") || "").trim();

      const message = [
        "🏗️ *NEW APPOINTMENT REQUEST*",
        "",
        "*VISMAYA BUILDERS*",
        "--------------------------",
        `👤 Name: ${name}`,
        `📞 Phone: ${phone}`,
        `📧 Email: ${email || "Not provided"}`,
        `🔨 Service: ${service}`,
        `📅 Appointment Date: ${date}`,
        `⏰ Appointment Time: ${time}`,
        details ? `📝 Project Details: ${details}` : "",
        "--------------------------",
        "Please contact me to confirm this appointment."
      ].filter(Boolean).join("\n");

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      if (status) {
        status.textContent = "Opening WhatsApp with your appointment request…";
      }

      const whatsappWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");
      if (!whatsappWindow) {
        // Fallback for browsers that block a new tab.
        window.location.href = whatsappURL;
      }
    });
  }
})();
