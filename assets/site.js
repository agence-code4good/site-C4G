/* Remplace les deux interactions qui dépendaient du JavaScript Framer :
   le menu mobile (hamburger) et l'ouverture des questions de la FAQ. */
(function () {
  var FAQ = {"Combien coûte un projet avec Code4Good ?": "<p class=\"framer-text\" style=\"--font-selector:R0Y7Q2hpdm8tcmVndWxhcg==;--framer-font-family:&quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif;--framer-font-size:12px;--framer-line-height:20px;--framer-text-color:var(--extracted-r6o4lv, rgb(93, 97, 105))\">Chaque projet est unique, et notre rôle, c’est de vous proposer la solution la plus adaptée à vos enjeux et à vos moyens. Que ce soit en no-code, avec un Excel bien pensé, ou via des technologies robustes et éprouvées, on trouve toujours un point de départ viable, testable, et pérenne. On vous aide à prioriser, pour avancer avec l’essentiel et poser des bases solides pour la suite.<\/p>", "Est-ce que vous travaillez avec des petites structures ?": "<p class=\"framer-text\" style=\"--font-selector: R0Y7Q2hpdm8tcmVndWxhcg==; --framer-font-family: &quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif; --framer-font-size: 14px; --framer-line-height: 20px; --framer-text-color: var(--extracted-r6o4lv, rgb(93, 97, 105));\">Oui ! Nous accompagnons aussi bien des startups, des associations ou des PME que des structures plus grandes. Tant qu’il y a un besoin métier et une envie de co-construire, nous sommes là. Nous adaptons notre approche selon vos moyens et vos ressources.<\/p>", "Est-ce que vous êtes une agence web ?": "<p class=\"framer-text\" style=\"--font-selector: R0Y7Q2hpdm8tcmVndWxhcg==; --framer-font-family: &quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif; --framer-font-size: 14px; --framer-line-height: 20px; --framer-text-color: var(--extracted-r6o4lv, rgb(93, 97, 105));\">Oui, mais pas comme les autres.  Code4Good est une agence spécialisée dans la conception de solutions numériques sur mesure : sites web, applications métiers, automatisation de process, intégration d’outils no-code...  Notre différence ?  Nous plongeons dans votre métier pour concevoir des outils qui s’alignent à vos pratiques, vos utilisateurs et vos objectifs.  Pas de solutions génériques, pas de copié-collé : chaque projet est pensé sur mesure, avec une vraie logique de partenariat.<\/p>", "Faites-vous du no-code ou du développement classique ?": "<p class=\"framer-text\" style=\"--font-selector: R0Y7Q2hpdm8tcmVndWxhcg==; --framer-font-family: &quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif; --framer-font-size: 14px; --framer-line-height: 20px; --framer-text-color: var(--extracted-r6o4lv, rgb(93, 97, 105));\">Les deux ! Nous utilisons le no-code (Airtable, Make, Webflow...) quand cela permet d'aller plus vite et de réduire les coûts, et le développement sur mesure quand les besoins sont plus spécifiques. Nous mixons souvent les deux, pour offrir le meilleur compromis entre performance, agilité et budget.<\/p>", "Comment se passe un projet avec Code4Good ?": "<p class=\"framer-text\" style=\"--font-selector: R0Y7Q2hpdm8tcmVndWxhcg==; --framer-font-family: &quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif; --framer-font-size: 14px; --framer-line-height: 20px; --framer-text-color: var(--extracted-r6o4lv, rgb(93, 97, 105));\">Dès le démarrage, on avance ensemble et en toute transparence. 🔁 Un point hebdo dès le lancement  Une fois le projet lancé, nous organisons un rendez-vous chaque semaine pour suivre l’avancement, faire des démonstrations, ajuster les priorités ou répondre à vos questions. Cela nous permet de rester parfaitement alignés, sans mauvaise surprise. 💬 On parle votre langue (pas celle des développeurs)  On sait que la technique peut parfois sembler obscure. C’est pourquoi nous faisons un vrai effort de vulgarisation à chaque étape : vous savez toujours où on en est, ce qu’on fait, pourquoi on le fait, et ce que ça change concrètement pour vous et vos utilisateurs.<\/p>", "Est-ce que vous travaillez à distance ?": "<p class=\"framer-text\" style=\"--font-selector: R0Y7Q2hpdm8tcmVndWxhcg==; --framer-font-family: &quot;Chivo&quot;, &quot;Chivo Placeholder&quot;, sans-serif; --framer-font-size: 14px; --framer-line-height: 20px; --framer-text-color: var(--extracted-r6o4lv, rgb(93, 97, 105));\">Oui, mais pas uniquement.  Nous avons une agence à Bordeaux et sommes toujours ravis de rencontrer nos clients en personne ☕️.  En parallèle, nous avons l’habitude de travailler à distance de façon fluide et structurée : points réguliers en visio, outils collaboratifs (Notion, Trello, Slack…), réactivité… Tout est pensé pour avancer efficacement, que vous soyez à deux pas ou à l’autre bout de la France.<\/p>"};
  // Adresse du formulaire Formspree (https://formspree.io/f/xxxxxxx).
  // Tant qu'elle est vide, le formulaire ouvre la messagerie du visiteur vers CONTACT_EMAIL.
  var FORM_ENDPOINT = "";
  var CONTACT_EMAIL = "contact@code4good.fr";

  // --- Formulaire de contact ---------------------------------------------
  document.querySelectorAll("form[data-c4g-form]").forEach(function (form) {
    var label = form.querySelector('button[type="submit"] span, button[type="submit"] p');
    var initial = label ? label.textContent : "";
    function say(t) { if (label) label.textContent = t; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if (data.get("_gotcha")) return;
      if (!FORM_ENDPOINT) {
        var body = ["Nom", "Prénom", "email", "Service", "Message"].map(function (k) { return k + " : " + (data.get(k) || ""); }).join("\n");
        location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Demande depuis le site") + "&body=" + encodeURIComponent(body);
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; say("Envoi…");
      fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          location.href = "./thankyou";
        })
        .catch(function () {
          btn.disabled = false;
          say("Échec de l'envoi, réessayez ou écrivez à " + CONTACT_EMAIL);
          setTimeout(function () { say(initial); }, 6000);
        });
    });
  });

  // --- Menu mobile -------------------------------------------------------
  var NAV_OPEN = "framer-v-1ovu340", NAV_CLOSED = "framer-v-1whza1x";
  var OPEN_LINK_STYLE = ';--framer-font-family:"Chivo","Chivo Placeholder",sans-serif;--framer-font-size:24px;--framer-font-weight:600;--framer-line-height:1.4em;--framer-text-alignment:left';

  function toggleMenu(nav) {
    var open = nav.classList.contains(NAV_OPEN);
    nav.classList.toggle(NAV_OPEN, !open);
    nav.classList.toggle(NAV_CLOSED, open);
    nav.setAttribute("data-framer-name", open ? "Phone" : "Phone Open");
    nav.querySelectorAll('[data-framer-name="Links"] p').forEach(function (p) {
      if (p.dataset.c4gStyle === undefined) p.dataset.c4gStyle = p.getAttribute("style") || "";
      p.setAttribute("style", open ? p.dataset.c4gStyle : p.dataset.c4gStyle + OPEN_LINK_STYLE);
    });
    var icon = nav.querySelector('[data-framer-name="Icon"]');
    var top = icon.querySelector('[data-framer-name="Top"]'), bottom = icon.querySelector('[data-framer-name="Bottom"]');
    top.style.transform = open ? "" : "rotate(45deg)";
    bottom.style.transform = open ? "" : "rotate(-45deg)";
    icon.setAttribute("aria-expanded", String(!open));
  }

  document.querySelectorAll("nav." + NAV_CLOSED + ' [data-framer-name="Icon"]').forEach(function (icon) {
    icon.setAttribute("role", "button");
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("aria-label", "Menu");
    icon.setAttribute("aria-expanded", "false");
    icon.style.cursor = "pointer";
  });

  // --- FAQ ---------------------------------------------------------------
  function texts(item) { return item.querySelectorAll('[data-framer-component-type="RichTextContainer"]'); }
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function toggleFaq(item, fromKeyboard) {
    var name = item.getAttribute("data-framer-name");
    var isOpen = /Open$/.test(name);
    var prefix = name.indexOf("Mobile") >= 0 ? "FAQ Mobile - " : "FAQ ";
    var tpl = TPL[prefix + (isOpen ? "Default" : "Open")];
    if (!tpl) return;
    var t = texts(item), question = norm(t[t.length - 1].textContent);
    var clone = tpl.cloneNode(true), ct = texts(clone);
    ct[ct.length - 1].querySelector("p").textContent = question;
    if (!isOpen) ct[0].innerHTML = FAQ[question] || "";
    clone.setAttribute("aria-expanded", String(!isOpen));
    item.replaceWith(clone);
    if (fromKeyboard) clone.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-framer-name^="FAQ "]').forEach(function (el) {
    if (el.getAttribute("data-framer-name") === "FAQ section") return;
    el.setAttribute("role", "button");
    el.setAttribute("aria-expanded", String(/Open$/.test(el.getAttribute("data-framer-name"))));
    el.style.cursor = "pointer";
  });
  var TPL = {};
  ["FAQ Open", "FAQ Default", "FAQ Mobile - Open", "FAQ Mobile - Default"].forEach(function (name) {
    var el = document.querySelector('[data-framer-name="' + name + '"]');
    if (el) TPL[name] = el.cloneNode(true);
  });

  // --- Délégation des clics et du clavier ----------------------------------
  function handle(target, fromKeyboard) {
    var icon = target.closest('nav [data-framer-name="Icon"]');
    if (icon) { toggleMenu(icon.closest("nav")); return true; }
    var item = target.closest('[data-framer-name^="FAQ "]');
    if (item && item.getAttribute("data-framer-name") !== "FAQ section") { toggleFaq(item, fromKeyboard); return true; }
    return false;
  }
  document.addEventListener("click", function (e) { handle(e.target, false); });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && handle(e.target, true)) e.preventDefault();
  });
  // Pas de contour au clic souris, seulement au clavier
  var st = document.createElement("style");
  st.textContent = '[data-framer-name^="FAQ "]:focus:not(:focus-visible){outline:none}';
  document.head.appendChild(st);
})();
