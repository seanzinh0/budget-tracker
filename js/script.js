"use strict";

class Budget {
    constructor(income, expense, budget) {
        this.income = income || [];
        this.expense = expense || [];
        this.budget = budget;
    }

    addIncome(num) {
        this.income.push(num);
    }

    getIncome() {
        return this.income;
    }
}

const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");

const budget = new Budget();

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
            <button class="delete-btn">Delete</button>
            </div>
        </div>`;
        incomeField.insertAdjacentHTML("beforeend", result);
    document.getElementById("description-income").value = "";
    document.getElementById("amount-income").value = "";
});

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
            <button class="delete-btn">Delete</button>
            </div>
        </div>`;
        expenseField.insertAdjacentHTML("beforeend", result);
        document.getElementById("description-expense").value = "";
        document.getElementById("amount-expense").value = "";
});
