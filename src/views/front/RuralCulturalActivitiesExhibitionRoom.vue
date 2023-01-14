
<template>
    <div class = "sale-background" >
        <div style="display: flex; margin-left: 310px; margin-top: 10px">
            <el-tag type="success" style="height: 35px; width:110px; font-size:20px; margin-right: 30px; margin-bottom: 5px">地区:</el-tag>
            <el-checkbox-group  v-model="checkboxGroup1">
                <el-checkbox-button  v-for=" area in areas" :label="area" >{{area}}</el-checkbox-button>
            </el-checkbox-group>
        </div>

        <div >
            <div style="display: flex; margin-left: 310px; margin-top: 10px">
                <el-tag  style="height: 35px; width:110px; font-size:20px; margin-right: 30px; margin-bottom: 5px">轻小说:</el-tag>
                <el-checkbox-group v-model=" checkboxGroup2" @change="getLightNovel">
                    <el-checkbox-button  v-for="lightNovel  in lightNovels " :label="lightNovel" >{{lightNovel}}</el-checkbox-button>
                </el-checkbox-group>
            </div>

            <div style="display: flex; margin-left: 310px; margin-top: 10px">
                <el-tag type="info" style="height: 35px; width:110px; font-size:20px; margin-right: 30px; margin-bottom: 5px">漫画:</el-tag>
                <el-checkbox-group v-model="checkboxGroup3">
                    <el-checkbox-button v-for="comic in comics" :label="comic" >{{comic}}</el-checkbox-button>
                    <el-button style="margin-left: 50px;"
                               icon="el-icon-search" type = "success"  @click="searchBooks()">搜 索</el-button>
                </el-checkbox-group>
            </div>


        </div>


        <div style="margin-top: 20px; margin-left: 310px; padding:  10px 0">
            <el-input style=" width:200px" placeholder="请输入活动名称" suffix-icon="el-icon-reading" v-model = "activityName"></el-input>
            <!--            <el-input style=" width:200px" placeholder="请输入会员名称" suffix-icon="el-icon-loading" class = "ml-5" v-model = "memberName"></el-input>-->
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
                    <el-button type = "success" class="ml-5" @click="read(detailActivityInformation)">观看视频</el-button>
                    <el-button type = "primary" @click="downloadEbook(detailActivityInformation)">下载视频</el-button>
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
                    <img :src="item.cover" alt="img" style="width: 170px; height: 202px;margin-top: 5px">
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
                <div style="margin-left: 100px;padding-top: 50px;flex: 2">
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
                /* <el-radio label="ltr">从左往右开</el-radio>
                 <el-radio label="rtl">从右往左开</el-radio>
                 <el-radio label="ttb">从上往下开</el-radio>
                 <el-radio label="btt">从下往上开</el-radio>*/
                bgImg: {
                    backgroundImage: "url('http://localhost:9099/file/fc2454d9adbd4e158d79f03b62de2762.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: '100% auto'
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
                /* imgs:[
                     'http://localhost:9099/file/73e921b2a67849c8ab712978e28ec7bd.png',
                     'http://localhost:9099/file/30218b32cb5140dfaa3b89fa21badb05.png',
                     'http://localhost:9099/file/a9b4d3f6a27846bd99246dbdcd8c8907.png',
                 ],*/
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
            searchBooks(){
                this.licontainer = undefined;
                this.licontainer = new Array();
                // console.log(this. checkboxGroup1)
                /*this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup1).then(res=>{
                    // console.log(res)
                    this.bufferTheme = res;
                    // console.log(this.bufferTheme)
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = this.bufferTheme[i];
                        tmp.class ="box_ul_li";
                        this.licontainer.push(tmp);
                    }
                })*/
                // console.log(this. checkboxGroup2)
                if(this.checkboxGroup2.length !== 0){
                    this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup2).then(res=>{
                        // console.log(res)
                        this.bufferTheme = undefined;
                        this.bufferTheme = new Array();
                        this.bufferTheme = res;
                        // console.log(this.bufferTheme)
                        for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                            let tmp = this.bufferTheme[i];
                            tmp.class ="box_ul_li";
                            this.licontainer.push(tmp);
                        }
                    })
                }


                if(this.checkboxGroup3.length !== 0){
                    this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup3).then(res=>{
                        // console.log(res)
                        this.bufferTheme = undefined;
                        this.bufferTheme = new Array();
                        this.bufferTheme = res;
                        // console.log(this.bufferTheme)
                        for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                            let tmp = this.bufferTheme[i];
                            tmp.class ="box_ul_li";
                            this.licontainer.push(tmp);
                        }
                    })
                }

                /*if(this.checkboxGroup3.length !== 0) {
                    this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup3 +'/' + this.checkboxGroup1).then(res => {
                        // console.log(res)
                        this.bufferTheme = undefined;
                        this.bufferTheme = new Array();
                        this.bufferTheme = res;
                        console.log(res)
                        console.log("这里是res")
                        console.log(res)
                        // console.log(this.bufferTheme.length)
                        for (var i = 0; i < this.bufferTheme.length; i++) {
                            let tmp = res[i];
                            tmp.class = "box_ul_li";
                            this.licontainer.push(tmp);
                        }

                        console.log("3我到这里了，这里在筛选")
                        console.log(this.licontainer )


                        // console.log(this.licontainer[0])
                        // console.log(this.licontainer[1])
                        // console.log(this.licontainer[2])
                        // console.log(this.licontainer[3])
                        // console.log(this.checkboxGroup1.length )
                        // console.log(this.checkboxGroup1 )
                        //         if(this.checkboxGroup1.length !==0){
                        //             for(var i = 0 ; i < this.licontainer.length ; i++){
                        //                 var countMarry = 0 ;
                        //                 for(var j = 0 ; j < this.checkboxGroup1.length ; j++){
                        //
                        //                     if(this.licontainer[i].area === this.checkboxGroup1[j]){
                        //                         countMarry ++ ;
                        //                     }
                        //                 }
                        //                 if(countMarry === 0 ){
                        //                     this.licontainer.splice(i,1)
                        //                 }
                        //             }
                        //         }

                    })
                }*/



                if(this.checkboxGroup2.length ===0 && this.checkboxGroup3.length === 0){
                    this.request.get("/bookinfor/searchBookArea/" +this.checkboxGroup1).then(res =>{
                        this.bufferTheme = undefined;
                        this.bufferTheme = new Array();
                        this.bufferTheme = res;
                        console.log(this.bufferTheme)
                        for (var i = 0; i < this.bufferTheme.length; i++) {
                            let tmp = this.bufferTheme[i];
                            tmp.class = "box_ul_li";
                            this.licontainer.push(tmp);
                        }
                    })
                }



                /* else {

                     console.log("我到这里了，这里在筛选")
                     console.log(this.licontainer.length )
                     console.log(this.checkboxGroup1.length  )

                     for(var i = 0 ; i < this.licontainer.length ; i++){

                         var countMarry = 0 ;
                         for(var j = 0 ; j < this.checkboxGroup1.length ; j++){

                             if(this.licontainer[i].area === this.checkboxGroup1[j]){
                                 countMarry ++ ;
                             }
                         }
                         if(countMarry === 0 ){
                             this.licontainer.splice(i,1)
                         }

                     }
                 }*/

                /*this.checkboxGroup1 = undefined;
                this.checkboxGroup1= new Array();
                this.checkboxGroup2 = undefined;
                this.checkboxGroup2= new Array();
                this.checkboxGroup3 = undefined;
                this.checkboxGroup3= new Array();*/


            },

            intersectionBook(items){
                if(this.checkboxGroup1.length !==0){
                    console.log("这是在请求后台")
                    this.request.post("/bookinfor/intersectionBook/" + items + '/' +this.checkboxGroup1).then(re=>{
                        // this.licontainer = undefined
                        // this.licontainer = new Array
                        this.licontainer = re ;
                        console.log("这是在后台筛选后的li数据")
                        console.log(this.licontainer)

                    })
                }

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
            getLightNovel(){
                console.log(this. checkboxGroup1)

            },

            downloadEbook(item){
                console.log(item.enable)
                if(item.enable){
                    this.request.get("/file/judgeDownloadAuthority/"+item.bookid).then(res =>{
                        if(res){
                            window.open(item.bookUrl)
                        }
                        else{
                            this.$message.error("亲，您的下载权限不够，会员升级可以获得更多权限哦！")
                        }
                    })
                }
                else {
                    this.$message.error("亲，非常抱歉，该书籍目前在维修中无法下载或观看")
                }


            },
            read(item){

                console.log("这里是阅读界面的url")
                console.log(item.bookUrl)
                console.log(item.bookid)

                if(item.enable){
                    this.request.get("/file/judgeAuthority/"+item.bookid).then(res =>{
                        if(res){
                            this.$router.push({
                                path:'/readingByPdf',
                                query: {src: item.bookUrl},
                            })
                            item.clickNum++;

                            this.request.post("/bookinfor/update" , item).then(re =>{
                                if(re){
                                    console.log("点击量更新成功啦")
                                }

                            })


                        }
                        else{
                            this.$message.error("亲，您的阅读权限不够，会员升级可以获得更多权限哦！")
                        }
                    })
                }else {
                    this.$message.error("亲，非常抱歉，该书籍目前在维修中无法下载或观看")
                }


            },


            initData(){
                this.request.get("/bookinfor").then(res =>{
                    // console.log(res)
                    this.licontainer = undefined;
                    this.licontainer = new Array();
                    this.bookInfor = res
                    console.log("这里是bookInfor")
                    console.log(this.bookInfor)
                    for(var i = 0 ; i < this.bookInfor.length ; i++){
                        let tmp = this.bookInfor[i];
                        tmp.class ="box_ul_li";
                        this.licontainer.push(tmp);
                    }
                })

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
        width: 200px;
        height: 300px;
        box-shadow: 3px 2px 30px rgba(0,0,0,.1);
        float: left;
        text-align: center;
        position: relative;
        transition: all .6s ease-out;
        margin-left: 15px;
        margin-top: 20px;
        background: url("http://localhost:9099/file/eee79481325c4f798b202595d529c72f.jpg");
        /*background-size: cover;*/
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
        width: 160px;
        position: absolute;
        right: 26px;
        bottom: 10px;
        transition: all .6s ease-out;
    }
    .box ul .on{
        width: 220px;
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
        width: 200px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }




</style>

