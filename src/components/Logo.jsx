export default function Logo({ className = "h-9 w-9", style }) {
  return (
    <img
      src="/logo.png"
      alt="LAX360 Ventures logo"
      className={`${className} object-contain`}
      style={style}
      draggable={false}
    />
  );
}
