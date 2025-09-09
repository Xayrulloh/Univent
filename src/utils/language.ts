// Types for our language system
export type Language =

    | "ru"
    | "uz";

export interface LanguageStrings {
  // Navigation
  about: string;
  products: string;
  benefits: string;
  branches: string;
  contact: string;

  // Common
  companyName: string;
  copyright: string;

  // Add more strings as needed
}

export const translations: Record<
  Language,
  LanguageStrings
> = {
  ru: {
    about:
      "О компании",
    products:
      "Продукция",
    benefits:
      "Преимущества",
    branches:
      "Филиалы",
    contact:
      "Контакты",
    companyName:
      "Univent",
    copyright:
      "© Univent. Все права защищены.",
  },
  uz: {
    about:
      "Компания хақида",
    products:
      "Маҳсулотлар",
    benefits:
      "Афзалликлар",
    branches:
      "Филиаллар",
    contact:
      "Алоқалар",
    companyName:
      "Univent",
    copyright:
      "© Univent. Барча ҳуқуқлар ҳимояланган.",
  },
};

// Safe localStorage access
const safeLocalStorage =
  {
    getItem(
      key: string
    ):
      | string
      | null {
      if (
        typeof window ===
        "undefined"
      )
        return null;
      try {
        return window.localStorage.getItem(
          key
        );
      } catch (error) {
        console.warn(
          "localStorage access failed:",
          error
        );
        return null;
      }
    },

    setItem(
      key: string,
      value: string
    ): void {
      if (
        typeof window ===
        "undefined"
      )
        return;
      try {
        window.localStorage.setItem(
          key,
          value
        );
      } catch (error) {
        console.warn(
          "localStorage set failed:",
          error
        );
      }
    },
  };

export class LanguageManager {
  private currentLanguage: Language =
    "ru";

  constructor() {
    this.loadLanguagePreference();
  }

  // Get current language
  public getCurrentLanguage(): Language {
    return this
      .currentLanguage;
  }

  // Set new language
  public setLanguage(
    lang: Language
  ): void {
    if (
      lang ===
      this
        .currentLanguage
    )
      return;

    this.currentLanguage =
      lang;
    safeLocalStorage.setItem(
      "preferredLanguage",
      lang
    );

    // Dispatch custom event for other components to listen to
    if (
      typeof window !==
      "undefined"
    ) {
      const event =
        new CustomEvent(
          "languageChanged",
          {
            detail:
              {
                language:
                  lang,
              },
          }
        );
      window.dispatchEvent(
        event
      );
    }

    console.log(
      `Language changed to: ${lang}`
    );
  }

  // Get translation for a key
  public getTranslation<
    K extends keyof LanguageStrings
  >(
    key: K
  ): string {
    return translations[
      this
        .currentLanguage
    ][
      key
    ];
  }

  // Load language preference from storage
  private loadLanguagePreference(): void {
    const savedLang =
      safeLocalStorage.getItem(
        "preferredLanguage"
      ) as Language | null;
    if (
      savedLang &&
      (savedLang ===
        "ru" ||
        savedLang ===
          "uz")
    ) {
      this.currentLanguage =
        savedLang;
    } else if (
      typeof window !==
      "undefined"
    ) {
      // Default to browser language or Russian
      const browserLang =
        navigator.language.split(
          "-"
        )[0];
      this.currentLanguage =
        browserLang ===
        "uz"
          ? "uz"
          : "ru";
    }
  }

  // Initialize language switcher UI
  public initLanguageSwitcher(): void {
    if (
      typeof document ===
      "undefined"
    )
      return;

    const buttons =
      document.querySelectorAll(
        ".lang button"
      );

    buttons.forEach(
      (
        button: Element
      ) => {
        const htmlButton =
          button as HTMLButtonElement;

        // Set initial active state
        const buttonLang =
          htmlButton.textContent?.toLowerCase() as Language;
        if (
          buttonLang &&
          (buttonLang ===
            "ru" ||
            buttonLang ===
              "uz")
        ) {
          if (
            buttonLang ===
            this
              .currentLanguage
          ) {
            htmlButton.classList.add(
              "active"
            );
            htmlButton.setAttribute(
              "aria-pressed",
              "true"
            );
          } else {
            htmlButton.classList.remove(
              "active"
            );
            htmlButton.setAttribute(
              "aria-pressed",
              "false"
            );
          }

          // Add click handler
          htmlButton.addEventListener(
            "click",
            () => {
              this.setLanguage(
                buttonLang
              );
              this.updateButtonStates();
            }
          );
        }
      }
    );
  }

  // Update button active states
  private updateButtonStates(): void {
    if (
      typeof document ===
      "undefined"
    )
      return;

    const buttons =
      document.querySelectorAll(
        ".lang button"
      );

    buttons.forEach(
      (
        button: Element
      ) => {
        const htmlButton =
          button as HTMLButtonElement;
        const buttonLang =
          htmlButton.textContent?.toLowerCase() as Language;

        if (
          buttonLang &&
          (buttonLang ===
            "ru" ||
            buttonLang ===
              "uz")
        ) {
          if (
            buttonLang ===
            this
              .currentLanguage
          ) {
            htmlButton.classList.add(
              "active"
            );
            htmlButton.setAttribute(
              "aria-pressed",
              "true"
            );
          } else {
            htmlButton.classList.remove(
              "active"
            );
            htmlButton.setAttribute(
              "aria-pressed",
              "false"
            );
          }
        }
      }
    );
  }
}

// Create singleton instance
export const languageManager =
  new LanguageManager();
