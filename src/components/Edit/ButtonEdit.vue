<template>
    <div>
        <p>按钮文本内容</p>
        <el-input v-model="buttonData.text" placeholder="请输入内容" @change="dataChange"></el-input>
        <p>选择按钮类型</p>
        <el-select v-model="buttonData.type" placeholder="请选择" @change="dataChange">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <p>按钮尺寸</p>
        <el-radio-group v-model="buttonData.size" @change="dataChange">
            <el-radio label="large">大号</el-radio>
            <el-radio label="normal">普通</el-radio>
            <el-radio label="small">小型</el-radio>
            <el-radio label="mini">迷你</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'ButtonEdit',
        data() {
            return {
                //该对象用于控制展示组件的属性值
                buttonData: {
                    type: 'default',
                    size: 'large',
                    text: '默认文本'
                },
                options: [
                    {
                        value: 'primary',
                        label: '主要按钮'
                    },
                    {
                        value: 'info',
                        label: '信息按钮'
                    },
                    {
                        value: 'default',
                        label: '默认按钮'
                    },
                    {
                        value: 'warning',
                        label: '警告按钮'
                    },
                    {
                        value: 'danger',
                        label: '危险按钮'
                    }
                ]
            }
        },
        props: ['childData'], //接收父组件的值
        mounted(){
            // 判断对象为空直接return，使用默认的buttonData值
            if(JSON.stringify(this.childData)==='{}') {
                return
            }
            // console.log(this.childData)
            this.buttonData = this.childData
        },
        methods: {
            // 对象属性值改变，触发函数将改变后的对象传给“爷爷组件”
            dataChange(){
                this.$emit('dataChange', this.buttonData)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>