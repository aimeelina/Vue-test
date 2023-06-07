<template>
  <div class="editContainer">
    <el-drawer
      :title="text_data"
      :visible.sync="drawer"
      :direction="direction"
      :append-to-body="true"
      :modal="false"
      :modal-append-to-body="false"
      >
      <span>{{text_data}}</span>
    </el-drawer>
    <div class="mindMapContainer" id="mindMapContainer"></div>
  </div>
</template>

<script>
import MindMap from 'simple-mind-map'
import {getData, storeData, storeConfig} from '@/api'

export default {
  name: 'Graph',
  data() {
    return {
      mindmapdata: null,
      drawer: false,
      direction: 'rtl',
      text_data:"..."
    }
  },
  mounted() {
    this.getData()
    this.init()
  },
  methods: {
    getData() {
      let storeData = getData()
      this.mindMapData = storeData
    },
    init() {
      let _this=this
      let {root, layout, theme, view} = this.mindMapData
      console.log("this.mindMapData", this.mindMapData)
      this.mindMap = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: root,
        layout: layout,
        theme: 'classic',
        themeConfig: theme.config,
        viewData: view,
        readonly: true,
        initRootNodePosition:['left', 'center']
      });
      this.mindMap.on('node_click', (data) => {
        // console.log("node_click",data)
        // console.log("data.node.nodeData.data.ableToClick",data.node.nodeData.data.ableToClick)
        if(data.nodeData.data.ableToClick){
          _this.drawer = true
          _this.text_data=data.nodeData.data.text
        }
      });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
<style lang="less" scoped>

.courseName {
  position: relative;
  top: 5%;
  left: 5%;
  font-size: 40px;
}

.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #2c3e50;

  .mindMapContainer {
    // position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}

</style>