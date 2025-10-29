  import type { Request, Response } from "express";
  import * as transferRepository from './transferRepository';
  import { StatusCodes } from "http-status-codes/build/cjs/status-codes";


    export async function listTransfers(req: Request, res: Response) {
        const transfers = await transferRepository.findAll();
        res.status(StatusCodes.OK).json(transfers);
    
    }

    export async function createTransfer(req: Request, res: Response) {
        const { fromUserId, toUserId, amount, date } = req.body;
        const newTransfer = await transferRepository.createTransfer({
            amount: parseFloat(amount),
            date: date ? new Date(date) : new Date(),
            sourceId: fromUserId,
            targetId: toUserId,
        });
        res.status(StatusCodes.CREATED).json(newTransfer);
    }