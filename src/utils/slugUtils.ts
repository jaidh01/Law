/**
 * Utilities for working with slug parameters
 */

/**
 * Validates and sanitizes a slug
 * @param slug - The slug to validate
 * @returns The sanitized slug or null if invalid
 */
export const validateSlug = (slug: string | undefined): string | null => {
  if (!slug) return null;
  if (typeof slug !== 'string') return null;
  if (slug === 'undefined' || slug === 'null') return null;
  
  // Basic slug validation - only allow alphanumeric, hyphens and underscores
  if (!/^[a-z0-9-_]+$/i.test(slug)) {
    // Try to sanitize the slug
    const sanitized = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with a single one
      .trim();                   // Trim leading/trailing spaces
      
    return sanitized || null;
  }
  
  return slug;
};

/**
 * Creates a slug from a string (like a title)
 * @param text - The text to convert to a slug
 * @returns The generated slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};