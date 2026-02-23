/**
 * 펫메이트 (PetMate) - 반려동물 품종 매칭 시스템
 * 메인 스크립트: 매칭 알고리즘, 테스트 페이지, 결과 페이지 로직
 *
 * 구조:
 * 1. 질문 데이터 상수
 * 2. PetMatcher 클래스 (핵심 매칭 알고리즘)
 * 3. TestPage 클래스 (테스트 UI 처리)
 * 4. ResultPage 클래스 (결과 UI 처리)
 * 5. 페이지 초기화
 */

'use strict';

// ============================================================
// 1. 질문 데이터 (14개)
// ============================================================

/**
 * 테스트 질문 목록
 * - id: 질문 번호 (1-14)
 * - text: 질문 내용
 * - emoji: 질문 관련 이모지
 * - options: 선택지 배열 (label: 버튼 텍스트, value: 0부터 순서대로)
 */
const QUESTIONS = [
  // ---- 1페이지: 1-7번 ----
  {
    id: 1,
    text: '가족 중 털 알레르기나 천식이 있는 분이 계신가요?',
    emoji: '🤧',
    category: '건강',
    options: [
      { label: '심각한 알레르기 있음', value: 0 },
      { label: '약간 있지만 관리 가능', value: 1 },
      { label: '전혀 없음', value: 2 }
    ]
  },
  {
    id: 2,
    text: '현재 거주 환경은?',
    emoji: '🏠',
    category: '환경',
    options: [
      { label: '마당 있는 단독주택', value: 0 },
      { label: '넓은 아파트 25평 이상', value: 1 },
      { label: '일반 아파트/빌라', value: 2 },
      { label: '원룸/오피스텔', value: 3 }
    ]
  },
  {
    id: 3,
    text: '이웃과의 소음 문제가 걱정되시나요?',
    emoji: '🔇',
    category: '환경',
    options: [
      { label: '매우 걱정됨', value: 0 },
      { label: '어느 정도 걱정됨', value: 1 },
      { label: '별로 걱정 안 됨', value: 2 }
    ]
  },
  {
    id: 4,
    text: '하루 중 집을 비우는 시간은?',
    emoji: '⏰',
    category: '생활패턴',
    options: [
      { label: '1시간 미만', value: 0 },
      { label: '2~3시간', value: 1 },
      { label: '6~8시간', value: 2 },
      { label: '10시간 이상', value: 3 }
    ]
  },
  {
    id: 5,
    text: '반려동물과 산책/놀이 시간을 얼마나 낼 수 있나요?',
    emoji: '🏃',
    category: '활동',
    options: [
      { label: '매일 2시간 이상', value: 0 },
      { label: '매일 1시간 정도', value: 1 },
      { label: '주말에만 충분히', value: 2 },
      { label: '거의 시간 내기 어려움', value: 3 }
    ]
  },
  {
    id: 6,
    text: '털 관리와 청소에 대한 생각은?',
    emoji: '🧹',
    category: '케어',
    options: [
      { label: '매일 해도 괜찮음', value: 0 },
      { label: '주 2~3회 정도', value: 1 },
      { label: '최소한만 하고 싶음', value: 2 },
      { label: '털 안 빠지는 품종 원함', value: 3 }
    ]
  },
  {
    id: 7,
    text: '반려동물 양육 경험은?',
    emoji: '🎓',
    category: '경험',
    options: [
      { label: '경험 풍부', value: 0 },
      { label: '한두 마리 키워봄', value: 1 },
      { label: '어릴 때 잠깐', value: 2 },
      { label: '완전 처음', value: 3 }
    ]
  },
  // ---- 2페이지: 8-14번 ----
  {
    id: 8,
    text: '월 반려동물 관련 예산은?',
    emoji: '💰',
    category: '예산',
    options: [
      { label: '25만원 이상', value: 0 },
      { label: '15~25만원', value: 1 },
      { label: '10~15만원', value: 2 },
      { label: '10만원 미만', value: 3 }
    ]
  },
  {
    id: 9,
    text: '주말과 휴일에는 주로?',
    emoji: '🌞',
    category: '생활패턴',
    options: [
      { label: '야외활동', value: 0 },
      { label: '가벼운 외출', value: 1 },
      { label: '집에서 휴식', value: 2 },
      { label: '친구들과 모임', value: 3 }
    ]
  },
  {
    id: 10,
    text: '훈련과 교육에 대한 자신감은?',
    emoji: '🎯',
    category: '훈련',
    options: [
      { label: '체계적 훈련 자신 있음', value: 0 },
      { label: '기본 명령어 정도', value: 1 },
      { label: '간단한 것만', value: 2 },
      { label: '훈련 없이 자유롭게', value: 3 }
    ]
  },
  {
    id: 11,
    text: '반려동물과의 이상적인 관계는?',
    emoji: '💝',
    category: '관계',
    options: [
      { label: '항상 붙어다니며 교감', value: 0 },
      { label: '적당한 거리감', value: 1 },
      { label: '독립적이지만 가끔 교감', value: 2 },
      { label: '서로 영역 존중', value: 3 }
    ]
  },
  {
    id: 12,
    text: '선호하는 반려동물의 성격은?',
    emoji: '✨',
    category: '성격',
    options: [
      { label: '활발한 성격', value: 0 },
      { label: '온순한 성격', value: 1 },
      { label: '똑똑한 성격', value: 2 },
      { label: '차분하고 독립적', value: 3 }
    ]
  },
  {
    id: 13,
    text: '반려동물의 크기 선호는?',
    emoji: '📏',
    category: '크기',
    options: [
      { label: '대형 25kg 이상', value: 0 },
      { label: '중형 10~25kg', value: 1 },
      { label: '소형 3~10kg', value: 2 },
      { label: '초소형 3kg 미만', value: 3 }
    ]
  },
  {
    id: 14,
    text: '반려동물을 키우는 가장 큰 이유는?',
    emoji: '❤️',
    category: '목적',
    options: [
      { label: '활동적인 파트너', value: 0 },
      { label: '정서적 안정', value: 1 },
      { label: '가족 같은 동반자', value: 2 },
      { label: '귀여움과 관찰', value: 3 }
    ]
  },
  {
    id: 15,
    text: '강아지와 고양이 중 어떤 쪽이 더 끌리나요?',
    emoji: '🐾',
    category: '선호',
    options: [
      { label: '강아지가 좋아요 🐶', value: 0 },
      { label: '고양이가 좋아요 🐱', value: 1 },
      { label: '잘 모르겠어요', value: 2 },
      { label: '둘 다 좋아요!', value: 3 }
    ]
  }
];

