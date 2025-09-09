// Custom event types
export interface LanguageChangeEvent extends CustomEvent {
  detail: {
    language: string;
  };
}

// Type guard for language change events
export function isLanguageChangeEvent(event: Event): event is LanguageChangeEvent {
  return event.type === 'languageChanged' && 
         'detail' in event && 
         typeof (event as CustomEvent).detail === 'object' &&
         'language' in (event as CustomEvent).detail;
}