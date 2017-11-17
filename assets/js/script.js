var typeInputs = {
    'invoice': ['city', 'zip', 'count', 'value', 'total', 'extraFee', 'comment'],
    'letter': ['city', 'zip', 'extraFee', 'comment'],
    'package': ['parcelNumber', 'city', 'zip', 'count', 'weight', 'weightPrice']
}

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