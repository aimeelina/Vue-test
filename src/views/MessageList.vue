<template>
    <div>
        <el-table
      :data="conversations"
      border
      style="width: 100%">
      <el-table-column
        prop="targetUserName"
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
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size= 5
        :total=total
        @current-change="page">
    </el-pagination>
    </div>
    
  </template>
  
  <script>
  import request from "@/utils/request";
    export default {
        name:'MessageList',
        methods: {
            handleClick(row) {
            console.log(row);
            },
            page(currentPage){
              alert(currentPage)
              const _this=this
              var offset=(currentPage-1)*10
              request.get("/getConversations/"+offset+'/10',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
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
          request.get("/getConversations/0/10",{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("Conversations:",res)
                if(res.data.code===200){
                  this.total=res.data.data.totalNum
                  for(let i=0;i<res.data.data.conversations.length;i++){
                    var obj = {
                      targetUserName: res.data.data.conversations[i].targetUserName,
                      content: res.data.data.conversations[i].Conversation.content
                      }
                    console.log("obj_",i,":",obj)
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
        },
        data() {
            return {
              conversations : [],
              total:0

            }
        }
    }
  </script>