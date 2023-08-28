<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
            label="题号"
            prop="questionId"
            :rules="[
            { required: true, message: '题号不能为空'},
            { type: 'number', message: '题号必须为数字值'}
            ]"
        >
            <el-input v-model.number="ruleForm.questionId" autocomplete="off">题号</el-input>
        </el-form-item>
        <el-form-item 
            :rules="[
            { required: true, message: '题目类型不能为空'}
            ]"
            label="题目类型" prop="type">
            <el-radio-group v-model="ruleForm.type" @input="changeType($event)">
            <el-radio label="0">单选</el-radio>
            <el-radio label="1">多选</el-radio>
            <el-radio label="2">判断</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item :rules="[
            { required: true, message: '题干不能为空'}
            ]"
            label="题干" prop="title">
            <el-input type="textarea" v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item v-if="ruleForm.type != 2" label="选项A" prop="optionA">
            <el-input type="textarea" v-model="ruleForm.optionA"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.type != 2" label="选项B" prop="optionB">
            <el-input type="textarea" v-model="ruleForm.optionB"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.type != 2" label="选项C" prop="optionC">
            <el-input type="textarea" v-model="ruleForm.optionC"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.type != 2" label="选项D" prop="optionD">
            <el-input type="textarea" v-model="ruleForm.optionD"></el-input>
        </el-form-item>

        <div v-if="ruleForm.type == 0">
            <el-form-item label="正确答案" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="A"></el-radio>
                <el-radio label="B"></el-radio>
                <el-radio label="C"></el-radio>
                <el-radio label="D"></el-radio>
              </el-radio-group>
            </el-form-item>
        </div>

        <div v-if="ruleForm.type == 1">
            <el-form-item label="正确答案" prop="resource">
            <el-checkbox-group
                @input="change($event)"
                v-model="ruleForm.resource"
            >
                <el-checkbox label="A" ></el-checkbox>
                <el-checkbox label="B"></el-checkbox>
                <el-checkbox label="C"></el-checkbox>
                <el-checkbox label="D"></el-checkbox>
                <!-- <el-checkbox label="F">{{ item.stSelectf }}</el-checkbox> -->
            </el-checkbox-group>
            </el-form-item>
        </div>

        <div v-if="ruleForm.type == 2">
            <el-form-item label="正确答案" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="True"></el-radio>
                <el-radio label="False"></el-radio>
            </el-radio-group>
            </el-form-item>
        </div>
        <span>题目配图</span>
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/communityvue/upload/exerciseImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-change="handlePictureCardPreview"
        :auto-upload="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:8080/communityvue/upload/exerciseImg/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="false"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">上传题目</el-button>
    <el-button @click="goback()">返回</el-button>
  </el-form-item>
</el-form>

</template>

<script>
import request from "@/utils/request";
  export default {
    name: "UploadExercise",
    data() {
      return {
        ruleForm: {
            type:null,
            optionA:"",
            optionB:"",
            optionC:"",
            optionD:"",
            resource: '',
            title:'',
            questionId:null
        },
        rules: {
        },
        exercise:{
            courseId:0,
            chapterId:0,
            subChapterId:0,
            questionId:0,
            question:"",
            options:"",
            answers:0,
            type:0,
            imgUrl:"",
        },
        imageUrl:""
      };
    },
    methods: {
        changeType(){
            if (this.ruleForm.type == 1) {
                  this.ruleForm.resource = []
                }else{
                  this.ruleForm.resource = ''
                }
        },
        submitForm(formName) {
            let that=this
            let ans=''
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let finalImgUrl=''
                if(that.imageUrl!=''){
                    //上传图片，得到服务器上的imageurl
                }
                that.exercise.imgUrl=finalImgUrl
                if (that.ruleForm.resource instanceof Array) {
                    ans = that.ruleForm.resource.join('')
                } 
                //如果是单选或判断
                else {
                    ans = that.ruleForm.resource
                }
                //将答案转成int
                if(ans.indexOf('A')!=-1){
                    that.exercise.answers+=1;
                }
                if(ans.indexOf('B')!=-1){
                    that.exercise.answers+=2;
                }
                if(ans.indexOf('C')!=-1){
                    that.exercise.answers+=4;
                }
                if(ans.indexOf('D')!=-1){
                    that.exercise.answers+=8;
                }
                if(ans.indexOf('T')!=-1){
                    that.exercise.answers+=1;
                }
                if(ans.indexOf('F')!=-1){
                    that.exercise.answers+=2;
                }
                that.exercise.questionId=that.ruleForm.questionId
                if(that.ruleForm.type!=2){
                    that.exercise.options=that.ruleForm.optionA+"@"+that.ruleForm.optionB+"@"+that.ruleForm.optionC+"@"+that.ruleForm.optionD
                }
                that.exercise.type=that.ruleForm.type
                that.exercise.question=that.ruleForm.title
                that.exercise.courseId=that.$route.params.courseId
                that.exercise.chapterId=that.$route.params.chapterId
                that.exercise.subChapterId=that.$route.params.subChapterId
                request.post("/uploadExercise", this.exercise,{headers: {'Content-Type': 'application/json'}}).then(res => {
                    console.log("result:",res)
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.message
                        })
                    } else {
                      this.$message({
                        type: "error",
                        message: "上传失败"
                      })
                    }
                })

            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        goback() {
            this.$router.back()
        },
        handlePictureCardPreview(file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            },
        handleAvatarSuccess(res, file) {
            console.log("upload success")
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
  }
</script>