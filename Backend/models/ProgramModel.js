import mongoose from "mongoose";

const programSchema = mongoose.Schema({
    ProgramID : {
        type: Number,
        required : true
    },
    ProgramName : {
        type: String,
        required : true
    },
    Sets : [
        {
            SetID : Number
        }
    ]
})

export const Program = mongoose.model('Program', programSchema);