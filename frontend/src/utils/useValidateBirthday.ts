export const useValidateBirthday = (value: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  if (value < today) {
    return "Please select a date that is not in the past.";
  }

  return true;
};
