const addevent = document.getElementById("addbtn");
const list = document.getElementById("task");
const deletebtn = document.getElementsByClassName("fa-solid fa-trash-can")[0];
const searchbtn = document.getElementById("searchbar");
const checkicon = document.getElementsByClassName(
  "fa-solid fa-square-check"
)[0];
const uncheckicon = document.getElementsByClassName(
  "fa-solid fa-square-xmark"
)[0];

addevent.addEventListener("click", addtask);
deletebtn.addEventListener("click", deletetask);
searchbtn.addEventListener("keyup", searchtask);
checkicon.addEventListener("click", checktask);
uncheckicon.addEventListener("click", unchecktask);

function addtask(e) {
  const item = document.getElementById("item");
  const li = document.createElement("li");
  const options = document.createElement("li");
  li.className = "liitems";
  li.appendChild(document.createTextNode(item.value));
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
  task.style.backgroundColor = "green";
  icons.style.backgroundColor = "green";
  self.style.display = "none";
  icons.display = "flex";
}

function unchecktask(e) {
  const task = e.target.parentElement.parentElement;
  const icons = e.target.parentElement;
  task.style.backgroundColor = "rgb(130,232,171)";
  icons.style.backgroundColor = "rgb(130,232,171)";
  checkicon.style.display = "flex";
  uncheckicon.style.display = "none";
}
