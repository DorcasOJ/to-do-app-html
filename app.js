const listContainer = document.getElementsByClassName("list-container")[0]
const completedListContainer = document.querySelector('.completed-list-container');

document.getElementById('add').addEventListener('click', addTask);
document.getElementById('input').addEventListener('keydown', function (event) {
    event.key === 'Enter' ? addTask() : null;
} );

function addTask() {
    let task = document.getElementById('input');
    if (task.value) {
        // add - avoid multiple same task
        const listItem = document.createElement('li')
    
        const span = document.createElement('span')
        span.classList.add('task', 'uncompleted')
        span.innerHTML = task.value

        const span1 = document.createElement('span')
        span1.className = 'edit'
        const inputEdit = document.createElement('input')
        inputEdit.type = 'text'
        const buttonEdit = document.createElement('button')
        buttonEdit.innerHTML = 'save'
        span1.appendChild(inputEdit)
        span1.appendChild(buttonEdit)

        const span2 = document.createElement('span')
        span2.className="completed"
        span2.innerHTML = 'x'
       
        const span3 = document.createElement('span')
        span3.className = 'edit-span'
        const italic = document.createElement('i')
        italic.className = 'fa-solid fa-pen-to-square edit-button'
        italic.innerHTML = ' edit'
        span3.appendChild(italic)

        listItem.appendChild(span)
        listItem.appendChild(span1)
        listItem.appendChild(span2)
        listItem.appendChild(span3)
        listContainer.appendChild(listItem)

        // listContainer.addEventListener('click', () => {
        //         listContainer.classList.toggle('checked')
        // })
        task.value = ""
        saveData()
       
    } else if (task.value === "") {
        alert('Please enter a task');
    }
   
}

completedListContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('completed')) {
        let str = event.target.parentElement.textContent.trim()
        str = str.slice(0, -1)
        let guess = document.querySelectorAll('.list-container li span.task')
        console.log(guess[0].textContent)
        guess.forEach((i) => {
            i.textContent == str
            guess = i
        })
        console.log(guess)
        event.target.parentElement.remove()
        listContainer.removeChild(guess)
        saveData()
    }
})

listContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('task')) {
        event.target.classList.toggle('checked')
        if (event.target.classList.contains('checked')) {
            event.target.classList.remove('uncompleted')
        } else {
        event.target.classList.add('uncompleted')

        }
        saveData()
    }
   else if (event.target.classList.contains('completed')) {
        event.target.parentElement.remove()
        saveData()
    }

    else if (event.target.classList.contains('edit-button')) {
        const query = event.target.parentElement.parentElement
        const editInput = query.querySelector('.edit')
        editInput.style.display = "flex"
        editInput.querySelector('input').value = event.target.parentElement.parentElement.querySelector('.task').innerHTML    
        query.querySelector('.task').innerHTML = 'editing...'
        event.target.parentElement.style.display = "none"
        editInput.querySelector('input').addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                if ( editInput.querySelector('input').value.length > 1 ) {
                query.querySelector('.task').innerHTML = editInput.querySelector('input').value
                editInput.style.display = "none"
                event.target.parentElement.parentElement.querySelector('.edit-span').style.display = "flex"
                saveData()
                console.log(editInput, )
                } else {
                    alert('Please enter a valid task, minimum of 2 characters')
                }
            }
        })
        editInput.querySelector('button').addEventListener('click', function (event) {        
            if ( editInput.querySelector('input').value.length > 1 ) {
                query.querySelector('.task').innerHTML = editInput.querySelector('input').value
                editInput.style.display = "none"
                event.target.parentElement.style.display = "flex"
                saveData()
            } else {
                alert('Please enter a valid task, minimum of 2 characters')
            } 
        })
    }
})





const taskList = document.querySelectorAll('nav ul li')
taskList.forEach((item) => {
    item.addEventListener('click', function () {
        taskList.forEach(i => i.classList.remove('active'))
        this.classList.toggle('active')

    })
})

function saveData () {
    // localStorage.setItem('data', JSON.stringify(document.getElementsByClassName('list-container')[0].innerHTML))
    localStorage.setItem('data', document.getElementsByClassName('list-container')[0].innerHTML)
    countTask()
   }


function showTask () {
    if (localStorage.getItem('data')) {
        listContainer.innerHTML = localStorage.getItem('data')
    }
}



function countTask () {
const parser = new DOMParser();
const doc = parser.parseFromString(localStorage.getItem('data'), 'text/html');
const allTaskLists = doc.querySelectorAll('li span.task')
const completedTaskList = doc.querySelectorAll('li span.task.checked')
const UncompletedTaskList = doc.querySelectorAll('li span.uncompleted')
// const allTaskValues = []
// const completedTaskValues = []
// const unCompletedTaskValues = []

const taskDict = {
    // "allTaskLists": allTaskLists.map(task => task.value),
    "completedTaskList": completedTaskList,
    "UncompletedTaskList": UncompletedTaskList,
}

  document.querySelector('.all-list-container').innerHTML = ""
  completedListContainer.innerHTML =""

for(let i = 0; i < allTaskLists.length; i++) {
    const span = document.createElement('span')
    span.className = "task"
    const listLi = document.createElement('li')
    span.innerHTML = allTaskLists[i].textContent
    listLi.appendChild(span)
    document.querySelector('.all-list-container').appendChild(listLi)
    // allTaskValues.push(allTaskLists[i].textContent)
}

for(let i = 0; i < completedTaskList.length; i++) {
    
    const span = document.createElement('span')
    span.className = "task"
    const span2 = document.createElement('span')
    span2.className="completed"
    span2.innerHTML = 'x'
    const listLi = document.createElement('li')
    span.innerHTML = completedTaskList[i].textContent
    listLi.appendChild(span)
    listLi.appendChild(span2)
    completedListContainer.appendChild(listLi)
    // completedTaskValues.push(allTaskLists[i].textContent)

  
}

 document.querySelectorAll('.noOfUncompletedTodo').forEach((i) => {
    i.innerHTML = UncompletedTaskList.length
 })

 document.querySelectorAll('.noOfAllTodo').forEach( (i) => {
    i.innerHTML = allTaskLists.length
 })

 document.querySelectorAll('.noOfcompletedTodo').forEach( (i) => {
    i.innerHTML = completedTaskList.length
 })

//  document.querySelector('.all-list-container').innerHTML = localStorage.getItem('data')
//  get values for completed list
}


const searchInput = document.getElementById('search')
searchInput.addEventListener('keydown', (event) => {
    event.key === 'Enter' ? search() : null
})
document.querySelector('.search>span').addEventListener('click', search)


function search () {
    if (searchInput.value) {
        // filter task value
    }
    else {
        alert('Enter a search value')
    }
}


showTask()
countTask()
