<template>
  <el-container>
    <el-aside class="aside" >{{courseName}}</el-aside>
    <el-button type="primary" @click="changeChapter1" style="width: 100%; height: 45px;z-index: 2;">上一章</el-button>
    <el-button type="primary" @click="changeChapter2" style="width: 100%; height: 45px;z-index: 2;">下一章</el-button>
    <el-main style="z-index: 1">

      <!-- <HelloWorld /> -->
      <div class="editContainer">
      <el-drawer
      :title="text_data"
      :visible.sync="drawer"
      :direction="direction"
      :append-to-body="true"
      :modal="false"
      :modal-append-to-body="false"
      >
      <el-button type="primary" @click="clickExercise()">习题</el-button>
    </el-drawer>
    <div class="mindMapContainer" id="mindMapContainer"></div>
    </div>

    </el-main>
  </el-container>
</template>

<script>
import MindMap from 'simple-mind-map'
// import {getData, storeData, storeConfig} from '@/api'
import request from "@/utils/request";
import exampleData_python from "../data/exampleData_python"
import { simpleDeepClone } from 'simple-mind-map/src/utils/index'

export default {
  name: 'Main',
  data() {
    return {
      courseName: 'python',
      mindmapdata: null,
      drawer: false,
      direction: 'rtl',
      text_data:"...",
      subChapterId:1
    }
  },
  mounted() {
    console.log("mounted")
    this.getDataAndInit()
  },
  methods: {
    changeChapter1(){
      var target=parseInt(this.$route.params.chapterId)-1
      this.$router.push('/coursehome/'+this.$route.params.courseId+"/"+target);
      this.$router.go(0)
    },
    changeChapter2(){
      var target=parseInt(this.$route.params.chapterId)+1
      this.$router.push('/coursehome/'+this.$route.params.courseId+"/"+target);
      this.$router.go(0)
    },
    clickExercise(){
      console.log("this",this)
      this.$router.push('/exercise/'+this.$route.params.courseId+"/"+this.$route.params.chapterId+"/"+this.subChapterId);
    },
    getDataAndInit() {
      request.get("/getKnowledgeGraph/"+this.$route.params.courseId+"/"+this.$route.params.chapterId,{headers: {"Content-Type":"application/json"}}).then(res => {
          if(res.data.code===200){
              exampleData_python.root=res.data.data.root
              console.log("exampleData_python:",exampleData_python)
              this.mindMapData  = simpleDeepClone(exampleData_python)
              this.init()
          }
          else {
            this.$message({
              type: "error",
              message: res.data.message
            })
          }
        })
    },
    init() {
      let _this=this
      let {root, layout, theme, view} = this.mindMapData
      //console.log("this.mindMapData", this.mindMapData)
      this.mindMap = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: root,
        layout: layout,
        theme: 'classic',
        themeConfig: theme.config,
        viewData: view,
        readonly: true,
        initRootNodePosition:['left', 'center']
      });
      this.mindMap.on('node_click', (data) => {
        //console.log("node_click",data)
        // console.log("data.node.nodeData.data.ableToClick",data.node.nodeData.data.ableToClick)
        if(data.nodeData.data.ableToClick){
          _this.drawer = true
          _this.text_data=data.nodeData.data.text
          _this.subChapterId=data.nodeData.data.testID
        }
      });
      
    }
  }
}
</script>
<style scoped>
  .aside {
    padding-top: 2%;
    width: 8%;
    z-index: 2;
    font-size: 45px;
    color: lightgray;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
<style lang="less" scoped>

.courseName {
  position: relative;
  top: 5%;
  left: 5%;
  font-size: 40px;
}

.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #2c3e50;

  .mindMapContainer {
    // position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}

</style>