(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"CampuServicePlatform","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 18:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var s = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},r = s.lib = {},o = r.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,r = e.sigBytes;if (this.clamp(), s % 4) for (var o = 0; o < r; o++) {var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[s + o >>> 2] |= i << 24 - (s + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[s + o >>> 2] = n[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], r = function r(t) {t = t;var n = 987654321,s = 4294967295;return function () {var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push((o >>> 4).toString(16)), s.push((15 & o).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push(String.fromCharCode(o));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,r = n.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(s, h);}var l = s.splice(0, c);n.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = s.algo = {};return s;}(Math), n);}),r = (n(function (e, t) {var n;e.exports = (n = s, function (e) {var t = n,s = t.lib,r = s.WordArray,o = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,r = e[s];e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],S = e[t + 10],v = e[t + 11],T = e[t + 12],A = e[t + 13],P = e[t + 14],I = e[t + 15],b = o[0],O = o[1],E = o[2],C = o[3];b = u(b, O, E, C, i, 7, a[0]), C = u(C, b, O, E, c, 12, a[1]), E = u(E, C, b, O, f, 17, a[2]), O = u(O, E, C, b, p, 22, a[3]), b = u(b, O, E, C, g, 7, a[4]), C = u(C, b, O, E, m, 12, a[5]), E = u(E, C, b, O, y, 17, a[6]), O = u(O, E, C, b, _, 22, a[7]), b = u(b, O, E, C, w, 7, a[8]), C = u(C, b, O, E, k, 12, a[9]), E = u(E, C, b, O, S, 17, a[10]), O = u(O, E, C, b, v, 22, a[11]), b = u(b, O, E, C, T, 7, a[12]), C = u(C, b, O, E, A, 12, a[13]), E = u(E, C, b, O, P, 17, a[14]), b = h(b, O = u(O, E, C, b, I, 22, a[15]), E, C, c, 5, a[16]), C = h(C, b, O, E, y, 9, a[17]), E = h(E, C, b, O, v, 14, a[18]), O = h(O, E, C, b, i, 20, a[19]), b = h(b, O, E, C, m, 5, a[20]), C = h(C, b, O, E, S, 9, a[21]), E = h(E, C, b, O, I, 14, a[22]), O = h(O, E, C, b, g, 20, a[23]), b = h(b, O, E, C, k, 5, a[24]), C = h(C, b, O, E, P, 9, a[25]), E = h(E, C, b, O, p, 14, a[26]), O = h(O, E, C, b, w, 20, a[27]), b = h(b, O, E, C, A, 5, a[28]), C = h(C, b, O, E, f, 9, a[29]), E = h(E, C, b, O, _, 14, a[30]), b = l(b, O = h(O, E, C, b, T, 20, a[31]), E, C, m, 4, a[32]), C = l(C, b, O, E, w, 11, a[33]), E = l(E, C, b, O, v, 16, a[34]), O = l(O, E, C, b, P, 23, a[35]), b = l(b, O, E, C, c, 4, a[36]), C = l(C, b, O, E, g, 11, a[37]), E = l(E, C, b, O, _, 16, a[38]), O = l(O, E, C, b, S, 23, a[39]), b = l(b, O, E, C, A, 4, a[40]), C = l(C, b, O, E, i, 11, a[41]), E = l(E, C, b, O, p, 16, a[42]), O = l(O, E, C, b, y, 23, a[43]), b = l(b, O, E, C, k, 4, a[44]), C = l(C, b, O, E, T, 11, a[45]), E = l(E, C, b, O, I, 16, a[46]), b = d(b, O = l(O, E, C, b, f, 23, a[47]), E, C, i, 6, a[48]), C = d(C, b, O, E, _, 10, a[49]), E = d(E, C, b, O, P, 15, a[50]), O = d(O, E, C, b, m, 21, a[51]), b = d(b, O, E, C, T, 6, a[52]), C = d(C, b, O, E, p, 10, a[53]), E = d(E, C, b, O, S, 15, a[54]), O = d(O, E, C, b, c, 21, a[55]), b = d(b, O, E, C, w, 6, a[56]), C = d(C, b, O, E, I, 10, a[57]), E = d(E, C, b, O, y, 15, a[58]), O = d(O, E, C, b, A, 21, a[59]), b = d(b, O, E, C, g, 6, a[60]), C = d(C, b, O, E, v, 10, a[61]), E = d(E, C, b, O, f, 15, a[62]), O = d(O, E, C, b, k, 21, a[63]), o[0] = o[0] + b | 0, o[1] = o[1] + O | 0, o[2] = o[2] + E | 0, o[3] = o[3] + C | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,r = 8 * t.sigBytes;n[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(s / 4294967296),i = s;n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, r, o, i) {var a = e + (t & n | ~t & s) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, n, s, r, o, i) {var a = e + (t & s | n & ~s) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, n, s, r, o, i) {var a = e + (t ^ n ^ s) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, n, s, r, o, i) {var a = e + (n ^ (t | ~s)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, r, o;e.exports = (r = (n = s).lib.Base, o = n.enc.Utf8, void (n.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = s.HmacMD5;}));var o = "FUNCTION",i = "OBJECT",a = "CLIENT_DB";function c(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function u(e) {return "object" === c(e);}function h(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var l = "development" === "development",d = "mp-weixin",f = h({
    "address": [
        "127.0.0.1",
        "192.168.1.6"
    ],
    "debugPort": 51371,
    "initialLaunchType": "remote",
    "servePort": 51372,
    "skipFiles": [
        "<node_internals>/**/*.js",
        "/Applications/HBuilderX.app/Contents/HBuilderX/plugins/unicloud/**/*.js"
    ]
}
),p = h([{"provider":"aliyun","spaceName":"campus-service","spaceId":"8a0439cf-af57-474f-b688-798babb30901","clientSecret":"/XjjtCurG3CrztGxd8bPFA==","endpoint":"https://api.bspapp.com"}]),g = true;var m = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 22).default || __webpack_require__(/*! uni-stat-config */ 22);m = _e2.appid;}} catch (e) {}var y = {};function _(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = y, s = e, Object.prototype.hasOwnProperty.call(n, s) || (y[e] = t), y[e];}"app-plus" === d && (y = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var w = ["invoke", "success", "fail", "complete"],k = _("_globalUniCloudInterceptor");function S(e, t) {k[e] || (k[e] = {}), u(t) && Object.keys(t).forEach(function (n) {w.indexOf(n) > -1 && function (e, t, n) {var s = k[e][t];s || (s = k[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function v(e, t) {k[e] || (k[e] = {}), u(t) ? Object.keys(t).forEach(function (n) {w.indexOf(n) > -1 && function (e, t, n) {var s = k[e][t];if (!s) return;var r = s.indexOf(n);r > -1 && s.splice(r, 1);}(e, n, t[n]);}) : delete k[e];}function T(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function A(e, t) {return k[e] && k[e][t] || [];}function P(e, t) {return t ? function (n) {var _this = this;var s,r = !1;if ("callFunction" === t) {var _e3 = n && n.type || o;r = _e3 !== o;}s = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var i = s.then(function () {return r ? Promise.resolve() : T(A(t, "invoke"), n);}).then(function () {return e.call(_this, n);}).then(function (e) {return r ? Promise.resolve(e) : T(A(t, "success"), e).then(function () {return T(A(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return r ? Promise.reject(e) : T(A(t, "fail"), e).then(function () {return T(A(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return i;i.then(function (e) {n.success && n.success(e), n.complete && n.complete(e);}, function (e) {n.fail && n.fail(e), n.complete && n.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var I = /*#__PURE__*/function (_Error) {_inherits(I, _Error);var _super = _createSuper(I);function I(e) {var _this2;_classCallCheck(this, I);_this2 = _super.call(this, e.message), _this2.errMsg = e.message || "", _this2.errCode = _this2.code = e.code, _this2.requestId = e.requestId, Object.defineProperties(_assertThisInitialized(_this2), { message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this2;}return I;}( /*#__PURE__*/_wrapNativeSuper(Error));var b;function O() {var e = uni.getLocale && uni.getLocale() || "en";if (b) return _objectSpread(_objectSpread({}, b), {}, { LOCALE: e });var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),t = _uni$getSystemInfoSyn.deviceId,n = _uni$getSystemInfoSyn.platform;return b = { PLATFORM: d, OS: n, APPID: m, DEVICEID: t, CLIENT_SDK_VERSION: "1.0.25" }, _objectSpread(_objectSpread({}, b), {}, { LOCALE: e });}var E = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), l && "h5" === d && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new I({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return s(new I({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, n(r);} }));});} };var C = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },U = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e4 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: U, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: U }, "zh-Hans"),x = _e4.t;var D = /*#__PURE__*/function () {function D(e) {_classCallCheck(this, D);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(x("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = C, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(D, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return E.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this3 = this;return Promise.resolve().then(function () {return _this3.hasAccessToken ? t ? _this3.requestWrapped(e) : _this3.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this3.getAccessToken();}).then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});}) : _this3.getAccessToken().then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = E.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = E.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this4 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this4.setAccessToken(e.result.accessToken), _this4._getAccessTokenPromiseStatus = "fulfilled", t(_this4.accessToken)) : (_this4._getAccessTokenPromiseStatus = "rejected", n(new I({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this4._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this5 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this5.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new I({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this6 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,r = _ref2.config;if ("string" !== c(t)) throw new I({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new I({ code: "INVALID_PARAM", message: "cloudPath不合法" });var o = r && r.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;i = r.id, a = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: i, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this6.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: s }));}).then(function () {return _this6.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new I({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return D;}();var q = { init: function init(e) {var t = new D(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var R = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var L;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(L || (L = {}));var F = function F() {};var N = function N() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t2 = function _t2() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t2 }), Object.defineProperty(e.promise, "catch", { get: _t2 }), e;}var t = new Promise(function (t, n) {e = function e(_e5, s) {return _e5 ? n(_e5) : t(s);};});return e.promise = t, e;};function $(e) {return void 0 === e;}function j(e) {return "[object Null]" === Object.prototype.toString.call(e);}var M;function B(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e6 = _step.value;var _t3 = _e6.isMatch,_n = _e6.genAdapter,_s = _e6.runtime;if (_t3()) return { adapter: _n(), runtime: _s };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(M || (M = {}));var K = { adapter: null, runtime: void 0 },H = ["anonymousUuidKey"];var W = /*#__PURE__*/function (_F) {_inherits(W, _F);var _super2 = _createSuper(W);function W() {var _this7;_classCallCheck(this, W);_this7 = _super2.call(this), K.adapter.root.tcbObject || (K.adapter.root.tcbObject = {});return _this7;}_createClass(W, [{ key: "setItem", value: function setItem(e, t) {K.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return K.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete K.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete K.adapter.root.tcbObject;} }]);return W;}(F);function z(e, t) {switch (e) {case "local":return t.localStorage || new W();case "none":return new W();default:return t.sessionStorage || new W();}}var J = /*#__PURE__*/function () {function J(e) {_classCallCheck(this, J);if (!this._storage) {this._persistence = K.adapter.primaryStorage || e.persistence, this._storage = z(this._persistence, K.adapter);var _t4 = "access_token_".concat(e.env),_n2 = "access_token_expire_".concat(e.env),_s2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t4, accessTokenExpireKey: _n2, refreshTokenKey: _s2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(J, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = z(e, K.adapter);for (var _e7 in this.keys) {var _s3 = this.keys[_e7];if (t && H.includes(_e7)) continue;var _r2 = this._storage.getItem(_s3);$(_r2) || j(_r2) || (n.setItem(_s3, _r2), this._storage.removeItem(_s3));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },r = JSON.stringify(s);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return J;}();var V = {},Y = {};function X(e) {return V[e];}var G = function G(e, t) {_classCallCheck(this, G);this.data = t || null, this.name = e;};var Q = /*#__PURE__*/function (_G) {_inherits(Q, _G);var _super3 = _createSuper(Q);function Q(e, t) {var _this8;_classCallCheck(this, Q);_this8 = _super3.call(this, "error", { error: e, data: t }), _this8.error = e;return _this8;}return Q;}(G);var Z = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s4 = n[e].indexOf(t);-1 !== _s4 && n[e].splice(_s4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof Q) return console.error(e.error), this;var n = "string" == typeof e ? new G(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e8 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e8),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t5 = _step2.value;_t5.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function ee(e, t) {Z.on(e, t);}function te(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};Z.fire(e, t);}function ne(e, t) {Z.off(e, t);}var se = "loginStateChanged",re = "loginStateExpire",oe = "loginTypeChanged",ie = "anonymousConverted",ae = "refreshAccessToken";var ce;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(ce || (ce = {}));var ue = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],he = { "X-SDK-Version": "1.3.5" };function le(e, t, n) {var s = e[t];e[t] = function (t) {var r = {},o = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(r, s), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e9 in r) {i.append(_e9, r[_e9]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), s.call(e, t);};}function de() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, he), {}, { "x-seqid": e }) };}var fe = /*#__PURE__*/function () {function fe() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, fe);var t;this.config = e, this._reqClass = new K.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = X(this.config.env), this._localCache = (t = this.config.env, Y[t]), le(this._reqClass, "post", [de]), le(this._reqClass, "upload", [de]), le(this._reqClass, "download", [de]);}_createClass(fe, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, r, o, i, a, _e10, _e11, _t6, _s5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(n);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e10 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e10 || "REFRESH_TOKEN_EXPIRED" === _e10 || "INVALID_REFRESH_TOKEN" === _e10)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === ce.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e10)) {_context5.next = 19;break;}_e11 = this._cache.getStore(r);_t6 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e11, refresh_token: _t6 });case 17:_s5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s5.refresh_token), this._refreshAccessToken()));case 19:te(re), this._cache.removeStore(n);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (te(ae), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:s = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!s || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, r, o, _e12, i, _e13, _e14, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === ue.indexOf(e))) {_context7.next = 10;break;}_e12 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e12);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e13 in i) {i.hasOwnProperty(_e13) && void 0 !== i[_e13] && i.append(_e13, o[_e13]);}r = "multipart/form-data";} else {r = "application/json", i = {};for (_e14 in o) {void 0 !== o[_e14] && (i[_e14] = o[_e14]);}}a = { headers: { "content-type": r } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var r = "";for (var _e15 in n) {"" === r ? !s && (t += "?") : r += "&", r += "".concat(_e15, "=").concat(encodeURIComponent(n[_e15]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(R, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(s, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === ue.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n3 = _context8.sent;if (!_n3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_n3.data.code, "] ").concat(_n3.data.message));case 12:return _context8.abrupt("return", _n3.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new Error("[".concat(n.data.code, "] ").concat(n.data.message));case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return fe;}();var pe = {};function ge(e) {return pe[e];}var me = /*#__PURE__*/function () {function me(e) {_classCallCheck(this, me);this.config = e, this._cache = X(e.env), this._request = ge(e.env);}_createClass(me, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return me;}();var ye = /*#__PURE__*/function () {function ye(e) {_classCallCheck(this, ye);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = X(this._envId), this._request = ge(this._envId), this.setUserInfo();}_createClass(ye, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this9 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this9[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ye;}();var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);if (!e) throw new Error("envId is not defined");this._cache = X(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ye(e);}_createClass(_e, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === ce.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === ce.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === ce.WECHAT || this.loginType === ce.WECHAT_OPEN || this.loginType === ce.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return _e;}();var we = /*#__PURE__*/function (_me) {_inherits(we, _me);var _super4 = _createSuper(we);function we() {_classCallCheck(this, we);return _super4.apply(this, arguments);}_createClass(we, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, r, _e16;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:te(se);te(oe, { env: this.config.env, loginType: ce.ANONYMOUS, persistence: "local" });_e16 = new _e(this.config.env);_context13.next = 19;return _e16.user.refresh();case 19:return _context13.abrupt("return", _e16);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);r = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:te(ie, { env: this.config.env });te(oe, { loginType: ce.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, ce.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return we;}(me);var ke = /*#__PURE__*/function (_me2) {_inherits(ke, _me2);var _super5 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super5.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:te(se);te(oe, { env: this.config.env, loginType: ce.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new _e(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ke;}(me);var Se = /*#__PURE__*/function (_me3) {_inherits(Se, _me3);var _super6 = _createSuper(Se);function Se() {_classCallCheck(this, Se);return _super6.apply(this, arguments);}_createClass(Se, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;r = s.refresh_token;o = s.access_token;i = s.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:te(se);te(oe, { env: this.config.env, loginType: ce.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new _e(this.config.env));case 22:throw s.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Se;}(me);var ve = /*#__PURE__*/function (_me4) {_inherits(ve, _me4);var _super7 = _createSuper(ve);function ve() {_classCallCheck(this, ve);return _super7.apply(this, arguments);}_createClass(ve, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: ce.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;r = s.refresh_token;o = s.access_token_expire;i = s.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:te(se);te(oe, { env: this.config.env, loginType: ce.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new _e(this.config.env));case 23:throw s.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ve;}(me);var Te = /*#__PURE__*/function () {function Te(e) {_classCallCheck(this, Te);this.config = e, this._cache = X(e.env), this._request = ge(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ee(oe, this._onLoginTypeChanged);}_createClass(Te, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new we(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ke(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Se(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ve(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new we(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Se(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ve(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new we(this.config)), ee(ie, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === ce.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), te(se), te(oe, { env: this.config.env, loginType: ce.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this10 = this;ee(se, function () {var t = _this10.hasLoginState();e.call(_this10, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {ee(re, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {ee(ae, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {ee(ie, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this11 = this;ee(oe, function () {var t = _this11.hasLoginState();e.call(_this11, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new _e(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ke(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Te;}();var Ae = function Ae(e, t) {t = t || N();var n = ge(this.config.env),s = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: r, name: s, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Pe = function Pe(e, t) {t = t || N();var n = ge(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Ie = function Ie(_ref5, t) {var e = _ref5.fileList;if (t = t || N(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t7 = _step3.value;if (!_t7 || "string" != typeof _t7) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return ge(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},be = function be(_ref6, t) {var e = _ref6.fileList;t = t || N(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s6 = _step4.value;"object" == typeof _s6 ? (_s6.hasOwnProperty("fileID") && _s6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s6.fileID, max_age: _s6.maxAge })) : "string" == typeof _s6 ? n.push({ fileid: _s6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return ge(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Oe = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return be.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = ge(this.config.env);r = n.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Oe(_x26, _x27) {return _ref8.apply(this, arguments);};}(),Ee = function Ee(_ref9, o) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,r = _ref9.search;var i = o || N();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: n, parse: s, search: r, function_name: e, request_data: a };return ge(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t8 = e.data.response_data;if (s) i(null, { result: _t8, requestId: e.requestId });else try {_t8 = JSON.parse(e.data.response_data), i(null, { result: _t8, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ce = { timeout: 15e3, persistence: "session" },Ue = {};var xe = /*#__PURE__*/function () {function xe(e) {_classCallCheck(this, xe);this.config = e || this.config, this.authObj = void 0;}_createClass(xe, [{ key: "init", value: function init(e) {switch (K.adapter || (this.requestClient = new K.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ce), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new xe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || K.adapter.primaryStorage || Ce.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;V[t] = new J(e), Y[t] = new J(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, pe[n.env] = new fe(n), this.authObj = new Te(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return ee.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ne.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return Ee.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Ie.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return be.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ae.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Pe.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Ue[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Ue[e];if (n) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = B(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (K.adapter = t), n && (K.runtime = n);} }]);return xe;}();var De = new xe();function qe(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),r = "";for (var o in n) {"" === r ? !s && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(n[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Re = /*#__PURE__*/function () {function Re() {_classCallCheck(this, Re);}_createClass(Re, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, r) {C.request({ url: qe("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = C.uploadFile({ url: qe("https:", s), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {l && "mp-alipay" === d && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Re;}();var Le = { setItem: function setItem(e, t) {C.setStorageSync(e, t);}, getItem: function getItem(e) {return C.getStorageSync(e);}, removeItem: function removeItem(e) {C.removeStorageSync(e);}, clear: function clear() {C.clearStorageSync();} };var Fe = { genAdapter: function genAdapter() {return { root: {}, reqClass: Re, localStorage: Le, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };De.useAdapters(Fe);var Ne = De,$e = Ne.init;Ne.init = function (e) {e.env = e.spaceId;var t = $e.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = P(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var je = Ne;function Me() {return { token: C.getStorageSync("uni_id_token") || C.getStorageSync("uniIdToken"), tokenExpired: C.getStorageSync("uni_id_token_expired") };}function Be() {if (!l || "h5" !== d) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== m && (uni.setStorageSync("__LAST_DCLOUD_APPID", m), console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), C.removeStorageSync("uni_id_token"), C.removeStorageSync("uniIdToken"), C.removeStorageSync("uni_id_token_expired"));}var Ke = /*#__PURE__*/function (_D) {_inherits(Ke, _D);var _super8 = _createSuper(Ke);function Ke() {_classCallCheck(this, Ke);return _super8.apply(this, arguments);}_createClass(Ke, [{ key: "getAccessToken", value: function getAccessToken() {var _this12 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this12.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = E.sign(n, this.config.clientSecret);var r = O();s["x-client-info"] = JSON.stringify(r);var _Me = Me(),o = _Me.token;return s["x-client-token"] = o, { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this13 = this;var e = _ref12.url,t = _ref12.formData,n = _ref12.name,s = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this13.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new I({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this14 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,n = _ref13$fileType === void 0 ? "image" : _ref13$fileType,s = _ref13.onUploadProgress;if (!t) throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name;r = t.result.fileUrl;var c = { url: o, formData: i, name: a, filePath: e, fileType: n };return _this14.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: s }));}).then(function () {return _this14.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: r }) : s(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref14) {var e = _ref14.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref15.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return Ke;}(D);var He = { init: function init(e) {var t = new Ke(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };function We(_ref16) {var e = _ref16.data;var t;t = O();var n = JSON.parse(JSON.stringify(e || {}));if (Object.assign(n, { clientInfo: t }), !n.uniIdToken) {var _Me2 = Me(),_e17 = _Me2.token;_e17 && (n.uniIdToken = _e17);}return n;}function ze(_ref17) {var _this15 = this;var e = _ref17.name,t = _ref17.data;var n = this.localAddress,s = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {C.request({ method: "POST", url: i, data: { name: e, platform: d, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.data;var _ref19 = e || {},t = _ref19.code,n = _ref19.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref20) {var n = _ref20.code,s = _ref20.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e18 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e18), new Error(_e18);}case "SWITCH_TO_CLOUD":break;default:{var _e19 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e19), new Error(_e19);}}return _this15._originCallFunction({ name: e, data: t });}return new Promise(function (e, n) {var s = We.call(_this15, { data: t });C.request({ method: "POST", url: a, data: { provider: r, platform: d, param: s }, success: function success() {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref21.statusCode,s = _ref21.data;return !t || t >= 400 ? n(new I({ code: s.code || "SYS_ERR", message: s.message || "request:fail" })) : e({ result: s });}, fail: function fail(e) {n(new I({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Je = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Ve = /[\\^$.*+?()[\]{}|]/g,Ye = RegExp(Ve.source);function Xe(e, t, n) {return e.replace(new RegExp((s = t) && Ye.test(s) ? s.replace(Ve, "\\$&") : s, "g"), n);var s;}function Ge(_ref22) {var e = _ref22.functionName,t = _ref22.result,n = _ref22.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _s7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s7, "[/").concat(n, "-request]"));}}function Qe(e) {var t = e.callFunction,n = function n(_n4) {var _this16 = this;var s = _n4.name;_n4.data = We.call(e, { data: _n4.data });var r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, _n4).then(function (e) {return Ge.call(_this16, { functionName: s, result: e, logPvd: r }), Promise.resolve(e);}, function (e) {return Ge.call(_this16, { functionName: s, result: e, logPvd: r }), e && e.message && (e.message = function () {var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$message = _ref23.message,e = _ref23$message === void 0 ? "" : _ref23$message,_ref23$extraInfo = _ref23.extraInfo,t = _ref23$extraInfo === void 0 ? {} : _ref23$extraInfo,_ref23$formatter = _ref23.formatter,n = _ref23$formatter === void 0 ? [] : _ref23$formatter;for (var _s8 = 0; _s8 < n.length; _s8++) {var _n$_s = n[_s8],_r3 = _n$_s.rule,_o2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Xe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Xe(_c, "{".concat(_e21, "}"), t[_e21]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_n4.name, "]: ").concat(e.message), formatter: Je, extraInfo: { functionName: s } })), Promise.reject(e);});};e.callFunction = function (t) {var s;return l && e.debugInfo && !e.debugInfo.forceRemote && p ? (e._originCallFunction || (e._originCallFunction = n), s = ze.call(this, t)) : s = n.call(this, t), Object.defineProperty(s, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), s;};}var Ze = Symbol("CLIENT_DB_INTERNAL");function et(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ze, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {if ("_uniClient" === n) return null;if (n in e || "string" != typeof n) {var _t9 = e[n];return "function" == typeof _t9 ? _t9.bind(e) : _t9;}return t.get(e, n, s);} });}function tt(e) {return { on: function on(t, n) {e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);}, off: function off(t, n) {e[t] = e[t] || [];var s = e[t].indexOf(n);-1 !== s && e[t].splice(s, 1);} };}var nt = ["db.Geo", "db.command", "command.aggregate"];function st(e, t) {return nt.indexOf("".concat(e, ".").concat(t)) > -1;}function rt(e) {switch (c(e)) {case "array":return e.map(function (e) {return rt(e);});case "object":return e._internalType === Ze || Object.keys(e).forEach(function (t) {e[t] = rt(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}var ot = /*#__PURE__*/function () {function ot(e, t, n) {_classCallCheck(this, ot);this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;}_createClass(ot, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: rt(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),s = this.getCommand();if (s.$db.push({ $method: e, $param: rt(t) }), l) {var _e22 = s.$db.find(function (e) {return "collection" === e.$method;}),_t10 = _e22 && _e22.$param;_t10 && 1 === _t10.length && "string" == typeof _e22.$param[0] && _e22.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");}return this._database._callCloudFunction({ action: n, command: s });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _n5 = e.content.$method;if ("aggregate" === _n5 || "pipeline" === _n5) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return it({ $method: "count", $param: rt(Array.from(arguments)) }, e, this._database);};} }]);return ot;}();function it(e, t, n) {return et(new ot(e, t, n), { get: function get(e, t) {var s = "db";return e && e.content && (s = e.content.$method), st(s, t) ? it({ $method: t }, e, n) : function () {return it({ $method: t, $param: rt(Array.from(arguments)) }, e, n);};} });}function at(_ref24) {var e = _ref24.path,t = _ref24.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var ct = /*#__PURE__*/function (_ref25) {_inherits(ct, _ref25);var _super9 = _createSuper(ct);function ct() {_classCallCheck(this, ct);return _super9.apply(this, arguments);}_createClass(ct, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref26) {var _this17 = this;var e = _ref26.action,t = _ref26.command,n = _ref26.multiCommand,s = _ref26.queryList;function r(e, t) {if (n && s) for (var _n6 = 0; _n6 < s.length; _n6++) {var _r4 = s[_n6];_r4.udb && "function" == typeof _r4.udb.setResult && (t ? _r4.udb.setResult(t) : _r4.udb.setResult(e.result.dataList[_n6]));}}var o = T(A("database", "invoke")),i = this._uniClient;return o.then(function () {return i.callFunction({ name: "DCloud-clientDB", type: a, data: { action: e, command: t, multiCommand: n } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,n = _e$result.message,s = _e$result.token,o = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,i = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (i) for (var _e23 = 0; _e23 < i.length; _e23++) {var _i$_e = i[_e23],_t11 = _i$_e.level,_n7 = _i$_e.message,_s9 = _i$_e.detail,_r5 = console["app-plus" === d && "warn" === _t11 ? "error" : _t11] || console.log;var _o3 = "[System Info]" + _n7;_s9 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s9)), _r5(_o3);}if (t) {var _s10 = new I({ message: n, code: t, requestId: e.requestId });return _this17._callback("error", [_s10]), Promise.reject(_s10);}s && o && (!function () {var _ref27 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref27.token,t = _ref27.tokenExpired;e && C.setStorageSync("uni_id_token", e), t && C.setStorageSync("uni_id_token_expired", t);}({ token: s, tokenExpired: o }), _this17._callbackAuth("refreshToken", [{ token: s, tokenExpired: o }]), _this17._callback("refreshToken", [{ token: s, tokenExpired: o }]));var a = e.result.affectedDocs;return "number" == typeof a && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), a;} }), T(A("database", "success"), e).then(function () {return T(A("database", "complete"), e);}).then(function () {return r(e, null), Promise.resolve(e);});}, function (e) {var t = new I({ code: e.code || "SYSTEM_ERROR", message: e.message, requestId: e.requestId });return _this17._callback("error", [t]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), T(A("database", "fail"), e).then(function () {return T(A("database", "complete"), e);}).then(function () {return r(null, e), Promise.reject(e);});});} }]);return ct;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = _("_globalUniCloudDatabaseCallback")), this.auth = tt(this._authCallBacks), Object.assign(this, tt(this._dbCallBacks)), this.env = et({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = et({}, { get: function get(e, t) {return at({ path: ["Geo"], method: t });} }), this.serverDate = at({ path: [], method: "serverDate" }), this.RegExp = at({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var n = this._dbCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var n = this._authCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function ut(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return et(new e(t), { get: function get(e, t) {return st("db", t) ? it({ $method: t }, null, e) : function () {return it({ $method: t, $param: rt(Array.from(arguments)) }, null, e);};} });}(ct, { uniClient: e });return this._database = n, n;};}var ht;var lt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",dt = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function ft() {var e = Me().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(ht(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}ht = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !dt.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var n, s, r = "", o = 0; o < e.length;) {t = lt.indexOf(e.charAt(o++)) << 18 | lt.indexOf(e.charAt(o++)) << 12 | (n = lt.indexOf(e.charAt(o++))) << 6 | (s = lt.indexOf(e.charAt(o++))), r += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return r;} : atob;var pt = t(n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref29) {var s = _ref29.onChooseFile,r = _ref29.onUploadProgress;return t.then(function (e) {if (s) {var _t12 = s(e);if (void 0 !== _t12) return Promise.resolve(_t12).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = o[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,n = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : o(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var gt = "manual";function mt(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === gt) return;var n = !1;var s = [];for (var _r6 = 2; _r6 < e.length; _r6++) {e[_r6] !== t[_r6] && (s.push(e[_r6]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref30$getone = _ref30.getone,e = _ref30$getone === void 0 ? !1 : _ref30$getone,t = _ref30.success,n = _ref30.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,r = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var o = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n8;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database(this.spaceInfo);var s = t.action || this.action;s && (n = n.action(s));var r = t.collection || this.collection;n = Array.isArray(r) ? (_n8 = n).collection.apply(_n8, _toConsumableArray(r)) : n.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (n = n.where(o));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var h = t.orderby || this.orderby;h && (n = n.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;} } };}function yt(e) {return function (t) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), e;}({ customUI: !1, loadingOptions: { text: "加载中...", mask: !0 }, errorOptions: { type: "modal", retry: !1 } }, n);var _n9 = n,s = _n9.customUI,r = _n9.loadingOptions,o = _n9.errorOptions,a = !s;return new Proxy({}, { get: function get(n, s) {return /*#__PURE__*/function () {var _n10 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32() {var u,_len,c,_key,_ref31,h,l,_yield,_e25,_e24,_args32 = arguments;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:a && uni.showLoading({ title: r.title, mask: r.mask });for (_len = _args32.length, c = new Array(_len), _key = 0; _key < _len; _key++) {c[_key] = _args32[_key];}_context32.prev = 2;_context32.next = 5;return e.callFunction({ name: t, type: i, data: { method: s, params: c } });case 5:u = _context32.sent;_context32.next = 11;break;case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](2);u = { result: _context32.t0 };case 11:_ref31 = u.result || {}, h = _ref31.errCode, l = _ref31.errMsg;if (!(a && uni.hideLoading(), h)) {_context32.next = 28;break;}if (!a) {_context32.next = 26;break;}if (!("toast" === o.type)) {_context32.next = 18;break;}uni.showToast({ title: l, icon: "none" });_context32.next = 26;break;case 18:if (!("modal" !== o.type)) {_context32.next = 20;break;}throw new Error("Invalid errorOptions.type: ".concat(o.type));case 20:_context32.next = 22;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31() {var _ref33,e,t,n,s,r,_args31 = arguments;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_ref33 = _args31.length > 0 && _args31[0] !== undefined ? _args31[0] : {}, e = _ref33.title, t = _ref33.content, n = _ref33.showCancel, s = _ref33.cancelText, r = _ref33.confirmText;return _context31.abrupt("return", new Promise(function (o, i) {uni.showModal({ title: e, content: t, showCancel: n, cancelText: s, confirmText: r, success: function success(e) {o(e);}, fail: function fail() {o({ confirm: !1, cancel: !0 });} });}));case 2:case "end":return _context31.stop();}}}, _callee31);}))({ title: "提示", content: l, showCancel: o.retry, cancelText: "取消", confirmText: o.retry ? "重试" : "确定" });case 22:_yield = _context32.sent;_e25 = _yield.confirm;if (!(o.retry && _e25)) {_context32.next = 26;break;}return _context32.abrupt("return", n.apply(void 0, c));case 26:_e24 = new I({ code: h, message: l, requestId: u.requestId });throw _e24.detail = u.result, _e24;case 28:return _context32.abrupt("return", u.result);case 29:case "end":return _context32.stop();}}}, _callee32, null, [[2, 8]]);}));function n() {return _n10.apply(this, arguments);}return n;}();} });};}function _t(_x30, _x31) {return _t13.apply(this, arguments);}function _t13() {_t13 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee34(e, t) {var n, _e28, s;return _regenerator.default.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context34.prev = 1;_context34.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {C.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context34.sent;return _context34.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context34.prev = 8;_context34.t0 = _context34["catch"](1);return _context34.abrupt("return", !1);case 11:case "end":return _context34.stop();}}}, _callee34, null, [[1, 8]]);}));return _t13.apply(this, arguments);}function wt(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var n;n = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, n);}), e.isReady = !1, e.isDefault = !1;var s = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return s.getLoginState();}).then(function (e) {return e ? Promise.resolve() : s.signInAnonymously();}).then(function () {if (!l) return Promise.resolve();if (l && e.debugInfo) {var _e$debugInfo = e.debugInfo,_t14 = _e$debugInfo.address,_n11 = _e$debugInfo.servePort;return function () {var _ref34 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee33(e, t) {var n, _s11, _r7;return _regenerator.default.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:_s11 = 0;case 1:if (!(_s11 < e.length)) {_context33.next = 11;break;}_r7 = e[_s11];_context33.next = 5;return _t(_r7, t);case 5:if (!_context33.sent) {_context33.next = 8;break;}n = _r7;return _context33.abrupt("break", 11);case 8:_s11++;_context33.next = 1;break;case 11:return _context33.abrupt("return", { address: n, port: t });case 12:case "end":return _context33.stop();}}}, _callee33);}));return function (_x32, _x33) {return _ref34.apply(this, arguments);};}()(_t14, _n11);}}).then(function () {var _ref35 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref35.address,n = _ref35.port;if (!l) return Promise.resolve();if (t) e.localAddress = t, e.localPort = n;else if (e.debugInfo) {var _t15 = console["app-plus" === d ? "error" : "warn"];var _n12 = "";"remote" === e.debugInfo.initialLaunchType ? (e.debugInfo.forceRemote = !0, _n12 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : _n12 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", "h5" === d && (_n12 += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), _t15(_n12);}}).then(function () {Be(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var kt = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var n = !1 !== e.debugFunction && l && ("h5" === d && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === d);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":t = q.init(Object.assign(e, { useDebugFunction: n }));break;case "private":t = He.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}var s = f;l && s && !s.code && (t.debugInfo = s), wt(t), t.reInit = function () {wt(this);}, Qe(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), ut(t), function (e) {e.getCurrentUserInfo = ft, e.chooseAndUploadFile = pt.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return mt(e);} }), e.importObject = yt(e);}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var n = t[e];t[e] = function () {return t.reInit(), n.apply(t, Array.from(arguments));}, t[e] = P(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {{var e = p;var t = {};if (1 === e.length) t = e[0], kt = kt.init(t), kt.isDefault = !0;else {var _t16 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];var _n13;_n13 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : g ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t16.forEach(function (e) {kt[e] = function () {return console.error(_n13), Promise.reject(new I({ code: "SYS_ERR", message: _n13 }));};});}Object.assign(kt, { get mixinDatacom() {return mt(kt);} }), kt.addInterceptor = S, kt.removeInterceptor = v, l && "h5" === d && (window.uniCloud = kt);}})();var St = kt;exports.default = St;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!*******************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/pages.json?{"type":"stat"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__C8C1BD3" };exports.default = _default;

/***/ }),

/***/ 23:
/*!**************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/common/location/qqmap-wx-jssdk.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 微信小程序JavaScriptSDK
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @version 1.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @date 2019-03-06
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200 };

var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit' };

var EARTH_RADIUS = 6378136.49;
var Utils = {
  /**
              * md5加密方法
              * 版权所有©2011 Sebastian Tschan，https：//blueimp.net
              */
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },

  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },
  /**
      * 得到md5加密后的sig参数
      * @param {Object} requestParam 接口参数
      * @param {String} sk签名字符串
      * @param {String} featrue 方法名
      * @return 返回加密后的sig参数
      */
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },
  /**
      * 得到终点query字符串
      * @param {Array|String} 检索数据
      */
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },

  /**
      * 计算角度
      */
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  /**
      * 处理终点location数组
      * @return 返回终点数组
      */
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1]) });

    }
    return endLocation;
  },

  /**
      * 计算两点间直线距离
      * @param a 表示纬度差
      * @param b 表示经度差
      * @return 返回的是距离，单位m
      */
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  /**
      * 使用微信接口进行定位
      */
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete });

  },

  /**
      * 获取location参数
      */
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1] };

      } else {
        location = {};
      }
    }
    return location;
  },

  /**
      * 回调函数默认处理
      */
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },

  /**
      * 验证param对应的key值是否为空
      * 
      * @param {Object} param 接口参数
      * @param {String} key 对应参数的key
      */
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },

  /**
      * 验证参数中是否存在检索词keyword
      * 
      * @param {Object} param 接口参数
      */
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },

  /**
      * 验证location值
      * 
      * @param {Object} param 接口参数
      */
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },

  /**
      * 构造错误数据结构
      * @param {Number} errCode 错误码
      * @param {Number} errMsg 错误描述
      */
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg };

  },

  /**
      * 
      * 数据处理函数
      * 根据传入参数不同处理不同数据
      * @param {String} feature 功能名称
      * search 地点搜索
      * suggest关键词提示
      * reverseGeocoder逆地址解析
      * geocoder地址解析
      * getCityList获取城市列表：父集
      * getDistrictByCityId获取区县列表：子集
      * calculateDistance距离计算
      * @param {Object} param 接口参数
      * @param {Object} data 数据
      */
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });

      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify });

    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null });

      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify });

    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };

      if (reverseGeocoderResult.pois) {//判断是否返回周边poi
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null });

        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify });

      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify });

      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null };

      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify });

    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult });

    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance });

    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },

  /**
      * 构造微信请求参数，公共属性处理
      * 
      * @param {Object} param 接口参数
      * @param {Object} param 配置项
      * @param {String} feature 方法名
      */
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = { "content-type": "application/json" };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:{
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:{
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:{
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }}


    };
    return options;
  },

  /**
      * 处理用户参数是否传入坐标进行不同的处理
      */
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  } };var



QQMapWX = /*#__PURE__*/function () {"use strict";

  /**
                                                   * 构造函数
                                                   * 
                                                   * @param {Object} options 接口参数,key 为必选参数
                                                   */
  function QQMapWX(options) {_classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }_createClass(QQMapWX, [{ key: "search",

    /**
                                            * POI周边检索
                                            *
                                            * @param {Object} options 接口参数对象
                                            * 
                                            * 参数对象结构可以参考
                                            * @see http://lbs.qq.com/webservice_v1/guide-search.html
                                            */value: function search(
    options) {
      var that = this;
      options = options || {};

      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key };


      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }

      if (options.filter) {
        requestParam.filter = options.filter;
      }

      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;

      //判断城市限定参数
      if (options.region) {
        region = options.region;
      }

      //矩形限定坐标(暂时只支持字符串格式)
      if (options.rectangle) {
        rectangle = options.rectangle;
      }

      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          //城市限定参数拼接
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          //矩形搜索
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam },
        'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "getSuggestion",

    /**
                                  * sug模糊检索
                                  *
                                  * @param {Object} options 接口参数对象
                                  * 
                                  * 参数对象结构可以参考
                                  * http://lbs.qq.com/webservice_v1/guide-suggestion.html
                                  */value: function getSuggestion(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10, //控制显示条数
        page_index: options.page_index || 1, //控制页数
        get_subpois: options.get_subpois || 0, //返回子地点
        output: 'json',
        key: that.key };

      //长地址
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      //过滤
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      //排序
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam },
          "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam },
        "suggest"));
      }
    } }, { key: "reverseGeocoder",

    /**
                                    * 逆地址解析
                                    *
                                    * @param {Object} options 接口参数对象
                                    * 
                                    * 请求参数结构可以参考
                                    * http://lbs.qq.com/webservice_v1/guide-gcoder.html
                                    */value: function reverseGeocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key };

      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam },
        'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    } }, { key: "geocoder",

    /**
                             * 地址解析
                             *
                             * @param {Object} options 接口参数对象
                             * 
                             * 请求参数结构可以参考
                             * http://lbs.qq.com/webservice_v1/guide-geocoder.html
                             */value: function geocoder(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }

      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key };


      //城市限定
      if (options.region) {
        requestParam.region = options.region;
      }

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam },
      'geocoder'));
    } }, { key: "getCityList",


    /**
                                * 获取城市列表
                                *
                                * @param {Object} options 接口参数对象
                                * 
                                * 请求参数结构可以参考
                                * http://lbs.qq.com/webservice_v1/guide-region.html
                                */value: function getCityList(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam },
      'getCityList'));
    } }, { key: "getDistrictByCityId",

    /**
                                        * 获取对应城市ID的区县列表
                                        *
                                        * @param {Object} options 接口参数对象
                                        * 
                                        * 请求参数结构可以参考
                                        * http://lbs.qq.com/webservice_v1/guide-region.html
                                        */value: function getDistrictByCityId(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }

      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key };


      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam },
      'getDistrictByCityId'));
    } }, { key: "calculateDistance",

    /**
                                      * 用于单起点到多终点的路线距离(非直线距离)计算：
                                      * 支持两种距离计算方式：步行和驾车。
                                      * 起点到终点最大限制直线距离10公里。
                                      *
                                      * 新增直线距离计算。
                                      * 
                                      * @param {Object} options 接口参数对象
                                      * 
                                      * 请求参数结构可以参考
                                      * http://lbs.qq.com/webservice_v1/guide-distance.html
                                      */value: function calculateDistance(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key };


      if (options.from) {
        options.location = options.from;
      }

      //计算直线距离
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
          var data = {
            message: "query ok",
            result: {
              elements: [] },

            status: 0 };

          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({ //将坐标存入
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude },

              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng } });


          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult });

        };

        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam },
          'calculateDistance'));
        };

        Utils.locationProcess(options, locationsuccess);
      }
    } }, { key: "direction",

    /**
                              * 路线规划：
                              * 
                              * @param {Object} options 接口参数对象
                              * 
                              * 请求参数结构可以参考
                              * https://lbs.qq.com/webservice_v1/guide-road.html
                              */value: function direction(
    options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        output: 'json',
        key: that.key };


      //to格式处理
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      //初始化局部请求域名
      var SET_URL_DIRECTION = null;
      //设置默认mode属性
      options.mode = options.mode || MODE.driving;

      //设置请求域名
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;

      if (options.from) {
        options.location = options.from;
      }

      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }

      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam },
        'direction'));
      };

      Utils.locationProcess(options, locationsuccess);
    } }]);return QQMapWX;}();
;

module.exports = QQMapWX;

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"CampuServicePlatform","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"CampuServicePlatform","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"CampuServicePlatform","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"CampuServicePlatform","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 346:
/*!********************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 354:
/*!************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatDate = formatDate;exports.friendlyDate = friendlyDate; // yyyy-MM-dd hh:mm:ss.SSS 所有支持的类型
function pad(str) {var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  str += '';
  while (str.length < length) {
    str = '0' + str;
  }
  return str.slice(-length);
}

var parser = {
  yyyy: function yyyy(dateObj) {
    return pad(dateObj.year, 4);
  },
  yy: function yy(dateObj) {
    return pad(dateObj.year);
  },
  MM: function MM(dateObj) {
    return pad(dateObj.month);
  },
  M: function M(dateObj) {
    return dateObj.month;
  },
  dd: function dd(dateObj) {
    return pad(dateObj.day);
  },
  d: function d(dateObj) {
    return dateObj.day;
  },
  hh: function hh(dateObj) {
    return pad(dateObj.hour);
  },
  h: function h(dateObj) {
    return dateObj.hour;
  },
  mm: function mm(dateObj) {
    return pad(dateObj.minute);
  },
  m: function m(dateObj) {
    return dateObj.minute;
  },
  ss: function ss(dateObj) {
    return pad(dateObj.second);
  },
  s: function s(dateObj) {
    return dateObj.second;
  },
  SSS: function SSS(dateObj) {
    return pad(dateObj.millisecond, 3);
  },
  S: function S(dateObj) {
    return dateObj.millisecond;
  } };


// 这都n年了iOS依然不认识2020-12-12，需要转换为2020/12/12
function getDate(time) {
  if (time instanceof Date) {
    return time;
  }
  switch (typeof time) {
    case 'string':
      {
        // 2020-12-12T12:12:12.000Z、2020-12-12T12:12:12.000
        if (time.indexOf('T') > -1) {
          return new Date(time);
        }
        return new Date(time.replace(/-/g, '/'));
      }
    default:
      return new Date(time);}

}

function formatDate(date) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm:ss';
  if (!date && date !== 0) {
    return '';
  }
  date = getDate(date);
  var dateObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds() };

  var tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;
  var flag = true;
  var result = format;
  while (flag) {
    flag = false;
    result = result.replace(tokenRegExp, function (matched) {
      flag = true;
      return parser[matched](dateObj);
    });
  }
  return result;
}

function friendlyDate(time, _ref)



{var _ref$locale = _ref.locale,locale = _ref$locale === void 0 ? 'zh' : _ref$locale,_ref$threshold = _ref.threshold,threshold = _ref$threshold === void 0 ? [60000, 3600000] : _ref$threshold,_ref$format = _ref.format,format = _ref$format === void 0 ? 'yyyy/MM/dd hh:mm:ss' : _ref$format;
  if (time === '-') {
    return time;
  }
  if (!time && time !== 0) {
    return '';
  }
  var localeText = {
    zh: {
      year: '年',
      month: '月',
      day: '天',
      hour: '小时',
      minute: '分钟',
      second: '秒',
      ago: '前',
      later: '后',
      justNow: '刚刚',
      soon: '马上',
      template: '{num}{unit}{suffix}' },

    en: {
      year: 'year',
      month: 'month',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      ago: 'ago',
      later: 'later',
      justNow: 'just now',
      soon: 'soon',
      template: '{num} {unit} {suffix}' } };


  var text = localeText[locale] || localeText.zh;
  var date = getDate(time);
  var ms = date.getTime() - Date.now();
  var absMs = Math.abs(ms);
  if (absMs < threshold[0]) {
    return ms < 0 ? text.justNow : text.soon;
  }
  if (absMs >= threshold[1]) {
    return formatDate(date, format);
  }
  var num;
  var unit;
  var suffix = text.later;
  if (ms < 0) {
    suffix = text.ago;
    ms = -ms;
  }
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  switch (true) {
    case years > 0:
      num = years;
      unit = text.year;
      break;
    case months > 0:
      num = months;
      unit = text.month;
      break;
    case days > 0:
      num = days;
      unit = text.day;
      break;
    case hours > 0:
      num = hours;
      unit = text.hour;
      break;
    case minutes > 0:
      num = minutes;
      unit = text.minute;
      break;
    default:
      num = seconds;
      unit = text.second;
      break;}


  if (locale === 'en') {
    if (num === 1) {
      num = 'a';
    } else {
      unit += 's';
    }
  }

  return text.template.replace(/{\s*num\s*}/g, num + '').replace(/{\s*unit\s*}/g, unit).replace(/{\s*suffix\s*}/g,
  suffix);
}

/***/ }),

/***/ 360:
/*!***********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-search-bar/components/uni-search-bar/i18n/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 361));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 362));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 363));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 361:
/*!**********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-search-bar/components/uni-search-bar/i18n/en.json ***!
  \**********************************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"Search enter content\"}");

/***/ }),

/***/ 362:
/*!***************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hans.json ***!
  \***************************************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"请输入搜索内容\"}");

/***/ }),

/***/ 363:
/*!***************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hant.json ***!
  \***************************************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"請輸入搜索內容\"}");

/***/ }),

/***/ 392:
/*!*************************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-file-picker/components/uni-file-picker/choose-and-upload-file.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.chooseAndUploadFile = chooseAndUploadFile;exports.uploadCloudFiles = uploadCloudFiles;

var ERR_MSG_OK = 'chooseAndUploadFile:ok';
var ERR_MSG_FAIL = 'chooseAndUploadFile:fail';

function chooseImage(opts) {var

  count =



  opts.count,_opts$sizeType = opts.sizeType,sizeType = _opts$sizeType === void 0 ? ['original', 'compressed'] : _opts$sizeType,_opts$sourceType = opts.sourceType,sourceType = _opts$sourceType === void 0 ? ['album', 'camera'] : _opts$sourceType,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res, 'image'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseVideo(opts) {var

  camera =




  opts.camera,compressed = opts.compressed,maxDuration = opts.maxDuration,_opts$sourceType2 = opts.sourceType,sourceType = _opts$sourceType2 === void 0 ? ['album', 'camera'] : _opts$sourceType2,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseVideo({
      camera: camera,
      compressed: compressed,
      maxDuration: maxDuration,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {var

        tempFilePath =




        res.tempFilePath,duration = res.duration,size = res.size,height = res.height,width = res.width;
        resolve(normalizeChooseAndUploadFileRes({
          errMsg: 'chooseVideo:ok',
          tempFilePaths: [tempFilePath],
          tempFiles: [
          {
            name: res.tempFile && res.tempFile.name || '',
            path: tempFilePath,
            size: size,
            type: res.tempFile && res.tempFile.type || '',
            width: width,
            height: height,
            duration: duration,
            fileType: 'video',
            cloudPath: '' }] },

        'video'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseAll(opts) {var

  count =

  opts.count,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    var chooseFile = uni.chooseFile;
    if (typeof wx !== 'undefined' &&
    typeof wx.chooseMessageFile === 'function') {
      chooseFile = wx.chooseMessageFile;
    }
    if (typeof chooseFile !== 'function') {
      return reject({
        errMsg: ERR_MSG_FAIL + ' 请指定 type 类型，该平台仅支持选择 image 或 video。' });

    }
    chooseFile({
      type: 'all',
      count: count,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL) });

      } });

  });
}

function normalizeChooseAndUploadFileRes(res, fileType) {
  res.tempFiles.forEach(function (item, index) {
    if (!item.name) {
      item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
    }
    if (fileType) {
      item.fileType = fileType;
    }
    item.cloudPath =
    Date.now() + '_' + index + item.name.substring(item.name.lastIndexOf('.'));
  });
  if (!res.tempFilePaths) {
    res.tempFilePaths = res.tempFiles.map(function (file) {return file.path;});
  }
  return res;
}

function uploadCloudFiles(files) {var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;var _onUploadProgress = arguments.length > 2 ? arguments[2] : undefined;
  files = JSON.parse(JSON.stringify(files));
  var len = files.length;
  var count = 0;
  var self = this;
  return new Promise(function (resolve) {
    while (count < max) {
      next();
    }

    function next() {
      var cur = count++;
      if (cur >= len) {
        !files.find(function (item) {return !item.url && !item.errMsg;}) && resolve(files);
        return;
      }
      var fileItem = files[cur];
      var index = self.files.findIndex(function (v) {return v.uuid === fileItem.uuid;});
      fileItem.url = '';
      delete fileItem.errMsg;

      uniCloud.
      uploadFile({
        filePath: fileItem.path,
        cloudPath: fileItem.cloudPath,
        fileType: fileItem.fileType,
        onUploadProgress: function onUploadProgress(res) {
          res.index = index;
          _onUploadProgress && _onUploadProgress(res);
        } }).

      then(function (res) {
        fileItem.url = res.fileID;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      }).
      catch(function (res) {
        fileItem.errMsg = res.errMsg || res.message;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      });
    }
  });
}





function uploadFiles(choosePromise, _ref)


{var onChooseFile = _ref.onChooseFile,onUploadProgress = _ref.onUploadProgress;
  return choosePromise.
  then(function (res) {
    if (onChooseFile) {
      var customChooseRes = onChooseFile(res);
      if (typeof customChooseRes !== 'undefined') {
        return Promise.resolve(customChooseRes).then(function (chooseRes) {return typeof chooseRes === 'undefined' ?
          res : chooseRes;});
      }
    }
    return res;
  }).
  then(function (res) {
    if (res === false) {
      return {
        errMsg: ERR_MSG_OK,
        tempFilePaths: [],
        tempFiles: [] };

    }
    return res;
  });
}

function chooseAndUploadFile()

{var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'all' };
  if (opts.type === 'image') {
    return uploadFiles(chooseImage(opts), opts);
  } else
  if (opts.type === 'video') {
    return uploadFiles(chooseVideo(opts), opts);
  }
  return uploadFiles(chooseAll(opts), opts);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 18)["default"]))

/***/ }),

/***/ 393:
/*!********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-file-picker/components/uni-file-picker/utils.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get_file_data = exports.get_file_info = exports.get_files_and_is_max = exports.get_extname = exports.get_file_ext = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 获取文件名和后缀
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @param {String} name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */
var get_file_ext = function get_file_ext(name) {
  var last_len = name.lastIndexOf('.');
  var len = name.length;
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len) };

};

/**
    * 获取扩展名
    * @param {Array} fileExtname
    */exports.get_file_ext = get_file_ext;
var get_extname = function get_extname(fileExtname) {
  if (!Array.isArray(fileExtname)) {
    var extname = fileExtname.replace(/(\[|\])/g, '');
    return extname.split(',');
  } else {
    return fileExtname;
  }
  return [];
};

/**
    * 获取文件和检测是否可选
    */exports.get_extname = get_extname;
var get_files_and_is_max = function get_files_and_is_max(res, _extname) {
  var filePaths = [];
  var files = [];
  if (!_extname || _extname.length === 0) {
    return {
      filePaths: filePaths,
      files: files };

  }
  res.tempFiles.forEach(function (v) {
    var fileFullName = get_file_ext(v.name);
    var extname = fileFullName.ext.toLowerCase();
    if (_extname.indexOf(extname) !== -1) {
      files.push(v);
      filePaths.push(v.path);
    }
  });
  if (files.length !== res.tempFiles.length) {
    uni.showToast({
      title: "\u5F53\u524D\u9009\u62E9\u4E86".concat(res.tempFiles.length, "\u4E2A\u6587\u4EF6 \uFF0C").concat(res.tempFiles.length - files.length, " \u4E2A\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E"),
      icon: 'none',
      duration: 5000 });

  }

  return {
    filePaths: filePaths,
    files: files };

};


/**
    * 获取图片信息
    * @param {Object} filepath
    */exports.get_files_and_is_max = get_files_and_is_max;
var get_file_info = function get_file_info(filepath) {
  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: filepath,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};
/**
    * 获取封装数据
    */exports.get_file_info = get_file_info;
var get_file_data = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(files) {var type,fileFullName,extname,filedata,imageinfo,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'image';
            // 最终需要上传数据库的数据
            fileFullName = get_file_ext(files.name);
            extname = fileFullName.ext.toLowerCase();
            filedata = {
              name: files.name,
              uuid: files.uuid,
              extname: extname || '',
              cloudPath: files.cloudPath,
              fileType: files.fileType,
              url: files.path || files.path,
              size: files.size, //单位是字节
              image: {},
              path: files.path,
              video: {} };if (!(

            type === 'image')) {_context.next = 14;break;}_context.next = 7;return (
              get_file_info(files.path));case 7:imageinfo = _context.sent;
            delete filedata.video;
            filedata.image.width = imageinfo.width;
            filedata.image.height = imageinfo.height;
            filedata.image.location = imageinfo.path;_context.next = 15;break;case 14:

            delete filedata.image;case 15:return _context.abrupt("return",

            filedata);case 16:case "end":return _context.stop();}}}, _callee);}));return function get_file_data(_x) {return _ref.apply(this, arguments);};}();exports.get_file_data = get_file_data;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 408:
/*!*********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 409));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 410));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 411));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 409:
/*!********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/en.json ***!
  \********************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"shop\",\"uni-goods-nav.options.cart\":\"cart\",\"uni-goods-nav.buttonGroup.addToCart\":\"add to cart\",\"uni-goods-nav.buttonGroup.buyNow\":\"buy now\"}");

/***/ }),

/***/ 410:
/*!*************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/zh-Hans.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店铺\",\"uni-goods-nav.options.cart\":\"购物车\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入购物车\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即购买\"}");

/***/ }),

/***/ 411:
/*!*************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/zh-Hant.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-goods-nav.options.shop, uni-goods-nav.options.cart, uni-goods-nav.buttonGroup.addToCart, uni-goods-nav.buttonGroup.buyNow, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-goods-nav.options.shop\":\"店鋪\",\"uni-goods-nav.options.cart\":\"購物車\",\"uni-goods-nav.buttonGroup.addToCart\":\"加入購物車\",\"uni-goods-nav.buttonGroup.buyNow\":\"立即購買\"}");

/***/ }),

/***/ 419:
/*!**********************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/components/auto-parse-address/zh-address-parse.min.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, n) { true ? module.exports = n() : undefined;}(this, function () {return function (e) {var n = {};function c(d) {if (n[d]) return n[d].exports;var o = n[d] = { i: d, l: !1, exports: {} };return e[d].call(o.exports, o, o.exports, c), o.l = !0, o.exports;}return c.m = e, c.c = n, c.d = function (e, n, d) {c.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: d });}, c.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, c.t = function (e, n) {if (1 & n && (e = c(e)), 8 & n) return e;if (4 & n && "object" == typeof e && e && e.__esModule) return e;var d = Object.create(null);if (c.r(d), Object.defineProperty(d, "default", { enumerable: !0, value: e }), 2 & n && "string" != typeof e) for (var o in e) {c.d(d, o, function (n) {return e[n];}.bind(null, o));}return d;}, c.n = function (e) {var n = e && e.__esModule ? function () {return e.default;} : function () {return e;};return c.d(n, "a", n), n;}, c.o = function (e, n) {return Object.prototype.hasOwnProperty.call(e, n);}, c.p = "", c(c.s = 2);}([function (e) {e.exports = JSON.parse('[{"code":"11","name":"北京市","children":[{"code":"1101","name":"市辖区","children":[{"code":"110101","name":"东城区"},{"code":"110102","name":"西城区"},{"code":"110105","name":"朝阳区"},{"code":"110106","name":"丰台区"},{"code":"110107","name":"石景山区"},{"code":"110108","name":"海淀区"},{"code":"110109","name":"门头沟区"},{"code":"110111","name":"房山区"},{"code":"110112","name":"通州区"},{"code":"110113","name":"顺义区"},{"code":"110114","name":"昌平区"},{"code":"110115","name":"大兴区"},{"code":"110116","name":"怀柔区"},{"code":"110117","name":"平谷区"},{"code":"110118","name":"密云区"},{"code":"110119","name":"延庆区"}]}]},{"code":"12","name":"天津市","children":[{"code":"1201","name":"市辖区","children":[{"code":"120101","name":"和平区"},{"code":"120102","name":"河东区"},{"code":"120103","name":"河西区"},{"code":"120104","name":"南开区"},{"code":"120105","name":"河北区"},{"code":"120106","name":"红桥区"},{"code":"120110","name":"东丽区"},{"code":"120111","name":"西青区"},{"code":"120112","name":"津南区"},{"code":"120113","name":"北辰区"},{"code":"120114","name":"武清区"},{"code":"120115","name":"宝坻区"},{"code":"120116","name":"滨海新区"},{"code":"120117","name":"宁河区"},{"code":"120118","name":"静海区"},{"code":"120119","name":"蓟州区"}]}]},{"code":"13","name":"河北省","children":[{"code":"1301","name":"石家庄市","children":[{"code":"130102","name":"长安区"},{"code":"130104","name":"桥西区"},{"code":"130105","name":"新华区"},{"code":"130107","name":"井陉矿区"},{"code":"130108","name":"裕华区"},{"code":"130109","name":"藁城区"},{"code":"130110","name":"鹿泉区"},{"code":"130111","name":"栾城区"},{"code":"130121","name":"井陉县"},{"code":"130123","name":"正定县"},{"code":"130125","name":"行唐县"},{"code":"130126","name":"灵寿县"},{"code":"130127","name":"高邑县"},{"code":"130128","name":"深泽县"},{"code":"130129","name":"赞皇县"},{"code":"130130","name":"无极县"},{"code":"130131","name":"平山县"},{"code":"130132","name":"元氏县"},{"code":"130133","name":"赵县"},{"code":"130171","name":"石家庄高新技术产业开发区"},{"code":"130172","name":"石家庄循环化工园区"},{"code":"130181","name":"辛集市"},{"code":"130183","name":"晋州市"},{"code":"130184","name":"新乐市"}]},{"code":"1302","name":"唐山市","children":[{"code":"130202","name":"路南区"},{"code":"130203","name":"路北区"},{"code":"130204","name":"古冶区"},{"code":"130205","name":"开平区"},{"code":"130207","name":"丰南区"},{"code":"130208","name":"丰润区"},{"code":"130209","name":"曹妃甸区"},{"code":"130224","name":"滦南县"},{"code":"130225","name":"乐亭县"},{"code":"130227","name":"迁西县"},{"code":"130229","name":"玉田县"},{"code":"130271","name":"河北唐山芦台经济开发区"},{"code":"130272","name":"唐山市汉沽管理区"},{"code":"130273","name":"唐山高新技术产业开发区"},{"code":"130274","name":"河北唐山海港经济开发区"},{"code":"130281","name":"遵化市"},{"code":"130283","name":"迁安市"},{"code":"130284","name":"滦州市"}]},{"code":"1303","name":"秦皇岛市","children":[{"code":"130302","name":"海港区"},{"code":"130303","name":"山海关区"},{"code":"130304","name":"北戴河区"},{"code":"130306","name":"抚宁区"},{"code":"130321","name":"青龙满族自治县"},{"code":"130322","name":"昌黎县"},{"code":"130324","name":"卢龙县"},{"code":"130371","name":"秦皇岛市经济技术开发区"},{"code":"130372","name":"北戴河新区"}]},{"code":"1304","name":"邯郸市","children":[{"code":"130402","name":"邯山区"},{"code":"130403","name":"丛台区"},{"code":"130404","name":"复兴区"},{"code":"130406","name":"峰峰矿区"},{"code":"130407","name":"肥乡区"},{"code":"130408","name":"永年区"},{"code":"130423","name":"临漳县"},{"code":"130424","name":"成安县"},{"code":"130425","name":"大名县"},{"code":"130426","name":"涉县"},{"code":"130427","name":"磁县"},{"code":"130430","name":"邱县"},{"code":"130431","name":"鸡泽县"},{"code":"130432","name":"广平县"},{"code":"130433","name":"馆陶县"},{"code":"130434","name":"魏县"},{"code":"130435","name":"曲周县"},{"code":"130471","name":"邯郸经济技术开发区"},{"code":"130473","name":"邯郸冀南新区"},{"code":"130481","name":"武安市"}]},{"code":"1305","name":"邢台市","children":[{"code":"130502","name":"襄都区"},{"code":"130503","name":"信都区"},{"code":"130505","name":"任泽区"},{"code":"130506","name":"南和区"},{"code":"130522","name":"临城县"},{"code":"130523","name":"内丘县"},{"code":"130524","name":"柏乡县"},{"code":"130525","name":"隆尧县"},{"code":"130528","name":"宁晋县"},{"code":"130529","name":"巨鹿县"},{"code":"130530","name":"新河县"},{"code":"130531","name":"广宗县"},{"code":"130532","name":"平乡县"},{"code":"130533","name":"威县"},{"code":"130534","name":"清河县"},{"code":"130535","name":"临西县"},{"code":"130571","name":"河北邢台经济开发区"},{"code":"130581","name":"南宫市"},{"code":"130582","name":"沙河市"}]},{"code":"1306","name":"保定市","children":[{"code":"130602","name":"竞秀区"},{"code":"130606","name":"莲池区"},{"code":"130607","name":"满城区"},{"code":"130608","name":"清苑区"},{"code":"130609","name":"徐水区"},{"code":"130623","name":"涞水县"},{"code":"130624","name":"阜平县"},{"code":"130626","name":"定兴县"},{"code":"130627","name":"唐县"},{"code":"130628","name":"高阳县"},{"code":"130629","name":"容城县"},{"code":"130630","name":"涞源县"},{"code":"130631","name":"望都县"},{"code":"130632","name":"安新县"},{"code":"130633","name":"易县"},{"code":"130634","name":"曲阳县"},{"code":"130635","name":"蠡县"},{"code":"130636","name":"顺平县"},{"code":"130637","name":"博野县"},{"code":"130638","name":"雄县"},{"code":"130671","name":"保定高新技术产业开发区"},{"code":"130672","name":"保定白沟新城"},{"code":"130681","name":"涿州市"},{"code":"130682","name":"定州市"},{"code":"130683","name":"安国市"},{"code":"130684","name":"高碑店市"}]},{"code":"1307","name":"张家口市","children":[{"code":"130702","name":"桥东区"},{"code":"130703","name":"桥西区"},{"code":"130705","name":"宣化区"},{"code":"130706","name":"下花园区"},{"code":"130708","name":"万全区"},{"code":"130709","name":"崇礼区"},{"code":"130722","name":"张北县"},{"code":"130723","name":"康保县"},{"code":"130724","name":"沽源县"},{"code":"130725","name":"尚义县"},{"code":"130726","name":"蔚县"},{"code":"130727","name":"阳原县"},{"code":"130728","name":"怀安县"},{"code":"130730","name":"怀来县"},{"code":"130731","name":"涿鹿县"},{"code":"130732","name":"赤城县"},{"code":"130771","name":"张家口经济开发区"},{"code":"130772","name":"张家口市察北管理区"},{"code":"130773","name":"张家口市塞北管理区"}]},{"code":"1308","name":"承德市","children":[{"code":"130802","name":"双桥区"},{"code":"130803","name":"双滦区"},{"code":"130804","name":"鹰手营子矿区"},{"code":"130821","name":"承德县"},{"code":"130822","name":"兴隆县"},{"code":"130824","name":"滦平县"},{"code":"130825","name":"隆化县"},{"code":"130826","name":"丰宁满族自治县"},{"code":"130827","name":"宽城满族自治县"},{"code":"130828","name":"围场满族蒙古族自治县"},{"code":"130871","name":"承德高新技术产业开发区"},{"code":"130881","name":"平泉市"}]},{"code":"1309","name":"沧州市","children":[{"code":"130902","name":"新华区"},{"code":"130903","name":"运河区"},{"code":"130921","name":"沧县"},{"code":"130922","name":"青县"},{"code":"130923","name":"东光县"},{"code":"130924","name":"海兴县"},{"code":"130925","name":"盐山县"},{"code":"130926","name":"肃宁县"},{"code":"130927","name":"南皮县"},{"code":"130928","name":"吴桥县"},{"code":"130929","name":"献县"},{"code":"130930","name":"孟村回族自治县"},{"code":"130971","name":"河北沧州经济开发区"},{"code":"130972","name":"沧州高新技术产业开发区"},{"code":"130973","name":"沧州渤海新区"},{"code":"130981","name":"泊头市"},{"code":"130982","name":"任丘市"},{"code":"130983","name":"黄骅市"},{"code":"130984","name":"河间市"}]},{"code":"1310","name":"廊坊市","children":[{"code":"131002","name":"安次区"},{"code":"131003","name":"广阳区"},{"code":"131022","name":"固安县"},{"code":"131023","name":"永清县"},{"code":"131024","name":"香河县"},{"code":"131025","name":"大城县"},{"code":"131026","name":"文安县"},{"code":"131028","name":"大厂回族自治县"},{"code":"131071","name":"廊坊经济技术开发区"},{"code":"131081","name":"霸州市"},{"code":"131082","name":"三河市"}]},{"code":"1311","name":"衡水市","children":[{"code":"131102","name":"桃城区"},{"code":"131103","name":"冀州区"},{"code":"131121","name":"枣强县"},{"code":"131122","name":"武邑县"},{"code":"131123","name":"武强县"},{"code":"131124","name":"饶阳县"},{"code":"131125","name":"安平县"},{"code":"131126","name":"故城县"},{"code":"131127","name":"景县"},{"code":"131128","name":"阜城县"},{"code":"131171","name":"河北衡水高新技术产业开发区"},{"code":"131172","name":"衡水滨湖新区"},{"code":"131182","name":"深州市"}]}]},{"code":"14","name":"山西省","children":[{"code":"1401","name":"太原市","children":[{"code":"140105","name":"小店区"},{"code":"140106","name":"迎泽区"},{"code":"140107","name":"杏花岭区"},{"code":"140108","name":"尖草坪区"},{"code":"140109","name":"万柏林区"},{"code":"140110","name":"晋源区"},{"code":"140121","name":"清徐县"},{"code":"140122","name":"阳曲县"},{"code":"140123","name":"娄烦县"},{"code":"140171","name":"山西转型综合改革示范区"},{"code":"140181","name":"古交市"}]},{"code":"1402","name":"大同市","children":[{"code":"140212","name":"新荣区"},{"code":"140213","name":"平城区"},{"code":"140214","name":"云冈区"},{"code":"140215","name":"云州区"},{"code":"140221","name":"阳高县"},{"code":"140222","name":"天镇县"},{"code":"140223","name":"广灵县"},{"code":"140224","name":"灵丘县"},{"code":"140225","name":"浑源县"},{"code":"140226","name":"左云县"},{"code":"140271","name":"山西大同经济开发区"}]},{"code":"1403","name":"阳泉市","children":[{"code":"140302","name":"城区"},{"code":"140303","name":"矿区"},{"code":"140311","name":"郊区"},{"code":"140321","name":"平定县"},{"code":"140322","name":"盂县"}]},{"code":"1404","name":"长治市","children":[{"code":"140403","name":"潞州区"},{"code":"140404","name":"上党区"},{"code":"140405","name":"屯留区"},{"code":"140406","name":"潞城区"},{"code":"140423","name":"襄垣县"},{"code":"140425","name":"平顺县"},{"code":"140426","name":"黎城县"},{"code":"140427","name":"壶关县"},{"code":"140428","name":"长子县"},{"code":"140429","name":"武乡县"},{"code":"140430","name":"沁县"},{"code":"140431","name":"沁源县"},{"code":"140471","name":"山西长治高新技术产业园区"}]},{"code":"1405","name":"晋城市","children":[{"code":"140502","name":"城区"},{"code":"140521","name":"沁水县"},{"code":"140522","name":"阳城县"},{"code":"140524","name":"陵川县"},{"code":"140525","name":"泽州县"},{"code":"140581","name":"高平市"}]},{"code":"1406","name":"朔州市","children":[{"code":"140602","name":"朔城区"},{"code":"140603","name":"平鲁区"},{"code":"140621","name":"山阴县"},{"code":"140622","name":"应县"},{"code":"140623","name":"右玉县"},{"code":"140671","name":"山西朔州经济开发区"},{"code":"140681","name":"怀仁市"}]},{"code":"1407","name":"晋中市","children":[{"code":"140702","name":"榆次区"},{"code":"140703","name":"太谷区"},{"code":"140721","name":"榆社县"},{"code":"140722","name":"左权县"},{"code":"140723","name":"和顺县"},{"code":"140724","name":"昔阳县"},{"code":"140725","name":"寿阳县"},{"code":"140727","name":"祁县"},{"code":"140728","name":"平遥县"},{"code":"140729","name":"灵石县"},{"code":"140781","name":"介休市"}]},{"code":"1408","name":"运城市","children":[{"code":"140802","name":"盐湖区"},{"code":"140821","name":"临猗县"},{"code":"140822","name":"万荣县"},{"code":"140823","name":"闻喜县"},{"code":"140824","name":"稷山县"},{"code":"140825","name":"新绛县"},{"code":"140826","name":"绛县"},{"code":"140827","name":"垣曲县"},{"code":"140828","name":"夏县"},{"code":"140829","name":"平陆县"},{"code":"140830","name":"芮城县"},{"code":"140881","name":"永济市"},{"code":"140882","name":"河津市"}]},{"code":"1409","name":"忻州市","children":[{"code":"140902","name":"忻府区"},{"code":"140921","name":"定襄县"},{"code":"140922","name":"五台县"},{"code":"140923","name":"代县"},{"code":"140924","name":"繁峙县"},{"code":"140925","name":"宁武县"},{"code":"140926","name":"静乐县"},{"code":"140927","name":"神池县"},{"code":"140928","name":"五寨县"},{"code":"140929","name":"岢岚县"},{"code":"140930","name":"河曲县"},{"code":"140931","name":"保德县"},{"code":"140932","name":"偏关县"},{"code":"140971","name":"五台山风景名胜区"},{"code":"140981","name":"原平市"}]},{"code":"1410","name":"临汾市","children":[{"code":"141002","name":"尧都区"},{"code":"141021","name":"曲沃县"},{"code":"141022","name":"翼城县"},{"code":"141023","name":"襄汾县"},{"code":"141024","name":"洪洞县"},{"code":"141025","name":"古县"},{"code":"141026","name":"安泽县"},{"code":"141027","name":"浮山县"},{"code":"141028","name":"吉县"},{"code":"141029","name":"乡宁县"},{"code":"141030","name":"大宁县"},{"code":"141031","name":"隰县"},{"code":"141032","name":"永和县"},{"code":"141033","name":"蒲县"},{"code":"141034","name":"汾西县"},{"code":"141081","name":"侯马市"},{"code":"141082","name":"霍州市"}]},{"code":"1411","name":"吕梁市","children":[{"code":"141102","name":"离石区"},{"code":"141121","name":"文水县"},{"code":"141122","name":"交城县"},{"code":"141123","name":"兴县"},{"code":"141124","name":"临县"},{"code":"141125","name":"柳林县"},{"code":"141126","name":"石楼县"},{"code":"141127","name":"岚县"},{"code":"141128","name":"方山县"},{"code":"141129","name":"中阳县"},{"code":"141130","name":"交口县"},{"code":"141181","name":"孝义市"},{"code":"141182","name":"汾阳市"}]}]},{"code":"15","name":"内蒙古自治区","children":[{"code":"1501","name":"呼和浩特市","children":[{"code":"150102","name":"新城区"},{"code":"150103","name":"回民区"},{"code":"150104","name":"玉泉区"},{"code":"150105","name":"赛罕区"},{"code":"150121","name":"土默特左旗"},{"code":"150122","name":"托克托县"},{"code":"150123","name":"和林格尔县"},{"code":"150124","name":"清水河县"},{"code":"150125","name":"武川县"},{"code":"150172","name":"呼和浩特经济技术开发区"}]},{"code":"1502","name":"包头市","children":[{"code":"150202","name":"东河区"},{"code":"150203","name":"昆都仑区"},{"code":"150204","name":"青山区"},{"code":"150205","name":"石拐区"},{"code":"150206","name":"白云鄂博矿区"},{"code":"150207","name":"九原区"},{"code":"150221","name":"土默特右旗"},{"code":"150222","name":"固阳县"},{"code":"150223","name":"达尔罕茂明安联合旗"},{"code":"150271","name":"包头稀土高新技术产业开发区"}]},{"code":"1503","name":"乌海市","children":[{"code":"150302","name":"海勃湾区"},{"code":"150303","name":"海南区"},{"code":"150304","name":"乌达区"}]},{"code":"1504","name":"赤峰市","children":[{"code":"150402","name":"红山区"},{"code":"150403","name":"元宝山区"},{"code":"150404","name":"松山区"},{"code":"150421","name":"阿鲁科尔沁旗"},{"code":"150422","name":"巴林左旗"},{"code":"150423","name":"巴林右旗"},{"code":"150424","name":"林西县"},{"code":"150425","name":"克什克腾旗"},{"code":"150426","name":"翁牛特旗"},{"code":"150428","name":"喀喇沁旗"},{"code":"150429","name":"宁城县"},{"code":"150430","name":"敖汉旗"}]},{"code":"1505","name":"通辽市","children":[{"code":"150502","name":"科尔沁区"},{"code":"150521","name":"科尔沁左翼中旗"},{"code":"150522","name":"科尔沁左翼后旗"},{"code":"150523","name":"开鲁县"},{"code":"150524","name":"库伦旗"},{"code":"150525","name":"奈曼旗"},{"code":"150526","name":"扎鲁特旗"},{"code":"150571","name":"通辽经济技术开发区"},{"code":"150581","name":"霍林郭勒市"}]},{"code":"1506","name":"鄂尔多斯市","children":[{"code":"150602","name":"东胜区"},{"code":"150603","name":"康巴什区"},{"code":"150621","name":"达拉特旗"},{"code":"150622","name":"准格尔旗"},{"code":"150623","name":"鄂托克前旗"},{"code":"150624","name":"鄂托克旗"},{"code":"150625","name":"杭锦旗"},{"code":"150626","name":"乌审旗"},{"code":"150627","name":"伊金霍洛旗"}]},{"code":"1507","name":"呼伦贝尔市","children":[{"code":"150702","name":"海拉尔区"},{"code":"150703","name":"扎赉诺尔区"},{"code":"150721","name":"阿荣旗"},{"code":"150722","name":"莫力达瓦达斡尔族自治旗"},{"code":"150723","name":"鄂伦春自治旗"},{"code":"150724","name":"鄂温克族自治旗"},{"code":"150725","name":"陈巴尔虎旗"},{"code":"150726","name":"新巴尔虎左旗"},{"code":"150727","name":"新巴尔虎右旗"},{"code":"150781","name":"满洲里市"},{"code":"150782","name":"牙克石市"},{"code":"150783","name":"扎兰屯市"},{"code":"150784","name":"额尔古纳市"},{"code":"150785","name":"根河市"}]},{"code":"1508","name":"巴彦淖尔市","children":[{"code":"150802","name":"临河区"},{"code":"150821","name":"五原县"},{"code":"150822","name":"磴口县"},{"code":"150823","name":"乌拉特前旗"},{"code":"150824","name":"乌拉特中旗"},{"code":"150825","name":"乌拉特后旗"},{"code":"150826","name":"杭锦后旗"}]},{"code":"1509","name":"乌兰察布市","children":[{"code":"150902","name":"集宁区"},{"code":"150921","name":"卓资县"},{"code":"150922","name":"化德县"},{"code":"150923","name":"商都县"},{"code":"150924","name":"兴和县"},{"code":"150925","name":"凉城县"},{"code":"150926","name":"察哈尔右翼前旗"},{"code":"150927","name":"察哈尔右翼中旗"},{"code":"150928","name":"察哈尔右翼后旗"},{"code":"150929","name":"四子王旗"},{"code":"150981","name":"丰镇市"}]},{"code":"1522","name":"兴安盟","children":[{"code":"152201","name":"乌兰浩特市"},{"code":"152202","name":"阿尔山市"},{"code":"152221","name":"科尔沁右翼前旗"},{"code":"152222","name":"科尔沁右翼中旗"},{"code":"152223","name":"扎赉特旗"},{"code":"152224","name":"突泉县"}]},{"code":"1525","name":"锡林郭勒盟","children":[{"code":"152501","name":"二连浩特市"},{"code":"152502","name":"锡林浩特市"},{"code":"152522","name":"阿巴嘎旗"},{"code":"152523","name":"苏尼特左旗"},{"code":"152524","name":"苏尼特右旗"},{"code":"152525","name":"东乌珠穆沁旗"},{"code":"152526","name":"西乌珠穆沁旗"},{"code":"152527","name":"太仆寺旗"},{"code":"152528","name":"镶黄旗"},{"code":"152529","name":"正镶白旗"},{"code":"152530","name":"正蓝旗"},{"code":"152531","name":"多伦县"},{"code":"152571","name":"乌拉盖管委会"}]},{"code":"1529","name":"阿拉善盟","children":[{"code":"152921","name":"阿拉善左旗"},{"code":"152922","name":"阿拉善右旗"},{"code":"152923","name":"额济纳旗"},{"code":"152971","name":"内蒙古阿拉善经济开发区"}]}]},{"code":"21","name":"辽宁省","children":[{"code":"2101","name":"沈阳市","children":[{"code":"210102","name":"和平区"},{"code":"210103","name":"沈河区"},{"code":"210104","name":"大东区"},{"code":"210105","name":"皇姑区"},{"code":"210106","name":"铁西区"},{"code":"210111","name":"苏家屯区"},{"code":"210112","name":"浑南区"},{"code":"210113","name":"沈北新区"},{"code":"210114","name":"于洪区"},{"code":"210115","name":"辽中区"},{"code":"210123","name":"康平县"},{"code":"210124","name":"法库县"},{"code":"210181","name":"新民市"}]},{"code":"2102","name":"大连市","children":[{"code":"210202","name":"中山区"},{"code":"210203","name":"西岗区"},{"code":"210204","name":"沙河口区"},{"code":"210211","name":"甘井子区"},{"code":"210212","name":"旅顺口区"},{"code":"210213","name":"金州区"},{"code":"210214","name":"普兰店区"},{"code":"210224","name":"长海县"},{"code":"210281","name":"瓦房店市"},{"code":"210283","name":"庄河市"}]},{"code":"2103","name":"鞍山市","children":[{"code":"210302","name":"铁东区"},{"code":"210303","name":"铁西区"},{"code":"210304","name":"立山区"},{"code":"210311","name":"千山区"},{"code":"210321","name":"台安县"},{"code":"210323","name":"岫岩满族自治县"},{"code":"210381","name":"海城市"}]},{"code":"2104","name":"抚顺市","children":[{"code":"210402","name":"新抚区"},{"code":"210403","name":"东洲区"},{"code":"210404","name":"望花区"},{"code":"210411","name":"顺城区"},{"code":"210421","name":"抚顺县"},{"code":"210422","name":"新宾满族自治县"},{"code":"210423","name":"清原满族自治县"}]},{"code":"2105","name":"本溪市","children":[{"code":"210502","name":"平山区"},{"code":"210503","name":"溪湖区"},{"code":"210504","name":"明山区"},{"code":"210505","name":"南芬区"},{"code":"210521","name":"本溪满族自治县"},{"code":"210522","name":"桓仁满族自治县"}]},{"code":"2106","name":"丹东市","children":[{"code":"210602","name":"元宝区"},{"code":"210603","name":"振兴区"},{"code":"210604","name":"振安区"},{"code":"210624","name":"宽甸满族自治县"},{"code":"210681","name":"东港市"},{"code":"210682","name":"凤城市"}]},{"code":"2107","name":"锦州市","children":[{"code":"210702","name":"古塔区"},{"code":"210703","name":"凌河区"},{"code":"210711","name":"太和区"},{"code":"210726","name":"黑山县"},{"code":"210727","name":"义县"},{"code":"210781","name":"凌海市"},{"code":"210782","name":"北镇市"}]},{"code":"2108","name":"营口市","children":[{"code":"210802","name":"站前区"},{"code":"210803","name":"西市区"},{"code":"210804","name":"鲅鱼圈区"},{"code":"210811","name":"老边区"},{"code":"210881","name":"盖州市"},{"code":"210882","name":"大石桥市"}]},{"code":"2109","name":"阜新市","children":[{"code":"210902","name":"海州区"},{"code":"210903","name":"新邱区"},{"code":"210904","name":"太平区"},{"code":"210905","name":"清河门区"},{"code":"210911","name":"细河区"},{"code":"210921","name":"阜新蒙古族自治县"},{"code":"210922","name":"彰武县"}]},{"code":"2110","name":"辽阳市","children":[{"code":"211002","name":"白塔区"},{"code":"211003","name":"文圣区"},{"code":"211004","name":"宏伟区"},{"code":"211005","name":"弓长岭区"},{"code":"211011","name":"太子河区"},{"code":"211021","name":"辽阳县"},{"code":"211081","name":"灯塔市"}]},{"code":"2111","name":"盘锦市","children":[{"code":"211102","name":"双台子区"},{"code":"211103","name":"兴隆台区"},{"code":"211104","name":"大洼区"},{"code":"211122","name":"盘山县"}]},{"code":"2112","name":"铁岭市","children":[{"code":"211202","name":"银州区"},{"code":"211204","name":"清河区"},{"code":"211221","name":"铁岭县"},{"code":"211223","name":"西丰县"},{"code":"211224","name":"昌图县"},{"code":"211281","name":"调兵山市"},{"code":"211282","name":"开原市"}]},{"code":"2113","name":"朝阳市","children":[{"code":"211302","name":"双塔区"},{"code":"211303","name":"龙城区"},{"code":"211321","name":"朝阳县"},{"code":"211322","name":"建平县"},{"code":"211324","name":"喀喇沁左翼蒙古族自治县"},{"code":"211381","name":"北票市"},{"code":"211382","name":"凌源市"}]},{"code":"2114","name":"葫芦岛市","children":[{"code":"211402","name":"连山区"},{"code":"211403","name":"龙港区"},{"code":"211404","name":"南票区"},{"code":"211421","name":"绥中县"},{"code":"211422","name":"建昌县"},{"code":"211481","name":"兴城市"}]}]},{"code":"22","name":"吉林省","children":[{"code":"2201","name":"长春市","children":[{"code":"220102","name":"南关区"},{"code":"220103","name":"宽城区"},{"code":"220104","name":"朝阳区"},{"code":"220105","name":"二道区"},{"code":"220106","name":"绿园区"},{"code":"220112","name":"双阳区"},{"code":"220113","name":"九台区"},{"code":"220122","name":"农安县"},{"code":"220171","name":"长春经济技术开发区"},{"code":"220172","name":"长春净月高新技术产业开发区"},{"code":"220173","name":"长春高新技术产业开发区"},{"code":"220174","name":"长春汽车经济技术开发区"},{"code":"220182","name":"榆树市"},{"code":"220183","name":"德惠市"},{"code":"220184","name":"公主岭市"}]},{"code":"2202","name":"吉林市","children":[{"code":"220202","name":"昌邑区"},{"code":"220203","name":"龙潭区"},{"code":"220204","name":"船营区"},{"code":"220211","name":"丰满区"},{"code":"220221","name":"永吉县"},{"code":"220271","name":"吉林经济开发区"},{"code":"220272","name":"吉林高新技术产业开发区"},{"code":"220273","name":"吉林中国新加坡食品区"},{"code":"220281","name":"蛟河市"},{"code":"220282","name":"桦甸市"},{"code":"220283","name":"舒兰市"},{"code":"220284","name":"磐石市"}]},{"code":"2203","name":"四平市","children":[{"code":"220302","name":"铁西区"},{"code":"220303","name":"铁东区"},{"code":"220322","name":"梨树县"},{"code":"220323","name":"伊通满族自治县"},{"code":"220382","name":"双辽市"}]},{"code":"2204","name":"辽源市","children":[{"code":"220402","name":"龙山区"},{"code":"220403","name":"西安区"},{"code":"220421","name":"东丰县"},{"code":"220422","name":"东辽县"}]},{"code":"2205","name":"通化市","children":[{"code":"220502","name":"东昌区"},{"code":"220503","name":"二道江区"},{"code":"220521","name":"通化县"},{"code":"220523","name":"辉南县"},{"code":"220524","name":"柳河县"},{"code":"220581","name":"梅河口市"},{"code":"220582","name":"集安市"}]},{"code":"2206","name":"白山市","children":[{"code":"220602","name":"浑江区"},{"code":"220605","name":"江源区"},{"code":"220621","name":"抚松县"},{"code":"220622","name":"靖宇县"},{"code":"220623","name":"长白朝鲜族自治县"},{"code":"220681","name":"临江市"}]},{"code":"2207","name":"松原市","children":[{"code":"220702","name":"宁江区"},{"code":"220721","name":"前郭尔罗斯蒙古族自治县"},{"code":"220722","name":"长岭县"},{"code":"220723","name":"乾安县"},{"code":"220771","name":"吉林松原经济开发区"},{"code":"220781","name":"扶余市"}]},{"code":"2208","name":"白城市","children":[{"code":"220802","name":"洮北区"},{"code":"220821","name":"镇赉县"},{"code":"220822","name":"通榆县"},{"code":"220871","name":"吉林白城经济开发区"},{"code":"220881","name":"洮南市"},{"code":"220882","name":"大安市"}]},{"code":"2224","name":"延边朝鲜族自治州","children":[{"code":"222401","name":"延吉市"},{"code":"222402","name":"图们市"},{"code":"222403","name":"敦化市"},{"code":"222404","name":"珲春市"},{"code":"222405","name":"龙井市"},{"code":"222406","name":"和龙市"},{"code":"222424","name":"汪清县"},{"code":"222426","name":"安图县"}]}]},{"code":"23","name":"黑龙江省","children":[{"code":"2301","name":"哈尔滨市","children":[{"code":"230102","name":"道里区"},{"code":"230103","name":"南岗区"},{"code":"230104","name":"道外区"},{"code":"230108","name":"平房区"},{"code":"230109","name":"松北区"},{"code":"230110","name":"香坊区"},{"code":"230111","name":"呼兰区"},{"code":"230112","name":"阿城区"},{"code":"230113","name":"双城区"},{"code":"230123","name":"依兰县"},{"code":"230124","name":"方正县"},{"code":"230125","name":"宾县"},{"code":"230126","name":"巴彦县"},{"code":"230127","name":"木兰县"},{"code":"230128","name":"通河县"},{"code":"230129","name":"延寿县"},{"code":"230183","name":"尚志市"},{"code":"230184","name":"五常市"}]},{"code":"2302","name":"齐齐哈尔市","children":[{"code":"230202","name":"龙沙区"},{"code":"230203","name":"建华区"},{"code":"230204","name":"铁锋区"},{"code":"230205","name":"昂昂溪区"},{"code":"230206","name":"富拉尔基区"},{"code":"230207","name":"碾子山区"},{"code":"230208","name":"梅里斯达斡尔族区"},{"code":"230221","name":"龙江县"},{"code":"230223","name":"依安县"},{"code":"230224","name":"泰来县"},{"code":"230225","name":"甘南县"},{"code":"230227","name":"富裕县"},{"code":"230229","name":"克山县"},{"code":"230230","name":"克东县"},{"code":"230231","name":"拜泉县"},{"code":"230281","name":"讷河市"}]},{"code":"2303","name":"鸡西市","children":[{"code":"230302","name":"鸡冠区"},{"code":"230303","name":"恒山区"},{"code":"230304","name":"滴道区"},{"code":"230305","name":"梨树区"},{"code":"230306","name":"城子河区"},{"code":"230307","name":"麻山区"},{"code":"230321","name":"鸡东县"},{"code":"230381","name":"虎林市"},{"code":"230382","name":"密山市"}]},{"code":"2304","name":"鹤岗市","children":[{"code":"230402","name":"向阳区"},{"code":"230403","name":"工农区"},{"code":"230404","name":"南山区"},{"code":"230405","name":"兴安区"},{"code":"230406","name":"东山区"},{"code":"230407","name":"兴山区"},{"code":"230421","name":"萝北县"},{"code":"230422","name":"绥滨县"}]},{"code":"2305","name":"双鸭山市","children":[{"code":"230502","name":"尖山区"},{"code":"230503","name":"岭东区"},{"code":"230505","name":"四方台区"},{"code":"230506","name":"宝山区"},{"code":"230521","name":"集贤县"},{"code":"230522","name":"友谊县"},{"code":"230523","name":"宝清县"},{"code":"230524","name":"饶河县"}]},{"code":"2306","name":"大庆市","children":[{"code":"230602","name":"萨尔图区"},{"code":"230603","name":"龙凤区"},{"code":"230604","name":"让胡路区"},{"code":"230605","name":"红岗区"},{"code":"230606","name":"大同区"},{"code":"230621","name":"肇州县"},{"code":"230622","name":"肇源县"},{"code":"230623","name":"林甸县"},{"code":"230624","name":"杜尔伯特蒙古族自治县"},{"code":"230671","name":"大庆高新技术产业开发区"}]},{"code":"2307","name":"伊春市","children":[{"code":"230717","name":"伊美区"},{"code":"230718","name":"乌翠区"},{"code":"230719","name":"友好区"},{"code":"230722","name":"嘉荫县"},{"code":"230723","name":"汤旺县"},{"code":"230724","name":"丰林县"},{"code":"230725","name":"大箐山县"},{"code":"230726","name":"南岔县"},{"code":"230751","name":"金林区"},{"code":"230781","name":"铁力市"}]},{"code":"2308","name":"佳木斯市","children":[{"code":"230803","name":"向阳区"},{"code":"230804","name":"前进区"},{"code":"230805","name":"东风区"},{"code":"230811","name":"郊区"},{"code":"230822","name":"桦南县"},{"code":"230826","name":"桦川县"},{"code":"230828","name":"汤原县"},{"code":"230881","name":"同江市"},{"code":"230882","name":"富锦市"},{"code":"230883","name":"抚远市"}]},{"code":"2309","name":"七台河市","children":[{"code":"230902","name":"新兴区"},{"code":"230903","name":"桃山区"},{"code":"230904","name":"茄子河区"},{"code":"230921","name":"勃利县"}]},{"code":"2310","name":"牡丹江市","children":[{"code":"231002","name":"东安区"},{"code":"231003","name":"阳明区"},{"code":"231004","name":"爱民区"},{"code":"231005","name":"西安区"},{"code":"231025","name":"林口县"},{"code":"231071","name":"牡丹江经济技术开发区"},{"code":"231081","name":"绥芬河市"},{"code":"231083","name":"海林市"},{"code":"231084","name":"宁安市"},{"code":"231085","name":"穆棱市"},{"code":"231086","name":"东宁市"}]},{"code":"2311","name":"黑河市","children":[{"code":"231102","name":"爱辉区"},{"code":"231123","name":"逊克县"},{"code":"231124","name":"孙吴县"},{"code":"231181","name":"北安市"},{"code":"231182","name":"五大连池市"},{"code":"231183","name":"嫩江市"}]},{"code":"2312","name":"绥化市","children":[{"code":"231202","name":"北林区"},{"code":"231221","name":"望奎县"},{"code":"231222","name":"兰西县"},{"code":"231223","name":"青冈县"},{"code":"231224","name":"庆安县"},{"code":"231225","name":"明水县"},{"code":"231226","name":"绥棱县"},{"code":"231281","name":"安达市"},{"code":"231282","name":"肇东市"},{"code":"231283","name":"海伦市"}]},{"code":"2327","name":"大兴安岭地区","children":[{"code":"232701","name":"漠河市"},{"code":"232721","name":"呼玛县"},{"code":"232722","name":"塔河县"},{"code":"232761","name":"加格达奇区"},{"code":"232762","name":"松岭区"},{"code":"232763","name":"新林区"},{"code":"232764","name":"呼中区"}]}]},{"code":"31","name":"上海市","children":[{"code":"3101","name":"市辖区","children":[{"code":"310101","name":"黄浦区"},{"code":"310104","name":"徐汇区"},{"code":"310105","name":"长宁区"},{"code":"310106","name":"静安区"},{"code":"310107","name":"普陀区"},{"code":"310109","name":"虹口区"},{"code":"310110","name":"杨浦区"},{"code":"310112","name":"闵行区"},{"code":"310113","name":"宝山区"},{"code":"310114","name":"嘉定区"},{"code":"310115","name":"浦东新区"},{"code":"310116","name":"金山区"},{"code":"310117","name":"松江区"},{"code":"310118","name":"青浦区"},{"code":"310120","name":"奉贤区"},{"code":"310151","name":"崇明区"}]}]},{"code":"32","name":"江苏省","children":[{"code":"3201","name":"南京市","children":[{"code":"320102","name":"玄武区"},{"code":"320104","name":"秦淮区"},{"code":"320105","name":"建邺区"},{"code":"320106","name":"鼓楼区"},{"code":"320111","name":"浦口区"},{"code":"320113","name":"栖霞区"},{"code":"320114","name":"雨花台区"},{"code":"320115","name":"江宁区"},{"code":"320116","name":"六合区"},{"code":"320117","name":"溧水区"},{"code":"320118","name":"高淳区"}]},{"code":"3202","name":"无锡市","children":[{"code":"320205","name":"锡山区"},{"code":"320206","name":"惠山区"},{"code":"320211","name":"滨湖区"},{"code":"320213","name":"梁溪区"},{"code":"320214","name":"新吴区"},{"code":"320281","name":"江阴市"},{"code":"320282","name":"宜兴市"}]},{"code":"3203","name":"徐州市","children":[{"code":"320302","name":"鼓楼区"},{"code":"320303","name":"云龙区"},{"code":"320305","name":"贾汪区"},{"code":"320311","name":"泉山区"},{"code":"320312","name":"铜山区"},{"code":"320321","name":"丰县"},{"code":"320322","name":"沛县"},{"code":"320324","name":"睢宁县"},{"code":"320371","name":"徐州经济技术开发区"},{"code":"320381","name":"新沂市"},{"code":"320382","name":"邳州市"}]},{"code":"3204","name":"常州市","children":[{"code":"320402","name":"天宁区"},{"code":"320404","name":"钟楼区"},{"code":"320411","name":"新北区"},{"code":"320412","name":"武进区"},{"code":"320413","name":"金坛区"},{"code":"320481","name":"溧阳市"}]},{"code":"3205","name":"苏州市","children":[{"code":"320505","name":"虎丘区"},{"code":"320506","name":"吴中区"},{"code":"320507","name":"相城区"},{"code":"320508","name":"姑苏区"},{"code":"320509","name":"吴江区"},{"code":"320571","name":"苏州工业园区"},{"code":"320581","name":"常熟市"},{"code":"320582","name":"张家港市"},{"code":"320583","name":"昆山市"},{"code":"320585","name":"太仓市"}]},{"code":"3206","name":"南通市","children":[{"code":"320602","name":"崇川区"},{"code":"320611","name":"港闸区"},{"code":"320612","name":"通州区"},{"code":"320623","name":"如东县"},{"code":"320671","name":"南通经济技术开发区"},{"code":"320681","name":"启东市"},{"code":"320682","name":"如皋市"},{"code":"320684","name":"海门市"},{"code":"320685","name":"海安市"}]},{"code":"3207","name":"连云港市","children":[{"code":"320703","name":"连云区"},{"code":"320706","name":"海州区"},{"code":"320707","name":"赣榆区"},{"code":"320722","name":"东海县"},{"code":"320723","name":"灌云县"},{"code":"320724","name":"灌南县"},{"code":"320771","name":"连云港经济技术开发区"},{"code":"320772","name":"连云港高新技术产业开发区"}]},{"code":"3208","name":"淮安市","children":[{"code":"320803","name":"淮安区"},{"code":"320804","name":"淮阴区"},{"code":"320812","name":"清江浦区"},{"code":"320813","name":"洪泽区"},{"code":"320826","name":"涟水县"},{"code":"320830","name":"盱眙县"},{"code":"320831","name":"金湖县"},{"code":"320871","name":"淮安经济技术开发区"}]},{"code":"3209","name":"盐城市","children":[{"code":"320902","name":"亭湖区"},{"code":"320903","name":"盐都区"},{"code":"320904","name":"大丰区"},{"code":"320921","name":"响水县"},{"code":"320922","name":"滨海县"},{"code":"320923","name":"阜宁县"},{"code":"320924","name":"射阳县"},{"code":"320925","name":"建湖县"},{"code":"320971","name":"盐城经济技术开发区"},{"code":"320981","name":"东台市"}]},{"code":"3210","name":"扬州市","children":[{"code":"321002","name":"广陵区"},{"code":"321003","name":"邗江区"},{"code":"321012","name":"江都区"},{"code":"321023","name":"宝应县"},{"code":"321071","name":"扬州经济技术开发区"},{"code":"321081","name":"仪征市"},{"code":"321084","name":"高邮市"}]},{"code":"3211","name":"镇江市","children":[{"code":"321102","name":"京口区"},{"code":"321111","name":"润州区"},{"code":"321112","name":"丹徒区"},{"code":"321171","name":"镇江新区"},{"code":"321181","name":"丹阳市"},{"code":"321182","name":"扬中市"},{"code":"321183","name":"句容市"}]},{"code":"3212","name":"泰州市","children":[{"code":"321202","name":"海陵区"},{"code":"321203","name":"高港区"},{"code":"321204","name":"姜堰区"},{"code":"321271","name":"泰州医药高新技术产业开发区"},{"code":"321281","name":"兴化市"},{"code":"321282","name":"靖江市"},{"code":"321283","name":"泰兴市"}]},{"code":"3213","name":"宿迁市","children":[{"code":"321302","name":"宿城区"},{"code":"321311","name":"宿豫区"},{"code":"321322","name":"沭阳县"},{"code":"321323","name":"泗阳县"},{"code":"321324","name":"泗洪县"},{"code":"321371","name":"宿迁经济技术开发区"}]}]},{"code":"33","name":"浙江省","children":[{"code":"3301","name":"杭州市","children":[{"code":"330102","name":"上城区"},{"code":"330103","name":"下城区"},{"code":"330104","name":"江干区"},{"code":"330105","name":"拱墅区"},{"code":"330106","name":"西湖区"},{"code":"330108","name":"滨江区"},{"code":"330109","name":"萧山区"},{"code":"330110","name":"余杭区"},{"code":"330111","name":"富阳区"},{"code":"330112","name":"临安区"},{"code":"330122","name":"桐庐县"},{"code":"330127","name":"淳安县"},{"code":"330182","name":"建德市"}]},{"code":"3302","name":"宁波市","children":[{"code":"330203","name":"海曙区"},{"code":"330205","name":"江北区"},{"code":"330206","name":"北仑区"},{"code":"330211","name":"镇海区"},{"code":"330212","name":"鄞州区"},{"code":"330213","name":"奉化区"},{"code":"330225","name":"象山县"},{"code":"330226","name":"宁海县"},{"code":"330281","name":"余姚市"},{"code":"330282","name":"慈溪市"}]},{"code":"3303","name":"温州市","children":[{"code":"330302","name":"鹿城区"},{"code":"330303","name":"龙湾区"},{"code":"330304","name":"瓯海区"},{"code":"330305","name":"洞头区"},{"code":"330324","name":"永嘉县"},{"code":"330326","name":"平阳县"},{"code":"330327","name":"苍南县"},{"code":"330328","name":"文成县"},{"code":"330329","name":"泰顺县"},{"code":"330371","name":"温州经济技术开发区"},{"code":"330381","name":"瑞安市"},{"code":"330382","name":"乐清市"},{"code":"330383","name":"龙港市"}]},{"code":"3304","name":"嘉兴市","children":[{"code":"330402","name":"南湖区"},{"code":"330411","name":"秀洲区"},{"code":"330421","name":"嘉善县"},{"code":"330424","name":"海盐县"},{"code":"330481","name":"海宁市"},{"code":"330482","name":"平湖市"},{"code":"330483","name":"桐乡市"}]},{"code":"3305","name":"湖州市","children":[{"code":"330502","name":"吴兴区"},{"code":"330503","name":"南浔区"},{"code":"330521","name":"德清县"},{"code":"330522","name":"长兴县"},{"code":"330523","name":"安吉县"}]},{"code":"3306","name":"绍兴市","children":[{"code":"330602","name":"越城区"},{"code":"330603","name":"柯桥区"},{"code":"330604","name":"上虞区"},{"code":"330624","name":"新昌县"},{"code":"330681","name":"诸暨市"},{"code":"330683","name":"嵊州市"}]},{"code":"3307","name":"金华市","children":[{"code":"330702","name":"婺城区"},{"code":"330703","name":"金东区"},{"code":"330723","name":"武义县"},{"code":"330726","name":"浦江县"},{"code":"330727","name":"磐安县"},{"code":"330781","name":"兰溪市"},{"code":"330782","name":"义乌市"},{"code":"330783","name":"东阳市"},{"code":"330784","name":"永康市"}]},{"code":"3308","name":"衢州市","children":[{"code":"330802","name":"柯城区"},{"code":"330803","name":"衢江区"},{"code":"330822","name":"常山县"},{"code":"330824","name":"开化县"},{"code":"330825","name":"龙游县"},{"code":"330881","name":"江山市"}]},{"code":"3309","name":"舟山市","children":[{"code":"330902","name":"定海区"},{"code":"330903","name":"普陀区"},{"code":"330921","name":"岱山县"},{"code":"330922","name":"嵊泗县"}]},{"code":"3310","name":"台州市","children":[{"code":"331002","name":"椒江区"},{"code":"331003","name":"黄岩区"},{"code":"331004","name":"路桥区"},{"code":"331022","name":"三门县"},{"code":"331023","name":"天台县"},{"code":"331024","name":"仙居县"},{"code":"331081","name":"温岭市"},{"code":"331082","name":"临海市"},{"code":"331083","name":"玉环市"}]},{"code":"3311","name":"丽水市","children":[{"code":"331102","name":"莲都区"},{"code":"331121","name":"青田县"},{"code":"331122","name":"缙云县"},{"code":"331123","name":"遂昌县"},{"code":"331124","name":"松阳县"},{"code":"331125","name":"云和县"},{"code":"331126","name":"庆元县"},{"code":"331127","name":"景宁畲族自治县"},{"code":"331181","name":"龙泉市"}]}]},{"code":"34","name":"安徽省","children":[{"code":"3401","name":"合肥市","children":[{"code":"340102","name":"瑶海区"},{"code":"340103","name":"庐阳区"},{"code":"340104","name":"蜀山区"},{"code":"340111","name":"包河区"},{"code":"340121","name":"长丰县"},{"code":"340122","name":"肥东县"},{"code":"340123","name":"肥西县"},{"code":"340124","name":"庐江县"},{"code":"340171","name":"合肥高新技术产业开发区"},{"code":"340172","name":"合肥经济技术开发区"},{"code":"340173","name":"合肥新站高新技术产业开发区"},{"code":"340181","name":"巢湖市"}]},{"code":"3402","name":"芜湖市","children":[{"code":"340202","name":"镜湖区"},{"code":"340203","name":"弋江区"},{"code":"340207","name":"鸠江区"},{"code":"340208","name":"三山区"},{"code":"340221","name":"芜湖县"},{"code":"340222","name":"繁昌县"},{"code":"340223","name":"南陵县"},{"code":"340271","name":"芜湖经济技术开发区"},{"code":"340272","name":"安徽芜湖长江大桥经济开发区"},{"code":"340281","name":"无为市"}]},{"code":"3403","name":"蚌埠市","children":[{"code":"340302","name":"龙子湖区"},{"code":"340303","name":"蚌山区"},{"code":"340304","name":"禹会区"},{"code":"340311","name":"淮上区"},{"code":"340321","name":"怀远县"},{"code":"340322","name":"五河县"},{"code":"340323","name":"固镇县"},{"code":"340371","name":"蚌埠市高新技术开发区"},{"code":"340372","name":"蚌埠市经济开发区"}]},{"code":"3404","name":"淮南市","children":[{"code":"340402","name":"大通区"},{"code":"340403","name":"田家庵区"},{"code":"340404","name":"谢家集区"},{"code":"340405","name":"八公山区"},{"code":"340406","name":"潘集区"},{"code":"340421","name":"凤台县"},{"code":"340422","name":"寿县"}]},{"code":"3405","name":"马鞍山市","children":[{"code":"340503","name":"花山区"},{"code":"340504","name":"雨山区"},{"code":"340506","name":"博望区"},{"code":"340521","name":"当涂县"},{"code":"340522","name":"含山县"},{"code":"340523","name":"和县"}]},{"code":"3406","name":"淮北市","children":[{"code":"340602","name":"杜集区"},{"code":"340603","name":"相山区"},{"code":"340604","name":"烈山区"},{"code":"340621","name":"濉溪县"}]},{"code":"3407","name":"铜陵市","children":[{"code":"340705","name":"铜官区"},{"code":"340706","name":"义安区"},{"code":"340711","name":"郊区"},{"code":"340722","name":"枞阳县"}]},{"code":"3408","name":"安庆市","children":[{"code":"340802","name":"迎江区"},{"code":"340803","name":"大观区"},{"code":"340811","name":"宜秀区"},{"code":"340822","name":"怀宁县"},{"code":"340825","name":"太湖县"},{"code":"340826","name":"宿松县"},{"code":"340827","name":"望江县"},{"code":"340828","name":"岳西县"},{"code":"340871","name":"安徽安庆经济开发区"},{"code":"340881","name":"桐城市"},{"code":"340882","name":"潜山市"}]},{"code":"3410","name":"黄山市","children":[{"code":"341002","name":"屯溪区"},{"code":"341003","name":"黄山区"},{"code":"341004","name":"徽州区"},{"code":"341021","name":"歙县"},{"code":"341022","name":"休宁县"},{"code":"341023","name":"黟县"},{"code":"341024","name":"祁门县"}]},{"code":"3411","name":"滁州市","children":[{"code":"341102","name":"琅琊区"},{"code":"341103","name":"南谯区"},{"code":"341122","name":"来安县"},{"code":"341124","name":"全椒县"},{"code":"341125","name":"定远县"},{"code":"341126","name":"凤阳县"},{"code":"341171","name":"苏滁现代产业园"},{"code":"341172","name":"滁州经济技术开发区"},{"code":"341181","name":"天长市"},{"code":"341182","name":"明光市"}]},{"code":"3412","name":"阜阳市","children":[{"code":"341202","name":"颍州区"},{"code":"341203","name":"颍东区"},{"code":"341204","name":"颍泉区"},{"code":"341221","name":"临泉县"},{"code":"341222","name":"太和县"},{"code":"341225","name":"阜南县"},{"code":"341226","name":"颍上县"},{"code":"341271","name":"阜阳合肥现代产业园区"},{"code":"341272","name":"阜阳经济技术开发区"},{"code":"341282","name":"界首市"}]},{"code":"3413","name":"宿州市","children":[{"code":"341302","name":"埇桥区"},{"code":"341321","name":"砀山县"},{"code":"341322","name":"萧县"},{"code":"341323","name":"灵璧县"},{"code":"341324","name":"泗县"},{"code":"341371","name":"宿州马鞍山现代产业园区"},{"code":"341372","name":"宿州经济技术开发区"}]},{"code":"3415","name":"六安市","children":[{"code":"341502","name":"金安区"},{"code":"341503","name":"裕安区"},{"code":"341504","name":"叶集区"},{"code":"341522","name":"霍邱县"},{"code":"341523","name":"舒城县"},{"code":"341524","name":"金寨县"},{"code":"341525","name":"霍山县"}]},{"code":"3416","name":"亳州市","children":[{"code":"341602","name":"谯城区"},{"code":"341621","name":"涡阳县"},{"code":"341622","name":"蒙城县"},{"code":"341623","name":"利辛县"}]},{"code":"3417","name":"池州市","children":[{"code":"341702","name":"贵池区"},{"code":"341721","name":"东至县"},{"code":"341722","name":"石台县"},{"code":"341723","name":"青阳县"}]},{"code":"3418","name":"宣城市","children":[{"code":"341802","name":"宣州区"},{"code":"341821","name":"郎溪县"},{"code":"341823","name":"泾县"},{"code":"341824","name":"绩溪县"},{"code":"341825","name":"旌德县"},{"code":"341871","name":"宣城市经济开发区"},{"code":"341881","name":"宁国市"},{"code":"341882","name":"广德市"}]}]},{"code":"35","name":"福建省","children":[{"code":"3501","name":"福州市","children":[{"code":"350102","name":"鼓楼区"},{"code":"350103","name":"台江区"},{"code":"350104","name":"仓山区"},{"code":"350105","name":"马尾区"},{"code":"350111","name":"晋安区"},{"code":"350112","name":"长乐区"},{"code":"350121","name":"闽侯县"},{"code":"350122","name":"连江县"},{"code":"350123","name":"罗源县"},{"code":"350124","name":"闽清县"},{"code":"350125","name":"永泰县"},{"code":"350128","name":"平潭县"},{"code":"350181","name":"福清市"}]},{"code":"3502","name":"厦门市","children":[{"code":"350203","name":"思明区"},{"code":"350205","name":"海沧区"},{"code":"350206","name":"湖里区"},{"code":"350211","name":"集美区"},{"code":"350212","name":"同安区"},{"code":"350213","name":"翔安区"}]},{"code":"3503","name":"莆田市","children":[{"code":"350302","name":"城厢区"},{"code":"350303","name":"涵江区"},{"code":"350304","name":"荔城区"},{"code":"350305","name":"秀屿区"},{"code":"350322","name":"仙游县"}]},{"code":"3504","name":"三明市","children":[{"code":"350402","name":"梅列区"},{"code":"350403","name":"三元区"},{"code":"350421","name":"明溪县"},{"code":"350423","name":"清流县"},{"code":"350424","name":"宁化县"},{"code":"350425","name":"大田县"},{"code":"350426","name":"尤溪县"},{"code":"350427","name":"沙县"},{"code":"350428","name":"将乐县"},{"code":"350429","name":"泰宁县"},{"code":"350430","name":"建宁县"},{"code":"350481","name":"永安市"}]},{"code":"3505","name":"泉州市","children":[{"code":"350502","name":"鲤城区"},{"code":"350503","name":"丰泽区"},{"code":"350504","name":"洛江区"},{"code":"350505","name":"泉港区"},{"code":"350521","name":"惠安县"},{"code":"350524","name":"安溪县"},{"code":"350525","name":"永春县"},{"code":"350526","name":"德化县"},{"code":"350527","name":"金门县"},{"code":"350581","name":"石狮市"},{"code":"350582","name":"晋江市"},{"code":"350583","name":"南安市"}]},{"code":"3506","name":"漳州市","children":[{"code":"350602","name":"芗城区"},{"code":"350603","name":"龙文区"},{"code":"350622","name":"云霄县"},{"code":"350623","name":"漳浦县"},{"code":"350624","name":"诏安县"},{"code":"350625","name":"长泰县"},{"code":"350626","name":"东山县"},{"code":"350627","name":"南靖县"},{"code":"350628","name":"平和县"},{"code":"350629","name":"华安县"},{"code":"350681","name":"龙海市"}]},{"code":"3507","name":"南平市","children":[{"code":"350702","name":"延平区"},{"code":"350703","name":"建阳区"},{"code":"350721","name":"顺昌县"},{"code":"350722","name":"浦城县"},{"code":"350723","name":"光泽县"},{"code":"350724","name":"松溪县"},{"code":"350725","name":"政和县"},{"code":"350781","name":"邵武市"},{"code":"350782","name":"武夷山市"},{"code":"350783","name":"建瓯市"}]},{"code":"3508","name":"龙岩市","children":[{"code":"350802","name":"新罗区"},{"code":"350803","name":"永定区"},{"code":"350821","name":"长汀县"},{"code":"350823","name":"上杭县"},{"code":"350824","name":"武平县"},{"code":"350825","name":"连城县"},{"code":"350881","name":"漳平市"}]},{"code":"3509","name":"宁德市","children":[{"code":"350902","name":"蕉城区"},{"code":"350921","name":"霞浦县"},{"code":"350922","name":"古田县"},{"code":"350923","name":"屏南县"},{"code":"350924","name":"寿宁县"},{"code":"350925","name":"周宁县"},{"code":"350926","name":"柘荣县"},{"code":"350981","name":"福安市"},{"code":"350982","name":"福鼎市"}]}]},{"code":"36","name":"江西省","children":[{"code":"3601","name":"南昌市","children":[{"code":"360102","name":"东湖区"},{"code":"360103","name":"西湖区"},{"code":"360104","name":"青云谱区"},{"code":"360111","name":"青山湖区"},{"code":"360112","name":"新建区"},{"code":"360113","name":"红谷滩区"},{"code":"360121","name":"南昌县"},{"code":"360123","name":"安义县"},{"code":"360124","name":"进贤县"}]},{"code":"3602","name":"景德镇市","children":[{"code":"360202","name":"昌江区"},{"code":"360203","name":"珠山区"},{"code":"360222","name":"浮梁县"},{"code":"360281","name":"乐平市"}]},{"code":"3603","name":"萍乡市","children":[{"code":"360302","name":"安源区"},{"code":"360313","name":"湘东区"},{"code":"360321","name":"莲花县"},{"code":"360322","name":"上栗县"},{"code":"360323","name":"芦溪县"}]},{"code":"3604","name":"九江市","children":[{"code":"360402","name":"濂溪区"},{"code":"360403","name":"浔阳区"},{"code":"360404","name":"柴桑区"},{"code":"360423","name":"武宁县"},{"code":"360424","name":"修水县"},{"code":"360425","name":"永修县"},{"code":"360426","name":"德安县"},{"code":"360428","name":"都昌县"},{"code":"360429","name":"湖口县"},{"code":"360430","name":"彭泽县"},{"code":"360481","name":"瑞昌市"},{"code":"360482","name":"共青城市"},{"code":"360483","name":"庐山市"}]},{"code":"3605","name":"新余市","children":[{"code":"360502","name":"渝水区"},{"code":"360521","name":"分宜县"}]},{"code":"3606","name":"鹰潭市","children":[{"code":"360602","name":"月湖区"},{"code":"360603","name":"余江区"},{"code":"360681","name":"贵溪市"}]},{"code":"3607","name":"赣州市","children":[{"code":"360702","name":"章贡区"},{"code":"360703","name":"南康区"},{"code":"360704","name":"赣县区"},{"code":"360722","name":"信丰县"},{"code":"360723","name":"大余县"},{"code":"360724","name":"上犹县"},{"code":"360725","name":"崇义县"},{"code":"360726","name":"安远县"},{"code":"360728","name":"定南县"},{"code":"360729","name":"全南县"},{"code":"360730","name":"宁都县"},{"code":"360731","name":"于都县"},{"code":"360732","name":"兴国县"},{"code":"360733","name":"会昌县"},{"code":"360734","name":"寻乌县"},{"code":"360735","name":"石城县"},{"code":"360781","name":"瑞金市"},{"code":"360783","name":"龙南市"}]},{"code":"3608","name":"吉安市","children":[{"code":"360802","name":"吉州区"},{"code":"360803","name":"青原区"},{"code":"360821","name":"吉安县"},{"code":"360822","name":"吉水县"},{"code":"360823","name":"峡江县"},{"code":"360824","name":"新干县"},{"code":"360825","name":"永丰县"},{"code":"360826","name":"泰和县"},{"code":"360827","name":"遂川县"},{"code":"360828","name":"万安县"},{"code":"360829","name":"安福县"},{"code":"360830","name":"永新县"},{"code":"360881","name":"井冈山市"}]},{"code":"3609","name":"宜春市","children":[{"code":"360902","name":"袁州区"},{"code":"360921","name":"奉新县"},{"code":"360922","name":"万载县"},{"code":"360923","name":"上高县"},{"code":"360924","name":"宜丰县"},{"code":"360925","name":"靖安县"},{"code":"360926","name":"铜鼓县"},{"code":"360981","name":"丰城市"},{"code":"360982","name":"樟树市"},{"code":"360983","name":"高安市"}]},{"code":"3610","name":"抚州市","children":[{"code":"361002","name":"临川区"},{"code":"361003","name":"东乡区"},{"code":"361021","name":"南城县"},{"code":"361022","name":"黎川县"},{"code":"361023","name":"南丰县"},{"code":"361024","name":"崇仁县"},{"code":"361025","name":"乐安县"},{"code":"361026","name":"宜黄县"},{"code":"361027","name":"金溪县"},{"code":"361028","name":"资溪县"},{"code":"361030","name":"广昌县"}]},{"code":"3611","name":"上饶市","children":[{"code":"361102","name":"信州区"},{"code":"361103","name":"广丰区"},{"code":"361104","name":"广信区"},{"code":"361123","name":"玉山县"},{"code":"361124","name":"铅山县"},{"code":"361125","name":"横峰县"},{"code":"361126","name":"弋阳县"},{"code":"361127","name":"余干县"},{"code":"361128","name":"鄱阳县"},{"code":"361129","name":"万年县"},{"code":"361130","name":"婺源县"},{"code":"361181","name":"德兴市"}]}]},{"code":"37","name":"山东省","children":[{"code":"3701","name":"济南市","children":[{"code":"370102","name":"历下区"},{"code":"370103","name":"市中区"},{"code":"370104","name":"槐荫区"},{"code":"370105","name":"天桥区"},{"code":"370112","name":"历城区"},{"code":"370113","name":"长清区"},{"code":"370114","name":"章丘区"},{"code":"370115","name":"济阳区"},{"code":"370116","name":"莱芜区"},{"code":"370117","name":"钢城区"},{"code":"370124","name":"平阴县"},{"code":"370126","name":"商河县"},{"code":"370171","name":"济南高新技术产业开发区"}]},{"code":"3702","name":"青岛市","children":[{"code":"370202","name":"市南区"},{"code":"370203","name":"市北区"},{"code":"370211","name":"黄岛区"},{"code":"370212","name":"崂山区"},{"code":"370213","name":"李沧区"},{"code":"370214","name":"城阳区"},{"code":"370215","name":"即墨区"},{"code":"370271","name":"青岛高新技术产业开发区"},{"code":"370281","name":"胶州市"},{"code":"370283","name":"平度市"},{"code":"370285","name":"莱西市"}]},{"code":"3703","name":"淄博市","children":[{"code":"370302","name":"淄川区"},{"code":"370303","name":"张店区"},{"code":"370304","name":"博山区"},{"code":"370305","name":"临淄区"},{"code":"370306","name":"周村区"},{"code":"370321","name":"桓台县"},{"code":"370322","name":"高青县"},{"code":"370323","name":"沂源县"}]},{"code":"3704","name":"枣庄市","children":[{"code":"370402","name":"市中区"},{"code":"370403","name":"薛城区"},{"code":"370404","name":"峄城区"},{"code":"370405","name":"台儿庄区"},{"code":"370406","name":"山亭区"},{"code":"370481","name":"滕州市"}]},{"code":"3705","name":"东营市","children":[{"code":"370502","name":"东营区"},{"code":"370503","name":"河口区"},{"code":"370505","name":"垦利区"},{"code":"370522","name":"利津县"},{"code":"370523","name":"广饶县"},{"code":"370571","name":"东营经济技术开发区"},{"code":"370572","name":"东营港经济开发区"}]},{"code":"3706","name":"烟台市","children":[{"code":"370602","name":"芝罘区"},{"code":"370611","name":"福山区"},{"code":"370612","name":"牟平区"},{"code":"370613","name":"莱山区"},{"code":"370614","name":"蓬莱区"},{"code":"370671","name":"烟台高新技术产业开发区"},{"code":"370672","name":"烟台经济技术开发区"},{"code":"370681","name":"龙口市"},{"code":"370682","name":"莱阳市"},{"code":"370683","name":"莱州市"},{"code":"370685","name":"招远市"},{"code":"370686","name":"栖霞市"},{"code":"370687","name":"海阳市"}]},{"code":"3707","name":"潍坊市","children":[{"code":"370702","name":"潍城区"},{"code":"370703","name":"寒亭区"},{"code":"370704","name":"坊子区"},{"code":"370705","name":"奎文区"},{"code":"370724","name":"临朐县"},{"code":"370725","name":"昌乐县"},{"code":"370772","name":"潍坊滨海经济技术开发区"},{"code":"370781","name":"青州市"},{"code":"370782","name":"诸城市"},{"code":"370783","name":"寿光市"},{"code":"370784","name":"安丘市"},{"code":"370785","name":"高密市"},{"code":"370786","name":"昌邑市"}]},{"code":"3708","name":"济宁市","children":[{"code":"370811","name":"任城区"},{"code":"370812","name":"兖州区"},{"code":"370826","name":"微山县"},{"code":"370827","name":"鱼台县"},{"code":"370828","name":"金乡县"},{"code":"370829","name":"嘉祥县"},{"code":"370830","name":"汶上县"},{"code":"370831","name":"泗水县"},{"code":"370832","name":"梁山县"},{"code":"370871","name":"济宁高新技术产业开发区"},{"code":"370881","name":"曲阜市"},{"code":"370883","name":"邹城市"}]},{"code":"3709","name":"泰安市","children":[{"code":"370902","name":"泰山区"},{"code":"370911","name":"岱岳区"},{"code":"370921","name":"宁阳县"},{"code":"370923","name":"东平县"},{"code":"370982","name":"新泰市"},{"code":"370983","name":"肥城市"}]},{"code":"3710","name":"威海市","children":[{"code":"371002","name":"环翠区"},{"code":"371003","name":"文登区"},{"code":"371071","name":"威海火炬高技术产业开发区"},{"code":"371072","name":"威海经济技术开发区"},{"code":"371073","name":"威海临港经济技术开发区"},{"code":"371082","name":"荣成市"},{"code":"371083","name":"乳山市"}]},{"code":"3711","name":"日照市","children":[{"code":"371102","name":"东港区"},{"code":"371103","name":"岚山区"},{"code":"371121","name":"五莲县"},{"code":"371122","name":"莒县"},{"code":"371171","name":"日照经济技术开发区"}]},{"code":"3713","name":"临沂市","children":[{"code":"371302","name":"兰山区"},{"code":"371311","name":"罗庄区"},{"code":"371312","name":"河东区"},{"code":"371321","name":"沂南县"},{"code":"371322","name":"郯城县"},{"code":"371323","name":"沂水县"},{"code":"371324","name":"兰陵县"},{"code":"371325","name":"费县"},{"code":"371326","name":"平邑县"},{"code":"371327","name":"莒南县"},{"code":"371328","name":"蒙阴县"},{"code":"371329","name":"临沭县"},{"code":"371371","name":"临沂高新技术产业开发区"}]},{"code":"3714","name":"德州市","children":[{"code":"371402","name":"德城区"},{"code":"371403","name":"陵城区"},{"code":"371422","name":"宁津县"},{"code":"371423","name":"庆云县"},{"code":"371424","name":"临邑县"},{"code":"371425","name":"齐河县"},{"code":"371426","name":"平原县"},{"code":"371427","name":"夏津县"},{"code":"371428","name":"武城县"},{"code":"371471","name":"德州经济技术开发区"},{"code":"371472","name":"德州运河经济开发区"},{"code":"371481","name":"乐陵市"},{"code":"371482","name":"禹城市"}]},{"code":"3715","name":"聊城市","children":[{"code":"371502","name":"东昌府区"},{"code":"371503","name":"茌平区"},{"code":"371521","name":"阳谷县"},{"code":"371522","name":"莘县"},{"code":"371524","name":"东阿县"},{"code":"371525","name":"冠县"},{"code":"371526","name":"高唐县"},{"code":"371581","name":"临清市"}]},{"code":"3716","name":"滨州市","children":[{"code":"371602","name":"滨城区"},{"code":"371603","name":"沾化区"},{"code":"371621","name":"惠民县"},{"code":"371622","name":"阳信县"},{"code":"371623","name":"无棣县"},{"code":"371625","name":"博兴县"},{"code":"371681","name":"邹平市"}]},{"code":"3717","name":"菏泽市","children":[{"code":"371702","name":"牡丹区"},{"code":"371703","name":"定陶区"},{"code":"371721","name":"曹县"},{"code":"371722","name":"单县"},{"code":"371723","name":"成武县"},{"code":"371724","name":"巨野县"},{"code":"371725","name":"郓城县"},{"code":"371726","name":"鄄城县"},{"code":"371728","name":"东明县"},{"code":"371771","name":"菏泽经济技术开发区"},{"code":"371772","name":"菏泽高新技术开发区"}]}]},{"code":"41","name":"河南省","children":[{"code":"4101","name":"郑州市","children":[{"code":"410102","name":"中原区"},{"code":"410103","name":"二七区"},{"code":"410104","name":"管城回族区"},{"code":"410105","name":"金水区"},{"code":"410106","name":"上街区"},{"code":"410108","name":"惠济区"},{"code":"410122","name":"中牟县"},{"code":"410171","name":"郑州经济技术开发区"},{"code":"410172","name":"郑州高新技术产业开发区"},{"code":"410173","name":"郑州航空港经济综合实验区"},{"code":"410181","name":"巩义市"},{"code":"410182","name":"荥阳市"},{"code":"410183","name":"新密市"},{"code":"410184","name":"新郑市"},{"code":"410185","name":"登封市"}]},{"code":"4102","name":"开封市","children":[{"code":"410202","name":"龙亭区"},{"code":"410203","name":"顺河回族区"},{"code":"410204","name":"鼓楼区"},{"code":"410205","name":"禹王台区"},{"code":"410212","name":"祥符区"},{"code":"410221","name":"杞县"},{"code":"410222","name":"通许县"},{"code":"410223","name":"尉氏县"},{"code":"410225","name":"兰考县"}]},{"code":"4103","name":"洛阳市","children":[{"code":"410302","name":"老城区"},{"code":"410303","name":"西工区"},{"code":"410304","name":"瀍河回族区"},{"code":"410305","name":"涧西区"},{"code":"410306","name":"吉利区"},{"code":"410311","name":"洛龙区"},{"code":"410322","name":"孟津县"},{"code":"410323","name":"新安县"},{"code":"410324","name":"栾川县"},{"code":"410325","name":"嵩县"},{"code":"410326","name":"汝阳县"},{"code":"410327","name":"宜阳县"},{"code":"410328","name":"洛宁县"},{"code":"410329","name":"伊川县"},{"code":"410371","name":"洛阳高新技术产业开发区"},{"code":"410381","name":"偃师市"}]},{"code":"4104","name":"平顶山市","children":[{"code":"410402","name":"新华区"},{"code":"410403","name":"卫东区"},{"code":"410404","name":"石龙区"},{"code":"410411","name":"湛河区"},{"code":"410421","name":"宝丰县"},{"code":"410422","name":"叶县"},{"code":"410423","name":"鲁山县"},{"code":"410425","name":"郏县"},{"code":"410471","name":"平顶山高新技术产业开发区"},{"code":"410472","name":"平顶山市城乡一体化示范区"},{"code":"410481","name":"舞钢市"},{"code":"410482","name":"汝州市"}]},{"code":"4105","name":"安阳市","children":[{"code":"410502","name":"文峰区"},{"code":"410503","name":"北关区"},{"code":"410505","name":"殷都区"},{"code":"410506","name":"龙安区"},{"code":"410522","name":"安阳县"},{"code":"410523","name":"汤阴县"},{"code":"410526","name":"滑县"},{"code":"410527","name":"内黄县"},{"code":"410571","name":"安阳高新技术产业开发区"},{"code":"410581","name":"林州市"}]},{"code":"4106","name":"鹤壁市","children":[{"code":"410602","name":"鹤山区"},{"code":"410603","name":"山城区"},{"code":"410611","name":"淇滨区"},{"code":"410621","name":"浚县"},{"code":"410622","name":"淇县"},{"code":"410671","name":"鹤壁经济技术开发区"}]},{"code":"4107","name":"新乡市","children":[{"code":"410702","name":"红旗区"},{"code":"410703","name":"卫滨区"},{"code":"410704","name":"凤泉区"},{"code":"410711","name":"牧野区"},{"code":"410721","name":"新乡县"},{"code":"410724","name":"获嘉县"},{"code":"410725","name":"原阳县"},{"code":"410726","name":"延津县"},{"code":"410727","name":"封丘县"},{"code":"410771","name":"新乡高新技术产业开发区"},{"code":"410772","name":"新乡经济技术开发区"},{"code":"410773","name":"新乡市平原城乡一体化示范区"},{"code":"410781","name":"卫辉市"},{"code":"410782","name":"辉县市"},{"code":"410783","name":"长垣市"}]},{"code":"4108","name":"焦作市","children":[{"code":"410802","name":"解放区"},{"code":"410803","name":"中站区"},{"code":"410804","name":"马村区"},{"code":"410811","name":"山阳区"},{"code":"410821","name":"修武县"},{"code":"410822","name":"博爱县"},{"code":"410823","name":"武陟县"},{"code":"410825","name":"温县"},{"code":"410871","name":"焦作城乡一体化示范区"},{"code":"410882","name":"沁阳市"},{"code":"410883","name":"孟州市"}]},{"code":"4109","name":"濮阳市","children":[{"code":"410902","name":"华龙区"},{"code":"410922","name":"清丰县"},{"code":"410923","name":"南乐县"},{"code":"410926","name":"范县"},{"code":"410927","name":"台前县"},{"code":"410928","name":"濮阳县"},{"code":"410971","name":"河南濮阳工业园区"},{"code":"410972","name":"濮阳经济技术开发区"}]},{"code":"4110","name":"许昌市","children":[{"code":"411002","name":"魏都区"},{"code":"411003","name":"建安区"},{"code":"411024","name":"鄢陵县"},{"code":"411025","name":"襄城县"},{"code":"411071","name":"许昌经济技术开发区"},{"code":"411081","name":"禹州市"},{"code":"411082","name":"长葛市"}]},{"code":"4111","name":"漯河市","children":[{"code":"411102","name":"源汇区"},{"code":"411103","name":"郾城区"},{"code":"411104","name":"召陵区"},{"code":"411121","name":"舞阳县"},{"code":"411122","name":"临颍县"},{"code":"411171","name":"漯河经济技术开发区"}]},{"code":"4112","name":"三门峡市","children":[{"code":"411202","name":"湖滨区"},{"code":"411203","name":"陕州区"},{"code":"411221","name":"渑池县"},{"code":"411224","name":"卢氏县"},{"code":"411271","name":"河南三门峡经济开发区"},{"code":"411281","name":"义马市"},{"code":"411282","name":"灵宝市"}]},{"code":"4113","name":"南阳市","children":[{"code":"411302","name":"宛城区"},{"code":"411303","name":"卧龙区"},{"code":"411321","name":"南召县"},{"code":"411322","name":"方城县"},{"code":"411323","name":"西峡县"},{"code":"411324","name":"镇平县"},{"code":"411325","name":"内乡县"},{"code":"411326","name":"淅川县"},{"code":"411327","name":"社旗县"},{"code":"411328","name":"唐河县"},{"code":"411329","name":"新野县"},{"code":"411330","name":"桐柏县"},{"code":"411371","name":"南阳高新技术产业开发区"},{"code":"411372","name":"南阳市城乡一体化示范区"},{"code":"411381","name":"邓州市"}]},{"code":"4114","name":"商丘市","children":[{"code":"411402","name":"梁园区"},{"code":"411403","name":"睢阳区"},{"code":"411421","name":"民权县"},{"code":"411422","name":"睢县"},{"code":"411423","name":"宁陵县"},{"code":"411424","name":"柘城县"},{"code":"411425","name":"虞城县"},{"code":"411426","name":"夏邑县"},{"code":"411471","name":"豫东综合物流产业聚集区"},{"code":"411472","name":"河南商丘经济开发区"},{"code":"411481","name":"永城市"}]},{"code":"4115","name":"信阳市","children":[{"code":"411502","name":"浉河区"},{"code":"411503","name":"平桥区"},{"code":"411521","name":"罗山县"},{"code":"411522","name":"光山县"},{"code":"411523","name":"新县"},{"code":"411524","name":"商城县"},{"code":"411525","name":"固始县"},{"code":"411526","name":"潢川县"},{"code":"411527","name":"淮滨县"},{"code":"411528","name":"息县"},{"code":"411571","name":"信阳高新技术产业开发区"}]},{"code":"4116","name":"周口市","children":[{"code":"411602","name":"川汇区"},{"code":"411603","name":"淮阳区"},{"code":"411621","name":"扶沟县"},{"code":"411622","name":"西华县"},{"code":"411623","name":"商水县"},{"code":"411624","name":"沈丘县"},{"code":"411625","name":"郸城县"},{"code":"411627","name":"太康县"},{"code":"411628","name":"鹿邑县"},{"code":"411671","name":"河南周口经济开发区"},{"code":"411681","name":"项城市"}]},{"code":"4117","name":"驻马店市","children":[{"code":"411702","name":"驿城区"},{"code":"411721","name":"西平县"},{"code":"411722","name":"上蔡县"},{"code":"411723","name":"平舆县"},{"code":"411724","name":"正阳县"},{"code":"411725","name":"确山县"},{"code":"411726","name":"泌阳县"},{"code":"411727","name":"汝南县"},{"code":"411728","name":"遂平县"},{"code":"411729","name":"新蔡县"},{"code":"411771","name":"河南驻马店经济开发区"}]},{"code":"4190","name":"省直辖县级行政区划","children":[{"code":"419001","name":"济源市"}]}]},{"code":"42","name":"湖北省","children":[{"code":"4201","name":"武汉市","children":[{"code":"420102","name":"江岸区"},{"code":"420103","name":"江汉区"},{"code":"420104","name":"硚口区"},{"code":"420105","name":"汉阳区"},{"code":"420106","name":"武昌区"},{"code":"420107","name":"青山区"},{"code":"420111","name":"洪山区"},{"code":"420112","name":"东西湖区"},{"code":"420113","name":"汉南区"},{"code":"420114","name":"蔡甸区"},{"code":"420115","name":"江夏区"},{"code":"420116","name":"黄陂区"},{"code":"420117","name":"新洲区"}]},{"code":"4202","name":"黄石市","children":[{"code":"420202","name":"黄石港区"},{"code":"420203","name":"西塞山区"},{"code":"420204","name":"下陆区"},{"code":"420205","name":"铁山区"},{"code":"420222","name":"阳新县"},{"code":"420281","name":"大冶市"}]},{"code":"4203","name":"十堰市","children":[{"code":"420302","name":"茅箭区"},{"code":"420303","name":"张湾区"},{"code":"420304","name":"郧阳区"},{"code":"420322","name":"郧西县"},{"code":"420323","name":"竹山县"},{"code":"420324","name":"竹溪县"},{"code":"420325","name":"房县"},{"code":"420381","name":"丹江口市"}]},{"code":"4205","name":"宜昌市","children":[{"code":"420502","name":"西陵区"},{"code":"420503","name":"伍家岗区"},{"code":"420504","name":"点军区"},{"code":"420505","name":"猇亭区"},{"code":"420506","name":"夷陵区"},{"code":"420525","name":"远安县"},{"code":"420526","name":"兴山县"},{"code":"420527","name":"秭归县"},{"code":"420528","name":"长阳土家族自治县"},{"code":"420529","name":"五峰土家族自治县"},{"code":"420581","name":"宜都市"},{"code":"420582","name":"当阳市"},{"code":"420583","name":"枝江市"}]},{"code":"4206","name":"襄阳市","children":[{"code":"420602","name":"襄城区"},{"code":"420606","name":"樊城区"},{"code":"420607","name":"襄州区"},{"code":"420624","name":"南漳县"},{"code":"420625","name":"谷城县"},{"code":"420626","name":"保康县"},{"code":"420682","name":"老河口市"},{"code":"420683","name":"枣阳市"},{"code":"420684","name":"宜城市"}]},{"code":"4207","name":"鄂州市","children":[{"code":"420702","name":"梁子湖区"},{"code":"420703","name":"华容区"},{"code":"420704","name":"鄂城区"}]},{"code":"4208","name":"荆门市","children":[{"code":"420802","name":"东宝区"},{"code":"420804","name":"掇刀区"},{"code":"420822","name":"沙洋县"},{"code":"420881","name":"钟祥市"},{"code":"420882","name":"京山市"}]},{"code":"4209","name":"孝感市","children":[{"code":"420902","name":"孝南区"},{"code":"420921","name":"孝昌县"},{"code":"420922","name":"大悟县"},{"code":"420923","name":"云梦县"},{"code":"420981","name":"应城市"},{"code":"420982","name":"安陆市"},{"code":"420984","name":"汉川市"}]},{"code":"4210","name":"荆州市","children":[{"code":"421002","name":"沙市区"},{"code":"421003","name":"荆州区"},{"code":"421022","name":"公安县"},{"code":"421023","name":"监利县"},{"code":"421024","name":"江陵县"},{"code":"421071","name":"荆州经济技术开发区"},{"code":"421081","name":"石首市"},{"code":"421083","name":"洪湖市"},{"code":"421087","name":"松滋市"}]},{"code":"4211","name":"黄冈市","children":[{"code":"421102","name":"黄州区"},{"code":"421121","name":"团风县"},{"code":"421122","name":"红安县"},{"code":"421123","name":"罗田县"},{"code":"421124","name":"英山县"},{"code":"421125","name":"浠水县"},{"code":"421126","name":"蕲春县"},{"code":"421127","name":"黄梅县"},{"code":"421171","name":"龙感湖管理区"},{"code":"421181","name":"麻城市"},{"code":"421182","name":"武穴市"}]},{"code":"4212","name":"咸宁市","children":[{"code":"421202","name":"咸安区"},{"code":"421221","name":"嘉鱼县"},{"code":"421222","name":"通城县"},{"code":"421223","name":"崇阳县"},{"code":"421224","name":"通山县"},{"code":"421281","name":"赤壁市"}]},{"code":"4213","name":"随州市","children":[{"code":"421303","name":"曾都区"},{"code":"421321","name":"随县"},{"code":"421381","name":"广水市"}]},{"code":"4228","name":"恩施土家族苗族自治州","children":[{"code":"422801","name":"恩施市"},{"code":"422802","name":"利川市"},{"code":"422822","name":"建始县"},{"code":"422823","name":"巴东县"},{"code":"422825","name":"宣恩县"},{"code":"422826","name":"咸丰县"},{"code":"422827","name":"来凤县"},{"code":"422828","name":"鹤峰县"}]},{"code":"4290","name":"省直辖县级行政区划","children":[{"code":"429004","name":"仙桃市"},{"code":"429005","name":"潜江市"},{"code":"429006","name":"天门市"},{"code":"429021","name":"神农架林区"}]}]},{"code":"43","name":"湖南省","children":[{"code":"4301","name":"长沙市","children":[{"code":"430102","name":"芙蓉区"},{"code":"430103","name":"天心区"},{"code":"430104","name":"岳麓区"},{"code":"430105","name":"开福区"},{"code":"430111","name":"雨花区"},{"code":"430112","name":"望城区"},{"code":"430121","name":"长沙县"},{"code":"430181","name":"浏阳市"},{"code":"430182","name":"宁乡市"}]},{"code":"4302","name":"株洲市","children":[{"code":"430202","name":"荷塘区"},{"code":"430203","name":"芦淞区"},{"code":"430204","name":"石峰区"},{"code":"430211","name":"天元区"},{"code":"430212","name":"渌口区"},{"code":"430223","name":"攸县"},{"code":"430224","name":"茶陵县"},{"code":"430225","name":"炎陵县"},{"code":"430271","name":"云龙示范区"},{"code":"430281","name":"醴陵市"}]},{"code":"4303","name":"湘潭市","children":[{"code":"430302","name":"雨湖区"},{"code":"430304","name":"岳塘区"},{"code":"430321","name":"湘潭县"},{"code":"430371","name":"湖南湘潭高新技术产业园区"},{"code":"430372","name":"湘潭昭山示范区"},{"code":"430373","name":"湘潭九华示范区"},{"code":"430381","name":"湘乡市"},{"code":"430382","name":"韶山市"}]},{"code":"4304","name":"衡阳市","children":[{"code":"430405","name":"珠晖区"},{"code":"430406","name":"雁峰区"},{"code":"430407","name":"石鼓区"},{"code":"430408","name":"蒸湘区"},{"code":"430412","name":"南岳区"},{"code":"430421","name":"衡阳县"},{"code":"430422","name":"衡南县"},{"code":"430423","name":"衡山县"},{"code":"430424","name":"衡东县"},{"code":"430426","name":"祁东县"},{"code":"430471","name":"衡阳综合保税区"},{"code":"430472","name":"湖南衡阳高新技术产业园区"},{"code":"430473","name":"湖南衡阳松木经济开发区"},{"code":"430481","name":"耒阳市"},{"code":"430482","name":"常宁市"}]},{"code":"4305","name":"邵阳市","children":[{"code":"430502","name":"双清区"},{"code":"430503","name":"大祥区"},{"code":"430511","name":"北塔区"},{"code":"430522","name":"新邵县"},{"code":"430523","name":"邵阳县"},{"code":"430524","name":"隆回县"},{"code":"430525","name":"洞口县"},{"code":"430527","name":"绥宁县"},{"code":"430528","name":"新宁县"},{"code":"430529","name":"城步苗族自治县"},{"code":"430581","name":"武冈市"},{"code":"430582","name":"邵东市"}]},{"code":"4306","name":"岳阳市","children":[{"code":"430602","name":"岳阳楼区"},{"code":"430603","name":"云溪区"},{"code":"430611","name":"君山区"},{"code":"430621","name":"岳阳县"},{"code":"430623","name":"华容县"},{"code":"430624","name":"湘阴县"},{"code":"430626","name":"平江县"},{"code":"430671","name":"岳阳市屈原管理区"},{"code":"430681","name":"汨罗市"},{"code":"430682","name":"临湘市"}]},{"code":"4307","name":"常德市","children":[{"code":"430702","name":"武陵区"},{"code":"430703","name":"鼎城区"},{"code":"430721","name":"安乡县"},{"code":"430722","name":"汉寿县"},{"code":"430723","name":"澧县"},{"code":"430724","name":"临澧县"},{"code":"430725","name":"桃源县"},{"code":"430726","name":"石门县"},{"code":"430771","name":"常德市西洞庭管理区"},{"code":"430781","name":"津市市"}]},{"code":"4308","name":"张家界市","children":[{"code":"430802","name":"永定区"},{"code":"430811","name":"武陵源区"},{"code":"430821","name":"慈利县"},{"code":"430822","name":"桑植县"}]},{"code":"4309","name":"益阳市","children":[{"code":"430902","name":"资阳区"},{"code":"430903","name":"赫山区"},{"code":"430921","name":"南县"},{"code":"430922","name":"桃江县"},{"code":"430923","name":"安化县"},{"code":"430971","name":"益阳市大通湖管理区"},{"code":"430972","name":"湖南益阳高新技术产业园区"},{"code":"430981","name":"沅江市"}]},{"code":"4310","name":"郴州市","children":[{"code":"431002","name":"北湖区"},{"code":"431003","name":"苏仙区"},{"code":"431021","name":"桂阳县"},{"code":"431022","name":"宜章县"},{"code":"431023","name":"永兴县"},{"code":"431024","name":"嘉禾县"},{"code":"431025","name":"临武县"},{"code":"431026","name":"汝城县"},{"code":"431027","name":"桂东县"},{"code":"431028","name":"安仁县"},{"code":"431081","name":"资兴市"}]},{"code":"4311","name":"永州市","children":[{"code":"431102","name":"零陵区"},{"code":"431103","name":"冷水滩区"},{"code":"431121","name":"祁阳县"},{"code":"431122","name":"东安县"},{"code":"431123","name":"双牌县"},{"code":"431124","name":"道县"},{"code":"431125","name":"江永县"},{"code":"431126","name":"宁远县"},{"code":"431127","name":"蓝山县"},{"code":"431128","name":"新田县"},{"code":"431129","name":"江华瑶族自治县"},{"code":"431171","name":"永州经济技术开发区"},{"code":"431172","name":"永州市金洞管理区"},{"code":"431173","name":"永州市回龙圩管理区"}]},{"code":"4312","name":"怀化市","children":[{"code":"431202","name":"鹤城区"},{"code":"431221","name":"中方县"},{"code":"431222","name":"沅陵县"},{"code":"431223","name":"辰溪县"},{"code":"431224","name":"溆浦县"},{"code":"431225","name":"会同县"},{"code":"431226","name":"麻阳苗族自治县"},{"code":"431227","name":"新晃侗族自治县"},{"code":"431228","name":"芷江侗族自治县"},{"code":"431229","name":"靖州苗族侗族自治县"},{"code":"431230","name":"通道侗族自治县"},{"code":"431271","name":"怀化市洪江管理区"},{"code":"431281","name":"洪江市"}]},{"code":"4313","name":"娄底市","children":[{"code":"431302","name":"娄星区"},{"code":"431321","name":"双峰县"},{"code":"431322","name":"新化县"},{"code":"431381","name":"冷水江市"},{"code":"431382","name":"涟源市"}]},{"code":"4331","name":"湘西土家族苗族自治州","children":[{"code":"433101","name":"吉首市"},{"code":"433122","name":"泸溪县"},{"code":"433123","name":"凤凰县"},{"code":"433124","name":"花垣县"},{"code":"433125","name":"保靖县"},{"code":"433126","name":"古丈县"},{"code":"433127","name":"永顺县"},{"code":"433130","name":"龙山县"}]}]},{"code":"44","name":"广东省","children":[{"code":"4401","name":"广州市","children":[{"code":"440103","name":"荔湾区"},{"code":"440104","name":"越秀区"},{"code":"440105","name":"海珠区"},{"code":"440106","name":"天河区"},{"code":"440111","name":"白云区"},{"code":"440112","name":"黄埔区"},{"code":"440113","name":"番禺区"},{"code":"440114","name":"花都区"},{"code":"440115","name":"南沙区"},{"code":"440117","name":"从化区"},{"code":"440118","name":"增城区"}]},{"code":"4402","name":"韶关市","children":[{"code":"440203","name":"武江区"},{"code":"440204","name":"浈江区"},{"code":"440205","name":"曲江区"},{"code":"440222","name":"始兴县"},{"code":"440224","name":"仁化县"},{"code":"440229","name":"翁源县"},{"code":"440232","name":"乳源瑶族自治县"},{"code":"440233","name":"新丰县"},{"code":"440281","name":"乐昌市"},{"code":"440282","name":"南雄市"}]},{"code":"4403","name":"深圳市","children":[{"code":"440303","name":"罗湖区"},{"code":"440304","name":"福田区"},{"code":"440305","name":"南山区"},{"code":"440306","name":"宝安区"},{"code":"440307","name":"龙岗区"},{"code":"440308","name":"盐田区"},{"code":"440309","name":"龙华区"},{"code":"440310","name":"坪山区"},{"code":"440311","name":"光明区"}]},{"code":"4404","name":"珠海市","children":[{"code":"440402","name":"香洲区"},{"code":"440403","name":"斗门区"},{"code":"440404","name":"金湾区"}]},{"code":"4405","name":"汕头市","children":[{"code":"440507","name":"龙湖区"},{"code":"440511","name":"金平区"},{"code":"440512","name":"濠江区"},{"code":"440513","name":"潮阳区"},{"code":"440514","name":"潮南区"},{"code":"440515","name":"澄海区"},{"code":"440523","name":"南澳县"}]},{"code":"4406","name":"佛山市","children":[{"code":"440604","name":"禅城区"},{"code":"440605","name":"南海区"},{"code":"440606","name":"顺德区"},{"code":"440607","name":"三水区"},{"code":"440608","name":"高明区"}]},{"code":"4407","name":"江门市","children":[{"code":"440703","name":"蓬江区"},{"code":"440704","name":"江海区"},{"code":"440705","name":"新会区"},{"code":"440781","name":"台山市"},{"code":"440783","name":"开平市"},{"code":"440784","name":"鹤山市"},{"code":"440785","name":"恩平市"}]},{"code":"4408","name":"湛江市","children":[{"code":"440802","name":"赤坎区"},{"code":"440803","name":"霞山区"},{"code":"440804","name":"坡头区"},{"code":"440811","name":"麻章区"},{"code":"440823","name":"遂溪县"},{"code":"440825","name":"徐闻县"},{"code":"440881","name":"廉江市"},{"code":"440882","name":"雷州市"},{"code":"440883","name":"吴川市"}]},{"code":"4409","name":"茂名市","children":[{"code":"440902","name":"茂南区"},{"code":"440904","name":"电白区"},{"code":"440981","name":"高州市"},{"code":"440982","name":"化州市"},{"code":"440983","name":"信宜市"}]},{"code":"4412","name":"肇庆市","children":[{"code":"441202","name":"端州区"},{"code":"441203","name":"鼎湖区"},{"code":"441204","name":"高要区"},{"code":"441223","name":"广宁县"},{"code":"441224","name":"怀集县"},{"code":"441225","name":"封开县"},{"code":"441226","name":"德庆县"},{"code":"441284","name":"四会市"}]},{"code":"4413","name":"惠州市","children":[{"code":"441302","name":"惠城区"},{"code":"441303","name":"惠阳区"},{"code":"441322","name":"博罗县"},{"code":"441323","name":"惠东县"},{"code":"441324","name":"龙门县"}]},{"code":"4414","name":"梅州市","children":[{"code":"441402","name":"梅江区"},{"code":"441403","name":"梅县区"},{"code":"441422","name":"大埔县"},{"code":"441423","name":"丰顺县"},{"code":"441424","name":"五华县"},{"code":"441426","name":"平远县"},{"code":"441427","name":"蕉岭县"},{"code":"441481","name":"兴宁市"}]},{"code":"4415","name":"汕尾市","children":[{"code":"441502","name":"城区"},{"code":"441521","name":"海丰县"},{"code":"441523","name":"陆河县"},{"code":"441581","name":"陆丰市"}]},{"code":"4416","name":"河源市","children":[{"code":"441602","name":"源城区"},{"code":"441621","name":"紫金县"},{"code":"441622","name":"龙川县"},{"code":"441623","name":"连平县"},{"code":"441624","name":"和平县"},{"code":"441625","name":"东源县"}]},{"code":"4417","name":"阳江市","children":[{"code":"441702","name":"江城区"},{"code":"441704","name":"阳东区"},{"code":"441721","name":"阳西县"},{"code":"441781","name":"阳春市"}]},{"code":"4418","name":"清远市","children":[{"code":"441802","name":"清城区"},{"code":"441803","name":"清新区"},{"code":"441821","name":"佛冈县"},{"code":"441823","name":"阳山县"},{"code":"441825","name":"连山壮族瑶族自治县"},{"code":"441826","name":"连南瑶族自治县"},{"code":"441881","name":"英德市"},{"code":"441882","name":"连州市"}]},{"code":"4419","name":"东莞市","children":[{"code":"441900003","name":"东城街道"},{"code":"441900004","name":"南城街道"},{"code":"441900005","name":"万江街道"},{"code":"441900006","name":"莞城街道"},{"code":"441900101","name":"石碣镇"},{"code":"441900102","name":"石龙镇"},{"code":"441900103","name":"茶山镇"},{"code":"441900104","name":"石排镇"},{"code":"441900105","name":"企石镇"},{"code":"441900106","name":"横沥镇"},{"code":"441900107","name":"桥头镇"},{"code":"441900108","name":"谢岗镇"},{"code":"441900109","name":"东坑镇"},{"code":"441900110","name":"常平镇"},{"code":"441900111","name":"寮步镇"},{"code":"441900112","name":"樟木头镇"},{"code":"441900113","name":"大朗镇"},{"code":"441900114","name":"黄江镇"},{"code":"441900115","name":"清溪镇"},{"code":"441900116","name":"塘厦镇"},{"code":"441900117","name":"凤岗镇"},{"code":"441900118","name":"大岭山镇"},{"code":"441900119","name":"长安镇"},{"code":"441900121","name":"虎门镇"},{"code":"441900122","name":"厚街镇"},{"code":"441900123","name":"沙田镇"},{"code":"441900124","name":"道滘镇"},{"code":"441900125","name":"洪梅镇"},{"code":"441900126","name":"麻涌镇"},{"code":"441900127","name":"望牛墩镇"},{"code":"441900128","name":"中堂镇"},{"code":"441900129","name":"高埗镇"},{"code":"441900401","name":"松山湖"},{"code":"441900402","name":"东莞港"},{"code":"441900403","name":"东莞生态园"}]},{"code":"4420","name":"中山市","children":[{"code":"442000001","name":"石岐街道"},{"code":"442000002","name":"东区街道"},{"code":"442000003","name":"中山港街道"},{"code":"442000004","name":"西区街道"},{"code":"442000005","name":"南区街道"},{"code":"442000006","name":"五桂山街道"},{"code":"442000100","name":"小榄镇"},{"code":"442000101","name":"黄圃镇"},{"code":"442000102","name":"民众镇"},{"code":"442000103","name":"东凤镇"},{"code":"442000104","name":"东升镇"},{"code":"442000105","name":"古镇镇"},{"code":"442000106","name":"沙溪镇"},{"code":"442000107","name":"坦洲镇"},{"code":"442000108","name":"港口镇"},{"code":"442000109","name":"三角镇"},{"code":"442000110","name":"横栏镇"},{"code":"442000111","name":"南头镇"},{"code":"442000112","name":"阜沙镇"},{"code":"442000113","name":"南朗镇"},{"code":"442000114","name":"三乡镇"},{"code":"442000115","name":"板芙镇"},{"code":"442000116","name":"大涌镇"},{"code":"442000117","name":"神湾镇"}]},{"code":"4451","name":"潮州市","children":[{"code":"445102","name":"湘桥区"},{"code":"445103","name":"潮安区"},{"code":"445122","name":"饶平县"}]},{"code":"4452","name":"揭阳市","children":[{"code":"445202","name":"榕城区"},{"code":"445203","name":"揭东区"},{"code":"445222","name":"揭西县"},{"code":"445224","name":"惠来县"},{"code":"445281","name":"普宁市"}]},{"code":"4453","name":"云浮市","children":[{"code":"445302","name":"云城区"},{"code":"445303","name":"云安区"},{"code":"445321","name":"新兴县"},{"code":"445322","name":"郁南县"},{"code":"445381","name":"罗定市"}]}]},{"code":"45","name":"广西壮族自治区","children":[{"code":"4501","name":"南宁市","children":[{"code":"450102","name":"兴宁区"},{"code":"450103","name":"青秀区"},{"code":"450105","name":"江南区"},{"code":"450107","name":"西乡塘区"},{"code":"450108","name":"良庆区"},{"code":"450109","name":"邕宁区"},{"code":"450110","name":"武鸣区"},{"code":"450123","name":"隆安县"},{"code":"450124","name":"马山县"},{"code":"450125","name":"上林县"},{"code":"450126","name":"宾阳县"},{"code":"450127","name":"横县"}]},{"code":"4502","name":"柳州市","children":[{"code":"450202","name":"城中区"},{"code":"450203","name":"鱼峰区"},{"code":"450204","name":"柳南区"},{"code":"450205","name":"柳北区"},{"code":"450206","name":"柳江区"},{"code":"450222","name":"柳城县"},{"code":"450223","name":"鹿寨县"},{"code":"450224","name":"融安县"},{"code":"450225","name":"融水苗族自治县"},{"code":"450226","name":"三江侗族自治县"}]},{"code":"4503","name":"桂林市","children":[{"code":"450302","name":"秀峰区"},{"code":"450303","name":"叠彩区"},{"code":"450304","name":"象山区"},{"code":"450305","name":"七星区"},{"code":"450311","name":"雁山区"},{"code":"450312","name":"临桂区"},{"code":"450321","name":"阳朔县"},{"code":"450323","name":"灵川县"},{"code":"450324","name":"全州县"},{"code":"450325","name":"兴安县"},{"code":"450326","name":"永福县"},{"code":"450327","name":"灌阳县"},{"code":"450328","name":"龙胜各族自治县"},{"code":"450329","name":"资源县"},{"code":"450330","name":"平乐县"},{"code":"450332","name":"恭城瑶族自治县"},{"code":"450381","name":"荔浦市"}]},{"code":"4504","name":"梧州市","children":[{"code":"450403","name":"万秀区"},{"code":"450405","name":"长洲区"},{"code":"450406","name":"龙圩区"},{"code":"450421","name":"苍梧县"},{"code":"450422","name":"藤县"},{"code":"450423","name":"蒙山县"},{"code":"450481","name":"岑溪市"}]},{"code":"4505","name":"北海市","children":[{"code":"450502","name":"海城区"},{"code":"450503","name":"银海区"},{"code":"450512","name":"铁山港区"},{"code":"450521","name":"合浦县"}]},{"code":"4506","name":"防城港市","children":[{"code":"450602","name":"港口区"},{"code":"450603","name":"防城区"},{"code":"450621","name":"上思县"},{"code":"450681","name":"东兴市"}]},{"code":"4507","name":"钦州市","children":[{"code":"450702","name":"钦南区"},{"code":"450703","name":"钦北区"},{"code":"450721","name":"灵山县"},{"code":"450722","name":"浦北县"}]},{"code":"4508","name":"贵港市","children":[{"code":"450802","name":"港北区"},{"code":"450803","name":"港南区"},{"code":"450804","name":"覃塘区"},{"code":"450821","name":"平南县"},{"code":"450881","name":"桂平市"}]},{"code":"4509","name":"玉林市","children":[{"code":"450902","name":"玉州区"},{"code":"450903","name":"福绵区"},{"code":"450921","name":"容县"},{"code":"450922","name":"陆川县"},{"code":"450923","name":"博白县"},{"code":"450924","name":"兴业县"},{"code":"450981","name":"北流市"}]},{"code":"4510","name":"百色市","children":[{"code":"451002","name":"右江区"},{"code":"451003","name":"田阳区"},{"code":"451022","name":"田东县"},{"code":"451024","name":"德保县"},{"code":"451026","name":"那坡县"},{"code":"451027","name":"凌云县"},{"code":"451028","name":"乐业县"},{"code":"451029","name":"田林县"},{"code":"451030","name":"西林县"},{"code":"451031","name":"隆林各族自治县"},{"code":"451081","name":"靖西市"},{"code":"451082","name":"平果市"}]},{"code":"4511","name":"贺州市","children":[{"code":"451102","name":"八步区"},{"code":"451103","name":"平桂区"},{"code":"451121","name":"昭平县"},{"code":"451122","name":"钟山县"},{"code":"451123","name":"富川瑶族自治县"}]},{"code":"4512","name":"河池市","children":[{"code":"451202","name":"金城江区"},{"code":"451203","name":"宜州区"},{"code":"451221","name":"南丹县"},{"code":"451222","name":"天峨县"},{"code":"451223","name":"凤山县"},{"code":"451224","name":"东兰县"},{"code":"451225","name":"罗城仫佬族自治县"},{"code":"451226","name":"环江毛南族自治县"},{"code":"451227","name":"巴马瑶族自治县"},{"code":"451228","name":"都安瑶族自治县"},{"code":"451229","name":"大化瑶族自治县"}]},{"code":"4513","name":"来宾市","children":[{"code":"451302","name":"兴宾区"},{"code":"451321","name":"忻城县"},{"code":"451322","name":"象州县"},{"code":"451323","name":"武宣县"},{"code":"451324","name":"金秀瑶族自治县"},{"code":"451381","name":"合山市"}]},{"code":"4514","name":"崇左市","children":[{"code":"451402","name":"江州区"},{"code":"451421","name":"扶绥县"},{"code":"451422","name":"宁明县"},{"code":"451423","name":"龙州县"},{"code":"451424","name":"大新县"},{"code":"451425","name":"天等县"},{"code":"451481","name":"凭祥市"}]}]},{"code":"46","name":"海南省","children":[{"code":"4601","name":"海口市","children":[{"code":"460105","name":"秀英区"},{"code":"460106","name":"龙华区"},{"code":"460107","name":"琼山区"},{"code":"460108","name":"美兰区"}]},{"code":"4602","name":"三亚市","children":[{"code":"460202","name":"海棠区"},{"code":"460203","name":"吉阳区"},{"code":"460204","name":"天涯区"},{"code":"460205","name":"崖州区"}]},{"code":"4603","name":"三沙市","children":[{"code":"460321","name":"西沙群岛"},{"code":"460322","name":"南沙群岛"},{"code":"460323","name":"中沙群岛的岛礁及其海域"}]},{"code":"4604","name":"儋州市","children":[{"code":"460400100","name":"那大镇"},{"code":"460400101","name":"和庆镇"},{"code":"460400102","name":"南丰镇"},{"code":"460400103","name":"大成镇"},{"code":"460400104","name":"雅星镇"},{"code":"460400105","name":"兰洋镇"},{"code":"460400106","name":"光村镇"},{"code":"460400107","name":"木棠镇"},{"code":"460400108","name":"海头镇"},{"code":"460400109","name":"峨蔓镇"},{"code":"460400111","name":"王五镇"},{"code":"460400112","name":"白马井镇"},{"code":"460400113","name":"中和镇"},{"code":"460400114","name":"排浦镇"},{"code":"460400115","name":"东成镇"},{"code":"460400116","name":"新州镇"},{"code":"460400499","name":"洋浦经济开发区"},{"code":"460400500","name":"华南热作学院"}]},{"code":"4690","name":"省直辖县级行政区划","children":[{"code":"469001","name":"五指山市"},{"code":"469002","name":"琼海市"},{"code":"469005","name":"文昌市"},{"code":"469006","name":"万宁市"},{"code":"469007","name":"东方市"},{"code":"469021","name":"定安县"},{"code":"469022","name":"屯昌县"},{"code":"469023","name":"澄迈县"},{"code":"469024","name":"临高县"},{"code":"469025","name":"白沙黎族自治县"},{"code":"469026","name":"昌江黎族自治县"},{"code":"469027","name":"乐东黎族自治县"},{"code":"469028","name":"陵水黎族自治县"},{"code":"469029","name":"保亭黎族苗族自治县"},{"code":"469030","name":"琼中黎族苗族自治县"}]}]},{"code":"50","name":"重庆市","children":[{"code":"5001","name":"市辖区","children":[{"code":"500101","name":"万州区"},{"code":"500102","name":"涪陵区"},{"code":"500103","name":"渝中区"},{"code":"500104","name":"大渡口区"},{"code":"500105","name":"江北区"},{"code":"500106","name":"沙坪坝区"},{"code":"500107","name":"九龙坡区"},{"code":"500108","name":"南岸区"},{"code":"500109","name":"北碚区"},{"code":"500110","name":"綦江区"},{"code":"500111","name":"大足区"},{"code":"500112","name":"渝北区"},{"code":"500113","name":"巴南区"},{"code":"500114","name":"黔江区"},{"code":"500115","name":"长寿区"},{"code":"500116","name":"江津区"},{"code":"500117","name":"合川区"},{"code":"500118","name":"永川区"},{"code":"500119","name":"南川区"},{"code":"500120","name":"璧山区"},{"code":"500151","name":"铜梁区"},{"code":"500152","name":"潼南区"},{"code":"500153","name":"荣昌区"},{"code":"500154","name":"开州区"},{"code":"500155","name":"梁平区"},{"code":"500156","name":"武隆区"}]},{"code":"5002","name":"县","children":[{"code":"500229","name":"城口县"},{"code":"500230","name":"丰都县"},{"code":"500231","name":"垫江县"},{"code":"500233","name":"忠县"},{"code":"500235","name":"云阳县"},{"code":"500236","name":"奉节县"},{"code":"500237","name":"巫山县"},{"code":"500238","name":"巫溪县"},{"code":"500240","name":"石柱土家族自治县"},{"code":"500241","name":"秀山土家族苗族自治县"},{"code":"500242","name":"酉阳土家族苗族自治县"},{"code":"500243","name":"彭水苗族土家族自治县"}]}]},{"code":"51","name":"四川省","children":[{"code":"5101","name":"成都市","children":[{"code":"510104","name":"锦江区"},{"code":"510105","name":"青羊区"},{"code":"510106","name":"金牛区"},{"code":"510107","name":"武侯区"},{"code":"510108","name":"成华区"},{"code":"510112","name":"龙泉驿区"},{"code":"510113","name":"青白江区"},{"code":"510114","name":"新都区"},{"code":"510115","name":"温江区"},{"code":"510116","name":"双流区"},{"code":"510117","name":"郫都区"},{"code":"510118","name":"新津区"},{"code":"510121","name":"金堂县"},{"code":"510129","name":"大邑县"},{"code":"510131","name":"蒲江县"},{"code":"510181","name":"都江堰市"},{"code":"510182","name":"彭州市"},{"code":"510183","name":"邛崃市"},{"code":"510184","name":"崇州市"},{"code":"510185","name":"简阳市"}]},{"code":"5103","name":"自贡市","children":[{"code":"510302","name":"自流井区"},{"code":"510303","name":"贡井区"},{"code":"510304","name":"大安区"},{"code":"510311","name":"沿滩区"},{"code":"510321","name":"荣县"},{"code":"510322","name":"富顺县"}]},{"code":"5104","name":"攀枝花市","children":[{"code":"510402","name":"东区"},{"code":"510403","name":"西区"},{"code":"510411","name":"仁和区"},{"code":"510421","name":"米易县"},{"code":"510422","name":"盐边县"}]},{"code":"5105","name":"泸州市","children":[{"code":"510502","name":"江阳区"},{"code":"510503","name":"纳溪区"},{"code":"510504","name":"龙马潭区"},{"code":"510521","name":"泸县"},{"code":"510522","name":"合江县"},{"code":"510524","name":"叙永县"},{"code":"510525","name":"古蔺县"}]},{"code":"5106","name":"德阳市","children":[{"code":"510603","name":"旌阳区"},{"code":"510604","name":"罗江区"},{"code":"510623","name":"中江县"},{"code":"510681","name":"广汉市"},{"code":"510682","name":"什邡市"},{"code":"510683","name":"绵竹市"}]},{"code":"5107","name":"绵阳市","children":[{"code":"510703","name":"涪城区"},{"code":"510704","name":"游仙区"},{"code":"510705","name":"安州区"},{"code":"510722","name":"三台县"},{"code":"510723","name":"盐亭县"},{"code":"510725","name":"梓潼县"},{"code":"510726","name":"北川羌族自治县"},{"code":"510727","name":"平武县"},{"code":"510781","name":"江油市"}]},{"code":"5108","name":"广元市","children":[{"code":"510802","name":"利州区"},{"code":"510811","name":"昭化区"},{"code":"510812","name":"朝天区"},{"code":"510821","name":"旺苍县"},{"code":"510822","name":"青川县"},{"code":"510823","name":"剑阁县"},{"code":"510824","name":"苍溪县"}]},{"code":"5109","name":"遂宁市","children":[{"code":"510903","name":"船山区"},{"code":"510904","name":"安居区"},{"code":"510921","name":"蓬溪县"},{"code":"510923","name":"大英县"},{"code":"510981","name":"射洪市"}]},{"code":"5110","name":"内江市","children":[{"code":"511002","name":"市中区"},{"code":"511011","name":"东兴区"},{"code":"511024","name":"威远县"},{"code":"511025","name":"资中县"},{"code":"511071","name":"内江经济开发区"},{"code":"511083","name":"隆昌市"}]},{"code":"5111","name":"乐山市","children":[{"code":"511102","name":"市中区"},{"code":"511111","name":"沙湾区"},{"code":"511112","name":"五通桥区"},{"code":"511113","name":"金口河区"},{"code":"511123","name":"犍为县"},{"code":"511124","name":"井研县"},{"code":"511126","name":"夹江县"},{"code":"511129","name":"沐川县"},{"code":"511132","name":"峨边彝族自治县"},{"code":"511133","name":"马边彝族自治县"},{"code":"511181","name":"峨眉山市"}]},{"code":"5113","name":"南充市","children":[{"code":"511302","name":"顺庆区"},{"code":"511303","name":"高坪区"},{"code":"511304","name":"嘉陵区"},{"code":"511321","name":"南部县"},{"code":"511322","name":"营山县"},{"code":"511323","name":"蓬安县"},{"code":"511324","name":"仪陇县"},{"code":"511325","name":"西充县"},{"code":"511381","name":"阆中市"}]},{"code":"5114","name":"眉山市","children":[{"code":"511402","name":"东坡区"},{"code":"511403","name":"彭山区"},{"code":"511421","name":"仁寿县"},{"code":"511423","name":"洪雅县"},{"code":"511424","name":"丹棱县"},{"code":"511425","name":"青神县"}]},{"code":"5115","name":"宜宾市","children":[{"code":"511502","name":"翠屏区"},{"code":"511503","name":"南溪区"},{"code":"511504","name":"叙州区"},{"code":"511523","name":"江安县"},{"code":"511524","name":"长宁县"},{"code":"511525","name":"高县"},{"code":"511526","name":"珙县"},{"code":"511527","name":"筠连县"},{"code":"511528","name":"兴文县"},{"code":"511529","name":"屏山县"}]},{"code":"5116","name":"广安市","children":[{"code":"511602","name":"广安区"},{"code":"511603","name":"前锋区"},{"code":"511621","name":"岳池县"},{"code":"511622","name":"武胜县"},{"code":"511623","name":"邻水县"},{"code":"511681","name":"华蓥市"}]},{"code":"5117","name":"达州市","children":[{"code":"511702","name":"通川区"},{"code":"511703","name":"达川区"},{"code":"511722","name":"宣汉县"},{"code":"511723","name":"开江县"},{"code":"511724","name":"大竹县"},{"code":"511725","name":"渠县"},{"code":"511771","name":"达州经济开发区"},{"code":"511781","name":"万源市"}]},{"code":"5118","name":"雅安市","children":[{"code":"511802","name":"雨城区"},{"code":"511803","name":"名山区"},{"code":"511822","name":"荥经县"},{"code":"511823","name":"汉源县"},{"code":"511824","name":"石棉县"},{"code":"511825","name":"天全县"},{"code":"511826","name":"芦山县"},{"code":"511827","name":"宝兴县"}]},{"code":"5119","name":"巴中市","children":[{"code":"511902","name":"巴州区"},{"code":"511903","name":"恩阳区"},{"code":"511921","name":"通江县"},{"code":"511922","name":"南江县"},{"code":"511923","name":"平昌县"},{"code":"511971","name":"巴中经济开发区"}]},{"code":"5120","name":"资阳市","children":[{"code":"512002","name":"雁江区"},{"code":"512021","name":"安岳县"},{"code":"512022","name":"乐至县"}]},{"code":"5132","name":"阿坝藏族羌族自治州","children":[{"code":"513201","name":"马尔康市"},{"code":"513221","name":"汶川县"},{"code":"513222","name":"理县"},{"code":"513223","name":"茂县"},{"code":"513224","name":"松潘县"},{"code":"513225","name":"九寨沟县"},{"code":"513226","name":"金川县"},{"code":"513227","name":"小金县"},{"code":"513228","name":"黑水县"},{"code":"513230","name":"壤塘县"},{"code":"513231","name":"阿坝县"},{"code":"513232","name":"若尔盖县"},{"code":"513233","name":"红原县"}]},{"code":"5133","name":"甘孜藏族自治州","children":[{"code":"513301","name":"康定市"},{"code":"513322","name":"泸定县"},{"code":"513323","name":"丹巴县"},{"code":"513324","name":"九龙县"},{"code":"513325","name":"雅江县"},{"code":"513326","name":"道孚县"},{"code":"513327","name":"炉霍县"},{"code":"513328","name":"甘孜县"},{"code":"513329","name":"新龙县"},{"code":"513330","name":"德格县"},{"code":"513331","name":"白玉县"},{"code":"513332","name":"石渠县"},{"code":"513333","name":"色达县"},{"code":"513334","name":"理塘县"},{"code":"513335","name":"巴塘县"},{"code":"513336","name":"乡城县"},{"code":"513337","name":"稻城县"},{"code":"513338","name":"得荣县"}]},{"code":"5134","name":"凉山彝族自治州","children":[{"code":"513401","name":"西昌市"},{"code":"513422","name":"木里藏族自治县"},{"code":"513423","name":"盐源县"},{"code":"513424","name":"德昌县"},{"code":"513425","name":"会理县"},{"code":"513426","name":"会东县"},{"code":"513427","name":"宁南县"},{"code":"513428","name":"普格县"},{"code":"513429","name":"布拖县"},{"code":"513430","name":"金阳县"},{"code":"513431","name":"昭觉县"},{"code":"513432","name":"喜德县"},{"code":"513433","name":"冕宁县"},{"code":"513434","name":"越西县"},{"code":"513435","name":"甘洛县"},{"code":"513436","name":"美姑县"},{"code":"513437","name":"雷波县"}]}]},{"code":"52","name":"贵州省","children":[{"code":"5201","name":"贵阳市","children":[{"code":"520102","name":"南明区"},{"code":"520103","name":"云岩区"},{"code":"520111","name":"花溪区"},{"code":"520112","name":"乌当区"},{"code":"520113","name":"白云区"},{"code":"520115","name":"观山湖区"},{"code":"520121","name":"开阳县"},{"code":"520122","name":"息烽县"},{"code":"520123","name":"修文县"},{"code":"520181","name":"清镇市"}]},{"code":"5202","name":"六盘水市","children":[{"code":"520201","name":"钟山区"},{"code":"520203","name":"六枝特区"},{"code":"520221","name":"水城县"},{"code":"520281","name":"盘州市"}]},{"code":"5203","name":"遵义市","children":[{"code":"520302","name":"红花岗区"},{"code":"520303","name":"汇川区"},{"code":"520304","name":"播州区"},{"code":"520322","name":"桐梓县"},{"code":"520323","name":"绥阳县"},{"code":"520324","name":"正安县"},{"code":"520325","name":"道真仡佬族苗族自治县"},{"code":"520326","name":"务川仡佬族苗族自治县"},{"code":"520327","name":"凤冈县"},{"code":"520328","name":"湄潭县"},{"code":"520329","name":"余庆县"},{"code":"520330","name":"习水县"},{"code":"520381","name":"赤水市"},{"code":"520382","name":"仁怀市"}]},{"code":"5204","name":"安顺市","children":[{"code":"520402","name":"西秀区"},{"code":"520403","name":"平坝区"},{"code":"520422","name":"普定县"},{"code":"520423","name":"镇宁布依族苗族自治县"},{"code":"520424","name":"关岭布依族苗族自治县"},{"code":"520425","name":"紫云苗族布依族自治县"}]},{"code":"5205","name":"毕节市","children":[{"code":"520502","name":"七星关区"},{"code":"520521","name":"大方县"},{"code":"520522","name":"黔西县"},{"code":"520523","name":"金沙县"},{"code":"520524","name":"织金县"},{"code":"520525","name":"纳雍县"},{"code":"520526","name":"威宁彝族回族苗族自治县"},{"code":"520527","name":"赫章县"}]},{"code":"5206","name":"铜仁市","children":[{"code":"520602","name":"碧江区"},{"code":"520603","name":"万山区"},{"code":"520621","name":"江口县"},{"code":"520622","name":"玉屏侗族自治县"},{"code":"520623","name":"石阡县"},{"code":"520624","name":"思南县"},{"code":"520625","name":"印江土家族苗族自治县"},{"code":"520626","name":"德江县"},{"code":"520627","name":"沿河土家族自治县"},{"code":"520628","name":"松桃苗族自治县"}]},{"code":"5223","name":"黔西南布依族苗族自治州","children":[{"code":"522301","name":"兴义市"},{"code":"522302","name":"兴仁市"},{"code":"522323","name":"普安县"},{"code":"522324","name":"晴隆县"},{"code":"522325","name":"贞丰县"},{"code":"522326","name":"望谟县"},{"code":"522327","name":"册亨县"},{"code":"522328","name":"安龙县"}]},{"code":"5226","name":"黔东南苗族侗族自治州","children":[{"code":"522601","name":"凯里市"},{"code":"522622","name":"黄平县"},{"code":"522623","name":"施秉县"},{"code":"522624","name":"三穗县"},{"code":"522625","name":"镇远县"},{"code":"522626","name":"岑巩县"},{"code":"522627","name":"天柱县"},{"code":"522628","name":"锦屏县"},{"code":"522629","name":"剑河县"},{"code":"522630","name":"台江县"},{"code":"522631","name":"黎平县"},{"code":"522632","name":"榕江县"},{"code":"522633","name":"从江县"},{"code":"522634","name":"雷山县"},{"code":"522635","name":"麻江县"},{"code":"522636","name":"丹寨县"}]},{"code":"5227","name":"黔南布依族苗族自治州","children":[{"code":"522701","name":"都匀市"},{"code":"522702","name":"福泉市"},{"code":"522722","name":"荔波县"},{"code":"522723","name":"贵定县"},{"code":"522725","name":"瓮安县"},{"code":"522726","name":"独山县"},{"code":"522727","name":"平塘县"},{"code":"522728","name":"罗甸县"},{"code":"522729","name":"长顺县"},{"code":"522730","name":"龙里县"},{"code":"522731","name":"惠水县"},{"code":"522732","name":"三都水族自治县"}]}]},{"code":"53","name":"云南省","children":[{"code":"5301","name":"昆明市","children":[{"code":"530102","name":"五华区"},{"code":"530103","name":"盘龙区"},{"code":"530111","name":"官渡区"},{"code":"530112","name":"西山区"},{"code":"530113","name":"东川区"},{"code":"530114","name":"呈贡区"},{"code":"530115","name":"晋宁区"},{"code":"530124","name":"富民县"},{"code":"530125","name":"宜良县"},{"code":"530126","name":"石林彝族自治县"},{"code":"530127","name":"嵩明县"},{"code":"530128","name":"禄劝彝族苗族自治县"},{"code":"530129","name":"寻甸回族彝族自治县"},{"code":"530181","name":"安宁市"}]},{"code":"5303","name":"曲靖市","children":[{"code":"530302","name":"麒麟区"},{"code":"530303","name":"沾益区"},{"code":"530304","name":"马龙区"},{"code":"530322","name":"陆良县"},{"code":"530323","name":"师宗县"},{"code":"530324","name":"罗平县"},{"code":"530325","name":"富源县"},{"code":"530326","name":"会泽县"},{"code":"530381","name":"宣威市"}]},{"code":"5304","name":"玉溪市","children":[{"code":"530402","name":"红塔区"},{"code":"530403","name":"江川区"},{"code":"530423","name":"通海县"},{"code":"530424","name":"华宁县"},{"code":"530425","name":"易门县"},{"code":"530426","name":"峨山彝族自治县"},{"code":"530427","name":"新平彝族傣族自治县"},{"code":"530428","name":"元江哈尼族彝族傣族自治县"},{"code":"530481","name":"澄江市"}]},{"code":"5305","name":"保山市","children":[{"code":"530502","name":"隆阳区"},{"code":"530521","name":"施甸县"},{"code":"530523","name":"龙陵县"},{"code":"530524","name":"昌宁县"},{"code":"530581","name":"腾冲市"}]},{"code":"5306","name":"昭通市","children":[{"code":"530602","name":"昭阳区"},{"code":"530621","name":"鲁甸县"},{"code":"530622","name":"巧家县"},{"code":"530623","name":"盐津县"},{"code":"530624","name":"大关县"},{"code":"530625","name":"永善县"},{"code":"530626","name":"绥江县"},{"code":"530627","name":"镇雄县"},{"code":"530628","name":"彝良县"},{"code":"530629","name":"威信县"},{"code":"530681","name":"水富市"}]},{"code":"5307","name":"丽江市","children":[{"code":"530702","name":"古城区"},{"code":"530721","name":"玉龙纳西族自治县"},{"code":"530722","name":"永胜县"},{"code":"530723","name":"华坪县"},{"code":"530724","name":"宁蒗彝族自治县"}]},{"code":"5308","name":"普洱市","children":[{"code":"530802","name":"思茅区"},{"code":"530821","name":"宁洱哈尼族彝族自治县"},{"code":"530822","name":"墨江哈尼族自治县"},{"code":"530823","name":"景东彝族自治县"},{"code":"530824","name":"景谷傣族彝族自治县"},{"code":"530825","name":"镇沅彝族哈尼族拉祜族自治县"},{"code":"530826","name":"江城哈尼族彝族自治县"},{"code":"530827","name":"孟连傣族拉祜族佤族自治县"},{"code":"530828","name":"澜沧拉祜族自治县"},{"code":"530829","name":"西盟佤族自治县"}]},{"code":"5309","name":"临沧市","children":[{"code":"530902","name":"临翔区"},{"code":"530921","name":"凤庆县"},{"code":"530922","name":"云县"},{"code":"530923","name":"永德县"},{"code":"530924","name":"镇康县"},{"code":"530925","name":"双江拉祜族佤族布朗族傣族自治县"},{"code":"530926","name":"耿马傣族佤族自治县"},{"code":"530927","name":"沧源佤族自治县"}]},{"code":"5323","name":"楚雄彝族自治州","children":[{"code":"532301","name":"楚雄市"},{"code":"532322","name":"双柏县"},{"code":"532323","name":"牟定县"},{"code":"532324","name":"南华县"},{"code":"532325","name":"姚安县"},{"code":"532326","name":"大姚县"},{"code":"532327","name":"永仁县"},{"code":"532328","name":"元谋县"},{"code":"532329","name":"武定县"},{"code":"532331","name":"禄丰县"}]},{"code":"5325","name":"红河哈尼族彝族自治州","children":[{"code":"532501","name":"个旧市"},{"code":"532502","name":"开远市"},{"code":"532503","name":"蒙自市"},{"code":"532504","name":"弥勒市"},{"code":"532523","name":"屏边苗族自治县"},{"code":"532524","name":"建水县"},{"code":"532525","name":"石屏县"},{"code":"532527","name":"泸西县"},{"code":"532528","name":"元阳县"},{"code":"532529","name":"红河县"},{"code":"532530","name":"金平苗族瑶族傣族自治县"},{"code":"532531","name":"绿春县"},{"code":"532532","name":"河口瑶族自治县"}]},{"code":"5326","name":"文山壮族苗族自治州","children":[{"code":"532601","name":"文山市"},{"code":"532622","name":"砚山县"},{"code":"532623","name":"西畴县"},{"code":"532624","name":"麻栗坡县"},{"code":"532625","name":"马关县"},{"code":"532626","name":"丘北县"},{"code":"532627","name":"广南县"},{"code":"532628","name":"富宁县"}]},{"code":"5328","name":"西双版纳傣族自治州","children":[{"code":"532801","name":"景洪市"},{"code":"532822","name":"勐海县"},{"code":"532823","name":"勐腊县"}]},{"code":"5329","name":"大理白族自治州","children":[{"code":"532901","name":"大理市"},{"code":"532922","name":"漾濞彝族自治县"},{"code":"532923","name":"祥云县"},{"code":"532924","name":"宾川县"},{"code":"532925","name":"弥渡县"},{"code":"532926","name":"南涧彝族自治县"},{"code":"532927","name":"巍山彝族回族自治县"},{"code":"532928","name":"永平县"},{"code":"532929","name":"云龙县"},{"code":"532930","name":"洱源县"},{"code":"532931","name":"剑川县"},{"code":"532932","name":"鹤庆县"}]},{"code":"5331","name":"德宏傣族景颇族自治州","children":[{"code":"533102","name":"瑞丽市"},{"code":"533103","name":"芒市"},{"code":"533122","name":"梁河县"},{"code":"533123","name":"盈江县"},{"code":"533124","name":"陇川县"}]},{"code":"5333","name":"怒江傈僳族自治州","children":[{"code":"533301","name":"泸水市"},{"code":"533323","name":"福贡县"},{"code":"533324","name":"贡山独龙族怒族自治县"},{"code":"533325","name":"兰坪白族普米族自治县"}]},{"code":"5334","name":"迪庆藏族自治州","children":[{"code":"533401","name":"香格里拉市"},{"code":"533422","name":"德钦县"},{"code":"533423","name":"维西傈僳族自治县"}]}]},{"code":"54","name":"西藏自治区","children":[{"code":"5401","name":"拉萨市","children":[{"code":"540102","name":"城关区"},{"code":"540103","name":"堆龙德庆区"},{"code":"540104","name":"达孜区"},{"code":"540121","name":"林周县"},{"code":"540122","name":"当雄县"},{"code":"540123","name":"尼木县"},{"code":"540124","name":"曲水县"},{"code":"540127","name":"墨竹工卡县"},{"code":"540171","name":"格尔木藏青工业园区"},{"code":"540172","name":"拉萨经济技术开发区"},{"code":"540173","name":"西藏文化旅游创意园区"},{"code":"540174","name":"达孜工业园区"}]},{"code":"5402","name":"日喀则市","children":[{"code":"540202","name":"桑珠孜区"},{"code":"540221","name":"南木林县"},{"code":"540222","name":"江孜县"},{"code":"540223","name":"定日县"},{"code":"540224","name":"萨迦县"},{"code":"540225","name":"拉孜县"},{"code":"540226","name":"昂仁县"},{"code":"540227","name":"谢通门县"},{"code":"540228","name":"白朗县"},{"code":"540229","name":"仁布县"},{"code":"540230","name":"康马县"},{"code":"540231","name":"定结县"},{"code":"540232","name":"仲巴县"},{"code":"540233","name":"亚东县"},{"code":"540234","name":"吉隆县"},{"code":"540235","name":"聂拉木县"},{"code":"540236","name":"萨嘎县"},{"code":"540237","name":"岗巴县"}]},{"code":"5403","name":"昌都市","children":[{"code":"540302","name":"卡若区"},{"code":"540321","name":"江达县"},{"code":"540322","name":"贡觉县"},{"code":"540323","name":"类乌齐县"},{"code":"540324","name":"丁青县"},{"code":"540325","name":"察雅县"},{"code":"540326","name":"八宿县"},{"code":"540327","name":"左贡县"},{"code":"540328","name":"芒康县"},{"code":"540329","name":"洛隆县"},{"code":"540330","name":"边坝县"}]},{"code":"5404","name":"林芝市","children":[{"code":"540402","name":"巴宜区"},{"code":"540421","name":"工布江达县"},{"code":"540422","name":"米林县"},{"code":"540423","name":"墨脱县"},{"code":"540424","name":"波密县"},{"code":"540425","name":"察隅县"},{"code":"540426","name":"朗县"}]},{"code":"5405","name":"山南市","children":[{"code":"540502","name":"乃东区"},{"code":"540521","name":"扎囊县"},{"code":"540522","name":"贡嘎县"},{"code":"540523","name":"桑日县"},{"code":"540524","name":"琼结县"},{"code":"540525","name":"曲松县"},{"code":"540526","name":"措美县"},{"code":"540527","name":"洛扎县"},{"code":"540528","name":"加查县"},{"code":"540529","name":"隆子县"},{"code":"540530","name":"错那县"},{"code":"540531","name":"浪卡子县"}]},{"code":"5406","name":"那曲市","children":[{"code":"540602","name":"色尼区"},{"code":"540621","name":"嘉黎县"},{"code":"540622","name":"比如县"},{"code":"540623","name":"聂荣县"},{"code":"540624","name":"安多县"},{"code":"540625","name":"申扎县"},{"code":"540626","name":"索县"},{"code":"540627","name":"班戈县"},{"code":"540628","name":"巴青县"},{"code":"540629","name":"尼玛县"},{"code":"540630","name":"双湖县"}]},{"code":"5425","name":"阿里地区","children":[{"code":"542521","name":"普兰县"},{"code":"542522","name":"札达县"},{"code":"542523","name":"噶尔县"},{"code":"542524","name":"日土县"},{"code":"542525","name":"革吉县"},{"code":"542526","name":"改则县"},{"code":"542527","name":"措勤县"}]}]},{"code":"61","name":"陕西省","children":[{"code":"6101","name":"西安市","children":[{"code":"610102","name":"新城区"},{"code":"610103","name":"碑林区"},{"code":"610104","name":"莲湖区"},{"code":"610111","name":"灞桥区"},{"code":"610112","name":"未央区"},{"code":"610113","name":"雁塔区"},{"code":"610114","name":"阎良区"},{"code":"610115","name":"临潼区"},{"code":"610116","name":"长安区"},{"code":"610117","name":"高陵区"},{"code":"610118","name":"鄠邑区"},{"code":"610122","name":"蓝田县"},{"code":"610124","name":"周至县"}]},{"code":"6102","name":"铜川市","children":[{"code":"610202","name":"王益区"},{"code":"610203","name":"印台区"},{"code":"610204","name":"耀州区"},{"code":"610222","name":"宜君县"}]},{"code":"6103","name":"宝鸡市","children":[{"code":"610302","name":"渭滨区"},{"code":"610303","name":"金台区"},{"code":"610304","name":"陈仓区"},{"code":"610322","name":"凤翔县"},{"code":"610323","name":"岐山县"},{"code":"610324","name":"扶风县"},{"code":"610326","name":"眉县"},{"code":"610327","name":"陇县"},{"code":"610328","name":"千阳县"},{"code":"610329","name":"麟游县"},{"code":"610330","name":"凤县"},{"code":"610331","name":"太白县"}]},{"code":"6104","name":"咸阳市","children":[{"code":"610402","name":"秦都区"},{"code":"610403","name":"杨陵区"},{"code":"610404","name":"渭城区"},{"code":"610422","name":"三原县"},{"code":"610423","name":"泾阳县"},{"code":"610424","name":"乾县"},{"code":"610425","name":"礼泉县"},{"code":"610426","name":"永寿县"},{"code":"610428","name":"长武县"},{"code":"610429","name":"旬邑县"},{"code":"610430","name":"淳化县"},{"code":"610431","name":"武功县"},{"code":"610481","name":"兴平市"},{"code":"610482","name":"彬州市"}]},{"code":"6105","name":"渭南市","children":[{"code":"610502","name":"临渭区"},{"code":"610503","name":"华州区"},{"code":"610522","name":"潼关县"},{"code":"610523","name":"大荔县"},{"code":"610524","name":"合阳县"},{"code":"610525","name":"澄城县"},{"code":"610526","name":"蒲城县"},{"code":"610527","name":"白水县"},{"code":"610528","name":"富平县"},{"code":"610581","name":"韩城市"},{"code":"610582","name":"华阴市"}]},{"code":"6106","name":"延安市","children":[{"code":"610602","name":"宝塔区"},{"code":"610603","name":"安塞区"},{"code":"610621","name":"延长县"},{"code":"610622","name":"延川县"},{"code":"610625","name":"志丹县"},{"code":"610626","name":"吴起县"},{"code":"610627","name":"甘泉县"},{"code":"610628","name":"富县"},{"code":"610629","name":"洛川县"},{"code":"610630","name":"宜川县"},{"code":"610631","name":"黄龙县"},{"code":"610632","name":"黄陵县"},{"code":"610681","name":"子长市"}]},{"code":"6107","name":"汉中市","children":[{"code":"610702","name":"汉台区"},{"code":"610703","name":"南郑区"},{"code":"610722","name":"城固县"},{"code":"610723","name":"洋县"},{"code":"610724","name":"西乡县"},{"code":"610725","name":"勉县"},{"code":"610726","name":"宁强县"},{"code":"610727","name":"略阳县"},{"code":"610728","name":"镇巴县"},{"code":"610729","name":"留坝县"},{"code":"610730","name":"佛坪县"}]},{"code":"6108","name":"榆林市","children":[{"code":"610802","name":"榆阳区"},{"code":"610803","name":"横山区"},{"code":"610822","name":"府谷县"},{"code":"610824","name":"靖边县"},{"code":"610825","name":"定边县"},{"code":"610826","name":"绥德县"},{"code":"610827","name":"米脂县"},{"code":"610828","name":"佳县"},{"code":"610829","name":"吴堡县"},{"code":"610830","name":"清涧县"},{"code":"610831","name":"子洲县"},{"code":"610881","name":"神木市"}]},{"code":"6109","name":"安康市","children":[{"code":"610902","name":"汉滨区"},{"code":"610921","name":"汉阴县"},{"code":"610922","name":"石泉县"},{"code":"610923","name":"宁陕县"},{"code":"610924","name":"紫阳县"},{"code":"610925","name":"岚皋县"},{"code":"610926","name":"平利县"},{"code":"610927","name":"镇坪县"},{"code":"610928","name":"旬阳县"},{"code":"610929","name":"白河县"}]},{"code":"6110","name":"商洛市","children":[{"code":"611002","name":"商州区"},{"code":"611021","name":"洛南县"},{"code":"611022","name":"丹凤县"},{"code":"611023","name":"商南县"},{"code":"611024","name":"山阳县"},{"code":"611025","name":"镇安县"},{"code":"611026","name":"柞水县"}]}]},{"code":"62","name":"甘肃省","children":[{"code":"6201","name":"兰州市","children":[{"code":"620102","name":"城关区"},{"code":"620103","name":"七里河区"},{"code":"620104","name":"西固区"},{"code":"620105","name":"安宁区"},{"code":"620111","name":"红古区"},{"code":"620121","name":"永登县"},{"code":"620122","name":"皋兰县"},{"code":"620123","name":"榆中县"},{"code":"620171","name":"兰州新区"}]},{"code":"6202","name":"嘉峪关市","children":[{"code":"620201001","name":"雄关街道"},{"code":"620201002","name":"钢城街道"},{"code":"620201100","name":"新城镇"},{"code":"620201101","name":"峪泉镇"},{"code":"620201102","name":"文殊镇"}]},{"code":"6203","name":"金昌市","children":[{"code":"620302","name":"金川区"},{"code":"620321","name":"永昌县"}]},{"code":"6204","name":"白银市","children":[{"code":"620402","name":"白银区"},{"code":"620403","name":"平川区"},{"code":"620421","name":"靖远县"},{"code":"620422","name":"会宁县"},{"code":"620423","name":"景泰县"}]},{"code":"6205","name":"天水市","children":[{"code":"620502","name":"秦州区"},{"code":"620503","name":"麦积区"},{"code":"620521","name":"清水县"},{"code":"620522","name":"秦安县"},{"code":"620523","name":"甘谷县"},{"code":"620524","name":"武山县"},{"code":"620525","name":"张家川回族自治县"}]},{"code":"6206","name":"武威市","children":[{"code":"620602","name":"凉州区"},{"code":"620621","name":"民勤县"},{"code":"620622","name":"古浪县"},{"code":"620623","name":"天祝藏族自治县"}]},{"code":"6207","name":"张掖市","children":[{"code":"620702","name":"甘州区"},{"code":"620721","name":"肃南裕固族自治县"},{"code":"620722","name":"民乐县"},{"code":"620723","name":"临泽县"},{"code":"620724","name":"高台县"},{"code":"620725","name":"山丹县"}]},{"code":"6208","name":"平凉市","children":[{"code":"620802","name":"崆峒区"},{"code":"620821","name":"泾川县"},{"code":"620822","name":"灵台县"},{"code":"620823","name":"崇信县"},{"code":"620825","name":"庄浪县"},{"code":"620826","name":"静宁县"},{"code":"620881","name":"华亭市"}]},{"code":"6209","name":"酒泉市","children":[{"code":"620902","name":"肃州区"},{"code":"620921","name":"金塔县"},{"code":"620922","name":"瓜州县"},{"code":"620923","name":"肃北蒙古族自治县"},{"code":"620924","name":"阿克塞哈萨克族自治县"},{"code":"620981","name":"玉门市"},{"code":"620982","name":"敦煌市"}]},{"code":"6210","name":"庆阳市","children":[{"code":"621002","name":"西峰区"},{"code":"621021","name":"庆城县"},{"code":"621022","name":"环县"},{"code":"621023","name":"华池县"},{"code":"621024","name":"合水县"},{"code":"621025","name":"正宁县"},{"code":"621026","name":"宁县"},{"code":"621027","name":"镇原县"}]},{"code":"6211","name":"定西市","children":[{"code":"621102","name":"安定区"},{"code":"621121","name":"通渭县"},{"code":"621122","name":"陇西县"},{"code":"621123","name":"渭源县"},{"code":"621124","name":"临洮县"},{"code":"621125","name":"漳县"},{"code":"621126","name":"岷县"}]},{"code":"6212","name":"陇南市","children":[{"code":"621202","name":"武都区"},{"code":"621221","name":"成县"},{"code":"621222","name":"文县"},{"code":"621223","name":"宕昌县"},{"code":"621224","name":"康县"},{"code":"621225","name":"西和县"},{"code":"621226","name":"礼县"},{"code":"621227","name":"徽县"},{"code":"621228","name":"两当县"}]},{"code":"6229","name":"临夏回族自治州","children":[{"code":"622901","name":"临夏市"},{"code":"622921","name":"临夏县"},{"code":"622922","name":"康乐县"},{"code":"622923","name":"永靖县"},{"code":"622924","name":"广河县"},{"code":"622925","name":"和政县"},{"code":"622926","name":"东乡族自治县"},{"code":"622927","name":"积石山保安族东乡族撒拉族自治县"}]},{"code":"6230","name":"甘南藏族自治州","children":[{"code":"623001","name":"合作市"},{"code":"623021","name":"临潭县"},{"code":"623022","name":"卓尼县"},{"code":"623023","name":"舟曲县"},{"code":"623024","name":"迭部县"},{"code":"623025","name":"玛曲县"},{"code":"623026","name":"碌曲县"},{"code":"623027","name":"夏河县"}]}]},{"code":"63","name":"青海省","children":[{"code":"6301","name":"西宁市","children":[{"code":"630102","name":"城东区"},{"code":"630103","name":"城中区"},{"code":"630104","name":"城西区"},{"code":"630105","name":"城北区"},{"code":"630106","name":"湟中区"},{"code":"630121","name":"大通回族土族自治县"},{"code":"630123","name":"湟源县"}]},{"code":"6302","name":"海东市","children":[{"code":"630202","name":"乐都区"},{"code":"630203","name":"平安区"},{"code":"630222","name":"民和回族土族自治县"},{"code":"630223","name":"互助土族自治县"},{"code":"630224","name":"化隆回族自治县"},{"code":"630225","name":"循化撒拉族自治县"}]},{"code":"6322","name":"海北藏族自治州","children":[{"code":"632221","name":"门源回族自治县"},{"code":"632222","name":"祁连县"},{"code":"632223","name":"海晏县"},{"code":"632224","name":"刚察县"}]},{"code":"6323","name":"黄南藏族自治州","children":[{"code":"632321","name":"同仁县"},{"code":"632322","name":"尖扎县"},{"code":"632323","name":"泽库县"},{"code":"632324","name":"河南蒙古族自治县"}]},{"code":"6325","name":"海南藏族自治州","children":[{"code":"632521","name":"共和县"},{"code":"632522","name":"同德县"},{"code":"632523","name":"贵德县"},{"code":"632524","name":"兴海县"},{"code":"632525","name":"贵南县"}]},{"code":"6326","name":"果洛藏族自治州","children":[{"code":"632621","name":"玛沁县"},{"code":"632622","name":"班玛县"},{"code":"632623","name":"甘德县"},{"code":"632624","name":"达日县"},{"code":"632625","name":"久治县"},{"code":"632626","name":"玛多县"}]},{"code":"6327","name":"玉树藏族自治州","children":[{"code":"632701","name":"玉树市"},{"code":"632722","name":"杂多县"},{"code":"632723","name":"称多县"},{"code":"632724","name":"治多县"},{"code":"632725","name":"囊谦县"},{"code":"632726","name":"曲麻莱县"}]},{"code":"6328","name":"海西蒙古族藏族自治州","children":[{"code":"632801","name":"格尔木市"},{"code":"632802","name":"德令哈市"},{"code":"632803","name":"茫崖市"},{"code":"632821","name":"乌兰县"},{"code":"632822","name":"都兰县"},{"code":"632823","name":"天峻县"},{"code":"632857","name":"大柴旦行政委员会"}]}]},{"code":"64","name":"宁夏回族自治区","children":[{"code":"6401","name":"银川市","children":[{"code":"640104","name":"兴庆区"},{"code":"640105","name":"西夏区"},{"code":"640106","name":"金凤区"},{"code":"640121","name":"永宁县"},{"code":"640122","name":"贺兰县"},{"code":"640181","name":"灵武市"}]},{"code":"6402","name":"石嘴山市","children":[{"code":"640202","name":"大武口区"},{"code":"640205","name":"惠农区"},{"code":"640221","name":"平罗县"}]},{"code":"6403","name":"吴忠市","children":[{"code":"640302","name":"利通区"},{"code":"640303","name":"红寺堡区"},{"code":"640323","name":"盐池县"},{"code":"640324","name":"同心县"},{"code":"640381","name":"青铜峡市"}]},{"code":"6404","name":"固原市","children":[{"code":"640402","name":"原州区"},{"code":"640422","name":"西吉县"},{"code":"640423","name":"隆德县"},{"code":"640424","name":"泾源县"},{"code":"640425","name":"彭阳县"}]},{"code":"6405","name":"中卫市","children":[{"code":"640502","name":"沙坡头区"},{"code":"640521","name":"中宁县"},{"code":"640522","name":"海原县"}]}]},{"code":"65","name":"新疆维吾尔自治区","children":[{"code":"6501","name":"乌鲁木齐市","children":[{"code":"650102","name":"天山区"},{"code":"650103","name":"沙依巴克区"},{"code":"650104","name":"新市区"},{"code":"650105","name":"水磨沟区"},{"code":"650106","name":"头屯河区"},{"code":"650107","name":"达坂城区"},{"code":"650109","name":"米东区"},{"code":"650121","name":"乌鲁木齐县"}]},{"code":"6502","name":"克拉玛依市","children":[{"code":"650202","name":"独山子区"},{"code":"650203","name":"克拉玛依区"},{"code":"650204","name":"白碱滩区"},{"code":"650205","name":"乌尔禾区"}]},{"code":"6504","name":"吐鲁番市","children":[{"code":"650402","name":"高昌区"},{"code":"650421","name":"鄯善县"},{"code":"650422","name":"托克逊县"}]},{"code":"6505","name":"哈密市","children":[{"code":"650502","name":"伊州区"},{"code":"650521","name":"巴里坤哈萨克自治县"},{"code":"650522","name":"伊吾县"}]},{"code":"6523","name":"昌吉回族自治州","children":[{"code":"652301","name":"昌吉市"},{"code":"652302","name":"阜康市"},{"code":"652323","name":"呼图壁县"},{"code":"652324","name":"玛纳斯县"},{"code":"652325","name":"奇台县"},{"code":"652327","name":"吉木萨尔县"},{"code":"652328","name":"木垒哈萨克自治县"}]},{"code":"6527","name":"博尔塔拉蒙古自治州","children":[{"code":"652701","name":"博乐市"},{"code":"652702","name":"阿拉山口市"},{"code":"652722","name":"精河县"},{"code":"652723","name":"温泉县"}]},{"code":"6528","name":"巴音郭楞蒙古自治州","children":[{"code":"652801","name":"库尔勒市"},{"code":"652822","name":"轮台县"},{"code":"652823","name":"尉犁县"},{"code":"652824","name":"若羌县"},{"code":"652825","name":"且末县"},{"code":"652826","name":"焉耆回族自治县"},{"code":"652827","name":"和静县"},{"code":"652828","name":"和硕县"},{"code":"652829","name":"博湖县"},{"code":"652871","name":"库尔勒经济技术开发区"}]},{"code":"6529","name":"阿克苏地区","children":[{"code":"652901","name":"阿克苏市"},{"code":"652902","name":"库车市"},{"code":"652922","name":"温宿县"},{"code":"652924","name":"沙雅县"},{"code":"652925","name":"新和县"},{"code":"652926","name":"拜城县"},{"code":"652927","name":"乌什县"},{"code":"652928","name":"阿瓦提县"},{"code":"652929","name":"柯坪县"}]},{"code":"6530","name":"克孜勒苏柯尔克孜自治州","children":[{"code":"653001","name":"阿图什市"},{"code":"653022","name":"阿克陶县"},{"code":"653023","name":"阿合奇县"},{"code":"653024","name":"乌恰县"}]},{"code":"6531","name":"喀什地区","children":[{"code":"653101","name":"喀什市"},{"code":"653121","name":"疏附县"},{"code":"653122","name":"疏勒县"},{"code":"653123","name":"英吉沙县"},{"code":"653124","name":"泽普县"},{"code":"653125","name":"莎车县"},{"code":"653126","name":"叶城县"},{"code":"653127","name":"麦盖提县"},{"code":"653128","name":"岳普湖县"},{"code":"653129","name":"伽师县"},{"code":"653130","name":"巴楚县"},{"code":"653131","name":"塔什库尔干塔吉克自治县"}]},{"code":"6532","name":"和田地区","children":[{"code":"653201","name":"和田市"},{"code":"653221","name":"和田县"},{"code":"653222","name":"墨玉县"},{"code":"653223","name":"皮山县"},{"code":"653224","name":"洛浦县"},{"code":"653225","name":"策勒县"},{"code":"653226","name":"于田县"},{"code":"653227","name":"民丰县"}]},{"code":"6540","name":"伊犁哈萨克自治州","children":[{"code":"654002","name":"伊宁市"},{"code":"654003","name":"奎屯市"},{"code":"654004","name":"霍尔果斯市"},{"code":"654021","name":"伊宁县"},{"code":"654022","name":"察布查尔锡伯自治县"},{"code":"654023","name":"霍城县"},{"code":"654024","name":"巩留县"},{"code":"654025","name":"新源县"},{"code":"654026","name":"昭苏县"},{"code":"654027","name":"特克斯县"},{"code":"654028","name":"尼勒克县"}]},{"code":"6542","name":"塔城地区","children":[{"code":"654201","name":"塔城市"},{"code":"654202","name":"乌苏市"},{"code":"654221","name":"额敏县"},{"code":"654223","name":"沙湾县"},{"code":"654224","name":"托里县"},{"code":"654225","name":"裕民县"},{"code":"654226","name":"和布克赛尔蒙古自治县"}]},{"code":"6543","name":"阿勒泰地区","children":[{"code":"654301","name":"阿勒泰市"},{"code":"654321","name":"布尔津县"},{"code":"654322","name":"富蕴县"},{"code":"654323","name":"福海县"},{"code":"654324","name":"哈巴河县"},{"code":"654325","name":"青河县"},{"code":"654326","name":"吉木乃县"}]},{"code":"6590","name":"自治区直辖县级行政区划","children":[{"code":"659001","name":"石河子市"},{"code":"659002","name":"阿拉尔市"},{"code":"659003","name":"图木舒克市"},{"code":"659004","name":"五家渠市"},{"code":"659005","name":"北屯市"},{"code":"659006","name":"铁门关市"},{"code":"659007","name":"双河市"},{"code":"659008","name":"可克达拉市"},{"code":"659009","name":"昆玉市"},{"code":"659010","name":"胡杨河市"}]}]}]');}, function (e) {e.exports = JSON.parse('["赵","钱","孙","李","周","吴","郑","王","冯","陈","楮","卫","蒋","沈","韩","杨","朱","秦","尤","许","何","吕","施","张","孔","曹","严","华","金","魏","陶","姜","戚","谢","邹","喻","柏","水","窦","章","云","苏","潘","葛","奚","范","彭","郎","鲁","韦","昌","马","苗","凤","花","方","俞","任","袁","柳","酆","鲍","史","唐","费","廉","岑","薛","雷","贺","倪","汤","滕","殷","罗","毕","郝","邬","安","常","乐","于","时","傅","皮","卞","齐","康","伍","余","元","卜","顾","孟","平","黄","和","穆","萧","尹","姚","邵","湛","汪","祁","毛","禹","狄","米","贝","明","臧","计","伏","成","戴","谈","宋","茅","庞","熊","纪","舒","屈","项","祝","董","梁","杜","阮","蓝","闽","席","季","麻","强","贾","路","娄","危","江","童","颜","郭","梅","盛","林","刁","锺","徐","丘","骆","高","夏","蔡","田","樊","胡","凌","霍","虞","万","支","柯","昝","管","卢","莫","经","房","裘","缪","干","解","应","宗","丁","宣","贲","邓","郁","单","杭","洪","包","诸","左","石","崔","吉","钮","龚","程","嵇","邢","滑","裴","陆","荣","翁","荀","羊","於","惠","甄","麹","家","封","芮","羿","储","靳","汲","邴","糜","松","井","段","富","巫","乌","焦","巴","弓","牧","隗","山","谷","车","侯","宓","蓬","全","郗","班","仰","秋","仲","伊","宫","宁","仇","栾","暴","甘","斜","厉","戎","祖","武","符","刘","景","詹","束","龙","叶","幸","司","韶","郜","黎","蓟","薄","印","宿","白","怀","蒲","邰","从","鄂","索","咸","籍","赖","卓","蔺","屠","蒙","池","乔","阴","郁","胥","能","苍","双","闻","莘","党","翟","谭","贡","劳","逄","姬","申","扶","堵","冉","宰","郦","雍","郤","璩","桑","桂","濮","牛","寿","通","边","扈","燕","冀","郏","浦","尚","农","温","别","庄","晏","柴","瞿","阎","充","慕","连","茹","习","宦","艾","鱼","容","向","古","易","慎","戈","廖","庾","终","暨","居","衡","步","都","耿","满","弘","匡","国","文","寇","广","禄","阙","东","欧","殳","沃","利","蔚","越","夔","隆","师","巩","厍","聂","晁","勾","敖","融","冷","訾","辛","阚","那","简","饶","空","曾","毋","沙","乜","养","鞠","须","丰","巢","关","蒯","相","查","后","荆","红","游","竺","权","逑","盖","益","桓","公","万俟","司马","上官","欧阳","夏侯","诸葛","闻人","东方","赫连","皇甫","尉迟","公羊","澹台","公冶","宗政","濮阳","淳于","单于","太叔","申屠","公孙","仲孙","轩辕","令狐","锺离","宇文","长孙","慕容","鲜于","闾丘","司徒","司空","丌官","司寇","仉","督","子车","颛孙","端木","巫马","公西","漆雕","乐正","壤驷","公良","拓拔","夹谷","宰父","谷梁","晋","楚","阎","法","汝","鄢","涂","钦","段干","百里","东郭","南门","呼延","归","海","羊舌","微生","岳","帅","缑","亢","况","后","有","琴","梁丘","左丘","东门","西门","商","牟","佘","佴","伯","赏","南宫","墨","哈","谯","笪","年","爱","阳","佟","第五","言","福"]');}, function (e, n, c) {"use strict";c.r(n);var d = c(1),o = c(0);function a(e, n) {var c;if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (c = r(e)) || n && e && "number" == typeof e.length) {c && (e = c);var d = 0,o = function o() {};return { s: o, n: function n() {return d >= e.length ? { done: !0 } : { done: !1, value: e[d++] };}, e: function e(_e) {throw _e;}, f: o };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var a,m = !0,i = !1;return { s: function s() {c = e[Symbol.iterator]();}, n: function n() {var e = c.next();return m = e.done, e;}, e: function e(_e2) {i = !0, a = _e2;}, f: function f() {try {m || null == c.return || c.return();} finally {if (i) throw a;}} };}function m(e) {return function (e) {if (Array.isArray(e)) return i(e);}(e) || function (e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}(e) || r(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function r(e, n) {if (e) {if ("string" == typeof e) return i(e, n);var c = Object.prototype.toString.call(e).slice(8, -1);return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? i(e, n) : void 0;}}function i(e, n) {(null == n || n > e.length) && (n = e.length);for (var c = 0, d = new Array(n); c < n; c++) {d[c] = e[c];}return d;}function l(e) {return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function h(e, n) {var c = Object.keys(e);if (Object.getOwnPropertySymbols) {var d = Object.getOwnPropertySymbols(e);n && (d = d.filter(function (n) {return Object.getOwnPropertyDescriptor(e, n).enumerable;})), c.push.apply(c, d);}return c;}function t(e) {for (var n = 1; n < arguments.length; n++) {var c = null != arguments[n] ? arguments[n] : {};n % 2 ? h(Object(c), !0).forEach(function (n) {u(e, n, c[n]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(c)) : h(Object(c)).forEach(function (n) {Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(c, n));});}return e;}function u(e, n, c) {return n in e ? Object.defineProperty(e, n, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = c, e;}function f(e, n) {if (null == e) return {};var c,d,o = function (e, n) {if (null == e) return {};var c,d,o = {},a = Object.keys(e);for (d = 0; d < a.length; d++) {c = a[d], n.indexOf(c) >= 0 || (o[c] = e[c]);}return o;}(e, n);if (Object.getOwnPropertySymbols) {var a = Object.getOwnPropertySymbols(e);for (d = 0; d < a.length; d++) {c = a[d], n.indexOf(c) >= 0 || Object.prototype.propertyIsEnumerable.call(e, c) && (o[c] = e[c]);}}return o;}var p = ["行政区划"];o.forEach(function (e) {e.children && e.children.forEach(function (n, c) {~p.findIndex(function (e) {return ~n.name.indexOf(e);}) && (e.children = e.children.concat(n.children || []), e.children.splice(c, 1));});});var s = o.reduce(function (e, n) {n.children;var c = f(n, ["children"]);return e.concat(c);}, []),v = o.reduce(function (e, n) {return e.concat(n.children ? n.children.map(function (e) {e.children;return t(t({}, f(e, ["children"])), {}, { provinceCode: n.code });}) : []);}, []),g = o.reduce(function (e, n) {var c = n.code;return e.concat(n.children ? n.children.reduce(function (e, n) {var d = n.code;return e.concat(n.children ? n.children.map(function (e) {e.children;return t(t({}, f(e, ["children"])), {}, { cityCode: d, provinceCode: c });}) : []);}, []) : []);}, []),y = JSON.stringify(s),b = JSON.stringify(v),O = JSON.stringify(g);s.length, v.length, g.length;var x = function x(e) {var n = [];return ["省", "市", "区", "县", "镇"].forEach(function (c) {var d,o = (d = c, e.findIndex(function (e) {return ~e.indexOf(d);}));~o && n.push(e.splice(o, 1)[0]);}), [].concat(n, m(e));},S = function S(e, n) {var c = n.province || [],d = n.city || [],o = n.area || [],a = [],m = "";if (0 === c.length) {for (var r = 1; r < e.length; r++) {var i = e.substring(0, r + 1),l = new RegExp('{"code":"[0-9]{1,6}","name":"'.concat(i, '[一-龥]*?"}'), "g"),h = y.match(l);if (!h) break;var t = JSON.parse(h[0]);1 === h.length && (m = i, (c = []).push(t));}c[0] && (e = e.replace(new RegExp(m, "g"), ""));}if (0 === d.length) {for (var u = 1; u < e.length; u++) {var f = e.substring(0, u + 1),p = new RegExp('{"code":"[0-9]{1,6}","name":"'.concat(f, '[一-龥]*?","provinceCode":"').concat(c[0] ? "".concat(c[0].code) : "[0-9]{1,6}", '"}'), "g"),s = b.match(p);if (!s) break;var v = JSON.parse(s[0]);1 === s.length && (m = f, (d = []).push(v));}if (d[0]) {var g = d[0].provinceCode;if (e = e.replace(new RegExp(m, "g"), ""), 0 === c.length) {var x = new RegExp('{"code":"'.concat(g, '","name":"[一-龥]+?"}'), "g"),S = y.match(x);c.push(JSON.parse(S[0]));}}}if (0 === o.length) {for (var j = 1; j < e.length; j++) {var w = e.substring(0, j + 1),E = new RegExp('{"code":"[0-9]{1,9}","name":"'.concat(w, '[一-龥]*?","cityCode":"').concat(d[0] ? d[0].code : "[0-9]{1,6}", '","provinceCode":"').concat(c[0] ? "".concat(c[0].code) : "[0-9]{1,6}", '"}'), "g"),k = O.match(E);if (!k) break;var P = JSON.parse(k[0]);1 === k.length && (m = w, (o = []).push(P));}if (o[0]) {var C = o[0],A = C.provinceCode,R = C.cityCode;if (e = e.replace(m, ""), 0 === c.length) {var J = new RegExp('{"code":"'.concat(A, '","name":"[一-龥]+?"}'), "g"),N = y.match(J);c.push(JSON.parse(N[0]));}if (0 === d.length) {var $ = new RegExp('{"code":"'.concat(R, '","name":"[一-龥]+?","provinceCode":"').concat(A, '"}'), "g"),I = b.match($);d.push(JSON.parse(I[0]));}}}return e.length > 0 && a.push(e), { province: c, city: d, area: o, detail: a };},j = function j(e, n) {var c = [],d = [],o = [],m = [];if (n.province[0]) c = n.province;else {var r,i = a(s);try {for (i.s(); !(r = i.n()).done;) {for (var l = r.value, h = l.name, t = "", u = h.length; u > 1; u--) {var f = h.substring(0, u);if (0 === e.indexOf(f)) {t = f;break;}}if (t) {c.push(l), e = e.replace(new RegExp(t, "g"), "");break;}}} catch (e) {i.e(e);} finally {i.f();}}if (n.city[0]) d = n.city;else {var p,y = a(v);try {var b = function b() {var n = p.value,o = n.name,a = n.provinceCode,m = c[0];if (m) {if (m.code === a) {for (var r = "", i = o.length; i > 1; i--) {var l = o.substring(0, i);if (0 === e.indexOf(l)) {r = l;break;}}if (r) return d.push(n), e = e.replace(new RegExp(r, "g"), ""), "break";}} else {for (var h = o.length; h > 1; h--) {var t = o.substring(0, h);if (0 === e.indexOf(t)) {d.push(n), c.push(s.find(function (e) {return e.code === a;})), e = e.replace(t, "");break;}}if (d.length > 0) return "break";}};for (y.s(); !(p = y.n()).done;) {if ("break" === b()) break;}} catch (e) {y.e(e);} finally {y.f();}}var O,x = a(g);try {var S = function S() {var n = O.value,a = n.name,m = n.provinceCode,r = n.cityCode,i = c[0],l = d[0];if (i || l) {if (i && i.code === m || (l && l.code) === r) {for (var h = "", t = a.length; t > 1; t--) {var u = a.substring(0, t);if (0 === e.indexOf(u)) {h = u;break;}}if (h) return o.push(n), !l && d.push(v.find(function (e) {return e.code === r;})), !i && c.push(s.find(function (e) {return e.code === m;})), e = e.replace(h, ""), "break";}} else {for (var f = a.length; f > 1; f--) {var p = a.substring(0, f);if (0 === e.indexOf(p)) {o.push(n), d.push(v.find(function (e) {return e.code === r;})), c.push(s.find(function (e) {return e.code === m;})), e = e.replace(p, "");break;}}if (o.length > 0) return "break";}};for (x.s(); !(O = x.n()).done;) {if ("break" === S()) break;}} catch (e) {x.e(e);} finally {x.f();}return e.length > 0 && m.push(e), { province: c, city: d, area: o, detail: m };},w = function w(e, n) {if (!e || !/[\u4E00-\u9FA5]/.test(e)) return "";if (["先生", "小姐", "同志", "哥哥", "姐姐", "妹妹", "弟弟", "妈妈", "爸爸", "爷爷", "奶奶", "姑姑", "舅舅"].find(function (n) {return ~e.indexOf(n);})) return e;if (~["街道", "乡镇", "镇", "乡"].findIndex(function (n) {return ~e.indexOf(n);})) return "";var c = e.substring(0, 1);return e.length <= n && e.length > 1 && ~d.indexOf(c) ? e : "";},E = function E(e) {var n = "";e = (e = (e = (e = e.replace(/(\d{3})-(\d{4})-(\d{4})/g, "$1$2$3")).replace(/(\d{3}) (\d{4}) (\d{4})/g, "$1$2$3")).replace(/(\d{4}) \d{4} \d{4}/g, "$1$2$3")).replace(/(\d{4})/g, "$1");var c = /(\d{7,12})|(\d{3,4}-\d{6,8})|(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g.exec(e);return c && (n = c[0], e = e.replace(c[0], " ")), { address: e, phone: n };},k = function k(e) {var n = "",c = /\d{6}/g.exec(e);return c && (n = c[0], e = e.replace(c[0], " ")), { address: e, postalCode: n };},P = function P(e) {var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];e = e.replace(/\r\n/g, " ").replace(/\n/g, " ").replace(/\t/g, " ");var c = ["详细地址", "收货地址", "收件地址", "地址", "所在地区", "地区", "姓名", "收货人", "收件人", "联系人", "收", "邮编", "联系电话", "电话", "联系人手机号码", "手机号码", "手机号", "自治区直辖县级行政区划", "省直辖县级行政区划"].concat(n);c.forEach(function (n) {e = e.replace(new RegExp(n, "g"), " ");});var d = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]", "g");return e = (e = e.replace(d, " ")).replace(/ {2,}/g, " ");};n.default = function (e, n) {var c = "object" === l(n) ? n : "number" == typeof n ? { type: n } : {},d = c.type,o = void 0 === d ? 0 : d,a = c.textFilter,r = void 0 === a ? [] : a,i = c.nameMaxLength,h = void 0 === i ? 4 : i;if (!e) return {};var t = { phone: "", province: [], city: [], area: [], detail: [], name: "" };e = P(e, r);var u = E(e);e = u.address, t.phone = u.phone;var f = k(e);e = f.address, t.postalCode = f.postalCode;var p = e.split(" ").filter(function (e) {return e;}).map(function (e) {return e.trim();});p = x(p);new Date().getTime();p.forEach(function (e, n) {if (t.province[0] && t.city[0] && t.area[0]) t.detail.push(e);else {var c = {};1 === o && (c = j(e, t)), 0 === o && (c = S(e, t));var d = c,a = d.province,m = d.city,r = d.area,i = d.detail;t.province = a || [], t.area = r || [], t.city = m || [], t.detail = t.detail.concat(i || []);}});new Date().getTime();var s = t.province[0],v = t.city[0],g = t.area[0],y = t.detail;if (y = y.map(function (e) {return e.replace(new RegExp("".concat(s && s.name, "|").concat(v && v.name, "|").concat(g && g.name), "g"), "");}), (y = Array.from(new Set(y))) && y.length > 0) {var b = m(y).filter(function (e) {return !!e;});b.sort(function (e, n) {return e.length - n.length;});var O = b.findIndex(function (e) {return w(e, h);}),C = "";~O ? C = b[O] : b[0].length <= h && /[\u4E00-\u9FA5]/.test(b[0]) && (C = b[0]), C && (t.name = C, y.splice(y.findIndex(function (e) {return e === C;}), 1));}JSON.stringify(t);var A = s && s.name,R = v && v.name;return ~["市辖区", "区", "县", "镇"].indexOf(R) && (R = A), Object.assign(t, { province: A || "", city: R || "", area: g && g.name || "", detail: y && y.length > 0 && y.join("") || "" });};}]).default;});

/***/ }),

/***/ 427:
/*!*********************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/index.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 428));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 429));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 430));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 428:
/*!********************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/en.json ***!
  \********************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.SUN, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"select date\",\"uni-datetime-picker.selectTime\":\"select time\",\"uni-datetime-picker.selectDateTime\":\"select datetime\",\"uni-datetime-picker.startDate\":\"start date\",\"uni-datetime-picker.endDate\":\"end date\",\"uni-datetime-picker.startTime\":\"start time\",\"uni-datetime-picker.endTime\":\"end time\",\"uni-datetime-picker.ok\":\"ok\",\"uni-datetime-picker.clear\":\"clear\",\"uni-datetime-picker.cancel\":\"cancel\",\"uni-calender.MON\":\"MON\",\"uni-calender.TUE\":\"TUE\",\"uni-calender.WED\":\"WED\",\"uni-calender.THU\":\"THU\",\"uni-calender.FRI\":\"FRI\",\"uni-calender.SAT\":\"SAT\",\"uni-calender.SUN\":\"SUN\"}");

/***/ }),

/***/ 429:
/*!*************************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hans.json ***!
  \*************************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"选择日期\",\"uni-datetime-picker.selectTime\":\"选择时间\",\"uni-datetime-picker.selectDateTime\":\"选择日期时间\",\"uni-datetime-picker.startDate\":\"开始日期\",\"uni-datetime-picker.endDate\":\"结束日期\",\"uni-datetime-picker.startTime\":\"开始时间\",\"uni-datetime-picker.endTime\":\"结束时间\",\"uni-datetime-picker.ok\":\"确定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 430:
/*!*************************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hant.json ***!
  \*************************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"選擇日期\",\"uni-datetime-picker.selectTime\":\"選擇時間\",\"uni-datetime-picker.selectDateTime\":\"選擇日期時間\",\"uni-datetime-picker.startDate\":\"開始日期\",\"uni-datetime-picker.endDate\":\"結束日期\",\"uni-datetime-picker.startTime\":\"開始时间\",\"uni-datetime-picker.endTime\":\"結束时间\",\"uni-datetime-picker.ok\":\"確定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 438:
/*!**********************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-picker.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 = {
  props: {
    localdata: {
      type: [Array, Object],
      default: function _default() {
        return [];
      } },

    spaceInfo: {
      type: Object,
      default: function _default() {
        return {};
      } },

    collection: {
      type: String,
      default: '' },

    action: {
      type: String,
      default: '' },

    field: {
      type: String,
      default: '' },

    orderby: {
      type: String,
      default: '' },

    where: {
      type: [String, Object],
      default: '' },

    pageData: {
      type: String,
      default: 'add' },

    pageCurrent: {
      type: Number,
      default: 1 },

    pageSize: {
      type: Number,
      default: 20 },

    getcount: {
      type: [Boolean, String],
      default: false },

    getone: {
      type: [Boolean, String],
      default: false },

    gettree: {
      type: [Boolean, String],
      default: false },

    manual: {
      type: Boolean,
      default: false },

    value: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    modelValue: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    preload: {
      type: Boolean,
      default: false },

    stepSearh: {
      type: Boolean,
      default: true },

    selfField: {
      type: String,
      default: '' },

    parentField: {
      type: String,
      default: '' },

    multiple: {
      type: Boolean,
      default: false },

    map: {
      type: Object,
      default: function _default() {
        return {
          text: "text",
          value: "value" };

      } } },


  data: function data() {
    return {
      loading: false,
      errorMessage: '',
      loadMore: {
        contentdown: '',
        contentrefresh: '',
        contentnomore: '' },

      dataList: [],
      selected: [],
      selectedIndex: 0,
      page: {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0 } };


  },
  computed: {
    isLocaldata: function isLocaldata() {
      return !this.collection.length;
    },
    postField: function postField() {
      var fields = [this.field];
      if (this.parentField) {
        fields.push("".concat(this.parentField, " as parent_value"));
      }
      return fields.join(',');
    },
    dataValue: function dataValue() {
      var isModelValue = Array.isArray(this.modelValue) ? this.modelValue.length > 0 : this.modelValue !== null || this.modelValue !== undefined;
      return isModelValue ? this.modelValue : this.value;
    },
    hasValue: function hasValue() {
      if (typeof this.dataValue === 'number') {
        return true;
      }
      return this.dataValue != null && this.dataValue.length > 0;
    } },

  created: function created() {var _this = this;
    this.$watch(function () {
      var al = [];
      ['pageCurrent',
      'pageSize',
      'spaceInfo',
      'value',
      'modelValue',
      'localdata',
      'collection',
      'action',
      'field',
      'orderby',
      'where',
      'getont',
      'getcount',
      'gettree'].
      forEach(function (key) {
        al.push(_this[key]);
      });
      return al;
    }, function (newValue, oldValue) {
      var needReset = false;
      for (var i = 2; i < newValue.length; i++) {
        if (newValue[i] != oldValue[i]) {
          needReset = true;
          break;
        }
      }
      if (newValue[0] != oldValue[0]) {
        _this.page.current = _this.pageCurrent;
      }
      _this.page.size = _this.pageSize;

      _this.onPropsChange();
    });
    this._treeData = [];
  },
  methods: {
    onPropsChange: function onPropsChange() {
      this._treeData = [];
    },
    getCommand: function getCommand() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      /* eslint-disable no-undef */
      var db = uniCloud.database(this.spaceInfo);

      var action = options.action || this.action;
      if (action) {
        db = db.action(action);
      }

      var collection = options.collection || this.collection;
      db = db.collection(collection);

      var where = options.where || this.where;
      if (!(!where || !Object.keys(where).length)) {
        db = db.where(where);
      }

      var field = options.field || this.field;
      if (field) {
        db = db.field(field);
      }

      var orderby = options.orderby || this.orderby;
      if (orderby) {
        db = db.orderBy(orderby);
      }

      var current = options.pageCurrent !== undefined ? options.pageCurrent : this.page.current;
      var size = options.pageSize !== undefined ? options.pageSize : this.page.size;
      var getCount = options.getcount !== undefined ? options.getcount : this.getcount;
      var getTree = options.gettree !== undefined ? options.gettree : this.gettree;

      var getOptions = {
        getCount: getCount,
        getTree: getTree };

      if (options.getTreePath) {
        getOptions.getTreePath = options.getTreePath;
      }

      db = db.skip(size * (current - 1)).limit(size).get(getOptions);

      return db;
    },
    getNodeData: function getNodeData(callback) {var _this2 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.getCommand({
        field: this.postField,
        where: this._pathWhere() }).
      then(function (res) {
        _this2.loading = false;
        _this2.selected = res.result.data;
        callback && callback();
      }).catch(function (err) {
        _this2.loading = false;
        _this2.errorMessage = err;
      });
    },
    getTreePath: function getTreePath(callback) {var _this3 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        getTreePath: {
          startWith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") } }).

      then(function (res) {
        _this3.loading = false;
        var treePath = [];
        _this3._extractTreePath(res.result.data, treePath);
        _this3.selected = treePath;
        callback && callback();
      }).catch(function (err) {
        _this3.loading = false;
        _this3.errorMessage = err;
      });
    },
    loadData: function loadData() {var _this4 = this;
      if (this.isLocaldata) {
        this._processLocalData();
        return;
      }

      if (this.dataValue != null) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
          _this4._updateSelected();
        });
        return;
      }

      if (this.stepSearh) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
        });
      } else {
        this._loadAllData(function (data) {
          _this4._treeData = [];
          _this4._extractTree(data, _this4._treeData, null);
          _this4._updateBindData();
        });
      }
    },
    _loadAllData: function _loadAllData(callback) {var _this5 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        gettree: true,
        startwith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") }).
      then(function (res) {
        _this5.loading = false;
        callback(res.result.data);
        _this5.onDataChange();
      }).catch(function (err) {
        _this5.loading = false;
        _this5.errorMessage = err;
      });
    },
    _loadNodeData: function _loadNodeData(callback, pw) {var _this6 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        where: pw || this._postWhere(),
        pageSize: 500 }).
      then(function (res) {
        _this6.loading = false;
        callback(res.result.data);
        _this6.onDataChange();
      }).catch(function (err) {
        _this6.loading = false;
        _this6.errorMessage = err;
      });
    },
    _pathWhere: function _pathWhere() {
      var result = [];
      var where_field = this._getParentNameByField();
      if (where_field) {
        result.push("".concat(where_field, " == '").concat(this.dataValue, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _postWhere: function _postWhere() {
      var result = [];
      var selected = this.selected;
      var parentField = this.parentField;
      if (parentField) {
        result.push("".concat(parentField, " == null || ").concat(parentField, " == \"\""));
      }
      if (selected.length) {
        for (var i = 0; i < selected.length - 1; i++) {
          result.push("".concat(parentField, " == '").concat(selected[i].value, "'"));
        }
      }

      var where = [];
      if (this.where) {
        where.push("(".concat(this.where, ")"));
      }
      if (result.length) {
        where.push("(".concat(result.join(' || '), ")"));
      }

      return where.join(' && ');
    },
    _nodeWhere: function _nodeWhere() {
      var result = [];
      var selected = this.selected;
      if (selected.length) {
        result.push("".concat(this.parentField, " == '").concat(selected[selected.length - 1].value, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _getParentNameByField: function _getParentNameByField() {
      var fields = this.field.split(',');
      var where_field = null;
      for (var i = 0; i < fields.length; i++) {
        var items = fields[i].split('as');
        if (items.length < 2) {
          continue;
        }
        if (items[1].trim() === 'value') {
          where_field = items[0].trim();
          break;
        }
      }
      return where_field;
    },
    _isTreeView: function _isTreeView() {
      return this.parentField && this.selfField;
    },
    _updateSelected: function _updateSelected() {
      var dl = this.dataList;
      var sl = this.selected;
      var textField = this.map.text;
      var valueField = this.map.value;
      for (var i = 0; i < sl.length; i++) {
        var value = sl[i].value;
        var dl2 = dl[i];
        for (var j = 0; j < dl2.length; j++) {
          var item2 = dl2[j];
          if (item2[valueField] === value) {
            sl[i].text = item2[textField];
            break;
          }
        }
      }
    },
    _updateBindData: function _updateBindData(node) {var _this$_filterData =



      this._filterData(this._treeData, this.selected),dataList = _this$_filterData.dataList,hasNodes = _this$_filterData.hasNodes;

      var isleaf = this._stepSearh === false && !hasNodes;

      if (node) {
        node.isleaf = isleaf;
      }

      this.dataList = dataList;
      this.selectedIndex = dataList.length - 1;

      if (!isleaf && this.selected.length < dataList.length) {
        this.selected.push({
          value: null,
          text: "请选择" });

      }

      return {
        isleaf: isleaf,
        hasNodes: hasNodes };

    },
    _filterData: function _filterData(data, paths) {
      var dataList = [];
      var hasNodes = true;

      dataList.push(data.filter(function (item) {
        return item.parent_value === null || item.parent_value === undefined || item.parent_value === '';
      }));
      for (var i = 0; i < paths.length; i++) {
        var value = paths[i].value;
        var nodes = data.filter(function (item) {
          return item.parent_value === value;
        });

        if (nodes.length) {
          dataList.push(nodes);
        } else {
          hasNodes = false;
        }
      }

      return {
        dataList: dataList,
        hasNodes: hasNodes };

    },
    _extractTree: function _extractTree(nodes, result, parent_value) {
      var list = result || [];
      var valueField = this.map.value;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        if (parent_value !== null && parent_value !== undefined && parent_value !== '') {
          child.parent_value = parent_value;
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTree(children, result, node[valueField]);
        }
      }
    },
    _extractTreePath: function _extractTreePath(nodes, result) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTreePath(children, result);
        }
      }
    },
    _findNodePath: function _findNodePath(key, nodes) {var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var textField = this.map.text;
      var valueField = this.map.value;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var children = node.children;
        var text = node[textField];
        var value = node[valueField];

        path.push({
          value: value,
          text: text });


        if (value === key) {
          return path;
        }

        if (children) {
          var p = this._findNodePath(key, children, path);
          if (p.length) {
            return p;
          }
        }

        path.pop();
      }
      return [];
    },
    _processLocalData: function _processLocalData() {
      this._treeData = [];
      this._extractTree(this.localdata, this._treeData);

      var inputValue = this.dataValue;
      if (inputValue === undefined) {
        return;
      }

      if (Array.isArray(inputValue)) {
        inputValue = inputValue[inputValue.length - 1];
        if (typeof inputValue === 'object' && inputValue[this.map.value]) {
          inputValue = inputValue[this.map.value];
        }
      }

      this.selected = this._findNodePath(inputValue, this.localdata);
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 18)["default"]))

/***/ }),

/***/ 453:
/*!*****************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/components/lee-select-city/city.json ***!
  \*****************************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"北京市\",\"children\":[{\"name\":\"东城区\",\"latter\":\"D\"},{\"name\":\"西城区\",\"latter\":\"X\"},{\"name\":\"朝阳区\",\"latter\":\"Z\"},{\"name\":\"丰台区\",\"latter\":\"F\"},{\"name\":\"石景山区\",\"latter\":\"S\"},{\"name\":\"海淀区\",\"latter\":\"H\"},{\"name\":\"门头沟区\",\"latter\":\"M\"},{\"name\":\"房山区\",\"latter\":\"F\"},{\"name\":\"通州区\",\"latter\":\"T\"},{\"name\":\"顺义区\",\"latter\":\"S\"},{\"name\":\"昌平区\",\"latter\":\"C\"},{\"name\":\"大兴区\",\"latter\":\"D\"},{\"name\":\"怀柔区\",\"latter\":\"H\"},{\"name\":\"平谷区\",\"latter\":\"P\"},{\"name\":\"密云县\",\"latter\":\"M\"},{\"name\":\"延庆县\",\"latter\":\"Y\"}],\"latter\":\"B\"},{\"name\":\"天津市\",\"children\":[{\"name\":\"和平区\",\"latter\":\"H\"},{\"name\":\"河东区\",\"latter\":\"H\"},{\"name\":\"河西区\",\"latter\":\"H\"},{\"name\":\"南开区\",\"latter\":\"N\"},{\"name\":\"河北区\",\"latter\":\"H\"},{\"name\":\"红桥区\",\"latter\":\"H\"},{\"name\":\"东丽区\",\"latter\":\"D\"},{\"name\":\"西青区\",\"latter\":\"X\"},{\"name\":\"津南区\",\"latter\":\"J\"},{\"name\":\"北辰区\",\"latter\":\"B\"},{\"name\":\"武清区\",\"latter\":\"W\"},{\"name\":\"宝坻区\",\"latter\":\"B\"},{\"name\":\"滨海新区\",\"latter\":\"B\"},{\"name\":\"宁河县\",\"latter\":\"N\"},{\"name\":\"静海县\",\"latter\":\"J\"},{\"name\":\"蓟县\",\"latter\":\"J\"}],\"latter\":\"T\"},{\"name\":\"河北省\",\"children\":[{\"name\":\"石家庄市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"长安区\",\"latter\":\"C\"},{\"name\":\"桥东区\",\"latter\":\"Q\"},{\"name\":\"桥西区\",\"latter\":\"Q\"},{\"name\":\"新华区\",\"latter\":\"X\"},{\"name\":\"井陉矿区\",\"latter\":\"J\"},{\"name\":\"裕华区\",\"latter\":\"Y\"},{\"name\":\"井陉县\",\"latter\":\"J\"},{\"name\":\"正定县\",\"latter\":\"Z\"},{\"name\":\"栾城县\",\"latter\":\"L\"},{\"name\":\"行唐县\",\"latter\":\"H\"},{\"name\":\"灵寿县\",\"latter\":\"L\"},{\"name\":\"高邑县\",\"latter\":\"G\"},{\"name\":\"深泽县\",\"latter\":\"S\"},{\"name\":\"赞皇县\",\"latter\":\"Z\"},{\"name\":\"无极县\",\"latter\":\"W\"},{\"name\":\"平山县\",\"latter\":\"P\"},{\"name\":\"元氏县\",\"latter\":\"Y\"},{\"name\":\"赵县\",\"latter\":\"Z\"},{\"name\":\"辛集市\",\"latter\":\"X\"},{\"name\":\"藁城市\",\"latter\":\"G\"},{\"name\":\"晋州市\",\"latter\":\"J\"},{\"name\":\"新乐市\",\"latter\":\"X\"},{\"name\":\"鹿泉市\",\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"唐山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"路南区\",\"latter\":\"L\"},{\"name\":\"路北区\",\"latter\":\"L\"},{\"name\":\"古冶区\",\"latter\":\"G\"},{\"name\":\"开平区\",\"latter\":\"K\"},{\"name\":\"丰南区\",\"latter\":\"F\"},{\"name\":\"丰润区\",\"latter\":\"F\"},{\"name\":\"曹妃甸区\",\"latter\":\"C\"},{\"name\":\"滦县\",\"latter\":\"L\"},{\"name\":\"滦南县\",\"latter\":\"L\"},{\"name\":\"乐亭县\",\"latter\":\"L\"},{\"name\":\"迁西县\",\"latter\":\"Q\"},{\"name\":\"玉田县\",\"latter\":\"Y\"},{\"name\":\"遵化市\",\"latter\":\"Z\"},{\"name\":\"迁安市\",\"latter\":\"Q\"}],\"latter\":\"T\"},{\"name\":\"秦皇岛市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海港区\",\"latter\":\"H\"},{\"name\":\"山海关区\",\"latter\":\"S\"},{\"name\":\"北戴河区\",\"latter\":\"B\"},{\"name\":\"青龙满族自治县\",\"latter\":\"Q\"},{\"name\":\"昌黎县\",\"latter\":\"C\"},{\"name\":\"抚宁县\",\"latter\":\"F\"},{\"name\":\"卢龙县\",\"latter\":\"L\"}],\"latter\":\"Q\"},{\"name\":\"邯郸市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"邯山区\",\"latter\":\"H\"},{\"name\":\"丛台区\",\"latter\":\"C\"},{\"name\":\"复兴区\",\"latter\":\"F\"},{\"name\":\"峰峰矿区\",\"latter\":\"F\"},{\"name\":\"邯郸县\",\"latter\":\"H\"},{\"name\":\"临漳县\",\"latter\":\"L\"},{\"name\":\"成安县\",\"latter\":\"C\"},{\"name\":\"大名县\",\"latter\":\"D\"},{\"name\":\"涉县\",\"latter\":\"S\"},{\"name\":\"磁县\",\"latter\":\"C\"},{\"name\":\"肥乡县\",\"latter\":\"F\"},{\"name\":\"永年县\",\"latter\":\"Y\"},{\"name\":\"邱县\",\"latter\":\"Q\"},{\"name\":\"鸡泽县\",\"latter\":\"J\"},{\"name\":\"广平县\",\"latter\":\"G\"},{\"name\":\"馆陶县\",\"latter\":\"G\"},{\"name\":\"魏县\",\"latter\":\"W\"},{\"name\":\"曲周县\",\"latter\":\"Q\"},{\"name\":\"武安市\",\"latter\":\"W\"}],\"latter\":\"H\"},{\"name\":\"邢台市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"桥东区\",\"latter\":\"Q\"},{\"name\":\"桥西区\",\"latter\":\"Q\"},{\"name\":\"邢台县\",\"latter\":\"X\"},{\"name\":\"临城县\",\"latter\":\"L\"},{\"name\":\"内丘县\",\"latter\":\"N\"},{\"name\":\"柏乡县\",\"latter\":\"B\"},{\"name\":\"隆尧县\",\"latter\":\"L\"},{\"name\":\"任县\",\"latter\":\"R\"},{\"name\":\"南和县\",\"latter\":\"N\"},{\"name\":\"宁晋县\",\"latter\":\"N\"},{\"name\":\"巨鹿县\",\"latter\":\"J\"},{\"name\":\"新河县\",\"latter\":\"X\"},{\"name\":\"广宗县\",\"latter\":\"G\"},{\"name\":\"平乡县\",\"latter\":\"P\"},{\"name\":\"威县\",\"latter\":\"W\"},{\"name\":\"清河县\",\"latter\":\"Q\"},{\"name\":\"临西县\",\"latter\":\"L\"},{\"name\":\"南宫市\",\"latter\":\"N\"},{\"name\":\"沙河市\",\"latter\":\"S\"}],\"latter\":\"X\"},{\"name\":\"保定市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新市区\",\"latter\":\"X\"},{\"name\":\"北市区\",\"latter\":\"B\"},{\"name\":\"南市区\",\"latter\":\"N\"},{\"name\":\"满城县\",\"latter\":\"M\"},{\"name\":\"清苑县\",\"latter\":\"Q\"},{\"name\":\"涞水县\",\"latter\":\"L\"},{\"name\":\"阜平县\",\"latter\":\"F\"},{\"name\":\"徐水县\",\"latter\":\"X\"},{\"name\":\"定兴县\",\"latter\":\"D\"},{\"name\":\"唐县\",\"latter\":\"T\"},{\"name\":\"高阳县\",\"latter\":\"G\"},{\"name\":\"容城县\",\"latter\":\"R\"},{\"name\":\"涞源县\",\"latter\":\"L\"},{\"name\":\"望都县\",\"latter\":\"W\"},{\"name\":\"安新县\",\"latter\":\"A\"},{\"name\":\"易县\",\"latter\":\"Y\"},{\"name\":\"曲阳县\",\"latter\":\"Q\"},{\"name\":\"蠡县\",\"latter\":\"L\"},{\"name\":\"顺平县\",\"latter\":\"S\"},{\"name\":\"博野县\",\"latter\":\"B\"},{\"name\":\"雄县\",\"latter\":\"X\"},{\"name\":\"涿州市\",\"latter\":\"Z\"},{\"name\":\"定州市\",\"latter\":\"D\"},{\"name\":\"安国市\",\"latter\":\"A\"},{\"name\":\"高碑店市\",\"latter\":\"G\"}],\"latter\":\"B\"},{\"name\":\"张家口市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"桥东区\",\"latter\":\"Q\"},{\"name\":\"桥西区\",\"latter\":\"Q\"},{\"name\":\"宣化区\",\"latter\":\"X\"},{\"name\":\"下花园区\",\"latter\":\"X\"},{\"name\":\"宣化县\",\"latter\":\"X\"},{\"name\":\"张北县\",\"latter\":\"Z\"},{\"name\":\"康保县\",\"latter\":\"K\"},{\"name\":\"沽源县\",\"latter\":\"G\"},{\"name\":\"尚义县\",\"latter\":\"S\"},{\"name\":\"蔚县\",\"latter\":\"W\"},{\"name\":\"阳原县\",\"latter\":\"Y\"},{\"name\":\"怀安县\",\"latter\":\"H\"},{\"name\":\"万全县\",\"latter\":\"W\"},{\"name\":\"怀来县\",\"latter\":\"H\"},{\"name\":\"涿鹿县\",\"latter\":\"Z\"},{\"name\":\"赤城县\",\"latter\":\"C\"},{\"name\":\"崇礼县\",\"latter\":\"C\"}],\"latter\":\"Z\"},{\"name\":\"承德市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"双桥区\",\"latter\":\"S\"},{\"name\":\"双滦区\",\"latter\":\"S\"},{\"name\":\"鹰手营子矿区\",\"latter\":\"Y\"},{\"name\":\"承德县\",\"latter\":\"C\"},{\"name\":\"兴隆县\",\"latter\":\"X\"},{\"name\":\"平泉县\",\"latter\":\"P\"},{\"name\":\"滦平县\",\"latter\":\"L\"},{\"name\":\"隆化县\",\"latter\":\"L\"},{\"name\":\"丰宁满族自治县\",\"latter\":\"F\"},{\"name\":\"宽城满族自治县\",\"latter\":\"K\"},{\"name\":\"围场满族蒙古族自治县\",\"latter\":\"W\"}],\"latter\":\"C\"},{\"name\":\"沧州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新华区\",\"latter\":\"X\"},{\"name\":\"运河区\",\"latter\":\"Y\"},{\"name\":\"沧县\",\"latter\":\"C\"},{\"name\":\"青县\",\"latter\":\"Q\"},{\"name\":\"东光县\",\"latter\":\"D\"},{\"name\":\"海兴县\",\"latter\":\"H\"},{\"name\":\"盐山县\",\"latter\":\"Y\"},{\"name\":\"肃宁县\",\"latter\":\"S\"},{\"name\":\"南皮县\",\"latter\":\"N\"},{\"name\":\"吴桥县\",\"latter\":\"W\"},{\"name\":\"献县\",\"latter\":\"X\"},{\"name\":\"孟村回族自治县\",\"latter\":\"M\"},{\"name\":\"泊头市\",\"latter\":\"B\"},{\"name\":\"任丘市\",\"latter\":\"R\"},{\"name\":\"黄骅市\",\"latter\":\"H\"},{\"name\":\"河间市\",\"latter\":\"H\"}],\"latter\":\"C\"},{\"name\":\"廊坊市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"安次区\",\"latter\":\"A\"},{\"name\":\"广阳区\",\"latter\":\"G\"},{\"name\":\"固安县\",\"latter\":\"G\"},{\"name\":\"永清县\",\"latter\":\"Y\"},{\"name\":\"香河县\",\"latter\":\"X\"},{\"name\":\"大城县\",\"latter\":\"D\"},{\"name\":\"文安县\",\"latter\":\"W\"},{\"name\":\"大厂回族自治县\",\"latter\":\"D\"},{\"name\":\"霸州市\",\"latter\":\"B\"},{\"name\":\"三河市\",\"latter\":\"S\"}],\"latter\":\"L\"},{\"name\":\"衡水市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"桃城区\",\"latter\":\"T\"},{\"name\":\"枣强县\",\"latter\":\"Z\"},{\"name\":\"武邑县\",\"latter\":\"W\"},{\"name\":\"武强县\",\"latter\":\"W\"},{\"name\":\"饶阳县\",\"latter\":\"R\"},{\"name\":\"安平县\",\"latter\":\"A\"},{\"name\":\"故城县\",\"latter\":\"G\"},{\"name\":\"景县\",\"latter\":\"J\"},{\"name\":\"阜城县\",\"latter\":\"F\"},{\"name\":\"冀州市\",\"latter\":\"J\"},{\"name\":\"深州市\",\"latter\":\"S\"}],\"latter\":\"H\"}],\"latter\":\"H\"},{\"name\":\"山西省\",\"children\":[{\"name\":\"太原市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"小店区\",\"latter\":\"X\"},{\"name\":\"迎泽区\",\"latter\":\"Y\"},{\"name\":\"杏花岭区\",\"latter\":\"X\"},{\"name\":\"尖草坪区\",\"latter\":\"J\"},{\"name\":\"万柏林区\",\"latter\":\"W\"},{\"name\":\"晋源区\",\"latter\":\"J\"},{\"name\":\"清徐县\",\"latter\":\"Q\"},{\"name\":\"阳曲县\",\"latter\":\"Y\"},{\"name\":\"娄烦县\",\"latter\":\"L\"},{\"name\":\"古交市\",\"latter\":\"G\"}],\"latter\":\"T\"},{\"name\":\"大同市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城区\",\"latter\":\"C\"},{\"name\":\"矿区\",\"latter\":\"K\"},{\"name\":\"南郊区\",\"latter\":\"N\"},{\"name\":\"新荣区\",\"latter\":\"X\"},{\"name\":\"阳高县\",\"latter\":\"Y\"},{\"name\":\"天镇县\",\"latter\":\"T\"},{\"name\":\"广灵县\",\"latter\":\"G\"},{\"name\":\"灵丘县\",\"latter\":\"L\"},{\"name\":\"浑源县\",\"latter\":\"H\"},{\"name\":\"左云县\",\"latter\":\"Z\"},{\"name\":\"大同县\",\"latter\":\"D\"}],\"latter\":\"D\"},{\"name\":\"阳泉市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城区\",\"latter\":\"C\"},{\"name\":\"矿区\",\"latter\":\"K\"},{\"name\":\"郊区\",\"latter\":\"J\"},{\"name\":\"平定县\",\"latter\":\"P\"},{\"name\":\"盂县\",\"latter\":\"Y\"}],\"latter\":\"Y\"},{\"name\":\"长治市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城区\",\"latter\":\"C\"},{\"name\":\"郊区\",\"latter\":\"J\"},{\"name\":\"长治县\",\"latter\":\"C\"},{\"name\":\"襄垣县\",\"latter\":\"X\"},{\"name\":\"屯留县\",\"latter\":\"T\"},{\"name\":\"平顺县\",\"latter\":\"P\"},{\"name\":\"黎城县\",\"latter\":\"L\"},{\"name\":\"壶关县\",\"latter\":\"H\"},{\"name\":\"长子县\",\"latter\":\"C\"},{\"name\":\"武乡县\",\"latter\":\"W\"},{\"name\":\"沁县\",\"latter\":\"Q\"},{\"name\":\"沁源县\",\"latter\":\"Q\"},{\"name\":\"潞城市\",\"latter\":\"L\"}],\"latter\":\"C\"},{\"name\":\"晋城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城区\",\"latter\":\"C\"},{\"name\":\"沁水县\",\"latter\":\"Q\"},{\"name\":\"阳城县\",\"latter\":\"Y\"},{\"name\":\"陵川县\",\"latter\":\"L\"},{\"name\":\"泽州县\",\"latter\":\"Z\"},{\"name\":\"高平市\",\"latter\":\"G\"}],\"latter\":\"J\"},{\"name\":\"朔州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"朔城区\",\"latter\":\"S\"},{\"name\":\"平鲁区\",\"latter\":\"P\"},{\"name\":\"山阴县\",\"latter\":\"S\"},{\"name\":\"应县\",\"latter\":\"Y\"},{\"name\":\"右玉县\",\"latter\":\"Y\"},{\"name\":\"怀仁县\",\"latter\":\"H\"}],\"latter\":\"S\"},{\"name\":\"晋中市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"榆次区\",\"latter\":\"Y\"},{\"name\":\"榆社县\",\"latter\":\"Y\"},{\"name\":\"左权县\",\"latter\":\"Z\"},{\"name\":\"和顺县\",\"latter\":\"H\"},{\"name\":\"昔阳县\",\"latter\":\"X\"},{\"name\":\"寿阳县\",\"latter\":\"S\"},{\"name\":\"太谷县\",\"latter\":\"T\"},{\"name\":\"祁县\",\"latter\":\"Q\"},{\"name\":\"平遥县\",\"latter\":\"P\"},{\"name\":\"灵石县\",\"latter\":\"L\"},{\"name\":\"介休市\",\"latter\":\"J\"}],\"latter\":\"J\"},{\"name\":\"运城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"盐湖区\",\"latter\":\"Y\"},{\"name\":\"临猗县\",\"latter\":\"L\"},{\"name\":\"万荣县\",\"latter\":\"W\"},{\"name\":\"闻喜县\",\"latter\":\"W\"},{\"name\":\"稷山县\",\"latter\":\"J\"},{\"name\":\"新绛县\",\"latter\":\"X\"},{\"name\":\"绛县\",\"latter\":\"J\"},{\"name\":\"垣曲县\",\"latter\":\"Y\"},{\"name\":\"夏县\",\"latter\":\"X\"},{\"name\":\"平陆县\",\"latter\":\"P\"},{\"name\":\"芮城县\",\"latter\":\"R\"},{\"name\":\"永济市\",\"latter\":\"Y\"},{\"name\":\"河津市\",\"latter\":\"H\"}],\"latter\":\"Y\"},{\"name\":\"忻州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"忻府区\",\"latter\":\"X\"},{\"name\":\"定襄县\",\"latter\":\"D\"},{\"name\":\"五台县\",\"latter\":\"W\"},{\"name\":\"代县\",\"latter\":\"D\"},{\"name\":\"繁峙县\",\"latter\":\"F\"},{\"name\":\"宁武县\",\"latter\":\"N\"},{\"name\":\"静乐县\",\"latter\":\"J\"},{\"name\":\"神池县\",\"latter\":\"S\"},{\"name\":\"五寨县\",\"latter\":\"W\"},{\"name\":\"岢岚县\",\"latter\":\"K\"},{\"name\":\"河曲县\",\"latter\":\"H\"},{\"name\":\"保德县\",\"latter\":\"B\"},{\"name\":\"偏关县\",\"latter\":\"P\"},{\"name\":\"原平市\",\"latter\":\"Y\"}],\"latter\":\"X\"},{\"name\":\"临汾市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"尧都区\",\"latter\":\"Y\"},{\"name\":\"曲沃县\",\"latter\":\"Q\"},{\"name\":\"翼城县\",\"latter\":\"Y\"},{\"name\":\"襄汾县\",\"latter\":\"X\"},{\"name\":\"洪洞县\",\"latter\":\"H\"},{\"name\":\"古县\",\"latter\":\"G\"},{\"name\":\"安泽县\",\"latter\":\"A\"},{\"name\":\"浮山县\",\"latter\":\"F\"},{\"name\":\"吉县\",\"latter\":\"J\"},{\"name\":\"乡宁县\",\"latter\":\"X\"},{\"name\":\"大宁县\",\"latter\":\"D\"},{\"name\":\"隰县\",\"latter\":\"X\"},{\"name\":\"永和县\",\"latter\":\"Y\"},{\"name\":\"蒲县\",\"latter\":\"P\"},{\"name\":\"汾西县\",\"latter\":\"F\"},{\"name\":\"侯马市\",\"latter\":\"H\"},{\"name\":\"霍州市\",\"latter\":\"H\"}],\"latter\":\"L\"},{\"name\":\"吕梁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"离石区\",\"latter\":\"L\"},{\"name\":\"文水县\",\"latter\":\"W\"},{\"name\":\"交城县\",\"latter\":\"J\"},{\"name\":\"兴县\",\"latter\":\"X\"},{\"name\":\"临县\",\"latter\":\"L\"},{\"name\":\"柳林县\",\"latter\":\"L\"},{\"name\":\"石楼县\",\"latter\":\"S\"},{\"name\":\"岚县\",\"latter\":\"L\"},{\"name\":\"方山县\",\"latter\":\"F\"},{\"name\":\"中阳县\",\"latter\":\"Z\"},{\"name\":\"交口县\",\"latter\":\"J\"},{\"name\":\"孝义市\",\"latter\":\"X\"},{\"name\":\"汾阳市\",\"latter\":\"F\"}],\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"内蒙古自治区\",\"children\":[{\"name\":\"呼和浩特市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新城区\",\"latter\":\"X\"},{\"name\":\"回民区\",\"latter\":\"H\"},{\"name\":\"玉泉区\",\"latter\":\"Y\"},{\"name\":\"赛罕区\",\"latter\":\"S\"},{\"name\":\"土默特左旗\",\"latter\":\"T\"},{\"name\":\"托克托县\",\"latter\":\"T\"},{\"name\":\"和林格尔县\",\"latter\":\"H\"},{\"name\":\"清水河县\",\"latter\":\"Q\"},{\"name\":\"武川县\",\"latter\":\"W\"}],\"latter\":\"H\"},{\"name\":\"包头市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东河区\",\"latter\":\"D\"},{\"name\":\"昆都仑区\",\"latter\":\"K\"},{\"name\":\"青山区\",\"latter\":\"Q\"},{\"name\":\"石拐区\",\"latter\":\"S\"},{\"name\":\"白云鄂博矿区\",\"latter\":\"B\"},{\"name\":\"九原区\",\"latter\":\"J\"},{\"name\":\"土默特右旗\",\"latter\":\"T\"},{\"name\":\"固阳县\",\"latter\":\"G\"},{\"name\":\"达尔罕茂明安联合旗\",\"latter\":\"D\"}],\"latter\":\"B\"},{\"name\":\"乌海市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海勃湾区\",\"latter\":\"H\"},{\"name\":\"海南区\",\"latter\":\"H\"},{\"name\":\"乌达区\",\"latter\":\"W\"}],\"latter\":\"W\"},{\"name\":\"赤峰市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"红山区\",\"latter\":\"H\"},{\"name\":\"元宝山区\",\"latter\":\"Y\"},{\"name\":\"松山区\",\"latter\":\"S\"},{\"name\":\"阿鲁科尔沁旗\",\"latter\":\"A\"},{\"name\":\"巴林左旗\",\"latter\":\"B\"},{\"name\":\"巴林右旗\",\"latter\":\"B\"},{\"name\":\"林西县\",\"latter\":\"L\"},{\"name\":\"克什克腾旗\",\"latter\":\"K\"},{\"name\":\"翁牛特旗\",\"latter\":\"W\"},{\"name\":\"喀喇沁旗\",\"latter\":\"K\"},{\"name\":\"宁城县\",\"latter\":\"N\"},{\"name\":\"敖汉旗\",\"latter\":\"A\"}],\"latter\":\"C\"},{\"name\":\"通辽市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"科尔沁区\",\"latter\":\"K\"},{\"name\":\"科尔沁左翼中旗\",\"latter\":\"K\"},{\"name\":\"科尔沁左翼后旗\",\"latter\":\"K\"},{\"name\":\"开鲁县\",\"latter\":\"K\"},{\"name\":\"库伦旗\",\"latter\":\"K\"},{\"name\":\"奈曼旗\",\"latter\":\"N\"},{\"name\":\"扎鲁特旗\",\"latter\":\"Z\"},{\"name\":\"霍林郭勒市\",\"latter\":\"H\"}],\"latter\":\"T\"},{\"name\":\"鄂尔多斯市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东胜区\",\"latter\":\"D\"},{\"name\":\"达拉特旗\",\"latter\":\"D\"},{\"name\":\"准格尔旗\",\"latter\":\"Z\"},{\"name\":\"鄂托克前旗\",\"latter\":\"E\"},{\"name\":\"鄂托克旗\",\"latter\":\"E\"},{\"name\":\"杭锦旗\",\"latter\":\"H\"},{\"name\":\"乌审旗\",\"latter\":\"W\"},{\"name\":\"伊金霍洛旗\",\"latter\":\"Y\"}],\"latter\":\"E\"},{\"name\":\"呼伦贝尔市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海拉尔区\",\"latter\":\"H\"},{\"name\":\"扎赉诺尔区\",\"latter\":\"Z\"},{\"name\":\"阿荣旗\",\"latter\":\"A\"},{\"name\":\"莫力达瓦达斡尔族自治旗\",\"latter\":\"M\"},{\"name\":\"鄂伦春自治旗\",\"latter\":\"E\"},{\"name\":\"鄂温克族自治旗\",\"latter\":\"E\"},{\"name\":\"陈巴尔虎旗\",\"latter\":\"C\"},{\"name\":\"新巴尔虎左旗\",\"latter\":\"X\"},{\"name\":\"新巴尔虎右旗\",\"latter\":\"X\"},{\"name\":\"满洲里市\",\"latter\":\"M\"},{\"name\":\"牙克石市\",\"latter\":\"Y\"},{\"name\":\"扎兰屯市\",\"latter\":\"Z\"},{\"name\":\"额尔古纳市\",\"latter\":\"E\"},{\"name\":\"根河市\",\"latter\":\"G\"}],\"latter\":\"H\"},{\"name\":\"巴彦淖尔市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"临河区\",\"latter\":\"L\"},{\"name\":\"五原县\",\"latter\":\"W\"},{\"name\":\"磴口县\",\"latter\":\"D\"},{\"name\":\"乌拉特前旗\",\"latter\":\"W\"},{\"name\":\"乌拉特中旗\",\"latter\":\"W\"},{\"name\":\"乌拉特后旗\",\"latter\":\"W\"},{\"name\":\"杭锦后旗\",\"latter\":\"H\"}],\"latter\":\"B\"},{\"name\":\"乌兰察布市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"集宁区\",\"latter\":\"J\"},{\"name\":\"卓资县\",\"latter\":\"Z\"},{\"name\":\"化德县\",\"latter\":\"H\"},{\"name\":\"商都县\",\"latter\":\"S\"},{\"name\":\"兴和县\",\"latter\":\"X\"},{\"name\":\"凉城县\",\"latter\":\"L\"},{\"name\":\"察哈尔右翼前旗\",\"latter\":\"C\"},{\"name\":\"察哈尔右翼中旗\",\"latter\":\"C\"},{\"name\":\"察哈尔右翼后旗\",\"latter\":\"C\"},{\"name\":\"四子王旗\",\"latter\":\"S\"},{\"name\":\"丰镇市\",\"latter\":\"F\"}],\"latter\":\"W\"},{\"name\":\"兴安盟\",\"children\":[{\"name\":\"乌兰浩特市\",\"latter\":\"W\"},{\"name\":\"阿尔山市\",\"latter\":\"A\"},{\"name\":\"科尔沁右翼前旗\",\"latter\":\"K\"},{\"name\":\"科尔沁右翼中旗\",\"latter\":\"K\"},{\"name\":\"扎赉特旗\",\"latter\":\"Z\"},{\"name\":\"突泉县\",\"latter\":\"T\"}],\"latter\":\"X\"},{\"name\":\"锡林郭勒盟\",\"children\":[{\"name\":\"二连浩特市\",\"latter\":\"E\"},{\"name\":\"锡林浩特市\",\"latter\":\"X\"},{\"name\":\"阿巴嘎旗\",\"latter\":\"A\"},{\"name\":\"苏尼特左旗\",\"latter\":\"S\"},{\"name\":\"苏尼特右旗\",\"latter\":\"S\"},{\"name\":\"东乌珠穆沁旗\",\"latter\":\"D\"},{\"name\":\"西乌珠穆沁旗\",\"latter\":\"X\"},{\"name\":\"太仆寺旗\",\"latter\":\"T\"},{\"name\":\"镶黄旗\",\"latter\":\"X\"},{\"name\":\"正镶白旗\",\"latter\":\"Z\"},{\"name\":\"正蓝旗\",\"latter\":\"Z\"},{\"name\":\"多伦县\",\"latter\":\"D\"}],\"latter\":\"X\"},{\"name\":\"阿拉善盟\",\"children\":[{\"name\":\"阿拉善左旗\",\"latter\":\"A\"},{\"name\":\"阿拉善右旗\",\"latter\":\"A\"},{\"name\":\"额济纳旗\",\"latter\":\"E\"}],\"latter\":\"A\"}],\"latter\":\"N\"},{\"name\":\"辽宁省\",\"children\":[{\"name\":\"沈阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"和平区\",\"latter\":\"H\"},{\"name\":\"沈河区\",\"latter\":\"S\"},{\"name\":\"大东区\",\"latter\":\"D\"},{\"name\":\"皇姑区\",\"latter\":\"H\"},{\"name\":\"铁西区\",\"latter\":\"T\"},{\"name\":\"苏家屯区\",\"latter\":\"S\"},{\"name\":\"东陵区\",\"latter\":\"D\"},{\"name\":\"沈北新区\",\"latter\":\"S\"},{\"name\":\"于洪区\",\"latter\":\"Y\"},{\"name\":\"辽中县\",\"latter\":\"L\"},{\"name\":\"康平县\",\"latter\":\"K\"},{\"name\":\"法库县\",\"latter\":\"F\"},{\"name\":\"新民市\",\"latter\":\"X\"}],\"latter\":\"S\"},{\"name\":\"大连市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"中山区\",\"latter\":\"Z\"},{\"name\":\"西岗区\",\"latter\":\"X\"},{\"name\":\"沙河口区\",\"latter\":\"S\"},{\"name\":\"甘井子区\",\"latter\":\"G\"},{\"name\":\"旅顺口区\",\"latter\":\"L\"},{\"name\":\"金州区\",\"latter\":\"J\"},{\"name\":\"长海县\",\"latter\":\"C\"},{\"name\":\"瓦房店市\",\"latter\":\"W\"},{\"name\":\"普兰店市\",\"latter\":\"P\"},{\"name\":\"庄河市\",\"latter\":\"Z\"}],\"latter\":\"D\"},{\"name\":\"鞍山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"铁东区\",\"latter\":\"T\"},{\"name\":\"铁西区\",\"latter\":\"T\"},{\"name\":\"立山区\",\"latter\":\"L\"},{\"name\":\"千山区\",\"latter\":\"Q\"},{\"name\":\"台安县\",\"latter\":\"T\"},{\"name\":\"岫岩满族自治县\",\"latter\":\"X\"},{\"name\":\"海城市\",\"latter\":\"H\"}],\"latter\":\"A\"},{\"name\":\"抚顺市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新抚区\",\"latter\":\"X\"},{\"name\":\"东洲区\",\"latter\":\"D\"},{\"name\":\"望花区\",\"latter\":\"W\"},{\"name\":\"顺城区\",\"latter\":\"S\"},{\"name\":\"抚顺县\",\"latter\":\"F\"},{\"name\":\"新宾满族自治县\",\"latter\":\"X\"},{\"name\":\"清原满族自治县\",\"latter\":\"Q\"}],\"latter\":\"F\"},{\"name\":\"本溪市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"平山区\",\"latter\":\"P\"},{\"name\":\"溪湖区\",\"latter\":\"X\"},{\"name\":\"明山区\",\"latter\":\"M\"},{\"name\":\"南芬区\",\"latter\":\"N\"},{\"name\":\"本溪满族自治县\",\"latter\":\"B\"},{\"name\":\"桓仁满族自治县\",\"latter\":\"H\"}],\"latter\":\"B\"},{\"name\":\"丹东市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"元宝区\",\"latter\":\"Y\"},{\"name\":\"振兴区\",\"latter\":\"Z\"},{\"name\":\"振安区\",\"latter\":\"Z\"},{\"name\":\"宽甸满族自治县\",\"latter\":\"K\"},{\"name\":\"东港市\",\"latter\":\"D\"},{\"name\":\"凤城市\",\"latter\":\"F\"}],\"latter\":\"D\"},{\"name\":\"锦州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"古塔区\",\"latter\":\"G\"},{\"name\":\"凌河区\",\"latter\":\"L\"},{\"name\":\"太和区\",\"latter\":\"T\"},{\"name\":\"黑山县\",\"latter\":\"H\"},{\"name\":\"义县\",\"latter\":\"Y\"},{\"name\":\"凌海市\",\"latter\":\"L\"},{\"name\":\"北镇市\",\"latter\":\"B\"}],\"latter\":\"J\"},{\"name\":\"营口市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"站前区\",\"latter\":\"Z\"},{\"name\":\"西市区\",\"latter\":\"X\"},{\"name\":\"鲅鱼圈区\",\"latter\":\"B\"},{\"name\":\"老边区\",\"latter\":\"L\"},{\"name\":\"盖州市\",\"latter\":\"G\"},{\"name\":\"大石桥市\",\"latter\":\"D\"}],\"latter\":\"Y\"},{\"name\":\"阜新市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海州区\",\"latter\":\"H\"},{\"name\":\"新邱区\",\"latter\":\"X\"},{\"name\":\"太平区\",\"latter\":\"T\"},{\"name\":\"清河门区\",\"latter\":\"Q\"},{\"name\":\"细河区\",\"latter\":\"X\"},{\"name\":\"阜新蒙古族自治县\",\"latter\":\"F\"},{\"name\":\"彰武县\",\"latter\":\"Z\"}],\"latter\":\"F\"},{\"name\":\"辽阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"白塔区\",\"latter\":\"B\"},{\"name\":\"文圣区\",\"latter\":\"W\"},{\"name\":\"宏伟区\",\"latter\":\"H\"},{\"name\":\"弓长岭区\",\"latter\":\"G\"},{\"name\":\"太子河区\",\"latter\":\"T\"},{\"name\":\"辽阳县\",\"latter\":\"L\"},{\"name\":\"灯塔市\",\"latter\":\"D\"}],\"latter\":\"L\"},{\"name\":\"盘锦市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"双台子区\",\"latter\":\"S\"},{\"name\":\"兴隆台区\",\"latter\":\"X\"},{\"name\":\"大洼县\",\"latter\":\"D\"},{\"name\":\"盘山县\",\"latter\":\"P\"}],\"latter\":\"P\"},{\"name\":\"铁岭市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"银州区\",\"latter\":\"Y\"},{\"name\":\"清河区\",\"latter\":\"Q\"},{\"name\":\"铁岭县\",\"latter\":\"T\"},{\"name\":\"西丰县\",\"latter\":\"X\"},{\"name\":\"昌图县\",\"latter\":\"C\"},{\"name\":\"调兵山市\",\"latter\":\"T\"},{\"name\":\"开原市\",\"latter\":\"K\"}],\"latter\":\"T\"},{\"name\":\"朝阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"双塔区\",\"latter\":\"S\"},{\"name\":\"龙城区\",\"latter\":\"L\"},{\"name\":\"朝阳县\",\"latter\":\"Z\"},{\"name\":\"建平县\",\"latter\":\"J\"},{\"name\":\"喀喇沁左翼蒙古族自治县\",\"latter\":\"K\"},{\"name\":\"北票市\",\"latter\":\"B\"},{\"name\":\"凌源市\",\"latter\":\"L\"}],\"latter\":\"Z\"},{\"name\":\"葫芦岛市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"连山区\",\"latter\":\"L\"},{\"name\":\"龙港区\",\"latter\":\"L\"},{\"name\":\"南票区\",\"latter\":\"N\"},{\"name\":\"绥中县\",\"latter\":\"S\"},{\"name\":\"建昌县\",\"latter\":\"J\"},{\"name\":\"兴城市\",\"latter\":\"X\"}],\"latter\":\"H\"}],\"latter\":\"L\"},{\"name\":\"吉林省\",\"children\":[{\"name\":\"长春市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"南关区\",\"latter\":\"N\"},{\"name\":\"宽城区\",\"latter\":\"K\"},{\"name\":\"朝阳区\",\"latter\":\"Z\"},{\"name\":\"二道区\",\"latter\":\"E\"},{\"name\":\"绿园区\",\"latter\":\"L\"},{\"name\":\"双阳区\",\"latter\":\"S\"},{\"name\":\"农安县\",\"latter\":\"N\"},{\"name\":\"九台市\",\"latter\":\"J\"},{\"name\":\"榆树市\",\"latter\":\"Y\"},{\"name\":\"德惠市\",\"latter\":\"D\"}],\"latter\":\"C\"},{\"name\":\"吉林市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"昌邑区\",\"latter\":\"C\"},{\"name\":\"龙潭区\",\"latter\":\"L\"},{\"name\":\"船营区\",\"latter\":\"C\"},{\"name\":\"丰满区\",\"latter\":\"F\"},{\"name\":\"永吉县\",\"latter\":\"Y\"},{\"name\":\"蛟河市\",\"latter\":\"J\"},{\"name\":\"桦甸市\",\"latter\":\"H\"},{\"name\":\"舒兰市\",\"latter\":\"S\"},{\"name\":\"磐石市\",\"latter\":\"P\"}],\"latter\":\"J\"},{\"name\":\"四平市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"铁西区\",\"latter\":\"T\"},{\"name\":\"铁东区\",\"latter\":\"T\"},{\"name\":\"梨树县\",\"latter\":\"L\"},{\"name\":\"伊通满族自治县\",\"latter\":\"Y\"},{\"name\":\"公主岭市\",\"latter\":\"G\"},{\"name\":\"双辽市\",\"latter\":\"S\"}],\"latter\":\"S\"},{\"name\":\"辽源市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"龙山区\",\"latter\":\"L\"},{\"name\":\"西安区\",\"latter\":\"X\"},{\"name\":\"东丰县\",\"latter\":\"D\"},{\"name\":\"东辽县\",\"latter\":\"D\"}],\"latter\":\"L\"},{\"name\":\"通化市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东昌区\",\"latter\":\"D\"},{\"name\":\"二道江区\",\"latter\":\"E\"},{\"name\":\"通化县\",\"latter\":\"T\"},{\"name\":\"辉南县\",\"latter\":\"H\"},{\"name\":\"柳河县\",\"latter\":\"L\"},{\"name\":\"梅河口市\",\"latter\":\"M\"},{\"name\":\"集安市\",\"latter\":\"J\"}],\"latter\":\"T\"},{\"name\":\"白山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"浑江区\",\"latter\":\"H\"},{\"name\":\"江源区\",\"latter\":\"J\"},{\"name\":\"抚松县\",\"latter\":\"F\"},{\"name\":\"靖宇县\",\"latter\":\"J\"},{\"name\":\"长白朝鲜族自治县\",\"latter\":\"C\"},{\"name\":\"临江市\",\"latter\":\"L\"}],\"latter\":\"B\"},{\"name\":\"松原市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"宁江区\",\"latter\":\"N\"},{\"name\":\"前郭尔罗斯蒙古族自治县\",\"latter\":\"Q\"},{\"name\":\"长岭县\",\"latter\":\"C\"},{\"name\":\"乾安县\",\"latter\":\"Q\"},{\"name\":\"扶余市\",\"latter\":\"F\"}],\"latter\":\"S\"},{\"name\":\"白城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"洮北区\",\"latter\":\"T\"},{\"name\":\"镇赉县\",\"latter\":\"Z\"},{\"name\":\"通榆县\",\"latter\":\"T\"},{\"name\":\"洮南市\",\"latter\":\"T\"},{\"name\":\"大安市\",\"latter\":\"D\"}],\"latter\":\"B\"},{\"name\":\"延边朝鲜族自治州\",\"children\":[{\"name\":\"延吉市\",\"latter\":\"Y\"},{\"name\":\"图们市\",\"latter\":\"T\"},{\"name\":\"敦化市\",\"latter\":\"D\"},{\"name\":\"珲春市\",\"latter\":\"H\"},{\"name\":\"龙井市\",\"latter\":\"L\"},{\"name\":\"和龙市\",\"latter\":\"H\"},{\"name\":\"汪清县\",\"latter\":\"W\"},{\"name\":\"安图县\",\"latter\":\"A\"}],\"latter\":\"Y\"}],\"latter\":\"J\"},{\"name\":\"黑龙江省\",\"children\":[{\"name\":\"哈尔滨市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"道里区\",\"latter\":\"D\"},{\"name\":\"南岗区\",\"latter\":\"N\"},{\"name\":\"道外区\",\"latter\":\"D\"},{\"name\":\"平房区\",\"latter\":\"P\"},{\"name\":\"松北区\",\"latter\":\"S\"},{\"name\":\"香坊区\",\"latter\":\"X\"},{\"name\":\"呼兰区\",\"latter\":\"H\"},{\"name\":\"阿城区\",\"latter\":\"A\"},{\"name\":\"依兰县\",\"latter\":\"Y\"},{\"name\":\"方正县\",\"latter\":\"F\"},{\"name\":\"宾县\",\"latter\":\"B\"},{\"name\":\"巴彦县\",\"latter\":\"B\"},{\"name\":\"木兰县\",\"latter\":\"M\"},{\"name\":\"通河县\",\"latter\":\"T\"},{\"name\":\"延寿县\",\"latter\":\"Y\"},{\"name\":\"双城市\",\"latter\":\"S\"},{\"name\":\"尚志市\",\"latter\":\"S\"},{\"name\":\"五常市\",\"latter\":\"W\"}],\"latter\":\"H\"},{\"name\":\"齐齐哈尔市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"龙沙区\",\"latter\":\"L\"},{\"name\":\"建华区\",\"latter\":\"J\"},{\"name\":\"铁锋区\",\"latter\":\"T\"},{\"name\":\"昂昂溪区\",\"latter\":\"A\"},{\"name\":\"富拉尔基区\",\"latter\":\"F\"},{\"name\":\"碾子山区\",\"latter\":\"N\"},{\"name\":\"梅里斯达斡尔族区\",\"latter\":\"M\"},{\"name\":\"龙江县\",\"latter\":\"L\"},{\"name\":\"依安县\",\"latter\":\"Y\"},{\"name\":\"泰来县\",\"latter\":\"T\"},{\"name\":\"甘南县\",\"latter\":\"G\"},{\"name\":\"富裕县\",\"latter\":\"F\"},{\"name\":\"克山县\",\"latter\":\"K\"},{\"name\":\"克东县\",\"latter\":\"K\"},{\"name\":\"拜泉县\",\"latter\":\"B\"},{\"name\":\"讷河市\",\"latter\":\"N\"}],\"latter\":\"Q\"},{\"name\":\"鸡西市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鸡冠区\",\"latter\":\"J\"},{\"name\":\"恒山区\",\"latter\":\"H\"},{\"name\":\"滴道区\",\"latter\":\"D\"},{\"name\":\"梨树区\",\"latter\":\"L\"},{\"name\":\"城子河区\",\"latter\":\"C\"},{\"name\":\"麻山区\",\"latter\":\"M\"},{\"name\":\"鸡东县\",\"latter\":\"J\"},{\"name\":\"虎林市\",\"latter\":\"H\"},{\"name\":\"密山市\",\"latter\":\"M\"}],\"latter\":\"J\"},{\"name\":\"鹤岗市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"向阳区\",\"latter\":\"X\"},{\"name\":\"工农区\",\"latter\":\"G\"},{\"name\":\"南山区\",\"latter\":\"N\"},{\"name\":\"兴安区\",\"latter\":\"X\"},{\"name\":\"东山区\",\"latter\":\"D\"},{\"name\":\"兴山区\",\"latter\":\"X\"},{\"name\":\"萝北县\",\"latter\":\"L\"},{\"name\":\"绥滨县\",\"latter\":\"S\"}],\"latter\":\"H\"},{\"name\":\"双鸭山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"尖山区\",\"latter\":\"J\"},{\"name\":\"岭东区\",\"latter\":\"L\"},{\"name\":\"四方台区\",\"latter\":\"S\"},{\"name\":\"宝山区\",\"latter\":\"B\"},{\"name\":\"集贤县\",\"latter\":\"J\"},{\"name\":\"友谊县\",\"latter\":\"Y\"},{\"name\":\"宝清县\",\"latter\":\"B\"},{\"name\":\"饶河县\",\"latter\":\"R\"}],\"latter\":\"S\"},{\"name\":\"大庆市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"萨尔图区\",\"latter\":\"S\"},{\"name\":\"龙凤区\",\"latter\":\"L\"},{\"name\":\"让胡路区\",\"latter\":\"R\"},{\"name\":\"红岗区\",\"latter\":\"H\"},{\"name\":\"大同区\",\"latter\":\"D\"},{\"name\":\"肇州县\",\"latter\":\"Z\"},{\"name\":\"肇源县\",\"latter\":\"Z\"},{\"name\":\"林甸县\",\"latter\":\"L\"},{\"name\":\"杜尔伯特蒙古族自治县\",\"latter\":\"D\"}],\"latter\":\"D\"},{\"name\":\"伊春市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"伊春区\",\"latter\":\"Y\"},{\"name\":\"南岔区\",\"latter\":\"N\"},{\"name\":\"友好区\",\"latter\":\"Y\"},{\"name\":\"西林区\",\"latter\":\"X\"},{\"name\":\"翠峦区\",\"latter\":\"C\"},{\"name\":\"新青区\",\"latter\":\"X\"},{\"name\":\"美溪区\",\"latter\":\"M\"},{\"name\":\"金山屯区\",\"latter\":\"J\"},{\"name\":\"五营区\",\"latter\":\"W\"},{\"name\":\"乌马河区\",\"latter\":\"W\"},{\"name\":\"汤旺河区\",\"latter\":\"T\"},{\"name\":\"带岭区\",\"latter\":\"D\"},{\"name\":\"乌伊岭区\",\"latter\":\"W\"},{\"name\":\"红星区\",\"latter\":\"H\"},{\"name\":\"上甘岭区\",\"latter\":\"S\"},{\"name\":\"嘉荫县\",\"latter\":\"J\"},{\"name\":\"铁力市\",\"latter\":\"T\"}],\"latter\":\"Y\"},{\"name\":\"佳木斯市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"向阳区\",\"latter\":\"X\"},{\"name\":\"前进区\",\"latter\":\"Q\"},{\"name\":\"东风区\",\"latter\":\"D\"},{\"name\":\"郊区\",\"latter\":\"J\"},{\"name\":\"桦南县\",\"latter\":\"H\"},{\"name\":\"桦川县\",\"latter\":\"H\"},{\"name\":\"汤原县\",\"latter\":\"T\"},{\"name\":\"抚远县\",\"latter\":\"F\"},{\"name\":\"同江市\",\"latter\":\"T\"},{\"name\":\"富锦市\",\"latter\":\"F\"}],\"latter\":\"J\"},{\"name\":\"七台河市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新兴区\",\"latter\":\"X\"},{\"name\":\"桃山区\",\"latter\":\"T\"},{\"name\":\"茄子河区\",\"latter\":\"Q\"},{\"name\":\"勃利县\",\"latter\":\"B\"}],\"latter\":\"Q\"},{\"name\":\"牡丹江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东安区\",\"latter\":\"D\"},{\"name\":\"阳明区\",\"latter\":\"Y\"},{\"name\":\"爱民区\",\"latter\":\"A\"},{\"name\":\"西安区\",\"latter\":\"X\"},{\"name\":\"东宁县\",\"latter\":\"D\"},{\"name\":\"林口县\",\"latter\":\"L\"},{\"name\":\"绥芬河市\",\"latter\":\"S\"},{\"name\":\"海林市\",\"latter\":\"H\"},{\"name\":\"宁安市\",\"latter\":\"N\"},{\"name\":\"穆棱市\",\"latter\":\"M\"}],\"latter\":\"M\"},{\"name\":\"黑河市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"爱辉区\",\"latter\":\"A\"},{\"name\":\"嫩江县\",\"latter\":\"N\"},{\"name\":\"逊克县\",\"latter\":\"X\"},{\"name\":\"孙吴县\",\"latter\":\"S\"},{\"name\":\"北安市\",\"latter\":\"B\"},{\"name\":\"五大连池市\",\"latter\":\"W\"}],\"latter\":\"H\"},{\"name\":\"绥化市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"北林区\",\"latter\":\"B\"},{\"name\":\"望奎县\",\"latter\":\"W\"},{\"name\":\"兰西县\",\"latter\":\"L\"},{\"name\":\"青冈县\",\"latter\":\"Q\"},{\"name\":\"庆安县\",\"latter\":\"Q\"},{\"name\":\"明水县\",\"latter\":\"M\"},{\"name\":\"绥棱县\",\"latter\":\"S\"},{\"name\":\"安达市\",\"latter\":\"A\"},{\"name\":\"肇东市\",\"latter\":\"Z\"},{\"name\":\"海伦市\",\"latter\":\"H\"}],\"latter\":\"S\"},{\"name\":\"大兴安岭地区\",\"children\":[{\"name\":\"呼玛县\",\"latter\":\"H\"},{\"name\":\"塔河县\",\"latter\":\"T\"},{\"name\":\"漠河县\",\"latter\":\"M\"}],\"latter\":\"D\"}],\"latter\":\"H\"},{\"name\":\"上海市\",\"children\":[{\"name\":\"黄浦区\",\"latter\":\"H\"},{\"name\":\"徐汇区\",\"latter\":\"X\"},{\"name\":\"长宁区\",\"latter\":\"C\"},{\"name\":\"静安区\",\"latter\":\"J\"},{\"name\":\"普陀区\",\"latter\":\"P\"},{\"name\":\"闸北区\",\"latter\":\"Z\"},{\"name\":\"虹口区\",\"latter\":\"H\"},{\"name\":\"杨浦区\",\"latter\":\"Y\"},{\"name\":\"闵行区\",\"latter\":\"M\"},{\"name\":\"宝山区\",\"latter\":\"B\"},{\"name\":\"嘉定区\",\"latter\":\"J\"},{\"name\":\"浦东新区\",\"latter\":\"P\"},{\"name\":\"金山区\",\"latter\":\"J\"},{\"name\":\"松江区\",\"latter\":\"S\"},{\"name\":\"青浦区\",\"latter\":\"Q\"},{\"name\":\"奉贤区\",\"latter\":\"F\"},{\"name\":\"崇明县\",\"latter\":\"C\"}],\"latter\":\"S\"},{\"name\":\"江苏省\",\"children\":[{\"name\":\"南京市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"玄武区\",\"latter\":\"X\"},{\"name\":\"秦淮区\",\"latter\":\"Q\"},{\"name\":\"建邺区\",\"latter\":\"J\"},{\"name\":\"鼓楼区\",\"latter\":\"G\"},{\"name\":\"浦口区\",\"latter\":\"P\"},{\"name\":\"栖霞区\",\"latter\":\"Q\"},{\"name\":\"雨花台区\",\"latter\":\"Y\"},{\"name\":\"江宁区\",\"latter\":\"J\"},{\"name\":\"六合区\",\"latter\":\"L\"},{\"name\":\"溧水区\",\"latter\":\"L\"},{\"name\":\"高淳区\",\"latter\":\"G\"}],\"latter\":\"N\"},{\"name\":\"无锡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"崇安区\",\"latter\":\"C\"},{\"name\":\"南长区\",\"latter\":\"N\"},{\"name\":\"北塘区\",\"latter\":\"B\"},{\"name\":\"锡山区\",\"latter\":\"X\"},{\"name\":\"惠山区\",\"latter\":\"H\"},{\"name\":\"滨湖区\",\"latter\":\"B\"},{\"name\":\"江阴市\",\"latter\":\"J\"},{\"name\":\"宜兴市\",\"latter\":\"Y\"}],\"latter\":\"W\"},{\"name\":\"徐州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鼓楼区\",\"latter\":\"G\"},{\"name\":\"云龙区\",\"latter\":\"Y\"},{\"name\":\"贾汪区\",\"latter\":\"J\"},{\"name\":\"泉山区\",\"latter\":\"Q\"},{\"name\":\"铜山区\",\"latter\":\"T\"},{\"name\":\"丰县\",\"latter\":\"F\"},{\"name\":\"沛县\",\"latter\":\"P\"},{\"name\":\"睢宁县\",\"latter\":\"H\"},{\"name\":\"新沂市\",\"latter\":\"X\"},{\"name\":\"邳州市\",\"latter\":\"P\"}],\"latter\":\"X\"},{\"name\":\"常州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"天宁区\",\"latter\":\"T\"},{\"name\":\"钟楼区\",\"latter\":\"Z\"},{\"name\":\"戚墅堰区\",\"latter\":\"Q\"},{\"name\":\"新北区\",\"latter\":\"X\"},{\"name\":\"武进区\",\"latter\":\"W\"},{\"name\":\"溧阳市\",\"latter\":\"L\"},{\"name\":\"金坛市\",\"latter\":\"J\"}],\"latter\":\"C\"},{\"name\":\"苏州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"虎丘区\",\"latter\":\"H\"},{\"name\":\"吴中区\",\"latter\":\"W\"},{\"name\":\"相城区\",\"latter\":\"X\"},{\"name\":\"姑苏区\",\"latter\":\"G\"},{\"name\":\"吴江区\",\"latter\":\"W\"},{\"name\":\"常熟市\",\"latter\":\"C\"},{\"name\":\"张家港市\",\"latter\":\"Z\"},{\"name\":\"昆山市\",\"latter\":\"K\"},{\"name\":\"太仓市\",\"latter\":\"T\"}],\"latter\":\"S\"},{\"name\":\"南通市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"崇川区\",\"latter\":\"C\"},{\"name\":\"港闸区\",\"latter\":\"G\"},{\"name\":\"通州区\",\"latter\":\"T\"},{\"name\":\"海安县\",\"latter\":\"H\"},{\"name\":\"如东县\",\"latter\":\"R\"},{\"name\":\"启东市\",\"latter\":\"Q\"},{\"name\":\"如皋市\",\"latter\":\"R\"},{\"name\":\"海门市\",\"latter\":\"H\"}],\"latter\":\"N\"},{\"name\":\"连云港市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"连云区\",\"latter\":\"L\"},{\"name\":\"新浦区\",\"latter\":\"X\"},{\"name\":\"海州区\",\"latter\":\"H\"},{\"name\":\"赣榆县\",\"latter\":\"G\"},{\"name\":\"东海县\",\"latter\":\"D\"},{\"name\":\"灌云县\",\"latter\":\"G\"},{\"name\":\"灌南县\",\"latter\":\"G\"}],\"latter\":\"L\"},{\"name\":\"淮安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"清河区\",\"latter\":\"Q\"},{\"name\":\"淮安区\",\"latter\":\"H\"},{\"name\":\"淮阴区\",\"latter\":\"H\"},{\"name\":\"清浦区\",\"latter\":\"Q\"},{\"name\":\"涟水县\",\"latter\":\"L\"},{\"name\":\"洪泽县\",\"latter\":\"H\"},{\"name\":\"盱眙县\",\"latter\":\"X\"},{\"name\":\"金湖县\",\"latter\":\"J\"}],\"latter\":\"H\"},{\"name\":\"盐城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"亭湖区\",\"latter\":\"T\"},{\"name\":\"盐都区\",\"latter\":\"Y\"},{\"name\":\"响水县\",\"latter\":\"X\"},{\"name\":\"滨海县\",\"latter\":\"B\"},{\"name\":\"阜宁县\",\"latter\":\"F\"},{\"name\":\"射阳县\",\"latter\":\"S\"},{\"name\":\"建湖县\",\"latter\":\"J\"},{\"name\":\"东台市\",\"latter\":\"D\"},{\"name\":\"大丰市\",\"latter\":\"D\"}],\"latter\":\"Y\"},{\"name\":\"扬州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"广陵区\",\"latter\":\"G\"},{\"name\":\"邗江区\",\"latter\":\"H\"},{\"name\":\"江都区\",\"latter\":\"J\"},{\"name\":\"宝应县\",\"latter\":\"B\"},{\"name\":\"仪征市\",\"latter\":\"Y\"},{\"name\":\"高邮市\",\"latter\":\"G\"}],\"latter\":\"Y\"},{\"name\":\"镇江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"京口区\",\"latter\":\"J\"},{\"name\":\"润州区\",\"latter\":\"R\"},{\"name\":\"丹徒区\",\"latter\":\"D\"},{\"name\":\"丹阳市\",\"latter\":\"D\"},{\"name\":\"扬中市\",\"latter\":\"Y\"},{\"name\":\"句容市\",\"latter\":\"J\"}],\"latter\":\"Z\"},{\"name\":\"泰州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海陵区\",\"latter\":\"H\"},{\"name\":\"高港区\",\"latter\":\"G\"},{\"name\":\"姜堰区\",\"latter\":\"J\"},{\"name\":\"兴化市\",\"latter\":\"X\"},{\"name\":\"靖江市\",\"latter\":\"J\"},{\"name\":\"泰兴市\",\"latter\":\"T\"}],\"latter\":\"T\"},{\"name\":\"宿迁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"宿城区\",\"latter\":\"S\"},{\"name\":\"宿豫区\",\"latter\":\"S\"},{\"name\":\"沭阳县\",\"latter\":\"S\"},{\"name\":\"泗阳县\",\"latter\":\"S\"},{\"name\":\"泗洪县\",\"latter\":\"S\"}],\"latter\":\"S\"}],\"latter\":\"J\"},{\"name\":\"浙江省\",\"children\":[{\"name\":\"杭州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"上城区\",\"latter\":\"S\"},{\"name\":\"下城区\",\"latter\":\"X\"},{\"name\":\"江干区\",\"latter\":\"J\"},{\"name\":\"拱墅区\",\"latter\":\"G\"},{\"name\":\"西湖区\",\"latter\":\"X\"},{\"name\":\"滨江区\",\"latter\":\"B\"},{\"name\":\"萧山区\",\"latter\":\"X\"},{\"name\":\"余杭区\",\"latter\":\"Y\"},{\"name\":\"桐庐县\",\"latter\":\"T\"},{\"name\":\"淳安县\",\"latter\":\"C\"},{\"name\":\"建德市\",\"latter\":\"J\"},{\"name\":\"富阳市\",\"latter\":\"F\"},{\"name\":\"临安市\",\"latter\":\"L\"}],\"latter\":\"H\"},{\"name\":\"宁波市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海曙区\",\"latter\":\"H\"},{\"name\":\"江东区\",\"latter\":\"J\"},{\"name\":\"江北区\",\"latter\":\"J\"},{\"name\":\"北仑区\",\"latter\":\"B\"},{\"name\":\"镇海区\",\"latter\":\"Z\"},{\"name\":\"鄞州区\",\"latter\":\"Y\"},{\"name\":\"象山县\",\"latter\":\"X\"},{\"name\":\"宁海县\",\"latter\":\"N\"},{\"name\":\"余姚市\",\"latter\":\"Y\"},{\"name\":\"慈溪市\",\"latter\":\"C\"},{\"name\":\"奉化市\",\"latter\":\"F\"}],\"latter\":\"N\"},{\"name\":\"温州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鹿城区\",\"latter\":\"L\"},{\"name\":\"龙湾区\",\"latter\":\"L\"},{\"name\":\"瓯海区\",\"latter\":\"O\"},{\"name\":\"洞头县\",\"latter\":\"D\"},{\"name\":\"永嘉县\",\"latter\":\"Y\"},{\"name\":\"平阳县\",\"latter\":\"P\"},{\"name\":\"苍南县\",\"latter\":\"C\"},{\"name\":\"文成县\",\"latter\":\"W\"},{\"name\":\"泰顺县\",\"latter\":\"T\"},{\"name\":\"瑞安市\",\"latter\":\"R\"},{\"name\":\"乐清市\",\"latter\":\"L\"}],\"latter\":\"W\"},{\"name\":\"嘉兴市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"南湖区\",\"latter\":\"N\"},{\"name\":\"秀洲区\",\"latter\":\"X\"},{\"name\":\"嘉善县\",\"latter\":\"J\"},{\"name\":\"海盐县\",\"latter\":\"H\"},{\"name\":\"海宁市\",\"latter\":\"H\"},{\"name\":\"平湖市\",\"latter\":\"P\"},{\"name\":\"桐乡市\",\"latter\":\"T\"}],\"latter\":\"J\"},{\"name\":\"湖州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"吴兴区\",\"latter\":\"W\"},{\"name\":\"南浔区\",\"latter\":\"N\"},{\"name\":\"德清县\",\"latter\":\"D\"},{\"name\":\"长兴县\",\"latter\":\"C\"},{\"name\":\"安吉县\",\"latter\":\"A\"}],\"latter\":\"H\"},{\"name\":\"绍兴市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"越城区\",\"latter\":\"Y\"},{\"name\":\"绍兴县\",\"latter\":\"S\"},{\"name\":\"新昌县\",\"latter\":\"X\"},{\"name\":\"诸暨市\",\"latter\":\"Z\"},{\"name\":\"上虞市\",\"latter\":\"S\"},{\"name\":\"嵊州市\",\"latter\":\"S\"}],\"latter\":\"S\"},{\"name\":\"金华市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"婺城区\",\"latter\":\"W\"},{\"name\":\"金东区\",\"latter\":\"J\"},{\"name\":\"武义县\",\"latter\":\"W\"},{\"name\":\"浦江县\",\"latter\":\"P\"},{\"name\":\"磐安县\",\"latter\":\"P\"},{\"name\":\"兰溪市\",\"latter\":\"L\"},{\"name\":\"义乌市\",\"latter\":\"Y\"},{\"name\":\"东阳市\",\"latter\":\"D\"},{\"name\":\"永康市\",\"latter\":\"Y\"}],\"latter\":\"J\"},{\"name\":\"衢州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"柯城区\",\"latter\":\"K\"},{\"name\":\"衢江区\",\"latter\":\"Q\"},{\"name\":\"常山县\",\"latter\":\"C\"},{\"name\":\"开化县\",\"latter\":\"K\"},{\"name\":\"龙游县\",\"latter\":\"L\"},{\"name\":\"江山市\",\"latter\":\"J\"}],\"latter\":\"Q\"},{\"name\":\"舟山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"定海区\",\"latter\":\"D\"},{\"name\":\"普陀区\",\"latter\":\"P\"},{\"name\":\"岱山县\",\"latter\":\"D\"},{\"name\":\"嵊泗县\",\"latter\":\"S\"}],\"latter\":\"Z\"},{\"name\":\"台州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"椒江区\",\"latter\":\"J\"},{\"name\":\"黄岩区\",\"latter\":\"H\"},{\"name\":\"路桥区\",\"latter\":\"L\"},{\"name\":\"玉环县\",\"latter\":\"Y\"},{\"name\":\"三门县\",\"latter\":\"S\"},{\"name\":\"天台县\",\"latter\":\"T\"},{\"name\":\"仙居县\",\"latter\":\"X\"},{\"name\":\"温岭市\",\"latter\":\"W\"},{\"name\":\"临海市\",\"latter\":\"L\"}],\"latter\":\"T\"},{\"name\":\"丽水市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"莲都区\",\"latter\":\"L\"},{\"name\":\"青田县\",\"latter\":\"Q\"},{\"name\":\"缙云县\",\"latter\":\"J\"},{\"name\":\"遂昌县\",\"latter\":\"S\"},{\"name\":\"松阳县\",\"latter\":\"S\"},{\"name\":\"云和县\",\"latter\":\"Y\"},{\"name\":\"庆元县\",\"latter\":\"Q\"},{\"name\":\"景宁畲族自治县\",\"latter\":\"J\"},{\"name\":\"龙泉市\",\"latter\":\"L\"}],\"latter\":\"L\"}],\"latter\":\"Z\"},{\"name\":\"安徽省\",\"children\":[{\"name\":\"合肥市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"瑶海区\",\"latter\":\"Y\"},{\"name\":\"庐阳区\",\"latter\":\"L\"},{\"name\":\"蜀山区\",\"latter\":\"S\"},{\"name\":\"包河区\",\"latter\":\"B\"},{\"name\":\"长丰县\",\"latter\":\"C\"},{\"name\":\"肥东县\",\"latter\":\"F\"},{\"name\":\"肥西县\",\"latter\":\"F\"},{\"name\":\"庐江县\",\"latter\":\"L\"},{\"name\":\"巢湖市\",\"latter\":\"C\"}],\"latter\":\"H\"},{\"name\":\"芜湖市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"镜湖区\",\"latter\":\"J\"},{\"name\":\"弋江区\",\"latter\":\"Y\"},{\"name\":\"鸠江区\",\"latter\":\"J\"},{\"name\":\"三山区\",\"latter\":\"S\"},{\"name\":\"芜湖县\",\"latter\":\"W\"},{\"name\":\"繁昌县\",\"latter\":\"F\"},{\"name\":\"南陵县\",\"latter\":\"N\"},{\"name\":\"无为县\",\"latter\":\"W\"}],\"latter\":\"W\"},{\"name\":\"蚌埠市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"龙子湖区\",\"latter\":\"L\"},{\"name\":\"蚌山区\",\"latter\":\"B\"},{\"name\":\"禹会区\",\"latter\":\"Y\"},{\"name\":\"淮上区\",\"latter\":\"H\"},{\"name\":\"怀远县\",\"latter\":\"H\"},{\"name\":\"五河县\",\"latter\":\"W\"},{\"name\":\"固镇县\",\"latter\":\"G\"}],\"latter\":\"B\"},{\"name\":\"淮南市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"大通区\",\"latter\":\"D\"},{\"name\":\"田家庵区\",\"latter\":\"T\"},{\"name\":\"谢家集区\",\"latter\":\"X\"},{\"name\":\"八公山区\",\"latter\":\"B\"},{\"name\":\"潘集区\",\"latter\":\"P\"},{\"name\":\"凤台县\",\"latter\":\"F\"}],\"latter\":\"H\"},{\"name\":\"马鞍山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"花山区\",\"latter\":\"H\"},{\"name\":\"雨山区\",\"latter\":\"Y\"},{\"name\":\"博望区\",\"latter\":\"B\"},{\"name\":\"当涂县\",\"latter\":\"D\"},{\"name\":\"含山县\",\"latter\":\"H\"},{\"name\":\"和县\",\"latter\":\"H\"}],\"latter\":\"M\"},{\"name\":\"淮北市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"杜集区\",\"latter\":\"D\"},{\"name\":\"相山区\",\"latter\":\"X\"},{\"name\":\"烈山区\",\"latter\":\"L\"},{\"name\":\"濉溪县\",\"latter\":\"S\"}],\"latter\":\"H\"},{\"name\":\"铜陵市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"铜官山区\",\"latter\":\"T\"},{\"name\":\"狮子山区\",\"latter\":\"S\"},{\"name\":\"郊区\",\"latter\":\"J\"},{\"name\":\"铜陵县\",\"latter\":\"T\"}],\"latter\":\"T\"},{\"name\":\"安庆市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"迎江区\",\"latter\":\"Y\"},{\"name\":\"大观区\",\"latter\":\"D\"},{\"name\":\"宜秀区\",\"latter\":\"Y\"},{\"name\":\"怀宁县\",\"latter\":\"H\"},{\"name\":\"枞阳县\",\"latter\":\"C\"},{\"name\":\"潜山县\",\"latter\":\"Q\"},{\"name\":\"太湖县\",\"latter\":\"T\"},{\"name\":\"宿松县\",\"latter\":\"S\"},{\"name\":\"望江县\",\"latter\":\"W\"},{\"name\":\"岳西县\",\"latter\":\"Y\"},{\"name\":\"桐城市\",\"latter\":\"T\"}],\"latter\":\"A\"},{\"name\":\"黄山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"屯溪区\",\"latter\":\"T\"},{\"name\":\"黄山区\",\"latter\":\"H\"},{\"name\":\"徽州区\",\"latter\":\"H\"},{\"name\":\"歙县\",\"latter\":\"X\"},{\"name\":\"休宁县\",\"latter\":\"X\"},{\"name\":\"黟县\",\"latter\":\"Y\"},{\"name\":\"祁门县\",\"latter\":\"Q\"}],\"latter\":\"H\"},{\"name\":\"滁州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"琅琊区\",\"latter\":\"L\"},{\"name\":\"南谯区\",\"latter\":\"N\"},{\"name\":\"来安县\",\"latter\":\"L\"},{\"name\":\"全椒县\",\"latter\":\"Q\"},{\"name\":\"定远县\",\"latter\":\"D\"},{\"name\":\"凤阳县\",\"latter\":\"F\"},{\"name\":\"天长市\",\"latter\":\"T\"},{\"name\":\"明光市\",\"latter\":\"M\"}],\"latter\":\"C\"},{\"name\":\"阜阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"颍州区\",\"latter\":\"Y\"},{\"name\":\"颍东区\",\"latter\":\"Y\"},{\"name\":\"颍泉区\",\"latter\":\"Y\"},{\"name\":\"临泉县\",\"latter\":\"L\"},{\"name\":\"太和县\",\"latter\":\"T\"},{\"name\":\"阜南县\",\"latter\":\"F\"},{\"name\":\"颍上县\",\"latter\":\"Y\"},{\"name\":\"界首市\",\"latter\":\"J\"}],\"latter\":\"F\"},{\"name\":\"宿州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"埇桥区\",\"latter\":\"Y\"},{\"name\":\"砀山县\",\"latter\":\"D\"},{\"name\":\"萧县\",\"latter\":\"X\"},{\"name\":\"灵璧县\",\"latter\":\"L\"},{\"name\":\"泗县\",\"latter\":\"S\"}],\"latter\":\"S\"},{\"name\":\"六安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"金安区\",\"latter\":\"J\"},{\"name\":\"裕安区\",\"latter\":\"Y\"},{\"name\":\"寿县\",\"latter\":\"S\"},{\"name\":\"霍邱县\",\"latter\":\"H\"},{\"name\":\"舒城县\",\"latter\":\"S\"},{\"name\":\"金寨县\",\"latter\":\"J\"},{\"name\":\"霍山县\",\"latter\":\"H\"}],\"latter\":\"L\"},{\"name\":\"亳州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"谯城区\",\"latter\":\"Q\"},{\"name\":\"涡阳县\",\"latter\":\"W\"},{\"name\":\"蒙城县\",\"latter\":\"M\"},{\"name\":\"利辛县\",\"latter\":\"L\"}],\"latter\":\"B\"},{\"name\":\"池州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"贵池区\",\"latter\":\"G\"},{\"name\":\"东至县\",\"latter\":\"D\"},{\"name\":\"石台县\",\"latter\":\"S\"},{\"name\":\"青阳县\",\"latter\":\"Q\"}],\"latter\":\"C\"},{\"name\":\"宣城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"宣州区\",\"latter\":\"X\"},{\"name\":\"郎溪县\",\"latter\":\"L\"},{\"name\":\"广德县\",\"latter\":\"G\"},{\"name\":\"泾县\",\"latter\":\"J\"},{\"name\":\"绩溪县\",\"latter\":\"J\"},{\"name\":\"旌德县\",\"latter\":\"J\"},{\"name\":\"宁国市\",\"latter\":\"N\"}],\"latter\":\"X\"}],\"latter\":\"A\"},{\"name\":\"福建省\",\"children\":[{\"name\":\"福州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鼓楼区\",\"latter\":\"G\"},{\"name\":\"台江区\",\"latter\":\"T\"},{\"name\":\"仓山区\",\"latter\":\"C\"},{\"name\":\"马尾区\",\"latter\":\"M\"},{\"name\":\"晋安区\",\"latter\":\"J\"},{\"name\":\"闽侯县\",\"latter\":\"M\"},{\"name\":\"连江县\",\"latter\":\"L\"},{\"name\":\"罗源县\",\"latter\":\"L\"},{\"name\":\"闽清县\",\"latter\":\"M\"},{\"name\":\"永泰县\",\"latter\":\"Y\"},{\"name\":\"平潭县\",\"latter\":\"P\"},{\"name\":\"福清市\",\"latter\":\"F\"},{\"name\":\"长乐市\",\"latter\":\"C\"}],\"latter\":\"F\"},{\"name\":\"厦门市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"思明区\",\"latter\":\"S\"},{\"name\":\"海沧区\",\"latter\":\"H\"},{\"name\":\"湖里区\",\"latter\":\"H\"},{\"name\":\"集美区\",\"latter\":\"J\"},{\"name\":\"同安区\",\"latter\":\"T\"},{\"name\":\"翔安区\",\"latter\":\"X\"}],\"latter\":\"S\"},{\"name\":\"莆田市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城厢区\",\"latter\":\"C\"},{\"name\":\"涵江区\",\"latter\":\"H\"},{\"name\":\"荔城区\",\"latter\":\"L\"},{\"name\":\"秀屿区\",\"latter\":\"X\"},{\"name\":\"仙游县\",\"latter\":\"X\"}],\"latter\":\"P\"},{\"name\":\"三明市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"梅列区\",\"latter\":\"M\"},{\"name\":\"三元区\",\"latter\":\"S\"},{\"name\":\"明溪县\",\"latter\":\"M\"},{\"name\":\"清流县\",\"latter\":\"Q\"},{\"name\":\"宁化县\",\"latter\":\"N\"},{\"name\":\"大田县\",\"latter\":\"D\"},{\"name\":\"尤溪县\",\"latter\":\"Y\"},{\"name\":\"沙县\",\"latter\":\"S\"},{\"name\":\"将乐县\",\"latter\":\"J\"},{\"name\":\"泰宁县\",\"latter\":\"T\"},{\"name\":\"建宁县\",\"latter\":\"J\"},{\"name\":\"永安市\",\"latter\":\"Y\"}],\"latter\":\"S\"},{\"name\":\"泉州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鲤城区\",\"latter\":\"L\"},{\"name\":\"丰泽区\",\"latter\":\"F\"},{\"name\":\"洛江区\",\"latter\":\"L\"},{\"name\":\"泉港区\",\"latter\":\"Q\"},{\"name\":\"惠安县\",\"latter\":\"H\"},{\"name\":\"安溪县\",\"latter\":\"A\"},{\"name\":\"永春县\",\"latter\":\"Y\"},{\"name\":\"德化县\",\"latter\":\"D\"},{\"name\":\"金门县\",\"latter\":\"J\"},{\"name\":\"石狮市\",\"latter\":\"S\"},{\"name\":\"晋江市\",\"latter\":\"J\"},{\"name\":\"南安市\",\"latter\":\"N\"}],\"latter\":\"Q\"},{\"name\":\"漳州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"芗城区\",\"latter\":\"X\"},{\"name\":\"龙文区\",\"latter\":\"L\"},{\"name\":\"云霄县\",\"latter\":\"Y\"},{\"name\":\"漳浦县\",\"latter\":\"Z\"},{\"name\":\"诏安县\",\"latter\":\"Z\"},{\"name\":\"长泰县\",\"latter\":\"C\"},{\"name\":\"东山县\",\"latter\":\"D\"},{\"name\":\"南靖县\",\"latter\":\"N\"},{\"name\":\"平和县\",\"latter\":\"P\"},{\"name\":\"华安县\",\"latter\":\"H\"},{\"name\":\"龙海市\",\"latter\":\"L\"}],\"latter\":\"Z\"},{\"name\":\"南平市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"延平区\",\"latter\":\"Y\"},{\"name\":\"顺昌县\",\"latter\":\"S\"},{\"name\":\"浦城县\",\"latter\":\"P\"},{\"name\":\"光泽县\",\"latter\":\"G\"},{\"name\":\"松溪县\",\"latter\":\"S\"},{\"name\":\"政和县\",\"latter\":\"Z\"},{\"name\":\"邵武市\",\"latter\":\"S\"},{\"name\":\"武夷山市\",\"latter\":\"W\"},{\"name\":\"建瓯市\",\"latter\":\"J\"},{\"name\":\"建阳市\",\"latter\":\"J\"}],\"latter\":\"N\"},{\"name\":\"龙岩市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新罗区\",\"latter\":\"X\"},{\"name\":\"长汀县\",\"latter\":\"C\"},{\"name\":\"永定县\",\"latter\":\"Y\"},{\"name\":\"上杭县\",\"latter\":\"S\"},{\"name\":\"武平县\",\"latter\":\"W\"},{\"name\":\"连城县\",\"latter\":\"L\"},{\"name\":\"漳平市\",\"latter\":\"Z\"}],\"latter\":\"L\"},{\"name\":\"宁德市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"蕉城区\",\"latter\":\"J\"},{\"name\":\"霞浦县\",\"latter\":\"X\"},{\"name\":\"古田县\",\"latter\":\"G\"},{\"name\":\"屏南县\",\"latter\":\"P\"},{\"name\":\"寿宁县\",\"latter\":\"S\"},{\"name\":\"周宁县\",\"latter\":\"Z\"},{\"name\":\"柘荣县\",\"latter\":\"Z\"},{\"name\":\"福安市\",\"latter\":\"F\"},{\"name\":\"福鼎市\",\"latter\":\"F\"}],\"latter\":\"N\"}],\"latter\":\"F\"},{\"name\":\"江西省\",\"children\":[{\"name\":\"南昌市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东湖区\",\"latter\":\"D\"},{\"name\":\"西湖区\",\"latter\":\"X\"},{\"name\":\"青云谱区\",\"latter\":\"Q\"},{\"name\":\"湾里区\",\"latter\":\"W\"},{\"name\":\"青山湖区\",\"latter\":\"Q\"},{\"name\":\"南昌县\",\"latter\":\"N\"},{\"name\":\"新建县\",\"latter\":\"X\"},{\"name\":\"安义县\",\"latter\":\"A\"},{\"name\":\"进贤县\",\"latter\":\"J\"}],\"latter\":\"N\"},{\"name\":\"景德镇市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"昌江区\",\"latter\":\"C\"},{\"name\":\"珠山区\",\"latter\":\"Z\"},{\"name\":\"浮梁县\",\"latter\":\"F\"},{\"name\":\"乐平市\",\"latter\":\"L\"}],\"latter\":\"J\"},{\"name\":\"萍乡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"安源区\",\"latter\":\"A\"},{\"name\":\"湘东区\",\"latter\":\"X\"},{\"name\":\"莲花县\",\"latter\":\"L\"},{\"name\":\"上栗县\",\"latter\":\"S\"},{\"name\":\"芦溪县\",\"latter\":\"L\"}],\"latter\":\"P\"},{\"name\":\"九江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"庐山区\",\"latter\":\"L\"},{\"name\":\"浔阳区\",\"latter\":\"X\"},{\"name\":\"九江县\",\"latter\":\"J\"},{\"name\":\"武宁县\",\"latter\":\"W\"},{\"name\":\"修水县\",\"latter\":\"X\"},{\"name\":\"永修县\",\"latter\":\"Y\"},{\"name\":\"德安县\",\"latter\":\"D\"},{\"name\":\"星子县\",\"latter\":\"X\"},{\"name\":\"都昌县\",\"latter\":\"D\"},{\"name\":\"湖口县\",\"latter\":\"H\"},{\"name\":\"彭泽县\",\"latter\":\"P\"},{\"name\":\"瑞昌市\",\"latter\":\"R\"},{\"name\":\"共青城市\",\"latter\":\"G\"}],\"latter\":\"J\"},{\"name\":\"新余市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"渝水区\",\"latter\":\"Y\"},{\"name\":\"分宜县\",\"latter\":\"F\"}],\"latter\":\"X\"},{\"name\":\"鹰潭市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"月湖区\",\"latter\":\"Y\"},{\"name\":\"余江县\",\"latter\":\"Y\"},{\"name\":\"贵溪市\",\"latter\":\"G\"}],\"latter\":\"Y\"},{\"name\":\"赣州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"章贡区\",\"latter\":\"Z\"},{\"name\":\"赣县\",\"latter\":\"G\"},{\"name\":\"信丰县\",\"latter\":\"X\"},{\"name\":\"大余县\",\"latter\":\"D\"},{\"name\":\"上犹县\",\"latter\":\"S\"},{\"name\":\"崇义县\",\"latter\":\"C\"},{\"name\":\"安远县\",\"latter\":\"A\"},{\"name\":\"龙南县\",\"latter\":\"L\"},{\"name\":\"定南县\",\"latter\":\"D\"},{\"name\":\"全南县\",\"latter\":\"Q\"},{\"name\":\"宁都县\",\"latter\":\"N\"},{\"name\":\"于都县\",\"latter\":\"Y\"},{\"name\":\"兴国县\",\"latter\":\"X\"},{\"name\":\"会昌县\",\"latter\":\"H\"},{\"name\":\"寻乌县\",\"latter\":\"X\"},{\"name\":\"石城县\",\"latter\":\"S\"},{\"name\":\"瑞金市\",\"latter\":\"R\"},{\"name\":\"南康市\",\"latter\":\"N\"}],\"latter\":\"G\"},{\"name\":\"吉安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"吉州区\",\"latter\":\"J\"},{\"name\":\"青原区\",\"latter\":\"Q\"},{\"name\":\"吉安县\",\"latter\":\"J\"},{\"name\":\"吉水县\",\"latter\":\"J\"},{\"name\":\"峡江县\",\"latter\":\"X\"},{\"name\":\"新干县\",\"latter\":\"X\"},{\"name\":\"永丰县\",\"latter\":\"Y\"},{\"name\":\"泰和县\",\"latter\":\"T\"},{\"name\":\"遂川县\",\"latter\":\"S\"},{\"name\":\"万安县\",\"latter\":\"W\"},{\"name\":\"安福县\",\"latter\":\"A\"},{\"name\":\"永新县\",\"latter\":\"Y\"},{\"name\":\"井冈山市\",\"latter\":\"J\"}],\"latter\":\"J\"},{\"name\":\"宜春市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"袁州区\",\"latter\":\"Y\"},{\"name\":\"奉新县\",\"latter\":\"F\"},{\"name\":\"万载县\",\"latter\":\"W\"},{\"name\":\"上高县\",\"latter\":\"S\"},{\"name\":\"宜丰县\",\"latter\":\"Y\"},{\"name\":\"靖安县\",\"latter\":\"J\"},{\"name\":\"铜鼓县\",\"latter\":\"T\"},{\"name\":\"丰城市\",\"latter\":\"F\"},{\"name\":\"樟树市\",\"latter\":\"Z\"},{\"name\":\"高安市\",\"latter\":\"G\"}],\"latter\":\"Y\"},{\"name\":\"抚州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"临川区\",\"latter\":\"L\"},{\"name\":\"南城县\",\"latter\":\"N\"},{\"name\":\"黎川县\",\"latter\":\"L\"},{\"name\":\"南丰县\",\"latter\":\"N\"},{\"name\":\"崇仁县\",\"latter\":\"C\"},{\"name\":\"乐安县\",\"latter\":\"L\"},{\"name\":\"宜黄县\",\"latter\":\"Y\"},{\"name\":\"金溪县\",\"latter\":\"J\"},{\"name\":\"资溪县\",\"latter\":\"Z\"},{\"name\":\"东乡县\",\"latter\":\"D\"},{\"name\":\"广昌县\",\"latter\":\"G\"}],\"latter\":\"F\"},{\"name\":\"上饶市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"信州区\",\"latter\":\"X\"},{\"name\":\"上饶县\",\"latter\":\"S\"},{\"name\":\"广丰县\",\"latter\":\"G\"},{\"name\":\"玉山县\",\"latter\":\"Y\"},{\"name\":\"铅山县\",\"latter\":\"Q\"},{\"name\":\"横峰县\",\"latter\":\"H\"},{\"name\":\"弋阳县\",\"latter\":\"Y\"},{\"name\":\"余干县\",\"latter\":\"Y\"},{\"name\":\"鄱阳县\",\"latter\":\"P\"},{\"name\":\"万年县\",\"latter\":\"W\"},{\"name\":\"婺源县\",\"latter\":\"W\"},{\"name\":\"德兴市\",\"latter\":\"D\"}],\"latter\":\"S\"}],\"latter\":\"J\"},{\"name\":\"山东省\",\"children\":[{\"name\":\"济南市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"历下区\",\"latter\":\"L\"},{\"name\":\"市中区\",\"latter\":\"S\"},{\"name\":\"槐荫区\",\"latter\":\"H\"},{\"name\":\"天桥区\",\"latter\":\"T\"},{\"name\":\"历城区\",\"latter\":\"L\"},{\"name\":\"长清区\",\"latter\":\"C\"},{\"name\":\"平阴县\",\"latter\":\"P\"},{\"name\":\"济阳县\",\"latter\":\"J\"},{\"name\":\"商河县\",\"latter\":\"S\"},{\"name\":\"章丘市\",\"latter\":\"Z\"}],\"latter\":\"J\"},{\"name\":\"青岛市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"市南区\",\"latter\":\"S\"},{\"name\":\"市北区\",\"latter\":\"S\"},{\"name\":\"黄岛区\",\"latter\":\"H\"},{\"name\":\"崂山区\",\"latter\":\"L\"},{\"name\":\"李沧区\",\"latter\":\"L\"},{\"name\":\"城阳区\",\"latter\":\"C\"},{\"name\":\"胶州市\",\"latter\":\"J\"},{\"name\":\"即墨市\",\"latter\":\"J\"},{\"name\":\"平度市\",\"latter\":\"P\"},{\"name\":\"莱西市\",\"latter\":\"L\"}],\"latter\":\"Q\"},{\"name\":\"淄博市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"淄川区\",\"latter\":\"Z\"},{\"name\":\"张店区\",\"latter\":\"Z\"},{\"name\":\"博山区\",\"latter\":\"B\"},{\"name\":\"临淄区\",\"latter\":\"L\"},{\"name\":\"周村区\",\"latter\":\"Z\"},{\"name\":\"桓台县\",\"latter\":\"H\"},{\"name\":\"高青县\",\"latter\":\"G\"},{\"name\":\"沂源县\",\"latter\":\"Y\"}],\"latter\":\"Z\"},{\"name\":\"枣庄市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"市中区\",\"latter\":\"S\"},{\"name\":\"薛城区\",\"latter\":\"X\"},{\"name\":\"峄城区\",\"latter\":\"Y\"},{\"name\":\"台儿庄区\",\"latter\":\"T\"},{\"name\":\"山亭区\",\"latter\":\"S\"},{\"name\":\"滕州市\",\"latter\":\"T\"}],\"latter\":\"Z\"},{\"name\":\"东营市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东营区\",\"latter\":\"D\"},{\"name\":\"河口区\",\"latter\":\"H\"},{\"name\":\"垦利县\",\"latter\":\"K\"},{\"name\":\"利津县\",\"latter\":\"L\"},{\"name\":\"广饶县\",\"latter\":\"G\"}],\"latter\":\"D\"},{\"name\":\"烟台市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"芝罘区\",\"latter\":\"Z\"},{\"name\":\"福山区\",\"latter\":\"F\"},{\"name\":\"牟平区\",\"latter\":\"M\"},{\"name\":\"莱山区\",\"latter\":\"L\"},{\"name\":\"长岛县\",\"latter\":\"C\"},{\"name\":\"龙口市\",\"latter\":\"L\"},{\"name\":\"莱阳市\",\"latter\":\"L\"},{\"name\":\"莱州市\",\"latter\":\"L\"},{\"name\":\"蓬莱市\",\"latter\":\"P\"},{\"name\":\"招远市\",\"latter\":\"Z\"},{\"name\":\"栖霞市\",\"latter\":\"Q\"},{\"name\":\"海阳市\",\"latter\":\"H\"}],\"latter\":\"Y\"},{\"name\":\"潍坊市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"潍城区\",\"latter\":\"W\"},{\"name\":\"寒亭区\",\"latter\":\"H\"},{\"name\":\"坊子区\",\"latter\":\"F\"},{\"name\":\"奎文区\",\"latter\":\"K\"},{\"name\":\"临朐县\",\"latter\":\"L\"},{\"name\":\"昌乐县\",\"latter\":\"C\"},{\"name\":\"青州市\",\"latter\":\"Q\"},{\"name\":\"诸城市\",\"latter\":\"Z\"},{\"name\":\"寿光市\",\"latter\":\"S\"},{\"name\":\"安丘市\",\"latter\":\"A\"},{\"name\":\"高密市\",\"latter\":\"G\"},{\"name\":\"昌邑市\",\"latter\":\"C\"}],\"latter\":\"W\"},{\"name\":\"济宁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"市中区\",\"latter\":\"S\"},{\"name\":\"任城区\",\"latter\":\"R\"},{\"name\":\"微山县\",\"latter\":\"W\"},{\"name\":\"鱼台县\",\"latter\":\"Y\"},{\"name\":\"金乡县\",\"latter\":\"J\"},{\"name\":\"嘉祥县\",\"latter\":\"J\"},{\"name\":\"汶上县\",\"latter\":\"W\"},{\"name\":\"泗水县\",\"latter\":\"S\"},{\"name\":\"梁山县\",\"latter\":\"L\"},{\"name\":\"曲阜市\",\"latter\":\"Q\"},{\"name\":\"兖州市\",\"latter\":\"Y\"},{\"name\":\"邹城市\",\"latter\":\"Z\"}],\"latter\":\"J\"},{\"name\":\"泰安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"泰山区\",\"latter\":\"T\"},{\"name\":\"岱岳区\",\"latter\":\"D\"},{\"name\":\"宁阳县\",\"latter\":\"N\"},{\"name\":\"东平县\",\"latter\":\"D\"},{\"name\":\"新泰市\",\"latter\":\"X\"},{\"name\":\"肥城市\",\"latter\":\"F\"}],\"latter\":\"T\"},{\"name\":\"威海市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"环翠区\",\"latter\":\"H\"},{\"name\":\"文登市\",\"latter\":\"W\"},{\"name\":\"荣成市\",\"latter\":\"R\"},{\"name\":\"乳山市\",\"latter\":\"R\"}],\"latter\":\"W\"},{\"name\":\"日照市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东港区\",\"latter\":\"D\"},{\"name\":\"岚山区\",\"latter\":\"L\"},{\"name\":\"五莲县\",\"latter\":\"W\"},{\"name\":\"莒县\",\"latter\":\"J\"}],\"latter\":\"R\"},{\"name\":\"莱芜市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"莱城区\",\"latter\":\"L\"},{\"name\":\"钢城区\",\"latter\":\"G\"}],\"latter\":\"L\"},{\"name\":\"临沂市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"兰山区\",\"latter\":\"L\"},{\"name\":\"罗庄区\",\"latter\":\"L\"},{\"name\":\"河东区\",\"latter\":\"H\"},{\"name\":\"沂南县\",\"latter\":\"Y\"},{\"name\":\"郯城县\",\"latter\":\"T\"},{\"name\":\"沂水县\",\"latter\":\"Y\"},{\"name\":\"苍山县\",\"latter\":\"C\"},{\"name\":\"费县\",\"latter\":\"F\"},{\"name\":\"平邑县\",\"latter\":\"P\"},{\"name\":\"莒南县\",\"latter\":\"J\"},{\"name\":\"蒙阴县\",\"latter\":\"M\"},{\"name\":\"临沭县\",\"latter\":\"L\"}],\"latter\":\"L\"},{\"name\":\"德州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"德城区\",\"latter\":\"D\"},{\"name\":\"陵县\",\"latter\":\"L\"},{\"name\":\"宁津县\",\"latter\":\"N\"},{\"name\":\"庆云县\",\"latter\":\"Q\"},{\"name\":\"临邑县\",\"latter\":\"L\"},{\"name\":\"齐河县\",\"latter\":\"Q\"},{\"name\":\"平原县\",\"latter\":\"P\"},{\"name\":\"夏津县\",\"latter\":\"X\"},{\"name\":\"武城县\",\"latter\":\"W\"},{\"name\":\"乐陵市\",\"latter\":\"L\"},{\"name\":\"禹城市\",\"latter\":\"Y\"}],\"latter\":\"D\"},{\"name\":\"聊城市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东昌府区\",\"latter\":\"D\"},{\"name\":\"阳谷县\",\"latter\":\"Y\"},{\"name\":\"莘县\",\"latter\":\"S\"},{\"name\":\"茌平县\",\"latter\":\"C\"},{\"name\":\"东阿县\",\"latter\":\"D\"},{\"name\":\"冠县\",\"latter\":\"G\"},{\"name\":\"高唐县\",\"latter\":\"G\"},{\"name\":\"临清市\",\"latter\":\"L\"}],\"latter\":\"L\"},{\"name\":\"滨州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"滨城区\",\"latter\":\"B\"},{\"name\":\"惠民县\",\"latter\":\"H\"},{\"name\":\"阳信县\",\"latter\":\"Y\"},{\"name\":\"无棣县\",\"latter\":\"W\"},{\"name\":\"沾化县\",\"latter\":\"Z\"},{\"name\":\"博兴县\",\"latter\":\"B\"},{\"name\":\"邹平县\",\"latter\":\"Z\"}],\"latter\":\"B\"},{\"name\":\"菏泽市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"牡丹区\",\"latter\":\"M\"},{\"name\":\"曹县\",\"latter\":\"C\"},{\"name\":\"单县\",\"latter\":\"D\"},{\"name\":\"成武县\",\"latter\":\"C\"},{\"name\":\"巨野县\",\"latter\":\"J\"},{\"name\":\"郓城县\",\"latter\":\"Y\"},{\"name\":\"鄄城县\",\"latter\":\"J\"},{\"name\":\"定陶县\",\"latter\":\"D\"},{\"name\":\"东明县\",\"latter\":\"D\"}],\"latter\":\"H\"}],\"latter\":\"S\"},{\"name\":\"河南省\",\"children\":[{\"name\":\"郑州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"中原区\",\"latter\":\"Z\"},{\"name\":\"二七区\",\"latter\":\"E\"},{\"name\":\"管城回族区\",\"latter\":\"G\"},{\"name\":\"金水区\",\"latter\":\"J\"},{\"name\":\"上街区\",\"latter\":\"S\"},{\"name\":\"惠济区\",\"latter\":\"H\"},{\"name\":\"中牟县\",\"latter\":\"Z\"},{\"name\":\"巩义市\",\"latter\":\"G\"},{\"name\":\"荥阳市\",\"latter\":\"X\"},{\"name\":\"新密市\",\"latter\":\"X\"},{\"name\":\"新郑市\",\"latter\":\"X\"},{\"name\":\"登封市\",\"latter\":\"D\"}],\"latter\":\"Z\"},{\"name\":\"开封市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"龙亭区\",\"latter\":\"L\"},{\"name\":\"顺河回族区\",\"latter\":\"S\"},{\"name\":\"鼓楼区\",\"latter\":\"G\"},{\"name\":\"禹王台区\",\"latter\":\"Y\"},{\"name\":\"金明区\",\"latter\":\"J\"},{\"name\":\"杞县\",\"latter\":\"Q\"},{\"name\":\"通许县\",\"latter\":\"T\"},{\"name\":\"尉氏县\",\"latter\":\"W\"},{\"name\":\"开封县\",\"latter\":\"K\"},{\"name\":\"兰考县\",\"latter\":\"L\"}],\"latter\":\"K\"},{\"name\":\"洛阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"老城区\",\"latter\":\"L\"},{\"name\":\"西工区\",\"latter\":\"X\"},{\"name\":\"瀍河回族区\",\"latter\":\"C\"},{\"name\":\"涧西区\",\"latter\":\"J\"},{\"name\":\"吉利区\",\"latter\":\"J\"},{\"name\":\"洛龙区\",\"latter\":\"L\"},{\"name\":\"孟津县\",\"latter\":\"M\"},{\"name\":\"新安县\",\"latter\":\"X\"},{\"name\":\"栾川县\",\"latter\":\"L\"},{\"name\":\"嵩县\",\"latter\":\"S\"},{\"name\":\"汝阳县\",\"latter\":\"R\"},{\"name\":\"宜阳县\",\"latter\":\"Y\"},{\"name\":\"洛宁县\",\"latter\":\"L\"},{\"name\":\"伊川县\",\"latter\":\"Y\"},{\"name\":\"偃师市\",\"latter\":\"Y\"}],\"latter\":\"L\"},{\"name\":\"平顶山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新华区\",\"latter\":\"X\"},{\"name\":\"卫东区\",\"latter\":\"W\"},{\"name\":\"石龙区\",\"latter\":\"S\"},{\"name\":\"湛河区\",\"latter\":\"Z\"},{\"name\":\"宝丰县\",\"latter\":\"B\"},{\"name\":\"叶县\",\"latter\":\"Y\"},{\"name\":\"鲁山县\",\"latter\":\"L\"},{\"name\":\"郏县\",\"latter\":\"J\"},{\"name\":\"舞钢市\",\"latter\":\"W\"},{\"name\":\"汝州市\",\"latter\":\"R\"}],\"latter\":\"P\"},{\"name\":\"安阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"文峰区\",\"latter\":\"W\"},{\"name\":\"北关区\",\"latter\":\"B\"},{\"name\":\"殷都区\",\"latter\":\"Y\"},{\"name\":\"龙安区\",\"latter\":\"L\"},{\"name\":\"安阳县\",\"latter\":\"A\"},{\"name\":\"汤阴县\",\"latter\":\"T\"},{\"name\":\"滑县\",\"latter\":\"H\"},{\"name\":\"内黄县\",\"latter\":\"N\"},{\"name\":\"林州市\",\"latter\":\"L\"}],\"latter\":\"A\"},{\"name\":\"鹤壁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鹤山区\",\"latter\":\"H\"},{\"name\":\"山城区\",\"latter\":\"S\"},{\"name\":\"淇滨区\",\"latter\":\"Q\"},{\"name\":\"浚县\",\"latter\":\"J\"},{\"name\":\"淇县\",\"latter\":\"Q\"}],\"latter\":\"H\"},{\"name\":\"新乡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"红旗区\",\"latter\":\"H\"},{\"name\":\"卫滨区\",\"latter\":\"W\"},{\"name\":\"凤泉区\",\"latter\":\"F\"},{\"name\":\"牧野区\",\"latter\":\"M\"},{\"name\":\"新乡县\",\"latter\":\"X\"},{\"name\":\"获嘉县\",\"latter\":\"H\"},{\"name\":\"原阳县\",\"latter\":\"Y\"},{\"name\":\"延津县\",\"latter\":\"Y\"},{\"name\":\"封丘县\",\"latter\":\"F\"},{\"name\":\"长垣县\",\"latter\":\"C\"},{\"name\":\"卫辉市\",\"latter\":\"W\"},{\"name\":\"辉县市\",\"latter\":\"H\"}],\"latter\":\"X\"},{\"name\":\"焦作市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"解放区\",\"latter\":\"J\"},{\"name\":\"中站区\",\"latter\":\"Z\"},{\"name\":\"马村区\",\"latter\":\"M\"},{\"name\":\"山阳区\",\"latter\":\"S\"},{\"name\":\"修武县\",\"latter\":\"X\"},{\"name\":\"博爱县\",\"latter\":\"B\"},{\"name\":\"武陟县\",\"latter\":\"W\"},{\"name\":\"温县\",\"latter\":\"W\"},{\"name\":\"沁阳市\",\"latter\":\"Q\"},{\"name\":\"孟州市\",\"latter\":\"M\"}],\"latter\":\"J\"},{\"name\":\"濮阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"华龙区\",\"latter\":\"H\"},{\"name\":\"清丰县\",\"latter\":\"Q\"},{\"name\":\"南乐县\",\"latter\":\"N\"},{\"name\":\"范县\",\"latter\":\"F\"},{\"name\":\"台前县\",\"latter\":\"T\"},{\"name\":\"濮阳县\",\"latter\":\"P\"}],\"latter\":\"P\"},{\"name\":\"许昌市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"魏都区\",\"latter\":\"W\"},{\"name\":\"许昌县\",\"latter\":\"X\"},{\"name\":\"鄢陵县\",\"latter\":\"Y\"},{\"name\":\"襄城县\",\"latter\":\"X\"},{\"name\":\"禹州市\",\"latter\":\"Y\"},{\"name\":\"长葛市\",\"latter\":\"C\"}],\"latter\":\"X\"},{\"name\":\"漯河市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"源汇区\",\"latter\":\"Y\"},{\"name\":\"郾城区\",\"latter\":\"Y\"},{\"name\":\"召陵区\",\"latter\":\"Z\"},{\"name\":\"舞阳县\",\"latter\":\"W\"},{\"name\":\"临颍县\",\"latter\":\"L\"}],\"latter\":\"L\"},{\"name\":\"三门峡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"湖滨区\",\"latter\":\"H\"},{\"name\":\"渑池县\",\"latter\":\"M\"},{\"name\":\"陕县\",\"latter\":\"S\"},{\"name\":\"卢氏县\",\"latter\":\"L\"},{\"name\":\"义马市\",\"latter\":\"Y\"},{\"name\":\"灵宝市\",\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"南阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"宛城区\",\"latter\":\"W\"},{\"name\":\"卧龙区\",\"latter\":\"W\"},{\"name\":\"南召县\",\"latter\":\"N\"},{\"name\":\"方城县\",\"latter\":\"F\"},{\"name\":\"西峡县\",\"latter\":\"X\"},{\"name\":\"镇平县\",\"latter\":\"Z\"},{\"name\":\"内乡县\",\"latter\":\"N\"},{\"name\":\"淅川县\",\"latter\":\"X\"},{\"name\":\"社旗县\",\"latter\":\"S\"},{\"name\":\"唐河县\",\"latter\":\"T\"},{\"name\":\"新野县\",\"latter\":\"X\"},{\"name\":\"桐柏县\",\"latter\":\"T\"},{\"name\":\"邓州市\",\"latter\":\"D\"}],\"latter\":\"N\"},{\"name\":\"商丘市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"梁园区\",\"latter\":\"L\"},{\"name\":\"睢阳区\",\"latter\":\"H\"},{\"name\":\"民权县\",\"latter\":\"M\"},{\"name\":\"睢县\",\"latter\":\"H\"},{\"name\":\"宁陵县\",\"latter\":\"N\"},{\"name\":\"柘城县\",\"latter\":\"Z\"},{\"name\":\"虞城县\",\"latter\":\"Y\"},{\"name\":\"夏邑县\",\"latter\":\"X\"},{\"name\":\"永城市\",\"latter\":\"Y\"}],\"latter\":\"S\"},{\"name\":\"信阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"浉河区\",\"latter\":\"S\"},{\"name\":\"平桥区\",\"latter\":\"P\"},{\"name\":\"罗山县\",\"latter\":\"L\"},{\"name\":\"光山县\",\"latter\":\"G\"},{\"name\":\"新县\",\"latter\":\"X\"},{\"name\":\"商城县\",\"latter\":\"S\"},{\"name\":\"固始县\",\"latter\":\"G\"},{\"name\":\"潢川县\",\"latter\":\"H\"},{\"name\":\"淮滨县\",\"latter\":\"H\"},{\"name\":\"息县\",\"latter\":\"X\"}],\"latter\":\"X\"},{\"name\":\"周口市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"川汇区\",\"latter\":\"C\"},{\"name\":\"扶沟县\",\"latter\":\"F\"},{\"name\":\"西华县\",\"latter\":\"X\"},{\"name\":\"商水县\",\"latter\":\"S\"},{\"name\":\"沈丘县\",\"latter\":\"S\"},{\"name\":\"郸城县\",\"latter\":\"D\"},{\"name\":\"淮阳县\",\"latter\":\"H\"},{\"name\":\"太康县\",\"latter\":\"T\"},{\"name\":\"鹿邑县\",\"latter\":\"L\"},{\"name\":\"项城市\",\"latter\":\"X\"}],\"latter\":\"Z\"},{\"name\":\"驻马店市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"驿城区\",\"latter\":\"Y\"},{\"name\":\"西平县\",\"latter\":\"X\"},{\"name\":\"上蔡县\",\"latter\":\"S\"},{\"name\":\"平舆县\",\"latter\":\"P\"},{\"name\":\"正阳县\",\"latter\":\"Z\"},{\"name\":\"确山县\",\"latter\":\"Q\"},{\"name\":\"泌阳县\",\"latter\":\"M\"},{\"name\":\"汝南县\",\"latter\":\"R\"},{\"name\":\"遂平县\",\"latter\":\"S\"},{\"name\":\"新蔡县\",\"latter\":\"X\"}],\"latter\":\"Z\"},{\"name\":\"省直辖县级行政区划\",\"children\":[{\"name\":\"济源市\",\"latter\":\"J\"}],\"latter\":\"S\"}],\"latter\":\"H\"},{\"name\":\"湖北省\",\"children\":[{\"name\":\"武汉市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"江岸区\",\"latter\":\"J\"},{\"name\":\"江汉区\",\"latter\":\"J\"},{\"name\":\"硚口区\",\"latter\":\"Q\"},{\"name\":\"汉阳区\",\"latter\":\"H\"},{\"name\":\"武昌区\",\"latter\":\"W\"},{\"name\":\"青山区\",\"latter\":\"Q\"},{\"name\":\"洪山区\",\"latter\":\"H\"},{\"name\":\"东西湖区\",\"latter\":\"D\"},{\"name\":\"汉南区\",\"latter\":\"H\"},{\"name\":\"蔡甸区\",\"latter\":\"C\"},{\"name\":\"江夏区\",\"latter\":\"J\"},{\"name\":\"黄陂区\",\"latter\":\"H\"},{\"name\":\"新洲区\",\"latter\":\"X\"}],\"latter\":\"W\"},{\"name\":\"黄石市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"黄石港区\",\"latter\":\"H\"},{\"name\":\"西塞山区\",\"latter\":\"X\"},{\"name\":\"下陆区\",\"latter\":\"X\"},{\"name\":\"铁山区\",\"latter\":\"T\"},{\"name\":\"阳新县\",\"latter\":\"Y\"},{\"name\":\"大冶市\",\"latter\":\"D\"}],\"latter\":\"H\"},{\"name\":\"十堰市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"茅箭区\",\"latter\":\"M\"},{\"name\":\"张湾区\",\"latter\":\"Z\"},{\"name\":\"郧县\",\"latter\":\"Y\"},{\"name\":\"郧西县\",\"latter\":\"Y\"},{\"name\":\"竹山县\",\"latter\":\"Z\"},{\"name\":\"竹溪县\",\"latter\":\"Z\"},{\"name\":\"房县\",\"latter\":\"F\"},{\"name\":\"丹江口市\",\"latter\":\"D\"}],\"latter\":\"S\"},{\"name\":\"宜昌市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"西陵区\",\"latter\":\"X\"},{\"name\":\"伍家岗区\",\"latter\":\"W\"},{\"name\":\"点军区\",\"latter\":\"D\"},{\"name\":\"猇亭区\",\"latter\":\"X\"},{\"name\":\"夷陵区\",\"latter\":\"Y\"},{\"name\":\"远安县\",\"latter\":\"Y\"},{\"name\":\"兴山县\",\"latter\":\"X\"},{\"name\":\"秭归县\",\"latter\":\"Z\"},{\"name\":\"长阳土家族自治县\",\"latter\":\"C\"},{\"name\":\"五峰土家族自治县\",\"latter\":\"W\"},{\"name\":\"宜都市\",\"latter\":\"Y\"},{\"name\":\"当阳市\",\"latter\":\"D\"},{\"name\":\"枝江市\",\"latter\":\"Z\"}],\"latter\":\"Y\"},{\"name\":\"襄阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"襄城区\",\"latter\":\"X\"},{\"name\":\"樊城区\",\"latter\":\"F\"},{\"name\":\"襄州区\",\"latter\":\"X\"},{\"name\":\"南漳县\",\"latter\":\"N\"},{\"name\":\"谷城县\",\"latter\":\"G\"},{\"name\":\"保康县\",\"latter\":\"B\"},{\"name\":\"老河口市\",\"latter\":\"L\"},{\"name\":\"枣阳市\",\"latter\":\"Z\"},{\"name\":\"宜城市\",\"latter\":\"Y\"}],\"latter\":\"X\"},{\"name\":\"鄂州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"梁子湖区\",\"latter\":\"L\"},{\"name\":\"华容区\",\"latter\":\"H\"},{\"name\":\"鄂城区\",\"latter\":\"E\"}],\"latter\":\"E\"},{\"name\":\"荆门市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东宝区\",\"latter\":\"D\"},{\"name\":\"掇刀区\",\"latter\":\"D\"},{\"name\":\"京山县\",\"latter\":\"J\"},{\"name\":\"沙洋县\",\"latter\":\"S\"},{\"name\":\"钟祥市\",\"latter\":\"Z\"}],\"latter\":\"J\"},{\"name\":\"孝感市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"孝南区\",\"latter\":\"X\"},{\"name\":\"孝昌县\",\"latter\":\"X\"},{\"name\":\"大悟县\",\"latter\":\"D\"},{\"name\":\"云梦县\",\"latter\":\"Y\"},{\"name\":\"应城市\",\"latter\":\"Y\"},{\"name\":\"安陆市\",\"latter\":\"A\"},{\"name\":\"汉川市\",\"latter\":\"H\"}],\"latter\":\"X\"},{\"name\":\"荆州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"沙市区\",\"latter\":\"S\"},{\"name\":\"荆州区\",\"latter\":\"J\"},{\"name\":\"公安县\",\"latter\":\"G\"},{\"name\":\"监利县\",\"latter\":\"J\"},{\"name\":\"江陵县\",\"latter\":\"J\"},{\"name\":\"石首市\",\"latter\":\"S\"},{\"name\":\"洪湖市\",\"latter\":\"H\"},{\"name\":\"松滋市\",\"latter\":\"S\"}],\"latter\":\"J\"},{\"name\":\"黄冈市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"黄州区\",\"latter\":\"H\"},{\"name\":\"团风县\",\"latter\":\"T\"},{\"name\":\"红安县\",\"latter\":\"H\"},{\"name\":\"罗田县\",\"latter\":\"L\"},{\"name\":\"英山县\",\"latter\":\"Y\"},{\"name\":\"浠水县\",\"latter\":\"X\"},{\"name\":\"蕲春县\",\"latter\":\"Q\"},{\"name\":\"黄梅县\",\"latter\":\"H\"},{\"name\":\"麻城市\",\"latter\":\"M\"},{\"name\":\"武穴市\",\"latter\":\"W\"}],\"latter\":\"H\"},{\"name\":\"咸宁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"咸安区\",\"latter\":\"X\"},{\"name\":\"嘉鱼县\",\"latter\":\"J\"},{\"name\":\"通城县\",\"latter\":\"T\"},{\"name\":\"崇阳县\",\"latter\":\"C\"},{\"name\":\"通山县\",\"latter\":\"T\"},{\"name\":\"赤壁市\",\"latter\":\"C\"}],\"latter\":\"X\"},{\"name\":\"随州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"曾都区\",\"latter\":\"Z\"},{\"name\":\"随县\",\"latter\":\"S\"},{\"name\":\"广水市\",\"latter\":\"G\"}],\"latter\":\"S\"},{\"name\":\"恩施土家族苗族自治州\",\"children\":[{\"name\":\"恩施市\",\"latter\":\"E\"},{\"name\":\"利川市\",\"latter\":\"L\"},{\"name\":\"建始县\",\"latter\":\"J\"},{\"name\":\"巴东县\",\"latter\":\"B\"},{\"name\":\"宣恩县\",\"latter\":\"X\"},{\"name\":\"咸丰县\",\"latter\":\"X\"},{\"name\":\"来凤县\",\"latter\":\"L\"},{\"name\":\"鹤峰县\",\"latter\":\"H\"}],\"latter\":\"E\"},{\"name\":\"省直辖县级行政区划\",\"children\":[{\"name\":\"仙桃市\",\"latter\":\"X\"},{\"name\":\"潜江市\",\"latter\":\"Q\"},{\"name\":\"天门市\",\"latter\":\"T\"},{\"name\":\"神农架林区\",\"latter\":\"S\"}],\"latter\":\"S\"}],\"latter\":\"H\"},{\"name\":\"湖南省\",\"children\":[{\"name\":\"长沙市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"芙蓉区\",\"latter\":\"F\"},{\"name\":\"天心区\",\"latter\":\"T\"},{\"name\":\"岳麓区\",\"latter\":\"Y\"},{\"name\":\"开福区\",\"latter\":\"K\"},{\"name\":\"雨花区\",\"latter\":\"Y\"},{\"name\":\"望城区\",\"latter\":\"W\"},{\"name\":\"长沙县\",\"latter\":\"C\"},{\"name\":\"宁乡县\",\"latter\":\"N\"},{\"name\":\"浏阳市\",\"latter\":\"L\"}],\"latter\":\"C\"},{\"name\":\"株洲市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"荷塘区\",\"latter\":\"H\"},{\"name\":\"芦淞区\",\"latter\":\"L\"},{\"name\":\"石峰区\",\"latter\":\"S\"},{\"name\":\"天元区\",\"latter\":\"T\"},{\"name\":\"株洲县\",\"latter\":\"Z\"},{\"name\":\"攸县\",\"latter\":\"Y\"},{\"name\":\"茶陵县\",\"latter\":\"C\"},{\"name\":\"炎陵县\",\"latter\":\"Y\"},{\"name\":\"醴陵市\",\"latter\":\"L\"}],\"latter\":\"Z\"},{\"name\":\"湘潭市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"雨湖区\",\"latter\":\"Y\"},{\"name\":\"岳塘区\",\"latter\":\"Y\"},{\"name\":\"湘潭县\",\"latter\":\"X\"},{\"name\":\"湘乡市\",\"latter\":\"X\"},{\"name\":\"韶山市\",\"latter\":\"S\"}],\"latter\":\"X\"},{\"name\":\"衡阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"珠晖区\",\"latter\":\"Z\"},{\"name\":\"雁峰区\",\"latter\":\"Y\"},{\"name\":\"石鼓区\",\"latter\":\"S\"},{\"name\":\"蒸湘区\",\"latter\":\"Z\"},{\"name\":\"南岳区\",\"latter\":\"N\"},{\"name\":\"衡阳县\",\"latter\":\"H\"},{\"name\":\"衡南县\",\"latter\":\"H\"},{\"name\":\"衡山县\",\"latter\":\"H\"},{\"name\":\"衡东县\",\"latter\":\"H\"},{\"name\":\"祁东县\",\"latter\":\"Q\"},{\"name\":\"耒阳市\",\"latter\":\"L\"},{\"name\":\"常宁市\",\"latter\":\"C\"}],\"latter\":\"H\"},{\"name\":\"邵阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"双清区\",\"latter\":\"S\"},{\"name\":\"大祥区\",\"latter\":\"D\"},{\"name\":\"北塔区\",\"latter\":\"B\"},{\"name\":\"邵东县\",\"latter\":\"S\"},{\"name\":\"新邵县\",\"latter\":\"X\"},{\"name\":\"邵阳县\",\"latter\":\"S\"},{\"name\":\"隆回县\",\"latter\":\"L\"},{\"name\":\"洞口县\",\"latter\":\"D\"},{\"name\":\"绥宁县\",\"latter\":\"S\"},{\"name\":\"新宁县\",\"latter\":\"X\"},{\"name\":\"城步苗族自治县\",\"latter\":\"C\"},{\"name\":\"武冈市\",\"latter\":\"W\"}],\"latter\":\"S\"},{\"name\":\"岳阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"岳阳楼区\",\"latter\":\"Y\"},{\"name\":\"云溪区\",\"latter\":\"Y\"},{\"name\":\"君山区\",\"latter\":\"J\"},{\"name\":\"岳阳县\",\"latter\":\"Y\"},{\"name\":\"华容县\",\"latter\":\"H\"},{\"name\":\"湘阴县\",\"latter\":\"X\"},{\"name\":\"平江县\",\"latter\":\"P\"},{\"name\":\"汨罗市\",\"latter\":\"M\"},{\"name\":\"临湘市\",\"latter\":\"L\"}],\"latter\":\"Y\"},{\"name\":\"常德市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"武陵区\",\"latter\":\"W\"},{\"name\":\"鼎城区\",\"latter\":\"D\"},{\"name\":\"安乡县\",\"latter\":\"A\"},{\"name\":\"汉寿县\",\"latter\":\"H\"},{\"name\":\"澧县\",\"latter\":\"L\"},{\"name\":\"临澧县\",\"latter\":\"L\"},{\"name\":\"桃源县\",\"latter\":\"T\"},{\"name\":\"石门县\",\"latter\":\"S\"},{\"name\":\"津市市\",\"latter\":\"J\"}],\"latter\":\"C\"},{\"name\":\"张家界市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"永定区\",\"latter\":\"Y\"},{\"name\":\"武陵源区\",\"latter\":\"W\"},{\"name\":\"慈利县\",\"latter\":\"C\"},{\"name\":\"桑植县\",\"latter\":\"S\"}],\"latter\":\"Z\"},{\"name\":\"益阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"资阳区\",\"latter\":\"Z\"},{\"name\":\"赫山区\",\"latter\":\"H\"},{\"name\":\"南县\",\"latter\":\"N\"},{\"name\":\"桃江县\",\"latter\":\"T\"},{\"name\":\"安化县\",\"latter\":\"A\"},{\"name\":\"沅江市\",\"latter\":\"Y\"}],\"latter\":\"Y\"},{\"name\":\"郴州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"北湖区\",\"latter\":\"B\"},{\"name\":\"苏仙区\",\"latter\":\"S\"},{\"name\":\"桂阳县\",\"latter\":\"G\"},{\"name\":\"宜章县\",\"latter\":\"Y\"},{\"name\":\"永兴县\",\"latter\":\"Y\"},{\"name\":\"嘉禾县\",\"latter\":\"J\"},{\"name\":\"临武县\",\"latter\":\"L\"},{\"name\":\"汝城县\",\"latter\":\"R\"},{\"name\":\"桂东县\",\"latter\":\"G\"},{\"name\":\"安仁县\",\"latter\":\"A\"},{\"name\":\"资兴市\",\"latter\":\"Z\"}],\"latter\":\"C\"},{\"name\":\"永州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"零陵区\",\"latter\":\"L\"},{\"name\":\"冷水滩区\",\"latter\":\"L\"},{\"name\":\"祁阳县\",\"latter\":\"Q\"},{\"name\":\"东安县\",\"latter\":\"D\"},{\"name\":\"双牌县\",\"latter\":\"S\"},{\"name\":\"道县\",\"latter\":\"D\"},{\"name\":\"江永县\",\"latter\":\"J\"},{\"name\":\"宁远县\",\"latter\":\"N\"},{\"name\":\"蓝山县\",\"latter\":\"L\"},{\"name\":\"新田县\",\"latter\":\"X\"},{\"name\":\"江华瑶族自治县\",\"latter\":\"J\"}],\"latter\":\"Y\"},{\"name\":\"怀化市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"鹤城区\",\"latter\":\"H\"},{\"name\":\"中方县\",\"latter\":\"Z\"},{\"name\":\"沅陵县\",\"latter\":\"Y\"},{\"name\":\"辰溪县\",\"latter\":\"C\"},{\"name\":\"溆浦县\",\"latter\":\"X\"},{\"name\":\"会同县\",\"latter\":\"H\"},{\"name\":\"麻阳苗族自治县\",\"latter\":\"M\"},{\"name\":\"新晃侗族自治县\",\"latter\":\"X\"},{\"name\":\"芷江侗族自治县\",\"latter\":\"Z\"},{\"name\":\"靖州苗族侗族自治县\",\"latter\":\"J\"},{\"name\":\"通道侗族自治县\",\"latter\":\"T\"},{\"name\":\"洪江市\",\"latter\":\"H\"}],\"latter\":\"H\"},{\"name\":\"娄底市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"娄星区\",\"latter\":\"L\"},{\"name\":\"双峰县\",\"latter\":\"S\"},{\"name\":\"新化县\",\"latter\":\"X\"},{\"name\":\"冷水江市\",\"latter\":\"L\"},{\"name\":\"涟源市\",\"latter\":\"L\"}],\"latter\":\"L\"},{\"name\":\"湘西土家族苗族自治州\",\"children\":[{\"name\":\"吉首市\",\"latter\":\"J\"},{\"name\":\"泸溪县\",\"latter\":\"L\"},{\"name\":\"凤凰县\",\"latter\":\"F\"},{\"name\":\"花垣县\",\"latter\":\"H\"},{\"name\":\"保靖县\",\"latter\":\"B\"},{\"name\":\"古丈县\",\"latter\":\"G\"},{\"name\":\"永顺县\",\"latter\":\"Y\"},{\"name\":\"龙山县\",\"latter\":\"L\"}],\"latter\":\"X\"}],\"latter\":\"H\"},{\"name\":\"广东省\",\"children\":[{\"name\":\"广州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"荔湾区\",\"latter\":\"L\"},{\"name\":\"越秀区\",\"latter\":\"Y\"},{\"name\":\"海珠区\",\"latter\":\"H\"},{\"name\":\"天河区\",\"latter\":\"T\"},{\"name\":\"白云区\",\"latter\":\"B\"},{\"name\":\"黄埔区\",\"latter\":\"H\"},{\"name\":\"番禺区\",\"latter\":\"F\"},{\"name\":\"花都区\",\"latter\":\"H\"},{\"name\":\"南沙区\",\"latter\":\"N\"},{\"name\":\"萝岗区\",\"latter\":\"L\"},{\"name\":\"增城市\",\"latter\":\"Z\"},{\"name\":\"从化市\",\"latter\":\"C\"}],\"latter\":\"G\"},{\"name\":\"韶关市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"武江区\",\"latter\":\"W\"},{\"name\":\"浈江区\",\"latter\":\"Z\"},{\"name\":\"曲江区\",\"latter\":\"Q\"},{\"name\":\"始兴县\",\"latter\":\"S\"},{\"name\":\"仁化县\",\"latter\":\"R\"},{\"name\":\"翁源县\",\"latter\":\"W\"},{\"name\":\"乳源瑶族自治县\",\"latter\":\"R\"},{\"name\":\"新丰县\",\"latter\":\"X\"},{\"name\":\"乐昌市\",\"latter\":\"L\"},{\"name\":\"南雄市\",\"latter\":\"N\"}],\"latter\":\"S\"},{\"name\":\"深圳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"罗湖区\",\"latter\":\"L\"},{\"name\":\"福田区\",\"latter\":\"F\"},{\"name\":\"南山区\",\"latter\":\"N\"},{\"name\":\"宝安区\",\"latter\":\"B\"},{\"name\":\"龙岗区\",\"latter\":\"L\"},{\"name\":\"盐田区\",\"latter\":\"Y\"}],\"latter\":\"S\"},{\"name\":\"珠海市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"香洲区\",\"latter\":\"X\"},{\"name\":\"斗门区\",\"latter\":\"D\"},{\"name\":\"金湾区\",\"latter\":\"J\"}],\"latter\":\"Z\"},{\"name\":\"汕头市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"龙湖区\",\"latter\":\"L\"},{\"name\":\"金平区\",\"latter\":\"J\"},{\"name\":\"濠江区\",\"latter\":\"H\"},{\"name\":\"潮阳区\",\"latter\":\"C\"},{\"name\":\"潮南区\",\"latter\":\"C\"},{\"name\":\"澄海区\",\"latter\":\"C\"},{\"name\":\"南澳县\",\"latter\":\"N\"}],\"latter\":\"S\"},{\"name\":\"佛山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"禅城区\",\"latter\":\"C\"},{\"name\":\"南海区\",\"latter\":\"N\"},{\"name\":\"顺德区\",\"latter\":\"S\"},{\"name\":\"三水区\",\"latter\":\"S\"},{\"name\":\"高明区\",\"latter\":\"G\"}],\"latter\":\"F\"},{\"name\":\"江门市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"蓬江区\",\"latter\":\"P\"},{\"name\":\"江海区\",\"latter\":\"J\"},{\"name\":\"新会区\",\"latter\":\"X\"},{\"name\":\"台山市\",\"latter\":\"T\"},{\"name\":\"开平市\",\"latter\":\"K\"},{\"name\":\"鹤山市\",\"latter\":\"H\"},{\"name\":\"恩平市\",\"latter\":\"E\"}],\"latter\":\"J\"},{\"name\":\"湛江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"赤坎区\",\"latter\":\"C\"},{\"name\":\"霞山区\",\"latter\":\"X\"},{\"name\":\"坡头区\",\"latter\":\"P\"},{\"name\":\"麻章区\",\"latter\":\"M\"},{\"name\":\"遂溪县\",\"latter\":\"S\"},{\"name\":\"徐闻县\",\"latter\":\"X\"},{\"name\":\"廉江市\",\"latter\":\"L\"},{\"name\":\"雷州市\",\"latter\":\"L\"},{\"name\":\"吴川市\",\"latter\":\"W\"}],\"latter\":\"Z\"},{\"name\":\"茂名市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"茂南区\",\"latter\":\"M\"},{\"name\":\"茂港区\",\"latter\":\"M\"},{\"name\":\"电白县\",\"latter\":\"D\"},{\"name\":\"高州市\",\"latter\":\"G\"},{\"name\":\"化州市\",\"latter\":\"H\"},{\"name\":\"信宜市\",\"latter\":\"X\"}],\"latter\":\"M\"},{\"name\":\"肇庆市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"端州区\",\"latter\":\"D\"},{\"name\":\"鼎湖区\",\"latter\":\"D\"},{\"name\":\"广宁县\",\"latter\":\"G\"},{\"name\":\"怀集县\",\"latter\":\"H\"},{\"name\":\"封开县\",\"latter\":\"F\"},{\"name\":\"德庆县\",\"latter\":\"D\"},{\"name\":\"高要市\",\"latter\":\"G\"},{\"name\":\"四会市\",\"latter\":\"S\"}],\"latter\":\"Z\"},{\"name\":\"惠州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"惠城区\",\"latter\":\"H\"},{\"name\":\"惠阳区\",\"latter\":\"H\"},{\"name\":\"博罗县\",\"latter\":\"B\"},{\"name\":\"惠东县\",\"latter\":\"H\"},{\"name\":\"龙门县\",\"latter\":\"L\"}],\"latter\":\"H\"},{\"name\":\"梅州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"梅江区\",\"latter\":\"M\"},{\"name\":\"梅县\",\"latter\":\"M\"},{\"name\":\"大埔县\",\"latter\":\"D\"},{\"name\":\"丰顺县\",\"latter\":\"F\"},{\"name\":\"五华县\",\"latter\":\"W\"},{\"name\":\"平远县\",\"latter\":\"P\"},{\"name\":\"蕉岭县\",\"latter\":\"J\"},{\"name\":\"兴宁市\",\"latter\":\"X\"}],\"latter\":\"M\"},{\"name\":\"汕尾市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城区\",\"latter\":\"C\"},{\"name\":\"海丰县\",\"latter\":\"H\"},{\"name\":\"陆河县\",\"latter\":\"L\"},{\"name\":\"陆丰市\",\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"河源市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"源城区\",\"latter\":\"Y\"},{\"name\":\"紫金县\",\"latter\":\"Z\"},{\"name\":\"龙川县\",\"latter\":\"L\"},{\"name\":\"连平县\",\"latter\":\"L\"},{\"name\":\"和平县\",\"latter\":\"H\"},{\"name\":\"东源县\",\"latter\":\"D\"}],\"latter\":\"H\"},{\"name\":\"阳江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"江城区\",\"latter\":\"J\"},{\"name\":\"阳西县\",\"latter\":\"Y\"},{\"name\":\"阳东县\",\"latter\":\"Y\"},{\"name\":\"阳春市\",\"latter\":\"Y\"}],\"latter\":\"Y\"},{\"name\":\"清远市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"清城区\",\"latter\":\"Q\"},{\"name\":\"清新区\",\"latter\":\"Q\"},{\"name\":\"佛冈县\",\"latter\":\"F\"},{\"name\":\"阳山县\",\"latter\":\"Y\"},{\"name\":\"连山壮族瑶族自治县\",\"latter\":\"L\"},{\"name\":\"连南瑶族自治县\",\"latter\":\"L\"},{\"name\":\"英德市\",\"latter\":\"Y\"},{\"name\":\"连州市\",\"latter\":\"L\"}],\"latter\":\"Q\"},{\"name\":\"东莞市\",\"latter\":\"D\"},{\"name\":\"中山市\",\"latter\":\"Z\"},{\"name\":\"潮州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"湘桥区\",\"latter\":\"X\"},{\"name\":\"潮安区\",\"latter\":\"C\"},{\"name\":\"饶平县\",\"latter\":\"R\"}],\"latter\":\"C\"},{\"name\":\"揭阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"榕城区\",\"latter\":\"R\"},{\"name\":\"揭东区\",\"latter\":\"J\"},{\"name\":\"揭西县\",\"latter\":\"J\"},{\"name\":\"惠来县\",\"latter\":\"H\"},{\"name\":\"普宁市\",\"latter\":\"P\"}],\"latter\":\"J\"},{\"name\":\"云浮市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"云城区\",\"latter\":\"Y\"},{\"name\":\"新兴县\",\"latter\":\"X\"},{\"name\":\"郁南县\",\"latter\":\"Y\"},{\"name\":\"云安县\",\"latter\":\"Y\"},{\"name\":\"罗定市\",\"latter\":\"L\"}],\"latter\":\"Y\"}],\"latter\":\"G\"},{\"name\":\"广西壮族自治区\",\"children\":[{\"name\":\"南宁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"兴宁区\",\"latter\":\"X\"},{\"name\":\"青秀区\",\"latter\":\"Q\"},{\"name\":\"江南区\",\"latter\":\"J\"},{\"name\":\"西乡塘区\",\"latter\":\"X\"},{\"name\":\"良庆区\",\"latter\":\"L\"},{\"name\":\"邕宁区\",\"latter\":\"Y\"},{\"name\":\"武鸣县\",\"latter\":\"W\"},{\"name\":\"隆安县\",\"latter\":\"L\"},{\"name\":\"马山县\",\"latter\":\"M\"},{\"name\":\"上林县\",\"latter\":\"S\"},{\"name\":\"宾阳县\",\"latter\":\"B\"},{\"name\":\"横县\",\"latter\":\"H\"}],\"latter\":\"N\"},{\"name\":\"柳州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城中区\",\"latter\":\"C\"},{\"name\":\"鱼峰区\",\"latter\":\"Y\"},{\"name\":\"柳南区\",\"latter\":\"L\"},{\"name\":\"柳北区\",\"latter\":\"L\"},{\"name\":\"柳江县\",\"latter\":\"L\"},{\"name\":\"柳城县\",\"latter\":\"L\"},{\"name\":\"鹿寨县\",\"latter\":\"L\"},{\"name\":\"融安县\",\"latter\":\"R\"},{\"name\":\"融水苗族自治县\",\"latter\":\"R\"},{\"name\":\"三江侗族自治县\",\"latter\":\"S\"}],\"latter\":\"L\"},{\"name\":\"桂林市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"秀峰区\",\"latter\":\"X\"},{\"name\":\"叠彩区\",\"latter\":\"D\"},{\"name\":\"象山区\",\"latter\":\"X\"},{\"name\":\"七星区\",\"latter\":\"Q\"},{\"name\":\"雁山区\",\"latter\":\"Y\"},{\"name\":\"临桂区\",\"latter\":\"L\"},{\"name\":\"阳朔县\",\"latter\":\"Y\"},{\"name\":\"灵川县\",\"latter\":\"L\"},{\"name\":\"全州县\",\"latter\":\"Q\"},{\"name\":\"兴安县\",\"latter\":\"X\"},{\"name\":\"永福县\",\"latter\":\"Y\"},{\"name\":\"灌阳县\",\"latter\":\"G\"},{\"name\":\"龙胜各族自治县\",\"latter\":\"L\"},{\"name\":\"资源县\",\"latter\":\"Z\"},{\"name\":\"平乐县\",\"latter\":\"P\"},{\"name\":\"荔浦县\",\"latter\":\"L\"},{\"name\":\"恭城瑶族自治县\",\"latter\":\"G\"}],\"latter\":\"G\"},{\"name\":\"梧州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"万秀区\",\"latter\":\"W\"},{\"name\":\"长洲区\",\"latter\":\"C\"},{\"name\":\"龙圩区\",\"latter\":\"L\"},{\"name\":\"苍梧县\",\"latter\":\"C\"},{\"name\":\"藤县\",\"latter\":\"T\"},{\"name\":\"蒙山县\",\"latter\":\"M\"},{\"name\":\"岑溪市\",\"latter\":\"C\"}],\"latter\":\"W\"},{\"name\":\"北海市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"海城区\",\"latter\":\"H\"},{\"name\":\"银海区\",\"latter\":\"Y\"},{\"name\":\"铁山港区\",\"latter\":\"T\"},{\"name\":\"合浦县\",\"latter\":\"H\"}],\"latter\":\"B\"},{\"name\":\"防城港市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"港口区\",\"latter\":\"G\"},{\"name\":\"防城区\",\"latter\":\"F\"},{\"name\":\"上思县\",\"latter\":\"S\"},{\"name\":\"东兴市\",\"latter\":\"D\"}],\"latter\":\"F\"},{\"name\":\"钦州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"钦南区\",\"latter\":\"Q\"},{\"name\":\"钦北区\",\"latter\":\"Q\"},{\"name\":\"灵山县\",\"latter\":\"L\"},{\"name\":\"浦北县\",\"latter\":\"P\"}],\"latter\":\"Q\"},{\"name\":\"贵港市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"港北区\",\"latter\":\"G\"},{\"name\":\"港南区\",\"latter\":\"G\"},{\"name\":\"覃塘区\",\"latter\":\"T\"},{\"name\":\"平南县\",\"latter\":\"P\"},{\"name\":\"桂平市\",\"latter\":\"G\"}],\"latter\":\"G\"},{\"name\":\"玉林市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"玉州区\",\"latter\":\"Y\"},{\"name\":\"福绵区\",\"latter\":\"F\"},{\"name\":\"容县\",\"latter\":\"R\"},{\"name\":\"陆川县\",\"latter\":\"L\"},{\"name\":\"博白县\",\"latter\":\"B\"},{\"name\":\"兴业县\",\"latter\":\"X\"},{\"name\":\"北流市\",\"latter\":\"B\"}],\"latter\":\"Y\"},{\"name\":\"百色市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"右江区\",\"latter\":\"Y\"},{\"name\":\"田阳县\",\"latter\":\"T\"},{\"name\":\"田东县\",\"latter\":\"T\"},{\"name\":\"平果县\",\"latter\":\"P\"},{\"name\":\"德保县\",\"latter\":\"D\"},{\"name\":\"靖西县\",\"latter\":\"J\"},{\"name\":\"那坡县\",\"latter\":\"N\"},{\"name\":\"凌云县\",\"latter\":\"L\"},{\"name\":\"乐业县\",\"latter\":\"L\"},{\"name\":\"田林县\",\"latter\":\"T\"},{\"name\":\"西林县\",\"latter\":\"X\"},{\"name\":\"隆林各族自治县\",\"latter\":\"L\"}],\"latter\":\"B\"},{\"name\":\"贺州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"八步区\",\"latter\":\"B\"},{\"name\":\"昭平县\",\"latter\":\"Z\"},{\"name\":\"钟山县\",\"latter\":\"Z\"},{\"name\":\"富川瑶族自治县\",\"latter\":\"F\"}],\"latter\":\"H\"},{\"name\":\"河池市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"金城江区\",\"latter\":\"J\"},{\"name\":\"南丹县\",\"latter\":\"N\"},{\"name\":\"天峨县\",\"latter\":\"T\"},{\"name\":\"凤山县\",\"latter\":\"F\"},{\"name\":\"东兰县\",\"latter\":\"D\"},{\"name\":\"罗城仫佬族自治县\",\"latter\":\"L\"},{\"name\":\"环江毛南族自治县\",\"latter\":\"H\"},{\"name\":\"巴马瑶族自治县\",\"latter\":\"B\"},{\"name\":\"都安瑶族自治县\",\"latter\":\"D\"},{\"name\":\"大化瑶族自治县\",\"latter\":\"D\"},{\"name\":\"宜州市\",\"latter\":\"Y\"}],\"latter\":\"H\"},{\"name\":\"来宾市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"兴宾区\",\"latter\":\"X\"},{\"name\":\"忻城县\",\"latter\":\"X\"},{\"name\":\"象州县\",\"latter\":\"X\"},{\"name\":\"武宣县\",\"latter\":\"W\"},{\"name\":\"金秀瑶族自治县\",\"latter\":\"J\"},{\"name\":\"合山市\",\"latter\":\"H\"}],\"latter\":\"L\"},{\"name\":\"崇左市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"江州区\",\"latter\":\"J\"},{\"name\":\"扶绥县\",\"latter\":\"F\"},{\"name\":\"宁明县\",\"latter\":\"N\"},{\"name\":\"龙州县\",\"latter\":\"L\"},{\"name\":\"大新县\",\"latter\":\"D\"},{\"name\":\"天等县\",\"latter\":\"T\"},{\"name\":\"凭祥市\",\"latter\":\"P\"}],\"latter\":\"C\"}],\"latter\":\"G\"},{\"name\":\"海南省\",\"children\":[{\"name\":\"海口市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"秀英区\",\"latter\":\"X\"},{\"name\":\"龙华区\",\"latter\":\"L\"},{\"name\":\"琼山区\",\"latter\":\"Q\"},{\"name\":\"美兰区\",\"latter\":\"M\"}],\"latter\":\"H\"},{\"name\":\"三亚市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"}],\"latter\":\"S\"},{\"name\":\"三沙市\",\"children\":[{\"name\":\"西沙群岛\",\"latter\":\"X\"},{\"name\":\"南沙群岛\",\"latter\":\"N\"},{\"name\":\"中沙群岛的岛礁及其海域\",\"latter\":\"Z\"}],\"latter\":\"S\"},{\"name\":\"省直辖县级行政区划\",\"children\":[{\"name\":\"五指山市\",\"latter\":\"W\"},{\"name\":\"琼海市\",\"latter\":\"Q\"},{\"name\":\"儋州市\",\"latter\":\"D\"},{\"name\":\"文昌市\",\"latter\":\"W\"},{\"name\":\"万宁市\",\"latter\":\"W\"},{\"name\":\"东方市\",\"latter\":\"D\"},{\"name\":\"定安县\",\"latter\":\"D\"},{\"name\":\"屯昌县\",\"latter\":\"T\"},{\"name\":\"澄迈县\",\"latter\":\"C\"},{\"name\":\"临高县\",\"latter\":\"L\"},{\"name\":\"白沙黎族自治县\",\"latter\":\"B\"},{\"name\":\"昌江黎族自治县\",\"latter\":\"C\"},{\"name\":\"乐东黎族自治县\",\"latter\":\"L\"},{\"name\":\"陵水黎族自治县\",\"latter\":\"L\"},{\"name\":\"保亭黎族苗族自治县\",\"latter\":\"B\"},{\"name\":\"琼中黎族苗族自治县\",\"latter\":\"Q\"}],\"latter\":\"S\"}],\"latter\":\"H\"},{\"name\":\"重庆市\",\"children\":[{\"name\":\"万州区\",\"latter\":\"W\"},{\"name\":\"涪陵区\",\"latter\":\"F\"},{\"name\":\"渝中区\",\"latter\":\"Y\"},{\"name\":\"大渡口区\",\"latter\":\"D\"},{\"name\":\"江北区\",\"latter\":\"J\"},{\"name\":\"沙坪坝区\",\"latter\":\"S\"},{\"name\":\"九龙坡区\",\"latter\":\"J\"},{\"name\":\"南岸区\",\"latter\":\"N\"},{\"name\":\"北碚区\",\"latter\":\"B\"},{\"name\":\"綦江区\",\"latter\":\"Q\"},{\"name\":\"大足区\",\"latter\":\"D\"},{\"name\":\"渝北区\",\"latter\":\"Y\"},{\"name\":\"巴南区\",\"latter\":\"B\"},{\"name\":\"黔江区\",\"latter\":\"Q\"},{\"name\":\"长寿区\",\"latter\":\"C\"},{\"name\":\"江津区\",\"latter\":\"J\"},{\"name\":\"合川区\",\"latter\":\"H\"},{\"name\":\"永川区\",\"latter\":\"Y\"},{\"name\":\"南川区\",\"latter\":\"N\"},{\"name\":\"潼南县\",\"latter\":\"T\"},{\"name\":\"铜梁县\",\"latter\":\"T\"},{\"name\":\"荣昌县\",\"latter\":\"R\"},{\"name\":\"璧山县\",\"latter\":\"B\"},{\"name\":\"梁平县\",\"latter\":\"L\"},{\"name\":\"城口县\",\"latter\":\"C\"},{\"name\":\"丰都县\",\"latter\":\"F\"},{\"name\":\"垫江县\",\"latter\":\"D\"},{\"name\":\"武隆县\",\"latter\":\"W\"},{\"name\":\"忠县\",\"latter\":\"Z\"},{\"name\":\"开县\",\"latter\":\"K\"},{\"name\":\"云阳县\",\"latter\":\"Y\"},{\"name\":\"奉节县\",\"latter\":\"F\"},{\"name\":\"巫山县\",\"latter\":\"W\"},{\"name\":\"巫溪县\",\"latter\":\"W\"},{\"name\":\"石柱土家族自治县\",\"latter\":\"S\"},{\"name\":\"秀山土家族苗族自治县\",\"latter\":\"X\"},{\"name\":\"酉阳土家族苗族自治县\",\"latter\":\"Y\"},{\"name\":\"彭水苗族土家族自治县\",\"latter\":\"P\"}],\"latter\":\"Z\"},{\"name\":\"四川省\",\"children\":[{\"name\":\"成都市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"锦江区\",\"latter\":\"J\"},{\"name\":\"青羊区\",\"latter\":\"Q\"},{\"name\":\"金牛区\",\"latter\":\"J\"},{\"name\":\"武侯区\",\"latter\":\"W\"},{\"name\":\"成华区\",\"latter\":\"C\"},{\"name\":\"龙泉驿区\",\"latter\":\"L\"},{\"name\":\"青白江区\",\"latter\":\"Q\"},{\"name\":\"新都区\",\"latter\":\"X\"},{\"name\":\"温江区\",\"latter\":\"W\"},{\"name\":\"金堂县\",\"latter\":\"J\"},{\"name\":\"双流县\",\"latter\":\"S\"},{\"name\":\"郫县\",\"latter\":\"P\"},{\"name\":\"大邑县\",\"latter\":\"D\"},{\"name\":\"蒲江县\",\"latter\":\"P\"},{\"name\":\"新津县\",\"latter\":\"X\"},{\"name\":\"都江堰市\",\"latter\":\"D\"},{\"name\":\"彭州市\",\"latter\":\"P\"},{\"name\":\"邛崃市\",\"latter\":\"Q\"},{\"name\":\"崇州市\",\"latter\":\"C\"}],\"latter\":\"C\"},{\"name\":\"自贡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"自流井区\",\"latter\":\"Z\"},{\"name\":\"贡井区\",\"latter\":\"G\"},{\"name\":\"大安区\",\"latter\":\"D\"},{\"name\":\"沿滩区\",\"latter\":\"Y\"},{\"name\":\"荣县\",\"latter\":\"R\"},{\"name\":\"富顺县\",\"latter\":\"F\"}],\"latter\":\"Z\"},{\"name\":\"攀枝花市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东区\",\"latter\":\"D\"},{\"name\":\"西区\",\"latter\":\"X\"},{\"name\":\"仁和区\",\"latter\":\"R\"},{\"name\":\"米易县\",\"latter\":\"M\"},{\"name\":\"盐边县\",\"latter\":\"Y\"}],\"latter\":\"P\"},{\"name\":\"泸州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"江阳区\",\"latter\":\"J\"},{\"name\":\"纳溪区\",\"latter\":\"N\"},{\"name\":\"龙马潭区\",\"latter\":\"L\"},{\"name\":\"泸县\",\"latter\":\"L\"},{\"name\":\"合江县\",\"latter\":\"H\"},{\"name\":\"叙永县\",\"latter\":\"X\"},{\"name\":\"古蔺县\",\"latter\":\"G\"}],\"latter\":\"L\"},{\"name\":\"德阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"旌阳区\",\"latter\":\"J\"},{\"name\":\"中江县\",\"latter\":\"Z\"},{\"name\":\"罗江县\",\"latter\":\"L\"},{\"name\":\"广汉市\",\"latter\":\"G\"},{\"name\":\"什邡市\",\"latter\":\"S\"},{\"name\":\"绵竹市\",\"latter\":\"M\"}],\"latter\":\"D\"},{\"name\":\"绵阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"涪城区\",\"latter\":\"F\"},{\"name\":\"游仙区\",\"latter\":\"Y\"},{\"name\":\"三台县\",\"latter\":\"S\"},{\"name\":\"盐亭县\",\"latter\":\"Y\"},{\"name\":\"安县\",\"latter\":\"A\"},{\"name\":\"梓潼县\",\"latter\":\"Z\"},{\"name\":\"北川羌族自治县\",\"latter\":\"B\"},{\"name\":\"平武县\",\"latter\":\"P\"},{\"name\":\"江油市\",\"latter\":\"J\"}],\"latter\":\"M\"},{\"name\":\"广元市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"利州区\",\"latter\":\"L\"},{\"name\":\"元坝区\",\"latter\":\"Y\"},{\"name\":\"朝天区\",\"latter\":\"Z\"},{\"name\":\"旺苍县\",\"latter\":\"W\"},{\"name\":\"青川县\",\"latter\":\"Q\"},{\"name\":\"剑阁县\",\"latter\":\"J\"},{\"name\":\"苍溪县\",\"latter\":\"C\"}],\"latter\":\"G\"},{\"name\":\"遂宁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"船山区\",\"latter\":\"C\"},{\"name\":\"安居区\",\"latter\":\"A\"},{\"name\":\"蓬溪县\",\"latter\":\"P\"},{\"name\":\"射洪县\",\"latter\":\"S\"},{\"name\":\"大英县\",\"latter\":\"D\"}],\"latter\":\"S\"},{\"name\":\"内江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"市中区\",\"latter\":\"S\"},{\"name\":\"东兴区\",\"latter\":\"D\"},{\"name\":\"威远县\",\"latter\":\"W\"},{\"name\":\"资中县\",\"latter\":\"Z\"},{\"name\":\"隆昌县\",\"latter\":\"L\"}],\"latter\":\"N\"},{\"name\":\"乐山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"市中区\",\"latter\":\"S\"},{\"name\":\"沙湾区\",\"latter\":\"S\"},{\"name\":\"五通桥区\",\"latter\":\"W\"},{\"name\":\"金口河区\",\"latter\":\"J\"},{\"name\":\"犍为县\",\"latter\":\"J\"},{\"name\":\"井研县\",\"latter\":\"J\"},{\"name\":\"夹江县\",\"latter\":\"J\"},{\"name\":\"沐川县\",\"latter\":\"M\"},{\"name\":\"峨边彝族自治县\",\"latter\":\"E\"},{\"name\":\"马边彝族自治县\",\"latter\":\"M\"},{\"name\":\"峨眉山市\",\"latter\":\"E\"}],\"latter\":\"L\"},{\"name\":\"南充市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"顺庆区\",\"latter\":\"S\"},{\"name\":\"高坪区\",\"latter\":\"G\"},{\"name\":\"嘉陵区\",\"latter\":\"J\"},{\"name\":\"南部县\",\"latter\":\"N\"},{\"name\":\"营山县\",\"latter\":\"Y\"},{\"name\":\"蓬安县\",\"latter\":\"P\"},{\"name\":\"仪陇县\",\"latter\":\"Y\"},{\"name\":\"西充县\",\"latter\":\"X\"},{\"name\":\"阆中市\",\"latter\":\"L\"}],\"latter\":\"N\"},{\"name\":\"眉山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"东坡区\",\"latter\":\"D\"},{\"name\":\"仁寿县\",\"latter\":\"R\"},{\"name\":\"彭山县\",\"latter\":\"P\"},{\"name\":\"洪雅县\",\"latter\":\"H\"},{\"name\":\"丹棱县\",\"latter\":\"D\"},{\"name\":\"青神县\",\"latter\":\"Q\"}],\"latter\":\"M\"},{\"name\":\"宜宾市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"翠屏区\",\"latter\":\"C\"},{\"name\":\"南溪区\",\"latter\":\"N\"},{\"name\":\"宜宾县\",\"latter\":\"Y\"},{\"name\":\"江安县\",\"latter\":\"J\"},{\"name\":\"长宁县\",\"latter\":\"C\"},{\"name\":\"高县\",\"latter\":\"G\"},{\"name\":\"珙县\",\"latter\":\"G\"},{\"name\":\"筠连县\",\"latter\":\"Y\"},{\"name\":\"兴文县\",\"latter\":\"X\"},{\"name\":\"屏山县\",\"latter\":\"P\"}],\"latter\":\"Y\"},{\"name\":\"广安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"广安区\",\"latter\":\"G\"},{\"name\":\"前锋区\",\"latter\":\"Q\"},{\"name\":\"岳池县\",\"latter\":\"Y\"},{\"name\":\"武胜县\",\"latter\":\"W\"},{\"name\":\"邻水县\",\"latter\":\"L\"},{\"name\":\"华蓥市\",\"latter\":\"H\"}],\"latter\":\"G\"},{\"name\":\"达州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"通川区\",\"latter\":\"T\"},{\"name\":\"达川区\",\"latter\":\"D\"},{\"name\":\"宣汉县\",\"latter\":\"X\"},{\"name\":\"开江县\",\"latter\":\"K\"},{\"name\":\"大竹县\",\"latter\":\"D\"},{\"name\":\"渠县\",\"latter\":\"Q\"},{\"name\":\"万源市\",\"latter\":\"W\"}],\"latter\":\"D\"},{\"name\":\"雅安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"雨城区\",\"latter\":\"Y\"},{\"name\":\"名山区\",\"latter\":\"M\"},{\"name\":\"荥经县\",\"latter\":\"X\"},{\"name\":\"汉源县\",\"latter\":\"H\"},{\"name\":\"石棉县\",\"latter\":\"S\"},{\"name\":\"天全县\",\"latter\":\"T\"},{\"name\":\"芦山县\",\"latter\":\"L\"},{\"name\":\"宝兴县\",\"latter\":\"B\"}],\"latter\":\"Y\"},{\"name\":\"巴中市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"巴州区\",\"latter\":\"B\"},{\"name\":\"恩阳区\",\"latter\":\"E\"},{\"name\":\"通江县\",\"latter\":\"T\"},{\"name\":\"南江县\",\"latter\":\"N\"},{\"name\":\"平昌县\",\"latter\":\"P\"}],\"latter\":\"B\"},{\"name\":\"资阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"雁江区\",\"latter\":\"Y\"},{\"name\":\"安岳县\",\"latter\":\"A\"},{\"name\":\"乐至县\",\"latter\":\"L\"},{\"name\":\"简阳市\",\"latter\":\"J\"}],\"latter\":\"Z\"},{\"name\":\"阿坝藏族羌族自治州\",\"children\":[{\"name\":\"汶川县\",\"latter\":\"W\"},{\"name\":\"理县\",\"latter\":\"L\"},{\"name\":\"茂县\",\"latter\":\"M\"},{\"name\":\"松潘县\",\"latter\":\"S\"},{\"name\":\"九寨沟县\",\"latter\":\"J\"},{\"name\":\"金川县\",\"latter\":\"J\"},{\"name\":\"小金县\",\"latter\":\"X\"},{\"name\":\"黑水县\",\"latter\":\"H\"},{\"name\":\"马尔康县\",\"latter\":\"M\"},{\"name\":\"壤塘县\",\"latter\":\"R\"},{\"name\":\"阿坝县\",\"latter\":\"A\"},{\"name\":\"若尔盖县\",\"latter\":\"R\"},{\"name\":\"红原县\",\"latter\":\"H\"}],\"latter\":\"A\"},{\"name\":\"甘孜藏族自治州\",\"children\":[{\"name\":\"康定县\",\"latter\":\"K\"},{\"name\":\"泸定县\",\"latter\":\"L\"},{\"name\":\"丹巴县\",\"latter\":\"D\"},{\"name\":\"九龙县\",\"latter\":\"J\"},{\"name\":\"雅江县\",\"latter\":\"Y\"},{\"name\":\"道孚县\",\"latter\":\"D\"},{\"name\":\"炉霍县\",\"latter\":\"L\"},{\"name\":\"甘孜县\",\"latter\":\"G\"},{\"name\":\"新龙县\",\"latter\":\"X\"},{\"name\":\"德格县\",\"latter\":\"D\"},{\"name\":\"白玉县\",\"latter\":\"B\"},{\"name\":\"石渠县\",\"latter\":\"S\"},{\"name\":\"色达县\",\"latter\":\"S\"},{\"name\":\"理塘县\",\"latter\":\"L\"},{\"name\":\"巴塘县\",\"latter\":\"B\"},{\"name\":\"乡城县\",\"latter\":\"X\"},{\"name\":\"稻城县\",\"latter\":\"D\"},{\"name\":\"得荣县\",\"latter\":\"D\"}],\"latter\":\"G\"},{\"name\":\"凉山彝族自治州\",\"children\":[{\"name\":\"西昌市\",\"latter\":\"X\"},{\"name\":\"木里藏族自治县\",\"latter\":\"M\"},{\"name\":\"盐源县\",\"latter\":\"Y\"},{\"name\":\"德昌县\",\"latter\":\"D\"},{\"name\":\"会理县\",\"latter\":\"H\"},{\"name\":\"会东县\",\"latter\":\"H\"},{\"name\":\"宁南县\",\"latter\":\"N\"},{\"name\":\"普格县\",\"latter\":\"P\"},{\"name\":\"布拖县\",\"latter\":\"B\"},{\"name\":\"金阳县\",\"latter\":\"J\"},{\"name\":\"昭觉县\",\"latter\":\"Z\"},{\"name\":\"喜德县\",\"latter\":\"X\"},{\"name\":\"冕宁县\",\"latter\":\"M\"},{\"name\":\"越西县\",\"latter\":\"Y\"},{\"name\":\"甘洛县\",\"latter\":\"G\"},{\"name\":\"美姑县\",\"latter\":\"M\"},{\"name\":\"雷波县\",\"latter\":\"L\"}],\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"贵州省\",\"children\":[{\"name\":\"贵阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"南明区\",\"latter\":\"N\"},{\"name\":\"云岩区\",\"latter\":\"Y\"},{\"name\":\"花溪区\",\"latter\":\"H\"},{\"name\":\"乌当区\",\"latter\":\"W\"},{\"name\":\"白云区\",\"latter\":\"B\"},{\"name\":\"观山湖区\",\"latter\":\"G\"},{\"name\":\"开阳县\",\"latter\":\"K\"},{\"name\":\"息烽县\",\"latter\":\"X\"},{\"name\":\"修文县\",\"latter\":\"X\"},{\"name\":\"清镇市\",\"latter\":\"Q\"}],\"latter\":\"G\"},{\"name\":\"六盘水市\",\"children\":[{\"name\":\"钟山区\",\"latter\":\"Z\"},{\"name\":\"六枝特区\",\"latter\":\"L\"},{\"name\":\"水城县\",\"latter\":\"S\"},{\"name\":\"盘县\",\"latter\":\"P\"}],\"latter\":\"L\"},{\"name\":\"遵义市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"红花岗区\",\"latter\":\"H\"},{\"name\":\"汇川区\",\"latter\":\"H\"},{\"name\":\"遵义县\",\"latter\":\"Z\"},{\"name\":\"桐梓县\",\"latter\":\"T\"},{\"name\":\"绥阳县\",\"latter\":\"S\"},{\"name\":\"正安县\",\"latter\":\"Z\"},{\"name\":\"道真仡佬族苗族自治县\",\"latter\":\"D\"},{\"name\":\"务川仡佬族苗族自治县\",\"latter\":\"W\"},{\"name\":\"凤冈县\",\"latter\":\"F\"},{\"name\":\"湄潭县\",\"latter\":\"M\"},{\"name\":\"余庆县\",\"latter\":\"Y\"},{\"name\":\"习水县\",\"latter\":\"X\"},{\"name\":\"赤水市\",\"latter\":\"C\"},{\"name\":\"仁怀市\",\"latter\":\"R\"}],\"latter\":\"Z\"},{\"name\":\"安顺市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"西秀区\",\"latter\":\"X\"},{\"name\":\"平坝县\",\"latter\":\"P\"},{\"name\":\"普定县\",\"latter\":\"P\"},{\"name\":\"镇宁布依族苗族自治县\",\"latter\":\"Z\"},{\"name\":\"关岭布依族苗族自治县\",\"latter\":\"G\"},{\"name\":\"紫云苗族布依族自治县\",\"latter\":\"Z\"}],\"latter\":\"A\"},{\"name\":\"毕节市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"七星关区\",\"latter\":\"Q\"},{\"name\":\"大方县\",\"latter\":\"D\"},{\"name\":\"黔西县\",\"latter\":\"Q\"},{\"name\":\"金沙县\",\"latter\":\"J\"},{\"name\":\"织金县\",\"latter\":\"Z\"},{\"name\":\"纳雍县\",\"latter\":\"N\"},{\"name\":\"威宁彝族回族苗族自治县\",\"latter\":\"W\"},{\"name\":\"赫章县\",\"latter\":\"H\"}],\"latter\":\"B\"},{\"name\":\"铜仁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"碧江区\",\"latter\":\"B\"},{\"name\":\"万山区\",\"latter\":\"W\"},{\"name\":\"江口县\",\"latter\":\"J\"},{\"name\":\"玉屏侗族自治县\",\"latter\":\"Y\"},{\"name\":\"石阡县\",\"latter\":\"S\"},{\"name\":\"思南县\",\"latter\":\"S\"},{\"name\":\"印江土家族苗族自治县\",\"latter\":\"Y\"},{\"name\":\"德江县\",\"latter\":\"D\"},{\"name\":\"沿河土家族自治县\",\"latter\":\"Y\"},{\"name\":\"松桃苗族自治县\",\"latter\":\"S\"}],\"latter\":\"T\"},{\"name\":\"黔西南布依族苗族自治州\",\"children\":[{\"name\":\"兴义市\",\"latter\":\"X\"},{\"name\":\"兴仁县\",\"latter\":\"X\"},{\"name\":\"普安县\",\"latter\":\"P\"},{\"name\":\"晴隆县\",\"latter\":\"Q\"},{\"name\":\"贞丰县\",\"latter\":\"Z\"},{\"name\":\"望谟县\",\"latter\":\"W\"},{\"name\":\"册亨县\",\"latter\":\"C\"},{\"name\":\"安龙县\",\"latter\":\"A\"}],\"latter\":\"Q\"},{\"name\":\"黔东南苗族侗族自治州\",\"children\":[{\"name\":\"凯里市\",\"latter\":\"K\"},{\"name\":\"黄平县\",\"latter\":\"H\"},{\"name\":\"施秉县\",\"latter\":\"S\"},{\"name\":\"三穗县\",\"latter\":\"S\"},{\"name\":\"镇远县\",\"latter\":\"Z\"},{\"name\":\"岑巩县\",\"latter\":\"C\"},{\"name\":\"天柱县\",\"latter\":\"T\"},{\"name\":\"锦屏县\",\"latter\":\"J\"},{\"name\":\"剑河县\",\"latter\":\"J\"},{\"name\":\"台江县\",\"latter\":\"T\"},{\"name\":\"黎平县\",\"latter\":\"L\"},{\"name\":\"榕江县\",\"latter\":\"R\"},{\"name\":\"从江县\",\"latter\":\"C\"},{\"name\":\"雷山县\",\"latter\":\"L\"},{\"name\":\"麻江县\",\"latter\":\"M\"},{\"name\":\"丹寨县\",\"latter\":\"D\"}],\"latter\":\"Q\"},{\"name\":\"黔南布依族苗族自治州\",\"children\":[{\"name\":\"都匀市\",\"latter\":\"D\"},{\"name\":\"福泉市\",\"latter\":\"F\"},{\"name\":\"荔波县\",\"latter\":\"L\"},{\"name\":\"贵定县\",\"latter\":\"G\"},{\"name\":\"瓮安县\",\"latter\":\"W\"},{\"name\":\"独山县\",\"latter\":\"D\"},{\"name\":\"平塘县\",\"latter\":\"P\"},{\"name\":\"罗甸县\",\"latter\":\"L\"},{\"name\":\"长顺县\",\"latter\":\"C\"},{\"name\":\"龙里县\",\"latter\":\"L\"},{\"name\":\"惠水县\",\"latter\":\"H\"},{\"name\":\"三都水族自治县\",\"latter\":\"S\"}],\"latter\":\"Q\"}],\"latter\":\"G\"},{\"name\":\"云南省\",\"children\":[{\"name\":\"昆明市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"五华区\",\"latter\":\"W\"},{\"name\":\"盘龙区\",\"latter\":\"P\"},{\"name\":\"官渡区\",\"latter\":\"G\"},{\"name\":\"西山区\",\"latter\":\"X\"},{\"name\":\"东川区\",\"latter\":\"D\"},{\"name\":\"呈贡区\",\"latter\":\"C\"},{\"name\":\"晋宁县\",\"latter\":\"J\"},{\"name\":\"富民县\",\"latter\":\"F\"},{\"name\":\"宜良县\",\"latter\":\"Y\"},{\"name\":\"石林彝族自治县\",\"latter\":\"S\"},{\"name\":\"嵩明县\",\"latter\":\"S\"},{\"name\":\"禄劝彝族苗族自治县\",\"latter\":\"L\"},{\"name\":\"寻甸回族彝族自治县\",\"latter\":\"X\"},{\"name\":\"安宁市\",\"latter\":\"A\"}],\"latter\":\"K\"},{\"name\":\"曲靖市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"麒麟区\",\"latter\":\"Q\"},{\"name\":\"马龙县\",\"latter\":\"M\"},{\"name\":\"陆良县\",\"latter\":\"L\"},{\"name\":\"师宗县\",\"latter\":\"S\"},{\"name\":\"罗平县\",\"latter\":\"L\"},{\"name\":\"富源县\",\"latter\":\"F\"},{\"name\":\"会泽县\",\"latter\":\"H\"},{\"name\":\"沾益县\",\"latter\":\"Z\"},{\"name\":\"宣威市\",\"latter\":\"X\"}],\"latter\":\"Q\"},{\"name\":\"玉溪市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"红塔区\",\"latter\":\"H\"},{\"name\":\"江川县\",\"latter\":\"J\"},{\"name\":\"澄江县\",\"latter\":\"C\"},{\"name\":\"通海县\",\"latter\":\"T\"},{\"name\":\"华宁县\",\"latter\":\"H\"},{\"name\":\"易门县\",\"latter\":\"Y\"},{\"name\":\"峨山彝族自治县\",\"latter\":\"E\"},{\"name\":\"新平彝族傣族自治县\",\"latter\":\"X\"},{\"name\":\"元江哈尼族彝族傣族自治县\",\"latter\":\"Y\"}],\"latter\":\"Y\"},{\"name\":\"保山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"隆阳区\",\"latter\":\"L\"},{\"name\":\"施甸县\",\"latter\":\"S\"},{\"name\":\"腾冲县\",\"latter\":\"T\"},{\"name\":\"龙陵县\",\"latter\":\"L\"},{\"name\":\"昌宁县\",\"latter\":\"C\"}],\"latter\":\"B\"},{\"name\":\"昭通市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"昭阳区\",\"latter\":\"Z\"},{\"name\":\"鲁甸县\",\"latter\":\"L\"},{\"name\":\"巧家县\",\"latter\":\"Q\"},{\"name\":\"盐津县\",\"latter\":\"Y\"},{\"name\":\"大关县\",\"latter\":\"D\"},{\"name\":\"永善县\",\"latter\":\"Y\"},{\"name\":\"绥江县\",\"latter\":\"S\"},{\"name\":\"镇雄县\",\"latter\":\"Z\"},{\"name\":\"彝良县\",\"latter\":\"Y\"},{\"name\":\"威信县\",\"latter\":\"W\"},{\"name\":\"水富县\",\"latter\":\"S\"}],\"latter\":\"Z\"},{\"name\":\"丽江市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"古城区\",\"latter\":\"G\"},{\"name\":\"玉龙纳西族自治县\",\"latter\":\"Y\"},{\"name\":\"永胜县\",\"latter\":\"Y\"},{\"name\":\"华坪县\",\"latter\":\"H\"},{\"name\":\"宁蒗彝族自治县\",\"latter\":\"N\"}],\"latter\":\"L\"},{\"name\":\"普洱市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"思茅区\",\"latter\":\"S\"},{\"name\":\"宁洱哈尼族彝族自治县\",\"latter\":\"N\"},{\"name\":\"墨江哈尼族自治县\",\"latter\":\"M\"},{\"name\":\"景东彝族自治县\",\"latter\":\"J\"},{\"name\":\"景谷傣族彝族自治县\",\"latter\":\"J\"},{\"name\":\"镇沅彝族哈尼族拉祜族自治县\",\"latter\":\"Z\"},{\"name\":\"江城哈尼族彝族自治县\",\"latter\":\"J\"},{\"name\":\"孟连傣族拉祜族佤族自治县\",\"latter\":\"M\"},{\"name\":\"澜沧拉祜族自治县\",\"latter\":\"L\"},{\"name\":\"西盟佤族自治县\",\"latter\":\"X\"}],\"latter\":\"P\"},{\"name\":\"临沧市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"临翔区\",\"latter\":\"L\"},{\"name\":\"凤庆县\",\"latter\":\"F\"},{\"name\":\"云县\",\"latter\":\"Y\"},{\"name\":\"永德县\",\"latter\":\"Y\"},{\"name\":\"镇康县\",\"latter\":\"Z\"},{\"name\":\"双江拉祜族佤族布朗族傣族自治县\",\"latter\":\"S\"},{\"name\":\"耿马傣族佤族自治县\",\"latter\":\"G\"},{\"name\":\"沧源佤族自治县\",\"latter\":\"C\"}],\"latter\":\"L\"},{\"name\":\"楚雄彝族自治州\",\"children\":[{\"name\":\"楚雄市\",\"latter\":\"C\"},{\"name\":\"双柏县\",\"latter\":\"S\"},{\"name\":\"牟定县\",\"latter\":\"M\"},{\"name\":\"南华县\",\"latter\":\"N\"},{\"name\":\"姚安县\",\"latter\":\"Y\"},{\"name\":\"大姚县\",\"latter\":\"D\"},{\"name\":\"永仁县\",\"latter\":\"Y\"},{\"name\":\"元谋县\",\"latter\":\"Y\"},{\"name\":\"武定县\",\"latter\":\"W\"},{\"name\":\"禄丰县\",\"latter\":\"L\"}],\"latter\":\"C\"},{\"name\":\"红河哈尼族彝族自治州\",\"children\":[{\"name\":\"个旧市\",\"latter\":\"G\"},{\"name\":\"开远市\",\"latter\":\"K\"},{\"name\":\"蒙自市\",\"latter\":\"M\"},{\"name\":\"弥勒市\",\"latter\":\"M\"},{\"name\":\"屏边苗族自治县\",\"latter\":\"P\"},{\"name\":\"建水县\",\"latter\":\"J\"},{\"name\":\"石屏县\",\"latter\":\"S\"},{\"name\":\"泸西县\",\"latter\":\"L\"},{\"name\":\"元阳县\",\"latter\":\"Y\"},{\"name\":\"红河县\",\"latter\":\"H\"},{\"name\":\"金平苗族瑶族傣族自治县\",\"latter\":\"J\"},{\"name\":\"绿春县\",\"latter\":\"L\"},{\"name\":\"河口瑶族自治县\",\"latter\":\"H\"}],\"latter\":\"H\"},{\"name\":\"文山壮族苗族自治州\",\"children\":[{\"name\":\"文山市\",\"latter\":\"W\"},{\"name\":\"砚山县\",\"latter\":\"Y\"},{\"name\":\"西畴县\",\"latter\":\"X\"},{\"name\":\"麻栗坡县\",\"latter\":\"M\"},{\"name\":\"马关县\",\"latter\":\"M\"},{\"name\":\"丘北县\",\"latter\":\"Q\"},{\"name\":\"广南县\",\"latter\":\"G\"},{\"name\":\"富宁县\",\"latter\":\"F\"}],\"latter\":\"W\"},{\"name\":\"西双版纳傣族自治州\",\"children\":[{\"name\":\"景洪市\",\"latter\":\"J\"},{\"name\":\"勐海县\",\"latter\":\"M\"},{\"name\":\"勐腊县\",\"latter\":\"M\"}],\"latter\":\"X\"},{\"name\":\"大理白族自治州\",\"children\":[{\"name\":\"大理市\",\"latter\":\"D\"},{\"name\":\"漾濞彝族自治县\",\"latter\":\"Y\"},{\"name\":\"祥云县\",\"latter\":\"X\"},{\"name\":\"宾川县\",\"latter\":\"B\"},{\"name\":\"弥渡县\",\"latter\":\"M\"},{\"name\":\"南涧彝族自治县\",\"latter\":\"N\"},{\"name\":\"巍山彝族回族自治县\",\"latter\":\"W\"},{\"name\":\"永平县\",\"latter\":\"Y\"},{\"name\":\"云龙县\",\"latter\":\"Y\"},{\"name\":\"洱源县\",\"latter\":\"E\"},{\"name\":\"剑川县\",\"latter\":\"J\"},{\"name\":\"鹤庆县\",\"latter\":\"H\"}],\"latter\":\"D\"},{\"name\":\"德宏傣族景颇族自治州\",\"children\":[{\"name\":\"瑞丽市\",\"latter\":\"R\"},{\"name\":\"芒市\",\"latter\":\"M\"},{\"name\":\"梁河县\",\"latter\":\"L\"},{\"name\":\"盈江县\",\"latter\":\"Y\"},{\"name\":\"陇川县\",\"latter\":\"L\"}],\"latter\":\"D\"},{\"name\":\"怒江傈僳族自治州\",\"children\":[{\"name\":\"泸水县\",\"latter\":\"L\"},{\"name\":\"福贡县\",\"latter\":\"F\"},{\"name\":\"贡山独龙族怒族自治县\",\"latter\":\"G\"},{\"name\":\"兰坪白族普米族自治县\",\"latter\":\"L\"}],\"latter\":\"N\"},{\"name\":\"迪庆藏族自治州\",\"children\":[{\"name\":\"香格里拉县\",\"latter\":\"X\"},{\"name\":\"德钦县\",\"latter\":\"D\"},{\"name\":\"维西傈僳族自治县\",\"latter\":\"W\"}],\"latter\":\"D\"}],\"latter\":\"Y\"},{\"name\":\"西藏自治区\",\"children\":[{\"name\":\"拉萨市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城关区\",\"latter\":\"C\"},{\"name\":\"林周县\",\"latter\":\"L\"},{\"name\":\"当雄县\",\"latter\":\"D\"},{\"name\":\"尼木县\",\"latter\":\"N\"},{\"name\":\"曲水县\",\"latter\":\"Q\"},{\"name\":\"堆龙德庆县\",\"latter\":\"D\"},{\"name\":\"达孜县\",\"latter\":\"D\"},{\"name\":\"墨竹工卡县\",\"latter\":\"M\"}],\"latter\":\"L\"},{\"name\":\"昌都地区\",\"children\":[{\"name\":\"昌都县\",\"latter\":\"C\"},{\"name\":\"江达县\",\"latter\":\"J\"},{\"name\":\"贡觉县\",\"latter\":\"G\"},{\"name\":\"类乌齐县\",\"latter\":\"L\"},{\"name\":\"丁青县\",\"latter\":\"D\"},{\"name\":\"察雅县\",\"latter\":\"C\"},{\"name\":\"八宿县\",\"latter\":\"B\"},{\"name\":\"左贡县\",\"latter\":\"Z\"},{\"name\":\"芒康县\",\"latter\":\"M\"},{\"name\":\"洛隆县\",\"latter\":\"L\"},{\"name\":\"边坝县\",\"latter\":\"B\"}],\"latter\":\"C\"},{\"name\":\"山南地区\",\"children\":[{\"name\":\"乃东县\",\"latter\":\"N\"},{\"name\":\"扎囊县\",\"latter\":\"Z\"},{\"name\":\"贡嘎县\",\"latter\":\"G\"},{\"name\":\"桑日县\",\"latter\":\"S\"},{\"name\":\"琼结县\",\"latter\":\"Q\"},{\"name\":\"曲松县\",\"latter\":\"Q\"},{\"name\":\"措美县\",\"latter\":\"C\"},{\"name\":\"洛扎县\",\"latter\":\"L\"},{\"name\":\"加查县\",\"latter\":\"J\"},{\"name\":\"隆子县\",\"latter\":\"L\"},{\"name\":\"错那县\",\"latter\":\"C\"},{\"name\":\"浪卡子县\",\"latter\":\"L\"}],\"latter\":\"S\"},{\"name\":\"日喀则地区\",\"children\":[{\"name\":\"日喀则市\",\"latter\":\"R\"},{\"name\":\"南木林县\",\"latter\":\"N\"},{\"name\":\"江孜县\",\"latter\":\"J\"},{\"name\":\"定日县\",\"latter\":\"D\"},{\"name\":\"萨迦县\",\"latter\":\"S\"},{\"name\":\"拉孜县\",\"latter\":\"L\"},{\"name\":\"昂仁县\",\"latter\":\"A\"},{\"name\":\"谢通门县\",\"latter\":\"X\"},{\"name\":\"白朗县\",\"latter\":\"B\"},{\"name\":\"仁布县\",\"latter\":\"R\"},{\"name\":\"康马县\",\"latter\":\"K\"},{\"name\":\"定结县\",\"latter\":\"D\"},{\"name\":\"仲巴县\",\"latter\":\"Z\"},{\"name\":\"亚东县\",\"latter\":\"Y\"},{\"name\":\"吉隆县\",\"latter\":\"J\"},{\"name\":\"聂拉木县\",\"latter\":\"N\"},{\"name\":\"萨嘎县\",\"latter\":\"S\"},{\"name\":\"岗巴县\",\"latter\":\"G\"}],\"latter\":\"R\"},{\"name\":\"那曲地区\",\"children\":[{\"name\":\"那曲县\",\"latter\":\"N\"},{\"name\":\"嘉黎县\",\"latter\":\"J\"},{\"name\":\"比如县\",\"latter\":\"B\"},{\"name\":\"聂荣县\",\"latter\":\"N\"},{\"name\":\"安多县\",\"latter\":\"A\"},{\"name\":\"申扎县\",\"latter\":\"S\"},{\"name\":\"索县\",\"latter\":\"S\"},{\"name\":\"班戈县\",\"latter\":\"B\"},{\"name\":\"巴青县\",\"latter\":\"B\"},{\"name\":\"尼玛县\",\"latter\":\"N\"},{\"name\":\"双湖县\",\"latter\":\"S\"}],\"latter\":\"N\"},{\"name\":\"阿里地区\",\"children\":[{\"name\":\"普兰县\",\"latter\":\"P\"},{\"name\":\"札达县\",\"latter\":\"Z\"},{\"name\":\"噶尔县\",\"latter\":\"G\"},{\"name\":\"日土县\",\"latter\":\"R\"},{\"name\":\"革吉县\",\"latter\":\"G\"},{\"name\":\"改则县\",\"latter\":\"G\"},{\"name\":\"措勤县\",\"latter\":\"C\"}],\"latter\":\"A\"},{\"name\":\"林芝地区\",\"children\":[{\"name\":\"林芝县\",\"latter\":\"L\"},{\"name\":\"工布江达县\",\"latter\":\"G\"},{\"name\":\"米林县\",\"latter\":\"M\"},{\"name\":\"墨脱县\",\"latter\":\"M\"},{\"name\":\"波密县\",\"latter\":\"B\"},{\"name\":\"察隅县\",\"latter\":\"C\"},{\"name\":\"朗县\",\"latter\":\"L\"}],\"latter\":\"L\"}],\"latter\":\"X\"},{\"name\":\"陕西省\",\"children\":[{\"name\":\"西安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"新城区\",\"latter\":\"X\"},{\"name\":\"碑林区\",\"latter\":\"B\"},{\"name\":\"莲湖区\",\"latter\":\"L\"},{\"name\":\"灞桥区\",\"latter\":\"B\"},{\"name\":\"未央区\",\"latter\":\"W\"},{\"name\":\"雁塔区\",\"latter\":\"Y\"},{\"name\":\"阎良区\",\"latter\":\"Y\"},{\"name\":\"临潼区\",\"latter\":\"L\"},{\"name\":\"长安区\",\"latter\":\"C\"},{\"name\":\"蓝田县\",\"latter\":\"L\"},{\"name\":\"周至县\",\"latter\":\"Z\"},{\"name\":\"户县\",\"latter\":\"H\"},{\"name\":\"高陵县\",\"latter\":\"G\"}],\"latter\":\"X\"},{\"name\":\"铜川市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"王益区\",\"latter\":\"W\"},{\"name\":\"印台区\",\"latter\":\"Y\"},{\"name\":\"耀州区\",\"latter\":\"Y\"},{\"name\":\"宜君县\",\"latter\":\"Y\"}],\"latter\":\"T\"},{\"name\":\"宝鸡市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"渭滨区\",\"latter\":\"W\"},{\"name\":\"金台区\",\"latter\":\"J\"},{\"name\":\"陈仓区\",\"latter\":\"C\"},{\"name\":\"凤翔县\",\"latter\":\"F\"},{\"name\":\"岐山县\",\"latter\":\"Q\"},{\"name\":\"扶风县\",\"latter\":\"F\"},{\"name\":\"眉县\",\"latter\":\"M\"},{\"name\":\"陇县\",\"latter\":\"L\"},{\"name\":\"千阳县\",\"latter\":\"Q\"},{\"name\":\"麟游县\",\"latter\":\"L\"},{\"name\":\"凤县\",\"latter\":\"F\"},{\"name\":\"太白县\",\"latter\":\"T\"}],\"latter\":\"B\"},{\"name\":\"咸阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"秦都区\",\"latter\":\"Q\"},{\"name\":\"杨陵区\",\"latter\":\"Y\"},{\"name\":\"渭城区\",\"latter\":\"W\"},{\"name\":\"三原县\",\"latter\":\"S\"},{\"name\":\"泾阳县\",\"latter\":\"J\"},{\"name\":\"乾县\",\"latter\":\"Q\"},{\"name\":\"礼泉县\",\"latter\":\"L\"},{\"name\":\"永寿县\",\"latter\":\"Y\"},{\"name\":\"彬县\",\"latter\":\"B\"},{\"name\":\"长武县\",\"latter\":\"C\"},{\"name\":\"旬邑县\",\"latter\":\"X\"},{\"name\":\"淳化县\",\"latter\":\"C\"},{\"name\":\"武功县\",\"latter\":\"W\"},{\"name\":\"兴平市\",\"latter\":\"X\"}],\"latter\":\"X\"},{\"name\":\"渭南市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"临渭区\",\"latter\":\"L\"},{\"name\":\"华县\",\"latter\":\"H\"},{\"name\":\"潼关县\",\"latter\":\"T\"},{\"name\":\"大荔县\",\"latter\":\"D\"},{\"name\":\"合阳县\",\"latter\":\"H\"},{\"name\":\"澄城县\",\"latter\":\"C\"},{\"name\":\"蒲城县\",\"latter\":\"P\"},{\"name\":\"白水县\",\"latter\":\"B\"},{\"name\":\"富平县\",\"latter\":\"F\"},{\"name\":\"韩城市\",\"latter\":\"H\"},{\"name\":\"华阴市\",\"latter\":\"H\"}],\"latter\":\"W\"},{\"name\":\"延安市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"宝塔区\",\"latter\":\"B\"},{\"name\":\"延长县\",\"latter\":\"Y\"},{\"name\":\"延川县\",\"latter\":\"Y\"},{\"name\":\"子长县\",\"latter\":\"Z\"},{\"name\":\"安塞县\",\"latter\":\"A\"},{\"name\":\"志丹县\",\"latter\":\"Z\"},{\"name\":\"吴起县\",\"latter\":\"W\"},{\"name\":\"甘泉县\",\"latter\":\"G\"},{\"name\":\"富县\",\"latter\":\"F\"},{\"name\":\"洛川县\",\"latter\":\"L\"},{\"name\":\"宜川县\",\"latter\":\"Y\"},{\"name\":\"黄龙县\",\"latter\":\"H\"},{\"name\":\"黄陵县\",\"latter\":\"H\"}],\"latter\":\"Y\"},{\"name\":\"汉中市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"汉台区\",\"latter\":\"H\"},{\"name\":\"南郑县\",\"latter\":\"N\"},{\"name\":\"城固县\",\"latter\":\"C\"},{\"name\":\"洋县\",\"latter\":\"Y\"},{\"name\":\"西乡县\",\"latter\":\"X\"},{\"name\":\"勉县\",\"latter\":\"M\"},{\"name\":\"宁强县\",\"latter\":\"N\"},{\"name\":\"略阳县\",\"latter\":\"L\"},{\"name\":\"镇巴县\",\"latter\":\"Z\"},{\"name\":\"留坝县\",\"latter\":\"L\"},{\"name\":\"佛坪县\",\"latter\":\"F\"}],\"latter\":\"H\"},{\"name\":\"榆林市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"榆阳区\",\"latter\":\"Y\"},{\"name\":\"神木县\",\"latter\":\"S\"},{\"name\":\"府谷县\",\"latter\":\"F\"},{\"name\":\"横山县\",\"latter\":\"H\"},{\"name\":\"靖边县\",\"latter\":\"J\"},{\"name\":\"定边县\",\"latter\":\"D\"},{\"name\":\"绥德县\",\"latter\":\"S\"},{\"name\":\"米脂县\",\"latter\":\"M\"},{\"name\":\"佳县\",\"latter\":\"J\"},{\"name\":\"吴堡县\",\"latter\":\"W\"},{\"name\":\"清涧县\",\"latter\":\"Q\"},{\"name\":\"子洲县\",\"latter\":\"Z\"}],\"latter\":\"Y\"},{\"name\":\"安康市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"汉滨区\",\"latter\":\"H\"},{\"name\":\"汉阴县\",\"latter\":\"H\"},{\"name\":\"石泉县\",\"latter\":\"S\"},{\"name\":\"宁陕县\",\"latter\":\"N\"},{\"name\":\"紫阳县\",\"latter\":\"Z\"},{\"name\":\"岚皋县\",\"latter\":\"L\"},{\"name\":\"平利县\",\"latter\":\"P\"},{\"name\":\"镇坪县\",\"latter\":\"Z\"},{\"name\":\"旬阳县\",\"latter\":\"X\"},{\"name\":\"白河县\",\"latter\":\"B\"}],\"latter\":\"A\"},{\"name\":\"商洛市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"商州区\",\"latter\":\"S\"},{\"name\":\"洛南县\",\"latter\":\"L\"},{\"name\":\"丹凤县\",\"latter\":\"D\"},{\"name\":\"商南县\",\"latter\":\"S\"},{\"name\":\"山阳县\",\"latter\":\"S\"},{\"name\":\"镇安县\",\"latter\":\"Z\"},{\"name\":\"柞水县\",\"latter\":\"Z\"}],\"latter\":\"S\"}],\"latter\":\"S\"},{\"name\":\"甘肃省\",\"children\":[{\"name\":\"兰州市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城关区\",\"latter\":\"C\"},{\"name\":\"七里河区\",\"latter\":\"Q\"},{\"name\":\"西固区\",\"latter\":\"X\"},{\"name\":\"安宁区\",\"latter\":\"A\"},{\"name\":\"红古区\",\"latter\":\"H\"},{\"name\":\"永登县\",\"latter\":\"Y\"},{\"name\":\"皋兰县\",\"latter\":\"G\"},{\"name\":\"榆中县\",\"latter\":\"Y\"}],\"latter\":\"L\"},{\"name\":\"嘉峪关市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"}],\"latter\":\"J\"},{\"name\":\"金昌市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"金川区\",\"latter\":\"J\"},{\"name\":\"永昌县\",\"latter\":\"Y\"}],\"latter\":\"J\"},{\"name\":\"白银市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"白银区\",\"latter\":\"B\"},{\"name\":\"平川区\",\"latter\":\"P\"},{\"name\":\"靖远县\",\"latter\":\"J\"},{\"name\":\"会宁县\",\"latter\":\"H\"},{\"name\":\"景泰县\",\"latter\":\"J\"}],\"latter\":\"B\"},{\"name\":\"天水市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"秦州区\",\"latter\":\"Q\"},{\"name\":\"麦积区\",\"latter\":\"M\"},{\"name\":\"清水县\",\"latter\":\"Q\"},{\"name\":\"秦安县\",\"latter\":\"Q\"},{\"name\":\"甘谷县\",\"latter\":\"G\"},{\"name\":\"武山县\",\"latter\":\"W\"},{\"name\":\"张家川回族自治县\",\"latter\":\"Z\"}],\"latter\":\"T\"},{\"name\":\"武威市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"凉州区\",\"latter\":\"L\"},{\"name\":\"民勤县\",\"latter\":\"M\"},{\"name\":\"古浪县\",\"latter\":\"G\"},{\"name\":\"天祝藏族自治县\",\"latter\":\"T\"}],\"latter\":\"W\"},{\"name\":\"张掖市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"甘州区\",\"latter\":\"G\"},{\"name\":\"肃南裕固族自治县\",\"latter\":\"S\"},{\"name\":\"民乐县\",\"latter\":\"M\"},{\"name\":\"临泽县\",\"latter\":\"L\"},{\"name\":\"高台县\",\"latter\":\"G\"},{\"name\":\"山丹县\",\"latter\":\"S\"}],\"latter\":\"Z\"},{\"name\":\"平凉市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"崆峒区\",\"latter\":\"K\"},{\"name\":\"泾川县\",\"latter\":\"J\"},{\"name\":\"灵台县\",\"latter\":\"L\"},{\"name\":\"崇信县\",\"latter\":\"C\"},{\"name\":\"华亭县\",\"latter\":\"H\"},{\"name\":\"庄浪县\",\"latter\":\"Z\"},{\"name\":\"静宁县\",\"latter\":\"J\"}],\"latter\":\"P\"},{\"name\":\"酒泉市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"肃州区\",\"latter\":\"S\"},{\"name\":\"金塔县\",\"latter\":\"J\"},{\"name\":\"瓜州县\",\"latter\":\"G\"},{\"name\":\"肃北蒙古族自治县\",\"latter\":\"S\"},{\"name\":\"阿克塞哈萨克族自治县\",\"latter\":\"A\"},{\"name\":\"玉门市\",\"latter\":\"Y\"},{\"name\":\"敦煌市\",\"latter\":\"D\"}],\"latter\":\"J\"},{\"name\":\"庆阳市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"西峰区\",\"latter\":\"X\"},{\"name\":\"庆城县\",\"latter\":\"Q\"},{\"name\":\"环县\",\"latter\":\"H\"},{\"name\":\"华池县\",\"latter\":\"H\"},{\"name\":\"合水县\",\"latter\":\"H\"},{\"name\":\"正宁县\",\"latter\":\"Z\"},{\"name\":\"宁县\",\"latter\":\"N\"},{\"name\":\"镇原县\",\"latter\":\"Z\"}],\"latter\":\"Q\"},{\"name\":\"定西市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"安定区\",\"latter\":\"A\"},{\"name\":\"通渭县\",\"latter\":\"T\"},{\"name\":\"陇西县\",\"latter\":\"L\"},{\"name\":\"渭源县\",\"latter\":\"W\"},{\"name\":\"临洮县\",\"latter\":\"L\"},{\"name\":\"漳县\",\"latter\":\"Z\"},{\"name\":\"岷县\",\"latter\":\"M\"}],\"latter\":\"D\"},{\"name\":\"陇南市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"武都区\",\"latter\":\"W\"},{\"name\":\"成县\",\"latter\":\"C\"},{\"name\":\"文县\",\"latter\":\"W\"},{\"name\":\"宕昌县\",\"latter\":\"D\"},{\"name\":\"康县\",\"latter\":\"K\"},{\"name\":\"西和县\",\"latter\":\"X\"},{\"name\":\"礼县\",\"latter\":\"L\"},{\"name\":\"徽县\",\"latter\":\"H\"},{\"name\":\"两当县\",\"latter\":\"L\"}],\"latter\":\"L\"},{\"name\":\"临夏回族自治州\",\"children\":[{\"name\":\"临夏市\",\"latter\":\"L\"},{\"name\":\"临夏县\",\"latter\":\"L\"},{\"name\":\"康乐县\",\"latter\":\"K\"},{\"name\":\"永靖县\",\"latter\":\"Y\"},{\"name\":\"广河县\",\"latter\":\"G\"},{\"name\":\"和政县\",\"latter\":\"H\"},{\"name\":\"东乡族自治县\",\"latter\":\"D\"},{\"name\":\"积石山保安族东乡族撒拉族自治县\",\"latter\":\"J\"}],\"latter\":\"L\"},{\"name\":\"甘南藏族自治州\",\"children\":[{\"name\":\"合作市\",\"latter\":\"H\"},{\"name\":\"临潭县\",\"latter\":\"L\"},{\"name\":\"卓尼县\",\"latter\":\"Z\"},{\"name\":\"舟曲县\",\"latter\":\"Z\"},{\"name\":\"迭部县\",\"latter\":\"D\"},{\"name\":\"玛曲县\",\"latter\":\"M\"},{\"name\":\"碌曲县\",\"latter\":\"L\"},{\"name\":\"夏河县\",\"latter\":\"X\"}],\"latter\":\"G\"}],\"latter\":\"G\"},{\"name\":\"青海省\",\"children\":[{\"name\":\"西宁市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"城东区\",\"latter\":\"C\"},{\"name\":\"城中区\",\"latter\":\"C\"},{\"name\":\"城西区\",\"latter\":\"C\"},{\"name\":\"城北区\",\"latter\":\"C\"},{\"name\":\"大通回族土族自治县\",\"latter\":\"D\"},{\"name\":\"湟中县\",\"latter\":\"H\"},{\"name\":\"湟源县\",\"latter\":\"H\"}],\"latter\":\"X\"},{\"name\":\"海东市\",\"children\":[{\"name\":\"乐都区\",\"latter\":\"L\"},{\"name\":\"平安县\",\"latter\":\"P\"},{\"name\":\"民和回族土族自治县\",\"latter\":\"M\"},{\"name\":\"互助土族自治县\",\"latter\":\"H\"},{\"name\":\"化隆回族自治县\",\"latter\":\"H\"},{\"name\":\"循化撒拉族自治县\",\"latter\":\"X\"}],\"latter\":\"H\"},{\"name\":\"海北藏族自治州\",\"children\":[{\"name\":\"门源回族自治县\",\"latter\":\"M\"},{\"name\":\"祁连县\",\"latter\":\"Q\"},{\"name\":\"海晏县\",\"latter\":\"H\"},{\"name\":\"刚察县\",\"latter\":\"G\"}],\"latter\":\"H\"},{\"name\":\"黄南藏族自治州\",\"children\":[{\"name\":\"同仁县\",\"latter\":\"T\"},{\"name\":\"尖扎县\",\"latter\":\"J\"},{\"name\":\"泽库县\",\"latter\":\"Z\"},{\"name\":\"河南蒙古族自治县\",\"latter\":\"H\"}],\"latter\":\"H\"},{\"name\":\"海南藏族自治州\",\"children\":[{\"name\":\"共和县\",\"latter\":\"G\"},{\"name\":\"同德县\",\"latter\":\"T\"},{\"name\":\"贵德县\",\"latter\":\"G\"},{\"name\":\"兴海县\",\"latter\":\"X\"},{\"name\":\"贵南县\",\"latter\":\"G\"}],\"latter\":\"H\"},{\"name\":\"果洛藏族自治州\",\"children\":[{\"name\":\"玛沁县\",\"latter\":\"M\"},{\"name\":\"班玛县\",\"latter\":\"B\"},{\"name\":\"甘德县\",\"latter\":\"G\"},{\"name\":\"达日县\",\"latter\":\"D\"},{\"name\":\"久治县\",\"latter\":\"J\"},{\"name\":\"玛多县\",\"latter\":\"M\"}],\"latter\":\"G\"},{\"name\":\"玉树藏族自治州\",\"children\":[{\"name\":\"玉树市\",\"latter\":\"Y\"},{\"name\":\"杂多县\",\"latter\":\"Z\"},{\"name\":\"称多县\",\"latter\":\"C\"},{\"name\":\"治多县\",\"latter\":\"Z\"},{\"name\":\"囊谦县\",\"latter\":\"N\"},{\"name\":\"曲麻莱县\",\"latter\":\"Q\"}],\"latter\":\"Y\"},{\"name\":\"海西蒙古族藏族自治州\",\"children\":[{\"name\":\"格尔木市\",\"latter\":\"G\"},{\"name\":\"德令哈市\",\"latter\":\"D\"},{\"name\":\"乌兰县\",\"latter\":\"W\"},{\"name\":\"都兰县\",\"latter\":\"D\"},{\"name\":\"天峻县\",\"latter\":\"T\"}],\"latter\":\"H\"}],\"latter\":\"Q\"},{\"name\":\"宁夏回族自治区\",\"children\":[{\"name\":\"银川市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"兴庆区\",\"latter\":\"X\"},{\"name\":\"西夏区\",\"latter\":\"X\"},{\"name\":\"金凤区\",\"latter\":\"J\"},{\"name\":\"永宁县\",\"latter\":\"Y\"},{\"name\":\"贺兰县\",\"latter\":\"H\"},{\"name\":\"灵武市\",\"latter\":\"L\"}],\"latter\":\"Y\"},{\"name\":\"石嘴山市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"大武口区\",\"latter\":\"D\"},{\"name\":\"惠农区\",\"latter\":\"H\"},{\"name\":\"平罗县\",\"latter\":\"P\"}],\"latter\":\"S\"},{\"name\":\"吴忠市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"利通区\",\"latter\":\"L\"},{\"name\":\"红寺堡区\",\"latter\":\"H\"},{\"name\":\"盐池县\",\"latter\":\"Y\"},{\"name\":\"同心县\",\"latter\":\"T\"},{\"name\":\"青铜峡市\",\"latter\":\"Q\"}],\"latter\":\"W\"},{\"name\":\"固原市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"原州区\",\"latter\":\"Y\"},{\"name\":\"西吉县\",\"latter\":\"X\"},{\"name\":\"隆德县\",\"latter\":\"L\"},{\"name\":\"泾源县\",\"latter\":\"J\"},{\"name\":\"彭阳县\",\"latter\":\"P\"}],\"latter\":\"G\"},{\"name\":\"中卫市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"沙坡头区\",\"latter\":\"S\"},{\"name\":\"中宁县\",\"latter\":\"Z\"},{\"name\":\"海原县\",\"latter\":\"H\"}],\"latter\":\"Z\"}],\"latter\":\"N\"},{\"name\":\"新疆维吾尔自治区\",\"children\":[{\"name\":\"乌鲁木齐市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"天山区\",\"latter\":\"T\"},{\"name\":\"沙依巴克区\",\"latter\":\"S\"},{\"name\":\"新市区\",\"latter\":\"X\"},{\"name\":\"水磨沟区\",\"latter\":\"S\"},{\"name\":\"头屯河区\",\"latter\":\"T\"},{\"name\":\"达坂城区\",\"latter\":\"D\"},{\"name\":\"米东区\",\"latter\":\"M\"},{\"name\":\"乌鲁木齐县\",\"latter\":\"W\"}],\"latter\":\"W\"},{\"name\":\"克拉玛依市\",\"children\":[{\"name\":\"市辖区\",\"latter\":\"S\"},{\"name\":\"独山子区\",\"latter\":\"D\"},{\"name\":\"克拉玛依区\",\"latter\":\"K\"},{\"name\":\"白碱滩区\",\"latter\":\"B\"},{\"name\":\"乌尔禾区\",\"latter\":\"W\"}],\"latter\":\"K\"},{\"name\":\"吐鲁番地区\",\"children\":[{\"name\":\"吐鲁番市\",\"latter\":\"T\"},{\"name\":\"鄯善县\",\"latter\":\"S\"},{\"name\":\"托克逊县\",\"latter\":\"T\"}],\"latter\":\"T\"},{\"name\":\"哈密地区\",\"children\":[{\"name\":\"哈密市\",\"latter\":\"H\"},{\"name\":\"巴里坤哈萨克自治县\",\"latter\":\"B\"},{\"name\":\"伊吾县\",\"latter\":\"Y\"}],\"latter\":\"H\"},{\"name\":\"昌吉回族自治州\",\"children\":[{\"name\":\"昌吉市\",\"latter\":\"C\"},{\"name\":\"阜康市\",\"latter\":\"F\"},{\"name\":\"呼图壁县\",\"latter\":\"H\"},{\"name\":\"玛纳斯县\",\"latter\":\"M\"},{\"name\":\"奇台县\",\"latter\":\"Q\"},{\"name\":\"吉木萨尔县\",\"latter\":\"J\"},{\"name\":\"木垒哈萨克自治县\",\"latter\":\"M\"}],\"latter\":\"C\"},{\"name\":\"博尔塔拉蒙古自治州\",\"children\":[{\"name\":\"博乐市\",\"latter\":\"B\"},{\"name\":\"阿拉山口市\",\"latter\":\"A\"},{\"name\":\"精河县\",\"latter\":\"J\"},{\"name\":\"温泉县\",\"latter\":\"W\"}],\"latter\":\"B\"},{\"name\":\"巴音郭楞蒙古自治州\",\"children\":[{\"name\":\"库尔勒市\",\"latter\":\"K\"},{\"name\":\"轮台县\",\"latter\":\"L\"},{\"name\":\"尉犁县\",\"latter\":\"W\"},{\"name\":\"若羌县\",\"latter\":\"R\"},{\"name\":\"且末县\",\"latter\":\"Q\"},{\"name\":\"焉耆回族自治县\",\"latter\":\"Y\"},{\"name\":\"和静县\",\"latter\":\"H\"},{\"name\":\"和硕县\",\"latter\":\"H\"},{\"name\":\"博湖县\",\"latter\":\"B\"}],\"latter\":\"B\"},{\"name\":\"阿克苏地区\",\"children\":[{\"name\":\"阿克苏市\",\"latter\":\"A\"},{\"name\":\"温宿县\",\"latter\":\"W\"},{\"name\":\"库车县\",\"latter\":\"K\"},{\"name\":\"沙雅县\",\"latter\":\"S\"},{\"name\":\"新和县\",\"latter\":\"X\"},{\"name\":\"拜城县\",\"latter\":\"B\"},{\"name\":\"乌什县\",\"latter\":\"W\"},{\"name\":\"阿瓦提县\",\"latter\":\"A\"},{\"name\":\"柯坪县\",\"latter\":\"K\"}],\"latter\":\"A\"},{\"name\":\"克孜勒苏柯尔克孜自治州\",\"children\":[{\"name\":\"阿图什市\",\"latter\":\"A\"},{\"name\":\"阿克陶县\",\"latter\":\"A\"},{\"name\":\"阿合奇县\",\"latter\":\"A\"},{\"name\":\"乌恰县\",\"latter\":\"W\"}],\"latter\":\"K\"},{\"name\":\"喀什地区\",\"children\":[{\"name\":\"喀什市\",\"latter\":\"K\"},{\"name\":\"疏附县\",\"latter\":\"S\"},{\"name\":\"疏勒县\",\"latter\":\"S\"},{\"name\":\"英吉沙县\",\"latter\":\"Y\"},{\"name\":\"泽普县\",\"latter\":\"Z\"},{\"name\":\"莎车县\",\"latter\":\"S\"},{\"name\":\"叶城县\",\"latter\":\"Y\"},{\"name\":\"麦盖提县\",\"latter\":\"M\"},{\"name\":\"岳普湖县\",\"latter\":\"Y\"},{\"name\":\"伽师县\",\"latter\":\"Q\"},{\"name\":\"巴楚县\",\"latter\":\"B\"},{\"name\":\"塔什库尔干塔吉克自治县\",\"latter\":\"T\"}],\"latter\":\"K\"},{\"name\":\"和田地区\",\"children\":[{\"name\":\"和田市\",\"latter\":\"H\"},{\"name\":\"和田县\",\"latter\":\"H\"},{\"name\":\"墨玉县\",\"latter\":\"M\"},{\"name\":\"皮山县\",\"latter\":\"P\"},{\"name\":\"洛浦县\",\"latter\":\"L\"},{\"name\":\"策勒县\",\"latter\":\"C\"},{\"name\":\"于田县\",\"latter\":\"Y\"},{\"name\":\"民丰县\",\"latter\":\"M\"}],\"latter\":\"H\"},{\"name\":\"伊犁哈萨克自治州\",\"children\":[{\"name\":\"伊宁市\",\"latter\":\"Y\"},{\"name\":\"奎屯市\",\"latter\":\"K\"},{\"name\":\"伊宁县\",\"latter\":\"Y\"},{\"name\":\"察布查尔锡伯自治县\",\"latter\":\"C\"},{\"name\":\"霍城县\",\"latter\":\"H\"},{\"name\":\"巩留县\",\"latter\":\"G\"},{\"name\":\"新源县\",\"latter\":\"X\"},{\"name\":\"昭苏县\",\"latter\":\"Z\"},{\"name\":\"特克斯县\",\"latter\":\"T\"},{\"name\":\"尼勒克县\",\"latter\":\"N\"}],\"latter\":\"Y\"},{\"name\":\"塔城地区\",\"children\":[{\"name\":\"塔城市\",\"latter\":\"T\"},{\"name\":\"乌苏市\",\"latter\":\"W\"},{\"name\":\"额敏县\",\"latter\":\"E\"},{\"name\":\"沙湾县\",\"latter\":\"S\"},{\"name\":\"托里县\",\"latter\":\"T\"},{\"name\":\"裕民县\",\"latter\":\"Y\"},{\"name\":\"和布克赛尔蒙古自治县\",\"latter\":\"H\"}],\"latter\":\"T\"},{\"name\":\"阿勒泰地区\",\"children\":[{\"name\":\"阿勒泰市\",\"latter\":\"A\"},{\"name\":\"布尔津县\",\"latter\":\"B\"},{\"name\":\"富蕴县\",\"latter\":\"F\"},{\"name\":\"福海县\",\"latter\":\"F\"},{\"name\":\"哈巴河县\",\"latter\":\"H\"},{\"name\":\"青河县\",\"latter\":\"Q\"},{\"name\":\"吉木乃县\",\"latter\":\"J\"}],\"latter\":\"A\"},{\"name\":\"自治区直辖县级行政区划\",\"children\":[{\"name\":\"石河子市\",\"latter\":\"S\"},{\"name\":\"阿拉尔市\",\"latter\":\"A\"},{\"name\":\"图木舒克市\",\"latter\":\"T\"},{\"name\":\"五家渠市\",\"latter\":\"W\"}],\"latter\":\"Z\"}],\"latter\":\"X\"},{\"name\":\"台湾省\",\"latter\":\"T\"},{\"name\":\"香港特别行政区\",\"latter\":\"X\"},{\"name\":\"澳门特别行政区\",\"latter\":\"A\"}]");

/***/ }),

/***/ 454:
/*!***********************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/components/lee-select-city/hot-cities.json ***!
  \***********************************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, default */
/***/ (function(module) {

module.exports = JSON.parse("[[\"北京\",[\"北京市\"]],[\"上海\",[\"上海市\"]],[\"广州\",[\"广东省\",\"广州市\"]],[\"深圳\",[\"广东省\",\"深圳市\"]],[\"杭州\",[\"浙江省\",\"杭州市\"]],[\"南京\",[\"江苏省\",\"南京市\"]],[\"苏州\",[\"江苏省\",\"苏州市\"]],[\"天津\",[\"天津市\"]],[\"武汉\",[\"湖北省\",\"武汉市\"]],[\"长沙\",[\"湖南省\",\"长沙市\"]],[\"重庆\",[\"重庆市\"]],[\"成都\",[\"四川省\",\"成都市\"]]]");

/***/ }),

/***/ 490:
/*!*******************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/components/scroll-mixin.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{

  data: function data() {
    return {
      // 设置滑动的距离
      scrollTop: 0 };

  },
  methods: {
    /* 获取元素*/
    queryElement: function queryElement(id, comp) {
      var query = uni.createSelectorQuery().in(comp || this);
      return new Promise(function (resolve, reject) {
        try {
          query.select(id).boundingClientRect(function (data) {return resolve(data);}).exec();
        } catch (e) {
          reject(e);
        }
      });
    },
    initScrollTop: function initScrollTop(comp, options, fl) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _yield$_this$queryEle, _yield$_this$queryEle2, top, _scrollViewTop, i, j, components, ele, data, _top, bottom;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                  _this.queryElement("#top-anchor", comp));case 2:_yield$_this$queryEle = _context.sent;_yield$_this$queryEle2 = _yield$_this$queryEle.top;top = _yield$_this$queryEle2 === void 0 ? 0 : _yield$_this$queryEle2;
                _scrollViewTop = top;
                //计算分类区间
                i = 0;
                j = 0;
                components = comp.$children;case 9:if (!(
                i < components.length)) {_context.next = 21;break;}
                ele = components[i];_context.next = 13;return (
                  _this.queryElement("#scroll-item", ele));case 13:data = _context.sent;if (
                data) {_context.next = 16;break;}return _context.abrupt("continue", 18);case 16:

                _top = data.top - _scrollViewTop,
                bottom = _top + data.height;
                options[j++]._rect = [_top, bottom];case 18:i++;_context.next = 9;break;case 21:case "end":return _context.stop();}}}, _callee);}))();

    },
    setScrollTop: function setScrollTop() {var _this2 = this;var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.scrollTop = target - 1;
      this.$nextTick(function () {return _this2.scrollTop = target;});
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 498:
/*!****************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/pages.json ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 518:
/*!***************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-datetime-picker/components/uni-datetime-picker/util.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Calendar = /*#__PURE__*/function () {
  function Calendar()






  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},date = _ref.date,selected = _ref.selected,startDate = _ref.startDate,endDate = _ref.endDate,range = _ref.range;_classCallCheck(this, Calendar);
    // 当前日期
    this.date = this.getDate(new Date()); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.cleanMultipleStatus();
    // 每周日期
    this.weeks = {};
    // this._getWeek(this.date.fullDate)
    // this.multipleStatus = multipleStatus
    this.lastHover = false;
  }
  /**
     * 设置日期
     * @param {Object} date
     */_createClass(Calendar, [{ key: "setDate", value: function setDate(
    date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }

    /**
       * 清理多选状态
       */ }, { key: "cleanMultipleStatus", value: function cleanMultipleStatus()
    {
      this.multipleStatus = {
        before: '',
        after: '',
        data: [] };

    }

    /**
       * 重置开始日期
       */ }, { key: "resetSatrtDate", value: function resetSatrtDate(
    startDate) {
      // 范围开始
      this.startDate = startDate;

    }

    /**
       * 重置结束日期
       */ }, { key: "resetEndDate", value: function resetEndDate(
    endDate) {
      // 范围结束
      this.endDate = endDate;
    }

    /**
       * 获取任意时间
       */ }, { key: "getDate", value: function getDate(
    date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay() };

    }


    /**
       * 获取上月剩余天数
       */ }, { key: "_getLastMonthDays", value: function _getLastMonthDays(
    firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          disable: true });

      }
      return dateArr;
    }
    /**
       * 获取本月天数
       */ }, { key: "_currentMonthDys", value: function _currentMonthDys(
    dateData, full) {var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;var _loop = function _loop(
      i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ?
        full.month : full.month) + '-' + (i < 10 ?
        '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          // let dateCompBefore = this.dateCompare(this.startDate, fullDate)
          // disableBefore = this.dateCompare(dateCompBefore ? this.startDate : fullDate, nowDate)
          disableBefore = _this.dateCompare(_this.startDate, nowDate);
        }

        if (_this.endDate) {
          // let dateCompAfter = this.dateCompare(fullDate, this.endDate)
          // disableAfter = this.dateCompare(nowDate, dateCompAfter ? this.endDate : fullDate)
          disableAfter = _this.dateCompare(nowDate, _this.endDate);
        }
        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.isLogicBefore(nowDate, _this.multipleStatus.before, _this.multipleStatus.after),
          afterMultiple: _this.isLogicAfter(nowDate, _this.multipleStatus.before, _this.multipleStatus.after),
          month: full.month,
          disable: !(disableBefore && disableAfter),
          isDay: isDay,
          userChecked: false };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);};for (var i = 1; i <= dateData; i++) {_loop(i);
      }
      return dateArr;
    }
    /**
       * 获取下月天数
       */ }, { key: "_getNextMonthDays", value: function _getNextMonthDays(
    surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          disable: true });

      }
      return dateArr;
    }

    /**
       * 获取当前日期详情
       * @param {Object} date
       */ }, { key: "getInfo", value: function getInfo(
    date) {var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {return item.fullDate === _this2.getDate(date).fullDate;});
      return dateInfo;
    }

    /**
       * 比较时间大小
       */ }, { key: "dateCompare", value: function dateCompare(
    startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
       * 比较时间是否相等
       */ }, { key: "dateEqual", value: function dateEqual(
    before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
       *  比较真实起始日期
       */ }, { key: "isLogicBefore", value: function isLogicBefore(

    currentDay, before, after) {
      var logicBefore = before;
      if (before && after) {
        logicBefore = this.dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDay);
    } }, { key: "isLogicAfter", value: function isLogicAfter(

    currentDay, before, after) {
      var logicAfter = after;
      if (before && after) {
        logicAfter = this.dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDay);
    }

    /**
       * 获取日期范围内所有日期
       * @param {Object} begin
       * @param {Object} end
       */ }, { key: "geDateAll", value: function geDateAll(
    begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }

    /**
       *  获取多选状态
       */ }, { key: "setMultiple", value: function setMultiple(
    fullDate) {var _this$multipleStatus =



      this.multipleStatus,before = _this$multipleStatus.before,after = _this$multipleStatus.after;
      if (!this.range) return;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = '';
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.
            after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.
            before);
          }
          this.lastHover = true;
        }
      }
      this._getWeek(fullDate);
    }

    /**
       *  鼠标 hover 更新多选状态
       */ }, { key: "setHoverMultiple", value: function setHoverMultiple(
    fullDate) {var _this$multipleStatus2 =



      this.multipleStatus,before = _this$multipleStatus2.before,after = _this$multipleStatus2.after;

      if (!this.range) return;
      if (this.lastHover) return;

      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this._getWeek(fullDate);
    }

    /**
       * 更新默认值多选状态
       */ }, { key: "setDefaultMultiple", value: function setDefaultMultiple(
    before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (this.dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this._getWeek(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this._getWeek(before);
        }
      }
    }

    /**
       * 获取每周数据
       * @param {Object} dateData
       */ }, { key: "_getWeek", value: function _getWeek(
    dateData) {var _this$getDate =






      this.getDate(dateData),fullDate = _this$getDate.fullDate,year = _this$getDate.year,month = _this$getDate.month,date = _this$getDate.date,day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
        nextMonthDays: [], // 下个月开始几天
        weeks: [] };

      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);return Calendar;}();var _default =


Calendar;exports.default = _default;

/***/ }),

/***/ 533:
/*!*********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-load-more/components/uni-load-more/i18n/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 534));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 535));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 536));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 534:
/*!********************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-load-more/components/uni-load-more/i18n/en.json ***!
  \********************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"Pull up to show more\",\"uni-load-more.contentrefresh\":\"loading...\",\"uni-load-more.contentnomore\":\"No more data\"}");

/***/ }),

/***/ 535:
/*!*************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hans.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉显示更多\",\"uni-load-more.contentrefresh\":\"正在加载...\",\"uni-load-more.contentnomore\":\"没有更多数据了\"}");

/***/ }),

/***/ 536:
/*!*************************************************************************************************************************!*\
  !*** /Users/myaccont/Desktop/CampuServicePlatform/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hant.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉顯示更多\",\"uni-load-more.contentrefresh\":\"正在加載...\",\"uni-load-more.contentnomore\":\"沒有更多數據了\"}");

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map