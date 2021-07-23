<template>
    <div>
        <p>输入框文本内容</p>
        <el-input v-model="inputData.label" placeholder="请输入文本" @change="dataChange"></el-input>
        <p>选择输入框类型</p>
        <el-select v-model="inputData.type" placeholder="请选择输入框类型" @change="dataChange">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <p>是否选择禁用</p>
        <el-switch
                v-model="inputData.disabled"
                @change="dataChange">
        </el-switch>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputData: {
                    label: '文本',
                    type: 'text',
                    disabled : false
                },
                options: [
                    {
                        value: 'text',
                        label: '任意文本'
                    },
                    {
                        value: 'tel',
                        label: '手机号'
                    },
                    {
                        value: 'password',
                        label: '密码'
                    }
                ]
            }
        },
        props: ['childData'], //接收父组件的值
        mounted(){
            if(JSON.stringify(this.childData)==='{}') {
                return
            }
            // console.log(this.childData)
            this.inputData = this.childData
        },
        methods: {
            dataChange() {
                this.$emit('dataChange', this.inputData)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>