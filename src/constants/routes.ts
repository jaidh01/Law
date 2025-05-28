/**
 * Centralized route definitions for the application
 */
export const ROUTES = {
  HOME: '/',
  CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
  ARTICLE_BY_SLUG: (slug: string) => `/article/${slug}`,
  COURT_BY_SLUG: (slug: string) => `/courts/${slug}`,
  LAW_FIRMS: '/law-firms',
  ABOUT: '/about',
  CONTACT: '/contact',
  SUBSCRIBE: '/subscribe',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings'
};