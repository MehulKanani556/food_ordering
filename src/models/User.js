import bcrypt from 'bcrypt';
import { timeStamp } from "console";
import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    
    password: {
        type: String,
        required: true,
        validate: pass => {
            if (!pass?.length || pass.length < 5) {
                new Error("password must be at least 5 characters");
                return false;
            }
        }
    },
}, { timestamps: true});

// for hash passwords

UserSchema.post('validate', function (user) {
    const notHashPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashPassword, salt);
})

export const User = models?.User || model('User', UserSchema);
