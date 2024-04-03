const { response } = require('../app');
var db = require('../config/connection');

module.exports = {
    adminLogin : (data)=>{
        return new Promise (async(resolve,reject)=>{
            let response = {};
            let admin = await db.get().collection('admin').findOne({Name : data.name});
            if(admin){
                if(admin.Pass == data.Password){
                    response.admin = admin;
                    response.status = true;
                    console.log("Login Successful");
                    resolve(response);
                }
                else{
                    console.log("Login Failed");
                    resolve({status : false});
                }
            }
            else{
                console.log("No admin found");
            }
        })
    }
}