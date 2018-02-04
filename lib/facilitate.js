'use babel';

import htmlparser from 'htmlparser2';

function splitName(name){
  return name.split(" ");
}

function getName(node) {
  if(node.attribs.id){
    return '#'+node.attribs.id;
  }else if(node.attribs.className || node.attribs.class){
    return '.'+splitName(node.attribs.classname || node.attribs.class)[0];
  }else{
    return node.name;
  }
}

function delSandR(str){
  var simstr = str;
  return simstr.replace(/[\r\n]/g, "").replace(/>[\s]*(\<){1}/g, '><');
}

function parseToHtml(str){
  return htmlparser.parseDOM(str);
}

function recursive(objJson, store) {
  var temp = [], parent = [];
  objJson.forEach(function(node){
    if(node.children.length){
      // var hasChilren = true;
      if(node.parent !== null){
        parent = {'tag': node.parent.name, 'name': getName(node.parent)};
      }else{
        parent = '';
      }
      temp = {'tag': node.name, 'name': getName(node), 'parent': parent, 'hasChilren': true};
      store.push(temp);
      recursive(node.children, store);
    }else{
      if(node.parent !== null){
        parent = {'tag': node.parent.name, 'name': getName(node.parent)};
      }else{
        parent = null;
      }
      temp = {'tag': node.name, 'name': getName(node), 'parent': parent, 'hasChilren': false};
      store.push(temp);
    }
  });
}

exports.facilitate = function(str){
  const store = [];
  recursive(parseToHtml(delSandR(str)), store);
  return store;
}
