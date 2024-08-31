var db = require('../config/connection');
const bcrypt = require("bcrypt");

module.exports = {
    addDetails: (details) => {
        return new Promise(async (resolve, reject) => {
            details.Password = await bcrypt.hash(details.Password, 10); // Hash the password
            db.get().collection('details').insertOne(details).then((data) => {
                console.log("Created successfully");
                resolve(data.insertedId); // Resolve with the inserted ID
            }).catch((error) => {
                console.error("Error creating user:", error);
                reject(error); // Reject in case of error
            });
        });
    },

    loginDetails: (data) => {
        return new Promise(async (resolve, reject) => {
            let response = {};
            let user = await db.get().collection('details').findOne({ Mail: data.Mail }); // Use findOne to fetch a single user
            if (user) {
                bcrypt.compare(data.Password, user.Password).then((status) => {
                    if (status) {
                        response.user = user;
                        response.status = true;
                        console.log("Login Successful");
                        resolve(response);
                    } else {
                        console.log("Login Failed - Incorrect Password");
                        resolve({ status: false });
                    }
                }).catch((error) => {
                    console.error("Error during password comparison:", error);
                    reject(error);
                });
            } else {
                console.log("User not found");
                resolve({ status: false });
            }
        });
    },

    LoginInfo: () => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection('details').find().toArray(); // Fetch all user details
            resolve(product);
        });
    },

    CheckInfo: (email) => {  // Changed parameter to accept only email
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection('details').findOne({ Mail: email }); // Use findOne to check for existence
            if (user) {
                resolve(true); // User exists
            } else {
                resolve(false); // User does not exist
            }
        });
    }
};
