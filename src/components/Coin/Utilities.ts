function flipTheCoin(): "Heads" | "Tails" {
  const choice: ["Heads", "Tails"] = ["Heads", "Tails"];
  return choice[Math.floor(Math.random() * choice.length)];
}
export default flipTheCoin;
