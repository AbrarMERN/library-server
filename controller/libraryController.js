import express from 'express';
import mongoose from 'mongoose';
import libraryModel from '../models/libraryModel.js';

export const addLibrary = async (req, res) => {
  try {
    const { libName, description } = req.body;
    // const findLibrary = await libraryModel.find({
    //   library: { $elemMatch: { libName: libName } },
    // });
    const findLibrary = await libraryModel.findOne({ libName });
    if (findLibrary !== null) {
      res.send({ msg: 'This Library Is Already Exist', code: 401 });
    } else {
      const obj = {
        libName: libName,
        description: description,
      };
      const addLib = await libraryModel.create(obj);
      res.send({ msg: 'Library added SucessFully', code: 200 });
    }
  } catch (err) {
    const errmsg = err.message;

    console.log('Error In Add Library', err.message);
  }
};
export const getAllLibraryData = async (req, res) => {
  try {
    const getAllLibrary = await libraryModel.find({});
    res.send({ libraryData: getAllLibrary, code: 200 });
  } catch (err) {
    console.log('Eror In Get All Library', err);
  }
};
export const getLibraryDataById = async (req, res) => {
  try {
    const { libId } = req.params;
    const libIdData = await libraryModel.find({ _id: libId });
    res.send({ libIdData: libIdData, code: 200 });
  } catch (err) {
    console.log('Error In get Library Data By Id', err);
  }
};
export const deleteLibraryData = async (req, res) => {
  try {
    const { libId } = req.params;
    let ObjectId = mongoose.Types.ObjectId;
    const validId = ObjectId.isValid(libId);
    if (!validId) {
      return res.send({ msg: 'Your Library Id Is Wrong', code: 401 });
    }
    const deleteLibrary = await libraryModel.findOne({ _id: libId });
    if (deleteLibrary) {
      await libraryModel.deleteOne({ _id: libId });
      res.send({ msg: 'Your Library Is Deleted Successfully', code: 200 });
    } else {
      res.send({ msg: 'Your Library Is Not Exist', code: 200 });
    }
  } catch (err) {
    console.log('Error In Data Deletion', err);
  }
};
export const updateLibraryData = async (req, res) => {
  try {
    const { libId } = req.params;
    const { libName, description } = req.body;
    let ObjectId = mongoose.Types.ObjectId;
    const validId = ObjectId.isValid(libId);
    if (!validId) {
      return res.send({ msg: 'Your Library Id Is Wrong', code: 401 });
    }
    const findLibrary = await libraryModel.findById(libId);
    if (findLibrary) {
      await libraryModel.updateOne(
        { _id: libId },
        { libName: libName, description: description }
      );
      res.send({ msg: 'Your Library Is Updated Successfully', code: 200 });
    } else {
      res.send({ msg: 'Library Data Is Not Found', code: 200 });
    }
  } catch (err) {
    console.log('Error In Update', err);
  }
};
export const searchLibraryData = async (req, res) => {
  try {
    const { libKey } = req.params;
    const findSearchLib = await libraryModel.find({
      libName: { $regex: req.params.libKey, $options: 'i' },
    });
    res.send({ findSearchLib });
  } catch (err) {
    console.log('Error In Search', err);
  }
};
export const addlibraryBook = async (req, res) => {
  try {
    const { libId } = req.params;
    const { bookName, bookAuthor, bookTitle, bookPublisher, bookQuantity } =
      req.body;
    const findLibrary = await libraryModel.findById(libId);
    if (findLibrary) {
      if (!findLibrary.libBooks.find((el) => el.bookName === bookName)) {
        const bookObj = {
          bookName,
          bookAuthor: bookAuthor,
          bookTitle,
          bookPublisher,
          bookQuantity,
        };
        const addbook = await libraryModel.updateOne(
          { _id: libId },
          {
            $push: {
              libBooks: bookObj,
            },
          }
        );
        res.send({ msg: 'Your Book Is Add Successfully', code: 402 });
      } else {
        res.send({ msg: 'This book Is Already Exist In Library' });
      }
    } else {
      res.send({ msg: 'library Data Is Not Found', code: 401 });
    }
  } catch (err) {
    console.log('Find Error In Add Book Library', err);
  }
};
export const getAllLibBookById = async (req, res) => {
  try {
    const { libId, bookId } = req.params;
    const getAllBook = await libraryModel.find({
      libBooks: { $all: [{ $elemMatch: { _id: bookId } }] },
    });
    console.log('here is all Data', getAllBook);
  } catch (err) {
    console.log('Error In Get All Data By Id', err);
  }
};
export const updateLibraryBook = async (req, res) => {
  try {
    const { libId, bookId } = req.params;
    const { bookName, bookTitle, bookPublisher, bookQuantity } = req.body;
    const findLibrary = await libraryModel.findById(libId);
    if (findLibrary) {
      if (!findLibrary.libBooks.find((el) => el._id === bookId)) {
        const updateBook = await libraryModel.updateOne(
          {
            $and: [
              { _id: libId },
              { libBooks: { $elemMatch: { _id: bookId } } },
            ],
          },
          {
            'libBooks.$.bookName': bookName,
            'libBooks.$.bookTitle': bookTitle,
            'libBooks.$.bookPublisher': bookPublisher,
            'libBooks.$.bookQuantity': bookQuantity,
          }
        );
        console.log('update Data', updateBook);
        res.send({ msg: 'Your Book Is Update Successfully', code: 200 });
      } else {
        res.send({ msg: 'Your Book Is Not Exist', code: 200 });
      }
    } else {
      res.send({ msg: 'This library Is Not Exist', code: 500 });
    }
  } catch (err) {
    console.log('Error Is Here In Update Book', err);
  }
};
export const deleteLibraryBook = async (req, res) => {
  try {
    const { libId, bookId } = req.params;
    const findLibrary = await libraryModel.findById(libId);
    if (findLibrary) {
      const checkBook = findLibrary.libBooks.find(
        (el) => el._id.toString() === bookId.toString()
      );
      console.log('book', checkBook);
      if (!checkBook) {
        return res.send({ code: 404, msg: 'Book ' });
      }
      await libraryModel.updateOne(
        { _id: libId },
        { $pull: { libBooks: { _id: bookId } } }
      );
      res.send({ msg: 'Your Book Is Delete Successfully', code: 200 });
    } else {
      res.send({ msg: 'This Library Is Not Exist', code: 401 });
    }
  } catch (err) {
    console.log('Error In get All Library Book', err);
  }
};
const getAllLibBook = async (req, res) => {
  try {
  } catch (err) {
    console.log('Error In Get All Library Data Is Here', err);
  }
};
