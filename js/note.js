class Note {
  constructor(title) {
    this.title = title
  }

  renderNote() {

  }

  saveNote() {
    var  arr = []
    var nodeList = document.
    localStorage[this.title] = arr

  }

  loadNote() {

  }

  addToNote() {
    var value = document.getElementById('newListItem').value
    var line = document.createElement('li')
    var todo = document.querySelector(`#${this.title} list`)
    line.innerHTML = value
    todo.appendChild(line)
  }

  deleteNote(){
    
  }
}