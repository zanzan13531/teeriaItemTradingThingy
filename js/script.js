function deleteListing(id, row) {
    fetch("deleteListing.php?id="+id);
    var r = row.parentNode.parentNode;
    r.parentNode.removeChild(r);
}

function insertViewListings(element) {
    var button = document.createElement("button");
    button.innerHTML = "Refresh";
    button.addEventListener("click", ()=>{
        render();
    });
    var table = document.createElement("table");
    table.classList.add("listings");
    table.innerHTML = '<thead><tr><th>Username</th><th>Item<input type="text" placeholder="Filter..." oninput="filterRows(this)" class="filter"></th><th>Stack<button onclick="sortRows(this)" class="sort" sort="2"><span></span><span></span></button></th><th>Price<button onclick="sortRows(this)" class="sort" sort="2"><span></span><span></span></button></th><th>Price Each<button onclick="sortRows(this)" class="sort" sort="2"><span></span><span></span></button></th><th>Discord</th><th>Actions</th></tr></thead><tbody></tbody>';
    element.parentNode.insertBefore(button, element);
    element.parentNode.insertBefore(table, element);

    var content = table.querySelector("tbody");
    var items = [];
    var render = ()=>{
        if(items.length == 0) {
            return;
        }
        button.disabled = true;
        fetch("viewListings.php").then(r=>r.json()).then(data=>{
            content.innerHTML = "";
            data.listings.forEach((listing, i)=>{
                var item = items.find(a=>a.id == listing.itemid);
                var tr = document.createElement("tr");
                tr.setAttribute("index", i);
                tr.innerHTML = '<td>'+listing.username+'</td><td><div class="item"><span class="icon" style="--x: -'+((listing.itemid % 32) * 40)+'px;--y: -'+(Math.floor(listing.itemid / 32) * 40)+'px;"></span> '+item.name+'</div></td><td>'+listing.stack+'</td><td>'+listing.price+'</td><td>'+Math.round(listing.price/(listing.stack > 0 ? listing.stack : 1))+"</td><td>"+listing.discord+"</td><td>"+(listing.ip == data.user ? '<button onclick="deleteListing(\''+listing.listingid+'\', this)">Delete</button>' : "")+"</td>";
                content.appendChild(tr);
            });
            button.disabled = false;
        });
    };

	fetchItemData().then(data=>{
        items = data;
        render();
    });
}

function filterRows(e) {
    var text = e.value.trim().toLowerCase();
    var index = Array.from(e.parentNode.parentNode.children).indexOf(e.parentNode);
    var rows = Array.from(e.parentNode.parentNode.parentNode.parentNode.querySelector("tbody").children);
    if(text.length == 0) {
        rows.forEach(row=>{
            row.removeAttribute("hidden");
        });
    }
    rows.forEach(row=>{
        if(!row.children[index].innerText.toLowerCase().includes(text)) {
            row.setAttribute("hidden", "");
        }else {
            row.removeAttribute("hidden");
        }
    });
}

function sortRows(e) {
    var sorts = ["up", "down", "none"];
    var sort = sorts[0];
    if(e.hasAttribute("sort")) {
        sort = sorts[(e.getAttribute("sort")*1+1) % sorts.length];
    }
    e.setAttribute("sort", sorts.indexOf(sort));
    var index = Array.from(e.parentNode.parentNode.children).indexOf(e.parentNode);
    var body = e.parentNode.parentNode.parentNode.parentNode.querySelector("tbody");
    var rows = Array.from(body.children);
    body.innerHTML = "";
    rows = rows.sort((a, b)=>{
        if(sort == "up") {
            return a.children[index].innerText*1 - b.children[index].innerText*1;
        }else if(sort == "down") {
            return b.children[index].innerText*1 - a.children[index].innerText*1;
        }else {
            return a.getAttribute("index")*1 - b.getAttribute("index")*1;
        }
    });
    rows.forEach(row=>{
        body.appendChild(row);
    });
}

function insertItemSearch(element) {
	var itemid = document.createElement("input");
	itemid.type = "hidden";
	itemid.name = "itemid";
	itemid.value = 0;
	var input = document.createElement("input");
	input.type = "text";
    input.placeholder = "Search...";
	var list = document.createElement("div");
	list.classList.add("itemsearch-list");
	var item = document.createElement("div");
	item.classList.add("itemsearch-item");
    item.innerHTML = '<div class="item"><span class="icon" style="--x: 0px;--y:0px;"></span> ItemName.None</div>';
	var container = document.createElement("div");
	container.classList.add("itemsearch");
	container.appendChild(input);
	container.appendChild(list);
	container.appendChild(item);
	element.parentNode.insertBefore(container, element);
	element.parentNode.insertBefore(itemid, element);

	var click = event=>{
		var id = event.target.getAttribute("data-id");
		itemid.value = id;
		item.innerHTML = event.target.innerHTML;
		input.value = "";
		input.blur();
		list.innerHTML = "";
	};

	fetchItemData().then(items=>{
		var length = items.length;
		input.addEventListener("input", ()=>{
			list.innerHTML = "";
			var text = input.value.trim().toLowerCase();
			if(text.length == 0) {
				return;
			}
			var result = [];
			var size = 0;
			for(let i = 0; i < length; i++) {
				if(items[i].name.toLowerCase().includes(text)) {
					size++;
					result.push(items[i]);
				}
			}
			for(let i = 0; i < size; i++) {
				var e = document.createElement("div");
				e.innerHTML = '<div class="item"><span class="icon" style="--x: -'+((result[i].id % 32) * 40)+'px;--y: -'+(Math.floor(result[i].id / 32) * 40)+'px;"></span> '+result[i].name+'</div>';
				e.setAttribute("data-id", result[i].id);
				e.addEventListener("click", click);
				list.appendChild(e);
			}
		});
	});
}

function fetchItemData() {
	return new Promise(ready=>{
		Promise.all([
			fetch("data/items.json").then(r=>r.json()),
			fetch("data/local.json").then(r=>r.json())
		]).then(r=>{
			var items = [];
			var names = r[1].ItemName;
			r[0].forEach(item=>{
				var name = names[item.name];
				items.push({id:item.id*1, name:name ? name : "ItemName."+item.name});
			});
			ready(items);
		});
	});
}

function showPage(name) {
    location.hash = name;
    Array.from(document.querySelectorAll(".page")).forEach(page=>{
        if(page.id == name) {
            page.setAttribute("state", "open");
        }else {
            page.setAttribute("state", "");
        }
    });
}

window.addEventListener("load", ()=>{
    var name = location.hash.replace("#", "");
    if(name.length > 0 && document.querySelector("#"+name)) {
        showPage(name);
    }
});

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
