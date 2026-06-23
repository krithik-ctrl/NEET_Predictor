import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import routes from "./routes/index.js";

import notFound from "./common/middlewares/notFound.js";
import errorHandler from "./common/middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;