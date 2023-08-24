<template>
    <div style="width: 500px;height: 100px;line-height: 100px;text-align:center;">
        <span>上传文件</span>
        <el-upload
            class="avatar-uploader"
            :data="chapterInfo"
            action="http://localhost:8080/communityvue/upload/file"
            :show-file-list="false"
            :with-credentials="true"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 
    </div>
    
</template>


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

<script>
  export default {
    name: "uploadResource",
    data() {
      return {
        imageUrl: '',
        chapterInfo:{
            courseId:4,
            chapterId:1,
            subChapterId:1
        }
      };
    },
    methods: {
        handlePictureCardPreview(file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
      handleAvatarSuccess(res, file) {

        console.log("res",res)
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return true
      }
    }
  }
</script>