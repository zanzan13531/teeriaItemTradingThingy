function showPage(name) {
    Array.from(document.querySelectorAll(".page")).forEach(page=>{
        if(page.id == name) {
            page.setAttribute("state", "open");
        }else {
            page.setAttribute("state", "");
        }
    });
}

function viewListings() {
	//fetch("listings/active").then(forEach);
}

/*
var vals = ['item1','item2','item3','etc.'];
var sel1 = document.getElementById('list1');
vals.forEach(function(val,ind) {
  var opt = document.createElement('option');
  opt.text = val;
  opt.value = ind;
  sel1.appendChild(opt);
});
*/
