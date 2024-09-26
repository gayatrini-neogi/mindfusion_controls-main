import React, { useState } from 'react';
import SidebarTools from './SidebarTools'; // Make sure the path is correct
import DraggableResizable from './DraggableResizable'; // Make sure the path is correct
import './Canvas.css';

const Canvas = () => {
  const [shapes, setShapes] = useState([]);

  const handleToolSelect = (tool) => {
    console.log('Selected tool:', tool); // Log the selected tool
    const newShape = {
      id: Date.now(),
      type: tool,
      size: 50,
      position: { x: 100, y: 100 }, // Default position
    };
    setShapes([...shapes, newShape]);
  };

  const handleResize = (id, newSize) => {
    setShapes(shapes.map(shape => shape.id === id ? { ...shape, size: newSize } : shape));
  };

  return (
    <div className="canvas">
      {shapes.map((shape) => (
        <DraggableResizable
          key={shape.id}
          shape={shape}
          onResize={handleResize}
        />
      ))}
      <SidebarTools onToolSelect={handleToolSelect} /> {/* Ensure this line is correct */}
    </div>
  );
};

export default Canvas;
