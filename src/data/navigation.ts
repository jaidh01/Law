export const navigationItems = [
  {
    title: 'Top Stories',
    url: '/category/top-stories',
  },
  {
    title: 'News Updates',
    url: '/category/news-updates',
  },
  {
    title: 'Courts',
    url: '/courts',
    children: [
      { title: 'Supreme Court', url: '/courts/supreme-court' },
      { title: 'Allahabad High Court', url: '/courts/allahabad-high-court' },
      { title: 'Bombay High Court', url: '/courts/bombay-high-court' },
      { title: 'Delhi High Court', url: '/courts/delhi-high-court' },
      { title: 'Karnataka High Court', url: '/courts/karnataka-high-court' },
      { title: 'Madras High Court', url: '/courts/madras-high-court' },
      { title: 'Rajasthan High Court', url: '/courts/rajasthan-high-court' },
      { title: 'Other High Courts', url: '/courts/other-high-courts' },
    ],
  },
  {
    title: 'Know The Law',
    url: '/know-the-law',
  },
  {
    title: 'Law Schools',
    url: '/law-schools',
    children: [
      { title: 'Articles', url: '/law-schools/articles' },
      { title: 'Scholarships', url: '/law-schools/scholarships' },
      { title: 'Courses', url: '/law-schools/courses' },
      { title: 'Admissions', url: '/law-schools/admissions' },
    ],
  },
  {
    title: 'Law Firms',
    url: '/law-firms',
    children: [
      { title: 'Deal News', url: '/law-firms/deals' },
      { title: 'Events', url: '/law-firms/events' },
      { title: 'Foreign Law Firms', url: '/law-firms/foreign' },
      { title: 'Internships', url: '/law-firms/internships' },
    ],
  },
  {
    title: 'More',
    url: '#',
    children: [
      { title: 'Consumer Cases', url: '/category/consumer-cases' },
      { title: 'Book Reviews', url: '/category/book-reviews' },
      { title: 'Round Ups', url: '/category/round-ups' },
      { title: 'Events', url: '/category/events' },
      { title: 'International', url: '/category/international' },
      { title: 'Job Updates', url: '/category/jobs' },
      { title: 'Environment', url: '/category/environment' },
      { title: 'Podcast', url: '/category/podcast' },
      { title: 'IBC', url: '/category/ibc' },
      { title: 'Arbitration', url: '/category/arbitration' },
      { title: 'Labour & Service', url: '/category/labour-service' },
      { title: 'Tech & Law', url: '/category/tech-law' },
    ],
  },
];