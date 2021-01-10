

class Button {
	constructor(tag) {
    this.tag = tag
    }
    
    create() {
	    var but = document.createElement('button')
	    but.innerHTML = 'This is a button'
	    this.tag.append(but)
    }
}

var div = document.getElementById('container')
var b = new Button(div)