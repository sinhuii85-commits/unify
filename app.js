// 통일부 디지털 웹앱 인터랙티브 스크립트

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTabs();
  initBenefitFinder();
  initQuiz();
});

// 1. 모바일 햄버거 메뉴 토글
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });

    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
      });
    });
  }
}

// 2. 주요 업무 탭 전환 인터랙션
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTabId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// 3. [신규 기능] "나는 이 기관으로부터 어떤 도움을 받을 수 있을까?" 맞춤 혜택 진단 시스템
const benefitServices = [
  {
    category: "general",
    badge: "일반 국민 / 학생 / 학부모",
    title: "국립통일교육원 온·오프라인 평화통일 강좌 & 현장체험",
    description: "생애주기별 맞춤형 평화·통일 교육 프로그램, 오두산 통일전망대 관람, 청소년 통일캠프, 교원 직무연수 및 무료 전자도서 대출을 지원받으실 수 있습니다.",
    dept: "운영: 국립통일교육원",
    linkText: "국립통일교육원 홈페이지",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "general",
    badge: "일반 국민 / 문화 체험",
    title: "북한자료센터 열람 및 학술 DB 무료 이용",
    description: "국립중앙도서관 내 북한자료센터를 통해 북한 출판물, 영상, 통계, 학술 논문 등 방대한 북한 원전자료를 합법적이고 안전하게 열람 및 연구하실 수 있습니다.",
    dept: "운영: 통일부 북한자료센터",
    linkText: "북한자료센터 바로가기",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "family",
    badge: "이산가족 / 납북자 가족",
    title: "이산가족 영상편지 제작 및 유전자(DNA) 보관 지원",
    description: "초고령 이산가족의 사후 교류 및 혈육 확인을 위해 국비로 유전자 검사를 진행하며, 북녘 가족에게 남길 영상편지 제작을 무료로 촬영·영구 보관해 드립니다.",
    dept: "운영: 남북이산가족 교류협력과",
    linkText: "남북이산가족정보통합시스템",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "family",
    badge: "이산가족 / 친인척",
    title: "이산가족 상시 찾기 신청 및 생사확인 등록",
    description: "남북 합의 시 진행되는 온·오프라인 이산가족 상봉, 화상 상봉, 서신 교환의 우선 대상자로 전산 등록되어 종합적인 사후 관리를 받으실 수 있습니다.",
    dept: "운영: 통일부 인도협력국",
    linkText: "이산가족 신청 안내",
    linkUrl: "https://www.korea.kr"
  },
  {
    category: "settler",
    badge: "북한이탈주민 (탈북민)",
    title: "하나원 초기 사회적응 교육 및 1:1 진로 설계",
    description: "대한민국 입국 후 12주간 대한민국 법·사회·금융 교육, 건강검진 및 기초 직업훈련을 제공하며, 수료 시 초기 기본 정착금 및 영구·국민임대주택 알선을 보장합니다.",
    dept: "운영: 북한이탈주민정착지원사무소(하나원)",
    linkText: "하나원 교육과정 안내",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "settler",
    badge: "북한이탈주민 (탈북민)",
    title: "남북하나재단 자산형성(미래행복통장) 및 취업·장학 지원",
    description: "매월 일정 저축액에 정부 지원금을 1:1 매칭 적립해 주는 '미래행복통장', 취업장려금 지급, 대학 등록금 학자금 지원, 전문 심리상담 혜택을 제공합니다.",
    dept: "운영: 남북하나재단 (통일부 산하기관)",
    linkText: "남북하나재단 포털",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "business",
    badge: "기업 / 민간단체 / 연구자",
    title: "남북교류협력시스템(i-něx) 원스톱 행정 지원",
    description: "대북 인도적 지원, 문화·학술 교류, 남북 간 물품 반출입 승인 및 북한 주민 접촉 신고를 관공서 방문 없이 온라인으로 간편하게 신청하고 결과 통보를 받으실 수 있습니다.",
    dept: "운영: 통일부 교류협력실",
    linkText: "남북교류협력시스템(i-něx)",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "business",
    badge: "민간단체 / 스타트업",
    title: "남북협력기금 제도 및 정책 자문 컨설팅",
    description: "공익 목적의 대북 인도 협력 사업이나 평화 교류 연구를 추진하는 비영리 단체 및 기업을 위해 제도적 자문과 기금 신청 요건 가이드를 제공합니다.",
    dept: "운영: 통일부 개발협력기획과",
    linkText: "남북협력기금 포털",
    linkUrl: "https://www.unikorea.go.kr"
  },
  {
    category: "local",
    badge: "지역 주민 / 시민",
    title: "지역 통일플러스센터 원스톱 복합 서비스",
    description: "서울 본부 방문 없이도 인천, 강원, 호남 등 권역별 '통일플러스센터'를 통해 생활 밀착형 통일 교육, 지역 문화 행사, 북한 음식 체험, 탈북민 민원 상담을 통합 이용하실 수 있습니다.",
    dept: "운영: 통일부 및 지방자치단체 협력",
    linkText: "통일플러스센터 안내",
    linkUrl: "https://www.unikorea.go.kr"
  }
];

