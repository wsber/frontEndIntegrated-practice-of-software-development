<template>
    <div>
        <div style="padding:  10px 0">
            <el-input style=" width:200px" placeholder="请输入书名" suffix-icon="el-icon-reading" v-model = "bookname"></el-input>
            <el-input style=" width:200px" placeholder="请输入阅读权限" suffix-icon="el-icon-loading" class = "ml-5" v-model = "readingPrivilege"></el-input>
            <el-input style=" width:200px" placeholder="请输入作者名" suffix-icon="el-icon-user" class = "ml-5" v-model = "authorName"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新进图书<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
            <el-popconfirm
                    style="margin-left: 5px"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="确认批量删除这些记录？"
                    @confirm="delBatch">
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-delete" style="margin-left: 5px "></i></el-button>
            </el-popconfirm>
            <el-button type="primary" @click="exp" style="margin-left: 5px">导出 <i class="el-icon-top"></i></el-button>
            <el-upload action="http://localhost:9099/storeorder/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
        </div>


        <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column type="selection" align="center" width="40"></el-table-column>
            <el-table-column prop="bookname" label="书名" align="center" width="140"></el-table-column>
            <el-table-column prop="authorName" label="作者名" width="140" align="center"></el-table-column>
            <el-table-column label="启用" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="readingPrivilege" label="阅读权限" align="center" width="120"></el-table-column>
            <el-table-column prop="cover" label="封面"align="center">
                <template #default="scope">
                    <img :src="scope.row.cover" style="width: 50px; height: 80px">
                </template>
            </el-table-column>
            <el-table-column prop="theme" label=" 主题"align="center"></el-table-column>
            <el-table-column prop="clickNum" label="点击量"align="center"></el-table-column>
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
                            @confirm="del(scope.row.bookid)">
                        <el-button size="mini" type="danger" slot="reference" >删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-dialog title="图书信息" :visible.sync="editdialogFormVisible" width="40%">
                <el-form label-width="80px">
                    <el-form-item label="书名" >
                        <el-input v-model="form.bookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" >
                        <el-input v-model="form.authorName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" >
                        <el-input v-model="form.synopsis" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="阅读权限" >
                        <el-input v-model="form.readingPrivilege" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="主题" >
                        <el-input v-model="form.theme" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地区" >
                        <el-input v-model="form.area" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="添加书籍封面" >
                        <el-upload
                                style="text-align: center ;padding-bottom: 10px"
                                class="avatar-uploader"
                                action="http://localhost:9099/file/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                            <img v-if="form.cover" :src="form.cover" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传电子图书资源" >
                        <el-upload
                                class="upload-demo"
                                action="http://localhost:9099/file/upload"
                                :on-preview="handlePreview"
                                multiple
                                :limit="1"
                                :on-success="handlePdfSuccess"
                                v-model= "form.bookUrl"
                               >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且只能上传一个</div>
                        </el-upload>
                    </el-form-item>
<!--                    <el-form-item label="总价" >-->
<!--                        <el-input v-model="form.totalprice" autocomplete="off"></el-input>-->
<!--                    </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </div>
            </el-dialog>
        </div>



        <!--下面为页面转换按钮 -->
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

    </div>
    
</template>

<script>
    export default {
        name: "BookSailingUser",

        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,



                username: "",
                nickname: "",
                phone: "",
                email: "",
                address: "",
                theme:"",

                bookname: "",
                authorName: "",
                readingPrivilege: "",

                bookUrl:"",

                form: {},
                dialogFormVisible: false,
                editdialogFormVisible:false,
                multipleSelection: [],

            }
        },

        created() {

            this.load()

        },

        methods:{

            changeEnable(row) {
                console.log(row)
                console.log("这里是该图书的信息")
                this.request.post("/bookinfor/update", row).then(res => {
                    if (res.code === '200') {
                        this.$message.success("操作成功")
                    }
                    else {
                        this.$message.error("操作失败")
                    }
                })
            },

            handlePreview(){

            },
            reset(){
                this.bookname ="",
                    this.readingPrivilege = "",
                    this.authorName ="",
                    this.load()
            },
            handleAdd(){
                this.editdialogFormVisible = true
                this.form = {}
            },
            load(){
                this.request.get("/bookinfor/page" , {
                    params:{
                        pageNum: this.pageNum ,
                        pageSize: this.pageSize,
                        bookname: this.bookname,
                        readingPrivilege: this.readingPrivilege,
                        authorName: this.authorName,
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                })
            },
            save(){
                this.request.post("/bookinfor" , this.form).then(res =>{
                    //console.log(res)
                    if(res){
                        this.$message.success("保存成功")
                        this.editdialogFormVisible=false
                        this.load()
                    }
                    else{
                        this.$message.error("保存失败")
                    }

                })

            },
            delBatch(){
                let bookids = this.multipleSelection.map(v => v.bookid)
                this.request.post("/bookinfor/del/batch",bookids).then(res =>{
                    if(res){
                        this.$message.success("批量删除成功")
                        this.load()
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            del(bookid){
                this.request.delete("/bookinfor/"+bookid).then(res =>{
                    if(res){
                        this.$message.success("删除成功")
                        this.load()
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },

            handleEdit(row){
                this.editdialogFormVisible=true
                this.form=row
            },
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection=val
            },
            handleAvatarSuccess(res){
                this.form.cover = res

            },
            handlePdfSuccess(res){
                console.log(res)
                this.form.bookUrl = res
            },
            handleSizeChange(pageSize){
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum){
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },

            exp() {
                window.open("http://localhost:9099/bookinfor/export")
            },
            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.load()
            },


        }



    }



</script>

<style scoped>

</style>

<style>
    .headerBg{
        background-color: aqua !important;
    }
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