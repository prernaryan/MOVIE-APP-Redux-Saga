import {Environment} from './enums';
// import Config from 'react-native-config';
import {ConstNumber} from './numbers';
const getBaseUrl = (environment: Environment): string => {
  return Config[environment] || '';
};
const SelectedEnvironment: Environment = Environment.QA;
export const FLAG_CDN_URL = 'https://flagcdn.com/w80/';
export const PNG_FORMAT = '.png';

export const baseUrl = 'https://jsonplaceholder.typicode.com/';
export enum KEYBOARD_TYPE {
  NumberPad = 'number-pad',
  EmailAddress = 'email-address',
  Default = 'default',
}

export enum RETURN_KEY_TYPE {
  Done = 'done',
  Next = 'next',
  Enter = 'enter',
  Search = 'search',
  Send = 'send',
}

export const SMALL_ICON_HIT_SLOP = {
  top: ConstNumber.VALUE_20,
  bottom: ConstNumber.VALUE_20,
  left: ConstNumber.VALUE_20,
  right: ConstNumber.VALUE_20,
};

export const DUMMY_CAROUSEL = [
  {id: 1, image: images.dummyCarousel},
  {id: 2, image: images.dummyCarouselTwo},
  {id: 3, image: images.dummyCarouselThree},
];

export interface DummyVideoType {
  id: number;
  thumbnail: any;
  title: string;
  author: string;
  isLiked: boolean;
}

export const DUMMY_EVENTS = [
  {
    id: 1,
    title: 'Basics in Statistics Part 2',
    date: '4th SEP',
    time: '04:00 pm - 8:00 pm',
  },
  {
    id: 2,
    title: 'Basics in Neurology Part 1',
    date: '20th AUG',
    time: '06:00 pm - 10:00 pm',
  },
  {
    id: 3,
    title: 'Advanced Biochemistry Part 4',
    date: '22nd JAN',
    time: '01:00 pm - 3:00 pm',
  },
];

export const STORAGE_KEY = {
  IS_INTERNATIONAL: 'IS_INTERNATIONAL',
  IS_LOGGED_WITH_EMAIL: 'IS_LOGGED_WITH_EMAIL',
  FIRST_TIME_LOGGING: 'FIRST_TIME_LOGGING',
};

export const webinarMessage = ({topic}: {topic: string}) => {
  const messageOne = `🎓 Join us for an insightful webinar on ${topic} hosted by DigiNerve! `;
  const messageTwo = `Learn from industry experts and expand your knowledge. `;
  const messageThree = `Don't miss out! 🚀 #DigiNerve #Webinar #LearningTogether`;
  return `${messageOne}${messageTwo}${messageThree}`;
};
export const voucherMessage = ({
  code,
  price,
}: {
  code: string;
  price: string;
}) => {
  const messageOne = `🎉 Here's your exclusive voucher code: ${code}!`;
  const messageTwo = ` Redeem it now at DigiNerve and enjoy ${price} off on our products/services. `;
  const messageThree = `Hurry, this offer won't last long! 🚀 #DigiNerve #Voucher #Discount`;
  return `${messageOne}${messageTwo}${messageThree}`;
};

export enum ModalAnimations {
  FADE_IN = 'fadeIn',
  FADE_OUT = 'fadeOut',
}

export enum ToggleButtonSizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}
