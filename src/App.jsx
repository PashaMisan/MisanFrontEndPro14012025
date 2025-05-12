import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import './App.css'

function App() {
    return (
        <div className="app-container container-fluid">
            <Header/>
            <div className="row">
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col-9">
                    <Content/>
                </div>
            </div>
        </div>
    );
}

export default App;
