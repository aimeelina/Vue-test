<template>
    <el-container>
        <el-button type="primary" @click="upload" style="width: 100%; height: 45px">上传知识图谱</el-button>
    </el-container>
  </template>
  
  <script>
  import request from "@/utils/request";
  import kg from "@/data/ch3_data"
   
  export default {
    name: "uploadKGPage",
    data() {
      return {
       
      }
    },
    created(){
      
    },
    methods: {
        upload() {
        request.post("/upload/knowledgeGraph", {
            knowledgeGraph: kg.knowledgeGraph,
            chapterId:kg.chapterId,
            courseId:kg.courseId
        },{headers: {"Content-Type":"application/json"}}).then(res => {
          console.log("res:",res)
          if(res.data.code===200){
          }
          else {
            this.$message({
              type: "error",
              message: res.data.message
            })
          }
        })
        //this.$router.push('/home');
      }
  
    }
  }
  </script>
  
  <style scoped>
  .header {
      text-align: center;
      font-size: 50px;
      color: #fafafa;
      position: relative;
      height: 120px;
  }
  /*.login {*/
  /*  position: absolute;*/
  /*  top: 50%;*/
  /*  left: 50%;*/
  /*  margin: -150px 0 0 -150px;*/
  /*  width:300px;*/
  /*  height:300px;*/
  /*}*/
  
  .el-form {
    width: 380px;
    margin: 8vh auto;
    padding: 3em 2em 1em 2em;
    background: #fafafa;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px, rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;
    font-size: 20px;
    border-radius: 10px;
  }
  
  .el-form-item {
    margin-bottom: 1em;
    margin-top: 0em;
  }
  
  .el-button--register {
      border: 1px solid coral;
      background: coral;
  }
  
  .icon{
      width: 6%;
      vertical-align:middle;
    }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    width: 50%;
    height: 100vh;
    /*background: #eee;*/
    -webkit-font-smoothing: antialiased;
  
    /*width: 100%;*/
    /*height:100%;*/
    font-family: 'Open Sans', sans-serif;
    background: #092756;
    background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
  }
  </style>