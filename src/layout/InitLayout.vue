<template>
  <div>
    <!--    头部-->
    <Header style="z-index: 2"/>
    <!--    主体-->
    <div style="display: flex">
      <!--      内容-->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/InitHeader";

export default {
  name: "InitLayout",
  components: {
    Header
  }
}
</script>

<style scoped>

</style>