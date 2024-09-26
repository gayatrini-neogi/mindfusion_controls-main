import React, { useState } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import SidebarTools from './components/SidebarTools';
import DiagramPanel from './components/DiagramPanel';

const App = () => {
  const [activeTab, setActiveTab] = useState('Auxillaries Hook Up Diagram');
  const [activeSheet, setActiveSheet] = useState('Side A');

  // State to store images for each sub-tab of each main tab
  const [imagesByTabAndSheet, setImagesByTabAndSheet] = useState({
    'Auxillaries Hook Up Diagram': {
      'Side A': [],
      'Side B': [],
      'Center Plates': [],
      'Plate X': [],
      'Plate Y': [],
    },
    'Cavity Layout': {
      'Side A': [],
      'Side B': [],
    },
    'Mold Temperature Maps': {
      'Side A Before Molding': [],
      'Side B Before Molding': [],
      'Center Plate Before Molding': [],
      'Side A During Molding': [],
      'Side B During Molding': [],
      'Center Plate During Molding': [],
    },
  });

  const [showBottomTabs, setShowBottomTabs] = useState([]); // State for bottom tabs

  const handleToolSelect = (tool) => {
    console.log(`Selected tool: ${tool}`);
  };

  // Function to handle image addition, specific to the active tab and sheet
  const handleAddImage = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: file.name,
      url: URL.createObjectURL(file),
      x: 50, // Initial x position
      y: 50, // Initial y position
      width: 100, // Initial width
      height: 100, // Initial height
    }));

    // Add new images to the specific sub-tab of the current active main tab
    setImagesByTabAndSheet((prevState) => ({
      ...prevState,
      [activeTab]: {
        ...prevState[activeTab],
        [activeSheet]: [...prevState[activeTab][activeSheet], ...newImages],
      },
    }));
  };

  // Handler for clearing images for the active sub-tab only
  const handleClear = () => {
    setImagesByTabAndSheet((prevState) => ({
      ...prevState,
      [activeTab]: {
        ...prevState[activeTab],
        [activeSheet]: [], // Clear images for the active sheet
      },
    }));
  };

  return (
    <div className="app-container">
      {/* Top tabs */}
      <div className="top-tabs">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowBottomTabs={setShowBottomTabs} // Pass setShowBottomTabs to Tabs
        />
      </div>

      {/* Canvas and Sidebar */}
      <div className="main-content">
        <div className="canvas-container">
          {/* Pass the specific images for the active tab and sub-tab to DiagramPanel */}
          <DiagramPanel 
            activeTab={activeTab} 
            activeSheet={activeSheet} 
            images={imagesByTabAndSheet[activeTab][activeSheet]} // Images specific to the current sheet
            setImages={(updatedImages) => {
              setImagesByTabAndSheet((prevState) => ({
                ...prevState,
                [activeTab]: {
                  ...prevState[activeTab],
                  [activeSheet]: updatedImages,
                },
              }));
            }}
          />

          {/* Sub-tabs and Zoom Controls */}
          <div className="sub-tabs-container">
            <div className="sub-tabs">
              {showBottomTabs.map((tabName) => (
                <button
                  key={tabName}
                  className={`sheet-button ${activeSheet === tabName ? 'active' : ''}`}
                  onClick={() => setActiveSheet(tabName)}
                >
                  {tabName}
                </button>
              ))}
            </div>
            <div className="zoom-controls">
              <button className="zoom-btn">-</button>
              <button className="zoom-btn">100%</button>
              <button className="zoom-btn">+</button>
            </div>
          </div>
        </div>

        {/* Sidebar tools */}
        <div className="sidebar">
          <SidebarTools onToolSelect={handleToolSelect} />
        </div>
      </div>

      {/* Bottom section for action buttons */}
      <div className="bottom-section">
        <div className="bottom-buttons">
          {/* File input for adding images */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAddImage}
            multiple
          />
          <button 
            className="btn" 
            onClick={() => document.getElementById('fileInput').click()} // Trigger file input
          >
            Add Image
          </button>
          <button className="btn">Table</button>
          <button className="btn" onClick={handleClear}>Clear</button>
          <button className="btn">Save</button>
          <button className="btn">Print</button>
          <button className="btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default App;
