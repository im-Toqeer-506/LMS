import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    payment_info: {
        type: Object,
        // required:true
    },
}, { timestamps: true });

const OrderModel: Model<IOrder> = mongoose.model('Order', orderSchema);

export default OrderModel; 