"use strict";

class Budget {
    constructor(income, expense, totalBudget) {
        this.income = [];
        this.expense = [];
        this.totalBudget = totalBudget;
    }

    addIncome(num) {
        this.income.push(num);
    }

    getIncome() {
        return this.income;
    }

    addExpense(num) {
        this.expense.push(num);
        console.log(this.expense);
    }

    getExpense() {
        return this.expense;
    }

    getTotalBudget() {
        let totalIncome = null;
        for (let i = 0; i < this.income.length; i++) {
            totalIncome = totalIncome + this.income[i];
        }
        let totalExpense = null;
        for (let i = 0; i < this.expense.length; i++) {
            totalExpense = totalExpense = totalExpense + this.expense[i];
        }

        this.totalBudget = totalIncome - totalExpense;
        return this.totalBudget;
    }
}

const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");

const budget = new Budget();

function deleteIncomeInput(e) {
    e.closest(".income-input").remove();
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
    budget.addIncome({amount: numAmount, description: description});
    updateDebugInfo()
});

function deleteExpenseInput(e) {
    e.closest(".income-input").remove();
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
    budget.addExpense({amount: numAmount, description: description});
    updateDebugInfo()
});

const updateDebugInfo = () => {
    document.querySelector(".debug-data").innerHTML = JSON.stringify(budget.getExpense(), null, 2)
    document.querySelector(".debug-data2").innerHTML = JSON.stringify(budget.getIncome(), null, 2)
}

