import { Document } from "mongoose";

export interface IUser extends Document {

    fullname: string;
    email: string;
    password: string;
    comparePassword(userPassword: string): Promise<boolean>;
  };
