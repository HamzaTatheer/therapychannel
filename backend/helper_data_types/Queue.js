// Queue class
class Queue {
  constructor() {
    // Array is used to implement a Queue
    this.getComparable = (item) => item;
    this.data = [];
  }

  setComparable(func) {
    if (typeof func == "function") this.getComparable = func;
    else
      throw new Error(
        "Comparable method must be a function type not other types"
      );
  }

  // Functions to be implemented
  // enqueue(item)
  // dequeue()
  // front()
  // isEmpty()

  // Adds an element to the queue
  enqueue(item) {
    this.data.unshift(item);
    console.log(this.data.map((item) => this.getComparable(item)));
  }
  // removing element from the queue
  // returns underflow when called
  // on empty queue

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.data.shift();
  }

  leaveQueue(item) {
    let found_index = false;
    this.data.forEach((data, index) => {
      if (this.getComparable(data) == this.getComparable(item)) {
        found_index = index;
      }
    });

    if (found_index != false) {
      this.data.splice(found_index, 1);
    }
  }

  // front function
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.data[0];
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.data.length === 0;
  }

  howManyAhead(item) {
    this.data.forEach((data, index) => {
      if (this.getComparable(data) == this.getComparable(item))
        return index + 1;
    });

    return 0;
  }

  length() {
    return this.data.length;
  }
}

module.exports = Queue;
