/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import expect = require('expect.js');

import {
  Queue
} from '../../lib/index';


describe('phosphor-queue', () => {

  describe('Queue', () => {

    describe('#constructor()', () => {

      it('should accept no arguments', () => {
        var q = new Queue<number>();
        expect(q.size).to.be(0);
      });

      it('should accept an array of initial items', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.toArray()).to.eql([0, 1, 2, 3]);
      });

    }),

    describe('#size', () => {

      it('should return the number of items in the queue', () => {
        var q = new Queue<number>();
        expect(q.size).to.be(0);
        q.push(0);
        expect(q.size).to.be(1);
        q.push(0);
        expect(q.size).to.be(2);
        q.pop();
        expect(q.size).to.be(1);
        q.pop();
        expect(q.size).to.be(0);
      });

    });

    describe('#empty', () => {

      it('should indicate whether the queue is empty', () => {
        var q = new Queue<number>();
        expect(q.empty).to.be(true);
        q.push(0);
        expect(q.empty).to.be(false);
        q.push(0);
        expect(q.empty).to.be(false);
        q.pop();
        expect(q.empty).to.be(false);
        q.pop();
        expect(q.empty).to.be(true);
      });

    });

    describe('#front', () => {

      it('should return `undefined` if the queue is empty', () => {
        var q = new Queue<number>();
        expect(q.front).to.be(void 0);
      });

      it('should return the value at the front of the queue', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.front).to.be(0);
        q.pop();
        expect(q.front).to.be(1);
        q.pop();
        expect(q.front).to.be(2);
        q.pop();
        expect(q.front).to.be(3);
        q.pop();
        expect(q.front).to.be(void 0);
      });

    });

    describe('#back', () => {

      it('should return `undefined` if the queue is empty', () => {
        var q = new Queue<number>();
        expect(q.back).to.be(void 0);
      });

      it('should return the value at the back of the queue', () => {
        var q = new Queue<number>();
        expect(q.back).to.be(void 0);
        q.push(0);
        expect(q.back).to.be(0);
        q.push(1);
        expect(q.back).to.be(1);
        q.push(2);
        expect(q.back).to.be(2);
        q.push(3);
        expect(q.back).to.be(3);
      });

    });

    describe('#push()', () => {

      it('should add the value to the back of the queue', () => {
        var q = new Queue<number>();
        q.push(0);
        q.push(1);
        q.push(2);
        q.push(3);
        expect(q.toArray()).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#pop()', () => {

      it('should return `undefined` if the queue is empty', () => {
        var q = new Queue<number>();
        expect(q.pop()).to.be(void 0);
      });

      it('should remove the value from the front of the queue', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.pop()).to.be(0);
        expect(q.pop()).to.be(1);
        expect(q.pop()).to.be(2);
        expect(q.pop()).to.be(3);
        expect(q.size).to.be(0);
      });

    });

    describe('#remove()', () => {

      it('should remove the first occurrence of a value', () => {
        var q = new Queue<number>([0, 1, 2, 1, 3]);
        q.remove(1);
        expect(q.front).to.be(0);
        expect(q.back).to.be(3);
        expect(q.size).to.be(4);
        expect(q.toArray()).to.eql([0, 2, 1, 3]);

        q.remove(3);
        expect(q.front).to.be(0);
        expect(q.back).to.be(1);
        expect(q.size).to.be(3);
        expect(q.toArray()).to.eql([0, 2, 1]);

        q.remove(0);
        expect(q.front).to.be(2);
        expect(q.back).to.be(1);
        expect(q.size).to.be(2);
        expect(q.toArray()).to.eql([2, 1]);

        q.remove(1);
        expect(q.front).to.be(2);
        expect(q.back).to.be(2);
        expect(q.size).to.be(1);
        expect(q.toArray()).to.eql([2]);

        q.remove(2);
        expect(q.front).to.be(void 0);
        expect(q.back).to.be(void 0);
        expect(q.size).to.be(0);
        expect(q.toArray()).to.eql([]);
      });

      it('should return `true` on success, `false` otherwise', () => {
        var q = new Queue<number>([0, 1, 2, 1, 3]);
        expect(q.remove(1)).to.be(true);
        expect(q.remove(1)).to.be(true);
        expect(q.remove(1)).to.be(false);
        expect(q.toArray()).to.eql([0, 2, 3]);
      });

    });

    describe('#removeAll()', () => {

      it('should remove all occurrences of a value', () => {
        var q1 = new Queue<number>([0, 1, 2, 1, 3]);
        q1.removeAll(1);
        expect(q1.front).to.be(0);
        expect(q1.back).to.be(3);
        expect(q1.size).to.be(3);
        expect(q1.toArray()).to.eql([0, 2, 3]);

        var q2 = new Queue<number>([0, 1, 2, 1, 0]);
        q2.removeAll(0);
        expect(q2.front).to.be(1);
        expect(q2.back).to.be(1);
        expect(q2.size).to.be(3);
        expect(q2.toArray()).to.eql([1, 2, 1]);

        q2.removeAll(1);
        expect(q2.front).to.be(2);
        expect(q2.back).to.be(2);
        expect(q2.size).to.be(1);
        expect(q2.toArray()).to.eql([2]);

        q2.removeAll(2);
        expect(q2.front).to.be(void 0);
        expect(q2.back).to.be(void 0);
        expect(q2.size).to.be(0);
        expect(q2.toArray()).to.eql([]);
      });

      it('should return the number of occurrences removed', () => {
        var q1 = new Queue<number>([0, 1, 2, 1, 3]);
        expect(q1.removeAll(1)).to.be(2);
        expect(q1.removeAll(9)).to.be(0);

        var q2 = new Queue<number>([0, 1, 0, 1, 0]);
        expect(q2.removeAll(0)).to.be(3);
        expect(q2.removeAll(9)).to.be(0);
      });

    });

    describe('#clear()', () => {

      it('should remove all values from the queue', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.size).to.be(4);
        q.clear();
        expect(q.size).to.be(0);
        expect(q.front).to.be(void 0);
        expect(q.back).to.be(void 0);
      });

    });

    describe('#toArray()', () => {

      it('should create an array from all values in the queue', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.toArray()).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#some()', () => {

      it('should return `true` if any value matches a predicate', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.some(v => v < 4)).to.be(true);
      });

      it('should return `false` if no value matched a predicate', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.some(v => v > 4)).to.be(false);
      });

      it('should pass the index of the value to the predicate', () => {
        var indices: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.some((v, i) => { indices.push(i); return false; });
        expect(indices).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#every()', () => {

      it('should return `true` if all values match a predicate', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.every(v => v < 4)).to.be(true);
      });

      it('should return `false` if all values do not match a predicate', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.every(v => v > 2)).to.be(false);
      });

      it('should pass the index of the value to the predicate', () => {
        var indices: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.every((v, i) => { indices.push(i); return true; });
        expect(indices).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#filter()', () => {

      it('should return the filtered array of values', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.filter(v => v < 2)).to.eql([0, 1]);
      });

      it('should pass the index of the value to the predicate', () => {
        var indices: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.filter((v, i) => { indices.push(i); return true; });
        expect(indices).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#map()', () => {

      it('should return the mapped array of values', () => {
        var q = new Queue<number>([0, 1, 2, 3]);
        expect(q.map(v => v * 2)).to.eql([0, 2, 4, 6]);
      });

      it('should pass the index of the value to the callback', () => {
        var indices: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.map((v, i) => { indices.push(i); return v; });
        expect(indices).to.eql([0, 1, 2, 3]);
      });

    });

    describe('#forEach()', () => {

      it('should invoke a callback for each value in the queue', () => {
        var values: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.forEach(v => { values.push(v) });
        expect(values).to.eql([0, 1, 2, 3]);
      });

      it('should pass the index of the value to the callback', () => {
        var indices: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.forEach((v, i) => { indices.push(i); });
        expect(indices).to.eql([0, 1, 2, 3]);
      });

      it('should stop iteration on a non-`undefined` result', () => {
        var values: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        q.forEach(v => { values.push(v); if (v == 2) return true; });
        expect(values).to.eql([0, 1, 2]);
      });

      it('should return the first non-`undefined` result', () => {
        var values: number[] = [];
        var q = new Queue<number>([0, 1, 2, 3]);
        var r = q.forEach(v => { values.push(v); if (v == 2) return true; });
        expect(r).to.be(true);
      });

    });

  });

});
