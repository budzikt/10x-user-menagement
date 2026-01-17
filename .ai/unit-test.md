# Plan Testów Jednostkowych (Unit Tests)

Poniższe testy skupiają się na izolowanej logice komponentów i funkcji serwerowych. Rekomendowane narzędzia: **Jest** + **React Testing Library**.

## 1. Komponent `AccountForm`: Renderowanie danych początkowych
**Cel:** Upewnienie się, że formularz poprawnie wyświetla dane użytkownika przekazane w propsach.

*   **Co testujemy:** Komponent `app/account/account-form.tsx`.
*   **Dane wejściowe (Props):** Obiekt `user` z przykładowymi danymi (email, full_name, website).
*   **Kroki:**
    1. Wyrenderuj komponent `AccountForm` z zamockowaną sesją.
*   **Oczekiwany rezultat:**
    *   Pole e-mail jest wypełnione i zablokowane (`disabled`).
    *   Pola "Full Name" i "Website" zawierają wartości przekazane w profilu.

## 2. Server Action `login`: Obsługa błędów autoryzacji
**Cel:** Weryfikacja, czy akcja serwerowa poprawnie przetwarza błędy zwracane przez Supabase Auth.

*   **Co testujemy:** Funkcję `login` w `app/login/actions.ts`.
*   **Scenariusz:** Supabase zwraca błąd (np. "Invalid login credentials").
*   **Kroki:**
    1. Zamockuj moduł `@supabase/ssr` tak, aby `signInWithPassword` zwracało obiekt błędu.
    2. Wywołaj funkcję `login` z przykładowymi danymi formularza.
*   **Oczekiwany rezultat:**
    *   Funkcja nie wykonuje przekierowania (`redirect`).
    *   Funkcja zwraca (lub rzuca) odpowiedni komunikat o błędzie, który może być wyświetlony użytkownikowi.

## 3. Komponent `Avatar`: Obsługa przesyłania plików
**Cel:** Sprawdzenie, czy komponent poprawnie reaguje na wybór pliku i wywołuje funkcję uploadu.

*   **Co testujemy:** Komponent `app/account/avatar.tsx`.
*   **Kroki:**
    1. Wyrenderuj komponent.
    2. Symuluj zdarzenie `change` na ukrytym polu `input[type="file"]` z załączonym plikiem obrazu.
*   **Oczekiwany rezultat:**
    *   Zostaje wywołana funkcja `onUpload` (przekazana jako prop).
    *   Komponent wyświetla stan ładowania (loading) w trakcie przetwarzania (jeśli taka logika istnieje).
