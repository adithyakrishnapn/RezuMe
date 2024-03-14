var db = require('../config/connection');
const bcrypt = require("bcrypt");

module.exports = {
    addDetails: (details) => {
        return new Promise (async (resolve,reject)=>{
            details.Password = await bcrypt.hash(details.Password,10);
            db.get().collection('details').insertOne(details).then((data) => {
                console.log("Created successfully")
                resolve(data.insertedId);
            });
        })
        },
        loginDetails : (data)=>{
            return new Promise (async(resolve,reject)=>{
                let response = {};
                let user = await db.get().collection('details').findOne({Mail : data.Mail});
                if(user){
                    bcrypt.compare(data.Password,user.Password).then((status) => {
                        if(status){
                            response.user = user;
                            response.status = true;
                            console.log("Login Successful");
                            resolve(response);
                        }else{
                            console.log("Login Failed");
                            resolve({status : false});
                        }
                    })
                } else {
                    console.log("User not found");
                    resolve({ status: false });
                }
            })
        }
    }
