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
            type: str,
            buy: Math.floor(Math.random()* 1000),
        });
    }

    return result;
}

let dummyData = searchData();           //dummy data


function typeBuyCount(data){
    let result = [];
    data.forEach((value, index)=>{
        let tmp = result.map((v)=> v.type).indexOf(value.type);
        if(tmp === -1) result.push({type: value.type, count: value.buy});
        else{
            result[tmp].count += value.buy;
        }
        
    });
    return result;
}

// 그래프에 필요할 데이터
let graphData = typeBuyCount(dummyData).sort((b,a)=>(a.count-b.count));


const canvas = document.querySelector(".graph__chart");
const ctx = canvas.getContext('2d');

// 칸바스 사이즈
let canvasW = 960;
let canvasH = 500;


// 첫 번째 차트 w, h
let w1 = 480;
let h1 = 500;

let paddingTop = 100;

let lineW = w1 *0.84;      // x축 선의 길이
let offSetX1 = w1 * 0.08;  
let offSetY1 = 30;         // 그래프 박스 내부 축까지 여백
let yCount = 6;             // y 기준선 갯수

//yMax 데이터 최대값의 자리 수 만큼 값
// 데이터 최대값이 4000 이면 ymax = 10000이 됨
let yMax = Math.pow(10, graphData[0].count.toString().length);          
console.log(yMax);

// 막대 그래프 막대 갯수
let xCount = graphData.length;


let barBoxW = lineW * 0.9;              // 막대 그래프 내부 박스  10%는 여백
let barW = barBoxW / xCount * 0.6;     // 막대 w
let barH = 300;     // 막대 H
let barGap = barBoxW / xCount * 0.4;    // 막대 사이 간격

//barBoxW = barBoxW + barGap;
let barOffSetX1 = offSetX1+(lineW+barGap-barBoxW)/2;     // 첫번째 내부바까지 offset

// canvas y 좌표를 xy 좌표상으로 바꾼다.
function remakeY(y){
    return canvasH-y;
}

// 직사각형을 칸바스에 그린다.
function Rect(x, y, w, h, c=""){
    if(c){
        ctx.fillStyle = c;
    }
    ctx.fillRect(x, remakeY(y), w, (-1) * h);
}

// 선을 칸바스에 그린다.
function Line(x, y, endX, endY, c=""){
    if(c){
        ctx.strokeStyle = c;
    }
    ctx.beginPath();
    ctx.moveTo(x, remakeY(y));
    ctx.lineTo(endX, remakeY(endY) );
    ctx.stroke()
}

// 칸바스에 텍스트를 그린다.
function Text(x, y, text, c="yellow", size=11){

    ctx.fillStyle = c;
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, remakeY(y)); 
}


// 막대 그래프 박스
Rect(0, 0, w1, h1, "#191922");
Text(110, 420, "이번 달 각 항목 당 고객 구매 수 ", "white",18);

// y 축 선과 7축 값
for(let i=0; i<yCount; i++){
    let text = "";
    if(i === 0) text = "0";
    else{
        text = Math.floor(yMax / (yCount-1) * i).toString();
    }
    
    Line(offSetX1, offSetY1 + i * Math.floor((h1-paddingTop) / yCount), offSetX1 + lineW, offSetY1 + i * Math.floor((h1-paddingTop)/yCount), "#A2A2A2");
    Text(5, offSetY1+i * Math.floor((h1-paddingTop) / yCount), text, "yellow");
    
}

let yDistance = (yCount-1) * Math.floor((h1-paddingTop)/yCount)
// 막대, x축 항목
for(let i=0; i<xCount; i++){
    
    Rect(barOffSetX1 + i * (barW+barGap), offSetY1, barW, graphData[i].count/yMax*(yDistance) , "yellow");
    Text(barOffSetX1 + i * (barW+barGap) + 23, 10, graphData[i].type, "yellow");                // 항목
    
}

// 원형 그래프 width, height
let w2 = 480;
let h2 = 500;

Rect(w1, 0, w2, h2, "#yellow");

// 칸바스에 원을 그린다.
function Circle(x, y, radius, startAngle, endAngle, c="black"){
    ctx.beginPath();
    ctx.fillStyle = c;

    ctx.moveTo(x, remakeY(y));
    ctx.arc(x, remakeY(y), radius, startAngle, endAngle);

    ctx.fill();
}


let maxCount = 0;           // 원형 그래프 각 항목의 비율을 구하기 위해 최대 값을 구한다.
graphData.forEach((value)=>{
    maxCount += value.count;
})

// 원형 그래프 각 항목의 시작 각도
let sAngle = Math.PI * (-0.5);

let sTextAngle = 0;
let cicleColor = ['#191922', '#818181', '#c4c4c4']


Text(590, 420, "이번 달 각 항목 당 고객 구매 비율 ", "#191922",18);

for(let i=0; i<xCount; i++){

    let eAngle = sAngle+graphData[i].count / maxCount * 2 * Math.PI;
    Circle(w1+w2/2, h2/2-40, 160, sAngle, eAngle , cicleColor[i]);
    sAngle = eAngle;
}

