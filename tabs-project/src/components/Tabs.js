import React, { useState } from 'react';
import './Tabs.css'; // Importing CSS for styling
import AuxillariesHookUpDiagram from './AuxillariesHookUpDiagram'; // Importing the component

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Auxillaries Hook Up Diagram');
  const [showBottomTabs, setShowBottomTabs] = useState([]); // For bottom tabs
  const [zoomLevel, setZoomLevel] = useState(100); // State to track zoom level

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (tabName === 'Auxillaries Hook Up Diagram') {
      setShowBottomTabs(['Side A', 'Side B', 'Center Plates', 'Plate X', 'Plate Y']);
    } else if (tabName === 'Cavity Layout') {
      setShowBottomTabs(['Side A', 'Side B']);
    } else if (tabName === 'Mold Temperature Maps') {
      setShowBottomTabs([
        'Side A Before Molding',
        'Side B Before Molding',
        'Center Plate Before Molding',
        'Side A During Molding',
        'Side B During Molding',
        'Center Plate During Molding',
      ]);
    } else {
      setShowBottomTabs([]);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 10, 200)); // Max zoom level of 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 10, 10)); // Min zoom level of 10%
  };

  const handleZoomInput = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 10 && value <= 200) {
      setZoomLevel(value);
    }
  };

  return (
    <div className="tabs-container">
      {/* Tabs for the top section */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'Auxillaries Hook Up Diagram' ? 'active' : ''}`}
          onClick={() => handleTabClick('Auxillaries Hook Up Diagram')}
        >
          Auxillaries Hook Up Diagram
        </button>
        <button
          className={`tab ${activeTab === 'Cavity Layout' ? 'active' : ''}`}
          onClick={() => handleTabClick('Cavity Layout')}
        >
          Cavity Layout
        </button>
        <button
          className={`tab ${activeTab === 'Mold Temperature Maps' ? 'active' : ''}`}
          onClick={() => handleTabClick('Mold Temperature Maps')}
        >
          Mold Temperature Maps
        </button>
      </div>

      {/* Zooming will only affect this part */}
      <div
        className="tab-content"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: '0 0',
          overflow: 'auto', // Enable scrolling only for the canvas
          width: '100%',
          height: 'calc(100vh - 200px)', // Adjust the height to suit your layout
        }}
      >
        {/* Render the same diagram for all tabs */}
        {activeTab === 'Auxillaries Hook Up Diagram' && <AuxillariesHookUpDiagram />}
        {activeTab === 'Cavity Layout' && <AuxillariesHookUpDiagram />}
        {activeTab === 'Mold Temperature Maps' && <AuxillariesHookUpDiagram />}
      </div>

      {/* Bottom tabs */}
      {showBottomTabs.length > 0 && (
        <div className="bottom-tabs">
          {showBottomTabs.map((tabName) => (
            <button key={tabName} className="bottom-tab">
              {tabName}
            </button>
          ))}
        </div>
      )}

      {/* Bottom section with zoom and action buttons */}
      <div className="bottom-section">
        <div className="zoom-buttons">
          <button className="zoom-in" onClick={handleZoomIn}>🔍 +</button>
          <input
            type="number"
            value={zoomLevel}
            onChange={handleZoomInput}
            className="zoom-input"
            min="10"
            max="200"
          />
          <button className="zoom-out" onClick={handleZoomOut}>🔍 -</button>
        </div>
        <div className="action-buttons">
          <button>Clear</button>
          <button>Save</button>
          <button>Print</button>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
