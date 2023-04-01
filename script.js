const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransactions = [
//     {id:1, text: 'Flower', amount: -20},
//     {id:2, text: 'Salary', amount: 300},
//     {id:3, text: 'Book', amount: -10},
//     {id:4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !==null ? localStorageTransactions : [];


// generate Random ID
function generateID() {
    return Math.floor(Math.random() *100000000);
}

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim()==='') {
        alert("Please add a text and a amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }

    
}


// Add transactions to DOM List
// This function is not looping on all transaction at once.
// It Adds only one transaction at a time which is passed as a argument to the function.
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const singleListItem = document.createElement('li');

    // Add class based on amount value
    singleListItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    singleListItem.innerHTML = `
        ${transaction.text} 
        <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(singleListItem);
}

// Update the balance Income and expense
function updateValues() {
    const amounts = transactions.map(tran => tran.amount);

    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);

    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item),0)
                    .toFixed(2);

    const expense = amounts
                    .filter(item => item < 0)
                    .reduce((acc, item) => (acc += item),0)
                    .toFixed(2)*-1;

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}




// Delete Transaction / remove Transaction
function removeTransaction(ID) {
    transactions = transactions.filter(transaction => transaction.id !== ID);

    updateLocalStorage();

    Init();
}

// Init app
function Init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

Init();

form.addEventListener('submit', addTransaction);