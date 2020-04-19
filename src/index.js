const lighter = require('./img/lighter.png')
const fire = require('./img/fire.gif')
const dragModule = require('./drag/drag')
const arrayModule = require('./arrayActions/array_actions')
const elementModule = require('./new_element/new_element')
const addBtnModule = require('./new_element/add_btn')

window.onDragStartTask = dragModule.onDragStartTask
window.onDragStartCol = dragModule.onDragStartCol
window.onDropCol = dragModule.onDropCol
window.onDropContent = dragModule.onDropContent
window.onDragOver = dragModule.onDragOver
window.columnTitle = addBtnModule.columnTitle

const remDelBtnOnClick = () => {
  document
    .querySelectorAll('.taskEditBtn')
    .forEach((btn) => (btn.style.display = 'none'))
}

window.remDelBtnOnClick = remDelBtnOnClick

const render = () => {
  document.querySelector('.content').innerHTML = null
  const mainCopy = arrayModule.getMain()
  if (mainCopy.length > 0) {
    mainCopy.forEach((column, indexCol) => {
      if (!column.ondragstart) {
        column.ondragstart = (event) => dragModule.onDragStartCol(event)
        column.ondragover = (event) => dragModule.onDragOver(event)
        column.ondrop = (event) => dragModule.onDropCol(event)
      }
      const newColumn = elementModule.newElement('div', column, '.content')
      const deleteScreen = elementModule.newElement(
        'div',
        { className: 'deleteScreen' },
        null
      )
      const editHeadInput = () => {
        columnHead.removeChild(headText)
        const form = elementModule.newElement('form', {
          className: 'new-column',
          onsubmit: (e) => {
            e.preventDefault()
            column.title = input.value
            render()
          },
        })
        columnHead.insertBefore(form, columnHead.firstChild)
        const input = elementModule.newElement(
          'input',
          {
            className: 'titleInput',
            name: 'title',
            type: 'text',
            value: column.title,
          },
          form
        )
      }

      const columnHead = elementModule.newElement(
        'div',
        { className: 'colHead' },
        newColumn
      )
      const headText = elementModule.newElement(
        'h3',
        {
          className: 'colTitle',
          textContent: column.title,
          onclick: () => editHeadInput(),
        },
        columnHead
      )

      const deleteHover = elementModule.newElement(
        'button',
        {
          className: 'colSettingsBtn',
          innerHTML: '<div class=deleteSign></div>',
          onclick: () => {
            arrayModule.colDelete(event, indexCol)
            mouseLeaveHover()
          },
        },
        columnHead
      )

      const delQuestion = elementModule.newElement(
        'div',
        { className: 'delQuestion', textContent: 'Burn it?' },
        null
      )
      let lighterCont
      let lighterImg
      let screenHeight
      let pxLeftToEl
      let pxTopToEl
      let pxHeightOfEl
      let pxLeftToLighter
      const mouseEnterHover = () => {
        columnHead.removeChild(deleteHover)
        newColumn.appendChild(deleteScreen)
        deleteScreen.appendChild(deleteHover)
        deleteScreen.appendChild(delQuestion)
        deleteHover.style.backgroundColor = '#e74040'
        deleteScreen.style.backgroundImage = `url(${fire})`
        // deleteScreen.style.backgroundImage = 'url(./img/fire.gif)'
        deleteHover.innerHTML = '<div class=deleteConf>Yes!</div>'
        lighterCont = elementModule.newElement(
          'div',
          { className: 'lighterCont' },
          '.main'
        )
        lighterImg = elementModule.newElement(
          'img',
          { className: 'lighterImg', src: lighter },
          lighterCont
        )
        pxLeftToEl = newColumn.offsetLeft
        pxTopToEl = newColumn.offsetTop
        pxHeightOfEl = newColumn.offsetHeight
        const screenWidth = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        )
        screenHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        )
        lighterImg.style.top = `${screenHeight}px`
        lighterImg.style.left = `${screenWidth / 2}px`
        pxLeftToLighter = lighterImg.offsetLeft
        setTimeout(() => {
          lighterImg.style.transform = `translate(${
            pxLeftToEl - pxLeftToLighter + 135
          }px, ${-(screenHeight - (pxTopToEl + pxHeightOfEl)) - 20}px)`
        }, 5)
      }

      const mouseLeaveHover = () => {
        newColumn.removeChild(deleteScreen)
        lighterImg.style.transform = `translate(${-(
          pxLeftToEl -
          pxLeftToLighter +
          135
        )}px, ${screenHeight - (pxTopToEl + pxHeightOfEl) + 20}px)`
        columnHead.appendChild(deleteHover)
        deleteHover.style.backgroundColor = '#ebecf0'
        deleteHover.innerHTML = '<div class=deleteSign></div>'
      }

      deleteHover.addEventListener('mouseenter', mouseEnterHover)
      deleteHover.addEventListener('mouseleave', mouseLeaveHover)

      if (column.tasks.length > 0) {
        column.tasks.forEach((task, indexTask) => {
          if (!task.ondragstart) {
            task.ondragstart = (event) => onDragStartTask(event)
            task.ondragover = (event) => onDragOver(event)
          }
          const newTask = elementModule.newElement('div', task, newColumn)
          let textSelect
          if (newTask.className === 'task') {
            textSelect = newTask.querySelector('.taskText')
          }
          const taskEditBtn = elementModule.newElement(
            'button',
            {
              className: 'taskEditBtn',
              textContent: 'X',
              onclick: () => {
                arrayModule.taskEdit(indexCol, indexTask)
              },
            },
            newTask
          )
          const editTaskInput = () => {
            taskEditBtn.style.display = 'none'
            newTask.setAttribute('draggable', false)
            const text = textSelect.textContent
            newTask.removeChild(textSelect)
            const form = elementModule.newElement('form', {
              className: 'new-task',
              onsubmit: () => {
                task.innerHTML = `<p class='taskText' onmousedown = "remDelBtnOnClick()">${input.value}</p>`
                render()
              },
            })
            newTask.insertBefore(form, newTask.firstChild)

            const submitOnEnter = (event) => {
              if (event.which === 13 && !event.shiftKey) {
                if (input.value) {
                  event.target.form.dispatchEvent(
                    new Event('submit', { cancelable: true })
                  )
                } else {
                  arrayModule.taskEdit(indexCol, indexTask)
                }
              }
            }
            const input = elementModule.newElement(
              'textarea',
              {
                className: 'titleInput',
                name: 'title',
                value: text,
                onkeyup: (event) =>
                  event.target.scrollTop > 0 ? (event.target.rows += 1) : null,
                onkeypress: () => submitOnEnter(event),
              },
              form
            )
          }

          textSelect.addEventListener('click', editTaskInput)
        })
      }

      elementModule
        .newElement(
          'button',
          {
            className: 'addTaskBtn',
            innerHTML: '<span class="add-task-icon"></span> Add a card',
          },
          newColumn
        )
        .addEventListener('click', addBtnModule.taskInput)
    })
  }

  localStorage.setItem('tasks', JSON.stringify(arrayModule.getMain()))
}

if (localStorage.getItem('tasks')) {
  const mainFromStorage = JSON.parse(localStorage.getItem('tasks'))
  arrayModule.replaceMain(mainFromStorage)
}

render()

module.exports.render = render
