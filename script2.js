const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const incomeRadio = document.getElementById('incomeRadio');4
const expenseRadio = document.getElementById('expenseRadio');


// const dummyTransactions = [
//     {id:1, text: 'Flower', amount: -20},
//     {id:2, text: 'Salary', amount: 300},
//     {id:3, text: 'Book', amount: -10},
//     {id:4, text: 'Camera', amount: 150},
//     {id:5, text: 'Food', amount: -130}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !==null ? localStorageTransactions : [];

// Upadet Income, Expense and Balance
function update_Inc_Exp_Bal(totalIncome,totalExpense,totalbalance) {
    money_plus.innerText = `$${totalIncome}`;
    money_minus.innerText = `$${totalExpense}`;
    balance.innerText = `$${totalbalance.toFixed(2)}`;
}

// Show all transaction in the History List
function showTransactions() {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalbalance = 0;

    transactions.forEach((tran) => {
        list.innerHTML += list.innerHTML = `
        <li class=${tran.amount<0 ? "minus" : "plus"}>${tran.text} 
        <span>$${tran.amount}</span>
        <button class="delete-btn" onclick="removeTransaction(${tran.id})">x</button></li>
        `;

        tran.amount < 0 
            ?
            (totalExpense+=Math.abs(tran.amount), totalbalance-=Math.abs(tran.amount)) 
            : 
            (totalIncome+=Math.abs(tran.amount), totalbalance+=Math.abs(tran.amount));
    })

    update_Inc_Exp_Bal(totalIncome,totalExpense,totalbalance);

    
}


function addTransaction(e) {
    e.preventDefault();

    const inputText = text.value;
    const inputAmount = amount.value;

    if (incomeRadio.checked) {
        transactions.push({id:(transactions.length+1), text: inputText, amount: inputAmount});
    } else {
        transactions.push({id:(transactions.length+1), text: inputText, amount: -inputAmount});
    }


    updateLocalStorage();
    // At the end of adding the transaction the whole history 
    // list will be refreshed and balance, income , expense is updated
    list.innerHTML = '';
    showTransactions();
    text.value = '';
    amount.value = '';
}


// Delete Transaction / remove Transaction
function removeTransaction(ID) {
    transactions = transactions.filter(transaction => transaction.id !== ID);

    updateLocalStorage();

    list.innerHTML = '';
    showTransactions();
}


form.addEventListener('submit', addTransaction);



function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


showTransactions();








// list.addEventListener('click', (e) => {
//     if (e.target.classList.contains('delete-btn')) {
//         const x = e.target;
//         const listItem = x.parentElement;
//         list.removeChild(listItem);
//     }
// })

// deleteButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const listItem = button.parentElement;
//         list.removeChild(listItem);
//     })
// })


// var deleteButtons = document.querySelectorAll('.delete-btn');

// function updateDeleteBtns() {
//     deleteButtons = document.querySelectorAll('.delete-btn');

//     deleteButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const listItem = button.parentElement;
//             list.removeChild(listItem);
//         })
//     })
// }