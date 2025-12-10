const normalizeTag = (str) => {
  typeof str !== 'string' && (str = '');
  const lower = str.toLowerCase().trim();

  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export default normalizeTag;
