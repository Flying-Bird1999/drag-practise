<template>
    <div class="container">
        <div class="left">
            <ul @dragstart="dragStart">
                <li v-for="(item, key, index) in typeList"
                    :key="index"
                    draggable
                    :data-type="key"
                >
                    <i :class="item.icon"></i>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="center">
            <div class="view-content" @dragover="dragOver" @drop="drop">
                <Draggable v-model="view" draggable=".item" tag="ul">
                    <!--<ul>-->
                    <li v-for="(item, i) in view"
                        :key="item.id"
                        @click="showEdit(item.id)"
                        class="item" >
                        <div class="type" v-if="item.flag===1">{{item.type}}</div>
                        <component
                                :is="typeList[item.type]['component']"
                                :editData="item.data"
                                v-else
                        ></component>
                        <i @click="deleteItem(item.id)" class="el-icon-error"></i>
                    </li>
                    <!--</ul> -->
                </Draggable>
            </div>
        </div>
        <div class="right">
            <Edit
                    :data="props"
                    v-if="rightIsShow"
                    @dataChange="getData"
            />
        </div>
    </div>
</template>

<script>
    import Input from '../components/view/Input'
    import Button from '../components/view/Button'
    import Swipe from '../components/view/Swipe'
    import Edit from '../components/Edit'
    import Draggable from 'vuedraggable'
    export default {
        data() {
            return {
                typeList: {
                    'input': {
                        name: '输入框',
                        icon: 'el-icon-search',
                        component: Input
                    },
                    'button': {
                        name: '按钮',
                        icon: 'el-icon-thumb',
                        component: Button
                    },
                    'swipe': {
                        name: '轮播图',
                        icon: 'el-icon-picture-outline',
                        component: Swipe
                    }
                },
                view: [], //center中用于展示组件的数据
                type: '', //拖拽元素的类型
                isPush: false, //判断拖拽元素是否已添加到页面
                i: -1, //临时变量，拖拽时记录组件的id值，方便释放时删除flag属性

                props: {}, //被点击组件的所有信息，用于传给‘修改组件属性值的组件’
                rightIsShow: false,  //用于控制右边栏的显示与隐藏

                index: -1, //临时记录页面正在修改的组件的id值

                id: 0 //给每一个组件定义一个唯一索引，每次递增
            }
        },
        methods: {
            dragStart(e){
                this.type = e.target.dataset.type //拖拽元素的类型
                // console.log(this.type)
            },
            dragOver(e){ //拖拽过程触发
                //如果此时类型值为空，直接return，没有这一步操作的话，在center中移动，也会触发，甚至新建一个type为null的组件
                if (!this.type) {
                    return
                }
                e.preventDefault()
                if(!this.isPush) {  //判断如果还没添加进去的话...
                    let defaultData = {
                        id: this.id++,  // 给每一个组件定义一个唯一索引
                        type: this.type,  // 组件类型
                        data: {},  // 组件数据，默认为空
                        flag: 1 ////临时变量，拖拽时给组件附上该属性，释放时删除该属性
                    }
                    this.i = defaultData.id  //方便释放时找到flag属性，并删除
                    // console.log(this.i)
                    this.view.push(defaultData)
                    this.isPush = true  //表示元素已添加
                }
            },
            drop(e){  //拖拽结束，鼠标释放
                if (!this.type) {  //如果此时类型值为空，直接return
                    return
                }
                e.preventDefault()
                // 删除组件的flag属性
                this.$delete(this.view.filter(item=>item.id===this.i)[0], 'flag')
                // this.$delete(this.view[this.i], 'flag')
                // 拖拽结束，isPush和type都置为初始值
                this.isPush = false
                this.type = null
                // console.log(this.view)
            },
            showEdit(id){
                this.index = id  //点击组件，记录当前点击组件的id值
                this.rightIsShow = false
                //将该组件的值赋给props，传给子组件
                this.props = this.view.filter(item=>item.id===id)[0]
                // console.log(this.props)
                this.$nextTick(()=>{
                    this.rightIsShow = true //在dom更新后改变rightIsShow，可刷新页面
                })
            },
            getData(data){
                // 接受孙组件，例如：ButtonEdit.vue 中的组件data值，并根据索引index赋给view中对应的data属性，可以传给子组件Button.vue
                this.view.filter(item=>item.id===this.index)[0].data = data
                // console.log(this.view)
            },
            deleteItem(id){
                this.view = this.view.filter(item => item.id !== id)
                this.rightIsShow = false
                this.props = {}
            }
        },
        components: {
            Draggable,
            Edit,
            Input,
            Button,
            Swipe,
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        position: relative;
        .left, .center, .right {
            flex: 1;
            height: 100%;
            padding: 15px 0;
            background: #fff;
        }
        .left {
            ul{
                margin: 0;
                padding: 0;
                li{
                    width: 100px;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    font-size: 16px;
                    color: #666;
                    float: left;
                    margin: 0 10px;
                    border-radius: 6px;
                    cursor: pointer;
                    &:hover{
                        background: #efefef;
                    }
                    i{
                        display: block;
                        font-size: 30px;
                        margin-bottom: 8px;
                        color: #999;
                    }
                    p{
                        display: block;
                        margin: 0;
                        font-size: 14px;
                    }
                }
            }
        }
        .center {
            width: 450px;
            height: 580px;
            background: #eee;
            .view-content {
                width: 100%;
                height: 100%;
                overflow: auto;
                position: relative;
                .item {
                    position: relative;
                    .type {
                        width: 100%;
                        line-height: 20px;
                        text-align: center;
                        background-color: #deedff;
                        font-size: 12px;
                        color: #666;
                    }
                    .el-icon-error {
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                }

            }
        }
    }
</style>