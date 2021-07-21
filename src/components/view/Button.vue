<template>
    <van-button :type="data.type" :size="data.size">{{data.text}}</van-button>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    type: 'default',
                    size: 'large',
                    text: '默认文本'
                }
            }
        },
        props: ['editData'],
        // 监听父组件传过来的值，只要改变，重新渲染
        watch: {
            'editData'(newVal, oldVal){
                this.data = newVal
            }
        }
    }
</script>

<style scoped lang="scss">

</style>