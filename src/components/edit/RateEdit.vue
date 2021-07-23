<template>
    <div>
        <p>自定义星星数量</p>
        <el-input-number
                v-model="rateData.count"
                :min="1"
                :max="10"
                @change="dataChange">
        </el-input-number>
        <p>开启半星模式</p>
        <el-switch
                v-model="rateData.allowHalf"
                @change="dataChange">
        </el-switch>
        <p>禁用</p>
        <el-switch
                v-model="rateData.disabled"
                @change="dataChange">
        </el-switch>
        <p>只读</p>
        <el-switch
                v-model="rateData.readonly"
                @change="dataChange">
        </el-switch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //该对象用于控制展示组件的属性值
                rateData: {
                    count: 5,
                    allowHalf: true,
                    disabled: false,
                    readonly: false
                }
            }
        },
        props: ['childData'], //接收父组件的值
        mounted(){
            // 判断对象为空直接return，使用默认的buttonData值
            if(JSON.stringify(this.childData)==='{}') {
                return
            }
            // console.log(this.childData)
            this.rateData = this.childData
        },
        methods: {
            // 对象属性值改变，触发函数将改变后的对象传给“爷爷组件”
            dataChange(){
                this.$emit('dataChange', this.rateData)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>