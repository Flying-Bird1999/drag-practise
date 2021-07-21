<template>
    <van-swipe :autoplay="data.autoPlay"
               :vertical="data.vertical"
               :show-indicators="data.showIndicators"
               :indicator-color="data.indicatorColor"
               style="height: 300px"
               :loop="data.loop" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" class="image" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        data() {
            return {
                images: [
                    require("../../assets/banner/1.jpg"),
                    require("../../assets/banner/2.jpg"),
                    require("../../assets/banner/3.jpg"),
                    require("../../assets/banner/4.jpg"),
                ],
                data: {
                    vertical: false,
                    loop: false,
                    showIndicators: false,
                    indicatorColor: '#409EFF',
                    autoPlay: 2000
                }
            }
        },
        props: ['editData'],
        // 监听父组件传过来的值，只要改变，重新渲染
        watch: {
            'editData'(newVal, oldVal){
                this.data = newVal
                console.log(this.data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>