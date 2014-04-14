function bTree(isLeaf, isRoot){
  isRoot = isRoot || false
  isLeaf = isLeaf || false

  this.isLeaf = isLeaf
  this.isRoot = isRoot
  this.node = []
}

function Key(value) {
  this.value = value
  this.leftEdge = nil
  this.rightEdge = nil
}

