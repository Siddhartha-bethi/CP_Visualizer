const { ObjectId } = require("bson");
const handlesModel = require("./handlesModel");
const userModel = require("./userModel");
const batchModel = require("./batchModel");

async function AddToCollection(model,object){
    const res=await model.insertMany([object]);
    //console.log(res);
    return res;
}
async function getData(model,filter){
    const res= await model.find(filter);
    return res;
}
async function deleteData(model, filter){
    const res= await model.deleteOne(filter);
    return res;
}

// async function Testing2(){
//     let ans = await handlesModel.find({leetcodeHandle:'21ag1a6661'}).populate('userid').exec();
//     console.log(ans);
// }

// async function Testing(){
//     let ans = await AddToCollection(TestModel, {userid:new ObjectId('655e3ce9d513e14d1755944b')})
//     ans = ans[0]
//     console.log(ans.userid);
// }
// let ans = Testing2();
// let ans = AddToCollection(authorModel, {name:"SIddhu",rollNumber: '283'});
// console.log(ans)
// let ans = AddToCollection(bookModel, {name:"charlie",userid:new ObjectId('65606f760c349b04183838d7')})
// console.log(ans);
async function getUserIdsfromRoll(){
    let batch = "BVRITH-Y21"
    let batchObj  = await batchModel.find({batch:batch});
    let batchId = batchObj[0]["_id"];
    let rollNumbers = batchObj[0]['rollNumbers'];
    console.log(rollNumbers);
    const allstudentIds =[]
    for (let index = 0; index < rollNumbers.length; index++) {
        const roll = rollNumbers[index];
        
        let userobj = await userModel.find({ rollNumber: roll });
        let id = userobj[0]["_id"];
        allstudentIds.push(id);
    };
    console.log("allstudents Ids are ",allstudentIds);
    let res = await batchModel.findByIdAndUpdate(batchId,{
        studentid :allstudentIds 
    },{new:true})
    console.log("res is ",res);
}
// getUserIdsfromRoll();
async function getAllBeingZeroRollNumbers(){
    let res = await userModel.find().select('rollNumber');
    const rolls = res.map((r)=>{
        return r.rollNumber;
    })
    console.log("roll is ",rolls);
}
// getAllBeingZeroRollNumbers();



module.exports = {AddToCollection,getData,deleteData}