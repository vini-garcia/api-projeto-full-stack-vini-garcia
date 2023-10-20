import "express-async-errors";
import express, { Application } from "express";
import middlewares from "./middlewares";
import { announcementRoutes, commentRoutes, loginRoutes, userRoutes } from "./routers";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
var cors = require("cors");

const app: Application = express();
app.use(express.json());

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use("/comments", commentRoutes);

app.use(middlewares.handleError);

export default app;
