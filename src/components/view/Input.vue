<template>
    <div>
        <van-field
                :type="data.type"
                :label="data.label"
                :disabled ="data.disabled " />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    label: '文本',
                    type: 'text',
                    disabled : false
                }
            }
        },
        props: ['editData'],
        // 监听父组件传过来的值，只要改变，重新渲染
        watch: {
            'editData'(newVal, oldVal){
                this.data = newVal
                // console.log(this.data)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>