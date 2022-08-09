import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <h3 className="menu">Menu</h3>
        {/* <CloseIcon className="close" /> */}
      </div>
      <div className="options">
        <div className="optionBlock">
          <p className="optionName">Last Order</p>
        </div>
        <div className="optionBlock">
          <p className="optionName">Last week's orders</p>
        </div>
        <div className="optionBlock">
          <p className="optionName">Calorie count</p>
        </div>
      </div>
    </div>
  );
}
