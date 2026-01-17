# Plan Testów End-to-End (E2E)

Poniższe scenariusze mają na celu weryfikację poprawności działania aplikacji z perspektywy użytkownika końcowego. Rekomendowane narzędzie do automatyzacji: **Playwright** lub **Cypress**.

## 1. Scenariusz: Logowanie Użytkownika (Happy Path)
**Cel:** Weryfikacja, czy użytkownik może zalogować się do aplikacji i zostać przekierowany do strefy prywatnej.

*   **Warunki wstępne:** Użytkownik jest wylogowany.
*   **Kroki:**
    1. Wejdź na stronę logowania (`/login`).
    2. Wprowadź poprawny adres e-mail (dla flow z Magic Link lub hasłem).
    3. Zatwierdź formularz.
    4. (W przypadku Magic Link: symulacja kliknięcia w link lub przechwycenie tokena).
*   **Oczekiwany rezultat:**
    *   Użytkownik zostaje przekierowany na stronę profilu (`/account`) lub stronę główną.
    *   Sesja użytkownika jest aktywna (widoczne elementy dla zalogowanych, np. przycisk "Sign out").

## 2. Scenariusz: Aktualizacja Danych Profilowych
**Cel:** Weryfikacja, czy użytkownik może edytować swoje dane i czy zmiany są trwale zapisywane w bazie Supabase.

*   **Warunki wstępne:** Użytkownik jest zalogowany i znajduje się na stronie `/account`.
*   **Kroki:**
    1. Zmień wartość w polu "Full Name" (np. na "Test User").
    2. Zmień wartość w polu "Website".
    3. (Opcjonalnie) Prześlij nowy plik w komponencie Avatar.
    4. Kliknij przycisk aktualizacji ("Update").
    5. Przeładuj stronę (F5 / Refresh).
*   **Oczekiwany rezultat:**
    *   Po przeładowaniu pola formularza nadal zawierają wprowadzone nowe wartości.
    *   Komunikat o sukcesie (toast/alert) został wyświetlony po kliknięciu "Update".

## 3. Scenariusz: Ochrona Dostępu (Route Protection)
**Cel:** Weryfikacja, czy niezalogowani użytkownicy nie mają dostępu do stron chronionych.

*   **Warunki wstępne:** Użytkownik jest wylogowany (brak ciasteczek sesyjnych).
*   **Kroki:**
    1. Spróbuj wejść bezpośrednio na adres `/account` (wpisując URL w pasku adresu).
*   **Oczekiwany rezultat:**
    *   Użytkownik **nie** widzi formularza edycji konta.
    *   Następuje automatyczne przekierowanie na stronę logowania (`/login`) lub wyświetlenie błędu autoryzacji.
