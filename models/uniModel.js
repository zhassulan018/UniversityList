const mongoose = require('mongoose');
const slugify = require('slugify');

const uniSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University must have a name'],
    unique: true
  },
  slug: String,
  city: {
    type: String,
    required: [true, 'Please provide the city of University']
  },
  country: {
    type: String,
    required: [true, 'Please provide country of university']
  },
  fact: {
    type: String,
    required: [true, 'write fact']
  },
  build: {
    type: String,
    required: [true, 'write year']
  },
  fullLocation: String,
  students: {
    type: Number,
    required: [true, 'Please provide number of students']
  },
  graduates: {
    type: Number,
    required: [true, 'Please provide number of graduated students']
  },
  description: {
    type: String,
    required: [true, 'Descreption must have description']
  },
  imageCover: {
    type: String,
    required: [true, 'A university must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

uniSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  this.fullLocation = this.city + ' ' + this.country;
  next();
});

const University = new mongoose.model('University', uniSchema);

module.exports = University;
