// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/lighter.png":[function(require,module,exports) {
module.exports = "/lighter.9342c752.png";
},{}],"img/fire.gif":[function(require,module,exports) {
module.exports = "/fire.8d2d90c3.gif";
},{}],"arrayActions/array_actions.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var renderModule = require("../");

var main = [];

var getMain = function getMain() {
  return _toConsumableArray(main);
};

var addToMainArr = function addToMainArr(entry) {
  main = [].concat(_toConsumableArray(main), [entry]);
};

var replaceMain = function replaceMain(entry) {
  main = _toConsumableArray(entry);
};

var addToTasksArr = function addToTasksArr(entry, parentId) {
  var mainCopy = getMain();
  var a = mainCopy.map(function (item, index) {
    if (item.id === parentId) {
      item.tasks.push(entry);
    }

    return item;
  });
  main = _toConsumableArray(a);
};

var removeFromTasksArr = function removeFromTasksArr(indexOfCol, indexOfTask) {
  var newTaskArr = main[indexOfCol].tasks.filter(function (tasks, index) {
    return indexOfTask !== index;
  });
  main[indexOfCol].tasks = newTaskArr;
};

var colDelete = function colDelete(col, index) {
  main.splice(index, 1);
  renderModule.render();
};

var replaceTasksArr = function replaceTasksArr(entry, parentId) {
  var mainCopy = getMain();
  var a = mainCopy.map(function (item, index) {
    if (item.id === parentId) {
      item.tasks = entry;
    }

    return item;
  });
  main = _toConsumableArray(a);
};

var taskEdit = function taskEdit(indexCol, indexTask) {
  main[indexCol].tasks.splice(indexTask, 1);
  renderModule.render();
};

var move = function move(arr, old_index, new_index) {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

module.exports = {
  addToMainArr: addToMainArr,
  addToTasksArr: addToTasksArr,
  removeFromTasksArr: removeFromTasksArr,
  colDelete: colDelete,
  replaceTasksArr: replaceTasksArr,
  taskEdit: taskEdit,
  getMain: getMain,
  replaceMain: replaceMain,
  move: move
};
},{"../":"index.js"}],"new_element/new_element.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var arrayModule = require("../arrayActions/array_actions");

var renderModule = require("../");

var dragModule = require("../drag/drag"); // window.onDragOver = dragModule.onDragOver;


