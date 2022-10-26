function rollTheDie() {
  const choice = new Array(6).fill(0).map((v, i) => i + 1);
  return choice[Math.floor(Math.random() * choice.length)];
}
export default rollTheDie;
