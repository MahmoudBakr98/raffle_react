export default function Slice({
  i,
  center,
  anglePerSlice,
  radius,
  name,
  color,
}: {
  i: number;
  center: number;
  anglePerSlice: number;
  radius: number;
  name: string;
  color: string;
}) {
  const startAngle = i * anglePerSlice;
  const endAngle = (i + 1) * anglePerSlice;
  const largeArc = anglePerSlice > 180 ? 1 : 0;

  const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
  const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
  const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
  const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

  const labelAngle = startAngle + anglePerSlice / 2;
  const lx = center + (radius / 2) * Math.cos((labelAngle * Math.PI) / 180);
  const ly = center + (radius / 2) * Math.sin((labelAngle * Math.PI) / 180);
  const textRotation = labelAngle;

  return (
    <>
      <path
        d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`}
        fill={color}
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="10px"
        fontWeight="bold"
        style={{
          transform: `rotate(${textRotation + 90}deg)`,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        {name}
      </text>
    </>
  );
}
