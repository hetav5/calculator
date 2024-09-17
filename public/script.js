document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('button');

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
});
