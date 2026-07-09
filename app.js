let currentModule = "Schnellgenerator";

function openModule(name){
  currentModule = name;
  document.getElementById("moduleTitle").innerText = name;
  document.getElementById("result").innerHTML =
    `<h2>${name}</h2><p>Modul ausgewählt. Geben Sie Thema und Zielgruppe ein.</p>`;
}

function generateDemo(){
  const topic = document.getElementById("topic").value || "Künstliche Intelligenz im Unterricht";
  const grade = document.getElementById("grade").value || "Klasse 9";

  const templates = {
    "Unterrichtsplanung": [
      "Lernziel: Die Schülerinnen und Schüler erklären zentrale Begriffe und Chancen der KI.",
      "Einstieg: kurzes Beispiel aus dem Alltag der Lernenden.",
      "Arbeitsphase: Analyse eines KI-generierten Textes in Gruppen.",
      "Sicherung: gemeinsame Kriterien für verantwortungsvolle Nutzung.",
      "Reflexion: Was kann KI unterstützen, was muss der Mensch entscheiden?"
    ],
    "Arbeitsblatt": [
      "Aufgabe 1: Beschreibe mit eigenen Worten, was KI ist.",
      "Aufgabe 2: Nenne drei Beispiele aus Schule und Alltag.",
      "Aufgabe 3: Markiere Chancen und Risiken in einer Tabelle.",
      "Aufgabe 4: Formuliere eine Regel für faire KI-Nutzung.",
      "Zusatz: Entwickle eine Mini-Checkliste für Mitschülerinnen und Mitschüler."
    ],
    "Quiz": [
      "1. Was bedeutet KI? Antwort: Künstliche Intelligenz.",
      "2. Kann KI immer richtige Antworten geben? Antwort: Nein.",
      "3. Warum ist Quellenprüfung wichtig? Antwort: Wegen möglicher Fehler.",
      "4. Wer trägt Verantwortung für die Nutzung? Antwort: Der Mensch.",
      "5. Nenne ein sinnvolles Einsatzfeld im Unterricht."
    ],
    "Förderplan / IPET": [
      "Stärken: Interesse an digitalen Werkzeugen und visuellem Lernen.",
      "Unterstützungsbedarf: klare Struktur, kurze Arbeitsaufträge, Zwischenfeedback.",
      "Ziel: selbstständige Bearbeitung einer Aufgabe in drei Schritten.",
      "Anpassungen: vereinfachte Sprache, Beispielaufgaben, Zeitverlängerung.",
      "Evaluation: Beobachtung, Lernprodukt, kurzes Reflexionsgespräch."
    ]
  };

  const items = templates[currentModule] || templates["Unterrichtsplanung"];

  document.getElementById("result").innerHTML = `
    <h2>${currentModule}</h2>
    <p><b>Thema:</b> ${topic}<br><b>Zielgruppe:</b> ${grade}</p>
    <ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>
    <p><b>Hinweis:</b> Dies ist eine statische Demo-Version. In der Enterprise-Version wird hier LangGraph + RAG + LLM angebunden.</p>
  `;
}
