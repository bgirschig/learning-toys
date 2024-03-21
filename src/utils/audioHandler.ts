export function makeAudioHandler() {
  const context = new AudioContext();
  const samples:{[key:string]: AudioBuffer} = {};

  window.addEventListener('click', ensureContextStarted);

  return {
    play,
    loadSample,
    preloadSamples,
  }

  function ensureContextStarted() {
    if (context.state !== 'running') return context.resume();
  }

  async function play(sampleUrl:string) {
    if (!samples[sampleUrl]) samples[sampleUrl] = await loadSample(sampleUrl);
    const source = context.createBufferSource();
    source.buffer = samples[sampleUrl];
    source.connect(context.destination);
    source.start();
  }

  async function preloadSamples(sampleUrls:string[]) {
    const promises = sampleUrls.map(async url => {
      samples[url] = await loadSample(url);
    });
    await Promise.all(promises);
  }
  
  async function loadSample(sampleUrl:string) {
    console.log("loading", sampleUrl);
    const response = await fetch(sampleUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(buffer);
    return audioBuffer;
  }
}

export const audioHandler = makeAudioHandler();

export type AudioHandler = ReturnType<typeof makeAudioHandler>;