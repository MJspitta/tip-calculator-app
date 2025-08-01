const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('no-of-people');
const tipButtons = document.querySelectorAll('.tips');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalDisplay = document.getElementById('total');
const resetBtn = document.querySelector('.reset-btn');

let selectedTip = null;


const calculateBill = (bill, tipPercent, noOfPeople) => {
  const tipAmount = (tipPercent / 100) * bill;
  const totalAmount = bill + tipAmount;
  const tipPerPerson = tipAmount / noOfPeople;
  const totalPerPerson = totalAmount / noOfPeople;

  return {
    tipAmount: tipPerPerson.toFixed(2),
    totalAmount: totalPerPerson.toFixed(2)
  };
};

const updateDisplay = () => {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || !people || !selectedTip) {
    tipAmountDisplay.textContent = '0.00';
    totalDisplay.textContent = '0.00';
    resetBtn.disabled = true;
    return;
  }

  const { tipAmount, totalAmount } = calculateBill(bill, selectedTip, people);

  tipAmountDisplay.textContent = tipAmount;
  totalDisplay.textContent = totalAmount;
  resetBtn.disabled = false;
};

const clearSelected = () => {
  tipButtons.forEach(btn => {
    btn.classList.remove('selected');
    if (btn.classList.contains('custom-tip') && btn.tagName === 'INPUT') {
      btn.remove();
    }
  });
};

tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    clearSelected();

    if (btn.classList.contains('custom-tip')) {
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Custom';
      input.classList.add('tips', 'custom-tip');
      // input.style.padding = '0.5rem 1rem';
      btn.replaceWith(input);
      input.focus();

      input.addEventListener('input', () => {
        selectedTip = parseFloat(input.value) || 0;
        updateDisplay();
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.replaceWith(btn);
          selectedTip = null;
          updateDisplay();
        }
      });

      return;
    }

    btn.classList.add('selected');
    selectedTip = parseFloat(btn.value);
    updateDisplay();
  });
});

billInput.addEventListener('input', updateDisplay);
peopleInput.addEventListener('input', updateDisplay);

resetBtn.addEventListener('click', () => {
  billInput.value = '0';
  peopleInput.value = '0';
  selectedTip = null;
  clearSelected();
  updateDisplay();
});