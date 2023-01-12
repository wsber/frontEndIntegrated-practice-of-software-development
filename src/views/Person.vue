<template>
    <div>

        <!-- 使用animate插件实现图片的动态切换 -->
        <transition
                appear
                name="animate__animated animate__bounce animate__slower	"
                enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut"
                v-for="index in classObj.length"
                :key="index"
        >
            <!-- 背景图片轮换 -->
            <div class="mainSize" :class="classObj[index-1]" v-show="isShow===index-1">
            </div>
        </transition>


        <div class="bodySize">


        <el-card style="position: relative; margin: 100px auto; background-color:rgba(213,210,210,0.55);
             width: 500px; height: 650px; padding: 20px; border-radius: 10px;">
            <el-form label-width="80px" size="small">

                <el-form-item label="头像">
                        <el-upload
                                style="text-align: center ;padding-bottom: 10px"
                                class="avatar-uploader"
                                action="http://localhost:9099/file/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                        >
                            <img v-if="form.avatarurl" :src="form.avatarurl" class="avatar" style="width: 100%">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </el-form-item>



                <el-form-item label="用户名" >
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="form.userid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" >
                    <el-input v-model="form.gender" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" >
                    <el-input v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员等级" >
                    <el-input v-model="form.membership" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="账户余额"  >
                    <el-input v-model="form.account" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="save">确 定</el-button>
                    <el-button type="primary" @click="backToHome">返回书吧主界面</el-button>
                    <el-button type="text" style="color: #ff5f5a;font-size: 15px;" size="medium" @click="drawer = true">会员和收藏规则</el-button>
                    <el-drawer title="会员升级规则" :visible.sync="drawer" :with-header="false">
                        <span>     会员升级规则   </span>
                        <br/>
                        <span>用户的会员等级是根据用户在本书吧的充值总额来确定，充值总额越多，会员等级越高。具体细则如下：</span>
                        <br/>
                        <span>      用户充值总额 0 元   -----普通用户</span>
                        <br/>
                        <span>0   < 用户充值总额 <= 100 -----白银会员</span>
                        <br/>
                        <span>100 < 用户充值总额 <= 300 -----黄金会员</span>
                        <br/>
                        <span>300 < 用户充值总额 <= 500 -----铂金会员</span>
                        <br/>
                        <span>500 < 用户充值总额 <= 700 -----钻石会员</span>
                        <br/>
                        <span>      用户充值总额  > 700 -----超级大会员</span>
                        <br/>
                        <span>       收藏规则</span>
                        <span>图书有收藏的等级，从0-4不等，用户收藏图书时只能收藏图书等级比当前会员等级低的图书，即：图书收藏等级 < 会员等级</span>
                        <br/>
                        <el-table :data="tableData">
                            <el-table-column prop="grade" label="会员等级" ></el-table-column>
                            <el-table-column prop="name" label="会员名称" ></el-table-column>
                            <el-table-column prop="time" label="收藏时效" ></el-table-column>
                        </el-table>
                    </el-drawer>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
    </div>
</template>

<script>
    import "animate.css";

    export default {
        name: "Person",
        data(){
            return{

                tableData:[
                    {grade: '0',name:"普通用户",time:"0天"},
                    {grade: '1',name:"白银会员",time:"8天"},
                    {grade: '2',name:"黄金会员",time:"16天"},
                    {grade: '3',name:"铂金会员",time:"32天"},
                    {grade: '4',name:"钻石会员",time:"64天"},
                    {grade: '5',name:"超级大会员",time:"无限制时间"},
                ],
                drawer:false,

                classObj: [
                    "background1",
                    "background2",
                    "background3",
                    "background4",
                    "background5",
                    "background6",
                    "background7",
                    "background8",
                ],
                isShow: Math.floor(Math.random() * 10) /* 使初始图片随机 */,

                form: {},
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}  //从登录信息中取username
            }
        },
        created() {
            this.request.get("/user/username/" + this.user.username).then(res => {
                if(res.code === '200'){
                    this.form = res.data
                }
            })
        },
        mounted() {
            let i = this.isShow + 1;
            setInterval(() => {
                /* 定时器，每过5s切换图片 */
                if (i > this.classObj.length - 1) i = 0;
                this.isShow = i;
                i++;
            }, 3000);
        },
        methods: {
            backToHome() {

                this.$router.push("/front/Home")

            },
            save() {
                this.request.post("/user",this.form).then( res => {
                    if(res.data){
                        this.$message.success("保存成功")
                    }else{
                        this.$message.error("保存失败")
                    }
                })
            },

            handleAvatarSuccess(res){
                console.log("这里是个人信息")
                console.log(res)
                this.form.avatarurl = res

            }
        }
    }
</script>

<style>
    html,
    body {
        height: 100%;
        width: 100%;
        margin: 0;
        overflow: hidden;
    }
    .bodySize {
        overflow: auto;
        height: 100%;
        width: 100%;
        position: absolute;
    }


    .mainSize {
        height: 100%;
        width: 100%;
        background-position: center; /* 图片居中 */
        background-attachment: fixed; /* 背景图片不会随着页面的滚动而滚动 */
        background-size: cover; /* 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小 */
        position: absolute;
    }

    /* 图片集 */
    .background1 {
        background-image: url("http://localhost:9099/file/cfc71271251f46b98cf5bc6a91aae88a.jpg");
    }
    .background2 {
        background-image: url("http://localhost:9099/file/be582d38873b4de2a07fe78362218ecf.jpg");
    }
    .background3 {
        background-image: url("http://localhost:9099/file/92c49a4538f54037be2983302c9bcb92.jpg");
    }
    .background4 {
        background-image: url("http://localhost:9099/file/b1e15b91a1c9423f8ea42264cf61700d.jpg");
    }
    .background5 {
        background-image: url("http://localhost:9099/file/1ab20ebebad74e13bb256d7ef4f45ef9.jpg");
    }
    .background6 {
        background-image: url("http://localhost:9099/file/3d8866ed48b44946b1ecd81bb5570476.jpg");
    }
    .background7 {
        background-image: url("http://localhost:9099/file/21f73156b4414f398294125a53280dd0.jpg");
    }
    .background8 {
        background-image: url("http://localhost:9099/file/f5c3ab4b04ad46dd924d82155d87e981.jpg");
    }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }


</style>