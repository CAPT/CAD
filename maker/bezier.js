var Bezier = (function (t) {
    function r(i) {
        if (n[i]) return n[i].exports
        var e = (n[i] = { exports: {}, id: i, loaded: !1 })
        return t[i].call(e.exports, e, e.exports, r), (e.loaded = !0), e.exports
    }
    var n = {}
    return (r.m = t), (r.c = n), (r.p = ''), r(0)
})([
    function (t, r, n) {
        'use strict'
        t.exports = n(1)
    },
    function (t, r, n) {
        'use strict'
        var i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                      return typeof t
                  }
                : function (t) {
                      return t &&
                          'function' == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t
                  }
        !(function () {
            function r(t, r, n, i, e) {
                'undefined' == typeof e && (e = 0.5)
                var o = y.projectionratio(e, t),
                    s = 1 - o,
                    u = { x: o * r.x + s * i.x, y: o * r.y + s * i.y },
                    a = y.abcratio(e, t),
                    f = { x: n.x + (n.x - u.x) / a, y: n.y + (n.y - u.y) / a }
                return { A: f, B: n, C: u }
            }
            var e = Math.abs,
                o = Math.min,
                s = Math.max,
                u = Math.cos,
                a = Math.sin,
                f = Math.acos,
                c = Math.sqrt,
                h = Math.PI,
                x = { x: 0, y: 0, z: 0 },
                y = n(2),
                l = n(3),
                p = function (t) {
                    var r = t && t.forEach ? t : [].slice.call(arguments),
                        n = !1
                    if ('object' === i(r[0])) {
                        n = r.length
                        var o = []
                        r.forEach(function (t) {
                            ;['x', 'y', 'z'].forEach(function (r) {
                                'undefined' != typeof t[r] && o.push(t[r])
                            })
                        }),
                            (r = o)
                    }
                    var s = !1,
                        u = r.length
                    if (n) {
                        if (n > 4) {
                            if (1 !== arguments.length)
                                throw new Error(
                                    'Only new Bezier(point[]) is accepted for 4th and higher order curves'
                                )
                            s = !0
                        }
                    } else if (
                        6 !== u &&
                        8 !== u &&
                        9 !== u &&
                        12 !== u &&
                        1 !== arguments.length
                    )
                        throw new Error(
                            'Only new Bezier(point[]) is accepted for 4th and higher order curves'
                        )
                    var a =
                        (!s && (9 === u || 12 === u)) ||
                        (t && t[0] && 'undefined' != typeof t[0].z)
                    this._3d = a
                    for (var f = [], c = 0, h = a ? 3 : 2; c < u; c += h) {
                        var x = { x: r[c], y: r[c + 1] }
                        a && (x.z = r[c + 2]), f.push(x)
                    }
                    ;(this.order = f.length - 1), (this.points = f)
                    var l = ['x', 'y']
                    a && l.push('z'),
                        (this.dims = l),
                        (this.dimlen = l.length),
                        (function (t) {
                            for (
                                var r = t.order,
                                    n = t.points,
                                    i = y.align(n, { p1: n[0], p2: n[r] }),
                                    o = 0;
                                o < i.length;
                                o++
                            )
                                if (e(i[o].y) > 1e-4)
                                    return void (t._linear = !1)
                            t._linear = !0
                        })(this),
                        (this._t1 = 0),
                        (this._t2 = 1),
                        this.update()
                },
                v = n(4)
            ;(p.SVGtoBeziers = function (t) {
                return v(p, t)
            }),
                (p.quadraticFromPoints = function (t, n, i, e) {
                    if (('undefined' == typeof e && (e = 0.5), 0 === e))
                        return new p(n, n, i)
                    if (1 === e) return new p(t, n, n)
                    var o = r(2, t, n, i, e)
                    return new p(t, o.A, i)
                }),
                (p.cubicFromPoints = function (t, n, i, e, o) {
                    'undefined' == typeof e && (e = 0.5)
                    var s = r(3, t, n, i, e)
                    'undefined' == typeof o && (o = y.dist(n, s.C))
                    var u = (o * (1 - e)) / e,
                        a = y.dist(t, i),
                        f = (i.x - t.x) / a,
                        c = (i.y - t.y) / a,
                        h = o * f,
                        x = o * c,
                        l = u * f,
                        v = u * c,
                        d = { x: n.x - h, y: n.y - x },
                        m = { x: n.x + l, y: n.y + v },
                        z = s.A,
                        g = {
                            x: z.x + (d.x - z.x) / (1 - e),
                            y: z.y + (d.y - z.y) / (1 - e),
                        },
                        b = {
                            x: z.x + (m.x - z.x) / e,
                            y: z.y + (m.y - z.y) / e,
                        },
                        _ = {
                            x: t.x + (g.x - t.x) / e,
                            y: t.y + (g.y - t.y) / e,
                        },
                        w = {
                            x: i.x + (b.x - i.x) / (1 - e),
                            y: i.y + (b.y - i.y) / (1 - e),
                        }
                    return new p(t, _, w, i)
                })
            var d = function () {
                return y
            }
            ;(p.getUtils = d),
                (p.PolyBezier = l),
                (p.prototype = {
                    getUtils: d,
                    valueOf: function () {
                        return this.toString()
                    },
                    toString: function () {
                        return y.pointsToString(this.points)
                    },
                    toSVG: function (t) {
                        if (this._3d) return !1
                        for (
                            var r = this.points,
                                n = r[0].x,
                                i = r[0].y,
                                e = ['M', n, i, 2 === this.order ? 'Q' : 'C'],
                                o = 1,
                                s = r.length;
                            o < s;
                            o++
                        )
                            e.push(r[o].x), e.push(r[o].y)
                        return e.join(' ')
                    },
                    setRatios: function (t) {
                        if (t.length !== this.points.length)
                            throw new Error('incorrect number of ratio values')
                        ;(this.ratios = t), (this._lut = [])
                    },
                    verify: function () {
                        var t = this.coordDigest()
                        t !== this._print && ((this._print = t), this.update())
                    },
                    coordDigest: function () {
                        return this.points
                            .map(function (t, r) {
                                return '' + r + t.x + t.y + (t.z ? t.z : 0)
                            })
                            .join('')
                    },
                    update: function (t) {
                        ;(this._lut = []),
                            (this.dpoints = y.derive(this.points, this._3d)),
                            this.computedirection()
                    },
                    computedirection: function () {
                        var t = this.points,
                            r = y.angle(t[0], t[this.order], t[1])
                        this.clockwise = r > 0
                    },
                    length: function () {
                        return y.length(this.derivative.bind(this))
                    },
                    _lut: [],
                    getLUT: function (t) {
                        if (
                            (this.verify(),
                            (t = t || 100),
                            this._lut.length === t)
                        )
                            return this._lut
                        ;(this._lut = []), t--
                        for (var r = 0; r <= t; r++)
                            this._lut.push(this.compute(r / t))
                        return this._lut
                    },
                    on: function (t, r) {
                        r = r || 5
                        for (
                            var n, i = this.getLUT(), e = [], o = 0, s = 0;
                            s < i.length;
                            s++
                        )
                            (n = i[s]),
                                y.dist(n, t) < r &&
                                    (e.push(n), (o += s / i.length))
                        return !!e.length && (o /= e.length)
                    },
                    project: function (t) {
                        var r,
                            n,
                            i,
                            e,
                            o = this.getLUT(),
                            s = o.length - 1,
                            u = y.closest(o, t),
                            a = u.mdist,
                            f = u.mpos,
                            c = (f - 1) / s,
                            h = (f + 1) / s,
                            x = 0.1 / s
                        for (a += 1, n = c, r = n; n < h + x; n += x)
                            (i = this.compute(n)),
                                (e = y.dist(t, i)),
                                e < a && ((a = e), (r = n))
                        return (i = this.compute(r)), (i.t = r), (i.d = a), i
                    },
                    get: function (t) {
                        return this.compute(t)
                    },
                    point: function (t) {
                        return this.points[t]
                    },
                    compute: function (t) {
                        return this.ratios
                            ? y.computeWithRatios(
                                  t,
                                  this.points,
                                  this.ratios,
                                  this._3d
                              )
                            : y.compute(t, this.points, this._3d, this.ratios)
                    },
                    raise: function () {
                        for (
                            var t,
                                r,
                                n,
                                i = this.points,
                                e = [i[0]],
                                o = i.length,
                                t = 1;
                            t < o;
                            t++
                        )
                            (r = i[t]),
                                (n = i[t - 1]),
                                (e[t] = {
                                    x: ((o - t) / o) * r.x + (t / o) * n.x,
                                    y: ((o - t) / o) * r.y + (t / o) * n.y,
                                })
                        return (e[o] = i[o - 1]), new p(e)
                    },
                    derivative: function (t) {
                        var r,
                            n,
                            i = 1 - t,
                            e = 0,
                            o = this.dpoints[0]
                        2 === this.order &&
                            ((o = [o[0], o[1], x]), (r = i), (n = t)),
                            3 === this.order &&
                                ((r = i * i), (n = i * t * 2), (e = t * t))
                        var s = {
                            x: r * o[0].x + n * o[1].x + e * o[2].x,
                            y: r * o[0].y + n * o[1].y + e * o[2].y,
                        }
                        return (
                            this._3d &&
                                (s.z = r * o[0].z + n * o[1].z + e * o[2].z),
                            s
                        )
                    },
                    curvature: function (t) {
                        return y.curvature(t, this.points, this._3d)
                    },
                    inflections: function () {
                        return y.inflections(this.points)
                    },
                    normal: function (t) {
                        return this._3d ? this.__normal3(t) : this.__normal2(t)
                    },
                    __normal2: function (t) {
                        var r = this.derivative(t),
                            n = c(r.x * r.x + r.y * r.y)
                        return { x: -r.y / n, y: r.x / n }
                    },
                    __normal3: function (t) {
                        var r = this.derivative(t),
                            n = this.derivative(t + 0.01),
                            i = c(r.x * r.x + r.y * r.y + r.z * r.z),
                            e = c(n.x * n.x + n.y * n.y + n.z * n.z)
                        ;(r.x /= i),
                            (r.y /= i),
                            (r.z /= i),
                            (n.x /= e),
                            (n.y /= e),
                            (n.z /= e)
                        var o = {
                                x: n.y * r.z - n.z * r.y,
                                y: n.z * r.x - n.x * r.z,
                                z: n.x * r.y - n.y * r.x,
                            },
                            s = c(o.x * o.x + o.y * o.y + o.z * o.z)
                        ;(o.x /= s), (o.y /= s), (o.z /= s)
                        var u = [
                                o.x * o.x,
                                o.x * o.y - o.z,
                                o.x * o.z + o.y,
                                o.x * o.y + o.z,
                                o.y * o.y,
                                o.y * o.z - o.x,
                                o.x * o.z - o.y,
                                o.y * o.z + o.x,
                                o.z * o.z,
                            ],
                            a = {
                                x: u[0] * r.x + u[1] * r.y + u[2] * r.z,
                                y: u[3] * r.x + u[4] * r.y + u[5] * r.z,
                                z: u[6] * r.x + u[7] * r.y + u[8] * r.z,
                            }
                        return a
                    },
                    hull: function (t) {
                        var r,
                            n = this.points,
                            i = [],
                            e = [],
                            o = 0,
                            s = 0,
                            u = 0
                        for (
                            e[o++] = n[0],
                                e[o++] = n[1],
                                e[o++] = n[2],
                                3 === this.order && (e[o++] = n[3]);
                            n.length > 1;

                        ) {
                            for (i = [], s = 0, u = n.length - 1; s < u; s++)
                                (r = y.lerp(t, n[s], n[s + 1])),
                                    (e[o++] = r),
                                    i.push(r)
                            n = i
                        }
                        return e
                    },
                    split: function (t, r) {
                        if (0 === t && r) return this.split(r).left
                        if (1 === r) return this.split(t).right
                        var n = this.hull(t),
                            i = {
                                left: new p(
                                    2 === this.order
                                        ? [n[0], n[3], n[5]]
                                        : [n[0], n[4], n[7], n[9]]
                                ),
                                right: new p(
                                    2 === this.order
                                        ? [n[5], n[4], n[2]]
                                        : [n[9], n[8], n[6], n[3]]
                                ),
                                span: n,
                            }
                        if (
                            ((i.left._t1 = y.map(0, 0, 1, this._t1, this._t2)),
                            (i.left._t2 = y.map(t, 0, 1, this._t1, this._t2)),
                            (i.right._t1 = y.map(t, 0, 1, this._t1, this._t2)),
                            (i.right._t2 = y.map(1, 0, 1, this._t1, this._t2)),
                            !r)
                        )
                            return i
                        r = y.map(r, t, 1, 0, 1)
                        var e = i.right.split(r)
                        return e.left
                    },
                    extrema: function () {
                        var t,
                            r,
                            n = this.dims,
                            i = {},
                            e = []
                        return (
                            n.forEach(
                                function (n) {
                                    ;(r = function (t) {
                                        return t[n]
                                    }),
                                        (t = this.dpoints[0].map(r)),
                                        (i[n] = y.droots(t)),
                                        3 === this.order &&
                                            ((t = this.dpoints[1].map(r)),
                                            (i[n] = i[n].concat(y.droots(t)))),
                                        (i[n] = i[n].filter(function (t) {
                                            return t >= 0 && t <= 1
                                        })),
                                        (e = e.concat(i[n].sort(y.numberSort)))
                                }.bind(this)
                            ),
                            (e = e.sort(y.numberSort).filter(function (t, r) {
                                return e.indexOf(t) === r
                            })),
                            (i.values = e),
                            i
                        )
                    },
                    bbox: function () {
                        var t = this.extrema(),
                            r = {}
                        return (
                            this.dims.forEach(
                                function (n) {
                                    r[n] = y.getminmax(this, n, t[n])
                                }.bind(this)
                            ),
                            r
                        )
                    },
                    overlaps: function (t) {
                        var r = this.bbox(),
                            n = t.bbox()
                        return y.bboxoverlap(r, n)
                    },
                    offset: function (t, r) {
                        if ('undefined' != typeof r) {
                            var n = this.get(t),
                                i = this.normal(t),
                                e = {
                                    c: n,
                                    n: i,
                                    x: n.x + i.x * r,
                                    y: n.y + i.y * r,
                                }
                            return this._3d && (e.z = n.z + i.z * r), e
                        }
                        if (this._linear) {
                            var o = this.normal(0),
                                s = this.points.map(function (r) {
                                    var n = {
                                        x: r.x + t * o.x,
                                        y: r.y + t * o.y,
                                    }
                                    return (
                                        r.z && i.z && (n.z = r.z + t * o.z), n
                                    )
                                })
                            return [new p(s)]
                        }
                        var u = this.reduce()
                        return u.map(function (r) {
                            return r._linear ? r.offset(t)[0] : r.scale(t)
                        })
                    },
                    simple: function () {
                        if (3 === this.order) {
                            var t = y.angle(
                                    this.points[0],
                                    this.points[3],
                                    this.points[1]
                                ),
                                r = y.angle(
                                    this.points[0],
                                    this.points[3],
                                    this.points[2]
                                )
                            if ((t > 0 && r < 0) || (t < 0 && r > 0)) return !1
                        }
                        var n = this.normal(0),
                            i = this.normal(1),
                            o = n.x * i.x + n.y * i.y
                        this._3d && (o += n.z * i.z)
                        var s = e(f(o))
                        return s < h / 3
                    },
                    reduce: function () {
                        var t,
                            r,
                            n = 0,
                            i = 0,
                            o = 0.01,
                            s = [],
                            u = [],
                            a = this.extrema().values
                        for (
                            a.indexOf(0) === -1 && (a = [0].concat(a)),
                                a.indexOf(1) === -1 && a.push(1),
                                n = a[0],
                                t = 1;
                            t < a.length;
                            t++
                        )
                            (i = a[t]),
                                (r = this.split(n, i)),
                                (r._t1 = n),
                                (r._t2 = i),
                                s.push(r),
                                (n = i)
                        return (
                            s.forEach(function (t) {
                                for (n = 0, i = 0; i <= 1; )
                                    for (i = n + o; i <= 1 + o; i += o)
                                        if (
                                            ((r = t.split(n, i)), !r.simple())
                                        ) {
                                            if (((i -= o), e(n - i) < o))
                                                return []
                                            ;(r = t.split(n, i)),
                                                (r._t1 = y.map(
                                                    n,
                                                    0,
                                                    1,
                                                    t._t1,
                                                    t._t2
                                                )),
                                                (r._t2 = y.map(
                                                    i,
                                                    0,
                                                    1,
                                                    t._t1,
                                                    t._t2
                                                )),
                                                u.push(r),
                                                (n = i)
                                            break
                                        }
                                n < 1 &&
                                    ((r = t.split(n, 1)),
                                    (r._t1 = y.map(n, 0, 1, t._t1, t._t2)),
                                    (r._t2 = t._t2),
                                    u.push(r))
                            }),
                            u
                        )
                    },
                    scale: function (t) {
                        var r = this.order,
                            n = !1
                        if (('function' == typeof t && (n = t), n && 2 === r))
                            return this.raise().scale(n)
                        var i = this.clockwise,
                            e = n ? n(0) : t,
                            o = n ? n(1) : t,
                            s = [this.offset(0, 10), this.offset(1, 10)],
                            u = y.lli4(s[0], s[0].c, s[1], s[1].c)
                        if (!u)
                            throw new Error(
                                'cannot scale this curve. Try reducing it first.'
                            )
                        var a = this.points,
                            f = []
                        return (
                            [0, 1].forEach(
                                function (t) {
                                    var n = (f[t * r] = y.copy(a[t * r]))
                                    ;(n.x += (t ? o : e) * s[t].n.x),
                                        (n.y += (t ? o : e) * s[t].n.y)
                                }.bind(this)
                            ),
                            n
                                ? ([0, 1].forEach(
                                      function (e) {
                                          if (2 !== this.order || !e) {
                                              var o = a[e + 1],
                                                  s = {
                                                      x: o.x - u.x,
                                                      y: o.y - u.y,
                                                  },
                                                  h = n ? n((e + 1) / r) : t
                                              n && !i && (h = -h)
                                              var x = c(s.x * s.x + s.y * s.y)
                                              ;(s.x /= x),
                                                  (s.y /= x),
                                                  (f[e + 1] = {
                                                      x: o.x + h * s.x,
                                                      y: o.y + h * s.y,
                                                  })
                                          }
                                      }.bind(this)
                                  ),
                                  new p(f))
                                : ([0, 1].forEach(
                                      function (t) {
                                          if (2 !== this.order || !t) {
                                              var n = f[t * r],
                                                  i = this.derivative(t),
                                                  e = {
                                                      x: n.x + i.x,
                                                      y: n.y + i.y,
                                                  }
                                              f[t + 1] = y.lli4(
                                                  n,
                                                  e,
                                                  u,
                                                  a[t + 1]
                                              )
                                          }
                                      }.bind(this)
                                  ),
                                  new p(f))
                        )
                    },
                    outline: function (t, r, n, i) {
                        function e(t, r, n, i, e) {
                            return function (o) {
                                var s = i / n,
                                    u = (i + e) / n,
                                    a = r - t
                                return y.map(o, 0, 1, t + s * a, t + u * a)
                            }
                        }
                        r = 'undefined' == typeof r ? t : r
                        var o,
                            s = this.reduce(),
                            u = s.length,
                            a = [],
                            f = [],
                            c = 0,
                            h = this.length(),
                            x =
                                'undefined' != typeof n &&
                                'undefined' != typeof i
                        s.forEach(function (o) {
                            ;(_ = o.length()),
                                x
                                    ? (a.push(o.scale(e(t, n, h, c, _))),
                                      f.push(o.scale(e(-r, -i, h, c, _))))
                                    : (a.push(o.scale(t)), f.push(o.scale(-r))),
                                (c += _)
                        }),
                            (f = f
                                .map(function (t) {
                                    return (
                                        (o = t.points),
                                        o[3]
                                            ? (t.points = [
                                                  o[3],
                                                  o[2],
                                                  o[1],
                                                  o[0],
                                              ])
                                            : (t.points = [o[2], o[1], o[0]]),
                                        t
                                    )
                                })
                                .reverse())
                        var p = a[0].points[0],
                            v = a[u - 1].points[a[u - 1].points.length - 1],
                            d = f[u - 1].points[f[u - 1].points.length - 1],
                            m = f[0].points[0],
                            z = y.makeline(d, p),
                            g = y.makeline(v, m),
                            b = [z].concat(a).concat([g]).concat(f),
                            _ = b.length
                        return new l(b)
                    },
                    outlineshapes: function (t, r, n) {
                        r = r || t
                        for (
                            var i = this.outline(t, r).curves,
                                e = [],
                                o = 1,
                                s = i.length;
                            o < s / 2;
                            o++
                        ) {
                            var u = y.makeshape(i[o], i[s - o], n)
                            ;(u.startcap.virtual = o > 1),
                                (u.endcap.virtual = o < s / 2 - 1),
                                e.push(u)
                        }
                        return e
                    },
                    intersects: function (t, r) {
                        return t
                            ? t.p1 && t.p2
                                ? this.lineIntersects(t)
                                : (t instanceof p && (t = t.reduce()),
                                  this.curveintersects(this.reduce(), t, r))
                            : this.selfintersects(r)
                    },
                    lineIntersects: function (t) {
                        var r = o(t.p1.x, t.p2.x),
                            n = o(t.p1.y, t.p2.y),
                            i = s(t.p1.x, t.p2.x),
                            e = s(t.p1.y, t.p2.y),
                            u = this
                        return y.roots(this.points, t).filter(function (t) {
                            var o = u.get(t)
                            return y.between(o.x, r, i) && y.between(o.y, n, e)
                        })
                    },
                    selfintersects: function (t) {
                        var r,
                            n,
                            i,
                            e,
                            o = this.reduce(),
                            s = o.length - 2,
                            u = []
                        for (r = 0; r < s; r++)
                            (i = o.slice(r, r + 1)),
                                (e = o.slice(r + 2)),
                                (n = this.curveintersects(i, e, t)),
                                (u = u.concat(n))
                        return u
                    },
                    curveintersects: function (t, r, n) {
                        var i = []
                        t.forEach(function (t) {
                            r.forEach(function (r) {
                                t.overlaps(r) && i.push({ left: t, right: r })
                            })
                        })
                        var e = []
                        return (
                            i.forEach(function (t) {
                                var r = y.pairiteration(t.left, t.right, n)
                                r.length > 0 && (e = e.concat(r))
                            }),
                            e
                        )
                    },
                    arcs: function (t) {
                        t = t || 0.5
                        var r = []
                        return this._iterate(t, r)
                    },
                    _error: function (t, r, n, i) {
                        var o = (i - n) / 4,
                            s = this.get(n + o),
                            u = this.get(i - o),
                            a = y.dist(t, r),
                            f = y.dist(t, s),
                            c = y.dist(t, u)
                        return e(f - a) + e(c - a)
                    },
                    _iterate: function (t, r) {
                        var n,
                            i = 0,
                            e = 1
                        do {
                            ;(n = 0), (e = 1)
                            var o,
                                s,
                                f,
                                c,
                                h,
                                x = this.get(i),
                                l = !1,
                                p = !1,
                                v = e,
                                d = 1,
                                m = 0
                            do {
                                ;(p = l),
                                    (c = f),
                                    (v = (i + e) / 2),
                                    m++,
                                    (o = this.get(v)),
                                    (s = this.get(e)),
                                    (f = y.getccenter(x, o, s)),
                                    (f.interval = { start: i, end: e })
                                var z = this._error(f, x, i, e)
                                if (
                                    ((l = z <= t),
                                    (h = p && !l),
                                    h || (d = e),
                                    l)
                                ) {
                                    if (e >= 1) {
                                        if (
                                            ((f.interval.end = d = 1),
                                            (c = f),
                                            e > 1)
                                        ) {
                                            var g = {
                                                x: f.x + f.r * u(f.e),
                                                y: f.y + f.r * a(f.e),
                                            }
                                            f.e += y.angle(
                                                { x: f.x, y: f.y },
                                                g,
                                                this.get(1)
                                            )
                                        }
                                        break
                                    }
                                    e += (e - i) / 2
                                } else e = v
                            } while (!h && n++ < 100)
                            if (n >= 100) break
                            ;(c = c ? c : f), r.push(c), (i = d)
                        } while (e < 1)
                        return r
                    },
                }),
                (t.exports = p)
        })()
    },
    function (t, r, n) {
        'use strict'
        !(function () {
            var r = Math.abs,
                i = Math.cos,
                e = Math.sin,
                o = Math.acos,
                s = Math.atan2,
                u = Math.sqrt,
                a = Math.pow,
                f = function (t) {
                    return t < 0 ? -a(-t, 1 / 3) : a(t, 1 / 3)
                },
                c = Math.PI,
                h = 2 * c,
                x = c / 2,
                y = 1e-6,
                l = Number.MAX_SAFE_INTEGER || 9007199254740991,
                p = Number.MIN_SAFE_INTEGER || -9007199254740991,
                v = { x: 0, y: 0, z: 0 },
                d = {
                    Tvalues: [
                        -0.06405689286260563, 0.06405689286260563,
                        -0.1911188674736163, 0.1911188674736163,
                        -0.3150426796961634, 0.3150426796961634,
                        -0.4337935076260451, 0.4337935076260451,
                        -0.5454214713888396, 0.5454214713888396,
                        -0.6480936519369755, 0.6480936519369755,
                        -0.7401241915785544, 0.7401241915785544,
                        -0.820001985973903, 0.820001985973903,
                        -0.8864155270044011, 0.8864155270044011,
                        -0.9382745520027328, 0.9382745520027328,
                        -0.9747285559713095, 0.9747285559713095,
                        -0.9951872199970213, 0.9951872199970213,
                    ],
                    Cvalues: [
                        0.12793819534675216, 0.12793819534675216,
                        0.1258374563468283, 0.1258374563468283,
                        0.12167047292780339, 0.12167047292780339,
                        0.1155056680537256, 0.1155056680537256,
                        0.10744427011596563, 0.10744427011596563,
                        0.09761865210411388, 0.09761865210411388,
                        0.08619016153195327, 0.08619016153195327,
                        0.0733464814110803, 0.0733464814110803,
                        0.05929858491543678, 0.05929858491543678,
                        0.04427743881741981, 0.04427743881741981,
                        0.028531388628933663, 0.028531388628933663,
                        0.0123412297999872, 0.0123412297999872,
                    ],
                    arcfn: function (t, r) {
                        var n = r(t),
                            i = n.x * n.x + n.y * n.y
                        return (
                            'undefined' != typeof n.z && (i += n.z * n.z), u(i)
                        )
                    },
                    compute: function (t, r, n) {
                        if (0 === t) return r[0]
                        var i = r.length - 1
                        if (1 === t) return r[i]
                        var e = r,
                            o = 1 - t
                        if (0 === i) return r[0]
                        if (1 === i)
                            return (
                                (x = {
                                    x: o * e[0].x + t * e[1].x,
                                    y: o * e[0].y + t * e[1].y,
                                }),
                                n && (x.z = o * e[0].z + t * e[1].z),
                                x
                            )
                        if (i < 4) {
                            var s,
                                u,
                                a,
                                f = o * o,
                                c = t * t,
                                h = 0
                            2 === i
                                ? ((e = [e[0], e[1], e[2], v]),
                                  (s = f),
                                  (u = o * t * 2),
                                  (a = c))
                                : 3 === i &&
                                  ((s = f * o),
                                  (u = f * t * 3),
                                  (a = o * c * 3),
                                  (h = t * c))
                            var x = {
                                x:
                                    s * e[0].x +
                                    u * e[1].x +
                                    a * e[2].x +
                                    h * e[3].x,
                                y:
                                    s * e[0].y +
                                    u * e[1].y +
                                    a * e[2].y +
                                    h * e[3].y,
                            }
                            return (
                                n &&
                                    (x.z =
                                        s * e[0].z +
                                        u * e[1].z +
                                        a * e[2].z +
                                        h * e[3].z),
                                x
                            )
                        }
                        for (
                            var y = JSON.parse(JSON.stringify(r));
                            y.length > 1;

                        ) {
                            for (var l = 0; l < y.length - 1; l++)
                                (y[l] = {
                                    x: y[l].x + (y[l + 1].x - y[l].x) * t,
                                    y: y[l].y + (y[l + 1].y - y[l].y) * t,
                                }),
                                    'undefined' != typeof y[l].z &&
                                        (y[l] =
                                            y[l].z + (y[l + 1].z - y[l].z) * t)
                            y.splice(y.length - 1, 1)
                        }
                        return y[0]
                    },
                    computeWithRatios: function (t, r, n, i) {
                        var e,
                            o = 1 - t,
                            s = n,
                            u = r,
                            a = s[0],
                            f = s[1],
                            c = s[2],
                            h = s[3]
                        return (
                            (a *= o),
                            (f *= t),
                            2 === u.length
                                ? ((e = a + f),
                                  {
                                      x: (a * u[0].x + f * u[1].x) / e,
                                      y: (a * u[0].y + f * u[1].y) / e,
                                      z: !!i && (a * u[0].z + f * u[1].z) / e,
                                  })
                                : ((a *= o),
                                  (f *= 2 * o),
                                  (c *= t * t),
                                  3 === u.length
                                      ? ((e = a + f + c),
                                        {
                                            x:
                                                (a * u[0].x +
                                                    f * u[1].x +
                                                    c * u[2].x) /
                                                e,
                                            y:
                                                (a * u[0].y +
                                                    f * u[1].y +
                                                    c * u[2].y) /
                                                e,
                                            z:
                                                !!i &&
                                                (a * u[0].z +
                                                    f * u[1].z +
                                                    c * u[2].z) /
                                                    e,
                                        })
                                      : ((a *= o),
                                        (f *= 1.5 * o),
                                        (c *= 3 * o),
                                        (h *= t * t * t),
                                        4 === u.length
                                            ? ((e = a + f + c + h),
                                              {
                                                  x:
                                                      (a * u[0].x +
                                                          f * u[1].x +
                                                          c * u[2].x +
                                                          h * u[3].x) /
                                                      e,
                                                  y:
                                                      (a * u[0].y +
                                                          f * u[1].y +
                                                          c * u[2].y +
                                                          h * u[3].y) /
                                                      e,
                                                  z:
                                                      !!i &&
                                                      (a * u[0].z +
                                                          f * u[1].z +
                                                          c * u[2].z +
                                                          h * u[3].z) /
                                                          e,
                                              })
                                            : void 0))
                        )
                    },
                    derive: function (t, r) {
                        for (
                            var n = [], i = t, e = i.length, o = e - 1;
                            e > 1;
                            e--, o--
                        ) {
                            for (var s, u = [], a = 0; a < o; a++)
                                (s = {
                                    x: o * (i[a + 1].x - i[a].x),
                                    y: o * (i[a + 1].y - i[a].y),
                                }),
                                    r && (s.z = o * (i[a + 1].z - i[a].z)),
                                    u.push(s)
                            n.push(u), (i = u)
                        }
                        return n
                    },
                    between: function (t, r, n) {
                        return (
                            (r <= t && t <= n) ||
                            d.approximately(t, r) ||
                            d.approximately(t, n)
                        )
                    },
                    approximately: function (t, n, i) {
                        return r(t - n) <= (i || y)
                    },
                    length: function (t) {
                        var r,
                            n,
                            i = 0.5,
                            e = 0,
                            o = d.Tvalues.length
                        for (r = 0; r < o; r++)
                            (n = i * d.Tvalues[r] + i),
                                (e += d.Cvalues[r] * d.arcfn(n, t))
                        return i * e
                    },
                    map: function (t, r, n, i, e) {
                        var o = n - r,
                            s = e - i,
                            u = t - r,
                            a = u / o
                        return i + s * a
                    },
                    lerp: function (t, r, n) {
                        var i = {
                            x: r.x + t * (n.x - r.x),
                            y: r.y + t * (n.y - r.y),
                        }
                        return r.z && n.z && (i.z = r.z + t * (n.z - r.z)), i
                    },
                    pointToString: function (t) {
                        var r = t.x + '/' + t.y
                        return 'undefined' != typeof t.z && (r += '/' + t.z), r
                    },
                    pointsToString: function (t) {
                        return '[' + t.map(d.pointToString).join(', ') + ']'
                    },
                    copy: function (t) {
                        return JSON.parse(JSON.stringify(t))
                    },
                    angle: function (t, r, n) {
                        var i = r.x - t.x,
                            e = r.y - t.y,
                            o = n.x - t.x,
                            u = n.y - t.y,
                            a = i * u - e * o,
                            f = i * o + e * u
                        return s(a, f)
                    },
                    round: function (t, r) {
                        var n = '' + t,
                            i = n.indexOf('.')
                        return parseFloat(n.substring(0, i + 1 + r))
                    },
                    dist: function (t, r) {
                        var n = t.x - r.x,
                            i = t.y - r.y
                        return u(n * n + i * i)
                    },
                    closest: function (t, r) {
                        var n,
                            i,
                            e = a(2, 63)
                        return (
                            t.forEach(function (t, o) {
                                ;(i = d.dist(r, t)), i < e && ((e = i), (n = o))
                            }),
                            { mdist: e, mpos: n }
                        )
                    },
                    abcratio: function (t, n) {
                        if (2 !== n && 3 !== n) return !1
                        if ('undefined' == typeof t) t = 0.5
                        else if (0 === t || 1 === t) return t
                        var i = a(t, n) + a(1 - t, n),
                            e = i - 1
                        return r(e / i)
                    },
                    projectionratio: function (t, r) {
                        if (2 !== r && 3 !== r) return !1
                        if ('undefined' == typeof t) t = 0.5
                        else if (0 === t || 1 === t) return t
                        var n = a(1 - t, r),
                            i = a(t, r) + n
                        return n / i
                    },
                    lli8: function (t, r, n, i, e, o, s, u) {
                        var a =
                                (t * i - r * n) * (e - s) -
                                (t - n) * (e * u - o * s),
                            f =
                                (t * i - r * n) * (o - u) -
                                (r - i) * (e * u - o * s),
                            c = (t - n) * (o - u) - (r - i) * (e - s)
                        return 0 != c && { x: a / c, y: f / c }
                    },
                    lli4: function (t, r, n, i) {
                        var e = t.x,
                            o = t.y,
                            s = r.x,
                            u = r.y,
                            a = n.x,
                            f = n.y,
                            c = i.x,
                            h = i.y
                        return d.lli8(e, o, s, u, a, f, c, h)
                    },
                    lli: function (t, r) {
                        return d.lli4(t, t.c, r, r.c)
                    },
                    makeline: function (t, r) {
                        var i = n(1),
                            e = t.x,
                            o = t.y,
                            s = r.x,
                            u = r.y,
                            a = (s - e) / 3,
                            f = (u - o) / 3
                        return new i(
                            e,
                            o,
                            e + a,
                            o + f,
                            e + 2 * a,
                            o + 2 * f,
                            s,
                            u
                        )
                    },
                    findbbox: function (t) {
                        var r = l,
                            n = l,
                            i = p,
                            e = p
                        return (
                            t.forEach(function (t) {
                                var o = t.bbox()
                                r > o.x.min && (r = o.x.min),
                                    n > o.y.min && (n = o.y.min),
                                    i < o.x.max && (i = o.x.max),
                                    e < o.y.max && (e = o.y.max)
                            }),
                            {
                                x: {
                                    min: r,
                                    mid: (r + i) / 2,
                                    max: i,
                                    size: i - r,
                                },
                                y: {
                                    min: n,
                                    mid: (n + e) / 2,
                                    max: e,
                                    size: e - n,
                                },
                            }
                        )
                    },
                    shapeintersections: function (t, r, n, i, e) {
                        if (!d.bboxoverlap(r, i)) return []
                        var o = [],
                            s = [t.startcap, t.forward, t.back, t.endcap],
                            u = [n.startcap, n.forward, n.back, n.endcap]
                        return (
                            s.forEach(function (r) {
                                r.virtual ||
                                    u.forEach(function (i) {
                                        if (!i.virtual) {
                                            var s = r.intersects(i, e)
                                            s.length > 0 &&
                                                ((s.c1 = r),
                                                (s.c2 = i),
                                                (s.s1 = t),
                                                (s.s2 = n),
                                                o.push(s))
                                        }
                                    })
                            }),
                            o
                        )
                    },
                    makeshape: function (t, r, n) {
                        var i = r.points.length,
                            e = t.points.length,
                            o = d.makeline(r.points[i - 1], t.points[0]),
                            s = d.makeline(t.points[e - 1], r.points[0]),
                            u = {
                                startcap: o,
                                forward: t,
                                back: r,
                                endcap: s,
                                bbox: d.findbbox([o, t, r, s]),
                            },
                            a = d
                        return (
                            (u.intersections = function (t) {
                                return a.shapeintersections(
                                    u,
                                    u.bbox,
                                    t,
                                    t.bbox,
                                    n
                                )
                            }),
                            u
                        )
                    },
                    getminmax: function (t, r, n) {
                        if (!n) return { min: 0, max: 0 }
                        var i,
                            e,
                            o = l,
                            s = p
                        n.indexOf(0) === -1 && (n = [0].concat(n)),
                            n.indexOf(1) === -1 && n.push(1)
                        for (var u = 0, a = n.length; u < a; u++)
                            (i = n[u]),
                                (e = t.get(i)),
                                e[r] < o && (o = e[r]),
                                e[r] > s && (s = e[r])
                        return { min: o, mid: (o + s) / 2, max: s, size: s - o }
                    },
                    align: function (t, r) {
                        var n = r.p1.x,
                            o = r.p1.y,
                            u = -s(r.p2.y - o, r.p2.x - n),
                            a = function (t) {
                                return {
                                    x: (t.x - n) * i(u) - (t.y - o) * e(u),
                                    y: (t.x - n) * e(u) + (t.y - o) * i(u),
                                }
                            }
                        return t.map(a)
                    },
                    roots: function (t, r) {
                        r = r || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } }
                        var n = t.length - 1,
                            e = d.align(t, r),
                            s = function (t) {
                                return 0 <= t && t <= 1
                            }
                        if (2 === n) {
                            var a = e[0].y,
                                c = e[1].y,
                                x = e[2].y,
                                y = a - 2 * c + x
                            if (0 !== y) {
                                var l = -u(c * c - a * x),
                                    p = -a + c,
                                    v = -(l + p) / y,
                                    m = -(-l + p) / y
                                return [v, m].filter(s)
                            }
                            return c !== x && 0 === y
                                ? [(2 * c - x) / (2 * c - 2 * x)].filter(s)
                                : []
                        }
                        var z = e[0].y,
                            g = e[1].y,
                            b = e[2].y,
                            _ = e[3].y,
                            y = -z + 3 * g - 3 * b + _,
                            a = 3 * z - 6 * g + 3 * b,
                            c = -3 * z + 3 * g,
                            x = z
                        if (d.approximately(y, 0)) {
                            if (d.approximately(a, 0))
                                return d.approximately(c, 0)
                                    ? []
                                    : [-x / c].filter(s)
                            var w = u(c * c - 4 * a * x),
                                E = 2 * a
                            return [(w - c) / E, (-c - w) / E].filter(s)
                        }
                        ;(a /= y), (c /= y), (x /= y)
                        var S,
                            v,
                            M,
                            k,
                            j,
                            e = (3 * c - a * a) / 3,
                            O = e / 3,
                            w = (2 * a * a * a - 9 * a * c + 27 * x) / 27,
                            T = w / 2,
                            C = T * T + O * O * O
                        if (C < 0) {
                            var L = -e / 3,
                                N = L * L * L,
                                A = u(N),
                                B = -w / (2 * A),
                                F = B < -1 ? -1 : B > 1 ? 1 : B,
                                I = o(F),
                                q = f(A),
                                P = 2 * q
                            return (
                                (M = P * i(I / 3) - a / 3),
                                (k = P * i((I + h) / 3) - a / 3),
                                (j = P * i((I + 2 * h) / 3) - a / 3),
                                [M, k, j].filter(s)
                            )
                        }
                        if (0 === C)
                            return (
                                (S = T < 0 ? f(-T) : -f(T)),
                                (M = 2 * S - a / 3),
                                (k = -S - a / 3),
                                [M, k].filter(s)
                            )
                        var R = u(C)
                        return (
                            (S = f(-T + R)),
                            (v = f(T + R)),
                            [S - v - a / 3].filter(s)
                        )
                    },
                    droots: function (t) {
                        if (3 === t.length) {
                            var r = t[0],
                                n = t[1],
                                i = t[2],
                                e = r - 2 * n + i
                            if (0 !== e) {
                                var o = -u(n * n - r * i),
                                    s = -r + n,
                                    a = -(o + s) / e,
                                    f = -(-o + s) / e
                                return [a, f]
                            }
                            return n !== i && 0 === e
                                ? [(2 * n - i) / (2 * (n - i))]
                                : []
                        }
                        if (2 === t.length) {
                            var r = t[0],
                                n = t[1]
                            return r !== n ? [r / (r - n)] : []
                        }
                    },
                    curvature: function (t, n, i, e) {
                        var o,
                            s,
                            f,
                            c,
                            h = d.derive(n),
                            x = h[0],
                            y = h[1],
                            l = 0,
                            p = 0,
                            v = d.compute(t, x),
                            m = d.compute(t, y),
                            z = v.x * v.x + v.y * v.y
                        if (
                            (i
                                ? ((o = u(
                                      a(v.y * m.z - m.y * v.z, 2) +
                                          a(v.z * m.x - m.z * v.x, 2) +
                                          a(v.x * m.y - m.x * v.y, 2)
                                  )),
                                  (s = a(z + v.z * v.z, 1.5)))
                                : ((o = v.x * m.y - v.y * m.x),
                                  (s = a(z, 1.5))),
                            0 === o || 0 === s)
                        )
                            return { k: 0, r: 0 }
                        if (((l = o / s), (p = s / o), !e)) {
                            var g = d.curvature(t - 0.001, n, i, !0).k,
                                b = d.curvature(t + 0.001, n, i, !0).k
                            ;(c = (b - l + (l - g)) / 2),
                                (f = (r(b - l) + r(l - g)) / 2)
                        }
                        return { k: l, r: p, dk: c, adk: f }
                    },
                    inflections: function (t) {
                        if (t.length < 4) return []
                        var r = d.align(t, { p1: t[0], p2: t.slice(-1)[0] }),
                            n = r[2].x * r[1].y,
                            i = r[3].x * r[1].y,
                            e = r[1].x * r[2].y,
                            o = r[3].x * r[2].y,
                            s = 18 * (-3 * n + 2 * i + 3 * e - o),
                            u = 18 * (3 * n - i - 3 * e),
                            a = 18 * (e - n)
                        if (d.approximately(s, 0)) {
                            if (!d.approximately(u, 0)) {
                                var f = -a / u
                                if (0 <= f && f <= 1) return [f]
                            }
                            return []
                        }
                        var c = u * u - 4 * s * a,
                            h = Math.sqrt(c),
                            o = 2 * s
                        return d.approximately(o, 0)
                            ? []
                            : [(h - u) / o, -(u + h) / o].filter(function (t) {
                                  return 0 <= t && t <= 1
                              })
                    },
                    bboxoverlap: function (t, n) {
                        var i,
                            e,
                            o,
                            s,
                            u,
                            a = ['x', 'y'],
                            f = a.length
                        for (i = 0; i < f; i++)
                            if (
                                ((e = a[i]),
                                (o = t[e].mid),
                                (s = n[e].mid),
                                (u = (t[e].size + n[e].size) / 2),
                                r(o - s) >= u)
                            )
                                return !1
                        return !0
                    },
                    expandbox: function (t, r) {
                        r.x.min < t.x.min && (t.x.min = r.x.min),
                            r.y.min < t.y.min && (t.y.min = r.y.min),
                            r.z && r.z.min < t.z.min && (t.z.min = r.z.min),
                            r.x.max > t.x.max && (t.x.max = r.x.max),
                            r.y.max > t.y.max && (t.y.max = r.y.max),
                            r.z && r.z.max > t.z.max && (t.z.max = r.z.max),
                            (t.x.mid = (t.x.min + t.x.max) / 2),
                            (t.y.mid = (t.y.min + t.y.max) / 2),
                            t.z && (t.z.mid = (t.z.min + t.z.max) / 2),
                            (t.x.size = t.x.max - t.x.min),
                            (t.y.size = t.y.max - t.y.min),
                            t.z && (t.z.size = t.z.max - t.z.min)
                    },
                    pairiteration: function (t, r, n) {
                        var i = t.bbox(),
                            e = r.bbox(),
                            o = 1e5,
                            s = n || 0.5
                        if (i.x.size + i.y.size < s && e.x.size + e.y.size < s)
                            return [
                                (((o * (t._t1 + t._t2)) / 2) | 0) / o +
                                    '/' +
                                    (((o * (r._t1 + r._t2)) / 2) | 0) / o,
                            ]
                        var u = t.split(0.5),
                            a = r.split(0.5),
                            f = [
                                { left: u.left, right: a.left },
                                { left: u.left, right: a.right },
                                { left: u.right, right: a.right },
                                { left: u.right, right: a.left },
                            ]
                        f = f.filter(function (t) {
                            return d.bboxoverlap(t.left.bbox(), t.right.bbox())
                        })
                        var c = []
                        return 0 === f.length
                            ? c
                            : (f.forEach(function (t) {
                                  c = c.concat(
                                      d.pairiteration(t.left, t.right, s)
                                  )
                              }),
                              (c = c.filter(function (t, r) {
                                  return c.indexOf(t) === r
                              })))
                    },
                    getccenter: function (t, r, n) {
                        var o,
                            u = r.x - t.x,
                            a = r.y - t.y,
                            f = n.x - r.x,
                            c = n.y - r.y,
                            y = u * i(x) - a * e(x),
                            l = u * e(x) + a * i(x),
                            p = f * i(x) - c * e(x),
                            v = f * e(x) + c * i(x),
                            m = (t.x + r.x) / 2,
                            z = (t.y + r.y) / 2,
                            g = (r.x + n.x) / 2,
                            b = (r.y + n.y) / 2,
                            _ = m + y,
                            w = z + l,
                            E = g + p,
                            S = b + v,
                            M = d.lli8(m, z, _, w, g, b, E, S),
                            k = d.dist(M, t),
                            j = s(t.y - M.y, t.x - M.x),
                            O = s(r.y - M.y, r.x - M.x),
                            T = s(n.y - M.y, n.x - M.x)
                        return (
                            j < T
                                ? ((j > O || O > T) && (j += h),
                                  j > T && ((o = T), (T = j), (j = o)))
                                : T < O && O < j
                                ? ((o = T), (T = j), (j = o))
                                : (T += h),
                            (M.s = j),
                            (M.e = T),
                            (M.r = k),
                            M
                        )
                    },
                    numberSort: function (t, r) {
                        return t - r
                    },
                }
            t.exports = d
        })()
    },
    function (t, r, n) {
        'use strict'
        !(function () {
            var r = n(2),
                i = function (t) {
                    ;(this.curves = []),
                        (this._3d = !1),
                        t &&
                            ((this.curves = t), (this._3d = this.curves[0]._3d))
                }
            ;(i.prototype = {
                valueOf: function () {
                    return this.toString()
                },
                toString: function () {
                    return (
                        '[' +
                        this.curves
                            .map(function (t) {
                                return r.pointsToString(t.points)
                            })
                            .join(', ') +
                        ']'
                    )
                },
                addCurve: function (t) {
                    this.curves.push(t), (this._3d = this._3d || t._3d)
                },
                length: function () {
                    return this.curves
                        .map(function (t) {
                            return t.length()
                        })
                        .reduce(function (t, r) {
                            return t + r
                        })
                },
                curve: function (t) {
                    return this.curves[t]
                },
                bbox: function t() {
                    for (
                        var n = this.curves, t = n[0].bbox(), i = 1;
                        i < n.length;
                        i++
                    )
                        r.expandbox(t, n[i].bbox())
                    return t
                },
                offset: function t(r) {
                    var t = []
                    return (
                        this.curves.forEach(function (n) {
                            t = t.concat(n.offset(r))
                        }),
                        new i(t)
                    )
                },
            }),
                (t.exports = i)
        })()
    },
    function (t, r, n) {
        'use strict'
        function i(t, r, n) {
            if ('Z' !== r) {
                if ('M' === r) return void (s = { x: n[0], y: n[1] })
                var i = [!1, s.x, s.y].concat(n),
                    e = t.bind.apply(t, i),
                    o = new e(),
                    u = n.slice(-2)
                return (s = { x: u[0], y: u[1] }), o
            }
        }
        function e(t, r) {
            for (
                var n,
                    e,
                    s,
                    u = o(r).split(' '),
                    a = new RegExp('[MLCQZ]', ''),
                    f = [],
                    c = { C: 6, Q: 4, L: 2, M: 2 };
                u.length;

            )
                (n = u.splice(0, 1)[0]),
                    a.test(n) &&
                        ((s = u.splice(0, c[n]).map(parseFloat)),
                        (e = i(t, n, s)),
                        e && f.push(e))
            return new t.PolyBezier(f)
        }
        var o = n(5),
            s = { x: !1, y: !1 }
        t.exports = e
    },
    function (t, r) {
        'use strict'
        function n(t) {
            t = t
                .replace(/,/g, ' ')
                .replace(/-/g, ' - ')
                .replace(/-\s+/g, '-')
                .replace(/([a-zA-Z])/g, ' $1 ')
            var r,
                n,
                i,
                e,
                o,
                s,
                u = t.replace(/([a-zA-Z])\s?/g, '|$1').split('|'),
                a = u.length,
                f = [],
                c = 0,
                h = 0,
                x = 0,
                y = 0,
                l = 0,
                p = 0,
                v = 0,
                d = 0,
                m = ''
            for (r = 1; r < a; r++)
                if (
                    ((n = u[r]),
                    (i = n.substring(0, 1)),
                    (e = i.toLowerCase()),
                    (f = n.replace(i, '').trim().split(' ')),
                    (f = f
                        .filter(function (t) {
                            return '' !== t
                        })
                        .map(parseFloat)),
                    (o = f.length),
                    'm' === e)
                ) {
                    if (
                        ((m += 'M '),
                        'm' === i
                            ? ((x += f[0]), (y += f[1]))
                            : ((x = f[0]), (y = f[1])),
                        (c = x),
                        (h = y),
                        (m += x + ' ' + y + ' '),
                        o > 2)
                    )
                        for (s = 0; s < o; s += 2)
                            'm' === i
                                ? ((x += f[s]), (y += f[s + 1]))
                                : ((x = f[s]), (y = f[s + 1])),
                                (m += ['L', x, y, ''].join(' '))
                } else if ('l' === e)
                    for (s = 0; s < o; s += 2)
                        'l' === i
                            ? ((x += f[s]), (y += f[s + 1]))
                            : ((x = f[s]), (y = f[s + 1])),
                            (m += ['L', x, y, ''].join(' '))
                else if ('h' === e)
                    for (s = 0; s < o; s++)
                        'h' === i ? (x += f[s]) : (x = f[s]),
                            (m += ['L', x, y, ''].join(' '))
                else if ('v' === e)
                    for (s = 0; s < o; s++)
                        'v' === i ? (y += f[s]) : (y = f[s]),
                            (m += ['L', x, y, ''].join(' '))
                else if ('q' === e)
                    for (s = 0; s < o; s += 4)
                        'q' === i
                            ? ((l = x + f[s]),
                              (p = y + f[s + 1]),
                              (x += f[s + 2]),
                              (y += f[s + 3]))
                            : ((l = f[s]),
                              (p = f[s + 1]),
                              (x = f[s + 2]),
                              (y = f[s + 3])),
                            (m += ['Q', l, p, x, y, ''].join(' '))
                else if ('t' === e)
                    for (s = 0; s < o; s += 2)
                        (l = x + (x - l)),
                            (p = y + (y - p)),
                            't' === i
                                ? ((x += f[s]), (y += f[s + 1]))
                                : ((x = f[s]), (y = f[s + 1])),
                            (m += ['Q', l, p, x, y, ''].join(' '))
                else if ('c' === e)
                    for (s = 0; s < o; s += 6)
                        'c' === i
                            ? ((l = x + f[s]),
                              (p = y + f[s + 1]),
                              (v = x + f[s + 2]),
                              (d = y + f[s + 3]),
                              (x += f[s + 4]),
                              (y += f[s + 5]))
                            : ((l = f[s]),
                              (p = f[s + 1]),
                              (v = f[s + 2]),
                              (d = f[s + 3]),
                              (x = f[s + 4]),
                              (y = f[s + 5])),
                            (m += ['C', l, p, v, d, x, y, ''].join(' '))
                else if ('s' === e)
                    for (s = 0; s < o; s += 4)
                        (l = x + (x - v)),
                            (p = y + (y - d)),
                            's' === i
                                ? ((v = x + f[s]),
                                  (d = y + f[s + 1]),
                                  (x += f[s + 2]),
                                  (y += f[s + 3]))
                                : ((v = f[s]),
                                  (d = f[s + 1]),
                                  (x = f[s + 2]),
                                  (y = f[s + 3])),
                            (m += ['C', l, p, v, d, x, y, ''].join(' '))
                else 'z' === e && ((m += 'Z '), (x = c), (y = h))
            return m.trim()
        }
        t.exports = n
    },
])