function initBenefitFinder() {
  const btnDiagnose = document.getElementById('btnDiagnose');
  const btnResetSurvey = document.getElementById('btnResetSurvey');
  const surveyResultArea = document.getElementById('surveyResultArea');
  const resultList = document.getElementById('resultList');
  const resultTitle = document.getElementById('resultTitle');
  const resultCount = document.getElementById('resultCount');

  if (!btnDiagnose || !surveyResultArea || !resultList) return;

  btnDiagnose.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('input[name="interest"]:checked');
    const selectedValues = Array.from(checkedBoxes).map(cb => cb.value);

    if (selectedValues.length === 0) {
      alert("최소 하나 이상의 상황이나 관심 분야를 선택해 주세요!");
      return;
    }

    // 선택된 카테고리에 매칭되는 서비스 필터링
    const matchedServices = benefitServices.filter(item => selectedValues.includes(item.category));

    // 결과 렌더링
    renderResults(matchedServices);

    // 결과 영역 보이기 및 부드러운 스크롤 이동
    surveyResultArea.style.display = 'block';
    surveyResultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  btnResetSurvey.addEventListener('click', () => {
    const allBoxes = document.querySelectorAll('input[name="interest"]');
    allBoxes.forEach(cb => cb.checked = false);
    surveyResultArea.style.display = 'none';
  });

  function renderResults(services) {
    resultList.innerHTML = '';
    resultCount.textContent = `선택하신 조건에 따라 총 ${services.length}개의 맞춤 혜택 및 지원 사업이 추천되었습니다.`;

    services.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'benefit-item';
      itemEl.innerHTML = `
        <span class="benefit-badge">${item.badge}</span>
        <h4 class="benefit-title">${item.title}</h4>
        <p class="benefit-desc">${item.description}</p>
        <div class="benefit-footer">
          <span class="benefit-dept">${item.dept}</span>
          <a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer" class="benefit-btn">${item.linkText} ↗</a>
        </div>
      `;
      resultList.appendChild(itemEl);
    });
  }

  // 초기 1회 기본 체크된 상태로 진단 실행 준비 (사용자 편의)
}

// 4. 통일부 팩트체크 OX 퀴즈 데이터 및 로직
const quizData = [
  {
    question: "Q1. 통일부는 북한이탈주민(탈북민)의 초기 사회적응과 자립을 돕는 '하나원'을 직접 운영하고 있다?",
    answer: true,
    explanation: "정답은 O입니다! 통일부 소속 북한이탈주민정착지원사무소(하나원)는 맞춤형 교육과 정착을 전문적으로 지원합니다."
  },
  {
    question: "Q2. 통일부는 1990년대 남북정상회담 이후에 처음 창설된 기관이다?",
    answer: false,
    explanation: "정답은 X입니다! 통일부는 1969년 '국토통일원'으로 처음 발족하여 55년 이상의 유서 깊은 역사를 갖고 있습니다."
  },
  {
    question: "Q3. 통일부는 국민과 청소년을 대상으로 토론 및 평화 체험형 통일교육을 지원하는 국립통일교육원을 두고 있다?",
    answer: true,
    explanation: "정답은 O입니다! 국립통일교육원을 통해 주입식이 아닌 열린 소통과 공론화 기반의 참여형 교육을 추진하고 있습니다."
  }
];

function initQuiz() {
  let currentIndex = 0;
  let score = 0;

  const quizProgress = document.getElementById('quizProgress');
  const quizQuestion = document.getElementById('quizQuestion');
  const btnO = document.getElementById('btnO');
  const btnX = document.getElementById('btnX');
  const quizFeedback = document.getElementById('quizFeedback');
  const btnNextQuiz = document.getElementById('btnNextQuiz');

  if (!quizQuestion || !btnO || !btnX) return;

  function loadQuestion(index) {
    quizFeedback.style.display = 'none';
    quizFeedback.className = 'quiz-feedback';
    btnO.disabled = false;
    btnX.disabled = false;
    btnNextQuiz.style.display = 'none';

    quizProgress.textContent = `문제 ${index + 1} / ${quizData.length}`;
    quizQuestion.textContent = quizData[index].question;
  }

  function handleAnswer(userChoice) {
    const currentQuiz = quizData[currentIndex];
    const isCorrect = userChoice === currentQuiz.answer;

    btnO.disabled = true;
    btnX.disabled = true;

    if (isCorrect) {
      score++;
      quizFeedback.textContent = `👏 정답입니다! ${currentQuiz.explanation}`;
      quizFeedback.className = 'quiz-feedback correct';
    } else {
      quizFeedback.textContent = `💡 아쉽네요! ${currentQuiz.explanation}`;
      quizFeedback.className = 'quiz-feedback incorrect';
    }

    quizFeedback.style.display = 'block';

    if (currentIndex < quizData.length - 1) {
      btnNextQuiz.textContent = "다음 문제 풀기";
      btnNextQuiz.style.display = 'inline-block';
    } else {
      btnNextQuiz.textContent = `퀴즈 완료! (${score}/${quizData.length} 정답) 다시 풀기`;
      btnNextQuiz.style.display = 'inline-block';
    }
  }

  btnO.addEventListener('click', () => handleAnswer(true));
  btnX.addEventListener('click', () => handleAnswer(false));

  btnNextQuiz.addEventListener('click', () => {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      loadQuestion(currentIndex);
    } else {
      currentIndex = 0;
      score = 0;
      loadQuestion(currentIndex);
    }
  });

  loadQuestion(0);
}
