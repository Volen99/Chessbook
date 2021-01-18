(window.webpackJsonp = window.webpackJsonp || []).push([ [ 57, 153 ], {
  '+ZX+': function (e, t, s) {
    'use strict';
    (function (e) {
      /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
      var a = s('dEMF'), n = s('1TxV'), i = s('Rl48')

      function r() {
        return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function o(e, t) {
        if (r() < t) throw new RangeError('Invalid typed array length')
        return l.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = l.prototype : (null === e && (e = new l(t)), e.length = t), e
      }

      function l(e, t, s) {
        if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(e, t, s)
        if ('number' == typeof e) {
          if ('string' == typeof t) throw new Error('If encoding is specified then the first argument must be a string')
          return u(this, e)
        }
        return c(this, e, t, s)
      }

      function c(e, t, s, a) {
        if ('number' == typeof t) throw new TypeError('"value" argument must not be a number')
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, s, a) {
          if (t.byteLength, s < 0 || t.byteLength < s) throw new RangeError('\'offset\' is out of bounds')
          if (t.byteLength < s + (a || 0)) throw new RangeError('\'length\' is out of bounds')
          t = void 0 === s && void 0 === a ? new Uint8Array(t) : void 0 === a ? new Uint8Array(t, s) : new Uint8Array(t, s, a)
          l.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = l.prototype : e = h(e, t)
          return e
        }(e, t, s, a) : 'string' == typeof t ? function (e, t, s) {
          'string' == typeof s && '' !== s || (s = 'utf8')
          if (!l.isEncoding(s)) throw new TypeError('"encoding" must be a valid string encoding')
          var a = 0 | _(t, s), n = (e = o(e, a)).write(t, s)
          n !== a && (e = e.slice(0, n))
          return e
        }(e, t, s) : function (e, t) {
          if (l.isBuffer(t)) {
            var s = 0 | p(t.length)
            return 0 === (e = o(e, s)).length || t.copy(e, 0, 0, s), e
          }
          if (t) {
            if ('undefined' != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || 'length' in t) return 'number' != typeof t.length || (a = t.length) != a ? o(e, 0) : h(e, t)
            if ('Buffer' === t.type && i(t.data)) return h(e, t.data)
          }
          var a
          throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
        }(e, t)
      }

      function d(e) {
        if ('number' != typeof e) throw new TypeError('"size" argument must be a number')
        if (e < 0) throw new RangeError('"size" argument must not be negative')
      }

      function u(e, t) {
        if (d(t), e = o(e, t < 0 ? 0 : 0 | p(t)), !l.TYPED_ARRAY_SUPPORT) for (var s = 0; s < t; ++s) e[s] = 0
        return e
      }

      function h(e, t) {
        var s = t.length < 0 ? 0 : 0 | p(t.length)
        e = o(e, s)
        for (var a = 0; a < s; a += 1) e[a] = 255 & t[a]
        return e
      }

      function p(e) {
        if (e >= r()) throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + r().toString(16) + ' bytes')
        return 0 | e
      }

      function _(e, t) {
        if (l.isBuffer(e)) return e.length
        if ('undefined' != typeof ArrayBuffer && 'function' == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength
        'string' != typeof e && (e = '' + e)
        var s = e.length
        if (0 === s) return 0
        for (var a = !1; ;) {
          switch (t) {
            case'ascii':
            case'latin1':
            case'binary':
              return s
            case'utf8':
            case'utf-8':
            case void 0:
              return V(e).length
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
              return 2 * s
            case'hex':
              return s >>> 1
            case'base64':
              return M(e).length
            default:
              if (a) return V(e).length
              t = ('' + t).toLowerCase(), a = !0
          }
        }
      }

      function m(e, t, s) {
        var a = !1
        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return ''
        if ((void 0 === s || s > this.length) && (s = this.length), s <= 0) return ''
        if ((s >>>= 0) <= (t >>>= 0)) return ''
        for (e || (e = 'utf8'); ;) {
          switch (e) {
            case'hex':
              return A(this, t, s)
            case'utf8':
            case'utf-8':
              return I(this, t, s)
            case'ascii':
              return S(this, t, s)
            case'latin1':
            case'binary':
              return O(this, t, s)
            case'base64':
              return x(this, t, s)
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
              return T(this, t, s)
            default:
              if (a) throw new TypeError('Unknown encoding: ' + e)
              e = (e + '').toLowerCase(), a = !0
          }
        }
      }

      function b(e, t, s) {
        var a = e[t]
        e[t] = e[s], e[s] = a
      }

      function g(e, t, s, a, n) {
        if (0 === e.length) return -1
        if ('string' == typeof s ? (a = s, s = 0) : s > 2147483647 ? s = 2147483647 : s < -2147483648 && (s = -2147483648), s = +s, isNaN(s) && (s = n ? 0 : e.length - 1), s < 0 && (s = e.length + s), s >= e.length) {
          if (n) return -1
          s = e.length - 1
        } else if (s < 0) {
          if (!n) return -1
          s = 0
        }
        if ('string' == typeof t && (t = l.from(t, a)), l.isBuffer(t)) return 0 === t.length ? -1 : f(e, t, s, a, n)
        if ('number' == typeof t) return t &= 255, l.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, s) : Uint8Array.prototype.lastIndexOf.call(e, t, s) : f(e, [ t ], s, a, n)
        throw new TypeError('val must be string, number or Buffer')
      }

      function f(e, t, s, a, n) {
        var i, r = 1, o = e.length, l = t.length
        if (void 0 !== a && ('ucs2' === (a = String(a).toLowerCase()) || 'ucs-2' === a || 'utf16le' === a || 'utf-16le' === a)) {
          if (e.length < 2 || t.length < 2) return -1
          r = 2, o /= 2, l /= 2, s /= 2
        }

        function c(e, t) {
          return 1 === r ? e[t] : e.readUInt16BE(t * r)
        }

        if (n) {
          var d = -1
          for (i = s; i < o; i++) {
            if (c(e, i) === c(t, -1 === d ? 0 : i - d)) {
              if (-1 === d && (d = i), i - d + 1 === l) return d * r
            } else {
              -1 !== d && (i -= i - d), d = -1
            }
          }
        } else {
          for (s + l > o && (s = o - l), i = s; i >= 0; i--) {
            for (var u = !0, h = 0; h < l; h++) {
              if (c(e, i + h) !== c(t, h)) {
                u = !1
                break
              }
            }
            if (u) return i
          }
        }
        return -1
      }

      function k(e, t, s, a) {
        s = Number(s) || 0
        var n = e.length - s
        a ? (a = Number(a)) > n && (a = n) : a = n
        var i = t.length
        if (i % 2 != 0) throw new TypeError('Invalid hex string')
        a > i / 2 && (a = i / 2)
        for (var r = 0; r < a; ++r) {
          var o = parseInt(t.substr(2 * r, 2), 16)
          if (isNaN(o)) return r
          e[s + r] = o
        }
        return r
      }

      function y(e, t, s, a) {
        return z(V(t, e.length - s), e, s, a)
      }

      function v(e, t, s, a) {
        return z(function (e) {
          for (var t = [], s = 0; s < e.length; ++s) t.push(255 & e.charCodeAt(s))
          return t
        }(t), e, s, a)
      }

      function w(e, t, s, a) {
        return v(e, t, s, a)
      }

      function C(e, t, s, a) {
        return z(M(t), e, s, a)
      }

      function E(e, t, s, a) {
        return z(function (e, t) {
          for (var s, a, n, i = [], r = 0; r < e.length && !((t -= 2) < 0); ++r) s = e.charCodeAt(r), a = s >> 8, n = s % 256, i.push(n), i.push(a)
          return i
        }(t, e.length - s), e, s, a)
      }

      function x(e, t, s) {
        return 0 === t && s === e.length ? a.fromByteArray(e) : a.fromByteArray(e.slice(t, s))
      }

      function I(e, t, s) {
        s = Math.min(e.length, s)
        for (var a = [], n = t; n < s;) {
          var i, r, o, l, c = e[n], d = null, u = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1
          if (n + u <= s) {
            switch (u) {
              case 1:
                c < 128 && (d = c)
                break
              case 2:
                128 == (192 & (i = e[n + 1])) && (l = (31 & c) << 6 | 63 & i) > 127 && (d = l)
                break
              case 3:
                i = e[n + 1], r = e[n + 2], 128 == (192 & i) && 128 == (192 & r) && (l = (15 & c) << 12 | (63 & i) << 6 | 63 & r) > 2047 && (l < 55296 || l > 57343) && (d = l)
                break
              case 4:
                i = e[n + 1], r = e[n + 2], o = e[n + 3], 128 == (192 & i) && 128 == (192 & r) && 128 == (192 & o) && (l = (15 & c) << 18 | (63 & i) << 12 | (63 & r) << 6 | 63 & o) > 65535 && l < 1114112 && (d = l)
            }
          }
          null === d ? (d = 65533, u = 1) : d > 65535 && (d -= 65536, a.push(d >>> 10 & 1023 | 55296), d = 56320 | 1023 & d), a.push(d), n += u
        }
        return function (e) {
          var t = e.length
          if (t <= 4096) return String.fromCharCode.apply(String, e)
          var s = '', a = 0
          for (; a < t;) s += String.fromCharCode.apply(String, e.slice(a, a += 4096))
          return s
        }(a)
      }

      t.Buffer = l, t.SlowBuffer = function (e) {
        +e != e && (e = 0)
        return l.alloc(+e)
      }, t.INSPECT_MAX_BYTES = 50, l.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
        try {
          var e = new Uint8Array(1)
          return e.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function () {
              return 42
            }
          }, 42 === e.foo() && 'function' == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
        } catch (e) {
          return !1
        }
      }(), t.kMaxLength = r(), l.poolSize = 8192, l._augment = function (e) {
        return e.__proto__ = l.prototype, e
      }, l.from = function (e, t, s) {
        return c(null, e, t, s)
      }, l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, 'undefined' != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
        value: null,
        configurable: !0
      })), l.alloc = function (e, t, s) {
        return function (e, t, s, a) {
          return d(t), t <= 0 ? o(e, t) : void 0 !== s ? 'string' == typeof a ? o(e, t).fill(s, a) : o(e, t).fill(s) : o(e, t)
        }(null, e, t, s)
      }, l.allocUnsafe = function (e) {
        return u(null, e)
      }, l.allocUnsafeSlow = function (e) {
        return u(null, e)
      }, l.isBuffer = function (e) {
        return !(null == e || !e._isBuffer)
      }, l.compare = function (e, t) {
        if (!l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError('Arguments must be Buffers')
        if (e === t) return 0
        for (var s = e.length, a = t.length, n = 0, i = Math.min(s, a); n < i; ++n) {
          if (e[n] !== t[n]) {
            s = e[n], a = t[n]
            break
          }
        }
        return s < a ? -1 : a < s ? 1 : 0
      }, l.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {
          case'hex':
          case'utf8':
          case'utf-8':
          case'ascii':
          case'latin1':
          case'binary':
          case'base64':
          case'ucs2':
          case'ucs-2':
          case'utf16le':
          case'utf-16le':
            return !0
          default:
            return !1
        }
      }, l.concat = function (e, t) {
        if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers')
        if (0 === e.length) return l.alloc(0)
        var s
        if (void 0 === t) for (t = 0, s = 0; s < e.length; ++s) t += e[s].length
        var a = l.allocUnsafe(t), n = 0
        for (s = 0; s < e.length; ++s) {
          var r = e[s]
          if (!l.isBuffer(r)) throw new TypeError('"list" argument must be an Array of Buffers')
          r.copy(a, n), n += r.length
        }
        return a
      }, l.byteLength = _, l.prototype._isBuffer = !0, l.prototype.swap16 = function () {
        var e = this.length
        if (e % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
        for (var t = 0; t < e; t += 2) b(this, t, t + 1)
        return this
      }, l.prototype.swap32 = function () {
        var e = this.length
        if (e % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
        for (var t = 0; t < e; t += 4) b(this, t, t + 3), b(this, t + 1, t + 2)
        return this
      }, l.prototype.swap64 = function () {
        var e = this.length
        if (e % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
        for (var t = 0; t < e; t += 8) b(this, t, t + 7), b(this, t + 1, t + 6), b(this, t + 2, t + 5), b(this, t + 3, t + 4)
        return this
      }, l.prototype.toString = function () {
        var e = 0 | this.length
        return 0 === e ? '' : 0 === arguments.length ? I(this, 0, e) : m.apply(this, arguments)
      }, l.prototype.equals = function (e) {
        if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
        return this === e || 0 === l.compare(this, e)
      }, l.prototype.inspect = function () {
        var e = '', s = t.INSPECT_MAX_BYTES
        return this.length > 0 && (e = this.toString('hex', 0, s).match(/.{2}/g).join(' '), this.length > s && (e += ' ... ')), '<Buffer ' + e + '>'
      }, l.prototype.compare = function (e, t, s, a, n) {
        if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer')
        if (void 0 === t && (t = 0), void 0 === s && (s = e ? e.length : 0), void 0 === a && (a = 0), void 0 === n && (n = this.length), t < 0 || s > e.length || a < 0 || n > this.length) throw new RangeError('out of range index')
        if (a >= n && t >= s) return 0
        if (a >= n) return -1
        if (t >= s) return 1
        if (this === e) return 0
        for (var i = (n >>>= 0) - (a >>>= 0), r = (s >>>= 0) - (t >>>= 0), o = Math.min(i, r), c = this.slice(a, n), d = e.slice(t, s), u = 0; u < o; ++u) {
          if (c[u] !== d[u]) {
            i = c[u], r = d[u]
            break
          }
        }
        return i < r ? -1 : r < i ? 1 : 0
      }, l.prototype.includes = function (e, t, s) {
        return -1 !== this.indexOf(e, t, s)
      }, l.prototype.indexOf = function (e, t, s) {
        return g(this, e, t, s, !0)
      }, l.prototype.lastIndexOf = function (e, t, s) {
        return g(this, e, t, s, !1)
      }, l.prototype.write = function (e, t, s, a) {
        if (void 0 === t) {
          a = 'utf8', s = this.length, t = 0
        } else if (void 0 === s && 'string' == typeof t) {
          a = t, s = this.length, t = 0
        } else {
          if (!isFinite(t)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported')
          t |= 0, isFinite(s) ? (s |= 0, void 0 === a && (a = 'utf8')) : (a = s, s = void 0)
        }
        var n = this.length - t
        if ((void 0 === s || s > n) && (s = n), e.length > 0 && (s < 0 || t < 0) || t > this.length) throw new RangeError('Attempt to write outside buffer bounds')
        a || (a = 'utf8')
        for (var i = !1; ;) {
          switch (a) {
            case'hex':
              return k(this, e, t, s)
            case'utf8':
            case'utf-8':
              return y(this, e, t, s)
            case'ascii':
              return v(this, e, t, s)
            case'latin1':
            case'binary':
              return w(this, e, t, s)
            case'base64':
              return C(this, e, t, s)
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
              return E(this, e, t, s)
            default:
              if (i) throw new TypeError('Unknown encoding: ' + a)
              a = ('' + a).toLowerCase(), i = !0
          }
        }
      }, l.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      }

      function S(e, t, s) {
        var a = ''
        s = Math.min(e.length, s)
        for (var n = t; n < s; ++n) a += String.fromCharCode(127 & e[n])
        return a
      }

      function O(e, t, s) {
        var a = ''
        s = Math.min(e.length, s)
        for (var n = t; n < s; ++n) a += String.fromCharCode(e[n])
        return a
      }

      function A(e, t, s) {
        var a = e.length;
        (!t || t < 0) && (t = 0), (!s || s < 0 || s > a) && (s = a)
        for (var n = '', i = t; i < s; ++i) n += U(e[i])
        return n
      }

      function T(e, t, s) {
        for (var a = e.slice(t, s), n = '', i = 0; i < a.length; i += 2) n += String.fromCharCode(a[i] + 256 * a[i + 1])
        return n
      }

      function R(e, t, s) {
        if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint')
        if (e + t > s) throw new RangeError('Trying to access beyond buffer length')
      }

      function P(e, t, s, a, n, i) {
        if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (t > n || t < i) throw new RangeError('"value" argument is out of bounds')
        if (s + a > e.length) throw new RangeError('Index out of range')
      }

      function D(e, t, s, a) {
        t < 0 && (t = 65535 + t + 1)
        for (var n = 0, i = Math.min(e.length - s, 2); n < i; ++n) e[s + n] = (t & 255 << 8 * (a ? n : 1 - n)) >>> 8 * (a ? n : 1 - n)
      }

      function j(e, t, s, a) {
        t < 0 && (t = 4294967295 + t + 1)
        for (var n = 0, i = Math.min(e.length - s, 4); n < i; ++n) e[s + n] = t >>> 8 * (a ? n : 3 - n) & 255
      }

      function N(e, t, s, a, n, i) {
        if (s + a > e.length) throw new RangeError('Index out of range')
        if (s < 0) throw new RangeError('Index out of range')
      }

      function F(e, t, s, a, i) {
        return i || N(e, 0, s, 4), n.write(e, t, s, a, 23, 4), s + 4
      }

      function B(e, t, s, a, i) {
        return i || N(e, 0, s, 8), n.write(e, t, s, a, 52, 8), s + 8
      }

      l.prototype.slice = function (e, t) {
        var s, a = this.length
        if ((e = ~~e) < 0 ? (e += a) < 0 && (e = 0) : e > a && (e = a), (t = void 0 === t ? a : ~~t) < 0 ? (t += a) < 0 && (t = 0) : t > a && (t = a), t < e && (t = e), l.TYPED_ARRAY_SUPPORT) {
          (s = this.subarray(e, t)).__proto__ = l.prototype
        } else {
          var n = t - e
          s = new l(n, void 0)
          for (var i = 0; i < n; ++i) s[i] = this[i + e]
        }
        return s
      }, l.prototype.readUIntLE = function (e, t, s) {
        e |= 0, t |= 0, s || R(e, t, this.length)
        for (var a = this[e], n = 1, i = 0; ++i < t && (n *= 256);) a += this[e + i] * n
        return a
      }, l.prototype.readUIntBE = function (e, t, s) {
        e |= 0, t |= 0, s || R(e, t, this.length)
        for (var a = this[e + --t], n = 1; t > 0 && (n *= 256);) a += this[e + --t] * n
        return a
      }, l.prototype.readUInt8 = function (e, t) {
        return t || R(e, 1, this.length), this[e]
      }, l.prototype.readUInt16LE = function (e, t) {
        return t || R(e, 2, this.length), this[e] | this[e + 1] << 8
      }, l.prototype.readUInt16BE = function (e, t) {
        return t || R(e, 2, this.length), this[e] << 8 | this[e + 1]
      }, l.prototype.readUInt32LE = function (e, t) {
        return t || R(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
      }, l.prototype.readUInt32BE = function (e, t) {
        return t || R(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
      }, l.prototype.readIntLE = function (e, t, s) {
        e |= 0, t |= 0, s || R(e, t, this.length)
        for (var a = this[e], n = 1, i = 0; ++i < t && (n *= 256);) a += this[e + i] * n
        return a >= (n *= 128) && (a -= Math.pow(2, 8 * t)), a
      }, l.prototype.readIntBE = function (e, t, s) {
        e |= 0, t |= 0, s || R(e, t, this.length)
        for (var a = t, n = 1, i = this[e + --a]; a > 0 && (n *= 256);) i += this[e + --a] * n
        return i >= (n *= 128) && (i -= Math.pow(2, 8 * t)), i
      }, l.prototype.readInt8 = function (e, t) {
        return t || R(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      }, l.prototype.readInt16LE = function (e, t) {
        t || R(e, 2, this.length)
        var s = this[e] | this[e + 1] << 8
        return 32768 & s ? 4294901760 | s : s
      }, l.prototype.readInt16BE = function (e, t) {
        t || R(e, 2, this.length)
        var s = this[e + 1] | this[e] << 8
        return 32768 & s ? 4294901760 | s : s
      }, l.prototype.readInt32LE = function (e, t) {
        return t || R(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
      }, l.prototype.readInt32BE = function (e, t) {
        return t || R(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
      }, l.prototype.readFloatLE = function (e, t) {
        return t || R(e, 4, this.length), n.read(this, e, !0, 23, 4)
      }, l.prototype.readFloatBE = function (e, t) {
        return t || R(e, 4, this.length), n.read(this, e, !1, 23, 4)
      }, l.prototype.readDoubleLE = function (e, t) {
        return t || R(e, 8, this.length), n.read(this, e, !0, 52, 8)
      }, l.prototype.readDoubleBE = function (e, t) {
        return t || R(e, 8, this.length), n.read(this, e, !1, 52, 8)
      }, l.prototype.writeUIntLE = function (e, t, s, a) {
        (e = +e, t |= 0, s |= 0, a) || P(this, e, t, s, Math.pow(2, 8 * s) - 1, 0)
        var n = 1, i = 0
        for (this[t] = 255 & e; ++i < s && (n *= 256);) this[t + i] = e / n & 255
        return t + s
      }, l.prototype.writeUIntBE = function (e, t, s, a) {
        (e = +e, t |= 0, s |= 0, a) || P(this, e, t, s, Math.pow(2, 8 * s) - 1, 0)
        var n = s - 1, i = 1
        for (this[t + n] = 255 & e; --n >= 0 && (i *= 256);) this[t + n] = e / i & 255
        return t + s
      }, l.prototype.writeUInt8 = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 1, 255, 0), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
      }, l.prototype.writeUInt16LE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : D(this, e, t, !0), t + 2
      }, l.prototype.writeUInt16BE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : D(this, e, t, !1), t + 2
      }, l.prototype.writeUInt32LE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : j(this, e, t, !0), t + 4
      }, l.prototype.writeUInt32BE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : j(this, e, t, !1), t + 4
      }, l.prototype.writeIntLE = function (e, t, s, a) {
        if (e = +e, t |= 0, !a) {
          var n = Math.pow(2, 8 * s - 1)
          P(this, e, t, s, n - 1, -n)
        }
        var i = 0, r = 1, o = 0
        for (this[t] = 255 & e; ++i < s && (r *= 256);) e < 0 && 0 === o && 0 !== this[t + i - 1] && (o = 1), this[t + i] = (e / r >> 0) - o & 255
        return t + s
      }, l.prototype.writeIntBE = function (e, t, s, a) {
        if (e = +e, t |= 0, !a) {
          var n = Math.pow(2, 8 * s - 1)
          P(this, e, t, s, n - 1, -n)
        }
        var i = s - 1, r = 1, o = 0
        for (this[t + i] = 255 & e; --i >= 0 && (r *= 256);) e < 0 && 0 === o && 0 !== this[t + i + 1] && (o = 1), this[t + i] = (e / r >> 0) - o & 255
        return t + s
      }, l.prototype.writeInt8 = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 1, 127, -128), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
      }, l.prototype.writeInt16LE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : D(this, e, t, !0), t + 2
      }, l.prototype.writeInt16BE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : D(this, e, t, !1), t + 2
      }, l.prototype.writeInt32LE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 4, 2147483647, -2147483648), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : j(this, e, t, !0), t + 4
      }, l.prototype.writeInt32BE = function (e, t, s) {
        return e = +e, t |= 0, s || P(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : j(this, e, t, !1), t + 4
      }, l.prototype.writeFloatLE = function (e, t, s) {
        return F(this, e, t, !0, s)
      }, l.prototype.writeFloatBE = function (e, t, s) {
        return F(this, e, t, !1, s)
      }, l.prototype.writeDoubleLE = function (e, t, s) {
        return B(this, e, t, !0, s)
      }, l.prototype.writeDoubleBE = function (e, t, s) {
        return B(this, e, t, !1, s)
      }, l.prototype.copy = function (e, t, s, a) {
        if (s || (s = 0), a || 0 === a || (a = this.length), t >= e.length && (t = e.length), t || (t = 0), a > 0 && a < s && (a = s), a === s) return 0
        if (0 === e.length || 0 === this.length) return 0
        if (t < 0) throw new RangeError('targetStart out of bounds')
        if (s < 0 || s >= this.length) throw new RangeError('sourceStart out of bounds')
        if (a < 0) throw new RangeError('sourceEnd out of bounds')
        a > this.length && (a = this.length), e.length - t < a - s && (a = e.length - t + s)
        var n, i = a - s
        if (this === e && s < t && t < a) for (n = i - 1; n >= 0; --n) e[n + t] = this[n + s] else if (i < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (n = 0; n < i; ++n) e[n + t] = this[n + s] else Uint8Array.prototype.set.call(e, this.subarray(s, s + i), t)
        return i
      }, l.prototype.fill = function (e, t, s, a) {
        if ('string' == typeof e) {
          if ('string' == typeof t ? (a = t, t = 0, s = this.length) : 'string' == typeof s && (a = s, s = this.length), 1 === e.length) {
            var n = e.charCodeAt(0)
            n < 256 && (e = n)
          }
          if (void 0 !== a && 'string' != typeof a) throw new TypeError('encoding must be a string')
          if ('string' == typeof a && !l.isEncoding(a)) throw new TypeError('Unknown encoding: ' + a)
        } else {
          'number' == typeof e && (e &= 255)
        }
        if (t < 0 || this.length < t || this.length < s) throw new RangeError('Out of range index')
        if (s <= t) return this
        var i
        if (t >>>= 0, s = void 0 === s ? this.length : s >>> 0, e || (e = 0), 'number' == typeof e) {
          for (i = t; i < s; ++i) this[i] = e
        } else {
          var r = l.isBuffer(e) ? e : V(new l(e, a).toString()), o = r.length
          for (i = 0; i < s - t; ++i) this[i + t] = r[i % o]
        }
        return this
      }
      var L = /[^+\/0-9A-Za-z-_]/g

      function U(e) {
        return e < 16 ? '0' + e.toString(16) : e.toString(16)
      }

      function V(e, t) {
        var s
        t = t || 1 / 0
        for (var a = e.length, n = null, i = [], r = 0; r < a; ++r) {
          if ((s = e.charCodeAt(r)) > 55295 && s < 57344) {
            if (!n) {
              if (s > 56319) {
                (t -= 3) > -1 && i.push(239, 191, 189)
                continue
              }
              if (r + 1 === a) {
                (t -= 3) > -1 && i.push(239, 191, 189)
                continue
              }
              n = s
              continue
            }
            if (s < 56320) {
              (t -= 3) > -1 && i.push(239, 191, 189), n = s
              continue
            }
            s = 65536 + (n - 55296 << 10 | s - 56320)
          } else {
            n && (t -= 3) > -1 && i.push(239, 191, 189)
          }
          if (n = null, s < 128) {
            if ((t -= 1) < 0) break
            i.push(s)
          } else if (s < 2048) {
            if ((t -= 2) < 0) break
            i.push(s >> 6 | 192, 63 & s | 128)
          } else if (s < 65536) {
            if ((t -= 3) < 0) break
            i.push(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128)
          } else {
            if (!(s < 1114112)) throw new Error('Invalid code point')
            if ((t -= 4) < 0) break
            i.push(s >> 18 | 240, s >> 12 & 63 | 128, s >> 6 & 63 | 128, 63 & s | 128)
          }
        }
        return i
      }

      function M(e) {
        return a.toByteArray(function (e) {
          if ((e = function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '')
          }(e).replace(L, '')).length < 2) {
            return ''
          }
          for (; e.length % 4 != 0;) e += '='
          return e
        }(e))
      }

      function z(e, t, s, a) {
        for (var n = 0; n < a && !(n + s >= t.length || n >= e.length); ++n) t[n + s] = e[n]
        return n
      }
    }).call(this, s('fRV1'))
  },
  '1TxV': function (e, t) {
    t.read = function (e, t, s, a, n) {
      var i, r, o = 8 * n - a - 1, l = (1 << o) - 1, c = l >> 1, d = -7, u = s ? n - 1 : 0, h = s ? -1 : 1, p = e[t + u]
      for (u += h, i = p & (1 << -d) - 1, p >>= -d, d += o; d > 0; i = 256 * i + e[t + u], u += h, d -= 8)
      for (r = i & (1 << -d) - 1, i >>= -d, d += a; d > 0; r = 256 * r + e[t + u], u += h, d -= 8)
      if (0 === i) {
        i = 1 - c
      } else {
        if (i === l) return r ? NaN : 1 / 0 * (p ? -1 : 1)
        r += Math.pow(2, a), i -= c
      }
      return (p ? -1 : 1) * r * Math.pow(2, i - a)
    }, t.write = function (e, t, s, a, n, i) {
      var r, o, l, c = 8 * i - n - 1, d = (1 << c) - 1, u = d >> 1, h = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = a ? 0 : i - 1, _ = a ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0
      for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0, r = d) : (r = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -r)) < 1 && (r--, l *= 2), (t += r + u >= 1 ? h / l : h * Math.pow(2, 1 - u)) * l >= 2 && (r++, l /= 2), r + u >= d ? (o = 0, r = d) : r + u >= 1 ? (o = (t * l - 1) * Math.pow(2, n), r += u) : (o = t * Math.pow(2, u - 1) * Math.pow(2, n), r = 0)); n >= 8; e[s + p] = 255 & o, p += _, o /= 256, n -= 8)
      for (r = r << n | o, c += n; c > 0; e[s + p] = 255 & r, p += _, r /= 256, c -= 8)
      e[s + p - _] |= 128 * m
    }
  },
  '2Daw': function (e, t, s) {
    'use strict'
    s.d(t, 'a', (function () {
      return E
    }))
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('LCtV'), o = s('3XMw'), l = s.n(o), c = s('VPdC'), d = s('pKoL'), u = s('MWbm'),
      h = s('rFBM'), p = s('/yvb'), _ = s('9Xij'), m = s('rHpw'), b = s('hOZg'), g = s('Mbn/'), f = (s('IAdD'), s('Lsrn')), k = s('k/Ka')
    const y = (e = {}) => Object(k.a)('svg', Object.assign({}, e, {
      style: [ f.a.root, e.style ],
      viewBox: '0 0 24 24'
    }), i.createElement('g', null, i.createElement('path', { d: 'M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z' }), i.createElement('path', { d: 'M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z' })))
    y.metadata = {
      width: 24,
      height: 24
    }
    var v = y
    const w = l.a.b87ca51a, C = l.a.eebff22c

    class E extends i.Component {
      render() {
        const {
            borderRadius: e,
            maskStyle: t,
            mediaItem: s,
            onAddMediaFiles: a,
            onCrop: n,
            onRemove: r,
            rootStyle: o,
            withDragDrop: l
          } = this.props, c = s && !s.uploader,
          d = i.createElement(i.Fragment, null, this._renderPreview(), c ? null : i.createElement(i.Fragment, null, i.createElement(u.a, { style: [ I.mask, t, x[e] ] }), i.createElement(u.a, { style: I.mediaPicker }, this._renderMediaEdit(), n ? this._renderMediaCrop() : null, r ? this._renderMediaRemove() : null)))
        return i.createElement(u.a, { style: [ I.container, o, x[e] ] }, l && a ? i.createElement(h.a, {
          onFilesAdded: a,
          style: [ I.dragDropContainer, x[e] ]
        }, d) : d)
      }

      _renderMediaRemove() {
        const { onRemove: e } = this.props
        return i.createElement(p.a, {
          accessibilityLabel: w,
          icon: i.createElement(b.a, null),
          onPress: e,
          style: I.rightButton,
          type: 'invertedText'
        })
      }

      _renderMediaCrop() {
        const {
          onCrop: e,
          onRemove: t
        } = this.props
        return i.createElement(p.a, {
          accessibilityLabel: C,
          icon: i.createElement(g.a, null),
          onPress: e,
          style: t ? I.middleButton : I.rightButton,
          type: 'invertedText'
        })
      }

      _renderMediaEdit() {
        const {
          acceptGifs: e,
          acceptVideo: t,
          accessibilityLabel: s,
          onAddMediaFiles: a,
          onEdit: n
        } = this.props, r = i.createElement(v, null)
        return a ? i.createElement(c.a, {
          acceptGifs: e,
          acceptVideo: t,
          accessibilityLabel: s,
          icon: r,
          onChange: a,
          type: 'invertedText'
        }) : i.createElement(p.a, {
          accessibilityLabel: s,
          icon: r,
          onPress: n,
          style: I.edit,
          type: 'invertedText'
        })
      }

      _renderPreview() {
        const {
          aspectRatio: e,
          borderRadius: t,
          currentContent: s,
          mediaItem: a
        } = this.props
        return a ? i.createElement(_.a, { ratio: e }, i.createElement(d.a, {
          borderRadius: t,
          enableGif: !1,
          mediaItem: a,
          style: I.mediaPreview,
          withCloseButton: !1
        })) : s
      }
    }

    n()(E, 'defaultProps', {
      acceptGifs: !1,
      acceptVideo: !1,
      aspectRatio: 1,
      borderRadius: r.a.NONE
    })
    const x = m.a.create(e => ({
      infinite: { borderRadius: e.borderRadii.infinite },
      medium: { borderRadius: e.borderRadii.small },
      none: { borderRadius: e.borderRadii.none }
    })), I = m.a.create(e => ({
      mediaPreview: { height: '100%' },
      mediaPicker: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        opacity: .75,
        position: 'absolute',
        top: 0,
        width: '100%'
      },
      rightButton: { marginLeft: e.spaces.large },
      middleButton: {
        marginLeft: e.spaces.large,
        marginRight: '-' + e.spaces.xSmall
      },
      mask: {
        backgroundColor: e.colors.translucentBlack30,
        height: '100%',
        position: 'absolute',
        top: 0,
        width: '100%'
      },
      container: {
        justifyContent: 'center',
        overflow: 'hidden'
      },
      dragDropContainer: {
        borderWidth: e.borderWidths.medium,
        borderColor: e.colors.transparent,
        borderStyle: 'solid'
      },
      edit: { margin: '-' + e.spaces.xSmall }
    }))
  },
  '3GUV': function (e, t, s) {
    'use strict'
    var a = s('ERkP'), n = s('rHpw'), i = s('MWbm')

    class r extends a.Component {
      shouldComponentUpdate() {
        return !1
      }

      render() {
        return a.createElement(i.a, { style: o.root })
      }
    }

    const o = n.a.create(e => ({ root: { height: 5 * parseInt(e.lineHeight, 10) + 'rem' } }))
    t.a = r
  },
  '53j7': function (e, t, s) {
    'use strict'
    s.d(t, 'f', (function () {
      return g
    })), s.d(t, 'g', (function () {
      return f
    })), s.d(t, 'a', (function () {
      return y
    })), s.d(t, 'c', (function () {
      return w
    })), s.d(t, 'b', (function () {
      return E
    })), s.d(t, 'd', (function () {
      return I
    })), s.d(t, 'e', (function () {
      return S
    })), s.d(t, 'h', (function () {
      return O
    })), s.d(t, 'i', (function () {
      return T
    })), s.d(t, 'j', (function () {
      return R
    }))
    s('IAdD'), s('JtPf'), s('kYxP')
    var a = s('oEOe'), n = s('AspN'), i = s('/kEJ'), r = s('XMGw'), o = s('Ssj5')
    const l = r.a + '/profile', c = 'rweb/' + l, d = e => `${c}/${e}`, u = a.a(c, 'REMOVE_PROFILE_BANNER'), h = a.a(c, 'UPDATE_PROFILE'),
      p = a.a(c, 'UPDATE_PROFILE_AVATAR'), _ = a.a(c, 'UPDATE_PROFILE_BANNER'), m = a.a(c, 'UPLOAD_MEDIA'), b = {
        avatarMediaId: null,
        bannerMediaId: null,
        isUploading: !1
      }
    const g = e => e[l].avatarMediaId, f = e => e[l].bannerMediaId, k = d('ADD_AVATAR_MEDIA'), y = e => ({
        meta: { mediaId: e },
        type: k
      }), v = d('REMOVE_AVATAR_MEDIA'), w = e => ({
        meta: { mediaId: e },
        type: v
      }), C = d('ADD_BANNER_MEDIA'), E = e => ({
        meta: { mediaId: e },
        type: C
      }), x = d('REMOVE_BANNER_MEDIA'), I = e => ({
        meta: { mediaId: e },
        type: x
      }), S = e => (t, s, { api: n }) => a.b(t, {
        params: e,
        request: n.Settings.removeProfileBanner
      })({
        actionTypes: u,
        context: 'ACTION_REMOVE_USER_BANNER'
      }, e => {
        if (e) return [ Object(i.c)({ users: { [e.id_str]: Object.assign({}, e, { profile_banner_url: null }) } }) ]
      }), O = e => (t, s, { api: n }) => a.b(t, {
        params: e,
        request: n.Settings.updateProfile
      })({
        actionTypes: h,
        context: 'ACTION_UPDATE_PROFILE_SETTINGS'
      }, e => {
        if (e && e.entities) return [ Object(i.c)(e.entities) ]
      }), A = (e, t, s) => r => (o, l, { api: c }) => {
        o({ type: m.REQUEST })
        const d = n.k(r)
        return o(d).then(([ n ]) => {
          o([ { type: m.SUCCESS }, { type: e.REQUEST } ])
          return a.b(o, {
            params: { media_id: n.uploadId },
            request: s(c)
          })({
            actionTypes: h,
            context: t
          }, e => {
            if (e) return [ Object(i.c)({ users: { [e.id_str]: e } }) ]
          })
        }, e => (o({ type: m.FAILURE }), Promise.reject(e)))
      }, T = A(p, 'ACTION_UPDATE_USER_AVATAR', e => e.Settings.updateProfileAvatar),
      R = A(_, 'ACTION_UPDATE_USER_BANNER', e => e.Settings.updateProfileBanner)
    o.a.register({
      [l]: function (e = b, t = {}) {
        switch (t.type) {
          case k:
            return Object.assign({}, e, { avatarMediaId: t.meta.mediaId })
          case v:
            return Object.assign({}, e, { avatarMediaId: null })
          case C:
            return Object.assign({}, e, { bannerMediaId: t.meta.mediaId })
          case x:
            return Object.assign({}, e, { bannerMediaId: null })
          case m.REQUEST:
            return Object.assign({}, e, { isUploading: !0 })
          case m.FAILURE:
          case m.SUCCESS:
            return Object.assign({}, e, { isUploading: !1 })
          default:
            return e
        }
      }
    })
  },
  '5UID': function (e, t, s) {
    'use strict'
    var a = s('ERkP'), n = s('3XMw'), i = s.n(n), r = s('rHpw'), o = s('+/1j'), l = s('MWbm')
    const c = i.a.e5b0063d
    let d = 0

    class u extends a.Component {
      constructor() {
        super(), this._listDomId = 'accessible-list-' + d, d += 1
      }

      render() {
        const {
          children: e,
          title: t
        } = this.props, s = c({ title: t })
        return a.createElement(l.a, {
          accessibilityRole: 'region',
          'aria-labelledby': this._listDomId
        }, a.createElement(o.a, {
          accessibilityRole: 'heading',
          'aria-level': 1,
          nativeID: this._listDomId,
          style: r.a.visuallyHidden
        }, t), a.createElement(l.a, { accessibilityLabel: s }, e))
      }
    }

    t.a = u
  },
  '6XNv': function (e, t, s) {
    'use strict'
    s('IAdD'), s('kYxP')
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('t62R'), o = s('piX5'), l = s('FG+G'), c = s('rHpw'), d = (s('aWzz'), s('k/Ka')),
      u = s('MWbm')
    const h = i.forwardRef((e, t) => Object(d.a)('select', Object.assign({}, e, { ref: t }))), p = e => Object(d.a)('option', e)

    class _ extends i.PureComponent {
      constructor(...e) {
        super(...e), n()(this, '_selectRef', i.createRef()), n()(this, 'state', { isFocused: !1 }), n()(this, '_handleChange', e => {
          const {
            onChange: t,
            withEmptyOption: s
          } = this.props, {
            selectedIndex: a,
            value: n
          } = e.target
          t && t(n, a - (s ? 1 : 0))
        }), n()(this, '_handleBlur', e => {
          const { onBlur: t } = this.props
          this.setState({ isFocused: !1 }), t && t()
        }), n()(this, '_handleFocus', e => {
          const { onFocus: t } = this.props
          this.setState({ isFocused: !0 }), t && t()
        })
      }

      componentDidMount() {
        this.props.autofocus && this._selectRef && this._selectRef.current && this._selectRef.current.focus()
      }

      render() {
        const {
          style: e,
          disabled: t,
          options: s,
          value: a,
          label: n,
          hasError: r,
          errorText: c,
          helperText: d,
          testID: _,
          withEmptyOption: b
        } = this.props, { isFocused: g } = this.state
        return i.createElement(i.Fragment, null, i.createElement(u.a, { style: [ o.a.border, m.container, t && o.a.disabled, g && o.a.focusedBorderValid, (r || c) && o.a.invalidBorderColor, g && (r || c) && o.a.focusedBorderInvalid, e ] }, this._renderLabel(), i.createElement(h, {
          accessibilityLabel: n,
          disabled: t,
          id: n,
          onBlur: this._handleBlur,
          onChange: this._handleChange,
          onFocus: this._handleFocus,
          ref: this._selectRef,
          style: [ m.select, t && o.a.disabled ],
          testID: _ || '',
          value: a
        }, b ? i.createElement(p, {
          disabled: !0,
          style: m.option,
          value: ''
        }) : null, s.map(e => {
          const {
            disabled: t,
            label: s,
            value: a
          } = e
          return i.createElement(p, {
            disabled: t,
            key: `${s}-${a}`,
            style: m.option,
            value: a
          }, s)
        })), i.createElement(l.a, { style: [ m.dropdownCaret, g && o.a.validColor, (r || c) && o.a.invalidColor ] })), d ? this._renderHelperText() : null, c ? this._renderErrorText() : null)
      }

      _renderLabel() {
        const {
          errorText: e,
          hasError: t,
          label: s
        } = this.props, { isFocused: a } = this.state
        return i.createElement(r.c, {
          color: t || e ? 'red500' : a ? 'primary' : 'gray600',
          for: s,
          style: m.label
        }, s)
      }

      _renderHelperText() {
        return i.createElement(u.a, { accessibilityLiveRegion: 'polite' }, i.createElement(r.c, {
          color: 'gray600',
          style: m.helperText
        }, this.props.helperText))
      }

      _renderErrorText() {
        return i.createElement(u.a, { accessibilityLiveRegion: 'polite' }, i.createElement(r.c, {
          color: 'red500',
          style: m.helperText
        }, this.props.errorText))
      }
    }

    n()(_, 'defaultProps', {
      disabled: !1,
      autofocus: !1,
      withEmptyOption: !1
    }), _.propTypes = {}
    const m = c.a.create(e => ({
      container: { backgroundColor: e.colors.cellBackground },
      dropdownCaret: {
        color: e.colors.gray600,
        height: '1.5em',
        pointerEvents: 'none',
        position: 'absolute',
        marginTop: '-0.75em',
        top: '50%',
        right: e.spaces.xSmall
      },
      label: {
        position: 'absolute',
        fontSize: e.fontSizes.small,
        paddingHorizontal: e.spaces.xxSmall,
        paddingTop: e.spaces.xxSmall,
        pointerEvents: 'none'
      },
      option: { backgroundColor: e.colors.navigationBackground },
      select: {
        appearance: 'none',
        backgroundColor: 'transparent',
        borderRadius: e.borderWidths.none,
        borderWidth: e.borderWidths.none,
        color: e.colors.text,
        cursor: 'pointer',
        fontSize: e.fontSizes.large,
        margin: 0,
        marginTop: e.spaces.xxSmall,
        outlineStyle: 'none',
        padding: 0,
        paddingTop: e.spaces.medium,
        paddingBottom: e.spaces.xxSmall,
        paddingHorizontal: e.spaces.xxSmall
      },
      helperText: {
        fontSize: e.fontSizes.small,
        paddingHorizontal: e.spaces.xxSmall,
        paddingTop: e.spaces.micro
      }
    }))
    t.a = _
  },
  '9D1O': function (e, t, s) {
    'use strict'
    s.d(t, 'k', (function () {
      return v
    })), s.d(t, 'r', (function () {
      return w
    })), s.d(t, 'j', (function () {
      return C
    })), s.d(t, 'i', (function () {
      return E
    })), s.d(t, 'n', (function () {
      return x
    })), s.d(t, 'o', (function () {
      return I
    })), s.d(t, 'p', (function () {
      return S
    })), s.d(t, 'h', (function () {
      return O
    })), s.d(t, 'q', (function () {
      return A
    })), s.d(t, 'l', (function () {
      return T
    })), s.d(t, 's', (function () {
      return R
    })), s.d(t, 'm', (function () {
      return D
    })), s.d(t, 'b', (function () {
      return j
    })), s.d(t, 't', (function () {
      return N
    })), s.d(t, 'w', (function () {
      return B
    })), s.d(t, 'f', (function () {
      return L
    })), s.d(t, 'u', (function () {
      return U
    })), s.d(t, 'c', (function () {
      return V
    })), s.d(t, 'y', (function () {
      return M
    })), s.d(t, 'a', (function () {
      return z
    })), s.d(t, 'g', (function () {
      return q
    })), s.d(t, 'v', (function () {
      return H
    })), s.d(t, 'd', (function () {
      return G
    })), s.d(t, 'e', (function () {
      return Y
    })), s.d(t, 'x', (function () {
      return W
    }))
    s('IAdD'), s('JtPf'), s('DZ+c')
    var a = s('LdEA'), n = s.n(a), i = s('k49u'), r = s('zrOZ'), o = s('OIs+'), l = s('kGix'), c = s('Ssj5'), d = s('oEOe'), u = s('YlqV'),
      h = s('q82E')
    const p = Object(d.a)('rweb/ocf', 'FETCH'), _ = Object(d.a)('rweb/ocf', 'START'), m = Object(d.a)('rweb/ocf', 'VERIFY_IDENTIFIER'),
      b = Object(r.a)([ 'signup' ]), g = s('i+/A'), f = {
        currentSubtask: null,
        failureMessage: '',
        fetchStatus: l.a.NONE,
        flowName: null,
        flowToken: null,
        shouldAbort: !1,
        shouldEndFlow: !1,
        submitFailed: !1,
        startLocation: {},
        subtasks: [],
        subtaskInputs: {},
        navigationContext: { action: '' },
        navigationStack: [],
        flowData: {}
      }, k = e => {
        const t = e && Object(u.f)(e)
        return t === h.p.EmailVerification || t === h.p.PhoneVerification
      }, y = e => e === i.a.ValidationFailure || e === i.a.OnboardingFlowFailure || e === i.a.OnboardingFlowRetriableFailure
    c.a.register({
      ocf: function (e = f, t) {
        switch (t.type) {
          case _.REQUEST:
            return Object.assign({}, f, {
              fetchStatus: l.a.LOADING,
              flowName: t.meta.flowName,
              startLocation: e.startLocation
            })
          case p.REQUEST:
            return Object.assign({}, e, {
              fetchStatus: l.a.LOADING,
              submitFailed: !1
            })
          case'rweb/ocf/NAVIGATE': {
            const {
              navigationContext: s,
              navigationStack: a,
              sendPinCode: n,
              subtaskInputs: i
            } = t.payload, r = Object.assign({}, e.subtaskInputs)
            for (const e in r) i[e] && delete r[e]
            return Object.assign({}, e, {
              currentSubtask: e.subtasks.find(e => e.subtask_id === t.payload.subtaskId),
              navigationContext: s,
              subtaskInputs: r,
              submitFailed: !1,
              navigationStack: a,
              sendPinCode: n
            })
          }
          case'rweb/ocf/ATTRIBUTE':
            return Object.assign({}, e, { startLocation: t.payload })
          case'rweb/ocf/UPDATE': {
            const {
              subtaskInputs: s,
              flowData: a
            } = t.payload
            return Object.assign({}, e, {
              subtaskInputs: Object.assign({}, e.subtaskInputs, s),
              flowData: Object.assign({}, e.flowData, a)
            })
          }
          case _.FAILURE: {
            const s = t.payload.errors[0].code, a = t.payload.errors[0].message, n = s !== o.a.Offline, i = y(s) ? a : void 0
            return Object.assign({}, e, {
              fetchStatus: l.a.FAILED,
              failureMessage: i,
              shouldAbort: n
            })
          }
          case p.FAILURE: {
            const s = t.payload.errors[0].code, a = t.payload.errors[0].message, n = y(s) ? a : void 0, r = !((e, t) => {
              const s = e === o.a.Offline || e === i.a.ValidationFailure || e === i.a.OnboardingFlowRetriableFailure,
                a = !!t && !h.j.has(Object(u.f)(t))
              return s && a
            })(s, e.currentSubtask)
            return Object.assign({}, e, {
              fetchStatus: l.a.LOADED,
              failureMessage: n,
              shouldAbort: r,
              submitFailed: !0
            })
          }
          case m.FAILURE: {
            const s = t.payload.errors[0].code, a = t.payload.errors[0].message, n = y(s) ? a : void 0
            return Object.assign({}, e, {
              verificationSendFailureMessage: n,
              sendPinCode: !1
            })
          }
          case _.SUCCESS:
          case p.SUCCESS: {
            const {
              flow_token: s,
              subtasks: a
            } = t.payload, { isTaskNavigation: n } = t.meta || {}, i = a && a.length ? a[0] : null, r = k(i), o = !!n && !i
            return Object.assign({}, e, {
              currentSubtask: i,
              fetchStatus: l.a.LOADED,
              flowToken: s,
              sendPinCode: r,
              shouldEndFlow: o,
              submitFailed: !1,
              subtasks: a,
              subtaskInputs: {},
              navigationStack: i ? [ i.subtask_id ] : []
            })
          }
          case'rweb/ocf/CLEAR':
            return Object.assign({}, f)
          case'rweb/ocf/RESUME':
            return t.payload
          case m.REQUEST:
            return Object.assign({}, e, {
              verificationSendFailureMessage: void 0,
              sendPinCode: !1
            })
          default:
            return e
        }
      }
    })
    const v = e => e.ocf.flowToken, w = e => e.ocf.subtasks, C = e => e.ocf.fetchStatus, E = e => e.ocf.failureMessage,
      x = e => e.ocf.shouldAbort, I = e => e.ocf.shouldEndFlow, S = e => e.ocf.submitFailed, O = e => e.ocf.currentSubtask,
      A = e => e.ocf.subtaskInputs, T = e => e.ocf.navigationContext, R = e => e.ocf.verificationSendFailureMessage,
      P = e => e.ocf.navigationStack, D = e => {
        const t = P(e), s = t ? t.length : 0
        if (s <= 1) return null
        const a = e.ocf.subtasks.find(e => e.subtask_id === t[s - 2])
        return a.alert_dialog ? t[s - 3] : t[s - 2]
      }, j = ({ clearPersistence: e } = {}) => (t, s, { userPersistence: a }) => {
        e && a.set('rweb/ocf', {}), t({ type: 'rweb/ocf/CLEAR' })
      }, N = (e = {}) => (t, s, {
        api: a,
        userPersistence: n
      }) => {
        const { flow_name: i } = e
        return (b.has(i) ? n.get('rweb/ocf', 36e5) : Promise.resolve(void 0)).then(s => i && s && s[i] ? t({
          payload: s[i],
          type: 'rweb/ocf/RESUME'
        }) : t(F(e)))
      }, F = (e = {}) => (t, s, {
        api: a,
        userPersistence: n
      }) => {
        const { flow_name: i } = e
        return Object(d.b)(t, {
          params: e,
          request: a.Ocf.task
        })({
          actionTypes: _,
          context: 'START_FLOW',
          meta: { flowName: i }
        }).then(e => (b.has(i) && 'success' === e.status && n.set('rweb/ocf', { [i]: s().ocf }), e))
      }, B = (e, t = {}, s = {}) => (a, n) => {
        a({
          type: 'rweb/ocf/UPDATE',
          payload: {
            subtaskId: e,
            subtaskInputs: { [e]: t },
            flowData: s
          }
        })
      }, L = ({
                subtaskId: e,
                navigationContext: t,
                destructive: s,
                fromHiddenSubtask: a
              }) => (n, i) => {
        const r = i(), o = P(r), l = o.indexOf(e)
        let c = [], d = {}
        if (a && o.length) {
          c = o.slice(0, -1).concat([ e ])
        } else if (-1 === l) {
          c = o.concat([ e ])
        } else {
          const e = l + 1
          c = o.slice(0, e), s && (d = o.slice(e, o.length).reduce((e, t) => Object.assign({}, e, { [t]: {} }), {}))
        }
        const u = (e => t => e.ocf.subtasks.find(e => e.subtask_id === t))(r)(e), p = t && t.action,
          _ = p === h.o.ResendSms || p === h.o.ResendVoice || p === h.o.ResendEmail
        'clear' === p && (d[e] = {})
        const m = k(u) && (!p || _)
        n({
          type: 'rweb/ocf/NAVIGATE',
          payload: {
            navigationContext: Object.assign({ action: '' }, t),
            sendPinCode: m,
            subtaskId: e,
            subtaskInputs: d,
            navigationStack: c
          }
        })
      }, U = (e = {}) => {
        let { isTaskNavigation: t } = e, s = n()(e, [ 'isTaskNavigation' ])
        return (e, a, {
          api: n,
          userPersistence: i
        }) => {
          const r = a(), o = v(r), l = ((e, t) => Object.keys(t).map(s => {
            const a = e.find(e => e.subtask_id === s), n = a && Object(u.e)(a)
            return {
              subtask_id: a.subtask_id,
              [n]: t[s]
            }
          }))(w(r), A(r)), c = Object.assign({}, s, {
            flow_token: o,
            subtask_inputs: l
          })
          return Object(d.b)(e, {
            params: c,
            request: n.Ocf.task
          })({
            actionTypes: p,
            context: 'SUBMIT_FLOW',
            meta: { isTaskNavigation: t }
          }).then(e => {
            const t = a().ocf
            return i.set('rweb/ocf', { [t.flowName]: e.subtasks.length && 'success' === e.status ? t : void 0 }), e
          })
        }
      }
    const V = (e, t) => (s, a) => {
        const {
          should_generate: n,
          next_link: i
        } = t, { flowData: r } = a().ocf, o = n ? g(Math.ceil(10)).toString('hex').slice(0, 20) : r.OCF_GENERATED_PASSWORD
        B(e, {
          password: o,
          link: i.link_id
        }, { OCF_GENERATED_PASSWORD: o })(s, a)
      }, M = e => (t, s, { api: a }) => {
        if (s().ocf.sendPinCode) {
          const n = v(s()), i = Object.assign({}, e, { flow_token: n })
          return Object(d.b)(t, {
            params: i,
            request: a.Ocf.verifyUserIdentifier
          })({
            actionTypes: m,
            context: 'VERIFY_IDENTIFIER'
          })
        }
        return Promise.resolve({})
      }, z = e => (t, s, { api: a }) => a.Ocf.callOnboardingPath(e), q = e => (t, s, { api: a }) => a.Ocf.removeContacts(e),
      H = e => (t, s, { api: a }) => a.Ocf.syncContacts(e), G = e => (t, s, { api: a }) => a.Ocf.getContactsImportStatus(e),
      Y = e => (t, s, { api: a }) => a.Ocf.getVerificationStatus(e), W = e => (t, s, { api: a }) => a.Ocf.verificationLink(e)
  },
  H9wA: function (e, t, s) {
    'use strict'
    s.d(t, 'a', (function () {
      return n
    }))
    var a = s('aWzz')
    const n = {
      accessibilityLabel: a.string,
      accessibilityLiveRegion: Object(a.oneOf)([ 'assertive', 'none', 'polite' ]),
      importantForAccessibility: a.bool,
      style: a.any
    }
  },
  'JfD+': function (e, t, s) {
    var a = s('+ZX+'), n = a.Buffer

    function i(e, t) {
      for (var s in e) t[s] = e[s]
    }

    function r(e, t, s) {
      return n(e, t, s)
    }

    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = a : (i(a, t), t.Buffer = r), r.prototype = Object.create(n.prototype), i(n, r), r.from = function (e, t, s) {
      if ('number' == typeof e) throw new TypeError('Argument must not be a number')
      return n(e, t, s)
    }, r.alloc = function (e, t, s) {
      if ('number' != typeof e) throw new TypeError('Argument must be a number')
      var a = n(e)
      return void 0 !== t ? 'string' == typeof s ? a.fill(t, s) : a.fill(t) : a.fill(0), a
    }, r.allocUnsafe = function (e) {
      if ('number' != typeof e) throw new TypeError('Argument must be a number')
      return n(e)
    }, r.allocUnsafeSlow = function (e) {
      if ('number' != typeof e) throw new TypeError('Argument must be a number')
      return a.SlowBuffer(e)
    }
  },
  K2mq: function (e, t, s) {
    'use strict'
    s.r(t)
    var a = s('97Jx'), n = s.n(a), i = s('ERkP'), r = s('gPQO')
    t.default = e => i.createElement(r.default, n()({}, e, { flowName: 'signup' }))
  },
  LXAX: function (e, t, s) {
    'use strict'
    s.d(t, 'b', (function () {
      return d
    })), s.d(t, 'a', (function () {
      return u
    }))
    s('IAdD')
    var a = s('XMGw'), n = s('Ssj5'), i = s('oEOe')
    const r = a.a + '/usernames', o = 'rweb/' + r, l = Object(i.a)(o, 'FETCH_USERNAMES'), c = { isLoaded: !1 }
    const d = e => e[r], u = e => (t, s, { api: a }) => Object(i.b)(t, {
      params: e,
      request: a.Settings.usernameAvailable
    })({
      actionTypes: l,
      context: 'FETCH_SETTINGS_USERNAME_AVAILABLE',
      meta: { username: e.username }
    }), h = `${o}/${'CLEAR_USERNAMES'}`
    n.a.register({
      [r]: function (e = c, t = {}) {
        switch (t.type) {
          case l.REQUEST:
            return Object.assign({}, e, { isLoading: !0 })
          case l.FAILURE:
            return Object.assign({}, e, { isLoading: !1 })
          case l.SUCCESS:
            return Object.assign({}, e, t.payload, {
              username: t.meta.username,
              isLoading: !1
            })
          case h:
            return { isLoading: !1 }
          default:
            return e
        }
      }
    })
  },
  Lam0: function (e, t, s) {
    'use strict'
    s.d(t, 'a', (function () {
      return D
    }))
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s.n(i), o = s('aWzz'), l = s.n(o)

    function c() {
      return (c = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = arguments[t]
          for (var a in s) Object.prototype.hasOwnProperty.call(s, a) && (e[a] = s[a])
        }
        return e
      }).apply(this, arguments)
    }

    function d(e) {
      if (void 0 === e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
      return e
    }

    var u = function (e) {
      var t, s

      function a() {
        var t
        return (t = e.call(this) || this).handleExpired = t.handleExpired.bind(d(t)), t.handleErrored = t.handleErrored.bind(d(t)), t.handleRecaptchaRef = t.handleRecaptchaRef.bind(d(t)), t
      }

      s = e, (t = a).prototype = Object.create(s.prototype), t.prototype.constructor = t, t.__proto__ = s
      var n = a.prototype
      return n.getValue = function () {
        return this.props.grecaptcha && void 0 !== this._widgetId ? this.props.grecaptcha.getResponse(this._widgetId) : null
      }, n.getWidgetId = function () {
        return this.props.grecaptcha && void 0 !== this._widgetId ? this._widgetId : null
      }, n.execute = function () {
        var e = this.props.grecaptcha
        if (e && void 0 !== this._widgetId) return e.execute(this._widgetId)
        this._executeRequested = !0
      }, n.reset = function () {
        this.props.grecaptcha && void 0 !== this._widgetId && this.props.grecaptcha.reset(this._widgetId)
      }, n.handleExpired = function () {
        this.props.onExpired ? this.props.onExpired() : this.props.onChange && this.props.onChange(null)
      }, n.handleErrored = function () {
        this.props.onErrored && this.props.onErrored()
      }, n.explicitRender = function () {
        if (this.props.grecaptcha && this.props.grecaptcha.render && void 0 === this._widgetId) {
          var e = document.createElement('div')
          this._widgetId = this.props.grecaptcha.render(e, {
            sitekey: this.props.sitekey,
            callback: this.props.onChange,
            theme: this.props.theme,
            type: this.props.type,
            tabindex: this.props.tabindex,
            'expired-callback': this.handleExpired,
            'error-callback': this.handleErrored,
            size: this.props.size,
            stoken: this.props.stoken,
            hl: this.props.hl,
            badge: this.props.badge
          }), this.captcha.appendChild(e)
        }
        this._executeRequested && this.props.grecaptcha && void 0 !== this._widgetId && (this._executeRequested = !1, this.execute())
      }, n.componentDidMount = function () {
        this.explicitRender()
      }, n.componentDidUpdate = function () {
        this.explicitRender()
      }, n.componentWillUnmount = function () {
        void 0 !== this._widgetId && (this.delayOfCaptchaIframeRemoving(), this.reset())
      }, n.delayOfCaptchaIframeRemoving = function () {
        var e = document.createElement('div')
        for (document.body.appendChild(e), e.style.display = 'none'; this.captcha.firstChild;) e.appendChild(this.captcha.firstChild)
        setTimeout((function () {
          document.body.removeChild(e)
        }), 5e3)
      }, n.handleRecaptchaRef = function (e) {
        this.captcha = e
      }, n.render = function () {
        var e = this.props,
          t = (e.sitekey, e.onChange, e.theme, e.type, e.tabindex, e.onExpired, e.onErrored, e.size, e.stoken, e.grecaptcha, e.badge, e.hl, function (e, t) {
            if (null == e) return {}
            var s, a, n = {}, i = Object.keys(e)
            for (a = 0; a < i.length; a++) s = i[a], t.indexOf(s) >= 0 || (n[s] = e[s])
            return n
          }(e, [ 'sitekey', 'onChange', 'theme', 'type', 'tabindex', 'onExpired', 'onErrored', 'size', 'stoken', 'grecaptcha', 'badge', 'hl' ]))
        return r.a.createElement('div', c({}, t, { ref: this.handleRecaptchaRef }))
      }, a
    }(r.a.Component)
    u.displayName = 'ReCAPTCHA', u.propTypes = {
      sitekey: l.a.string.isRequired,
      onChange: l.a.func,
      grecaptcha: l.a.object,
      theme: l.a.oneOf([ 'dark', 'light' ]),
      type: l.a.oneOf([ 'image', 'audio' ]),
      tabindex: l.a.number,
      onExpired: l.a.func,
      onErrored: l.a.func,
      size: l.a.oneOf([ 'compact', 'normal', 'invisible' ]),
      stoken: l.a.string,
      hl: l.a.string,
      badge: l.a.oneOf([ 'bottomright', 'bottomleft', 'inline' ])
    }, u.defaultProps = {
      onChange: function () {
      },
      theme: 'light',
      type: 'image',
      tabindex: 0,
      size: 'normal',
      badge: 'bottomright'
    }
    var h = s('oXkQ'), p = s.n(h)

    function _() {
      return (_ = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = arguments[t]
          for (var a in s) Object.prototype.hasOwnProperty.call(s, a) && (e[a] = s[a])
        }
        return e
      }).apply(this, arguments)
    }

    var m = {}, b = 0

    function g() {
      return 'undefined' != typeof window && window.recaptchaOptions || {}
    }

    var f, k, y = 'onloadcallback', v = g(), w = (f = function () {
      var e = g(), t = e.lang ? '&hl=' + e.lang : ''
      return 'https://' + (e.useRecaptchaNet ? 'recaptcha.net' : 'www.google.com') + '/recaptcha/api.js?onload=' + y + '&render=explicit' + t
    }, k = (k = {
      callbackName: y,
      globalName: 'grecaptcha',
      removeOnUnmount: v.removeOnUnmount || !1
    }) || {}, function (e) {
      var t = e.displayName || e.name || 'Component', s = function (t) {
        var s, a

        function n(e, s) {
          var a
          return (a = t.call(this, e, s) || this).state = {}, a.__scriptURL = '', a
        }

        a = t, (s = n).prototype = Object.create(a.prototype), s.prototype.constructor = s, s.__proto__ = a
        var r = n.prototype
        return r.asyncScriptLoaderGetScriptLoaderID = function () {
          return this.__scriptLoaderID || (this.__scriptLoaderID = 'async-script-loader-' + b++), this.__scriptLoaderID
        }, r.setupScriptURL = function () {
          return this.__scriptURL = 'function' == typeof f ? f() : f, this.__scriptURL
        }, r.asyncScriptLoaderHandleLoad = function (e) {
          var t = this
          this.setState(e, (function () {
            return t.props.asyncScriptOnLoad && t.props.asyncScriptOnLoad(t.state)
          }))
        }, r.asyncScriptLoaderTriggerOnScriptLoaded = function () {
          var e = m[this.__scriptURL]
          if (!e || !e.loaded) throw new Error('Script is not loaded.')
          for (var t in e.observers) e.observers[t](e)
          delete window[k.callbackName]
        }, r.componentDidMount = function () {
          var e = this, t = this.setupScriptURL(), s = this.asyncScriptLoaderGetScriptLoaderID(), a = k, n = a.globalName,
            i = a.callbackName, r = a.scriptId
          if (n && void 0 !== window[n] && (m[t] = {
            loaded: !0,
            observers: {}
          }), m[t]) {
            var o = m[t]
            return o && (o.loaded || o.errored) ? void this.asyncScriptLoaderHandleLoad(o) : void (o.observers[s] = function (t) {
              return e.asyncScriptLoaderHandleLoad(t)
            })
          }
          var l = {}
          l[s] = function (t) {
            return e.asyncScriptLoaderHandleLoad(t)
          }, m[t] = {
            loaded: !1,
            observers: l
          }
          var c = document.createElement('script')
          c.src = t, c.async = !0, r && (c.id = r)
          var d = function (e) {
            if (m[t]) {
              var s = m[t].observers
              for (var a in s) e(s[a]) && delete s[a]
            }
          }
          i && 'undefined' != typeof window && (window[i] = function () {
            return e.asyncScriptLoaderTriggerOnScriptLoaded()
          }), c.onload = function () {
            var e = m[t]
            e && (e.loaded = !0, d((function (t) {
              return !i && (t(e), !0)
            })))
          }, c.onerror = function () {
            var e = m[t]
            e && (e.errored = !0, d((function (t) {
              return t(e), !0
            })))
          }, document.body.appendChild(c)
        }, r.componentWillUnmount = function () {
          var e = this.__scriptURL
          if (!0 === k.removeOnUnmount) for (var t = document.getElementsByTagName('script'), s = 0; s < t.length; s += 1) t[s].src.indexOf(e) > -1 && t[s].parentNode && t[s].parentNode.removeChild(t[s])
          var a = m[e]
          a && (delete a.observers[this.asyncScriptLoaderGetScriptLoaderID()], !0 === k.removeOnUnmount && delete m[e])
        }, r.render = function () {
          var t = k.globalName, s = this.props, a = (s.asyncScriptOnLoad, s.forwardedRef), n = function (e, t) {
            if (null == e) return {}
            var s, a, n = {}, i = Object.keys(e)
            for (a = 0; a < i.length; a++) s = i[a], t.indexOf(s) >= 0 || (n[s] = e[s])
            return n
          }(s, [ 'asyncScriptOnLoad', 'forwardedRef' ])
          return t && 'undefined' != typeof window && (n[t] = void 0 !== window[t] ? window[t] : void 0), n.ref = a, Object(i.createElement)(e, n)
        }, n
      }(i.Component), a = Object(i.forwardRef)((function (e, t) {
        return Object(i.createElement)(s, _({}, e, { forwardedRef: t }))
      }))
      return a.displayName = 'AsyncScriptLoader(' + t + ')', a.propTypes = { asyncScriptOnLoad: l.a.func }, p()(a, e)
    })(u), C = s('MWbm'), E = s('t62R'), x = s('/yvb'), I = s('rHpw'), S = s('3XMw'), O = s.n(S)
    const A = O.a.c1df579e, T = O.a.b60eba9e, R = O.a.ba939777, P = O.a.bc6efc72

    class D extends i.Component {
      constructor(e, t) {
        super(e, t), n()(this, '_handlePass', e => {
          const { onChange: t } = this.props
          t && setTimeout(() => t(e), 1e3)
        }), n()(this, '_handleConsent', () => {
          const { onConsent: e } = this.props
          this.setState({ termsAccepted: !0 }), e && e()
        }), this.state = { termsAccepted: !1 }
      }

      _renderConsentForm() {
        const { nextButtonDisabled: e } = this.props
        return i.createElement(C.a, null, i.createElement(E.c, { style: j.guideCopy }, T), i.createElement(C.a, { style: j.button }, i.createElement(x.a, {
          disabled: e,
          onPress: this._handleConsent,
          size: 'normalLarge',
          type: 'secondary'
        }, A)), i.createElement(E.c, { color: 'gray600' }, i.createElement(O.a.I18NFormatMessage, { $i18n: 'hc37d3ba' }, i.createElement(E.c, { link: 'https://policies.google.com/privacy' }, P))))
      }

      _renderRecaptcha() {
        const { withConsentForm: e } = this.props
        return i.createElement(i.Fragment, null, e ? i.createElement(C.a, { style: j.recaptchaTitle }, i.createElement(E.c, { style: j.guideCopy }, R)) : null, i.createElement(C.a, { style: j.container }, i.createElement(w, {
          onChange: this._handlePass,
          sitekey: '6LfOP30UAAAAAFBC4jbzu890rTdXBXBNHx9eVZEX'
        })))
      }

      render() {
        const { withConsentForm: e } = this.props, { termsAccepted: t } = this.state
        return e && !t ? this._renderConsentForm() : this._renderRecaptcha()
      }
    }

    const j = I.a.create(e => ({
      container: {
        margin: 'auto',
        transitionProperty: 'opacity',
        transitionDelay: '2s'
      },
      button: { paddingVertical: e.spaces.medium },
      guideCopy: { paddingTop: e.spaces.xSmall },
      recaptchaTitle: { paddingBottom: e.spaces.medium }
    }))
  },
  'N+xe': function (e, t, s) {
    'use strict'
    s.r(t), s.d(t, 'VerificationLanding', (function () {
      return A
    }))
    s('MvUL')
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('9D1O'), o = s('oEGd'), l = s('hqKg'), c = s('Hw0q')
    const d = Object(c.b)('user_identifier'), u = Object(c.b)('phone'), h = Object(c.b)('email'), p = Object(c.b)('pin_code'),
      _ = Object(l.createSelector)(h, d, u, p, (e, t, s, a) => ({
        email: e,
        identifier: t,
        phone: s,
        pinCode: a
      })), m = { verificationLink: r.x }
    var b = Object(o.g)(_, m), g = s('kGix'), f = s('v//M'), k = s('3XMw'), y = s.n(k), v = s('fs1G'), w = s('YCSy'), C = s('MWbm'),
      E = s('cmUU'), x = s('rHpw')
    const I = y.a.b5474bd2, S = y.a.a9b8fb38, O = y.a.j24c37b2

    class A extends i.Component {
      constructor(e) {
        super(e), n()(this, '_render', () => i.createElement(E.a, {
          actionLabel: O,
          headline: this.state.title || '',
          onAction: this._handleCloseWindow,
          onClose: this._handleCloseWindow,
          subtext: this.state.message || '',
          withCloseButton: !1
        })), n()(this, '_handleCloseWindow', () => {
          window && window.close(), this.props.history.replace('/')
        }), this.state = {
          title: void 0,
          message: void 0,
          fetchStatus: g.a.LOADING
        }
      }

      componentDidMount() {
        const {
          history: e,
          location: t,
          verificationLink: s,
          identifier: a,
          email: n,
          phone: i,
          pinCode: r
        } = this.props
        return e.replace(t.pathname), s({
          user_identifier: a,
          email: n,
          phone: i,
          pin_code: r
        }).then(e => this.setState({
          fetchStatus: e.success ? g.a.LOADED : g.a.FAILED,
          title: e.title,
          message: e.message
        })).catch(() => this.setState({
          title: I,
          message: S,
          fetchStatus: g.a.FAILED
        }))
      }

      render() {
        const { history: e } = this.props
        return i.createElement(w.a, {
          hideLogo: !0,
          history: e
        }, i.createElement(C.a, { style: T.root }, i.createElement(f.a, {
          fetchStatus: this.state.fetchStatus,
          onRequestRetry: v.a,
          render: this._render,
          renderFailure: this._render,
          retryable: !1
        })))
      }
    }

    const T = x.a.create(e => ({
      root: {
        backgroundColor: e.colors.cellBackground,
        flexGrow: 1,
        flexShrink: 1
      }
    }))
    t.default = b(A)
  },
  NeAX: function (e, t, s) {
    'use strict'
    s.r(t), s.d(t, 'default', (function () {
      return y
    })), s.d(t, 'selectPreferences', (function () {
      return E
    })), s.d(t, 'selectData', (function () {
      return x
    })), s.d(t, 'selectUserPreferences', (function () {
      return I
    })), s.d(t, 'selectPreferencesFetchStatus', (function () {
      return S
    })), s.d(t, 'selectFetchDataStatus', (function () {
      return O
    })), s.d(t, 'selectAge', (function () {
      return A
    })), s.d(t, 'selectBirthdate', (function () {
      return T
    })), s.d(t, 'selectHasExactAge', (function () {
      return R
    })), s.d(t, 'selectGender', (function () {
      return P
    })), s.d(t, 'selectLanguage', (function () {
      return D
    })), s.d(t, 'selectSignupDetails', (function () {
      return j
    })), s.d(t, 'selectTwitterInterests', (function () {
      return N
    })), s.d(t, 'selectFetchTwitterInterestsStatus', (function () {
      return F
    })), s.d(t, 'selectPartnerInterests', (function () {
      return B
    })), s.d(t, 'selectFetchPartnerInterestsStatus', (function () {
      return L
    })), s.d(t, 'clearLocations', (function () {
      return U
    })), s.d(t, 'updateGender', (function () {
      return V
    })), s.d(t, 'updateLanguage', (function () {
      return M
    })), s.d(t, 'updateInterest', (function () {
      return z
    })), s.d(t, 'fetchPreferencesIfNeeded', (function () {
      return q
    })), s.d(t, 'updatePreferences', (function () {
      return G
    })), s.d(t, 'updateSettings', (function () {
      return Y
    })), s.d(t, 'fetchDataIfNeeded', (function () {
      return X
    })), s.d(t, 'createAudienceDownload', (function () {
      return Z
    })), s.d(t, 'createDataDownload', (function () {
      return $
    })), s.d(t, 'fetchTwitterInterestsIfNeeded', (function () {
      return Q
    })), s.d(t, 'fetchPartnerInterestsIfNeeded', (function () {
      return ee
    })), s.d(t, 'syncSettings', (function () {
      return ae
    }))
    s('IAdD'), s('JtPf'), s('kYxP')
    var a = s('RqPI'), n = s('P1r1'), i = s('cmwl'), r = s('hqKg'), o = s('kGix'), l = s('YeIG'), c = s('Ssj5'), d = s('oEOe')
    const u = 'rweb/personalization', h = Object(d.a)(u, 'FETCH_PREFERENCES'), p = Object(d.a)(u, 'UPDATE_PREFERENCES'),
      _ = Object(d.a)(u, 'FETCH_DATA'), m = Object(d.a)(u, 'UPDATE_COOKIES'), b = Object(d.a)(u, 'FETCH_TWITTER_INTERESTS'),
      g = Object(d.a)(u, 'FETCH_PARTNER_INTERESTS'), f = `${u}/${'CLEAR_LOCATIONS'}`
    const k = {
      preferences: {
        data: {},
        fetchStatus: o.a.NONE
      },
      data: {
        data: {},
        fetchStatus: o.a.NONE
      },
      twitter_interests: {
        data: {},
        fetchStatus: o.a.NONE
      },
      partner_interests: {
        data: {},
        fetchStatus: o.a.NONE
      }
    }

    function y(e = k, t) {
      switch (t.type) {
        case h.REQUEST:
          return Object.assign({}, e, { preferences: Object.assign({}, e.preferences, { fetchStatus: o.a.LOADING }) })
        case h.SUCCESS:
          return Object.assign({}, e, {
            preferences: {
              data: Object.assign({}, e.preferences.data, t.payload),
              error: null,
              fetchStatus: o.a.LOADED
            }
          })
        case h.FAILURE:
          return Object.assign({}, e, {
            preferences: Object.assign({}, e.preferences, {
              error: t.payload,
              fetchStatus: o.a.FAILED
            })
          })
        case p.REQUEST:
          return Object.assign({}, e, {
            preferences: {
              data: Object.assign({}, e.preferences.data, t.payload),
              error: null,
              fetchStatus: o.a.LOADED
            }
          })
        case _.REQUEST:
          return Object.assign({}, e, { data: Object.assign({}, e.data, { fetchStatus: o.a.LOADING }) })
        case _.SUCCESS:
          return Object.assign({}, e, {
            data: {
              data: Object.assign({}, e.data.data, t.payload),
              error: null,
              fetchStatus: o.a.LOADED
            }
          })
        case _.FAILURE:
          return Object.assign({}, e, {
            data: Object.assign({}, e.data, {
              error: t.payload,
              fetchStatus: o.a.FAILED
            })
          })
        case b.REQUEST:
          return Object.assign({}, e, { twitter_interests: Object.assign({}, e.twitter_interests, { fetchStatus: o.a.LOADING }) })
        case b.SUCCESS:
          return Object.assign({}, e, {
            twitter_interests: {
              data: Object.assign({}, e.twitter_interests.data, t.payload),
              error: null,
              fetchStatus: o.a.LOADED
            }
          })
        case b.FAILURE:
          return Object.assign({}, e, {
            twitter_interests: Object.assign({}, e.twitter_interests, {
              error: t.payload,
              fetchStatus: o.a.FAILED
            })
          })
        case g.REQUEST:
          return Object.assign({}, e, { partner_interests: Object.assign({}, e.partner_interests, { fetchStatus: o.a.LOADING }) })
        case g.SUCCESS:
          return Object.assign({}, e, {
            partner_interests: {
              data: Object.assign({}, e.partner_interests.data, t.payload),
              error: null,
              fetchStatus: o.a.LOADED
            }
          })
        case g.FAILURE:
          return Object.assign({}, e, {
            partner_interests: Object.assign({}, e.partner_interests, {
              error: t.payload,
              fetchStatus: o.a.FAILED
            })
          })
        case f:
          return Object.assign({}, e, { data: Object.assign({}, e.data, { data: Object.assign({}, e.data.data, { location_history: [] }) }) })
        default:
          return e
      }
    }

    c.a.register({ personalization: y })
    const v = {
        allowCookieUse: 'use_cookie_personalization',
        allowDeviceAccess: 'allow_logged_out_device_personalization',
        allowLocationHistoryUse: 'allow_location_history_personalization',
        allowPartnerships: 'allow_sharing_data_for_third_party_personalization',
        allowPersonalization: 'allow_ads_personalization'
      }, w = {
        allowCookieUse: 'use_cookie_personalization',
        allowDeviceAccess: 'link_logged_out_devices',
        allowPartnerships: 'share_data_with_third_party',
        allowPersonalization: 'allow_ads_personalization'
      }, C = {
        use_age_for_personalization: 'age_preferences',
        use_gender_for_personalization: 'gender_preferences'
      }, E = e => e.personalization.preferences.data, x = e => e.personalization.data.data,
      I = Object(r.createSelector)(a.e, E, n.f, (e, t, s) => {
        const [ a, n ] = e ? [ v, s ] : [ w, t ]
        return Object.keys(a).reduce((e, t) => (e[t] = n[a[t]], e), {})
      }), S = e => {
        const t = E(e)
        return Object(l.a)(t) ? e.personalization.preferences.fetchStatus : o.a.LOADED
      }, O = e => e.personalization.data.fetchStatus, A = e => e.personalization.data.data.age ? e.personalization.data.data.age : [],
      T = e => e.personalization.data.data.birth_date ? e.personalization.data.data.birth_date : '',
      R = e => !!e.personalization.data.data.has_exact_age, P = e => {
        const t = x(e), s = E(e), a = s.gender_preferences && s.gender_preferences.gender_override
        return a && a.type ? a : {
          type: t.gender,
          value: t.gender
        }
      }, D = e => e.personalization.data.data.languages ? e.personalization.data.data.languages : [],
      j = e => e.personalization.data.data.sign_up_details ? e.personalization.data.data.sign_up_details : {},
      N = e => e.personalization.twitter_interests.data, F = e => e.personalization.twitter_interests.fetchStatus,
      B = e => e.personalization.partner_interests.data, L = e => e.personalization.partner_interests.fetchStatus, U = () => (e, t) => {
        const s = t(), a = E(s), n = Date.now(),
          i = { location_preferences: Object.assign({}, a.location_preferences, { override_times: [ n ] }) }
        return e(G(i)).then(() => e({ type: f }))
      }, V = e => (t, s) => {
        const a = s(), n = E(a), i = { gender_preferences: Object.assign({}, n.gender_preferences, { gender_override: e }) }
        return t(G(i))
      }, M = (e, t) => (s, a) => {
        if (Object(l.a)(e)) return Promise.resolve()
        const n = a(), i = E(n), r = i.language_preferences.disabled_languages || [], o = r.indexOf(e), c = o > -1
        if (c && t) {
          r.splice(o, 1)
        } else {
          if (c || t) return Promise.resolve()
          r.push(e)
        }
        const d = { language_preferences: Object.assign({}, i.language_preferences, { disabled_languages: r }) }
        return s(G(d))
      }, z = (e, t, s) => (a, n) => {
        if (Object(l.a)(e) || -1 === [ 'ads', 'partner' ].indexOf(s)) return Promise.resolve()
        const i = 'partner' === s, r = n(), o = E(r).interest_preferences, c = i ? 'disabled_partner_interests' : 'disabled_interests',
          d = o[c], u = d.indexOf(e), h = u > -1
        if (h && t) {
          d.splice(u, 1)
        } else {
          if (h || t) return Promise.resolve()
          d.push(e)
        }
        const p = {
          interest_preferences: {
            disabled_interests: o.disabled_interests,
            disabled_partner_interests: o.disabled_partner_interests,
            [c]: d
          }
        }
        return a(G(p))
      }, q = () => (e, t, { api: s }) => {
        const a = t().personalization.preferences
        return a.fetchStatus !== o.a.LOADING && a.fetchStatus !== o.a.LOADED ? e(H()) : Promise.resolve()
      }, H = () => (e, t, { api: s }) => Object(d.b)(e, { request: s.Personalization.fetchPreferences })({
        actionTypes: h,
        context: 'FETCH_PERSONALIZATION_PREFERENCES'
      }), G = e => (t, s, { api: a }) => {
        if (Object(l.a)(e)) return Promise.resolve()
        return Object(d.c)(t, {
          params: { preferences: e },
          request: a.Personalization.updatePreferences
        })({
          actionTypes: p,
          context: 'ACTION_UPDATE_PERSONALIZATION_PREFERENCES',
          payload: e
        })
      }, Y = e => (t, s, {
        api: r,
        featureSwitches: o
      }) => {
        if (Object(l.a)(e)) return Promise.resolve()
        const c = s(), d = a.e(c), u = d ? v : w, h = Object.keys(e).reduce((t, s) => {
          if (s in u) {
            t[u[s]] = e[s]
          }
          if (s in C) {
            t[C[s]] = { [s]: e[s] }
          }
          return t
        }, {})
        return d ? t(n.G(h)).then(() => {
          Object(i.a)().then(e => {
            e.updateBranchTracking(o, r)
          }), t(se(h))
        }) : W(o, t, h, r)
      }, W = (e, t, s, a) => Object(d.c)(t, {
        params: { preferences: s },
        request: a.Personalization.updatePreferences
      })({
        actionTypes: p,
        context: 'ACTION_UPDATE_PERSONALIZATION_PREFERENCES',
        payload: s
      }).then(() => {
        Object(i.a)().then(t => {
          t.updateBranchTracking(e, a)
        })
      }), X = () => (e, t, { api: s }) => {
        const a = t().personalization.data
        return a.fetchStatus !== o.a.LOADING && a.fetchStatus !== o.a.LOADED ? e(K()) : Promise.resolve()
      }, K = () => (e, t, { api: s }) => Object(d.b)(e, { request: s.Personalization.fetchData })({
        actionTypes: _,
        context: 'FETCH_PERSONALIZATION_DATA'
      }), Z = () => (e, t, { api: s }) => Object(d.d)(e, { request: s.Personalization.createAudienceDownload })('CREATE_AUDIENCE_DOWNLOAD'),
      $ = () => (e, t, { api: s }) => Object(d.d)(e, { request: s.Personalization.createDataDownload })('CREATE_DATA_DOWNLOAD'),
      Q = () => (e, t, { api: s }) => {
        const a = t().personalization.twitter_interests
        return a.fetchStatus !== o.a.LOADING && a.fetchStatus !== o.a.LOADED ? e(J()) : Promise.resolve()
      }, J = () => (e, t, { api: s }) => Object(d.b)(e, { request: s.Personalization.fetchTwitterInterests })({
        actionTypes: b,
        context: 'FETCH_PERSONALIZATION_TWITTER_INTERESTS'
      }), ee = () => (e, t, { api: s }) => {
        const a = t().personalization.partner_interests
        return a.fetchStatus !== o.a.LOADING && a.fetchStatus !== o.a.LOADED ? e(te()) : Promise.resolve()
      }, te = () => (e, t, { api: s }) => Object(d.b)(e, { request: s.Personalization.fetchPartnerInterests })({
        actionTypes: g,
        context: 'FETCH_PERSONALIZATION_PARTNER_INTERESTS'
      }), se = e => (t, s, { api: a }) => {
        const n = {}
        if (e.hasOwnProperty('use_cookie_personalization') && (n.use_cookie_personalization = e.use_cookie_personalization), e.hasOwnProperty('allow_ads_personalization') && (n.allow_ads_personalization = e.allow_ads_personalization), Object(l.a)(n)) return Promise.resolve()
        return Object(d.b)(t, {
          params: n,
          request: a.Personalization.updateCookies
        })({
          actionTypes: m,
          context: 'APP_UPDATE_PERSONALIZATION_COOKIES',
          params: n
        })
      }, ae = () => (e, t, { api: s }) => Object(d.d)(e, { request: s.Personalization.syncSettings })('SYNC_SETTINGS')
  },
  P68U: function (e, t, s) {
    'use strict'
    s('x4t0'), s('kYxP')
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('rxPX'), o = s('AspN'), l = Object(r.a)().propsFromActions(() => ({
      addMedia: o.b,
      processMultipleMedia: o.d
    })), c = s('2Daw'), d = s('VPdC')

    class u extends i.Component {
      constructor(...e) {
        super(...e), n()(this, '_handleAddMediaFiles', e => {
          const {
            addMedia: t,
            location: s,
            onChange: a,
            onFailure: n,
            processMultipleMedia: i
          } = this.props, r = this._getAcceptedFileInputs(), o = Array.from(e).find(e => r.includes(e.type))
          o && t([ o ], { location: s }).then(e => {
            a && a(e.map(e => e.id)), i(e, { onFailure: n })
          })
        }), n()(this, '_getAcceptedFileInputs', () => {
          const {
            acceptGifs: e,
            acceptVideo: t
          } = this.props
          return Object(d.b)({
            acceptGifs: e,
            acceptVideo: t
          })
        })
      }

      render() {
        const {
          accessibilityLabel: e,
          acceptGifs: t,
          acceptVideo: s,
          aspectRatio: a,
          borderRadius: n,
          currentContent: r,
          maskStyle: o,
          mediaItem: l,
          onCrop: d,
          onRemove: u,
          rootStyle: h
        } = this.props
        return i.createElement(c.a, {
          acceptGifs: t,
          acceptVideo: s,
          accessibilityLabel: e,
          aspectRatio: a,
          borderRadius: n,
          currentContent: r,
          maskStyle: o,
          mediaItem: l,
          onAddMediaFiles: this._handleAddMediaFiles,
          onCrop: d,
          onRemove: u,
          rootStyle: h,
          withDragDrop: !0
        })
      }
    }

    n()(u, 'defaultProps', {
      acceptGifs: !1,
      acceptVideo: !1
    })
    const h = l(u)
    t.a = h
  },
  P7wY: function (e, t, s) {
    'use strict'
    s.d(t, 'a', (function () {
      return n
    })), s.d(t, 'b', (function () {
      return i
    }))
    var a = (e, t, s) => {
      const a = new Date
      let n = a.getFullYear() - e
      const i = a.getMonth() + 1 - t
      if (i < 0) {
        n -= 1
      } else if (0 === i) {
        a.getDate() - s < 0 && (n -= 1)
      }
      return n
    }
    const n = (e, t, s) => !!(e && t && s) && a(e, t, s) < 18, i = () => (new Date).getFullYear() - 120
  },
  Rl48: function (e, t) {
    var s = {}.toString
    e.exports = Array.isArray || function (e) {
      return '[object Array]' == s.call(e)
    }
  },
  S8sr: function (e, t, s) {
    'use strict'
    s.d(t, 'a', (function () {
      return f
    }))
    s('IAdD'), s('x4t0'), s('Ysgh')
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('nS1w'), o = s('t62R'), l = s('p+r5'), c = s('3XMw'), d = s.n(c), u = s('6XNv'),
      h = s('rHpw'), p = s('aITJ'), _ = s('MWbm')
    const m = d.a.jf83d091, b = d.a.af4abf2f, g = d.a.b871f28f

    class f extends i.Component {
      constructor(e) {
        super(e), n()(this, '_handleSelectorChange', (e, t) => {
          const {
            month: s,
            year: a,
            day: n
          } = this.props, i = Object.assign({}, {
            day: n,
            month: s,
            year: a
          }, { [e]: parseInt(t, 10) })
          this.props.onChange(i)
        }), n()(this, '_handleDayChange', e => {
          this._handleSelectorChange('day', e)
        }), n()(this, '_handleMonthChange', e => {
          this._handleSelectorChange('month', e)
        }), n()(this, '_handleYearChange', e => {
          this._handleSelectorChange('year', e)
        }), n()(this, '_handleDateChange', e => {
          const t = e.target.value.split('-'), s = {
            year: parseInt(t[0], 10),
            month: parseInt(t[1], 10),
            day: parseInt(t[2], 10)
          }
          this.props.onChange(s)
        })
        const {
          day: t,
          maxSelectableYear: s,
          minSelectableYear: a,
          month: i,
          year: o
        } = e
        this._monthOptions = r.c(), this._nativeDefaultValue = r.e(t, i, o), this._nativeMaxDate = r.e(31, 12, s), this._nativeMinDate = r.e(1, 1, a)
      }

      componentDidUpdate(e) {
        const {
          month: t,
          year: s,
          day: a,
          onChange: n
        } = this.props, i = t && t !== e.month, o = s && s !== e.year
        if (i || o) {
          r.b(t, s).map(e => parseInt(e.value, 10)).includes(a) || n({
            month: t,
            year: s,
            day: void 0
          })
        }
      }

      render() {
        const { errorMessage: e } = this.props
        return i.createElement(_.a, null, p.a.isMobileOS() ? this._renderNativeDateInput() : this._renderSelectors(), e ? i.createElement(o.c, { color: 'red500' }, e) : null)
      }

      _renderSelectors() {
        const {
          day: e,
          month: t,
          year: s,
          errors: a = {},
          label: n,
          autofocus: o,
          monthSelectorTestID: l,
          daySelectorTestID: c,
          yearSelectorTestID: d,
          style: h,
          minSelectableYear: p,
          maxSelectableYear: f
        } = this.props, y = r.b(t, s), v = r.d(p, f, e, t)
        return i.createElement(_.a, {
          accessibilityLabel: n,
          accessibilityRole: 'group',
          style: [ k.selectorsContainer, h ]
        }, i.createElement(u.a, {
          autofocus: o,
          hasError: a.month,
          label: b,
          onChange: this._handleMonthChange,
          options: this._monthOptions,
          style: k.monthSelector,
          testID: l,
          value: t ? '' + t : '',
          withEmptyOption: !0
        }), i.createElement(u.a, {
          hasError: a.day,
          label: m,
          onChange: this._handleDayChange,
          options: y,
          style: k.daySelector,
          testID: c,
          value: e ? '' + e : '',
          withEmptyOption: !0
        }), i.createElement(u.a, {
          hasError: a.year,
          label: g,
          onChange: this._handleYearChange,
          options: v,
          style: k.yearSelector,
          testID: d,
          value: s ? '' + s : '',
          withEmptyOption: !0
        }))
      }

      _renderNativeDateInput() {
        const { label: e } = this.props
        return i.createElement(l.a, {
          defaultValue: this._nativeDefaultValue,
          label: e,
          max: this._nativeMaxDate,
          min: this._nativeMinDate,
          name: e,
          numberOfLines: 1,
          onChange: this._handleDateChange,
          style: k.dateInputRoot,
          type: 'date'
        })
      }
    }

    const k = h.a.create(e => ({
      selectorsContainer: {
        flexDirection: 'row',
        marginVertical: e.spaces.small
      },
      monthSelector: {
        flexGrow: 2,
        marginRight: e.spaces.xSmall
      },
      daySelector: {
        flexGrow: 1,
        marginRight: e.spaces.xSmall
      },
      yearSelector: { flexGrow: 1 },
      dateInputRoot: { paddingHorizontal: 0 }
    }))
  },
  TEoO: function (e, t, s) {
    'use strict'
    var a = s('LdEA'), n = s.n(a), i = s('ERkP'), r = s('5UID'), o = s('3GUV'), l = s('iBK2')
    const c = i.createElement(o.a, null), d = e => {
      let { accessibilityTitle: t } = e, s = n()(e, [ 'accessibilityTitle' ])
      const a = i.createElement(l.b, s)
      return t ? i.createElement(r.a, { title: t }, a) : a
    }
    d.defaultProps = { footer: c }, t.a = d
  },
  Ukpf: function (e, t, s) {
    'use strict'
    const a = {
      inject(e) {
        const t = document.createElement('script')
        t.async = !0, t.src = e
        const s = document.body
        s && s.appendChild(t)
      }
    }
    t.a = a
  },
  YCSy: function (e, t, s) {
    'use strict'
    s('kYxP')
    var a = s('KEM+'), n = s.n(a), i = s('ERkP'), r = s('VAZu'), o = s('3XMw'), l = s.n(o), c = s('lUZE'), d = s('aITJ'), u = s('MWbm'),
      h = s('yw4N'), p = s('w9LO'), _ = s('mw9i'), m = s('7N4s'), b = s('rHpw')
    const g = l.a.d2fb334b

    class f extends i.Component {
      constructor(...e) {
        super(...e), n()(this, '_handleViewportSet', e => {
          const { onViewportSet: t } = this.props
          t && t(e)
        })
      }

      render() {
        const {
          children: e,
          scrollPrompt: t
        } = this.props, { isModal: s } = this.context
        return i.createElement(p.a, { style: [ k.root, s && k.rootModal ] }, this._renderAppBar(), i.createElement(_.a, { style: [ k.container, s && k.containerModal ] }, s ? i.createElement(h.a, {
          onViewportSet: this._handleViewportSet,
          style: [ k.viewport, d.a.isIE() && k.viewportIE ]
        }, e) : e, s ? null : t), s ? t : null)
      }

      _renderAppBar() {
        const {
            backLocation: e,
            hideBackButton: t,
            hideLogo: s,
            history: a,
            leftControl: n,
            onBackClick: o,
            rightControl: l,
            progressIndication: d
          } = this.props, { isModal: h } = this.context,
          p = d || s ? void 0 : i.createElement(u.a, { style: k.iconContainer }, i.createElement(c.a, {
            accessibilityLabel: g,
            style: k.icon
          })), _ = d ? d.text.text : void 0
        return i.createElement(r.a, {
          backLocation: e,
          centeredLogo: p,
          fixed: !h,
          hideBackButton: t || !o,
          history: a,
          leftControl: n,
          onBackClick: o,
          rightControl: l,
          title: _,
          withBottomBorder: !1
        })
      }
    }

    n()(f, 'contextType', m.a), n()(f, 'defaultProps', {
      hideBackButton: !1,
      hideLogo: !1
    })
    const k = b.a.create(e => ({
      root: {
        display: 'flex',
        flexGrow: 1
      },
      rootModal: {
        backgroundColor: e.colors.cellBackground,
        flexShrink: 1
      },
      container: { flexGrow: 1 },
      containerModal: { flexShrink: 1 },
      iconContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        minWidth: e.spaces.large
      },
      icon: {
        color: e.colors.brandColor,
        flexGrow: 1,
        height: '1.75rem'
      },
      viewport: {
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'auto'
      },
      viewportIE: { flexBasis: '0%' }
    }))
    t.a = f
  },
  YlqV: function (e, t, s) {
    'use strict'
    s.d(t, 'd', (function () {
      return o
    })), s.d(t, 'c', (function () {
      return l
    })), s.d(t, 'h', (function () {
      return c
    })), s.d(t, 'b', (function () {
      return d
    })), s.d(t, 'a', (function () {
      return h
    })), s.d(t, 'e', (function () {
      return _
    })), s.d(t, 'f', (function () {
      return m
    })), s.d(t, 'i', (function () {
      return b
    })), s.d(t, 'g', (function () {
      return g
    }))
    s('IAdD'), s('Ysgh'), s('kYxP'), s('ERkP')
    var a = s('zrOZ'), n = s('6/RC'), i = s('SrIh'), r = s('q82E')

    function o(e, t, s) {
      const {
        key: a,
        subtask_id: n
      } = t, i = e[n] && e[n][a]
      return void 0 === i ? s : i
    }

    const l = e => (e ? e.split(',') : []).reduce((e, t) => {
      const [ s, a ] = t.split(':', 2)
      return s && a && (e[s] = a), e
    }, {}), c = (e, t) => {
      const s = t ? JSON.parse(t) : {}
      return Object.assign({}, e, s)
    }, d = e => {
      switch (e) {
        case r.b.Primary:
          return 'primary'
        case r.b.Text:
          return 'text'
        case r.b.DestructiveSecondary:
          return 'destructiveSecondary'
        default:
          return Object(i.a)('Unknown Button Style ${style}'), 'primary'
      }
    }, u = {
      subtask_id: null,
      subtask_back_navigation: null,
      progress_indication: null,
      alert_dialog: r.p.AlertDialog,
      alert_dialog_suppress_client_events: r.p.AlertDialogSupressClientEvents,
      app_download_cta: r.p.AppDownloadCTA,
      cta: r.p.CallToAction,
      choice_selection: r.p.ChoiceSelection,
      contacts_live_sync_permission_prompt: r.p.ContactsLiveSyncPermissionPrompt,
      email_contacts_sync: r.p.EmailContactsSync,
      enter_email: r.p.EnterEmail,
      enter_phone: r.p.EnterPhone,
      email_verification: r.p.EmailVerification,
      enter_password: r.p.EnterPassword,
      enter_text: r.p.EnterText,
      enter_username: r.p.EnterUsername,
      end_flow: r.p.EndFlow,
      fetch_temporary_password: r.p.FetchPassword,
      interest_picker: r.p.InterestPicker,
      menu_dialog: r.p.MenuDialog,
      notifications_permission_prompt: r.p.NotificationsPermissionPrompt,
      open_account: r.p.OpenAccount,
      open_home_timeline: r.p.OpenHomeTimeline,
      open_link: r.p.OpenLink,
      phone_verification: r.p.PhoneVerification,
      privacy_options: r.p.PrivacyOptions,
      recaptcha: r.p.Recaptcha,
      select_avatar: r.p.SelectAvatar,
      select_banner: r.p.SelectBanner,
      settings_list: r.p.SettingsList,
      sign_up: r.p.Signup,
      sign_up_review: r.p.SignupReview,
      topics_selector: r.p.TopicsSelector,
      update_users: r.p.UpdateUsers,
      upload_media: r.p.UploadMedia,
      user_recommendations_list: r.p.UserRecommendations,
      user_recommendations_urt: r.p.UserRecommendationsURT,
      wait_spinner: r.p.WaitSpinner
    }, h = {
      contacts_live_sync_permission_prompt: n.canUseDOM && 'contacts' in navigator && 'ContactsManager' in window ? 1 : 0,
      email_verification: 1,
      topics_selector: 1,
      wait_spinner: 1,
      cta: 4
    }, p = Object(a.a)([ r.p.AlertDialogSupressClientEvents ]), _ = e => e && Object.keys(e).find(e => u[e]) || null, m = e => {
      const t = _(e)
      return t ? u[t] : null
    }, b = e => {
      const t = m(e)
      return !!t && p.has(t)
    }, g = e => e === r.l.Boolean || e === r.l.PreciseLocation
  },
  dEMF: function (e, t, s) {
    'use strict'
    t.byteLength = function (e) {
      var t = c(e), s = t[0], a = t[1]
      return 3 * (s + a) / 4 - a
    }, t.toByteArray = function (e) {
      for (var t, s = c(e), a = s[0], r = s[1], o = new i(function (e, t, s) {
        return 3 * (t + s) / 4 - s
      }(0, a, r)), l = 0, d = r > 0 ? a - 4 : a, u = 0; u < d; u += 4) {
        t = n[e.charCodeAt(u)] << 18 | n[e.charCodeAt(u + 1)] << 12 | n[e.charCodeAt(u + 2)] << 6 | n[e.charCodeAt(u + 3)], o[l++] = t >> 16 & 255, o[l++] = t >> 8 & 255, o[l++] = 255 & t
      }
      2 === r && (t = n[e.charCodeAt(u)] << 2 | n[e.charCodeAt(u + 1)] >> 4, o[l++] = 255 & t)
      1 === r && (t = n[e.charCodeAt(u)] << 10 | n[e.charCodeAt(u + 1)] << 4 | n[e.charCodeAt(u + 2)] >> 2, o[l++] = t >> 8 & 255, o[l++] = 255 & t)
      return o
    }, t.fromByteArray = function (e) {
      for (var t, s = e.length, n = s % 3, i = [], r = 0, o = s - n; r < o; r += 16383) i.push(d(e, r, r + 16383 > o ? o : r + 16383))
      1 === n ? (t = e[s - 1], i.push(a[t >> 2] + a[t << 4 & 63] + '==')) : 2 === n && (t = (e[s - 2] << 8) + e[s - 1], i.push(a[t >> 10] + a[t >> 4 & 63] + a[t << 2 & 63] + '='))
      return i.join('')
    }
    for (var a = [], n = [], i = 'undefined' != typeof Uint8Array ? Uint8Array : Array, r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', o = 0, l = r.length; o < l; ++o) a[o] = r[o], n[r.charCodeAt(o)] = o

    function c(e) {
      var t = e.length
      if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
      var s = e.indexOf('=')
      return -1 === s && (s = t), [ s, s === t ? 0 : 4 - s % 4 ]
    }

    function d(e, t, s) {
      for (var n, i, r = [], o = t; o < s; o += 3) n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), r.push(a[(i = n) >> 18 & 63] + a[i >> 12 & 63] + a[i >> 6 & 63] + a[63 & i])
      return r.join('')
    }

    n['-'.charCodeAt(0)] = 62, n['_'.charCodeAt(0)] = 63
  },
  fS8x: function (e, t, s) {
    'use strict'
    var a = s('ERkP'), n = s('KEM+'), i = s.n(n), r = s('rxPX'), o = s('/NU0'), l = s('AspN')
    const c = (e, t) => t.media ? t.media : Object(o.a)(t.mediaId) ? Object(l.g)(e, t.mediaId)[0] : void 0,
      d = (e, t) => void 0 !== t.mediaId ? t.mediaId : t.media ? t.media.id : null
    var u = Object(r.a)().propsFromState(() => ({
      media: c,
      mediaId: d
    })).propsFromActions(() => ({
      processMedia: l.c,
      updateMediaUpload: l.j
    })).withAnalytics({
      page: 'media',
      section: 'edit'
    }), h = s('jHSc'), p = s('3XMw'), _ = s.n(p), m = s('EeFI'), b = s('/yvb'), g = s('rHpw')
    const f = _.a.gd80afba, k = _.a.a753a87f

    class y extends a.Component {
      constructor(e) {
        super(e), i()(this, '_getMedia', () => {
          const { media: e } = this.props
          return e && e.mediaFile && e.mediaFile.isImage ? e : null
        }), i()(this, '_renderAppBarRightControl', () => {
          const { isProcessing: e } = this.state
          return a.createElement(b.a, {
            disabled: e,
            onPress: this._handleApplyButtonClick,
            size: 'normalCompact',
            type: 'primary'
          }, k)
        }), i()(this, '_handleBackClick', () => {
          const {
            analytics: e,
            onCancel: t
          } = this.props
          e.scribe({ action: 'cancel' }), t && t()
        }), i()(this, '_handleApplyButtonClick', () => {
          const { onCropDone: e } = this.props, t = this._cropper.current
          if (t) {
            const {
              analytics: s,
              media: a,
              mediaId: n,
              onDone: i,
              processMedia: r,
              updateMediaUpload: l
            } = this.props
            this.setState({ isProcessing: !0 })
            const c = t.getCropData(), { originalMediaFile: d } = a || {},
              u = !d || 0 === c.top && 0 === c.left && c.width === d.width && c.height === d.height
            Object(o.a)(n) && (e ? (e(c), i()) : (l({
              id: n,
              cropData: u ? void 0 : c
            }), r(n).then(() => {
              this.setState({ isProcessing: !1 }), s.scribe({ action: 'done' }), i()
            })))
          }
        }), this.state = { isProcessing: !1 }, this._cropper = a.createRef(), e.media || e.onCancel()
      }

      render() {
        const {
          defaultAspectRatio: e,
          history: t,
          title: s,
          withAspectRatioOptions: n,
          withZoomControl: i
        } = this.props, r = this._getMedia()
        return a.createElement(h.b, {
          backButtonType: 'back',
          containerStyle: v.root,
          documentTitle: s || f,
          history: t,
          onBackClick: this._handleBackClick,
          rightControl: this._renderAppBarRightControl(),
          title: s || f
        }, a.createElement(m.a, {
          defaultAspectRatio: e,
          media: r,
          ref: this._cropper,
          withAspectRatioOptions: n,
          withZoomControl: i
        }))
      }
    }

    const v = g.a.create(e => ({
      root: {
        flexShrink: 1,
        height: 650
      }
    }))
    var w = u(y), C = s('X8FW')
    const E = g.a.create(e => ({
      modal: {
        width: 600,
        maxWidth: '90vw'
      }
    }))
    t.a = e => a.createElement(C.b, {
      clickMaskToClose: !1,
      location: e.location,
      modalSize: 'fitChildren',
      style: E.modal
    }, a.createElement(w, e))
  },
  gPQO: function (e, t, s) {
    'use strict'
    s.r(t), s.d(t, 'OcfScreen', (function () {
      return wr
    }))
    s('IAdD'), s('JtPf'), s('MvUL')
    var a = s('97Jx'), n = s.n(a), i = s('KEM+'), r = s.n(i), o = s('ERkP'), l = (s('kYxP'), s('+/5o')), c = s('eb3s'), d = s('k/Ka'),
      u = s('YlqV'), h = s('q82E'), p = s('t62R'), _ = s('aWzz')
    const m = e => Object(d.a)('span', e)

    class b extends o.PureComponent {
      constructor(...e) {
        super(...e), r()(this, '_textArray', () => {
          const {
            entities: e,
            subtaskInputs: t,
            text: s,
            size: a,
            color: i,
            weight: r
          } = this.props
          return e.reduce((l, c, d) => {
            const {
              from_index: _,
              to_index: m,
              navigation_link: b,
              subtask_data_reference: g
            } = c, f = e[d - 1] ? e[d - 1].to_index : 0, k = o.createElement(p.c, {
              color: i,
              key: `${f},${_}`,
              size: a,
              weight: r
            }, s.slice(f, _))
            let y
            const v = `${_},${m}`
            if (b) {
              const e = b.link_type === h.i.ChromelessWeb, t = {
                key: v,
                size: a,
                weight: r,
                withInteractiveStyling: !0
              }, i = e ? {
                link: {
                  external: !0,
                  pathname: b.url
                }
              } : {
                accessibilityRole: 'button',
                color: 'link',
                onClick: this._handleClick(b)
              }
              y = o.createElement(p.c, n()({}, i, t), s.slice(_, m))
            } else {
              y = g ? o.createElement(p.c, {
                color: i,
                key: v,
                size: a,
                weight: r
              }, Object(u.d)(t, g)) : o.createElement(p.c, {
                color: i,
                key: v,
                size: a,
                weight: r
              }, s.slice(_, m))
            }
            const w = d === e.length - 1 ? o.createElement(p.c, {
              color: i,
              key: '' + m,
              size: a,
              weight: r
            }, s.slice(m)) : null
            return l.concat([ k, y, w ].filter(e => !!e))
          }, [])
        }), r()(this, '_handleClick', e => t => {
          t.preventDefault()
          const {
            onClick: s,
            onNavigate: a
          } = this.props
          a ? a(e) : s && s()
        })
      }

      render() {
        const { entities: e } = this.props
        return e && e.length > 0 ? this._renderTextArray() : this._renderText()
      }

      _renderTextArray() {
        const {
          align: e,
          style: t,
          testID: s
        } = this.props
        return o.createElement(m, {
          align: e,
          style: t,
          testID: s
        }, this._textArray())
      }

      _renderText() {
        const {
          align: e,
          text: t,
          style: s,
          color: a,
          size: n,
          weight: i,
          testID: r
        } = this.props
        return o.createElement(p.c, {
          align: e,
          color: a,
          size: n,
          style: s,
          testID: r,
          weight: i
        }, t)
      }
    }

    var g = b

    class f extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_handleConfirm', () => {
          const { subtask: e } = this.props
          this._handleButtonClick(e.next_link)
        }), r()(this, '_handleCancel', () => {
          const { subtask: { cancel_link: e } } = this.props
          e && this._handleButtonClick(e)
        }), r()(this, '_handleButtonClick', e => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        })
      }

      render() {
        const {
          subtask: e,
          onNavigate: t,
          subtaskInputs: s
        } = this.props, a = e.primary_text ? o.createElement(g, n()({}, e.primary_text, {
          nativeID: l.i,
          onNavigate: t,
          subtaskInputs: s
        })) : void 0, i = e.secondary_text ? o.createElement(g, n()({}, e.secondary_text, {
          onNavigate: t,
          subtaskInputs: s
        })) : void 0, {
          cancel_link: r,
          next_link: d
        } = e, u = r && r.label
        return o.createElement(c.a, {
          cancelButtonLabel: u,
          confirmButtonLabel: d && d.label,
          headline: a,
          onCancel: this._handleCancel,
          onConfirm: this._handleConfirm,
          onMaskClick: this._handleCancel,
          text: i,
          withCancelButton: !!u
        })
      }
    }

    var k = f, y = s('fs1G'), v = s('YCSy'), w = s('MWbm'), C = s('TIdA'), E = s('A91F'), x = s('cmUU')

    class I extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleCtaClick', e => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        }), r()(this, '_handlePrimaryActionClick', () => {
          this.setState({ downloadLinkClicked: !0 }), this._handleCtaClick(this.props.subtask.primary_action_link)
        }), r()(this, '_handleSecondaryActionClick', () => {
          const { subtask: { secondary_action_link: e } } = this.props
          e && this._handleCtaClick(e)
        }), this.state = { downloadLinkClicked: !1 }
      }

      render() {
        const {
            history: e,
            onBackClick: t,
            onNavigate: s,
            subtask: a,
            subtaskInputs: i
          } = this.props, { downloadLinkClicked: r } = this.state, c = a.primary_text ? o.createElement(g, n()({}, a.primary_text, {
            nativeID: l.i,
            onNavigate: s,
            subtaskInputs: i
          })) : null, d = !r || !a.primary_action_text_after_click, h = r && a.primary_action_text_after_click || a.primary_action_link.label,
          p = a.primary_image_url ? o.createElement(C.a, {
            accessibilityLabel: '',
            aspectMode: E.a.exact(1),
            image: a.primary_image_url || ''
          }) : null, _ = a.secondary_text ? o.createElement(g, n()({}, a.secondary_text, {
            onNavigate: s,
            subtaskInputs: i
          })) : null, m = o.createElement(w.a, null, p, _)
        return o.createElement(v.a, {
          hideLogo: !0,
          history: e,
          onBackClick: t
        }, o.createElement(x.a, {
          actionLabel: h || '',
          actionType: Object(u.b)(a.primary_action_style),
          headline: c,
          onAction: d ? this._handlePrimaryActionClick : y.a,
          onClose: y.a,
          onSecondaryAction: this._handleSecondaryActionClick,
          secondaryActionLabel: (a.secondary_action_link || {}).label,
          secondaryActionType: a.secondary_action_style && Object(u.b)(a.secondary_action_style),
          subtext: m,
          withCloseButton: !1
        }), this.props.errorDialog)
      }
    }

    var S = s('ZS3b'), O = 'OCF_CallToAction_Button'

    class A extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_handleCtaClick', e => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        }), r()(this, '_handlePrimaryActionClick', () => {
          this._handleCtaClick(this.props.subtask.primary_action_link)
        }), r()(this, '_handleSecondaryActionClick', () => {
          const { subtask: { secondary_action_link: e } } = this.props
          e && this._handleCtaClick(e)
        })
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          subtask: a,
          subtaskInputs: i
        } = this.props, r = o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: s,
          subtaskInputs: i
        })), c = a.secondary_text ? o.createElement(g, n()({}, a.secondary_text, {
          onNavigate: s,
          subtaskInputs: i
        })) : null, d = a.detail_text ? o.createElement(g, n()({}, a.detail_text, {
          onNavigate: s,
          subtaskInputs: i
        })) : null
        let h, p
        if (a.header_image) {
          const e = a.header_image.image.image_info, t = {
            url: e.url,
            height: e.height,
            width: e.width
          }
          h = ({ style: s }) => o.createElement(w.a, { style: s }, o.createElement(C.a, {
            accessibilityLabel: e.alt_text,
            image: t
          })), p = 'illustration'
        }
        const _ = a.text_alignment && 'left' === a.text_alignment ? 'left' : 'center'
        return o.createElement(v.a, {
          hideLogo: !0,
          history: e,
          onBackClick: t
        }, o.createElement(x.a, {
          actionLabel: a.primary_action_link.label || '',
          actionType: Object(u.b)(a.primary_action_style),
          footer: d,
          graphic: h,
          graphicDisplayMode: p,
          headline: r,
          onAction: this._handlePrimaryActionClick,
          onClose: y.a,
          onSecondaryAction: this._handleSecondaryActionClick,
          primaryButtonTestID: O,
          secondaryActionLabel: (a.secondary_action_link || {}).label,
          secondaryActionType: a.secondary_action_link && Object(u.b)(a.secondary_action_style),
          subtext: c,
          subtextAlign: _,
          withCloseButton: !1
        }), this.props.errorDialog)
      }
    }

    s('x4t0')
    var T = s('rHpw'), R = T.a.create(e => ({
      header: { marginBottom: e.spaces.xSmall },
      contentArea: { marginHorizontal: e.spaces.large },
      checkboxText: {
        flexShrink: 1,
        paddingRight: e.spaces.xSmall,
        width: '100%'
      },
      headline: { marginVertical: e.spaces.small },
      option: {
        marginTop: e.spaces.xSmall,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      primaryButton: { marginTop: e.spaces.small },
      subHeader: { marginBottom: e.spaces.small },
      formTextInput: { paddingHorizontal: 0 }
    })), P = s('XiMS'), D = s('/yvb'), j = s('V2ml')

    class N extends o.Component {
      constructor(...e) {
        super(...e), r()(this, 'state', { selectedChoices: [] }), r()(this, '_renderRightControl', () => o.createElement(w.a, { style: F.buttonContainer }, this._renderCancelButton(), this._renderNextButton())), r()(this, '_handleCancelButtonClick', () => {
          const {
            subtask: { skip_link: e },
            subtaskId: t,
            onNavigate: s,
            updateFlow: a
          } = this.props
          e && (a(t, { link: e.link_id }), s(e))
        }), r()(this, '_handleNextButtonClick', () => {
          const {
            subtask: { next_link: e },
            subtaskId: t,
            onNavigate: s,
            updateFlow: a
          } = this.props, { selectedChoices: n } = this.state
          e && (a(t, {
            link: e.link_id,
            selected_choices: n
          }), s(e))
        }), r()(this, '_handleRadioChange', (e, t) => {
          this.setState({ selectedChoices: [ t ] })
        }), r()(this, '_onCheckboxChange', e => t => {
          this._handleMultiSelection(e, t)
        })
      }

      componentDidUpdate(e) {
        e.subtaskId !== this.props.subtaskId && this.setState({ selectedChoices: [] })
      }

      render() {
        const {
          subtask: e,
          history: t,
          subtaskInputs: s,
          onBackClick: a
        } = this.props
        return o.createElement(v.a, {
          history: t,
          onBackClick: a,
          rightControl: this._renderRightControl()
        }, o.createElement(w.a, { style: R.contentArea }, e.primary_text && o.createElement(g, n()({
          size: 'xLarge',
          style: R.headline,
          weight: 'bold'
        }, e.primary_text, { subtaskInputs: s })), e.secondary_text && o.createElement(g, n()({ color: 'gray600' }, e.secondary_text, { subtaskInputs: s })), o.createElement(w.a, null, this._renderChoices())))
      }

      _renderCheckboxQuestion(e) {
        const { subtaskInputs: t } = this.props, { selectedChoices: s } = this.state, a = s.indexOf(e.id) > -1
        return o.createElement(w.a, {
          accessibilityRole: 'label',
          key: e.id,
          style: [ R.option, F.checkboxRow, F.cursor ]
        }, o.createElement(g, n()({}, e.text, {
          style: R.checkboxText,
          subtaskInputs: t
        })), o.createElement(P.a, {
          checked: a,
          onChange: this._onCheckboxChange(e.id)
        }))
      }

      _renderCancelButton() {
        const { subtask: e } = this.props
        return e.skip_link ? o.createElement(D.a, {
          onPress: this._handleCancelButtonClick,
          size: 'normalCompact',
          style: F.skipButton,
          type: 'text'
        }, e.skip_link.label) : null
      }

      _renderNextButton() {
        const { subtask: e } = this.props, t = this._verifyBothTypesValidity()
        return e.next_link ? o.createElement(D.a, {
          disabled: !t,
          onPress: this._handleNextButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, e.next_link.label) : null
      }

      _renderChoices() {
        const { subtask: e } = this.props, {
          selection_type: t,
          choices: s
        } = e
        if (s) {
          if ('multi_select' === t) return o.createElement(o.Fragment, null, s.map(e => this._renderCheckboxQuestion(e)))
          if ('single_select' === t) {
            const e = s.map(e => ({
              label: e.text.text,
              value: e.id
            }))
            return o.createElement(j.a, {
              name: 'single-choice',
              onChange: this._handleRadioChange,
              options: e,
              value: this.state.selectedChoices[0]
            })
          }
        }
      }

      _verifyBothTypesValidity() {
        const { subtask: e } = this.props, { selection_type: t } = e, { selectedChoices: s } = this.state
        if (e && t) {
          if ('multi_select' === t) return this._verifyMultiChoiceValidity(s)
          if ('single_select' === t) return 1 === s.length
        }
      }

      _verifyMultiChoiceValidity(e) {
        const { subtask: t } = this.props, { next_link_options: s } = t
        if (s) {
          const {
            min_enable_count: t,
            max_enable_count: a
          } = s, n = e.length, i = a && n > a
          return !(t && n < t) && !i
        }
        return !1
      }

      _handleMultiSelection(e, t) {
        const { selectedChoices: s } = this.state
        let a
        a = s && s.includes(e) ? s.filter(t => t !== e) : s.concat([ e ]), this.setState({ selectedChoices: a })
      }
    }

    const F = T.a.create(e => ({
      buttonContainer: { flexDirection: 'row' },
      skipButton: { marginRight: e.spaces.xSmall },
      checkboxRow: { justifyContent: 'space-between' },
      cursor: { cursor: 'pointer' }
    }))
    s('WNMA')
    var B = s('zh9S'), L = s('9D1O'), U = s('1YZw'), V = s('oEGd'), M = s('0KEI'), z = s('hqKg'), q = s('If64'), H = s('G6rE'),
      G = s('RqPI')
    const Y = e => (t, s) => {
        const a = s.location.query[e]
        return Array.isArray(a) ? a[0] : a
      }, W = Y('country_code'),
      X = Object(z.createSelector)((K = 'input', Z = {}, (e, t) => t.location.state && t.location.state[K] || Z), Y('input_flow_data'), u.h)
    var K, Z
    const $ = Y('return_path'), Q = Y('is_native'), J = Y('test_country_code'), ee = Y('target_user_id'),
      te = Object(z.createSelector)(L.h, W, (e, t) => {
        const s = Y('overrides')(e, t)
        return Object(u.c)(s)
      }, (e, t) => t.flowName || t.location.pathname.slice(t.match.path.length), X, $, Q, J, ee, L.r, L.k, L.j, L.m, q.a, L.q, L.i, L.n, L.o, L.p, (e, t, s, a, n, i, r, o, l, c, d, u, h, p, _, m, b, g, f) => ({
        currentSubtask: e,
        countryCode: t,
        debugOverrides: s,
        isNative: r,
        testCountryCode: o,
        flowName: a,
        inputFlowData: n,
        returnPath: i,
        subtasks: c,
        flowToken: d,
        fetchStatus: u,
        previousNavigableSubtaskId: h,
        subtaskInputs: _,
        failureMessage: m,
        shouldAbort: b,
        shouldEndFlow: g,
        startLocation: p,
        submitFailed: f,
        targetUserId: l
      })), se = {
        addToast: U.b,
        clearFlow: L.b,
        createLocalApiErrorHandler: Object(M.d)('OCF_FLOW'),
        removeContacts: L.g,
        fetchTemporaryPassword: L.c,
        fetchUsers: H.e.fetchMany,
        logNymizerSignup: (e = {}) => (t, s, { api: a }) => a.Nymizer.logSignup(e),
        navigateSubtask: L.f,
        startFlow: L.t,
        submitFlow: L.u,
        updateFlow: L.w,
        googleAnalyticsPageView: B.a,
        googleAnalyticsSendEvent: B.b,
        scribeAction: B.c,
        scribePageImpression: B.d,
        verifyCredentials: G.n
      }
    var ae = Object(V.g)(te, se), ne = s('7JQg')
    const ie = {
      createLocalApiErrorHandler: Object(M.d)('CONTACTS_SYNC'),
      uploadAddressBook: e => (t, s, { api: a }) => a.Contacts.uploadAddressBook(e)
    }
    var re = Object(V.b)(ie), oe = s('SrIh'), le = s('Irs7')

    class ce extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_handleCtaClick', e => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        }), r()(this, '_handlePrimaryActionClick', () => {
          try {
            window.navigator.contacts.select([ 'name', 'email', 'tel' ], { multiple: !0 }).then(this._handleContactResults)
          } catch (e) {
            Object(oe.a)(e), this._handleSecondaryActionClick()
          }
        }), r()(this, '_handleContactResults', e => {
          const {
            analytics: t,
            createLocalApiErrorHandler: s,
            uploadAddressBook: a
          } = this.props, n = e.map(({
                                       name: e,
                                       email: t,
                                       tel: s
                                     }) => ({
            name: e[0] || '',
            email_addresses: t,
            phone_numbers: s
          }))
          if (0 === n.length) return t.scribeAction('cancel')
          t.scribe({
            action: 'success',
            data: { event_value: n.length }
          }), a({ contacts: n }).catch(s()), this._handleCtaClick(this.props.subtask.next_link)
        }), r()(this, '_handleSecondaryActionClick', () => {
          const { subtask: { skip_link: e } } = this.props
          e && this._handleCtaClick(e)
        })
      }

      componentDidMount() {
        'contacts' in navigator && 'ContactsManager' in window || this._handleSecondaryActionClick()
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          subtask: a,
          subtaskInputs: i
        } = this.props, r = a.detail_text ? o.createElement(g, n()({}, a.detail_text, {
          onNavigate: s,
          subtaskInputs: i
        })) : null
        return o.createElement(v.a, {
          hideLogo: !0,
          history: e,
          onBackClick: t
        }, o.createElement(x.a, {
          actionLabel: a.next_link.label || '',
          footer: r,
          headline: a.primary_text || '',
          onAction: this._handlePrimaryActionClick,
          onClose: y.a,
          onTertiaryAction: this._handleSecondaryActionClick,
          subtext: '',
          tertiaryActionLabel: (a.skip_link || {}).label,
          withCloseButton: !1
        }))
      }
    }

    var de = Object(le.a)(re(ce), { element: 'contacts_sync' }), ue = s('6/RC')
    const he = Object(z.createSelector)((e, t) => Array.isArray(t.location.query.error) ? t.location.query.error[0] : t.location.query.error, (e, t) => !!t.location.query.state, (e, t) => ({
      importError: e,
      startImport: t
    })), pe = {
      createLocalApiErrorHandler: Object(M.d)('EMAIL_CONTACTS_SYNC'),
      importStatus: L.d,
      scribeAction: B.c,
      syncContacts: L.v
    }
    var _e = Object(V.g)(he, pe), me = s('kGix'), be = s('v//M'), ge = s('3XMw'), fe = s.n(ge), ke = s('lUZE'), ye = s('8jkQ')
    const ve = fe.a.cea71013, we = () => null

    class Ce extends o.Component {
      constructor(e) {
        super(e), r()(this, '_startContactImports', e => {
          this._scribeOAuthAction('accepted')
          const {
            createLocalApiErrorHandler: t,
            syncContacts: s
          } = this.props
          s(e).then(e => this._pollImportStatus()).catch(e => {
            t()(e), this.setState({ importFinished: !0 })
          })
        }), r()(this, '_handlePrimaryActionClick', () => {
          const {
            subtask: {
              authorization_url: e,
              open_in_new_tab: t
            }
          } = this.props
          if (t && ue.canUseDOM) {
            const t = `width=500,height=500,top=0,left=${window.innerWidth - 500},toolbar=no,location=yes`
            window.open(e, 'twitter_oauth', t).focus()
          } else {
            ye.b.navigateTo(e)
          }
        }), r()(this, '_handleTertiaryActionClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, { skip_link: n } = t
          a(s, { link: n.link_id }), e(n)
        }), r()(this, '_scribeOAuthAction', e => {
          const { scribeAction: t } = this.props
          t({
            page: 'onboarding',
            section: 'email_contacts_sync',
            component: 'oauth_prompt',
            element: 'permission',
            action: e
          })
        }), r()(this, '_handleEvent', e => {
          if (e.origin === 'https://' + window.location.hostname) {
            const t = Object.assign({ callback_url: `https://${window.location.hostname}${window.location.pathname}` }, e.data)
            !t.error && t.state && this._startContactImports(t)
          }
        }), r()(this, '_pollImportStatus', (e = 1) => {
          if (e > 10) {
            this.setState({ importFinished: !0 })
          } else {
            const {
              createLocalApiErrorHandler: t,
              importStatus: s
            } = this.props
            this._timer = setTimeout(() => {
              s().then(t => {
                switch (t.status) {
                  case h.c.Success:
                    this.setState({ importFinished: !0 })
                    break
                  case h.c.NotFound:
                    this._pollImportStatus(e + 1)
                    break
                  default:
                    this.setState({ importFinished: !0 })
                }
              }).catch(e => {
                t()(e), this.setState({ importFinished: !0 })
              })
            }, 1e3)
          }
        }), this.state = { importFinished: void 0 }, this._navigating = !1, window.addEventListener('message', this._handleEvent, !1)
      }

      componentDidMount() {
        const {
          history: e,
          importError: t,
          location: s,
          onNavigate: a,
          startImport: n,
          subtask: i,
          subtaskId: r,
          updateFlow: o
        } = this.props
        this._showLoadingSpinner = n
        const { decline_link: l } = i
        if ('access_denied' === t) {
          this._scribeOAuthAction('declined'), l && (o(r, { link: l.link_id }), a(l))
        } else if (n) {
          const {
            error: t,
            state: a
          } = s.query, n = { callback_url: `https://${window.location.hostname}${s.pathname}` }
          t && 'string' == typeof t && (n.error = t), a && 'string' == typeof a && (n.state = a), e.replace(s.pathname), this._startContactImports(n)
        }
      }

      componentWillUnmount() {
        this._timer && clearTimeout(this._timer), window.removeEventListener('message', this._handleEvent, !1)
      }

      componentDidUpdate() {
        const {
          onNavigate: e,
          subtask: t,
          subtaskId: s,
          updateFlow: a
        } = this.props, { importFinished: n } = this.state, { next_link: i } = t
        !this._navigating && n && (this._navigating = !0, a(s, { link: i.link_id }), e(i))
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          onBackClick: s,
          onNavigate: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, {
          accept_text: c,
          detail_text: d,
          primary_text: u,
          skip_link: h,
          secondary_text: p
        } = i, _ = o.createElement(g, n()({}, u, {
          nativeID: l.i,
          onNavigate: a,
          subtaskInputs: r
        })), m = p ? o.createElement(g, n()({}, p, {
          onNavigate: a,
          subtaskInputs: r
        })) : null, b = d ? o.createElement(g, n()({}, d, {
          onNavigate: a,
          subtaskInputs: r
        })) : null
        return this._showLoadingSpinner ? o.createElement(be.a, {
          fetchStatus: me.a.LOADING,
          loadingMessage: ve,
          onRequestRetry: y.a,
          render: we,
          retryable: !1
        }) : o.createElement(v.a, {
          hideLogo: !0,
          history: t,
          onBackClick: s
        }, o.createElement(x.a, {
          actionLabel: c,
          footer: b,
          graphic: ke.a,
          graphicStyle: Ee.twitterIcon,
          headline: _,
          onAction: this._handlePrimaryActionClick,
          onClose: y.a,
          onTertiaryAction: this._handleTertiaryActionClick,
          subtext: m,
          tertiaryActionLabel: h.label,
          withCloseButton: !1
        }), e)
      }
    }

    const Ee = T.a.create(e => ({ twitterIcon: { color: e.colors.brandColor } }))
    var xe = _e(Ce)
    const Ie = Object(z.createSelector)(L.l, L.s, (e, t) => ({
      navigationContext: e,
      verificationSendFailureMessage: t
    })), Se = {
      createLocalApiErrorHandler: Object(M.d)('OCF_FLOW_EMAIL_VERIFICATION'),
      getVerificationStatus: L.e,
      verifyIdentifier: L.y
    }
    var Oe = Object(V.g)(Ie, Se), Ae = s('p+r5'), Te = s('k49u'), Re = s('OIs+')
    const Pe = fe.a.e4ff75a9, De = fe.a.e4f6bd9e, je = { [Re.a.Offline]: Pe }, Ne = (e, t, s) => {
      let a
      const n = {
        [Te.a.AccessDeniedByBouncer]: {
          customAction: t => {
            Object(M.c)(t, { flow: e })
          }
        }
      }
      if (s) {
        a = Object.assign({}, n, { customErrorHandler: ({ errors: [ a ] }) => (a.code === Te.a.AccessDeniedByBouncer ? Object(M.c)(a, { flow: e }) : s(t || a.code && je[a.code] || De), []) })
      } else if (t) {
        const e = { toast: { text: t } }
        a = Object.assign({
          [Te.a.ValidationFailure]: e,
          [Te.a.OnboardingFlowRetriableFailure]: e,
          [Te.a.OnboardingFlowFailure]: e,
          defaultToast: { text: t },
          showToast: !0
        }, n)
      } else {
        a = Object.assign({}, n, {
          [Re.a.Offline]: { toast: { text: je[Re.a.Offline] } },
          defaultToast: { text: De },
          showToast: !0
        })
      }
      return a
    }, Fe = 'email'

    class Be extends o.Component {
      constructor(e) {
        super(e), r()(this, '_sendEmailVerificationRequest', () => {
          const {
              createLocalApiErrorHandler: e,
              subtask: t,
              verifyIdentifier: s,
              onNavigate: a,
              subtaskInputs: n
            } = this.props, i = t.email.subtask_data_reference, r = t.name.subtask_data_reference, o = i ? n[i.subtask_id][i.key] : void 0,
            l = r ? n[r.subtask_id][r.key] : void 0
          return s({
            email: o,
            display_name: l
          }).then(e => {
            this.setState({ email: o })
          }).catch(s => {
            const {
              flowName: n,
              verificationSendFailureMessage: i
            } = this.props
            e(Ne(n, i || De))(s), a(t.fail_link)
          })
        }), r()(this, '_handleCodeUpdated', e => {
          this.setState({ pinCode: e.target.value })
        }), r()(this, '_startStatusPolling', () => {
          const {
            createLocalApiErrorHandler: e,
            getVerificationStatus: t,
            subtask: s,
            subtaskInputs: a
          } = this.props, n = s.email.subtask_data_reference, i = n ? a[n.subtask_id][n.key] : void 0
          this._timer = setTimeout(() => {
            t({ email: i }).then(e => {
              e.verified ? (this.setState({ pinCode: e.pin_code }), this._clearTimer(), this._handleDoneButtonClick()) : (this._clearTimer(), this._startStatusPolling())
            }).catch(t => {
              e()(t), this._clearTimer(), this._startStatusPolling()
            })
          }, 1e3)
        }), r()(this, '_clearTimer', () => {
          this._timer && clearTimeout(this._timer)
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, {
            email: n,
            pinCode: i
          } = this.state
          a(s, {
            code: i,
            email: n,
            link: t.next_link.link_id
          }), e(t.next_link)
        })
        const {
          subtaskId: t,
          subtaskInputs: s
        } = e, a = Object(u.d)(s, {
          key: Fe,
          subtask_id: t
        }, '') || ''
        this.state = {
          email: a,
          pinCode: ''
        }
      }

      componentDidMount() {
        const { subtask: { verification_status_polling_enabled: e } } = this.props
        return e && this._startStatusPolling(), this._sendEmailVerificationRequest()
      }

      componentWillUnmount() {
        this._clearTimer()
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          subtask: a,
          subtaskInputs: i,
          progressIndication: r
        } = this.props, c = o.createElement(D.a, {
          disabled: !this.state.pinCode,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, a.next_link.label), d = o.createElement(g, n()({}, a.detail_text, {
          color: 'link',
          onNavigate: s,
          style: Le.detailLink,
          subtaskInputs: i
        }))
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          progressIndication: r,
          rightControl: c
        }, o.createElement(w.a, null, o.createElement(w.a, { style: R.contentArea }, a.primary_text && o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: i,
          weight: 'bold'
        })), a.secondary_text && o.createElement(g, n()({}, a.secondary_text, {
          color: 'gray600',
          onNavigate: s,
          subtaskInputs: i
        })), o.createElement(Ae.a, {
          autoFocus: !0,
          helperText: a.detail_text && d,
          label: a.hint_text,
          name: 'verfication_code',
          onChange: this._handleCodeUpdated,
          style: R.formTextInput,
          value: this.state.pinCode
        }))), this.props.errorDialog)
      }
    }

    const Le = T.a.create(e => ({ detailLink: { marginTop: e.spaces.small } }))
    var Ue = Oe(Be), Ve = s('LdEA'), Me = s.n(Ve), ze = (s('iKE+'), s('DZ+c'), s('RgK2')), qe = s.n(ze), He = s('3zvM'), Ge = s('lMB6'),
      Ye = s('FgXs')
    const We = e => ({ valid: !0 })

    function Xe(e = {}) {
      const { localValidator: t = We } = e, s = Me()(e, [ 'localValidator' ]),
        a = Object(He.e)(Object.assign({ customActions: { clear: { reducer: (e, t) => ({}) } } }, s))
      a.clear = () => e => e({ type: a.customActionTypes.clear.SUCCESS }), a.validate = (e, s) => n => {
        const i = t(e, s)
        return i.valid ? n(a.fetchOneIfNeeded(e, s)) : (n(a.add({ [e]: i })), Promise.resolve())
      }
      return a.selectEntitiesWithFetchStatus = Object(z.createSelector)(a.selectAll, e => a.selectState(e).fetchStatus || qe.a, (e, t) => Object(Ye.a)(t, (t, s) => {
        const a = e[s] || {}
        return Object.assign({}, a, {
          valid: !!a.valid || t === me.a.FAILED,
          isLoading: t === me.a.LOADING
        })
      })), Ge.a.register(a)
    }

    const Ke = new RegExp('^[a-zA-Z0-9_\\-+\\.!\\&]+@(?:[a-zA-Z0-9\\-_]+\\.)+[a-zA-Z]{2,63}$'), Ze = fe.a.hc72e1fc
    var $e = Xe({
      namespace: 'emailValidity',
      fetchOneContext: 'FETCH_EMAIL_VALIDITY',
      fetchOneEndpoint: e => e.Validity.isEmailAvailable,
      fetchOneParams: ([ e ], t) => Object.assign({ email: e }, t),
      localValidator: e => {
        const t = Ke.test(e)
        return {
          errorMessage: Ze,
          valid: t
        }
      }
    }), Qe = (s('tVqn'), s('rxPX'))
    const Je = (e, t) => t.module.selectEntitiesWithFetchStatus(e)
    var et = Object(Qe.a)().propsFromState(() => ({ validity: Je })).propsFromActions(({ module: e }) => ({
      clearValidity: e.clear,
      createLocalApiErrorHandler: Object(M.d)('VALIDITY_FIELD_CONTEXT'),
      validate: e.validate
    })), tt = s('VY6S'), st = s('mN6z')

    class at extends o.Component {
      constructor(e, t) {
        super(e, t), r()(this, '_setInputRef', e => {
          this._input = e
        }), r()(this, '_handleValueChange', e => {
          const {
            onChange: t,
            validationParams: s
          } = this.props, a = e.target.value.trim()
          this._validateDebounced(Object.assign({ value: a }, s)), this.setState({ value: a }), t && t(e)
        }), r()(this, '_getIsValid', (e, t) => !!(t && e[t] && e[t].valid))
        const s = e.defaultValue || ''
        this.state = {
          value: s,
          isValid: this._getIsValid(e.validity, s)
        }, this._validateDebounced = Object(tt.a)(e => {
          let { value: t } = e, s = Me()(e, [ 'value' ])
          return this.props.validate(t, s).catch(this.props.createLocalApiErrorHandler())
        }, 500)
      }

      componentWillUnmount() {
        this.props.clearValidity(), this._validateDebounced.clear(), this.props.onRef(null)
      }

      componentDidMount() {
        const {
          defaultValue: e,
          validationParams: t
        } = this.props
        e && this._validateDebounced(Object.assign({ value: e }, t)), this.props.onValidityChange(this.state.isValid), this.props.onRef({
          clear: () => this.clear(),
          focus: () => this.focus(),
          isValid: () => this.isValid(),
          getValue: () => this.getValue()
        })
      }

      UNSAFE_componentWillUpdate(e, t) {
        const { validity: s } = this.props, { value: a } = this.state
        if (s !== e.validity || a !== t.value) {
          const s = this._getIsValid(e.validity, t.value)
          this.state.isValid !== s && this.setState({ isValid: s })
        }
      }

      componentDidUpdate(e, t) {
        const { value: s } = this.state, a = t.isValid !== this.state.isValid,
          n = !Object(st.a)(e.validationParams, this.props.validationParams)
        a ? this.props.onValidityChange(this.state.isValid) : s && n && (this.props.clearValidity(), this._validateDebounced(Object.assign({ value: s }, this.props.validationParams)))
      }

      render() {
        const {
          autoComplete: e,
          autoFocus: t,
          editable: s,
          label: a,
          name: n,
          style: i,
          type: r,
          validity: l
        } = this.props, { value: c } = this.state, d = c && l[c] ? l[c].errorMessage : ''
        return o.createElement(Ae.a, {
          autoComplete: e,
          autoFocus: t,
          editable: s,
          errorText: d,
          invalid: !!d,
          label: a,
          name: n,
          onChange: this._handleValueChange,
          ref: this._setInputRef,
          style: i,
          type: r,
          value: this.state.value
        })
      }

      clear() {
        this.setState({
          value: '',
          isValid: !1
        })
      }

      isValid() {
        return this.state.isValid
      }

      getValue() {
        return this.state.value
      }

      focus() {
        this._input && this._input.focus()
      }
    }

    r()(at, 'defaultProps', { label: '' })
    var nt = et(at), it = s('H9wA')
    const rt = {
      autoComplete: _.string,
      autoFocus: _.bool,
      defaultValue: _.string,
      editable: _.bool,
      label: _.string,
      name: _.string.isRequired,
      onChange: _.func,
      onRef: _.func.isRequired,
      onValidityChange: _.func.isRequired,
      style: it.a.style,
      type: _.string
    }
    Object.assign({}, rt, {
      clearValidity: _.func.isRequired,
      createLocalApiErrorHandler: _.func.isRequired,
      module: _.object.isRequired,
      validate: _.func.isRequired,
      validity: _.object.isRequired
    })
    var ot = e => {
      const { onRef: t } = e, s = Me()(e, [ 'onRef' ])
      return o.createElement(nt, n()({
        module: $e,
        onRef: t,
        type: 'email'
      }, s))
    }
    const lt = fe.a.c52be451, ct = fe.a.cfd2f35d, dt = fe.a.gea6cc19, ut = fe.a.i769e50a, ht = fe.a.ec129eb6, pt = fe.a.f1b50489,
      _t = fe.a.deaf5b15

    class mt extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleRemoveContactsClick', () => {
          this.setState({ showRemoveContactsDialog: !0 })
        }), r()(this, '_handleRemoveContactsConfirm', () => {
          this.setState({ showRemoveContactsDialog: !1 }), this._handleRemoveContacts()
        }), r()(this, '_handleRemoveContacts', () => {
          const {
            addToast: e,
            removeContacts: t
          } = this.props
          t().then(t => {
            this.setState({ disableRemoveContactsButton: !0 }), e({
              text: ht,
              withClearButton: !0
            })
          }).catch(t => {
            e({
              action: {
                label: _t,
                onAction: this._handleRemoveContacts
              },
              text: pt,
              withAutoDismiss: !0
            })
          })
        }), r()(this, '_handleRemoveContactsCancel', () => {
          this.setState({ showRemoveContactsDialog: !1 })
        }), this.state = {
          showRemoveContactsDialog: !1,
          disableRemoveContactsButton: !1
        }
      }

      render() {
        var e
        const {
          onNavigate: t,
          removeContactsSetting: s,
          subtaskInputs: a
        } = this.props, { disableRemoveContactsButton: i } = this.state
        return o.createElement(w.a, null, o.createElement(g, n()({}, s.primary_text, {
          onNavigate: t,
          style: bt.header,
          subtaskInputs: a
        })), o.createElement(g, n()({}, s.secondary_text, {
          color: 'gray600',
          onNavigate: t,
          size: 'small',
          style: bt.subtext,
          subtaskInputs: a
        })), o.createElement(w.a, null, (null == (e = s.value_data) ? void 0 : e.action_data) ? o.createElement(D.a, {
          disabled: i,
          onPress: this._handleRemoveContactsClick,
          type: 'destructiveText'
        }, s.value_data.action_data.link.label) : null, this._maybeRenderRemoveContactsDialog()))
      }

      _maybeRenderRemoveContactsDialog() {
        return this.state.showRemoveContactsDialog ? o.createElement(c.a, {
          cancelButtonLabel: ct,
          confirmButtonLabel: lt,
          headline: dt,
          onCancel: this._handleRemoveContactsCancel,
          onConfirm: this._handleRemoveContactsConfirm,
          onMaskClick: this._handleRemoveContactsCancel,
          text: ut
        }) : null
      }
    }

    const bt = T.a.create(e => ({
      header: {
        marginTop: e.spaces.xSmall,
        marginBottom: e.spaces.xSmall
      },
      subtext: { marginBottom: e.spaces.medium }
    }))
    var gt = mt
    const ft = Object(_.shape)({
      action: _.string.isRequired,
      text: _.string
    }), kt = Object(_.shape)({
      subtask_data_reference: Object(_.shape)({
        subtask_id: _.string.isRequired,
        key: _.string.isRequired
      })
    }), yt = Object(_.shape)({
      media_data_reference: kt.isRequired,
      style: Object(_.oneOf)(Object.values(h.h)).isRequired
    }), vt = Object(_.shape)({
      link_type: Object(_.oneOf)(Object.values(h.i)).isRequired,
      link_id: _.string.isRequired,
      label: _.string,
      label_icon: _.string,
      continue_message: _.string,
      url: _.string,
      subtask_navigation_context: ft,
      is_destructive: _.bool,
      suppress_client_events: _.bool,
      subtask_id: _.string
    }), wt = Object(_.shape)({
      from_index: _.number.isRequired,
      to_index: _.number.isRequired,
      navigation_link: vt,
      subtask_data_reference: kt
    }), Ct = Object(_.shape)({
      text: _.string.isRequired,
      entities: Object(_.arrayOf)(wt).isRequired
    }), Et = Object(_.shape)({
      threshold: _.number,
      text: Ct
    }), xt = Object(_.shape)({
      label_conditional_text: Object(_.arrayOf)(Et),
      min_enable_count: _.number,
      max_enable_count: _.number
    }), It = Object(_.shape)({
      id: _.string.isRequired,
      name: _.string.isRequired
    }), St = Object(_.shape)({
      user_id: _.number.isRequired,
      user: _.object.isRequired,
      social_text: _.string,
      tracking_token: _.string,
      checked_by_default: _.bool.isRequired
    }), Ot = Object(_.shape)({
      header: _.string,
      show_more: _.object,
      items: Object(_.arrayOf)(Object(_.oneOfType)([ It, St ])).isRequired
    }), At = Object(_.shape)({ initial_value: _.bool.isRequired }), Tt = Object(_.shape)({
      threshold: _.number.isRequired,
      text: Ct
    }), Rt = Object(_.shape)({
      primary_text: Ct.isRequired,
      secondary_text: Ct,
      value_data: Object(_.shape)({
        boolean_data: At,
        settings_group_data: Object(_.shape)({
          settings: Object(_.arrayOf)(Object(_.shape)({
            primary_text: Ct.isRequired,
            secondary_text: Ct,
            value_data: Object(_.shape)({ boolean_data: At }),
            value_identifier: _.string,
            value_type: Object(_.oneOf)(Object.values(h.l))
          })).isRequired,
          status_text_quantity_pairs: Object(_.arrayOf)(Tt)
        })
      }),
      value_identifier: _.string,
      value_type: Object(_.oneOf)(Object.values(h.l))
    }), Pt = Object(_.shape)({
      id: _.string.isRequired,
      text: Ct.isRequired
    })

    class Dt extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleActionClick', () => {
          const {
            onNavigate: e,
            settingValue: t
          } = this.props, { value_data: s } = t
          s.action_data && s.action_data.link && e(s.action_data.link)
        }), r()(this, '_getSettingValueFromSubtaskInputs', e => {
          const {
            subtaskId: t,
            subtaskInputs: s
          } = this.props, {
            value_identifier: a,
            value_type: n
          } = e, i = Object(u.d)(s, {
            key: h.k,
            subtask_id: t
          }, []).find(e => e.key === a)
          let r
          return i && Object(u.g)(n) && (r = i.response_data.boolean_data.result), r
        }), r()(this, '_handleSettingGroupClick', () => {
          const {
            onSettingGroupClick: e,
            settingValue: t
          } = this.props
          e && e(t)
        }), r()(this, '_handleSettingToggle', () => {
          const {
            onSettingToggle: e,
            settingValue: t
          } = this.props, { value_identifier: s } = t
          this.setState(Object.assign({}, this.state, { [s]: !this.state[s] })), e && e(t)
        }), r()(this, '_addToast', e => {
          this.props.addToast && this.props.addToast(e)
        })
        const { settingValue: t } = e, {
          value_data: s,
          value_identifier: a,
          value_type: n
        } = t
        if (Object(u.g)(n)) {
          let e = this._getSettingValueFromSubtaskInputs(t)
          void 0 === e && (e = s.boolean_data.initial_value), this.state = { [a]: e }
        }
      }

      render() {
        const { value_type: e } = this.props.settingValue
        switch (e) {
          case h.l.Action:
            return this._renderAction()
          case h.l.Boolean:
          case h.l.PreciseLocation:
            return this._renderSettingOption()
          case h.l.SettingsGroup:
            return this._renderSettingsGroup()
          case h.l.StaticText:
            return this._renderHeader()
          case h.l.DestructiveAction:
            return this._renderDestructiveAction()
          default:
            return null
        }
      }

      _renderHeader() {
        const {
          onNavigate: e,
          settingValue: t,
          subtaskInputs: s
        } = this.props, { primary_text: a } = t
        return o.createElement(w.a, { style: jt.header }, o.createElement(g, n()({}, a, {
          onNavigate: e,
          size: 'large',
          subtaskInputs: s,
          weight: 'bold'
        })))
      }

      _renderDestructiveAction() {
        const {
          onNavigate: e,
          removeContacts: t,
          settingValue: s,
          subtaskInputs: a
        } = this.props
        return o.createElement(w.a, { style: { marginBottom: T.a.theme.spaces.small } }, o.createElement(gt, {
          addToast: this._addToast,
          onNavigate: e,
          removeContacts: t,
          removeContactsSetting: s,
          subtaskInputs: a
        }))
      }

      _renderAction() {
        const {
          onNavigate: e,
          settingValue: t,
          subtaskInputs: s
        } = this.props
        return o.createElement(w.a, null, o.createElement(g, n()({}, t.primary_text, {
          onNavigate: e,
          style: jt.header,
          subtaskInputs: s
        })), o.createElement(g, n()({}, t.secondary_text, {
          color: 'gray600',
          onNavigate: e,
          size: 'small',
          style: jt.subtext,
          subtaskInputs: s
        })), o.createElement(w.a, null, o.createElement(D.a, {
          onPress: this._handleActionClick,
          type: 'text'
        }, t.value_data.action_data.link.label)))
      }

      _renderSettingOption() {
        const {
          onNavigate: e,
          settingValue: t,
          showDividers: s,
          subtaskInputs: a
        } = this.props, {
          primary_text: i,
          secondary_text: r,
          value_identifier: l
        } = t
        return o.createElement(w.a, {
          accessibilityRole: 'label',
          accessible: !0,
          style: [ R.option, s && jt.optionDivider ]
        }, o.createElement(w.a, { style: R.checkboxText }, o.createElement(g, n()({}, i, {
          onNavigate: e,
          subtaskInputs: a
        })), r && o.createElement(g, n()({}, r, {
          color: 'gray600',
          onNavigate: e,
          size: 'small',
          style: jt.secondaryText,
          subtaskInputs: a
        }))), o.createElement(P.a, {
          checked: this.state[l],
          name: l,
          onChange: this._handleSettingToggle
        }))
      }

      _renderSettingsGroup() {
        const {
          onNavigate: e,
          settingValue: t,
          subtaskInputs: s
        } = this.props, {
          primary_text: a,
          secondary_text: i,
          value_data: r
        } = t, {
          settings: l,
          status_text_quantity_pairs: c
        } = r.settings_group_data
        return o.createElement(w.a, {
          accessibilityRole: 'button',
          onClick: this._handleSettingGroupClick,
          style: jt.settingGroup
        }, o.createElement(g, n()({}, a, {
          onNavigate: e,
          subtaskInputs: s
        })), this._renderQuantityStatus(l, c), i && o.createElement(g, n()({}, i, {
          color: 'gray600',
          onNavigate: e,
          size: 'small',
          subtaskInputs: s
        })))
      }

      _renderQuantityStatus(e, t) {
        const {
          onNavigate: s,
          subtaskInputs: a
        } = this.props, i = e.reduce((e, t) => e + (this._getSettingValueFromSubtaskInputs(t) ? 1 : 0), 0)
        let r
        return t.forEach(e => {
          i >= e.threshold && (r = o.createElement(g, n()({}, e.text, {
            color: 'gray600',
            onNavigate: s,
            size: 'small',
            style: jt.quantityStatusText,
            subtaskInputs: a
          })))
        }), r
      }
    }

    const jt = T.a.create(e => ({
      header: { marginTop: e.spaces.large },
      secondaryText: { marginTop: e.spaces.xSmall },
      quantityStatusText: {
        marginTop: e.spaces.micro,
        marginBottom: e.spaces.xSmall
      },
      optionDivider: {
        paddingBottom: e.spaces.xSmall,
        borderBottomColor: e.colors.borderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: e.borderWidths.small
      },
      settingGroup: { marginTop: e.spaces.xSmall }
    }))

    class Nt extends o.Component {
      constructor(e) {
        super(e), r()(this, '_renderEmailTextField', () => o.createElement(ot, {
          autoComplete: 'email',
          defaultValue: this.state.email,
          label: this.props.subtask.hint_text,
          name: 'email',
          onRef: this._handleSetInputRef,
          onValidityChange: this._handleUpdateValidity,
          style: Ft.emailTextField
        })), r()(this, '_renderDiscoverabilitySetting', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            subtaskInputs: a,
            updateFlow: n
          } = this.props
          return t.discoverability_setting ? o.createElement(Dt, {
            onNavigate: e,
            onSettingToggle: this._handleDiscoverabilitySettingToggle,
            removeContacts: y.a,
            settingValue: t.discoverability_setting,
            subtaskId: s,
            subtaskInputs: a,
            updateFlow: n
          }) : null
        }), r()(this, '_handleDiscoverabilitySettingToggle', e => {
          const t = this.state.discoverabilityValue
          this.setState({ discoverabilityValue: !t })
        }), r()(this, '_handleDoneButtonClick', () => {
          const { subtask: e } = this.props, { discoverabilityValue: t } = this.state, s = {
            discoverability_value: t,
            email: this._getIdentifierValue(),
            link: e.next_link.link_id
          }
          this._handleButtonClick(e.next_link, s)
        }), r()(this, '_handleSkipButtonClick', () => {
          const { subtask: e } = this.props
          e.skip_link && this._handleButtonClick(e.skip_link, { link: e.skip_link.link_id })
        }), r()(this, '_handleButtonClick', (e, t) => {
          const {
            onNavigate: s,
            subtaskId: a,
            updateFlow: n
          } = this.props
          n(a, t), s(e)
        }), r()(this, '_handleSetInputRef', e => {
          this._input = e
        }), r()(this, '_handleUpdateValidity', () => {
          const e = this._input && this._input.isValid()
          this.setState({ isValid: !!e })
        }), r()(this, '_getIdentifierValue', () => this._input && this._input.getValue() || void 0)
        const {
            subtask: t,
            subtaskId: s,
            subtaskInputs: a
          } = e,
          n = t.discoverability_setting && t.discoverability_setting.value_data && t.discoverability_setting.value_data.boolean_data && t.discoverability_setting.value_data.boolean_data.initial_value,
          i = Object(u.d)(a, {
            key: 'discoverability_value',
            subtask_id: s
          }, void 0) || n, l = Object(u.d)(a, {
            key: 'email',
            subtask_id: s
          }, '') || void 0
        this.state = {
          discoverabilityValue: i,
          email: l,
          isValid: !!l
        }
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          progressIndication: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, {
          primary_text: c,
          secondary_text: d,
          next_link: u,
          skip_link: h
        } = i, p = this.state.isValid || !h ? o.createElement(D.a, {
          disabled: !this.state.isValid,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, u.label) : o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, h.label)
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          progressIndication: a,
          rightControl: p
        }, o.createElement(w.a, null, o.createElement(w.a, { style: R.contentArea }, c && o.createElement(g, n()({}, c, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: r,
          weight: 'bold'
        })), d && o.createElement(g, n()({}, d, {
          color: 'gray600',
          onNavigate: s,
          subtaskInputs: r
        })), o.createElement(w.a, { style: Ft.textFieldArea }, this._renderEmailTextField()), this._renderDiscoverabilitySetting())), this.props.errorDialog)
      }
    }

    const Ft = T.a.create(e => ({
      textFieldArea: { marginTop: e.spaces.medium },
      emailTextField: {
        paddingHorizontal: 0,
        paddingVertical: e.spaces.small
      }
    })), Bt = { scribeAction: B.c }
    var Lt = Object(V.b)(Bt), Ut = s('IMA+')
    var Vt = e => {
      const {
        onNavigate: t,
        primaryTextProp: s,
        secondaryTextProp: a,
        header: i,
        subtaskInputs: r
      } = e
      let c, d, u
      return i ? (u = i.user, c = i.primary_text, d = i.secondary_text) : (c = s, d = a), o.createElement(w.a, { style: R.contentArea }, c ? o.createElement(g, n()({}, c, {
        nativeID: l.i,
        onNavigate: t,
        size: 'xLarge',
        style: R.headline,
        subtaskInputs: r,
        weight: 'bold'
      })) : null, d ? o.createElement(g, n()({}, d, {
        color: 'gray600',
        onNavigate: t,
        subtaskInputs: r
      })) : null, u ? o.createElement(Ut.a, {
        avatarUri: u.profile_image_url_https,
        displayMode: 'UserCompact',
        name: u.name,
        screenName: u.screen_name,
        userId: u.id_str
      }) : null)
    }, Mt = s('/Dbh')
    const zt = fe.a.d5568440
    var qt = Xe({
      namespace: 'passwordValidity',
      fetchOneContext: 'FETCH_PASSWORD_VALIDITY',
      fetchOneEndpoint: e => e.Validity.fetchPasswordStrength,
      fetchOneParams: ([ e ], t) => Object.assign({ password: e }, t),
      localValidator: (e, t) => {
        const s = !(!t || !t.username) && e === t.username, a = e.length >= Mt.b, n = e.length <= Mt.a
        let i = zt
        return a ? n || (i = M.a) : i = M.b, {
          errorMessage: !s && a && n ? void 0 : i,
          valid: a && n && !s
        }
      }
    })
    const Ht = Object(z.createSelector)(qt.selectEntitiesWithFetchStatus, e => ({ validityMap: e })), Gt = {
      clearPasswordValidity: qt.clear,
      createLocalApiErrorHandler: Object(M.d)('PASSWORD_FIELD_CONTEXT'),
      scribeAction: B.c,
      validator: qt.validate
    }
    var Yt = Object(V.g)(Ht, Gt)
    const Wt = fe.a.dec3c9b8, Xt = {
      page: 'onboarding',
      component: 'password_entry'
    }, Kt = fe.a.fa69a1ca, Zt = fe.a.aacf5085

    class $t extends o.Component {
      constructor(e) {
        super(e), r()(this, '_onValidationUpdated', e => () => {
          const {
            validityMap: t,
            scribeAction: s,
            onPasswordValidated: a,
            customValidator: n
          } = this.props
          let { valid: i = !1 } = e && t[e] ? t[e] : {}
          n && 'string' == typeof e && 0 === e.length && (i = n().valid), this.setState({ valid: i }), s(Object.assign({}, Xt, {
            element: 'entered_password',
            action: i ? 'valid' : 'invalid'
          })), a(i)
        }), r()(this, '_renderFormTextInput', () => {
          const {
            autoComplete: e,
            validityMap: t,
            label: s,
            customValidator: a
          } = this.props, {
            revealed: n,
            password: i
          } = this.state
          let { valid: r } = this.state, { errorMessage: l = '' } = t[i] || {}
          a && 0 === l.length && (l = a().errorMessage, r = a().valid)
          const c = o.createElement(p.c, {
            accessibilityRole: 'button',
            color: 'link',
            onPress: this._handleVisibilityToggle,
            style: Qt.toggleLink
          }, n ? Zt : Kt)
          return o.createElement(Ae.a, {
            autoComplete: e,
            errorText: l,
            helperText: c,
            invalid: !r,
            label: s || Wt,
            name: 'password',
            onChange: this._handlePasswordUpdated,
            style: R.formTextInput,
            type: n ? 'text' : 'password',
            value: i
          })
        }), r()(this, '_handleVisibilityToggle', () => {
          this.setState({ revealed: !this.state.revealed })
        }), r()(this, '_handlePasswordUpdated', e => {
          const {
            onPasswordChange: t,
            skipPasswordValidation: s,
            userIdentifier: a
          } = this.props, n = e.target.value
          s || this._validateDebounced(n, { username: a }), this.setState({ password: n }), t(n)
        })
        const { defaultValue: t } = e
        this.state = {
          revealed: !1,
          password: t || '',
          valid: !0
        }, this._validateDebounced = Object(tt.a)((e, t) => {
          this.props.validator(e, t).catch(this.props.createLocalApiErrorHandler()).then(this._onValidationUpdated(e))
        }, 500)
      }

      componentWillUnmount() {
        this.props.clearPasswordValidity(), this._validateDebounced.clear()
      }

      render() {
        const { userIdentifier: e } = this.props
        return o.createElement(w.a, { style: R.formTextInput }, e ? o.createElement('input', {
          name: 'username',
          type: 'hidden',
          value: e
        }) : null, this._renderFormTextInput())
      }
    }

    r()($t, 'defaultProps', {
      autoComplete: 'on',
      onPasswordChange: y.a,
      onPasswordValidated: y.a,
      skipPasswordValidation: !1
    })
    const Qt = T.a.create(e => ({ toggleLink: { marginTop: e.spaces.xxSmall } }))
    var Jt = Yt($t)
    const es = fe.a.d1f6d336, ts = fe.a.a3841918, ss = fe.a.f70cd5ed

    class as extends o.Component {
      constructor(e) {
        super(e), r()(this, 'renderIdentifier', () => {
          const { subtask: e } = this.props, {
            user_identifier_display_type: t,
            phone_number: s,
            username: a,
            email: n
          } = e
          let i, r
          return 'phone_number' === t && (i = s, r = ss), 'username' === t && (i = a, r = es), 'email' === t && (i = n, r = ts), i && r ? o.createElement(Ae.a, {
            editable: !1,
            label: r,
            name: i,
            style: R.formTextInput
          }) : null
        }), r()(this, '_validatePasswordConfirmation', () => {
          const { subtask: e } = this.props, {
            show_password_confirmation: t,
            password_confirmation_mismatch_message: s
          } = e
          if (t && (null == s ? void 0 : s.text)) {
            const {
              password: e,
              passwordConfirmation: t
            } = this.state
            if (e !== t) {
              return {
                valid: !1,
                errorMessage: s.text
              }
            }
          }
          return {
            valid: !0,
            errorMessage: void 0
          }
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          this._saveCredentialsIfNeeded().then(() => {
            a(s, {
              password: this.state.password,
              link: t.next_link.link_id
            }), e(t.next_link)
          }).catch(() => {
            this._scribeSmartLockError(), a(s, {
              password: this.state.password,
              link: t.next_link.link_id
            }), e(t.next_link)
          })
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, n = t.skip_link
          n && (a(s, { link: n.link_id }), e(n))
        }), r()(this, '_scribeSmartLockError', () => {
          const { scribeAction: e } = this.props
          e({
            page: 'onboarding',
            section: 'enter_password',
            component: 'smart_lock',
            element: 'prompt',
            action: 'error'
          })
        }), r()(this, '_handlePasswordChange', e => {
          this.setState({ password: e })
        }), r()(this, '_handlePasswordConfirmationChange', e => {
          this.setState({ passwordConfirmation: e })
        }), r()(this, '_handleValidationChange', e => {
          const { subtask: t } = this.props, { show_password_confirmation: s } = t
          if (s) {
            const t = this._validatePasswordConfirmation().valid
            this.setState({ isPasswordValid: e && t })
          } else {
            this.setState({ isPasswordValid: e })
          }
        }), r()(this, '_saveCredentialsIfNeeded', () => {
          const { subtask: e } = this.props, {
            email: t,
            phone: s,
            username: a,
            skip_password_validation: n
          } = e, { password: i } = this.state, r = !!window.PasswordCredential, o = a || t || s
          if (o && r && !n && navigator.credentials) {
            const e = new window.PasswordCredential({
              id: o,
              password: i
            })
            return navigator.credentials.store(e)
          }
          return Promise.resolve()
        }), this.state = {}
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          onBackClick: s,
          onNavigate: a,
          subtask: n,
          subtaskInputs: i,
          progressIndication: r
        } = this.props, {
          isPasswordValid: l,
          password: c
        } = this.state, d = !(c && c.length), u = l || n.skip_password_validation && !d, h = u || !n.skip_link ? o.createElement(D.a, {
          disabled: !u,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, n.next_link.label) : o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, n.skip_link.label), {
          user_identifier_display_type: p,
          show_password_confirmation: _
        } = n
        return o.createElement(v.a, {
          hideBackButton: !0,
          history: t,
          onBackClick: s,
          progressIndication: r,
          rightControl: h
        }, o.createElement(w.a, { style: R.contentArea }, o.createElement(Vt, {
          header: n.header,
          onNavigate: a,
          primaryTextProp: n.primary_text,
          secondaryTextProp: n.secondary_text,
          subtaskInputs: i
        }), p ? this.renderIdentifier() : null, o.createElement(Jt, {
          label: n.hint,
          onPasswordChange: this._handlePasswordChange,
          onPasswordValidated: this._handleValidationChange,
          skipPasswordValidation: n.skip_password_validation,
          userIdentifier: n.username
        }), _ ? o.createElement(Jt, {
          customValidator: this._validatePasswordConfirmation,
          label: n.password_confirmation_hint,
          onPasswordChange: this._handlePasswordConfirmationChange,
          onPasswordValidated: this._handleValidationChange,
          userIdentifier: n.username
        }) : null), e)
      }
    }

    var ns = Lt(as)
    const is = new RegExp('^\\+?[0-9\\-\\.\\(\\)\\s]{7,1000}$'), rs = fe.a.cd24fe6f
    var os = Xe({
      namespace: 'phoneNumberValidity',
      fetchOneContext: 'FETCH_PHONE_VALIDITY',
      fetchOneEndpoint: e => e.Validity.isPhoneNumberAvailable,
      fetchOneParams: ([ e ], t) => Object.assign({ raw_phone_number: e }, t),
      localValidator: e => {
        const t = is.test(e)
        return {
          errorMessage: rs,
          valid: t
        }
      }
    })
    var ls = e => {
      const {
        countryCode: t,
        onRef: s
      } = e, a = Me()(e, [ 'countryCode', 'onRef' ]), i = { country_code: t }
      return o.createElement(nt, n()({
        module: os,
        onRef: s,
        type: 'tel',
        validationParams: i
      }, a))
    }, cs = s('6XNv')
    const ds = fe.a.gf8388fe

    class us extends o.Component {
      constructor(e) {
        super(e), r()(this, '_renderCountryCodes', () => {
          const { country_codes: e } = this.props.subtask
          if (e && e.length) {
            const t = e.map(e => ({
              label: e.text.text,
              value: e.id
            }))
            return o.createElement(cs.a, {
              helperText: void 0,
              label: ds,
              onChange: this._handleCountryChange,
              options: t,
              value: this.state.countryCode || ''
            })
          }
          return null
        }), r()(this, '_handleCountryChange', e => {
          this.setState({ countryCode: e })
        }), r()(this, '_renderPhoneTextField', () => o.createElement(ls, {
          autoComplete: 'tel',
          countryCode: this.state.countryCode,
          defaultValue: this.state.phoneNumber,
          label: this.props.subtask.hint_text,
          name: 'phone_number',
          onRef: this._handleSetInputRef,
          onValidityChange: this._handleUpdateValidity,
          style: hs.phoneTextField
        })), r()(this, '_renderDiscoverabilitySetting', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            subtaskInputs: a,
            updateFlow: n
          } = this.props
          return t.discoverability_setting ? o.createElement(Dt, {
            onNavigate: e,
            onSettingToggle: this._handleDiscoverabilitySettingToggle,
            removeContacts: y.a,
            settingValue: t.discoverability_setting,
            subtaskId: s,
            subtaskInputs: a,
            updateFlow: n
          }) : null
        }), r()(this, '_handleDiscoverabilitySettingToggle', e => {
          const t = this.state.discoverabilityValue
          this.setState({ discoverabilityValue: !t })
        }), r()(this, '_handleDoneButtonClick', () => {
          const { subtask: e } = this.props, {
            countryCode: t,
            discoverabilityValue: s
          } = this.state, a = {
            country_code: t,
            discoverability_value: s,
            phone_number: this._getIdentifierValue(),
            link: e.next_link.link_id
          }
          this._handleButtonClick(e.next_link, a)
        }), r()(this, '_handleSkipButtonClick', () => {
          const { subtask: e } = this.props
          e.skip_link && this._handleButtonClick(e.skip_link, { link: e.skip_link.link_id })
        }), r()(this, '_handleButtonClick', (e, t) => {
          const {
            onNavigate: s,
            subtaskId: a,
            updateFlow: n
          } = this.props
          n(a, t), s(e)
        }), r()(this, '_handleSetInputRef', e => {
          this._input = e
        }), r()(this, '_handleUpdateValidity', () => {
          const e = this._input && this._input.isValid()
          this.setState({ isValid: !!e })
        }), r()(this, '_getIdentifierValue', () => this._input && this._input.getValue() || void 0)
        const {
            subtask: t,
            subtaskId: s,
            subtaskInputs: a
          } = e,
          n = t.discoverability_setting && t.discoverability_setting.value_data && t.discoverability_setting.value_data.boolean_data && t.discoverability_setting.value_data.boolean_data.initial_value,
          i = Object(u.d)(a, {
            key: 'country_code',
            subtask_id: s
          }, t.default_country_code) || void 0, l = Object(u.d)(a, {
            key: 'discoverability_value',
            subtask_id: s
          }, void 0) || n, c = Object(u.d)(a, {
            key: 'phone_number',
            subtask_id: s
          }, '') || void 0
        this.state = {
          countryCode: i,
          discoverabilityValue: l,
          phoneNumber: c,
          isValid: !!c
        }
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          progressIndication: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, {
          primary_text: c,
          secondary_text: d,
          next_link: u,
          skip_link: h
        } = i, p = this.state.isValid || !h ? o.createElement(D.a, {
          disabled: !this.state.isValid,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, u.label) : o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, h.label)
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          progressIndication: a,
          rightControl: p
        }, o.createElement(w.a, null, o.createElement(w.a, { style: R.contentArea }, c && o.createElement(g, n()({}, c, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: r,
          weight: 'bold'
        })), d && o.createElement(g, n()({}, d, {
          color: 'gray600',
          onNavigate: s,
          subtaskInputs: r
        })), o.createElement(w.a, { style: hs.textFieldArea }, this._renderCountryCodes(), this._renderPhoneTextField()), this._renderDiscoverabilitySetting())), this.props.errorDialog)
      }
    }

    const hs = T.a.create(e => ({
      textFieldArea: { marginTop: e.spaces.medium },
      phoneTextField: {
        paddingHorizontal: 0,
        paddingVertical: e.spaces.small
      }
    }))
    var ps = s('Lam0')

    class _s extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_handleRecaptchaStateChange', e => {
          const {
            subtaskId: t,
            subtask: s,
            updateFlow: a,
            onNavigate: n
          } = this.props, { next_link: i } = s
          e && (a(t, {
            link: i.link_id,
            recaptcha_response: e
          }), n(i))
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        })
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          onBackClick: s,
          onNavigate: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, {
          primary_text: c,
          secondary_text: d,
          skip_link: u
        } = i, h = u && o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, u.label)
        return o.createElement(v.a, {
          history: t,
          onBackClick: s,
          rightControl: h
        }, o.createElement(w.a, { style: R.contentArea }, c ? o.createElement(g, n()({}, c, {
          nativeID: l.i,
          onNavigate: a,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: r,
          weight: 'bold'
        })) : null, d ? o.createElement(g, n()({}, d, {
          color: 'gray600',
          onNavigate: a,
          subtaskInputs: r
        })) : null, o.createElement(ps.a, {
          nextButtonDisabled: !1,
          onChange: this._handleRecaptchaStateChange,
          withConsentForm: !1
        })), e)
      }
    }

    class ms extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { next_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, Object.assign({}, this.state, { link: t.link_id })), e(t)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        }), r()(this, '_handleEntryUpdated', e => {
          const { value: t = '' } = e.target
          this.setState({ text: t })
        }), r()(this, '_getAutoCompleteFromKeyboardType', e => {
          switch (e) {
            case h.g.Email:
              return 'email'
            case h.g.Telephone:
              return 'tel'
            default:
              return
          }
        }), r()(this, '_getPropsFromKeyboardType', e => {
          switch (e) {
            case h.g.Email:
              return 'email'
            case h.g.Number:
              return 'number'
            case h.g.Password:
              return 'password'
            case h.g.Telephone:
              return 'tel'
            default:
              return 'text'
          }
        }), this.state = { text: this.props.subtask.default_text || '' }
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          onBackClick: s,
          onNavigate: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, {
          keyboard_type: l,
          hint_text: c,
          max_length: d,
          multiline: u,
          next_link: h,
          skip_link: p,
          detail_text: _
        } = i, m = o.createElement(D.a, {
          disabled: !p && !this.state.text,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, h.label), b = p && o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, p.label)
        return o.createElement(v.a, {
          history: t,
          onBackClick: s,
          rightControl: this.state.text || !p ? m : b
        }, o.createElement(w.a, { style: R.contentArea }, o.createElement(Vt, {
          header: i.header,
          onNavigate: a,
          primaryTextProp: i.primary_text,
          secondaryTextProp: i.secondary_text,
          subtaskInputs: r
        }), o.createElement(Ae.a, {
          autoComplete: this._getAutoCompleteFromKeyboardType(l),
          label: c || '',
          maxLength: d,
          multiline: u,
          name: 'text',
          onChange: this._handleEntryUpdated,
          type: this._getPropsFromKeyboardType(l),
          value: this.state.text
        }), _ ? o.createElement(g, n()({}, _, {
          color: 'gray600',
          onNavigate: a,
          subtaskInputs: r
        })) : null), e)
      }
    }

    var bs = s('LXAX')
    const gs = Object(z.createSelector)(H.e.selectLoggedInUser, bs.b, L.l, (e, t, s) => ({
      loggedInUser: e,
      navigationContext: s,
      isUsernameValid: t.valid,
      validationError: t.desc
    })), fs = { fetchUsernameAvailability: bs.a }
    var ks = Object(V.g)(gs, fs), ys = s('EweD')
    const vs = fe.a.d1f6d336

    class ws extends o.Component {
      constructor(e) {
        super(e), r()(this, '_maybeRenderDetailTexts', () => {
          const {
            subtask: e,
            subtaskInputs: t
          } = this.props, { currentDetailTextIndex: s } = this.state
          return e.detail_texts && e.detail_texts.length ? o.createElement(g, n()({}, e.detail_texts[s], {
            color: 'link',
            onNavigate: this._handleDetailTextClick,
            style: Cs.detailLink,
            subtaskInputs: t
          })) : void 0
        }), r()(this, '_handleDetailTextClick', e => {
          const {
            analytics: t,
            onNavigate: s
          } = this.props
          'show_more_usernames' === e.link_id ? (this._updateCurrentDetailTextIndex(), t.scribe({
            element: 'show_more',
            action: 'click'
          })) : (this._selectUsername(e.link_id, this._fetchUsernameStatus), t.scribe({
            element: 'suggestion',
            action: 'click'
          })), s(e)
        }), r()(this, '_handleUsernameUpdated', e => {
          const t = e.target.value
          this._selectUsername(t, this._fetchUsernameStatusDebounced)
        }), r()(this, '_selectUsername', (e, t) => {
          this.setState({ username: e }), t(e)
        }), r()(this, '_handleNextButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, { username: n } = this.state
          t.next_link && (a(s, {
            username: n,
            link: t.next_link.link_id
          }), e(t.next_link))
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, n = t.skip_link
          n && (a(s, { link: n.link_id }), e(n))
        }), r()(this, '_fetchUsernameStatus', e => {
          const {
            analytics: t,
            fetchUsernameAvailability: s,
            loggedInUser: a
          } = this.props
          a && s({
            email: a.email && a.email[0] && a.email[0].address,
            full_name: a.name,
            suggest: !1,
            username: e
          }).then(e => {
            e && !e.valid && 'taken' === e.reason && t.scribe({
              element: 'username',
              action: 'taken'
            })
          })
        }), r()(this, '_updateCurrentDetailTextIndex', () => {
          this.setState({ currentDetailTextIndex: this.state.currentDetailTextIndex + 1 })
        })
        const {
          loggedInUser: t,
          subtaskId: s,
          subtaskInputs: a
        } = e, i = Object(u.d)(a, {
          key: 'username',
          subtask_id: s
        }, '') || (t ? t.screen_name : '')
        this.state = {
          currentDetailTextIndex: 0,
          username: i
        }, this._fetchUsernameStatusDebounced = Object(tt.a)((...e) => this._fetchUsernameStatus(...e), 250)
      }

      componentDidMount() {
        const {
          action: e,
          text: t
        } = this.props.navigationContext || {}
        'set_text' === e && t && this._selectUsername(t, this._fetchUsernameStatus)
      }

      render() {
        const {
            history: e,
            isUsernameValid: t,
            loggedInUser: s,
            onBackClick: a,
            onNavigate: i,
            subtask: r,
            subtaskInputs: c,
            progressIndication: d,
            validationError: u
          } = this.props, { username: h } = this.state, p = (s && s.screen_name && s.screen_name.toLowerCase()) === (h && h.toLowerCase()),
          _ = o.createElement(D.a, {
            disabled: !t,
            onPress: this._handleNextButtonClick,
            size: 'normalCompact',
            type: 'primary'
          }, r.next_link.label), m = r.skip_link && o.createElement(D.a, {
            onPress: this._handleSkipButtonClick,
            size: 'normalCompact',
            type: 'primary'
          }, r.skip_link.label), b = h && !p ? _ : m || _
        return o.createElement(v.a, {
          history: e,
          onBackClick: a,
          progressIndication: d,
          rightControl: b
        }, o.createElement(o.Fragment, null, o.createElement(w.a, { style: R.contentArea }, o.createElement(g, n()({}, r.primary_text, {
          nativeID: l.i,
          onNavigate: i,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: c,
          weight: 'bold'
        })), o.createElement(g, n()({}, r.secondary_text, {
          color: 'gray600',
          onNavigate: i,
          subtaskInputs: c
        })), o.createElement(Ae.a, {
          Icon: ys.a,
          autoComplete: 'off',
          autoCorrect: !1,
          autoFocus: !0,
          errorText: u,
          invalid: !!h && !p && !t,
          label: r.hint || vs,
          name: 'username',
          onChange: this._handleUsernameUpdated,
          showValidationIcon: !!h,
          spellCheck: 'false',
          style: R.formTextInput,
          value: h
        }), this._maybeRenderDetailTexts())), this.props.errorDialog)
      }
    }

    const Cs = T.a.create(e => ({ detailLink: { marginTop: e.spaces.small } }))
    var Es = Object(le.a)(ks(ws), { section: 'enter_username' }), xs = s('caTy')

    class Is extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_executeSubtaskAction', () => {
          const {
            navigationLink: e,
            subtaskAction: t,
            onNavigate: s,
            onError: a
          } = this.props
          try {
            t().then(() => s(e, !0)).catch(a)
          } catch (e) {
            a(e)
          }
        })
      }

      componentDidMount() {
        this._executeSubtaskAction()
      }

      componentDidUpdate(e) {
        const { subtaskId: t } = this.props
        t !== e.subtaskId && this._executeSubtaskAction()
      }

      render() {
        return null
      }
    }

    r()(Is, 'defaultProps', { onError: y.a })
    var Ss = s('zrOZ')
    const Os = 'selected_custom_interests', As = 'selected_interest_ids', Ts = (e, t) => {
      const s = Object(L.q)(e)
      return (Object(u.d)(s, {
        key: Os,
        subtask_id: t.subtaskId
      }, []) || []).map(e => ({
        topic: e.custom_interest,
        ttt_token: e.ttt_token
      }))
    }, Rs = Object(z.createSelector)(Ts, (e, t) => Ts(e, t).map(e => e.topic), (e, t) => {
      const s = Object(L.q)(e)
      return Object(u.d)(s, {
        key: As,
        subtask_id: t.subtaskId
      }, []) || void 0
    }, (e, t, s) => ({
      initialCustomInterests: e,
      initialCustomInterestIds: t,
      initialSelectedInterestIds: s
    }))
    var Ps = Object(V.c)(Rs), Ds = s('2dXj'), js = s('aV/s'), Ns = s('GZwR')
    const Fs = [ Ns.a.Topics ]

    class Bs extends o.Component {
      constructor(e) {
        super(e), r()(this, '_maybeRenderCustomInterests', () => {
          const { subtask: e } = this.props, { custom_interests_header: t } = e, {
            customInterests: s,
            shouldRenderCustomInterests: a
          } = this.state
          if (a) {
            return o.createElement(w.a, null, o.createElement(w.a, {
              style: Ls.group,
              testID: 'custom'
            }, o.createElement(p.c, {
              size: 'large',
              style: Ls.groupHeader,
              weight: 'bold'
            }, t), o.createElement(w.a, { style: Ls.pillsContainer }, s.map(e => this._renderCustomInterest(e.topic)))))
          }
        }), r()(this, '_renderGroup', e => {
          let t
          if (e.show_more) {
            const s = e.show_more.initial_to_show + (e.expanded ? e.show_more.extra_to_show : 0)
            t = e.items.slice(0, s)
          } else {
            t = e.items
          }
          return o.createElement(w.a, {
            key: 'group_' + e.header,
            style: Ls.group,
            testID: 'group'
          }, o.createElement(p.c, {
            size: 'large',
            style: Ls.groupHeader,
            weight: 'bold'
          }, e.header), o.createElement(w.a, { style: Ls.pillsContainer }, t.map(this._renderSelectionPill), this._maybeRenderShowMoreButton(e)))
        }), r()(this, '_maybeRenderShowMoreButton', e => {
          const t = e.show_more
          return t && e.items.length > t.initial_to_show && !e.expanded ? o.createElement(js.a, {
            compact: !0,
            key: 'showMore_' + e.header,
            mode: 'expand',
            onClick: this._handleShowMore(e),
            style: Ls.selectionPillStyles,
            text: t.text
          }) : null
        }), r()(this, '_renderCustomInterest', e => {
          const { selectedCustomInterestIds: t } = this.state
          return o.createElement(js.a, {
            compact: !0,
            key: 'selectionPill_' + e,
            onClick: this._handleToggleCustomInterest(e),
            selected: t.has(e),
            style: Ls.selectionPillStyles,
            text: e
          })
        }), r()(this, '_renderSelectionPill', e => {
          const t = this.state.selectedInterestIds.has(e.id), s = this._handleToggleInterest(e.id, t)
          return o.createElement(js.a, {
            compact: !0,
            key: 'selectionPill_' + e.id,
            onClick: s,
            selected: t,
            style: Ls.selectionPillStyles,
            text: e.name
          })
        }), r()(this, '_shouldShowSkipInstead', () => {
          const {
            selectedInterestIds: e,
            selectedCustomInterestIds: t
          } = this.state
          return 0 === e.size && 0 === t.size
        }), r()(this, '_handleSuggestionSelected', e => {
          const {
            customInterestIds: t,
            selectedCustomInterestIds: s
          } = this.state, {
            topic: a,
            ttt_context: n
          } = e.data, i = {
            topic: a,
            ttt_token: n
          }
          t.has(a) || this.setState({
            customInterests: this.state.customInterests.concat([ i ]),
            customInterestIds: Object(Ss.a)([ ...t ]).add(a),
            selectedCustomInterestIds: Object(Ss.a)([ ...s ]).add(a),
            shouldRenderCustomInterests: !0
          })
        }), r()(this, '_handleShowMore', e => () => {
          const t = this.state.groups, s = t.find(t => t.header === e.header)
          s && (s.expanded = !0), this.setState({ groups: t })
        }), r()(this, '_handleToggleCustomInterest', e => () => {
          const t = Object(Ss.a)([ ...this.state.selectedCustomInterestIds ])
          t.has(e) ? (t.delete(e), this.setState({ selectedCustomInterestIds: t })) : this.setState({ selectedCustomInterestIds: t.add(e) })
        }), r()(this, '_handleToggleInterest', (e, t) => () => {
          const s = Object(Ss.a)([ ...this.state.selectedInterestIds ])
          t ? (s.delete(e), this.setState({ selectedInterestIds: s })) : this.setState({ selectedInterestIds: s.add(e) })
        }), r()(this, '_handleNextButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, {
            customInterests: n,
            selectedCustomInterestIds: i
          } = this.state, r = n.reduce((e, t) => (i.has(t.topic) && e.push({
            custom_interest: t.topic,
            ttt_token: t.ttt_token
          }), e), [])
          a(s, {
            link: t.next_link.link_id,
            selected_interest_ids: Array.from(this.state.selectedInterestIds),
            selected_custom_interests: r
          }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          t.skip_link && a(s, { link: t.next_link.link_id }), t.skip_link && e(t.skip_link)
        })
        const {
          initialCustomInterests: t,
          initialCustomInterestIds: s,
          initialSelectedInterestIds: a
        } = e, { selected_items: n } = e.subtask
        this.state = {
          groups: e.subtask.groups || [],
          customInterests: t,
          customInterestIds: Object(Ss.a)(s),
          selectedCustomInterestIds: Object(Ss.a)(s),
          selectedInterestIds: a && a.length > 0 ? Object(Ss.a)(a) : Object(Ss.a)(n || []),
          shouldRenderCustomInterests: t.length > 0
        }
      }

      render() {
        const {
          history: e,
          onNavigate: t,
          subtask: s,
          subtaskInputs: a
        } = this.props, { groups: i } = this.state, r = o.createElement(D.a, {
          onPress: this._handleNextButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, s.next_link.label), c = s.skip_link ? o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, s.skip_link.label) : null, d = this._shouldShowSkipInstead() ? c : r
        return o.createElement(v.a, {
          history: e,
          rightControl: d
        }, o.createElement(w.a, { style: R.contentArea }, s.primary_text ? o.createElement(g, n()({}, s.primary_text, {
          nativeID: l.i,
          onNavigate: t,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: a,
          weight: 'bold'
        })) : null, s.secondary_text ? o.createElement(g, n()({}, s.secondary_text, {
          onNavigate: t,
          style: R.subHeader,
          subtaskInputs: a
        })) : null, o.createElement(w.a, { style: Ls.searchContainer }, o.createElement(Ds.c, {
          filter: Fs,
          maxTopics: 8,
          onItemClick: this._handleSuggestionSelected,
          placeholder: s.hint,
          rounded: !0,
          shouldAutoFocus: !0,
          shouldClearOnSelect: !0,
          source: Ns.d.WelcomeFlow,
          withFocusStyling: !0
        })), this._maybeRenderCustomInterests(), o.createElement(w.a, null, i.map(this._renderGroup))), this.props.errorDialog)
      }
    }

    const Ls = T.a.create(e => ({
      searchContainer: {
        marginBottom: e.spaces.small,
        zIndex: 1
      },
      selectionPillStyles: { margin: e.spaces.xxSmall },
      pillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      groupHeader: {
        marginTop: e.spaces.xSmall,
        marginBottom: e.spaces.xSmall
      },
      group: { marginBottom: e.spaces.xSmall }
    }))
    var Us = Ps(Bs), Vs = s('mjJ+')

    class Ms extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_makeNavFunction', e => () => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        }), r()(this, '_itemFromNavLink', e => ({
          text: e.label || '',
          onClick: this._makeNavFunction(e)
        }))
      }

      render() {
        const {
          onNavigate: e,
          subtask: t,
          subtaskInputs: s
        } = this.props
        return o.createElement(Vs.a, {
          cancelButtonLabel: t.cancel_link && t.cancel_link.text,
          description: t.primary_text ? o.createElement(g, n()({}, t.primary_text, {
            nativeID: l.i,
            onNavigate: e,
            subtaskInputs: s
          })) : null,
          items: t.primary_action_links.map(this._itemFromNavLink),
          onCloseRequested: t.cancel_link ? this._makeNavFunction(t.cancel_link) : y.a
        })
      }
    }

    var zs = s('vEo5')
    const qs = Object(z.createSelector)(zs.selectShouldPromptBrowserPush, e => zs.selectBrowserPushStatus(e), (e, t) => ({
      promptAllowed: e,
      pushSettingsFetchStatus: t.fetchStatus,
      subscribed: t.subscribed
    })), Hs = {
      createLocalApiErrorHandler: Object(M.d)('NOTIFICATIONS_PERMISSIONS_PROMPT'),
      dismissPushNotificationsPrompt: zs.dismissPushNotificationsPrompt,
      fetchPushSettingsIfNeeded: zs.fetchPushSettingsIfNeeded,
      loadPushPromptSettingsIfNeeded: zs.loadPushPromptSettingsIfNeeded,
      pushSubscribe: zs.pushSubscribe
    }
    var Gs = Object(V.g)(qs, Hs), Ys = s('5pef')

    function Ws(e, t) {
      e.granted_link.label || Object(oe.a)('Invalid notification permission prompt subtask: granted_link does not have a label', {
        extra: {
          subtaskId: t,
          grantedLinkId: e.granted_link.link_id
        }
      })
    }

    class Xs extends o.Component {
      constructor(...e) {
        super(...e), r()(this, 'componentDidMount', () => {
          const {
            createLocalApiErrorHandler: e,
            fetchPushSettingsIfNeeded: t,
            pushSettingsFetchStatus: s,
            subtask: a,
            subtaskId: n
          } = this.props
          Ws(a, n), t().catch(e()), s === me.a.LOADED && this._skipIfPushPromptNotAllowed()
        }), r()(this, 'componentDidUpdate', e => {
          const {
            pushSettingsFetchStatus: t,
            subtask: s
          } = this.props
          t === me.a.LOADED && e.pushSettingsFetchStatus !== me.a.LOADED && this._skipIfPushPromptNotAllowed(), s !== e.subtask && Ws(s, this.props.subtaskId)
        }), r()(this, '_actionClicked', e => {
          const {
            onNavigate: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: e.link_id }), t(e)
        }), r()(this, '_handleSkip', () => {
          const {
            dismissPushNotificationsPrompt: e,
            subtask: t
          } = this.props
          e(), this._actionClicked(t.denied_link)
        }), r()(this, '_handleConfirm', () => {
          const {
            subtask: e,
            pushSubscribe: t
          } = this.props
          t().then(() => {
            this._actionClicked(e.granted_link)
          })
        }), r()(this, '_skipIfPushPromptNotAllowed', () => {
          const {
            promptAllowed: e,
            subscribed: t,
            subtask: s
          } = this.props
          e || this._actionClicked(t ? s.granted_link : s.denied_link)
        })
      }

      render() {
        const {
          history: e,
          onNavigate: t,
          promptAllowed: s,
          subtask: a,
          subtaskInputs: i
        } = this.props, r = a.primary_text ? o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: t,
          subtaskInputs: i
        })) : null, c = a.secondary_text ? o.createElement(g, n()({}, a.secondary_text, {
          onNavigate: t,
          subtaskInputs: i
        })) : null
        return s && a.granted_link.label ? o.createElement(v.a, {
          hideLogo: !0,
          history: e
        }, o.createElement(x.a, {
          actionLabel: a.granted_link.label,
          graphic: Ys.a,
          headline: r,
          onAction: this._handleConfirm,
          onClose: this._handleSkip,
          onTertiaryAction: this._handleSkip,
          subtext: c,
          tertiaryActionLabel: a.denied_link.label,
          withCloseButton: !1
        })) : null
      }
    }

    var Ks = Gs(Xs)
    const Zs = {
      callOnboardingPath: L.a,
      createLocalApiErrorHandler: Object(M.d)('OCF_OPEN_LINK')
    }
    var $s = Object(V.b)(Zs)

    class Qs extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_hitCallbackPath', () => {
          const {
            createLocalApiErrorHandler: e,
            flowName: t,
            subtask: { onboarding_callback_path: s },
            callOnboardingPath: a
          } = this.props
          return s ? a(s).catch(e(Ne(t, void 0, y.a))) : Promise.resolve()
        })
      }

      render() {
        const {
          subtask: e,
          subtaskId: t,
          onNavigate: s
        } = this.props
        return o.createElement(Is, {
          navigationLink: e.link,
          onNavigate: s,
          subtaskAction: this._hitCallbackPath,
          subtaskId: t
        })
      }
    }

    var Js = $s(Qs), ea = s('Mx3A')
    const ta = Object(z.createSelector)(L.l, L.s, (e, t) => ({
      navigationContext: e,
      verificationSendFailureMessage: t
    })), sa = {
      createLocalApiErrorHandler: Object(M.d)('OCF_FLOW_PHONE_VERIFICATION'),
      verifyIdentifier: L.y
    }
    var aa = Object(V.g)(ta, sa), na = s('wrlS')
    const ia = 'normalized_phone'

    class ra extends o.Component {
      constructor(e) {
        super(e), r()(this, '_sendSmsVerificationRequest', () => {
          const {
              createLocalApiErrorHandler: e,
              navigationContext: t,
              subtask: s,
              onNavigate: a,
              subtaskInputs: n,
              verifyIdentifier: i
            } = this.props, r = s.phone_number.subtask_data_reference,
            o = s.phone_country_code && s.phone_country_code.subtask_data_reference, l = r && n[r.subtask_id][r.key],
            c = o && n[o.subtask_id] && n[o.subtask_id][o.key], d = t && t.action ? t.action === h.o.ResendVoice : !!s.send_via_voice
          this._isSmsAutoVerifySupported && this._autoVerifySmsCode()
          return i({
            phone: l,
            use_voice: d,
            sim_country_code: c,
            send_auto_verify_hash: this._isSmsAutoVerifySupported || na.b.isTrue('responsive_web_ocf_sms_autoverify_darkwrite')
          }).then(e => {
            const t = e.normalized_phone_number
            t && this.setState({ normalized_phone: t })
          }).catch(t => {
            const {
              flowName: n,
              verificationSendFailureMessage: i
            } = this.props
            e(Ne(n, i || De))(t), a(s.fail_link)
          })
        }), r()(this, '_handleCodeUpdated', e => {
          this.setState({ code: e.target.value })
        }), r()(this, '_autoVerifySmsCode', () => {
          var e
          const { analytics: t } = this.props
          t.scribe({
            element: 'auto',
            action: 'attempt'
          }), window.navigator.credentials.get({
            otp: { transport: [ 'sms' ] },
            signal: null == (e = this._smsAutoVerifyAbortController) ? void 0 : e.signal
          }).then(({ code: e }) => {
            e && (this._smsAutoVerifyAbortController = void 0, this.setState({ code: e }), t.scribe({
              element: 'auto',
              action: 'success'
            }), this._handleDoneButtonClick()), t.scribe({
              element: 'auto',
              action: 'missing'
            })
          }).catch(() => {
            t.scribe({
              element: 'auto',
              action: 'failure'
            })
          })
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, {
            code: n,
            normalized_phone: i
          } = this.state
          a(s, {
            code: n,
            link: t.next_link.link_id,
            normalized_phone: i,
            by_voice: !!t.send_via_voice
          }), e(t.next_link)
        })
        const {
          subtaskId: t,
          subtaskInputs: s
        } = e, a = Object(u.d)(s, {
          key: ia,
          subtask_id: t
        }, '') || ''
        this.state = {
          code: '',
          normalized_phone: a,
          showSmsResendDialog: !1
        }, this._isSmsAutoVerifySupported = 'OTPCredential' in window && na.b.isTrue('responsive_web_ocf_sms_autoverify_enabled'), this._isSmsAutoVerifySupported && (this._smsAutoVerifyAbortController = new AbortController)
      }

      componentDidMount() {
        return this._sendSmsVerificationRequest()
      }

      componentWillUnmount() {
        this._smsAutoVerifyAbortController && (this._smsAutoVerifyAbortController.abort(), this.props.analytics.scribe({
          element: 'auto',
          action: 'abort'
        }))
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          subtask: a,
          subtaskInputs: i,
          progressIndication: r
        } = this.props, c = o.createElement(D.a, {
          disabled: !this.state.code,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, a.next_link.label), d = o.createElement(g, n()({}, a.detail_text, {
          color: 'link',
          onNavigate: s,
          style: oa.detailLink,
          subtaskInputs: i
        }))
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          progressIndication: r,
          rightControl: c
        }, o.createElement(w.a, { style: R.contentArea }, o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: i,
          weight: 'bold'
        })), o.createElement(g, n()({}, a.secondary_text, {
          color: 'gray600',
          onNavigate: s,
          subtaskInputs: i
        })), o.createElement(Ae.a, {
          autoComplete: 'one-time-code',
          autoFocus: !0,
          helperText: d,
          inputMode: 'numeric',
          label: a.hint_text,
          name: 'verfication_code',
          onChange: this._handleCodeUpdated,
          pattern: '\\d{6}',
          style: R.formTextInput,
          value: this.state.code
        })), this.props.errorDialog)
      }
    }

    const oa = T.a.create(e => ({ detailLink: { marginTop: e.spaces.small } }))
    var la = Object(le.a)(aa(ra), { component: 'phone_verification' })
    const ca = 'discoverable_by_email', da = 'discoverable_by_phone'

    class ua extends o.Component {
      constructor(e) {
        super(e), r()(this, '_formatSubtaskInputsForRedux', e => ({
          link: this.props.subtask.next_link,
          discoverable_by_email: e.discoverable_by_email ? 1 : 0,
          discoverable_by_phone: e.discoverable_by_phone ? 1 : 0
        })), r()(this, '_getInitialSubtaskInputs', () => {
          const {
            subtaskId: e,
            subtaskInputs: t
          } = this.props
          return {
            discoverable_by_email: 0 !== Object(u.d)(t, {
              key: ca,
              subtask_id: e
            }),
            discoverable_by_phone: 0 !== Object(u.d)(t, {
              key: da,
              subtask_id: e
            })
          }
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, this._formatSubtaskInputsForRedux(this.state)), e(t.next_link)
        }), r()(this, '_handleDiscoverableByEmailToggle', e => {
          this.setState({ discoverable_by_email: e })
        }), r()(this, '_handleDiscoverableByPhoneToggle', e => {
          this.setState({ discoverable_by_phone: e })
        })
        const t = this._getInitialSubtaskInputs()
        this.state = Object.assign({}, t)
      }

      render() {
        const {
          discoverable_by_email: e,
          discoverable_by_phone: t
        } = this.state, {
          history: s,
          onNavigate: a,
          subtask: i,
          subtaskInputs: r
        } = this.props, c = i.secondary_text ? o.createElement(p.c, {
          size: 'xLarge',
          style: R.headline,
          weight: 'bold'
        }, i.secondary_text) : null, d = o.createElement(D.a, {
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, i.next_link.label)
        return o.createElement(v.a, {
          history: s,
          rightControl: d
        }, o.createElement(w.a, { style: R.contentArea }, o.createElement(p.c, {
          nativeID: l.i,
          style: T.a.visuallyHidden
        }, i.primary_text), o.createElement(p.c, {
          size: 'xLarge',
          style: R.headline,
          weight: 'bold'
        }, c), o.createElement(w.a, {
          accessibilityRole: 'label',
          style: R.option
        }, o.createElement(w.a, { style: R.checkboxText }, o.createElement(p.c, null, i.discoverable_by_email_label), o.createElement(g, n()({}, i.discoverable_by_email_detail_text, {
          color: 'gray600',
          onNavigate: a,
          size: 'small',
          subtaskInputs: r
        }))), o.createElement(P.a, {
          checked: e,
          onChange: this._handleDiscoverableByEmailToggle
        })), o.createElement(w.a, {
          accessibilityRole: 'label',
          style: R.option
        }, o.createElement(w.a, { style: R.checkboxText }, o.createElement(p.c, null, i.discoverable_by_phone_label), o.createElement(g, n()({}, i.discoverable_by_phone_detail_text, {
          color: 'gray600',
          onNavigate: a,
          size: 'small',
          subtaskInputs: r
        }))), o.createElement(P.a, {
          checked: t,
          onChange: this._handleDiscoverableByPhoneToggle
        }))))
      }
    }

    var ha = s('LCtV'), pa = s('AspN'), _a = s('53j7')
    const ma = Object(z.createSelector)(H.e.selectLoggedInUser, (e, t) => {
      const s = _a.f(e), [ a ] = s ? pa.g(e, s) : []
      return a
    }, (e, t) => ({
      loggedInUser: e,
      avatarMedia: t
    })), ba = {
      addAvatarMedia: _a.a,
      removeAvatarMedia: _a.c
    }
    var ga = Object(V.g)(ma, ba), fa = s('fS8x'), ka = s('P68U'), ya = s('eyty'), va = s('oSwX')

    class wa extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleCropDone', () => this.setState({
          done: !0,
          showCropper: !1
        })), r()(this, '_handleCropCancel', () => this._handleCropDone()), r()(this, '_handleImageMediaChange', e => {
          const { addAvatarMedia: t } = this.props
          t(e[0]), this.setState({
            mediaId: e[0],
            showCropper: !0,
            done: !0
          })
        }), r()(this, '_handleImageMediaFailure', () => {
          this._handleSkipButtonClick()
        }), r()(this, '_handleImageMediaRemove', () => {
          const { removeAvatarMedia: e } = this.props
          e(), this.setState({
            done: !1,
            showCropper: !1
          })
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: t.next_link.link_id }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        }), this.state = {
          done: !1,
          showCropper: !1,
          mediaId: void 0
        }
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          location: s,
          onBackClick: a,
          onNavigate: i,
          subtask: r,
          subtaskInputs: c
        } = this.props, {
          primary_text: d,
          secondary_text: u,
          next_link: h,
          skip_link: p
        } = r, _ = o.createElement(D.a, {
          disabled: !p && !this.state.mediaId,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, h.label), m = p && o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, p.label)
        return o.createElement(v.a, {
          history: t,
          onBackClick: a,
          rightControl: this.state.done || !p ? _ : m
        }, o.createElement(w.a, { style: R.contentArea }, d ? o.createElement(g, n()({}, d, {
          nativeID: l.i,
          onNavigate: i,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: c,
          weight: 'bold'
        })) : null, u ? o.createElement(g, n()({}, r.secondary_text, {
          color: 'gray600',
          onNavigate: i,
          subtaskInputs: c
        })) : null, this._renderMediaPickerWithPreview()), this.state.showCropper && void 0 !== this.state.mediaId ? o.createElement(fa.a, {
          circle: !0,
          defaultAspectRatio: 1,
          location: s,
          mediaId: this.state.mediaId,
          onCancel: this._handleCropCancel,
          onDone: this._handleCropDone
        }) : null, e)
      }

      _renderMediaPickerWithPreview() {
        const {
          avatarMedia: e,
          loggedInUser: t
        } = this.props, { done: s } = this.state
        return o.createElement(w.a, { style: Ca.centerContent }, o.createElement(ka.a, {
          borderRadius: ha.a.INFINITE,
          currentContent: t ? o.createElement(va.default, {
            size: 'custom',
            uri: t.profile_image_url_https
          }) : null,
          location: ya.c.Avatar,
          mediaItem: e,
          onChange: this._handleImageMediaChange,
          onFailure: this._handleImageMediaFailure,
          onRemove: s ? this._handleImageMediaRemove : void 0,
          rootStyle: Ca.avatarContainer
        }))
      }
    }

    const Ca = T.a.create(e => ({
      avatarContainer: {
        borderWidth: e.borderWidths.medium,
        borderColor: e.colors.white,
        borderStyle: 'solid',
        marginTop: e.spaces.jumbo,
        marginBottom: e.spaces.jumbo,
        width: `calc(${e.spaces.jumbo} * 3)`
      },
      bannerContainer: {
        marginTop: e.spaces.jumbo,
        marginBottom: e.spaces.jumbo,
        maxHeight: '9em'
      },
      banner: { height: '100%' },
      centerContent: {
        alignItems: 'center',
        display: 'flex',
        width: '100%'
      }
    }))
    var Ea = ga(wa)
    const xa = Object(z.createSelector)(H.e.selectLoggedInUser, (e, t) => {
      const s = _a.f(e), [ a ] = s ? pa.g(e, s) : []
      return a
    }, (e, t) => {
      const s = _a.g(e), [ a ] = s ? pa.g(e, s) : []
      return a
    }, (e, t, s) => ({
      loggedInUser: e,
      avatarMedia: t,
      bannerMedia: s
    })), Ia = {
      addBannerMedia: _a.b,
      removeBannerMedia: _a.d
    }
    var Sa = Object(V.g)(xa, Ia), Oa = s('9Xij'), Aa = s('U+bB')

    class Ta extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleImageMediaRemove', () => {
          const { removeBannerMedia: e } = this.props
          e(), this.setState({
            done: !1,
            showCropper: !1
          })
        }), r()(this, '_handleCropDone', () => this.setState({
          done: !0,
          showCropper: !1
        })), r()(this, '_handleCropCancel', () => this._handleCropDone()), r()(this, '_handleImageMediaChange', e => {
          const { addBannerMedia: t } = this.props
          t(e[0]), this.setState({
            media_id: e[0],
            showCropper: !0,
            done: !0
          })
        }), r()(this, '_handleImageMediaFailure', () => {
          this._handleSkipButtonClick()
        }), r()(this, '_handleDoneButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: t.next_link.link_id }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        }), this.state = {
          done: void 0,
          media_id: void 0,
          showCropper: !1
        }
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          location: s,
          onBackClick: a,
          onNavigate: i,
          subtask: r,
          subtaskInputs: c
        } = this.props, {
          primary_text: d,
          secondary_text: u,
          next_link: h,
          skip_link: p
        } = r, _ = o.createElement(D.a, {
          disabled: !p && !this.state.media_id,
          onPress: this._handleDoneButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, h.label), m = p && o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, p.label)
        return o.createElement(v.a, {
          history: t,
          onBackClick: a,
          rightControl: this.state.done || !p ? _ : m
        }, o.createElement(w.a, { style: R.contentArea }, d ? o.createElement(g, n()({}, d, {
          nativeID: l.i,
          onNavigate: i,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: c,
          weight: 'bold'
        })) : null, u ? o.createElement(g, n()({}, r.secondary_text, {
          color: 'gray600',
          onNavigate: i,
          subtaskInputs: c
        })) : null, o.createElement(w.a, { style: Ra.container }, this._renderMediaPickerWithPreview(), this._renderAvatar(), this._renderNames()), this.state.showCropper && void 0 !== this.state.media_id ? o.createElement(fa.a, {
          defaultAspectRatio: 3,
          location: s,
          mediaId: this.state.media_id,
          onCancel: this._handleCropCancel,
          onDone: this._handleCropDone
        }) : null), e)
      }

      _renderMediaPickerWithPreview() {
        const {
          bannerMedia: e,
          loggedInUser: t
        } = this.props, s = e || !!t && !!t.profile_banner_url, { done: a } = this.state
        return o.createElement(ka.a, {
          aspectRatio: 3,
          currentContent: o.createElement(Oa.a, { ratio: T.a.theme.aspectRatios.profileBanner }, s && t ? o.createElement(Aa.a, {
            source: { uri: t.profile_banner_url },
            style: Ra.banner
          }) : null),
          location: ya.c.Banner,
          mediaItem: e,
          onChange: this._handleImageMediaChange,
          onFailure: this._handleImageMediaFailure,
          onRemove: a ? this._handleImageMediaRemove : void 0,
          rootStyle: Ra.bannerContainer
        })
      }

      _renderAvatar() {
        const {
          avatarMedia: e,
          loggedInUser: t
        } = this.props, s = e && e.mediaFile && e.mediaFile.url || t && t.profile_image_url_https
        return o.createElement(va.default, {
          size: 'custom',
          style: [ Ra.avatarContainer ],
          uri: s
        })
      }

      _renderNames() {
        const { loggedInUser: e } = this.props
        if (!e) return null
        const t = e.name, s = '@' + e.screen_name
        return o.createElement(w.a, { style: Ra.nameContainer }, o.createElement(p.c, {
          align: 'left',
          style: Ra.names
        }, o.createElement(p.c, {
          accessibilityRole: 'heading',
          size: 'xLarge',
          style: Ra.displayName,
          weight: 'bold'
        }, t), o.createElement(p.c, {
          color: 'gray600',
          style: Ra.screenName
        }, s)))
      }
    }

    const Ra = T.a.create(e => ({
      container: { paddingBottom: e.spaces.jumbo },
      avatarContainer: {
        borderWidth: e.borderWidths.medium,
        borderColor: e.colors.white,
        borderStyle: 'solid',
        marginLeft: e.spaces.small,
        marginTop: '-25%',
        maxWidth: 'calc(${theme.spaces.small} * 8)',
        width: '25%'
      },
      bannerContainer: {
        marginTop: e.spaces.jumbo,
        marginBottom: e.spaces.jumbo,
        maxHeight: '9em'
      },
      banner: { height: '100%' },
      centerContent: {
        alignItems: 'center',
        display: 'flex',
        width: '100%'
      },
      nameContainer: { marginLeft: e.spaces.small },
      names: {
        display: 'block',
        marginBottom: e.spaces.xSmall
      },
      displayName: {
        writingDirection: 'ltr',
        display: 'block',
        marginTop: e.spaces.xxSmall
      },
      screenName: { writingDirection: 'ltr' }
    }))
    var Pa = Sa(Ta), Da = s('QK5w'), ja = s('Lsrn')
    const Na = (e = {}) => Object(d.a)('svg', Object.assign({}, e, {
      style: [ ja.a.root, e.style ],
      viewBox: '0 0 24 24'
    }), o.createElement('g', null, o.createElement('path', { d: 'M18.707 13.293c-.39-.39-1.023-.39-1.414 0L13 17.586V5c0-.553-.447-1-1-1s-1 .447-1 1v12.586l-4.293-4.293c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293l6-6c.39-.39.39-1.023 0-1.414z' })))
    Na.metadata = {
      width: 24,
      height: 24
    }
    var Fa = Na
    const Ba = T.a.create(e => ({
      icon: {
        height: '1.5em',
        width: '1.5em'
      },
      pillContainer: {
        bottom: e.spaces.small,
        alignItems: 'center',
        left: '0',
        right: '0',
        margin: 'auto',
        zIndex: 1
      },
      pillContainerNarrow: { position: 'fixed' },
      pillContainerModal: { position: 'absolute' }
    }))
    var La = ({
                isModal: e,
                label: t,
                onPress: s
              }) => {
      const a = [ Ba.pillContainer, e ? Ba.pillContainerModal : Ba.pillContainerNarrow ]
      return o.createElement(w.a, { style: a }, o.createElement(D.a, {
        icon: o.createElement(Fa, { style: Ba.icon }),
        onPress: s,
        type: 'primary'
      }, o.createElement(p.c, {
        size: 'normal',
        weight: 'normal'
      }, t)))
    }, Ua = s('7nmT'), Va = s.n(Ua)
    const Ma = { subtask_id: _.string.isRequired }, za = Object(_.shape)({
      day: _.number.isRequired,
      month: _.number.isRequired,
      year: _.number.isRequired
    }), qa = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      next_link: vt.isRequired,
      cancel_link: vt,
      dismiss_link: vt
    }), Ha = Object(_.shape)({
      primary_text: Ct.isRequired,
      secondary_text: Ct,
      next_link: vt.isRequired,
      cancel_link: vt,
      dismiss_link: vt
    }), Ga = Object(_.shape)({
      title: _.string.isRequired,
      next_link: vt.isRequired
    }), Ya = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      detail_text: Ct,
      primary_action_link: vt.isRequired,
      primary_action_style: Object(_.oneOf)(Object.values(h.b)),
      secondary_action_link: vt,
      secondary_action_style: Object(_.oneOf)(Object.values(h.b)),
      settings: Object(_.arrayOf)(_.object),
      button_location: Object(_.oneOf)(Object.values(h.a)),
      text_alignment: Object(_.oneOf)(Object.values(h.q))
    }), Wa = (Object(_.shape)({
      choices: Object(_.arrayOf)(Pt).isRequired,
      selection_type: _.string.isRequired,
      primary_text: Ct,
      secondary_text: Ct,
      next_link: vt,
      skip_link: vt,
      next_link_options: xt
    }), Object(_.shape)({
      primary_text: Ct.isRequired,
      secondary_text: Ct,
      detail_text: Ct,
      accept_text: _.string.isRequired,
      authorization_url: _.string.isRequired,
      decline_link: vt,
      next_link: vt.isRequired,
      skip_link: vt.isRequired
    })), Xa = Object(_.shape)({
      primary_text: Ct.isRequired,
      secondary_text: Ct,
      hint: _.string,
      name: _.string,
      username: _.string,
      email: _.string,
      next_link: vt.isRequired,
      phone: _.string
    }), Ka = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      hint_text: _.string,
      default_text: _.string,
      max_length: _.number,
      next_link: vt.isRequired,
      skip_link: vt
    }), Za = Object(_.shape)({
      status: Object(_.oneOf)(Object.values(h.d)).isRequired,
      end_flow_type: Object(_.oneOf)(Object.values(h.i)).isRequired
    }), $a = Object(_.shape)({
      should_generate: _.bool.isRequired,
      next_link: vt.isRequired
    }), Qa = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      hint: _.string.isRequired,
      custom_interests_header: _.string.isRequired,
      groups: Object(_.arrayOf)(Ot).isRequired,
      selected_items: Object(_.arrayOf)(_.string).isRequired,
      next_link: vt.isRequired,
      skip_link: vt
    }), Ja = Object(_.shape)({
      primary_text: Ct,
      primary_action_links: Object(_.arrayOf)(vt).isRequired,
      cancel_link: vt,
      dismiss_link: vt
    }), en = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      detail_text: Ct,
      granted_link: vt.isRequired,
      denied_link: vt.isRequired,
      previously_granted_link: vt,
      previously_denied_link: vt,
      previously_denied_reprompt_behavior: Object(_.oneOf)([ 'always', 'never', 'preprompt' ])
    }), tn = Object(_.shape)({
      user: _.object.isRequired,
      auth_token: _.string,
      oauth_token: _.string,
      oauth_token_secret: _.string,
      known_device_token: _.string,
      next_link: vt.isRequired
    }), sn = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      cta_link: vt,
      next_link: vt.isRequired
    }), an = Object(_.shape)({
      link: vt.isRequired,
      onboarding_callback_path: _.string
    }), nn = Object(_.shape)({
      primary_text: Ct.isRequired,
      secondary_text: Ct.isRequired,
      detail_text: Ct.isRequired,
      hint_text: _.string.isRequired,
      phone_number: kt.isRequired,
      next_link: vt.isRequired,
      fail_link: vt.isRequired,
      cancel_link: vt.isRequired
    }), rn = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      detail_text: Ct,
      hint_text: _.string.isRequired,
      email: kt.isRequired,
      name: kt.isRequired,
      next_link: vt.isRequired,
      fail_link: vt.isRequired,
      cancel_link: vt.isRequired
    }), on = Object(_.shape)({
      primary_text: _.string.isRequired,
      secondary_text: _.string,
      discoverable_by_email: _.bool,
      discoverable_by_email_label: _.string.isRequired,
      discoverable_by_email_detail_text: Ct,
      discoverable_by_phone: _.bool,
      discoverable_by_phone_label: _.string.isRequired,
      discoverable_by_phone_detail_text: Ct,
      next_link: vt.isRequired
    }), ln = Object(_.shape)({
      settings: Object(_.arrayOf)(Rt).isRequired,
      primary_text: Ct,
      secondary_text: Ct,
      detail_text: Ct,
      next_link: vt.isRequired,
      cancel_link: vt,
      scroll_hint: _.string,
      style: Object(_.oneOf)([ 'prompt', 'step' ])
    }), cn = Object(_.shape)({
      primary_text: _.string,
      secondary_text: _.string,
      name_hint: _.string.isRequired,
      phone_hint: _.string.isRequired,
      email_hint: _.string.isRequired,
      phone_email_hint: _.string.isRequired,
      birthday_hint: _.string.isRequired,
      birthday_explanation: _.string,
      use_phone_text: _.string.isRequired,
      use_email_text: _.string.isRequired,
      next_link: vt.isRequired,
      email_next_link: vt,
      js_instrumentation: _.object,
      ignore_birthday: _.bool,
      show_password_field: _.bool,
      password_hint: _.string
    }), dn = Object(_.shape)({
      primary_text: _.string,
      secondary_text: _.string,
      name: kt,
      phone_number: kt,
      email: kt,
      birthday: kt,
      birthday_requirement: za,
      sign_in_text: Ct,
      detail_text: Ct,
      phone_next_link: vt.isRequired,
      email_next_link: vt.isRequired,
      name_edit_link: vt.isRequired,
      phone_edit_link: vt.isRequired,
      email_edit_link: vt.isRequired,
      birthday_edit_link: vt.isRequired,
      invalid_birthday_link: vt.isRequired,
      ignore_birthday: _.bool
    }), un = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      next_link: vt.isRequired,
      skip_link: vt
    }), hn = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      next_link: vt.isRequired,
      skip_link: vt,
      avatar_image_reference: kt
    }), pn = Object(_.shape)({
      sources: Object(_.arrayOf)(yt).isRequired,
      next_link: vt.isRequired
    }), _n = Object(_.shape)({
      primary_text: Ct,
      secondary_text: Ct,
      hint: _.string,
      groups: Object(_.arrayOf)(Ot).isRequired,
      next_link: vt,
      next_link_label_enabled_text: Ct,
      next_link_label_disabled_text: Ct,
      skip_link: vt,
      follow_button_type: Object(_.oneOf)(Object.values(h.e)).isRequired,
      min_follow_count: _.number
    })
    Object(_.shape)(Object.assign({}, Ma, {
      alert_dialog: qa,
      alert_dialog_suppress_client_events: Ha,
      cta: Ya,
      contacts_user_list: Ga,
      email_contacts_sync: Wa,
      end_flow: Za,
      enter_password: Xa,
      enter_text: Ka,
      email_verification: rn,
      fetch_temporary_password: $a,
      interest_picker: Qa,
      menu_dialog: Ja,
      notifications_permission_prompt: en,
      open_account: tn,
      open_home_timeline: sn,
      open_link: an,
      phone_verification: nn,
      privacy_options: on,
      select_avatar: un,
      select_banner: hn,
      settings_list: ln,
      sign_up: cn,
      sign_up_review: dn,
      upload_media: pn,
      user_recommendations_list: _n
    }))
    var mn = 'OCF_SettingsList_Text', bn = s('+d3d'), gn = s('jtO7')

    class fn extends o.Component {
      constructor(e) {
        super(e), r()(this, '_formatSubtaskInputsForStore', e => Object.entries(e).map(e => {
          const [ t, {
            result: s,
            type: a
          } ] = e
          return {
            key: t,
            response_data: { [a]: { result: s } }
          }
        })), r()(this, '_loadSubtaskInputsFromStore', () => {
          const {
            subtaskId: e,
            subtaskInputs: t
          } = this.props
          return Object(u.d)(t, {
            key: h.k,
            subtask_id: e
          }, []).reduce((e, t) => {
            const { key: s } = t, [ a ] = Object.keys(t.response_data), n = t.response_data[a].result
            return e[s] = {
              result: n,
              type: a
            }, e
          }, {})
        }), r()(this, '_updateFlow', () => {
          const {
            subtask: e,
            subtaskId: t,
            updateFlow: s
          } = this.props, { next_link: a } = e, { settingsValues: n } = this.state
          s(t, {
            [h.k]: this._formatSubtaskInputsForStore(n),
            link: a.link_id
          })
        }), r()(this, '_handleShowMore', () => {
          this.setState({ showMore: !0 })
        }), r()(this, '_handleDoneButtonPress', () => {
          const {
            onNavigate: e,
            subtask: t
          } = this.props, { next_link: s } = t
          this._updateFlow(), e(s)
        }), r()(this, '_handleSubListBackClick', () => {
          this.setState({
            isSubList: !1,
            showDividers: !1,
            showMoreConfig: null,
            subList: [],
            subListHeader: {}
          }), this._updateFlow()
        }), r()(this, '_handleSettingGroupClick', e => {
          const {
            primary_text: t,
            value_data: s,
            value_type: a
          } = e
          a === h.l.SettingsGroup && this.setState({
            isSubList: !0,
            showDividers: !1,
            showMoreConfig: null,
            subList: s.settings_group_data.settings,
            subListHeader: t
          })
        }), r()(this, '_handleScrollPromptClick', () => {
          this._viewport.scrollBy(this._viewport.getRect().getHeight())
        }), r()(this, '_handleViewportSet', e => {
          const {
            isModal: t,
            subtask: s
          } = this.props
          s.scroll_hint && t && (this._viewport = e, this._viewport && this._viewport.addScrollListener(this._handleViewportScroll))
        }), r()(this, '_handleViewportScroll', Object(bn.a)(() => {
          this.state.lastSettingSeen || this.setState({ lastSettingSeen: this._isLastSettingInViewport() })
        }, 250)), r()(this, '_isLastSettingInViewport', () => {
          if (this._lastSetting && this._viewport) {
            const e = this._lastSetting.getBoundingClientRect(), t = this._viewport.getRect()
            return e.top >= t.getTop() && e.bottom <= t.getBottom()
          }
          return !1
        }), r()(this, '_setSettingsRef', e => t => {
          const { isSubList: s } = this.state
          if (this.props.subtask.scroll_hint && !s && e && void 0 === this._lastSetting) {
            this._lastSetting = Va.a.findDOMNode(t)
            const e = this._isLastSettingInViewport()
            e && !this.state.lastSettingSeen && this.setState({ lastSettingSeen: e })
          } else {
            this._lastSetting = void 0
          }
        }), r()(this, '_handleSettingToggle', e => {
          const {
            value_identifier: t,
            value_type: s
          } = e
          if (Object(u.g)(s)) {
            const { settingsValues: e } = this.state
            this.setState({ settingsValues: Object.assign({}, e, { [t]: Object.assign({}, e[t], { result: !e[t].result }) }) })
          }
        })
        const { subtask: t } = e, s = this._initializeSettingsState(t.settings)
        this.state = {
          isSubList: !1,
          showDividers: t.show_divider,
          showMoreConfig: t.show_more,
          showMore: !1,
          subList: [],
          subListHeader: {},
          settingsValues: s,
          lastSettingSeen: !1
        }
      }

      UNSAFE_componentWillMount() {
        const { viewport: e } = this.context, {
          isModal: t,
          subtask: s
        } = this.props
        s.scroll_hint && !t && (this._viewport = e, this._removeScrollListener = this._viewport.addScrollListener(this._handleViewportScroll)), this._updateFlow()
      }

      componentWillUnmount() {
        const { subtask: e } = this.props
        e.scroll_hint && this._removeScrollListener && this._removeScrollListener()
      }

      render() {
        const { isSubList: e } = this.state
        return e ? this._renderSubList() : this._renderMainList()
      }

      _renderMainList() {
        const {
          errorDialog: e,
          history: t,
          isModal: s,
          location: a,
          onBackClick: i,
          onNavigate: r,
          subtask: c,
          subtaskInputs: d,
          progressIndication: u
        } = this.props, { lastSettingSeen: h } = this.state, p = !!!c.scroll_hint || h, _ = 'prompt' === c.style, m = o.createElement(D.a, {
          disabled: !p,
          onPress: this._handleDoneButtonPress,
          size: _ ? 'normal' : 'normalCompact',
          type: 'primary'
        }, c.next_link.label), b = p ? null : o.createElement(La, {
          isModal: !!s,
          label: c.scroll_hint,
          onPress: this._handleScrollPromptClick
        })
        return o.createElement(v.a, {
          history: t,
          location: a,
          onBackClick: i,
          onViewportSet: this._handleViewportSet,
          progressIndication: u,
          rightControl: _ ? void 0 : m,
          scrollPrompt: b
        }, o.createElement(w.a, { style: [ R.contentArea, kn.bottomPadding, _ && kn.centeredRoot ] }, o.createElement(g, n()({}, c.primary_text, {
          nativeID: l.i,
          onNavigate: r,
          size: 'xLarge',
          style: kn.headline,
          subtaskInputs: d,
          testID: mn,
          weight: 'bold'
        })), c.secondary_text ? o.createElement(g, n()({}, c.secondary_text, {
          color: 'gray600',
          onNavigate: r,
          style: kn.headline,
          subtaskInputs: d
        })) : null, this._renderSettingsList(c.settings), c.detail_text ? o.createElement(g, n()({}, c.detail_text, {
          color: 'gray600',
          onNavigate: r,
          style: kn.detailText,
          subtaskInputs: d
        })) : null, _ ? o.createElement(w.a, { style: kn.doneButtonContainer }, m) : null), e)
      }

      _renderSubList() {
        const {
          history: e,
          location: t,
          onNavigate: s,
          subtaskInputs: a
        } = this.props, {
          subList: i,
          subListHeader: r
        } = this.state
        return o.createElement(v.a, {
          history: e,
          location: t,
          onBackClick: this._handleSubListBackClick
        }, o.createElement(w.a, { style: R.contentArea }, o.createElement(g, n()({}, r, {
          onNavigate: s,
          size: 'xLarge',
          style: kn.headline,
          subtaskInputs: a,
          weight: 'bold'
        })), this._renderSettingsList(i)))
      }

      _renderSettingsList(e) {
        const {
          addToast: t,
          onNavigate: s,
          removeContacts: a,
          subtaskId: n,
          subtaskInputs: i,
          updateFlow: r
        } = this.props, {
          showDividers: l,
          showMoreConfig: c,
          showMore: d
        } = this.state
        return o.Children.toArray(e.map((u, h) => {
          const p = h === e.length - 1
          if (c && !d) {
            if (h === c.initial_to_show) {
              return o.createElement(gn.a, {
                color: 'primary',
                label: c.text,
                onPress: this._handleShowMore
              })
            }
            if (h > c.initial_to_show) return null
          }
          return o.createElement(Dt, {
            addToast: t,
            onNavigate: s,
            onSettingGroupClick: this._handleSettingGroupClick,
            onSettingToggle: this._handleSettingToggle,
            ref: this._setSettingsRef(p),
            removeContacts: a,
            settingValue: u,
            showDividers: !p && l,
            subtaskId: n,
            subtaskInputs: i,
            updateFlow: r
          })
        }))
      }

      _initializeSettingsState(e) {
        const t = this._loadSubtaskInputsFromStore()
        return t && Object.keys(t).length > 0 ? t : e.reduce((e, t) => {
          const {
            value_data: s,
            value_identifier: a,
            value_type: n
          } = t
          if (Object(u.g)(n)) {
            e[a] = {
              result: s.boolean_data.initial_value,
              type: Object.keys(s)[0]
            }
          } else if (n === h.l.SettingsGroup) {
            s.settings_group_data.settings.forEach(t => {
              const {
                value_data: s,
                value_identifier: a,
                value_type: n
              } = t
              Object(u.g)(n) && (e[a] = {
                result: s.boolean_data.initial_value,
                type: Object.keys(s)[0]
              })
            })
          }
          return e
        }, {})
      }
    }

    r()(fn, 'contextTypes', { viewport: _.object })
    const kn = T.a.create(e => ({
      centeredRoot: { alignItems: 'center' },
      headline: { marginBottom: e.spaces.xSmall },
      detailText: { marginTop: e.spaces.xLarge },
      bottomPadding: { paddingBottom: e.spaces.xxLarge },
      doneButtonContainer: { marginTop: e.spaces.xLarge }
    }))
    var yn = s('NeAX')
    const vn = Object(z.createSelector)(L.l, yn.selectPreferences, yn.selectUserPreferences, (e, t, s) => ({
      navigationContext: e,
      personalizationSettings: s,
      shouldPropagateP13nSettings: !t.is_eu_country
    })), wn = {
      createLocalApiErrorHandler: Object(M.d)('OCF_FLOW'),
      fetchPreferencesIfNeeded: yn.fetchPreferencesIfNeeded,
      scribeAction: B.c,
      syncPersonalizationSettings: yn.syncSettings
    }
    var Cn = Object(V.g)(vn, wn), En = s('YeIG')
    const xn = fe.a.d44efc66, In = fe.a.b4867a17, Sn = fe.a.d4e220b3

    class On extends o.Component {
      constructor(e) {
        super(e), r()(this, '_updateValue', e => {
          const { callback: t } = this.props, s = Object(En.a)(e.trim()), a = !s && -1 !== e.toLowerCase().indexOf('twitter'), n = !s && !a
          let i = ''
          s ? i = xn : a && (i = In), this.setState({
            errorMessage: i,
            isValid: n,
            value: e
          }), t(e, n)
        }), r()(this, '_handleValueChange', e => {
          const { value: t } = e.target
          this._updateValue(t)
        }), this.state = {
          errorMessage: '',
          isValid: !0,
          value: ''
        }
      }

      componentDidMount() {
        const { defaultValue: e } = this.props
        e && this._updateValue(e)
      }

      render() {
        const e = this.props, { label: t } = e, s = Me()(e, [ 'defaultValue', 'callback', 'label' ]), {
          errorMessage: a,
          isValid: i
        } = this.state, r = na.b.getValue('user_display_name_max_limit', 50)
        return o.createElement(Ae.a, n()({}, s, {
          errorText: a,
          invalid: !i,
          label: t || Sn,
          maxLength: 'number' == typeof r ? r : 50,
          name: 'name',
          onChange: this._handleValueChange,
          positionCursorAtEnd: !0,
          style: R.formTextInput,
          value: this.state.value
        }))
      }
    }

    var An = s('SrtL'), Tn = s('P7wY'), Rn = s('Ukpf'), Pn = s('S8sr')
    const Dn = fe.a.eab9ceb1, jn = Object.freeze({
      Birthday: 'birthday',
      Email: 'email',
      Name: 'name',
      Phone: 'phone_number',
      Password: 'password'
    }), Nn = 'select_birthday', Fn = 'select_email', Bn = 'select_name', Ln = 'select_phone', Un = {
      page: 'onboarding',
      component: 'signup'
    }

    class Vn extends o.Component {
      constructor(e) {
        super(e), r()(this, '_getDefaultIdentifierField', () => {
          const { subtask: { allowed_identifiers: e } } = this.props
          return e === h.m.EmailOnly || e === h.m.EmailThenPhone ? jn.Email : jn.Phone
        }), r()(this, '_renderActiveFieldToggle', () => {
          const { subtask: { allowed_identifiers: e } } = this.props
          return e !== h.m.EmailOnly && e !== h.m.PhoneOnly ? o.createElement(p.c, {
            color: 'link',
            onPress: this._handleActiveTextToggle,
            style: Mn.toggleLink,
            withInteractiveStyling: !0
          }, this._getToggleActiveTextTitle()) : null
        }), r()(this, '_renderPasswordField', () => {
          const {
            subtask: e,
            subtaskId: t,
            subtaskInputs: s
          } = this.props, { defaultActiveText: a } = this.state, n = Object(u.d)(s, {
            key: jn.Password,
            subtask_id: t
          }, '')
          return o.createElement(w.a, { style: Mn.passwordEntry }, o.createElement(Jt, {
            autoComplete: 'new-password',
            defaultValue: n || void 0,
            label: e.password_hint,
            onPasswordChange: this._handlePasswordChange,
            onPasswordValidated: this._handlePasswordValidate,
            userIdentifier: a || void 0
          }))
        }), r()(this, '_renderNameField', () => {
          const {
            navigationContext: e,
            subtask: t,
            subtaskId: s,
            subtaskInputs: a
          } = this.props, n = Object(u.d)(a, {
            key: jn.Name,
            subtask_id: s
          }, ''), i = e.action, r = {
            autoComplete: 'name',
            autoFocus: !i || i === Bn,
            callback: this._updateNameInfo,
            defaultValue: n,
            onFocus: this._handleNameFocus,
            label: t.name_hint
          }
          return o.createElement(On, r)
        }), r()(this, '_renderActiveTextField', () => {
          const { subtask: e } = this.props, {
            activeTextField: t,
            defaultActiveText: s
          } = this.state, a = this._shouldFocusActiveTextField(), n = {
            autoComplete: t === jn.Phone ? 'tel' : 'email',
            autoFocus: a,
            defaultValue: s,
            name: t === jn.Phone ? 'phone_number' : 'email',
            label: t === jn.Phone ? e.phone_hint : e.email_hint,
            onRef: this._setInputRef,
            onValidityChange: this._updateValidity,
            style: Mn.phoneEmailTextField
          }
          return t === jn.Phone ? o.createElement(ls, n) : o.createElement(ot, n)
        }), r()(this, '_handleDateChange', e => {
          this.setState({
            birthdayValue: e,
            isBirthdayValid: this._isCompleteDate(e)
          }, this._updateValidity)
        }), r()(this, '_isCompleteDate', e => !!(e && e.year && e.month && e.day)), r()(this, '_getIdentifierValue', () => this._input && this._input.getValue()), r()(this, '_isValid', () => {
          const {
            isBirthdayValid: e,
            isNameValid: t,
            isPasswordValid: s
          } = this.state, { subtask: a } = this.props, n = !a.show_password_field || s, i = a.ignore_birthday || e
          return t && n && i && this._input && this._input.isValid()
        }), r()(this, '_setTimRef', e => {
          this._timInput = e
        }), r()(this, '_updateValidity', () => {
          this.setState({ isValid: this._isValid() })
        }), r()(this, '_updateNameInfo', (e, t) => {
          this.setState({
            isNameValid: t,
            nameValue: e
          }, this._updateValidity)
        }), r()(this, '_handleFetchPreferences', () => {
          const {
            createLocalApiErrorHandler: e,
            fetchPreferencesIfNeeded: t
          } = this.props
          t().catch(e())
        }), r()(this, '_handlePasswordChange', e => {
          this.setState({ passwordValue: e }, this._updateValidity)
        }), r()(this, '_handlePasswordValidate', e => {
          this.setState({ isPasswordValid: e }, this._updateValidity)
        }), r()(this, '_shouldFocusActiveTextField', () => {
          const { navigationContext: e } = this.props, { activeTextField: t } = this.state, s = t === jn.Phone ? Ln : Fn
          return !this.state.hasNameFieldBeenAutoFocused && e.action === s
        }), r()(this, '_handleActiveTextToggle', () => {
          const { activeTextField: e } = this.state, t = e === jn.Phone ? jn.Email : jn.Phone
          this._scribeEvent(t, 'choose'), this._input && this._input.clear(), this.setState({
            activeTextField: t,
            defaultActiveText: ''
          })
        }), r()(this, '_getToggleActiveTextTitle', () => {
          const { subtask: e } = this.props, { activeTextField: t } = this.state
          return t === jn.Phone ? e.use_email_text : e.use_phone_text
        }), r()(this, '_handleNameFocus', () => {
          this.setState({ hasNameFieldBeenAutoFocused: !0 })
        }), r()(this, '_handleNextButtonClick', () => {
          const {
              onNavigate: e,
              shouldPropagateP13nSettings: t,
              subtask: s,
              subtaskId: a,
              updateFlow: n
            } = this.props, {
              activeTextField: i,
              birthdayValue: r,
              nameValue: o,
              passwordValue: l
            } = this.state, {
              allowCookieUse: c,
              allowDeviceAccess: d,
              allowPartnerships: u,
              allowPersonalization: h
            } = this.props.personalizationSettings || {}, p = i === jn.Email && s.email_next_link ? s.email_next_link : s.next_link,
            _ = this._timInput && this._timInput.value ? { response: this._timInput.value } : void 0,
            m = this._getIdentifierValue() || void 0, b = {
              js_instrumentation: _,
              link: p.link_id,
              name: o
            }
          b[i] = m, s.show_password_field && (b.password = l), !s.ignore_birthday && r && (b.birthday = r), t && (b.personalization_settings = {
            allow_cookie_use: !!c,
            allow_device_personalization: !!d,
            allow_partnerships: !!u,
            allow_ads_personalization: !!h
          }), n(a, b), e(p)
        }), r()(this, '_scribeEvent', (e, t) => {
          const { scribeAction: s } = this.props
          s(Object.assign({}, Un, {
            element: e,
            action: t
          }))
        }), r()(this, '_setInputRef', e => {
          this._input = e
        })
        const {
          navigationContext: t,
          subtaskId: s,
          subtaskInputs: a
        } = e, n = Object(u.d)(a, {
          key: jn.Name,
          subtask_id: s
        }, ''), i = Object(u.d)(a, {
          key: jn.Phone,
          subtask_id: s
        }, ''), l = Object(u.d)(a, {
          key: jn.Email,
          subtask_id: s
        }, ''), c = Object(u.d)(a, {
          key: jn.Password,
          subtask_id: s
        }, ''), d = {
          day: void 0,
          month: void 0,
          year: void 0
        }, _ = Object(u.d)(a, {
          key: jn.Birthday,
          subtask_id: s
        }, void 0) || d, m = (e => {
          switch (e) {
            case Ln:
              return {
                type: jn.Phone,
                value: i
              }
            case Fn:
              return {
                type: jn.Email,
                value: l
              }
            default:
              return {
                type: l ? jn.Email : this._getDefaultIdentifierField(),
                value: l || i
              }
          }
        })(t.action)
        this.state = {
          activeTextField: m.type,
          birthdayValue: _,
          defaultActiveText: m.value,
          nameValue: n,
          hasNameFieldBeenAutoFocused: !1,
          passwordValue: c,
          isNameValid: void 0,
          isPasswordValid: !!c,
          isBirthdayValid: this._isCompleteDate(_),
          isValid: void 0
        }
      }

      componentDidMount() {
        Rn.a.inject('https://twitter.com/i/js_inst?c_name=ui_metrics'), this._handleFetchPreferences(), this.props.syncPersonalizationSettings()
      }

      componentDidUpdate() {
        this._shouldFocusActiveTextField() && this._input && this._input.focus()
      }

      render() {
        const {
          subtask: e,
          history: t,
          progressIndication: s
        } = this.props, a = o.createElement(D.a, {
          disabled: !this.state.isValid,
          onPress: this._handleNextButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, e.next_link.label)
        return o.createElement(v.a, {
          history: t,
          progressIndication: s,
          rightControl: a
        }, o.createElement(An.a, { title: Dn }), o.createElement(w.a, { style: R.contentArea }, e.primary_text && o.createElement(p.c, {
          nativeID: l.i,
          size: 'xLarge',
          style: R.headline,
          weight: 'bold'
        }, e.primary_text), this._renderNameField(), this._renderActiveTextField(), this._renderActiveFieldToggle(), this._renderBirthdayField(), e.show_password_field ? this._renderPasswordField() : null, o.createElement('input', {
          autoComplete: 'off',
          name: 'ui_metrics',
          ref: this._setTimRef,
          type: 'hidden'
        })))
      }

      _renderBirthdayField() {
        const {
          navigationContext: e,
          subtask: t
        } = this.props, {
          birthday_explanation: s,
          birthday_hint: a,
          ignore_birthday: n
        } = t, i = this.state.birthdayValue || {}, r = e.action === Nn
        return n ? null : o.createElement(w.a, {
          accessibilityLabel: a,
          accessibilityRole: 'group',
          style: Mn.birthdayPicker
        }, o.createElement(p.c, {
          size: 'normal',
          weight: 'bold'
        }, a), o.createElement(p.c, {
          color: 'gray600',
          size: 'normal'
        }, s), o.createElement(Pn.a, {
          autofocus: r,
          day: i.day,
          label: t.birthday_hint || '',
          minSelectableYear: Object(Tn.b)(),
          month: i.month,
          onChange: this._handleDateChange,
          year: i.year
        }))
      }
    }

    const Mn = T.a.create(e => ({
      birthdayPicker: { marginTop: e.spaces.large },
      toggleLink: {
        marginTop: e.spaces.small,
        alignSelf: 'flex-start'
      },
      passwordEntry: { marginTop: e.spaces.small },
      phoneEmailTextField: { paddingHorizontal: 0 }
    }))
    var zn = Cn(Vn)
    const qn = fe.a.a565833d, Hn = fe.a.h3629782, Gn = fe.a.j1c3f4b9, Yn = fe.a.c119dee8, Wn = fe.a.f70cd5ed, Xn = fe.a.a3841918,
      Kn = fe.a.d4e220b3

    class Zn extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_handleSignupButtonClick', () => {
          const {
              onNavigate: e,
              subtask: t,
              subtaskId: s,
              subtaskInputs: a,
              updateFlow: n
            } = this.props, {
              phone_number: i,
              email: r
            } = t, o = i && i.subtask_data_reference && Object(u.d)(a, i.subtask_data_reference),
            l = r && r.subtask_data_reference && Object(u.d)(a, r.subtask_data_reference)
          let c
          this._isOldEnoughOrIgnored() ? o ? c = t.phone_next_link : l && (c = t.email_next_link) : c = t.invalid_birthday_link, c && n(s, { link: c.link_id }), c && e(c)
        }), r()(this, '_handleNavigationClick', e => {
          const { onNavigate: t } = this.props
          t(e)
        }), r()(this, '_handleNameEdit', () => {
          const { subtask: e } = this.props
          this._handleNavigationClick(e.name_edit_link)
        }), r()(this, '_handleBirthdayEdit', () => {
          const { subtask: e } = this.props
          this._handleNavigationClick(e.birthday_edit_link)
        }), r()(this, '_handlePhoneEdit', () => {
          const { subtask: e } = this.props
          this._handleNavigationClick(e.phone_edit_link)
        }), r()(this, '_handleEmailEdit', () => {
          const { subtask: e } = this.props
          this._handleNavigationClick(e.email_edit_link)
        }), r()(this, '_handlePrivacyOptionsClick', e => t => {
          t.preventDefault(), this._handleNavigationClick(e)
        }), r()(this, '_isOldEnoughOrIgnored', () => {
          const {
            birthday: e,
            birthday_requirement: t,
            ignore_birthday: s
          } = this.props.subtask
          if (s) return !0
          {
            const s = e && e.subtask_data_reference && Object(u.d)(this.props.subtaskInputs, e.subtask_data_reference),
              a = s && new Date(s.year, s.month - 1, s.day), {
                year: n,
                month: i,
                day: r
              } = t || {}, o = n && i && r && new Date(n, i - 1, r)
            return !a || !o || a <= o
          }
        }), r()(this, '_getSignupButtonLabel', () => {
          const {
              subtask: e,
              subtaskInputs: t
            } = this.props, {
              phone_number: s,
              email: a
            } = e, n = s && s.subtask_data_reference && Object(u.d)(t, s.subtask_data_reference),
            i = a && a.subtask_data_reference && Object(u.d)(t, a.subtask_data_reference)
          return n ? e.phone_next_link.label : i ? e.email_next_link.label : qn
        })
      }

      render() {
        const {
          errorDialog: e,
          history: t,
          onBackClick: s,
          progressIndication: a
        } = this.props
        return o.createElement(v.a, {
          history: t,
          onBackClick: s,
          progressIndication: a
        }, o.createElement(w.a, null, o.createElement(w.a, { style: R.contentArea }, this._maybeRenderPrimaryText(), this._renderNameField(), this._renderPhoneOrEmailField(), this._maybeRenderBirthdayField(), this._maybeRenderDetailText(), o.createElement(D.a, {
          onPress: this._handleSignupButtonClick,
          size: 'normalLarge',
          style: R.primaryButton,
          type: 'primary'
        }, this._getSignupButtonLabel()))), e)
      }

      _maybeRenderPrimaryText() {
        const { subtask: e } = this.props
        return e.primary_text ? o.createElement(p.c, {
          align: 'left',
          nativeID: l.i,
          size: 'xLarge',
          style: R.headline,
          weight: 'bold'
        }, e.primary_text) : null
      }

      _maybeRenderDetailText() {
        const {
          onNavigate: e,
          subtask: t,
          subtaskInputs: s
        } = this.props, { detail_text: a } = t
        return a ? o.createElement(g, n()({}, a, {
          onNavigate: e,
          style: $n.detailText,
          subtaskInputs: s
        })) : null
      }

      _renderNameField() {
        const {
          subtask: e,
          subtaskInputs: t
        } = this.props, s = e.name && e.name.subtask_data_reference && Object(u.d)(t, e.name.subtask_data_reference)
        return o.createElement(w.a, {
          onClick: this._handleNameEdit,
          testID: 'editName'
        }, o.createElement(Ae.a, {
          defaultValue: s || '',
          label: Kn,
          name: 'name',
          style: R.formTextInput
        }))
      }

      _maybeRenderBirthdayField() {
        const {
          subtask: e,
          subtaskInputs: t
        } = this.props, s = e.birthday && e.birthday.subtask_data_reference && Object(u.d)(t, e.birthday.subtask_data_reference), {
          day: a,
          month: n,
          year: i
        } = s || {}, r = a && n && i && Hn(new Date(i, n - 1, a))
        return !e.ignore_birthday && s && r ? o.createElement(w.a, {
          accessibilityLabel: Gn({ birthdate: r }),
          accessibilityRole: 'button',
          onClick: this._handleBirthdayEdit,
          testID: 'editBirthday'
        }, o.createElement(Ae.a, {
          defaultValue: r,
          label: Yn,
          name: 'birthday',
          style: R.formTextInput
        })) : null
      }

      _renderPhoneOrEmailField() {
        const {
            subtask: {
              phone_number: e,
              email: t
            },
            subtaskInputs: s
          } = this.props, a = e && e.subtask_data_reference && Object(u.d)(s, e.subtask_data_reference),
          n = t && t.subtask_data_reference && Object(u.d)(s, t.subtask_data_reference)
        return a ? o.createElement(w.a, {
          onClick: this._handlePhoneEdit,
          testID: 'editPhone'
        }, o.createElement(Ae.a, {
          defaultValue: a || '',
          label: Wn,
          name: 'phone',
          style: R.formTextInput
        })) : n ? o.createElement(w.a, {
          onClick: this._handleEmailEdit,
          testID: 'editEmail'
        }, o.createElement(Ae.a, {
          defaultValue: n || '',
          label: Xn,
          name: 'email',
          style: R.formTextInput
        })) : null
      }
    }

    const $n = T.a.create(e => ({ detailText: { marginTop: e.spaces.jumbo } }))
    var Qn = Zn
    const Jn = 'selected_search_topic_ids', ei = 'selected_topic_ids', ti = [], si = Object(z.createSelector)((e, t) => {
      const s = Object(L.q)(e)
      return Object(u.d)(s, {
        key: Jn,
        subtask_id: t.subtaskId
      })
    }, (e, t) => {
      const s = Object(L.q)(e)
      return Object(u.d)(s, {
        key: ei,
        subtask_id: t.subtaskId
      })
    }, (e, t) => t.subtask.selected_topics_cart ? t.subtask.selected_topics_cart.selected_topic_ids : ti, (e, t, s) => ({
      initialSearchTopicIds: e || ti,
      initialSelectedTopicIds: t || s
    }))
    var ai = Object(V.c)(si), ni = s('+1/s'), ii = s('Rp9C'), ri = s('Znyr'), oi = s('sgih'), li = s('feu+')
    s('jQ/y')
    const ci = Object.freeze({
      TopicCategory: 'topic_category',
      Topic: 'topic'
    })
    var di = s('j7Bv'), ui = s('CGyZ'), hi = s('cm6r'), pi = s('zfvc'), _i = s('EHV7'), mi = s('iY63')
    const bi = (e = {}) => Object(d.a)('svg', Object.assign({}, e, {
      style: [ ja.a.root, e.style ],
      viewBox: '0 0 24 24'
    }), o.createElement('g', null, o.createElement('path', { d: 'M19 13H5c-.553 0-1-.447-1-1s.447-1 1-1h14c.553 0 1 .447 1 1s-.447 1-1 1z' })))
    bi.metadata = {
      width: 24,
      height: 24
    }
    var gi = bi

    class fi extends o.PureComponent {
      constructor(...e) {
        super(...e), r()(this, '_handleFollow', () => {
          const {
            onFollowTopic: e,
            id: t
          } = this.props
          e(t)
        }), r()(this, '_handleUnfollow', () => {
          const {
            onUnfollowTopic: e,
            id: t
          } = this.props
          e(t)
        })
      }

      render() {
        const {
          id: e,
          selectedTopicIds: t,
          subtaskInputs: s,
          topicsById: a
        } = this.props, i = a[e], r = t.includes(this.props.id)
        return o.createElement(w.a, { style: yi.cell }, o.createElement(di.a, {
          Icon: _i.a,
          size: 'large',
          style: yi.topicIcon
        }), o.createElement(w.a, { style: yi.topicInfo }, o.createElement(g, n()({ weight: 'bold' }, i.title, { subtaskInputs: s })), i.description ? o.createElement(g, n()({ color: 'gray600' }, i.description, { subtaskInputs: s })) : null), o.createElement(ui.a, {
          isFollowing: r,
          onFollow: this._handleFollow,
          onUnfollow: this._handleUnfollow,
          showRelationshipChangeConfirmation: !1,
          size: 'normalCompact',
          type: 'topic'
        }))
      }
    }

    class ki extends o.PureComponent {
      constructor(...e) {
        super(...e), r()(this, 'state', { expanded: !1 }), r()(this, '_handleClick', () => {
          this.setState({ expanded: !this.state.expanded })
        })
      }

      render() {
        const {
          categoriesById: e,
          id: t,
          isTopLevel: s,
          subtaskInputs: a
        } = this.props, { expanded: i } = this.state, r = e[t], l = i ? wi : vi
        return o.createElement(o.Fragment, null, o.createElement(hi.a, {
          onClick: this._handleClick,
          style: yi.cell
        }, o.createElement(g, n()({
          color: 'primary',
          size: s ? 'large' : 'normal',
          weight: s ? 'heavy' : 'bold'
        }, r.title, { subtaskInputs: a })), l), o.createElement(w.a, { style: yi.children }, o.createElement(pi.b, { show: i }, this._renderChildren())))
      }

      _renderChildren() {
        const {
          categoriesById: e,
          id: t,
          selectedTopicIds: s,
          onFollowTopic: a,
          onUnfollowTopic: i,
          subtaskInputs: r,
          topicsById: l
        } = this.props, c = e[t], d = {
          selectedTopicIds: s,
          onFollowTopic: a,
          onUnfollowTopic: i,
          topicsById: l,
          subtaskInputs: r
        }
        return c.children_items.map(({
                                       id: t,
                                       type: s
                                     }) => s === ci.Topic ? o.createElement(fi, n()({}, d, {
          id: t,
          key: t
        })) : o.createElement(ki, n()({}, d, {
          categoriesById: e,
          id: t,
          key: t
        })))
      }
    }

    const yi = T.a.create(e => ({
        cell: {
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: e.spaces.xSmall,
          paddingHorizontal: e.spaces.xxSmall,
          justifyContent: 'space-between',
          borderBottomColor: e.colors.borderColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: e.borderWidths.small
        },
        topicInfo: {
          flexGrow: 1,
          flexShrink: 1,
          marginRight: e.spaces.xSmall
        },
        topicIcon: {
          flexShrink: 0,
          marginRight: e.spaces.xSmall
        },
        plusIcon: { color: e.colors.gray600 },
        minusIcon: { color: e.colors.primary },
        children: { marginLeft: e.spaces.xSmall }
      })), vi = o.createElement(mi.a, { style: yi.plusIcon }), wi = o.createElement(gi, { style: yi.minusIcon }), Ci = fe.a.f134915f,
      Ei = fe.a.h6beb5fa, xi = fe.a.b8fb87e0, Ii = o.createElement(ni.a, null)

    class Si extends o.Component {
      constructor(...e) {
        super(...e), r()(this, 'state', {
          hideBanner: !1,
          selectedTopicIds: this.props.initialSelectedTopicIds,
          showCart: !1
        }), r()(this, '_renderCartButton', () => {
          const { selected_topics_cart: e } = this.props.subtask, { selectedTopicIds: t } = this.state
          return e && e.title && t.length > 0 ? o.createElement(w.a, null, o.createElement(D.a, {
            accessibilityLabel: xi,
            icon: Ii,
            onPress: this._handleOpenCart,
            size: 'normalCompact',
            type: 'secondary'
          }), o.createElement(ri.a, {
            count: t.length,
            truncatedCountFormatter: Ei,
            unreadCountLabel: Ci,
            withBorder: !0
          })) : null
        }), r()(this, '_renderCart', () => {
          const {
            subtask: e,
            subtaskInputs: t
          } = this.props, { selected_topics_cart: s } = e, a = s && s.done_label ? o.createElement(D.a, {
            key: 'button_cancel',
            onPress: this._handleCloseCart,
            style: Oi.cartButton,
            type: 'neutral'
          }, s.done_label.text) : null
          return o.createElement(oi.a, {
            onMaskClick: this._handleCloseCart,
            style: Oi.cart,
            type: 'bottom',
            withMask: !0
          }, s && s.title ? o.createElement(g, n()({
            align: 'center',
            size: 'large',
            style: Oi.cartHeader,
            subtaskInputs: t,
            weight: 'heavy'
          }, s.title)) : null, this._renderCartItems(), a)
        }), r()(this, '_handleOpenCart', () => {
          this.setState({ showCart: !0 }), this.props.analytics.scribe({
            element: 'cart',
            action: 'impression'
          })
        }), r()(this, '_handleCloseCart', () => {
          this.setState({ showCart: !1 }), this.props.analytics.scribe({
            element: 'cart',
            action: 'dismiss'
          })
        }), r()(this, '_renderBanner', () => {
          const { banner: e } = this.props.subtask, { hideBanner: t } = this.state
          return e && !t ? o.createElement(li.a, {
            actionLabel: e.dismiss_label.text,
            headline: e.title.text,
            onAction: this._handleBannerDismiss,
            onClose: this._handleBannerDismiss,
            subtext: e.subtitle.text
          }) : null
        }), r()(this, '_renderText', () => {
          const {
            subtask: e,
            subtaskInputs: t
          } = this.props, {
            primary_text: s,
            secondary_text: a
          } = e
          return o.createElement(w.a, { style: Oi.textContainer }, s ? o.createElement(g, n()({
            align: 'center',
            size: 'large',
            subtaskInputs: t,
            weight: 'heavy'
          }, s)) : null, a ? o.createElement(g, n()({
            align: 'center',
            color: 'gray600',
            style: Oi.bodyText,
            subtaskInputs: t
          }, a)) : null)
        }), r()(this, '_renderSkip', () => {
          const { skip_link: e } = this.props.subtask
          return e ? o.createElement(D.a, {
            onPress: this._handleSkipButtonClick,
            size: 'normalCompact',
            style: Oi.skipButton,
            type: 'text'
          }, e.label) : null
        }), r()(this, '_renderDone', () => o.createElement(D.a, {
          onPress: this._handleNextButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, this.props.subtask.next_link.label)), r()(this, '_renderCartItems', () => {
          const {
            subtask: e,
            subtaskInputs: t
          } = this.props, { selectedTopicIds: s } = this.state
          return s.map(a => o.createElement(fi, {
            id: a,
            key: a,
            onFollowTopic: this._handleFollowTopic,
            onUnfollowTopic: this._handleUnfollowTopic,
            selectedTopicIds: s,
            subtaskInputs: t,
            topicsById: e.topic_by_id_list
          }))
        }), r()(this, '_renderItems', () => {
          const {
            subtask: e,
            subtaskInputs: t
          } = this.props, { selectedTopicIds: s } = this.state
          return e.top_category_ids.map(a => o.createElement(ki, {
            categoriesById: e.category_by_id_list,
            id: a,
            isTopLevel: !0,
            key: a,
            onFollowTopic: this._handleFollowTopic,
            onUnfollowTopic: this._handleUnfollowTopic,
            selectedTopicIds: s,
            subtaskInputs: t,
            topicsById: e.topic_by_id_list
          }))
        }), r()(this, '_handleFollowTopic', e => {
          const { analytics: t } = this.props
          t.scribe({
            element: 'topic',
            action: 'follow',
            data: { items: [ ii.a.forTopic(e) ] }
          }), this.setState({ selectedTopicIds: [ ...this.state.selectedTopicIds, e ] })
        }), r()(this, '_handleUnfollowTopic', e => {
          const { analytics: t } = this.props
          t.scribe({
            element: 'topic',
            action: 'unfollow',
            data: { items: [ ii.a.forTopic(e) ] }
          }), this.setState({ selectedTopicIds: this.state.selectedTopicIds.filter(t => t !== e) })
        }), r()(this, '_handleBannerDismiss', () => {
          this.props.analytics.scribe({
            element: 'prompt',
            action: 'dismiss'
          }), this.setState({ hideBanner: !0 })
        }), r()(this, '_handleNextButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props, { selectedTopicIds: n } = this.state
          a(s, {
            link: t.next_link.link_id,
            selected_topic_ids: n
          }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, { link: t.skip_link.link_id }), e(t.skip_link)
        })
      }

      componentDidMount() {
        const {
          analytics: e,
          subtask: t
        } = this.props
        t.banner && e.scribe({
          element: 'prompt',
          action: 'impression'
        })
      }

      render() {
        const {
            errorDialog: e,
            history: t
          } = this.props, { showCart: s } = this.state,
          a = o.createElement(w.a, { style: Oi.buttonContainer }, this._renderSkip(), this._renderDone()), n = this._renderCartButton()
        return o.createElement(v.a, {
          history: t,
          leftControl: n,
          rightControl: a
        }, o.createElement(w.a, { style: R.contentArea }, this._renderBanner(), this._renderText(), this._renderItems()), s ? this._renderCart() : null, e)
      }
    }

    const Oi = T.a.create(e => ({
      buttonContainer: { flexDirection: 'row' },
      skipButton: { marginRight: e.spaces.xSmall },
      cart: {
        flexGrow: 1,
        maxHeight: '80vh',
        overflow: 'auto',
        padding: e.spaces.medium,
        paddingBottom: e.spaces.medium
      },
      cartButton: { marginTop: e.spaces.xSmall },
      cartHeader: { marginBottom: e.spaces.xSmall },
      textContainer: { marginBottom: e.spaces.xSmall },
      bodyText: {
        alignSelf: 'center',
        marginTop: e.spaces.xSmall,
        maxWidth: 400
      }
    }))
    var Ai = Object(le.a)(ai(Si), { section: 'topics_selector' })
    const Ti = Object(z.createSelector)((e, t) => {
      const s = _a.f(e), [ a ] = s ? pa.g(e, s) : []
      return a
    }, (e, t) => {
      const s = _a.g(e), [ a ] = s ? pa.g(e, s) : []
      return a
    }, (e, t) => ({
      avatarMedia: e,
      bannerMedia: t
    })), Ri = {
      scribeAction: B.c,
      updateProfileAvatar: _a.i,
      updateProfileBanner: _a.j
    }
    var Pi = Object(V.g)(Ti, Ri)

    class Di extends o.Component {
      constructor(...e) {
        super(...e), r()(this, '_scribeUploadStart', e => {
          const {
            flowToken: t,
            subtaskId: s,
            scribeAction: a,
            scribeNamespace: n
          } = this.props
          a(Object.assign({}, n, {
            section: e,
            element: 'upload',
            action: 'start'
          }), {
            items: [ {
              token: t,
              name: s
            } ]
          })
        }), r()(this, '_updateMedia', () => {
          const {
            avatarMedia: e,
            bannerMedia: t,
            subtask: { sources: s },
            updateProfileAvatar: a,
            updateProfileBanner: n
          } = this.props
          return new Promise((i, r) => {
            try {
              s.forEach(s => {
                const { style: i } = s
                i === h.h.Avatar && e ? (this._scribeUploadStart('select_avatar'), a(e.id)) : i === h.h.Banner && t && (this._scribeUploadStart('select_banner'), n(t.id))
              }), i()
            } catch (e) {
              r(e)
            }
          })
        })
      }

      render() {
        const {
          subtask: e,
          subtaskId: t,
          onNavigate: s
        } = this.props
        return o.createElement(Is, {
          navigationLink: e.next_link,
          onNavigate: s,
          subtaskAction: this._updateMedia,
          subtaskId: t
        })
      }
    }

    var ji = Object(ne.c)()(Pi(Di)), Ni = s('QIgh'), Fi = s('8UdT'), Bi = s('IcAo'), Li = s('Ka9G')
    var Ui = o.createContext(new Set)
    const Vi = (e, t) => ({
                            loggedInUserId: s,
                            promotedContent: a,
                            userId: n
                          }) => o.createElement(Ui.Consumer, null, s => o.createElement(ui.a, {
      isFollowing: s.has(n),
      onFollow: e(n),
      onUnfollow: t(n),
      showRelationshipChangeConfirmation: !1,
      size: 'normalCompact',
      style: Mi.followButton,
      type: 'user'
    })), Mi = T.a.create(e => ({
      followButton: {
        alignSelf: 'flex-start',
        marginLeft: e.spaces.xSmall
      }
    })), zi = (e, t, s) => a => {
      const n = a.user.id_str
      s.has(n) ? t(n)() : e(n)()
    }
    var qi = ({
                onFollow: e,
                onUnfollow: t,
                currentFollows: s
              }) => Object(Bi.a)({}, Ni.b, {
      [Fi.b.User]: Object(Li.a)({
        decoration: Vi(e, t),
        withLink: !1,
        shouldScribe: !1,
        onClick: zi(e, t, s)
      })
    }), Hi = s('BV3T'), Gi = s('VTxf'), Yi = s('ZNT5'), Wi = s('fTQJ'), Xi = s('wgnn'), Ki = s('I7xG')
    const Zi = e => {
      switch (e) {
        case Xi.a.NOT_FOUND:
          return o.createElement(Gi.a, null)
        case Xi.a.NOT_ALLOWED:
          return o.createElement(Hi.a, null)
        default:
          return Object(oe.a)('Unhandled timeline unavailable reason: ' + e), null
      }
    }

    class $i extends o.Component {
      constructor(e) {
        super(e), r()(this, '_getModule', Object(Ki.a)(this, e => e.subtaskId, e => e.flowToken, (e, t) => (({
                                                                                                               subtask_id: e,
                                                                                                               flow_token: t
                                                                                                             }) => Object(Yi.a)({
          timelineId: 'nux-user-recos-' + e,
          getEndpoint: e => e.URT.fetchNUXUserRecommendations,
          getEndpointParams: s => Object.assign({}, s, {
            subtask_id: e,
            flow_token: t
          }),
          context: 'FETCH_NUX_USER_RECOS',
          perfKey: 'nux-user-recos'
        }))({
          subtask_id: e,
          flow_token: t || ''
        }))), r()(this, '_onFollow', e => () => {
          const t = Object(Ss.a)([ ...this.state.selectedUsers ])
          t.add(e), this.setState({ selectedUsers: t })
        }), r()(this, '_onUnfollow', e => () => {
          const t = Object(Ss.a)([ ...this.state.selectedUsers ])
          t.has(e) && t.delete(e), this.setState({ selectedUsers: t })
        }), r()(this, '_getFollowText', (e, t, s) => !e || s < 1 ? t : e.concat(s.toString())), r()(this, '_handleFollowButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, {
            link: t.next_link.link_id,
            selected_user_recommendations: [ ...this.state.selectedUsers ]
          }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        }), this.state = { selectedUsers: new Set }
      }

      render() {
        const {
          history: e,
          onBackClick: t,
          onNavigate: s,
          subtask: a,
          subtaskInputs: i
        } = this.props, { selectedUsers: r } = this.state
        let c = ''
        if (a.next_link_threshold_text && a.next_link_threshold_text.length > 0) {
          const e = a.next_link_threshold_text[0]
          c = e && e.text && e.text.text
        }
        const d = a.next_link.label, u = r.size, h = this._getFollowText(c, d, u), p = o.createElement(D.a, {
          onPress: this._handleFollowButtonClick,
          size: 'normalCompact',
          type: 'primary'
        }, h), _ = a.skip_link ? o.createElement(D.a, {
          onPress: this._handleSkipButtonClick,
          size: 'normalCompact',
          type: 'text'
        }, a.skip_link.label) : null, m = u >= (a.min_follow_count || 0) ? p : _, b = Array.from(r).join(',')
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          rightControl: m
        }, o.createElement(w.a, { style: Ji.main }, a.primary_text ? o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: i,
          weight: 'bold'
        })) : null, a.secondary_text ? o.createElement(g, n()({}, a.secondary_text, {
          onNavigate: s,
          size: 'normal',
          style: R.subHeader,
          subtaskInputs: i,
          weight: 'bold'
        })) : null, o.createElement(Ui.Provider, { value: r }, o.createElement(Wi.a, {
          entryConfiguration: qi({
            onFollow: this._onFollow,
            onUnfollow: this._onUnfollow,
            currentFollows: r
          }),
          fetchOptions: { follows: b },
          module: this._getModule(),
          renderUnavailable: Zi,
          title: ''
        }))), this.props.errorDialog)
      }
    }

    var Qi = Object(ne.c)({ page: 'onboarding' })($i)
    const Ji = T.a.create(e => ({ main: { marginHorizontal: e.spaces.medium } }))
    var er = s('v6aA'), tr = s('tI3i'), sr = s.n(tr), ar = s('TEoO'), nr = s('tocL'), ir = s('Re5t'), rr = s('tn7R')
    const or = e => e.items.map(e => e.user_id_str).join('-'), lr = () => null

    class cr extends o.Component {
      constructor(e, t) {
        super(e, t), r()(this, '_renderGroup', Object(Ki.a)(this, e => e.followedUserIds, e => t => {
          const s = t.items.every(t => e.has(t.user_id_str))
          return o.createElement(w.a, {
            key: t.header,
            style: dr.group
          }, o.createElement(w.a, { style: dr.groupHeader }, o.createElement(p.c, {
            size: 'large',
            weight: 'bold'
          }, t.header), this.state.useCheckboxes ? o.createElement(P.a, {
            checked: s,
            onChange: this._handleGroupCheckboxChange(t, s)
          }) : null), this._renderUserCells(t.items))
        })), r()(this, '_renderSearchedUsers', e => {
          const { selectedSearchHeader: t } = this.props, s = Object(rr.a)(e)
          return t && s.length ? o.createElement(w.a, {
            key: 'search-results',
            style: dr.group
          }, o.createElement(w.a, { style: dr.groupHeader }, o.createElement(p.c, {
            size: 'large',
            weight: 'bold'
          }, t)), this._renderSearchUserCells(s)) : null
        }), r()(this, '_getSearchCellDecorator', e => {
          if (this.state.useCheckboxes) {
            const t = this._handleSearchUserUnfollowed(e.id_str)
            return o.createElement(P.a, {
              checked: !0,
              onChange: t
            })
          }
          return this._getUserFollowButton({
            id: e.id_str,
            name: e.name,
            screenName: e.screen_name,
            isFollowing: !0,
            onFollow: e => y.a,
            onUnfollow: this._handleSearchUserUnfollowed
          })
        }), r()(this, '_handleSearchUserUnfollowed', e => () => this.props.onSearchUserRemove(e)), r()(this, '_renderUserCell', ({
                                                                                                                                   id: e,
                                                                                                                                   description: t,
                                                                                                                                   name: s,
                                                                                                                                   profileImageUrl: a,
                                                                                                                                   screenName: n,
                                                                                                                                   isFollowing: i,
                                                                                                                                   isVerified: r,
                                                                                                                                   onCellClick: l,
                                                                                                                                   socialText: c,
                                                                                                                                   decorator: d,
                                                                                                                                   user: u
                                                                                                                                 }) => {
          const h = l(e, i), p = c ? {
            contextType: nr.a.Follow,
            text: c
          } : void 0
          return o.createElement(w.a, {
            accessibilityRole: 'label',
            key: e,
            style: dr.userCellContainer
          }, o.createElement(Ut.a, {
            avatarUri: a,
            decoration: d,
            description: t,
            displayMode: ir.a.UserDetailed,
            entities: {},
            isVerified: r,
            key: e,
            name: s,
            onCellClick: h,
            promotedItemType: 'users',
            screenName: n,
            socialContext: p,
            style: dr.userCell,
            userId: e,
            withBottomBorder: !0,
            withLink: !1
          }))
        }), r()(this, '_getUserFollowButton', ({
                                                 id: e,
                                                 name: t,
                                                 screenName: s,
                                                 isFollowing: a,
                                                 onFollow: n,
                                                 onUnfollow: i
                                               }) => o.createElement(ui.a, {
          isFollowing: a,
          name: s,
          onFollow: n(e),
          onUnfollow: i(e),
          showRelationshipChangeConfirmation: !1,
          size: 'normalCompact',
          style: dr.followButton,
          type: 'user'
        })), r()(this, '_getUserCellDecorator', (e, t) => {
          const {
            user: s,
            user_id_str: a
          } = e
          if (this.state.useCheckboxes) {
            const e = this._handleDecoratorChange(a, t)
            return o.createElement(P.a, {
              checked: t,
              onChange: e
            })
          }
          return this._getUserFollowButton({
            id: a,
            name: s.name,
            screenName: s.screen_name,
            isFollowing: t,
            onFollow: this._handleOnFollow,
            onUnfollow: this._handleOnUnfollow
          })
        }), r()(this, '_handleGroupCheckboxChange', (e, t) => () => {
          const s = e.items.map(e => e.user_id_str)
          this._updateFollowedItems(s, !t)
        }), r()(this, '_handleOnFollow', e => () => {
          this._updateFollowedItems([ e ], !0)
        }), r()(this, '_handleOnUnfollow', e => () => {
          this._updateFollowedItems([ e ], !1)
        }), r()(this, '_handleDecoratorChange', (e, t) => () => {
          this._updateFollowedItems([ e ], !t)
        }), this.state = { useCheckboxes: e.followButtonType === h.e.Checkbox }
      }

      render() {
        const {
          userGroups: e,
          selectedSearchUsers: t,
          onNearEnd: s
        } = this.props, { loggedInUserId: a } = this.context
        return sr()(!!a, 'loggedInUserId must be defined'), o.createElement(w.a, null, this._renderSearchedUsers(t), o.createElement(ar.a, {
          cacheKey: 'userSelectList/' + a,
          identityFunction: or,
          items: e,
          nearEndProximityRatio: 1.15,
          noItemsRenderer: lr,
          onNearEnd: s,
          renderer: this._renderGroup()
        }))
      }

      _renderSearchUserCells(e) {
        return o.createElement(o.Fragment, null, e.map(e => {
          const t = this._getSearchCellDecorator(e)
          return this._renderUserCell({
            id: e.id_str,
            name: e.name,
            profileImageUrl: e.profile_image_url_https,
            screenName: e.screen_name,
            isFollowing: !0,
            isVerified: e.verified,
            onCellClick: this._handleSearchUserUnfollowed,
            decorator: t
          })
        }))
      }

      _renderUserCells(e) {
        const { followedUserIds: t } = this.props
        return o.createElement(o.Fragment, null, e.map(e => {
          const {
            user: s,
            user_id_str: a
          } = e, n = t.has(a), i = this._getUserCellDecorator(e, n)
          return this._renderUserCell({
            id: a,
            description: s.description,
            name: s.name,
            profileImageUrl: s.profile_image_url_https,
            screenName: s.screen_name,
            isFollowing: n,
            isVerified: s.verified,
            onCellClick: this._handleDecoratorChange,
            socialText: e.social_text,
            decorator: i,
            user: s
          })
        }))
      }

      _updateFollowedItems(e, t) {
        const {
          onFollow: s,
          onUnfollow: a
        } = this.props
        t ? s(e) : a(e)
      }
    }

    r()(cr, 'contextType', er.a), r()(cr, 'defaultProps', { onNearEnd: y.a })
    const dr = T.a.create(e => ({
      group: {
        borderTopColor: e.colors.borderColor,
        borderTopStyle: 'solid',
        borderTopWidth: e.borderWidths.small
      },
      followButton: {
        alignSelf: 'flex-start',
        marginLeft: e.spaces.xSmall
      },
      groupHeader: {
        alignItems: 'center',
        borderBottomColor: e.colors.borderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: e.borderWidths.small,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: e.spaces.medium,
        paddingVertical: e.spaces.xSmall
      },
      userCell: { paddingHorizontal: e.spaces.medium },
      quoteTweetContainer: {
        marginBottom: e.spaces.medium,
        paddingRight: e.spaces.medium,
        paddingLeft: `calc(2*${e.spaces.xLarge})`
      },
      quoteTweet: { marginTop: e.spaces.xSmall },
      userCellContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      userStats: {
        marginBottom: e.spaces.xSmall,
        marginLeft: e.spaces.micro
      }
    })), ur = [ Ns.a.Users ], hr = 'selected_user_recommendations'

    class pr extends o.Component {
      constructor(e) {
        super(e), r()(this, '_getPreCheckedUsers', (e = []) => Object(Ss.a)(e.reduce((e, t) => {
          const s = t.items.reduce((e, t) => (t.checked_by_default && e.push(t.user_id_str), e), [])
          return [ ...e, ...s ]
        }, []))), r()(this, '_getFollowText', (e, t, s) => !e || s < 1 ? t : e.concat(s.toString())), r()(this, '_handleSelectionChanged', e => {
          this.setState({ selectedUsers: Object(Ss.a)(e) })
        }), r()(this, '_handleOnUnfollowsSelected', e => {
          const t = Object(Ss.a)([ ...this.state.selectedUsers ]), { selectedSearchUsers: s } = this.state
          for (const a of e) t.has(a) && t.delete(a), delete s[a]
          this.setState({
            selectedUsers: t,
            selectedSearchUsers: s
          })
        }), r()(this, '_handleOnFollowsSelected', e => {
          const t = Object(Ss.a)([ ...this.state.selectedUsers ])
          for (const s of e) t.add(s)
          this.setState({ selectedUsers: t })
        }), r()(this, '_handleFollowButtonClick', () => {
          const {
            onNavigate: e,
            subtask: t,
            subtaskId: s,
            updateFlow: a
          } = this.props
          a(s, {
            link: t.next_link.link_id,
            selected_user_recommendations: [ ...this.state.selectedUsers ],
            searched_users: Object.keys(this.state.selectedSearchUsers)
          }), e(t.next_link)
        }), r()(this, '_handleSkipButtonClick', () => {
          const {
            onNavigate: e,
            subtask: { skip_link: t },
            subtaskId: s,
            updateFlow: a
          } = this.props
          t && a(s, { link: t.link_id }), t && e(t)
        }), r()(this, '_handleSearchUserRemoved', e => this._handleOnUnfollowsSelected([ e ])), r()(this, '_handleSearchSuggestionSelected', (e, t) => {
          const s = e.data, {
            selectedSearchUsers: a,
            selectedUsers: n
          } = this.state
          this._recommendedUsers.has(s.id_str) && n.add(s.id_str), a[s.id_str] = s, this.setState({
            selectedSearchUsers: a,
            selectedUsers: n
          })
        })
        const {
          subtaskId: t,
          subtaskInputs: s
        } = e, a = Object(Ss.a)([]), n = Object(u.d)(s, {
          key: hr,
          subtask_id: t
        }, a)
        this._recommendedUsers = Object(Ss.a)(e.subtask.groups.map(e => e.items.map(e => e.user_id ? e.user_id.toString() : '')).reduce((function (e, t) {
          return e.concat(t)
        }))), this.state = {
          selectedSearchUsers: {},
          selectedUsers: n && n.size ? n : this._getPreCheckedUsers(e.subtask.groups)
        }
      }

      render() {
        const {
            history: e,
            onBackClick: t,
            onNavigate: s,
            subtask: a,
            subtaskInputs: i
          } = this.props, {
            selectedSearchUsers: r,
            selectedUsers: c
          } = this.state, d = (((a.next_link_threshold_text || {})[0] || {}).text || {}).text, u = a.next_link.label,
          h = (r ? Object.keys(r).length : 0) + c.size, p = this._getFollowText(d, u, h), _ = o.createElement(D.a, {
            onPress: this._handleFollowButtonClick,
            size: 'normalCompact',
            type: 'primary'
          }, p), m = a.skip_link ? o.createElement(D.a, {
            onPress: this._handleSkipButtonClick,
            size: 'normalCompact',
            type: 'text'
          }, a.skip_link.label) : null, b = null === a.min_follow_count || void 0 === a.min_follow_count ? 1 : a.min_follow_count,
          f = c.size >= b ? _ : m,
          k = a.show_user_search ? o.createElement(w.a, { style: [ R.contentArea, _r.searchContainer ] }, o.createElement(Ds.c, {
            filter: ur,
            onItemClick: this._handleSearchSuggestionSelected,
            placeholder: a.hint,
            rounded: !0,
            shouldAutoFocus: !0,
            shouldClearOnSelect: !0,
            source: Ns.d.WelcomeFlow
          })) : null
        return o.createElement(v.a, {
          history: e,
          onBackClick: t,
          rightControl: f
        }, o.createElement(w.a, null, o.createElement(w.a, { style: _r.main }, a.primary_text ? o.createElement(g, n()({}, a.primary_text, {
          nativeID: l.i,
          onNavigate: s,
          size: 'xLarge',
          style: R.headline,
          subtaskInputs: i,
          weight: 'bold'
        })) : null, a.secondary_text ? o.createElement(g, n()({}, a.secondary_text, {
          onNavigate: s,
          size: 'normal',
          style: R.subHeader,
          subtaskInputs: i,
          weight: 'bold'
        })) : null), k, o.createElement(w.a, null, o.createElement(cr, {
          followButtonType: a.follow_button_type,
          followedUserIds: c,
          onFollow: this._handleOnFollowsSelected,
          onSearchUserRemove: this._handleSearchUserRemoved,
          onUnfollow: this._handleOnUnfollowsSelected,
          selectedSearchHeader: a.custom_recommendations_header && a.custom_recommendations_header.text || void 0,
          selectedSearchUsers: r,
          userGroups: a.groups
        }))), this.props.errorDialog)
      }
    }

    const _r = T.a.create(e => ({
      secondaryText: { marginBottom: e.spaces.small },
      main: { marginHorizontal: e.spaces.medium },
      searchContainer: {
        marginBottom: e.spaces.small,
        zIndex: 1
      }
    }))
    var mr = s('Qwev')

    class br extends o.Component {
      componentWillUnmount() {
        this._timer && clearTimeout(this._timer)
      }

      componentDidMount() {
        const {
          subtask: e,
          onNavigate: t
        } = this.props
        this._timer = setTimeout(() => {
          t(e.next_link, !0)
        }, e.wait_time_ms)
      }

      render() {
        const { history: e } = this.props
        return o.createElement(v.a, { history: e }, o.createElement(w.a, { style: gr.indicator }, o.createElement(mr.a, null)))
      }
    }

    const gr = T.a.create(e => ({
      indicator: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
      }
    }))
    var fr = s('7N4s')
    const kr = { page: 'onboarding' }, yr = fe.a.c20aaf3d, vr = fe.a.a219e217

    class wr extends o.Component {
      constructor(e) {
        super(e), r()(this, '_handleBackAttempt', (e, t) => {
          const { currentSubtask: s } = this.props, a = !s || !s.subtask_back_navigation || s.subtask_back_navigation !== h.n.Disallow,
            n = !this.currentPreviousNavigableSubtaskId && this._onFirstTaskSinceStart && a
          if ('POP' !== t || n) return !0
          return this.currentPreviousNavigableSubtaskId && a && this._navigateToPreviousSubtask(), !1
        }), r()(this, '_sendGaOnboardingEvent', e => {
          const { googleAnalyticsSendEvent: t } = this.props
          t('signup', e, 'new-user')
        }), r()(this, '_startFlow', e => {
          const {
              countryCode: t,
              debugOverrides: s,
              inputFlowData: a,
              location: n,
              startFlow: i,
              startLocation: r,
              targetUserId: o,
              testCountryCode: l,
              flowName: c,
              createLocalApiErrorHandler: d
            } = e, {
              fromApp: h,
              gatedAction: p
            } = n.state || {},
            _ = Object.keys(r || {}).length ? { start_location: r } : { start_location: { location: h ? 'unknown' : 'manual_link' } }, m = {
              flow_context: Object.assign({
                debug_overrides: s,
                gated_action: p
              }, _)
            }, b = Object.assign({}, a, {
              country_code: t || a.country_code,
              target_user_id: o || a.target_user_id
            }, m)
          'signup' === c && this._sendGaOnboardingEvent('signup-clicked'), this._onFirstTaskSinceStart = !0, i({
            flow_name: c,
            input_flow_data: b,
            subtask_versions: u.a,
            test_country_code: l
          }).catch(d(Ne(c, null, this._displayFailureMessage)))
        }), r()(this, '_handleFlowRestart', () => {
          this._startFlow(this.props)
        }), r()(this, '_handleDeepLink', e => {
          const { history: t } = this.props
          if (e) {
            const s = Object(xs.a)(e)
            s && t.replace(s)
          }
        }), r()(this, '_handleAbortFlow', e => {
          const {
            clearFlow: t,
            currentSubtask: s,
            location: a,
            history: n,
            onAbort: i,
            returnPath: r
          } = this.props
          t({ clearPersistence: !0 })
          const o = s && Object(u.f)(s)
          i ? i() : r ? n.replace({
            pathname: r,
            query: { flow_status: e }
          }) : o === h.p.OpenHomeTimeline ? n.replace('/home') : (this._unblockHistory && this._unblockHistory(), Object(Da.a)({}, { location: a }) ? n.goBack() : n.replace('/home'))
        }), r()(this, '_displayFailureMessage', e => {
          this.setState({ alertFailureMessage: e })
        }), r()(this, '_submitFlow', ({ isTaskNavigation: e } = {}) => {
          const {
            flowName: t,
            submitFlow: s,
            createLocalApiErrorHandler: a
          } = this.props
          return s({ isTaskNavigation: e }).then(e => (this._onFirstTaskSinceStart = !1, e), e => {
            const {
              failureMessage: s,
              shouldAbort: n
            } = this.props
            return a(Ne(t, s, n ? this._displayFailureMessage : void 0))(e)
          })
        }), r()(this, '_handleNavigate', (e, t = !1) => {
          const {
            navigateSubtask: s,
            submitFlow: a
          } = this.props, {
            is_destructive: n,
            subtask_id: i,
            subtask_navigation_context: r
          } = e
          switch (e.suppress_client_events || this._scribeSubtaskNavigate(e), e.link_type) {
            case h.i.Abort:
              a().catch(y.a), this._handleAbortFlow()
              break
            case h.i.Subtask:
              s({
                subtaskId: i,
                navigationContext: r,
                destructive: n,
                fromHiddenSubtask: t
              })
              break
            case h.i.Finish:
            case h.i.Task:
              this._submitFlow({ isTaskNavigation: !0 })
              break
            case h.i.Deeplink:
              this._submitFlow(), this._handleDeepLink(e.url)
              break
            case h.i.DeeplinkAndAbort:
              a().catch(y.a), this._handleDeepLink(e.url)
              break
            case h.i.WeblinkAndAbort:
              a().catch(y.a), window.open(e.url, '_blank'), this._handleAbortFlow()
              break
            case h.i.Web:
              ye.b.navigateTo(e.url)
              break
            case h.i.ChromelessWeb:
              window.open(e.url, '_blank')
              break
            case h.i.DeeplinkInPlace:
              break
            default:
              Object(oe.a)('Unknown Navigation Link Type ' + e.link_type), this._handleAbortFlow()
          }
        }), r()(this, '_scribeSubtaskNavigate', e => {
          const {
            currentSubtask: t,
            scribeAction: s,
            flowToken: a
          } = this.props
          if (t && t.subtask_id) {
            const { link_id: n } = e
            s(Object.assign({}, kr, {
              element: 'link',
              action: 'click'
            }), {
              items: [ {
                token: a,
                name: t.subtask_id,
                description: n
              } ]
            })
          }
        }), r()(this, '_navigateToSubtask', e => () => {
          this._handleNavigate({
            link_id: '',
            link_type: h.i.Subtask,
            subtask_id: e
          })
        }), r()(this, '_endFlowSubtaskAction', (e, t) => {
          const { submitFlow: s } = this.props
          switch (t) {
            case h.i.Abort:
              s().catch(y.a).then(() => this._handleAbortFlow(e))
              break
            case h.i.Finish:
              this._submitFlow().then(() => this._handleAbortFlow(e))
              break
            default:
              Object(oe.a)('Unknown End Flow Type ' + t), this._handleAbortFlow()
          }
        }), r()(this, '_render', () => {
          const {
            currentSubtask: e,
            previousNavigableSubtaskId: t,
            subtasks: s
          } = this.props, a = s.find(e => e.subtask_id === t)
          return e ? e.alert_dialog || e.menu_dialog ? o.createElement(o.Fragment, null, this._renderSubtask(e), a && this._renderSubtask(a)) : this._renderSubtask(e) : null
        }), r()(this, '_renderDefault', () => {
          const {
            currentSubtask: e,
            flowToken: t,
            history: s,
            subtasks: a
          } = this.props, n = a.map(e => o.createElement(p.c, {
            key: e.subtask_id,
            onClick: this._navigateToSubtask(e.subtask_id)
          }, e.subtask_id))
          return o.createElement(v.a, { history: s }, o.createElement(w.a, { style: { margin: 5 } }, o.createElement(p.c, null, t), o.createElement(p.c, null, 'Current Subtask: ' + (e ? e.subtask_id : '')), n))
        }), r()(this, '_handleAbortFlowOnConfirm', () => {
          this._handleAbortFlow()
        }), r()(this, '_onNoopInvisibleSubtask', () => Promise.resolve()), r()(this, '_navigateToPreviousSubtask', () => {
          const {
            navigateSubtask: e,
            previousNavigableSubtaskId: t
          } = this.props
          e({
            subtaskId: t,
            destructive: !0
          })
        }), r()(this, '_renderErrorDialog', () => {
          const {
            failureMessage: e,
            history: t
          } = this.props
          return o.createElement(v.a, {
            hideBackButton: !0,
            history: t
          }, o.createElement(c.a, {
            confirmButtonLabel: vr,
            headline: yr,
            onConfirm: this._handleAbortFlowOnConfirm,
            text: e || De,
            withCancelButton: !1
          }))
        }), r()(this, '_renderSubtask', e => {
          const {
            addToast: t,
            fetchTemporaryPassword: s,
            flowName: a,
            flowToken: i,
            history: r,
            location: l,
            previousNavigableSubtaskId: d,
            removeContacts: u,
            shouldAbort: h,
            submitFailed: p,
            subtaskInputs: _,
            updateFlow: m
          } = this.props, {
            subtask_id: b,
            progress_indication: g
          } = e, f = h ? o.createElement(c.a, {
            confirmButtonLabel: vr,
            headline: yr,
            onConfirm: this._handleAbortFlowOnConfirm,
            text: this.state.alertFailureMessage,
            withCancelButton: !1
          }) : null, y = {
            onNavigate: this._handleNavigate,
            subtaskId: b,
            updateFlow: m
          }, v = { onBackClick: d ? this._getBackNavigation(e) : void 0 }
          if (e.end_flow) return this._endFlowSubtaskAction(e.end_flow.status, e.end_flow.end_flow_type), this._renderDefault()
          if (e.fetch_temporary_password) {
            return o.createElement(Is, {
              navigationLink: e.fetch_temporary_password.next_link,
              onNavigate: this._handleNavigate,
              subtaskAction: this._handleInvisibleSubtask(b, e.fetch_temporary_password, s),
              subtaskId: b
            })
          }
          if (e.cta) {
            return o.createElement(A, n()({
              errorDialog: f,
              history: r,
              subtask: e.cta,
              subtaskInputs: _
            }, y, v))
          }
          if (e.app_download_cta) {
            return o.createElement(I, n()({
              errorDialog: f,
              history: r,
              subtask: e.app_download_cta,
              subtaskInputs: _
            }, y, v))
          }
          if (e.alert_dialog) {
            return o.createElement(k, n()({
              history: r,
              subtask: e.alert_dialog,
              subtaskInputs: _
            }, y, v))
          }
          if (e.alert_dialog_suppress_client_events) {
            return o.createElement(k, n()({
              history: r,
              subtask: e.alert_dialog_suppress_client_events,
              subtaskInputs: _
            }, y, v))
          }
          if (e.menu_dialog) {
            return o.createElement(Ms, n()({
              subtask: e.menu_dialog,
              subtaskInputs: _
            }, y))
          }
          if (e.open_account) {
            const t = e.open_account
            return this._sendGaOnboardingEvent('account-create'), o.createElement(Is, {
              navigationLink: t.next_link,
              onNavigate: this._handleNavigate,
              subtaskAction: this._openAccountAction,
              subtaskId: b
            })
          }
          return e.sign_up ? o.createElement(zn, n()({
            history: r,
            subtask: e.sign_up,
            subtaskInputs: _
          }, y)) : e.sign_up_review ? o.createElement(Qn, n()({
            errorDialog: f,
            history: r,
            progressIndication: g,
            subtask: e.sign_up_review,
            subtaskInputs: _
          }, y, v)) : e.phone_verification ? o.createElement(la, n()({
            errorDialog: f,
            flowName: a,
            history: r,
            submitFailed: p,
            subtask: e.phone_verification,
            subtaskInputs: _
          }, y, v)) : e.recaptcha ? o.createElement(_s, n()({
            errorDialog: f,
            history: r,
            subtask: e.recaptcha,
            subtaskInputs: _
          }, y, v)) : e.privacy_options ? o.createElement(ua, n()({
            history: r,
            subtask: e.privacy_options,
            subtaskInputs: _
          }, y)) : e.interest_picker ? o.createElement(Us, n()({
            errorDialog: f,
            history: r,
            subtask: e.interest_picker,
            subtaskInputs: _
          }, y)) : e.topics_selector ? o.createElement(Ai, n()({
            errorDialog: f,
            history: r,
            subtask: e.topics_selector,
            subtaskInputs: _
          }, y)) : e.notifications_permission_prompt ? o.createElement(Ks, n()({
            history: r,
            subtask: e.notifications_permission_prompt,
            subtaskInputs: _
          }, y)) : e.open_home_timeline ? ('signup' === a && this._sendGaOnboardingEvent('complete-NUX'), o.createElement(Is, {
            navigationLink: e.open_home_timeline.next_link,
            onNavigate: this._handleNavigate,
            subtaskAction: this._onNoopInvisibleSubtask,
            subtaskId: b
          })) : e.open_link ? o.createElement(Js, {
            flowName: a,
            onNavigate: this._handleNavigate,
            subtask: e.open_link,
            subtaskId: b
          }) : e.upload_media ? o.createElement(ji, {
            flowToken: i,
            onNavigate: this._handleNavigate,
            subtask: e.upload_media,
            subtaskId: b
          }) : e.user_recommendations_list ? o.createElement(pr, n()({
            errorDialog: f,
            history: r,
            subtask: e.user_recommendations_list,
            subtaskInputs: _
          }, y, v)) : e.user_recommendations_urt ? o.createElement(Qi, n()({
            errorDialog: f,
            flowToken: i,
            history: r,
            subtask: e.user_recommendations_urt,
            subtaskInputs: _
          }, y, v)) : e.update_users ? o.createElement(Is, {
            navigationLink: e.update_users.next_link,
            onNavigate: this._handleNavigate,
            subtaskAction: this._handleInvisibleSubtask(b, e.update_users, this._updateUsersAction),
            subtaskId: b
          }) : e.enter_password ? o.createElement(ns, n()({
            errorDialog: f,
            history: r,
            subtask: e.enter_password,
            subtaskInputs: _
          }, y)) : e.settings_list ? o.createElement(fr.a.Consumer, null, ({ isModal: s }) => o.createElement(fn, n()({
            addToast: t,
            errorDialog: f,
            isModal: s,
            removeContacts: u,
            subtask: e.settings_list,
            subtaskInputs: _
          }, y, v))) : e.email_contacts_sync ? o.createElement(xe, n()({
            errorDialog: f,
            history: r,
            location: l,
            subtask: e.email_contacts_sync,
            subtaskInputs: _
          }, y, v)) : e.select_avatar ? o.createElement(Ea, n()({
            errorDialog: f,
            history: r,
            location: l,
            subtask: e.select_avatar,
            subtaskInputs: _
          }, y, v)) : e.select_banner ? o.createElement(Pa, n()({
            errorDialog: f,
            history: r,
            location: l,
            subtask: e.select_banner,
            subtaskInputs: _
          }, y, v)) : e.enter_text ? o.createElement(ms, n()({
            errorDialog: f,
            history: r,
            subtask: e.enter_text,
            subtaskInputs: _
          }, y, v)) : e.email_verification ? o.createElement(Ue, n()({
            errorDialog: f,
            flowName: a,
            history: r,
            submitFailed: p,
            subtask: e.email_verification,
            subtaskInputs: _
          }, y, v)) : e.enter_username ? o.createElement(Es, n()({
            errorDialog: f,
            history: r,
            subtask: e.enter_username,
            subtaskInputs: _
          }, y, v)) : e.enter_email ? o.createElement(Nt, n()({
            errorDialog: f,
            history: r,
            subtask: e.enter_email,
            subtaskInputs: _
          }, y, v)) : e.enter_phone ? o.createElement(us, n()({
            errorDialog: f,
            history: r,
            subtask: e.enter_phone,
            subtaskInputs: _
          }, y, v)) : e.choice_selection ? o.createElement(N, n()({
            history: r,
            subtask: e.choice_selection,
            subtaskInputs: _
          }, y, v)) : e.contacts_live_sync_permission_prompt ? o.createElement(de, n()({
            history: r,
            subtask: e.contacts_live_sync_permission_prompt,
            subtaskInputs: _
          }, y, v)) : e.wait_spinner ? o.createElement(br, {
            history: r,
            onNavigate: this._handleNavigate,
            subtask: e.wait_spinner,
            subtaskId: b
          }) : this._renderDefault()
        }), r()(this, '_getBackNavigation', e => {
          const { subtask_back_navigation: t } = e
          return t && t !== h.n.Allow ? void 0 : this._navigateToPreviousSubtask
        }), r()(this, '_scribeSubtaskView', () => {
          const {
            currentSubtask: e,
            scribeAction: t,
            flowToken: s
          } = this.props
          if (e && e.subtask_id && !Object(u.i)(e)) {
            t(Object.assign({}, kr, {
              element: 'view',
              action: 'impression'
            }), {
              items: [ {
                token: s,
                name: e.subtask_id
              } ]
            })
          }
        }), r()(this, '_openAccountAction', () => {
          const {
            scribeAction: e,
            verifyCredentials: t
          } = this.props, {
            encryptedReferer: s,
            encryptedReferralDetails: a
          } = Object(ea.d)() || {}
          return t().then(() => {
            this._maybeScribeAppInstallBanner(), e({
              page: 'signup',
              action: 'success'
            }, {
              referer: s,
              external_referer: a
            })
          })
        }), r()(this, '_updateUsersAction', (e, t) => {
          const {
            createLocalApiErrorHandler: s,
            fetchUsers: a
          } = this.props, n = null == t ? void 0 : t.users
          n && n.length && a(n.map(e => e.id_str)).catch(s({ showToast: !0 }))
        }), r()(this, '_maybeScribeAppInstallBanner', () => {
          const { scribeAction: e } = this.props
          S.a.hasPromptWaiting() && e({
            page: 'signup',
            component: 'install_banner',
            action: 'waiting'
          })
        }), this.state = { alertFailureMessage: '' }
      }

      UNSAFE_componentWillReceiveProps(e) {
        this.props.flowName !== e.flowName && this._startFlow(e)
      }

      componentDidUpdate(e) {
        const { currentSubtask: t } = e, { currentSubtask: s } = this.props, a = t && t.subtask_id
        s && s.subtask_id !== a && this._scribeSubtaskView()
      }

      UNSAFE_componentWillMount() {
        this._startFlow(this.props)
      }

      componentDidMount() {
        const {
          googleAnalyticsPageView: e,
          history: t,
          scribePageImpression: s
        } = this.props
        s(kr), e(kr), this._unblockHistory = t.block(this._handleBackAttempt)
      }

      componentWillUnmount() {
        this._unblockHistory && this._unblockHistory(), this.props.clearFlow()
      }

      render() {
        const {
          currentSubtask: e,
          shouldEndFlow: t
        } = this.props
        t && this._handleAbortFlow()
        let s = this.props.fetchStatus
        return s === me.a.FAILED || e || (s = me.a.LOADING), o.createElement(w.a, { style: Cr.root }, o.createElement(be.a, {
          fetchStatus: s,
          onRequestRetry: this._handleFlowRestart,
          render: this._render,
          renderFailure: this._renderErrorDialog,
          retryable: !this.props.shouldAbort
        }))
      }

      _handleInvisibleSubtask(e, t, s) {
        return () => new Promise((a, n) => {
          a(s(e, t))
        })
      }

      get currentPreviousNavigableSubtaskId() {
        return this.props.previousNavigableSubtaskId
      }
    }

    r()(wr, 'defaultProps', { inputFlowData: {} })
    const Cr = T.a.create(e => ({
      root: {
        backgroundColor: e.colors.cellBackground,
        flexGrow: 1,
        flexShrink: 1
      }
    }))
    t.default = Object(ne.c)(kr)(ae(wr))
  },
  'i+/A': function (e, t, s) {
    'use strict';
    (function (t, a) {
      var n = s('JfD+').Buffer, i = t.crypto || t.msCrypto
      i && i.getRandomValues ? e.exports = function (e, t) {
        if (e > 4294967295) throw new RangeError('requested too many random bytes')
        var s = n.allocUnsafe(e)
        if (e > 0) if (e > 65536) for (var r = 0; r < e; r += 65536) i.getRandomValues(s.slice(r, r + 65536)) else i.getRandomValues(s)
        if ('function' == typeof t) {
          return a.nextTick((function () {
            t(null, s)
          }))
        }
        return s
      } : e.exports = function () {
        throw new Error('Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11')
      }
    }).call(this, s('fRV1'), s('F63i'))
  },
  nS1w: function (e, t, s) {
    'use strict'
    s.d(t, 'c', (function () {
      return h
    })), s.d(t, 'd', (function () {
      return p
    })), s.d(t, 'b', (function () {
      return m
    })), s.d(t, 'e', (function () {
      return b
    }))
    s('wFPu')
    var a = s('3XMw'), n = s.n(a), i = s('mtvn')
    const r = {
        1: {
          label: n.a.hac89abf,
          numDays: 31
        },
        2: {
          label: n.a.ef30b309,
          numDays: 28,
          numDaysLeapYear: 29
        },
        3: {
          label: n.a.b56920fa,
          numDays: 31
        },
        4: {
          label: n.a.b1a0f1ec,
          numDays: 30
        },
        5: {
          label: n.a.daf779c8,
          numDays: 31
        },
        6: {
          label: n.a.c6ad074d,
          numDays: 30
        },
        7: {
          label: n.a.f1db106b,
          numDays: 31
        },
        8: {
          label: n.a.i4e80b7a,
          numDays: 31
        },
        9: {
          label: n.a.efa6cc1d,
          numDays: 30
        },
        10: {
          label: n.a.f40a0cbe,
          numDays: 31
        },
        11: {
          label: n.a.ac74a31c,
          numDays: 30
        },
        12: {
          label: n.a.i6c1e4b2,
          numDays: 31
        }
      }, o = e => ({
        label: '' + e,
        value: '' + e
      }), l = Object(i.a)(1, 29).map(o), c = Object(i.a)(1, 30).map(o), d = Object(i.a)(1, 31).map(o), u = Object(i.a)(1, 32).map(o),
      h = () => Object.keys(r).map(e => ({
        label: r[e].label,
        value: e
      })), p = (e = 1, t, s, a) => {
        const n = t || new Date(Date.now()).getFullYear()
        return Object(i.a)(e, n + 1).reverse().filter(e => 2 === a && 29 === s ? _(e) : e).map(o)
      }, _ = e => 1 === new Date(e, 1, 29).getMonth(), m = (e, t) => {
        if (!e) return u
        switch (2 === e && (!t || t && _(t)) ? r[e].numDaysLeapYear : r[e].numDays) {
          case 28:
            return l
          case 29:
            return c;
          case 30:
            return d;
          case 31:
          default:
            return u
        }
      }, b = (e, t, s) => {
        if ("number" == typeof e && "number" == typeof t && "number" == typeof s) {
          return `${s}-${t < 10 ? "0" + t : "" + t}-${e < 10 ? "0" + e : "" + e}`
        }
        return ""
      };
    t.a = { getFormattedDateValue: b }
  },
  yuM6: function (e, t, s) {
    "use strict";
    s.r(t), s.d(t, "default", (function () {
      return i
    }));
    var a = s("ERkP"), n = s("6/RC");

    class i extends a.Component {
      componentDidMount() {
        const {
          code: e,
          error: t,
          scope: s,
          state: a
        } = this.props.location.query, i = {
          callback_url: `https://${window.location.hostname}${window.location.pathname}`,
          code: e,
          error: t,
          scope: s,
          state: a
        }, r = n.canUseDOM && window.opener;
        r ? (r.postMessage(i, "https://" + window.location.hostname), window.close(), r.focus()) : this.props.history.push("/")
      }

      render() {
        return null
      }
    }
  }
} ]);
//# sourceMappingURL=https://ton.twitter.com/responsive-web-internal/sourcemaps/client-web/bundle.Ocf.71d4f865.js.map
