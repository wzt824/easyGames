
// 自执行函数  互相隔离作用域
(function(){

  window.Game = function(){
    // 设置行和列
    this.row = 20; //行
    this.col = 12; //列
    // 初始化
    this.init();

    // 实例方块
    this.block = new Block();
    // 实例下一个方块
    this.nextBlock = new Block();
    // 实例地图
    this.map = new Map();

    // 启动定时器
    this.start();

    // 事件监听
    this.bindEvent();
    // 分数
    this.score = 0;
    // 速度
    this.during = 20;

  }

  Game.prototype.init = function(){
    
    // 渲染预览功能
    var $table2 = $("<table></table>");
    $table2.addClass("tab2");
    // 渲染表格
    for (let i = 0; i < 4; i++) {
      var $tr2 = $("<tr></tr>");
      for (let j = 0; j < 4; j++) {
        var  $td2 = $("<td></td>");
        $td2.appendTo($tr2);
      }
      $tr2.appendTo($table2);
    }

    // 渲染地图
    var $table = $("<table></table>");
    $table.addClass("tab1");
    // 渲染表格
    for (let i = 0; i < this.row; i++) {
      var $tr = $("<tr></tr>");
      for (let j = 0; j < this.col; j++) {
        var  $td = $("<td></td>");
        $td.appendTo($tr);
      }
      $tr.appendTo($table);
    }
    $table.appendTo($("#game_subject"));
    $table2.appendTo($("#game_subject"));
  }

  // 设置颜色
  Game.prototype.setColor = function(row,col,num){
    // 给对应的有颜色的方块添加类名
    $(".tab1").find("tr").eq(row).children("td").eq(col).addClass("c"+num)
  }

  // 设置下一个颜色
  Game.prototype.setNextColor = function(row,col,num){

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if(this.nextBlock.code[i][j] != 0)
        // 给对应的有颜色的方块添加类名
        $(".tab2").find("tr").eq(i).children("td").eq(j).addClass("c"+this.nextBlock.code[i][j])
      }
    }
  }

  // 清屏功能
  Game.prototype.clear = function(){
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        $(".tab1").find("tr").eq(i).children("td").eq(j).removeClass()
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        $(".tab2").find("tr").eq(i).children("td").eq(j).removeClass()
      }
    }
  }

  // 绑定事件
  Game.prototype.bindEvent = function(){
    var _this = this;
    // 绑定上下左右事件
    $(document).on("keydown",function(e){
      if (e.keyCode == 37 || e.keyCode == 65) {
        // 判断是否有向左运动的能力
        _this.block.checkLeft();
      }else if(e.keyCode == 39 || e.keyCode == 68){
        // 判断是否有向右运动的能力
        _this.block.checkRight();
      }else if(e.keyCode == 40 || e.keyCode == 83){
        // 判断是否有向下运动的能力
        _this.block.checkDown();
      }else if(e.keyCode == 32){
        // 一键到底，空格到底
        _this.block.checkBlockEnd();
      }else if(e.keyCode == 38 || e.keyCode == 87){
        // 键盘的上和w用来旋转
        _this.block.checkRot();
      }else if (e.keyCode == 27) {
        // 判断是否退出
        _this.block.checkClear(true);
      }
    })
  }

  // 运动
  Game.prototype.start = function(){
    var _this = this;
    // 设置帧编号
    this.f = 0;
    this.timer = setInterval(function(){
      _this.f++;
      $("#f").html("帧编号："+_this.f)
      // 清屏功能
      _this.clear();
      // 渲染方块
      _this.block.render();
      // 渲染地图
      _this.map.render(_this);
      // 方块下落
      _this.f % _this.during == 0 && _this.block.checkDown();
      // 渲染预览方块
      _this.setNextColor()
    },20)
  }

})()