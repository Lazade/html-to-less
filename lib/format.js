'use babel';

function addTab(nums){
  var tabs = '';
  for(var i = 0; i < nums; i++){
    tabs += '\t';
  }
  return tabs;
}

function addSpace(name){
  var space = '';
  for(var i = 0; i < name.length; i++){
    space += ' ';
  }
  return space;
}

function processing(arr){
  var less = '';
  var fathers = [];
  var flag = 0;
  for(var i = 0; i < arr.length; i++){
    if((fathers.findIndex((el) => el === arr[i].father) === -1) || arr[i].father === ''){
      fathers.push(arr[i].father);
    }
    if(arr[i].father === ''){
      flag = fathers.lastIndexOf('');
    }
    nums = fathers.findIndex((el) => el === arr[i].father) - flag;
    if(arr[i].hasChilren === false){
      less += addTab(nums) + arr[i].name + '{\n' + addTab(nums)  + '}\n';
      if(i+1 < arr.length && i-1 > 0){
        if(arr[i+1].father !== arr[i].father){
          var j = fathers.findIndex((el) => el === arr[i].father);
          while(fathers[j] !== arr[i+1].father){
            less += addTab(j-1) + '}\n';
            j--;
            if(j < 0) return;
          }
        }
      }else{
        var j = fathers.findIndex((el) => el === arr[i].father);
        for(; fathers[j] === ''; j--){
          less += addTab(j-1) + '}\n';
        }
        less += '}';
      }
    }else{
      less += addTab(nums) + arr[i].name + '{\n';
    }
  }
  return less;
}

exports.format = function(arr){
  return processing(arr);
}
