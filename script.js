let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const weekselect = document.getElementById("haftaSec");
const autselect = document.getElementById("yazarSec");
const basHTML=listem.innerHTML;
const oncekiDugme=document.getElementById(`onceki`);
const sonrakiDugme=document.getElementById(`sonraki`);
const cekboks=document.getElementById("eskiOykuler");
const cekboksCont=document.getElementById(`eskiOykuContainer`);

  
// let renkArray=[];
let deg=-1;

function oykuEkle(title, author, hafta, link,eskiMi){
    Kutuphanem.push(new Oyku(title, author, hafta, link,eskiMi));
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

class Oyku{
    constructor(title, author, hafta, link,eskiMi){
        this.title = title;
        this.author = author;
        this.hafta = hafta;
        this.link = link;
        this.eskiMi=eskiMi;
        // if (renkArray[this.hafta.slice(6)]===undefined){
        //     renkArray[this.hafta.slice(6)]=`rgb(${randomBetween(220,255)},${randomBetween(220,255)},${randomBetween(220,255)})`;
        // }
        // this.renk=renkArray[this.hafta.slice(6)];
        this.veriSatiri=this.tabloYaz();
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
        
        // satir.style.backgroundColor = this.renk;
        return satir;
    }
}

function dropDownOlustur(){
    removeOptions(weekselect);
    removeOptions(autselect);
    haftaList=[];
    yazarList=[];

    for (oyku of Kutuphanem){
        haftaList.push(oyku.hafta.slice(6));
        if (cekboks.checked){
            yazarList.push(oyku.author);
        }
        else if(!oyku.eskiMi){
            yazarList.push(oyku.author);
        }
    }

    uHaftaList=[...new Set(haftaList)].sort(function(a, b) {
        return a - b;
      });
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

    // =======

    function removeOptions(selectElement) {
        var i, L = selectElement.options.length - 1;
        for(i = L; i > 0; i--) {
           selectElement.remove(i);
        }
    }
}

function TabloYaz(secilenOyku){
    
    TabloSil();
    let sayac=0;
    document.getElementById(`sayiMetin`).textContent=``;

    if (secilenOyku===undefined){
        for (oyku of Kutuphanem.filter(oyku => (weekselect.value==="tum" || oyku.hafta === `Hafta `+weekselect.value) && 
        (autselect.value==="tum" || oyku.author === autselect.value) && (cekboks.checked || !oyku.eskiMi))){
            oyku.veriSatiri.style.display= `table-row`;
            sayac++;
        }
    }
    if (secilenOyku!==undefined){
        secilenOyku.veriSatiri.style.display= `table-row`;
        sayac=1;
    }
    
    if (weekselect.value!=="tum"){
        if (!cekboks.checked){
            document.getElementById(`sayiMetin`).textContent=`Yazıldığı tarih: `+Tarihler2021[uHaftaList.length-weekselect.value]+`. `;
        }
        else{
            if (weekselect.value<=18){
                document.getElementById(`sayiMetin`).textContent=`Yazıldığı tarih: `+Tarihler2015[Tarihler2015.length-weekselect.value]+`. `; 
            }
            else{
                document.getElementById(`sayiMetin`).textContent=`Yazıldığı tarih: `+Tarihler2021[Tarihler2021.length-weekselect.value+18]+`. `;
            }
        }
    }
    document.getElementById(`sayiMetin`).textContent+=`Öykü Sayısı: `+sayac;

    onSon();
    TabloBoya();

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
    let rassaloyku={};
    if (cekboks.checked){
        rassaloyku= Kutuphanem[Math.floor(Math.random()*Kutuphanem.length)];
    }
    else if (deg===-1){
        rassaloyku= Kutuphanem[Math.floor(Math.random()*yeniOykulerinSayisi)];
    }
    else{
        rassaloyku= Kutuphanem[Math.floor(Math.random()*yeniOykulerinSayisi)+EskiOykuler.length];
    }

    autselect.value=rassaloyku.author;
    weekselect.value=rassaloyku.hafta.slice(6);
    TabloYaz(rassaloyku);
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
    oykuleriTabloyaEkle();

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
    cekboksCont.style.display="none";
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
    if (weekselect.value===`tum` && autselect.value===`tum`){
        cekboksCont.style.display="block";
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

function eskileriEkleCikar(val){
    if (val){
        for (oyku of Kutuphanem){
            if (!oyku.eskiMi){
                oyku.hafta=`Hafta ${parseInt(oyku.hafta.slice(6))+18}`;
                oyku.veriSatiri.children[2].textContent=oyku.hafta;
            }
        }
    }
    else{
        for (oyku of Kutuphanem){
            if (!oyku.eskiMi){
                oyku.hafta=`Hafta ${parseInt(oyku.hafta.slice(6))-18}`;
                oyku.veriSatiri.children[2].textContent=oyku.hafta;
            }
        }
    }
    dropDownOlustur();
    siralamaDegistir();
    siralamaDegistir();
    TabloYaz();
}

function oykuleriTabloyaEkle(){
    for (oyku of Kutuphanem){
        if (oyku.eskiMi && !cekboks.checked){
            oyku.veriSatiri.style.display=`none`;
        }
        listem.appendChild(oyku.veriSatiri);
    }
    TabloBoya();
}

function TabloBoya(){
    let renkIndis=0;
    // const renkMatrisi=[`#ebf1f9`,`#d7d6ef`,`#c3d7ec`];

    const satirlar= document.querySelectorAll(`tr`);
    var myArray = [].slice.call(satirlar);
    var elementsOnShow = myArray.filter(isVisible);
    // console.log(elementsOnShow);
    
    function isVisible(element) {
        return element.style.display!==`none`;
    }

    for (let i = 0; i < elementsOnShow.length; i++) {
        // console.log(elementsOnShow[i]);
        i%2===0 ?  elementsOnShow[i].classList.add(`cift`) : elementsOnShow[i].classList.add(`tek`);
        if (i==0){
            // elementsOnShow[i].style.backgroundColor=renkMatrisi[renkIndis%3];
            elementsOnShow[i].classList.add(`renk${renkIndis}`);
            elementsOnShow[i].renk=`renk${renkIndis}`;
        }
        else if (elementsOnShow[i-1].children[2].textContent === elementsOnShow[i].children[2].textContent){
            elementsOnShow[i].classList.add(elementsOnShow[i-1].renk);
            elementsOnShow[i].renk=(elementsOnShow[i-1].renk);
        }
        else{
            renkIndis++;
            elementsOnShow[i].classList.add(`renk${renkIndis%3+1}`);
            elementsOnShow[i].renk=`renk${renkIndis%3+1}`;
        }
    }
}
// Baslangic=======
let yeniOykulerinSayisi=YeniOykuler.length;

YeniOykuler.map(a=>oykuEkle(a[2],a[1],a[0],a[3],false));

document.getElementById(`sayiMetin`).textContent=`Öykü Sayısı: `+yeniOykulerinSayisi;

const tarihsizHaftaSayisi=[...new Set(Kutuphanem.map(item => item.hafta))].length-Tarihler2021.length;
for (let i = 0; i < tarihsizHaftaSayisi; i++){
    let geciciTarih=new Date(Tarihler2021[0].split(`.`).reverse())  ;
    geciciTarih.setDate(geciciTarih.getDate() + 7);
    let g2=geciciTarih.toLocaleDateString('tr-TR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    Tarihler2021.unshift(g2);
}

EskiOykuler.map(a=>oykuEkle(a[2],a[1],a[0],a[3],true));

oykuleriTabloyaEkle();
onSon();
dropDownOlustur();        
        
