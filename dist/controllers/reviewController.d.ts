import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const createReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProductReviews: (req: Request, res: Response) => Promise<void>;
export declare const getUserReviews: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProductRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=reviewController.d.ts.map