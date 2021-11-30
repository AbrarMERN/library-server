import mongoose from 'mongoose';
const libSchema = mongoose.Schema(
  {
    libName: {
      type: String,
    },
    description: {
      type: String,
    },

    libBooks: [
      {
        bookName: {
          type: String,
        },
        bookAuthor: {
          type: Array,
        },
        bookTitle: {
          type: String,
        },
        bookPublisher: {
          type: String,
        },
        bookQuantity: {
          type: Number,
        },
      },
    ],
  },
  { timeStamp: true }
);
const libraryModel = mongoose.model('library', libSchema);
export default libraryModel;
