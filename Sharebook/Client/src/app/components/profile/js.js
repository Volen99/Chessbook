(window.webpackJsonp = window.webpackJsonp || []).push([[82], {
  "0JWC": function(e, t, r) {
    "use strict";
    r("kYxP");
    var s = r("KEM+")
      , n = r.n(s)
      , a = r("PiaM")
      , i = r("ERkP")
      , o = r("k49u")
      , l = r("oEGd");
    const c = {
      fetchUser: r("G6rE").e.fetchOne
    };
    var d = Object(l.b)(c)
      , h = r("QIgh")
      , u = r("SrtL")
      , m = r("FIs5")
      , p = r("oQhu")
      , f = r("EUHl")
      , _ = r("yoO3")
      , b = r("fTQJ")
      , E = r("tocL");
    class y extends i.PureComponent {
      constructor(e) {
        super(e),
          n()(this, "_getApiErrorHandlerMap", ()=>{
              const {fetchUser: e, userId: t} = this.props;
              return {
                [o.a.NotAuthorizedToViewUser]: {
                  customAction: ()=>e(t)
                }
              }
            }
          ),
          n()(this, "_renderEmptyState", ()=>{
              const {timelineEmptyMessageFormatter: e, timelineEmptyHeaderFormatter: t, timelineEmptyStateButtonLabel: r, timelineEmptyStateButtonLink: s, screenName: n} = this.props;
              return i.createElement(m.a, {
                buttonLink: s,
                buttonText: r,
                header: t && t({
                  screenName: n
                }),
                message: e && e({
                  screenName: n
                })
              })
            }
          ),
          n()(this, "_reorderPinnedTweets", Object(p.a)(e=>{
              let t = -1;
              if (e.forEach((e,r)=>{
                  a.f(e) && e.content.socialContext && e.content.socialContext.generalContext && "string" == typeof e.content.socialContext.generalContext.contextType && e.content.socialContext.generalContext.contextType === E.a.Pin && (t = r)
                }
              ),
              t > -1) {
                const r = [e[t], ...e];
                return r.splice(t + 1, 1),
                  r
              }
              return e
            }
          ));
        const {displayBlocked: t, showWithheldBannerOnMyTweets: r} = e;
        this._entryConfiguration = Object(h.a)({
          displayBlocked: t,
          showWithheldBannerOnMyTweets: r
        })
      }
      UNSAFE_componentWillUpdate(e) {
        e.displayBlocked !== this.props.displayBlocked && (this._entryConfiguration = Object(h.a)({
          displayBlocked: e.displayBlocked,
          showWithheldBannerOnMyTweets: e.showWithheldBannerOnMyTweets
        }))
      }
      render() {
        const {titleFormatter: e, module: t, timelineTitleFormatter: r, loadingLabelFormatter: s, fetchOptions: n, onEntriesUpdate: a, screenName: o, fullName: l} = this.props
          , c = e({
          screenName: o,
          fullName: l
        })
          , d = r({
          fullName: l
        })
          , h = s({
          screenName: o
        });
        return i.createElement(_.a, null, i.createElement(u.a, {
          title: c
        }), i.createElement(b.a, {
          apiErrorHandlerMap: this._getApiErrorHandlerMap(),
          entryConfiguration: this._entryConfiguration,
          fetchOptions: n,
          loadingAccessibilityLabel: h,
          module: t,
          newTweetsPillMode: f.a.CLIENT,
          onEntriesUpdate: a,
          preprocessEntryList: this._reorderPinnedTweets,
          refreshControl: null,
          renderEmptyState: this._renderEmptyState,
          title: d
        }))
      }
    }
    n()(y, "defaultProps", {
      displayBlocked: !1,
      fetchOptions: {},
      showWithheldBannerOnMyTweets: !1
    });
    t.a = d(y)
  },
  "7fPw": function(e, t, r) {
    "use strict";
    r("IAdD");
    var s = r("wrlS")
      , n = r("WpDa")
      , a = r("ZNT5");
    t.a = e=>s.b.isTrue("responsive_web_graphql_likes_timeline") ? o(e) : i(e);
    const i = e=>Object(a.a)({
      timelineId: "favorites-" + e,
      getEndpoint: e=>e.URT.fetchLikes,
      getEndpointParams: t=>Object.assign({
        userId: e
      }, t),
      context: "FETCH_LIKES_TIMELINE",
      perfKey: "likes"
    })
      , o = e=>Object(a.a)({
      timelineId: "favorites-graphql-" + e,
      getEndpoint: e=>e.Likes.fetchLikesGraphQL,
      getEndpointParams: t=>Object.assign({
        userId: e
      }, t),
      formatResponse: n.a,
      context: "FETCH_LIKES_TIMELINE",
      perfKey: "likes-GraphQL"
    })
  },
  "8KtR": function(e, t, r) {
    "use strict";
    r.r(t);
    r("kYxP");
    var s = r("KEM+")
      , n = r.n(s)
      , a = r("ERkP")
      , i = r("v6aA")
      , o = r("I7xG")
      , l = r("3XMw")
      , c = r.n(l)
      , d = r("txMZ")
      , h = r("0JWC")
      , u = r("SRyb");
    const m = c.a.c6ea308b
      , p = c.a.e021c003
      , f = c.a.ccc9153f
      , _ = c.a.dc1f8991
      , b = ()=>c.a.e4f9514c
      , E = ()=>c.a.a9efb44c
      , y = ()=>c.a.e63db400
      , g = c.a.j0a37206
      , w = c.a.cc01c9b5;
    class I extends a.Component {
      constructor(...e) {
        super(...e),
          n()(this, "_getModule", Object(o.a)(this, e=>e.userId, e=>e.withReplies, (e,t)=>Object(u.a)(this.context.featureSwitches, e, t)))
      }
      render() {
        const {displayBlocked: e, fullName: t, onEntriesUpdate: r, screenName: s, userId: n, withReplies: i} = this.props
          , o = this._getModule()
          , l = this.context.loggedInUserId === n
          , c = l ? y : b
          , u = l ? E : _
          , I = l ? g : void 0;
        return a.createElement(d.a, {
          scribeSection: i ? "tweets_and_replies" : "tweets",
          userId: n
        }, ({scribeNamespace: l})=>a.createElement(h.a, {
          displayBlocked: e,
          fullName: t,
          loadingLabelFormatter: f,
          module: o,
          onEntriesUpdate: r,
          screenName: s,
          scribeNamespace: l,
          timelineEmptyHeaderFormatter: u,
          timelineEmptyMessageFormatter: c,
          timelineEmptyStateButtonLabel: I,
          timelineEmptyStateButtonLink: "/compose/tweet",
          timelineTitleFormatter: w,
          titleFormatter: i ? p : m,
          userId: n
        }))
      }
      _isLoggedIn() {
        return !!this.context.loggedInUserId
      }
    }
    n()(I, "contextType", i.a),
      n()(I, "defaultProps", {
        displayBlocked: !1,
        withReplies: !1
      }),
      t.default = I
  },
  ivpD: function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "UserLikesScreen", (function() {
          return y
        }
      ));
    var s = r("KEM+")
      , n = r.n(s)
      , a = r("ERkP")
      , i = r("v6aA")
      , o = r("3XMw")
      , l = r.n(o)
      , c = r("txMZ")
      , d = r("0JWC")
      , h = r("7fPw");
    const u = l.a.d7c03c5d
      , m = l.a.a64da953
      , p = l.a.a2f22d2c
      , f = ()=>l.a.g15d5e9b
      , _ = ()=>l.a.bb0e41bc
      , b = ()=>l.a.bf15f5b6
      , E = l.a.f11f6624;
    class y extends a.Component {
      render() {
        const {displayBlocked: e, fullName: t, screenName: r, userId: s} = this.props
          , n = this.context.loggedInUserId === s
          , i = n ? b : f
          , o = n ? _ : p;
        return a.createElement(c.a, {
          scribeSection: "likes",
          userId: s
        }, ({scribeNamespace: n})=>a.createElement(d.a, {
          displayBlocked: e,
          fullName: t,
          loadingLabelFormatter: m,
          module: Object(h.a)(s),
          screenName: r,
          scribeNamespace: n,
          timelineEmptyHeaderFormatter: o,
          timelineEmptyMessageFormatter: i,
          timelineTitleFormatter: E,
          titleFormatter: u,
          userId: s
        }))
      }
    }
    n()(y, "contextType", i.a),
      n()(y, "defaultProps", {
        displayBlocked: !1
      }),
      t.default = y
  },
  "ll/Q": function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "UserProfileScreenContainer", (function() {
          return ar
        }
      ));
    var s = r("97Jx")
      , n = r.n(s)
      , a = r("ERkP")
      , i = (r("x4t0"),
      r("WNMA"),
      r("P1r1"))
      , o = r("oEGd")
      , l = r("0KEI")
      , c = r("hqKg")
      , d = r("zh9S")
      , h = r("QK5w")
      , u = r("G6rE");
    const m = (e,t)=>{
      const {location: r, match: s} = t;
      return s && s.params && s.params.screenName ? s.params.screenName : r && r.query && r.query.screen_name && "string" == typeof r.query.screen_name ? r.query.screen_name : ""
    }
      , p = (e,t)=>u.e.selectByScreenName(e, m(0, t))
      , f = Object(u.g)([u.a])
      , _ = Object(c.createSelector)(h.a, i.l, (e,t)=>f(e, m(0, t)), (e,t)=>t.location.pathname.includes("/intent/"), (e,t)=>u.e.selectIsUserNotFound(e, m(0, t)), (e,t)=>{
        const r = p(e, t);
        return !!r && u.e.selectIsLoading(e, r.id_str)
      }
      , (e,t)=>u.e.selectIsUserSuspended(e, m(0, t)), (e,t)=>u.e.selectIsUserWithheld(e, m(0, t)), (e,t)=>{
        const {location: r} = t
          , {promotedTweetState: s} = r && r.state || {}
          , n = p(e, t);
        return s || n && n.promoted_content
      }
      , m, p, (e,t)=>{
        const r = p(e, t);
        return r && r.profile_interstitial_type ? r.profile_interstitial_type : null
      }
      , (e,t,r,s,n,a,i,o,l,c,d,h)=>({
        displaySensitiveMedia: t,
        fetchStatus: r,
        isInitialScreen: !e,
        isIntentRoute: s,
        isNotFound: n,
        isRefreshing: a,
        isSuspended: i,
        isWithheld: o,
        promotedContent: l,
        screenName: c,
        user: d,
        userProfileInterstitialType: h
      }))
      , b = {
      createLocalApiErrorHandler: Object(l.d)("USER_PROFILE_SCREEN"),
      fetchOneUser: u.e.fetchOne,
      fetchOneByScreenNameWithExtraFieldsIfNeeded: u.e.createFetchOneByScreenNameWithExtraFieldsIfNeeded([u.a, u.b, u.c, u.d]),
      fetchSettingsIfNeeded: i.e,
      scribeAction: d.c
    };
    var E = Object(o.g)(_, b)
      , y = r("txMZ")
      , g = (r("jQ/y"),
      r("IAdD"),
      r("JtPf"),
      r("kYxP"),
      r("KEM+"))
      , w = r.n(g)
      , I = r("aeN7")
      , S = r("s4rk")
      , P = r("zI2C")
      , C = r("v6aA")
      , k = r("cmwl")
      , O = r("6/RC")
      , x = r("es0u")
      , N = r("tOzk")
      , T = r("I/ms")
      , F = r("1YZw")
      , B = r("rxPX");
    var U = Object(B.a)().propsFromActions(()=>({
      addToast: F.b,
      createLocalApiErrorHandler: Object(l.d)("USER_PROFILE_HEADER"),
      scribeAction: d.c,
      unmute: u.e.unmute
    }))
      , L = r("7JQg")
      , v = r("3nOA")
      , R = r("7wqI")
      , M = r("I57f")
      , A = r("RgK2")
      , j = r.n(A)
      , D = r("uIZp")
      , W = r("3XMw")
      , H = r.n(W)
      , $ = r("W27K")
      , G = r("vYiB")
      , V = r("zb92")
      , q = Object(V.a)({
      loader: ()=>r.e(144).then(r.bind(null, "Gffe"))
    })
      , K = r("Je1/")
      , Q = r("Jkc4")
      , z = r("mkhj")
      , J = r("RCZO")
      , Y = r("EJJl")
      , X = r("/yvb")
      , Z = r("FRoe")
      , ee = r("vMjK");
    const te = H.a.h63a5c3b
      , re = a.createElement(Z.a, null);
    class se extends a.PureComponent {
      constructor(...e) {
        super(...e),
          w()(this, "_renderUserMenu", e=>{
              const {promotedContent: t, user: r} = this.props;
              return a.createElement(ee.b, {
                onClose: e,
                promotedContent: t,
                user: r
              })
            }
          )
      }
      render() {
        const {buttonStyle: e} = this.props;
        return a.createElement(X.a, {
          accessibilityLabel: te,
          icon: re,
          renderMenu: this._renderUserMenu,
          style: e,
          testID: z.a.userActions,
          type: "secondary"
        })
      }
    }
    var ne = r("WWyu")
      , ae = r("LhSm")
      , ie = r("MWbm")
      , oe = r("TIdA")
      , le = r("cHvH")
      , ce = r("oSwX")
      , de = r("rHpw")
      , he = r("n4Eu")
      , ue = r("cm6r")
      , me = r("A91F")
      , pe = r("9Xij")
      , fe = r("t62R")
      , _e = r("jV+4")
      , be = r("ir4X")
      , Ee = r("wCd/")
      , ye = r("eb3s")
      , ge = r("P2xQ")
      , we = r("SOvA")
      , Ie = r("KrGU")
      , Se = r("I/9y")
      , Pe = r("YUdS")
      , Ce = r("EjKN")
      , ke = r("mN6z")
      , Oe = r("YeIG");
    const xe = H.a.g7088266
      , Ne = H.a.gd7acb84
      , Te = H.a.b7636014
      , Fe = H.a.cef4e8cf
      , Be = H.a.ec294e62
      , Ue = H.a.df422dfe
      , Le = H.a.a1ea2f12
      , ve = H.a.g8191e77
      , Re = a.createElement(we.a, null)
      , Me = oe.a.createLayoutCache()
      , Ae = oe.a.createLayoutCache();
    class je extends a.Component {
      constructor(e, t) {
        super(e, t),
          w()(this, "_isBirthdayToday", e=>{
              const {day: t, month: r} = e;
              if (!t || !r)
                return;
              const s = new Date;
              return r === s.getMonth() + 1 && t === s.getDate()
            }
          ),
          w()(this, "_setBalloonsRef", e=>{
              this._balloonsRef = e
            }
          ),
          w()(this, "_handleLaunchBalloons", ()=>{
              this._balloonsRef && this._balloonsRef.launch()
            }
          ),
          w()(this, "_handleRemoveClusterFollow", ()=>{
              this.setState({
                shouldShowClusterFollow: !1
              })
            }
          ),
          w()(this, "_handleMessageButtonPress", ()=>{
              const {scribeAction: e, scribeNamespace: t} = this.props;
              e(Object.assign({}, t, {
                element: "message",
                action: "click"
              })),
                this._messageUser()
            }
          ),
          w()(this, "_handleUnmute", ()=>{
              this.setState({
                showUnmuteConfirmation: !0
              })
            }
          ),
          w()(this, "_handleUnmuteCancel", ()=>{
              this.setState({
                showUnmuteConfirmation: !1
              })
            }
          ),
          w()(this, "_handleUnmuteConfirm", ()=>{
              const {addToast: e, createLocalApiErrorHandler: t, unmute: r, user: s} = this.props;
              this.setState({
                showUnmuteConfirmation: !1
              }),
                r(s.id_str).then(()=>e({
                  text: Object(ge.d)(s.screen_name)
                }), t({
                  showToast: !0
                }))
            }
          ),
          this.state = {
            shouldShowClusterFollow: !1,
            showUnmuteConfirmation: !1
          }
      }
      shouldComponentUpdate(e, t) {
        return !Object(ke.a)(t, this.state) || !Object(ke.a)(e, this.props)
      }
      componentDidUpdate(e) {
        !0 === this.props.user.following && !1 === e.user.following && this.setState({
          shouldShowClusterFollow: !0
        }),
        this.props.user.id_str !== e.user.id_str && this.setState({
          shouldShowClusterFollow: !1
        })
      }
      render() {
        const {isWithheld: e, loggedInUserId: t, user: r} = this.props
          , s = !this._isOwnProfile() && (r.blocking || r.blocked_by || e)
          , n = !this._isOwnProfile() && (r.blocked_by || e)
          , i = !t || this._isOwnProfile() || r.blocking || r.blocked_by || e || r.protected && !r.following;
        return a.createElement(ie.a, null, this._renderBanner(r), a.createElement(ie.a, {
          style: [T.a.content, De.content, s && T.a.withheld]
        }, a.createElement(ie.a, {
          style: De.avatarAndButtons
        }, this._renderAvatar(), this._renderButtons()), this._renderNames(), s ? null : this._renderDetails(), n ? null : this._renderStats(), i ? null : a.createElement(ie.a, {
          style: De.marginTopXSmall
        }, a.createElement($.a, {
          userId: r.id_str,
          userScreenName: r.screen_name
        })), this._renderMute()), this.state.shouldShowClusterFollow ? this._renderProfileClusterFollow() : null)
      }
      _isOwnProfile() {
        const {loggedInUserId: e, user: {id_str: t}} = this.props;
        return e === t
      }
      _renderAvatar() {
        const {isWithheld: e, user: t} = this.props
          , r = !this._isOwnProfile() && e
          , s = r || !t.profile_image_url_https ? void 0 : t.profile_image_url_https;
        return a.createElement(le.a, null, ({windowWidth: e})=>a.createElement(ce.default, {
          imageLayoutCache: Me,
          link: r ? void 0 : {
            pathname: `/${t.screen_name}/photo`
          },
          size: "custom",
          style: [T.a.avatar, e >= de.a.theme.breakpoints.medium ? T.a.wideAvatar : T.a.narrowAvatar],
          uri: s
        }))
      }
      _renderBanner(e) {
        const {isWithheld: t} = this.props
          , r = !this._isOwnProfile() && t
          , s = e.profile_banner_extensions_media_color && e.profile_banner_extensions_media_color.palette
          , n = s && he.a.get(s)
          , i = n ? Object(J.g)(n) : de.a.theme.colors.lightGray;
        return !r && e.profile_banner_url ? a.createElement(ue.a, {
          importantForAccessibility: "no-hide-descendants",
          link: `/${e.screen_name}/header_photo`
        }, a.createElement(oe.a, {
          accessibilityLabel: "",
          aspectMode: me.a.exact(de.a.theme.aspectRatios.profileBanner),
          backgroundColor: i,
          image: e.profile_banner_url,
          layoutCache: Ae
        })) : a.createElement(ie.a, {
          style: T.a.banner
        }, a.createElement(pe.a, {
          ratio: de.a.theme.aspectRatios.profileBanner,
          style: [{
            backgroundColor: i
          }]
        }))
      }
      _renderButtons() {
        const {isWithheld: e, loggedInUserId: t, onFollowButtonOffscreen: r, promotedContent: s, user: n} = this.props
          , i = n.blocked_by
          , o = n.blocking
          , l = this._isOwnProfile()
          , c = e && !l
          , d = n.can_dm && t && !o && !i && !c
          , h = t && n && !l && !c
          , u = n.following && t && !o && !i && !e
          , m = this._shouldLaunchProfileOcfFlow();
        return a.createElement(ie.a, {
          style: De.buttons
        }, t && l ? a.createElement(X.a, {
          link: m ? "/i/flow/setup_profile" : "/settings/profile",
          style: De.lastButton,
          type: "secondary"
        }, m ? Ne : xe) : null, h && a.createElement(se, {
          buttonStyle: De.button,
          promotedContent: s,
          user: n
        }), !l && d && a.createElement(X.a, {
          accessibilityLabel: Te,
          icon: Re,
          onPress: this._handleMessageButtonPress,
          style: De.button,
          testID: z.a.sendDMFromProfile,
          type: "secondary"
        }), !l && u && a.createElement(M.a, {
          allowPromptForPush: !0,
          isFollowing: n.notifications,
          style: De.button,
          userId: n.id_str
        }), !l && !i && !c && a.createElement(G.a, {
          onOffscreenChange: r
        }, a.createElement(D.a, {
          promotedContent: s,
          style: De.lastButton,
          userId: n.id_str
        })))
      }
      _renderDetails() {
        var e, t, r;
        const {user: s} = this.props
          , n = null == (e = s.entities) || null == (t = e.url) || null == (r = t.urls) ? void 0 : r[0]
          , i = s.birthdate;
        return a.createElement(a.Fragment, null, s.description ? a.createElement(ie.a, {
          style: De.description
        }, a.createElement(Y.a, {
          description: s.description,
          disableTranslation: !s.is_profile_translatable,
          entities: s.entities,
          testID: z.a.userDescription,
          userId: s.id_str,
          withheldDescription: s.withheld_description,
          withheldEntities: s.withheld_entities
        })) : null, a.createElement(ie.a, {
          style: De.details
        }, a.createElement(fe.c, {
          style: De.detailsText,
          testID: z.a.profileHeaderItems
        }, s.location ? a.createElement(K.a, {
          Icon: Ie.a
        }, a.createElement(fe.c, null, s.location)) : null, n && n.url ? a.createElement(K.a, {
          Icon: Se.a,
          link: {
            pathname: n.url,
            external: !0
          }
        }, n.display_url || n.url) : null, !i || Object(Oe.a)(i) || i.visibility && "self" === i.visibility.toLowerCase() && i.year_visibility && "self" === i.year_visibility.toLowerCase() ? null : this._isBirthdayToday(i) ? a.createElement(a.Fragment, null, a.createElement(K.a, {
          Icon: Pe.a,
          onPress: this._handleLaunchBalloons
        }, this._isOwnProfile() ? Le : ve), a.createElement(N.a, {
          setRef: this._setBalloonsRef
        })) : a.createElement(K.a, {
          Icon: Ce.a
        }, a.createElement(ne.a, {
          birthdate: i,
          withBornPrefixText: !0
        })), a.createElement(ae.a, {
          joinDate: s.created_at
        }))))
      }
      _renderNames() {
        const {isWithheld: e, user: t} = this.props
          , r = e ? j.a : {
          isProtected: !!t.protected,
          isVerified: !!t.verified,
          translatorType: t.translator_type
        }
          , s = t.name && t.screen_name && !(e && !this._isOwnProfile())
          , i = s ? t.name : "@" + t.screen_name;
        return a.createElement(ie.a, {
          style: T.a.names
        }, a.createElement(_e.a, n()({}, r, {
          badgeContext: "account",
          name: i,
          nameSize: "large",
          screenName: s ? t.screen_name : void 0,
          weight: "heavy",
          withFollowsYou: t.followed_by && !e,
          withNameWrap: !0,
          withStackedLayout: !0
        })), t.highlightedLabel ? a.createElement(be.a, {
          label: t.highlightedLabel
        }) : null)
      }
      _renderStats() {
        const e = this.props.user
          , {followers_count: t, friends_count: r, id_str: s, screen_name: n} = e
          , {loggedInUserId: i} = this.context
          , o = i === s;
        return a.createElement(Q.a, null, s=>a.createElement(Ee.a, {
          followersCount: t,
          friendsCount: r,
          onPress: s(),
          screenName: n,
          withLink: Object(R.b)({
            isOwnProfile: o,
            user: e
          })
        }))
      }
      _renderMute() {
        const {user: e} = this.props
          , {screen_name: t} = e;
        return e.muting ? a.createElement(a.Fragment, null, a.createElement(fe.c, {
          color: "deepGray",
          style: De.mute
        }, Ue, " ", a.createElement(fe.c, {
          accessibilityRole: "button",
          color: "link",
          onPress: this._handleUnmute,
          style: {
            cursor: "pointer"
          },
          testID: z.a.unmuteLink,
          withInteractiveStyling: !0
        }, ge.h)), this.state.showUnmuteConfirmation ? a.createElement(ye.a, {
          confirmButtonLabel: ge.h,
          headline: Fe({
            screenName: t
          }),
          onCancel: this._handleUnmuteCancel,
          onConfirm: this._handleUnmuteConfirm,
          text: Be
        }) : null) : null
      }
      _renderProfileClusterFollow() {
        const {user: e} = this.props;
        return a.createElement(q, {
          onRemoveClusterFollow: this._handleRemoveClusterFollow,
          userId: e.id_str
        })
      }
      _shouldLaunchProfileOcfFlow() {
        const {user: e} = this.props;
        return e.default_profile_image && !e.description && !e.profile_banner_url
      }
      _messageUser() {
        const {history: e, loggedInUserId: t, user: {id_str: r}} = this.props;
        t && e.push("/messages/" + Object(v.a)(r, t))
      }
    }
    w()(je, "contextType", C.a);
    const De = de.a.create(e=>({
      avatarAndButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap"
      },
      buttons: {
        maxWidth: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexWrap: "wrap"
      },
      button: {
        marginEnd: e.spaces.xSmall,
        marginBottom: e.spaces.xSmall
      },
      lastButton: {
        marginBottom: e.spaces.xSmall
      },
      content: {
        marginBottom: e.spaces.small
      },
      icon: {
        color: e.colors.deepGray,
        marginEnd: e.spaces.xxSmall
      },
      url: {
        lineHeight: "1.5"
      },
      description: {
        display: "block",
        marginBottom: e.spaces.xSmall
      },
      details: {
        display: "block",
        marginBottom: e.spaces.xSmall
      },
      marginTopXSmall: {
        marginTop: e.spaces.xSmall
      },
      mute: {
        marginVertical: e.spaces.xSmall
      },
      detailsText: {
        lineHeight: e.spaces.xSmall
      }
    }));
    var We = Object(L.c)({
      page: "profile",
      section: "header"
    })(U(je))
      , He = r("8UdT")
      , $e = r("dwig")
      , Ge = r("wrlS")
      , Ve = r("GOQE")
      , qe = r("kGix")
      , Ke = r("v//M")
      , Qe = r("0+qk")
      , ze = r("SrIh")
      , Je = r("ipry");
    const Ye = H.a.cb339f26
      , Xe = H.a.hf06085d
      , Ze = H.a.aa959f36
      , et = H.a.hf06085d
      , tt = H.a.jf604336
      , rt = H.a.c9bfda48
      , st = H.a.jf604336
      , nt = H.a.b9a9cbdb
      , at = H.a.aa959f36
      , it = H.a.i622ef86
      , ot = {
      default: Ye,
      fake_account: Ze,
      offensive_profile_content: tt,
      sensitive_media: st,
      timeout: at
    }
      , lt = {
      default: Xe,
      fake_account: et,
      offensive_profile_content: rt,
      sensitive_media: nt,
      timeout: it
    };
    var ct = r("iFPY")
      , dt = r("oQhu")
      , ht = r("rJoH")
      , ut = r("Y6L+")
      , mt = r("jS2K")
      , pt = r("IG4P");
    class ft extends a.Component {
      shouldComponentUpdate(e) {
        return !Object(ke.a)(e, this.props)
      }
      render() {
        const {shouldDisplayUserActionSheet: e, fullUser: t} = this.props;
        return a.createElement(ie.a, null, this._renderBanner(), a.createElement(ie.a, {
          style: [T.a.content, T.a.withheld]
        }, a.createElement(ie.a, {
          style: T.a.avatarAndButton
        }, this._renderAvatar(), e && t && a.createElement(se, {
          buttonStyle: T.a.menuSheetButton,
          user: t
        })), this._renderNames()))
      }
      _renderAvatar() {
        const {avatarAccessibilityLabel: e} = this.props;
        return a.createElement(le.a, null, ({windowWidth: t})=>a.createElement(ie.a, {
          accessibilityState: {
            hidden: !0
          },
          style: [T.a.avatar, t >= de.a.theme.breakpoints.medium ? T.a.wideAvatar : T.a.narrowAvatar]
        }, a.createElement(ce.default, {
          accessibilityLabel: e,
          size: "custom"
        })))
      }
      _renderBanner() {
        return a.createElement(ie.a, {
          style: T.a.banner
        }, a.createElement(pe.a, {
          ratio: de.a.theme.aspectRatios.profileBanner
        }))
      }
      _renderNames() {
        const {fullUser: e, restrictedUser: t} = this.props
          , r = e || t
          , s = r.name && r.screen_name
          , n = s ? r.name : "@" + r.screen_name;
        return a.createElement(ie.a, {
          style: T.a.names
        }, a.createElement(_e.a, {
          name: n,
          nameSize: "large",
          screenName: s ? r.screen_name : void 0,
          withStackedLayout: !0
        }))
      }
    }
    var _t = r("wytG")
      , bt = r("VS6U")
      , Et = r("G8HL")
      , yt = r("Qayx")
      , gt = r("mw9i")
      , wt = r("zfvc")
      , It = r("FIs5")
      , St = r("Q0VY")
      , Pt = r("FiRh")
      , Ct = r("0yYu")
      , kt = r("k/OQ")
      , Ot = r("zCf4");
    const xt = H.a.h1658541
      , Nt = H.a.b5447710
      , Tt = H.a.fa98627a
      , Ft = H.a.a2811f96
      , Bt = H.a.c6ea308b
      , Ut = H.a.d67658c0
      , Lt = H.a.ccc9153f
      , vt = H.a.bab1f8b0
      , Rt = H.a.a52b03a5
      , Mt = H.a.add55c97
      , At = H.a.d7b8eba9
      , jt = H.a.ica87fde
      , Dt = H.a.e79ed125
      , Wt = H.a.g8475f82
      , Ht = H.a.c9a1cb5d
      , $t = H.a.e7b201dd
      , Gt = H.a.d09e12c4
      , Vt = H.a.gbf342a4
      , qt = H.a.eeab4adf
      , Kt = H.a.d834ab9c
      , Qt = {
      section: "profile_interstitial"
    }
      , zt = Object(_t.a)(()=>Promise.resolve().then(r.bind(null, "8KtR")))
      , Jt = Object(_t.a)(()=>Promise.resolve().then(r.bind(null, "ivpD")))
      , Yt = Object(_t.a)(()=>Promise.resolve().then(r.bind(null, "ylAD")))
      , Xt = "likes"
      , Zt = "media"
      , er = "with_replies"
      , tr = Object(dt.a)(e=>()=>({
      defaultText: e
    }));
    class rr extends a.Component {
      constructor(e, t) {
        super(e, t),
          w()(this, "_renderContainer", ()=>{
              const {fetchStatus: e, isRefreshing: t, isSuspended: r, screenName: s, isNotFound: n} = this.props
                , i = r || n;
              return a.createElement(pt.a, {
                isRefreshing: t,
                onRefresh: this._handlePullToRefresh
              }, a.createElement(ie.a, {
                style: sr.containerGrow
              }, a.createElement(gt.a, null, a.createElement(Ke.a, {
                accessibilityLabel: Lt({
                  screenName: s
                }),
                fetchStatus: i ? qe.a.LOADED : e,
                onRequestRetry: this._handleRequestRetry,
                render: this._renderHeaderAndContent
              }))))
            }
          ),
          w()(this, "_renderHeaderAndContent", ()=>a.createElement(a.Fragment, null, this._renderHeader(), this._renderContent())),
          w()(this, "_renderContent", ()=>{
              const {isSuspended: e, isWithheld: t, user: r, isNotFound: s} = this.props
                , {showBlockedTweets: n} = this.state
                , a = this._isViewingOwnProfile();
              return e ? this._renderUserProfileSuspended() : s ? this._renderUserNotFound() : t && a ? this._renderLoggedInUserProfileWithheld() : t ? this._renderUserProfileWithheld() : this._shouldShowProfileInterstitial() ? this._renderUserProfileInterstitialed() : r && r.blocked_by ? this._renderUserProfileBlockedBy() : r && r.blocking && !n ? this._renderUserProfileBlocking() : this._isProtectedFromViewer() ? this._renderUserProfileProtected() : this._renderUserProfileDefault()
            }
          ),
          w()(this, "_isGraphQL", ()=>!0 === Ge.b.getValueWithoutScribeImpression("responsive_web_graphql_profile_timeline")),
          w()(this, "_isViewingOwnProfile", ()=>{
              const {loggedInUserId: e} = this.context
                , {user: t} = this.props;
              return t && e === t.id_str
            }
          ),
          w()(this, "_shouldShowProfileInterstitial", (e=this.props.userProfileInterstitialType)=>{
              const {displaySensitiveMedia: t, user: r} = this.props;
              if (!r || !e)
                return !1;
              const {showBlockedTweets: s, userProfileInterstitialDismissed: n} = this.state
                , a = r.blocking && !s
                , i = r.blocked_by
                , o = (e === Je.a.SensitiveMedia || e === Je.a.OffensiveProfileContent) && (r.following || t);
              return !(this._isViewingOwnProfile() || this._isProtectedFromViewer() || a || i || n || o)
            }
          ),
          w()(this, "_isProtectedFromViewer", ()=>{
              const {user: e} = this.props;
              return e && e.protected && !this._isViewingOwnProfile() && !e.following
            }
          ),
          w()(this, "_handleRequestRetry", ()=>{
              this._fetchOneUserIfNeeded(this.props)
            }
          ),
          w()(this, "_handlePullToRefresh", ()=>{
              const {user: e} = this.props;
              e ? this._fetchOneUser(e.id_str) : this._fetchOneUserIfNeeded(this.props)
            }
          ),
          w()(this, "_handleShowBlockedTweets", ()=>{
              this.setState({
                showBlockedTweets: !0
              })
            }
          ),
          w()(this, "_handleOnConfirmProfileInterstitial", ()=>{
              const {scribeAction: e, scribeNamespace: t} = this.props;
              this.setState({
                userProfileInterstitialDismissed: !0
              }),
                e(Object.assign({}, t, Qt, {
                  action: "click"
                }))
            }
          ),
          w()(this, "_handleEntriesUpdate", ({entries: e, fetchStatus: t})=>{
              const {recordTTFL: r} = this.props;
              if (t === qe.a.FAILED && (this._shouldRecordTTFL = !1),
              this._shouldRecordTTFL && e.length) {
                const t = e.some(({type: e})=>e === He.b.Tweet);
                this._shouldRecordTTFL = !1;
                const s = {
                  source: this._isGraphQL() ? "graphql" : "rest"
                };
                t && r("profile", s)
              }
            }
          ),
          w()(this, "_handleFollowButtonOffscreen", ({isOffscreen: e})=>{
              this.setState({
                showFollowButtonRightControl: e
              })
            }
          ),
          Object(Et.a)(rr, this),
          this._shouldRecordTTFL = e.isInitialScreen,
          this._shouldRecordTTFMC = e.isInitialScreen,
          this.state = {
            userProfileInterstitialDismissed: !1,
            showBlockedTweets: !1,
            showFollowButtonRightControl: !1
          },
        O.canUseDOM && Object(k.a)().then(e=>e.default.track("pageview", {
          pagetype: "profile"
        }))
      }
      UNSAFE_componentWillMount() {
        const {createLocalApiErrorHandler: e, fetchSettingsIfNeeded: t, scribeAction: r, scribeNamespace: s} = this.props;
        this._fetchOneUserIfNeeded(this.props),
          t().catch(e()).then(()=>{
              this._shouldShowProfileInterstitial() && r(Object.assign({}, s, Qt, {
                action: "impression"
              }))
            }
          )
      }
      componentDidUpdate(e) {
        const {fetchStatus: t, recordTTFMC: r} = this.props;
        if (e.fetchStatus !== t && t === qe.a.FAILED)
          this._shouldRecordTTFMC = !1;
        else if (this._shouldRecordTTFMC && e.fetchStatus !== t && t === qe.a.LOADED && this._isValidProfile()) {
          r("profile", {
            source: this._isGraphQL() ? "graphql" : "rest"
          }),
            this._shouldRecordTTFMC = !1
        }
        e.user && !e.user.blocking && this.props.user && this.props.user.blocking && (window.scrollTo(0, 0),
          this.setState({
            showBlockedTweets: !1
          }))
      }
      UNSAFE_componentWillReceiveProps(e) {
        const {screenName: t, scribeAction: r, scribeNamespace: s, userProfileInterstitialType: n} = this.props;
        e.screenName !== t ? (this._fetchOneUserIfNeeded(e),
          this.setState({
            userProfileInterstitialDismissed: !1
          })) : !n && this._shouldShowProfileInterstitial(e.userProfileInterstitialType) && r(Object.assign({}, s, Qt, {
          action: "impression"
        }))
      }
      render() {
        const {fetchStatus: e, history: t, isSuspended: r, location: s, screenName: n, user: i, isIntentRoute: o, isNotFound: l, isWithheld: c} = this.props
          , d = this._isViewingOwnProfile()
          , h = r || l || c && !d
          , u = i ? Bt({
          screenName: i.screen_name,
          fullName: i.name
        }) : void 0
          , m = d ? "" : `@${i && i.screen_name || n || ""} `
          , p = h ? null : a.createElement(Qe.a, {
          getLocationState: tr(m),
          history: t
        })
          , f = i && !h ? a.createElement(_e.a, {
          isProtected: i.protected,
          isVerified: i.verified,
          name: i.name,
          screenName: i.screen_name,
          weight: "heavy",
          withScreenName: !1
        }) : Tt
          , _ = i && !h && e === qe.a.LOADED ? this._renderSubtitle(i) : void 0
          , b = i && "twitter://user?screen_name=" + i.screen_name
          , E = i && "https://twitter.com/" + (i.screen_name || "")
          , y = i && Ut({
          fullName: i.name,
          screenName: i.screen_name
        });
        return a.createElement(bt.a, {
          backLocation: "/",
          composeOptions: {
            defaultText: m
          },
          documentTitle: u,
          history: t,
          primaryContent: a.createElement($e.a, {
            fab: p
          }, a.createElement(ht.a, {
            canonical: E,
            description: null == i ? void 0 : i.description,
            image: null == i ? void 0 : i.profile_image_url_https,
            title: y,
            type: "profile"
          }), a.createElement(P.a, {
            deepLink: b
          }), E ? a.createElement(S.a, {
            canonical: E
          }) : null, a.createElement(Ke.a, {
            accessibilityLabel: Lt({
              screenName: n
            }),
            fetchStatus: i || h ? qe.a.LOADED : e,
            onRequestRetry: this._handleRequestRetry,
            render: this._renderContainer
          }), o ? a.createElement(ct.a, {
            history: t,
            location: s,
            userId: null == i ? void 0 : i.id_str
          }) : null),
          rightControl: this._renderRightControl(),
          sidebarContent: this._renderSidebarContent(),
          subtitle: _,
          title: f
        })
      }
      _renderRightControl() {
        const {promotedContent: e, user: t} = this.props
          , {showFollowButtonRightControl: r} = this.state;
        return t && !this._isViewingOwnProfile() ? a.createElement(wt.b, {
          animateMount: !0,
          show: r,
          type: "fade"
        }, a.createElement(D.a, {
          promotedContent: e,
          userId: t.id_str
        })) : void 0
      }
      _renderSubtitle(e) {
        const {location: t} = this.props
          , r = t.pathname.toLowerCase()
          , s = e.screen_name.toLowerCase();
        return r.indexOf(`/${s}/${Xt}`) > -1 ? a.createElement(yt.a, {
          count: e.favourites_count,
          type: "likes"
        }) : r.indexOf(`/${s}/${Zt}`) > -1 ? a.createElement(yt.a, {
          count: e.media_count,
          type: "media"
        }) : a.createElement(yt.a, {
          count: e.statuses_count,
          type: "tweets"
        })
      }
      _renderSidebarContent() {
        const {user: e} = this.props;
        return e ? a.createElement(mt.a, {
          hideMediaModule: this._shouldHideMediaModule(),
          userId: e.id_str
        }) : a.createElement(x.a, null)
      }
      _renderHeader() {
        const {loggedInUserId: e} = this.context
          , {isNotFound: t, isSuspended: r, isWithheld: s, location: n, history: a, promotedContent: i, screenName: o, profileHeaderRenderer: l, restrictedProfileHeaderRenderer: c, user: d} = this.props
          , h = this._shouldShowProfileInterstitial();
        if (!this._isViewingOwnProfile() && (r || t || h)) {
          const {name: e} = d || {};
          return c({
            shouldDisplayUserActionSheet: !r && !t,
            avatarAccessibilityLabel: t ? Nt : r ? xt : e,
            fullUser: d,
            restrictedUser: {
              name: e,
              screen_name: o || ""
            }
          })
        }
        return l({
          history: a,
          loggedInUserId: e,
          isWithheld: s,
          location: n,
          onFollowButtonOffscreen: this._handleFollowButtonOffscreen,
          promotedContent: i,
          user: d
        })
      }
      _renderEmptyState({header: e, message: t, buttonText: r, onButtonPress: s}) {
        return a.createElement(It.a, {
          buttonText: r,
          buttonType: "secondary",
          header: e,
          message: t,
          onButtonPress: s,
          style: nr.root
        })
      }
      _renderUserProfileInterstitialed() {
        const {userProfileInterstitialType: e} = this.props
          , {header: t, message: r} = (e=>e && Object.values(Je.a).indexOf(e) >= 0 ? {
          header: ot[e],
          message: lt[e]
        } : (Object(ze.a)("Unrecognized Profile Interstitial Type: " + String(e)),
          {
            header: ot.default,
            message: lt.default
          }))(e);
        return this._renderEmptyState({
          header: t,
          message: r,
          buttonText: Kt,
          onButtonPress: this._handleOnConfirmProfileInterstitial
        })
      }
      _renderUserProfileBlocking() {
        const {user: e} = this.props;
        if (!e)
          return null;
        const {screen_name: t} = e
          , r = Dt({
          screenName: t
        })
          , s = a.createElement(H.a.I18NFormatMessage, {
          $i18n: "e645092a",
          screenName: t
        }, a.createElement(fe.c, {
          link: "https://support.twitter.com/articles/117063"
        }, H.a.f6a72a2a));
        return this._renderEmptyState({
          header: r,
          message: s,
          buttonText: qt,
          onButtonPress: this._handleShowBlockedTweets
        })
      }
      _renderUserProfileBlockedBy() {
        const {user: e} = this.props;
        if (!e)
          return null;
        const {screen_name: t} = e
          , r = a.createElement(H.a.I18NFormatMessage, {
          $i18n: "ccade2e6",
          screenName: t
        }, a.createElement(fe.c, {
          link: "https://support.twitter.com/articles/20172060"
        }, H.a.de078c23));
        return this._renderEmptyState({
          header: jt,
          message: r
        })
      }
      _renderUserProfileSuspended() {
        const e = a.createElement(H.a.I18NFormatMessage, {
          $i18n: "f6fa2033"
        }, a.createElement(fe.c, {
          link: "https://support.twitter.com/articles/18311"
        }, H.a.f3b1bdc1));
        return this._renderEmptyState({
          header: Wt,
          message: e
        })
      }
      _renderUserProfileWithheld() {
        const {user: e} = this.props;
        if (!e)
          return null;
        const {id_str: t, description: r, entities: s} = e;
        if (!r)
          return null;
        const n = St.a.descriptionTextParts(r, s)
          , i = a.createElement(fe.c, {
          align: "center",
          color: "deepGray",
          dir: "auto"
        }, n.map((e,r)=>a.createElement(Pt.b, {
          key: `user_${t}_textpart_${r}`,
          linkify: !0,
          part: e
        })));
        return this._renderEmptyState({
          header: Vt,
          message: i
        })
      }
      _renderLoggedInUserProfileWithheld() {
        const {user: e} = this.props;
        if (!e)
          return null;
        const {id_str: t, description: r, entities: s} = e;
        if (!r)
          return null;
        const n = St.a.descriptionTextParts(r, s);
        return a.createElement(ie.a, null, a.createElement(ie.a, {
          style: sr.withheldMessageRoot
        }, a.createElement(fe.c, {
          align: "center",
          size: "xLarge",
          style: sr.withheldMessageHeader,
          weight: "bold"
        }, Vt), a.createElement(fe.c, {
          align: "center",
          color: "deepGray",
          dir: "auto"
        }, n.map((e,r)=>a.createElement(Pt.b, {
          key: `user_${t}_textpart_${r}`,
          linkify: !0,
          part: e
        })))), a.createElement(Ct.a, null), this._renderUserProfileDefault())
      }
      _renderUserProfileProtected() {
        const {user: e} = this.props;
        if (!e)
          return null;
        const {screen_name: t} = e
          , r = a.createElement(H.a.I18NFormatMessage, {
          $i18n: "c97724c2",
          screenName: t
        }, a.createElement(fe.c, {
          link: "https://support.twitter.com/articles/14016"
        }, H.a.a58c8a4e));
        return this._renderEmptyState({
          header: Gt,
          message: r
        })
      }
      _renderUserNotFound() {
        return this._renderEmptyState({
          header: Ht,
          message: $t
        })
      }
      _renderUserProfileDefault() {
        const {user: e, history: {location: t}} = this.props;
        if (!e)
          return null;
        const {screen_name: r} = e
          , {showBlockedTweets: s} = this.state
          , i = t.query
          , o = e=>[{
          isActive: ()=>t.pathname.toLowerCase() === ("/" + r).toLowerCase() || t.pathname.toLowerCase() === `/${r}/`.toLowerCase() || t.pathname.indexOf("/intent/follow") > -1 || t.pathname.indexOf("/intent/user") > -1,
          to: {
            pathname: "/" + r,
            query: i
          },
          label: vt
        }, {
          to: {
            pathname: `/${r}/${er}`,
            query: i
          },
          label: Rt
        }, {
          to: {
            pathname: `/${r}/${Zt}`,
            query: i
          },
          label: Mt,
          onClick: e()
        }, {
          to: {
            pathname: `/${r}/${Xt}`,
            query: i
          },
          label: At,
          onClick: e()
        }]
          , l = {
          displayBlocked: s,
          fullName: e.name,
          screenName: e.screen_name,
          userId: e.id_str
        };
        return a.createElement(a.Fragment, null, a.createElement(Q.a, null, e=>a.createElement(kt.a, {
          accessibilityLabel: Ft,
          links: o(e)
        })), a.createElement(Ot.d, null, a.createElement(Ot.b, {
          exact: !0,
          path: "/intent/follow"
        }, a.createElement(zt, l)), a.createElement(Ot.b, {
          exact: !0,
          path: "/intent/user"
        }, a.createElement(zt, l)), a.createElement(Ot.b, {
          exact: !0,
          path: "/" + ut.B
        }, a.createElement(zt, n()({}, l, {
          onEntriesUpdate: this._handleEntriesUpdate
        }))), a.createElement(Ot.b, {
          exact: !0,
          path: `/${ut.B}/${er}`
        }, a.createElement(zt, n()({}, l, {
          withReplies: !0
        }))), a.createElement(Ot.b, {
          exact: !0,
          path: `/${ut.B}/${Zt}`
        }, a.createElement(Yt, l)), a.createElement(Ot.b, {
          exact: !0,
          path: `/${ut.B}/${Xt}`
        }, a.createElement(Jt, l))))
      }
      _fetchOneUserIfNeeded(e) {
        const {createLocalApiErrorHandler: t, fetchOneByScreenNameWithExtraFieldsIfNeeded: r, screenName: s} = e;
        s && r(s).catch(t(Ve.a))
      }
      _fetchOneUser(e) {
        const {createLocalApiErrorHandler: t, fetchOneUser: r} = this.props;
        return r(e).catch(t(Ve.a))
      }
      _shouldHideMediaModule() {
        const {user: e} = this.props;
        return this._shouldShowProfileInterstitial() || e && (e.blocked_by || e.blocking && !this.state.showBlockedTweets)
      }
      _isValidProfile() {
        const {isNotFound: e, isSuspended: t, isWithheld: r, user: s} = this.props;
        return s && !s.blocking && !s.blocked_by && !this._isViewingOwnProfile() && !this._isProtectedFromViewer() && !t && !e && !r && !this._shouldShowProfileInterstitial()
      }
    }
    w()(rr, "contextType", C.a),
      w()(rr, "defaultProps", {
        profileHeaderRenderer: (e={})=>a.createElement(We, e),
        restrictedProfileHeaderRenderer: e=>a.createElement(ft, e),
        recordTTFL: I.c,
        recordTTFMC: I.d
      });
    const sr = de.a.create(e=>({
      containerGrow: {
        flexGrow: 1
      },
      rightControlContainer: {
        flexDirection: "row",
        flexGrow: 1
      },
      interstitialedProfile: {
        height: "100%",
        position: "fixed",
        width: "100%",
        filter: "blur(10px)"
      },
      withheldMessageRoot: {
        paddingVertical: e.spaces.large,
        paddingHorizontal: e.spaces.small
      },
      withheldMessageHeader: {
        paddingBottom: e.spaces.xxSmall
      }
    }))
      , nr = de.a.create(e=>({
      root: {
        backgroundColor: e.colors.cellBackground,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: e.colors.borderColor,
        paddingVertical: e.spaces.xLarge,
        paddingHorizontal: e.spaces.medium
      }
    }))
      , ar = e=>a.createElement(y.a, {
      userId: e.user && e.user.id_str
    }, ({scribeNamespace: t})=>a.createElement(rr, n()({}, e, {
      scribeNamespace: t
    })));
    t.default = E(ar)
  },
  ylAD: function(e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "UserMediaScreen", (function() {
          return g
        }
      ));
    var s = r("KEM+")
      , n = r.n(s)
      , a = r("ERkP")
      , i = r("v6aA")
      , o = r("3XMw")
      , l = r.n(o)
      , c = r("txMZ")
      , d = r("0JWC")
      , h = r("YjVx");
    const u = l.a.h10bba54
      , m = l.a.ia61ef0d
      , p = l.a.f7044029
      , f = ()=>l.a.a3d5456f
      , _ = ()=>l.a.dfb3ead3
      , b = ()=>l.a.ca6c276c
      , E = l.a.ae2be9ff
      , y = l.a.d55be465;
    class g extends a.Component {
      render() {
        const {displayBlocked: e, fullName: t, screenName: r, userId: s} = this.props
          , n = this.context.loggedInUserId === s
          , i = n ? b : f
          , o = n ? _ : p
          , l = n ? E : void 0;
        return a.createElement(c.a, {
          scribeSection: "media",
          userId: s
        }, ({scribeNamespace: n})=>a.createElement(d.a, {
          displayBlocked: e,
          fullName: t,
          loadingLabelFormatter: m,
          module: Object(h.a)(s),
          screenName: r,
          scribeNamespace: n,
          timelineEmptyHeaderFormatter: o,
          timelineEmptyMessageFormatter: i,
          timelineEmptyStateButtonLabel: l,
          timelineEmptyStateButtonLink: "/compose/tweet",
          timelineTitleFormatter: y,
          titleFormatter: u,
          userId: s
        }))
      }
    }
    n()(g, "contextType", i.a),
      n()(g, "defaultProps", {
        displayBlocked: !1
      }),
      t.default = g
  }
}]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/client-web/bundle.UserProfile.bbf57d95.js.map
