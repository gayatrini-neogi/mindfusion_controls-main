import React from 'react';
import './SidebarTools.css';

const SidebarTools = ({ onToolSelect }) => {
  const tools = [
    { name: 'Circle', symbol: '⚪', color: '#ff0000' }, // Red
    { name: 'Square', symbol: '▢', color: '#00ff00' }, // Green
    { name: 'Triangle', symbol: '▲', color: '#0000ff' }, // Blue
    { name: 'Line', symbol: '─', color: '#ffff00' }, // Yellow
    { name: 'Arrow', symbol: '➔', color: '#ff00ff' }, // Magenta
    { name: 'Text', symbol: '🅰️', color: '#ff7f50' }, // Coral
    { name: 'Plus', symbol: '➕', color: '#008000' }, // Dark Green
    { name: 'Minus', symbol: '➖', color: '#000080' }, // Navy
    { name: 'Star', symbol: '⭐', color: '#ffa500' }, // Orange
    { name: 'Hexagon', symbol: '⬡', color: '#800080' }, // Purple
  ];

  return (
    <div className="sidebar-tools">
      {tools.map(tool => (
        <div 
          key={tool.name} 
          className="tool-box" 
          onClick={() => onToolSelect(tool.name)} 
          title={tool.name}
        >
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            {tool.icon}
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SidebarTools;
