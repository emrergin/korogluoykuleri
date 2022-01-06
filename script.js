let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const weekselect = document.getElementById("haftaSec");
const autselect = document.getElementById("yazarSec");
const basHTML=listem.innerHTML;
const oncekiDugme=document.getElementById(`onceki`);
const sonrakiDugme=document.getElementById(`sonraki`);
let renkArray=[];
let deg=1;


function oykuEkle(title, author, hafta, link){
    Kutuphanem.push(new Oyku(title, author, hafta, link));
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
        this.veriSatiri=this.tabloYaz();
        this.included=true;
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
        yazar.addEventListener('click', yazarSec);
        satir.appendChild(yazar);

        hafta.textContent=this.hafta;
        hafta.classList.add(`haftaKutusu`);
        hafta.addEventListener('click', haftaSec);
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

function TabloYaz(){
    TabloSil();
    let sayac=0;
    for (oyku of Kutuphanem.filter(oyku => (weekselect.value==="tum" || oyku.hafta === `Hafta `+weekselect.value) && 
    (autselect.value==="tum" || oyku.author === autselect.value))){
        oyku.veriSatiri.style.display= `table-row`;
        sayac++;
    }
    document.getElementById(`sayiMetin`).textContent=`Öykü Sayısı: `+sayac;
    onSon();

    function TabloSil(){
        for (oyku of Kutuphanem){
            oyku.veriSatiri.style.display=`none`;
        }
    }
}

function yazarSec(e){
    autselect.value=e.target.textContent;
    weekselect.value="tum";
    TabloYaz();
}

function haftaSec(e){
    weekselect.value=e.target.textContent.slice(6);
    autselect.value="tum";
    TabloYaz();
}

function rassalSec()
{
    let rassaloyku= Kutuphanem[Math.floor(Math.random()*Kutuphanem.length)];

    autselect.value=rassaloyku.author;
    weekselect.value=rassaloyku.hafta.slice(6);
    TabloYaz();
}

function hepsiSec(){
    weekselect.value=`tum`;
    autselect.value=`tum`;
    TabloYaz();
}

function siralamaDegistir(){
    Kutuphanem.sort(haftaSiraFonksiyonu);
    
    function haftaSiraFonksiyonu(a, b) {
        return (a.hafta.slice(6) - b.hafta.slice(6))*-deg;
    }    
    listem.innerHTML=basHTML;
    for (oyku of Kutuphanem){
        listem.appendChild(oyku.veriSatiri);
    }
    deg=-deg;
    if (deg===1){
        document.getElementById(`haftaBaslik`).textContent="Hafta ▼"
    }
    else{
        document.getElementById(`haftaBaslik`).textContent="Hafta ▲"
    }    
}

function onSon(){
    oncekiDugme.style.display=`none`;
    sonrakiDugme.style.display=`none`;
    if (weekselect.value!==`tum` && autselect.value===`tum`){
        oncekiDugme.textContent=`Önceki Hafta`;
        sonrakiDugme.textContent=`Sonraki Hafta`;
        if (weekselect.value!==uHaftaList[0]){oncekiDugme.style.display=`block`;}
        if (weekselect.value!==uHaftaList[uHaftaList.length-1]){sonrakiDugme.style.display=`block`;}
    }
    if (autselect.value!==`tum` && weekselect.value===`tum`){
        oncekiDugme.textContent=`Önceki Yazar`;
        sonrakiDugme.textContent=`Sonraki Yazar`;
        if (autselect.value!==uYazarList[0]){oncekiDugme.style.display=`block`;}
        if (autselect.value!=uYazarList[uYazarList.length-1]){sonrakiDugme.style.display=`block`;}
    }
}

function Artir(){
    if (weekselect.value===`tum`){
        autselect.selectedIndex++;
    }
    else{
        weekselect.selectedIndex++;
    }
    TabloYaz();
}

function Eksilt(){
    if (weekselect.value===`tum`){
        autselect.selectedIndex--;
    }
    else{
        weekselect.selectedIndex--;
    }
    TabloYaz();
}

for (let i = 0; i < oykulerinTamami.length; i++) {
    oykuEkle(oykulerinTamami[i][2],oykulerinTamami[i][1],oykulerinTamami[i][0],oykulerinTamami[i][3]);
}


for (oyku of Kutuphanem){
    listem.appendChild(oyku.veriSatiri);
}
document.getElementById(`sayiMetin`).textContent=`Öykü Sayısı: `+Kutuphanem.length;
onSon();
dropDownOlustur();