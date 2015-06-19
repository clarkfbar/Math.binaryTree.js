var id = 1;

var Node = function(v, p){
  this.left, 
  this.right, 
  this.id = id++,
  this.parent = p,
  this.value = v;
  this.equals = function (n){
    return this.id == n.id;
  };
  this.minNode = function(){
    if(this.left) {
      return this.left.minNode();
    } else {
      return this;
    }
  };
  this.maxNode = function(){
    if(this.right) {
      return this.right.maxNode();
    } else {
      return this;
    }
  };
  this.successor = function (){
    if(this.right) {
      return this.right.minNode();
    } else if(this.left) {
      return this.left.maxNode();
    } else {
      return null;
    }
  }
};

var Tree = function(){
  var root;

  function add(num, node) {
      if(!root) {
        root = new Node(num);
      } else {
        if(node.value > num) {
          if(node.left == null) {
            node.left = new Node(num, node);
            return;
          } else {
            return add(num, node.left);
          }
        } else {
          if(node.right == null) {
            node.right = new Node(num, node);
            return;
          } else {
            return add(num, node.right);
          }
        }
      }
  };

  this.add = function(num){
    add(num, root);
  };

  this.inorderTraversal = function(){
    return inorderTraversal(root);
  };

  var inorderTraversal = function(node){
    if(root == null) return [];
    if(!node) return [];

    var result = [];
    if(node.left) {
      result = inorderTraversal(node.left);
    }
    result.push(node.value);
    if(node.right) {
      result = result.concat(inorderTraversal(node.right));
    }
    return result;
  };

  this.postorderTraversal = function(){
    return postorderTraversal(root);
  };

  var postorderTraversal = function(node){
    if(root == null) return [];
    if(!node) return [];

    var result = [];
    if(node.left) {
      result = postorderTraversal(node.left);
    }
    if(node.right) {
      result = result.concat(postorderTraversal(node.right));
    }
    result.push(node.value);
    return result;
  };

  this.preorderTraversal = function(){
    return preorderTraversal(root);
  };

  var preorderTraversal = function(node){
    if(root == null) return [];
    if(!node) return [];

    var result = [];
    result.push(node.value);
    if(node.left) {
      result = result.concat(preorderTraversal(node.left));
    }
    if(node.right) {
      result = result.concat(preorderTraversal(node.right));
    }
    return result;
  };

  this.search = function(target) {
    return search(target, root);
  };

  var search = function(target, node){
    if(!node) return null;
    if(node.value == target) {
      return node;
    } else if(node.value > target) {
      return search(target, node.left);
    } else {
      return search(target, node.right);
    }
  };

  this.deleteNode = function(target) {
    deleteNode(search(target, root));
  };

  var deleteNode = function(node){
    if(!node) return;
    if(node.left == null && node.right == null) {
      if (node.equals(root)) {
        root = null;
      } else if (node.parent.left.equals(node)) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
    } else if(node.left == null || node.right == null) {
      var child = node.left ? node.left : node.right;
      if (node.equals(root)) {
        root = child;
        root.parent = null;
      } else if(node.parent.left.equals(node)) {
        node.parent.left = child;
        child.parent = node.parent;
      } else {
        node.parent.right = child;
        child.parent = node.parent;
      }
    } else {
      var successor = node.successor();
      if(node.equals(root)) {
        root.value = successor.value;
      } else {
        node.value = successor.value;
      }
      deleteNode(successor);
    }
  };
}
