import React from 'react';
import { FaPen, FaSlash, FaEraser } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { IoEllipseOutline } from "react-icons/io5";
import { PiSelectionPlus, PiCursorClickFill } from "react-icons/pi";
import { GiLaserBurst } from "react-icons/gi";

function Tools({ currentTool, onclick }) {
  const tools = [
    { name: 'Pen', tool: FaPen, type: 1 },
    { name: 'Text', tool: MdTextFields, type: 2 },
    { name: 'Line', tool: FaSlash, type: 4 },
    { name: 'Rectangle', tool: LuRectangleHorizontal, type: 8 },
    { name: 'Ellipse', tool: IoEllipseOutline, type: 16 },
    { name: 'Selector', tool: PiSelectionPlus, type: 32 },
    { name: 'Laser', tool: GiLaserBurst, type: 128 },
    { name: 'Eraser', tool: FaEraser, type: 64 },
    { name: 'Click', tool: PiCursorClickFill, type: 256 }
  ];

  return (
    <div className='w-[40px] h-[90vh] bg-white rounded-3xl shadow-xl absolute top-5 left-5 flex flex-col items-center z-[100]'>
      {tools.map((tool, index) => {
        const isSelected = currentTool === tool.type;
        return (
          <div
            key={index}
            onClick={() => onclick(tool)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out group shadow-xl shadow-gray-300
              ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            <tool.tool
              className={`w-3 h-3 transition-colors duration-200 
                ${isSelected ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-600`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Tools;
