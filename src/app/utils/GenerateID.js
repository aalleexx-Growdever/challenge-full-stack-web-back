function getRandomInt(min = 100000, max = 110000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default getRandomInt;
