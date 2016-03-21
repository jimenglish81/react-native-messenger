const EMAIL = /\S+@\S+\.\S+/;
const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,9}$/;

export function validateEmail(email) {
  return EMAIL.test(email);
}

export function validatePassword(password) {
  return PASSWORD.test(password);
}
