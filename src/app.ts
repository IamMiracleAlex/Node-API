import express, { Response as ExResponse, Request as ExRequest } from "express";
import * as bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';

import { handleError } from "./middlewares/errors";

import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";

const app = express();
app.use(morgan('combined'));  // log requests to console
app.use(bodyParser.json());
app.use(express.static('src/public'));
app.use(cors({
  origin: '*'
}));

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../bin/swagger.json"))
    );
  });

RegisterRoutes(app);

app.use(handleError);

export default app;