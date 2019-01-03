const swapData = require("./swap");

/**
 * @Class PriorityQueue
 * @classdesc Priority Queue(우선순위 큐)에 저장되어 있는 각 요소들은 우선순위를 가지고 있으며, 컨테이너에 저장된 요소들 중 우선순위가 높은 요소부터 순차적으로 출력된다.
 * @param {String} value - ORDER BY
 * @param {String} [value.less=default] - desc(내림차순)
 * @param {String} value.greater - asc(오름차순)
 * @example 
 * var pq = new PriorityQueue ();
 * var pq = new PriorityQueue (“less”);
 * var pq = new PriorityQueue (“greater”);
 * @author ljsoo0925@gmail.com
 */
const PriorityQueue = function (value) {
  this.data = [];                                         // array position will be starts 0
  this.count = 0;
  if (value === "greater") {                               // based on Min_Heap
    this.mode = "min_heap";
  } else if (value === "less" || value === undefined) {     // DEFAULT : based on Max_Heap
    this.mode = "max_heap";
  } else {
    console.log("ERROR:input sort criteria (option:greater,less)");
  }
};

/**
 * @method PriorityQueue.isEmpty  
 * @description This method is used to check if this priority queue is empty.
 * @returns {Boolean} This method returns ‘true’ if this priority queue is empty or ‘false’ if this priority queue is not empty.
 * @example 
 * var pq = new PriorityQueue ();
 * var ret1 = pq.isEmpty(); // ret1 = true
 * pq.push(1);
 * var ret2 = pq.isEmpty(); // ret2 = false
 */
PriorityQueue.prototype.isEmpty = function () {
  return this.count === 0;
};

/**
 * @method PriorityQueue.size  
 * @description This method is used to get the number of elements in this priority queue.
 * @returns {Number} This method returns the number of elements in this priority queue.
 * @example 
 * var pq = new PriorityQueue ();
 * pq.push(1);
 * pq.push(2);
 * var size = pq.size(); // size = 2
 */
PriorityQueue.prototype.size = function () {
  return this.count;
};

/**
 * @method PriorityQueue.top
 * @description  This method is used to check the top element in this priority queue, but does not remove.
 * @returns {value} This method returns the top element of this priority queue, or null if this priority queue is empty.
 * @throws This method returns null if the top element is empty.  
 * @example 
 * var pq1 = new PriorityQueue ();
 * pq1.push(1);
 * pq1.push(2);
 * var ret1 = pq1.top(); // ret = 2
 *
 * var pq2 = new PriorityQueue ("greater");
 * pq2.push(1);
 * pq2.push(2);
 * var ret2 = pq2.top(); // ret = 1
 */
PriorityQueue.prototype.top = function () {
  if (this.count > 0) {
    return this.data[0];
  } else {
    console.log("ERROR:priority queue is empty");
    return null;
  }
};

/**
 * @method PriorityQueue.push
 * @description This method is used to insert the specified element into this priority queue.
 * @param {Undefined} value - The element to be inserted to this priority queue.
 * @throws This method returns –1 if the parameter is missing.
 * @example 
 * var pq1 = new PriorityQueue ();
 * pq1.push(1); 
 * pq1.push(2);
 * 
 * var pq2 = new PriorityQueue ();
 * pq2.push("A"); 
 * pq2.push("B");
 */
PriorityQueue.prototype.push = function (value) {
  if (value === undefined){
    console.log("ERROR:push() required parameter");
    return -1;
  }

  this.data[this.count] = value; // insert value into the last location
  if (this.count !== 0) {        // need to compare value with parent
    let posOfValue = this.count;
    let posOfParent = Math.floor((posOfValue - 1) / 2);
    if (this.mode === "max_heap") {  // mode : less(default)
      this.pushMaxHeap(posOfValue, posOfParent);
    } else {                        // mode : greater
      this.pushMinHeap(posOfValue, posOfParent);
    }
  }
  this.count++;
};

/**
 * @method PriorityQueue.pop
 * @description This method is used to remove the highest priority element from this priority queue.
 * @throws This method returns null if this priority queue is empty.
 * @example 
 * var pq1 = new PriorityQueue ();
 * pq1.push(1); 
 * pq1.push(2);
 * pq1.pop() // 2 will be removed.
 * 
 * var pq2 = new PriorityQueue ("greater");
 * pq2.push(1); 
 * pq2.push(2);
 * pq2.pop() // 1 will be removed
 */
