<template>
    <!-- <div class="demo-image">
        <div class="block" v-for="(item, index) in courses" :key="item.id">
            <span class="demonstration">{{ item.courseName }}</span>
            <el-image
            style="width: 100px; height: 100px"
            :src="item.imgUrl"
            :fit="fit"></el-image>
        </div>
    </div> -->
    <div class="images">
      <div v-for="(item, index) in courses" :key="index" class="image-middle">  
        <el-card shadow="hover" :body-style="{ padding: '10px' }" @click.native="clickCourse(item)">    
        <el-image :src="item.imgUrl" class="image"/>
        <!-- <el-popover>  -->
        <!-- <img :src="item.imgUrl" slot="reference" class="image"/>     -->
        <!-- <img :src="item.imgUrl" class="imagePreview"/> -->
        <!-- </el-popover>   -->
        <div style="text-align:center;padding-top:12px">
        <span>{{item.courseName}}</span>   
        </div>     
        </el-card>
      
      </div>     
    </div>  

</template>

<script>
  export default {
    data() {
      return {
        courses: [
            {
                id:1,
                courseId:1,
                imgUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                courseName:"语文"
            },
            {
                id:2,
                courseId:1,
                imgUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                courseName:"数学"
            },
            {
                id:3,
                courseId:1,
                imgUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                courseName:"英语"
            }
        ],
        fit: 'fill',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    methods: {
        clickCourse(item){
            console.log("点击了课程：",item)
        }
  }
  }
</script>

<style scoped>
/* “Tissue Search”字体样式 */
.position {
 margin-left: 15px;
 font-size: 30px;
 font-weight: 600;
}
/* 图片总布局，样式 */
.images{
 display: flex;
 margin-top: 20px;
 margin-left: 21px;
 margin-right: 20px;
 flex-wrap: wrap;
}
/* 图片之间 */
.image-middle{
 margin-right: 15px;
 margin-bottom: 15px;
}
/* 单张图片样式 */
.image{
 width:200px;
 height: 200px;
}
</style>
