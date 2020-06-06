function showAddListingPage() {

	var addListingPage = document.getElementById("listingAddition");
	var mainPage = document.getElementById("mainPage");
	var viewListingPage = document.getElementById("listingView");
  
	addListingPage.style.display = "block";
	mainPage.style.display = "none";
	viewListingPage.style.display = "none";

}

function showListingsPage() {

	var addListingPage = document.getElementById("listingAddition");
	var mainPage = document.getElementById("mainPage");
	var viewListingPage = document.getElementById("listingView");
  
	addListingPage.style.display = "none";
	mainPage.style.display = "none";
	viewListingPage.style.display = "block";

}

function viewListings() {

	fetch("listings/active").then(forEach);

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