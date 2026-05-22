import { useState, useEffect, useCallback } from 'react';

export function usePixelTypewriter(text, speed = 50, startDelay = 0, startImmediately = true) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(startImmediately);

  const start = useCallback(() => {
    setIsStarted(true);
    setDisplayText('');
    setIsComplete(false);
  }, []);

  const reset = useCallback(() => {
    setDisplayText('');
    setIsComplete(false);
    setIsStarted(false);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let timeout;
    let charIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, isStarted]);

  return { displayText, isComplete, start, reset };
}

export function useMultiLineTypewriter(lines, speed = 40, lineDelay = 300) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayLines, setDisplayLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    let charIndex = 0;
    const currentLine = lines[currentLineIndex];
    let timeout;

    const type = () => {
      if (charIndex <= currentLine.length) {
        setDisplayLines(prev => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.slice(0, charIndex);
          return updated;
        });
        charIndex++;
        timeout = setTimeout(type, speed);
      } else {
        timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);
      }
    };

    timeout = setTimeout(type, lineDelay);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, lines, speed, lineDelay]);

  return { displayLines, isComplete, currentLineIndex };
}
