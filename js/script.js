"use strict";

const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");

let incomeCount = 0;
addIncome.addEventListener("click", () => {
    let description = document.getElementById("description-income").value;
    let result = "";
    if (description.trim() === "") {
    }else {
        incomeCount++;
        result =
            `<div class="income-input">
            <label for="income-text">${description}</label>
            <input id="income-text" type="text" placeholder="Enter Amount">
        </div>`;
        incomeField.insertAdjacentHTML("beforeend", result);
    }
});

let expenseCount = 0;
addExpense.addEventListener("click", () => {
    let description = document.getElementById("description-expense").value;
    let result = "";
    if (description.trim() === "") {
    }else {
        expenseCount++;
        result =
            `<div class="income-input">
            <label for="income-text">${description}</label>
            <input id="income-text" type="text" placeholder="Enter Amount">
        </div>`;
        expenseField.insertAdjacentHTML("beforeend", result);
    }
});