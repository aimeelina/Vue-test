<template>
    <div>
      <span>系统通知</span>
        <el-table
      :data="systemMessages"
      border
      style="width: 100%">
      <el-table-column
        prop="systemUserName"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="systemMessageshandleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size= systemMessagesPageSize
        :total=totalsystemMessages
        @current-change="systemMessagesPage">
    </el-pagination>
    <span>私信</span>
    <el-table
      :data="conversations"
      border
      style="width: 100%">
      <el-table-column
        prop="targetUserName"
        label="姓名2"
        >
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容2"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="conversationhandleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size= conversationsPageSize
        :total=totalConversations
        @current-change="conversationPage">
    </el-pagination>
    </div>
    
  </template>
  
  <script>
  import request from "@/utils/request";
    export default {
        name:'MessageList',
        methods: {
            conversationhandleClick(row) {
            console.log(row);
            },
            conversationPage(currentPage){
              alert(currentPage)
              const _this=this
              var offset=(currentPage-1)*10
              request.get("/getConversations/"+offset+'/5',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("Result from /getConversations:",res)
                if(res.data.code===200){
                  

                }
                else {
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })
            },

            systemMessageshandleClick(row) {
            console.log(row);
            },
            systemMessagesPage(currentPage){
              alert(currentPage)
              const _this=this
              var offset=(currentPage-1)*10
              request.get("/getSystemMessages/"+offset+'/5',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("Result from /getConversations:",res)
                if(res.data.code===200){

                }
                else {
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })
            },

        },
        created(){
          request.get("/getConversations/0/5",{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("Conversations:",res)
                if(res.data.code===200){
                  this.totalConversations=res.data.data.totalNum
                  if(this.totalConversations>5){
                    this.conversationsPageSize=5
                  }
                  else{
                    this.conversationsPageSize=this.totalConversations
                  }
                  for(let i=0;i<res.data.data.conversations.length;i++){
                    var obj = {
                      targetUserName: res.data.data.conversations[i].targetUserName,
                      content: res.data.data.conversations[i].Conversation.content
                      }
                    //console.log("obj_",i,":",obj)
                    this.conversations.push(obj)
                  }
    
                }
                else {
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })

              request.get("/getSystemMessages/0/5",{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("SystemMessages:",res)
                if(res.data.code===200){
                  this.totalsystemMessages=res.data.data.totalNum
                  if(this.totalsystemMessages>5){
                    this.systemMessagesPageSize=5
                  }
                  else{
                    this.systemMessagesPageSize=this.totalsystemMessages
                  }
                  for(let i=0;i<res.data.data.messages.length;i++){
                    var obj = {
                      systemUserName: res.data.data.messages[i].courseName,
                      content: res.data.data.messages[i].text
                      }
                    //console.log("obj_",i,":",obj)
                    this.systemMessages.push(obj)
                  }
    
                }
                else {
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })
        },
        data() {
            return {
              conversations : [],
              systemMessages:[],
              totalConversations:0,
              totalsystemMessages:0,
              conversationsPageSize :0,
              systemMessagesPageSize:0,
              

            }
        }
    }
  </script>