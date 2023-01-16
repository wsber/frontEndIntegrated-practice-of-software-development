
<template>
    <div :style="bgImg">
        <!-- 头部-->
        <div style="display:flex; height:60px; background-color: #fff; line-height: 60px; border-bottom: 1px solid #ccc">
            <div style="width: 300px; display:flex; padding-left: 30px">
                <div style="width: 60px">
                    <img src="../../assets/logo2.png" alt="" style=" width: 70px; position: relative; top: 5px; right: 0">
                </div>
                <div style="flex: 1; margin-left: 20px ; "> 欢迎来到文化振兴平台</div>
            </div>
            <div style="flex: 1">
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        router
                        @select="handleSelect"
                        background-color="#fff"
                        text-color="#545c64"
                        active-text-color="#ffd04b">
                    <el-menu-item index="RuralCulturalActivitiesExhibitionRoom">
                        <i class="el-icon-cloudy    "></i>
                        <span slot="title">乡村文化活动展览室</span>
                    </el-menu-item>
                    <el-menu-item index="PersonalReadingHouse">
                        <i class="el-icon-s-home    "></i>
                        <span slot="title">个人收藏室</span>
                    </el-menu-item>
                    <el-menu-item index="home" >
                        <i class="el-icon-platform-eleme"></i>
                        <span slot="title">电子阅览室</span>
                    </el-menu-item>
                    <el-menu-item index="bookSale" >
                        <i class="el-icon-coin"></i>
                        <span slot="title">图书购买</span>
                    </el-menu-item>
                    <el-menu-item index="memberBookcase">
                        <i class="el-icon-trophy-1"></i>
                        <span slot="title">会员书架</span>
                    </el-menu-item>
                    <el-menu-item index="remarks">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">文化交流广场</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div >
                <el-dropdown style="width: 100px; cursor: pointer">
                    <div style="display: inline-block">
                        <img :src="this.form.avatarurl" alt=""
                             style="width: 25px; border-radius: 50%; position: relative; top: 10px; right: 5px">
                        <span>{{ user.username }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center" router>
                        <el-dropdown-item>
<!--                            <router-link to="person">个人信息</router-link>-->
                            <span  style="text-decoration: none" @click="$router.push('/person')">个人信息</span>

                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span  style="text-decoration: none" @click="logout">退出登录</span>
                        </el-dropdown-item>
                        <el-dropdown-item >
                            <span v-show ="backstage" style="text-decoration: none" @click="$router.push('/home')">回到后台</span>
                        </el-dropdown-item>


                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <div style="width: 1800px; margin: 0 auto "  >
            <router-view />
        </div>
     </div>
</template>

<script>
    import {resetRouter} from "../../router";

    export default {
        name: "Front",


        data() {
            return {

                dialogFormVisible: false,
                backstage :false,
                bgImg: {
                    backgroundImage: "url('http://localhost:9099/file/b1e15b91a1c9423f8ea42264cf61700d.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                },

                background: {
                    // 背景图片地址
                    backgroundImage: 'url(' + require('../../assets/3.jpg') + ')',
                    // 背景图片是否重复
                    backgroundRepeat: 'no-repeat',
                    // 背景图片大小
                    backgroundSize: 'cover',
                    // 背景颜色
                    backgroundColor: '#000',
                    // 背景图片位置
                    backgroundPosition: 'center top',

                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},  //从登录信息中取username
                form: {}
            }
        },

              created(){
                this.request.get("/user/username/" + this.user.username).then(res => {
                    if(res.code === '200'){

                        this.form = res.data
                        console.log(this.form)
                        if(this.form.role !== 'USER'){
                            this.backstage = true
                        }
                    }
                })
            },

        methods:{
            logout(){
                // this.$store.commit("logout")
                this.$router.push("/login")
                localStorage.removeItem("user")
                this.$message.success("退出成功")

                //重置路由
                resetRouter()

            },

            activeIndex2(){

                console.log("成功")
            },

            handleSelect(){

            },
            goToSaleBook(){

                this.$router.push('/front/bookSale')

            }



        }
    }
</script>


<style scoped>
    .item{
        display: inline-block;
        width: 100px;
        color: #236ad2;
        text-align: center;
        cursor: pointer;
    }
    .item a{

    }
    .item:hover{
        background-color: cornflowerblue;
    }
    .bgBackground{
        width:100%;
        /*height:150;*/
    }
    html,body{
        cursor: url('http://localhost:9099/file/275e31bb31d94947b957be2da3a3139d.png'),auto;
    }
</style>

