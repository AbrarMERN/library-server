import express from 'express';
import {
  addLibrary,
  getAllLibraryData,
  getLibraryDataById,
  deleteLibraryData,
  updateLibraryData,
  searchLibraryData,
  addlibraryBook,
  updateLibraryBook,
  deleteLibraryBook,
  getAllLibBookById,
} from '../controller/libraryController.js';
import {
  libValidation,
  bookValidation,
} from '../middleWare/validation/libraryValidation.js';
const router = express.Router();
router.post('/addLibraryRoute', libValidation, addLibrary);
router.get('/getAllLibraryDataRoute', getAllLibraryData);
router.get('/getLibraryDataByIdRoute/:libId', getLibraryDataById);
router.delete('/deleteLibraryDataRoute/:libId', deleteLibraryData);
router.put('/updateLibraryDataRoute/:libId', libValidation, updateLibraryData);
router.get('/searchLibraryDataRoute/:libKey', searchLibraryData);
router.post('/addlibraryBook/:libId', bookValidation, addlibraryBook);
router.put(
  '/updateLibraryBook/:libId/:bookId',
  bookValidation,
  updateLibraryBook
);
router.put('/deleteLibraryBook/:libId/:bookId', deleteLibraryBook);
router.get('/getAllLibBookById/:bookId', getAllLibBookById);

export default router;
