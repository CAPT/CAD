import { useState } from 'react'

import './App.css'
import Line from './componets/Line'
import Panties from './componets/Panties/Panties'
import Panties2 from './componets/Panties2/Panties2'
import Bra from './componets/Bra/Bra'
import Bra1 from './componets/Bra1/Bra1'
import StringPants from './componets/StringPants/StringPants'
import Bralette from './componets/Bralette/Bralette'
import Visokietrusy from './componets/visokietrusy/visokietrusy'

function App() {
    return (
        <div className="App">
            {/* <Line startX="0" startY="0" height="150" width="350" /> */}
            {/* <Line height="250" width="300" /> */}
            {/* <Panties
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            /> */}
            {/* <Panties2
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            /> */}
            {/* <Bra
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            /> */}
            {/* <Bra1
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            /> */}
            {/* <StringPants
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
            />  */}
            {/* <Bralette
                startX="0"
                startY="0"
                height="150"
                width="350"
                marginAmount="20"
                />  */}
            <Visokietrusy
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
