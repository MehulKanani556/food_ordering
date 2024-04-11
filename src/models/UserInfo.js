import { Schema, models, model } from "mongoose";


const UserInfoSchema = new Schema({
    email: { type: String, required: true, unique: true },
    streetAddress: { type: String },
    phone: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
    name: { type: String}
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
