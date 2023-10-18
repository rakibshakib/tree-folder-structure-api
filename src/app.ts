import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/Folders/folder.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

//global error handler
// app.use(globalErrorHandler);
// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     success: true,
//     message: "Welcome to Folder Structure API",
//   });
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
