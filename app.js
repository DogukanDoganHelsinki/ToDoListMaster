const input = document.querySelector(".todo_input");
const date = document.querySelector(".todo_date");
const todo_container = document.querySelector(".todo_container");
const todo_container2 = document.querySelector(".todo_container2");
const modal = document.getElementById("myModal");
var choosenID;

const eventListeners = () => {
  document.querySelector(".close").addEventListener("click", closeSecondPopup);
  document.querySelector(".todo_form").addEventListener("submit", addTodo);
  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", closeSecondPopup);
  document
    .querySelector(".cancel_btn")
    .addEventListener("click", closeSecondPopup);
  document
    .querySelector(".confirm_btn")
    .addEventListener("click", saveTodoPopup);
  document.querySelector(".todo_button").addEventListener("click", popup);
};

const startConf = () => {
  // baslangic ayarlari
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos?.sort((x, y) => x.newDate - y.newDate);

  const trueTodos = todos?.filter((x) => x.isCompleted == true);
  const falseTodos = todos?.filter((x) => x.isCompleted == false);
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    falseTodos.forEach((ft) => {
      addHTML(ft);
    });

    trueTodos.forEach((tt) => {
      addHTML2(tt);
    });
  }
};

const addTodo = (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const inputVal = input.value;
  const dateVal = date.value;

  if (inputVal == "") {
    //-------------------- boş değer girilmeye çalışıyor ise hata veriyoruz --------------------------
    input.style.border = "1px solid tomato";
    setTimeout(() => {
      input.style.borderColor = "transparent";
    }, 2500);
    return false;
  }

  const todo = {
    id: Math.random().toFixed(10).toString().slice(2),
    text: inputVal,
    isCompleted: false,
    date: dateVal,
    newDate: dateCompare(dateVal),
  };

  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  while (document.querySelector(".todo_container").firstElementChild != null) {
    document.querySelector(".todo_container").firstElementChild.remove();
  }

  while (document.querySelector(".todo_container2").firstElementChild != null) {
    document.querySelector(".todo_container2").firstElementChild.remove();
  }

  startConf();
};

const deleteTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.remove();
};

const deleteAllTodo = (e) => {
  const todoAll = e.target.parentElement.parentElement.parentElement;

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos?.filter((x) => x.isCompleted == false);
  localStorage.setItem("todos", JSON.stringify(todos));
  while (document.querySelector(".todo_container2").firstElementChild != null) {
    document.querySelector(".todo_container2").firstElementChild.remove();
  }
};

const completeTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((td) => {
    if (td.text === text) {
      td.isCompleted = !td.isCompleted;
      todo.style.display = "none";
      addHTML2(td);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const editTodoPopup = (e) => {
  modal.style.display = "block";
  choosenID = e.target.id;

  const todo = JSON.parse(localStorage.getItem("todos"));

  const donenDeger = todo.filter((x) => x.id === choosenID);
  document.querySelector("#todo_editInput").value = donenDeger[0].text;
};

const saveTodoPopup = (e) => {
  const todo = JSON.parse(localStorage.getItem("todos"));
  const donenDeger = todo.filter((x) => x.id === choosenID);
  donenDeger[0].text = document.querySelector("#todo_editInput").value;
  localStorage.setItem("todos", JSON.stringify(todo));
  while (document.querySelector(".todo_container").firstElementChild != null) {
    document.querySelector(".todo_container").firstElementChild.remove();
  }

  while (document.querySelector(".todo_container2").firstElementChild != null) {
    document.querySelector(".todo_container2").firstElementChild.remove();
  }
  startConf();
  modal.style.display = "none";
};

const dateCompare = (item) => {
  const array = item.split("-");

  const newDate = `${array[2]}${array[1]}${array[0]}`;

  return newDate;
};

const addHTML = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoLeft = document.createElement("div");
  todoLeft.classList.add("todo_left");

  const editInput = document.createElement("input");
  editInput.classList.add("todo_editInput");
  editInput.defaultValue = todo.text;

  const todoCb = document.createElement("input");
  todoCb.type = "checkbox";
  todoCb.checked = todo.isCompleted;
  todoCb.classList.add("todo_cb");
  todoCb.addEventListener("click", completeTodo);

  const todoText = document.createElement("span");
  todoText.id = todo.id;
  todoText.classList.add("todo_text");
  todoText.textContent = todo.text;

  const todoDate = document.createElement("span");
  todoDate.classList.add("todo_date");
  todoDate.textContent = todo.date;

  todoLeft.appendChild(todoCb);
  todoLeft.appendChild(todoText);
  todoLeft.appendChild(todoDate);
  todoLeft.appendChild(editInput);

  const todoRight = document.createElement("div");
  todoRight.classList.add("todo_right");

  const editBtn = document.createElement("button");
  editBtn.classList.add("todo_edit");
  editBtn.textContent = "Edit";
  editBtn.id = todo.id;
  editBtn.addEventListener("click", editTodoPopup);

  todoRight.appendChild(editBtn);

  todoDiv.appendChild(todoLeft);
  todoDiv.appendChild(todoRight);

  todo_container.appendChild(todoDiv);
};

const addHTML2 = (todo) => {
  const todoDiv2 = document.createElement("div");
  todoDiv2.classList.add("todo2");

  const todoLeft2 = document.createElement("div");
  todoLeft2.classList.add("todo_left2");

  const todoCb2 = document.createElement("input");
  todoCb2.type = "checkbox";
  todo.checked = todo?.isCompleted;
  todoCb2.style.display = "none";
  todoCb2.classList.add("todo_cb2");
  todoCb2.addEventListener("click", completeTodo);

  const todoText2 = document.createElement("div");
  todoText2.classList.add("todo_text2");
  todoText2.textContent = todo.text;

  todoLeft2.appendChild(todoCb2);
  todoLeft2.appendChild(todoText2);

  const todoRight2 = document.createElement("div");
  todoRight2.classList.add("todo_right2");

  const deleteBtn2 = document.createElement("button");
  deleteBtn2.classList.add("todo_delete");
  deleteBtn2.textContent = "Delete";
  deleteBtn2.addEventListener("click", deleteTodo);

  const deleteAllBtn2 = document.createElement("button");
  deleteAllBtn2.classList.add("todo_delete2");
  deleteAllBtn2.textContent = "Delete All";
  deleteAllBtn2.addEventListener("click", deleteAllTodo);

  todoRight2.appendChild(deleteBtn2);
  todoRight2.appendChild(deleteAllBtn2);

  todoDiv2.appendChild(todoLeft2);
  todoDiv2.appendChild(todoRight2);

  todo_container2.appendChild(todoDiv2);
};

const createPopup = (id) => {
  let popupNode = document.querySelector(id);
  let overlay = popupNode.querySelector(".overlay");
  let closeBtn = popupNode.querySelector(".close-btn");
  let submitBtn = popupNode.querySelector(".submit-btn");

  const openPopup = () => {
    const form = document.querySelector(".todo_form");
    popupNode.classList.add("active");
    form.reset();
  };
  const closePopup = () => {
    popupNode.classList.remove("active");
  };

  const submitPopup = () => {
    const form = document.querySelector(".todo_form");
    addTodo();
    form.reset();
  };

  overlay.addEventListener("click", closePopup);
  closeBtn.addEventListener("click", closePopup);
  submitBtn.addEventListener("click", submitPopup);

  return openPopup;
};

let popup = createPopup("#popup");

const myDatePicker = MCDatepicker.create({
  el: "#tarih",
  showCalendarDisplay: true,
  dateFormat: "DD-MM-YYYY",
  customClearBTN: "Clear",
  customOkBTN: "Set",
  customCancelBTN: "Cancel",
  customWeekDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  customMonths: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
});

// When the user clicks on <span> (x), close the modal
const closeSecondPopup = () => {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

startConf();
eventListeners();
