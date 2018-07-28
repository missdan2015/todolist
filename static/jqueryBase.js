// 1.为表单form绑定submit事件，输入内容回车之后触发事件
// 2.定义事件触发后ol的装填
// 3.为每个list条目的差号绑定click事件
// 4.定义click事件触发后的当前条目的删除
// 5.条目总数的更新,每一次过滤时候都要更新
// 6.在点击未完成或者已经完成的
// 7.简单if else善于使用三目运算符代替来减少代码量

(function(){
    var $todoInput = $('#todoInput');
    var $todoList = $('#todoList');
    var $todoCount = $('#todoCount');
    $(".section3").css("visibility",'hidden');
    function count(){
        var notChecked = $('input[type=checkbox]').not('input:checked').length;
        var checked = $('input[type=checkbox]:checked').length;
        var len = notChecked + checked;
        if(len>0){
            var todoListNum = notChecked===1?'&nbsp;item left':'&nbsp;items left';
            todoListNum = notChecked + todoListNum;
            $todoCount.html(todoListNum);
            $todoCount.parent().css('visibility','visible').addClass('section1');
        }
        else if(len === 0){
            $todoCount.parent().css('visibility','hidden');
        }
        var numCompleted = $('input:checked').length >= 1?'visible':'hidden';
        $('#btnClearCompleted').css('visibility',numCompleted);
    }
    function enterInput(inputValue) {
        var $List = $('<li><input type="checkbox" name="test" class="toggle" ><label>'+inputValue+'</label><button class="todoRemove">X</button></li>');
        var strLength = inputValue.replace(/^\s+|\s+$/g,"").length;
        if(strLength>0) {
            $todoList.append($List);
        }
        $todoInput.val(''); //注意每次将输入的内容添加到list中后，记得清空输入框
        $('li').hover(function(){
            $(this).children().eq(2).css('visibility','visible');
        },function(){
            $(this).children().eq(2).css('visibility','hidden');
        });
        count();
        $('#btnCheckAll').html('checkAll');
    }
    $todoInput.keyup(function(event){
        var inputValue = $todoInput.val();
        if(event.keyCode === 13){
            if(inputValue.length > 0){
                enterInput(inputValue);
            }
        }
    });
    $todoList.on('click','.todoRemove',function(){
        $(this).parent().remove();
        updateCheckAll();
        count();
    });
    //复选框操作
    $todoList.on("click",".toggle",function(){
        if($(this).is(':checked')){
            $(this).next().css({'text-decoration':'line-through','color':'#d9d9d9'});
            $(this).prop('checked',true);
            $('input[type=checkbox]').not('input:checked').length--;
        }
        else{
            $(this).next().css({'text-decoration':'none','color':'black'});
            $(this).prop('checked',false);
        }
        updateCheckAll();
        count();
    });
    //完成All,Active和Completed,勾选一下复选框，就会将该项目添加到completed，取消勾选就会添加到Active；

    $('#btnAll').click(function(){
        $(this).addClass('btn');
        $(this).siblings().removeClass('btn');
        $('.toggle').parent().show();
    });

    $('#btnActive').click(function(){
        $(this).addClass('btn');
        $(this).siblings().removeClass('btn');
        $('.toggle').each(function(index,element){
            if($(element).is(':checked') === true){
                $(element).parent().hide();
            }else{
                $(element).parent().show();
            }
        });
    });

    $('#btnComplete').click(function(){
        $(this).addClass('btn');
        $(this).siblings().removeClass('btn');
        $('.toggle').each( function (index,element) {
            if($(element).is(':checked') === false){
                $(element).parent().hide();
            }else{
                $(element).parent().show();
            }
        });
    });

    $('#btnClearCompleted').click(function(){
        $('input:checked').parent().remove();
        count();
    });
    
    function updateCheckAll() {
        var notChecked = $('input[type=checkbox]').not('input:checked').length;
        var t3 = (notChecked == 0 ? 'notCheckAll': 'checkAll');
        $('#btnCheckAll').html(t3);
    }
    $('#btnCheckAll').click(function(){
        var notChecked = $('input[type=checkbox]').not('input:checked').length;
        var t1 = (notChecked ? true: false);
        var t2 = (notChecked ? 'line-through': 'none');
        var t3 = (notChecked ? 'notCheckAll': 'checkAll');
        var t4 = (notChecked ? '#d9d9d9':'black');
        $('input[type=checkbox]').prop('checked', t1);  //prop() 方法设置或返回被选元素的属性和值。
        $('input[type=checkbox]').next().css('text-decoration',t2).css('color',t4);
        $('#btnCheckAll').html(t3);
        count();
    });
})();