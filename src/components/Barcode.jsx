import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export default function Barcode({ value, width = 2, height = 40, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, value, {
        format: "CODE128",
        width,
        height,
        displayValue: false,
        margin: 0,
        background: "transparent",
        lineColor: "currentColor"
      });
    }
  }, [value, width, height]);

  return <canvas ref={canvasRef} className={className} />;
}
