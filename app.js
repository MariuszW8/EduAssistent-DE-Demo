let role = "Lehrkraft";
let mod = "Unterrichtsplanung";

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function choose(r) {
  role = r;
  document.getElementById("roleHeadline").textContent = "Module für " + r;
  show("modules");
}

function moduleDemo(m) {
  mod = m;
  document.getElementById("moduleHeadline").textContent = m;
  show("generator");
}

function startChat() {
  const box = document.getElementById("chatbox");
  box.innerHTML = "";
  const msgs = [
    ["ai", "Guten Tag. Ich bin EduAssistent 4.2 mit Gemini Live und EduChat 3Q. Welche pädagogische Aufgabe möchten Sie vorbereiten?"],
    ["user", "Ich möchte eine Unterrichtsstunde zu KI in Klasse 9 zeigen."],
    ["ai", "Ich kann Lernziele, Ablauf, Materialien, Quiz und Reflexion live generieren."],
    ["user", "Bitte mit verantwortungsvoller KI-Nutzung."],
    ["ai", "Öffnen Sie jetzt ein Modul. Die Antwort wird über Gemini Flash erzeugt."]
  ];
  msgs.forEach((m, i) => setTimeout(() => {
    const d = document.createElement("div");
    d.className = "msg " + m[0];
    d.textContent = m[1];
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
  }, i * 650));
}

async function run() {
  show("working");
  ["p1", "p2", "p3", "p4", "p5"].forEach(id => document.getElementById(id).classList.remove("active"));
  const term = document.getElementById("terminal");
  term.textContent = "";

  const logs = [
    "✓ Formular gelesen",
    "✓ Anfrage an Vercel API vorbereitet",
    "✓ Gemini 2.5 Flash wird aufgerufen",
    "✓ Pädagogische Struktur wird erzeugt",
    "✓ Ergebnis wird formatiert",
    "✓ Ausgabe vorbereitet"
  ];

  ["p1", "p2", "p3", "p4", "p5"].forEach((id, i) =>
    setTimeout(() => document.getElementById(id).classList.add("active"), i * 450)
  );
  logs.forEach((l, i) => setTimeout(() => term.textContent += l + "\n", i * 380));

  const topic = document.getElementById("topic").value.trim();
  const group = document.getElementById("group").value.trim();

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, module: mod, topic, group })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API-Fehler");
    }

    renderResult(data.text, topic, group, true);
  } catch (error) {
    const fallback = fallbackResult(topic, group);
    renderResult(
      fallback + `\n\nHinweis: Live-API konnte nicht erreicht werden. Technische Meldung: ${error.message}`,
      topic,
      group,
      false
    );
  }
}

function markdownToHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.*)$/gm, "<h4>$1</h4>")
    .replace(/^## (.*)$/gm, "<h3>$1</h3>")
    .replace(/^# (.*)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/^\s*[-•]\s+(.*)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`)
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

function renderResult(text, topic, group, live) {
  const status = live
    ? "<span class='live'>Gemini Live</span>"
    : "<span class='offline'>Fallback</span>";
  document.getElementById("doc").innerHTML = `
    <h3>${mod} ${status}</h3>
    <p><b>Rolle:</b> ${role}<br><b>Thema:</b> ${topic}<br><b>Zielgruppe:</b> ${group}</p>
    <div class="generated"><p>${markdownToHtml(text)}</p></div>
    <p><b>Enterprise-Logik:</b> Formular → Vercel API → Gemini Flash → strukturierte Ausgabe → später DOCX/PDF.</p>
  `;
  show("result");
}

function fallbackResult(topic, group) {
  return `# ${mod}\n\n## Ausgangslage\nThema: ${topic}. Zielgruppe: ${group}.\n\n## Ziele\n- Lernende arbeiten strukturiert und reflektiert.\n- Die Aufgabe wird klar, altersgerecht und verantwortungsvoll umgesetzt.\n\n## Umsetzung\n- Einstieg mit kurzer Aktivierung.\n- Arbeitsphase mit klaren Schritten.\n- Sicherung der Ergebnisse.\n- Reflexion und Transfer.\n\n## Empfehlung\nBitte prüfen Sie die API-Konfiguration in Vercel: GEMINI_API_KEY und Deployment.`;
}

function toast(t) {
  alert(t);
}

// EduAssistent 4.2 — EduChat Live, Limit 3 Fragen
let eduChatCount = 0;
const EDUCHAT_LIMIT = 3;

function addLiveChatMessage(type, text) {
  const box = document.getElementById("livechatbox");
  const d = document.createElement("div");
  d.className = "msg " + type;
  d.textContent = text;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

function updateChatCounter() {
  const counter = document.getElementById("chatCounter");
  const btn = document.getElementById("askBtn");
  if (counter) counter.textContent = `${eduChatCount}/${EDUCHAT_LIMIT}`;
  if (btn && eduChatCount >= EDUCHAT_LIMIT) {
    btn.disabled = true;
    btn.textContent = "Limit von 3 Fragen erreicht";
  } else if (btn) {
    btn.disabled = false;
    btn.textContent = "Zapytaj Gemini";
  }
}

async function askEduChat() {
  const input = document.getElementById("chatQuestion");
  const question = input.value.trim();

  if (!question) {
    toast("Geben Sie eine Frage an EduAssistent ein.");
    return;
  }

  if (eduChatCount >= EDUCHAT_LIMIT) {
    addLiveChatMessage("ai", "Das Fragenlimit der Konferenzversion ist erreicht. Öffnen Sie die Module, um die Demonstration fortzusetzen.");
    updateChatCounter();
    return;
  }

  eduChatCount += 1;
  updateChatCounter();
  addLiveChatMessage("user", question);
  input.value = "";
  addLiveChatMessage("ai", "Gemini Flash bereitet die Antwort vor...");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "chat",
        role: "EduChat Live",
        module: "Kurze Konferenzantwort",
        topic: question,
        group: "uczestnicy konferencji edukacyjnej",
        question
      })
    });

    const data = await response.json();
    const box = document.getElementById("livechatbox");
    const last = box.lastElementChild;
    if (!response.ok) throw new Error(data.error || "API-Fehler");
    if (last && last.textContent.includes("Gemini Flash")) last.remove();
    addLiveChatMessage("ai", data.text);
  } catch (error) {
    const box = document.getElementById("livechatbox");
    const last = box.lastElementChild;
    if (last && last.textContent.includes("Gemini Flash")) last.remove();
    addLiveChatMessage("ai", "Verbindung zu Gemini fehlgeschlagen. Prüfen Sie GEMINI_API_KEY und die Vercel-Logs. Meldung: " + error.message);
  }
}

function resetEduChat() {
  eduChatCount = 0;
  const box = document.getElementById("livechatbox");
  box.innerHTML = '<div class="msg ai">Der Chat wurde geleert. Sie können erneut maximal 3 Fragen stellen.</div>';
  const input = document.getElementById("chatQuestion");
  if (input) input.value = "";
  updateChatCounter();
}
