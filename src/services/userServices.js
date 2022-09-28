// const userModel = require ("../models/userModel")
// const register = async (user, callback) => {
//     let userfind = await userModel.findOne({email: user.email});
//     if (userfind) {
//         return callback({errMessage: "Email already in use!", details: ""});
//     }
//     const newUser = new userModel(user);
//     newUser.role="Admin"
//     await newUser
//         .save()
//         .then((result) => {
//             return callback(false, {message: "User created successfully!"});
//         })
//         .catch((err) => {
//             return callback({errMessage: "Something went wrong!", details: err});
//         });
// };
// module.exports={
//     register
// }