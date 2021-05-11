const Database = require("./database");
const fs = require('fs')


exports.makeReport = async function makeReportEntrypoint(queryObject) {
    let guestObjArr;
    let inventoryObjArr;
    let finalObjArr = [];

    //converts objects to ISO format
    const startDate = await new Date(queryObject.startDate);
    const endDate = await new Date(queryObject.endDate);

    await getGuestInfoRecords(startDate, endDate).then(r => {
        guestObjArr = r;
    });
    await getInventoryRecords(startDate, endDate).then(r => {
        inventoryObjArr = r;
    });
    await matchKey(inventoryObjArr, guestObjArr, finalObjArr);

    let csvStr = turnToCSV(finalObjArr);
    await createFile(csvStr);
};

//returns array of inventory records
async function getInventoryRecords(startDate, endDate){
    const inventoryCollection = await getInventoryCollection();
    return await inventoryCollection.find({dateTime : { $gt: startDate, $lt: endDate }}).toArray();
}
//returns array of guest records
async function getGuestInfoRecords(startDate, endDate){
    const guestInfoCollection = await getGuestInfoCollection();
    return await guestInfoCollection.find({  dateTime : { $gt: startDate, $lt: endDate }}).toArray();
}

function matchKey(invObjArr, gueObjArr, finalObjArr){
    for(var i = 0; i < gueObjArr.length; i++){
        for(var j = 0; j < invObjArr.length; j++){
            if(gueObjArr[i].id === invObjArr[j].id) finalObjArr.push(mergeObj(invObjArr[i], gueObjArr[j]));
        }
    }
}

//merges objects after key (id) match into new object
function mergeObj(invObj, guestObj){
    return Object.assign({}, invObj,guestObj);
}

function turnToCSV(data){
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join('\n');
}
function createFile(csvStr){
    fs.writeFileSync('./CSV/report.csv', csvStr, (err)=>{
        if(err) throw err;
    });
}
//get collections
async function getGuestInfoCollection(){
    const database = await Database.get();
    return database.db("reporting-practice").collection('guestinfo');

}
async function getInventoryCollection(){
    const database = await Database.get();
    return database.db("reporting-practice").collection('inventory');
}