function changePoem() {

    dikt = document.getElementById("dikt").innerHTML;
    dikt = dikt.toLowerCase();

    dikt = dikt.slice(0,1).toUpperCase() + dikt.slice(1,);

    
    console.log(dikt);
    
    let alteredDikt = ""
    
    for(let index = 0; index < dikt.lenght; index++) {
        if(dikt[index].include(",")) {
            console.log("wohoo")
            alteredDikt += `${dikt[index]}\n`
        } else
        console.log(dikt[index])
        alteredDikt += dikt [index]
        console.log(alteredDikt)
    }
    
    
    document.getElementById("dikt").innerHTML = alteredDikt;

}