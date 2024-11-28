export enum Environment {
  DEV = 'DEV',
  QA = 'QA',
  STAGE = 'STAGE',
  PRODUCTION = 'PRODUCTION',
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum fieldsName {
  phoneNumber = 'phoneNumber',
  password = 'password',
  fullName = 'fullName',
  email = 'email',
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  confirmPasssord = 'confirmPassword',
  institute = 'institute',
  city = 'city',
  state = 'state',
  specialization = 'specialization',
  collegeName = 'collegeName',
}

export enum reactQueryKeys {
  loginWithMobile = 'loginWithMobile',
  verifyOtp = 'verifyOtp',
  resendOtp = 'resendOtp',
  register = 'register',
  loginWithEmail = 'loginWithEmail',
  forgotPassword = 'forgotPassword',
  changePassword = 'changePassword',
  category = 'category',
  specialization = 'specialization',
  college = 'college',
  state = 'state',
  city = 'city',
  profileUpdate = 'profileUpdate',
  webinar = 'webinar',
}

export enum popUpType {
  success = 'success',
  danger = 'danger',
  info = 'info',
}

export enum zustandPersistKey {
  userProfile = 'userProfile',
  course = 'course',
}

export enum asyncStorageKey {
  isUserLoggedIn = 'isUserLoggedIn',
}

export enum dataType {
  image = 'image',
  text = 'text',
}
export enum appState {
  inactive = 'inactive',
  active = 'active',
}
