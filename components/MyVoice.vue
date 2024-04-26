<template>
  <div>
    <h1>Speech Recognition</h1>
    <p>Transcript: {{ transcript }}</p>
    <p>Click anywhere on the screen and say "computer" to start recording.</p>
  </div>
</template>

<script setup>

const isSpeechRecognitionSupported = ref(false);
const transcript = ref('');
let openSound = new Audio('/ding.mp3');
let closeSound = new Audio('/close.mp3');

onMounted(() => {
  // Check for browser support
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    isSpeechRecognitionSupported.value = true;

    // Initialize SpeechRecognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Start recognition when user presses a button or interacts with the screen
    document.addEventListener('click', startRecognition);
    document.addEventListener('touchstart', startRecognition);

    recognition.onresult = (event) => {
      const result = event.results[0][0];
      const resultTranscript = result.transcript.trim();
      transcript.value += resultTranscript + ' ';

      // Update transcript
      console.log('Transcript:', transcript.value);

      // Stop transcribing if user stops talking or says 'cancel'
      if (result.isFinal || resultTranscript.toLowerCase() === 'cancel') {
        recognition.stop();
        recognition.onresult = null; // Reset event listener
        startRecognition(); // Start listening for wake word again
        closeSound.play();
      }
    };

    function startRecognition() {
      // Start recognition
      recognition.start();

      // Listen for wake word
      recognition.onresult = (event) => {
        const result = event.results[0][0];
        const resultTranscript = result.transcript.toLowerCase();
        if (resultTranscript.includes('computer')) {
          // Begin transcribing user's speech
          openSound.play();
          console.log('Transcribing...');
          if (event.results[current].isFinal) {
            transcript.value += result + ' ';
          }
        }
      };
    }
  } else {
    // API not supported, display a message to the user
    console.error('SpeechRecognition API is not supported in this browser.');
  }
});
</script>
