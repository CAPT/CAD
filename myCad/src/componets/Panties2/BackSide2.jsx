import React from 'react'
import makerjs from 'makerjs'
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
//import svg2img from 'svg2img'

const BackSide2 = (props) => {
    console.log(props)

    // function exportSvgToPdf() {
    //     // выбираем SVG-элемент из документа

    //     var x = 1
    //     var y = 1
    //     var width = 238.95
    //     var height = 331.2
    //     const doc = new jsPDF({
    //         orientation: 'portrait',
    //         unit: 'mm',
    //         format: 'a4',
    //     })
    //     const element = document.querySelector('#presentedSvg svg')
    //     doc.svg(element, {
    //         x,
    //         y,
    //         width,
    //         height,
    //     }).then(() => {
    //         // save the created pdf
    //         doc.save('myPDF.pdf')
    //     })
    // }

    function segmentByStartAndLength(originLine, segmentLength, startPoint) {
        //откладывает на выбранной прямой отрезок указанной длины от startPoint
        const angle = Math.atan2(
            originLine.end[1] - originLine.origin[1],
            originLine.end[0] - originLine.origin[0]
        )
        const segmentEnd = makerjs.point.add(startPoint, [
            segmentLength * Math.cos(angle),
            segmentLength * Math.sin(angle),
        ])
        return new makerjs.paths.Line(startPoint, segmentEnd)
    }

    function lineToLineUnderAngleWithLength(
        originLine,
        angleInDegrees,
        length,
        startPoint
    ) {
        //откладвает прямую длины length под углом angleInDegrees к прямой originLine из startPoint
        var angleInRadians = makerjs.angle.toRadians(angleInDegrees)

        // Расчет угла наклона изначальной прямой
        var angleOfOriginLine = makerjs.angle.ofPointInDegrees(
            originLine.origin,
            originLine.end
        )
        // Перевод углов в радианы
        var angleInRadians = makerjs.angle.toRadians(
            angleOfOriginLine + angleInDegrees
        )

        // Расчет координат конца новой прямой
        var endX = startPoint[0] + length * Math.cos(angleInRadians)
        var endY = startPoint[1] + length * Math.sin(angleInRadians)
        var endPoint = [endX, endY]

        return new makerjs.paths.Line(startPoint, endPoint)
    }

    var ab = {
        type: 'line',
        origin: [Number(props.startX), Number(props.startY)],
        end: [Number(props.startX), Number(props.startX) - props.vb],
    }

    console.log('ab:' + ab.origin + ' to ' + ab.end)

    var ac = {
        type: 'line',
        origin: ab.origin,
        end: [ab.origin[0], ab.origin[1] - props.vs],
    }

    console.log('ac:' + ac.origin + ' to ' + ac.end)

    var aa1 = {
        type: 'line',
        origin: ab.origin,
        end: [ab.origin[0] + props.ob / 4, ab.origin[1]],
    }

    console.log('aa1:' + aa1.origin + ' to ' + aa1.end)

    var a1b1 = {
        type: 'line',
        origin: aa1.end,
        end: [aa1.end[0], aa1.end[1] - props.vb],
    }

    console.log('a1b1:' + a1b1.origin + ' to ' + a1b1.end)

    var a1c1 = {
        type: 'line',
        origin: aa1.end,
        end: [aa1.end[0], aa1.end[1] - props.vs],
    }

    console.log('a2c1:' + a1c1.origin + ' to ' + a1c1.end)

    var bb1 = {
        type: 'line',
        origin: ab.end,
        end: [ab.end[0] + props.ob / 4, ab.end[1]],
    }

    var cc1 = {
        type: 'line',
        origin: ac.end,
        end: [ac.end[0] + props.ob / 4, ac.end[1]],
    }

    var a1a2 = {
        type: 'line',
        origin: aa1.origin,
        end: [aa1.end[0] - props.ot / 4, aa1.end[1]],
    }

    console.log('a1a2:' + a1a2.origin + ' to ' + a1a2.end)

    var ba2 = {
        type: 'line',
        origin: bb1.origin,
        end: a1a2.end,
    }

    var bb2 = segmentByStartAndLength(
        ba2,
        makerjs.measure.pathLength(ba2) / 2,
        ba2.origin
    )

    var bb3 = segmentByStartAndLength(ba2, 70, ba2.origin)

    var b3b4 = segmentByStartAndLength(ba2, 110, ba2.origin)

    var c1l = {
        type: 'line',
        origin: cc1.end,
        end: [cc1.end[0], cc1.end[1] - (props.ob * 0.2) / 2],
    }

    var c1l1 = {
        type: 'line',
        origin: cc1.end,
        end: [cc1.end[0], cc1.end[1] - (props.ob * 0.2) / 4],
    }

    var ll2 = {
        type: 'line',
        origin: c1l.end,
        end: [c1l.end[0] - 25, c1l.end[1]],
    }

    var l1l3 = {
        type: 'line',
        origin: c1l1.end,
        end: [c1l1.end[0] - 35, c1l1.end[1]],
    }

    var l3b3 = {
        type: 'line',
        origin: l1l3.end,
        end: bb3.end,
    }

    var l3n = segmentByStartAndLength(
        l3b3,
        makerjs.measure.pathLength(l3b3) / 3,
        l3b3.origin
    )

    var l3n1 = segmentByStartAndLength(
        l3n,
        makerjs.measure.pathLength(l3n) / 2,
        l3n.origin
    )

    var n1n2 = lineToLineUnderAngleWithLength(l3n1, 270, 5, l3n1.end)

    var b3n = {
        type: 'line',
        origin: bb3.end,
        end: l3n.end,
    }

    var b3n3 = segmentByStartAndLength(
        b3n,
        makerjs.measure.pathLength(b3n) / 2,
        b3n.origin
    )

    var n3n4 = lineToLineUnderAngleWithLength(b3n3, 90, -7.5, b3n3.end)

    var b4a3 = {
        type: 'line',
        origin: b3b4.end,
        end: [a1b1.end[0], b3b4.end[1]],
    }

    var a3a4 = {
        type: 'line',
        origin: b4a3.end,
        end: [b4a3.end[0], b4a3.end[1] - 10],
    }

    var a4a5 = {
        type: 'line',
        origin: a3a4.end,
        end: [a3a4.end[0] - 3, a3a4.end[1]],
    }

    var b4b5 = lineToLineUnderAngleWithLength(b3b4, 270, 5, b3b4.end)

    var b3b6 = lineToLineUnderAngleWithLength(bb3, 270, 2, bb3.end)

    var b3n3Div2 = segmentByStartAndLength(
        b3n3,
        makerjs.measure.pathLength(b3n3) / 1.7,
        b3n3.origin
    )
    var b3n3Div290 = lineToLineUnderAngleWithLength(
        b3n3Div2,
        270,
        10,
        b3n3Div2.end
    )

    var b3n3Div4 = segmentByStartAndLength(
        b3n3,
        makerjs.measure.pathLength(b3n3) / 4,
        b3n3.origin
    )
    var b3n3Div490 = lineToLineUnderAngleWithLength(
        b3n3Div4,
        90,
        10,
        b3n3Div4.end
    )

    var b3n3Div025 = segmentByStartAndLength(
        b3n3,
        makerjs.measure.pathLength(b3n3) / 1.3,
        b3n3.origin
    )

    var b3n3Div02590 = lineToLineUnderAngleWithLength(
        b3n3Div025,
        270,
        10,
        b3n3Div025.end
    )
    var b6n4nB1 = new makerjs.models.BezierCurve(
        [
            b3b6.end,
            /* [b3n3Div2.end[0], b3n3Div2.end[1] + 15],
            [b3n3Div290.end[0] + 5, b3n3Div290.end[1] + 5],*/
            b3n3Div490.end,
            b3n3Div02590.end,

            n3n4.end,
        ],
        0.1
    )
    var b6n4nB2 = new makerjs.models.BezierCurve(
        [n3n4.end, [n3n4.end[0] + 5, n3n4.end[1] - 5], l3n.end],
        0.1
    )

    var a1t = {
        type: 'line',
        origin: aa1.end,
        end: [aa1.end[0] , aa1.end[1]-(props.vb-20)],
    }

    var ts = {
        type: 'line',
        origin: a1t.end,
        end: [a1t.end[0]-(props.vi/2), a1t.end[1]],
    }

    var ss1 = {
        type: 'line',
        origin: ts.end,
        end: [ts.end[0] - props.vi / 2, ts.end[1]],
    }

    var ss2 = {
        type: 'line',
        origin: ss1.end,
        end: [ss1.end[0] - props.sh / 3, ss1.end[1] + props.sh / 3],
    }

    var s2s3 = {
        type: 'line',
        origin: ss2.end,
        end: [ss2.end[0], ss2.end[1] + props.sh / 3],
    }

     var s3s4 = {
         type: 'line',
         origin: s2s3.end,
         end: [s2s3.end[0] + props.sh / 3, s2s3.end[1] + props.sh / 3],
    }
    
    var s1s5 = {
        type: 'line',
        origin: ss1.origin,
        end: [ss1.origin[0] + props.sh / 3, ss1.origin[1] + props.sh / 3],
    }

    var s5s6 = {
        type: 'line',
        origin: s1s5.end,
        end: [s1s5.end[0], s1s5.end[1] + props.sh / 3],
    }

     var s6s7 = {
         type: 'line',
         origin: s5s6.end,
         end: [s5s6.end[0] - props.sh / 3, s5s6.end[1] + props.sh / 3],
    }
    
    var s4g = {
        type: 'line',
        origin: s3s4.end,
        end: [s3s4.end[0] - props.sh / 3, s3s4.end[1] + props.sh / 3],
    }

     var gg1 = {
         type: 'line',
         origin: s4g.end,
         end: [s4g.end[0] + props.vi, s4g.end[1]],
    }
    
    var gg2 = {
        type: 'line',
        origin: s4g.end,
        end: [s4g.end[0], s4g.end[1] + (props.sh/3)*2],
    }


    var g2i = {
        type: 'line',
        origin: gg2.end,
        end: [gg2.end[0], gg2.end[1] + props.sh / 3],
    }

    var ii1 = {
        type: 'line',
        origin: g2i.end,
        end: [g2i.end[0] + props.vi, g2i.end[1]],
    }

    var i1i2 = {
        type: 'line',
        origin: ii1.end,
        end: [ii1.end[0] - (props.sh / 3)*2, ii1.end[1] + (props.sh / 3)*2],
    }

    var i2i3 = {
        type: 'line',
        origin: i1i2.end,
        end: [i1i2.end[0] - (props.sh / 3) * 2, i1i2.end[1] + (props.sh / 3)],
    }

     var i3i4 = {
         type: 'line',
         origin: i2i3.end,
         end: [i2i3.end[0] + props.vi, i2i3.end[1]],
     }

    var i4p = {
        type: 'line',
        origin: i3i4.end,
        end: [i3i4.end[0], i3i4.end[1] + props.sh / 3],
    }

    var pp1 = {
        type: 'line',
        origin: i4p.end,
        end: [i4p.end[0] - props.vi / 2, i4p.end[1]],
    }

    var p1p2 = {
        type: 'line',
        origin: pp1.end,
        end: [pp1.end[0] - props.vi / 2, pp1.end[1]],
    }

    var p2p3 = {
        type: 'line',
        origin: p1p2.end,
        end: [p1p2.end[0], p1p2.end[1] + props.sh],
    }

     var pp4 = {
         type: 'line',
         origin: i4p.end,
         end: [i4p.end[0], i4p.end[1] + props.sh],
    }
    
     var p4p5 = {
         type: 'line',
         origin: pp4.end,
         end: [pp4.end[0] - props.vi / 4, pp4.end[1]],
    }
    
    var p5p6 = {
        type: 'line',
        origin: p4p5.end,
        end: [p4p5.end[0] - (props.sh / 3), p4p5.end[1] - props.sh / 3],
    }

    var p1p6 = {
        type: 'line',
        origin: pp1.end,
        end: [p5p6.end[0], p5p6.end[1] ],
    }

    var a1t1 = {
        type: 'line',
        origin: aa1.end,
        end: [aa1.end[0], aa1.end[1] - (props.vb + 40)],
    }

     var tz = {
         type: 'line',
         origin: a1t1.end,
         end: [a1t1.end[0] - props.vi*4, a1t1.end[1]],
    }
    
     var zz1 = {
         type: 'line',
         origin: tz.end,
         end: [tz.end[0], tz.end[1]+props.vs/2-10],
     }

     var zz2 = {
         type: 'line',
         origin: tz.end,
         end: [tz.end[0] - props.vi / 2, tz.end[1] + props.vi / 2],
    }
    
     var zz3 = {
         type: 'line',
         origin: tz.end,
         end: [tz.end[0] + props.vi / 2, tz.end[1] + props.vi / 2],
     }

    var a1t1 = {
        type: 'line',
        origin: aa1.end,
        end: [aa1.end[0], aa1.end[1] - (props.vb + 20)],
    }

     var t1t2 = {
         type: 'line',
         origin: a1t1.end,
         end: [a1t1.end[0] - props.vi *4-props.vi/4, a1t1.end[1]],
    }
    
    var t2d = {
        type: 'line',
        origin: t1t2.end,
        end: [t1t2.end[0], t1t2.end[1]+props.sh/3],
    }

    var dd1 = {
        type: 'line',
        origin: t2d.end,
        end: [t2d.end[0], t2d.end[1] + props.sh],
    }

    var d1d2 = {
        type: 'line',
        origin: dd1.end,
        end: [dd1.end[0], dd1.end[1] + props.sh / 3],
    }

    var dd3 = {
        type: 'line',
        origin: t2d.origin,
        end: [t2d.origin[0] + props.sh / 3, t2d.origin[1] + props.sh / 3],
    }

    var d2d4 = {
        type: 'line',
        origin: d1d2.end,
        end: [d1d2.end[0] + props.sh / 3, d1d2.end[1] - props.sh / 3],
    }

     var dd5 = {
         type: 'line',
         origin: t2d.end,
         end: [t2d.end[0] - props.vi, t2d.end[1] + props.sh / 3*2],
    }

    var d5d6 = {
        type: 'line',
        origin: dd5.end,
        end: [dd5.end[0] + props.sh / 3, dd5.end[1] + props.sh / 3],
    }

    var d1d6 = {
        type: 'line',
        origin: dd1.end,
        end: [d5d6.end[0], d5d6.end[1]],
    }

    var d6o = {
        type: 'line',
        origin: d1d6.end,
        end: [d1d6.end[0], d1d6.end[1] + props.sh / 3*2],
    }

    var oo1 = {
        type: 'line',
        origin: d6o.end,
        end: [d6o.end[0] - props.sh / 3, d6o.end[1] + props.sh / 3],
    }

    var o1o2 = {
        type: 'line',
        origin: oo1.end,
        end: [oo1.end[0], oo1.end[1] + props.sh / 3],
    }

    var o2o3 = {
        type: 'line',
        origin: o1o2.end,
        end: [o1o2.end[0] + props.sh / 3, o1o2.end[1] + props.sh / 3],
    }

    var o3o4 = {
        type: 'line',
        origin: o2o3.end,
        end: [o2o3.end[0]+props.vi/2, o2o3.end[1]],
    }

     var o4o5 = {
         type: 'line',
         origin: o3o4.end,
         end: [o3o4.end[0] + props.sh / 3, o3o4.end[1] - props.sh / 3],
    }
    
    var o5o6 = {
        type: 'line',
        origin: o4o5.end,
        end: [o4o5.end[0], o4o5.end[1] - props.sh / 3],
    }

    var o6o7 = {
        type: 'line',
        origin: o5o6.end,
        end: [o5o6.end[0] - props.sh / 3, o5o6.end[1] - props.sh / 3],
    }

    var oo7 = {
        type: 'line',
        origin: d6o.end,
        end: [o6o7.end[0], o6o7.end[1]],
    }

    var o5m = {
        type: 'line',
        origin: o4o5.end,
        end: [o4o5.end[0], o4o5.end[1]+props.sh/3*2],
    }

    var mm1 = {
        type: 'line',
        origin: o5m.end,
        end: [o5m.end[0]-props.vi, o5m.end[1] + (props.sh / 3) * 2],
    }

    var m1m2 = {
        type: 'line',
        origin: mm1.end,
        end: [mm1.end[0] + props.sh / 3, mm1.end[1] + props.sh / 3],
    }

    var m2m3 = {
        type: 'line',
        origin: m1m2.end,
        end: [m1m2.end[0] + props.vi / 4*3, m1m2.end[1]],
    }

    var m3e = {
        type: 'line',
        origin: m2m3.end,
        end: [m2m3.end[0], m2m3.end[1] + (props.sh / 3)],
    }

    var ee1 = {
        type: 'line',
        origin: m3e.end,
        end: [m3e.end[0]-props.vi/2, m3e.end[1]],
    }

    var e1e2 = {
        type: 'line',
        origin: ee1.end,
        end: [ee1.end[0] - props.vi / 2, ee1.end[1]],
    }

    var e2e3 = {
        type: 'line',
        origin: e1e2.end,
        end: [e1e2.end[0], e1e2.end[1]+props.sh/3*2],
    }

    var e3e4 = {
        type: 'line',
        origin: e2e3.end,
        end: [e2e3.end[0] + props.sh / 3, e2e3.end[1] + props.sh / 3],
    }

    var e4e5 = {
        type: 'line',
        origin: ee1.end,
        end: [ee1.end[0], ee1.end[1] + (props.sh / 3) * 2],
    }

    var ee6 = {
        type: 'line',
        origin: m3e.end,
        end: [m3e.end[0], m3e.end[1] + props.sh],
    }

    var e6v = {
        type: 'line',
        origin: ee6.end,
        end: [ee6.end[0], ee6.end[1] + props.sh / 3],
    }

      var vv1 = {
          type: 'line',
          origin: e6v.end,
          end: [e6v.end[0] - props.vi / 2, e6v.end[1]],
      }

      var v1v2 = {
          type: 'line',
          origin: vv1.end,
          end: [vv1.end[0] - props.vi / 2, vv1.end[1]],
      }

      var v2v3 = {
          type: 'line',
          origin: v1v2.end,
          end: [v1v2.end[0], v1v2.end[1] + (props.sh / 3) * 2],
      }

     var v3v4 = {
         type: 'line',
         origin: v2v3.end,
         end: [v2v3.end[0] + props.sh / 3, v2v3.end[1] + props.sh / 3],
    }
    
    var v4v5 = {
        type: 'line',
        origin: v3v4.end,
        end: [v3v4.end[0] + props.sh / 3, v3v4.end[1] - props.sh / 3],
    }

    var v5v6 = {
        type: 'line',
        origin: v4v5.end,
        end: [v4v5.end[0] + props.sh / 3, v4v5.end[1] + props.sh / 3],
    }

     var v6v7 = {
         type: 'line',
         origin: v5v6.end,
         end: [v5v6.end[0] + props.sh / 3, v5v6.end[1] - props.sh / 3],
     }

    var vv7 = {
        type: 'line',
        origin: e6v.end,
        end: [v6v7.end[0], v6v7.end[1]],
    }

    var v1v5 = {
        type: 'line',
        origin: vv1.end,
        end: [v4v5.end[0], v4v5.end[1]],
    }

    var v7r = {
        type: 'line',
        origin: v6v7.end,
        end: [v6v7.end[0], v6v7.end[1] + props.sh / 3*2],
    }

      var rr1 = {
          type: 'line',
          origin: v7r.end,
          end: [v7r.end[0] - props.vi / 2, v7r.end[1] + props.sh / 3],
    }
    
    var r1r2 = {
        type: 'line',
        origin: rr1.end,
        end: [rr1.end[0] - props.vi / 2, rr1.end[1] + props.sh / 3],
    }

    var r2r3 = {
        type: 'line',
        origin: r1r2.end,
        end: [r1r2.end[0] + props.sh / 3, r1r2.end[1] + props.sh / 3],
    }

    var r3r4 = {
        type: 'line',
        origin: r2r3.end,
        end: [r2r3.end[0] + props.vi / 4, r2r3.end[1]],
    }

    var r4r5 = {
        type: 'line',
        origin: r3r4.end,
        end: [r3r4.end[0] + props.vi / 2, r3r4.end[1]],
    }

    var r1r4 = {
        type: 'line',
        origin: rr1.end,
        end: [r3r4.end[0], r3r4.end[1]],
    }

     var r5y = {
         type: 'line',
         origin: r4r5.end,
         end: [r4r5.end[0], r4r5.end[1] + props.sh / 3],
     }

    var yy1 = {
        type: 'line',
        origin: r5y.end,
        end: [r5y.end[0] - props.sh / 3*2, r5y.end[1] + props.sh / 3*2],
    }

    var yy2 = {
        type: 'line',
        origin: r5y.end,
        end: [r5y.end[0] , r5y.end[1] + props.sh],
    }

    var y2y3 = {
        type: 'line',
        origin: yy2.end,
        end: [yy2.end[0]-props.vi/2, yy2.end[1]],
    }

     var y3y4 = {
         type: 'line',
         origin: y2y3.end,
         end: [y2y3.end[0] - props.vi / 2, y2y3.end[1]],
     }

     var y4y5 = {
         type: 'line',
         origin: y3y4.end,
         end: [y3y4.end[0], y3y4.end[1] - props.sh],
     }

    var y5y6 = {
        type: 'line',
        origin: y4y5.end,
        end: [y4y5.end[0]+props.vi/4, y4y5.end[1]],
    }

    var y6y7 = {
        type: 'line',
        origin: y5y6.end,
        end: [y5y6.end[0] + props.sh / 3, y5y6.end[1] + props.sh / 3],
    }

    var y3y7 = {
        type: 'line',
        origin: y2y3.end,
        end: [y6y7.end[0], y6y7.end[1]],
    }






 

    var pathObject = {
        ab,
        ac,
        aa1,
        a1b1,
        a1c1,
        a1a2,
        bb1,
        b3b4,
        cc1,
        ba2,
        bb2,
        bb3,
        c1l,
        c1l1,
        ll2,
        l1l3,
        l3b3,
        l3n,
        l3n1,
        n1n2,
        l3n1,
        b3n,
        n3n4,
        b4a3,
        a3a4,
        a4a5,
        b4b5,
        b3b6,
        a1t,
        //ts,
        ss1,
        ss2,
        s2s3,
        s3s4,
        s1s5,
        s5s6,
        s5s6,
        s6s7,
        //s4g,
        gg1,
        gg2,
        //g2i,
        ii1,
        i1i2,
        i2i3,
        i3i4,
        //i4p
        pp1,
        p1p2,
        p2p3,
        pp4,
        p4p5,
        p5p6,
        p1p6,
        //a1t1,
        //tz,
        zz1,
        zz2,
        zz3,
        //a1t1,
        //t1t2,
        t2d,
        dd1,
        d1d2,
        dd3,
        d2d4,
        dd5,
        d5d6,
        d1d6,
        //d6o,
        oo1,
        o1o2,
        o2o3,
        o3o4,
        o4o5,
        o5o6,
        o6o7,
        oo7,
        //o5m,
        mm1,
        m1m2,
        m2m3,
        //m3e,
        ee1,
        e1e2,
        e2e3,
        e3e4,
        e4e5,
        ee6,
        //e6v,
        vv1,
        v1v2,
        v2v3,
        v3v4,
        v4v5,
        v5v6,
        v6v7,
        vv7,
        v1v5,
        //v7r,
        rr1,
        r1r2,
        r2r3,
        r2r3,
        r3r4,
        r4r5,
        r1r4,
        //r5y,
        yy1,
        //yy2,
        y2y3,
        y3y4,
        y4y5,
        y5y6,
        y6y7,
        y3y7
       
        


        // b3n3Div490,
        // b3n3Div02590,
        // b3n3Div290,
    }

    var modelsObject = { b6n4nB1, b6n4nB2 }

    const svgOptions = {
        useTitle: true,
    }
    var mainModel = {
        paths: pathObject,
        models: modelsObject,

        units: makerjs.unitType.Millimeter,
    }
    /* const combinedMainPath = makerjs.model.combine(mainModel)
    var outerModel = makerjs.model.outline(combinedMainPath, 10, 1, false)
    combinedMainPath.layer = 'red'
    outerModel.layer = 'blue'

    var totalModel = {
        models: {
            combinedMainPath: combinedMainPath,
            outerModel: outerModel,
        },

        units: makerjs.unitType.Millimeter,
    }*/

    //var model = makerjs.model.combine(model, outline)
    const svgModel = makerjs.exporter.toSVG(mainModel)

    document.write(
        `<div id="presentedSvg" style="margin:${props.marginAmount}px">${svgModel}</div>`
    )
    // console.log(svgModel)

    // const image =
    //     '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="47.4" height="40.65" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>'

    // var parser = new DOMParser()
    // var doccc = parser.parseFromString(svgModel, 'image/svg+xml')
    // console.log(doccc)
    // return (
    //     <>
    //         {/* <button onClick={exportSvgToPdf}>1232313</button> */}
    //         <div id="presentedSvg">
    //             <img
    //                 src={`data:image/svg+xml;utf8,${encodeURIComponent(
    //                     svgModel
    //                 )}`}
    //             />
    //             {/* <div dangerouslySetInnerHTML={{ __html: svgModel }} /> */}
    //         </div>
    //     </>
    // )

    //document.write(`<button onClick="exportSvgToPdf()" >1232313</button>`)
}

export default BackSide2
