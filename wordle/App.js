import { useState } from "react";
import { Button, Text, View, TextInput } from 'react-native';
import wordbank from "./wordbank";

export default function App() {
  const [correctword, setCorrectword] = useState(wordbank[Math.floor(Math.random() * wordbank.length)]);
  const [instructions, setInstructions] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [correctguess, setCorrectguess] = useState(false);
  const [wordguess, setWordguess] = useState("");
  const [guesslist, setGuesslist] = useState([]);

  const showInstructions = () => setInstructions(instructions => !instructions);

  const submitGuess = () => {
    let wordCheck = [0, 0, 0, 0, 0];
    let remaining_correct_letters = correctword.split("");
    let remaining_guess_letters = wordguess.split("");
    let c = 0;
    while (c < 5) {
      if (remaining_correct_letters[c] === remaining_guess_letters[c]) {
        wordCheck[c] = 3;
        remaining_correct_letters[c] = "!";
        remaining_guess_letters[c] = "!";
      }
      c++;
    }
    if (wordCheck.every(v => v === 3)) {
      setCorrectguess(true);
    }
    else {
      let w = 0;
      while (w < 5) {
        if (wordCheck[w] === 0 && !remaining_correct_letters.includes(remaining_guess_letters[w])) {
          wordCheck[w] = 1;
        }
        w++;
      }
      let i = 0;
      while (i < 5) {
        if (wordCheck[i] === 0) {
          let j = 0;
          while (j < 5) {
            if (remaining_guess_letters[i] === remaining_correct_letters[j]) {
              wordCheck[i] = 2;
              remaining_guess_letters[i] = "?";
              remaining_correct_letters[j] = "?";
              break;
            }
            j++;
          }
          if (wordCheck[i] === 0) {
            wordCheck[i] = 1;
          }
        }
        i++;
      }
      setAttempts(attempts => attempts + 1);
    }
    setGuesslist([
      ...guesslist,
      { attempt: attempts, guess: wordguess, check: wordCheck}
    ]);
  }

  const restartGame = () => {
    setAttempts(1);
    setCorrectguess(false);
    setGuesslist([]);
    setCorrectword(wordbank[Math.floor(Math.random() * wordbank.length)]);
  }

  return (
    <View style={{marginTop: 50}}>
      <View>
        <Text>Guess a 5-letter word:</Text>
        <TextInput
          onChangeText={guess => setWordguess(guess.toUpperCase())}
        />
        <Button
          title="Enter"
          disabled={wordguess.length != 5 || !/^[A-Za-z]+$/.test(wordguess) || correctguess || attempts > 6}
          onPress={submitGuess}
        />
        {!instructions && <Button 
          title="How to play"
          onPress={showInstructions}
        />}
        {instructions && <Button
          title="Close instructions"
          onPress={showInstructions}
        />}
      </View>
      <View>
        {guesslist.map(word => (
          <Text style={{fontSize: 50}} key={word.attempt}>
            {word.check[0] === 1 && <Text style={{color: 'red'}}>{word.guess[0]}</Text>}
            {word.check[0] === 2 && <Text style={{color: 'gold'}}>{word.guess[0]}</Text>}
            {word.check[0] === 3 && <Text style={{color: 'green'}}>{word.guess[0]}</Text>}
            {word.check[1] === 1 && <Text style={{color: 'red'}}>{word.guess[1]}</Text>}
            {word.check[1] === 2 && <Text style={{color: 'gold'}}>{word.guess[1]}</Text>}
            {word.check[1] === 3 && <Text style={{color: 'green'}}>{word.guess[1]}</Text>}
            {word.check[2] === 1 && <Text style={{color: 'red'}}>{word.guess[2]}</Text>}
            {word.check[2] === 2 && <Text style={{color: 'gold'}}>{word.guess[2]}</Text>}
            {word.check[2] === 3 && <Text style={{color: 'green'}}>{word.guess[2]}</Text>}
            {word.check[3] === 1 && <Text style={{color: 'red'}}>{word.guess[3]}</Text>}
            {word.check[3] === 2 && <Text style={{color: 'gold'}}>{word.guess[3]}</Text>}
            {word.check[3] === 3 && <Text style={{color: 'green'}}>{word.guess[3]}</Text>}
            {word.check[4] === 1 && <Text style={{color: 'red'}}>{word.guess[4]}</Text>}
            {word.check[4] === 2 && <Text style={{color: 'gold'}}>{word.guess[4]}</Text>}
            {word.check[4] === 3 && <Text style={{color: 'green'}}>{word.guess[4]}</Text>}
          </Text>
        ))}
      </View>
      <View>
        {correctguess && <Text>You guessed the word! Congratulations!</Text>}
        {attempts > 6 && <Text>The correct word is {correctword}</Text>}
        {(correctguess || attempts > 6) && <Text>Play again?</Text>}
        {(correctguess || attempts > 6) && <Button title="Play again" onPress={restartGame}/>}
      </View>
      <View>
        {instructions && <Text>
          Each guess must be a 5-letter word. You have 6 attempts to guess the correct word. {'\n'}
          <Text style={{color: 'green'}}>Green</Text> indicates the letter is in the correct slot. {'\n'}
          <Text style={{color: 'gold'}}>Yellow</Text> indicates the letter is in the correct word but in the wrong slot. {'\n'}
          <Text style={{color: 'red'}}>Red</Text> indicates the letter is not in the correct word.
        </Text>}
      </View>
    </View>
  );
}