// ============================================================
// 1-B. 품종별 Wikipedia 페이지 매핑 (얼굴 사진 로드용)
// ============================================================

const WIKI_PAGES = {
  'golden-retriever':  'Golden Retriever',
  'bichon-frise':      'Bichon Frise',
  'toy-poodle':        'Toy poodle',
  'welsh-corgi':       'Welsh Corgi',
  'shiba-inu':         'Shiba Inu',
  'labrador':          'Labrador Retriever',
  'border-collie':     'Border Collie',
  'maltese':           'Maltese dog',
  'chihuahua':         'Chihuahua (dog)',
  'pomeranian':        'Pomeranian (dog)',
  'russian-blue':      'Russian Blue',
  'british-shorthair': 'British Shorthair',
  'bengal':            'Bengal cat',
  'persian':           'Persian cat',
  'korean-shorthair':  'Korean domestic cat'
};

/**
 * Wikipedia REST API에서 품종별 대표 얼굴 사진 URL 가져오기
 * @param {string} breedId - 품종 ID
 * @param {number} [size=800] - 이미지 너비 (px)
 * @returns {Promise<string|null>} 이미지 URL 또는 null
 */
async function fetchWikiImage(breedId, size = 800) {
  const wikiPage = WIKI_PAGES[breedId];
  if (!wikiPage) return null;

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.thumbnail && data.thumbnail.source) {
      // 원하는 크기로 교체 (예: /320px- → /800px-)
      return data.thumbnail.source.replace(/\/\d+px-/, `/${size}px-`);
    }
  } catch (e) {
    console.warn('Wikipedia 이미지 로드 실패:', breedId, e);
  }
  return null;
}

// ============================================================
// 2. PetMatcher 클래스 (핵심 매칭 알고리즘)
// ============================================================

/**
 * PetMatcher - 3단계 매칭 알고리즘을 구현한 핵심 클래스
 *
 * [1단계] 필터링: 알레르기, 주거환경, 털 요구사항으로 부적합 품종 제거
 * [2단계] 점수계산: 사용자 답변을 5개 차원 점수로 변환
 * [3단계] 최적매칭: 가중치 유클리드 거리로 유사도 계산 후 상위 3개 추출
 */
class PetMatcher {

  /**
   * 매칭 실행 - 답변 배열을 받아 상위 3개 품종을 반환
   * @param {number[]} answers - 15개 질문 답변 (0-based 인덱스)
   * @returns {Array} - 점수 순으로 정렬된 품종 배열 (최대 3개)
   */
  match(answers) {
    // ==========================================
    // [1단계] 필터링
    // ==========================================
    // 사용자 제약 조건 추출
    const filters = this._buildFilters(answers);

    // 필터 조건을 통과한 품종만 남김
    let candidates = PETS_DATABASE.filter(breed =>
      this._passesHardFilter(breed, filters)
    );

    // 필터링 후 후보가 너무 적으면 소프트 필터로 완화 (최소 5종 보장)
    if (candidates.length < 5) {
      console.log('후보가 너무 적어 필터를 완화합니다:', candidates.length, '→ 완화 적용');
      candidates = this._applyRelaxedFilter(PETS_DATABASE, filters);
    }

    // ==========================================
    // [2단계] 점수 계산
    // ==========================================
    // 사용자 프로필 (5개 차원 점수, 각 1-10)
    const userProfile = this._buildUserProfile(answers);

    // ==========================================
    // [3단계] 최적 매칭 계산
    // ==========================================
    // 각 품종의 매칭 점수 계산
    const scored = candidates.map(breed => ({
      breed,
      score: this._calculateScore(breed, userProfile, filters, answers)
    }));

    // 점수 내림차순 정렬
    scored.sort((a, b) => b.score - a.score);

    // ==========================================
    // 다양성 보장: 선호 없을 때 상위 3개가 전부 강아지면 최우선 고양이로 교체
    // (고양이를 직접 선호한 경우는 이미 점수로 반영됨 → 적용 안 함)
    // ==========================================
    if (!filters.typePreference) {
      const topThree = scored.slice(0, 3);
      const hasCat = topThree.some(item => item.breed.type === 'cat');
      if (!hasCat) {
        const bestCat = scored.find(item => item.breed.type === 'cat');
        if (bestCat) {
          // 3순위 자리를 최고 점수 고양이로 교체
          scored.splice(2, 1, bestCat);
        }
      }
    }

    // 상위 3개 반환 (점수 포함)
    return scored.slice(0, 3).map(item => ({
      ...item.breed,
      matchScore: Math.round(item.score),          // 최종 매칭 점수 (0-100)
      matchReason: this._getMatchReason(item.breed, userProfile, answers)  // 매칭 이유
    }));
  }

