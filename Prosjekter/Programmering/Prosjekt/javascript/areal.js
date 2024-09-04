function regnUtAreal() {
    let lengde;
    let bredde;

    lengde = document.getElementById('lengde').value;
    bredde = document.getElementById('bredde').value;

    parseInt(lengde)
    parseInt(bredde)

    let areal = lengde * bredde;
    console.log(areal);

    document.getElementById("areal").innerHTML = `${areal} &#13216;`
    document.getElementById("areal").style.color ="white"

    document.getElementById("box").style.width = `${bredde}px`
    document.getElementById("box").style.height = `${lengde}px`
    document.getElementById("box").style.backgroundColor = "blue"

    document.getElementById("box").classList.add("arealBox");
}