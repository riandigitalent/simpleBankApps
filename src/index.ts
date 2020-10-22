// register root file untuk menggunakan sourcemap
//biar mudah cari error
import 'source-map-support/register'

//import package db
import mongoose  from 'mongoose'

//import package express
import express from 'express'
import bodyParser from 'body-parser'

//import model & controller
import { Customer, CustomerType } from './customer'
import { Account, AccountType } from './account'
import { Transaction, TransactionType } from './transaction'

//import config
import dotenv from 'dotenv'
dotenv.config()



async function initApp() {
  const app = express()

  //init db
  await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})

  //panggil function di controller
  const customerModel = new Customer()
  const accountModel = new Account()
  const transactionModel = new Transaction()


  app.use(bodyParser.json())

  //router costomer
  app.post('/customer', async function(req, res, next) {
    try {
      await customerModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ success: true })
  })

  app.get('/customer', async function(req, res, next) {
    let customers: CustomerType[]
    try {
      customers = await customerModel.getAll()
    } catch (error) {
      return next(error)
    }

    return res.send(customers)
  })

  app.get('/customer/:id', async function(req, res, next) {
    let customer: CustomerType | null
    try {
      customer = await customerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }

    return res.send(customer)
  })

  app.put('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

//account
app.post('/account', async function(req, res, next) {
  try{
    await accountModel.create(req.body)
  }catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.get('/account', async function(req, res, next) {
  let accounts : AccountType[]
  try {
    accounts = await accountModel.getAll()
  } catch (error){
    return next(error)
  }

  return res.send(accounts)
})

app.get('/account/:id', async function(req, res, next) {
  let account: AccountType | null
  try{
    account = await accountModel.getByID(req.params.id)
  } catch (error){
    return next(error)
  }

  return res.send(account)
})

app.put('/account/:id', async function(req, res, next) {
  try{
    await accountModel.update(req.params.id, req.body)
  } catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.delete('/account/:id', async function(req, res, next) {
  try{
    await accountModel.delete(req.params.id)
  } catch (error){
    return next(error)
  }

  res.send({success : true})
})


//transaction
app.post('/transaction', async function(req, res, next) {
  try{
    await transactionModel.create(req.body)
  }catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.get('/transaction', async function(req, res, next) {
  let transactions : TransactionType[]
  try {
    transactions = await transactionModel.getAll()
  } catch (error){
    return next(error)
  }

  return res.send(transactions)
})

app.get('/transaction/:id', async function(req, res, next) {
  let transaction: TransactionType | null
  try{
    transaction= await transactionModel.getByID(req.params.id)
  } catch (error){
    return next(error)
  }

  return res.send(transaction)
})

app.put('/transaction/:id', async function(req, res, next) {
  try{
    await transactionModel.update(req.params.id, req.body)
  } catch (error){
    return next(error)
  }

  res.send({success :true})
})

app.delete('/transaction/:id', async function(req, res, next) {
  try{
    await transactionModel.delete(req.params.id)
  } catch (error){
    return next(error)
  }
  res.send({success : true})
})

///end

  app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${ process.env.PORT || 8000 }`)
  })
}

initApp()