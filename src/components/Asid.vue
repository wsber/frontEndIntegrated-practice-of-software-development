<template>
    <el-menu :default-openeds="['1', '3','5','6']"style="min-height: 100% ; overflow-x: hidden"
             background-color="rgb(48 , 65 ,86)"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             router
             @select = "handleSelect"
    >
        <div style="height: 60px; line-height: 60px ;text-align: center">
            <img src = "../assets/康居乡村.png" alt = "" style="width: 40px;position:relative;top: 10px;margin-right: 5px">
            <b style="color: white" v-show="logoTextShow">乡村文化管理系统</b>
        </div>

        <div v-for="item in menus" :key="item.id">
            <div v-if="item.path">
                <el-menu-item :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </div>
            <div v-else>
                <el-submenu :index="item.id + ''">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </template>
                    <div  v-for="subItem in item.children" :key="subItem.id">
                        <el-menu-item :index="subItem.path">
                            <i :class="subItem.icon"></i>
                            <span slot="title">{{ subItem.name }}</span>
                        </el-menu-item>
                    </div>
                </el-submenu>
            </div>
        </div>





    </el-menu>
</template>

<script>
    export default {
        name: "Asid",
        props:{

            isCollapse : Boolean,
            logoTextShow:Boolean
        },

        data(){
            return{
                bgImg: {
                    backgroundImage: "url('http://localhost:9099/file/b1e15b91a1c9423f8ea42264cf61700d.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                },

                collapseBtnClass:'el-icon-s-fold',
                menus: localStorage.getItem("menus")?JSON.parse(localStorage.getItem("menus")):[]

            }
        },
        methods:{

            handleSelect(){
                this.$route.fullPath.split()
            }

        }

    }


</script>

<style scoped>

    .el-menu--collapse span {
        visibility: hidden;
    }
</style>