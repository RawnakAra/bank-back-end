const express = require('express')
const router = express.Router()
const bankData = require('../controllers/bank.controller')

router.get('/',(req,res)=>{
    bankData.showDetailsOfAllUsers(req,res)
}).get('/:id',(req,res)=>{
    bankData.showDetailsOfUser(req,res)
}).post('/',(req ,res)=>{
    bankData.addUser(req , res)
}).put('/credit/:id' , (req ,res)=>{
    bankData.updateUser(req , res)
}).put('/cash/:id' , (req,res)=>{
    bankData.depositing(req,res)
}).put('/withdraw/:id',(req ,res)=>{
    bankData.withdrawMoney(req ,res)
}).put('/transferring/:from/:to' ,(req,res)=>{
    bankData.transferring(req,res)
})


module.exports = router