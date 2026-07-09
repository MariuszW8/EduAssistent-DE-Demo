# EduAssistent Conference Edition 4.2 — Gemini Live + EduChat 3Q

## Co nowego

- Dodano **EduChat Live** w ekranie `Chat`.
- Użytkownik może zadać maksymalnie **3 pytania** do Gemini Flash.
- Po wykorzystaniu limitu przycisk zostaje zablokowany.
- Moduły dokumentów z wersji 4.1 pozostają bez zmian.

## Wgrywanie na GitHub

1. Rozpakuj ZIP.
2. Wejdź do rozpakowanego folderu.
3. Zaznacz całą zawartość folderu, nie sam folder.
4. Wgraj pliki do repozytorium `EduAssistent-DE-Demo` przez GitHub → `Add file` → `Upload files`.
5. Zatwierdź: `Commit changes`.
6. Vercel automatycznie wykona deployment.

## Wymagane w Vercel

W projekcie Vercel musi istnieć zmienna środowiskowa:

```text
GEMINI_API_KEY
```

Po zmianie zmiennych środowiskowych wykonaj `Redeploy`.

## Test działania Gemini

1. Otwórz stronę Vercel.
2. Wejdź w `Chat`.
3. W sekcji `EduChat Live` wpisz pytanie.
4. Kliknij `Zapytaj Gemini`.
5. W Vercel → Logs powinien pojawić się wpis `POST /api/gemini` ze statusem `200`.
