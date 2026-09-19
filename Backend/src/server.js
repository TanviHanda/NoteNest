import express from "express";

import folderRoutes from "./routes/folderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/folders", folderRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});