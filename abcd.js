var cursoreffects = (function (t) {
    "use strict";
    return (
        (t.fairyDustCursor = function (t) {
            let e = (t && t.colors) || ["#D61C59", "#E7D84B", "#1B8798"],
                n = t && t.element,
                i = n || document.body,
                o = window.innerWidth,
                s = window.innerHeight;
            const h = { x: o / 2, y: o / 2 },
                c = { x: o / 2, y: o / 2 },
                l = [],
                a = [];
            let r, d, u;
            const A = window.matchMedia("(prefers-reduced-motion: reduce)");
            function m() {
                if (A.matches)
                    return (
                        console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), !1
                    );
                (r = document.createElement("canvas")),
                    (d = r.getContext("2d")),
                    (r.style.top = "0px"),
                    (r.style.left = "0px"),
                    (r.style.pointerEvents = "none"),
                    n
                        ? ((r.style.position = "absolute"),
                          i.appendChild(r),
                          (r.width = i.clientWidth),
                          (r.height = i.clientHeight))
                        : ((r.style.position = "fixed"), i.appendChild(r), (r.width = o), (r.height = s)),
                    (d.font = "21px serif"),
                    (d.textBaseline = "middle"),
                    (d.textAlign = "center"),
                    e.forEach((t) => {
                        let e = d.measureText("*"),
                            n = document.createElement("canvas"),
                            i = n.getContext("2d");
                        (n.width = e.width),
                            (n.height = e.actualBoundingBoxAscent + e.actualBoundingBoxDescent),
                            (i.fillStyle = t),
                            (i.textAlign = "center"),
                            (i.font = "21px serif"),
                            (i.textBaseline = "middle"),
                            i.fillText("*", n.width / 2, e.actualBoundingBoxAscent),
                            a.push(n);
                    }),
                    i.addEventListener("mousemove", p),
                    i.addEventListener("touchmove", f, { passive: !0 }),
                    i.addEventListener("touchstart", f, { passive: !0 }),
                    window.addEventListener("resize", g),
                    v();
                // QUINN FUCKED AROUND HERE 🧙‍♂️
                setInterval(() => {
                    // h.x and h.y always track latest cursor position,
                    // so we spawn particles at last known cursor position.
                    y(h.x, h.y, a[Math.floor(Math.random() * a.length)]);
                }, 60);
                // END QUINN'S FUCKERY 🧙‍♂️
            }
            function g(t) {
                (o = window.innerWidth),
                    (s = window.innerHeight),
                    n ? ((r.width = i.clientWidth), (r.height = i.clientHeight)) : ((r.width = o), (r.height = s));
            }
            function f(t) {
                if (t.touches.length > 0)
                    for (let e = 0; e < t.touches.length; e++)
                        y(t.touches[e].clientX, t.touches[e].clientY, a[Math.floor(Math.random() * a.length)]);
            }
            function p(t) {
                window.requestAnimationFrame(() => {
                    if (n) {
                        const e = i.getBoundingClientRect();
                        (h.x = t.clientX - e.left), (h.y = t.clientY - e.top);
                    } else (h.x = t.clientX), (h.y = t.clientY);
                    Math.hypot(h.x - c.x, h.y - c.y) > 1.5 &&
                        (y(h.x, h.y, a[Math.floor(Math.random() * e.length)]), (c.x = h.x), (c.y = h.y));
                });
            }
            function y(t, e, n) {
                l.push(new x(t, e, n));
            }
            function v() {
                !(function () {
                    if (0 != l.length) {
                        d.clearRect(0, 0, o, s);
                        for (let t = 0; t < l.length; t++) l[t].update(d);
                        for (let t = l.length - 1; t >= 0; t--) l[t].lifeSpan < 0 && l.splice(t, 1);
                        0 == l.length && d.clearRect(0, 0, o, s);
                    }
                })(),
                    (u = requestAnimationFrame(v));
            }
            function w() {
                r.remove(),
                    cancelAnimationFrame(u),
                    i.removeEventListener("mousemove", p),
                    i.removeEventListener("touchmove", f),
                    i.removeEventListener("touchstart", f),
                    window.addEventListener("resize", g);
            }
            function x(t, e, n) {
                const i = Math.floor(30 * Math.random() + 60);
                (this.initialLifeSpan = i),
                    (this.lifeSpan = i),
                    (this.velocity = {
                        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                        y: 0.7 * Math.random() + 0.9
                    }),
                    (this.position = { x: t, y: e }),
                    (this.canv = n),
                    (this.update = function (t) {
                        (this.position.x += this.velocity.x),
                            (this.position.y += this.velocity.y),
                            this.lifeSpan--,
                            (this.velocity.y += 0.02);
                        const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
                        t.drawImage(
                            this.canv,
                            this.position.x - (this.canv.width / 2) * e,
                            this.position.y - this.canv.height / 2,
                            this.canv.width * e,
                            this.canv.height * e
                        );
                    });
            }
            return (
                (A.onchange = () => {
                    A.matches ? w() : m();
                }),
                m(),
                { destroy: w }
            );
        }),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        t
    );
})({});