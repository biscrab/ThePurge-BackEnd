import request from "request";

function getUser(token){
    console.log(token);
    return new Promise((resolve, reject) => {
        request({url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, method: "GET"}, function(err, response, body){
            if(response.body){
                resolve(JSON.parse(response.body).email);
            }
            else{
                resolve(false);
            }
        })
    })
}

export default getUser;