  // ----------------------------------------------------------
  // [1단계] 필터 구축 및 적용
  // ----------------------------------------------------------

  /**
   * 사용자 답변으로부터 필터 조건 객체를 생성
   * Q1(알레르기), Q2(주거환경), Q3(소음), Q6(털), Q8(예산), Q13(크기선호) 반영
   */
  _buildFilters(answers) {
    const q1 = answers[0];  // 알레르기
    const q2 = answers[1];  // 주거환경
    const q3 = answers[2];  // 소음 걱정
    const q6 = answers[5];  // 털 관리
    const q8 = answers[7];  // 예산
    const q13 = answers[12]; // 크기 선호
    const q14 = answers[13]; // 키우는 이유

    // Q15: 동물 선호 (0=강아지, 1=고양이, 2=모르겠음, 3=둘다)
    const q15 = answers[14];

    return {
      // 알레르기 필터
      // 0=심각한 알레르기 → 저알레르기 품종만
      // 1=약간 있음 → 저알레르기 선호 (패널티 적용)
      // 2=없음 → 필터 없음
      allergyLevel: q1,

      // 주거환경 별 허용 크기 목록
      allowedSizes: this._getAllowedSizes(q2),

      // 소음 걱정 수준 (0=매우 걱정, 1=약간, 2=괜찮음)
      noiseWorryLevel: q3,

      // 털 안 빠지는 품종 필수 여부 (q6 === 3)
      requireLowShedding: q6 === 3,

      // 예산 수준 (0=최고, 3=최저)
      budgetLevel: q8,

      // 선호 크기 (선호도 보너스용)
      preferredSize: this._getPreferredSize(q13),

      // 키우는 목적
      purpose: ['active', 'emotional', 'companion', 'observation'][q14] || 'companion',

      // 성격 선호 (Q12)
      personalityPref: ['active', 'gentle', 'intelligent', 'calm'][answers[11]] || 'companion',

      // 동물 타입 선호 (Q15): 'dog' | 'cat' | null(선호없음)
      typePreference: q15 === 0 ? 'dog' : q15 === 1 ? 'cat' : null
    };
  }

  /**
   * 주거환경(Q2)에 따른 허용 크기 목록 반환
   * 좁은 공간일수록 작은 동물만 허용
   */
  _getAllowedSizes(q2) {
    switch(q2) {
      case 0: return ['초소형', '소형', '중형', '대형']; // 단독주택 → 모든 크기 OK
      case 1: return ['초소형', '소형', '중형', '대형']; // 넓은 아파트 → 모든 크기 OK
      case 2: return ['초소형', '소형', '중형'];          // 일반 아파트 → 대형 제한
      case 3: return ['초소형', '소형'];                  // 원룸 → 소형 이하만
      default: return ['초소형', '소형', '중형', '대형'];
    }
  }

  /**
   * 크기 선호(Q13)를 크기 문자열로 변환
   */
  _getPreferredSize(q13) {
    return ['대형', '중형', '소형', '초소형'][q13] || null;
  }

  /**
   * 하드 필터 적용 - 통과하지 못하면 후보에서 완전 제외
   */
  _passesHardFilter(breed, filters) {
    // 필터 1: 심각한 알레르기 → 저알레르기 품종만 허용
    if (filters.allergyLevel === 0 && !breed.hypoallergenic) {
      return false;
    }

    // 필터 2: 주거환경 크기 제한
    if (!filters.allowedSizes.includes(breed.size)) {
      return false;
    }

    // 필터 3: 털 안 빠지는 품종 요구 시
    if (filters.requireLowShedding && !breed.lowShedding) {
      return false;
    }

    return true;
  }

  /**
   * 필터 완화 (후보가 너무 적을 때)
   * 하드 필터 중 크기 필터를 한 단계 완화
   */
  _applyRelaxedFilter(allBreeds, filters) {
    // 크기 필터만 제거하고 알레르기/털 필터는 유지
    return allBreeds.filter(breed => {
      if (filters.allergyLevel === 0 && !breed.hypoallergenic) return false;
      if (filters.requireLowShedding && !breed.lowShedding) return false;
      return true;
    });
  }

  // ----------------------------------------------------------
  // [2단계] 사용자 프로필 점수 계산
  // ----------------------------------------------------------

