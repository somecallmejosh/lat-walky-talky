<template>
  <div>
    <h1>Recording</h1>
    <button @click="startSpeechRecognition" :disabled="isRecording">Start</button>
    <button @click="stopSpeechRecognition" :disabled="!isRecording">Stop</button>
    <div  v-if="transcript">
    <h2>Transcript:</h2>
    <code>
      {{ transcript }}
    </code>
    </div>
  </div>
</template>

<script>
  export default defineComponent ({
    data() {
      return {
        recognition: null,
        isRecording: false,
        openSound: new Audio('/open.mp3'),
        closeSound: new Audio('/close.mp3'),
        transcript: ''
      };
    },
    methods: {
      initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onresult = event => {
          const current = event.resultIndex;
          const result = event.results[current][0].transcript;
          if (event.results[current][0].transcript.includes('COMPUTER')) {
            this.openSound.play();
          }
          if (event.results[current].isFinal) {
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
        };
      },
      startSpeechRecognition() {
        this.initializeSpeechRecognition();
        this.recognition.start();
        console.log('Speech Recognition Started');
        this.isRecording = true;
      },

      stopSpeechRecognition() {
        if (this.recognition) {
          this.recognition.stop();
        }
      },
    }
  })
</script>
