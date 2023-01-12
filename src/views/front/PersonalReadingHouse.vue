<template>

    <div  class = "sale-background">
<!--        <div style = "width:100%;height:50px;border-bottom:2px solid #55cae5">-->
<!--            <div>-->
<!--                <h1 style = "text-align: center; font-family: 'Times New Roman','华光楷体_CNKI';color: firebrick ">快来看看自己收藏的图书吧！</h1>-->
<!--            </div>-->
<!--        </div>-->



            <div class="box" id="app" >
                <ul>
                    <li :class="item.class"  v-for="item in licontainer" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                        <el-button type = "success" class="ml-5" @click="read(item)">阅读</el-button>
                        <el-button type = "primary" @click="downloadEbook(item)">下载</el-button>
                        <el-button type = "danger" @click="deleteCollectedEbook(item)">删除</el-button>
                        <img :src="item.cover" alt="img">
                        <h3>{{item.bookname}}</h3>
                        <p>{{item.text}}</p>
                    </li>
                    <div style="clear: both"></div>
                </ul>
            </div>


        <div style="padding-top: 150px"></div>
        <div class="box-card" style="width: 100%;height: 150px;margin-top: 50px;background-color: #3c3f41">
            <div style="margin-left: 150px;padding-top: 50px;display: flex">
                <div style=" flex: 6;display: flex">
                    <h1 style="color: #d3dce6;margin-left: 30px;padding-top: 8px">樱 花 树</h1>
                </div>
                <div style="margin-left: 100px;padding-top: 50px;flex: 2">
                    <h3 style="color: #d3dce6;margin-left: 15px">团队：三人帮</h3>
                </div>
            </div>
        </div>

       <!-- <div style="margin: 10px 0 ;width: 100%">
            <el-row :gutter="10">
                <el-col :span="6" v-for="item in bookInfor" :key="item.bookid" style="margin-bottom: 10px" >
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.cover" height="200" width="110" alt ="" style="width: 100% ">
                        <div style="padding: 10px 0 ; border: 1px solid #cccccc">
                            <span style="color: #666">{{item.bookname}}</span>
                            <div>
                                <el-button type = "success" class="ml-5" @click="read(item)">阅读</el-button>
                                <el-button type = "primary" @click="downloadEbook(item)">下载</el-button>
                                <el-button type = "danger" @click="deleteCollectedEbook(item)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>

            </el-row>
        </div>-->

    </div>
</template>

