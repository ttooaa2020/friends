$(function () {
    const swiper = new Swiper(".swiper", {
        loop: true,
        spaceBetween: 30,
        speed: 1000,
        autoplay: {
            delay: 10000,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".my-swiper-button-next", // 변경된 클래스
            prevEl: ".my-swiper-button-prev", // 변경된 클래스
        },
    });

    // 탑 버튼 클릭 시 부드럽게 스크롤
    $(".top").click(function (event) {
        event.preventDefault(); // 기본 동작 방지
        $("html, body").animate({ scrollTop: 0 }, 600); // 부드럽게 스크롤
    });
    // 탑 버튼 클릭 시 부드럽게 스크롤

    // 스크롤 배경 변경
    // $(window).on("scroll", function () {
    //     // 페이지 높이와 현재 스크롤 값을 가져옵니다.
    //     const scrollTop = $(this).scrollTop();
    //     const documentHeight = $(document).height() - $(window).height();

    //     // 스크롤 비율을 계산합니다.
    //     const scrollFraction = scrollTop / documentHeight;

    //     // 색상 보간 계산
    //     const r = Math.floor(229 + (97 - 229) * scrollFraction); // R
    //     const g = Math.floor(241 + (139 - 241) * scrollFraction); // G
    //     const b = Math.floor(223 + (162 - 223) * scrollFraction); // B

    //     // 배경 색상을 변경합니다.
    //     $("body").css("background-color", `rgb(${r}, ${g}, ${b})`);
    // });
    // 스크롤 배경 변경

    // 퀴즈
    const quizData = [
        {
            question: "현재 우리 오합지졸 친구들 중 생일이 가장 늦는 사람은?",
            options: ["손다연", "김은지", "김민서", "신민경"],
            answer: ["김은지"],
        },

        {
            question: "다음 중 보기에서 황단영이 졸업 전 학교에서 하고 싶어 했던 것은? (복수 정답)",
            options: [
                "비밀 아지트 만들기",
                "다같이 비빔밥 해먹기",
                "점심시간에 배달음식 시켜먹기",
                "옥상에서 삼겹살 구워먹기",
                "체험학습 쓰고 다같이 놀러가기",
            ],
            answer: ["비밀 아지트 만들기", "다같이 비빔밥 해먹기", "점심시간에 배달음식 시켜먹기", "옥상에서 삼겹살 구워먹기", "체험학습 쓰고 다같이 놀러가기"],
        },

        {
            question: "1학년 시절 예림마스에서 우리가 만든 부스의 이름은? ",
            options: ["깡패반", "오합지졸", "때인 재미", "일락실"],
            answer: ["일락실"],
        },

        {
            question:
                "어느 맑은날, 철수와 영희는 공원에 가기로 했습니다. 철수는 자전거를 타고 시속 12km로 달리고, 영희는 시속 4km로 걸으면서 이야기를 나누기로 했습니다. 공원까지의 거리는 6km입니다. 두 사람이 오전 10시에 출발했을 때, 이때 근처 카페에서 작업을 하던 신시아가 마시는 음료의 이름은 무엇일까요? ",
            options: ["민트 프라페", "버블티", "딸기 라떼", "민트초코오레오크라페"],
            answer: ["민트초코오레오크라페"],
        },

        {
            question: "다음 중 보기에서 우리가 존경해야할 사람을 고르세요. ",
            options: ["Χίτλερ", "کنگ سیجونگ دی گریٹ", "યંગસીઓન લી", "Ито Хиробуми"],
            answer: ["کنگ سیجونگ دی گریٹ"],

            // 히틀러,세종,이영선,이토히로부미
        },

        {
            question: "제작자가 이 호합지졸 프로젝트를 만드는데 걸리는 시간은?",
            options: ["3일", "5일", "2주", "3주"],
            answer: ["2주"],
        },

        {
            question: "오합지졸들이 1학년 시절 김민서씨가 가장 많이 들고 다녔던 인형은? ",
            options: ["서하", "펭구", "식빵", "오리"],
            answer: ["식빵"],
        },
    ];

    let currentQuestion = 0;
    let score = 0;
    let incorrectQuestions = []; // 틀린 문제를 저장할 배열

    function loadQuestion() {
        const quizContainer = $("#quiz");
        quizContainer.empty();

        if (currentQuestion < quizData.length) {
            const questionData = quizData[currentQuestion];
            quizContainer.append(`<strong>${questionData.question}</strong>`);

            const optionsDiv = $('<div class="options"></div>');

            questionData.options.forEach((option) => {
                optionsDiv.append(`
                    <label>
                        <input type="checkbox" name="option" value="${option}">
                        ${option}
                    </label>
                `);
            });

            quizContainer.append(optionsDiv);
        } else {
            showResult();
        }
    }

    function showResult() {
        $("#quiz").hide();
        $(".quiz-btn").hide();

        const totalQuestions = quizData.length;
        $("#result .score").text(`정답: ${score} / ${totalQuestions}`);

        if (score === totalQuestions) {
            $("#result .message").text("축하합니다! 모든 문제를 맞추셨습니다!");
            $("#result .incorrect-questions").hide(); // 틀린 문제 숨기기
        } else {
            $("#result .message").text("아쉽지만, 틀린 문제는 다음과 같습니다");
            $("#result .incorrect-questions").text(incorrectQuestions.join(", ")).show(); // 틀린 문제 보이기

            // 틀린 문제를 각각의 <p> 태그로 추가
            const incorrectDiv = $("#result .incorrect-questions");
            incorrectDiv.empty(); // 이전 내용을 비우기
            incorrectQuestions.forEach((question) => {
                incorrectDiv.append(`<p>${question}</p>`); // 각 문제를 <p>로 추가
            });
            incorrectDiv.show(); // 틀린 문제 보이기
        }

        $("#result").show();
        $("#reset-btn").show();
    }

    $(".quiz-btn").on("click", function () {
        const selectedOptions = $('input[name="option"]:checked')
            .map(function () {
                return $(this).val();
            })
            .get();

        if (selectedOptions.length > 0) {
            const correctAnswers = quizData[currentQuestion].answer;

            // 선택한 답안이 정답 배열에 포함되는지 확인
            const isCorrect = selectedOptions.every((option) => correctAnswers.includes(option));

            if (isCorrect) {
                score++;
            } else {
                incorrectQuestions.push(quizData[currentQuestion].question); // 틀린 문제 추가
            }

            currentQuestion++;
            loadQuestion();
        } else {
            alert("그냥 넘기게?");
        }
    });

    $("#reset-btn").on("click", function () {
        currentQuestion = 0;
        score = 0;
        incorrectQuestions = []; // 틀린 문제 초기화
        $("#result").hide();
        $("#reset-btn").hide();
        loadQuestion();
        $("#quiz").show();
        $(".quiz-btn").show();
    });

    loadQuestion();

    // 퀴즈

    // 갤러리
    // 비디오 나오게 하기
    const videos = document.querySelectorAll(".video video"); // 비디오 선택
    const modal = document.getElementById("video-modal");
    const modalVideo = document.getElementById("modal-video");
    const closeButton = document.querySelector(".modal-content .close"); // 닫기 버튼

    videos.forEach((video) => {
        // 비디오 클릭 시 모달 열기
        video.addEventListener("click", function () {
            modal.classList.add("show"); // 모달 열기
            modalVideo.src = this.src; // 클릭한 비디오의 src를 모달 비디오에 설정
            modalVideo.setAttribute("controls", ""); // 모달 비디오에 controls 속성 추가
            modalVideo.play(); // 비디오 재생
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeButton.addEventListener("click", function () {
        modal.classList.remove("show"); // 모달 닫기
        modalVideo.pause(); // 비디오 정지
        modalVideo.src = ""; // 비디오 src 초기화
        modalVideo.removeAttribute("controls"); // 모달 비디오에서 controls 속성 제거
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show"); // 모달 닫기
            modalVideo.pause(); // 비디오 정지
            modalVideo.src = ""; // 비디오 src 초기화
            modalVideo.removeAttribute("controls"); // 모달 비디오에서 controls 속성 제거
        }
    });
    // 비디오 나오게 하기

    // 사진 필터링
    // 초기 상태: 2024년 콘텐츠 표시
    filterContentByYear($("#year-select").val());

    // 년도 선택 시 콘텐츠 필터링
    $("#year-select").on("change", function () {
        const selectedYear = $(this).val(); // 선택된 년도
        filterContentByYear(selectedYear);
    });

    // 타입 선택 시 콘텐츠 필터링
    $("#type-select").on("change", function () {
        const selectedYear = $("#year-select").val(); // 현재 선택된 년도
        const selectedType = $(this).val(); // 선택된 타입
        filterContentByYearAndType(selectedYear, selectedType);
    });

    // 년도에 따라 콘텐츠 필터링하는 함수
    function filterContentByYear(year) {
        // 모든 년도 콘텐츠 숨기기
        $(".gallery-con > div").hide();

        // 선택한 년도 콘텐츠 표시
        const selectedContent = $(`.${year}`);
        selectedContent.show(); // 선택한 년도에 해당하는 요소 표시

        // 선택한 년도에 해당하는 콘텐츠의 타입에 따라 필터링
        const selectedType = $("#type-select").val(); // 현재 선택된 타입
        filterContentByYearAndType(year, selectedType); // 타입에 따라 필터링
    }

    // 년도와 타입에 따라 콘텐츠 필터링하는 함수
    function filterContentByYearAndType(year, type) {
        // 모든 년도 콘텐츠 숨기기
        $(".gallery-con > div").hide();

        // 선택한 년도 콘텐츠 표시
        const selectedContent = $(`.${year}`);
        selectedContent.show(); // 선택한 년도에 해당하는 요소 표시

        // 선택한 타입에 따라 필터링
        if (type === "photo") {
            selectedContent.find(".video").hide(); // 비디오 숨김
            selectedContent.find(".photo").show(); // 사진 표시
        } else if (type === "video") {
            selectedContent.find(".photo").hide(); // 사진 숨김
            selectedContent.find(".video").show(); // 비디오 표시
        } else {
            selectedContent.find(".photo").show(); // 사진 표시
            selectedContent.find(".video").show(); // 비디오 표시
        }
    }
    // 갤러리

    // 비주얼

    // 대싱을 변수에 저장
    const $window = $(window);
    const $objWrap = $(".visual-img");
    const $obj1 = $(".obj1");
    const $obj2 = $(".obj2");
    const $obj3 = $(".obj3");
    const $obj4 = $(".obj4");

    const $F1 = $(".f-1");
    const $F2 = $(".f-2");
    const $F3 = $(".f-3");

    // 보정된 값
    let mx = 0;

    // 기본 속도
    const speed = 0.5; // 움직이는 속도 조정

    // 움직임의 범위 설정
    const minX = -40; // 최소 X 위치
    const maxX = 40; // 최대 X 위치

    // 방향 설정
    let directionX = 1; // X 방향 (1: 오른쪽, -1: 왼쪽)

    // 움직임 구현
    function moving() {
        // 위치 업데이트
        mx += speed * directionX;

        // X좌표 제한
        if (mx < minX) {
            mx = minX;
            directionX = 1; // 방향 전환
        } else if (mx > maxX) {
            mx = maxX;
            directionX = -1; // 방향 전환
        }

        // 대상에 적용
        $obj1.css({
            transform: `translate3d(${mx}px, 0, 0)`, // Y축은 0으로 설정
        });

        $obj2.css({
            transform: `translate3d(${mx}px, 0, 0)`, // Y축은 0으로 설정
        });

        $obj3.css({
            transform: `translate(${-mx}px, 0)`, // Y축은 0으로 설정
        });

        $obj4.css({
            transform: `translate(${-mx}px, 0)`, // Y축은 0으로 설정
        });

        $F1.css({
            transform: `translate3d(${mx}px, 0, 0)`, // Y축은 0으로 설정
        });

        $F2.css({
            transform: `translate3d(${mx}px, 0, 0)`, // Y축은 0으로 설정
        });

        $F3.css({
            transform: `translate(${-mx}px, 0)`, // Y축은 0으로 설정
        });

        // 부드럽게 반복
        requestAnimationFrame(moving);
    }

    moving();
});
