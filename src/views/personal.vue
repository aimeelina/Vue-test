<template>
  <div>
    <span>完成率：{{completionRate}}%</span>
    <span>平均分：{{averageScore}}</span>
    <!-- <div id="myChart" :style="{ width: '500px', height: '500px' }" /> -->
  </div>
</template>
  
  
  
  <script>
    import request from "@/utils/request";
    export default {
      data() {
      return {
        completionRate:0,
        averageScore:0
      }
    },
      mounted() {
        this.drawLine()
        
      },
      created(){
        this.getScore()
      },
      methods: {
        getScore(){
          request.get("/getScore/"+this.$route.params.courseId+"/"+this.$route.params.chapterId+"/0",{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                console.log("Score:",res)
                if(res.data.code===200){
                  this.averageScore=res.data.data.averageScore
                  this.completionRate=res.data.data.completionRate.toFixed(2)*100
                }
                else {
                  this.$message({
                    type: "error",
                    message: res.data.message
                  })
                }
              })
        },
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          const myChart = this.$echarts.init(document.getElementById('myChart'))
myChart.setOption ({
  title: {
    text: '各单元完成情况'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['True', 'False']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['Unit7', 'Unit6', 'Unit5', 'Unit4', 'Unit3', 'Unit2', 'Unit1']
    }
  ],
  series: [
    
    {
      name: 'True',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [32, 12, 41, 34, 30, 40, 20]
    },
    {
      name: 'False',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'left'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-20, -32, -11, -34, -19, -23, -20]
    }
  ]
});

}
}
}

  </script>