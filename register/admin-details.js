const { response } = require('../app');
var db = require('../config/connection');

module.exports = {
    adminLogin : (data)=>{
        return new Promise (async(resolve,reject)=>{
            response = {};
            let admin = await db.get().collections('admin').findOne({Name : data.Name});
            if(admin){
                if(admin.Pass == data.Password){
                    response.user = user;
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