import { TryCatch } from "../middlewares/error";
import { Chat } from "../models/chat.js";
import { ErrorHandler } from "../utils/utility";

const newGroupChat = TryCatch(async(req, res) =>{
    const {name, members} = req.body;

    if(members.length <2)
        return next(
            new ErrorHandler("Group must have atleast 3 members", 400)
        );
    
    const allMembers = [...members, req.user];
    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers
    })
  })

  export { newGroupChat}