<script>
    export default {
        name: "PersonalReadingHouse",
        data(){
            return{
                bookInfor:[],
                bookAuthority: false,
                userid:{},
                theUserCollectHistory:[], //用户当前的收藏历史

                collectTime:[], //该用户当前的收藏时间
                user:{},
                currentTime:"",
                intervalId: null,

                licontainer:[],
                // bookids:[],

            }
        },
        methods:{
            downloadEbook(item){
                // this.getTimeForCollect()
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
                console.log("这里是阅读部分，下面是该用户的信息")
                console.log(this.user)

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
                this.user  = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : {}
                //获得图书信息
                this.request.get("/collecthistory/getCollectHistoryInfor/"+ this.user.userid).then(res =>{
                    // console.log(res)
                    this.bookInfor = res
                    // console.log(this.bookInfor)
                    // console.log(this.getCurrentTime())
                    for(var i = 0 ; i < this.bookInfor.length ; i++){
                        let tmp = this.bookInfor[i];
                        tmp.class ="box_ul_li";
                        this.licontainer.push(tmp);
                    }
                })
                //获得用户收藏历史的信息，包含收藏开始的时间
                this.request.get("/collecthistory/findUserInfor/"+ this.user.userid).then(res =>{
                    // console.log(res)
                    this.theUserCollectHistory = res.data
                    let ids = this.theUserCollectHistory.map(v => v.bookid) //将对象数组变成纯ID的数组
                    let CollectedTimes = this.theUserCollectHistory.map(v => v.collectTime)
                    // console.log(CollectedTimes)
                    // console.log("这里是ids")
                    // console.log(ids)
                 //获取该用户对其所有收藏图书的收藏天数
                    this.request.get("/file/judgeCollectTimeAuthority/"+ ids).then(res=>{
                        console.log(res)
                        let nowDate = new Date()
                        let date = {
                            year: nowDate.getFullYear(),
                            month: nowDate.getMonth() + 1,
                            date: nowDate.getDate()
                        }
                        if (parseInt(date.date) < 10) {
                            date.date = '0' + date.date
                        }
                        this.systemTime = date.year + '-' + date.month + '-' + date.date


                        for (var i =0 ; i < CollectedTimes.length ; i++){
                            this.collectTime[i] = CollectedTimes[i][0] + "-" + CollectedTimes[i][1] + "-"+ CollectedTimes[i][2];
                            /*console.log(this.collectTime[i])
                            console.log("这里是日期差"+this.dateDifference(this.systemTime,this.collectTime[i]));*/
                            if(( this.dateDifference(this.systemTime,this.collectTime[i])) < res[i]){
                                // this.$message.success(ids[i]+"未到时间")
                                console.log("未到时间")
                            }else {
                                this.$message.error(ids[i] +"由于权限原因，收藏时间已到，已经将其删除")
                                //删除所有国企的图书
                                this.request.post("/collecthistory/delete/"+ ids[i] +'/'+this.user.userid).then(res=>{
                                    console.log(res)
                                    if(res.code==='200'){
                                        this.$message.success("删除成功")
                                        this.initData()
                                    }else{
                                        this.$message.error("删除失败")
                                    }
                                })
                            }
                        }


                    })

                })
            },
            deleteCollectedEbook(item){
                this.request.post("/collecthistory/delete/"+ item.bookid + '/'+ this.user.userid).then(res =>{
                    console.log(res)
                    if(res.code==='200'){
                        this.$message.success("删除成功")
                        this.initData()
                    }else{
                        this.$message.error("删除失败")
                    }
                })
            },
            //计算两个日期差值（天）
            dateDifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
                let dateSpan,tempDate,iDays
                sDate1 = Date.parse(sDate1)
                sDate2 = Date.parse(sDate2)
                dateSpan = sDate2 - sDate1
                dateSpan = Math.abs(dateSpan)
                iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
                return iDays
            },
            getCurrentTime() {
                //获取当前时间
                let nowDate = new Date()
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                }
                if (parseInt(date.date) < 10) {
                    date.date = '0' + date.date
                }
                this.systemTime = date.year + '-' + date.month + '-' + date.date
                console.log(this.systemTime)
            },
            getTimeForCollect(){
                let ids = this.theUserCollectHistory.map(v => v.bookid) //将对象数组变成纯ID的数组
                console.log(this.theUserCollectHistory)
                console.log("这里是ids")
                console.log(ids)
                this.request.get("/file/judgeCollectTimeAuthority/"+ ids).then(res=>{
                    console.log(res)
                })

            },

            changeActive($event) {
                $event.currentTarget.className = 'box_ul_li on';
            },
            removeActive($event) {
                $event.currentTarget.className = 'box_ul_li';
            },
            dataRefresh() {
                // 计时器正在进行中，退出函数
                if (this.intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.intervalId = setInterval(() => {
                    console.log("刷新" + new Date());
                    this.licontainer = undefined
                    this.licontainer = new Array

                    this.initData(); //加载数据函数
                }, 50000);
            },
            clear() {
                clearInterval(this.intervalId); //清除计时器
                this.intervalId = null; //设置为null
            },


        },
        created() {
            this.initData()
            this.dataRefresh()

        },






    }

</script>


<style scoped>

    /*http://localhost:9099/file/fc2454d9adbd4e158d79f03b62de2762.jpg*/


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
        width: 1300px;
        margin: auto;
        padding: 15px;
        margin-left: 280px;
    }
    .box_ul_li{
        width: 300px;
        height: 400px;
        box-shadow: 3px 2px 30px rgba(0,0,0,.1);
        float: left;
        text-align: center;
        position: relative;
        transition: all .6s ease-out;
        margin-left: 15px;
        margin-top: 20px;
        background: url("http://localhost:9099/file/fc2454d9adbd4e158d79f03b62de2762.jpg");
        background-size: cover;
    }
    .box ul li h3{
        padding-top: 5px;
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
        color: #000000;
    }
    .box ul .on p{
        margin-left: 20px;
        color: #FFF;
    }
    .box ul .on img{
        width: 200px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }


</style>




