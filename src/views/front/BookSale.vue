<template>
    <div >

        <el-carousel :interval="2500" type="card" height="450px" style="background-size: cover">
            <el-carousel-item v-for="item1 in this.imgs"  :key="item1">
                <img :src="item1" alt="img" style="width: 100% ;height: inherit">
            </el-carousel-item>
        </el-carousel>



        <div class="box" id="app" >
            <ul>
                <li :class="item.class"  v-for="item in licontainer" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-button class="button" type = "primary"  @click="buy(item)">购买</el-button>
                    <img :src="item.cover" alt="img">
                    <h3>{{item.bookname}}</h3>
                    <p>{{item.text}}</p>
                </li>
                <div style="clear: both"></div>
            </ul>
        </div>



        <div style="height: 20px"></div>
        <div style = "width:100%;height:50px;border-top:3px solid  #55cae5">
            <div>
                <br/>
                <h1 style = "text-align: center; font-family: 'Times New Roman','华光楷体_CNKI';color: firebrick ">旧书打折区，块来看看有没有心仪的图书吧！</h1>
            </div>
        </div>


        <div style = "padding-left:10px;padding-top: 20px">
            <div class="box" id="app2" >
                <ul>
                    <li :class="item.class"  v-for="item in licontainer2" @mouseover="changeActive($event)" @mouseleave="removeActive($event)">
                        <el-button class="button" type = "primary"  @click="buy2(item)">购买</el-button>
                        <img :src="item.cover" alt="img">
                        <h3>{{item.bookname}}</h3>
                        <p>{{item.text}}</p>
                    </li>
                    <div style="clear: both"></div>
                </ul>
            </div>

        </div>


        <el-dialog :visible.sync="dialogVisible1"  title="订单生成" width = "30%">
            <el-form ref = "orderdialog" :model="orderdialog" label-width="120px">
                <el-form-item label = "书名">
                    <span  style = "width:80%">{{orderdialog.bookname}}</span>
                </el-form-item>
                <el-form-item label = "单价：">
                    <span  style = "width:80%">￥ {{orderdialog.originalPrice}}</span>
                </el-form-item>
                <el-form-item label = "库存量：">
                    <span  style = "width:80%">{{orderdialog.stockNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销量： {{orderdialog.sales}}</span>
                </el-form-item>
                <el-form-item label = "图片">
                    <img :src = "orderdialog.cover" style = "width:70%" />
                </el-form-item>
                <el-form-item prop ="buynum" label = "数量">
                    <el-input v-model = "orderdialog.booknum" style = "width:50%" type="number"></el-input>
                </el-form-item>
                <el-form-item prop ="tel" label = "电话">
                    <el-input v-model = "orderdialog.tel" style = "width:50%" type="tel"></el-input>
                </el-form-item>
                <el-form-item label = "备注">
                    <el-input v-model = "orderdialog.tip" style = "width:70%" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取消</el-button>
                <el-button type="primary" @click="checkorder()">提交订单</el-button>
              </span>
            </template>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible2" title="订单" width = "30%">


            <el-form :model="orderdialog" label-width="120px">
                <el-form-item label = "订单号">
                    <span  style = "width:90%">{{orderdialog.ordernumber}}</span>
                </el-form-item>
                <el-form-item label = "书名">
                    <span  style = "width:80%">{{orderdialog.bookname}}</span>
                </el-form-item>

                <el-form-item label = "">
                    <div>
                        <img :src = "orderdialog.cover" style = "padding-left:10px;width:70%" />
                        <div style = "padding-right: 5px;width:70%">
                            <span style = "font-color:#0f67ce">×{{orderdialog.booknum}}</span>
                        </div>
                    </div>
                    <div style = "padding-right: 5px;font-weight:bold;color:#c9345c;width:70%">
                        <span style = "font-color:#55e0e5">应支付：</span><span >{{orderdialog.totalprice}}</span>
                    </div>
                </el-form-item>
                <el-form-item label = "电话">
                    <span>{{orderdialog.tel}}</span>
                </el-form-item>
                <el-form-item label = "备注">
                    <span>{{orderdialog.tip}}</span>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                  <el-button type="primary"  @click="againEidt">重新编辑</el-button>
                  <el-button @click="dialogVisible2 = false">取消</el-button>
                  <el-button type="primary" @click="payForOrder">确认订单并支付</el-button>
              </span>
            </template>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible3"  title="订单生成" width = "30%">
            <el-form ref = "orderdialog" :model="orderdialog" label-width="120px">
                <el-form-item label = "书名：">
                    <span  style = "width:80%">{{orderdialog.bookname}}</span>
                </el-form-item>
                <el-form-item label = "原价：">
                    <span  style = "width:80%">￥ {{orderdialog.originalPrice}}</span>
                </el-form-item>
                <el-form-item label = "折扣：">
                    <span class="el-icon-discount" style = "width:80%">{{orderdialog.discount}}折</span>
                </el-form-item>
                <el-form-item label = "库存量：">
                    <span  style = "width:80%">{{orderdialog.stockNum}}&nbsp;&nbsp;&nbsp;销量： {{orderdialog.sales}}</span>
                </el-form-item>
                <el-form-item label = "图片：">
                    <img :src = "orderdialog.cover" style = "width:70%" />
                </el-form-item>
                <el-form-item prop ="buynum" label = "数量：">
                    <el-input v-model = "orderdialog.booknum" style = "width:50%" type="number"></el-input>
                </el-form-item>
                <el-form-item prop ="tel" label = "电话：">
                    <el-input v-model = "orderdialog.tel" style = "width:50%" type="tel"></el-input>
                </el-form-item>
                <el-form-item label = "备注：">
                    <el-input v-model = "orderdialog.tip" style = "width:70%" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取消</el-button>
                <el-button type="primary" @click="checkorder()">提交订单</el-button>
              </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: "BookSale",
        created() {
            this.initData();
            //this.dataRefresh();
        },
        destroyed(){
            // 在页面销毁后，清除计时器
            this.clear();
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem("user")),

                bookname: "",
                authorName:"",
                memberName:"",
                checkboxGroup1:[],
                checkboxGroup2: [],
                checkboxGroup3: [],
                networkNovels:['穿越', '玄幻', '武侠', '都市','修仙','奇幻'],
                traditionalLiteratures: ['哲学', '散文', '诗歌', '科幻'],
                comics: ['热血', '休闲', '校园'],
                imgs:[
                    'http://localhost:9099/file/73e921b2a67849c8ab712978e28ec7bd.png',
                    'http://localhost:9099/file/30218b32cb5140dfaa3b89fa21badb05.png',
                    'http://localhost:9099/file/a9b4d3f6a27846bd99246dbdcd8c8907.png',
                    ' http://localhost:9099/file/e0ce5087dd15448ea5621c9c4d36be96.jpg',
                ],
                licontainer:[],
                licontainer2:[],
                bookInfor:[],
                bookAuthority: false,
                userid:{},
                bufferTheme:[],

                XcardData:[],
                YcardData:[],
                info: {},
                orderdialog: {},
                intervalId:null,
                dialogVisible: false,
                dialogVisible1: false,
                dialogVisible2: false,//确认订单对话框
                dialogVisible3:false,
                rules: {
                    booknum: [
                        {required: true, message: '请输入数量', trigger: 'blur'},
                    ],
                    tel: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            showinfo(item) {
                this.info = item;
                this.dialogVisible = true;
            },
            buy(item) {
                this.orderdialog = item
                console.log("这里是购买")
                console.log(this.orderdialog)
                this.dialogVisible1 = true
                // this.orderdialog.bookid = item.id;
                // this.orderdialog.bookname = item.bookname;
                this.orderdialog.singleprice = item.originalPrice;
                // this.orderdialog.cover = item.cover;
            },
            buy2(item) {
                this.orderdialog = item
                console.log("这里是购买")
                console.log(this.orderdialog)
                this.dialogVisible3 = true
                // this.orderdialog.bookid = item.id;
                // this.orderdialog.bookname = item.bookname;
                this.orderdialog.singleprice = item.originalPrice;
                // this.orderdialog.cover = item.cover;
            },
            checkorder() {
                this.$refs['orderdialog'].validate((valid) => {
                    if (valid) {
                        this.request.get("/userorder/number").then(res => {
                            if (res.code === '200') {
                                this.orderdialog.ordernumber = res.data;
                                this.dialogVisible1 = false;
                                this.orderdialog.totalprice = this.orderdialog.singleprice *
                                    this.orderdialog.booknum * this.orderdialog.discount;
                                this.dialogVisible2 = true;
                            } else {
                                this.$message({
                                    type: "error",
                                    message: '订单生成失败',
                                })
                                this.dialogVisible1 = false;
                            }
                        })
                    }
                })
            },
            againEidt() {
                this.dialogVisible2 = false;
                this.dialogVisible1 = true;
            },
            payForOrder() {
                this.orderdialog.username = this.user.username;
                this.orderdialog.userid = this.user.userid;
                console.log(this.orderdialog);
                this.request.post("/userorder/payorder", this.orderdialog).then(res => {
                    if (res.code === '200') {
                        this.$message({
                            type: "success",
                            message: '购买成功',
                        })
                        this.dialogVisible2 = false;
                        this.load();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg,
                        })
                    }
                })
            },
            dataRefresh() {
                // 计时器正在进行中，退出函数
                if (this.intervalId != null) {
                    return;
                }
                // 计时器为空，操作
                this.intervalId = setInterval(() => {
                    console.log("刷新" + new Date());
                    this.initData(); //加载数据函数
                }, 5000);
            },
            initData() {
                //user=JSON.parse(sessionStorage.getItem("user"));
                this.request.get("/bookinfor/saleinfo").then(res => {
                    console.log(res)
                    if (res.code !== '200') {
                        this.$message({
                            type: "error",
                            message: res.msg,
                        })
                    } else {
                        this.XcardData = res.data;
                        for(var i = 0 ; i < this.XcardData.length ; i++){
                            let tmp = this.XcardData[i];
                            tmp.class ="box_ul_li";
                            this.licontainer.push(tmp);
                        }
                    }
                })
                this.request.get("/bookinfor/saleinfo2").then(res => {
                    console.log(res)
                    if (res.code !== '200') {
                        this.$message({
                            type: "error",
                            message: res.msg,
                        })
                    } else {
                        this.YcardData = res.data;
                        this.bookInfor = this.YcardData
                        for(var i = 0 ; i < this.YcardData.length ; i++){
                            let tmp = this.YcardData[i];
                            tmp.class ="box_ul_li";
                            this.licontainer2.push(tmp);
                        }
                    }
                })
            },

            reset(){
                this.bookname ="",
                    this.memberName = "",
                    this.authorName ="",
                    this.initData()
            },
            searchBooks(){
                // console.log(this. checkboxGroup1)
                this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup1).then(res=>{
                    console.log(res)
                    this.licontainer = [];
                    this.bufferTheme = res.data;
                    console.log(this.bufferTheme)
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = {}
                        tmp.class ="box_ul_li";
                        tmp.name =  this.bufferTheme[i].bookname;
                        tmp.src =  this.bufferTheme[i].cover;
                        tmp.bookid =  this.bufferTheme[i].bookid;
                        tmp.bookUrl =  this.bufferTheme[i].bookUrl;
                        this.licontainer.push(tmp);
                    }
                })
                // console.log(this. checkboxGroup2)
                this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup2).then(res=>{
                    console.log(res)
                    this.bufferTheme = res.data;
                    console.log(this.bufferTheme)
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = {}
                        tmp.class ="box_ul_li";
                        tmp.name =  this.bufferTheme[i].bookname;
                        tmp.src =  this.bufferTheme[i].cover;
                        tmp.bookid =  this.bufferTheme[i].bookid;
                        tmp.bookUrl =  this.bufferTheme[i].bookUrl;
                        this.licontainer.push(tmp);
                    }
                })
                // console.log(this. checkboxGroup3)
                this.request.get("/bookinfor/searchBookTheme/" + this.checkboxGroup3).then(res=>{
                    console.log(res)
                    this.bufferTheme = res.data;
                    console.log(this.bufferTheme)
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = {}
                        tmp.class ="box_ul_li";
                        tmp.name =  this.bufferTheme[i].bookname;
                        tmp.src =  this.bufferTheme[i].cover;
                        tmp.bookid =  this.bufferTheme[i].bookid;
                        tmp.bookUrl =  this.bufferTheme[i].bookUrl;
                        this.licontainer.push(tmp);
                    }
                })
            },
            likeSearchBooks(){
                this.request.get("/bookinfor/likeSearchBooks" , {
                    params:{
                        bookname: this.bookname,
                        memberName: this.memberName,
                        authorName: this.authorName,
                    }
                }).then(res=>{
                    console.log(res)
                    this.licontainer = [];
                    this.bufferTheme= [];
                    this.bufferTheme = res.data;
                    console.log(this.bufferTheme)
                    for(var i = 0 ; i <  this.bufferTheme.length ; i++){
                        let tmp = {}
                        tmp.class ="box_ul_li";
                        tmp.name =  this.bufferTheme[i].bookname;
                        tmp.src =  this.bufferTheme[i].cover;
                        tmp.bookid =  this.bufferTheme[i].bookid;
                        tmp.bookUrl =  this.bufferTheme[i].bookUrl;
                        this.licontainer.push(tmp);
                    }
                })
            },

            changeActive($event) {
                $event.currentTarget.className = 'box_ul_li on';
            },
            removeActive($event) {
                $event.currentTarget.className = 'box_ul_li';
            },




            // 停止定时器
            clear() {
                clearInterval(this.intervalId); //清除计时器
                this.intervalId = null; //设置为null
            },
        }
    }

</script>

<style scopeder>
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
        background: url("http://localhost:9099/file/fe9026ce6217435ab6cc47d367dbec20.jpg");
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
        height: 220px;
        position: absolute;
        right: 26px;
        bottom: 10px;
        transition: all .6s ease-out;
    }
    .box ul .on{
        width: 250px;
        height: 350px;
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
        width: 230px;
        height: 300px;
        position: absolute;
        right: 8px;
        bottom: 10px;
        border: 2px #3e3d3d solid;
    }


</style>