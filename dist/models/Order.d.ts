import mongoose, { Document } from 'mongoose';
export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}
export interface IShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
export interface IPaymentInfo {
    method: 'stripe' | 'cash_on_delivery';
    stripePaymentIntentId?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
}
export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentInfo: IPaymentInfo;
    shippingAddress: IShippingAddress;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IOrder>;
export default _default;
//# sourceMappingURL=Order.d.ts.map