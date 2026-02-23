/**
 * 펫메이트 (PetMate) - 반려동물 품종 데이터베이스
 * 각 품종의 특성을 1-10점 척도로 정량화하여 매칭 알고리즘에서 활용
 *
 * 점수 기준:
 * - activity (활동성): 1=매우 조용함 ~ 10=매우 활발함
 * - sociability (사교성): 1=매우 독립적 ~ 10=매우 사교적
 * - careDifficulty (케어난이도): 1=매우 쉬움 ~ 10=매우 어려움
 * - trainability (훈련용이성): 1=훈련 어려움 ~ 10=훈련 매우 쉬움
 * - affection (애교): 1=냉담 ~ 10=매우 애교 많음
 * - independence (독립성): 1=주인 없으면 불안 ~ 10=혼자서도 잘 지냄
 * - friendliness (친화력): 1=경계심 강함 ~ 10=누구와도 잘 어울림
 * - noiseLevel (소음수준): 1=매우 조용 ~ 10=매우 시끄러움
 */

// 전역 품종 데이터베이스 - 강아지 10종 + 고양이 5종 = 총 15종
window.PETS_DATABASE = [

  // ====================================================================
  // 강아지 품종 (10종)
  // ====================================================================

  {
    id: 'golden-retriever',
    name: '골든 리트리버',
    nameEn: 'Golden Retriever',
    type: 'dog',            // 동물 종류
    emoji: '🐕',
    size: '대형',           // 초소형/소형/중형/대형
    weight: '25~34kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?golden+retriever+dog',

    // 성격 특성 점수 (1-10)
    activity: 8,            // 활발한 편 - 하루 1-2시간 운동 필요
    sociability: 9,         // 사람과 어울리기 좋아함
    careDifficulty: 6,      // 털 빠짐 많아 관리 필요
    trainability: 9,        // 매우 훈련하기 쉬움
    affection: 10,          // 최고 수준의 애교
    independence: 2,        // 혼자 두면 불안해함
    friendliness: 10,       // 누구와도 잘 어울림
    noiseLevel: 5,          // 보통 수준의 짖음

    // 알레르기/털 정보
    hypoallergenic: false,  // 저알레르기 아님
    lowShedding: false,     // 털 많이 빠짐

    // 월 예상 비용 (만원 단위)
    monthlyCostMin: 20,
    monthlyCostMax: 35,

    // 분류 태그
    tags: ['가족형', '활동적', '훈련 쉬움', '어린이 친화'],

    // 한 줄 설명
    description: '온 가족을 사랑으로 감싸주는 황금빛 파트너',

    // 성격 상세 설명
    personality: '온화하고 인내심이 강하며, 항상 밝고 쾌활한 성격. 사람을 좋아하고 어린이와 매우 잘 어울립니다.',

    // 이 품종이 잘 맞는 사람
    bestFor: ['활동적인 가족', '경험 있는 반려인', '넓은 공간 보유자'],

    // 매칭 포인트 (결과 페이지에서 "왜 이 품종인지" 설명용)
    matchingPoints: [
      '당신의 활동적인 라이프스타일에 완벽하게 맞는 에너지 넘치는 파트너입니다',
      '가족 모두를 사랑하는 천성이 있어 온 가족의 반려견으로 최고입니다',
      '훈련이 쉬워 첫 반려견으로도 부담 없이 시작할 수 있습니다',
      '풍부한 감수성으로 정서적 교감을 나누기에 이상적입니다'
    ],

    // 케어 팁 (3가지)
    careTips: [
      '하루 최소 1-2시간의 충분한 운동이 필요합니다. 산책과 함께 공 놀이를 즐겨보세요',
      '털이 많이 빠지므로 주 2-3회 브러싱이 필수입니다. 봄/가을 환모기에는 매일 빗질이 좋습니다',
      '물을 매우 좋아해서 수영이나 물 장난을 통한 운동도 훌륭한 활동이 됩니다'
    ],

    // 주의사항 (2가지)
    cautions: [
      '혼자 장시간 두면 분리불안이 심해져 집을 망가뜨릴 수 있습니다',
      '털 알레르기가 있는 가족이 있다면 신중하게 고려해주세요'
    ],

    // 적합한 주거 환경
    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상']
  },

  {
    id: 'bichon-frise',
    name: '비숑 프리제',
    nameEn: 'Bichon Frise',
    type: 'dog',
    emoji: '🐩',
    size: '소형',
    weight: '3~5kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?bichon+frise+white+dog',

    activity: 5,
    sociability: 8,
    careDifficulty: 7,      // 정기 미용 필요
    trainability: 7,
    affection: 9,
    independence: 3,
    friendliness: 9,
    noiseLevel: 4,

    hypoallergenic: true,   // 저알레르기 품종
    lowShedding: true,      // 털 잘 안 빠짐

    monthlyCostMin: 15,
    monthlyCostMax: 25,

    tags: ['저알레르기', '아파트 적합', '애교쟁이', '털 안 빠짐'],
    description: '알레르기 걱정 없이 사랑받는 하얀 솜사탕',
    personality: '명랑하고 호기심이 많으며, 사람을 무척 좋아하는 활발한 성격입니다.',
    bestFor: ['알레르기 있는 분', '아파트 거주자', '초보 반려인'],

    matchingPoints: [
      '알레르기 걱정 없이 마음껏 교감할 수 있는 저알레르기 품종입니다',
      '소형견으로 아파트 등 좁은 공간에서도 행복하게 생활할 수 있습니다',
      '사교적인 성격으로 가족 모두와 잘 어울리며 밝은 분위기를 만들어 줍니다',
      '초보 반려인도 무리 없이 함께할 수 있는 순한 성격의 소유자입니다'
    ],

    careTips: [
      '털이 계속 자라므로 4-6주마다 전문 미용이 필요합니다 (미용 비용 예산 책정 필수)',
      '털이 엉키지 않도록 가능하면 매일, 최소 주 3회 브러싱을 해주세요',
      '실내 활동만으로도 운동이 가능하지만 하루 30분 이상의 산책을 권장합니다'
    ],

    cautions: [
      '정기 미용 비용이 지속적으로 발생하므로 예산 계획이 필요합니다',
      '혼자 두는 시간이 길면 불안해하므로 분리 연습이 필요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'toy-poodle',
    name: '토이 푸들',
    nameEn: 'Toy Poodle',
    type: 'dog',
    emoji: '🐩',
    size: '초소형',
    weight: '2~3kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?toy+poodle+dog',

    activity: 6,
    sociability: 8,
    careDifficulty: 7,
    trainability: 10,       // 개 중 최고 수준 지능
    affection: 9,
    independence: 4,
    friendliness: 8,
    noiseLevel: 4,

    hypoallergenic: true,
    lowShedding: true,

    monthlyCostMin: 15,
    monthlyCostMax: 25,

    tags: ['저알레르기', '최고 지능', '훈련 천재', '원룸 OK'],
    description: '세상에서 가장 영리한 강아지, 훈련의 달인',
    personality: '매우 영리하고 민첩하며, 새로운 것을 빠르게 배우는 능력을 지닙니다. 주인과의 교감을 즐깁니다.',
    bestFor: ['알레르기 있는 분', '훈련에 관심 있는 분', '좁은 공간 거주자'],

    matchingPoints: [
      '세계 최고 수준의 지능으로 다양한 트릭과 훈련을 빠르게 배웁니다',
      '저알레르기 품종으로 알레르기 걱정 없이 함께할 수 있습니다',
      '초소형으로 원룸에서도 충분히 행복하게 생활할 수 있습니다',
      '주인과의 교감을 매우 좋아해 정서적 유대감이 깊어집니다'
    ],

    careTips: [
      '높은 지능을 활용할 수 있는 퍼즐 장난감이나 훈련으로 정신적 자극을 충분히 주세요',
      '털이 계속 자라므로 6-8주마다 전문 미용이 필요합니다',
      '작은 체구이지만 에너지가 넘쳐 하루 20-30분 이상의 산책과 놀이가 필요합니다'
    ],

    cautions: [
      '충분한 정신적 자극이 없으면 지루함으로 인한 문제행동이 생길 수 있습니다',
      '분리불안에 취약한 편이므로 혼자 있는 연습을 어릴 때부터 해주세요'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'welsh-corgi',
    name: '웰시 코기',
    nameEn: 'Welsh Corgi',
    type: 'dog',
    emoji: '🐕',
    size: '중형',
    weight: '10~14kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?welsh+corgi+dog',

    activity: 7,
    sociability: 8,
    careDifficulty: 6,
    trainability: 8,
    affection: 8,
    independence: 4,
    friendliness: 8,
    noiseLevel: 6,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 15,
    monthlyCostMax: 25,

    tags: ['귀여운 외모', '활발함', '가족형', '인터넷 스타'],
    description: '영국 왕실의 사랑을 받은 귀엽고 활발한 중형견',
    personality: '활발하고 용감하며, 자기주장이 강하고 유머 감각이 넘칩니다. 가족과의 교감을 즐깁니다.',
    bestFor: ['활동적인 가족', '중형견 원하는 분', '훈련 즐기는 분'],

    matchingPoints: [
      '딱 적당한 중형 크기로 활동성과 아파트 생활 모두 가능합니다',
      '귀엽고 유머러스한 성격으로 가족 모두에게 웃음을 선사합니다',
      '영리해서 훈련이 쉽고 다양한 명령을 잘 따릅니다',
      '활동적인 라이프스타일과 잘 맞는 에너지를 가졌습니다'
    ],

    careTips: [
      '하루 1시간 이상의 산책과 운동이 필요합니다 - 에너지가 많은 편입니다',
      '환모기(봄/가을)에 털이 엄청나게 빠지므로 매일 브러싱과 청소를 각오하세요',
      '식탐이 강해 비만해지기 쉬우므로 식이 관리와 운동을 꾸준히 해주세요'
    ],

    cautions: [
      '다리가 짧아 무릎 관절(슬개골) 건강에 특별한 주의와 정기검진이 필요합니다',
      '목양견 본능으로 아이들의 발꿈치를 물려는 행동이 나타날 수 있습니다 - 훈련 필요'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라']
  },

  {
    id: 'shiba-inu',
    name: '시바 이누',
    nameEn: 'Shiba Inu',
    type: 'dog',
    emoji: '🐕',
    size: '중형',
    weight: '7~11kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?shiba+inu+dog',

    activity: 7,
    sociability: 4,
    careDifficulty: 5,
    trainability: 5,        // 고집이 세어 훈련이 다소 어려움
    affection: 5,
    independence: 8,        // 혼자서도 잘 지냄
    friendliness: 5,
    noiseLevel: 4,          // 짖음은 적지만 고음의 특유 울음소리

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 15,
    monthlyCostMax: 25,

    tags: ['독립적', '고양이 같음', '청결함', '인터넷 밈 스타'],
    description: '고양이 같은 독립심을 가진 일본의 국보 견종',
    personality: '고집스럽고 독립적이며, 자신만의 방식으로 사랑을 표현합니다. 매우 청결한 편입니다.',
    bestFor: ['독립적 동물 원하는 분', '경험 있는 반려인', '조용한 환경 선호'],

    matchingPoints: [
      '고양이처럼 독립적인 성격으로 혼자 있는 시간이 길어도 잘 견딥니다',
      '청결함을 좋아하는 성격으로 위생 관리가 비교적 수월합니다',
      '조용한 편이라 소음 걱정이 적고 이웃과의 트러블이 줄어듭니다',
      '개성 넘치는 표정과 행동으로 매일 새로운 재미를 선사합니다'
    ],

    careTips: [
      '자기 영역 의식이 강하므로 충분한 개인 공간(쉬는 곳)을 마련해주세요',
      '환모기에 털이 엄청나게 빠집니다 - 이 시기에는 매일 브러싱이 필수입니다',
      '도주 본능이 강해 외출 시에는 반드시 목줄과 하네스를 착용시켜 주세요'
    ],

    cautions: [
      '훈련이 어렵고 고집이 세어 초보 반려인에게는 도전적일 수 있습니다',
      '낯선 개나 작은 동물에게 공격적으로 반응할 수 있어 사회화 교육이 중요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라']
  },

  {
    id: 'labrador',
    name: '래브라도 리트리버',
    nameEn: 'Labrador Retriever',
    type: 'dog',
    emoji: '🐕',
    size: '대형',
    weight: '25~36kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?labrador+retriever+dog',

    activity: 8,
    sociability: 10,        // 누구와도 최고 수준의 친화력
    careDifficulty: 5,
    trainability: 10,       // 가이드견으로 쓰일 만큼 훈련 최상위
    affection: 10,
    independence: 2,
    friendliness: 10,
    noiseLevel: 5,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 20,
    monthlyCostMax: 35,

    tags: ['세계 1위 인기견', '가이드견', '가족형', '훈련 천재'],
    description: '수십 년 동안 세계에서 가장 사랑받는 완벽한 가족 반려견',
    personality: '온화하고 인내심이 있으며, 모든 사람을 잠재적 친구로 여기는 긍정적인 성격입니다.',
    bestFor: ['가족', '활동적인 분', '초보 반려인'],

    matchingPoints: [
      '세계에서 가장 사랑받는 품종답게 누구와도 잘 어울리는 완벽한 파트너입니다',
      '뛰어난 훈련 능력으로 기본 예절부터 고급 트릭까지 빠르게 배웁니다',
      '온 가족을 동등하게 사랑하는 성격으로 완벽한 가족 반려견입니다',
      '긍정적이고 밝은 성격으로 집 안 분위기를 항상 활기차게 만들어 줍니다'
    ],

    careTips: [
      '에너지가 매우 넘쳐 하루 1-2시간 이상의 충분한 운동이 필수입니다',
      '음식을 매우 좋아해 비만이 되기 쉬우므로 규칙적인 식사량 관리가 중요합니다',
      '털이 많이 빠지므로 주 2-3회 브러싱과 정기적인 청소를 해주세요'
    ],

    cautions: [
      '혼자 오래 두면 지루함에 가구 파손 등의 파괴적 행동이 나타날 수 있습니다',
      '큰 체구로 좁은 공간에서는 생활이 불편하고 사고 위험이 높아집니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상']
  },

  {
    id: 'border-collie',
    name: '보더 콜리',
    nameEn: 'Border Collie',
    type: 'dog',
    emoji: '🐕',
    size: '중형',
    weight: '14~20kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?border+collie+dog',

    activity: 10,           // 개 중 최고 수준 에너지
    sociability: 7,
    careDifficulty: 7,
    trainability: 10,       // 가장 지능이 높은 견종
    affection: 8,
    independence: 5,
    friendliness: 7,
    noiseLevel: 5,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 15,
    monthlyCostMax: 30,

    tags: ['최고 지능', '운동 광', '훈련 천재', '어질리티 챔피언'],
    description: '개 중 가장 지능이 높고 에너지 넘치는 훈련의 마스터',
    personality: '매우 지능적이고 에너지가 넘치며, 목표 의식이 강하고 일하는 것을 즐깁니다.',
    bestFor: ['매우 활동적인 분', '훈련 전문가 지망생', '넓은 공간 보유자'],

    matchingPoints: [
      '개 중 가장 높은 지능으로 놀라운 트릭과 스포츠를 함께 즐길 수 있습니다',
      '높은 에너지로 달리기, 하이킹 등 모든 아웃도어 활동의 완벽한 파트너입니다',
      '훈련에 대한 열정이 넘쳐 함께 성장하는 즐거움을 선사합니다',
      '깊은 유대감을 형성하여 정말 특별한 파트너십을 경험할 수 있습니다'
    ],

    careTips: [
      '하루 최소 2시간의 강도 높은 운동과 정신적 자극이 절대적으로 필요합니다',
      '어질리티, 프리스비, 플라이볼 같은 도그 스포츠로 에너지를 발산시켜 주세요',
      '지능이 높아 퍼즐 피더, 노즈워크, 다양한 훈련으로 정신적 자극을 충분히 주세요'
    ],

    cautions: [
      '충분한 운동과 자극이 없으면 심각한 파괴 행동과 문제 행동이 나타납니다',
      '초보 반려인에게는 매우 도전적일 수 있으며 충분한 사전 공부가 필요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상']
  },

  {
    id: 'maltese',
    name: '말티즈',
    nameEn: 'Maltese',
    type: 'dog',
    emoji: '🐩',
    size: '초소형',
    weight: '2~4kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?maltese+dog',

    activity: 4,
    sociability: 8,
    careDifficulty: 7,      // 흰 털 관리가 까다로움
    trainability: 6,
    affection: 10,
    independence: 2,        // 분리불안 위험 높음
    friendliness: 8,
    noiseLevel: 6,

    hypoallergenic: true,
    lowShedding: true,

    monthlyCostMin: 12,
    monthlyCostMax: 20,

    tags: ['저알레르기', '아파트 최적', '애교왕', '귀여운 외모'],
    description: '눈처럼 하얀 털을 가진 사랑스러운 영원한 아기',
    personality: '애교가 넘치고 사랑스러우며, 주인에게 강한 유대감과 충성심을 보입니다.',
    bestFor: ['노인', '1인 가구', '아파트 거주자', '알레르기 있는 분'],

    matchingPoints: [
      '알레르기 걱정 없이 실내에서 함께 생활할 수 있는 저알레르기 품종입니다',
      '초소형으로 원룸에서도 충분히 행복하게 지낼 수 있습니다',
      '세상에서 가장 애교 넘치는 강아지 중 하나로 정서적 교감이 뛰어납니다',
      '조용한 편이라 아파트 생활에서 이웃과의 소음 트러블이 적습니다'
    ],

    careTips: [
      '하얀 긴 털이 더러워지지 않도록 꼼꼼한 관리와 정기적인 목욕이 필요합니다',
      '눈물 자국이 쉽게 생기므로 매일 눈 주변을 부드럽게 닦아주세요',
      '작은 체구이지만 하루 20-30분 이상의 산책은 꼭 필요합니다'
    ],

    cautions: [
      '아이들이 너무 거칠게 다루면 다칠 수 있어 어린 자녀와 함께할 때 주의가 필요합니다',
      '치아 문제가 잘 생기므로 주기적인 치아 관리와 수의사 검진이 중요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'chihuahua',
    name: '치와와',
    nameEn: 'Chihuahua',
    type: 'dog',
    emoji: '🐕',
    size: '초소형',
    weight: '1.5~3kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?chihuahua+dog',

    activity: 5,
    sociability: 5,
    careDifficulty: 4,      // 관리가 비교적 쉬움
    trainability: 5,
    affection: 8,           // 주인에게는 매우 다정함
    independence: 5,
    friendliness: 4,        // 낯선 사람에게는 경계
    noiseLevel: 7,          // 짖음이 많은 편

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 8,
    monthlyCostMax: 18,

    tags: ['세상 최소형', '경제적', '주인 충성', '용감한 심장'],
    description: '세상에서 가장 작지만 가장 대담한 용기의 소유자',
    personality: '용감하고 자신감이 넘치며, 주인에게는 깊은 충성심과 사랑을 보입니다.',
    bestFor: ['1인 가구', '노인', '원룸 거주자', '경제적 부담 줄이고 싶은 분'],

    matchingPoints: [
      '월 유지비가 가장 적어 경제적 부담이 적은 반려견입니다',
      '초소형으로 원룸, 오피스텔에서도 충분히 행복하게 생활합니다',
      '주인에 대한 충성심이 매우 강해 든든한 1인 가구의 파트너입니다',
      '관리가 비교적 간단해 처음 반려견을 맞이하는 분에게도 좋습니다'
    ],

    careTips: [
      '체온 조절이 어려워 겨울에는 반드시 옷을 입히고 실내 온도를 따뜻하게 유지해주세요',
      '치아가 약하므로 치아 관리와 정기 치과 검진이 중요합니다',
      '실내 활동만으로도 운동이 가능하지만 하루 20분 이상 산책을 권장합니다'
    ],

    cautions: [
      '소음에 예민하고 짖음이 많을 수 있어 이웃 민원에 주의가 필요합니다',
      '낯선 사람이나 큰 개에게 공격적으로 반응할 수 있어 사회화 교육이 중요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'pomeranian',
    name: '포메라니안',
    nameEn: 'Pomeranian',
    type: 'dog',
    emoji: '🐕',
    size: '초소형',
    weight: '1.4~3.2kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?pomeranian+dog',

    activity: 6,
    sociability: 7,
    careDifficulty: 6,
    trainability: 6,
    affection: 8,
    independence: 4,
    friendliness: 7,
    noiseLevel: 7,          // 짖음이 꽤 많은 편

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 12,
    monthlyCostMax: 20,

    tags: ['솜사탕 외모', '활발함', '귀여움 폭발', '빠른 학습'],
    description: '솜사탕 같은 외모에 활발하고 사랑스러운 성격의 소유자',
    personality: '외향적이고 활발하며, 사교적이고 자신감이 넘치는 즐거운 성격입니다.',
    bestFor: ['귀여운 외모 선호', '활발한 동반자 원하는 분', '아파트 거주자'],

    matchingPoints: [
      '세상에서 가장 귀여운 솜사탕 외모로 매일 힐링을 선사합니다',
      '활발하면서도 소형이라 아파트에서 충분히 행복하게 생활할 수 있습니다',
      '사교적인 성격으로 가족 모두와 잘 어울리며 분위기를 밝게 만듭니다',
      '영리해서 기본 훈련을 빠르게 습득하는 편입니다'
    ],

    careTips: [
      '이중모의 아름다운 털을 유지하려면 주 2-3회 꼼꼼한 브러싱이 필요합니다',
      '무릎뼈 탈구(슬개골 탈구) 예방을 위해 소파 등 높은 곳에서 뛰어내리지 않도록 주의하세요',
      '치아가 작아 문제가 생기기 쉬우므로 정기적으로 이를 닦아주세요'
    ],

    cautions: [
      '짖음이 많은 편으로 훈련을 통해 짖음을 조절하지 않으면 이웃 민원이 생길 수 있습니다',
      '환모기에 털이 엄청나게 빠지므로 이 시기를 마음의 준비를 하세요'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  // ====================================================================
  // 고양이 품종 (5종)
  // ====================================================================

  {
    id: 'russian-blue',
    name: '러시안 블루',
    nameEn: 'Russian Blue',
    type: 'cat',
    emoji: '🐱',
    size: '중형',
    weight: '3.5~6kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?russian+blue+cat',

    activity: 5,
    sociability: 5,
    careDifficulty: 3,      // 관리가 매우 쉬운 편
    trainability: 7,
    affection: 6,
    independence: 7,        // 혼자서도 잘 지냄
    friendliness: 5,
    noiseLevel: 2,          // 매우 조용함

    hypoallergenic: true,   // 저알레르기 고양이 대표 품종
    lowShedding: true,

    monthlyCostMin: 10,
    monthlyCostMax: 18,

    tags: ['저알레르기', '조용함', '우아함', '가족 충성'],
    description: '조용하고 우아한 귀족적 분위기의 회청색 고양이',
    personality: '조용하고 내성적이지만, 가족에게는 깊은 애정을 보입니다. 낯선 사람에게는 수줍어합니다.',
    bestFor: ['알레르기 있는 분', '조용한 환경 선호', '독립적인 동물 원하는 분'],

    matchingPoints: [
      '고양이 중 가장 저알레르기로 알려진 품종으로 알레르기 걱정을 크게 줄일 수 있습니다',
      '매우 조용한 성격으로 소음 걱정 없이 아파트에서 생활할 수 있습니다',
      '혼자 있는 시간을 잘 견뎌 바쁜 일상을 사는 분께 잘 맞습니다',
      '독립적이지만 가족에게는 충성스러워 특별한 유대감을 경험할 수 있습니다'
    ],

    careTips: [
      '짧고 촘촘한 이중모는 주 1-2회 브러싱만으로도 충분히 관리됩니다',
      '혼자 있는 시간을 즐기지만 하루 15-20분의 전용 놀이 시간을 꼭 마련해주세요',
      '신장 건강에 주의가 필요하므로 수분 섭취(습식 사료 권장)와 정기검진을 해주세요'
    ],

    cautions: [
      '낯선 사람에게 매우 수줍어하므로 손님 방문 시 숨어있을 수 있습니다',
      '환경 변화에 민감하게 반응하므로 이사나 큰 변화 시 적응 기간이 필요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'british-shorthair',
    name: '브리티시 숏헤어',
    nameEn: 'British Shorthair',
    type: 'cat',
    emoji: '🐱',
    size: '중형',
    weight: '4~8kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?british+shorthair+cat',

    activity: 4,
    sociability: 6,
    careDifficulty: 4,
    trainability: 6,
    affection: 6,
    independence: 7,
    friendliness: 7,
    noiseLevel: 2,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 10,
    monthlyCostMax: 20,

    tags: ['차분함', '독립적', '인형 같은 외모', '둥글둥글'],
    description: '인형처럼 둥글고 통통한 영국 귀족 고양이',
    personality: '차분하고 독립적이며, 강요받는 것을 싫어합니다. 본인이 원할 때 스킨십을 즐깁니다.',
    bestFor: ['바쁜 직장인', '독립적인 동물 원하는 분', '조용한 성격 선호'],

    matchingPoints: [
      '둥글고 인형 같은 외모로 보는 것만으로도 힐링이 되는 고양이입니다',
      '독립적인 성격으로 혼자 있는 시간을 잘 견뎌 바쁜 직장인에게 잘 맞습니다',
      '조용하고 차분해 소음 걱정 없이 아파트 생활이 가능합니다',
      '강압적이지 않은 느긋한 교감으로 서로 존중하는 관계를 만들 수 있습니다'
    ],

    careTips: [
      '비만에 매우 취약하므로 식이 관리(사료량 측정)와 적당한 운동이 중요합니다',
      '주 1-2회 브러싱으로 털 관리가 충분히 가능합니다',
      '인터랙티브 장난감을 이용한 규칙적인 놀이 시간으로 활동량을 유지해주세요'
    ],

    cautions: [
      '비만해지기 쉬운 체질로 체중 관리를 소홀히 하면 건강 문제가 생깁니다',
      '과한 스킨십을 싫어하므로 고양이가 원할 때 먼저 다가오도록 기다려주세요'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'bengal',
    name: '벵갈',
    nameEn: 'Bengal Cat',
    type: 'cat',
    emoji: '🐆',
    size: '중형',
    weight: '4~7kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?bengal+cat',

    activity: 9,            // 고양이 중 최고 수준 활동성
    sociability: 7,
    careDifficulty: 6,
    trainability: 8,
    affection: 7,
    independence: 5,
    friendliness: 7,
    noiseLevel: 6,

    hypoallergenic: false,
    lowShedding: true,

    monthlyCostMin: 15,
    monthlyCostMax: 25,

    tags: ['야생미 넘침', '활동적', '수영 좋아함', '영리함'],
    description: '야생 표범 무늬를 가진 활동적인 미니 치타',
    personality: '매우 활동적이고 호기심이 강하며, 물을 좋아하는 독특한 개성을 가진 고양이입니다.',
    bestFor: ['활동적인 분', '고양이 경험자', '넓은 공간 보유'],

    matchingPoints: [
      '야생의 아름다움을 집에서 즐길 수 있는 독보적인 외모를 가졌습니다',
      '물을 좋아하는 독특한 특성으로 매일 새로운 재미와 놀라움을 선사합니다',
      '영리하고 훈련 가능한 성격으로 여러 가지 트릭을 가르칠 수 있습니다',
      '활동적인 라이프스타일을 가진 분께 완벽하게 맞는 에너지를 가졌습니다'
    ],

    careTips: [
      '높은 에너지를 발산할 수 있는 충분한 놀이 시간(하루 30분 이상)이 꼭 필요합니다',
      '캣타워, 선반 등 높은 곳을 제공하고 다양한 환경 풍부화로 자극을 주세요',
      '물을 좋아하므로 워터 파운틴을 설치하면 수분 섭취와 놀이를 동시에 해결할 수 있습니다'
    ],

    cautions: [
      '충분한 활동과 자극이 없으면 가구나 물건을 파손하는 파괴적 행동이 나타납니다',
      '고양이 경험이 없는 초보자에게는 다소 도전적일 수 있습니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상']
  },

  {
    id: 'persian',
    name: '페르시안',
    nameEn: 'Persian Cat',
    type: 'cat',
    emoji: '🐱',
    size: '중형',
    weight: '3.5~7kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?persian+cat',

    activity: 3,            // 매우 조용하고 느긋함
    sociability: 5,
    careDifficulty: 9,      // 매일 빗질 필수 - 매우 높은 관리 난이도
    trainability: 5,
    affection: 7,
    independence: 6,
    friendliness: 6,
    noiseLevel: 2,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 15,
    monthlyCostMax: 30,

    tags: ['왕실 고양이', '차분함', '럭셔리', '풍성한 털'],
    description: '긴 털과 우아한 자태를 가진 고양이계의 귀족',
    personality: '온순하고 조용하며, 여유롭고 우아한 생활을 즐기는 고귀한 성격입니다.',
    bestFor: ['조용한 환경 선호', '미용에 시간 투자 가능한 분', '차분한 동물 원하는 분'],

    matchingPoints: [
      '조용하고 느긋한 성격으로 평화롭고 조용한 가정 분위기를 만들어 줍니다',
      '낮은 활동성으로 운동에 많은 시간을 내기 어려운 분께 잘 맞습니다',
      '우아하고 럭셔리한 외모로 집을 더욱 특별하게 만들어 줍니다',
      '온순한 성격으로 가정 내 다른 동물과도 비교적 잘 어울립니다'
    ],

    careTips: [
      '긴 털이 엉키지 않도록 매일 빗질이 필수입니다 - 시간 투자를 각오해야 합니다',
      '납작한 코로 인해 호흡기 건강 관리가 중요하며 정기 수의사 검진을 받아주세요',
      '눈물 분비가 많아 매일 눈 주변을 부드러운 천으로 닦아줘야 합니다'
    ],

    cautions: [
      '매일 그루밍에 상당한 시간이 필요해 바쁜 분에게는 부담이 될 수 있습니다',
      '호흡기와 신장 문제가 생기기 쉬우므로 정기 건강검진이 매우 중요합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  },

  {
    id: 'korean-shorthair',
    name: '코리안 숏헤어',
    nameEn: 'Korean Shorthair',
    type: 'cat',
    emoji: '🐱',
    size: '중형',
    weight: '3~5kg',
    imageUrl: 'https://source.unsplash.com/1280x720/?tabby+cat',

    activity: 6,
    sociability: 6,
    careDifficulty: 2,      // 관리가 가장 쉬운 품종 중 하나
    trainability: 6,
    affection: 6,
    independence: 8,        // 매우 독립적
    friendliness: 6,
    noiseLevel: 4,

    hypoallergenic: false,
    lowShedding: false,

    monthlyCostMin: 8,
    monthlyCostMax: 15,

    tags: ['경제적', '건강함', '독립적', '적응력 최강'],
    description: '천년의 역사를 가진 한국 토종 고양이, 튼튼하고 독립적',
    personality: '독립적이지만 영리하며, 적응력이 뛰어나고 건강한 체질을 가졌습니다.',
    bestFor: ['경제적 효율 원하는 분', '독립적 동물 원하는 분', '바쁜 직장인', '초보자'],

    matchingPoints: [
      '가장 경제적인 선택으로 월 유지비가 적어 부담이 가장 적습니다',
      '강인한 유전자로 건강 문제가 적어 장기적으로도 안심할 수 있습니다',
      '독립적인 성격으로 혼자 있는 시간이 길어도 잘 견뎌냅니다',
      '뛰어난 적응력으로 다양한 생활 환경에서 빠르게 적응합니다'
    ],

    careTips: [
      '짧은 털은 주 1회 가벼운 브러싱으로 충분히 관리됩니다',
      '운동 욕구를 채울 수 있는 장난감과 캣타워를 제공해 실내 환경을 풍부하게 해주세요',
      '튼튼하지만 중성화 후 비만 경향이 있으니 식이 관리에 주의해주세요'
    ],

    cautions: [
      '완전 실내 생활로 전환 시 충분한 환경 풍부화가 없으면 스트레스를 받을 수 있습니다',
      '개체에 따라 성격 편차가 크므로 만나보고 결정하는 것을 권장합니다'
    ],

    suitableSpaces: ['마당 있는 단독주택', '넓은 아파트 25평 이상', '일반 아파트/빌라', '원룸/오피스텔']
  }

]; // PETS_DATABASE 끝
