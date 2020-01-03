const elementModule = require("./new_element");
const renderModule = require("../");

const columnTitle = () => {
  const button = event.target;
  const formContainer = elementModule.newElement(
    "div",
    { className: "new-column-container" },
    ".content"
  );
  const form = elementModule.newElement(
    "form",
    {
      className: "new-column",
      onsubmit: () => elementModule.createColumn(event, button, input.value)
    },
    formContainer
  );

  const input = elementModule.newElement(
    "input",
    {
      className: "titleInput",
      name: "title",
      type: "text",
      placeholder: "Enter list title..."
    },
    form
  );

  elementModule.newElement(
    "button",
    { className: "saveTitle", type: "submit", textContent: "Add list" },
    form
  );

  elementModule.newElement(
    "div",
    {
      className: "cancel",
      innerHTML: "<b></b><b></b><b></b><b></b>",
      onclick: () => {
        button.style.display = "inline-block";
        renderModule.render();
      }
    },
    form
  );

  button.style.display = "none";
};

const taskInput = () => {
  const button = event.target;
  const taskContainer = elementModule.newElement(
    "div",
    { className: "new-task-container" },
    event.target.parentElement
  );
  const form = elementModule.newElement(
    "form",
    {
      className: "new-task",

      onsubmit: () => {
        elementModule.createTask(event, button, input.value);
        console.log("submit");
      }
    },
    taskContainer
  );

  const input = elementModule.newElement(
    "textarea",
    {
      className: "taskInput",
      draggable: false,
      name: "task",
      placeholder: "Enter your task...",
      onkeyup: event =>
        event.target.scrollTop > 0 ? (event.target.rows += 1) : null
    },
    form
  );

  elementModule.newElement(
    "button",
    { className: "saveTask", type: "submit", textContent: "Add card" },
    form
  );

  elementModule.newElement(
    "div",
    {
      className: "cancel",
      innerHTML: "<b></b><b></b><b></b><b></b>",
      onclick: () => {
        button.style.display = "inline-block";
        renderModule.render();
      }
    },
    form
  );

  button.style.display = "none";
};

module.exports = { columnTitle, taskInput };