  /**
   * 14개 답변으로부터 5개 차원의 사용자 프로필 점수를 생성
   * 각 점수는 1-10 사이 값
   *
   * 5개 차원:
   * - activity: 사용자의 활동 수준 (낮음=조용한 품종, 높음=활발한 품종)
   * - independenceNeed: 독립적인 동물 필요도 (높음=혼자 있는 시간 많음)
   * - careCapacity: 케어 능력 (높음=많은 시간/돈 투자 가능)
   * - trainCapacity: 훈련 역량 (높음=체계적 훈련 가능)
   * - bondingPreference: 교감 선호도 (높음=붙어다니며 교감 원함)
   */
  _buildUserProfile(answers) {
    const q4 = answers[3];  // 집 비우는 시간
    const q5 = answers[4];  // 산책/놀이 시간
    const q6 = answers[5];  // 털 관리
    const q7 = answers[6];  // 양육 경험
    const q8 = answers[7];  // 예산
    const q9 = answers[8];  // 주말 활동
    const q10 = answers[9]; // 훈련 자신감
    const q11 = answers[10]; // 이상적 관계

    // 활동성 점수: Q5(60%) + Q9(40%) 가중 평균
    // Q5: 0=9점(매일2시간↑), 1=7점, 2=5점(주말만), 3=2점(거의못냄)
    // Q9: 0=9점(야외활동), 1=6점, 2=3점(집에서휴식), 3=5점(친구모임)
    const activityFromQ5 = [9, 7, 5, 2][q5] || 5;
    const activityFromQ9 = [9, 6, 3, 5][q9] || 5;
    const activity = activityFromQ5 * 0.6 + activityFromQ9 * 0.4;

    // 독립성 필요도: Q4로 결정
    // Q4: 0=1점(1시간미만,항상집에있음), 1=2점(2-3시간), 2=6점(6-8시간), 3=9점(10시간↑, 독립성 필수)
    const independenceNeed = [1, 2, 6, 9][q4] || 5;

    // 케어 능력: Q6(60%) + Q8(40%)
    // Q6: 0=9점(매일도OK), 1=6점, 2=3점(최소한), 3=1점(털 안빠지는품종)
    // Q8: 0=9점(25만↑), 1=7점, 2=5점, 3=2점(10만미만)
    const careFromQ6 = [9, 6, 3, 1][q6] || 5;
    const careFromQ8 = [9, 7, 5, 2][q8] || 5;
    const careCapacity = careFromQ6 * 0.6 + careFromQ8 * 0.4;

    // 훈련 역량: Q7(40%) + Q10(60%)
    // Q7: 0=9점(경험풍부), 1=6점, 2=3점, 3=1점(완전처음)
    // Q10: 0=9점(체계적훈련), 1=6점, 2=3점, 3=1점(훈련없이)
    const trainFromQ7 = [9, 6, 3, 1][q7] || 5;
    const trainFromQ10 = [9, 6, 3, 1][q10] || 5;
    const trainCapacity = trainFromQ7 * 0.4 + trainFromQ10 * 0.6;

    // 교감 선호도: Q11로 결정
    // Q11: 0=9점(항상붙어다님), 1=6점(적당한거리), 2=3점(독립적이지만가끔), 3=1점(영역존중)
    const bondingPreference = [9, 6, 3, 1][q11] || 5;

    return { activity, independenceNeed, careCapacity, trainCapacity, bondingPreference };
  }

  // ----------------------------------------------------------
  // [3단계] 매칭 점수 계산
  // ----------------------------------------------------------

  /**
   * 특정 품종과 사용자 프로필 간의 매칭 점수 계산 (0-100점)
   *
   * 계산 방식:
   * 1. 5개 차원의 가중 유클리드 거리 계산
   * 2. 거리를 0-100 점수로 변환 (거리가 작을수록 높은 점수)
   * 3. 보너스/패널티 항목 적용
   */
  _calculateScore(breed, userProfile, filters, answers) {
    // ---- 차원 1: 활동성 ----
    // 사용자 활동성 vs 품종 활동성
    const activityDiff = Math.abs(userProfile.activity - breed.activity);

    // ---- 차원 2: 독립성 ----
    // 사용자가 필요한 독립성 vs 품종의 실제 독립성
    const independenceDiff = Math.abs(userProfile.independenceNeed - breed.independence);

    // ---- 차원 3: 케어 ----
    // 케어 능력이 케어 난이도보다 낮으면 패널티 강화
    // (능력이 충분하면 차이 없음, 부족하면 차이 발생)
    const careDiff = Math.max(0, breed.careDifficulty - userProfile.careCapacity) * 1.5;

    // ---- 차원 4: 훈련 ----
    // 훈련 용이성이 낮은 품종(훈련이 어려운 품종)을 훈련 역량이 낮은 사람에게 배정하지 않음
    // breed.trainability가 높을수록 훈련이 쉬운 품종
    // 사용자 trainCapacity가 낮을 때, trainability가 낮은 품종은 불리
    const trainNeeded = 11 - breed.trainability; // 훈련 필요도 (높을수록 훈련이 어려운 품종)
    const trainDiff = Math.max(0, trainNeeded - userProfile.trainCapacity);

    // ---- 차원 5: 교감 ----
    // 사용자가 원하는 교감 수준 vs 품종의 사교성
    const bondingDiff = Math.abs(userProfile.bondingPreference - breed.sociability);

    // 가중치 정의 (합계 = 1.0)
    // 케어와 활동성에 더 높은 가중치를 줌 (실생활에서 가장 중요한 요소)
    const weights = {
      activity: 0.25,       // 활동성 25%
      independence: 0.20,   // 독립성 20%
      care: 0.25,           // 케어 25%
      train: 0.20,          // 훈련 20%
      bonding: 0.10         // 교감 10%
    };

    // 가중 유클리드 거리 계산
    const weightedDistance = Math.sqrt(
      weights.activity    * Math.pow(activityDiff, 2)    +
      weights.independence * Math.pow(independenceDiff, 2) +
      weights.care        * Math.pow(careDiff, 2)        +
      weights.train       * Math.pow(trainDiff, 2)       +
      weights.bonding     * Math.pow(bondingDiff, 2)
    );

    // 이론적 최대 거리: 모든 차원이 10일 때
    // sqrt(0.25*100 + 0.2*100 + 0.25*100 + 0.2*100 + 0.1*100) = sqrt(100) = 10
    const maxDistance = 10;

    // 기본 점수: 거리를 0-100 점수로 변환 (거리 0 = 100점, 거리 10 = 0점)
    let score = Math.max(0, 100 - (weightedDistance / maxDistance) * 100);

    // ========== 보너스/패널티 적용 ==========

    // 크기 선호 보너스 (+10점)
    if (filters.preferredSize && breed.size === filters.preferredSize) {
      score += 10;
    }

    // 소음 걱정 패널티
    if (filters.noiseWorryLevel === 0 && breed.noiseLevel > 5) {
      score -= 15;  // 매우 걱정 + 시끄러운 품종 → 큰 패널티
    } else if (filters.noiseWorryLevel === 1 && breed.noiseLevel > 7) {
      score -= 10;  // 약간 걱정 + 매우 시끄러운 품종 → 패널티
    }

    // 약한 알레르기 시 저알레르기 보너스 (+8점)
    if (filters.allergyLevel === 1 && breed.hypoallergenic) {
      score += 8;
    }

    // 예산 부족 패널티
    const budgetMin = [25, 15, 10, 0][filters.budgetLevel] || 0;
    if (breed.monthlyCostMin > budgetMin + 5) {
      score -= 12;  // 예산 크게 초과
    } else if (breed.monthlyCostMin > budgetMin) {
      score -= 6;   // 예산 약간 초과
    }

    // 목적별 보너스 (+5점)
    if (filters.purpose === 'active' && breed.activity >= 7) score += 5;
    if (filters.purpose === 'emotional' && breed.affection >= 8) score += 5;
    if (filters.purpose === 'companion' && breed.sociability >= 7) score += 5;
    if (filters.purpose === 'observation' && breed.independence >= 6) score += 5;

    // 성격 선호 보너스 (+5점)
    const personalityPref = filters.personalityPref;
    if (personalityPref === 'active' && breed.activity >= 7) score += 5;
    if (personalityPref === 'gentle' && breed.activity <= 5 && breed.careDifficulty <= 5) score += 5;
    if (personalityPref === 'intelligent' && breed.trainability >= 8) score += 5;
    if (personalityPref === 'calm' && breed.activity <= 5 && breed.independence >= 6) score += 5;

    // 동물 타입 선호 보너스/패널티 (Q15, ±20점)
    // 강아지/고양이를 명확히 선호하는 경우 강력하게 반영
    if (filters.typePreference === 'dog') {
      if (breed.type === 'dog') score += 20;
      else score -= 15;  // 고양이는 패널티
    } else if (filters.typePreference === 'cat') {
      if (breed.type === 'cat') score += 20;
      else score -= 15;  // 강아지는 패널티
    }

    // 최종 점수 클램핑 (0-100 범위)
    return Math.min(100, Math.max(0, score));
  }

