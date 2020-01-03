const arrayModule = require("../arrayActions/array_actions");
const renderModule = require("../");
const dragModule = require("../drag/drag");

// window.onDragOver = dragModule.onDragOver;


const newElement = (tag, attributes, target) => {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(attr => {
    if (attr !== "tasks") {
      const [attrKey, attrValue] = attr;
      el[attrKey] = attrValue;
    }
  });
  if (typeof target === "string") {
    document.querySelector(target).appendChild(el);
  } else if (target) {
    target.appendChild(el);
  }

  return el;
};

const generateID = target =>
  target === "column" ? `column-${Date.now()}` : `task-${Date.now()}`;

const createColumn = (event, button, inputValue) => {
  event.preventDefault();
  if (button) {
    button.style.display = "inline-block";
  }
  const obj = {
    className: "column",
    id: generateID("column"),
    draggable: true,
    ondragstart: event => onDragStartCol(event),
    ondragover: event => onDragOver(event),
    ondrop: event => onDropCol(event),
    tasks: [],
    title: inputValue
  };

  arrayModule.addToMainArr(obj);
  renderModule.render();
};

const createTask = (e, button, inputValue) => {
  event.preventDefault();
  button.style.display = "inline-block";
  const obj = {
    className: "task",
    id: generateID("task"),
    draggable: true,
    ondragstart: event => onDragStartTask(event),
    ondragover: event => onDragOver(event),
    innerHTML: `<p class='taskText' onmousedown = "remDelBtnOnClick()">${inputValue}</p>`
  };
//   window.onDragOver = dragModule.onDragOver;

  const parentColumnId = e.path[2].id;
    arrayModule.addToTasksArr(obj, parentColumnId);
  renderModule.render();
};

module.exports = { newElement, createColumn, createTask };
