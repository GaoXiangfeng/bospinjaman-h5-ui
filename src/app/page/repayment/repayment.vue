<!-- 还款指南 -->
<template>
    <div v-if="isHaveOrder">
        <div class="repay-limit">
          <div class="name"> <span></span> Jumlah Dicairkan <span></span></div>
          <div class="overdue" v-if="isOverdue">
            <p>Terlambat <span>{{overdueDays}}</span> hari</p> 
          </div>
          <h1 class="limit" id="limit-value">Rp.{{amount}}</h1>
          <p class="time">Jatuh Tempo : <span>{{deadLine}}</span></p>
        </div>
        <div class="repay-guide-box">
            <div class="percent-title">
                <span></span> <Strong>Rekening Virtual</Strong>
            </div>
            <div class="percent-content" v-for="(item,index) in bankList" :key="index">
                <span>•</span>
                <div class="bank-info">
                    <p class="bank-name">{{item.bankCode}}</p>
                    <p class="bank-num">{{item.bankAccount}}</p>
                </div>
            </div>
            <div class="percent-title">
                <span></span> <Strong>Panduan Pembayaran</Strong>
            </div>
            <div class="percent-card">
                <div class="title">
                    <span>•</span> <div>Dari bank yang sama</div>
                </div>
                <div class="content" @click="gotoUrl('Mandiri88608')">
                    <p>Bagaimana cara membayar <span>Mandiri 88608</span> </p> <a class="long-a" :href="`${qiniuUrl}Mandiri88608.html?time=${date}`"></a> 
                </div>
                <div class="content" @click="gotoUrl('Mandiri88908')">
                    <p>Bagaimana cara membayar <span>Mandiri 88908</span> </p> <a class="long-a" :href="`${qiniuUrl}Mandiri88908.html?time=${date}`"></a>
                </div>
                <div class="content" @click="gotoUrl('BRI')">
                    <p>Bagaimana cara membayar <span>BRI</span> </p> <a :href="`${qiniuUrl}BRI.html?time=${date}`"></a>
                </div>
                <div class="content single" @click="gotoUrl('BNI')">
                    <p>Bagaimana cara membayar <span>BNI</span> </p> <a :href="`${qiniuUrl}BNI.html?time=${date}`"></a>
                </div>
            </div>
            <div class="percent-card">
                <div class="title second">
                    <span>•</span> 
                    <div>
                        <p>Dari bank yang lain</p>
                        <p class="mark">(kami merekomendasikan rekening BNI)</p>
                    </div>
                    
                </div>
                <div class="content" @click="gotoUrl('Mandiri-otherBanks')">
                    <p>Bagaimana cara membayar <span>Mandiri</span> </p> <a :href="`${qiniuUrl}Mandiri-otherBanks.html?time=${date}`"></a>
                </div>
                <div class="content" @click="gotoUrl('BRI-otherBanks')">
                    <p>Bagaimana cara membayar <span>BRI</span> </p> <a :href="`${qiniuUrl}BRI-otherBanks.html?time=${date}`"></a>
                </div>
                <div class="content" @click="gotoUrl('BNI-otherBanks1')">
                    <p>Bagaimana cara membayar <span>BNI</span> </p> <a :href="`${qiniuUrl}BNI-otherBanks1.html?time=${date}`"></a>
                </div>
                <div class="content single" @click="gotoUrl('BNI-otherBanks2')">
                    <p>Bagaimana cara membayar <span>BNI VAs from BCA</span> </p> <a class="long-a" :href="`${qiniuUrl}BNI-otherBanks2.html?time=${date}`"></a>
                </div>
            </div>
        </div>
        <div class="download" v-if="isOpen">
               <div class="img"></div>
               <div class="text">
                   <p class="name">BosPinjaman</p>
                   <p class="detail"><span>Tingkat keberhasilan lebih tinggi
</span></p>
               </div>
               <qg-button text="Download" class="quick" @click="goApp"></qg-button>
               <i class="close" @click="isOpen=!isOpen"></i>
        </div>
    </div>
    <div v-else class="no-order">
        <img src="../../../images/repayment/no-order.png" alt="">
        <p class="text">Tidak ada pesanan~</p>
    </div>
</template>

<script>
import repaymentApi from '../../api/repayment.api'
import userService from '../../service/user.service'
import moment from 'moment'
const qiniuUrl = 'https://oic74zs8j.qnssl.com/'
export default {
    data () {
        return {
            date: new Date(),
            qiniuUrl: qiniuUrl,
            isOverdue: false,
            isHaveOrder: true,
            amount: 0,
            bankList: [],
            deadLine: '',
            overdueDays: 0,
            isOpen: true
        }
    },

    components: {},

    computed: {},

    methods: {
        gotoUrl (name) {
            window.location.href = `${qiniuUrl}${name}.html?time=${this.date}`
        },
        getAccount () {
            repaymentApi.getVirtualAccount().then(res => {
                res = res.data
                //如果没有订单，直接跳转到空页面
                if(JSON.stringify(res) === '{}') {
                    this.isHaveOrder = false
                    return
                }
                this.amount = res.amount.toFixed(2)
                this.bankList = res.bankList
                this.deadLine = moment(res.deadLine).format('YYYY-MM-DD')
                this.isOverdue = res.overdue === '1'
                this.overdueDays = res.overdueDays || 0
                this.isHaveOrder = res.status === 6
                if (this.isOverdue) $('#limit-value').addClass('overdue-limit')
                else $('#limit-value').removeClass('overdue-limit')
            })
        },
        //极速下载
        goApp () {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.app.uanguang&hl=in_ID'
        }

    },

    mounted () {
        this.getAccount()
    }
}