  /**
   * 매칭 이유 생성 - 왜 이 품종이 추천되었는지 설명
   * (결과 페이지의 "매칭 포인트" 섹션에 활용)
   */
  _getMatchReason(breed, userProfile, answers) {
    const reasons = [];
    const q1 = answers[0];  // 알레르기
    const q4 = answers[3];  // 집 비우는 시간
    const q6 = answers[5];  // 털 관리
    const q12 = answers[11]; // 성격 선호

    // 알레르기 관련
    if ((q1 === 0 || q1 === 1) && breed.hypoallergenic) {
      reasons.push('알레르기 걱정 없이 함께할 수 있는 저알레르기 품종');
    }

    // 독립성 관련
    if (q4 >= 1 && breed.independence >= 6) {
      reasons.push('혼자 있는 시간이 길어도 잘 견디는 독립적인 성격');
    }

    // 활동성 관련
    if (userProfile.activity >= 7 && breed.activity >= 7) {
      reasons.push('활동적인 라이프스타일에 완벽하게 맞는 에너지');
    } else if (userProfile.activity <= 4 && breed.activity <= 5) {
      reasons.push('조용하고 여유로운 생활 방식과 잘 어울리는 차분한 성격');
    }

    // 케어 관련
    if (q6 >= 2 && breed.careDifficulty <= 4) {
      reasons.push('간단한 관리만으로도 건강하게 키울 수 있는 손쉬운 품종');
    }

    // 훈련 관련
    if (userProfile.trainCapacity <= 4 && breed.trainability >= 8) {
      reasons.push('초보자도 쉽게 훈련할 수 있어 부담 없이 시작 가능');
    }

    // 성격 선호 관련
    const personalityLabels = ['활발', '온순', '영리', '차분하고 독립적'];
    if (q12 !== undefined) {
      reasons.push(`원하시는 ${personalityLabels[q12]}한 성격과 잘 맞는 품종`);
    }

    // 기본 이유 추가 (matchingPoints에서 가져옴)
    breed.matchingPoints.forEach(point => {
      if (reasons.length < 4) reasons.push(point);
    });

    // 최대 4개 반환
    return reasons.slice(0, 4);
  }
}

// ============================================================
// 3. TestPage 클래스 (테스트 페이지 UI)
// ============================================================

class TestPage {
  constructor() {
    this.answers = new Array(15).fill(null);  // 15개 답변 저장 (null=미답)
    this.currentPage = 1;   // 현재 페이지 (1 또는 2)
    this.totalPages = 2;

    this._render();
    this._bindEvents();
  }

  /** 전체 테스트 화면 렌더링 */
  _render() {
    this._renderProgressBar();
    this._renderQuestions();
    this._updateNavButtons();
  }

  /** 진행 바 업데이트 */
  _renderProgressBar() {
    // 답변된 질문 수
    const answered = this.answers.filter(a => a !== null).length;
    const percent = Math.round((answered / QUESTIONS.length) * 100);

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (progressFill) progressFill.style.width = percent + '%';
    if (progressText) progressText.textContent = `${answered}/${QUESTIONS.length}`;
  }

