// 如果要使用mixins优化所有的edit组件，把该文件的buttonData改成editData，所有组件的data属性也都改成相应相同的名称，逐一导入即可！
export const editMixins = {
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