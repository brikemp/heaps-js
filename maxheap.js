class HeapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class MaxHeap {
  constructor() {
    this.store = [];
    this.size = 0;
  }

  // This method adds a HeapNode instance to the heap
  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  add(key, value) {
    let newNode = new HeapNode(key, value);
    this.store.push(newNode);

    let current = this.store.length - 1;
    this.heapUp(current);
    this.size++;
  }

  // This method removes and returns an element from the heap
  //   maintaining the heap structure
  // Time Complexity: O(log n)
  // Space Complexity: O(1)
  remove() {
    let result;

    if (this.size === 0) {
      return result
    }

    if (this.size === 1) {
      result = this.store.pop();
      this.size--;
      return result.value
    }

    this.swap(0, this.store.length - 1);
    result = this.store.pop();
    this.heapDown(0)

    this.size--;
    return result.value;
  }


  // Used for Testing
  toString() {
    if (!this.store.length) {
      return "[]";
    }

    const values = this.store.map(item => item.value);
    const output = `[${values.join(', ')}]`;
    return output;
  }

  // This method returns true if the heap is empty
  // Time complexity: O(1)
  // Space complexity: O(1)
  isEmpty() {
    return this.store.length === 0
  }

  // This helper method takes an index and
  //  moves it up the heap, if it is less than it's parent node.
  //  It could be **very** helpful for the add method.
  // Time complexity: O(log n) - n: nodes in heap
  // Space complexity: O(1) - no recursive calls
  heapUp(index) {

    let parentIndex = index % 2 === 0 ? (index - 2) / 2 : (index - 1) / 2;

    while( index > 0 && (this.store[parentIndex].key < this.store[index].key)) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = index % 2 === 0 ? (index - 2) / 2 : (index - 1) / 2;
    }
  }

  // This helper method takes an index and 
  //  moves it up the heap if it's smaller
  //  than it's parent node.
  // Time complexity: O(log n) - n: nodes in heap
  // Space complexity: O(1) - no recursive calls
  heapDown(index) {
    // console.log(this.store.length)

    let leftChild = index * 2 + 1;
    let rightChild = index * 2 + 2;

    while ( this.store[leftChild] || this.store[rightChild]) {
      if (this.store[leftChild] === undefined) {
        if (this.store[rightChild].key > this.store[index].key) {
          this.swap(index, rightChild);
        }
          index = rightChild;
      } else if (this.store[rightChild] === undefined) {
        if (this.store[leftChild].key > this.store[index].key) {
          this.swap(index, leftChild);
        }
          index = leftChild;
      } else if (this.store[leftChild].key >= this.store[rightChild].key && this.store[leftChild].key > this.store[index].key) {
        this.swap(index, leftChild);
        index = leftChild;
      } else if (this.store[rightChild].key > this.store[leftChild].key && this.store[rightChild].key > this.store[index].key) {
        this.swap(index, rightChild);
        index = rightChild;
      } else {
        return index
      }

      leftChild = index * 2 + 1;
      rightChild = index * 2 + 2;
    }
  }

  // If you want a swap method... you're welcome
  swap(index1, index2) {
    const s = this.store;
    let temp = s[index1];
    s[index1] = s[index2];
    s[index2] = temp 
    // [s[index1], s[index2]] = [s[index2], s[index1]];
  }
}

module.exports = {MaxHeap};


let myHeap = new MaxHeap;
myHeap.add(6,6);
myHeap.add(8,8);
myHeap.add(2,2);
myHeap.add(7,7); 
myHeap.add(13,13); 
console.log(myHeap.toString())
myHeap.remove();
myHeap.remove();
myHeap.remove();
myHeap.remove();
myHeap.remove();
myHeap.remove();
console.log(myHeap.toString())
