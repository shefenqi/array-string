'use strict';

const assert = require('assert');

const ArrayString = require('../index');

let array;
let string;
let as;

describe('ArrayString', function () {

  beforeEach(function() {
    array = [0, 1, 2, 3]
    string = array.join(',');
    as = new ArrayString(string);
  });

  it('toString()', function () {
    assert.strictEqual(as.toString(), string);
  });
  it('pop()', function () {
    as.pop();
    assert.strictEqual(as.toString(), '0,1,2');
  });
  it('push()', function () {
    assert.strictEqual(as.push('4').toString(), '0,1,2,3,4');
  });
  it('shift()', function () {
    as.shift();
    assert.strictEqual(as.toString(), '1,2,3');
  });
  it('unshift()', function () {
    assert.strictEqual(as.unshift('-1').toString(), '-1,0,1,2,3');
  });
  it('uniqPush()', function () {
    assert.strictEqual(as.uniqPush('4').toString(), '0,1,2,3,4');
  });
  it('uniqPush()', function () {
    assert.strictEqual(as.uniqPush('3').toString(), '0,1,2,3');
  });
  it('contains()', function () {
    as.contains('2', (result) => {
      assert.strictEqual(result, true);
    });
  });
  it('find()', function () {
    as.find((value) => {
      return value === '2';
    }, (el) => {
      assert.strictEqual(el, '2');
    });
  });
  it('without()', function () {
    assert.strictEqual(as.without('2').toString(), '0,1,3');
  });
  it('uniq()', function () {
    assert.strictEqual(as.push('2').push('3').push('4').uniq().toString(), '0,1,2,3,4');
  });
  it('contains()', function () {
    as.size((result) => {
      assert.strictEqual(result, 4);
    });
  });
  it('reverse()', function () {
    assert.strictEqual(as.reverse().toString(), '3,2,1,0');
  });

});
