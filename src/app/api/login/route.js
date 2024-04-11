import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt"; 
export async function POST(req) {
  const data = await req.json();

  const { email, password } = data;
  mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email });
   const passwordOk = user && bcrypt.compareSync(password, user.password);
   if (passwordOk) {
     return Response.json(user);
   }
  //  return Response.json({passwordOk});

}
