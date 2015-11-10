//展示
//var show_data;
$(document).ready(function() {
  // $(document).html('<link rel="stylesheet" href="css/font.css"/>');
  // $("head").append("<link>");
  // a = $("head").children(":last");
  // a.attr({
  //   rel: "stylesheet",
  //   type: "text/css",
  //   href: "css/font.css"
  // });
  $.ajax({
    type: "POST",
    url: "./php/show.php",
    dataType: "json",
    success: function(data) {
      show(data);
      $('.bg').css("height",$(document).height()-200);
    },
    error: function(errorThrown) {
      alert("亲，请刷新下页面");
    },
  });
})

function show(data) {
  for (var i = data.length - 1; i >= 0; i--) {
    data[i]
    if (data[i].id % 2 == 0) {
      $('.header').after("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/girl.png' id='img_girl'></div><div class='Note-tip'><span id='n-" + data[i].id + "'  onclick='javascript:nice(this);'>" + data[i].nice + "</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + data[i].to + "</h2><div disabled='disabled' class='Note-hm'>" + data[i].content + "</div><h2 class='Note-hb'>FROM&nbsp;" + data[i].from + "</h2></div></div>");
    } else {
      $('.header').after("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/boy2.png' id='img_boy2'></div><div class='Note-tip'><span id='n-" + data[i].id + "'  onclick='javascript:nice(this);'>" + data[i].nice + "</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + data[i].to + "</h2><div disabled='disabled' class='Note-hm'>" + data[i].content + "</div><h2 class='Note-hb'>FROM&nbsp;" + data[i].from + "</h2></div></div>");
    }
    //$('#header').after("<div class='show'><p>"+data[i].content+"</p><span>"+data[i].from+"</span><span>"+data[i].to+"</span><button id='n-"+data[i].id+"' class='nice' type='button' onclick='nice(this)';>赞</button><span>"+data[i].nice+"</span></div>")
  }
}
//提交
var id = 0;
$(document).ready(function() {
  $("#send").click(function() {
    var content = $("#content").val();
    var from = $("#from").val();
    var to = $("#to").val();
    $.ajax({
      type: "POST",
      url: "./php/submit.php",
      dataType: "json",
      data: {
        content: content,
        from: from,
        to: to
      },
      success: function(data) {
        if (data.success == "ture") {
          //alert(data.msg);
          id = data.id;
          echo(data.id);
          //console.log($('#content').val());
          $('#content').val('');
          $('#to').val('');
          $('#from').val('');
          hideDialog();
          //window.location.reload();
        } else {
          alert(data.msg);
        }
      },
      error: function() {
        alert("亲，请刷新下页面");
      },
    });
  });
});

function echo(id) {
  if (id % 2 == 0) {
    $('.header').after("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/girl.png' id='img_girl'></div><div class='Note-tip'><span id='n-" + id + "'  onclick='javascript:nice(this);'>0</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + $("#to").val() + "</h2><div disabled='disabled' class='Note-hm'>" + $("#content").val() + "</div><h2 class='Note-hb'>FROM&nbsp;" + $("#from").val() + "</h2></div></div>");
  } else {
    $('.header').after("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/boy2.png' id='img_boy2'></div><div class='Note-tip'><span id='n-" + id + "'  onclick='javascript:nice(this);'>0</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + $("#to").val() + "</h2><div disabled='disabled' class='Note-hm'>" + $("#content").val() + "</div><h2 class='Note-hb'>FROM&nbsp;" + $("#from").val() + "</h2></div></div>");
    //$('#show').prepend("<div class='show'><p>"+$("#content").val()+"</p><span>"+$("#from").val()+"</span><span>"+$("#to").val()+"</span><button id='n-"+id+"' class='nice' type='button' onclick='nice(this)';>赞</button><span>0</span></div>")
  }
}
//点赞
function nice(element) {
  var id_n = element.id;
  //console.log(id[0]);
  $("#" + id_n).css("background", "url(./img/boom_nice.png) no-repeat")
    // $("#"+id_n).attr("disabled",true);
  var num = $("#" + id_n).html();
  $("#" + id_n).html(parseInt(num) + 1);
  num = $("#" + id_n).html();
  //console.log(num);
  $("#" + id_n).removeAttr("onclick");
  $("#" + id_n).attr("onclick", "can_nice(this)");
  var check = new RegExp("[0-9]*\d*$");
  var id = check.exec(id_n)[0];
  //console.log(id+num);
  $.ajax({
    type: "POST",
    url: "./php/nice.php",
    dataType: "json",
    data: {
      id: id,
      nice: num
    },
    success: function(data) {
      if (data.success == "ture") {
        //alert(data.msg);
      } else {
        alert("亲，请刷新下页面");
      }
    },
    error: function(errorThrown) {
      alert("亲，请刷新下页面");
    },
  });
}
//取消赞
function can_nice(element) {
  var id_n = element.id;
  //console.log(id[0]);
  $("#" + id_n).css("background", "url(./img/boom.png) no-repeat")
    // $("#"+id_n).attr("disabled",true);
  var num = $("#" + id_n).html();
  $("#" + id_n).html(parseInt(num) - 1);
  num = $("#" + id_n).html();
  //console.log(num);
  $("#" + id_n).removeAttr("onclick");
  $("#" + id_n).attr("onclick", "nice(this)");
  var check = new RegExp("[0-9]*\d*$");
  var id = check.exec(id_n)[0];
  //console.log(id+num);
  $.ajax({
    type: "POST",
    url: "./php/nice.php",
    dataType: "json",
    data: {
      id: id,
      nice: num
    },
    success: function(data) {
      if (data.success == "ture") {
        //alert(data.msg);
      } else {
        alert("亲，请刷新下页面");
      }
    },
    error: function(errorThrown) {
      alert("亲，请刷新下页面");
    },
  });
}
//分批次加载
var stop = true;
var times = 0;
$(window).scroll(function() {
  totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
  if ($(document).height() <= totalheight) {
    if (stop == true) {
      $('.loading').css("display","none");
      stop = false;
      $.ajax({
        type: "POST",
        url: "./php/paging.php",
        dataType: "json",
        data: {
          times: times
        },
        success: function(data) {
          if(data.success){
            stop = false;
            $('.loading').html('END~');
            $('.loading').css("display","block");
          }else{
            showPaging(data);
            $('.loading').css("display","block");
            $('.bg').css("height",$(document).height()-200);
            stop = true;
            times++;
          }
        },
        error: function(errorThrown) {
          alert("亲，请刷新下页面");
        },
      });
    }
  }
});
function showPaging(data) {
  for (var i = data.length - 1; i >= 0; i--) {
    data[i]
    if (data[i].id % 2 == 0) {
      $('.loading').before("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/girl.png' id='img_girl'></div><div class='Note-tip'><span id='n-" + data[i].id + "'  onclick='javascript:nice(this);'>" + data[i].nice + "</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + data[i].to + "</h2><div disabled='disabled' class='Note-hm'>" + data[i].content + "</div><h2 class='Note-hb'>FROM&nbsp;" + data[i].from + "</h2></div></div>");
    } else {
      $('.loading').before("<div class='Note clearfix'><div class='fl'><div class='Note-photo'><img src='img/boy2.png' id='img_boy2'></div><div class='Note-tip'><span id='n-" + data[i].id + "'  onclick='javascript:nice(this);'>" + data[i].nice + "</span></div></div><div id='show' class='note-message'><h2 class='Note-ht'>TO&nbsp;" + data[i].to + "</h2><div disabled='disabled' class='Note-hm'>" + data[i].content + "</div><h2 class='Note-hb'>FROM&nbsp;" + data[i].from + "</h2></div></div>");
    }
    //$('#header').after("<div class='show'><p>"+data[i].content+"</p><span>"+data[i].from+"</span><span>"+data[i].to+"</span><button id='n-"+data[i].id+"' class='nice' type='button' onclick='nice(this)';>赞</button><span>"+data[i].nice+"</span></div>")
  }
}
//前端
var dialogInstace, onMoveStartId; //  用于记录当前可拖拽的对象
// var zIndex = 9000;
//  获取元素对象  
function g(id) {
  return document.getElementById(id);
}
//  自动居中元素（el = Element）
function autoCenter(el) {
  var bodyW = document.documentElement.clientWidth;
  var bodyH = document.documentElement.clientHeight;
  var elW = el.offsetWidth;
  var elH = el.offsetHeight;
  el.style.left = (bodyW - elW) / 2 + 'px';
  el.style.top = (bodyH - elH) / 2 + 'px';
}
//  自动扩展元素到全部显示区域
function fillToBody(el) {
  el.style.width = document.documentElement.clientWidth + 'px';
  el.style.height = document.documentElement.clientHeight + 'px';
}
//  Dialog实例化的方法
function Dialog(dragId, moveId) {
  var instace = {};
  instace.dragElement = g(dragId); //  允许执行 拖拽操作 的元素
  instace.moveElement = g(moveId); //  拖拽操作时，移动的元素
  instace.mouseOffsetLeft = 0; //  拖拽操作时，移动元素的起始 X 点
  instace.mouseOffsetTop = 0; //  拖拽操作时，移动元素的起始 Y 点
  instace.dragElement.addEventListener('mousedown', function(e) {
    var e = e || window.event;
    dialogInstace = instace;
    instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft;
    instace.mouseOffsetTop = e.pageY - instace.moveElement.offsetTop;
    // instace.moveElement.style.zIndex = zIndex ++;
  });
  return instace;
}
//  在页面中侦听 鼠标弹起事件
document.onmouseup = function(e) {
    dialogInstace = false;
    clearInterval();
  }
  //  在页面中侦听 鼠标移动事件
document.onmousemove = function(e) {
  var e = e || window.event;
  var instace = dialogInstace;
  if (instace) {
    var maxX = document.documentElement.clientWidth - instace.moveElement.offsetWidth;
    var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight;
    instace.moveElement.style.left = Math.min(Math.max((e.pageX - instace.mouseOffsetLeft), 0), maxX) + "px";
    instace.moveElement.style.top = Math.min(Math.max((e.pageY - instace.mouseOffsetTop), 0), maxY) + "px";
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};
//  拖拽对话框实例对象
Dialog('dialogDrag', 'dialogMove');

function onMoveStart() {}
//  重新调整对话框的位置和遮罩，并且展现
function showDialog() {
  $('html,body').css("overflow","hidden");
  g('dialogMove').style.display = 'block';
  g('mask').style.display = 'block';
  autoCenter(g('dialogMove'));
  fillToBody(g('mask'));
  // console.log($('body').height());
  $('#mask').height($('body').height() + 'px');
}
//  关闭对话框
function hideDialog() {
  $('html,body').css("overflow","visible");
  g('dialogMove').style.display = 'none';
  g('mask').style.display = 'none';
}
//  侦听浏览器窗口大小变化
window.onresize = showDialog;