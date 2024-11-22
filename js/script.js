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
const ulIncome = document.querySelector(".ul__income");
const ulExpense = document.querySelector(".ul__expense");

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
    updateIncomeUI();
    createDonutChart();
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
    updateIncomeUI();
    createDonutChart();
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
    updateExpenseUI();
    createDonutChart();
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
    updateExpenseUI();
    createDonutChart();
});

function updateTotalsBreakdown() {
    const totalIncome = budget.getTotalIncome();
    const totalExpense = budget.getTotalExpense();
    const totalBudget = budget.getTotalBudget();
    const liTotalIncome = document.getElementById("total-income");
    const liTotalExpenses = document.getElementById("total-expenses");
    const liTotalBudget = document.getElementById("total-budget");

    liTotalIncome.innerText = "Total Income: $" + totalIncome.toFixed(2);
    liTotalExpenses.innerText = "Total Expense: $" + totalExpense.toFixed(2);
    liTotalBudget.innerText = "Total Budget: $" + totalBudget.toFixed(2);
}

function updateIncomeUI(){
    ulIncome.innerHTML = "";
    const totalIncome = budget.getTotalIncome();
    budget.getIncome().forEach(income => {
        let percentage;
        if (totalIncome > 0) {
            percentage = (income.amount / totalIncome * 100).toFixed(2);
        } else {
            percentage = 0; // Set percentage to 0 if total expense is 0
        }
        const result = `<li>${percentage}% - ${income.description}: $${income.amount.toFixed(2)}</li>`;
        ulIncome.insertAdjacentHTML("beforeend", result);
    });
}

function updateExpenseUI() {
    ulExpense.innerHTML = ""
    const totalExpense = budget.getTotalExpense();
    budget.getExpense().forEach(expense => {
        let percentage;
        if (totalExpense > 0) {
            percentage = (expense.amount / totalExpense * 100).toFixed(2);
        } else {
            percentage = 0;
        }
        const result = `<li>${percentage}% - ${expense.description}: $${expense.amount.toFixed(2)}</li>`;
        ulExpense.insertAdjacentHTML("beforeend", result);
    });
}


function createDonutChart(){
    const totalIncome = budget.getTotalIncome();
    const totalExpense = budget.getTotalExpense();
    const ctx = document.getElementById("donut-chart").getContext("2d");
    if (window.donutChart) {
        window.donutChart.destroy();
    }
    if (totalIncome === 0 && totalExpense === 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText("No Data Available", ctx.canvas.width / 2-80, ctx.canvas.height / 2); // Centered message
    }else {
        window.donutChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Total Income", "Total Expenses"],
                datasets: [{
                    data: [totalIncome, totalExpense],
                    backgroundColor: ["#65558F"/*income color*/, "#E8DEF8"/*expense color*/],
                    borderColor: ["#65558F", "#E8DEF8"],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                cutout: "80%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            font: {
                                size: 16,
                                family: "Arial",
                                style: "normal"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': $' + tooltipItem.raw.toFixed(2);
                            }
                        },
                        bodyFont: {
                            size: 16,
                            family: "Arial",
                            style: "normal"
                        }
                    }
                }
            }
        });
    }
}

createDonutChart();
