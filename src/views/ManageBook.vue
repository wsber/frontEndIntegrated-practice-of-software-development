<template>
    <div>
        <div>
            <div style="padding: 10px 0">
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-search" placeholder="请输入书名" v-model="bookname"></el-input>
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-edit" placeholder="请输入作者名" v-model="authorName"></el-input>
                <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-collection" placeholder="请输入图书id" v-model="bookid"></el-input>
<!--                <el-form>-->
<!--                    <el-form-item>-->
                    <el-button type="primary" @click="loadbook">搜索</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
<!--                    </el-form-item>-->
<!--                </el-form>-->
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
            <!--            <el-button type="primary" @click="handleAdd">新进图书<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>-->
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
            <el-upload action="http://localhost:9099/bookinfor/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
        </div>
        <div>
            <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">>
                <el-table-column type="selection" align="center" width="40"></el-table-column>
                <el-table-column prop="cover" align="center" label="封面" width="100">
                    <template #default="scope">
                        <img :src="scope.row.cover" style="width: 50px; height: 80px">
                    </template>
                </el-table-column>
                <el-table-column prop="bookname" align="center" label="书名" width="150"></el-table-column>
                <el-table-column prop="bookid" align="center" label="图书ID" width="120"></el-table-column>
                <el-table-column prop="authorName" align="center" label="作者名" width="100"></el-table-column>
                <el-table-column prop="sales" align="center" label="销量" width="50"></el-table-column>
                <el-table-column prop="stockNum" align="center" label="库存量" width="70"></el-table-column>
                <el-table-column prop="transBuyTime" align="center" label="进货时间" width="200">
