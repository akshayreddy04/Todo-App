const createevent = document.getElementById("addbtn");
const list = document.getElementById("task");
const icon = document.getElementsByClassName("fa-solid fa-trash-can")[0];
const search = document.getElementById("searchbar");

createevent.addEventListener("click", addtask);
icon.addEventListener("click", deletetask);
search.addEventListener("keyup", searchtask);

function addtask(e) {
  const item = document.getElementById("item");
  const li = document.createElement("li");
  const options = document.createElement("li");
  li.className = "liitems";
  li.appendChild(document.createTextNode(item.value));
  const deletebtn = document.createElement("i");
  deletebtn.className = "fa-solid fa-trash-can";
  options.appendChild(deletebtn);
  const checkbtn = document.createElement("i");
  checkbtn.className = "fa-solid fa-square-check";
  options.appendChild(checkbtn);
  li.appendChild(options);
  list.appendChild(li);
  list.addEventListener("click", deletetask);
}

function deletetask(e) {
  if (confirm("are you sure")) {
    const li = e.target.parentElement;
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
