let num = 0; //슬라이드 번호 전역변수
let bnum = 0; //블릿순번 전역변수
function goSlide(dir) {
  // dir-방향값(0-왼쪽, 1-오른쪽,2-블릿을클릭한경우)
  //함수를 만들고 할일-> 1.호출여부, 2. 파라미터 전달여부
  //alert(dir);

  // 움직일 대상선정
  const tg = document.querySelector(".maincont-slider__list");
  tg.style.transition = "all 1s ease-in-out"; //애니메이션

  //// 오른쪽버튼 클릭시
  if (dir === 1) {
    num++; //1씩증가
    if (num === 3) {
      num = 0;
    } //한계수지정(처음으로가기)
  } ///if문 오른쪽///
  ///// 왼쪽버튼 클릭시
  else if (dir === 0) {
    num--; //1씩감소
    if (num === -1) {
      num = 2;
    } //한계수지정(마지막으로 가기)
  } ///else if문 왼쪽///
  ///// 블릿을 클릭한 경우///
  else if (dir === 2) {
    num = bnum; //슬라이드번호=블릿번호
  }

  //해당번호 슬라이드로 이동하기
  tg.style.left = -100 * num + "%";

  //////// 블릿위치표시자 변경하기 //////////////////////
  const indic = document.querySelectorAll("#indic li");
  // 모든 li의 class를 초기화 하기
  for (let i = 0; i < indic.length; i++) {
    indic[i].setAttribute("class", "");
  } // for 문 //
  // 현재 슬라이드 번호인 num 과 일치하는 블릿 회색 적용하기( class 주기 )
  indic[num].setAttribute("class", "showit");
} ////goSlide함수////////////////////////////////////////
// 함수의 고도화란 기존 단순한 기능의 함수가 여러가지 작업을 구분하여 할 수 있도록 코드를 추가하여 체계화하는 것
// 1. 오른쪽 왼쪽 버튼을 구분하게함! (구분 파라미터를 전달)

let autocall; //setInterval함수용 전역변수
let autocallT; //setTimeout함수용 전역변수
///// html을 모두 로딩후 실행구역///////////////
window.addEventListener("load", function () {
  /// setInterval함수를 셋팅하는 자동호출 함수 부르기
  autoFunc();

  /// 오른쪽 버튼 클릭시 오른쪽 이동
  document.querySelector(".bR").onclick = function () {
    clearFunc(); //자동실행지우기함수 호출
    goSlide(1);
  }; ////오른쪽버튼///

  //// 왼쪽 버튼 클릭시 왼쪽 이동
  document.querySelector(".bL").onclick = function () {
    clearFunc(); //자동실행지우기함수 호출
    goSlide(0);
  }; ////왼쪽버튼////

  ///// 블릿버튼을 클릭할 경우 해당 번호 슬라이드로 이동하기
  const blet = document.querySelectorAll("#indic li");
  blet.item(0).onclick = function () {
    clearFunc(); //자동실행지우기함수 호출
    bnum = 0; //해당블릿순번
    goSlide(2); //블릿클릭한 경우 전달값으로 함수호출
  }; ////첫번째 블릿클릭/////
  blet.item(1).onclick = function () {
    clearFunc(); //자동실행지우기함수 호출
    bnum = 1; //해당블릿순번
    goSlide(2); //블릿클릭한 경우 전달값으로 함수호출
  }; ////두번째 블릿클릭/////
  blet.item(2).onclick = function () {
    clearFunc(); //자동실행지우기함수 호출
    bnum = 2; //해당블릿순번
    goSlide(2); //블릿클릭한 경우 전달값으로 함수호출
  }; ////세번째 블릿클릭/////
}); ////////load///////////////////////////////////////

/*
		함수명: autoFunc
		기능: 슬라이드 자동호출하기
	*/
function autoFunc() {
  ///// 슬라이드 배너 자동호출로 넘기기//////
  //// setInterval(함수,시간) - 일정시간간격으로 함수를 호출함
  autocall = setInterval("goSlide(1)", 6000); //4초간격 함수호출
  //// 시간은 1/1000초 , 따라서 4000은 4초다!

  /// setInterval함수를 전역변수에 담는 이유는????
  /// 이동버튼 클릭 시 자동실행 함수를 멈추고자 할때
  /// 변수에 담아놔야 그 변수를 지우기 함수로 멈출 수 있다.
  //// 지우기 함수는??? -------> clearInterval(변수명)
} //// autoFunc함수 /////////////////////////////

/*
		함수명: clearFunc
		기능: setInterval함수와 setTimeout함수를 지워준다.	
	*/
function clearFunc() {
  clearInterval(autocall); //자동실행멈추기
  clearTimeout(autocallT); //setTimeout 지우기
  autocallT = setTimeout(autoFunc, 8000);
} //////// clearFunc함수 /////////////////////////////////
