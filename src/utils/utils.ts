/**
 * Convert Persian/Arabic digits to English (Latin) digits
 */
export function toEnglishDigits(input: string): string {
  return input.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 0x06f0 && code <= 0x06f9) {
      // Persian digits (۰-۹)
      return String(code - 0x06f0);
    }
    if (code >= 0x0660 && code <= 0x0669) {
      // Arabic-Indic digits (٠-٩)
      return String(code - 0x0660);
    }
    return char;
  });
}
