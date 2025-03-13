import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Text,Group } from "fabric";

import axios from "axios";

const FloorPlan = () => {
  const canvasRef = useRef(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/floorplan")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  useEffect(() => {
    if (rooms.length === 0 || !canvasRef.current) return;
  
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "white",
      selection: true,
    });
  
    const scaleFactor = 50;
    let xOffset = 50; // Starting position for rooms
  
    rooms.forEach((room) => {
      const roomWidth = room.dimensions.length * scaleFactor;
      const roomHeight = room.dimensions.width * scaleFactor;
  
      // Draw Room Rectangle
      const rect = new Rect({
        left: xOffset,
        top: 100,
        width: roomWidth,
        height: roomHeight,
        fill: "white",
        stroke: "#333",
        strokeWidth: 2,
        selectable: true,
      });
  
      // Add Room Name (Centered inside rectangle)
      const text = new Text(room.name, {
        left: xOffset + roomWidth / 2,
        top: 100 + roomHeight / 2,
        fontSize: 16,
        fontWeight: "bold",
        originX: "center",
        originY: "center",
        selectable: false,
      });
  
      const group = new Group([rect, text], { left: xOffset, top: 100, selectable: true });
      canvas.add(group);
  
      // Draw doors and windows on walls
      room.walls.forEach((wall) => {
        const wallLength = wall.length * scaleFactor;
        let startX = xOffset;
        let startY = 100;
        let isVertical = wall.position === "east" || wall.position === "west";
  
        switch (wall.position) {
          case "north":
            startY = 100;
            break;
          case "south":
            startY = 100 + roomHeight;
            break;
          case "east":
            startX = xOffset + roomWidth;
            break;
          case "west":
            startX = xOffset;
            break;
          default:
            break;
        }
  
        // Draw Windows (Blue)
        for (let i = 0; i < wall.windows; i++) {
          const window = new Rect({
            left: isVertical
              ? startX
              : startX + (i + 1) * (wallLength / (wall.windows + 1)) - 5,
            top: isVertical
              ? startY + (i + 1) * (wallLength / (wall.windows + 1)) - 5
              : startY,
            width: isVertical ? 5 : 10,
            height: isVertical ? 10 : 5,
            fill: "blue",
            selectable: true,
          });
          canvas.add(window);
        }
  
        // Draw Doors (Brown)
        for (let i = 0; i < wall.doors; i++) {
          const door = new Rect({
            left: isVertical
              ? startX
              : startX + (i + 1) * (wallLength / (wall.doors + 1)) - 7.5,
            top: isVertical
              ? startY + (i + 1) * (wallLength / (wall.doors + 1)) - 7.5
              : startY,
            width: isVertical ? 10 : 15,
            height: isVertical ? 15 : 10,
            fill: "brown",
            selectable: true,
          });
          canvas.add(door);
        }
      });
  
      // Update xOffset for next room (to position rooms side by side)
      xOffset += roomWidth + 20; // Adding margin between rooms
    });
  
    return () => {
      canvas.dispose();
    };
  }, [rooms]);
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvasElement = canvasRef.current;

    // Convert canvas to image
    const image = canvasElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "floor_plan.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="flex flex-col items-center p-4">
       <div className="flex justify-between items-center w-full max-w-4xl px-4 mb-4">
       <h1 className="text-2xl font-bold">Floor Plan</h1>
      <button
        className="bg-primary text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        onClick={handleDownload}
      >
       <i className="fa-solid fa-download"></i> Download
      </button>
      </div>
      <div className="border border-gray-300"> 
        <canvas ref={canvasRef} width={1000} height={600} />

      </div>
    
    </div>
  );
};

export default FloorPlan;
