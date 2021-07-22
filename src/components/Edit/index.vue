<template>
    <div class="container">
        <h2>组件属性修改</h2>
        <div class="edit">
            <component
                    :is="type && typeList[type]['component']"
                    v-on="$listeners"
                    :childData="this.data.data"
            ></component>
        </div>
    </div>

</template>

<script>
    import ButtonEdit from './ButtonEdit'
    import InputEdit from './InputEdit'
    import SwipeEdit from './SwipeEdit'
    export default {
        props: {  //接收父组件的值
            data: {
                default: ()=> {
                    return {}
                }
            }
        },
        data() {
            return {
                type: '',
                typeList: {
                    'input': {
                        name: '输入框',
                        component: InputEdit
                    },
                    'button': {
                        name: '按钮',
                        component: ButtonEdit
                    },
                    'swipe': {
                        name: '轮播图',
                        component: SwipeEdit
                    }
                }
            }
        },
        mounted(){
            // 记录点击组件的类型，根据类型展示对应的edit组件
            this.type = this.data.type
            // console.log(this.data)
        },
        components: {
            ButtonEdit,
            InputEdit
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        h2 {
            margin-left: 100px;
        }
        .edit {
            display: flex;
            justify-content: center;

        }
    }

</style>