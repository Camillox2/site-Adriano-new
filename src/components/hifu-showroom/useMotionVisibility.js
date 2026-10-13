import { useEffect } from 'react';
import { animateScene } from './motionRuntime';

export default function useMotionVisibility(ref, paused) {
  useEffect(() => !window.__PRERENDER__ && ref.current ? animateScene(ref.current, null, { paused }) : undefined, [ref, paused]);
}
