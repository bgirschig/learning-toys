import { audioHandler } from './utils/audioHandler';

import successTrumpet from './assets/success-trumpet.mp3';
import successBell from './assets/success-bell.mp3';

audioHandler.preloadSamples([successBell, successTrumpet]);

export function playsound(sampleUrl:string) {
  audioHandler.play(sampleUrl);
}
