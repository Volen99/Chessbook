(window.webpackJsonp = window.webpackJsonp || []).push([
  [5], {
    "6Gv9": function (e, n, t) {
      "use strict";

      n.__esModule = true, n.default = void 0;
      var o = {
          centroidDimension: function (e, n, t, r) {
            var a = e.touchBank;
            var  i = 0;
            var l = 0;
            var u = 1 === e.numberActiveTouches ? e.touchBank[e.indexOfSingleActiveTouch] : null;

            if (null !== u) u.touchActive && u.currentTimeStamp > n && (i += r && t ? u.currentPageX : r && !t ? u.currentPageY : !r && t ? u.previousPageX : u.previousPageY, l = 1);
            else
              for (var c = 0; c < a.length; c++) {
                var s = a[c];
                if (null != s && s.touchActive && s.currentTimeStamp >= n) {
                  i += r && t ? s.currentPageX : r && !t ? s.currentPageY : !r && t ? s.previousPageX : s.previousPageY, l++
                }
              }
            return l > 0 ? i / l : o.noCentroid
          },
          currentCentroidXOfTouchesChangedAfter: function (e, n) {
            return o.centroidDimension(e, n, !0, !0)
          },
          currentCentroidYOfTouchesChangedAfter: function (e, n) {
            return o.centroidDimension(e, n, !1, !0)
          },
          previousCentroidXOfTouchesChangedAfter: function (e, n) {
            return o.centroidDimension(e, n, !0, !1)
          },
          previousCentroidYOfTouchesChangedAfter: function (e, n) {
            return o.centroidDimension(e, n, !1, !1)
          },
          currentCentroidX: function (e) {
            return o.centroidDimension(e, 0, !0, !0)
          },
          currentCentroidY: function (e) {
            return o.centroidDimension(e, 0, !1, !0)
          },
          noCentroid: -1
        },
        r = o;
      n.default = r, e.exports = n.default
    },

    "9RkS": function (e, n, t) {
      "use strict";

      t("LW0h"), t("hCOa"), t("z84I"), t("87if"), t("uFXj");
      var o = t("97Jx"),
        r = t.n(o),
        a = t("1Pcy"),
        i = t.n(a),
        l = t("W/Kd"),
        u = t.n(l),
        c = t("KEM+"),
        s = t.n(c),
        d = t("l0/+"),
        h = t("xa7s"),
        p = t("ERkP"),
        f = t("CHgo"),
        m = t("py1r"),
        v = t("I4+6"),
        g = t("cm6r"),
        R = t("7nmT"),
        _ = t.n(R),
        S = t("rHpw"),
        y = t("/uF9"),
        T = t.n(y),
        b = t("ix0h"),
        M = t.n(b),
        x = t("3xO4"),
        P = t.n(x),
        w = function (e) {
          function n(n, t) {
            var o;
            return o = e.call(this, n, t) || this, s()(i()(o), "_sliderLength", 1), s()(i()(o), "_isActive", !1), s()(i()(o), "_keyPressValueDelta", 1), s()(i()(o), "_shouldOverrideRTL", (function () {
              return T.a.isRTL && o.props.keepLTR
            })), s()(i()(o), "_isRTL", (function () {
              return T.a.isRTL && !o.props.keepLTR
            })), s()(i()(o), "_handleRootRef", (function (e) {
              var n = _.a.findDOMNode(e);
              n instanceof window.HTMLElement && (o._removeTouchMoveToScrollListener = Object(f.a)(n, o._handleTouchMoveToScroll, !1))
            })), s()(i()(o), "_handleSliderRef", (function (e) {
              o._sliderRef = e
            })), s()(i()(o), "_handleLayout", (function (e) {
              var n = o.props.isVertical;
              o._sliderLength = e.nativeEvent.layout[n ? "height" : "width"]
            })), s()(i()(o), "_resetKeyPressValueDelta", (function () {
              var e = o.props,
                n = e.min,
                t = e.max,
                r = e.step;
              o._keyPressValueDelta = "number" == typeof r ? r : .001 * (t - n)
            })), s()(i()(o), "_handleKeyUp", (function (e) {
              o._resetKeyPressValueDelta()
            })), s()(i()(o), "_handleKeyDown", (function (e) {
              var n = o.props,
                t = n.keyboardStep,
                r = n.min,
                a = n.max,
                i = n.step,
                l = n.value,
                u = e.altKey,
                c = e.ctrlKey,
                s = e.metaKey;
              if (!(u || c || s)) {
                var d = o._isRTL(),
                  h = "ArrowUp" === e.key || e.key === (d ? "ArrowLeft" : "ArrowRight"),
                  p = "ArrowDown" === e.key || e.key === (d ? "ArrowRight" : "ArrowLeft");
                if (h || p) {
                  var f = l;
                  if (t) f = o._normalizeValue(l + t * (h ? 1 : -1));
                  else {
                    var m = .05 * (a - r);
                    "number" == typeof i && m < i && (m = i);
                    var v = Math.min(o._keyPressValueDelta, m) * (h ? 1 : -1);
                    o._keyPressValueDelta *= 1.4, f = o._normalizeValue(l + v)
                  }
                  o._triggerChange(f), f !== r && f !== a || o._resetKeyPressValueDelta(), e.preventDefault()
                }
              }
            })), s()(i()(o), "_handleMouseDown", (function (e) {
              e.preventDefault()
            })), s()(i()(o), "_normalizeValue", (function (e) {
              var n = o.props,
                t = n.min,
                r = n.max,
                a = o._roundToMultipleOfStep(e);
              return Math.max(t, Math.min(a, r))
            })), s()(i()(o), "_roundToMultipleOfStep", (function (e) {
              var n = o.props.step;
              return "number" == typeof n ? n * Math.round(e / n) : e
            })), s()(i()(o), "_triggerChange", (function (e) {
              (0, o.props.onChange)(o._normalizeValue(e))
            })), s()(i()(o), "_handleStartShouldSetPanResponder", (function (e, n) {
              return !0
            })), s()(i()(o), "_handleMoveShouldSetPanResponder", (function (e, n) {
              return !0
            })), s()(i()(o), "_handlePanResponderGrant", (function (e, n) {
              var t = o.props,
                r = t.isVertical,
                a = t.min,
                i = r ? o._getLocationY(e) : o._getLocationX(e),
                l = o._normalizeValue(a + o._scaleLengthByMinMaxRatio(i));
              o._triggerChange(l), o._valueOnGrant = l, o._setActive(!0)
            })), s()(i()(o), "_scaleLengthByMinMaxRatio", (function (e) {
              var n = o.props,
                t = n.min,
                r = n.max;
              return e / o._sliderLength * (r - t)
            })), s()(i()(o), "_getLocationX", (function (e) {
              var n = e.currentTarget,
                t = "function" == typeof n.getBoundingClientRect ? n.getBoundingClientRect() : {
                  left: 0
                },
                r = e.nativeEvent.pageX - window.pageXOffset - (t && t.left || 0);
              return o._isRTL() ? o._sliderLength - r : r
            })), s()(i()(o), "_getLocationY", (function (e) {
              var n = e.currentTarget,
                t = "function" == typeof n.getBoundingClientRect ? n.getBoundingClientRect() : {
                  top: 0
                },
                r = e.nativeEvent.pageY - window.pageYOffset - (t && t.top || 0);
              return o._sliderLength - r
            })), s()(i()(o), "_setActive", (function (e) {
              var n = o.props.onActive;
              o._isActive = e, n && n(o._isActive)
            })), s()(i()(o), "_handleTouchMoveToScroll", (function (e) {
              e.preventDefault()
            })), s()(i()(o), "_handlePanResponderChange", (function (e) {
              var n = 0;
              n = o.props.isVertical ? -1 * e.dy : (o._isRTL() ? -1 : 1) * e.dx, o._triggerChange(o._valueOnGrant + o._scaleLengthByMinMaxRatio(n))
            })), s()(i()(o), "_handlePanResponderMove", (function (e, n) {
              o._handlePanResponderChange(n)
            })), s()(i()(o), "_handlePanResponderEnd", (function (e, n) {
              o._handlePanResponderChange(n), o._setActive(!1)
            })), s()(i()(o), "_handleFocusRingGained", (function () {
              o.setState({
                focused: !0
              })
            })), s()(i()(o), "_handleFocusRingLost", (function () {
              o.setState({
                focused: !1
              })
            })), o.state = {
              focused: !1
            }, o._resetKeyPressValueDelta(), o._panResponder = M.a.create({
              onStartShouldSetPanResponder: o._handleStartShouldSetPanResponder,
              onMoveShouldSetPanResponder: o._handleMoveShouldSetPanResponder,
              onPanResponderGrant: o._handlePanResponderGrant,
              onPanResponderMove: o._handlePanResponderMove,
              onPanResponderRelease: o._handlePanResponderEnd,
              onPanResponderTerminate: o._handlePanResponderEnd
            }), o
          }
          u()(n, e);
          var t = n.prototype;
          return t.componentDidMount = function () {
            this.props.autoFocus && this._sliderRef && this._sliderRef.focus()
          }, t.componentWillUnmount = function () {
            this._removeTouchMoveToScrollListener && this._removeTouchMoveToScrollListener()
          }, t.render = function () {
            var e = this,
              n = this.props,
              t = n.accessibilityLabel,
              o = n.accessibilityLabelValueText,
              a = n.color,
              i = n.isVertical,
              l = n.min,
              u = n.minIcon,
              c = n.max,
              s = n.maxIcon,
              f = n.step,
              R = n.withHidingThumb,
              _ = n.withMarkers,
              y = n.value,
              T = S.a.theme.colors[a],
              b = h.b(T),
              M = d.c({
                color: b,
                percent: .33,
                replace: !0
              }),
              x = h.e(M),
              w = v.a.generate({
                backgroundColor: S.a.theme.colors.transparent,
                color: T
              }),
              k = "white" === a ? d.a({
                color: b,
                coefficient: .4
              }) : d.b({
                color: b,
                coefficient: .5
              }),
              L = h.e(k),
              D = {
                backgroundColor: T
              },
              A = {
                backgroundColor: L
              },
              O = {
                backgroundColor: x
              },
              H = this._shouldOverrideRTL(),
              I = this.props.isVertical ? "bottom" : H ? "right" : "left",
              z = [];
            if (_ && "number" == typeof f) {
              var E = c - l / f + 1;
              z = Array.from({
                length: E
              }).map((function (e, n) {
                return n * f + l
              })).filter((function (e) {
                return e !== y
              })).map((function (e) {
                var n;
                return {
                  value: e,
                  style: ((n = {})[I] = 100 * ((e - l) / (c - l)) + "%", n),
                  thumbStyle: e <= y ? D : A
                }
              }))
            }
            return p.createElement(P.a, {
              style: [C.root, i && C.verticalRoot, H && C.ltr]
            }, i && s ? p.createElement(P.a, {
              style: C.maxIconVerticalMargin
            }, s) : !i && u ? p.createElement(P.a, {
              style: H ? C.minIconHorizontalMarginOverrideRTL : C.minIconHorizontalMargin
            }, u) : null, p.createElement(m.a, null, (function (n) {
              var u, s = n.isHovered,
                d = e.state.focused || e._isActive,
                h = R && !s && !d,
                f = (y - l) / (c - l),
                v = {
                  flexGrow: f
                },
                _ = ((u = {})[I] = 100 * f + "%", u),
                S = [C.thumbButton, i ? C.verticalThumbButton : H ? C.horizontalThumbButtonOverrideRTL : C.horizontalThumbButton];
              return p.createElement(P.a, r()({
                style: [C.slider, i ? C.verticalSlider : C.horizontalSlider]
              }, e._panResponder.panHandlers, {
                onLayout: e._handleLayout,
                ref: e._handleRootRef
              }), p.createElement(P.a, {
                style: [C.track, i ? C.verticalTrack : C.horizontalTrack, h && (i ? C.verticalTrackWithHiddenThumb : C.horizontalTrackWithHiddenThumb), "white" === a ? O : A]
              }, p.createElement(P.a, {
                style: [C.progress, D, v]
              }), p.createElement(m.a, {
                onFocusRingGained: e._handleFocusRingGained,
                onFocusRingLost: e._handleFocusRingLost
              }, (function (n) {
                var r = n.isHovered,
                  a = (n.isPressed, n.hasFocusRing);
                return p.createElement(P.a, {
                  accessibilityLabel: t,
                  accessibilityRole: "slider",
                  accessible: !0,
                  "aria-valuemax": c,
                  "aria-valuemin": l,
                  "aria-valuenow": y,
                  "aria-valuetext": o || y,
                  onKeyDown: e._handleKeyDown,
                  onKeyUp: e._handleKeyUp,
                  onMouseDown: e._handleMouseDown,
                  ref: e._handleSliderRef,
                  style: [S, w.transitionStyle, (a || r) && w.hoverStyle, d && w.pressedStyle, a && w.focusRingStyle, _]
                }, p.createElement(P.a, {
                  style: [C.thumb, h && C.thumbHidden, d && C.thumbActive, D]
                }))
              })), z.map((function (e) {
                return p.createElement(g.a, {
                  accessibilityRole: "none",
                  interactiveStyles: w,
                  key: e.value,
                  style: [S, e.style]
                }, p.createElement(P.a, {
                  style: [C.markerThumb, e.thumbStyle]
                }))
              }))))
            })), i && u ? p.createElement(P.a, {
              style: C.minIconVerticalMargin
            }, u) : !i && s ? p.createElement(P.a, {
              style: H ? C.maxIconHorizontalMarginOverrideRTL : C.maxIconHorizontalMargin
            }, s) : null)
          }, n
        }(p.Component);
      s()(w, "defaultProps", {
        color: "primary",
        step: 1
      });
      var C = S.a.create((function (e) {
        return {
          root: {
            userSelect: "none",
            flexDirection: "row",
            alignItems: "center"
          },
          ltr: {
            writingDirection: "ltr"
          },
          verticalRoot: {
            flexDirection: "column",
            flexGrow: 1
          },
          minIconHorizontalMargin: {
            marginRight: e.spaces.xSmall
          },
          maxIconHorizontalMargin: {
            marginLeft: e.spaces.xSmall
          },
          minIconHorizontalMarginOverrideRTL: {
            marginLeft: e.spaces.xSmall
          },
          maxIconHorizontalMarginOverrideRTL: {
            marginRight: e.spaces.xSmall
          },
          maxIconVerticalMargin: {
            marginBottom: e.spaces.xSmall
          },
          minIconVerticalMargin: {
            marginTop: e.spaces.xSmall
          },
          slider: {
            cursor: "pointer",
            flexGrow: 1,
            alignItems: "center"
          },
          verticalSlider: {
            width: e.spaces.medium,
            flexDirection: "column"
          },
          horizontalSlider: {
            height: e.spaces.medium,
            flexDirection: "row"
          },
          track: {
            backgroundColor: e.colors.lightGray,
            borderRadius: e.borderRadii.medium,
            flexGrow: 1,
            alignItems: "center"
          },
          verticalTrack: {
            width: e.spaces.xxSmall,
            flexDirection: "column",
            justifyContent: "flex-end"
          },
          horizontalTrack: {
            height: e.spaces.xxSmall,
            flexDirection: "row"
          },
          verticalTrackWithHiddenThumb: {
            width: "calc(" + e.spaces.xxSmall + " / 2)"
          },
          horizontalTrackWithHiddenThumb: {
            height: "calc(" + e.spaces.xxSmall + " / 2)"
          },
          progress: {
            backgroundColor: e.colors.primary,
            borderRadius: e.borderRadii.medium,
            alignSelf: "stretch"
          },
          thumbButton: {
            borderRadius: e.borderRadii.infinite,
            cursor: "pointer",
            height: e.spaces.large,
            width: e.spaces.large,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute"
          },
          verticalThumbButton: {
            marginBottom: "calc(-1 * (" + e.spaces.large + " / 2))"
          },
          horizontalThumbButton: {
            marginLeft: "calc(-1 * (" + e.spaces.large + " / 2))"
          },
          horizontalThumbButtonOverrideRTL: {
            marginRight: "calc(-1 * (" + e.spaces.large + " / 2))"
          },
          thumb: {
            backgroundColor: e.colors.white,
            height: e.spaces.small,
            width: e.spaces.small,
            borderRadius: e.borderRadii.infinite,
            transitionProperty: "transform",
            transitionDuration: "0.1s",
            transform: [{
              scale: 1
            }],
            boxShadow: e.boxShadows.xSmall
          },
          markerThumb: {
            height: 12,
            width: 12,
            borderRadius: e.borderRadii.infinite,
            boxShadow: e.boxShadows.xSmall
          },
          thumbActive: {
            transform: [{
              scale: 1.2
            }]
          },
          thumbHidden: {
            transform: [{
              scale: 0
            }]
          }
        }
      }));
      n.a = w
    },
    MGTW: function (e, n, t) {
      "use strict";
      n.__esModule = !0, n.default = void 0;
      var o = a(t("Z1lb")),
        r = a(t("6Gv9"));

      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var i = r.default.currentCentroidXOfTouchesChangedAfter,
        l = r.default.currentCentroidYOfTouchesChangedAfter,
        u = r.default.previousCentroidXOfTouchesChangedAfter,
        c = r.default.previousCentroidYOfTouchesChangedAfter,
        s = r.default.currentCentroidX,
        d = r.default.currentCentroidY,
        h = {
          _initializeGestureState: function (e) {
            e.moveX = 0, e.moveY = 0, e.x0 = 0, e.y0 = 0, e.dx = 0, e.dy = 0, e.vx = 0, e.vy = 0, e.numberActiveTouches = 0, e._accountsForMovesUpTo = 0
          },
          _updateGestureStateOnMove: function (e, n) {
            e.numberActiveTouches = n.numberActiveTouches, e.moveX = i(n, e._accountsForMovesUpTo), e.moveY = l(n, e._accountsForMovesUpTo);
            var t = e._accountsForMovesUpTo,
              o = u(n, t),
              r = i(n, t),
              a = c(n, t),
              s = l(n, t),
              d = e.dx + (r - o),
              h = e.dy + (s - a),
              p = n.mostRecentTimeStamp - e._accountsForMovesUpTo;
            e.vx = (d - e.dx) / p, e.vy = (h - e.dy) / p, e.dx = d, e.dy = h, e._accountsForMovesUpTo = n.mostRecentTimeStamp
          },
          create: function (e) {
            var n = {
                handle: null
              },
              t = {
                stateID: Math.random(),
                moveX: 0,
                moveY: 0,
                x0: 0,
                y0: 0,
                dx: 0,
                dy: 0,
                vx: 0,
                vy: 0,
                numberActiveTouches: 0,
                _accountsForMovesUpTo: 0
              };
            return {
              panHandlers: {
                onStartShouldSetResponder: function (n) {
                  return null != e.onStartShouldSetPanResponder && e.onStartShouldSetPanResponder(n, t)
                },
                onMoveShouldSetResponder: function (n) {
                  return null != e.onMoveShouldSetPanResponder && e.onMoveShouldSetPanResponder(n, t)
                },
                onStartShouldSetResponderCapture: function (n) {
                  return 1 === n.nativeEvent.touches.length && h._initializeGestureState(t), t.numberActiveTouches = n.touchHistory.numberActiveTouches, null != e.onStartShouldSetPanResponderCapture && e.onStartShouldSetPanResponderCapture(n, t)
                },
                onMoveShouldSetResponderCapture: function (n) {
                  var o = n.touchHistory;
                  return t._accountsForMovesUpTo !== o.mostRecentTimeStamp && (h._updateGestureStateOnMove(t, o), !!e.onMoveShouldSetPanResponderCapture && e.onMoveShouldSetPanResponderCapture(n, t))
                },
                onResponderGrant: function (r) {
                  return n.handle || (n.handle = o.default.createInteractionHandle()), t.x0 = s(r.touchHistory), t.y0 = d(r.touchHistory), t.dx = 0, t.dy = 0, e.onPanResponderGrant && e.onPanResponderGrant(r, t), null == e.onShouldBlockNativeResponder || e.onShouldBlockNativeResponder(r, t)
                },
                onResponderReject: function (o) {
                  p(n, e.onPanResponderReject, o, t)
                },
                onResponderRelease: function (o) {
                  p(n, e.onPanResponderRelease, o, t), h._initializeGestureState(t)
                },
                onResponderStart: function (n) {
                  var o = n.touchHistory;
                  t.numberActiveTouches = o.numberActiveTouches, e.onPanResponderStart && e.onPanResponderStart(n, t)
                },
                onResponderMove: function (n) {
                  var o = n.touchHistory;
                  t._accountsForMovesUpTo !== o.mostRecentTimeStamp && (h._updateGestureStateOnMove(t, o), e.onPanResponderMove && e.onPanResponderMove(n, t))
                },
                onResponderEnd: function (o) {
                  var r = o.touchHistory;
                  t.numberActiveTouches = r.numberActiveTouches, p(n, e.onPanResponderEnd, o, t)
                },
                onResponderTerminate: function (o) {
                  p(n, e.onPanResponderTerminate, o, t), h._initializeGestureState(t)
                },
                onResponderTerminationRequest: function (n) {
                  return null == e.onPanResponderTerminationRequest || e.onPanResponderTerminationRequest(n, t)
                }
              },
              getInteractionHandle: function () {
                return n.handle
              }
            }
          }
        };

      function p(e, n, t, r) {
        e.handle && (o.default.clearInteractionHandle(e.handle), e.handle = null), n && n(t, r)
      }
      var f = h;
      n.default = f, e.exports = n.default
    },
    QN5Q: function (e, n, t) {
      "use strict";
      n.__esModule = !0, n.cancelIdleCallback = n.default = void 0;
      var o = t("6/RC").canUseDOM && void 0 !== window.requestIdleCallback,
        r = o ? window.requestIdleCallback : function (e, n) {
          return setTimeout((function () {
            var n = Date.now();
            e({
              didTimeout: !1,
              timeRemaining: function () {
                return Math.max(0, 50 - (Date.now() - n))
              }
            })
          }), 1)
        },
        a = o ? window.cancelIdleCallback : function (e) {
          clearTimeout(e)
        };
      n.cancelIdleCallback = a;
      var i = r;
      n.default = i
    },
    Z1lb: function (e, n, t) {
      "use strict";
      n.__esModule = !0, n.default = void 0;
      var o, r = (o = t("tI3i")) && o.__esModule ? o : {
          default: o
        },
        a = function (e) {
          if (e && e.__esModule) return e;
          if (null === e || "object" != typeof e && "function" != typeof e) return {
            default: e
          };
          var n = i();
          if (n && n.has(e)) return n.get(e);
          var t = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if (Object.prototype.hasOwnProperty.call(e, r)) {
              var a = o ? Object.getOwnPropertyDescriptor(e, r) : null;
              a && (a.get || a.set) ? Object.defineProperty(t, r, a) : t[r] = e[r]
            }
          t.default = e, n && n.set(e, t);
          return t
        }(t("QN5Q"));

      function i() {
        if ("function" != typeof WeakMap) return null;
        var e = new WeakMap;
        return i = function () {
          return e
        }, e
      }
      var l = {
        Events: {
          interactionStart: "interactionStart",
          interactionComplete: "interactionComplete"
        },
        runAfterInteractions: function (e) {
          var n, t = new Promise((function (t) {
            n = (0, a.default)((function () {
              e ? t(e()) : t()
            }))
          }));
          return {
            then: t.then.bind(t),
            done: t.then.bind(t),
            cancel: function () {
              (0, a.cancelIdleCallback)(n)
            }
          }
        },
        createInteractionHandle: function () {
          return 1
        },
        clearInteractionHandle: function (e) {
          (0, r.default)(!!e, "Must provide a handle to clear.")
        },
        addListener: function () {}
      };
      n.default = l, e.exports = n.default
    },
    ix0h: function (e, n, t) {
      "use strict";
      var o;
      n.__esModule = !0, n.default = void 0;
      var r = ((o = t("MGTW")) && o.__esModule ? o : {
        default: o
      }).default;
      n.default = r, e.exports = n.default
    }
  }
]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/web/shared~bundle.ComposeMedia~bundle.Display~bundle.Ocf~bundle.Settings~bundle.SettingsProfile~bundle.UserLists~.c4072694.js.map
