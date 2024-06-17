const playerX = "X";
const playerO = "O";

const cases = document.querySelectorAll(".case");
let matriceCaseCases = new Array(3);
let k = 0;
for (let i = 0; i < 3; i++) {
  matriceCaseCases[i] = new Array(3);
  for (let j = 0; j < 3; j++) {
    matriceCaseCases[i][j] = cases[k];
    k++;
  }
}

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = player1;
    this.cases = document.querySelectorAll(".case");
  }

  verify() {}

  game() {
    this.cases.forEach((cas) => {
      cas.addEventListener(
        "click",
        () => {
          cas.innerHTML = `<h1>${this.turn}</h1>`;
          this.turn == this.player1
            ? (this.turn = this.player2)
            : (this.turn = this.player1);
          this.verify();
        },
        { once: true }
      );
    });

    document.querySelector("#reset").addEventListener("click", () => {
      this.restart();
      this.game();
    });
  }

  restart() {
    this.cases.forEach((div) => {
      div.innerHTML = "";
    });

    //pour supprimer les anciens event
    this.cases.forEach((cas) => {
      const newCas = cas.cloneNode(true);
      cas.parentNode.replaceChild(newCas, cas);
    });
    this.cases = document.querySelectorAll(".case");
    this.turn = this.player1;
  }
}

document.querySelector("#start").addEventListener("click", () => {
  new Game(playerX, playerO).game();
});
