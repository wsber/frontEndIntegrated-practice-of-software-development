<template>
    <div >
        <div style = "width:100%;height:50px;border-bottom:2px solid #55cae5">
            <div>
                <h1 style = "text-align: center; font-family: 'Times New Roman','华光楷体_CNKI';color: firebrick ">会员书架，精品图书、漫画！</h1>
            </div>
        </div>


        <div style = "padding-left:10px;padding-top: 20px">

            <div class="box" id="app" >
                <ul>
                    <li :class="item.class"  v-for="item in licontainer" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                        <el-button type = "success" class="ml-5" @click="read(item)">阅读</el-button>
                        <el-button type = "primary" @click="downloadEbook(item)">下载</el-button>
                        <el-button type = "primary"@click="collectEbook(item)">收藏</el-button>
                        <img :src="item.cover" alt="img">
                        <h3>{{item.bookname}}</h3>
                        <p>{{item.text}}</p>
                    </li>
                    <div style="clear: both"></div>
                </ul>
            </div>

        </div>



      <!--  <div style="margin: 10px 0 ;width: 100%">
            <el-row :gutter="10">
                <el-col :span="6" v-for="item in bookInfor" :key="item.bookid" style="margin-bottom: 10px" >
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.cover" height="200" width="110" alt ="" style="width: 100% ">
                        <div style="padding: 10px 0 ; border: 1px solid #cccccc">
                            <span style="color: #666">{{item.bookname}}</span>
                            <div>
                                <el-button type = "success" class="ml-5" @click="read(item)">阅读</el-button>
                                <el-button type = "primary" @click="downloadEbook(item)">下载</el-button>
                                <el-button type = "primary"@click="collectEbook(item)">收藏</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>-->


        <div class="box-card" style="width: 100%;height: 220px;margin-top: 50px;background-color: #3c3f41">
            <div style="margin-left: 150px;padding-top: 50px;display: flex">
                <div style=" flex: 6;display: flex">
                    <h1 style="color: #d3dce6;margin-left: 30px;padding-top: 14px">书吧</h1>
                </div>
                <div style="margin-left: 100px;padding-top: 50px;flex: 2">
                    <h3 style="color: #d3dce6;margin-left: 15px">团队：三人帮</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MemberBookcase",
        data(){
            return{
                imgs:[
                    'https://m.360buyimg.com/babel/jfs/t1/52973/39/18419/164717/629641b5E86fc0da8/bad4dab8ca3f791a.png',
                    'https://m.360buyimg.com/babel/jfs/t1/197572/23/23783/148278/6295ea20Eae60bcdc/80141c7f1adf5dc3.png',
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzhekoupic-qiniu.zuyushop.com%2FcuxiaoPic%2Fimage%2FmmbAdmin%2F20190319111933_6438.jpg&refer=http%3A%2F%2Fzhekoupic-qiniu.zuyushop.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656937560&t=d7ec50a5ab6474dfe1c22f7b937b79d3'
                ],
                bookInfor:[],
                bookAuthority: false,
                userid:{},
                licontainer:[],

            }
        },
        methods:{

            changeActive($event) {
                $event.currentTarget.className = 'box_ul_li on';
            },
            removeActive($event) {
                $event.currentTarget.className = 'box_ul_li';
            },

            downloadEbook(item){
                this.request.get("/file/judgeDownloadAuthority/"+item.bookid).then(res =>{
                    if(res){
                        window.open(item.bookUrl)
                    }
                    else{
                        this.$message.error("亲，您的下载权限不够，会员升级可以获得更多权限哦！")
                    }
                })
            },
            read(item){
                console.log("这里是阅读界面的url")
                console.log(item.bookUrl)
                console.log(item.bookid)

                this.request.get("/file/judgeAuthority/"+item.bookid).then(res =>{
                    if(res){
                        this.$router.push({
                            path:'/readingByPdf',
                            query: {src: item.bookUrl},
                        })
                    }
                    else{
                        this.$message.error("亲，您的阅读权限不够，会员升级可以获得更多权限哦！")
                    }
                })

            },

            initData(){
                this.request.get("/bookinfor/memberBook").then(res =>{
                    console.log(res)
                    this.bookInfor = res.data

                    for(var i = 0 ; i < this.bookInfor.length ; i++){
                        let tmp = this.bookInfor[i];
                        tmp.class ="box_ul_li";
                        this.licontainer.push(tmp);

                    }
                    console.log(this.licontainer)
                    console.log("在这里是数据初始化")
                })

            },

            collectEbook(item){
                this.user  = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : {}
                console.log(this.user.userid + item.bookid)
                this.request.post("/collecthistory/collect/"+ item.bookid + '/'+ this.user.userid).then(res=>{
                    console.log(res)
                    if(res.code ==='200')
                    {
                        this.$message.success("收藏成功")
                    }else{
                        this.$message.error(res.msg)
                    }

                })

            },

        },
        created() {
            this.initData()

        },



    }

</script>


<style scoped>

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .main_box{
        background-color: white!important;
        height: 500px;
        width: 100%;
        position: relative;
    }
    .box{
        width: 1400px;
        margin: auto;
        padding: 15px;
    }
    .box_ul_li{
        width: 300px;
        height: 410px;
        box-shadow: 3px 2px 30px rgba(0,0,0,.1);
        float: left;
        text-align: center;
        position: relative;
        transition: all .6s ease-out;
        margin-left: 15px;
        margin-top: 20px;
        background: url("http://localhost:9099/file/0b149fdfd9d04c6dbeead7f701531758.jpg");
        background-size: cover;

    }
    .box ul li h3{
        padding-top: 15px;
        color: #333;
        font-size: 18px;
    }
    .box ul li p{
        margin-top: 7px;
        color: #666;
        font-size: 14px;
    }
    .box ul li img{
        width: 160px;
        position: absolute;
        right: 26px;
        bottom: 10px;
        transition: all .6s ease-out;
    }
    .box ul .on{
        width: 350px;
        height: 450px;
        background-color: #6ab0e8;
        text-align: left;
    }
    .box ul .on h3{
        padding-left: 10px;
        color: #FFF;
    }
    .box ul .on p{
        margin-left: 20px;
        color: #FFF;
    }
    .box ul .on img{
        width: 240px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }

</style>

