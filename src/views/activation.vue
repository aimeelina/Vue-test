<template>
    <div>
        <div class="header">
        {{Msg}}
        </div>
        <div class="header">
        将在{{count}}秒后跳转至登录页面
        </div>
    </div>
    
</template>

<script>
export default {
    name:'activation',
    methods: {
        checkActivation() {
            let _this=this
          axios.get('http://localhost:8080/communityvue/activation/'+this.$route.params.id+'/'+this.$route.params.activationCode).then(function(resp){
            console.log(resp)
            _this.Msg=resp.data.message
            _this.startDivi()
          })
        },

        startDivi(){
        const TIME_COUNT = 5;
        if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push({
                    path: '/login'
                });
            }
          },1000)
        }
    }
    },
    created(){
        this.checkActivation()
    },
    data() {
        return {
          Msg:"激活中……",
          count:"",//倒计时
        }
    }
}
</script>

<style scoped>
.header {
    top:50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    position: relative;
    height: 120px;
}
</style>