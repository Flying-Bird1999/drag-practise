<template>
    <div class="container">
        <div class="left">
            <ul @dragstart="dragStart" @dragend="dragEnd">
                <li v-for="(item, key, index) in typeList"
                    :key="index"
                    draggable
                    :data-type="key" >
                    <i :class="item.icon"></i>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="center">
            <div class="view-content" @dragover="dragOver" @drop="drop">
                <Draggable v-model="view"
                           draggable=".item"
                           tag="ul"
                           animation="300" >
                    <transition-group>
                        <li v-for="(item, i) in view"
                            :key="item.id"
                            :data-id="item.id"
                            @click="showEdit(item.id)"
                            @mouseenter="item.isDelete=true"
                            @mouseleave="item.isDelete=false"
                            class="item" >
                            <div class="type" v-if="item.flag&&item.flag===1">
                                {{item.type}}
                            </div>
                            <component :is="typeList[item.type]['component']"
                                       :editData="item.data"
                                       v-else >
                            </component>
                            <i v-show="item.isDelete"
                               @click="deleteItem(item.id)"
                               class="el-icon-delete">
                            </i>
                        </li>
                    </transition-group>
                </Draggable>
            </div>
        </div>
        <div class="right">
            <Edit :data="props"
                  v-if="rightIsShow"
                  @dataChange="getData"
            />
        </div>
    </div>
</template>

<script>
    import Edit from '../components/edit'
    import Input from '../components/view/Input'
    import Button from '../components/view/Button'
    import Swipe from '../components/view/Swipe'
    import Rate from '../components/view/Rate'
    import Draggable from 'vuedraggable'
    import {indexList} from '../utils/data'  //把typeList提出去
    export default {
        components: {
            Draggable, Edit, Input, Button, Swipe, Rate
        },
        data() {
            return {
                typeList: indexList,
                view: [], //center中用于展示组件的数据
                type: '', //拖拽元素的类型
                isPush: false, //判断拖拽元素是否已添加到页面
                i: -1, //临时变量，拖拽时记录组件的id值，方便释放时删除flag属性

                props: {}, //被点击组件的所有信息，用于传给‘修改组件属性值的组件’
                rightIsShow: false,  //用于控制右边栏的显示与隐藏

                index: -1, //临时变量，点击组件时记录页面正在修改的组件的id值

                id: 0, //给每一个组件定义一个唯一的id索引，每次递增
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
                e.stopPropagation()
                let className = e.target.className
                let defaultData
                if(!this.isPush) {
                    defaultData = {
                        id: this.id++,  // 给每一个组件定义一个唯一索引
                        type: this.type,  // 组件类型
                        data: {},  // 组件数据，默认为空
                        flag: 1, ////临时变量，拖拽时给组件附上该属性，释放时删除该属性
                        isDelete: false //控制删除图标的显示与隐藏
                    }
                }
                // 在空白处添加组件
                if(className === 'view-content') {
                    if(!this.isPush) {  //判断如果还没添加进去的话...
                        this.i = defaultData.id  //方便释放时找到flag属性，并删除
                        this.view.push(defaultData)
                        this.isPush = true  //表示元素已添加
                    }
                }else {
                    let target = e.target
                    // 分别获取鼠标在元素的垂直距离、元素的高度、元素的id值
                    let [ y, h, curId ] = [ e.offsetY, target.offsetHeight, target.dataset.id ]
                    // 返回布尔值，true表示位于元素的上半部分，false表示在下半部分
                    let direction = y < (h / 2)
                    // 将view中的id值提取出为一个数组，方便取出id值
                    let idArr = this.view.map(item => item.id)
                    if(!this.isPush) {
                        if(direction) { // 判断在元素的上半部分
                            let curIndex = idArr.findIndex(id => id==curId)
                            this.i = defaultData.id
                            this.view.splice(curIndex, 0, defaultData)
                        }else { // 判断在元素的下半部分
                            let curIndex = idArr.findIndex(id => id==curId)
                            this.i = defaultData.id
                            this.view.splice(curIndex+1, 0, defaultData)
                        }
                    } else {
                        // 元素在视图上移动的情况
                        if (direction) {
                            // 求出鼠标所在组件在view数组中的索引
                            let curIndex = idArr.findIndex(id => id==curId)
                            // 求出拖拽组件的索引，由于在上边，所以减1，如果为0置为0
                            let index = curIndex == 0 ? 0 : curIndex - 1
                            // 移动过程中如果位置与初始位置一样，直接跳出，无需改变
                            let result = this.view[index]['flag'] == 1
                            if(result) return;
                            // 求出拖拽组件初始在数组中的索引值，并在数组中移除顺便保存下来
                            let tempIndex = idArr.findIndex(id => id==this.i)
                            let temp = this.view.splice(tempIndex, 1)
                            // 在最终鼠标坐在的索引前边添加移除组件数据
                            this.view.splice(curIndex, 0, temp[0])
                        } else {
                            // 元素在视图下移动的情况，思路同上
                            let curIndex = idArr.findIndex(id => id==curId)
                            let index = curIndex + 1
                            let result = this.view.length>index && this.view[index]['flag'] == 1
                            if(result) return;
                            let tempIndex = idArr.findIndex(id => id==this.i)
                            let temp = this.view.splice(tempIndex, 1)
                            this.view.splice(curIndex, 0, temp[0])
                        }
                    }
                    // 添加结束，将isPush设置为true
                    this.isPush = true
                }
            },
            // 该方法不管拖拽有无在指定容器内释放都会触发
            dragEnd(){
                // 删除组件的flag属性
                this.$delete(this.view.filter(item=>item.id===this.i)[0], 'flag')
                // 拖拽结束，isPush和type都置为初始值
                this.isPush = false
                this.type = null
            },
            drop(e){  // 拖拽到指定位置
                if (!this.type) {  //如果此时类型值为空，直接return
                    return
                }
                e.preventDefault()
                this.dragEnd()
                console.log(this.view)
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
            }
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
            height: 640px;
            ul{
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: space-around;
                li{
                    width: 85px;
                    height: 85px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    font-size: 16px;
                    color: #666;
                    border-radius: 6px;
                    cursor: move;
                    &:hover{
                        background: #efefef;
                    }
                    i{
                        display: block;
                        font-size: 26px;
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
            margin-top: 30px;
            padding: 0;
            width: 500px;
            height: 640px;
            background: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            .view-content {
                box-sizing: border-box;
                background: #fff;
                width: 460px;
                height: 600px;
                border-radius: 6px;
                overflow: auto;
                position: relative;
                .item {
                    z-index: 9999;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    position: relative;
                    border-bottom: 2px dotted #80BBF8;
                    border-left: 2px dotted #80BBF8;
                    border-right: 2px dotted #80BBF8;
                    &:first-child {
                        border-top: 2px dotted #80BBF8;
                    }
                    &:hover {
                        cursor: move;
                        border: 2px solid #63ABF7;
                    }
                    /* 使得只有 .item 能够获得焦点 */
                    div{
                        pointer-events: none;
                    }
                    .type {
                        width: 100%;
                        line-height: 20px;
                        text-align: center;
                        background-color: #deedff;
                        font-size: 12px;
                        color: #666;
                    }
                    .el-icon-delete {
                        width: 30px;
                        line-height: 30px;
                        background-color: #fff;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 16px;
                        color: #676769;
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>