<template>
  <div>
    <BlogHeader></BlogHeader>
    <div class="content">
      <h1>{{ blog.title }}</h1>
      <div>
        <div class="new-meta-box">
          <div class="new-meta-item"></div>
          <i class="el-icon-user-solid" aria-hidden="true"></i>
          <h4>  {{ blog.author }}</h4>
        </div>
        <div class="new-meta-item date">
          <i class="el-icon-s-order" aria-hidden="true"></i>
          <a class="notlink">
            <p>{{ this.transBlogTime }}</p>
          </a>
        </div>
      </div>
      <el-button-group class="button">
        <el-button v-show="ownBlog" type="primary" icon="el-icon-edit" @click="toEdit"></el-button>
        <el-button v-show="ownBlog" type="danger" icon="el-icon-delete" @click="toDelete"></el-button>
      </el-button-group>
      <el-divider>
        <i class="el-icon-reading"></i>
      </el-divider>
      <div class="markdown-body" v-html="blog.context"></div>
    </div>
    <div style="width:1300px; margin: auto; height:10px; background-color: #00aeff"></div>
    <div style="background-color: #e8f4fd;  width:1300px;height:150px; margin: auto">
      <p v-if="reviews.length==0" style=" margin-left: 400px; position: center;font-family: 华光仿宋_CNKI">暂无评论，我来发表第一篇评论！</p>
      <div v-else>
        <div class="comment" v-for="(item,index) in reviews" v-bind:index="index" :key="index" >
          <b style="font-family: '华光楷体_CNKI','Times New Roman';font-size: medium">{{item.username}}    <span>{{item.reviewtime}}</span></b>
          <br/>
          <p>跟帖回复：  {{item.message}}</p>
        </div>
      </div>
    </div>
    <div style="width:1300px; margin: auto; height:10px; background-color: #00aeff"></div>

    <div style="margin: auto; width:1300px">
      <h4 style="font-family: 华光仿宋_CNKI;margin-bottom: 10px">发表评论</h4>
      <el-input type="textarea" autosize placeholder="请输入评论内容" v-model="comment" style="margin-bottom: 10px"></el-input>
      <el-button style="margin-left: 400px" class="btn" type="primary" round @click="addComment">发表</el-button>
      <el-button style="margin-left: 100px" class="btn" type="warning" round @click="clearComment">清空</el-button>
    </div>
    <BlogFooter></BlogFooter>
  </div>
</template>

<script>
  import BlogHeader from "../../components/BlogHeader";
  import BlogFooter from "../../components/BlogFooter";

export default {
  name: "BlogDetail",
  components: {BlogHeader,BlogFooter},
  data() {
    return {
      blog: {
        topicid: '',
        lables:"",
        title: "",
        context: "",
        description:"",
        status: 1,
        remarknum:"",
        createTime: "",
        author: "",
        userid: "",
      },
      review:{
        userid:"",
        username:"",
        message:"",
        topicid:'',
        reviewid:'',
        reviewtime:""
      },
      comment:"",
      reviews:[],
      ownBlog: false,
      // user: {},
    }
  },
  methods: {
    toEdit() {
      this.$router.push({name: "EditBlog", params: {topicid: this.blog.topicid}});
    },
    toDelete() {
      this.$confirm("是否删除该博文？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
            this.request.delete("/totaltopic/"+this.blog.topicid,{
               headers: {
                  Authorization: localStorage.getItem("user")
                }
            }).then(res=>{
              this.$router.push({name:"Remarks"})
            });
            this.$message({
               type: "success",
              message: "删除成功!"
            })
      }).catch(()=>{
          this.$message({
            type: "info",
            message: "已取消删除"
          });
      })
    },
    loadRemarks(){
      let blogId = this.$route.params.topicid
      if (blogId) {
        this.request.get("/totaltopic/" + blogId).then(res => {
          let blog = res
          this.blog = res
          this.transBlogTime = this.blog.createTime[0] + "-" +this.blog.createTime[1]+ "-" + this.blog.createTime[2] +" " + this.blog.createTime[3] +":" +this.blog.createTime[4] +":"+this.blog.createTime[5];
          console.log(this.blog)
          let MardownIt = require("markdown-it");
          let md = new MardownIt();
          let result = md.render(blog.context);

          this.blog.context = result;
          // 判断是否为该作者，是才能编辑
          if(blog.author===this.user.username){
            this.ownBlog=true;
          }else{
            this.ownBlog=false;
          }
          localStorage.setItem("blog", JSON.stringify(res.data))
          // this.ownBlog = blog.userid === this.$store.getters.getUserInfo.userid;
        })
      }
    },
    loadReviews(){
      let topicid = this.$route.params.topicid
      this.request.get("/reviews/" + topicid).then(res =>{
        if(res){
          this.reviews = res;
          // this.$message.success("评论导入成功")
        }else{
          this.$message.error("评论导入失败")
        }
      })

      this.review.topicid=topicid
    },
    addComment(){
      this.review.message=this.comment
      this.review.username=BlogHeader.data().user.username
      this.review.userid=BlogHeader.data().user.userid
      this.request.post("/reviews",this.review).then(res =>{
        if(res){
          this.$message.success("评论成功")
          this.loadReviews()
          this.comment=""
        }else {
          this.$message.error("评论失败")
        }
      })
    },
    clearComment(){
      this.comment=""
    }
  },
  created() {
    this.loadRemarks()
    this.loadReviews()
    this.user=JSON.parse(localStorage.getItem("user"))
  }
}
</script>

<style scoped>
.button {
  padding-left: 800px;
}

.new-meta-item a {
  text-decoration: none;
  color: rgba(68, 68, 68, 0.65);
  padding-left: 0;
  padding-right: 4px;
}

.new-meta-box {
  padding-left: 100px;
  -webkit-transition: all 0.1s ease;
  font-size: 0.8125rem;
  padding-top: 5px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  float: left;
  flex-wrap: wrap;
}

.new-meta-item {
  color: rgba(68, 68, 68, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin: 0 8px 0 0;
  border-radius: 4px;
}

.content {
  padding: 20px 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 1300px;
  min-height: 700px;
  background-color: #e8f4fd;
  margin: auto;
}

.edit {
  color: skyblue;
  text-decoration: none;
}

.edit:hover {
  color: red;
  scale: 1;
}

h1 {
  padding: 10px;
  text-align: center;
  transition: color .6s;
  color: #55cae5;
  margin: 2.75rem 0 1rem;
  font-family: Product Sans, Oswald, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-weight: 600;
  line-height: 1.5;
}
</style>
