<template>
    <div>
        <BlogHeader></BlogHeader>
        <div class="edit-content">
            <el-form :model="reluForm" :rules="rules" ref="ruleForm" label-width="100px" class="el-date-editor--monthrange">
                <el-form-item label="标题" >
                    <el-input v-model="reluForm.title"></el-input>
                </el-form-item>
                <el-form-item label="简介" >
                    <el-input v-model="reluForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <mavon-editor style="min-height: 500px" v-model="reluForm.context"></mavon-editor>
                </el-form-item>
                <el-form-item label="添加标签">
                    <el-input v-model="reluForm.lables"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save"> 提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BlogHeader from "../../components/BlogHeader";
    export default {
        name: "AddBlog",
        components:{BlogHeader},
        data(){
            return{
                reluForm: {
                    topicid:"",
                    title: "",
                    description: "",
                    context: "",
                    author: "",
                    userid:"",
                    author:"",
                    lables:"",
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
            };
        },
        methods:{
            save(){
                let userid = this.$route.params.userid
                let author = this.$route.params.author
                this.reluForm.userid=userid
                this.reluForm.author=author
                this.request.post("/totaltopic", this.reluForm).then(res => {
                    if(res){
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
                    }
                    else {
                        this.$message.error("保存失败")
                    }
                })
            },
            resetForm(){
                this.reluForm.title=""
                this.reluForm.context=""
                this.reluForm.description=""
                this.reluForm.lables=""
            }
        },
        created() {
            let userid = this.$route.params.userid
            let author = this.$route.params.author
            this.reluForm.userid=userid
            this.reluForm.author=author
        }
    }
</script>

<style scoped>
    .edit-content {
        margin-top: 20px;
        text-align: center;
        clear: both;
        margin: auto;
        width: 1500px;
    }
</style>