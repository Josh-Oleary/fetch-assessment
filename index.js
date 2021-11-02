const express = require('express');
const app = express();

const port = 3000;

let localDB = [];
let payer = {};
let spendObj = {};
let spendResult = [];

app.use(express.json())
app.use(express.urlencoded());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(index)
})

//creates a payer obj to hold total points for each payer
const setPayer = (obj) => {
  if(!payer[obj.payer]){
    payer[obj.payer] = parseInt(obj.points);
  } else if (payer[obj.payer]){
    payer[obj.payer] += parseInt(obj.points);
  }
}

const spend = (amount, payerObj, localDB) => {
  amount = parseInt(amount)
  
  while(amount > 0){
    for(let i = 0; i < localDB.length; i++){
      //check to see if the first localDB points is greater than the amount, if so we only have one step to take
      if(parseInt(localDB[i].points) > amount && i === 0){
        payerObj[localDB[i].payer] = payerObj[localDB[i].payer] - amount;
        spendObj[localDB[i].payer] = 0;
        spendObj[localDB[i].payer] -= amount;
        amount -= amount;
        return;
      }
      if(spendObj[localDB[i].payer] == undefined){
        spendObj[localDB[i].payer] = 0;
        spendObj[localDB[i].payer] -= parseInt(localDB[i].points)
        payerObj[localDB[i].payer] -= parseInt(localDB[i].points)

      } else if(parseInt(localDB[i].points) > amount){
        spendObj[localDB[i].payer] -= amount
        payerObj[localDB[i].payer] -= amount
      } else {
        spendObj[localDB[i].payer] -= parseInt(localDB[i].points)
        payerObj[localDB[i].payer] -= parseInt(localDB[i].points)
      }
      amount -= parseInt(localDB[i].points)
    }
  }
  for(let key in spendObj){
    spendResult.push({'payer': `${key}`, 'points': `${spendObj[key]}`})
  }
}

app.post('/addTransaction', (req, res, e) => {
  let date = new Date();
  req.body.timestamp = date;
  const body = req.body;
  setPayer(body);
  localDB.push(body);
  localDB.sort((a,b) => b.timestamp - a.timestamp)
  res.send(localDB)
})

app.post('/spend', (req, res) => {
  spend(req.body.spend, payer, localDB)
  res.send(spendResult)
})

app.get('/balance', (req, res) => {
  res.send(payer)
})


app.listen(port, () => {
  console.log('Fetch is running on port: ', port)
})