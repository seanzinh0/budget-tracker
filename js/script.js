"use strict";

class Budget {
    constructor() {
        this.income = [];
        this.expense = [];
        this.totalBudget = 0;
    }

    addIncome(incomeObj) {
        this.income.push(incomeObj);
        this.updateTotalBudget();
    }

    getIncome() {
        return this.income;
    }

    addExpense(expenseObj) {
        this.expense.push(expenseObj);
        this.updateTotalBudget();
        console.log(this.expense);
    }

    getExpense() {
        return this.expense;
    }

    updateTotalBudget() {
        const totalIncome = this.income.reduce((sum, val) => sum + val.amount, 0);
        const totalExpense = this.expense.reduce((sum, val) => sum + val.amount, 0);
        this.totalBudget = totalIncome - totalExpense;
    }

    getTotalBudget() {
        return this.totalBudget;
    }

    getTotalIncome() {
        return this.income.reduce((sum, val) => sum + val.amount, 0);
    }

    getTotalExpense() {
        return this.expense.reduce((sum, val) => sum + val.amount, 0);
    }

}

const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");

const budget = new Budget();

function deleteIncomeInput(e) {
    const incomeDiv = e.closest(".income-input");
    const amount = Number(incomeDiv.querySelector('input').value.replace('$', ''));
    const description = incomeDiv.querySelector('label').innerText;
    incomeDiv.remove();
    budget.income = budget.income.filter(item => !(item.amount === amount && item.description === description));
    budget.updateTotalBudget();
    console.log(budget.income);
    updateTotalsBreakdown();
}

addIncome.addEventListener("click", () => {
    let description = document.getElementById("description-income").value;
    let amount = document.getElementById("amount-income").value;
    let result = "";
    if (description.trim() === "") {
        alert("Please input a description");
        return;
    }
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        alert("Please input a number greater than 0");
        return;
    }
    result =
        `<div class="income-input">
            <label for="income-text">${description}</label>
            <div class="income-wrap">
            <input id="income-text" type="text" readonly value="$${numAmount.toFixed(2)}">
            <button class="delete-btn" onclick="deleteIncomeInput(this)">Delete</button>
            </div>
        </div>`;
    incomeField.insertAdjacentHTML("beforeend", result);
    document.getElementById("description-income").value = "";
    document.getElementById("amount-income").value = "";
    const incomeObj = {amount: numAmount, description: description};
    budget.addIncome(incomeObj);
    budget.updateTotalBudget();
    console.log(budget.getIncome());
    updateTotalsBreakdown();
});

function deleteExpenseInput(e) {
    const expenseDiv = e.closest(".expense-input");
    const amount = Number(expenseDiv.querySelector('input').value.replace('$', ''));
    const description = expenseDiv.querySelector('label').innerText;
    expenseDiv.remove();
    budget.expense = budget.expense.filter(item => !(item.amount === amount && item.description === description));
    budget.updateTotalBudget();
    console.log(budget.expense);
    updateTotalsBreakdown();
}

addExpense.addEventListener("click", () => {
    let description = document.getElementById("description-expense").value;
    let amount = document.getElementById("amount-expense").value;
    let result = "";
    if (description.trim() === "") {
        alert("Please input a description");
        return;
    }
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        alert("Please input a number greater than 0");
        return;
    }
    result =
        `<div class="expense-input">
                <label for="expense-text">${description}</label>
                <div class="expense-wrap">
                   <input id="expense-text" type="text" readonly value="$${numAmount.toFixed(2)}">
                   <button class="delete-btn" onclick="deleteExpenseInput(this)">Delete</button>
                </div>
            </div`;
    expenseField.insertAdjacentHTML("beforeend", result);
    document.getElementById("description-expense").value = "";
    document.getElementById("amount-expense").value = "";
    const expenseObj = {amount: numAmount, description: description};
    budget.addExpense(expenseObj);
    budget.updateTotalBudget();
    console.log(budget.getExpense());
    console.log(budget.getTotalExpense());
    console.log(budget.getTotalBudget());
    updateTotalsBreakdown();
});


function updateTotalsBreakdown() {
    const totalIncome = budget.getTotalIncome();
    const totalExpense = budget.getTotalExpense();
    const totalBudget = budget.getTotalBudget();
    const liTotalIncome = document.getElementById("total-income");
    const liTotalExpense = document.getElementById("total-expenses");
    const liTotalBudget = document.getElementById("total-budget");

    liTotalIncome.innerText = "Total Income: $" + totalIncome.toFixed(2);
    liTotalExpense.innerText = "Total Expense: $" + totalExpense.toFixed(2);
    liTotalBudget.innerText = "Total Budget: $" + totalBudget.toFixed(2);
}



// const updateDebugInfo = () => {
//     document.querySelector(".debug-data").innerHTML = JSON.stringify(budget.getExpense(), null, 2)
//     document.querySelector(".debug-data2").innerHTML = JSON.stringify(budget.getIncome(), null, 2)
// }

