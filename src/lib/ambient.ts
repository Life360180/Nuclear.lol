export type AmbientHandle = {
  start: () => Promise<void>;
  stop: () => void;
  setVolume: (value: number) => void;
};

function noiseBuffer(ctx: AudioContext, seconds = 2) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function createAmbient(kind: string, initialVolume = 0.45): AmbientHandle | null {
  if (!kind.startsWith("ambient:")) return null;
  const name = kind.slice("ambient:".length);
  if (!["drone", "rain", "pulse", "hum"].includes(name)) return null;

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let nodes: AudioNode[] = [];
  let interval: number | undefined;
  let volume = initialVolume;

  const stop = () => {
    if (interval) window.clearInterval(interval);
    interval = undefined;
    for (const node of nodes) {
      try {
        if ("stop" in node && typeof node.stop === "function") node.stop();
        node.disconnect();
      } catch {
        /* already stopped */
      }
    }
    nodes = [];
    if (ctx) void ctx.close().catch(() => undefined);
    ctx = null;
    master = null;
  };

  const start = async () => {
    stop();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);

    if (name === "rain") {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(ctx, 2.5);
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 900;
      const dry = ctx.createGain();
      dry.gain.value = 0.22;
      src.connect(filter);
      filter.connect(dry);
      dry.connect(master);
      src.start();
      nodes.push(src, filter, dry);
    }

    if (name === "drone" || name === "hum") {
      const freqs = name === "hum" ? [92, 138] : [55, 82.5];
      for (const f of freqs) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = 0.12;
        osc.connect(g);
        g.connect(master);
        osc.start();
        nodes.push(osc, g);
      }
    }

    if (name === "pulse") {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 48;
      const g = ctx.createGain();
      g.gain.value = 0.02;
      osc.connect(g);
      g.connect(master);
      osc.start();
      nodes.push(osc, g);
      const tick = () => {
        if (!ctx || !g) return;
        const now = ctx.currentTime;
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(0.02, now);
        g.gain.linearRampToValueAtTime(0.16, now + 0.08);
        g.gain.exponentialRampToValueAtTime(0.02, now + 1.4);
      };
      tick();
      interval = window.setInterval(tick, 1600);
    }

    if (ctx.state === "suspended") await ctx.resume();
  };

  return {
    start,
    stop,
    setVolume: (value: number) => {
      volume = Math.max(0, Math.min(1, value));
      if (master) master.gain.value = volume;
    },
  };
}
