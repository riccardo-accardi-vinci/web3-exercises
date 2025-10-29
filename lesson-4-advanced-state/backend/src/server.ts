import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import userRouter from "./api/user/userRouter";
import { env } from "@/common/utils/envConfig";
import expenseRouter from "./api/expense/expenseRouter";
import transferRouter from "./api/transfer/transferRouter";
import transactionRouter from "./api/transaction/transactionRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/users", userRouter);
app.use("/api/transfers", transferRouter);
app.use("/api/transactions", transactionRouter);
// Log mounted routes for debugging
logger.info('Mounted /api/transactions route');

// Debug helper: list registered routes
app.get('/_debug/routes', (_req, res) => {
	const stack = (app as any)._router?.stack ?? [];
	const routes = stack
		.filter((layer: any) => layer.route)
		.map((layer: any) => {
			const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
			return { path: layer.route.path, methods };
		});
	res.json({ routes });
});
logger.info('Debug routes available at GET /_debug/routes');


// Error handlers
app.use(errorHandler());

export { app, logger };
