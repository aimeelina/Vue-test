<template>
    <el-container>
      <el-aside>
        <el-button type="primary">普通按钮</el-button>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
</el-container>
    
</template>

<script>
    export default {
        name: "TestElementUI"
    }
</script>

<style scoped>

</style>
