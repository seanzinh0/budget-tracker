"use strict";
//budget class to manage budget
class Budget {
    constructor() {
        //empty arrays for income and expense
        this.income = [];
        this.expense = [];
        //initialize total budget to zero
        this.totalBudget = 0;
    }
    //method to add income taking incomeObj as param
    addIncome(incomeObj) {
        //push incomeObj to the income array
        this.income.push(incomeObj);
        //update budget after adding income
        this.updateTotalBudget();
    }
    //method that gets income array
    getIncome() {
        return this.income;
    }
    //method to add expense taking expenseObj as param
    addExpense(expenseObj) {
        //push expenseObj to the expense array
        this.expense.push(expenseObj);
        //update budget after adding expense
        this.updateTotalBudget();
    }
    //method that gets expense array
    getExpense() {
        return this.expense;
    }
    //method that updates budget from total income and total expense
    updateTotalBudget() {
        //calc total income and expense using reduce method
        const totalIncome = this.income.reduce((sum, val) => sum + val.amount, 0);
        const totalExpense = this.expense.reduce((sum, val) => sum + val.amount, 0);
        //calc total budget from subtracting expense from income
        this.totalBudget = totalIncome - totalExpense;
    }
    //method that gets total budget
    getTotalBudget() {
        return this.totalBudget;
    }
    //method that gets total income
    getTotalIncome() {
        return this.income.reduce((sum, val) => sum + val.amount, 0);
    }
    //method that gets total expense
    getTotalExpense() {
        return this.expense.reduce((sum, val) => sum + val.amount, 0);
    }

}
//dom elements
const addIncome = document.getElementById("add-income");
const addExpense = document.getElementById("add-expense");
const incomeField = document.getElementById("income__wrapper");
const expenseField = document.getElementById("expense__wrapper");
const ulIncome = document.querySelector(".ul__income");
const ulExpense = document.querySelector(".ul__expense");
//create instance of budget class
const budget = new Budget();
//function that deletes income input
function deleteIncomeInput(e) {
    //find closest income div
    const incomeDiv = e.closest(".income-input");
    //get amount and description from input
    const amount = Number(incomeDiv.querySelector('input').value.replace('$', ''));
    const description = incomeDiv.querySelector('label').innerText;
    //remove income div from dom
    incomeDiv.remove();
    //filter out income from income array by checking what items don't match the amount and description of the income
    budget.income = budget.income.filter(item => !(item.amount === amount && item.description === description));
    //update total budget after deletion
    budget.updateTotalBudget();
    //update totals in UI
    updateTotalsBreakdown();
    updateIncomeUI();
    createDonutChart();
}
//function that adds income input
function addIncomeInput() {
    //get description and amount
    let description = document.getElementById("description-income").value;
    let amount = document.getElementById("amount-income").value;
    let result = "";
    //validate description input
    if (description.trim() === "") {
        alert("Please input a description");
        return;
    }
    //convert amount to number and validate
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        alert("Please input a number greater than 0");
        return;
    }
    //create income input element
    result =
        `<div class="income-input">
            <label for="income-text">${description}</label>
            <div class="income-wrap">
            <input id="income-text" type="text" readonly value="$${numAmount.toFixed(2)}">
            <button class="delete-btn" onclick="deleteIncomeInput(this)">X</button>
            </div>
        </div>`;
    //add income input into dom
    incomeField.insertAdjacentHTML("beforeend", result);
    //clear input fields
    document.getElementById("description-income").value = "";
    document.getElementById("amount-income").value = "";
    //create income obj that uses numAmount and description
    const incomeObj = {amount: numAmount, description: description};
    budget.addIncome(incomeObj);
    //update total budget after adding income
    budget.updateTotalBudget();
    //update UI
    updateTotalsBreakdown();
    updateIncomeUI();
    createDonutChart();
}
//event listener when button is clicked to add income
addIncome.addEventListener("click", addIncomeInput);
//event listener when using enter key in amount to add income
document.getElementById("amount-income").addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addIncomeInput();
    }
});
//function that deletes expense input
function deleteExpenseInput(e) {
    //get closest expense div
    const expenseDiv = e.closest(".expense-input");
    //get amount and description from expense div
    const amount = Number(expenseDiv.querySelector('input').value.replace('$', ''));
    const description = expenseDiv.querySelector('label').innerText;
    //remove expense div from dom
    expenseDiv.remove();
    //filter out expense from expense array by checking what items that don't match the amount and description of the input
    budget.expense = budget.expense.filter(item => !(item.amount === amount && item.description === description));
    //update total budget
    budget.updateTotalBudget();
    //update UI
    updateTotalsBreakdown();
    updateExpenseUI();
    createDonutChart();
}
//function that adds expense input
function addExpenseInput() {
    //grab description and amount from input
    let description = document.getElementById("description-expense").value;
    let amount = document.getElementById("amount-expense").value;
    let result = "";
    //validate description input
    if (description.trim() === "") {
        alert("Please input a description");
        return;
    }
    //convert amount to number and validate
    let numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        alert("Please input a number greater than 0");
        return;
    }
    //new expense element
    result =
        `<div class="expense-input">
                <label for="expense-text">${description}</label>
                <div class="expense-wrap">
                   <input id="expense-text" type="text" readonly value="$${numAmount.toFixed(2)}">
                   <button class="delete-btn" onclick="deleteExpenseInput(this)">X</button>
                </div>
            </div`;
    //add expense to dom
    expenseField.insertAdjacentHTML("beforeend", result);
    //reset inputs for new entry
    document.getElementById("description-expense").value = "";
    document.getElementById("amount-expense").value = "";
    //create expenseObj that uses numAmount and description and adds to expense array
    const expenseObj = {amount: numAmount, description: description};
    budget.addExpense(expenseObj);
    //update total budget
    budget.updateTotalBudget();
    //update UI
    updateTotalsBreakdown();
    updateExpenseUI();
    createDonutChart();
}
//event listener that adds expense when button clicked
addExpense.addEventListener("click", addExpenseInput);
//event listener when hitting enter key on amount adds expense
document.getElementById("amount-expense").addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addExpenseInput();
    }
})
//update ui for totals
function updateTotalsBreakdown() {
    //get totals for income, expense, and budget
    const totalIncome = budget.getTotalIncome();
    const totalExpense = budget.getTotalExpense();
    const totalBudget = budget.getTotalBudget();
    //gets elements from dom
    const liTotalIncome = document.getElementById("total-income");
    const liTotalExpenses = document.getElementById("total-expenses");
    const liTotalBudget = document.getElementById("total-budget");
    //update inner text of elements
    liTotalIncome.innerText = "Total Income: $" + totalIncome.toFixed(2);
    liTotalExpenses.innerText = "Total Expense: $" + totalExpense.toFixed(2);
    liTotalBudget.innerText = "Total Budget: $" + totalBudget.toFixed(2);
}
//function that updates ui for income breakdown
function updateIncomeUI(){
    //clear list
    ulIncome.innerHTML = "";
    //get total income
    const totalIncome = budget.getTotalIncome();
    //iterate through each income and display
    budget.getIncome().forEach(income => {
        let percentage;
        //calc percentages for each income out of the total income
        if (totalIncome > 0) {
            percentage = (income.amount / totalIncome * 100).toFixed(2);
        } else {
            percentage = 0; // Set percentage to 0 if total expense is 0
        }
        //create li for each income
        const result = `<li>${percentage}% - ${income.description}: $${income.amount.toFixed(2)}</li>`;
        //add li to income breakdown
        ulIncome.insertAdjacentHTML("beforeend", result);
    });
}
//function that updates ui for expense breakdown
function updateExpenseUI() {
    //clear list
    ulExpense.innerHTML = ""
    //get total expense
    const totalExpense = budget.getTotalExpense();
    //iterate through expenses and display
    budget.getExpense().forEach(expense => {
        let percentage;
        //calc percentage of each expense out of the total
        if (totalExpense > 0) {
            percentage = (expense.amount / totalExpense * 100).toFixed(2);
        } else {
            percentage = 0;
        }
        //create li element
        const result = `<li>${percentage}% - ${expense.description}: $${expense.amount.toFixed(2)}</li>`;
        //add li to expense breakdown
        ulExpense.insertAdjacentHTML("beforeend", result);
    });
}

//create chart using chart.js
function createDonutChart(){
    //get total income and expense
    const totalIncome = budget.getTotalIncome();
    const totalExpense = budget.getTotalExpense();
    //get canvas context
    const ctx = document.getElementById("donut-chart").getContext("2d");
    //destroy chart if it exists already
    if (window.donutChart) {
        window.donutChart.destroy();
    }
    //check if no data to display
    if (totalIncome === 0 && totalExpense === 0) {
        //clear chart and show message
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000000";
        ctx.font = "22px Arial";
        ctx.fillText("No Data Available", ctx.canvas.width / 2-80, ctx.canvas.height / 2); // Centered message
    }else {
        //create chart.js chart
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
//load in the chart
createDonutChart();
