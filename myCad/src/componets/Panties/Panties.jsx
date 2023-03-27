import React from 'react'
import BackSide from './BackSide'
import FrontSide from './FrontSide'
import Gusset from './Gusset'

function Panties(props) {
    const ot = 720 //обхват талии
    const ob = 970 //обхват бедер
    const gs = 260 //глубина сиденья
    const vb = 206 //высота бедра

    return (
        <div className="PantiesBlueprint">
            {/* <FrontSide
                ot={ot}
                ob={ob}
                gs={gs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            />
            <BackSide
                ot={ot}
                ob={ob}
                gs={gs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            /> */}
            <Gusset
                ot={ot}
                ob={ob}
                gs={gs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            />
        </div>
    )
}

export default Panties
