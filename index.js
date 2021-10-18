let nationToIva;
let totalDiscount = 0;

async function loadJSON(){
    let string = "";
    $("#countryIva").html("");

    for(let nation in nationToIva){
        string += `<option value="${nationToIva[nation]}"> ${nation} </option>`;
    }

    $("#countryIva").html(string);
} 

$().ready(async function() {
    await $.getJSON("nationIva.json", function(json) {
        nationToIva = json;
    });
    loadJSON();
})

function applyIVA(price, nationIva){
    return price * nationIva;
}


const formIva = document.getElementById("formIva");
formIva.addEventListener("submit", (event) => {
    event.preventDefault();
    const number = $("#numberProduct").val();
    const price = $("#unitPrice").val();
    const nationIva = $("#countryIva").val();

    let finalPrice = applyIVA(price, nationIva) * number;

    //applicazione sconto
    let discount = 0;

    if(finalPrice < 1000) discount = 0.03
    else if (finalPrice >= 1000 && finalPrice < 5000) discount = 0.05
    else if (finalPrice >= 5000 && finalPrice < 7000) discount = 0.07
    else if (finalPrice >= 7000 && finalPrice < 1000) discount = 0.10
    else if (finalPrice >= 10000) discount = 0.15

    finalPrice = parseFloat(finalPrice * (1-discount)).toFixed(2);
    totalDiscount+=discount*finalPrice;

    if(discount > 0){
        let string = `<p>Hai ottenuto uno sconto pari al ${parseFloat(discount*100).toFixed(2)}% ed abbiamo applicato un IVA pari al ${nationIva*100 - 100}%</p><br/>
                        <p>Sconto ottenuto pari ad ${parseFloat(discount*finalPrice).toFixed(2)}€</p>`;
        $("#explaination").html(string);
    }
    $("#result").html(`Final price: ${finalPrice}€`);
    $("#tally").append(`<li>Unita comprate: ${number}. Prezzo unita: ${price}. IVA: ${parseFloat(nationIva*100-100).toFixed(2)}%. Prezzo totale: ${finalPrice}€</li>`);
    $("#totalDiscount").html(`${totalDiscount} €`);
})


const formAddNation = document.getElementById("addNation");
formAddNation.addEventListener("submit", async (event) => {
    event.preventDefault();
    const ivaVal = $("#ivaVal").val();
    const countryT = $("#countryT").val();
    nationToIva[countryT] = ivaVal;
    loadJSON();
})