import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
	method: "get",
	path: "/health-check",
	tags: ["Health Check"],
	responses: {
		"200": { description: "Service is healthy", content: { "application/json": { schema: z.object({ success: z.boolean(), message: z.string().nullable(), responseObject: z.null() }) } } },
	},
});

healthCheckRouter.get("/", (_req: Request, res: Response) => {
	const serviceResponse = ServiceResponse.success("Service is healthy", null);
	res.status(serviceResponse.statusCode).send(serviceResponse);
});