<!--                    <template slot-scope="scope">-->
<!--                        {{-->
<!--                         scope.row.buyTime-->
<!--                        }}-->
<!--                    </template>-->
                </el-table-column>
                <el-table-column prop="originalPrice" align="center" label="原价" width="70"></el-table-column>
                <el-table-column prop="oldbook" align="center" label="图书状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.oldbook=='0'">新进图书</span>
                        <span v-if="scope.row.oldbook=='1'">旧书促销</span>
                    </template>
                </el-table-column>
                <el-table-column prop="discount" align="center" label="折扣" width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.discount==1">不打折</span>
                        <span v-if="scope.row.discount<1">{{scope.row.discount}}折</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm
                                style="margin-left: 5px"
                                confirm-button-text='确定'
                                cancel-button-text='我再想想'
                                icon="el-icon-info"
                                icon-color="red"
                                title="确认删除此记录？"
                                @confirm="del(scope.row.bookid)"
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
            <el-dialog title="图书信息" :visible.sync="infodialogFormVisible" width="40%">
                <el-form label-width="80px">
                    <!--                    <el-form-item label="图书ID" >-->
                    <!--                        <el-input v-model="form.bookid" autocomplete="off"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="书名" >
                        <el-input v-model="form.bookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" >
                        <el-input v-model="form.authorName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" >
                        <el-input v-model="form.synopsis" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="添加图片" >
                        <el-upload
                                class="avatar-uploader"
                                :action="getUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="进货量" >
                        <el-input v-model="form.stockNum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍单价" >
                        <el-input v-model="form.originalPrice" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="infodialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddBook">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="图书信息" :visible.sync="editdialogFormVisible" width="40%">
                <el-form label-width="80px">
                    <el-form-item label="图书ID" >
                        <el-input v-model="form.bookid" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="书名" >
                        <el-input v-model="form.bookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" >
                        <el-input v-model="form.authorName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" >
                        <el-input v-model="form.synopsis" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="封面" >
                        <el-upload
                                class="avatar-uploader"
                                :action="getUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.cover" :src="form.cover" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="现有库存" >
                        <el-input v-model="form.stockNum" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="销量" >
                        <el-input v-model="form.sales" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="原价" >
                        <el-input v-model="form.originalPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图书状态" >
                        <template>
                            <el-button v-if="form.oldbook==='0'" type="primary" :disabled="bookStatus" @click="changeBookStatus(form.oldbook)">新书->旧书</el-button>
                            <el-button v-if="form.oldbook==='1'" type="primary" :disabled="true">旧书</el-button>
                        </template>
                    </el-form-item>
                    <el-form-item label="折扣" >
                        <el-input v-model="form.discount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {parseTime} from "../utils/date";
    export default {
        name: "ManageBook",
        data(){
            return{
                tableData:[],
                multipleSelection: [],
                form: {},
                total:0,
                pageNum:1,
                pageSize:5,
                begintime:new Date(),
                endtime:new Date(),
                bookid:"",
                cover:"",
                bookname:"",
                synopsis:"",
                sales:'',
                stockNum:'',
                clickNum:"",
                authorName:"",
                buyTime:"",
                buynum:"",
                originalPrice:"",
                reading_privilege:"",
                times: null,
                headerBg: 'headerBg',
                infodialogFormVisible: false,
                editdialogFormVisible: false,
                imageUrl:"",
                bookStatus:false,
                systemTime:''
            };
        },
        created() {
            this.loadbook()
        },
        methods:{
            loadbook(){
                //请求分页查询
                this.request.get("/bookinfor/page2",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        bookname : this.bookname,
                        authorName: this.authorName,
                        bookid: this.bookid,
                        buyTime: this.buyTime,
                    }
                }).then(res => {console.log(res)
                    this.tableData=res.records
                    console.log(this.tableData)
                    for(var i = 0  ;i <this.tableData.length ; i++){
                        this.tableData[i].transBuyTime = this.tableData[i].buyTime[0] + "-" +this.tableData[i].buyTime[1]+ "-" + this.tableData[i].buyTime[2] +" " + this.tableData[i].buyTime[3] +":" +this.tableData[i].buyTime[4] +":"+this.tableData[i].buyTime[5];
                        console.log(this.tableData[i].buyTime)
                    }

                    this.total=res.total
                })
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
                this.request.get("/bookinfor/page/date",{
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
            reset() {
                this.bookname=""
                this.authorName=""
                this.times=[]
                this.bookid=""
                this.loadbook()
            },
            handleEdit(row){
                this.editdialogFormVisible=true
                this.form=row
            },
            handleSizeChange(pageSize){
                this.pageSize=pageSize
                this.loadbook()
            },
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection=val
            },
            handleCurrentChange(pageNum){
                this.pageNum=pageNum
                this.loadbook()
            },
            handleAdd(){
                this.infodialogFormVisible=true
                this.form={}
            },
            del(bookid){
                this.request.delete("/bookinfor/"+bookid).then(res =>{
                    if(res){
                        this.$message.success("删除成功")
                        this.loadbook()
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },
            save(){
                this.request.post("/bookinfor",this.form).then(res =>{
                    if(res){
                        this.$message.success("保存成功")
                        this.editdialogFormVisible=false
                        this.loadbook()
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
            delBatch(){
                let bookids = this.multipleSelection.map(v => v.bookid)
                this.request.post("/bookinfor/del/batch",bookids).then(res =>{
                    if(res){
                        this.$message.success("批量删除成功")
                        this.loadbook()
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            handleAddBook(){
                this.request.post("/bookinfor",this.form).then(res =>{
                    if(res){
                        this.$message.success("添加成功")
                        this.infodialogFormVisible=false
                        this.loadbook()
                    }else {
                        this.$message.error("添加失败")
                    }
                })
            },
            exp() {
                window.open("http://localhost:9099/bookinfor/export")
            },
            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.load()
            },
            handleAvatarSuccess(res, file) {
                this.cover = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getUrl(){
                this.request.post("/bookinfor/upload").then(res =>{
                    if(res){
                        this.$message.success("添加成功")
                        this.infodialogFormVisible=false
                        this.loadbook()
                    }else {
                        this.$message.error("添加失败")
                    }
                })
            },

            changeBookStatus(oldbook){
                this.form.oldbook='1'
                this.bookStatus=true
            }
        }

    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>