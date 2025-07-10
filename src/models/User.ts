import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
    _id?: mongoose.Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://ik.imagekit.io/Ashik0512/images/avatar01?updatedAt=1751621420636",
    },
},{
    timestamps: true,
})


userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next()
});

userSchema.methods.comparePassword = async function (newPassword: string): Promise<boolean> {
  return await bcrypt.compare(newPassword, this.password);
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;