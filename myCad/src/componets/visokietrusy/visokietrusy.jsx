import React from 'react'
import Visokietrusy_back from './visokietrusy_back'
import Visokietrusy_front from './visokietrusy_front'
import Visokietrusy_gusset from './visokietrusy_gusset'

function Visokietrusy(props) {
    const ot = 600 //обхват талии
    const ob = 900 //обхват бедер
    const vs = 260 //высота сиденья
    const vb = 180 //высота бедра
    const vi = 8 //высота букв
    const sh = 6 //ширина букв
    return (
        <div>
            visokietrusy
            <Visokietrusy_back
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                vi={vi}
                sh={sh}
                startX={props.startX}
                startY={props.startX}
                marginAmount={props.marginAmount}
            />
            {/* <Visokietrusy_front
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                vi={vi}
                sh={sh}
                startX={props.startX}
                startY={props.startX}
                marginAmount={props.marginAmount}
            />
            <Visokietrusy_gusset
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                vi={vi}
                sh={sh}
                startX={props.startX}
                startY={props.startX}
                marginAmount={props.marginAmount}
            /> */}
        </div>
    )
}

export default Visokietrusy