PriorityQueue.prototype.pop = function () {
  if (this.isEmpty()) {
    console.log("ERROR:priority queue is empty");
    return null;
  } else {
    let posOfRoot = 0;
    let posOfLeftChild = posOfRoot * 2 + 1;
    let posOfRightChild = posOfRoot * 2 + 2;
    this.data[posOfRoot] = this.data[this.count - 1];  // remove top data && move last element to top position
    this.count--;

    if (this.mode === "max_heap") {  // mode : less(default) 
      this.popMaxHeap(posOfRoot, posOfLeftChild, posOfRightChild);
    } else {                         // mode : greater
      this.popMinHeap(posOfRoot, posOfLeftChild, posOfRightChild);
    }
  }
};

PriorityQueue.prototype.pushMaxHeap = function (posOfValue, posOfParent) {
  while (posOfValue > 0) {
    if (this.data[posOfParent] < this.data[posOfValue]) {
      this.data = swapData(this.data, posOfValue, posOfParent);
      posOfValue = posOfParent;
      posOfParent = Math.floor((posOfValue - 1) / 2);
    }
    else {
      break;
    }
  }
};

PriorityQueue.prototype.pushMinHeap = function (posOfValue, posOfParent) {
  while (posOfValue > 0) {
    if (this.data[posOfParent] > this.data[posOfValue]) {
      this.data = swapData(this.data, posOfValue, posOfParent);
      posOfValue = posOfParent;
      posOfParent = Math.floor((posOfValue - 1) / 2);
    }
    else {
      break;
    }
  }
};

PriorityQueue.prototype.popMaxHeap = function (posOfRoot, posOfLeftChild, posOfRightChild) {
  do {
    let posOfChange = 0;
    if (posOfRightChild <= this.count) {         // if there is posOfRightChild
      if (this.data[posOfLeftChild] < this.data[posOfRightChild]) {
        posOfChange = posOfRightChild;
      } else {
        posOfChange = posOfLeftChild;
      }
    } else {                                    // if there isn't posOfRightChild
      posOfChange = posOfLeftChild;
    }
    if (this.data[posOfChange] > this.data[posOfRoot]) {
      this.data = swapData(this.data, posOfChange, posOfRoot);
      posOfRoot = posOfChange;
      posOfLeftChild = posOfRoot * 2 + 1;
      posOfRightChild = posOfRoot * 2 + 2;
    }
    else {
      break;
    }
  } while (posOfLeftChild < this.count)
};

PriorityQueue.prototype.popMinHeap = function (posOfRoot, posOfLeftChild, posOfRightChild) {
  do {
    let posOfChange = 0;
    if (posOfRightChild < this.count) {         // if there is posOfRightChild
      if (this.data[posOfLeftChild] > this.data[posOfRightChild]) {
        posOfChange = posOfRightChild;
      } else {
        posOfChange = posOfLeftChild;
      }
    } else {                                    // if there isn't posOfRightChild
      posOfChange = posOfLeftChild;
    }
    if (this.data[posOfChange] < this.data[posOfRoot]) {
      this.data = swapData(this.data, posOfChange, posOfRoot);
      posOfRoot = posOfChange;
      posOfLeftChild = posOfRoot * 2 + 1;
      posOfRightChild = posOfRoot * 2 + 2;
    }
    else {
      break;
    }
  } while (posOfLeftChild < this.count)
};



////////////////////////////////////////////////////////////////////////
// priority_queue::swap() (C++ 11 supports this method)
PriorityQueue.prototype.swap = function () {
};

// priority_queue::emplace (C++ 11 supports this method)
PriorityQueue.prototype.emplace = function () {
};

PriorityQueue.prototype.testData = function () {
  for (let i = 0; i < this.count; i++) {
    console.log(this.data[i]);
  }
  console.log();
  console.log(`test isEmpty() // count:${this.count}`);
  console.log(`test size() // size:${this.count}`);
  console.log(`test top() // top:${this.data[0]}`);
};

module.exports = PriorityQueue;