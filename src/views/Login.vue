<template>
    <div >

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
        <div style="margin: 200px auto; background-color: rgba(142,142,142,0.6); width: 350px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="username">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="small"  autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/register')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </div>
</template>

<script>
    import {setRoutes} from "../router";
    import "animate.css";

    export default {
        name: "Login",
        data() {
            return {
                classObj: [
                    "background1",
                    "background2",
                    "background3",
                    "background4",
                    "background5",
                ],
                isShow: Math.floor(Math.random() * 10) /* 使初始图片随机 */,
                user: {},
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                        /*{ min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }*/
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        /*{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }*/
                    ],
                }
            }
        },
        methods: {
            login: function () {
                this.$refs['userForm'].validate((valid) => {
                    console.log(this.user)
                    if (valid) {  // 表单校验合法
                        this.request.post("/user/login", this.user).then(res => {
                            console.log(this.user)
                            console.log("这里是用户")
                            if (res.code === '200') {
                                localStorage.setItem("user", JSON.stringify(res.data))  //存储用户信息到浏览器
                                localStorage.setItem("menus", JSON.stringify(res.data.menus))  //存储用户信息到浏览器
                                //动态设置当前用户的路由
                                setRoutes()
                                console.log(res.data.role)
                                // this.$router.push("/front/home")
                                if(res.data.role ==="USER"){
                                    this.$router.push("/front/RuralCulturalActivitiesExhibitionRoom")
                                }
                                else {
                                    this.$router.push("/home")
                                }

                                this.$message.success("登陆成功")
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }
                });
            }
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

    /* body绑定overflow是为了让图片变大不出现滚动条
       bodySize绑定overflow是为了让具体内容超出浏览器时出现滚动条
     */

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
        background-image: url("../assets/star1.jpg");
    }
    .background2 {
        background-image: url("../assets/star2.jpg");
    }
    .background3 {
        background-image: url("../assets/star3.jpg");
    }
    .background4 {
        background-image: url("../assets/star4.jpg");
    }
    .background5 {
        background-image: url("../assets/star5.jpg");
    }
</style>