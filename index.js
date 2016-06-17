'use strict';

const _ = require('underscore');
const uniq = require('array-uniq');

const SPLITTER = ',';

/**
 * 转为数组
 * @param  {[type]} value    待转换的值
 * @param  {[type]} splitter 分隔符
 * @return {[type]}          数组
 */
function toArray(obj, splitter) {
  if (_.isArray(obj)) {
    return obj;
  } else if (_.isString(obj)) {
    if (!splitter) {
      splitter = SPLITTER;
    }
    return obj.split(splitter);
  } else if (_.isObject(obj)) {
    let array = [];
    for (let key in obj) {
      array.push(obj[key]);
    }
  } else {
    return [];
  }
}

/**
 * 数组字符串
 * @param {Object} obj     初始值
 * @param {Object} options 配置
 */
function ArrayString(obj, options) {
  if (!options) {
    options = {};
  }
  this.splitter = options.splitter || SPLITTER;
  this.keepChained = options.keepChained || true;
  this.data = toArray(obj, this.splitter);
}

/**
 * 转为字符串
 * @return {[type]} [description]
 */
ArrayString.prototype.toString = function () {
  return this.data.join(this.splitter);
};

/**
 * 遍历内容，第一个参数为值，第二个参数为序号
 * http://underscorejs.org/#each
 * @return {[type]} [description]
 */
ArrayString.prototype.each = function (iteratee) {
  _.each(this.data, iteratee);
  return this;
};

/**
 * 取出最后一个元素
 * 如果有回调方法
 * @return {[type]} [description]
 */
ArrayString.prototype.pop = function (handler) {
  let value = this.data.pop();
  if (handler) {
    handler(value);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return value;
  }
};

/**
 * 如果元素不存在，则放入该元素
 * @return {[type]} [description]
 */
ArrayString.prototype.uniqPush = function (value) {
  if (!_.contains(this.data, value)) {
    this.data.push(value);
  }
  return this;
};

/**
 * 放入一个元素
 * @return {[type]} [description]
 */
ArrayString.prototype.push = function (value) {
  this.data.push(value);
  return this;
};

/**
 * 替换某个值
 * @return {[type]} [description]
 */
ArrayString.prototype.replaceWith = function (toBeReplace, replacement) {
  this.data = _.without(this.data, toBeReplace);
  this.data.push(replacement);
  return this;
};


/**
 * 取出第一个元素
 * @return {[type]} [description]
 */
ArrayString.prototype.shift = function (handler) {
  let value = this.data.shift();
  if (handler) {
    handler(value);
  }

  if (this.keepChained) {
    return this;
  } else {
    return value;
  }
};

/**
 * 放入一个元素到最前头
 * @return {[type]} [description]
 */
ArrayString.prototype.unshift = function (value) {
  this.data.unshift(value);
  return this;
};

/**
 * 是否包含某个值
 * http://underscorejs.org/#contains
 * @return {[type]} [description]
 */
ArrayString.prototype.contains = function (value, handler) {
  let result = _.contains(this.data, value);
  if (handler) {
    handler(result);
  }

  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查找符合校验方法的第一个结果
 * http://underscorejs.org/#find
 * @return {[type]} [description]
 */
ArrayString.prototype.find = function (predicate, handler) {
  let result = _.find(this.data, predicate);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查找符合校验方法的第一个结果序号
 * http://underscorejs.org/#findIndex
 * @return {[type]} [description]
 */
ArrayString.prototype.findIndex = function (predicate, handler) {
  let result = _.findIndex(this.data, predicate);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查找符合校验方法的最后一个结果序号
 * http://underscorejs.org/#findLastIndex
 * @return {[type]} [description]
 */
ArrayString.prototype.findLastIndex = function (predicate, handler) {
  let result = _.findLastIndex(this.data, predicate);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查询指定元素的位置
 * @return {[type]} [description]
 */
ArrayString.prototype.indexOf = function (value, handler) {
  let result = this.data.indexOf(value);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 获取指定元素的最后位置
 * @return {[type]} [description]
 */
ArrayString.prototype.lastIndexOf = function (value, handler) {
  let result = this.data.lastIndexOf(value);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 排序
 * @return {[type]} [description]
 */
ArrayString.prototype.sort = function (predicate, handler) {
  let result = this.data.sort(predicate);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查找最大值
 * http://underscorejs.org/#max
 * @return {[type]} [description]
 */
ArrayString.prototype.max = function (handler) {
  let result = _.max(this.data);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 查找最小值
 * http://underscorejs.org/#min
 * @return {[type]} [description]
 */
ArrayString.prototype.min = function (handler) {
  let result = _.min(this.data);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 去掉空字符串
 * http://underscorejs.org/#compact
 * @return {[type]} [description]
 */
ArrayString.prototype.compact = function () {
  this.data = _.compact(this.data);
  return this;
};

/**
 * 拼接数组
 * http://underscorejs.org/#union
 * @return {[type]} [description]
 */
ArrayString.prototype.union = function () {
  let args = Array.prototype.slice.call(arguments);
  let newArgs = [];
  for (let arg of args) {
    newArgs.push(toArray(arg));
  }
  args = newArgs;

  if (args.length > 0) {
    args.unshift(this.data);
    this.data = _.union.apply(_, args);
  }
  return this;
};

/**
 * 排除某些元素
 * http://underscorejs.org/#without
 * @return {[type]} [description]
 */
ArrayString.prototype.without = function () {
  let args = Array.prototype.slice.call(arguments);
  if (args.length > 0) {
    args.unshift(this.data);
    this.data = _.without.apply(_, args);
  }
  return this;
};

/**
 * 去除重复内容
 * http://underscorejs.org/#uniq
 * @return {[type]} [description]
 */
ArrayString.prototype.uniq = function () {
  this.data = uniq(this.data);
  return this;
};

/**
 * 抽样
 * http://underscorejs.org/#sample
 * @return {[type]} [description]
 */
ArrayString.prototype.sample = function (handler) {
  let result = _.sample(this.data);
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

/**
 * 元素数量
 * @return {[type]} [description]
 */
ArrayString.prototype.size = function (handler) {
  let result = this.data.length;
  if (handler) {
    handler(result);
  }
  
  if (this.keepChained) {
    return this;
  } else {
    return result;
  }
};

module.exports = ArrayString;