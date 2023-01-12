<template>
   <div>
<!--     这里是头啊-->
    <BlogHeader></BlogHeader>
     <el-table :data="tableData" style="width: 1300px; margin: auto; " border>
     <el-table-column prop="create_time" label="日期" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.transBlogTime }}</span>
        </template>
     </el-table-column>
      <!--       博文名称-->
      <el-table-column prop="title" label="博文" width="250px">
       <template slot-scope="scope">
        <i class="el-icon-star-on"></i>
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
<!--       博文描述-->
       <el-table-column prop="description" label="简介" width="250">
       <template slot-scope="scope">
        <i class="el-icon-star-on"></i>
        <span style="margin-left: 10px">{{ scope.row.description }}</span>
      </template>
    </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleLook(scope.$index, scope.row)">查看</el-button>
        <el-button
        v-show="ownBlog"
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          v-show="ownBlog"
          size="mini"
          type="danger"
          @click.native.prevent="handleDelete(scope.$index, tableData)">删除</el-button>
      </template>
    </el-table-column>
     </el-table>
     <BlogFooter></BlogFooter>
   </div>
</template>

<script>
    import BlogHeader from "../../components/BlogHeader";
    import BlogFooter from "../../components/BlogFooter";
export default {
  name: "UserBlog",
  components:{BlogHeader,BlogFooter},
  data(){
    return{
       ownBlog :true,
        tableData: [],
    }
  },
  methods:{
      //查看博文详情操作
    handleLook(row){
      this.$router.push({name:"BlogDetail",params:{topicid:this.tableData[row].topicid}})
    },
    //编辑博文
    handleEdit(row){
     this.$router.push({name:"EditBlog",params:{topicid:this.tableData[row].topicid}})
    },
    handleDelete(index, rows){
      this.$confirm("确定删除该博文？","提示",{
        confirmButtonText:"确定",
        cancelButtonClass:"取消",
        type:"warning"
      }).then(()=>{
        // console.log(index,this.tableData[in])
        this.request.delete("/totaltopic/"+this.tableData[index].topicid,{
           headers: {
                  Authorization: localStorage.getItem("token")
                }
        }).then(res=>{
          rows.splice(index,1)
        });
        this.$message({
          type:"success",
          message:"删除成功！"
        });
      }).catch(()=>{
        this.$message({
           type: "info",
          message: "已取消删除"
        })
      })
    }
  },
  created() {
    let  username = this.$route.params.author
    this.request.get("/totaltopic/getBlogsByUser/"+username,{
    // headers: {
    //             Authorization: localStorage.getItem("token")
    //           }
    }).then(res=>{
       let blogs = res;
      this.tableData = res
        for(var i = 0  ;i <this.tableData.length ; i++){
            this.tableData[i].transBlogTime = this.tableData[i].createTime[0] + "-" +this.tableData[i].createTime[1]+ "-" + this.tableData[i].createTime[2] +" " + this.tableData[i].createTime[3] +":" +this.tableData[i].createTime[4] +":"+this.tableData[i].createTime[5];
            console.log(this.tableData[i].createTime)
        }
      console.log(localStorage.getItem("user"))
      console.log(res)
      // 判断是否为该作者，是才能编辑
        //this.ownBlog = blogs[0].userid === this.$store.getters.getUserInfo.userid;
    })
  }
}
</script>

<style scoped>

</style>
