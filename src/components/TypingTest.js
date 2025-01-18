'use client';
import { useState, useEffect, useCallback } from 'react';

const sampleCode = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;

export default function TypingTest() {
  const [text, setText] = useState(sampleCode);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = userInput.length / 5; // standard word length
    const currentWpm = Math.round(wordsTyped / timeElapsed);
    
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    const currentAccuracy = Math.round((correctChars / userInput.length) * 100) || 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [startTime, userInput, text]);

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
    calculateStats();
  }, [userInput, startTime, calculateStats]);

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const getCharacterClass = (index) => {
    if (index === userInput.length) return 'character character-current';
    if (index > userInput.length) return 'character character-inactive';
    return userInput[index] === text[index] 
      ? 'character character-correct'
      : 'character character-incorrect';
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8 flex gap-4 text-lg">
        <div>WPM: {wpm}</div>
        <div>Accuracy: {accuracy}%</div>
      </div>
      
      <div className="font-mono text-lg bg-black/20 p-6 rounded-lg mb-4">
        {text.split('').map((char, index) => (
          <span key={index} className={getCharacterClass(index)}>
            {char}
          </span>
        ))}
      </div>

      <textarea
        className="w-full h-32 bg-black/20 text-foreground p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        value={userInput}
        onChange={handleInput}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
} 