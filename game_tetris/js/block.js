(function(){

  window.Block = function(){
    // 1.获取随机的方块值
    // 1.1 罗列出所有的方块类型
    var allType = ["S","Z","J","L","O","T","I"];
    // 1.2 从类型中获取随机的一种
    this.type = allType[parseInt(Math.random() * allType.length)];
    // 1.3 得到随机的类型方块，然后通过这个类型获取当前的类型所有形状的数量（不同的类型数量不同。eg：T有四种类型，O只有一种类型）
    this.allDir = blockData[this.type].length;

    // 1.4 通过当前获取的allDir的长度获取数字
    this.dir = parseInt(Math.random() * this.allDir);
    // 1.5 得到随机方块
    this.code = blockData[this.type][this.dir];

    // 初始行
    this.row = 0;
    // 初始列 居中显示
    this.col = 4;
  }

  // 渲染四行四列的表格
  Block.prototype.render = function(){
    // 渲染四行四列的表格
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // 如果4x4的矩阵中某一个不是0，就说明有颜色，需要进行渲染
        if (this.code[i][j] != 0) {
          game.setColor(i+this.row,j+this.col,this.code[i][j]);
        }
      }
    }
  }

  // 预判断
  Block.prototype.check = function(row,col){
    // 能力判断方法，判断的是对应位置的方块和地图是否有都不为0的情况，若有则返回true，否则返回false（代表没有重合）
    // 其中row和col是需要校验的地图的行和列
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.code[i][j] != 0 && game.map.mapCode[i + row][j + col] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // 方块下落，需要判断当前的方块是否能够下落
  Block.prototype.checkDown = function(){
    // 判断当前地图的位置和方块的位置是否有重合（this.row+1表示预判断）
    // 预判断：下一次方块将要到达的位置是否有对应的地图不为0
    if (this.check(this.row+1,this.col)) {
      this.row++;
    }else{
      // 此时就是下落到底的状态，渲染预览框的方块
      game.block = game.nextBlock;
      // 让预览框的去创建新的
      game.nextBlock = new Block();
      // game.block = new Block();
      // 将方块到底后，将其渲染到地图上
      this.renderMap();
      // 判断是否可以消行
      game.map.checkRemove();
      // 判断游戏是否结束
      this.checkOver();
    }
  }

  // 判断是否能否向左移动，如果可以则移动
  Block.prototype.checkLeft = function(){
    if (this.check(this.row,this.col - 1)) {
      this.col--;
    }
  }

  // 判断是否能否向右移动，如果可以则移动
  Block.prototype.checkRight = function(){
    if (this.check(this.row,this.col + 1)) {
      this.col++;
    }
  }

  // 一键到底，空格到底
  Block.prototype.checkBlockEnd = function(){
    // 使用while循环，如果当前的check返回的是true则代表可以下移，继续row++
    while (this.check(this.row + 1,this.col)) {
      this.row++
    }
  }

  // 方块的旋转
  Block.prototype.checkRot = function(){
    // 备份旧的形状
    var oldDir = this.dir;
    // 改变方向
    this.dir++;
    // 判断如果当前当前dir大于当前类型的的最后一个方向，则回到第一种状态
    if (this.dir > this.allDir - 1) {
      this.dir = 0;
    }
    // 渲染新的形状
    this.code = blockData[this.type][this.dir];

    // 判断渲染后的方块是否有能力进行再次渲染
    if (!this.check(this.row,this.col)) {
      // 进入后说明改变的方块会和之前的重合，所以禁止改变
      this.dir = oldDir
      // 再次渲染方块
      this.code = blockData[this.type][this.dir];
    }
  }

  // 判断是否退出
  Block.prototype.checkClear = function(flag){
    $("#tips").css({"display":"block"});
    clearInterval(game.timer);

    // 判断退出方式
    if (flag) {
      $("#tip_content").html("游戏已经开始！是否退出游戏？");
      $("button[type='primary']").html("是"); 
      $("button[type='default']").html("否");

       // 否
      $("button[type='default']").on("click",function(){
        $("#tips").css({"display":"none"});
        window.location.reload();
      })

      // 是
      $("button[type='primary']").on("click",function(){
        window.close()
      })
    }else{
      $("#tip_content").html('游戏结束！您当前得分为：<span id="tips_score"></span>')
      
      // 重新开始
      $("button[type='primary']").on("click",function(){
        $("#tips").css({"display":"none"});
        window.location.reload();
      })

      // 退出游戏
      $("button[type='default']").on("click",function(){
        window.close()
      })
    }
  }

  // 将已经到底的方块渲染到地图上
  Block.prototype.renderMap = function(){
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // 将现在已有的方块渲染到map类的mapCode上
        if (this.code[i][j] !== 0) {
          // 改变地图的mapCode数据
          game.map.mapCode[this.row + i][this.col + j] = this.code[i][j];
        }
        
      }
    }
  }

  // 判断游戏是否结束
  Block.prototype.checkOver = function(){
    // 如果地图的第一行有数据 则说明需要结束
    for (let i = 0; i < game.col; i++) {
      if (game.map.mapCode[0][i] != 0) {
        this.checkClear(false);
        $("#tips_score").html(game.score)
      }
    }
  }
})()