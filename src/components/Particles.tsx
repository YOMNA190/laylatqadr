import { useParticles } from '../hooks/useParticles';

export function Particles() {
  const canvasRef = useParticles();

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
