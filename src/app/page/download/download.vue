<template>
    <div class="download">
        <div class="down-top">
            <img src="../../../images/download/logo.png">
            <h3 class="text">BosPinjaman</h3>
        </div>
        <div class="down-middle">
            <div class="logo">
                <h2 class="logo-name">Aplikasi pinjaman</h2>
                <h2 class="logo-name">online tetbaik</h2>
            </div>
            <div class="copy-info">
                <p><span class="spot">•</span> <span class="text">Limit tinggi</span></p>   
                <p><span class="spot">•</span> <span class="text">Pinjaman yang cepat</span></p>   
                <p><span class="spot">•</span> <span class="text">Tanpa jaminan</span></p>   
            </div>
            <div class="down-pic">
                <qg-button class="down-btn" :text="textButton" @click="download"></qg-button>
            </div>
        </div>
        <div class="down-bottom">
            <img src="../../../images/download/bg.png">
        </div>
    </div>
</template>
<script>
    import downloadApi from '../../api/download.api'
    import BScroll from 'better-scroll'
    import Cookies from '../../service/cookieStorage.service'
    export default {
        data () {
            return {
                textButton: 'Klik dan install',
                channelId: 1
            }
        },
        methods: {
            download () {
                downloadApi.downlaod({channelId: this.channelId}).then(res => {
                    var browser = {
                        versions: function () {
                            var u = navigator.userAgent, app = navigator.appVersion;
                            return {         //移动终端浏览器版本信息
                                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            }
                        }()
                    }
                    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
                        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            //在微信中打开
                            window.alert('Klik tombol di kanan atas , pilih ke halaman browser anda')
                            return
                        }
                    }          
                    window.location.href = res.data.downloadUrl
                })
            }
        },
        components: {
        
        },
        mounted () {
            this.channelId = this.$route.query.channelId || 1
        }
    }
</script>
<style lang="less" scoped>
@import "../../../styles/qg.less";
.download{
    position: relative;
    text-align: center;
    box-sizing: border-box;
    .down-top{
        padding-top:40px;
        img{
            width:75px;
            height: 75px;
        }
        .text{
            margin:12px auto 35px auto;
            color:#229aff;
            font-size: 16px;
        }
    }
    .down-middle{
        .logo{
            margin-bottom:30px;
        }
        .logo-name{
            font-size: 30px;
            letter-spacing: 1px;
        }
        .copy-info{
            margin:0 102px;
            text-align:left;
            p{
                margin-bottom:10px;
            }
            .spot{
                color:#229aff;
            }
            .text{
                font-size: 16px;
                color:#3a3a3a;
            }
        }
        .down-pic{
            margin-top:40px;
            .down-btn{
                width: 240px;
                background: #229aff;
                border-radius: 4px;
            }
        }
    }
    .down-bottom{
        position: fixed;
        z-index: -1;
        left: 0;
        right:-2px;
        bottom: -10px;
        img{
            width: 100%;
        }
        
    }
}
    
</style>
