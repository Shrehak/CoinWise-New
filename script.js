const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const expenseChart = document.getElementById('expense-chart');
const categoryChart = document.getElementById('category-chart');
const currentDateDisplay = document.getElementById('current-date');

// Display current date
function updateCurrentDate() {
    const now = new Date();
    currentDateDisplay.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
}
updateCurrentDate();
setInterval(updateCurrentDate, 60000); // Update every minute

// Retrieve transactions from local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null 
    ? localStorageTransactions 
    : [];

// Add a new transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || dateInput.value === '') {
        alert('Please provide all details (description, amount, and date).');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
        date: dateInput.value,
        category: categoryInput.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    updateCharts();

    // Clear input fields
    text.value = '';
    amount.value = '';
    dateInput.value = '';
    categoryInput.value = 'other';
}

// Generate unique ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Categorize transaction with emojis
    const categoryEmojis = {
        'food': '🍽️', 'transport': '🚗', 'shopping': '🛍️', 
        'entertainment': '🎉', 'salary': '💰', 'bills': '📝', 
        'other': '📌'
    };

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        <div>
            ${categoryEmojis[transaction.category]} ${transaction.text}
            <small class="text-muted"> (${new Date(transaction.date).toLocaleDateString()})</small>
        </div>
        <div>
            <span>${sign}₹${Math.abs(transaction.amount)}</span>
            <button class="btn btn-sm btn-danger ms-2" onclick="removeTransaction(${transaction.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    list.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
    const expense = (
        amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    );

    balance.innerText = `₹${total.toFixed(2)}`;
    moneyPlus.innerText = `₹${income.toFixed(2)}`;
    moneyMinus.innerText = `₹${expense.toFixed(2)}`;
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
    updateCharts();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Update charts
function updateCharts() {
    // Income vs Expense Chart
    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = Math.abs(transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0));

    if (window.expenseChartInstance) {
        window.expenseChartInstance.destroy();
    }

    window.expenseChartInstance = new Chart(expenseChart, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [income, expense],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Category-wise Expense Chart
    const categoryData = transactions.reduce((acc, transaction) => {
        if (transaction.amount < 0) {
            acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
        }
        return acc;
    }, {});

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);

    if (window.categoryChartInstance) {
        window.categoryChartInstance.destroy();
    }

    window.categoryChartInstance = new Chart(categoryChart, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: ['#ffc107', '#fd7e14', '#0dcaf0', '#6c757d', '#6610f2', '#198754', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Categories'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount (₹)'
                    }
                }
            }
        }
    });
}

// Initialize app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
    updateCharts();
}

init();

form.addEventListener('submit', addTransaction);
