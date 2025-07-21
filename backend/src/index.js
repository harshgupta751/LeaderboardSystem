import express from 'express'
import cors from 'cors'
import { ClaimHistoryModel, ObjectId, UserModel } from './db.js'
const app= express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(express.json())

app.post('/users',async function(req,res){
const username= req.body.username
if(!username){
    res.json({
        message: "Username must not be empty!"
    })
    return
}

try{
const findUser= await UserModel.findOne({
    username
})
if(findUser){
    res.json({
        message: "Username already exists!"
    })
    return
}

await UserModel.create({
    username,
    totalPoints: 0
})
res.json({
    message: "User added successfully!"
})
}catch(e){
    res.status(403).json({
        error: "Error occured. Please try again!"
    })
}




})

app.post('/claim/:userId', async function(req,res){
    if(req.params.userId.length!=24){
        res.status(404).json({
            message: "UserId is invalid!"
        })
        return
    }
    const userId= new ObjectId(req.params.userId)
    try{
const findUser= await UserModel.findOne({
    _id: userId
})
if(!findUser){
 res.status(404).json({
    message: "UserId is invalid!"
 })
 return
}

const randomPoints= Math.floor(Math.random()*10) + 1

await ClaimHistoryModel.create({
    points: randomPoints,
    userId
})

const UpdatedUser=await UserModel.findByIdAndUpdate(userId,{
$inc: {totalPoints: randomPoints}
}, {new: true})

res.json({
    randomPoints,
    totalPoints: UpdatedUser.totalPoints
})

    }catch(e){
          res.status(403).json({
        error: "Error occured. Please try again!"
    })
    }

})


app.get('/users', async function(req,res){
try{
let allUsers= await UserModel.find({})
allUsers= allUsers.sort((user1,user2)=> user2.totalPoints - user1.totalPoints)

res.json({
    allUsers
})

}catch(e){
       res.status(403).json({
        error: "Error occured. Please try again!"
    })
}

})


app.get('/history/:userId', async function(req,res){
        if(req.params.userId.length!=24){
        res.status(404).json({
            message: "UserId is invalid!"
        })
        return
    }
    const userId= new ObjectId(req.params.userId)
try{
const findUser= await UserModel.findOne({
    _id: userId
})
if(!findUser){
 res.status(404).json({
    message: "UserId is invalid!"
 })
 return
}

const userClaimHistory= await ClaimHistoryModel.find({
    userId: userId
})
res.json({
    userClaimHistory
})
}catch(e){
        res.status(403).json({
        error: "Error occured. Please try again!"
    })
}



})

app.listen(3000)