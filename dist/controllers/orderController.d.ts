import { Request, Response } from 'express';
export declare const createOrder: (req: Request, res: Response) => Promise<void>;
export declare const createPaymentIntent: (req: Request, res: Response) => Promise<void>;
export declare const confirmPayment: (req: Request, res: Response) => Promise<void>;
export declare const getUserOrders: (req: Request, res: Response) => Promise<void>;
export declare const getOrderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=orderController.d.ts.map