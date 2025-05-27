export const ROUTES = {
  HOME: '/',
  ARTICLE: '/article/:articleSlug',
  ARTICLE_BY_SLUG: (slug: string) => `/article/${slug}`,
  CATEGORY: '/category/:categorySlug',
  CATEGORY_BY_SLUG: (slug: string) => `/category/${slug}`,
  COURT: '/courts/:courtSlug',
  COURT_BY_SLUG: (slug: string) => `/courts/${slug}`,
  COURTS_HUB: '/courts',
  LAW_FIRMS: '/law-firms',
  LAW_FIRMS_SECTION: '/law-firms/:subsection',
  LAW_FIRMS_BY_SECTION: (section: string) => `/law-firms/${section}`,
  NOT_FOUND: '*'
};