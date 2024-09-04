function bankAccount(){
    let valueField

    valueField = document.getElementById("bank").value;
    valueField = parseInt(valueField);

    if(valueField > 0) {
        document.getElementById("feedback").classList.add("good");
        document.getElementById("feedback").classList.remove("bad");
        document.getElementById("feedback").innerHTML = `${valueField} kr inn på din konto`
    } else if(valueField < 0) {
        document.getElementById("feedback").classList.add("bad")
        document.getElementById("feedback").classList.remove("good")
        document.getElementById("feedback").innerHTML = `Du mistet ${valueField} kr fra din konto`
    } else {
        document.getElementById("feedback").innerHTML = `Du må taste inn et tall`
    }
}