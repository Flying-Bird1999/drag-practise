<template>
    <div class="container">
        <van-rate v-model="value" :count="data.count" :allow-half="data.allowHalf" :disabled="data.disabled" :readonly="data.readonly" class="rate"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 3,
                data: {
                    count: 5,
                    allowHalf: true,
                    disabled: false,
                    readonly: false
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
    .container {
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        background:#fff;
        display: flex;
        align-items: center;
        padding-left: 20px;
    }
</style>