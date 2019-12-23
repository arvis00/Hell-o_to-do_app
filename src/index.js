import lighter from "./img/lighter.png";

let main = [];
let indexTaskTarget = null;
let indexCol = null;

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

const getMain = () => {
  return [...main];
};

const generateID = target =>
  target === "column" ? `column-${Date.now()}` : `task-${Date.now()}`;

let idOfDraggedCol;
const onDragStartCol = event => {
  event.dataTransfer.setData("text/plain", event.target.id);
  idOfDraggedCol = event.target.id;
};

let idOfDraggedTask;
const onDragStartTask = event => {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.setData("task", "");
  idOfDraggedTask = event.target.id;
};

const onDragOver = event => {
  event.preventDefault();
  const id = event.path[1].id;
  const typeOfDraggedIsTask = event.dataTransfer.types.includes("task");
  const colId = event.target.parentElement.parentElement.id;

  if (typeOfDraggedIsTask) {
    const emptyEl = newElement("div", { className: "emptyEl task" });

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
      console.log("indextasktarget", indexTaskTarget);

      addToTasksArr(dragPack[0], p);

      const newTaskArr = move(
        targetCol[0].tasks,
        targetCol[0].tasks.length - 1,
        indexTaskTarget
      );
      replaceTasksArr(newTaskArr, p);

      removeFromTasksArr(indexOfCol, indexOfTask);
    } else {
      const newTaskArr = move(packCol[0].tasks, indexOfTask, indexTaskTarget);
      replaceTasksArr(newTaskArr, p);
    }
    event.dataTransfer.clearData();
    render();
  }
};

const replaceTasksArr = (entry, parentId) => {
  const mainCopy = getMain();
  const a = mainCopy.map((item, index) => {
    if (item.id === parentId) {
      item.tasks = entry;
    }
    return item;
  });

  main = [...a];
};

const onDropContent = event => {
  const dragId = event.dataTransfer.getData("text/plain");
  if (dragId.includes("column")) {
    const packCol = main.filter(e => e.id === dragId);
    const indexOfColDragged = main.indexOf(packCol[0]);
    main = move(main, indexOfColDragged, indexCol);
    console.log("indexofcolDragged", indexOfColDragged);
    console.log("indexCol", indexCol);

    event.dataTransfer.clearData();
    render();
  }
};

window.onDropContent = onDropContent;

const move = (arr, old_index, new_index) => {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const addToMainArr = entry => {
  main = [...main, entry];
};

const addToTasksArr = (entry, parentId) => {
  const mainCopy = getMain();
  const a = mainCopy.map((item, index) => {
    if (item.id === parentId) {
      item.tasks.push(entry);
    }
    return item;
  });

  main = [...a];
};

const removeFromTasksArr = (indexOfCol, indexOfTask) => {
  const newTaskArr = main[indexOfCol].tasks.filter(
    (tasks, index) => indexOfTask !== index
  );
  main[indexOfCol].tasks = newTaskArr;
};

const cancelAction = event => {};

const columnTitle = () => {
  const button = event.target;
  const formContainer = newElement(
    "div",
    { className: "new-column-container" },
    ".content"
  );
  const form = newElement(
    "form",
    {
      className: "new-column",
      onsubmit: () => createColumn(event, button, input.value)
    },
    formContainer
  );

  const input = newElement(
    "input",
    {
      className: "titleInput",
      name: "title",
      type: "text",
      placeholder: "Enter list title..."
    },
    form
  );

  newElement(
    "button",
    { className: "saveTitle", type: "submit", textContent: "Add list" },
    form
  );

  newElement(
    "div",
    {
      className: "cancel",
      innerHTML: "<b></b><b></b><b></b><b></b>",
      onclick: () => {
        button.style.display = "inline-block";
        render();
      }
    },
    form
  );

  button.style.display = "none";
};

window.columnTitle = columnTitle;


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

  addToMainArr(obj);
  render();
};

const taskInput = () => {
  const button = event.target;
  const taskContainer = newElement(
    "div",
    { className: "new-task-container" },
    event.target.parentElement
  );
  const form = newElement(
    "form",
    {
      className: "new-task",
      onsubmit: () => {
        createTask(event, button, input.value);
        console.log("submit");
      }
    },
    taskContainer
  );

  const input = newElement(
    "textarea",
    {
      className: "taskInput",
      name: "task",
      placeholder: "Enter your task...",
      onkeyup: event =>
        event.target.scrollTop > 0 ? (event.target.rows += 1) : null
    },
    form
  );

  newElement(
    "button",
    { className: "saveTask", type: "submit", textContent: "Add card" },
    form
  );

  newElement(
    "div",
    {
      className: "cancel",
      innerHTML: "<b></b><b></b><b></b><b></b>",
      onclick: () => {
        button.style.display = "inline-block";
        render();
      }
    },
    form
  );

  button.style.display = "none";
};
const remDelBtnOnClick = () => {
    document.querySelectorAll(".taskEditBtn").forEach(btn=>btn.style.display = 'none')
}

window.remDelBtnOnClick = remDelBtnOnClick

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

  const parentColumnId = e.path[2].id;
  addToTasksArr(obj, parentColumnId);
  render();
};

const colDelete = (col, index) => {
  main.splice(index, 1);
  render();
};

const taskEdit = (indexCol, indexTask) => {
  main[indexCol].tasks.splice(indexTask, 1);
  render();
};

