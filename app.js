


document.getElementById('add').addEventListener('click', addTask);
document.getElementById('input').addEventListener('keydown', function (event) {
    event.key === 'Enter' ? addTask() : null;
} );

function addTask() {
    let task = document.getElementById('input');
    if (task.value) {
        const listContainer = document.getElementsByClassName("list-container")[0]
        const listItem = document.createElement('li')
        listItem.innerHTML = task.value

        const span = document.createElement('span')
        span.className = 'extend'
        span.innerHTML = '>'
        
         const span2 = document.createElement('span')
        span2.className="completed"
        span2.innerHTML = 'x'
       
        const span3 = document.createElement('span')
        // span3.className = '
        const italic = document.createElement('i')
        italic.innerHTML = 'Calender'
        const italic2 = document.createElement('i')
        italic.innerHTML = 'List'
        const italic3 = document.createElement('i')
        italic.innerHTML = 'x'
        span3.appendChild(italic, italic2, italic3)

        listItem.addEventListener('click', () => listItem.classList.toggle('checked'))
        
        span2.addEventListener('click', () => {
            listContainer.removeChild(listItem)
        })
        span.addEventListener('click', () => {
            span3.classList.toggle('extended')
        })
        listItem.appendChild(span, span2, span3)
        
        listContainer.appendChild(listItem)
    } else if (task.value === "") {
        alert('Please enter a task');
    }
    const items = document.querySelectorAll('.list-container>li')
    task.value = "" 
    console.log(items)
}
document.querySelectorAll('.list-container>li').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked'))
})