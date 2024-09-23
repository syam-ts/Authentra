import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-MV4t8Sv5ig9IAsUdZvszDIFUzXAqcQ_VQ&s"
    }

}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User