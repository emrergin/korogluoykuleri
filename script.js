let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const weekselect = document.getElementById("haftaSec");
const autselect = document.getElementById("yazarSec");
const basHTML=listem.innerHTML;
let renkArray=[];
let deg=1;


function oykuEkle(title, author, hafta, link){
    Kutuphanem.push(new Oyku(title, author, hafta, link));
}

function TabloYaz(Tablo){
    listem.innerHTML=basHTML;
    for (let i = 0; i < Tablo.length; i++) {
        listem.appendChild(Tablo[i].tabloYaz(i));
    }
    document.getElementById(`sayiMetin`).textContent=`Öykü Sayısı: `+Tablo.length;

    document.querySelectorAll(`.yazarKutusu`).forEach((yazar) => {
        yazar.addEventListener('click', yazarSec2);
    });
    document.querySelectorAll(`.haftaKutusu`).forEach((haff) => {
        haff.addEventListener('click', haftaSec2);
    });
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

class Oyku{
    constructor(title, author, hafta, link){
        this.title = title;
        this.author = author;
        this.hafta = hafta;
        this.link = link;
        if (renkArray[this.hafta.slice(6)]===undefined){
            renkArray[this.hafta.slice(6)]=`rgb(${randomBetween(220,255)},${randomBetween(220,255)},${randomBetween(220,255)})`;
        }
        this.renk=renkArray[this.hafta.slice(6)];
    }

    tabloYaz(){
        let satir= document.createElement('tr');
        let baslik= document.createElement('td');
        let yazar= document.createElement('td');
        let hafta= document.createElement('td');

        let link=document.createElement(`a`);
        link.textContent=this.title;
        link.setAttribute(`href`,this.link);
        link.setAttribute(`target`,`_blank`);
        baslik.appendChild(link);
        satir.appendChild(baslik);

        yazar.textContent=this.author;
        yazar.classList.add(`yazarKutusu`);
        satir.appendChild(yazar);

        hafta.textContent=this.hafta;
        hafta.classList.add(`haftaKutusu`);
        satir.appendChild(hafta);
        
        satir.style.backgroundColor = this.renk;
        return satir;
    }
}





function dropDownOlustur(){
    haftaList=[];
    yazarList=[];
    for (let i = 0; i < Kutuphanem.length; i++) {
        haftaList.push(Kutuphanem[i].hafta.slice(6));
        yazarList.push(Kutuphanem[i].author);
    }

    uHaftaList=[...new Set(haftaList)];
    uYazarList=[...new Set(yazarList)].sort(function (a, b) {
            return a.localeCompare(b);
          });

    for (let i = 0; i < uHaftaList.length; i++) {
        let hel= document.createElement("option");
        hel.textContent=uHaftaList[i];
        hel.value=uHaftaList[i];
        weekselect.appendChild(hel);
    }

    for (let i = 0; i < uYazarList.length; i++) {
        let yel= document.createElement("option");
        yel.textContent=uYazarList[i];
        yel.value=uYazarList[i];
        autselect.appendChild(yel);
    }
    return {uHaftaList,uYazarList};
}

function haftaSec(){
    let altTablo = Kutuphanem.filter(oyku => (weekselect.value==="tum" || oyku.hafta === `Hafta `+weekselect.value) && 
    (autselect.value==="tum" || oyku.author === autselect.value));
    TabloYaz(altTablo);
}

function yazarSec(){
    let altTablo = Kutuphanem.filter(oyku => (weekselect.value==="tum" || oyku.hafta === `Hafta `+weekselect.value) && 
    (autselect.value==="tum" || oyku.author === autselect.value));
    TabloYaz(altTablo);  
}

function yazarSec2(e){
    autselect.value=e.target.textContent;
    weekselect.value="tum";
    yazarSec();
}

function haftaSec2(e){
    weekselect.value=e.target.textContent.slice(6);
    autselect.value="tum";
    haftaSec();
}

function rassalSec()
{
    let altTablo=[];
    let rassaloyku= Kutuphanem[Math.floor(Math.random()*Kutuphanem.length)];

    altTablo.push(rassaloyku);
    autselect.value=rassaloyku.author;
    weekselect.value=rassaloyku.hafta.slice(6);
    TabloYaz(altTablo);  
}

function hepsiSec(){
    weekselect.value=`tum`;
    autselect.value=`tum`;
    TabloYaz(Kutuphanem);
}


function siralamaDegistir(){
    Kutuphanem.sort(haftaSiraFonksiyonu);
    
    function haftaSiraFonksiyonu(a, b) {
        return (a.hafta.slice(6) - b.hafta.slice(6))*-deg;
    }
    haftaSec();
    deg=-deg;
    if (deg===1){
        document.getElementById(`haftaBaslik`).textContent="Hafta ▼"
    }
    else{
        document.getElementById(`haftaBaslik`).textContent="Hafta ▲"
    }    
}


for (let i = 0; i < oykulerinTamami.length; i++) {
    oykuEkle(oykulerinTamami[i][2],oykulerinTamami[i][1],oykulerinTamami[i][0],oykulerinTamami[i][3]);
}

TabloYaz(Kutuphanem);
dropDownOlustur();