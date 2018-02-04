'use babel';

import md5 from 'md5.js';

function unique(json, prearr){
  json.forEach(function(node){
    thisfingerprint = new md5().update(node.tag+node.name).digest('hex');
    if(node.parent !== ''){
      fatherfingerprint = new md5().update(node.parent.tag+node.parent.name).digest('hex');
    }else{
      fatherfingerprint = '';
    }
    temp = {'name': node.name, 'thisdna': thisfingerprint, 'father': fatherfingerprint, 'hasChilren': node.hasChilren};
    prearr.push(temp);
  })
}

function diff(a, b){
  if(a.name === b.name && a.father === b.father && a.thisdna === b.thisdna){
    return '0';
  }else{
    return '1';
  }
}

function delRepeat(prearr, uniarr){
  for(var i = 0; i < prearr.length; i++){
    var flag = '';
    for(var j = 0; j < uniarr.length; j++){
      if(i !== j){
        flag += diff(prearr[i], uniarr[j]);
      }
    }
    if(flag.indexOf(0) === -1){
      uniarr.push(prearr[i]);
    }
  }
}

exports.uni = function(json){
  const prearr = [];
  const uniarr = [];
  unique(json, prearr);
  delRepeat(prearr, uniarr);
  return uniarr;
}
