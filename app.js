import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DBStart } from "./src/config/database.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { tagRoutes } from "./src/routes/tag.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";
import { articleTagRoutes } from "./src/routes/article_tag.routes.js";
import { routerProfile } from "./src/routes/profile.routes.js";

const app = express();
dotenv.config();

const PORT = 3004;
const corsOptions = {
  origin: `https://localhost:3004`,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", tagRoutes);
app.use("/api", articleRoutes);
app.use("/api", articleTagRoutes)
app.use("/api", routerProfile)

app.listen(PORT, async () => {
  DBStart();
  console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
});
