let provider;
let signer;
let contract;

// Replace with your actual contract address from deployment
const contractAddress = "0x7402240A741bbF3b0fD8740965ba35Dd49b81610";

window.onload = async () => {
  if (!window.ethereum) {
    document.getElementById("status").innerText = "Please install MetaMask!";
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();

  const abi = await fetch("./abi.json").then(res => res.json());
  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("status").innerText = "✅ Wallet connected: " + (await signer.getAddress());
};

async function playGame() {
  const guess = parseInt(document.getElementById("guessInput").value);

  if (isNaN(guess) || guess < 0 || guess > 100) {
    document.getElementById("status").innerText = "❌ Invalid guess!";
    return;
  }

  try {
    document.getElementById("status").innerText = "⏳ Sending your guess...";

    const tx = await contract.play(guess);
    await tx.wait();

    document.getElementById("status").innerText = "⏳ Waiting for result...";

    contract.once("GameResult", (player, userGuess, random, win) => {
      document.getElementById("status").innerText =
        `🎲 You guessed ${userGuess}. Random was ${random}. You ${win ? "WON 🎉" : "LOST 💀"}`;
    });

  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Something went wrong!";
  }
}
y