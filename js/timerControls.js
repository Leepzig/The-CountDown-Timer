

class TimerControls {
    constructor(cls) {
        this.cls.name = cls.name
        this.cls.startTimer()
        this.cls.stopTimer()
        this.cls.resetTimer()
    }

    renderButton(text, func, element) {
        var node = document.createTextNode(text)
        var button = document.createElement('button')
        button.addEventListener('click', func)
        button.appendChild(node)
        element.appendChild(button)
    }

    renderDivWClass(cls, element) {
        var div = document.createElement('div')
        div.classList.add(cls)
        element.appendChild(div)
        return div
    }

    renderClock() {
        var clocks = document.querySelector('.clocks')
        var h2 = document.createElement('h2')
        var h2Node = document.createTextNode(this.cls.name)
        h2.appendChild(h2Node)
        clocks.appendChild(h2)
        var div = this.renderDivWClass('clock-container', clocks)
        this.renderDivWClass('clock', div)
        var controls = this.renderDivWClass('controls', div)
        this.renderButton('Start Timer',this.cls.startTimer() )
        this.renderButton('Stop Timer',this.cls.stopTimer() )
        this.renderButton('Reset Timer',this.cls.resetTimer() )
    }

    
}

