import { useState } from 'react'

import './App.css'
import Line from './componets/Line'
import Panties from './componets/Panties/Panties'

function App() {
    return (
        <div className="App">
            {/* <Line startX="0" startY="0" height="150" width="350" /> */}
            {/* <Line height="250" width="300" /> */}
            <Panties
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            />
        </div>
    )
}

export default App
