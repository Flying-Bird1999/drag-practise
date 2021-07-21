<template>
    <div>
        <el-upload
                class="upload-demo"
                :http-request="addFiles"
                multiple
                :limit="9"
                action="http://localhost:3000/admin/index/addBanners">
            <el-button type="primary" plain>点击上传轮播图</el-button>
        </el-upload>
        <p>纵向滚动</p>
        <el-switch
                v-model="SwipeData.vertical"
                @change="dataChange">
        </el-switch>
        <p>循环播放</p>
        <el-switch
                v-model="SwipeData.loop"
                @change="dataChange">
        </el-switch>
        <p>是否显示指示器</p>
        <el-switch
                v-model="SwipeData.showIndicators"
                @change="dataChange">
        </el-switch>
        <p>指示器颜色选择</p>
        <el-color-picker v-model="SwipeData.indicatorColor" size="small"></el-color-picker>
        <p>轮播时间间隔</p>
        <el-input-number
                v-model="SwipeData.autoPlay"
                @change="dataChange">
        </el-input-number>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                SwipeData: {
                    images: [],
                    vertical: false,
                    loop: true,
                    showIndicators: false,
                    indicatorColor: '#409EFF',
                    autoPlay: 2000
                },

            }
        },
        props: ['childData'], //接收父组件的值
        mounted(){
            if(JSON.stringify(this.childData)==='{}') {
                return
            }
            // console.log(this.childData)
            this.SwipeData = this.childData
        },
        methods: {
            dataChange() {
                this.$emit('dataChange', this.SwipeData)
            },
            addFiles(params){
                let imageUrl = URL.createObjectURL(params.file)
                this.SwipeData.images.push(imageUrl)
                this.dataChange()
            }
        }
    }
</script>

<style scoped lang="scss">

</style>