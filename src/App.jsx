import React, { useState, useEffect } from "react";
const Turns = { X: "X", O: "O" };
//let newWinner = null;
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export const App = () => {
  const [board, setBoard] = useState(
    [...Array(3)].map(() => Array(3).fill(null))
  );

  const [turn, setTurn] = useState(Turns.X);
  const [winner, setWinner] = useState(null);

  const CheckWinner = (boardToCheck) => {
    const combos = [
      [boardToCheck[0][0], boardToCheck[0][1], boardToCheck[0][2]],
      [boardToCheck[1][0], boardToCheck[1][1], boardToCheck[1][2]],
      [boardToCheck[2][0], boardToCheck[2][1], boardToCheck[2][2]],
      [boardToCheck[0][0], boardToCheck[1][0], boardToCheck[2][0]],
      [boardToCheck[0][1], boardToCheck[1][1], boardToCheck[2][1]],
      [boardToCheck[0][2], boardToCheck[1][2], boardToCheck[2][2]],
      [boardToCheck[0][0], boardToCheck[1][1], boardToCheck[2][2]],
      [boardToCheck[0][2], boardToCheck[1][1], boardToCheck[2][0]],
    ];
    for (const combo of combos) {
      const [a, b, c] = combo;
      if (a && a === b && a === c) {
        return a;
      }
    }
    return null;
  };

  /*useEffect(() => {
    setWinner(newWinner);
    alert(`Winner ${newWinner}`);
  }, [newWinner]);*/
  const ResetGame = () => {
    setWinner(null);
    setBoard([...Array(3)].map(() => Array(3).fill(null)));
    setTurn(Turns.X);
  };

  const updateBoard = (indexItem) => {
    //Avoid updating the same board position twice
    if (board[indexItem[0]][indexItem[1]] || winner) return;
    //update the board position
    const newBoard = [...board];
    newBoard[indexItem[0]][indexItem[1]] = turn;
    setBoard(newBoard);
    //Change the turn
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    //Change the winner
    const newWinner = CheckWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((item, indexG) => {
          return (
            <div key={indexG}>
              {item.map((_, index) => {
                return (
                  <Square
                    key={index}
                    index={[indexG, index]}
                    updateBoard={updateBoard}
                  >
                    {board[indexG][index]}
                  </Square>
                );
              })}
            </div>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={ResetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};
