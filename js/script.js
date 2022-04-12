const cityList = window.cityList;

// upon page load
addEventListener("DOMContentLoaded", function () {
    let provInput = document.querySelector("#form-prov");
    reListCities(provInput.value); //list cities for default province (ontario)

    let optInputDiv = document.querySelector('#options-list');
    let rateInput = document.querySelector('#hourly-rate');
    
    //upon change of province
    provInput.addEventListener("change", function() {
        reListCities(this.value); //change city list to match the selected province
    });
    
    //upon change of radio button options
    optInputDiv.addEventListener("change", function() {
        radioSelect();
    });

    //upon entering of hourly rate
    rateInput.addEventListener("change", function(){
        //change to two decimal places
        let amt = this.value;
        this.value = parseFloat(amt).toFixed(2);
    });
});

function reListCities(prov) {
    let citySelect = document.querySelector("#form-city");
        
    //Filter cities to only display cities for province selected
    const results = cityList.filter(function (data) {
        return data.prov === prov;
    });

    //re-populate list of cities available for the selected province
    citySelect.innerHTML = ""; //delete current city list
    results.forEach(function (data) {
        let option = document.createElement("option");
        option.value = data.city;
        citySelect.appendChild(option);
    });
}

function radioSelect() {
    let rateInput = document.querySelector("#hourly-rate");
    rateInput.style = "display: none";
    rateInput.value = ""; //clear existing value
    let optInput = document.querySelectorAll('input[name="option"]');
    for (const selection of optInput) {
        if (selection.checked && selection.value === "hiring") {
            rateInput.style = "display:block";
            return;
        }
    }
}