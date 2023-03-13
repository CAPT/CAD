import { useState } from 'react'

import './App.css'
import Line from './componets/Line'

function App() {
    return (
        <div className="App">
            <Line startX="0" startY="0" height="150" width="350" />
            {/* <Line height="250" width="300" /> */}
        </div>
    )
}

export default App