const render = () => {
  document.querySelector(".content").innerHTML = null;
  const mainCopy = getMain();

  if (mainCopy.length > 0) {
    mainCopy.forEach((column, indexCol) => {
      if (!column.ondragstart) {
        column.ondragstart = event => onDragStartCol(event);
        column.ondragover = event => onDragOver(event);
        column.ondrop = event => onDropCol(event);
      }
      const newColumn = newElement("div", column, ".content");
      const deleteScreen = newElement(
        "div",
        { className: "deleteScreen" },
        null
      );
      const editHeadInput = () => {
        columnHead.removeChild(headText);
        const form = newElement("form", {
          className: "new-column",
          onsubmit: e => {
            e.preventDefault();
            column.title = input.value;
            render();
          }
        });
        columnHead.insertBefore(form, columnHead.firstChild);
        const input = newElement(
          "input",
          {
            className: "titleInput",
            name: "title",
            type: "text",
            value: column.title
          },
          form
        );
      };

      const columnHead = newElement("div", { className: "colHead" }, newColumn);
      const headText = newElement(
        "h3",
        {
          className: "colTitle",
          textContent: column.title,
          onclick: () => editHeadInput()
        },
        columnHead
      );

      const deleteHover = newElement(
        "button",
        {
          className: "colSettingsBtn",
          innerHTML: "<div class=deleteSign></div>",
          onclick: () => {
            colDelete(event, indexCol);
            mouseLeaveHover();
          }
        },
        columnHead
      );

      const delQuestion = newElement(
        "div",
        { className: "delQuestion", textContent: "Burn it?" },
        null
      );
      let lighterCont;
      let lighterImg;
      let screenHeight;
      let pxLeftToEl;
      let pxTopToEl;
      let pxHeightOfEl;
      let pxLeftToLighter;
      const mouseEnterHover = () => {
        columnHead.removeChild(deleteHover);
        newColumn.appendChild(deleteScreen);
        deleteScreen.appendChild(deleteHover);
        deleteScreen.appendChild(delQuestion);
        deleteHover.style.backgroundColor = "#e74040";
        deleteHover.innerHTML = "<div class=deleteConf>Yes!</div>";
        lighterCont = newElement("div", { className: "lighterCont" }, ".main");
        lighterImg = newElement(
          "img",
          { className: "lighterImg", src: lighter },
          lighterCont
        );
        pxLeftToEl = newColumn.offsetLeft;
        pxTopToEl = newColumn.offsetTop;
        pxHeightOfEl = newColumn.offsetHeight;
        const screenWidth = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        screenHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        lighterImg.style.top = `${screenHeight}px`;
        lighterImg.style.left = `${screenWidth / 2}px`;
        pxLeftToLighter = lighterImg.offsetLeft;
        setTimeout(() => {
          lighterImg.style.transform = `translate(${pxLeftToEl -
            pxLeftToLighter +
            135}px, ${-(screenHeight - (pxTopToEl + pxHeightOfEl)) - 20}px)`;
        }, 5);
      };

      const mouseLeaveHover = () => {
        newColumn.removeChild(deleteScreen);
        lighterImg.style.transform = `translate(${-(
          pxLeftToEl -
          pxLeftToLighter +
          135
        )}px, ${screenHeight - (pxTopToEl + pxHeightOfEl) + 20}px)`;
        columnHead.appendChild(deleteHover);
        deleteHover.style.backgroundColor = "#ebecf0";
        deleteHover.innerHTML = "<div class=deleteSign></div>";
      };

      deleteHover.addEventListener("mouseenter", mouseEnterHover);
      deleteHover.addEventListener("mouseleave", mouseLeaveHover);

      if (column.tasks.length > 0) {
        column.tasks.forEach((task, indexTask) => {
          if (!task.ondragstart) {
            task.ondragstart = event => onDragStartTask(event);
            task.ondragover = event => onDragOver(event);
            
          }
            const newTask = newElement("div", task, newColumn);
          let textSelect;
          if (newTask.className === "task") {
            textSelect = newTask.querySelector(".taskText");
          }
          const taskEditBtn = newElement(
            "button",
            {
              className: "taskEditBtn",
              textContent: "X",
              onclick: () => {
                taskEdit(indexCol, indexTask);
              }
            },
            newTask
          );
          const editTaskInput = () => {
            taskEditBtn.style.display = "none";
            const text = textSelect.textContent;
            newTask.removeChild(textSelect);
            const form = newElement("form", {
              className: "new-task",
              onsubmit: () => {
                task.innerHTML = `<p class='taskText' onmousedown = "remDelBtnOnClick()">${input.value}</p>`;
                render();
              }
            });
              newTask.insertBefore(form, newTask.firstChild);
              
              const submitOnEnter = event => { 
              if (event.which === 13 && !event.shiftKey) {
                  if (input.value) {
                      event.target.form.dispatchEvent(
                          new Event("submit", { cancelable: true })
                      );
                  } else {
                    taskEdit(indexCol, indexTask);
                  }
              }
            };
            const input = newElement(
              "textarea",
              {
                className: "titleInput",
                name: "title",
                value: text,
                  onkeyup: event => event.target.scrollTop > 0 ? (event.target.rows += 1) : null,
                onkeypress: () => submitOnEnter(event)
              },
              form
            );
          };

          textSelect.addEventListener("click", editTaskInput);
        });
      }

      newElement(
        "button",
        {
          className: "addTaskBtn",
          innerHTML: '<span class="add-task-icon"></span> Add a card'
        },
        newColumn
      ).addEventListener("click", taskInput);
    });
  }
  localStorage.setItem("tasks", JSON.stringify(main));
};

if (localStorage.getItem("tasks")) {
  const mainFromStorage = JSON.parse(localStorage.getItem("tasks"));
  main = [...mainFromStorage];
}

render();
