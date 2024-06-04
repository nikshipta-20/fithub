import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    GroupID : {
        type: Number,
        required : true
    },
    GroupName : {
        type: String,
        required : true
    },
    Users : [
        {
            UserID : {
                type: Number,
                required: true // Ensure UserID is required
            }
        }
    ],
    Programs : [
        {
            Pid : {
                type: Number
            },
            Progress : {
                type : Number
            }
        }
    ],
    Rank : {
        type:Number
    }
})


export const Group = mongoose.model('Group', groupSchema);