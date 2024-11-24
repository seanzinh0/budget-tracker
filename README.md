# DuckDollar

## Overview
DuckDollar is a comprehensive web application designed to help users effectively manage their personal finances. Inspired by the frugal and savvy financial habits of Duck McScrooge, DuckDollar serves as a robust budget tracker that allows individuals to monitor their income and expenses seamlessly. Users can easily add income and expense entries, which are dynamically calculated and displayed in real-time.

The application provides a detailed breakdown of financial data, including the total income, total expenses, and the overall budget. Additionally, DuckDollar calculates and displays percentage breakdowns for each income and expense category, allowing users to visualize how each entry contributes to their overall financial picture.

With interactive charts powered by Chart.js, users can view their financial data in a visually appealing and informative manner. The responsive design ensures that DuckDollar is accessible on various devices, making it a convenient tool for managing finances anytime, anywhere.
## Features
- Add and manage income and expenses.
- Dynamic calculation of total budget, total income, and total expenses.
- Visual representation of income and expenses using Chart.js.
- Responsive design for various devices.

## Technologies Used
- HTML
- CSS (Sass)
- JavaScript
- Chart.js

## Installation

To get started with the Budget Tracker, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone git@github.com:seanzinh0/budget-tracker.git
   cd budget-tracker
   
2. **Install Dependencies**
   ```bash
   npm install

3. **Run the Application**
- After installing the dependencies, you can open the index.html file in your web browser to start using the application.
- If you have live server just run that and you will be able to run the app.

## Usage

1. **Adding Income**
- Enter a description for your income in the "Description" field.
- Enter the amount in the "Amount" field.
- Click the "Add Income" button to save the entry or use the "Enter" key in the "Amount" field.
- The income entry will be displayed in the income list, along with its percentage of the total income.

2. **Adding Expenses**
- Enter a description for your expense in the "Description" field.
- Enter the amount in the "Amount" field.
- Click the "Add Expense" button to save the entry or use the "Enter" key in the "Amount" field.
- The expense entry will be displayed in the expense list, along with its percentage of the total expenses.

3. **Deleting Income or Expenses**
- To delete an income or expense entry, click the "X" button next to the corresponding entry in the list. This will remove it from both the UI and the underlying data.
4. **Viewing Budget Breakdown**
- The total income, total expenses, and total budget will be displayed dynamically at the top of the application.
- The percentage breakdowns for each income and expense category will be shown in their respective lists.
- A donut chart will visualize the total income and expenses, updating automatically as you add or remove entries.

5. **Responsive Design**
- The application is designed to work on various devices, allowing you to manage your finances on the go.

## History
Version 1.0 (2024-11-24) - DuckDollar

## Author
[Sean Pichay](https://github.com/seanzinh0)

## Github Pages Hosted Link
https://seanzinh0.github.io/budget-tracker/

## License
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.