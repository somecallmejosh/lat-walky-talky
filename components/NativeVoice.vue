<template>
  <div>
    <h1>Speech Recognition</h1>
    <p>Status: {{ status }}</p>
    <button @click="startListening" :disabled="!isSupported">Start Listening</button>
    <button @click="stopListening" :disabled="!isSupported">Stop Listening</button>
    <p>Transcript: {{ transcript }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const status = ref('Idle');
const transcript = ref('');
const isSupported = ref(true);
let openSound = new Audio('/ding.mp3');
let closeSound = new Audio('/close.mp3');
let recognition;
onMounted(() => {
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onstart = () => {
        status.value = 'Listening...';
      };

      recognition.onresult = function(event) {

        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        if (event.results[current][0].transcript.includes('COMPUTER')) {
          openSound.play();
        }
        if (event.results[current].isFinal) {
          transcript.value += result + ' ';
        }

      };
      recognition.onend = () => {
        status.value = 'Stopped';
      };
    } else {
      console.error('Speech recognition is not supported in this browser.');
      isSupported.value = false;
    }
});
onUnmounted(() => {
  if (recognition) {
    recognition.stop();
  }
});
function startListening() {
  recognition.start();
  status.value = 'Listening...';
}
function stopListening() {
  recognition.stop();
  closeSound.play();
}
</script>
