<template>
    <div class="container">
        <h2>组件属性修改</h2>
        <div class="edit">
            <component :is="type && typeList[type]['component']"
                        v-on="$listeners"
                        :childData="this.data.data">
            </component>
        </div>
    </div>
</template>

<script>
    import ButtonEdit from './ButtonEdit'
    import InputEdit from './InputEdit'
    import SwipeEdit from './SwipeEdit'
    import RateEdit from './RateEdit'
    import {editList} from '../../utils/data' //把typeList提炼出去
    export default {
        components: {
            ButtonEdit, InputEdit, SwipeEdit, RateEdit
        },
        props: {  //接收父组件的值
            data: {
                default: ()=> {
                    return {} //默认值为空对象
                }
            }
        },
        data() {
            return {
                type: '',
                typeList: editList
            }
        },
        mounted(){
            // 记录点击组件的类型，根据类型展示对应的edit组件
            this.type = this.data.type
            // console.log(this.data)
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        height: 640px;
        overflow: auto;
        h2 {
            margin-left: 150px;
        }
        .edit {
            display: flex;
            justify-content: center;

        }
    }

</style>