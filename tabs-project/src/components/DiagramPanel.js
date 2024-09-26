import React, { useEffect, useRef, useState } from 'react';

const DiagramPanel = ({ activeTab }) => {
  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [activeRect, setActiveRect] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hoveredRect, setHoveredRect] = useState(null); // Track hovered rectangle

  // Function to draw the grid
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#ccc'; // Light gray grid lines
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 19) { // Grid in increments of 19px
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 19) { // Grid in increments of 19px
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
  };

  // Function to draw rectangles and their handles
  const drawRectangles = (ctx) => {
    ctx.strokeStyle = '#000'; // Black color for rectangles
    ctx.lineWidth = 2;

    rectangles.forEach((rect) => {
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
      if (hoveredRect === rect.id) {
        drawHandles(ctx, rect); // Draw handles only if hovered
      }
    });
  };

  // Function to draw resize handles
  const drawHandles = (ctx, rect) => {
    ctx.fillStyle = '#000'; // Color for handles
    const handleSize = 8;

    // Draw corner handles
    ctx.fillRect(rect.x - handleSize / 2, rect.y - handleSize / 2, handleSize, handleSize); // Top-left
    ctx.fillRect(rect.x + rect.width - handleSize / 2, rect.y - handleSize / 2, handleSize, handleSize); // Top-right
    ctx.fillRect(rect.x - handleSize / 2, rect.y + rect.height - handleSize / 2, handleSize, handleSize); // Bottom-left
    ctx.fillRect(rect.x + rect.width - handleSize / 2, rect.y + rect.height - handleSize / 2, handleSize, handleSize); // Bottom-right
  };

  // Function to get mouse position
  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  // Mouse down event handler
  const handleMouseDown = (evt) => {
    const canvas = canvasRef.current;
    const mousePos = getMousePos(canvas, evt);
    const rect = rectangles.find(r =>
      mousePos.x >= r.x && mousePos.x <= r.x + r.width &&
      mousePos.y >= r.y && mousePos.y <= r.y + r.height
    );

    if (rect) {
      setDragging(true);
      setActiveRect(rect.id);
      setMouseOffset({
        x: mousePos.x - rect.x,
        y: mousePos.y - rect.y,
      });
    } else {
      const handleArea = 8; // Handle size
      const handle = rectangles.find(r => {
        return (
          (mousePos.x >= r.x - handleArea / 2 && mousePos.x <= r.x + handleArea / 2 && mousePos.y >= r.y - handleArea / 2 && mousePos.y <= r.y + handleArea / 2) || // Top-left
          (mousePos.x >= r.x + r.width - handleArea / 2 && mousePos.x <= r.x + r.width + handleArea / 2 && mousePos.y >= r.y - handleArea / 2 && mousePos.y <= r.y + handleArea / 2) || // Top-right
          (mousePos.x >= r.x - handleArea / 2 && mousePos.x <= r.x + handleArea / 2 && mousePos.y >= r.y + r.height - handleArea / 2 && mousePos.y <= r.y + r.height + handleArea / 2) || // Bottom-left
          (mousePos.x >= r.x + r.width - handleArea / 2 && mousePos.x <= r.x + r.width + handleArea / 2 && mousePos.y >= r.y + r.height - handleArea / 2 && mousePos.y <= r.y + r.height + handleArea / 2) // Bottom-right
        );
      });

      if (handle) {
        setResizing(true);
        setActiveRect(rect.id);
      }
    }
  };

  // Mouse move event handler
  const handleMouseMove = (evt) => {
    const canvas = canvasRef.current;
    const mousePos = getMousePos(canvas, evt);
    
    if (dragging && activeRect) {
      setRectangles(prev =>
        prev.map(r =>
          r.id === activeRect
            ? { ...r, x: mousePos.x - mouseOffset.x, y: mousePos.y - mouseOffset.y }
            : r
        )
      );
    } else if (resizing && activeRect) {
      setRectangles(prev =>
        prev.map(r =>
          r.id === activeRect
            ? { ...r, width: mousePos.x - r.x, height: mousePos.y - r.y }
            : r
        )
      );
    } else {
      // Check for hover
      const hovered = rectangles.find(r =>
        mousePos.x >= r.x && mousePos.x <= r.x + r.width &&
        mousePos.y >= r.y && mousePos.y <= r.y + r.height
      );
      setHoveredRect(hovered ? hovered.id : null);
    }
  };

  // Mouse up event handler
  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
    setActiveRect(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawGrid(ctx, width, height);
    drawRectangles(ctx);

    // Event listeners for mouse actions
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rectangles, dragging, resizing, activeRect, mouseOffset, hoveredRect]);

  // Conditional rendering based on activeTab
  useEffect(() => {
    if (activeTab === 'Auxillaries Hook Up Diagram' || activeTab === 'Mold Temperature Maps') {
      // Rectangles for Auxillaries and Mold Temperature Maps
      setRectangles([
        { id: 'sleeping', x: 220, y: 250, width: 400, height: 100 },
        { id: 'standing', x: 350, y: 150, width: 150, height: 300 },
      ]);
    } else if (activeTab === 'Cavity Layout') {
      // Big rectangle for Cavity Layout
      setRectangles([
        { id: 'big', x: 100, y: 100, width: 600, height: 400 },
      ]);
    } else {
      // Clear rectangles for other tabs
      setRectangles([]);
    }
  }, [activeTab]);

  return (
    <canvas
      ref={canvasRef}
      width="1456"
      height="1000"
      style={{ border: '1px solid #000', background: '#e3ecef' }} // Lightish blue background
    ></canvas>
  );
};

export default DiagramPanel;
