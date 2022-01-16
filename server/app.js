const express = require('express');
const app =express();
const port = process.env.PORT || 3000

const cors = require('cors')

const { getUsers,
        addUser,
        deleteUser,
        deposit,
        withdraw,
        addCredit,
        transfer,
        filterUsers,
        getUserDetail, } = require('./utils')

app.use(cors());

app.set('view engine', 'hbs')
const path = require('path')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());


app.get('/users',(req, res) => {
    try {
        res.status(200).header('Access-Control-Allow-Origin','*').send(getUsers());
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
});

app.get('/user',(req, res) => {
        console.log(req.query)
    try {
        if(!req.query.id){
            return res.status(403).send('404')
        }
        res.status(200).header('Access-Control-Allow-Origin','*').send(getUserDetail(req.query.id));
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});

app.post('/users',(req, res) => {
    console.log(req.query)
    try{
        console.log(req.body)
        res.status(201).send(addUser(req.body))
    }catch(e){
        res.status(400).send({ error: e.message })
    }
})

app.delete('/users',(req, res) => {
    try {
        res.status(200).send(deleteUser(req.body.id))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/deposit',(req, res) => {
    try {
        res.status(200).send(deposit(req.body.id, req.body.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/withdraw',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).send(withdraw(req.body.id, req.body.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/add-credit',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).send(addCredit(req.body.id, req.body.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/transfer',(req, res) => {
    try {

        res.status(200).send(transfer(req.body.idGiver,req.body.idReceiver, req.body.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.get('/users/filter',(req, res) => {
    try {
        res.status(200).send(filterUsers(req.query.type, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.get('*',(req,res)=> {
    res.status(404).send('404')
})



app.listen(port,() => {
    console.log(`listening on port `+ port)
});