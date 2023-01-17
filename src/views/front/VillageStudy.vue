
<template>
    <div :style="bgImg" >
        <br>
        <div style="display: flex; margin-left: 310px">
            <el-tag type="success" style="height: 35px; width:110px; font-size:20px; margin-right: 30px; margin-bottom: 5px">地区:</el-tag>
            <el-checkbox-group  v-model="checkboxGroup1">
                <el-checkbox-button  v-for=" area in areas" :label="area" >{{area}}</el-checkbox-button>
            </el-checkbox-group>
        </div>

        <div >
            <div style="display: flex; margin-left: 310px; margin-top: 10px">
                <el-tag  style="height: 35px; width:110px; font-size:20px; margin-right: 30px; margin-bottom: 5px">书籍种类:</el-tag>
                <el-checkbox-group v-model=" checkboxGroup2" @change="getLightNovel">
                    <el-checkbox-button  v-for="lightNovel  in lightNovels " :label="lightNovel" >{{lightNovel}}</el-checkbox-button>
                    <el-button style="margin-left: 50px;"
                               icon="el-icon-search" type = "success"  @click="searchBooksWithKeys()">搜 索</el-button>
                </el-checkbox-group>
            </div>



        </div>


        <div style="margin-top: 20px; margin-left: 310px; padding:  10px 0">
            <el-input style=" width:200px" placeholder="请输入书名" suffix-icon="el-icon-reading" v-model = "bookname"></el-input>
            <!--            <el-input style=" width:200px" placeholder="请输入会员名称" suffix-icon="el-icon-loading" class = "ml-5" v-model = "memberName"></el-input>-->
            <el-select style=" margin-left: 5px" v-model="memberName" placeholder="请选择会员等级">
                <el-option label="普通会员" value="普通会员"></el-option>
                <el-option label="白银会员" value="白银会员"></el-option>
                <el-option label="黄金会员" value="黄金会员"></el-option>
                <el-option label="铂金会员" value="铂金会员"></el-option>
                <el-option label="钻石会员" value="钻石会员"></el-option>
                <el-option label="超级大会员" value="超级大会员"></el-option>
            </el-select>
            <el-input style=" margin-left: 5px;width:200px" placeholder="请输入作者名" suffix-icon="el-icon-user" class = "ml-5" v-model = "authorName"></el-input>
            <el-button style=" margin-left: 5px" class="ml-5" type="primary" @click="likeSearchBooks">搜索</el-button>
            <el-button style=" margin-left: 25px" class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin-top: 10px">
            <el-drawer
                    title="书籍详细信息"
                    :visible.sync="drawer"
                    :direction="direction"
                    :before-close="handleClose"
                    :wrapper-closable="true">
                <div style="margin-left: 20px">
                    <div style="display: flex">
                        <img :src="detailBookInformation.cover"
                             class="image"
                             style="width: 150px; height: 202px;margin-top: 5px"
                        />
                        <div style="margin-left: 20px;">
                            <span style="font-weight: bold;font-size:x-large">{{detailBookInformation.bookname}}</span>
                            <br/>
                            <div style="margin-top: 80px;font-weight: lighter">作者：{{detailBookInformation.authorName}}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-left: 130px; margin-top: 50px;">
                    <el-button type = "success" class="ml-5" @click="read(detailBookInformation)">阅读</el-button>
                    <el-button type = "primary" @click="downloadEbook(detailBookInformation)">下载</el-button>
                    <el-button type = "primary"@click="collectEbook(detailBookInformation)">收藏</el-button>
                </div>
                <div style="margin-left: 230px; margin-top: 50px;font-weight: bold;font-size: large">简介</div>
                <div style="margin-top: 10px;font-weight: lighter">{{detailBookInformation.synopsis}}</div>
            </el-drawer>
        </div>



        <div class="box" id="app" >
            <ul>
                <li :class="item.class"  v-for="item in licontainer" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-button type="text" @click="lookUpDetailedInformation(item)" style="font-size: 15px; color: #ef2d84">查看详细信息</el-button>
                    <img :src="item.cover" alt="img">
                    <h3>{{item.bookname}}</h3>
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
        data(){
            return {
                bgImg: {
                    // backgroundImage: "url('http://localhost:9099/file/6ec29d00ba2142c6a54191c6783176eb.jfif')",
                    backgroundImage: "url('http://localhost:9099/file/2f7294f8f4b744d1a6e8774ad1b1fdaf.jpg')",
                    // backgroundImage: "url('http://localhost:9099/file/58303b74d81c4073adac49589836bc9c.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center top',
                },
                //抽屉特效
                drawer: false,
                direction: 'ltr',
                detailBookInformation:{},
                bookname: "",
                authorName:"",
                memberName:"",
                checkboxGroup1:[],
                checkboxGroup2: [],
                areas: ['中国', '欧美', '日韩','拉美'],
                lightNovels: ['小说', '文学', '艺术','娱乐时尚','旅游','地图地理'],
                licontainer:[],
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
                this.detailBookInformation = item
                this.drawer = true
                console.log(this.detailBookInformation)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            reset(){
                this.bookname ="",
                    this.memberName = "",
                    this.authorName ="",
                    this.initData()
            },
            likeSearchBooks(){
                this.licontainer = undefined;
                this.licontainer = new Array();
                this.request.get("/bookinfor/likeSearchBooks" , {
                    params:{
                        bookname: this.bookname,
                        memberName: this.memberName,
                        authorName: this.authorName,
                        bookType: 0
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
                        this.licontainer.push(tmp);
                    }
                    console.log(this.licontainer)
                    console.log("这里模糊查询的licontainer")
                })
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
                                    console.log("点击量更新成功")
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
                this.request.get("/bookinfor/search/village").then(res =>{
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
            searchBooksWithKeys(){
              console.log('这里是地区',this.checkboxGroup1)
              console.log('这里是书籍主题',this.checkboxGroup2)
              this.request.get("/bookinfor/search/village/key?bookAreas=" + this.checkboxGroup1 +"&bookTypes=" + this.checkboxGroup2).then(res=>{
                      console.log('这里是交集后的书',res)
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
            },


    //     ,{
    //     params:{
    //         bookAreas: [this.checkboxGroup1],
    //             memberName: [this.checkboxGroup2],
    //     }
    // }


            getLightNovel(){
                console.log(this. checkboxGroup1)
                console.log(this. checkboxGroup2)

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
        width: 150px;
        height: 220px;
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
        height: 280px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }




</style>

