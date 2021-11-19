const bank = require('../models/bank.modul').bank

const showDetailsOfAllUsers= (req,res)=>{
   bank.find({},(err , data) =>{
       if(err)
       return res.status(404).send(err.message)
       return res.status(200).json(data)
   })
}

const showDetailsOfUser = (req,res)=>{
    const {id} = req.params
    bank.findById(id ,(err , data)=>{

        if(err)
        return res.status(404).send(err.message)
        return res.status(200).json(data)  
    })
}

const addUser = (req , res)=>{
   const {passportId,cash,credit,name,email,isActive} = req.body
   const newUser = new bank({passportId,cash,credit,name,email,isActive})
   newUser.save((err ,data)=>{
    if(err)
    return res.status(404).send(err.message)
    return res.status(200).json(data)  
   })
}

const updateUser =(req , res) =>{
    const {id} = req.params
    const {credit} = req.body
    const updatedUser = {credit}
    bank.findByIdAndUpdate(id , updatedUser ,{runValidators : true , new : true}, (err ,data)=>{
        if(err)
        return res.status(404).send(err.message)
        return res.status(200).json(data)       
    })
}

const depositing =(req , res)=>{
    const {id} = req.params
    const {cash} =req.body
    bank.findById(id , (err , data)=>{
        if(err)
        return res.status(404).send(err.message)
        bank.findByIdAndUpdate(id,{cash :(data.cash) + (cash) },{runValidators : true , new : true} ,(err ,data)=>{
            if(err)
            return res.status(404).send(err.message)
            return res.status(200).send(data)
        } ) 
    })
   
}

const withdrawMoney = (req,res)=>{
    const {id} = req.params
    const {cash } = req.body
    bank.findById(id , (err ,data) =>{
        if(err)
        return res.status(404).send(err.message)
        const newCash = (data.cash - cash );
      //  console.log(newCash);
        const newCredit = data.credit - cash
      //  console.log(newCredit);
        if(newCash > 0 && newCredit >0 ){
            bank.findByIdAndUpdate(id ,{cash :newCash } ,{runValidators : true , new : true} ,(err ,data)=>{
              // console.log('11');
                if(err)
                return res.status(401).send(err.message)
              //  console.log('22');
                return res.status(200).send(data)
            })
        }else {
            return res.status(401).json({faild : "no card limete "})
        }
    }) 
}

const transferring = (req,res)=>{
    const {from ,to} = req.params
    const {cash} = req.body
    bank.findById(from , (err ,data)=>{
        if(err)
         return res.status(401).send(err.message)
         //withdrawMoney(req,res)
         const newCash = (data.cash - cash );
           const newCredit = data.credit - cash
         if(newCash > 0 && newCredit >0 ){
            bank.findByIdAndUpdate(from,{cash :newCash } ,{runValidators : true , new : true} ,(err ,data2)=>{
              // console.log('11');
                if(err)
                return res.status(401).send(err.message)
              //  console.log('22');
              bank.findById(to,(err ,data)=>{
                if(err)
                 return res.status(401).send(err.message) 
                 bank.findByIdAndUpdate(to,{cash :(data.cash)+(cash) },{runValidators : true , new : true} ,(err ,data1)=>{
                    if(err)
                    return res.status(404).send(err.message)
                    return res.status(200).json({data2 ,data1})
                } ) 
            })
               // return res.status(200).send(data)
            })

        }else {
            return res.status(401).json({faild : "no card limete "})
        }
})
}

module.exports={
    showDetailsOfAllUsers,
    showDetailsOfUser,
    addUser,
    updateUser,
    depositing,
    withdrawMoney,
    transferring
}