function bTree(isLeaf, isRoot){
  isRoot = isRoot || false
  isLeaf = isLeaf || false

  this.isLeaf = isLeaf
  this.isRoot = isRoot
  this.node = []
}

function Key(value) {
  this.value = value
  this.leftEdge = null
  this.rightEdge = null
}

bTree.prototype.insert = function(num){
  console.log(this)
  if ( this.isLeaf ) {
    this.insertIntoLeafNode(num)
  }
}

bTree.prototype.insertIntoLeafNode = function(num){
  var key = new Key(num)

  if (this.node.length === 0){
    this.node.push(key)
    return 
  }

  if (key.value < this.node[0].value){
    this.node.unshift(key)
    return
  }

  if (key.value >= this.node[this.node.length-1].value) {
    this.node.push(key)
    return 
  }

  for (var i = 0; i < this.node.length - 1; i++ ){
    if (key.value >= this.node[i].value && key.value < this.node[i+1].value){
      this.node.splice(i+1, 0, key)
      return
    }
  }

}





