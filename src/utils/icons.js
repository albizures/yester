const icons = {
  fb: require('../assets/fb-no-oficial.png'),
  chevronRight: require('../assets/chevron/chevron-right.png'),
  chevronDown: require('../assets/chevron/chevron-down.png'),
  buttonPlus: require('../assets/plus-circle.png'),
  childhood: require('../assets/images/tmp-childhood.png'),
  ballon: require('../assets/images/fly-balloon.png'),
  emptyCard: require('../assets/images/tmp-emptyCard.png'),
  yester: require('../assets/images/tmp-yester.png'),
  feather: require('../assets/images/yester-feather.png'),
  flatFeather: require('../assets/feather.png'),
  check: require('../assets/chevron/check.png'),
  pencil: require('../assets/pencil-white.png'),
  onboarding1: require('../assets/onboarding/onboarding1.png'),
  onboarding2: require('../assets/onboarding/onboarding2.png'),
  onboarding3: require('../assets/onboarding/onboarding3.png'),
  confirmation: require('../assets/backgrounds/confirmation.png'),
  subscription: require('../assets/backgrounds/subscription.png'),
  logoWhite: require('../assets/logos/yester-logo-white.png'),
  header: require('../assets/backgrounds/header.png'),
  profileMan: require('../assets/images/profile/man.png'),
  profileWoman: require('../assets/images/profile/woman.png'),
  ageAdult: require('../assets/images/ages/adult.png'),
  ageChildTeen: require('../assets/images/ages/child-teen.png'),
  ageChildhood: require('../assets/images/ages/childhood.png'),
  ageElderly: require('../assets/images/ages/elderly.png'),
  ageFirstDays: require('../assets/images/ages/first-days.png'),
  ageTeenage: require('../assets/images/ages/teenage.png'),
  ageYoungAdult: require('../assets/images/ages/young-adult.png'),
  cardEducation: require('../assets/illustrations/cards/education.png'),
  cardFamily: require('../assets/illustrations/cards/family.png'),
  cardFriendship: require('../assets/illustrations/cards/friendship.png'),
  cardGrandparenthood: require('../assets/illustrations/cards/grandparenthood.png'),
  cardLife: require('../assets/illustrations/cards/life.png'),
  cardLove: require('../assets/illustrations/cards/love.png'),
  cardReligion: require('../assets/illustrations/cards/religion.png'),
  cardWork: require('../assets/illustrations/cards/work.png'),
}

export const ages = {
  'Age#01': icons.ageFirstDays,
  'Age#11': icons.ageChildhood,
  'Age#21': icons.ageTeenage,
  'Age#31': icons.ageChildTeen,
  'Age#41': icons.ageYoungAdult,
  'Age#51': icons.ageAdult,
  'Age#61': icons.ageElderly,
}

export const categories = {
  'Category#01': icons.cardFamily,
  'Category#02': icons.cardEducation,
  'Category#03': icons.cardFriendship,
  'Category#04': icons.cardGrandparenthood,
  'Category#05': icons.cardLife,
  'Category#06': icons.cardLove,
  'Category#07': icons.cardReligion,
  'Category#08': icons.cardWork,
}

export const getAgeIcon = id => {
  return ages[id] || icons.ageYoungAdult
}

export const getCategoryIllustration = id => {
  return categories[id] || icons.cardFamily
}

export default icons
