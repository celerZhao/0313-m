import Vue from 'vue'
const vm = new Vue()

export function nativeShare(shareBtnId, pcode, config) {
  if ($(shareBtnId).hasClass('active')) {
        return false;
    } else {
        $(shareBtnId).addClass('active');
    }

    //浏览器、qq、微信
    var _this = this,
    pcode = pcode || '0000',
    qApiSrc = {
        lower: '//3gimg.qq.com/html5/js/qb.js',
        higher: '//jsapi.qq.com/get?api=app.share'
    },
    bLevel = {
        qqWithBroser: {forbid: 0, higher: 2},
        qq: {forbid: 0, lower: 1, higher: 2},
        uc: {forbid: 0, allow: 1}
    },
    UA = navigator.userAgent,
    isqqWithBroser = (UA.split('QQ/').length > 1) ? bLevel.qqWithBroser.higher : bLevel.qqWithBroser.forbid,
    isqqBrowser = (UA.split('MQQBrowser/').length > 1) ? bLevel.qq.higher : bLevel.qq.forbid,
    isucBrowser = (UA.split('UCBrowser/').length > 1) ? bLevel.uc.allow : bLevel.uc.forbid,
    version = {uc: '', qq: ''},
    isWeixin = false,
    platform_os = '';

    config = config || {};
    this.url = config.url || document.location.href || '';
    this.title = config.title || document.title || '';
    this.desc = config.desc || document.title || '';
    this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
    this.img_title = config.img_title || document.title || '';
    this.from = config.from || window.location.host || '';
    this.ucAppList = {
        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
        QZone: ['kQZone', 'QZone', '3', 'QQ空间']
    };

    this.share = function (to_app) {
        var title = this.title, url = this.url, desc = this.desc, img = this.img, img_title = this.img_title, from = '';
        if (isucBrowser) {
            to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
            if (to_app == 'QZone') {
                B = 'mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url='+img+'&title='+title+'&description='+desc+'&url='+url+'&app_name='+from;
                k = document.createElement('div'), k.style.visibility = 'hidden', k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                    k && k.parentNode && k.parentNode.removeChild(k)
                }, 5E3);
            }
            if (typeof(ucweb) != 'undefined') {
                ucweb.startRequest('shell.page_share', [title, desc, url, to_app, '', '', ''])
            } else {
                if (typeof(ucbrowser) != 'undefined') {
                    ucbrowser.web_share(title, desc, url, to_app, '', '', '')
                } else { }
            }
        } else {
            if (isqqBrowser && !isWeixin) {
                to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
                var ah = {
                    url: url,
                    title: title,
                    description: desc,
                    img_url: img,
                    img_title: img_title,
                    to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                    cus_txt: '请输入此时此刻想要分享的内容'
                };
                ah = to_app == '' ? '' : ah;
                if (typeof(browser) != 'undefined') {
                    if (typeof(browser.app) != 'undefined' && isqqBrowser == bLevel.qq.higher) {
                        browser.app.share(ah)
                    }
                } else {
                    if (typeof(window.qb) != 'undefined' && isqqBrowser == bLevel.qq.lower) {
                        window.qb.share(ah)
                    } else { }
                }
            } else { }
        }
    };

    this.html = function() {
        var contHtml =
                '<div class="cont-share clear">'+
                    '<div class="share-wrap">'+
                      '<span data-app="weixin" class="iconcell weixin"><i class="iocnshare"></i>微信好友</span>'+
                      '<span data-app="weixinFriend" class="iconcell weixin_friend"><i class="iocnshare"></i>微信朋友圈</span>'+
                      '<span data-app="copylink" class="iconcell copylink" id="copybtn"><i class="iocnshare"></i>复制链接</span>'+
                    '</div>'+
                    '<div id="copylink" style="display:none;">'+
                        '<p style="margin-bottom:0.2rem;">请手动复制此链接</p>'+
                        '<textarea name="" id="linkUrl" readonly="readonly" rows="3" cols="26"></textarea>'+
                    '</div>'+
                '</div>';

        this.constitute({
            title: '分享赚钱',
            content: contHtml
        });
    };

    this.isloadqqApi = function () {
        if (isqqBrowser) {
            var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
            var d = document.createElement('script');
            var a = document.getElementsByTagName('body')[0];
            d.setAttribute('src', b);
            a.appendChild(d)
        }
    };

    this.getPlantform = function () {
        if ((UA.indexOf('iPhone') > -1 || UA.indexOf('iPod') > -1)) {
            return 'iPhone';
        }
        return 'Android';
    };

    this.is_weixin = function () {
        var au = UA.toLowerCase();
        return au.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
    };

    this.getVersion = function (c) {
        var a = c.split('.'), b = parseFloat(a[0] + '.' + a[1]);
        return b
    };

    this.constitute = function (o) {
        var maskInner, h,
            html = '<div id="maskFull" class="toask">'+
                      '<div id="maskInner" class="toask-wrap">'+
                          '<h2 class="title text-center"><p class="header-title">'+  o.title +
                            '</p><i id="closeBtn" class="icon-no"></i>'+
                          '</h2>' + o.content +
                        '</div>'+
                  '</div>';



        $('body').append(html);
        // maskInner = $('.toask-wrap');
        // h = maskInner.height();
        // maskInner.css('margin-top', -h/2 + '50px').addClass('active');

        $('#btnSure, #btnCancle, #closeBtn').on('click', function(){
            $('#maskFull, #maskInner').remove();
            $("#copylink").hide();
            $('#nativeShareBtn').removeClass('active');
            _this = null;
        });
    };

    this.init = function () {
        platform_os = this.getPlantform();
        version.qq = isqqBrowser ? this.getVersion(UA.split('MQQBrowser/')[1]) : 0;
        version.uc = isucBrowser ? this.getVersion(UA.split('UCBrowser/')[1]) : 0;
        isWeixin = this.is_weixin();

        //微信打开
        if (isWeixin) {
          var html = '<div id="maskFull" class="toask">' +
              '<div class="toask-content">'+
                '<img class="tip-img" src="../../assets/img/nativeShareIcon/tip-img.png">' +
                '<a id="closeTipImg" class="I_know" href="JavaScript:void(0);">我知道了</a>'+
              '</div>'+
            '</div>';
          $('body').append(html);
          $('#closeTipImg').on('click', function () {
              $('#maskFull').remove();
              $('#nativeShareBtn').removeClass('active');
          });
          return;
        }
        //QQ内置浏览器打开
        if (isqqWithBroser) {
            // var contHtml = '<div class="cont word-break alone text-center">请在QQ右上角分享</div>';
            // this.constitute({
            //     title: '提　示',
            //     content: contHtml
            // });
            vm.$createDialog({
                type: 'alert',
                title: '提示',
                showClose: true,
                content: '这里是qq内置浏览器额',
                icon: '',
                confirmBtn: '我知道了'
              }).show()
            return;
        }

        //UC 或 QQ浏览器打开
        if ((isqqBrowser && version.qq < 5.4 && platform_os == 'iPhone') || (isqqBrowser && version.qq < 5.3 && platform_os == 'Android')) {
            isqqBrowser = bLevel.qq.forbid
        } else {
            if (isqqBrowser && version.qq < 5.4 && platform_os == 'Android') {
                isqqBrowser = bLevel.qq.lower
            } else {
                if (isucBrowser && ((version.uc < 10.2 && platform_os == 'iPhone') || (version.uc < 9.7 && platform_os == 'Android'))) {
                    isucBrowser = bLevel.uc.forbid
                }
            }
        }

        this.isloadqqApi();

        if (isqqBrowser || isucBrowser) {
            this.html();
        } else {
          //this.html(); //测试
          vm.$createDialog({
              type: 'alert',
              title: '提示',
              showClose: true,
              content: '对不起！目前仅支持UC和QQ浏览器',
              icon: '',
              confirmBtn: '我知道了'
            }).show()
        }
    };

    this.init();



    var items = document.getElementsByClassName('iconcell');
    for (var i=0;i<items.length;i++) {
        items[i].onclick = function(){
          if(this.getAttribute('data-app')=='copylink') {
            $("#copylink").show();
            $('#linkUrl').val(window.location.href);
            $('#linkUrl').click(function() {
              $(this).focus();
              $(this).select();
            });
          }else{
            _this.share(this.getAttribute('data-app'));
            $("#copylink").hide();
          }
        }
    }
};
