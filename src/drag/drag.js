const arrayModule = require("../arrayActions/array_actions");
const elementModule = require("../new_element/new_element");
const renderModule = require("../");

let indexTaskTarget = null;
let indexCol = null;
let idOfDraggedCol;
let idOfDraggedTask;

let main = [];

const onDragStartCol = event => {
  event.dataTransfer.setData("text/plain", event.target.id);
  idOfDraggedCol = event.target.id;
};

const onDragStartTask = event => {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.setData("task", "");
  idOfDraggedTask = event.target.id;
};

const onDragOver = event => {
  main = arrayModule.getMain();
  event.preventDefault();
  const id = event.path[1].id;
  const typeOfDraggedIsTask = event.dataTransfer.types.includes("task");
  const colId = event.target.parentElement.parentElement.id;

  if (typeOfDraggedIsTask) {
    const emptyEl = elementModule.newElement("div", {
      className: "emptyEl task"
    });

    const packParentId = document.getElementById(idOfDraggedTask).parentElement
      .id;
    const packCol = main.filter(e => e.id === packParentId);
    const dragPack = packCol[0].tasks.filter(e => e.id === idOfDraggedTask);
    const indexOfTask = packCol[0].tasks.indexOf(dragPack[0]);
    const parentArr = main.filter(e => e.id === colId);
    const p = event.target.id.includes("column")
      ? event.target.id
      : event.target.className === "taskText"
      ? event.target.parentElement.parentElement.id
      : event.target.parentElement.id;
    const targetCol = main.filter(e => e.id === p);

    if (event.path[1].id.includes("task")) {
      parentArr[0].tasks.forEach((e, i) => {
        if (e.id === id) {
          indexTaskTarget = i;
          console.log("id", id);
          console.log("indextasktarget", indexTaskTarget);
        }
      });

      document.querySelectorAll(".emptyEl").forEach(e => {
        document.getElementById(e.parentElement.id).removeChild(e);
      });
      if (packCol[0].id === targetCol[0].id) {
        if (
          id !== idOfDraggedTask &&
          event.path[1].className !== "addTaskBtn" &&
          indexTaskTarget < indexOfTask
        ) {
          document
            .getElementById(colId)
            .insertBefore(emptyEl, document.getElementById(id));
        } else if (
          id !== idOfDraggedTask &&
          event.path[1].className !== "addTaskBtn" &&
          indexTaskTarget > indexOfTask
        ) {
          document
            .getElementById(colId)
            .insertBefore(emptyEl, document.getElementById(id).nextSibling);
        }
      } else {
        if (
          id !== idOfDraggedTask &&
          event.path[1].className !== "addTaskBtn"
        ) {
          document
            .getElementById(colId)
            .insertBefore(emptyEl, document.getElementById(id));
        } else if (
          id !== idOfDraggedTask &&
          event.path[1].className !== "addTaskBtn"
        ) {
          document
            .getElementById(colId)
            .insertBefore(emptyEl, document.getElementById(id).nextSibling);
        }
      }
    } else if (event.path[0].className === "addTaskBtn") {
      const parentArrOfAddBtn = main.filter(
        e => e.id === event.target.parentElement.id
      );
      indexTaskTarget = parentArrOfAddBtn[0].tasks.length;
      document.querySelectorAll(".emptyEl").forEach(e => {
        document.getElementById(e.parentElement.id).removeChild(e);
      });
      document
        .getElementById(event.target.parentElement.id)
        .insertBefore(emptyEl, event.target);
    }
  } else {
    main.forEach((e, i) => {
      if (!event.path[1].id.includes("column") ? e.id === colId : e.id === id) {
        indexCol = i;
        console.log("id", id);
      }
    });
  }
};

const onDropCol = event => {
  const dragId = event.dataTransfer.getData("text/plain");
  main = arrayModule.getMain();

  if (dragId.includes("task")) {
    const packParentId = document.getElementById(dragId).parentElement.id;
    const packCol = main.filter(e => e.id === packParentId);
    const dragPack = packCol[0].tasks.filter(e => e.id === dragId);
    const indexOfTask = packCol[0].tasks.indexOf(dragPack[0]);
    const indexOfCol = main.indexOf(packCol[0]);
    const p = event.target.id.includes("column")
      ? event.target.id
      : event.target.className === "taskText"
      ? event.target.parentElement.parentElement.id
      : event.target.parentElement.id;

    const targetCol = main.filter(e => e.id === p);
    if (packCol[0].id !== targetCol[0].id) {
      arrayModule.addToTasksArr(dragPack[0], p);

      const newTaskArr = arrayModule.move(
        targetCol[0].tasks,
        targetCol[0].tasks.length - 1,
        indexTaskTarget
      );
      arrayModule.replaceTasksArr(newTaskArr, p);

      arrayModule.removeFromTasksArr(indexOfCol, indexOfTask);
    } else {
      const newTaskArr = arrayModule.move(
        packCol[0].tasks,
        indexOfTask,
        indexTaskTarget
      );
      arrayModule.replaceTasksArr(newTaskArr, p);
    }
    event.dataTransfer.clearData();
    renderModule.render();
  }
};

const onDropContent = event => {
  main = arrayModule.getMain();

  const dragId = event.dataTransfer.getData("text/plain");
  if (dragId.includes("column")) {
    const packCol = main.filter(e => e.id === dragId);
    const indexOfColDragged = main.indexOf(packCol[0]);
    main = arrayModule.move(main, indexOfColDragged, indexCol);
    arrayModule.replaceMain(main);
    event.dataTransfer.clearData();
    renderModule.render();
  }
};

module.exports = {
  onDragStartCol,
  onDragStartTask,
  onDragOver,
  onDropCol,
  onDropContent
};
