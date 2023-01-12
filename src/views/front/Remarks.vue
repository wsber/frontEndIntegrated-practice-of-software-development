<template>
    <div>
        <BlogHeader></BlogHeader>
        <!--   //这里是一个时间线-->
        <div style="margin-left: 100px">
            <el-row :gutter="20">
                <el-col :span="5">
                    <div style="margin-left: 30px" class="grid-content">
                        <el-input v-model="title" placeholder="请输入话题名字" style="margin-top: 20px"></el-input>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content">
                        <el-button type="primary" style="margin-top: 20px;margin-left: auto " @click="search">搜索</el-button>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div >
                        <el-button type="danger" style="margin-top: 20px;" @click="reset">重置</el-button>
                    </div>
                </el-col>
            </el-row>


            <el-timeline style="padding:10px 0" >
                <!--      这里去循环遍历 分页查询得结果-->
                <el-timeline-item placement="top" v-for="(blog,index) in blogs " :key="index">
                    <!--       一个个的博客卡片-->
                    <el-card style="width:1300px">
                        <h2>
                            <router-link class="link" :to="{name:'BlogDetail',params:{topicid:blog.topicid}}">{{ blog.title }}</router-link>
                        </h2>
                        <div class="new-meta-box">
                            <div class="new-meta-item">
                                <!--              小user 图标-->
                                <i class="el-icon-user-solid" aria-hidden="true"></i>
                                <router-link class="notlink" :to="{name: 'UserBlog',params: {author:blog.author}}">{{ blog.author }}
                                </router-link>
                                <div class="new-meta-item">
                                    <i class="el-icon-s-order" aria-hidden="true"></i>
                                    <a class="notlink">
                                        <p>{{ blog.transBlogTime }}</p>
                                    </a>
                                </div>
                            </div>
                            <!--              这里是分割线条-->
                            <el-divider></el-divider>
                            <blockquote>
                                <p><i class="tab">标签：{{blog.lables}}</i></p>
                                <br/>
                                <p><i class="el-icon-collection-tag"> 简介：{{ blog.description }}</i></p>
                            </blockquote>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-pagination class="pager"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageNum"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
            </el-pagination>
        </div>
        <BlogFooter></BlogFooter>
    </div>

</template>

<script>
    import BlogHeader from "../../components/BlogHeader";
    import BlogFooter from "../../components/BlogFooter";

    export default {
        name: "Remarks",
        components: {BlogHeader, BlogFooter},
        data() {
            return {
                blogs: {},
                pageNum: 1,
                total: 0,
                pageSize: 5,
                input: "",
                title:"",
                context:"",
                lables:"",
                description:"",
                createTime:"",
                transBlogTime:"",
            }
        },
        methods: {
            getPage() {
                this.request.get("/totaltopic/page", {
                    params:{
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        title: this.title
                    }
                }).then(res => {
                    console.log(res)
                    this.blogs = res.records
                    console.log(this.blogs)
                    console.log("这里是时间")
                    for(var i = 0  ;i <this.blogs.length ; i++){
                        this.blogs[i].transBlogTime = this.blogs[i].createTime[0] + "-" +this.blogs[i].createTime[1]+ "-" + this.blogs[i].createTime[2] +" " + this.blogs[i].createTime[3] +":" +this.blogs[i].createTime[4] +":"+this.blogs[i].createTime[5];
                        console.log(this.blogs[i].createTime)
                    }
                    this.total = res.total
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getPage()
            },
            // 当当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val
                this.getPage()
            },
            search() {
                console.log(this.input)
                this.pageNum = 1
                this.getPage()
            },
            reset() {
                // this.pageNum = 1
                // this.total = null
                // this.pageSize = 8
                this.title = ""
                this.getPage()
            }
        },
        created() {
            this.getPage()
        }
    }
</script>

<style scoped>
    .fenge .el-divider{
        margin: 2px 0 !important;
    }
    .new-meta-item a{
        text-decoration: none;
        color: rgba(68,68,68,0.65);
        padding-left: 0;
        padding-right: 4px;
    }
    .new-meta-box{
        -webkit-transition: all 0.1s ease;
        font-size: 0.8125rem;
        padding-top:10px;
        padding-bottom: 2px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .new-meta-item{
        color: rgba(68,68,68,0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        margin: 0 8px 0 0;
        border-radius: 4px;
    }
    blockquote{
        margin-left: 2px;
        text-align: left;
        font-size: 0.9375rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        position: relative;
        width: 95%;
        padding: 0.7em 1.2em;
        background: #e8f4fd;
        border-left: 4px solid #2196f3;
        border-radius: 4px;
    }
    .pager {
        margin: 0 auto;
        text-align: center;
    }
    .link{
        color: skyblue;
        text-decoration: none;
    }
    .link:hover{
        color: #ff5722;
    }


</style>
