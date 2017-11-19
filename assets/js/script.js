var typeInputs = {    
}

io.socket.get('/api/type', function (body, response) {
    body.forEach(function(item) {
        typeInputs[item.name] = item.fields;
    })
});

function changePackageInputs(selected){
    var els = document.querySelectorAll('.form-group.input-more .form-control');
    if(typeof typeInputs[selected] === 'undefined')
        return;
    els.forEach(function(el){
        if(typeInputs[selected].indexOf(el.id) >= 0){
            el.removeAttribute('readonly');
            el.parentElement.parentElement.classList.remove("hidden");
        }
        else{
            el.setAttribute('readonly', '');
            el.parentElement.parentElement.classList.add("hidden");
        }
    });
}