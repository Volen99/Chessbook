(window.webpackJsonp = window.webpackJsonp || []).push([
  [190], {
    q2Cp: function (e, t, r) {
      "use strict";

      r.r(t);
      r("7xRU"), r("z84I");
      var n = r("97Jx"),
        a = r.n(n),
        i = r("LdEA"),
        o = r.n(i),
        c = r("1Pcy"),
        u = r.n(c),
        s = r("W/Kd"),
        p = r.n(s),
        l = r("KEM+"),
        h = r.n(l),
        g = r("ERkP"),
        m = r("nT9l"),
        d = r("wrlS"),
        f = r("3XMw"),
        _ = r.n(f),
        v = "tweetPhoto",
        I = r("rrZY"),
        w = (r("i4UL"), r("IAdD"), r("TIdA")),
        y = r("A91F"),
        R = r("9Xij"),
        E = r("PxJJ"),
        A = r("cm6r"),
        G = r("a6qo"),
        C = r("rHpw"),
        O = r("3xO4"),
        x = r.n(O),
        b = (r("aWzz"), {}),
        M = function (e) {
          function t(r) {
            var n;
            if (n = e.call(this, r) || this, r.cacheLocationKey) {
              var a = r.cacheLocationKey;
              n._cacheGroup = b[a], n._cacheGroup || (n._cacheGroup = t.generateCacheGroup(6), b[a] = n._cacheGroup)
            }
            return n
          }
          p()(t, e);
          var r = t.prototype;
          return r.render = function () {
            switch (this._getGroupSize()) {
              case 0:
                return null;
              case 1:
                return this._renderGroupOf1();
              case 2:
                return this._renderGroupOf2();
              case 3:
                return this._renderGroupOf3();
              case 4:
                return this._renderGroupOf4();
              case 5:
                return this._renderGroupOf5();
              default:
                return this._renderGroupOf6()
            }
          }, r._renderGroupOf1 = function () {
            var e = this.props,
              t = e.singleImageMaxAspectRatio,
              r = e.singleImageMinAspectRatio,
              n = this._cacheGroup ? this._cacheGroup[0] : void 0;
            return this._renderImageAtIndex(0, y.a.withinRange(r, t), null, n)
          }, r._renderGroupOf2 = function () {
            return g.createElement(k, {
              containerAspectRatio: this.props.containerAspectRatio
            }, this._groupImage(0, 2, S.gutterRight), this._groupImage(1, 2))
          }, r._renderGroupOf3 = function () {
            return g.createElement(k, {
              containerAspectRatio: this.props.containerAspectRatio
            }, this._groupImage(0, 3, S.gutterRight), g.createElement(L, null, this._groupImage(1, 3, S.gutterBottom), this._groupImage(2, 3)))
          }, r._renderGroupOf4 = function () {
            return g.createElement(k, {
              containerAspectRatio: this.props.containerAspectRatio
            }, g.createElement(L, {
              style: S.gutterRight
            }, this._groupImage(0, 4, S.gutterBottom), this._groupImage(2, 4)), g.createElement(L, null, this._groupImage(1, 4, S.gutterBottom), this._groupImage(3, 4)))
          }, r._renderGroupOf5 = function () {
            return g.createElement(k, {
              column: !0,
              containerAspectRatio: this.props.containerAspectRatio
            }, g.createElement(P, {
              style: S.gutterBottom
            }, this._groupImage(0, 5, S.gutterRight), this._groupImage(1, 5)), g.createElement(P, null, this._groupImage(2, 5, S.gutterRight), this._groupImage(3, 5, S.gutterRight), this._groupImage(4, 5)))
          }, r._renderGroupOf6 = function () {
            return g.createElement(k, {
              column: !0,
              containerAspectRatio: this.props.containerAspectRatio
            }, g.createElement(P, {
              style: S.gutterBottom
            }, this._groupImage(0, 6, S.gutterRight), this._groupImage(1, 6, S.gutterRight), this._groupImage(2, 6)), g.createElement(P, null, this._groupImage(3, 6, S.gutterRight), this._groupImage(4, 6, S.gutterRight), this._groupImage(5, 6)))
          }, r._groupImage = function (e, t, r) {
            var n = this._cacheGroup ? this._cacheGroup[t - 1] : void 0;
            return this._renderImageAtIndex(e, y.a.COVER, [S.item, S.relativePositioning, r], n)
          }, r._renderImageAtIndex = function (e, t, r, n) {
            var a = this.props,
              i = a.images,
              o = a.previewMode,
              c = a.onClick,
              u = a.onVariantSelection,
              s = a.testID,
              p = a.tweetMediaNavigationMethod,
              l = i[e],
              h = "string" == typeof l.expandedUrl ? {
                pathname: l.expandedUrl
              } : l.expandedUrl;
            return g.createElement(A.a, {
              interactiveStyles: null,
              link: Object.assign({}, h, {
                method: p
              }),
              onClick: c,
              style: r
            }, g.createElement(w.a, {
              accessibilityLabel: l.accessibilityLabel,
              aspectMode: t,
              backgroundColor: l.backgroundColor,
              cropCandidates: l.cropCandidates,
              image: l,
              layoutCache: n ? n[e] : void 0,
              onVariantSelection: u,
              previewMode: o,
              testID: s,
              withLoadingIndicator: !0
            }), l.shouldShowAltLabel ? g.createElement(G.a, {
              align: "left",
              bold: !0
            }, "ALT") : null)
          }, r._getGroupSize = function () {
            var e = this.props.images.length;
            return 0 === e && E.a.report(new Error("TweetPhotos: empty array of images received")), Math.min(e, 6)
          }, t
        }(g.Component);
      h()(M, "defaultProps", {
        tweetMediaNavigationMethod: "push"
      }), h()(M, "generateCacheGroup", (function (e) {
        return new Array(e).fill(null).map((function (e, t) {
          return new Array(t + 1).fill(null).map((function (e) {
            return w.a.createLayoutCache()
          }))
        }))
      })), M.propTypes = {};
      var k = function (e) {
          var t = e.children,
            r = e.containerAspectRatio,
            n = void 0 === r ? C.a.theme.aspectRatios.landscape : r,
            a = e.column,
            i = void 0 !== a && a;
          return g.createElement(R.a, {
            ratio: n
          }, g.createElement(x.a, {
            style: [S.wideContainer, i ? S.column : S.row]
          }, t))
        },
        L = function (e) {
          var t = e.style,
            r = e.children;
          return g.createElement(x.a, {
            style: [t, S.item, S.column]
          }, r)
        },
        P = function (e) {
          var t = e.style,
            r = e.children;
          return g.createElement(x.a, {
            style: [t, S.item, S.row]
          }, r)
        },
        S = C.a.create((function (e) {
          return {
            wideContainer: {
              width: "100%",
              height: "100%"
            },
            row: {
              flexDirection: "row"
            },
            column: {
              flexDirection: "column"
            },
            gutterRight: {
              marginRight: "2px"
            },
            gutterBottom: {
              marginBottom: "2px"
            },
            item: {
              flexGrow: 1,
              flexBasis: 0
            },
            relativePositioning: {
              position: "relative"
            }
          }
        })),
        B = _.a.i7c776d5,
        T = _.a.da26d25f,
        D = function (e) {
          function t(t, r) {
            var n;
            return n = e.call(this, t, r) || this, h()(u()(n), "_renderContent", (function (e) {
              var t = e.useMinimumData,
                r = e.resourceSelectionHandler,
                i = n.props,
                c = (i.hideAcceptOverlay, o()(i, ["hideAcceptOverlay"]));
              return g.createElement(I.a.Consumer, null, (function (e) {
                return g.createElement(M, a()({}, c, {
                  onVariantSelection: r,
                  previewMode: t,
                  testID: v,
                  tweetMediaNavigationMethod: e && !n._historyTrackerEnabled ? "replace" : "push"
                }))
              }))
            })), n._historyTrackerEnabled = d.a.isTrue("responsive_web_history_tracker_enabled"), n
          }
          return p()(t, e), t.prototype.render = function () {
            var e = this.props,
              t = e.images,
              r = e.hideAcceptOverlay;
            return g.createElement(m.a, {
              acceptLabel: 1 === t.length ? B : T,
              hideAcceptOverlay: r,
              renderContent: this._renderContent,
              resourceId: t.map((function (e) {
                return e.url
              })).join(";")
            })
          }, t
        }(g.Component);
      h()(D, "defaultProps", {
        hideAcceptOverlay: !1
      });
      t.default = D
    },
    rrZY: function (e, t, r) {
      "use strict";
      var n = r("ERkP"),
        a = n.createContext(!1);
      t.a = a
    }
  }
]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/web/loader.TweetPhotos.5160e3d4.js.map
