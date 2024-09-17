document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    const historyBtn = document.getElementById('history-btn');
    const historyDiv = document.getElementById('history');
    const math = require('mathjs');
    const result = math.evaluate(expression);
  
    buttons.forEach(button => {
      button.addEventListener('click', async () => {
        const value = button.getAttribute('data-value');
  
        if (value === 'AC') {
          display.value = '';
        } else if (value === 'DEL') {
          display.value = display.value.slice(0, -1);
        } else if (value === '=') {
          try {
            const response = await fetch('/calculate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ expression: display.value }),
            });
            const data = await response.json();
  
            if (response.ok) {
              display.value = data.result;
            } else {
              display.value = 'Error';
            }
          } catch (error) {
            display.value = 'Error';
          }
        } else {
          display.value += value;
        }
      });
    });
  

    historyBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/history');
        const data = await response.json();
        historyDiv.innerHTML = '<h3>Last 20 Operations</h3>';
        historyDiv.innerHTML += data.history.map(op => `<p>${op}</p>`).join('');
      } catch (error) {
        historyDiv.innerHTML = 'Error fetching history';
      }
    });
  });
  