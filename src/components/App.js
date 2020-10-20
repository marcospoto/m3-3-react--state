import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import Reacting, { useState } from "react";
import Words from "../data/words.json";

import { colors, contentWidth } from "./GlobalStyles";

// console.log(Words);
const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const checkGuess = (guess) => {
    let str = word.str.split("");
    if (!str.includes(guess)) {
      console.log("Wrong!");
      setWrongGuesses([...wrongGuesses, guess]);
    } else {
      let revealedLetters = word.revealed;
      let letterIndex = str.indexOf(guess);
      revealedLetters.splice(letterIndex, 1, guess);

      console.log("Right!");
      console.log(revealedLetters);

      setWord({
        ...word,
        revealed: revealedLetters,
      });
    }

    setUsedLetters([...usedLetters, guess]);
  };

  const setButtonText = () => {
    let text = "start";
    if (game.started) {
      text = "pause";
    } else if (word.str != "") {
      text = "continue";
    }
    return text;
  };

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    if (word.str === "") {
      getNewWord();
    }
  };

  const getNewWord = () => {
    let randomI = Math.floor(Math.random(Words) * 870);
    let randomWord = Words[randomI];
    let revealed = [];

    for (let i = 0; i < randomWord.length; i++) {
      revealed.push("");
    }

    setWord({ str: randomWord, revealed: revealed });
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{setButtonText()}</Button>
        <Button>btn 2</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} />
              <TheWord word={word} usedLetters={usedLetters} />
            </RightColumn>
          </Container>
          <Keyboard checkGuess={checkGuess} usedLetters={usedLetters} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
