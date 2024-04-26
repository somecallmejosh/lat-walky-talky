<template>
  <client-only>
    <div>
      <h1>Recording Status: {{ status }}</h1>
      <button @click="startSpeechRecognition" :disabled="isRecording">Start</button>
      <button @click="stopSpeechRecognition" :disabled="!isRecording">Stop</button>
      <div v-if="transcript">
        <h2>Transcript:</h2>
        <code>
          {{ transcript }}
        </code>
      </div>
    </div>
  </client-only>
</template>

<script>
  export default defineComponent ({
    data() {
      return {
        audioPlayBackErrorMessage: 'Audio playback failed:',
        closeSound: new Audio('/close.mp3'),
        isRecording: false,
        openSound: new Audio('/ding.mp3'),
        openSoundPlayed: false,
        recognition: null,
        sleepWord: 'cancel',
        status: 'Idle', // 'Listening...', 'Idle',
        transcript: '',
        wakeWord: 'computer'
      };
    },
    mounted() {
      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        this.initializeSpeechRecognition();
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    },
    methods: {
      audioPlay() {
        this.openSoundPlayed = true;
      },
      initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onresult = event => {
          const current = event.resultIndex;
          const result = event.results[current][0].transcript;
          if (result.toLowerCase().includes(this.wakeWord)) {
            this.openSound.play();
            this.openSoundPlayed = true;
            this.status = 'Listening...';
          }

          if (result.toLowerCase().includes(this.sleepWord)) {
            this.stopSpeechRecognition();
          }

          if (this.openSoundPlayed && event.results[current].isFinal) {
            this.transcript += result + ' ';
          }
        };

        this.recognition.onerror = event => {
          console.error('Speech Recognition Error:', event.error);
        };

        this.recognition.onend = () => {
          console.log('Speech Recognition Stopped');
          this.isRecording = false;
          this.closeSound.play();
          this.openSoundPlayed = false;
        };
      },
      startSpeechRecognition() {
        this.initializeSpeechRecognition();
        this.recognition.start();
        this.isRecording = true;
      },
      stopSpeechRecognition() {
        if (this.recognition) {
          this.recognition.stop();
          this.status = 'Idle';
        }
      },
    }
  })
</script>
