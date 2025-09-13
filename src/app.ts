import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Display api home page
app.get("/", (req: Request, res: Response) => {
  res.send("Server Home!");
});

// routes
app.use("/", bookRoutes);
app.use("/", borrowRoutes);

export default app;
