const innerLayout = document.querySelector('.inner__layout');

const messageInput = document.querySelector('.message__input');
const messageBtn = document.querySelector('.message__btn');

const slider = document.querySelector('.slider');
const sliderCircle = document.querySelectorAll('.slider__circle');

let messageInputDisplay = "none";
let message = "";

messageBtn.onclick = () => {
    if(messageInputDisplay === "none"){
        messageInput.style.display = "block";
        messageInputDisplay = "block";
        messageBtn.textContent = "메세지 저장";
        messageInput.value = message;
        console.log(message);
    }else{
        messageInput.style.display = "none";
        messageInputDisplay = "none";
        messageBtn.textContent = "메세지 카드 쓰기";
        message = messageInput.value;

    }
}

let sliderX = 0;        // 마우스 x 좌표
let type = 0;           // 화면 타입

// 마우스 눌렀을 때, x 좌표 저장
slider.onmousedown = (e) => {
    e = e || window.event;
    e.preventDefault();

    sliderX = e.clientX;
}

let background = ["#dddddd", "#3b3232", "#d3f37c"];

// 마우스 뗐을 때, x 이동한 만큼 화면 슬라이더
slider.onmouseup = (e) => {
    e = e || window.event;
    e.preventDefault();

    // 왼쪽화면 오른쪽
    if(e.clientX - sliderX > 30 && type !== 0){
        type -= 1;
        sliderCircle[type+1].classList.remove('selected__slider__circle')
        sliderCircle[type].classList.add('selected__slider__circle');
        innerLayout.style.background = background[type];
        // 오른쪽 화면 왼쪽
    }else if(e.clientX - sliderX < -30 && type !== 2){
        type += 1;
        sliderCircle[type-1].classList.remove('selected__slider__circle')
        sliderCircle[type].classList.add('selected__slider__circle');
        innerLayout.style.background = background[type];
    }

    sliderX = 0;
}






