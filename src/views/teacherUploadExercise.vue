<template>
    <div>
<el-form ref="form" :model="form" label-width="80px">
    <el-row>
        <el-col :span="8">
            <el-form-item label="章节号">
                <el-input v-model="form.chapterId"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="小节号">
                <el-input v-model="form.subChapterId"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="题号">
                <el-input v-model="form.questionId"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
    <el-form-item label="题目">
      <el-input v-model="form.question"></el-input>
    </el-form-item>
    <el-form-item label="题目类型">
      <el-select  @input="change($event)" v-model="form.type" placeholder="请选择题目类型">
        <el-option label="单选题" value=0></el-option>
        <el-option label="多选题" value=1></el-option>
        <el-option label="判断题" value=2></el-option>
      </el-select>
    </el-form-item>
        
    <div v-if="form.type != 2">
        <el-form-item label="A选项">
        <el-input v-model="form.options[0]"></el-input>
        </el-form-item>
        <el-form-item label="B选项">
        <el-input v-model="form.options[1]"></el-input>
        </el-form-item>
        <el-form-item label="C选项">
        <el-input v-model="form.options[2]"></el-input>
        </el-form-item>
        <el-form-item label="D选项">
        <el-input v-model="form.options[3]"></el-input>
        </el-form-item>
    </div>
    <div v-if="form.type == 0" >
        <el-form-item label="正确答案" prop="resource">
            <el-radio-group v-model="form.answers">
                <el-radio label="A"></el-radio>
                <el-radio label="B"></el-radio>
                <el-radio label="C"></el-radio>
                <el-radio label="D"></el-radio>
            </el-radio-group>
            </el-form-item>
    </div>
        <!-- 如果questionType 等于1 那么他是多选题 -->
        <!-- 题目绑定的值是 ruleForm.resource[index]  -->
        
    <div v-if="form.type == 1" class="VSTD_box_item_select">
        <el-form-item label="正确答案" prop="resource">
        <el-checkbox-group v-model="form.answers">
            <el-checkbox label="A"></el-checkbox>
            <el-checkbox label="B"></el-checkbox>
            <el-checkbox label="C"></el-checkbox>
            <el-checkbox label="D"></el-checkbox>
            <!-- <el-checkbox label="F">{{ item.stSelectf }}</el-checkbox> -->
        </el-checkbox-group>
        </el-form-item>
    </div>
    
    <!-- 如果questionType 等于2 那么他是判断题 -->
    <!-- 题目绑定的值是 ruleForm.resource[index]  -->
    
    <div v-if="form.type == 2" class="VSTD_box_item_select">
        <el-form-item label="正确答案" prop="resource">
        <el-radio-group v-model="form.answers">
            <el-radio label="True"></el-radio>
            <el-radio label="False"></el-radio>
        </el-radio-group>
        </el-form-item>
    </div>
    <el-form-item label="上传图片" ref="uploadElement" >
            <el-input v-model="form.imgUrl" v-if="false"></el-input>
            <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    :show-file-list="false"
                    action="http://8.130.136.34:8080/communityvue/uploadExerciseImg"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handleAvatarChange"
                    :on-change="handleAvatarChange"
                    :on-success="handleAvatarSuccess"
                    :auto-upload="false"
                    :data="form">
                <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
    </el-form-item>
        <el-form-item style="text-align: center">
        <el-button type="primary" @click="onSubmit('form')"
            >提交</el-button
        >
        </el-form-item>
  </el-form>
    </div>
</template>
  <script>
  import request from "@/utils/request";
    export default {
        name: "TeacherUploadExercise",
        data() {
            return {
            form:{
                questionId:"",
                question:"",
                options:["","","",""],
                type:"",
                imgUrl:"",
                answers:"",
                chapterId:"",
                subChapterId:"",
            },
            question: {
                courseId:1,
                chapterId:"",
                subChapterId:"",
                questionId:"",
                question:"",
                options:"",//选项间用@分割
                answers:"",//6位二进制位,末位对应A或T，次末位对应B或F,依次类推
                type:"",//单选还是多选，0单选，1多选，2判断
                imgUrl:""
            }
            }
        },
        methods: {
            change(){
                console.log("改变了题目类型，运行change()")
                if (this.form.type == 1) {
                    this.form.answers = []
                }else{
                    this.form.answers = ''
                }
            },
            stringAnsToIntAns(){
                var StringAns=''
                //如果是多选
                if (this.form.answers instanceof Array) {
                    StringAns = this.form.answers.join('')
                } 
                //如果是单选或判断
                else {
                    StringAns = this.form.answers
                }
                //如果这个题没答，那么就把他重置为空串，而不是给后端一个 undefined 字符串
                if (StringAns== undefined) {
                    StringAns = ''
                }
                var intAns=0
                //将答案转成int
                if(StringAns.indexOf('A')!=-1){
                    intAns+=1;
                }
                if(StringAns.indexOf('B')!=-1){
                    intAns+=2;
                }
                if(StringAns.indexOf('C')!=-1){
                    intAns+=4;
                }
                if(StringAns.indexOf('D')!=-1){
                    intAns+=8;
                }
                if(StringAns.indexOf('T')!=-1){
                    intAns+=1;
                }
                if(StringAns.indexOf('F')!=-1){
                    intAns+=2;
                }
                console.log("intAns",intAns)
                return intAns
            },
            handlePictureCardPreview(file) {
                this.form.imgUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG= file.type === 'image/png';

                if (!isJPG&&!isPNG) {
                this.$message.error('上传头像图片只能是 JPG 格式或 PNG格式!');
                }
                return isJPG||isPNG;
            },
            handleAvatarChange (file) {
                this.form.imgUrl = URL.createObjectURL(file.raw);
            },
            onSubmit() {
                this.question.courseId=this.$route.params.courseId
                this.question.chapterId=this.form.chapterId
                this.question.subChapterId=this.form.subChapterId
                this.question.questionId=this.form.questionId
                this.question.question=this.form.question
                this.question.options=this.form.options.join("@"),//选项间用@分割
                this.question.answers=this.stringAnsToIntAns()//6位二进制位,末位对应A或T，次末位对应B或F,依次类推
                this.question.type=this.form.type//单选还是多选，0单选，1多选，2判断
                
                if(this.form.imgUrl!=""){
                    //触发图片上传
                    this.$refs.upload.submit();    
                }
                else{
                    console.log("this.question",this.question)
                    request.post("/uploadExercise", this.question,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                        console.log("result:",res)
                        if (res.data.code === 200) {
                            this.$message.success(res.data.message)
                            this.$refs['form'].resetFields();
                        } else {
                          this.$message({
                            type: "error",
                            message: "上传失败"
                          })
                        }
                    })

                }
            },
            handleAvatarSuccess(res, file) {
                if(res.code==200){
                    this.question.imgUrl=res.data
                    console.log("this.question",this.question)
                    request.post("/uploadExercise", this.question,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                        console.log("result:",res.data.code)
                        if (res.data.code === 200) {
                            this.$message.success(res.data.message)
                            this.$refs['form'].resetFields();
                        } else {
                          this.$message({
                            type: "error",
                            message: "上传失败"
                          })
                        }
                    })
                
                }
               
            },
        }
    }
  </script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
