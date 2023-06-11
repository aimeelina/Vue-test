<template>
    <div>
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

        <!-- 如果questionType 等于0 那么他是单选题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 0" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-radio-group v-model="ruleForm.resource[index]">
                <el-radio label="A">{{ item.optionA }}</el-radio>
                <el-radio label="B">{{ item.optionB }}</el-radio>
                <el-radio label="C">{{ item.optionC }}</el-radio>
                <el-radio label="D">{{ item.optionD }}</el-radio>
            </el-radio-group>
            </el-form-item>
        </div>
        <!-- 如果questionType 等于1 那么他是多选题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 1" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-checkbox-group
                @input="change($event)"
                v-model="ruleForm.resource[index]"
            >
                <el-checkbox label="A">{{ item.optionA }}</el-checkbox>
                <el-checkbox label="B">{{ item.optionB }}</el-checkbox>
                <el-checkbox label="C">{{ item.optionC }}</el-checkbox>
                <el-checkbox label="D">{{ item.optionD }}</el-checkbox>
                <!-- <el-checkbox label="F">{{ item.stSelectf }}</el-checkbox> -->
            </el-checkbox-group>
            </el-form-item>
        </div>
        
        <!-- 如果questionType 等于2 那么他是判断题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
        <div v-if="item.type == 2" class="VSTD_box_item_select">
            <el-form-item label="" prop="resource">
            <el-radio-group v-model="ruleForm.resource[index]">
                <el-radio label="True"></el-radio>
                <el-radio label="False"></el-radio>
            </el-radio-group>
            </el-form-item>
        </div>
        
        </div>

        <!-- 提交函数  -->
        
        <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
        >
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
        courseId:1,
        chapterId:1,
        subChapterId:1,
        fit: 'fill',
        ruleForm: {
            resource: [],	//每一道题的值
        },
        question: [
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
            },
            {
                id:2,
                questionId:2,
                question:"我是题干2",
                optionA:"2a",
                optionB:"2b",
                optionC:"2c",
                optionD:"2d",
                type:0,
                imgUrl:""
            }
            ,
            {
                id:3,
                questionId:3,
                question:"我是题干3",
                optionA:"3a",
                optionB:"3b",
                optionC:"3c",
                optionD:"3d",
                type:1,
                imgUrl:""
            },
            {
                id:4,
                questionId:4,
                question:"我是题干4",
                optionA:"",
                optionB:"",
                optionC:"",
                optionD:"",
                type:2,
                imgUrl:""
            } ,
            {
                id:5,
                questionId:5,
                question:"我是题干6",
                optionA:"3a",
                optionB:"3b",
                optionC:"3c",
                optionD:"3d",
                type:1,
                imgUrl:""
            },
        ],
        rules: {

      }
    }
  },
  created(){
    // this.getCode()
    this.getExercises();
    for (let i = 0; i < this.question.length; i++) {
            
            //如果他是多选题的话，把它初始化为一个数组，而不是普通的字符串
            
          if (this.question[i].type == 1) {
            this.ruleForm.resource[i] = []
          }else{
            this.ruleForm.resource[i] = ''
          
        }
      }
      console.log("this.question",this.question)
  },
  methods: {
    getExercises(){
        let _this=this
        request.get("/getExercise/"+this.courseId+"/"+this.chapterId+"/"+this.subChapterId,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
        console.log("userdatas:",res)
        if(res.data.code===200){
            _this.question=res.data.data
            console.log("res.data.data",res.data.data)
            console.log("_this.question",_this.question)//要研究如何让这里加载完了才渲染
        }
        else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
      console.log("getExercises  this.question",this.question)
    },
    change(e) {
    //   this.$forceUpdate()
      console.log(this.ruleForm.resource)
    },
    submitForm(formName) {
        // this.$refs[formName].validate((valid) => {			
        // if (valid) {
        // var arr = []
        // var that = this
        // var b = this.ruleForm.resource.notempty()
        // if (b.length !== this.questionArrText.length) {	

        //     //要是有未答的题目走if

        //     this.$confirm(
        //     '检测到您有未答完的题目，，是否确认提交试卷？',
        //     '确认信息',
        //     {
        //         distinguishCancelAndClose: true,
        //         confirmButtonText: '确认',
        //         cancelButtonText: '取消',
        //     }
        //     )
        //     .then(() => {			
                    
            
        //         for (var i = 0; i < this.questionArrText.length; i++) {
        //             var json = {}
        //             json.id = that.questionArrText[i].id
        //             //如果是数组（也就是多选题），那么就用join把他换为字符串
        //             if (that.ruleForm.resource[i] instanceof Array) {
        //                 json.text = that.ruleForm.resource[i].join()
        //             } else {
        //                 json.text = that.ruleForm.resource[i]
        //             }
        //             //如果这个题没答，那么就把他重置为空串，而不是给后端一个 undefined 字符串
        //             if (json.text == undefined) {
        //                 json.text = ''
        //             }
        //             json.isJD = this.questionArrText[i].questionType

        //             arr.push(json)
        //         }

        //         var obj = {
        //         djPaperid: this.id,
        //         djStarttime: this.djStarttime,
        //         djAnswers: JSON.stringify(arr),
        //         }
        //         //请求的接口
        //         // msgApi
        //         // .answers(obj)
        //         // .then((res) => {
        //         //     if (res.data.code == 200) {
        //         //     //console.log(res)
        //         //     this.dialogVisible = true
        //         //     this.score = res.data.returnObject
        //         //     }
        //         // })
        //         // .catch((err) => {})
        //     })
        //     .catch((action) => {})
        // } else {													

        //     //如果都答了，就走else 

        //     for (var i = 0; i < this.questionArrText.length; i++) {
        //     var json = {}
        //     json.id = that.questionArrText[i].id
        //     if (that.ruleForm.resource[i] instanceof Array) {
        //         json.text = that.ruleForm.resource[i].join()
        //     } else {
        //         json.text = that.ruleForm.resource[i]
        //     }

        //     json.isJD = this.questionArrText[i].questionType

        //     arr.push(json)
        //     }

        //     var obj = {
        //     djPaperid: this.id,
        //     djStarttime: this.djStarttime,
        //     djAnswers: JSON.stringify(arr),
        //     }
        //     msgApi
        //     .answers(obj)
        //     .then((res) => {
        //         if (res.data.code == 200) {
        //         //console.log(res)
        //         this.dialogVisible = true
        //         this.score = res.data.returnObject
        //         // this.$message.success(res.data.returnObject)
        //         }
        //     })
        //     .catch((err) => {})
        // }
        // } else {
        // //console.log('error submit!!')
        // return false
        // }
    // }
    // )
      
    },

  }
}
</script>