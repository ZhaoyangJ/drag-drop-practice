var draggableList = document.getElementById('draggable-list')
var check = document.getElementById('check')


var rankingList = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]


/*  */
const listItems = []


let dragStartIndex;

createList();

//  insert items into listItems
function createList() {
    [...rankingList]
      .map(a => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
      .forEach((letter, index) => {
        const listItem = document.createElement('li');
  
        listItem.setAttribute('data-index', index);
  
        listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
            <p class="letter-id">${letter}</p>
            <i class="fas fa-grip-lines"></i>
          </div>
        `;
  
        listItems.push(listItem);
  
        draggableList.appendChild(listItem);
      });
  
    addEventListeners();
  }

function dragStart() {
    console.log('Event ', 'dragstart')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}



function dragEnter() {
    console.log('Event ', 'dragenter')
    this.classList.add('over');
}

function dragLeave() {
    console.log('Event ', 'dragleave')
    this.classList.remove('over');
}

function dragOver(e) {
    console.log('Event ', 'dragover')
    e.preventDefault()
}

function dragDrop() {
    console.log('Event ', 'drop')
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
}