// This will validate if the title is compliant to the policy or not
export const validationText = (str) => {
  return str.length > 5 && str.length <= 60;
};
