const addevent = document.getElementById("addbtn");
const list = document.getElementById("task");
const searchbtn = document.getElementById("searchbar");
const taskarray = [];
const filterbtn = document.getElementById("filter");

addevent.addEventListener("click", addtask);
searchbtn.addEventListener("keyup", searchtask);
filterbtn.addEventListener("click", filtertask);

// list.addEventListener('click', eventDelegation);

// function eventDelegation(e){
//     console.log(e, e.target)
// }

function addtask(e) {
  const item = document.getElementById("item");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const options = document.createElement("li");
  span.id = "task";
  span.appendChild(document.createTextNode(item.value));
  li.appendChild(span);
  taskobj = {};
  taskobj.taskname = item.value;
  taskobj.status = true;
  taskarray.push(taskobj);
  item.value = "";

  span.addEventListener("click", edittask);
  //delete button
  const deletebtn = document.createElement("i");
  deletebtn.className = "fa-solid fa-trash-can";
  options.appendChild(deletebtn);
  deletebtn.addEventListener("click", deletetask);
  //check button
  const checkbtn = document.createElement("i");
  checkbtn.className = "fa-solid fa-square-check";
  options.appendChild(checkbtn);
  checkbtn.addEventListener("click", checktask);
  //uncheckbutton
  const uncheckbtn = document.createElement("i");
  uncheckbtn.className = "fa-solid fa-square-xmark";
  uncheckbtn.id = "uncheck";
  options.appendChild(uncheckbtn);
  uncheckbtn.addEventListener("click", unchecktask);
  li.appendChild(options);
  list.appendChild(li);
}

function deletetask(e) {
  if (confirm("are you sure")) {
    const li = e.target.parentElement.parentElement;
    list.removeChild(li);
  }
}

function searchtask(e) {
  var search = e.target.value.toLowerCase();
  const tasks = list.getElementsByTagName("li");
  Array.from(tasks).forEach(function (items) {
    const taskname = items.firstChild.textContent;

    if (taskname.indexOf(search) != -1) {
      items.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  });
}

function checktask(e) {
  const task = e.target.parentElement.parentElement;
  const icons = e.target.parentElement;
  const self = e.target;
  const sibling = e.target.nextSibling;
  task.style.backgroundColor = "green";
  icons.style.backgroundColor = "green";
  self.style.display = "none";
  sibling.style.display = "flex";
  taskarray.forEach((value) => {
    if (task.firstChild.innerText == value.taskname) {
      value.status = false;
    }
  });
}

function unchecktask(e) {
  const task = e.target.parentElement.parentElement;
  const icons = e.target.parentElement;
  const self = e.target;
  const sibling = e.target.previousSibling;
  task.style.backgroundColor = "rgb(130,232,171)";
  icons.style.backgroundColor = "rgb(130,232,171)";
  self.style.display = "none";
  sibling.style.display = "flex";
  taskarray.forEach((value) => {
    if (task.firstChild.innerText == value.taskname) {
      value.status = true;
    }
  });
}

function edittask(e) {
  const prevtask = e.target;
  const prevtext = e.target.innerText;
  prevtask.style.display = "none";
  const editbar = document.createElement("input");
  editbar.id = "edit";
  editbar.value = prevtext;
  const parent = e.target.parentElement;
  parent.prepend(editbar);
  editbar.focus();
  editbar.addEventListener("blur", function (e) {
    editbar.removeEventListener("blur", e);
    parent.removeChild(editbar);
    savetask(e);
  });
  editbar.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      editbar.removeEventListener("keydown", e);
      parent.removeChild(editbar);
      savetask(e);
    }
  });

  function savetask(e) {
    prevtask.style.display = "flex";
    const setvalue = e.target.value;
    prevtask.innerText = setvalue;
  }
}

function filtertask(e) {
  const completed = document.getElementById("completed");
  const incompleted = document.getElementById("incompleted");
  completed.style.display = "inline";
  incompleted.style.display = "inline";

  completed.addEventListener("click", completedtask);
  const listchildren = Array.from(list.children);
  function completedtask(e) {
    taskarray.forEach((value) => {
      if (value.status) {
        listchildren.forEach((secondvalue) => {
          if (secondvalue.firstChild.innerText == value.taskname) {
            console.log(1);
            secondvalue.style.display = "none";
          } else {
            secondvalue.style.display = "flex";
          }
        });
      }
    });
  }

  incompleted.addEventListener("click", incompletedtask);
  function incompletedtask(e) {
    taskarray.forEach((value) => {
      if (!value.status) {
        listchildren.forEach((secondvalue) => {
          if (secondvalue.firstChild.innerText == value.taskname) {
            secondvalue.style.display = "none";
          } else {
            secondvalue.style.display = "flex";
          }
        });
      }
    });
  }
  filterbtn.addEventListener("click", displayall);
  function displayall(e) {
    list.children.style.display = "flex";
  }
}
