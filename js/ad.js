"use strict";

// 더미 데이터
const categoryData = [
    {
        imgSrc:"img/extra.png",
        text:"한 번더 테스트 111 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill0.png",
        text:"한 번더 테스트 112 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill1.png",
        text:"한 번더 테스트 113 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill2.png",
        text:"한 번더 테스트 114 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill3.png",
        text:"한 번더 테스트 115 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill4.png",
        text:"한 번더 테스트 116 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill5.png",
        text:"한 번더 테스트 117 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill6.png",
        text:"한 번더 테스트 118 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill7.png",
        text:"한 번더 테스트 119 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill8.png",
        text:"한 번더 테스트 120 콘",
        linkSrc:"www.daum.net",
    },
    {
        imgSrc:"img/skill9.png",
        text:"한 번더 테스트 121 콘",
        linkSrc:"www.daum.net",
    },
    
    
];


let categoryCount = 0;              // 광고 리스트 페이징
const adbarMaxItem = 5;             // 광고 리스트에 보여지는 아이템 갯수

const adbarList = document.querySelector('.adbar__list');

// 광고 리스트 랜더
function createAdbarListItem(){
    if(!adbarList) return;
    // 버튼 클릭시, 자식 개체 초기화
    while(adbarList.hasChildNodes()) adbarList.removeChild(adbarList.firstChild);

    for(let i = adbarMaxItem * categoryCount; i < adbarMaxItem * (categoryCount + 1); i++){
        if(!categoryData[i]) break;                                     // 해당 페이징에 더미 데이터가 없을 시, 루프 빠져나옴
        const adbarListItem = document.createElement("section");
        adbarListItem.setAttribute("class", "adbar__list__item");

        const adbarListItemImg = document.createElement('img');
        adbarListItemImg.src= categoryData[i].imgSrc;
    
    
        const adbarListItemTxt = document.createElement('p');
        adbarListItemTxt.textContent = categoryData[i].text;
        adbarListItem.appendChild(adbarListItemImg);
        adbarListItem.appendChild(adbarListItemTxt);
        adbarList.appendChild(adbarListItem);
    }

}
createAdbarListItem();


const adbarHeaderLeftBtn = document.querySelector('.adbar__header__left__btn');
const adbarHeaderRightBtn = document.querySelector('.adbar__header__right__btn');
const adbarListNumber= document.querySelector('.adbar__list_number');

// 왼쪽 페이징 기능
adbarHeaderLeftBtn.onclick = () => {
    if(categoryCount !== 0) categoryCount -= 1;
    adbarListNumber.textContent = categoryCount + 1;

    createAdbarListItem();
}

// 오른쪽 페이징 기능
adbarHeaderRightBtn.onclick = () => {
    if(categoryCount !== Math.floor(categoryData.length / adbarMaxItem) ) categoryCount += 1;
    adbarListNumber.textContent = categoryCount + 1;

    createAdbarListItem();
}
