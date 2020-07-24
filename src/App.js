import React, { useEffect, useState } from 'react';
import { useStorage } from './hooks';
import Gauge from './components/Gauge';
import Transcript from './components/Transcript';
import Speech from './lib/Speech';
import './App.scss';
import Navbar from './components/Navbar';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [, setSpeechRecognition] = useState(null);
  const [settings, setSettings] = useStorage(
    { language: navigator.language, showTranscript: false },
    'settings'
  );
  const [transcript, setTranscript] = useState('');
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    const newSpeechRecognition = new Speech({
      language: settings.language,
      onresult: (wpmResult, transcriptResult) => {
        // eslint-disable-next-line no-console
        console.log(wpmResult, transcriptResult);
        setWpm(wpmResult);
        setTranscript(transcriptResult);
      },
      onspeechstart: () => {
        setIsListening(true);
      },
      onspeechend: () => {
        setIsListening(false);
      },
    });
    setSpeechRecognition(newSpeechRecognition);
  }, [settings.language]);

  function onChangeSetting(setting) {
    return (event) => {
      if (setting === 'language') {
        const { value } = event.target;
        setSettings((previousSettings) => {
          return { ...previousSettings, language: value };
        });
      }
      if (setting === 'showTranscript') {
        const { checked } = event.target;
        setSettings((previousSettings) => {
          return { ...previousSettings, showTranscript: checked };
        });
      }
    };
  }

  return (
    <div className="App">
      <Navbar settings={settings} onChangeSetting={onChangeSetting} />

      <main className="container">
        <div className="gauge-container">
          {settings.showTranscript && <Transcript text={transcript} />}
          <Gauge wpm={wpm} />
          <div
            className={`listening-indicator line-scale-pulse-out ${
              isListening ? '' : 'has-opacity-0'
            }`}
          >
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
