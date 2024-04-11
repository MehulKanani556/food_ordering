import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt  from "bcrypt";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const { password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.updateOne({ email }, { password:hashedPassword });

  return Response.json(true);
}
