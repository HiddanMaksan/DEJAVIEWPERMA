import React from "react";

export default function RoomButton({ room }) {
  const handleClick = () => {
    console.log(`Navigating to: ${room}`);
    // In the future, replace this with real 360° scene navigation
  };

  return <button onClick={handleClick}>{room}</button>;
}

