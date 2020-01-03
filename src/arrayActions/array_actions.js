const renderModule = require("../");

let main = [];

const getMain = () => {
  return [...main];
};

const addToMainArr = entry => {
  main = [...main, entry];
};

const replaceMain = entry => {
  main = [...entry];
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

const colDelete = (col, index) => {
  main.splice(index, 1);
  renderModule.render();
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

const taskEdit = (indexCol, indexTask) => {
  main[indexCol].tasks.splice(indexTask, 1);
  renderModule.render();
};

const move = (arr, old_index, new_index) => {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

module.exports = {
  addToMainArr,
  addToTasksArr,
  removeFromTasksArr,
  colDelete,
  replaceTasksArr,
  taskEdit,
  getMain,
  replaceMain,
  move
};
