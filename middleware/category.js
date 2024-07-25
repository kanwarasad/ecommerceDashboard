// const mongoose = require('mongoose');
// const slugify = require('slugify');

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   link: { type: String, required: true }
// });

// categorySchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = slugify(this.name, { lower: true, strict: true });
//     this.link = `/categories/${this.slug}`;
//   }
//   next();
// });

// module.exports = mongoose.model('Category', categorySchema);
