function regnUtTips() {
    let pris;
    let tips;

    pris = document.getElementById('pris').value;
    tips = parseInt(document.getElementById('tips').value);

    tips = parseInt(tips);
    pris = parseInt(pris);
    let totalTips = pris * (tips/100);

    let totalSum = pris + totalTips;
    console.log(totalTips, totalSum, tips);

    document.getElementById("totalTips").innerHTML = `Du skal betale ${totalTips} kr i tips`
    document.getElementById("totalSum").innerHTML = `Totalprisen blir ${totalSum} kr`

    document.getElementById("totalTips").style.color ="red"
}