  /** 현재 페이지에 해당하는 질문들 렌더링 */
  _renderQuestions() {
    const container = document.getElementById('questionsContainer');
    if (!container) return;

    // 현재 페이지 질문 범위 계산 (1페이지: 1-7, 2페이지: 8-15)
    const startIdx = (this.currentPage - 1) * 7;
    const endIdx = this.currentPage < this.totalPages ? startIdx + 7 : QUESTIONS.length;
    const pageQuestions = QUESTIONS.slice(startIdx, endIdx);

    // 질문 HTML 생성
    container.innerHTML = pageQuestions.map(q => `
      <div class="question-card" id="question-${q.id}">
        <div class="question-header">
          <span class="question-number">Q${q.id}</span>
          <span class="question-emoji">${q.emoji}</span>
          <span class="question-category">${q.category}</span>
        </div>
        <p class="question-text">${q.text}</p>
        <div class="options-grid">
          ${q.options.map(opt => `
            <button
              class="option-btn ${this.answers[q.id - 1] === opt.value ? 'selected' : ''}"
              data-question="${q.id}"
              data-value="${opt.value}"
            >
              ${opt.label}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 페이지 표시 업데이트
    const pageIndicator = document.getElementById('pageIndicator');
    if (pageIndicator) {
      pageIndicator.textContent = `${this.currentPage} / ${this.totalPages}`;
    }

    // 애니메이션 효과
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    setTimeout(() => {
      container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 50);
  }

  /** 이벤트 바인딩 */
  _bindEvents() {
    // 답변 버튼 클릭 (이벤트 위임 방식)
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-btn')) {
        this._selectAnswer(
          parseInt(e.target.dataset.question),
          parseInt(e.target.dataset.value)
        );
      }

      // 다음 페이지 버튼
      if (e.target.id === 'btnNext') this._goNextPage();

      // 이전 페이지 버튼
      if (e.target.id === 'btnPrev') this._goPrevPage();
    });
  }

  /** 답변 선택 처리 */
  _selectAnswer(questionId, value) {
    // 답변 저장 (questionId는 1-14, 배열 인덱스는 0-13)
    this.answers[questionId - 1] = value;

    // 해당 질문의 버튼들 UI 업데이트
    const questionCard = document.getElementById(`question-${questionId}`);
    if (questionCard) {
      questionCard.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.toggle('selected', parseInt(btn.dataset.value) === value);
      });
    }

    // 진행 바 업데이트
    this._renderProgressBar();
    this._updateNavButtons();

    // 현재 페이지 전체 답변 완료 시 살짝 스크롤 유도
    const pageAnswered = this._isCurrentPageComplete();
    if (pageAnswered) {
      const navArea = document.getElementById('navButtons');
      if (navArea) navArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /** 현재 페이지의 모든 질문에 답변했는지 확인 */
  _isCurrentPageComplete() {
    const startIdx = (this.currentPage - 1) * 7;
    const endIdx = this.currentPage < this.totalPages ? startIdx + 7 : this.answers.length;
    return this.answers.slice(startIdx, endIdx).every(a => a !== null);
  }

  /** 네비게이션 버튼 상태 업데이트 */
  _updateNavButtons() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    if (btnPrev) {
      btnPrev.disabled = this.currentPage === 1;
    }

    if (btnNext) {
      const isComplete = this._isCurrentPageComplete();
      if (this.currentPage < this.totalPages) {
        btnNext.textContent = '다음 페이지 →';
        btnNext.disabled = !isComplete;
        btnNext.classList.remove('btn-submit');
      } else {
        btnNext.textContent = '결과 보기 🐾';
        // 2페이지 전체 완료 시만 활성화
        const allAnswered = this.answers.every(a => a !== null);
        btnNext.disabled = !allAnswered;
        btnNext.classList.add('btn-submit');
      }
    }
  }

  /** 다음 페이지 또는 결과 제출 */
  _goNextPage() {
    if (!this._isCurrentPageComplete()) {
      this._showIncompleteAlert();
      return;
    }

    if (this.currentPage < this.totalPages) {
      // 다음 테스트 페이지로 이동
      this.currentPage++;
      this._renderQuestions();
      this._updateNavButtons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 모든 답변 완료 → 결과 계산
      this._submitTest();
    }
  }

  /** 이전 페이지로 이동 */
  _goPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this._renderQuestions();
      this._updateNavButtons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /** 미완료 알림 표시 */
  _showIncompleteAlert() {
    const startIdx = (this.currentPage - 1) * 7;
    const endIdx = this.currentPage < this.totalPages ? startIdx + 7 : this.answers.length;
    const unanswered = [];
    for (let i = startIdx; i < endIdx; i++) {
      if (this.answers[i] === null) unanswered.push(i + 1);
    }

    // 미답변 질문 카드에 강조 표시
    unanswered.forEach(qId => {
      const card = document.getElementById(`question-${qId}`);
      if (card) {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 800);
      }
    });

    // 토스트 메시지
    this._showToast(`Q${unanswered.join(', Q')} 번 질문에 답해주세요! 😊`);
  }

  /** 토스트 메시지 표시 */
  _showToast(message) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /** 테스트 완료 - localStorage에 저장 후 결과 페이지로 이동 */
  _submitTest() {
    // 답변을 localStorage에 저장
    localStorage.setItem('petmate_answers', JSON.stringify(this.answers));
    localStorage.setItem('petmate_test_time', Date.now().toString());

    // 로딩 애니메이션 표시 후 이동
    const container = document.getElementById('questionsContainer');
    if (container) {
      container.innerHTML = `
        <div class="loading-screen">
          <div class="loading-spinner"></div>
          <p class="loading-text">당신에게 딱 맞는 반려동물을 찾고 있어요...</p>
          <p class="loading-sub">🐶 🐱 🐾 분석 중...</p>
        </div>
      `;
    }

    setTimeout(() => {
      window.location.href = 'result.html';
    }, 1800);
  }
}

