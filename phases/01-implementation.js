class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    if (this.count / this.capacity >= 0.7) {
      this.resize();
    }

    let kvp = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    let bucket = this.data[index];

    if (bucket) {
      let curr = bucket;

      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        curr = curr.next; // goes to the next node
      }

      kvp.next = bucket;
    }
    this.count++;
    this.data[index] = kvp;
  }
  // insert(key, value) {
  //   const index = this.hashMod(key);
  //   let currentPair = this.data[index];
  //   const newPair = new KeyValuePair(key, value);

  //   while (currentPair) {
  //     if (currentPair.key === key) {
  //       currentPair.value === value;
  //       return}
  //     currentPair = currentPair.next;
  //   }
  //   newPair.next = currentPair;
  //   this.data[index] = newPair;
  // }

  read(key) {
    const index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  resize() {
    let copy = JSON.parse(JSON.stringify(this.data));
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
    for (let ele of copy) {
      // if (!ele.next) {
      //   // is not ll
      //   this.insert(ele.key, ele.value);
      // } else {
      // is ll
      let curr = ele;
      while (curr) {
        this.insert(curr.key, curr.value);
        curr = curr.next;
      }
    }
    // }
  }

  delete(key) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    let prev = null;
    while (curr) {
      if (curr.key === key) {
        if (prev) {
          prev.next = curr.next;
        } else {
          prev = curr.next;
        }
        this.count--;
        this.data[index] = prev;
        break;
      }
      prev = curr;
      curr = curr.next;
    }
    return "Key not found";
  }
}

hashTable = new HashTable(2);

hashTable.insert("key1", "value1");
hashTable.insert("key2", "value2");
hashTable.insert("key3", "value3");
hashTable.insert("key5", "value5");
hashTable.insert("key9", "value9");
hashTable.insert("key10", "value10");

console.log(hashTable);

// check for values
console.log(hashTable.read("key2")); // .to.equal("value2");
console.log(hashTable.read("key9")); //.to.equal("value9");
console.log(hashTable.read("key10")); //.to.equal("value10");

console.log(hashTable.count); //.to.equal(6);

// delete key value pairs
hashTable.delete("key2");
hashTable.delete("key9");
hashTable.delete("key10");

console.log(hashTable);

// check for values
console.log(hashTable.read("key1")); //.to.equal("value1");
console.log(hashTable.read("key3")); //.to.equal("value3");
console.log(hashTable.read("key5")); //.to.equal("value5");

console.log(hashTable.read("key2")); //.to.equal(undefined);
console.log(hashTable.read("key9")); //.to.equal(undefined);
console.log(hashTable.read("key10")); //.to.equal(undefined);

console.log(hashTable.count); //.to.equal(3);

// return string if key doesn't exist
console.log(hashTable.delete("key2")); //.to.equal("Key not found");
console.log(hashTable.delete("key10")); //.to.equal("Key not found");

module.exports = HashTable;
