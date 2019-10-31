import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer } from 'react-konva';

const DEFAULT_WIDTH = 760;
const DEFAULT_HEIGHT = 480;
const DEFAULT_SCALE = 3;

export const SeatingStage = ({ children }) => {
  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);

  window.containerRef = containerRef;

  const [size, setSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    virtualWidth: DEFAULT_WIDTH
  });

  useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    };

    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }

    const resize = () => {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    };

    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const [scale, setScale] = React.useState(DEFAULT_SCALE);

  const performScale = useCallback(event => {
    // TODO: EXTRACT VALUES
    if (event.evt.deltaY < 0) {
      if (scale < 5) {
        setScale(scale + 1);
      }
    } else {
      if (scale > 1) {
        setScale(scale - 1);
      }
    }
  });

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "lightgrey",
        width: "100%",
        height: "100%"
      }}
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        draggable
        onWheel={performScale}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          {children}
        </Layer>
      </Stage>
    </div>
  );
}

export default SeatingStage;