import React from 'react'
import Visokietrusy_back from './visokietrusy_back'
import Visokietrusy_front from './visokietrusy_back'
import Visokietrusy_gusset from './visokietrusy_gusset'

function Visokietrusy(props) {
    return (
        <div>
            visokietrusy
            <Visokietrusy_back />
            <Visokietrusy_front />
            <Visokietrusy_gusset />
        </div>
    )
}

export default Visokietrusy
