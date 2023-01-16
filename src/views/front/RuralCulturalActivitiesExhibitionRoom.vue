
<template>
    <div :style="bgImg"  >
        <br>
        <el-carousel :interval="3000" type="card" height="450px" style="background-size: cover ;width: 1700px" >
            <el-carousel-item v-for="item1 in this.imgs"  :key="item1">
                <img :src="item1" alt="img" style="width: 100% ; height: inherit">
            </el-carousel-item>
        </el-carousel>


        <div style="margin-top: 20px; margin-left: 310px; padding:  10px 0">
            <el-input style=" width:200px" placeholder="请输入活动名称" suffix-icon="el-icon-reading" v-model = "activityName"></el-input>
            <el-select v-model="activityType" placeholder="请选择活动类型" style="margin-left: 5px">
                <el-option label="文化演出活动" value="文化演出活动" ></el-option>
                <el-option label="公益电影放映" value="公益电影放映" ></el-option>
                <el-option label="送戏下乡" value="送戏下乡"></el-option>
            </el-select>
            <el-input style=" width:200px ; margin-left: 5px" placeholder="请输入表演团队名称" suffix-icon="el-icon-user" class = "ml-5" v-model = "performanceTeam"></el-input>
            <el-button class="ml-5" type="primary" @click="likeSearchActivities">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>



        <div style="margin-top: 10px">
            <el-drawer
                    title="娱乐活动详细信息"
                    :visible.sync="drawer"
                    :direction="direction"
                    :before-close="handleClose"
                    :wrapper-closable="true" :size="drawerSize">
                <div style="margin-left: 20px">
                    <div style="display: flex">
                        <img :src="detailActivityInformation.cover"
                             class="image"
                             style="width: 270px; height: 272px;margin-top: 5px"
                        />
                        <div style="margin-left: 20px;">
                            <span style="font-weight: bold;font-size:x-large">名称: {{detailActivityInformation.activityName}}</span>
                            <div style="margin-top: 20px;font-weight: lighter">活动类型：{{detailActivityInformation. type}}</div>
                            <div style="margin-top: 20px;font-weight: lighter">观众数量：{{detailActivityInformation. audienceNumber}}</div>
                            <div style="margin-top: 20px;font-weight: lighter">表演团队：{{detailActivityInformation. performanceTeam}}</div>
                            <div style="margin-top: 20px;font-weight: lighter">活动地址：{{detailActivityInformation.province + detailActivityInformation.region + detailActivityInformation.town + detailActivityInformation.village}}</div>
                            <div style="margin-top: 20px;font-weight: lighter">活动开始时间：{{detailActivityInformation. activityStarttime}}</div>
                            <div style="margin-top: 20px;font-weight: lighter">活动结束时间：{{detailActivityInformation. activityEndtime}}</div>

                        </div>
                    </div>
                </div>
                <div style=" margin-top: 50px; text-align: center">
                    <el-button type = "success" class="ml-5" @click="preview(detailActivityInformation.videoFile)">观看视频</el-button>
                    <el-button type = "primary" @click="downloadVideo(detailActivityInformation)">下载视频</el-button>
                    <el-button type = "primary" @click="collectEbook(detailActivityInformation)">收藏活动</el-button>
                </div>
                <div style=" margin-top: 50px;font-weight: bold;font-size: large ;text-align: center">简介</div>
                <div style="margin-left: 20px ;margin-top: 10px; margin-right:20px;font-weight: lighter">{{detailActivityInformation.mydesc}}</div>
            </el-drawer>
        </div>



        <div class="box" id="app" >
            <ul>
                <li :class="item.class"  v-for="item in activityContainer" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-button type="text" @click="lookUpDetailedInformation(item)" style="font-size: 15px; color: #ef2d84">查看详细信息</el-button>
                    <img :src="item.cover" alt="img" style="margin-top: 5px">
                    <h3>{{item.activityName}}</h3>
                </li>
                <div style="clear: both"></div>
            </ul>
        </div>


        <div class="box-card" style="width: 100%;height: 150px;margin-top: 50px;background-color: #3c3f41">
            <div style="margin-left: 150px;padding-top: 50px;display: flex">
                <div style=" flex: 6;display: flex">
                    <h1 style="color: #d3dce6;margin-left: 30px;padding-top: 8px">乡村文化振兴</h1>
                </div>
                <div style="margin-left: 1px;padding-top: 50px;flex: 2">
                    <h3 style="color: #d3dce6;margin-left: 15px">团队：三人帮</h3>
                </div>
            </div>
        </div>


    </div>

