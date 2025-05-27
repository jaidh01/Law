/**
 * API endpoints configuration
 */

// Article-related endpoints
export const ARTICLE_ENDPOINTS = {
  FEATURED: '/articles/featured',
  BY_SLUG: (slug: string) => `/articles/${slug}`,
  BY_CATEGORY: (categorySlug: string) => `/articles/category/${categorySlug}`,
  BY_TAG: (tagName: string) => `/articles/tag/${encodeURIComponent(tagName)}`,
  RELATED: (category: string, excludeSlug: string) => `/articles/related/${category}?excludeSlug=${excludeSlug}`,
};

// Subscription-related endpoints
export const SUBSCRIPTION_ENDPOINTS = {
  SUBSCRIBE: '/subscribe',
  BULK_SUBSCRIBE: '/subscribe/bulk',
  UNSUBSCRIBE: (email: string) => `/subscribe/unsubscribe/${encodeURIComponent(email)}`,
};

// System endpoints
export const SYSTEM_ENDPOINTS = {
  HEALTH: '/health',
};

export const API_ENDPOINTS = {
  ...ARTICLE_ENDPOINTS,
  ...SUBSCRIPTION_ENDPOINTS,
  ...SYSTEM_ENDPOINTS,
};