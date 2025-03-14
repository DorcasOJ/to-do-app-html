// const listContainer = document.getElementsByClassName("list-container")[0]
const listContainer = document.querySelectorAll(".list-container")[0]

const completedListContainer = document.querySelector('.completed-list-container');
const Alert = document.querySelector('#error-display');

document.getElementById('add').addEventListener('click', checkForDuplicate);
document.getElementById('input').addEventListener('keydown', function (event) {
    event.key === 'Enter' ? checkForDuplicate() : null;
} );

function error(errorText) {
    Alert.style.display = "block";
    const p = document.createElement('p')
    // p.style.color = "rgb(92, 16, 16)"-
    p.innerHTML = errorText
    Alert.appendChild(p)
    setTimeout(() => {
        Alert.style.display = "none";
        p.innerHTML = "";
    }, 3000)
}

function checkForDuplicate() {
    let task = document.getElementById('input')
    const allTasks = getMenuData()[0]
    const allTaskList = Array.from(allTasks).map(i => i.textContent)
    // .filter((i) => i === task.value)
    if (allTaskList.includes(task.value.trim())) {
    error('enter a unique value')
    } else {
        addTask()
    }
}

//  add new task
function addTask() {
    let task = document.getElementById('input');
    if (task.value) {
        // add - avoid multiple same task
      
    
        const listItem = document.createElement('li')
    
        const span = document.createElement('span')
        span.classList.add('task', 'uncompleted')
        span.innerHTML = task.value.trim()
    
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
    

        task.value = ""
        saveData()
       
    } else if (task.value === "") {

        alert('Please enter a task');
    }
   
}

//  delete task from completed task
completedListContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('completed')) {
        let str = event.target.parentElement.textContent.trim()
        str = str.slice(0, -1)
        let guess = document.querySelectorAll('#add-to-your-todo li span.task')
        guess.forEach((i) => {
            i.textContent == str ? guess = i.parentElement : null
        })
        listContainer.removeChild(guess)
        saveData()
    }
})


// click events for each task -- checked, delete and edit
listContainer.addEventListener('click', (event) => {
    // checked
    if (event.target.classList.contains('task')) {
        event.target.classList.toggle('checked')
    
        if (event.target.classList.contains('checked')) {
            event.target.classList.remove('uncompleted')
            if (event.target.parentElement.querySelector('.edit-span')) {
                event.target.parentElement.querySelector('.edit-span').style.display = "none"
            } 
        } else {
        event.target.classList.add('uncompleted')
        event.target.parentElement.querySelector('.edit-span').style.display = "flex";

        }
        saveData()
    }

    // delete task from ADD YOUR To-Do List
   else if (event.target.classList.contains('completed')) {
        event.target.parentElement.remove()
        saveData()
    }

    // edit task
    else if (event.target.classList.contains('edit-button')) {
        const query = event.target.parentElement.parentElement
        const editInput = query.querySelector('.edit')
        editInput.style.display = "flex"
        editInput.querySelector('input').value = query.querySelector('.task').innerHTML    
        query.querySelector('.task').innerHTML = 'editing...'
        event.target.parentElement.style.display = "none"
        editInput.querySelector('input').addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                if ( editInput.querySelector('input').value.trim().length > 1 ) {
                query.querySelector('.task').innerHTML = editInput.querySelector('input').value.trim()
                
                editInput.parentElement.querySelector('.edit-span').style.display = "flex";
                editInput.style.display = "none"
                
                saveData()
                } else {
                    error('Please enter a valid task, minimum of 2 characters')
                }
            }
        })
        editInput.querySelector('button').addEventListener('click', function (event) {        
            if ( editInput.querySelector('input').value.trim().length > 1 ) {
                query.querySelector('.task').innerHTML = editInput.querySelector('input').value.trim()
                editInput.style.display = "none"
                editInput.parentElement.querySelector('.edit-span').style.display = "flex"
            
                saveData()
            } else {
                error('Please enter a valid task, minimum of 2 characters')
            } 
        })
    }
})

//  click event for task 
document.querySelector('#to-do > .list-container').addEventListener('click', function(event)  {
    
    if (event.target.classList.contains('task')) {

        let error;
        document.querySelectorAll('#add-to-your-todo li span.task').forEach((i) => {

            
                if (i.textContent === event.target.innerHTML) 
                    {
                    i.classList.toggle("checked");
                    if(i.classList.contains("checked")) {
                        i.classList.remove("uncompleted")
                        event.target.classList.toggle("checked")
    
                        // remove edit button
                        if (i.parentElement.querySelector('.edit-span')) {
                        i.parentElement.querySelector('.edit-span').style.display = "none"
                       
                        } 
                    } else {
                        i.classList.add("uncompleted");
                        i.parentElement.querySelector('.edit-span').style.display = "flex";
                    }
                    saveData()
                } else {
                    error("Task could not be ticked")
                }
                
        })
        
      
       }

    }
)



