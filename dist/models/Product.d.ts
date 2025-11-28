import mongoose, { Document } from 'mongoose';
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: mongoose.Types.ObjectId;
    images: string[];
    stock: number;
    slug: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IProduct>;
export default _default;
//# sourceMappingURL=Product.d.ts.map