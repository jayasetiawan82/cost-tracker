class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //   submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value can not be empty or negative</p>`;
      const self = this;
      setTimeout(function () {
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showBlack", "showGreen");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showBlack", "showRed");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }

  //submit expense
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>value can not be empty or negative</P>`;
      const self = this;
      setTimeout(function () {
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
    }

    else {
      let amount = parseInt(amountValue);
      console.log(amount)
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      };
      this.itemID++; //to increment ID
      this.itemList.push(expense);
      this.addExpense(expense); // pass an argument
      this.showBalance()
    }
  }

  // // add expense
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    
         <div class="expense-item-container flex">
            <p class="expense-title list-item capitalized fs-400">${expense.title}</p>
            <p class="expense-amount list-item fs-400">${expense.amount}</p>
            <div class="expense-icon list-item">
              <a href="#" class="edit-icon" data-id="${expense.id}"><i class="fa-solid fa-pen-to-square"></i></a>
              <a href="#" class="delete-icon" data-id="${expense.id}"><i class="fa-solid fa-trash"></i></a>
            </div>
          </div>
    `;
        this.expenseList.appendChild(div)
  }

  // total expense
  totalExpense() {
   let total = 0;
   if(this.itemList.length > 0 ){
    total = this.itemList.reduce(function(acc, curr){
      // console.log(`total is ${acc}, and the curr amount is ${curr.amount}`)
      acc += curr.amount
      return acc
    },0)
   }
   this.expenseAmount.textContent = total
   return total
  }


//edit expense 
editExpense(element) {
  let id = parseInt(element.dataset.id)
  console.log(id)
  let parent = element.parentElement.parentElement.parentElement

  
  // remove from dom
  this.expenseList.removeChild(parent)
  // remove from the array list
  let expense = this.itemList.filter(function(item){
    return item.id === id
  })

 
  // show value on the form
  this.expenseInput.value = expense[0].title
  this.amountInput.value = expense[0].amount

  // remove from the list / temporary list
  let tempList = this.itemList.filter(function(item) {
    return item.id !== id
  })
  this.itemList = tempList
  this.showBalance()
}

//deleter expense
deleteExpense(element) {
  let id = parseInt(element.dataset.id)
  let parent = element.parentElement.parentElement.parentElement
  //remove from the dom
  this.expenseList.removeChild(parent)
  //remove from the list / temporary list
  let tempList = this.itemList.filter(function(item){
    return item.id !== id
  })
  this.itemList = tempList
  this.showBalance()
}

}

function addEventListener() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //new instance of UI class
  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // expense form submit
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  //expense list click
  expenseList.addEventListener("click", function (event) {
    if(event.target.parentElement.classList.contains("edit-icon")){
      ui.editExpense(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-icon")){
      ui.deleteExpense(event.target.parentElement)
    }
    
  });
}

document.addEventListener("DOMContentLoaded", function () {
  addEventListener();
});


// The reduce() method returns a single value: the function's accumulated result.