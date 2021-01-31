// id input
const id = document.getElementById('id');
let idVal = "";             // id 입력 내용 txt

// id input value 변경 시
id.onchange = (e) => {
    idVal = e.target.value;
};

// comment txt
const commentTxt = document.querySelector('.comment__input');
let commentTxtVal = "";             // 코멘트 내용 txt

// comment 내용 변경 시
commentTxt.onchange = (e) => {
    commentTxtVal = e.target.value;
}


const commentCreate = document.querySelector('.comment__create');   // 코멘트 등록 버튼
const commentList = document.querySelector('.comment__list');       // 코멘트 리스트

// 코멘트 리스트 데이터
let commentDataList = [];

commentCreate.onclick = (e) =>{

    // 코멘트 입력할 당시 날짜
    const _date = new Date();
    _dateTxt =  `${_date.getFullYear()}. ${_date.getMonth()+1}. ${_date.getDate()}. ${_date.getHours()}:${_date.getMinutes()}`;
    commentDataList.push({id: idVal, date: _dateTxt, comment:commentTxtVal}); 

    commentListRender();

    // comment input value 초기화
    idVal= "";
    commentTxtVal = "";
    id.value = idVal;
    commentTxt.value = commentTxtVal;
    
}

// 사용자가 수정 버튼 클릭 시, 수정 ui 보여줌
function modifyCommentRender(value){
    while(commentList.hasChildNodes()) commentList.removeChild(commentList.firstChild);

    let modifyTxt = "";
    for(let i=0; i < commentDataList.length; i++){
        
        const commentBox = document.createElement("section");
        commentBox.setAttribute("class", "comment__box");

        const idTxt = document.createElement("h4");
        idTxt.setAttribute("class", "id__txt");
        idTxt.textContent = commentDataList[i].id;


        const dateTxt = document.createElement("p");
        dateTxt.setAttribute("class", "date__txt");
        dateTxt.textContent = commentDataList[i].date;

        const modifyCompleteBtn = document.createElement("button");
        modifyCompleteBtn.textContent = "수정완료";
        modifyCompleteBtn.onclick = () => {
            commentDataList[i].comment = modifyTxt;
            commentListRender();
        }

        let commentTxt = null;
        if(i === value){
            commentTxt = document.createElement('textarea');;
            commentTxt.setAttribute("class", "comment__input");
            commentTxt.textContent = commentDataList[i].comment;
            commentTxt.onchange = (e) => {
                modifyTxt = e.target.value;
            }
        }else{
            commentTxt = document.createElement("p");
            commentTxt.setAttribute("class", "comment__txt");
            commentTxt.textContent = commentDataList[i].comment;
        }
        

        commentBox.appendChild(idTxt);
        commentBox.appendChild(dateTxt);
        
        commentBox.appendChild(commentTxt);
        commentBox.appendChild(modifyCompleteBtn);
        commentList.appendChild(commentBox);
    }
}

// 댓글 리스트 render
function commentListRender(){
    while(commentList.hasChildNodes()) commentList.removeChild(commentList.firstChild);

    for(let i=0; i < commentDataList.length; i++){
        const commentBox = document.createElement("section");
        commentBox.setAttribute("class", "comment__box");

        // 유저 id
        const idTxt = document.createElement("h4");
        idTxt.setAttribute("class", "id__txt");
        idTxt.textContent = commentDataList[i].id;

        // 댓글 입력 날짜
        const dateTxt = document.createElement("p");
        dateTxt.setAttribute("class", "date__txt");

        
        dateTxt.textContent = commentDataList[i].date;

        // 댓글 수정버튼
        const modifyBtn = document.createElement("button");
        modifyBtn.textContent = "수정하기";
        modifyBtn.onclick = () => {
            modifyCommentRender(i);
        }

        // 댓글 삭제버튼
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제하기";
        deleteBtn.onclick = () => {
            commentDataList = commentDataList.filter((_, index)=> index !== i);
            commentListRender();
        }

        // 댓글 내용
        const commentTxt = document.createElement("p");
        commentTxt.setAttribute("class", "comment__txt");
        commentTxt.textContent = commentDataList[i].comment;

        commentBox.appendChild(idTxt);
        commentBox.appendChild(dateTxt);
        
        commentBox.appendChild(commentTxt);
        commentBox.appendChild(modifyBtn);
        commentBox.appendChild(deleteBtn);
        commentList.appendChild(commentBox);
    }
    
}

