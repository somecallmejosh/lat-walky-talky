import modelParams from '../models/porcupine_model_base64';

const porcupineModel = {
  base64: modelParams,
  forceWrite: true
};

(function () {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined")
    module.exports = porcupineModel;
})();
