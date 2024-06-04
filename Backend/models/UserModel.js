import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserID:{
        type: Number
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Height: {
        type: Number,
        required: true
    },
    Weight: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Programs : [
        {
            Pid : {
                type: Number
            },
            Progress : {
                type : Number
            }
        }
    ]
    
})

userSchema.pre('save', function(next) {
    // Check if UserID is not already set
    if (!this.UserID) {
        // Generate a random integer UserID using Math.random() and multiply it by a large number to get a larger range
        this.UserID = Math.floor(Math.random() * 1000000); // Adjust the range as needed
    }
    next();
});

export const User = mongoose.model('User', userSchema);