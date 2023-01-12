<template>
  <div>
    <BlogHeader></BlogHeader>
    <div class="edit-content">
      <el-form :model="reluForm" :rules="rules" ref="ruleForm" label-width="100px" class="el-date-editor--monthrange">
        <el-form-item label="标题" >
          <el-input v-model="reluForm.title"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="reluForm.lables"></el-input>
        </el-form-item>
        <el-form-item label="简介" >
          <el-input v-model="reluForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <mavon-editor v-model="reluForm.context"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"> 提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import BlogHeader from "../../components/BlogHeader";
  import BlogFooter from "../../components/BlogFooter";

export default {
  name: "EditBlog",
  components: {BlogHeader, BlogFooter},
  data() {
    return {
      reluForm: {
        topicid:"",
        title: "",
        description: "",
        context: "",
        author: "",
        lables:"",
        userid:"",
        username:""
      },
      rules: {
        title: [
          {required: true, message: "请输入文章标题", trigger: "blur"},
          {min: 3, max: 25, message: "长度在3~25个字符", trigger: "blur"}
        ],
        description: [
          {required: true, message: "请输入文章摘要", trigger: "blur"}
        ],
        context: [
          {required: true, trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    //重置表单
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.load()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.request.post("/totaltopic", this.reluForm, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(res => {
            this.$alert("操作成功", "消息提示", {
              confirmButtonText: "确定",
              callback: action => {
               this.$message({
                  type: "info",
                  message:"操作成功！已返回首页！"
               });
               this.$router.push({name:"Remarks"})
              }
            })
          })
        }else{
           console.log("error submit!!");
          return false;
        }
      })
    },
    load(){
      let blogId = this.$route.params.topicid
      if (blogId) {
        this.request.get("/totaltopic/getarticle/" + blogId).then(res => {
          if(res){
            this.$message.success("导入成功")
          }
          else{
            this.$message.error("导入失败")
          }
          this.reluForm=res;
          // this.reluForm.topicid = blog.topicid
          // this.reluForm.title = blog.title
          // this.reluForm.description = blog.description
          // this.reluForm.context = blog.context
        })
      }else{
        this.$message.error("参数传入失败")
      }
    }
  },
  created() {
       this.load()
  }
}
</script>

<style scoped>
.edit-content {
  margin-top: 50px;
  text-align: center;
  clear: both;
  width: 1500px;
  margin: auto;
}
</style>
