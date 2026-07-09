# EduAssistent Conference Edition 4.1 — Gemini Live Edition

## Co zawiera wersja 4.1

- Frontend konferencyjny DE.
- Backend Vercel: `/api/gemini.js`.
- Model: `gemini-2.5-flash`.
- Zmienna środowiskowa: `GEMINI_API_KEY`.
- Generowanie na żywo dla modułów:
  - Unterrichtsplanung,
  - Quiz,
  - Förderplan / IPET,
  - Elterninformation,
  - Bericht.

## Jak wdrożyć

1. Rozpakuj ZIP.
2. Wgraj zawartość do repozytorium `EduAssistent-DE-Demo` na GitHubie.
3. Vercel automatycznie wykona ponowne wdrożenie.
4. W Vercel musi istnieć zmienna:

```text
GEMINI_API_KEY
```

5. Po wdrożeniu otwórz:

```text
https://edu-assistent-de-demo.vercel.app
```

6. Kliknij:

```text
Live-Demo starten → Module öffnen → wybierz moduł → Gemini Live starten
```

## Ważne

Nie wpisuj klucza Gemini w plikach frontendowych. Klucz jest używany wyłącznie po stronie Vercel API.

## Jeżeli pojawi się fallback

Sprawdź:
- czy `GEMINI_API_KEY` jest dodany w Vercel,
- czy zmienna obejmuje Production i Preview,
- czy po dodaniu zmiennej wykonano Redeploy.
