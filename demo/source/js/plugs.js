/**
 * Created by ChenChao on 2015/12/18.
 */

$(function () {

    "use strict";

    var $list = $('.list_product');
    var $wrapPlug = $('.plug-wrap');

    $('[data-back]').on('click', function () {
        $list.show();
        $wrapPlug.hide();
    });

    $('[data-plug]').on('click', function () {
        var plugWrap = $(this).attr('data-plug');
        $list.hide();
        $wrapPlug.hide();
        $('#' + plugWrap).show();
    });


    var $doc = $(document);
    //action-sheet
    $('[data-action-sheet="style1"]').actionSheet({
        target: '.login-timeset-pop',
        onSelect: function (value) {
            $.tips({
                content: '您选择了: ' + value
            });
        },
        cancel: function () {
            $.tips({
                content: '您取消了选择'
            });
        }
    });
    //action-sheet2
    $('#sheet1').actionSheet2({
        className: 'login-timeset-pop',
        data: [
            {label: '照相', value: 1},
            {label: '从相册中选择', value: 2}
        ],
        onSelect: function(value){
            alert('sheet1:' + value);
        },
        onCancel: function(){
            alert('取消 sheet1');
        }
    });
    /*$('#sheet2').actionSheet2({
        className: 'login-timeset-pop',
        data: [
            {label: '照相', value: 1},
            {label: '从相册中选择', value: 2},
            {label: '文件夹选择', value: 3}
        ],
        onSelect: function(value){
            alert('sheet2:' + value);
        },
        onCancel: function(){
            alert('取消 sheet2');
        }
    });*/
    var actionData = [
            { label: '拍照', value: 0 },
            { label: '从手机相册中选择', value: 1 }
        ];
    $("#sheet2").actionSheet2({
            className: "login-timeset-pop",
            data: actionData,
            onSelect: function(value, $obj) {
               alert($obj)
            }
        });


    //tips
    $doc.on('click tap', '[data-tips="style1"]', function () {
        $.tips();
    });
    $doc.on('click tap', '[data-tips="style2"]', function () {
        $.tips({
            showClose: false
        });
    });

    //pops
    $doc.on('click tap', '[data-pops="style1"]', function () {
        $("body").popup({
            title: '提示',
            message: '<b class="font_blue">弹出内容可以嵌入html标签</b>',
            popClass: "pop-c-one",
            id: "popExample1",
            ok: "确认",
            onOk: function () {
                alert("这里是成功回调函数")
            },
            cnacel: "取消"
        });
    });
    $doc.on('click tap', '[data-pops="style2"]', function () {
        $("body").popup({
            title: '提示',
            message: '弹出内容左对齐',
            popClass: "pop-l-one",
            id: "popExample1",
            ok: "确认",
            onOk: function () {

            },
            cnacel: "取消"
        });
    });
    $doc.on('click tap', '[data-pops="style3"]', function () {
        $("body").popup({
            title: '提示',
            message: '弹出内容左对齐',
            popClass: "pop-l-two",
            id: "popExample1",
            ok: "确认",
            onOk: function () {

            },
            cnacel: "取消"
        });
    });

    //tooltips
    $doc.on('click tap', '[data-tooltips="style1"]', function () {
        $.toolTips({
            message: '提交成功'
        });
    });

});