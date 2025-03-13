const express = require('express');

const router = express.Router();
const rooms = [
  {
    name: "Living Room",
    dimensions: { length: 5.0, width: 4.0 },
    walls: [
      { position: "north", length: 5.0, windows: 2, doors: 0 },
      { position: "south", length: 5.0, windows: 1, doors: 1 }, 
      { position: "east", length: 4.0, windows: 0, doors: 0 },
      { position: "west", length: 4.0, windows: 0, doors: 1 }  
    ]
  },
  {
    name: "Bedroom",
    dimensions: { length: 4.0, width: 3.5 },
    walls: [
      { position: "north", length: 4.0, windows: 1, doors: 0 },
      { position: "south", length: 4.0, windows: 1, doors: 1 }, 
      { position: "east", length: 3.5, windows: 0, doors: 0 },
      { position: "west", length: 3.5, windows: 0, doors: 1 } 
    ]
  },
  {
    name: "Kitchen",
    dimensions: { length: 3.0, width: 3.0 },
    walls: [
      { position: "north", length: 3.0, windows: 1, doors: 0 },
      { position: "south", length: 3.0, windows: 0, doors: 1 },
      { position: "east", length: 3.0, windows: 1, doors: 0 },
      { position: "west", length: 3.0, windows: 0, doors: 1 }  
    ]
  },
  {
    name: "Bathroom",
    dimensions: { length: 2.5, width: 2.0 },
    walls: [
      { position: "north", length: 2.5, windows: 1, doors: 0 },
      { position: "south", length: 2.5, windows: 0, doors: 1 }, 
      { position: "east", length: 2.0, windows: 0, doors: 0 },  
      { position: "west", length: 2.0, windows: 0, doors: 1 }  
    ]
  }
];


router.get('/api/floorplan',(req,res)=>{
    try{
        res.status(200).json(rooms);
    }catch(err){
        res.status(404).json({error:"rooms not found"});
    }
});

module.exports=router