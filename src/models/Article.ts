import mongoose from 'mongoose';

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
  image: String,
  imageCaption: String,
  pdf_url: String
}, {
  timestamps: true
});

// Generate slug from title if not provided
ArticleSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  
  // Generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  
  next();
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);