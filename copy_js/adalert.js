/**
 * Created by zcl on 14-4-19.
 */
;
(function ($) {
    $.AdAlert = function (options) {
        return $.fn.AdAlert(options)
    }
    $.fn.AdAlert = function (options) {
        var defaults = {
                type: null,              // msg, img
                autoClose: true,
                closeTime: 5000,
                imgUrl: null,
                link: null,
                msg: null,
                width: '200',
                height: '250',
                speed: 'fast',
                position:'bottom-right' //top,left,right,bottom
            },
            options = $.extend(defaults, options);
        if ($('#adPanel').length === 0) {
            $('body').append('<div id="adPanel"></div>');
            console.log('body');
        }
        var adPanel = $('#adPanel');

        //样式设置
        adPanel.css({backgroundColor:'#fff',display: 'none', position: 'fixed', bottom: '1px', right: '5px', border: '5px solid #d8d8d8',textAlign:'center', width: options.width + 'px', height: options.height + 'px'});
        adPanel.stop().slideDown(options.speed);

        //事件设置
        if (options.type === 'msg') {
            adPanel.html('<a href="'+options.link+'">'+options.msg+'</a>');

        }

        if (options.type === 'img') {
            adPanel.html('<div style="margin: 8px auto">'+options.msg+'</div><a href="' + options.link + '"><img src="' + options.imgUrl + '" width="' + (options.width-10) + '" height="' + (options.height-50) + '"></a>');

        }

        //动画设置
        if (options.autoClose) {
            adPanel.delay(options.closeTime).slideUp(options.speed);
        }

    }
})(jQuery)

