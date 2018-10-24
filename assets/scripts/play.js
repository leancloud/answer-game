(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.play = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
	var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

	var stringify$1 = createCommonjsModule(function (module) {
	module.exports = { "default": stringify, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$1);

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _redefine = _hide;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	}

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON$1 = _global.JSON;
	var _stringify = $JSON$1 && $JSON$1.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON$1 && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON$1, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getPrototypeOf, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$1, __esModule: true };
	});

	unwrapExports(defineProperty$2);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf, __esModule: true };
	});

	unwrapExports(setPrototypeOf$1);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object$1 = _core.Object;
	var create = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$1 = createCommonjsModule(function (module) {
	module.exports = { "default": create, __esModule: true };
	});

	unwrapExports(create$1);

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



	var _create2 = _interopRequireDefault(create$1);



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	var componentEmitter = createCommonjsModule(function (module) {
	/**
	 * Expose `Emitter`.
	 */

	{
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};
	});

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}

	var isObject_1 = isObject;

	/**
	 * Module of mixed-in functions shared between node and client code
	 */


	/**
	 * Expose `RequestBase`.
	 */

	var requestBase = RequestBase;

	/**
	 * Initialize a new `RequestBase`.
	 *
	 * @api public
	 */

	function RequestBase(obj) {
	  if (obj) return mixin(obj);
	}

	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in RequestBase.prototype) {
	    obj[key] = RequestBase.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.clearTimeout = function _clearTimeout(){
	  clearTimeout(this._timer);
	  clearTimeout(this._responseTimeoutTimer);
	  delete this._timer;
	  delete this._responseTimeoutTimer;
	  return this;
	};

	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */

	RequestBase.prototype.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Set format of binary response body.
	 * In browser valid formats are 'blob' and 'arraybuffer',
	 * which return Blob and ArrayBuffer, respectively.
	 *
	 * In Node all values result in Buffer.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};

	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */

	RequestBase.prototype.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};

	/**
	 * Set timeouts.
	 *
	 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
	 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
	 *
	 * Value of 0 or false means no timeout.
	 *
	 * @param {Number|Object} ms or {response, deadline}
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.timeout = function timeout(options){
	  if (!options || 'object' !== typeof options) {
	    this._timeout = options;
	    this._responseTimeout = 0;
	    return this;
	  }

	  for(var option in options) {
	    switch(option) {
	      case 'deadline':
	        this._timeout = options.deadline;
	        break;
	      case 'response':
	        this._responseTimeout = options.response;
	        break;
	      default:
	        console.warn("Unknown timeout option", option);
	    }
	  }
	  return this;
	};

	/**
	 * Set number of retry attempts on error.
	 *
	 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
	 *
	 * @param {Number} count
	 * @param {Function} [fn]
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.retry = function retry(count, fn){
	  // Default to 1 if no count passed or true
	  if (arguments.length === 0 || count === true) count = 1;
	  if (count <= 0) count = 0;
	  this._maxRetries = count;
	  this._retries = 0;
	  this._retryCallback = fn;
	  return this;
	};

	var ERROR_CODES = [
	  'ECONNRESET',
	  'ETIMEDOUT',
	  'EADDRINFO',
	  'ESOCKETTIMEDOUT'
	];

	/**
	 * Determine if a request should be retried.
	 * (Borrowed from segmentio/superagent-retry)
	 *
	 * @param {Error} err
	 * @param {Response} [res]
	 * @returns {Boolean}
	 */
	RequestBase.prototype._shouldRetry = function(err, res) {
	  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
	    return false;
	  }
	  if (this._retryCallback) {
	    try {
	      var override = this._retryCallback(err, res);
	      if (override === true) return true;
	      if (override === false) return false;
	      // undefined falls back to defaults
	    } catch(e) {
	      console.error(e);
	    }
	  }
	  if (res && res.status && res.status >= 500 && res.status != 501) return true;
	  if (err) {
	    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
	    // Superagent timeout
	    if (err.timeout && err.code == 'ECONNABORTED') return true;
	    if (err.crossDomain) return true;
	  }
	  return false;
	};

	/**
	 * Retry request
	 *
	 * @return {Request} for chaining
	 * @api private
	 */

	RequestBase.prototype._retry = function() {

	  this.clearTimeout();

	  // node
	  if (this.req) {
	    this.req = null;
	    this.req = this.request();
	  }

	  this._aborted = false;
	  this.timedout = false;

	  return this._end();
	};

	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} [reject]
	 * @return {Request}
	 */

	RequestBase.prototype.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    if (this._endCalled) {
	      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
	    }
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject) {
	      self.end(function(err, res) {
	        if (err) innerReject(err);
	        else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	};

	RequestBase.prototype['catch'] = function(cb) {
	  return this.then(undefined, cb);
	};

	/**
	 * Allow for extension
	 */

	RequestBase.prototype.use = function use(fn) {
	  fn(this);
	  return this;
	};

	RequestBase.prototype.ok = function(cb) {
	  if ('function' !== typeof cb) throw Error("Callback required");
	  this._okCallback = cb;
	  return this;
	};

	RequestBase.prototype._isResponseOK = function(res) {
	  if (!res) {
	    return false;
	  }

	  if (this._okCallback) {
	    return this._okCallback(res);
	  }

	  return res.status >= 200 && res.status < 300;
	};

	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	RequestBase.prototype.get = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */

	RequestBase.prototype.getHeader = RequestBase.prototype.get;

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.set = function(field, val){
	  if (isObject_1(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	RequestBase.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Write the field `name` and `val`, or multiple fields with one object
	 * for "multipart/form-data" request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 *
	 * request.post('/upload')
	 *   .field({ foo: 'bar', baz: 'qux' })
	 *   .end(callback);
	 * ```
	 *
	 * @param {String|Object} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	RequestBase.prototype.field = function(name, val) {
	  // name should be either a string or an object.
	  if (null === name || undefined === name) {
	    throw new Error('.field(name, val) name can not be empty');
	  }

	  if (this._data) {
	    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObject_1(name)) {
	    for (var key in name) {
	      this.field(key, name[key]);
	    }
	    return this;
	  }

	  if (Array.isArray(val)) {
	    for (var i in val) {
	      this.field(name, val[i]);
	    }
	    return this;
	  }

	  // val should be defined now
	  if (null === val || undefined === val) {
	    throw new Error('.field(name, val) val can not be empty');
	  }
	  if ('boolean' === typeof val) {
	    val = '' + val;
	  }
	  this._getFormData().append(name, val);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	RequestBase.prototype.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
	  switch (options.type) {
	    case 'basic':
	      this.set('Authorization', 'Basic ' + base64Encoder(user + ':' + pass));
	      break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	      break;

	    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
	      this.set('Authorization', 'Bearer ' + user);
	      break;
	  }
	  return this;
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	RequestBase.prototype.withCredentials = function(on) {
	  // This is browser-only functionality. Node side is no-op.
	  if (on == undefined) on = true;
	  this._withCredentials = on;
	  return this;
	};

	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};

	/**
	 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
	 * Default 200MB.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 */
	RequestBase.prototype.maxResponseSize = function(n){
	  if ('number' !== typeof n) {
	    throw TypeError("Invalid argument");
	  }
	  this._maxResponseSize = n;
	  return this;
	};

	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */

	RequestBase.prototype.toJSON = function() {
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header,
	  };
	};

	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.send = function(data){
	  var isObj = isObject_1(data);
	  var type = this._header['content-type'];

	  if (this._formData) {
	    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObj && !this._data) {
	    if (Array.isArray(data)) {
	      this._data = [];
	    } else if (!this._isHost(data)) {
	      this._data = {};
	    }
	  } else if (data && this._data && this._isHost(this._data)) {
	    throw Error("Can't merge these send calls");
	  }

	  // merge
	  if (isObj && isObject_1(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!isObj || this._isHost(data)) {
	    return this;
	  }

	  // default to json
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Sort `querystring` by the sort function
	 *
	 *
	 * Examples:
	 *
	 *       // default order
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery()
	 *         .end(callback)
	 *
	 *       // customized sort function
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery(function(a, b){
	 *           return a.length - b.length;
	 *         })
	 *         .end(callback)
	 *
	 *
	 * @param {Function} sort
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.sortQuery = function(sort) {
	  // _sort default to true but otherwise can be a function or boolean
	  this._sort = typeof sort === 'undefined' ? true : sort;
	  return this;
	};

	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */
	RequestBase.prototype._finalizeQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
	  }
	  this._query.length = 0; // Makes the call idempotent

	  if (this._sort) {
	    var index = this.url.indexOf('?');
	    if (index >= 0) {
	      var queryArr = this.url.substring(index + 1).split('&');
	      if ('function' === typeof this._sort) {
	        queryArr.sort(this._sort);
	      } else {
	        queryArr.sort();
	      }
	      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
	    }
	  }
	};

	// For backwards compat only
	RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	RequestBase.prototype._timeoutError = function(reason, timeout, errno){
	  if (this._aborted) {
	    return;
	  }
	  var err = new Error(reason + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  err.code = 'ECONNABORTED';
	  err.errno = errno;
	  this.timedout = true;
	  this.abort();
	  this.callback(err);
	};

	RequestBase.prototype._setTimeouts = function() {
	  var self = this;

	  // deadline
	  if (this._timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
	    }, this._timeout);
	  }
	  // response timeout
	  if (this._responseTimeout && !this._responseTimeoutTimer) {
	    this._responseTimeoutTimer = setTimeout(function(){
	      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
	    }, this._responseTimeout);
	  }
	};

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	var type = function(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	var params = function(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */);
	    var key = parts.shift();
	    var val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Parse Link header fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	var parseLinks = function(str){
	  return str.split(/ *, */).reduce(function(obj, str){
	    var parts = str.split(/ *; */);
	    var url = parts[0].slice(1, -1);
	    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
	    obj[rel] = url;
	    return obj;
	  }, {});
	};

	/**
	 * Strip content related fields from `header`.
	 *
	 * @param {Object} header
	 * @return {Object} header
	 * @api private
	 */

	var cleanHeader = function(header, changesOrigin){
	  delete header['content-type'];
	  delete header['content-length'];
	  delete header['transfer-encoding'];
	  delete header['host'];
	  // secuirty
	  if (changesOrigin) {
	    delete header['authorization'];
	    delete header['cookie'];
	  }
	  return header;
	};

	var utils = {
		type: type,
		params: params,
		parseLinks: parseLinks,
		cleanHeader: cleanHeader
	};

	/**
	 * Module dependencies.
	 */



	/**
	 * Expose `ResponseBase`.
	 */

	var responseBase = ResponseBase;

	/**
	 * Initialize a new `ResponseBase`.
	 *
	 * @api public
	 */

	function ResponseBase(obj) {
	  if (obj) return mixin$1(obj);
	}

	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin$1(obj) {
	  for (var key in ResponseBase.prototype) {
	    obj[key] = ResponseBase.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	ResponseBase.prototype.get = function(field) {
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	ResponseBase.prototype._setHeaderProperties = function(header){
	    // TODO: moar!
	    // TODO: make this a util

	    // content-type
	    var ct = header['content-type'] || '';
	    this.type = utils.type(ct);

	    // params
	    var params = utils.params(ct);
	    for (var key in params) this[key] = params[key];

	    this.links = {};

	    // links
	    try {
	        if (header.link) {
	            this.links = utils.parseLinks(header.link);
	        }
	    } catch (err) {
	        // ignore
	    }
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	ResponseBase.prototype._setStatusProperties = function(status){
	    var type = status / 100 | 0;

	    // status / class
	    this.status = this.statusCode = status;
	    this.statusType = type;

	    // basics
	    this.info = 1 == type;
	    this.ok = 2 == type;
	    this.redirect = 3 == type;
	    this.clientError = 4 == type;
	    this.serverError = 5 == type;
	    this.error = (4 == type || 5 == type)
	        ? this.toError()
	        : false;

	    // sugar
	    this.created = 201 == status;
	    this.accepted = 202 == status;
	    this.noContent = 204 == status;
	    this.badRequest = 400 == status;
	    this.unauthorized = 401 == status;
	    this.notAcceptable = 406 == status;
	    this.forbidden = 403 == status;
	    this.notFound = 404 == status;
	    this.unprocessableEntity = 422 == status;
	};

	function Agent() {
	  this._defaults = [];
	}

	["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
	 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(fn) {
	  /** Default setting for all requests from this agent */
	  Agent.prototype[fn] = function(/*varargs*/) {
	    this._defaults.push({fn:fn, arguments:arguments});
	    return this;
	  };
	});

	Agent.prototype._setDefaults = function(req) {
	    this._defaults.forEach(function(def) {
	      req[def.fn].apply(req, def.arguments);
	    });
	};

	var agentBase = Agent;

	var client = createCommonjsModule(function (module, exports) {
	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = commonjsGlobal;
	}







	/**
	 * Noop.
	 */

	function noop(){}
	/**
	 * Expose `request`.
	 */

	var request = exports = module.exports = function(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new exports.Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new exports.Request('GET', method);
	  }

	  return new exports.Request(method, url);
	};

	exports.Request = Request;

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only version of superagent could not find XHR");
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject_1(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val != null) {
	    if (Array.isArray(val)) {
	      val.forEach(function(v) {
	        pushEncodedKeyValuePair(pairs, key, v);
	      });
	    } else if (isObject_1(val)) {
	      for(var subkey in val) {
	        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	      }
	    } else {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(val));
	    }
	  } else if (val === null) {
	    pairs.push(encodeURIComponent(key));
	  }
	}

	/**
	 * Expose serialization method.
	 */

	request.serializeObject = serialize;

	/**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'text/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	request.serialize = {
	  'application/x-www-form-urlencoded': serialize,
	  'application/json': JSON.stringify
	};

	/**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    if (index === -1) { // could be empty line, just skip it
	      continue;
	    }
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  // should match /json or +json
	  // but not /json-seq
	  return /[\/+]json($|[^-\w])/.test(mime);
	}

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req) {
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  var status = this.xhr.status;
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	  this._setStatusProperties(status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);

	  if (null === this.text && req._responseType) {
	    this.body = this.xhr.response;
	  } else {
	    this.body = this.req.method != 'HEAD'
	      ? this._parseBody(this.text ? this.text : this.xhr.response)
	      : null;
	  }
	}

	responseBase(Response.prototype);

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype._parseBody = function(str) {
	  var parse = request.parse[this.type];
	  if (this.req._parser) {
	    return this.req._parser(this, str);
	  }
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      if (self.xhr) {
	        // ie9 doesn't have 'response' property
	        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
	        // issue #876: return the http status code if the response parsing fails
	        err.status = self.xhr.status ? self.xhr.status : null;
	        err.statusCode = err.status; // backwards-compat only
	      } else {
	        err.rawResponse = null;
	        err.status = null;
	      }

	      return self.callback(err);
	    }

	    self.emit('response', res);

	    var new_err;
	    try {
	      if (!self._isResponseOK(res)) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	      }
	    } catch(custom_err) {
	      new_err = custom_err; // ok() callback can throw
	    }

	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      new_err.original = err;
	      new_err.response = res;
	      new_err.status = res.status;
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}

	/**
	 * Mixin `Emitter` and `RequestBase`.
	 */

	componentEmitter(Request.prototype);
	requestBase(Request.prototype);

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} [pass] optional in case of using 'bearer' as type
	 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass, options){
	  if (1 === arguments.length) pass = '';
	  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
	    options = pass;
	    pass = '';
	  }
	  if (!options) {
	    options = {
	      type: 'function' === typeof btoa ? 'basic' : 'auto',
	    };
	  }

	  var encoder = function(string) {
	    if ('function' === typeof btoa) {
	      return btoa(string);
	    }
	    throw new Error('Cannot use basic auth, btoa is not a function');
	  };

	  return this._auth(user, pass, options, encoder);
	};

	/**
	 * Add query-string `val`.
	 *
	 * Examples:
	 *
	 *   request.get('/shoes')
	 *     .query('size=10')
	 *     .query({ color: 'blue' })
	 *
	 * @param {Object|String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `options` (or filename).
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String|Object} options
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, options){
	  if (file) {
	    if (this._data) {
	      throw Error("superagent can't mix .send() and .attach()");
	    }

	    this._getFormData().append(field, file, options || file.name);
	  }
	  return this;
	};

	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  if (this._shouldRetry(err, res)) {
	    return this._retry();
	  }

	  var fn = this._callback;
	  this.clearTimeout();

	  if (err) {
	    if (this._maxRetries) err.retries = this._retries - 1;
	    this.emit('error', err);
	  }

	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	// This only warns, because the request is still likely to work
	Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
	  console.warn("This is not supported in browser version of superagent");
	  return this;
	};

	// This throws, because it can't send/receive data as expected
	Request.prototype.pipe = Request.prototype.write = function(){
	  throw Error("Streaming is not supported in browser version of superagent");
	};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	Request.prototype._isHost = function _isHost(obj) {
	  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
	  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  if (this._endCalled) {
	    console.warn("Warning: .end() was called twice. This is not supported in superagent");
	  }
	  this._endCalled = true;

	  // store callback
	  this._callback = fn || noop;

	  // querystring
	  this._finalizeQueryString();

	  return this._end();
	};

	Request.prototype._end = function() {
	  var self = this;
	  var xhr = (this.xhr = request.getXHR());
	  var data = this._formData || this._data;

	  this._setTimeouts();

	  // state change
	  xhr.onreadystatechange = function(){
	    var readyState = xhr.readyState;
	    if (readyState >= 2 && self._responseTimeoutTimer) {
	      clearTimeout(self._responseTimeoutTimer);
	    }
	    if (4 != readyState) {
	      return;
	    }

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status; } catch(e) { status = 0; }

	    if (!status) {
	      if (self.timedout || self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(direction, e) {
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = direction;
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    try {
	      xhr.onprogress = handleProgress.bind(null, 'download');
	      if (xhr.upload) {
	        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
	      }
	    } catch(e) {
	      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	      // Reported here:
	      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	    }
	  }

	  // initiate request
	  try {
	    if (this.username && this.password) {
	      xhr.open(this.method, this.url, true, this.username, this.password);
	    } else {
	      xhr.open(this.method, this.url, true);
	    }
	  } catch (err) {
	    // see #1149
	    return this.callback(err);
	  }

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) {
	      serialize = request.serialize['application/json'];
	    }
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;

	    if (this.header.hasOwnProperty(field))
	      xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};

	request.agent = function() {
	  return new agentBase();
	};

	["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(method) {
	  agentBase.prototype[method.toLowerCase()] = function(url, fn) {
	    var req = new request.Request(method, url);
	    this._setDefaults(req);
	    if (fn) {
	      req.end(fn);
	    }
	    return req;
	  };
	});

	agentBase.prototype.del = agentBase.prototype['delete'];

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn) {
	  var req = request('GET', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn) {
	  var req = request('HEAD', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.options = function(url, data, fn) {
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	function del(url, data, fn) {
	  var req = request('DELETE', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	}

	request['del'] = del;
	request['delete'] = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn) {
	  var req = request('PATCH', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn) {
	  var req = request('POST', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn) {
	  var req = request('PUT', url);
	  if ('function' == typeof data) (fn = data), (data = null);
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	});
	var client_1 = client.Request;

	var eventemitter3 = createCommonjsModule(function (module) {

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	}
	});

	/**
	 * 节点地区
	 * @readonly
	 * @enum {number}
	 */
	var Region = {
	  /** 华北节点 */
	  NorthChina: 0,
	  /** 华东节点 */
	  EastChina: 1,
	  /** 美国节点 */
	  NorthAmerica: 2 };

	/**
	 * 事件
	 * @readonly
	 * @enum {string}
	 */
	var Event = {
	  /**
	               * 连接成功
	               * @event Play#CONNECTED
	               */
	  CONNECTED: 'connected',
	  /**
	                           * 连接失败
	                           *
	                           * @event Play#CONNECT_FAILED
	                           * @param {Object} payload
	                           * @param {Number} payload.code
	                           * @param {String} payload.detail
	                           */
	  CONNECT_FAILED: 'connectFailed',
	  /**
	                                    * 断开连接
	                                    * @event Play#DISCONNECTED
	                                    */
	  DISCONNECTED: 'disconnected',
	  /**
	                                 * 加入到大厅
	                                 * @event Play#LOBBY_JOINED
	                                 */
	  LOBBY_JOINED: 'lobbyJoined',
	  /**
	                                * 离开大厅
	                                * @event Play#LOBBY_LEFT
	                                */
	  LOBBY_LEFT: 'lobbyLeft',
	  /**
	                            * 大厅房间列表变化
	                            * @event Play#LOBBY_ROOM_LIST_UPDATED
	                            */
	  LOBBY_ROOM_LIST_UPDATED: 'lobbyRoomListUpdate',
	  /**
	                                                   * 创建房间成功
	                                                   * @event Play#ROOM_CREATED
	                                                   */
	  ROOM_CREATED: 'roomCreated',
	  /**
	                                * 创建房间失败
	                                * @event Play#ROOM_CREATE_FAILED
	                                * @param {Object} payload
	                                * @param {Number} payload.code
	                                * @param {String} payload.detail
	                                */
	  ROOM_CREATE_FAILED: 'roomCreateFailed',
	  /**
	                                           * 加入房间成功
	                                           * @event Play#ROOM_JOINED
	                                           */
	  ROOM_JOINED: 'roomJoined',
	  /**
	                              * 加入房间失败
	                              * @event Play#ROOM_JOIN_FAILED
	                              */
	  ROOM_JOIN_FAILED: 'roomJoinFailed',
	  /**
	                                       * 有新玩家加入房间
	                                       * @event Play#PLAYER_ROOM_JOINED
	                                       * @param {Object} payload
	                                       * @param {Player} payload.newPlayer
	                                       */
	  PLAYER_ROOM_JOINED: 'newPlayerJoinedRoom',
	  /**
	                                              * 有玩家离开房间
	                                              * @event Play#PLAYER_ROOM_LEFT
	                                              * @param {Object} payload
	                                              * @param {Player} payload.leftPlayer
	                                              */
	  PLAYER_ROOM_LEFT: 'playerLeftRoom',
	  /**
	                                       * 玩家活跃属性变化
	                                       * @event Play#PLAYER_ACTIVITY_CHANGED
	                                       * @param {Object} payload
	                                       * @param {Player} payload.player
	                                       */
	  PLAYER_ACTIVITY_CHANGED: 'playerActivityChanged',
	  /**
	                                                     * 主机变更
	                                                     * @event Play#MASTER_SWITCHED
	                                                     * @param {Object} payload
	                                                     * @param {Player} payload.newMaster
	                                                     */
	  MASTER_SWITCHED: 'masterSwitched',
	  /**
	                                      * 房间「开启 / 关闭」
	                                      * @event Play#ROOM_OPEN_CHANGED
	                                      * @param {Object} payload
	                                      * @param {Boolean} payload.opened
	                                      */
	  ROOM_OPEN_CHANGED: 'roomOpenChanged',
	  /**
	                                         * 房间「可见 / 不可见」
	                                         * @event Play#ROOM_VISIBLE_CHANGED
	                                         * @param {Object} payload
	                                         * @param {Boolean} payload.visible
	                                         */
	  ROOM_VISIBLE_CHANGED: 'roomVisibleChanged',
	  /**
	                                               * 离开房间
	                                               * @event Play#ROOM_LEFT
	                                               */
	  ROOM_LEFT: 'roomLeft',
	  /**
	                          * 房间自定义属性变化
	                          * @event Play#ROOM_CUSTOM_PROPERTIES_CHANGED
	                          * @param {Object} payload
	                          * @param {Object} payload.changedProps
	                          */
	  ROOM_CUSTOM_PROPERTIES_CHANGED: 'roomCustomPropertiesChanged',
	  /**
	                                                                  * 玩家自定义属性变化
	                                                                  * @event Play#PLAYER_CUSTOM_PROPERTIES_CHANGED
	                                                                  * @param {Object} payload
	                                                                  * @param {Player} payload.player
	                                                                  * @param {Object} payload.changedProps
	                                                                  */
	  PLAYER_CUSTOM_PROPERTIES_CHANGED: 'playerCustomPropertiesChanged',
	  /**
	                                                                      * 自定义事件
	                                                                      * @event Play#CUSTOM_EVENT
	                                                                      * @param {Object} payload
	                                                                      * @param {Number|String} payload.eventId
	                                                                      * @param {Object} payload.eventData
	                                                                      * @param {Number} payload.senderId
	                                                                      */
	  CUSTOM_EVENT: 'customEvent',
	  /**
	                                * 错误事件
	                                * @event Play#ERROR
	                                * @param {Object} payload
	                                * @param {Number} payload.code
	                                * @param {String} payload.detail
	                                */
	  ERROR: 'error' };

	/**
	                                                                                                                                                                                                   * 玩家类
	                                                                                                                                                                                                   */var
	Player = function () {
	  function Player(play) {_classCallCheck(this, Player);
	    this._play = play;
	    this._userId = '';
	    this._actorId = -1;
	  }_createClass(Player, [{ key: '_initWithJSONObject', value: function _initWithJSONObject(







	    playerJSONObject) {
	      this._userId = playerJSONObject.pid;
	      this._actorId = playerJSONObject.actorId;
	      if (playerJSONObject.attr) {
	        this.properties = playerJSONObject.attr;
	      } else {
	        this.properties = {};
	      }
	    }

	    /**
	       * 玩家 ID
	       * @type {string}
	       * @readonly
	       */ }, { key: 'isLocal',













	    /**
	                                * 判断是不是当前客户端玩家
	                                * @return {Boolean}
	                                */value: function isLocal()
	    {
	      return (
	        this._actorId !== -1 && this._play._player._actorId === this._actorId);

	    }

	    /**
	       * 判断是不是主机玩家
	       * @return {Boolean}
	       */ }, { key: 'isMaster', value: function isMaster()
	    {
	      return this._actorId !== -1 && this._play._room.masterId === this._actorId;
	    }

	    /**
	       * 判断是不是活跃状态
	       * @return {Boolean}
	       */ }, { key: 'isActive', value: function isActive()
	    {
	      return this.active;
	    }

	    /**
	       * 设置玩家的自定义属性
	       * @param {Object} properties 自定义属性
	       * @param {Object} [opts] 设置选项
	       * @param {Object} [opts.expectedValues] 期望属性，用于 CAS 检测
	       */ }, { key: 'setCustomProperties', value: function setCustomProperties(
	    properties) {var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref$expectedValues = _ref.expectedValues,expectedValues = _ref$expectedValues === undefined ? null : _ref$expectedValues;
	      this._play._setPlayerCustomProperties(
	      this._actorId,
	      properties,
	      expectedValues);

	    }

	    /**
	       * @deprecated
	       * 获取自定义属性
	       * @return {Object}
	       */ }, { key: 'getCustomProperties', value: function getCustomProperties()
	    {
	      return this.properties;
	    }

	    /**
	       * 获取自定义属性
	       * @return {Object}
	       */ }, { key: '_setActive',




	    // 设置活跃状态
	    value: function _setActive(active) {
	      this.active = active;
	    } }, { key: '_mergeProperties', value: function _mergeProperties(

	    changedProperties) {
	      this.properties = _Object$assign(this.properties, changedProperties);
	    } }, { key: 'userId', get: function get() {return this._userId;} /**
	                                                                      * 房间玩家 ID
	                                                                      * @type {number}
	                                                                      * @readonly
	                                                                      */ }, { key: 'actorId', get: function get() {return this._actorId;} }, { key: 'CustomProperties', get: function get() {return this.properties;} }], [{ key: '_newFromJSONObject', value: function _newFromJSONObject(play, playerJSONObject) {var player = new Player(play);player._initWithJSONObject(playerJSONObject);return player;} }]);return Player;}();

	/**
	                                                                                                                                  * 大厅房间数据类
	                                                                                                                                  */var
	LobbyRoom = function () {
	  function LobbyRoom(lobbyRoomDTO) {_classCallCheck(this, LobbyRoom);
	    this._roomName = lobbyRoomDTO.cid;
	    this._maxPlayerCount = lobbyRoomDTO.maxMembers;
	    this._expectedUserIds = lobbyRoomDTO.expectMembers;
	    this._emptyRoomTtl = lobbyRoomDTO.emptyRoomTtl;
	    this._playerTtl = lobbyRoomDTO.playerTtl;
	    this._playerCount = lobbyRoomDTO.playerCount;
	    if (lobbyRoomDTO.attr) {
	      this._customRoomProperties = lobbyRoomDTO.attr;
	    }
	  }

	  /**
	     * 房间名称
	     * @type {string}
	     * @readonly
	     */_createClass(LobbyRoom, [{ key: "roomName", get: function get()
	    {
	      return this._roomName;
	    }

	    /**
	       * 房间最大玩家数
	       * @type {number}
	       * @readonly
	       */ }, { key: "maxPlayerCount", get: function get()
	    {
	      return this._maxPlayerCount;
	    }

	    /**
	       * 邀请好友 ID 数组
	       * @type {Array.<string>}
	       * @readonly
	       */ }, { key: "expectedUserIds", get: function get()
	    {
	      return this._expectedUserIds;
	    }

	    /**
	       * 房间置空后销毁时间（秒）
	       * @type {number}
	       * @readonly
	       */ }, { key: "emptyRoomTtl", get: function get()
	    {
	      return this._emptyRoomTtl;
	    }

	    /**
	       * 玩家离线后踢出房间时间（秒）
	       * @type {number}
	       * @readonly
	       */ }, { key: "playerTtl", get: function get()
	    {
	      return this._playerTtl;
	    }

	    /**
	       * 当前房间玩家数量
	       * @type {number}
	       * @readonly
	       */ }, { key: "playerCount", get: function get()
	    {
	      return this._playerCount;
	    }

	    /**
	       * 房间属性
	       * @type {Object}
	       * @readonly
	       */ }, { key: "customRoomProperties", get: function get()
	    {
	      return this._customRoomProperties;
	    } }]);return LobbyRoom;}();

	var defineProperty$4 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty = unwrapExports(defineProperty$4);

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	var ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */
	function setup(env) {
	  createDebug.debug = createDebug;
	  createDebug.default = createDebug;
	  createDebug.coerce = coerce;
	  createDebug.disable = disable;
	  createDebug.enable = enable;
	  createDebug.enabled = enabled;
	  createDebug.humanize = ms;
	  Object.keys(env).forEach(function (key) {
	    createDebug[key] = env[key];
	  });
	  /**
	  * Active `debug` instances.
	  */

	  createDebug.instances = [];
	  /**
	  * The currently active debug mode names, and names to skip.
	  */

	  createDebug.names = [];
	  createDebug.skips = [];
	  /**
	  * Map of special "%n" handling functions, for the debug "format" argument.
	  *
	  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	  */

	  createDebug.formatters = {};
	  /**
	  * Selects a color for a debug namespace
	  * @param {String} namespace The namespace string for the for the debug instance to be colored
	  * @return {Number|String} An ANSI color code for the given namespace
	  * @api private
	  */

	  function selectColor(namespace) {
	    var hash = 0;

	    for (var i = 0; i < namespace.length; i++) {
	      hash = (hash << 5) - hash + namespace.charCodeAt(i);
	      hash |= 0; // Convert to 32bit integer
	    }

	    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	  }

	  createDebug.selectColor = selectColor;
	  /**
	  * Create a debugger with the given `namespace`.
	  *
	  * @param {String} namespace
	  * @return {Function}
	  * @api public
	  */

	  function createDebug(namespace) {
	    var prevTime;

	    function debug() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      // Disabled?
	      if (!debug.enabled) {
	        return;
	      }

	      var self = debug; // Set `diff` timestamp

	      var curr = Number(new Date());
	      var ms$$1 = curr - (prevTime || curr);
	      self.diff = ms$$1;
	      self.prev = prevTime;
	      self.curr = curr;
	      prevTime = curr;
	      args[0] = createDebug.coerce(args[0]);

	      if (typeof args[0] !== 'string') {
	        // Anything else let's inspect with %O
	        args.unshift('%O');
	      } // Apply any `formatters` transformations


	      var index = 0;
	      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	        // If we encounter an escaped % then don't increase the array index
	        if (match === '%%') {
	          return match;
	        }

	        index++;
	        var formatter = createDebug.formatters[format];

	        if (typeof formatter === 'function') {
	          var val = args[index];
	          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

	          args.splice(index, 1);
	          index--;
	        }

	        return match;
	      }); // Apply env-specific formatting (colors, etc.)

	      createDebug.formatArgs.call(self, args);
	      var logFn = self.log || createDebug.log;
	      logFn.apply(self, args);
	    }

	    debug.namespace = namespace;
	    debug.enabled = createDebug.enabled(namespace);
	    debug.useColors = createDebug.useColors();
	    debug.color = selectColor(namespace);
	    debug.destroy = destroy;
	    debug.extend = extend; // Debug.formatArgs = formatArgs;
	    // debug.rawLog = rawLog;
	    // env-specific initialization logic for debug instances

	    if (typeof createDebug.init === 'function') {
	      createDebug.init(debug);
	    }

	    createDebug.instances.push(debug);
	    return debug;
	  }

	  function destroy() {
	    var index = createDebug.instances.indexOf(this);

	    if (index !== -1) {
	      createDebug.instances.splice(index, 1);
	      return true;
	    }

	    return false;
	  }

	  function extend(namespace, delimiter) {
	    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	  }
	  /**
	  * Enables a debug mode by namespaces. This can include modes
	  * separated by a colon and wildcards.
	  *
	  * @param {String} namespaces
	  * @api public
	  */


	  function enable(namespaces) {
	    createDebug.save(namespaces);
	    createDebug.names = [];
	    createDebug.skips = [];
	    var i;
	    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	    var len = split.length;

	    for (i = 0; i < len; i++) {
	      if (!split[i]) {
	        // ignore empty strings
	        continue;
	      }

	      namespaces = split[i].replace(/\*/g, '.*?');

	      if (namespaces[0] === '-') {
	        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	      } else {
	        createDebug.names.push(new RegExp('^' + namespaces + '$'));
	      }
	    }

	    for (i = 0; i < createDebug.instances.length; i++) {
	      var instance = createDebug.instances[i];
	      instance.enabled = createDebug.enabled(instance.namespace);
	    }
	  }
	  /**
	  * Disable debug output.
	  *
	  * @api public
	  */


	  function disable() {
	    createDebug.enable('');
	  }
	  /**
	  * Returns true if the given mode name is enabled, false otherwise.
	  *
	  * @param {String} name
	  * @return {Boolean}
	  * @api public
	  */


	  function enabled(name) {
	    if (name[name.length - 1] === '*') {
	      return true;
	    }

	    var i;
	    var len;

	    for (i = 0, len = createDebug.skips.length; i < len; i++) {
	      if (createDebug.skips[i].test(name)) {
	        return false;
	      }
	    }

	    for (i = 0, len = createDebug.names.length; i < len; i++) {
	      if (createDebug.names[i].test(name)) {
	        return true;
	      }
	    }

	    return false;
	  }
	  /**
	  * Coerce `val`.
	  *
	  * @param {Mixed} val
	  * @return {Mixed}
	  * @api private
	  */


	  function coerce(val) {
	    if (val instanceof Error) {
	      return val.stack || val.message;
	    }

	    return val;
	  }

	  createDebug.enable(createDebug.load());
	  return createDebug;
	}

	var common = setup;

	var browser = createCommonjsModule(function (module, exports) {

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/* eslint-env browser */

	/**
	 * This is the web browser implementation of `debug()`.
	 */
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	/**
	 * Colors.
	 */

	exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	// eslint-disable-next-line complexity

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
	    return true;
	  } // Internet Explorer and Edge do not support colors.


	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  } // Is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */


	function formatArgs(args) {
	  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

	  if (!this.useColors) {
	    return;
	  }

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into

	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if (match === '%%') {
	      return;
	    }

	    index++;

	    if (match === '%c') {
	      // We only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	  args.splice(lastC, 0, c);
	}
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */


	function log() {
	  var _console;

	  // This hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
	}
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */


	function save(namespaces) {
	  try {
	    if (namespaces) {
	      exports.storage.setItem('debug', namespaces);
	    } else {
	      exports.storage.removeItem('debug');
	    }
	  } catch (error) {// Swallow
	    // XXX (@Qix-) should we be logging these?
	  }
	}
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */


	function load() {
	  var r;

	  try {
	    r = exports.storage.getItem('debug');
	  } catch (error) {} // Swallow
	  // XXX (@Qix-) should we be logging these?
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */


	function localstorage() {
	  try {
	    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
	    // The Browser also has localStorage in the global context.
	    return localStorage;
	  } catch (error) {// Swallow
	    // XXX (@Qix-) should we be logging these?
	  }
	}

	module.exports = common(exports);
	var formatters = module.exports.formatters;
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (error) {
	    return '[UnexpectedJSONParseError]: ' + error.message;
	  }
	};
	});
	var browser_1 = browser.log;
	var browser_2 = browser.formatArgs;
	var browser_3 = browser.save;
	var browser_4 = browser.load;
	var browser_5 = browser.useColors;
	var browser_6 = browser.storage;
	var browser_7 = browser.colors;

	var _logger;
	var d$1 = browser('Play');

	/**
	                         * 日志级别
	                         */
	var LogLevel = {
	  Debug: 'Debug',
	  Warn: 'Warn',
	  Error: 'Error' };


	var logger = (_logger = {}, _defineProperty(_logger,
	LogLevel.Debug, d$1), _defineProperty(_logger,
	LogLevel.Warn, console.warn.bind(console)), _defineProperty(_logger,
	LogLevel.Error, console.error.bind(console)), _logger);


	function setLogger(newLogger) {
	  _Object$assign(logger, newLogger);
	}

	/**
	   * 调试输出
	   * @param {String} log
	   */
	function debug(log) {
	  var fullLog = '[DEBUG] ' + log;
	  logger[LogLevel.Debug](fullLog);
	}

	/**
	   * 警告输出
	   * @param {String} log
	   */
	function warn(log) {
	  var fullLog = '[WARN] ' + log;
	  logger[LogLevel.Warn](fullLog);
	}

	/**
	   * 错误输出
	   * @param {String} log
	   */
	function error(log) {
	  var fullLog = '[ERROR] ' + log;
	  logger[LogLevel.Error](fullLog);
	}

	function handleErrorMsg(play, msg) {
	  error('error: ' + _JSON$stringify(msg));
	  play.emit(Event.ERROR, {
	    code: msg.reasonCode,
	    detail: msg.detail });

	}

	/**
	 * 连接状态
	 */
	var PlayState = {
	  /**
	                   * 关闭
	                   */
	  CLOSED: 0,
	  /**
	              * 连接中
	              */
	  CONNECTING: 1,
	  /**
	                  * 大厅连接成功
	                  */
	  LOBBY_OPEN: 2,
	  /**
	                  * 房间连接成功
	                  */
	  GAME_OPEN: 3,
	  /**
	                 * 关闭中
	                 */
	  CLOSING: 4 };

	// 连接建立
	function handleSessionOpen(play, msg) {
	  play._playState = PlayState.LOBBY_OPEN;
	  play._sessionToken = msg.st;
	  var player = new Player(play);
	  player._userId = play.userId;
	  play._player = player;
	  if (play.autoJoinLobby) {
	    play.joinLobby();
	  }
	  if (play._gameToLobby) {
	    play.emit(Event.ROOM_LEFT);
	    play._gameToLobby = false;
	  } else {
	    play.emit(Event.CONNECTED);
	  }
	}

	// 加入大厅
	function handleJoinedLobby(play, msg) {
	  if (msg.reasonCode) {var
	    reasonCode = msg.reasonCode,detail = msg.detail;
	    error('join lobby failed: ' + reasonCode + ' - ' + detail);
	  } else {
	    play._inLobby = true;
	    play.emit(Event.LOBBY_JOINED);
	  }
	}

	// 离开大厅
	function handleLeftLobby(play) {
	  play._inLobby = false;
	  play.emit(Event.LOBBY_LEFT);
	}

	// 房间列表更新
	function handleRoomList(play, msg) {
	  play._lobbyRoomList = [];
	  for (var i = 0; i < msg.list.length; i += 1) {
	    var lobbyRoomDTO = msg.list[i];
	    play._lobbyRoomList[i] = new LobbyRoom(lobbyRoomDTO);
	  }
	  play.emit(Event.LOBBY_ROOM_LIST_UPDATED);
	}

	function handleGameServer(play, msg) {
	  if (play._inLobby) {
	    play._inLobby = false;
	    play.emit(Event.LOBBY_LEFT);
	  }
	  play._gameServer = msg.secureAddr;
	  if (msg.cid) {
	    play._cachedRoomMsg.cid = msg.cid;
	  }
	  play._connectToGame();
	}

	// 创建房间
	function handleCreateGameServer(play, msg) {
	  if (msg.reasonCode) {
	    play.emit(Event.ROOM_CREATE_FAILED, {
	      code: msg.reasonCode,
	      detail: msg.detail });

	  } else {
	    play._cachedRoomMsg.op = 'start';
	    handleGameServer(play, msg);
	  }
	}

	// 加入房间
	/* eslint no-param-reassign: ["error", { "props": false }] */
	function handleJoinGameServer(play, msg) {
	  if (msg.reasonCode) {
	    play.emit(Event.ROOM_JOIN_FAILED, {
	      code: msg.reasonCode,
	      detail: msg.detail });

	  } else {
	    play._cachedRoomMsg.op = 'add';
	    handleGameServer(play, msg);
	  }
	}

	// 大厅消息处理
	function handleLobbyMsg(play, message) {
	  var msg = JSON.parse(message.data);
	  debug(play.userId + ' Lobby msg: ' + msg.op + ' \n<- ' + message.data);
	  switch (msg.cmd) {
	    case 'session':
	      switch (msg.op) {
	        case 'opened':
	          handleSessionOpen(play, msg);
	          break;
	        default:
	          error('no handler for lobby msg: ' + msg.op);
	          break;}

	      break;
	    case 'lobby':
	      switch (msg.op) {
	        case 'added':
	          handleJoinedLobby(play, msg);
	          break;
	        case 'room-list':
	          handleRoomList(play, msg);
	          break;
	        case 'remove':
	          handleLeftLobby(play);
	          break;
	        default:
	          error('no handler for lobby msg: ' + msg.op);
	          break;}

	      break;
	    case 'statistic':
	      break;
	    case 'conv':
	      switch (msg.op) {
	        case 'results':
	          handleRoomList(play, msg);
	          break;
	        case 'started':
	          handleCreateGameServer(play, msg);
	          break;
	        case 'added':
	          handleJoinGameServer(play, msg);
	          break;
	        case 'random-added':
	          handleJoinGameServer(play, msg);
	          break;
	        default:
	          error('no handler for lobby msg: ' + msg.op);
	          break;}

	      break;
	    case 'events':
	      // TODO

	      break;
	    case 'error':
	      handleErrorMsg(play, msg);
	      break;
	    default:
	      if (msg.cmd) {
	        error('no handler for lobby msg: ' + msg.cmd);
	      }
	      break;}

	}

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	var values$1 = createCommonjsModule(function (module) {
	module.exports = { "default": values, __esModule: true };
	});

	var _Object$values = unwrapExports(values$1);

	/**
	                                                                                                                                                                                                                                                                                                  * 房间类
	                                                                                                                                                                                                                                                                                                  */var
	Room = function () {
	  function Room(play) {_classCallCheck(this, Room);
	    this._play = play;
	  }

	  /* eslint no-param-reassign: ["error", { "props": false }] */_createClass(Room, [{ key: 'getPlayer',























































































	    /**
	                                                                                                        * 根据 actorId 获取 Player 对象
	                                                                                                        * @param {number} actorId 玩家在房间中的 Id
	                                                                                                        * @return {Player}
	                                                                                                        */value: function getPlayer(
	    actorId) {
	      if (!(typeof actorId === 'number')) {
	        throw new TypeError(actorId + ' is not a number');
	      }
	      var player = this._players[actorId];
	      if (player === null) {
	        throw new TypeError('player with id:' + actorId + ' not found');
	      }
	      return player;
	    }

	    /**
	       * 获取房间内的玩家列表
	       * @return {Array.<Player>}
	       * @readonly
	       */ }, { key: 'setCustomProperties',




	    /**
	                                            * 设置房间的自定义属性
	                                            * @param {Object} properties 自定义属性
	                                            * @param {Object} [opts] 设置选项
	                                            * @param {Object} [opts.expectedValues] 期望属性，用于 CAS 检测
	                                            */value: function setCustomProperties(
	    properties) {var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref$expectedValues = _ref.expectedValues,expectedValues = _ref$expectedValues === undefined ? null : _ref$expectedValues;
	      this._play._setRoomCustomProperties(properties, expectedValues);
	    }

	    /**
	       * @deprecated
	       * 获取自定义属性
	       * @return {Object}
	       */ }, { key: 'getCustomProperties', value: function getCustomProperties()
	    {
	      return this._properties;
	    }

	    /**
	       * 获取自定义属性
	       * @return {Object}
	       */ }, { key: '_addPlayer', value: function _addPlayer(




	    newPlayer) {
	      if (!(newPlayer instanceof Player)) {
	        throw new TypeError(newPlayer + ' is not a Player');
	      }
	      this._players[newPlayer.actorId] = newPlayer;
	    } }, { key: '_removePlayer', value: function _removePlayer(

	    actorId) {
	      delete this._players[actorId];
	    } }, { key: '_mergeProperties', value: function _mergeProperties(

	    changedProperties) {
	      this._properties = _Object$assign(this._properties, changedProperties);
	    } }, { key: 'name', /**
	                         * 房间名称
	                         * @type {string}
	                         * @readonly
	                         */get: function get() {return this._name;} /**
	                                                                     * 房间是否开启
	                                                                     * @type {boolean}
	                                                                     * @readonly
	                                                                     */ }, { key: 'opened', get: function get() {return this._opened;} /**
	                                                                                                                                        * 房间是否可见
	                                                                                                                                        * @type {boolean}
	                                                                                                                                        * @readonly
	                                                                                                                                        */ }, { key: 'visible', get: function get() {return this._visible;} /**
	                                                                                                                                                                                                             * 房间允许的最大玩家数量
	                                                                                                                                                                                                             * @type {number}
	                                                                                                                                                                                                             * @readonly
	                                                                                                                                                                                                             */ }, { key: 'maxPlayerCount', get: function get() {return this._maxPlayerCount;} /**
	                                                                                                                                                                                                                                                                                                * 获取房主
	                                                                                                                                                                                                                                                                                                * @readonly
	                                                                                                                                                                                                                                                                                                */ }, { key: 'master', get: function get() {return this.getPlayer(this.masterId);} /**
	                                                                                                                                                                                                                                                                                                                                                                                    * 房间主机玩家 ID
	                                                                                                                                                                                                                                                                                                                                                                                    * @type {number}
	                                                                                                                                                                                                                                                                                                                                                                                    * @readonly
	                                                                                                                                                                                                                                                                                                                                                                                    */ }, { key: 'masterId', get: function get() {return this._masterActorId;} /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 邀请的好友 ID 列表
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @type {Array.<string>}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @readonly
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                */ }, { key: 'expectedUserIds', get: function get() {return this._expectedUserIds;} }, { key: 'playerList', get: function get() {return _Object$values(this._players);} }, { key: 'CustomProperties', get: function get() {return this._properties;} }], [{ key: '_newFromJSONObject', value: function _newFromJSONObject(play, roomJSONObject) {var room = new Room(play);room._name = roomJSONObject.cid;room._opened = roomJSONObject.open;room._visible = roomJSONObject.visible;room._maxPlayerCount = roomJSONObject.maxMembers;room._masterActorId = roomJSONObject.masterActorId;room._expectedUserIds = roomJSONObject.expectMembers;room._players = {};for (var i = 0; i < roomJSONObject.members.length; i += 1) {var playerDTO = roomJSONObject.members[i];var player = Player._newFromJSONObject(play, playerDTO);if (player.userId === play.userId) {play._player = player;}room._players[player.actorId] = player;}if (roomJSONObject.attr) {room._properties = roomJSONObject.attr;} else {room._properties = {};}return room;} }]);return Room;}();

	// 连接建立后创建 / 加入房间
	function handleSessionOpen$1(play, msg) {
	  if (msg.reasonCode) {
	    play._playState = PlayState.LOBBY_OPEN;
	    play._closeGameSocket(function () {
	      play.emit(Event.ERROR, {
	        code: msg.reasonCode,
	        detail: msg.detail });

	    });
	  } else {
	    // 根据缓存加入房间的规则
	    play._cachedRoomMsg.i = play._getMsgId();
	    play._sendGameMessage(play._cachedRoomMsg);
	  }
	}

	function handleSessionClose(play) {
	  // 收到 closed 协议后，客户端主动断开连接
	  play._closeGameSocket();
	}

	// 创建房间
	function handleCreatedRoom(play, msg) {
	  if (msg.reasonCode) {
	    play._playState = PlayState.LOBBY_OPEN;
	    play._closeGameSocket(function () {
	      play.emit(Event.ROOM_CREATE_FAILED, {
	        code: msg.reasonCode,
	        detail: msg.detail });

	    });
	  } else {
	    play._closeLobbySocket(function () {
	      play._playState = PlayState.GAME_OPEN;
	      play._room = Room._newFromJSONObject(play, msg);
	      play.emit(Event.ROOM_CREATED);
	      play.emit(Event.ROOM_JOINED);
	    });
	  }
	}

	// 加入房间
	function handleJoinedRoom(play, msg) {
	  if (msg.reasonCode) {
	    play._playState = PlayState.LOBBY_OPEN;
	    play._closeGameSocket(function () {
	      play.emit(Event.ROOM_JOIN_FAILED, {
	        code: msg.reasonCode,
	        detail: msg.detail });

	    });
	  } else {
	    play._closeLobbySocket(function () {
	      play._playState = PlayState.GAME_OPEN;
	      play._room = Room._newFromJSONObject(play, msg);
	      play.emit(Event.ROOM_JOINED);
	    });
	  }
	}

	// 有新玩家加入房间
	function handleNewPlayerJoinedRoom(play, msg) {
	  var newPlayer = Player._newFromJSONObject(play, msg.member);
	  play._room._addPlayer(newPlayer);
	  play.emit(Event.PLAYER_ROOM_JOINED, {
	    newPlayer: newPlayer });

	}

	// 有玩家离开房间
	function handlePlayerLeftRoom(play, msg) {
	  var actorId = msg.initByActor;
	  var leftPlayer = play._room.getPlayer(actorId);
	  play._room._removePlayer(actorId);
	  play.emit(Event.PLAYER_ROOM_LEFT, {
	    leftPlayer: leftPlayer });

	}

	// 主机切换应答
	function handleMasterUpdated(msg) {
	  if (msg.reasonCode) {
	    error('set master error: ' + msg.reasonCode + ', ' + msg.detail);
	  }
	}

	// 主机切换
	function handleMasterChanged(play, msg) {
	  if (play === null) {
	    debug('play is null');
	  } else if (play._room === null) {
	    debug('play _room is null');
	    debug(play.userId);
	  }
	  play._room._masterActorId = msg.masterActorId;
	  var newMaster = play._room.getPlayer(msg.masterActorId);
	  play.emit(Event.MASTER_SWITCHED, {
	    newMaster: newMaster });

	}

	// 房间开启 / 关闭
	function handleRoomOpenedChanged(play, msg) {
	  var opened = msg.toggle;
	  play._room._opened = opened;
	  play.emit(Event.ROOM_OPEN_CHANGED, {
	    opened: opened });

	}

	// 房间是否可见
	function handleRoomVisibleChanged(play, msg) {
	  var visible = msg.toggle;
	  play._room._visible = visible;
	  play.emit(Event.ROOM_VISIBLE_CHANGED, {
	    visible: visible });

	}

	// 房间属性变更应答
	function handleRoomCustomPropertiesChangedResponse(msg) {
	  if (msg.reasonCode) {
	    error('set room properties error: ' + msg.reasonCode + ', ' + msg.detail);
	  }
	}

	// 房间属性变更
	function handleRoomCustomPropertiesChanged(play, msg) {
	  var changedProps = msg.attr;
	  play._room._mergeProperties(changedProps);
	  play.emit(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, {
	    changedProps: changedProps });

	}

	// 玩家属性变更
	function handlePlayerCustomPropertiesChanged(play, msg) {
	  var player = play._room.getPlayer(msg.actorId);
	  player._mergeProperties(msg.attr);
	  play.emit(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, {
	    player: player,
	    changedProps: msg.attr });

	}

	// 玩家下线
	function handlePlayerOffline(play, msg) {
	  var player = play._room.getPlayer(msg.initByActor);
	  player._setActive(false);
	  play.emit(Event.PLAYER_ACTIVITY_CHANGED, {
	    player: player });

	}

	// 玩家上线
	function handlePlayerOnline(play, msg) {
	  var player = play._room.getPlayer(msg.member.actorId);
	  player._initWithJSONObject(msg.member);
	  player._setActive(true);
	  play.emit(Event.PLAYER_ACTIVITY_CHANGED, {
	    player: player });

	}

	// 离开房间
	/* eslint no-param-reassign: ["error", { "props": false }] */
	function handleLeaveRoom(play) {
	  // 清理工作
	  play._room = null;
	  play._player = null;
	  // 离开房间时就主动断开连接
	  play._closeGameSocket(function () {
	    play._connectToMaster(true);
	  });
	}

	// 自定义事件
	function handleEvent(play, msg) {
	  play.emit(Event.CUSTOM_EVENT, {
	    eventId: msg.eventId,
	    eventData: msg.msg,
	    senderId: msg.fromActorId });

	}

	function handleGameMsg(play, message) {
	  var msg = JSON.parse(message.data);
	  debug(play.userId + ' Game  msg: ' + msg.op + ' \n<- ' + message.data);
	  switch (msg.cmd) {
	    case 'session':
	      switch (msg.op) {
	        case 'opened':
	          handleSessionOpen$1(play, msg);
	          break;
	        case 'closed':
	          handleSessionClose(play);
	          break;
	        default:
	          error('no handler for op: ' + msg.op);
	          break;}

	      break;
	    case 'conv':
	      switch (msg.op) {
	        case 'started':
	          handleCreatedRoom(play, msg);
	          break;
	        case 'added':
	          handleJoinedRoom(play, msg);
	          break;
	        case 'members-joined':
	          handleNewPlayerJoinedRoom(play, msg);
	          break;
	        case 'members-left':
	          handlePlayerLeftRoom(play, msg);
	          break;
	        case 'master-client-updated':
	          handleMasterUpdated(msg);
	          break;
	        case 'master-client-changed':
	          handleMasterChanged(play, msg);
	          break;
	        case 'opened':
	          break;
	        case 'opened-notify':
	          handleRoomOpenedChanged(play, msg);
	          break;
	        case 'visible':
	          break;
	        case 'visible-notify':
	          handleRoomVisibleChanged(play, msg);
	          break;
	        case 'updated':
	          handleRoomCustomPropertiesChangedResponse(msg);
	          break;
	        case 'updated-notify':
	          handleRoomCustomPropertiesChanged(play, msg);
	          break;
	        case 'player-prop-updated':
	          break;
	        case 'player-props':
	          handlePlayerCustomPropertiesChanged(play, msg);
	          break;
	        case 'members-offline':
	          handlePlayerOffline(play, msg);
	          break;
	        case 'members-online':
	          handlePlayerOnline(play, msg);
	          break;
	        case 'removed':
	          handleLeaveRoom(play);
	          break;
	        default:
	          error('no handler for game msg: ' + msg.op);
	          break;}

	      break;
	    case 'direct':
	      handleEvent(play, msg);
	      break;
	    case 'ack':
	      // ignore
	      break;
	    case 'events':
	      // TODO

	      break;
	    case 'error':
	      handleErrorMsg(play, msg);
	      break;
	    default:
	      if (msg.cmd) {
	        error('no handler for cmd: ' + message.data);
	      }
	      break;}

	}

	var version = "0.13.23";

	// SDK 版本号
	var NorthCNServerURL =
	'https://game-router-cn-n1.leancloud.cn/v1/router';
	var EastCNServerURL =
	'https://game-router-cn-e1.leancloud.cn/v1/router';
	var USServerURL = 'https://game-router-us-w1.leancloud.cn/v1/router';

	// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

	var ws = null;

	if (typeof WebSocket !== 'undefined') {
	  ws = WebSocket;
	} else if (typeof MozWebSocket !== 'undefined') {
	  ws = MozWebSocket;
	} else if (typeof commonjsGlobal !== 'undefined') {
	  ws = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
	} else if (typeof window !== 'undefined') {
	  ws = window.WebSocket || window.MozWebSocket;
	} else if (typeof self !== 'undefined') {
	  ws = self.WebSocket || self.MozWebSocket;
	}

	var browser$2 = ws;

	var adapters = {
	  WebSocket: browser$2 };


	/**
	                           * 设置适配器
	                           * @param {Object} newAdapters
	                           * @param {Function} newAdapters.WebSocketAdapter WebSocket 适配器，Cocos Creator 打包 android 平台时需要传入 CA 证书
	                           */
	function setAdapters(newAdapters) {
	  _Object$assign(adapters, newAdapters);
	}

	var isWeapp =
	// eslint-disable-next-line no-undef
	(typeof wx === 'undefined' ? 'undefined' : _typeof(wx)) === 'object' && typeof wx.connectSocket === 'function';

	var MAX_PLAYER_COUNT = 10;
	var LOBBY_KEEPALIVE_DURATION = 120000;
	var GAME_KEEPALIVE_DURATION = 10000;
	var MAX_NO_PONG_TIMES = 3;

	function convertRoomOptions(roomOptions) {
	  var options = {};
	  if (!roomOptions.opened) options.open = roomOptions.opened;
	  if (!roomOptions.visible) options.visible = roomOptions.visible;
	  if (roomOptions.emptyRoomTtl > 0)
	  options.emptyRoomTtl = roomOptions.emptyRoomTtl;
	  if (roomOptions.playerTtl > 0) options.playerTtl = roomOptions.playerTtl;
	  if (
	  roomOptions.maxPlayerCount > 0 &&
	  roomOptions.maxPlayerCount < MAX_PLAYER_COUNT)

	  options.maxMembers = roomOptions.maxPlayerCount;
	  if (roomOptions.customRoomProperties)
	  options.attr = roomOptions.customRoomProperties;
	  if (roomOptions.customRoomPropertyKeysForLobby)
	  options.lobbyAttrKeys = roomOptions.customRoomPropertyKeysForLobby;
	  if (roomOptions.flag) options.flag = roomOptions.flag;
	  return options;
	}

	function _closeSocket(websocket, onClose) {
	  var ws = websocket;
	  if (ws) {
	    ws.onopen = null;
	    ws.onconnect = null;
	    ws.onmessage = null;
	    ws.onclose = onClose;
	    try {
	      ws.close();
	    } catch (e) {
	      debug('close socket exception: ' + e);
	    }
	  } else if (onClose) {
	    onClose();
	  }
	}

	/**
	   * Play 客户端类
	   */var
	Play = function (_EventEmitter) {_inherits(Play, _EventEmitter);function Play() {_classCallCheck(this, Play);return _possibleConstructorReturn(this, (Play.__proto__ || _Object$getPrototypeOf(Play)).apply(this, arguments));}_createClass(Play, [{ key: 'init',
	    /**
	                                                                                                                                                                                                                                                                   * 初始化客户端
	                                                                                                                                                                                                                                                                   * @param {Object} opts
	                                                                                                                                                                                                                                                                   * @param {string} opts.appId APP ID
	                                                                                                                                                                                                                                                                   * @param {string} opts.appKey APP KEY
	                                                                                                                                                                                                                                                                   * @param {number} opts.region 节点地区
	                                                                                                                                                                                                                                                                   */value: function init(
	    opts) {
	      if (!(typeof opts.appId === 'string')) {
	        throw new TypeError(opts.appId + ' is not a string');
	      }
	      if (!(typeof opts.appKey === 'string')) {
	        throw new TypeError(opts.appKey + ' is not a string');
	      }
	      if (!(typeof opts.region === 'number')) {
	        throw new TypeError(opts.region + ' is not a number');
	      }
	      if (opts.feature !== undefined && !(typeof opts.feature === 'string')) {
	        throw new TypeError(opts.feature + ' is not a string');
	      }
	      this._appId = opts.appId;
	      this._appKey = opts.appKey;
	      this._region = opts.region;
	      this._feature = opts.feature;
	      /**
	                                     * 玩家 ID
	                                     * @type {string}
	                                     */
	      this.userId = null;
	      this.reset();
	    }

	    /**
	       * 建立连接
	       * @param {Object} [opts] 连接选项
	       * @param {string} [opts.gameVersion] 游戏版本号，不同的游戏版本号将路由到不同的服务端，默认值为 0.0.1
	       */ }, { key: 'connect', value: function connect()
	    {var _this2 = this;var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$gameVersion = _ref.gameVersion,gameVersion = _ref$gameVersion === undefined ? '0.0.1' : _ref$gameVersion;
	      // 判断是否有 userId
	      if (this.userId === null) {
	        throw new Error('userId is null');
	      }
	      // 判断是否是「断开」状态
	      if (this._playState !== PlayState.CLOSED) {
	        throw new Error('play state error: ' + this._playState);
	      }
	      // 判断是否已经在等待连接
	      if (this._connectTimer) {
	        warn('waiting for connect');
	        return;
	      }

	      // 判断连接时间
	      var now = new Date().getTime();
	      if (now < this._nextConnectTimestamp) {
	        var waitTime = this._nextConnectTimestamp - now;
	        debug('wait time: ' + waitTime);
	        this._connectTimer = setTimeout(function () {
	          debug('connect time out');
	          _this2._connect(gameVersion);
	          clearTimeout(_this2._connectTimer);
	          _this2._connectTimer = null;
	        }, waitTime);
	      } else {
	        this._connect(gameVersion);
	      }
	    } }, { key: '_connect', value: function _connect(

	    gameVersion) {var _this3 = this;
	      if (gameVersion && !(typeof gameVersion === 'string')) {
	        throw new TypeError(gameVersion + ' is not a string');
	      }
	      this._gameVersion = gameVersion;
	      var masterURL = EastCNServerURL;
	      if (this._region === Region.NorthChina) {
	        masterURL = NorthCNServerURL;
	      } else if (this._region === Region.EastChina) {
	        masterURL = EastCNServerURL;
	      } else if (this._region === Region.NorthAmerica) {
	        masterURL = USServerURL;
	      }

	      this._playState = PlayState.CONNECTING;
	      var query = { appId: this._appId, sdkVersion: version };
	      // 使用设置覆盖 SDK 判断的 feature
	      if (this._feature) {
	        query.feature = this._feature;
	      } else if (isWeapp) {
	        query.feature = 'wechat';
	      }
	      this._httpReq = client.
	      get(masterURL).
	      query(query).
	      end(function (err, response) {
	        if (err) {
	          error(err);
	          // 连接失败，则增加下次连接时间间隔
	          _this3._connectFailedCount += 1;
	          _this3._nextConnectTimestamp =
	          Date.now() + Math.pow(2, _this3._connectFailedCount) * 1000;
	          _this3.emit(Event.CONNECT_FAILED, {
	            code: -1,
	            detail: 'Game router connect failed' });

	        } else {
	          var body = JSON.parse(response.text);
	          debug(response.text);
	          // 重置下次允许的连接时间
	          _this3._connectFailedCount = 0;
	          _this3._nextConnectTimestamp = 0;
	          clearTimeout(_this3._connectTimer);
	          _this3._connectTimer = null;
	          // 主大厅服务器
	          _this3._primaryServer = body.server;
	          // 备用大厅服务器
	          _this3._secondaryServer = body.secondary;
	          // 默认服务器是 master server
	          _this3._masterServer = _this3._primaryServer;
	          // ttl
	          _this3._serverValidTimeStamp = Date.now() + body.ttl * 1000;
	          _this3._connectToMaster();
	        }
	      });
	    }

	    /**
	       * 重新连接
	       */ }, { key: 'reconnect', value: function reconnect()
	    {
	      var now = Date.now();
	      if (now > this._serverValidTimeStamp) {
	        // 超出 ttl 后将重新请求 router 连接
	        this.connect(this._gameVersion);
	      } else {
	        this._connectToMaster();
	      }
	    }

	    /**
	       * 重新连接并自动加入房间
	       */ }, { key: 'reconnectAndRejoin', value: function reconnectAndRejoin()
	    {
	      if (this._cachedRoomMsg === null) {
	        throw new Error('no cache room info');
	      }
	      if (this._cachedRoomMsg.cid === undefined) {
	        throw new Error('not cache room name');
	      }
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId(),
	        cid: this._cachedRoomMsg.cid,
	        rejoin: true };

	      this._connectToGame();
	    }

	    /**
	       * 断开连接
	       */ }, { key: 'disconnect', value: function disconnect()
	    {var _this4 = this;
	      if (
	      this._playState !== PlayState.LOBBY_OPEN &&
	      this._playState !== PlayState.GAME_OPEN)
	      {
	        throw new Error('error play state: ' + this._playState);
	      }
	      this._playState = PlayState.CLOSING;
	      this._stopPing();
	      this._stopPong();
	      this._closeLobbySocket(function () {
	        debug('on close lobby socket');
	        _this4._closeGameSocket(function () {
	          debug('on close game socket');
	          _this4._playState = PlayState.CLOSED;
	          _this4.emit(Event.DISCONNECTED);
	          debug(_this4.userId + ' disconnect.');
	        });
	      });
	    }

	    /**
	       * 重置
	       */ }, { key: 'reset', value: function reset()
	    {
	      this._room = null;
	      this._player = null;
	      this._cachedRoomMsg = null;
	      this._playState = PlayState.CLOSED;
	      this._masterServer = null;
	      this._gameServer = null;
	      this._msgId = 0;
	      this._inLobby = false;
	      this._lobbyRoomList = null;
	      this._connectFailedCount = 0;
	      this._nextConnectTimestamp = 0;
	      this._gameToLobby = false;
	      this._stopConnectTimer();
	      this._cancelHttp();
	      this._stopPing();
	      this._stopPong();
	      this._closeLobbySocket();
	      this._closeGameSocket();
	    }

	    /**
	       * 加入大厅，只有在 autoJoinLobby = false 时才需要调用
	       */ }, { key: 'joinLobby', value: function joinLobby()
	    {
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'lobby',
	        op: 'add',
	        i: this._getMsgId() };

	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 离开大厅
	       */ }, { key: 'leaveLobby', value: function leaveLobby()
	    {
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'lobby',
	        op: 'remove',
	        i: this._getMsgId() };

	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 创建房间
	       * @param {Object} [opts] 创建房间选项
	       * @param {string} [opts.roomName] 房间名称，在整个游戏中唯一，默认值为 null，则由服务端分配一个唯一 Id
	       * @param {Object} [opts.roomOptions] 创建房间选项，默认值为 null
	       * @param {Boolean} [opts.roomOptions.opened] 房间是否打开
	       * @param {Boolean} [opts.roomOptions.visible] 房间是否可见，只有「可见」的房间会出现在房间列表里
	       * @param {Number} [opts.roomOptions.emptyRoomTtl] 房间为空后，延迟销毁的时间
	       * @param {Number} [opts.roomOptions.playerTtl] 玩家掉线后，延迟销毁的时间
	       * @param {Number} [opts.roomOptions.maxPlayerCount] 最大玩家数量
	       * @param {Object} [opts.roomOptions.customRoomProperties] 自定义房间属性
	       * @param {Array.<string>} [opts.roomOptions.customRoomPropertyKeysForLobby] 在大厅中可获得的房间属性「键」数组
	       * @param {CreateRoomFlag} [opts.roomOptions.flag] 创建房间标记，可多选
	       * @param {Array.<string>} [opts.expectedUserIds] 邀请好友 ID 数组，默认值为 null
	       */ }, { key: 'createRoom', value: function createRoom()




	    {var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref2$roomName = _ref2.roomName,roomName = _ref2$roomName === undefined ? null : _ref2$roomName,_ref2$roomOptions = _ref2.roomOptions,roomOptions = _ref2$roomOptions === undefined ? null : _ref2$roomOptions,_ref2$expectedUserIds = _ref2.expectedUserIds,expectedUserIds = _ref2$expectedUserIds === undefined ? null : _ref2$expectedUserIds;
	      if (roomName !== null && !(typeof roomName === 'string')) {
	        throw new TypeError(roomName + ' is not a string');
	      }
	      if (roomOptions !== null && !(roomOptions instanceof Object)) {
	        throw new TypeError(roomOptions + ' is not a Object');
	      }
	      if (expectedUserIds !== null && !Array.isArray(expectedUserIds)) {
	        throw new TypeError(expectedUserIds + ' is not an Array with string');
	      }
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      // 缓存 GameServer 创建房间的消息体
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'start',
	        i: this._getMsgId() };

	      if (roomName) {
	        this._cachedRoomMsg.cid = roomName;
	      }
	      // 拷贝房间属性（包括 系统属性和玩家定义属性）
	      if (roomOptions) {
	        var opts = convertRoomOptions(roomOptions);
	        this._cachedRoomMsg = _Object$assign(this._cachedRoomMsg, opts);
	      }
	      if (expectedUserIds) {
	        this._cachedRoomMsg.expectMembers = expectedUserIds;
	      }
	      // Router 创建房间的消息体
	      var msg = this._cachedRoomMsg;
	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 加入房间
	       * @param {string} roomName 房间名称
	       * @param {*} [expectedUserIds] 邀请好友 ID 数组，默认值为 null
	       */ }, { key: 'joinRoom', value: function joinRoom(
	    roomName) {var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref3$expectedUserIds = _ref3.expectedUserIds,expectedUserIds = _ref3$expectedUserIds === undefined ? null : _ref3$expectedUserIds;
	      if (!(typeof roomName === 'string')) {
	        throw new TypeError(roomName + ' is not a string');
	      }
	      if (expectedUserIds !== null && !Array.isArray(expectedUserIds)) {
	        throw new TypeError(expectedUserIds + ' is not an array with string');
	      }
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      // 加入房间的消息体
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId(),
	        cid: roomName };

	      if (expectedUserIds) {
	        this._cachedRoomMsg.expectMembers = expectedUserIds;
	      }
	      var msg = this._cachedRoomMsg;
	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 重新加入房间
	       * @param {string} roomName 房间名称
	       */ }, { key: 'rejoinRoom', value: function rejoinRoom(
	    roomName) {
	      if (!(typeof roomName === 'string')) {
	        throw new TypeError(roomName + ' is not a string');
	      }
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId(),
	        cid: roomName,
	        rejoin: true };

	      var msg = this._cachedRoomMsg;
	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 随机加入或创建房间
	       * @param {string} roomName 房间名称
	       * @param {Object} [opts] 创建房间选项
	       * @param {Object} [opts.roomOptions] 创建房间选项，默认值为 null
	       * @param {Boolean} [opts.roomOptions.opened] 房间是否打开
	       * @param {Boolean} [opts.roomOptions.visible] 房间是否可见，只有「可见」的房间会出现在房间列表里
	       * @param {Number} [opts.roomOptions.emptyRoomTtl] 房间为空后，延迟销毁的时间
	       * @param {Number} [opts.roomOptions.playerTtl] 玩家掉线后，延迟销毁的时间
	       * @param {Number} [opts.roomOptions.maxPlayerCount] 最大玩家数量
	       * @param {Object} [opts.roomOptions.customRoomProperties] 自定义房间属性
	       * @param {Array.<string>} [opts.roomOptions.customRoomPropertyKeysForLobby] 在大厅中可获得的房间属性「键」数组
	       * @param {CreateRoomFlag} [opts.roomOptions.flag] 创建房间标记，可多选
	       * @param {Array.<string>} [opts.expectedUserIds] 邀请好友 ID 数组，默认值为 null
	       */ }, { key: 'joinOrCreateRoom', value: function joinOrCreateRoom(

	    roomName)

	    {var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref4$roomOptions = _ref4.roomOptions,roomOptions = _ref4$roomOptions === undefined ? null : _ref4$roomOptions,_ref4$expectedUserIds = _ref4.expectedUserIds,expectedUserIds = _ref4$expectedUserIds === undefined ? null : _ref4$expectedUserIds;
	      if (!(typeof roomName === 'string')) {
	        throw new TypeError(roomName + ' is not a string');
	      }
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      if (roomOptions !== null && !(roomOptions instanceof Object)) {
	        throw new TypeError(roomOptions + ' is not a Object');
	      }
	      if (expectedUserIds !== null && !Array.isArray(expectedUserIds)) {
	        throw new TypeError(expectedUserIds + ' is not an array with string');
	      }
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId(),
	        cid: roomName };

	      // 拷贝房间参数
	      if (roomOptions != null) {
	        var opts = convertRoomOptions(roomOptions);
	        this._cachedRoomMsg = _Object$assign(this._cachedRoomMsg, opts);
	      }
	      if (expectedUserIds) {
	        this._cachedRoomMsg.expectMembers = expectedUserIds;
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId(),
	        cid: roomName,
	        createOnNotFound: true };

	      if (expectedUserIds) {
	        msg.expectMembers = expectedUserIds;
	      }
	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 随机加入房间
	       * @param {Object} [opts] 随机加入房间选项
	       * @param {Object} [opts.matchProperties] 匹配属性，默认值为 null
	       * @param {Array.<string>} [opts.expectedUserIds] 邀请好友 ID 数组，默认值为 null
	       */ }, { key: 'joinRandomRoom', value: function joinRandomRoom()
	    {var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref5$matchProperties = _ref5.matchProperties,matchProperties = _ref5$matchProperties === undefined ? null : _ref5$matchProperties,_ref5$expectedUserIds = _ref5.expectedUserIds,expectedUserIds = _ref5$expectedUserIds === undefined ? null : _ref5$expectedUserIds;
	      if (matchProperties !== null && !((typeof matchProperties === 'undefined' ? 'undefined' : _typeof(matchProperties)) === 'object')) {
	        throw new TypeError(matchProperties + ' is not an object');
	      }
	      if (expectedUserIds !== null && !Array.isArray(expectedUserIds)) {
	        throw new TypeError(expectedUserIds + ' is not an array with string');
	      }
	      if (this._playState !== PlayState.LOBBY_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      this._cachedRoomMsg = {
	        cmd: 'conv',
	        op: 'add',
	        i: this._getMsgId() };

	      if (matchProperties) {
	        this._cachedRoomMsg.expectAttr = matchProperties;
	      }
	      if (expectedUserIds) {
	        this._cachedRoomMsg.expectMembers = expectedUserIds;
	      }

	      var msg = {
	        cmd: 'conv',
	        op: 'add-random' };

	      if (matchProperties) {
	        msg.expectAttr = matchProperties;
	      }
	      if (expectedUserIds) {
	        msg.expectMembers = expectedUserIds;
	      }
	      this._sendLobbyMessage(msg);
	    }

	    /**
	       * 设置房间开启 / 关闭
	       * @param {Boolean} opened 是否开启
	       */ }, { key: 'setRoomOpened', value: function setRoomOpened(
	    opened) {
	      if (!(typeof opened === 'boolean')) {
	        throw new TypeError(opened + ' is not a boolean value');
	      }
	      if (this._room === null) {
	        throw new Error('room is null');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'open',
	        i: this._getMsgId(),
	        toggle: opened };

	      this._sendGameMessage(msg);
	    }

	    /**
	       * 设置房间可见 / 不可见
	       * @param {Boolean} visible 是否可见
	       */ }, { key: 'setRoomVisible', value: function setRoomVisible(
	    visible) {
	      if (!(typeof visible === 'boolean')) {
	        throw new TypeError(visible + ' is not a boolean value');
	      }
	      if (this._room === null) {
	        throw new Error('room is null');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'visible',
	        i: this._getMsgId(),
	        toggle: visible };

	      this._sendGameMessage(msg);
	    }

	    /**
	       * 设置房主
	       * @param {number} newMasterId 新房主 ID
	       */ }, { key: 'setMaster', value: function setMaster(
	    newMasterId) {
	      if (!(typeof newMasterId === 'number')) {
	        throw new TypeError(newMasterId + ' is not a number');
	      }
	      if (this._room === null) {
	        throw new Error('room is null');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'update-master-client',
	        i: this._getMsgId(),
	        masterActorId: newMasterId };

	      this._sendGameMessage(msg);
	    }

	    /**
	       * 发送自定义消息
	       * @param {number|string} eventId 事件 ID
	       * @param {Object} eventData 事件参数
	       * @param {Object} options 发送事件选项
	       * @param {ReceiverGroup} options.receiverGroup 接收组
	       * @param {Array.<number>} options.targetActorIds 接收者 Id。如果设置，将会覆盖 receiverGroup
	       */ }, { key: 'sendEvent', value: function sendEvent(
	    eventId, eventData, options) {
	      if (!(typeof eventId === 'string') && !(typeof eventId === 'number')) {
	        throw new TypeError(eventId + ' is not a string or number');
	      }
	      if (!((typeof eventData === 'undefined' ? 'undefined' : _typeof(eventData)) === 'object')) {
	        throw new TypeError(eventData + ' is not an object');
	      }
	      if (!(options instanceof Object)) {
	        throw new TypeError(options + ' is not a Object');
	      }
	      if (
	      options.receiverGroup === undefined &&
	      options.targetActorIds === undefined)
	      {
	        throw new TypeError('receiverGroup and targetActorIds are null');
	      }
	      if (this._room === null) {
	        throw new Error('room is null');
	      }
	      if (this._player === null) {
	        throw new Error('player is null');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'direct',
	        i: this._getMsgId(),
	        eventId: eventId,
	        msg: eventData,
	        receiverGroup: options.receiverGroup,
	        toActorIds: options.targetActorIds };

	      this._sendGameMessage(msg);
	    }

	    /**
	       * 离开房间
	       */ }, { key: 'leaveRoom', value: function leaveRoom()
	    {
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'remove',
	        i: this._getMsgId(),
	        cid: this.room.name };

	      this._sendGameMessage(msg);
	    }

	    /**
	       * 获取当前所在房间
	       * @return {Room}
	       * @readonly
	       */ }, { key: '_setRoomCustomProperties',






















	    // 设置房间属性
	    value: function _setRoomCustomProperties(properties, expectedValues) {
	      if (!((typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object')) {
	        throw new TypeError(properties + ' is not an object');
	      }
	      if (expectedValues && !((typeof expectedValues === 'undefined' ? 'undefined' : _typeof(expectedValues)) === 'object')) {
	        throw new TypeError(expectedValues + ' is not an object');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'update',
	        i: this._getMsgId(),
	        attr: properties };

	      if (expectedValues) {
	        msg.expectAttr = expectedValues;
	      }
	      this._sendGameMessage(msg);
	    }

	    // 设置玩家属性
	  }, { key: '_setPlayerCustomProperties', value: function _setPlayerCustomProperties(actorId, properties, expectedValues) {
	      if (!(typeof actorId === 'number')) {
	        throw new TypeError(actorId + ' is not a number');
	      }
	      if (!((typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object')) {
	        throw new TypeError(properties + ' is not an object');
	      }
	      if (expectedValues && !((typeof expectedValues === 'undefined' ? 'undefined' : _typeof(expectedValues)) === 'object')) {
	        throw new TypeError(expectedValues + ' is not an object');
	      }
	      if (this._playState !== PlayState.GAME_OPEN) {
	        throw new Error('error play state: ' + this._playState);
	      }
	      var msg = {
	        cmd: 'conv',
	        op: 'update-player-prop',
	        i: this._getMsgId(),
	        targetActorId: actorId,
	        attr: properties };

	      if (expectedValues) {
	        msg.expectAttr = expectedValues;
	      }
	      this._sendGameMessage(msg);
	    }

	    // 开始大厅会话
	  }, { key: '_lobbySessionOpen', value: function _lobbySessionOpen() {
	      var msg = {
	        cmd: 'session',
	        op: 'open',
	        i: this._getMsgId(),
	        appId: this._appId,
	        peerId: this.userId,
	        sdkVersion: version,
	        gameVersion: this._gameVersion };

	      this._sendLobbyMessage(msg);
	    }

	    // 开始房间会话
	  }, { key: '_gameSessionOpen', value: function _gameSessionOpen() {
	      var msg = {
	        cmd: 'session',
	        op: 'open',
	        i: this._getMsgId(),
	        appId: this._appId,
	        peerId: this.userId,
	        sdkVersion: version,
	        gameVersion: this._gameVersion };

	      this._sendGameMessage(msg);
	    }

	    // 发送大厅消息
	  }, { key: '_sendLobbyMessage', value: function _sendLobbyMessage(msg) {
	      this._send(this._lobbyWS, msg, 'Lobby', LOBBY_KEEPALIVE_DURATION);
	    }

	    // 发送房间消息
	  }, { key: '_sendGameMessage', value: function _sendGameMessage(msg) {
	      this._send(this._gameWS, msg, 'Game ', GAME_KEEPALIVE_DURATION);
	    }

	    // 发送消息
	  }, { key: '_send', value: function _send(ws, msg, flag, duration) {var _this5 = this;
	      if (!((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object')) {
	        throw new TypeError(msg + ' is not an object');
	      }
	      var msgData = _JSON$stringify(msg);
	      debug(this.userId + ' ' + flag + ' msg: ' + msg.op + ' \n-> ' + msgData);var
	      WebSocket = adapters.WebSocket;
	      if (ws.readyState === WebSocket.OPEN) {
	        ws.send(msgData);
	        // 心跳包
	        this._stopPing();
	        this._ping = setTimeout(function () {
	          debug('ping time out');
	          var ping = {};
	          _this5._send(ws, ping, flag, duration);
	        }, duration);
	      } else {
	        this._stopPing();
	        this._stopPong();
	      }
	    }

	    // 连接至大厅服务器
	  }, { key: '_connectToMaster', value: function _connectToMaster() {var _this6 = this;var gameToLobby = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      this._playState = PlayState.CONNECTING;
	      this._gameToLobby = gameToLobby;var
	      WebSocket = adapters.WebSocket;
	      this._lobbyWS = new WebSocket(this._masterServer);
	      this._lobbyWS.onopen = function () {
	        debug('Lobby websocket opened');
	        _this6._lobbySessionOpen();
	      };
	      this._lobbyWS.onmessage = function (msg) {
	        _this6._stopPong();
	        _this6._startPongListener(_this6._lobbyWS, LOBBY_KEEPALIVE_DURATION);
	        handleLobbyMsg(_this6, msg);
	      };
	      this._lobbyWS.onclose = function () {
	        debug('Lobby websocket closed');
	        if (_this6._playState === PlayState.CONNECTING) {
	          // 连接失败
	          if (_this6._masterServer === _this6._secondaryServer) {
	            _this6.emit(Event.CONNECT_FAILED, {
	              code: -2,
	              detail: 'Lobby socket connect failed' });

	          } else {
	            // 内部重连
	            _this6._masterServer = _this6._secondaryServer;
	            _this6._connectToMaster();
	          }
	        } else {
	          // 断开连接
	          _this6._playState = PlayState.CLOSED;
	          _this6.emit(Event.DISCONNECTED);
	        }
	        _this6._stopPing();
	        _this6._stopPong();
	      };
	      this._lobbyWS.onerror = function (err) {
	        error(err);
	      };
	    }

	    // 连接至游戏服务器
	  }, { key: '_connectToGame', value: function _connectToGame() {var _this7 = this;
	      this._playState = PlayState.CONNECTING;var
	      WebSocket = adapters.WebSocket;
	      this._gameWS = new WebSocket(this._gameServer);
	      this._gameWS.onopen = function () {
	        debug('Game websocket opened');
	        _this7._gameSessionOpen();
	      };
	      this._gameWS.onmessage = function (msg) {
	        _this7._stopPong();
	        _this7._startPongListener(_this7._gameWS, GAME_KEEPALIVE_DURATION);
	        handleGameMsg(_this7, msg);
	      };
	      this._gameWS.onclose = function () {
	        debug('Game websocket closed');
	        if (_this7._playState === PlayState.CONNECTING) {
	          // 连接失败
	          _this7.emit(Event.CONNECT_FAILED, {
	            code: -2,
	            detail: 'Game socket connect failed' });

	        } else {
	          // 断开连接
	          _this7._playState = PlayState.CLOSED;
	          _this7.emit(Event.DISCONNECTED);
	        }
	        _this7._stopPing();
	        _this7._stopPong();
	      };
	      this._gameWS.onerror = function (err) {
	        error(err);
	      };
	    } }, { key: '_getMsgId', value: function _getMsgId()

	    {
	      this._msgId += 1;
	      return this._msgId;
	    } }, { key: '_stopConnectTimer', value: function _stopConnectTimer()

	    {
	      if (this._connectTimer) {
	        clearTimeout(this._connectTimer);
	        this._connectTimer = null;
	      }
	    } }, { key: '_stopPing', value: function _stopPing()

	    {
	      if (this._ping) {
	        clearTimeout(this._ping);
	        this._ping = null;
	      }
	    } }, { key: '_stopPong', value: function _stopPong()

	    {
	      if (this._pong) {
	        clearTimeout(this._pong);
	        this._pong = null;
	      }
	    } }, { key: '_startPongListener', value: function _startPongListener(

	    ws, duration) {
	      this._pong = setTimeout(function () {
	        ws.close();
	      }, duration * MAX_NO_PONG_TIMES);
	    } }, { key: '_cancelHttp', value: function _cancelHttp()

	    {
	      if (this._httpReq) {
	        this._httpReq.abort();
	      }
	    } }, { key: '_closeLobbySocket', value: function _closeLobbySocket(

	    onClose) {
	      _closeSocket(this._lobbyWS, onClose);
	      this._lobbyWS = null;
	    } }, { key: '_closeGameSocket', value: function _closeGameSocket(

	    onClose) {
	      _closeSocket(this._gameWS, onClose);
	      this._gameWS = null;
	    } }, { key: 'room', get: function get() {return this._room;} /**
	                                                                  * 获取当前玩家
	                                                                  * @return {Player}
	                                                                  * @readonly
	                                                                  */ }, { key: 'player', get: function get() {return this._player;} /**
	                                                                                                                                     * 获取房间列表
	                                                                                                                                     * @return {Array.<LobbyRoom>}
	                                                                                                                                     * @readonly
	                                                                                                                                     */ }, { key: 'lobbyRoomList', get: function get() {return this._lobbyRoomList;} }]);return Play;}(eventemitter3);

	/**
	 * 接收组枚举
	 * @readonly
	 * @enum {number}
	 */
	var ReceiverGroup = {
	  /**
	                       * 其他人（除了自己之外的所有人）
	                       */
	  Others: 0,
	  /**
	              * 所有人（包括自己）
	              */
	  All: 1,
	  /**
	           * 主机客户端
	           */
	  MasterClient: 2 };

	/**
	 * 创建房间标识
	 * @readonly
	 * @enum {number}
	 */
	var CreateRoomFlag = {
	  /**
	                        * Master 掉线后固定 Master
	                        */
	  FixedMaster: 1,
	  /**
	                   * 只允许 Master 设置房间属性
	                   */
	  MasterUpdateRoomProperties: 2,
	  /**
	                                  * 只允许 Master 设置 Master
	                                  */
	  MasterSetMaster: 4 };

	var play = new Play();

	exports.play = play;
	exports.Play = Play;
	exports.Region = Region;
	exports.Room = Room;
	exports.Player = Player;
	exports.Event = Event;
	exports.ReceiverGroup = ReceiverGroup;
	exports.CreateRoomFlag = CreateRoomFlag;
	exports.setAdapters = setAdapters;
	exports.LogLevel = LogLevel;
	exports.setLogger = setLogger;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=play.js.map
