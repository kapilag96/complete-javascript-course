// Controls budget and other behind the scenes maths
const budgetController = (function (){

    function Expense(id, description, value){
        this.id          = id;
        this.description = description;
        this.value       = value;
        this.percentage  = -1;
        this.calcPercentage = (totalIncome) => {
            if (totalIncome == 0) this.percentage = -1;
            else this.percentage = Math.round(this.value * 100 / totalIncome);
        };
    }

    function Income(id, description, value){
        this.id          = id;
        this.description = description;
        this.value       = value;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget:  0,
        percentage: -1
    }

    function updateTotal(type){
        const list = data.allItems[type];
        const sum = list.reduce((total, currItem) => {
            return total + currItem.value;
        }, 0);
        data.totals[type] = sum;
    }

    function calculatePercentages(){
        /**
         * Calculate the expense percentage for each expense objet.
         */
        const totalIncome = data.totals.inc;
        data.allItems.exp.forEach((exp) => exp.calcPercentage(totalIncome));
    }

    function getPercentages(){
        return data.allItems.exp.map((exp) => exp.percentage);
    }

    function addItem({type, description, value}){

        // Get the income or the expense list
        const itemList = data.allItems[type];

        // Get a unique ID
        let id;
        if (itemList.length > 0) id = itemList[itemList.length - 1].id + 1;
        else id = 0;

        // Parse value into integer
        value = parseFloat(value);

        // Create a new Income or Expense object
        let newItem;
        if (type === 'exp') newItem = new Expense(id, description, value);
        else if (type === 'inc') newItem = new Income(id, description, value);

        // Add the income or expense
        itemList.push(newItem);
        // Calculate and update the new total
        updateTotal(type);

        return newItem;
    }

    function deleteItem({type, id}){
        // Filter out all the elements whose id is not the given id
        const items = data.allItems[type];
        data.allItems[type] = items.filter((item) => {return item.id != id});

        // Update the budget totals
        updateTotal(type);
    }

    return {
        data                : data,
        addItem             : addItem,
        deleteItem          : deleteItem,
        calculatePercentages: calculatePercentages,
        getPercentages      : getPercentages,

        updateBudget: () => {
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc === 0){
                data.percentage = -1;
            }
            else{
                data.percentage = Math.round(data.totals.exp * 100 / data.totals.inc);
            }
        },
        getBudget   : () => {
            return {
                budget    : data.budget,
                totalInc  : data.totals.inc,
                totalExp  : data.totals.exp,
                percentage: data.percentage
            };
        },
    }
})();