var newElement = function newElement(tag, attributes, target) {
  var el = document.createElement(tag);
  Object.entries(attributes).forEach(function (attr) {
    if (attr !== "tasks") {
      var _attr = _slicedToArray(attr, 2),
          attrKey = _attr[0],
          attrValue = _attr[1];

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

var generateID = function generateID(target) {
  return target === "column" ? "column-".concat(Date.now()) : "task-".concat(Date.now());
};

var createColumn = function createColumn(event, button, inputValue) {
  event.preventDefault();

  if (button) {
    button.style.display = "inline-block";
  }

  var obj = {
    className: "column",
    id: generateID("column"),
    draggable: true,
    ondragstart: function ondragstart(event) {
      return onDragStartCol(event);
    },
    ondragover: function ondragover(event) {
      return onDragOver(event);
    },
    ondrop: function ondrop(event) {
      return onDropCol(event);
    },
    tasks: [],
    title: inputValue
  };
  arrayModule.addToMainArr(obj);
  renderModule.render();
};

var createTask = function createTask(e, button, inputValue) {
  event.preventDefault();
  button.style.display = "inline-block";
  var obj = {
    className: "task",
    id: generateID("task"),
    draggable: true,
    ondragstart: function ondragstart(event) {
      return onDragStartTask(event);
    },
    ondragover: function ondragover(event) {
      return onDragOver(event);
    },
    innerHTML: "<p class='taskText' onmousedown = \"remDelBtnOnClick()\">".concat(inputValue, "</p>")
  }; //   window.onDragOver = dragModule.onDragOver;

  var parentColumnId = e.path[2].id;
  arrayModule.addToTasksArr(obj, parentColumnId);
  renderModule.render();
};

module.exports = {
  newElement: newElement,
  createColumn: createColumn,
  createTask: createTask
};
},{"../arrayActions/array_actions":"arrayActions/array_actions.js","../":"index.js","../drag/drag":"drag/drag.js"}],"drag/drag.js":[function(require,module,exports) {
var arrayModule = require("../arrayActions/array_actions");

var elementModule = require("../new_element/new_element");

var renderModule = require("../");

var indexTaskTarget = null;
var indexCol = null;
var idOfDraggedCol;
var idOfDraggedTask;
var main = [];

var onDragStartCol = function onDragStartCol(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  idOfDraggedCol = event.target.id;
};

var onDragStartTask = function onDragStartTask(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.setData("task", "");
  idOfDraggedTask = event.target.id;
};

var onDragOver = function onDragOver(event) {
  main = arrayModule.getMain();
  event.preventDefault();
  var id = event.path[1].id;
  var typeOfDraggedIsTask = event.dataTransfer.types.includes("task");
  var colId = event.target.parentElement.parentElement.id;

  if (typeOfDraggedIsTask) {
    var emptyEl = elementModule.newElement("div", {
      className: "emptyEl task"
    });
    var packParentId = document.getElementById(idOfDraggedTask).parentElement.id;
    var packCol = main.filter(function (e) {
      return e.id === packParentId;
    });
    var dragPack = packCol[0].tasks.filter(function (e) {
      return e.id === idOfDraggedTask;
    });
    var indexOfTask = packCol[0].tasks.indexOf(dragPack[0]);
    var parentArr = main.filter(function (e) {
      return e.id === colId;
    });
    var p = event.target.id.includes("column") ? event.target.id : event.target.className === "taskText" ? event.target.parentElement.parentElement.id : event.target.parentElement.id;
    var targetCol = main.filter(function (e) {
      return e.id === p;
    });

    if (event.path[1].id.includes("task")) {
      parentArr[0].tasks.forEach(function (e, i) {
        if (e.id === id) {
          indexTaskTarget = i;
          console.log("id", id);
          console.log("indextasktarget", indexTaskTarget);
        }
      });
      document.querySelectorAll(".emptyEl").forEach(function (e) {
        document.getElementById(e.parentElement.id).removeChild(e);
      });

      if (packCol[0].id === targetCol[0].id) {
        if (id !== idOfDraggedTask && event.path[1].className !== "addTaskBtn" && indexTaskTarget < indexOfTask) {
          document.getElementById(colId).insertBefore(emptyEl, document.getElementById(id));
        } else if (id !== idOfDraggedTask && event.path[1].className !== "addTaskBtn" && indexTaskTarget > indexOfTask) {
          document.getElementById(colId).insertBefore(emptyEl, document.getElementById(id).nextSibling);
        }
      } else {
        if (id !== idOfDraggedTask && event.path[1].className !== "addTaskBtn") {
          document.getElementById(colId).insertBefore(emptyEl, document.getElementById(id));
        } else if (id !== idOfDraggedTask && event.path[1].className !== "addTaskBtn") {
          document.getElementById(colId).insertBefore(emptyEl, document.getElementById(id).nextSibling);
        }
      }
    } else if (event.path[0].className === "addTaskBtn") {
      var parentArrOfAddBtn = main.filter(function (e) {
        return e.id === event.target.parentElement.id;
      });
      indexTaskTarget = parentArrOfAddBtn[0].tasks.length;
      document.querySelectorAll(".emptyEl").forEach(function (e) {
        document.getElementById(e.parentElement.id).removeChild(e);
      });
      document.getElementById(event.target.parentElement.id).insertBefore(emptyEl, event.target);
    }
  } else {
    main.forEach(function (e, i) {
      if (!event.path[1].id.includes("column") ? e.id === colId : e.id === id) {
        indexCol = i;
        console.log("id", id);
      }
    });
  }
};

var onDropCol = function onDropCol(event) {
  var dragId = event.dataTransfer.getData("text/plain");
  main = arrayModule.getMain();

  if (dragId.includes("task")) {
    var packParentId = document.getElementById(dragId).parentElement.id;
    var packCol = main.filter(function (e) {
      return e.id === packParentId;
    });
    var dragPack = packCol[0].tasks.filter(function (e) {
      return e.id === dragId;
    });
    var indexOfTask = packCol[0].tasks.indexOf(dragPack[0]);
    var indexOfCol = main.indexOf(packCol[0]);
    var p = event.target.id.includes("column") ? event.target.id : event.target.className === "taskText" ? event.target.parentElement.parentElement.id : event.target.parentElement.id;
    var targetCol = main.filter(function (e) {
      return e.id === p;
    });

    if (packCol[0].id !== targetCol[0].id) {
      arrayModule.addToTasksArr(dragPack[0], p);
      var newTaskArr = arrayModule.move(targetCol[0].tasks, targetCol[0].tasks.length - 1, indexTaskTarget);
      arrayModule.replaceTasksArr(newTaskArr, p);
      arrayModule.removeFromTasksArr(indexOfCol, indexOfTask);
    } else {
      var _newTaskArr = arrayModule.move(packCol[0].tasks, indexOfTask, indexTaskTarget);

      arrayModule.replaceTasksArr(_newTaskArr, p);
    }

    event.dataTransfer.clearData();
    renderModule.render();
  }
};

var onDropContent = function onDropContent(event) {
  main = arrayModule.getMain();
  var dragId = event.dataTransfer.getData("text/plain");

  if (dragId.includes("column")) {
    var packCol = main.filter(function (e) {
      return e.id === dragId;
    });
    var indexOfColDragged = main.indexOf(packCol[0]);
    main = arrayModule.move(main, indexOfColDragged, indexCol);
    arrayModule.replaceMain(main);
    event.dataTransfer.clearData();
    renderModule.render();
  }
};

module.exports = {
  onDragStartCol: onDragStartCol,
  onDragStartTask: onDragStartTask,
  onDragOver: onDragOver,
  onDropCol: onDropCol,
  onDropContent: onDropContent
};
},{"../arrayActions/array_actions":"arrayActions/array_actions.js","../new_element/new_element":"new_element/new_element.js","../":"index.js"}],"new_element/add_btn.js":[function(require,module,exports) {
var elementModule = require("./new_element");

var renderModule = require("../");

var columnTitle = function columnTitle() {
  var button = event.target;
  var formContainer = elementModule.newElement("div", {
    className: "new-column-container"
  }, ".content");
  var form = elementModule.newElement("form", {
    className: "new-column",
    onsubmit: function onsubmit() {
      return elementModule.createColumn(event, button, input.value);
    }
  }, formContainer);
  var input = elementModule.newElement("input", {
    className: "titleInput",
    name: "title",
    type: "text",
    placeholder: "Enter list title..."
  }, form);
  elementModule.newElement("button", {
    className: "saveTitle",
    type: "submit",
    textContent: "Add list"
  }, form);
  elementModule.newElement("div", {
    className: "cancel",
    innerHTML: "<b></b><b></b><b></b><b></b>",
    onclick: function onclick() {
      button.style.display = "inline-block";
      renderModule.render();
    }
  }, form);
  button.style.display = "none";
};

var taskInput = function taskInput() {
  var button = event.target;
  var taskContainer = elementModule.newElement("div", {
    className: "new-task-container"
  }, event.target.parentElement);
  var form = elementModule.newElement("form", {
    className: "new-task",
    onsubmit: function onsubmit() {
      elementModule.createTask(event, button, input.value);
      console.log("submit");
    }
  }, taskContainer);
  var input = elementModule.newElement("textarea", {
    className: "taskInput",
    draggable: false,
    name: "task",
    placeholder: "Enter your task...",
    onkeyup: function onkeyup(event) {
      return event.target.scrollTop > 0 ? event.target.rows += 1 : null;
    }
  }, form);
  elementModule.newElement("button", {
    className: "saveTask",
    type: "submit",
    textContent: "Add card"
  }, form);
  elementModule.newElement("div", {
    className: "cancel",
    innerHTML: "<b></b><b></b><b></b><b></b>",
    onclick: function onclick() {
      button.style.display = "inline-block";
      renderModule.render();
    }
  }, form);
  button.style.display = "none";
};

module.exports = {
  columnTitle: columnTitle,
  taskInput: taskInput
};
},{"./new_element":"new_element/new_element.js","../":"index.js"}],"index.js":[function(require,module,exports) {
var lighter = require('./img/lighter.png');

var fire = require('./img/fire.gif');

var dragModule = require('./drag/drag');

var arrayModule = require('./arrayActions/array_actions');

var elementModule = require('./new_element/new_element');

var addBtnModule = require('./new_element/add_btn');

window.onDragStartTask = dragModule.onDragStartTask;
window.onDragStartCol = dragModule.onDragStartCol;
window.onDropCol = dragModule.onDropCol;
window.onDropContent = dragModule.onDropContent;
window.onDragOver = dragModule.onDragOver;
window.columnTitle = addBtnModule.columnTitle;

var remDelBtnOnClick = function remDelBtnOnClick() {
  document.querySelectorAll('.taskEditBtn').forEach(function (btn) {
    return btn.style.display = 'none';
  });
};

window.remDelBtnOnClick = remDelBtnOnClick;

var render = function render() {
  document.querySelector('.content').innerHTML = null;
  var mainCopy = arrayModule.getMain();

  if (mainCopy.length > 0) {
    mainCopy.forEach(function (column, indexCol) {
      if (!column.ondragstart) {
        column.ondragstart = function (event) {
          return dragModule.onDragStartCol(event);
        };

        column.ondragover = function (event) {
          return dragModule.onDragOver(event);
        };

        column.ondrop = function (event) {
          return dragModule.onDropCol(event);
        };
      }

      var newColumn = elementModule.newElement('div', column, '.content');
      var deleteScreen = elementModule.newElement('div', {
        className: 'deleteScreen'
      }, null);

      var editHeadInput = function editHeadInput() {
        columnHead.removeChild(headText);
        var form = elementModule.newElement('form', {
          className: 'new-column',
          onsubmit: function onsubmit(e) {
            e.preventDefault();
            column.title = input.value;
            render();
          }
        });
        columnHead.insertBefore(form, columnHead.firstChild);
        var input = elementModule.newElement('input', {
          className: 'titleInput',
          name: 'title',
          type: 'text',
          value: column.title
        }, form);
      };

      var columnHead = elementModule.newElement('div', {
        className: 'colHead'
      }, newColumn);
      var headText = elementModule.newElement('h3', {
        className: 'colTitle',
        textContent: column.title,
        onclick: function onclick() {
          return editHeadInput();
        }
      }, columnHead);
      var deleteHover = elementModule.newElement('button', {
        className: 'colSettingsBtn',
        innerHTML: '<div class=deleteSign></div>',
        onclick: function onclick() {
          arrayModule.colDelete(event, indexCol);
          mouseLeaveHover();
        }
      }, columnHead);
      var delQuestion = elementModule.newElement('div', {
        className: 'delQuestion',
        textContent: 'Burn it?'
      }, null);
      var lighterCont;
      var lighterImg;
      var screenHeight;
      var pxLeftToEl;
      var pxTopToEl;
      var pxHeightOfEl;
      var pxLeftToLighter;

      var mouseEnterHover = function mouseEnterHover() {
        columnHead.removeChild(deleteHover);
        newColumn.appendChild(deleteScreen);
        deleteScreen.appendChild(deleteHover);
        deleteScreen.appendChild(delQuestion);
        deleteHover.style.backgroundColor = '#e74040';
        deleteScreen.style.backgroundImage = "url(".concat(fire, ")"); // deleteScreen.style.backgroundImage = 'url(./img/fire.gif)'

        deleteHover.innerHTML = '<div class=deleteConf>Yes!</div>';
        var lighterContCheck = document.querySelector('.lighterCont');

        if (!lighterContCheck) {
          lighterCont = elementModule.newElement('div', {
            className: 'lighterCont'
          }, '.main');
          lighterImg = elementModule.newElement('img', {
            className: 'lighterImg',
            src: lighter
          }, lighterCont);
          pxLeftToEl = newColumn.offsetLeft;
          pxTopToEl = newColumn.offsetTop;
          pxHeightOfEl = newColumn.offsetHeight;
          var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          lighterImg.style.top = "".concat(screenHeight, "px");
          lighterImg.style.left = "".concat(screenWidth / 2, "px");
          pxLeftToLighter = lighterImg.offsetLeft;
          setTimeout(function () {
            lighterImg.style.transform = "translate(".concat(pxLeftToEl - pxLeftToLighter + 135, "px, ").concat(-(screenHeight - (pxTopToEl + pxHeightOfEl)) - 20, "px)");
          }, 5);
        }
      };

      var mouseLeaveHover = function mouseLeaveHover() {
        newColumn.removeChild(deleteScreen);
        lighterImg.style.transform = "translate(".concat(-(pxLeftToEl - pxLeftToLighter + 135), "px, ").concat(screenHeight - (pxTopToEl + pxHeightOfEl) + 20, "px)");
        columnHead.appendChild(deleteHover);
        deleteHover.style.backgroundColor = '#ebecf0';
        deleteHover.innerHTML = '<div class=deleteSign></div>';
        var main = document.querySelector('.main');
        setTimeout(function () {
          main.removeChild(lighterCont);
        }, 300);
      };

      deleteHover.addEventListener('mouseenter', mouseEnterHover);
      deleteHover.addEventListener('mouseleave', mouseLeaveHover);

      if (column.tasks.length > 0) {
        column.tasks.forEach(function (task, indexTask) {
          if (!task.ondragstart) {
            task.ondragstart = function (event) {
              return onDragStartTask(event);
            };

            task.ondragover = function (event) {
              return onDragOver(event);
            };
          }

          var newTask = elementModule.newElement('div', task, newColumn);
          var textSelect;

          if (newTask.className === 'task') {
            textSelect = newTask.querySelector('.taskText');
          }

          var taskEditBtn = elementModule.newElement('button', {
            className: 'taskEditBtn',
            textContent: 'X',
            onclick: function onclick() {
              arrayModule.taskEdit(indexCol, indexTask);
            }
          }, newTask);

          var editTaskInput = function editTaskInput() {
            taskEditBtn.style.display = 'none';
            newTask.setAttribute('draggable', false);
            var text = textSelect.textContent;
            newTask.removeChild(textSelect);
            var form = elementModule.newElement('form', {
              className: 'new-task',
              onsubmit: function onsubmit() {
                task.innerHTML = "<p class='taskText' onmousedown = \"remDelBtnOnClick()\">".concat(input.value, "</p>");
                render();
              }
            });
            newTask.insertBefore(form, newTask.firstChild);

            var submitOnEnter = function submitOnEnter(event) {
              if (event.which === 13 && !event.shiftKey) {
                if (input.value) {
                  event.target.form.dispatchEvent(new Event('submit', {
                    cancelable: true
                  }));
                } else {
                  arrayModule.taskEdit(indexCol, indexTask);
                }
              }
            };

            var input = elementModule.newElement('textarea', {
              className: 'titleInput',
              name: 'title',
              value: text,
              onkeyup: function onkeyup(event) {
                return event.target.scrollTop > 0 ? event.target.rows += 1 : null;
              },
              onkeypress: function onkeypress() {
                return submitOnEnter(event);
              }
            }, form);
          };

          textSelect.addEventListener('click', editTaskInput);
        });
      }

      elementModule.newElement('button', {
        className: 'addTaskBtn',
        innerHTML: '<span class="add-task-icon"></span> Add a card'
      }, newColumn).addEventListener('click', addBtnModule.taskInput);
    });
  }

  localStorage.setItem('tasks', JSON.stringify(arrayModule.getMain()));
};

if (localStorage.getItem('tasks')) {
  var mainFromStorage = JSON.parse(localStorage.getItem('tasks'));
  arrayModule.replaceMain(mainFromStorage);
}

render();
module.exports.render = render;
},{"./img/lighter.png":"img/lighter.png","./img/fire.gif":"img/fire.gif","./drag/drag":"drag/drag.js","./arrayActions/array_actions":"arrayActions/array_actions.js","./new_element/new_element":"new_element/new_element.js","./new_element/add_btn":"new_element/add_btn.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49742" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map