import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// create book api
bookRoutes.post("/create-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);
    console.log(book);
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

// GET /books with pagination
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    // Parse page & limit from query parameters, default to page 1, limit 5
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Get total count of books
    const totalBooks = await Book.countDocuments();

    // Fetch books with pagination
    const books = await Book.find().sort({ _id: -1 }).skip(skip).limit(limit);

    res.status(200).send({
      success: true,
      message: "Books received successfully",
      data: books,
      pagination: {
        total: totalBooks,
        page,
        limit,
        totalPages: Math.ceil(totalBooks / limit),
      },
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
    console.log(editBook);

    if (editBook.copies <= 0)
      throw new Error("Copies must be 1 or positive number.");

    const book = await Book.findByIdAndUpdate(id, editBook, { new: true });

    res.status(200).send({
      success: true,
      message: "Book update successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
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
