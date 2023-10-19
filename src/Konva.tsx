import React, { Component, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Text } from "react-konva";

const Konva = () => {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  return (
    <div>
      <Stage style={{ border: "1px solid red" }} width={200} height={200}>
        <Layer>
          <Text
            text="Draggable Text"
            x={state.x}
            y={state.y}
            draggable
            fill={state.isDragging ? "green" : "black"}
            onDragStart={() => {
              setState((values) => ({
                isDragging: true,
                ...values,
              }));
            }}
            onDragEnd={(e) => {
              setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Konva;
