import exampleData from "simple-mind-map/example/exampleData"
import exampleData_python from "../data/exampleData_python"
import { simpleDeepClone } from 'simple-mind-map/src/utils/index'
import request from "@/utils/request";

const SIMPLE_MIND_MAP_DATA = 'SIMPLE_MIND_MAP_DATA'

/** 
 * @Author: 王林 
 * @Date: 2021-08-02 22:36:48 
 * @Desc: 克隆思维导图数据，去除激活状态 
 */
const copyMindMapTreeData = (tree, root) => {
    tree.data = simpleDeepClone(root.data)
    // tree.data.isActive = false
    tree.children = []
    if (root.children && root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyMindMapTreeData({}, item)
        })
    }
    return tree;
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:10:49 
 * @Desc: 获取缓存的思维导图数据 
 */
export const getData = (courseId,chapterId) => {
    let store = localStorage.getItem(SIMPLE_MIND_MAP_DATA)
    // console.log("run simpleDeepClone(exampleData)")
    request.get("/getKnowledgeGraph/"+courseId+"/"+chapterId,{headers: {"Content-Type":"application/json"}}).then(res => {
        if(res.data.code===200){
            exampleData_python.root=res.data.data.root
            console.log("exampleData_python:",exampleData_python)
            return simpleDeepClone(exampleData_python)
        }
        else {
          this.$message({
            type: "error",
            message: res.data.message
          })
        }
      })
    // if (store === null) {
    //     console.log("run simpleDeepClone(exampleData)")
    //     console.log("exampleData",exampleData)
    //     return simpleDeepClone(exampleData)
    // } else {
    //     try {
    //         console.log("donot run simpleDeepClone(exampleData)")
    //         return JSON.parse(store)
    //     } catch (error) {
    //         return simpleDeepClone(exampleData)
    //     }
    // }
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:14:28 
 * @Desc: 存储思维导图数据 
 */
export const storeData = (data) => {
    try {
        let originData = getData()
        originData.root = copyMindMapTreeData({}, data)
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:24:56 
 * @Desc: 存储思维导图配置数据 
 */
export const storeConfig = (config) => {
    try {
        let originData = getData()
        originData = {
            ...originData,
            ...config
        }
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}