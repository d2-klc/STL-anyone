// Hash Map implemented by Jisoo
let Entry = function (key, value) {
  this.key = key;
  this.value = value;
  this.next = undefined;
  this.count = 0;
};

const HashMap = function () {
  this.map = [];
  this.length = 0;
};

// Hash_map::hash() implemented by Seeung;
HashMap.prototype.hash = function (key) {
  let hashCode = key.charCodeAt(0);
  if ((58 > hashCode) && (hashCode > 47)) {
    hashCode = 0;
  }
  else if ((78 > hashCode) && (hashCode > 64)) {
    hashCode = 1;
  }
  else if ((91 > hashCode) && (hashCode > 77)) {
    hashCode = 2;
  }
  else if ((108 > hashCode) && (hashCode > 96)) {
    hashCode = 3;
  }
  else if ((123 > hashCode) && (hashCode > 107)) {
    hashCode = 4;
  }
  else {
    hashCode = 5;
  }
  return hashCode;
};

// hash_map::put()
HashMap.prototype.put = function (key, value) {
  let newEntry = new Entry(key, value);   // make newEntry
  let pos = this.hash(key);          // find hashCode

  if (this.map[pos] === undefined) {
    this.map[pos] = newEntry;
    this.length++;
  } else {
    let curEntry = this.map[pos];
    while (true) {
      if (curEntry.key === key) {
        curEntry.value = value;
        return 0;
      }
      if (curEntry.next === undefined) {
        curEntry.next = newEntry;
        break;
      }
      curEntry = curEntry.next;
    }
  }
  this.map[pos].count++;
};

// hash_map::containsKey()
HashMap.prototype.containsKey = function (key) {
  let posOfMap = this.hash(key);          // find hashCode
  let curEntry = this.map[posOfMap]
  if (this.map[posOfMap] !== undefined) {
    for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
      if (curEntry.key === key) {
        //console.log("key : " + key + "값을 포함하고 있음(true)");
        return true;
      }
      curEntry = curEntry.next;
    }
  }
  //console.log("key : " + key + "값을 포함하지 않음(false)");
  return false;
};

// hash_map::containsValue()
HashMap.prototype.containsValue = function (value) {
  for (let posOfMap = 0; posOfMap < 6; posOfMap++) {
    if (this.map[posOfMap] !== undefined) {
      let curEntry = this.map[posOfMap]
      for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
        if (curEntry.value === value) {
          // console.log("value : " + value + "값을 포함하고 있음(true)");
          return true;
        }
        curEntry = curEntry.next;
      }
    }
  }
  // console.log("value : " + value + "값을 포함하지 않음(false)");
  return false;
};

// hash_map::get()
HashMap.prototype.get = function (key) {
  let posOfMap = this.hash(key);          // find hashCode
  let curEntry = this.map[posOfMap]

  if (this.map[posOfMap] !== undefined) {
    for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
      if (curEntry.key === key) {
        //console.log("key : " + key + ", value : " + curEntry.value);
        return curEntry.value;
      }
      curEntry = curEntry.next;
    }
  }
  console.log("ERROR : Key is not exist");
  return undefined;;
};

// hash_map::remove()
HashMap.prototype.remove = function (key) {
  let posOfMap = this.hash(key);          // find hashCode
  let preEntry = undefined;
  let curEntry = this.map[posOfMap];

  if (this.map[posOfMap] !== undefined) {
    for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
      if (curEntry.key === key) {
        switch (posOfEntry) {
          case 0: // remove first key
            curEntry.next.count = this.map[posOfMap].count;
            this.map[posOfMap] = curEntry.next;
            break;
          case this.map[posOfMap].count - 1:  // remove last key
            curEntry.next = undefined;
            break;
          default:
            preEntry.next = curEntry.next;
            curEntry = undefined;
        }
        this.map[posOfMap].count--;
        return true;
      }
      preEntry = curEntry;
      curEntry = curEntry.next;
    }
  }
  console.log("ERROR : Key is not exist");
  return false;
};

// hash_map::keySet()
HashMap.prototype.keySet = function () {
  let keySet = new Set();
  for (let posOfMap = 0; posOfMap < 6; posOfMap++) {
    if (this.map[posOfMap] !== undefined) {
      let curEntry = this.map[posOfMap]
      for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
        keySet.add(curEntry.key);
        curEntry = curEntry.next;
      }
    }
  }
  // console.log(keySet);
  return keySet;
};

// hash_map::entrySet()
HashMap.prototype.entrySet = function () {
  let entrySet = new Set();
  for (let posOfMap = 0; posOfMap < 6; posOfMap++) {
    if (this.map[posOfMap] !== undefined) {
      let curEntry = this.map[posOfMap]
      for (let posOfEntry = 0; posOfEntry < this.map[posOfMap].count; posOfEntry++) {
        entrySet.add(curEntry.key + "=" + curEntry.value);
        curEntry = curEntry.next;
      }
    }
  }
  //console.log(entrySet);
  return entrySet;
};

// hash_map::isEmpty()
HashMap.prototype.isEmpty = function () {
  //console.log(this.length === 0);
  return this.length === 0;
};

// hash_map::clear()
HashMap.prototype.clear = function () {
  this.length = 0;
  this.map = [];
};

// hash_map::size()
HashMap.prototype.size = function (value) {
  let size = 0;
  for (let posOfMap = 0; posOfMap < 6; posOfMap++) {
    if (this.map[posOfMap] !== undefined) {
      size += this.map[posOfMap].count;
    }
  }
  //console.log("size : " + size);
  return size;
};

///////////////////////////////////////////
HashMap.prototype.test = function () {
  console.log(this.map);
}

module.exports = HashMap;