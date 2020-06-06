function insertViewListings(element) {
    var button = document.createElement("button");
    button.innerHTML = "Refresh";
    button.addEventListener("click", ()=>{
        render();
    });
    var table = document.createElement("table");
    table.classList.add("listings");
    table.innerHTML = '<thead><tr><th>Username</th><th>Item</th><th>Stack</th></tr></thead><tbody></tbody>';
    element.parentNode.insertBefore(table, element);
    element.parentNode.insertBefore(button, element);

    var content = table.querySelector("tbody");
    var items = [];
    var render = ()=>{
        if(items.length == 0) {
            return;
        }
        button.disabled = true;
        fetch("viewListings.php").then(r=>r.json()).then(listings=>{
            content.innerHTML = "";
            listings.forEach(listing=>{
                var item = items.find(a=>a.id == listing.itemid);
                var tr = document.createElement("tr");
                tr.innerHTML = '<td>'+listing.username+'</td><td><div class="item"><span class="icon" style="--x: -'+((listing.itemid % 32) * 40)+'px;--y: -'+(Math.floor(listing.itemid / 32) * 40)+'px;"></span> '+item.name+'</div></td><td>'+listing.stack+'</td>';
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

function insertItemSearch(element) {
	var itemid = document.createElement("input");
	itemid.type = "hidden";
	itemid.name = "itemid";
	itemid.value = 0;
	var input = document.createElement("input");
	input.type = "text";
	var list = document.createElement("div");
	list.classList.add("itemsearch-list");
	var item = document.createElement("div");
	item.classList.add("itemsearch-item");
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
				e.innerHTML = '<div class="item"><span class="icon" style="--x: -'+((result[i].id % 32) * 40)+'px;--y: -'+(Math.floor(result[i].id / 32) * 40)+'px;"></span> ' + result[i].name+'</div>';
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
    Array.from(document.querySelectorAll(".page")).forEach(page=>{
        if(page.id == name) {
            page.setAttribute("state", "open");
        }else {
            page.setAttribute("state", "");
        }
    });
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
