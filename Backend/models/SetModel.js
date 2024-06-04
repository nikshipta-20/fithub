import mongoose from "mongoose";

const setSchema = mongoose.Schema({
    SetID : {
        type: Number,
        required : true
    },
    SetName : {
        type: String,
        required : true
    },
    Exercises : [
        {
            name : String
        }
    ]
})

export const Set = mongoose.model('Set', setSchema);