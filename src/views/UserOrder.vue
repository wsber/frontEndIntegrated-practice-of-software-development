<template>
    <div>
        <div>
            <div style="padding: 10px 0">
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-custom" placeholder="请输入用户名" v-model="username"></el-input>
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-search" placeholder="请输入订单编号" v-model="ordernumber"></el-input>
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-reading" placeholder="请输入书名" v-model="bookname"></el-input>
                <el-button type="primary" @click="load">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </div>
            <div>
                <el-date-picker
                        v-model="times"
                        style="margin-right: 10px"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
                <el-button type="primary" @click="loadbookdate">按时间搜索</el-button>
            </div>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新进记录<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
            <el-popconfirm
                    style="margin-left: 5px"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="确认批量删除这些记录？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-delete" style="margin-left: 5px "></i></el-button>
            </el-popconfirm>
            <el-button type="primary" @click="exp" style="margin-left: 5px">导出 <i class="el-icon-top"></i></el-button>
            <el-upload action="http://localhost:9099/userorder/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
        </div>
        <div>
            <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">>
                <el-table-column type="selection" align="center" width="40"></el-table-column>
                <el-table-column prop="ordernumber" align="center" label="订单号码" width="150"></el-table-column>
                <el-table-column prop="userid" align="center" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="username" align="center" label="用户名" width="100"></el-table-column>
                <el-table-column prop="bookid" align="center" label="图书ID" width="120"></el-table-column>
                <el-table-column prop="bookname" align="center" label="书名" width="200"></el-table-column>
                <el-table-column prop="booknum" align="center" label="购买数量" width="70"></el-table-column>
                <el-table-column prop="singleprice" align="center" label="单价" width="70"></el-table-column>
                <el-table-column prop="totalprice" align="center" label="总价" width="70"></el-table-column>
                <el-table-column prop="ordertime" align="center" label="订单时间" width="170"></el-table-column>
                <el-table-column align="center" label="操作" >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                        <el-popconfirm
                                style="margin-left: 5px"
                                confirm-button-text='确定'
                                cancel-button-text='我再想想'
                                icon="el-icon-info"
                                icon-color="red"
                                title="确认删除此记录？"
                                @confirm="del(scope.row.ordernumber)"
                        >
                            <el-button size="mini" type="danger" slot="reference" >删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 15]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="订单信息" :visible.sync="editdialogFormVisible" width="40%">
                <el-form label-width="80px">
