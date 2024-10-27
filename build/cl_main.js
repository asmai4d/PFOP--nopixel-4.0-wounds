(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/crypto-js/core.js
  var require_core = __commonJS({
    "../node_modules/crypto-js/core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.CryptoJS = factory();
        }
      })(exports, function() {
        var CryptoJS3 = CryptoJS3 || function(Math1, undefined2) {
          var create = Object.create || /* @__PURE__ */ function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = /* @__PURE__ */ function() {
            return {
              /**
              * Creates a new object that inherits from this object.
              *
              * @param {Object} overrides Properties to copy into the new object.
              *
              * @return {Object} The new object.
              *
              * @static
              *
              * @example
              *
              *     var MyType = CryptoJS.lib.Base.extend({
              *         field: 'value',
              *
              *         method: function () {
              *         }
              *     });
              */
              extend: function extend(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
              * Extends this object and runs the init method.
              * Arguments to create() will be passed to init().
              *
              * @return {Object} The new object.
              *
              * @static
              *
              * @example
              *
              *     var instance = MyType.create();
              */
              create: function create2() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
              * Initializes a newly created object.
              * Override this method to add some logic when your objects are created.
              *
              * @example
              *
              *     var MyType = CryptoJS.lib.Base.extend({
              *         init: function () {
              *             // ...
              *         }
              *     });
              */
              init: function init4() {
              },
              /**
              * Copies properties into this object.
              *
              * @param {Object} properties The properties to mix in.
              *
              * @example
              *
              *     MyType.mixIn({
              *         field: 'value'
              *     });
              */
              mixIn: function mixIn(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
              * Creates a copy of this object.
              *
              * @return {Object} The clone.
              *
              * @example
              *
              *     var clone = instance.clone();
              */
              clone: function clone() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
            * Initializes a newly created word array.
            *
            * @param {Array} words (Optional) An array of 32-bit words.
            * @param {number} sigBytes (Optional) The number of significant bytes in the words.
            *
            * @example
            *
            *     var wordArray = CryptoJS.lib.WordArray.create();
            *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
            *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
            */
            init: function init4(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
            * Converts this word array to a string.
            *
            * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
            *
            * @return {string} The stringified word array.
            *
            * @example
            *
            *     var string = wordArray + '';
            *     var string = wordArray.toString();
            *     var string = wordArray.toString(CryptoJS.enc.Utf8);
            */
            toString: function toString2(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
            * Concatenates a word array to this word array.
            *
            * @param {WordArray} wordArray The word array to append.
            *
            * @return {WordArray} This word array.
            *
            * @example
            *
            *     wordArray1.concat(wordArray2);
            */
            concat: function concat(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var i = 0; i < thatSigBytes; i += 4) {
                  thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
            * Removes insignificant bits.
            *
            * @example
            *
            *     wordArray.clamp();
            */
            clamp: function clamp2() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math1.ceil(sigBytes / 4);
            },
            /**
            * Creates a copy of this word array.
            *
            * @return {WordArray} The clone.
            *
            * @example
            *
            *     var clone = wordArray.clone();
            */
            clone: function clone() {
              var clone2 = Base.clone.call(this);
              clone2.words = this.words.slice(0);
              return clone2;
            },
            /**
            * Creates a word array filled with random bytes.
            *
            * @param {number} nBytes The number of random bytes to generate.
            *
            * @return {WordArray} The random word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.lib.WordArray.random(16);
            */
            random: function random(nBytes) {
              var words = [];
              var r = function r2(m_w) {
                var m_w = m_w;
                var m_z = 987654321;
                var mask = 4294967295;
                return function() {
                  m_z = 36969 * (m_z & 65535) + (m_z >> 16) & mask;
                  m_w = 18e3 * (m_w & 65535) + (m_w >> 16) & mask;
                  var result = (m_z << 16) + m_w & mask;
                  result /= 4294967296;
                  result += 0.5;
                  return result * (Math1.random() > 0.5 ? 1 : -1);
                };
              };
              for (var i = 0, rcache; i < nBytes; i += 4) {
                var _r = r((rcache || Math1.random()) * 4294967296);
                rcache = _r() * 987654071;
                words.push(_r() * 4294967296 | 0);
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
            * Converts a word array to a hex string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The hex string.
            *
            * @static
            *
            * @example
            *
            *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
            * Converts a hex string to a word array.
            *
            * @param {string} hexStr The hex string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
            */
            parse: function parse2(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
            * Converts a word array to a Latin1 string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The Latin1 string.
            *
            * @static
            *
            * @example
            *
            *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
            * Converts a Latin1 string to a word array.
            *
            * @param {string} latin1Str The Latin1 string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
            */
            parse: function parse2(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
            * Converts a word array to a UTF-8 string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The UTF-8 string.
            *
            * @static
            *
            * @example
            *
            *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
            * Converts a UTF-8 string to a word array.
            *
            * @param {string} utf8Str The UTF-8 string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
            */
            parse: function parse2(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
            * Resets this block algorithm's data buffer to its initial state.
            *
            * @example
            *
            *     bufferedBlockAlgorithm.reset();
            */
            reset: function reset() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
            * Adds new data to this block algorithm's buffer.
            *
            * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
            *
            * @example
            *
            *     bufferedBlockAlgorithm._append('data');
            *     bufferedBlockAlgorithm._append(wordArray);
            */
            _append: function _append(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
            * Processes available data blocks.
            *
            * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
            *
            * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
            *
            * @return {WordArray} The processed data.
            *
            * @example
            *
            *     var processedData = bufferedBlockAlgorithm._process();
            *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
            */
            _process: function _process(doFlush) {
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math1.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math1.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math1.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
            * Creates a copy of this object.
            *
            * @return {Object} The clone.
            *
            * @example
            *
            *     var clone = bufferedBlockAlgorithm.clone();
            */
            clone: function clone() {
              var clone2 = Base.clone.call(this);
              clone2._data = this._data.clone();
              return clone2;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
            * Configuration options.
            */
            cfg: Base.extend(),
            /**
            * Initializes a newly created hasher.
            *
            * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
            *
            * @example
            *
            *     var hasher = CryptoJS.algo.SHA256.create();
            */
            init: function init4(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
            * Resets this hasher to its initial state.
            *
            * @example
            *
            *     hasher.reset();
            */
            reset: function reset() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
            * Updates this hasher with a message.
            *
            * @param {WordArray|string} messageUpdate The message to append.
            *
            * @return {Hasher} This hasher.
            *
            * @example
            *
            *     hasher.update('message');
            *     hasher.update(wordArray);
            */
            update: function update(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
            * Finalizes the hash computation.
            * Note that the finalize operation is effectively a destructive, read-once operation.
            *
            * @param {WordArray|string} messageUpdate (Optional) A final message update.
            *
            * @return {WordArray} The hash.
            *
            * @example
            *
            *     var hash = hasher.finalize();
            *     var hash = hasher.finalize('message');
            *     var hash = hasher.finalize(wordArray);
            */
            finalize: function finalize(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
            * Creates a shortcut function to a hasher's object interface.
            *
            * @param {Hasher} hasher The hasher to create a helper for.
            *
            * @return {Function} The shortcut function.
            *
            * @static
            *
            * @example
            *
            *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
            */
            _createHelper: function _createHelper(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
            * Creates a shortcut function to the HMAC's object interface.
            *
            * @param {Hasher} hasher The hasher to use in this HMAC helper.
            *
            * @return {Function} The shortcut function.
            *
            * @static
            *
            * @example
            *
            *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
            */
            _createHmacHelper: function _createHmacHelper(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS3;
      });
    }
  });

  // ../node_modules/crypto-js/x64-core.js
  var require_x64_core = __commonJS({
    "../node_modules/crypto-js/x64-core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(undefined2) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          var X64Word = C_x64.Word = Base.extend({
            /**
            * Initializes a newly created 64-bit word.
            *
            * @param {number} high The high 32 bits.
            * @param {number} low The low 32 bits.
            *
            * @example
            *
            *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
            */
            init: function init4(high, low) {
              this.high = high;
              this.low = low;
            }
          });
          var X64WordArray = C_x64.WordArray = Base.extend({
            /**
            * Initializes a newly created word array.
            *
            * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
            * @param {number} sigBytes (Optional) The number of significant bytes in the words.
            *
            * @example
            *
            *     var wordArray = CryptoJS.x64.WordArray.create();
            *
            *     var wordArray = CryptoJS.x64.WordArray.create([
            *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
            *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
            *     ]);
            *
            *     var wordArray = CryptoJS.x64.WordArray.create([
            *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
            *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
            *     ], 10);
            */
            init: function init4(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
            * Converts this 64-bit word array to a 32-bit word array.
            *
            * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
            *
            * @example
            *
            *     var x32WordArray = x64WordArray.toX32();
            */
            toX32: function toX32() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
            * Creates a copy of this word array.
            *
            * @return {X64WordArray} The clone.
            *
            * @example
            *
            *     var clone = x64WordArray.clone();
            */
            clone: function clone() {
              var clone2 = Base.clone.call(this);
              var words = clone2.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone2;
            }
          });
        })();
        return CryptoJS3;
      });
    }
  });

  // ../node_modules/crypto-js/lib-typedarrays.js
  var require_lib_typedarrays = __commonJS({
    "../node_modules/crypto-js/lib-typedarrays.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function subInit2(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS3.lib.WordArray;
      });
    }
  });

  // ../node_modules/crypto-js/enc-utf16.js
  var require_enc_utf16 = __commonJS({
    "../node_modules/crypto-js/enc-utf16.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
            /**
            * Converts a word array to a UTF-16 BE string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The UTF-16 BE string.
            *
            * @static
            *
            * @example
            *
            *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
            * Converts a UTF-16 BE string to a word array.
            *
            * @param {string} utf16Str The UTF-16 BE string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
            */
            parse: function parse2(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
            * Converts a word array to a UTF-16 LE string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The UTF-16 LE string.
            *
            * @static
            *
            * @example
            *
            *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
            * Converts a UTF-16 LE string to a word array.
            *
            * @param {string} utf16Str The UTF-16 LE string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
            */
            parse: function parse2(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS3.enc.Utf16;
      });
    }
  });

  // ../node_modules/crypto-js/enc-base64.js
  var require_enc_base64 = __commonJS({
    "../node_modules/crypto-js/enc-base64.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base64 = C_enc.Base64 = {
            /**
            * Converts a word array to a Base64 string.
            *
            * @param {WordArray} wordArray The word array.
            *
            * @return {string} The Base64 string.
            *
            * @static
            *
            * @example
            *
            *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
            */
            stringify: function stringify(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
            * Converts a Base64 string to a word array.
            *
            * @param {string} base64Str The Base64 string.
            *
            * @return {WordArray} The word array.
            *
            * @static
            *
            * @example
            *
            *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
            */
            parse: function parse2(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS3.enc.Base64;
      });
    }
  });

  // ../node_modules/crypto-js/md5.js
  var require_md5 = __commonJS({
    "../node_modules/crypto-js/md5.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(Math1) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math1.abs(Math1.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function _doReset() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M[offset + 0];
              var M_offset_1 = M[offset + 1];
              var M_offset_2 = M[offset + 2];
              var M_offset_3 = M[offset + 3];
              var M_offset_4 = M[offset + 4];
              var M_offset_5 = M[offset + 5];
              var M_offset_6 = M[offset + 6];
              var M_offset_7 = M[offset + 7];
              var M_offset_8 = M[offset + 8];
              var M_offset_9 = M[offset + 9];
              var M_offset_10 = M[offset + 10];
              var M_offset_11 = M[offset + 11];
              var M_offset_12 = M[offset + 12];
              var M_offset_13 = M[offset + 13];
              var M_offset_14 = M[offset + 14];
              var M_offset_15 = M[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math1.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS3.MD5;
      });
    }
  });

  // ../node_modules/crypto-js/sha1.js
  var require_sha1 = __commonJS({
    "../node_modules/crypto-js/sha1.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function _doReset() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS3.SHA1;
      });
    }
  });

  // ../node_modules/crypto-js/sha256.js
  var require_sha256 = __commonJS({
    "../node_modules/crypto-js/sha256.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(Math1) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math1.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math1.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math1.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function _doReset() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f2 = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f2 ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f2;
                f2 = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f2 | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math1.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS3.SHA256;
      });
    }
  });

  // ../node_modules/crypto-js/sha224.js
  var require_sha224 = __commonJS({
    "../node_modules/crypto-js/sha224.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./sha256"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function _doReset() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function _doFinalize() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS3.SHA224;
      });
    }
  });

  // ../node_modules/crypto-js/sha512.js
  var require_sha512 = __commonJS({
    "../node_modules/crypto-js/sha512.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./x64-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function _doReset() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wi = W[i];
                if (i < 16) {
                  var Wih = Wi.high = M[offset + i * 2] | 0;
                  var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  var Wil = gamma0l + Wi7l;
                  var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  var Wil = Wil + gamma1l;
                  var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  var Wil = Wil + Wi16l;
                  var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS3.SHA512;
      });
    }
  });

  // ../node_modules/crypto-js/sha384.js
  var require_sha384 = __commonJS({
    "../node_modules/crypto-js/sha384.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./x64-core",
            "./sha512"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function _doReset() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function _doFinalize() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS3.SHA384;
      });
    }
  });

  // ../node_modules/crypto-js/sha3.js
  var require_sha3 = __commonJS({
    "../node_modules/crypto-js/sha3.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./x64-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(Math1) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x = 1, y = 0;
            for (var t = 0; t < 24; t++) {
              RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
              var newX = y % 5;
              var newY = (2 * x + 3 * y) % 5;
              x = newX;
              y = newY;
            }
            for (var x = 0; x < 5; x++) {
              for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i = 0; i < 24; i++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j = 0; j < 7; j++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T = [];
          (function() {
            for (var i = 0; i < 25; i++) {
              T[i] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
            * Configuration options.
            *
            * @property {number} outputLength
            *   The desired number of bits in the output hash.
            *   Only values permitted are: 224, 256, 384, 512.
            *   Default: 512
            */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function _doReset() {
              var state = this._state = [];
              for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i = 0; i < nBlockSizeLanes; i++) {
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x = 0; x < 5; x++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T[x];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                  var Tx4 = T[(x + 4) % 5];
                  var Tx1 = T[(x + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y = 0; y < 5; y++) {
                    var lane = state[x + 5 * y];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x = 0; x < 5; x++) {
                  for (var y = 0; y < 5; y++) {
                    var laneIndex = x + 5 * y;
                    var lane = state[laneIndex];
                    var TLane = T[laneIndex];
                    var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                    var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math1.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i = 0; i < outputLengthLanes; i++) {
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              var state = clone2._state = this._state.slice(0);
              for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
              }
              return clone2;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS3.SHA3;
      });
    }
  });

  // ../node_modules/crypto-js/ripemd160.js
  var require_ripemd160 = __commonJS({
    "../node_modules/crypto-js/ripemd160.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(Math1) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([
            0,
            1518500249,
            1859775393,
            2400959708,
            2840853838
          ]);
          var _hr = WordArray.create([
            1352829926,
            1548603684,
            1836072691,
            2053994217,
            0
          ]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function _doReset() {
              this._hash = WordArray.create([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function _doFinalize() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H = hash.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function clone() {
              var clone2 = Hasher.clone.call(this);
              clone2._hash = this._hash.clone();
              return clone2;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })(Math);
        return CryptoJS3.RIPEMD160;
      });
    }
  });

  // ../node_modules/crypto-js/hmac.js
  var require_hmac = __commonJS({
    "../node_modules/crypto-js/hmac.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          var HMAC = C_algo.HMAC = Base.extend({
            /**
            * Initializes a newly created HMAC.
            *
            * @param {Hasher} hasher The hash algorithm to use.
            * @param {WordArray|string} key The secret key.
            *
            * @example
            *
            *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
            */
            init: function init4(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
            * Resets this HMAC to its initial state.
            *
            * @example
            *
            *     hmacHasher.reset();
            */
            reset: function reset() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
            * Updates this HMAC with a message.
            *
            * @param {WordArray|string} messageUpdate The message to append.
            *
            * @return {HMAC} This HMAC instance.
            *
            * @example
            *
            *     hmacHasher.update('message');
            *     hmacHasher.update(wordArray);
            */
            update: function update(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
            * Finalizes the HMAC computation.
            * Note that the finalize operation is effectively a destructive, read-once operation.
            *
            * @param {WordArray|string} messageUpdate (Optional) A final message update.
            *
            * @return {WordArray} The HMAC.
            *
            * @example
            *
            *     var hmac = hmacHasher.finalize();
            *     var hmac = hmacHasher.finalize('message');
            *     var hmac = hmacHasher.finalize(wordArray);
            */
            finalize: function finalize(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac;
            }
          });
        })();
      });
    }
  });

  // ../node_modules/crypto-js/pbkdf2.js
  var require_pbkdf2 = __commonJS({
    "../node_modules/crypto-js/pbkdf2.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./sha1",
            "./hmac"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA1 = C_algo.SHA1;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
            * Configuration options.
            *
            * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
            * @property {Hasher} hasher The hasher to use. Default: SHA1
            * @property {number} iterations The number of iterations to perform. Default: 1
            */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA1,
              iterations: 1
            }),
            /**
            * Initializes a newly created key derivation function.
            *
            * @param {Object} cfg (Optional) The configuration options to use for the derivation.
            *
            * @example
            *
            *     var kdf = CryptoJS.algo.PBKDF2.create();
            *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
            *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
            */
            init: function init4(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
            * Computes the Password-Based Key Derivation Function 2.
            *
            * @param {WordArray|string} password The password.
            * @param {WordArray|string} salt A salt.
            *
            * @return {WordArray} The derived key.
            *
            * @example
            *
            *     var key = kdf.compute(password, salt);
            */
            compute: function compute(password, salt) {
              var cfg = this.cfg;
              var hmac = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([
                1
              ]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac.update(salt).finalize(blockIndex);
                hmac.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                  intermediate = hmac.finalize(intermediate);
                  hmac.reset();
                  var intermediateWords = intermediate.words;
                  for (var j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS3.PBKDF2;
      });
    }
  });

  // ../node_modules/crypto-js/evpkdf.js
  var require_evpkdf = __commonJS({
    "../node_modules/crypto-js/evpkdf.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./sha1",
            "./hmac"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
            * Configuration options.
            *
            * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
            * @property {Hasher} hasher The hash algorithm to use. Default: MD5
            * @property {number} iterations The number of iterations to perform. Default: 1
            */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
            * Initializes a newly created key derivation function.
            *
            * @param {Object} cfg (Optional) The configuration options to use for the derivation.
            *
            * @example
            *
            *     var kdf = CryptoJS.algo.EvpKDF.create();
            *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
            *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
            */
            init: function init4(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
            * Derives a key from a password.
            *
            * @param {WordArray|string} password The password.
            * @param {WordArray|string} salt A salt.
            *
            * @return {WordArray} The derived key.
            *
            * @example
            *
            *     var key = kdf.compute(password, salt);
            */
            compute: function compute(password, salt) {
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                var block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS3.EvpKDF;
      });
    }
  });

  // ../node_modules/crypto-js/cipher-core.js
  var require_cipher_core = __commonJS({
    "../node_modules/crypto-js/cipher-core.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_evpkdf());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./evpkdf"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.lib.Cipher || function(undefined2) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
            * Configuration options.
            *
            * @property {WordArray} iv The IV to use for this operation.
            */
            cfg: Base.extend(),
            /**
            * Creates this cipher in encryption mode.
            *
            * @param {WordArray} key The key.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {Cipher} A cipher instance.
            *
            * @static
            *
            * @example
            *
            *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
            */
            createEncryptor: function createEncryptor(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
            * Creates this cipher in decryption mode.
            *
            * @param {WordArray} key The key.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {Cipher} A cipher instance.
            *
            * @static
            *
            * @example
            *
            *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
            */
            createDecryptor: function createDecryptor(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
            * Initializes a newly created cipher.
            *
            * @param {number} xformMode Either the encryption or decryption transormation mode constant.
            * @param {WordArray} key The key.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @example
            *
            *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
            */
            init: function init4(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
            * Resets this cipher to its initial state.
            *
            * @example
            *
            *     cipher.reset();
            */
            reset: function reset() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
            * Adds data to be encrypted or decrypted.
            *
            * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
            *
            * @return {WordArray} The data after processing.
            *
            * @example
            *
            *     var encrypted = cipher.process('data');
            *     var encrypted = cipher.process(wordArray);
            */
            process: function process(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
            * Finalizes the encryption or decryption process.
            * Note that the finalize operation is effectively a destructive, read-once operation.
            *
            * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
            *
            * @return {WordArray} The data after final processing.
            *
            * @example
            *
            *     var encrypted = cipher.finalize();
            *     var encrypted = cipher.finalize('data');
            *     var encrypted = cipher.finalize(wordArray);
            */
            finalize: function finalize(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
            * Creates shortcut functions to a cipher's object interface.
            *
            * @param {Cipher} cipher The cipher to create a helper for.
            *
            * @return {Object} An object with encrypt and decrypt shortcut functions.
            *
            * @static
            *
            * @example
            *
            *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
            */
            _createHelper: /* @__PURE__ */ function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function encrypt(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function decrypt(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function _doFinalize() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
            * Creates this mode for encryption.
            *
            * @param {Cipher} cipher A block cipher instance.
            * @param {Array} iv The IV words.
            *
            * @static
            *
            * @example
            *
            *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
            */
            createEncryptor: function createEncryptor(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
            * Creates this mode for decryption.
            *
            * @param {Cipher} cipher A block cipher instance.
            * @param {Array} iv The IV words.
            *
            * @static
            *
            * @example
            *
            *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
            */
            createDecryptor: function createDecryptor(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
            * Initializes a newly created mode.
            *
            * @param {Cipher} cipher A block cipher instance.
            * @param {Array} iv The IV words.
            *
            * @example
            *
            *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
            */
            init: function init4(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
              * Processes the data block at offset.
              *
              * @param {Array} words The data words to operate on.
              * @param {number} offset The offset where the block starts.
              *
              * @example
              *
              *     mode.processBlock(data.words, offset);
              */
              processBlock: function processBlock(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
              * Processes the data block at offset.
              *
              * @param {Array} words The data words to operate on.
              * @param {number} offset The offset where the block starts.
              *
              * @example
              *
              *     mode.processBlock(data.words, offset);
              */
              processBlock: function processBlock(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var iv = this._iv;
              if (iv) {
                var block = iv;
                this._iv = undefined2;
              } else {
                var block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC2;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
            * Pads data using the algorithm defined in PKCS #5/7.
            *
            * @param {WordArray} data The data to pad.
            * @param {number} blockSize The multiple that the data should be padded to.
            *
            * @static
            *
            * @example
            *
            *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
            */
            pad: function pad(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
            * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
            *
            * @param {WordArray} data The data to unpad.
            *
            * @static
            *
            * @example
            *
            *     CryptoJS.pad.Pkcs7.unpad(wordArray);
            */
            unpad: function unpad(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            /**
            * Configuration options.
            *
            * @property {Mode} mode The block mode to use. Default: CBC
            * @property {Padding} padding The padding strategy to use. Default: Pkcs7
            */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function reset() {
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                var modeCreator = mode.createEncryptor;
              } else {
                var modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function _doProcessBlock(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function _doFinalize() {
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                var finalProcessedBlocks = this._process(true);
              } else {
                var finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
            * Initializes a newly created cipher params object.
            *
            * @param {Object} cipherParams An object with any of the possible cipher parameters.
            *
            * @example
            *
            *     var cipherParams = CryptoJS.lib.CipherParams.create({
            *         ciphertext: ciphertextWordArray,
            *         key: keyWordArray,
            *         iv: ivWordArray,
            *         salt: saltWordArray,
            *         algorithm: CryptoJS.algo.AES,
            *         mode: CryptoJS.mode.CBC,
            *         padding: CryptoJS.pad.PKCS7,
            *         blockSize: 4,
            *         formatter: CryptoJS.format.OpenSSL
            *     });
            */
            init: function init4(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
            * Converts this cipher params object to a string.
            *
            * @param {Format} formatter (Optional) The formatting strategy to use.
            *
            * @return {string} The stringified cipher params.
            *
            * @throws Error If neither the formatter nor the default formatter is set.
            *
            * @example
            *
            *     var string = cipherParams + '';
            *     var string = cipherParams.toString();
            *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
            */
            toString: function toString2(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
            * Converts a cipher params object to an OpenSSL-compatible string.
            *
            * @param {CipherParams} cipherParams The cipher params object.
            *
            * @return {string} The OpenSSL-compatible string.
            *
            * @static
            *
            * @example
            *
            *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
            */
            stringify: function stringify(cipherParams) {
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                var wordArray = WordArray.create([
                  1398893684,
                  1701076831
                ]).concat(salt).concat(ciphertext);
              } else {
                var wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            /**
            * Converts an OpenSSL-compatible string to a cipher params object.
            *
            * @param {string} openSSLStr The OpenSSL-compatible string.
            *
            * @return {CipherParams} The cipher params object.
            *
            * @static
            *
            * @example
            *
            *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
            */
            parse: function parse2(openSSLStr) {
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                var salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({
                ciphertext,
                salt
              });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
            * Configuration options.
            *
            * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
            */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
            * Encrypts a message.
            *
            * @param {Cipher} cipher The cipher algorithm to use.
            * @param {WordArray|string} message The message to encrypt.
            * @param {WordArray} key The key.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {CipherParams} A cipher params object.
            *
            * @static
            *
            * @example
            *
            *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
            *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
            *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
            */
            encrypt: function encrypt(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
            * Decrypts serialized ciphertext.
            *
            * @param {Cipher} cipher The cipher algorithm to use.
            * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
            * @param {WordArray} key The key.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {WordArray} The plaintext.
            *
            * @static
            *
            * @example
            *
            *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
            *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
            */
            decrypt: function decrypt(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
            * Converts serialized ciphertext to CipherParams,
            * else assumed CipherParams already and returns ciphertext unchanged.
            *
            * @param {CipherParams|string} ciphertext The ciphertext.
            * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
            *
            * @return {CipherParams} The unserialized ciphertext.
            *
            * @static
            *
            * @example
            *
            *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
            */
            _parse: function _parse(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
            * Derives a key and IV from a password.
            *
            * @param {string} password The password to derive from.
            * @param {number} keySize The size in words of the key to generate.
            * @param {number} ivSize The size in words of the IV to generate.
            * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
            *
            * @return {CipherParams} A cipher params object with the key, IV, and salt.
            *
            * @static
            *
            * @example
            *
            *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
            *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
            */
            execute: function execute(password, keySize, ivSize, salt) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              var key = EvpKDF.create({
                keySize: keySize + ivSize
              }).compute(password, salt);
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({
                key,
                iv,
                salt
              });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
            * Configuration options.
            *
            * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
            */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
            * Encrypts a message using a password.
            *
            * @param {Cipher} cipher The cipher algorithm to use.
            * @param {WordArray|string} message The message to encrypt.
            * @param {string} password The password.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {CipherParams} A cipher params object.
            *
            * @static
            *
            * @example
            *
            *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
            *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
            */
            encrypt: function encrypt(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
            * Decrypts serialized ciphertext using a password.
            *
            * @param {Cipher} cipher The cipher algorithm to use.
            * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
            * @param {string} password The password.
            * @param {Object} cfg (Optional) The configuration options to use for this operation.
            *
            * @return {WordArray} The plaintext.
            *
            * @static
            *
            * @example
            *
            *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
            *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
            */
            decrypt: function decrypt(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    }
  });

  // ../node_modules/crypto-js/mode-cfb.js
  var require_mode_cfb = __commonJS({
    "../node_modules/crypto-js/mode-cfb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.mode.CFB = function() {
          var CFB = CryptoJS3.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var iv = this._iv;
            if (iv) {
              var keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              var keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
              words[offset + i] ^= keystream[i];
            }
          }
          return CFB;
        }();
        return CryptoJS3.mode.CFB;
      });
    }
  });

  // ../node_modules/crypto-js/mode-ctr.js
  var require_mode_ctr = __commonJS({
    "../node_modules/crypto-js/mode-ctr.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.mode.CTR = function() {
          var CTR = CryptoJS3.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS3.mode.CTR;
      });
    }
  });

  // ../node_modules/crypto-js/mode-ctr-gladman.js
  var require_mode_ctr_gladman = __commonJS({
    "../node_modules/crypto-js/mode-ctr-gladman.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS3.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS3.mode.CTRGladman;
      });
    }
  });

  // ../node_modules/crypto-js/mode-ofb.js
  var require_mode_ofb = __commonJS({
    "../node_modules/crypto-js/mode-ofb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.mode.OFB = function() {
          var OFB = CryptoJS3.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function processBlock(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS3.mode.OFB;
      });
    }
  });

  // ../node_modules/crypto-js/mode-ecb.js
  var require_mode_ecb = __commonJS({
    "../node_modules/crypto-js/mode-ecb.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.mode.ECB = function() {
          var ECB = CryptoJS3.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function processBlock(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function processBlock(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS3.mode.ECB;
      });
    }
  });

  // ../node_modules/crypto-js/pad-ansix923.js
  var require_pad_ansix923 = __commonJS({
    "../node_modules/crypto-js/pad-ansix923.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.pad.AnsiX923 = {
          pad: function pad(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function unpad(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS3.pad.Ansix923;
      });
    }
  });

  // ../node_modules/crypto-js/pad-iso10126.js
  var require_pad_iso10126 = __commonJS({
    "../node_modules/crypto-js/pad-iso10126.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.pad.Iso10126 = {
          pad: function pad(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS3.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS3.lib.WordArray.create([
              nPaddingBytes << 24
            ], 1));
          },
          unpad: function unpad(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS3.pad.Iso10126;
      });
    }
  });

  // ../node_modules/crypto-js/pad-iso97971.js
  var require_pad_iso97971 = __commonJS({
    "../node_modules/crypto-js/pad-iso97971.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.pad.Iso97971 = {
          pad: function pad(data, blockSize) {
            data.concat(CryptoJS3.lib.WordArray.create([
              2147483648
            ], 1));
            CryptoJS3.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function unpad(data) {
            CryptoJS3.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS3.pad.Iso97971;
      });
    }
  });

  // ../node_modules/crypto-js/pad-zeropadding.js
  var require_pad_zeropadding = __commonJS({
    "../node_modules/crypto-js/pad-zeropadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.pad.ZeroPadding = {
          pad: function pad(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function unpad(data) {
            var dataWords = data.words;
            var i = data.sigBytes - 1;
            while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255)) {
              i--;
            }
            data.sigBytes = i + 1;
          }
        };
        return CryptoJS3.pad.ZeroPadding;
      });
    }
  });

  // ../node_modules/crypto-js/pad-nopadding.js
  var require_pad_nopadding = __commonJS({
    "../node_modules/crypto-js/pad-nopadding.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        CryptoJS3.pad.NoPadding = {
          pad: function pad() {
          },
          unpad: function unpad() {
          }
        };
        return CryptoJS3.pad.NoPadding;
      });
    }
  });

  // ../node_modules/crypto-js/format-hex.js
  var require_format_hex = __commonJS({
    "../node_modules/crypto-js/format-hex.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function(undefined2) {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex = C_enc.Hex;
          var C_format = C.format;
          var HexFormatter = C_format.Hex = {
            /**
            * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
            *
            * @param {CipherParams} cipherParams The cipher params object.
            *
            * @return {string} The hexadecimally encoded string.
            *
            * @static
            *
            * @example
            *
            *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
            */
            stringify: function stringify(cipherParams) {
              return cipherParams.ciphertext.toString(Hex);
            },
            /**
            * Converts a hexadecimally encoded ciphertext string to a cipher params object.
            *
            * @param {string} input The hexadecimally encoded string.
            *
            * @return {CipherParams} The cipher params object.
            *
            * @static
            *
            * @example
            *
            *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
            */
            parse: function parse2(input) {
              var ciphertext = Hex.parse(input);
              return CipherParams.create({
                ciphertext
              });
            }
          };
        })();
        return CryptoJS3.format.Hex;
      });
    }
  });

  // ../node_modules/crypto-js/aes.js
  var require_aes = __commonJS({
    "../node_modules/crypto-js/aes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./enc-base64",
            "./md5",
            "./evpkdf",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d = [];
            for (var i = 0; i < 256; i++) {
              if (i < 128) {
                d[i] = i << 1;
              } else {
                d[i] = i << 1 ^ 283;
              }
            }
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x] = sx;
              INV_SBOX[sx] = x;
              var x2 = d[x];
              var x4 = d[x2];
              var x8 = d[x4];
              var t = d[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x] = t << 24 | t >>> 8;
              SUB_MIX_1[x] = t << 16 | t >>> 16;
              SUB_MIX_2[x] = t << 8 | t >>> 24;
              SUB_MIX_3[x] = t;
              var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
              INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
              INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
              INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
              INV_SUB_MIX_3[sx] = t;
              if (!x) {
                x = xi = 1;
              } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
              }
            }
          })();
          var RCON = [
            0,
            1,
            2,
            4,
            8,
            16,
            32,
            64,
            128,
            27,
            54
          ];
          var AES3 = C_algo.AES = BlockCipher.extend({
            _doReset: function _doReset() {
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  var t = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t = t << 8 | t >>> 24;
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                    t ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t = keySchedule[ksRow];
                } else {
                  var t = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
                }
              }
            },
            encryptBlock: function encryptBlock(M, offset) {
              this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function decryptBlock(M, offset) {
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
              this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t = M[offset + 1];
              M[offset + 1] = M[offset + 3];
              M[offset + 3] = t;
            },
            _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M[offset] ^ keySchedule[0];
              var s1 = M[offset + 1] ^ keySchedule[1];
              var s2 = M[offset + 2] ^ keySchedule[2];
              var s3 = M[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M[offset] = t0;
              M[offset + 1] = t1;
              M[offset + 2] = t2;
              M[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES3);
        })();
        return CryptoJS3.AES;
      });
    }
  });

  // ../node_modules/crypto-js/tripledes.js
  var require_tripledes = __commonJS({
    "../node_modules/crypto-js/tripledes.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./enc-base64",
            "./md5",
            "./evpkdf",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [
            1,
            2,
            4,
            6,
            8,
            10,
            12,
            14,
            15,
            17,
            19,
            21,
            23,
            25,
            27,
            28
          ];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function _doReset() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i = 0; i < 24; i++) {
                  subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                  subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i = 1; i < 7; i++) {
                  subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
              }
            },
            encryptBlock: function encryptBlock(M, offset) {
              this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function decryptBlock(M, offset) {
              this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
              this._lBlock = M[offset];
              this._rBlock = M[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f2 = 0;
                for (var i = 0; i < 8; i++) {
                  f2 |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f2;
              }
              var t = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M[offset] = this._lBlock;
              M[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t;
            this._lBlock ^= t << offset;
          }
          function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t;
            this._rBlock ^= t << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function _doReset() {
              var key = this._key;
              var keyWords = key.words;
              this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
              this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
              this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
            },
            encryptBlock: function encryptBlock(M, offset) {
              this._des1.encryptBlock(M, offset);
              this._des2.decryptBlock(M, offset);
              this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function decryptBlock(M, offset) {
              this._des3.decryptBlock(M, offset);
              this._des2.encryptBlock(M, offset);
              this._des1.decryptBlock(M, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS3.TripleDES;
      });
    }
  });

  // ../node_modules/crypto-js/rc4.js
  var require_rc4 = __commonJS({
    "../node_modules/crypto-js/rc4.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./enc-base64",
            "./md5",
            "./evpkdf",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function _doReset() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S = this._S = [];
              for (var i = 0; i < 256; i++) {
                S[i] = i;
              }
              for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j = (j + S[i] + keyByte) % 256;
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S = this._S;
            var i = this._i;
            var j = this._j;
            var keystreamWord = 0;
            for (var n = 0; n < 4; n++) {
              i = (i + 1) % 256;
              j = (j + S[i]) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
              keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
            }
            this._i = i;
            this._j = j;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
            * Configuration options.
            *
            * @property {number} drop The number of keystream words to drop. Default 192
            */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function _doReset() {
              RC4._doReset.call(this);
              for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS3.RC4;
      });
    }
  });

  // ../node_modules/crypto-js/rabbit.js
  var require_rabbit = __commonJS({
    "../node_modules/crypto-js/rabbit.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./enc-base64",
            "./md5",
            "./evpkdf",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function _doReset() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              for (var i = 0; i < 4; i++) {
                K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
              }
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS3.Rabbit;
      });
    }
  });

  // ../node_modules/crypto-js/rabbit-legacy.js
  var require_rabbit_legacy = __commonJS({
    "../node_modules/crypto-js/rabbit-legacy.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./enc-base64",
            "./md5",
            "./evpkdf",
            "./cipher-core"
          ], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        (function() {
          var C = CryptoJS3;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S = [];
          var C_ = [];
          var G = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function _doReset() {
              var K = this._key.words;
              var iv = this.cfg.iv;
              var X = this._X = [
                K[0],
                K[3] << 16 | K[2] >>> 16,
                K[1],
                K[0] << 16 | K[3] >>> 16,
                K[2],
                K[1] << 16 | K[0] >>> 16,
                K[3],
                K[2] << 16 | K[1] >>> 16
              ];
              var C2 = this._C = [
                K[2] << 16 | K[2] >>> 16,
                K[0] & 4294901760 | K[1] & 65535,
                K[3] << 16 | K[3] >>> 16,
                K[1] & 4294901760 | K[2] & 65535,
                K[0] << 16 | K[0] >>> 16,
                K[2] & 4294901760 | K[3] & 65535,
                K[1] << 16 | K[1] >>> 16,
                K[3] & 4294901760 | K[0] & 65535
              ];
              this._b = 0;
              for (var i = 0; i < 4; i++) {
                nextState.call(this);
              }
              for (var i = 0; i < 8; i++) {
                C2[i] ^= X[i + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i2 & 4294901760;
                var i3 = i2 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i2;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i2;
                C2[7] ^= i3;
                for (var i = 0; i < 4; i++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function _doProcessBlock(M, offset) {
              var X = this._X;
              nextState.call(this);
              S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
              S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
              S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
              S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
              for (var i = 0; i < 4; i++) {
                S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
                M[offset + i] ^= S[i];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X = this._X;
            var C2 = this._C;
            for (var i = 0; i < 8; i++) {
              C_[i] = C2[i];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; i < 8; i++) {
              var gx = X[i] + C2[i];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
            X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
            X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
            X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
            X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS3.RabbitLegacy;
      });
    }
  });

  // ../node_modules/crypto-js/index.js
  var require_crypto_js = __commonJS({
    "../node_modules/crypto-js/index.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha3(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy());
        } else if (typeof define === "function" && define.amd) {
          define([
            "./core",
            "./x64-core",
            "./lib-typedarrays",
            "./enc-utf16",
            "./enc-base64",
            "./md5",
            "./sha1",
            "./sha256",
            "./sha224",
            "./sha512",
            "./sha384",
            "./sha3",
            "./ripemd160",
            "./hmac",
            "./pbkdf2",
            "./evpkdf",
            "./cipher-core",
            "./mode-cfb",
            "./mode-ctr",
            "./mode-ctr-gladman",
            "./mode-ofb",
            "./mode-ecb",
            "./pad-ansix923",
            "./pad-iso10126",
            "./pad-iso97971",
            "./pad-zeropadding",
            "./pad-nopadding",
            "./format-hex",
            "./aes",
            "./tripledes",
            "./rc4",
            "./rabbit",
            "./rabbit-legacy"
          ], factory);
        } else {
          root.CryptoJS = factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS3) {
        return CryptoJS3;
      });
    }
  });

  // ../node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "../node_modules/lodash/lodash.js"(exports, module) {
      function _type_of(obj) {
        "@swc/helpers - typeof";
        return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
      }
      (function() {
        var undefined2;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          [
            "ary",
            WRAP_ARY_FLAG
          ],
          [
            "bind",
            WRAP_BIND_FLAG
          ],
          [
            "bindKey",
            WRAP_BIND_KEY_FLAG
          ],
          [
            "curry",
            WRAP_CURRY_FLAG
          ],
          [
            "curryRight",
            WRAP_CURRY_RIGHT_FLAG
          ],
          [
            "flip",
            WRAP_FLIP_FLAG
          ],
          [
            "partial",
            WRAP_PARTIAL_FLAG
          ],
          [
            "partialRight",
            WRAP_PARTIAL_RIGHT_FLAG
          ],
          [
            "rearg",
            WRAP_REARG_FLAG
          ]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\uD800-\uDFFF", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\uD83C[\uDFFB-\uDFFF]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\uD83C[\uDDE6-\uDDFF]){2}", rsSurrPair = "[\uD800-\uDBFF][\uDC00-\uDFFF]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
          rsNonAstral,
          rsRegional,
          rsSurrPair
        ].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [
          rsDingbat,
          rsRegional,
          rsSurrPair
        ].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [
          rsNonAstral + rsCombo + "?",
          rsCombo,
          rsRegional,
          rsSurrPair,
          rsAstral
        ].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [
            rsBreak,
            rsUpper,
            "$"
          ].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [
            rsBreak,
            rsUpper + rsMiscLower,
            "$"
          ].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          \u00C0: "A",
          \u00C1: "A",
          \u00C2: "A",
          \u00C3: "A",
          \u00C4: "A",
          \u00C5: "A",
          \u00E0: "a",
          \u00E1: "a",
          \u00E2: "a",
          \u00E3: "a",
          \u00E4: "a",
          \u00E5: "a",
          \u00C7: "C",
          \u00E7: "c",
          \u00D0: "D",
          \u00F0: "d",
          \u00C8: "E",
          \u00C9: "E",
          \u00CA: "E",
          \u00CB: "E",
          \u00E8: "e",
          \u00E9: "e",
          \u00EA: "e",
          \u00EB: "e",
          \u00CC: "I",
          \u00CD: "I",
          \u00CE: "I",
          \u00CF: "I",
          \u00EC: "i",
          \u00ED: "i",
          \u00EE: "i",
          \u00EF: "i",
          \u00D1: "N",
          \u00F1: "n",
          \u00D2: "O",
          \u00D3: "O",
          \u00D4: "O",
          \u00D5: "O",
          \u00D6: "O",
          \u00D8: "O",
          \u00F2: "o",
          \u00F3: "o",
          \u00F4: "o",
          \u00F5: "o",
          \u00F6: "o",
          \u00F8: "o",
          \u00D9: "U",
          \u00DA: "U",
          \u00DB: "U",
          \u00DC: "U",
          \u00F9: "u",
          \u00FA: "u",
          \u00FB: "u",
          \u00FC: "u",
          \u00DD: "Y",
          \u00FD: "y",
          \u00FF: "y",
          \u00C6: "Ae",
          \u00E6: "ae",
          \u00DE: "Th",
          \u00FE: "th",
          \u00DF: "ss",
          // Latin Extended-A block.
          \u0100: "A",
          \u0102: "A",
          \u0104: "A",
          \u0101: "a",
          \u0103: "a",
          \u0105: "a",
          \u0106: "C",
          \u0108: "C",
          \u010A: "C",
          \u010C: "C",
          \u0107: "c",
          \u0109: "c",
          \u010B: "c",
          \u010D: "c",
          \u010E: "D",
          \u0110: "D",
          \u010F: "d",
          \u0111: "d",
          \u0112: "E",
          \u0114: "E",
          \u0116: "E",
          \u0118: "E",
          \u011A: "E",
          \u0113: "e",
          \u0115: "e",
          \u0117: "e",
          \u0119: "e",
          \u011B: "e",
          \u011C: "G",
          \u011E: "G",
          \u0120: "G",
          \u0122: "G",
          \u011D: "g",
          \u011F: "g",
          \u0121: "g",
          \u0123: "g",
          \u0124: "H",
          \u0126: "H",
          \u0125: "h",
          \u0127: "h",
          \u0128: "I",
          \u012A: "I",
          \u012C: "I",
          \u012E: "I",
          \u0130: "I",
          \u0129: "i",
          \u012B: "i",
          \u012D: "i",
          \u012F: "i",
          \u0131: "i",
          \u0134: "J",
          \u0135: "j",
          \u0136: "K",
          \u0137: "k",
          \u0138: "k",
          \u0139: "L",
          \u013B: "L",
          \u013D: "L",
          \u013F: "L",
          \u0141: "L",
          \u013A: "l",
          \u013C: "l",
          \u013E: "l",
          \u0140: "l",
          \u0142: "l",
          \u0143: "N",
          \u0145: "N",
          \u0147: "N",
          \u014A: "N",
          \u0144: "n",
          \u0146: "n",
          \u0148: "n",
          \u014B: "n",
          \u014C: "O",
          \u014E: "O",
          \u0150: "O",
          \u014D: "o",
          \u014F: "o",
          \u0151: "o",
          \u0154: "R",
          \u0156: "R",
          \u0158: "R",
          \u0155: "r",
          \u0157: "r",
          \u0159: "r",
          \u015A: "S",
          \u015C: "S",
          \u015E: "S",
          \u0160: "S",
          \u015B: "s",
          \u015D: "s",
          \u015F: "s",
          \u0161: "s",
          \u0162: "T",
          \u0164: "T",
          \u0166: "T",
          \u0163: "t",
          \u0165: "t",
          \u0167: "t",
          \u0168: "U",
          \u016A: "U",
          \u016C: "U",
          \u016E: "U",
          \u0170: "U",
          \u0172: "U",
          \u0169: "u",
          \u016B: "u",
          \u016D: "u",
          \u016F: "u",
          \u0171: "u",
          \u0173: "u",
          \u0174: "W",
          \u0175: "w",
          \u0176: "Y",
          \u0177: "y",
          \u0178: "Y",
          \u0179: "Z",
          \u017B: "Z",
          \u017D: "Z",
          \u017A: "z",
          \u017C: "z",
          \u017E: "z",
          \u0132: "IJ",
          \u0133: "ij",
          \u0152: "Oe",
          \u0153: "oe",
          \u0149: "'n",
          \u017F: "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [
              key,
              object[key]
            ];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [
              key,
              value
            ];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [
              value,
              value
            ];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array1 = context.Array, Date2 = context.Date, Error2 = context.Error, _$Function = context.Function, Math2 = context.Math, _$Object = context.Object, _$RegExp = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array1.prototype, funcProto = _$Function.prototype, objectProto = _$Object.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(_$Object);
          var oldDash = root._;
          var reIsNative = _$RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
          var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol1 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(_$Object.getPrototypeOf, _$Object), objectCreate = _$Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol1 ? Symbol1.isConcatSpreadable : undefined2, symIterator = Symbol1 ? Symbol1.iterator : undefined2, symToStringTag = Symbol1 ? Symbol1.toStringTag : undefined2;
          var defineProperty = function() {
            try {
              var func = getNative(_$Object, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = _$Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(_$Object.keys, _$Object), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(_$Object, "create");
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol1 ? Symbol1.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = /* @__PURE__ */ function() {
            function object() {
            }
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var _$result = new object();
              object.prototype = undefined2;
              return _$result;
            };
          }();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          lodash.templateSettings = {
            /**
            * Used to detect `data` property values to be HTML-escaped.
            *
            * @memberOf _.templateSettings
            * @type {RegExp}
            */
            escape: reEscape,
            /**
            * Used to detect code to be evaluated.
            *
            * @memberOf _.templateSettings
            * @type {RegExp}
            */
            evaluate: reEvaluate,
            /**
            * Used to detect `data` property values to inject.
            *
            * @memberOf _.templateSettings
            * @type {RegExp}
            */
            interpolate: reInterpolate,
            /**
            * Used to reference the data object in the template text.
            *
            * @memberOf _.templateSettings
            * @type {string}
            */
            variable: "",
            /**
            * Used to import variables into the compiled template.
            *
            * @memberOf _.templateSettings
            * @type {Object}
            */
            imports: {
              /**
              * A reference to the `lodash` function.
              *
              * @memberOf _.templateSettings.imports
              * @type {Function}
              */
              _: lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var _$result = new LazyWrapper(this.__wrapped__);
            _$result.__actions__ = copyArray(this.__actions__);
            _$result.__dir__ = this.__dir__;
            _$result.__filtered__ = this.__filtered__;
            _$result.__iteratees__ = copyArray(this.__iteratees__);
            _$result.__takeCount__ = this.__takeCount__;
            _$result.__views__ = copyArray(this.__views__);
            return _$result;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var _$result = new LazyWrapper(this);
              _$result.__dir__ = -1;
              _$result.__filtered__ = true;
            } else {
              _$result = this.clone();
              _$result.__dir__ *= -1;
            }
            return _$result;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var _$result = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], _$iteratee = data.iteratee, type = data.type, computed = _$iteratee(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                _$result[resIndex++] = value;
              }
            return _$result;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var _$result = this.has(key) && delete this.__data__[key];
            this.size -= _$result ? 1 : 0;
            return _$result;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var _$result = data[key];
              return _$result === HASH_UNDEFINED ? undefined2 : _$result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([
                key,
                value
              ]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              hash: new Hash(),
              map: new (Map2 || ListCache)(),
              string: new Hash()
            };
          }
          function mapCacheDelete(key) {
            var _$result = getMapData(this, key)["delete"](key);
            this.size -= _$result ? 1 : 0;
            return _$result;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), _$size = data.size;
            data.set(key, value);
            this.size += data.size == _$size ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__, _$result = data["delete"](key);
            this.size = data.size;
            return _$result;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([
                  key,
                  value
                ]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, _$result = skipIndexes ? baseTimes(value.length, String2) : [], length = _$result.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
              (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
              isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
              isIndex(key, length)))) {
                _$result.push(key);
              }
            }
            return _$result;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                configurable: true,
                enumerable: true,
                value,
                writable: true
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1, length = paths.length, _$result = Array1(length), skip = object == null;
            while (++index < length) {
              _$result[index] = skip ? undefined2 : get(object, paths[index]);
            }
            return _$result;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var _$result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              _$result = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (_$result !== undefined2) {
              return _$result;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              _$result = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, _$result);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                _$result = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(_$result, value)) : copySymbols(value, baseAssign(_$result, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                _$result = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, _$result);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                _$result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                _$result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(_$result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return _$result;
          }
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = _$Object(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined2 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined2, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, _$includes = arrayIncludes, isCommon = true, length = array.length, _$result = [], valuesLength = values2.length;
            if (!length) {
              return _$result;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              _$includes = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              _$includes = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  _$result.push(value);
                } else if (!_$includes(values2, computed, comparator)) {
                  _$result.push(value);
                }
              }
            return _$result;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var _$result = true;
            baseEach(collection, function(value, index, collection2) {
              _$result = !!predicate(value, index, collection2);
              return _$result;
            });
            return _$result;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, _$result = value;
              }
            }
            return _$result;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var _$result = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                _$result.push(value);
              }
            });
            return _$result;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0, length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var _$result = keysFunc(object);
            return isArray(object) ? _$result : arrayPush(_$result, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in _$Object(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in _$Object(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var _$includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array1(othLength), maxLength = Infinity, _$result = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && _$result.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : _$includes(_$result, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : _$includes(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  _$result.push(value);
                }
              }
            return _$result;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = _$Object(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var _$result = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(_$result === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : _$result)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var _$result = [];
            for (var key in _$Object(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                _$result.push(key);
              }
            }
            return _$result;
          }
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), _$result = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                _$result.push(key);
              }
            }
            return _$result;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1, _$result = isArrayLike(collection) ? Array1(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              _$result[++index] = iteratee2(value, key, collection2);
            });
            return _$result;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function(object) {
              var objValue = get(object, path);
              return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
                if (newValue === undefined2) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined2;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [
                identity
              ];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var _$result = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return {
                criteria,
                index: ++index,
                value
              };
            });
            return baseSortBy(_$result, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path) {
              return hasIn(object, path);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, _$result = {};
            while (++index < length) {
              var path = paths[index], value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(_$result, castPath(path, object), value);
              }
            }
            return _$result;
          }
          function basePropertyDeep(path) {
            return function(object) {
              return baseGet(object, path);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var _$indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = _$indexOf(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), _$result = Array1(length);
            while (length--) {
              _$result[fromRight ? length : ++index] = start;
              start += step;
            }
            return _$result;
          }
          function baseRepeat(string, n) {
            var _$result = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return _$result;
            }
            do {
              if (n % 2) {
                _$result += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return _$result;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1, length = path.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function baseSetData2(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function baseSetToString2(func, string) {
            return defineProperty(func, "toString", {
              configurable: true,
              enumerable: false,
              value: constant(string),
              writable: true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var _$result = Array1(length);
            while (++index < length) {
              _$result[index] = array[index + start];
            }
            return _$result;
          }
          function baseSome(collection, predicate) {
            var _$result;
            baseEach(collection, function(value, index, collection2) {
              _$result = predicate(value, index, collection2);
              return !_$result;
            });
            return !!_$result;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, _$result = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                _$result[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return _$result;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var _$result = value + "";
            return _$result == "0" && 1 / value == -INFINITY ? "-0" : _$result;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, _$includes = arrayIncludes, length = array.length, isCommon = true, _$result = [], seen = _$result;
            if (comparator) {
              isCommon = false;
              _$includes = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var _$set = iteratee2 ? null : createSet(array);
              if (_$set) {
                return setToArray(_$set);
              }
              isCommon = false;
              _$includes = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : _$result;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  _$result.push(value);
                } else if (!_$includes(seen, computed, comparator)) {
                  if (seen !== _$result) {
                    seen.push(computed);
                  }
                  _$result.push(value);
                }
              }
            return _$result;
          }
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var _$result = value;
            if (_$result instanceof LazyWrapper) {
              _$result = _$result.value();
            }
            return arrayReduce(actions, function(result2, action) {
              return action.func.apply(action.thisArg, arrayPush([
                result2
              ], action.args));
            }, _$result);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, _$result = Array1(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  _$result[index] = baseDifference(_$result[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(_$result, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, _$result = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(_$result, props[index], value);
            }
            return _$result;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [
              value
            ] : stringToPath(toString2(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, _$result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(_$result);
            return _$result;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var _$result = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(_$result).set(new Uint8Array2(arrayBuffer));
            return _$result;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var _$result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            _$result.lastIndex = regexp.lastIndex;
            return _$result;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? _$Object(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var _$result = compareAscending(objCriteria[index], othCriteria[index]);
              if (_$result) {
                if (index >= ordersLength) {
                  return _$result;
                }
                var order = orders[index];
                return _$result * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), _$result = Array1(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              _$result[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                _$result[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              _$result[leftIndex++] = args[argsIndex++];
            }
            return _$result;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), _$result = Array1(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              _$result[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              _$result[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                _$result[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return _$result;
          }
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array1(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = _$Object(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = _$Object(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = _$Object(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString2(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), _$result = Ctor.apply(thisBinding, args);
              return isObject(_$result) ? _$result : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array1(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = _$Object(collection);
              if (!isArrayLike(collection)) {
                var _$iteratee = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function predicate2(key) {
                  return _$iteratee(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[_$iteratee ? collection[index] : index] : undefined2;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, _$result = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  _$result = funcs[index2].call(this, _$result);
                }
                return _$result;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array1(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var _$result;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                _$result = value;
              }
              if (other !== undefined2) {
                if (_$result === undefined2) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                _$result = operator(value, other);
              }
              return _$result;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined2 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var _$result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(_$result), 0, length).join("") : _$result.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array1(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var _$result = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(_$result, newData);
            }
            _$result.placeholder = placeholder;
            return setWrapToString(_$result, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString2(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set && 1 / setToArray(new Set([
            ,
            -0
          ]))[1] == INFINITY) ? noop : function createSet2(values2) {
            return new Set(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var _$result = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              _$result = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              _$result = createPartial(func, bitmask, thisArg, partials);
            } else {
              _$result = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(_$result, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, _$result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                _$result = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  _$result = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                _$result = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return _$result;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var _$result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return _$result;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var _$result = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                _$result = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (_$result && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                _$result = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return _$result;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop : function getData2(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var _$result = func.name + "", array = realNames[_$result], length = hasOwnProperty.call(realNames, _$result) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return _$result;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          function getIteratee() {
            var _$result = lodash.iteratee || iteratee;
            _$result = _$result === iteratee ? baseIteratee : _$result;
            return arguments.length ? _$result(arguments[0], arguments[1]) : _$result;
          }
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var _$result = keys(object), length = _$result.length;
            while (length--) {
              var key = _$result[length], value = object[key];
              _$result[length] = [
                key,
                value,
                isStrictComparable(value)
              ];
            }
            return _$result;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e) {
            }
            var _$result = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return _$result;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function getSymbols2(object) {
            if (object == null) {
              return [];
            }
            object = _$Object(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function getSymbolsIn2(object) {
            var _$result = [];
            while (object) {
              arrayPush(_$result, getSymbols(object));
              object = getPrototype(object);
            }
            return _$result;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
            getTag = function getTag2(value) {
              var _$result = baseGetTag(value), Ctor = _$result == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return _$result;
            };
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], _$size = data.size;
              switch (data.type) {
                case "drop":
                  start += _$size;
                  break;
                case "dropRight":
                  end -= _$size;
                  break;
                case "take":
                  end = nativeMin(end, start + _$size);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - _$size);
                  break;
              }
            }
            return {
              start,
              end
            };
          }
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1, length = path.length, _$result = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(_$result = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (_$result || ++index != length) {
              return _$result;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, _$result = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              _$result.index = array.index;
              _$result.input = array.input;
            }
            return _$result;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value === "undefined" ? "undefined" : _type_of(value);
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
          }
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index === "undefined" ? "undefined" : _type_of(index);
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value === "undefined" ? "undefined" : _type_of(value);
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in _$Object(object);
          }
          function isKeyable(value) {
            var type = typeof value === "undefined" ? "undefined" : _type_of(value);
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in _$Object(object));
            };
          }
          function memoizeCapped(func) {
            var _$result = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = _$result.cache;
            return _$result;
          }
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var _$result = [];
            if (object != null) {
              for (var key in _$Object(object)) {
                _$result.push(key);
              }
            }
            return _$result;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array1(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array1(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var _$result = [];
            if (string.charCodeAt(0) === 46) {
              _$result.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              _$result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return _$result;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var _$result = value + "";
            return _$result == "0" && 1 / value == -INFINITY ? "-0" : _$result;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var _$result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            _$result.__actions__ = copyArray(wrapper.__actions__);
            _$result.__index__ = wrapper.__index__;
            _$result.__values__ = wrapper.__values__;
            return _$result;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, _$result = Array1(nativeCeil(length / size2));
            while (index < length) {
              _$result[resIndex++] = baseSlice(array, index, index += size2);
            }
            return _$result;
          }
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, _$result = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                _$result[resIndex++] = value;
              }
            }
            return _$result;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array1(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [
              array
            ], baseFlatten(args, 1));
          }
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy = baseRest(function(array, values2) {
            var _$iteratee = last(values2);
            if (isArrayLikeObject(_$iteratee)) {
              _$iteratee = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(_$iteratee, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, _$result = {};
            while (++index < length) {
              var pair = pairs[index];
              _$result[pair[0]] = pair[1];
            }
            return _$result;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var _$iteratee = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (_$iteratee === last(mapped)) {
              _$iteratee = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(_$iteratee, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, _$result = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return _$result;
          });
          function remove(array, predicate) {
            var _$result = [];
            if (!(array && array.length)) {
              return _$result;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                _$result.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return _$result;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var _$iteratee = last(arrays);
            if (isArrayLikeObject(_$iteratee)) {
              _$iteratee = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(_$iteratee, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var _$result = unzip(array);
            if (iteratee2 == null) {
              return _$result;
            }
            return arrayMap(_$result, function(group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var _$iteratee = last(arrays);
            if (isArrayLikeObject(_$iteratee)) {
              _$iteratee = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(_$iteratee, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, _$iteratee = length > 1 ? arrays[length - 1] : undefined2;
            _$iteratee = typeof _$iteratee == "function" ? (arrays.pop(), _$iteratee) : undefined2;
            return unzipWith(arrays, _$iteratee);
          });
          function chain(value) {
            var _$result = lodash(value);
            _$result.__chain__ = true;
            return _$result;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function interceptor2(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              func: thru,
              args: [
                interceptor
              ],
              thisArg: undefined2
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
            return {
              done,
              value
            };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var _$result, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var _$clone = wrapperClone(parent2);
              _$clone.__index__ = 0;
              _$clone.__values__ = undefined2;
              if (_$result) {
                previous.__wrapped__ = _$clone;
              } else {
                _$result = _$clone;
              }
              var previous = _$clone;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return _$result;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                func: thru,
                args: [
                  reverse
                ],
                thisArg: undefined2
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [
                value
              ]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path, args) {
            var index = -1, isFunc = typeof path == "function", _$result = isArrayLike(collection) ? Array1(collection.length) : [];
            baseEach(collection, function(value) {
              _$result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return _$result;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [
                iteratees
              ];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [
                orders
              ];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [
              [],
              []
            ];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [
                iteratees[0]
              ];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined2 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
          }
          function before(n, func) {
            var _$result;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                _$result = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined2;
              }
              return _$result;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var _$result = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            _$result.placeholder = curry.placeholder;
            return _$result;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var _$result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            _$result.placeholder = curryRight.placeholder;
            return _$result;
          }
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, _$result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              _$result = func.apply(thisArg, args);
              return _$result;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : _$result;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return _$result;
            }
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            function flush() {
              return timerId === undefined2 ? _$result : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return _$result;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function memoized1() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var _$result = func.apply(this, args);
              memoized.cache = cache.set(key, _$result) || cache;
              return _$result;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              leading,
              maxWait: wait,
              trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [
              value
            ];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep2(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(/* @__PURE__ */ function() {
            return arguments;
          }()) ? baseIsArguments : function isArguments2(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array1.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            var _$result = customizer ? customizer(value, other) : undefined2;
            return _$result === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!_$result;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject(value) {
            var type = typeof value === "undefined" ? "undefined" : _type_of(value);
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return (typeof value === "undefined" ? "undefined" : _type_of(value)) == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var _$result = toFinite(value), remainder = _$result % 1;
            return _$result === _$result ? remainder ? _$result - remainder : _$result : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString2(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign2 = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var _$result = baseCreate(prototype);
            return properties == null ? _$result : baseAssign(_$result, properties);
          }
          var defaults = baseRest(function(object, sources) {
            object = _$Object(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get(object, path, defaultValue) {
            var _$result = object == null ? undefined2 : baseGet(object, path);
            return _$result === undefined2 ? defaultValue : _$result;
          }
          function has(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [
                key
              ];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var _$result = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(_$result, iteratee2(value, key, object2), value);
            });
            return _$result;
          }
          function mapValues(object, iteratee2) {
            var _$result = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(_$result, key, iteratee2(value, key, object2));
            });
            return _$result;
          }
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var _$result = {};
            if (object == null) {
              return _$result;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), _$result);
            if (isDeep) {
              _$result = baseClone(_$result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(_$result, paths[length]);
            }
            return _$result;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [
                prop
              ];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path) {
              return predicate(value, path[0]);
            });
          }
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1, length = path.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          function set(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp2(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString2(string).toLowerCase());
          }
          function deburr(string) {
            string = toString2(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString2(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape2(string) {
            string = toString2(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString2(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString2(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString2(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString2(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt1(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString2(string), n);
          }
          function replace() {
            var args = arguments, string = toString2(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString2(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString2(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined2;
            }
            string = toString2(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = _$RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var _$result = attempt(function() {
              return _$Function(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
            });
            _$result.source = source;
            if (isError(_$result)) {
              throw _$result;
            }
            return _$result;
          }
          function toLower(value) {
            return toString2(value).toLowerCase();
          }
          function toUpper(value) {
            return toString2(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString2(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString2(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var _$result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined2) {
              return _$result + omission;
            }
            if (strSymbols) {
              end += _$result.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = _$result;
                if (!separator.global) {
                  separator = _$RegExp(separator.source, toString2(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                _$result = _$result.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = _$result.lastIndexOf(separator);
              if (index > -1) {
                _$result = _$result.slice(0, index);
              }
            }
            return _$result + omission;
          }
          function unescape2(string) {
            string = toString2(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString2(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [
                toIteratee(pair[0]),
                pair[1]
              ];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path, args) {
            return function(object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var _$chain = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (_$chain || chainAll) {
                    var _$result = object(this.__wrapped__), actions = _$result.__actions__ = copyArray(this.__actions__);
                    actions.push({
                      func,
                      args: arguments,
                      thisArg: object
                    });
                    _$result.__chain__ = chainAll;
                    return _$result;
                  }
                  return func.apply(object, arrayPush([
                    this.value()
                  ], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          function propertyOf(object) {
            return function(path) {
              return object == null ? undefined2 : baseGet(object, path);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var _$result = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return _$result;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [
              value
            ] : copyArray(stringToPath(toString2(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString2(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign2;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp2;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep2;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape2;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt1;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString2;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape2;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), {
            chain: false
          });
          lodash.VERSION = VERSION;
          arrayEach([
            "bind",
            "bindKey",
            "curry",
            "curryRight",
            "partial",
            "partialRight"
          ], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach([
            "drop",
            "take"
          ], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
              var _$result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (_$result.__filtered__) {
                _$result.__takeCount__ = nativeMin(n, _$result.__takeCount__);
              } else {
                _$result.__views__.push({
                  size: nativeMin(n, MAX_ARRAY_LENGTH),
                  type: methodName + (_$result.__dir__ < 0 ? "Right" : "")
                });
              }
              return _$result;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach([
            "filter",
            "map",
            "takeWhile"
          ], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var _$result = this.clone();
              _$result.__iteratees__.push({
                iteratee: getIteratee(iteratee2, 3),
                type
              });
              _$result.__filtered__ = _$result.__filtered__ || isFilter;
              return _$result;
            };
          });
          arrayEach([
            "head",
            "last"
          ], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach([
            "initial",
            "tail"
          ], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
            if (typeof path == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var _$result = this;
            if (_$result.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(_$result);
            }
            if (start < 0) {
              _$result = _$result.takeRight(-start);
            } else if (start) {
              _$result = _$result.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              _$result = end < 0 ? _$result.dropRight(-end) : _$result.take(end - start);
            }
            return _$result;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [
                1
              ] : arguments, isLazy = value instanceof LazyWrapper, _$iteratee = args[0], useLazy = isLazy || isArray(value);
              var interceptor = function interceptor2(value2) {
                var _$result2 = lodashFunc.apply(lodash, arrayPush([
                  value2
                ], args));
                return isTaker && chainAll ? _$result2[0] : _$result2;
              };
              if (useLazy && checkIteratee && typeof _$iteratee == "function" && _$iteratee.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var _$result = func.apply(value, args);
                _$result.__actions__.push({
                  func: thru,
                  args: [
                    interceptor
                  ],
                  thisArg: undefined2
                });
                return new LodashWrapper(_$result, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              _$result = this.thru(interceptor);
              return isUnwrapped ? isTaker ? _$result.value()[0] : _$result.value() : _$result;
            };
          });
          arrayEach([
            "pop",
            "push",
            "shift",
            "sort",
            "splice",
            "unshift"
          ], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({
                name: methodName,
                func: lodashFunc
              });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [
            {
              name: "wrapper",
              func: undefined2
            }
          ];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        };
        var _ = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _;
          define(function() {
            return _;
          });
        } else if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(exports);
    }
  });

  // ../node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // ../node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // ../node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // ../node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  var i;
  function unsafeStringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // ../node_modules/uuid/dist/esm-browser/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    var v;
    var arr = new Uint8Array(16);
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 255;
    arr[2] = v >>> 8 & 255;
    arr[3] = v & 255;
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255;
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255;
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255;
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v / 4294967296 & 255;
    arr[12] = v >>> 24 & 255;
    arr[13] = v >>> 16 & 255;
    arr[14] = v >>> 8 & 255;
    arr[15] = v & 255;
    return arr;
  }
  var parse_default = parse;

  // ../node_modules/uuid/dist/esm-browser/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }
  var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      var _namespace;
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = parse_default(namespace);
      }
      if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      var bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = bytes[6] & 15 | version;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return unsafeStringify(bytes);
    }
    try {
      generateUUID.name = name;
    } catch (err2) {
    }
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
  }

  // ../node_modules/uuid/dist/esm-browser/md5.js
  function md5(bytes) {
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = new Uint8Array(msg.length);
      for (var i = 0; i < msg.length; ++i) {
        bytes[i] = msg.charCodeAt(i);
      }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
  }
  function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = "0123456789abcdef";
    for (var i = 0; i < length32; i += 8) {
      var x = input[i >> 5] >>> i % 32 & 255;
      var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
      output.push(hex);
    }
    return output;
  }
  function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
  }
  function wordsToMd5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [
      a,
      b,
      c,
      d
    ];
  }
  function bytesToWords(input) {
    if (input.length === 0) {
      return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for (var i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input[i / 8] & 255) << i % 32;
    }
    return output;
  }
  function safeAdd(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  var md5_default = md5;

  // ../node_modules/uuid/dist/esm-browser/v3.js
  var v3 = v35("v3", 48, md5_default);

  // ../node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // ../node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // ../node_modules/uuid/dist/esm-browser/sha1.js
  function f(s, x, y, z) {
    switch (s) {
      case 0:
        return x & y ^ ~x & z;
      case 1:
        return x ^ y ^ z;
      case 2:
        return x & y ^ x & z ^ y & z;
      case 3:
        return x ^ y ^ z;
    }
  }
  function ROTL(x, n) {
    return x << n | x >>> 32 - n;
  }
  function sha1(bytes) {
    var K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    var H = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ];
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = [];
      for (var i = 0; i < msg.length; ++i) {
        bytes.push(msg.charCodeAt(i));
      }
    } else if (!Array.isArray(bytes)) {
      bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(128);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for (var i1 = 0; i1 < N; ++i1) {
      var arr = new Uint32Array(16);
      for (var j = 0; j < 16; ++j) {
        arr[j] = bytes[i1 * 64 + j * 4] << 24 | bytes[i1 * 64 + j * 4 + 1] << 16 | bytes[i1 * 64 + j * 4 + 2] << 8 | bytes[i1 * 64 + j * 4 + 3];
      }
      M[i1] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
    for (var i2 = 0; i2 < N; ++i2) {
      var W = new Uint32Array(80);
      for (var t = 0; t < 16; ++t) {
        W[t] = M[i2][t];
      }
      for (var t1 = 16; t1 < 80; ++t1) {
        W[t1] = ROTL(W[t1 - 3] ^ W[t1 - 8] ^ W[t1 - 14] ^ W[t1 - 16], 1);
      }
      var a = H[0];
      var b = H[1];
      var c = H[2];
      var d = H[3];
      var e = H[4];
      for (var t2 = 0; t2 < 80; ++t2) {
        var s = Math.floor(t2 / 20);
        var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t2] >>> 0;
        e = d;
        d = c;
        c = ROTL(b, 30) >>> 0;
        b = a;
        a = T;
      }
      H[0] = H[0] + a >>> 0;
      H[1] = H[1] + b >>> 0;
      H[2] = H[2] + c >>> 0;
      H[3] = H[3] + d >>> 0;
      H[4] = H[4] + e >>> 0;
    }
    return [
      H[0] >> 24 & 255,
      H[0] >> 16 & 255,
      H[0] >> 8 & 255,
      H[0] & 255,
      H[1] >> 24 & 255,
      H[1] >> 16 & 255,
      H[1] >> 8 & 255,
      H[1] & 255,
      H[2] >> 24 & 255,
      H[2] >> 16 & 255,
      H[2] >> 8 & 255,
      H[2] & 255,
      H[3] >> 24 & 255,
      H[3] >> 16 & 255,
      H[3] >> 8 & 255,
      H[3] & 255,
      H[4] >> 24 & 255,
      H[4] >> 16 & 255,
      H[4] >> 8 & 255,
      H[4] & 255
    ];
  }
  var sha1_default = sha1;

  // ../node_modules/uuid/dist/esm-browser/v5.js
  var v5 = v35("v5", 80, sha1_default);
  var v5_default = v5;

  // ../src/shared/classes/vector.ts
  function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init(obj, privateSet) {
    _check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
  }
  function _unsupported_iterable_to_array(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array(o, minLen);
  }
  var _parseVectors = /* @__PURE__ */ new WeakSet();
  var Vector3 = /* @__PURE__ */ function() {
    "use strict";
    function Vector32(x) {
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      _class_call_check(this, Vector32);
      _class_private_method_init(this, _parseVectors);
      _define_property(this, "x", void 0);
      _define_property(this, "y", void 0);
      _define_property(this, "z", void 0);
      var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
      this.x = vectors.x;
      this.y = vectors.y;
      this.z = vectors.z;
    }
    _create_class(Vector32, [
      {
        key: "equals",
        value: function equals(x, y, z) {
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          return this.x === vectors.x && this.y === vectors.y && this.z === vectors.z;
        }
      },
      {
        key: "add",
        value: function add(x, y, z, s) {
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          this.x += s ? vectors.x * s : vectors.x;
          this.y += s ? vectors.y * s : vectors.y;
          this.z += s ? vectors.z * s : vectors.z;
          return this;
        }
      },
      {
        key: "addScalar",
        value: function addScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x += scalar;
          this.y += scalar;
          this.z += scalar;
          return this;
        }
      },
      {
        key: "sub",
        value: function sub(x) {
          var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, s = arguments.length > 3 ? arguments[3] : void 0;
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          this.x -= s ? vectors.x * s : vectors.x;
          this.y -= s ? vectors.y * s : vectors.y;
          this.z -= s ? vectors.z * s : vectors.z;
          return this;
        }
      },
      {
        key: "subScalar",
        value: function subScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x -= scalar;
          this.y -= scalar;
          this.z -= scalar;
          return this;
        }
      },
      {
        key: "multiply",
        value: function multiply(x, y, z) {
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          this.x *= vectors.x;
          this.y *= vectors.y;
          this.z *= vectors.z;
          return this;
        }
      },
      {
        key: "multiplyScalar",
        value: function multiplyScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x *= scalar;
          this.y *= scalar;
          this.z *= scalar;
          return this;
        }
      },
      {
        key: "divide",
        value: function divide(x, y, z) {
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          this.x /= vectors.x;
          this.y /= vectors.y;
          this.z /= vectors.z;
          return this;
        }
      },
      {
        key: "divideScalar",
        value: function divideScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x /= scalar;
          this.y /= scalar;
          this.z /= scalar;
          return this;
        }
      },
      {
        key: "round",
        value: function round() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          this.z = Math.round(this.z);
          return this;
        }
      },
      {
        key: "floor",
        value: function floor() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          this.z = Math.floor(this.z);
          return this;
        }
      },
      {
        key: "ceil",
        value: function ceil() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          this.z = Math.ceil(this.z);
          return this;
        }
      },
      {
        key: "getCenter",
        value: function getCenter(x, y, z) {
          var vectors = _class_private_method_get(this, _parseVectors, parseVectors).call(this, x, y, z);
          return new Vector32((this.x + vectors.x) / 2, (this.y + vectors.y) / 2, (this.z + vectors.z) / 2);
        }
      },
      {
        key: "getDistance",
        value: function getDistance2(x) {
          var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var _ref = _sliced_to_array(x instanceof Array ? x : typeof x === "object" ? [
            x.x,
            x.y,
            x.z
          ] : [
            x,
            y,
            z
          ], 3), x1 = _ref[0], y1 = _ref[1], z1 = _ref[2];
          if (typeof x1 !== "number" || typeof y1 !== "number" || typeof z1 !== "number") {
            throw new Error("Invalid vector coordinates");
          }
          var _ref1 = [
            this.x - x1,
            this.y - y1,
            this.z - z1
          ], dX = _ref1[0], dY = _ref1[1], dZ = _ref1[2];
          return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
        }
      },
      {
        key: "toArray",
        value: function toArray(fractionDigits) {
          if (typeof fractionDigits === "number") {
            return [
              parseFloat(this.x.toFixed(fractionDigits)),
              parseFloat(this.y.toFixed(fractionDigits)),
              parseFloat(this.z.toFixed(fractionDigits))
            ];
          }
          return [
            this.x,
            this.y,
            this.z
          ];
        }
      },
      {
        key: "toJSON",
        value: function toJSON(fractionDigits) {
          if (typeof fractionDigits === "number") {
            return {
              x: parseFloat(this.x.toFixed(fractionDigits)),
              y: parseFloat(this.y.toFixed(fractionDigits)),
              z: parseFloat(this.z.toFixed(fractionDigits))
            };
          }
          return {
            x: this.x,
            y: this.y,
            z: this.z
          };
        }
      },
      {
        key: "toString",
        value: function toString2(fractionDigits) {
          return JSON.stringify(this.toJSON(fractionDigits));
        }
      }
    ]);
    return Vector32;
  }();
  function parseVectors(x, y, z) {
    var coords = {
      x: 0,
      y: 0,
      z: 0
    };
    if (x instanceof Vector3) {
      coords = x;
    } else if (x instanceof Array) {
      coords = {
        x: x[0],
        y: x[1],
        z: x[2]
      };
    } else if (typeof x === "object") {
      coords = x;
    } else {
      coords = {
        x,
        y,
        z
      };
    }
    if (typeof coords.x !== "number" || typeof coords.y !== "number" || typeof coords.z !== "number") {
      throw new Error("Invalid vector coordinates");
    }
    return coords;
  }

  // ../src/shared/classes/vector2.ts
  function _array_like_to_array2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes2(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _check_private_redeclaration2(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_call_check2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_private_method_get2(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init2(obj, privateSet) {
    _check_private_redeclaration2(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class2(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  function _define_property2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _iterable_to_array_limit2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array2(arr, i) {
    return _array_with_holes2(arr) || _iterable_to_array_limit2(arr, i) || _unsupported_iterable_to_array2(arr, i) || _non_iterable_rest2();
  }
  function _unsupported_iterable_to_array2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array2(o, minLen);
  }
  var _parseVectors2 = /* @__PURE__ */ new WeakSet();
  var Vector2 = /* @__PURE__ */ function() {
    "use strict";
    function Vector22(x) {
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      _class_call_check2(this, Vector22);
      _class_private_method_init2(this, _parseVectors2);
      _define_property2(this, "x", void 0);
      _define_property2(this, "y", void 0);
      var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
      this.x = vectors.x;
      this.y = vectors.y;
    }
    _create_class2(Vector22, [
      {
        key: "equals",
        value: function equals(x, y) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          return this.x === vectors.x && this.y === vectors.y;
        }
      },
      {
        key: "add",
        value: function add(x, y, s) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          this.x += s ? vectors.x * s : vectors.x;
          this.y += s ? vectors.y * s : vectors.y;
          return this;
        }
      },
      {
        key: "addScalar",
        value: function addScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x += scalar;
          this.y += scalar;
          return this;
        }
      },
      {
        key: "sub",
        value: function sub(x, y, s) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          this.x -= s ? vectors.x * s : vectors.x;
          this.y -= s ? vectors.y * s : vectors.y;
          return this;
        }
      },
      {
        key: "subScalar",
        value: function subScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x -= scalar;
          this.y -= scalar;
          return this;
        }
      },
      {
        key: "multiply",
        value: function multiply(x, y) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          this.x *= vectors.x;
          this.y *= vectors.y;
          return this;
        }
      },
      {
        key: "multiplyScalar",
        value: function multiplyScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x *= scalar;
          this.y *= scalar;
          return this;
        }
      },
      {
        key: "divide",
        value: function divide(x, y) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          this.x /= vectors.x;
          this.y /= vectors.y;
          return this;
        }
      },
      {
        key: "divideScalar",
        value: function divideScalar(scalar) {
          if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
          }
          this.x /= scalar;
          this.y /= scalar;
          return this;
        }
      },
      {
        key: "round",
        value: function round() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        }
      },
      {
        key: "floor",
        value: function floor() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        }
      },
      {
        key: "ceil",
        value: function ceil() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        }
      },
      {
        key: "getCenter",
        value: function getCenter(x, y) {
          var vectors = _class_private_method_get2(this, _parseVectors2, parseVectors2).call(this, x, y);
          return new Vector22((this.x + vectors.x) / 2, (this.y + vectors.y) / 2);
        }
      },
      {
        key: "getDistance",
        value: function getDistance2(x, y) {
          var _ref = _sliced_to_array2(x instanceof Array ? x : typeof x === "object" ? [
            x.x,
            x.y
          ] : [
            x,
            y
          ], 2), x1 = _ref[0], y1 = _ref[1];
          if (typeof x1 !== "number" || typeof y1 !== "number") {
            throw new Error("Invalid vector coordinates");
          }
          var _ref1 = [
            this.x - x1,
            this.y - y1
          ], dX = _ref1[0], dY = _ref1[1];
          return Math.sqrt(dX * dX + dY * dY);
        }
      },
      {
        key: "toArray",
        value: function toArray(fractionDigits) {
          if (typeof fractionDigits === "number") {
            return [
              parseFloat(this.x.toFixed(fractionDigits)),
              parseFloat(this.y.toFixed(fractionDigits))
            ];
          }
          return [
            this.x,
            this.y
          ];
        }
      },
      {
        key: "toJSON",
        value: function toJSON(fractionDigits) {
          if (typeof fractionDigits === "number") {
            return {
              x: parseFloat(this.x.toFixed(fractionDigits)),
              y: parseFloat(this.y.toFixed(fractionDigits))
            };
          }
          return {
            x: this.x,
            y: this.y
          };
        }
      },
      {
        key: "toString",
        value: function toString2(fractionDigits) {
          return JSON.stringify(this.toJSON(fractionDigits));
        }
      }
    ]);
    return Vector22;
  }();
  function parseVectors2(x, y) {
    var coords = {
      x: 0,
      y: 0
    };
    if (x instanceof Vector2) {
      coords = x;
    } else if (x instanceof Array) {
      coords = {
        x: x[0],
        y: x[1]
      };
    } else if (typeof x === "object") {
      coords = x;
    } else {
      coords = {
        x,
        y
      };
    }
    if (typeof coords.x !== "number" || typeof coords.y !== "number") {
      throw new Error("Invalid vector coordinates");
    }
    return coords;
  }

  // ../src/shared/math.ts
  function _array_like_to_array3(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes3(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterable_to_array_limit3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array3(arr, i) {
    return _array_with_holes3(arr) || _iterable_to_array_limit3(arr, i) || _unsupported_iterable_to_array3(arr, i) || _non_iterable_rest3();
  }
  function _unsupported_iterable_to_array3(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array3(o, minLen);
  }
  var clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
  var getMapRange = function(from, to, scale) {
    return to[0] + (scale - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  };
  var getDistance = function(param, param1) {
    var _param = _sliced_to_array3(param, 3), aX = _param[0], aY = _param[1], aZ = _param[2], _param1 = _sliced_to_array3(param1, 3), bX = _param1[0], bY = _param1[1], bZ = _param1[2];
    var _ref = [
      aX - bX,
      aY - bY,
      aZ - bZ
    ], dX = _ref[0], dY = _ref[1], dZ = _ref[2];
    return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
  };
  var getRandomNumber = function(pMin, pMax) {
    return pMax ? Math.floor(Math.random() * (pMax - pMin + 1) + pMin) : Math.floor(Math.random() * pMin);
  };
  var parseVector2 = function(x, y) {
    if (x instanceof Vector2) {
      return x;
    } else if (x instanceof Vector3) {
      return new Vector2(x);
    } else if (x instanceof Array) {
      return new Vector2(x);
    } else if (typeof x === "object") {
      return new Vector2(x);
    }
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Invalid vector coordinates");
    }
    return new Vector2(x, y);
  };
  var parseVector3 = function(x, y, z) {
    if (x instanceof Vector3) {
      return x;
    } else if (x instanceof Array) {
      return new Vector3(x);
    } else if (typeof x === "object") {
      return new Vector3(x);
    }
    if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
      throw new Error("Invalid vector coordinates");
    }
    return new Vector3(x, y, z);
  };
  var windingNumber = function(pPoint, pVectors) {
    var windingNumber2 = 0;
    var isLeft = function(p02, p12, p2) {
      return (p12.x - p02.x) * (p2.y - p02.y) - (p2.x - p02.x) * (p12.y - p02.y);
    };
    for (var i = 0; i < pVectors.length; i++) {
      var p0 = pVectors[i];
      var p1 = pVectors[(i + 1) % pVectors.length];
      if (p0.y <= pPoint.y) {
        if (p1.y > pPoint.y && isLeft(p0, p1, pPoint) > 0) {
          windingNumber2++;
        }
      } else if (p1.y <= pPoint.y && isLeft(p0, p1, pPoint) < 0) {
        windingNumber2--;
      }
    }
    return windingNumber2;
  };
  var MathUtils = {
    clamp,
    getMapRange,
    getDistance,
    getRandomNumber,
    parseVector3,
    parseVector2,
    windingNumber
  };

  // ../node_modules/pako/dist/pako.esm.mjs
  var Z_FIXED$1 = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN$1 = 2;
  function zero$1(buf) {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var LENGTH_CODES$1 = 29;
  var LITERALS$1 = 256;
  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  var D_CODES$1 = 30;
  var BL_CODES$1 = 19;
  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  var MAX_BITS$1 = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = (
    /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  );
  var extra_dbits = (
    /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  );
  var extra_blbits = (
    /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  );
  var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  var d_code = (dist) => {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  };
  var put_short = (s, w) => {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  };
  var send_bits = (s, value, length) => {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  };
  var send_code = (s, c, tree) => {
    send_bits(
      s,
      tree[c * 2],
      tree[c * 2 + 1]
      /*.Len*/
    );
  };
  var bi_reverse = (code, len) => {
    let res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  };
  var bi_flush = (s) => {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  };
  var gen_bitlen = (s, desc) => {
    const tree = desc.dyn_tree;
    const max_code = desc.max_code;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const extra = desc.stat_desc.extra_bits;
    const base = desc.stat_desc.extra_base;
    const max_length = desc.stat_desc.max_length;
    let h;
    let n, m;
    let bits;
    let xbits;
    let f2;
    let overflow = 0;
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f2 = tree[n * 2];
      s.opt_len += f2 * (bits + xbits);
      if (has_stree) {
        s.static_len += f2 * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  };
  var gen_codes = (tree, max_code, bl_count) => {
    const next_code = new Array(MAX_BITS$1 + 1);
    let code = 0;
    let bits;
    let n;
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      code = code + bl_count[bits - 1] << 1;
      next_code[bits] = code;
    }
    for (n = 0; n <= max_code; n++) {
      let len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  };
  var tr_static_init = () => {
    let n;
    let bits;
    let length;
    let code;
    let dist;
    const bl_count = new Array(MAX_BITS$1 + 1);
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
  };
  var init_block = (s) => {
    let n;
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.sym_next = s.matches = 0;
  };
  var bi_windup = (s) => {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  };
  var smaller = (tree, n, m, depth) => {
    const _n2 = n * 2;
    const _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  };
  var pqdownheap = (s, tree, k) => {
    const v = s.heap[k];
    let j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  };
  var compress_block = (s, ltree, dtree) => {
    let dist;
    let lc;
    let sx = 0;
    let code;
    let extra;
    if (s.sym_next !== 0) {
      do {
        dist = s.pending_buf[s.sym_buf + sx++] & 255;
        dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
        lc = s.pending_buf[s.sym_buf + sx++];
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (sx < s.sym_next);
    }
    send_code(s, END_BLOCK, ltree);
  };
  var build_tree = (s, desc) => {
    const tree = desc.dyn_tree;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const elems = desc.stat_desc.elems;
    let n, m;
    let max_code = -1;
    let node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;
    for (n = 0; n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[
        1
        /*SMALLEST*/
      ] = s.heap[s.heap_len--];
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
      m = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[
        1
        /*SMALLEST*/
      ] = node++;
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[
      1
      /*SMALLEST*/
    ];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  };
  var scan_tree = (s, tree, max_code) => {
    let n;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var send_tree = (s, tree, max_code) => {
    let n;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var build_bl_tree = (s) => {
    let max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  };
  var send_all_trees = (s, lcodes, dcodes, blcodes) => {
    let rank2;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank2 = 0; rank2 < blcodes; rank2++) {
      send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  };
  var detect_data_type = (s) => {
    let block_mask = 4093624447;
    let n;
    for (n = 0; n <= 31; n++, block_mask >>>= 1) {
      if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  };
  var static_init_done = false;
  var _tr_init$1 = (s) => {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  };
  var _tr_stored_block$1 = (s, buf, stored_len, last) => {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    bi_windup(s);
    put_short(s, stored_len);
    put_short(s, ~stored_len);
    if (stored_len) {
      s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
    }
    s.pending += stored_len;
  };
  var _tr_align$1 = (s) => {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  };
  var _tr_flush_block$1 = (s, buf, stored_len, last) => {
    let opt_lenb, static_lenb;
    let max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN$1) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block$1(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  };
  var _tr_tally$1 = (s, dist, lc) => {
    s.pending_buf[s.sym_buf + s.sym_next++] = dist;
    s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
    s.pending_buf[s.sym_buf + s.sym_next++] = lc;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.sym_next === s.sym_end;
  };
  var _tr_init_1 = _tr_init$1;
  var _tr_stored_block_1 = _tr_stored_block$1;
  var _tr_flush_block_1 = _tr_flush_block$1;
  var _tr_tally_1 = _tr_tally$1;
  var _tr_align_1 = _tr_align$1;
  var trees = {
    _tr_init: _tr_init_1,
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: _tr_flush_block_1,
    _tr_tally: _tr_tally_1,
    _tr_align: _tr_align_1
  };
  var adler32 = (adler, buf, len, pos) => {
    let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2e3 ? 2e3 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  };
  var adler32_1 = adler32;
  var makeTable = () => {
    let c, table = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  };
  var crcTable = new Uint32Array(makeTable());
  var crc32 = (crc, buf, len, pos) => {
    const t = crcTable;
    const end = pos + len;
    crc ^= -1;
    for (let i = pos; i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  };
  var crc32_1 = crc32;
  var messages = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  };
  var constants$2 = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  };
  var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$2,
    Z_PARTIAL_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH$1,
    Z_FINISH: Z_FINISH$3,
    Z_BLOCK: Z_BLOCK$1,
    Z_OK: Z_OK$3,
    Z_STREAM_END: Z_STREAM_END$3,
    Z_STREAM_ERROR: Z_STREAM_ERROR$2,
    Z_DATA_ERROR: Z_DATA_ERROR$2,
    Z_BUF_ERROR: Z_BUF_ERROR$1,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
    Z_FILTERED,
    Z_HUFFMAN_ONLY,
    Z_RLE,
    Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
    Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED$2
  } = constants$2;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS$1 = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var GZIP_STATE = 57;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  var err = (strm, errorCode) => {
    strm.msg = messages[errorCode];
    return errorCode;
  };
  var rank = (f2) => {
    return f2 * 2 - (f2 > 4 ? 9 : 0);
  };
  var zero = (buf) => {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  };
  var slide_hash = (s) => {
    let n, m;
    let p;
    let wsize = s.w_size;
    n = s.hash_size;
    p = n;
    do {
      m = s.head[--p];
      s.head[p] = m >= wsize ? m - wsize : 0;
    } while (--n);
    n = wsize;
    p = n;
    do {
      m = s.prev[--p];
      s.prev[p] = m >= wsize ? m - wsize : 0;
    } while (--n);
  };
  var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
  var HASH = HASH_ZLIB;
  var flush_pending = (strm) => {
    const s = strm.state;
    let len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  };
  var flush_block_only = (s, last) => {
    _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  };
  var put_byte = (s, b) => {
    s.pending_buf[s.pending++] = b;
  };
  var putShortMSB = (s, b) => {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  };
  var read_buf = (strm, buf, start, size) => {
    let len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  };
  var longest_match = (s, cur_match) => {
    let chain_length = s.max_chain_length;
    let scan = s.strstart;
    let match;
    let len;
    let best_len = s.prev_length;
    let nice_match = s.nice_match;
    const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    const _win = s.window;
    const wmask = s.w_mask;
    const prev = s.prev;
    const strend = s.strstart + MAX_MATCH;
    let scan_end1 = _win[scan + best_len - 1];
    let scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  };
  var fill_window = (s) => {
    const _w_size = s.w_size;
    let n, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
        slide_hash(s);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
        while (s.insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  };
  var deflate_stored = (s, flush) => {
    let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
    let len, left, have, last = 0;
    let used = s.strm.avail_in;
    do {
      len = 65535;
      have = s.bi_valid + 42 >> 3;
      if (s.strm.avail_out < have) {
        break;
      }
      have = s.strm.avail_out - have;
      left = s.strstart - s.block_start;
      if (len > left + s.strm.avail_in) {
        len = left + s.strm.avail_in;
      }
      if (len > have) {
        len = have;
      }
      if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
        break;
      }
      last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
      _tr_stored_block(s, 0, 0, last);
      s.pending_buf[s.pending - 4] = len;
      s.pending_buf[s.pending - 3] = len >> 8;
      s.pending_buf[s.pending - 2] = ~len;
      s.pending_buf[s.pending - 1] = ~len >> 8;
      flush_pending(s.strm);
      if (left) {
        if (left > len) {
          left = len;
        }
        s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
        s.strm.next_out += left;
        s.strm.avail_out -= left;
        s.strm.total_out += left;
        s.block_start += left;
        len -= left;
      }
      if (len) {
        read_buf(s.strm, s.strm.output, s.strm.next_out, len);
        s.strm.next_out += len;
        s.strm.avail_out -= len;
        s.strm.total_out += len;
      }
    } while (last === 0);
    used -= s.strm.avail_in;
    if (used) {
      if (used >= s.w_size) {
        s.matches = 2;
        s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
        s.strstart = s.w_size;
        s.insert = s.strstart;
      } else {
        if (s.window_size - s.strstart <= used) {
          s.strstart -= s.w_size;
          s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
          if (s.matches < 2) {
            s.matches++;
          }
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
        }
        s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
        s.strstart += used;
        s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
      }
      s.block_start = s.strstart;
    }
    if (s.high_water < s.strstart) {
      s.high_water = s.strstart;
    }
    if (last) {
      return BS_FINISH_DONE;
    }
    if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
      return BS_BLOCK_DONE;
    }
    have = s.window_size - s.strstart;
    if (s.strm.avail_in > have && s.block_start >= s.w_size) {
      s.block_start -= s.w_size;
      s.strstart -= s.w_size;
      s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
      if (s.matches < 2) {
        s.matches++;
      }
      have += s.w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
    }
    if (have > s.strm.avail_in) {
      have = s.strm.avail_in;
    }
    if (have) {
      read_buf(s.strm, s.window, s.strstart, have);
      s.strstart += have;
      s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
    }
    if (s.high_water < s.strstart) {
      s.high_water = s.strstart;
    }
    have = s.bi_valid + 42 >> 3;
    have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
    min_block = have > s.w_size ? s.w_size : have;
    left = s.strstart - s.block_start;
    if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
      len = left > have ? have : left;
      last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
      _tr_stored_block(s, s.block_start, len, last);
      s.block_start += len;
      flush_pending(s.strm);
    }
    return last ? BS_FINISH_STARTED : BS_NEED_MORE;
  };
  var deflate_fast = (s, flush) => {
    let hash_head;
    let bflush;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
        }
      } else {
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_slow = (s, flush) => {
    let hash_head;
    let bflush;
    let max_insert;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_rle = (s, flush) => {
    let bflush;
    let prev;
    let scan, strend;
    const _win = s.window;
    for (; ; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_huff = (s, flush) => {
    let bflush;
    for (; ; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),
    /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),
    /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),
    /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),
    /* 3 */
    new Config(4, 4, 16, 16, deflate_slow),
    /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),
    /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),
    /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),
    /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),
    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
  ];
  var lm_init = (s) => {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  };
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$2;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
    this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
    this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new Uint16Array(MAX_BITS + 1);
    this.heap = new Uint16Array(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new Uint16Array(2 * L_CODES + 1);
    zero(this.depth);
    this.sym_buf = 0;
    this.lit_bufsize = 0;
    this.sym_next = 0;
    this.sym_end = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  var deflateStateCheck = (strm) => {
    if (!strm) {
      return 1;
    }
    const s = strm.state;
    if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
    s.status !== GZIP_STATE && //#endif
    s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
      return 1;
    }
    return 0;
  };
  var deflateResetKeep = (strm) => {
    if (deflateStateCheck(strm)) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    const s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = //#ifdef GZIP
    s.wrap === 2 ? GZIP_STATE : (
      //#endif
      s.wrap ? INIT_STATE : BUSY_STATE
    );
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = -2;
    _tr_init(s);
    return Z_OK$3;
  };
  var deflateReset = (strm) => {
    const ret = deflateResetKeep(strm);
    if (ret === Z_OK$3) {
      lm_init(strm.state);
    }
    return ret;
  };
  var deflateSetHeader = (strm, head) => {
    if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$2;
    }
    strm.state.gzhead = head;
    return Z_OK$3;
  };
  var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
    if (!strm) {
      return Z_STREAM_ERROR$2;
    }
    let wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    const s = new DeflateState();
    strm.state = s;
    s.strm = strm;
    s.status = INIT_STATE;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new Uint8Array(s.w_size * 2);
    s.head = new Uint16Array(s.hash_size);
    s.prev = new Uint16Array(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new Uint8Array(s.pending_buf_size);
    s.sym_buf = s.lit_bufsize;
    s.sym_end = (s.lit_bufsize - 1) * 3;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  };
  var deflateInit = (strm, level) => {
    return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
  };
  var deflate$2 = (strm, flush) => {
    if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    }
    const s = strm.state;
    if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
    }
    const old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === INIT_STATE && s.wrap === 0) {
      s.status = BUSY_STATE;
    }
    if (s.status === INIT_STATE) {
      let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
      let level_flags = -1;
      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= level_flags << 6;
      if (s.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - header % 31;
      putShortMSB(s, header);
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      strm.adler = 1;
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
    if (s.status === GZIP_STATE) {
      strm.adler = 0;
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) {
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      } else {
        put_byte(
          s,
          (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 255);
        put_byte(s, s.gzhead.time >> 8 & 255);
        put_byte(s, s.gzhead.time >> 16 & 255);
        put_byte(s, s.gzhead.time >> 24 & 255);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, s.gzhead.os & 255);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 255);
          put_byte(s, s.gzhead.extra.length >> 8 & 255);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        let beg = s.pending;
        let left = (s.gzhead.extra.length & 65535) - s.gzindex;
        while (s.pending + left > s.pending_buf_size) {
          let copy = s.pending_buf_size - s.pending;
          s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
          s.pending = s.pending_buf_size;
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          s.gzindex += copy;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
          left -= copy;
        }
        let gzhead_extra = new Uint8Array(s.gzhead.extra);
        s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
        s.pending += left;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex = 0;
      }
      s.status = NAME_STATE;
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        let beg = s.pending;
        let val;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex = 0;
      }
      s.status = COMMENT_STATE;
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        let beg = s.pending;
        let val;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
      }
      s.status = HCRC_STATE;
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        strm.adler = 0;
      }
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
      let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK$3;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          _tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          _tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH$1) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
    }
    if (flush !== Z_FINISH$3) {
      return Z_OK$3;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$3;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
  };
  var deflateEnd = (strm) => {
    if (deflateStateCheck(strm)) {
      return Z_STREAM_ERROR$2;
    }
    const status = strm.state.status;
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
  };
  var deflateSetDictionary = (strm, dictionary) => {
    let dictLength = dictionary.length;
    if (deflateStateCheck(strm)) {
      return Z_STREAM_ERROR$2;
    }
    const s = strm.state;
    const wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR$2;
    }
    if (wrap === 1) {
      strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      let tmpDict = new Uint8Array(s.w_size);
      tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    const avail = strm.avail_in;
    const next = strm.next_in;
    const input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      let str = s.strstart;
      let n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK$3;
  };
  var deflateInit_1 = deflateInit;
  var deflateInit2_1 = deflateInit2;
  var deflateReset_1 = deflateReset;
  var deflateResetKeep_1 = deflateResetKeep;
  var deflateSetHeader_1 = deflateSetHeader;
  var deflate_2$1 = deflate$2;
  var deflateEnd_1 = deflateEnd;
  var deflateSetDictionary_1 = deflateSetDictionary;
  var deflateInfo = "pako deflate (from Nodeca project)";
  var deflate_1$2 = {
    deflateInit: deflateInit_1,
    deflateInit2: deflateInit2_1,
    deflateReset: deflateReset_1,
    deflateResetKeep: deflateResetKeep_1,
    deflateSetHeader: deflateSetHeader_1,
    deflate: deflate_2$1,
    deflateEnd: deflateEnd_1,
    deflateSetDictionary: deflateSetDictionary_1,
    deflateInfo
  };
  var _has = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  var assign = function(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      const source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (const p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  var flattenChunks = (chunks) => {
    let len = 0;
    for (let i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }
    const result = new Uint8Array(len);
    for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
      let chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }
    return result;
  };
  var common = {
    assign,
    flattenChunks
  };
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new Uint8Array(256);
  for (let q = 0; q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = (str) => {
    if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
      return new TextEncoder().encode(str);
    }
    let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new Uint8Array(buf_len);
    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i++] = c;
      } else if (c < 2048) {
        buf[i++] = 192 | c >>> 6;
        buf[i++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i++] = 224 | c >>> 12;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      } else {
        buf[i++] = 240 | c >>> 18;
        buf[i++] = 128 | c >>> 12 & 63;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      }
    }
    return buf;
  };
  var buf2binstring = (buf, len) => {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }
    let result = "";
    for (let i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  };
  var buf2string = (buf, max) => {
    const len = max || buf.length;
    if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
      return new TextDecoder().decode(buf.subarray(0, max));
    }
    let i, out;
    const utf16buf = new Array(len * 2);
    for (out = 0, i = 0; i < len; ) {
      let c = buf[i++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      let c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  var utf8border = (buf, max) => {
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    let pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var strings = {
    string2buf,
    buf2string,
    utf8border
  };
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var zstream = ZStream;
  var toString$1 = Object.prototype.toString;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$1,
    Z_SYNC_FLUSH,
    Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH$2,
    Z_OK: Z_OK$2,
    Z_STREAM_END: Z_STREAM_END$2,
    Z_DEFAULT_COMPRESSION,
    Z_DEFAULT_STRATEGY,
    Z_DEFLATED: Z_DEFLATED$1
  } = constants$2;
  function Deflate$1(options) {
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});
    let opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = deflate_1$2.deflateInit2(
      this.strm,
      opt.level,
      opt.method,
      opt.windowBits,
      opt.memLevel,
      opt.strategy
    );
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    if (opt.header) {
      deflate_1$2.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      let dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = deflate_1$2.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    let status, _flush_mode;
    if (this.ended) {
      return false;
    }
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString$1.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      status = deflate_1$2.deflate(strm, _flush_mode);
      if (status === Z_STREAM_END$2) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }
        status = deflate_1$2.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK$2;
      }
      if (strm.avail_out === 0) {
        this.onData(strm.output);
        continue;
      }
      if (_flush_mode > 0 && strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Deflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK$2) {
      this.result = common.flattenChunks(this.chunks);
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate$1(input, options) {
    const deflator = new Deflate$1(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || messages[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  function gzip$1(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }
  var Deflate_1$1 = Deflate$1;
  var deflate_2 = deflate$1;
  var deflateRaw_1$1 = deflateRaw$1;
  var gzip_1$1 = gzip$1;
  var constants$1 = constants$2;
  var deflate_1$1 = {
    Deflate: Deflate_1$1,
    deflate: deflate_2,
    deflateRaw: deflateRaw_1$1,
    gzip: gzip_1$1,
    constants: constants$1
  };
  var BAD$1 = 16209;
  var TYPE$1 = 16191;
  var inffast = function inflate_fast(strm, start) {
    let _in;
    let last;
    let _out;
    let beg;
    let end;
    let dmax;
    let wsize;
    let whave;
    let wnext;
    let s_window;
    let hold;
    let bits;
    let lcode;
    let dcode;
    let lmask;
    let dmask;
    let here;
    let op;
    let len;
    let dist;
    let from;
    let from_source;
    let input, output;
    const state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (; ; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD$1;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD$1;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
                          output[_out++] = output[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD$1;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE$1;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD$1;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = new Uint16Array([
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ]);
  var lext = new Uint8Array([
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ]);
  var dbase = new Uint16Array([
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ]);
  var dext = new Uint8Array([
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ]);
  var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
    const bits = opts.bits;
    let len = 0;
    let sym = 0;
    let min = 0, max = 0;
    let root = 0;
    let curr = 0;
    let drop = 0;
    let left = 0;
    let used = 0;
    let huff = 0;
    let incr;
    let fill;
    let low;
    let mask;
    let next;
    let base = null;
    let match;
    const count = new Uint16Array(MAXBITS + 1);
    const offs = new Uint16Array(MAXBITS + 1);
    let extra = null;
    let here_bits, here_op, here_val;
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES$1 || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES$1) {
      base = extra = work;
      match = 20;
    } else if (type === LENS$1) {
      base = lbase;
      extra = lext;
      match = 257;
    } else {
      base = dbase;
      extra = dext;
      match = 0;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask = used - 1;
    if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    for (; ; ) {
      here_bits = len - drop;
      if (work[sym] + 1 < match) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] >= match) {
        here_op = extra[work[sym] - match];
        here_val = base[work[sym] - match];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        low = huff & mask;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
  var inftrees = inflate_table;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var {
    Z_FINISH: Z_FINISH$1,
    Z_BLOCK,
    Z_TREES,
    Z_OK: Z_OK$1,
    Z_STREAM_END: Z_STREAM_END$1,
    Z_NEED_DICT: Z_NEED_DICT$1,
    Z_STREAM_ERROR: Z_STREAM_ERROR$1,
    Z_DATA_ERROR: Z_DATA_ERROR$1,
    Z_MEM_ERROR: Z_MEM_ERROR$1,
    Z_BUF_ERROR,
    Z_DEFLATED
  } = constants$2;
  var HEAD = 16180;
  var FLAGS = 16181;
  var TIME = 16182;
  var OS = 16183;
  var EXLEN = 16184;
  var EXTRA = 16185;
  var NAME = 16186;
  var COMMENT = 16187;
  var HCRC = 16188;
  var DICTID = 16189;
  var DICT = 16190;
  var TYPE = 16191;
  var TYPEDO = 16192;
  var STORED = 16193;
  var COPY_ = 16194;
  var COPY = 16195;
  var TABLE = 16196;
  var LENLENS = 16197;
  var CODELENS = 16198;
  var LEN_ = 16199;
  var LEN = 16200;
  var LENEXT = 16201;
  var DIST = 16202;
  var DISTEXT = 16203;
  var MATCH = 16204;
  var LIT = 16205;
  var CHECK = 16206;
  var LENGTH = 16207;
  var DONE = 16208;
  var BAD = 16209;
  var MEM = 16210;
  var SYNC = 16211;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  var zswap32 = (q) => {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  };
  function InflateState() {
    this.strm = null;
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new Uint16Array(320);
    this.work = new Uint16Array(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  var inflateStateCheck = (strm) => {
    if (!strm) {
      return 1;
    }
    const state = strm.state;
    if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
      return 1;
    }
    return 0;
  };
  var inflateResetKeep = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.flags = -1;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
    state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK$1;
  };
  var inflateReset = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  };
  var inflateReset2 = (strm, windowBits) => {
    let wrap;
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 5;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  };
  var inflateInit2 = (strm, windowBits) => {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    const state = new InflateState();
    strm.state = state;
    state.strm = strm;
    state.window = null;
    state.mode = HEAD;
    const ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$1) {
      strm.state = null;
    }
    return ret;
  };
  var inflateInit = (strm) => {
    return inflateInit2(strm, DEF_WBITS);
  };
  var virgin = true;
  var lenfix;
  var distfix;
  var fixedtables = (state) => {
    if (virgin) {
      lenfix = new Int32Array(512);
      distfix = new Int32Array(32);
      let sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  };
  var updatewindow = (strm, src, end, copy) => {
    let dist;
    const state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new Uint8Array(state.wsize);
    }
    if (copy >= state.wsize) {
      state.window.set(src.subarray(end - state.wsize, end), 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
      copy -= dist;
      if (copy) {
        state.window.set(src.subarray(end - copy, end), 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  };
  var inflate$2 = (strm, flush) => {
    let state;
    let input, output;
    let next;
    let put;
    let have, left;
    let hold;
    let bits;
    let _in, _out;
    let copy;
    let from;
    let from_source;
    let here = 0;
    let here_bits, here_op, here_val;
    let last_bits, last_op, last_val;
    let len;
    let ret;
    const hbuf = new Uint8Array(4);
    let opts;
    let n;
    const order = (
      /* permutation of code lengths */
      new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
    );
    if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK$1;
    inf_leave:
      for (; ; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              if (state.wbits === 0) {
                state.wbits = 15;
              }
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || /* check if zlib header allowed */
            (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            }
            if (len > 15 || len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << state.wbits;
            state.flags = 0;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32_1(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512 && state.wrap & 4) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Uint8Array(state.head.extra_len);
                  }
                  state.head.extra.set(
                    input.subarray(
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      next + copy
                    ),
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len
                  );
                }
                if (state.flags & 512 && state.wrap & 4) {
                  state.check = crc32_1(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 4 && hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT$1;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              output.set(input.subarray(next, next + copy), put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = { bits: state.lenbits };
            ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = { bits: state.lenbits };
            ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inffast(strm, _out);
              put = strm.next_out;
              output = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (; ; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (state.wrap & 4 && _out) {
                strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
              }
              _out = left;
              if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END$1;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR$1;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR$1;
          case SYNC:
          default:
            return Z_STREAM_ERROR$1;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
        ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap & 4 && _out) {
      strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
      state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  };
  var inflateEnd = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    let state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK$1;
  };
  var inflateGetHeader = (strm, head) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR$1;
    }
    state.head = head;
    head.done = false;
    return Z_OK$1;
  };
  var inflateSetDictionary = (strm, dictionary) => {
    const dictLength = dictionary.length;
    let state;
    let dictid;
    let ret;
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR$1;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32_1(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR$1;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR$1;
    }
    state.havedict = 1;
    return Z_OK$1;
  };
  var inflateReset_1 = inflateReset;
  var inflateReset2_1 = inflateReset2;
  var inflateResetKeep_1 = inflateResetKeep;
  var inflateInit_1 = inflateInit;
  var inflateInit2_1 = inflateInit2;
  var inflate_2$1 = inflate$2;
  var inflateEnd_1 = inflateEnd;
  var inflateGetHeader_1 = inflateGetHeader;
  var inflateSetDictionary_1 = inflateSetDictionary;
  var inflateInfo = "pako inflate (from Nodeca project)";
  var inflate_1$2 = {
    inflateReset: inflateReset_1,
    inflateReset2: inflateReset2_1,
    inflateResetKeep: inflateResetKeep_1,
    inflateInit: inflateInit_1,
    inflateInit2: inflateInit2_1,
    inflate: inflate_2$1,
    inflateEnd: inflateEnd_1,
    inflateGetHeader: inflateGetHeader_1,
    inflateSetDictionary: inflateSetDictionary_1,
    inflateInfo
  };
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  var gzheader = GZheader;
  var toString = Object.prototype.toString;
  var {
    Z_NO_FLUSH,
    Z_FINISH,
    Z_OK,
    Z_STREAM_END,
    Z_NEED_DICT,
    Z_STREAM_ERROR,
    Z_DATA_ERROR,
    Z_MEM_ERROR
  } = constants$2;
  function Inflate$1(options) {
    this.options = common.assign({
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ""
    }, options || {});
    const opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = inflate_1$2.inflateInit2(
      this.strm,
      opt.windowBits
    );
    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }
    this.header = new gzheader();
    inflate_1$2.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  Inflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    const dictionary = this.options.dictionary;
    let status, _flush_mode, last_avail_out;
    if (this.ended)
      return false;
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = inflate_1$2.inflate(strm, _flush_mode);
      if (status === Z_NEED_DICT && dictionary) {
        status = inflate_1$2.inflateSetDictionary(strm, dictionary);
        if (status === Z_OK) {
          status = inflate_1$2.inflate(strm, _flush_mode);
        } else if (status === Z_DATA_ERROR) {
          status = Z_NEED_DICT;
        }
      }
      while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
        inflate_1$2.inflateReset(strm);
        status = inflate_1$2.inflate(strm, _flush_mode);
      }
      switch (status) {
        case Z_STREAM_ERROR:
        case Z_DATA_ERROR:
        case Z_NEED_DICT:
        case Z_MEM_ERROR:
          this.onEnd(status);
          this.ended = true;
          return false;
      }
      last_avail_out = strm.avail_out;
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === Z_STREAM_END) {
          if (this.options.to === "string") {
            let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            let tail = strm.next_out - next_out_utf8;
            let utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail)
              strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
            this.onData(utf8str);
          } else {
            this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
          }
        }
      }
      if (status === Z_OK && last_avail_out === 0)
        continue;
      if (status === Z_STREAM_END) {
        status = inflate_1$2.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return true;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Inflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate$1(input, options) {
    const inflator = new Inflate$1(options);
    inflator.push(input);
    if (inflator.err)
      throw inflator.msg || messages[inflator.err];
    return inflator.result;
  }
  function inflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  var Inflate_1$1 = Inflate$1;
  var inflate_2 = inflate$1;
  var inflateRaw_1$1 = inflateRaw$1;
  var ungzip$1 = inflate$1;
  var constants = constants$2;
  var inflate_1$1 = {
    Inflate: Inflate_1$1,
    inflate: inflate_2,
    inflateRaw: inflateRaw_1$1,
    ungzip: ungzip$1,
    constants
  };
  var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
  var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
  var Deflate_1 = Deflate;
  var deflate_1 = deflate;
  var deflateRaw_1 = deflateRaw;
  var gzip_1 = gzip;
  var Inflate_1 = Inflate;
  var inflate_1 = inflate;
  var inflateRaw_1 = inflateRaw;
  var ungzip_1 = ungzip;
  var constants_1 = constants$2;
  var pako = {
    Deflate: Deflate_1,
    deflate: deflate_1,
    deflateRaw: deflateRaw_1,
    gzip: gzip_1,
    Inflate: Inflate_1,
    inflate: inflate_1,
    inflateRaw: inflateRaw_1,
    ungzip: ungzip_1,
    constants: constants_1
  };

  // ../src/shared/utils.ts
  function _array_like_to_array4(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes4(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _array_without_holes(arr) {
    if (Array.isArray(arr))
      return _array_like_to_array4(arr);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _define_property3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _iterable_to_array_limit4(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _object_spread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key) {
        _define_property3(target, key, source[key]);
      });
    }
    return target;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _sliced_to_array4(arr, i) {
    return _array_with_holes4(arr) || _iterable_to_array_limit4(arr, i) || _unsupported_iterable_to_array4(arr, i) || _non_iterable_rest4();
  }
  function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array4(arr) || _non_iterable_spread();
  }
  function _unsupported_iterable_to_array4(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array4(o, minLen);
  }
  function _ts_generator(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  function Cacheable(getValueCb, options) {
    var key = "_";
    var map = CacheableMap(function(ctx, _) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return getValueCb.apply(void 0, [
        ctx
      ].concat(_to_consumable_array(args)));
    }, options);
    return {
      get: function get() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var _map;
        return (_map = map).get.apply(_map, [
          key
        ].concat(_to_consumable_array(args)));
      },
      reset: function reset() {
        map.reset(key);
      }
    };
  }
  function CacheableMap(getValueCb, options) {
    var ttl = options.timeToLive || 1764;
    var cachedValues = {};
    function ensureCachedValue(key) {
      return _ensureCachedValue.apply(this, arguments);
    }
    function _ensureCachedValue() {
      _ensureCachedValue = _async_to_generator(function(key) {
        var _len, args, _key, cachedValue, now, _ref, shouldCache, value;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
          switch (_state.label) {
            case 0:
              for (_len = _arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = _arguments[_key];
              }
              cachedValue = cachedValues[key];
              if (!cachedValue) {
                cachedValue = {
                  value: null,
                  lastUpdated: 0
                };
                cachedValues[key] = cachedValue;
              }
              now = Date.now();
              if (!(cachedValue.lastUpdated === 0 || now - cachedValue.lastUpdated > ttl))
                return [
                  3,
                  2
                ];
              return [
                4,
                getValueCb.apply(void 0, [
                  cachedValue,
                  key
                ].concat(_to_consumable_array(args)))
              ];
            case 1:
              _ref = _sliced_to_array4.apply(void 0, [
                _state.sent(),
                2
              ]), shouldCache = _ref[0], value = _ref[1];
              if (shouldCache) {
                cachedValue.lastUpdated = now;
                cachedValue.value = value;
              }
              return [
                2,
                value
              ];
            case 2:
              return [
                4,
                new Promise(function(resolve) {
                  return setTimeout(function() {
                    return resolve(cachedValue.value);
                  }, 0);
                })
              ];
            case 3:
              return [
                2,
                _state.sent()
              ];
          }
        });
      });
      return _ensureCachedValue.apply(this, arguments);
    }
    return {
      get: function() {
        var _ref = _async_to_generator(function(key) {
          var _len, args, _key;
          var _arguments = arguments;
          return _ts_generator(this, function(_state) {
            switch (_state.label) {
              case 0:
                for (_len = _arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _arguments[_key];
                }
                return [
                  4,
                  ensureCachedValue.apply(void 0, [
                    key
                  ].concat(_to_consumable_array(args)))
                ];
              case 1:
                return [
                  2,
                  _state.sent()
                ];
            }
          });
        });
        return function(key) {
          return _ref.apply(this, arguments);
        };
      }(),
      reset: function reset(key) {
        var cachedValue = cachedValues[key];
        if (cachedValue)
          cachedValue.lastUpdated = 0;
      }
    };
  }
  function getUUID() {
    return v4_default();
  }
  function hashString(pString) {
    return v5_default(pString, v5_default.URL);
  }
  function WaitForCondition(conditionCallback, timeoutMS) {
    return new Promise(function(resolve, reject) {
      var start = Date.now();
      var tickId = setInterval(function() {
        var hasTimedOut = Date.now() - start > timeoutMS;
        if (conditionCallback() || hasTimedOut) {
          clearInterval(tickId);
          return resolve(hasTimedOut);
        }
      }, 1);
    });
  }
  function Wait(pTime) {
    return new Promise(function(resolve) {
      return setTimeout(function() {
        return resolve();
      }, pTime);
    });
  }
  function WaitForNextFrame() {
    return Wait(0);
  }
  var Utils = _object_spread_props(_object_spread({
    cache: Cacheable,
    cacheableMap: CacheableMap,
    waitForCondition: WaitForCondition,
    getUUID,
    getStringHash: hashString,
    wait: Wait,
    waitForNextFrame: WaitForNextFrame,
    deflate: pako.deflate,
    inflate: pako.inflate
  }, MathUtils), {
    MathUtils
  });

  // ../src/shared/anime.ts
  var CryptoJS = __toESM(require_crypto_js());

  // ../src/shared/logger.ts
  function _array_like_to_array5(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_without_holes2(arr) {
    if (Array.isArray(arr))
      return _array_like_to_array5(arr);
  }
  function _iterable_to_array2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _non_iterable_spread2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array2(arr) {
    return _array_without_holes2(arr) || _iterable_to_array2(arr) || _unsupported_iterable_to_array5(arr) || _non_iterable_spread2();
  }
  function _unsupported_iterable_to_array5(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array5(o, minLen);
  }
  var LOG_LEVELS = {
    warning: 1,
    log: 2,
    error: 3,
    debug: 4
  };
  var resourceLogLevel = typeof GetConvar === "function" ? GetConvar("".concat(GetCurrentResourceName(), "_logLevel"), "") : "";
  var logLevel = typeof GetConvar === "function" ? GetConvar("sv_loglevel", "warning") : "warning";
  logLevel = (resourceLogLevel === null || resourceLogLevel === void 0 ? void 0 : resourceLogLevel.length) > 0 ? resourceLogLevel : logLevel;
  (function() {
    if (!LOG_LEVELS[logLevel]) {
      throw new Error("Invalid log level: ".concat(logLevel));
    }
  })();
  var warning = function() {
    return LOG_LEVELS[logLevel] >= LOG_LEVELS["warning"];
  };
  var log = function() {
    return LOG_LEVELS[logLevel] >= LOG_LEVELS["log"];
  };
  var error = function() {
    return LOG_LEVELS[logLevel] >= LOG_LEVELS["error"];
  };
  var debug = function() {
    return logLevel === "debug";
  };
  var Logger = {
    warning: function(text) {
      for (var _len = arguments.length, input = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        input[_key - 1] = arguments[_key];
      }
      var _console;
      if (!warning())
        return;
      (_console = console).log.apply(_console, [
        "^3[WARNING] ^7".concat(text)
      ].concat(_to_consumable_array2(input), [
        "^0"
      ]));
    },
    log: function(text) {
      for (var _len = arguments.length, input = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        input[_key - 1] = arguments[_key];
      }
      var _console;
      if (!log())
        return;
      (_console = console).log.apply(_console, [
        "^5[cool] ^7".concat(text)
      ].concat(_to_consumable_array2(input), [
        "^0"
      ]));
    },
    debug: function(text) {
      for (var _len = arguments.length, input = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        input[_key - 1] = arguments[_key];
      }
      var _console;
      if (!debug())
        return;
      (_console = console).log.apply(_console, [
        "^2[D] ".concat(text)
      ].concat(_to_consumable_array2(input), [
        "^0"
      ]));
    },
    error: function(text) {
      for (var _len = arguments.length, input = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        input[_key - 1] = arguments[_key];
      }
      var _console;
      if (!error())
        return;
      (_console = console).log.apply(_console, [
        "^1[ERROR] ".concat(text)
      ].concat(_to_consumable_array2(input), [
        "^0"
      ]));
    }
  };

  // ../src/shared/anime.ts
  var GenerateKey = function() {
    var length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 128;
    return CryptoJS.lib.WordArray.random(length / 8).toString();
  };
  var EncodeAES = function(payload, passphrase) {
    if (typeof payload !== "string" || typeof passphrase !== "string")
      return "";
    return CryptoJS.AES.encrypt(payload, passphrase).toString();
  };
  var DecodeAES = function(payload, passphrase) {
    if (typeof payload !== "string" || typeof passphrase !== "string")
      return "";
    return CryptoJS.AES.decrypt(payload, passphrase).toString(CryptoJS.enc.Utf8);
  };
  var EncodeBase64 = function(payload) {
    if (typeof payload !== "string")
      return "";
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payload));
  };
  var HashHMACMD5 = function(payload, secret) {
    return EncodeBase64((0, CryptoJS.HmacMD5)(payload, secret).toString());
  };
  var StringCache = {};
  var EncodeString = function(event) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : GenerateKey();
    if (StringCache[event] === void 0) {
      StringCache[event] = HashHMACMD5(event, key);
    }
    return StringCache[event];
  };
  var EncodePayload = function(payload) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : GenerateKey();
    try {
      return EncodeAES(JSON.stringify(payload), key);
    } catch (e) {
      Logger.error("Failed to encode payload");
    }
  };
  var DecodePayload = function(payload) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : GenerateKey();
    try {
      return JSON.parse(DecodeAES(payload, key));
    } catch (e) {
      Logger.error("Failed to decode payload");
    }
  };

  // ../src/client/modules/nui/controller.ts
  function _array_like_to_array6(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes5(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _array_without_holes3(arr) {
    if (Array.isArray(arr))
      return _array_like_to_array6(arr);
  }
  function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator2(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _check_private_redeclaration3(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
      if (!descriptor.get) {
        throw new TypeError("attempted to read set only private field");
      }
      if (!("__destrWrapper" in descriptor)) {
        descriptor.__destrWrapper = {
          set value(v) {
            descriptor.set.call(receiver, v);
          },
          get value() {
            return descriptor.get.call(receiver);
          }
        };
      }
      return descriptor.__destrWrapper;
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      return descriptor;
    }
  }
  function _class_call_check3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
    return _class_apply_descriptor_get(receiver, descriptor);
  }
  function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration3(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
    _class_apply_descriptor_set(receiver, descriptor, value);
    return value;
  }
  function _class_private_field_update(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "update");
    return _class_apply_descriptor_update(receiver, descriptor);
  }
  function _class_private_method_get3(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init3(obj, privateSet) {
    _check_private_redeclaration3(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class3(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties3(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties3(Constructor, staticProps);
    return Constructor;
  }
  function _iterable_to_array3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _iterable_to_array_limit5(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest5() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _non_iterable_spread3() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array5(arr, i) {
    return _array_with_holes5(arr) || _iterable_to_array_limit5(arr, i) || _unsupported_iterable_to_array6(arr, i) || _non_iterable_rest5();
  }
  function _to_consumable_array3(arr) {
    return _array_without_holes3(arr) || _iterable_to_array3(arr) || _unsupported_iterable_to_array6(arr) || _non_iterable_spread3();
  }
  function _unsupported_iterable_to_array6(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array6(o, minLen);
  }
  function _ts_generator2(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v1) {
        return step([
          n,
          v1
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var _resource = /* @__PURE__ */ new WeakMap();
  var _H = /* @__PURE__ */ new WeakMap();
  var _I = /* @__PURE__ */ new WeakMap();
  var _O = /* @__PURE__ */ new WeakMap();
  var _ready = /* @__PURE__ */ new WeakMap();
  var _count = /* @__PURE__ */ new WeakMap();
  var _queue = /* @__PURE__ */ new WeakMap();
  var _pending = /* @__PURE__ */ new WeakMap();
  var _onRaw = /* @__PURE__ */ new WeakSet();
  var _on = /* @__PURE__ */ new WeakSet();
  var _emitRaw = /* @__PURE__ */ new WeakSet();
  var _emit = /* @__PURE__ */ new WeakSet();
  var _init = /* @__PURE__ */ new WeakSet();
  var _class = /* @__PURE__ */ function() {
    "use strict";
    function _class5() {
      _class_call_check3(this, _class5);
      _class_private_method_init3(this, _onRaw);
      _class_private_method_init3(this, _on);
      _class_private_method_init3(this, _emitRaw);
      _class_private_method_init3(this, _emit);
      _class_private_method_init3(this, _init);
      _class_private_field_init(this, _resource, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _H, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _I, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _O, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _ready, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _count, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _queue, {
        writable: true,
        value: void 0
      });
      _class_private_field_init(this, _pending, {
        writable: true,
        value: void 0
      });
      _class_private_field_set(this, _resource, GetCurrentResourceName());
      _class_private_field_set(this, _H, GenerateKey(64));
      _class_private_field_set(this, _I, GenerateKey(64));
      _class_private_field_set(this, _O, GenerateKey(64));
      _class_private_field_set(this, _ready, false);
      _class_private_field_set(this, _count, 0);
      _class_private_field_set(this, _queue, []);
      _class_private_field_set(this, _pending, /* @__PURE__ */ new Map());
      _class_private_method_get3(this, _onRaw, onRaw).call(this, "__cpx_sdk:init", _class_private_method_get3(this, _init, init).bind(this));
    }
    _create_class3(_class5, [
      {
        key: "register",
        value: function register(event, callback) {
          var _this = this;
          return _async_to_generator2(function() {
            return _ts_generator2(this, function(_state) {
              _class_private_method_get3(_this, _on, on2).call(_this, "__nui_req:".concat(event), function() {
                var _ref = _async_to_generator2(function(meta, args) {
                  var response, success, metadata, e;
                  return _ts_generator2(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        metadata = DecodePayload(meta, _class_private_field_get(_this, _I));
                        if (!(metadata === null || metadata === void 0 ? void 0 : metadata.id) || !(metadata === null || metadata === void 0 ? void 0 : metadata.resource)) {
                          return [
                            2,
                            Logger.error("[NUI] ".concat(event, " - Invalid metadata received"))
                          ];
                        }
                        _state2.label = 1;
                      case 1:
                        _state2.trys.push([
                          1,
                          3,
                          ,
                          4
                        ]);
                        return [
                          4,
                          callback.apply(void 0, _to_consumable_array3(args))
                        ];
                      case 2:
                        response = _state2.sent();
                        success = true;
                        return [
                          3,
                          4
                        ];
                      case 3:
                        e = _state2.sent();
                        response = e.message;
                        success = false;
                        return [
                          3,
                          4
                        ];
                      case 4:
                        _class_private_method_get3(_this, _emit, emit2).call(_this, "__nui_res:".concat(metadata.resource), metadata.id, [
                          success,
                          response
                        ]);
                        return [
                          2
                        ];
                    }
                  });
                });
                return function(meta, args) {
                  return _ref.apply(this, arguments);
                };
              }());
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "remove",
        value: function remove(event) {
          var hash = EncodeString("__nui_req:".concat(event), _class_private_field_get(this, _H));
          UnregisterRawNuiCallback(hash);
        }
      },
      {
        key: "execute",
        value: function execute(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var _this = this;
          return _async_to_generator2(function() {
            var metadata, promise;
            return _ts_generator2(this, function(_state) {
              metadata = {
                id: ++_class_private_field_update(_this, _count).value,
                resource: _class_private_field_get(_this, _resource)
              };
              promise = new Promise(function(resolve, reject) {
                var timeout;
                if (_class_private_field_get(_this, _ready)) {
                  timeout = +setTimeout(function() {
                    return reject(new Error("RPC timed out | ".concat(event)));
                  }, 6e4);
                } else {
                  timeout = 0;
                }
                _class_private_field_get(_this, _pending).set(metadata.id, {
                  resolve,
                  reject,
                  timeout
                });
              });
              promise["finally"](function() {
                return _class_private_field_get(_this, _pending)["delete"](metadata.id);
              });
              if (!_class_private_field_get(_this, _ready)) {
                _class_private_field_get(_this, _queue).push({
                  type: "execute",
                  event: "__nui_req:".concat(event),
                  metadata,
                  args
                });
              } else {
                _class_private_method_get3(_this, _emit, emit2).call(_this, "__nui_req:".concat(event), EncodePayload(metadata, _class_private_field_get(_this, _O)), args);
              }
              return [
                2,
                promise
              ];
            });
          })();
        }
      }
    ]);
    return _class5;
  }();
  function onRaw(event, callback) {
    RegisterNuiCallback(event, function(param, cb) {
      var args = param.args;
      cb(true);
      return callback.apply(void 0, _to_consumable_array3(args));
    });
  }
  function on2(event, callback) {
    if (_class_private_field_get(this, _ready)) {
      var hash = EncodeString(event, _class_private_field_get(this, _H));
      return _class_private_method_get3(this, _onRaw, onRaw).call(this, hash, callback);
    }
    _class_private_field_get(this, _queue).push({
      type: "on",
      event,
      callback
    });
  }
  function emitRaw(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    SendNuiMessage(JSON.stringify({
      event,
      args
    }, null));
  }
  function emit2(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (_class_private_field_get(this, _ready)) {
      var _$_class_private_method_get;
      var hash = EncodeString(event, _class_private_field_get(this, _H));
      return (_$_class_private_method_get = _class_private_method_get3(this, _emitRaw, emitRaw)).call.apply(_$_class_private_method_get, [
        this,
        hash
      ].concat(_to_consumable_array3(args)));
    }
    _class_private_field_get(this, _queue).push({
      type: "emit",
      event,
      args
    });
  }
  function init() {
    return _init1.apply(this, arguments);
  }
  function _init1() {
    _init1 = _async_to_generator2(function() {
      var _this, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _this1, _loop, _iterator, _step;
      return _ts_generator2(this, function(_state) {
        _this = this;
        if (_class_private_field_get(this, _ready))
          return [
            2,
            Logger.error("[NUI] SDK already initialized")
          ];
        _class_private_field_set(this, _ready, true);
        _class_private_method_get3(this, _on, on2).call(this, "__nui_res:".concat(_class_private_field_get(this, _resource)), function(id, param) {
          var _param = _sliced_to_array5(param, 2), success = _param[0], response = _param[1];
          if (!id)
            return Logger.error("[NUI] Invalid response received");
          var pending = _class_private_field_get(_this, _pending).get(id);
          if (!pending)
            return Logger.error("[NUI] Invalid response received");
          clearTimeout(pending.timeout);
          if (success) {
            pending.resolve(response);
          } else {
            pending.reject(response);
          }
        });
        _class_private_method_get3(this, _emitRaw, emitRaw).call(this, "__cpx_sdk:ready", EncodeBase64("".concat(_class_private_field_get(this, _H), ":").concat(_class_private_field_get(this, _I), ":").concat(_class_private_field_get(this, _O))));
        Logger.debug("[NUI] SDK initialized");
        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
        try {
          _this1 = this, _loop = function() {
            var item = _step.value;
            if (item.type === "on") {
              _class_private_method_get3(_this1, _on, on2).call(_this1, item.event, item.callback);
            } else if (item.type === "emit") {
              var _$_class_private_method_get;
              setTimeout(function() {
                return (_$_class_private_method_get = _class_private_method_get3(_this, _emit, emit2)).call.apply(_$_class_private_method_get, [
                  _this,
                  item.event
                ].concat(_to_consumable_array3(item.args)));
              }, 1e3);
            } else if (item.type === "execute") {
              var pending = _class_private_field_get(_this1, _pending).get(item.metadata.id);
              if (!pending) {
                Logger.error("[RPC] ".concat(item.event, " - Failed to execute queued RPC call"));
                return "continue";
              }
              pending.timeout = +setTimeout(function() {
                return pending.reject(new Error("RPC timed out | ".concat(item.event)));
              }, 6e4);
              setTimeout(function() {
                return _class_private_method_get3(_this, _emit, emit2).call(_this, item.event, EncodePayload(item.metadata, _class_private_field_get(_this, _O)), item.args);
              }, 1e3);
            }
          };
          for (_iterator = _class_private_field_get(this, _queue)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)
            _loop();
        } catch (err2) {
          _didIteratorError = true;
          _iteratorError = err2;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        return [
          2
        ];
      });
    });
    return _init1.apply(this, arguments);
  }

  // ../src/client/modules/nui/index.ts
  var NUI = new _class();

  // ../src/client/modules/index.ts
  function asyncGeneratorStep3(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator3(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep3(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep3(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _check_private_redeclaration4(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_apply_descriptor_get2(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _class_apply_descriptor_set2(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _class_call_check4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_extract_field_descriptor2(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _class_private_field_get2(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor2(receiver, privateMap, "get");
    return _class_apply_descriptor_get2(receiver, descriptor);
  }
  function _class_private_field_init2(obj, privateMap, value) {
    _check_private_redeclaration4(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _class_private_field_set2(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor2(receiver, privateMap, "set");
    _class_apply_descriptor_set2(receiver, descriptor, value);
    return value;
  }
  function _class_private_method_get4(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init4(obj, privateSet) {
    _check_private_redeclaration4(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties4(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class4(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties4(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties4(Constructor, staticProps);
    return Constructor;
  }
  function _ts_generator3(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var _codename = /* @__PURE__ */ new WeakMap();
  var _version = /* @__PURE__ */ new WeakMap();
  var _resourceName = /* @__PURE__ */ new WeakMap();
  var _projectName = /* @__PURE__ */ new WeakMap();
  var _apiURL = /* @__PURE__ */ new WeakMap();
  var _apiKey = /* @__PURE__ */ new WeakMap();
  var _ready2 = /* @__PURE__ */ new WeakMap();
  var _onReadyCallbacks = /* @__PURE__ */ new WeakMap();
  var _init2 = /* @__PURE__ */ new WeakSet();
  var Resource = /* @__PURE__ */ function() {
    "use strict";
    function Resource2(resource2) {
      _class_call_check4(this, Resource2);
      _class_private_method_init4(this, _init2);
      _class_private_field_init2(this, _codename, {
        writable: true,
        value: void 0
      });
      _class_private_field_init2(this, _version, {
        writable: true,
        value: void 0
      });
      _class_private_field_init2(this, _resourceName, {
        writable: true,
        value: void 0
      });
      _class_private_field_init2(this, _projectName, {
        writable: true,
        value: void 0
      });
      _class_private_field_init2(this, _apiURL, {
        writable: true,
        value: ""
      });
      _class_private_field_init2(this, _apiKey, {
        writable: true,
        value: ""
      });
      _class_private_field_init2(this, _ready2, {
        writable: true,
        value: false
      });
      _class_private_field_init2(this, _onReadyCallbacks, {
        writable: true,
        value: []
      });
      var info = resource2;
      _class_private_field_set2(this, _codename, info.codename);
      _class_private_field_set2(this, _version, info.version);
      _class_private_field_set2(this, _resourceName, GetCurrentResourceName());
      _class_private_field_set2(this, _projectName, "cool-ts-boilerplate");
      emit("__cpx_core:handshake", info, _class_private_method_get4(this, _init2, init2).bind(this));
      var _this = this;
      NUI.register("__cpx_core:handshake", function() {
        var _ref = _async_to_generator3(function(info2) {
          var timedOut;
          return _ts_generator3(this, function(_state) {
            switch (_state.label) {
              case 0:
                if (info2.codename !== _class_private_field_get2(_this, _codename))
                  return [
                    2
                  ];
                return [
                  4,
                  Utils.waitForCondition(function() {
                    return _class_private_field_get2(_this, _ready2);
                  }, 484)
                ];
              case 1:
                timedOut = _state.sent();
                if (timedOut)
                  return [
                    2
                  ];
                return [
                  2,
                  {
                    API_URL: _class_private_field_get2(_this, _apiURL),
                    API_KEY: _class_private_field_get2(_this, _apiKey)
                  }
                ];
            }
          });
        });
        return function(info2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    _create_class4(Resource2, [
      {
        key: "codename",
        get: function get() {
          return _class_private_field_get2(this, _codename);
        }
      },
      {
        key: "version",
        get: function get() {
          return _class_private_field_get2(this, _version);
        }
      },
      {
        key: "isReady",
        get: function get() {
          return _class_private_field_get2(this, _ready2);
        }
      },
      {
        key: "onReady",
        value: function onReady(callback) {
          if (_class_private_field_get2(this, _ready2)) {
            callback();
          } else {
            _class_private_field_get2(this, _onReadyCallbacks).push(callback);
          }
        }
      }
    ]);
    return Resource2;
  }();
  function init2(handshake) {
    return _init12.apply(this, arguments);
  }
  function _init12() {
    _init12 = _async_to_generator3(function(handshake) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, callback;
      return _ts_generator3(this, function(_state) {
        _class_private_field_set2(this, _apiURL, handshake.API_URL);
        _class_private_field_set2(this, _apiKey, handshake.API_KEY);
        _class_private_field_set2(this, _ready2, true);
        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
        try {
          for (_iterator = _class_private_field_get2(this, _onReadyCallbacks)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            callback = _step.value;
            callback();
          }
        } catch (err2) {
          _didIteratorError = true;
          _iteratorError = err2;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        return [
          2
        ];
      });
    });
    return _init12.apply(this, arguments);
  }

  // ../src/shared/hashing.ts
  var CryptoJS2 = __toESM(require_crypto_js());
  function _array_like_to_array7(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes6(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _check_private_redeclaration5(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_apply_descriptor_get3(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _class_apply_descriptor_set3(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _class_call_check5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_extract_field_descriptor3(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _class_private_field_get3(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor3(receiver, privateMap, "get");
    return _class_apply_descriptor_get3(receiver, descriptor);
  }
  function _class_private_field_init3(obj, privateMap, value) {
    _check_private_redeclaration5(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _class_private_field_set3(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor3(receiver, privateMap, "set");
    _class_apply_descriptor_set3(receiver, descriptor, value);
    return value;
  }
  function _class_private_method_get5(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init5(obj, privateSet) {
    _check_private_redeclaration5(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties5(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class5(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties5(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties5(Constructor, staticProps);
    return Constructor;
  }
  function _iterable_to_array_limit6(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest6() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array6(arr, i) {
    return _array_with_holes6(arr) || _iterable_to_array_limit6(arr, i) || _unsupported_iterable_to_array7(arr, i) || _non_iterable_rest6();
  }
  function _unsupported_iterable_to_array7(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array7(o, minLen);
  }
  var _H2 = /* @__PURE__ */ new WeakMap();
  var _I2 = /* @__PURE__ */ new WeakMap();
  var _O2 = /* @__PURE__ */ new WeakMap();
  var _cache = /* @__PURE__ */ new WeakMap();
  var _hashKey = /* @__PURE__ */ new WeakSet();
  var _decodeKey = /* @__PURE__ */ new WeakSet();
  var _encodeKey = /* @__PURE__ */ new WeakSet();
  var _encodeBase64 = /* @__PURE__ */ new WeakSet();
  var _decodeBase64 = /* @__PURE__ */ new WeakSet();
  var _encodeAES = /* @__PURE__ */ new WeakSet();
  var _decodeAES = /* @__PURE__ */ new WeakSet();
  var _generateKey = /* @__PURE__ */ new WeakSet();
  var _class2 = /* @__PURE__ */ function() {
    "use strict";
    function _class5(pToken, pSecret) {
      var _this = this;
      _class_call_check5(this, _class5);
      _class_private_method_init5(this, _hashKey);
      _class_private_method_init5(this, _decodeKey);
      _class_private_method_init5(this, _encodeKey);
      _class_private_method_init5(this, _encodeBase64);
      _class_private_method_init5(this, _decodeBase64);
      _class_private_method_init5(this, _encodeAES);
      _class_private_method_init5(this, _decodeAES);
      _class_private_method_init5(this, _generateKey);
      _class_private_field_init3(this, _H2, {
        writable: true,
        value: void 0
      });
      _class_private_field_init3(this, _I2, {
        writable: true,
        value: void 0
      });
      _class_private_field_init3(this, _O2, {
        writable: true,
        value: void 0
      });
      _class_private_field_init3(this, _cache, {
        writable: true,
        value: void 0
      });
      var token = _class_private_method_get5(this, _decodeBase64, decodeBase64).call(this, pToken);
      var decoded = token.split(":").map(function(string, index) {
        return _class_private_method_get5(_this, _decodeAES, decodeAES).call(_this, string, pSecret);
      });
      var _decoded = _sliced_to_array6(decoded, 3), h = _decoded[0], i = _decoded[1], o = _decoded[2];
      _class_private_field_set3(this, _H2, h);
      _class_private_field_set3(this, _I2, i);
      _class_private_field_set3(this, _O2, o);
      _class_private_field_set3(this, _cache, {});
    }
    _create_class5(_class5, [
      {
        key: "hashString",
        value: function hashString2(string) {
          var _class_private_field_get_key, _$_class_private_field_get, _$_class_private_field_get1;
          var key = _class_private_method_get5(this, _hashKey, hashKey).call(this);
          var _class_private_field_get_key_string;
          var cache = (_class_private_field_get_key_string = (_$_class_private_field_get = _class_private_field_get3(this, _cache)) === null || _$_class_private_field_get === void 0 ? void 0 : (_class_private_field_get_key = _$_class_private_field_get[key]) === null || _class_private_field_get_key === void 0 ? void 0 : _class_private_field_get_key[string]) !== null && _class_private_field_get_key_string !== void 0 ? _class_private_field_get_key_string : void 0;
          if (cache)
            return cache;
          if (!((_$_class_private_field_get1 = _class_private_field_get3(this, _cache)) === null || _$_class_private_field_get1 === void 0 ? void 0 : _$_class_private_field_get1[key]))
            _class_private_field_get3(this, _cache)[key] = {};
          var hash = _class_private_method_get5(this, _encodeBase64, encodeBase64).call(this, CryptoJS2.HmacMD5(string, key).toString());
          _class_private_field_get3(this, _cache)[key][string] = hash;
          if (IsDuplicityVersion()) {
            Logger.log("[SDK] Hash Debug | Event: ".concat(string, " | Hash: ").concat(hash));
          }
          return hash;
        }
      },
      {
        key: "encode",
        value: function encode(payload) {
          var encoded;
          var key = _class_private_method_get5(this, _encodeKey, encodeKey).call(this);
          try {
            encoded = _class_private_method_get5(this, _encodeAES, encodeAES).call(this, JSON.stringify(payload), key);
          } catch (e) {
            Logger.error("Failed to encode payload");
          }
          return encoded;
        }
      },
      {
        key: "decode",
        value: function decode(payload) {
          var decoded;
          var key = _class_private_method_get5(this, _encodeKey, encodeKey).call(this);
          try {
            decoded = _class_private_method_get5(this, _decodeAES, decodeAES).call(this, payload, key);
          } catch (e) {
            Logger.error("Failed to decode payload");
          }
          return decoded;
        }
      }
    ]);
    return _class5;
  }();
  function hashKey() {
    return _class_private_field_get3(this, _H2) != null ? _class_private_field_get3(this, _H2) : _class_private_method_get5(this, _generateKey, generateKey).call(this);
  }
  function encodeKey() {
    return _class_private_field_get3(this, _O2) != null ? _class_private_field_get3(this, _O2) : _class_private_method_get5(this, _generateKey, generateKey).call(this);
  }
  function encodeBase64(payload) {
    if (typeof payload !== "string")
      return "";
    return CryptoJS2.enc.Base64.stringify(CryptoJS2.enc.Utf8.parse(payload));
  }
  function decodeBase64(payload) {
    if (typeof payload !== "string")
      return "";
    return CryptoJS2.enc.Utf8.stringify(CryptoJS2.enc.Base64.parse(payload));
  }
  function encodeAES(payload, passphrase) {
    if (typeof payload !== "string" || typeof passphrase !== "string")
      return "";
    return CryptoJS2.AES.encrypt(payload, passphrase).toString();
  }
  function decodeAES(payload, passphrase) {
    if (typeof payload !== "string" || typeof passphrase !== "string")
      return "";
    return CryptoJS2.AES.decrypt(payload, passphrase).toString(CryptoJS2.enc.Utf8);
  }
  function generateKey() {
    var length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 128;
    return CryptoJS2.lib.WordArray.random(length / 8).toString(CryptoJS2.enc.Utf8);
  }

  // ../src/client/modules/events/controller.ts
  function _array_like_to_array8(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_without_holes4(arr) {
    if (Array.isArray(arr))
      return _array_like_to_array8(arr);
  }
  function _check_private_redeclaration6(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_apply_descriptor_get4(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _class_apply_descriptor_set4(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _class_call_check6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_extract_field_descriptor4(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _class_private_field_get4(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor4(receiver, privateMap, "get");
    return _class_apply_descriptor_get4(receiver, descriptor);
  }
  function _class_private_field_init4(obj, privateMap, value) {
    _check_private_redeclaration6(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _class_private_field_set4(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor4(receiver, privateMap, "set");
    _class_apply_descriptor_set4(receiver, descriptor, value);
    return value;
  }
  function _defineProperties6(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class6(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties6(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties6(Constructor, staticProps);
    return Constructor;
  }
  function _iterable_to_array4(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _non_iterable_spread4() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array4(arr) {
    return _array_without_holes4(arr) || _iterable_to_array4(arr) || _unsupported_iterable_to_array8(arr) || _non_iterable_spread4();
  }
  function _unsupported_iterable_to_array8(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array8(o, minLen);
  }
  var _hashing = /* @__PURE__ */ new WeakMap();
  var _class3 = /* @__PURE__ */ function() {
    "use strict";
    function _class5() {
      _class_call_check6(this, _class5);
      _class_private_field_init4(this, _hashing, {
        writable: true,
        value: void 0
      });
      var ResourceName = GetCurrentResourceName();
      var convarId = Utils.getStringHash("__cpx_sdk:".concat(ResourceName, ":token"));
      var token = GetConvar(convarId, "");
      _class_private_field_set4(this, _hashing, new _class2(token, "0x1A3E035E"));
    }
    _create_class6(_class5, [
      {
        key: "on",
        value: function on1(event, callback) {
          var hash = _class_private_field_get4(this, _hashing).hashString(event);
          return on(hash, callback);
        }
      },
      {
        key: "onNet",
        value: function onNet1(event, callback) {
          var hash = _class_private_field_get4(this, _hashing).hashString(event);
          onNet(hash, callback);
          var hashCompressed = _class_private_field_get4(this, _hashing).hashString("".concat(event, "-c"));
          onNet(hashCompressed, function(payload) {
            var decompressed = Utils.inflate(payload);
            var unpacked = msgpack_unpack(decompressed);
            return callback.apply(void 0, _to_consumable_array4(unpacked));
          });
        }
      },
      {
        key: "emit",
        value: function emit1(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var hash = _class_private_field_get4(this, _hashing).hashString(event);
          return emit.apply(void 0, [
            hash
          ].concat(_to_consumable_array4(args)));
        }
      },
      {
        key: "emitNet",
        value: function emitNet(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var payload = msgpack_pack(args);
          var byteLength = payload.length;
          var hash = _class_private_field_get4(this, _hashing).hashString(event);
          if (byteLength < 5859) {
            TriggerServerEventInternal(hash, payload, payload.length);
          } else {
            TriggerLatentServerEventInternal(hash, payload, payload.length, 76003);
          }
        }
      }
    ]);
    return _class5;
  }();

  // ../src/client/modules/events/index.ts
  var Events = new _class3();

  // ../src/client/modules/rpc/controller.ts
  function _array_like_to_array9(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes7(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _array_without_holes5(arr) {
    if (Array.isArray(arr))
      return _array_like_to_array9(arr);
  }
  function asyncGeneratorStep4(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator4(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep4(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep4(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _check_private_redeclaration7(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _class_apply_descriptor_get5(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _class_apply_descriptor_set5(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _class_apply_descriptor_update2(receiver, descriptor) {
    if (descriptor.set) {
      if (!descriptor.get) {
        throw new TypeError("attempted to read set only private field");
      }
      if (!("__destrWrapper" in descriptor)) {
        descriptor.__destrWrapper = {
          set value(v) {
            descriptor.set.call(receiver, v);
          },
          get value() {
            return descriptor.get.call(receiver);
          }
        };
      }
      return descriptor.__destrWrapper;
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      return descriptor;
    }
  }
  function _class_call_check7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _class_extract_field_descriptor5(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _class_private_field_get5(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor5(receiver, privateMap, "get");
    return _class_apply_descriptor_get5(receiver, descriptor);
  }
  function _class_private_field_init5(obj, privateMap, value) {
    _check_private_redeclaration7(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _class_private_field_set5(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor5(receiver, privateMap, "set");
    _class_apply_descriptor_set5(receiver, descriptor, value);
    return value;
  }
  function _class_private_field_update2(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor5(receiver, privateMap, "update");
    return _class_apply_descriptor_update2(receiver, descriptor);
  }
  function _class_private_method_get6(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _class_private_method_init6(obj, privateSet) {
    _check_private_redeclaration7(obj, privateSet);
    privateSet.add(obj);
  }
  function _defineProperties7(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class7(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties7(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties7(Constructor, staticProps);
    return Constructor;
  }
  function _iterable_to_array5(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _iterable_to_array_limit7(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest7() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _non_iterable_spread5() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array7(arr, i) {
    return _array_with_holes7(arr) || _iterable_to_array_limit7(arr, i) || _unsupported_iterable_to_array9(arr, i) || _non_iterable_rest7();
  }
  function _to_consumable_array5(arr) {
    return _array_without_holes5(arr) || _iterable_to_array5(arr) || _unsupported_iterable_to_array9(arr) || _non_iterable_spread5();
  }
  function _unsupported_iterable_to_array9(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array9(o, minLen);
  }
  function _ts_generator4(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v1) {
        return step([
          n,
          v1
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var _ready3 = /* @__PURE__ */ new WeakMap();
  var _pending2 = /* @__PURE__ */ new WeakMap();
  var _callCount = /* @__PURE__ */ new WeakMap();
  var _resource2 = /* @__PURE__ */ new WeakMap();
  var _hashing2 = /* @__PURE__ */ new WeakMap();
  var _on2 = /* @__PURE__ */ new WeakSet();
  var _emit2 = /* @__PURE__ */ new WeakSet();
  var _init3 = /* @__PURE__ */ new WeakSet();
  var _class4 = /* @__PURE__ */ function() {
    "use strict";
    function _class5() {
      _class_call_check7(this, _class5);
      _class_private_method_init6(this, _on2);
      _class_private_method_init6(this, _emit2);
      _class_private_method_init6(this, _init3);
      _class_private_field_init5(this, _ready3, {
        writable: true,
        value: void 0
      });
      _class_private_field_init5(this, _pending2, {
        writable: true,
        value: void 0
      });
      _class_private_field_init5(this, _callCount, {
        writable: true,
        value: void 0
      });
      _class_private_field_init5(this, _resource2, {
        writable: true,
        value: void 0
      });
      _class_private_field_init5(this, _hashing2, {
        writable: true,
        value: void 0
      });
      _class_private_field_set5(this, _ready3, false);
      _class_private_field_set5(this, _pending2, /* @__PURE__ */ new Map());
      _class_private_field_set5(this, _callCount, GetGameTimer());
      _class_private_field_set5(this, _resource2, GetCurrentResourceName());
      var convarId = Utils.getStringHash("__cpx_sdk:rpc:token");
      var token = GetConvar(convarId, "");
      _class_private_field_set5(this, _hashing2, new _class2(token, "0x1A3E035E"));
      _class_private_method_get6(this, _init3, init3).call(this);
    }
    _create_class7(_class5, [
      {
        key: "register",
        value: function register(event, callback) {
          var _this = this;
          _class_private_method_get6(this, _on2, on3).call(this, "__rpc_req:".concat(event), function() {
            var _ref = _async_to_generator4(function(meta, args) {
              var response, success, invokingResource, decoded, metadata, e;
              return _ts_generator4(this, function(_state) {
                switch (_state.label) {
                  case 0:
                    invokingResource = GetInvokingResource();
                    if (invokingResource)
                      return [
                        2
                      ];
                    decoded = _class_private_field_get5(_this, _hashing2).decode(meta);
                    metadata = JSON.parse(decoded);
                    if (!(metadata === null || metadata === void 0 ? void 0 : metadata.id) || !(metadata === null || metadata === void 0 ? void 0 : metadata.origin)) {
                      return [
                        2,
                        Logger.error("[RPC] ".concat(event, " - Invalid metadata received"))
                      ];
                    }
                    _state.label = 1;
                  case 1:
                    _state.trys.push([
                      1,
                      3,
                      ,
                      4
                    ]);
                    return [
                      4,
                      callback.apply(void 0, _to_consumable_array5(args))
                    ];
                  case 2:
                    response = _state.sent();
                    success = true;
                    return [
                      3,
                      4
                    ];
                  case 3:
                    e = _state.sent();
                    response = e.message;
                    success = false;
                    return [
                      3,
                      4
                    ];
                  case 4:
                    _class_private_method_get6(_this, _emit2, emit3).call(_this, "__rpc_res:".concat(metadata.origin), metadata.id, [
                      success,
                      response
                    ]);
                    return [
                      2
                    ];
                }
              });
            });
            return function(meta, args) {
              return _ref.apply(this, arguments);
            };
          }());
        }
      },
      {
        key: "execute",
        value: function execute(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var _this = this;
          var metadata = {
            id: ++_class_private_field_update2(this, _callCount).value,
            origin: _class_private_field_get5(this, _resource2)
          };
          var promise = new Promise(function(resolve, reject) {
            var timeout = +setTimeout(function() {
              return reject(new Error("RPC timed out | ".concat(event)));
            }, 6e4);
            _class_private_field_get5(_this, _pending2).set(metadata.id, {
              resolve,
              reject,
              timeout
            });
          });
          promise["finally"](function() {
            return _class_private_field_get5(_this, _pending2)["delete"](metadata.id);
          });
          _class_private_method_get6(this, _emit2, emit3).call(this, "__rpc_req:".concat(event), _class_private_field_get5(this, _hashing2).encode(metadata), args);
          return promise;
        }
      },
      {
        key: "executeCustom",
        value: function executeCustom(event, options) {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          var _this = this;
          var metadata = {
            id: ++_class_private_field_update2(this, _callCount).value,
            origin: _class_private_field_get5(this, _resource2)
          };
          var promise = new Promise(function(resolve, reject) {
            var _options_timeout;
            var timeout = +setTimeout(function() {
              return reject(new Error("RPC timed out | ".concat(event)));
            }, (_options_timeout = options === null || options === void 0 ? void 0 : options.timeout) !== null && _options_timeout !== void 0 ? _options_timeout : 6e4);
            _class_private_field_get5(_this, _pending2).set(metadata.id, {
              resolve,
              reject,
              timeout
            });
          });
          promise["finally"](function() {
            return _class_private_field_get5(_this, _pending2)["delete"](metadata.id);
          });
          _class_private_method_get6(this, _emit2, emit3).call(this, "__rpc_req:".concat(event), _class_private_field_get5(this, _hashing2).encode(metadata), args);
          return promise;
        }
      }
    ]);
    return _class5;
  }();
  function on3(event, callback) {
    var hash = _class_private_field_get5(this, _hashing2).hashString(event);
    onNet(hash, callback);
    var hashCompressed = _class_private_field_get5(this, _hashing2).hashString("".concat(event, "-c"));
    onNet(hashCompressed, function(payload) {
      var decompressed = Utils.inflate(payload);
      var unpacked = msgpack_unpack(decompressed);
      return callback.apply(void 0, _to_consumable_array5(unpacked));
    });
  }
  function emit3(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var payload = msgpack_pack(args);
    var byteLength = payload.length;
    var hash = _class_private_field_get5(this, _hashing2).hashString(event);
    if (byteLength < 16e3) {
      TriggerServerEventInternal(hash, payload, payload.length);
    } else {
      TriggerLatentServerEventInternal(hash, payload, payload.length, 128e3);
    }
  }
  function init3() {
    var _this = this;
    if (_class_private_field_get5(this, _ready3))
      return Logger.error("SDK RPC handlers already initialized");
    _class_private_method_get6(this, _on2, on3).call(this, "__rpc_res:".concat(_class_private_field_get5(this, _resource2)), function(reqId, param) {
      var _param = _sliced_to_array7(param, 2), success = _param[0], response = _param[1];
      var pending = _class_private_field_get5(_this, _pending2).get(reqId);
      if (!pending)
        return;
      clearTimeout(pending.timeout);
      if (success) {
        pending.resolve(response);
      } else {
        pending.reject(new Error(response));
      }
    });
    _class_private_field_set5(this, _ready3, true);
    Logger.debug("SDK RPC handlers initialized");
  }

  // ../src/client/modules/rpc/index.ts
  var RPCNew = new _class4();

  // ../src/client/classes/PlayerState.ts
  var import_lodash = __toESM(require_lodash());

  // ../src/client/constants/defaultPlayerState.ts
  var defaultPlayerState = {
    wounds: {
      head: {
        label: "Head",
        bullets: 0,
        damage: 0,
        maxDamage: 15,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      },
      body: {
        label: "Body",
        bullets: 0,
        damage: 0,
        maxDamage: 25,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      },
      leftArm: {
        label: "Left Arm",
        bullets: 0,
        damage: 0,
        maxDamage: 15,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      },
      rightArm: {
        label: "Right Arm",
        bullets: 0,
        damage: 0,
        maxDamage: 15,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      },
      leftLeg: {
        label: "Left Leg",
        bullets: 0,
        damage: 0,
        maxDamage: 15,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      },
      rightLeg: {
        label: "Right Leg",
        bullets: 0,
        damage: 0,
        maxDamage: 15,
        injuryList: [],
        broken: false,
        severity: {
          level: 0,
          name: "none"
        },
        bleeding: false
      }
    },
    vision: 100,
    sound: 100,
    burns: 0,
    isDead: false
  };

  // ../src/client/constants/injuryList.ts
  function _define_property4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var _obj;
  var injuryList = (_obj = {}, _define_property4(_obj, GetHashKey("WEAPON_UNARMED"), {
    issue: "Fist Marks",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_KNUCKLE"), {
    issue: "Knuckle Shaped Wound",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 10,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_WRENCH"), {
    issue: "Large Blunt Object (Metal)",
    removeArmor: false,
    breakBone: 80,
    bleedChance: 20,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_MACHETE"), {
    issue: "Large Knife Wounds (Metal)",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 90,
    severity: 0.3
  }), _define_property4(_obj, GetHashKey("WEAPON_HATCHET"), {
    issue: "Large Hacking Wounds (Metal)",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 90,
    severity: 0.3
  }), _define_property4(_obj, GetHashKey("WEAPON_ANIMAL"), {
    issue: "Animal Bites and Claws",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 90,
    severity: 0.4
  }), _define_property4(_obj, GetHashKey("WEAPON_COUGAR"), {
    issue: "Animal Bites and Claws",
    removeArmor: false,
    breakBone: 1,
    bleedChance: 90,
    severity: 0.8
  }), _define_property4(_obj, GetHashKey("WEAPON_BOAR"), {
    issue: "Animal Bites and Claws",
    removeArmor: false,
    breakBone: 1,
    bleedChance: 90,
    severity: 0.8
  }), _define_property4(_obj, GetHashKey("WEAPON_KNIFE"), {
    issue: "Knife Wounds",
    removeArmor: false,
    breakBone: 50,
    bleedChance: 90,
    severity: 0.5
  }), _define_property4(_obj, GetHashKey("WEAPON_FLASHLIGHT"), {
    issue: "Small Blunt Object (Metal)",
    removeArmor: false,
    breakBone: 50,
    bleedChance: 20,
    severity: 0.2
  }), _define_property4(_obj, GetHashKey("WEAPON_BOTTLE"), {
    issue: "Shards of Glass Found In Victim",
    removeArmor: false,
    bleedChance: 33,
    severity: 0.2
  }), _define_property4(_obj, GetHashKey("WEAPON_SWITCHBLADE"), {
    issue: "Knife Wounds",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 90,
    severity: 0.6
  }), _define_property4(_obj, GetHashKey("WEAPON_NIGHTSTICK"), {
    issue: "Blunt Object (Wooden)",
    removeArmor: false,
    breakBone: 5,
    bleedChance: 10,
    severity: 2
  }), _define_property4(_obj, GetHashKey("WEAPON_HAMMER"), {
    issue: "Small Blunt Object (Metal)",
    removeArmor: false,
    breakBone: 10,
    bleedChance: 10,
    severity: 3
  }), _define_property4(_obj, GetHashKey("WEAPON_BAT"), {
    issue: "Large Blunt Object (Wooden)",
    removeArmor: false,
    breakBone: 10,
    bleedChance: 10,
    severity: 3
  }), _define_property4(_obj, GetHashKey("WEAPON_GOLFCLUB"), {
    issue: "Long Metal Blunt Object",
    removeArmor: false,
    breakBone: 1,
    bleedChance: 10,
    severity: 1
  }), _define_property4(_obj, GetHashKey("WEAPON_CROWBAR"), {
    issue: "Medium Size Jagged Metal Object",
    removeArmor: false,
    breakBone: 4,
    bleedChance: 10,
    severity: 2
  }), _define_property4(_obj, GetHashKey("WEAPON_HEAVYPISTOL"), {
    issue: "Heavy Pistol Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 50,
    severity: 2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_VINTAGEPISTOL"), {
    issue: "Vintage Pistol Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 50,
    severity: 1.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_SNSPISTOL"), {
    issue: "SNS Pistol Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 50,
    severity: 1.2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_COMBATPISTOL"), {
    issue: "Combat Pistol Bullets",
    removeArmor: true,
    breakBone: 50,
    bleedChance: 50,
    severity: 1.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_APPISTOL"), {
    issue: "AP Pistol Bullets",
    removeArmor: true,
    breakBone: 25,
    bleedChance: 20,
    severity: 1.3,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_MICROSMG"), {
    issue: "Micro SMG Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 30,
    severity: 1.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GUSENBERG"), {
    issue: "Gusenberg Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 30,
    severity: 1.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_SMG"), {
    issue: "SMG Bullets",
    removeArmor: true,
    breakBone: 0.15,
    bleedChance: 30,
    severity: 1.2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_MACHINEPISTOL"), {
    issue: "Machine Pistol Bullets",
    removeArmor: true,
    bleedChance: 30,
    severity: 1.2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_COMBATPDW"), {
    issue: "Combat PDW Bullets",
    removeArmor: true,
    breakBone: 2,
    bleedChance: 30,
    severity: 1.8,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_ASSAULTSMG"), {
    issue: "Assault SMG Bullets",
    removeArmor: true,
    breakBone: 25,
    bleedChance: 30,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_ADVANCEDRIFLE"), {
    issue: "Advanced Rifle Bullets",
    removeArmor: true,
    breakBone: 25,
    bleedChance: 40,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_SPECIALCARBINE"), {
    issue: "Special Carbine Bullets",
    removeArmor: true,
    breakBone: 25,
    bleedChance: 40,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_MG"), {
    issue: "Machine Gun Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 40,
    severity: 4,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_COMBATMG"), {
    issue: "Combat MG Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 40,
    severity: 4,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_PUMPSHOTGUN"), {
    issue: "Pump Shotgun Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 0.7,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_SAWNOFFSHOTGUN"), {
    issue: "Sawn Off Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 90,
    severity: 4,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_ASSAULTSHOTGUN"), {
    issue: "Assault Shotgun Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 30,
    severity: 4,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_BULLPUPSHOTGUN"), {
    issue: "Bullpup Shotgun Bullets",
    removeArmor: true,
    breakBone: 45,
    bleedChance: 40,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_STUNGUN"), {
    issue: "Stun Gun Damage",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_SNIPERRIFLE"), {
    issue: "Sniper Rifle Wounds",
    removeArmor: true,
    breakBone: 50,
    bleedChance: 90,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_HEAVYSNIPER"), {
    issue: "Sniper Rifle Wounds",
    removeArmor: true,
    breakBone: 50,
    bleedChance: 90,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_REMOTESNIPER"), {
    issue: "Sniper Rifle Wounds",
    removeArmor: true,
    breakBone: 50,
    bleedChance: 90,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GRENADELAUNCHER"), {
    issue: "Explosive Damage (Grenades)",
    removeArmor: true,
    breakBone: 75,
    bleedChance: 90,
    severity: 7,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GRENADELAUNCHER_SMOKE"), {
    issue: "Smoke Damage",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_RPG"), {
    issue: "RPG Damage",
    removeArmor: true,
    breakBone: 90,
    bleedChance: 90,
    severity: 8,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_STINGER"), {
    issue: "RPG Damage",
    removeArmor: true,
    breakBone: 90,
    bleedChance: 90,
    severity: 8,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_MINIGUN"), {
    issue: "Minigun Wounds",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 20,
    severity: 7,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GRENADE"), {
    issue: "Grenade Wounds",
    removeArmor: true,
    breakBone: 65,
    bleedChance: 90,
    severity: 7
  }), _define_property4(_obj, GetHashKey("WEAPON_STICKYBOMB"), {
    issue: "Sticky Bomb Wounds",
    removeArmor: true,
    breakBone: 75,
    bleedChance: 90,
    severity: 8
  }), _define_property4(_obj, GetHashKey("WEAPON_SMOKEGRENADE"), {
    issue: "Smoke Grenade Wounds",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_BZGAS"), {
    issue: "BZ Gas Damage",
    removeArmor: false,
    bleedChance: 10,
    severity: 0.5
  }), _define_property4(_obj, GetHashKey("WEAPON_MOLOTOV"), {
    issue: "Molotov Fire Damage",
    removeArmor: false,
    bleedChance: 10,
    severity: 0.4
  }), _define_property4(_obj, GetHashKey("WEAPON_FIREEXTINGUISHER"), {
    issue: "Fire Extinguisher Damage",
    removeArmor: false,
    bleedChance: 10,
    severity: 0.3
  }), _define_property4(_obj, GetHashKey("WEAPON_PETROLCAN"), {
    issue: "Petrol Can Fire Damage",
    removeArmor: false,
    bleedChance: 10,
    severity: 0.3
  }), _define_property4(_obj, GetHashKey("WEAPON_DIGISCANNER"), {
    issue: "Digiscanner Wounds",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_BALL"), {
    issue: "Ballistic Damage",
    removeArmor: true,
    bleedChance: 10,
    severity: 1
  }), _define_property4(_obj, GetHashKey("WEAPON_FLARE"), {
    issue: "Flare Damage",
    removeArmor: false,
    bleedChance: 10,
    severity: 0.2
  }), _define_property4(_obj, GetHashKey("WEAPON_DAGGER"), {
    issue: "Dagger Wounds",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 90,
    severity: 1.5
  }), _define_property4(_obj, GetHashKey("WEAPON_VINTAGEPISTOL_MK2"), {
    issue: "Vintage Pistol Mk II Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 50,
    severity: 1.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_SNSPISTOL_MK2"), {
    issue: "SNS Pistol Mk II Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 50,
    severity: 1.2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_REVOLVER"), {
    issue: "Revolver Bullets",
    removeArmor: true,
    breakBone: 10,
    bleedChance: 33,
    severity: 3,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_REVOLVER_MK2"), {
    issue: "Revolver Mk II Bullets",
    removeArmor: true,
    breakBone: 10,
    bleedChance: 33,
    severity: 3,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_DOUBLEACTION"), {
    issue: "Double-Action Revolver Bullets",
    removeArmor: true,
    breakBone: 10,
    bleedChance: 30,
    severity: 3,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_CERAMICPISTOL"), {
    issue: "Ceramic Pistol Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 40,
    severity: 1.2
  }), _define_property4(_obj, GetHashKey("WEAPON_NAVYREVOLVER"), {
    issue: "Navy Revolver Bullets",
    removeArmor: true,
    breakBone: 10,
    bleedChance: 40,
    severity: 3,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GADGETPISTOL"), {
    issue: "Gadget Pistol Bullets",
    removeArmor: true,
    breakBone: 15,
    severity: 1.2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_BARBED_WIRE"), {
    issue: "Barbed Wire Damage",
    removeArmor: false,
    breakBone: 10,
    bleedChance: 90,
    severity: 2
  }), _define_property4(_obj, GetHashKey("WEAPON_DROWNING"), {
    issue: "Drowning",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_DROWNING_IN_VEHICLE"), {
    issue: "Drowned in Vehicle",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_BLEEDING"), {
    issue: "Bleeding",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_ELECTRIC_FENCE"), {
    issue: "Electric Fence Damage",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_EXPLOSION"), {
    issue: "Explosion Damage",
    removeArmor: false,
    severity: 10
  }), _define_property4(_obj, GetHashKey("WEAPON_FALL"), {
    issue: "Fall Damage",
    removeArmor: false,
    severity: 0.3
  }), _define_property4(_obj, GetHashKey("WEAPON_EXHAUSTION"), {
    issue: "Exhaustion",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_HIT_BY_WATER_CANNON"), {
    issue: "Water Cannon Pelts",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_RAMMED_BY_CAR"), {
    issue: "Vehicular Accident",
    removeArmor: false,
    breakBone: 10,
    bleedChance: 0.2,
    severity: 3
  }), _define_property4(_obj, GetHashKey("WEAPON_RUN_OVER_BY_CAR"), {
    issue: "Runover by Vehicle",
    removeArmor: false,
    breakBone: 10,
    bleedChance: 0.2,
    severity: 3
  }), _define_property4(_obj, GetHashKey("WEAPON_HELI_CRASH"), {
    issue: "Helicopter Crash",
    removeArmor: false,
    breakBone: 20,
    bleedChance: 50,
    severity: 5
  }), _define_property4(_obj, GetHashKey("WEAPON_FIRE"), {
    issue: "Fire Damage",
    removeArmor: false,
    severity: 0.1
  }), _define_property4(_obj, GetHashKey("WEAPON_ASSAULTRIFLE"), {
    issue: "AK 74 Bullets",
    removeArmor: true,
    breakBone: 3.5,
    bleedChance: 50,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GLOCKSAND"), {
    issue: "Glock Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 50,
    severity: 2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_GLOCKBLACK"), {
    issue: "Glock Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 50,
    severity: 2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("weapon_glock_fc"), {
    issue: "Glock SMG Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 50,
    severity: 2,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_PISTOL50"), {
    issue: "50 Cal Pistol Bullets",
    removeArmor: true,
    breakBone: 1,
    bleedChance: 80,
    severity: 5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_PISTOL"), {
    issue: "M1911 Bullets",
    removeArmor: true,
    breakBone: 35,
    bleedChance: 50,
    severity: 1,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("WEAPON_CARBINERIFLE"), {
    issue: "M4 Bullets",
    removeArmor: true,
    breakBone: 23,
    bleedChance: 50,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("weapon_ak_12"), {
    issue: "AK 12 Bullets",
    removeArmor: true,
    breakBone: 22,
    bleedChance: 50,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("np_mac10"), {
    issue: "MAC 10 Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 30,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("weapon_mac_10_compact"), {
    issue: "MAC 10 Compact Bullets",
    removeArmor: true,
    breakBone: 15,
    bleedChance: 30,
    severity: 2.5,
    addBullet: true
  }), _define_property4(_obj, GetHashKey("weapon_taser"), {
    issue: "Taser Damage",
    removeArmor: false,
    severity: 0.1
  }), _obj);

  // ../src/client/classes/PlayerState.ts
  function asyncGeneratorStep5(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator5(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep5(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep5(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties8(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class8(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties8(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties8(Constructor, staticProps);
    return Constructor;
  }
  function _define_property5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _ts_generator5(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var PlayerState = /* @__PURE__ */ function() {
    "use strict";
    function PlayerState2() {
      _class_call_check8(this, PlayerState2);
    }
    _create_class8(PlayerState2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator5(function() {
            var thisKeyWord;
            return _ts_generator5(this, function(_state) {
              thisKeyWord = _this;
              global.exports("damageBone", _this.damageBone.bind(_this));
              global.exports("addCustomIssue", _this.addCustomIssue.bind(_this));
              global.exports("isLimping", _this.isLimping.bind(_this));
              global.exports("isDead", _this.isDead.bind(_this));
              global.exports("setState", _this.setState.bind(_this));
              global.exports("resetState", _this.resetState.bind(_this));
              global.exports("getArmsDamage", _this.getArmsDamage.bind(_this));
              global.exports("overrideMaxHealth", _this.overrideMaxHealth.bind(_this));
              global.exports("setEntityHealth", _this.setEntityHealth.bind(_this));
              global.exports("getState", function() {
                return thisKeyWord.currentState;
              });
              global.exports("reSync", _this.reSync.bind(_this));
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "load",
        value: function load() {
          return _async_to_generator5(function() {
            return _ts_generator5(this, function(_state) {
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "reSync",
        value: function reSync() {
          return _async_to_generator5(function() {
            return _ts_generator5(this, function(_state) {
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "setEntityHealth",
        value: function setEntityHealth(entity, health) {
          if (!this.loaded)
            return;
          if (!entity) {
            entity = PlayerPedId();
          }
          var currentHealth = GetEntityHealth(entity);
          var currentHealthLeft = currentHealth - health;
          var maxHealth = GetEntityMaxHealth(entity);
          if (maxHealth !== PlayerState2.defaultMaxHealth) {
            SetEntityHealth(entity, health);
            return;
          }
          if (currentHealthLeft > 0) {
          } else {
            PlayerState2.heal(Math.abs(currentHealthLeft), false);
          }
        }
      },
      {
        key: "setState",
        value: function setState(state) {
          this.currentState = state;
          NUI.execute("cool-wounds:setPlayerState", this.currentState);
          Events.emitNet("cool-wounds:playerState:update", global.exports.isPed.isPed("cid"), this.currentState);
        }
      },
      {
        key: "resetState",
        value: function resetState() {
          var defaultState = (0, import_lodash.cloneDeep)(defaultPlayerState);
          this.setState(defaultState);
          this.sync();
        }
      },
      {
        key: "damageBone",
        value: function damageBone(bone, _0x1b6b70, _0x17177, weaponHashKey, _0x4082d7) {
        }
      },
      {
        key: "calculateSeverity",
        value: function calculateSeverity(bone) {
        }
      },
      {
        key: "addCustomIssue",
        value: function addCustomIssue(bone, injury) {
          this.currentState.wounds[bone].injuryList.push(injury);
        }
      },
      {
        key: "sync",
        value: function sync() {
          var playerPed = PlayerPedId();
          var newHealth = Math.round(GetEntityMaxHealth(playerPed) - this.getTotalDamage());
          var newArmor = GetPedArmour(playerPed);
          this.savedHealth = newHealth;
          PlayerArmor.savedArmor = newArmor;
          SetEntityHealth(playerPed, this.savedHealth);
          SetPedArmour(playerPed, PlayerArmor.savedArmor);
          if (IsPedDeadOrDying(playerPed, true) || this.savedHealth <= 100) {
            Logger.debug("[cool-wounds]", "Player died");
          }
          this.setState(this.currentState);
        }
      },
      {
        key: "heal",
        value: function heal(healValue, isArmor, item, bone) {
        }
      },
      {
        key: "fixBleeding",
        value: function fixBleeding(bone) {
          var foundBone = this.getBoneWithParam("bleeding", bone);
          if (!foundBone) {
            return emit("DoLongHudText", "You do not have any bleeding wounds", 2);
          }
          this.currentState.wounds[foundBone].bleeding = false;
          this.sync();
        }
      },
      {
        key: "fixBroken",
        value: function fixBroken(bone) {
          var foundBone = this.getBoneWithParam("broken", bone);
          if (!foundBone) {
            return emit("DoLongHudText", "You do not have any broken bones", 2);
          }
          this.currentState.wounds[foundBone].broken = false;
          this.sync();
        }
      },
      {
        key: "removeBullets",
        value: function removeBullets(bone) {
          var foundBone = this.getBoneWithParam("bullets", bone);
          if (!foundBone) {
            return emit("DoLongHudText", "You do not have any bullets in your body", 2);
          }
          this.currentState.wounds[foundBone].bullets = 0;
          this.sync();
        }
      },
      {
        key: "overrideMaxHealth",
        value: function overrideMaxHealth(newMaxHealth) {
          var playerPed = PlayerPedId();
          if (typeof newMaxHealth === "number") {
            SetEntityMaxHealth(playerPed, newMaxHealth);
          } else {
            SetEntityMaxHealth(playerPed, this.defaultMaxHealth);
          }
        }
      },
      {
        key: "getArmsDamage",
        value: function getArmsDamage() {
          return this.currentState.wounds.leftArm.damage + this.currentState.wounds.rightArm.damage;
        }
      },
      {
        key: "getWeaponInfo",
        value: function getWeaponInfo(hashKey2) {
          if (hashKey2) {
            return injuryList[hashKey2];
          }
          return void 0;
        }
      },
      {
        key: "shouldDamageArmor",
        value: function shouldDamageArmor(bone, data) {
          var shouldDamageArmor2 = true;
          if (bone === "body" && PlayerArmor.savedArmor > 0) {
            if (!(data === null || data === void 0 ? void 0 : data.removeArmor)) {
              shouldDamageArmor2 = false;
            }
          } else {
            shouldDamageArmor2 = false;
          }
          return shouldDamageArmor2;
        }
      },
      {
        key: "getBoneToDamage",
        value: function getBoneToDamage() {
          var thisKeyWord = this;
          var wounds = Object.keys(this.currentState.wounds).filter(function(bone) {
            return thisKeyWord.currentState.wounds[bone].damage < thisKeyWord.currentState.wounds[bone].maxDamage;
          });
          if (wounds.length > 0) {
            var boneToDamage = wounds.reduce(function(bone1, bone2) {
              if (thisKeyWord.currentState.wounds[bone1].damage < thisKeyWord.currentState.wounds[bone2].damage) {
                return bone1;
              } else {
                return bone2;
              }
            });
            return boneToDamage;
          }
          return void 0;
        }
      },
      {
        key: "getBoneToHeal",
        value: function getBoneToHeal(bone) {
          var thisKeyWord = this;
          var wounds = Object.keys(this.currentState.wounds).filter(function(b) {
            return thisKeyWord.currentState.wounds[b].damage > 0 && (bone ? b === bone : true);
          });
          if (wounds.length > 0) {
            var boneToHeal = wounds.reduce(function(bone1, bone2) {
              if (thisKeyWord.currentState.wounds[bone1].damage > thisKeyWord.currentState.wounds[bone2].damage) {
                return bone1;
              } else {
                return bone2;
              }
            });
            return boneToHeal;
          }
          return void 0;
        }
      },
      {
        key: "getBoneWithParam",
        value: function getBoneWithParam(param, bone) {
          var thisKeyWord = this;
          var wounds = Object.keys(this.currentState.wounds).filter(function(b) {
            return thisKeyWord.currentState.wounds[b][param] && (bone ? b === bone : true);
          });
          if (wounds.length > 0) {
            var boneWithParam = wounds.reduce(function(bone1, bone2) {
              if (thisKeyWord.currentState.wounds[bone1].damage > thisKeyWord.currentState.wounds[bone2].damage) {
                return bone1;
              } else {
                return bone2;
              }
            });
            return boneWithParam;
          }
          return void 0;
        }
      },
      {
        key: "isLimping",
        value: function isLimping() {
          return this.currentState.wounds.leftLeg.broken || this.currentState.wounds.rightLeg.broken;
        }
      },
      {
        key: "getTotalDamage",
        value: function getTotalDamage() {
          return Object.values(this.currentState.wounds).reduce(function(acc, curr) {
            return acc + curr.damage;
          }, 0);
        }
      },
      {
        key: "isDead",
        value: function isDead() {
          return this.currentState.isDead;
        }
      }
    ]);
    return PlayerState2;
  }();
  _define_property5(PlayerState, "loaded", false);
  _define_property5(PlayerState, "currentState", (0, import_lodash.cloneDeep)(defaultPlayerState));
  _define_property5(PlayerState, "savedHealth", void 0);
  _define_property5(PlayerState, "defaultMaxHealth", 200);

  // ../src/shared/cpx/client/index.ts
  var Streaming = {
    loadModel: function(model) {
      return CPX.Streaming.loadModel(model);
    },
    loadTexture: function(texture) {
      return CPX.Streaming.loadTexture(texture);
    },
    loadAnim: function(anim) {
      return CPX.Streaming.loadAnim(anim);
    },
    loadClipSet: function(clipSet) {
      return CPX.Streaming.loadClipSet(clipSet);
    },
    loadWeaponAsset: function(weaponAsset, p1, p2) {
      return CPX.Streaming.loadWeaponAsset(weaponAsset);
    },
    loadNamedPtfxAsset: function(asset) {
      return CPX.Streaming.loadNamedPtfxAsset(asset);
    }
  };

  // ../src/client/modules/interface.ts
  var AddPeekEntryByModel = function(pModels, pData, pOptions) {
    global.exports["srp-interact"].AddPeekEntryByModel(pModels, pData, pOptions);
  };
  var AddPeekEntryByPolyTarget = function(pEvent, pData, pOptions) {
    global.exports["srp-interact"].AddPeekEntryByPolyTarget(pEvent, pData, pOptions);
  };
  var AddPeekEntryByFlag = function(pFlags, pData, pOptions) {
    global.exports["srp-interact"].AddPeekEntryByFlag(pFlags, pData, pOptions);
  };
  var AddPeekEntryByType = function(pType, pData, pOptions) {
    global.exports["srp-interact"].AddPeekEntryByEntityType(pType, pData, pOptions);
  };
  var AddInteraction = function(id, coords, options, context) {
    var data = {
      id,
      coords: [
        coords.x,
        coords.y,
        coords.z
      ],
      options,
      context
    };
    global.exports["interactions"].AddInteraction(data);
  };
  var AddInteractionByModel = function(id, models, options, context) {
    var data = {
      id,
      options,
      context
    };
    global.exports["interactions"].AddInteractionByModel(models, data);
  };
  var AddPlayerInteraction = function(id, options, context) {
    var data = {
      id,
      options,
      context
    };
    data.context.isPlayer = true;
    global.exports["interactions"].AddPedInteraction(data);
  };
  var AddPedInteraction = function(id, options, context) {
    var data = {
      id,
      options,
      context
    };
    global.exports["interactions"].AddPedInteraction(data);
  };
  var AddVehicleInteraction = function(id, options, context) {
    var data = {
      id,
      options,
      context
    };
    global.exports["interactions"].AddVehicleInteraction(data);
  };
  var RemoveInteraction = function(id) {
    global.exports["interactions"].RemoveInteraction(id);
  };
  var RemoveVehicleInteraction = function(id) {
    global.exports["interactions"].RemoveVehicleInteraction(id);
  };
  var RemovePedInteraction = function(id) {
    global.exports["interactions"].RemovePedInteraction(id);
  };
  var Taskbar = function(pLength, pName) {
    var pRunCheck = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, pDistCheck = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, pKeepWeapon = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true, pVehicle = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
    return new Promise(function(resolve) {
      global.exports["srp-taskbar"].taskBar(pLength, pName, pRunCheck, pKeepWeapon, pVehicle, false, resolve);
    });
  };
  var DoPhoneConfirmation = function(pTitle, pText, pIcon, pTimeout) {
    return new Promise(function(resolve) {
      global.exports["cool-phone"].DoPhoneConfirmation(pTitle, pText, pIcon, resolve, pTimeout);
    });
  };
  var DoPhoneNotification = function(pTitle, pBody) {
    var pForced = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, pApp = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "home-screen";
    global.exports["cool-ui"].SendUIMessage({
      source: "cool-nui",
      app: "phone",
      data: {
        action: "notification",
        target_app: pApp,
        title: pTitle,
        body: pBody,
        show_even_if_app_active: pForced
      }
    });
  };
  var DrawTextJS = function(x, y, text, color, scale, font) {
    var justification = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0, outline = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : true;
    SetTextColour(color[0], color[1], color[2], color[3]);
    if (outline) {
      SetTextOutline();
    }
    SetTextScale(0, scale);
    SetTextFont(font != null ? font : 0);
    SetTextJustification(justification);
    if (justification === 2)
      SetTextWrap(0, 0.575);
    SetTextEntry("STRING");
    AddTextComponentString(text != null ? text : "Dummy text");
    EndTextCommandDisplayText(x, y);
  };
  var DrawTextBox = function(coords, distance, text, color) {
    var font = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 4, outline = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true, background = arguments.length > 6 ? arguments[6] : void 0;
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    var scale = Math.max(MathUtils.getMapRange([
      0,
      10
    ], [
      0.4,
      0.25
    ], distance), 0.1);
    DrawTextJS(0, 0, text, color, scale, font, 0, outline);
    if (background) {
      DrawRect(2e-3, background.height / 2, background.width, background.height, background.color[0], background.color[1], background.color[2], background.color[3]);
    }
    ClearDrawOrigin();
  };
  var Interface = {
    addPeekEntryByModel: AddPeekEntryByModel,
    addPeekEntryByTarget: AddPeekEntryByPolyTarget,
    addPeekEntryByFlag: AddPeekEntryByFlag,
    addPeekEntryByType: AddPeekEntryByType,
    addInteraction: AddInteraction,
    addInteractionByModel: AddInteractionByModel,
    addPlayerInteraction: AddPlayerInteraction,
    addPedInteraction: AddPedInteraction,
    addVehicleInteraction: AddVehicleInteraction,
    removeInteraction: RemoveInteraction,
    removePlayerInteraction: RemovePedInteraction,
    removePedInteraction: RemovePedInteraction,
    removeVehicleInteraction: RemoveVehicleInteraction,
    taskBar: Taskbar,
    phoneConfirmation: DoPhoneConfirmation,
    phoneNotification: DoPhoneNotification,
    drawText: DrawTextJS,
    drawText3D: DrawTextBox
  };

  // ../src/client/classes/PlayerArmor.ts
  function asyncGeneratorStep6(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator6(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep6(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep6(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties9(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class9(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties9(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties9(Constructor, staticProps);
    return Constructor;
  }
  function _define_property6(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _ts_generator6(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var PlayerArmor = /* @__PURE__ */ function() {
    "use strict";
    function PlayerArmor2() {
      _class_call_check9(this, PlayerArmor2);
    }
    _create_class9(PlayerArmor2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator6(function() {
            return _ts_generator6(this, function(_state) {
              global.exports("setArmor", _this.setArmor.bind(_this));
              Events.onNet("wounds:armor:Equip", _this.equipArmor.bind(_this));
              Events.onNet("wounds:armor:unEquip", _this.unequipArmor.bind(_this));
              RPCNew.register("wounds:armor:applyPlate", _this.applyPlate.bind(_this));
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "getArmorStack",
        value: function getArmorStack() {
          return _async_to_generator6(function() {
            var armorStack;
            return _ts_generator6(this, function(_state) {
              switch (_state.label) {
                case 0:
                  return [
                    4,
                    RPCNew.execute("wounds:armor:getArmorStack")
                  ];
                case 1:
                  armorStack = _state.sent();
                  if (!armorStack)
                    return [
                      2
                    ];
                  return [
                    2,
                    armorStack
                  ];
              }
            });
          })();
        }
      },
      {
        key: "equipArmor",
        value: function equipArmor() {
          var _this = this;
          return _async_to_generator6(function() {
            var armorStack;
            return _ts_generator6(this, function(_state) {
              switch (_state.label) {
                case 0:
                  return [
                    4,
                    _this.getArmorStack()
                  ];
                case 1:
                  armorStack = _state.sent();
                  if (!armorStack)
                    return [
                      2
                    ];
                  _this.setArmor(armorStack.quality, true);
                  return [
                    2
                  ];
              }
            });
          })();
        }
      },
      {
        key: "unequipArmor",
        value: function unequipArmor() {
          this.setArmor(0, true);
        }
      },
      {
        key: "setArmor",
        value: function setArmor(quality, ignoreUpdate) {
          if (!PlayerState.loaded)
            return;
          var playerPed = PlayerPedId();
          if (quality < 0) {
            quality = 0;
          }
          if (quality > 100) {
            quality = 100;
          }
          var newArmor = 0;
          if (quality > this.savedArmor) {
            newArmor = quality - this.savedArmor;
          } else {
            newArmor = -(this.savedArmor - quality);
          }
          SetPedArmour(playerPed, quality);
          this.savedArmor = quality;
          NUI.execute("cool-wounds:setArmor", quality);
          if (!ignoreUpdate && Math.abs(newArmor) > 0) {
            Events.emitNet("wounds:armor:update", newArmor);
          }
        }
      },
      {
        key: "applyPlate",
        value: function applyPlate() {
          var _this = this;
          return _async_to_generator6(function() {
            var armorStack, playerPed, object, progress;
            return _ts_generator6(this, function(_state) {
              switch (_state.label) {
                case 0:
                  if (_this.applyingPlate)
                    return [
                      2
                    ];
                  return [
                    4,
                    _this.getArmorStack()
                  ];
                case 1:
                  armorStack = _state.sent();
                  if (!armorStack) {
                    emit("DoLongHudText", "You don't have any armor plates equipped.", 2);
                    return [
                      2
                    ];
                  }
                  return [
                    4,
                    Streaming.loadAnim(_this.anim.dict)
                  ];
                case 2:
                  _state.sent();
                  Events.emitNet("wounds:armor:sound");
                  playerPed = PlayerPedId();
                  TaskPlayAnim(playerPed, _this.anim.dict, _this.anim.name, 8, -8, -1, 49, 0, false, false, false);
                  _this.applyingPlate = true;
                  object = 0;
                  setTimeout(/* @__PURE__ */ _async_to_generator6(function() {
                    return _ts_generator6(this, function(_state2) {
                      switch (_state2.label) {
                        case 0:
                          if (!_this.applyingPlate)
                            return [
                              2
                            ];
                          object = CreateObjectNoOffset(_this.anim.model, 0, 0, 0, true, true, false);
                          AttachEntityToEntity(object, playerPed, GetPedBoneIndex(playerPed, 18905), 0.2799, -0.0655, 0.2005, -133.5597, -21.0822, -234.2877, false, false, false, false, 5, true);
                          return [
                            4,
                            Utils.wait(1500)
                          ];
                        case 1:
                          _state2.sent();
                          DeleteEntity(object);
                          return [
                            2
                          ];
                      }
                    });
                  }), 1e3);
                  return [
                    4,
                    Interface.taskBar(3500, "Applying...")
                  ];
                case 3:
                  progress = _state.sent();
                  _this.setArmor(armorStack.quality + 10);
                  Events.emitNet("wounds:sound:cleanup");
                  ClearPedTasks(playerPed);
                  DeleteEntity(object);
                  _this.applyingPlate = false;
                  return [
                    2,
                    progress === 100
                  ];
              }
            });
          })();
        }
      }
    ]);
    return PlayerArmor2;
  }();
  _define_property6(PlayerArmor, "savedArmor", 0);
  _define_property6(PlayerArmor, "applyingPlate", false);
  _define_property6(PlayerArmor, "anim", {
    dict: "invitems@anims",
    name: "armor_plate",
    model: "invitem_g_armorplate"
  });

  // ../src/shared/controls.ts
  var ControlIndex = {
    ESC: 322,
    F1: 288,
    F2: 289,
    F3: 170,
    F5: 166,
    F6: 167,
    F7: 168,
    F8: 169,
    F9: 56,
    F10: 57,
    "~": 243,
    "#1": 157,
    "#2": 158,
    "#3": 160,
    "#4": 164,
    "#5": 165,
    "#6": 159,
    "#7": 161,
    "#8": 162,
    "#9": 163,
    "-": 84,
    "=": 83,
    BACKSPACE: 177,
    TAB: 37,
    Q: 44,
    W: 32,
    E: 38,
    R: 45,
    T: 245,
    Y: 246,
    U: 303,
    P: 199,
    ENTER: 18,
    CAPS: 137,
    A: 34,
    S: 8,
    D: 9,
    F: 23,
    G: 47,
    H: 74,
    K: 311,
    L: 182,
    LEFTSHIFT: 21,
    Z: 20,
    X: 73,
    C: 26,
    V: 0,
    B: 29,
    N: 249,
    M: 244,
    ",": 82,
    ".": 81,
    LEFTCTRL: 36,
    LEFTALT: 19,
    SPACE: 22,
    RIGHTCTRL: 70,
    HOME: 213,
    PAGEUP: 10,
    PAGEDOWN: 11,
    DELETE: 178,
    LEFT: 174,
    RIGHT: 175,
    TOP: 27,
    DOWN: 173,
    NENTER: 201,
    N4: 108,
    N5: 60,
    N6: 107,
    "N+": 96,
    "N-": 97,
    N7: 117,
    N8: 61,
    N9: 118
  };

  // ../src/client/classes/PlayerHealth.ts
  function asyncGeneratorStep7(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator7(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep7(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep7(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check10(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties10(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class10(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties10(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties10(Constructor, staticProps);
    return Constructor;
  }
  function _define_property7(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _ts_generator7(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var PlayerHealth = /* @__PURE__ */ function() {
    "use strict";
    function PlayerHealth2() {
      _class_call_check10(this, PlayerHealth2);
    }
    _create_class10(PlayerHealth2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator7(function() {
            return _ts_generator7(this, function(_state) {
              global.exports("disableBleeding", _this.disableBleeding.bind(_this));
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "disableBleeding",
        value: function disableBleeding(disableBleeding) {
          this.disabledBleeding = disableBleeding;
        }
      },
      {
        key: "load",
        value: function load() {
          this.vision();
        }
      },
      {
        key: "check",
        value: function check() {
          this.limping();
          this.bleeding();
        }
      },
      {
        key: "painkiller",
        value: function painkiller() {
          var _this = this;
          this.inPainKillers = true;
          this.resetMovement();
          setTimeout(function() {
            _this.inPainKillers = false;
          }, 1e4);
        }
      },
      {
        key: "limping",
        value: function limping() {
          var _this = this;
          return _async_to_generator7(function() {
            var wounds;
            return _ts_generator7(this, function(_state) {
              wounds = PlayerState.currentState.wounds;
              if (wounds.leftLeg.broken || wounds.rightLeg.broken) {
                if (_this.limpingInterval || _this.inPainKillers) {
                  return [
                    2
                  ];
                }
                _this.limpingInterval = setInterval(/* @__PURE__ */ _async_to_generator7(function() {
                  var playerPed;
                  return _ts_generator7(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        playerPed = PlayerPedId();
                        RequestAnimSet(_this.injuredAnimSet);
                        _state2.label = 1;
                      case 1:
                        if (!!HasAnimSetLoaded(_this.injuredAnimSet))
                          return [
                            3,
                            3
                          ];
                        return [
                          4,
                          Utils.wait(0)
                        ];
                      case 2:
                        _state2.sent();
                        return [
                          3,
                          1
                        ];
                      case 3:
                        SetPedMovementClipset(playerPed, _this.injuredAnimSet, 1);
                        return [
                          2
                        ];
                    }
                  });
                }), 1e3);
              } else {
                _this.resetMovement();
              }
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "resetMovement",
        value: function resetMovement() {
          clearInterval(this.limpingInterval);
          emit("Animation:Set:Reset");
        }
      },
      {
        key: "bleeding",
        value: function bleeding() {
          return _async_to_generator7(function() {
            return _ts_generator7(this, function(_state) {
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "calculateVision",
        value: function calculateVision(value) {
          var minValue = 5e3 + value * 500;
          var maxValue = 1e4 + value * 600;
          var intensity = 2750 - (value - 1) * 20;
          return {
            interval: Utils.MathUtils.getRandomNumber(minValue, maxValue),
            intensity
          };
        }
      },
      {
        key: "vision",
        value: function vision() {
          var realHealth = GetEntityHealth(PlayerPedId()) - 100;
          var vision2 = this.calculateVision(realHealth);
          var interval = vision2.interval;
          var intensity = vision2.intensity;
          setTimeout(this.vision.bind(this), interval);
        }
      },
      {
        key: "mobility",
        value: function mobility() {
          var _this = this;
          setTick(function() {
            if (_this.inPainKillers) {
              return;
            }
            var wounds = PlayerState.currentState.wounds;
            var value = 1 - (wounds.leftLeg.damage + wounds.rightLeg.damage) / 250;
            var playerPed = PlayerPedId();
            SetPedMoveRateOverride(playerPed, value);
            if (IsPedJumping(playerPed) && value <= 0.75) {
              var fwdVector = GetEntityForwardVector(playerPed);
              SetPedToRagdollWithFall(playerPed, 1e3, 1e3, 1, fwdVector[0], fwdVector[1], fwdVector[2], 1, 0, 0, 0, 0, 0, 0);
            }
            if (wounds.leftLeg.broken || wounds.rightLeg.broken) {
              DisableControlAction(2, ControlIndex.LEFTSHIFT, true);
            }
          });
        }
      }
    ]);
    return PlayerHealth2;
  }();
  _define_property7(PlayerHealth, "limpingInterval", void 0);
  _define_property7(PlayerHealth, "injuredAnimSet", "move_m@injured");
  _define_property7(PlayerHealth, "isBleeding", false);
  _define_property7(PlayerHealth, "disabledBleeding", false);
  _define_property7(PlayerHealth, "inPainKillers", false);

  // ../src/client/classes/QuickInspection.ts
  function asyncGeneratorStep8(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator8(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep8(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep8(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check11(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties11(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class11(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties11(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties11(Constructor, staticProps);
    return Constructor;
  }
  function _define_property8(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _ts_generator8(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var QuickInspection = /* @__PURE__ */ function() {
    "use strict";
    function QuickInspection2() {
      _class_call_check11(this, QuickInspection2);
    }
    _create_class11(QuickInspection2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator8(function() {
            return _ts_generator8(this, function(_state) {
              on("cool-preferences:setPreferences", _this.setPersistentState.bind(_this));
              global.exports["srp-keybinds"].registerKeyMapping("", "Player", "Show Character UI", "+wounds:showCharacter", "-wounds:showCharacter", "J");
              RegisterCommand("+wounds:showCharacter", _this.keyPressed.bind(_this), false);
              RegisterCommand("-wounds:showCharacter", _this.keyReleased.bind(_this), false);
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "setPersistentState",
        value: function setPersistentState(preferences) {
          this.isPersistent = preferences["wounds.character.enabled"];
          NUI.execute("cool-wounds:show", this.isPersistent);
        }
      },
      {
        key: "show",
        value: function show() {
          if (this.isPersistent) {
            return;
          }
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          NUI.execute("cool-wounds:show", true);
          this.timeout = setTimeout(function() {
            NUI.execute("cool-wounds:show", false);
          }, this.showFor);
        }
      },
      {
        key: "keyPressed",
        value: function keyPressed() {
          var _this = this;
          return _async_to_generator8(function() {
            return _ts_generator8(this, function(_state) {
              switch (_state.label) {
                case 0:
                  if (_this.isPersistent)
                    return [
                      2
                    ];
                  NUI.execute("wounds:quickInspection:show", true);
                  global.exports.focusmanager.SetUIFocus(true, true);
                  SetNuiFocusKeepInput(true);
                  if (!IsNuiFocused())
                    return [
                      2
                    ];
                  DisableControlAction(0, 1, true);
                  DisableControlAction(0, 2, true);
                  return [
                    4,
                    Utils.wait(0)
                  ];
                case 1:
                  _state.sent();
                  return [
                    2
                  ];
              }
            });
          })();
        }
      },
      {
        key: "keyReleased",
        value: function keyReleased() {
          if (this.isPersistent) {
            return;
          }
          NUI.execute("wounds:quickInspection:show", false);
          global.exports.focusmanager.SetUIFocus(false, false);
          SetNuiFocusKeepInput(false);
        }
      }
    ]);
    return QuickInspection2;
  }();
  _define_property8(QuickInspection, "isPersistent", false);
  _define_property8(QuickInspection, "showFor", 3e3);
  _define_property8(QuickInspection, "timeout", void 0);

  // ../src/client/constants/bones.ts
  var bones = {
    body: [
      0,
      11816,
      57597,
      23553,
      24816,
      24817,
      24818,
      64654,
      34911,
      56604,
      53251,
      17916,
      38180,
      3515,
      52667,
      50813,
      40244,
      44297,
      47158,
      19729,
      43885,
      2359,
      2449,
      37920,
      10594,
      16705,
      10754,
      19265,
      55853,
      33349,
      8487,
      41166,
      839,
      840,
      51592,
      51591,
      51432,
      51431,
      841,
      842,
      843,
      49118,
      7168
    ],
    head: [
      39317,
      31086,
      12844,
      65068,
      58331,
      45750,
      25260,
      21550,
      29868,
      43536,
      27474,
      19336,
      1356,
      11174,
      37193,
      20178,
      61839,
      20279,
      17719,
      46240,
      17188,
      20623,
      47419,
      49979,
      47495,
      35731,
      24532,
      2849,
      35477,
      9038,
      46456,
      39100,
      16015,
      40591,
      19068,
      19069,
      19070,
      19071,
      19072,
      13810,
      12274,
      13809,
      12273,
      13808,
      12272,
      13807,
      12271,
      13806,
      12270,
      29222,
      16051,
      35226,
      17447,
      19038,
      62895,
      61499,
      43614,
      11252,
      47585,
      9290,
      51017,
      50811,
      29317,
      55675,
      50619,
      50669,
      41012,
      49881,
      50921,
      50907,
      8433,
      29474,
      49503,
      57434,
      31189,
      31093,
      27232,
      31010,
      14079,
      41039,
      8120,
      39843,
      23242,
      52600,
      26887,
      58363,
      58364,
      59307,
      33121,
      30491,
      5956,
      39308,
      65100,
      47530,
      55286,
      61777,
      33346,
      19663,
      38849,
      44821,
      26618,
      10167,
      54081,
      61586,
      39711,
      42329,
      12074,
      50583,
      21159,
      37400,
      2115,
      30332,
      36299,
      16929,
      63446,
      53011,
      20635,
      52979,
      20603,
      44921,
      6621,
      24625,
      10256,
      40058,
      5285,
      62311,
      22939,
      22940,
      2064,
      37844,
      4407,
      32817,
      30587,
      54814,
      3378,
      29564,
      7382,
      3651,
      30364,
      36811,
      45876,
      40878,
      5135,
      41817,
      6905,
      11434,
      44825,
      6468,
      32276,
      45333,
      62042,
      3594,
      54593,
      31843,
      33138,
      32735,
      445,
      17787,
      48713,
      62289,
      3603,
      13090,
      36656,
      45519,
      14286,
      14524,
      6004,
      57444,
      31123,
      31105,
      2844,
      58728,
      1980,
      56642,
      30083,
      20943,
      14382,
      14428,
      2876,
      60942,
      21699,
      11194,
      15987,
      41410,
      50788,
      5749,
      27871,
      25526,
      25657,
      23312,
      16902,
      16903,
      16904,
      58331,
      45750,
      25260,
      21550,
      29868,
      43536,
      27474,
      19336,
      1356,
      11174,
      37193,
      20178,
      61839,
      20279,
      17719,
      46240,
      17188,
      20623,
      47419,
      49979,
      47495
    ],
    rightArm: [
      10706,
      40269,
      28252,
      57005,
      58866,
      64016,
      64017,
      58867,
      64096,
      64097,
      58868,
      64112,
      64113,
      58869,
      64064,
      64065,
      58870,
      64080,
      64081,
      28422,
      6286,
      43810,
      37119,
      2992,
      11363,
      27064,
      11347,
      61259,
      26875,
      37596,
      2262,
      35161,
      20536,
      57742,
      14858,
      21679,
      34577,
      20143
    ],
    leftArm: [
      64729,
      45509,
      61163,
      18905,
      26610,
      4089,
      4090,
      26611,
      4169,
      4170,
      26612,
      4185,
      4186,
      26613,
      4137,
      4138,
      26614,
      4153,
      4154,
      60309,
      36029,
      61007,
      5232,
      22711,
      35939,
      24504,
      35923,
      41540,
      51082,
      10040,
      37692
    ],
    leftLeg: [
      58271,
      63931,
      14201,
      2108,
      33989,
      26813,
      65245,
      57717,
      46078,
      23639,
      4115,
      24589,
      50201,
      16562,
      39785,
      7531
    ],
    rightLeg: [
      51826,
      36864,
      52301,
      20781,
      4246,
      29027,
      35502,
      24806,
      16335,
      6442,
      45075,
      20899,
      30482,
      49473,
      34545,
      45631
    ]
  };
  var spineMid = [
    24817
  ];

  // ../src/client/classes/PlayerDamage.ts
  function _array_like_to_array10(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes8(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function asyncGeneratorStep9(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator9(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep9(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep9(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check12(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties12(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class12(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties12(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties12(Constructor, staticProps);
    return Constructor;
  }
  function _iterable_to_array_limit8(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest8() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array8(arr, i) {
    return _array_with_holes8(arr) || _iterable_to_array_limit8(arr, i) || _unsupported_iterable_to_array10(arr, i) || _non_iterable_rest8();
  }
  function _unsupported_iterable_to_array10(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array10(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array10(o, minLen);
  }
  function _ts_generator9(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var PlayerDamage = /* @__PURE__ */ function() {
    "use strict";
    function PlayerDamage2() {
      _class_call_check12(this, PlayerDamage2);
    }
    _create_class12(PlayerDamage2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator9(function() {
            return _ts_generator9(this, function(_state) {
              on("DamageEvents:EntityDamaged", _this.entityDamaged.bind(_this));
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "load",
        value: function load() {
          PlayerHealth.mobility();
        }
      },
      {
        key: "entityDamaged",
        value: function entityDamaged(entity, attacker, weapon, isMelee) {
          var playerPed = PlayerPedId();
          if (entity !== playerPed) {
            return;
          }
          if (!PlayerState.loaded) {
            return;
          }
          var maxHealth = GetEntityMaxHealth(playerPed);
          if (maxHealth !== PlayerState.defaultMaxHealth) {
            return;
          }
          var savedHealth = PlayerState.savedHealth;
          var currentHealth = GetEntityHealth(playerPed);
          var savedArmor = PlayerArmor.savedArmor;
          var currentArmor = GetPedArmour(playerPed);
          var remainingHealth = Math.abs(savedHealth - currentHealth);
          var remainingArmor = Math.abs(savedArmor - currentArmor);
          if (savedHealth !== currentHealth && !PlayerState.currentState.isDead) {
            this.action(remainingHealth, attacker, weapon);
          }
          if (savedArmor !== currentArmor && !PlayerState.currentState.isDead) {
            this.action(remainingArmor, attacker, weapon);
          }
        }
      },
      {
        key: "action",
        value: function action(newValue, attacker, weapon) {
          var playerPed = PlayerPedId();
          var _GetPedLastDamageBone = _sliced_to_array8(GetPedLastDamageBone(playerPed), 2), _ = _GetPedLastDamageBone[0], part = _GetPedLastDamageBone[1];
          var woundBone = this.getWoundBone();
          if (woundBone) {
            var _woundBone = _sliced_to_array8(woundBone, 2), bone = _woundBone[0], _1 = _woundBone[1];
            if (newValue > 5) {
              QuickInspection.show();
              if (spineMid.includes(part) || bone === "head") {
                var fwdVector = GetEntityForwardVector(playerPed);
                SetPedToRagdollWithFall(playerPed, 1e3, 1e3, 1, fwdVector[0], fwdVector[1], fwdVector[2], 1, 0, 0, 0, 0, 0, 0);
              }
            }
            PlayerState.damageBone(bone, newValue, attacker, weapon);
          }
        }
      },
      {
        key: "getWoundBone",
        value: function getWoundBone() {
          var playerPed = PlayerPedId();
          var _GetPedLastDamageBone = _sliced_to_array8(GetPedLastDamageBone(playerPed), 2), _ = _GetPedLastDamageBone[0], part = _GetPedLastDamageBone[1];
          var woundBone = Object.entries(bones).find(function(bone) {
            var _bone = _sliced_to_array8(bone, 2), _2 = _bone[0], boneIds = _bone[1];
            return boneIds.includes(part);
          });
          return woundBone;
        }
      }
    ]);
    return PlayerDamage2;
  }();

  // ../src/client/classes/PlayerDeath.ts
  function asyncGeneratorStep10(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator10(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep10(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep10(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check13(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties13(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class13(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties13(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties13(Constructor, staticProps);
    return Constructor;
  }
  function _ts_generator10(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var PlayerDeath = /* @__PURE__ */ function() {
    "use strict";
    function PlayerDeath2() {
      _class_call_check13(this, PlayerDeath2);
    }
    _create_class13(PlayerDeath2, null, [
      {
        key: "Init",
        value: function Init() {
          return _async_to_generator10(function() {
            return _ts_generator10(this, function(_state) {
              return [
                2
              ];
            });
          })();
        }
      }
    ]);
    return PlayerDeath2;
  }();

  // ../src/client/constants/itemAnimations.ts
  var itemAnimations = {
    bandage: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 10
    },
    ifak: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 30
    },
    painkiller: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 200
    },
    tourniquet: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 0
    },
    splint: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 0
    },
    tweezers: {
      animDict: "items@clear@custom_anim",
      anim: "bandage",
      flag: 49,
      duration: 1e4,
      label: "Healing",
      health: 0
    }
  };

  // ../src/client/classes/HealingItems.ts
  function asyncGeneratorStep11(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator11(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep11(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep11(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check14(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties14(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class14(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties14(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties14(Constructor, staticProps);
    return Constructor;
  }
  function _define_property9(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _ts_generator11(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var HealingItems = /* @__PURE__ */ function() {
    "use strict";
    function HealingItems2() {
      _class_call_check14(this, HealingItems2);
    }
    _create_class14(HealingItems2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator11(function() {
            return _ts_generator11(this, function(_state) {
              RPCNew.register("wounds:useHealingItem", _this.useHealingItem.bind(_this));
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "useHealingItem",
        value: function useHealingItem(itemId, bone) {
          var _this = this;
          return _async_to_generator11(function() {
            var hasItem, animation, playerPed, progress;
            return _ts_generator11(this, function(_state) {
              switch (_state.label) {
                case 0:
                  if (itemId === "painkiller" && PlayerHealth.inPainKillers) {
                    emit("DoLongHudText", "You are already on painkillers", 2);
                    return [
                      2,
                      false
                    ];
                  }
                  if (_this.busy) {
                    emit("DoLongHudText", "You are already using an item", 2);
                    return [
                      2,
                      false
                    ];
                  }
                  if (!!bone) {
                  }
                  hasItem = global.exports["srp-inventory"].hasEnoughOfItem(itemId, 1);
                  if (!hasItem) {
                    emit("DoLongHudText", "You do not have this item", 2);
                    return [
                      2,
                      false
                    ];
                  }
                  _this.busy = true;
                  animation = itemAnimations[itemId];
                  playerPed = PlayerPedId();
                  if (!!bone) {
                  }
                  return [
                    4,
                    Streaming.loadAnim(animation.animDict)
                  ];
                case 1:
                  _state.sent();
                  TaskPlayAnim(playerPed, animation.animDict, animation.anim, 8, 1, -1, animation.flag, 0, false, false, false);
                  Events.emitNet("wounds:sound", "bandaging_01", animation.duration);
                  return [
                    4,
                    global.exports["srp-taskbar"].taskBar(animation.duration, animation.label)
                  ];
                case 2:
                  progress = _state.sent();
                  ClearPedSecondaryTask(playerPed);
                  _this.busy = false;
                  if (progress !== 100) {
                    Events.emitNet("wounds:sound:cleanup");
                    return [
                      2,
                      false
                    ];
                  }
                  switch (itemId) {
                    case "tourniquet":
                      PlayerState.fixBleeding(bone);
                      break;
                    case "splint":
                      PlayerState.fixBroken(bone);
                      break;
                    case "tweezers":
                      PlayerState.removeBullets(bone);
                      break;
                    default:
                      PlayerState.heal(animation.health, false, itemId, bone);
                      break;
                  }
                  return [
                    2,
                    true
                  ];
              }
            });
          })();
        }
      }
    ]);
    return HealingItems2;
  }();
  _define_property9(HealingItems, "busy", false);

  // ../src/client/classes/Camera.ts
  function _class_call_check15(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties15(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class15(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties15(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties15(Constructor, staticProps);
    return Constructor;
  }
  function _define_property10(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var Camera = /* @__PURE__ */ function() {
    "use strict";
    function Camera2() {
      _class_call_check15(this, Camera2);
    }
    _create_class15(Camera2, null, [
      {
        key: "start",
        value: function start(playerPed, isDead) {
          this.cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);
          var plyCoords = GetEntityCoords(playerPed, false);
          var plyHeading = GetEntityHeading(playerPed);
          if (isDead) {
            var offset = GetObjectOffsetFromCoords(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, -0.2, 0.1, 1);
            SetCamCoord(this.cam, offset[0], offset[1], offset[2]);
            SetCamRot(this.cam, -90, 0, plyHeading - 177.5, 2);
          } else {
            var offset1 = GetObjectOffsetFromCoords(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, -0.4, 2, 0);
            SetCamCoord(this.cam, offset1[0], offset1[1], offset1[2]);
            SetCamRot(this.cam, 0, 0, plyHeading - 180, 2);
          }
          RenderScriptCams(true, true, 750, true, false);
          SetCamFov(this.cam, 60);
        }
      },
      {
        key: "stop",
        value: function stop() {
          DestroyCam(this.cam, true);
          RenderScriptCams(false, true, 1e3, true, false);
        }
      }
    ]);
    return Camera2;
  }();
  _define_property10(Camera, "cam", 0);

  // ../src/client/classes/Inspection.ts
  function _array_like_to_array11(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes9(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function asyncGeneratorStep12(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator12(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep12(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep12(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check16(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties16(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class16(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties16(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties16(Constructor, staticProps);
    return Constructor;
  }
  function _define_property11(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _iterable_to_array_limit9(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest9() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array9(arr, i) {
    return _array_with_holes9(arr) || _iterable_to_array_limit9(arr, i) || _unsupported_iterable_to_array11(arr, i) || _non_iterable_rest9();
  }
  function _unsupported_iterable_to_array11(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array11(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array11(o, minLen);
  }
  function _ts_generator12(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var Inspection = /* @__PURE__ */ function() {
    "use strict";
    function Inspection2() {
      _class_call_check16(this, Inspection2);
    }
    _create_class16(Inspection2, null, [
      {
        key: "Init",
        value: function Init() {
          var _this = this;
          return _async_to_generator12(function() {
            return _ts_generator12(this, function(_state) {
              NUI.register("wounds:inspection:getItems", _this.getItems.bind(_this));
              NUI.register("wounds:inspection:dragEnd", _this.dragEnd.bind(_this));
              NUI.register("wounds:inspection:refreshData", _this.refreshData.bind(_this));
              NUI.register("wounds:inspection:close", _this.close.bind(_this));
              on("wounds:inspection:open", _this.inspect.bind(_this));
              globalThis.exports.focusmanager.RegisterFocusHandler(function(hasFocus, hasCursor) {
                if (hasCursor) {
                  SetCursorLocation(0.5, 0.5);
                }
                SetNuiFocus(hasFocus, hasCursor);
              });
              return [
                2
              ];
            });
          })();
        }
      },
      {
        key: "getItems",
        value: function getItems() {
          return _async_to_generator12(function() {
            return _ts_generator12(this, function(_state) {
              return [
                2,
                [
                  {
                    id: "bandage",
                    item: {
                      name: "Bandage",
                      description: "Heals Wounds and ...",
                      image: "https://assets.nopixel.net/dev/images/inventory/icons/bandage_2.png"
                    },
                    quantity: 5
                  },
                  {
                    id: "tweezers",
                    item: {
                      name: "Tweezers",
                      description: "Removes bullets from wounds.",
                      image: "https://assets.nopixel.net/dev/images/inventory/icons/tweezers_1.png"
                    },
                    quantity: 5
                  },
                  {
                    id: "splint",
                    item: {
                      name: "Splint",
                      description: "Fixes broken bones.",
                      image: "https://assets.nopixel.net/dev/images/inventory/icons/splint_1.png"
                    },
                    quantity: 5
                  },
                  {
                    id: "ifak",
                    item: {
                      name: "IFAK",
                      description: "Government (PD/EMS/DOC) Issued Equipment",
                      image: "https://assets.nopixel.net/dev/images/inventory/icons/ifak.png"
                    },
                    quantity: 5
                  }
                ]
              ];
            });
          })();
        }
      },
      {
        key: "dragEnd",
        value: function dragEnd(itemId, offsetId) {
          var _this = this;
          return _async_to_generator12(function() {
            var results, animation, playerPed;
            return _ts_generator12(this, function(_state) {
              switch (_state.label) {
                case 0:
                  return [
                    4,
                    RPCNew.execute("wounds:inspection:dragEnd", itemId, _this.currentPlayer, offsetId)
                  ];
                case 1:
                  results = _state.sent();
                  if (!results)
                    return [
                      2
                    ];
                  animation = itemAnimations[results.itemId];
                  if (!animation)
                    return [
                      2
                    ];
                  playerPed = PlayerPedId();
                  return [
                    4,
                    global.exports["srp-taskbar"].taskBar(animation.duration, animation.label)
                  ];
                case 2:
                  _state.sent();
                  ClearPedSecondaryTask(playerPed);
                  return [
                    2
                  ];
              }
            });
          })();
        }
      },
      {
        key: "refreshData",
        value: function refreshData() {
          var _this = this;
          return _async_to_generator12(function() {
            var playerState, serverId;
            return _ts_generator12(this, function(_state) {
              switch (_state.label) {
                case 0:
                  return [
                    4,
                    RPCNew.execute("cool-wounds:playerState:get", _this.currentPlayer)
                  ];
                case 1:
                  playerState = _state.sent();
                  if (!playerState)
                    return [
                      2
                    ];
                  serverId = GetPlayerServerId(PlayerId());
                  NUI.execute("wounds:inspection:data", {
                    wounds: playerState.wounds,
                    show: true,
                    edit: serverId !== _this.currentPlayer
                  });
                  return [
                    2
                  ];
              }
            });
          })();
        }
      },
      {
        key: "inspect",
        value: function inspect(args, entity) {
          var _this = this;
          return _async_to_generator12(function() {
            var playerPed, pedFlags, player, serverId, offsets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, boneName, boneId, bone, bonePos, _GetHudScreenPositionFromWorldPosition, _, screenX, screenY;
            return _ts_generator12(this, function(_state) {
              switch (_state.label) {
                case 0:
                  playerPed = entity !== null && entity !== void 0 ? entity : PlayerPedId();
                  pedFlags = global.exports["srp-flags"].GetPedFlags(playerPed);
                  Camera.start(playerPed, pedFlags.isDead);
                  player = NetworkGetPlayerIndexFromPed(playerPed);
                  serverId = GetPlayerServerId(player);
                  _this.currentPlayer = serverId;
                  _this.flagDead = pedFlags.isDead;
                  if (!pedFlags.isDead) {
                    Events.emitNet("wounds:inspection:freeze", _this.currentPlayer, true);
                  }
                  _this.refreshData();
                  global.exports.focusmanager.SetUIFocus(true, true);
                  return [
                    4,
                    Utils.wait(800)
                  ];
                case 1:
                  _state.sent();
                  offsets = [];
                  _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
                  try {
                    for (_iterator = Object.entries(_this.bones)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      _step_value = _sliced_to_array9(_step.value, 2), boneName = _step_value[0], boneId = _step_value[1];
                      bone = GetPedBoneIndex(playerPed, boneId);
                      bonePos = GetWorldPositionOfEntityBone(playerPed, bone);
                      _GetHudScreenPositionFromWorldPosition = _sliced_to_array9(GetHudScreenPositionFromWorldPosition(bonePos[0], bonePos[1], bonePos[2]), 3), _ = _GetHudScreenPositionFromWorldPosition[0], screenX = _GetHudScreenPositionFromWorldPosition[1], screenY = _GetHudScreenPositionFromWorldPosition[2];
                      offsets.push({
                        id: boneName,
                        x: screenX * 100,
                        y: screenY * 100,
                        isLeft: boneName === "leftArm" || boneName === "leftLeg" || boneName === "body"
                      });
                    }
                  } catch (err2) {
                    _didIteratorError = true;
                    _iteratorError = err2;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }
                  NUI.execute("wounds:inspection:offsets", offsets);
                  return [
                    2
                  ];
              }
            });
          })();
        }
      },
      {
        key: "close",
        value: function close() {
          Camera.stop();
          if (!this.flagDead) {
            Events.emitNet("wounds:inspection:freeze", this.currentPlayer, false);
            this.flagDead = false;
          }
          global.exports.focusmanager.SetUIFocus(false, false);
        }
      }
    ]);
    return Inspection2;
  }();
  _define_property11(Inspection, "bones", {
    head: 31086,
    body: 0,
    leftArm: 61163,
    rightArm: 28252,
    leftLeg: 63931,
    rightLeg: 36864
  });
  _define_property11(Inspection, "currentPlayer", 0);
  _define_property11(Inspection, "flagDead", false);

  // ../src/client/classes/DebugCommands.ts
  function asyncGeneratorStep13(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator13(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep13(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep13(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _class_call_check17(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties17(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class17(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties17(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties17(Constructor, staticProps);
    return Constructor;
  }
  function _ts_generator13(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var DebugCommands = /* @__PURE__ */ function() {
    "use strict";
    function DebugCommands2() {
      _class_call_check17(this, DebugCommands2);
    }
    _create_class17(DebugCommands2, null, [
      {
        key: "Init",
        value: function Init() {
          return _async_to_generator13(function() {
            return _ts_generator13(this, function(_state) {
              return [
                2
              ];
            });
          })();
        }
      }
    ]);
    return DebugCommands2;
  }();

  // ../src/client/client.ts
  function _array_like_to_array12(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _array_with_holes10(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function asyncGeneratorStep14(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error2) {
      reject(error2);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _async_to_generator14(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep14(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep14(gen, resolve, reject, _next, _throw, "throw", err2);
        }
        _next(void 0);
      });
    };
  }
  function _iterable_to_array_limit10(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err2) {
      _d = true;
      _e = err2;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _non_iterable_rest10() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _sliced_to_array10(arr, i) {
    return _array_with_holes10(arr) || _iterable_to_array_limit10(arr, i) || _unsupported_iterable_to_array12(arr, i) || _non_iterable_rest10();
  }
  function _unsupported_iterable_to_array12(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _array_like_to_array12(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _array_like_to_array12(o, minLen);
  }
  function _ts_generator14(thisArg, body) {
    var f2, y, t, g, _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    };
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([
          n,
          v
        ]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [
              op[0] & 2,
              t.value
            ];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [
                0
              ];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [
            6,
            e
          ];
          y = 0;
        } finally {
          f2 = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  var resource = new Resource({
    codename: "wounds",
    version: "1.0.0"
  });
  on("onClientResourceStart", function() {
    var _ref = _async_to_generator14(function(resourceName) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, key, _;
      return _ts_generator14(this, function(_state) {
        switch (_state.label) {
          case 0:
            if (resourceName !== GetCurrentResourceName())
              return [
                2
              ];
            return [
              4,
              PlayerDamage.Init()
            ];
          case 1:
            _state.sent();
            return [
              4,
              PlayerState.Init()
            ];
          case 2:
            _state.sent();
            return [
              4,
              PlayerDeath.Init()
            ];
          case 3:
            _state.sent();
            return [
              4,
              QuickInspection.Init()
            ];
          case 4:
            _state.sent();
            return [
              4,
              PlayerHealth.Init()
            ];
          case 5:
            _state.sent();
            return [
              4,
              HealingItems.Init()
            ];
          case 6:
            _state.sent();
            return [
              4,
              PlayerArmor.Init()
            ];
          case 7:
            _state.sent();
            return [
              4,
              Inspection.Init()
            ];
          case 8:
            _state.sent();
            if (!(GetConvar("sv_environment", "prod") === "debug"))
              return [
                3,
                10
              ];
            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
            try {
              for (_iterator = Object.entries(injuryList)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _step_value = _sliced_to_array10(_step.value, 2), key = _step_value[0], _ = _step_value[1];
                SetWeaponDamageModifier(parseInt(key), 0.5);
              }
            } catch (err2) {
              _didIteratorError = true;
              _iteratorError = err2;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
            return [
              4,
              DebugCommands.Init()
            ];
          case 9:
            _state.sent();
            _state.label = 10;
          case 10:
            return [
              2
            ];
        }
      });
    });
    return function(resourceName) {
      return _ref.apply(this, arguments);
    };
  }());
  on("wounds:hotreload", function() {
    var _ref = _async_to_generator14(function(message) {
      return _ts_generator14(this, function(_state) {
        switch (_state.label) {
          case 0:
            if (!message)
              return [
                2
              ];
            console.log(message);
            return [
              4,
              PlayerState.load()
            ];
          case 1:
            _state.sent();
            return [
              2
            ];
        }
      });
    });
    return function(message) {
      return _ref.apply(this, arguments);
    };
  }());
  onNet("srp-spawn:characterSpawned", /* @__PURE__ */ _async_to_generator14(function() {
    return _ts_generator14(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            PlayerState.load()
          ];
        case 1:
          _state.sent();
          return [
            2
          ];
      }
    });
  }));
})();
/*! Bundled license information:

crypto-js/ripemd160.js:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)

crypto-js/mode-ctr-gladman.js:
  (** @preserve
  * Counter block mode compatible with  Dr Brian Gladman fileenc.c
  * derived from CryptoJS.mode.CTR
  * Jan Hruby jhruby.web@gmail.com
  *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
