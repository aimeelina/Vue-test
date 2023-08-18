<template>
  <el-menu :default-active="'activeIndex'" router class="el-menu-demo" style="border-bottom-color: #5c5e63;" mode="horizontal"
           @select="" background-color="#37373c" active-text-color="#f6f4ef" text-color="rgb(184 184 184)">
    <el-menu-item disabled style="float: left; opacity: 1; cursor: auto; font-size: 20px">AI课堂</el-menu-item>

    <!-- <el-menu-item disabled style="opacity: 1; cursor: auto">{{ User.name }}, {{ User.id }}</el-menu-item> -->

    <el-menu-item disabled style="opacity: 1; cursor: auto">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ User.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="setting">账号设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item>
      <div>
          <el-image
            style="width: 40px; height: 40px"
            :src="User.headerURL"
            :fit="fit"></el-image>
      </div>
      <!-- <el-button size="medium" :style="iconStyle()" circle></el-button> -->
    </el-menu-item>
    <el-menu-item index="personal">个人情况</el-menu-item>
    <el-menu-item index="ranking">班级排名</el-menu-item>
    
    <el-menu-item index="gragh">每周题数</el-menu-item>
    
    <!-- <el-menu-item index="/answer">答题界面</el-menu-item> -->
    <el-menu-item index="main">知识图谱</el-menu-item>
  </el-menu>

  <!--  </el-col>-->
  <!--</el-row>-->
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CoursePageHeader",
  data() {
    // const checkID = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('学号不能为空'));
    //   }
    //   let regPos = /[0-9]/;
    //   if (!regPos.test(value)) {
    //     callback(new Error('请输入学号'));
    //   } else {
    //     if (value.length !== 12) {
    //       callback(new Error('学号必须为12位'));
    //     } else {
    //       callback();
    //     }
    //   }
    // };
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      activeIndex: 'this.$router.path',
      isLogin: false,
      User: {
        name: '',
        headerURL:''
      },
      loginDialog: false,
      fit: 'fill'
      // rules: {
      //   id: [
      //     {validator: checkID, trigger: 'blur'}
      //   ],
      //   password: [
      //     {validator: validatePass, trigger: 'blur'}
      //   ],
      // }
    }
  },
  created(){
    let _this=this
    request.get("/userInfo").then(res => {
        // console.log("gotuserInfo")
        // console.log(res)
        this.User.name=res.data.data.username
        this.User.headerURL=res.data.data.headerUrl
      })
  },
  methods: {
    logout() {
      request.get("/logout").then(res => {
        console.log("logout")
        console.log(res)
        this.$router.push('/login');

      })
    },
    setting(){
      this.$router.push('/home/userSetting');
    },

  }
}
</script>

<style scoped>



.el-menu-demo {
  padding-right: 5%;
  padding-left: 10%;
}

.el-menu--horizontal > .el-menu-item {
  float: right;
  font-size: 16px;
  padding-left: 15px;
  padding-right: 15px;
}

</style>