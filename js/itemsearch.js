//call with an html element and it will insert some search bar for users to select item names and a hidden form field called "itemid" after it
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
				e.innerHTML = '<span style="--x: -'+((result[i].id % 32) * 40)+'px;--y: -'+(Math.floor(result[i].id / 32) * 40)+'px;"></span> ' + result[i].name;
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
