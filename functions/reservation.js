export function getMinecraftUser(name){
    return new Promise((resolve, reject) => {
        request({url: `https://api.mojang.com/users/profiles/minecraft/${name}`, method: "GET"}, function(err, response, body){
            if(err){
                resolve(false);
            }
            else{
                console.log(response.body);
                resolve(response.body.name);
            }
        })
    })
}

export function getReservationName(name){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Select * from reservation where name="${name}"`, function(err, rows){
            if(err)
                resolve(false);
            else if(rows.length)
                resolve(true)
            else
                resolve(false);
        })
        db.end();
    })
}

export function getReservationEmail(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Select * from reservation where email="${email}"`, function(err, rows){
            if(err)
                resolve(false);
            else if(rows.length)
                resolve(true)
            else
                resolve(false);
        })
        db.end();
    })
}