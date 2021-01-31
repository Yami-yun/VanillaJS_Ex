"use strict";

// search dumy data
const searchData = () =>{
    let result = [];

    for(let i=0; i<30; i++){
        let dataType = Math.floor(Math.random()* 3);
        let str = "";
        if(dataType === 0) str = "아우터";
        else if(dataType === 1) str = "상의";
        else str = "팬츠";
        result.push({
            title: `이것은 ${str}_${i}`,
            price: `${(i+1) * 2000} 원`,
            src: `img/skill${i%10}.png`,
            type: dataType,
            buy: Math.floor(Math.random()* 10000),
        });
    }

    return result;
}

let dummyData = searchData();           //dummy data

let type = 0;       // nav type value

// nav type 변경 함수
function typeChange(_type){    
    type = _type;
}

// nav
let navBest = document.querySelector(".nav__best");
let navOuter = document.querySelector(".nav__outer");
let navTop = document.querySelector(".nav__top");
let navPant = document.querySelector(".nav__pant");


navBest.onclick = () =>{
    typeChange(3);
    topTenRender();
}

navOuter.onclick = () =>{
    typeChange(0);
    render();
}

navTop.onclick = () =>{
    typeChange(1);
    render();
}

navPant.onclick = () =>{
    typeChange(2);
    render();
}

// 상품 아이템 리스트
let itemList = document.querySelector("#item__list");
let itemListBox = null;

// search
let searchText = "";
let headerSearch = document.querySelector(".header__search input")

// search 입력 변화
headerSearch.onchange = (e) => {
    searchText = e.target.value;
    console.log(searchText);
}

let headerSearchBtn = document.querySelector(".header__search button");

// search 검색
headerSearchBtn.onclick = () => {
    console.log(searchText);
    searchItemListRender(searchText);
};

// 상품 리스트 요소 생성
function createItemList(value){
    console.log(value.src);
    itemListBox = document.createElement("div");
    itemListBox.setAttribute('class', 'item__list__box');

    // item img
    const itemImg = document.createElement("img");
    itemImg.src = value.src;

    // item title
    const itemTitle = document.createElement("p");
    itemTitle.setAttribute('class','item__title');
    itemTitle.textContent = value.title;
    
    const itemPrice = document.createElement("p");
    itemPrice.setAttribute('class','item__price');
    itemPrice.textContent = value.price;
    itemListBox.appendChild(itemImg);
    itemListBox.appendChild(itemTitle);
    itemListBox.appendChild(itemPrice);
    itemList.appendChild(itemListBox);
}

// search 한 내용으로 아이템 리스트 랜더
function searchItemListRender(_text){
    while(itemList.hasChildNodes()) itemList.removeChild(itemList.firstChild);

    
    dummyData.forEach((value, index)=>{
        if(value.title.indexOf(_text) !== -1){
            
            createItemList(value);
        }
    });
}

// top 10 list 랜더
function topTenRender(){
    while(itemList.hasChildNodes()) itemList.removeChild(itemList.firstChild);

    if(type !== 3) return ;
    
    // buy count에 따라 내림차순
    dummyData.sort((a,b)=> b.buy-a.buy);

    for(let i=0; i < dummyData.length; i++){
        if(i === 10) break;
        createItemList(dummyData[i]);
    }
}

// 상품 리스트 랜더
function itemListRender(){
    while(itemList.hasChildNodes()) itemList.removeChild(itemList.firstChild);

    // 아우터 ,상의, 팬츠 타입에 맞는 리스트 랜더함
    dummyData.forEach((value, index)=>{
        if(value.type === type ) createItemList(value);
    });
}

function render(){
    itemListRender();
    
}

render();