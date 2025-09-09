// Client-side language initialization
import { languageManager } from '../utils/language.js';
import { isLanguageChangeEvent } from '../types/events.js';

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    languageManager.initLanguageSwitcher();
    
    // Add event listener for language changes to update page content
    window.addEventListener('languageChanged', (event: Event) => {
      if (isLanguageChangeEvent(event)) {
        const { language } = event.detail;
        console.log('Language changed, updating content for:', language);
        
        // In a real application, you would update all text content here
        // For this demo, we'll just reload the page
        window.location.reload();
      }
    });
  });
}