import React from 'react'
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import { useEffect,useState } from 'react';
import Tools from './tools';



function App() {
  const appID = Number(import.meta.env.VITE_APP_ID);
  const server = import.meta.env.VITE_SERVER;
  const userID = import.meta.env.VITE_USER_ID;
  const userName = import.meta.env.VITE_USER_NAME;
  const roomID = import.meta.env.VITE_ROOM_ID;
  const token = import.meta.env.VITE_TOKEN;
  
  const [currentTool, setCurrentTool] =useState(null);
const zg = new ZegoExpressEngine(appID, server);
const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
const initBoard = async () => {
   await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID', 
    appID,
    server, 
    userID, 
    token 
});
await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
setCurrentTool(zegoSuperBoard.getToolType());
await zegoSuperBoard.createWhiteboardView({
  name: 'Whiteboard', // Whiteboard name
  perPageWidth: 1600, // Width of each whiteboard page
  perPageHeight: 900, // Height of each whiteboard page
  pageCount:1 // Page count of a whiteboard
});
}
useEffect(() => {
  if(zegoSuperBoard){
    initBoard();
  }
}, [zegoSuperBoard]);
  return (
    <div className='h-[100vh] bg-black w-full'>
    
<div id="parentDomID" className='w-full h-full'></div>
<Tools currentTool={currentTool} onclick={(tool)=>{
  zegoSuperBoard.setToolType(tool.type);
  setCurrentTool(tool.type);
}} />
    </div>
  )
}

export default App
