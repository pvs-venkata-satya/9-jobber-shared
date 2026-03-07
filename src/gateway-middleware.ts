import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "./error.handler";
import { tokens } from "./utils/consts";

export const verifyGatewayRequest = (req: Request, res: Response, next: NextFunction) => {
  const gatewayToken = req.headers['x-gateway-token'] as string;
  const token = gatewayToken || req.query['gateway_token'] as string;
  if (!token) {
    throw new UnauthorizedError('Unauthorized: Invalid gateway token', 'Request not coming from gateway');
  }
  try {
    const payload: { id: string, iat: number } = JWT.verify(token, '') as { id: string, iat: number };
    if (!tokens.includes(payload.id)) {
      throw new UnauthorizedError('Unauthorized: Invalid gateway token', 'Invalid gateway token id');
    }
  } catch (err) {
    throw new UnauthorizedError('Unauthorized: Invalid gateway token', 'Request not coming from gateway');
  }
  next();
};