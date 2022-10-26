function flipTheCoin() {
  const choice = ["Heads", "Tails"];
  return choice[Math.floor(Math.random() * choice.length)];
}
export default flipTheCoin;
