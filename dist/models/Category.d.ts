import mongoose, { Document } from 'mongoose';
export interface ICategory extends Document {
    name: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, mongoose.DefaultSchemaOptions> & ICategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, ICategory>;
export default _default;
//# sourceMappingURL=Category.d.ts.map