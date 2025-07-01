export default function Loading() {
  const colors = [
    'bg-[#929D25]',
    'bg-[#0067A5]',
    'bg-[#58AFD6]',
    'bg-[#eb8b2d]',
    'bg-[#E15E36]',
  ];

  return (
    <div className="flex gap-16">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`animate-slide-dot h-16 w-16 rounded-full ${color}`}
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
