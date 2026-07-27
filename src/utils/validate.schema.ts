import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password cần tối thiểu 6 ký tự")
    .max(50, "Password tối đa 50 ký tự")
    .required("Password không được để trống"),
  email: Yup.string()
    .email("Định dạng email không hệ lệ")
    .required("Email không được để trống"),
});

export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password cần tối thiểu 6 ký tự")
    .max(50, "Password tối đa 50 ký tự")
    .required("Password không được để trống"),
  email: Yup.string()
    .email("Định dạng email không hệ lệ")
    .required("Email không được để trống"),
  name: Yup.string().required("Họ tên không được để trống"),
});

export const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required("Họ tên không được để trống"),
  phone: Yup.string().required("Số điện thoại không được để trống"),
});

export const UpdateUserPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "currentPassword cần tối thiểu 6 ký tự")
    .max(50, "currentPassword tối đa 50 ký tự")
    .required("currentPassword không được để trống"),
  newPassword: Yup.string()
    .min(6, "newPassword cần tối thiểu 6 ký tự")
    .max(50, "newPassword tối đa 50 ký tự")
    .required("newPassword không được để trống"),

  confirmNewPassword: Yup.string()
    .required("confirmNewPassword không được để trống")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
