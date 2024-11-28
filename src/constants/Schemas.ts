import * as yup from 'yup';
import {Regx, validation} from './Constants';
import {Value} from './FixedValues';
import moment from 'moment';

export const loginSchemaWithEmail = yup.object().shape({
  email: yup
    .string()
    .required(validation.emailRequired)
    .email(validation.emailInvalid)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: validation.emailInvalid,
    }),
  password: yup
    .string()
    .required(validation.passwordRequired)
    .min(Value.CONSTANT_VALUE_8, validation.PASSWORD_MIN)
    .matches(Regx.SPECIAL_CHAR, {
      excludeEmptyString: true,
      message: validation.SPECIAL_CHAR,
    })
    .matches(Regx.ALPHA_CAP, {
      excludeEmptyString: true,
      message: validation.CAPSLOCK,
    })
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    })
    .matches(Regx.ALPHA_LOWER, {
      excludeEmptyString: true,
      message: validation.LOWER_CASE,
    }),
});
export const loginSchemaWithMobile = yup.object().shape({
  code: yup.string().required('Country Code is required'),
  mobileNumber: yup
    .string()
    .required('Mobile Number is required')
    .matches(Regx.MOBILE_REGEX, 'Invalid Mobile Number')
    .min(8, 'Mobile Number must be at least 8 digits long.')
    .max(15, 'Mobile Number should not exceed 15 digits in length.'),
  password: yup
    .string()
    .required(validation.passwordRequired)
    .min(Value.CONSTANT_VALUE_8, validation.PASSWORD_MIN)
    .matches(Regx.SPECIAL_CHAR, {
      excludeEmptyString: true,
      message: validation.SPECIAL_CHAR,
    })
    .matches(Regx.ALPHA_CAP, {
      excludeEmptyString: true,
      message: validation.CAPSLOCK,
    })
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    })
    .matches(Regx.ALPHA_LOWER, {
      excludeEmptyString: true,
      message: validation.LOWER_CASE,
    }),
});

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(validation.first_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_FIRST_NAME,
    }),
  lastName: yup
    .string()
    .required(validation.last_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_LAST_NAME,
    }),
  email: yup
    .string()
    .required(validation.emailRequired)
    .email(validation.emailInvalid)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: validation.emailInvalid,
    }),
  gender: yup
    .mixed()
    .test('is-object', validation.GENDER_REQUIRED, function (value) {
      // Ensure that the value is an object
      return typeof value === 'object' && value !== null;
    }),
  weight: yup.string().required(validation.WEIGHT_REQUIRED).matches(Regx.NUM, {
    excludeEmptyString: true,
    message: validation.NUM_PASS,
  }),
  heightft: yup
    .string()
    .required(validation.HEIGHT_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
  heightinch: yup
    .string()
    .required(validation.HEIGHT_INCH_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
  dob: yup
    .string()
    .required(validation.DOB_REQUIRED)
    .matches(Regx.DATE2, 'Invalid Date')
    .test(
      'valid_date',
      'Date of birth should be more than 18 years old.',
      function (value) {
        const minAge = 18;
        const currentDate = moment();
        const enteredDate = moment(value, 'DD/MM/YYYY', true);
        if (!enteredDate.isValid()) {
          return false;
        }
        const age = currentDate.diff(enteredDate, 'years');
        return age >= minAge;
      },
    ),
  code: yup.string().required('Country Code is required'),
  mobileNumber: yup
    .string()
    .required('Mobile Number is required')
    .matches(Regx.MOBILE_REGEX, 'Invalid Mobile Number'),
  password: yup
    .string()
    .required(validation.passwordRequired)
    .min(Value.CONSTANT_VALUE_8, validation.PASSWORD_MIN)
    .matches(Regx.SPECIAL_CHAR, {
      excludeEmptyString: true,
      message: validation.SPECIAL_CHAR,
    })
    .matches(Regx.ALPHA_CAP, {
      excludeEmptyString: true,
      message: validation.CAPSLOCK,
    })
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    })
    .matches(Regx.ALPHA_LOWER, {
      excludeEmptyString: true,
      message: validation.LOWER_CASE,
    }),
  confirmPassword: yup
    .string()
    .required(validation.CONFIRM_PASSWORD)
    .oneOf(
      [yup.ref('password'), null],
      'Password and Confirm Password should be same.',
    ),
  bloodGroup: yup.string().required(validation.Blood_GROUP_REQUIERED),
});

export const appointment = yup.object().shape({
  email: yup
    .string()
    .required(validation.emailRequired)
    .email(validation.emailInvalid)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: validation.emailInvalid,
    }),
});
export const insurancePayConsult = yup.object().shape({
  selectedDate: yup.string().required('Appointment date is required'),
  selectedTime: yup.string().required('Appointment time is required'),
  memberName: yup
    .string()
    .required(validation.member_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_FIRST_NAME,
    }),
  write_your_problem: yup.string().required('Please write your problem.'),
  // insurance: yup.string().required('Insurance is required'),
  policy_no: yup.string().required('Policy number is required'),
  policy_start: yup.string().required('Policy start date is required'),
  policy_end: yup.string().required('Policy end date is required'),
});
export const consultForm = yup.object().shape({
  selectedDate: yup.string().required('Appointment date is required'),
  selectedTime: yup.string().required('Appointment time is required'),
  memberName: yup
    .string()
    .required(validation.member_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_FIRST_NAME,
    }),
  write_your_problem: yup.string().required('Please write your problem.'),
});
export const forgotPassword = yup.object().shape({
  email: yup
    .string()
    .required(validation.emailRequired)
    .email(validation.emailInvalid)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: validation.emailInvalid,
    }),
});

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[0-9!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one number or special character',
    ),
  setPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Confirm Password must match with password',
    ),
});
export const validationMessages = [
  {
    isValid: 'length',
    message: 'Password must be at least 8 characters long.',
  },
  {
    isValid: 'uppercase',
    message: 'Password must contain at least one uppercase letter.',
  },
  {
    isValid: 'lowercase',
    message: 'Password must contain at least one lowercase letter.',
  },
  {
    isValid: 'numberOrSpecial',
    message: 'Password must contain at least one number or special character.',
  },
];

