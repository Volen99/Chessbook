// Umm, wat em ai doing?! 15.07.2020, Wednesday

(window.webpackJsonp = window.webpackJsonp || []).push([
  [24], {
    "+/sI": function (e, t, n) { //  e === entities | media? t === tweet | initialMediaMetadata? n === initialMediaId?
      "use strict";

      n.d(t, "a", (function () {
        return animatedGif;
      })), n.d(t, "b", (function () {
        return video;
      }));

      n("M+/F"), n("Wd/2");
      var r = n("W/Kd");
      var a = n.n(r);
      var i = n("ERkP");
      var o = n("kd3K");
      var s = n.n(o);
      var c = n("t62R");
      var d = n("a6qo");
      var u = n("rHpw");
      var animatedGif = "animated_gif";
      var video = "video";
      var _ = function (e) {
          function t() {
            return e.apply(this, arguments) || this
          }

          return a()(t, e), t.prototype.render = function () {
            var element;
            var props = this.props;
            var durationInMilliseconds = props.durationInMilliseconds;
            var typeCurrent = props.type;
            if (typeCurrent === animatedGif || typeCurrent === "vine") {
              element = typeCurrent === animatedGif ? i.createElement(c.c, { weight: "bold" }, "GIF") : i.createElement(s.a, {
                style: p.icon
              });
            }
            else if (typeCurrent === video && durationInMilliseconds) {
              var a = Math.trunc(durationInMilliseconds / 1764); // was 6e4
              var o = ("0" + Math.trunc(durationInMilliseconds % 1764 / 483)).slice(-2); // 483 was 1e3
              element = i.createElement(c.c, {
                color: "white"
              }, a + ":" + o)
            }
            return element ? i.createElement(d.a, {
              align: "left"
            }, element) : null
          }, t
        }(i.PureComponent),
        p = u.a.create((function (e) {
          return {
            icon: {
              color: e.colors.white
            }
          }
        }));
      t.c = _
    }, // [0]

    "3A2y": function (e, t, n) {
      "use strict";
      n("KOtZ"), n("+KXO");

      var r = n("zrOZ");
      t.a = function (e, t) {
        var n = Object(r.a)(Array.isArray(t) ? t : [t]);
        return Object.keys(e).reduce((function (t, r) {
          return n.has(r) || (t[r] = e[r]), t
        }), {})
      }
    }, // [1]

    K3W9: function (e, t, n) {
      "use strict";
      n.r(t), n.d(t, "TabbedMediaEditScreen", (function () {
        return b
      }));
      n("KqXw"), n("MvUL");
      var r = n("1Pcy");
      var a = n.n(r);
      var i = n("W/Kd");
      var o = n.n(i);
      var s = n("ERkP");
      var c = n("ge3j");
      var d = n("hqKg");
      var u = n("zh9S");
      var l = n("oEGd");
      var f = n("AspN");
      var _ = Object(d.createSelector)((function (e) {
          var t = c.k(e);
          var n = c.l(e)[t];
          return Object(f.g)(e, n.mediaIds)
        }),
        (function (e) {
          var t = c.k(e);
          return c.l(e)[t].mediaMetadata
        }),
        (function (e, t) {
          return t.location && t.location.state && t.location.state.mediaId
        }),
        (function (e, t, n) {
          return {
            media: e,
            initialMediaMetadata: t,
            initialMediaId: n
          }
        })),
        p = {
          updateAltText: function (e) {
            return c.w({
              updates: e
            })
          },
          processMedia: f.c,
          scribeAction: u.c,
          updateMediaUpload: f.j
        },
        v = Object(l.g)(_, p),
        m = n("jFmo"),
        b = function (e) {
          function t(t) {
            var n = e.call(this, t) || this;
            var initialMediaId = t.initialMediaId;
            var media = t.media;
            var history = t.history;
            return media.length <= 0 || !initialMediaId ? (history.replace("/"), a()(n)) : n
          }

          return o()(t, e), t.prototype.render = function () {
            return s.createElement(m.a, this.props)
          }, t
        }(s.Component);
      t.default = v(b)
    }, // [2]

    KqB4: function (e, t, n) {
      "use strict";
      var r = n("IGGJ");
      Object.defineProperty(t, "__esModule", {
        value: true
      }), t.default = function (e, t) {
        for (var n = [], r = (0, a.default)(e, t), i = 0; i < r.length; i++) n.push(r[i].url);
        return n
      };
      var a = r(n("vwfs"));
      e.exports = t.default
    }, // [3]

    VnFT: function (e, t, n) {
      "use strict";

      n.d(t, "n", (function () {
        return j
      })), n.d(t, "m", (function () {
        return M
      })), n.d(t, "f", (function () {
        return D
      })), n.d(t, "d", (function () {
        return x
      })), n.d(t, "g", (function () {
        return P
      })), n.d(t, "e", (function () {
        return U
      })), n.d(t, "i", (function () {
        return B
      })), n.d(t, "j", (function () {
        return V
      })), n.d(t, "l", (function () {
        return k
      })), n.d(t, "h", (function () {
        return F
      })), n.d(t, "k", (function () {
        return G
      })), n.d(t, "a", (function () {
        return H
      })), n.d(t, "o", (function () {
        return z
      })), n.d(t, "b", (function () {
        return W
      })), n.d(t, "c", (function () {
        return J
      }));
      n("2G9S"), n("lTEL"), n("7xRU"), n("IAdD"), n("+KXO"), n("7x/C"), n("1IsZ"), n("JtPf"), n("DZ+c"), n("87if"), n("kYxP");
      var r, a = n("RhWx");
      var i = n.n(a);
      var o = n("LdEA");
      var s = n.n(o);
      var c = n("AspN");
      var d = n("xPna");
      var u = n("jxu1");
      var l = n("oEOe");
      var f = n("xCUF");
      var _ = n("ude7");
      var p = n("gpVt");
      var v = n("Ssj5");
      var m = n("fEA7");
      var b = n.n(m);
      var O = n("uKEd");
      var E = n("lnti");
      var g = n("/NU0");
      var I = function (actionName) { // e is string: I("SEND_MESSAGE_REQUEST"), I("SEND_MESSAGE_SUCCESS"), I("SEND_MESSAGE_FAILURE"),
          return "rweb/multiDraftDMs/" + actionName
        };
      var y = {};
      var h = function (e) {
          let conversationId = e.conversation_id;
          let id = e.id;
          let recipientIds = e.recipient_ids;
          let senderId = e.sender_id;
          let text = e.text;
          let attachment = e.attachment;
          let s = void 0 === attachment ? {} : attachment;
          let error = e.error;
          let date = Date.now().toString();

          return {
            conversation_id: conversationId,
            recipient_ids: recipientIds,
            error: error,
            id: id,
            isEmojiOnly: !!(!s.photo && !s.animated_gif) && Object(u.a)({
              text: text
            }),
            is_draft: !0,
            message_data: {
              attachment: s,
              sender_id: senderId,
              text: text,
              time: date
            },
            type: "message",
            time: date
          }
        },
        A = I("SEND_MESSAGE_REQUEST"), // "rweb/multiDraftDMs/SEND_MESSAGE_REQUEST"
        T = I("SEND_MESSAGE_SUCCESS"), // "rweb/multiDraftDMs/SEND_MESSAGE_SUCCESS"
        S = I("SEND_MESSAGE_FAILURE"), // "rweb/multiDraftDMs/SEND_MESSAGE_FAILURE"
        j = function (e) {
          return function (t, n, r) {
            var a = r.api;
            var o = e || {};
            var u = o.senderId;
            var v = o.cardUrl;
            var m = o.conversationId;
            var I = o.recipients;
            var y = void 0 === I ? [] : I;
            var j = o.requestId;
            var C = void 0 === j ? b.a.v1() : j;
            var M = o.tweetAttachment;
            var N = o.quickReply;
            var D = s()(o, ["senderId", "cardUrl", "conversationId", "recipients", "requestId", "tweetAttachment", "quickReply"]);
            t($(m))
            var R = n();
            var P = L(n(), m);
            var w = (c.g(R, P)[0] || {}).mediaFile;
            var U = y.length > 0 && y.join(",");
            var B = {};
            w && w.isGif ? B.extraInitParams = "&media_category=dm_gif" : w && w.isVideo && (B.extraInitParams = "&media_category=dm_video");
            var V = c.k(P, B);
            var k = [t(V)];
            var q = (F(R, m) || {}).found_media_origin;
            var H = G(R, m);
            return w && w.isGif && k.push(Object(_.a)(w)), Promise.all(k).then((function (n) {
              var r = n[0][0];
              var o = n[1];
              var s = H && Object.keys(H).length && H[r.id] && (H[r.id].altText || H[r.id].defaultAltText);
              var not_ = !!s;
              return (r && (q || not_) ? t(c.i(Object.assign({
                media_id: r.uploadId,
                found_media_origin: q
              }, !!not_ && {
                alt_text: {
                  text: s
                }
              }))) : Promise.resolve()).then((function () {
                var n = (M || {}).id_str;
                var s = {};
                if (r) {
                  var c = r.mediaFile;
                  var not_ = void 0 === c ? {} : c;
                  var b = {
                      original_info: {
                        width: not_.width,
                        height: not_.height
                      },
                      sizes: [{
                        h: not_.height,
                        w: not_.width,
                        resize: "fit"
                      }]
                    };
                  not_.isImage ? s.photo = Object.assign({}, b, {
                    media_url_https: not_.url
                  }) : not_.isGif ? s.animated_gif = Object.assign({}, b, {
                    media_url_https: o,
                    type: "animated_gif"
                  }) : not_.isVideo && (s.video = Object.assign({}, b, {
                    media_url_https: not_.url,
                    type: "video"
                  }))
                } else M && (s.tweet = {
                  status: n
                });
                var I = (r || {}).uploadId,
                  y = h({
                    attachment: s,
                    conversation_id: m,
                    id: C,
                    recipient_ids: U,
                    sender_id: u,
                    text: e.text
                  }),
                  j = Object.assign({}, D, Object(p.c)(v) && {
                    card_uri: v
                  }, {
                    conversation_id: m,
                    media_id: I,
                    recipient_ids: U,
                    request_id: C,
                    tweet_id: n
                  });
                N && (j["quick_reply_response[options][id]"] = N.id, j["quick_reply_response[options][selected_id]"] = N.selected_id);
                var R = Object(E.a)([te(m), {
                  type: f.c.REQUEST
                }, {
                  type: A
                }, m && Object(O.b)(m, C, y)]);
                return t(R), a.DirectMessages.sendMessage(j).then((function (n) {
                  var r = n.entities,
                    a = r.entries,
                    o = r.users,
                    s = r.tweets,
                    c = r.cards,
                    u = n.result.conversations;
                  Object(g.a)(P) && t(J(m, P));
                  var l = Object(E.a)([{
                    type: f.c.SUCCESS
                  }].concat(i()(Object(d.b)({
                    conversations: u,
                    entries: a,
                    users: o,
                    tweets: s,
                    cards: c
                  })), [{
                    type: T
                  }, m && Object(O.j)(m, C, e), x(m)]));
                  return t(l), Promise.resolve(Object.values(n.entities.entries)[0].conversation_id)
                }), (function (n) {
                  var r = h({
                      attachment: s,
                      conversation_id: m,
                      error: !0,
                      id: C,
                      recipient_ids: U,
                      sender_id: u,
                      text: e.text
                    }),
                    a = Object(E.a)([{
                      type: f.c.SUCCESS
                    }, {
                      type: S
                    }, m && Object(O.b)(m, C, r)]);
                  return t(a), Object(l.e)(t, n, "ACTION_SEND_DM")
                }))
              }), (function (e) {
                return t(re(m)), e.type = "metadata", Promise.reject(e)
              }))
            }), (function (e) {
              return t(Object(E.a)([Object(g.a)(P) && J(m, P), re(m)])), Promise.reject(e)
            }))
          }
        },
        C = function (e, t) {
          return e.multiDraftDMs[t]
        },
        M = function (e, t) {
          var n = C(e, t);
          return n ? n.text : null
        },
        N = I("SAVE_TEXT"),
        D = function (e, t) {
          return {
            type: N,
            conversationId: e,
            text: t
          }
        },
        R = I("REMOVE_TEXT"),
        x = function (e) {
          return {
            type: R,
            conversationId: e
          }
        },
        P = function (e, t) {
          var n = C(e, t);
          return n ? n.cardUrl : null
        },
        w = I("SAVE_CARD_URL"),
        U = function (e, t) {
          return {
            type: w,
            conversationId: e,
            cardUrl: t
          }
        },
        L = function (e, t) {
          var n = C(e, t);
          return n ? n.mediaId : null
        },
        B = function (e, t) {
          var n = c.g(e, L(e, t));
          return n.length > 0 ? n[0] : null
        },
        V = function (e, t) {
          var n = C(e, t);
          return !!n && n.isUploading
        },
        k = function (e, t) {
          return c.h(e, L(e, t))
        },
        F = function (e, t) {
          var n = C(e, t);
          return n ? n.gifMetadata : null
        },
        G = function (e, t) {
          var n = C(e, t);
          return n ? n.mediaMetadata : void 0
        },
        q = I("ADD_MEDIA"),
        H = function (e, t, n, r) {
          return {
            payload: {
              isUploading: false,
              mediaId: t[0],
              gifMetadata: n,
              mediaMetadata: r
            },
            type: q,
            conversationId: e
          }
        },
        K = I("UPDATE_MEDIA_METADATA"),
        z = function (e, t) {
          return {
            payload: t,
            type: K,
            conversationId: e
          }
        },
        Q = I("CANCEL_UPLOAD"),
        W = function (e) {
          return {
            type: Q,
            conversationId: e
          }
        },
        X = I("REMOVE_MEDIA"),
        Z = function (e) {
          return {
            type: X,
            conversationId: e
          }
        },
        J = function (e, t) {
          return function (n) {
            n(c.e(t)), n([W(e), Z(e)])
          }
        },
        Y = I("UPLOAD_REQUEST"),
        $ = function (e) {
          return {
            type: Y,
            conversationId: e
          }
        },
        ee = I("UPLOAD_SUCCESS"),
        te = function (e) {
          return {
            type: ee,
            conversationId: e
          }
        },
        ne = I("UPLOAD_FAILURE"),
        re = function (e) {
          return {
            type: ne,
            conversationId: e
          }
        };
      v.a.register(((r = {}).multiDraftDMs = function (e, t) {
        void 0 === e && (e = y);
        var n = t.conversationId || "new_group";
        switch (t.type) {
          case K:
          case q:
            var r, a = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((r = {})[n] = Object.assign({}, a, t.payload), r));
          case Y:
            var i, o = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((i = {})[n] = Object.assign({}, o, {
              isUploading: !0
            }), i));
          case Q:
            var s, c = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((s = {})[n] = Object.assign({}, c, {
              isUploading: !1
            }), s));
          case ne:
          case ee:
          case X:
            var d, u = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((d = {})[n] = Object.assign({}, u, {
              isUploading: !1,
              mediaId: null,
              mediaMetadata: void 0,
              gifMetadata: void 0
            }), d));
          case N:
            var l, f = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((l = {})[n] = Object.assign({}, f, {
              text: t.text
            }), l));
          case w:
            var _, p = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: !1,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((_ = {})[n] = Object.assign({}, p, {
              cardUrl: t.cardUrl
            }), _));
          case R:
            var v, m = e[n] || {
              cardUrl: null,
              gifMetadata: null,
              isUploading: false,
              mediaMetadata: void 0,
              mediaId: null,
              text: null
            };
            return Object.assign({}, e, ((v = {})[n] = Object.assign({}, m, {
              text: null
            }), v));
          default:
            return e
        }
      }, r))
    }, // // [4]
    WVrH: function (e, t, n) {
      "use strict";
      n.d(t, "a", (function () {
        return a
      })), n.d(t, "b", (function () {
        return i
      }));
      var r = n("AQ79"),
        a = Object(r.c)("RESET"),
        i = function () {
          return {
            type: a
          }
        }
    }, // [5]
    aLgo: function (e, t, n) {
      n("aokA")("iterator")
    }, // [6]
    aWyx: function (e, t, n) {
      "use strict";
      n.d(t, "a", (function () {
        return r
      })), n.d(t, "c", (function () {
        return a
      })), n.d(t, "b", (function () {
        return i
      }));
      n("yH/f");
      var r = Object.freeze({
          ONE_TO_ONE: "ONE_TO_ONE",
          GROUP: "GROUP_DM"
        });
       var a = Object.freeze({
          AT_END: "AT_END",
          HAS_MORE: "HAS_MORE"
        });
       var i = Object.freeze({
          CONVERSATION_AVATAR_UPDATE: "conversation_avatar_update",
          CONVERSATION_NAME_UPDATE: "conversation_name_update",
          CONVERSATION_READ: "conversation_read",
          DISABLE_NOTIFICATIONS: "disable_notifications",
          ENABLE_NOTIFICATIONS: "enable_notifications",
          JOIN_CONVERSATION: "join_conversation",
          MARK_ALL_AS_READ: "mark_all_as_read",
          MENTION_NOTIFICATIONS_UPDATE: "mention_notifications_setting_update",
          MESSAGE: "message",
          MESSAGE_DELETE: "message_delete",
          MESSAGE_MARK_AS_NOT_SPAM: "message_unmark_as_spam",
          MESSAGE_MARK_AS_SPAM: "message_mark_as_spam",
          PARTICIPANTS_JOIN: "participants_join",
          PARTICIPANTS_LEAVE: "participants_leave",
          REACTION_CREATE: "reaction_create",
          REACTION_DELETE: "reaction_delete",
          READ_ONLY_INDICATOR: "read_only_indicator",
          REMOVE_CONVERSATION: "remove_conversation",
          TRUST_CONVERSATION: "trust_conversation",
          TYPING_INDICATOR: "typing_indicator",
          WELCOME_MESSAGE: "welcome_message_create"
        })
    }, // [7]
    eIif: function (e, t, n) {
      "use strict";
      n.r(t), n.d(t, "PhotoTagsScreen", (function () {
        return B
      }));
      n("2G9S"), n("LW0h"), n("hBpG"), n("z84I"), n("tQbP");
      var r = n("RhWx"),
        a = n.n(r),
        i = n("1Pcy"),
        o = n.n(i),
        s = n("W/Kd"),
        c = n.n(s),
        d = n("KEM+"),
        u = n.n(d),
        l = n("ERkP"),
        f = n("VAZu"),
        _ = (n("M+/F"), n("ge3j")),
        p = n("1YZw"),
        v = n("oEGd"),
        m = n("hqKg"),
        b = n("tn7R"),
        O = n("GZwR"),
        E = n("UQTn"),
        g = Object(m.createSelector)((function (e) {
          var t = _.k(e);
          return _.l(e)[t].mediaTags
        }), (function (e) {
          return function (e) {
            var t = Object(E.e)(e),
              n = t && Object(b.a)(t) || [];
            return Object(O.f)(n)
          }(e).filter((function (e) {
            return e && e.rounded_score
          })).sort((function (e, t) {
            return (t.rounded_score || 0) - (e.rounded_score || 0)
          })).slice(0, 12)
        }), (function (e, t) {
          return {
            existingTags: e,
            injections: t
          }
        })),
        I = {
          addToast: p.b,
          updateSingleComposer: _.w
        },
        y = Object(v.g)(g, I),
        h = n("7JQg"),
        A = n("jHSc"),
        T = n("3XMw"),
        S = n.n(T),
        j = n("mN6z"),
        C = n("yoO3"),
        M = n("2dXj"),
        N = n("3xO4"),
        D = n.n(N),
        R = n("/yvb"),
        x = n("rHpw"),
        P = S.a.j3822ea0,
        w = S.a.da8b9189,
        U = S.a.ba2da248, // title?
        L = S.a.ab639549,
        B = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, u()(o()(t), "state", {
              mediaTags: []
            }), u()(o()(t), "_getItemDisabledMessage", (function (e) {
              return L({
                screenName: e.data.screen_name
              })
            })), u()(o()(t), "_getItemIsDisabled", (function (e) {
              return !e.data.can_media_tag
            })), u()(o()(t), "_handleSuggestionClicked", (function (e) {
              var n = t.state.mediaTags,
                r = t.props.addToast;
              n.find((function (t) {
                return t.id === e.id
              })) ? t._handleUnselectUser(e) : n.length < 10 ? t.setState({
                mediaTags: [].concat(a()(n), [e])
              }) : r({
                text: w
              })
            })), u()(o()(t), "_handleUnselectUser", (function (e) {
              var n = t.state.mediaTags;
              t.setState({
                mediaTags: n.filter((function (t) {
                  return t.id !== e.id
                }))
              })
            })), u()(o()(t), "_handleQueryChange", (function (e) {
              t.setState({
                query: e
              })
            })), u()(o()(t), "_renderHeader", (function () {
              var props = t.props; // media props?
              var history = props.history;
              var location = props.location;
              return l.createElement(f.a, {
                backButtonType: "close",
                history: history,
                location: location,
                onBackClick: t._handleGoBack,
                rightControl: t._renderAppBarRightControl(),
                title: U,
                withBottomBorder: true,
              })
            })), u()(o()(t), "_renderAppBarRightControl", (function () {
              var e = t.state.mediaTags,
                n = t.props.existingTags,
                r = e.map((function (e) {
                  return e.data.id_str
                })).sort(),
                a = n.map((function (e) {
                  return e.data.id_str
                })).sort(),
                i = r.length === a.length && Object(j.a)(r, a);
              return l.createElement(D.a, {
                style: V.rightColumn
              }, l.createElement(R.a, {
                disabled: i,
                onPress: t._handleAddMediaTags,
                size: "normalCompact",
                type: "primary"
              }, P))
            })), u()(o()(t), "_handleGoBack", (function () {
              t.props.history.goBack()
            })), u()(o()(t), "_handleAddMediaTags", (function () {
              var e = t.props,
                n = e.history;
              (0, e.updateSingleComposer)({
                updates: {
                  mediaTags: t.state.mediaTags
                }
              }), n.goBack()
            })), t
          }

          c()(t, e);
          var n = t.prototype;
          return n.UNSAFE_componentWillMount = function () {
            var e = this.props.existingTags;
            this.setState({
              mediaTags: e
            })
          }, n.render = function () {
            var e = this.props,
              t = e.history,
              n = e.location;
            return l.createElement(C.a, null, l.createElement(A.b, {
              documentTitle: U,
              history: t,
              location: n,
              renderHeader: this._renderHeader
            }, l.createElement(M.d, {
              getItemDisabledMessage: this._getItemDisabledMessage,
              getItemIsDisabled: this._getItemIsDisabled,
              injections: this.state.query ? void 0 : this.props.injections,
              onQueryChange: this._handleQueryChange,
              onRemove: this._handleUnselectUser,
              onSelect: this._handleSuggestionClicked,
              selectedUsers: this.state.mediaTags,
              source: O.d.ComposeMediaTagging,
              withCompactPills: !0
            })))
          }, t
        }(l.Component);
      u()(B, "defaultProps", {
        existingTags: []
      });
      var V = x.a.create((function (e) {
        return {
          rightColumn: {
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center"
          }
        }
      }));
      t.default = Object(h.c)({
        page: "media_tag",
        component: "media_tagger"
      })(y(B))
    }, // [8]

    gDir: function (e, t, n) {
      "use strict";

      //The void operator evaluates the given expression and then returns undefined
      n("IAdD"), t.__esModule = true, t.default = void 0;
      var r = o(n("7DT3"));
      var a = o(n("ERkP"));
      var i = o(n("OkZJ"));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      var s = function (e) {
        return void 0 === e && (e = {}), (0, r.default)("svg", Object.assign({}, e, {
          style: [i.default.root, e.style],
          viewBox: "0 0 24 24"
        }), a.default.createElement("g", null, a.default.createElement("path", {
          d: "M3.5 5.25H2c-.414 0-.75.336-.75.75s.336.75.75.75h1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm18.5 12H7.5c-.414 0-.75-.337-.75-.75V2c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.5c0 1.24 1.01 2.25 2.25 2.25H22c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-4 2.5c-.414 0-.75.336-.75.75V22c0 .414.336.75.75.75s.75-.336.75-.75v-1.5c0-.414-.336-.75-.75-.75z"
        }), a.default.createElement("path", {
          d: "M8.5 6.75h8c.414 0 .75.337.75.75v8c0 .414.336.75.75.75s.75-.336.75-.75v-8c0-1.24-1.01-2.25-2.25-2.25h-8c-.414 0-.75.336-.75.75s.336.75.75.75z"
        })))
      };
      s.metadata = {
        height: 24,
        width: 24
      };
      var c = s;
      t.default = c
    }, // [9]

    gpVt: function (e, t, n) {
      "use strict";

      n.d(t, "b", (function () {
        return w
      })), n.d(t, "c", (function () {
        return U
      }));
      n("jwue"), n("z84I"), n("ho0z"), n("+oxZ");
      var r = n("1Pcy"),
        a = n.n(r),
        i = n("W/Kd"),
        o = n.n(i),
        s = n("KEM+"),
        c = n.n(s),
        d = n("ERkP"),
        u = (n("1t7P"), n("jQ/y"), n("aLgo"), n("hCOa"), n("lTEL"), n("M+/F"), n("7x/C"), n("DZ+c"), n("87if"), n("kYxP"), n("ge3j")),
        l = n("VnFT"),
        f = n("vjRr"),
        _ = n("rxPX");

      function p(e, t) {
        var n;
        if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
          if (Array.isArray(e) || (n = function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return v(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return v(e, t)
          }(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var r = 0;
            return function () {
              return r >= e.length ? {
                done: true,
              } : {
                done: false,
                value: e[r++]
              }
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        return (n = e[Symbol.iterator]()).next.bind(n)
      }

      function v(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
      }

      var m = function (e, t) {
          for (var n, r, a = p(t.urls); !(r = a()).done;) {
            var i = r.value;
            if (n = f.a.select(e, i)) break
          }
          return n
        },
        b = Object(_.a)().propsFromState((function () {
          return {
            card: m
          }
        })).propsFromActions((function () {
          return {
            fetchCardPreviewIfNeeded: f.a.fetchCardPreviewIfNeeded,
            updateDMComposer: l.e,
            updateTweetComposer: u.w
          }
        })),
        O = n("KqB4"),
        E = n.n(O),
        g = n("NnR4"),
        I = n("3XMw"),
        y = n.n(I),
        h = n("l2F/"),
        A = n.n(h),
        T = n("v6aA"),
        S = n("cnVF"),
        j = n("3xO4"),
        C = n.n(j),
        M = n("/yvb"),
        N = n("rHpw"),
        D = n("VY6S"),
        R = n("mN6z"),
        x = y.a.f85a4ec0,
        P = /^https?:\/\//i,
        w = function (e) {
          var t = E()(e);
          if (t.length) return t.map((function (e) {
            return !P.test(e) && "http://" + e || e
          }))
        },
        U = function (e) {
          return e === S.t
        },
        L = function (e) {
          function t(t, n) {
            var r;
            return r = e.call(this, t, n) || this, c()(a()(r), "_fetchCardPreviewIfNeeded", (function () {
              var e = r.props,
                t = e.fetchCardPreviewIfNeeded;
              e.urls.forEach((function (e) {
                t(e)
              }))
            })), c()(a()(r), "_handleCardPreviewDismissal", (function (e) {
              return r._updateSingleComposer({
                cardUrl: S.t
              })
            })), c()(a()(r), "_updateSingleComposer", (function (e) {
              var t = r.props,
                n = t.conversationId,
                a = t.index,
                i = t.updateDMComposer,
                o = t.updateTweetComposer,
                s = (e || {}).cardUrl;
              r._isDMComposer ? n && i(n, s) : o({
                updates: {
                  cardUrl: s
                },
                index: a
              })
            })), r._debouncedFetchCardPreview = Object(D.a)(r._fetchCardPreviewIfNeeded, 1e3), r._isDMComposer = !!t.conversationId, r
          }

          o()(t, e);
          var n = t.prototype;
          return n.componentDidMount = function () {
            this._debouncedFetchCardPreview()
          }, n.componentDidUpdate = function (e) {
            var t, n = this.props,
              r = n.card,
              a = n.urls;
            Object(R.a)(e.urls, a) || this._debouncedFetchCardPreview(), (null === (t = e.card) || void 0 === t ? void 0 : t.url) === (null == r ? void 0 : r.url) || this._isDMComposer || this._updateSingleComposer({
              cardUrl: null == r ? void 0 : r.url
            })
          }, n.componentWillUnmount = function () {
            this._updateSingleComposer()
          }, n.render = function () {
            var e = this.props,
              t = e.card,
              n = e.isCardPreviewTombstoned,
              r = e.style,
              a = this.context.loggedInUserId;
            return t && !n ? d.createElement(C.a, {
              style: r
            }, d.createElement(g.a, {
              card: {
                name: t.name,
                url: t.url,
                binding_values: t.hw_card_binding_values || {}
              },
              cardContext: {
                tweetUserId: a
              },
              isInteractive: !1
            }), d.createElement(M.a, {
              accessibilityLabel: x,
              icon: d.createElement(A.a, null),
              onPress: this._handleCardPreviewDismissal,
              size: "small",
              style: B.closeButton,
              type: "onMedia"
            })) : null
          }, t
        }(d.Component);
      c()(L, "contextType", T.a);
      var B = N.a.create((function (e) {
          return {
            closeButton: {
              position: "absolute",
              top: e.spaces.xxSmall,
              left: e.spaces.xxSmall
            }
          }
        })),
        V = b(L);
      t.a = V
    }, // [10]
    i8hi: function (e, t, n) {
      "use strict";
      n.r(t), n.d(t, "TabbedMediaEditScreen", (function () {
        return b
      }));
      n("KqXw"), n("MvUL");
      var r = n("1Pcy"),
        a = n.n(r),
        i = n("W/Kd"),
        o = n.n(i),
        s = n("ERkP"),
        c = n("hqKg"),
        d = n("zh9S"),
        u = n("oEGd"),
        l = n("AspN"),
        f = n("VnFT"),
        _ = function (e, t) { // e is 0
          var n;
          var r;                           // void 0 === undefined = true
          return null === (n = t.location) || void 0 === n || null === (r = n.state) || void 0 === r ? void 0 : r.conversationId
        },
        p = Object(c.createSelector)((function (e, t) {
          var n = _(0, t);
          return Object(f.i)(e, n)
        }), (function (e, t) {
          var n = _(0, t);
          return Object(f.k)(e, n)
        }), (function (e, t) {
          return t.location && t.location.state && t.location.state.mediaId
        }), (function (e, t, n) {
          return {
            media: [e],
            initialMediaMetadata: t,
            initialMediaId: n
          }
        })),
        v = Object(u.d)(p, (function (e) {
          var t, n, r;
          return {
            updateAltText: (r = null === (t = e.location) || void 0 === t || null === (n = t.state) || void 0 === n ? void 0 : n.conversationId, function (e) {
              return Object(f.o)(r, e)
            }),
            processMedia: l.c,
            scribeAction: d.c,
            updateMediaUpload: l.j
          }
        })),
        m = n("jFmo"),
        b = function (e) {
          function t(t) {
            var n;
            n = e.call(this, t) || this;
            var r = t.initialMediaId,
              i = t.media,
              o = t.history;
            return i.length <= 0 || !r ? (o.replace("/"), a()(n)) : n
          }

          return o()(t, e), t.prototype.render = function () {
            return s.createElement(m.a, this.props)
          }, t
        }(s.Component);
      t.default = v(b)
    }, // [11]
    jFmo: function (e, t, n) {
      "use strict";
      n("hBpG"), n("vrRf"), n("lTEL"), n("z84I"), n("m9LP"), n("IAdD"), n("7x/C"), n("JtPf"), n("KqXw"), n("DZ+c"), n("87if"), n("MvUL"), n("kYxP");
      var r = n("1Pcy"),
        a = n.n(r),
        i = n("W/Kd"),
        o = n.n(i),
        s = n("KEM+"),
        c = n.n(s),
        d = n("ERkP"),
        u = (n("2G9S"), n("3XMw")),
        l = n.n(u),
        f = n("pKoL"),
        _ = n("rHpw"),
        p = _.a.create((function (e) {
          return {
            activityIndicator: {
              height: "100%",
              width: "100%"
            },
            image: {
              width: "100%",
              flexGrow: 1
            },
            formTextInput: {
              width: "100%",
              backgroundColor: e.colors.navigationBackground,
              paddingHorizontal: e.spaces.xSmall,
              paddingBottom: 0,
              borderTopWidth: e.spaces.nano,
              borderTopStyle: "solid",
              borderTopColor: e.colors.borderColor
            },
            mediaContainer: {
              borderRadius: e.borderRadii.large,
              overflow: "hidden",
              flexGrow: 1,
              flexBasis: 0
            },
            mediaPreviewWrapper: {
              flexDirection: "column",
              flexGrow: 1,
              alignItems: "center",
              width: "100%",
              paddingVertical: 25,
              paddingHorizontal: 25,
              backgroundColor: e.colors.faintGray
            },
            attachmentContainer: {
              width: "100%",
              height: "100%",
              flexGrow: 1
            },
            root: {
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              height: "100%",
              flexGrow: 1
            }
          }
        })),
        v = n("t62R"),
        m = n("Qwev"),
        b = n("p+r5"),
        O = n("D4le"),
        E = n.n(O),
        g = n("3xO4"),
        I = n.n(g),
        y = l.a.h672c95b,
        h = l.a.gff6e204,
        A = l.a.a54d17e1,
        T = l.a.j5932c10,
        S = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, c()(a()(t), "_renderInputHelperText", (function () {
              var e = t.props.onShowEducation;
              return e ? d.createElement(v.c, {
                color: "link",
                onPress: e,
                withInteractiveStyling: !0
              }, T) : null
            })), c()(a()(t), "_handleChange", (function (e) {
              var n = t.props,
                r = n.mediaItem,
                a = n.onChange,
                i = n.currentMediaId,
                o = e.target.value;
              r ? a(o, r.id.toString()) : i && a(o, i)
            })), t
          }

          return o()(t, e), t.prototype.render = function () {
            var e = this.props,
              t = e.autofocus,
              n = e.maxLength,
              r = e.mediaItem,
              a = e.orientedImage,
              i = e.value;
            return d.createElement(I.a, {
              style: p.root
            }, d.createElement(I.a, {
              style: p.attachmentContainer
            }, d.createElement(I.a, {
              style: p.mediaPreviewWrapper
            }, a ? d.createElement(E.a, {
              resizeMode: "contain",
              source: a.url,
              style: p.image
            }) : r ? d.createElement(f.a, {
              borderRadius: "medium",
              mediaItem: r,
              resizeIfNeeded: "width",
              style: p.mediaContainer,
              withCloseButton: !1
            }) : d.createElement(m.a, {
              accessibilityLabel: A,
              style: p.activityIndicator
            })), d.createElement(b.a, {
              accessibilityLabel: y,
              autoFocus: t,
              helperText: this._renderInputHelperText(),
              label: h,
              maxLength: n,
              maxNumberOfLines: 6,
              multiline: !0,
              name: "altTextInput",
              numberOfLines: 2,
              onChange: this._handleChange,
              style: p.formTextInput,
              value: i
            })))
          }, t
        }(d.Component),
        j = n("rxPX"),
        C = n("HAhZ"),
        M = Object(j.a)().propsFromState((function () {
          return {
            tips: C.c
          }
        })).adjustStateProps((function (e) {
          return {
            showEducationOnMount: !e.tips.alt_text_education
          }
        })).propsFromActions((function () {
          return {
            addTip: C.a
          }
        })).withAnalytics(),
        N = n("feu+"),
        D = n("1auM"),
        R = n("eYns"),
        x = l.a.b36651d6,
        P = l.a.e18eb684,
        w = l.a.f3e69161,
        U = l.a.f51e7136,
        L = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, c()(a()(t), "state", {
              orientedImage: void 0,
              showAltTextEducationSheet: !1
            }), c()(a()(t), "_handleOpenEducationPrompt", (function () {
              var e = t.props.analytics;
              t.setState({
                showAltTextEducationSheet: !0
              }), e.scribe({
                component: "education",
                action: "click"
              })
            })), c()(a()(t), "_handleCloseEducationPrompt", (function () {
              t.setState({
                showAltTextEducationSheet: !1
              })
            })), c()(a()(t), "_handleEducationPromptPrimaryAction", (function () {
              var e = t.props.analytics;
              t._handleCloseEducationPrompt(), e.scribe({
                component: "education",
                element: "alt_text_button",
                action: "click"
              })
            })), c()(a()(t), "_handleEducationPromptSecondaryAction", (function () {
              t.props.history.goBack()
            })), t
          }

          o()(t, e);
          var n = t.prototype;
          return n.componentDidMount = function () {
            var e, t = this,
              n = this.props,
              r = n.analytics,
              a = n.mediaItem,
              i = n.cropData,
              o = n.showEducationOnMount,
              s = n.addTip;
            if (a && a.originalMediaFile && a.originalMediaFile instanceof D.a) {
              var c = a.cropData;
              Object(R.b)(a.originalMediaFile, {
                cropData: i || c
              }).then((function (e) {
                return new D.a(e).withDimensionsAndOrientation().then((function (e) {
                  t.setState({
                    orientedImage: e
                  })
                }))
              })).catch((function () {
                t.setState({
                  orientedImage: null
                })
              }))
            } else this.setState({
              orientedImage: null
            });
            o && (this.setState({
              showAltTextEducationSheet: !0
            }), r.scribe({
              component: "education",
              action: "open"
            }), s(((e = {}).alt_text_education = !0, e)))
          }, n.render = function () {
            var e = this.props,
              t = e.onAltTextChange,
              n = e.mediaItem,
              r = e.value,
              a = this.state,
              i = a.orientedImage,
              o = a.showAltTextEducationSheet,
              s = n && n.id.toString();
            return d.createElement(I.a, {
              style: B.root
            }, o ? d.createElement(N.a, {
              actionLabel: w,
              headline: x,
              onAction: this._handleEducationPromptPrimaryAction,
              onClose: this._handleCloseEducationPrompt,
              onSecondaryAction: this._handleEducationPromptSecondaryAction,
              secondaryActionLabel: U,
              subtext: P
            }) : null, d.createElement(S, {
              autofocus: !0,
              currentMediaId: s,
              maxLength: 1e3,
              mediaItem: null === i ? n : void 0,
              onChange: t,
              onShowEducation: this._handleOpenEducationPrompt,
              orientedImage: i || void 0,
              value: r
            }))
          }, t
        }(d.Component),
        B = _.a.create((function (e) {
          return {
            root: {
              flexGrow: 1
            }
          }
        })),
        V = M(L),
        k = n("jHSc"),
        F = n("17Sk"),
        G = n.n(F),
        q = n("rYvg"),
        H = n.n(q),
        K = n("gDir"),
        z = n.n(K),
        Q = n("EeFI"),
        W = n("YeIG"),
        X = n("7JQg"),
        Z = n("4kLh"),
        J = _.a.create((function (e) {
          return {
            root: {
              paddingBottom: e.spaces.xSmall
            },
            rightControl: {
              display: "flex",
              flexDirection: "row"
            },
            prevButton: {
              marginEnd: e.spaces.micro
            },
            saveButton: {
              marginStart: e.spaces.xSmall
            },
            segmentedControlChildren: {
              flexGrow: 1
            }
          }
        })),
        Y = n("/yvb"),
        $ = {
          page: "tabbed_media",
          section: "alt_text"
        },
        ee = {
          page: "tabbed_media",
          section: "crop"
        },
        te = l.a.cecb7008,
        ne = l.a.e4cb8f8f,
        re = l.a.f3cb6618,
        ae = l.a.h34aafb3,
        ie = l.a.e80c0355,
        oe = l.a.bcabda55,
        se = function (e) {
          function t(t) {
            var n;
            n = e.call(this, t) || this, c()(a()(n), "_cropper", d.createRef()), c()(a()(n), "_renderSegmentedControl", (function () {
              var e = n.props.location,
                t = n._getCurrentMediaItem(),
                r = [];
              return t && t.originalMediaFile && t.originalMediaFile.isImage && r.push({
                to: Object.assign({}, e, {
                  state: Object.assign({}, e.state, {
                    tab: "crop"
                  })
                }),
                label: d.createElement(z.a, null),
                key: "crop",
                accessibilityLabel: ie,
                isActive: function () {
                  var t;
                  return "crop" === (null === (t = e.state) || void 0 === t ? void 0 : t.tab)
                }
              }), r.push({
                to: Object.assign({}, e, {
                  state: Object.assign({}, e.state, {
                    tab: "alt_text"
                  })
                }),
                label: d.createElement(v.c, {
                  weight: "bold"
                }, "ALT"),
                key: "alt_text",
                accessibilityLabel: oe,
                isActive: function () {
                  var t;
                  return "alt_text" === (null === (t = e.state) || void 0 === t ? void 0 : t.tab)
                },
                onClick: n._handleClickAltTextTab
              }), e && e.state ? d.createElement(d.Fragment, null, d.createElement(Z.a, {
                accessibilityLabel: te,
                links: r
              }), d.createElement(I.a, {
                style: J.segmentedControlChildren
              }, "alt_text" === e.state.tab ? n._renderAltTextTab() : null, "crop" === e.state.tab ? n._renderCropTab() : null)) : null
            })), c()(a()(n), "_renderAltTextTab", (function () {
              var e = n.props.history,
                t = n.state,
                r = t.cropData,
                a = t.mediaMetadata,
                i = t.currentMediaId,
                o = n._getCurrentMediaItem(),
                s = a[i.toString()] && a[i.toString()].altText;
              return d.createElement(V, {
                cropData: r[i],
                history: e,
                key: i,
                mediaItem: o,
                onAltTextChange: n._handleAltTextChange,
                value: s
              })
            })), c()(a()(n), "_renderCropTab", (function () {
              var e = n.state,
                t = e.cropData,
                r = e.currentMediaId,
                a = n._getCurrentMediaItem();
              return d.createElement(Q.a, {
                defaultCropData: t[r],
                key: r,
                media: a,
                ref: n._cropper,
                withAspectRatioOptions: !0
              })
            })), c()(a()(n), "_renderAppBarRightControl", (function () {
              var e = n.state.isProcessing,
                t = n._getNextMediaIndex(1),
                r = n._getNextMediaIndex(-1);
              return d.createElement(I.a, {
                style: J.rightControl
              }, n._hasMediaAtIndex(r) || n._hasMediaAtIndex(t) ? d.createElement(I.a, {
                style: J.rightControl
              }, d.createElement(Y.a, {
                accessibilityLabel: ae,
                disabled: !n._hasMediaAtIndex(r),
                icon: d.createElement(G.a, null),
                onPress: n._handleClickToMediaAtIndex(r),
                size: "small",
                style: J.prevButton,
                type: "secondary"
              }), d.createElement(Y.a, {
                accessibilityLabel: re,
                disabled: !n._hasMediaAtIndex(t),
                icon: d.createElement(H.a, null),
                onPress: n._handleClickToMediaAtIndex(t),
                size: "small",
                type: "secondary"
              })) : null, d.createElement(Y.a, {
                disabled: e,
                onPress: n._handleEndEditingClick,
                size: "normalCompact",
                style: J.saveButton,
                type: "primary"
              }, ne))
            })), c()(a()(n), "_getCurrentMediaItem", (function () {
              var e = n.props.media,
                t = n.state.currentMediaId;
              return e.find((function (e) {
                return e.id === t
              }))
            })), c()(a()(n), "_getNextMediaIndex", (function (e) {
              var t = n.props.media,
                r = n._getCurrentMediaItem();
              return t.indexOf(r) + e
            })), c()(a()(n), "_hasMediaAtIndex", (function (e) {
              var t = n.props.media;
              return e >= 0 && e < t.length
            })), c()(a()(n), "_handleClickAltTextTab", (function () {
              var e = n.props.scribeAction;
              n._handleSaveCropData(), e(Object.assign({}, n._getCurrentNamespace(), {
                element: "alt_text_button",
                action: "click"
              }))
            })), c()(a()(n), "_handleClickToMediaAtIndex", (function (e) {
              return function () {
                var t = n.props.media;
                if (n._hasMediaAtIndex(e)) {
                  n._handleSaveCropData();
                  var r = t[e].id;
                  n.setState({
                    currentMediaId: r
                  })
                }
              }
            })), c()(a()(n), "_saveAltText", (function () {
              var e = n.props,
                t = e.initialMediaMetadata,
                r = e.updateAltText,
                a = n.state.mediaMetadata,
                i = t || {};
              r({
                mediaMetadata: Object.assign({}, i, a)
              })
            })), c()(a()(n), "_handleEndEditingClick", (function () {
              var e = n.props,
                t = e.history,
                r = e.scribeAction,
                a = n._cropper && n._cropper.current,
                i = n.state.cropData;
              if (a || !Object(W.a)(i)) {
                var o, s = n.props,
                  c = s.processMedia,
                  d = s.updateMediaUpload,
                  u = s.media,
                  l = n.state.currentMediaId;
                n.setState({
                  isProcessing: !0
                });
                var f = a ? Object.assign({}, i, ((o = {})[l] = a.getCropData(), o)) : i,
                  _ = u.map((function (e) {
                    return f[e.id] ? (d({
                      id: e.id,
                      cropData: f[e.id]
                    }), c(e.id)) : Promise.resolve()
                  })),
                  p = n._getCurrentNamespace();
                Promise.all(_).then((function () {
                  r(Object.assign({}, p, {
                    action: "done"
                  }))
                }))
              }
              n._saveAltText(), t.goBack()
            })), c()(a()(n), "_handleAltTextChange", (function (e) {
              n.setState((function (t) {
                var n;
                return {
                  mediaMetadata: Object.assign({}, t.mediaMetadata, (n = {}, n[t.currentMediaId.toString()] = Object.assign({}, t.mediaMetadata[t.currentMediaId.toString()], {
                    altText: e
                  }), n))
                }
              }))
            })), c()(a()(n), "_handleSaveCropData", (function () {
              var e = n._cropper && n._cropper.current;
              if (e) {
                var t = n.state.currentMediaId,
                  r = e.getCropData();
                n.setState((function (e) {
                  var n;
                  return {
                    cropData: Object.assign({}, e.cropData, (n = {}, n[t] = r, n))
                  }
                }))
              }
            }));
            var r = t.initialMediaMetadata,
              i = t.initialMediaId,
              o = t.media,
              s = t.history,
              u = r || {};
            return n.state = {
              cropData: new Map,
              isProcessing: !1,
              mediaMetadata: u,
              currentMediaId: i || -1
            }, o.length <= 0 || !i ? (s.replace("/"), a()(n)) : n
          }

          o()(t, e);
          var n = t.prototype;
          return n.render = function () {
            var e = this.props,
              t = e.history,
              n = e.location;
            return d.createElement(X.b, {
              namespace: this._getCurrentNamespace()
            }, d.createElement(k.b, {
              backButtonType: "back",
              containerStyle: J.root,
              documentTitle: te,
              history: t,
              location: n,
              rightControl: this._renderAppBarRightControl(),
              title: te,
              withBottomBorder: !1
            }, this._renderSegmentedControl()))
          }, n._getCurrentNamespace = function () {
            var e;
            return "alt_text" === (null === (e = this.props.location.state) || void 0 === e ? void 0 : e.tab) ? $ : ee
          }, t
        }(d.Component);
      t.a = se
    }, // [12]
    lRnM: function (e, t, n) {
      "use strict";

      n.d(t, "f", (function () {
        return k
      })), n.d(t, "t", (function () {
        return G
      })), n.d(t, "x", (function () {
        return q
      })), n.d(t, "y", (function () {
        return H
      })), n.d(t, "B", (function () {
        return z
      })), n.d(t, "A", (function () {
        return Q
      })), n.d(t, "z", (function () {
        return W
      })), n.d(t, "u", (function () {
        return X
      })), n.d(t, "v", (function () {
        return Z
      })), n.d(t, "w", (function () {
        return J
      })), n.d(t, "d", (function () {
        return Y
      })), n.d(t, "k", (function () {
        return $
      })), n.d(t, "l", (function () {
        return ee
      })), n.d(t, "n", (function () {
        return te
      })), n.d(t, "m", (function () {
        return ne
      })), n.d(t, "a", (function () {
        return re
      })), n.d(t, "o", (function () {
        return ae
      })), n.d(t, "c", (function () {
        return oe
      })), n.d(t, "p", (function () {
        return ce
      })), n.d(t, "q", (function () {
        return de
      })), n.d(t, "I", (function () {
        return ue
      })), n.d(t, "s", (function () {
        return fe
      })), n.d(t, "D", (function () {
        return pe
      })), n.d(t, "h", (function () {
        return ve
      })), n.d(t, "j", (function () {
        return me
      })), n.d(t, "g", (function () {
        return be
      })), n.d(t, "i", (function () {
        return Oe
      })), n.d(t, "J", (function () {
        return Ee
      })), n.d(t, "G", (function () {
        return ge
      })), n.d(t, "H", (function () {
        return Ie
      })), n.d(t, "F", (function () {
        return he
      })), n.d(t, "b", (function () {
        return Te
      })), n.d(t, "r", (function () {
        return je
      })), n.d(t, "E", (function () {
        return Me
      })), n.d(t, "C", (function () {
        return Ne
      })), n.d(t, "e", (function () {
        return De
      }));
      n("1t7P"), n("jQ/y"), n("gqY9"), n("2G9S"), n("lTEL"), n("7xRU"), n("z84I"), n("KOtZ"), n("HUPx"), n("ho0z"), n("6U7i"), n("IAdD"), n("ZVkB"), n("+KXO"), n("7x/C"), n("1IsZ"), n("JtPf"), n("kYxP");
      var r = n("LdEA"),
        a = n.n(r),
        i = n("RhWx"),
        o = n.n(i),
        s = n("oEOe"),
        c = n("AspN"),
        d = n("RqPI"),
        u = n("AQ79"),
        l = n("/kEJ"),
        f = n("xPna"),
        _ = n("pXBW"),
        p = n("hqKg"),
        v = n("k49u"),
        m = n("/NU0"),
        b = n("aWyx"),
        O = n("WVrH"),
        E = n("uKEd"),
        g = n("k6jb"),
        I = n("kGix"),
        y = n("t0aI");

      function h(e) {
        var t = function (e, t) {
          if ("object" != typeof e || null === e) {
            return e;
          }
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(e, t || "default");
            if ("object" != typeof r) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }
          return ("string" === t ? String : Number)(e)
        }(e, "string");
        return "symbol" == typeof t ? t : String(t)
      }

      var A = s.a(u.b, "ACCEPT_CONVERSATION"),
        T = s.a(u.b, "ADD_PARTICIPANTS"),
        S = s.a(u.b, "FETCH_CONVERSATION"),
        j = s.a(u.b, "FETCH_CONVERSATION_FROM_PARTICIPANTS"),
        C = s.a(u.b, "LEAVE_CONVERSATION"),
        M = s.a(u.b, "MARK_CONVERSATION_READ"),
        N = s.a(u.b, "DISABLE_MENTION_CONVERSATION_NOTIFICATIONS"),
        D = s.a(u.b, "DISABLE_CONVERSATION_NOTIFICATIONS"),
        R = s.a(u.b, "ENABLE_MENTION_CONVERSATION_NOTIFICATIONS"),
        x = s.a(u.b, "ENABLE_CONVERSATION_NOTIFICATIONS"),
        P = s.a(u.b, "UPDATE_CONVERSATION_NAME"),
        w = s.a(u.b, "UPLOAD_MEDIA"),
        U = s.a(u.b, "UPDATE_GROUP_AVATAR"),
        L = function (e) {
          return (new Date).getTime() + 36e5 * e
        },
        B = [void 0, L(1), L(8), L(168)],
        V = {};

      function k(e, t) {
        var n, r, i, s, c, d, u, l, f, _, p, v, m;
        switch (void 0 === e && (e = V), t.type) {
          case A.SUCCESS:
            var b, E = t.meta.conversationId,
              j = e[E];
            return Object.assign({}, e, ((b = {})[E] = Object.assign({}, j, {
              data: Object.assign({}, j.data, {
                trusted: !0
              })
            }), b));
          case ie:
            var U = Object.entries(t.payload || {}).reduce((function (t, n) {
              var r, a = n[0],
                i = n[1];
              return t[a] = Object.assign({}, F(e[a], i), {
                fetchStatus: (r = {}, r[g.a] = I.a.LOADED, r[g.b] = I.a.LOADED, r)
              }), t
            }), {});
            return Object.assign({}, e, U);
          case T.REQUEST:
            var L, k, G = t.meta.conversationId,
              q = e[G];
            return Object.assign({}, e, ((k = {})[G] = Object.assign({}, q, {
              fetchStatus: Object.assign({}, q.fetchStatus, (L = {}, L[g.b] = I.a.LOADING, L))
            }), k));
          case T.FAILURE:
            var H, K, z = t.meta.conversationId,
              Q = e[z];
            return Object.assign({}, e, ((K = {})[z] = Object.assign({}, Q, {
              fetchStatus: Object.assign({}, Q.fetchStatus, (H = {}, H[g.b] = I.a.FAILED, H))
            }), K));
          case T.SUCCESS:
            var W, X, Z = t.meta.conversationId,
              J = e[Z],
              Y = J.data.participants,
              $ = t.payload.entities.entries ? Object.values(t.payload.entities.entries)[0].participants : [];
            return Object.assign({}, e, ((X = {})[Z] = Object.assign({}, J, {
              fetchStatus: Object.assign({}, J.fetchStatus, (W = {}, W[g.b] = I.a.LOADED, W)),
              data: Object.assign({}, J.data, {
                participants: [].concat(o()(Y), o()($))
              })
            }), X));
          case S.REQUEST:
            var ee, te, ne = t.meta,
              re = ne.conversationId,
              ae = ne.direction,
              oe = void 0 === ae ? g.a : ae,
              ce = e[re];
            return Object.assign({}, e, ((te = {})[re] = Object.assign({}, ce, {
              fetchStatus: Object.assign({}, ce && ce.fetchStatus || {}, (ee = {}, ee[oe] = I.a.LOADING, ee))
            }), te));
          case S.FAILURE:
            var de, ue, fe = t.meta,
              pe = fe.conversationId,
              ve = fe.direction,
              me = void 0 === ve ? g.a : ve,
              be = e[pe];
            return Object.assign({}, e, ((ue = {})[pe] = Object.assign({}, be, {
              fetchStatus: Object.assign({}, be && be.fetchStatus || {}, (de = {}, de[me] = I.a.FAILED, de)),
              error: t.payload
            }), ue));
          case S.SUCCESS:
            var Oe, Ee, ge = t.meta,
              Ie = ge.conversationId,
              he = ge.direction,
              Te = void 0 === he ? g.a : he;
            return Object.assign({}, e, ((Ee = {})[Ie] = Object.assign({}, e[Ie], {
              fetchStatus: Object.assign({}, e[Ie] && e[Ie].fetchStatus || {}, (Oe = {}, Oe[Te] = I.a.LOADED, Oe))
            }), Ee));
          case se:
            return Object.entries(e).reduce((function (n, r) {
              var a = r[0];
              r[1];
              return n[a] = F(e[a], {
                last_read_event_id: t.payload
              }), n
            }), {});
          case M.REQUEST:
            return Object.assign({}, e, ((n = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              last_read_event_id: t.meta.lastReadEventId
            }), n));
          case le:
            var je = e,
              Me = t.payload;
            je[Me];
            return a()(je, [Me].map(h));
          case C.REQUEST:
            return Object.assign({}, e, ((r = {})[t.meta.conversationId] = Object.assign({}, e[t.meta.conversationId], {
              isDeleted: !0
            }), r));
          case _e:
            return Object.assign({}, e, ((i = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              notifications_disabled: !t.payload
            }), i));
          case D.REQUEST:
            return Object.assign({}, e, ((s = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              notifications_disabled: !0,
              mute_expiration_time: B[t.meta.duration]
            }), s));
          case N.REQUEST:
            return Object.assign({}, e, ((c = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              mention_notifications_disabled: !0
            }), c));
          case x.REQUEST:
            return Object.assign({}, e, ((d = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              notifications_disabled: !1
            }), d));
          case R.REQUEST:
            return Object.assign({}, e, ((u = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              mention_notifications_disabled: !1
            }), u));
          case Ce:
            return Object.assign({}, e, ((l = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              avatar_image_https: t.payload
            }), l));
          case P.REQUEST:
          case P.SUCCESS:
            return Object.assign({}, e, ((f = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              name: t.meta.name
            }), f));
          case ye:
            var Ne, De = e[t.meta.conversationId],
              Re = De && De.data && De.data.max_entry_id || "0";
            return Object(y.b)(t.payload, Re) ? Object.assign({}, e, ((Ne = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              max_entry_id: t.payload
            }), Ne)) : e;
          case w.REQUEST:
            return Object.assign({}, e, ((_ = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              isUploading: !0
            }), _));
          case w.FAILURE:
          case w.SUCCESS:
            return Object.assign({}, e, ((p = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              isUploading: !1
            }), p));
          case Ae:
            return Object.assign({}, e, ((v = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              avatarMediaId: t.payload
            }), v));
          case Se:
            return Object.assign({}, e, ((m = {})[t.meta.conversationId] = F(e[t.meta.conversationId], {
              avatarMediaId: null
            }), m));
          case O.a:
            return V;
          default:
            return e
        }
      }

      var F = function (e, t, n) {
          void 0 === e && (e = {}), void 0 === t && (t = {}), void 0 === n && (n = []);
          var r, i, o = e,
            s = (o.error, a()(o, ["error"])),
            c = (Object(m.a)(t.avatarMediaId) ? t : s).avatarMediaId,
            d = void 0 === c ? null : c,
            u = t.isUploading,
            l = void 0 !== u && u,
            f = t,
            _ = (f.avatarMediaId, f.isUploading, f.max_entry_id),
            p = a()(f, ["avatarMediaId", "isUploading", "max_entry_id"]),
            v = Object.assign({}, s && s.data, p);
          return _ && (v.max_entry_id = (r = _, i = s && s.data && s.data.max_entry_id, Object(y.c)(r, i) ? r : i)), Object.assign({}, s, {
            avatarMediaId: d,
            data: v,
            isUploading: l
          })
        },
        G = function (e, t) {
          return e[u.a].conversations[t]
        },
        q = function (e, t) {
          var n = G(e, t);
          return n ? Object(I.b)(n.fetchStatus, n.data) : I.a.LOADED
        },
        H = function (e, t) {
          var n = G(e, t);
          return !!n && Object(I.b)(n.fetchStatus, n.data) === I.a.LOADED
        },
        K = function (e, t) {
          var n = G(e, t);
          return !!n && n.fetchStatus[g.a] === I.a.LOADING
        },
        z = Object(p.createSelector)((function (e) {
          return e[u.a].conversations
        }), (function (e) {
          return Object.entries(e).reduce((function (e, t) {
            var n = t[0],
              r = t[1];
            return r.data && (e[n] = r), e
          }), {})
        })),
        Q = function (e, t) {
          var n = ((G(e, t) || {}).data || {}).sort_event_id;
          if (n) {
            var r = d.g(e),
              a = Object(E.n)(e, n) || {},
              i = a.message_data,
              o = a.by_user_id,
              s = a.id,
              c = a.sender_id;
            if (c && c !== r || i && i.sender_id !== r || o && o !== r) return s
          }
          return null
        },
        W = function (e, t) {
          var n = Q(e, t),
            r = (G(e, t) || {}).data;
          return !n || !!(r && r.last_read_event_id && Object(y.c)(r.last_read_event_id, n))
        },
        X = function (e, t) {
          return (G(e, t) || {}).avatarMediaId
        },
        Z = function (e, t) {
          return (G(e, t) || {}).isUploading
        },
        J = function (e, t) {
          return c.h(e, X(e, t))
        },
        Y = function (e, t) {
          return function (n, r, a) {
            var i = a.api,
              o = t.join(",");
            return s.b(n, {
              params: {
                conversationId: e,
                joinedParticipantIds: o
              },
              request: i.DirectMessages.addParticipants
            })({
              actionTypes: T,
              context: "ACTION_DM_ADD_PARTICIPANTS",
              meta: {
                conversationId: e,
                participantIds: t
              }
            }, (function (e) {
              if (e) {
                var t = e.entities;
                return [t.entries && Object(E.a)(t.entries), Object(l.c)(t)]
              }
            })).then((function (e) {
              var t = e.result.failed_participants;
              if (!t) return Promise.resolve(e);
              var n = Object.keys(t),
                r = 1 === n.length ? t[n[0]] : v.a.DefaultApiError,
                a = new _.a("addParticpants URL", 500, e.headers, [{
                  code: r
                }]);
              return a.context.action = "ACTION_DM_ADD_PARTICIPANTS", Promise.reject(a)
            }))
          }
        },

        $ = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e,
                o = i.conversationId,
                c = i.context;
              return s.b(t, {
                params: e,
                request: a.DirectMessages.fetchConversation
              })({
                actionTypes: S,
                context: c,
                meta: {
                  conversationId: o,
                  direction: Object(g.c)(e)
                }
              }, (function (e) {
                if (e) {
                  var t = e.entities,
                    n = t.cards,
                    r = t.entries,
                    a = t.tweets,
                    i = t.users,
                    o = e.result.conversation_timeline,
                    s = function (e, t) {
                      return void 0 === e && (e = {}), Object.entries(e).reduce((function (e, n) {
                        var r, a = n[0],
                          i = n[1];
                        return Object.assign({}, e, ((r = {})[a] = Object.assign({}, i, t), r))
                      }), {})
                    }(o.conversations, {
                      max_entry_id: o.max_entry_id,
                      min_entry_id: o.min_entry_id,
                      status: o.status
                    });
                  return Object(f.b)({
                    conversations: s,
                    entries: r,
                    users: i,
                    tweets: a,
                    cards: n
                  })
                }
              }))
            }
        },
        ee = function (e) {
          return function (t, n, r) {
            var a = r.api;
            return s.b(t, {
              params: {
                participantIds: e
              },
              request: a.DirectMessages.fetchConversationFromParticipants
            })({
              actionTypes: j,
              meta: {
                participantIds: e
              }
            })
          }
        },
        te = function (e) {
          return void 0 === e && (e = {}),
            function (t, n) {
              var r = n(),
                a = e.conversationId,
                i = (G(r, a) || {}).data,
                o = void 0 === i ? {} : i,
                s = K(r, a);
              return (!o.status || o.status === b.c.HAS_MORE) && !s ? t($({
                conversationId: a,
                context: "FETCH_DM_CONVERSATION"
              })) : Promise.resolve()
            }
        },
        ne = function (e) {
          return void 0 === e && (e = {}),
            function (t, n) {
              var r = n(),
                a = e.conversationId,
                i = (G(r, a) || {}).data || {},
                o = i.status,
                s = i.min_entry_id,
                c = K(r, a);
              return o !== b.c.HAS_MORE || c ? Promise.resolve() : t($(Object.assign({}, e, {
                max_id: s,
                context: "FETCH_DM_CONVERSATION_HISTORY"
              })))
            }
        },
        re = function (e) {
          return function (t, n, r) {
            var a = r.api;
            return s.b(t, {
              params: {
                conversationId: e
              },
              request: a.DirectMessages.acceptConversation
            })({
              actionTypes: A,
              meta: {
                conversationId: e
              }
            })
          }
        },
        ae = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e.conversationId;
              return s.c(t, {
                params: e,
                request: a.DirectMessages.leaveConversation
              })({
                actionTypes: C,
                context: "ACTION_LEAVE_CONVERSATION",
                meta: {
                  conversationId: i
                }
              })
            }
        },
        ie = u.c("ADD_CONVERSATIONS"),
        oe = function (e) {
          return {
            payload: e,
            type: ie
          }
        },
        se = u.c("MARK_ALL_AS_READ"),
        ce = function (e) {
          return {
            payload: e,
            type: se
          }
        },
        de = function (e, t) {
          return {
            type: M.REQUEST,
            meta: {
              conversationId: e,
              lastReadEventId: t
            }
          }
        },
        ue = function (e) {
          return function (t, n, r) {
            var a = r.api,
              i = n(),
              o = (G(i, e) || {}).data,
              c = (void 0 === o ? {} : o).sort_event_id,
              d = !W(i, e);
            return e && c && d ? s.c(t, {
              params: {
                conversationId: e,
                last_read_event_id: c
              },
              request: a.DirectMessages.markRead
            })({
              actionTypes: M,
              bypassFailureOnErrors: function () {
                return !0
              },
              context: "APP_DM_UPDATE_CONVERSATION_READ_STATE",
              meta: {
                conversationId: e,
                lastReadEventId: c
              }
            }) : Promise.resolve()
          }
        },
        le = u.c("REMOVE_CONVERSATION"),
        fe = function (e) {
          return [{
            payload: e,
            type: le
          }, Object(E.i)(e)]
        },
        _e = u.c("TOGGLE_CONVERSATION_NOTIFICATIONS"),
        pe = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: _e
          }
        },
        ve = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e,
                o = i.conversationId,
                c = i.duration;
              return s.c(t, {
                params: e,
                request: a.DirectMessages.disableNotifications
              })({
                actionTypes: D,
                context: "ACTION_DISABLE_NOTIFICATIONS",
                meta: {
                  conversationId: o,
                  duration: c
                }
              })
            }
        },
        me = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e.conversationId;
              return s.c(t, {
                params: e,
                request: a.DirectMessages.enableNotifications
              })({
                actionTypes: x,
                context: "ACTION_ENABLE_NOTIFICATIONS",
                meta: {
                  conversationId: i
                }
              })
            }
        },
        be = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e.conversationId,
                o = Object.assign({
                  mention_notifications_disabled: !0
                }, e);
              return s.c(t, {
                params: o,
                request: a.DirectMessages.updateMentionNotificationsSetting
              })({
                actionTypes: N,
                context: "ACTION_DISABLE_DM_MENTION_NOTIFICATIONS",
                meta: {
                  conversationId: i
                }
              })
            }
        },
        Oe = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e.conversationId,
                o = Object.assign({
                  mention_notifications_disabled: !1
                }, e);
              return s.c(t, {
                params: o,
                request: a.DirectMessages.updateMentionNotificationsSetting
              })({
                actionTypes: R,
                context: "ACTION_ENABLE_DM_MENTION_NOTIFICATIONS",
                meta: {
                  conversationId: i
                }
              })
            }
        },
        Ee = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              return r.api.DirectMessages.updateTyping(e)
            }
        },
        ge = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = e,
                o = i.conversationId,
                c = i.name;
              return s.c(t, {
                params: e,
                request: a.DirectMessages.updateConversationName
              })({
                actionTypes: P,
                context: "ACTION_UPDATE_CONVERSATION_NAME",
                meta: {
                  conversationId: o,
                  name: c
                }
              })
            }
        },
        Ie = function (e) {
          return {
            type: P.SUCCESS,
            meta: {
              conversationId: e.conversation_id,
              name: e.conversation_name
            }
          }
        },
        ye = u.c("UPDATE_CONVERSATION_MAX_ENTRY_ID"),
        he = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: ye
          }
        },
        Ae = u.c("ADD_AVATAR_MEDIA"),
        Te = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: Ae
          }
        },
        Se = u.c("REMOVE_AVATAR_MEDIA"),
        je = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: Se
          }
        },
        Ce = u.c("UPDATE_CONVERSATION_AVATAR"),
        Me = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: Ce
          }
        },
        Ne = function (e) {
          return function (t, n, r) {
            var a = r.api;
            t({
              meta: {
                conversationId: e
              },
              type: w.REQUEST
            });
            var i = X(n(), e),
              o = c.k(i);
            return t(o).then((function (n) {
              var r = n[0];
              return t({
                meta: {
                  conversationId: e
                },
                type: w.SUCCESS
              }), s.b(t, {
                params: {
                  conversationId: e,
                  avatar_id: r.uploadId
                },
                request: a.DirectMessages.updateConversationAvatar
              })({
                actionTypes: U,
                context: "APP_DM_UPDATE_CONVERSATION_AVATAR"
              })
            }), (function (n) {
              var r = {
                errors: n,
                context: "APP_DM_UPDATE_CONVERSATION_AVATAR"
              };
              return t({
                meta: {
                  conversationId: e
                },
                type: w.FAILURE
              }), Promise.reject(r)
            }))
          }
        },
        De = function (e, t) {
          return function (n, r, a) {
            var i = a.api;
            return s.d(n, {
              params: {
                conversation_id: e,
                welcome_message_id: t
              },
              request: i.DirectMessages.addWelcomeMessageToConversation
            })("ADD_WELCOME_MESSAGE_TO_CONVERSATION")
          }
        }
    }, // [13]

    pKoL: function (e, t, n) {
      "use strict";
      n("2G9S");
      var r = n("1Pcy"),
        a = n.n(r),
        i = n("W/Kd"),
        o = n.n(i),
        s = n("KEM+"),
        c = n.n(s),
        d = n("ERkP"),
        u = n("HPNB"),
        l = n("9HgX"),
        f = n("3XMw"),
        _ = n.n(f),
        p = n("l2F/"),
        v = n.n(p),
        m = n("ur9R"),
        b = n.n(m),
        O = n("mN6z"),
        E = (n("AxOO"), n("Qwev")),
        g = n("rHpw"),
        I = (n("aWzz"), n("1auM")),
        y = n("ude7"),
        h = n("D4le"),
        A = n.n(h),
        T = n("3xO4"),
        S = n.n(T),
        j = _.a.a54d17e1,
        C = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, c()(a()(t), "state", {
              imagePreviewUrl: null
            }), c()(a()(t), "_getImageSrc", (function () {
              var e = t.props,
                n = e.mediaItem,
                r = e.enableGif,
                a = t.state.imagePreviewUrl;
              if (n && n.mediaFile) return n.mediaFile.isGif && !r ? a : n.mediaFile.url
            })), t
          }

          o()(t, e);
          var n = t.prototype;
          return n.componentDidUpdate = function () {
            var e = this,
              t = this.props,
              n = t.enableGif,
              r = t.mediaItem.mediaFile,
              a = this.state.imagePreviewUrl;
            n || a || r instanceof I.a && r.isGif && Object(y.a)(r).then((function (t) {
              e.setState({
                imagePreviewUrl: t
              })
            }))
          }, n.shouldComponentUpdate = function (e, t) {
            return !Object(O.a)(e, this.props) || !Object(O.a)(t, this.state)
          }, n.render = function () {
            var e = this.props,
              t = e.borderRadius,
              n = e.enableGif,
              r = e.mediaItem,
              a = e.onClick,
              i = (this.state || {}).imagePreviewUrl,
              o = r.mediaFile && r.mediaFile.isGif && !n && !i,
              s = r.needsProcessing || o,
              c = [N.root, M[t], s && N.loadingBorder],
              u = this._getImageSrc();
            return d.createElement(S.a, {
              onClick: a,
              style: c
            }, s || !u ? d.createElement(E.a, {
              accessibilityLabel: j,
              style: N.activityIndicator
            }) : d.createElement(A.a, {
              resizeMode: "cover",
              source: u,
              style: N.image
            }))
          }, t
        }(d.Component);
      c()(C, "defaultProps", {
        borderRadius: "none",
        enableGif: true,
      });
      var M = g.a.create((function (e) {
          return {
            infinite: {
              borderRadius: e.borderRadii.infinite
            },
            medium: {
              borderRadius: e.borderRadii.medium
            },
            none: {
              borderRadius: 0
            }
          }
        })),
        N = g.a.create((function (e) {
          return {
            root: {
              borderRadius: e.borderRadii.large,
              borderStyle: "solid",
              borderWidth: 0,
              borderColor: "transparent",
              maxWidth: "100%",
              height: "100%",
              overflow: "hidden"
            },
            image: {
              display: "block",
              height: "100%",
              width: "100%"
            },
            loadingBorder: {
              borderColor: e.colors.mediumGray
            },
            activityIndicator: {
              height: "100%"
            }
          }
        })),
        D = C,
        R = (n("z84I"), n("IAdD"), n("LdEA")),
        x = n.n(R),
        P = n("7DT3"),
        w = n.n(P),
        U = n("eXeu"),
        L = n("iOGT"),
        B = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, c()(a()(t), "_setVideoRef", (function (e) {
              var n = t.props.getVideoRef;
              n && n(e)
            })), t
          }

          return o()(t, e), t.prototype.render = function () {
            var e = this.props,
              t = e.children,
              n = e.dataSaverMode,
              r = (e.getVideoRef, e.style),
              a = e.variants,
              i = x()(e, ["children", "dataSaverMode", "getVideoRef", "style", "variants"]),
              o = Object(L.c)(a, n ? L.a.MEDIUM : L.a.HIGH) || [],
              s = Object(U.e)(o.map((function (e) {
                return {
                  src: e.url,
                  type: e.content_type
                }
              })));
            return w()("video", Object.assign({}, i, {
              children: [s.map((function (e) {
                return d.createElement("source", {
                  key: e.src,
                  src: e.src,
                  type: e.type
                })
              })), t],
              ref: this._setVideoRef,
              style: r
            }))
          }, t
        }(d.Component);
      c()(B, "defaultProps", {
        dataSaverMode: !1,
        variants: []
      });
      var V = n("sjK1");
      var k = n("cHvH");
      var F = n("mXq/");
      var G = n("/yvb");
      var q = n("a6qo");
      var H = n("+/sI");
      var K = _.a.b2e1930b;
      var z = _.a.c650c591;
      var Q = _.a.j0fc88f7;
      var W = _.a.i82022e8;
      var X = _.a.a8adfbd0;
      var Z = function (e) {
          function t() {
            for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            return t = e.call.apply(e, [this].concat(r)) || this, c()(a()(t), "state", {
              isVideoPaused: true,
              playGif: false,
            }), c()(a()(t), "_handleGifClick", (function () {
              t.setState({
                playGif: !t.state.playGif
              })
            })), c()(a()(t), "_handleMediaPreviewLayout", (function (e) {
              var n = t.props,
                mediaItem = n.mediaItem,
                resizeIfNeeded = n.resizeIfNeeded,
                mediaFileOrExternalMediaDetails = mediaItem.mediaFile || mediaItem.externalMediaDetails;
              if (mediaFileOrExternalMediaDetails) {
                var layout = e.nativeEvent.layout;
                var layoutHeight = layout.height;
                var layoutWidth = layout.width;
                var mediaFileOrExternalMediaDetailsHeight = mediaFileOrExternalMediaDetails.height;
                var mediaFileOrExternalMediaDetailsWidth = mediaFileOrExternalMediaDetails.width / mediaFileOrExternalMediaDetailsHeight;
                Math.abs(mediaFileOrExternalMediaDetailsWidth - layoutWidth / layoutHeight) > .05 && t._mediaContainer && ("width" === resizeIfNeeded ? t._mediaContainer.setNativeProps({
                  style: {
                    width: layoutHeight * mediaFileOrExternalMediaDetailsWidth
                  }
                }) : "height" === resizeIfNeeded && t._mediaContainer.setNativeProps({
                  style: {
                    height: layoutWidth / mediaFileOrExternalMediaDetailsWidth
                  }
                }))
              }
            })), c()(a()(t), "_handleVideoOnPlay", (function (e) {
              t.setState({
                isVideoPaused: !1
              })
            })), c()(a()(t), "_handleVideoOnPause", (function (e) {
              t.setState({
                isVideoPaused: !0
              })
            })), c()(a()(t), "_setMediaContainerRef", (function (e) {
              t._mediaContainer = e
            })), c()(a()(t), "_setVideoRef", (function (e) {
              t._video = e
            })), c()(a()(t), "_playVideo", (function () {
              if (t._video) {
                var e = t._video.play();
                void 0 !== e && e.then((function (e) {
                  t._handleVideoOnPlay()
                })).catch()
              }
            })), c()(a()(t), "_pauseVideo", (function () {
              t._video && (t._video.pause(), t._handleVideoOnPause())
            })), t
          }

          o()(t, e);
          var n = t.prototype;
          return n.render = function () {
            var e = this,
              t = this.props,
              n = t.accessibilityLabel,
              r = t.accessibilityRole,
              a = t.enableGif,
              i = t.mediaItem,
              o = t.onEdit,
              s = t.onRemove,
              c = t.style,
              f = t.withAltTextLabel,
              _ = t.withCloseButton,
              p = t.withEditButton,
              m = this.state.playGif,
              O = i.externalMediaDetails && i.externalMediaDetails.mediaType === l.a,
              E = O || a && i.mediaFile && i.mediaFile.isGif;
            return d.createElement(k.a, null, (function (t) {
              var a = t.windowWidth,
                i = u.a.isTwoColumnLayout(a);
              return d.createElement(S.a, {
                accessibilityLabel: n || X,
                accessibilityRole: r,
                onLayout: e._handleMediaPreviewLayout,
                ref: e._setMediaContainerRef,
                style: [c, J.cursor, O && J.gifPlayButton]
              }, e._renderPreview(), O && !m && d.createElement(F.a, {
                accessibilityLabel: Q,
                onPress: e._handleGifClick,
                size: "small"
              }), _ ? d.createElement(G.a, {
                accessibilityLabel: W,
                icon: d.createElement(v.a, null),
                onPress: s,
                size: "small",
                style: J.close,
                type: "onMedia"
              }) : null, E ? d.createElement(H.c, {
                type: H.a
              }) : null, f ? d.createElement(q.a, {
                align: "left",
                bold: !0
              }, "ALT") : null, p ? d.createElement(G.a, {
                accessibilityLabel: K,
                icon: i ? void 0 : d.createElement(b.a, null),
                onPress: o,
                size: i ? "normalCompact" : "small",
                style: J.edit,
                type: "onMedia"
              }, i && z) : null)
            }))
          }, n._renderPreview = function () {
            var e = this.props.mediaItem;
            if (e.externalMediaDetails) {
              var t = e.externalMediaDetails.previewUrl,
                n = e.externalMediaDetails.stillMediaUrl;
              return this._renderGifPreview(t, n)
            }
            if (e.mediaFile && e.mediaFile.isVideo) { // TODO: important lines of code here
              var r = [{
                content_type: e.mediaFile.type,
                url: e.mediaFile.url
              }];
              return this._renderVideoPreview(r)
            }
            return d.createElement(S.a, {
              style: g.a.absoluteFill
            }, this._renderImagePreview())
          }, n._renderGifPreview = function (e, t) {
            var n = {
              uri: this.state.playGif ? e : t
            };
            return d.createElement(S.a, {
              onClick: this._handleGifClick,
              style: g.a.absoluteFill
            }, d.createElement(A.a, {
              resizeMode: "cover",
              source: n,
              style: J.video
            }))
          }, n._renderImagePreview = function () {
            var e = this.props,
              t = e.borderRadius,
              n = e.enableGif,
              r = e.mediaItem,
              a = e.onClick;
            return d.createElement(D, {
              borderRadius: t,
              enableGif: n,
              mediaItem: r,
              onClick: a
            })
          }, n._renderVideoPreview = function (e) {
            var t = this.props.mediaItem.mediaFile;
            return d.createElement(B, {
              autoPlay: false,
              controls: true,
              getVideoRef: this._setVideoRef,
              loop: true,
              muted: true,
              onPause: this._handleVideoOnPause,
              onPlay: this._handleVideoOnPlay,
              playsInline: true,
              poster: t instanceof V.c ? t.thumbnail : "",
              style: J.video,
              variants: e
            })
          }, t
        }(d.Component);
      c()(Z, "defaultProps", {
        enableGif: true,
        withCloseButton: true,
        withAltTextLabel: false,
        withEditButton: false,
      });
      var J = g.a.create((function (e) {
        return {
          close: {
            position: "absolute",
            left: e.spaces.xxSmall,
            top: e.spaces.xxSmall
          },
          cursor: {
            cursor: "pointer"
          },
          edit: {
            position: "absolute",
            right: e.spaces.xxSmall,
            top: e.spaces.xxSmall
          },
          gifPlayButton: {
            alignItems: "center",
            justifyContent: "center"
          },
          video: {
            height: "100%",
            width: "100%"
          }
        }
      }));
      t.a = Z
    }, // [14]

    uKEd: function (e, t, n) {
      "use strict";
      n.d(t, "e", (function () {
        return T
      })), n.d(t, "a", (function () {
        return M
      })), n.d(t, "f", (function () {
        return N
      })), n.d(t, "d", (function () {
        return D
      })), n.d(t, "k", (function () {
        return R
      })), n.d(t, "i", (function () {
        return P
      })), n.d(t, "r", (function () {
        return w
      })), n.d(t, "h", (function () {
        return U
      })), n.d(t, "b", (function () {
        return B
      })), n.d(t, "j", (function () {
        return k
      })), n.d(t, "c", (function () {
        return G
      })), n.d(t, "g", (function () {
        return H
      })), n.d(t, "l", (function () {
        return K
      })), n.d(t, "n", (function () {
        return z
      })), n.d(t, "o", (function () {
        return Q
      })), n.d(t, "m", (function () {
        return W
      })), n.d(t, "p", (function () {
        return X
      })), n.d(t, "q", (function () {
        return Z
      }));
      n("2G9S"), n("LW0h"), n("hBpG"), n("jwue"), n("lTEL"), n("z84I"), n("KOtZ"), n("tQbP"), n("IAdD"), n("+KXO"), n("7x/C"), n("1IsZ"), n("DZ+c"), n("+oxZ"), n("kYxP");
      var r = n("LdEA"),
        a = n.n(r),
        i = n("RhWx"),
        o = n.n(i),
        s = n("t0aI"),
        c = n("aWyx"),
        d = n("WVrH"),
        u = n("fEA7"),
        l = n.n(u),
        f = n("AQ79"),
        _ = n("3A2y"),
        p = n("J4ZH"),
        v = n("4FGy"),
        m = n("s1N3"),
        b = n("lnti"),
        O = n("oEOe"),
        E = Object(O.a)(f.b, "DELETE_MESSAGE"),
        g = Object(O.a)(f.b, "REACTION_CREATE"),
        I = Object(O.a)(f.b, "REACTION_DELETE"),
        y = Object(O.a)(f.b, "MARK_ENTRIES_AS_SPAM"),
        h = Object(O.a)(f.b, "MARK_ENTRIES_AS_NOT_SPAM"),
        A = {
          entries: {},
          entryIdsByConversationId: {},
          reactionsByMessageId: {}
        };

      function T(e, t) {
        void 0 === e && (e = A);
        var n = t.meta || {},
          r = n.conversationId,
          a = n.requestId;
        switch (t.type) {
          case L:
            var i, s, u = t.payload.id,
              l = Object.assign({}, e.entries, ((i = {})[u] = S(e.entries[u], {
                data: t.payload
              }), i));
            return Object.assign({}, e, {
              entries: l,
              entryIdsByConversationId: Object.assign({}, e.entryIdsByConversationId, (s = {}, s[r] = j([].concat(o()(e.entryIdsByConversationId[r] || []), [u]), l), s))
            });
          case C:
            var f = Object.values(t.payload).filter((function (e) {
                return e.type !== c.b.CONVERSATION_READ
              })).reduce((function (t, n) {
                var r = n.id,
                  a = Object(_.a)(n, "message_reactions");
                return t.allEntries[r] = S(e.entries[r], {
                  data: a,
                  isLoading: !1,
                  isLoaded: !0
                }), n.message_reactions && (n.message_reactions.forEach((function (r) {
                  var a = Object.assign({}, r, {
                    affects_sort: !0,
                    message_id: n.id,
                    type: c.b.REACTION_CREATE
                  });
                  t.allEntries[a.id] = S(e.entries[a.id], {
                    data: a,
                    isLoading: !1,
                    isLoaded: !0
                  })
                })), t.embeddedReactionsByMessageId[r] = j([].concat(o()(e.reactionsByMessageId[r] || []), o()(n.message_reactions.map((function (e) {
                  return e.id
                })))), Object.assign({}, e.entries, t.allEntries))), t
              }), {
                allEntries: {},
                embeddedReactionsByMessageId: {}
              }),
              m = Object.assign({}, e.entries, f.allEntries),
              b = Object(p.a)(Object.values(f.allEntries), (function (e) {
                return e.data.conversation_id
              })),
              O = Object.keys(b).reduce((function (t, n) {
                var r = b[n].map((function (e) {
                  return e.data.id
                }));
                return t[n] = j([].concat(o()(e.entryIdsByConversationId[n] || []), o()(r)), m), t
              }), {});
            return Object.assign({}, e, {
              entries: m,
              entryIdsByConversationId: Object.assign({}, e.entryIdsByConversationId, O),
              reactionsByMessageId: Object.assign({}, e.reactionsByMessageId, f.embeddedReactionsByMessageId)
            });
          case y.REQUEST:
          case h.REQUEST:
            var g = t.type === y.REQUEST,
              T = t.payload.reduce((function (t, n) {
                var r, a = e.entries[n] && e.entries[n].data;
                return Object.assign({}, t, ((r = {})[n] = Object.assign({}, e.entries[n], {
                  data: Object.assign({}, a, {
                    marked_as_spam: g
                  })
                }), r))
              }), {});
            return Object.assign({}, e, {
              entries: Object.assign({}, e.entries, T)
            });
          case E.REQUEST:
          case x:
            var M, N = t.type === x && !Array.isArray(t.payload),
              D = e.entryIdsByConversationId[r] || [],
              R = t.type === x ? N ? D : t.payload : [t.payload].concat(o()(e.reactionsByMessageId[t.payload] || []));
            return Object.assign({}, e, {
              entries: Object(_.a)(e.entries, R),
              entryIdsByConversationId: Object.assign({}, Object(_.a)(e.entryIdsByConversationId, r), N ? {} : (M = {}, M[r] = Object(v.a)(D, R), M)),
              reactionsByMessageId: Object(_.a)(e.reactionsByMessageId, R)
            });
          case V:
            var P, w = t.payload.id || a,
              U = Object.assign({}, Object(_.a)(e.entries, w)),
              B = j((e.entryIdsByConversationId[r] || []).filter((function (e) {
                return e !== w
              })), U),
              k = B ? ((P = {})[r] = B, P) : {};
            return Object.assign({}, e, {
              entries: U,
              entryIdsByConversationId: Object.assign({}, Object(_.a)(e.entryIdsByConversationId, r), k),
              reactionsByMessageId: Object(_.a)(e.reactionsByMessageId, w)
            });
          case F:
            var G, H = t.payload,
              K = j([].concat(o()(e.reactionsByMessageId[H.message_id] || []), [H.id]), e.entries);
            return Object.assign({}, e, {
              reactionsByMessageId: Object.assign({}, e.reactionsByMessageId, (G = {}, G[H.message_id] = K, G))
            });
          case I.REQUEST:
          case q:
            var z, Q, W = t.payload,
              X = (e.reactionsByMessageId[W.message_id] || []).find((function (t) {
                return e.entries[t].data.sender_id === W.sender_id
              }));
            if (!X) return e;
            var Z = Object(v.a)(e.entryIdsByConversationId[W.conversation_id], X),
              J = Object(v.a)(e.reactionsByMessageId[W.message_id], X);
            return Object.assign({}, e, {
              entries: Object(_.a)(e.entries, X),
              entryIdsByConversationId: Object.assign({}, e.entryIdsByConversationId, (z = {}, z[W.conversation_id] = Z, z)),
              reactionsByMessageId: Object.assign({}, e.reactionsByMessageId, (Q = {}, Q[W.message_id] = J, Q))
            });
          case d.a:
            return A;
          default:
            return e
        }
      }

      var S = function (e, t) {
          var n = e || {},
            r = (n.error, n.isLoaded, n.isLoading, a()(n, ["error", "isLoaded", "isLoading"])),
            i = t || {},
            o = i.data,
            s = a()(i, ["data"]);
          return Object.assign({}, r, {
            data: Object.assign({}, r && r.data, o)
          }, s)
        },
        j = function (e, t) {
          void 0 === e && (e = []);
          var n = Object(m.a)(e).sort((function (e, n) {
            var r = Object(s.a)(t[e].data.time, t[n].data.time);
            return 0 === r ? Object(s.a)(t[e].id, t[n].id) : r
          }));
          return n.length ? n : void 0
        },
        C = Object(f.c)("ADD_ENTRIES"),
        M = function (e) {
          return {
            payload: e,
            type: C
          }
        },
        N = function (e) {
          return function (t, n, r) {
            var i = r.api,
              o = e || {},
              s = o.id,
              c = o.conversationId,
              d = o.requestId,
              u = void 0 === d ? l.a.v1() : d,
              f = a()(o, ["id", "conversationId", "requestId"]),
              _ = Object.assign({}, f, {
                id: s,
                request_id: u
              });
            return Object(O.c)(t, {
              params: _,
              request: i.DirectMessages.deleteMessage
            })({
              actionTypes: E,
              context: "ACTION_DELETE_DM",
              payload: s,
              meta: {
                conversationId: c
              }
            })
          }
        },
        D = function (e) {
          return function (t, n, r) {
            var a, i, o, s, d, u = r.api,
              f = (i = (a = e).reaction_key, o = a.conversation_id, s = a.dm_id, d = a.perspective, {
                id: l.a.v1(),
                time: (new Date).getTime().toString(),
                reaction_key: i,
                conversation_id: o,
                message_id: s,
                sender_id: d,
                type: c.b.REACTION_CREATE
              });
            t([B(f.conversation_id, f.id, f), H(f), G(f)]);
            return Object(O.b)(t, {
              params: Object(_.a)(e, "perspective"),
              request: u.DirectMessages.addReaction
            })({
              actionTypes: g,
              context: "ACTION_REACTION_CREATE"
            }, (function (e, t) {
              if (t) return [H(f)]
            }))
          }
        },
        R = function (e) {
          return function (t, n, r) {
            var i = r.api,
              o = e.perspective,
              s = a()(e, ["perspective"]);
            return Object(O.c)(t, {
              params: s,
              request: i.DirectMessages.deleteReaction
            })({
              actionTypes: I,
              context: "ACTION_REACTION_DELETE",
              payload: {
                conversation_id: e.conversation_id,
                message_id: e.dm_id,
                sender_id: o
              }
            })
          }
        },
        x = "rweb/dm/REMOVE_CONVERSATION_ENTRIES",
        P = function (e, t) {
          return {
            meta: {
              conversationId: e
            },
            payload: t,
            type: x
          }
        },
        w = function (e, t) {
          return {
            payload: e,
            type: t ? y.REQUEST : h.REQUEST
          }
        },
        U = function (e) {
          var t = e.conversationId,
            n = e.dmId,
            r = e.markSpam;
          return function (e, a, i) {
            var o = i.api;
            return Object(O.c)(e, {
              params: {
                dm_id: n,
                report_as: r ? "spam" : "not_spam"
              },
              request: o.DirectMessages.reportSpam
            })({
              actionTypes: r ? E : h,
              payload: r ? n : [n],
              meta: {
                conversationId: t
              }
            })
          }
        },
        L = Object(f.c)("ADD_ENTRY"),
        B = function (e, t, n) {
          return {
            meta: {
              conversationId: e,
              requestId: t
            },
            payload: n,
            type: L
          }
        },
        V = Object(f.c)("REMOVE_ENTRY"),
        k = function (e, t, n) {
          return {
            meta: {
              conversationId: e,
              requestId: t
            },
            payload: n,
            type: V
          }
        },
        F = Object(f.c)("ADD_REACTION"),
        G = function (e) {
          return {
            payload: e,
            type: F
          }
        },
        q = Object(f.c)("DELETE_REACTION"),
        H = function (e) {
          return {
            payload: e,
            type: q
          }
        },
        K = function (e) {
          return e[f.a].entries
        },
        z = function (e, t) {
          var n = K(e).entries[t];
          return n && n.data
        },
        Q = function (e, t) {
          return e[f.a].entries.entryIdsByConversationId[t]
        },
        W = function (e, t) {
          var n = Q(e, t);
          return n ? Object(b.a)(n.map((function (t) {
            return z(e, t)
          }))) : []
        },
        X = function (e, t) {
          return K(e).reactionsByMessageId[t]
        },
        Z = function (e, t) {
          return (X(e, t) || []).map((function (t) {
            return z(e, t).sender_id
          }))
        }
    }, // [15]

    ude7: function (e, t, n) {
      "use strict";

      n.d(t, "a", (function () {
        return d
      }));
      n("7x/C"), n("JtPf");
      var r = n("A0bJ");
      var a = n("hJBK");
      var i = n("1auM");
      var first = 1;
      var second = 2;
      var third = 3,
        d = function (e) {
          if (Object(i.b)(e)) {
            if (e.isGif) {
              var t = e.img,
                n = e.width,
                d = e.height,
                u = e.orientation;
              return Object(a.b)(t, n, d, u).then((function (e) {
                return Object(a.a)(e)
              }), (function (e) {
                throw new r.a("Gif preview could not be generated", third)
              }))
            }
            var l = new r.a("The provided image must be a gif", second);
            return Promise.reject(l)
          }
          var f = new r.a("The provided file is not a valid image", first);
          return Promise.reject(f)
        }
    }, // [16]
    ur9R: function (e, t, n) {
      "use strict";
      n("IAdD"), t.__esModule = !0, t.default = void 0;
      var r = o(n("7DT3")),
        a = o(n("ERkP")),
        i = o(n("OkZJ"));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      var s = function (e) {
        return void 0 === e && (e = {}), (0, r.default)("svg", Object.assign({}, e, {
          style: [i.default.root, e.style],
          viewBox: "0 0 24 24"
        }), a.default.createElement("g", null, a.default.createElement("path", {
          d: "M21.592 5.576c.877-.967.882-2.298.006-3.174-.877-.877-2.208-.87-3.174.006 0 0-.003 0-.004.002l-.006.006-.005.004s-.002 0-.002.002L8.398 11.27c-1.716-.214-3.424.31-4.534 1.42-3.872 3.874-1.523 9.616-1.422 9.858.1.24.32.41.577.45.037.007.075.01.113.01.218 0 .428-.095.57-.265 1.83-2.15 3.043-2.023 4.328-1.89 1.164.122 2.477.258 3.834-1.282.975-1.106 1.302-2.585.922-4.03l8.792-9.948h.002l.004-.006.006-.006.002-.004zm-1.055-2.113c.305.305.28.74-.06 1.11-.003.003-.004.007-.006.01 0 0-.003 0-.004.003l-5.662 6.406-1.796-1.796 6.406-5.662c.002 0 .002-.003.004-.005.002-.003.006-.004.008-.006.37-.34.807-.365 1.11-.06zm-8.62 10.797L9.74 12.084l2.142-1.894 1.927 1.927-1.894 2.143zm-1.178 4.32c-.848.96-1.488.895-2.552.78-1.27-.13-2.808-.293-4.722 1.463-.415-1.673-.784-4.83 1.457-7.072.807-.805 2.086-1.168 3.377-.983l2.977 2.976c.333 1.03.15 2.057-.538 2.836z"
        })))
      };
      s.metadata = {
        height: 24,
        width: 24
      };
      var c = s;
      t.default = c
    }, // [17]
    xCUF: function (e, t, n) {
      "use strict";
      n.d(t, "c", (function () {
        return m
      })), n.d(t, "a", (function () {
        return O
      })), n.d(t, "b", (function () {
        return E
      })), n.d(t, "d", (function () {
        return g
      })), n.d(t, "f", (function () {
        return y
      })), n.d(t, "e", (function () {
        return S
      }));
      n("2G9S"), n("LW0h"), n("lTEL"), n("KOtZ"), n("tQbP"), n("IAdD"), n("7x/C"), n("1IsZ"), n("JtPf"), n("kYxP");
      var r = n("RhWx"),
        a = n.n(r),
        i = n("LdEA"),
        o = n.n(i),
        s = n("oEOe"),
        c = n("aWyx"),
        d = n("k6jb"),
        u = n("P1r1"),
        l = n("AQ79"),
        f = n("uKEd"),
        _ = n("xPna"),
        p = n("lRnM"),
        v = n("WVrH"),
        m = s.a(l.b, "FETCH_UPDATES"),
        b = {
          isLoaded: !1,
          isLoading: !1
        };

      function O(e, t) {
        switch (void 0 === e && (e = b), t.type) {
          case m.REQUEST:
            return Object.assign({}, e, {
              isLoading: !0
            });
          case m.FAILURE:
            return Object.assign({}, e, {
              error: t.payload,
              isLoaded: !1,
              isLoading: !1
            });
          case m.SUCCESS:
            var n = e,
              r = (n.error, o()(n, ["error"]));
            return Object.assign({}, r, {
              isLoaded: !0,
              isLoading: !1
            });
          case I:
            return Object.assign({}, e, {
              cursor: t.payload
            });
          case h:
            return Object.assign({}, e, {
              tertiaryInboxStatus: t.payload
            });
          case v.a:
            return b;
          default:
            return e
        }
      }

      var E = function (e) {
          return function (t, n, r) {
            var i = r.api,
              c = n().directMessages,
              l = void 0 === c ? {} : c,
              f = (l.updates || {}).cursor,
              p = e || {},
              b = p.polling,
              O = o()(p, ["polling"]),
              E = (l.updates || {}).tertiaryInboxStatus,
              g = !1,
              I = b ? {
                "x-twitter-polling": "true"
              } : {},
              y = Object(u.o)(n()) ? "on" : "off";
            E ? E !== y && (f = null, g = !0) : g = !0;
            var h = Object(_.i)(Object.assign({}, O, {
              cursor: f
            }), n());
            return s.b(t, {
              params: h,
              headers: I,
              request: i.DirectMessages.fetchUserUpdates
            })({
              actionTypes: m,
              context: "FETCH_DM_USER_UPDATES",
              meta: {
                direction: Object(d.c)(e)
              }
            }, (function (e) {
              if (e) {
                var entities = e.entities,
                  entries = t.entries,
                  tweets = t.tweets,
                  users = t.users,
                  cards = t.cards,
                  result = e.result,
                  user_events = result.user_events,
                  inbox_initial_state = result.inbox_initial_state;
                return [inbox_initial_state && Object(v.b)()].concat(a()(Object(_.b)(Object.assign({}, user_events || inbox_initial_state, {
                  entries: entries,
                  users: users,
                  tweets: tweets,
                  cards: cards
                }))), a()(user_events ? T(Object.values(entries || [])) : []), [g && A(y)])
              }
            }))
          }
        },
        g = function (e) {
          return function (t, n) {
            return j(n()) ? Promise.resolve() : t(E(e))
          }
        },
        I = Object(l.c)("UPDATE_CURSOR"),
        y = function (e) {
          return {
            payload: e,
            type: I
          }
        },
        h = Object(l.c)("UPDATE_TERTIARY_INBOX_STATUS"),
        A = function (e) {
          return {
            payload: e,
            type: h
          }
        },
        T = function (e) {
          return void 0 === e && (e = []), e.sort((function (e, t) {
            return e.id - t.id
          })).reduce((function (e, t) {
            switch (t.type) {
              case c.b.CONVERSATION_AVATAR_UPDATE:
                return [].concat(a()(e), [Object(p.E)(t.conversation_id, t.conversation_avatar_image_https), Object(p.F)(t.conversation_id, t.id)]).filter((function (e) {
                  return e
                }));
              case c.b.CONVERSATION_NAME_UPDATE:
                return [].concat(a()(e), [Object(p.H)(t), Object(p.F)(t.conversation_id, t.id)]).filter((function (e) {
                  return e
                }));
              case c.b.CONVERSATION_READ:
                return [].concat(a()(e), [Object(p.q)(t.conversation_id, t.last_read_event_id)]);
              case c.b.DISABLE_NOTIFICATIONS:
              case c.b.ENABLE_NOTIFICATIONS:
                var n = t.type === c.b.ENABLE_NOTIFICATIONS;
                return [].concat(a()(e), [Object(p.D)(t.conversation_id, n)]);
              case c.b.MARK_ALL_AS_READ:
                return [].concat(a()(e), [Object(p.p)(t.last_read_event_id)]);
              case c.b.MESSAGE_DELETE:
                return [].concat(a()(e), [Object(f.i)(t.conversation_id, t.messages.reduce((function (e, t) {
                  return [].concat(a()(e), a()(Object.values(t)))
                }), []))]);
              case c.b.MESSAGE_MARK_AS_NOT_SPAM:
              case c.b.MESSAGE_MARK_AS_SPAM:
                var r = t.type === c.b.MESSAGE_MARK_AS_SPAM;
                return [].concat(a()(e), [Object(f.r)(t.messages.reduce((function (e, t) {
                  return [].concat(a()(e), a()(Object.values(t)))
                }), []), r)]);
              case c.b.REMOVE_CONVERSATION:
                return [].concat(a()(e), a()(Object(p.s)(t.conversation_id)));
              case c.b.JOIN_CONVERSATION:
              case c.b.PARTICIPANTS_JOIN:
              case c.b.PARTICIPANTS_LEAVE:
                return [].concat(a()(e), [Object(p.F)(t.conversation_id, t.id)]);
              case c.b.REACTION_CREATE:
                return [].concat(a()(e), [Object(f.g)(t), Object(f.c)(t), Object(p.F)(t.conversation_id, t.id)]);
              case c.b.REACTION_DELETE:
                return [].concat(a()(e), [Object(f.g)(t)]);
              case c.b.MESSAGE:
                return [].concat(a()(e), [Object(p.F)(t.conversation_id, t.id)]).filter((function (e) {
                  return e
                }));
              default:
                return e
            }
          }), [])
        },
        S = function (e) {
          return e[l.a].updates
        },
        j = function (e) {
          return S(e).isLoading
        }
    }, // [18]
    xPna: function (e, t, n) {
      "use strict";
      n.d(t, "a", (function () {
        return A
      })), n.d(t, "c", (function () {
        return S
      })), n.d(t, "i", (function () {
        return M
      })), n.d(t, "p", (function () {
        return N
      })), n.d(t, "s", (function () {
        return x
      })), n.d(t, "n", (function () {
        return P
      })), n.d(t, "m", (function () {
        return w
      })), n.d(t, "v", (function () {
        return U
      })), n.d(t, "x", (function () {
        return L
      })), n.d(t, "o", (function () {
        return B
      })), n.d(t, "r", (function () {
        return V
      })), n.d(t, "q", (function () {
        return k
      })), n.d(t, "t", (function () {
        return F
      })), n.d(t, "y", (function () {
        return G
      })), n.d(t, "u", (function () {
        return q
      })), n.d(t, "w", (function () {
        return H
      })), n.d(t, "d", (function () {
        return z
      })), n.d(t, "e", (function () {
        return Q
      })), n.d(t, "g", (function () {
        return X
      })), n.d(t, "h", (function () {
        return Z
      })), n.d(t, "f", (function () {
        return J
      })), n.d(t, "b", (function () {
        return ee
      })), n.d(t, "C", (function () {
        return te
      })), n.d(t, "D", (function () {
        return ne
      })), n.d(t, "B", (function () {
        return re
      })), n.d(t, "l", (function () {
        return ie
      })), n.d(t, "A", (function () {
        return ce
      })), n.d(t, "k", (function () {
        return de
      })), n.d(t, "z", (function () {
        return fe
      })), n.d(t, "j", (function () {
        return _e
      }));
      n("LW0h"), n("lTEL"), n("KOtZ"), n("IAdD"), n("yH/f"), n("7x/C"), n("1IsZ"), n("JtPf"), n("kYxP");
      var r, a = n("LdEA"),
        i = n.n(a),
        o = n("oEOe"),
        s = n("/kEJ"),
        c = n("uKEd"),
        d = n("kGix"),
        u = n("YeIG"),
        l = n("aWyx"),
        f = n("WVrH"),
        _ = n("xCUF"),
        p = n("AQ79"),
        v = n("lRnM"),
        m = n("t0aI"),
        b = n("P1r1"),
        O = o.a(p.b, "FETCH_INBOX"),
        E = o.a(p.b, "UPDATE_LAST_SEEN_EVENT_ID"),
        g = "inbox",
        I = "trusted",
        y = "untrusted",
        h = "untrusted_low_quality",
        A = Object.freeze({
          CLOSED: "closed",
          COLLAPSED: "collapsed",
          EXPANDED: "expanded"
        }),
        T = {
          cursors: (r = {}, r[g] = {
            fetchStatus: d.a.NONE
          }, r[I] = {
            fetchStatus: d.a.NONE
          }, r[y] = {
            fetchStatus: d.a.NONE
          }, r[h] = {
            fetchStatus: d.a.NONE
          }, r),
          lastSeenEventIds: {},
          poppedOutConversationId: null,
          drawerVisibility: A.COLLAPSED,
          drawerExperimentEnabled: !1
        };

      function S(e, t) {
        switch (void 0 === e && (e = T), t.type) {
          case O.REQUEST:
            var n, r = t.meta.timelineType;
            return Object.assign({}, e, {
              cursors: Object.assign({}, e.cursors, (n = {}, n[r] = Object.assign({}, e.cursors[r], {
                fetchStatus: d.a.LOADING
              }), n))
            });
          case O.FAILURE:
            var a, i = t.meta.timelineType;
            return Object.assign({}, e, {
              cursors: Object.assign({}, e.cursors, (a = {}, a[i] = Object.assign({}, e.cursors[i], {
                error: t.payload,
                fetchStatus: d.a.FAILED
              }), a))
            });
          case O.SUCCESS:
            var o, s = t.meta.timelineType;
            return Object.assign({}, e, {
              cursors: Object.assign({}, e.cursors, (o = {}, o[s] = Object.assign({}, e.cursors[s], {
                error: void 0,
                fetchStatus: d.a.LOADED
              }), o))
            });
          case Y:
            return Object.assign({}, e, {
              cursors: Object.assign({}, e.cursors, t.payload.cursors),
              lastSeenEventIds: j(e.lastSeenEventIds, t.payload.lastSeenEventIds)
            });
          case E.REQUEST:
            return Object.assign({}, e, {
              lastSeenEventIds: Object.assign({}, e.lastSeenEventIds, t.meta.lastSeenEventIds)
            });
          case f.a:
            return Object.assign({}, T, {
              cursors: Object.assign({}, T.cursors, {
                inbox: e.cursors.inbox
              })
            });
          case ae:
            return Object.assign({}, e, {
              poppedOutConversationId: t.conversationId,
              drawerVisibility: A.EXPANDED
            });
          case oe:
            return Object.assign({}, e, {
              drawerVisibility: t.visibility
            });
          case ue:
            return Object.assign({}, e, {
              drawerExperimentEnabled: t.enabled
            });
          default:
            return e
        }
      }

      var j = function (e, t) {
          return {
            last_seen_event_id: C(e.last_seen_event_id, t.last_seen_event_id),
            trusted_last_seen_event_id: C(e.trusted_last_seen_event_id, t.trusted_last_seen_event_id),
            untrusted_last_seen_event_id: C(e.untrusted_last_seen_event_id, t.untrusted_last_seen_event_id)
          }
        },
        C = function (e, t) {
          return Object(m.c)(e, t) ? e : t
        },
        M = function (e, t, n) {
          void 0 === n && (n = "all");
          var r = Object(b.n)(t);
          return Object(b.o)(t) ? Object.assign({}, e, {
            filter_low_quality: r,
            include_quality: n
          }) : Object.assign({}, e, {
            filter_low_quality: r
          })
        },
        N = function (e) {
          return e[p.a].inbox
        },
        D = function (e) {
          return N(e).cursors
        },
        R = function (e) {
          return N(e).lastSeenEventIds
        },
        x = function (e) {
          return N(e).poppedOutConversationId
        },
        P = function (e) {
          return N(e).drawerVisibility
        },
        w = function (e) {
          return N(e).drawerExperimentEnabled
        },
        U = function (e) {
          return D(e)[y]
        },
        L = function (e) {
          return D(e)[h]
        },
        B = function (e) {
          return function (e) {
            return D(e)[g]
          }(e).fetchStatus
        },
        V = function (e) {
          return B(e) === d.a.LOADING
        },
        k = function (e) {
          return B(e) === d.a.LOADED
        },
        F = function (e) {
          var t = Object(b.o)(e),
            n = Object.values(Object(v.B)(e)),
            r = t ? n.filter((function (e) {
              var t = e.data,
                n = t.low_quality;
              return t.trusted || !n
            })) : n,
            a = R(e).last_seen_event_id;
          return K(e, r, a)
        },
        G = function (e) {
          var t = Object(b.o)(e),
            n = R(e).untrusted_last_seen_event_id,
            r = Object.values(Object(v.B)(e)),
            a = t ? r.filter((function (e) {
              var t = e.data,
                n = t.trusted,
                r = t.low_quality;
              return !n && !r
            })) : r.filter((function (e) {
              return !e.data.trusted
            }));
          return K(e, a, n)
        },
        q = function (e) {
          return Object.values(Object(v.B)(e)).filter((function (e) {
            return !e.data.trusted
          })).length
        },
        H = function (e) {
          return Object.values(Object(v.B)(e)).filter((function (e) {
            var t = e.data,
              n = t.trusted,
              r = t.low_quality;
            return !n && r
          })).length
        },
        K = function (e, t, n) {
          return n ? t.reduce((function (t, r) {
            var a = r.data.conversation_id,
              i = Object(v.A)(e, a),
              o = Object(v.z)(e, a);
            return i && Object(m.b)(i, n) && !o ? t + 1 : t
          }), 0) : 0
        },
        z = function (e) {
          return void 0 === e && (e = {}),
            function (t, n, r) {
              var a = r.api,
                i = M(e, n());
              return o.b(t, {
                params: i,
                request: a.DirectMessages.fetchUserInbox
              })({
                actionTypes: O,
                context: "FETCH_DM_INBOX",
                meta: {
                  timelineType: g
                }
              }, (function (e) {
                if (e) {
                  var entities = e.entities;
                  var entries = entities.entries;
                  var users = entities.users;
                  var tweets = entities.tweets;
                  var cards = entities.cards;
                  return ee(Object.assign({}, e.result.inbox_initial_state, {
                    entries: entries,
                    users: users,
                    tweets: tweets,
                    cards: cards
                  }))
                }
              }))
            }
        },
        Q = function (e) {
          return void 0 === e && (e = {}),
            function (t, n) {
              var r = n(),
                a = B(r);
              return a !== d.a.LOADED && a !== d.a.LOADING ? t(z(e)) : Promise.resolve()
            }
        },
        W = function (e, t) {
          return function (n, r, a) {
            var i = a.api,
              s = D(r())[e],
              c = s.status,
              d = s.min_entry_id,
              u = e === h ? y : e,
              f = Object.assign({}, t, {
                max_id: d,
                timelineType: u
              });
            if (c !== l.c.HAS_MORE) return Promise.resolve();
            return o.b(n, {
              params: f,
              request: i.DirectMessages.fetchInboxHistory
            })({
              actionTypes: O,
              context: "FETCH_DM_INBOX_HISTORY",
              meta: {
                timelineType: e
              }
            }, (function (t) {
              if (t) {
                var n, r = t.entities,
                  a = r.entries,
                  i = r.users,
                  o = r.tweets,
                  s = r.cards,
                  c = t.result.inbox_timeline;
                return ee({
                  conversations: c.conversations,
                  inbox_timelines: (n = {}, n[e] = c, n),
                  entries: a,
                  users: i,
                  tweets: o,
                  cards: s
                })
              }
            }))
          }
        },
        X = function (e) {
          return function (t, n) {
            var r = M(e, n(), "high");
            return t(W(y, r))
          }
        },
        Z = function (e) {
          return function (t, n) {
            var r = M(e, n(), "low");
            return t(W(h, r))
          }
        },
        J = function (e) {
          return function (t, n) {
            var r = M(e, n());
            return t(W(I, r))
          }
        },
        Y = Object(p.c)("UPDATE_INBOX"),
        $ = function (e) {
          return {
            payload: {
              cursors: e.inbox_timelines,
              lastSeenEventIds: i()(e, ["inbox_timelines"])
            },
            type: Y
          }
        },
        ee = function (e) {
          void 0 === e && (e = {});
          var t = e,
            n = t.conversations,
            r = t.entries,
            a = t.users,
            o = t.tweets,
            d = t.cards,
            l = t.cursor,
            f = i()(t, ["conversations", "entries", "users", "tweets", "cards", "cursor"]);
          return [Object(s.c)({
            cards: d,
            tweets: o,
            users: a
          }), !Object(u.a)(n) && Object(v.c)(n), !Object(u.a)(r) && Object(c.a)(r), !Object(u.a)(l) && Object(_.f)(l), !Object(u.a)(f) && $(f)].filter((function (e) {
            return e
          }))
        },
        te = function () {
          return function (e) {
            return e(re({
              withTrusted: !0
            }))
          }
        },
        ne = function () {
          return function (e) {
            return e(re({
              withUntrusted: !0
            }))
          }
        },
        re = function (e) {
          var t = void 0 === e ? {} : e,
            n = t.withTrusted,
            r = t.withUntrusted;
          return function (e, t, a) {
            var i = a.api,
              s = t(),
              c = Object(v.B)(s),
              d = R(s),
              u = d.last_seen_event_id,
              l = d.trusted_last_seen_event_id,
              f = d.untrusted_last_seen_event_id,
              _ = Object.values(c).reduce((function (e, t) {
                var n = t.data,
                  r = n.sort_event_id,
                  a = n.trusted;
                return e.last_seen_event_id = C(e.last_seen_event_id, r), e.trusted_last_seen_event_id = a ? C(e.trusted_last_seen_event_id, r) : e.trusted_last_seen_event_id, e.untrusted_last_seen_event_id = a ? e.untrusted_last_seen_event_id : C(e.untrusted_last_seen_event_id, r), e
              }), Object.assign({}, d));
            return Object(m.b)(_.last_seen_event_id, u) || n && Object(m.b)(_.trusted_last_seen_event_id, l) || r && Object(m.b)(_.untrusted_last_seen_event_id, f) ? (n || delete _.trusted_last_seen_event_id, r || delete _.untrusted_last_seen_event_id, o.c(e, {
              params: _,
              request: i.DirectMessages.updateLastSeenEventId
            })({
              actionTypes: E,
              context: "APP_DM_UPDATE_LAST_SEEN",
              meta: {
                lastSeenEventIds: _
              }
            })) : Promise.resolve()
          }
        },
        ae = Object(p.c)("POP_OUT_CONVERSATION"),
        ie = function (e) {
          return function (t) {
            return t({
              conversationId: e,
              type: ae
            })
          }
        },
        oe = Object(p.c)("SET_DRAWER_VISIBILITY"),
        se = function (e) {
          return {
            visibility: e,
            type: oe
          }
        },
        ce = function (e) {
          return function (t, n, r) {
            return r.userPersistence.set("rweb.dmDrawerVisibility", {
              visibility: e
            }), e === A.CLOSED && t({
              type: ae
            }), t(se(e))
          }
        },
        de = function () {
          return function (e, t, n) {
            return n.userPersistence.get("rweb.dmDrawerVisibility").then((function (t) {
              t && e(se(t.visibility))
            }))
          }
        },
        ue = Object(p.c)("SET_DRAWER_EXPERIMENT_ENABLED"),
        le = function (e) {
          return {
            enabled: e,
            type: ue
          }
        },
        fe = function (e) {
          return function (t, n, r) {
            return r.userPersistence.set("rweb.dmQuickAccessEnabled", {
              enabled: e
            }), t(le(e))
          }
        },
        _e = function () {
          return function (e, t, n) {
            return n.userPersistence.get("rweb.dmQuickAccessEnabled").then((function (t) {
              t && e(le(t.enabled))
            }))
          }
        }
    } // [19]
  }
]);

//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/web/bundle.ComposeMedia.75dafa54.js.map
