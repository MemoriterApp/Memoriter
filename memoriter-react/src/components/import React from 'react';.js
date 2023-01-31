import React from 'react';

const FolderHome = ({ folder }) => {
const settingsClick = () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
const test = () => {
    alert('test')
}

const closeButtonClick = () =>  {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

   return (
      <div className='Folder_Body'>
       <button className='Button_Homepage' onClick={test}></button>
       {folder.name != null ? (
         <button className='Button_Homepage_Text' onClick={test}>{folder.name}</button>
       ) : (
         <button className='Button_Homepage_Text' onClick={test}>New Folder</button>
       )}
       <div className='Button_Homepage_Settings' onClick={settingsClick}>
         <span className='dot'></span>
         <span className='dot'></span>
         <span className='dot'></span>
       </div>
     
         <div id="mySidenav" className="sidenav">
           <a href="javascript:void(0)" className="closebtn" onclick={closeButtonClick}>&times;</a>
           <a href="#">Rename</a>
           <a href="#">Change Icon</a>
           <a href="#">Move up</a>
           <a href="#">Move down</a>
           <a href="#">Delete</a>
         </div>
      </div>
 
       
    );
}

export default FolderHome;
