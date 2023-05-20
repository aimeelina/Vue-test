<template>
  <el-container>
    <el-main>
      <div class="header">登录</div>
      <el-form ref="User" :model="User" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="id">
          <el-input v-model="User.name" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="User.password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="12">
          <el-input v-model="captchaText" placeholder="验证码" clearable></el-input>
          </el-col>
          <el-col :span="12">
          <el-image
                class="icon"
                style="width: 100px; height: 40px"
                :src="captchaUrl"
                :fit="fit"
                @click="getCode"></el-image>
          </el-col>
              
      </el-form-item>
        <el-form-item label-width="10px">
          <el-button type="primary" @click="login" style="width: 100%; height: 45px">登   录</el-button>
        </el-form-item>
        <el-form-item label-width="10px">
            <el-button type="primary" class="el-button--register" @click="register" style="width: 100%; height: 45px">注   册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import request from "@/utils/request";
 
export default {
  name: "LoginPage",
  data() {
    const checkID = (rule, value, callback) => {
      if (value=== '') {
        return callback(new Error('用户名不能为空'));
      }
      else {
          callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      captchaText: "",
      fit: 'fill',
      captchaUrl: "",
      isLogin: false,
      User: {
          name: '',
          password: ''
      },
      loginDialog: false,
      rules: {
        id: [
          {validator: checkID, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ],
      }
    }
  },
  created(){
    this.getCode()
  },
  methods: {
    login() {
      console.log("this.User:",this.User)
      //下方为校验登录的逻辑
      request.post("/login", {
        username: this.User.name,
        password: this.User.password,
        code: this.captchaText
      },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        console.log("userdatas:",res)
        if(res.data.code===200){
          sessionStorage.setItem('authorities', JSON.stringify('[]'))
          this.$router.push('/home');
        }
        else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
      //this.$router.push('/home');
    },
      register() {
          this.$router.push('/register')
      },
      getCode() { //点击的时候就图片就请求 图片就换了
        let _this=this
        request.get("/login/getKaptcha", this.User).then(res => {
          _this.captchaUrl = 'data:image/png;base64,' + res.data.data
          console.log("Kaptcha:",_this.captchaUrl)
      })
        // getCodeImg().then((res) => {
        //   if (res.state == 200) {
        //     this.codeUrl = res.data.img;
        //     //this.codeUrl = "data:image/gif;base64," + res.data.img; //
        //   }
        //   //这边我简单判断了下 根据自己需求 进行判断 catch...啥的
        // }
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