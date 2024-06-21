import mongoose, { Schema, model, Types } from "mongoose";

const scheme = new Schema({
    content:String,
    attchements:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    sender:{
        type: Types.ObjectId,
        ref: "User",
        require: true
    },
    chat:{
        type: Types.ObjectId,
        ref: "Chat",
        require: true
    },
}, {
    timestamps: true
}
);

export const Message =  mongoose.models.Message || model("Message", scheme);