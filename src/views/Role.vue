<<template>
    <div>
        <div style="padding:  10px 0">
            <el-input style=" width:200px" placeholder="请输入真实姓名" suffix-icon="el-icon-reading" v-model = "name"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin:  10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger" @click="delBatch">批量辞退<i class="el-icon-remove-outline"></i></el-button>
            <el-upload action="http://localhost:9099/role/import" accept=" xlsx " :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary"class="ml-5">导入<i class="el-icon-bottom"></i></el-button>
            </el-upload>

            <el-button type="primary" @click ="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="操作"width="300">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handleEdit(scope.row)">修改员工信息<i class="el-icon-folder"></i> </el-button>
                    <el-popconfirm
                            class= "ml-5"
                            confirm-button-text='确定辞退'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定要辞退该员工吗？"
                            @confirm="deleteEmployee(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference" >辞退该员工<i class="el-icon-remove-outline"></i> </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
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

        <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
                <el-form-item label="用户名" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" >
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "Role",


        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,



                name: "",
                description: "",

                form: {},
                multipleSelection:[],
                dialogFormVisible: false,
                formLabelWidth:"120"
            }
        },

        created() {

            this.load()

        },

        methods:{

            reset(){
                this.name ="",
                    this.load()
            },
            handleAdd(){
                this.dialogFormVisible = true
                this.form = {}
            },
            handleEdit(row){

                this.form = row
                this.dialogFormVisible = true
            },
            deleteEmployee(id){
                this.request.delete("/role/"+ id).then(res =>{
                     if(res.code === '200'){
                        this.$message.success("删除成功")
                        this.dialogFormVisible = false
                        this.load()
                    }
                    else{
                        this.$message.error("删除失败")
                    }

                })
            },
            load(){
                this.request.get("/role/page" , {
                    params:{
                        pageNum: this.pageNum ,
                        pageSize: this.pageSize,
                    }
                }).then(res=>{
                    console.log("这里是管理信息 "+res.records)
                    this.tableData = res.records
                    this.total = res.total
                })
            },

            save(){
                this.request.post("/role" , this.form).then(res =>{
                    console.log(res.code)
                    if(res.code === '200'){
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.load()
                    }
                    else{
                        this.$message.error("保存失败")
                    }

                })

            },

            handleSizeChange(pageSize){
                //console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },

            handleCurrentChange(pageNum){
                // console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },

            delBatch(){
                let ids = this.multipleSelection.map(v => v.id) //将对象数组变成纯ID的数组
                console.log(this.multipleSelection)
                this.request.post("/role/del/batch/" ,ids).then(res =>{
                    console.log(res)
                    if(res){
                        this.$message.success("批量辞退成功")
                        this.dialogFormVisible = false
                        this.load()
                    }
                    else{
                        this.$message.error("批量辞退失败")
                    }

                })

            },
            handleSelectionChange(val){

                this.multipleSelection = val

            },

            exp(){
                window.open("http://localhost:9099/role/export")
            },
            handleExcelImportSuccess(){
                this.$message.success("导入成功")
                this.load()
            }



        }



    }



</script>

<style scoped>

</style>

<style>
    .headerBg{
        background-color: aqua !important;
    }
</style>