// ============================================================
// 4. ResultPage 클래스 (결과 페이지 UI)
// ============================================================

class ResultPage {
  constructor() {
    // localStorage에서 답변 불러오기
    const savedAnswers = localStorage.getItem('petmate_answers');

    if (!savedAnswers) {
      // 답변이 없으면 테스트 페이지로 리디렉션
      window.location.href = 'test.html';
      return;
    }

    this.answers = JSON.parse(savedAnswers);
    this.matcher = new PetMatcher();

    // 매칭 실행 (상위 3개 품종)
    this.results = this.matcher.match(this.answers);

    if (this.results.length === 0) {
      this._showNoResults();
      return;
    }

    this.topMatch = this.results[0];    // 1순위
    this.otherMatches = this.results.slice(1);  // 2-3순위

    this._renderAll();
  }

  /** 전체 결과 페이지 렌더링 */
  _renderAll() {
    this._renderTopMatch();
    this._renderBarCharts();
    this._renderCareInfo();
    this._renderOtherMatches();
    this._bindEvents();
  }

  /** 1순위 품종 메인 카드 렌더링 */
  _renderTopMatch() {
    const breed = this.topMatch;
    const score = breed.matchScore;
    const stars = this._getStarRating(score);

    // 메인 사진 카드
    const petImage = document.getElementById('petImage');
    if (petImage) {
      petImage.src = breed.imageUrl;
      petImage.alt = breed.name;
      petImage.onerror = () => {
        // 이미지 로드 실패 시 이모지 플레이스홀더
        petImage.style.display = 'none';
        const placeholder = document.getElementById('petImagePlaceholder');
        if (placeholder) {
          placeholder.style.display = 'flex';
          placeholder.textContent = breed.emoji;
        }
      };

      // Wikipedia에서 더 선명한 얼굴 사진 비동기 로드
      fetchWikiImage(breed.id, 800).then(wikiUrl => {
        if (wikiUrl && petImage.isConnected) {
          const preload = new Image();
          preload.onload = () => { petImage.src = wikiUrl; };
          preload.src = wikiUrl;
        }
      });
    }

    // 품종명
    const petName = document.getElementById('petName');
    if (petName) petName.textContent = breed.name;

    // 부제
    const petSubtitle = document.getElementById('petSubtitle');
    if (petSubtitle) petSubtitle.textContent = '당신의 완벽한 파트너! ' + breed.emoji;

    // 매칭도 퍼센트
    const matchPercent = document.getElementById('matchPercent');
    if (matchPercent) {
      // 숫자 카운팅 애니메이션
      this._animateCount(matchPercent, 0, score, 1200);
    }

    // 별점
    const starRating = document.getElementById('starRating');
    if (starRating) starRating.innerHTML = stars;

    // 한 줄 설명
    const petDescription = document.getElementById('petDescription');
    if (petDescription) petDescription.textContent = breed.description;

    // 매칭 포인트 (왜 이 품종인지)
    const matchPoints = document.getElementById('matchPoints');
    if (matchPoints) {
      const reasons = breed.matchReason || breed.matchingPoints;
      matchPoints.innerHTML = reasons.slice(0, 4).map(r =>
        `<li><span class="point-icon">✅</span> ${r}</li>`
      ).join('');
    }

    // 품종 태그
    const petTags = document.getElementById('petTags');
    if (petTags) {
      petTags.innerHTML = breed.tags.map(tag =>
        `<span class="tag">${tag}</span>`
      ).join('');
    }

    // 월 예상 비용
    const monthlyCost = document.getElementById('monthlyCost');
    if (monthlyCost) {
      monthlyCost.textContent = `월 ${breed.monthlyCostMin}~${breed.monthlyCostMax}만원`;
    }
  }

