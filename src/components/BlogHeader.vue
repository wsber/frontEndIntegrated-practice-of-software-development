<template>

  <div class="m-content">

    <div class="nav-left" style="display:flex">
      <el-image style="margin-left: 250px; width: 100px; height: 100px" :src="url" lazy>
      </el-image>


    <div style="margin-left: 300px">
      <!-- <el-avatar :size="50" :src="user.avatar"></el-avatar>
            <div>{{user.username}}</div> -->

        <el-menu style="border-bottom: solid 0px #ffffff;"  :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="'1" >
            <el-link type="info" href="/front/remarks">主页</el-link>
          </el-menu-item>
          <el-menu-item index="'2" >
            <el-link type="success" @click="toEdit">发表帖子</el-link>
          </el-menu-item>
          <el-menu-item  index="'3">
            <el-link type="warning" @click="toUser">个人文章</el-link>
          </el-menu-item>

        </el-menu>


    </div>
    </div>
    <!--<div >
      <span v-show="!isLogin"><el-link type="primary"  @click="toLogin">登录</el-link></span>
      <span v-show="isLogin"><el-link type="primary"><el-popover
              width="40"
              placement="bottom"
              trigger="click"
      >
					<el-avatar :size="50" :src="user.avatar"></el-avatar>
					<el-button slot="reference">{{ user.username }}</el-button>
          <ul style="font-size: 5px">
            <li>欢迎 {{user.username}}</li>
             <li>{{user.tel}}</li>
          </ul>
				</el-popover></el-link> </span>
&lt;!&ndash;      &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&ndash;&gt;
      <span  v-show="!isLogin"><el-link type="primary" @click="toRegister">注册</el-link></span>
&lt;!&ndash;      <span v-show="isLogin"><el-link type="danger" @click="logout">退出</el-link></span>&ndash;&gt;
    </div>-->


  </div>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "1",
        // user: {
        //   username: "请先登录",
        //   avatar: "https://cdn.jsdelivr.net/gh/HimitZH/CDN/images/HCODE.png",
        //   lastLogin:"",
        //   email:null,
        // },
        user: JSON.parse(localStorage.getItem("user")),
        isLogin: true,
        url: "https://cdn.jsdelivr.net/gh/HimitZH/CDN/images/HCODE.png"
      };
    },
    methods: {
      //退出登录
      logout() {
        this.request.get("user/register", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {
          this.$store.commit("rmUserInfo")
          this.$router.push({name: "Remarks"})
        })
      },
      toUser() {
        this.$router.push({name:"UserBlog", params:{author:this.user.username}})
      },
      toLogin(){
        this.$router.push({name:"Login"})
      },
      toRegister(){
        this.$router.push({name:"Register"})
      },
      toEdit() {
        this.$router.push({name: "AddBlog", params:{author:this.user.username,userid:this.user.userid}})
        console.log(this.$store.getters.getUserInfo.username)
        // if (this.user.username){
        //   this.$router.push({name: "EditBlog"})
        // }else{
        //   this.$router.push({name:"Login"})
        // }
      }
    },
    created() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.request.get("/username/"+user.username).then(res => {
         if(res=='200'){
           this.user=res
         }
      })
    }
  };
</script>

<style >
  .m-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .-menu--horizontal{

  }
</style>
