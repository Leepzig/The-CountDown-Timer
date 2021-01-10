



//there is a bug with 'cannot read date of undefined' will troubleshoot later to fix it.
//function to loop through localStorage and append data to table
function appendRowsloop() {
  var row = document.createElement('tr')
  for (let i = 0; i < localStorage['codingTimer'].length; i++) {
    var arr = JSON.parse(localStorage['codingTimer']);
    var obj = arr[i];
    console.log(obj);
    console.log(obj.date);
    var keyArr = [obj.date, obj.duration, obj.reason];
    keyArr.forEach(function(element) {
      var node = document.createTextNode(element);
      var tData = document.createElement('td');
      tData.append(node);
      row.append(tData);
    })
  }
  document.querySelector('table').append(row)
}

appendRowsloop()
