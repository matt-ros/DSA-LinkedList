class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }

  insertBefore(key, item) {
    if (this.head.value === key) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      while (currNode !== null && currNode.next.value !== key) {
        currNode = currNode.next;
      }
      if (currNode === null) {
        console.log('Key not found');
        return;
      }
      const newNode = new _Node(item, currNode.next);
      currNode.next = newNode;
    }
  }

  insertAfter(key, item) {
    let keyNode = this.find(key);
    if (keyNode === null) {
      console.log('Key not found');
      return;
    }
    const newNode = new _Node(item, keyNode.next);
    keyNode.next = newNode;
  }

  insertAt(pos, item) {
    if (this.head === null || pos === 1) {
      this.insertFirst(item);
    }
    else {
      let currNode = this.head;
      let prevNode = this.head;
      let counter = 1;
      while (currNode !== null && counter !== pos) {
        prevNode = currNode;
        currNode = currNode.next;
        counter++;
      }
      const newNode = new _Node(item, currNode);
      prevNode.next = newNode;
    }
  }
}

function display(linkedList) {
  let displayString = '';
  if (linkedList.head === null) {
    console.log('Empty list');
    return;
  }

  let currNode = linkedList.head;
  while (currNode.next !== null) {
    displayString += `${currNode.value} -> `;
    currNode = currNode.next;
  }
  displayString += currNode.value;
  console.log(displayString);
  return;
}

function size(linkedList) {
  if (linkedList.head === null) {
    return 0;
  }
  let counter = 0;
  let currNode = linkedList.head;
  while (currNode !== null) {
    currNode = currNode.next;
    counter++;
  }
  return counter
}

function isEmpty(linkedList) {
  if (linkedList.head === null) {
    return true;
  }
  return false;
}

function findPrevious(linkedList, item) {
  let currNode = linkedList.head;
  let prevNode = linkedList.head;
  while (currNode !== null && currNode.value !== item) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  if (currNode === null) {
    return 'Item not found';
  }
  return prevNode;
}

function findLast(linkedList) {
  if (linkedList.head === null) {
    return 'Empty list';
  }
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  return currNode;
}

function findThirdFromLast(linkedList) {
  const lastNode = findLast(linkedList);
  const secondLast = findPrevious(linkedList, lastNode.value);
  const thirdLast = findPrevious(linkedList, secondLast.value);
  return thirdLast;
}

function main() {
  let SLL = new LinkedList();
  SLL.insertLast('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertLast('Helo');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  // List at this point: HEAD -> Apollo -> Boomer -> Helo -> Husker -> Starbuck
  SLL.insertLast('Tauhida');
  SLL.remove('Husker');
  // List should be HEAD -> Apollo -> Boomer -> Helo -> Starbuck -> Tauhida
  SLL.insertBefore('Boomer', 'Athena');
  // List should be HEAD -> Apollo -> Athena -> Boomer -> Helo -> Starbuck -> Tauhida
  SLL.insertAfter('Helo', 'Hotdog');
  // List should be HEAD -> Apollo -> Athena -> Boomer -> Helo -> Hotdog -> Starbuck -> Tauhida
  SLL.insertAt(3, 'Kat');
  // List should be HEAD -> Apollo -> Athena -> Kat -> Boomer -> Helo -> Hotdog -> Starbuck -> Tauhida
  SLL.remove('Tauhida');
  // List should be HEAD -> Apollo -> Athena -> Kat -> Boomer -> Helo -> Hotdog -> Starbuck
  display(SLL);
  console.log('Size = ' + size(SLL));
  console.log('SLL is empty = ' + isEmpty(SLL));
  console.log(findPrevious(SLL, 'Kat'));
  console.log(findLast(SLL));
  console.log(findThirdFromLast(SLL));
}

main();

// The provided mystery program is removing nodes with duplicate values from a linked list.
// The time complexity is quadratic O(n^2) since there are 2 nested loops.