<!--                    <el-form-item label="订单号码" >-->
<!--                        <el-input v-model="form.ordernumber" autocomplete="off"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="用户ID" >
                        <el-input v-model="form.userid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" >
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图书ID" >
                        <el-input v-model="form.bookid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="书名" >
                        <el-input v-model="form.bookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单价" >
                        <el-input v-model="form.singleprice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="购买数量" >
                        <el-input v-model="form.booknum" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatesales">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="收款码" :visible.sync="paydialogFormVisible" width="20%">
                <img src="../assets/img/QR_Code.png" style="height: 220px;width: 200px">
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserOrder",
        data(){
            return{
                tableData:[],
                multipleSelection: [],
                form: {},
                total:0,
                pageNum:1,
                pageSize:5,
                userid:"",
                username: "",
                bookid:"",
                ordertime:"",
                singleprice: '',
                totalprice:'',
                bookname:"",
                ordernumber:"",
                booknum:'',
                author:"",
                times: null,
                headerBg: 'headerBg',
                editdialogFormVisible: false,
                paydialogFormVisible: false,
                myimg:"../assets/img/QR_Code.png"
            };
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                //请求分页查询
                this.request.get("/userorder/page",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        bookname : this.bookname,
                        author: this.author,
                        bookid: this.bookid,
                        username: this.username,
                        userid: this.userid,
                        ordernumber:this.ordernumber,
                        times: this.times
                    }
                }).then(res => {console.log(res)
                    this.tableData=res.records
                    this.total=res.total
                })
            },
            loaddate(){
                if(this.times!=null){
                    let [begin,end] = this.times
                    if(begin&&end){
                        this.begintime = new Date(begin)
                        this.endtime = new Date(end)
                    }
                }
                this.request.get("/userorder/page/date",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        bookname : this.bookname,
                        begintime:this.begintime,
                        endtime:this.endtime
                    }
                }).then(res => {console.log(res)
                    this.tableData=res.records
                    this.total=res.total
                })
            },
            reset() {
                this.bookname=""
                this.times=null
                this.ordernumber=""
                this.username =""
                this.load()
            },
            handleEdit(row){
                this.editdialogFormVisible=true
                this.form=row
            },
            handleSizeChange(pageSize){
                this.pageSize=pageSize
                this.load()
            },
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection=val
            },
            handleCurrentChange(pageNum){
                this.pageNum=pageNum
                this.load()
            },
            handleAdd(){
                this.editdialogFormVisible=true
                this.form={}
            },
            del(ordernumber){
                this.request.delete("/userorder/"+ordernumber).then(res =>{
                    if(res){
                        this.$message.success("删除成功")
                        this.load()
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },
            transforTime(nowDate) {

                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                    hour: nowDate.getHours(),
                    minute: nowDate.getMinutes(),
                    seconds: nowDate.getSeconds(),

                }
                if (parseInt(date.date) < 10) {
                    date.date = '0' + date.date
                }
                if (parseInt(date.month) < 10) {
                    date.month = '0' + date.month
                }
                if (parseInt(date.hour) < 10) {
                    date.hour = '0' + date.hour
                }
                if (parseInt(date.minute) < 10) {
                    date.minute = '0' + date.minute
                }
                if (parseInt(date.seconds) < 10) {
                    date.seconds= '0' + date.seconds
                }
                this.systemTime = date.year + '-' + date.month + '-' + date.date +" " + date.hour + ":" + date.minute +":" +date.seconds;
                // console.log(this.systemTime)
                return this.systemTime
            },
            loadbookdate(){
                if(this.times!=null){
                    let begin = this.times[0]
                    let end = this.times[1]
                    console.log("这里是开始时间")
                    console.log(begin)
                    console.log(end)

                    this.begintime = this.transforTime(begin)
                    this.endtime = this.transforTime(end)
                    console.log(this.begintime)
                    console.log(this.endtime)


                }
                this.request.get("/userorder/page/date",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        begintime: this.begintime,
                        endtime: this.endtime
                    }
                }).then(res => {console.log(res)
                    this.tableData=res.records
                    this.total=res.total
                })
            },

            save(){
                this.request.post("/userorder",this.form).then(res =>{
                    if(res){
                        this.$message.success("保存成功")
                        this.editdialogFormVisible=false
                        //this.updatesales()
                        this.load()
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
            delBatch(){
                let orders = this.multipleSelection.map(v => v.ordernumber)
                this.request.post("/userorder/del/batch",orders).then(res =>{
                    if(res){
                        this.$message.success("批量删除成功")
                        this.load()
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            handleAddBook(){
                this.request.post("/userorder",this.form).then(res =>{
                    if(res){
                        this.$message.success("添加成功")
                        this.editdialogFormVisible=false
                        this.updatesales()
                        this.load()
                    }else {
                        this.$message.error("添加失败")
                    }
                })
            },
            exp() {
                window.open("http://localhost:9099/userorder/export")
            },
            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.load()
            },
            updatesales(){
                this.request.post("/userorder/updatesales",this.form).then(res =>{
                    if(res=='1'){
                        this.save()
                        this.$message.success("更新成功")
                        this.editdialogFormVisible=false
                        this.load()
                    }else if(res == '-3'){
                        this.$message.error("请完善订单信息")
                    }else if(res == '-2'){
                        this.$message.error(this.form.bookname+"库存不足")
                        this.editdialogFormVisible=false
                    }else if(res == '-1'){
                        this.$message.error(this.form.bookname+"不存在，或核对图书ID")
                        this.editdialogFormVisible=false
                    }else if(res == '-4'){
                        this.$message.error("账户余额不足")
                        this.editdialogFormVisible=false
                        this.paydialogFormVisible=true
                    }else if(res == '-5'){
                        this.save()
                        this.paydialogFormVisible=true
                        this.editdialogFormVisible=false
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>