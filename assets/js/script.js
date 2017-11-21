var typeInputs = {    
}

function changePackageInputs(selected){
	io.socket.get('/api/type', function (body, response) {
		body.forEach(function(item) {
			typeInputs[item.name] = item.fields;
		})

		var els = document.querySelectorAll('.form-group.input-more .form-control');
		if(typeof typeInputs[selected] === 'undefined')
			return;
		[].slice.call(els).forEach(function(el){
			if(typeInputs[selected].indexOf(el.id) >= 0){
				el.removeAttribute('readonly');
				el.parentElement.parentElement.classList.remove("hidden");
			}
			else{
				el.setAttribute('readonly', '');
				el.parentElement.parentElement.classList.add("hidden");
			}
		});

	});
}
/* Save search */
window.addEventListener("load", function(){
	var saveSearchBtn = document.getElementById("save-search-btn");
	var saveSearchName = document.getElementById("save-search-name");
	var detailedSearchForm = document.getElementById("detailed-search-form");
	var savedSearchesSelect = document.getElementById("saved-searches-select");
	if(saveSearchBtn && detailedSearchForm){
		saveSearchBtn.addEventListener("click", function(){
			var query = jQuery(detailedSearchForm).serialize();
			var qName = saveSearchName.value;
			io.socket.post('/api/savedSearch', { name: qName, value: query }, function (resData, jwRes) {
				console.log(jwRes);
				if(jwRes.statusCode == 201)
					loadSavedSearches();
				else if(jwRes.statusCode == 400){
					alert(jwRes.error.code+"\n"+jwRes.error.details);
				}
			});
		});
	}

	function loadSavedSearches(){
		if(savedSearchesSelect){
			io.socket.get('/api/savedSearch', function (body, response) {
				var body = body || [];
				savedSearchesSelect.options.length = 1;
				body.forEach(function(item){
					var opt = document.createElement("option");
					opt.value = item.value;
					opt.text = item.name;
					savedSearchesSelect.add(opt);
				});
			});
		}
	}
	loadSavedSearches();
	if(savedSearchesSelect){
		savedSearchesSelect.addEventListener("change", function(e){
			var typeEl = e.target;
			var selected = typeEl.options[typeEl.selectedIndex].value;
			location.href = "?" + selected;
		});
	}
});
