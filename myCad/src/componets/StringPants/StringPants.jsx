import React from 'react'
import StringPants_back from './StringPants_back'
import StringPants_front from './StringPants_front'
import StringPants_gusset from './StringPants_gusset'
import utils from '../../utils/crap'

function StringPants(props) {
    const ot = 600 //обхват талии
    const ob = 900 //обхват бедер
    const vs = 260 //высота сиденья
    const vb = 180 //высота бедра
    const vi = 8 //высота букв
    const sh = 6 //ширина букв

    return (
        <div>
            StringPants
            <StringPants_front
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                vi={vi}
                sh={sh}
            />
            <StringPants_back ot={ot} ob={ob} vs={vs} vb={vb} vi={vi} sh={sh} />
            <StringPants_gusset
                ot={ot}
                ob={ob}
                vs={vs}
                vb={vb}
                vi={vi}
                sh={sh}
            />
        </div>
    )
}

export default StringPants
