export default defineNuxtPlugin((nuxtApp) => {
  const porcupineModel = {
    publicPath: 'models/porcupine_model.pv',
    // Optionally use base64 if not using publicPath
    // base64: "BASE64_ENCODED_STRING_OF_THE_MODEL",
    customWritePath: 'custom_model_path',
    forceWrite: true,
    version: 1,
  };
})
