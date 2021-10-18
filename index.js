

$().ready(async function() {
    
    let nationToIva;
    await $.getJSON("nationIva.json", function(json) {
        nationToIva = json;
    });

    let string = "";

    for(let nation in nationToIva){
        string += `<option value="${nationToIva[nation]}"> ${nation} </option>`;
    }

    $("#countryIva").html(string);
})

function applyIVA(price, nationIva){
    return price * nationIva;
}


const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const number = $("#numberProduct").val();
    const price = $("#unitPrice").val();
    const nationIva = $("#countryIva").val();

    const finalPrice = applyIVA(price, nationIva) * number;

    $("#result").html(finalPrice);
})