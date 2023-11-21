import React, { useState } from 'react';
import { Button } from '@shopify/polaris';
import './AnimatedButton.css';
import { ReportsMajor } from '@shopify/polaris-icons';

function ViewReportButton() {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    backgroundColor: isHovered ? 'transparent' : 'transparent',
    color: isHovered ? 'blue' : 'transparent',
  };

  const contentStyles = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: 'left 0.3s, color 0.3s',
    padding: 0,
    whiteSpace: 'nowrap',
    left: isHovered ? '0' : '-100%',
    color: isHovered ? 'blue' : 'transparent',
  };

  return (
    <div
      className="animated-button-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button  variant="plain" style={buttonStyles} className="animated-button" icon={ReportsMajor}>
        <div style={contentStyles} className="Polaris-Button__Content">
          <span>View report</span>
        </div>
      </Button>
    </div>
  );
}

export default ViewReportButton;



