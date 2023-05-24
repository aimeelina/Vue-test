<template>
  <el-container>
    <el-main>
      <div class="header">注册 </div>
      <el-form ref="User" :model="User" label-width="80px" :rules="rules">
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="User.email" placeholder="邮箱" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="User.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="User.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="10px">
            <el-button type="primary" class="el-button--register" @click="register" style="width: 100%; height: 45px">注   册</el-button>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-button type="primary" @click="login" style="width: 100%; height: 45px">登   录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RegisterPage",
  data() {
    const checkID = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入用户名'));
      } else {
          callback();
      }
      // if (!value) {
      //   return callback(new Error('学号不能为空'));
      // }
      // let regPos = /[0-9]/;
      // if (!regPos.test(value)) {
      //   callback(new Error('请输入学号'));
      // } else {
      //   if (value.length !== 12) {
      //     callback(new Error('学号必须为12位'));
      //   } else {
      //     callback();
      //   }
      // }
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const checkEmail = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入邮箱'));
        } else {
            callback();
        }
    };
    return {
      isLogin: false,
      User: {
        name: '张三',
        password: '1233456',
        email: '841213768@qq.com'
      },
      loginDialog: false,
      rules: {
        username: [
          {validator: checkID, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
        email: [
            {validator: checkEmail, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
        request.post("/register", this.User,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            console.log("result:",res)
            // if (res.code === 200) {
            //   this.$router.push('/home');
            // } else {
            //   this.$message({
            //     type: "error",
            //     message: "登陆失败"
            //   })
            // }
        })
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
.el-button--register {
    border: 1px solid coral;
    background: coral;
}

.el-form-item {
  margin-bottom: 1em;
  margin-top: 0em;
  label-width:40px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 180px;
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