// Modify UI items
const UIController = (function (){

    // The HTML elements
    const descField    = document.querySelector('.add__description');
    const amountField  = document.querySelector('.add__value');
    const signSelect   = document.querySelector('.add__type');
    const addBtn       = document.querySelector('.add__btn');
    const incomeList   = document.querySelector('.income__list');
    const expenseList  = document.querySelector('.expenses__list');
    const budgetLabel  = document.querySelector('.budget__value');
    const incomeLabel  = document.querySelector('.budget__income--value');
    const expenseLabel = document.querySelector('.budget__expenses--value');
    const percentLabel = document.querySelector('.budget__expenses--percentage');
    const container    = document.querySelector('.container');
    const dateLabel    = document.querySelector('.budget__title--month');

    const DOMElements = {
        // Fields
        descField  : descField,
        amountField: amountField,
        // Selects
        signSelect : signSelect,
        // Buttons
        addBtn     : addBtn,
        // Lists
        incomeList : incomeList,
        expenseList: expenseList,
        // Budget related labels
        budgetLabel : budgetLabel,
        incomeLabel : incomeLabel,
        expenseLabel: expenseLabel,
        percentLabel: percentLabel,
        // Income and expense list container
        container   : container
    };

    function formatNumber(num, type){
        // Get the absolute value of the number and add 2 decimal places
        num = Math.abs(num);
        num = num.toFixed(2);
        // Add a thousands comma
        if (num.length > 6){
            num = num.substr(0, num.length - 6) + ',' + num.substr(num.length - 6, 6);
        }

        return (type == 'exp'? '-': '+') + ' ' + num;
    }

    function addListItem(obj, type){
        let html, parent_element;
        // Generate an html element and insert into list
        if (type == 'inc'){
            parent_element = incomeList;
            html =  `<div class="item clearfix" id="inc-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value, type)}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
        }
        else if (type == 'exp'){
            parent_element = expenseList;
            html = `<div class="item clearfix" id="exp-${obj.id}">
                        <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value, type)}</div>
                            <div class="item__percentage">21%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>`;
        }
        parent_element.insertAdjacentHTML('beforeend', html);
    }

    function deleteListItem(elementID){
        const element = document.getElementById(elementID);
        element.parentNode.removeChild(element);
    }

    function displayBudget(budgetObj){
        // Update the income, expense labels
        incomeLabel.textContent  = formatNumber(budgetObj.totalInc, 'inc');
        expenseLabel.textContent = formatNumber(budgetObj.totalExp, 'exp');

        // Update the budget label

        const budgetType = budgetObj.budget >= 0? 'inc': 'exp';
        budgetLabel.textContent  = formatNumber(budgetObj.budget, budgetType);
        // Update the percentage
        let percentVal;
        if (budgetObj.percentage > 0) percentVal = budgetObj.percentage + " %";
        else percentVal = '---';
        percentLabel.textContent = percentVal;
    }

    function clearFields(){
        // Clear the description and amount field and focus on description
        [descField, amountField].forEach((element) => {element.value = "";});
        descField.focus();
    }

    function updatePercentages(percentages){
        /**
         * Update the expense percentages
         */
        const elements = document.getElementsByClassName('item__percentage');
        for (let idx in elements){
            const percentage = percentages[idx];
            const element    = elements[idx];

            let text;
            if (percentage == -1) text = '---'
            else text = percentage + ' %';

            element.textContent = text;
        }
    }

    function signUpdated(event){
        // Add red-focus class on fields
        const elements = [signSelect, descField, amountField];
        elements.forEach((element) => {
            element.classList.toggle('red-focus');
        })
        // Add red class on the enter button
        addBtn.classList.toggle('red');
    }

    return {
        getEntry: () => {
            return {
                description: descField.value,
                type       : signSelect.value,
                value      : amountField.value
            };
        },
        displayMonth: () => {
            const now   = new Date();
            const month = now.toLocaleString('default', {month: 'short'});
            const year  = now.getFullYear();
            dateLabel.textContent = month + ' ' + year;
        },
        addListItem      : addListItem,
        deleteListItem   : deleteListItem,
        elements         : DOMElements,
        clearFields      : clearFields,
        displayBudget    : displayBudget,
        updatePercentages: updatePercentages,
        signUpdated      : signUpdated
    }

})();

// Main controller
const controller = (function (budgetCtrl, UICtrl){

    function updateBudget(){
        // Calculate the budget
        budgetCtrl.updateBudget();
        // Return the budget
        const budget = budgetCtrl.getBudget();
        // Display in UI
        UICtrl.displayBudget(budget);
    }

    function updateExpensePercentages(){
        // Calculate all the expense percentages
        budgetController.calculatePercentages();

        // Get the percentages
        const percentages = budgetController.getPercentages();
        // Update the percentages
        UICtrl.updatePercentages(percentages);
    }

    function ctrlAddItem(){
        // Get the inp data
        let inp = UICtrl.getEntry();

        //Don't process if description or input is missing
        if (inp.description === '' || isNaN(inp.value) || inp.value == 0) return;
        // Add a new income/expense
        const newItem = budgetCtrl.addItem(inp);
        // Add as a javascript component
        UICtrl.addListItem(newItem, inp.type);
        // Clear fields
        UICtrl.clearFields();

        // Update the budget
        updateBudget();
        // Update the expenses percentage
        updateExpensePercentages();
    }

    function ctrlDeleteItem(event){
        const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (!itemID) return;

        // itemType is 'inc' or 'exp' and itemNum is the num of element that is deleted
        const [itemType, itemNum] = itemID.split('-');

        // Delete the item from the database
        budgetCtrl.deleteItem({type: itemType, id: itemNum});

        // Delete the item from the UI
        UICtrl.deleteListItem(itemID);

        // Update the budget
        updateBudget();
        // Update the expenses percentage
        updateExpensePercentages();

    }

    function setupEventListners(){
        // The UI elements
        const elements = UICtrl.elements;

        // "Add a new entry" listeners
        elements.addBtn.addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (event) => {
            // Return if not enter
            if (event.keyCode === 13) ctrlAddItem();
        });
        // Delete items from the container
        elements.container.addEventListener('click', ctrlDeleteItem);
        elements.signSelect.addEventListener('change', UICtrl.signUpdated);

    }

    return {
        init: () => {
            console.log('Application has started.');
            setupEventListners();
            UICtrl.displayBudget({
                budget    : 0,
                totalInc  : 0,
                totalExp  : 0,
                percentage: -1
            });
            UICtrl.displayMonth();
        }
    }

})(budgetController, UIController);

// Initialize the application
controller.init();

