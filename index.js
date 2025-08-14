// index.js
import "dotenv/config";                         // 可用 .env（可选）
import express from "express";
import cors from "cors";
import session from "express-session";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import mongoose from "mongoose";                 // ⬅️ 一定要有这行
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(cors({
  credentials: true,
  origin: [
    "https://a5--cosmic-pithivier-a2929c.netlify.app",
    "https://a6--cosmic-pithivier-a2929c.netlify.app",
    "http://localhost:5173"
  ],
}));


// ✅ 解析 JSON —— 放在路由之前
app.use(express.json());

// ✅ session —— 只注册一次
app.use(session({
  // 🔧 如有 .env，优先用；否则用默认值
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // 本地开发通常 sameSite: 'lax' 即可；如要跨域 cookie，可改为 'none' 并配合 secure
    sameSite: "lax",
  },
}));

// ✅ 注册路由
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
