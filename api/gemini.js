export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Brak zmiennej środowiskowej GEMINI_API_KEY w Vercel.'
      });
    }

    const { role, module, topic, group, mode, question } = req.body || {};
    const safeRole = role || 'Lehrkraft';
    const safeModule = module || 'Unterrichtsplanung';
    const safeTopic = topic || 'Künstliche Intelligenz verantwortungsvoll im Unterricht nutzen';
    const safeGroup = group || 'Klasse 9, Gymnasium';

    const systemPrompt = `Du bist EduAssistent, ein professioneller KI-Assistent für Bildung. Antworte auf Deutsch, klar, schulpraktisch, strukturiert und datenschutzbewusst. Erstelle keine medizinischen Diagnosen. Bei Förderplan/IPET formuliere pädagogische Unterstützung, Ziele, Maßnahmen und Monitoring.`;

    const userPrompt = mode === 'chat'
      ? `
Rolle: ${safeRole}
Modus: EduChat Live, kurze konferencyjne Q&A
Pytanie użytkownika: ${question || safeTopic}
Odbiorcy: ${safeGroup}

Odpowiedz po polsku, konkretnie i praktycznie. Maksymalnie 1200 znaków. Nie udawaj, że masz dostęp do danych osobowych lub dokumentów, jeżeli nie zostały podane. Zakończ jedną praktyczną sugestią.`
      : `
Rolle: ${safeRole}
Modul: ${safeModule}
Thema/Fall/Situation: ${safeTopic}
Zielgruppe: ${safeGroup}

Erstelle ein professionelles Ergebnis für dieses Modul.
Format:
1. Titel
2. Ausgangslage
3. Ziele / Kompetenzen
4. Konkrete Umsetzung in Schritten
5. Materialien / Hinweise
6. Reflexion / Evaluation
7. Kurze Empfehlung für die Praxis

Schreibe konkret, nicht allgemein. Verwende Zwischenüberschriften und Listen.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.45,
          topP: 0.9,
          maxOutputTokens: mode === 'chat' ? 900 : 1800
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Błąd Gemini API.'
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n')?.trim();

    if (!text) {
      return res.status(500).json({ error: 'Gemini nie zwrócił treści.' });
    }

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Nieznany błąd serwera.' });
  }
}