//  menu items
const taskList = document.querySelectorAll('nav ul li')
taskList.forEach((item) => {
    item.addEventListener('click', function () {
        taskList.forEach(i => i.classList.remove('active'))
        this.classList.toggle('active')
    })
})

// save task in local storage, count and display each menu section 
function saveData () {
    localStorage.setItem('data', document.getElementsByClassName('list-container')[0].innerHTML)
    countTask()
   }

// display task on reload
function showTask () {
    if (localStorage.getItem('data')) {
        listContainer.innerHTML = localStorage.getItem('data')
    }
}

function getMenuData () {
    const parser = new DOMParser();
    const doc = parser.parseFromString(localStorage.getItem('data'), 'text/html');
    const allTaskLists = doc.querySelectorAll('li span.task')
    const completedTaskList = doc.querySelectorAll('li span.task.checked')
    const UncompletedTaskList = doc.querySelectorAll('li span.uncompleted')
    return [allTaskLists, completedTaskList, UncompletedTaskList]
}

// count and display each menu section  function
function countTask () {
    const list = getMenuData()
    const allTaskLists = list[0], completedTaskList = list[1], UncompletedTaskList = list[2]
    document.querySelector('.all-list-container').innerHTML = ""
    completedListContainer.innerHTML =""
    document.querySelectorAll('.list-container')[1].innerHTML = ""

  for(let i = 0; i < UncompletedTaskList.length; i++) {
    const span = document.createElement('span')
    span.className = "task"
    const listLi = document.createElement('li')
    span.innerHTML = UncompletedTaskList[i].textContent
    listLi.appendChild(span)
    document.querySelectorAll('.list-container')[1].appendChild(listLi)
  
}

for(let i = 0; i < allTaskLists.length; i++) {
    const span = document.createElement('span')
    span.className = "task"
    const listLi = document.createElement('li')
    span.innerHTML = allTaskLists[i].textContent
    listLi.appendChild(span)
    document.querySelector('.all-list-container').appendChild(listLi)
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


function search (searchValue, menu) {
    if (searchValue !== "") {
        const all = getMenuData()
        const allList = Array.from(all[0]).map(i => i.textContent.toLowerCase())
        const completedList = Array.from(all[1]).map(i => i.textContent.toLowerCase())
        const unCompletedList = Array.from(all[2]).map(i => i.textContent.toLowerCase())
        if (menu === "completed") {
        //    const resp = completedList.some(completedList => completedList.includes(searchInput.value.lower))
        const resp = completedList.filter(item => item.startsWith(searchValue.toLowerCase()))
        completedListContainer.innerHTML = ""
        for(let i = 0; i < resp.length; i++) {

            const span = document.createElement('span')
            span.className = "task"
            const span2 = document.createElement('span')
            span2.className="completed"
            span2.innerHTML = 'x'
            const listLi = document.createElement('li')
            span.innerHTML = resp[i]
            listLi.appendChild(span)
            listLi.appendChild(span2)
            completedListContainer.appendChild(listLi)
        
          
        }
        }

        else if (menu === "all") {
            const resp = allList.filter(item => item.startsWith(searchValue.toLowerCase()))
     
            document.querySelector('.all-list-container').innerHTML = ""
            for(let i = 0; i < resp.length; i++) {
                const span = document.createElement('span')
                span.className = "task"
                const listLi = document.createElement('li')
                span.innerHTML = resp[i]
                listLi.appendChild(span)
                document.querySelector('.all-list-container').appendChild(listLi)
            }
        }
        else if (menu === "to-do") {
            const resp = unCompletedList.filter(item => item.startsWith(searchValue.toLowerCase()))
   
            document.querySelectorAll('.list-container')[1].innerHTML =""
            for(let i = 0; i < resp.length; i++) {
                const span = document.createElement('span')
                span.className = "task"
                const listLi = document.createElement('li')
                span.innerHTML = resp[i]
                listLi.appendChild(span)
                document.querySelectorAll('.list-container')[1].appendChild(listLi)
              
            }
        }
    }
    else {
        saveData()
    }
}

function searchValue (QuerySelector, menu) {
    QuerySelector.addEventListener('input', (event) => {
    
        let value = event.target.value.trim()
        if(/^[a-zA-Z0-9]+$/.test(value)) {
            search(value, menu=menu)
        }   
        else if (event.target.value === "") {
            countTask()
        }
    })
    QuerySelector.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            search(document.querySelector('.all-search > input').value.trim(), menu=menu)
        }
        }
    )
}

searchValue(document.querySelector('.completed-search > input'), "completed")
searchValue(document.querySelector('.all-search > input'), "all")
searchValue(document.querySelector('.to-do-search > input'), "to-do")


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

showTask()
countTask()