</template>
<script>
    export default {
        name: "RuralCulturalActivitiesExhibitionRoom",
        data(){
            return {
                imgs:[
                    'http://localhost:9099/file/73e921b2a67849c8ab712978e28ec7bd.png',
                    'http://localhost:9099/file/30218b32cb5140dfaa3b89fa21badb05.png',
                    'http://localhost:9099/file/a9b4d3f6a27846bd99246dbdcd8c8907.png',
                    ' http://localhost:9099/file/e0ce5087dd15448ea5621c9c4d36be96.jpg',
                ],
                bgImg: {
                    // backgroundImage: "url('http://localhost:9099/file/79052a7b636b419b82a7a7284c55d2cd.jpg')",
                    backgroundImage: "url('http://localhost:9099/file/68838636be5a43d4aa819ad9ee7277d1.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                },
                //抽屉特效
                drawer: false,
                drawerSize:'37%',
                direction: 'ltr',
                detailActivityInformation:{},
                activityType:'',
                activityName:'',
                performanceTeam:'',


                bookname: "",
                authorName:"",
                memberName:"",
                checkboxGroup1:[],
                checkboxGroup2: [],
                checkboxGroup3: [],
                areas: ['华夏', '欧美', '日韩'],
                lightNovels:['奇幻', '青春','恋爱','推理'],
                comics: ['冒险漫画', '休闲漫画', '青春漫画','异世界漫画','悬疑漫画'],

                licontainer:[],
                activityContainer:[],
                activityInfor:[],
                bookInfor:[],
                bookAuthority: false,
                userid:{},

                bufferTheme:[],
            }
        },
        created() {
            this.initData()
            this.initImages()
        },
        methods:{

            lookUpDetailedInformation(item){
                this.detailActivityInformation = item
                this.drawer = true
                console.log(this.detailActivityInformation)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            reset(){
                this.activityName ="",
                this.activityType = "",
                this.performanceTeam ="",
                this.initData()
            },
            likeSearchActivities(){
                this.activityContainer = undefined;
                this.activityContainer = new Array();
                this.request.get("/ruralrecreation/likeSearchActivities" , {
                    params:{
                        activityName: this.activityName,
                        activityType: this.activityType,
                        performanceTeam: this.performanceTeam,
                    }
                }).then(res=>{
                    console.log("这里返回的res")
                    console.log(res)
                    // this.licontainer = [];
                    this.bufferTheme = undefined;
                    this.bufferTheme = new Array();
                    this.bufferTheme = res
                    console.log("这里模糊查询")
                    console.log(this.bufferTheme)
                    console.log("这里模糊查询")
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = this.bufferTheme[i];
                        tmp.class ="box_ul_li";
                        this.activityContainer.push(tmp);
                    }
                    console.log(this.activityContainer)
                    console.log("这里模糊查询的accontainer")
                })
            },
            downloadVideo(item){
                console.log(item.enable)
                if(item.enable){
                            window.open(item.videoFile)
                }
                else {
                    this.$message.error("亲，非常抱歉，该文件目前在维修中无法下载或观看")
                }


            },
            initData(){
                this.request.get("/ruralrecreation/detail").then(res=>{
                    this.activityContainer = undefined;
                    this.activityContainer = new Array() ;
                    this.activityInfor = res;
                    for(var i = 0 ; i < this.activityInfor.length ; i++){
                        let tmp = this.activityInfor[i];
                        tmp.class ="box_ul_li";
                        this.activityContainer.push(tmp);
                    }
                    console.log("这里是娱乐数据",this.activityContainer);
                })

            },

            initImages(){
                this.request.get("/activityphotoes/random").then(res=>{
                    this.imgs = [];
                    let tmp = res;
                    for(let r of res)
                        this.imgs .push(r.url)
                    console.log("这里是照片",this.imgs);
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

            changeActive($event) {
                $event.currentTarget.className = 'box_ul_li on';
            },
            removeActive($event) {
                $event.currentTarget.className = 'box_ul_li';
            },
            preview(url) {
                window.open('https://file.keking.cn/onlinePreview?url=' + encodeURIComponent(window.btoa((url))))
            },

        }
    }
</script>
<style scoped>

    .image{
        display: block;
        width: 100%;
    }

    /*抽屉的颜色*/
    ::v-deep .el-drawer {
        background-color: #e3e3e3 !important
    }


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
        width: 380px;
        height: 300px;
        box-shadow: 3px 2px 30px rgba(0,0,0,.1);
        float: left;
        text-align: center;
        position: relative;
        transition: all .6s ease-out;
        margin-left: 15px;
        margin-top: 20px;
        background: url("http://localhost:9099/file/fe9026ce6217435ab6cc47d367dbec20.jpg");
        background-size: cover;
    }
    .box ul li h3{
        padding-top: 2px;
        color: #333;
        font-size: 18px;
    }
    .box ul li p{
        margin-top: 7px;
        color: #666;
        font-size: 14px;
    }
    .box ul li img{
        width: 330px;
        height: 210px;
        position: absolute;
        right: 26px;
        bottom: 10px;
        transition: all .6s ease-out;
    }
    .box ul .on{
        width: 400px;
        height: 320px;
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
        width: 380px;
        height: 280px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }




</style>