  /** 별점 HTML 생성 (5점 만점) */
  _getStarRating(score) {
    // 100점 기준으로 5점 만점 별점 계산
    const starCount = Math.round((score / 100) * 5);
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= starCount ? 'filled' : 'empty'}">★</span>`;
    }
    return html;
  }

  /** 숫자 카운팅 애니메이션 */
  _animateCount(element, from, to, duration) {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic 완화 함수
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      element.textContent = current + '%';
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /** 성격 특징 막대 그래프 렌더링 (5개) */
  _renderBarCharts() {
    const breed = this.topMatch;

    // 5개 차원 데이터
    const traits = [
      { id: 'barActivity',     label: '활동성',      value: breed.activity,        color: '#cce7ff' },
      { id: 'barAffection',    label: '애교',        value: breed.affection,       color: '#f8d7da' },
      { id: 'barIndependence', label: '독립성',      value: breed.independence,    color: '#fff3cd' },
      { id: 'barCare',         label: '관리난이도',  value: breed.careDifficulty,  color: '#d4edda' },
      { id: 'barFriendly',     label: '친화력',      value: breed.friendliness,    color: '#e2d9f3' }
    ];

    const container = document.getElementById('traitBars');
    if (!container) return;

    container.innerHTML = traits.map(trait => `
      <div class="trait-item">
        <div class="trait-header">
          <span class="trait-label">${trait.label}</span>
          <span class="trait-value">${trait.value}/10</span>
        </div>
        <div class="trait-bar-bg">
          <div
            class="trait-bar-fill"
            id="${trait.id}"
            style="background-color: ${trait.color}; width: 0%"
            data-target="${trait.value * 10}"
          ></div>
        </div>
      </div>
    `).join('');

    // 막대 그래프 애니메이션 (DOM 렌더링 후 실행)
    setTimeout(() => {
      traits.forEach(trait => {
        const bar = document.getElementById(trait.id);
        if (bar) {
          bar.style.transition = 'width 1s ease-out';
          bar.style.width = (trait.value * 10) + '%';
        }
      });
    }, 300);
  }

  /** 케어 팁과 주의사항 렌더링 */
  _renderCareInfo() {
    const breed = this.topMatch;

    // 케어 팁 (3가지)
    const careTipsList = document.getElementById('careTipsList');
    if (careTipsList && breed.careTips) {
      careTipsList.innerHTML = breed.careTips.map(tip =>
        `<li><span class="tip-icon">💡</span> ${tip}</li>`
      ).join('');
    }

    // 주의사항 (2가지)
    const cautionsList = document.getElementById('cautionsList');
    if (cautionsList && breed.cautions) {
      cautionsList.innerHTML = breed.cautions.map(caution =>
        `<li><span class="caution-icon">⚠️</span> ${caution}</li>`
      ).join('');
    }
  }

  /** 2-3순위 품종 (모달 컨텐츠) 렌더링 */
  _renderOtherMatches() {
    const container = document.getElementById('otherMatchesList');
    if (!container || this.otherMatches.length === 0) return;

    container.innerHTML = this.otherMatches.map((breed, idx) => `
      <div class="other-match-card">
        <div class="other-match-rank">${idx + 2}순위</div>
        <img
          src="${breed.imageUrl.replace('1200/800', '200/200')}"
          alt="${breed.name}"
          class="other-match-img"
          data-breed-id="${breed.id}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
        >
        <div class="other-match-emoji-placeholder" style="display:none">${breed.emoji}</div>
        <div class="other-match-info">
          <div class="other-match-name">${breed.name} ${breed.emoji}</div>
          <div class="other-match-score">매칭도 ${breed.matchScore}%</div>
          <div class="other-match-desc">${breed.description}</div>
          <div class="other-match-tags">
            ${breed.tags.slice(0, 3).map(t => `<span class="tag tag-sm">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // 모달 썸네일도 Wikipedia 이미지로 교체
    this.otherMatches.forEach((breed) => {
      fetchWikiImage(breed.id, 200).then(wikiUrl => {
        if (!wikiUrl) return;
        const img = container.querySelector(`img[data-breed-id="${breed.id}"]`);
        if (img) {
          const preload = new Image();
          preload.onload = () => { img.src = wikiUrl; };
          preload.src = wikiUrl;
        }
      });
    });
  }

  /** 이벤트 바인딩 */
  _bindEvents() {
    // "다른 추천 품종 보기" 버튼
    const btnOther = document.getElementById('btnOtherMatches');
    if (btnOther) {
      btnOther.addEventListener('click', () => this._openModal());
    }

    // 모달 닫기 버튼
    const btnCloseModal = document.getElementById('btnCloseModal');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => this._closeModal());
    }

    // 모달 배경 클릭 시 닫기
    const modal = document.getElementById('otherMatchesModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this._closeModal();
      });
    }

    // 다시 테스트 버튼
    const btnRetry = document.getElementById('btnRetry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        localStorage.removeItem('petmate_answers');
        window.location.href = 'test.html';
      });
    }

    // 결과 공유 버튼
    const btnShare = document.getElementById('btnShare');
    if (btnShare) {
      btnShare.addEventListener('click', () => this._shareResult());
    }
  }

  /** 모달 열기 */
  _openModal() {
    const modal = document.getElementById('otherMatchesModal');
    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('modal-open'), 10);
    }
  }

  /** 모달 닫기 */
  _closeModal() {
    const modal = document.getElementById('otherMatchesModal');
    if (modal) {
      modal.classList.remove('modal-open');
      setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
  }

  /** 결과 공유 기능 */
  _shareResult() {
    const breed = this.topMatch;
    const text = `🐾 펫메이트 결과: 나와 ${breed.matchScore}% 매칭되는 "${breed.name}"! ${breed.description}`;

    if (navigator.share) {
      // 모바일 네이티브 공유
      navigator.share({ title: '펫메이트 결과', text, url: window.location.href });
    } else if (navigator.clipboard) {
      // 클립보드 복사
      navigator.clipboard.writeText(text).then(() => {
        this._showShareToast('결과가 클립보드에 복사되었어요! 📋');
      });
    } else {
      this._showShareToast('주소 창의 URL을 복사해서 공유해보세요! 🔗');
    }
  }

  /** 공유 토스트 메시지 */
  _showShareToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /** 결과 없을 때 화면 */
  _showNoResults() {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = `
        <div class="no-results">
          <div class="no-results-emoji">😢</div>
          <h2>매칭 결과를 찾지 못했어요</h2>
          <p>조건을 조금 완화하거나 테스트를 다시 시도해보세요.</p>
          <a href="test.html" class="btn-primary">테스트 다시 하기 🐾</a>
        </div>
      `;
    }
  }
}

// ============================================================
// 5. 페이지 초기화
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // body의 data-page 속성으로 페이지 구분
  const page = document.body.dataset.page;

  if (page === 'test') {
    // 테스트 페이지 초기화
    window.testPage = new TestPage();
  } else if (page === 'result') {
    // 결과 페이지 초기화 (약간의 딜레이로 부드러운 등장 효과)
    setTimeout(() => {
      window.resultPage = new ResultPage();
    }, 100);
  } else if (page === 'index') {
    // 인덱스 페이지 - 특별한 초기화 불필요
    // 시작 버튼에 호버 효과만 추가
    const startBtn = document.getElementById('btnStart');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        localStorage.removeItem('petmate_answers');
        window.location.href = 'test.html';
      });
    }
  }
});
