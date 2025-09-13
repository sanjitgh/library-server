import { model, Schema } from "mongoose";
import { BookInterface } from "../interfaces/book.interface";

const bookSchema = new Schema<BookInterface>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: [true, "ISBN will be unique!"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number."],
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Instance Method
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

export const Book = model<BookInterface>("Book", bookSchema);