export const editProfile = yup.object().shape({
  firstName: yup
    .string()
    .required(validation.first_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_FIRST_NAME,
    }),
  lastName: yup
    .string()
    .required(validation.last_name)
    .transform(value => (value ? value.trim() : value))
    .max(30, validation.max_char)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: validation.INVALID_LAST_NAME,
    }),
  dob: yup.string().required(validation.DOB_REQUIRED),
  gender: yup.string().required(validation.GENDER_REQUIRED),
  email: yup.string().nullable().optional(),
  weight: yup.string().required(validation.WEIGHT_REQUIRED).matches(Regx.NUM, {
    excludeEmptyString: true,
    message: validation.NUM_PASS,
  }),
  heightft: yup
    .string()
    .required(validation.HEIGHT_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
  heightinch: yup
    .string()
    .required(validation.HEIGHT_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
  mobileNumber: yup.string().nullable().optional(),
  bloodGroup: yup.string().required(validation.Blood_GROUP_REQUIERED),
});

export const addMember = yup.object().shape({
  vchMemberRelation: yup.string().required('Relation is required'),
  vchMemberName: yup.string().required('Member Name is required'),
  bloodGroup: yup.string().required('Blood Group is required'),
  dtDob: yup
    .string()
    .required('Date of Birth is required')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Date of Birth should be in the format MM/DD/YYYY',
    ),
  vchMemberEmail: yup
    .string()
    .required('Email is required')
    .email('Invalid Email')
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: 'Invalid Email',
    }),
  vchMemberContactNo: yup
    .string()
    .required('Mobile Number is required')
    .matches(Regx.MOBILE_REGEX, 'Invalid Mobile Number'),
  calling_Code: yup.string().required('Country Code is required'),
  weight: yup.string().required('Weight is required').matches(Regx.NUM, {
    excludeEmptyString: true,
    message: 'Invalid Weight',
  }),
  heightFt: yup
    .string()
    .required(validation.HEIGHT_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
  heightInch: yup
    .string()
    .required(validation.HEIGHT_INCH_REQUIRED)
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: validation.NUM_PASS,
    }),
});
export const addInsuranceDetail = yup.object().shape({
  vchMemberName: yup.string().required('Member name is required'),
  insurance: yup.string().required('Insurance is required'),
  pOlicyNo: yup.string().required('Policy number is required'),
  policy_start: yup.string().required('Policy start date is required'),
  policy_end: yup.string().required('Policy end date is required'),
});

export const feedbackSuggestion = yup.object().shape({
  subject: yup.string().required('Subject is Required'),
  details: yup.string().required('Detail is Required'),
});

export const MedicineForm = yup.object().shape({
  name: yup.string().required('Name is required'),
  mobile_No: yup
    .string()
    .required('Mobile Number is required')
    .matches(Regx.MOBILE_REGEX, 'Invalid Mobile Number')
    .min(8, 'Mobile Number must be at least 8 digits long.')
    .max(15, 'Mobile Number should not exceed 15 digits in length.'),
  delivery_Address: yup.string().required('Address is required'),
  available_Date: yup.string().required('Preferred date is required'),
  supportive_care: yup.string().required('Supportive Care is required'),
  your_Email: yup
    .string()
    .required(validation.emailRequired)
    .email(validation.emailInvalid)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: validation.emailInvalid,
    }),
  query_Box: yup.string().required('Please write your query.'),
  post_operative_care: yup.string().required('Post Operative Care is Required'),
});

export const LabTestSchema = yup.object().shape({
  test: yup.string().required('Test is required'),
});

export const medicineScheduleChronic = yup.object().shape({
  medName: yup.string().required('Medicine name is required.'),
  medicineForm: yup.string().required('Please select a Medicine form.'),
  diseaseIllness: yup.string().required('Please select a Disease & Illness.'),
  frequencyDose: yup.string().required('Please select a dose'),
  startDate: yup.string().required('Please select a start date'),
  endDate: yup.string().required('Please select an end date'),
  doseTime: yup
    .array()
    .of(yup.string().required('Please select a dose time'))
    .min(1, 'Please select at least one dose time')
    .required('Please select a dose time'),
  note: yup.string().nullable().optional(),
});

export const addHistoryChronic = yup.object().shape({
  diseaseIllness: yup.string().required('Please select a Disease & Illness.'),
  diagnoseSince: yup.string().required('Please select a diagnosed date'),
  doctorName: yup.string().required('Doctor name is required.'),
  hospitalName: yup.string().required('Hospital/Clinic name is required.'),
  hospitalAddress: yup.string().required('Hospital address is required.'),
  note: yup.string().nullable().optional(),
});
