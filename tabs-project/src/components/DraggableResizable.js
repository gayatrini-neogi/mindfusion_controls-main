import React, { useState } from 'react';
import './DraggableResizable.css';

const DraggableResizable = ({ shape, onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(shape.position);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResize = (e) => {
    const newSize = Math.max(10, shape.size + (e.movementY)); // Adjust size based on mouse movement
    onResize(shape.id, newSize);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`shape ${shape.type}`}
      style={{
        width: shape.size,
        height: shape.size,
        left: position.x,
        top: position.y,
        position: 'absolute',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleResize}
    >
      {/* Optional: Handle a separate resize handle here */}
    </div>
  );
};

export default DraggableResizable;
