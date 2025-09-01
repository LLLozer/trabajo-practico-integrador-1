import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DBStart } from "./src/config/database.js";

const app = express();
dotenv.config();

const PORT = 3004;
const corsOptions = {
  origin: `https://localhost:3004`,
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.listen(PORT, async () => {
  DBStart();
  console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
});
