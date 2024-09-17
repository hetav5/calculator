const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


let operationHistory = [];


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());


app.post('/calculate', (req, res) => {
  const { expression } = req.body;

  try {
    const result = eval(expression); 
    
    
    const operation = `${expression} = ${result}`;
    operationHistory.push(operation);
    
    
    if (operationHistory.length > 20) {
      operationHistory.shift(); 
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});


app.get('/history', (req, res) => {
  res.json({ history: operationHistory });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
