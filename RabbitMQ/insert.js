const Database = require("./database");

class Insert{

    static async insertUser(userData, queue){
        const customCollection = await getCustomCollection(queue);
        //add timestamp to object before insertion
        userData = Object.assign(userData,{dateTime: new Date()});
        customCollection.insertOne(userData, function(err, res){
            if (err) throw err;
            console.log(`user document inserted to ${queue} collection`);
        });
    }
}

async function getCustomCollection(queue){
    const database = await Database.get();
    return database.db("reporting-practice").collection(queue);
}

module.exports = Insert;