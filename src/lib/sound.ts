/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Ambient Web Audio Synthesizer for Alba Clinic
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public play(fadeDuration = 1.0) {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.03, now + fadeDuration);
    this.masterGain.connect(this.ctx.destination);

    // Lowpass filter at 400 Hz
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(400, now);
    this.filter.connect(this.masterGain);

    // LFO for breathing cycle (8 seconds period = 1/8 = 0.125 Hz)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.125, now);
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(0.008, now); // Gentle breathing amplitude
    this.lfo.connect(this.lfoGain);

    // Osc 1: 174 Hz
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(174, now);

    const osc1Gain = this.ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.5, now);
    this.lfoGain.connect(osc1Gain.gain);
    this.osc1.connect(osc1Gain);
    osc1Gain.connect(this.filter);

    // Osc 2: 261 Hz
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(261, now);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.5, now);
    this.osc2.connect(osc2Gain);
    osc2Gain.connect(this.filter);

    // Start nodes
    this.lfo.start(now);
    this.osc1.start(now);
    this.osc2.start(now);

    this.isPlaying = true;
  }

  public stop(fadeDuration = 1.0) {
    if (!this.isPlaying || !this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);

    const osc1ToStop = this.osc1;
    const osc2ToStop = this.osc2;
    const lfoToStop = this.lfo;

    setTimeout(() => {
      try {
        osc1ToStop?.stop();
        osc2ToStop?.stop();
        lfoToStop?.stop();
        osc1ToStop?.disconnect();
        osc2ToStop?.disconnect();
        lfoToStop?.disconnect();
      } catch {
        // already stopped
      }
    }, fadeDuration * 1000 + 50);

    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new AmbientSoundManager();
