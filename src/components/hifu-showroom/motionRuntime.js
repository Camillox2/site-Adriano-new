// One scheduler and visibility observer. Initialized only in browser effects.
let runtime;
function createRuntime() {
  const jobs = new Map();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 760px)');
  let frame = 0;
  const eligible = job => job.visible && !job.paused && !document.hidden && !reduced.matches;
  const queue = () => {
    if (!frame && [...jobs.values()].some(job => job.render && eligible(job))) frame = requestAnimationFrame(tick);
  };
  const sync = job => {
    job.node.dataset.motionActive = String(eligible(job));
    job.node.dataset.motionState = reduced.matches ? 'reduced' : job.paused ? 'paused' : document.hidden ? 'hidden' : job.visible ? 'running' : 'offscreen';
    job.last = 0;
  };
  function tick(now) {
    frame = 0;
    for (const job of jobs.values()) {
      if (!job.render || !eligible(job)) continue;
      const fps = compact.matches ? Math.min(job.fps, 30) : job.fps;
      const interval = 1000 / (job.slow ? Math.min(fps, 30) : fps);
      if (job.last && now - job.last < interval - 1) continue;
      const delta = job.last ? Math.min((now - job.last) / 1000, .064) : 0;
      job.last = now;
      job.clock.current += delta;
      const started = performance.now();
      job.render(job.clock.current, delta, compact.matches);
      job.cost += performance.now() - started;
      if (++job.samples === 20) {
        const average = job.cost / 20;
        job.node.dataset.motionCost = average.toFixed(2);
        job.slow = average > 8;
        job.node.dataset.motionQuality = job.slow || compact.matches ? 'compact' : 'full';
        job.cost = 0; job.samples = 0;
      }
    }
    queue();
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const job = jobs.get(entry.target);
      if (job) { job.visible = entry.isIntersecting; sync(job); }
    }
    queue();
  }, { threshold: 0 });
  const change = () => {
    cancelAnimationFrame(frame); frame = 0;
    for (const job of jobs.values()) { sync(job); if (job.visible && job.render && reduced.matches) job.render(job.clock.current, 0, compact.matches); }
    queue();
  };
  document.addEventListener('visibilitychange', change);
  reduced.addEventListener('change', change);
  compact.addEventListener('change', change);
  return {
    add(node, render, options) {
      const job = { node, render, fps: options.fps || 60, paused: options.paused, clock: options.clock || { current: 0 }, visible: false, last: 0, cost: 0, samples: 0, slow: false };
      jobs.set(node, job); sync(job);
      render?.(job.clock.current, 0, compact.matches);
      observer.observe(node);
      return () => {
        observer.unobserve(node); jobs.delete(node);
        if (![...jobs.values()].some(item => item.render && eligible(item))) { cancelAnimationFrame(frame); frame = 0; }
        if (!jobs.size) {
          observer.disconnect(); document.removeEventListener('visibilitychange', change);
          reduced.removeEventListener('change', change); compact.removeEventListener('change', change);
          runtime = undefined;
        }
      };
    },
  };
}
export function animateScene(node, render, options = {}) {
  runtime ||= createRuntime();
  return runtime.add(node, render, options);
}
