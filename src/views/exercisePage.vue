<template>
    <div>
      <span>习题</span>
        <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        >
        <!-- 循环后端给你的所有题 -->
        <div
        class="VSTD_box_item"
        v-for="(item, index) in question"
        :key="item.id"
        >

        <!-- 0 单选 -->
        <!-- 2 判断 -->
        <!-- 1 多选 -->

        <div class="VSTD_box_item_title">
        
        <!-- 题目的信息 -->
        
            <p style="font-weight: 700">
            {{ index + 1 }}.{{ item.question
            }}
            <span v-if="item.type == 0">（单选）</span>
            <span v-if="item.type == 1">（多选）</span>
            <span v-if="item.type == 2">（判断）</span>
            </p>
        </div>

        <div v-if="item.imgUrl" class="demo-image">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.imgUrl"
            fit="fit"></el-image>
      </div>

        <!-- 如果questionType 等于0 那么他是单选题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 0" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-radio-group v-model="ruleForm.resource[index]">
                <el-radio :disabled="answered" label="A">{{ item.optionA }}</el-radio>
                <el-radio :disabled="answered" label="B">{{ item.optionB }}</el-radio>
                <el-radio :disabled="answered" label="C">{{ item.optionC }}</el-radio>
                <el-radio :disabled="answered" label="D">{{ item.optionD }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <span v-if="answered&&item.correct" style="color: green">正确答案:{{ item.correctAnswers }}</span>
            <span v-if="answered&& !item.correct" style="color: red">正确答案:{{ item.correctAnswers }}</span>
          </div>
        <!-- 如果questionType 等于1 那么他是多选题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 1" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-checkbox-group
                @input="change($event)"
                v-model="ruleForm.resource[index]"
            >
                <el-checkbox :disabled="answered" label="A" >{{ item.optionA }}</el-checkbox>
                <el-checkbox :disabled="answered" label="B">{{ item.optionB }}</el-checkbox>
                <el-checkbox :disabled="answered" label="C">{{ item.optionC }}</el-checkbox>
                <el-checkbox :disabled="answered" label="D">{{ item.optionD }}</el-checkbox>
                <!-- <el-checkbox label="F">{{ item.stSelectf }}</el-checkbox> -->
            </el-checkbox-group>
            </el-form-item>
            <span v-if="answered&&item.correct" style="color: green">正确答案:{{ item.correctAnswers }}</span>
            <span v-if="answered&& !item.correct" style="color: red">正确答案:{{ item.correctAnswers }}</span>
        </div>
        
        <!-- 如果questionType 等于2 那么他是判断题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 2" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-radio-group v-model="ruleForm.resource[index]">
                <el-radio :disabled="answered" label="True"></el-radio>
                <el-radio :disabled="answered" label="False"></el-radio>
            </el-radio-group>
            </el-form-item>
            <span v-if="answered&&item.correct" style="color: green">正确答案:{{ item.correctAnswers }}</span>
            <span v-if="answered&& !item.correct" style="color: red">正确答案:{{ item.correctAnswers }}</span>
        </div>
        
        </div>

        <!-- 提交函数  -->
        
        <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button type="primary" @click="goback()">返回</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "ExercisePage",
  data() {
    return {
      answered:false,
        courseId:4,
        chapterId:1,
        subChapterId:1,
        fit: 'fill',
        ruleForm: {
            resource: [],	//每一道题的值
        },
        question: [],
        rules: {

      },
      questionArrText: [],	
      exerciseDisplayDemo: [
            {
                id:1,
                questionId:1,
                question:"我是题干1",
                optionA:"1a",
                optionB:"1b",
                optionC:"1c",
                optionD:"1d",
                type:0,
                imgUrl:""
            }
        ],      
        exerciseAnswerDemo: [
            {
                exerciseId:1,
                ans:1,
            }
        ],
    }
  },
  created(){
    // this.getCode()
    console.log("exercisePage created")
    this.getExercises();
  },
  methods: {
    goback(){
      this.$router.back()
    },
    getExercises(){
        request.get("/getExercise/"+this.$route.params.courseId+"/"+this.$route.params.chapterId+"/"+this.$route.params.subChapterId,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        //console.log("userdatas:",res)
        if(res.data.code===200){
            this.question=res.data.data
            console.log("this.question",this.question)
            for(let i=0;i<this.question.length;i++){
              var obj = {
                exerciseId: this.question[i].id,
                ans: 0,
                }
              this.questionArrText.push(obj)
            }
            for (let i = 0; i < this.question.length; i++) {
                  
                  //如果他是多选题的话，把它初始化为一个数组，而不是普通的字符串
                  
                if (this.question[i].type == 1) {
                  this.ruleForm.resource[i] = []
                }else{
                  this.ruleForm.resource[i] = ''
                
              }
            }
            //加上如果返回的结果有useransw就锁定答案
            if(this.question.length>0&&this.question[0].userAnswers!=null){
              //console.log("this.question[0].userAnswers",this.question[0].userAnswers)
              this.answered=true
              for(let i=0;i<this.question.length;i++){
                if(this.question[i].type!=1){
                  this.ruleForm.resource[i]=this.question[i].userAnswers
                }
                else{
                  this.ruleForm.resource[i]=this.question[i].userAnswers.split('')
                }
                
              }
            }
        }
        else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })


      request.get("/getScore/"+this.$route.params.courseId+"/"+this.$route.params.chapterId+"/"+this.$route.params.subChapterId,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        console.log("score:",res)
      })

    },
    change(e) {
    //   this.$forceUpdate()
      // console.log(this.ruleForm.resource)
    },
    submitForm() {			
      if(this.answered){
        this.$message({
            type: "error",
            message: "你已经提交过答案，请勿重复提交"
          })
          return
      }
      let that=this
      let ans=''
      for (var i = 0; i < this.questionArrText.length; i++) {
        //如果是多选
        if (that.ruleForm.resource[i] instanceof Array) {
          ans = that.ruleForm.resource[i].join('')
        } 
        //如果是单选或判断
        else {
          ans = that.ruleForm.resource[i]
        }
        //如果这个题没答，那么就把他重置为空串，而不是给后端一个 undefined 字符串
        if (ans== undefined) {
          ans = ''
        }
        //将答案转成int
        if(ans.indexOf('A')!=-1){
          this.questionArrText[i].ans+=1;
        }
        if(ans.indexOf('B')!=-1){
          this.questionArrText[i].ans+=2;
        }
        if(ans.indexOf('C')!=-1){
          this.questionArrText[i].ans+=4;
        }
        if(ans.indexOf('D')!=-1){
          this.questionArrText[i].ans+=8;
        }
        if(ans.indexOf('T')!=-1){
          this.questionArrText[i].ans+=1;
        }
        if(ans.indexOf('F')!=-1){
          this.questionArrText[i].ans+=2;
        }
      }
      console.log(this.questionArrText)
      request.post("/submitExercise", this.questionArrText,{headers: {'Content-Type': "application/json; charset=utf-8"}}).then(res => {
            console.log("result:",res)
            if (res.data.code === 200) {
              this.$router.go(0)
              this.$message.success(res.data.message)

            } else {
              this.$message({
                type: "error",
                message: res.data.message
              })
            }
        })
          }
      

  }
}
</script>
<style>
.el-checkbox__input.is-disabled + .el-checkbox__label {
    color: #606266 !important;
}
 
.el-checkbox__input.is-disabled.is-checked + .el-checkbox__label {
    color: #606266 !important;
}
 
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after {
    border-color: #606266 !important;
}
 
.el-radio__input.is-disabled + span.el-radio__label {
    color: #606266 !important;
}
 
.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #606266 !important;
}
 
.el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner {
    border-color: #606266 !important;
}
 
.el-input.is-disabled .el-input__inner, textarea:disabled {
    color: #606266 !important;
}
 
.el-range-editor.is-disabled input {
    color: #606266 !important;
}
</style>