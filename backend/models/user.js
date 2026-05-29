import {mongoose} from 'mongoose';

// {
//     "firstname": "anu",
//     "lastname": "jain",
//     "email": "anujain@example.com",
//     "password": "password123"
// }
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        // select: false // while fetching data, this field will be omitted
    },
    profilePic: {
        type: String,
        required: false
    }
}, {timestamps: true})

export default mongoose.model('users', userSchema);