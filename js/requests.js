const privateKey = "06197e8205faddcaa667aec214b74e157e7d6f16";
const publicKey = "e6dc75d60924602e6ef1e7129df02c66";
const maxCharacters = 1500;




function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5 (toBeHashed);
    return hashedMessage;

}

function getCharacterList() {

    //tempo agora
    const timeStamp = Date.now().toString();
    //numero randomico de herois
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    //hash para validar a requisição
    const hash = createHash(timeStamp);

    
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;

    // sla mas funcionou
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            getImages(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();
}


function showHistorys(elemento) {

    const codigo = elemento.parentNode.getElementsByTagName("h5")[1].textContent.substring(4, 11);//codigo do personagem
    console.log(codigo);
    const timeStamp = Date.now().toString();//tempo agora
    const hash = createHash(timeStamp);//hash para validar a requisição

    const urlAPI = "https://gateway.marvel.com:443/v1/public/characters/"+codigo+"/stories?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
    console.log(urlAPI);
    
    // sla mas funcionou
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            getHistorys(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();

}
