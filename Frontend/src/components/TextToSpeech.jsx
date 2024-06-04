import React, { useState, useEffect } from "react";
import './TextToSpeech.css';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    const voices = synth.getVoices();
    const voice = voices.find((v) => v.lang === 'en-GB');

    if (voice) {
      u.voice = voice;
    }

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button className="tos-button" onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button className="tos-button" onClick={handlePause}>Pause</button>
      <button className="tos-button" onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;