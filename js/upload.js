

const inputTitle = document.querySelector('.input__title');

let titleTxt = "";

// 상품 타이틀 입력
inputTitle.onchange = (e) => {
    titleTxt = e.target.value;
}

const photoInput = document.querySelector('.photo');
const imgList = document.querySelector('.img__list');
let imgTxtList = [];

// 상품 사진 업로드
photoInput.onchange = (e) => {
    file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        const img = document.createElement("img");
        img.src=reader.result;
        img.setAttribute("class", "img");
        imgList.appendChild(img);
        imgTxtList.push(reader.result);
        
    }
}


const detail = document.querySelector('.detail');
let detailTxt = "";

// 상세설명 입력
detail.onchange = (e) => {
    detailTxt = e.target.value;
}

document.getElementById('btn').onclick = function(){
    document.getElementById("img__form").onsubmit();
};




