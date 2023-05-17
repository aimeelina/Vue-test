<template>
    <div>
        <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="password"
        label="省份"
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
        :total="100"
        @current-change="page">
    </el-pagination>
    </div>
    
  </template>
  
  <script>
    export default {
        name:'userTable',
        methods: {
            handleClick(row) {
            console.log(row);
            },
            page(currentPage){
              alert(currentPage)
              const _this=this
              var offset=(currentPage-1)*3
              axios.get('http://localhost:8080/communityvue/usersJSON/'+offset+'/3').then(function(resp){
                console.log(resp)
                _this.tableData=resp.data
              })
            }
        },
        created(){
          
          
        },
        data() {
            return {
              tableData : null
            // tableData: [{
            //     username: '王小虎',
            //     password: '上海'
            // }, {
            //     username: '王小虎',
            //     password: '上海'
            // }, {
            //     username: '王小虎',
            //     password: '上海'
            // }, {
            //     username: '王小虎',
            //     password: '上海'
            // }]
            }
        }
    }
  </script>