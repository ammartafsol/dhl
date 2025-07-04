import { Commission_Schema } from "../formikSchema/formik-schemas";

export const LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_VALUES = {
  clinicName: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  state: "",
  country: "",
  address: "",
  latitude: "",
  longitude: "",
  phoneNumber: "",
  callingCode: "",
};

export const FORGET_PASSWORD_FORM_VALUES = {
  email: "",
};

export const RESET_PASSWORD_FORM_VALUES = {
  password: "",
  confirmPassword: "",
};

export const OTP_FORM_VALUES = {
  otp: "",
};

export const ADD_MERCHANT_VALUES = {
  image: null,
  fullName: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  postalCode: "",
  password: "",
  address: "",
  latitude: "",
  longitude: "",
};

export const CATEGORY_INITIAL = {
  category: "",
  isActive:'Active'
};


export const COMMISION = {
  commission:"",
}

export const DiscountCoupon = {
  buyer: [],
  discountCode:"",
  percentage:"",
  startedDate:"",
  endDate:""
}

export const GiftCard = {
  title: "",
  price: "",
  startDate: "",
  endDate: "",
  user: [],
  description: "",
  type:null
}

export const TYPE_INITIAL = {
  name: "",
  description: "",
  selectedUnits: [],
}
