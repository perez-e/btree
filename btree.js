// bTree object that represents a node with keys
function bTree(isLeaf, isRoot){
  isRoot = isRoot || false;
  isLeaf = isLeaf || false;

  this.isLeaf = isLeaf;
  this.isRoot = isRoot;
  this.node = [];
  this.m = 4;
}

// Key object that represents the keys in the b-tree node
// value attr and edge attr connecting to other b-tree nodes
function Key(value) {
  this.value = value;
  this.leftEdge = null;
  this.rightEdge = null;
}

// insert value into b-tree structure
bTree.prototype.insert = function(num){

  // if current node is a leaf insert value acccrordingly 
  if ( this.isLeaf ) {
    this.insertIntoLeafNode(num);
  }

  // if current node is not a leaf, transverse further until leaf is met 
  if ( !this.isLeaf ) {
    this.transverseTree(num);
  }

  // if root node is saturated, split in half, and create new root from middle key
  if (this.node.length > this.m && this.isRoot){
    this.newRoot();
  }

  // if current node is saturated, remove middle key and push to node above
  if (this.node.length > this.m && !this.isRoot ){
    this.overFlow();
  }

};

bTree.prototype.overFlow = function(){
  var mid = Math.floor(this.node.length/2);

  // extract middle key 
  var key = this.node[mid];

  // create new b-tree strictres from left and right nodes
  var leftNode = this.node.splice(0,mid);
  var rightNode = this.node.splice(1, this.node.length);
  var leftTree = new bTree(true);
  leftTree.upNode = this.upNode;
  var rightTree = new bTree(true);
  rightTree.upNode = this.upNode;
  leftTree.node = leftNode;
  rightTree.node = rightNode;

  // associate left and right edge of key to left and right b-tree structures
  key.leftEdge = leftTree;
  key.rightEdge = rightTree;

  // insert key into the node above the current node
  if (key.value < this.upNode.node[0].value){
    this.upNode.node.unshift(key);
    this.upNode.node[1].leftEdge = rightTree;s
    return;
  }

  if (key.value >= this.upNode.node[this.upNode.node.length-1].value) {
    this.upNode.node.push(key);
    this.upNode.node[this.upNode.node.length - 2].rightEdge = leftTree;
    return ;
  }

  for (var i = 0; i < this.upNode.node.length - 1; i++ ){
    if (key.value >= this.upNode.node[i].value && key.value < this.upNode.node[i+1].value){
      this.upNode.node.splice(i+1, 0, key);
      this.upNode.node[i].rightEdge = leftTree;
      this.upNode.node[i+2].leftEdge = rightTree;
      return;
    }
  }

};

bTree.prototype.transverseTree = function(num){
  // if num value is less than first key, transverse into left edge of first key
  if (num < this.node[0].value) {
    this.node[0].leftEdge.insert(num);
    return;
  }

  // if num value is greater than last key, transverse into right edge of last key
  if (num >= this.node[this.node.length-1].value) {
    this.node[this.node.length-1].rightEdge.insert(num);
    return;
  }

  // transverse into appropriate in between edge
  for (var i = 0; i < this.node.length - 1; i++ ){
    if (num >= this.node[i].value && num < this.node[i+1].value) {
      this.node[i].rightEdge.insert(num);
      return;
    }
  }
};

bTree.prototype.insertIntoLeafNode = function(num){
  // create key object
  var key = new Key(num);

  // push into current node if empty
  if (this.node.length === 0){
    this.node.push(key);
    return ;
  }

  // if key value is less than first key in node, insert at the beginning 
  if (key.value < this.node[0].value){
    this.node.unshift(key);
    return;
  }

  // if key value is greater than last key in node, insert at the end
  if (key.value >= this.node[this.node.length-1].value) {
    this.node.push(key);
    return ;
  }

  // insert key into appropriate position within current node
  for (var i = 0; i < this.node.length - 1; i++ ){
    if (key.value >= this.node[i].value && key.value < this.node[i+1].value){
      this.node.splice(i+1, 0, key);
      return;
    }
  }

};

bTree.prototype.newRoot = function(){
  var mid = Math.floor(this.node.length/2);

  // split right and left node in two
  var leftNode = this.node.splice(0,mid);
  var rightNode = this.node.splice(1, this.node.length);

  // create new b-tree strictres from left and right nodes
  leftTree = new bTree(true);
  leftTree.upNode = this;
  rightTree = new bTree(true);
  rightTree.upNode = this;
  leftTree.node = leftNode;
  rightTree.node = rightNode;

  // if the root is not a leaf then the following node should not be leaves
  if ( !this.isLeaf ){
    leftTree.isLeaf = false;
    rightTree.isLeaf = false;
  }

  // associate left and right edge of only key in root node to left and right b-tree structures
  this.node[0].leftEdge = leftTree;
  this.node[0].rightEdge = rightTree;
  this.isLeaf = false;
};

// print key values in ascending order
bTree.prototype.printTree = function(){
  // if node is leaf print key values
  if ( this.isLeaf ){
    for (var i = 0; i < this.node.length; i++){
      console.log(this.node[i].value);
    }
    return;
  }

  // transverse further into tree through left edge before printing each key value
  for (var i = 0; i < this.node.length; i++){
    this.node[i].leftEdge.printTree()
    console.log(this.node[i].value)
  }

  // transverse right edge of last key in node
  this.node[this.node.length-1].rightEdge.printTree()

}


