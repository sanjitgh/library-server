import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

// create api
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    // Check the book is exist
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book is not found.");

    // Check the book has enough quantity
    if (book.copies < quantity) {
      console.log("block");
      throw new Error("Not enough copies available.");
    }

    book.copies -= quantity; // Minus the quantity when user borrow

    // Update the quantity
    book.updateAvailability();
    await book.save();

    // Save borrow history
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully.",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Validation failed!",
    });
  }
});

// Get borrow (mongoDB aggregate)
borrowRoutes.get("/borrow-summary", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "borrowDetails",
        },
      },
      {
        $unwind: "$borrowDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$borrowDetails.title",
            isbn: "$borrowDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Successfully get the borrows history.",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Validation failed!",
    });
  }
});
