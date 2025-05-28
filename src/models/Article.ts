import mongoose from 'mongoose';
import slugify from 'slugify';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: String,
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  tags: [String],
  source: String,
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg'
  },
  imageCaption: String,
  imageAlt: String, // New field for better accessibility
  imageCredit: String, // New field for attribution
  pdf_url: String
}, {
  timestamps: true
});

// Generate slug from title if not provided
ArticleSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    // Create a slug from the title
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true
    });
  }
  
  // If still no slug, generate a random one
  if (!this.slug) {
    this.slug = `article-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  // Generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  
  // Set image alt text if not provided
  if (!this.imageAlt && this.title) {
    this.imageAlt = this.title;
  }
  
  next();
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);