import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// create book api
bookRoutes.post("/create-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).send({
      success: true,
      message: "Book create successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

// get all book
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const book = await Book.find().sort({ _id: -1 });

    res.status(200).send({
      data: book,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});

// get single book
bookRoutes.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    res.status(200).send({
      success: true,
      message: "Book find successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});

// edit single book
bookRoutes.put("/edit-book/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const editBook = req.body;

    const book = await Book.findByIdAndUpdate(id, editBook, { new: true });

    res.status(200).send({
      success: true,
      message: "Book update successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});

// delete single book
bookRoutes.delete("/delete-book/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const book = await Book.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Book Delete successfully",
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});
