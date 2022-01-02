let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const weekselect = document.getElementById("haftaSec");
const autselect = document.getElementById("yazarSec");
const basHTML=listem.innerHTML;

function oykuEkle(title, author, hafta, link,endeks){
    Kutuphanem.push(new Oyku(title, author, hafta, link,endeks));
    TabloYaz(Kutuphanem);
}

function TabloYaz(Tablo){
    listem.innerHTML=basHTML;
    for (let i = 0; i < Tablo.length; i++) {
        listem.appendChild(Tablo[i].tabloYaz(i));
    }    
}

class Oyku{
    constructor(title, author, hafta, link,endeks){
        this.title = title;
        this.author = author;
        this.hafta = hafta;
        this.link = link;
        this.indeks=endeks;
    }

    tabloYaz(endeks){
        let satir= document.createElement('tr');
        let baslik= document.createElement('td');
        let yazar= document.createElement('td');
        let linkKutusu= document.createElement('td');
        let hafta= document.createElement('td');
        // let puan= document.createElement('td');
        // let dugme= document.createElement('td');


        baslik.textContent=this.title;
        satir.appendChild(baslik);

        yazar.textContent=this.author;
        satir.appendChild(yazar);

        let link=document.createElement(`a`);
        link.textContent=`Link`;
        link.setAttribute(`href`,this.link);
        linkKutusu.appendChild(link);
        satir.appendChild(linkKutusu);

        hafta.textContent=this.hafta;
        satir.appendChild(hafta);
        
        satir.setAttribute(`data-endeks`,endeks);
        return satir;
    }

    get writer(){
        return this.author;
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
    uYazarList=[...new Set(yazarList)];

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
    // && oyku.author === autselect.value
    TabloYaz(altTablo);
}

function yazarSec(){
    let altTablo = Kutuphanem.filter(oyku => (weekselect.value==="tum" || oyku.hafta === `Hafta `+weekselect.value) && 
    (autselect.value==="tum" || oyku.author === autselect.value));
    // let altTablo = Kutuphanem.filter(oyku => oyku.author === autselect.value && oyku.hafta === `Hafta `+weekselect.value);
    // && oyku.hafta === `Hafta `+weekselect.value
    TabloYaz(altTablo);  
}

oykuEkle("Son","Esra Erman", "Hafta 1", "https://docs.google.com/document/d/15ZnUOmUxWqGS6AgBUY_fNczjMjNk2BvekFBlDK_Qn-4/edit", 0);
oykuEkle("Kaç Canım Kaldı", "Büşra Yücedağ", "Hafta 1", "https://docs.google.com/document/d/1f88pKc5t1-ph3CUsRt_GGCYFyU9JKxptPamxn-GadhI/edit", 1);
dropDownOlustur();