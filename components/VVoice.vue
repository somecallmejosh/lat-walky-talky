<template>
  <div>
    <h1>Speech Recognition</h1>
    <p>Status: {{ status }}</p>
    <p v-if="transcriptionActive">Transcript: {{ transcript }}</p>
    <p v-else>No transcription active. Say "hello" to start.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const status = ref('Idle');
const transcript = ref('');
const isSupported = ref(true);
const transcriptionActive = ref(false);
const wakeWord = "computer";
let bell = new Audio('/bell.mp3');
let recognition;

onMounted(() => {
  console.log("Component mounted, setting up speech recognition.");
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Speech recognition started.");
      status.value = 'Listening...';
      transcript.value = '';
    };

    recognition.onresult = event => {
      console.log("Result received.");
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      console.log("Heard:", result);

      if (result.toLowerCase().includes(wakeWord.toLowerCase()) && !transcriptionActive.value) {
        transcriptionActive.value = true;
        bell.play();
        return;
      }

      if (transcriptionActive.value) {
        transcript.value += result + ' ';
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended. Restarting...");
      recognition.start(); // Restart recognition to continuously listen
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
    };

    recognition.start();
  } else {
    console.error('Speech recognition is not supported in this browser.');
    isSupported.value = false;
  }
});

onUnmounted(() => {
  recognition.stop();
});
</script>
