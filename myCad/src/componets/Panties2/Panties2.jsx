import React from 'react'
import BackSide2 from './BackSide2'
import FrontSide2 from './FrontSide2'
import Gusset2 from './Gusset2'
import FSCopy2 from './FrontSide2_copy'

function Panties(props) {
    const ot = 600 //обхват талии
    const ob = 900 //обхват бедер
    const vs = 260 // высота сиденья
    const vb = 180 //высота бедра

    return (
        <div className="PantiesBlueprint">
            {/* <FrontSide
                ot={ot}
                ob={ob}
                vs={gs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            /> */}
            <FSCopy2
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            />
            {/* <BackSide2
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            /> */}
            {/* <Gusset
                ot={ot}
                ob={ob}
                vs={gs}
                vb={vb}
                startX="0"
                startY="0"
                marginAmount={props.marginAmount}
            /> */}
        </div>
    )
}

export default Panties
