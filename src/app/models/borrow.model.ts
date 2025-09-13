import { model, Schema } from "mongoose";
import { BorrowInterface } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<BorrowInterface>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model("Borrow", borrowSchema);
