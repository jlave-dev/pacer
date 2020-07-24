import Timer from './Timer';

const MS_PER_MINUTE = 60000;

export default class Speech {
  constructor({
    language = 'en-US',
    onend = null,
    onspeechstart = null,
    onspeechend = null,
    onresult = null,
  }) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error('SpeechRecognition not supported.');
    }
    this.recognition = new SpeechRecognition();
    this.timer = new Timer();

    this.language = language;
    this.onend = onend;
    this.onspeechstart = onspeechstart;
    this.onspeechend = onspeechend;
    this.onresult = onresult;

    this.initRecognitionHandlers();
    this.recognition.start();
  }

  initRecognitionHandlers() {
    this.recognition.onend = () => {
      if (this.onend) this.onend();
      this.recognition.start();
    };

    this.recognition.onspeechstart = () => {
      if (this.onspeechstart) this.onspeechstart();
      if (!this.timer.isActive) {
        this.timer.setStart();
        this.timer.isActive = true;
      }
    };

    this.recognition.onspeechend = () => {
      if (this.onspeechend) this.onspeechend();
      if (this.timer.isActive) {
        this.timer.setEnd();
        this.timer.isActive = false;
      }
    };

    this.recognition.onresult = ({ results }) => {
      const timeSinceLastEvent = this.timer.getDelta(); // ms
      if (timeSinceLastEvent <= 0) return;
      const { transcript } = results[0][0];
      const numberOfWords = transcript.split(' ').length - 1;
      if (numberOfWords <= 1) return;
      const wordsPerMinute =
        (numberOfWords / timeSinceLastEvent) * MS_PER_MINUTE;
      if (wordsPerMinute >= 300) return;
      if (this.onresult) this.onresult(wordsPerMinute, transcript);
    };
  }
}
