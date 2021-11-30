import Yup from 'yup';
export const librarySchema = Yup.object({
  libName: Yup.string().required('Library Field Is Required'),
  description: Yup.string().required('Description Field Is Required'),
});
export const bookSchema = Yup.object({
  bookName: Yup.string().required('Book Name Field Is Required'),
  bookAuthor: Yup.array().required('Author Field Is Required'),
  bookTitle: Yup.string().required('Book Title Field Is Required'),
  bookPublisher: Yup.string().required('Book Publisher Field Is Required'),
  bookQuantity: Yup.number().required('Book Quantity Field Is Required'),
});
