const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide project title'],
      max_length: [100, 'Name can not be more than 100 characters'],
    },
    url: {
      type: String,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    githubLink: {
      type: String,
      required: [true, 'Please provide product description'],
      max_length: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    status: {
      type: String,
      required: [true, 'Please provide status'],
      enum: {
        values: ['pending', 'in progress', 'completed', "upcoming"],
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true, toJSON: { virtual: true }, toObject: { virtual: true } }
);

module.exports = mongoose.model('projects', ProjectSchema);
