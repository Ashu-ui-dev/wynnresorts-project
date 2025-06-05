export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  const phoneDigits = phoneNumber.replace(/\D/g, '');
  if (!phoneNumber) return 'Phone number is required';
  if (phoneDigits.length !== 9) return 'Phone number must be 9 digits';
  return null;
};

export const validateRequiredField = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
};

export const validateTermsAccepted = (termsAccepted: boolean): string | null => {
  if (!termsAccepted) return 'You must accept the terms and conditions';
  return null;
};
