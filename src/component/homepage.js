import React from "react";
import SideBar from './sidebar';
import MainBox from './mainbox';
import { useState } from "react";
function HomePage() {
    const [mainContent, setMainContent] = useState({
        sideBar: 0,
        showSideBar: false
      })
    
    return (
        <div>
            <header className="App-header">
                <div className='flex w-screen h-screen'>
                    <SideBar mainContent={mainContent} setMainContent={setMainContent} />
                    <MainBox mainContent={mainContent} setMainContent={setMainContent} />
                </div>
            </header>
        </div>
    );
}

export default HomePage;