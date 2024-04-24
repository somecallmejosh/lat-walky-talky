<script>
import { defineComponent } from 'vue'
import { usePorcupine } from '@picovoice/porcupine-vue'
import porcupineModel from '~/plugins/porcupineConfig'  // Adjust path as necessary
import { BuiltInKeyword } from '@picovoice/porcupine-web'

export default defineComponent({
  setup() {
    if (process.client) {
      const { state, init, start, stop, release } = usePorcupine();

    // Initialize Porcupine with your access key and the model
    init(process.env.PICOVOICE_KEY, [BuiltInKeyword.Porcupine], porcupineModel);

    return { state, start, stop, release };
    }
  }
});
</script>
<template>
  <div>
    <h1>Test Picovoice Page</h1>
  </div>
</template>
