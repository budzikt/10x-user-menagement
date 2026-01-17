# Dokument wymagań produktu (PRD) - Next.js User Management Starter

## 1. Przegląd produktu
Celem projektu jest dostarczenie kompletnego, gotowego do produkcji szablonu aplikacji do zarządzania użytkownikami, opartego na Next.js (App Router) oraz Supabase. Aplikacja zapewnia bezpieczne uwierzytelnianie, zarządzanie sesjami po stronie serwera oraz operacje CRUD na profilach użytkowników i plikach. Jest to fundament pod budowę aplikacji SaaS lub platform społecznościowych, pozwalający programistom zaoszczędzić czas na implementacji standardowych funkcjonalności.

## 2. Problem użytkownika
Tworzenie nowoczesnych aplikacji internetowych wymaga skomplikowanej konfiguracji uwierzytelniania, bazy danych i przechowywania plików. Deweloperzy często tracą czas na powtarzalne zadania konfiguracyjne zamiast skupić się na unikalnej wartości biznesowej.
Użytkownicy końcowi oczekują szybkiego, bezpiecznego i intuicyjnego procesu rejestracji oraz możliwości łatwego zarządzania swoim profilem, w tym zmiany danych osobowych i zdjęcia profilowego. Brak tych podstawowych funkcji lub ich słaba implementacja obniża zaufanie do aplikacji.

## 3. Wymagania funkcjonalne
System musi umożliwiać użytkownikom zakładanie kont i logowanie się przy użyciu adresu email i hasła.
System musi obsługiwać bezpieczne zarządzanie sesjami przy użyciu ciasteczek HttpOnly i Next.js Middleware.
Zalogowani użytkownicy muszą mieć możliwość edycji swojego profilu: Imię i nazwisko, Nazwa użytkownika, Strona internetowa.
System musi umożliwiać przesyłanie i aktualizację zdjęcia profilowego (awatara) z wykorzystaniem Supabase Storage.
Aplikacja musi chronić prywatne trasy (np. /account) przed dostępem nieautoryzowanych użytkowników.
Interfejs użytkownika musi być responsywny i estetyczny, wykorzystujący Tailwind CSS.

## 4. Granice produktu
MVP nie obejmuje logowania za pomocą mediów społecznościowych (OAuth), mimo że Supabase to wspiera (brak implementacji w UI).
Nie będzie funkcji resetowania hasła ani weryfikacji zmiany adresu email w tej fazie.
Profile użytkowników są prywatne i widoczne tylko dla właściciela; nie ma publicznych stron profili.
Użytkownik nie może samodzielnie usunąć konta z poziomu interfejsu.
Walidacja formularzy opiera się na podstawowych mechanizmach HTML5, bez zaawansowanych bibliotek jak Zod.

## 5. Historyjki użytkowników

US-001
Tytuł
Rejestracja nowego użytkownika
Opis
Jako nowy użytkownik, chcę utworzyć konto podając adres email i hasło, aby uzyskać dostęp do funkcjonalności aplikacji.
Kryteria akceptacji
Użytkownik może wprowadzić email i hasło w formularzu rejestracji.
Po kliknięciu Sign up konto jest tworzone w Supabase Auth.
Użytkownik otrzymuje informację o konieczności potwierdzenia adresu email (jeśli wymagane) lub jest logowany.
W przypadku błędu (np. zajęty email), wyświetlany jest stosowny komunikat.

US-002
Tytuł
Logowanie do systemu
Opis
Jako zarejestrowany użytkownik, chcę zalogować się na swoje konto, aby zarządzać swoim profilem.
Kryteria akceptacji
Użytkownik może wprowadzić email i hasło w formularzu logowania.
Po pomyślnej weryfikacji, użytkownik jest przekierowywany na stronę profilu.
Sesja użytkownika jest zapisywana bezpiecznie.
Nieudana próba logowania skutkuje komunikatem błędu.

US-003
Tytuł
Wylogowanie z systemu
Opis
Jako zalogowany użytkownik, chcę się wylogować, aby zakończyć sesję na danym urządzeniu.
Kryteria akceptacji
Na stronie konta dostępny jest przycisk Sign out.
Kliknięcie przycisku usuwa sesję i ciasteczka.
Użytkownik jest przekierowywany na stronę logowania lub stronę główną.

US-004
Tytuł
Przeglądanie danych profilowych
Opis
Jako zalogowany użytkownik, chcę widzieć moje aktualne dane profilowe po wejściu na stronę konta.
Kryteria akceptacji
Po wejściu na /account formularz jest wypełniony aktualnymi danymi z bazy (Imię, Nazwa użytkownika, Strona www).
Jeśli dane nie istnieją, pola są puste.
Awatar jest wyświetlany, jeśli został wcześniej ustawiony.

US-005
Tytuł
Aktualizacja danych profilowych
Opis
Jako zalogowany użytkownik, chcę edytować moje dane osobowe, aby utrzymać profil aktualnym.
Kryteria akceptacji
Użytkownik może edytować pola: Full Name, Username, Website.
Kliknięcie przycisku Update zapisuje zmiany w tabeli profiles w bazie danych.
Użytkownik otrzymuje powiadomienie o sukcesie lub błędzie operacji.

US-006
Tytuł
Przesyłanie awatara
Opis
Jako zalogowany użytkownik, chcę przesłać zdjęcie profilowe, aby spersonalizować moje konto.
Kryteria akceptacji
Użytkownik może wybrać plik graficzny ze swojego urządzenia.
Plik jest przesyłany do bucketu avatars w Supabase Storage.
Po przesłaniu, podgląd awatara na stronie aktualizuje się automatycznie.
Ścieżka do nowego awatara jest zapisywana w profilu użytkownika.

US-007
Tytuł
Ochrona dostępu do konta
Opis
Jako właściciel systemu, chcę uniemożliwić dostęp do strony /account niezalogowanym osobom.
Kryteria akceptacji
Próba wejścia na adres /account bez aktywnej sesji skutkuje przekierowaniem do /login.
API i operacje bazodanowe są chronione (RLS) i dostępne tylko dla uwierzytelnionego użytkownika.

## 6. Metryki sukcesu
Wskaźnik udanych rejestracji (procent użytkowników, którzy ukończyli proces sign-up bez błędów).
Wskaźnik uzupełnienia profilu (procent użytkowników, którzy ustawili username lub avatar po rejestracji).
Czas ładowania strony profilu (powinien być poniżej 1 sekundy dzięki optymalizacji Next.js).
Poprawność działania sesji (brak nieoczekiwanych wylogowań podczas aktywnego użytkowania).
