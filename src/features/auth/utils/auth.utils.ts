const PASSWORD_RESET_KEY = "password_reset";
const PASSWORD_RESET_REQUIRED_KEY = "password_reset_required";

export const validateId = (userID: string) =>
  userID.length >= 4 && userID.length <= 20;

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/;
  return passwordRegex.test(password);
};

export const validatePasswordMatch = (
  password: string,
  passwordConfirmation: string,
) => password === passwordConfirmation;

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) =>
  /^010-\d{4}-\d{4}$/.test(phoneNumber);

export const completePasswordReset = () => {
  localStorage.removeItem(PASSWORD_RESET_KEY);
  localStorage.removeItem(PASSWORD_RESET_REQUIRED_KEY);
};
