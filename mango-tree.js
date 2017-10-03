"use strict"

// release 0
class FruitTree {
  constructor() {
    this._age = 0;
    this._height = 0;
    this._fruits = [];
    this.totalFruit = 0;
    this.healthyStatus = true;
    this.maxHeight = 10;
    this.maxAge = 20;
  }

  getAge() {
    return this._age;
  }
  getHeight() {
    return this._height;
  }
  getFruits() {
    return this._fruits;
  }
  getHealtyStatus() {
    return this.healthyStatus;
  }


  // Get current states here

  // Grow the tree
  grow(maxGrow) {
    this._age++;

    let tumbuh = Math.ceil(Math.random() * (this.maxHeight*1.2)) / 10;
    if(this._age < maxGrow) this._height += tumbuh;
    if(this._age >= maxGrow) this._height = this._height;
    this._height = parseFloat(this._height.toFixed(1));
    if(this._age == this.maxAge) this.healthyStatus = false;

    this.totalFruit += this.produceFruits();
  }

  // Produce some mangoes
  produceFruits(umurBerbuah) {
    let kapasitasBuah = Math.ceil(Math.random() * 10) ;
    if (this._age >= umurBerbuah){
    for(let i = 0; i < kapasitasBuah; i++) {
      this._fruits[i] = new Fruit();
    }
  }
    return kapasitasBuah;
  }

  // Get some fruits
  harvest() {
    let good = 0,
        bad  = 0;

    for(let i = 0; i < this._fruits.length; i++) {
      if(this._fruits[i].quality == 'good') {
        good++;
      } else bad++;
    }
    this._harvested = `${this._fruits.length} (${good} good, ${bad} bad)`

    this._fruits = [];
  }
}

class Fruit {
  constructor() {
    this.quality = this.qualitySetter();
  }

  qualitySetter() {
    let random = Math.round(Math.random());
    // if(random == 1) {
    //   value = 'good';
    // } else value = 'bad';
    return (random == 1 ) ? 'good': 'false';
    // this.quality = value
    // return value;
  }
}

class MangoTree extends FruitTree{
  constructor(name) {
    super();
    this.name = name
    this.maxHeight = 25;
    this.maxAge = 20;
    //this.berbuah = super.produceFruits(3)
  }
}
class Mango extends Fruit{}

// Release 1
class AppleTree extends FruitTree{
  constructor(name) {
    super();
    this.name = name
    this.maxHeight = 5;
    this.maxAge = 10;
  }
}
class Apple extends Fruit {}

class PearTree extends FruitTree{
  constructor() {
    super();
    this.maxHeight = 5;
    this.maxAge = 10;
  }
}
class Pear extends Fruit {}

let mangoTree = new MangoTree('mango')
do {
 mangoTree.grow(10);
 mangoTree.produceFruits(5);
 //console.log(mangoTree.getFruits());
 mangoTree.harvest();
 console.log(`[Year ${mangoTree._age} Report] Height = ${mangoTree._height} m | ${mangoTree.name} harvested = ${mangoTree._harvested}`)
} while (mangoTree.healthyStatus != false)

let appleTree = new AppleTree('apple')
do {
 appleTree.grow(7);
 appleTree.produceFruits(3);
//  console.log(appleTree.getFruits());
 appleTree.harvest();
 console.log(`[Year ${appleTree._age} Report] Height = ${appleTree._height} m | ${appleTree.name} harvested = ${appleTree._harvested}`)
} while (appleTree.healthyStatus != false)

// Release 3
class TreeGrove {
  constructor() {
    this.year = 0;
    this.trees = [];
  }

  inputTree(type, age, height, fruit, health) {
    let tree = new type();
    tree.name = type.name;
    tree._fruits = [];
    tree._age = age;
    tree._height = height;
    tree.totalFruit = fruit;
    tree.healthyStatus = health;

    this.trees.push(tree)
  }

  nextYear() {
    this.year++;
    for(let i = 0; i < this.trees.length; i++) {
      this.trees[i].grow();
    }
  }

  showTrees() {
    for(let i = 0; i < this.trees.length; i++) {
      console.log(this.trees[i].name);
    }
  }

  showAge() {
    for(let i = 0; i < this.trees.length; i++) {
      console.log(`${this.trees[i].name}, age: ${this.trees[i]._age}`)
    }
  }

  dead_trees() {
    let deadTrees = '';
  console.log('Tree/s already dead: ');
    for(let i = 0; i < this.trees.length; i++) {
      if(!this.trees[i].healthyStatus) {
        deadTrees += `${this.trees[i].name} \n`;
      }
    }
    return deadTrees;
  }

  mature_trees() {
    let mature = '';
    console.log('Tree/s already mature: ');
    for(let i = 0; i < this.trees.length; i++) {
      if (this.trees[i].totalFruit > 0 && this.trees[i].healthyStatus){
        mature += `${this.trees[i].name} \n`;
      }
    }
    return mature;
  }
}

let grove = new TreeGrove();

grove.inputTree(MangoTree, 3, 1.8, 7, true)
grove.inputTree(AppleTree, 4, 1.2, 5, true)
grove.inputTree(PearTree, 7, 2, 15, true)
grove.inputTree(MangoTree, 15, 15.8, 42, true)
grove.nextYear();
grove.nextYear();
grove.nextYear();
grove.nextYear();

grove.showTrees();
grove.showAge();

console.log(grove.mature_trees());
console.log(grove.dead_trees());
