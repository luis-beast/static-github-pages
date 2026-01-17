/**
 * Normalizes a string for search by converting to lowercase and removing diacritics/accents.
 * This allows "pokemon" to match "Pokémon", "cafe" to match "Café", etc.
 */
export function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
