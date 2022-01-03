let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const weekselect = document.getElementById("haftaSec");
const autselect = document.getElementById("yazarSec");
const basHTML=listem.innerHTML;


function oykuEkle(title, author, hafta, link){
    Kutuphanem.push(new Oyku(title, author, hafta, link));
}

function TabloYaz(Tablo){
    listem.innerHTML=basHTML;
    for (let i = 0; i < Tablo.length; i++) {
        listem.appendChild(Tablo[i].tabloYaz(i));
    }
    document.getElementById(`sayiMetin`).textContent=`Öykü Sayısı: `+Tablo.length;
}

class Oyku{
    constructor(title, author, hafta, link){
        this.title = title;
        this.author = author;
        this.hafta = hafta;
        this.link = link;
    }

    tabloYaz(){
        let satir= document.createElement('tr');
        let baslik= document.createElement('td');
        let yazar= document.createElement('td');
        let hafta= document.createElement('td');

        let link=document.createElement(`a`);
        link.textContent=this.title;
        link.setAttribute(`href`,this.link);
        baslik.appendChild(link);
        satir.appendChild(baslik);

        yazar.textContent=this.author;
        satir.appendChild(yazar);

        hafta.textContent=this.hafta;
        satir.appendChild(hafta);
        
        if (this.hafta.slice(6)%2===0){
            satir.classList.add(`ciftler`);
        }
        return satir;
    }
}

for (let i = 0; i < oykulerinTamami.length; i++) {
    oykuEkle(oykulerinTamami[i][2],oykulerinTamami[i][1],oykulerinTamami[i][0],oykulerinTamami[i][3]);
}
TabloYaz(Kutuphanem);

function dropDownOlustur(){
    haftaList=[];
    yazarList=[];
    for (let i = 0; i < Kutuphanem.length; i++) {
        haftaList.push(Kutuphanem[i].hafta.slice(6));
        yazarList.push(Kutuphanem[i].author);
    }

    uHaftaList=[...new Set(haftaList)];
    uYazarList=[...new Set(yazarList)].sort();

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

dropDownOlustur();