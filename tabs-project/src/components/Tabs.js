import React, { useState } from 'react';
import './Tabs.css'; // Importing CSS for styling

const Tabs = ({ activeTab, setActiveTab, setShowBottomTabs }) => {
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (tabName === 'Auxillaries Hook Up Diagram') {
      setShowBottomTabs(['Side A', 'Side B', 'Center Plates', 'Plate X', 'Plate Y']);
    } else if (tabName === 'Cavity Layout') {
      setShowBottomTabs(['Side A', 'Side B']);
    } else if (tabName === 'Mold Temperature Maps') {
      setShowBottomTabs(['Side A Before Molding', 'Side B Before Molding', 'Center Plate Before Molding', 'Side A During Molding', 'Side B During Molding', 'Center Plate During Molding']);
    } else {
      setShowBottomTabs([]);
    }
  };

  return (
    <div className="tabs-container">
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

      <div className="tab-content">
        {activeTab === 'Auxillaries Hook Up Diagram' && <div></div>}
        {activeTab === 'Cavity Layout' && <div></div>}
        {activeTab === 'Mold Temperature Maps' && <div></div>}
      </div>
    </div>
  );
};

export default Tabs;
