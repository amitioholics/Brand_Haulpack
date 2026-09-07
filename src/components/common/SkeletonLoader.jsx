export default function SkeletonLoader({ rows = 3, height = 44 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height, borderRadius: 'var(--radius-md)' }}
        />
      ))}
    </div>
  );
}
