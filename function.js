const playerX = "X";
const playerO = "O";

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = player1;
    this.cases = document.querySelectorAll(".case");
  }

  removEvent() {
    this.cases.forEach((cas) => {
      cas.removeEventListener("click", () => {
        cas.innerHTML = `<h1 class='${this.turn}'>${this.turn}</h1>`;
        this.turn == this.player1
          ? (this.turn = this.player2)
          : (this.turn = this.player1);
      });
    });
  }

  game() {
    this.cases.forEach((cas) => {
      cas.addEventListener(
        "click",
        () => {
          cas.innerHTML = `<h1 class='${this.turn}'>${this.turn}</h1>`;
          this.turn == this.player1
            ? (this.turn = this.player2)
            : (this.turn = this.player1);

          if (this.verify(this.setupMatrice()) == false) {
            this.finish();
          }
        },
        { once: true }
      );
    });

    document.querySelector("#reset").addEventListener("click", () => {
      this.restart();
      this.game();
    });
  }

  finish() {
    document.querySelector("#reset").addEventListener("click", () => {
      this.restart();

      this.game();
    });
  }
  //creation d'une matrice qui contient les position des X et O
  setupMatrice() {
    let matriceCaseCases = new Array(3);
    let k = 0;
    for (let i = 0; i < 3; i++) {
      matriceCaseCases[i] = new Array(3);
      for (let j = 0; j < 3; j++) {
        if (this.cases[k].firstChild) {
          if (this.cases[k].firstChild.classList.contains("X")) {
            matriceCaseCases[i][j] = "X";
          } else {
            matriceCaseCases[i][j] = "O";
          }
        }
        k++;
      }
    }
    return matriceCaseCases;
  }

  // verifier si une matrice est vide retourne true si elle l'est
  isEmptyMatrice(matrice) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrice[i][j] == null) {
          return true;
        }
      }
    }
    return false;
  }

  verify(matriceGameBoard) {
    let tabScore = [0, 0];
    let tabScoreDiagonal = [0, 0]; // case 0 pour X et case 1 pour O diagonal
    let tabScoreAntiDiagonal = [0, 0]; // case 0 pour X  et case 1 pour 1
    let matriceLigne = [
      [0, 0],
      [0, 0],
      [0, 0],
    ]; // colonne 0 pour pour le X
    let matriceColonne = [
      [0, 0],
      [0, 0],
      [0, 0],
    ]; // colonne 0 pour X

    // check diagonal
    for (let i = 0; i < 3; i++) {
      if (matriceGameBoard[i][i]) {
        if (matriceGameBoard[i][i] == "X") {
          if (tabScoreDiagonal[1] == 0) {
            tabScoreDiagonal[0]++;
          } else {
            break;
          }
        } else {
          if (tabScoreDiagonal[0] == 0) {
            tabScoreDiagonal[1]++;
          } else {
            break;
          }
        }
      }
    }

    //check anti diagonal
    for (let i = 0; i < 3; i++) {
      if (matriceGameBoard[i][2 - i]) {
        if (matriceGameBoard[i][2 - i] == "X") {
          if (tabScoreAntiDiagonal[1] == 0) {
            tabScoreAntiDiagonal[0]++;
          } else {
            break;
          }
        } else {
          if (tabScoreAntiDiagonal[0] == 0) {
            tabScoreAntiDiagonal[1]++;
          } else {
            break;
          }
        }
      }
    }

    // pour la verification des ligne

    for (let i = 0; i < 3; i++) {
      if (matriceGameBoard[0][i]) {
        if (matriceGameBoard[0][i] == "X") {
          if (matriceLigne[0][1] == 0) {
            matriceLigne[0][0]++;
          }
        } else {
          if (matriceLigne[0][0] == 0) {
            matriceLigne[0][1]++;
          }
        }
      }
      if (matriceGameBoard[1][i]) {
        if (matriceGameBoard[1][i] == "X") {
          if (matriceLigne[1][1] == 0) {
            matriceLigne[1][0]++;
          }
        } else {
          if (matriceLigne[1][0] == 0) {
            matriceLigne[1][1]++;
          }
        }
      }
      if (matriceGameBoard[2][i]) {
        if (matriceGameBoard[2][i] == "X") {
          if (matriceLigne[2][1] == 0) {
            matriceLigne[2][0]++;
          }
        } else {
          if (matriceLigne[2][0] == 0) {
            matriceLigne[2][1]++;
          }
        }
      }
    }

    // pour la verification des colonnes

    for (let i = 0; i < 3; i++) {
      if (matriceGameBoard[i][0]) {
        if (matriceGameBoard[i][0] == "X") {
          if (matriceColonne[0][1] == 0) {
            matriceColonne[0][0]++;
          }
        } else {
          if (matriceColonne[0][0] == 0) {
            matriceColonne[0][1]++;
          }
        }
      }
      if (matriceGameBoard[i][1]) {
        if (matriceGameBoard[i][1] == "X") {
          if (matriceColonne[1][1] == 0) {
            matriceColonne[1][0]++;
          }
        } else {
          if (matriceLigne[1][0] == 0) {
            matriceLigne[1][1]++;
          }
        }
      }
      if (matriceGameBoard[i][2]) {
        if (matriceGameBoard[i][2] == "X") {
          if (matriceColonne[2][1] == 0) {
            matriceColonne[2][0]++;
          }
        } else {
          if (matriceColonne[2][0] == 0) {
            matriceColonne[2][1]++;
          }
        }
      }
    }

    if (
      tabScoreAntiDiagonal[0] == 3 ||
      tabScoreDiagonal[0] == 3 ||
      matriceLigne[0][0] == 3 ||
      matriceLigne[1][0] == 3 ||
      matriceLigne[2][0] == 3 ||
      matriceColonne[0][0] == 3 ||
      matriceColonne[1][0] == 3 ||
      matriceColonne[2][0] == 3
    ) {
      document.querySelector(".winnerMsg").innerHTML = "X is the winner";
      return false;
    } else if (
      tabScoreAntiDiagonal[1] == 3 ||
      tabScoreDiagonal[1] == 3 ||
      matriceLigne[0][1] == 3 ||
      matriceLigne[1][1] == 3 ||
      matriceLigne[2][1] == 3 ||
      matriceColonne[0][1] == 3 ||
      matriceColonne[1][1] == 3 ||
      matriceColonne[2][1] == 3
    ) {
      document.querySelector(".winnerMsg").innerHTML = "O is the winner";
      return false;
    } else if (this.isEmptyMatrice(matriceGameBoard) == false) {
      document.querySelector(".winnerMsg").innerHTML = "egalite";
      return false;
    }

    return true;
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
