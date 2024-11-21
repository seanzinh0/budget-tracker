"use strict";

const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");

addIncome.addEventListener("click", () => {
    let description = document.getElementById("description-income").value;
    let amount = document.getElementById("amount-income").value;
    let result = "";
    if (description.trim() === "") {
        return;
    }
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
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
        return;
    }
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
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