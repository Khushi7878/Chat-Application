const chatModel = require("../model/chatModel");

const addMessage = async (req, res) => {
    try{
        const {from,to,message} = req.body;
        const data = await chatModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
          });
        if(data){
          return  res.json({msg: "message added successfully"})
        }
        return  res.json({msg: "failed to add msg to the database"})

    }catch(err){
        console.log(err)
    }
 }

 const getAllMessage = async (req, res) => {
    try{
        const {from, to} = req.body;
        const messages = await chatModel.find({
            users: {
                $all : [from, to]
            }
        }).sort({updatedAt:1});
        const projectedMessages = messages.map((msg) => {
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectedMessages)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { addMessage, getAllMessage};
