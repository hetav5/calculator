const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const datafile = 'data.txt';

let ophistory = [];
if(fs.existsSync(datafile)){
  const historydata = fs.readFileSync(datafile, 'utf8');
  if (historydata){
    ophistory = historydata.split('\n').filter(line =>line.trim());
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.post('/calculate', (req, res) => {
  const { expression } = req.body;

  try {
    const result = eval(expression); 
    const operation = `${expression} = ${result}`;
    ophistory.push(operation);
    
    
    if (ophistory.length > 20) {
      ophistory.shift(); 
    }
    fs.writeFileSync(datafile, ophistory.join('\n'), 'utf8');
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});


app.get('/history', (req, res) => {
  res.json({ history: ophistory });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
