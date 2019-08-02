/**
 * Babel 转换的 extends
 * 1. 创建好父子构造函数
 * 2. 以父类为副本创建一个对象，并且将这个对象作为子类的显式原型链，同时将次对象的construvtor属性指回到子类
 * 3. 将子类的静态方法链接到父类上
 * 4. 使用apply将子类实例运行一遍到父构造函数上，挂载对应的属性和方法。
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { 
  if (call && (_typeof(call) === "object" || typeof call === "function")) { 
    return call; 
  } 
  return _assertThisInitialized(self); 
}

function _assertThisInitialized(self) { 
  if (self === void 0) { 
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); 
  } 
  return self; 
}

// 再把构造函数的原型拿过来
function _getPrototypeOf(o) { 
  _getPrototypeOf = Object.setPrototypeOf ? 
    Object.getPrototypeOf : 
    function _getPrototypeOf(o) { 
      return o.__proto__ || Object.getPrototypeOf(o); 
    }; 
  return _getPrototypeOf(o); 
}

function _inherits(subClass, superClass) { 
  if (typeof superClass !== "function" && superClass !== null) { 
    throw new TypeError("Super expression must either be null or a function"); 
  } 
  // 以superClass为副本创建一个对象
  subClass.prototype = Object.create(superClass && superClass.prototype, 
  { 
    constructor: { 
      value: subClass, 
      writable: true, 
      configurable: true 
    } 
  }); 
  // 搞一搞静态方法的链接
  if (superClass) _setPrototypeOf(subClass, superClass); 
}

function _setPrototypeOf(o, p) { 
  _setPrototypeOf = Object.setPrototypeOf || 
    function _setPrototypeOf(o, p) { 
      o.__proto__ = p; return o; 
    }; 
  return _setPrototypeOf(o, p); 
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left); 
  } else { 
    return left instanceof right; 
  } 
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Father = function Father() {
  _classCallCheck(this, Father); // 判断是否是以一个普通函数调用
};

var Son =
/*#__PURE__*/
function (_Father) {
  _inherits(Son, _Father);
  function Son() {
    _classCallCheck(this, Son);
    return _possibleConstructorReturn(this, _getPrototypeOf(Son).apply(this, arguments));
  }
  return Son;
}(Father);