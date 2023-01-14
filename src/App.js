import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const [color, setColor] = useState("");
  const canvasRef = useRef(null);
  const [startPoints, setStartPoints] = useState(null);
  const [size, setSize] = useState(5);

  const drawCircle = (x, y) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
      console.log(ctx);
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = `${color}`;
      ctx.fill();
      ctx.closePath();
    }
  };

  const drawLine = (x2, y2) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(startPoints.x, startPoints.y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${color}`;
    ctx.lineWidth = size * 2;
    ctx.stroke();
    ctx.closePath();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.rect(0, 0, 400, 400);
    ctx.fillStyle = `white`;
    ctx.fill();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        height="400"
        width="400"
        onMouseUp={() => {
          setStartPoints(null);
          console.log("released");
        }}
        onMouseDown={(e) => {
          console.log(e);
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          setStartPoints({ x, y });
          drawCircle(x, y);
        }}
        onMouseMove={(e) => {
          if (!startPoints) return;
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;
          drawCircle(x, y);
          drawLine(x, y);
          setStartPoints({ x, y });
          console.log("drawing", startPoints.x, x);
        }}
        style={{ background: "white", border: "5px solid slateblue" }}
      ></canvas>
      <div style={{ display: "flex" }}>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button onClick={clearCanvas}>Clear</button>
      </div>
    </>
  );
}
