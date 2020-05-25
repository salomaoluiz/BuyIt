const generateUniqueID = () => {
  const idNumber = Math.random() * Math.pow(100, 10) ;

  const idString = idNumber.toString(16);

  return idString;
};

export { generateUniqueID };
