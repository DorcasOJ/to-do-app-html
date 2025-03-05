


// document.getElementById('add').addEventListener('click', addTask);
// document.getElementById('input').addEventListener('keydown', function (event) {
//     event.key === 'Enter' ? addTask() : null;
// } );

// function addTask() {
//     let task = document.getElementById('input');
//     if (task.value) {
//         const listContainer = document.getElementsByClassName("list-container")[0]
//         const listItem = document.createElement('li')
//         listItem.innerHTML = task.value

//         const span = document.createElement('span')
//         span.className = 'extend'
//         span.innerHTML = '>'
        
//          const span2 = document.createElement('span')
//         span2.className="completed"
//         span2.innerHTML = 'x'
       
//         const span3 = document.createElement('span')
//         // span3.className = '
//         const italic = document.createElement('i')
//         italic.innerHTML = 'Calender'
//         const italic2 = document.createElement('i')
//         italic.innerHTML = 'List'
//         const italic3 = document.createElement('i')
//         italic.innerHTML = 'x'
//         span3.appendChild(italic)
//         span3.appendChild(italic2)
//         span3.appendChild(italic3)

//         listItem.addEventListener('click', () => listItem.classList.toggle('checked'))

//         span2.addEventListener('click', () => {
//             listContainer.removeChild(listItem)
//         })
//         // span.addEventListener('click', () => {
//         //     span3.classList.toggle('extended')
//         // })
//         listItem.appendChild(span)
//         listItem.appendChild(span2)
//         listItem.appendChild(span3)
        
//         listContainer.appendChild(listItem)
//     } else if (task.value === "") {
//         alert('Please enter a task');
//     }
//     const items = document.querySelectorAll('.list-container>li')
//     task.value = "" 
//     console.log(items)
// }
// document.querySelectorAll('.list-container>li').forEach(item => {
//     item.addEventListener('click', () => item.classList.toggle('checked'))
// })

document.getElementById('add').addEventListener('click', addTask);
document.getElementById('input').addEventListener('keydown', function (event) {
    event.key === 'Enter' ? addTask() : null;
} );

function addTask() {
    let task = document.getElementById('input');
    if (task.value) {
        const listContainer = document.getElementsByClassName("list-container")[0]
        const listItem = document.createElement('li')
    
        const span = document.createElement('span')
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
        span3.className = 'edit-button'
        const italic = document.createElement('i')
        italic.innerHTML = 'edit'
        span3.appendChild(italic)

        listItem.appendChild(span)
        listItem.appendChild(span1)
        listItem.appendChild(span2)
        listItem.appendChild(span3)
        listContainer.appendChild(listItem)

        span.addEventListener('click', () => {
            span.classList.toggle('checked'); 
            saveData()
        })

        span2.addEventListener('click', () => {
            listContainer.removeChild(listItem)
            saveData()
        })
        span3.addEventListener('click', () => {
          
            
            let editInput = document.querySelector('.edit')
            editInput.style.display = "flex"
            editInput.querySelector('input').value = span.innerHTML
            span.innerHTML = 'editing...'
                span3.style.display = "none"
            editInput.querySelector('input').addEventListener('keydown', function (event) {
                if (event.key === "Enter") {
                    span.innerHTML = editInput.querySelector('input').value
                    editInput.style.display = "none"
                    span3.style.display = "flex"
                }
                saveData()
            })
            editInput.querySelector('button').addEventListener('click', function () {
                if (editInput.querySelector('input').value) {
                    span.innerHTML = editInput.querySelector('input').value
                    editInput.style.display = "none"
                    span3.style.display = "flex"
                }
                saveData()
            })
        })
        task.value = ""
        saveData()
       
    } else if (task.value === "") {
        alert('Please enter a task');
    }
   
}

function saveData () {
    // localStorage.setItem('data', JSON.stringify(document.getElementsByClassName('list-container')[0].innerHTML))
    localStorage.setItem('data', document.getElementsByClassName('list-container')[0].innerHTML)
    console.log(localStorage.getItem('tasks'))
}

function showTask () {
    if (localStorage.getItem('data')) {
        document.getElementsByClassName('list-container')[0].innerHTML = localStorage.getItem('data')
    }
}

showTask()