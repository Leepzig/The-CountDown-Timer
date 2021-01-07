/*
//Original Ugly Version
for (let i = 0; i < localStorage['length']; i++) {
  var key = localStorage.key(i)
  var obj = JSON.parse(localStorage[key])
//how to make this more readable
  var node1 = document.createTextNode(key)
  var node2 = document.createTextNode(obj['duration'])
  var node3 = document.createTextNode(obj['reason'])

  var table = document.querySelector('table')

//how to do this more readable
  var row = document.createElement('tr')
  var keyData = document.createElement('td')
  var duration = document.createElement('td')
  var reason = document.createElement('td')

  //how to condense this and make it more readable
  keyData.append(node1)
  duration.append(node2)
  reason.append(node3)
  row.append(keyData)
  row.append(duration)
  row.append(reason)
  table.append(row)
}
*/


var row = document.createElement('tr') 
//function to loop through localStorage and append data to table
function appendRowsloop() {
  for (let i = 0; i < localStorage['length']; i++) {
    var key = localStorage.key(i)
    var obj = JSON.parse(localStorage[key])
    [key, obj.duration, obj.reason].forEach(function(element) {
      var node = document.createTextNode(element)
      var tData = document.createElement('td')
      tData.append(node)
      row.append(tdata)
    })
  }
  document.querySelector('table').append(row)
}

appendRowsloop()



/*
function appendRowsloop() {
  for (var i in localStorage) {
    var key = localStorage.key(i)
    var obj = JSON.parse(localStorage.getIte(key)
    [key, obj['duration'], obj['reason']].forEach(function(element) {
      var node = document.createTextNode(element)
      var tData = document.createElement('td')
      tData.append(node)
      row.append(tdata)
    })
  }
  table.append(row)
}







/*
//Version 1
function appendRowsloop() {
  for (let i = 0; i < localStorage['length']; i++) {
    var key = localStorage.key(i)
    var obj = JSON.parse(localStorage[key])
    console.log(obj)
    [key, obj['duration'], obj['reason']].forEach(createElementLoop);
  }
  table.append(row)
}

//function to use in the forEach loop to create elements and append children to table rows
function createElementLoop(element) {
  var node = document.createTextNode(element)
  var tData = document.createElement('td')
  tData.append(node)
  row.append(tdata)
}
*/