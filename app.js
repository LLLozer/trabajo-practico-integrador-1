import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DBStart } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { ArticleModel } from "./src/models/article.model.js";
import { ArticleTagModel } from "./src/models/article_tag.model.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { tagRoutes } from "./src/routes/tag.routes.js";

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

app.listen(PORT, async () => {
  DBStart();
  console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
});
