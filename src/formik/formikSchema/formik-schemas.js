import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const signUpSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic Name is required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  country: Yup.string().optional(),
  address: Yup.string().optional(),
  latitute: Yup.string().optional(),
  longitute: Yup.string().optional(),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .optional(),
  callingCode: Yup.string().optional(),
});

export const ForgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  // phoneNumber: Yup.number("Invalid").required("Phone number name is required"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string().required("New password is required"),
  reEnterNewPassword: Yup.string()
    .required("Re-enter new password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
export const VerifyOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must contain only digits")
    .required("OTP is required"),
});

export const addMerchantSchema = (slug) =>
  Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),

    postalCode: Yup.string().required("Postal code is required"),
    password: Yup.string().when({
      is: () => !slug,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    address: Yup.string().required("Address is required"),
  });

export const CategorySchema = Yup.object().shape({
  category: Yup.string()
    .min(3, "Category must be at least 3 characters")
    .required("Category is required"),
});

export const Commission_Schema = Yup.object().shape({
  commission : Yup.string()
  .required('Commission is required')
})

export const DiscountCouponSchema = Yup.object().shape({
  buyer: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required('Label is required'),
        value: Yup.string().required('Value is required')
      })
    )
    .min(1, 'Please select at least one buyer')
    .required('Buyer selection is required'),
  discountCode: Yup.string().required('Discount code is required'),
  percentage: Yup.string().required('Percentage is required'),
  startedDate: Yup.string()
    .required('Started date is required')
    .test('is-future', 'Start date must be in the future', function(value) {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  endDate: Yup.string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function(value) {
      const { startedDate } = this.parent;
      if (!value || !startedDate) return false;
      return new Date(value) > new Date(startedDate);
    })
});

export const GiftCardSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.string().required('Price is required'),
  startDate: Yup.string()
    .required('Start date is required')
    .test('is-future', 'Start date must be in the future', function(value) {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  endDate: Yup.string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function(value) {
      const { startDate } = this.parent;
      if (!value || !startDate) return false;
      return new Date(value) > new Date(startDate);
    }),
  type: Yup.object()
    .shape({
      label: Yup.string().required('Label is required'),
      value: Yup.string().required('Value is required')
    })
    .required('Type selection is required'),
  user: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required('Label is required'),
        value: Yup.string().required('Value is required')
      })
    )
    .when('type', {
      is: (type) => type?.value === 'private',
      then: (schema) => schema.min(1, 'Please select at least one user').required('User selection is required'),
      otherwise: (schema) => schema.notRequired()
    })
});

export const TypeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Type name must be at least 2 characters')
    .required('Type name is required'),
  description: Yup.string()
    .test('min-length-if-provided', 'Description must be at least 10 characters', function(value) {
      if (!value || value.trim() === '') return true; // Allow empty
      return value.length >= 10; // If provided, must be at least 10 characters
    })
    .optional(),
  selectedUnits: Yup.array()
    .of(
      Yup.object().shape({
        slug: Yup.string().required('Unit slug is required'),
        name: Yup.string().required('Unit name is required')
      })
    )
    .min(1, 'Please select at least one unit')
    .required('At least one unit must be selected')
});
