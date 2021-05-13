// 地图  即背景20*12 (20行  12列)
(function(){

  window.Map = function(){
    // 地图的矩阵
    this.mapCode = [
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [9,9,9,9,9,9,9,9,9,9,9,9]
    ]
  }

  // 渲染地图
  Map.prototype.render = function(mapGame){
    // 渲染地图
    for (let i = 0; i < mapGame.row; i++) {
      for (let j = 0; j < mapGame.col; j++) {
        if (this.mapCode[i][j] != 0) {
          mapGame.setColor(i,j,this.mapCode[i][j])
        }
      }
    }
  }

  // 判断是否可以消行
  Map.prototype.checkRemove = function(){
    // 消行规则：当前的mapCode数组的每一项如果不是0了，就说明可以消行了
    for (let i = 0; i < 20; i++) {
      if (this.mapCode[i].indexOf(0) == -1) {
        // 删除此行
        this.mapCode.splice(i,1);
        // 在补充一行
        this.mapCode.unshift([0,0,0,0,0,0,0,0,0,0,0,0])

        // 分数增加
        if (game.during <= 30 && game.during >= 20) {
          game.score += 10;
        }else if(game.during < 20 && game.during >= 10) {
          game.score += 100;
        }else{
          game.score += 1000;
        }
        $("#score").html("分数："+ game.score);
        if (game.score % 100 == 0) {
          game.during -= 5;
          if (game.during <= 0) {
            game.during = 1;
          }
        }
      }
    }
  }
})()