</script>
<style lang='less' scoped>
@import "../../../styles/_var.less";
    .repay-limit{
        text-align: center;
        padding: 10px 32px 10px 0;
        color: #fff;
        background: url('../../../images/repayment/greenTitle.png') no-repeat;
        background-size: 100% 140px;
        margin-bottom: -22px;
        .name{
            font-weight: 30;
            line-height: 20px;
            span{
                display:inline-block;
                width: 46px;
                height: 1px;
                vertical-align: middle;
                background: url('../../../images/repayment/Line-small.png') no-repeat;
                background-size: 46px 1px;
            }
        }
        .overdue{
            height: 20px;
            position: relative;
            p{
                position: absolute;
                right: 0;
                background: #fff;
                border: 1px solid #487BAD;
                padding: 2px 8px;
                border-radius: 62px;
                margin-top: 5px;
                color: #FF2929;
                font-weight: 900;
                font-size: 12px;
            } 
        }
        .limit{
            font-size: 38px;
            line-height: 38px;
            margin: 22px auto;
        }
        .overdue-limit{
            margin: 12px auto;
        }
        .time{
            margin-bottom: 20px;
            font-weight: 20;
            line-height: 14px;
            span{
                font-weight: bold;
            }
        }
    }
    .repay-guide-box{
         padding: 0 32px;
         margin-bottom: 100px;
        .percent-title{
            color: @font-color-black;
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 25px;
            margin-top: 32px;
            span{
                display: inline-block;
                width: 4px;
                height: 18px;
                line-height: 18px;
                border-radius: 1px;
                vertical-align: middle;
                background: @toko-green-color;
                margin-right: 8px;
                margin-bottom: 2px;
            }
        }
        .percent-content{
            margin-left: 10px;
            margin-bottom: 16px;
            &>span{
                display: inline-block;
                color: @toko-green-color;
                margin-right: 8px;
                vertical-align:top;
                height: 42px;
                line-height: 42px;
                font-size: 28px;
            }
            .bank-info{
                display: inline-block;
                p.bank-name{
                    font-size: @font-size-small;
                    color: @font-color-white;
                    line-height: 12px;
                    margin-bottom: 10px;
                    font-weight: 30;
                }
                p.bank-num{
                    color: @font-color-gray;
                    font-size: @font-size-large;
                    line-height: 18px;
                    font-weight: 40;
                }
            }
        }
        .last{
            margin-bottom: 0;
        }
        .percent-card{
            margin-bottom:24px;
            border-radius: 8px;
            box-shadow: 0 0 5px @toko-green-light;
            .title{
                width: 100%;
                height: 40px;
                background:@toko-green-light;
                border-radius: 8px 8px 0 0;
                padding: 13px 0 13px 16px;
                display: flex;
                &>span{
                    display: inline-block;
                    color: @toko-green-color;
                    margin-right: 8px;
                    line-height: 14px;
                    font-size: 28px;
                }
                div{
                    display: inline-block;
                    color: @toko-green-dark;
                    height: 14px;
                    line-height: 14px;
                    font-weight: 25;
                    .mark{
                        color:#ee5f66;
                        font-size: 10px;
                        display: block;
                        margin-top: 5px;
                    }
                }
            }
            .second{
                height: 60px;
            }
            .content{
                padding: 15px 26px 15px 31px;
                position: relative;
                border-bottom: 1px solid #E6E6E6;
                span{
                    color: @toko-green-color;
                    font-weight: 40;
                }
                a{
                    display: inline-block;
                    position: absolute;
                    right: 15px;
                    width: 8px;
                    height: 13px;
                    bottom: 18px;
                    background: url('../../../images/repayment/jiantou.png') no-repeat;
                    background-size: 8px 13px;
                }
                .long-a{
                    bottom: 28px;
                }
            }
            .single{
                border-bottom: 0;
            }
        }
    }
    .download{
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width:640px;
        height: 60px;
        background: #fff;
        box-shadow: 0px 2px 10px #b5b5b5;
        display: flex;
        padding: 9px 46px 9px 20px;
        vertical-align: middle;
        .img{
            width: 40px;
            height: 40px;
            background: url('../../../images/repayment/logo.png') no-repeat;
            background-size: 40px 40px;
        }
        .text{
            margin-left: 10px;
            .name{
                font-size: 15px;
                line-height: 15px;
                font-weight: bold;
                color: #1E90FF;
                font-family: Arial, Helvetica, sans-serif;
                font-family: '微软雅黑';
                background: linear-gradient(to right,#40C3FF,#1E90FF);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .detail{
                font-size: 12px;
                color: #6D98CE;
                line-height: 12px;
                margin-top: 10px;
                font-weight: 30;
                span{
                    margin-right: 10px;
                }
            }
        }
        .quick{
            width: 76px;
            height: 27px;
            line-height: 29px;
            background: #1E90FF;
            border-radius: 2px;
            font-size: 12px;
            margin: 8px 0 4px;
            position: absolute;
            right: 30px;
        }
        .close{
            position: absolute;
            right: 5px;
            top: 5px;
            width: 40px;
            height: 40px;
            background: url('../../../images/repayment/close.png') no-repeat;
            background-size: 10px 10px;
            background-position: 30px 0px;
        }
    }
    .no-order{
        text-align: center;
        padding: 80px 0;
        p{
            margin-top: 40px;
            color: @font-color-white;
        }

    }
</style>