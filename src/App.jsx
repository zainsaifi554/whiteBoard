import React from 'react'
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import { useEffect,useState } from 'react';
import Tools from './tools';



function App() {
 const appID = 709484502; 
 const server = "wss://webliveroom709484502-api.coolzcloud.com/ws"
 const userID = "shahji"
  const userName = "shahji"
  const roomID = "4750"
  const [currentTool, setCurrentTool] =useState(null);
 const token = "04AAAAAGiDYIEADMj2JtSltvlJNAYrQgCvHwLOgOgCa9PGGn183qL4Df6zRgBxHsqKDiJKS+rs03bjL0ZUdoa/PiNWw8bBbSC2FwSrOvRnjoVI8L/JOIMPUJR8xmE29umAhN1QmCVuImqBpvF5LU3U3XNYN1XBpXETDRdvJiMYbQb37DkIS3t1hVGSQd70DtXiM0TTfbktooz9V5Gs6iAstYPdbMOsCZI4XpFQYFJOfrcq98XcgusQQVLzL1E8LUkvPOi5Yz7nzwE="
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
