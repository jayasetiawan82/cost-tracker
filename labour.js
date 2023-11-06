class UI {
  constructor() {
    this.hoursFeedback = document.querySelector(".hours-feedback");
    this.sumHours = document.getElementById("total-hours-amount");
    this.hoursForm = document.getElementById("hours-form");
    this.workInput = document.getElementById("work-input");
    this.hoursInput = document.getElementById("hours-input");
    this.workList = document.getElementById("work-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //   submit form method
  submitHoursForm() {
    const workValue = this.workInput.value;
    const amountValue = this.hoursInput.value;
    if (workValue === "" || amountValue === "" || amountValue < 0) {
      this.hoursFeedback.classList.add("showItem");
      this.hoursFeedback.innerHTML = `<p>value can not be empty or negative </p>`;
      const self = this;
      setTimeout(function () {
        self.hoursFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.workInput.value = "";
      this.hoursInput.value = "";

      let work = {
        id: this.itemID,
        title: workValue,
        amount: amount,
      };
      this.itemID++;
      this.itemList.push(work);
      this.addWork(work);
    }
  }

  //   add work
  addWork(work) {
    const div = document.createElement("div");
    div.classList.add("work");
    div.innerHTML = `
    <div class="work-list-container flex">
        <h5 class="work-title list-item">${work.title}</h5>
       <h5 class="hours-amount list-item">${work.amount}</h5
       <div class="expense-icon list-item">
         <a href="#" class="edit-icon" data-id="${work.id}"><i class="fa-solid fa-pen-to-square"></i></a>
          <a href="#" class="delete-icon" data-id="${work.id}"><i class="fa-solid fa-trash"></i></a>
         </div>
      </div>`;
    this.workList.appendChild(div);
    this.totalHours();
  }

  totalHours() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function (acc, curr) {
        // console.log(`total is ${acc}, and the curr amount is ${curr.amount}`)
        acc += curr.amount;
        return acc;
      }, 0);
    }
    this.sumHours.textContent = total;
    return total;
  }

  //   edit work
  editWork(element) {
    let id = parseInt(element.dataset.id);
    console.log(id);

    let parent = element.parentElement.parentElement;

    this.workList.removeChild(parent);

    let work = this.itemList.filter(function (item) {
      return item.id === id;
    });

    this.workInput.value = work[0].title;
    this.hoursInput.value = work[0].amount;

    let temptList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    this.itemList = temptList;
    this.totalHours();
  }

  deleteWork(element) {
    let id = parseInt(element.dataset.id);
    console.log(id);
    let parent = element.parentElement.parentElement;
    this.workList.removeChild(parent);
    let temptList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    this.itemList = temptList;
    this.totalHours();
  }
}

function addEventListener() {
  const hoursForm = document.getElementById("hours-form");
  const workList = document.getElementById("work-list");

  const ui = new UI();

  hoursForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitHoursForm();
  });

  workList.addEventListener("click", function (event) {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editWork(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteWork(event.target.parentElement);
    }
    // console.log(event.target.parentElement.parentElement.classList.contains("edit-icon"))
  });
}

document.addEventListener("DOMContentLoaded", function () {
  addEventListener();
});
