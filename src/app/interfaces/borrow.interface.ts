import mongoose from "mongoose";

export interface BorrowInterface {
    book: mongoose.Types.ObjectId,
    quantity: number,
    dueDate: Date
}