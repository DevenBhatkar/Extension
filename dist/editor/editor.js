const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["chunks/index.es-u2N9Z2hW.js","chunks/storage-LAwyUxjd.js","chunks/preload-helper-BkSzTOHT.js"])))=>i.map(i=>d[i]);
import { l as formatDate, S as STORAGE_KEYS, i as getSession, s as saveSession, g as generateId } from "../chunks/storage-LAwyUxjd.js";
import { _ as __vitePreload } from "../chunks/preload-helper-BkSzTOHT.js";
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _defineProperty(e, r, t2) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t2, e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e = 1; e < arguments.length; e++) {
      var t2 = arguments[e];
      for (var r in t2) ({}).hasOwnProperty.call(t2, r) && (n2[r] = t2[r]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t2), true).forEach(function(r2) {
      _defineProperty(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t2) {
  if (null == e) return {};
  var o2, r, i2 = _objectWithoutPropertiesLoose(e, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n2.length; r++) o2 = n2[r], -1 === t2.indexOf(o2) && {}.propertyIsEnumerable.call(e, o2) && (i2[o2] = e[o2]);
  }
  return i2;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t2 = {};
  for (var n2 in r) if ({}.hasOwnProperty.call(r, n2)) {
    if (-1 !== e.indexOf(n2)) continue;
    t2[n2] = r[n2];
  }
  return t2;
}
function _toPrimitive(t2, r) {
  if ("object" != typeof t2 || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != typeof i2) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
function _toPropertyKey(t2) {
  var i2 = _toPrimitive(t2, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
var version = "1.15.7";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector) return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_2) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType && el.host !== el ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i2 = 0, n2 = list.length;
    if (iterator) {
      for (; i2 < n2; i2++) {
        iterator(list[i2], i2);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    {
      visible = elSideVal >= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i2 = 0, children = el.children;
  while (i2 < children.length) {
    if (children[i2].style.display !== "none" && children[i2] !== Sortable.ghost && (includeDragEl || children[i2] !== Sortable.dragged) && closest(children[i2], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i2];
      }
      currentChild++;
    }
    i2++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i2 in arr) {
    if (!arr.hasOwnProperty(i2)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i2][key]) return Number(i2);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x2, y2) {
  el.scrollLeft += x2;
  el.scrollTop += y2;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $2 = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($2) {
    return $2(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function getChildContainingRectFromElement(container, options, ghostEl2) {
  var rect = {};
  Array.from(container.children).forEach(function(child) {
    var _rect$left, _rect$top, _rect$right, _rect$bottom;
    if (!closest(child, options.draggable, container, false) || child.animated || child === ghostEl2) return;
    var childRect = getRect(child);
    rect.left = Math.min((_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : Infinity, childRect.left);
    rect.top = Math.min((_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : Infinity, childRect.top);
    rect.right = Math.max((_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : -Infinity, childRect.right);
    rect.bottom = Math.max((_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : -Infinity, childRect.bottom);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function") callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function") callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function") callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p2) {
      if (p2.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2)) continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function") return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName]) return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable) return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (!documentExists) return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x2, y2) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable), insideHorizontally = x2 >= rect.left - threshold && x2 <= rect.right + threshold, insideVertically = y2 >= rect.top - threshold && y2 <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof$1(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists && !ChromeForAndroid) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i2 in evt) {
        if (evt.hasOwnProperty(i2)) {
          event[i2] = evt[i2];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && (!Safari || IOS),
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable) return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      if (options.supportPointer) {
        on(ownerDocument, "pointerup", _this._onDrop);
        !this.nativeDraggable && on(ownerDocument, "pointercancel", _this._onDrop);
      } else {
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop);
      }
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        if (options.supportPointer) {
          on(ownerDocument, "pointerup", _this._disableDelayedDrag);
          on(ownerDocument, "pointercancel", _this._disableDelayedDrag);
        } else {
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        }
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "pointerup", this._disableDelayedDrag);
    off(ownerDocument, "pointercancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err2) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = getParentOrHost(parent));
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    window.getSelection().removeAllRanges();
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          if (elLastChild && elLastChild.nextSibling) {
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "pointercancel", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    var el = this.el;
    savedInputChecked.forEach(function(checkEl) {
      if (el.contains(checkEl)) {
        checkEl.checked = true;
      }
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i2 = 0, n2 = children.length, options = this.options;
    for (; i2 < n2; i2++) {
      el = children[i2];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i2) {
      var el = rootEl2.children[i2];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled) return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var firstElRect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX < childContainingRect.left - spacer || evt.clientY < firstElRect.top && evt.clientX < firstElRect.right : evt.clientY < childContainingRect.top - spacer || evt.clientY < firstElRect.bottom && evt.clientX < firstElRect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var lastElRect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX > childContainingRect.right + spacer || evt.clientY > lastElRect.bottom && evt.clientX > lastElRect.left : evt.clientY > childContainingRect.bottom + spacer || evt.clientX > lastElRect.right && evt.clientY > lastElRect.top;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i2 = str.length, sum = 0;
  while (i2--) {
    sum += str.charCodeAt(i2);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild,
  expando
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array) plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x2 = (evt.touches ? evt.touches[0] : evt).clientX, y2 = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x2, y2);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x2 !== lastAutoScrollX || y2 !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x2, y2), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x2;
          lastAutoScrollY = y2;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll) return;
  var x2 = (evt.touches ? evt.touches[0] : evt).clientX, y2 = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x2) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x2) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y2) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y2) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i2 = 0; i2 <= layersOut; i2++) {
        if (!autoScrolls[i2]) {
          autoScrolls[i2] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b2 = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b2[i2] = start += 1 << eb[i2 - 1];
  }
  var r = new i32(b2[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j2 = b2[i2]; j2 < b2[i2 + 1]; ++j2) {
      r[j2] = j2 - b2[i2] << 5 | i2;
    }
  }
  return { b: b2, r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b, revfd = _b.r;
var rev = new u16(32768);
for (var i$1 = 0; i$1 < 32768; ++i$1) {
  var x$1 = (i$1 & 43690) >> 1 | (i$1 & 21845) << 1;
  x$1 = (x$1 & 52428) >> 2 | (x$1 & 13107) << 2;
  x$1 = (x$1 & 61680) >> 4 | (x$1 & 3855) << 4;
  rev[i$1] = ((x$1 & 65280) >> 8 | (x$1 & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r) {
  var s2 = cd.length;
  var i2 = 0;
  var l2 = new u16(mb);
  for (; i2 < s2; ++i2) {
    if (cd[i2])
      ++l2[cd[i2] - 1];
  }
  var le2 = new u16(mb);
  for (i2 = 1; i2 < mb; ++i2) {
    le2[i2] = le2[i2 - 1] + l2[i2 - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v2 = le2[cd[i2] - 1]++ << r_1;
        for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
          co[rev[v2] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s2);
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le2[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i$1 = 0; i$1 < 144; ++i$1)
  flt[i$1] = 8;
for (var i$1 = 144; i$1 < 256; ++i$1)
  flt[i$1] = 9;
for (var i$1 = 256; i$1 < 280; ++i$1)
  flt[i$1] = 7;
for (var i$1 = 280; i$1 < 288; ++i$1)
  flt[i$1] = 8;
var fdt = new u8(32);
for (var i$1 = 0; i$1 < 32; ++i$1)
  fdt[i$1] = 5;
var flm = /* @__PURE__ */ hMap(flt, 9, 0), flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0), fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a2) {
  var m2 = a2[0];
  for (var i2 = 1; i2 < a2.length; ++i2) {
    if (a2[i2] > m2)
      m2 = a2[i2];
  }
  return m2;
};
var bits = function(d2, p2, m2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8) >> (p2 & 7) & m2;
};
var bits16 = function(d2, p2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8 | d2[o2 + 2] << 16) >> (p2 & 7);
};
var shft = function(p2) {
  return (p2 + 7) / 8 | 0;
};
var slc = function(v2, s2, e) {
  if (e == null || e > v2.length)
    e = v2.length;
  return new u8(v2.subarray(s2, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt2) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt2)
    throw e;
  return e;
};
var inflt = function(dat, st2, buf, dict) {
  var sl = dat.length, dl = 0;
  if (!sl || st2.f && !st2.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st2.i != 2;
  var noSt = st2.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l3) {
    var bl = buf.length;
    if (l3 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l3));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st2.f || 0, pos = st2.p || 0, bt2 = st2.b || 0, lm = st2.l, dm = st2.d, lbt = st2.m, dbt = st2.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s2 = shft(pos) + 4, l2 = dat[s2 - 4] | dat[s2 - 3] << 8, t2 = s2 + l2;
        if (t2 > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt2 + l2);
        buf.set(dat.subarray(s2, t2), bt2);
        st2.b = bt2 += l2, st2.p = pos = t2 * 8, st2.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s2 = r >> 4;
          if (s2 < 16) {
            ldt[i2++] = s2;
          } else {
            var c2 = 0, n2 = 0;
            if (s2 == 16)
              n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
            else if (s2 == 17)
              n2 = 3 + bits(dat, pos, 7), pos += 3;
            else if (s2 == 18)
              n2 = 11 + bits(dat, pos, 127), pos += 7;
            while (n2--)
              ldt[i2++] = c2;
          }
        }
        var lt2 = ldt.subarray(0, hLit), dt2 = ldt.subarray(hLit);
        lbt = max(lt2);
        dbt = max(dt2);
        lm = hMap(lt2, lbt, 1);
        dm = hMap(dt2, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt2 + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
      pos += c2 & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c2)
        err(2);
      if (sym < 256)
        buf[bt2++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b2 = fleb[i2];
          add = bits(dat, pos, (1 << b2) - 1) + fl[i2];
          pos += b2;
        }
        var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >> 4;
        if (!d2)
          err(3);
        pos += d2 & 15;
        var dt2 = fd[dsym];
        if (dsym > 3) {
          var b2 = fdeb[dsym];
          dt2 += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt2 + 131072);
        var end = bt2 + add;
        if (bt2 < dt2) {
          var shift = dl - dt2, dend = Math.min(dt2, end);
          if (shift + bt2 < 0)
            err(3);
          for (; bt2 < dend; ++bt2)
            buf[bt2] = dict[shift + bt2];
        }
        for (; bt2 < end; ++bt2)
          buf[bt2] = buf[bt2 - dt2];
      }
    }
    st2.l = lm, st2.p = lpos, st2.b = bt2, st2.f = final;
    if (lm)
      final = 1, st2.m = lbt, st2.d = dm, st2.n = dbt;
  } while (!final);
  return bt2 != buf.length && noBuf ? slc(buf, 0, bt2) : buf.subarray(0, bt2);
};
var wbits = function(d2, p2, v2) {
  v2 <<= p2 & 7;
  var o2 = p2 / 8 | 0;
  d2[o2] |= v2;
  d2[o2 + 1] |= v2 >> 8;
};
var wbits16 = function(d2, p2, v2) {
  v2 <<= p2 & 7;
  var o2 = p2 / 8 | 0;
  d2[o2] |= v2;
  d2[o2 + 1] |= v2 >> 8;
  d2[o2 + 2] |= v2 >> 16;
};
var hTree = function(d2, mb) {
  var t2 = [];
  for (var i2 = 0; i2 < d2.length; ++i2) {
    if (d2[i2])
      t2.push({ s: i2, f: d2[i2] });
  }
  var s2 = t2.length;
  var t22 = t2.slice();
  if (!s2)
    return { t: et$1, l: 0 };
  if (s2 == 1) {
    var v2 = new u8(t2[0].s + 1);
    v2[t2[0].s] = 1;
    return { t: v2, l: 1 };
  }
  t2.sort(function(a2, b2) {
    return a2.f - b2.f;
  });
  t2.push({ s: -1, f: 25001 });
  var l2 = t2[0], r = t2[1], i0 = 0, i1 = 1, i22 = 2;
  t2[0] = { s: -1, f: l2.f + r.f, l: l2, r };
  while (i1 != s2 - 1) {
    l2 = t2[t2[i0].f < t2[i22].f ? i0++ : i22++];
    r = t2[i0 != i1 && t2[i0].f < t2[i22].f ? i0++ : i22++];
    t2[i1++] = { s: -1, f: l2.f + r.f, l: l2, r };
  }
  var maxSym = t22[0].s;
  for (var i2 = 1; i2 < s2; ++i2) {
    if (t22[i2].s > maxSym)
      maxSym = t22[i2].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t2[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i2 = 0, dt2 = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t22.sort(function(a2, b2) {
      return tr[b2.s] - tr[a2.s] || a2.f - b2.f;
    });
    for (; i2 < s2; ++i2) {
      var i2_1 = t22[i2].s;
      if (tr[i2_1] > mb) {
        dt2 += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt2 >>= lft;
    while (dt2 > 0) {
      var i2_2 = t22[i2].s;
      if (tr[i2_2] < mb)
        dt2 -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i2;
    }
    for (; i2 >= 0 && dt2; --i2) {
      var i2_3 = t22[i2].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt2;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n2, l2, d2) {
  return n2.s == -1 ? Math.max(ln(n2.l, l2, d2 + 1), ln(n2.r, l2, d2 + 1)) : l2[n2.s] = d2;
};
var lc = function(c2) {
  var s2 = c2.length;
  while (s2 && !c2[--s2])
    ;
  var cl = new u16(++s2);
  var cli = 0, cln = c2[0], cls = 1;
  var w2 = function(v2) {
    cl[cli++] = v2;
  };
  for (var i2 = 1; i2 <= s2; ++i2) {
    if (c2[i2] == cln && i2 != s2)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w2(32754);
        if (cls > 2) {
          w2(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w2(cln), --cls;
        for (; cls > 6; cls -= 6)
          w2(8304);
        if (cls > 2)
          w2(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w2(cln);
      cls = 1;
      cln = c2[i2];
    }
  }
  return { c: cl.subarray(0, cli), n: s2 };
};
var clen = function(cf, cl) {
  var l2 = 0;
  for (var i2 = 0; i2 < cl.length; ++i2)
    l2 += cf[i2] * cl[i2];
  return l2;
};
var wfblk = function(out, pos, dat) {
  var s2 = dat.length;
  var o2 = shft(pos + 2);
  out[o2] = s2 & 255;
  out[o2 + 1] = s2 >> 8;
  out[o2 + 2] = out[o2] ^ 255;
  out[o2 + 3] = out[o2 + 1] ^ 255;
  for (var i2 = 0; i2 < s2; ++i2)
    out[o2 + i2 + 4] = dat[i2];
  return (o2 + 4 + s2) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p2) {
  wbits(out, p2++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i2 = 0; i2 < lclt.length; ++i2)
    ++lcfreq[lclt[i2] & 31];
  for (var i2 = 0; i2 < lcdt.length; ++i2)
    ++lcfreq[lcdt[i2] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p2, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p2, 1 + (dtlen < ftlen)), p2 += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p2, nlc - 257);
    wbits(out, p2 + 5, ndc - 1);
    wbits(out, p2 + 10, nlcc - 4);
    p2 += 14;
    for (var i2 = 0; i2 < nlcc; ++i2)
      wbits(out, p2 + 3 * i2, lct[clim[i2]]);
    p2 += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it2 = 0; it2 < 2; ++it2) {
      var clct = lcts[it2];
      for (var i2 = 0; i2 < clct.length; ++i2) {
        var len = clct[i2] & 31;
        wbits(out, p2, llm[len]), p2 += lct[len];
        if (len > 15)
          wbits(out, p2, clct[i2] >> 5 & 127), p2 += clct[i2] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i2 = 0; i2 < li; ++i2) {
    var sym = syms[i2];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p2, lm[len + 257]), p2 += ll[len + 257];
      if (len > 7)
        wbits(out, p2, sym >> 23 & 31), p2 += fleb[len];
      var dst = sym & 31;
      wbits16(out, p2, dm[dst]), p2 += dl[dst];
      if (dst > 3)
        wbits16(out, p2, sym >> 5 & 8191), p2 += fdeb[dst];
    } else {
      wbits16(out, p2, lm[sym]), p2 += ll[sym];
    }
  }
  wbits16(out, p2, lm[256]);
  return p2 + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et$1 = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st2) {
  var s2 = st2.z || dat.length;
  var o2 = new u8(pre + s2 + 5 * (1 + Math.ceil(s2 / 7e3)) + post);
  var w2 = o2.subarray(pre, o2.length - post);
  var lst = st2.l;
  var pos = (st2.r || 0) & 7;
  if (lvl) {
    if (pos)
      w2[0] = st2.r >> 3;
    var opt = deo[lvl - 1];
    var n2 = opt >> 13, c2 = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st2.p || new u16(32768), head = st2.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i3) {
      return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i2 = st2.i || 0, li = 0, wi = st2.w || 0, bs = 0;
    for (; i2 + 2 < s2; ++i2) {
      var hv = hsh(i2);
      var imod = i2 & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i2) {
        var rem = s2 - i2;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w2, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
          li = lc_1 = eb = 0, bs = i2;
          for (var j2 = 0; j2 < 286; ++j2)
            lf[j2] = 0;
          for (var j2 = 0; j2 < 30; ++j2)
            df[j2] = 0;
        }
        var l2 = 2, d2 = 0, ch_1 = c2, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i2 - dif)) {
          var maxn = Math.min(n2, rem) - 1;
          var maxd = Math.min(32767, i2);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i2 + l2] == dat[i2 + l2 - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                ;
              if (nl > l2) {
                l2 = nl, d2 = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j2 = 0; j2 < mmd; ++j2) {
                  var ti = i2 - dif + j2 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d2) {
          syms[li++] = 268435456 | revfl[l2] << 18 | revfd[d2];
          var lin = revfl[l2] & 31, din = revfd[d2] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i2 + l2;
          ++lc_1;
        } else {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
      }
    }
    for (i2 = Math.max(i2, wi); i2 < s2; ++i2) {
      syms[li++] = dat[i2];
      ++lf[dat[i2]];
    }
    pos = wblk(dat, w2, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
    if (!lst) {
      st2.r = pos & 7 | w2[pos / 8 | 0] << 3;
      pos -= 7;
      st2.h = head, st2.p = prev, st2.i = i2, st2.w = wi;
    }
  } else {
    for (var i2 = st2.w || 0; i2 < s2 + lst; i2 += 65535) {
      var e = i2 + 65535;
      if (e >= s2) {
        w2[pos / 8 | 0] = lst;
        e = s2;
      }
      pos = wfblk(w2, pos + 1, dat.subarray(i2, e));
    }
    st2.i = s2;
  }
  return slc(o2, 0, pre + shft(pos) + post);
};
var adler = function() {
  var a2 = 1, b2 = 0;
  return {
    p: function(d2) {
      var n2 = a2, m2 = b2;
      var l2 = d2.length | 0;
      for (var i2 = 0; i2 != l2; ) {
        var e = Math.min(i2 + 2655, l2);
        for (; i2 < e; ++i2)
          m2 += n2 += d2[i2];
        n2 = (n2 & 65535) + 15 * (n2 >> 16), m2 = (m2 & 65535) + 15 * (m2 >> 16);
      }
      a2 = n2, b2 = m2;
    },
    d: function() {
      a2 %= 65521, b2 %= 65521;
      return (a2 & 255) << 24 | (a2 & 65280) << 8 | (b2 & 255) << 8 | b2 >> 8;
    }
  };
};
var dopt = function(dat, opt, pre, post, st2) {
  if (!st2) {
    st2 = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st2.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st2.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st2);
};
var wbytes = function(d2, b2, v2) {
  for (; v2; ++b2)
    d2[b2] = v2, v2 >>>= 8;
};
var zlh = function(c2, o2) {
  var lv = o2.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
  c2[0] = 120, c2[1] = fl2 << 6 | (o2.dictionary && 32);
  c2[1] |= 31 - (c2[0] << 8 | c2[1]) % 31;
  if (o2.dictionary) {
    var h2 = adler();
    h2.p(o2.dictionary);
    wbytes(c2, 2, h2.d());
  }
};
var zls = function(d2, dict) {
  if ((d2[0] & 15) != 8 || d2[0] >> 4 > 7 || (d2[0] << 8 | d2[1]) % 31)
    err(6, "invalid zlib data");
  if ((d2[1] >> 5 & 1) == 1)
    err(6, "invalid zlib data: " + (d2[1] & 32 ? "need" : "unexpected") + " dictionary");
  return (d2[1] >> 3 & 4) + 2;
};
function zlibSync(data, opts) {
  if (!opts)
    opts = {};
  var a2 = adler();
  a2.p(data);
  var d2 = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
  return zlh(d2, opts), wbytes(d2, d2.length - 4, a2.d()), d2;
}
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data), -4), { i: 2 }, opts, opts);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et$1, { stream: true });
  tds = 1;
} catch (e) {
}
var n = /* @__PURE__ */ function() {
  return "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
}();
function i() {
  n.console && "function" == typeof n.console.log && n.console.log.apply(n.console, arguments);
}
var a = { log: i, warn: function(t2) {
  n.console && ("function" == typeof n.console.warn ? n.console.warn.apply(n.console, arguments) : i.call(null, arguments));
}, error: function(t2) {
  n.console && ("function" == typeof n.console.error ? n.console.error.apply(n.console, arguments) : i(t2));
} };
function o(t2, e, r) {
  var n2 = new XMLHttpRequest();
  n2.open("GET", t2), n2.responseType = "blob", n2.onload = function() {
    l(n2.response, e, r);
  }, n2.onerror = function() {
    a.error("could not download file");
  }, n2.send();
}
function s(t2) {
  var e = new XMLHttpRequest();
  e.open("HEAD", t2, false);
  try {
    e.send();
  } catch (t3) {
  }
  return e.status >= 200 && e.status <= 299;
}
function c(t2) {
  try {
    t2.dispatchEvent(new MouseEvent("click"));
  } catch (r) {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), t2.dispatchEvent(e);
  }
}
var u, h, l = n.saveAs || ("object" !== ("undefined" == typeof window ? "undefined" : _typeof(window)) || window !== n ? function() {
} : "undefined" != typeof HTMLAnchorElement && "download" in HTMLAnchorElement.prototype ? function(t2, e, r) {
  var i2 = n.URL || n.webkitURL, a2 = document.createElement("a");
  e = e || t2.name || "download", a2.download = e, a2.rel = "noopener", "string" == typeof t2 ? (a2.href = t2, a2.origin !== location.origin ? s(a2.href) ? o(t2, e, r) : c(a2, a2.target = "_blank") : c(a2)) : (a2.href = i2.createObjectURL(t2), setTimeout(function() {
    i2.revokeObjectURL(a2.href);
  }, 4e4), setTimeout(function() {
    c(a2);
  }, 0));
} : "msSaveOrOpenBlob" in navigator ? function(e, r, n2) {
  if (r = r || e.name || "download", "string" == typeof e) if (s(e)) o(e, r, n2);
  else {
    var i2 = document.createElement("a");
    i2.href = e, i2.target = "_blank", setTimeout(function() {
      c(i2);
    });
  }
  else navigator.msSaveOrOpenBlob(function(e2, r2) {
    return void 0 === r2 ? r2 = { autoBom: false } : "object" !== _typeof(r2) && (a.warn("Deprecated: Expected third argument to be a object"), r2 = { autoBom: !r2 }), r2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e2.type) ? new Blob([String.fromCharCode(65279), e2], { type: e2.type }) : e2;
  }(e, n2), r);
} : function(e, r, i2, a2) {
  if ((a2 = a2 || open("", "_blank")) && (a2.document.title = a2.document.body.innerText = "downloading..."), "string" == typeof e) return o(e, r, i2);
  var s2 = "application/octet-stream" === e.type, c2 = /constructor/i.test(n.HTMLElement) || n.safari, u2 = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((u2 || s2 && c2) && "object" === ("undefined" == typeof FileReader ? "undefined" : _typeof(FileReader))) {
    var h2 = new FileReader();
    h2.onloadend = function() {
      var t2 = h2.result;
      t2 = u2 ? t2 : t2.replace(/^data:[^;]*;/, "data:attachment/file;"), a2 ? a2.location.href = t2 : location = t2, a2 = null;
    }, h2.readAsDataURL(e);
  } else {
    var l2 = n.URL || n.webkitURL, f2 = l2.createObjectURL(e);
    a2 ? a2.location = f2 : location.href = f2, a2 = null, setTimeout(function() {
      l2.revokeObjectURL(f2);
    }, 4e4);
  }
});
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */
function f(t2) {
  var e;
  t2 = t2 || "", this.ok = false, "#" == t2.charAt(0) && (t2 = t2.substr(1, 6));
  t2 = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslateblue: "8470ff", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32" }[t2 = (t2 = t2.replace(/ /g, "")).toLowerCase()] || t2;
  for (var r = [{ re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, example: ["rgb(123, 234, 45)", "rgb(255,234,245)"], process: function(t3) {
    return [parseInt(t3[1]), parseInt(t3[2]), parseInt(t3[3])];
  } }, { re: /^(\w{2})(\w{2})(\w{2})$/, example: ["#00ff00", "336699"], process: function(t3) {
    return [parseInt(t3[1], 16), parseInt(t3[2], 16), parseInt(t3[3], 16)];
  } }, { re: /^(\w{1})(\w{1})(\w{1})$/, example: ["#fb0", "f0f"], process: function(t3) {
    return [parseInt(t3[1] + t3[1], 16), parseInt(t3[2] + t3[2], 16), parseInt(t3[3] + t3[3], 16)];
  } }], n2 = 0; n2 < r.length; n2++) {
    var i2 = r[n2].re, a2 = r[n2].process, o2 = i2.exec(t2);
    o2 && (e = a2(o2), this.r = e[0], this.g = e[1], this.b = e[2], this.ok = true);
  }
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toHex = function() {
    var t3 = this.r.toString(16), e2 = this.g.toString(16), r2 = this.b.toString(16);
    return 1 == t3.length && (t3 = "0" + t3), 1 == e2.length && (e2 = "0" + e2), 1 == r2.length && (r2 = "0" + r2), "#" + t3 + e2 + r2;
  };
}
/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */
function d(t2, e) {
  var r = t2[0], n2 = t2[1], i2 = t2[2], a2 = t2[3];
  r = g(r, n2, i2, a2, e[0], 7, -680876936), a2 = g(a2, r, n2, i2, e[1], 12, -389564586), i2 = g(i2, a2, r, n2, e[2], 17, 606105819), n2 = g(n2, i2, a2, r, e[3], 22, -1044525330), r = g(r, n2, i2, a2, e[4], 7, -176418897), a2 = g(a2, r, n2, i2, e[5], 12, 1200080426), i2 = g(i2, a2, r, n2, e[6], 17, -1473231341), n2 = g(n2, i2, a2, r, e[7], 22, -45705983), r = g(r, n2, i2, a2, e[8], 7, 1770035416), a2 = g(a2, r, n2, i2, e[9], 12, -1958414417), i2 = g(i2, a2, r, n2, e[10], 17, -42063), n2 = g(n2, i2, a2, r, e[11], 22, -1990404162), r = g(r, n2, i2, a2, e[12], 7, 1804603682), a2 = g(a2, r, n2, i2, e[13], 12, -40341101), i2 = g(i2, a2, r, n2, e[14], 17, -1502002290), r = m(r, n2 = g(n2, i2, a2, r, e[15], 22, 1236535329), i2, a2, e[1], 5, -165796510), a2 = m(a2, r, n2, i2, e[6], 9, -1069501632), i2 = m(i2, a2, r, n2, e[11], 14, 643717713), n2 = m(n2, i2, a2, r, e[0], 20, -373897302), r = m(r, n2, i2, a2, e[5], 5, -701558691), a2 = m(a2, r, n2, i2, e[10], 9, 38016083), i2 = m(i2, a2, r, n2, e[15], 14, -660478335), n2 = m(n2, i2, a2, r, e[4], 20, -405537848), r = m(r, n2, i2, a2, e[9], 5, 568446438), a2 = m(a2, r, n2, i2, e[14], 9, -1019803690), i2 = m(i2, a2, r, n2, e[3], 14, -187363961), n2 = m(n2, i2, a2, r, e[8], 20, 1163531501), r = m(r, n2, i2, a2, e[13], 5, -1444681467), a2 = m(a2, r, n2, i2, e[2], 9, -51403784), i2 = m(i2, a2, r, n2, e[7], 14, 1735328473), r = v(r, n2 = m(n2, i2, a2, r, e[12], 20, -1926607734), i2, a2, e[5], 4, -378558), a2 = v(a2, r, n2, i2, e[8], 11, -2022574463), i2 = v(i2, a2, r, n2, e[11], 16, 1839030562), n2 = v(n2, i2, a2, r, e[14], 23, -35309556), r = v(r, n2, i2, a2, e[1], 4, -1530992060), a2 = v(a2, r, n2, i2, e[4], 11, 1272893353), i2 = v(i2, a2, r, n2, e[7], 16, -155497632), n2 = v(n2, i2, a2, r, e[10], 23, -1094730640), r = v(r, n2, i2, a2, e[13], 4, 681279174), a2 = v(a2, r, n2, i2, e[0], 11, -358537222), i2 = v(i2, a2, r, n2, e[3], 16, -722521979), n2 = v(n2, i2, a2, r, e[6], 23, 76029189), r = v(r, n2, i2, a2, e[9], 4, -640364487), a2 = v(a2, r, n2, i2, e[12], 11, -421815835), i2 = v(i2, a2, r, n2, e[15], 16, 530742520), r = b(r, n2 = v(n2, i2, a2, r, e[2], 23, -995338651), i2, a2, e[0], 6, -198630844), a2 = b(a2, r, n2, i2, e[7], 10, 1126891415), i2 = b(i2, a2, r, n2, e[14], 15, -1416354905), n2 = b(n2, i2, a2, r, e[5], 21, -57434055), r = b(r, n2, i2, a2, e[12], 6, 1700485571), a2 = b(a2, r, n2, i2, e[3], 10, -1894986606), i2 = b(i2, a2, r, n2, e[10], 15, -1051523), n2 = b(n2, i2, a2, r, e[1], 21, -2054922799), r = b(r, n2, i2, a2, e[8], 6, 1873313359), a2 = b(a2, r, n2, i2, e[15], 10, -30611744), i2 = b(i2, a2, r, n2, e[6], 15, -1560198380), n2 = b(n2, i2, a2, r, e[13], 21, 1309151649), r = b(r, n2, i2, a2, e[4], 6, -145523070), a2 = b(a2, r, n2, i2, e[11], 10, -1120210379), i2 = b(i2, a2, r, n2, e[2], 15, 718787259), n2 = b(n2, i2, a2, r, e[9], 21, -343485551), t2[0] = _(r, t2[0]), t2[1] = _(n2, t2[1]), t2[2] = _(i2, t2[2]), t2[3] = _(a2, t2[3]);
}
function p(t2, e, r, n2, i2, a2) {
  return e = _(_(e, t2), _(n2, a2)), _(e << i2 | e >>> 32 - i2, r);
}
function g(t2, e, r, n2, i2, a2, o2) {
  return p(e & r | ~e & n2, t2, e, i2, a2, o2);
}
function m(t2, e, r, n2, i2, a2, o2) {
  return p(e & n2 | r & ~n2, t2, e, i2, a2, o2);
}
function v(t2, e, r, n2, i2, a2, o2) {
  return p(e ^ r ^ n2, t2, e, i2, a2, o2);
}
function b(t2, e, r, n2, i2, a2, o2) {
  return p(r ^ (e | ~n2), t2, e, i2, a2, o2);
}
function y(t2) {
  var e, r = t2.length, n2 = [1732584193, -271733879, -1732584194, 271733878];
  for (e = 64; e <= t2.length; e += 64) d(n2, w(t2.substring(e - 64, e)));
  t2 = t2.substring(e - 64);
  var i2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (e = 0; e < t2.length; e++) i2[e >> 2] |= t2.charCodeAt(e) << (e % 4 << 3);
  if (i2[e >> 2] |= 128 << (e % 4 << 3), e > 55) for (d(n2, i2), e = 0; e < 16; e++) i2[e] = 0;
  return i2[14] = 8 * r, d(n2, i2), n2;
}
function w(t2) {
  var e, r = [];
  for (e = 0; e < 64; e += 4) r[e >> 2] = t2.charCodeAt(e) + (t2.charCodeAt(e + 1) << 8) + (t2.charCodeAt(e + 2) << 16) + (t2.charCodeAt(e + 3) << 24);
  return r;
}
u = n.atob.bind(n), h = n.btoa.bind(n);
var N = "0123456789abcdef".split("");
function L(t2) {
  for (var e = "", r = 0; r < 4; r++) e += N[t2 >> 8 * r + 4 & 15] + N[t2 >> 8 * r & 15];
  return e;
}
function A(t2) {
  return String.fromCharCode((255 & t2) >> 0, (65280 & t2) >> 8, (16711680 & t2) >> 16, (4278190080 & t2) >> 24);
}
function x(t2) {
  return y(t2).map(A).join("");
}
var S = "5d41402abc4b2a76b9719d911017c592" != function(t2) {
  for (var e = 0; e < t2.length; e++) t2[e] = L(t2[e]);
  return t2.join("");
}(y("hello"));
function _(t2, e) {
  if (S) {
    var r = (65535 & t2) + (65535 & e);
    return (t2 >> 16) + (e >> 16) + (r >> 16) << 16 | 65535 & r;
  }
  return t2 + e & 4294967295;
}
/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */
function P(t2, e) {
  var r, n2, i2, a2;
  if (t2 !== r) {
    for (var o2 = (i2 = t2, a2 = 1 + (256 / t2.length >> 0), new Array(a2 + 1).join(i2)), s2 = [], c2 = 0; c2 < 256; c2++) s2[c2] = c2;
    var u2 = 0;
    for (c2 = 0; c2 < 256; c2++) {
      var h2 = s2[c2];
      u2 = (u2 + h2 + o2.charCodeAt(c2)) % 256, s2[c2] = s2[u2], s2[u2] = h2;
    }
    r = t2, n2 = s2;
  } else s2 = n2;
  var l2 = e.length, f2 = 0, d2 = 0, p2 = "";
  for (c2 = 0; c2 < l2; c2++) d2 = (d2 + (h2 = s2[f2 = (f2 + 1) % 256])) % 256, s2[f2] = s2[d2], s2[d2] = h2, o2 = s2[(s2[f2] + s2[d2]) % 256], p2 += String.fromCharCode(e.charCodeAt(c2) ^ o2);
  return p2;
}
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */
var k = { print: 4, modify: 8, copy: 16, "annot-forms": 32 };
function I(t2, e, r, n2) {
  this.v = 1, this.r = 2;
  var i2 = 192;
  t2.forEach(function(t3) {
    if (void 0 !== k.perm) throw new Error("Invalid permission: " + t3);
    i2 += k[t3];
  }), this.padding = "(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";
  var a2 = (e + this.padding).substr(0, 32), o2 = (r + this.padding).substr(0, 32);
  this.O = this.processOwnerPassword(a2, o2), this.P = -(1 + (255 ^ i2)), this.encryptionKey = x(a2 + this.O + this.lsbFirstWord(this.P) + this.hexToBytes(n2)).substr(0, 5), this.U = P(this.encryptionKey, this.padding);
}
function F(t2) {
  if (/[^\u0000-\u00ff]/.test(t2)) throw new Error("Invalid PDF Name Object: " + t2 + ", Only accept ASCII characters.");
  for (var e = "", r = t2.length, n2 = 0; n2 < r; n2++) {
    var i2 = t2.charCodeAt(n2);
    if (i2 < 33 || 35 === i2 || 37 === i2 || 40 === i2 || 41 === i2 || 47 === i2 || 60 === i2 || 62 === i2 || 91 === i2 || 93 === i2 || 123 === i2 || 125 === i2 || i2 > 126) e += "#" + ("0" + i2.toString(16)).slice(-2);
    else e += t2[n2];
  }
  return e;
}
function C(e) {
  if ("object" !== _typeof(e)) throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
  var r = {};
  this.subscribe = function(t2, e2, n2) {
    if (n2 = n2 || false, "string" != typeof t2 || "function" != typeof e2 || "boolean" != typeof n2) throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
    r.hasOwnProperty(t2) || (r[t2] = {});
    var i2 = Math.random().toString(35);
    return r[t2][i2] = [e2, !!n2], i2;
  }, this.unsubscribe = function(t2) {
    for (var e2 in r) if (r[e2][t2]) return delete r[e2][t2], 0 === Object.keys(r[e2]).length && delete r[e2], true;
    return false;
  }, this.publish = function(t2) {
    if (r.hasOwnProperty(t2)) {
      var i2 = Array.prototype.slice.call(arguments, 1), o2 = [];
      for (var s2 in r[t2]) {
        var c2 = r[t2][s2];
        try {
          c2[0].apply(e, i2);
        } catch (t3) {
          n.console && a.error("jsPDF PubSub Error", t3.message, t3);
        }
        c2[1] && o2.push(s2);
      }
      o2.length && o2.forEach(this.unsubscribe);
    }
  }, this.getTopics = function() {
    return r;
  };
}
function j(t2) {
  if (!(this instanceof j)) return new j(t2);
  var e = "opacity,stroke-opacity".split(",");
  for (var r in t2) t2.hasOwnProperty(r) && e.indexOf(r) >= 0 && (this[r] = t2[r]);
  this.id = "", this.objectNumber = -1;
}
function O(t2, e) {
  this.gState = t2, this.matrix = e, this.id = "", this.objectNumber = -1;
}
function B(t2, e, r, n2, i2) {
  if (!(this instanceof B)) return new B(t2, e, r, n2, i2);
  this.type = "axial" === t2 ? 2 : 3, this.coords = e, this.colors = r, O.call(this, n2, i2);
}
function M(t2, e, r, n2, i2) {
  if (!(this instanceof M)) return new M(t2, e, r, n2, i2);
  this.boundingBox = t2, this.xStep = e, this.yStep = r, this.stream = "", this.cloneIndex = 0, O.call(this, n2, i2);
}
function E(e) {
  var r, i2 = "string" == typeof arguments[0] ? arguments[0] : "p", o2 = arguments[1], s2 = arguments[2], c2 = arguments[3], u2 = [], d2 = 1, p2 = 16, g2 = "S", m2 = null;
  "object" === _typeof(e = e || {}) && (i2 = e.orientation, o2 = e.unit || o2, s2 = e.format || s2, c2 = e.compress || e.compressPdf || c2, null !== (m2 = e.encryption || null) && (m2.userPassword = m2.userPassword || "", m2.ownerPassword = m2.ownerPassword || "", m2.userPermissions = m2.userPermissions || []), d2 = "number" == typeof e.userUnit ? Math.abs(e.userUnit) : 1, void 0 !== e.precision && (r = e.precision), void 0 !== e.floatPrecision && (p2 = e.floatPrecision), g2 = e.defaultPathOperation || "S"), u2 = e.filters || (true === c2 ? ["FlateEncode"] : u2), o2 = o2 || "mm", i2 = ("" + (i2 || "P")).toLowerCase();
  var v2 = e.putOnlyUsedFonts || false, b2 = {}, y2 = { internal: {}, __private__: {} };
  y2.__private__.PubSub = C;
  var w2 = "1.3", N2 = y2.__private__.getPdfVersion = function() {
    return w2;
  };
  y2.__private__.setPdfVersion = function(t2) {
    w2 = t2;
  };
  var L2 = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
  y2.__private__.getPageFormats = function() {
    return L2;
  };
  var A2 = y2.__private__.getPageFormat = function(t2) {
    return L2[t2];
  };
  s2 = s2 || "a4";
  var x2 = { COMPAT: "compat", ADVANCED: "advanced" }, S2 = x2.COMPAT;
  function _2() {
    this.saveGraphicsState(), lt2(new Vt2(_t2, 0, 0, -_t2, 0, Rr() * _t2).toString() + " cm"), this.setFontSize(this.getFontSize() / _t2), g2 = "n", S2 = x2.ADVANCED;
  }
  function P2() {
    this.restoreGraphicsState(), g2 = "S", S2 = x2.COMPAT;
  }
  var k2 = y2.__private__.combineFontStyleAndFontWeight = function(t2, e2) {
    if ("bold" == t2 && "normal" == e2 || "bold" == t2 && 400 == e2 || "normal" == t2 && "italic" == e2 || "bold" == t2 && "italic" == e2) throw new Error("Invalid Combination of fontweight and fontstyle");
    return e2 && (t2 = 400 == e2 || "normal" === e2 ? "italic" === t2 ? "italic" : "normal" : 700 != e2 && "bold" !== e2 || "normal" !== t2 ? (700 == e2 ? "bold" : e2) + "" + t2 : "bold"), t2;
  };
  y2.advancedAPI = function(t2) {
    var e2 = S2 === x2.COMPAT;
    return e2 && _2.call(this), "function" != typeof t2 || (t2(this), e2 && P2.call(this)), this;
  }, y2.compatAPI = function(t2) {
    var e2 = S2 === x2.ADVANCED;
    return e2 && P2.call(this), "function" != typeof t2 || (t2(this), e2 && _2.call(this)), this;
  }, y2.isAdvancedAPI = function() {
    return S2 === x2.ADVANCED;
  };
  var O2, q2 = function(t2) {
    if (S2 !== x2.ADVANCED) throw new Error(t2 + " is only available in 'advanced' API mode. You need to call advancedAPI() first.");
  }, D2 = y2.roundToPrecision = y2.__private__.roundToPrecision = function(t2, e2) {
    var n2 = r || e2;
    if (isNaN(t2) || isNaN(n2)) throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    return t2.toFixed(n2).replace(/0+$/, "");
  };
  O2 = y2.hpf = y2.__private__.hpf = "number" == typeof p2 ? function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return D2(t2, p2);
  } : "smart" === p2 ? function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return D2(t2, t2 > -1 && t2 < 1 ? 16 : 5);
  } : function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return D2(t2, 16);
  };
  var R2 = y2.f2 = y2.__private__.f2 = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.f2");
    return D2(t2, 2);
  }, T2 = y2.__private__.f3 = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.f3");
    return D2(t2, 3);
  }, U2 = y2.scale = y2.__private__.scale = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.scale");
    return S2 === x2.COMPAT ? t2 * _t2 : S2 === x2.ADVANCED ? t2 : void 0;
  }, z2 = function(t2) {
    return S2 === x2.COMPAT ? Rr() - t2 : S2 === x2.ADVANCED ? t2 : void 0;
  }, H2 = function(t2) {
    return U2(z2(t2));
  };
  y2.__private__.setPrecision = y2.setPrecision = function(t2) {
    "number" == typeof parseInt(t2, 10) && (r = parseInt(t2, 10));
  };
  var W2, V2 = "00000000000000000000000000000000", G2 = y2.__private__.getFileId = function() {
    return V2;
  }, Y2 = y2.__private__.setFileId = function(t2) {
    return V2 = void 0 !== t2 && /^[a-fA-F0-9]{32}$/.test(t2) ? t2.toUpperCase() : V2.split("").map(function() {
      return "ABCDEF0123456789".charAt(Math.floor(16 * Math.random()));
    }).join(""), null !== m2 && (Ye = new I(m2.userPermissions, m2.userPassword, m2.ownerPassword, V2)), V2;
  };
  y2.setFileId = function(t2) {
    return Y2(t2), this;
  }, y2.getFileId = function() {
    return G2();
  };
  var J2 = y2.__private__.convertDateToPDFDate = function(t2) {
    var e2 = t2.getTimezoneOffset(), r2 = e2 < 0 ? "+" : "-", n2 = Math.floor(Math.abs(e2 / 60)), i3 = Math.abs(e2 % 60), a2 = [r2, Q2(n2), "'", Q2(i3), "'"].join("");
    return ["D:", t2.getFullYear(), Q2(t2.getMonth() + 1), Q2(t2.getDate()), Q2(t2.getHours()), Q2(t2.getMinutes()), Q2(t2.getSeconds()), a2].join("");
  }, X2 = y2.__private__.convertPDFDateToDate = function(t2) {
    var e2 = parseInt(t2.substr(2, 4), 10), r2 = parseInt(t2.substr(6, 2), 10) - 1, n2 = parseInt(t2.substr(8, 2), 10), i3 = parseInt(t2.substr(10, 2), 10), a2 = parseInt(t2.substr(12, 2), 10), o3 = parseInt(t2.substr(14, 2), 10);
    return new Date(e2, r2, n2, i3, a2, o3, 0);
  }, K2 = y2.__private__.setCreationDate = function(t2) {
    var e2;
    if (void 0 === t2 && (t2 = /* @__PURE__ */ new Date()), t2 instanceof Date) e2 = J2(t2);
    else {
      if (!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(t2)) throw new Error("Invalid argument passed to jsPDF.setCreationDate");
      e2 = t2;
    }
    return W2 = e2;
  }, Z2 = y2.__private__.getCreationDate = function(t2) {
    var e2 = W2;
    return "jsDate" === t2 && (e2 = X2(W2)), e2;
  };
  y2.setCreationDate = function(t2) {
    return K2(t2), this;
  }, y2.getCreationDate = function(t2) {
    return Z2(t2);
  };
  var $2, Q2 = y2.__private__.padd2 = function(t2) {
    return ("0" + parseInt(t2)).slice(-2);
  }, tt2 = y2.__private__.padd2Hex = function(t2) {
    return ("00" + (t2 = t2.toString())).substr(t2.length);
  }, et2 = 0, rt2 = [], nt2 = [], it2 = 0, at2 = [], ot2 = [], st2 = false, ct2 = nt2, ut2 = function() {
    et2 = 0, it2 = 0, nt2 = [], rt2 = [], at2 = [], Qt2 = Kt2(), te2 = Kt2();
  };
  y2.__private__.setCustomOutputDestination = function(t2) {
    st2 = true, ct2 = t2;
  };
  var ht2 = function(t2) {
    st2 || (ct2 = t2);
  };
  y2.__private__.resetCustomOutputDestination = function() {
    st2 = false, ct2 = nt2;
  };
  var lt2 = y2.__private__.out = function(t2) {
    return t2 = t2.toString(), it2 += t2.length + 1, ct2.push(t2), ct2;
  }, ft2 = y2.__private__.write = function(t2) {
    return lt2(1 === arguments.length ? t2.toString() : Array.prototype.join.call(arguments, " "));
  }, dt2 = y2.__private__.getArrayBuffer = function(t2) {
    for (var e2 = t2.length, r2 = new ArrayBuffer(e2), n2 = new Uint8Array(r2); e2--; ) n2[e2] = t2.charCodeAt(e2);
    return r2;
  }, pt2 = [["Helvetica", "helvetica", "normal", "WinAnsiEncoding"], ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"], ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"], ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"], ["Courier", "courier", "normal", "WinAnsiEncoding"], ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"], ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"], ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"], ["Times-Roman", "times", "normal", "WinAnsiEncoding"], ["Times-Bold", "times", "bold", "WinAnsiEncoding"], ["Times-Italic", "times", "italic", "WinAnsiEncoding"], ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"], ["ZapfDingbats", "zapfdingbats", "normal", null], ["Symbol", "symbol", "normal", null]];
  y2.__private__.getStandardFonts = function() {
    return pt2;
  };
  var gt2 = e.fontSize || 16;
  y2.__private__.setFontSize = y2.setFontSize = function(t2) {
    return gt2 = S2 === x2.ADVANCED ? t2 / _t2 : t2, this;
  };
  var mt2, vt2 = y2.__private__.getFontSize = y2.getFontSize = function() {
    return S2 === x2.COMPAT ? gt2 : gt2 * _t2;
  }, bt2 = e.R2L || false;
  y2.__private__.setR2L = y2.setR2L = function(t2) {
    return bt2 = t2, this;
  }, y2.__private__.getR2L = y2.getR2L = function() {
    return bt2;
  };
  var yt2, wt2 = y2.__private__.setZoomMode = function(t2) {
    var e2 = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
    if (/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(t2)) mt2 = t2;
    else if (isNaN(t2)) {
      if (-1 === e2.indexOf(t2)) throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + t2 + '" is not recognized.');
      mt2 = t2;
    } else mt2 = parseInt(t2, 10);
  };
  y2.__private__.getZoomMode = function() {
    return mt2;
  };
  var Nt2, Lt2 = y2.__private__.setPageMode = function(t2) {
    if (-1 == [void 0, null, "UseNone", "UseOutlines", "UseThumbs", "FullScreen"].indexOf(t2)) throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + t2 + '" is not recognized.');
    yt2 = t2;
  };
  y2.__private__.getPageMode = function() {
    return yt2;
  };
  var At2 = y2.__private__.setLayoutMode = function(t2) {
    if (-1 == [void 0, null, "continuous", "single", "twoleft", "tworight", "two"].indexOf(t2)) throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + t2 + '" is not recognized.');
    Nt2 = t2;
  };
  y2.__private__.getLayoutMode = function() {
    return Nt2;
  }, y2.__private__.setDisplayMode = y2.setDisplayMode = function(t2, e2, r2) {
    return wt2(t2), At2(e2), Lt2(r2), this;
  };
  var xt2 = { title: "", subject: "", author: "", keywords: "", creator: "" };
  y2.__private__.getDocumentProperty = function(t2) {
    if (-1 === Object.keys(xt2).indexOf(t2)) throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return xt2[t2];
  }, y2.__private__.getDocumentProperties = function() {
    return xt2;
  }, y2.__private__.setDocumentProperties = y2.setProperties = y2.setDocumentProperties = function(t2) {
    for (var e2 in xt2) xt2.hasOwnProperty(e2) && t2[e2] && (xt2[e2] = t2[e2]);
    return this;
  }, y2.__private__.setDocumentProperty = function(t2, e2) {
    if (-1 === Object.keys(xt2).indexOf(t2)) throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    return xt2[t2] = e2;
  };
  var St, _t2, Pt2, kt2, It2, Ft2 = {}, Ct2 = {}, jt2 = [], Ot2 = {}, Bt2 = {}, Mt2 = {}, Et2 = {}, qt2 = null, Dt2 = 0, Rt2 = [], Tt2 = new C(y2), Ut2 = e.hotfixes || [], zt2 = {}, Ht2 = {}, Wt2 = [], Vt2 = function t2(e2, r2, n2, i3, a2, o3) {
    if (!(this instanceof t2)) return new t2(e2, r2, n2, i3, a2, o3);
    isNaN(e2) && (e2 = 1), isNaN(r2) && (r2 = 0), isNaN(n2) && (n2 = 0), isNaN(i3) && (i3 = 1), isNaN(a2) && (a2 = 0), isNaN(o3) && (o3 = 0), this._matrix = [e2, r2, n2, i3, a2, o3];
  };
  Object.defineProperty(Vt2.prototype, "sx", { get: function() {
    return this._matrix[0];
  }, set: function(t2) {
    this._matrix[0] = t2;
  } }), Object.defineProperty(Vt2.prototype, "shy", { get: function() {
    return this._matrix[1];
  }, set: function(t2) {
    this._matrix[1] = t2;
  } }), Object.defineProperty(Vt2.prototype, "shx", { get: function() {
    return this._matrix[2];
  }, set: function(t2) {
    this._matrix[2] = t2;
  } }), Object.defineProperty(Vt2.prototype, "sy", { get: function() {
    return this._matrix[3];
  }, set: function(t2) {
    this._matrix[3] = t2;
  } }), Object.defineProperty(Vt2.prototype, "tx", { get: function() {
    return this._matrix[4];
  }, set: function(t2) {
    this._matrix[4] = t2;
  } }), Object.defineProperty(Vt2.prototype, "ty", { get: function() {
    return this._matrix[5];
  }, set: function(t2) {
    this._matrix[5] = t2;
  } }), Object.defineProperty(Vt2.prototype, "a", { get: function() {
    return this._matrix[0];
  }, set: function(t2) {
    this._matrix[0] = t2;
  } }), Object.defineProperty(Vt2.prototype, "b", { get: function() {
    return this._matrix[1];
  }, set: function(t2) {
    this._matrix[1] = t2;
  } }), Object.defineProperty(Vt2.prototype, "c", { get: function() {
    return this._matrix[2];
  }, set: function(t2) {
    this._matrix[2] = t2;
  } }), Object.defineProperty(Vt2.prototype, "d", { get: function() {
    return this._matrix[3];
  }, set: function(t2) {
    this._matrix[3] = t2;
  } }), Object.defineProperty(Vt2.prototype, "e", { get: function() {
    return this._matrix[4];
  }, set: function(t2) {
    this._matrix[4] = t2;
  } }), Object.defineProperty(Vt2.prototype, "f", { get: function() {
    return this._matrix[5];
  }, set: function(t2) {
    this._matrix[5] = t2;
  } }), Object.defineProperty(Vt2.prototype, "rotation", { get: function() {
    return Math.atan2(this.shx, this.sx);
  } }), Object.defineProperty(Vt2.prototype, "scaleX", { get: function() {
    return this.decompose().scale.sx;
  } }), Object.defineProperty(Vt2.prototype, "scaleY", { get: function() {
    return this.decompose().scale.sy;
  } }), Object.defineProperty(Vt2.prototype, "isIdentity", { get: function() {
    return 1 === this.sx && (0 === this.shy && (0 === this.shx && (1 === this.sy && (0 === this.tx && 0 === this.ty))));
  } }), Vt2.prototype.join = function(t2) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty].map(O2).join(t2);
  }, Vt2.prototype.multiply = function(t2) {
    var e2 = t2.sx * this.sx + t2.shy * this.shx, r2 = t2.sx * this.shy + t2.shy * this.sy, n2 = t2.shx * this.sx + t2.sy * this.shx, i3 = t2.shx * this.shy + t2.sy * this.sy, a2 = t2.tx * this.sx + t2.ty * this.shx + this.tx, o3 = t2.tx * this.shy + t2.ty * this.sy + this.ty;
    return new Vt2(e2, r2, n2, i3, a2, o3);
  }, Vt2.prototype.decompose = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n2 = this.sy, i3 = this.tx, a2 = this.ty, o3 = Math.sqrt(t2 * t2 + e2 * e2), s3 = (t2 /= o3) * r2 + (e2 /= o3) * n2;
    r2 -= t2 * s3, n2 -= e2 * s3;
    var c3 = Math.sqrt(r2 * r2 + n2 * n2);
    return s3 /= c3, t2 * (n2 /= c3) < e2 * (r2 /= c3) && (t2 = -t2, e2 = -e2, s3 = -s3, o3 = -o3), { scale: new Vt2(o3, 0, 0, c3, 0, 0), translate: new Vt2(1, 0, 0, 1, i3, a2), rotate: new Vt2(t2, e2, -e2, t2, 0, 0), skew: new Vt2(1, 0, s3, 1, 0, 0) };
  }, Vt2.prototype.toString = function(t2) {
    return this.join(" ");
  }, Vt2.prototype.inversed = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n2 = this.sy, i3 = this.tx, a2 = this.ty, o3 = 1 / (t2 * n2 - e2 * r2), s3 = n2 * o3, c3 = -e2 * o3, u3 = -r2 * o3, h2 = t2 * o3;
    return new Vt2(s3, c3, u3, h2, -s3 * i3 - u3 * a2, -c3 * i3 - h2 * a2);
  }, Vt2.prototype.applyToPoint = function(t2) {
    var e2 = t2.x * this.sx + t2.y * this.shx + this.tx, r2 = t2.x * this.shy + t2.y * this.sy + this.ty;
    return new Cr(e2, r2);
  }, Vt2.prototype.applyToRectangle = function(t2) {
    var e2 = this.applyToPoint(t2), r2 = this.applyToPoint(new Cr(t2.x + t2.w, t2.y + t2.h));
    return new jr(e2.x, e2.y, r2.x - e2.x, r2.y - e2.y);
  }, Vt2.prototype.clone = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n2 = this.sy, i3 = this.tx, a2 = this.ty;
    return new Vt2(t2, e2, r2, n2, i3, a2);
  }, y2.Matrix = Vt2;
  var Gt2 = y2.matrixMult = function(t2, e2) {
    return e2.multiply(t2);
  }, Yt2 = new Vt2(1, 0, 0, 1, 0, 0);
  y2.unitMatrix = y2.identityMatrix = Yt2;
  var Jt2 = function(t2, e2) {
    if (!Bt2[t2]) {
      var r2 = (e2 instanceof B ? "Sh" : "P") + (Object.keys(Ot2).length + 1).toString(10);
      e2.id = r2, Bt2[t2] = r2, Ot2[r2] = e2, Tt2.publish("addPattern", e2);
    }
  };
  y2.ShadingPattern = B, y2.TilingPattern = M, y2.addShadingPattern = function(t2, e2) {
    return q2("addShadingPattern()"), Jt2(t2, e2), this;
  }, y2.beginTilingPattern = function(t2) {
    q2("beginTilingPattern()"), Br(t2.boundingBox[0], t2.boundingBox[1], t2.boundingBox[2] - t2.boundingBox[0], t2.boundingBox[3] - t2.boundingBox[1], t2.matrix);
  }, y2.endTilingPattern = function(t2, e2) {
    q2("endTilingPattern()"), e2.stream = ot2[$2].join("\n"), Jt2(t2, e2), Tt2.publish("endTilingPattern", e2), Wt2.pop().restore();
  };
  var Xt2 = y2.__private__.newObject = function() {
    var t2 = Kt2();
    return Zt2(t2, true), t2;
  }, Kt2 = y2.__private__.newObjectDeferred = function() {
    return et2++, rt2[et2] = function() {
      return it2;
    }, et2;
  }, Zt2 = function(t2, e2) {
    return e2 = "boolean" == typeof e2 && e2, rt2[t2] = it2, e2 && lt2(t2 + " 0 obj"), t2;
  }, $t2 = y2.__private__.newAdditionalObject = function() {
    var t2 = { objId: Kt2(), content: "" };
    return at2.push(t2), t2;
  }, Qt2 = Kt2(), te2 = Kt2(), ee2 = y2.__private__.decodeColorString = function(t2) {
    var e2 = t2.split(" ");
    if (2 !== e2.length || "g" !== e2[1] && "G" !== e2[1]) {
      if (5 === e2.length && ("k" === e2[4] || "K" === e2[4])) {
        e2 = [(1 - e2[0]) * (1 - e2[3]), (1 - e2[1]) * (1 - e2[3]), (1 - e2[2]) * (1 - e2[3]), "r"];
      }
    } else {
      var r2 = parseFloat(e2[0]);
      e2 = [r2, r2, r2, "r"];
    }
    for (var n2 = "#", i3 = 0; i3 < 3; i3++) n2 += ("0" + Math.floor(255 * parseFloat(e2[i3])).toString(16)).slice(-2);
    return n2;
  }, re2 = y2.__private__.encodeColorString = function(e2) {
    var r2;
    "string" == typeof e2 && (e2 = { ch1: e2 });
    var n2 = e2.ch1, i3 = e2.ch2, a2 = e2.ch3, o3 = e2.ch4, s3 = "draw" === e2.pdfColorType ? ["G", "RG", "K"] : ["g", "rg", "k"];
    if ("string" == typeof n2 && "#" !== n2.charAt(0)) {
      var c3 = new f(n2);
      if (c3.ok) n2 = c3.toHex();
      else if (!/^\d*\.?\d*$/.test(n2)) throw new Error('Invalid color "' + n2 + '" passed to jsPDF.encodeColorString.');
    }
    if ("string" == typeof n2 && /^#[0-9A-Fa-f]{3}$/.test(n2) && (n2 = "#" + n2[1] + n2[1] + n2[2] + n2[2] + n2[3] + n2[3]), "string" == typeof n2 && /^#[0-9A-Fa-f]{6}$/.test(n2)) {
      var u3 = parseInt(n2.substr(1), 16);
      n2 = u3 >> 16 & 255, i3 = u3 >> 8 & 255, a2 = 255 & u3;
    }
    if (void 0 === i3 || void 0 === o3 && n2 === i3 && i3 === a2) if ("string" == typeof n2) r2 = n2 + " " + s3[0];
    else switch (e2.precision) {
      case 2:
        r2 = R2(n2 / 255) + " " + s3[0];
        break;
      case 3:
      default:
        r2 = T2(n2 / 255) + " " + s3[0];
    }
    else if (void 0 === o3 || "object" === _typeof(o3)) {
      if (o3 && !isNaN(o3.a) && 0 === o3.a) return r2 = ["1.", "1.", "1.", s3[1]].join(" ");
      if ("string" == typeof n2) r2 = [n2, i3, a2, s3[1]].join(" ");
      else switch (e2.precision) {
        case 2:
          r2 = [R2(n2 / 255), R2(i3 / 255), R2(a2 / 255), s3[1]].join(" ");
          break;
        default:
        case 3:
          r2 = [T2(n2 / 255), T2(i3 / 255), T2(a2 / 255), s3[1]].join(" ");
      }
    } else if ("string" == typeof n2) r2 = [n2, i3, a2, o3, s3[2]].join(" ");
    else switch (e2.precision) {
      case 2:
        r2 = [R2(n2), R2(i3), R2(a2), R2(o3), s3[2]].join(" ");
        break;
      case 3:
      default:
        r2 = [T2(n2), T2(i3), T2(a2), T2(o3), s3[2]].join(" ");
    }
    return r2;
  }, ne2 = y2.__private__.getFilters = function() {
    return u2;
  }, ie2 = y2.__private__.putStream = function(t2) {
    var e2 = (t2 = t2 || {}).data || "", r2 = t2.filters || ne2(), n2 = t2.alreadyAppliedFilters || [], i3 = t2.addLength1 || false, a2 = e2.length, o3 = t2.objectId, s3 = function(t3) {
      return t3;
    };
    if (null !== m2 && void 0 === o3) throw new Error("ObjectId must be passed to putStream for file encryption");
    null !== m2 && (s3 = Ye.encryptor(o3, 0));
    var c3 = {};
    true === r2 && (r2 = ["FlateEncode"]);
    var u3 = t2.additionalKeyValues || [], h2 = (c3 = void 0 !== E.API.processDataByFilters ? E.API.processDataByFilters(e2, r2) : { data: e2, reverseChain: [] }).reverseChain + (Array.isArray(n2) ? n2.join(" ") : n2.toString());
    if (0 !== c3.data.length && (u3.push({ key: "Length", value: c3.data.length }), true === i3 && u3.push({ key: "Length1", value: a2 })), 0 != h2.length) if (h2.split("/").length - 1 == 1) u3.push({ key: "Filter", value: h2 });
    else {
      u3.push({ key: "Filter", value: "[" + h2 + "]" });
      for (var l2 = 0; l2 < u3.length; l2 += 1) if ("DecodeParms" === u3[l2].key) {
        for (var f2 = [], d3 = 0; d3 < c3.reverseChain.split("/").length - 1; d3 += 1) f2.push("null");
        f2.push(u3[l2].value), u3[l2].value = "[" + f2.join(" ") + "]";
      }
    }
    lt2("<<");
    for (var p3 = 0; p3 < u3.length; p3++) lt2("/" + u3[p3].key + " " + u3[p3].value);
    lt2(">>"), 0 !== c3.data.length && (lt2("stream"), lt2(s3(c3.data)), lt2("endstream"));
  }, ae2 = y2.__private__.putPage = function(t2) {
    var e2 = t2.number, r2 = t2.data, n2 = t2.objId, i3 = t2.contentsObjId;
    Zt2(n2, true), lt2("<</Type /Page"), lt2("/Parent " + t2.rootDictionaryObjId + " 0 R"), lt2("/Resources " + t2.resourceDictionaryObjId + " 0 R"), lt2("/MediaBox [" + parseFloat(O2(t2.mediaBox.bottomLeftX)) + " " + parseFloat(O2(t2.mediaBox.bottomLeftY)) + " " + O2(t2.mediaBox.topRightX) + " " + O2(t2.mediaBox.topRightY) + "]"), null !== t2.cropBox && lt2("/CropBox [" + O2(t2.cropBox.bottomLeftX) + " " + O2(t2.cropBox.bottomLeftY) + " " + O2(t2.cropBox.topRightX) + " " + O2(t2.cropBox.topRightY) + "]"), null !== t2.bleedBox && lt2("/BleedBox [" + O2(t2.bleedBox.bottomLeftX) + " " + O2(t2.bleedBox.bottomLeftY) + " " + O2(t2.bleedBox.topRightX) + " " + O2(t2.bleedBox.topRightY) + "]"), null !== t2.trimBox && lt2("/TrimBox [" + O2(t2.trimBox.bottomLeftX) + " " + O2(t2.trimBox.bottomLeftY) + " " + O2(t2.trimBox.topRightX) + " " + O2(t2.trimBox.topRightY) + "]"), null !== t2.artBox && lt2("/ArtBox [" + O2(t2.artBox.bottomLeftX) + " " + O2(t2.artBox.bottomLeftY) + " " + O2(t2.artBox.topRightX) + " " + O2(t2.artBox.topRightY) + "]"), "number" == typeof t2.userUnit && 1 !== t2.userUnit && lt2("/UserUnit " + t2.userUnit), Tt2.publish("putPage", { objId: n2, pageContext: Rt2[e2], pageNumber: e2, page: r2 }), lt2("/Contents " + i3 + " 0 R"), lt2(">>"), lt2("endobj");
    var a2 = r2.join("\n");
    return S2 === x2.ADVANCED && (a2 += "\nQ"), Zt2(i3, true), ie2({ data: a2, filters: ne2(), objectId: i3 }), lt2("endobj"), n2;
  }, oe2 = y2.__private__.putPages = function() {
    var t2, e2, r2 = [];
    for (t2 = 1; t2 <= Dt2; t2++) Rt2[t2].objId = Kt2(), Rt2[t2].contentsObjId = Kt2();
    for (t2 = 1; t2 <= Dt2; t2++) r2.push(ae2({ number: t2, data: ot2[t2], objId: Rt2[t2].objId, contentsObjId: Rt2[t2].contentsObjId, mediaBox: Rt2[t2].mediaBox, cropBox: Rt2[t2].cropBox, bleedBox: Rt2[t2].bleedBox, trimBox: Rt2[t2].trimBox, artBox: Rt2[t2].artBox, userUnit: Rt2[t2].userUnit, rootDictionaryObjId: Qt2, resourceDictionaryObjId: te2 }));
    Zt2(Qt2, true), lt2("<</Type /Pages");
    var n2 = "/Kids [";
    for (e2 = 0; e2 < Dt2; e2++) n2 += r2[e2] + " 0 R ";
    lt2(n2 + "]"), lt2("/Count " + Dt2), lt2(">>"), lt2("endobj"), Tt2.publish("postPutPages");
  }, se2 = function(t2) {
    Tt2.publish("putFont", { font: t2, out: lt2, newObject: Xt2, putStream: ie2 }), true !== t2.isAlreadyPutted && (t2.objectNumber = Xt2(), lt2("<<"), lt2("/Type /Font"), lt2("/BaseFont /" + F(t2.postScriptName)), lt2("/Subtype /Type1"), "string" == typeof t2.encoding && lt2("/Encoding /" + t2.encoding), lt2("/FirstChar 32"), lt2("/LastChar 255"), lt2(">>"), lt2("endobj"));
  }, ce2 = function() {
    for (var t2 in Ft2) Ft2.hasOwnProperty(t2) && (false === v2 || true === v2 && b2.hasOwnProperty(t2)) && se2(Ft2[t2]);
  }, ue2 = function(t2) {
    t2.objectNumber = Xt2();
    var e2 = [];
    e2.push({ key: "Type", value: "/XObject" }), e2.push({ key: "Subtype", value: "/Form" }), e2.push({ key: "BBox", value: "[" + [O2(t2.x), O2(t2.y), O2(t2.x + t2.width), O2(t2.y + t2.height)].join(" ") + "]" }), e2.push({ key: "Matrix", value: "[" + t2.matrix.toString() + "]" });
    var r2 = t2.pages[1].join("\n");
    ie2({ data: r2, additionalKeyValues: e2, objectId: t2.objectNumber }), lt2("endobj");
  }, he2 = function() {
    for (var t2 in zt2) zt2.hasOwnProperty(t2) && ue2(zt2[t2]);
  }, le2 = function(t2, e2) {
    var r2, n2 = [], i3 = 1 / (e2 - 1);
    for (r2 = 0; r2 < 1; r2 += i3) n2.push(r2);
    if (n2.push(1), 0 != t2[0].offset) {
      var a2 = { offset: 0, color: t2[0].color };
      t2.unshift(a2);
    }
    if (1 != t2[t2.length - 1].offset) {
      var o3 = { offset: 1, color: t2[t2.length - 1].color };
      t2.push(o3);
    }
    for (var s3 = "", c3 = 0, u3 = 0; u3 < n2.length; u3++) {
      for (r2 = n2[u3]; r2 > t2[c3 + 1].offset; ) c3++;
      var h2 = t2[c3].offset, l2 = (r2 - h2) / (t2[c3 + 1].offset - h2), f2 = t2[c3].color, d3 = t2[c3 + 1].color;
      s3 += tt2(Math.round((1 - l2) * f2[0] + l2 * d3[0]).toString(16)) + tt2(Math.round((1 - l2) * f2[1] + l2 * d3[1]).toString(16)) + tt2(Math.round((1 - l2) * f2[2] + l2 * d3[2]).toString(16));
    }
    return s3.trim();
  }, fe2 = function(t2, e2) {
    e2 || (e2 = 21);
    var r2 = Xt2(), n2 = le2(t2.colors, e2), i3 = [];
    i3.push({ key: "FunctionType", value: "0" }), i3.push({ key: "Domain", value: "[0.0 1.0]" }), i3.push({ key: "Size", value: "[" + e2 + "]" }), i3.push({ key: "BitsPerSample", value: "8" }), i3.push({ key: "Range", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), i3.push({ key: "Decode", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), ie2({ data: n2, additionalKeyValues: i3, alreadyAppliedFilters: ["/ASCIIHexDecode"], objectId: r2 }), lt2("endobj"), t2.objectNumber = Xt2(), lt2("<< /ShadingType " + t2.type), lt2("/ColorSpace /DeviceRGB");
    var a2 = "/Coords [" + O2(parseFloat(t2.coords[0])) + " " + O2(parseFloat(t2.coords[1])) + " ";
    2 === t2.type ? a2 += O2(parseFloat(t2.coords[2])) + " " + O2(parseFloat(t2.coords[3])) : a2 += O2(parseFloat(t2.coords[2])) + " " + O2(parseFloat(t2.coords[3])) + " " + O2(parseFloat(t2.coords[4])) + " " + O2(parseFloat(t2.coords[5])), lt2(a2 += "]"), t2.matrix && lt2("/Matrix [" + t2.matrix.toString() + "]"), lt2("/Function " + r2 + " 0 R"), lt2("/Extend [true true]"), lt2(">>"), lt2("endobj");
  }, de2 = function(t2, e2) {
    var r2 = Kt2(), n2 = Xt2();
    e2.push({ resourcesOid: r2, objectOid: n2 }), t2.objectNumber = n2;
    var i3 = [];
    i3.push({ key: "Type", value: "/Pattern" }), i3.push({ key: "PatternType", value: "1" }), i3.push({ key: "PaintType", value: "1" }), i3.push({ key: "TilingType", value: "1" }), i3.push({ key: "BBox", value: "[" + t2.boundingBox.map(O2).join(" ") + "]" }), i3.push({ key: "XStep", value: O2(t2.xStep) }), i3.push({ key: "YStep", value: O2(t2.yStep) }), i3.push({ key: "Resources", value: r2 + " 0 R" }), t2.matrix && i3.push({ key: "Matrix", value: "[" + t2.matrix.toString() + "]" }), ie2({ data: t2.stream, additionalKeyValues: i3, objectId: t2.objectNumber }), lt2("endobj");
  }, pe2 = function(t2) {
    var e2;
    for (e2 in Ot2) Ot2.hasOwnProperty(e2) && (Ot2[e2] instanceof B ? fe2(Ot2[e2]) : Ot2[e2] instanceof M && de2(Ot2[e2], t2));
  }, ge2 = function(t2) {
    for (var e2 in t2.objectNumber = Xt2(), lt2("<<"), t2) switch (e2) {
      case "opacity":
        lt2("/ca " + R2(t2[e2]));
        break;
      case "stroke-opacity":
        lt2("/CA " + R2(t2[e2]));
    }
    lt2(">>"), lt2("endobj");
  }, me2 = function() {
    var t2;
    for (t2 in Mt2) Mt2.hasOwnProperty(t2) && ge2(Mt2[t2]);
  }, ve2 = function() {
    for (var t2 in lt2("/XObject <<"), zt2) zt2.hasOwnProperty(t2) && zt2[t2].objectNumber >= 0 && lt2("/" + t2 + " " + zt2[t2].objectNumber + " 0 R");
    Tt2.publish("putXobjectDict"), lt2(">>");
  }, be2 = function() {
    Ye.oid = Xt2(), lt2("<<"), lt2("/Filter /Standard"), lt2("/V " + Ye.v), lt2("/R " + Ye.r), lt2("/U <" + Ye.toHexString(Ye.U) + ">"), lt2("/O <" + Ye.toHexString(Ye.O) + ">"), lt2("/P " + Ye.P), lt2(">>"), lt2("endobj");
  }, ye2 = function() {
    for (var t2 in lt2("/Font <<"), Ft2) Ft2.hasOwnProperty(t2) && (false === v2 || true === v2 && b2.hasOwnProperty(t2)) && lt2("/" + t2 + " " + Ft2[t2].objectNumber + " 0 R");
    lt2(">>");
  }, we2 = function() {
    if (Object.keys(Ot2).length > 0) {
      for (var t2 in lt2("/Shading <<"), Ot2) Ot2.hasOwnProperty(t2) && Ot2[t2] instanceof B && Ot2[t2].objectNumber >= 0 && lt2("/" + t2 + " " + Ot2[t2].objectNumber + " 0 R");
      Tt2.publish("putShadingPatternDict"), lt2(">>");
    }
  }, Ne2 = function(t2) {
    if (Object.keys(Ot2).length > 0) {
      for (var e2 in lt2("/Pattern <<"), Ot2) Ot2.hasOwnProperty(e2) && Ot2[e2] instanceof y2.TilingPattern && Ot2[e2].objectNumber >= 0 && Ot2[e2].objectNumber < t2 && lt2("/" + e2 + " " + Ot2[e2].objectNumber + " 0 R");
      Tt2.publish("putTilingPatternDict"), lt2(">>");
    }
  }, Le2 = function() {
    if (Object.keys(Mt2).length > 0) {
      var t2;
      for (t2 in lt2("/ExtGState <<"), Mt2) Mt2.hasOwnProperty(t2) && Mt2[t2].objectNumber >= 0 && lt2("/" + t2 + " " + Mt2[t2].objectNumber + " 0 R");
      Tt2.publish("putGStateDict"), lt2(">>");
    }
  }, Ae = function(t2) {
    Zt2(t2.resourcesOid, true), lt2("<<"), lt2("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), ye2(), we2(), Ne2(t2.objectOid), Le2(), ve2(), lt2(">>"), lt2("endobj");
  }, xe = function() {
    var t2 = [];
    ce2(), me2(), he2(), pe2(t2), Tt2.publish("putResources"), t2.forEach(Ae), Ae({ resourcesOid: te2, objectOid: Number.MAX_SAFE_INTEGER }), Tt2.publish("postPutResources");
  }, Se = function() {
    Tt2.publish("putAdditionalObjects");
    for (var t2 = 0; t2 < at2.length; t2++) {
      var e2 = at2[t2];
      Zt2(e2.objId, true), lt2(e2.content), lt2("endobj");
    }
    Tt2.publish("postPutAdditionalObjects");
  }, _e = function(t2) {
    Ct2[t2.fontName] = Ct2[t2.fontName] || {}, Ct2[t2.fontName][t2.fontStyle] = t2.id;
  }, Pe = function(t2, e2, r2, n2, i3) {
    var a2 = { id: "F" + (Object.keys(Ft2).length + 1).toString(10), postScriptName: t2, fontName: e2, fontStyle: r2, encoding: n2, isStandardFont: i3 || false, metadata: {} };
    return Tt2.publish("addFont", { font: a2, instance: this }), Ft2[a2.id] = a2, _e(a2), a2.id;
  }, ke = function(t2) {
    for (var e2 = 0, r2 = pt2.length; e2 < r2; e2++) {
      var n2 = Pe.call(this, t2[e2][0], t2[e2][1], t2[e2][2], pt2[e2][3], true);
      false === v2 && (b2[n2] = true);
      var i3 = t2[e2][0].split("-");
      _e({ id: n2, fontName: i3[0], fontStyle: i3[1] || "" });
    }
    Tt2.publish("addFonts", { fonts: Ft2, dictionary: Ct2 });
  }, Ie = function(t2) {
    return t2.foo = function() {
      try {
        return t2.apply(this, arguments);
      } catch (t3) {
        var e2 = t3.stack || "";
        ~e2.indexOf(" at ") && (e2 = e2.split(" at ")[1]);
        var r2 = "Error in function " + e2.split("\n")[0].split("<")[0] + ": " + t3.message;
        if (!n.console) throw new Error(r2);
        n.console.error(r2, t3), n.alert && alert(r2);
      }
    }, t2.foo.bar = t2, t2.foo;
  }, Fe = function(t2, e2) {
    var r2, n2, i3, a2, o3, s3, c3, u3, h2;
    if (i3 = (e2 = e2 || {}).sourceEncoding || "Unicode", o3 = e2.outputEncoding, (e2.autoencode || o3) && Ft2[St].metadata && Ft2[St].metadata[i3] && Ft2[St].metadata[i3].encoding && (a2 = Ft2[St].metadata[i3].encoding, !o3 && Ft2[St].encoding && (o3 = Ft2[St].encoding), !o3 && a2.codePages && (o3 = a2.codePages[0]), "string" == typeof o3 && (o3 = a2[o3]), o3)) {
      for (c3 = false, s3 = [], r2 = 0, n2 = t2.length; r2 < n2; r2++) (u3 = o3[t2.charCodeAt(r2)]) ? s3.push(String.fromCharCode(u3)) : s3.push(t2[r2]), s3[r2].charCodeAt(0) >> 8 && (c3 = true);
      t2 = s3.join("");
    }
    for (r2 = t2.length; void 0 === c3 && 0 !== r2; ) t2.charCodeAt(r2 - 1) >> 8 && (c3 = true), r2--;
    if (!c3) return t2;
    for (s3 = e2.noBOM ? [] : [254, 255], r2 = 0, n2 = t2.length; r2 < n2; r2++) {
      if ((h2 = (u3 = t2.charCodeAt(r2)) >> 8) >> 8) throw new Error("Character at position " + r2 + " of string '" + t2 + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
      s3.push(h2), s3.push(u3 - (h2 << 8));
    }
    return String.fromCharCode.apply(void 0, s3);
  }, Ce = y2.__private__.pdfEscape = y2.pdfEscape = function(t2, e2) {
    return Fe(t2, e2).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }, je = y2.__private__.beginPage = function(t2) {
    ot2[++Dt2] = [], Rt2[Dt2] = { objId: 0, contentsObjId: 0, userUnit: Number(d2), artBox: null, bleedBox: null, cropBox: null, trimBox: null, mediaBox: { bottomLeftX: 0, bottomLeftY: 0, topRightX: Number(t2[0]), topRightY: Number(t2[1]) } }, Me(Dt2), ht2(ot2[$2]);
  }, Oe = function(t2, e2) {
    var r2, n2, o3;
    switch (i2 = e2 || i2, "string" == typeof t2 && (r2 = A2(t2.toLowerCase()), Array.isArray(r2) && (n2 = r2[0], o3 = r2[1])), Array.isArray(t2) && (n2 = t2[0] * _t2, o3 = t2[1] * _t2), isNaN(n2) && (n2 = s2[0], o3 = s2[1]), (n2 > 14400 || o3 > 14400) && (a.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"), n2 = Math.min(14400, n2), o3 = Math.min(14400, o3)), s2 = [n2, o3], i2.substr(0, 1)) {
      case "l":
        o3 > n2 && (s2 = [o3, n2]);
        break;
      case "p":
        n2 > o3 && (s2 = [o3, n2]);
    }
    je(s2), pr(fr), lt2(Lr), 0 !== kr && lt2(kr + " J"), 0 !== Ir && lt2(Ir + " j"), Tt2.publish("addPage", { pageNumber: Dt2 });
  }, Be = function(t2) {
    t2 > 0 && t2 <= Dt2 && (ot2.splice(t2, 1), Rt2.splice(t2, 1), Dt2--, $2 > Dt2 && ($2 = Dt2), this.setPage($2));
  }, Me = function(t2) {
    t2 > 0 && t2 <= Dt2 && ($2 = t2);
  }, Ee = y2.__private__.getNumberOfPages = y2.getNumberOfPages = function() {
    return ot2.length - 1;
  }, qe = function(t2, e2, r2) {
    var n2, i3 = void 0;
    return r2 = r2 || {}, t2 = void 0 !== t2 ? t2 : Ft2[St].fontName, e2 = void 0 !== e2 ? e2 : Ft2[St].fontStyle, n2 = t2.toLowerCase(), void 0 !== Ct2[n2] && void 0 !== Ct2[n2][e2] ? i3 = Ct2[n2][e2] : void 0 !== Ct2[t2] && void 0 !== Ct2[t2][e2] ? i3 = Ct2[t2][e2] : false === r2.disableWarning && a.warn("Unable to look up font label for font '" + t2 + "', '" + e2 + "'. Refer to getFontList() for available fonts."), i3 || r2.noFallback || null == (i3 = Ct2.times[e2]) && (i3 = Ct2.times.normal), i3;
  }, De = y2.__private__.putInfo = function() {
    var t2 = Xt2(), e2 = function(t3) {
      return t3;
    };
    for (var r2 in null !== m2 && (e2 = Ye.encryptor(t2, 0)), lt2("<<"), lt2("/Producer (" + Ce(e2("jsPDF " + E.version)) + ")"), xt2) xt2.hasOwnProperty(r2) && xt2[r2] && lt2("/" + r2.substr(0, 1).toUpperCase() + r2.substr(1) + " (" + Ce(e2(xt2[r2])) + ")");
    lt2("/CreationDate (" + Ce(e2(W2)) + ")"), lt2(">>"), lt2("endobj");
  }, Re = y2.__private__.putCatalog = function(t2) {
    var e2 = (t2 = t2 || {}).rootDictionaryObjId || Qt2;
    switch (Xt2(), lt2("<<"), lt2("/Type /Catalog"), lt2("/Pages " + e2 + " 0 R"), mt2 || (mt2 = "fullwidth"), mt2) {
      case "fullwidth":
        lt2("/OpenAction [3 0 R /FitH null]");
        break;
      case "fullheight":
        lt2("/OpenAction [3 0 R /FitV null]");
        break;
      case "fullpage":
        lt2("/OpenAction [3 0 R /Fit]");
        break;
      case "original":
        lt2("/OpenAction [3 0 R /XYZ null null 1]");
        break;
      default:
        var r2 = "" + mt2;
        "%" === r2.substr(r2.length - 1) && (mt2 = parseInt(mt2) / 100), "number" == typeof mt2 && lt2("/OpenAction [3 0 R /XYZ null null " + R2(mt2) + "]");
    }
    switch (Nt2 || (Nt2 = "continuous"), Nt2) {
      case "continuous":
        lt2("/PageLayout /OneColumn");
        break;
      case "single":
        lt2("/PageLayout /SinglePage");
        break;
      case "two":
      case "twoleft":
        lt2("/PageLayout /TwoColumnLeft");
        break;
      case "tworight":
        lt2("/PageLayout /TwoColumnRight");
    }
    yt2 && lt2("/PageMode /" + yt2), Tt2.publish("putCatalog"), lt2(">>"), lt2("endobj");
  }, Te = y2.__private__.putTrailer = function() {
    lt2("trailer"), lt2("<<"), lt2("/Size " + (et2 + 1)), lt2("/Root " + et2 + " 0 R"), lt2("/Info " + (et2 - 1) + " 0 R"), null !== m2 && lt2("/Encrypt " + Ye.oid + " 0 R"), lt2("/ID [ <" + V2 + "> <" + V2 + "> ]"), lt2(">>");
  }, Ue = y2.__private__.putHeader = function() {
    lt2("%PDF-" + w2), lt2("%ºß¬à");
  }, ze = y2.__private__.putXRef = function() {
    var t2 = "0000000000";
    lt2("xref"), lt2("0 " + (et2 + 1)), lt2("0000000000 65535 f ");
    for (var e2 = 1; e2 <= et2; e2++) {
      "function" == typeof rt2[e2] ? lt2((t2 + rt2[e2]()).slice(-10) + " 00000 n ") : void 0 !== rt2[e2] ? lt2((t2 + rt2[e2]).slice(-10) + " 00000 n ") : lt2("0000000000 00000 n ");
    }
  }, He = y2.__private__.buildDocument = function() {
    ut2(), ht2(nt2), Tt2.publish("buildDocument"), Ue(), oe2(), Se(), xe(), null !== m2 && be2(), De(), Re();
    var t2 = it2;
    return ze(), Te(), lt2("startxref"), lt2("" + t2), lt2("%%EOF"), ht2(ot2[$2]), nt2.join("\n");
  }, We = y2.__private__.getBlob = function(t2) {
    return new Blob([dt2(t2)], { type: "application/pdf" });
  }, Ve = y2.output = y2.__private__.output = Ie(function(t2, e2) {
    switch ("string" == typeof (e2 = e2 || {}) ? e2 = { filename: e2 } : e2.filename = e2.filename || "generated.pdf", t2) {
      case void 0:
        return He();
      case "save":
        y2.save(e2.filename);
        break;
      case "arraybuffer":
        return dt2(He());
      case "blob":
        return We(He());
      case "bloburi":
      case "bloburl":
        if (void 0 !== n.URL && "function" == typeof n.URL.createObjectURL) return n.URL && n.URL.createObjectURL(We(He())) || void 0;
        a.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");
        break;
      case "datauristring":
      case "dataurlstring":
        var r2 = "", i3 = He();
        try {
          r2 = h(i3);
        } catch (t3) {
          r2 = h(unescape(encodeURIComponent(i3)));
        }
        return "data:application/pdf;filename=" + e2.filename + ";base64," + r2;
      case "pdfobjectnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(n)) {
          var o3 = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js", s3 = ' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';
          e2.pdfObjectUrl && (o3 = e2.pdfObjectUrl, s3 = "");
          var c3 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' + o3 + '"' + s3 + '><\/script><script >PDFObject.embed("' + this.output("dataurlstring") + '", ' + JSON.stringify(e2) + ");<\/script></body></html>", u3 = n.open();
          return null !== u3 && u3.document.write(c3), u3;
        }
        throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");
      case "pdfjsnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(n)) {
          var l2 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' + (e2.pdfJsUrl || "examples/PDF.js/web/viewer.html") + "?file=&downloadName=" + e2.filename + '" width="500px" height="400px" /></body></html>', f2 = n.open();
          if (null !== f2) {
            f2.document.write(l2);
            var d3 = this;
            f2.document.documentElement.querySelector("#pdfViewer").onload = function() {
              f2.document.title = e2.filename, f2.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(d3.output("bloburl"));
            };
          }
          return f2;
        }
        throw new Error("The option pdfjsnewwindow just works in a browser-environment.");
      case "dataurlnewwindow":
        if ("[object Window]" !== Object.prototype.toString.call(n)) throw new Error("The option dataurlnewwindow just works in a browser-environment.");
        var p3 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring", e2) + '"></iframe></body></html>', g3 = n.open();
        if (null !== g3 && (g3.document.write(p3), g3.document.title = e2.filename), g3 || "undefined" == typeof safari) return g3;
        break;
      case "datauri":
      case "dataurl":
        return n.document.location.href = this.output("datauristring", e2);
      default:
        return null;
    }
  }), Ge = function(t2) {
    return true === Array.isArray(Ut2) && Ut2.indexOf(t2) > -1;
  };
  switch (o2) {
    case "pt":
      _t2 = 1;
      break;
    case "mm":
      _t2 = 72 / 25.4;
      break;
    case "cm":
      _t2 = 72 / 2.54;
      break;
    case "in":
      _t2 = 72;
      break;
    case "px":
      _t2 = 1 == Ge("px_scaling") ? 0.75 : 96 / 72;
      break;
    case "pc":
    case "em":
      _t2 = 12;
      break;
    case "ex":
      _t2 = 6;
      break;
    default:
      if ("number" != typeof o2) throw new Error("Invalid unit: " + o2);
      _t2 = o2;
  }
  var Ye = null;
  K2(), Y2();
  var Je = function(t2) {
    return null !== m2 ? Ye.encryptor(t2, 0) : function(t3) {
      return t3;
    };
  }, Xe = y2.__private__.getPageInfo = y2.getPageInfo = function(t2) {
    if (isNaN(t2) || t2 % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfo");
    return { objId: Rt2[t2].objId, pageNumber: t2, pageContext: Rt2[t2] };
  }, Ke = y2.__private__.getPageInfoByObjId = function(t2) {
    if (isNaN(t2) || t2 % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");
    for (var e2 in Rt2) if (Rt2[e2].objId === t2) break;
    return Xe(e2);
  }, Ze = y2.__private__.getCurrentPageInfo = y2.getCurrentPageInfo = function() {
    return { objId: Rt2[$2].objId, pageNumber: $2, pageContext: Rt2[$2] };
  };
  y2.addPage = function() {
    return Oe.apply(this, arguments), this;
  }, y2.setPage = function() {
    return Me.apply(this, arguments), ht2.call(this, ot2[$2]), this;
  }, y2.insertPage = function(t2) {
    return this.addPage(), this.movePage($2, t2), this;
  }, y2.movePage = function(t2, e2) {
    var r2, n2;
    if (t2 > e2) {
      r2 = ot2[t2], n2 = Rt2[t2];
      for (var i3 = t2; i3 > e2; i3--) ot2[i3] = ot2[i3 - 1], Rt2[i3] = Rt2[i3 - 1];
      ot2[e2] = r2, Rt2[e2] = n2, this.setPage(e2);
    } else if (t2 < e2) {
      r2 = ot2[t2], n2 = Rt2[t2];
      for (var a2 = t2; a2 < e2; a2++) ot2[a2] = ot2[a2 + 1], Rt2[a2] = Rt2[a2 + 1];
      ot2[e2] = r2, Rt2[e2] = n2, this.setPage(e2);
    }
    return this;
  }, y2.deletePage = function() {
    return Be.apply(this, arguments), this;
  }, y2.__private__.text = y2.text = function(e2, r2, n2, i3, a2) {
    var o3, s3, c3, u3, h2, l2, f2, d3, p3, g3 = (i3 = i3 || {}).scope || this;
    if ("number" == typeof e2 && "number" == typeof r2 && ("string" == typeof n2 || Array.isArray(n2))) {
      var m3 = n2;
      n2 = r2, r2 = e2, e2 = m3;
    }
    if (arguments[3] instanceof Vt2 == false ? (c3 = arguments[4], u3 = arguments[5], "object" === _typeof(f2 = arguments[3]) && null !== f2 || ("string" == typeof c3 && (u3 = c3, c3 = null), "string" == typeof f2 && (u3 = f2, f2 = null), "number" == typeof f2 && (c3 = f2, f2 = null), i3 = { flags: f2, angle: c3, align: u3 })) : (q2("The transform parameter of text() with a Matrix value"), p3 = a2), isNaN(r2) || isNaN(n2) || null == e2) throw new Error("Invalid arguments passed to jsPDF.text");
    if (0 === e2.length) return g3;
    var v3 = "", y3 = false, w3 = "number" == typeof i3.lineHeightFactor ? i3.lineHeightFactor : lr, N3 = g3.internal.scaleFactor;
    function L3(t2) {
      return t2 = t2.split("	").join(Array(i3.TabLen || 9).join(" ")), Ce(t2, f2);
    }
    function A3(t2) {
      for (var e3, r3 = t2.concat(), n3 = [], i4 = r3.length; i4--; ) "string" == typeof (e3 = r3.shift()) ? n3.push(e3) : Array.isArray(t2) && (1 === e3.length || void 0 === e3[1] && void 0 === e3[2]) ? n3.push(e3[0]) : n3.push([e3[0], e3[1], e3[2]]);
      return n3;
    }
    function _3(t2, e3) {
      var r3;
      if ("string" == typeof t2) r3 = e3(t2)[0];
      else if (Array.isArray(t2)) {
        for (var n3, i4, a3 = t2.concat(), o4 = [], s4 = a3.length; s4--; ) "string" == typeof (n3 = a3.shift()) ? o4.push(e3(n3)[0]) : Array.isArray(n3) && "string" == typeof n3[0] && (i4 = e3(n3[0], n3[1], n3[2]), o4.push([i4[0], i4[1], i4[2]]));
        r3 = o4;
      }
      return r3;
    }
    var P3 = false, k3 = true;
    if ("string" == typeof e2) P3 = true;
    else if (Array.isArray(e2)) {
      var I2 = e2.concat();
      s3 = [];
      for (var F2, C2 = I2.length; C2--; ) ("string" != typeof (F2 = I2.shift()) || Array.isArray(F2) && "string" != typeof F2[0]) && (k3 = false);
      P3 = k3;
    }
    if (false === P3) throw new Error('Type of text must be string or Array. "' + e2 + '" is not recognized.');
    "string" == typeof e2 && (e2 = e2.match(/[\r?\n]/) ? e2.split(/\r\n|\r|\n/g) : [e2]);
    var j2 = gt2 / g3.internal.scaleFactor, B2 = j2 * (w3 - 1);
    switch (i3.baseline) {
      case "bottom":
        n2 -= B2;
        break;
      case "top":
        n2 += j2 - B2;
        break;
      case "hanging":
        n2 += j2 - 2 * B2;
        break;
      case "middle":
        n2 += j2 / 2 - B2;
    }
    if ((l2 = i3.maxWidth || 0) > 0 && ("string" == typeof e2 ? e2 = g3.splitTextToSize(e2, l2) : "[object Array]" === Object.prototype.toString.call(e2) && (e2 = e2.reduce(function(t2, e3) {
      return t2.concat(g3.splitTextToSize(e3, l2));
    }, []))), o3 = { text: e2, x: r2, y: n2, options: i3, mutex: { pdfEscape: Ce, activeFontKey: St, fonts: Ft2, activeFontSize: gt2 } }, Tt2.publish("preProcessText", o3), e2 = o3.text, c3 = (i3 = o3.options).angle, p3 instanceof Vt2 == false && c3 && "number" == typeof c3) {
      c3 *= Math.PI / 180, 0 === i3.rotationDirection && (c3 = -c3), S2 === x2.ADVANCED && (c3 = -c3);
      var M2 = Math.cos(c3), E2 = Math.sin(c3);
      p3 = new Vt2(M2, E2, -E2, M2, 0, 0);
    } else c3 && c3 instanceof Vt2 && (p3 = c3);
    S2 !== x2.ADVANCED || p3 || (p3 = Yt2), void 0 !== (h2 = i3.charSpace || _r) && (v3 += O2(U2(h2)) + " Tc\n", this.setCharSpace(this.getCharSpace() || 0)), void 0 !== (d3 = i3.horizontalScale) && (v3 += O2(100 * d3) + " Tz\n");
    i3.lang;
    var D3 = -1, R3 = void 0 !== i3.renderingMode ? i3.renderingMode : i3.stroke, T3 = g3.internal.getCurrentPageInfo().pageContext;
    switch (R3) {
      case 0:
      case false:
      case "fill":
        D3 = 0;
        break;
      case 1:
      case true:
      case "stroke":
        D3 = 1;
        break;
      case 2:
      case "fillThenStroke":
        D3 = 2;
        break;
      case 3:
      case "invisible":
        D3 = 3;
        break;
      case 4:
      case "fillAndAddForClipping":
        D3 = 4;
        break;
      case 5:
      case "strokeAndAddPathForClipping":
        D3 = 5;
        break;
      case 6:
      case "fillThenStrokeAndAddToPathForClipping":
        D3 = 6;
        break;
      case 7:
      case "addToPathForClipping":
        D3 = 7;
    }
    var z3 = void 0 !== T3.usedRenderingMode ? T3.usedRenderingMode : -1;
    -1 !== D3 ? v3 += D3 + " Tr\n" : -1 !== z3 && (v3 += "0 Tr\n"), -1 !== D3 && (T3.usedRenderingMode = D3), u3 = i3.align || "left";
    var H3, W3 = gt2 * w3, V3 = g3.internal.pageSize.getWidth(), G3 = Ft2[St];
    h2 = i3.charSpace || _r, l2 = i3.maxWidth || 0, f2 = Object.assign({ autoencode: true, noBOM: true }, i3.flags);
    var Y3 = [], J3 = function(t2) {
      return g3.getStringUnitWidth(t2, { font: G3, charSpace: h2, fontSize: gt2, doKerning: false }) * gt2 / N3;
    };
    if ("[object Array]" === Object.prototype.toString.call(e2)) {
      var X3;
      s3 = A3(e2), "left" !== u3 && (H3 = s3.map(J3));
      var K3, Z3 = 0;
      if ("right" === u3) {
        r2 -= H3[0], e2 = [], C2 = s3.length;
        for (var $3 = 0; $3 < C2; $3++) 0 === $3 ? (K3 = br(r2), X3 = yr(n2)) : (K3 = U2(Z3 - H3[$3]), X3 = -W3), e2.push([s3[$3], K3, X3]), Z3 = H3[$3];
      } else if ("center" === u3) {
        r2 -= H3[0] / 2, e2 = [], C2 = s3.length;
        for (var Q3 = 0; Q3 < C2; Q3++) 0 === Q3 ? (K3 = br(r2), X3 = yr(n2)) : (K3 = U2((Z3 - H3[Q3]) / 2), X3 = -W3), e2.push([s3[Q3], K3, X3]), Z3 = H3[Q3];
      } else if ("left" === u3) {
        e2 = [], C2 = s3.length;
        for (var tt3 = 0; tt3 < C2; tt3++) e2.push(s3[tt3]);
      } else if ("justify" === u3 && "Identity-H" === G3.encoding) {
        e2 = [], C2 = s3.length, l2 = 0 !== l2 ? l2 : V3;
        for (var et3 = 0, rt3 = 0; rt3 < C2; rt3++) if (X3 = 0 === rt3 ? yr(n2) : -W3, K3 = 0 === rt3 ? br(r2) : et3, rt3 < C2 - 1) {
          var nt3 = U2((l2 - H3[rt3]) / (s3[rt3].split(" ").length - 1)), it3 = s3[rt3].split(" ");
          e2.push([it3[0] + " ", K3, X3]), et3 = 0;
          for (var at3 = 1; at3 < it3.length; at3++) {
            var ot3 = (J3(it3[at3 - 1] + " " + it3[at3]) - J3(it3[at3])) * N3 + nt3;
            at3 == it3.length - 1 ? e2.push([it3[at3], ot3, 0]) : e2.push([it3[at3] + " ", ot3, 0]), et3 -= ot3;
          }
        } else e2.push([s3[rt3], K3, X3]);
        e2.push(["", et3, 0]);
      } else {
        if ("justify" !== u3) throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
        e2 = [], C2 = s3.length, l2 = 0 !== l2 ? l2 : V3;
        for (rt3 = 0; rt3 < C2; rt3++) X3 = 0 === rt3 ? yr(n2) : -W3, K3 = 0 === rt3 ? br(r2) : 0, rt3 < C2 - 1 ? Y3.push(O2(U2((l2 - H3[rt3]) / (s3[rt3].split(" ").length - 1)))) : Y3.push(0), e2.push([s3[rt3], K3, X3]);
      }
    }
    var st3 = "boolean" == typeof i3.R2L ? i3.R2L : bt2;
    true === st3 && (e2 = _3(e2, function(t2, e3, r3) {
      return [t2.split("").reverse().join(""), e3, r3];
    })), o3 = { text: e2, x: r2, y: n2, options: i3, mutex: { pdfEscape: Ce, activeFontKey: St, fonts: Ft2, activeFontSize: gt2 } }, Tt2.publish("postProcessText", o3), e2 = o3.text, y3 = o3.mutex.isHex || false;
    var ct3 = Ft2[St].encoding;
    "WinAnsiEncoding" !== ct3 && "StandardEncoding" !== ct3 || (e2 = _3(e2, function(t2, e3, r3) {
      return [L3(t2), e3, r3];
    })), s3 = A3(e2), e2 = [];
    for (var ut3, ht3, ft3, dt3 = 0, pt3 = 1, mt3 = Array.isArray(s3[0]) ? pt3 : dt3, vt3 = "", yt3 = function(t2, e3, r3) {
      var n3 = "";
      return r3 instanceof Vt2 ? (r3 = "number" == typeof i3.angle ? Gt2(r3, new Vt2(1, 0, 0, 1, t2, e3)) : Gt2(new Vt2(1, 0, 0, 1, t2, e3), r3), S2 === x2.ADVANCED && (r3 = Gt2(new Vt2(1, 0, 0, -1, 0, 0), r3)), n3 = r3.join(" ") + " Tm\n") : n3 = O2(t2) + " " + O2(e3) + " Td\n", n3;
    }, wt3 = 0; wt3 < s3.length; wt3++) {
      switch (vt3 = "", mt3) {
        case pt3:
          ft3 = (y3 ? "<" : "(") + s3[wt3][0] + (y3 ? ">" : ")"), ut3 = parseFloat(s3[wt3][1]), ht3 = parseFloat(s3[wt3][2]);
          break;
        case dt3:
          ft3 = (y3 ? "<" : "(") + s3[wt3] + (y3 ? ">" : ")"), ut3 = br(r2), ht3 = yr(n2);
      }
      void 0 !== Y3 && void 0 !== Y3[wt3] && (vt3 = Y3[wt3] + " Tw\n"), 0 === wt3 ? e2.push(vt3 + yt3(ut3, ht3, p3) + ft3) : mt3 === dt3 ? e2.push(vt3 + ft3) : mt3 === pt3 && e2.push(vt3 + yt3(ut3, ht3, p3) + ft3);
    }
    e2 = mt3 === dt3 ? e2.join(" Tj\nT* ") : e2.join(" Tj\n"), e2 += " Tj\n";
    var Nt3 = "BT\n/";
    return Nt3 += St + " " + gt2 + " Tf\n", Nt3 += O2(gt2 * w3) + " TL\n", Nt3 += xr + "\n", Nt3 += v3, Nt3 += e2, lt2(Nt3 += "ET"), b2[St] = true, g3;
  };
  var $e = y2.__private__.clip = y2.clip = function(t2) {
    return lt2("evenodd" === t2 ? "W*" : "W"), this;
  };
  y2.clipEvenOdd = function() {
    return $e("evenodd");
  }, y2.__private__.discardPath = y2.discardPath = function() {
    return lt2("n"), this;
  };
  var Qe = y2.__private__.isValidStyle = function(t2) {
    var e2 = false;
    return -1 !== [void 0, null, "S", "D", "F", "DF", "FD", "f", "f*", "B", "B*", "n"].indexOf(t2) && (e2 = true), e2;
  };
  y2.__private__.setDefaultPathOperation = y2.setDefaultPathOperation = function(t2) {
    return Qe(t2) && (g2 = t2), this;
  };
  var tr = y2.__private__.getStyle = y2.getStyle = function(t2) {
    var e2 = g2;
    switch (t2) {
      case "D":
      case "S":
        e2 = "S";
        break;
      case "F":
        e2 = "f";
        break;
      case "FD":
      case "DF":
        e2 = "B";
        break;
      case "f":
      case "f*":
      case "B":
      case "B*":
        e2 = t2;
    }
    return e2;
  }, er = y2.close = function() {
    return lt2("h"), this;
  };
  y2.stroke = function() {
    return lt2("S"), this;
  }, y2.fill = function(t2) {
    return rr("f", t2), this;
  }, y2.fillEvenOdd = function(t2) {
    return rr("f*", t2), this;
  }, y2.fillStroke = function(t2) {
    return rr("B", t2), this;
  }, y2.fillStrokeEvenOdd = function(t2) {
    return rr("B*", t2), this;
  };
  var rr = function(e2, r2) {
    "object" === _typeof(r2) ? ar(r2, e2) : lt2(e2);
  }, nr = function(t2) {
    null === t2 || S2 === x2.ADVANCED && void 0 === t2 || (t2 = tr(t2), lt2(t2));
  };
  function ir(t2, e2, r2, n2, i3) {
    var a2 = new M(e2 || this.boundingBox, r2 || this.xStep, n2 || this.yStep, this.gState, i3 || this.matrix);
    a2.stream = this.stream;
    var o3 = t2 + "$$" + this.cloneIndex++ + "$$";
    return Jt2(o3, a2), a2;
  }
  var ar = function(t2, e2) {
    var r2 = Bt2[t2.key], n2 = Ot2[r2];
    if (n2 instanceof B) lt2("q"), lt2(or(e2)), n2.gState && y2.setGState(n2.gState), lt2(t2.matrix.toString() + " cm"), lt2("/" + r2 + " sh"), lt2("Q");
    else if (n2 instanceof M) {
      var i3 = new Vt2(1, 0, 0, -1, 0, Rr());
      t2.matrix && (i3 = i3.multiply(t2.matrix || Yt2), r2 = ir.call(n2, t2.key, t2.boundingBox, t2.xStep, t2.yStep, i3).id), lt2("q"), lt2("/Pattern cs"), lt2("/" + r2 + " scn"), n2.gState && y2.setGState(n2.gState), lt2(e2), lt2("Q");
    }
  }, or = function(t2) {
    switch (t2) {
      case "f":
      case "F":
        return "W n";
      case "f*":
        return "W* n";
      case "B":
        return "W S";
      case "B*":
        return "W* S";
      case "S":
        return "W S";
      case "n":
        return "W n";
    }
  }, sr = y2.moveTo = function(t2, e2) {
    return lt2(O2(U2(t2)) + " " + O2(H2(e2)) + " m"), this;
  }, cr = y2.lineTo = function(t2, e2) {
    return lt2(O2(U2(t2)) + " " + O2(H2(e2)) + " l"), this;
  }, ur = y2.curveTo = function(t2, e2, r2, n2, i3, a2) {
    return lt2([O2(U2(t2)), O2(H2(e2)), O2(U2(r2)), O2(H2(n2)), O2(U2(i3)), O2(H2(a2)), "c"].join(" ")), this;
  };
  y2.__private__.line = y2.line = function(t2, e2, r2, n2, i3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n2) || !Qe(i3)) throw new Error("Invalid arguments passed to jsPDF.line");
    return S2 === x2.COMPAT ? this.lines([[r2 - t2, n2 - e2]], t2, e2, [1, 1], i3 || "S") : this.lines([[r2 - t2, n2 - e2]], t2, e2, [1, 1]).stroke();
  }, y2.__private__.lines = y2.lines = function(t2, e2, r2, n2, i3, a2) {
    var o3, s3, c3, u3, h2, l2, f2, d3, p3, g3, m3, v3;
    if ("number" == typeof t2 && (v3 = r2, r2 = e2, e2 = t2, t2 = v3), n2 = n2 || [1, 1], a2 = a2 || false, isNaN(e2) || isNaN(r2) || !Array.isArray(t2) || !Array.isArray(n2) || !Qe(i3) || "boolean" != typeof a2) throw new Error("Invalid arguments passed to jsPDF.lines");
    for (sr(e2, r2), o3 = n2[0], s3 = n2[1], u3 = t2.length, g3 = e2, m3 = r2, c3 = 0; c3 < u3; c3++) 2 === (h2 = t2[c3]).length ? (g3 = h2[0] * o3 + g3, m3 = h2[1] * s3 + m3, cr(g3, m3)) : (l2 = h2[0] * o3 + g3, f2 = h2[1] * s3 + m3, d3 = h2[2] * o3 + g3, p3 = h2[3] * s3 + m3, g3 = h2[4] * o3 + g3, m3 = h2[5] * s3 + m3, ur(l2, f2, d3, p3, g3, m3));
    return a2 && er(), nr(i3), this;
  }, y2.path = function(t2) {
    for (var e2 = 0; e2 < t2.length; e2++) {
      var r2 = t2[e2], n2 = r2.c;
      switch (r2.op) {
        case "m":
          sr(n2[0], n2[1]);
          break;
        case "l":
          cr(n2[0], n2[1]);
          break;
        case "c":
          ur.apply(this, n2);
          break;
        case "h":
          er();
      }
    }
    return this;
  }, y2.__private__.rect = y2.rect = function(t2, e2, r2, n2, i3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n2) || !Qe(i3)) throw new Error("Invalid arguments passed to jsPDF.rect");
    return S2 === x2.COMPAT && (n2 = -n2), lt2([O2(U2(t2)), O2(H2(e2)), O2(U2(r2)), O2(U2(n2)), "re"].join(" ")), nr(i3), this;
  }, y2.__private__.triangle = y2.triangle = function(t2, e2, r2, n2, i3, a2, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n2) || isNaN(i3) || isNaN(a2) || !Qe(o3)) throw new Error("Invalid arguments passed to jsPDF.triangle");
    return this.lines([[r2 - t2, n2 - e2], [i3 - r2, a2 - n2], [t2 - i3, e2 - a2]], t2, e2, [1, 1], o3, true), this;
  }, y2.__private__.roundedRect = y2.roundedRect = function(t2, e2, r2, n2, i3, a2, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n2) || isNaN(i3) || isNaN(a2) || !Qe(o3)) throw new Error("Invalid arguments passed to jsPDF.roundedRect");
    var s3 = 4 / 3 * (Math.SQRT2 - 1);
    return i3 = Math.min(i3, 0.5 * r2), a2 = Math.min(a2, 0.5 * n2), this.lines([[r2 - 2 * i3, 0], [i3 * s3, 0, i3, a2 - a2 * s3, i3, a2], [0, n2 - 2 * a2], [0, a2 * s3, -i3 * s3, a2, -i3, a2], [2 * i3 - r2, 0], [-i3 * s3, 0, -i3, -a2 * s3, -i3, -a2], [0, 2 * a2 - n2], [0, -a2 * s3, i3 * s3, -a2, i3, -a2]], t2 + i3, e2, [1, 1], o3, true), this;
  }, y2.__private__.ellipse = y2.ellipse = function(t2, e2, r2, n2, i3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n2) || !Qe(i3)) throw new Error("Invalid arguments passed to jsPDF.ellipse");
    var a2 = 4 / 3 * (Math.SQRT2 - 1) * r2, o3 = 4 / 3 * (Math.SQRT2 - 1) * n2;
    return sr(t2 + r2, e2), ur(t2 + r2, e2 - o3, t2 + a2, e2 - n2, t2, e2 - n2), ur(t2 - a2, e2 - n2, t2 - r2, e2 - o3, t2 - r2, e2), ur(t2 - r2, e2 + o3, t2 - a2, e2 + n2, t2, e2 + n2), ur(t2 + a2, e2 + n2, t2 + r2, e2 + o3, t2 + r2, e2), nr(i3), this;
  }, y2.__private__.circle = y2.circle = function(t2, e2, r2, n2) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || !Qe(n2)) throw new Error("Invalid arguments passed to jsPDF.circle");
    return this.ellipse(t2, e2, r2, r2, n2);
  }, y2.setFont = function(t2, e2, r2) {
    return r2 && (e2 = k2(e2, r2)), St = qe(t2, e2, { disableWarning: false }), this;
  };
  var hr = y2.__private__.getFont = y2.getFont = function() {
    return Ft2[qe.apply(y2, arguments)];
  };
  y2.__private__.getFontList = y2.getFontList = function() {
    var t2, e2, r2 = {};
    for (t2 in Ct2) if (Ct2.hasOwnProperty(t2)) for (e2 in r2[t2] = [], Ct2[t2]) Ct2[t2].hasOwnProperty(e2) && r2[t2].push(e2);
    return r2;
  }, y2.addFont = function(t2, e2, r2, n2, i3) {
    var a2 = ["StandardEncoding", "MacRomanEncoding", "Identity-H", "WinAnsiEncoding"];
    return arguments[3] && -1 !== a2.indexOf(arguments[3]) ? i3 = arguments[3] : arguments[3] && -1 == a2.indexOf(arguments[3]) && (r2 = k2(r2, n2)), i3 = i3 || "Identity-H", Pe.call(this, t2, e2, r2, i3);
  };
  var lr, fr = e.lineWidth || 0.200025, dr = y2.__private__.getLineWidth = y2.getLineWidth = function() {
    return fr;
  }, pr = y2.__private__.setLineWidth = y2.setLineWidth = function(t2) {
    return fr = t2, lt2(O2(U2(t2)) + " w"), this;
  };
  y2.__private__.setLineDash = E.API.setLineDash = E.API.setLineDashPattern = function(t2, e2) {
    if (t2 = t2 || [], e2 = e2 || 0, isNaN(e2) || !Array.isArray(t2)) throw new Error("Invalid arguments passed to jsPDF.setLineDash");
    return t2 = t2.map(function(t3) {
      return O2(U2(t3));
    }).join(" "), e2 = O2(U2(e2)), lt2("[" + t2 + "] " + e2 + " d"), this;
  };
  var gr = y2.__private__.getLineHeight = y2.getLineHeight = function() {
    return gt2 * lr;
  };
  y2.__private__.getLineHeight = y2.getLineHeight = function() {
    return gt2 * lr;
  };
  var mr = y2.__private__.setLineHeightFactor = y2.setLineHeightFactor = function(t2) {
    return "number" == typeof (t2 = t2 || 1.15) && (lr = t2), this;
  }, vr = y2.__private__.getLineHeightFactor = y2.getLineHeightFactor = function() {
    return lr;
  };
  mr(e.lineHeight);
  var br = y2.__private__.getHorizontalCoordinate = function(t2) {
    return U2(t2);
  }, yr = y2.__private__.getVerticalCoordinate = function(t2) {
    return S2 === x2.ADVANCED ? t2 : Rt2[$2].mediaBox.topRightY - Rt2[$2].mediaBox.bottomLeftY - U2(t2);
  }, wr = y2.__private__.getHorizontalCoordinateString = y2.getHorizontalCoordinateString = function(t2) {
    return O2(br(t2));
  }, Nr = y2.__private__.getVerticalCoordinateString = y2.getVerticalCoordinateString = function(t2) {
    return O2(yr(t2));
  }, Lr = e.strokeColor || "0 G";
  y2.__private__.getStrokeColor = y2.getDrawColor = function() {
    return ee2(Lr);
  }, y2.__private__.setStrokeColor = y2.setDrawColor = function(t2, e2, r2, n2) {
    return Lr = re2({ ch1: t2, ch2: e2, ch3: r2, ch4: n2, pdfColorType: "draw", precision: 2 }), lt2(Lr), this;
  };
  var Ar = e.fillColor || "0 g";
  y2.__private__.getFillColor = y2.getFillColor = function() {
    return ee2(Ar);
  }, y2.__private__.setFillColor = y2.setFillColor = function(t2, e2, r2, n2) {
    return Ar = re2({ ch1: t2, ch2: e2, ch3: r2, ch4: n2, pdfColorType: "fill", precision: 2 }), lt2(Ar), this;
  };
  var xr = e.textColor || "0 g", Sr = y2.__private__.getTextColor = y2.getTextColor = function() {
    return ee2(xr);
  };
  y2.__private__.setTextColor = y2.setTextColor = function(t2, e2, r2, n2) {
    return xr = re2({ ch1: t2, ch2: e2, ch3: r2, ch4: n2, pdfColorType: "text", precision: 3 }), this;
  };
  var _r = e.charSpace, Pr = y2.__private__.getCharSpace = y2.getCharSpace = function() {
    return parseFloat(_r || 0);
  };
  y2.__private__.setCharSpace = y2.setCharSpace = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return _r = t2, this;
  };
  var kr = 0;
  y2.CapJoinStyles = { 0: 0, butt: 0, but: 0, miter: 0, 1: 1, round: 1, rounded: 1, circle: 1, 2: 2, projecting: 2, project: 2, square: 2, bevel: 2 }, y2.__private__.setLineCap = y2.setLineCap = function(t2) {
    var e2 = y2.CapJoinStyles[t2];
    if (void 0 === e2) throw new Error("Line cap style of '" + t2 + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return kr = e2, lt2(e2 + " J"), this;
  };
  var Ir = 0;
  y2.__private__.setLineJoin = y2.setLineJoin = function(t2) {
    var e2 = y2.CapJoinStyles[t2];
    if (void 0 === e2) throw new Error("Line join style of '" + t2 + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return Ir = e2, lt2(e2 + " j"), this;
  }, y2.__private__.setLineMiterLimit = y2.__private__.setMiterLimit = y2.setLineMiterLimit = y2.setMiterLimit = function(t2) {
    if (t2 = t2 || 0, isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");
    return lt2(O2(U2(t2)) + " M"), this;
  }, y2.GState = j, y2.setGState = function(t2) {
    (t2 = "string" == typeof t2 ? Mt2[Et2[t2]] : Fr(null, t2)).equals(qt2) || (lt2("/" + t2.id + " gs"), qt2 = t2);
  };
  var Fr = function(t2, e2) {
    if (!t2 || !Et2[t2]) {
      var r2 = false;
      for (var n2 in Mt2) if (Mt2.hasOwnProperty(n2) && Mt2[n2].equals(e2)) {
        r2 = true;
        break;
      }
      if (r2) e2 = Mt2[n2];
      else {
        var i3 = "GS" + (Object.keys(Mt2).length + 1).toString(10);
        Mt2[i3] = e2, e2.id = i3;
      }
      return t2 && (Et2[t2] = e2.id), Tt2.publish("addGState", e2), e2;
    }
  };
  y2.addGState = function(t2, e2) {
    return Fr(t2, e2), this;
  }, y2.saveGraphicsState = function() {
    return lt2("q"), jt2.push({ key: St, size: gt2, color: xr }), this;
  }, y2.restoreGraphicsState = function() {
    lt2("Q");
    var t2 = jt2.pop();
    return St = t2.key, gt2 = t2.size, xr = t2.color, qt2 = null, this;
  }, y2.setCurrentTransformationMatrix = function(t2) {
    return lt2(t2.toString() + " cm"), this;
  }, y2.comment = function(t2) {
    return lt2("#" + t2), this;
  };
  var Cr = function(t2, e2) {
    var r2 = t2 || 0;
    Object.defineProperty(this, "x", { enumerable: true, get: function() {
      return r2;
    }, set: function(t3) {
      isNaN(t3) || (r2 = parseFloat(t3));
    } });
    var n2 = e2 || 0;
    Object.defineProperty(this, "y", { enumerable: true, get: function() {
      return n2;
    }, set: function(t3) {
      isNaN(t3) || (n2 = parseFloat(t3));
    } });
    var i3 = "pt";
    return Object.defineProperty(this, "type", { enumerable: true, get: function() {
      return i3;
    }, set: function(t3) {
      i3 = t3.toString();
    } }), this;
  }, jr = function(t2, e2, r2, n2) {
    Cr.call(this, t2, e2), this.type = "rect";
    var i3 = r2 || 0;
    Object.defineProperty(this, "w", { enumerable: true, get: function() {
      return i3;
    }, set: function(t3) {
      isNaN(t3) || (i3 = parseFloat(t3));
    } });
    var a2 = n2 || 0;
    return Object.defineProperty(this, "h", { enumerable: true, get: function() {
      return a2;
    }, set: function(t3) {
      isNaN(t3) || (a2 = parseFloat(t3));
    } }), this;
  }, Or = function() {
    this.page = Dt2, this.currentPage = $2, this.pages = ot2.slice(0), this.pagesContext = Rt2.slice(0), this.x = Pt2, this.y = kt2, this.matrix = It2, this.width = qr($2), this.height = Rr($2), this.outputDestination = ct2, this.id = "", this.objectNumber = -1;
  };
  Or.prototype.restore = function() {
    Dt2 = this.page, $2 = this.currentPage, Rt2 = this.pagesContext, ot2 = this.pages, Pt2 = this.x, kt2 = this.y, It2 = this.matrix, Dr($2, this.width), Tr($2, this.height), ct2 = this.outputDestination;
  };
  var Br = function(t2, e2, r2, n2, i3) {
    Wt2.push(new Or()), Dt2 = $2 = 0, ot2 = [], Pt2 = t2, kt2 = e2, It2 = i3, je([r2, n2]);
  }, Mr = function(t2) {
    if (Ht2[t2]) Wt2.pop().restore();
    else {
      var e2 = new Or(), r2 = "Xo" + (Object.keys(zt2).length + 1).toString(10);
      e2.id = r2, Ht2[t2] = r2, zt2[r2] = e2, Tt2.publish("addFormObject", e2), Wt2.pop().restore();
    }
  };
  for (var Er in y2.beginFormObject = function(t2, e2, r2, n2, i3) {
    return Br(t2, e2, r2, n2, i3), this;
  }, y2.endFormObject = function(t2) {
    return Mr(t2), this;
  }, y2.doFormObject = function(t2, e2) {
    var r2 = zt2[Ht2[t2]];
    return lt2("q"), lt2(e2.toString() + " cm"), lt2("/" + r2.id + " Do"), lt2("Q"), this;
  }, y2.getFormObject = function(t2) {
    var e2 = zt2[Ht2[t2]];
    return { x: e2.x, y: e2.y, width: e2.width, height: e2.height, matrix: e2.matrix };
  }, y2.save = function(t2, e2) {
    return t2 = t2 || "generated.pdf", (e2 = e2 || {}).returnPromise = e2.returnPromise || false, false === e2.returnPromise ? (l(We(He()), t2), "function" == typeof l.unload && n.setTimeout && setTimeout(l.unload, 911), this) : new Promise(function(e3, r2) {
      try {
        var i3 = l(We(He()), t2);
        "function" == typeof l.unload && n.setTimeout && setTimeout(l.unload, 911), e3(i3);
      } catch (t3) {
        r2(t3.message);
      }
    });
  }, E.API) E.API.hasOwnProperty(Er) && ("events" === Er && E.API.events.length ? function(t2, e2) {
    var r2, n2, i3;
    for (i3 = e2.length - 1; -1 !== i3; i3--) r2 = e2[i3][0], n2 = e2[i3][1], t2.subscribe.apply(t2, [r2].concat("function" == typeof n2 ? [n2] : n2));
  }(Tt2, E.API.events) : y2[Er] = E.API[Er]);
  var qr = y2.getPageWidth = function(t2) {
    return (Rt2[t2 = t2 || $2].mediaBox.topRightX - Rt2[t2].mediaBox.bottomLeftX) / _t2;
  }, Dr = y2.setPageWidth = function(t2, e2) {
    Rt2[t2].mediaBox.topRightX = e2 * _t2 + Rt2[t2].mediaBox.bottomLeftX;
  }, Rr = y2.getPageHeight = function(t2) {
    return (Rt2[t2 = t2 || $2].mediaBox.topRightY - Rt2[t2].mediaBox.bottomLeftY) / _t2;
  }, Tr = y2.setPageHeight = function(t2, e2) {
    Rt2[t2].mediaBox.topRightY = e2 * _t2 + Rt2[t2].mediaBox.bottomLeftY;
  };
  return y2.internal = { pdfEscape: Ce, getStyle: tr, getFont: hr, getFontSize: vt2, getCharSpace: Pr, getTextColor: Sr, getLineHeight: gr, getLineHeightFactor: vr, getLineWidth: dr, write: ft2, getHorizontalCoordinate: br, getVerticalCoordinate: yr, getCoordinateString: wr, getVerticalCoordinateString: Nr, collections: {}, newObject: Xt2, newAdditionalObject: $t2, newObjectDeferred: Kt2, newObjectDeferredBegin: Zt2, getFilters: ne2, putStream: ie2, events: Tt2, scaleFactor: _t2, pageSize: { getWidth: function() {
    return qr($2);
  }, setWidth: function(t2) {
    Dr($2, t2);
  }, getHeight: function() {
    return Rr($2);
  }, setHeight: function(t2) {
    Tr($2, t2);
  } }, encryptionOptions: m2, encryption: Ye, getEncryptor: Je, output: Ve, getNumberOfPages: Ee, pages: ot2, out: lt2, f2: R2, f3: T2, getPageInfo: Xe, getPageInfoByObjId: Ke, getCurrentPageInfo: Ze, getPDFVersion: N2, Point: Cr, Rectangle: jr, Matrix: Vt2, hasHotfix: Ge }, Object.defineProperty(y2.internal.pageSize, "width", { get: function() {
    return qr($2);
  }, set: function(t2) {
    Dr($2, t2);
  }, enumerable: true, configurable: true }), Object.defineProperty(y2.internal.pageSize, "height", { get: function() {
    return Rr($2);
  }, set: function(t2) {
    Tr($2, t2);
  }, enumerable: true, configurable: true }), ke.call(y2, pt2), St = "F1", Oe(s2, i2), Tt2.publish("initialized"), y2;
}
I.prototype.lsbFirstWord = function(t2) {
  return String.fromCharCode(t2 >> 0 & 255, t2 >> 8 & 255, t2 >> 16 & 255, t2 >> 24 & 255);
}, I.prototype.toHexString = function(t2) {
  return t2.split("").map(function(t3) {
    return ("0" + (255 & t3.charCodeAt(0)).toString(16)).slice(-2);
  }).join("");
}, I.prototype.hexToBytes = function(t2) {
  for (var e = [], r = 0; r < t2.length; r += 2) e.push(String.fromCharCode(parseInt(t2.substr(r, 2), 16)));
  return e.join("");
}, I.prototype.processOwnerPassword = function(t2, e) {
  return P(x(e).substr(0, 5), t2);
}, I.prototype.encryptor = function(t2, e) {
  var r = x(this.encryptionKey + String.fromCharCode(255 & t2, t2 >> 8 & 255, t2 >> 16 & 255, 255 & e, e >> 8 & 255)).substr(0, 10);
  return function(t3) {
    return P(r, t3);
  };
}, j.prototype.equals = function(e) {
  var r, n2 = "id,objectNumber,equals";
  if (!e || _typeof(e) !== _typeof(this)) return false;
  var i2 = 0;
  for (r in this) if (!(n2.indexOf(r) >= 0)) {
    if (this.hasOwnProperty(r) && !e.hasOwnProperty(r)) return false;
    if (this[r] !== e[r]) return false;
    i2++;
  }
  for (r in e) e.hasOwnProperty(r) && n2.indexOf(r) < 0 && i2--;
  return 0 === i2;
}, E.API = { events: [] }, E.version = "2.5.2";
var q = E.API, D = 1, R = function(t2) {
  return t2.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}, T = function(t2) {
  return t2.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}, U = function(t2) {
  return t2.toFixed(2);
}, z = function(t2) {
  return t2.toFixed(5);
};
q.__acroform__ = {};
var H = function(t2, e) {
  t2.prototype = Object.create(e.prototype), t2.prototype.constructor = t2;
}, W = function(t2) {
  return t2 * D;
}, V = function(t2) {
  var e = new ut(), r = At.internal.getHeight(t2) || 0, n2 = At.internal.getWidth(t2) || 0;
  return e.BBox = [0, 0, Number(U(n2)), Number(U(r))], e;
}, G = q.__acroform__.setBit = function(t2, e) {
  if (t2 = t2 || 0, e = e || 0, isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");
  return t2 |= 1 << e;
}, Y = q.__acroform__.clearBit = function(t2, e) {
  if (t2 = t2 || 0, e = e || 0, isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");
  return t2 &= ~(1 << e);
}, J = q.__acroform__.getBit = function(t2, e) {
  if (isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");
  return 0 == (t2 & 1 << e) ? 0 : 1;
}, X = q.__acroform__.getBitForPdf = function(t2, e) {
  if (isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");
  return J(t2, e - 1);
}, K = q.__acroform__.setBitForPdf = function(t2, e) {
  if (isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");
  return G(t2, e - 1);
}, Z = q.__acroform__.clearBitForPdf = function(t2, e) {
  if (isNaN(t2) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");
  return Y(t2, e - 1);
}, $ = q.__acroform__.calculateCoordinates = function(t2, e) {
  var r = e.internal.getHorizontalCoordinate, n2 = e.internal.getVerticalCoordinate, i2 = t2[0], a2 = t2[1], o2 = t2[2], s2 = t2[3], c2 = {};
  return c2.lowerLeft_X = r(i2) || 0, c2.lowerLeft_Y = n2(a2 + s2) || 0, c2.upperRight_X = r(i2 + o2) || 0, c2.upperRight_Y = n2(a2) || 0, [Number(U(c2.lowerLeft_X)), Number(U(c2.lowerLeft_Y)), Number(U(c2.upperRight_X)), Number(U(c2.upperRight_Y))];
}, Q = function(t2) {
  if (t2.appearanceStreamContent) return t2.appearanceStreamContent;
  if (t2.V || t2.DV) {
    var e = [], r = t2._V || t2.DV, n2 = tt(t2, r), i2 = t2.scope.internal.getFont(t2.fontName, t2.fontStyle).id;
    e.push("/Tx BMC"), e.push("q"), e.push("BT"), e.push(t2.scope.__private__.encodeColorString(t2.color)), e.push("/" + i2 + " " + U(n2.fontSize) + " Tf"), e.push("1 0 0 1 0 0 Tm"), e.push(n2.text), e.push("ET"), e.push("Q"), e.push("EMC");
    var a2 = V(t2);
    return a2.scope = t2.scope, a2.stream = e.join("\n"), a2;
  }
}, tt = function(t2, e) {
  var r = 0 === t2.fontSize ? t2.maxFontSize : t2.fontSize, n2 = { text: "", fontSize: "" }, i2 = (e = ")" == (e = "(" == e.substr(0, 1) ? e.substr(1) : e).substr(e.length - 1) ? e.substr(0, e.length - 1) : e).split(" ");
  i2 = t2.multiline ? i2.map(function(t3) {
    return t3.split("\n");
  }) : i2.map(function(t3) {
    return [t3];
  });
  var a2 = r, o2 = At.internal.getHeight(t2) || 0;
  o2 = o2 < 0 ? -o2 : o2;
  var s2 = At.internal.getWidth(t2) || 0;
  s2 = s2 < 0 ? -s2 : s2;
  var c2 = function(e2, r2, n3) {
    if (e2 + 1 < i2.length) {
      var a3 = r2 + " " + i2[e2 + 1][0];
      return et(a3, t2, n3).width <= s2 - 4;
    }
    return false;
  };
  a2++;
  t: for (; a2 > 0; ) {
    e = "", a2--;
    var u2, h2, l2 = et("3", t2, a2).height, f2 = t2.multiline ? o2 - a2 : (o2 - l2) / 2, d2 = f2 += 2, p2 = 0, g2 = 0, m2 = 0;
    if (a2 <= 0) {
      e = "(...) Tj\n", e += "% Width of Text: " + et(e, t2, a2 = 12).width + ", FieldWidth:" + s2 + "\n";
      break;
    }
    for (var v2 = "", b2 = 0, y2 = 0; y2 < i2.length; y2++) if (i2.hasOwnProperty(y2)) {
      var w2 = false;
      if (1 !== i2[y2].length && m2 !== i2[y2].length - 1) {
        if ((l2 + 2) * (b2 + 2) + 2 > o2) continue t;
        v2 += i2[y2][m2], w2 = true, g2 = y2, y2--;
      } else {
        v2 = " " == (v2 += i2[y2][m2] + " ").substr(v2.length - 1) ? v2.substr(0, v2.length - 1) : v2;
        var N2 = parseInt(y2), L2 = c2(N2, v2, a2), A2 = y2 >= i2.length - 1;
        if (L2 && !A2) {
          v2 += " ", m2 = 0;
          continue;
        }
        if (L2 || A2) {
          if (A2) g2 = N2;
          else if (t2.multiline && (l2 + 2) * (b2 + 2) + 2 > o2) continue t;
        } else {
          if (!t2.multiline) continue t;
          if ((l2 + 2) * (b2 + 2) + 2 > o2) continue t;
          g2 = N2;
        }
      }
      for (var x2 = "", S2 = p2; S2 <= g2; S2++) {
        var _2 = i2[S2];
        if (t2.multiline) {
          if (S2 === g2) {
            x2 += _2[m2] + " ", m2 = (m2 + 1) % _2.length;
            continue;
          }
          if (S2 === p2) {
            x2 += _2[_2.length - 1] + " ";
            continue;
          }
        }
        x2 += _2[0] + " ";
      }
      switch (x2 = " " == x2.substr(x2.length - 1) ? x2.substr(0, x2.length - 1) : x2, h2 = et(x2, t2, a2).width, t2.textAlign) {
        case "right":
          u2 = s2 - h2 - 2;
          break;
        case "center":
          u2 = (s2 - h2) / 2;
          break;
        case "left":
        default:
          u2 = 2;
      }
      e += U(u2) + " " + U(d2) + " Td\n", e += "(" + R(x2) + ") Tj\n", e += -U(u2) + " 0 Td\n", d2 = -(a2 + 2), h2 = 0, p2 = w2 ? g2 : g2 + 1, b2++, v2 = "";
    }
    break;
  }
  return n2.text = e, n2.fontSize = a2, n2;
}, et = function(t2, e, r) {
  var n2 = e.scope.internal.getFont(e.fontName, e.fontStyle), i2 = e.scope.getStringUnitWidth(t2, { font: n2, fontSize: parseFloat(r), charSpace: 0 }) * parseFloat(r);
  return { height: e.scope.getStringUnitWidth("3", { font: n2, fontSize: parseFloat(r), charSpace: 0 }) * parseFloat(r) * 1.5, width: i2 };
}, rt = { fields: [], xForms: [], acroFormDictionaryRoot: null, printedOut: false, internal: null, isInitialized: false }, nt = function(t2, e) {
  var r = { type: "reference", object: t2 };
  void 0 === e.internal.getPageInfo(t2.page).pageContext.annotations.find(function(t3) {
    return t3.type === r.type && t3.object === r.object;
  }) && e.internal.getPageInfo(t2.page).pageContext.annotations.push(r);
}, it = function(e, r) {
  for (var n2 in e) if (e.hasOwnProperty(n2)) {
    var i2 = n2, a2 = e[n2];
    r.internal.newObjectDeferredBegin(a2.objId, true), "object" === _typeof(a2) && "function" == typeof a2.putStream && a2.putStream(), delete e[i2];
  }
}, at = function(e, r) {
  if (r.scope = e, void 0 !== e.internal && (void 0 === e.internal.acroformPlugin || false === e.internal.acroformPlugin.isInitialized)) {
    if (lt.FieldNum = 0, e.internal.acroformPlugin = JSON.parse(JSON.stringify(rt)), e.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("Exception while creating AcroformDictionary");
    D = e.internal.scaleFactor, e.internal.acroformPlugin.acroFormDictionaryRoot = new ht(), e.internal.acroformPlugin.acroFormDictionaryRoot.scope = e, e.internal.acroformPlugin.acroFormDictionaryRoot._eventID = e.internal.events.subscribe("postPutResources", function() {
      !function(t2) {
        t2.internal.events.unsubscribe(t2.internal.acroformPlugin.acroFormDictionaryRoot._eventID), delete t2.internal.acroformPlugin.acroFormDictionaryRoot._eventID, t2.internal.acroformPlugin.printedOut = true;
      }(e);
    }), e.internal.events.subscribe("buildDocument", function() {
      !function(t2) {
        t2.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
        var e2 = t2.internal.acroformPlugin.acroFormDictionaryRoot.Fields;
        for (var r2 in e2) if (e2.hasOwnProperty(r2)) {
          var n2 = e2[r2];
          n2.objId = void 0, n2.hasAnnotation && nt(n2, t2);
        }
      }(e);
    }), e.internal.events.subscribe("putCatalog", function() {
      !function(t2) {
        if (void 0 === t2.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("putCatalogCallback: Root missing.");
        t2.internal.write("/AcroForm " + t2.internal.acroformPlugin.acroFormDictionaryRoot.objId + " 0 R");
      }(e);
    }), e.internal.events.subscribe("postPutPages", function(r2) {
      !function(e2, r3) {
        var n2 = !e2;
        for (var i2 in e2 || (r3.internal.newObjectDeferredBegin(r3.internal.acroformPlugin.acroFormDictionaryRoot.objId, true), r3.internal.acroformPlugin.acroFormDictionaryRoot.putStream()), e2 = e2 || r3.internal.acroformPlugin.acroFormDictionaryRoot.Kids) if (e2.hasOwnProperty(i2)) {
          var a2 = e2[i2], o2 = [], s2 = a2.Rect;
          if (a2.Rect && (a2.Rect = $(a2.Rect, r3)), r3.internal.newObjectDeferredBegin(a2.objId, true), a2.DA = At.createDefaultAppearanceStream(a2), "object" === _typeof(a2) && "function" == typeof a2.getKeyValueListForStream && (o2 = a2.getKeyValueListForStream()), a2.Rect = s2, a2.hasAppearanceStream && !a2.appearanceStreamContent) {
            var c2 = Q(a2);
            o2.push({ key: "AP", value: "<</N " + c2 + ">>" }), r3.internal.acroformPlugin.xForms.push(c2);
          }
          if (a2.appearanceStreamContent) {
            var u2 = "";
            for (var h2 in a2.appearanceStreamContent) if (a2.appearanceStreamContent.hasOwnProperty(h2)) {
              var l2 = a2.appearanceStreamContent[h2];
              if (u2 += "/" + h2 + " ", u2 += "<<", Object.keys(l2).length >= 1 || Array.isArray(l2)) {
                for (var i2 in l2) if (l2.hasOwnProperty(i2)) {
                  var f2 = l2[i2];
                  "function" == typeof f2 && (f2 = f2.call(r3, a2)), u2 += "/" + i2 + " " + f2 + " ", r3.internal.acroformPlugin.xForms.indexOf(f2) >= 0 || r3.internal.acroformPlugin.xForms.push(f2);
                }
              } else "function" == typeof (f2 = l2) && (f2 = f2.call(r3, a2)), u2 += "/" + i2 + " " + f2, r3.internal.acroformPlugin.xForms.indexOf(f2) >= 0 || r3.internal.acroformPlugin.xForms.push(f2);
              u2 += ">>";
            }
            o2.push({ key: "AP", value: "<<\n" + u2 + ">>" });
          }
          r3.internal.putStream({ additionalKeyValues: o2, objectId: a2.objId }), r3.internal.out("endobj");
        }
        n2 && it(r3.internal.acroformPlugin.xForms, r3);
      }(r2, e);
    }), e.internal.acroformPlugin.isInitialized = true;
  }
}, ot = q.__acroform__.arrayToPdfArray = function(e, r, n2) {
  var i2 = function(t2) {
    return t2;
  };
  if (Array.isArray(e)) {
    for (var a2 = "[", o2 = 0; o2 < e.length; o2++) switch (0 !== o2 && (a2 += " "), _typeof(e[o2])) {
      case "boolean":
      case "number":
      case "object":
        a2 += e[o2].toString();
        break;
      case "string":
        "/" !== e[o2].substr(0, 1) ? (void 0 !== r && n2 && (i2 = n2.internal.getEncryptor(r)), a2 += "(" + R(i2(e[o2].toString())) + ")") : a2 += e[o2].toString();
    }
    return a2 += "]";
  }
  throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray");
};
var st = function(t2, e, r) {
  var n2 = function(t3) {
    return t3;
  };
  return void 0 !== e && r && (n2 = r.internal.getEncryptor(e)), (t2 = t2 || "").toString(), t2 = "(" + R(n2(t2)) + ")";
}, ct = function() {
  this._objId = void 0, this._scope = void 0, Object.defineProperty(this, "objId", { get: function() {
    if (void 0 === this._objId) {
      if (void 0 === this.scope) return;
      this._objId = this.scope.internal.newObjectDeferred();
    }
    return this._objId;
  }, set: function(t2) {
    this._objId = t2;
  } }), Object.defineProperty(this, "scope", { value: this._scope, writable: true });
};
ct.prototype.toString = function() {
  return this.objId + " 0 R";
}, ct.prototype.putStream = function() {
  var t2 = this.getKeyValueListForStream();
  this.scope.internal.putStream({ data: this.stream, additionalKeyValues: t2, objectId: this.objId }), this.scope.internal.out("endobj");
}, ct.prototype.getKeyValueListForStream = function() {
  var t2 = [], e = Object.getOwnPropertyNames(this).filter(function(t3) {
    return "content" != t3 && "appearanceStreamContent" != t3 && "scope" != t3 && "objId" != t3 && "_" != t3.substring(0, 1);
  });
  for (var r in e) if (false === Object.getOwnPropertyDescriptor(this, e[r]).configurable) {
    var n2 = e[r], i2 = this[n2];
    i2 && (Array.isArray(i2) ? t2.push({ key: n2, value: ot(i2, this.objId, this.scope) }) : i2 instanceof ct ? (i2.scope = this.scope, t2.push({ key: n2, value: i2.objId + " 0 R" })) : "function" != typeof i2 && t2.push({ key: n2, value: i2 }));
  }
  return t2;
};
var ut = function() {
  ct.call(this), Object.defineProperty(this, "Type", { value: "/XObject", configurable: false, writable: true }), Object.defineProperty(this, "Subtype", { value: "/Form", configurable: false, writable: true }), Object.defineProperty(this, "FormType", { value: 1, configurable: false, writable: true });
  var t2, e = [];
  Object.defineProperty(this, "BBox", { configurable: false, get: function() {
    return e;
  }, set: function(t3) {
    e = t3;
  } }), Object.defineProperty(this, "Resources", { value: "2 0 R", configurable: false, writable: true }), Object.defineProperty(this, "stream", { enumerable: false, configurable: true, set: function(e2) {
    t2 = e2.trim();
  }, get: function() {
    return t2 || null;
  } });
};
H(ut, ct);
var ht = function() {
  ct.call(this);
  var t2, e = [];
  Object.defineProperty(this, "Kids", { enumerable: false, configurable: true, get: function() {
    return e.length > 0 ? e : void 0;
  } }), Object.defineProperty(this, "Fields", { enumerable: false, configurable: false, get: function() {
    return e;
  } }), Object.defineProperty(this, "DA", { enumerable: false, configurable: false, get: function() {
    if (t2) {
      var e2 = function(t3) {
        return t3;
      };
      return this.scope && (e2 = this.scope.internal.getEncryptor(this.objId)), "(" + R(e2(t2)) + ")";
    }
  }, set: function(e2) {
    t2 = e2;
  } });
};
H(ht, ct);
var lt = function t() {
  ct.call(this);
  var e = 4;
  Object.defineProperty(this, "F", { enumerable: false, configurable: false, get: function() {
    return e;
  }, set: function(t2) {
    if (isNaN(t2)) throw new Error('Invalid value "' + t2 + '" for attribute F supplied.');
    e = t2;
  } }), Object.defineProperty(this, "showWhenPrinted", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(e, 3));
  }, set: function(t2) {
    true === Boolean(t2) ? this.F = K(e, 3) : this.F = Z(e, 3);
  } });
  var r = 0;
  Object.defineProperty(this, "Ff", { enumerable: false, configurable: false, get: function() {
    return r;
  }, set: function(t2) {
    if (isNaN(t2)) throw new Error('Invalid value "' + t2 + '" for attribute Ff supplied.');
    r = t2;
  } });
  var n2 = [];
  Object.defineProperty(this, "Rect", { enumerable: false, configurable: false, get: function() {
    if (0 !== n2.length) return n2;
  }, set: function(t2) {
    n2 = void 0 !== t2 ? t2 : [];
  } }), Object.defineProperty(this, "x", { enumerable: true, configurable: true, get: function() {
    return !n2 || isNaN(n2[0]) ? 0 : n2[0];
  }, set: function(t2) {
    n2[0] = t2;
  } }), Object.defineProperty(this, "y", { enumerable: true, configurable: true, get: function() {
    return !n2 || isNaN(n2[1]) ? 0 : n2[1];
  }, set: function(t2) {
    n2[1] = t2;
  } }), Object.defineProperty(this, "width", { enumerable: true, configurable: true, get: function() {
    return !n2 || isNaN(n2[2]) ? 0 : n2[2];
  }, set: function(t2) {
    n2[2] = t2;
  } }), Object.defineProperty(this, "height", { enumerable: true, configurable: true, get: function() {
    return !n2 || isNaN(n2[3]) ? 0 : n2[3];
  }, set: function(t2) {
    n2[3] = t2;
  } });
  var i2 = "";
  Object.defineProperty(this, "FT", { enumerable: true, configurable: false, get: function() {
    return i2;
  }, set: function(t2) {
    switch (t2) {
      case "/Btn":
      case "/Tx":
      case "/Ch":
      case "/Sig":
        i2 = t2;
        break;
      default:
        throw new Error('Invalid value "' + t2 + '" for attribute FT supplied.');
    }
  } });
  var a2 = null;
  Object.defineProperty(this, "T", { enumerable: true, configurable: false, get: function() {
    if (!a2 || a2.length < 1) {
      if (this instanceof yt) return;
      a2 = "FieldObject" + t.FieldNum++;
    }
    var e2 = function(t2) {
      return t2;
    };
    return this.scope && (e2 = this.scope.internal.getEncryptor(this.objId)), "(" + R(e2(a2)) + ")";
  }, set: function(t2) {
    a2 = t2.toString();
  } }), Object.defineProperty(this, "fieldName", { configurable: true, enumerable: true, get: function() {
    return a2;
  }, set: function(t2) {
    a2 = t2;
  } });
  var o2 = "helvetica";
  Object.defineProperty(this, "fontName", { enumerable: true, configurable: true, get: function() {
    return o2;
  }, set: function(t2) {
    o2 = t2;
  } });
  var s2 = "normal";
  Object.defineProperty(this, "fontStyle", { enumerable: true, configurable: true, get: function() {
    return s2;
  }, set: function(t2) {
    s2 = t2;
  } });
  var c2 = 0;
  Object.defineProperty(this, "fontSize", { enumerable: true, configurable: true, get: function() {
    return c2;
  }, set: function(t2) {
    c2 = t2;
  } });
  var u2 = void 0;
  Object.defineProperty(this, "maxFontSize", { enumerable: true, configurable: true, get: function() {
    return void 0 === u2 ? 50 / D : u2;
  }, set: function(t2) {
    u2 = t2;
  } });
  var h2 = "black";
  Object.defineProperty(this, "color", { enumerable: true, configurable: true, get: function() {
    return h2;
  }, set: function(t2) {
    h2 = t2;
  } });
  var l2 = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", { enumerable: true, configurable: false, get: function() {
    if (!(!l2 || this instanceof yt || this instanceof Nt)) return st(l2, this.objId, this.scope);
  }, set: function(t2) {
    t2 = t2.toString(), l2 = t2;
  } });
  var f2 = null;
  Object.defineProperty(this, "DV", { enumerable: false, configurable: false, get: function() {
    if (f2) return this instanceof mt == false ? st(f2, this.objId, this.scope) : f2;
  }, set: function(t2) {
    t2 = t2.toString(), f2 = this instanceof mt == false ? "(" === t2.substr(0, 1) ? T(t2.substr(1, t2.length - 2)) : T(t2) : t2;
  } }), Object.defineProperty(this, "defaultValue", { enumerable: true, configurable: true, get: function() {
    return this instanceof mt == true ? T(f2.substr(1, f2.length - 1)) : f2;
  }, set: function(t2) {
    t2 = t2.toString(), f2 = this instanceof mt == true ? "/" + t2 : t2;
  } });
  var d2 = null;
  Object.defineProperty(this, "_V", { enumerable: false, configurable: false, get: function() {
    if (d2) return d2;
  }, set: function(t2) {
    this.V = t2;
  } }), Object.defineProperty(this, "V", { enumerable: false, configurable: false, get: function() {
    if (d2) return this instanceof mt == false ? st(d2, this.objId, this.scope) : d2;
  }, set: function(t2) {
    t2 = t2.toString(), d2 = this instanceof mt == false ? "(" === t2.substr(0, 1) ? T(t2.substr(1, t2.length - 2)) : T(t2) : t2;
  } }), Object.defineProperty(this, "value", { enumerable: true, configurable: true, get: function() {
    return this instanceof mt == true ? T(d2.substr(1, d2.length - 1)) : d2;
  }, set: function(t2) {
    t2 = t2.toString(), d2 = this instanceof mt == true ? "/" + t2 : t2;
  } }), Object.defineProperty(this, "hasAnnotation", { enumerable: true, configurable: true, get: function() {
    return this.Rect;
  } }), Object.defineProperty(this, "Type", { enumerable: true, configurable: false, get: function() {
    return this.hasAnnotation ? "/Annot" : null;
  } }), Object.defineProperty(this, "Subtype", { enumerable: true, configurable: false, get: function() {
    return this.hasAnnotation ? "/Widget" : null;
  } });
  var p2, g2 = false;
  Object.defineProperty(this, "hasAppearanceStream", { enumerable: true, configurable: true, get: function() {
    return g2;
  }, set: function(t2) {
    t2 = Boolean(t2), g2 = t2;
  } }), Object.defineProperty(this, "page", { enumerable: true, configurable: true, get: function() {
    if (p2) return p2;
  }, set: function(t2) {
    p2 = t2;
  } }), Object.defineProperty(this, "readOnly", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 1));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 1) : this.Ff = Z(this.Ff, 1);
  } }), Object.defineProperty(this, "required", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 2));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 2) : this.Ff = Z(this.Ff, 2);
  } }), Object.defineProperty(this, "noExport", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 3));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 3) : this.Ff = Z(this.Ff, 3);
  } });
  var m2 = null;
  Object.defineProperty(this, "Q", { enumerable: true, configurable: false, get: function() {
    if (null !== m2) return m2;
  }, set: function(t2) {
    if (-1 === [0, 1, 2].indexOf(t2)) throw new Error('Invalid value "' + t2 + '" for attribute Q supplied.');
    m2 = t2;
  } }), Object.defineProperty(this, "textAlign", { get: function() {
    var t2;
    switch (m2) {
      case 0:
      default:
        t2 = "left";
        break;
      case 1:
        t2 = "center";
        break;
      case 2:
        t2 = "right";
    }
    return t2;
  }, configurable: true, enumerable: true, set: function(t2) {
    switch (t2) {
      case "right":
      case 2:
        m2 = 2;
        break;
      case "center":
      case 1:
        m2 = 1;
        break;
      case "left":
      case 0:
      default:
        m2 = 0;
    }
  } });
};
H(lt, ct);
var ft = function() {
  lt.call(this), this.FT = "/Ch", this.V = "()", this.fontName = "zapfdingbats";
  var t2 = 0;
  Object.defineProperty(this, "TI", { enumerable: true, configurable: false, get: function() {
    return t2;
  }, set: function(e2) {
    t2 = e2;
  } }), Object.defineProperty(this, "topIndex", { enumerable: true, configurable: true, get: function() {
    return t2;
  }, set: function(e2) {
    t2 = e2;
  } });
  var e = [];
  Object.defineProperty(this, "Opt", { enumerable: true, configurable: false, get: function() {
    return ot(e, this.objId, this.scope);
  }, set: function(t3) {
    var r, n2;
    n2 = [], "string" == typeof (r = t3) && (n2 = function(t4, e2, r2) {
      r2 || (r2 = 1);
      for (var n3, i2 = []; n3 = e2.exec(t4); ) i2.push(n3[r2]);
      return i2;
    }(r, /\((.*?)\)/g)), e = n2;
  } }), this.getOptions = function() {
    return e;
  }, this.setOptions = function(t3) {
    e = t3, this.sort && e.sort();
  }, this.addOption = function(t3) {
    t3 = (t3 = t3 || "").toString(), e.push(t3), this.sort && e.sort();
  }, this.removeOption = function(t3, r) {
    for (r = r || false, t3 = (t3 = t3 || "").toString(); -1 !== e.indexOf(t3) && (e.splice(e.indexOf(t3), 1), false !== r); ) ;
  }, Object.defineProperty(this, "combo", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 18));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 18) : this.Ff = Z(this.Ff, 18);
  } }), Object.defineProperty(this, "edit", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 19));
  }, set: function(t3) {
    true === this.combo && (true === Boolean(t3) ? this.Ff = K(this.Ff, 19) : this.Ff = Z(this.Ff, 19));
  } }), Object.defineProperty(this, "sort", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 20));
  }, set: function(t3) {
    true === Boolean(t3) ? (this.Ff = K(this.Ff, 20), e.sort()) : this.Ff = Z(this.Ff, 20);
  } }), Object.defineProperty(this, "multiSelect", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 22));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 22) : this.Ff = Z(this.Ff, 22);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 23));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 23) : this.Ff = Z(this.Ff, 23);
  } }), Object.defineProperty(this, "commitOnSelChange", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 27));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 27) : this.Ff = Z(this.Ff, 27);
  } }), this.hasAppearanceStream = false;
};
H(ft, lt);
var dt = function() {
  ft.call(this), this.fontName = "helvetica", this.combo = false;
};
H(dt, ft);
var pt = function() {
  dt.call(this), this.combo = true;
};
H(pt, dt);
var gt = function() {
  pt.call(this), this.edit = true;
};
H(gt, pt);
var mt = function() {
  lt.call(this), this.FT = "/Btn", Object.defineProperty(this, "noToggleToOff", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 15));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 15) : this.Ff = Z(this.Ff, 15);
  } }), Object.defineProperty(this, "radio", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 16));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 16) : this.Ff = Z(this.Ff, 16);
  } }), Object.defineProperty(this, "pushButton", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 17));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 17) : this.Ff = Z(this.Ff, 17);
  } }), Object.defineProperty(this, "radioIsUnison", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 26));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 26) : this.Ff = Z(this.Ff, 26);
  } });
  var e, r = {};
  Object.defineProperty(this, "MK", { enumerable: false, configurable: false, get: function() {
    var t2 = function(t3) {
      return t3;
    };
    if (this.scope && (t2 = this.scope.internal.getEncryptor(this.objId)), 0 !== Object.keys(r).length) {
      var e2, n2 = [];
      for (e2 in n2.push("<<"), r) n2.push("/" + e2 + " (" + R(t2(r[e2])) + ")");
      return n2.push(">>"), n2.join("\n");
    }
  }, set: function(e2) {
    "object" === _typeof(e2) && (r = e2);
  } }), Object.defineProperty(this, "caption", { enumerable: true, configurable: true, get: function() {
    return r.CA || "";
  }, set: function(t2) {
    "string" == typeof t2 && (r.CA = t2);
  } }), Object.defineProperty(this, "AS", { enumerable: false, configurable: false, get: function() {
    return e;
  }, set: function(t2) {
    e = t2;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: true, configurable: true, get: function() {
    return e.substr(1, e.length - 1);
  }, set: function(t2) {
    e = "/" + t2;
  } });
};
H(mt, lt);
var vt = function() {
  mt.call(this), this.pushButton = true;
};
H(vt, mt);
var bt = function() {
  mt.call(this), this.radio = true, this.pushButton = false;
  var t2 = [];
  Object.defineProperty(this, "Kids", { enumerable: true, configurable: false, get: function() {
    return t2;
  }, set: function(e) {
    t2 = void 0 !== e ? e : [];
  } });
};
H(bt, mt);
var yt = function() {
  var e, r;
  lt.call(this), Object.defineProperty(this, "Parent", { enumerable: false, configurable: false, get: function() {
    return e;
  }, set: function(t2) {
    e = t2;
  } }), Object.defineProperty(this, "optionName", { enumerable: false, configurable: true, get: function() {
    return r;
  }, set: function(t2) {
    r = t2;
  } });
  var n2, i2 = {};
  Object.defineProperty(this, "MK", { enumerable: false, configurable: false, get: function() {
    var t2 = function(t3) {
      return t3;
    };
    this.scope && (t2 = this.scope.internal.getEncryptor(this.objId));
    var e2, r2 = [];
    for (e2 in r2.push("<<"), i2) r2.push("/" + e2 + " (" + R(t2(i2[e2])) + ")");
    return r2.push(">>"), r2.join("\n");
  }, set: function(e2) {
    "object" === _typeof(e2) && (i2 = e2);
  } }), Object.defineProperty(this, "caption", { enumerable: true, configurable: true, get: function() {
    return i2.CA || "";
  }, set: function(t2) {
    "string" == typeof t2 && (i2.CA = t2);
  } }), Object.defineProperty(this, "AS", { enumerable: false, configurable: false, get: function() {
    return n2;
  }, set: function(t2) {
    n2 = t2;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: true, configurable: true, get: function() {
    return n2.substr(1, n2.length - 1);
  }, set: function(t2) {
    n2 = "/" + t2;
  } }), this.caption = "l", this.appearanceState = "Off", this._AppearanceType = At.RadioButton.Circle, this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(this.optionName);
};
H(yt, lt), bt.prototype.setAppearance = function(t2) {
  if (!("createAppearanceStream" in t2) || !("getCA" in t2)) throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");
  for (var e in this.Kids) if (this.Kids.hasOwnProperty(e)) {
    var r = this.Kids[e];
    r.appearanceStreamContent = t2.createAppearanceStream(r.optionName), r.caption = t2.getCA();
  }
}, bt.prototype.createOption = function(t2) {
  var e = new yt();
  return e.Parent = this, e.optionName = t2, this.Kids.push(e), xt.call(this.scope, e), e;
};
var wt = function() {
  mt.call(this), this.fontName = "zapfdingbats", this.caption = "3", this.appearanceState = "On", this.value = "On", this.textAlign = "center", this.appearanceStreamContent = At.CheckBox.createAppearanceStream();
};
H(wt, mt);
var Nt = function() {
  lt.call(this), this.FT = "/Tx", Object.defineProperty(this, "multiline", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 13));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 13) : this.Ff = Z(this.Ff, 13);
  } }), Object.defineProperty(this, "fileSelect", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 21));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 21) : this.Ff = Z(this.Ff, 21);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 23));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 23) : this.Ff = Z(this.Ff, 23);
  } }), Object.defineProperty(this, "doNotScroll", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 24));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 24) : this.Ff = Z(this.Ff, 24);
  } }), Object.defineProperty(this, "comb", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 25));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 25) : this.Ff = Z(this.Ff, 25);
  } }), Object.defineProperty(this, "richText", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 26));
  }, set: function(t3) {
    true === Boolean(t3) ? this.Ff = K(this.Ff, 26) : this.Ff = Z(this.Ff, 26);
  } });
  var t2 = null;
  Object.defineProperty(this, "MaxLen", { enumerable: true, configurable: false, get: function() {
    return t2;
  }, set: function(e) {
    t2 = e;
  } }), Object.defineProperty(this, "maxLength", { enumerable: true, configurable: true, get: function() {
    return t2;
  }, set: function(e) {
    Number.isInteger(e) && (t2 = e);
  } }), Object.defineProperty(this, "hasAppearanceStream", { enumerable: true, configurable: true, get: function() {
    return this.V || this.DV;
  } });
};
H(Nt, lt);
var Lt = function() {
  Nt.call(this), Object.defineProperty(this, "password", { enumerable: true, configurable: true, get: function() {
    return Boolean(X(this.Ff, 14));
  }, set: function(t2) {
    true === Boolean(t2) ? this.Ff = K(this.Ff, 14) : this.Ff = Z(this.Ff, 14);
  } }), this.password = true;
};
H(Lt, Nt);
var At = { CheckBox: { createAppearanceStream: function() {
  return { N: { On: At.CheckBox.YesNormal }, D: { On: At.CheckBox.YesPushDown, Off: At.CheckBox.OffPushDown } };
}, YesPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [], n2 = t2.scope.internal.getFont(t2.fontName, t2.fontStyle).id, i2 = t2.scope.__private__.encodeColorString(t2.color), a2 = tt(t2, t2.caption);
  return r.push("0.749023 g"), r.push("0 0 " + U(At.internal.getWidth(t2)) + " " + U(At.internal.getHeight(t2)) + " re"), r.push("f"), r.push("BMC"), r.push("q"), r.push("0 0 1 rg"), r.push("/" + n2 + " " + U(a2.fontSize) + " Tf " + i2), r.push("BT"), r.push(a2.text), r.push("ET"), r.push("Q"), r.push("EMC"), e.stream = r.join("\n"), e;
}, YesNormal: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = t2.scope.internal.getFont(t2.fontName, t2.fontStyle).id, n2 = t2.scope.__private__.encodeColorString(t2.color), i2 = [], a2 = At.internal.getHeight(t2), o2 = At.internal.getWidth(t2), s2 = tt(t2, t2.caption);
  return i2.push("1 g"), i2.push("0 0 " + U(o2) + " " + U(a2) + " re"), i2.push("f"), i2.push("q"), i2.push("0 0 1 rg"), i2.push("0 0 " + U(o2 - 1) + " " + U(a2 - 1) + " re"), i2.push("W"), i2.push("n"), i2.push("0 g"), i2.push("BT"), i2.push("/" + r + " " + U(s2.fontSize) + " Tf " + n2), i2.push(s2.text), i2.push("ET"), i2.push("Q"), e.stream = i2.join("\n"), e;
}, OffPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [];
  return r.push("0.749023 g"), r.push("0 0 " + U(At.internal.getWidth(t2)) + " " + U(At.internal.getHeight(t2)) + " re"), r.push("f"), e.stream = r.join("\n"), e;
} }, RadioButton: { Circle: { createAppearanceStream: function(t2) {
  var e = { D: { Off: At.RadioButton.Circle.OffPushDown }, N: {} };
  return e.N[t2] = At.RadioButton.Circle.YesNormal, e.D[t2] = At.RadioButton.Circle.YesPushDown, e;
}, getCA: function() {
  return "l";
}, YesNormal: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [], n2 = At.internal.getWidth(t2) <= At.internal.getHeight(t2) ? At.internal.getWidth(t2) / 4 : At.internal.getHeight(t2) / 4;
  n2 = Number((0.9 * n2).toFixed(5));
  var i2 = At.internal.Bezier_C, a2 = Number((n2 * i2).toFixed(5));
  return r.push("q"), r.push("1 0 0 1 " + z(At.internal.getWidth(t2) / 2) + " " + z(At.internal.getHeight(t2) / 2) + " cm"), r.push(n2 + " 0 m"), r.push(n2 + " " + a2 + " " + a2 + " " + n2 + " 0 " + n2 + " c"), r.push("-" + a2 + " " + n2 + " -" + n2 + " " + a2 + " -" + n2 + " 0 c"), r.push("-" + n2 + " -" + a2 + " -" + a2 + " -" + n2 + " 0 -" + n2 + " c"), r.push(a2 + " -" + n2 + " " + n2 + " -" + a2 + " " + n2 + " 0 c"), r.push("f"), r.push("Q"), e.stream = r.join("\n"), e;
}, YesPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [], n2 = At.internal.getWidth(t2) <= At.internal.getHeight(t2) ? At.internal.getWidth(t2) / 4 : At.internal.getHeight(t2) / 4;
  n2 = Number((0.9 * n2).toFixed(5));
  var i2 = Number((2 * n2).toFixed(5)), a2 = Number((i2 * At.internal.Bezier_C).toFixed(5)), o2 = Number((n2 * At.internal.Bezier_C).toFixed(5));
  return r.push("0.749023 g"), r.push("q"), r.push("1 0 0 1 " + z(At.internal.getWidth(t2) / 2) + " " + z(At.internal.getHeight(t2) / 2) + " cm"), r.push(i2 + " 0 m"), r.push(i2 + " " + a2 + " " + a2 + " " + i2 + " 0 " + i2 + " c"), r.push("-" + a2 + " " + i2 + " -" + i2 + " " + a2 + " -" + i2 + " 0 c"), r.push("-" + i2 + " -" + a2 + " -" + a2 + " -" + i2 + " 0 -" + i2 + " c"), r.push(a2 + " -" + i2 + " " + i2 + " -" + a2 + " " + i2 + " 0 c"), r.push("f"), r.push("Q"), r.push("0 g"), r.push("q"), r.push("1 0 0 1 " + z(At.internal.getWidth(t2) / 2) + " " + z(At.internal.getHeight(t2) / 2) + " cm"), r.push(n2 + " 0 m"), r.push(n2 + " " + o2 + " " + o2 + " " + n2 + " 0 " + n2 + " c"), r.push("-" + o2 + " " + n2 + " -" + n2 + " " + o2 + " -" + n2 + " 0 c"), r.push("-" + n2 + " -" + o2 + " -" + o2 + " -" + n2 + " 0 -" + n2 + " c"), r.push(o2 + " -" + n2 + " " + n2 + " -" + o2 + " " + n2 + " 0 c"), r.push("f"), r.push("Q"), e.stream = r.join("\n"), e;
}, OffPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [], n2 = At.internal.getWidth(t2) <= At.internal.getHeight(t2) ? At.internal.getWidth(t2) / 4 : At.internal.getHeight(t2) / 4;
  n2 = Number((0.9 * n2).toFixed(5));
  var i2 = Number((2 * n2).toFixed(5)), a2 = Number((i2 * At.internal.Bezier_C).toFixed(5));
  return r.push("0.749023 g"), r.push("q"), r.push("1 0 0 1 " + z(At.internal.getWidth(t2) / 2) + " " + z(At.internal.getHeight(t2) / 2) + " cm"), r.push(i2 + " 0 m"), r.push(i2 + " " + a2 + " " + a2 + " " + i2 + " 0 " + i2 + " c"), r.push("-" + a2 + " " + i2 + " -" + i2 + " " + a2 + " -" + i2 + " 0 c"), r.push("-" + i2 + " -" + a2 + " -" + a2 + " -" + i2 + " 0 -" + i2 + " c"), r.push(a2 + " -" + i2 + " " + i2 + " -" + a2 + " " + i2 + " 0 c"), r.push("f"), r.push("Q"), e.stream = r.join("\n"), e;
} }, Cross: { createAppearanceStream: function(t2) {
  var e = { D: { Off: At.RadioButton.Cross.OffPushDown }, N: {} };
  return e.N[t2] = At.RadioButton.Cross.YesNormal, e.D[t2] = At.RadioButton.Cross.YesPushDown, e;
}, getCA: function() {
  return "8";
}, YesNormal: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [], n2 = At.internal.calculateCross(t2);
  return r.push("q"), r.push("1 1 " + U(At.internal.getWidth(t2) - 2) + " " + U(At.internal.getHeight(t2) - 2) + " re"), r.push("W"), r.push("n"), r.push(U(n2.x1.x) + " " + U(n2.x1.y) + " m"), r.push(U(n2.x2.x) + " " + U(n2.x2.y) + " l"), r.push(U(n2.x4.x) + " " + U(n2.x4.y) + " m"), r.push(U(n2.x3.x) + " " + U(n2.x3.y) + " l"), r.push("s"), r.push("Q"), e.stream = r.join("\n"), e;
}, YesPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = At.internal.calculateCross(t2), n2 = [];
  return n2.push("0.749023 g"), n2.push("0 0 " + U(At.internal.getWidth(t2)) + " " + U(At.internal.getHeight(t2)) + " re"), n2.push("f"), n2.push("q"), n2.push("1 1 " + U(At.internal.getWidth(t2) - 2) + " " + U(At.internal.getHeight(t2) - 2) + " re"), n2.push("W"), n2.push("n"), n2.push(U(r.x1.x) + " " + U(r.x1.y) + " m"), n2.push(U(r.x2.x) + " " + U(r.x2.y) + " l"), n2.push(U(r.x4.x) + " " + U(r.x4.y) + " m"), n2.push(U(r.x3.x) + " " + U(r.x3.y) + " l"), n2.push("s"), n2.push("Q"), e.stream = n2.join("\n"), e;
}, OffPushDown: function(t2) {
  var e = V(t2);
  e.scope = t2.scope;
  var r = [];
  return r.push("0.749023 g"), r.push("0 0 " + U(At.internal.getWidth(t2)) + " " + U(At.internal.getHeight(t2)) + " re"), r.push("f"), e.stream = r.join("\n"), e;
} } }, createDefaultAppearanceStream: function(t2) {
  var e = t2.scope.internal.getFont(t2.fontName, t2.fontStyle).id, r = t2.scope.__private__.encodeColorString(t2.color);
  return "/" + e + " " + t2.fontSize + " Tf " + r;
} };
At.internal = { Bezier_C: 0.551915024494, calculateCross: function(t2) {
  var e = At.internal.getWidth(t2), r = At.internal.getHeight(t2), n2 = Math.min(e, r);
  return { x1: { x: (e - n2) / 2, y: (r - n2) / 2 + n2 }, x2: { x: (e - n2) / 2 + n2, y: (r - n2) / 2 }, x3: { x: (e - n2) / 2, y: (r - n2) / 2 }, x4: { x: (e - n2) / 2 + n2, y: (r - n2) / 2 + n2 } };
} }, At.internal.getWidth = function(e) {
  var r = 0;
  return "object" === _typeof(e) && (r = W(e.Rect[2])), r;
}, At.internal.getHeight = function(e) {
  var r = 0;
  return "object" === _typeof(e) && (r = W(e.Rect[3])), r;
};
var xt = q.addField = function(t2) {
  if (at(this, t2), !(t2 instanceof lt)) throw new Error("Invalid argument passed to jsPDF.addField.");
  var e;
  return (e = t2).scope.internal.acroformPlugin.printedOut && (e.scope.internal.acroformPlugin.printedOut = false, e.scope.internal.acroformPlugin.acroFormDictionaryRoot = null), e.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(e), t2.page = t2.scope.internal.getCurrentPageInfo().pageNumber, this;
};
q.AcroFormChoiceField = ft, q.AcroFormListBox = dt, q.AcroFormComboBox = pt, q.AcroFormEditBox = gt, q.AcroFormButton = mt, q.AcroFormPushButton = vt, q.AcroFormRadioButton = bt, q.AcroFormCheckBox = wt, q.AcroFormTextField = Nt, q.AcroFormPasswordField = Lt, q.AcroFormAppearance = At, q.AcroForm = { ChoiceField: ft, ListBox: dt, ComboBox: pt, EditBox: gt, Button: mt, PushButton: vt, RadioButton: bt, CheckBox: wt, TextField: Nt, PasswordField: Lt, Appearance: At }, E.AcroForm = { ChoiceField: ft, ListBox: dt, ComboBox: pt, EditBox: gt, Button: mt, PushButton: vt, RadioButton: bt, CheckBox: wt, TextField: Nt, PasswordField: Lt, Appearance: At };
E.AcroForm;
function _t(t2) {
  return t2.reduce(function(t3, e, r) {
    return t3[e] = r, t3;
  }, {});
}
!function(e) {
  e.__addimage__ = {};
  var r = "UNKNOWN", n2 = { PNG: [[137, 80, 78, 71]], TIFF: [[77, 77, 0, 42], [73, 73, 42, 0]], JPEG: [[255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0], [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0], [255, 216, 255, 219], [255, 216, 255, 238]], JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]], GIF87a: [[71, 73, 70, 56, 55, 97]], GIF89a: [[71, 73, 70, 56, 57, 97]], WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]], BMP: [[66, 77], [66, 65], [67, 73], [67, 80], [73, 67], [80, 84]] }, i2 = e.__addimage__.getImageFileTypeByImageData = function(t2, e2) {
    var i3, a3, o3, s3, c3, u2 = r;
    if ("RGBA" === (e2 = e2 || r) || void 0 !== t2.data && t2.data instanceof Uint8ClampedArray && "height" in t2 && "width" in t2) return "RGBA";
    if (x2(t2)) for (c3 in n2) for (o3 = n2[c3], i3 = 0; i3 < o3.length; i3 += 1) {
      for (s3 = true, a3 = 0; a3 < o3[i3].length; a3 += 1) if (void 0 !== o3[i3][a3] && o3[i3][a3] !== t2[a3]) {
        s3 = false;
        break;
      }
      if (true === s3) {
        u2 = c3;
        break;
      }
    }
    else for (c3 in n2) for (o3 = n2[c3], i3 = 0; i3 < o3.length; i3 += 1) {
      for (s3 = true, a3 = 0; a3 < o3[i3].length; a3 += 1) if (void 0 !== o3[i3][a3] && o3[i3][a3] !== t2.charCodeAt(a3)) {
        s3 = false;
        break;
      }
      if (true === s3) {
        u2 = c3;
        break;
      }
    }
    return u2 === r && e2 !== r && (u2 = e2), u2;
  }, a2 = function t2(e2) {
    for (var r2 = this.internal.write, n3 = this.internal.putStream, i3 = (0, this.internal.getFilters)(); -1 !== i3.indexOf("FlateEncode"); ) i3.splice(i3.indexOf("FlateEncode"), 1);
    e2.objectId = this.internal.newObject();
    var a3 = [];
    if (a3.push({ key: "Type", value: "/XObject" }), a3.push({ key: "Subtype", value: "/Image" }), a3.push({ key: "Width", value: e2.width }), a3.push({ key: "Height", value: e2.height }), e2.colorSpace === b2.INDEXED ? a3.push({ key: "ColorSpace", value: "[/Indexed /DeviceRGB " + (e2.palette.length / 3 - 1) + " " + ("sMask" in e2 && void 0 !== e2.sMask ? e2.objectId + 2 : e2.objectId + 1) + " 0 R]" }) : (a3.push({ key: "ColorSpace", value: "/" + e2.colorSpace }), e2.colorSpace === b2.DEVICE_CMYK && a3.push({ key: "Decode", value: "[1 0 1 0 1 0 1 0]" })), a3.push({ key: "BitsPerComponent", value: e2.bitsPerComponent }), "decodeParameters" in e2 && void 0 !== e2.decodeParameters && a3.push({ key: "DecodeParms", value: "<<" + e2.decodeParameters + ">>" }), "transparency" in e2 && Array.isArray(e2.transparency)) {
      for (var o3 = "", s3 = 0, c3 = e2.transparency.length; s3 < c3; s3++) o3 += e2.transparency[s3] + " " + e2.transparency[s3] + " ";
      a3.push({ key: "Mask", value: "[" + o3 + "]" });
    }
    void 0 !== e2.sMask && a3.push({ key: "SMask", value: e2.objectId + 1 + " 0 R" });
    var u2 = void 0 !== e2.filter ? ["/" + e2.filter] : void 0;
    if (n3({ data: e2.data, additionalKeyValues: a3, alreadyAppliedFilters: u2, objectId: e2.objectId }), r2("endobj"), "sMask" in e2 && void 0 !== e2.sMask) {
      var h3 = "/Predictor " + e2.predictor + " /Colors 1 /BitsPerComponent " + e2.bitsPerComponent + " /Columns " + e2.width, l3 = { width: e2.width, height: e2.height, colorSpace: "DeviceGray", bitsPerComponent: e2.bitsPerComponent, decodeParameters: h3, data: e2.sMask };
      "filter" in e2 && (l3.filter = e2.filter), t2.call(this, l3);
    }
    if (e2.colorSpace === b2.INDEXED) {
      var f3 = this.internal.newObject();
      n3({ data: _2(new Uint8Array(e2.palette)), objectId: f3 }), r2("endobj");
    }
  }, o2 = function() {
    var t2 = this.internal.collections.addImage_images;
    for (var e2 in t2) a2.call(this, t2[e2]);
  }, s2 = function() {
    var t2, e2 = this.internal.collections.addImage_images, r2 = this.internal.write;
    for (var n3 in e2) r2("/I" + (t2 = e2[n3]).index, t2.objectId, "0", "R");
  }, c2 = function() {
    this.internal.collections.addImage_images || (this.internal.collections.addImage_images = {}, this.internal.events.subscribe("putResources", o2), this.internal.events.subscribe("putXobjectDict", s2));
  }, h2 = function() {
    var t2 = this.internal.collections.addImage_images;
    return c2.call(this), t2;
  }, l2 = function() {
    return Object.keys(this.internal.collections.addImage_images).length;
  }, f2 = function(t2) {
    return "function" == typeof e["process" + t2.toUpperCase()];
  }, d2 = function(e2) {
    return "object" === _typeof(e2) && 1 === e2.nodeType;
  }, p2 = function(t2, r2) {
    if ("IMG" === t2.nodeName && t2.hasAttribute("src")) {
      var n3 = "" + t2.getAttribute("src");
      if (0 === n3.indexOf("data:image/")) return u(unescape(n3).split("base64,").pop());
      var i3 = e.loadFile(n3, true);
      if (void 0 !== i3) return i3;
    }
    if ("CANVAS" === t2.nodeName) {
      if (0 === t2.width || 0 === t2.height) throw new Error("Given canvas must have data. Canvas width: " + t2.width + ", height: " + t2.height);
      var a3;
      switch (r2) {
        case "PNG":
          a3 = "image/png";
          break;
        case "WEBP":
          a3 = "image/webp";
          break;
        case "JPEG":
        case "JPG":
        default:
          a3 = "image/jpeg";
      }
      return u(t2.toDataURL(a3, 1).split("base64,").pop());
    }
  }, g2 = function(t2) {
    var e2 = this.internal.collections.addImage_images;
    if (e2) {
      for (var r2 in e2) if (t2 === e2[r2].alias) return e2[r2];
    }
  }, m2 = function(t2, e2, r2) {
    return t2 || e2 || (t2 = -96, e2 = -96), t2 < 0 && (t2 = -1 * r2.width * 72 / t2 / this.internal.scaleFactor), e2 < 0 && (e2 = -1 * r2.height * 72 / e2 / this.internal.scaleFactor), 0 === t2 && (t2 = e2 * r2.width / r2.height), 0 === e2 && (e2 = t2 * r2.height / r2.width), [t2, e2];
  }, v2 = function(t2, e2, r2, n3, i3, a3) {
    var o3 = m2.call(this, r2, n3, i3), s3 = this.internal.getCoordinateString, c3 = this.internal.getVerticalCoordinateString, u2 = h2.call(this);
    if (r2 = o3[0], n3 = o3[1], u2[i3.index] = i3, a3) {
      a3 *= Math.PI / 180;
      var l3 = Math.cos(a3), f3 = Math.sin(a3), d3 = function(t3) {
        return t3.toFixed(4);
      }, p3 = [d3(l3), d3(f3), d3(-1 * f3), d3(l3), 0, 0, "cm"];
    }
    this.internal.write("q"), a3 ? (this.internal.write([1, "0", "0", 1, s3(t2), c3(e2 + n3), "cm"].join(" ")), this.internal.write(p3.join(" ")), this.internal.write([s3(r2), "0", "0", s3(n3), "0", "0", "cm"].join(" "))) : this.internal.write([s3(r2), "0", "0", s3(n3), s3(t2), c3(e2 + n3), "cm"].join(" ")), this.isAdvancedAPI() && this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")), this.internal.write("/I" + i3.index + " Do"), this.internal.write("Q");
  }, b2 = e.color_spaces = { DEVICE_RGB: "DeviceRGB", DEVICE_GRAY: "DeviceGray", DEVICE_CMYK: "DeviceCMYK", CAL_GREY: "CalGray", CAL_RGB: "CalRGB", LAB: "Lab", ICC_BASED: "ICCBased", INDEXED: "Indexed", PATTERN: "Pattern", SEPARATION: "Separation", DEVICE_N: "DeviceN" };
  e.decode = { DCT_DECODE: "DCTDecode", FLATE_DECODE: "FlateDecode", LZW_DECODE: "LZWDecode", JPX_DECODE: "JPXDecode", JBIG2_DECODE: "JBIG2Decode", ASCII85_DECODE: "ASCII85Decode", ASCII_HEX_DECODE: "ASCIIHexDecode", RUN_LENGTH_DECODE: "RunLengthDecode", CCITT_FAX_DECODE: "CCITTFaxDecode" };
  var y2 = e.image_compression = { NONE: "NONE", FAST: "FAST", MEDIUM: "MEDIUM", SLOW: "SLOW" }, w2 = e.__addimage__.sHashCode = function(t2) {
    var e2, r2, n3 = 0;
    if ("string" == typeof t2) for (r2 = t2.length, e2 = 0; e2 < r2; e2++) n3 = (n3 << 5) - n3 + t2.charCodeAt(e2), n3 |= 0;
    else if (x2(t2)) for (r2 = t2.byteLength / 2, e2 = 0; e2 < r2; e2++) n3 = (n3 << 5) - n3 + t2[e2], n3 |= 0;
    return n3;
  }, N2 = e.__addimage__.validateStringAsBase64 = function(t2) {
    (t2 = t2 || "").toString().trim();
    var e2 = true;
    return 0 === t2.length && (e2 = false), t2.length % 4 != 0 && (e2 = false), false === /^[A-Za-z0-9+/]+$/.test(t2.substr(0, t2.length - 2)) && (e2 = false), false === /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(t2.substr(-2)) && (e2 = false), e2;
  }, L2 = e.__addimage__.extractImageFromDataUrl = function(t2) {
    var e2 = (t2 = t2 || "").split("base64,"), r2 = null;
    if (2 === e2.length) {
      var n3 = /^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(e2[0]);
      Array.isArray(n3) && (r2 = { mimeType: n3[1], charset: n3[2], data: e2[1] });
    }
    return r2;
  }, A2 = e.__addimage__.supportsArrayBuffer = function() {
    return "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array;
  };
  e.__addimage__.isArrayBuffer = function(t2) {
    return A2() && t2 instanceof ArrayBuffer;
  };
  var x2 = e.__addimage__.isArrayBufferView = function(t2) {
    return A2() && "undefined" != typeof Uint32Array && (t2 instanceof Int8Array || t2 instanceof Uint8Array || "undefined" != typeof Uint8ClampedArray && t2 instanceof Uint8ClampedArray || t2 instanceof Int16Array || t2 instanceof Uint16Array || t2 instanceof Int32Array || t2 instanceof Uint32Array || t2 instanceof Float32Array || t2 instanceof Float64Array);
  }, S2 = e.__addimage__.binaryStringToUint8Array = function(t2) {
    for (var e2 = t2.length, r2 = new Uint8Array(e2), n3 = 0; n3 < e2; n3++) r2[n3] = t2.charCodeAt(n3);
    return r2;
  }, _2 = e.__addimage__.arrayBufferToBinaryString = function(t2) {
    for (var e2 = "", r2 = x2(t2) ? t2 : new Uint8Array(t2), n3 = 0; n3 < r2.length; n3 += 8192) e2 += String.fromCharCode.apply(null, r2.subarray(n3, n3 + 8192));
    return e2;
  };
  e.addImage = function() {
    var e2, n3, i3, a3, o3, s3, u2, h3, l3;
    if ("number" == typeof arguments[1] ? (n3 = r, i3 = arguments[1], a3 = arguments[2], o3 = arguments[3], s3 = arguments[4], u2 = arguments[5], h3 = arguments[6], l3 = arguments[7]) : (n3 = arguments[1], i3 = arguments[2], a3 = arguments[3], o3 = arguments[4], s3 = arguments[5], u2 = arguments[6], h3 = arguments[7], l3 = arguments[8]), "object" === _typeof(e2 = arguments[0]) && !d2(e2) && "imageData" in e2) {
      var f3 = e2;
      e2 = f3.imageData, n3 = f3.format || n3 || r, i3 = f3.x || i3 || 0, a3 = f3.y || a3 || 0, o3 = f3.w || f3.width || o3, s3 = f3.h || f3.height || s3, u2 = f3.alias || u2, h3 = f3.compression || h3, l3 = f3.rotation || f3.angle || l3;
    }
    var p3 = this.internal.getFilters();
    if (void 0 === h3 && -1 !== p3.indexOf("FlateEncode") && (h3 = "SLOW"), isNaN(i3) || isNaN(a3)) throw new Error("Invalid coordinates passed to jsPDF.addImage");
    c2.call(this);
    var g3 = P2.call(this, e2, n3, u2, h3);
    return v2.call(this, i3, a3, o3, s3, g3, l3), this;
  };
  var P2 = function(t2, n3, a3, o3) {
    var s3, c3, u2;
    if ("string" == typeof t2 && i2(t2) === r) {
      t2 = unescape(t2);
      var h3 = k2(t2, false);
      ("" !== h3 || void 0 !== (h3 = e.loadFile(t2, true))) && (t2 = h3);
    }
    if (d2(t2) && (t2 = p2(t2, n3)), n3 = i2(t2, n3), !f2(n3)) throw new Error("addImage does not support files of type '" + n3 + "', please ensure that a plugin for '" + n3 + "' support is added.");
    if ((null == (u2 = a3) || 0 === u2.length) && (a3 = function(t3) {
      return "string" == typeof t3 || x2(t3) ? w2(t3) : x2(t3.data) ? w2(t3.data) : null;
    }(t2)), (s3 = g2.call(this, a3)) || (A2() && (t2 instanceof Uint8Array || "RGBA" === n3 || (c3 = t2, t2 = S2(t2))), s3 = this["process" + n3.toUpperCase()](t2, l2.call(this), a3, function(t3) {
      return t3 && "string" == typeof t3 && (t3 = t3.toUpperCase()), t3 in e.image_compression ? t3 : y2.NONE;
    }(o3), c3)), !s3) throw new Error("An unknown error occurred whilst processing the image.");
    return s3;
  }, k2 = e.__addimage__.convertBase64ToBinaryString = function(t2, e2) {
    var r2;
    e2 = "boolean" != typeof e2 || e2;
    var n3, i3 = "";
    if ("string" == typeof t2) {
      n3 = null !== (r2 = L2(t2)) ? r2.data : t2;
      try {
        i3 = u(n3);
      } catch (t3) {
        if (e2) throw N2(n3) ? new Error("atob-Error in jsPDF.convertBase64ToBinaryString " + t3.message) : new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ");
      }
    }
    return i3;
  };
  e.getImageProperties = function(t2) {
    var n3, a3, o3 = "";
    if (d2(t2) && (t2 = p2(t2)), "string" == typeof t2 && i2(t2) === r && ("" === (o3 = k2(t2, false)) && (o3 = e.loadFile(t2) || ""), t2 = o3), a3 = i2(t2), !f2(a3)) throw new Error("addImage does not support files of type '" + a3 + "', please ensure that a plugin for '" + a3 + "' support is added.");
    if (!A2() || t2 instanceof Uint8Array || (t2 = S2(t2)), !(n3 = this["process" + a3.toUpperCase()](t2))) throw new Error("An unknown error occurred whilst processing the image");
    return n3.fileType = a3, n3;
  };
}(E.API), /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = function(t3) {
    if (void 0 !== t3 && "" != t3) return true;
  };
  E.API.events.push(["addPage", function(t3) {
    this.internal.getPageInfo(t3.pageNumber).pageContext.annotations = [];
  }]), t2.events.push(["putPage", function(t3) {
    for (var r, n2, i2, a2 = this.internal.getCoordinateString, o2 = this.internal.getVerticalCoordinateString, s2 = this.internal.getPageInfoByObjId(t3.objId), c2 = t3.pageContext.annotations, u2 = false, h2 = 0; h2 < c2.length && !u2; h2++) switch ((r = c2[h2]).type) {
      case "link":
        (e(r.options.url) || e(r.options.pageNumber)) && (u2 = true);
        break;
      case "reference":
      case "text":
      case "freetext":
        u2 = true;
    }
    if (0 != u2) {
      this.internal.write("/Annots [");
      for (var l2 = 0; l2 < c2.length; l2++) {
        r = c2[l2];
        var f2 = this.internal.pdfEscape, d2 = this.internal.getEncryptor(t3.objId);
        switch (r.type) {
          case "reference":
            this.internal.write(" " + r.object.objId + " 0 R ");
            break;
          case "text":
            var p2 = this.internal.newAdditionalObject(), g2 = this.internal.newAdditionalObject(), m2 = this.internal.getEncryptor(p2.objId), v2 = r.title || "Note";
            i2 = "<</Type /Annot /Subtype /Text " + (n2 = "/Rect [" + a2(r.bounds.x) + " " + o2(r.bounds.y + r.bounds.h) + " " + a2(r.bounds.x + r.bounds.w) + " " + o2(r.bounds.y) + "] ") + "/Contents (" + f2(m2(r.contents)) + ")", i2 += " /Popup " + g2.objId + " 0 R", i2 += " /P " + s2.objId + " 0 R", i2 += " /T (" + f2(m2(v2)) + ") >>", p2.content = i2;
            var b2 = p2.objId + " 0 R";
            i2 = "<</Type /Annot /Subtype /Popup " + (n2 = "/Rect [" + a2(r.bounds.x + 30) + " " + o2(r.bounds.y + r.bounds.h) + " " + a2(r.bounds.x + r.bounds.w + 30) + " " + o2(r.bounds.y) + "] ") + " /Parent " + b2, r.open && (i2 += " /Open true"), i2 += " >>", g2.content = i2, this.internal.write(p2.objId, "0 R", g2.objId, "0 R");
            break;
          case "freetext":
            n2 = "/Rect [" + a2(r.bounds.x) + " " + o2(r.bounds.y) + " " + a2(r.bounds.x + r.bounds.w) + " " + o2(r.bounds.y + r.bounds.h) + "] ";
            var y2 = r.color || "#000000";
            i2 = "<</Type /Annot /Subtype /FreeText " + n2 + "/Contents (" + f2(d2(r.contents)) + ")", i2 += " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" + y2 + ")", i2 += " /Border [0 0 0]", i2 += " >>", this.internal.write(i2);
            break;
          case "link":
            if (r.options.name) {
              var w2 = this.annotations._nameMap[r.options.name];
              r.options.pageNumber = w2.page, r.options.top = w2.y;
            } else r.options.top || (r.options.top = 0);
            if (n2 = "/Rect [" + r.finalBounds.x + " " + r.finalBounds.y + " " + r.finalBounds.w + " " + r.finalBounds.h + "] ", i2 = "", r.options.url) i2 = "<</Type /Annot /Subtype /Link " + n2 + "/Border [0 0 0] /A <</S /URI /URI (" + f2(d2(r.options.url)) + ") >>";
            else if (r.options.pageNumber) {
              switch (i2 = "<</Type /Annot /Subtype /Link " + n2 + "/Border [0 0 0] /Dest [" + this.internal.getPageInfo(r.options.pageNumber).objId + " 0 R", r.options.magFactor = r.options.magFactor || "XYZ", r.options.magFactor) {
                case "Fit":
                  i2 += " /Fit]";
                  break;
                case "FitH":
                  i2 += " /FitH " + r.options.top + "]";
                  break;
                case "FitV":
                  r.options.left = r.options.left || 0, i2 += " /FitV " + r.options.left + "]";
                  break;
                case "XYZ":
                default:
                  var N2 = o2(r.options.top);
                  r.options.left = r.options.left || 0, void 0 === r.options.zoom && (r.options.zoom = 0), i2 += " /XYZ " + r.options.left + " " + N2 + " " + r.options.zoom + "]";
              }
            }
            "" != i2 && (i2 += " >>", this.internal.write(i2));
        }
      }
      this.internal.write("]");
    }
  }]), t2.createAnnotation = function(t3) {
    var e2 = this.internal.getCurrentPageInfo();
    switch (t3.type) {
      case "link":
        this.link(t3.bounds.x, t3.bounds.y, t3.bounds.w, t3.bounds.h, t3);
        break;
      case "text":
      case "freetext":
        e2.pageContext.annotations.push(t3);
    }
  }, t2.link = function(t3, e2, r, n2, i2) {
    var a2 = this.internal.getCurrentPageInfo(), o2 = this.internal.getCoordinateString, s2 = this.internal.getVerticalCoordinateString;
    a2.pageContext.annotations.push({ finalBounds: { x: o2(t3), y: s2(e2), w: o2(t3 + r), h: s2(e2 + n2) }, options: i2, type: "link" });
  }, t2.textWithLink = function(t3, e2, r, n2) {
    var i2, a2, o2 = this.getTextWidth(t3), s2 = this.internal.getLineHeight() / this.internal.scaleFactor;
    if (void 0 !== n2.maxWidth) {
      a2 = n2.maxWidth;
      var c2 = this.splitTextToSize(t3, a2).length;
      i2 = Math.ceil(s2 * c2);
    } else a2 = o2, i2 = s2;
    return this.text(t3, e2, r, n2), r += 0.2 * s2, "center" === n2.align && (e2 -= o2 / 2), "right" === n2.align && (e2 -= o2), this.link(e2, r - s2, a2, i2, n2), o2;
  }, t2.getTextWidth = function(t3) {
    var e2 = this.internal.getFontSize();
    return this.getStringUnitWidth(t3) * e2 / this.internal.scaleFactor;
  };
}(E.API), /**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = { 1569: [65152], 1570: [65153, 65154], 1571: [65155, 65156], 1572: [65157, 65158], 1573: [65159, 65160], 1574: [65161, 65162, 65163, 65164], 1575: [65165, 65166], 1576: [65167, 65168, 65169, 65170], 1577: [65171, 65172], 1578: [65173, 65174, 65175, 65176], 1579: [65177, 65178, 65179, 65180], 1580: [65181, 65182, 65183, 65184], 1581: [65185, 65186, 65187, 65188], 1582: [65189, 65190, 65191, 65192], 1583: [65193, 65194], 1584: [65195, 65196], 1585: [65197, 65198], 1586: [65199, 65200], 1587: [65201, 65202, 65203, 65204], 1588: [65205, 65206, 65207, 65208], 1589: [65209, 65210, 65211, 65212], 1590: [65213, 65214, 65215, 65216], 1591: [65217, 65218, 65219, 65220], 1592: [65221, 65222, 65223, 65224], 1593: [65225, 65226, 65227, 65228], 1594: [65229, 65230, 65231, 65232], 1601: [65233, 65234, 65235, 65236], 1602: [65237, 65238, 65239, 65240], 1603: [65241, 65242, 65243, 65244], 1604: [65245, 65246, 65247, 65248], 1605: [65249, 65250, 65251, 65252], 1606: [65253, 65254, 65255, 65256], 1607: [65257, 65258, 65259, 65260], 1608: [65261, 65262], 1609: [65263, 65264, 64488, 64489], 1610: [65265, 65266, 65267, 65268], 1649: [64336, 64337], 1655: [64477], 1657: [64358, 64359, 64360, 64361], 1658: [64350, 64351, 64352, 64353], 1659: [64338, 64339, 64340, 64341], 1662: [64342, 64343, 64344, 64345], 1663: [64354, 64355, 64356, 64357], 1664: [64346, 64347, 64348, 64349], 1667: [64374, 64375, 64376, 64377], 1668: [64370, 64371, 64372, 64373], 1670: [64378, 64379, 64380, 64381], 1671: [64382, 64383, 64384, 64385], 1672: [64392, 64393], 1676: [64388, 64389], 1677: [64386, 64387], 1678: [64390, 64391], 1681: [64396, 64397], 1688: [64394, 64395], 1700: [64362, 64363, 64364, 64365], 1702: [64366, 64367, 64368, 64369], 1705: [64398, 64399, 64400, 64401], 1709: [64467, 64468, 64469, 64470], 1711: [64402, 64403, 64404, 64405], 1713: [64410, 64411, 64412, 64413], 1715: [64406, 64407, 64408, 64409], 1722: [64414, 64415], 1723: [64416, 64417, 64418, 64419], 1726: [64426, 64427, 64428, 64429], 1728: [64420, 64421], 1729: [64422, 64423, 64424, 64425], 1733: [64480, 64481], 1734: [64473, 64474], 1735: [64471, 64472], 1736: [64475, 64476], 1737: [64482, 64483], 1739: [64478, 64479], 1740: [64508, 64509, 64510, 64511], 1744: [64484, 64485, 64486, 64487], 1746: [64430, 64431], 1747: [64432, 64433] }, r = { 65247: { 65154: 65269, 65156: 65271, 65160: 65273, 65166: 65275 }, 65248: { 65154: 65270, 65156: 65272, 65160: 65274, 65166: 65276 }, 65165: { 65247: { 65248: { 65258: 65010 } } }, 1617: { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 } }, n2 = { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 }, i2 = [1570, 1571, 1573, 1575];
  t2.__arabicParser__ = {};
  var a2 = t2.__arabicParser__.isInArabicSubstitutionA = function(t3) {
    return void 0 !== e[t3.charCodeAt(0)];
  }, o2 = t2.__arabicParser__.isArabicLetter = function(t3) {
    return "string" == typeof t3 && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(t3);
  }, s2 = t2.__arabicParser__.isArabicEndLetter = function(t3) {
    return o2(t3) && a2(t3) && e[t3.charCodeAt(0)].length <= 2;
  }, c2 = t2.__arabicParser__.isArabicAlfLetter = function(t3) {
    return o2(t3) && i2.indexOf(t3.charCodeAt(0)) >= 0;
  };
  t2.__arabicParser__.arabicLetterHasIsolatedForm = function(t3) {
    return o2(t3) && a2(t3) && e[t3.charCodeAt(0)].length >= 1;
  };
  var u2 = t2.__arabicParser__.arabicLetterHasFinalForm = function(t3) {
    return o2(t3) && a2(t3) && e[t3.charCodeAt(0)].length >= 2;
  };
  t2.__arabicParser__.arabicLetterHasInitialForm = function(t3) {
    return o2(t3) && a2(t3) && e[t3.charCodeAt(0)].length >= 3;
  };
  var h2 = t2.__arabicParser__.arabicLetterHasMedialForm = function(t3) {
    return o2(t3) && a2(t3) && 4 == e[t3.charCodeAt(0)].length;
  }, l2 = t2.__arabicParser__.resolveLigatures = function(t3) {
    var e2 = 0, n3 = r, i3 = "", a3 = 0;
    for (e2 = 0; e2 < t3.length; e2 += 1) void 0 !== n3[t3.charCodeAt(e2)] ? (a3++, "number" == typeof (n3 = n3[t3.charCodeAt(e2)]) && (i3 += String.fromCharCode(n3), n3 = r, a3 = 0), e2 === t3.length - 1 && (n3 = r, i3 += t3.charAt(e2 - (a3 - 1)), e2 -= a3 - 1, a3 = 0)) : (n3 = r, i3 += t3.charAt(e2 - a3), e2 -= a3, a3 = 0);
    return i3;
  };
  t2.__arabicParser__.isArabicDiacritic = function(t3) {
    return void 0 !== t3 && void 0 !== n2[t3.charCodeAt(0)];
  };
  var f2 = t2.__arabicParser__.getCorrectForm = function(t3, e2, r2) {
    return o2(t3) ? false === a2(t3) ? -1 : !u2(t3) || !o2(e2) && !o2(r2) || !o2(r2) && s2(e2) || s2(t3) && !o2(e2) || s2(t3) && c2(e2) || s2(t3) && s2(e2) ? 0 : h2(t3) && o2(e2) && !s2(e2) && o2(r2) && u2(r2) ? 3 : s2(t3) || !o2(r2) ? 1 : 2 : -1;
  }, d2 = function(t3) {
    var r2 = 0, n3 = 0, i3 = 0, a3 = "", s3 = "", c3 = "", u3 = (t3 = t3 || "").split("\\s+"), h3 = [];
    for (r2 = 0; r2 < u3.length; r2 += 1) {
      for (h3.push(""), n3 = 0; n3 < u3[r2].length; n3 += 1) a3 = u3[r2][n3], s3 = u3[r2][n3 - 1], c3 = u3[r2][n3 + 1], o2(a3) ? (i3 = f2(a3, s3, c3), h3[r2] += -1 !== i3 ? String.fromCharCode(e[a3.charCodeAt(0)][i3]) : a3) : h3[r2] += a3;
      h3[r2] = l2(h3[r2]);
    }
    return h3.join(" ");
  }, p2 = t2.__arabicParser__.processArabic = t2.processArabic = function() {
    var t3, e2 = "string" == typeof arguments[0] ? arguments[0] : arguments[0].text, r2 = [];
    if (Array.isArray(e2)) {
      var n3 = 0;
      for (r2 = [], n3 = 0; n3 < e2.length; n3 += 1) Array.isArray(e2[n3]) ? r2.push([d2(e2[n3][0]), e2[n3][1], e2[n3][2]]) : r2.push([d2(e2[n3])]);
      t3 = r2;
    } else t3 = d2(e2);
    return "string" == typeof arguments[0] ? t3 : (arguments[0].text = t3, arguments[0]);
  };
  t2.events.push(["preProcessText", p2]);
}(E.API), E.API.autoPrint = function(t2) {
  var e;
  switch ((t2 = t2 || {}).variant = t2.variant || "non-conform", t2.variant) {
    case "javascript":
      this.addJS("print({});");
      break;
    case "non-conform":
    default:
      this.internal.events.subscribe("postPutResources", function() {
        e = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /Named"), this.internal.out("/Type /Action"), this.internal.out("/N /Print"), this.internal.out(">>"), this.internal.out("endobj");
      }), this.internal.events.subscribe("putCatalog", function() {
        this.internal.out("/OpenAction " + e + " 0 R");
      });
  }
  return this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = function() {
    var t3 = void 0;
    Object.defineProperty(this, "pdf", { get: function() {
      return t3;
    }, set: function(e3) {
      t3 = e3;
    } });
    var e2 = 150;
    Object.defineProperty(this, "width", { get: function() {
      return e2;
    }, set: function(t4) {
      e2 = isNaN(t4) || false === Number.isInteger(t4) || t4 < 0 ? 150 : t4, this.getContext("2d").pageWrapXEnabled && (this.getContext("2d").pageWrapX = e2 + 1);
    } });
    var r = 300;
    Object.defineProperty(this, "height", { get: function() {
      return r;
    }, set: function(t4) {
      r = isNaN(t4) || false === Number.isInteger(t4) || t4 < 0 ? 300 : t4, this.getContext("2d").pageWrapYEnabled && (this.getContext("2d").pageWrapY = r + 1);
    } });
    var n2 = [];
    Object.defineProperty(this, "childNodes", { get: function() {
      return n2;
    }, set: function(t4) {
      n2 = t4;
    } });
    var i2 = {};
    Object.defineProperty(this, "style", { get: function() {
      return i2;
    }, set: function(t4) {
      i2 = t4;
    } }), Object.defineProperty(this, "parentNode", {});
  };
  e.prototype.getContext = function(t3, e2) {
    var r;
    if ("2d" !== (t3 = t3 || "2d")) return null;
    for (r in e2) this.pdf.context2d.hasOwnProperty(r) && (this.pdf.context2d[r] = e2[r]);
    return this.pdf.context2d._canvas = this, this.pdf.context2d;
  }, e.prototype.toDataURL = function() {
    throw new Error("toDataURL is not implemented.");
  }, t2.events.push(["initialized", function() {
    this.canvas = new e(), this.canvas.pdf = this;
  }]);
}(E.API), function(e) {
  var r = { left: 0, top: 0, bottom: 0, right: 0 }, n2 = false, i2 = function() {
    void 0 === this.internal.__cell__ && (this.internal.__cell__ = {}, this.internal.__cell__.padding = 3, this.internal.__cell__.headerFunction = void 0, this.internal.__cell__.margins = Object.assign({}, r), this.internal.__cell__.margins.width = this.getPageWidth(), a2.call(this));
  }, a2 = function() {
    this.internal.__cell__.lastCell = new o2(), this.internal.__cell__.pages = 1;
  }, o2 = function() {
    var t2 = arguments[0];
    Object.defineProperty(this, "x", { enumerable: true, get: function() {
      return t2;
    }, set: function(e3) {
      t2 = e3;
    } });
    var e2 = arguments[1];
    Object.defineProperty(this, "y", { enumerable: true, get: function() {
      return e2;
    }, set: function(t3) {
      e2 = t3;
    } });
    var r2 = arguments[2];
    Object.defineProperty(this, "width", { enumerable: true, get: function() {
      return r2;
    }, set: function(t3) {
      r2 = t3;
    } });
    var n3 = arguments[3];
    Object.defineProperty(this, "height", { enumerable: true, get: function() {
      return n3;
    }, set: function(t3) {
      n3 = t3;
    } });
    var i3 = arguments[4];
    Object.defineProperty(this, "text", { enumerable: true, get: function() {
      return i3;
    }, set: function(t3) {
      i3 = t3;
    } });
    var a3 = arguments[5];
    Object.defineProperty(this, "lineNumber", { enumerable: true, get: function() {
      return a3;
    }, set: function(t3) {
      a3 = t3;
    } });
    var o3 = arguments[6];
    return Object.defineProperty(this, "align", { enumerable: true, get: function() {
      return o3;
    }, set: function(t3) {
      o3 = t3;
    } }), this;
  };
  o2.prototype.clone = function() {
    return new o2(this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align);
  }, o2.prototype.toArray = function() {
    return [this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align];
  }, e.setHeaderFunction = function(t2) {
    return i2.call(this), this.internal.__cell__.headerFunction = "function" == typeof t2 ? t2 : void 0, this;
  }, e.getTextDimensions = function(t2, e2) {
    i2.call(this);
    var r2 = (e2 = e2 || {}).fontSize || this.getFontSize(), n3 = e2.font || this.getFont(), a3 = e2.scaleFactor || this.internal.scaleFactor, o3 = 0, s3 = 0, c3 = 0, u2 = this;
    if (!Array.isArray(t2) && "string" != typeof t2) {
      if ("number" != typeof t2) throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");
      t2 = String(t2);
    }
    var h2 = e2.maxWidth;
    h2 > 0 ? "string" == typeof t2 ? t2 = this.splitTextToSize(t2, h2) : "[object Array]" === Object.prototype.toString.call(t2) && (t2 = t2.reduce(function(t3, e3) {
      return t3.concat(u2.splitTextToSize(e3, h2));
    }, [])) : t2 = Array.isArray(t2) ? t2 : [t2];
    for (var l2 = 0; l2 < t2.length; l2++) o3 < (c3 = this.getStringUnitWidth(t2[l2], { font: n3 }) * r2) && (o3 = c3);
    return 0 !== o3 && (s3 = t2.length), { w: o3 /= a3, h: Math.max((s3 * r2 * this.getLineHeightFactor() - r2 * (this.getLineHeightFactor() - 1)) / a3, 0) };
  }, e.cellAddPage = function() {
    i2.call(this), this.addPage();
    var t2 = this.internal.__cell__.margins || r;
    return this.internal.__cell__.lastCell = new o2(t2.left, t2.top, void 0, void 0), this.internal.__cell__.pages += 1, this;
  };
  var s2 = e.cell = function() {
    var t2;
    t2 = arguments[0] instanceof o2 ? arguments[0] : new o2(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), i2.call(this);
    var e2 = this.internal.__cell__.lastCell, a3 = this.internal.__cell__.padding, s3 = this.internal.__cell__.margins || r, c3 = this.internal.__cell__.tableHeaderRow, u2 = this.internal.__cell__.printHeaders;
    return void 0 !== e2.lineNumber && (e2.lineNumber === t2.lineNumber ? (t2.x = (e2.x || 0) + (e2.width || 0), t2.y = e2.y || 0) : e2.y + e2.height + t2.height + s3.bottom > this.getPageHeight() ? (this.cellAddPage(), t2.y = s3.top, u2 && c3 && (this.printHeaderRow(t2.lineNumber, true), t2.y += c3[0].height)) : t2.y = e2.y + e2.height || t2.y), void 0 !== t2.text[0] && (this.rect(t2.x, t2.y, t2.width, t2.height, true === n2 ? "FD" : void 0), "right" === t2.align ? this.text(t2.text, t2.x + t2.width - a3, t2.y + a3, { align: "right", baseline: "top" }) : "center" === t2.align ? this.text(t2.text, t2.x + t2.width / 2, t2.y + a3, { align: "center", baseline: "top", maxWidth: t2.width - a3 - a3 }) : this.text(t2.text, t2.x + a3, t2.y + a3, { align: "left", baseline: "top", maxWidth: t2.width - a3 - a3 })), this.internal.__cell__.lastCell = t2, this;
  };
  e.table = function(e2, n3, u2, h2, l2) {
    if (i2.call(this), !u2) throw new Error("No data for PDF table.");
    var f2, d2, p2, g2, m2 = [], v2 = [], b2 = [], y2 = {}, w2 = {}, N2 = [], L2 = [], A2 = (l2 = l2 || {}).autoSize || false, x2 = false !== l2.printHeaders, S2 = l2.css && void 0 !== l2.css["font-size"] ? 16 * l2.css["font-size"] : l2.fontSize || 12, _2 = l2.margins || Object.assign({ width: this.getPageWidth() }, r), P2 = "number" == typeof l2.padding ? l2.padding : 3, k2 = l2.headerBackgroundColor || "#c8c8c8", I2 = l2.headerTextColor || "#000";
    if (a2.call(this), this.internal.__cell__.printHeaders = x2, this.internal.__cell__.margins = _2, this.internal.__cell__.table_font_size = S2, this.internal.__cell__.padding = P2, this.internal.__cell__.headerBackgroundColor = k2, this.internal.__cell__.headerTextColor = I2, this.setFontSize(S2), null == h2) v2 = m2 = Object.keys(u2[0]), b2 = m2.map(function() {
      return "left";
    });
    else if (Array.isArray(h2) && "object" === _typeof(h2[0])) for (m2 = h2.map(function(t2) {
      return t2.name;
    }), v2 = h2.map(function(t2) {
      return t2.prompt || t2.name || "";
    }), b2 = h2.map(function(t2) {
      return t2.align || "left";
    }), f2 = 0; f2 < h2.length; f2 += 1) w2[h2[f2].name] = h2[f2].width * (19.049976 / 25.4);
    else Array.isArray(h2) && "string" == typeof h2[0] && (v2 = m2 = h2, b2 = m2.map(function() {
      return "left";
    }));
    if (A2 || Array.isArray(h2) && "string" == typeof h2[0]) for (f2 = 0; f2 < m2.length; f2 += 1) {
      for (y2[g2 = m2[f2]] = u2.map(function(t2) {
        return t2[g2];
      }), this.setFont(void 0, "bold"), N2.push(this.getTextDimensions(v2[f2], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w), d2 = y2[g2], this.setFont(void 0, "normal"), p2 = 0; p2 < d2.length; p2 += 1) N2.push(this.getTextDimensions(d2[p2], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w);
      w2[g2] = Math.max.apply(null, N2) + P2 + P2, N2 = [];
    }
    if (x2) {
      var F2 = {};
      for (f2 = 0; f2 < m2.length; f2 += 1) F2[m2[f2]] = {}, F2[m2[f2]].text = v2[f2], F2[m2[f2]].align = b2[f2];
      var C2 = c2.call(this, F2, w2);
      L2 = m2.map(function(t2) {
        return new o2(e2, n3, w2[t2], C2, F2[t2].text, void 0, F2[t2].align);
      }), this.setTableHeaderRow(L2), this.printHeaderRow(1, false);
    }
    var j2 = h2.reduce(function(t2, e3) {
      return t2[e3.name] = e3.align, t2;
    }, {});
    for (f2 = 0; f2 < u2.length; f2 += 1) {
      "rowStart" in l2 && l2.rowStart instanceof Function && l2.rowStart({ row: f2, data: u2[f2] }, this);
      var O2 = c2.call(this, u2[f2], w2);
      for (p2 = 0; p2 < m2.length; p2 += 1) {
        var B2 = u2[f2][m2[p2]];
        "cellStart" in l2 && l2.cellStart instanceof Function && l2.cellStart({ row: f2, col: p2, data: B2 }, this), s2.call(this, new o2(e2, n3, w2[m2[p2]], O2, B2, f2 + 2, j2[m2[p2]]));
      }
    }
    return this.internal.__cell__.table_x = e2, this.internal.__cell__.table_y = n3, this;
  };
  var c2 = function(t2, e2) {
    var r2 = this.internal.__cell__.padding, n3 = this.internal.__cell__.table_font_size, i3 = this.internal.scaleFactor;
    return Object.keys(t2).map(function(n4) {
      var i4 = t2[n4];
      return this.splitTextToSize(i4.hasOwnProperty("text") ? i4.text : i4, e2[n4] - r2 - r2);
    }, this).map(function(t3) {
      return this.getLineHeightFactor() * t3.length * n3 / i3 + r2 + r2;
    }, this).reduce(function(t3, e3) {
      return Math.max(t3, e3);
    }, 0);
  };
  e.setTableHeaderRow = function(t2) {
    i2.call(this), this.internal.__cell__.tableHeaderRow = t2;
  }, e.printHeaderRow = function(t2, e2) {
    if (i2.call(this), !this.internal.__cell__.tableHeaderRow) throw new Error("Property tableHeaderRow does not exist.");
    var r2;
    if (n2 = true, "function" == typeof this.internal.__cell__.headerFunction) {
      var a3 = this.internal.__cell__.headerFunction(this, this.internal.__cell__.pages);
      this.internal.__cell__.lastCell = new o2(a3[0], a3[1], a3[2], a3[3], void 0, -1);
    }
    this.setFont(void 0, "bold");
    for (var c3 = [], u2 = 0; u2 < this.internal.__cell__.tableHeaderRow.length; u2 += 1) {
      r2 = this.internal.__cell__.tableHeaderRow[u2].clone(), e2 && (r2.y = this.internal.__cell__.margins.top || 0, c3.push(r2)), r2.lineNumber = t2;
      var h2 = this.getTextColor();
      this.setTextColor(this.internal.__cell__.headerTextColor), this.setFillColor(this.internal.__cell__.headerBackgroundColor), s2.call(this, r2), this.setTextColor(h2);
    }
    c3.length > 0 && this.setTableHeaderRow(c3), this.setFont(void 0, "normal"), n2 = false;
  };
}(E.API);
var Pt = { italic: ["italic", "oblique", "normal"], oblique: ["oblique", "italic", "normal"], normal: ["normal", "oblique", "italic"] }, kt = ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"], It = _t(kt), Ft = [100, 200, 300, 400, 500, 600, 700, 800, 900], Ct = _t(Ft);
function jt(t2) {
  var e = t2.family.replace(/"|'/g, "").toLowerCase(), r = function(t3) {
    return Pt[t3 = t3 || "normal"] ? t3 : "normal";
  }(t2.style), n2 = function(t3) {
    if (!t3) return 400;
    if ("number" == typeof t3) return t3 >= 100 && t3 <= 900 && t3 % 100 == 0 ? t3 : 400;
    if (/^\d00$/.test(t3)) return parseInt(t3);
    switch (t3) {
      case "bold":
        return 700;
      case "normal":
      default:
        return 400;
    }
  }(t2.weight), i2 = function(t3) {
    return "number" == typeof It[t3 = t3 || "normal"] ? t3 : "normal";
  }(t2.stretch);
  return { family: e, style: r, weight: n2, stretch: i2, src: t2.src || [], ref: t2.ref || { name: e, style: [i2, r, n2].join(" ") } };
}
function Ot(t2, e, r, n2) {
  var i2;
  for (i2 = r; i2 >= 0 && i2 < e.length; i2 += n2) if (t2[e[i2]]) return t2[e[i2]];
  for (i2 = r; i2 >= 0 && i2 < e.length; i2 -= n2) if (t2[e[i2]]) return t2[e[i2]];
}
var Bt = { "sans-serif": "helvetica", fixed: "courier", monospace: "courier", terminal: "courier", cursive: "times", fantasy: "times", serif: "times" }, Mt = { caption: "times", icon: "times", menu: "times", "message-box": "times", "small-caption": "times", "status-bar": "times" };
function Et(t2) {
  return [t2.stretch, t2.style, t2.weight, t2.family].join(" ");
}
function qt(t2, e, r) {
  for (var n2 = (r = r || {}).defaultFontFamily || "times", i2 = Object.assign({}, Bt, r.genericFontFamilies || {}), a2 = null, o2 = null, s2 = 0; s2 < e.length; ++s2) if (i2[(a2 = jt(e[s2])).family] && (a2.family = i2[a2.family]), t2.hasOwnProperty(a2.family)) {
    o2 = t2[a2.family];
    break;
  }
  if (!(o2 = o2 || t2[n2])) throw new Error("Could not find a font-family for the rule '" + Et(a2) + "' and default family '" + n2 + "'.");
  if (o2 = function(t3, e2) {
    if (e2[t3]) return e2[t3];
    var r2 = It[t3], n3 = r2 <= It.normal ? -1 : 1, i3 = Ot(e2, kt, r2, n3);
    if (!i3) throw new Error("Could not find a matching font-stretch value for " + t3);
    return i3;
  }(a2.stretch, o2), o2 = function(t3, e2) {
    if (e2[t3]) return e2[t3];
    for (var r2 = Pt[t3], n3 = 0; n3 < r2.length; ++n3) if (e2[r2[n3]]) return e2[r2[n3]];
    throw new Error("Could not find a matching font-style for " + t3);
  }(a2.style, o2), !(o2 = function(t3, e2) {
    if (e2[t3]) return e2[t3];
    if (400 === t3 && e2[500]) return e2[500];
    if (500 === t3 && e2[400]) return e2[400];
    var r2 = Ct[t3], n3 = Ot(e2, Ft, r2, t3 < 400 ? -1 : 1);
    if (!n3) throw new Error("Could not find a matching font-weight for value " + t3);
    return n3;
  }(a2.weight, o2))) throw new Error("Failed to resolve a font for the rule '" + Et(a2) + "'.");
  return o2;
}
function Dt(t2) {
  return t2.trimLeft();
}
function Rt(t2, e) {
  for (var r = 0; r < t2.length; ) {
    if (t2.charAt(r) === e) return [t2.substring(0, r), t2.substring(r + 1)];
    r += 1;
  }
  return null;
}
function Tt(t2) {
  var e = t2.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);
  return null === e ? null : [e[0], t2.substring(e[0].length)];
}
var Ut, zt, Ht, Wt = ["times"];
!function(e) {
  var r, n2, i2, o2, s2, c2, u2, h2, l2, d2 = function(t2) {
    return t2 = t2 || {}, this.isStrokeTransparent = t2.isStrokeTransparent || false, this.strokeOpacity = t2.strokeOpacity || 1, this.strokeStyle = t2.strokeStyle || "#000000", this.fillStyle = t2.fillStyle || "#000000", this.isFillTransparent = t2.isFillTransparent || false, this.fillOpacity = t2.fillOpacity || 1, this.font = t2.font || "10px sans-serif", this.textBaseline = t2.textBaseline || "alphabetic", this.textAlign = t2.textAlign || "left", this.lineWidth = t2.lineWidth || 1, this.lineJoin = t2.lineJoin || "miter", this.lineCap = t2.lineCap || "butt", this.path = t2.path || [], this.transform = void 0 !== t2.transform ? t2.transform.clone() : new h2(), this.globalCompositeOperation = t2.globalCompositeOperation || "normal", this.globalAlpha = t2.globalAlpha || 1, this.clip_path = t2.clip_path || [], this.currentPoint = t2.currentPoint || new c2(), this.miterLimit = t2.miterLimit || 10, this.lastPoint = t2.lastPoint || new c2(), this.lineDashOffset = t2.lineDashOffset || 0, this.lineDash = t2.lineDash || [], this.margin = t2.margin || [0, 0, 0, 0], this.prevPageLastElemOffset = t2.prevPageLastElemOffset || 0, this.ignoreClearRect = "boolean" != typeof t2.ignoreClearRect || t2.ignoreClearRect, this;
  };
  e.events.push(["initialized", function() {
    this.context2d = new p2(this), r = this.internal.f2, n2 = this.internal.getCoordinateString, i2 = this.internal.getVerticalCoordinateString, o2 = this.internal.getHorizontalCoordinate, s2 = this.internal.getVerticalCoordinate, c2 = this.internal.Point, u2 = this.internal.Rectangle, h2 = this.internal.Matrix, l2 = new d2();
  }]);
  var p2 = function(t2) {
    Object.defineProperty(this, "canvas", { get: function() {
      return { parentNode: false, style: false };
    } });
    var e2 = t2;
    Object.defineProperty(this, "pdf", { get: function() {
      return e2;
    } });
    var r2 = false;
    Object.defineProperty(this, "pageWrapXEnabled", { get: function() {
      return r2;
    }, set: function(t3) {
      r2 = Boolean(t3);
    } });
    var n3 = false;
    Object.defineProperty(this, "pageWrapYEnabled", { get: function() {
      return n3;
    }, set: function(t3) {
      n3 = Boolean(t3);
    } });
    var i3 = 0;
    Object.defineProperty(this, "posX", { get: function() {
      return i3;
    }, set: function(t3) {
      isNaN(t3) || (i3 = t3);
    } });
    var a2 = 0;
    Object.defineProperty(this, "posY", { get: function() {
      return a2;
    }, set: function(t3) {
      isNaN(t3) || (a2 = t3);
    } }), Object.defineProperty(this, "margin", { get: function() {
      return l2.margin;
    }, set: function(t3) {
      var e3;
      "number" == typeof t3 ? e3 = [t3, t3, t3, t3] : ((e3 = new Array(4))[0] = t3[0], e3[1] = t3.length >= 2 ? t3[1] : e3[0], e3[2] = t3.length >= 3 ? t3[2] : e3[0], e3[3] = t3.length >= 4 ? t3[3] : e3[1]), l2.margin = e3;
    } });
    var o3 = false;
    Object.defineProperty(this, "autoPaging", { get: function() {
      return o3;
    }, set: function(t3) {
      o3 = t3;
    } });
    var s3 = 0;
    Object.defineProperty(this, "lastBreak", { get: function() {
      return s3;
    }, set: function(t3) {
      s3 = t3;
    } });
    var c3 = [];
    Object.defineProperty(this, "pageBreaks", { get: function() {
      return c3;
    }, set: function(t3) {
      c3 = t3;
    } }), Object.defineProperty(this, "ctx", { get: function() {
      return l2;
    }, set: function(t3) {
      t3 instanceof d2 && (l2 = t3);
    } }), Object.defineProperty(this, "path", { get: function() {
      return l2.path;
    }, set: function(t3) {
      l2.path = t3;
    } });
    var u3 = [];
    Object.defineProperty(this, "ctxStack", { get: function() {
      return u3;
    }, set: function(t3) {
      u3 = t3;
    } }), Object.defineProperty(this, "fillStyle", { get: function() {
      return this.ctx.fillStyle;
    }, set: function(t3) {
      var e3;
      e3 = g2(t3), this.ctx.fillStyle = e3.style, this.ctx.isFillTransparent = 0 === e3.a, this.ctx.fillOpacity = e3.a, this.pdf.setFillColor(e3.r, e3.g, e3.b, { a: e3.a }), this.pdf.setTextColor(e3.r, e3.g, e3.b, { a: e3.a });
    } }), Object.defineProperty(this, "strokeStyle", { get: function() {
      return this.ctx.strokeStyle;
    }, set: function(t3) {
      var e3 = g2(t3);
      this.ctx.strokeStyle = e3.style, this.ctx.isStrokeTransparent = 0 === e3.a, this.ctx.strokeOpacity = e3.a, 0 === e3.a ? this.pdf.setDrawColor(255, 255, 255) : (e3.a, this.pdf.setDrawColor(e3.r, e3.g, e3.b));
    } }), Object.defineProperty(this, "lineCap", { get: function() {
      return this.ctx.lineCap;
    }, set: function(t3) {
      -1 !== ["butt", "round", "square"].indexOf(t3) && (this.ctx.lineCap = t3, this.pdf.setLineCap(t3));
    } }), Object.defineProperty(this, "lineWidth", { get: function() {
      return this.ctx.lineWidth;
    }, set: function(t3) {
      isNaN(t3) || (this.ctx.lineWidth = t3, this.pdf.setLineWidth(t3));
    } }), Object.defineProperty(this, "lineJoin", { get: function() {
      return this.ctx.lineJoin;
    }, set: function(t3) {
      -1 !== ["bevel", "round", "miter"].indexOf(t3) && (this.ctx.lineJoin = t3, this.pdf.setLineJoin(t3));
    } }), Object.defineProperty(this, "miterLimit", { get: function() {
      return this.ctx.miterLimit;
    }, set: function(t3) {
      isNaN(t3) || (this.ctx.miterLimit = t3, this.pdf.setMiterLimit(t3));
    } }), Object.defineProperty(this, "textBaseline", { get: function() {
      return this.ctx.textBaseline;
    }, set: function(t3) {
      this.ctx.textBaseline = t3;
    } }), Object.defineProperty(this, "textAlign", { get: function() {
      return this.ctx.textAlign;
    }, set: function(t3) {
      -1 !== ["right", "end", "center", "left", "start"].indexOf(t3) && (this.ctx.textAlign = t3);
    } });
    var h3 = null;
    function f2(t3, e3) {
      if (null === h3) {
        var r3 = function(t4) {
          var e4 = [];
          return Object.keys(t4).forEach(function(r4) {
            t4[r4].forEach(function(t5) {
              var n4 = null;
              switch (t5) {
                case "bold":
                  n4 = { family: r4, weight: "bold" };
                  break;
                case "italic":
                  n4 = { family: r4, style: "italic" };
                  break;
                case "bolditalic":
                  n4 = { family: r4, weight: "bold", style: "italic" };
                  break;
                case "":
                case "normal":
                  n4 = { family: r4 };
              }
              null !== n4 && (n4.ref = { name: r4, style: t5 }, e4.push(n4));
            });
          }), e4;
        }(t3.getFontList());
        h3 = function(t4) {
          for (var e4 = {}, r4 = 0; r4 < t4.length; ++r4) {
            var n4 = jt(t4[r4]), i4 = n4.family, a3 = n4.stretch, o4 = n4.style, s4 = n4.weight;
            e4[i4] = e4[i4] || {}, e4[i4][a3] = e4[i4][a3] || {}, e4[i4][a3][o4] = e4[i4][a3][o4] || {}, e4[i4][a3][o4][s4] = n4;
          }
          return e4;
        }(r3.concat(e3));
      }
      return h3;
    }
    var p3 = null;
    Object.defineProperty(this, "fontFaces", { get: function() {
      return p3;
    }, set: function(t3) {
      h3 = null, p3 = t3;
    } }), Object.defineProperty(this, "font", { get: function() {
      return this.ctx.font;
    }, set: function(t3) {
      var e3;
      if (this.ctx.font = t3, null !== (e3 = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(t3))) {
        var r3 = e3[1], n4 = (e3[2], e3[3]), i4 = e3[4], a3 = (e3[5], e3[6]), o4 = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(i4)[2];
        i4 = "px" === o4 ? Math.floor(parseFloat(i4) * this.pdf.internal.scaleFactor) : "em" === o4 ? Math.floor(parseFloat(i4) * this.pdf.getFontSize()) : Math.floor(parseFloat(i4) * this.pdf.internal.scaleFactor), this.pdf.setFontSize(i4);
        var s4 = function(t4) {
          var e4, r4, n5 = [], i5 = t4.trim();
          if ("" === i5) return Wt;
          if (i5 in Mt) return [Mt[i5]];
          for (; "" !== i5; ) {
            switch (r4 = null, e4 = (i5 = Dt(i5)).charAt(0)) {
              case '"':
              case "'":
                r4 = Rt(i5.substring(1), e4);
                break;
              default:
                r4 = Tt(i5);
            }
            if (null === r4) return Wt;
            if (n5.push(r4[0]), "" !== (i5 = Dt(r4[1])) && "," !== i5.charAt(0)) return Wt;
            i5 = i5.replace(/^,/, "");
          }
          return n5;
        }(a3);
        if (this.fontFaces) {
          var c4 = qt(f2(this.pdf, this.fontFaces), s4.map(function(t4) {
            return { family: t4, stretch: "normal", weight: n4, style: r3 };
          }));
          this.pdf.setFont(c4.ref.name, c4.ref.style);
        } else {
          var u4 = "";
          ("bold" === n4 || parseInt(n4, 10) >= 700 || "bold" === r3) && (u4 = "bold"), "italic" === r3 && (u4 += "italic"), 0 === u4.length && (u4 = "normal");
          for (var h4 = "", l3 = { arial: "Helvetica", Arial: "Helvetica", verdana: "Helvetica", Verdana: "Helvetica", helvetica: "Helvetica", Helvetica: "Helvetica", "sans-serif": "Helvetica", fixed: "Courier", monospace: "Courier", terminal: "Courier", cursive: "Times", fantasy: "Times", serif: "Times" }, d3 = 0; d3 < s4.length; d3++) {
            if (void 0 !== this.pdf.internal.getFont(s4[d3], u4, { noFallback: true, disableWarning: true })) {
              h4 = s4[d3];
              break;
            }
            if ("bolditalic" === u4 && void 0 !== this.pdf.internal.getFont(s4[d3], "bold", { noFallback: true, disableWarning: true })) h4 = s4[d3], u4 = "bold";
            else if (void 0 !== this.pdf.internal.getFont(s4[d3], "normal", { noFallback: true, disableWarning: true })) {
              h4 = s4[d3], u4 = "normal";
              break;
            }
          }
          if ("" === h4) {
            for (var p4 = 0; p4 < s4.length; p4++) if (l3[s4[p4]]) {
              h4 = l3[s4[p4]];
              break;
            }
          }
          h4 = "" === h4 ? "Times" : h4, this.pdf.setFont(h4, u4);
        }
      }
    } }), Object.defineProperty(this, "globalCompositeOperation", { get: function() {
      return this.ctx.globalCompositeOperation;
    }, set: function(t3) {
      this.ctx.globalCompositeOperation = t3;
    } }), Object.defineProperty(this, "globalAlpha", { get: function() {
      return this.ctx.globalAlpha;
    }, set: function(t3) {
      this.ctx.globalAlpha = t3;
    } }), Object.defineProperty(this, "lineDashOffset", { get: function() {
      return this.ctx.lineDashOffset;
    }, set: function(t3) {
      this.ctx.lineDashOffset = t3, T2.call(this);
    } }), Object.defineProperty(this, "lineDash", { get: function() {
      return this.ctx.lineDash;
    }, set: function(t3) {
      this.ctx.lineDash = t3, T2.call(this);
    } }), Object.defineProperty(this, "ignoreClearRect", { get: function() {
      return this.ctx.ignoreClearRect;
    }, set: function(t3) {
      this.ctx.ignoreClearRect = Boolean(t3);
    } });
  };
  p2.prototype.setLineDash = function(t2) {
    this.lineDash = t2;
  }, p2.prototype.getLineDash = function() {
    return this.lineDash.length % 2 ? this.lineDash.concat(this.lineDash) : this.lineDash.slice();
  }, p2.prototype.fill = function() {
    A2.call(this, "fill", false);
  }, p2.prototype.stroke = function() {
    A2.call(this, "stroke", false);
  }, p2.prototype.beginPath = function() {
    this.path = [{ type: "begin" }];
  }, p2.prototype.moveTo = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw a.error("jsPDF.context2d.moveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.moveTo");
    var r2 = this.ctx.transform.applyToPoint(new c2(t2, e2));
    this.path.push({ type: "mt", x: r2.x, y: r2.y }), this.ctx.lastPoint = new c2(t2, e2);
  }, p2.prototype.closePath = function() {
    var e2 = new c2(0, 0), r2 = 0;
    for (r2 = this.path.length - 1; -1 !== r2; r2--) if ("begin" === this.path[r2].type && "object" === _typeof(this.path[r2 + 1]) && "number" == typeof this.path[r2 + 1].x) {
      e2 = new c2(this.path[r2 + 1].x, this.path[r2 + 1].y);
      break;
    }
    this.path.push({ type: "close" }), this.ctx.lastPoint = new c2(e2.x, e2.y);
  }, p2.prototype.lineTo = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw a.error("jsPDF.context2d.lineTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.lineTo");
    var r2 = this.ctx.transform.applyToPoint(new c2(t2, e2));
    this.path.push({ type: "lt", x: r2.x, y: r2.y }), this.ctx.lastPoint = new c2(r2.x, r2.y);
  }, p2.prototype.clip = function() {
    this.ctx.clip_path = JSON.parse(JSON.stringify(this.path)), A2.call(this, null, true);
  }, p2.prototype.quadraticCurveTo = function(t2, e2, r2, n3) {
    if (isNaN(r2) || isNaN(n3) || isNaN(t2) || isNaN(e2)) throw a.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");
    var i3 = this.ctx.transform.applyToPoint(new c2(r2, n3)), o3 = this.ctx.transform.applyToPoint(new c2(t2, e2));
    this.path.push({ type: "qct", x1: o3.x, y1: o3.y, x: i3.x, y: i3.y }), this.ctx.lastPoint = new c2(i3.x, i3.y);
  }, p2.prototype.bezierCurveTo = function(t2, e2, r2, n3, i3, o3) {
    if (isNaN(i3) || isNaN(o3) || isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3)) throw a.error("jsPDF.context2d.bezierCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");
    var s3 = this.ctx.transform.applyToPoint(new c2(i3, o3)), u3 = this.ctx.transform.applyToPoint(new c2(t2, e2)), h3 = this.ctx.transform.applyToPoint(new c2(r2, n3));
    this.path.push({ type: "bct", x1: u3.x, y1: u3.y, x2: h3.x, y2: h3.y, x: s3.x, y: s3.y }), this.ctx.lastPoint = new c2(s3.x, s3.y);
  }, p2.prototype.arc = function(t2, e2, r2, n3, i3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || isNaN(i3)) throw a.error("jsPDF.context2d.arc: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.arc");
    if (o3 = Boolean(o3), !this.ctx.transform.isIdentity) {
      var s3 = this.ctx.transform.applyToPoint(new c2(t2, e2));
      t2 = s3.x, e2 = s3.y;
      var u3 = this.ctx.transform.applyToPoint(new c2(0, r2)), h3 = this.ctx.transform.applyToPoint(new c2(0, 0));
      r2 = Math.sqrt(Math.pow(u3.x - h3.x, 2) + Math.pow(u3.y - h3.y, 2));
    }
    Math.abs(i3 - n3) >= 2 * Math.PI && (n3 = 0, i3 = 2 * Math.PI), this.path.push({ type: "arc", x: t2, y: e2, radius: r2, startAngle: n3, endAngle: i3, counterclockwise: o3 });
  }, p2.prototype.arcTo = function(t2, e2, r2, n3, i3) {
    throw new Error("arcTo not implemented.");
  }, p2.prototype.rect = function(t2, e2, r2, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3)) throw a.error("jsPDF.context2d.rect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rect");
    this.moveTo(t2, e2), this.lineTo(t2 + r2, e2), this.lineTo(t2 + r2, e2 + n3), this.lineTo(t2, e2 + n3), this.lineTo(t2, e2), this.lineTo(t2 + r2, e2), this.lineTo(t2, e2);
  }, p2.prototype.fillRect = function(t2, e2, r2, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3)) throw a.error("jsPDF.context2d.fillRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillRect");
    if (!m2.call(this)) {
      var i3 = {};
      "butt" !== this.lineCap && (i3.lineCap = this.lineCap, this.lineCap = "butt"), "miter" !== this.lineJoin && (i3.lineJoin = this.lineJoin, this.lineJoin = "miter"), this.beginPath(), this.rect(t2, e2, r2, n3), this.fill(), i3.hasOwnProperty("lineCap") && (this.lineCap = i3.lineCap), i3.hasOwnProperty("lineJoin") && (this.lineJoin = i3.lineJoin);
    }
  }, p2.prototype.strokeRect = function(t2, e2, r2, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3)) throw a.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");
    v2.call(this) || (this.beginPath(), this.rect(t2, e2, r2, n3), this.stroke());
  }, p2.prototype.clearRect = function(t2, e2, r2, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3)) throw a.error("jsPDF.context2d.clearRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.clearRect");
    this.ignoreClearRect || (this.fillStyle = "#ffffff", this.fillRect(t2, e2, r2, n3));
  }, p2.prototype.save = function(t2) {
    t2 = "boolean" != typeof t2 || t2;
    for (var e2 = this.pdf.internal.getCurrentPageInfo().pageNumber, r2 = 0; r2 < this.pdf.internal.getNumberOfPages(); r2++) this.pdf.setPage(r2 + 1), this.pdf.internal.out("q");
    if (this.pdf.setPage(e2), t2) {
      this.ctx.fontSize = this.pdf.internal.getFontSize();
      var n3 = new d2(this.ctx);
      this.ctxStack.push(this.ctx), this.ctx = n3;
    }
  }, p2.prototype.restore = function(t2) {
    t2 = "boolean" != typeof t2 || t2;
    for (var e2 = this.pdf.internal.getCurrentPageInfo().pageNumber, r2 = 0; r2 < this.pdf.internal.getNumberOfPages(); r2++) this.pdf.setPage(r2 + 1), this.pdf.internal.out("Q");
    this.pdf.setPage(e2), t2 && 0 !== this.ctxStack.length && (this.ctx = this.ctxStack.pop(), this.fillStyle = this.ctx.fillStyle, this.strokeStyle = this.ctx.strokeStyle, this.font = this.ctx.font, this.lineCap = this.ctx.lineCap, this.lineWidth = this.ctx.lineWidth, this.lineJoin = this.ctx.lineJoin, this.lineDash = this.ctx.lineDash, this.lineDashOffset = this.ctx.lineDashOffset);
  }, p2.prototype.toDataURL = function() {
    throw new Error("toDataUrl not implemented.");
  };
  var g2 = function(t2) {
    var e2, r2, n3, i3;
    if (true === t2.isCanvasGradient && (t2 = t2.getColor()), !t2) return { r: 0, g: 0, b: 0, a: 0, style: t2 };
    if (/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(t2)) e2 = 0, r2 = 0, n3 = 0, i3 = 0;
    else {
      var a2 = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(t2);
      if (null !== a2) e2 = parseInt(a2[1]), r2 = parseInt(a2[2]), n3 = parseInt(a2[3]), i3 = 1;
      else if (null !== (a2 = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(t2))) e2 = parseInt(a2[1]), r2 = parseInt(a2[2]), n3 = parseInt(a2[3]), i3 = parseFloat(a2[4]);
      else {
        if (i3 = 1, "string" == typeof t2 && "#" !== t2.charAt(0)) {
          var o3 = new f(t2);
          t2 = o3.ok ? o3.toHex() : "#000000";
        }
        4 === t2.length ? (e2 = t2.substring(1, 2), e2 += e2, r2 = t2.substring(2, 3), r2 += r2, n3 = t2.substring(3, 4), n3 += n3) : (e2 = t2.substring(1, 3), r2 = t2.substring(3, 5), n3 = t2.substring(5, 7)), e2 = parseInt(e2, 16), r2 = parseInt(r2, 16), n3 = parseInt(n3, 16);
      }
    }
    return { r: e2, g: r2, b: n3, a: i3, style: t2 };
  }, m2 = function() {
    return this.ctx.isFillTransparent || 0 == this.globalAlpha;
  }, v2 = function() {
    return Boolean(this.ctx.isStrokeTransparent || 0 == this.globalAlpha);
  };
  p2.prototype.fillText = function(t2, e2, r2, n3) {
    if (isNaN(e2) || isNaN(r2) || "string" != typeof t2) throw a.error("jsPDF.context2d.fillText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillText");
    if (n3 = isNaN(n3) ? void 0 : n3, !m2.call(this)) {
      var i3 = q2(this.ctx.transform.rotation), o3 = this.ctx.transform.scaleX;
      C2.call(this, { text: t2, x: e2, y: r2, scale: o3, angle: i3, align: this.textAlign, maxWidth: n3 });
    }
  }, p2.prototype.strokeText = function(t2, e2, r2, n3) {
    if (isNaN(e2) || isNaN(r2) || "string" != typeof t2) throw a.error("jsPDF.context2d.strokeText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeText");
    if (!v2.call(this)) {
      n3 = isNaN(n3) ? void 0 : n3;
      var i3 = q2(this.ctx.transform.rotation), o3 = this.ctx.transform.scaleX;
      C2.call(this, { text: t2, x: e2, y: r2, scale: o3, renderingMode: "stroke", angle: i3, align: this.textAlign, maxWidth: n3 });
    }
  }, p2.prototype.measureText = function(t2) {
    if ("string" != typeof t2) throw a.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");
    var e2 = this.pdf, r2 = this.pdf.internal.scaleFactor, n3 = e2.internal.getFontSize(), i3 = e2.getStringUnitWidth(t2) * n3 / e2.internal.scaleFactor, o3 = function(t3) {
      var e3 = (t3 = t3 || {}).width || 0;
      return Object.defineProperty(this, "width", { get: function() {
        return e3;
      } }), this;
    };
    return new o3({ width: i3 *= Math.round(96 * r2 / 72 * 1e4) / 1e4 });
  }, p2.prototype.scale = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw a.error("jsPDF.context2d.scale: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.scale");
    var r2 = new h2(t2, 0, 0, e2, 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(r2);
  }, p2.prototype.rotate = function(t2) {
    if (isNaN(t2)) throw a.error("jsPDF.context2d.rotate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rotate");
    var e2 = new h2(Math.cos(t2), Math.sin(t2), -Math.sin(t2), Math.cos(t2), 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(e2);
  }, p2.prototype.translate = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw a.error("jsPDF.context2d.translate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.translate");
    var r2 = new h2(1, 0, 0, 1, t2, e2);
    this.ctx.transform = this.ctx.transform.multiply(r2);
  }, p2.prototype.transform = function(t2, e2, r2, n3, i3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || isNaN(i3) || isNaN(o3)) throw a.error("jsPDF.context2d.transform: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.transform");
    var s3 = new h2(t2, e2, r2, n3, i3, o3);
    this.ctx.transform = this.ctx.transform.multiply(s3);
  }, p2.prototype.setTransform = function(t2, e2, r2, n3, i3, a2) {
    t2 = isNaN(t2) ? 1 : t2, e2 = isNaN(e2) ? 0 : e2, r2 = isNaN(r2) ? 0 : r2, n3 = isNaN(n3) ? 1 : n3, i3 = isNaN(i3) ? 0 : i3, a2 = isNaN(a2) ? 0 : a2, this.ctx.transform = new h2(t2, e2, r2, n3, i3, a2);
  };
  var b2 = function() {
    return this.margin[0] > 0 || this.margin[1] > 0 || this.margin[2] > 0 || this.margin[3] > 0;
  };
  p2.prototype.drawImage = function(t2, e2, r2, n3, i3, a2, o3, s3, c3) {
    var l3 = this.pdf.getImageProperties(t2), f2 = 1, d3 = 1, p3 = 1, g3 = 1;
    void 0 !== n3 && void 0 !== s3 && (p3 = s3 / n3, g3 = c3 / i3, f2 = l3.width / n3 * s3 / n3, d3 = l3.height / i3 * c3 / i3), void 0 === a2 && (a2 = e2, o3 = r2, e2 = 0, r2 = 0), void 0 !== n3 && void 0 === s3 && (s3 = n3, c3 = i3), void 0 === n3 && void 0 === s3 && (s3 = l3.width, c3 = l3.height);
    for (var m3, v3 = this.ctx.transform.decompose(), w3 = q2(v3.rotate.shx), A3 = new h2(), S3 = (A3 = (A3 = (A3 = A3.multiply(v3.translate)).multiply(v3.skew)).multiply(v3.scale)).applyToRectangle(new u2(a2 - e2 * p3, o3 - r2 * g3, n3 * f2, i3 * d3)), _3 = y2.call(this, S3), P3 = [], k3 = 0; k3 < _3.length; k3 += 1) -1 === P3.indexOf(_3[k3]) && P3.push(_3[k3]);
    if (L2(P3), this.autoPaging) for (var I3 = P3[0], F3 = P3[P3.length - 1], C3 = I3; C3 < F3 + 1; C3++) {
      this.pdf.setPage(C3);
      var j3 = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], O3 = 1 === C3 ? this.posY + this.margin[0] : this.margin[0], B3 = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], M3 = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], E3 = 1 === C3 ? 0 : B3 + (C3 - 2) * M3;
      if (0 !== this.ctx.clip_path.length) {
        var D3 = this.path;
        m3 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = N2(m3, this.posX + this.margin[3], -E3 + O3 + this.ctx.prevPageLastElemOffset), x2.call(this, "fill", true), this.path = D3;
      }
      var R3 = JSON.parse(JSON.stringify(S3));
      R3 = N2([R3], this.posX + this.margin[3], -E3 + O3 + this.ctx.prevPageLastElemOffset)[0];
      var T3 = (C3 > I3 || C3 < F3) && b2.call(this);
      T3 && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], j3, M3, null).clip().discardPath()), this.pdf.addImage(t2, "JPEG", R3.x, R3.y, R3.w, R3.h, null, null, w3), T3 && this.pdf.restoreGraphicsState();
    }
    else this.pdf.addImage(t2, "JPEG", S3.x, S3.y, S3.w, S3.h, null, null, w3);
  };
  var y2 = function(t2, e2, r2) {
    var n3 = [];
    e2 = e2 || this.pdf.internal.pageSize.width, r2 = r2 || this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2];
    var i3 = this.posY + this.ctx.prevPageLastElemOffset;
    switch (t2.type) {
      default:
      case "mt":
      case "lt":
        n3.push(Math.floor((t2.y + i3) / r2) + 1);
        break;
      case "arc":
        n3.push(Math.floor((t2.y + i3 - t2.radius) / r2) + 1), n3.push(Math.floor((t2.y + i3 + t2.radius) / r2) + 1);
        break;
      case "qct":
        var a2 = D2(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t2.x1, t2.y1, t2.x, t2.y);
        n3.push(Math.floor((a2.y + i3) / r2) + 1), n3.push(Math.floor((a2.y + a2.h + i3) / r2) + 1);
        break;
      case "bct":
        var o3 = R2(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t2.x1, t2.y1, t2.x2, t2.y2, t2.x, t2.y);
        n3.push(Math.floor((o3.y + i3) / r2) + 1), n3.push(Math.floor((o3.y + o3.h + i3) / r2) + 1);
        break;
      case "rect":
        n3.push(Math.floor((t2.y + i3) / r2) + 1), n3.push(Math.floor((t2.y + t2.h + i3) / r2) + 1);
    }
    for (var s3 = 0; s3 < n3.length; s3 += 1) for (; this.pdf.internal.getNumberOfPages() < n3[s3]; ) w2.call(this);
    return n3;
  }, w2 = function() {
    var t2 = this.fillStyle, e2 = this.strokeStyle, r2 = this.font, n3 = this.lineCap, i3 = this.lineWidth, a2 = this.lineJoin;
    this.pdf.addPage(), this.fillStyle = t2, this.strokeStyle = e2, this.font = r2, this.lineCap = n3, this.lineWidth = i3, this.lineJoin = a2;
  }, N2 = function(t2, e2, r2) {
    for (var n3 = 0; n3 < t2.length; n3++) switch (t2[n3].type) {
      case "bct":
        t2[n3].x2 += e2, t2[n3].y2 += r2;
      case "qct":
        t2[n3].x1 += e2, t2[n3].y1 += r2;
      case "mt":
      case "lt":
      case "arc":
      default:
        t2[n3].x += e2, t2[n3].y += r2;
    }
    return t2;
  }, L2 = function(t2) {
    return t2.sort(function(t3, e2) {
      return t3 - e2;
    });
  }, A2 = function(t2, e2) {
    for (var r2, n3, i3 = this.fillStyle, a2 = this.strokeStyle, o3 = this.lineCap, s3 = this.lineWidth, c3 = Math.abs(s3 * this.ctx.transform.scaleX), u3 = this.lineJoin, h3 = JSON.parse(JSON.stringify(this.path)), l3 = JSON.parse(JSON.stringify(this.path)), f2 = [], d3 = 0; d3 < l3.length; d3++) if (void 0 !== l3[d3].x) for (var p3 = y2.call(this, l3[d3]), g3 = 0; g3 < p3.length; g3 += 1) -1 === f2.indexOf(p3[g3]) && f2.push(p3[g3]);
    for (var m3 = 0; m3 < f2.length; m3++) for (; this.pdf.internal.getNumberOfPages() < f2[m3]; ) w2.call(this);
    if (L2(f2), this.autoPaging) for (var v3 = f2[0], A3 = f2[f2.length - 1], S3 = v3; S3 < A3 + 1; S3++) {
      this.pdf.setPage(S3), this.fillStyle = i3, this.strokeStyle = a2, this.lineCap = o3, this.lineWidth = c3, this.lineJoin = u3;
      var _3 = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], P3 = 1 === S3 ? this.posY + this.margin[0] : this.margin[0], k3 = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], I3 = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], F3 = 1 === S3 ? 0 : k3 + (S3 - 2) * I3;
      if (0 !== this.ctx.clip_path.length) {
        var C3 = this.path;
        r2 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = N2(r2, this.posX + this.margin[3], -F3 + P3 + this.ctx.prevPageLastElemOffset), x2.call(this, t2, true), this.path = C3;
      }
      if (n3 = JSON.parse(JSON.stringify(h3)), this.path = N2(n3, this.posX + this.margin[3], -F3 + P3 + this.ctx.prevPageLastElemOffset), false === e2 || 0 === S3) {
        var j3 = (S3 > v3 || S3 < A3) && b2.call(this);
        j3 && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], _3, I3, null).clip().discardPath()), x2.call(this, t2, e2), j3 && this.pdf.restoreGraphicsState();
      }
      this.lineWidth = s3;
    }
    else this.lineWidth = c3, x2.call(this, t2, e2), this.lineWidth = s3;
    this.path = h3;
  }, x2 = function(t2, e2) {
    if (("stroke" !== t2 || e2 || !v2.call(this)) && ("stroke" === t2 || e2 || !m2.call(this))) {
      for (var r2, n3, i3 = [], a2 = this.path, o3 = 0; o3 < a2.length; o3++) {
        var s3 = a2[o3];
        switch (s3.type) {
          case "begin":
            i3.push({ begin: true });
            break;
          case "close":
            i3.push({ close: true });
            break;
          case "mt":
            i3.push({ start: s3, deltas: [], abs: [] });
            break;
          case "lt":
            var c3 = i3.length;
            if (a2[o3 - 1] && !isNaN(a2[o3 - 1].x) && (r2 = [s3.x - a2[o3 - 1].x, s3.y - a2[o3 - 1].y], c3 > 0)) {
              for (; c3 >= 0; c3--) if (true !== i3[c3 - 1].close && true !== i3[c3 - 1].begin) {
                i3[c3 - 1].deltas.push(r2), i3[c3 - 1].abs.push(s3);
                break;
              }
            }
            break;
          case "bct":
            r2 = [s3.x1 - a2[o3 - 1].x, s3.y1 - a2[o3 - 1].y, s3.x2 - a2[o3 - 1].x, s3.y2 - a2[o3 - 1].y, s3.x - a2[o3 - 1].x, s3.y - a2[o3 - 1].y], i3[i3.length - 1].deltas.push(r2);
            break;
          case "qct":
            var u3 = a2[o3 - 1].x + 2 / 3 * (s3.x1 - a2[o3 - 1].x), h3 = a2[o3 - 1].y + 2 / 3 * (s3.y1 - a2[o3 - 1].y), l3 = s3.x + 2 / 3 * (s3.x1 - s3.x), f2 = s3.y + 2 / 3 * (s3.y1 - s3.y), d3 = s3.x, p3 = s3.y;
            r2 = [u3 - a2[o3 - 1].x, h3 - a2[o3 - 1].y, l3 - a2[o3 - 1].x, f2 - a2[o3 - 1].y, d3 - a2[o3 - 1].x, p3 - a2[o3 - 1].y], i3[i3.length - 1].deltas.push(r2);
            break;
          case "arc":
            i3.push({ deltas: [], abs: [], arc: true }), Array.isArray(i3[i3.length - 1].abs) && i3[i3.length - 1].abs.push(s3);
        }
      }
      n3 = e2 ? null : "stroke" === t2 ? "stroke" : "fill";
      for (var g3 = false, b3 = 0; b3 < i3.length; b3++) if (i3[b3].arc) for (var y3 = i3[b3].abs, w3 = 0; w3 < y3.length; w3++) {
        var N3 = y3[w3];
        "arc" === N3.type ? P2.call(this, N3.x, N3.y, N3.radius, N3.startAngle, N3.endAngle, N3.counterclockwise, void 0, e2, !g3) : j2.call(this, N3.x, N3.y), g3 = true;
      }
      else if (true === i3[b3].close) this.pdf.internal.out("h"), g3 = false;
      else if (true !== i3[b3].begin) {
        var L3 = i3[b3].start.x, A3 = i3[b3].start.y;
        O2.call(this, i3[b3].deltas, L3, A3), g3 = true;
      }
      n3 && k2.call(this, n3), e2 && I2.call(this);
    }
  }, S2 = function(t2) {
    var e2 = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor, r2 = e2 * (this.pdf.internal.getLineHeightFactor() - 1);
    switch (this.ctx.textBaseline) {
      case "bottom":
        return t2 - r2;
      case "top":
        return t2 + e2 - r2;
      case "hanging":
        return t2 + e2 - 2 * r2;
      case "middle":
        return t2 + e2 / 2 - r2;
      case "ideographic":
        return t2;
      case "alphabetic":
      default:
        return t2;
    }
  }, _2 = function(t2) {
    return t2 + this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor * (this.pdf.internal.getLineHeightFactor() - 1);
  };
  p2.prototype.createLinearGradient = function() {
    var t2 = function() {
    };
    return t2.colorStops = [], t2.addColorStop = function(t3, e2) {
      this.colorStops.push([t3, e2]);
    }, t2.getColor = function() {
      return 0 === this.colorStops.length ? "#000000" : this.colorStops[0][1];
    }, t2.isCanvasGradient = true, t2;
  }, p2.prototype.createPattern = function() {
    return this.createLinearGradient();
  }, p2.prototype.createRadialGradient = function() {
    return this.createLinearGradient();
  };
  var P2 = function(t2, e2, r2, n3, i3, a2, o3, s3, c3) {
    for (var u3 = M2.call(this, r2, n3, i3, a2), h3 = 0; h3 < u3.length; h3++) {
      var l3 = u3[h3];
      0 === h3 && (c3 ? F2.call(this, l3.x1 + t2, l3.y1 + e2) : j2.call(this, l3.x1 + t2, l3.y1 + e2)), B2.call(this, t2, e2, l3.x2, l3.y2, l3.x3, l3.y3, l3.x4, l3.y4);
    }
    s3 ? I2.call(this) : k2.call(this, o3);
  }, k2 = function(t2) {
    switch (t2) {
      case "stroke":
        this.pdf.internal.out("S");
        break;
      case "fill":
        this.pdf.internal.out("f");
    }
  }, I2 = function() {
    this.pdf.clip(), this.pdf.discardPath();
  }, F2 = function(t2, e2) {
    this.pdf.internal.out(n2(t2) + " " + i2(e2) + " m");
  }, C2 = function(t2) {
    var e2;
    switch (t2.align) {
      case "right":
      case "end":
        e2 = "right";
        break;
      case "center":
        e2 = "center";
        break;
      case "left":
      case "start":
      default:
        e2 = "left";
    }
    var r2 = this.pdf.getTextDimensions(t2.text), n3 = S2.call(this, t2.y), i3 = _2.call(this, n3) - r2.h, a2 = this.ctx.transform.applyToPoint(new c2(t2.x, n3)), o3 = this.ctx.transform.decompose(), s3 = new h2();
    s3 = (s3 = (s3 = s3.multiply(o3.translate)).multiply(o3.skew)).multiply(o3.scale);
    for (var l3, f2, d3, p3 = this.ctx.transform.applyToRectangle(new u2(t2.x, n3, r2.w, r2.h)), g3 = s3.applyToRectangle(new u2(t2.x, i3, r2.w, r2.h)), m3 = y2.call(this, g3), v3 = [], w3 = 0; w3 < m3.length; w3 += 1) -1 === v3.indexOf(m3[w3]) && v3.push(m3[w3]);
    if (L2(v3), this.autoPaging) for (var A3 = v3[0], P3 = v3[v3.length - 1], k3 = A3; k3 < P3 + 1; k3++) {
      this.pdf.setPage(k3);
      var I3 = 1 === k3 ? this.posY + this.margin[0] : this.margin[0], F3 = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], C3 = this.pdf.internal.pageSize.height - this.margin[2], j3 = C3 - this.margin[0], O3 = this.pdf.internal.pageSize.width - this.margin[1], B3 = O3 - this.margin[3], M3 = 1 === k3 ? 0 : F3 + (k3 - 2) * j3;
      if (0 !== this.ctx.clip_path.length) {
        var E3 = this.path;
        l3 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = N2(l3, this.posX + this.margin[3], -1 * M3 + I3), x2.call(this, "fill", true), this.path = E3;
      }
      var q3 = N2([JSON.parse(JSON.stringify(g3))], this.posX + this.margin[3], -M3 + I3 + this.ctx.prevPageLastElemOffset)[0];
      t2.scale >= 0.01 && (f2 = this.pdf.internal.getFontSize(), this.pdf.setFontSize(f2 * t2.scale), d3 = this.lineWidth, this.lineWidth = d3 * t2.scale);
      var D3 = "text" !== this.autoPaging;
      if (D3 || q3.y + q3.h <= C3) {
        if (D3 || q3.y >= I3 && q3.x <= O3) {
          var R3 = D3 ? t2.text : this.pdf.splitTextToSize(t2.text, t2.maxWidth || O3 - q3.x)[0], T3 = N2([JSON.parse(JSON.stringify(p3))], this.posX + this.margin[3], -M3 + I3 + this.ctx.prevPageLastElemOffset)[0], U2 = D3 && (k3 > A3 || k3 < P3) && b2.call(this);
          U2 && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], B3, j3, null).clip().discardPath()), this.pdf.text(R3, T3.x, T3.y, { angle: t2.angle, align: e2, renderingMode: t2.renderingMode }), U2 && this.pdf.restoreGraphicsState();
        }
      } else q3.y < C3 && (this.ctx.prevPageLastElemOffset += C3 - q3.y);
      t2.scale >= 0.01 && (this.pdf.setFontSize(f2), this.lineWidth = d3);
    }
    else t2.scale >= 0.01 && (f2 = this.pdf.internal.getFontSize(), this.pdf.setFontSize(f2 * t2.scale), d3 = this.lineWidth, this.lineWidth = d3 * t2.scale), this.pdf.text(t2.text, a2.x + this.posX, a2.y + this.posY, { angle: t2.angle, align: e2, renderingMode: t2.renderingMode, maxWidth: t2.maxWidth }), t2.scale >= 0.01 && (this.pdf.setFontSize(f2), this.lineWidth = d3);
  }, j2 = function(t2, e2, r2, a2) {
    r2 = r2 || 0, a2 = a2 || 0, this.pdf.internal.out(n2(t2 + r2) + " " + i2(e2 + a2) + " l");
  }, O2 = function(t2, e2, r2) {
    return this.pdf.lines(t2, e2, r2, null, null);
  }, B2 = function(t2, e2, n3, i3, a2, c3, u3, h3) {
    this.pdf.internal.out([r(o2(n3 + t2)), r(s2(i3 + e2)), r(o2(a2 + t2)), r(s2(c3 + e2)), r(o2(u3 + t2)), r(s2(h3 + e2)), "c"].join(" "));
  }, M2 = function(t2, e2, r2, n3) {
    for (var i3 = 2 * Math.PI, a2 = Math.PI / 2; e2 > r2; ) e2 -= i3;
    var o3 = Math.abs(r2 - e2);
    o3 < i3 && n3 && (o3 = i3 - o3);
    for (var s3 = [], c3 = n3 ? -1 : 1, u3 = e2; o3 > 1e-5; ) {
      var h3 = u3 + c3 * Math.min(o3, a2);
      s3.push(E2.call(this, t2, u3, h3)), o3 -= Math.abs(h3 - u3), u3 = h3;
    }
    return s3;
  }, E2 = function(t2, e2, r2) {
    var n3 = (r2 - e2) / 2, i3 = t2 * Math.cos(n3), a2 = t2 * Math.sin(n3), o3 = i3, s3 = -a2, c3 = o3 * o3 + s3 * s3, u3 = c3 + o3 * i3 + s3 * a2, h3 = 4 / 3 * (Math.sqrt(2 * c3 * u3) - u3) / (o3 * a2 - s3 * i3), l3 = o3 - h3 * s3, f2 = s3 + h3 * o3, d3 = l3, p3 = -f2, g3 = n3 + e2, m3 = Math.cos(g3), v3 = Math.sin(g3);
    return { x1: t2 * Math.cos(e2), y1: t2 * Math.sin(e2), x2: l3 * m3 - f2 * v3, y2: l3 * v3 + f2 * m3, x3: d3 * m3 - p3 * v3, y3: d3 * v3 + p3 * m3, x4: t2 * Math.cos(r2), y4: t2 * Math.sin(r2) };
  }, q2 = function(t2) {
    return 180 * t2 / Math.PI;
  }, D2 = function(t2, e2, r2, n3, i3, a2) {
    var o3 = t2 + 0.5 * (r2 - t2), s3 = e2 + 0.5 * (n3 - e2), c3 = i3 + 0.5 * (r2 - i3), h3 = a2 + 0.5 * (n3 - a2), l3 = Math.min(t2, i3, o3, c3), f2 = Math.max(t2, i3, o3, c3), d3 = Math.min(e2, a2, s3, h3), p3 = Math.max(e2, a2, s3, h3);
    return new u2(l3, d3, f2 - l3, p3 - d3);
  }, R2 = function(t2, e2, r2, n3, i3, a2, o3, s3) {
    var c3, h3, l3, f2, d3, p3, g3, m3, v3, b3, y3, w3, N3, L3, A3 = r2 - t2, x3 = n3 - e2, S3 = i3 - r2, _3 = a2 - n3, P3 = o3 - i3, k3 = s3 - a2;
    for (h3 = 0; h3 < 41; h3++) v3 = (g3 = (l3 = t2 + (c3 = h3 / 40) * A3) + c3 * ((d3 = r2 + c3 * S3) - l3)) + c3 * (d3 + c3 * (i3 + c3 * P3 - d3) - g3), b3 = (m3 = (f2 = e2 + c3 * x3) + c3 * ((p3 = n3 + c3 * _3) - f2)) + c3 * (p3 + c3 * (a2 + c3 * k3 - p3) - m3), 0 == h3 ? (y3 = v3, w3 = b3, N3 = v3, L3 = b3) : (y3 = Math.min(y3, v3), w3 = Math.min(w3, b3), N3 = Math.max(N3, v3), L3 = Math.max(L3, b3));
    return new u2(Math.round(y3), Math.round(w3), Math.round(N3 - y3), Math.round(L3 - w3));
  }, T2 = function() {
    if (this.prevLineDash || this.ctx.lineDash.length || this.ctx.lineDashOffset) {
      var t2, e2, r2 = (t2 = this.ctx.lineDash, e2 = this.ctx.lineDashOffset, JSON.stringify({ lineDash: t2, lineDashOffset: e2 }));
      this.prevLineDash !== r2 && (this.pdf.setLineDash(this.ctx.lineDash, this.ctx.lineDashOffset), this.prevLineDash = r2);
    }
  };
}(E.API), /**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var r = function(t3) {
    var e, r2, n3, i3, a3, o2, s2, c2, u2, h2;
    for (r2 = [], n3 = 0, i3 = (t3 += e = "\0\0\0\0".slice(t3.length % 4 || 4)).length; i3 > n3; n3 += 4) 0 !== (a3 = (t3.charCodeAt(n3) << 24) + (t3.charCodeAt(n3 + 1) << 16) + (t3.charCodeAt(n3 + 2) << 8) + t3.charCodeAt(n3 + 3)) ? (o2 = (a3 = ((a3 = ((a3 = ((a3 = (a3 - (h2 = a3 % 85)) / 85) - (u2 = a3 % 85)) / 85) - (c2 = a3 % 85)) / 85) - (s2 = a3 % 85)) / 85) % 85, r2.push(o2 + 33, s2 + 33, c2 + 33, u2 + 33, h2 + 33)) : r2.push(122);
    return function(t4, e2) {
      for (var r3 = e2; r3 > 0; r3--) t4.pop();
    }(r2, e.length), String.fromCharCode.apply(String, r2) + "~>";
  }, n2 = function(t3) {
    var e, r2, n3, i3, a3, o2 = String, s2 = "length", c2 = 255, u2 = "charCodeAt", h2 = "slice", l2 = "replace";
    for (t3[h2](-2), t3 = t3[h2](0, -2)[l2](/\s/g, "")[l2]("z", "!!!!!"), n3 = [], i3 = 0, a3 = (t3 += e = "uuuuu"[h2](t3[s2] % 5 || 5))[s2]; a3 > i3; i3 += 5) r2 = 52200625 * (t3[u2](i3) - 33) + 614125 * (t3[u2](i3 + 1) - 33) + 7225 * (t3[u2](i3 + 2) - 33) + 85 * (t3[u2](i3 + 3) - 33) + (t3[u2](i3 + 4) - 33), n3.push(c2 & r2 >> 24, c2 & r2 >> 16, c2 & r2 >> 8, c2 & r2);
    return function(t4, e2) {
      for (var r3 = e2; r3 > 0; r3--) t4.pop();
    }(n3, e[s2]), o2.fromCharCode.apply(o2, n3);
  }, i2 = function(t3) {
    var e = new RegExp(/^([0-9A-Fa-f]{2})+$/);
    if (-1 !== (t3 = t3.replace(/\s/g, "")).indexOf(">") && (t3 = t3.substr(0, t3.indexOf(">"))), t3.length % 2 && (t3 += "0"), false === e.test(t3)) return "";
    for (var r2 = "", n3 = 0; n3 < t3.length; n3 += 2) r2 += String.fromCharCode("0x" + (t3[n3] + t3[n3 + 1]));
    return r2;
  }, a2 = function(t3) {
    for (var r2 = new Uint8Array(t3.length), n3 = t3.length; n3--; ) r2[n3] = t3.charCodeAt(n3);
    return t3 = (r2 = zlibSync(r2)).reduce(function(t4, e) {
      return t4 + String.fromCharCode(e);
    }, "");
  };
  t2.processDataByFilters = function(t3, e) {
    var o2 = 0, s2 = t3 || "", c2 = [];
    for ("string" == typeof (e = e || []) && (e = [e]), o2 = 0; o2 < e.length; o2 += 1) switch (e[o2]) {
      case "ASCII85Decode":
      case "/ASCII85Decode":
        s2 = n2(s2), c2.push("/ASCII85Encode");
        break;
      case "ASCII85Encode":
      case "/ASCII85Encode":
        s2 = r(s2), c2.push("/ASCII85Decode");
        break;
      case "ASCIIHexDecode":
      case "/ASCIIHexDecode":
        s2 = i2(s2), c2.push("/ASCIIHexEncode");
        break;
      case "ASCIIHexEncode":
      case "/ASCIIHexEncode":
        s2 = s2.split("").map(function(t4) {
          return ("0" + t4.charCodeAt().toString(16)).slice(-2);
        }).join("") + ">", c2.push("/ASCIIHexDecode");
        break;
      case "FlateEncode":
      case "/FlateEncode":
        s2 = a2(s2), c2.push("/FlateDecode");
        break;
      default:
        throw new Error('The filter: "' + e[o2] + '" is not implemented');
    }
    return { data: s2, reverseChain: c2.reverse().join(" ") };
  };
}(E.API), /**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  t2.loadFile = function(t3, e, r) {
    return function(t4, e2, r2) {
      e2 = false !== e2, r2 = "function" == typeof r2 ? r2 : function() {
      };
      var n2 = void 0;
      try {
        n2 = function(t5, e3, r3) {
          var n3 = new XMLHttpRequest(), i2 = 0, a2 = function(t6) {
            var e4 = t6.length, r4 = [], n4 = String.fromCharCode;
            for (i2 = 0; i2 < e4; i2 += 1) r4.push(n4(255 & t6.charCodeAt(i2)));
            return r4.join("");
          };
          if (n3.open("GET", t5, !e3), n3.overrideMimeType("text/plain; charset=x-user-defined"), false === e3 && (n3.onload = function() {
            200 === n3.status ? r3(a2(this.responseText)) : r3(void 0);
          }), n3.send(null), e3 && 200 === n3.status) return a2(n3.responseText);
        }(t4, e2, r2);
      } catch (t5) {
      }
      return n2;
    }(t3, e, r);
  }, t2.loadImageFile = t2.loadFile;
}(E.API), function(e) {
  function r() {
    return (n.html2canvas ? Promise.resolve(n.html2canvas) : __vitePreload(() => import("../chunks/html2canvas.esm-Dtsxr8dG.js"), true ? [] : void 0)).catch(function(t2) {
      return Promise.reject(new Error("Could not load html2canvas: " + t2));
    }).then(function(t2) {
      return t2.default ? t2.default : t2;
    });
  }
  function i2() {
    return (n.DOMPurify ? Promise.resolve(n.DOMPurify) : __vitePreload(() => import("../chunks/purify.es-Dawv1_O2.js"), true ? [] : void 0)).catch(function(t2) {
      return Promise.reject(new Error("Could not load dompurify: " + t2));
    }).then(function(t2) {
      return t2.default ? t2.default : t2;
    });
  }
  var a2 = function(e2) {
    var r2 = _typeof(e2);
    return "undefined" === r2 ? "undefined" : "string" === r2 || e2 instanceof String ? "string" : "number" === r2 || e2 instanceof Number ? "number" : "function" === r2 || e2 instanceof Function ? "function" : e2 && e2.constructor === Array ? "array" : e2 && 1 === e2.nodeType ? "element" : "object" === r2 ? "object" : "unknown";
  }, o2 = function(t2, e2) {
    var r2 = document.createElement(t2);
    for (var n2 in e2.className && (r2.className = e2.className), e2.innerHTML && e2.dompurify && (r2.innerHTML = e2.dompurify.sanitize(e2.innerHTML)), e2.style) r2.style[n2] = e2.style[n2];
    return r2;
  }, s2 = function t2(e2) {
    var r2 = Object.assign(t2.convert(Promise.resolve()), JSON.parse(JSON.stringify(t2.template))), n2 = t2.convert(Promise.resolve(), r2);
    return n2 = (n2 = n2.setProgress(1, t2, 1, [t2])).set(e2);
  };
  (s2.prototype = Object.create(Promise.prototype)).constructor = s2, s2.convert = function(t2, e2) {
    return t2.__proto__ = e2 || s2.prototype, t2;
  }, s2.template = { prop: { src: null, container: null, overlay: null, canvas: null, img: null, pdf: null, pageSize: null, callback: function() {
  } }, progress: { val: 0, state: null, n: 0, stack: [] }, opt: { filename: "file.pdf", margin: [0, 0, 0, 0], enableLinks: true, x: 0, y: 0, html2canvas: {}, jsPDF: {}, backgroundColor: "transparent" } }, s2.prototype.from = function(t2, e2) {
    return this.then(function() {
      switch (e2 = e2 || function(t3) {
        switch (a2(t3)) {
          case "string":
            return "string";
          case "element":
            return "canvas" === t3.nodeName.toLowerCase() ? "canvas" : "element";
          default:
            return "unknown";
        }
      }(t2)) {
        case "string":
          return this.then(i2).then(function(e3) {
            return this.set({ src: o2("div", { innerHTML: t2, dompurify: e3 }) });
          });
        case "element":
          return this.set({ src: t2 });
        case "canvas":
          return this.set({ canvas: t2 });
        case "img":
          return this.set({ img: t2 });
        default:
          return this.error("Unknown source type.");
      }
    });
  }, s2.prototype.to = function(t2) {
    switch (t2) {
      case "container":
        return this.toContainer();
      case "canvas":
        return this.toCanvas();
      case "img":
        return this.toImg();
      case "pdf":
        return this.toPdf();
      default:
        return this.error("Invalid target.");
    }
  }, s2.prototype.toContainer = function() {
    return this.thenList([function() {
      return this.prop.src || this.error("Cannot duplicate - no source HTML.");
    }, function() {
      return this.prop.pageSize || this.setPageSize();
    }]).then(function() {
      var t2 = { position: "relative", display: "inline-block", width: ("number" != typeof this.opt.width || isNaN(this.opt.width) || "number" != typeof this.opt.windowWidth || isNaN(this.opt.windowWidth) ? Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) : this.opt.windowWidth) + "px", left: 0, right: 0, top: 0, margin: "auto", backgroundColor: this.opt.backgroundColor }, e2 = function t3(e3, r2) {
        for (var n2 = 3 === e3.nodeType ? document.createTextNode(e3.nodeValue) : e3.cloneNode(false), i3 = e3.firstChild; i3; i3 = i3.nextSibling) true !== r2 && 1 === i3.nodeType && "SCRIPT" === i3.nodeName || n2.appendChild(t3(i3, r2));
        return 1 === e3.nodeType && ("CANVAS" === e3.nodeName ? (n2.width = e3.width, n2.height = e3.height, n2.getContext("2d").drawImage(e3, 0, 0)) : "TEXTAREA" !== e3.nodeName && "SELECT" !== e3.nodeName || (n2.value = e3.value), n2.addEventListener("load", function() {
          n2.scrollTop = e3.scrollTop, n2.scrollLeft = e3.scrollLeft;
        }, true)), n2;
      }(this.prop.src, this.opt.html2canvas.javascriptEnabled);
      "BODY" === e2.tagName && (t2.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + "px"), this.prop.overlay = o2("div", { className: "html2pdf__overlay", style: { position: "fixed", overflow: "hidden", zIndex: 1e3, left: "-100000px", right: 0, bottom: 0, top: 0 } }), this.prop.container = o2("div", { className: "html2pdf__container", style: t2 }), this.prop.container.appendChild(e2), this.prop.container.firstChild.appendChild(o2("div", { style: { clear: "both", border: "0 none transparent", margin: 0, padding: 0, height: 0 } })), this.prop.container.style.float = "none", this.prop.overlay.appendChild(this.prop.container), document.body.appendChild(this.prop.overlay), this.prop.container.firstChild.style.position = "relative", this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + "px";
    });
  }, s2.prototype.toCanvas = function() {
    var t2 = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t2).then(r).then(function(t3) {
      var e2 = Object.assign({}, this.opt.html2canvas);
      return delete e2.onrendered, t3(this.prop.container, e2);
    }).then(function(t3) {
      (this.opt.html2canvas.onrendered || function() {
      })(t3), this.prop.canvas = t3, document.body.removeChild(this.prop.overlay);
    });
  }, s2.prototype.toContext2d = function() {
    var t2 = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t2).then(r).then(function(t3) {
      var e2 = this.opt.jsPDF, r2 = this.opt.fontFaces, n2 = "number" != typeof this.opt.width || isNaN(this.opt.width) || "number" != typeof this.opt.windowWidth || isNaN(this.opt.windowWidth) ? 1 : this.opt.width / this.opt.windowWidth, i3 = Object.assign({ async: true, allowTaint: true, scale: n2, scrollX: this.opt.scrollX || 0, scrollY: this.opt.scrollY || 0, backgroundColor: "#ffffff", imageTimeout: 15e3, logging: true, proxy: null, removeContainer: true, foreignObjectRendering: false, useCORS: false }, this.opt.html2canvas);
      if (delete i3.onrendered, e2.context2d.autoPaging = void 0 === this.opt.autoPaging || this.opt.autoPaging, e2.context2d.posX = this.opt.x, e2.context2d.posY = this.opt.y, e2.context2d.margin = this.opt.margin, e2.context2d.fontFaces = r2, r2) for (var a3 = 0; a3 < r2.length; ++a3) {
        var o3 = r2[a3], s3 = o3.src.find(function(t4) {
          return "truetype" === t4.format;
        });
        s3 && e2.addFont(s3.url, o3.ref.name, o3.ref.style);
      }
      return i3.windowHeight = i3.windowHeight || 0, i3.windowHeight = 0 == i3.windowHeight ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : i3.windowHeight, e2.context2d.save(true), t3(this.prop.container, i3);
    }).then(function(t3) {
      this.opt.jsPDF.context2d.restore(true), (this.opt.html2canvas.onrendered || function() {
      })(t3), this.prop.canvas = t3, document.body.removeChild(this.prop.overlay);
    });
  }, s2.prototype.toImg = function() {
    return this.thenList([function() {
      return this.prop.canvas || this.toCanvas();
    }]).then(function() {
      var t2 = this.prop.canvas.toDataURL("image/" + this.opt.image.type, this.opt.image.quality);
      this.prop.img = document.createElement("img"), this.prop.img.src = t2;
    });
  }, s2.prototype.toPdf = function() {
    return this.thenList([function() {
      return this.toContext2d();
    }]).then(function() {
      this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
    });
  }, s2.prototype.output = function(t2, e2, r2) {
    return "img" === (r2 = r2 || "pdf").toLowerCase() || "image" === r2.toLowerCase() ? this.outputImg(t2, e2) : this.outputPdf(t2, e2);
  }, s2.prototype.outputPdf = function(t2, e2) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      return this.prop.pdf.output(t2, e2);
    });
  }, s2.prototype.outputImg = function(t2) {
    return this.thenList([function() {
      return this.prop.img || this.toImg();
    }]).then(function() {
      switch (t2) {
        case void 0:
        case "img":
          return this.prop.img;
        case "datauristring":
        case "dataurlstring":
          return this.prop.img.src;
        case "datauri":
        case "dataurl":
          return document.location.href = this.prop.img.src;
        default:
          throw 'Image output type "' + t2 + '" is not supported.';
      }
    });
  }, s2.prototype.save = function(t2) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).set(t2 ? { filename: t2 } : null).then(function() {
      this.prop.pdf.save(this.opt.filename);
    });
  }, s2.prototype.doCallback = function() {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      this.prop.callback(this.prop.pdf);
    });
  }, s2.prototype.set = function(t2) {
    if ("object" !== a2(t2)) return this;
    var e2 = Object.keys(t2 || {}).map(function(e3) {
      if (e3 in s2.template.prop) return function() {
        this.prop[e3] = t2[e3];
      };
      switch (e3) {
        case "margin":
          return this.setMargin.bind(this, t2.margin);
        case "jsPDF":
          return function() {
            return this.opt.jsPDF = t2.jsPDF, this.setPageSize();
          };
        case "pageSize":
          return this.setPageSize.bind(this, t2.pageSize);
        default:
          return function() {
            this.opt[e3] = t2[e3];
          };
      }
    }, this);
    return this.then(function() {
      return this.thenList(e2);
    });
  }, s2.prototype.get = function(t2, e2) {
    return this.then(function() {
      var r2 = t2 in s2.template.prop ? this.prop[t2] : this.opt[t2];
      return e2 ? e2(r2) : r2;
    });
  }, s2.prototype.setMargin = function(t2) {
    return this.then(function() {
      switch (a2(t2)) {
        case "number":
          t2 = [t2, t2, t2, t2];
        case "array":
          if (2 === t2.length && (t2 = [t2[0], t2[1], t2[0], t2[1]]), 4 === t2.length) break;
        default:
          return this.error("Invalid margin array.");
      }
      this.opt.margin = t2;
    }).then(this.setPageSize);
  }, s2.prototype.setPageSize = function(t2) {
    function e2(t3, e3) {
      return Math.floor(t3 * e3 / 72 * 96);
    }
    return this.then(function() {
      (t2 = t2 || E.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") || (t2.inner = { width: t2.width - this.opt.margin[1] - this.opt.margin[3], height: t2.height - this.opt.margin[0] - this.opt.margin[2] }, t2.inner.px = { width: e2(t2.inner.width, t2.k), height: e2(t2.inner.height, t2.k) }, t2.inner.ratio = t2.inner.height / t2.inner.width), this.prop.pageSize = t2;
    });
  }, s2.prototype.setProgress = function(t2, e2, r2, n2) {
    return null != t2 && (this.progress.val = t2), null != e2 && (this.progress.state = e2), null != r2 && (this.progress.n = r2), null != n2 && (this.progress.stack = n2), this.progress.ratio = this.progress.val / this.progress.state, this;
  }, s2.prototype.updateProgress = function(t2, e2, r2, n2) {
    return this.setProgress(t2 ? this.progress.val + t2 : null, e2 || null, r2 ? this.progress.n + r2 : null, n2 ? this.progress.stack.concat(n2) : null);
  }, s2.prototype.then = function(t2, e2) {
    var r2 = this;
    return this.thenCore(t2, e2, function(t3, e3) {
      return r2.updateProgress(null, null, 1, [t3]), Promise.prototype.then.call(this, function(e4) {
        return r2.updateProgress(null, t3), e4;
      }).then(t3, e3).then(function(t4) {
        return r2.updateProgress(1), t4;
      });
    });
  }, s2.prototype.thenCore = function(t2, e2, r2) {
    r2 = r2 || Promise.prototype.then;
    t2 && (t2 = t2.bind(this)), e2 && (e2 = e2.bind(this));
    var n2 = -1 !== Promise.toString().indexOf("[native code]") && "Promise" === Promise.name ? this : s2.convert(Object.assign({}, this), Promise.prototype), i3 = r2.call(n2, t2, e2);
    return s2.convert(i3, this.__proto__);
  }, s2.prototype.thenExternal = function(t2, e2) {
    return Promise.prototype.then.call(this, t2, e2);
  }, s2.prototype.thenList = function(t2) {
    var e2 = this;
    return t2.forEach(function(t3) {
      e2 = e2.thenCore(t3);
    }), e2;
  }, s2.prototype.catch = function(t2) {
    t2 && (t2 = t2.bind(this));
    var e2 = Promise.prototype.catch.call(this, t2);
    return s2.convert(e2, this);
  }, s2.prototype.catchExternal = function(t2) {
    return Promise.prototype.catch.call(this, t2);
  }, s2.prototype.error = function(t2) {
    return this.then(function() {
      throw new Error(t2);
    });
  }, s2.prototype.using = s2.prototype.set, s2.prototype.saveAs = s2.prototype.save, s2.prototype.export = s2.prototype.output, s2.prototype.run = s2.prototype.then, E.getPageSize = function(e2, r2, n2) {
    if ("object" === _typeof(e2)) {
      var i3 = e2;
      e2 = i3.orientation, r2 = i3.unit || r2, n2 = i3.format || n2;
    }
    r2 = r2 || "mm", n2 = n2 || "a4", e2 = ("" + (e2 || "P")).toLowerCase();
    var a3, o3 = ("" + n2).toLowerCase(), s3 = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
    switch (r2) {
      case "pt":
        a3 = 1;
        break;
      case "mm":
        a3 = 72 / 25.4;
        break;
      case "cm":
        a3 = 72 / 2.54;
        break;
      case "in":
        a3 = 72;
        break;
      case "px":
        a3 = 0.75;
        break;
      case "pc":
      case "em":
        a3 = 12;
        break;
      case "ex":
        a3 = 6;
        break;
      default:
        throw "Invalid unit: " + r2;
    }
    var c2, u2 = 0, h2 = 0;
    if (s3.hasOwnProperty(o3)) u2 = s3[o3][1] / a3, h2 = s3[o3][0] / a3;
    else try {
      u2 = n2[1], h2 = n2[0];
    } catch (t2) {
      throw new Error("Invalid format: " + n2);
    }
    if ("p" === e2 || "portrait" === e2) e2 = "p", h2 > u2 && (c2 = h2, h2 = u2, u2 = c2);
    else {
      if ("l" !== e2 && "landscape" !== e2) throw "Invalid orientation: " + e2;
      e2 = "l", u2 > h2 && (c2 = h2, h2 = u2, u2 = c2);
    }
    return { width: h2, height: u2, unit: r2, k: a3, orientation: e2 };
  }, e.html = function(t2, e2) {
    (e2 = e2 || {}).callback = e2.callback || function() {
    }, e2.html2canvas = e2.html2canvas || {}, e2.html2canvas.canvas = e2.html2canvas.canvas || this.canvas, e2.jsPDF = e2.jsPDF || this, e2.fontFaces = e2.fontFaces ? e2.fontFaces.map(jt) : null;
    var r2 = new s2(e2);
    return e2.worker ? r2 : r2.from(t2).doCallback();
  };
}(E.API), E.API.addJS = function(t2) {
  return Ht = t2, this.internal.events.subscribe("postPutResources", function() {
    Ut = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/Names [(EmbeddedJS) " + (Ut + 1) + " 0 R]"), this.internal.out(">>"), this.internal.out("endobj"), zt = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /JavaScript"), this.internal.out("/JS (" + Ht + ")"), this.internal.out(">>"), this.internal.out("endobj");
  }), this.internal.events.subscribe("putCatalog", function() {
    void 0 !== Ut && void 0 !== zt && this.internal.out("/Names <</JavaScript " + Ut + " 0 R>>");
  }), this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e;
  t2.events.push(["postPutResources", function() {
    var t3 = this, r = /^(\d+) 0 obj$/;
    if (this.outline.root.children.length > 0) for (var n2 = t3.outline.render().split(/\r\n/), i2 = 0; i2 < n2.length; i2++) {
      var a2 = n2[i2], o2 = r.exec(a2);
      if (null != o2) {
        var s2 = o2[1];
        t3.internal.newObjectDeferredBegin(s2, false);
      }
      t3.internal.write(a2);
    }
    if (this.outline.createNamedDestinations) {
      var c2 = this.internal.pages.length, u2 = [];
      for (i2 = 0; i2 < c2; i2++) {
        var h2 = t3.internal.newObject();
        u2.push(h2);
        var l2 = t3.internal.getPageInfo(i2 + 1);
        t3.internal.write("<< /D[" + l2.objId + " 0 R /XYZ null null null]>> endobj");
      }
      var f2 = t3.internal.newObject();
      t3.internal.write("<< /Names [ ");
      for (i2 = 0; i2 < u2.length; i2++) t3.internal.write("(page_" + (i2 + 1) + ")" + u2[i2] + " 0 R");
      t3.internal.write(" ] >>", "endobj"), e = t3.internal.newObject(), t3.internal.write("<< /Dests " + f2 + " 0 R"), t3.internal.write(">>", "endobj");
    }
  }]), t2.events.push(["putCatalog", function() {
    this.outline.root.children.length > 0 && (this.internal.write("/Outlines", this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations && this.internal.write("/Names " + e + " 0 R"));
  }]), t2.events.push(["initialized", function() {
    var t3 = this;
    t3.outline = { createNamedDestinations: false, root: { children: [] } }, t3.outline.add = function(t4, e2, r) {
      var n2 = { title: e2, options: r, children: [] };
      return null == t4 && (t4 = this.root), t4.children.push(n2), n2;
    }, t3.outline.render = function() {
      return this.ctx = {}, this.ctx.val = "", this.ctx.pdf = t3, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val;
    }, t3.outline.genIds_r = function(e2) {
      e2.id = t3.internal.newObjectDeferred();
      for (var r = 0; r < e2.children.length; r++) this.genIds_r(e2.children[r]);
    }, t3.outline.renderRoot = function(t4) {
      this.objStart(t4), this.line("/Type /Outlines"), t4.children.length > 0 && (this.line("/First " + this.makeRef(t4.children[0])), this.line("/Last " + this.makeRef(t4.children[t4.children.length - 1]))), this.line("/Count " + this.count_r({ count: 0 }, t4)), this.objEnd();
    }, t3.outline.renderItems = function(e2) {
      for (var r = this.ctx.pdf.internal.getVerticalCoordinateString, n2 = 0; n2 < e2.children.length; n2++) {
        var i2 = e2.children[n2];
        this.objStart(i2), this.line("/Title " + this.makeString(i2.title)), this.line("/Parent " + this.makeRef(e2)), n2 > 0 && this.line("/Prev " + this.makeRef(e2.children[n2 - 1])), n2 < e2.children.length - 1 && this.line("/Next " + this.makeRef(e2.children[n2 + 1])), i2.children.length > 0 && (this.line("/First " + this.makeRef(i2.children[0])), this.line("/Last " + this.makeRef(i2.children[i2.children.length - 1])));
        var a2 = this.count = this.count_r({ count: 0 }, i2);
        if (a2 > 0 && this.line("/Count " + a2), i2.options && i2.options.pageNumber) {
          var o2 = t3.internal.getPageInfo(i2.options.pageNumber);
          this.line("/Dest [" + o2.objId + " 0 R /XYZ 0 " + r(0) + " 0]");
        }
        this.objEnd();
      }
      for (var s2 = 0; s2 < e2.children.length; s2++) this.renderItems(e2.children[s2]);
    }, t3.outline.line = function(t4) {
      this.ctx.val += t4 + "\r\n";
    }, t3.outline.makeRef = function(t4) {
      return t4.id + " 0 R";
    }, t3.outline.makeString = function(e2) {
      return "(" + t3.internal.pdfEscape(e2) + ")";
    }, t3.outline.objStart = function(t4) {
      this.ctx.val += "\r\n" + t4.id + " 0 obj\r\n<<\r\n";
    }, t3.outline.objEnd = function() {
      this.ctx.val += ">> \r\nendobj\r\n";
    }, t3.outline.count_r = function(t4, e2) {
      for (var r = 0; r < e2.children.length; r++) t4.count++, this.count_r(t4, e2.children[r]);
      return t4.count;
    };
  }]);
}(E.API), /**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = [192, 193, 194, 195, 196, 197, 198, 199];
  t2.processJPEG = function(t3, r, n2, i2, a2, o2) {
    var s2, c2 = this.decode.DCT_DECODE, u2 = null;
    if ("string" == typeof t3 || this.__addimage__.isArrayBuffer(t3) || this.__addimage__.isArrayBufferView(t3)) {
      switch (t3 = a2 || t3, t3 = this.__addimage__.isArrayBuffer(t3) ? new Uint8Array(t3) : t3, (s2 = function(t4) {
        for (var r2, n3 = 256 * t4.charCodeAt(4) + t4.charCodeAt(5), i3 = t4.length, a3 = { width: 0, height: 0, numcomponents: 1 }, o3 = 4; o3 < i3; o3 += 2) {
          if (o3 += n3, -1 !== e.indexOf(t4.charCodeAt(o3 + 1))) {
            r2 = 256 * t4.charCodeAt(o3 + 5) + t4.charCodeAt(o3 + 6), a3 = { width: 256 * t4.charCodeAt(o3 + 7) + t4.charCodeAt(o3 + 8), height: r2, numcomponents: t4.charCodeAt(o3 + 9) };
            break;
          }
          n3 = 256 * t4.charCodeAt(o3 + 2) + t4.charCodeAt(o3 + 3);
        }
        return a3;
      }(t3 = this.__addimage__.isArrayBufferView(t3) ? this.__addimage__.arrayBufferToBinaryString(t3) : t3)).numcomponents) {
        case 1:
          o2 = this.color_spaces.DEVICE_GRAY;
          break;
        case 4:
          o2 = this.color_spaces.DEVICE_CMYK;
          break;
        case 3:
          o2 = this.color_spaces.DEVICE_RGB;
      }
      u2 = { data: t3, width: s2.width, height: s2.height, colorSpace: o2, bitsPerComponent: 8, filter: c2, index: r, alias: n2 };
    }
    return u2;
  };
}(E.API);
var Vt, Gt, Yt, Jt, Xt, Kt = function() {
  var t2, e, i2;
  function a2(t3) {
    var e2, r, n2, i3, a3, o3, s2, c2, u2, h2, l2, f2, d2, p2;
    for (this.data = t3, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.animation = null, this.text = {}, o3 = null; ; ) {
      switch (e2 = this.readUInt32(), u2 = function() {
        var t4, e3;
        for (e3 = [], t4 = 0; t4 < 4; ++t4) e3.push(String.fromCharCode(this.data[this.pos++]));
        return e3;
      }.call(this).join("")) {
        case "IHDR":
          this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
          break;
        case "acTL":
          this.animation = { numFrames: this.readUInt32(), numPlays: this.readUInt32() || 1 / 0, frames: [] };
          break;
        case "PLTE":
          this.palette = this.read(e2);
          break;
        case "fcTL":
          o3 && this.animation.frames.push(o3), this.pos += 4, o3 = { width: this.readUInt32(), height: this.readUInt32(), xOffset: this.readUInt32(), yOffset: this.readUInt32() }, a3 = this.readUInt16(), i3 = this.readUInt16() || 100, o3.delay = 1e3 * a3 / i3, o3.disposeOp = this.data[this.pos++], o3.blendOp = this.data[this.pos++], o3.data = [];
          break;
        case "IDAT":
        case "fdAT":
          for ("fdAT" === u2 && (this.pos += 4, e2 -= 4), t3 = (null != o3 ? o3.data : void 0) || this.imgData, f2 = 0; 0 <= e2 ? f2 < e2 : f2 > e2; 0 <= e2 ? ++f2 : --f2) t3.push(this.data[this.pos++]);
          break;
        case "tRNS":
          switch (this.transparency = {}, this.colorType) {
            case 3:
              if (n2 = this.palette.length / 3, this.transparency.indexed = this.read(e2), this.transparency.indexed.length > n2) throw new Error("More transparent colors than palette size");
              if ((h2 = n2 - this.transparency.indexed.length) > 0) for (d2 = 0; 0 <= h2 ? d2 < h2 : d2 > h2; 0 <= h2 ? ++d2 : --d2) this.transparency.indexed.push(255);
              break;
            case 0:
              this.transparency.grayscale = this.read(e2)[0];
              break;
            case 2:
              this.transparency.rgb = this.read(e2);
          }
          break;
        case "tEXt":
          s2 = (l2 = this.read(e2)).indexOf(0), c2 = String.fromCharCode.apply(String, l2.slice(0, s2)), this.text[c2] = String.fromCharCode.apply(String, l2.slice(s2 + 1));
          break;
        case "IEND":
          return o3 && this.animation.frames.push(o3), this.colors = function() {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          }.call(this), this.hasAlphaChannel = 4 === (p2 = this.colorType) || 6 === p2, r = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * r, this.colorSpace = function() {
            switch (this.colors) {
              case 1:
                return "DeviceGray";
              case 3:
                return "DeviceRGB";
            }
          }.call(this), void (this.imgData = new Uint8Array(this.imgData));
        default:
          this.pos += e2;
      }
      if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file");
    }
  }
  a2.prototype.read = function(t3) {
    var e2, r;
    for (r = [], e2 = 0; 0 <= t3 ? e2 < t3 : e2 > t3; 0 <= t3 ? ++e2 : --e2) r.push(this.data[this.pos++]);
    return r;
  }, a2.prototype.readUInt32 = function() {
    return this.data[this.pos++] << 24 | this.data[this.pos++] << 16 | this.data[this.pos++] << 8 | this.data[this.pos++];
  }, a2.prototype.readUInt16 = function() {
    return this.data[this.pos++] << 8 | this.data[this.pos++];
  }, a2.prototype.decodePixels = function(t3) {
    var e2 = this.pixelBitlength / 8, n2 = new Uint8Array(this.width * this.height * e2), i3 = 0, a3 = this;
    if (null == t3 && (t3 = this.imgData), 0 === t3.length) return new Uint8Array(0);
    function o3(r, o4, s2, c2) {
      var u2, h2, l2, f2, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2, A2, x2, S2, _2, P2, k2, I2, F2 = Math.ceil((a3.width - r) / s2), C2 = Math.ceil((a3.height - o4) / c2), j2 = a3.width == F2 && a3.height == C2;
      for (L2 = e2 * F2, w2 = j2 ? n2 : new Uint8Array(L2 * C2), p2 = t3.length, N2 = 0, h2 = 0; N2 < C2 && i3 < p2; ) {
        switch (t3[i3++]) {
          case 0:
            for (f2 = S2 = 0; S2 < L2; f2 = S2 += 1) w2[h2++] = t3[i3++];
            break;
          case 1:
            for (f2 = _2 = 0; _2 < L2; f2 = _2 += 1) u2 = t3[i3++], d2 = f2 < e2 ? 0 : w2[h2 - e2], w2[h2++] = (u2 + d2) % 256;
            break;
          case 2:
            for (f2 = P2 = 0; P2 < L2; f2 = P2 += 1) u2 = t3[i3++], l2 = (f2 - f2 % e2) / e2, A2 = N2 && w2[(N2 - 1) * L2 + l2 * e2 + f2 % e2], w2[h2++] = (A2 + u2) % 256;
            break;
          case 3:
            for (f2 = k2 = 0; k2 < L2; f2 = k2 += 1) u2 = t3[i3++], l2 = (f2 - f2 % e2) / e2, d2 = f2 < e2 ? 0 : w2[h2 - e2], A2 = N2 && w2[(N2 - 1) * L2 + l2 * e2 + f2 % e2], w2[h2++] = (u2 + Math.floor((d2 + A2) / 2)) % 256;
            break;
          case 4:
            for (f2 = I2 = 0; I2 < L2; f2 = I2 += 1) u2 = t3[i3++], l2 = (f2 - f2 % e2) / e2, d2 = f2 < e2 ? 0 : w2[h2 - e2], 0 === N2 ? A2 = x2 = 0 : (A2 = w2[(N2 - 1) * L2 + l2 * e2 + f2 % e2], x2 = l2 && w2[(N2 - 1) * L2 + (l2 - 1) * e2 + f2 % e2]), g2 = d2 + A2 - x2, m2 = Math.abs(g2 - d2), b2 = Math.abs(g2 - A2), y2 = Math.abs(g2 - x2), v2 = m2 <= b2 && m2 <= y2 ? d2 : b2 <= y2 ? A2 : x2, w2[h2++] = (u2 + v2) % 256;
            break;
          default:
            throw new Error("Invalid filter algorithm: " + t3[i3 - 1]);
        }
        if (!j2) {
          var O2 = ((o4 + N2 * c2) * a3.width + r) * e2, B2 = N2 * L2;
          for (f2 = 0; f2 < F2; f2 += 1) {
            for (var M2 = 0; M2 < e2; M2 += 1) n2[O2++] = w2[B2++];
            O2 += (s2 - 1) * e2;
          }
        }
        N2++;
      }
    }
    return t3 = unzlibSync(t3), 1 == a3.interlaceMethod ? (o3(0, 0, 8, 8), o3(4, 0, 8, 8), o3(0, 4, 4, 8), o3(2, 0, 4, 4), o3(0, 2, 2, 4), o3(1, 0, 2, 2), o3(0, 1, 1, 2)) : o3(0, 0, 1, 1), n2;
  }, a2.prototype.decodePalette = function() {
    var t3, e2, r, n2, i3, a3, o3, s2, c2;
    for (r = this.palette, a3 = this.transparency.indexed || [], i3 = new Uint8Array((a3.length || 0) + r.length), n2 = 0, t3 = 0, e2 = o3 = 0, s2 = r.length; o3 < s2; e2 = o3 += 3) i3[n2++] = r[e2], i3[n2++] = r[e2 + 1], i3[n2++] = r[e2 + 2], i3[n2++] = null != (c2 = a3[t3++]) ? c2 : 255;
    return i3;
  }, a2.prototype.copyToImageData = function(t3, e2) {
    var r, n2, i3, a3, o3, s2, c2, u2, h2, l2, f2;
    if (n2 = this.colors, h2 = null, r = this.hasAlphaChannel, this.palette.length && (h2 = null != (f2 = this._decodedPalette) ? f2 : this._decodedPalette = this.decodePalette(), n2 = 4, r = true), u2 = (i3 = t3.data || t3).length, o3 = h2 || e2, a3 = s2 = 0, 1 === n2) for (; a3 < u2; ) c2 = h2 ? 4 * e2[a3 / 4] : s2, l2 = o3[c2++], i3[a3++] = l2, i3[a3++] = l2, i3[a3++] = l2, i3[a3++] = r ? o3[c2++] : 255, s2 = c2;
    else for (; a3 < u2; ) c2 = h2 ? 4 * e2[a3 / 4] : s2, i3[a3++] = o3[c2++], i3[a3++] = o3[c2++], i3[a3++] = o3[c2++], i3[a3++] = r ? o3[c2++] : 255, s2 = c2;
  }, a2.prototype.decode = function() {
    var t3;
    return t3 = new Uint8Array(this.width * this.height * 4), this.copyToImageData(t3, this.decodePixels()), t3;
  };
  var o2 = function() {
    if ("[object Window]" === Object.prototype.toString.call(n)) {
      try {
        e = n.document.createElement("canvas"), i2 = e.getContext("2d");
      } catch (t3) {
        return false;
      }
      return true;
    }
    return false;
  };
  return o2(), t2 = function(t3) {
    var r;
    if (true === o2()) return i2.width = t3.width, i2.height = t3.height, i2.clearRect(0, 0, t3.width, t3.height), i2.putImageData(t3, 0, 0), (r = new Image()).src = e.toDataURL(), r;
    throw new Error("This method requires a Browser with Canvas-capability.");
  }, a2.prototype.decodeFrames = function(e2) {
    var r, n2, i3, a3, o3, s2, c2, u2;
    if (this.animation) {
      for (u2 = [], n2 = o3 = 0, s2 = (c2 = this.animation.frames).length; o3 < s2; n2 = ++o3) r = c2[n2], i3 = e2.createImageData(r.width, r.height), a3 = this.decodePixels(new Uint8Array(r.data)), this.copyToImageData(i3, a3), r.imageData = i3, u2.push(r.image = t2(i3));
      return u2;
    }
  }, a2.prototype.renderFrame = function(t3, e2) {
    var r, n2, i3;
    return r = (n2 = this.animation.frames)[e2], i3 = n2[e2 - 1], 0 === e2 && t3.clearRect(0, 0, this.width, this.height), 1 === (null != i3 ? i3.disposeOp : void 0) ? t3.clearRect(i3.xOffset, i3.yOffset, i3.width, i3.height) : 2 === (null != i3 ? i3.disposeOp : void 0) && t3.putImageData(i3.imageData, i3.xOffset, i3.yOffset), 0 === r.blendOp && t3.clearRect(r.xOffset, r.yOffset, r.width, r.height), t3.drawImage(r.image, r.xOffset, r.yOffset);
  }, a2.prototype.animate = function(t3) {
    var e2, r, n2, i3, a3, o3, s2 = this;
    return r = 0, o3 = this.animation, i3 = o3.numFrames, n2 = o3.frames, a3 = o3.numPlays, (e2 = function() {
      var o4, c2;
      if (o4 = r++ % i3, c2 = n2[o4], s2.renderFrame(t3, o4), i3 > 1 && r / i3 < a3) return s2.animation._timeout = setTimeout(e2, c2.delay);
    })();
  }, a2.prototype.stopAnimation = function() {
    var t3;
    return clearTimeout(null != (t3 = this.animation) ? t3._timeout : void 0);
  }, a2.prototype.render = function(t3) {
    var e2, r;
    return t3._png && t3._png.stopAnimation(), t3._png = this, t3.width = this.width, t3.height = this.height, e2 = t3.getContext("2d"), this.animation ? (this.decodeFrames(e2), this.animate(e2)) : (r = e2.createImageData(this.width, this.height), this.copyToImageData(r, this.decodePixels()), e2.putImageData(r, 0, 0));
  }, a2;
}();
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
/**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */
function Zt(t2) {
  var e = 0;
  if (71 !== t2[e++] || 73 !== t2[e++] || 70 !== t2[e++] || 56 !== t2[e++] || 56 != (t2[e++] + 1 & 253) || 97 !== t2[e++]) throw new Error("Invalid GIF 87a/89a header.");
  var r = t2[e++] | t2[e++] << 8, n2 = t2[e++] | t2[e++] << 8, i2 = t2[e++], a2 = i2 >> 7, o2 = 1 << (7 & i2) + 1;
  t2[e++];
  t2[e++];
  var s2 = null, c2 = null;
  a2 && (s2 = e, c2 = o2, e += 3 * o2);
  var u2 = true, h2 = [], l2 = 0, f2 = null, d2 = 0, p2 = null;
  for (this.width = r, this.height = n2; u2 && e < t2.length; ) switch (t2[e++]) {
    case 33:
      switch (t2[e++]) {
        case 255:
          if (11 !== t2[e] || 78 == t2[e + 1] && 69 == t2[e + 2] && 84 == t2[e + 3] && 83 == t2[e + 4] && 67 == t2[e + 5] && 65 == t2[e + 6] && 80 == t2[e + 7] && 69 == t2[e + 8] && 50 == t2[e + 9] && 46 == t2[e + 10] && 48 == t2[e + 11] && 3 == t2[e + 12] && 1 == t2[e + 13] && 0 == t2[e + 16]) e += 14, p2 = t2[e++] | t2[e++] << 8, e++;
          else for (e += 12; ; ) {
            if (!((P2 = t2[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P2) break;
            e += P2;
          }
          break;
        case 249:
          if (4 !== t2[e++] || 0 !== t2[e + 4]) throw new Error("Invalid graphics extension block.");
          var g2 = t2[e++];
          l2 = t2[e++] | t2[e++] << 8, f2 = t2[e++], 0 == (1 & g2) && (f2 = null), d2 = g2 >> 2 & 7, e++;
          break;
        case 254:
          for (; ; ) {
            if (!((P2 = t2[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P2) break;
            e += P2;
          }
          break;
        default:
          throw new Error("Unknown graphic control label: 0x" + t2[e - 1].toString(16));
      }
      break;
    case 44:
      var m2 = t2[e++] | t2[e++] << 8, v2 = t2[e++] | t2[e++] << 8, b2 = t2[e++] | t2[e++] << 8, y2 = t2[e++] | t2[e++] << 8, w2 = t2[e++], N2 = w2 >> 6 & 1, L2 = 1 << (7 & w2) + 1, A2 = s2, x2 = c2, S2 = false;
      if (w2 >> 7) {
        S2 = true;
        A2 = e, x2 = L2, e += 3 * L2;
      }
      var _2 = e;
      for (e++; ; ) {
        var P2;
        if (!((P2 = t2[e++]) >= 0)) throw Error("Invalid block size");
        if (0 === P2) break;
        e += P2;
      }
      h2.push({ x: m2, y: v2, width: b2, height: y2, has_local_palette: S2, palette_offset: A2, palette_size: x2, data_offset: _2, data_length: e - _2, transparent_index: f2, interlaced: !!N2, delay: l2, disposal: d2 });
      break;
    case 59:
      u2 = false;
      break;
    default:
      throw new Error("Unknown gif block: 0x" + t2[e - 1].toString(16));
  }
  this.numFrames = function() {
    return h2.length;
  }, this.loopCount = function() {
    return p2;
  }, this.frameInfo = function(t3) {
    if (t3 < 0 || t3 >= h2.length) throw new Error("Frame index out of range.");
    return h2[t3];
  }, this.decodeAndBlitFrameBGRA = function(e2, n3) {
    var i3 = this.frameInfo(e2), a3 = i3.width * i3.height, o3 = new Uint8Array(a3);
    $t(t2, i3.data_offset, o3, a3);
    var s3 = i3.palette_offset, c3 = i3.transparent_index;
    null === c3 && (c3 = 256);
    var u3 = i3.width, h3 = r - u3, l3 = u3, f3 = 4 * (i3.y * r + i3.x), d3 = 4 * ((i3.y + i3.height) * r + i3.x), p3 = f3, g3 = 4 * h3;
    true === i3.interlaced && (g3 += 4 * r * 7);
    for (var m3 = 8, v3 = 0, b3 = o3.length; v3 < b3; ++v3) {
      var y3 = o3[v3];
      if (0 === l3 && (l3 = u3, (p3 += g3) >= d3 && (g3 = 4 * h3 + 4 * r * (m3 - 1), p3 = f3 + (u3 + h3) * (m3 << 1), m3 >>= 1)), y3 === c3) p3 += 4;
      else {
        var w3 = t2[s3 + 3 * y3], N3 = t2[s3 + 3 * y3 + 1], L3 = t2[s3 + 3 * y3 + 2];
        n3[p3++] = L3, n3[p3++] = N3, n3[p3++] = w3, n3[p3++] = 255;
      }
      --l3;
    }
  }, this.decodeAndBlitFrameRGBA = function(e2, n3) {
    var i3 = this.frameInfo(e2), a3 = i3.width * i3.height, o3 = new Uint8Array(a3);
    $t(t2, i3.data_offset, o3, a3);
    var s3 = i3.palette_offset, c3 = i3.transparent_index;
    null === c3 && (c3 = 256);
    var u3 = i3.width, h3 = r - u3, l3 = u3, f3 = 4 * (i3.y * r + i3.x), d3 = 4 * ((i3.y + i3.height) * r + i3.x), p3 = f3, g3 = 4 * h3;
    true === i3.interlaced && (g3 += 4 * r * 7);
    for (var m3 = 8, v3 = 0, b3 = o3.length; v3 < b3; ++v3) {
      var y3 = o3[v3];
      if (0 === l3 && (l3 = u3, (p3 += g3) >= d3 && (g3 = 4 * h3 + 4 * r * (m3 - 1), p3 = f3 + (u3 + h3) * (m3 << 1), m3 >>= 1)), y3 === c3) p3 += 4;
      else {
        var w3 = t2[s3 + 3 * y3], N3 = t2[s3 + 3 * y3 + 1], L3 = t2[s3 + 3 * y3 + 2];
        n3[p3++] = w3, n3[p3++] = N3, n3[p3++] = L3, n3[p3++] = 255;
      }
      --l3;
    }
  };
}
function $t(t2, e, r, n2) {
  for (var i2 = t2[e++], o2 = 1 << i2, s2 = o2 + 1, c2 = s2 + 1, u2 = i2 + 1, h2 = (1 << u2) - 1, l2 = 0, f2 = 0, d2 = 0, p2 = t2[e++], g2 = new Int32Array(4096), m2 = null; ; ) {
    for (; l2 < 16 && 0 !== p2; ) f2 |= t2[e++] << l2, l2 += 8, 1 === p2 ? p2 = t2[e++] : --p2;
    if (l2 < u2) break;
    var v2 = f2 & h2;
    if (f2 >>= u2, l2 -= u2, v2 !== o2) {
      if (v2 === s2) break;
      for (var b2 = v2 < c2 ? v2 : m2, y2 = 0, w2 = b2; w2 > o2; ) w2 = g2[w2] >> 8, ++y2;
      var N2 = w2;
      if (d2 + y2 + (b2 !== v2 ? 1 : 0) > n2) return void a.log("Warning, gif stream longer than expected.");
      r[d2++] = N2;
      var L2 = d2 += y2;
      for (b2 !== v2 && (r[d2++] = N2), w2 = b2; y2--; ) w2 = g2[w2], r[--L2] = 255 & w2, w2 >>= 8;
      null !== m2 && c2 < 4096 && (g2[c2++] = m2 << 8 | N2, c2 >= h2 + 1 && u2 < 12 && (++u2, h2 = h2 << 1 | 1)), m2 = v2;
    } else c2 = s2 + 1, h2 = (1 << (u2 = i2 + 1)) - 1, m2 = null;
  }
  return d2 !== n2 && a.log("Warning, gif stream shorter than expected."), r;
}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function Qt(t2) {
  var e, r, n2, i2, a2, o2 = Math.floor, s2 = new Array(64), c2 = new Array(64), u2 = new Array(64), h2 = new Array(64), l2 = new Array(65535), f2 = new Array(65535), d2 = new Array(64), p2 = new Array(64), g2 = [], m2 = 0, v2 = 7, b2 = new Array(64), y2 = new Array(64), w2 = new Array(64), N2 = new Array(256), L2 = new Array(2048), A2 = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], x2 = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], S2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], _2 = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], P2 = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], k2 = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], I2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], F2 = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], C2 = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  function j2(t3, e2) {
    for (var r2 = 0, n3 = 0, i3 = new Array(), a3 = 1; a3 <= 16; a3++) {
      for (var o3 = 1; o3 <= t3[a3]; o3++) i3[e2[n3]] = [], i3[e2[n3]][0] = r2, i3[e2[n3]][1] = a3, n3++, r2++;
      r2 *= 2;
    }
    return i3;
  }
  function O2(t3) {
    for (var e2 = t3[0], r2 = t3[1] - 1; r2 >= 0; ) e2 & 1 << r2 && (m2 |= 1 << v2), r2--, --v2 < 0 && (255 == m2 ? (B2(255), B2(0)) : B2(m2), v2 = 7, m2 = 0);
  }
  function B2(t3) {
    g2.push(t3);
  }
  function M2(t3) {
    B2(t3 >> 8 & 255), B2(255 & t3);
  }
  function E2(t3, e2, r2, n3, i3) {
    for (var a3, o3 = i3[0], s3 = i3[240], c3 = function(t4, e3) {
      var r3, n4, i4, a4, o4, s4, c4, u4, h4, l3, f3 = 0;
      for (h4 = 0; h4 < 8; ++h4) {
        r3 = t4[f3], n4 = t4[f3 + 1], i4 = t4[f3 + 2], a4 = t4[f3 + 3], o4 = t4[f3 + 4], s4 = t4[f3 + 5], c4 = t4[f3 + 6];
        var p3 = r3 + (u4 = t4[f3 + 7]), g4 = r3 - u4, m4 = n4 + c4, v4 = n4 - c4, b4 = i4 + s4, y4 = i4 - s4, w4 = a4 + o4, N3 = a4 - o4, L3 = p3 + w4, A3 = p3 - w4, x3 = m4 + b4, S3 = m4 - b4;
        t4[f3] = L3 + x3, t4[f3 + 4] = L3 - x3;
        var _3 = 0.707106781 * (S3 + A3);
        t4[f3 + 2] = A3 + _3, t4[f3 + 6] = A3 - _3;
        var P3 = 0.382683433 * ((L3 = N3 + y4) - (S3 = v4 + g4)), k3 = 0.5411961 * L3 + P3, I3 = 1.306562965 * S3 + P3, F3 = 0.707106781 * (x3 = y4 + v4), C3 = g4 + F3, j3 = g4 - F3;
        t4[f3 + 5] = j3 + k3, t4[f3 + 3] = j3 - k3, t4[f3 + 1] = C3 + I3, t4[f3 + 7] = C3 - I3, f3 += 8;
      }
      for (f3 = 0, h4 = 0; h4 < 8; ++h4) {
        r3 = t4[f3], n4 = t4[f3 + 8], i4 = t4[f3 + 16], a4 = t4[f3 + 24], o4 = t4[f3 + 32], s4 = t4[f3 + 40], c4 = t4[f3 + 48];
        var O3 = r3 + (u4 = t4[f3 + 56]), B3 = r3 - u4, M3 = n4 + c4, E3 = n4 - c4, q3 = i4 + s4, D2 = i4 - s4, R2 = a4 + o4, T2 = a4 - o4, U2 = O3 + R2, z2 = O3 - R2, H2 = M3 + q3, W2 = M3 - q3;
        t4[f3] = U2 + H2, t4[f3 + 32] = U2 - H2;
        var V2 = 0.707106781 * (W2 + z2);
        t4[f3 + 16] = z2 + V2, t4[f3 + 48] = z2 - V2;
        var G2 = 0.382683433 * ((U2 = T2 + D2) - (W2 = E3 + B3)), Y2 = 0.5411961 * U2 + G2, J2 = 1.306562965 * W2 + G2, X2 = 0.707106781 * (H2 = D2 + E3), K2 = B3 + X2, Z2 = B3 - X2;
        t4[f3 + 40] = Z2 + Y2, t4[f3 + 24] = Z2 - Y2, t4[f3 + 8] = K2 + J2, t4[f3 + 56] = K2 - J2, f3++;
      }
      for (h4 = 0; h4 < 64; ++h4) l3 = t4[h4] * e3[h4], d2[h4] = l3 > 0 ? l3 + 0.5 | 0 : l3 - 0.5 | 0;
      return d2;
    }(t3, e2), u3 = 0; u3 < 64; ++u3) p2[A2[u3]] = c3[u3];
    var h3 = p2[0] - r2;
    r2 = p2[0], 0 == h3 ? O2(n3[0]) : (O2(n3[f2[a3 = 32767 + h3]]), O2(l2[a3]));
    for (var g3 = 63; g3 > 0 && 0 == p2[g3]; ) g3--;
    if (0 == g3) return O2(o3), r2;
    for (var m3, v3 = 1; v3 <= g3; ) {
      for (var b3 = v3; 0 == p2[v3] && v3 <= g3; ) ++v3;
      var y3 = v3 - b3;
      if (y3 >= 16) {
        m3 = y3 >> 4;
        for (var w3 = 1; w3 <= m3; ++w3) O2(s3);
        y3 &= 15;
      }
      a3 = 32767 + p2[v3], O2(i3[(y3 << 4) + f2[a3]]), O2(l2[a3]), v3++;
    }
    return 63 != g3 && O2(o3), r2;
  }
  function q2(t3) {
    (t3 = Math.min(Math.max(t3, 1), 100), a2 != t3) && (!function(t4) {
      for (var e2 = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], r2 = 0; r2 < 64; r2++) {
        var n3 = o2((e2[r2] * t4 + 50) / 100);
        n3 = Math.min(Math.max(n3, 1), 255), s2[A2[r2]] = n3;
      }
      for (var i3 = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], a3 = 0; a3 < 64; a3++) {
        var l3 = o2((i3[a3] * t4 + 50) / 100);
        l3 = Math.min(Math.max(l3, 1), 255), c2[A2[a3]] = l3;
      }
      for (var f3 = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], d3 = 0, p3 = 0; p3 < 8; p3++) for (var g3 = 0; g3 < 8; g3++) u2[d3] = 1 / (s2[A2[d3]] * f3[p3] * f3[g3] * 8), h2[d3] = 1 / (c2[A2[d3]] * f3[p3] * f3[g3] * 8), d3++;
    }(t3 < 50 ? Math.floor(5e3 / t3) : Math.floor(200 - 2 * t3)), a2 = t3);
  }
  this.encode = function(t3, a3) {
    a3 && q2(a3), g2 = new Array(), m2 = 0, v2 = 7, M2(65496), M2(65504), M2(16), B2(74), B2(70), B2(73), B2(70), B2(0), B2(1), B2(1), B2(0), M2(1), M2(1), B2(0), B2(0), function() {
      M2(65499), M2(132), B2(0);
      for (var t4 = 0; t4 < 64; t4++) B2(s2[t4]);
      B2(1);
      for (var e2 = 0; e2 < 64; e2++) B2(c2[e2]);
    }(), function(t4, e2) {
      M2(65472), M2(17), B2(8), M2(e2), M2(t4), B2(3), B2(1), B2(17), B2(0), B2(2), B2(17), B2(1), B2(3), B2(17), B2(1);
    }(t3.width, t3.height), function() {
      M2(65476), M2(418), B2(0);
      for (var t4 = 0; t4 < 16; t4++) B2(x2[t4 + 1]);
      for (var e2 = 0; e2 <= 11; e2++) B2(S2[e2]);
      B2(16);
      for (var r2 = 0; r2 < 16; r2++) B2(_2[r2 + 1]);
      for (var n3 = 0; n3 <= 161; n3++) B2(P2[n3]);
      B2(1);
      for (var i3 = 0; i3 < 16; i3++) B2(k2[i3 + 1]);
      for (var a4 = 0; a4 <= 11; a4++) B2(I2[a4]);
      B2(17);
      for (var o4 = 0; o4 < 16; o4++) B2(F2[o4 + 1]);
      for (var s3 = 0; s3 <= 161; s3++) B2(C2[s3]);
    }(), M2(65498), M2(12), B2(3), B2(1), B2(0), B2(2), B2(17), B2(3), B2(17), B2(0), B2(63), B2(0);
    var o3 = 0, l3 = 0, f3 = 0;
    m2 = 0, v2 = 7, this.encode.displayName = "_encode_";
    for (var d3, p3, N3, A3, j3, D2, R2, T2, U2, z2 = t3.data, H2 = t3.width, W2 = t3.height, V2 = 4 * H2, G2 = 0; G2 < W2; ) {
      for (d3 = 0; d3 < V2; ) {
        for (j3 = V2 * G2 + d3, R2 = -1, T2 = 0, U2 = 0; U2 < 64; U2++) D2 = j3 + (T2 = U2 >> 3) * V2 + (R2 = 4 * (7 & U2)), G2 + T2 >= W2 && (D2 -= V2 * (G2 + 1 + T2 - W2)), d3 + R2 >= V2 && (D2 -= d3 + R2 - V2 + 4), p3 = z2[D2++], N3 = z2[D2++], A3 = z2[D2++], b2[U2] = (L2[p3] + L2[N3 + 256 >> 0] + L2[A3 + 512 >> 0] >> 16) - 128, y2[U2] = (L2[p3 + 768 >> 0] + L2[N3 + 1024 >> 0] + L2[A3 + 1280 >> 0] >> 16) - 128, w2[U2] = (L2[p3 + 1280 >> 0] + L2[N3 + 1536 >> 0] + L2[A3 + 1792 >> 0] >> 16) - 128;
        o3 = E2(b2, u2, o3, e, n2), l3 = E2(y2, h2, l3, r, i2), f3 = E2(w2, h2, f3, r, i2), d3 += 32;
      }
      G2 += 8;
    }
    if (v2 >= 0) {
      var Y2 = [];
      Y2[1] = v2 + 1, Y2[0] = (1 << v2 + 1) - 1, O2(Y2);
    }
    return M2(65497), new Uint8Array(g2);
  }, t2 = t2 || 50, function() {
    for (var t3 = String.fromCharCode, e2 = 0; e2 < 256; e2++) N2[e2] = t3(e2);
  }(), e = j2(x2, S2), r = j2(k2, I2), n2 = j2(_2, P2), i2 = j2(F2, C2), function() {
    for (var t3 = 1, e2 = 2, r2 = 1; r2 <= 15; r2++) {
      for (var n3 = t3; n3 < e2; n3++) f2[32767 + n3] = r2, l2[32767 + n3] = [], l2[32767 + n3][1] = r2, l2[32767 + n3][0] = n3;
      for (var i3 = -(e2 - 1); i3 <= -t3; i3++) f2[32767 + i3] = r2, l2[32767 + i3] = [], l2[32767 + i3][1] = r2, l2[32767 + i3][0] = e2 - 1 + i3;
      t3 <<= 1, e2 <<= 1;
    }
  }(), function() {
    for (var t3 = 0; t3 < 256; t3++) L2[t3] = 19595 * t3, L2[t3 + 256 >> 0] = 38470 * t3, L2[t3 + 512 >> 0] = 7471 * t3 + 32768, L2[t3 + 768 >> 0] = -11059 * t3, L2[t3 + 1024 >> 0] = -21709 * t3, L2[t3 + 1280 >> 0] = 32768 * t3 + 8421375, L2[t3 + 1536 >> 0] = -27439 * t3, L2[t3 + 1792 >> 0] = -5329 * t3;
  }(), q2(t2);
}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function te(t2, e) {
  if (this.pos = 0, this.buffer = t2, this.datav = new DataView(t2.buffer), this.is_with_alpha = !!e, this.bottom_up = true, this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]), this.pos += 2, -1 === ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag)) throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}
function ee(t2) {
  function e(t3) {
    if (!t3) throw Error("assert :P");
  }
  function r(t3, e2, r2) {
    for (var n3 = 0; 4 > n3; n3++) if (t3[e2 + n3] != r2.charCodeAt(n3)) return true;
    return false;
  }
  function n2(t3, e2, r2, n3, i3) {
    for (var a3 = 0; a3 < i3; a3++) t3[e2 + a3] = r2[n3 + a3];
  }
  function i2(t3, e2, r2, n3) {
    for (var i3 = 0; i3 < n3; i3++) t3[e2 + i3] = r2;
  }
  function a2(t3) {
    return new Int32Array(t3);
  }
  function o2(t3, e2) {
    for (var r2 = [], n3 = 0; n3 < t3; n3++) r2.push(new e2());
    return r2;
  }
  function s2(t3, e2) {
    var r2 = [];
    return function t4(r3, n3, i3) {
      for (var a3 = i3[n3], o3 = 0; o3 < a3 && (r3.push(i3.length > n3 + 1 ? [] : new e2()), !(i3.length < n3 + 1)); o3++) t4(r3[o3], n3 + 1, i3);
    }(r2, 0, t3), r2;
  }
  var c2 = function() {
    var t3 = this;
    function c3(t4, e2) {
      for (var r2 = 1 << e2 - 1 >>> 0; t4 & r2; ) r2 >>>= 1;
      return r2 ? (t4 & r2 - 1) + r2 : t4;
    }
    function u3(t4, r2, n3, i3, a3) {
      e(!(i3 % n3));
      do {
        t4[r2 + (i3 -= n3)] = a3;
      } while (0 < i3);
    }
    function h3(t4, r2, n3, i3, o3) {
      if (e(2328 >= o3), 512 >= o3) var s3 = a2(512);
      else if (null == (s3 = a2(o3))) return 0;
      return function(t5, r3, n4, i4, o4, s4) {
        var h4, f4, d4 = r3, p4 = 1 << n4, g4 = a2(16), m4 = a2(16);
        for (e(0 != o4), e(null != i4), e(null != t5), e(0 < n4), f4 = 0; f4 < o4; ++f4) {
          if (15 < i4[f4]) return 0;
          ++g4[i4[f4]];
        }
        if (g4[0] == o4) return 0;
        for (m4[1] = 0, h4 = 1; 15 > h4; ++h4) {
          if (g4[h4] > 1 << h4) return 0;
          m4[h4 + 1] = m4[h4] + g4[h4];
        }
        for (f4 = 0; f4 < o4; ++f4) h4 = i4[f4], 0 < i4[f4] && (s4[m4[h4]++] = f4);
        if (1 == m4[15]) return (i4 = new l3()).g = 0, i4.value = s4[0], u3(t5, d4, 1, p4, i4), p4;
        var v4, b4 = -1, y4 = p4 - 1, w4 = 0, N4 = 1, L4 = 1, A4 = 1 << n4;
        for (f4 = 0, h4 = 1, o4 = 2; h4 <= n4; ++h4, o4 <<= 1) {
          if (N4 += L4 <<= 1, 0 > (L4 -= g4[h4])) return 0;
          for (; 0 < g4[h4]; --g4[h4]) (i4 = new l3()).g = h4, i4.value = s4[f4++], u3(t5, d4 + w4, o4, A4, i4), w4 = c3(w4, h4);
        }
        for (h4 = n4 + 1, o4 = 2; 15 >= h4; ++h4, o4 <<= 1) {
          if (N4 += L4 <<= 1, 0 > (L4 -= g4[h4])) return 0;
          for (; 0 < g4[h4]; --g4[h4]) {
            if (i4 = new l3(), (w4 & y4) != b4) {
              for (d4 += A4, v4 = 1 << (b4 = h4) - n4; 15 > b4 && !(0 >= (v4 -= g4[b4])); ) ++b4, v4 <<= 1;
              p4 += A4 = 1 << (v4 = b4 - n4), t5[r3 + (b4 = w4 & y4)].g = v4 + n4, t5[r3 + b4].value = d4 - r3 - b4;
            }
            i4.g = h4 - n4, i4.value = s4[f4++], u3(t5, d4 + (w4 >> n4), o4, A4, i4), w4 = c3(w4, h4);
          }
        }
        return N4 != 2 * m4[15] - 1 ? 0 : p4;
      }(t4, r2, n3, i3, o3, s3);
    }
    function l3() {
      this.value = this.g = 0;
    }
    function f3() {
      this.value = this.g = 0;
    }
    function d3() {
      this.G = o2(5, l3), this.H = a2(5), this.jc = this.Qb = this.qb = this.nd = 0, this.pd = o2(Dr, f3);
    }
    function p3(t4, r2, n3, i3) {
      e(null != t4), e(null != r2), e(2147483648 > i3), t4.Ca = 254, t4.I = 0, t4.b = -8, t4.Ka = 0, t4.oa = r2, t4.pa = n3, t4.Jd = r2, t4.Yc = n3 + i3, t4.Zc = 4 <= i3 ? n3 + i3 - 4 + 1 : n3, _2(t4);
    }
    function g3(t4, e2) {
      for (var r2 = 0; 0 < e2--; ) r2 |= k2(t4, 128) << e2;
      return r2;
    }
    function m3(t4, e2) {
      var r2 = g3(t4, e2);
      return P2(t4) ? -r2 : r2;
    }
    function v3(t4, r2, n3, i3) {
      var a3, o3 = 0;
      for (e(null != t4), e(null != r2), e(4294967288 > i3), t4.Sb = i3, t4.Ra = 0, t4.u = 0, t4.h = 0, 4 < i3 && (i3 = 4), a3 = 0; a3 < i3; ++a3) o3 += r2[n3 + a3] << 8 * a3;
      t4.Ra = o3, t4.bb = i3, t4.oa = r2, t4.pa = n3;
    }
    function b3(t4) {
      for (; 8 <= t4.u && t4.bb < t4.Sb; ) t4.Ra >>>= 8, t4.Ra += t4.oa[t4.pa + t4.bb] << Ur - 8 >>> 0, ++t4.bb, t4.u -= 8;
      A3(t4) && (t4.h = 1, t4.u = 0);
    }
    function y3(t4, r2) {
      if (e(0 <= r2), !t4.h && r2 <= Tr) {
        var n3 = L3(t4) & Rr[r2];
        return t4.u += r2, b3(t4), n3;
      }
      return t4.h = 1, t4.u = 0;
    }
    function w3() {
      this.b = this.Ca = this.I = 0, this.oa = [], this.pa = 0, this.Jd = [], this.Yc = 0, this.Zc = [], this.Ka = 0;
    }
    function N3() {
      this.Ra = 0, this.oa = [], this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }
    function L3(t4) {
      return t4.Ra >>> (t4.u & Ur - 1) >>> 0;
    }
    function A3(t4) {
      return e(t4.bb <= t4.Sb), t4.h || t4.bb == t4.Sb && t4.u > Ur;
    }
    function x2(t4, e2) {
      t4.u = e2, t4.h = A3(t4);
    }
    function S2(t4) {
      t4.u >= zr && (e(t4.u >= zr), b3(t4));
    }
    function _2(t4) {
      e(null != t4 && null != t4.oa), t4.pa < t4.Zc ? (t4.I = (t4.oa[t4.pa++] | t4.I << 8) >>> 0, t4.b += 8) : (e(null != t4 && null != t4.oa), t4.pa < t4.Yc ? (t4.b += 8, t4.I = t4.oa[t4.pa++] | t4.I << 8) : t4.Ka ? t4.b = 0 : (t4.I <<= 8, t4.b += 8, t4.Ka = 1));
    }
    function P2(t4) {
      return g3(t4, 1);
    }
    function k2(t4, e2) {
      var r2 = t4.Ca;
      0 > t4.b && _2(t4);
      var n3 = t4.b, i3 = r2 * e2 >>> 8, a3 = (t4.I >>> n3 > i3) + 0;
      for (a3 ? (r2 -= i3, t4.I -= i3 + 1 << n3 >>> 0) : r2 = i3 + 1, n3 = r2, i3 = 0; 256 <= n3; ) i3 += 8, n3 >>= 8;
      return n3 = 7 ^ i3 + Hr[n3], t4.b -= n3, t4.Ca = (r2 << n3) - 1, a3;
    }
    function I2(t4, e2, r2) {
      t4[e2 + 0] = r2 >> 24 & 255, t4[e2 + 1] = r2 >> 16 & 255, t4[e2 + 2] = r2 >> 8 & 255, t4[e2 + 3] = r2 >> 0 & 255;
    }
    function F2(t4, e2) {
      return t4[e2 + 0] << 0 | t4[e2 + 1] << 8;
    }
    function C2(t4, e2) {
      return F2(t4, e2) | t4[e2 + 2] << 16;
    }
    function j2(t4, e2) {
      return F2(t4, e2) | F2(t4, e2 + 2) << 16;
    }
    function O2(t4, r2) {
      var n3 = 1 << r2;
      return e(null != t4), e(0 < r2), t4.X = a2(n3), null == t4.X ? 0 : (t4.Mb = 32 - r2, t4.Xa = r2, 1);
    }
    function B2(t4, r2) {
      e(null != t4), e(null != r2), e(t4.Xa == r2.Xa), n2(r2.X, 0, t4.X, 0, 1 << r2.Xa);
    }
    function M2() {
      this.X = [], this.Xa = this.Mb = 0;
    }
    function E2(t4, r2, n3, i3) {
      e(null != n3), e(null != i3);
      var a3 = n3[0], o3 = i3[0];
      return 0 == a3 && (a3 = (t4 * o3 + r2 / 2) / r2), 0 == o3 && (o3 = (r2 * a3 + t4 / 2) / t4), 0 >= a3 || 0 >= o3 ? 0 : (n3[0] = a3, i3[0] = o3, 1);
    }
    function q2(t4, e2) {
      return t4 + (1 << e2) - 1 >>> e2;
    }
    function D2(t4, e2) {
      return ((4278255360 & t4) + (4278255360 & e2) >>> 0 & 4278255360) + ((16711935 & t4) + (16711935 & e2) >>> 0 & 16711935) >>> 0;
    }
    function R2(e2, r2) {
      t3[r2] = function(r3, n3, i3, a3, o3, s3, c4) {
        var u4;
        for (u4 = 0; u4 < o3; ++u4) {
          var h4 = t3[e2](s3[c4 + u4 - 1], i3, a3 + u4);
          s3[c4 + u4] = D2(r3[n3 + u4], h4);
        }
      };
    }
    function T2() {
      this.ud = this.hd = this.jd = 0;
    }
    function U2(t4, e2) {
      return ((4278124286 & (t4 ^ e2)) >>> 1) + (t4 & e2) >>> 0;
    }
    function z2(t4) {
      return 0 <= t4 && 256 > t4 ? t4 : 0 > t4 ? 0 : 255 < t4 ? 255 : void 0;
    }
    function H2(t4, e2) {
      return z2(t4 + (t4 - e2 + 0.5 >> 1));
    }
    function W2(t4, e2, r2) {
      return Math.abs(e2 - r2) - Math.abs(t4 - r2);
    }
    function V2(t4, e2, r2, n3, i3, a3, o3) {
      for (n3 = a3[o3 - 1], r2 = 0; r2 < i3; ++r2) a3[o3 + r2] = n3 = D2(t4[e2 + r2], n3);
    }
    function G2(t4, e2, r2, n3, i3) {
      var a3;
      for (a3 = 0; a3 < r2; ++a3) {
        var o3 = t4[e2 + a3], s3 = o3 >> 8 & 255, c4 = 16711935 & (c4 = (c4 = 16711935 & o3) + ((s3 << 16) + s3));
        n3[i3 + a3] = (4278255360 & o3) + c4 >>> 0;
      }
    }
    function Y2(t4, e2) {
      e2.jd = t4 >> 0 & 255, e2.hd = t4 >> 8 & 255, e2.ud = t4 >> 16 & 255;
    }
    function J2(t4, e2, r2, n3, i3, a3) {
      var o3;
      for (o3 = 0; o3 < n3; ++o3) {
        var s3 = e2[r2 + o3], c4 = s3 >>> 8, u4 = s3, h4 = 255 & (h4 = (h4 = s3 >>> 16) + ((t4.jd << 24 >> 24) * (c4 << 24 >> 24) >>> 5));
        u4 = 255 & (u4 = (u4 = u4 + ((t4.hd << 24 >> 24) * (c4 << 24 >> 24) >>> 5)) + ((t4.ud << 24 >> 24) * (h4 << 24 >> 24) >>> 5));
        i3[a3 + o3] = (4278255360 & s3) + (h4 << 16) + u4;
      }
    }
    function X2(e2, r2, n3, i3, a3) {
      t3[r2] = function(t4, e3, r3, n4, o3, s3, c4, u4, h4) {
        for (n4 = c4; n4 < u4; ++n4) for (c4 = 0; c4 < h4; ++c4) o3[s3++] = a3(r3[i3(t4[e3++])]);
      }, t3[e2] = function(e3, r3, o3, s3, c4, u4, h4) {
        var l4 = 8 >> e3.b, f4 = e3.Ea, d4 = e3.K[0], p4 = e3.w;
        if (8 > l4) for (e3 = (1 << e3.b) - 1, p4 = (1 << l4) - 1; r3 < o3; ++r3) {
          var g4, m4 = 0;
          for (g4 = 0; g4 < f4; ++g4) g4 & e3 || (m4 = i3(s3[c4++])), u4[h4++] = a3(d4[m4 & p4]), m4 >>= l4;
        }
        else t3["VP8LMapColor" + n3](s3, c4, d4, p4, u4, h4, r3, o3, f4);
      };
    }
    function K2(t4, e2, r2, n3, i3) {
      for (r2 = e2 + r2; e2 < r2; ) {
        var a3 = t4[e2++];
        n3[i3++] = a3 >> 16 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 0 & 255;
      }
    }
    function Z2(t4, e2, r2, n3, i3) {
      for (r2 = e2 + r2; e2 < r2; ) {
        var a3 = t4[e2++];
        n3[i3++] = a3 >> 16 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 0 & 255, n3[i3++] = a3 >> 24 & 255;
      }
    }
    function $2(t4, e2, r2, n3, i3) {
      for (r2 = e2 + r2; e2 < r2; ) {
        var a3 = (o3 = t4[e2++]) >> 16 & 240 | o3 >> 12 & 15, o3 = o3 >> 0 & 240 | o3 >> 28 & 15;
        n3[i3++] = a3, n3[i3++] = o3;
      }
    }
    function Q2(t4, e2, r2, n3, i3) {
      for (r2 = e2 + r2; e2 < r2; ) {
        var a3 = (o3 = t4[e2++]) >> 16 & 248 | o3 >> 13 & 7, o3 = o3 >> 5 & 224 | o3 >> 3 & 31;
        n3[i3++] = a3, n3[i3++] = o3;
      }
    }
    function tt2(t4, e2, r2, n3, i3) {
      for (r2 = e2 + r2; e2 < r2; ) {
        var a3 = t4[e2++];
        n3[i3++] = a3 >> 0 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 16 & 255;
      }
    }
    function et2(t4, e2, r2, i3, a3, o3) {
      if (0 == o3) for (r2 = e2 + r2; e2 < r2; ) I2(i3, ((o3 = t4[e2++])[0] >> 24 | o3[1] >> 8 & 65280 | o3[2] << 8 & 16711680 | o3[3] << 24) >>> 0), a3 += 32;
      else n2(i3, a3, t4, e2, r2);
    }
    function rt2(e2, r2) {
      t3[r2][0] = t3[e2 + "0"], t3[r2][1] = t3[e2 + "1"], t3[r2][2] = t3[e2 + "2"], t3[r2][3] = t3[e2 + "3"], t3[r2][4] = t3[e2 + "4"], t3[r2][5] = t3[e2 + "5"], t3[r2][6] = t3[e2 + "6"], t3[r2][7] = t3[e2 + "7"], t3[r2][8] = t3[e2 + "8"], t3[r2][9] = t3[e2 + "9"], t3[r2][10] = t3[e2 + "10"], t3[r2][11] = t3[e2 + "11"], t3[r2][12] = t3[e2 + "12"], t3[r2][13] = t3[e2 + "13"], t3[r2][14] = t3[e2 + "0"], t3[r2][15] = t3[e2 + "0"];
    }
    function nt2(t4) {
      return t4 == Hn || t4 == Wn || t4 == Vn || t4 == Gn;
    }
    function it2() {
      this.eb = [], this.size = this.A = this.fb = 0;
    }
    function at2() {
      this.y = [], this.f = [], this.ea = [], this.F = [], this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }
    function ot2() {
      this.Rd = this.height = this.width = this.S = 0, this.f = {}, this.f.RGBA = new it2(), this.f.kb = new at2(), this.sd = null;
    }
    function st2() {
      this.width = [0], this.height = [0], this.Pd = [0], this.Qd = [0], this.format = [0];
    }
    function ct2() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }
    function ut2(t4) {
      return alert("todo:WebPSamplerProcessPlane"), t4.T;
    }
    function ht2(t4, e2) {
      var r2 = t4.T, i3 = e2.ba.f.RGBA, a3 = i3.eb, o3 = i3.fb + t4.ka * i3.A, s3 = vi[e2.ba.S], c4 = t4.y, u4 = t4.O, h4 = t4.f, l4 = t4.N, f4 = t4.ea, d4 = t4.W, p4 = e2.cc, g4 = e2.dc, m4 = e2.Mc, v4 = e2.Nc, b4 = t4.ka, y4 = t4.ka + t4.T, w4 = t4.U, N4 = w4 + 1 >> 1;
      for (0 == b4 ? s3(c4, u4, null, null, h4, l4, f4, d4, h4, l4, f4, d4, a3, o3, null, null, w4) : (s3(e2.ec, e2.fc, c4, u4, p4, g4, m4, v4, h4, l4, f4, d4, a3, o3 - i3.A, a3, o3, w4), ++r2); b4 + 2 < y4; b4 += 2) p4 = h4, g4 = l4, m4 = f4, v4 = d4, l4 += t4.Rc, d4 += t4.Rc, o3 += 2 * i3.A, s3(c4, (u4 += 2 * t4.fa) - t4.fa, c4, u4, p4, g4, m4, v4, h4, l4, f4, d4, a3, o3 - i3.A, a3, o3, w4);
      return u4 += t4.fa, t4.j + y4 < t4.o ? (n2(e2.ec, e2.fc, c4, u4, w4), n2(e2.cc, e2.dc, h4, l4, N4), n2(e2.Mc, e2.Nc, f4, d4, N4), r2--) : 1 & y4 || s3(c4, u4, null, null, h4, l4, f4, d4, h4, l4, f4, d4, a3, o3 + i3.A, null, null, w4), r2;
    }
    function lt2(t4, r2, n3) {
      var i3 = t4.F, a3 = [t4.J];
      if (null != i3) {
        var o3 = t4.U, s3 = r2.ba.S, c4 = s3 == Tn || s3 == Vn;
        r2 = r2.ba.f.RGBA;
        var u4 = [0], h4 = t4.ka;
        u4[0] = t4.T, t4.Kb && (0 == h4 ? --u4[0] : (--h4, a3[0] -= t4.width), t4.j + t4.ka + t4.T == t4.o && (u4[0] = t4.o - t4.j - h4));
        var l4 = r2.eb;
        h4 = r2.fb + h4 * r2.A;
        t4 = Sn(i3, a3[0], t4.width, o3, u4, l4, h4 + (c4 ? 0 : 3), r2.A), e(n3 == u4), t4 && nt2(s3) && An(l4, h4, c4, o3, u4, r2.A);
      }
      return 0;
    }
    function ft2(t4) {
      var e2 = t4.ma, r2 = e2.ba.S, n3 = 11 > r2, i3 = r2 == qn || r2 == Rn || r2 == Tn || r2 == Un || 12 == r2 || nt2(r2);
      if (e2.memory = null, e2.Ib = null, e2.Jb = null, e2.Nd = null, !Mr(e2.Oa, t4, i3 ? 11 : 12)) return 0;
      if (i3 && nt2(r2) && br(), t4.da) alert("todo:use_scaling");
      else {
        if (n3) {
          if (e2.Ib = ut2, t4.Kb) {
            if (r2 = t4.U + 1 >> 1, e2.memory = a2(t4.U + 2 * r2), null == e2.memory) return 0;
            e2.ec = e2.memory, e2.fc = 0, e2.cc = e2.ec, e2.dc = e2.fc + t4.U, e2.Mc = e2.cc, e2.Nc = e2.dc + r2, e2.Ib = ht2, br();
          }
        } else alert("todo:EmitYUV");
        i3 && (e2.Jb = lt2, n3 && mr());
      }
      if (n3 && !Ci) {
        for (t4 = 0; 256 > t4; ++t4) ji[t4] = 89858 * (t4 - 128) + _i >> Si, Mi[t4] = -22014 * (t4 - 128) + _i, Bi[t4] = -45773 * (t4 - 128), Oi[t4] = 113618 * (t4 - 128) + _i >> Si;
        for (t4 = Pi; t4 < ki; ++t4) e2 = 76283 * (t4 - 16) + _i >> Si, Ei[t4 - Pi] = Vt2(e2, 255), qi[t4 - Pi] = Vt2(e2 + 8 >> 4, 15);
        Ci = 1;
      }
      return 1;
    }
    function dt2(t4) {
      var r2 = t4.ma, n3 = t4.U, i3 = t4.T;
      return e(!(1 & t4.ka)), 0 >= n3 || 0 >= i3 ? 0 : (n3 = r2.Ib(t4, r2), null != r2.Jb && r2.Jb(t4, r2, n3), r2.Dc += n3, 1);
    }
    function pt2(t4) {
      t4.ma.memory = null;
    }
    function gt2(t4, e2, r2, n3) {
      return 47 != y3(t4, 8) ? 0 : (e2[0] = y3(t4, 14) + 1, r2[0] = y3(t4, 14) + 1, n3[0] = y3(t4, 1), 0 != y3(t4, 3) ? 0 : !t4.h);
    }
    function mt2(t4, e2) {
      if (4 > t4) return t4 + 1;
      var r2 = t4 - 2 >> 1;
      return (2 + (1 & t4) << r2) + y3(e2, r2) + 1;
    }
    function vt2(t4, e2) {
      return 120 < e2 ? e2 - 120 : 1 <= (r2 = ((r2 = $n[e2 - 1]) >> 4) * t4 + (8 - (15 & r2))) ? r2 : 1;
      var r2;
    }
    function bt2(t4, e2, r2) {
      var n3 = L3(r2), i3 = t4[e2 += 255 & n3].g - 8;
      return 0 < i3 && (x2(r2, r2.u + 8), n3 = L3(r2), e2 += t4[e2].value, e2 += n3 & (1 << i3) - 1), x2(r2, r2.u + t4[e2].g), t4[e2].value;
    }
    function yt2(t4, r2, n3) {
      return n3.g += t4.g, n3.value += t4.value << r2 >>> 0, e(8 >= n3.g), t4.g;
    }
    function wt2(t4, r2, n3) {
      var i3 = t4.xc;
      return e((r2 = 0 == i3 ? 0 : t4.vc[t4.md * (n3 >> i3) + (r2 >> i3)]) < t4.Wb), t4.Ya[r2];
    }
    function Nt2(t4, r2, i3, a3) {
      var o3 = t4.ab, s3 = t4.c * r2, c4 = t4.C;
      r2 = c4 + r2;
      var u4 = i3, h4 = a3;
      for (a3 = t4.Ta, i3 = t4.Ua; 0 < o3--; ) {
        var l4 = t4.gc[o3], f4 = c4, d4 = r2, p4 = u4, g4 = h4, m4 = (h4 = a3, u4 = i3, l4.Ea);
        switch (e(f4 < d4), e(d4 <= l4.nc), l4.hc) {
          case 2:
            Gr(p4, g4, (d4 - f4) * m4, h4, u4);
            break;
          case 0:
            var v4 = f4, b4 = d4, y4 = h4, w4 = u4, N4 = (_3 = l4).Ea;
            0 == v4 && (Wr(p4, g4, null, null, 1, y4, w4), V2(p4, g4 + 1, 0, 0, N4 - 1, y4, w4 + 1), g4 += N4, w4 += N4, ++v4);
            for (var L4 = 1 << _3.b, A4 = L4 - 1, x3 = q2(N4, _3.b), S3 = _3.K, _3 = _3.w + (v4 >> _3.b) * x3; v4 < b4; ) {
              var P3 = S3, k3 = _3, I3 = 1;
              for (Vr(p4, g4, y4, w4 - N4, 1, y4, w4); I3 < N4; ) {
                var F3 = (I3 & ~A4) + L4;
                F3 > N4 && (F3 = N4), (0, Zr[P3[k3++] >> 8 & 15])(p4, g4 + +I3, y4, w4 + I3 - N4, F3 - I3, y4, w4 + I3), I3 = F3;
              }
              g4 += N4, w4 += N4, ++v4 & A4 || (_3 += x3);
            }
            d4 != l4.nc && n2(h4, u4 - m4, h4, u4 + (d4 - f4 - 1) * m4, m4);
            break;
          case 1:
            for (m4 = p4, b4 = g4, N4 = (p4 = l4.Ea) - (w4 = p4 & ~(y4 = (g4 = 1 << l4.b) - 1)), v4 = q2(p4, l4.b), L4 = l4.K, l4 = l4.w + (f4 >> l4.b) * v4; f4 < d4; ) {
              for (A4 = L4, x3 = l4, S3 = new T2(), _3 = b4 + w4, P3 = b4 + p4; b4 < _3; ) Y2(A4[x3++], S3), $r(S3, m4, b4, g4, h4, u4), b4 += g4, u4 += g4;
              b4 < P3 && (Y2(A4[x3++], S3), $r(S3, m4, b4, N4, h4, u4), b4 += N4, u4 += N4), ++f4 & y4 || (l4 += v4);
            }
            break;
          case 3:
            if (p4 == h4 && g4 == u4 && 0 < l4.b) {
              for (b4 = h4, p4 = m4 = u4 + (d4 - f4) * m4 - (w4 = (d4 - f4) * q2(l4.Ea, l4.b)), g4 = h4, y4 = u4, v4 = [], w4 = (N4 = w4) - 1; 0 <= w4; --w4) v4[w4] = g4[y4 + w4];
              for (w4 = N4 - 1; 0 <= w4; --w4) b4[p4 + w4] = v4[w4];
              Yr(l4, f4, d4, h4, m4, h4, u4);
            } else Yr(l4, f4, d4, p4, g4, h4, u4);
        }
        u4 = a3, h4 = i3;
      }
      h4 != i3 && n2(a3, i3, u4, h4, s3);
    }
    function Lt2(t4, r2) {
      var n3 = t4.V, i3 = t4.Ba + t4.c * t4.C, a3 = r2 - t4.C;
      if (e(r2 <= t4.l.o), e(16 >= a3), 0 < a3) {
        var o3 = t4.l, s3 = t4.Ta, c4 = t4.Ua, u4 = o3.width;
        if (Nt2(t4, a3, n3, i3), a3 = c4 = [c4], e((n3 = t4.C) < (i3 = r2)), e(o3.v < o3.va), i3 > o3.o && (i3 = o3.o), n3 < o3.j) {
          var h4 = o3.j - n3;
          n3 = o3.j;
          a3[0] += h4 * u4;
        }
        if (n3 >= i3 ? n3 = 0 : (a3[0] += 4 * o3.v, o3.ka = n3 - o3.j, o3.U = o3.va - o3.v, o3.T = i3 - n3, n3 = 1), n3) {
          if (c4 = c4[0], 11 > (n3 = t4.ca).S) {
            var l4 = n3.f.RGBA, f4 = (i3 = n3.S, a3 = o3.U, o3 = o3.T, h4 = l4.eb, l4.A), d4 = o3;
            for (l4 = l4.fb + t4.Ma * l4.A; 0 < d4--; ) {
              var p4 = s3, g4 = c4, m4 = a3, v4 = h4, b4 = l4;
              switch (i3) {
                case En:
                  Qr(p4, g4, m4, v4, b4);
                  break;
                case qn:
                  tn(p4, g4, m4, v4, b4);
                  break;
                case Hn:
                  tn(p4, g4, m4, v4, b4), An(v4, b4, 0, m4, 1, 0);
                  break;
                case Dn:
                  nn(p4, g4, m4, v4, b4);
                  break;
                case Rn:
                  et2(p4, g4, m4, v4, b4, 1);
                  break;
                case Wn:
                  et2(p4, g4, m4, v4, b4, 1), An(v4, b4, 0, m4, 1, 0);
                  break;
                case Tn:
                  et2(p4, g4, m4, v4, b4, 0);
                  break;
                case Vn:
                  et2(p4, g4, m4, v4, b4, 0), An(v4, b4, 1, m4, 1, 0);
                  break;
                case Un:
                  en(p4, g4, m4, v4, b4);
                  break;
                case Gn:
                  en(p4, g4, m4, v4, b4), xn(v4, b4, m4, 1, 0);
                  break;
                case zn:
                  rn(p4, g4, m4, v4, b4);
                  break;
                default:
                  e(0);
              }
              c4 += u4, l4 += f4;
            }
            t4.Ma += o3;
          } else alert("todo:EmitRescaledRowsYUVA");
          e(t4.Ma <= n3.height);
        }
      }
      t4.C = r2, e(t4.C <= t4.i);
    }
    function At2(t4) {
      var e2;
      if (0 < t4.ua) return 0;
      for (e2 = 0; e2 < t4.Wb; ++e2) {
        var r2 = t4.Ya[e2].G, n3 = t4.Ya[e2].H;
        if (0 < r2[1][n3[1] + 0].g || 0 < r2[2][n3[2] + 0].g || 0 < r2[3][n3[3] + 0].g) return 0;
      }
      return 1;
    }
    function xt2(t4, r2, n3, i3, a3, o3) {
      if (0 != t4.Z) {
        var s3 = t4.qd, c4 = t4.rd;
        for (e(null != mi[t4.Z]); r2 < n3; ++r2) mi[t4.Z](s3, c4, i3, a3, i3, a3, o3), s3 = i3, c4 = a3, a3 += o3;
        t4.qd = s3, t4.rd = c4;
      }
    }
    function St(t4, r2) {
      var n3 = t4.l.ma, i3 = 0 == n3.Z || 1 == n3.Z ? t4.l.j : t4.C;
      i3 = t4.C < i3 ? i3 : t4.C;
      if (e(r2 <= t4.l.o), r2 > i3) {
        var a3 = t4.l.width, o3 = n3.ca, s3 = n3.tb + a3 * i3, c4 = t4.V, u4 = t4.Ba + t4.c * i3, h4 = t4.gc;
        e(1 == t4.ab), e(3 == h4[0].hc), Xr(h4[0], i3, r2, c4, u4, o3, s3), xt2(n3, i3, r2, o3, s3, a3);
      }
      t4.C = t4.Ma = r2;
    }
    function _t2(t4, r2, n3, i3, a3, o3, s3) {
      var c4 = t4.$ / i3, u4 = t4.$ % i3, h4 = t4.m, l4 = t4.s, f4 = n3 + t4.$, d4 = f4;
      a3 = n3 + i3 * a3;
      var p4 = n3 + i3 * o3, g4 = 280 + l4.ua, m4 = t4.Pb ? c4 : 16777216, v4 = 0 < l4.ua ? l4.Wa : null, b4 = l4.wc, y4 = f4 < p4 ? wt2(l4, u4, c4) : null;
      e(t4.C < o3), e(p4 <= a3);
      var w4 = false;
      t: for (; ; ) {
        for (; w4 || f4 < p4; ) {
          var N4 = 0;
          if (c4 >= m4) {
            var _3 = f4 - n3;
            e((m4 = t4).Pb), m4.wd = m4.m, m4.xd = _3, 0 < m4.s.ua && B2(m4.s.Wa, m4.s.vb), m4 = c4 + ti;
          }
          if (u4 & b4 || (y4 = wt2(l4, u4, c4)), e(null != y4), y4.Qb && (r2[f4] = y4.qb, w4 = true), !w4) if (S2(h4), y4.jc) {
            N4 = h4, _3 = r2;
            var P3 = f4, k3 = y4.pd[L3(N4) & Dr - 1];
            e(y4.jc), 256 > k3.g ? (x2(N4, N4.u + k3.g), _3[P3] = k3.value, N4 = 0) : (x2(N4, N4.u + k3.g - 256), e(256 <= k3.value), N4 = k3.value), 0 == N4 && (w4 = true);
          } else N4 = bt2(y4.G[0], y4.H[0], h4);
          if (h4.h) break;
          if (w4 || 256 > N4) {
            if (!w4) if (y4.nd) r2[f4] = (y4.qb | N4 << 8) >>> 0;
            else {
              if (S2(h4), w4 = bt2(y4.G[1], y4.H[1], h4), S2(h4), _3 = bt2(y4.G[2], y4.H[2], h4), P3 = bt2(y4.G[3], y4.H[3], h4), h4.h) break;
              r2[f4] = (P3 << 24 | w4 << 16 | N4 << 8 | _3) >>> 0;
            }
            if (w4 = false, ++f4, ++u4 >= i3 && (u4 = 0, ++c4, null != s3 && c4 <= o3 && !(c4 % 16) && s3(t4, c4), null != v4)) for (; d4 < f4; ) N4 = r2[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
          } else if (280 > N4) {
            if (N4 = mt2(N4 - 256, h4), _3 = bt2(y4.G[4], y4.H[4], h4), S2(h4), _3 = vt2(i3, _3 = mt2(_3, h4)), h4.h) break;
            if (f4 - n3 < _3 || a3 - f4 < N4) break t;
            for (P3 = 0; P3 < N4; ++P3) r2[f4 + P3] = r2[f4 + P3 - _3];
            for (f4 += N4, u4 += N4; u4 >= i3; ) u4 -= i3, ++c4, null != s3 && c4 <= o3 && !(c4 % 16) && s3(t4, c4);
            if (e(f4 <= a3), u4 & b4 && (y4 = wt2(l4, u4, c4)), null != v4) for (; d4 < f4; ) N4 = r2[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
          } else {
            if (!(N4 < g4)) break t;
            for (w4 = N4 - 280, e(null != v4); d4 < f4; ) N4 = r2[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
            N4 = f4, e(!(w4 >>> (_3 = v4).Xa)), r2[N4] = _3.X[w4], w4 = true;
          }
          w4 || e(h4.h == A3(h4));
        }
        if (t4.Pb && h4.h && f4 < a3) e(t4.m.h), t4.a = 5, t4.m = t4.wd, t4.$ = t4.xd, 0 < t4.s.ua && B2(t4.s.vb, t4.s.Wa);
        else {
          if (h4.h) break t;
          null != s3 && s3(t4, c4 > o3 ? o3 : c4), t4.a = 0, t4.$ = f4 - n3;
        }
        return 1;
      }
      return t4.a = 3, 0;
    }
    function Pt2(t4) {
      e(null != t4), t4.vc = null, t4.yc = null, t4.Ya = null;
      var r2 = t4.Wa;
      null != r2 && (r2.X = null), t4.vb = null, e(null != t4);
    }
    function kt2() {
      var e2 = new or();
      return null == e2 ? null : (e2.a = 0, e2.xb = gi, rt2("Predictor", "VP8LPredictors"), rt2("Predictor", "VP8LPredictors_C"), rt2("PredictorAdd", "VP8LPredictorsAdd"), rt2("PredictorAdd", "VP8LPredictorsAdd_C"), Gr = G2, $r = J2, Qr = K2, tn = Z2, en = $2, rn = Q2, nn = tt2, t3.VP8LMapColor32b = Jr, t3.VP8LMapColor8b = Kr, e2);
    }
    function It2(t4, r2, n3, s3, c4) {
      var u4 = 1, f4 = [t4], p4 = [r2], g4 = s3.m, m4 = s3.s, v4 = null, b4 = 0;
      t: for (; ; ) {
        if (n3) for (; u4 && y3(g4, 1); ) {
          var w4 = f4, N4 = p4, A4 = s3, _3 = 1, P3 = A4.m, k3 = A4.gc[A4.ab], I3 = y3(P3, 2);
          if (A4.Oc & 1 << I3) u4 = 0;
          else {
            switch (A4.Oc |= 1 << I3, k3.hc = I3, k3.Ea = w4[0], k3.nc = N4[0], k3.K = [null], ++A4.ab, e(4 >= A4.ab), I3) {
              case 0:
              case 1:
                k3.b = y3(P3, 3) + 2, _3 = It2(q2(k3.Ea, k3.b), q2(k3.nc, k3.b), 0, A4, k3.K), k3.K = k3.K[0];
                break;
              case 3:
                var F3, C3 = y3(P3, 8) + 1, j3 = 16 < C3 ? 0 : 4 < C3 ? 1 : 2 < C3 ? 2 : 3;
                if (w4[0] = q2(k3.Ea, j3), k3.b = j3, F3 = _3 = It2(C3, 1, 0, A4, k3.K)) {
                  var B3, M3 = C3, E3 = k3, R3 = 1 << (8 >> E3.b), T3 = a2(R3);
                  if (null == T3) F3 = 0;
                  else {
                    var U3 = E3.K[0], z3 = E3.w;
                    for (T3[0] = E3.K[0][0], B3 = 1; B3 < 1 * M3; ++B3) T3[B3] = D2(U3[z3 + B3], T3[B3 - 1]);
                    for (; B3 < 4 * R3; ++B3) T3[B3] = 0;
                    E3.K[0] = null, E3.K[0] = T3, F3 = 1;
                  }
                }
                _3 = F3;
                break;
              case 2:
                break;
              default:
                e(0);
            }
            u4 = _3;
          }
        }
        if (f4 = f4[0], p4 = p4[0], u4 && y3(g4, 1) && !(u4 = 1 <= (b4 = y3(g4, 4)) && 11 >= b4)) {
          s3.a = 3;
          break t;
        }
        var H3;
        if (H3 = u4) e: {
          var W3, V3, G3, Y3 = s3, J3 = f4, X3 = p4, K3 = b4, Z3 = n3, $3 = Y3.m, Q3 = Y3.s, tt3 = [null], et3 = 1, rt3 = 0, nt3 = Qn[K3];
          r: for (; ; ) {
            if (Z3 && y3($3, 1)) {
              var it3 = y3($3, 3) + 2, at3 = q2(J3, it3), ot3 = q2(X3, it3), st3 = at3 * ot3;
              if (!It2(at3, ot3, 0, Y3, tt3)) break r;
              for (tt3 = tt3[0], Q3.xc = it3, W3 = 0; W3 < st3; ++W3) {
                var ct3 = tt3[W3] >> 8 & 65535;
                tt3[W3] = ct3, ct3 >= et3 && (et3 = ct3 + 1);
              }
            }
            if ($3.h) break r;
            for (V3 = 0; 5 > V3; ++V3) {
              var ut3 = Xn[V3];
              !V3 && 0 < K3 && (ut3 += 1 << K3), rt3 < ut3 && (rt3 = ut3);
            }
            var ht3 = o2(et3 * nt3, l3), lt3 = et3, ft3 = o2(lt3, d3);
            if (null == ft3) var dt3 = null;
            else e(65536 >= lt3), dt3 = ft3;
            var pt3 = a2(rt3);
            if (null == dt3 || null == pt3 || null == ht3) {
              Y3.a = 1;
              break r;
            }
            var gt3 = ht3;
            for (W3 = G3 = 0; W3 < et3; ++W3) {
              var mt3 = dt3[W3], vt3 = mt3.G, bt3 = mt3.H, wt3 = 0, Nt3 = 1, Lt3 = 0;
              for (V3 = 0; 5 > V3; ++V3) {
                ut3 = Xn[V3], vt3[V3] = gt3, bt3[V3] = G3, !V3 && 0 < K3 && (ut3 += 1 << K3);
                n: {
                  var At3, xt3 = ut3, St2 = Y3, kt3 = pt3, Ft3 = gt3, Ct3 = G3, jt3 = 0, Ot3 = St2.m, Bt3 = y3(Ot3, 1);
                  if (i2(kt3, 0, 0, xt3), Bt3) {
                    var Mt3 = y3(Ot3, 1) + 1, Et3 = y3(Ot3, 1), qt3 = y3(Ot3, 0 == Et3 ? 1 : 8);
                    kt3[qt3] = 1, 2 == Mt3 && (kt3[qt3 = y3(Ot3, 8)] = 1);
                    var Dt3 = 1;
                  } else {
                    var Rt3 = a2(19), Tt3 = y3(Ot3, 4) + 4;
                    if (19 < Tt3) {
                      St2.a = 3;
                      var Ut3 = 0;
                      break n;
                    }
                    for (At3 = 0; At3 < Tt3; ++At3) Rt3[Zn[At3]] = y3(Ot3, 3);
                    var zt3 = void 0, Ht3 = void 0, Wt3 = St2, Vt3 = Rt3, Gt3 = xt3, Yt3 = kt3, Jt3 = 0, Xt3 = Wt3.m, Kt3 = 8, Zt3 = o2(128, l3);
                    i: for (; h3(Zt3, 0, 7, Vt3, 19); ) {
                      if (y3(Xt3, 1)) {
                        var $t3 = 2 + 2 * y3(Xt3, 3);
                        if ((zt3 = 2 + y3(Xt3, $t3)) > Gt3) break i;
                      } else zt3 = Gt3;
                      for (Ht3 = 0; Ht3 < Gt3 && zt3--; ) {
                        S2(Xt3);
                        var Qt3 = Zt3[0 + (127 & L3(Xt3))];
                        x2(Xt3, Xt3.u + Qt3.g);
                        var te3 = Qt3.value;
                        if (16 > te3) Yt3[Ht3++] = te3, 0 != te3 && (Kt3 = te3);
                        else {
                          var ee3 = 16 == te3, re3 = te3 - 16, ne3 = Jn[re3], ie3 = y3(Xt3, Yn[re3]) + ne3;
                          if (Ht3 + ie3 > Gt3) break i;
                          for (var ae3 = ee3 ? Kt3 : 0; 0 < ie3--; ) Yt3[Ht3++] = ae3;
                        }
                      }
                      Jt3 = 1;
                      break i;
                    }
                    Jt3 || (Wt3.a = 3), Dt3 = Jt3;
                  }
                  (Dt3 = Dt3 && !Ot3.h) && (jt3 = h3(Ft3, Ct3, 8, kt3, xt3)), Dt3 && 0 != jt3 ? Ut3 = jt3 : (St2.a = 3, Ut3 = 0);
                }
                if (0 == Ut3) break r;
                if (Nt3 && 1 == Kn[V3] && (Nt3 = 0 == gt3[G3].g), wt3 += gt3[G3].g, G3 += Ut3, 3 >= V3) {
                  var oe3, se3 = pt3[0];
                  for (oe3 = 1; oe3 < ut3; ++oe3) pt3[oe3] > se3 && (se3 = pt3[oe3]);
                  Lt3 += se3;
                }
              }
              if (mt3.nd = Nt3, mt3.Qb = 0, Nt3 && (mt3.qb = (vt3[3][bt3[3] + 0].value << 24 | vt3[1][bt3[1] + 0].value << 16 | vt3[2][bt3[2] + 0].value) >>> 0, 0 == wt3 && 256 > vt3[0][bt3[0] + 0].value && (mt3.Qb = 1, mt3.qb += vt3[0][bt3[0] + 0].value << 8)), mt3.jc = !mt3.Qb && 6 > Lt3, mt3.jc) {
                var ce3, ue3 = mt3;
                for (ce3 = 0; ce3 < Dr; ++ce3) {
                  var he3 = ce3, le3 = ue3.pd[he3], fe3 = ue3.G[0][ue3.H[0] + he3];
                  256 <= fe3.value ? (le3.g = fe3.g + 256, le3.value = fe3.value) : (le3.g = 0, le3.value = 0, he3 >>= yt2(fe3, 8, le3), he3 >>= yt2(ue3.G[1][ue3.H[1] + he3], 16, le3), he3 >>= yt2(ue3.G[2][ue3.H[2] + he3], 0, le3), yt2(ue3.G[3][ue3.H[3] + he3], 24, le3));
                }
              }
            }
            Q3.vc = tt3, Q3.Wb = et3, Q3.Ya = dt3, Q3.yc = ht3, H3 = 1;
            break e;
          }
          H3 = 0;
        }
        if (!(u4 = H3)) {
          s3.a = 3;
          break t;
        }
        if (0 < b4) {
          if (m4.ua = 1 << b4, !O2(m4.Wa, b4)) {
            s3.a = 1, u4 = 0;
            break t;
          }
        } else m4.ua = 0;
        var de3 = s3, pe3 = f4, ge3 = p4, me3 = de3.s, ve3 = me3.xc;
        if (de3.c = pe3, de3.i = ge3, me3.md = q2(pe3, ve3), me3.wc = 0 == ve3 ? -1 : (1 << ve3) - 1, n3) {
          s3.xb = pi;
          break t;
        }
        if (null == (v4 = a2(f4 * p4))) {
          s3.a = 1, u4 = 0;
          break t;
        }
        u4 = (u4 = _t2(s3, v4, 0, f4, p4, p4, null)) && !g4.h;
        break t;
      }
      return u4 ? (null != c4 ? c4[0] = v4 : (e(null == v4), e(n3)), s3.$ = 0, n3 || Pt2(m4)) : Pt2(m4), u4;
    }
    function Ft2(t4, r2) {
      var n3 = t4.c * t4.i, i3 = n3 + r2 + 16 * r2;
      return e(t4.c <= r2), t4.V = a2(i3), null == t4.V ? (t4.Ta = null, t4.Ua = 0, t4.a = 1, 0) : (t4.Ta = t4.V, t4.Ua = t4.Ba + n3 + r2, 1);
    }
    function Ct2(t4, r2) {
      var n3 = t4.C, i3 = r2 - n3, a3 = t4.V, o3 = t4.Ba + t4.c * n3;
      for (e(r2 <= t4.l.o); 0 < i3; ) {
        var s3 = 16 < i3 ? 16 : i3, c4 = t4.l.ma, u4 = t4.l.width, h4 = u4 * s3, l4 = c4.ca, f4 = c4.tb + u4 * n3, d4 = t4.Ta, p4 = t4.Ua;
        Nt2(t4, s3, a3, o3), _n(d4, p4, l4, f4, h4), xt2(c4, n3, n3 + s3, l4, f4, u4), i3 -= s3, a3 += s3 * t4.c, n3 += s3;
      }
      e(n3 == r2), t4.C = t4.Ma = r2;
    }
    function jt2() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function Ot2() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function Bt2() {
      this.Fb = this.Bb = this.Cb = 0, this.Zb = a2(4), this.Lb = a2(4);
    }
    function Mt2() {
      this.Yb = function() {
        var t4 = [];
        return function t5(e2, r2, n3) {
          for (var i3 = n3[r2], a3 = 0; a3 < i3 && (e2.push(n3.length > r2 + 1 ? [] : 0), !(n3.length < r2 + 1)); a3++) t5(e2[a3], r2 + 1, n3);
        }(t4, 0, [3, 11]), t4;
      }();
    }
    function Et2() {
      this.jb = a2(3), this.Wc = s2([4, 8], Mt2), this.Xc = s2([4, 17], Mt2);
    }
    function qt2() {
      this.Pc = this.wb = this.Tb = this.zd = 0, this.vd = new a2(4), this.od = new a2(4);
    }
    function Dt2() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function Rt2() {
      this.Na = this.la = 0;
    }
    function Tt2() {
      this.Sc = [0, 0], this.Eb = [0, 0], this.Qc = [0, 0], this.ia = this.lc = 0;
    }
    function Ut2() {
      this.ad = a2(384), this.Za = 0, this.Ob = a2(16), this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }
    function zt2() {
      this.uc = this.M = this.Nb = 0, this.wa = Array(new Dt2()), this.Y = 0, this.ya = Array(new Ut2()), this.aa = 0, this.l = new Gt2();
    }
    function Ht2() {
      this.y = a2(16), this.f = a2(8), this.ea = a2(8);
    }
    function Wt2() {
      this.cb = this.a = 0, this.sc = "", this.m = new w3(), this.Od = new jt2(), this.Kc = new Ot2(), this.ed = new qt2(), this.Qa = new Bt2(), this.Ic = this.$c = this.Aa = 0, this.D = new zt2(), this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0, this.Jc = o2(8, w3), this.ia = 0, this.pb = o2(4, Tt2), this.Pa = new Et2(), this.Bd = this.kc = 0, this.Ac = [], this.Bc = 0, this.zc = [0, 0, 0, 0], this.Gd = Array(new Ht2()), this.Hd = 0, this.rb = Array(new Rt2()), this.sb = 0, this.wa = Array(new Dt2()), this.Y = 0, this.oc = [], this.pc = 0, this.sa = [], this.ta = 0, this.qa = [], this.ra = 0, this.Ha = [], this.B = this.R = this.Ia = 0, this.Ec = [], this.M = this.ja = this.Vb = this.Fc = 0, this.ya = Array(new Ut2()), this.L = this.aa = 0, this.gd = s2([4, 2], Dt2), this.ga = null, this.Fa = [], this.Cc = this.qc = this.P = 0, this.Gb = [], this.Uc = 0, this.mb = [], this.nb = 0, this.rc = [], this.Ga = this.Vc = 0;
    }
    function Vt2(t4, e2) {
      return 0 > t4 ? 0 : t4 > e2 ? e2 : t4;
    }
    function Gt2() {
      this.T = this.U = this.ka = this.height = this.width = 0, this.y = [], this.f = [], this.ea = [], this.Rc = this.fa = this.W = this.N = this.O = 0, this.ma = "void", this.put = "VP8IoPutHook", this.ac = "VP8IoSetupHook", this.bc = "VP8IoTeardownHook", this.ha = this.Kb = 0, this.data = [], this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0, this.F = [], this.J = 0;
    }
    function Yt2() {
      var t4 = new Wt2();
      return null != t4 && (t4.a = 0, t4.sc = "OK", t4.cb = 0, t4.Xb = 0, ni || (ni = Zt2)), t4;
    }
    function Jt2(t4, e2, r2) {
      return 0 == t4.a && (t4.a = e2, t4.sc = r2, t4.cb = 0), 0;
    }
    function Xt2(t4, e2, r2) {
      return 3 <= r2 && 157 == t4[e2 + 0] && 1 == t4[e2 + 1] && 42 == t4[e2 + 2];
    }
    function Kt2(t4, r2) {
      if (null == t4) return 0;
      if (t4.a = 0, t4.sc = "OK", null == r2) return Jt2(t4, 2, "null VP8Io passed to VP8GetHeaders()");
      var n3 = r2.data, a3 = r2.w, o3 = r2.ha;
      if (4 > o3) return Jt2(t4, 7, "Truncated header.");
      var s3 = n3[a3 + 0] | n3[a3 + 1] << 8 | n3[a3 + 2] << 16, c4 = t4.Od;
      if (c4.Rb = !(1 & s3), c4.td = s3 >> 1 & 7, c4.yd = s3 >> 4 & 1, c4.ub = s3 >> 5, 3 < c4.td) return Jt2(t4, 3, "Incorrect keyframe parameters.");
      if (!c4.yd) return Jt2(t4, 4, "Frame not displayable.");
      a3 += 3, o3 -= 3;
      var u4 = t4.Kc;
      if (c4.Rb) {
        if (7 > o3) return Jt2(t4, 7, "cannot parse picture header");
        if (!Xt2(n3, a3, o3)) return Jt2(t4, 3, "Bad code word");
        u4.c = 16383 & (n3[a3 + 4] << 8 | n3[a3 + 3]), u4.Td = n3[a3 + 4] >> 6, u4.i = 16383 & (n3[a3 + 6] << 8 | n3[a3 + 5]), u4.Ud = n3[a3 + 6] >> 6, a3 += 7, o3 -= 7, t4.za = u4.c + 15 >> 4, t4.Ub = u4.i + 15 >> 4, r2.width = u4.c, r2.height = u4.i, r2.Da = 0, r2.j = 0, r2.v = 0, r2.va = r2.width, r2.o = r2.height, r2.da = 0, r2.ib = r2.width, r2.hb = r2.height, r2.U = r2.width, r2.T = r2.height, i2((s3 = t4.Pa).jb, 0, 255, s3.jb.length), e(null != (s3 = t4.Qa)), s3.Cb = 0, s3.Bb = 0, s3.Fb = 1, i2(s3.Zb, 0, 0, s3.Zb.length), i2(s3.Lb, 0, 0, s3.Lb);
      }
      if (c4.ub > o3) return Jt2(t4, 7, "bad partition length");
      p3(s3 = t4.m, n3, a3, c4.ub), a3 += c4.ub, o3 -= c4.ub, c4.Rb && (u4.Ld = P2(s3), u4.Kd = P2(s3)), u4 = t4.Qa;
      var h4, l4 = t4.Pa;
      if (e(null != s3), e(null != u4), u4.Cb = P2(s3), u4.Cb) {
        if (u4.Bb = P2(s3), P2(s3)) {
          for (u4.Fb = P2(s3), h4 = 0; 4 > h4; ++h4) u4.Zb[h4] = P2(s3) ? m3(s3, 7) : 0;
          for (h4 = 0; 4 > h4; ++h4) u4.Lb[h4] = P2(s3) ? m3(s3, 6) : 0;
        }
        if (u4.Bb) for (h4 = 0; 3 > h4; ++h4) l4.jb[h4] = P2(s3) ? g3(s3, 8) : 255;
      } else u4.Bb = 0;
      if (s3.Ka) return Jt2(t4, 3, "cannot parse segment header");
      if ((u4 = t4.ed).zd = P2(s3), u4.Tb = g3(s3, 6), u4.wb = g3(s3, 3), u4.Pc = P2(s3), u4.Pc && P2(s3)) {
        for (l4 = 0; 4 > l4; ++l4) P2(s3) && (u4.vd[l4] = m3(s3, 6));
        for (l4 = 0; 4 > l4; ++l4) P2(s3) && (u4.od[l4] = m3(s3, 6));
      }
      if (t4.L = 0 == u4.Tb ? 0 : u4.zd ? 1 : 2, s3.Ka) return Jt2(t4, 3, "cannot parse filter header");
      var f4 = o3;
      if (o3 = h4 = a3, a3 = h4 + f4, u4 = f4, t4.Xb = (1 << g3(t4.m, 2)) - 1, f4 < 3 * (l4 = t4.Xb)) n3 = 7;
      else {
        for (h4 += 3 * l4, u4 -= 3 * l4, f4 = 0; f4 < l4; ++f4) {
          var d4 = n3[o3 + 0] | n3[o3 + 1] << 8 | n3[o3 + 2] << 16;
          d4 > u4 && (d4 = u4), p3(t4.Jc[+f4], n3, h4, d4), h4 += d4, u4 -= d4, o3 += 3;
        }
        p3(t4.Jc[+l4], n3, h4, u4), n3 = h4 < a3 ? 0 : 5;
      }
      if (0 != n3) return Jt2(t4, n3, "cannot parse partitions");
      for (n3 = g3(h4 = t4.m, 7), o3 = P2(h4) ? m3(h4, 4) : 0, a3 = P2(h4) ? m3(h4, 4) : 0, u4 = P2(h4) ? m3(h4, 4) : 0, l4 = P2(h4) ? m3(h4, 4) : 0, h4 = P2(h4) ? m3(h4, 4) : 0, f4 = t4.Qa, d4 = 0; 4 > d4; ++d4) {
        if (f4.Cb) {
          var v4 = f4.Zb[d4];
          f4.Fb || (v4 += n3);
        } else {
          if (0 < d4) {
            t4.pb[d4] = t4.pb[0];
            continue;
          }
          v4 = n3;
        }
        var b4 = t4.pb[d4];
        b4.Sc[0] = ei[Vt2(v4 + o3, 127)], b4.Sc[1] = ri[Vt2(v4 + 0, 127)], b4.Eb[0] = 2 * ei[Vt2(v4 + a3, 127)], b4.Eb[1] = 101581 * ri[Vt2(v4 + u4, 127)] >> 16, 8 > b4.Eb[1] && (b4.Eb[1] = 8), b4.Qc[0] = ei[Vt2(v4 + l4, 117)], b4.Qc[1] = ri[Vt2(v4 + h4, 127)], b4.lc = v4 + h4;
      }
      if (!c4.Rb) return Jt2(t4, 4, "Not a key frame.");
      for (P2(s3), c4 = t4.Pa, n3 = 0; 4 > n3; ++n3) {
        for (o3 = 0; 8 > o3; ++o3) for (a3 = 0; 3 > a3; ++a3) for (u4 = 0; 11 > u4; ++u4) l4 = k2(s3, ui[n3][o3][a3][u4]) ? g3(s3, 8) : si[n3][o3][a3][u4], c4.Wc[n3][o3].Yb[a3][u4] = l4;
        for (o3 = 0; 17 > o3; ++o3) c4.Xc[n3][o3] = c4.Wc[n3][hi[o3]];
      }
      return t4.kc = P2(s3), t4.kc && (t4.Bd = g3(s3, 8)), t4.cb = 1;
    }
    function Zt2(t4, e2, r2, n3, i3, a3, o3) {
      var s3 = e2[i3].Yb[r2];
      for (r2 = 0; 16 > i3; ++i3) {
        if (!k2(t4, s3[r2 + 0])) return i3;
        for (; !k2(t4, s3[r2 + 1]); ) if (s3 = e2[++i3].Yb[0], r2 = 0, 16 == i3) return 16;
        var c4 = e2[i3 + 1].Yb;
        if (k2(t4, s3[r2 + 2])) {
          var u4 = t4, h4 = 0;
          if (k2(u4, (f4 = s3)[(l4 = r2) + 3])) if (k2(u4, f4[l4 + 6])) {
            for (s3 = 0, l4 = 2 * (h4 = k2(u4, f4[l4 + 8])) + (f4 = k2(u4, f4[l4 + 9 + h4])), h4 = 0, f4 = ii[l4]; f4[s3]; ++s3) h4 += h4 + k2(u4, f4[s3]);
            h4 += 3 + (8 << l4);
          } else k2(u4, f4[l4 + 7]) ? (h4 = 7 + 2 * k2(u4, 165), h4 += k2(u4, 145)) : h4 = 5 + k2(u4, 159);
          else h4 = k2(u4, f4[l4 + 4]) ? 3 + k2(u4, f4[l4 + 5]) : 2;
          s3 = c4[2];
        } else h4 = 1, s3 = c4[1];
        c4 = o3 + ai[i3], 0 > (u4 = t4).b && _2(u4);
        var l4, f4 = u4.b, d4 = (l4 = u4.Ca >> 1) - (u4.I >> f4) >> 31;
        --u4.b, u4.Ca += d4, u4.Ca |= 1, u4.I -= (l4 + 1 & d4) << f4, a3[c4] = ((h4 ^ d4) - d4) * n3[(0 < i3) + 0];
      }
      return 16;
    }
    function $t2(t4) {
      var e2 = t4.rb[t4.sb - 1];
      e2.la = 0, e2.Na = 0, i2(t4.zc, 0, 0, t4.zc.length), t4.ja = 0;
    }
    function Qt2(t4, r2) {
      if (null == t4) return 0;
      if (null == r2) return Jt2(t4, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!t4.cb && !Kt2(t4, r2)) return 0;
      if (e(t4.cb), null == r2.ac || r2.ac(r2)) {
        r2.ob && (t4.L = 0);
        var s3 = Ri[t4.L];
        if (2 == t4.L ? (t4.yb = 0, t4.zb = 0) : (t4.yb = r2.v - s3 >> 4, t4.zb = r2.j - s3 >> 4, 0 > t4.yb && (t4.yb = 0), 0 > t4.zb && (t4.zb = 0)), t4.Va = r2.o + 15 + s3 >> 4, t4.Hb = r2.va + 15 + s3 >> 4, t4.Hb > t4.za && (t4.Hb = t4.za), t4.Va > t4.Ub && (t4.Va = t4.Ub), 0 < t4.L) {
          var c4 = t4.ed;
          for (s3 = 0; 4 > s3; ++s3) {
            var u4;
            if (t4.Qa.Cb) {
              var h4 = t4.Qa.Lb[s3];
              t4.Qa.Fb || (h4 += c4.Tb);
            } else h4 = c4.Tb;
            for (u4 = 0; 1 >= u4; ++u4) {
              var l4 = t4.gd[s3][u4], f4 = h4;
              if (c4.Pc && (f4 += c4.vd[0], u4 && (f4 += c4.od[0])), 0 < (f4 = 0 > f4 ? 0 : 63 < f4 ? 63 : f4)) {
                var d4 = f4;
                0 < c4.wb && ((d4 = 4 < c4.wb ? d4 >> 2 : d4 >> 1) > 9 - c4.wb && (d4 = 9 - c4.wb)), 1 > d4 && (d4 = 1), l4.dd = d4, l4.tc = 2 * f4 + d4, l4.ld = 40 <= f4 ? 2 : 15 <= f4 ? 1 : 0;
              } else l4.tc = 0;
              l4.La = u4;
            }
          }
        }
        s3 = 0;
      } else Jt2(t4, 6, "Frame setup failed"), s3 = t4.a;
      if (s3 = 0 == s3) {
        if (s3) {
          t4.$c = 0, 0 < t4.Aa || (t4.Ic = Ui);
          t: {
            s3 = t4.Ic;
            c4 = 4 * (d4 = t4.za);
            var p4 = 32 * d4, g4 = d4 + 1, m4 = 0 < t4.L ? d4 * (0 < t4.Aa ? 2 : 1) : 0, v4 = (2 == t4.Aa ? 2 : 1) * d4;
            if ((l4 = c4 + 832 + (u4 = 3 * (16 * s3 + Ri[t4.L]) / 2 * p4) + (h4 = null != t4.Fa && 0 < t4.Fa.length ? t4.Kc.c * t4.Kc.i : 0)) != l4) s3 = 0;
            else {
              if (l4 > t4.Vb) {
                if (t4.Vb = 0, t4.Ec = a2(l4), t4.Fc = 0, null == t4.Ec) {
                  s3 = Jt2(t4, 1, "no memory during frame initialization.");
                  break t;
                }
                t4.Vb = l4;
              }
              l4 = t4.Ec, f4 = t4.Fc, t4.Ac = l4, t4.Bc = f4, f4 += c4, t4.Gd = o2(p4, Ht2), t4.Hd = 0, t4.rb = o2(g4 + 1, Rt2), t4.sb = 1, t4.wa = m4 ? o2(m4, Dt2) : null, t4.Y = 0, t4.D.Nb = 0, t4.D.wa = t4.wa, t4.D.Y = t4.Y, 0 < t4.Aa && (t4.D.Y += d4), e(true), t4.oc = l4, t4.pc = f4, f4 += 832, t4.ya = o2(v4, Ut2), t4.aa = 0, t4.D.ya = t4.ya, t4.D.aa = t4.aa, 2 == t4.Aa && (t4.D.aa += d4), t4.R = 16 * d4, t4.B = 8 * d4, d4 = (p4 = Ri[t4.L]) * t4.R, p4 = p4 / 2 * t4.B, t4.sa = l4, t4.ta = f4 + d4, t4.qa = t4.sa, t4.ra = t4.ta + 16 * s3 * t4.R + p4, t4.Ha = t4.qa, t4.Ia = t4.ra + 8 * s3 * t4.B + p4, t4.$c = 0, f4 += u4, t4.mb = h4 ? l4 : null, t4.nb = h4 ? f4 : null, e(f4 + h4 <= t4.Fc + t4.Vb), $t2(t4), i2(t4.Ac, t4.Bc, 0, c4), s3 = 1;
            }
          }
          if (s3) {
            if (r2.ka = 0, r2.y = t4.sa, r2.O = t4.ta, r2.f = t4.qa, r2.N = t4.ra, r2.ea = t4.Ha, r2.Vd = t4.Ia, r2.fa = t4.R, r2.Rc = t4.B, r2.F = null, r2.J = 0, !Cn) {
              for (s3 = -255; 255 >= s3; ++s3) Pn[255 + s3] = 0 > s3 ? -s3 : s3;
              for (s3 = -1020; 1020 >= s3; ++s3) kn[1020 + s3] = -128 > s3 ? -128 : 127 < s3 ? 127 : s3;
              for (s3 = -112; 112 >= s3; ++s3) In[112 + s3] = -16 > s3 ? -16 : 15 < s3 ? 15 : s3;
              for (s3 = -255; 510 >= s3; ++s3) Fn[255 + s3] = 0 > s3 ? 0 : 255 < s3 ? 255 : s3;
              Cn = 1;
            }
            an = ue2, on2 = ae2, cn = oe2, un = se2, hn = ce2, sn = ie2, ln2 = Je, fn = Xe, dn = $e, pn = Qe, gn = Ke, mn = Ze, vn = tr, bn = er, yn = ze, wn = He, Nn = We, Ln = Ve, fi[0] = xe, fi[1] = le2, fi[2] = Le2, fi[3] = Ae, fi[4] = Se, fi[5] = Pe, fi[6] = _e, fi[7] = ke, fi[8] = Fe, fi[9] = Ie, li[0] = ve2, li[1] = de2, li[2] = pe2, li[3] = ge2, li[4] = be2, li[5] = ye2, li[6] = we2, di[0] = Be, di[1] = fe2, di[2] = Ce, di[3] = je, di[4] = Ee, di[5] = Me, di[6] = qe, s3 = 1;
          } else s3 = 0;
        }
        s3 && (s3 = function(t5, r3) {
          for (t5.M = 0; t5.M < t5.Va; ++t5.M) {
            var o3, s4 = t5.Jc[t5.M & t5.Xb], c5 = t5.m, u5 = t5;
            for (o3 = 0; o3 < u5.za; ++o3) {
              var h5 = c5, l5 = u5, f5 = l5.Ac, d5 = l5.Bc + 4 * o3, p5 = l5.zc, g5 = l5.ya[l5.aa + o3];
              if (l5.Qa.Bb ? g5.$b = k2(h5, l5.Pa.jb[0]) ? 2 + k2(h5, l5.Pa.jb[2]) : k2(h5, l5.Pa.jb[1]) : g5.$b = 0, l5.kc && (g5.Ad = k2(h5, l5.Bd)), g5.Za = !k2(h5, 145) + 0, g5.Za) {
                var m5 = g5.Ob, v5 = 0;
                for (l5 = 0; 4 > l5; ++l5) {
                  var b4, y4 = p5[0 + l5];
                  for (b4 = 0; 4 > b4; ++b4) {
                    y4 = ci[f5[d5 + b4]][y4];
                    for (var w4 = oi[k2(h5, y4[0])]; 0 < w4; ) w4 = oi[2 * w4 + k2(h5, y4[w4])];
                    y4 = -w4, f5[d5 + b4] = y4;
                  }
                  n2(m5, v5, f5, d5, 4), v5 += 4, p5[0 + l5] = y4;
                }
              } else y4 = k2(h5, 156) ? k2(h5, 128) ? 1 : 3 : k2(h5, 163) ? 2 : 0, g5.Ob[0] = y4, i2(f5, d5, y4, 4), i2(p5, 0, y4, 4);
              g5.Dd = k2(h5, 142) ? k2(h5, 114) ? k2(h5, 183) ? 1 : 3 : 2 : 0;
            }
            if (u5.m.Ka) return Jt2(t5, 7, "Premature end-of-partition0 encountered.");
            for (; t5.ja < t5.za; ++t5.ja) {
              if (u5 = s4, h5 = (c5 = t5).rb[c5.sb - 1], f5 = c5.rb[c5.sb + c5.ja], o3 = c5.ya[c5.aa + c5.ja], d5 = c5.kc ? o3.Ad : 0) h5.la = f5.la = 0, o3.Za || (h5.Na = f5.Na = 0), o3.Hc = 0, o3.Gc = 0, o3.ia = 0;
              else {
                var N4, L4;
                h5 = f5, f5 = u5, d5 = c5.Pa.Xc, p5 = c5.ya[c5.aa + c5.ja], g5 = c5.pb[p5.$b];
                if (l5 = p5.ad, m5 = 0, v5 = c5.rb[c5.sb - 1], y4 = b4 = 0, i2(l5, m5, 0, 384), p5.Za) var A4 = 0, x3 = d5[3];
                else {
                  w4 = a2(16);
                  var S3 = h5.Na + v5.Na;
                  if (S3 = ni(f5, d5[1], S3, g5.Eb, 0, w4, 0), h5.Na = v5.Na = (0 < S3) + 0, 1 < S3) an(w4, 0, l5, m5);
                  else {
                    var _3 = w4[0] + 3 >> 3;
                    for (w4 = 0; 256 > w4; w4 += 16) l5[m5 + w4] = _3;
                  }
                  A4 = 1, x3 = d5[0];
                }
                var P3 = 15 & h5.la, I3 = 15 & v5.la;
                for (w4 = 0; 4 > w4; ++w4) {
                  var F3 = 1 & I3;
                  for (_3 = L4 = 0; 4 > _3; ++_3) P3 = P3 >> 1 | (F3 = (S3 = ni(f5, x3, S3 = F3 + (1 & P3), g5.Sc, A4, l5, m5)) > A4) << 7, L4 = L4 << 2 | (3 < S3 ? 3 : 1 < S3 ? 2 : 0 != l5[m5 + 0]), m5 += 16;
                  P3 >>= 4, I3 = I3 >> 1 | F3 << 7, b4 = (b4 << 8 | L4) >>> 0;
                }
                for (x3 = P3, A4 = I3 >> 4, N4 = 0; 4 > N4; N4 += 2) {
                  for (L4 = 0, P3 = h5.la >> 4 + N4, I3 = v5.la >> 4 + N4, w4 = 0; 2 > w4; ++w4) {
                    for (F3 = 1 & I3, _3 = 0; 2 > _3; ++_3) S3 = F3 + (1 & P3), P3 = P3 >> 1 | (F3 = 0 < (S3 = ni(f5, d5[2], S3, g5.Qc, 0, l5, m5))) << 3, L4 = L4 << 2 | (3 < S3 ? 3 : 1 < S3 ? 2 : 0 != l5[m5 + 0]), m5 += 16;
                    P3 >>= 2, I3 = I3 >> 1 | F3 << 5;
                  }
                  y4 |= L4 << 4 * N4, x3 |= P3 << 4 << N4, A4 |= (240 & I3) << N4;
                }
                h5.la = x3, v5.la = A4, p5.Hc = b4, p5.Gc = y4, p5.ia = 43690 & y4 ? 0 : g5.ia, d5 = !(b4 | y4);
              }
              if (0 < c5.L && (c5.wa[c5.Y + c5.ja] = c5.gd[o3.$b][o3.Za], c5.wa[c5.Y + c5.ja].La |= !d5), u5.Ka) return Jt2(t5, 7, "Premature end-of-file encountered.");
            }
            if ($t2(t5), c5 = r3, u5 = 1, o3 = (s4 = t5).D, h5 = 0 < s4.L && s4.M >= s4.zb && s4.M <= s4.Va, 0 == s4.Aa) t: {
              if (o3.M = s4.M, o3.uc = h5, Or(s4, o3), u5 = 1, o3 = (L4 = s4.D).Nb, h5 = (y4 = Ri[s4.L]) * s4.R, f5 = y4 / 2 * s4.B, w4 = 16 * o3 * s4.R, _3 = 8 * o3 * s4.B, d5 = s4.sa, p5 = s4.ta - h5 + w4, g5 = s4.qa, l5 = s4.ra - f5 + _3, m5 = s4.Ha, v5 = s4.Ia - f5 + _3, I3 = 0 == (P3 = L4.M), b4 = P3 >= s4.Va - 1, 2 == s4.Aa && Or(s4, L4), L4.uc) for (F3 = (S3 = s4).D.M, e(S3.D.uc), L4 = S3.yb; L4 < S3.Hb; ++L4) {
                A4 = L4, x3 = F3;
                var C3 = (j3 = (U3 = S3).D).Nb;
                N4 = U3.R;
                var j3 = j3.wa[j3.Y + A4], O3 = U3.sa, B3 = U3.ta + 16 * C3 * N4 + 16 * A4, M3 = j3.dd, E3 = j3.tc;
                if (0 != E3) if (e(3 <= E3), 1 == U3.L) 0 < A4 && wn(O3, B3, N4, E3 + 4), j3.La && Ln(O3, B3, N4, E3), 0 < x3 && yn(O3, B3, N4, E3 + 4), j3.La && Nn(O3, B3, N4, E3);
                else {
                  var q3 = U3.B, D3 = U3.qa, R3 = U3.ra + 8 * C3 * q3 + 8 * A4, T3 = U3.Ha, U3 = U3.Ia + 8 * C3 * q3 + 8 * A4;
                  C3 = j3.ld;
                  0 < A4 && (fn(O3, B3, N4, E3 + 4, M3, C3), pn(D3, R3, T3, U3, q3, E3 + 4, M3, C3)), j3.La && (mn(O3, B3, N4, E3, M3, C3), bn(D3, R3, T3, U3, q3, E3, M3, C3)), 0 < x3 && (ln2(O3, B3, N4, E3 + 4, M3, C3), dn(D3, R3, T3, U3, q3, E3 + 4, M3, C3)), j3.La && (gn(O3, B3, N4, E3, M3, C3), vn(D3, R3, T3, U3, q3, E3, M3, C3));
                }
              }
              if (s4.ia && alert("todo:DitherRow"), null != c5.put) {
                if (L4 = 16 * P3, P3 = 16 * (P3 + 1), I3 ? (c5.y = s4.sa, c5.O = s4.ta + w4, c5.f = s4.qa, c5.N = s4.ra + _3, c5.ea = s4.Ha, c5.W = s4.Ia + _3) : (L4 -= y4, c5.y = d5, c5.O = p5, c5.f = g5, c5.N = l5, c5.ea = m5, c5.W = v5), b4 || (P3 -= y4), P3 > c5.o && (P3 = c5.o), c5.F = null, c5.J = null, null != s4.Fa && 0 < s4.Fa.length && L4 < P3 && (c5.J = lr(s4, c5, L4, P3 - L4), c5.F = s4.mb, null == c5.F && 0 == c5.F.length)) {
                  u5 = Jt2(s4, 3, "Could not decode alpha data.");
                  break t;
                }
                L4 < c5.j && (y4 = c5.j - L4, L4 = c5.j, e(!(1 & y4)), c5.O += s4.R * y4, c5.N += s4.B * (y4 >> 1), c5.W += s4.B * (y4 >> 1), null != c5.F && (c5.J += c5.width * y4)), L4 < P3 && (c5.O += c5.v, c5.N += c5.v >> 1, c5.W += c5.v >> 1, null != c5.F && (c5.J += c5.v), c5.ka = L4 - c5.j, c5.U = c5.va - c5.v, c5.T = P3 - L4, u5 = c5.put(c5));
              }
              o3 + 1 != s4.Ic || b4 || (n2(s4.sa, s4.ta - h5, d5, p5 + 16 * s4.R, h5), n2(s4.qa, s4.ra - f5, g5, l5 + 8 * s4.B, f5), n2(s4.Ha, s4.Ia - f5, m5, v5 + 8 * s4.B, f5));
            }
            if (!u5) return Jt2(t5, 6, "Output aborted.");
          }
          return 1;
        }(t4, r2)), null != r2.bc && r2.bc(r2), s3 &= 1;
      }
      return s3 ? (t4.cb = 0, s3) : 0;
    }
    function te2(t4, e2, r2, n3, i3) {
      i3 = t4[e2 + r2 + 32 * n3] + (i3 >> 3), t4[e2 + r2 + 32 * n3] = -256 & i3 ? 0 > i3 ? 0 : 255 : i3;
    }
    function ee2(t4, e2, r2, n3, i3, a3) {
      te2(t4, e2, 0, r2, n3 + i3), te2(t4, e2, 1, r2, n3 + a3), te2(t4, e2, 2, r2, n3 - a3), te2(t4, e2, 3, r2, n3 - i3);
    }
    function re2(t4) {
      return (20091 * t4 >> 16) + t4;
    }
    function ne2(t4, e2, r2, n3) {
      var i3, o3 = 0, s3 = a2(16);
      for (i3 = 0; 4 > i3; ++i3) {
        var c4 = t4[e2 + 0] + t4[e2 + 8], u4 = t4[e2 + 0] - t4[e2 + 8], h4 = (35468 * t4[e2 + 4] >> 16) - re2(t4[e2 + 12]), l4 = re2(t4[e2 + 4]) + (35468 * t4[e2 + 12] >> 16);
        s3[o3 + 0] = c4 + l4, s3[o3 + 1] = u4 + h4, s3[o3 + 2] = u4 - h4, s3[o3 + 3] = c4 - l4, o3 += 4, e2++;
      }
      for (i3 = o3 = 0; 4 > i3; ++i3) c4 = (t4 = s3[o3 + 0] + 4) + s3[o3 + 8], u4 = t4 - s3[o3 + 8], h4 = (35468 * s3[o3 + 4] >> 16) - re2(s3[o3 + 12]), te2(r2, n3, 0, 0, c4 + (l4 = re2(s3[o3 + 4]) + (35468 * s3[o3 + 12] >> 16))), te2(r2, n3, 1, 0, u4 + h4), te2(r2, n3, 2, 0, u4 - h4), te2(r2, n3, 3, 0, c4 - l4), o3++, n3 += 32;
    }
    function ie2(t4, e2, r2, n3) {
      var i3 = t4[e2 + 0] + 4, a3 = 35468 * t4[e2 + 4] >> 16, o3 = re2(t4[e2 + 4]), s3 = 35468 * t4[e2 + 1] >> 16;
      ee2(r2, n3, 0, i3 + o3, t4 = re2(t4[e2 + 1]), s3), ee2(r2, n3, 1, i3 + a3, t4, s3), ee2(r2, n3, 2, i3 - a3, t4, s3), ee2(r2, n3, 3, i3 - o3, t4, s3);
    }
    function ae2(t4, e2, r2, n3, i3) {
      ne2(t4, e2, r2, n3), i3 && ne2(t4, e2 + 16, r2, n3 + 4);
    }
    function oe2(t4, e2, r2, n3) {
      on2(t4, e2 + 0, r2, n3, 1), on2(t4, e2 + 32, r2, n3 + 128, 1);
    }
    function se2(t4, e2, r2, n3) {
      var i3;
      for (t4 = t4[e2 + 0] + 4, i3 = 0; 4 > i3; ++i3) for (e2 = 0; 4 > e2; ++e2) te2(r2, n3, e2, i3, t4);
    }
    function ce2(t4, e2, r2, n3) {
      t4[e2 + 0] && un(t4, e2 + 0, r2, n3), t4[e2 + 16] && un(t4, e2 + 16, r2, n3 + 4), t4[e2 + 32] && un(t4, e2 + 32, r2, n3 + 128), t4[e2 + 48] && un(t4, e2 + 48, r2, n3 + 128 + 4);
    }
    function ue2(t4, e2, r2, n3) {
      var i3, o3 = a2(16);
      for (i3 = 0; 4 > i3; ++i3) {
        var s3 = t4[e2 + 0 + i3] + t4[e2 + 12 + i3], c4 = t4[e2 + 4 + i3] + t4[e2 + 8 + i3], u4 = t4[e2 + 4 + i3] - t4[e2 + 8 + i3], h4 = t4[e2 + 0 + i3] - t4[e2 + 12 + i3];
        o3[0 + i3] = s3 + c4, o3[8 + i3] = s3 - c4, o3[4 + i3] = h4 + u4, o3[12 + i3] = h4 - u4;
      }
      for (i3 = 0; 4 > i3; ++i3) s3 = (t4 = o3[0 + 4 * i3] + 3) + o3[3 + 4 * i3], c4 = o3[1 + 4 * i3] + o3[2 + 4 * i3], u4 = o3[1 + 4 * i3] - o3[2 + 4 * i3], h4 = t4 - o3[3 + 4 * i3], r2[n3 + 0] = s3 + c4 >> 3, r2[n3 + 16] = h4 + u4 >> 3, r2[n3 + 32] = s3 - c4 >> 3, r2[n3 + 48] = h4 - u4 >> 3, n3 += 64;
    }
    function he2(t4, e2, r2) {
      var n3, i3 = e2 - 32, a3 = Bn, o3 = 255 - t4[i3 - 1];
      for (n3 = 0; n3 < r2; ++n3) {
        var s3, c4 = a3, u4 = o3 + t4[e2 - 1];
        for (s3 = 0; s3 < r2; ++s3) t4[e2 + s3] = c4[u4 + t4[i3 + s3]];
        e2 += 32;
      }
    }
    function le2(t4, e2) {
      he2(t4, e2, 4);
    }
    function fe2(t4, e2) {
      he2(t4, e2, 8);
    }
    function de2(t4, e2) {
      he2(t4, e2, 16);
    }
    function pe2(t4, e2) {
      var r2;
      for (r2 = 0; 16 > r2; ++r2) n2(t4, e2 + 32 * r2, t4, e2 - 32, 16);
    }
    function ge2(t4, e2) {
      var r2;
      for (r2 = 16; 0 < r2; --r2) i2(t4, e2, t4[e2 - 1], 16), e2 += 32;
    }
    function me2(t4, e2, r2) {
      var n3;
      for (n3 = 0; 16 > n3; ++n3) i2(e2, r2 + 32 * n3, t4, 16);
    }
    function ve2(t4, e2) {
      var r2, n3 = 16;
      for (r2 = 0; 16 > r2; ++r2) n3 += t4[e2 - 1 + 32 * r2] + t4[e2 + r2 - 32];
      me2(n3 >> 5, t4, e2);
    }
    function be2(t4, e2) {
      var r2, n3 = 8;
      for (r2 = 0; 16 > r2; ++r2) n3 += t4[e2 - 1 + 32 * r2];
      me2(n3 >> 4, t4, e2);
    }
    function ye2(t4, e2) {
      var r2, n3 = 8;
      for (r2 = 0; 16 > r2; ++r2) n3 += t4[e2 + r2 - 32];
      me2(n3 >> 4, t4, e2);
    }
    function we2(t4, e2) {
      me2(128, t4, e2);
    }
    function Ne2(t4, e2, r2) {
      return t4 + 2 * e2 + r2 + 2 >> 2;
    }
    function Le2(t4, e2) {
      var r2, i3 = e2 - 32;
      i3 = new Uint8Array([Ne2(t4[i3 - 1], t4[i3 + 0], t4[i3 + 1]), Ne2(t4[i3 + 0], t4[i3 + 1], t4[i3 + 2]), Ne2(t4[i3 + 1], t4[i3 + 2], t4[i3 + 3]), Ne2(t4[i3 + 2], t4[i3 + 3], t4[i3 + 4])]);
      for (r2 = 0; 4 > r2; ++r2) n2(t4, e2 + 32 * r2, i3, 0, i3.length);
    }
    function Ae(t4, e2) {
      var r2 = t4[e2 - 1], n3 = t4[e2 - 1 + 32], i3 = t4[e2 - 1 + 64], a3 = t4[e2 - 1 + 96];
      I2(t4, e2 + 0, 16843009 * Ne2(t4[e2 - 1 - 32], r2, n3)), I2(t4, e2 + 32, 16843009 * Ne2(r2, n3, i3)), I2(t4, e2 + 64, 16843009 * Ne2(n3, i3, a3)), I2(t4, e2 + 96, 16843009 * Ne2(i3, a3, a3));
    }
    function xe(t4, e2) {
      var r2, n3 = 4;
      for (r2 = 0; 4 > r2; ++r2) n3 += t4[e2 + r2 - 32] + t4[e2 - 1 + 32 * r2];
      for (n3 >>= 3, r2 = 0; 4 > r2; ++r2) i2(t4, e2 + 32 * r2, n3, 4);
    }
    function Se(t4, e2) {
      var r2 = t4[e2 - 1 + 0], n3 = t4[e2 - 1 + 32], i3 = t4[e2 - 1 + 64], a3 = t4[e2 - 1 - 32], o3 = t4[e2 + 0 - 32], s3 = t4[e2 + 1 - 32], c4 = t4[e2 + 2 - 32], u4 = t4[e2 + 3 - 32];
      t4[e2 + 0 + 96] = Ne2(n3, i3, t4[e2 - 1 + 96]), t4[e2 + 1 + 96] = t4[e2 + 0 + 64] = Ne2(r2, n3, i3), t4[e2 + 2 + 96] = t4[e2 + 1 + 64] = t4[e2 + 0 + 32] = Ne2(a3, r2, n3), t4[e2 + 3 + 96] = t4[e2 + 2 + 64] = t4[e2 + 1 + 32] = t4[e2 + 0 + 0] = Ne2(o3, a3, r2), t4[e2 + 3 + 64] = t4[e2 + 2 + 32] = t4[e2 + 1 + 0] = Ne2(s3, o3, a3), t4[e2 + 3 + 32] = t4[e2 + 2 + 0] = Ne2(c4, s3, o3), t4[e2 + 3 + 0] = Ne2(u4, c4, s3);
    }
    function _e(t4, e2) {
      var r2 = t4[e2 + 1 - 32], n3 = t4[e2 + 2 - 32], i3 = t4[e2 + 3 - 32], a3 = t4[e2 + 4 - 32], o3 = t4[e2 + 5 - 32], s3 = t4[e2 + 6 - 32], c4 = t4[e2 + 7 - 32];
      t4[e2 + 0 + 0] = Ne2(t4[e2 + 0 - 32], r2, n3), t4[e2 + 1 + 0] = t4[e2 + 0 + 32] = Ne2(r2, n3, i3), t4[e2 + 2 + 0] = t4[e2 + 1 + 32] = t4[e2 + 0 + 64] = Ne2(n3, i3, a3), t4[e2 + 3 + 0] = t4[e2 + 2 + 32] = t4[e2 + 1 + 64] = t4[e2 + 0 + 96] = Ne2(i3, a3, o3), t4[e2 + 3 + 32] = t4[e2 + 2 + 64] = t4[e2 + 1 + 96] = Ne2(a3, o3, s3), t4[e2 + 3 + 64] = t4[e2 + 2 + 96] = Ne2(o3, s3, c4), t4[e2 + 3 + 96] = Ne2(s3, c4, c4);
    }
    function Pe(t4, e2) {
      var r2 = t4[e2 - 1 + 0], n3 = t4[e2 - 1 + 32], i3 = t4[e2 - 1 + 64], a3 = t4[e2 - 1 - 32], o3 = t4[e2 + 0 - 32], s3 = t4[e2 + 1 - 32], c4 = t4[e2 + 2 - 32], u4 = t4[e2 + 3 - 32];
      t4[e2 + 0 + 0] = t4[e2 + 1 + 64] = a3 + o3 + 1 >> 1, t4[e2 + 1 + 0] = t4[e2 + 2 + 64] = o3 + s3 + 1 >> 1, t4[e2 + 2 + 0] = t4[e2 + 3 + 64] = s3 + c4 + 1 >> 1, t4[e2 + 3 + 0] = c4 + u4 + 1 >> 1, t4[e2 + 0 + 96] = Ne2(i3, n3, r2), t4[e2 + 0 + 64] = Ne2(n3, r2, a3), t4[e2 + 0 + 32] = t4[e2 + 1 + 96] = Ne2(r2, a3, o3), t4[e2 + 1 + 32] = t4[e2 + 2 + 96] = Ne2(a3, o3, s3), t4[e2 + 2 + 32] = t4[e2 + 3 + 96] = Ne2(o3, s3, c4), t4[e2 + 3 + 32] = Ne2(s3, c4, u4);
    }
    function ke(t4, e2) {
      var r2 = t4[e2 + 0 - 32], n3 = t4[e2 + 1 - 32], i3 = t4[e2 + 2 - 32], a3 = t4[e2 + 3 - 32], o3 = t4[e2 + 4 - 32], s3 = t4[e2 + 5 - 32], c4 = t4[e2 + 6 - 32], u4 = t4[e2 + 7 - 32];
      t4[e2 + 0 + 0] = r2 + n3 + 1 >> 1, t4[e2 + 1 + 0] = t4[e2 + 0 + 64] = n3 + i3 + 1 >> 1, t4[e2 + 2 + 0] = t4[e2 + 1 + 64] = i3 + a3 + 1 >> 1, t4[e2 + 3 + 0] = t4[e2 + 2 + 64] = a3 + o3 + 1 >> 1, t4[e2 + 0 + 32] = Ne2(r2, n3, i3), t4[e2 + 1 + 32] = t4[e2 + 0 + 96] = Ne2(n3, i3, a3), t4[e2 + 2 + 32] = t4[e2 + 1 + 96] = Ne2(i3, a3, o3), t4[e2 + 3 + 32] = t4[e2 + 2 + 96] = Ne2(a3, o3, s3), t4[e2 + 3 + 64] = Ne2(o3, s3, c4), t4[e2 + 3 + 96] = Ne2(s3, c4, u4);
    }
    function Ie(t4, e2) {
      var r2 = t4[e2 - 1 + 0], n3 = t4[e2 - 1 + 32], i3 = t4[e2 - 1 + 64], a3 = t4[e2 - 1 + 96];
      t4[e2 + 0 + 0] = r2 + n3 + 1 >> 1, t4[e2 + 2 + 0] = t4[e2 + 0 + 32] = n3 + i3 + 1 >> 1, t4[e2 + 2 + 32] = t4[e2 + 0 + 64] = i3 + a3 + 1 >> 1, t4[e2 + 1 + 0] = Ne2(r2, n3, i3), t4[e2 + 3 + 0] = t4[e2 + 1 + 32] = Ne2(n3, i3, a3), t4[e2 + 3 + 32] = t4[e2 + 1 + 64] = Ne2(i3, a3, a3), t4[e2 + 3 + 64] = t4[e2 + 2 + 64] = t4[e2 + 0 + 96] = t4[e2 + 1 + 96] = t4[e2 + 2 + 96] = t4[e2 + 3 + 96] = a3;
    }
    function Fe(t4, e2) {
      var r2 = t4[e2 - 1 + 0], n3 = t4[e2 - 1 + 32], i3 = t4[e2 - 1 + 64], a3 = t4[e2 - 1 + 96], o3 = t4[e2 - 1 - 32], s3 = t4[e2 + 0 - 32], c4 = t4[e2 + 1 - 32], u4 = t4[e2 + 2 - 32];
      t4[e2 + 0 + 0] = t4[e2 + 2 + 32] = r2 + o3 + 1 >> 1, t4[e2 + 0 + 32] = t4[e2 + 2 + 64] = n3 + r2 + 1 >> 1, t4[e2 + 0 + 64] = t4[e2 + 2 + 96] = i3 + n3 + 1 >> 1, t4[e2 + 0 + 96] = a3 + i3 + 1 >> 1, t4[e2 + 3 + 0] = Ne2(s3, c4, u4), t4[e2 + 2 + 0] = Ne2(o3, s3, c4), t4[e2 + 1 + 0] = t4[e2 + 3 + 32] = Ne2(r2, o3, s3), t4[e2 + 1 + 32] = t4[e2 + 3 + 64] = Ne2(n3, r2, o3), t4[e2 + 1 + 64] = t4[e2 + 3 + 96] = Ne2(i3, n3, r2), t4[e2 + 1 + 96] = Ne2(a3, i3, n3);
    }
    function Ce(t4, e2) {
      var r2;
      for (r2 = 0; 8 > r2; ++r2) n2(t4, e2 + 32 * r2, t4, e2 - 32, 8);
    }
    function je(t4, e2) {
      var r2;
      for (r2 = 0; 8 > r2; ++r2) i2(t4, e2, t4[e2 - 1], 8), e2 += 32;
    }
    function Oe(t4, e2, r2) {
      var n3;
      for (n3 = 0; 8 > n3; ++n3) i2(e2, r2 + 32 * n3, t4, 8);
    }
    function Be(t4, e2) {
      var r2, n3 = 8;
      for (r2 = 0; 8 > r2; ++r2) n3 += t4[e2 + r2 - 32] + t4[e2 - 1 + 32 * r2];
      Oe(n3 >> 4, t4, e2);
    }
    function Me(t4, e2) {
      var r2, n3 = 4;
      for (r2 = 0; 8 > r2; ++r2) n3 += t4[e2 + r2 - 32];
      Oe(n3 >> 3, t4, e2);
    }
    function Ee(t4, e2) {
      var r2, n3 = 4;
      for (r2 = 0; 8 > r2; ++r2) n3 += t4[e2 - 1 + 32 * r2];
      Oe(n3 >> 3, t4, e2);
    }
    function qe(t4, e2) {
      Oe(128, t4, e2);
    }
    function De(t4, e2, r2) {
      var n3 = t4[e2 - r2], i3 = t4[e2 + 0], a3 = 3 * (i3 - n3) + jn[1020 + t4[e2 - 2 * r2] - t4[e2 + r2]], o3 = On[112 + (a3 + 4 >> 3)];
      t4[e2 - r2] = Bn[255 + n3 + On[112 + (a3 + 3 >> 3)]], t4[e2 + 0] = Bn[255 + i3 - o3];
    }
    function Re(t4, e2, r2, n3) {
      var i3 = t4[e2 + 0], a3 = t4[e2 + r2];
      return Mn[255 + t4[e2 - 2 * r2] - t4[e2 - r2]] > n3 || Mn[255 + a3 - i3] > n3;
    }
    function Te(t4, e2, r2, n3) {
      return 4 * Mn[255 + t4[e2 - r2] - t4[e2 + 0]] + Mn[255 + t4[e2 - 2 * r2] - t4[e2 + r2]] <= n3;
    }
    function Ue(t4, e2, r2, n3, i3) {
      var a3 = t4[e2 - 3 * r2], o3 = t4[e2 - 2 * r2], s3 = t4[e2 - r2], c4 = t4[e2 + 0], u4 = t4[e2 + r2], h4 = t4[e2 + 2 * r2], l4 = t4[e2 + 3 * r2];
      return 4 * Mn[255 + s3 - c4] + Mn[255 + o3 - u4] > n3 ? 0 : Mn[255 + t4[e2 - 4 * r2] - a3] <= i3 && Mn[255 + a3 - o3] <= i3 && Mn[255 + o3 - s3] <= i3 && Mn[255 + l4 - h4] <= i3 && Mn[255 + h4 - u4] <= i3 && Mn[255 + u4 - c4] <= i3;
    }
    function ze(t4, e2, r2, n3) {
      var i3 = 2 * n3 + 1;
      for (n3 = 0; 16 > n3; ++n3) Te(t4, e2 + n3, r2, i3) && De(t4, e2 + n3, r2);
    }
    function He(t4, e2, r2, n3) {
      var i3 = 2 * n3 + 1;
      for (n3 = 0; 16 > n3; ++n3) Te(t4, e2 + n3 * r2, 1, i3) && De(t4, e2 + n3 * r2, 1);
    }
    function We(t4, e2, r2, n3) {
      var i3;
      for (i3 = 3; 0 < i3; --i3) ze(t4, e2 += 4 * r2, r2, n3);
    }
    function Ve(t4, e2, r2, n3) {
      var i3;
      for (i3 = 3; 0 < i3; --i3) He(t4, e2 += 4, r2, n3);
    }
    function Ge(t4, e2, r2, n3, i3, a3, o3, s3) {
      for (a3 = 2 * a3 + 1; 0 < i3--; ) {
        if (Ue(t4, e2, r2, a3, o3)) if (Re(t4, e2, r2, s3)) De(t4, e2, r2);
        else {
          var c4 = t4, u4 = e2, h4 = r2, l4 = c4[u4 - 2 * h4], f4 = c4[u4 - h4], d4 = c4[u4 + 0], p4 = c4[u4 + h4], g4 = c4[u4 + 2 * h4], m4 = 27 * (b4 = jn[1020 + 3 * (d4 - f4) + jn[1020 + l4 - p4]]) + 63 >> 7, v4 = 18 * b4 + 63 >> 7, b4 = 9 * b4 + 63 >> 7;
          c4[u4 - 3 * h4] = Bn[255 + c4[u4 - 3 * h4] + b4], c4[u4 - 2 * h4] = Bn[255 + l4 + v4], c4[u4 - h4] = Bn[255 + f4 + m4], c4[u4 + 0] = Bn[255 + d4 - m4], c4[u4 + h4] = Bn[255 + p4 - v4], c4[u4 + 2 * h4] = Bn[255 + g4 - b4];
        }
        e2 += n3;
      }
    }
    function Ye(t4, e2, r2, n3, i3, a3, o3, s3) {
      for (a3 = 2 * a3 + 1; 0 < i3--; ) {
        if (Ue(t4, e2, r2, a3, o3)) if (Re(t4, e2, r2, s3)) De(t4, e2, r2);
        else {
          var c4 = t4, u4 = e2, h4 = r2, l4 = c4[u4 - h4], f4 = c4[u4 + 0], d4 = c4[u4 + h4], p4 = On[112 + ((g4 = 3 * (f4 - l4)) + 4 >> 3)], g4 = On[112 + (g4 + 3 >> 3)], m4 = p4 + 1 >> 1;
          c4[u4 - 2 * h4] = Bn[255 + c4[u4 - 2 * h4] + m4], c4[u4 - h4] = Bn[255 + l4 + g4], c4[u4 + 0] = Bn[255 + f4 - p4], c4[u4 + h4] = Bn[255 + d4 - m4];
        }
        e2 += n3;
      }
    }
    function Je(t4, e2, r2, n3, i3, a3) {
      Ge(t4, e2, r2, 1, 16, n3, i3, a3);
    }
    function Xe(t4, e2, r2, n3, i3, a3) {
      Ge(t4, e2, 1, r2, 16, n3, i3, a3);
    }
    function Ke(t4, e2, r2, n3, i3, a3) {
      var o3;
      for (o3 = 3; 0 < o3; --o3) Ye(t4, e2 += 4 * r2, r2, 1, 16, n3, i3, a3);
    }
    function Ze(t4, e2, r2, n3, i3, a3) {
      var o3;
      for (o3 = 3; 0 < o3; --o3) Ye(t4, e2 += 4, 1, r2, 16, n3, i3, a3);
    }
    function $e(t4, e2, r2, n3, i3, a3, o3, s3) {
      Ge(t4, e2, i3, 1, 8, a3, o3, s3), Ge(r2, n3, i3, 1, 8, a3, o3, s3);
    }
    function Qe(t4, e2, r2, n3, i3, a3, o3, s3) {
      Ge(t4, e2, 1, i3, 8, a3, o3, s3), Ge(r2, n3, 1, i3, 8, a3, o3, s3);
    }
    function tr(t4, e2, r2, n3, i3, a3, o3, s3) {
      Ye(t4, e2 + 4 * i3, i3, 1, 8, a3, o3, s3), Ye(r2, n3 + 4 * i3, i3, 1, 8, a3, o3, s3);
    }
    function er(t4, e2, r2, n3, i3, a3, o3, s3) {
      Ye(t4, e2 + 4, 1, i3, 8, a3, o3, s3), Ye(r2, n3 + 4, 1, i3, 8, a3, o3, s3);
    }
    function rr() {
      this.ba = new ot2(), this.ec = [], this.cc = [], this.Mc = [], this.Dc = this.Nc = this.dc = this.fc = 0, this.Oa = new ct2(), this.memory = 0, this.Ib = "OutputFunc", this.Jb = "OutputAlphaFunc", this.Nd = "OutputRowFunc";
    }
    function nr() {
      this.data = [], this.offset = this.kd = this.ha = this.w = 0, this.na = [], this.xa = this.gb = this.Ja = this.Sa = this.P = 0;
    }
    function ir() {
      this.nc = this.Ea = this.b = this.hc = 0, this.K = [], this.w = 0;
    }
    function ar() {
      this.ua = 0, this.Wa = new M2(), this.vb = new M2(), this.md = this.xc = this.wc = 0, this.vc = [], this.Wb = 0, this.Ya = new d3(), this.yc = new l3();
    }
    function or() {
      this.xb = this.a = 0, this.l = new Gt2(), this.ca = new ot2(), this.V = [], this.Ba = 0, this.Ta = [], this.Ua = 0, this.m = new N3(), this.Pb = 0, this.wd = new N3(), this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0, this.s = new ar(), this.ab = 0, this.gc = o2(4, ir), this.Oc = 0;
    }
    function sr() {
      this.Lc = this.Z = this.$a = this.i = this.c = 0, this.l = new Gt2(), this.ic = 0, this.ca = [], this.tb = 0, this.qd = null, this.rd = 0;
    }
    function cr(t4, e2, r2, n3, i3, a3, o3) {
      for (t4 = null == t4 ? 0 : t4[e2 + 0], e2 = 0; e2 < o3; ++e2) i3[a3 + e2] = t4 + r2[n3 + e2] & 255, t4 = i3[a3 + e2];
    }
    function ur(t4, e2, r2, n3, i3, a3, o3) {
      var s3;
      if (null == t4) cr(null, null, r2, n3, i3, a3, o3);
      else for (s3 = 0; s3 < o3; ++s3) i3[a3 + s3] = t4[e2 + s3] + r2[n3 + s3] & 255;
    }
    function hr(t4, e2, r2, n3, i3, a3, o3) {
      if (null == t4) cr(null, null, r2, n3, i3, a3, o3);
      else {
        var s3, c4 = t4[e2 + 0], u4 = c4, h4 = c4;
        for (s3 = 0; s3 < o3; ++s3) u4 = h4 + (c4 = t4[e2 + s3]) - u4, h4 = r2[n3 + s3] + (-256 & u4 ? 0 > u4 ? 0 : 255 : u4) & 255, u4 = c4, i3[a3 + s3] = h4;
      }
    }
    function lr(t4, r2, i3, o3) {
      var s3 = r2.width, c4 = r2.o;
      if (e(null != t4 && null != r2), 0 > i3 || 0 >= o3 || i3 + o3 > c4) return null;
      if (!t4.Cc) {
        if (null == t4.ga) {
          var u4;
          if (t4.ga = new sr(), (u4 = null == t4.ga) || (u4 = r2.width * r2.o, e(0 == t4.Gb.length), t4.Gb = a2(u4), t4.Uc = 0, null == t4.Gb ? u4 = 0 : (t4.mb = t4.Gb, t4.nb = t4.Uc, t4.rc = null, u4 = 1), u4 = !u4), !u4) {
            u4 = t4.ga;
            var h4 = t4.Fa, l4 = t4.P, f4 = t4.qc, d4 = t4.mb, p4 = t4.nb, g4 = l4 + 1, m4 = f4 - 1, b4 = u4.l;
            if (e(null != h4 && null != d4 && null != r2), mi[0] = null, mi[1] = cr, mi[2] = ur, mi[3] = hr, u4.ca = d4, u4.tb = p4, u4.c = r2.width, u4.i = r2.height, e(0 < u4.c && 0 < u4.i), 1 >= f4) r2 = 0;
            else if (u4.$a = h4[l4 + 0] >> 0 & 3, u4.Z = h4[l4 + 0] >> 2 & 3, u4.Lc = h4[l4 + 0] >> 4 & 3, l4 = h4[l4 + 0] >> 6 & 3, 0 > u4.$a || 1 < u4.$a || 4 <= u4.Z || 1 < u4.Lc || l4) r2 = 0;
            else if (b4.put = dt2, b4.ac = ft2, b4.bc = pt2, b4.ma = u4, b4.width = r2.width, b4.height = r2.height, b4.Da = r2.Da, b4.v = r2.v, b4.va = r2.va, b4.j = r2.j, b4.o = r2.o, u4.$a) t: {
              e(1 == u4.$a), r2 = kt2();
              e: for (; ; ) {
                if (null == r2) {
                  r2 = 0;
                  break t;
                }
                if (e(null != u4), u4.mc = r2, r2.c = u4.c, r2.i = u4.i, r2.l = u4.l, r2.l.ma = u4, r2.l.width = u4.c, r2.l.height = u4.i, r2.a = 0, v3(r2.m, h4, g4, m4), !It2(u4.c, u4.i, 1, r2, null)) break e;
                if (1 == r2.ab && 3 == r2.gc[0].hc && At2(r2.s) ? (u4.ic = 1, h4 = r2.c * r2.i, r2.Ta = null, r2.Ua = 0, r2.V = a2(h4), r2.Ba = 0, null == r2.V ? (r2.a = 1, r2 = 0) : r2 = 1) : (u4.ic = 0, r2 = Ft2(r2, u4.c)), !r2) break e;
                r2 = 1;
                break t;
              }
              u4.mc = null, r2 = 0;
            }
            else r2 = m4 >= u4.c * u4.i;
            u4 = !r2;
          }
          if (u4) return null;
          1 != t4.ga.Lc ? t4.Ga = 0 : o3 = c4 - i3;
        }
        e(null != t4.ga), e(i3 + o3 <= c4);
        t: {
          if (r2 = (h4 = t4.ga).c, c4 = h4.l.o, 0 == h4.$a) {
            if (g4 = t4.rc, m4 = t4.Vc, b4 = t4.Fa, l4 = t4.P + 1 + i3 * r2, f4 = t4.mb, d4 = t4.nb + i3 * r2, e(l4 <= t4.P + t4.qc), 0 != h4.Z) for (e(null != mi[h4.Z]), u4 = 0; u4 < o3; ++u4) mi[h4.Z](g4, m4, b4, l4, f4, d4, r2), g4 = f4, m4 = d4, d4 += r2, l4 += r2;
            else for (u4 = 0; u4 < o3; ++u4) n2(f4, d4, b4, l4, r2), g4 = f4, m4 = d4, d4 += r2, l4 += r2;
            t4.rc = g4, t4.Vc = m4;
          } else {
            if (e(null != h4.mc), r2 = i3 + o3, e(null != (u4 = h4.mc)), e(r2 <= u4.i), u4.C >= r2) r2 = 1;
            else if (h4.ic || mr(), h4.ic) {
              h4 = u4.V, g4 = u4.Ba, m4 = u4.c;
              var y4 = u4.i, w4 = (b4 = 1, l4 = u4.$ / m4, f4 = u4.$ % m4, d4 = u4.m, p4 = u4.s, u4.$), N4 = m4 * y4, L4 = m4 * r2, x3 = p4.wc, _3 = w4 < L4 ? wt2(p4, f4, l4) : null;
              e(w4 <= N4), e(r2 <= y4), e(At2(p4));
              e: for (; ; ) {
                for (; !d4.h && w4 < L4; ) {
                  if (f4 & x3 || (_3 = wt2(p4, f4, l4)), e(null != _3), S2(d4), 256 > (y4 = bt2(_3.G[0], _3.H[0], d4))) h4[g4 + w4] = y4, ++w4, ++f4 >= m4 && (f4 = 0, ++l4 <= r2 && !(l4 % 16) && St(u4, l4));
                  else {
                    if (!(280 > y4)) {
                      b4 = 0;
                      break e;
                    }
                    y4 = mt2(y4 - 256, d4);
                    var P3, k3 = bt2(_3.G[4], _3.H[4], d4);
                    if (S2(d4), !(w4 >= (k3 = vt2(m4, k3 = mt2(k3, d4))) && N4 - w4 >= y4)) {
                      b4 = 0;
                      break e;
                    }
                    for (P3 = 0; P3 < y4; ++P3) h4[g4 + w4 + P3] = h4[g4 + w4 + P3 - k3];
                    for (w4 += y4, f4 += y4; f4 >= m4; ) f4 -= m4, ++l4 <= r2 && !(l4 % 16) && St(u4, l4);
                    w4 < L4 && f4 & x3 && (_3 = wt2(p4, f4, l4));
                  }
                  e(d4.h == A3(d4));
                }
                St(u4, l4 > r2 ? r2 : l4);
                break e;
              }
              !b4 || d4.h && w4 < N4 ? (b4 = 0, u4.a = d4.h ? 5 : 3) : u4.$ = w4, r2 = b4;
            } else r2 = _t2(u4, u4.V, u4.Ba, u4.c, u4.i, r2, Ct2);
            if (!r2) {
              o3 = 0;
              break t;
            }
          }
          i3 + o3 >= c4 && (t4.Cc = 1), o3 = 1;
        }
        if (!o3) return null;
        if (t4.Cc && (null != (o3 = t4.ga) && (o3.mc = null), t4.ga = null, 0 < t4.Ga)) return alert("todo:WebPDequantizeLevels"), null;
      }
      return t4.nb + i3 * s3;
    }
    function fr(t4, e2, r2, n3, i3, a3) {
      for (; 0 < i3--; ) {
        var o3, s3 = t4, c4 = e2 + (r2 ? 1 : 0), u4 = t4, h4 = e2 + (r2 ? 0 : 3);
        for (o3 = 0; o3 < n3; ++o3) {
          var l4 = u4[h4 + 4 * o3];
          255 != l4 && (l4 *= 32897, s3[c4 + 4 * o3 + 0] = s3[c4 + 4 * o3 + 0] * l4 >> 23, s3[c4 + 4 * o3 + 1] = s3[c4 + 4 * o3 + 1] * l4 >> 23, s3[c4 + 4 * o3 + 2] = s3[c4 + 4 * o3 + 2] * l4 >> 23);
        }
        e2 += a3;
      }
    }
    function dr(t4, e2, r2, n3, i3) {
      for (; 0 < n3--; ) {
        var a3;
        for (a3 = 0; a3 < r2; ++a3) {
          var o3 = t4[e2 + 2 * a3 + 0], s3 = 15 & (u4 = t4[e2 + 2 * a3 + 1]), c4 = 4369 * s3, u4 = (240 & u4 | u4 >> 4) * c4 >> 16;
          t4[e2 + 2 * a3 + 0] = (240 & o3 | o3 >> 4) * c4 >> 16 & 240 | (15 & o3 | o3 << 4) * c4 >> 16 >> 4 & 15, t4[e2 + 2 * a3 + 1] = 240 & u4 | s3;
        }
        e2 += i3;
      }
    }
    function pr(t4, e2, r2, n3, i3, a3, o3, s3) {
      var c4, u4, h4 = 255;
      for (u4 = 0; u4 < i3; ++u4) {
        for (c4 = 0; c4 < n3; ++c4) {
          var l4 = t4[e2 + c4];
          a3[o3 + 4 * c4] = l4, h4 &= l4;
        }
        e2 += r2, o3 += s3;
      }
      return 255 != h4;
    }
    function gr(t4, e2, r2, n3, i3) {
      var a3;
      for (a3 = 0; a3 < i3; ++a3) r2[n3 + a3] = t4[e2 + a3] >> 8;
    }
    function mr() {
      An = fr, xn = dr, Sn = pr, _n = gr;
    }
    function vr(r2, n3, i3) {
      t3[r2] = function(t4, r3, a3, o3, s3, c4, u4, h4, l4, f4, d4, p4, g4, m4, v4, b4, y4) {
        var w4, N4 = y4 - 1 >> 1, L4 = s3[c4 + 0] | u4[h4 + 0] << 16, A4 = l4[f4 + 0] | d4[p4 + 0] << 16;
        e(null != t4);
        var x3 = 3 * L4 + A4 + 131074 >> 2;
        for (n3(t4[r3 + 0], 255 & x3, x3 >> 16, g4, m4), null != a3 && (x3 = 3 * A4 + L4 + 131074 >> 2, n3(a3[o3 + 0], 255 & x3, x3 >> 16, v4, b4)), w4 = 1; w4 <= N4; ++w4) {
          var S3 = s3[c4 + w4] | u4[h4 + w4] << 16, _3 = l4[f4 + w4] | d4[p4 + w4] << 16, P3 = L4 + S3 + A4 + _3 + 524296, k3 = P3 + 2 * (S3 + A4) >> 3;
          x3 = k3 + L4 >> 1, L4 = (P3 = P3 + 2 * (L4 + _3) >> 3) + S3 >> 1, n3(t4[r3 + 2 * w4 - 1], 255 & x3, x3 >> 16, g4, m4 + (2 * w4 - 1) * i3), n3(t4[r3 + 2 * w4 - 0], 255 & L4, L4 >> 16, g4, m4 + (2 * w4 - 0) * i3), null != a3 && (x3 = P3 + A4 >> 1, L4 = k3 + _3 >> 1, n3(a3[o3 + 2 * w4 - 1], 255 & x3, x3 >> 16, v4, b4 + (2 * w4 - 1) * i3), n3(a3[o3 + 2 * w4 + 0], 255 & L4, L4 >> 16, v4, b4 + (2 * w4 + 0) * i3)), L4 = S3, A4 = _3;
        }
        1 & y4 || (x3 = 3 * L4 + A4 + 131074 >> 2, n3(t4[r3 + y4 - 1], 255 & x3, x3 >> 16, g4, m4 + (y4 - 1) * i3), null != a3 && (x3 = 3 * A4 + L4 + 131074 >> 2, n3(a3[o3 + y4 - 1], 255 & x3, x3 >> 16, v4, b4 + (y4 - 1) * i3)));
      };
    }
    function br() {
      vi[En] = bi, vi[qn] = wi, vi[Dn] = yi, vi[Rn] = Ni, vi[Tn] = Li, vi[Un] = Ai, vi[zn] = xi, vi[Hn] = wi, vi[Wn] = Ni, vi[Vn] = Li, vi[Gn] = Ai;
    }
    function yr(t4) {
      return t4 & -16384 ? 0 > t4 ? 0 : 255 : t4 >> Ii;
    }
    function wr(t4, e2) {
      return yr((19077 * t4 >> 8) + (26149 * e2 >> 8) - 14234);
    }
    function Nr(t4, e2, r2) {
      return yr((19077 * t4 >> 8) - (6419 * e2 >> 8) - (13320 * r2 >> 8) + 8708);
    }
    function Lr(t4, e2) {
      return yr((19077 * t4 >> 8) + (33050 * e2 >> 8) - 17685);
    }
    function Ar(t4, e2, r2, n3, i3) {
      n3[i3 + 0] = wr(t4, r2), n3[i3 + 1] = Nr(t4, e2, r2), n3[i3 + 2] = Lr(t4, e2);
    }
    function xr(t4, e2, r2, n3, i3) {
      n3[i3 + 0] = Lr(t4, e2), n3[i3 + 1] = Nr(t4, e2, r2), n3[i3 + 2] = wr(t4, r2);
    }
    function Sr(t4, e2, r2, n3, i3) {
      var a3 = Nr(t4, e2, r2);
      e2 = a3 << 3 & 224 | Lr(t4, e2) >> 3, n3[i3 + 0] = 248 & wr(t4, r2) | a3 >> 5, n3[i3 + 1] = e2;
    }
    function _r(t4, e2, r2, n3, i3) {
      var a3 = 240 & Lr(t4, e2) | 15;
      n3[i3 + 0] = 240 & wr(t4, r2) | Nr(t4, e2, r2) >> 4, n3[i3 + 1] = a3;
    }
    function Pr(t4, e2, r2, n3, i3) {
      n3[i3 + 0] = 255, Ar(t4, e2, r2, n3, i3 + 1);
    }
    function kr(t4, e2, r2, n3, i3) {
      xr(t4, e2, r2, n3, i3), n3[i3 + 3] = 255;
    }
    function Ir(t4, e2, r2, n3, i3) {
      Ar(t4, e2, r2, n3, i3), n3[i3 + 3] = 255;
    }
    function Vt2(t4, e2) {
      return 0 > t4 ? 0 : t4 > e2 ? e2 : t4;
    }
    function Fr(e2, r2, n3) {
      t3[e2] = function(t4, e3, i3, a3, o3, s3, c4, u4, h4) {
        for (var l4 = u4 + (-2 & h4) * n3; u4 != l4; ) r2(t4[e3 + 0], i3[a3 + 0], o3[s3 + 0], c4, u4), r2(t4[e3 + 1], i3[a3 + 0], o3[s3 + 0], c4, u4 + n3), e3 += 2, ++a3, ++s3, u4 += 2 * n3;
        1 & h4 && r2(t4[e3 + 0], i3[a3 + 0], o3[s3 + 0], c4, u4);
      };
    }
    function Cr(t4, e2, r2) {
      return 0 == r2 ? 0 == t4 ? 0 == e2 ? 6 : 5 : 0 == e2 ? 4 : 0 : r2;
    }
    function jr(t4, e2, r2, n3, i3) {
      switch (t4 >>> 30) {
        case 3:
          on2(e2, r2, n3, i3, 0);
          break;
        case 2:
          sn(e2, r2, n3, i3);
          break;
        case 1:
          un(e2, r2, n3, i3);
      }
    }
    function Or(t4, e2) {
      var r2, a3, o3 = e2.M, s3 = e2.Nb, c4 = t4.oc, u4 = t4.pc + 40, h4 = t4.oc, l4 = t4.pc + 584, f4 = t4.oc, d4 = t4.pc + 600;
      for (r2 = 0; 16 > r2; ++r2) c4[u4 + 32 * r2 - 1] = 129;
      for (r2 = 0; 8 > r2; ++r2) h4[l4 + 32 * r2 - 1] = 129, f4[d4 + 32 * r2 - 1] = 129;
      for (0 < o3 ? c4[u4 - 1 - 32] = h4[l4 - 1 - 32] = f4[d4 - 1 - 32] = 129 : (i2(c4, u4 - 32 - 1, 127, 21), i2(h4, l4 - 32 - 1, 127, 9), i2(f4, d4 - 32 - 1, 127, 9)), a3 = 0; a3 < t4.za; ++a3) {
        var p4 = e2.ya[e2.aa + a3];
        if (0 < a3) {
          for (r2 = -1; 16 > r2; ++r2) n2(c4, u4 + 32 * r2 - 4, c4, u4 + 32 * r2 + 12, 4);
          for (r2 = -1; 8 > r2; ++r2) n2(h4, l4 + 32 * r2 - 4, h4, l4 + 32 * r2 + 4, 4), n2(f4, d4 + 32 * r2 - 4, f4, d4 + 32 * r2 + 4, 4);
        }
        var g4 = t4.Gd, m4 = t4.Hd + a3, v4 = p4.ad, b4 = p4.Hc;
        if (0 < o3 && (n2(c4, u4 - 32, g4[m4].y, 0, 16), n2(h4, l4 - 32, g4[m4].f, 0, 8), n2(f4, d4 - 32, g4[m4].ea, 0, 8)), p4.Za) {
          var y4 = c4, w4 = u4 - 32 + 16;
          for (0 < o3 && (a3 >= t4.za - 1 ? i2(y4, w4, g4[m4].y[15], 4) : n2(y4, w4, g4[m4 + 1].y, 0, 4)), r2 = 0; 4 > r2; r2++) y4[w4 + 128 + r2] = y4[w4 + 256 + r2] = y4[w4 + 384 + r2] = y4[w4 + 0 + r2];
          for (r2 = 0; 16 > r2; ++r2, b4 <<= 2) y4 = c4, w4 = u4 + Di[r2], fi[p4.Ob[r2]](y4, w4), jr(b4, v4, 16 * +r2, y4, w4);
        } else if (y4 = Cr(a3, o3, p4.Ob[0]), li[y4](c4, u4), 0 != b4) for (r2 = 0; 16 > r2; ++r2, b4 <<= 2) jr(b4, v4, 16 * +r2, c4, u4 + Di[r2]);
        for (r2 = p4.Gc, y4 = Cr(a3, o3, p4.Dd), di[y4](h4, l4), di[y4](f4, d4), b4 = v4, y4 = h4, w4 = l4, 255 & (p4 = r2 >> 0) && (170 & p4 ? cn(b4, 256, y4, w4) : hn(b4, 256, y4, w4)), p4 = f4, b4 = d4, 255 & (r2 >>= 8) && (170 & r2 ? cn(v4, 320, p4, b4) : hn(v4, 320, p4, b4)), o3 < t4.Ub - 1 && (n2(g4[m4].y, 0, c4, u4 + 480, 16), n2(g4[m4].f, 0, h4, l4 + 224, 8), n2(g4[m4].ea, 0, f4, d4 + 224, 8)), r2 = 8 * s3 * t4.B, g4 = t4.sa, m4 = t4.ta + 16 * a3 + 16 * s3 * t4.R, v4 = t4.qa, p4 = t4.ra + 8 * a3 + r2, b4 = t4.Ha, y4 = t4.Ia + 8 * a3 + r2, r2 = 0; 16 > r2; ++r2) n2(g4, m4 + r2 * t4.R, c4, u4 + 32 * r2, 16);
        for (r2 = 0; 8 > r2; ++r2) n2(v4, p4 + r2 * t4.B, h4, l4 + 32 * r2, 8), n2(b4, y4 + r2 * t4.B, f4, d4 + 32 * r2, 8);
      }
    }
    function Br(t4, n3, i3, a3, o3, s3, c4, u4, h4) {
      var l4 = [0], f4 = [0], d4 = 0, p4 = null != h4 ? h4.kd : 0, g4 = null != h4 ? h4 : new nr();
      if (null == t4 || 12 > i3) return 7;
      g4.data = t4, g4.w = n3, g4.ha = i3, n3 = [n3], i3 = [i3], g4.gb = [g4.gb];
      t: {
        var m4 = n3, b4 = i3, y4 = g4.gb;
        if (e(null != t4), e(null != b4), e(null != y4), y4[0] = 0, 12 <= b4[0] && !r(t4, m4[0], "RIFF")) {
          if (r(t4, m4[0] + 8, "WEBP")) {
            y4 = 3;
            break t;
          }
          var w4 = j2(t4, m4[0] + 4);
          if (12 > w4 || 4294967286 < w4) {
            y4 = 3;
            break t;
          }
          if (p4 && w4 > b4[0] - 8) {
            y4 = 7;
            break t;
          }
          y4[0] = w4, m4[0] += 12, b4[0] -= 12;
        }
        y4 = 0;
      }
      if (0 != y4) return y4;
      for (w4 = 0 < g4.gb[0], i3 = i3[0]; ; ) {
        t: {
          var L4 = t4;
          b4 = n3, y4 = i3;
          var A4 = l4, x3 = f4, S3 = m4 = [0];
          if ((k3 = d4 = [d4])[0] = 0, 8 > y4[0]) y4 = 7;
          else {
            if (!r(L4, b4[0], "VP8X")) {
              if (10 != j2(L4, b4[0] + 4)) {
                y4 = 3;
                break t;
              }
              if (18 > y4[0]) {
                y4 = 7;
                break t;
              }
              var _3 = j2(L4, b4[0] + 8), P3 = 1 + C2(L4, b4[0] + 12);
              if (2147483648 <= P3 * (L4 = 1 + C2(L4, b4[0] + 15))) {
                y4 = 3;
                break t;
              }
              null != S3 && (S3[0] = _3), null != A4 && (A4[0] = P3), null != x3 && (x3[0] = L4), b4[0] += 18, y4[0] -= 18, k3[0] = 1;
            }
            y4 = 0;
          }
        }
        if (d4 = d4[0], m4 = m4[0], 0 != y4) return y4;
        if (b4 = !!(2 & m4), !w4 && d4) return 3;
        if (null != s3 && (s3[0] = !!(16 & m4)), null != c4 && (c4[0] = b4), null != u4 && (u4[0] = 0), c4 = l4[0], m4 = f4[0], d4 && b4 && null == h4) {
          y4 = 0;
          break;
        }
        if (4 > i3) {
          y4 = 7;
          break;
        }
        if (w4 && d4 || !w4 && !d4 && !r(t4, n3[0], "ALPH")) {
          i3 = [i3], g4.na = [g4.na], g4.P = [g4.P], g4.Sa = [g4.Sa];
          t: {
            _3 = t4, y4 = n3, w4 = i3;
            var k3 = g4.gb;
            A4 = g4.na, x3 = g4.P, S3 = g4.Sa;
            P3 = 22, e(null != _3), e(null != w4), L4 = y4[0];
            var I3 = w4[0];
            for (e(null != A4), e(null != S3), A4[0] = null, x3[0] = null, S3[0] = 0; ; ) {
              if (y4[0] = L4, w4[0] = I3, 8 > I3) {
                y4 = 7;
                break t;
              }
              var F3 = j2(_3, L4 + 4);
              if (4294967286 < F3) {
                y4 = 3;
                break t;
              }
              var O3 = 8 + F3 + 1 & -2;
              if (P3 += O3, 0 < k3 && P3 > k3) {
                y4 = 3;
                break t;
              }
              if (!r(_3, L4, "VP8 ") || !r(_3, L4, "VP8L")) {
                y4 = 0;
                break t;
              }
              if (I3[0] < O3) {
                y4 = 7;
                break t;
              }
              r(_3, L4, "ALPH") || (A4[0] = _3, x3[0] = L4 + 8, S3[0] = F3), L4 += O3, I3 -= O3;
            }
          }
          if (i3 = i3[0], g4.na = g4.na[0], g4.P = g4.P[0], g4.Sa = g4.Sa[0], 0 != y4) break;
        }
        i3 = [i3], g4.Ja = [g4.Ja], g4.xa = [g4.xa];
        t: if (k3 = t4, y4 = n3, w4 = i3, A4 = g4.gb[0], x3 = g4.Ja, S3 = g4.xa, _3 = y4[0], L4 = !r(k3, _3, "VP8 "), P3 = !r(k3, _3, "VP8L"), e(null != k3), e(null != w4), e(null != x3), e(null != S3), 8 > w4[0]) y4 = 7;
        else {
          if (L4 || P3) {
            if (k3 = j2(k3, _3 + 4), 12 <= A4 && k3 > A4 - 12) {
              y4 = 3;
              break t;
            }
            if (p4 && k3 > w4[0] - 8) {
              y4 = 7;
              break t;
            }
            x3[0] = k3, y4[0] += 8, w4[0] -= 8, S3[0] = P3;
          } else S3[0] = 5 <= w4[0] && 47 == k3[_3 + 0] && !(k3[_3 + 4] >> 5), x3[0] = w4[0];
          y4 = 0;
        }
        if (i3 = i3[0], g4.Ja = g4.Ja[0], g4.xa = g4.xa[0], n3 = n3[0], 0 != y4) break;
        if (4294967286 < g4.Ja) return 3;
        if (null == u4 || b4 || (u4[0] = g4.xa ? 2 : 1), c4 = [c4], m4 = [m4], g4.xa) {
          if (5 > i3) {
            y4 = 7;
            break;
          }
          u4 = c4, p4 = m4, b4 = s3, null == t4 || 5 > i3 ? t4 = 0 : 5 <= i3 && 47 == t4[n3 + 0] && !(t4[n3 + 4] >> 5) ? (w4 = [0], k3 = [0], A4 = [0], v3(x3 = new N3(), t4, n3, i3), gt2(x3, w4, k3, A4) ? (null != u4 && (u4[0] = w4[0]), null != p4 && (p4[0] = k3[0]), null != b4 && (b4[0] = A4[0]), t4 = 1) : t4 = 0) : t4 = 0;
        } else {
          if (10 > i3) {
            y4 = 7;
            break;
          }
          u4 = m4, null == t4 || 10 > i3 || !Xt2(t4, n3 + 3, i3 - 3) ? t4 = 0 : (p4 = t4[n3 + 0] | t4[n3 + 1] << 8 | t4[n3 + 2] << 16, b4 = 16383 & (t4[n3 + 7] << 8 | t4[n3 + 6]), t4 = 16383 & (t4[n3 + 9] << 8 | t4[n3 + 8]), 1 & p4 || 3 < (p4 >> 1 & 7) || !(p4 >> 4 & 1) || p4 >> 5 >= g4.Ja || !b4 || !t4 ? t4 = 0 : (c4 && (c4[0] = b4), u4 && (u4[0] = t4), t4 = 1));
        }
        if (!t4) return 3;
        if (c4 = c4[0], m4 = m4[0], d4 && (l4[0] != c4 || f4[0] != m4)) return 3;
        null != h4 && (h4[0] = g4, h4.offset = n3 - h4.w, e(4294967286 > n3 - h4.w), e(h4.offset == h4.ha - i3));
        break;
      }
      return 0 == y4 || 7 == y4 && d4 && null == h4 ? (null != s3 && (s3[0] |= null != g4.na && 0 < g4.na.length), null != a3 && (a3[0] = c4), null != o3 && (o3[0] = m4), 0) : y4;
    }
    function Mr(t4, e2, r2) {
      var n3 = e2.width, i3 = e2.height, a3 = 0, o3 = 0, s3 = n3, c4 = i3;
      if (e2.Da = null != t4 && 0 < t4.Da, e2.Da && (s3 = t4.cd, c4 = t4.bd, a3 = t4.v, o3 = t4.j, 11 > r2 || (a3 &= -2, o3 &= -2), 0 > a3 || 0 > o3 || 0 >= s3 || 0 >= c4 || a3 + s3 > n3 || o3 + c4 > i3)) return 0;
      if (e2.v = a3, e2.j = o3, e2.va = a3 + s3, e2.o = o3 + c4, e2.U = s3, e2.T = c4, e2.da = null != t4 && 0 < t4.da, e2.da) {
        if (!E2(s3, c4, r2 = [t4.ib], a3 = [t4.hb])) return 0;
        e2.ib = r2[0], e2.hb = a3[0];
      }
      return e2.ob = null != t4 && t4.ob, e2.Kb = null == t4 || !t4.Sd, e2.da && (e2.ob = e2.ib < 3 * n3 / 4 && e2.hb < 3 * i3 / 4, e2.Kb = 0), 1;
    }
    function Er(t4) {
      if (null == t4) return 2;
      if (11 > t4.S) {
        var e2 = t4.f.RGBA;
        e2.fb += (t4.height - 1) * e2.A, e2.A = -e2.A;
      } else e2 = t4.f.kb, t4 = t4.height, e2.O += (t4 - 1) * e2.fa, e2.fa = -e2.fa, e2.N += (t4 - 1 >> 1) * e2.Ab, e2.Ab = -e2.Ab, e2.W += (t4 - 1 >> 1) * e2.Db, e2.Db = -e2.Db, null != e2.F && (e2.J += (t4 - 1) * e2.lb, e2.lb = -e2.lb);
      return 0;
    }
    function qr(t4, e2, r2, n3) {
      if (null == n3 || 0 >= t4 || 0 >= e2) return 2;
      if (null != r2) {
        if (r2.Da) {
          var i3 = r2.cd, o3 = r2.bd, s3 = -2 & r2.v, c4 = -2 & r2.j;
          if (0 > s3 || 0 > c4 || 0 >= i3 || 0 >= o3 || s3 + i3 > t4 || c4 + o3 > e2) return 2;
          t4 = i3, e2 = o3;
        }
        if (r2.da) {
          if (!E2(t4, e2, i3 = [r2.ib], o3 = [r2.hb])) return 2;
          t4 = i3[0], e2 = o3[0];
        }
      }
      n3.width = t4, n3.height = e2;
      t: {
        var u4 = n3.width, h4 = n3.height;
        if (t4 = n3.S, 0 >= u4 || 0 >= h4 || !(t4 >= En && 13 > t4)) t4 = 2;
        else {
          if (0 >= n3.Rd && null == n3.sd) {
            s3 = o3 = i3 = e2 = 0;
            var l4 = (c4 = u4 * zi[t4]) * h4;
            if (11 > t4 || (o3 = (h4 + 1) / 2 * (e2 = (u4 + 1) / 2), 12 == t4 && (s3 = (i3 = u4) * h4)), null == (h4 = a2(l4 + 2 * o3 + s3))) {
              t4 = 1;
              break t;
            }
            n3.sd = h4, 11 > t4 ? ((u4 = n3.f.RGBA).eb = h4, u4.fb = 0, u4.A = c4, u4.size = l4) : ((u4 = n3.f.kb).y = h4, u4.O = 0, u4.fa = c4, u4.Fd = l4, u4.f = h4, u4.N = 0 + l4, u4.Ab = e2, u4.Cd = o3, u4.ea = h4, u4.W = 0 + l4 + o3, u4.Db = e2, u4.Ed = o3, 12 == t4 && (u4.F = h4, u4.J = 0 + l4 + 2 * o3), u4.Tc = s3, u4.lb = i3);
          }
          if (e2 = 1, i3 = n3.S, o3 = n3.width, s3 = n3.height, i3 >= En && 13 > i3) if (11 > i3) t4 = n3.f.RGBA, e2 &= (c4 = Math.abs(t4.A)) * (s3 - 1) + o3 <= t4.size, e2 &= c4 >= o3 * zi[i3], e2 &= null != t4.eb;
          else {
            t4 = n3.f.kb, c4 = (o3 + 1) / 2, l4 = (s3 + 1) / 2, u4 = Math.abs(t4.fa);
            h4 = Math.abs(t4.Ab);
            var f4 = Math.abs(t4.Db), d4 = Math.abs(t4.lb), p4 = d4 * (s3 - 1) + o3;
            e2 &= u4 * (s3 - 1) + o3 <= t4.Fd, e2 &= h4 * (l4 - 1) + c4 <= t4.Cd, e2 = (e2 &= f4 * (l4 - 1) + c4 <= t4.Ed) & u4 >= o3 & h4 >= c4 & f4 >= c4, e2 &= null != t4.y, e2 &= null != t4.f, e2 &= null != t4.ea, 12 == i3 && (e2 &= d4 >= o3, e2 &= p4 <= t4.Tc, e2 &= null != t4.F);
          }
          else e2 = 0;
          t4 = e2 ? 0 : 2;
        }
      }
      return 0 != t4 || null != r2 && r2.fd && (t4 = Er(n3)), t4;
    }
    var Dr = 64, Rr = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215], Tr = 24, Ur = 32, zr = 8, Hr = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    R2("Predictor0", "PredictorAdd0"), t3.Predictor0 = function() {
      return 4278190080;
    }, t3.Predictor1 = function(t4) {
      return t4;
    }, t3.Predictor2 = function(t4, e2, r2) {
      return e2[r2 + 0];
    }, t3.Predictor3 = function(t4, e2, r2) {
      return e2[r2 + 1];
    }, t3.Predictor4 = function(t4, e2, r2) {
      return e2[r2 - 1];
    }, t3.Predictor5 = function(t4, e2, r2) {
      return U2(U2(t4, e2[r2 + 1]), e2[r2 + 0]);
    }, t3.Predictor6 = function(t4, e2, r2) {
      return U2(t4, e2[r2 - 1]);
    }, t3.Predictor7 = function(t4, e2, r2) {
      return U2(t4, e2[r2 + 0]);
    }, t3.Predictor8 = function(t4, e2, r2) {
      return U2(e2[r2 - 1], e2[r2 + 0]);
    }, t3.Predictor9 = function(t4, e2, r2) {
      return U2(e2[r2 + 0], e2[r2 + 1]);
    }, t3.Predictor10 = function(t4, e2, r2) {
      return U2(U2(t4, e2[r2 - 1]), U2(e2[r2 + 0], e2[r2 + 1]));
    }, t3.Predictor11 = function(t4, e2, r2) {
      var n3 = e2[r2 + 0];
      return 0 >= W2(n3 >> 24 & 255, t4 >> 24 & 255, (e2 = e2[r2 - 1]) >> 24 & 255) + W2(n3 >> 16 & 255, t4 >> 16 & 255, e2 >> 16 & 255) + W2(n3 >> 8 & 255, t4 >> 8 & 255, e2 >> 8 & 255) + W2(255 & n3, 255 & t4, 255 & e2) ? n3 : t4;
    }, t3.Predictor12 = function(t4, e2, r2) {
      var n3 = e2[r2 + 0];
      return (z2((t4 >> 24 & 255) + (n3 >> 24 & 255) - ((e2 = e2[r2 - 1]) >> 24 & 255)) << 24 | z2((t4 >> 16 & 255) + (n3 >> 16 & 255) - (e2 >> 16 & 255)) << 16 | z2((t4 >> 8 & 255) + (n3 >> 8 & 255) - (e2 >> 8 & 255)) << 8 | z2((255 & t4) + (255 & n3) - (255 & e2))) >>> 0;
    }, t3.Predictor13 = function(t4, e2, r2) {
      var n3 = e2[r2 - 1];
      return (H2((t4 = U2(t4, e2[r2 + 0])) >> 24 & 255, n3 >> 24 & 255) << 24 | H2(t4 >> 16 & 255, n3 >> 16 & 255) << 16 | H2(t4 >> 8 & 255, n3 >> 8 & 255) << 8 | H2(t4 >> 0 & 255, n3 >> 0 & 255)) >>> 0;
    };
    var Wr = t3.PredictorAdd0;
    t3.PredictorAdd1 = V2, R2("Predictor2", "PredictorAdd2"), R2("Predictor3", "PredictorAdd3"), R2("Predictor4", "PredictorAdd4"), R2("Predictor5", "PredictorAdd5"), R2("Predictor6", "PredictorAdd6"), R2("Predictor7", "PredictorAdd7"), R2("Predictor8", "PredictorAdd8"), R2("Predictor9", "PredictorAdd9"), R2("Predictor10", "PredictorAdd10"), R2("Predictor11", "PredictorAdd11"), R2("Predictor12", "PredictorAdd12"), R2("Predictor13", "PredictorAdd13");
    var Vr = t3.PredictorAdd2;
    X2("ColorIndexInverseTransform", "MapARGB", "32b", function(t4) {
      return t4 >> 8 & 255;
    }, function(t4) {
      return t4;
    }), X2("VP8LColorIndexInverseTransformAlpha", "MapAlpha", "8b", function(t4) {
      return t4;
    }, function(t4) {
      return t4 >> 8 & 255;
    });
    var Gr, Yr = t3.ColorIndexInverseTransform, Jr = t3.MapARGB, Xr = t3.VP8LColorIndexInverseTransformAlpha, Kr = t3.MapAlpha, Zr = t3.VP8LPredictorsAdd = [];
    Zr.length = 16, (t3.VP8LPredictors = []).length = 16, (t3.VP8LPredictorsAdd_C = []).length = 16, (t3.VP8LPredictors_C = []).length = 16;
    var $r, Qr, tn, en, rn, nn, an, on2, sn, cn, un, hn, ln2, fn, dn, pn, gn, mn, vn, bn, yn, wn, Nn, Ln, An, xn, Sn, _n, Pn = a2(511), kn = a2(2041), In = a2(225), Fn = a2(767), Cn = 0, jn = kn, On = In, Bn = Fn, Mn = Pn, En = 0, qn = 1, Dn = 2, Rn = 3, Tn = 4, Un = 5, zn = 6, Hn = 7, Wn = 8, Vn = 9, Gn = 10, Yn = [2, 3, 7], Jn = [3, 3, 11], Xn = [280, 256, 256, 256, 40], Kn = [0, 1, 1, 1, 0], Zn = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], $n = [24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54, 58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75, 52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104, 2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62, 120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47, 117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110, 48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112], Qn = [2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004], ti = 8, ei = [4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108, 110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 143, 145, 148, 151, 154, 157], ri = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284], ni = null, ii = [[173, 148, 140, 0], [176, 155, 140, 135, 0], [180, 157, 141, 134, 130, 0], [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0]], ai = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15], oi = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9], si = [[[[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]], [[253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128], [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128], [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128]], [[1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128], [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128], [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128]], [[1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128], [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128], [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128]], [[1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128], [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128], [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128]], [[1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128], [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128], [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128]], [[1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128], [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128], [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62], [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1], [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128]], [[1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128], [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128], [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128]], [[1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128], [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128], [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128]], [[1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128], [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128], [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128]], [[1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128], [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128], [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128]], [[1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128], [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128], [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128]], [[1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128], [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128], [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128]], [[1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128], [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128], [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128]]], [[[253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128], [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128], [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128]], [[1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128], [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128], [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128]], [[1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128], [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128], [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128]], [[1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128], [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128], [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128]], [[1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128], [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128], [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128], [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128], [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128], [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128], [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255], [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128], [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128]], [[1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128], [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128], [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128]], [[1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128], [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128], [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128]], [[1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128], [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128], [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128]], [[1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128], [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128], [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128]], [[1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128], [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128], [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128]], [[1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128], [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128], [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]]]], ci = [[[231, 120, 48, 89, 115, 113, 120, 152, 112], [152, 179, 64, 126, 170, 118, 46, 70, 95], [175, 69, 143, 80, 85, 82, 72, 155, 103], [56, 58, 10, 171, 218, 189, 17, 13, 152], [114, 26, 17, 163, 44, 195, 21, 10, 173], [121, 24, 80, 195, 26, 62, 44, 64, 85], [144, 71, 10, 38, 171, 213, 144, 34, 26], [170, 46, 55, 19, 136, 160, 33, 206, 71], [63, 20, 8, 114, 114, 208, 12, 9, 226], [81, 40, 11, 96, 182, 84, 29, 16, 36]], [[134, 183, 89, 137, 98, 101, 106, 165, 148], [72, 187, 100, 130, 157, 111, 32, 75, 80], [66, 102, 167, 99, 74, 62, 40, 234, 128], [41, 53, 9, 178, 241, 141, 26, 8, 107], [74, 43, 26, 146, 73, 166, 49, 23, 157], [65, 38, 105, 160, 51, 52, 31, 115, 128], [104, 79, 12, 27, 217, 255, 87, 17, 7], [87, 68, 71, 44, 114, 51, 15, 186, 23], [47, 41, 14, 110, 182, 183, 21, 17, 194], [66, 45, 25, 102, 197, 189, 23, 18, 22]], [[88, 88, 147, 150, 42, 46, 45, 196, 205], [43, 97, 183, 117, 85, 38, 35, 179, 61], [39, 53, 200, 87, 26, 21, 43, 232, 171], [56, 34, 51, 104, 114, 102, 29, 93, 77], [39, 28, 85, 171, 58, 165, 90, 98, 64], [34, 22, 116, 206, 23, 34, 43, 166, 73], [107, 54, 32, 26, 51, 1, 81, 43, 31], [68, 25, 106, 22, 64, 171, 36, 225, 114], [34, 19, 21, 102, 132, 188, 16, 76, 124], [62, 18, 78, 95, 85, 57, 50, 48, 51]], [[193, 101, 35, 159, 215, 111, 89, 46, 111], [60, 148, 31, 172, 219, 228, 21, 18, 111], [112, 113, 77, 85, 179, 255, 38, 120, 114], [40, 42, 1, 196, 245, 209, 10, 25, 109], [88, 43, 29, 140, 166, 213, 37, 43, 154], [61, 63, 30, 155, 67, 45, 68, 1, 209], [100, 80, 8, 43, 154, 1, 51, 26, 71], [142, 78, 78, 16, 255, 128, 34, 197, 171], [41, 40, 5, 102, 211, 183, 4, 1, 221], [51, 50, 17, 168, 209, 192, 23, 25, 82]], [[138, 31, 36, 171, 27, 166, 38, 44, 229], [67, 87, 58, 169, 82, 115, 26, 59, 179], [63, 59, 90, 180, 59, 166, 93, 73, 154], [40, 40, 21, 116, 143, 209, 34, 39, 175], [47, 15, 16, 183, 34, 223, 49, 45, 183], [46, 17, 33, 183, 6, 98, 15, 32, 183], [57, 46, 22, 24, 128, 1, 54, 17, 37], [65, 32, 73, 115, 28, 128, 23, 128, 205], [40, 3, 9, 115, 51, 192, 18, 6, 223], [87, 37, 9, 115, 59, 77, 64, 21, 47]], [[104, 55, 44, 218, 9, 54, 53, 130, 226], [64, 90, 70, 205, 40, 41, 23, 26, 57], [54, 57, 112, 184, 5, 41, 38, 166, 213], [30, 34, 26, 133, 152, 116, 10, 32, 134], [39, 19, 53, 221, 26, 114, 32, 73, 255], [31, 9, 65, 234, 2, 15, 1, 118, 73], [75, 32, 12, 51, 192, 255, 160, 43, 51], [88, 31, 35, 67, 102, 85, 55, 186, 85], [56, 21, 23, 111, 59, 205, 45, 37, 192], [55, 38, 70, 124, 73, 102, 1, 34, 98]], [[125, 98, 42, 88, 104, 85, 117, 175, 82], [95, 84, 53, 89, 128, 100, 113, 101, 45], [75, 79, 123, 47, 51, 128, 81, 171, 1], [57, 17, 5, 71, 102, 57, 53, 41, 49], [38, 33, 13, 121, 57, 73, 26, 1, 85], [41, 10, 67, 138, 77, 110, 90, 47, 114], [115, 21, 2, 10, 102, 255, 166, 23, 6], [101, 29, 16, 10, 85, 128, 101, 196, 26], [57, 18, 10, 102, 102, 213, 34, 20, 43], [117, 20, 15, 36, 163, 128, 68, 1, 26]], [[102, 61, 71, 37, 34, 53, 31, 243, 192], [69, 60, 71, 38, 73, 119, 28, 222, 37], [68, 45, 128, 34, 1, 47, 11, 245, 171], [62, 17, 19, 70, 146, 85, 55, 62, 70], [37, 43, 37, 154, 100, 163, 85, 160, 1], [63, 9, 92, 136, 28, 64, 32, 201, 85], [75, 15, 9, 9, 64, 255, 184, 119, 16], [86, 6, 28, 5, 64, 255, 25, 248, 1], [56, 8, 17, 132, 137, 255, 55, 116, 128], [58, 15, 20, 82, 135, 57, 26, 121, 40]], [[164, 50, 31, 137, 154, 133, 25, 35, 218], [51, 103, 44, 131, 131, 123, 31, 6, 158], [86, 40, 64, 135, 148, 224, 45, 183, 128], [22, 26, 17, 131, 240, 154, 14, 1, 209], [45, 16, 21, 91, 64, 222, 7, 1, 197], [56, 21, 39, 155, 60, 138, 23, 102, 213], [83, 12, 13, 54, 192, 255, 68, 47, 28], [85, 26, 85, 85, 128, 128, 32, 146, 171], [18, 11, 7, 63, 144, 171, 4, 4, 246], [35, 27, 10, 146, 174, 171, 12, 26, 128]], [[190, 80, 35, 99, 180, 80, 126, 54, 45], [85, 126, 47, 87, 176, 51, 41, 20, 32], [101, 75, 128, 139, 118, 146, 116, 128, 85], [56, 41, 15, 176, 236, 85, 37, 9, 62], [71, 30, 17, 119, 118, 255, 17, 18, 138], [101, 38, 60, 138, 55, 70, 43, 26, 142], [146, 36, 19, 30, 171, 255, 97, 27, 20], [138, 45, 61, 62, 219, 1, 81, 188, 64], [32, 41, 20, 117, 151, 142, 20, 21, 163], [112, 19, 12, 61, 195, 128, 48, 4, 24]]], ui = [[[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255], [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255], [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255], [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255], [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255], [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255], [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255], [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255], [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255], [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255], [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255], [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]]], hi = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0], li = [], fi = [], di = [], pi = 1, gi = 2, mi = [], vi = [];
    vr("UpsampleRgbLinePair", Ar, 3), vr("UpsampleBgrLinePair", xr, 3), vr("UpsampleRgbaLinePair", Ir, 4), vr("UpsampleBgraLinePair", kr, 4), vr("UpsampleArgbLinePair", Pr, 4), vr("UpsampleRgba4444LinePair", _r, 2), vr("UpsampleRgb565LinePair", Sr, 2);
    var bi = t3.UpsampleRgbLinePair, yi = t3.UpsampleBgrLinePair, wi = t3.UpsampleRgbaLinePair, Ni = t3.UpsampleBgraLinePair, Li = t3.UpsampleArgbLinePair, Ai = t3.UpsampleRgba4444LinePair, xi = t3.UpsampleRgb565LinePair, Si = 16, _i = 1 << Si - 1, Pi = -227, ki = 482, Ii = 6, Ci = 0, ji = a2(256), Oi = a2(256), Bi = a2(256), Mi = a2(256), Ei = a2(ki - Pi), qi = a2(ki - Pi);
    Fr("YuvToRgbRow", Ar, 3), Fr("YuvToBgrRow", xr, 3), Fr("YuvToRgbaRow", Ir, 4), Fr("YuvToBgraRow", kr, 4), Fr("YuvToArgbRow", Pr, 4), Fr("YuvToRgba4444Row", _r, 2), Fr("YuvToRgb565Row", Sr, 2);
    var Di = [0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396], Ri = [0, 2, 8], Ti = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1], Ui = 1;
    this.WebPDecodeRGBA = function(t4, r2, n3, i3, a3) {
      var o3 = qn, s3 = new rr(), c4 = new ot2();
      s3.ba = c4, c4.S = o3, c4.width = [c4.width], c4.height = [c4.height];
      var u4 = c4.width, h4 = c4.height, l4 = new st2();
      if (null == l4 || null == t4) var f4 = 2;
      else e(null != l4), f4 = Br(t4, r2, n3, l4.width, l4.height, l4.Pd, l4.Qd, l4.format, null);
      if (0 != f4 ? u4 = 0 : (null != u4 && (u4[0] = l4.width[0]), null != h4 && (h4[0] = l4.height[0]), u4 = 1), u4) {
        c4.width = c4.width[0], c4.height = c4.height[0], null != i3 && (i3[0] = c4.width), null != a3 && (a3[0] = c4.height);
        t: {
          if (i3 = new Gt2(), (a3 = new nr()).data = t4, a3.w = r2, a3.ha = n3, a3.kd = 1, r2 = [0], e(null != a3), (0 == (t4 = Br(a3.data, a3.w, a3.ha, null, null, null, r2, null, a3)) || 7 == t4) && r2[0] && (t4 = 4), 0 == (r2 = t4)) {
            if (e(null != s3), i3.data = a3.data, i3.w = a3.w + a3.offset, i3.ha = a3.ha - a3.offset, i3.put = dt2, i3.ac = ft2, i3.bc = pt2, i3.ma = s3, a3.xa) {
              if (null == (t4 = kt2())) {
                s3 = 1;
                break t;
              }
              if (function(t5, r3) {
                var n4 = [0], i4 = [0], a4 = [0];
                e: for (; ; ) {
                  if (null == t5) return 0;
                  if (null == r3) return t5.a = 2, 0;
                  if (t5.l = r3, t5.a = 0, v3(t5.m, r3.data, r3.w, r3.ha), !gt2(t5.m, n4, i4, a4)) {
                    t5.a = 3;
                    break e;
                  }
                  if (t5.xb = gi, r3.width = n4[0], r3.height = i4[0], !It2(n4[0], i4[0], 1, t5, null)) break e;
                  return 1;
                }
                return e(0 != t5.a), 0;
              }(t4, i3)) {
                if (i3 = 0 == (r2 = qr(i3.width, i3.height, s3.Oa, s3.ba))) {
                  e: {
                    i3 = t4;
                    r: for (; ; ) {
                      if (null == i3) {
                        i3 = 0;
                        break e;
                      }
                      if (e(null != i3.s.yc), e(null != i3.s.Ya), e(0 < i3.s.Wb), e(null != (n3 = i3.l)), e(null != (a3 = n3.ma)), 0 != i3.xb) {
                        if (i3.ca = a3.ba, i3.tb = a3.tb, e(null != i3.ca), !Mr(a3.Oa, n3, Rn)) {
                          i3.a = 2;
                          break r;
                        }
                        if (!Ft2(i3, n3.width)) break r;
                        if (n3.da) break r;
                        if ((n3.da || nt2(i3.ca.S)) && mr(), 11 > i3.ca.S || (alert("todo:WebPInitConvertARGBToYUV"), null != i3.ca.f.kb.F && mr()), i3.Pb && 0 < i3.s.ua && null == i3.s.vb.X && !O2(i3.s.vb, i3.s.Wa.Xa)) {
                          i3.a = 1;
                          break r;
                        }
                        i3.xb = 0;
                      }
                      if (!_t2(i3, i3.V, i3.Ba, i3.c, i3.i, n3.o, Lt2)) break r;
                      a3.Dc = i3.Ma, i3 = 1;
                      break e;
                    }
                    e(0 != i3.a), i3 = 0;
                  }
                  i3 = !i3;
                }
                i3 && (r2 = t4.a);
              } else r2 = t4.a;
            } else {
              if (null == (t4 = new Yt2())) {
                s3 = 1;
                break t;
              }
              if (t4.Fa = a3.na, t4.P = a3.P, t4.qc = a3.Sa, Kt2(t4, i3)) {
                if (0 == (r2 = qr(i3.width, i3.height, s3.Oa, s3.ba))) {
                  if (t4.Aa = 0, n3 = s3.Oa, e(null != (a3 = t4)), null != n3) {
                    if (0 < (u4 = 0 > (u4 = n3.Md) ? 0 : 100 < u4 ? 255 : 255 * u4 / 100)) {
                      for (h4 = l4 = 0; 4 > h4; ++h4) 12 > (f4 = a3.pb[h4]).lc && (f4.ia = u4 * Ti[0 > f4.lc ? 0 : f4.lc] >> 3), l4 |= f4.ia;
                      l4 && (alert("todo:VP8InitRandom"), a3.ia = 1);
                    }
                    a3.Ga = n3.Id, 100 < a3.Ga ? a3.Ga = 100 : 0 > a3.Ga && (a3.Ga = 0);
                  }
                  Qt2(t4, i3) || (r2 = t4.a);
                }
              } else r2 = t4.a;
            }
            0 == r2 && null != s3.Oa && s3.Oa.fd && (r2 = Er(s3.ba));
          }
          s3 = r2;
        }
        o3 = 0 != s3 ? null : 11 > o3 ? c4.f.RGBA.eb : c4.f.kb.y;
      } else o3 = null;
      return o3;
    };
    var zi = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  };
  function u2(t3, e2) {
    for (var r2 = "", n3 = 0; n3 < 4; n3++) r2 += String.fromCharCode(t3[e2++]);
    return r2;
  }
  function h2(t3, e2) {
    return (t3[e2 + 0] << 0 | t3[e2 + 1] << 8 | t3[e2 + 2] << 16) >>> 0;
  }
  function l2(t3, e2) {
    return (t3[e2 + 0] << 0 | t3[e2 + 1] << 8 | t3[e2 + 2] << 16 | t3[e2 + 3] << 24) >>> 0;
  }
  new c2();
  var f2 = [0], d2 = [0], p2 = [], g2 = new c2(), m2 = t2, v2 = function(t3, e2) {
    var r2 = {}, n3 = 0, i3 = false, a3 = 0, o3 = 0;
    if (r2.frames = [], !/** @license
       * Copyright (c) 2017 Dominik Homberger
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      https://webpjs.appspot.com
      WebPRiffParser dominikhlbg@gmail.com
      */
    function(t4, e3, r3, n4) {
      for (var i4 = 0; i4 < n4; i4++) if (t4[e3 + i4] != r3.charCodeAt(i4)) return true;
      return false;
    }(t3, e2, "RIFF", 4)) {
      var s3, c3;
      l2(t3, e2 += 4);
      for (e2 += 8; e2 < t3.length; ) {
        var f3 = u2(t3, e2), d3 = l2(t3, e2 += 4);
        e2 += 4;
        var p3 = d3 + (1 & d3);
        switch (f3) {
          case "VP8 ":
          case "VP8L":
            void 0 === r2.frames[n3] && (r2.frames[n3] = {});
            (v3 = r2.frames[n3]).src_off = i3 ? o3 : e2 - 8, v3.src_size = a3 + d3 + 8, n3++, i3 && (i3 = false, a3 = 0, o3 = 0);
            break;
          case "VP8X":
            (v3 = r2.header = {}).feature_flags = t3[e2];
            var g3 = e2 + 4;
            v3.canvas_width = 1 + h2(t3, g3);
            g3 += 3;
            v3.canvas_height = 1 + h2(t3, g3);
            g3 += 3;
            break;
          case "ALPH":
            i3 = true, a3 = p3 + 8, o3 = e2 - 8;
            break;
          case "ANIM":
            (v3 = r2.header).bgcolor = l2(t3, e2);
            g3 = e2 + 4;
            v3.loop_count = (s3 = t3)[(c3 = g3) + 0] << 0 | s3[c3 + 1] << 8;
            g3 += 2;
            break;
          case "ANMF":
            var m3, v3;
            (v3 = r2.frames[n3] = {}).offset_x = 2 * h2(t3, e2), e2 += 3, v3.offset_y = 2 * h2(t3, e2), e2 += 3, v3.width = 1 + h2(t3, e2), e2 += 3, v3.height = 1 + h2(t3, e2), e2 += 3, v3.duration = h2(t3, e2), e2 += 3, m3 = t3[e2++], v3.dispose = 1 & m3, v3.blend = m3 >> 1 & 1;
        }
        "ANMF" != f3 && (e2 += p3);
      }
      return r2;
    }
  }(m2, 0);
  v2.response = m2, v2.rgbaoutput = true, v2.dataurl = false;
  var b2 = v2.header ? v2.header : null, y2 = v2.frames ? v2.frames : null;
  if (b2) {
    b2.loop_counter = b2.loop_count, f2 = [b2.canvas_height], d2 = [b2.canvas_width];
    for (var w2 = 0; w2 < y2.length && 0 != y2[w2].blend; w2++) ;
  }
  var N2 = y2[0], L2 = g2.WebPDecodeRGBA(m2, N2.src_off, N2.src_size, d2, f2);
  N2.rgba = L2, N2.imgwidth = d2[0], N2.imgheight = f2[0];
  for (var A2 = 0; A2 < d2[0] * f2[0] * 4; A2++) p2[A2] = L2[A2];
  return this.width = d2, this.height = f2, this.data = p2, this;
}
!function(t2) {
  var r = function() {
    return "function" == typeof zlibSync;
  }, n2 = function(r2, n3, a3, h3) {
    var l3 = 4, f3 = s2;
    switch (h3) {
      case t2.image_compression.FAST:
        l3 = 1, f3 = o2;
        break;
      case t2.image_compression.MEDIUM:
        l3 = 6, f3 = c2;
        break;
      case t2.image_compression.SLOW:
        l3 = 9, f3 = u2;
    }
    r2 = i2(r2, n3, a3, f3);
    var d2 = zlibSync(r2, { level: l3 });
    return t2.__addimage__.arrayBufferToBinaryString(d2);
  }, i2 = function(t3, e, r2, n3) {
    for (var i3, a3, o3, s3 = t3.length / e, c3 = new Uint8Array(t3.length + s3), u3 = l2(), h3 = 0; h3 < s3; h3 += 1) {
      if (o3 = h3 * e, i3 = t3.subarray(o3, o3 + e), n3) c3.set(n3(i3, r2, a3), o3 + h3);
      else {
        for (var d2, p2 = u3.length, g2 = []; d2 < p2; d2 += 1) g2[d2] = u3[d2](i3, r2, a3);
        var m2 = f2(g2.concat());
        c3.set(g2[m2], o3 + h3);
      }
      a3 = i3;
    }
    return c3;
  }, a2 = function(t3) {
    var e = Array.apply([], t3);
    return e.unshift(0), e;
  }, o2 = function(t3, e) {
    var r2, n3 = [], i3 = t3.length;
    n3[0] = 1;
    for (var a3 = 0; a3 < i3; a3 += 1) r2 = t3[a3 - e] || 0, n3[a3 + 1] = t3[a3] - r2 + 256 & 255;
    return n3;
  }, s2 = function(t3, e, r2) {
    var n3, i3 = [], a3 = t3.length;
    i3[0] = 2;
    for (var o3 = 0; o3 < a3; o3 += 1) n3 = r2 && r2[o3] || 0, i3[o3 + 1] = t3[o3] - n3 + 256 & 255;
    return i3;
  }, c2 = function(t3, e, r2) {
    var n3, i3, a3 = [], o3 = t3.length;
    a3[0] = 3;
    for (var s3 = 0; s3 < o3; s3 += 1) n3 = t3[s3 - e] || 0, i3 = r2 && r2[s3] || 0, a3[s3 + 1] = t3[s3] + 256 - (n3 + i3 >>> 1) & 255;
    return a3;
  }, u2 = function(t3, e, r2) {
    var n3, i3, a3, o3, s3 = [], c3 = t3.length;
    s3[0] = 4;
    for (var u3 = 0; u3 < c3; u3 += 1) n3 = t3[u3 - e] || 0, i3 = r2 && r2[u3] || 0, a3 = r2 && r2[u3 - e] || 0, o3 = h2(n3, i3, a3), s3[u3 + 1] = t3[u3] - o3 + 256 & 255;
    return s3;
  }, h2 = function(t3, e, r2) {
    if (t3 === e && e === r2) return t3;
    var n3 = Math.abs(e - r2), i3 = Math.abs(t3 - r2), a3 = Math.abs(t3 + e - r2 - r2);
    return n3 <= i3 && n3 <= a3 ? t3 : i3 <= a3 ? e : r2;
  }, l2 = function() {
    return [a2, o2, s2, c2, u2];
  }, f2 = function(t3) {
    var e = t3.map(function(t4) {
      return t4.reduce(function(t5, e2) {
        return t5 + Math.abs(e2);
      }, 0);
    });
    return e.indexOf(Math.min.apply(null, e));
  };
  t2.processPNG = function(e, i3, a3, o3) {
    var s3, c3, u3, h3, l3, f3, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2 = this.decode.FLATE_DECODE, A2 = "";
    if (this.__addimage__.isArrayBuffer(e) && (e = new Uint8Array(e)), this.__addimage__.isArrayBufferView(e)) {
      if (e = (u3 = new Kt(e)).imgData, c3 = u3.bits, s3 = u3.colorSpace, l3 = u3.colors, -1 !== [4, 6].indexOf(u3.colorType)) {
        if (8 === u3.bits) {
          g2 = (p2 = 32 == u3.pixelBitlength ? new Uint32Array(u3.decodePixels().buffer) : 16 == u3.pixelBitlength ? new Uint16Array(u3.decodePixels().buffer) : new Uint8Array(u3.decodePixels().buffer)).length, v2 = new Uint8Array(g2 * u3.colors), m2 = new Uint8Array(g2);
          var x2, S2 = u3.pixelBitlength - u3.bits;
          for (w2 = 0, N2 = 0; w2 < g2; w2++) {
            for (y2 = p2[w2], x2 = 0; x2 < S2; ) v2[N2++] = y2 >>> x2 & 255, x2 += u3.bits;
            m2[w2] = y2 >>> x2 & 255;
          }
        }
        if (16 === u3.bits) {
          g2 = (p2 = new Uint32Array(u3.decodePixels().buffer)).length, v2 = new Uint8Array(g2 * (32 / u3.pixelBitlength) * u3.colors), m2 = new Uint8Array(g2 * (32 / u3.pixelBitlength)), b2 = u3.colors > 1, w2 = 0, N2 = 0;
          for (var _2 = 0; w2 < g2; ) y2 = p2[w2++], v2[N2++] = y2 >>> 0 & 255, b2 && (v2[N2++] = y2 >>> 16 & 255, y2 = p2[w2++], v2[N2++] = y2 >>> 0 & 255), m2[_2++] = y2 >>> 16 & 255;
          c3 = 8;
        }
        o3 !== t2.image_compression.NONE && r() ? (e = n2(v2, u3.width * u3.colors, u3.colors, o3), d2 = n2(m2, u3.width, 1, o3)) : (e = v2, d2 = m2, L2 = void 0);
      }
      if (3 === u3.colorType && (s3 = this.color_spaces.INDEXED, f3 = u3.palette, u3.transparency.indexed)) {
        var P2 = u3.transparency.indexed, k2 = 0;
        for (w2 = 0, g2 = P2.length; w2 < g2; ++w2) k2 += P2[w2];
        if ((k2 /= 255) === g2 - 1 && -1 !== P2.indexOf(0)) h3 = [P2.indexOf(0)];
        else if (k2 !== g2) {
          for (p2 = u3.decodePixels(), m2 = new Uint8Array(p2.length), w2 = 0, g2 = p2.length; w2 < g2; w2++) m2[w2] = P2[p2[w2]];
          d2 = n2(m2, u3.width, 1);
        }
      }
      var I2 = function(e2) {
        var r2;
        switch (e2) {
          case t2.image_compression.FAST:
            r2 = 11;
            break;
          case t2.image_compression.MEDIUM:
            r2 = 13;
            break;
          case t2.image_compression.SLOW:
            r2 = 14;
            break;
          default:
            r2 = 12;
        }
        return r2;
      }(o3);
      return L2 === this.decode.FLATE_DECODE && (A2 = "/Predictor " + I2 + " "), A2 += "/Colors " + l3 + " /BitsPerComponent " + c3 + " /Columns " + u3.width, (this.__addimage__.isArrayBuffer(e) || this.__addimage__.isArrayBufferView(e)) && (e = this.__addimage__.arrayBufferToBinaryString(e)), (d2 && this.__addimage__.isArrayBuffer(d2) || this.__addimage__.isArrayBufferView(d2)) && (d2 = this.__addimage__.arrayBufferToBinaryString(d2)), { alias: a3, data: e, index: i3, filter: L2, decodeParameters: A2, transparency: h3, palette: f3, sMask: d2, predictor: I2, width: u3.width, height: u3.height, bitsPerComponent: c3, colorSpace: s3 };
    }
  };
}(E.API), function(t2) {
  t2.processGIF89A = function(e, r, n2, i2) {
    var a2 = new Zt(e), o2 = a2.width, s2 = a2.height, c2 = [];
    a2.decodeAndBlitFrameRGBA(0, c2);
    var u2 = { data: c2, width: o2, height: s2 }, h2 = new Qt(100).encode(u2, 100);
    return t2.processJPEG.call(this, h2, r, n2, i2);
  }, t2.processGIF87A = t2.processGIF89A;
}(E.API), te.prototype.parseHeader = function() {
  if (this.fileSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.reserved = this.datav.getUint32(this.pos, true), this.pos += 4, this.offset = this.datav.getUint32(this.pos, true), this.pos += 4, this.headerSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.width = this.datav.getUint32(this.pos, true), this.pos += 4, this.height = this.datav.getInt32(this.pos, true), this.pos += 4, this.planes = this.datav.getUint16(this.pos, true), this.pos += 2, this.bitPP = this.datav.getUint16(this.pos, true), this.pos += 2, this.compress = this.datav.getUint32(this.pos, true), this.pos += 4, this.rawSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.hr = this.datav.getUint32(this.pos, true), this.pos += 4, this.vr = this.datav.getUint32(this.pos, true), this.pos += 4, this.colors = this.datav.getUint32(this.pos, true), this.pos += 4, this.importantColors = this.datav.getUint32(this.pos, true), this.pos += 4, 16 === this.bitPP && this.is_with_alpha && (this.bitPP = 15), this.bitPP < 15) {
    var t2 = 0 === this.colors ? 1 << this.bitPP : this.colors;
    this.palette = new Array(t2);
    for (var e = 0; e < t2; e++) {
      var r = this.datav.getUint8(this.pos++, true), n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true);
      this.palette[e] = { red: i2, green: n2, blue: r, quad: a2 };
    }
  }
  this.height < 0 && (this.height *= -1, this.bottom_up = false);
}, te.prototype.parseBGR = function() {
  this.pos = this.offset;
  try {
    var t2 = "bit" + this.bitPP, e = this.width * this.height * 4;
    this.data = new Uint8Array(e), this[t2]();
  } catch (t3) {
    a.log("bit decode error:" + t3);
  }
}, te.prototype.bit1 = function() {
  var t2, e = Math.ceil(this.width / 8), r = e % 4;
  for (t2 = this.height - 1; t2 >= 0; t2--) {
    for (var n2 = this.bottom_up ? t2 : this.height - 1 - t2, i2 = 0; i2 < e; i2++) for (var a2 = this.datav.getUint8(this.pos++, true), o2 = n2 * this.width * 4 + 8 * i2 * 4, s2 = 0; s2 < 8 && 8 * i2 + s2 < this.width; s2++) {
      var c2 = this.palette[a2 >> 7 - s2 & 1];
      this.data[o2 + 4 * s2] = c2.blue, this.data[o2 + 4 * s2 + 1] = c2.green, this.data[o2 + 4 * s2 + 2] = c2.red, this.data[o2 + 4 * s2 + 3] = 255;
    }
    0 !== r && (this.pos += 4 - r);
  }
}, te.prototype.bit4 = function() {
  for (var t2 = Math.ceil(this.width / 2), e = t2 % 4, r = this.height - 1; r >= 0; r--) {
    for (var n2 = this.bottom_up ? r : this.height - 1 - r, i2 = 0; i2 < t2; i2++) {
      var a2 = this.datav.getUint8(this.pos++, true), o2 = n2 * this.width * 4 + 2 * i2 * 4, s2 = a2 >> 4, c2 = 15 & a2, u2 = this.palette[s2];
      if (this.data[o2] = u2.blue, this.data[o2 + 1] = u2.green, this.data[o2 + 2] = u2.red, this.data[o2 + 3] = 255, 2 * i2 + 1 >= this.width) break;
      u2 = this.palette[c2], this.data[o2 + 4] = u2.blue, this.data[o2 + 4 + 1] = u2.green, this.data[o2 + 4 + 2] = u2.red, this.data[o2 + 4 + 3] = 255;
    }
    0 !== e && (this.pos += 4 - e);
  }
}, te.prototype.bit8 = function() {
  for (var t2 = this.width % 4, e = this.height - 1; e >= 0; e--) {
    for (var r = this.bottom_up ? e : this.height - 1 - e, n2 = 0; n2 < this.width; n2++) {
      var i2 = this.datav.getUint8(this.pos++, true), a2 = r * this.width * 4 + 4 * n2;
      if (i2 < this.palette.length) {
        var o2 = this.palette[i2];
        this.data[a2] = o2.red, this.data[a2 + 1] = o2.green, this.data[a2 + 2] = o2.blue, this.data[a2 + 3] = 255;
      } else this.data[a2] = 255, this.data[a2 + 1] = 255, this.data[a2 + 2] = 255, this.data[a2 + 3] = 255;
    }
    0 !== t2 && (this.pos += 4 - t2);
  }
}, te.prototype.bit15 = function() {
  for (var t2 = this.width % 3, e = parseInt("11111", 2), r = this.height - 1; r >= 0; r--) {
    for (var n2 = this.bottom_up ? r : this.height - 1 - r, i2 = 0; i2 < this.width; i2++) {
      var a2 = this.datav.getUint16(this.pos, true);
      this.pos += 2;
      var o2 = (a2 & e) / e * 255 | 0, s2 = (a2 >> 5 & e) / e * 255 | 0, c2 = (a2 >> 10 & e) / e * 255 | 0, u2 = a2 >> 15 ? 255 : 0, h2 = n2 * this.width * 4 + 4 * i2;
      this.data[h2] = c2, this.data[h2 + 1] = s2, this.data[h2 + 2] = o2, this.data[h2 + 3] = u2;
    }
    this.pos += t2;
  }
}, te.prototype.bit16 = function() {
  for (var t2 = this.width % 3, e = parseInt("11111", 2), r = parseInt("111111", 2), n2 = this.height - 1; n2 >= 0; n2--) {
    for (var i2 = this.bottom_up ? n2 : this.height - 1 - n2, a2 = 0; a2 < this.width; a2++) {
      var o2 = this.datav.getUint16(this.pos, true);
      this.pos += 2;
      var s2 = (o2 & e) / e * 255 | 0, c2 = (o2 >> 5 & r) / r * 255 | 0, u2 = (o2 >> 11) / e * 255 | 0, h2 = i2 * this.width * 4 + 4 * a2;
      this.data[h2] = u2, this.data[h2 + 1] = c2, this.data[h2 + 2] = s2, this.data[h2 + 3] = 255;
    }
    this.pos += t2;
  }
}, te.prototype.bit24 = function() {
  for (var t2 = this.height - 1; t2 >= 0; t2--) {
    for (var e = this.bottom_up ? t2 : this.height - 1 - t2, r = 0; r < this.width; r++) {
      var n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true), o2 = e * this.width * 4 + 4 * r;
      this.data[o2] = a2, this.data[o2 + 1] = i2, this.data[o2 + 2] = n2, this.data[o2 + 3] = 255;
    }
    this.pos += this.width % 4;
  }
}, te.prototype.bit32 = function() {
  for (var t2 = this.height - 1; t2 >= 0; t2--) for (var e = this.bottom_up ? t2 : this.height - 1 - t2, r = 0; r < this.width; r++) {
    var n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true), o2 = this.datav.getUint8(this.pos++, true), s2 = e * this.width * 4 + 4 * r;
    this.data[s2] = a2, this.data[s2 + 1] = i2, this.data[s2 + 2] = n2, this.data[s2 + 3] = o2;
  }
}, te.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  t2.processBMP = function(e, r, n2, i2) {
    var a2 = new te(e, false), o2 = a2.width, s2 = a2.height, c2 = { data: a2.getData(), width: o2, height: s2 }, u2 = new Qt(100).encode(c2, 100);
    return t2.processJPEG.call(this, u2, r, n2, i2);
  };
}(E.API), ee.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  t2.processWEBP = function(e, r, n2, i2) {
    var a2 = new ee(e), o2 = a2.width, s2 = a2.height, c2 = { data: a2.getData(), width: o2, height: s2 }, u2 = new Qt(100).encode(c2, 100);
    return t2.processJPEG.call(this, u2, r, n2, i2);
  };
}(E.API), E.API.processRGBA = function(t2, e, r) {
  for (var n2 = t2.data, i2 = n2.length, a2 = new Uint8Array(i2 / 4 * 3), o2 = new Uint8Array(i2 / 4), s2 = 0, c2 = 0, u2 = 0; u2 < i2; u2 += 4) {
    var h2 = n2[u2], l2 = n2[u2 + 1], f2 = n2[u2 + 2], d2 = n2[u2 + 3];
    a2[s2++] = h2, a2[s2++] = l2, a2[s2++] = f2, o2[c2++] = d2;
  }
  var p2 = this.__addimage__.arrayBufferToBinaryString(a2);
  return { alpha: this.__addimage__.arrayBufferToBinaryString(o2), data: p2, index: e, alias: r, colorSpace: "DeviceRGB", bitsPerComponent: 8, width: t2.width, height: t2.height };
}, E.API.setLanguage = function(t2) {
  return void 0 === this.internal.languageSettings && (this.internal.languageSettings = {}, this.internal.languageSettings.isSubscribed = false), void 0 !== { af: "Afrikaans", sq: "Albanian", ar: "Arabic (Standard)", "ar-DZ": "Arabic (Algeria)", "ar-BH": "Arabic (Bahrain)", "ar-EG": "Arabic (Egypt)", "ar-IQ": "Arabic (Iraq)", "ar-JO": "Arabic (Jordan)", "ar-KW": "Arabic (Kuwait)", "ar-LB": "Arabic (Lebanon)", "ar-LY": "Arabic (Libya)", "ar-MA": "Arabic (Morocco)", "ar-OM": "Arabic (Oman)", "ar-QA": "Arabic (Qatar)", "ar-SA": "Arabic (Saudi Arabia)", "ar-SY": "Arabic (Syria)", "ar-TN": "Arabic (Tunisia)", "ar-AE": "Arabic (U.A.E.)", "ar-YE": "Arabic (Yemen)", an: "Aragonese", hy: "Armenian", as: "Assamese", ast: "Asturian", az: "Azerbaijani", eu: "Basque", be: "Belarusian", bn: "Bengali", bs: "Bosnian", br: "Breton", bg: "Bulgarian", my: "Burmese", ca: "Catalan", ch: "Chamorro", ce: "Chechen", zh: "Chinese", "zh-HK": "Chinese (Hong Kong)", "zh-CN": "Chinese (PRC)", "zh-SG": "Chinese (Singapore)", "zh-TW": "Chinese (Taiwan)", cv: "Chuvash", co: "Corsican", cr: "Cree", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch (Standard)", "nl-BE": "Dutch (Belgian)", en: "English", "en-AU": "English (Australia)", "en-BZ": "English (Belize)", "en-CA": "English (Canada)", "en-IE": "English (Ireland)", "en-JM": "English (Jamaica)", "en-NZ": "English (New Zealand)", "en-PH": "English (Philippines)", "en-ZA": "English (South Africa)", "en-TT": "English (Trinidad & Tobago)", "en-GB": "English (United Kingdom)", "en-US": "English (United States)", "en-ZW": "English (Zimbabwe)", eo: "Esperanto", et: "Estonian", fo: "Faeroese", fj: "Fijian", fi: "Finnish", fr: "French (Standard)", "fr-BE": "French (Belgium)", "fr-CA": "French (Canada)", "fr-FR": "French (France)", "fr-LU": "French (Luxembourg)", "fr-MC": "French (Monaco)", "fr-CH": "French (Switzerland)", fy: "Frisian", fur: "Friulian", gd: "Gaelic (Scots)", "gd-IE": "Gaelic (Irish)", gl: "Galacian", ka: "Georgian", de: "German (Standard)", "de-AT": "German (Austria)", "de-DE": "German (Germany)", "de-LI": "German (Liechtenstein)", "de-LU": "German (Luxembourg)", "de-CH": "German (Switzerland)", el: "Greek", gu: "Gujurati", ht: "Haitian", he: "Hebrew", hi: "Hindi", hu: "Hungarian", is: "Icelandic", id: "Indonesian", iu: "Inuktitut", ga: "Irish", it: "Italian (Standard)", "it-CH": "Italian (Switzerland)", ja: "Japanese", kn: "Kannada", ks: "Kashmiri", kk: "Kazakh", km: "Khmer", ky: "Kirghiz", tlh: "Klingon", ko: "Korean", "ko-KP": "Korean (North Korea)", "ko-KR": "Korean (South Korea)", la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "North Macedonia", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori", mr: "Marathi", mo: "Moldavian", nv: "Navajo", ng: "Ndonga", ne: "Nepali", no: "Norwegian", nb: "Norwegian (Bokmal)", nn: "Norwegian (Nynorsk)", oc: "Occitan", or: "Oriya", om: "Oromo", fa: "Persian", "fa-IR": "Persian/Iran", pl: "Polish", pt: "Portuguese", "pt-BR": "Portuguese (Brazil)", pa: "Punjabi", "pa-IN": "Punjabi (India)", "pa-PK": "Punjabi (Pakistan)", qu: "Quechua", rm: "Rhaeto-Romanic", ro: "Romanian", "ro-MO": "Romanian (Moldavia)", ru: "Russian", "ru-MO": "Russian (Moldavia)", sz: "Sami (Lappish)", sg: "Sango", sa: "Sanskrit", sc: "Sardinian", sd: "Sindhi", si: "Singhalese", sr: "Serbian", sk: "Slovak", sl: "Slovenian", so: "Somani", sb: "Sorbian", es: "Spanish", "es-AR": "Spanish (Argentina)", "es-BO": "Spanish (Bolivia)", "es-CL": "Spanish (Chile)", "es-CO": "Spanish (Colombia)", "es-CR": "Spanish (Costa Rica)", "es-DO": "Spanish (Dominican Republic)", "es-EC": "Spanish (Ecuador)", "es-SV": "Spanish (El Salvador)", "es-GT": "Spanish (Guatemala)", "es-HN": "Spanish (Honduras)", "es-MX": "Spanish (Mexico)", "es-NI": "Spanish (Nicaragua)", "es-PA": "Spanish (Panama)", "es-PY": "Spanish (Paraguay)", "es-PE": "Spanish (Peru)", "es-PR": "Spanish (Puerto Rico)", "es-ES": "Spanish (Spain)", "es-UY": "Spanish (Uruguay)", "es-VE": "Spanish (Venezuela)", sx: "Sutu", sw: "Swahili", sv: "Swedish", "sv-FI": "Swedish (Finland)", "sv-SV": "Swedish (Sweden)", ta: "Tamil", tt: "Tatar", te: "Teluga", th: "Thai", tig: "Tigre", ts: "Tsonga", tn: "Tswana", tr: "Turkish", tk: "Turkmen", uk: "Ukrainian", hsb: "Upper Sorbian", ur: "Urdu", ve: "Venda", vi: "Vietnamese", vo: "Volapuk", wa: "Walloon", cy: "Welsh", xh: "Xhosa", ji: "Yiddish", zu: "Zulu" }[t2] && (this.internal.languageSettings.languageCode = t2, false === this.internal.languageSettings.isSubscribed && (this.internal.events.subscribe("putCatalog", function() {
    this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
  }), this.internal.languageSettings.isSubscribed = true)), this;
}, Vt = E.API, Gt = Vt.getCharWidthsArray = function(e, r) {
  var n2, i2, a2 = (r = r || {}).font || this.internal.getFont(), o2 = r.fontSize || this.internal.getFontSize(), s2 = r.charSpace || this.internal.getCharSpace(), c2 = r.widths ? r.widths : a2.metadata.Unicode.widths, u2 = c2.fof ? c2.fof : 1, h2 = r.kerning ? r.kerning : a2.metadata.Unicode.kerning, l2 = h2.fof ? h2.fof : 1, f2 = false !== r.doKerning, d2 = 0, p2 = e.length, g2 = 0, m2 = c2[0] || u2, v2 = [];
  for (n2 = 0; n2 < p2; n2++) i2 = e.charCodeAt(n2), "function" == typeof a2.metadata.widthOfString ? v2.push((a2.metadata.widthOfGlyph(a2.metadata.characterToGlyph(i2)) + s2 * (1e3 / o2) || 0) / 1e3) : (d2 = f2 && "object" === _typeof(h2[i2]) && !isNaN(parseInt(h2[i2][g2], 10)) ? h2[i2][g2] / l2 : 0, v2.push((c2[i2] || m2) / u2 + d2)), g2 = i2;
  return v2;
}, Yt = Vt.getStringUnitWidth = function(t2, e) {
  var r = (e = e || {}).fontSize || this.internal.getFontSize(), n2 = e.font || this.internal.getFont(), i2 = e.charSpace || this.internal.getCharSpace();
  return Vt.processArabic && (t2 = Vt.processArabic(t2)), "function" == typeof n2.metadata.widthOfString ? n2.metadata.widthOfString(t2, r, i2) / r : Gt.apply(this, arguments).reduce(function(t3, e2) {
    return t3 + e2;
  }, 0);
}, Jt = function(t2, e, r, n2) {
  for (var i2 = [], a2 = 0, o2 = t2.length, s2 = 0; a2 !== o2 && s2 + e[a2] < r; ) s2 += e[a2], a2++;
  i2.push(t2.slice(0, a2));
  var c2 = a2;
  for (s2 = 0; a2 !== o2; ) s2 + e[a2] > n2 && (i2.push(t2.slice(c2, a2)), s2 = 0, c2 = a2), s2 += e[a2], a2++;
  return c2 !== a2 && i2.push(t2.slice(c2, a2)), i2;
}, Xt = function(t2, e, r) {
  r || (r = {});
  var n2, i2, a2, o2, s2, c2, u2, h2 = [], l2 = [h2], f2 = r.textIndent || 0, d2 = 0, p2 = 0, g2 = t2.split(" "), m2 = Gt.apply(this, [" ", r])[0];
  if (c2 = -1 === r.lineIndent ? g2[0].length + 2 : r.lineIndent || 0) {
    var v2 = Array(c2).join(" "), b2 = [];
    g2.map(function(t3) {
      (t3 = t3.split(/\s*\n/)).length > 1 ? b2 = b2.concat(t3.map(function(t4, e2) {
        return (e2 && t4.length ? "\n" : "") + t4;
      })) : b2.push(t3[0]);
    }), g2 = b2, c2 = Yt.apply(this, [v2, r]);
  }
  for (a2 = 0, o2 = g2.length; a2 < o2; a2++) {
    var y2 = 0;
    if (n2 = g2[a2], c2 && "\n" == n2[0] && (n2 = n2.substr(1), y2 = 1), f2 + d2 + (p2 = (i2 = Gt.apply(this, [n2, r])).reduce(function(t3, e2) {
      return t3 + e2;
    }, 0)) > e || y2) {
      if (p2 > e) {
        for (s2 = Jt.apply(this, [n2, i2, e - (f2 + d2), e]), h2.push(s2.shift()), h2 = [s2.pop()]; s2.length; ) l2.push([s2.shift()]);
        p2 = i2.slice(n2.length - (h2[0] ? h2[0].length : 0)).reduce(function(t3, e2) {
          return t3 + e2;
        }, 0);
      } else h2 = [n2];
      l2.push(h2), f2 = p2 + c2, d2 = m2;
    } else h2.push(n2), f2 += d2 + p2, d2 = m2;
  }
  return u2 = c2 ? function(t3, e2) {
    return (e2 ? v2 : "") + t3.join(" ");
  } : function(t3) {
    return t3.join(" ");
  }, l2.map(u2);
}, Vt.splitTextToSize = function(t2, e, r) {
  var n2, i2 = (r = r || {}).fontSize || this.internal.getFontSize(), a2 = function(t3) {
    if (t3.widths && t3.kerning) return { widths: t3.widths, kerning: t3.kerning };
    var e2 = this.internal.getFont(t3.fontName, t3.fontStyle);
    return e2.metadata.Unicode ? { widths: e2.metadata.Unicode.widths || { 0: 1 }, kerning: e2.metadata.Unicode.kerning || {} } : { font: e2.metadata, fontSize: this.internal.getFontSize(), charSpace: this.internal.getCharSpace() };
  }.call(this, r);
  n2 = Array.isArray(t2) ? t2 : String(t2).split(/\r?\n/);
  var o2 = 1 * this.internal.scaleFactor * e / i2;
  a2.textIndent = r.textIndent ? 1 * r.textIndent * this.internal.scaleFactor / i2 : 0, a2.lineIndent = r.lineIndent;
  var s2, c2, u2 = [];
  for (s2 = 0, c2 = n2.length; s2 < c2; s2++) u2 = u2.concat(Xt.apply(this, [n2[s2], o2, a2]));
  return u2;
}, function(e) {
  e.__fontmetrics__ = e.__fontmetrics__ || {};
  for (var r = "klmnopqrstuvwxyz", n2 = {}, i2 = {}, a2 = 0; a2 < r.length; a2++) n2[r[a2]] = "0123456789abcdef"[a2], i2["0123456789abcdef"[a2]] = r[a2];
  var o2 = function(t2) {
    return "0x" + parseInt(t2, 10).toString(16);
  }, s2 = e.__fontmetrics__.compress = function(e2) {
    var r2, n3, a3, c3, u3 = ["{"];
    for (var h3 in e2) {
      if (r2 = e2[h3], isNaN(parseInt(h3, 10)) ? n3 = "'" + h3 + "'" : (h3 = parseInt(h3, 10), n3 = (n3 = o2(h3).slice(2)).slice(0, -1) + i2[n3.slice(-1)]), "number" == typeof r2) r2 < 0 ? (a3 = o2(r2).slice(3), c3 = "-") : (a3 = o2(r2).slice(2), c3 = ""), a3 = c3 + a3.slice(0, -1) + i2[a3.slice(-1)];
      else {
        if ("object" !== _typeof(r2)) throw new Error("Don't know what to do with value type " + _typeof(r2) + ".");
        a3 = s2(r2);
      }
      u3.push(n3 + a3);
    }
    return u3.push("}"), u3.join("");
  }, c2 = e.__fontmetrics__.uncompress = function(t2) {
    if ("string" != typeof t2) throw new Error("Invalid argument passed to uncompress.");
    for (var e2, r2, i3, a3, o3 = {}, s3 = 1, c3 = o3, u3 = [], h3 = "", l3 = "", f2 = t2.length - 1, d2 = 1; d2 < f2; d2 += 1) "'" == (a3 = t2[d2]) ? e2 ? (i3 = e2.join(""), e2 = void 0) : e2 = [] : e2 ? e2.push(a3) : "{" == a3 ? (u3.push([c3, i3]), c3 = {}, i3 = void 0) : "}" == a3 ? ((r2 = u3.pop())[0][r2[1]] = c3, i3 = void 0, c3 = r2[0]) : "-" == a3 ? s3 = -1 : void 0 === i3 ? n2.hasOwnProperty(a3) ? (h3 += n2[a3], i3 = parseInt(h3, 16) * s3, s3 = 1, h3 = "") : h3 += a3 : n2.hasOwnProperty(a3) ? (l3 += n2[a3], c3[i3] = parseInt(l3, 16) * s3, s3 = 1, i3 = void 0, l3 = "") : l3 += a3;
    return o3;
  }, u2 = { codePages: ["WinAnsiEncoding"], WinAnsiEncoding: c2("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}") }, h2 = { Unicode: { Courier: u2, "Courier-Bold": u2, "Courier-BoldOblique": u2, "Courier-Oblique": u2, Helvetica: u2, "Helvetica-Bold": u2, "Helvetica-BoldOblique": u2, "Helvetica-Oblique": u2, "Times-Roman": u2, "Times-Bold": u2, "Times-BoldItalic": u2, "Times-Italic": u2 } }, l2 = { Unicode: { "Courier-Oblique": c2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-BoldItalic": c2("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"), "Helvetica-Bold": c2("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), Courier: c2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-BoldOblique": c2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Bold": c2("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"), Symbol: c2("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"), Helvetica: c2("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"), "Helvetica-BoldOblique": c2("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), ZapfDingbats: c2("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-Bold": c2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Italic": c2("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"), "Times-Roman": c2("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"), "Helvetica-Oblique": c2("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}") } };
  e.events.push(["addFont", function(t2) {
    var e2 = t2.font, r2 = l2.Unicode[e2.postScriptName];
    r2 && (e2.metadata.Unicode = {}, e2.metadata.Unicode.widths = r2.widths, e2.metadata.Unicode.kerning = r2.kerning);
    var n3 = h2.Unicode[e2.postScriptName];
    n3 && (e2.metadata.Unicode.encoding = n3, e2.encoding = n3.codePages[0]);
  }]);
}(E.API), /**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = function(t3) {
    for (var e2 = t3.length, r = new Uint8Array(e2), n2 = 0; n2 < e2; n2++) r[n2] = t3.charCodeAt(n2);
    return r;
  };
  t2.API.events.push(["addFont", function(r) {
    var n2 = void 0, i2 = r.font, a2 = r.instance;
    if (!i2.isStandardFont) {
      if (void 0 === a2) throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + i2.postScriptName + "').");
      if ("string" != typeof (n2 = false === a2.existsFileInVFS(i2.postScriptName) ? a2.loadFile(i2.postScriptName) : a2.getFileFromVFS(i2.postScriptName))) throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + i2.postScriptName + "').");
      !function(r2, n3) {
        n3 = /^\x00\x01\x00\x00/.test(n3) ? e(n3) : e(u(n3)), r2.metadata = t2.API.TTFFont.open(n3), r2.metadata.Unicode = r2.metadata.Unicode || { encoding: {}, kerning: {}, widths: [] }, r2.metadata.glyIdsUsed = [0];
      }(i2, n2);
    }
  }]);
}(E), /** @license
 * Copyright (c) 2012 Willow Systems Corporation, https://github.com/willowsystems
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t2) {
  function e() {
    return (n.canvg ? Promise.resolve(n.canvg) : __vitePreload(() => import("../chunks/index.es-u2N9Z2hW.js"), true ? __vite__mapDeps([0,1,2]) : void 0)).catch(function(t3) {
      return Promise.reject(new Error("Could not load canvg: " + t3));
    }).then(function(t3) {
      return t3.default ? t3.default : t3;
    });
  }
  E.API.addSvgAsImage = function(t3, r, n2, i2, o2, s2, c2, u2) {
    if (isNaN(r) || isNaN(n2)) throw a.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments), new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");
    if (isNaN(i2) || isNaN(o2)) throw a.error("jsPDF.addSvgAsImage: Invalid measurements", arguments), new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");
    var h2 = document.createElement("canvas");
    h2.width = i2, h2.height = o2;
    var l2 = h2.getContext("2d");
    l2.fillStyle = "#fff", l2.fillRect(0, 0, h2.width, h2.height);
    var f2 = { ignoreMouse: true, ignoreAnimation: true, ignoreDimensions: true }, d2 = this;
    return e().then(function(e2) {
      return e2.fromString(l2, t3, f2);
    }, function() {
      return Promise.reject(new Error("Could not load canvg."));
    }).then(function(t4) {
      return t4.render(f2);
    }).then(function() {
      d2.addImage(h2.toDataURL("image/jpeg", 1), r, n2, i2, o2, c2, u2);
    });
  };
}(), E.API.putTotalPages = function(t2) {
  var e, r = 0;
  parseInt(this.internal.getFont().id.substr(1), 10) < 15 ? (e = new RegExp(t2, "g"), r = this.internal.getNumberOfPages()) : (e = new RegExp(this.pdfEscape16(t2, this.internal.getFont()), "g"), r = this.pdfEscape16(this.internal.getNumberOfPages() + "", this.internal.getFont()));
  for (var n2 = 1; n2 <= this.internal.getNumberOfPages(); n2++) for (var i2 = 0; i2 < this.internal.pages[n2].length; i2++) this.internal.pages[n2][i2] = this.internal.pages[n2][i2].replace(e, r);
  return this;
}, E.API.viewerPreferences = function(e, r) {
  var n2;
  e = e || {}, r = r || false;
  var i2, a2, o2, s2 = { HideToolbar: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.3 }, HideMenubar: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.3 }, HideWindowUI: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.3 }, FitWindow: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.3 }, CenterWindow: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.3 }, DisplayDocTitle: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.4 }, NonFullScreenPageMode: { defaultValue: "UseNone", value: "UseNone", type: "name", explicitSet: false, valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"], pdfVersion: 1.3 }, Direction: { defaultValue: "L2R", value: "L2R", type: "name", explicitSet: false, valueSet: ["L2R", "R2L"], pdfVersion: 1.3 }, ViewArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: false, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, ViewClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: false, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: false, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: false, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintScaling: { defaultValue: "AppDefault", value: "AppDefault", type: "name", explicitSet: false, valueSet: ["AppDefault", "None"], pdfVersion: 1.6 }, Duplex: { defaultValue: "", value: "none", type: "name", explicitSet: false, valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"], pdfVersion: 1.7 }, PickTrayByPDFSize: { defaultValue: false, value: false, type: "boolean", explicitSet: false, valueSet: [true, false], pdfVersion: 1.7 }, PrintPageRange: { defaultValue: "", value: "", type: "array", explicitSet: false, valueSet: null, pdfVersion: 1.7 }, NumCopies: { defaultValue: 1, value: 1, type: "integer", explicitSet: false, valueSet: null, pdfVersion: 1.7 } }, c2 = Object.keys(s2), u2 = [], h2 = 0, l2 = 0, f2 = 0;
  function d2(t2, e2) {
    var r2, n3 = false;
    for (r2 = 0; r2 < t2.length; r2 += 1) t2[r2] === e2 && (n3 = true);
    return n3;
  }
  if (void 0 === this.internal.viewerpreferences && (this.internal.viewerpreferences = {}, this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(s2)), this.internal.viewerpreferences.isSubscribed = false), n2 = this.internal.viewerpreferences.configuration, "reset" === e || true === r) {
    var p2 = c2.length;
    for (f2 = 0; f2 < p2; f2 += 1) n2[c2[f2]].value = n2[c2[f2]].defaultValue, n2[c2[f2]].explicitSet = false;
  }
  if ("object" === _typeof(e)) {
    for (a2 in e) if (o2 = e[a2], d2(c2, a2) && void 0 !== o2) {
      if ("boolean" === n2[a2].type && "boolean" == typeof o2) n2[a2].value = o2;
      else if ("name" === n2[a2].type && d2(n2[a2].valueSet, o2)) n2[a2].value = o2;
      else if ("integer" === n2[a2].type && Number.isInteger(o2)) n2[a2].value = o2;
      else if ("array" === n2[a2].type) {
        for (h2 = 0; h2 < o2.length; h2 += 1) if (i2 = true, 1 === o2[h2].length && "number" == typeof o2[h2][0]) u2.push(String(o2[h2] - 1));
        else if (o2[h2].length > 1) {
          for (l2 = 0; l2 < o2[h2].length; l2 += 1) "number" != typeof o2[h2][l2] && (i2 = false);
          true === i2 && u2.push([o2[h2][0] - 1, o2[h2][1] - 1].join(" "));
        }
        n2[a2].value = "[" + u2.join(" ") + "]";
      } else n2[a2].value = n2[a2].defaultValue;
      n2[a2].explicitSet = true;
    }
  }
  return false === this.internal.viewerpreferences.isSubscribed && (this.internal.events.subscribe("putCatalog", function() {
    var t2, e2 = [];
    for (t2 in n2) true === n2[t2].explicitSet && ("name" === n2[t2].type ? e2.push("/" + t2 + " /" + n2[t2].value) : e2.push("/" + t2 + " " + n2[t2].value));
    0 !== e2.length && this.internal.write("/ViewerPreferences\n<<\n" + e2.join("\n") + "\n>>");
  }), this.internal.viewerpreferences.isSubscribed = true), this.internal.viewerpreferences.configuration = n2, this;
}, /** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t2) {
  var e = function() {
    var t3 = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + this.internal.__metadata__.namespaceuri + '"><jspdf:metadata>', e2 = unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')), r2 = unescape(encodeURIComponent(t3)), n2 = unescape(encodeURIComponent(this.internal.__metadata__.metadata)), i2 = unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")), a2 = unescape(encodeURIComponent("</x:xmpmeta>")), o2 = r2.length + n2.length + i2.length + e2.length + a2.length;
    this.internal.__metadata__.metadata_object_number = this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length " + o2 + " >>"), this.internal.write("stream"), this.internal.write(e2 + r2 + n2 + i2 + a2), this.internal.write("endstream"), this.internal.write("endobj");
  }, r = function() {
    this.internal.__metadata__.metadata_object_number && this.internal.write("/Metadata " + this.internal.__metadata__.metadata_object_number + " 0 R");
  };
  t2.addMetadata = function(t3, n2) {
    return void 0 === this.internal.__metadata__ && (this.internal.__metadata__ = { metadata: t3, namespaceuri: n2 || "http://jspdf.default.namespaceuri/" }, this.internal.events.subscribe("putCatalog", r), this.internal.events.subscribe("postPutResources", e)), this;
  };
}(E.API), function(t2) {
  var e = t2.API, r = e.pdfEscape16 = function(t3, e2) {
    for (var r2, n3 = e2.metadata.Unicode.widths, i3 = ["", "0", "00", "000", "0000"], a2 = [""], o2 = 0, s2 = t3.length; o2 < s2; ++o2) {
      if (r2 = e2.metadata.characterToGlyph(t3.charCodeAt(o2)), e2.metadata.glyIdsUsed.push(r2), e2.metadata.toUnicode[r2] = t3.charCodeAt(o2), -1 == n3.indexOf(r2) && (n3.push(r2), n3.push([parseInt(e2.metadata.widthOfGlyph(r2), 10)])), "0" == r2) return a2.join("");
      r2 = r2.toString(16), a2.push(i3[4 - r2.length], r2);
    }
    return a2.join("");
  }, n2 = function(t3) {
    var e2, r2, n3, i3, a2, o2, s2;
    for (a2 = "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange", n3 = [], o2 = 0, s2 = (r2 = Object.keys(t3).sort(function(t4, e3) {
      return t4 - e3;
    })).length; o2 < s2; o2++) e2 = r2[o2], n3.length >= 100 && (a2 += "\n" + n3.length + " beginbfchar\n" + n3.join("\n") + "\nendbfchar", n3 = []), void 0 !== t3[e2] && null !== t3[e2] && "function" == typeof t3[e2].toString && (i3 = ("0000" + t3[e2].toString(16)).slice(-4), e2 = ("0000" + (+e2).toString(16)).slice(-4), n3.push("<" + e2 + "><" + i3 + ">"));
    return n3.length && (a2 += "\n" + n3.length + " beginbfchar\n" + n3.join("\n") + "\nendbfchar\n"), a2 += "endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
  };
  e.events.push(["putFont", function(e2) {
    !function(e3) {
      var r2 = e3.font, i3 = e3.out, a2 = e3.newObject, o2 = e3.putStream;
      if (r2.metadata instanceof t2.API.TTFFont && "Identity-H" === r2.encoding) {
        for (var s2 = r2.metadata.Unicode.widths, c2 = r2.metadata.subset.encode(r2.metadata.glyIdsUsed, 1), u2 = "", h2 = 0; h2 < c2.length; h2++) u2 += String.fromCharCode(c2[h2]);
        var l2 = a2();
        o2({ data: u2, addLength1: true, objectId: l2 }), i3("endobj");
        var f2 = a2();
        o2({ data: n2(r2.metadata.toUnicode), addLength1: true, objectId: f2 }), i3("endobj");
        var d2 = a2();
        i3("<<"), i3("/Type /FontDescriptor"), i3("/FontName /" + F(r2.fontName)), i3("/FontFile2 " + l2 + " 0 R"), i3("/FontBBox " + t2.API.PDFObject.convert(r2.metadata.bbox)), i3("/Flags " + r2.metadata.flags), i3("/StemV " + r2.metadata.stemV), i3("/ItalicAngle " + r2.metadata.italicAngle), i3("/Ascent " + r2.metadata.ascender), i3("/Descent " + r2.metadata.decender), i3("/CapHeight " + r2.metadata.capHeight), i3(">>"), i3("endobj");
        var p2 = a2();
        i3("<<"), i3("/Type /Font"), i3("/BaseFont /" + F(r2.fontName)), i3("/FontDescriptor " + d2 + " 0 R"), i3("/W " + t2.API.PDFObject.convert(s2)), i3("/CIDToGIDMap /Identity"), i3("/DW 1000"), i3("/Subtype /CIDFontType2"), i3("/CIDSystemInfo"), i3("<<"), i3("/Supplement 0"), i3("/Registry (Adobe)"), i3("/Ordering (" + r2.encoding + ")"), i3(">>"), i3(">>"), i3("endobj"), r2.objectNumber = a2(), i3("<<"), i3("/Type /Font"), i3("/Subtype /Type0"), i3("/ToUnicode " + f2 + " 0 R"), i3("/BaseFont /" + F(r2.fontName)), i3("/Encoding /" + r2.encoding), i3("/DescendantFonts [" + p2 + " 0 R]"), i3(">>"), i3("endobj"), r2.isAlreadyPutted = true;
      }
    }(e2);
  }]);
  e.events.push(["putFont", function(e2) {
    !function(e3) {
      var r2 = e3.font, i3 = e3.out, a2 = e3.newObject, o2 = e3.putStream;
      if (r2.metadata instanceof t2.API.TTFFont && "WinAnsiEncoding" === r2.encoding) {
        for (var s2 = r2.metadata.rawData, c2 = "", u2 = 0; u2 < s2.length; u2++) c2 += String.fromCharCode(s2[u2]);
        var h2 = a2();
        o2({ data: c2, addLength1: true, objectId: h2 }), i3("endobj");
        var l2 = a2();
        o2({ data: n2(r2.metadata.toUnicode), addLength1: true, objectId: l2 }), i3("endobj");
        var f2 = a2();
        i3("<<"), i3("/Descent " + r2.metadata.decender), i3("/CapHeight " + r2.metadata.capHeight), i3("/StemV " + r2.metadata.stemV), i3("/Type /FontDescriptor"), i3("/FontFile2 " + h2 + " 0 R"), i3("/Flags 96"), i3("/FontBBox " + t2.API.PDFObject.convert(r2.metadata.bbox)), i3("/FontName /" + F(r2.fontName)), i3("/ItalicAngle " + r2.metadata.italicAngle), i3("/Ascent " + r2.metadata.ascender), i3(">>"), i3("endobj"), r2.objectNumber = a2();
        for (var d2 = 0; d2 < r2.metadata.hmtx.widths.length; d2++) r2.metadata.hmtx.widths[d2] = parseInt(r2.metadata.hmtx.widths[d2] * (1e3 / r2.metadata.head.unitsPerEm));
        i3("<</Subtype/TrueType/Type/Font/ToUnicode " + l2 + " 0 R/BaseFont/" + F(r2.fontName) + "/FontDescriptor " + f2 + " 0 R/Encoding/" + r2.encoding + " /FirstChar 29 /LastChar 255 /Widths " + t2.API.PDFObject.convert(r2.metadata.hmtx.widths) + ">>"), i3("endobj"), r2.isAlreadyPutted = true;
      }
    }(e2);
  }]);
  var i2 = function(t3) {
    var e2, n3 = t3.text || "", i3 = t3.x, a2 = t3.y, o2 = t3.options || {}, s2 = t3.mutex || {}, c2 = s2.pdfEscape, u2 = s2.activeFontKey, h2 = s2.fonts, l2 = u2, f2 = "", d2 = 0, p2 = "", g2 = h2[l2].encoding;
    if ("Identity-H" !== h2[l2].encoding) return { text: n3, x: i3, y: a2, options: o2, mutex: s2 };
    for (p2 = n3, l2 = u2, Array.isArray(n3) && (p2 = n3[0]), d2 = 0; d2 < p2.length; d2 += 1) h2[l2].metadata.hasOwnProperty("cmap") && (e2 = h2[l2].metadata.cmap.unicode.codeMap[p2[d2].charCodeAt(0)]), e2 || p2[d2].charCodeAt(0) < 256 && h2[l2].metadata.hasOwnProperty("Unicode") ? f2 += p2[d2] : f2 += "";
    var m2 = "";
    return parseInt(l2.slice(1)) < 14 || "WinAnsiEncoding" === g2 ? m2 = c2(f2, l2).split("").map(function(t4) {
      return t4.charCodeAt(0).toString(16);
    }).join("") : "Identity-H" === g2 && (m2 = r(f2, h2[l2])), s2.isHex = true, { text: m2, x: i3, y: a2, options: o2, mutex: s2 };
  };
  e.events.push(["postProcessText", function(t3) {
    var e2 = t3.text || "", r2 = [], n3 = { text: e2, x: t3.x, y: t3.y, options: t3.options, mutex: t3.mutex };
    if (Array.isArray(e2)) {
      var a2 = 0;
      for (a2 = 0; a2 < e2.length; a2 += 1) Array.isArray(e2[a2]) && 3 === e2[a2].length ? r2.push([i2(Object.assign({}, n3, { text: e2[a2][0] })).text, e2[a2][1], e2[a2][2]]) : r2.push(i2(Object.assign({}, n3, { text: e2[a2] })).text);
      t3.text = r2;
    } else t3.text = i2(Object.assign({}, n3, { text: e2 })).text;
  }]);
}(E), /**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t2) {
  var e = function() {
    return void 0 === this.internal.vFS && (this.internal.vFS = {}), true;
  };
  t2.existsFileInVFS = function(t3) {
    return e.call(this), void 0 !== this.internal.vFS[t3];
  }, t2.addFileToVFS = function(t3, r) {
    return e.call(this), this.internal.vFS[t3] = r, this;
  }, t2.getFileFromVFS = function(t3) {
    return e.call(this), void 0 !== this.internal.vFS[t3] ? this.internal.vFS[t3] : null;
  };
}(E.API), /**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function(t2) {
  t2.__bidiEngine__ = t2.prototype.__bidiEngine__ = function(t3) {
    var r2, n2, i2, a2, o2, s2, c2, u2 = e, h2 = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]], l2 = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]], f2 = { L: 0, R: 1, EN: 2, AN: 3, N: 4, B: 5, S: 6 }, d2 = { 0: 0, 5: 1, 6: 2, 7: 3, 32: 4, 251: 5, 254: 6, 255: 7 }, p2 = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "«", "»", "«", "‹", "›", "‹", "⁅", "⁆", "⁅", "⁽", "⁾", "⁽", "₍", "₎", "₍", "≤", "≥", "≤", "〈", "〉", "〈", "﹙", "﹚", "﹙", "﹛", "﹜", "﹛", "﹝", "﹞", "﹝", "﹤", "﹥", "﹤"], g2 = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/), m2 = false, v2 = 0;
    this.__bidiEngine__ = {};
    var b2 = function(t4) {
      var e2 = t4.charCodeAt(), r3 = e2 >> 8, n3 = d2[r3];
      return void 0 !== n3 ? u2[256 * n3 + (255 & e2)] : 252 === r3 || 253 === r3 ? "AL" : g2.test(r3) ? "L" : 8 === r3 ? "R" : "N";
    }, y2 = function(t4) {
      for (var e2, r3 = 0; r3 < t4.length; r3++) {
        if ("L" === (e2 = b2(t4.charAt(r3)))) return false;
        if ("R" === e2) return true;
      }
      return false;
    }, w2 = function(t4, e2, o3, s3) {
      var c3, u3, h3, l3, f3 = e2[s3];
      switch (f3) {
        case "L":
        case "R":
          m2 = false;
          break;
        case "N":
        case "AN":
          break;
        case "EN":
          m2 && (f3 = "AN");
          break;
        case "AL":
          m2 = true, f3 = "R";
          break;
        case "WS":
          f3 = "N";
          break;
        case "CS":
          s3 < 1 || s3 + 1 >= e2.length || "EN" !== (c3 = o3[s3 - 1]) && "AN" !== c3 || "EN" !== (u3 = e2[s3 + 1]) && "AN" !== u3 ? f3 = "N" : m2 && (u3 = "AN"), f3 = u3 === c3 ? u3 : "N";
          break;
        case "ES":
          f3 = "EN" === (c3 = s3 > 0 ? o3[s3 - 1] : "B") && s3 + 1 < e2.length && "EN" === e2[s3 + 1] ? "EN" : "N";
          break;
        case "ET":
          if (s3 > 0 && "EN" === o3[s3 - 1]) {
            f3 = "EN";
            break;
          }
          if (m2) {
            f3 = "N";
            break;
          }
          for (h3 = s3 + 1, l3 = e2.length; h3 < l3 && "ET" === e2[h3]; ) h3++;
          f3 = h3 < l3 && "EN" === e2[h3] ? "EN" : "N";
          break;
        case "NSM":
          if (i2 && !a2) {
            for (l3 = e2.length, h3 = s3 + 1; h3 < l3 && "NSM" === e2[h3]; ) h3++;
            if (h3 < l3) {
              var d3 = t4[s3], p3 = d3 >= 1425 && d3 <= 2303 || 64286 === d3;
              if (c3 = e2[h3], p3 && ("R" === c3 || "AL" === c3)) {
                f3 = "R";
                break;
              }
            }
          }
          f3 = s3 < 1 || "B" === (c3 = e2[s3 - 1]) ? "N" : o3[s3 - 1];
          break;
        case "B":
          m2 = false, r2 = true, f3 = v2;
          break;
        case "S":
          n2 = true, f3 = "N";
          break;
        case "LRE":
        case "RLE":
        case "LRO":
        case "RLO":
        case "PDF":
          m2 = false;
          break;
        case "BN":
          f3 = "N";
      }
      return f3;
    }, N2 = function(t4, e2, r3) {
      var n3 = t4.split("");
      return r3 && L2(n3, r3, { hiLevel: v2 }), n3.reverse(), e2 && e2.reverse(), n3.join("");
    }, L2 = function(t4, e2, i3) {
      var a3, o3, s3, c3, u3, d3 = -1, p3 = t4.length, g3 = 0, y3 = [], N3 = v2 ? l2 : h2, L3 = [];
      for (m2 = false, r2 = false, n2 = false, o3 = 0; o3 < p3; o3++) L3[o3] = b2(t4[o3]);
      for (s3 = 0; s3 < p3; s3++) {
        if (u3 = g3, y3[s3] = w2(t4, L3, y3, s3), a3 = 240 & (g3 = N3[u3][f2[y3[s3]]]), g3 &= 15, e2[s3] = c3 = N3[g3][5], a3 > 0) if (16 === a3) {
          for (o3 = d3; o3 < s3; o3++) e2[o3] = 1;
          d3 = -1;
        } else d3 = -1;
        if (N3[g3][6]) -1 === d3 && (d3 = s3);
        else if (d3 > -1) {
          for (o3 = d3; o3 < s3; o3++) e2[o3] = c3;
          d3 = -1;
        }
        "B" === L3[s3] && (e2[s3] = 0), i3.hiLevel |= c3;
      }
      n2 && function(t5, e3, r3) {
        for (var n3 = 0; n3 < r3; n3++) if ("S" === t5[n3]) {
          e3[n3] = v2;
          for (var i4 = n3 - 1; i4 >= 0 && "WS" === t5[i4]; i4--) e3[i4] = v2;
        }
      }(L3, e2, p3);
    }, A2 = function(t4, e2, n3, i3, a3) {
      if (!(a3.hiLevel < t4)) {
        if (1 === t4 && 1 === v2 && !r2) return e2.reverse(), void (n3 && n3.reverse());
        for (var o3, s3, c3, u3, h3 = e2.length, l3 = 0; l3 < h3; ) {
          if (i3[l3] >= t4) {
            for (c3 = l3 + 1; c3 < h3 && i3[c3] >= t4; ) c3++;
            for (u3 = l3, s3 = c3 - 1; u3 < s3; u3++, s3--) o3 = e2[u3], e2[u3] = e2[s3], e2[s3] = o3, n3 && (o3 = n3[u3], n3[u3] = n3[s3], n3[s3] = o3);
            l3 = c3;
          }
          l3++;
        }
      }
    }, x2 = function(t4, e2, r3) {
      var n3 = t4.split(""), i3 = { hiLevel: v2 };
      return r3 || (r3 = []), L2(n3, r3, i3), function(t5, e3, r4) {
        if (0 !== r4.hiLevel && c2) for (var n4, i4 = 0; i4 < t5.length; i4++) 1 === e3[i4] && (n4 = p2.indexOf(t5[i4])) >= 0 && (t5[i4] = p2[n4 + 1]);
      }(n3, r3, i3), A2(2, n3, e2, r3, i3), A2(1, n3, e2, r3, i3), n3.join("");
    };
    return this.__bidiEngine__.doBidiReorder = function(t4, e2, r3) {
      if (function(t5, e3) {
        if (e3) for (var r4 = 0; r4 < t5.length; r4++) e3[r4] = r4;
        void 0 === a2 && (a2 = y2(t5)), void 0 === s2 && (s2 = y2(t5));
      }(t4, e2), i2 || !o2 || s2) if (i2 && o2 && a2 ^ s2) v2 = a2 ? 1 : 0, t4 = N2(t4, e2, r3);
      else if (!i2 && o2 && s2) v2 = a2 ? 1 : 0, t4 = x2(t4, e2, r3), t4 = N2(t4, e2);
      else if (!i2 || a2 || o2 || s2) {
        if (i2 && !o2 && a2 ^ s2) t4 = N2(t4, e2), a2 ? (v2 = 0, t4 = x2(t4, e2, r3)) : (v2 = 1, t4 = x2(t4, e2, r3), t4 = N2(t4, e2));
        else if (i2 && a2 && !o2 && s2) v2 = 1, t4 = x2(t4, e2, r3), t4 = N2(t4, e2);
        else if (!i2 && !o2 && a2 ^ s2) {
          var n3 = c2;
          a2 ? (v2 = 1, t4 = x2(t4, e2, r3), v2 = 0, c2 = false, t4 = x2(t4, e2, r3), c2 = n3) : (v2 = 0, t4 = x2(t4, e2, r3), t4 = N2(t4, e2), v2 = 1, c2 = false, t4 = x2(t4, e2, r3), c2 = n3, t4 = N2(t4, e2));
        }
      } else v2 = 0, t4 = x2(t4, e2, r3);
      else v2 = a2 ? 1 : 0, t4 = x2(t4, e2, r3);
      return t4;
    }, this.__bidiEngine__.setOptions = function(t4) {
      t4 && (i2 = t4.isInputVisual, o2 = t4.isOutputVisual, a2 = t4.isInputRtl, s2 = t4.isOutputRtl, c2 = t4.isSymmetricSwapping);
    }, this.__bidiEngine__.setOptions(t3), this.__bidiEngine__;
  };
  var e = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"], r = new t2.__bidiEngine__({ isInputVisual: true });
  t2.API.events.push(["postProcessText", function(t3) {
    var e2 = t3.text, n2 = (t3.x, t3.y, t3.options || {}), i2 = (t3.mutex, n2.lang, []);
    if (n2.isInputVisual = "boolean" != typeof n2.isInputVisual || n2.isInputVisual, r.setOptions(n2), "[object Array]" === Object.prototype.toString.call(e2)) {
      var a2 = 0;
      for (i2 = [], a2 = 0; a2 < e2.length; a2 += 1) "[object Array]" === Object.prototype.toString.call(e2[a2]) ? i2.push([r.doBidiReorder(e2[a2][0]), e2[a2][1], e2[a2][2]]) : i2.push([r.doBidiReorder(e2[a2])]);
      t3.text = i2;
    } else t3.text = r.doBidiReorder(e2);
    r.setOptions({ isInputVisual: true });
  }]);
}(E), E.API.TTFFont = function() {
  function t2(t3) {
    var e;
    if (this.rawData = t3, e = this.contents = new ne(t3), this.contents.pos = 4, "ttcf" === e.readString(4)) throw new Error("TTCF not supported.");
    e.pos = 0, this.parse(), this.subset = new Le(this), this.registerTTF();
  }
  return t2.open = function(e) {
    return new t2(e);
  }, t2.prototype.parse = function() {
    return this.directory = new ie(this.contents), this.head = new se(this), this.name = new pe(this), this.cmap = new ue(this), this.toUnicode = {}, this.hhea = new he(this), this.maxp = new ge(this), this.hmtx = new me(this), this.post = new fe(this), this.os2 = new le(this), this.loca = new Ne(this), this.glyf = new be(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
  }, t2.prototype.registerTTF = function() {
    var t3, e, r, n2, i2;
    if (this.scaleFactor = 1e3 / this.head.unitsPerEm, this.bbox = function() {
      var e2, r2, n3, i3;
      for (i3 = [], e2 = 0, r2 = (n3 = this.bbox).length; e2 < r2; e2++) t3 = n3[e2], i3.push(Math.round(t3 * this.scaleFactor));
      return i3;
    }.call(this), this.stemV = 0, this.post.exists ? (r = 255 & (n2 = this.post.italic_angle), 0 != (32768 & (e = n2 >> 16)) && (e = -(1 + (65535 ^ e))), this.italicAngle = +(e + "." + r)) : this.italicAngle = 0, this.ascender = Math.round(this.ascender * this.scaleFactor), this.decender = Math.round(this.decender * this.scaleFactor), this.lineGap = Math.round(this.lineGap * this.scaleFactor), this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender, this.xHeight = this.os2.exists && this.os2.xHeight || 0, this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8, this.isSerif = 1 === (i2 = this.familyClass) || 2 === i2 || 3 === i2 || 4 === i2 || 5 === i2 || 7 === i2, this.isScript = 10 === this.familyClass, this.flags = 0, this.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), 0 !== this.italicAngle && (this.flags |= 64), this.flags |= 32, !this.cmap.unicode) throw new Error("No unicode cmap for font");
  }, t2.prototype.characterToGlyph = function(t3) {
    var e;
    return (null != (e = this.cmap.unicode) ? e.codeMap[t3] : void 0) || 0;
  }, t2.prototype.widthOfGlyph = function(t3) {
    var e;
    return e = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(t3).advance * e;
  }, t2.prototype.widthOfString = function(t3, e, r) {
    var n2, i2, a2, o2;
    for (a2 = 0, i2 = 0, o2 = (t3 = "" + t3).length; 0 <= o2 ? i2 < o2 : i2 > o2; i2 = 0 <= o2 ? ++i2 : --i2) n2 = t3.charCodeAt(i2), a2 += this.widthOfGlyph(this.characterToGlyph(n2)) + r * (1e3 / e) || 0;
    return a2 * (e / 1e3);
  }, t2.prototype.lineHeight = function(t3, e) {
    var r;
    return null == e && (e = false), r = e ? this.lineGap : 0, (this.ascender + r - this.decender) / 1e3 * t3;
  }, t2;
}();
var re, ne = function() {
  function t2(t3) {
    this.data = null != t3 ? t3 : [], this.pos = 0, this.length = this.data.length;
  }
  return t2.prototype.readByte = function() {
    return this.data[this.pos++];
  }, t2.prototype.writeByte = function(t3) {
    return this.data[this.pos++] = t3;
  }, t2.prototype.readUInt32 = function() {
    return 16777216 * this.readByte() + (this.readByte() << 16) + (this.readByte() << 8) + this.readByte();
  }, t2.prototype.writeUInt32 = function(t3) {
    return this.writeByte(t3 >>> 24 & 255), this.writeByte(t3 >> 16 & 255), this.writeByte(t3 >> 8 & 255), this.writeByte(255 & t3);
  }, t2.prototype.readInt32 = function() {
    var t3;
    return (t3 = this.readUInt32()) >= 2147483648 ? t3 - 4294967296 : t3;
  }, t2.prototype.writeInt32 = function(t3) {
    return t3 < 0 && (t3 += 4294967296), this.writeUInt32(t3);
  }, t2.prototype.readUInt16 = function() {
    return this.readByte() << 8 | this.readByte();
  }, t2.prototype.writeUInt16 = function(t3) {
    return this.writeByte(t3 >> 8 & 255), this.writeByte(255 & t3);
  }, t2.prototype.readInt16 = function() {
    var t3;
    return (t3 = this.readUInt16()) >= 32768 ? t3 - 65536 : t3;
  }, t2.prototype.writeInt16 = function(t3) {
    return t3 < 0 && (t3 += 65536), this.writeUInt16(t3);
  }, t2.prototype.readString = function(t3) {
    var e, r;
    for (r = [], e = 0; 0 <= t3 ? e < t3 : e > t3; e = 0 <= t3 ? ++e : --e) r[e] = String.fromCharCode(this.readByte());
    return r.join("");
  }, t2.prototype.writeString = function(t3) {
    var e, r, n2;
    for (n2 = [], e = 0, r = t3.length; 0 <= r ? e < r : e > r; e = 0 <= r ? ++e : --e) n2.push(this.writeByte(t3.charCodeAt(e)));
    return n2;
  }, t2.prototype.readShort = function() {
    return this.readInt16();
  }, t2.prototype.writeShort = function(t3) {
    return this.writeInt16(t3);
  }, t2.prototype.readLongLong = function() {
    var t3, e, r, n2, i2, a2, o2, s2;
    return t3 = this.readByte(), e = this.readByte(), r = this.readByte(), n2 = this.readByte(), i2 = this.readByte(), a2 = this.readByte(), o2 = this.readByte(), s2 = this.readByte(), 128 & t3 ? -1 * (72057594037927940 * (255 ^ t3) + 281474976710656 * (255 ^ e) + 1099511627776 * (255 ^ r) + 4294967296 * (255 ^ n2) + 16777216 * (255 ^ i2) + 65536 * (255 ^ a2) + 256 * (255 ^ o2) + (255 ^ s2) + 1) : 72057594037927940 * t3 + 281474976710656 * e + 1099511627776 * r + 4294967296 * n2 + 16777216 * i2 + 65536 * a2 + 256 * o2 + s2;
  }, t2.prototype.writeLongLong = function(t3) {
    var e, r;
    return e = Math.floor(t3 / 4294967296), r = 4294967295 & t3, this.writeByte(e >> 24 & 255), this.writeByte(e >> 16 & 255), this.writeByte(e >> 8 & 255), this.writeByte(255 & e), this.writeByte(r >> 24 & 255), this.writeByte(r >> 16 & 255), this.writeByte(r >> 8 & 255), this.writeByte(255 & r);
  }, t2.prototype.readInt = function() {
    return this.readInt32();
  }, t2.prototype.writeInt = function(t3) {
    return this.writeInt32(t3);
  }, t2.prototype.read = function(t3) {
    var e, r;
    for (e = [], r = 0; 0 <= t3 ? r < t3 : r > t3; r = 0 <= t3 ? ++r : --r) e.push(this.readByte());
    return e;
  }, t2.prototype.write = function(t3) {
    var e, r, n2, i2;
    for (i2 = [], r = 0, n2 = t3.length; r < n2; r++) e = t3[r], i2.push(this.writeByte(e));
    return i2;
  }, t2;
}(), ie = function() {
  var t2;
  function e(t3) {
    var e2, r, n2;
    for (this.scalarType = t3.readInt(), this.tableCount = t3.readShort(), this.searchRange = t3.readShort(), this.entrySelector = t3.readShort(), this.rangeShift = t3.readShort(), this.tables = {}, r = 0, n2 = this.tableCount; 0 <= n2 ? r < n2 : r > n2; r = 0 <= n2 ? ++r : --r) e2 = { tag: t3.readString(4), checksum: t3.readInt(), offset: t3.readInt(), length: t3.readInt() }, this.tables[e2.tag] = e2;
  }
  return e.prototype.encode = function(e2) {
    var r, n2, i2, a2, o2, s2, c2, u2, h2, l2, f2, d2, p2;
    for (p2 in f2 = Object.keys(e2).length, s2 = Math.log(2), h2 = 16 * Math.floor(Math.log(f2) / s2), a2 = Math.floor(h2 / s2), u2 = 16 * f2 - h2, (n2 = new ne()).writeInt(this.scalarType), n2.writeShort(f2), n2.writeShort(h2), n2.writeShort(a2), n2.writeShort(u2), i2 = 16 * f2, c2 = n2.pos + i2, o2 = null, d2 = [], e2) for (l2 = e2[p2], n2.writeString(p2), n2.writeInt(t2(l2)), n2.writeInt(c2), n2.writeInt(l2.length), d2 = d2.concat(l2), "head" === p2 && (o2 = c2), c2 += l2.length; c2 % 4; ) d2.push(0), c2++;
    return n2.write(d2), r = 2981146554 - t2(n2.data), n2.pos = o2 + 8, n2.writeUInt32(r), n2.data;
  }, t2 = function(t3) {
    var e2, r, n2, i2;
    for (t3 = ve.call(t3); t3.length % 4; ) t3.push(0);
    for (n2 = new ne(t3), r = 0, e2 = 0, i2 = t3.length; e2 < i2; e2 = e2 += 4) r += n2.readUInt32();
    return 4294967295 & r;
  }, e;
}(), ae = {}.hasOwnProperty, oe = function(t2, e) {
  for (var r in e) ae.call(e, r) && (t2[r] = e[r]);
  function n2() {
    this.constructor = t2;
  }
  return n2.prototype = e.prototype, t2.prototype = new n2(), t2.__super__ = e.prototype, t2;
};
re = function() {
  function t2(t3) {
    var e;
    this.file = t3, e = this.file.directory.tables[this.tag], this.exists = !!e, e && (this.offset = e.offset, this.length = e.length, this.parse(this.file.contents));
  }
  return t2.prototype.parse = function() {
  }, t2.prototype.encode = function() {
  }, t2.prototype.raw = function() {
    return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null;
  }, t2;
}();
var se = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "head", e.prototype.parse = function(t3) {
    return t3.pos = this.offset, this.version = t3.readInt(), this.revision = t3.readInt(), this.checkSumAdjustment = t3.readInt(), this.magicNumber = t3.readInt(), this.flags = t3.readShort(), this.unitsPerEm = t3.readShort(), this.created = t3.readLongLong(), this.modified = t3.readLongLong(), this.xMin = t3.readShort(), this.yMin = t3.readShort(), this.xMax = t3.readShort(), this.yMax = t3.readShort(), this.macStyle = t3.readShort(), this.lowestRecPPEM = t3.readShort(), this.fontDirectionHint = t3.readShort(), this.indexToLocFormat = t3.readShort(), this.glyphDataFormat = t3.readShort();
  }, e.prototype.encode = function(t3) {
    var e2;
    return (e2 = new ne()).writeInt(this.version), e2.writeInt(this.revision), e2.writeInt(this.checkSumAdjustment), e2.writeInt(this.magicNumber), e2.writeShort(this.flags), e2.writeShort(this.unitsPerEm), e2.writeLongLong(this.created), e2.writeLongLong(this.modified), e2.writeShort(this.xMin), e2.writeShort(this.yMin), e2.writeShort(this.xMax), e2.writeShort(this.yMax), e2.writeShort(this.macStyle), e2.writeShort(this.lowestRecPPEM), e2.writeShort(this.fontDirectionHint), e2.writeShort(t3), e2.writeShort(this.glyphDataFormat), e2.data;
  }, e;
}(), ce = function() {
  function t2(t3, e) {
    var r, n2, i2, a2, o2, s2, c2, u2, h2, l2, f2, d2, p2, g2, m2, v2, b2;
    switch (this.platformID = t3.readUInt16(), this.encodingID = t3.readShort(), this.offset = e + t3.readInt(), h2 = t3.pos, t3.pos = this.offset, this.format = t3.readUInt16(), this.length = t3.readUInt16(), this.language = t3.readUInt16(), this.isUnicode = 3 === this.platformID && 1 === this.encodingID && 4 === this.format || 0 === this.platformID && 4 === this.format, this.codeMap = {}, this.format) {
      case 0:
        for (s2 = 0; s2 < 256; ++s2) this.codeMap[s2] = t3.readByte();
        break;
      case 4:
        for (f2 = t3.readUInt16(), l2 = f2 / 2, t3.pos += 6, i2 = function() {
          var e2, r2;
          for (r2 = [], s2 = e2 = 0; 0 <= l2 ? e2 < l2 : e2 > l2; s2 = 0 <= l2 ? ++e2 : --e2) r2.push(t3.readUInt16());
          return r2;
        }(), t3.pos += 2, p2 = function() {
          var e2, r2;
          for (r2 = [], s2 = e2 = 0; 0 <= l2 ? e2 < l2 : e2 > l2; s2 = 0 <= l2 ? ++e2 : --e2) r2.push(t3.readUInt16());
          return r2;
        }(), c2 = function() {
          var e2, r2;
          for (r2 = [], s2 = e2 = 0; 0 <= l2 ? e2 < l2 : e2 > l2; s2 = 0 <= l2 ? ++e2 : --e2) r2.push(t3.readUInt16());
          return r2;
        }(), u2 = function() {
          var e2, r2;
          for (r2 = [], s2 = e2 = 0; 0 <= l2 ? e2 < l2 : e2 > l2; s2 = 0 <= l2 ? ++e2 : --e2) r2.push(t3.readUInt16());
          return r2;
        }(), n2 = (this.length - t3.pos + this.offset) / 2, o2 = function() {
          var e2, r2;
          for (r2 = [], s2 = e2 = 0; 0 <= n2 ? e2 < n2 : e2 > n2; s2 = 0 <= n2 ? ++e2 : --e2) r2.push(t3.readUInt16());
          return r2;
        }(), s2 = m2 = 0, b2 = i2.length; m2 < b2; s2 = ++m2) for (g2 = i2[s2], r = v2 = d2 = p2[s2]; d2 <= g2 ? v2 <= g2 : v2 >= g2; r = d2 <= g2 ? ++v2 : --v2) 0 === u2[s2] ? a2 = r + c2[s2] : 0 !== (a2 = o2[u2[s2] / 2 + (r - d2) - (l2 - s2)] || 0) && (a2 += c2[s2]), this.codeMap[r] = 65535 & a2;
    }
    t3.pos = h2;
  }
  return t2.encode = function(t3, e) {
    var r, n2, i2, a2, o2, s2, c2, u2, h2, l2, f2, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2, A2, x2, S2, _2, P2, k2, I2, F2, C2, j2, O2, B2, M2, E2, q2, D2, R2, T2, U2, z2, H2, W2, V2, G2, Y2;
    switch (I2 = new ne(), a2 = Object.keys(t3).sort(function(t4, e2) {
      return t4 - e2;
    }), e) {
      case "macroman":
        for (p2 = 0, g2 = function() {
          var t4 = [];
          for (d2 = 0; d2 < 256; ++d2) t4.push(0);
          return t4;
        }(), v2 = { 0: 0 }, i2 = {}, F2 = 0, B2 = a2.length; F2 < B2; F2++) null == v2[W2 = t3[n2 = a2[F2]]] && (v2[W2] = ++p2), i2[n2] = { old: t3[n2], new: v2[t3[n2]] }, g2[n2] = v2[t3[n2]];
        return I2.writeUInt16(1), I2.writeUInt16(0), I2.writeUInt32(12), I2.writeUInt16(0), I2.writeUInt16(262), I2.writeUInt16(0), I2.write(g2), { charMap: i2, subtable: I2.data, maxGlyphID: p2 + 1 };
      case "unicode":
        for (P2 = [], h2 = [], b2 = 0, v2 = {}, r = {}, m2 = c2 = null, C2 = 0, M2 = a2.length; C2 < M2; C2++) null == v2[w2 = t3[n2 = a2[C2]]] && (v2[w2] = ++b2), r[n2] = { old: w2, new: v2[w2] }, o2 = v2[w2] - n2, null != m2 && o2 === c2 || (m2 && h2.push(m2), P2.push(n2), c2 = o2), m2 = n2;
        for (m2 && h2.push(m2), h2.push(65535), P2.push(65535), S2 = 2 * (x2 = P2.length), A2 = 2 * Math.pow(Math.log(x2) / Math.LN2, 2), l2 = Math.log(A2 / 2) / Math.LN2, L2 = 2 * x2 - A2, s2 = [], N2 = [], f2 = [], d2 = j2 = 0, E2 = P2.length; j2 < E2; d2 = ++j2) {
          if (_2 = P2[d2], u2 = h2[d2], 65535 === _2) {
            s2.push(0), N2.push(0);
            break;
          }
          if (_2 - (k2 = r[_2].new) >= 32768) for (s2.push(0), N2.push(2 * (f2.length + x2 - d2)), n2 = O2 = _2; _2 <= u2 ? O2 <= u2 : O2 >= u2; n2 = _2 <= u2 ? ++O2 : --O2) f2.push(r[n2].new);
          else s2.push(k2 - _2), N2.push(0);
        }
        for (I2.writeUInt16(3), I2.writeUInt16(1), I2.writeUInt32(12), I2.writeUInt16(4), I2.writeUInt16(16 + 8 * x2 + 2 * f2.length), I2.writeUInt16(0), I2.writeUInt16(S2), I2.writeUInt16(A2), I2.writeUInt16(l2), I2.writeUInt16(L2), z2 = 0, q2 = h2.length; z2 < q2; z2++) n2 = h2[z2], I2.writeUInt16(n2);
        for (I2.writeUInt16(0), H2 = 0, D2 = P2.length; H2 < D2; H2++) n2 = P2[H2], I2.writeUInt16(n2);
        for (V2 = 0, R2 = s2.length; V2 < R2; V2++) o2 = s2[V2], I2.writeUInt16(o2);
        for (G2 = 0, T2 = N2.length; G2 < T2; G2++) y2 = N2[G2], I2.writeUInt16(y2);
        for (Y2 = 0, U2 = f2.length; Y2 < U2; Y2++) p2 = f2[Y2], I2.writeUInt16(p2);
        return { charMap: r, subtable: I2.data, maxGlyphID: b2 + 1 };
    }
  }, t2;
}(), ue = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "cmap", e.prototype.parse = function(t3) {
    var e2, r, n2;
    for (t3.pos = this.offset, this.version = t3.readUInt16(), n2 = t3.readUInt16(), this.tables = [], this.unicode = null, r = 0; 0 <= n2 ? r < n2 : r > n2; r = 0 <= n2 ? ++r : --r) e2 = new ce(t3, this.offset), this.tables.push(e2), e2.isUnicode && null == this.unicode && (this.unicode = e2);
    return true;
  }, e.encode = function(t3, e2) {
    var r, n2;
    return null == e2 && (e2 = "macroman"), r = ce.encode(t3, e2), (n2 = new ne()).writeUInt16(0), n2.writeUInt16(1), r.table = n2.data.concat(r.subtable), r;
  }, e;
}(), he = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "hhea", e.prototype.parse = function(t3) {
    return t3.pos = this.offset, this.version = t3.readInt(), this.ascender = t3.readShort(), this.decender = t3.readShort(), this.lineGap = t3.readShort(), this.advanceWidthMax = t3.readShort(), this.minLeftSideBearing = t3.readShort(), this.minRightSideBearing = t3.readShort(), this.xMaxExtent = t3.readShort(), this.caretSlopeRise = t3.readShort(), this.caretSlopeRun = t3.readShort(), this.caretOffset = t3.readShort(), t3.pos += 8, this.metricDataFormat = t3.readShort(), this.numberOfMetrics = t3.readUInt16();
  }, e;
}(), le = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "OS/2", e.prototype.parse = function(t3) {
    if (t3.pos = this.offset, this.version = t3.readUInt16(), this.averageCharWidth = t3.readShort(), this.weightClass = t3.readUInt16(), this.widthClass = t3.readUInt16(), this.type = t3.readShort(), this.ySubscriptXSize = t3.readShort(), this.ySubscriptYSize = t3.readShort(), this.ySubscriptXOffset = t3.readShort(), this.ySubscriptYOffset = t3.readShort(), this.ySuperscriptXSize = t3.readShort(), this.ySuperscriptYSize = t3.readShort(), this.ySuperscriptXOffset = t3.readShort(), this.ySuperscriptYOffset = t3.readShort(), this.yStrikeoutSize = t3.readShort(), this.yStrikeoutPosition = t3.readShort(), this.familyClass = t3.readShort(), this.panose = function() {
      var e2, r;
      for (r = [], e2 = 0; e2 < 10; ++e2) r.push(t3.readByte());
      return r;
    }(), this.charRange = function() {
      var e2, r;
      for (r = [], e2 = 0; e2 < 4; ++e2) r.push(t3.readInt());
      return r;
    }(), this.vendorID = t3.readString(4), this.selection = t3.readShort(), this.firstCharIndex = t3.readShort(), this.lastCharIndex = t3.readShort(), this.version > 0 && (this.ascent = t3.readShort(), this.descent = t3.readShort(), this.lineGap = t3.readShort(), this.winAscent = t3.readShort(), this.winDescent = t3.readShort(), this.codePageRange = function() {
      var e2, r;
      for (r = [], e2 = 0; e2 < 2; e2 = ++e2) r.push(t3.readInt());
      return r;
    }(), this.version > 1)) return this.xHeight = t3.readShort(), this.capHeight = t3.readShort(), this.defaultChar = t3.readShort(), this.breakChar = t3.readShort(), this.maxContext = t3.readShort();
  }, e;
}(), fe = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "post", e.prototype.parse = function(t3) {
    var e2, r, n2;
    switch (t3.pos = this.offset, this.format = t3.readInt(), this.italicAngle = t3.readInt(), this.underlinePosition = t3.readShort(), this.underlineThickness = t3.readShort(), this.isFixedPitch = t3.readInt(), this.minMemType42 = t3.readInt(), this.maxMemType42 = t3.readInt(), this.minMemType1 = t3.readInt(), this.maxMemType1 = t3.readInt(), this.format) {
      case 65536:
        break;
      case 131072:
        var i2;
        for (r = t3.readUInt16(), this.glyphNameIndex = [], i2 = 0; 0 <= r ? i2 < r : i2 > r; i2 = 0 <= r ? ++i2 : --i2) this.glyphNameIndex.push(t3.readUInt16());
        for (this.names = [], n2 = []; t3.pos < this.offset + this.length; ) e2 = t3.readByte(), n2.push(this.names.push(t3.readString(e2)));
        return n2;
      case 151552:
        return r = t3.readUInt16(), this.offsets = t3.read(r);
      case 196608:
        break;
      case 262144:
        return this.map = function() {
          var e3, r2, n3;
          for (n3 = [], i2 = e3 = 0, r2 = this.file.maxp.numGlyphs; 0 <= r2 ? e3 < r2 : e3 > r2; i2 = 0 <= r2 ? ++e3 : --e3) n3.push(t3.readUInt32());
          return n3;
        }.call(this);
    }
  }, e;
}(), de = function(t2, e) {
  this.raw = t2, this.length = t2.length, this.platformID = e.platformID, this.encodingID = e.encodingID, this.languageID = e.languageID;
}, pe = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "name", e.prototype.parse = function(t3) {
    var e2, r, n2, i2, a2, o2, s2, c2, u2, h2, l2;
    for (t3.pos = this.offset, t3.readShort(), e2 = t3.readShort(), o2 = t3.readShort(), r = [], i2 = 0; 0 <= e2 ? i2 < e2 : i2 > e2; i2 = 0 <= e2 ? ++i2 : --i2) r.push({ platformID: t3.readShort(), encodingID: t3.readShort(), languageID: t3.readShort(), nameID: t3.readShort(), length: t3.readShort(), offset: this.offset + o2 + t3.readShort() });
    for (s2 = {}, i2 = u2 = 0, h2 = r.length; u2 < h2; i2 = ++u2) n2 = r[i2], t3.pos = n2.offset, c2 = t3.readString(n2.length), a2 = new de(c2, n2), null == s2[l2 = n2.nameID] && (s2[l2] = []), s2[n2.nameID].push(a2);
    this.strings = s2, this.copyright = s2[0], this.fontFamily = s2[1], this.fontSubfamily = s2[2], this.uniqueSubfamily = s2[3], this.fontName = s2[4], this.version = s2[5];
    try {
      this.postscriptName = s2[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    } catch (t4) {
      this.postscriptName = s2[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    }
    return this.trademark = s2[7], this.manufacturer = s2[8], this.designer = s2[9], this.description = s2[10], this.vendorUrl = s2[11], this.designerUrl = s2[12], this.license = s2[13], this.licenseUrl = s2[14], this.preferredFamily = s2[15], this.preferredSubfamily = s2[17], this.compatibleFull = s2[18], this.sampleText = s2[19];
  }, e;
}(), ge = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "maxp", e.prototype.parse = function(t3) {
    return t3.pos = this.offset, this.version = t3.readInt(), this.numGlyphs = t3.readUInt16(), this.maxPoints = t3.readUInt16(), this.maxContours = t3.readUInt16(), this.maxCompositePoints = t3.readUInt16(), this.maxComponentContours = t3.readUInt16(), this.maxZones = t3.readUInt16(), this.maxTwilightPoints = t3.readUInt16(), this.maxStorage = t3.readUInt16(), this.maxFunctionDefs = t3.readUInt16(), this.maxInstructionDefs = t3.readUInt16(), this.maxStackElements = t3.readUInt16(), this.maxSizeOfInstructions = t3.readUInt16(), this.maxComponentElements = t3.readUInt16(), this.maxComponentDepth = t3.readUInt16();
  }, e;
}(), me = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "hmtx", e.prototype.parse = function(t3) {
    var e2, r, n2, i2, a2, o2, s2;
    for (t3.pos = this.offset, this.metrics = [], e2 = 0, o2 = this.file.hhea.numberOfMetrics; 0 <= o2 ? e2 < o2 : e2 > o2; e2 = 0 <= o2 ? ++e2 : --e2) this.metrics.push({ advance: t3.readUInt16(), lsb: t3.readInt16() });
    for (n2 = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function() {
      var r2, i3;
      for (i3 = [], e2 = r2 = 0; 0 <= n2 ? r2 < n2 : r2 > n2; e2 = 0 <= n2 ? ++r2 : --r2) i3.push(t3.readInt16());
      return i3;
    }(), this.widths = function() {
      var t4, e3, r2, n3;
      for (n3 = [], t4 = 0, e3 = (r2 = this.metrics).length; t4 < e3; t4++) i2 = r2[t4], n3.push(i2.advance);
      return n3;
    }.call(this), r = this.widths[this.widths.length - 1], s2 = [], e2 = a2 = 0; 0 <= n2 ? a2 < n2 : a2 > n2; e2 = 0 <= n2 ? ++a2 : --a2) s2.push(this.widths.push(r));
    return s2;
  }, e.prototype.forGlyph = function(t3) {
    return t3 in this.metrics ? this.metrics[t3] : { advance: this.metrics[this.metrics.length - 1].advance, lsb: this.leftSideBearings[t3 - this.metrics.length] };
  }, e;
}(), ve = [].slice, be = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "glyf", e.prototype.parse = function() {
    return this.cache = {};
  }, e.prototype.glyphFor = function(t3) {
    var e2, r, n2, i2, a2, o2, s2, c2, u2, h2;
    return t3 in this.cache ? this.cache[t3] : (i2 = this.file.loca, e2 = this.file.contents, r = i2.indexOf(t3), 0 === (n2 = i2.lengthOf(t3)) ? this.cache[t3] = null : (e2.pos = this.offset + r, a2 = (o2 = new ne(e2.read(n2))).readShort(), c2 = o2.readShort(), h2 = o2.readShort(), s2 = o2.readShort(), u2 = o2.readShort(), this.cache[t3] = -1 === a2 ? new we(o2, c2, h2, s2, u2) : new ye(o2, a2, c2, h2, s2, u2), this.cache[t3]));
  }, e.prototype.encode = function(t3, e2, r) {
    var n2, i2, a2, o2, s2;
    for (a2 = [], i2 = [], o2 = 0, s2 = e2.length; o2 < s2; o2++) n2 = t3[e2[o2]], i2.push(a2.length), n2 && (a2 = a2.concat(n2.encode(r)));
    return i2.push(a2.length), { table: a2, offsets: i2 };
  }, e;
}(), ye = function() {
  function t2(t3, e, r, n2, i2, a2) {
    this.raw = t3, this.numberOfContours = e, this.xMin = r, this.yMin = n2, this.xMax = i2, this.yMax = a2, this.compound = false;
  }
  return t2.prototype.encode = function() {
    return this.raw.data;
  }, t2;
}(), we = function() {
  function t2(t3, e, r, n2, i2) {
    var a2, o2;
    for (this.raw = t3, this.xMin = e, this.yMin = r, this.xMax = n2, this.yMax = i2, this.compound = true, this.glyphIDs = [], this.glyphOffsets = [], a2 = this.raw; o2 = a2.readShort(), this.glyphOffsets.push(a2.pos), this.glyphIDs.push(a2.readUInt16()), 32 & o2; ) a2.pos += 1 & o2 ? 4 : 2, 128 & o2 ? a2.pos += 8 : 64 & o2 ? a2.pos += 4 : 8 & o2 && (a2.pos += 2);
  }
  return t2.prototype.encode = function() {
    var t3, e, r;
    for (e = new ne(ve.call(this.raw.data)), t3 = 0, r = this.glyphIDs.length; t3 < r; ++t3) e.pos = this.glyphOffsets[t3];
    return e.data;
  }, t2;
}(), Ne = function(t2) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return oe(e, re), e.prototype.tag = "loca", e.prototype.parse = function(t3) {
    var e2, r;
    return t3.pos = this.offset, e2 = this.file.head.indexToLocFormat, this.offsets = 0 === e2 ? function() {
      var e3, n2;
      for (n2 = [], r = 0, e3 = this.length; r < e3; r += 2) n2.push(2 * t3.readUInt16());
      return n2;
    }.call(this) : function() {
      var e3, n2;
      for (n2 = [], r = 0, e3 = this.length; r < e3; r += 4) n2.push(t3.readUInt32());
      return n2;
    }.call(this);
  }, e.prototype.indexOf = function(t3) {
    return this.offsets[t3];
  }, e.prototype.lengthOf = function(t3) {
    return this.offsets[t3 + 1] - this.offsets[t3];
  }, e.prototype.encode = function(t3, e2) {
    for (var r = new Uint32Array(this.offsets.length), n2 = 0, i2 = 0, a2 = 0; a2 < r.length; ++a2) if (r[a2] = n2, i2 < e2.length && e2[i2] == a2) {
      ++i2, r[a2] = n2;
      var o2 = this.offsets[a2], s2 = this.offsets[a2 + 1] - o2;
      s2 > 0 && (n2 += s2);
    }
    for (var c2 = new Array(4 * r.length), u2 = 0; u2 < r.length; ++u2) c2[4 * u2 + 3] = 255 & r[u2], c2[4 * u2 + 2] = (65280 & r[u2]) >> 8, c2[4 * u2 + 1] = (16711680 & r[u2]) >> 16, c2[4 * u2] = (4278190080 & r[u2]) >> 24;
    return c2;
  }, e;
}(), Le = function() {
  function t2(t3) {
    this.font = t3, this.subset = {}, this.unicodes = {}, this.next = 33;
  }
  return t2.prototype.generateCmap = function() {
    var t3, e, r, n2, i2;
    for (e in n2 = this.font.cmap.tables[0].codeMap, t3 = {}, i2 = this.subset) r = i2[e], t3[e] = n2[r];
    return t3;
  }, t2.prototype.glyphsFor = function(t3) {
    var e, r, n2, i2, a2, o2, s2;
    for (n2 = {}, a2 = 0, o2 = t3.length; a2 < o2; a2++) n2[i2 = t3[a2]] = this.font.glyf.glyphFor(i2);
    for (i2 in e = [], n2) (null != (r = n2[i2]) ? r.compound : void 0) && e.push.apply(e, r.glyphIDs);
    if (e.length > 0) for (i2 in s2 = this.glyphsFor(e)) r = s2[i2], n2[i2] = r;
    return n2;
  }, t2.prototype.encode = function(t3, e) {
    var r, n2, i2, a2, o2, s2, c2, u2, h2, l2, f2, d2, p2, g2, m2;
    for (n2 in r = ue.encode(this.generateCmap(), "unicode"), a2 = this.glyphsFor(t3), f2 = { 0: 0 }, m2 = r.charMap) f2[(s2 = m2[n2]).old] = s2.new;
    for (d2 in l2 = r.maxGlyphID, a2) d2 in f2 || (f2[d2] = l2++);
    return u2 = function(t4) {
      var e2, r2;
      for (e2 in r2 = {}, t4) r2[t4[e2]] = e2;
      return r2;
    }(f2), h2 = Object.keys(u2).sort(function(t4, e2) {
      return t4 - e2;
    }), p2 = function() {
      var t4, e2, r2;
      for (r2 = [], t4 = 0, e2 = h2.length; t4 < e2; t4++) o2 = h2[t4], r2.push(u2[o2]);
      return r2;
    }(), i2 = this.font.glyf.encode(a2, p2, f2), c2 = this.font.loca.encode(i2.offsets, p2), g2 = { cmap: this.font.cmap.raw(), glyf: i2.table, loca: c2, hmtx: this.font.hmtx.raw(), hhea: this.font.hhea.raw(), maxp: this.font.maxp.raw(), post: this.font.post.raw(), name: this.font.name.raw(), head: this.font.head.encode(e) }, this.font.os2.exists && (g2["OS/2"] = this.font.os2.raw()), this.font.directory.encode(g2);
  }, t2;
}();
E.API.PDFObject = function() {
  var t2;
  function e() {
  }
  return t2 = function(t3, e2) {
    return (Array(e2 + 1).join("0") + t3).slice(-e2);
  }, e.convert = function(r) {
    var n2, i2, a2, o2;
    if (Array.isArray(r)) return "[" + function() {
      var t3, i3, a3;
      for (a3 = [], t3 = 0, i3 = r.length; t3 < i3; t3++) n2 = r[t3], a3.push(e.convert(n2));
      return a3;
    }().join(" ") + "]";
    if ("string" == typeof r) return "/" + r;
    if (null != r ? r.isString : void 0) return "(" + r + ")";
    if (r instanceof Date) return "(D:" + t2(r.getUTCFullYear(), 4) + t2(r.getUTCMonth(), 2) + t2(r.getUTCDate(), 2) + t2(r.getUTCHours(), 2) + t2(r.getUTCMinutes(), 2) + t2(r.getUTCSeconds(), 2) + "Z)";
    if ("[object Object]" === {}.toString.call(r)) {
      for (i2 in a2 = ["<<"], r) o2 = r[i2], a2.push("/" + i2 + " " + e.convert(o2));
      return a2.push(">>"), a2.join("\n");
    }
    return "" + r;
  }, e;
}();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var jszip_min = { exports: {} };
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(module, exports) {
  !function(e) {
    module.exports = e();
  }(function() {
    return function s2(a2, o2, h2) {
      function u2(r, e2) {
        if (!o2[r]) {
          if (!a2[r]) {
            var t2 = "function" == typeof commonjsRequire && commonjsRequire;
            if (!e2 && t2) return t2(r, true);
            if (l2) return l2(r, true);
            var n2 = new Error("Cannot find module '" + r + "'");
            throw n2.code = "MODULE_NOT_FOUND", n2;
          }
          var i2 = o2[r] = { exports: {} };
          a2[r][0].call(i2.exports, function(e3) {
            var t3 = a2[r][1][e3];
            return u2(t3 || e3);
          }, i2, i2.exports, s2, a2, o2, h2);
        }
        return o2[r].exports;
      }
      for (var l2 = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < h2.length; e++) u2(h2[e]);
      return u2;
    }({ 1: [function(e, t2, r) {
      var d2 = e("./utils"), c2 = e("./support"), p2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      r.encode = function(e2) {
        for (var t3, r2, n2, i2, s2, a2, o2, h2 = [], u2 = 0, l2 = e2.length, f2 = l2, c3 = "string" !== d2.getTypeOf(e2); u2 < e2.length; ) f2 = l2 - u2, n2 = c3 ? (t3 = e2[u2++], r2 = u2 < l2 ? e2[u2++] : 0, u2 < l2 ? e2[u2++] : 0) : (t3 = e2.charCodeAt(u2++), r2 = u2 < l2 ? e2.charCodeAt(u2++) : 0, u2 < l2 ? e2.charCodeAt(u2++) : 0), i2 = t3 >> 2, s2 = (3 & t3) << 4 | r2 >> 4, a2 = 1 < f2 ? (15 & r2) << 2 | n2 >> 6 : 64, o2 = 2 < f2 ? 63 & n2 : 64, h2.push(p2.charAt(i2) + p2.charAt(s2) + p2.charAt(a2) + p2.charAt(o2));
        return h2.join("");
      }, r.decode = function(e2) {
        var t3, r2, n2, i2, s2, a2, o2 = 0, h2 = 0, u2 = "data:";
        if (e2.substr(0, u2.length) === u2) throw new Error("Invalid base64 input, it looks like a data url.");
        var l2, f2 = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (e2.charAt(e2.length - 1) === p2.charAt(64) && f2--, e2.charAt(e2.length - 2) === p2.charAt(64) && f2--, f2 % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (l2 = c2.uint8array ? new Uint8Array(0 | f2) : new Array(0 | f2); o2 < e2.length; ) t3 = p2.indexOf(e2.charAt(o2++)) << 2 | (i2 = p2.indexOf(e2.charAt(o2++))) >> 4, r2 = (15 & i2) << 4 | (s2 = p2.indexOf(e2.charAt(o2++))) >> 2, n2 = (3 & s2) << 6 | (a2 = p2.indexOf(e2.charAt(o2++))), l2[h2++] = t3, 64 !== s2 && (l2[h2++] = r2), 64 !== a2 && (l2[h2++] = n2);
        return l2;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(e, t2, r) {
      var n2 = e("./external"), i2 = e("./stream/DataWorker"), s2 = e("./stream/Crc32Probe"), a2 = e("./stream/DataLengthProbe");
      function o2(e2, t3, r2, n3, i3) {
        this.compressedSize = e2, this.uncompressedSize = t3, this.crc32 = r2, this.compression = n3, this.compressedContent = i3;
      }
      o2.prototype = { getContentWorker: function() {
        var e2 = new i2(n2.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a2("data_length")), t3 = this;
        return e2.on("end", function() {
          if (this.streamInfo.data_length !== t3.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), e2;
      }, getCompressedWorker: function() {
        return new i2(n2.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, o2.createWorkerFrom = function(e2, t3, r2) {
        return e2.pipe(new s2()).pipe(new a2("uncompressedSize")).pipe(t3.compressWorker(r2)).pipe(new a2("compressedSize")).withStreamInfo("compression", t3);
      }, t2.exports = o2;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t2, r) {
      var n2 = e("./stream/GenericWorker");
      r.STORE = { magic: "\0\0", compressWorker: function() {
        return new n2("STORE compression");
      }, uncompressWorker: function() {
        return new n2("STORE decompression");
      } }, r.DEFLATE = e("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t2, r) {
      var n2 = e("./utils");
      var o2 = function() {
        for (var e2, t3 = [], r2 = 0; r2 < 256; r2++) {
          e2 = r2;
          for (var n3 = 0; n3 < 8; n3++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
          t3[r2] = e2;
        }
        return t3;
      }();
      t2.exports = function(e2, t3) {
        return void 0 !== e2 && e2.length ? "string" !== n2.getTypeOf(e2) ? function(e3, t4, r2, n3) {
          var i2 = o2, s2 = n3 + r2;
          e3 ^= -1;
          for (var a2 = n3; a2 < s2; a2++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t4[a2])];
          return -1 ^ e3;
        }(0 | t3, e2, e2.length, 0) : function(e3, t4, r2, n3) {
          var i2 = o2, s2 = n3 + r2;
          e3 ^= -1;
          for (var a2 = n3; a2 < s2; a2++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t4.charCodeAt(a2))];
          return -1 ^ e3;
        }(0 | t3, e2, e2.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(e, t2, r) {
      r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
    }, {}], 6: [function(e, t2, r) {
      var n2 = null;
      n2 = "undefined" != typeof Promise ? Promise : e("lie"), t2.exports = { Promise: n2 };
    }, { lie: 37 }], 7: [function(e, t2, r) {
      var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i2 = e("pako"), s2 = e("./utils"), a2 = e("./stream/GenericWorker"), o2 = n2 ? "uint8array" : "array";
      function h2(e2, t3) {
        a2.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t3, this.meta = {};
      }
      r.magic = "\b\0", s2.inherits(h2, a2), h2.prototype.processChunk = function(e2) {
        this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s2.transformTo(o2, e2.data), false);
      }, h2.prototype.flush = function() {
        a2.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
      }, h2.prototype.cleanUp = function() {
        a2.prototype.cleanUp.call(this), this._pako = null;
      }, h2.prototype._createPako = function() {
        this._pako = new i2[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
        var t3 = this;
        this._pako.onData = function(e2) {
          t3.push({ data: e2, meta: t3.meta });
        };
      }, r.compressWorker = function(e2) {
        return new h2("Deflate", e2);
      }, r.uncompressWorker = function() {
        return new h2("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t2, r) {
      function A2(e2, t3) {
        var r2, n3 = "";
        for (r2 = 0; r2 < t3; r2++) n3 += String.fromCharCode(255 & e2), e2 >>>= 8;
        return n3;
      }
      function n2(e2, t3, r2, n3, i3, s3) {
        var a2, o2, h2 = e2.file, u2 = e2.compression, l2 = s3 !== O2.utf8encode, f2 = I2.transformTo("string", s3(h2.name)), c2 = I2.transformTo("string", O2.utf8encode(h2.name)), d2 = h2.comment, p2 = I2.transformTo("string", s3(d2)), m2 = I2.transformTo("string", O2.utf8encode(d2)), _2 = c2.length !== h2.name.length, g2 = m2.length !== d2.length, b2 = "", v2 = "", y2 = "", w2 = h2.dir, k2 = h2.date, x2 = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        t3 && !r2 || (x2.crc32 = e2.crc32, x2.compressedSize = e2.compressedSize, x2.uncompressedSize = e2.uncompressedSize);
        var S2 = 0;
        t3 && (S2 |= 8), l2 || !_2 && !g2 || (S2 |= 2048);
        var z2 = 0, C2 = 0;
        w2 && (z2 |= 16), "UNIX" === i3 ? (C2 = 798, z2 |= function(e3, t4) {
          var r3 = e3;
          return e3 || (r3 = t4 ? 16893 : 33204), (65535 & r3) << 16;
        }(h2.unixPermissions, w2)) : (C2 = 20, z2 |= function(e3) {
          return 63 & (e3 || 0);
        }(h2.dosPermissions)), a2 = k2.getUTCHours(), a2 <<= 6, a2 |= k2.getUTCMinutes(), a2 <<= 5, a2 |= k2.getUTCSeconds() / 2, o2 = k2.getUTCFullYear() - 1980, o2 <<= 4, o2 |= k2.getUTCMonth() + 1, o2 <<= 5, o2 |= k2.getUTCDate(), _2 && (v2 = A2(1, 1) + A2(B2(f2), 4) + c2, b2 += "up" + A2(v2.length, 2) + v2), g2 && (y2 = A2(1, 1) + A2(B2(p2), 4) + m2, b2 += "uc" + A2(y2.length, 2) + y2);
        var E2 = "";
        return E2 += "\n\0", E2 += A2(S2, 2), E2 += u2.magic, E2 += A2(a2, 2), E2 += A2(o2, 2), E2 += A2(x2.crc32, 4), E2 += A2(x2.compressedSize, 4), E2 += A2(x2.uncompressedSize, 4), E2 += A2(f2.length, 2), E2 += A2(b2.length, 2), { fileRecord: R2.LOCAL_FILE_HEADER + E2 + f2 + b2, dirRecord: R2.CENTRAL_FILE_HEADER + A2(C2, 2) + E2 + A2(p2.length, 2) + "\0\0\0\0" + A2(z2, 4) + A2(n3, 4) + f2 + b2 + p2 };
      }
      var I2 = e("../utils"), i2 = e("../stream/GenericWorker"), O2 = e("../utf8"), B2 = e("../crc32"), R2 = e("../signature");
      function s2(e2, t3, r2, n3) {
        i2.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t3, this.zipPlatform = r2, this.encodeFileName = n3, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      I2.inherits(s2, i2), s2.prototype.push = function(e2) {
        var t3 = e2.meta.percent || 0, r2 = this.entriesCount, n3 = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i2.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t3 + 100 * (r2 - n3 - 1)) / r2 : 100 } }));
      }, s2.prototype.openedSource = function(e2) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
        var t3 = this.streamFiles && !e2.file.dir;
        if (t3) {
          var r2 = n2(e2, t3, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: r2.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = true;
      }, s2.prototype.closedSource = function(e2) {
        this.accumulate = false;
        var t3 = this.streamFiles && !e2.file.dir, r2 = n2(e2, t3, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(r2.dirRecord), t3) this.push({ data: function(e3) {
          return R2.DATA_DESCRIPTOR + A2(e3.crc32, 4) + A2(e3.compressedSize, 4) + A2(e3.uncompressedSize, 4);
        }(e2), meta: { percent: 100 } });
        else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, s2.prototype.flush = function() {
        for (var e2 = this.bytesWritten, t3 = 0; t3 < this.dirRecords.length; t3++) this.push({ data: this.dirRecords[t3], meta: { percent: 100 } });
        var r2 = this.bytesWritten - e2, n3 = function(e3, t4, r3, n4, i3) {
          var s3 = I2.transformTo("string", i3(n4));
          return R2.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A2(e3, 2) + A2(e3, 2) + A2(t4, 4) + A2(r3, 4) + A2(s3.length, 2) + s3;
        }(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
        this.push({ data: n3, meta: { percent: 100 } });
      }, s2.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, s2.prototype.registerPrevious = function(e2) {
        this._sources.push(e2);
        var t3 = this;
        return e2.on("data", function(e3) {
          t3.processChunk(e3);
        }), e2.on("end", function() {
          t3.closedSource(t3.previous.streamInfo), t3._sources.length ? t3.prepareNextSource() : t3.end();
        }), e2.on("error", function(e3) {
          t3.error(e3);
        }), this;
      }, s2.prototype.resume = function() {
        return !!i2.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, s2.prototype.error = function(e2) {
        var t3 = this._sources;
        if (!i2.prototype.error.call(this, e2)) return false;
        for (var r2 = 0; r2 < t3.length; r2++) try {
          t3[r2].error(e2);
        } catch (e3) {
        }
        return true;
      }, s2.prototype.lock = function() {
        i2.prototype.lock.call(this);
        for (var e2 = this._sources, t3 = 0; t3 < e2.length; t3++) e2[t3].lock();
      }, t2.exports = s2;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t2, r) {
      var u2 = e("../compressions"), n2 = e("./ZipFileWorker");
      r.generateWorker = function(e2, a2, t3) {
        var o2 = new n2(a2.streamFiles, t3, a2.platform, a2.encodeFileName), h2 = 0;
        try {
          e2.forEach(function(e3, t4) {
            h2++;
            var r2 = function(e4, t5) {
              var r3 = e4 || t5, n4 = u2[r3];
              if (!n4) throw new Error(r3 + " is not a valid compression method !");
              return n4;
            }(t4.options.compression, a2.compression), n3 = t4.options.compressionOptions || a2.compressionOptions || {}, i2 = t4.dir, s2 = t4.date;
            t4._compressWorker(r2, n3).withStreamInfo("file", { name: e3, dir: i2, date: s2, comment: t4.comment || "", unixPermissions: t4.unixPermissions, dosPermissions: t4.dosPermissions }).pipe(o2);
          }), o2.entriesCount = h2;
        } catch (e3) {
          o2.error(e3);
        }
        return o2;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t2, r) {
      function n2() {
        if (!(this instanceof n2)) return new n2();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var e2 = new n2();
          for (var t3 in this) "function" != typeof this[t3] && (e2[t3] = this[t3]);
          return e2;
        };
      }
      (n2.prototype = e("./object")).loadAsync = e("./load"), n2.support = e("./support"), n2.defaults = e("./defaults"), n2.version = "3.10.1", n2.loadAsync = function(e2, t3) {
        return new n2().loadAsync(e2, t3);
      }, n2.external = e("./external"), t2.exports = n2;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t2, r) {
      var u2 = e("./utils"), i2 = e("./external"), n2 = e("./utf8"), s2 = e("./zipEntries"), a2 = e("./stream/Crc32Probe"), l2 = e("./nodejsUtils");
      function f2(n3) {
        return new i2.Promise(function(e2, t3) {
          var r2 = n3.decompressed.getContentWorker().pipe(new a2());
          r2.on("error", function(e3) {
            t3(e3);
          }).on("end", function() {
            r2.streamInfo.crc32 !== n3.decompressed.crc32 ? t3(new Error("Corrupted zip : CRC32 mismatch")) : e2();
          }).resume();
        });
      }
      t2.exports = function(e2, o2) {
        var h2 = this;
        return o2 = u2.extend(o2 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n2.utf8decode }), l2.isNode && l2.isStream(e2) ? i2.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u2.prepareContent("the loaded zip file", e2, true, o2.optimizedBinaryString, o2.base64).then(function(e3) {
          var t3 = new s2(o2);
          return t3.load(e3), t3;
        }).then(function(e3) {
          var t3 = [i2.Promise.resolve(e3)], r2 = e3.files;
          if (o2.checkCRC32) for (var n3 = 0; n3 < r2.length; n3++) t3.push(f2(r2[n3]));
          return i2.Promise.all(t3);
        }).then(function(e3) {
          for (var t3 = e3.shift(), r2 = t3.files, n3 = 0; n3 < r2.length; n3++) {
            var i3 = r2[n3], s3 = i3.fileNameStr, a3 = u2.resolve(i3.fileNameStr);
            h2.file(a3, i3.decompressed, { binary: true, optimizedBinaryString: true, date: i3.date, dir: i3.dir, comment: i3.fileCommentStr.length ? i3.fileCommentStr : null, unixPermissions: i3.unixPermissions, dosPermissions: i3.dosPermissions, createFolders: o2.createFolders }), i3.dir || (h2.file(a3).unsafeOriginalName = s3);
          }
          return t3.zipComment.length && (h2.comment = t3.zipComment), h2;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t2, r) {
      var n2 = e("../utils"), i2 = e("../stream/GenericWorker");
      function s2(e2, t3) {
        i2.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t3);
      }
      n2.inherits(s2, i2), s2.prototype._bindStream = function(e2) {
        var t3 = this;
        (this._stream = e2).pause(), e2.on("data", function(e3) {
          t3.push({ data: e3, meta: { percent: 0 } });
        }).on("error", function(e3) {
          t3.isPaused ? this.generatedError = e3 : t3.error(e3);
        }).on("end", function() {
          t3.isPaused ? t3._upstreamEnded = true : t3.end();
        });
      }, s2.prototype.pause = function() {
        return !!i2.prototype.pause.call(this) && (this._stream.pause(), true);
      }, s2.prototype.resume = function() {
        return !!i2.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, t2.exports = s2;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t2, r) {
      var i2 = e("readable-stream").Readable;
      function n2(e2, t3, r2) {
        i2.call(this, t3), this._helper = e2;
        var n3 = this;
        e2.on("data", function(e3, t4) {
          n3.push(e3) || n3._helper.pause(), r2 && r2(t4);
        }).on("error", function(e3) {
          n3.emit("error", e3);
        }).on("end", function() {
          n3.push(null);
        });
      }
      e("../utils").inherits(n2, i2), n2.prototype._read = function() {
        this._helper.resume();
      }, t2.exports = n2;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t2, r) {
      t2.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t3) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t3);
        if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
        return new Buffer(e2, t3);
      }, allocBuffer: function(e2) {
        if (Buffer.alloc) return Buffer.alloc(e2);
        var t3 = new Buffer(e2);
        return t3.fill(0), t3;
      }, isBuffer: function(e2) {
        return Buffer.isBuffer(e2);
      }, isStream: function(e2) {
        return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
      } };
    }, {}], 15: [function(e, t2, r) {
      function s2(e2, t3, r2) {
        var n3, i3 = u2.getTypeOf(t3), s3 = u2.extend(r2 || {}, f2);
        s3.date = s3.date || /* @__PURE__ */ new Date(), null !== s3.compression && (s3.compression = s3.compression.toUpperCase()), "string" == typeof s3.unixPermissions && (s3.unixPermissions = parseInt(s3.unixPermissions, 8)), s3.unixPermissions && 16384 & s3.unixPermissions && (s3.dir = true), s3.dosPermissions && 16 & s3.dosPermissions && (s3.dir = true), s3.dir && (e2 = g2(e2)), s3.createFolders && (n3 = _2(e2)) && b2.call(this, n3, true);
        var a3 = "string" === i3 && false === s3.binary && false === s3.base64;
        r2 && void 0 !== r2.binary || (s3.binary = !a3), (t3 instanceof c2 && 0 === t3.uncompressedSize || s3.dir || !t3 || 0 === t3.length) && (s3.base64 = false, s3.binary = true, t3 = "", s3.compression = "STORE", i3 = "string");
        var o3 = null;
        o3 = t3 instanceof c2 || t3 instanceof l2 ? t3 : p2.isNode && p2.isStream(t3) ? new m2(e2, t3) : u2.prepareContent(e2, t3, s3.binary, s3.optimizedBinaryString, s3.base64);
        var h3 = new d2(e2, o3, s3);
        this.files[e2] = h3;
      }
      var i2 = e("./utf8"), u2 = e("./utils"), l2 = e("./stream/GenericWorker"), a2 = e("./stream/StreamHelper"), f2 = e("./defaults"), c2 = e("./compressedObject"), d2 = e("./zipObject"), o2 = e("./generate"), p2 = e("./nodejsUtils"), m2 = e("./nodejs/NodejsStreamInputAdapter"), _2 = function(e2) {
        "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
        var t3 = e2.lastIndexOf("/");
        return 0 < t3 ? e2.substring(0, t3) : "";
      }, g2 = function(e2) {
        return "/" !== e2.slice(-1) && (e2 += "/"), e2;
      }, b2 = function(e2, t3) {
        return t3 = void 0 !== t3 ? t3 : f2.createFolders, e2 = g2(e2), this.files[e2] || s2.call(this, e2, null, { dir: true, createFolders: t3 }), this.files[e2];
      };
      function h2(e2) {
        return "[object RegExp]" === Object.prototype.toString.call(e2);
      }
      var n2 = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(e2) {
        var t3, r2, n3;
        for (t3 in this.files) n3 = this.files[t3], (r2 = t3.slice(this.root.length, t3.length)) && t3.slice(0, this.root.length) === this.root && e2(r2, n3);
      }, filter: function(r2) {
        var n3 = [];
        return this.forEach(function(e2, t3) {
          r2(e2, t3) && n3.push(t3);
        }), n3;
      }, file: function(e2, t3, r2) {
        if (1 !== arguments.length) return e2 = this.root + e2, s2.call(this, e2, t3, r2), this;
        if (h2(e2)) {
          var n3 = e2;
          return this.filter(function(e3, t4) {
            return !t4.dir && n3.test(e3);
          });
        }
        var i3 = this.files[this.root + e2];
        return i3 && !i3.dir ? i3 : null;
      }, folder: function(r2) {
        if (!r2) return this;
        if (h2(r2)) return this.filter(function(e3, t4) {
          return t4.dir && r2.test(e3);
        });
        var e2 = this.root + r2, t3 = b2.call(this, e2), n3 = this.clone();
        return n3.root = t3.name, n3;
      }, remove: function(r2) {
        r2 = this.root + r2;
        var e2 = this.files[r2];
        if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
        else for (var t3 = this.filter(function(e3, t4) {
          return t4.name.slice(0, r2.length) === r2;
        }), n3 = 0; n3 < t3.length; n3++) delete this.files[t3[n3].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(e2) {
        var t3, r2 = {};
        try {
          if ((r2 = u2.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i2.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
          u2.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
          var n3 = r2.comment || this.comment || "";
          t3 = o2.generateWorker(this, r2, n3);
        } catch (e3) {
          (t3 = new l2("error")).error(e3);
        }
        return new a2(t3, r2.type || "string", r2.mimeType);
      }, generateAsync: function(e2, t3) {
        return this.generateInternalStream(e2).accumulate(t3);
      }, generateNodeStream: function(e2, t3) {
        return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t3);
      } };
      t2.exports = n2;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t2, r) {
      t2.exports = e("stream");
    }, { stream: void 0 }], 17: [function(e, t2, r) {
      var n2 = e("./DataReader");
      function i2(e2) {
        n2.call(this, e2);
        for (var t3 = 0; t3 < this.data.length; t3++) e2[t3] = 255 & e2[t3];
      }
      e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
        return this.data[this.zero + e2];
      }, i2.prototype.lastIndexOfSignature = function(e2) {
        for (var t3 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s2 = this.length - 4; 0 <= s2; --s2) if (this.data[s2] === t3 && this.data[s2 + 1] === r2 && this.data[s2 + 2] === n3 && this.data[s2 + 3] === i3) return s2 - this.zero;
        return -1;
      }, i2.prototype.readAndCheckSignature = function(e2) {
        var t3 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s2 = this.readData(4);
        return t3 === s2[0] && r2 === s2[1] && n3 === s2[2] && i3 === s2[3];
      }, i2.prototype.readData = function(e2) {
        if (this.checkOffset(e2), 0 === e2) return [];
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
        return this.index += e2, t3;
      }, t2.exports = i2;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t2, r) {
      var n2 = e("../utils");
      function i2(e2) {
        this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
      }
      i2.prototype = { checkOffset: function(e2) {
        this.checkIndex(this.index + e2);
      }, checkIndex: function(e2) {
        if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
      }, setIndex: function(e2) {
        this.checkIndex(e2), this.index = e2;
      }, skip: function(e2) {
        this.setIndex(this.index + e2);
      }, byteAt: function() {
      }, readInt: function(e2) {
        var t3, r2 = 0;
        for (this.checkOffset(e2), t3 = this.index + e2 - 1; t3 >= this.index; t3--) r2 = (r2 << 8) + this.byteAt(t3);
        return this.index += e2, r2;
      }, readString: function(e2) {
        return n2.transformTo("string", this.readData(e2));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var e2 = this.readInt(4);
        return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
      } }, t2.exports = i2;
    }, { "../utils": 32 }], 19: [function(e, t2, r) {
      var n2 = e("./Uint8ArrayReader");
      function i2(e2) {
        n2.call(this, e2);
      }
      e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
        this.checkOffset(e2);
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
        return this.index += e2, t3;
      }, t2.exports = i2;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t2, r) {
      var n2 = e("./DataReader");
      function i2(e2) {
        n2.call(this, e2);
      }
      e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
        return this.data.charCodeAt(this.zero + e2);
      }, i2.prototype.lastIndexOfSignature = function(e2) {
        return this.data.lastIndexOf(e2) - this.zero;
      }, i2.prototype.readAndCheckSignature = function(e2) {
        return e2 === this.readData(4);
      }, i2.prototype.readData = function(e2) {
        this.checkOffset(e2);
        var t3 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
        return this.index += e2, t3;
      }, t2.exports = i2;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t2, r) {
      var n2 = e("./ArrayReader");
      function i2(e2) {
        n2.call(this, e2);
      }
      e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
        if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
        var t3 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
        return this.index += e2, t3;
      }, t2.exports = i2;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t2, r) {
      var n2 = e("../utils"), i2 = e("../support"), s2 = e("./ArrayReader"), a2 = e("./StringReader"), o2 = e("./NodeBufferReader"), h2 = e("./Uint8ArrayReader");
      t2.exports = function(e2) {
        var t3 = n2.getTypeOf(e2);
        return n2.checkSupport(t3), "string" !== t3 || i2.uint8array ? "nodebuffer" === t3 ? new o2(e2) : i2.uint8array ? new h2(n2.transformTo("uint8array", e2)) : new s2(n2.transformTo("array", e2)) : new a2(e2);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t2, r) {
      r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(e, t2, r) {
      var n2 = e("./GenericWorker"), i2 = e("../utils");
      function s2(e2) {
        n2.call(this, "ConvertWorker to " + e2), this.destType = e2;
      }
      i2.inherits(s2, n2), s2.prototype.processChunk = function(e2) {
        this.push({ data: i2.transformTo(this.destType, e2.data), meta: e2.meta });
      }, t2.exports = s2;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t2, r) {
      var n2 = e("./GenericWorker"), i2 = e("../crc32");
      function s2() {
        n2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      e("../utils").inherits(s2, n2), s2.prototype.processChunk = function(e2) {
        this.streamInfo.crc32 = i2(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
      }, t2.exports = s2;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t2, r) {
      var n2 = e("../utils"), i2 = e("./GenericWorker");
      function s2(e2) {
        i2.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
      }
      n2.inherits(s2, i2), s2.prototype.processChunk = function(e2) {
        if (e2) {
          var t3 = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = t3 + e2.data.length;
        }
        i2.prototype.processChunk.call(this, e2);
      }, t2.exports = s2;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t2, r) {
      var n2 = e("../utils"), i2 = e("./GenericWorker");
      function s2(e2) {
        i2.call(this, "DataWorker");
        var t3 = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
          t3.dataIsReady = true, t3.data = e3, t3.max = e3 && e3.length || 0, t3.type = n2.getTypeOf(e3), t3.isPaused || t3._tickAndRepeat();
        }, function(e3) {
          t3.error(e3);
        });
      }
      n2.inherits(s2, i2), s2.prototype.cleanUp = function() {
        i2.prototype.cleanUp.call(this), this.data = null;
      }, s2.prototype.resume = function() {
        return !!i2.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n2.delay(this._tickAndRepeat, [], this)), true);
      }, s2.prototype._tickAndRepeat = function() {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n2.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, s2.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return false;
        var e2 = null, t3 = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            e2 = this.data.substring(this.index, t3);
            break;
          case "uint8array":
            e2 = this.data.subarray(this.index, t3);
            break;
          case "array":
          case "nodebuffer":
            e2 = this.data.slice(this.index, t3);
        }
        return this.index = t3, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, t2.exports = s2;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t2, r) {
      function n2(e2) {
        this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      n2.prototype = { push: function(e2) {
        this.emit("data", e2);
      }, end: function() {
        if (this.isFinished) return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (e2) {
          this.emit("error", e2);
        }
        return true;
      }, error: function(e2) {
        return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
      }, on: function(e2, t3) {
        return this._listeners[e2].push(t3), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(e2, t3) {
        if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t3);
      }, pipe: function(e2) {
        return e2.registerPrevious(this);
      }, registerPrevious: function(e2) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
        var t3 = this;
        return e2.on("data", function(e3) {
          t3.processChunk(e3);
        }), e2.on("end", function() {
          t3.end();
        }), e2.on("error", function(e3) {
          t3.error(e3);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return false;
        var e2 = this.isPaused = false;
        return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
      }, flush: function() {
      }, processChunk: function(e2) {
        this.push(e2);
      }, withStreamInfo: function(e2, t3) {
        return this.extraStreamInfo[e2] = t3, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function() {
        var e2 = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + e2 : e2;
      } }, t2.exports = n2;
    }, {}], 29: [function(e, t2, r) {
      var h2 = e("../utils"), i2 = e("./ConvertWorker"), s2 = e("./GenericWorker"), u2 = e("../base64"), n2 = e("../support"), a2 = e("../external"), o2 = null;
      if (n2.nodestream) try {
        o2 = e("../nodejs/NodejsStreamOutputAdapter");
      } catch (e2) {
      }
      function l2(e2, o3) {
        return new a2.Promise(function(t3, r2) {
          var n3 = [], i3 = e2._internalType, s3 = e2._outputType, a3 = e2._mimeType;
          e2.on("data", function(e3, t4) {
            n3.push(e3), o3 && o3(t4);
          }).on("error", function(e3) {
            n3 = [], r2(e3);
          }).on("end", function() {
            try {
              var e3 = function(e4, t4, r3) {
                switch (e4) {
                  case "blob":
                    return h2.newBlob(h2.transformTo("arraybuffer", t4), r3);
                  case "base64":
                    return u2.encode(t4);
                  default:
                    return h2.transformTo(e4, t4);
                }
              }(s3, function(e4, t4) {
                var r3, n4 = 0, i4 = null, s4 = 0;
                for (r3 = 0; r3 < t4.length; r3++) s4 += t4[r3].length;
                switch (e4) {
                  case "string":
                    return t4.join("");
                  case "array":
                    return Array.prototype.concat.apply([], t4);
                  case "uint8array":
                    for (i4 = new Uint8Array(s4), r3 = 0; r3 < t4.length; r3++) i4.set(t4[r3], n4), n4 += t4[r3].length;
                    return i4;
                  case "nodebuffer":
                    return Buffer.concat(t4);
                  default:
                    throw new Error("concat : unsupported type '" + e4 + "'");
                }
              }(i3, n3), a3);
              t3(e3);
            } catch (e4) {
              r2(e4);
            }
            n3 = [];
          }).resume();
        });
      }
      function f2(e2, t3, r2) {
        var n3 = t3;
        switch (t3) {
          case "blob":
          case "arraybuffer":
            n3 = "uint8array";
            break;
          case "base64":
            n3 = "string";
        }
        try {
          this._internalType = n3, this._outputType = t3, this._mimeType = r2, h2.checkSupport(n3), this._worker = e2.pipe(new i2(n3)), e2.lock();
        } catch (e3) {
          this._worker = new s2("error"), this._worker.error(e3);
        }
      }
      f2.prototype = { accumulate: function(e2) {
        return l2(this, e2);
      }, on: function(e2, t3) {
        var r2 = this;
        return "data" === e2 ? this._worker.on(e2, function(e3) {
          t3.call(r2, e3.data, e3.meta);
        }) : this._worker.on(e2, function() {
          h2.delay(t3, arguments, r2);
        }), this;
      }, resume: function() {
        return h2.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(e2) {
        if (h2.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
        return new o2(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
      } }, t2.exports = f2;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t2, r) {
      if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
      else {
        var n2 = new ArrayBuffer(0);
        try {
          r.blob = 0 === new Blob([n2], { type: "application/zip" }).size;
        } catch (e2) {
          try {
            var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            i2.append(n2), r.blob = 0 === i2.getBlob("application/zip").size;
          } catch (e3) {
            r.blob = false;
          }
        }
      }
      try {
        r.nodestream = !!e("readable-stream").Readable;
      } catch (e2) {
        r.nodestream = false;
      }
    }, { "readable-stream": 16 }], 31: [function(e, t2, s2) {
      for (var o2 = e("./utils"), h2 = e("./support"), r = e("./nodejsUtils"), n2 = e("./stream/GenericWorker"), u2 = new Array(256), i2 = 0; i2 < 256; i2++) u2[i2] = 252 <= i2 ? 6 : 248 <= i2 ? 5 : 240 <= i2 ? 4 : 224 <= i2 ? 3 : 192 <= i2 ? 2 : 1;
      u2[254] = u2[254] = 1;
      function a2() {
        n2.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function l2() {
        n2.call(this, "utf-8 encode");
      }
      s2.utf8encode = function(e2) {
        return h2.nodebuffer ? r.newBufferFrom(e2, "utf-8") : function(e3) {
          var t3, r2, n3, i3, s3, a3 = e3.length, o3 = 0;
          for (i3 = 0; i3 < a3; i3++) 55296 == (64512 & (r2 = e3.charCodeAt(i3))) && i3 + 1 < a3 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), o3 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (t3 = h2.uint8array ? new Uint8Array(o3) : new Array(o3), i3 = s3 = 0; s3 < o3; i3++) 55296 == (64512 & (r2 = e3.charCodeAt(i3))) && i3 + 1 < a3 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), r2 < 128 ? t3[s3++] = r2 : (r2 < 2048 ? t3[s3++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s3++] = 224 | r2 >>> 12 : (t3[s3++] = 240 | r2 >>> 18, t3[s3++] = 128 | r2 >>> 12 & 63), t3[s3++] = 128 | r2 >>> 6 & 63), t3[s3++] = 128 | 63 & r2);
          return t3;
        }(e2);
      }, s2.utf8decode = function(e2) {
        return h2.nodebuffer ? o2.transformTo("nodebuffer", e2).toString("utf-8") : function(e3) {
          var t3, r2, n3, i3, s3 = e3.length, a3 = new Array(2 * s3);
          for (t3 = r2 = 0; t3 < s3; ) if ((n3 = e3[t3++]) < 128) a3[r2++] = n3;
          else if (4 < (i3 = u2[n3])) a3[r2++] = 65533, t3 += i3 - 1;
          else {
            for (n3 &= 2 === i3 ? 31 : 3 === i3 ? 15 : 7; 1 < i3 && t3 < s3; ) n3 = n3 << 6 | 63 & e3[t3++], i3--;
            1 < i3 ? a3[r2++] = 65533 : n3 < 65536 ? a3[r2++] = n3 : (n3 -= 65536, a3[r2++] = 55296 | n3 >> 10 & 1023, a3[r2++] = 56320 | 1023 & n3);
          }
          return a3.length !== r2 && (a3.subarray ? a3 = a3.subarray(0, r2) : a3.length = r2), o2.applyFromCharCode(a3);
        }(e2 = o2.transformTo(h2.uint8array ? "uint8array" : "array", e2));
      }, o2.inherits(a2, n2), a2.prototype.processChunk = function(e2) {
        var t3 = o2.transformTo(h2.uint8array ? "uint8array" : "array", e2.data);
        if (this.leftOver && this.leftOver.length) {
          if (h2.uint8array) {
            var r2 = t3;
            (t3 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t3.set(r2, this.leftOver.length);
          } else t3 = this.leftOver.concat(t3);
          this.leftOver = null;
        }
        var n3 = function(e3, t4) {
          var r3;
          for ((t4 = t4 || e3.length) > e3.length && (t4 = e3.length), r3 = t4 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
          return r3 < 0 ? t4 : 0 === r3 ? t4 : r3 + u2[e3[r3]] > t4 ? r3 : t4;
        }(t3), i3 = t3;
        n3 !== t3.length && (h2.uint8array ? (i3 = t3.subarray(0, n3), this.leftOver = t3.subarray(n3, t3.length)) : (i3 = t3.slice(0, n3), this.leftOver = t3.slice(n3, t3.length))), this.push({ data: s2.utf8decode(i3), meta: e2.meta });
      }, a2.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: s2.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, s2.Utf8DecodeWorker = a2, o2.inherits(l2, n2), l2.prototype.processChunk = function(e2) {
        this.push({ data: s2.utf8encode(e2.data), meta: e2.meta });
      }, s2.Utf8EncodeWorker = l2;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t2, a2) {
      var o2 = e("./support"), h2 = e("./base64"), r = e("./nodejsUtils"), u2 = e("./external");
      function n2(e2) {
        return e2;
      }
      function l2(e2, t3) {
        for (var r2 = 0; r2 < e2.length; ++r2) t3[r2] = 255 & e2.charCodeAt(r2);
        return t3;
      }
      e("setimmediate"), a2.newBlob = function(t3, r2) {
        a2.checkSupport("blob");
        try {
          return new Blob([t3], { type: r2 });
        } catch (e2) {
          try {
            var n3 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return n3.append(t3), n3.getBlob(r2);
          } catch (e3) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var i2 = { stringifyByChunk: function(e2, t3, r2) {
        var n3 = [], i3 = 0, s3 = e2.length;
        if (s3 <= r2) return String.fromCharCode.apply(null, e2);
        for (; i3 < s3; ) "array" === t3 || "nodebuffer" === t3 ? n3.push(String.fromCharCode.apply(null, e2.slice(i3, Math.min(i3 + r2, s3)))) : n3.push(String.fromCharCode.apply(null, e2.subarray(i3, Math.min(i3 + r2, s3)))), i3 += r2;
        return n3.join("");
      }, stringifyByChar: function(e2) {
        for (var t3 = "", r2 = 0; r2 < e2.length; r2++) t3 += String.fromCharCode(e2[r2]);
        return t3;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return o2.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
        } catch (e2) {
          return false;
        }
      }(), nodebuffer: function() {
        try {
          return o2.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
        } catch (e2) {
          return false;
        }
      }() } };
      function s2(e2) {
        var t3 = 65536, r2 = a2.getTypeOf(e2), n3 = true;
        if ("uint8array" === r2 ? n3 = i2.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n3 = i2.applyCanBeUsed.nodebuffer), n3) for (; 1 < t3; ) try {
          return i2.stringifyByChunk(e2, r2, t3);
        } catch (e3) {
          t3 = Math.floor(t3 / 2);
        }
        return i2.stringifyByChar(e2);
      }
      function f2(e2, t3) {
        for (var r2 = 0; r2 < e2.length; r2++) t3[r2] = e2[r2];
        return t3;
      }
      a2.applyFromCharCode = s2;
      var c2 = {};
      c2.string = { string: n2, array: function(e2) {
        return l2(e2, new Array(e2.length));
      }, arraybuffer: function(e2) {
        return c2.string.uint8array(e2).buffer;
      }, uint8array: function(e2) {
        return l2(e2, new Uint8Array(e2.length));
      }, nodebuffer: function(e2) {
        return l2(e2, r.allocBuffer(e2.length));
      } }, c2.array = { string: s2, array: n2, arraybuffer: function(e2) {
        return new Uint8Array(e2).buffer;
      }, uint8array: function(e2) {
        return new Uint8Array(e2);
      }, nodebuffer: function(e2) {
        return r.newBufferFrom(e2);
      } }, c2.arraybuffer = { string: function(e2) {
        return s2(new Uint8Array(e2));
      }, array: function(e2) {
        return f2(new Uint8Array(e2), new Array(e2.byteLength));
      }, arraybuffer: n2, uint8array: function(e2) {
        return new Uint8Array(e2);
      }, nodebuffer: function(e2) {
        return r.newBufferFrom(new Uint8Array(e2));
      } }, c2.uint8array = { string: s2, array: function(e2) {
        return f2(e2, new Array(e2.length));
      }, arraybuffer: function(e2) {
        return e2.buffer;
      }, uint8array: n2, nodebuffer: function(e2) {
        return r.newBufferFrom(e2);
      } }, c2.nodebuffer = { string: s2, array: function(e2) {
        return f2(e2, new Array(e2.length));
      }, arraybuffer: function(e2) {
        return c2.nodebuffer.uint8array(e2).buffer;
      }, uint8array: function(e2) {
        return f2(e2, new Uint8Array(e2.length));
      }, nodebuffer: n2 }, a2.transformTo = function(e2, t3) {
        if (t3 = t3 || "", !e2) return t3;
        a2.checkSupport(e2);
        var r2 = a2.getTypeOf(t3);
        return c2[r2][e2](t3);
      }, a2.resolve = function(e2) {
        for (var t3 = e2.split("/"), r2 = [], n3 = 0; n3 < t3.length; n3++) {
          var i3 = t3[n3];
          "." === i3 || "" === i3 && 0 !== n3 && n3 !== t3.length - 1 || (".." === i3 ? r2.pop() : r2.push(i3));
        }
        return r2.join("/");
      }, a2.getTypeOf = function(e2) {
        return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o2.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o2.uint8array && e2 instanceof Uint8Array ? "uint8array" : o2.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, a2.checkSupport = function(e2) {
        if (!o2[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
      }, a2.MAX_VALUE_16BITS = 65535, a2.MAX_VALUE_32BITS = -1, a2.pretty = function(e2) {
        var t3, r2, n3 = "";
        for (r2 = 0; r2 < (e2 || "").length; r2++) n3 += "\\x" + ((t3 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t3.toString(16).toUpperCase();
        return n3;
      }, a2.delay = function(e2, t3, r2) {
        setImmediate(function() {
          e2.apply(r2 || null, t3 || []);
        });
      }, a2.inherits = function(e2, t3) {
        function r2() {
        }
        r2.prototype = t3.prototype, e2.prototype = new r2();
      }, a2.extend = function() {
        var e2, t3, r2 = {};
        for (e2 = 0; e2 < arguments.length; e2++) for (t3 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t3) && void 0 === r2[t3] && (r2[t3] = arguments[e2][t3]);
        return r2;
      }, a2.prepareContent = function(r2, e2, n3, i3, s3) {
        return u2.Promise.resolve(e2).then(function(n4) {
          return o2.blob && (n4 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n4))) && "undefined" != typeof FileReader ? new u2.Promise(function(t3, r3) {
            var e3 = new FileReader();
            e3.onload = function(e4) {
              t3(e4.target.result);
            }, e3.onerror = function(e4) {
              r3(e4.target.error);
            }, e3.readAsArrayBuffer(n4);
          }) : n4;
        }).then(function(e3) {
          var t3 = a2.getTypeOf(e3);
          return t3 ? ("arraybuffer" === t3 ? e3 = a2.transformTo("uint8array", e3) : "string" === t3 && (s3 ? e3 = h2.decode(e3) : n3 && true !== i3 && (e3 = function(e4) {
            return l2(e4, o2.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
          }(e3))), e3) : u2.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t2, r) {
      var n2 = e("./reader/readerFor"), i2 = e("./utils"), s2 = e("./signature"), a2 = e("./zipEntry"), o2 = e("./support");
      function h2(e2) {
        this.files = [], this.loadOptions = e2;
      }
      h2.prototype = { checkSignature: function(e2) {
        if (!this.reader.readAndCheckSignature(e2)) {
          this.reader.index -= 4;
          var t3 = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + i2.pretty(t3) + ", expected " + i2.pretty(e2) + ")");
        }
      }, isSignature: function(e2, t3) {
        var r2 = this.reader.index;
        this.reader.setIndex(e2);
        var n3 = this.reader.readString(4) === t3;
        return this.reader.setIndex(r2), n3;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var e2 = this.reader.readData(this.zipCommentLength), t3 = o2.uint8array ? "uint8array" : "array", r2 = i2.transformTo(t3, e2);
        this.zipComment = this.loadOptions.decodeFileName(r2);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var e2, t3, r2, n3 = this.zip64EndOfCentralSize - 44; 0 < n3; ) e2 = this.reader.readInt(2), t3 = this.reader.readInt(4), r2 = this.reader.readData(t3), this.zip64ExtensibleData[e2] = { id: e2, length: t3, value: r2 };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var e2, t3;
        for (e2 = 0; e2 < this.files.length; e2++) t3 = this.files[e2], this.reader.setIndex(t3.localHeaderOffset), this.checkSignature(s2.LOCAL_FILE_HEADER), t3.readLocalPart(this.reader), t3.handleUTF8(), t3.processAttributes();
      }, readCentralDir: function() {
        var e2;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s2.CENTRAL_FILE_HEADER); ) (e2 = new a2({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var e2 = this.reader.lastIndexOfSignature(s2.CENTRAL_DIRECTORY_END);
        if (e2 < 0) throw !this.isSignature(0, s2.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
        this.reader.setIndex(e2);
        var t3 = e2;
        if (this.checkSignature(s2.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i2.MAX_VALUE_16BITS || this.centralDirRecords === i2.MAX_VALUE_16BITS || this.centralDirSize === i2.MAX_VALUE_32BITS || this.centralDirOffset === i2.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s2.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(e2), this.checkSignature(s2.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s2.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s2.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s2.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var r2 = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
        var n3 = t3 - r2;
        if (0 < n3) this.isSignature(t3, s2.CENTRAL_FILE_HEADER) || (this.reader.zero = n3);
        else if (n3 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n3) + " bytes.");
      }, prepareReader: function(e2) {
        this.reader = n2(e2);
      }, load: function(e2) {
        this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, t2.exports = h2;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t2, r) {
      var n2 = e("./reader/readerFor"), s2 = e("./utils"), i2 = e("./compressedObject"), a2 = e("./crc32"), o2 = e("./utf8"), h2 = e("./compressions"), u2 = e("./support");
      function l2(e2, t3) {
        this.options = e2, this.loadOptions = t3;
      }
      l2.prototype = { isEncrypted: function() {
        return 1 == (1 & this.bitFlag);
      }, useUTF8: function() {
        return 2048 == (2048 & this.bitFlag);
      }, readLocalPart: function(e2) {
        var t3, r2;
        if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if (null === (t3 = function(e3) {
          for (var t4 in h2) if (Object.prototype.hasOwnProperty.call(h2, t4) && h2[t4].magic === e3) return h2[t4];
          return null;
        }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s2.pretty(this.compressionMethod) + " unknown (inner file : " + s2.transformTo("string", this.fileName) + ")");
        this.decompressed = new i2(this.compressedSize, this.uncompressedSize, this.crc32, t3, e2.readData(this.compressedSize));
      }, readCentralPart: function(e2) {
        this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
        var t3 = e2.readInt(2);
        if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        e2.skip(t3), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var e2 = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var e2 = n2(this.extraFields[1].value);
          this.uncompressedSize === s2.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s2.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s2.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s2.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
        }
      }, readExtraFields: function(e2) {
        var t3, r2, n3, i3 = e2.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i3; ) t3 = e2.readInt(2), r2 = e2.readInt(2), n3 = e2.readData(r2), this.extraFields[t3] = { id: t3, length: r2, value: n3 };
        e2.setIndex(i3);
      }, handleUTF8: function() {
        var e2 = u2.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = o2.utf8decode(this.fileName), this.fileCommentStr = o2.utf8decode(this.fileComment);
        else {
          var t3 = this.findExtraFieldUnicodePath();
          if (null !== t3) this.fileNameStr = t3;
          else {
            var r2 = s2.transformTo(e2, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(r2);
          }
          var n3 = this.findExtraFieldUnicodeComment();
          if (null !== n3) this.fileCommentStr = n3;
          else {
            var i3 = s2.transformTo(e2, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(i3);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var e2 = this.extraFields[28789];
        if (e2) {
          var t3 = n2(e2.value);
          return 1 !== t3.readInt(1) ? null : a2(this.fileName) !== t3.readInt(4) ? null : o2.utf8decode(t3.readData(e2.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var e2 = this.extraFields[25461];
        if (e2) {
          var t3 = n2(e2.value);
          return 1 !== t3.readInt(1) ? null : a2(this.fileComment) !== t3.readInt(4) ? null : o2.utf8decode(t3.readData(e2.length - 5));
        }
        return null;
      } }, t2.exports = l2;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t2, r) {
      function n2(e2, t3, r2) {
        this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t3, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
      }
      var s2 = e("./stream/StreamHelper"), i2 = e("./stream/DataWorker"), a2 = e("./utf8"), o2 = e("./compressedObject"), h2 = e("./stream/GenericWorker");
      n2.prototype = { internalStream: function(e2) {
        var t3 = null, r2 = "string";
        try {
          if (!e2) throw new Error("No output type specified.");
          var n3 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
          "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t3 = this._decompressWorker();
          var i3 = !this._dataBinary;
          i3 && !n3 && (t3 = t3.pipe(new a2.Utf8EncodeWorker())), !i3 && n3 && (t3 = t3.pipe(new a2.Utf8DecodeWorker()));
        } catch (e3) {
          (t3 = new h2("error")).error(e3);
        }
        return new s2(t3, r2, "");
      }, async: function(e2, t3) {
        return this.internalStream(e2).accumulate(t3);
      }, nodeStream: function(e2, t3) {
        return this.internalStream(e2 || "nodebuffer").toNodejsStream(t3);
      }, _compressWorker: function(e2, t3) {
        if (this._data instanceof o2 && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
        var r2 = this._decompressWorker();
        return this._dataBinary || (r2 = r2.pipe(new a2.Utf8EncodeWorker())), o2.createWorkerFrom(r2, e2, t3);
      }, _decompressWorker: function() {
        return this._data instanceof o2 ? this._data.getContentWorker() : this._data instanceof h2 ? this._data : new i2(this._data);
      } };
      for (var u2 = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l2 = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, f2 = 0; f2 < u2.length; f2++) n2.prototype[u2[f2]] = l2;
      t2.exports = n2;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l2, t2) {
      (function(t3) {
        var r, n2, e2 = t3.MutationObserver || t3.WebKitMutationObserver;
        if (e2) {
          var i2 = 0, s2 = new e2(u2), a2 = t3.document.createTextNode("");
          s2.observe(a2, { characterData: true }), r = function() {
            a2.data = i2 = ++i2 % 2;
          };
        } else if (t3.setImmediate || void 0 === t3.MessageChannel) r = "document" in t3 && "onreadystatechange" in t3.document.createElement("script") ? function() {
          var e3 = t3.document.createElement("script");
          e3.onreadystatechange = function() {
            u2(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
          }, t3.document.documentElement.appendChild(e3);
        } : function() {
          setTimeout(u2, 0);
        };
        else {
          var o2 = new t3.MessageChannel();
          o2.port1.onmessage = u2, r = function() {
            o2.port2.postMessage(0);
          };
        }
        var h2 = [];
        function u2() {
          var e3, t4;
          n2 = true;
          for (var r2 = h2.length; r2; ) {
            for (t4 = h2, h2 = [], e3 = -1; ++e3 < r2; ) t4[e3]();
            r2 = h2.length;
          }
          n2 = false;
        }
        l2.exports = function(e3) {
          1 !== h2.push(e3) || n2 || r();
        };
      }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}], 37: [function(e, t2, r) {
      var i2 = e("immediate");
      function u2() {
      }
      var l2 = {}, s2 = ["REJECTED"], a2 = ["FULFILLED"], n2 = ["PENDING"];
      function o2(e2) {
        if ("function" != typeof e2) throw new TypeError("resolver must be a function");
        this.state = n2, this.queue = [], this.outcome = void 0, e2 !== u2 && d2(this, e2);
      }
      function h2(e2, t3, r2) {
        this.promise = e2, "function" == typeof t3 && (this.onFulfilled = t3, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
      }
      function f2(t3, r2, n3) {
        i2(function() {
          var e2;
          try {
            e2 = r2(n3);
          } catch (e3) {
            return l2.reject(t3, e3);
          }
          e2 === t3 ? l2.reject(t3, new TypeError("Cannot resolve promise with itself")) : l2.resolve(t3, e2);
        });
      }
      function c2(e2) {
        var t3 = e2 && e2.then;
        if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t3) return function() {
          t3.apply(e2, arguments);
        };
      }
      function d2(t3, e2) {
        var r2 = false;
        function n3(e3) {
          r2 || (r2 = true, l2.reject(t3, e3));
        }
        function i3(e3) {
          r2 || (r2 = true, l2.resolve(t3, e3));
        }
        var s3 = p2(function() {
          e2(i3, n3);
        });
        "error" === s3.status && n3(s3.value);
      }
      function p2(e2, t3) {
        var r2 = {};
        try {
          r2.value = e2(t3), r2.status = "success";
        } catch (e3) {
          r2.status = "error", r2.value = e3;
        }
        return r2;
      }
      (t2.exports = o2).prototype.finally = function(t3) {
        if ("function" != typeof t3) return this;
        var r2 = this.constructor;
        return this.then(function(e2) {
          return r2.resolve(t3()).then(function() {
            return e2;
          });
        }, function(e2) {
          return r2.resolve(t3()).then(function() {
            throw e2;
          });
        });
      }, o2.prototype.catch = function(e2) {
        return this.then(null, e2);
      }, o2.prototype.then = function(e2, t3) {
        if ("function" != typeof e2 && this.state === a2 || "function" != typeof t3 && this.state === s2) return this;
        var r2 = new this.constructor(u2);
        this.state !== n2 ? f2(r2, this.state === a2 ? e2 : t3, this.outcome) : this.queue.push(new h2(r2, e2, t3));
        return r2;
      }, h2.prototype.callFulfilled = function(e2) {
        l2.resolve(this.promise, e2);
      }, h2.prototype.otherCallFulfilled = function(e2) {
        f2(this.promise, this.onFulfilled, e2);
      }, h2.prototype.callRejected = function(e2) {
        l2.reject(this.promise, e2);
      }, h2.prototype.otherCallRejected = function(e2) {
        f2(this.promise, this.onRejected, e2);
      }, l2.resolve = function(e2, t3) {
        var r2 = p2(c2, t3);
        if ("error" === r2.status) return l2.reject(e2, r2.value);
        var n3 = r2.value;
        if (n3) d2(e2, n3);
        else {
          e2.state = a2, e2.outcome = t3;
          for (var i3 = -1, s3 = e2.queue.length; ++i3 < s3; ) e2.queue[i3].callFulfilled(t3);
        }
        return e2;
      }, l2.reject = function(e2, t3) {
        e2.state = s2, e2.outcome = t3;
        for (var r2 = -1, n3 = e2.queue.length; ++r2 < n3; ) e2.queue[r2].callRejected(t3);
        return e2;
      }, o2.resolve = function(e2) {
        if (e2 instanceof this) return e2;
        return l2.resolve(new this(u2), e2);
      }, o2.reject = function(e2) {
        var t3 = new this(u2);
        return l2.reject(t3, e2);
      }, o2.all = function(e2) {
        var r2 = this;
        if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
        var n3 = e2.length, i3 = false;
        if (!n3) return this.resolve([]);
        var s3 = new Array(n3), a3 = 0, t3 = -1, o3 = new this(u2);
        for (; ++t3 < n3; ) h3(e2[t3], t3);
        return o3;
        function h3(e3, t4) {
          r2.resolve(e3).then(function(e4) {
            s3[t4] = e4, ++a3 !== n3 || i3 || (i3 = true, l2.resolve(o3, s3));
          }, function(e4) {
            i3 || (i3 = true, l2.reject(o3, e4));
          });
        }
      }, o2.race = function(e2) {
        var t3 = this;
        if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
        var r2 = e2.length, n3 = false;
        if (!r2) return this.resolve([]);
        var i3 = -1, s3 = new this(u2);
        for (; ++i3 < r2; ) a3 = e2[i3], t3.resolve(a3).then(function(e3) {
          n3 || (n3 = true, l2.resolve(s3, e3));
        }, function(e3) {
          n3 || (n3 = true, l2.reject(s3, e3));
        });
        var a3;
        return s3;
      };
    }, { immediate: 36 }], 38: [function(e, t2, r) {
      var n2 = {};
      (0, e("./lib/utils/common").assign)(n2, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t2.exports = n2;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t2, r) {
      var a2 = e("./zlib/deflate"), o2 = e("./utils/common"), h2 = e("./utils/strings"), i2 = e("./zlib/messages"), s2 = e("./zlib/zstream"), u2 = Object.prototype.toString, l2 = 0, f2 = -1, c2 = 0, d2 = 8;
      function p2(e2) {
        if (!(this instanceof p2)) return new p2(e2);
        this.options = o2.assign({ level: f2, method: d2, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c2, to: "" }, e2 || {});
        var t3 = this.options;
        t3.raw && 0 < t3.windowBits ? t3.windowBits = -t3.windowBits : t3.gzip && 0 < t3.windowBits && t3.windowBits < 16 && (t3.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s2(), this.strm.avail_out = 0;
        var r2 = a2.deflateInit2(this.strm, t3.level, t3.method, t3.windowBits, t3.memLevel, t3.strategy);
        if (r2 !== l2) throw new Error(i2[r2]);
        if (t3.header && a2.deflateSetHeader(this.strm, t3.header), t3.dictionary) {
          var n3;
          if (n3 = "string" == typeof t3.dictionary ? h2.string2buf(t3.dictionary) : "[object ArrayBuffer]" === u2.call(t3.dictionary) ? new Uint8Array(t3.dictionary) : t3.dictionary, (r2 = a2.deflateSetDictionary(this.strm, n3)) !== l2) throw new Error(i2[r2]);
          this._dict_set = true;
        }
      }
      function n2(e2, t3) {
        var r2 = new p2(t3);
        if (r2.push(e2, true), r2.err) throw r2.msg || i2[r2.err];
        return r2.result;
      }
      p2.prototype.push = function(e2, t3) {
        var r2, n3, i3 = this.strm, s3 = this.options.chunkSize;
        if (this.ended) return false;
        n3 = t3 === ~~t3 ? t3 : true === t3 ? 4 : 0, "string" == typeof e2 ? i3.input = h2.string2buf(e2) : "[object ArrayBuffer]" === u2.call(e2) ? i3.input = new Uint8Array(e2) : i3.input = e2, i3.next_in = 0, i3.avail_in = i3.input.length;
        do {
          if (0 === i3.avail_out && (i3.output = new o2.Buf8(s3), i3.next_out = 0, i3.avail_out = s3), 1 !== (r2 = a2.deflate(i3, n3)) && r2 !== l2) return this.onEnd(r2), !(this.ended = true);
          0 !== i3.avail_out && (0 !== i3.avail_in || 4 !== n3 && 2 !== n3) || ("string" === this.options.to ? this.onData(h2.buf2binstring(o2.shrinkBuf(i3.output, i3.next_out))) : this.onData(o2.shrinkBuf(i3.output, i3.next_out)));
        } while ((0 < i3.avail_in || 0 === i3.avail_out) && 1 !== r2);
        return 4 === n3 ? (r2 = a2.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l2) : 2 !== n3 || (this.onEnd(l2), !(i3.avail_out = 0));
      }, p2.prototype.onData = function(e2) {
        this.chunks.push(e2);
      }, p2.prototype.onEnd = function(e2) {
        e2 === l2 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o2.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
      }, r.Deflate = p2, r.deflate = n2, r.deflateRaw = function(e2, t3) {
        return (t3 = t3 || {}).raw = true, n2(e2, t3);
      }, r.gzip = function(e2, t3) {
        return (t3 = t3 || {}).gzip = true, n2(e2, t3);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t2, r) {
      var c2 = e("./zlib/inflate"), d2 = e("./utils/common"), p2 = e("./utils/strings"), m2 = e("./zlib/constants"), n2 = e("./zlib/messages"), i2 = e("./zlib/zstream"), s2 = e("./zlib/gzheader"), _2 = Object.prototype.toString;
      function a2(e2) {
        if (!(this instanceof a2)) return new a2(e2);
        this.options = d2.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
        var t3 = this.options;
        t3.raw && 0 <= t3.windowBits && t3.windowBits < 16 && (t3.windowBits = -t3.windowBits, 0 === t3.windowBits && (t3.windowBits = -15)), !(0 <= t3.windowBits && t3.windowBits < 16) || e2 && e2.windowBits || (t3.windowBits += 32), 15 < t3.windowBits && t3.windowBits < 48 && 0 == (15 & t3.windowBits) && (t3.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i2(), this.strm.avail_out = 0;
        var r2 = c2.inflateInit2(this.strm, t3.windowBits);
        if (r2 !== m2.Z_OK) throw new Error(n2[r2]);
        this.header = new s2(), c2.inflateGetHeader(this.strm, this.header);
      }
      function o2(e2, t3) {
        var r2 = new a2(t3);
        if (r2.push(e2, true), r2.err) throw r2.msg || n2[r2.err];
        return r2.result;
      }
      a2.prototype.push = function(e2, t3) {
        var r2, n3, i3, s3, a3, o3, h2 = this.strm, u2 = this.options.chunkSize, l2 = this.options.dictionary, f2 = false;
        if (this.ended) return false;
        n3 = t3 === ~~t3 ? t3 : true === t3 ? m2.Z_FINISH : m2.Z_NO_FLUSH, "string" == typeof e2 ? h2.input = p2.binstring2buf(e2) : "[object ArrayBuffer]" === _2.call(e2) ? h2.input = new Uint8Array(e2) : h2.input = e2, h2.next_in = 0, h2.avail_in = h2.input.length;
        do {
          if (0 === h2.avail_out && (h2.output = new d2.Buf8(u2), h2.next_out = 0, h2.avail_out = u2), (r2 = c2.inflate(h2, m2.Z_NO_FLUSH)) === m2.Z_NEED_DICT && l2 && (o3 = "string" == typeof l2 ? p2.string2buf(l2) : "[object ArrayBuffer]" === _2.call(l2) ? new Uint8Array(l2) : l2, r2 = c2.inflateSetDictionary(this.strm, o3)), r2 === m2.Z_BUF_ERROR && true === f2 && (r2 = m2.Z_OK, f2 = false), r2 !== m2.Z_STREAM_END && r2 !== m2.Z_OK) return this.onEnd(r2), !(this.ended = true);
          h2.next_out && (0 !== h2.avail_out && r2 !== m2.Z_STREAM_END && (0 !== h2.avail_in || n3 !== m2.Z_FINISH && n3 !== m2.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i3 = p2.utf8border(h2.output, h2.next_out), s3 = h2.next_out - i3, a3 = p2.buf2string(h2.output, i3), h2.next_out = s3, h2.avail_out = u2 - s3, s3 && d2.arraySet(h2.output, h2.output, i3, s3, 0), this.onData(a3)) : this.onData(d2.shrinkBuf(h2.output, h2.next_out)))), 0 === h2.avail_in && 0 === h2.avail_out && (f2 = true);
        } while ((0 < h2.avail_in || 0 === h2.avail_out) && r2 !== m2.Z_STREAM_END);
        return r2 === m2.Z_STREAM_END && (n3 = m2.Z_FINISH), n3 === m2.Z_FINISH ? (r2 = c2.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m2.Z_OK) : n3 !== m2.Z_SYNC_FLUSH || (this.onEnd(m2.Z_OK), !(h2.avail_out = 0));
      }, a2.prototype.onData = function(e2) {
        this.chunks.push(e2);
      }, a2.prototype.onEnd = function(e2) {
        e2 === m2.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d2.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
      }, r.Inflate = a2, r.inflate = o2, r.inflateRaw = function(e2, t3) {
        return (t3 = t3 || {}).raw = true, o2(e2, t3);
      }, r.ungzip = o2;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t2, r) {
      var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      r.assign = function(e2) {
        for (var t3 = Array.prototype.slice.call(arguments, 1); t3.length; ) {
          var r2 = t3.shift();
          if (r2) {
            if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
            for (var n3 in r2) r2.hasOwnProperty(n3) && (e2[n3] = r2[n3]);
          }
        }
        return e2;
      }, r.shrinkBuf = function(e2, t3) {
        return e2.length === t3 ? e2 : e2.subarray ? e2.subarray(0, t3) : (e2.length = t3, e2);
      };
      var i2 = { arraySet: function(e2, t3, r2, n3, i3) {
        if (t3.subarray && e2.subarray) e2.set(t3.subarray(r2, r2 + n3), i3);
        else for (var s3 = 0; s3 < n3; s3++) e2[i3 + s3] = t3[r2 + s3];
      }, flattenChunks: function(e2) {
        var t3, r2, n3, i3, s3, a2;
        for (t3 = n3 = 0, r2 = e2.length; t3 < r2; t3++) n3 += e2[t3].length;
        for (a2 = new Uint8Array(n3), t3 = i3 = 0, r2 = e2.length; t3 < r2; t3++) s3 = e2[t3], a2.set(s3, i3), i3 += s3.length;
        return a2;
      } }, s2 = { arraySet: function(e2, t3, r2, n3, i3) {
        for (var s3 = 0; s3 < n3; s3++) e2[i3 + s3] = t3[r2 + s3];
      }, flattenChunks: function(e2) {
        return [].concat.apply([], e2);
      } };
      r.setTyped = function(e2) {
        e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i2)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s2));
      }, r.setTyped(n2);
    }, {}], 42: [function(e, t2, r) {
      var h2 = e("./common"), i2 = true, s2 = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e2) {
        i2 = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e2) {
        s2 = false;
      }
      for (var u2 = new h2.Buf8(256), n2 = 0; n2 < 256; n2++) u2[n2] = 252 <= n2 ? 6 : 248 <= n2 ? 5 : 240 <= n2 ? 4 : 224 <= n2 ? 3 : 192 <= n2 ? 2 : 1;
      function l2(e2, t3) {
        if (t3 < 65537 && (e2.subarray && s2 || !e2.subarray && i2)) return String.fromCharCode.apply(null, h2.shrinkBuf(e2, t3));
        for (var r2 = "", n3 = 0; n3 < t3; n3++) r2 += String.fromCharCode(e2[n3]);
        return r2;
      }
      u2[254] = u2[254] = 1, r.string2buf = function(e2) {
        var t3, r2, n3, i3, s3, a2 = e2.length, o2 = 0;
        for (i3 = 0; i3 < a2; i3++) 55296 == (64512 & (r2 = e2.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
        for (t3 = new h2.Buf8(o2), i3 = s3 = 0; s3 < o2; i3++) 55296 == (64512 & (r2 = e2.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), r2 < 128 ? t3[s3++] = r2 : (r2 < 2048 ? t3[s3++] = 192 | r2 >>> 6 : (r2 < 65536 ? t3[s3++] = 224 | r2 >>> 12 : (t3[s3++] = 240 | r2 >>> 18, t3[s3++] = 128 | r2 >>> 12 & 63), t3[s3++] = 128 | r2 >>> 6 & 63), t3[s3++] = 128 | 63 & r2);
        return t3;
      }, r.buf2binstring = function(e2) {
        return l2(e2, e2.length);
      }, r.binstring2buf = function(e2) {
        for (var t3 = new h2.Buf8(e2.length), r2 = 0, n3 = t3.length; r2 < n3; r2++) t3[r2] = e2.charCodeAt(r2);
        return t3;
      }, r.buf2string = function(e2, t3) {
        var r2, n3, i3, s3, a2 = t3 || e2.length, o2 = new Array(2 * a2);
        for (r2 = n3 = 0; r2 < a2; ) if ((i3 = e2[r2++]) < 128) o2[n3++] = i3;
        else if (4 < (s3 = u2[i3])) o2[n3++] = 65533, r2 += s3 - 1;
        else {
          for (i3 &= 2 === s3 ? 31 : 3 === s3 ? 15 : 7; 1 < s3 && r2 < a2; ) i3 = i3 << 6 | 63 & e2[r2++], s3--;
          1 < s3 ? o2[n3++] = 65533 : i3 < 65536 ? o2[n3++] = i3 : (i3 -= 65536, o2[n3++] = 55296 | i3 >> 10 & 1023, o2[n3++] = 56320 | 1023 & i3);
        }
        return l2(o2, n3);
      }, r.utf8border = function(e2, t3) {
        var r2;
        for ((t3 = t3 || e2.length) > e2.length && (t3 = e2.length), r2 = t3 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
        return r2 < 0 ? t3 : 0 === r2 ? t3 : r2 + u2[e2[r2]] > t3 ? r2 : t3;
      };
    }, { "./common": 41 }], 43: [function(e, t2, r) {
      t2.exports = function(e2, t3, r2, n2) {
        for (var i2 = 65535 & e2 | 0, s2 = e2 >>> 16 & 65535 | 0, a2 = 0; 0 !== r2; ) {
          for (r2 -= a2 = 2e3 < r2 ? 2e3 : r2; s2 = s2 + (i2 = i2 + t3[n2++] | 0) | 0, --a2; ) ;
          i2 %= 65521, s2 %= 65521;
        }
        return i2 | s2 << 16 | 0;
      };
    }, {}], 44: [function(e, t2, r) {
      t2.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(e, t2, r) {
      var o2 = function() {
        for (var e2, t3 = [], r2 = 0; r2 < 256; r2++) {
          e2 = r2;
          for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
          t3[r2] = e2;
        }
        return t3;
      }();
      t2.exports = function(e2, t3, r2, n2) {
        var i2 = o2, s2 = n2 + r2;
        e2 ^= -1;
        for (var a2 = n2; a2 < s2; a2++) e2 = e2 >>> 8 ^ i2[255 & (e2 ^ t3[a2])];
        return -1 ^ e2;
      };
    }, {}], 46: [function(e, t2, r) {
      var h2, c2 = e("../utils/common"), u2 = e("./trees"), d2 = e("./adler32"), p2 = e("./crc32"), n2 = e("./messages"), l2 = 0, f2 = 4, m2 = 0, _2 = -2, g2 = -1, b2 = 4, i2 = 2, v2 = 8, y2 = 9, s2 = 286, a2 = 30, o2 = 19, w2 = 2 * s2 + 1, k2 = 15, x2 = 3, S2 = 258, z2 = S2 + x2 + 1, C2 = 42, E2 = 113, A2 = 1, I2 = 2, O2 = 3, B2 = 4;
      function R2(e2, t3) {
        return e2.msg = n2[t3], t3;
      }
      function T2(e2) {
        return (e2 << 1) - (4 < e2 ? 9 : 0);
      }
      function D2(e2) {
        for (var t3 = e2.length; 0 <= --t3; ) e2[t3] = 0;
      }
      function F2(e2) {
        var t3 = e2.state, r2 = t3.pending;
        r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c2.arraySet(e2.output, t3.pending_buf, t3.pending_out, r2, e2.next_out), e2.next_out += r2, t3.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t3.pending -= r2, 0 === t3.pending && (t3.pending_out = 0));
      }
      function N2(e2, t3) {
        u2._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t3), e2.block_start = e2.strstart, F2(e2.strm);
      }
      function U2(e2, t3) {
        e2.pending_buf[e2.pending++] = t3;
      }
      function P2(e2, t3) {
        e2.pending_buf[e2.pending++] = t3 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t3;
      }
      function L2(e2, t3) {
        var r2, n3, i3 = e2.max_chain_length, s3 = e2.strstart, a3 = e2.prev_length, o3 = e2.nice_match, h3 = e2.strstart > e2.w_size - z2 ? e2.strstart - (e2.w_size - z2) : 0, u3 = e2.window, l3 = e2.w_mask, f3 = e2.prev, c3 = e2.strstart + S2, d3 = u3[s3 + a3 - 1], p3 = u3[s3 + a3];
        e2.prev_length >= e2.good_match && (i3 >>= 2), o3 > e2.lookahead && (o3 = e2.lookahead);
        do {
          if (u3[(r2 = t3) + a3] === p3 && u3[r2 + a3 - 1] === d3 && u3[r2] === u3[s3] && u3[++r2] === u3[s3 + 1]) {
            s3 += 2, r2++;
            do {
            } while (u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && u3[++s3] === u3[++r2] && s3 < c3);
            if (n3 = S2 - (c3 - s3), s3 = c3 - S2, a3 < n3) {
              if (e2.match_start = t3, o3 <= (a3 = n3)) break;
              d3 = u3[s3 + a3 - 1], p3 = u3[s3 + a3];
            }
          }
        } while ((t3 = f3[t3 & l3]) > h3 && 0 != --i3);
        return a3 <= e2.lookahead ? a3 : e2.lookahead;
      }
      function j2(e2) {
        var t3, r2, n3, i3, s3, a3, o3, h3, u3, l3, f3 = e2.w_size;
        do {
          if (i3 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f3 + (f3 - z2)) {
            for (c2.arraySet(e2.window, e2.window, f3, f3, 0), e2.match_start -= f3, e2.strstart -= f3, e2.block_start -= f3, t3 = r2 = e2.hash_size; n3 = e2.head[--t3], e2.head[t3] = f3 <= n3 ? n3 - f3 : 0, --r2; ) ;
            for (t3 = r2 = f3; n3 = e2.prev[--t3], e2.prev[t3] = f3 <= n3 ? n3 - f3 : 0, --r2; ) ;
            i3 += f3;
          }
          if (0 === e2.strm.avail_in) break;
          if (a3 = e2.strm, o3 = e2.window, h3 = e2.strstart + e2.lookahead, u3 = i3, l3 = void 0, l3 = a3.avail_in, u3 < l3 && (l3 = u3), r2 = 0 === l3 ? 0 : (a3.avail_in -= l3, c2.arraySet(o3, a3.input, a3.next_in, l3, h3), 1 === a3.state.wrap ? a3.adler = d2(a3.adler, o3, l3, h3) : 2 === a3.state.wrap && (a3.adler = p2(a3.adler, o3, l3, h3)), a3.next_in += l3, a3.total_in += l3, l3), e2.lookahead += r2, e2.lookahead + e2.insert >= x2) for (s3 = e2.strstart - e2.insert, e2.ins_h = e2.window[s3], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s3 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s3 + x2 - 1]) & e2.hash_mask, e2.prev[s3 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s3, s3++, e2.insert--, !(e2.lookahead + e2.insert < x2)); ) ;
        } while (e2.lookahead < z2 && 0 !== e2.strm.avail_in);
      }
      function Z2(e2, t3) {
        for (var r2, n3; ; ) {
          if (e2.lookahead < z2) {
            if (j2(e2), e2.lookahead < z2 && t3 === l2) return A2;
            if (0 === e2.lookahead) break;
          }
          if (r2 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z2 && (e2.match_length = L2(e2, r2)), e2.match_length >= x2) if (n3 = u2._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x2), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x2) {
            for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
            e2.strstart++;
          } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
          else n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
          if (n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
        }
        return e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t3 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
      }
      function W2(e2, t3) {
        for (var r2, n3, i3; ; ) {
          if (e2.lookahead < z2) {
            if (j2(e2), e2.lookahead < z2 && t3 === l2) return A2;
            if (0 === e2.lookahead) break;
          }
          if (r2 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x2 - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z2 && (e2.match_length = L2(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x2 && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x2 - 1)), e2.prev_length >= x2 && e2.match_length <= e2.prev_length) {
            for (i3 = e2.strstart + e2.lookahead - x2, n3 = u2._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x2), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i3 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
            if (e2.match_available = 0, e2.match_length = x2 - 1, e2.strstart++, n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          } else if (e2.match_available) {
            if ((n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N2(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A2;
          } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
        }
        return e2.match_available && (n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t3 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
      }
      function M2(e2, t3, r2, n3, i3) {
        this.good_length = e2, this.max_lazy = t3, this.nice_length = r2, this.max_chain = n3, this.func = i3;
      }
      function H2() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c2.Buf16(2 * w2), this.dyn_dtree = new c2.Buf16(2 * (2 * a2 + 1)), this.bl_tree = new c2.Buf16(2 * (2 * o2 + 1)), D2(this.dyn_ltree), D2(this.dyn_dtree), D2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c2.Buf16(k2 + 1), this.heap = new c2.Buf16(2 * s2 + 1), D2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c2.Buf16(2 * s2 + 1), D2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function G2(e2) {
        var t3;
        return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i2, (t3 = e2.state).pending = 0, t3.pending_out = 0, t3.wrap < 0 && (t3.wrap = -t3.wrap), t3.status = t3.wrap ? C2 : E2, e2.adler = 2 === t3.wrap ? 0 : 1, t3.last_flush = l2, u2._tr_init(t3), m2) : R2(e2, _2);
      }
      function K2(e2) {
        var t3 = G2(e2);
        return t3 === m2 && function(e3) {
          e3.window_size = 2 * e3.w_size, D2(e3.head), e3.max_lazy_match = h2[e3.level].max_lazy, e3.good_match = h2[e3.level].good_length, e3.nice_match = h2[e3.level].nice_length, e3.max_chain_length = h2[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x2 - 1, e3.match_available = 0, e3.ins_h = 0;
        }(e2.state), t3;
      }
      function Y2(e2, t3, r2, n3, i3, s3) {
        if (!e2) return _2;
        var a3 = 1;
        if (t3 === g2 && (t3 = 6), n3 < 0 ? (a3 = 0, n3 = -n3) : 15 < n3 && (a3 = 2, n3 -= 16), i3 < 1 || y2 < i3 || r2 !== v2 || n3 < 8 || 15 < n3 || t3 < 0 || 9 < t3 || s3 < 0 || b2 < s3) return R2(e2, _2);
        8 === n3 && (n3 = 9);
        var o3 = new H2();
        return (e2.state = o3).strm = e2, o3.wrap = a3, o3.gzhead = null, o3.w_bits = n3, o3.w_size = 1 << o3.w_bits, o3.w_mask = o3.w_size - 1, o3.hash_bits = i3 + 7, o3.hash_size = 1 << o3.hash_bits, o3.hash_mask = o3.hash_size - 1, o3.hash_shift = ~~((o3.hash_bits + x2 - 1) / x2), o3.window = new c2.Buf8(2 * o3.w_size), o3.head = new c2.Buf16(o3.hash_size), o3.prev = new c2.Buf16(o3.w_size), o3.lit_bufsize = 1 << i3 + 6, o3.pending_buf_size = 4 * o3.lit_bufsize, o3.pending_buf = new c2.Buf8(o3.pending_buf_size), o3.d_buf = 1 * o3.lit_bufsize, o3.l_buf = 3 * o3.lit_bufsize, o3.level = t3, o3.strategy = s3, o3.method = r2, K2(e2);
      }
      h2 = [new M2(0, 0, 0, 0, function(e2, t3) {
        var r2 = 65535;
        for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
          if (e2.lookahead <= 1) {
            if (j2(e2), 0 === e2.lookahead && t3 === l2) return A2;
            if (0 === e2.lookahead) break;
          }
          e2.strstart += e2.lookahead, e2.lookahead = 0;
          var n3 = e2.block_start + r2;
          if ((0 === e2.strstart || e2.strstart >= n3) && (e2.lookahead = e2.strstart - n3, e2.strstart = n3, N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          if (e2.strstart - e2.block_start >= e2.w_size - z2 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
        }
        return e2.insert = 0, t3 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : (e2.strstart > e2.block_start && (N2(e2, false), e2.strm.avail_out), A2);
      }), new M2(4, 4, 8, 4, Z2), new M2(4, 5, 16, 8, Z2), new M2(4, 6, 32, 32, Z2), new M2(4, 4, 16, 16, W2), new M2(8, 16, 32, 32, W2), new M2(8, 16, 128, 128, W2), new M2(8, 32, 128, 256, W2), new M2(32, 128, 258, 1024, W2), new M2(32, 258, 258, 4096, W2)], r.deflateInit = function(e2, t3) {
        return Y2(e2, t3, v2, 15, 8, 0);
      }, r.deflateInit2 = Y2, r.deflateReset = K2, r.deflateResetKeep = G2, r.deflateSetHeader = function(e2, t3) {
        return e2 && e2.state ? 2 !== e2.state.wrap ? _2 : (e2.state.gzhead = t3, m2) : _2;
      }, r.deflate = function(e2, t3) {
        var r2, n3, i3, s3;
        if (!e2 || !e2.state || 5 < t3 || t3 < 0) return e2 ? R2(e2, _2) : _2;
        if (n3 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n3.status && t3 !== f2) return R2(e2, 0 === e2.avail_out ? -5 : _2);
        if (n3.strm = e2, r2 = n3.last_flush, n3.last_flush = t3, n3.status === C2) if (2 === n3.wrap) e2.adler = 0, U2(n3, 31), U2(n3, 139), U2(n3, 8), n3.gzhead ? (U2(n3, (n3.gzhead.text ? 1 : 0) + (n3.gzhead.hcrc ? 2 : 0) + (n3.gzhead.extra ? 4 : 0) + (n3.gzhead.name ? 8 : 0) + (n3.gzhead.comment ? 16 : 0)), U2(n3, 255 & n3.gzhead.time), U2(n3, n3.gzhead.time >> 8 & 255), U2(n3, n3.gzhead.time >> 16 & 255), U2(n3, n3.gzhead.time >> 24 & 255), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 255 & n3.gzhead.os), n3.gzhead.extra && n3.gzhead.extra.length && (U2(n3, 255 & n3.gzhead.extra.length), U2(n3, n3.gzhead.extra.length >> 8 & 255)), n3.gzhead.hcrc && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending, 0)), n3.gzindex = 0, n3.status = 69) : (U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 3), n3.status = E2);
        else {
          var a3 = v2 + (n3.w_bits - 8 << 4) << 8;
          a3 |= (2 <= n3.strategy || n3.level < 2 ? 0 : n3.level < 6 ? 1 : 6 === n3.level ? 2 : 3) << 6, 0 !== n3.strstart && (a3 |= 32), a3 += 31 - a3 % 31, n3.status = E2, P2(n3, a3), 0 !== n3.strstart && (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), e2.adler = 1;
        }
        if (69 === n3.status) if (n3.gzhead.extra) {
          for (i3 = n3.pending; n3.gzindex < (65535 & n3.gzhead.extra.length) && (n3.pending !== n3.pending_buf_size || (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending !== n3.pending_buf_size)); ) U2(n3, 255 & n3.gzhead.extra[n3.gzindex]), n3.gzindex++;
          n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), n3.gzindex === n3.gzhead.extra.length && (n3.gzindex = 0, n3.status = 73);
        } else n3.status = 73;
        if (73 === n3.status) if (n3.gzhead.name) {
          i3 = n3.pending;
          do {
            if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
              s3 = 1;
              break;
            }
            s3 = n3.gzindex < n3.gzhead.name.length ? 255 & n3.gzhead.name.charCodeAt(n3.gzindex++) : 0, U2(n3, s3);
          } while (0 !== s3);
          n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s3 && (n3.gzindex = 0, n3.status = 91);
        } else n3.status = 91;
        if (91 === n3.status) if (n3.gzhead.comment) {
          i3 = n3.pending;
          do {
            if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
              s3 = 1;
              break;
            }
            s3 = n3.gzindex < n3.gzhead.comment.length ? 255 & n3.gzhead.comment.charCodeAt(n3.gzindex++) : 0, U2(n3, s3);
          } while (0 !== s3);
          n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s3 && (n3.status = 103);
        } else n3.status = 103;
        if (103 === n3.status && (n3.gzhead.hcrc ? (n3.pending + 2 > n3.pending_buf_size && F2(e2), n3.pending + 2 <= n3.pending_buf_size && (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), e2.adler = 0, n3.status = E2)) : n3.status = E2), 0 !== n3.pending) {
          if (F2(e2), 0 === e2.avail_out) return n3.last_flush = -1, m2;
        } else if (0 === e2.avail_in && T2(t3) <= T2(r2) && t3 !== f2) return R2(e2, -5);
        if (666 === n3.status && 0 !== e2.avail_in) return R2(e2, -5);
        if (0 !== e2.avail_in || 0 !== n3.lookahead || t3 !== l2 && 666 !== n3.status) {
          var o3 = 2 === n3.strategy ? function(e3, t4) {
            for (var r3; ; ) {
              if (0 === e3.lookahead && (j2(e3), 0 === e3.lookahead)) {
                if (t4 === l2) return A2;
                break;
              }
              if (e3.match_length = 0, r3 = u2._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
            }
            return e3.insert = 0, t4 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
          }(n3, t3) : 3 === n3.strategy ? function(e3, t4) {
            for (var r3, n4, i4, s4, a4 = e3.window; ; ) {
              if (e3.lookahead <= S2) {
                if (j2(e3), e3.lookahead <= S2 && t4 === l2) return A2;
                if (0 === e3.lookahead) break;
              }
              if (e3.match_length = 0, e3.lookahead >= x2 && 0 < e3.strstart && (n4 = a4[i4 = e3.strstart - 1]) === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4]) {
                s4 = e3.strstart + S2;
                do {
                } while (n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && n4 === a4[++i4] && i4 < s4);
                e3.match_length = S2 - (s4 - i4), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
              }
              if (e3.match_length >= x2 ? (r3 = u2._tr_tally(e3, 1, e3.match_length - x2), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u2._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
            }
            return e3.insert = 0, t4 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
          }(n3, t3) : h2[n3.level].func(n3, t3);
          if (o3 !== O2 && o3 !== B2 || (n3.status = 666), o3 === A2 || o3 === O2) return 0 === e2.avail_out && (n3.last_flush = -1), m2;
          if (o3 === I2 && (1 === t3 ? u2._tr_align(n3) : 5 !== t3 && (u2._tr_stored_block(n3, 0, 0, false), 3 === t3 && (D2(n3.head), 0 === n3.lookahead && (n3.strstart = 0, n3.block_start = 0, n3.insert = 0))), F2(e2), 0 === e2.avail_out)) return n3.last_flush = -1, m2;
        }
        return t3 !== f2 ? m2 : n3.wrap <= 0 ? 1 : (2 === n3.wrap ? (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), U2(n3, e2.adler >> 16 & 255), U2(n3, e2.adler >> 24 & 255), U2(n3, 255 & e2.total_in), U2(n3, e2.total_in >> 8 & 255), U2(n3, e2.total_in >> 16 & 255), U2(n3, e2.total_in >> 24 & 255)) : (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), F2(e2), 0 < n3.wrap && (n3.wrap = -n3.wrap), 0 !== n3.pending ? m2 : 1);
      }, r.deflateEnd = function(e2) {
        var t3;
        return e2 && e2.state ? (t3 = e2.state.status) !== C2 && 69 !== t3 && 73 !== t3 && 91 !== t3 && 103 !== t3 && t3 !== E2 && 666 !== t3 ? R2(e2, _2) : (e2.state = null, t3 === E2 ? R2(e2, -3) : m2) : _2;
      }, r.deflateSetDictionary = function(e2, t3) {
        var r2, n3, i3, s3, a3, o3, h3, u3, l3 = t3.length;
        if (!e2 || !e2.state) return _2;
        if (2 === (s3 = (r2 = e2.state).wrap) || 1 === s3 && r2.status !== C2 || r2.lookahead) return _2;
        for (1 === s3 && (e2.adler = d2(e2.adler, t3, l3, 0)), r2.wrap = 0, l3 >= r2.w_size && (0 === s3 && (D2(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u3 = new c2.Buf8(r2.w_size), c2.arraySet(u3, t3, l3 - r2.w_size, r2.w_size, 0), t3 = u3, l3 = r2.w_size), a3 = e2.avail_in, o3 = e2.next_in, h3 = e2.input, e2.avail_in = l3, e2.next_in = 0, e2.input = t3, j2(r2); r2.lookahead >= x2; ) {
          for (n3 = r2.strstart, i3 = r2.lookahead - (x2 - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n3 + x2 - 1]) & r2.hash_mask, r2.prev[n3 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n3, n3++, --i3; ) ;
          r2.strstart = n3, r2.lookahead = x2 - 1, j2(r2);
        }
        return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x2 - 1, r2.match_available = 0, e2.next_in = o3, e2.input = h3, e2.avail_in = a3, r2.wrap = s3, m2;
      }, r.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t2, r) {
      t2.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function(e, t2, r) {
      t2.exports = function(e2, t3) {
        var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d2, p2, m2, _2, g2, b2, v2, y2, w2, k2, x2, S2, z2, C2;
        r2 = e2.state, n2 = e2.next_in, z2 = e2.input, i2 = n2 + (e2.avail_in - 5), s2 = e2.next_out, C2 = e2.output, a2 = s2 - (t3 - e2.avail_out), o2 = s2 + (e2.avail_out - 257), h2 = r2.dmax, u2 = r2.wsize, l2 = r2.whave, f2 = r2.wnext, c2 = r2.window, d2 = r2.hold, p2 = r2.bits, m2 = r2.lencode, _2 = r2.distcode, g2 = (1 << r2.lenbits) - 1, b2 = (1 << r2.distbits) - 1;
        e: do {
          p2 < 15 && (d2 += z2[n2++] << p2, p2 += 8, d2 += z2[n2++] << p2, p2 += 8), v2 = m2[d2 & g2];
          t: for (; ; ) {
            if (d2 >>>= y2 = v2 >>> 24, p2 -= y2, 0 === (y2 = v2 >>> 16 & 255)) C2[s2++] = 65535 & v2;
            else {
              if (!(16 & y2)) {
                if (0 == (64 & y2)) {
                  v2 = m2[(65535 & v2) + (d2 & (1 << y2) - 1)];
                  continue t;
                }
                if (32 & y2) {
                  r2.mode = 12;
                  break e;
                }
                e2.msg = "invalid literal/length code", r2.mode = 30;
                break e;
              }
              w2 = 65535 & v2, (y2 &= 15) && (p2 < y2 && (d2 += z2[n2++] << p2, p2 += 8), w2 += d2 & (1 << y2) - 1, d2 >>>= y2, p2 -= y2), p2 < 15 && (d2 += z2[n2++] << p2, p2 += 8, d2 += z2[n2++] << p2, p2 += 8), v2 = _2[d2 & b2];
              r: for (; ; ) {
                if (d2 >>>= y2 = v2 >>> 24, p2 -= y2, !(16 & (y2 = v2 >>> 16 & 255))) {
                  if (0 == (64 & y2)) {
                    v2 = _2[(65535 & v2) + (d2 & (1 << y2) - 1)];
                    continue r;
                  }
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break e;
                }
                if (k2 = 65535 & v2, p2 < (y2 &= 15) && (d2 += z2[n2++] << p2, (p2 += 8) < y2 && (d2 += z2[n2++] << p2, p2 += 8)), h2 < (k2 += d2 & (1 << y2) - 1)) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break e;
                }
                if (d2 >>>= y2, p2 -= y2, (y2 = s2 - a2) < k2) {
                  if (l2 < (y2 = k2 - y2) && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break e;
                  }
                  if (S2 = c2, (x2 = 0) === f2) {
                    if (x2 += u2 - y2, y2 < w2) {
                      for (w2 -= y2; C2[s2++] = c2[x2++], --y2; ) ;
                      x2 = s2 - k2, S2 = C2;
                    }
                  } else if (f2 < y2) {
                    if (x2 += u2 + f2 - y2, (y2 -= f2) < w2) {
                      for (w2 -= y2; C2[s2++] = c2[x2++], --y2; ) ;
                      if (x2 = 0, f2 < w2) {
                        for (w2 -= y2 = f2; C2[s2++] = c2[x2++], --y2; ) ;
                        x2 = s2 - k2, S2 = C2;
                      }
                    }
                  } else if (x2 += f2 - y2, y2 < w2) {
                    for (w2 -= y2; C2[s2++] = c2[x2++], --y2; ) ;
                    x2 = s2 - k2, S2 = C2;
                  }
                  for (; 2 < w2; ) C2[s2++] = S2[x2++], C2[s2++] = S2[x2++], C2[s2++] = S2[x2++], w2 -= 3;
                  w2 && (C2[s2++] = S2[x2++], 1 < w2 && (C2[s2++] = S2[x2++]));
                } else {
                  for (x2 = s2 - k2; C2[s2++] = C2[x2++], C2[s2++] = C2[x2++], C2[s2++] = C2[x2++], 2 < (w2 -= 3); ) ;
                  w2 && (C2[s2++] = C2[x2++], 1 < w2 && (C2[s2++] = C2[x2++]));
                }
                break;
              }
            }
            break;
          }
        } while (n2 < i2 && s2 < o2);
        n2 -= w2 = p2 >> 3, d2 &= (1 << (p2 -= w2 << 3)) - 1, e2.next_in = n2, e2.next_out = s2, e2.avail_in = n2 < i2 ? i2 - n2 + 5 : 5 - (n2 - i2), e2.avail_out = s2 < o2 ? o2 - s2 + 257 : 257 - (s2 - o2), r2.hold = d2, r2.bits = p2;
      };
    }, {}], 49: [function(e, t2, r) {
      var I2 = e("../utils/common"), O2 = e("./adler32"), B2 = e("./crc32"), R2 = e("./inffast"), T2 = e("./inftrees"), D2 = 1, F2 = 2, N2 = 0, U2 = -2, P2 = 1, n2 = 852, i2 = 592;
      function L2(e2) {
        return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
      }
      function s2() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I2.Buf16(320), this.work = new I2.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function a2(e2) {
        var t3;
        return e2 && e2.state ? (t3 = e2.state, e2.total_in = e2.total_out = t3.total = 0, e2.msg = "", t3.wrap && (e2.adler = 1 & t3.wrap), t3.mode = P2, t3.last = 0, t3.havedict = 0, t3.dmax = 32768, t3.head = null, t3.hold = 0, t3.bits = 0, t3.lencode = t3.lendyn = new I2.Buf32(n2), t3.distcode = t3.distdyn = new I2.Buf32(i2), t3.sane = 1, t3.back = -1, N2) : U2;
      }
      function o2(e2) {
        var t3;
        return e2 && e2.state ? ((t3 = e2.state).wsize = 0, t3.whave = 0, t3.wnext = 0, a2(e2)) : U2;
      }
      function h2(e2, t3) {
        var r2, n3;
        return e2 && e2.state ? (n3 = e2.state, t3 < 0 ? (r2 = 0, t3 = -t3) : (r2 = 1 + (t3 >> 4), t3 < 48 && (t3 &= 15)), t3 && (t3 < 8 || 15 < t3) ? U2 : (null !== n3.window && n3.wbits !== t3 && (n3.window = null), n3.wrap = r2, n3.wbits = t3, o2(e2))) : U2;
      }
      function u2(e2, t3) {
        var r2, n3;
        return e2 ? (n3 = new s2(), (e2.state = n3).window = null, (r2 = h2(e2, t3)) !== N2 && (e2.state = null), r2) : U2;
      }
      var l2, f2, c2 = true;
      function j2(e2) {
        if (c2) {
          var t3;
          for (l2 = new I2.Buf32(512), f2 = new I2.Buf32(32), t3 = 0; t3 < 144; ) e2.lens[t3++] = 8;
          for (; t3 < 256; ) e2.lens[t3++] = 9;
          for (; t3 < 280; ) e2.lens[t3++] = 7;
          for (; t3 < 288; ) e2.lens[t3++] = 8;
          for (T2(D2, e2.lens, 0, 288, l2, 0, e2.work, { bits: 9 }), t3 = 0; t3 < 32; ) e2.lens[t3++] = 5;
          T2(F2, e2.lens, 0, 32, f2, 0, e2.work, { bits: 5 }), c2 = false;
        }
        e2.lencode = l2, e2.lenbits = 9, e2.distcode = f2, e2.distbits = 5;
      }
      function Z2(e2, t3, r2, n3) {
        var i3, s3 = e2.state;
        return null === s3.window && (s3.wsize = 1 << s3.wbits, s3.wnext = 0, s3.whave = 0, s3.window = new I2.Buf8(s3.wsize)), n3 >= s3.wsize ? (I2.arraySet(s3.window, t3, r2 - s3.wsize, s3.wsize, 0), s3.wnext = 0, s3.whave = s3.wsize) : (n3 < (i3 = s3.wsize - s3.wnext) && (i3 = n3), I2.arraySet(s3.window, t3, r2 - n3, i3, s3.wnext), (n3 -= i3) ? (I2.arraySet(s3.window, t3, r2 - n3, n3, 0), s3.wnext = n3, s3.whave = s3.wsize) : (s3.wnext += i3, s3.wnext === s3.wsize && (s3.wnext = 0), s3.whave < s3.wsize && (s3.whave += i3))), 0;
      }
      r.inflateReset = o2, r.inflateReset2 = h2, r.inflateResetKeep = a2, r.inflateInit = function(e2) {
        return u2(e2, 15);
      }, r.inflateInit2 = u2, r.inflate = function(e2, t3) {
        var r2, n3, i3, s3, a3, o3, h3, u3, l3, f3, c3, d2, p2, m2, _2, g2, b2, v2, y2, w2, k2, x2, S2, z2, C2 = 0, E2 = new I2.Buf8(4), A2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U2;
        12 === (r2 = e2.state).mode && (r2.mode = 13), a3 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s3 = e2.next_in, n3 = e2.input, o3 = e2.avail_in, u3 = r2.hold, l3 = r2.bits, f3 = o3, c3 = h3, x2 = N2;
        e: for (; ; ) switch (r2.mode) {
          case P2:
            if (0 === r2.wrap) {
              r2.mode = 13;
              break;
            }
            for (; l3 < 16; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if (2 & r2.wrap && 35615 === u3) {
              E2[r2.check = 0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0), l3 = u3 = 0, r2.mode = 2;
              break;
            }
            if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u3) << 8) + (u3 >> 8)) % 31) {
              e2.msg = "incorrect header check", r2.mode = 30;
              break;
            }
            if (8 != (15 & u3)) {
              e2.msg = "unknown compression method", r2.mode = 30;
              break;
            }
            if (l3 -= 4, k2 = 8 + (15 & (u3 >>>= 4)), 0 === r2.wbits) r2.wbits = k2;
            else if (k2 > r2.wbits) {
              e2.msg = "invalid window size", r2.mode = 30;
              break;
            }
            r2.dmax = 1 << k2, e2.adler = r2.check = 1, r2.mode = 512 & u3 ? 10 : 12, l3 = u3 = 0;
            break;
          case 2:
            for (; l3 < 16; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if (r2.flags = u3, 8 != (255 & r2.flags)) {
              e2.msg = "unknown compression method", r2.mode = 30;
              break;
            }
            if (57344 & r2.flags) {
              e2.msg = "unknown header flags set", r2.mode = 30;
              break;
            }
            r2.head && (r2.head.text = u3 >> 8 & 1), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0, r2.mode = 3;
          case 3:
            for (; l3 < 32; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            r2.head && (r2.head.time = u3), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, E2[2] = u3 >>> 16 & 255, E2[3] = u3 >>> 24 & 255, r2.check = B2(r2.check, E2, 4, 0)), l3 = u3 = 0, r2.mode = 4;
          case 4:
            for (; l3 < 16; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            r2.head && (r2.head.xflags = 255 & u3, r2.head.os = u3 >> 8), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0, r2.mode = 5;
          case 5:
            if (1024 & r2.flags) {
              for (; l3 < 16; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              r2.length = u3, r2.head && (r2.head.extra_len = u3), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0;
            } else r2.head && (r2.head.extra = null);
            r2.mode = 6;
          case 6:
            if (1024 & r2.flags && (o3 < (d2 = r2.length) && (d2 = o3), d2 && (r2.head && (k2 = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I2.arraySet(r2.head.extra, n3, s3, d2, k2)), 512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s3)), o3 -= d2, s3 += d2, r2.length -= d2), r2.length)) break e;
            r2.length = 0, r2.mode = 7;
          case 7:
            if (2048 & r2.flags) {
              if (0 === o3) break e;
              for (d2 = 0; k2 = n3[s3 + d2++], r2.head && k2 && r2.length < 65536 && (r2.head.name += String.fromCharCode(k2)), k2 && d2 < o3; ) ;
              if (512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s3)), o3 -= d2, s3 += d2, k2) break e;
            } else r2.head && (r2.head.name = null);
            r2.length = 0, r2.mode = 8;
          case 8:
            if (4096 & r2.flags) {
              if (0 === o3) break e;
              for (d2 = 0; k2 = n3[s3 + d2++], r2.head && k2 && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k2)), k2 && d2 < o3; ) ;
              if (512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s3)), o3 -= d2, s3 += d2, k2) break e;
            } else r2.head && (r2.head.comment = null);
            r2.mode = 9;
          case 9:
            if (512 & r2.flags) {
              for (; l3 < 16; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              if (u3 !== (65535 & r2.check)) {
                e2.msg = "header crc mismatch", r2.mode = 30;
                break;
              }
              l3 = u3 = 0;
            }
            r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
            break;
          case 10:
            for (; l3 < 32; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            e2.adler = r2.check = L2(u3), l3 = u3 = 0, r2.mode = 11;
          case 11:
            if (0 === r2.havedict) return e2.next_out = a3, e2.avail_out = h3, e2.next_in = s3, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, 2;
            e2.adler = r2.check = 1, r2.mode = 12;
          case 12:
            if (5 === t3 || 6 === t3) break e;
          case 13:
            if (r2.last) {
              u3 >>>= 7 & l3, l3 -= 7 & l3, r2.mode = 27;
              break;
            }
            for (; l3 < 3; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            switch (r2.last = 1 & u3, l3 -= 1, 3 & (u3 >>>= 1)) {
              case 0:
                r2.mode = 14;
                break;
              case 1:
                if (j2(r2), r2.mode = 20, 6 !== t3) break;
                u3 >>>= 2, l3 -= 2;
                break e;
              case 2:
                r2.mode = 17;
                break;
              case 3:
                e2.msg = "invalid block type", r2.mode = 30;
            }
            u3 >>>= 2, l3 -= 2;
            break;
          case 14:
            for (u3 >>>= 7 & l3, l3 -= 7 & l3; l3 < 32; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if ((65535 & u3) != (u3 >>> 16 ^ 65535)) {
              e2.msg = "invalid stored block lengths", r2.mode = 30;
              break;
            }
            if (r2.length = 65535 & u3, l3 = u3 = 0, r2.mode = 15, 6 === t3) break e;
          case 15:
            r2.mode = 16;
          case 16:
            if (d2 = r2.length) {
              if (o3 < d2 && (d2 = o3), h3 < d2 && (d2 = h3), 0 === d2) break e;
              I2.arraySet(i3, n3, s3, d2, a3), o3 -= d2, s3 += d2, h3 -= d2, a3 += d2, r2.length -= d2;
              break;
            }
            r2.mode = 12;
            break;
          case 17:
            for (; l3 < 14; ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if (r2.nlen = 257 + (31 & u3), u3 >>>= 5, l3 -= 5, r2.ndist = 1 + (31 & u3), u3 >>>= 5, l3 -= 5, r2.ncode = 4 + (15 & u3), u3 >>>= 4, l3 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
              e2.msg = "too many length or distance symbols", r2.mode = 30;
              break;
            }
            r2.have = 0, r2.mode = 18;
          case 18:
            for (; r2.have < r2.ncode; ) {
              for (; l3 < 3; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              r2.lens[A2[r2.have++]] = 7 & u3, u3 >>>= 3, l3 -= 3;
            }
            for (; r2.have < 19; ) r2.lens[A2[r2.have++]] = 0;
            if (r2.lencode = r2.lendyn, r2.lenbits = 7, S2 = { bits: r2.lenbits }, x2 = T2(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S2), r2.lenbits = S2.bits, x2) {
              e2.msg = "invalid code lengths set", r2.mode = 30;
              break;
            }
            r2.have = 0, r2.mode = 19;
          case 19:
            for (; r2.have < r2.nlen + r2.ndist; ) {
              for (; g2 = (C2 = r2.lencode[u3 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              if (b2 < 16) u3 >>>= _2, l3 -= _2, r2.lens[r2.have++] = b2;
              else {
                if (16 === b2) {
                  for (z2 = _2 + 2; l3 < z2; ) {
                    if (0 === o3) break e;
                    o3--, u3 += n3[s3++] << l3, l3 += 8;
                  }
                  if (u3 >>>= _2, l3 -= _2, 0 === r2.have) {
                    e2.msg = "invalid bit length repeat", r2.mode = 30;
                    break;
                  }
                  k2 = r2.lens[r2.have - 1], d2 = 3 + (3 & u3), u3 >>>= 2, l3 -= 2;
                } else if (17 === b2) {
                  for (z2 = _2 + 3; l3 < z2; ) {
                    if (0 === o3) break e;
                    o3--, u3 += n3[s3++] << l3, l3 += 8;
                  }
                  l3 -= _2, k2 = 0, d2 = 3 + (7 & (u3 >>>= _2)), u3 >>>= 3, l3 -= 3;
                } else {
                  for (z2 = _2 + 7; l3 < z2; ) {
                    if (0 === o3) break e;
                    o3--, u3 += n3[s3++] << l3, l3 += 8;
                  }
                  l3 -= _2, k2 = 0, d2 = 11 + (127 & (u3 >>>= _2)), u3 >>>= 7, l3 -= 7;
                }
                if (r2.have + d2 > r2.nlen + r2.ndist) {
                  e2.msg = "invalid bit length repeat", r2.mode = 30;
                  break;
                }
                for (; d2--; ) r2.lens[r2.have++] = k2;
              }
            }
            if (30 === r2.mode) break;
            if (0 === r2.lens[256]) {
              e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
              break;
            }
            if (r2.lenbits = 9, S2 = { bits: r2.lenbits }, x2 = T2(D2, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S2), r2.lenbits = S2.bits, x2) {
              e2.msg = "invalid literal/lengths set", r2.mode = 30;
              break;
            }
            if (r2.distbits = 6, r2.distcode = r2.distdyn, S2 = { bits: r2.distbits }, x2 = T2(F2, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S2), r2.distbits = S2.bits, x2) {
              e2.msg = "invalid distances set", r2.mode = 30;
              break;
            }
            if (r2.mode = 20, 6 === t3) break e;
          case 20:
            r2.mode = 21;
          case 21:
            if (6 <= o3 && 258 <= h3) {
              e2.next_out = a3, e2.avail_out = h3, e2.next_in = s3, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, R2(e2, c3), a3 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s3 = e2.next_in, n3 = e2.input, o3 = e2.avail_in, u3 = r2.hold, l3 = r2.bits, 12 === r2.mode && (r2.back = -1);
              break;
            }
            for (r2.back = 0; g2 = (C2 = r2.lencode[u3 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if (g2 && 0 == (240 & g2)) {
              for (v2 = _2, y2 = g2, w2 = b2; g2 = (C2 = r2.lencode[w2 + ((u3 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b2 = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              u3 >>>= v2, l3 -= v2, r2.back += v2;
            }
            if (u3 >>>= _2, l3 -= _2, r2.back += _2, r2.length = b2, 0 === g2) {
              r2.mode = 26;
              break;
            }
            if (32 & g2) {
              r2.back = -1, r2.mode = 12;
              break;
            }
            if (64 & g2) {
              e2.msg = "invalid literal/length code", r2.mode = 30;
              break;
            }
            r2.extra = 15 & g2, r2.mode = 22;
          case 22:
            if (r2.extra) {
              for (z2 = r2.extra; l3 < z2; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              r2.length += u3 & (1 << r2.extra) - 1, u3 >>>= r2.extra, l3 -= r2.extra, r2.back += r2.extra;
            }
            r2.was = r2.length, r2.mode = 23;
          case 23:
            for (; g2 = (C2 = r2.distcode[u3 & (1 << r2.distbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
              if (0 === o3) break e;
              o3--, u3 += n3[s3++] << l3, l3 += 8;
            }
            if (0 == (240 & g2)) {
              for (v2 = _2, y2 = g2, w2 = b2; g2 = (C2 = r2.distcode[w2 + ((u3 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b2 = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              u3 >>>= v2, l3 -= v2, r2.back += v2;
            }
            if (u3 >>>= _2, l3 -= _2, r2.back += _2, 64 & g2) {
              e2.msg = "invalid distance code", r2.mode = 30;
              break;
            }
            r2.offset = b2, r2.extra = 15 & g2, r2.mode = 24;
          case 24:
            if (r2.extra) {
              for (z2 = r2.extra; l3 < z2; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              r2.offset += u3 & (1 << r2.extra) - 1, u3 >>>= r2.extra, l3 -= r2.extra, r2.back += r2.extra;
            }
            if (r2.offset > r2.dmax) {
              e2.msg = "invalid distance too far back", r2.mode = 30;
              break;
            }
            r2.mode = 25;
          case 25:
            if (0 === h3) break e;
            if (d2 = c3 - h3, r2.offset > d2) {
              if ((d2 = r2.offset - d2) > r2.whave && r2.sane) {
                e2.msg = "invalid distance too far back", r2.mode = 30;
                break;
              }
              p2 = d2 > r2.wnext ? (d2 -= r2.wnext, r2.wsize - d2) : r2.wnext - d2, d2 > r2.length && (d2 = r2.length), m2 = r2.window;
            } else m2 = i3, p2 = a3 - r2.offset, d2 = r2.length;
            for (h3 < d2 && (d2 = h3), h3 -= d2, r2.length -= d2; i3[a3++] = m2[p2++], --d2; ) ;
            0 === r2.length && (r2.mode = 21);
            break;
          case 26:
            if (0 === h3) break e;
            i3[a3++] = r2.length, h3--, r2.mode = 21;
            break;
          case 27:
            if (r2.wrap) {
              for (; l3 < 32; ) {
                if (0 === o3) break e;
                o3--, u3 |= n3[s3++] << l3, l3 += 8;
              }
              if (c3 -= h3, e2.total_out += c3, r2.total += c3, c3 && (e2.adler = r2.check = r2.flags ? B2(r2.check, i3, c3, a3 - c3) : O2(r2.check, i3, c3, a3 - c3)), c3 = h3, (r2.flags ? u3 : L2(u3)) !== r2.check) {
                e2.msg = "incorrect data check", r2.mode = 30;
                break;
              }
              l3 = u3 = 0;
            }
            r2.mode = 28;
          case 28:
            if (r2.wrap && r2.flags) {
              for (; l3 < 32; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s3++] << l3, l3 += 8;
              }
              if (u3 !== (4294967295 & r2.total)) {
                e2.msg = "incorrect length check", r2.mode = 30;
                break;
              }
              l3 = u3 = 0;
            }
            r2.mode = 29;
          case 29:
            x2 = 1;
            break e;
          case 30:
            x2 = -3;
            break e;
          case 31:
            return -4;
          case 32:
          default:
            return U2;
        }
        return e2.next_out = a3, e2.avail_out = h3, e2.next_in = s3, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, (r2.wsize || c3 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t3)) && Z2(e2, e2.output, e2.next_out, c3 - e2.avail_out) ? (r2.mode = 31, -4) : (f3 -= e2.avail_in, c3 -= e2.avail_out, e2.total_in += f3, e2.total_out += c3, r2.total += c3, r2.wrap && c3 && (e2.adler = r2.check = r2.flags ? B2(r2.check, i3, c3, e2.next_out - c3) : O2(r2.check, i3, c3, e2.next_out - c3)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f3 && 0 === c3 || 4 === t3) && x2 === N2 && (x2 = -5), x2);
      }, r.inflateEnd = function(e2) {
        if (!e2 || !e2.state) return U2;
        var t3 = e2.state;
        return t3.window && (t3.window = null), e2.state = null, N2;
      }, r.inflateGetHeader = function(e2, t3) {
        var r2;
        return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U2 : ((r2.head = t3).done = false, N2) : U2;
      }, r.inflateSetDictionary = function(e2, t3) {
        var r2, n3 = t3.length;
        return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U2 : 11 === r2.mode && O2(1, t3, n3, 0) !== r2.check ? -3 : Z2(e2, t3, n3, n3) ? (r2.mode = 31, -4) : (r2.havedict = 1, N2) : U2;
      }, r.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t2, r) {
      var D2 = e("../utils/common"), F2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N2 = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U2 = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P2 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t2.exports = function(e2, t3, r2, n2, i2, s2, a2, o2) {
        var h2, u2, l2, f2, c2, d2, p2, m2, _2, g2 = o2.bits, b2 = 0, v2 = 0, y2 = 0, w2 = 0, k2 = 0, x2 = 0, S2 = 0, z2 = 0, C2 = 0, E2 = 0, A2 = null, I2 = 0, O2 = new D2.Buf16(16), B2 = new D2.Buf16(16), R2 = null, T2 = 0;
        for (b2 = 0; b2 <= 15; b2++) O2[b2] = 0;
        for (v2 = 0; v2 < n2; v2++) O2[t3[r2 + v2]]++;
        for (k2 = g2, w2 = 15; 1 <= w2 && 0 === O2[w2]; w2--) ;
        if (w2 < k2 && (k2 = w2), 0 === w2) return i2[s2++] = 20971520, i2[s2++] = 20971520, o2.bits = 1, 0;
        for (y2 = 1; y2 < w2 && 0 === O2[y2]; y2++) ;
        for (k2 < y2 && (k2 = y2), b2 = z2 = 1; b2 <= 15; b2++) if (z2 <<= 1, (z2 -= O2[b2]) < 0) return -1;
        if (0 < z2 && (0 === e2 || 1 !== w2)) return -1;
        for (B2[1] = 0, b2 = 1; b2 < 15; b2++) B2[b2 + 1] = B2[b2] + O2[b2];
        for (v2 = 0; v2 < n2; v2++) 0 !== t3[r2 + v2] && (a2[B2[t3[r2 + v2]]++] = v2);
        if (d2 = 0 === e2 ? (A2 = R2 = a2, 19) : 1 === e2 ? (A2 = F2, I2 -= 257, R2 = N2, T2 -= 257, 256) : (A2 = U2, R2 = P2, -1), b2 = y2, c2 = s2, S2 = v2 = E2 = 0, l2 = -1, f2 = (C2 = 1 << (x2 = k2)) - 1, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
        for (; ; ) {
          for (p2 = b2 - S2, _2 = a2[v2] < d2 ? (m2 = 0, a2[v2]) : a2[v2] > d2 ? (m2 = R2[T2 + a2[v2]], A2[I2 + a2[v2]]) : (m2 = 96, 0), h2 = 1 << b2 - S2, y2 = u2 = 1 << x2; i2[c2 + (E2 >> S2) + (u2 -= h2)] = p2 << 24 | m2 << 16 | _2 | 0, 0 !== u2; ) ;
          for (h2 = 1 << b2 - 1; E2 & h2; ) h2 >>= 1;
          if (0 !== h2 ? (E2 &= h2 - 1, E2 += h2) : E2 = 0, v2++, 0 == --O2[b2]) {
            if (b2 === w2) break;
            b2 = t3[r2 + a2[v2]];
          }
          if (k2 < b2 && (E2 & f2) !== l2) {
            for (0 === S2 && (S2 = k2), c2 += y2, z2 = 1 << (x2 = b2 - S2); x2 + S2 < w2 && !((z2 -= O2[x2 + S2]) <= 0); ) x2++, z2 <<= 1;
            if (C2 += 1 << x2, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
            i2[l2 = E2 & f2] = k2 << 24 | x2 << 16 | c2 - s2 | 0;
          }
        }
        return 0 !== E2 && (i2[c2 + E2] = b2 - S2 << 24 | 64 << 16 | 0), o2.bits = k2, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(e, t2, r) {
      t2.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(e, t2, r) {
      var i2 = e("../utils/common"), o2 = 0, h2 = 1;
      function n2(e2) {
        for (var t3 = e2.length; 0 <= --t3; ) e2[t3] = 0;
      }
      var s2 = 0, a2 = 29, u2 = 256, l2 = u2 + 1 + a2, f2 = 30, c2 = 19, _2 = 2 * l2 + 1, g2 = 15, d2 = 16, p2 = 7, m2 = 256, b2 = 16, v2 = 17, y2 = 18, w2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k2 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z2 = new Array(2 * (l2 + 2));
      n2(z2);
      var C2 = new Array(2 * f2);
      n2(C2);
      var E2 = new Array(512);
      n2(E2);
      var A2 = new Array(256);
      n2(A2);
      var I2 = new Array(a2);
      n2(I2);
      var O2, B2, R2, T2 = new Array(f2);
      function D2(e2, t3, r2, n3, i3) {
        this.static_tree = e2, this.extra_bits = t3, this.extra_base = r2, this.elems = n3, this.max_length = i3, this.has_stree = e2 && e2.length;
      }
      function F2(e2, t3) {
        this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t3;
      }
      function N2(e2) {
        return e2 < 256 ? E2[e2] : E2[256 + (e2 >>> 7)];
      }
      function U2(e2, t3) {
        e2.pending_buf[e2.pending++] = 255 & t3, e2.pending_buf[e2.pending++] = t3 >>> 8 & 255;
      }
      function P2(e2, t3, r2) {
        e2.bi_valid > d2 - r2 ? (e2.bi_buf |= t3 << e2.bi_valid & 65535, U2(e2, e2.bi_buf), e2.bi_buf = t3 >> d2 - e2.bi_valid, e2.bi_valid += r2 - d2) : (e2.bi_buf |= t3 << e2.bi_valid & 65535, e2.bi_valid += r2);
      }
      function L2(e2, t3, r2) {
        P2(e2, r2[2 * t3], r2[2 * t3 + 1]);
      }
      function j2(e2, t3) {
        for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t3; ) ;
        return r2 >>> 1;
      }
      function Z2(e2, t3, r2) {
        var n3, i3, s3 = new Array(g2 + 1), a3 = 0;
        for (n3 = 1; n3 <= g2; n3++) s3[n3] = a3 = a3 + r2[n3 - 1] << 1;
        for (i3 = 0; i3 <= t3; i3++) {
          var o3 = e2[2 * i3 + 1];
          0 !== o3 && (e2[2 * i3] = j2(s3[o3]++, o3));
        }
      }
      function W2(e2) {
        var t3;
        for (t3 = 0; t3 < l2; t3++) e2.dyn_ltree[2 * t3] = 0;
        for (t3 = 0; t3 < f2; t3++) e2.dyn_dtree[2 * t3] = 0;
        for (t3 = 0; t3 < c2; t3++) e2.bl_tree[2 * t3] = 0;
        e2.dyn_ltree[2 * m2] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
      }
      function M2(e2) {
        8 < e2.bi_valid ? U2(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
      }
      function H2(e2, t3, r2, n3) {
        var i3 = 2 * t3, s3 = 2 * r2;
        return e2[i3] < e2[s3] || e2[i3] === e2[s3] && n3[t3] <= n3[r2];
      }
      function G2(e2, t3, r2) {
        for (var n3 = e2.heap[r2], i3 = r2 << 1; i3 <= e2.heap_len && (i3 < e2.heap_len && H2(t3, e2.heap[i3 + 1], e2.heap[i3], e2.depth) && i3++, !H2(t3, n3, e2.heap[i3], e2.depth)); ) e2.heap[r2] = e2.heap[i3], r2 = i3, i3 <<= 1;
        e2.heap[r2] = n3;
      }
      function K2(e2, t3, r2) {
        var n3, i3, s3, a3, o3 = 0;
        if (0 !== e2.last_lit) for (; n3 = e2.pending_buf[e2.d_buf + 2 * o3] << 8 | e2.pending_buf[e2.d_buf + 2 * o3 + 1], i3 = e2.pending_buf[e2.l_buf + o3], o3++, 0 === n3 ? L2(e2, i3, t3) : (L2(e2, (s3 = A2[i3]) + u2 + 1, t3), 0 !== (a3 = w2[s3]) && P2(e2, i3 -= I2[s3], a3), L2(e2, s3 = N2(--n3), r2), 0 !== (a3 = k2[s3]) && P2(e2, n3 -= T2[s3], a3)), o3 < e2.last_lit; ) ;
        L2(e2, m2, t3);
      }
      function Y2(e2, t3) {
        var r2, n3, i3, s3 = t3.dyn_tree, a3 = t3.stat_desc.static_tree, o3 = t3.stat_desc.has_stree, h3 = t3.stat_desc.elems, u3 = -1;
        for (e2.heap_len = 0, e2.heap_max = _2, r2 = 0; r2 < h3; r2++) 0 !== s3[2 * r2] ? (e2.heap[++e2.heap_len] = u3 = r2, e2.depth[r2] = 0) : s3[2 * r2 + 1] = 0;
        for (; e2.heap_len < 2; ) s3[2 * (i3 = e2.heap[++e2.heap_len] = u3 < 2 ? ++u3 : 0)] = 1, e2.depth[i3] = 0, e2.opt_len--, o3 && (e2.static_len -= a3[2 * i3 + 1]);
        for (t3.max_code = u3, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G2(e2, s3, r2);
        for (i3 = h3; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G2(e2, s3, 1), n3 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n3, s3[2 * i3] = s3[2 * r2] + s3[2 * n3], e2.depth[i3] = (e2.depth[r2] >= e2.depth[n3] ? e2.depth[r2] : e2.depth[n3]) + 1, s3[2 * r2 + 1] = s3[2 * n3 + 1] = i3, e2.heap[1] = i3++, G2(e2, s3, 1), 2 <= e2.heap_len; ) ;
        e2.heap[--e2.heap_max] = e2.heap[1], function(e3, t4) {
          var r3, n4, i4, s4, a4, o4, h4 = t4.dyn_tree, u4 = t4.max_code, l3 = t4.stat_desc.static_tree, f3 = t4.stat_desc.has_stree, c3 = t4.stat_desc.extra_bits, d3 = t4.stat_desc.extra_base, p3 = t4.stat_desc.max_length, m3 = 0;
          for (s4 = 0; s4 <= g2; s4++) e3.bl_count[s4] = 0;
          for (h4[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _2; r3++) p3 < (s4 = h4[2 * h4[2 * (n4 = e3.heap[r3]) + 1] + 1] + 1) && (s4 = p3, m3++), h4[2 * n4 + 1] = s4, u4 < n4 || (e3.bl_count[s4]++, a4 = 0, d3 <= n4 && (a4 = c3[n4 - d3]), o4 = h4[2 * n4], e3.opt_len += o4 * (s4 + a4), f3 && (e3.static_len += o4 * (l3[2 * n4 + 1] + a4)));
          if (0 !== m3) {
            do {
              for (s4 = p3 - 1; 0 === e3.bl_count[s4]; ) s4--;
              e3.bl_count[s4]--, e3.bl_count[s4 + 1] += 2, e3.bl_count[p3]--, m3 -= 2;
            } while (0 < m3);
            for (s4 = p3; 0 !== s4; s4--) for (n4 = e3.bl_count[s4]; 0 !== n4; ) u4 < (i4 = e3.heap[--r3]) || (h4[2 * i4 + 1] !== s4 && (e3.opt_len += (s4 - h4[2 * i4 + 1]) * h4[2 * i4], h4[2 * i4 + 1] = s4), n4--);
          }
        }(e2, t3), Z2(s3, u3, e2.bl_count);
      }
      function X2(e2, t3, r2) {
        var n3, i3, s3 = -1, a3 = t3[1], o3 = 0, h3 = 7, u3 = 4;
        for (0 === a3 && (h3 = 138, u3 = 3), t3[2 * (r2 + 1) + 1] = 65535, n3 = 0; n3 <= r2; n3++) i3 = a3, a3 = t3[2 * (n3 + 1) + 1], ++o3 < h3 && i3 === a3 || (o3 < u3 ? e2.bl_tree[2 * i3] += o3 : 0 !== i3 ? (i3 !== s3 && e2.bl_tree[2 * i3]++, e2.bl_tree[2 * b2]++) : o3 <= 10 ? e2.bl_tree[2 * v2]++ : e2.bl_tree[2 * y2]++, s3 = i3, u3 = (o3 = 0) === a3 ? (h3 = 138, 3) : i3 === a3 ? (h3 = 6, 3) : (h3 = 7, 4));
      }
      function V2(e2, t3, r2) {
        var n3, i3, s3 = -1, a3 = t3[1], o3 = 0, h3 = 7, u3 = 4;
        for (0 === a3 && (h3 = 138, u3 = 3), n3 = 0; n3 <= r2; n3++) if (i3 = a3, a3 = t3[2 * (n3 + 1) + 1], !(++o3 < h3 && i3 === a3)) {
          if (o3 < u3) for (; L2(e2, i3, e2.bl_tree), 0 != --o3; ) ;
          else 0 !== i3 ? (i3 !== s3 && (L2(e2, i3, e2.bl_tree), o3--), L2(e2, b2, e2.bl_tree), P2(e2, o3 - 3, 2)) : o3 <= 10 ? (L2(e2, v2, e2.bl_tree), P2(e2, o3 - 3, 3)) : (L2(e2, y2, e2.bl_tree), P2(e2, o3 - 11, 7));
          s3 = i3, u3 = (o3 = 0) === a3 ? (h3 = 138, 3) : i3 === a3 ? (h3 = 6, 3) : (h3 = 7, 4);
        }
      }
      n2(T2);
      var q2 = false;
      function J2(e2, t3, r2, n3) {
        P2(e2, (s2 << 1) + (n3 ? 1 : 0), 3), function(e3, t4, r3, n4) {
          M2(e3), U2(e3, r3), U2(e3, ~r3), i2.arraySet(e3.pending_buf, e3.window, t4, r3, e3.pending), e3.pending += r3;
        }(e2, t3, r2);
      }
      r._tr_init = function(e2) {
        q2 || (function() {
          var e3, t3, r2, n3, i3, s3 = new Array(g2 + 1);
          for (n3 = r2 = 0; n3 < a2 - 1; n3++) for (I2[n3] = r2, e3 = 0; e3 < 1 << w2[n3]; e3++) A2[r2++] = n3;
          for (A2[r2 - 1] = n3, n3 = i3 = 0; n3 < 16; n3++) for (T2[n3] = i3, e3 = 0; e3 < 1 << k2[n3]; e3++) E2[i3++] = n3;
          for (i3 >>= 7; n3 < f2; n3++) for (T2[n3] = i3 << 7, e3 = 0; e3 < 1 << k2[n3] - 7; e3++) E2[256 + i3++] = n3;
          for (t3 = 0; t3 <= g2; t3++) s3[t3] = 0;
          for (e3 = 0; e3 <= 143; ) z2[2 * e3 + 1] = 8, e3++, s3[8]++;
          for (; e3 <= 255; ) z2[2 * e3 + 1] = 9, e3++, s3[9]++;
          for (; e3 <= 279; ) z2[2 * e3 + 1] = 7, e3++, s3[7]++;
          for (; e3 <= 287; ) z2[2 * e3 + 1] = 8, e3++, s3[8]++;
          for (Z2(z2, l2 + 1, s3), e3 = 0; e3 < f2; e3++) C2[2 * e3 + 1] = 5, C2[2 * e3] = j2(e3, 5);
          O2 = new D2(z2, w2, u2 + 1, l2, g2), B2 = new D2(C2, k2, 0, f2, g2), R2 = new D2(new Array(0), x2, 0, c2, p2);
        }(), q2 = true), e2.l_desc = new F2(e2.dyn_ltree, O2), e2.d_desc = new F2(e2.dyn_dtree, B2), e2.bl_desc = new F2(e2.bl_tree, R2), e2.bi_buf = 0, e2.bi_valid = 0, W2(e2);
      }, r._tr_stored_block = J2, r._tr_flush_block = function(e2, t3, r2, n3) {
        var i3, s3, a3 = 0;
        0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = function(e3) {
          var t4, r3 = 4093624447;
          for (t4 = 0; t4 <= 31; t4++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t4]) return o2;
          if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h2;
          for (t4 = 32; t4 < u2; t4++) if (0 !== e3.dyn_ltree[2 * t4]) return h2;
          return o2;
        }(e2)), Y2(e2, e2.l_desc), Y2(e2, e2.d_desc), a3 = function(e3) {
          var t4;
          for (X2(e3, e3.dyn_ltree, e3.l_desc.max_code), X2(e3, e3.dyn_dtree, e3.d_desc.max_code), Y2(e3, e3.bl_desc), t4 = c2 - 1; 3 <= t4 && 0 === e3.bl_tree[2 * S2[t4] + 1]; t4--) ;
          return e3.opt_len += 3 * (t4 + 1) + 5 + 5 + 4, t4;
        }(e2), i3 = e2.opt_len + 3 + 7 >>> 3, (s3 = e2.static_len + 3 + 7 >>> 3) <= i3 && (i3 = s3)) : i3 = s3 = r2 + 5, r2 + 4 <= i3 && -1 !== t3 ? J2(e2, t3, r2, n3) : 4 === e2.strategy || s3 === i3 ? (P2(e2, 2 + (n3 ? 1 : 0), 3), K2(e2, z2, C2)) : (P2(e2, 4 + (n3 ? 1 : 0), 3), function(e3, t4, r3, n4) {
          var i4;
          for (P2(e3, t4 - 257, 5), P2(e3, r3 - 1, 5), P2(e3, n4 - 4, 4), i4 = 0; i4 < n4; i4++) P2(e3, e3.bl_tree[2 * S2[i4] + 1], 3);
          V2(e3, e3.dyn_ltree, t4 - 1), V2(e3, e3.dyn_dtree, r3 - 1);
        }(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a3 + 1), K2(e2, e2.dyn_ltree, e2.dyn_dtree)), W2(e2), n3 && M2(e2);
      }, r._tr_tally = function(e2, t3, r2) {
        return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t3 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t3, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t3 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t3--, e2.dyn_ltree[2 * (A2[r2] + u2 + 1)]++, e2.dyn_dtree[2 * N2(t3)]++), e2.last_lit === e2.lit_bufsize - 1;
      }, r._tr_align = function(e2) {
        P2(e2, 2, 3), L2(e2, m2, z2), function(e3) {
          16 === e3.bi_valid ? (U2(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
        }(e2);
      };
    }, { "../utils/common": 41 }], 53: [function(e, t2, r) {
      t2.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(e, t2, r) {
      (function(e2) {
        !function(r2, n2) {
          if (!r2.setImmediate) {
            var i2, s2, t3, a2, o2 = 1, h2 = {}, u2 = false, l2 = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
            e3 = e3 && e3.setTimeout ? e3 : r2, i2 = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
              process.nextTick(function() {
                c2(e4);
              });
            } : function() {
              if (r2.postMessage && !r2.importScripts) {
                var e4 = true, t4 = r2.onmessage;
                return r2.onmessage = function() {
                  e4 = false;
                }, r2.postMessage("", "*"), r2.onmessage = t4, e4;
              }
            }() ? (a2 = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d2, false) : r2.attachEvent("onmessage", d2), function(e4) {
              r2.postMessage(a2 + e4, "*");
            }) : r2.MessageChannel ? ((t3 = new MessageChannel()).port1.onmessage = function(e4) {
              c2(e4.data);
            }, function(e4) {
              t3.port2.postMessage(e4);
            }) : l2 && "onreadystatechange" in l2.createElement("script") ? (s2 = l2.documentElement, function(e4) {
              var t4 = l2.createElement("script");
              t4.onreadystatechange = function() {
                c2(e4), t4.onreadystatechange = null, s2.removeChild(t4), t4 = null;
              }, s2.appendChild(t4);
            }) : function(e4) {
              setTimeout(c2, 0, e4);
            }, e3.setImmediate = function(e4) {
              "function" != typeof e4 && (e4 = new Function("" + e4));
              for (var t4 = new Array(arguments.length - 1), r3 = 0; r3 < t4.length; r3++) t4[r3] = arguments[r3 + 1];
              var n3 = { callback: e4, args: t4 };
              return h2[o2] = n3, i2(o2), o2++;
            }, e3.clearImmediate = f2;
          }
          function f2(e4) {
            delete h2[e4];
          }
          function c2(e4) {
            if (u2) setTimeout(c2, 0, e4);
            else {
              var t4 = h2[e4];
              if (t4) {
                u2 = true;
                try {
                  !function(e5) {
                    var t5 = e5.callback, r3 = e5.args;
                    switch (r3.length) {
                      case 0:
                        t5();
                        break;
                      case 1:
                        t5(r3[0]);
                        break;
                      case 2:
                        t5(r3[0], r3[1]);
                        break;
                      case 3:
                        t5(r3[0], r3[1], r3[2]);
                        break;
                      default:
                        t5.apply(n2, r3);
                    }
                  }(t4);
                } finally {
                  f2(e4), u2 = false;
                }
              }
            }
          }
          function d2(e4) {
            e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a2) && c2(+e4.data.slice(a2.length));
          }
        }("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
      }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(jszip_min);
var jszip_minExports = jszip_min.exports;
const JSZip = /* @__PURE__ */ getDefaultExportFromCjs(jszip_minExports);
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 16;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BRAND_PURPLE = [124, 58, 237];
const BRAND_PURPLE_LIGHT = [167, 139, 250];
const TEXT_DARK = [15, 10, 40];
const TEXT_GREY = [100, 110, 130];
const BG_LIGHT = [248, 247, 255];
async function exportSessionAsPdf(session2) {
  const doc = new E({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  drawCoverPage(doc, session2);
  for (let i2 = 0; i2 < session2.steps.length; i2++) {
    doc.addPage();
    await drawStepPage(doc, session2.steps[i2], i2 + 1, session2.steps.length);
  }
  addPageNumbers(doc, session2.steps.length);
  const filename = buildExportFilename(session2) + ".pdf";
  doc.save(filename);
}
function drawCoverPage(doc, session2) {
  doc.setFillColor(...BG_LIGHT);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, 0, PAGE_W, 6, "F");
  doc.setFillColor(240, 237, 255);
  doc.circle(PAGE_W + 20, -20, 80, "F");
  doc.setFillColor(240, 237, 255);
  doc.circle(-20, PAGE_H + 20, 60, "F");
  const iconX = PAGE_W / 2 - 12;
  const iconY = 55;
  doc.setFillColor(...BRAND_PURPLE);
  roundedRectPDF(doc, iconX, iconY, 24, 24, 4);
  doc.setFillColor(255, 255, 255);
  doc.circle(PAGE_W / 2, iconY + 12, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_PURPLE);
  doc.text("AutoDoc", PAGE_W / 2, iconY + 36, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...TEXT_DARK);
  doc.text("Process Documentation", PAGE_W / 2, 115, { align: "center" });
  doc.setDrawColor(...BRAND_PURPLE_LIGHT);
  doc.setLineWidth(0.5);
  doc.line(MARGIN + 20, 122, PAGE_W - MARGIN - 20, 122);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(...TEXT_GREY);
  const sessionLabel = wrapText(doc, session2.name, CONTENT_W - 20, 16);
  doc.text(sessionLabel, PAGE_W / 2, 133, { align: "center" });
  let metaY = 148;
  if (session2.metadata) {
    const m2 = session2.metadata;
    metaY = 146;
    doc.setFillColor(255, 255, 255);
    roundedRectPDF(doc, MARGIN + 20, metaY, CONTENT_W - 40, 32, 4);
    doc.setDrawColor(230, 225, 255);
    doc.setLineWidth(0.3);
    roundedRectStrokePDF(doc, MARGIN + 20, metaY, CONTENT_W - 40, 32, 4);
    doc.setFillColor(...BRAND_PURPLE_LIGHT);
    doc.rect(MARGIN + 20, metaY, 2, 32, "F");
    const labelX = MARGIN + 28;
    const valX = MARGIN + 68;
    let rowY = metaY + 9;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text("Feature:", labelX, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m2.featureName, valX, rowY);
    rowY += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text("Environment:", labelX, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m2.environmentType, valX, rowY);
    rowY += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text("Generated On:", labelX, rowY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT_DARK);
    doc.text(m2.recordingDate, valX, rowY);
    metaY += 38;
  }
  const statsY = metaY + 2;
  doc.setFillColor(255, 255, 255);
  roundedRectPDF(doc, MARGIN + 20, statsY, CONTENT_W - 40, 36, 4);
  doc.setDrawColor(230, 225, 255);
  doc.setLineWidth(0.3);
  roundedRectStrokePDF(doc, MARGIN + 20, statsY, CONTENT_W - 40, 36, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...BRAND_PURPLE);
  doc.text(String(session2.steps.length), PAGE_W / 2 - 20, statsY + 16, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_GREY);
  doc.text("Steps", PAGE_W / 2 - 20, statsY + 26, { align: "center" });
  doc.setDrawColor(220, 215, 250);
  doc.line(PAGE_W / 2, statsY + 5, PAGE_W / 2, statsY + 31);
  const dateStr = formatDate(session2.createdAt);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_DARK);
  const shortDate = new Date(session2.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  doc.text(shortDate, PAGE_W / 2 + 20, statsY + 16, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_GREY);
  doc.text("Created", PAGE_W / 2 + 20, statsY + 26, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TEXT_GREY);
  doc.text(`Generated: ${dateStr}`, PAGE_W / 2, PAGE_H - 20, { align: "center" });
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, PAGE_H - 6, PAGE_W, 6, "F");
}
async function drawStepPage(doc, step, pageIndex, totalSteps) {
  doc.setFillColor(...BG_LIGHT);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, 0, PAGE_W, 4, "F");
  let y2 = MARGIN + 6;
  const badgeW = 28;
  const badgeH = 9;
  doc.setFillColor(...BRAND_PURPLE);
  roundedRectPDF(doc, MARGIN, y2, badgeW, badgeH, 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`STEP ${step.stepNumber}`, MARGIN + badgeW / 2, y2 + 5.8, { align: "center" });
  const stepTitle = step.description || step.elementText ? step.description?.split("\n")[0] ?? `Click on ${step.elementTag ?? "element"}` : `Step ${step.stepNumber}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...TEXT_DARK);
  doc.text(stepTitle, MARGIN + badgeW + 5, y2 + 6.5);
  y2 += badgeH + 5;
  if (step.pageUrl) {
    doc.setFillColor(255, 255, 255);
    doc.rect(MARGIN, y2, CONTENT_W, 6, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXT_GREY);
    const shortUrl = step.pageUrl.length > 80 ? step.pageUrl.slice(0, 77) + "..." : step.pageUrl;
    doc.text(`🔗 ${shortUrl}`, MARGIN + 2, y2 + 4);
    y2 += 8;
  }
  const screenshotDataUrl = step.screenshotDataUrl || step.rawScreenshotDataUrl;
  if (screenshotDataUrl) {
    try {
      const imgInfo = await getImageDimensions(screenshotDataUrl);
      const maxImgH = 160;
      const aspectRatio = imgInfo.width / imgInfo.height;
      const imgW = CONTENT_W;
      const imgH = Math.min(imgW / aspectRatio, maxImgH);
      doc.setFillColor(220, 215, 240);
      doc.rect(MARGIN + 1.5, y2 + 1.5, CONTENT_W, imgH, "F");
      doc.addImage(
        screenshotDataUrl,
        "PNG",
        MARGIN,
        y2,
        CONTENT_W,
        imgH,
        void 0,
        "FAST"
      );
      doc.setDrawColor(...BRAND_PURPLE_LIGHT);
      doc.setLineWidth(0.3);
      doc.rect(MARGIN, y2, CONTENT_W, imgH);
      y2 += imgH + 6;
    } catch (err2) {
      console.warn("[AutoDoc PDF] Failed to add image for step", step.stepNumber, err2);
      y2 += 4;
    }
  }
  if (step.description || step.isNote) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_PURPLE);
    doc.text("DESCRIPTION", MARGIN, y2 + 3);
    y2 += 6;
    const descText = step.isNote ? step.noteContent ?? "" : step.description ?? "";
    if (descText) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...TEXT_DARK);
      const lines = doc.splitTextToSize(descText, CONTENT_W - 8);
      const textH = lines.length * 5 + 6;
      doc.setFillColor(255, 255, 255);
      roundedRectPDF(doc, MARGIN, y2, CONTENT_W, textH, 2);
      doc.setDrawColor(230, 225, 255);
      doc.setLineWidth(0.2);
      roundedRectStrokePDF(doc, MARGIN, y2, CONTENT_W, textH, 2);
      doc.setFillColor(...BRAND_PURPLE_LIGHT);
      doc.rect(MARGIN, y2, 2, textH, "F");
      doc.text(lines, MARGIN + 5, y2 + 5);
      y2 += textH + 5;
    }
  }
  const timestamp = new Date(step.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...TEXT_GREY);
  doc.text(
    `Captured at ${timestamp}  ·  Step ${pageIndex} of ${totalSteps}`,
    PAGE_W - MARGIN,
    PAGE_H - 10,
    { align: "right" }
  );
  doc.setFillColor(...BRAND_PURPLE);
  doc.rect(0, PAGE_H - 4, PAGE_W, 4, "F");
}
function addPageNumbers(doc, stepCount) {
  const totalPages = stepCount + 1;
  for (let i2 = 2; i2 <= totalPages; i2++) {
    doc.setPage(i2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_GREY);
    doc.text(`Page ${i2} of ${totalPages}`, MARGIN, PAGE_H - 10);
  }
}
function exportSessionAsHtml(session2) {
  const stepsHtml = session2.steps.map(
    (step) => `
    <div class="step">
      <div class="step-header">
        <span class="step-badge">STEP ${step.stepNumber}</span>
        <span class="step-title">${escapeHtml$1(step.description?.split("\n")[0] ?? `Step ${step.stepNumber}`)}</span>
      </div>
      ${step.pageUrl ? `<div class="step-url">🔗 ${escapeHtml$1(step.pageUrl)}</div>` : ""}
      <img class="step-screenshot" src="${step.screenshotDataUrl}" alt="Step ${step.stepNumber} screenshot" />
      ${step.description ? `<div class="step-description">${escapeHtml$1(step.description)}</div>` : ""}
      <div class="step-meta">Captured at ${new Date(step.timestamp).toLocaleString()}</div>
    </div>
  `
  ).join("");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml$1(session2.name)} — AutoDoc</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7ff; color: #0f0a28; }
  .cover { background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%); color: white; padding: 60px 40px; text-align: center; }
  .cover-title { font-size: 36px; font-weight: 800; margin-bottom: 12px; }
  .cover-subtitle { font-size: 20px; opacity: 0.8; margin-bottom: 8px; }
  .cover-meta { font-size: 13px; opacity: 0.6; margin-top: 20px; }
  .cover-metadata { display: inline-flex; flex-direction: column; gap: 6px; margin-top: 16px; background: rgba(255,255,255,0.1); border-radius: 10px; padding: 14px 24px; text-align: left; font-size: 13px; }
  .cover-metadata-row { display: flex; gap: 8px; }
  .cover-metadata-label { opacity: 0.6; font-weight: 600; min-width: 110px; }
  .cover-metadata-value { font-weight: 500; }
  .steps { max-width: 900px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 40px; }
  .step { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.1); }
  .step-header { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid #f0eeff; }
  .step-badge { background: #7c3aed; color: white; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
  .step-title { font-size: 15px; font-weight: 600; color: #1e1b4b; }
  .step-url { padding: 6px 20px; font-size: 11px; color: #6b7280; background: #f8f7ff; word-break: break-all; }
  .step-screenshot { width: 100%; display: block; }
  .step-description { padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #374151; border-left: 3px solid #7c3aed; margin: 12px 20px; border-radius: 0 8px 8px 0; background: #f9f7ff; white-space: pre-wrap; }
  .step-meta { padding: 8px 20px 16px; font-size: 11px; color: #9ca3af; }
  footer { text-align: center; padding: 24px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
</style>
</head>
<body>
<div class="cover">
  <div class="cover-title">Process Documentation</div>
  <div class="cover-subtitle">${escapeHtml$1(session2.name)}</div>
  <div class="cover-meta">${session2.steps.length} steps · Generated ${formatDate(session2.createdAt)}</div>
  ${session2.metadata ? `<div class="cover-metadata">
    <div class="cover-metadata-row"><span class="cover-metadata-label">Feature Name:</span><span class="cover-metadata-value">${escapeHtml$1(session2.metadata.featureName)}</span></div>
    <div class="cover-metadata-row"><span class="cover-metadata-label">Environment:</span><span class="cover-metadata-value">${escapeHtml$1(session2.metadata.environmentType)}</span></div>
    <div class="cover-metadata-row"><span class="cover-metadata-label">Generated On:</span><span class="cover-metadata-value">${escapeHtml$1(session2.metadata.recordingDate)}</span></div>
  </div>` : ""}
</div>
<div class="steps">
${stepsHtml}
</div>
<footer>Generated by AutoDoc &mdash; Click-to-Documentation Generator</footer>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a2 = document.createElement("a");
  a2.href = url;
  a2.download = buildExportFilename(session2) + ".html";
  document.body.appendChild(a2);
  a2.click();
  document.body.removeChild(a2);
  setTimeout(() => URL.revokeObjectURL(url), 5e3);
}
async function downloadAllScreenshots(session2) {
  const screenshotSteps = session2.steps.filter(
    (s2) => !s2.isNote && (s2.screenshotDataUrl || s2.rawScreenshotDataUrl)
  );
  if (screenshotSteps.length === 0) {
    throw new Error("No screenshots to download.");
  }
  const zip = new JSZip();
  function dataUrlToUint8Array(dataUrl) {
    const base64 = dataUrl.split(",")[1];
    if (!base64) throw new Error("Invalid data URL");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i2 = 0; i2 < binary.length; i2++) {
      bytes[i2] = binary.charCodeAt(i2);
    }
    return bytes;
  }
  const namePrefix = session2.metadata ? buildMetadataPrefix(session2.metadata) : null;
  for (const step of screenshotSteps) {
    const dataUrl = step.screenshotDataUrl || step.rawScreenshotDataUrl;
    const paddedNumber = String(step.stepNumber).padStart(3, "0");
    const filename = namePrefix ? `${namePrefix}_Step-${paddedNumber}.png` : `Step-${paddedNumber}.png`;
    zip.file(filename, dataUrlToUint8Array(dataUrl));
  }
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const url = URL.createObjectURL(blob);
  const a2 = document.createElement("a");
  a2.href = url;
  a2.download = buildExportFilename(session2) + ".zip";
  document.body.appendChild(a2);
  a2.click();
  document.body.removeChild(a2);
  setTimeout(() => URL.revokeObjectURL(url), 1e4);
}
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\-_\s]/gi, "").trim().replace(/\s+/g, "-") || "autodoc-export";
}
function buildMetadataPrefix(metadata) {
  const feature = metadata.featureName.trim().replace(/\s+/g, "-");
  const env = metadata.environmentType.replace(/\s+/g, "-");
  return sanitizeFilename(`${feature}_${env}`);
}
function buildExportFilename(session2) {
  if (session2.metadata) {
    return `${buildMetadataPrefix(session2.metadata)}_${session2.metadata.recordingDate}`;
  }
  return sanitizeFilename(session2.name);
}
function escapeHtml$1(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function wrapText(doc, text, maxWidth, fontSize) {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  return lines.slice(0, 2).join("\n");
}
function getImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}
function roundedRectPDF(doc, x2, y2, w2, h2, r) {
  doc.roundedRect(x2, y2, w2, h2, r, r, "F");
}
function roundedRectStrokePDF(doc, x2, y2, w2, h2, r) {
  doc.roundedRect(x2, y2, w2, h2, r, r, "S");
}
const sessionNameInput = document.getElementById("session-name-input");
const totalStepsEl = document.getElementById("total-steps");
const stepList = document.getElementById("step-list");
const emptyState = document.getElementById("empty-state");
const welcomePanel = document.getElementById("welcome-panel");
const stepDetail = document.getElementById("step-detail");
const detailBadge = document.getElementById("detail-badge");
const detailUrl = document.getElementById("detail-url");
const detailTimestamp = document.getElementById("detail-timestamp");
const screenshotImg = document.getElementById("screenshot-img");
const elementInfo = document.getElementById("element-info");
const elementTag = document.getElementById("element-tag");
const elementText = document.getElementById("element-text");
const stepDescription = document.getElementById("step-description");
const charCount = document.getElementById("char-count");
const navIndicator = document.getElementById("nav-indicator");
const btnPrev = document.getElementById("btn-prev-step");
const btnNext = document.getElementById("btn-next-step");
const btnExportPdf = document.getElementById("btn-export-pdf");
const btnExportHtml = document.getElementById("btn-export-html");
const btnDownloadScreenshots = document.getElementById("btn-download-screenshots");
const btnAddNote = document.getElementById("btn-add-note");
const btnRenumber = document.getElementById("btn-renumber");
const btnDeleteStep = document.getElementById("btn-delete-step");
const btnAutoDesc = document.getElementById("btn-auto-desc");
const btnViewFullscreen = document.getElementById("btn-view-fullscreen");
const noteModalOverlay = document.getElementById("note-modal-overlay");
const noteContent = document.getElementById("note-content");
const notePosition = document.getElementById("note-position");
const noteCancel = document.getElementById("note-cancel");
const noteConfirm = document.getElementById("note-confirm");
const noteModalClose = document.getElementById("note-modal-close");
const fullscreenOverlay = document.getElementById("fullscreen-overlay");
const fullscreenImg = document.getElementById("fullscreen-img");
const fullscreenClose = document.getElementById("fullscreen-close");
const exportLoading = document.getElementById("export-loading");
const exportLoadingText = document.getElementById("export-loading-text");
const toastEl = document.getElementById("toast");
const topbarMetadata = document.getElementById("topbar-metadata");
const topbarMetaFeature = document.getElementById("topbar-meta-feature");
const topbarMetaEnv = document.getElementById("topbar-meta-env");
const topbarMetaDate = document.getElementById("topbar-meta-date");
let session = null;
let selectedStepId = null;
let targetSessionId = null;
let saveTimer = null;
async function init() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("sessionId");
  const action = params.get("action");
  if (!sessionId) {
    showToast("No session specified. Please start a recording first.");
    return;
  }
  targetSessionId = sessionId;
  let loaded = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    loaded = await getSession(sessionId);
    if (loaded) break;
    await new Promise((r) => setTimeout(r, [0, 150, 300, 500, 750, 1e3][attempt] ?? 1e3));
  }
  if (!loaded) {
    showToast("Session not found — waiting for recording to begin...");
    return;
  }
  session = loaded;
  renderAll();
  initSortable();
  if (session.steps.length > 0) {
    selectStep(session.steps[0].id);
  }
  if (action === "export") {
    setTimeout(() => handleExportPdf(), 500);
  }
}
async function reloadCurrentSession() {
  if (!session) return;
  const previousSelectedStepId = selectedStepId;
  const updated = await getSession(session.id);
  if (!updated) return;
  session = updated;
  renderAll();
  if (previousSelectedStepId && session.steps.some((step) => step.id === previousSelectedStepId)) {
    selectStep(previousSelectedStepId);
    return;
  }
  const firstStep = session.steps[0];
  if (firstStep) {
    selectStep(firstStep.id);
  }
}
chrome.storage.local.onChanged.addListener((changes) => {
  if (!changes[STORAGE_KEYS.SESSIONS]) return;
  const sessions = changes[STORAGE_KEYS.SESSIONS].newValue;
  if (!sessions) return;
  const id = session?.id ?? targetSessionId;
  if (!id) return;
  const updated = sessions.find((s2) => s2.id === id);
  if (!updated) return;
  const prevStepCount = session?.steps.length ?? -1;
  const isNewSession = !session;
  session = updated;
  if (isNewSession) {
    renderAll();
    initSortable();
  } else {
    renderAll();
  }
  if (prevStepCount === 0 || prevStepCount === -1) {
    if (session.steps.length > 0) {
      selectStep(session.steps[0].id);
    }
  } else if (selectedStepId && session.steps.some((s2) => s2.id === selectedStepId)) {
    selectStep(selectedStepId);
  }
});
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "STATE_UPDATE") return;
  const id = session?.id ?? targetSessionId;
  if (!id || msg.sessionId !== id) return;
  if (session) reloadCurrentSession();
});
function renderAll() {
  if (!session) return;
  document.title = `${session.name} — AutoDoc`;
  sessionNameInput.value = session.name;
  totalStepsEl.textContent = String(session.steps.length);
  if (session.metadata) {
    topbarMetaFeature.textContent = session.metadata.featureName;
    topbarMetaEnv.textContent = session.metadata.environmentType;
    topbarMetaDate.textContent = session.metadata.recordingDate;
    topbarMetadata.style.display = "flex";
  } else {
    topbarMetadata.style.display = "none";
  }
  const hasSteps = session.steps.length > 0;
  emptyState.style.display = hasSteps ? "none" : "flex";
  stepList.innerHTML = "";
  session.steps.forEach((step) => {
    stepList.appendChild(createStepThumbnail(step));
  });
  updateNotePositionSelect();
}
function createStepThumbnail(step) {
  const li = document.createElement("li");
  li.className = `step-item${step.isNote ? " is-note" : ""}${selectedStepId === step.id ? " active" : ""}`;
  li.dataset["stepId"] = step.id;
  li.setAttribute("role", "listitem");
  const desc = step.isNote ? (step.noteContent ?? "").slice(0, 60) : (step.description ?? "").slice(0, 50) || `Step ${step.stepNumber}`;
  li.innerHTML = `
    <div class="step-thumb-header">
      <span class="step-thumb-badge">
        ${step.isNote ? "📝 NOTE" : `STEP ${step.stepNumber}`}
      </span>
      <div class="step-thumb-actions">
        <button class="thumb-icon-btn delete-btn" title="Delete step" data-step-id="${step.id}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    ${step.isNote ? `<div class="step-thumb-note-preview">${escapeHtml(desc)}</div>` : `<img class="step-thumb-img" src="${step.screenshotDataUrl}" alt="Step ${step.stepNumber}" loading="lazy" />`}
    <div class="step-thumb-desc">${escapeHtml(desc)}</div>
  `;
  li.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".delete-btn")) {
      selectStep(step.id);
    }
  });
  li.querySelector(".delete-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    confirmDeleteStep(step.id);
  });
  return li;
}
function selectStep(stepId) {
  if (!session) return;
  selectedStepId = stepId;
  const step = session.steps.find((s2) => s2.id === stepId);
  if (!step) return;
  document.querySelectorAll(".step-item").forEach((el) => {
    el.classList.toggle("active", el.dataset["stepId"] === stepId);
  });
  welcomePanel.style.display = "none";
  stepDetail.style.display = "flex";
  detailBadge.textContent = step.isNote ? "📝 NOTE" : `STEP ${step.stepNumber}`;
  detailUrl.textContent = step.pageUrl ?? "";
  detailTimestamp.textContent = formatDate(step.timestamp);
  if (step.isNote) {
    screenshotImg.style.display = "none";
  } else {
    screenshotImg.style.display = "block";
    screenshotImg.src = step.screenshotDataUrl;
    screenshotImg.alt = `Step ${step.stepNumber} screenshot`;
  }
  if (step.elementTag) {
    elementInfo.style.display = "flex";
    elementTag.textContent = step.elementTag;
    elementText.textContent = step.elementText ?? "";
  } else {
    elementInfo.style.display = "none";
  }
  stepDescription.value = step.isNote ? step.noteContent ?? "" : step.description ?? "";
  updateCharCount();
  const idx = session.steps.findIndex((s2) => s2.id === stepId);
  navIndicator.textContent = `${idx + 1} / ${session.steps.length}`;
  btnPrev.disabled = idx === 0;
  btnNext.disabled = idx === session.steps.length - 1;
  const thumbEl = stepList.querySelector(`[data-step-id="${stepId}"]`);
  thumbEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function updateCharCount() {
  charCount.textContent = `${stepDescription.value.length} characters`;
}
function updateNotePositionSelect() {
  if (!session) return;
  notePosition.innerHTML = '<option value="-1">At the beginning</option>';
  session.steps.forEach((step, i2) => {
    const opt = document.createElement("option");
    opt.value = String(i2);
    opt.textContent = step.isNote ? `After note at position ${i2 + 1}` : `After Step ${step.stepNumber}`;
    notePosition.appendChild(opt);
  });
}
function initSortable() {
  Sortable.create(stepList, {
    animation: 200,
    ghostClass: "sortable-ghost",
    dragClass: "sortable-drag",
    handle: ".step-item",
    onEnd: async (evt) => {
      if (!session) return;
      const oldIdx = evt.oldIndex;
      const newIdx = evt.newIndex;
      if (oldIdx === newIdx) return;
      const steps = [...session.steps];
      const [moved2] = steps.splice(oldIdx, 1);
      if (moved2) {
        steps.splice(newIdx, 0, moved2);
      }
      const renumbered = renumberSteps(steps);
      session = { ...session, steps: renumbered };
      await persistSession();
      renderAll();
      if (moved2) selectStep(moved2.id);
      showToast("Steps reordered");
    }
  });
}
function confirmDeleteStep(stepId) {
  if (!session) return;
  const step = session.steps.find((s2) => s2.id === stepId);
  if (!step) return;
  const label = step.isNote ? "this note" : `Step ${step.stepNumber}`;
  if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
  deleteStep(stepId);
}
async function deleteStep(stepId) {
  if (!session) return;
  const wasSelected = selectedStepId === stepId;
  const idx = session.steps.findIndex((s2) => s2.id === stepId);
  const steps = session.steps.filter((s2) => s2.id !== stepId);
  const renumbered = renumberSteps(steps);
  session = { ...session, steps: renumbered };
  await persistSession();
  renderAll();
  if (wasSelected) {
    const newSteps = session.steps;
    if (newSteps.length === 0) {
      welcomePanel.style.display = "flex";
      stepDetail.style.display = "none";
      selectedStepId = null;
    } else {
      const nextStep = newSteps[Math.min(idx, newSteps.length - 1)];
      if (nextStep) selectStep(nextStep.id);
    }
  }
  showToast("Step deleted");
}
function renumberSteps(steps) {
  let stepNum = 1;
  return steps.map((step) => {
    if (step.isNote) {
      return { ...step };
    }
    return { ...step, stepNumber: stepNum++ };
  });
}
function openNoteModal() {
  updateNotePositionSelect();
  noteContent.value = "";
  noteModalOverlay.style.display = "flex";
  noteContent.focus();
}
function closeNoteModal() {
  noteModalOverlay.style.display = "none";
}
async function insertNote() {
  if (!session) return;
  const content = noteContent.value.trim();
  if (!content) {
    showToast("Please enter note content");
    return;
  }
  const note = {
    id: generateId(),
    stepNumber: 0,
    timestamp: Date.now(),
    screenshotDataUrl: "",
    rawScreenshotDataUrl: "",
    clickX: 0,
    clickY: 0,
    clickXPercent: 0,
    clickYPercent: 0,
    pageUrl: "",
    pageTitle: "",
    description: "",
    isNote: true,
    noteContent: content
  };
  const insertAfter = parseInt(notePosition.value, 10);
  const steps = [...session.steps];
  if (insertAfter < 0) {
    steps.unshift(note);
  } else {
    steps.splice(insertAfter + 1, 0, note);
  }
  const renumbered = renumberSteps(steps);
  session = { ...session, steps: renumbered };
  await persistSession();
  closeNoteModal();
  renderAll();
  selectStep(note.id);
  showToast("Note inserted");
}
async function persistSession() {
  if (!session) return;
  await saveSession(session);
}
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await persistSession();
  }, 800);
}
async function handleExportPdf() {
  if (!session || session.steps.length === 0) {
    showToast("No steps to export");
    return;
  }
  exportLoadingText.textContent = "Generating PDF...";
  exportLoading.style.display = "flex";
  btnExportPdf.disabled = true;
  try {
    await exportSessionAsPdf(session);
    showToast("PDF exported successfully! 🎉");
  } catch (err2) {
    console.error("[AutoDoc Editor] PDF export failed:", err2);
    showToast("PDF export failed. Please try again.");
  } finally {
    btnExportPdf.disabled = false;
    exportLoading.style.display = "none";
  }
}
function handleExportHtml() {
  if (!session || session.steps.length === 0) {
    showToast("No steps to export");
    return;
  }
  exportSessionAsHtml(session);
  showToast("HTML exported successfully! 🌐");
}
async function handleDownloadScreenshots() {
  if (!session || session.steps.filter((s2) => !s2.isNote).length === 0) {
    showToast("No screenshots to download");
    return;
  }
  exportLoadingText.textContent = "Downloading screenshots...";
  exportLoading.style.display = "flex";
  btnDownloadScreenshots.disabled = true;
  try {
    await downloadAllScreenshots(session);
    showToast(`${session.steps.filter((s2) => !s2.isNote).length} screenshots downloaded! 🖼️`);
  } catch (err2) {
    console.error("[AutoDoc Editor] Screenshot download failed:", err2);
    showToast("Download failed. Please try again.");
  } finally {
    btnDownloadScreenshots.disabled = false;
    exportLoading.style.display = "none";
  }
}
let toastTimer = null;
function showToast(message, duration = 3e3) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), duration);
}
function generateAutoDescription() {
  if (!session || !selectedStepId) return "";
  const step = session.steps.find((s2) => s2.id === selectedStepId);
  if (!step || step.isNote) return "";
  const tag = step.elementTag?.toUpperCase() ?? "";
  const text = step.elementText ?? "";
  const pageTitle = step.pageTitle ?? "";
  if (tag === "BUTTON" || tag === "INPUT[TYPE=SUBMIT]") {
    return text ? `Click the "${text}" button` : `Click the button on ${pageTitle}`;
  }
  if (tag === "A") {
    return text ? `Click the "${text}" link` : `Click the link to navigate`;
  }
  if (tag === "INPUT" || tag === "TEXTAREA") {
    return text ? `Enter text in the "${text}" field` : `Fill in the input field`;
  }
  if (tag === "SELECT") {
    return `Select an option from the dropdown`;
  }
  if (text) {
    return `Click on "${text}"`;
  }
  return `Interact with the ${tag.toLowerCase()} element on ${pageTitle}`;
}
sessionNameInput.addEventListener("input", () => {
  if (!session) return;
  session = { ...session, name: sessionNameInput.value };
  document.title = `${session.name} — AutoDoc`;
  scheduleSave();
});
stepDescription.addEventListener("input", () => {
  if (!session || !selectedStepId) return;
  const step = session.steps.find((s2) => s2.id === selectedStepId);
  if (!step) return;
  const value = stepDescription.value;
  const updatedStep = step.isNote ? { ...step, noteContent: value } : { ...step, description: value };
  session = {
    ...session,
    steps: session.steps.map((s2) => s2.id === selectedStepId ? updatedStep : s2)
  };
  updateCharCount();
  scheduleSave();
  const thumbDesc = stepList.querySelector(`[data-step-id="${selectedStepId}"] .step-thumb-desc`);
  if (thumbDesc) thumbDesc.textContent = value.slice(0, 50);
});
btnAutoDesc.addEventListener("click", () => {
  const desc = generateAutoDescription();
  if (desc) {
    stepDescription.value = desc;
    stepDescription.dispatchEvent(new Event("input"));
    showToast("Description auto-generated ✨");
  }
});
btnPrev.addEventListener("click", () => {
  if (!session || !selectedStepId) return;
  const idx = session.steps.findIndex((s2) => s2.id === selectedStepId);
  if (idx > 0) selectStep(session.steps[idx - 1].id);
});
btnNext.addEventListener("click", () => {
  if (!session || !selectedStepId) return;
  const idx = session.steps.findIndex((s2) => s2.id === selectedStepId);
  if (idx < session.steps.length - 1) selectStep(session.steps[idx + 1].id);
});
btnDeleteStep.addEventListener("click", () => {
  if (selectedStepId) confirmDeleteStep(selectedStepId);
});
btnRenumber.addEventListener("click", async () => {
  if (!session) return;
  session = { ...session, steps: renumberSteps(session.steps) };
  await persistSession();
  renderAll();
  if (selectedStepId) selectStep(selectedStepId);
  showToast("Steps renumbered");
});
btnExportPdf.addEventListener("click", handleExportPdf);
btnExportHtml.addEventListener("click", handleExportHtml);
btnDownloadScreenshots.addEventListener("click", handleDownloadScreenshots);
btnAddNote.addEventListener("click", openNoteModal);
noteCancel.addEventListener("click", closeNoteModal);
noteModalClose.addEventListener("click", closeNoteModal);
noteModalOverlay.addEventListener("click", (e) => {
  if (e.target === noteModalOverlay) closeNoteModal();
});
noteConfirm.addEventListener("click", insertNote);
noteContent.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) insertNote();
});
btnViewFullscreen.addEventListener("click", () => {
  if (!session || !selectedStepId) return;
  const step = session.steps.find((s2) => s2.id === selectedStepId);
  if (!step || !step.screenshotDataUrl) return;
  fullscreenImg.src = step.screenshotDataUrl;
  fullscreenOverlay.style.display = "flex";
});
fullscreenClose.addEventListener("click", () => {
  fullscreenOverlay.style.display = "none";
});
fullscreenOverlay.addEventListener("click", (e) => {
  if (e.target === fullscreenOverlay) fullscreenOverlay.style.display = "none";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (fullscreenOverlay.style.display !== "none") {
      fullscreenOverlay.style.display = "none";
    }
    if (noteModalOverlay.style.display !== "none") {
      closeNoteModal();
    }
  }
  if (e.key === "ArrowLeft" && !isInputFocused()) {
    btnPrev.click();
  }
  if (e.key === "ArrowRight" && !isInputFocused()) {
    btnNext.click();
  }
  if (e.key === "Delete" && !isInputFocused() && selectedStepId) {
    confirmDeleteStep(selectedStepId);
  }
});
function isInputFocused() {
  const active = document.activeElement;
  return active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement;
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
init().catch(console.error);
export {
  _typeof as _,
  commonjsGlobal as c,
  getDefaultExportFromCjs as g
};
