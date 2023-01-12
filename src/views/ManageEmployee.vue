<template>
    <div>
        <div style="padding:  10px 0">
<!--            <el-input style=" width:200px" placeholder="请输入真实姓名" suffix-icon="el-icon-reading" v-model = "realName"></el-input>-->
            <el-input style=" width:200px" placeholder="请输入职位" suffix-icon="el-icon-loading" class = "ml-5" v-model = "position"></el-input>
            <el-input style=" width:200px" placeholder="请输入薪水" suffix-icon="el-icon-user" class = "ml-5" v-model = "salary"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin:  10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger" @click="delBatch">批量辞退<i class="el-icon-remove-outline"></i></el-button>
            <el-upload action="http://localhost:9099/employee/import" accept=" xlsx " :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary"class="ml-5">导入<i class="el-icon-bottom"></i></el-button>
            </el-upload>

            <el-button type="primary" @click ="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"align="center"></el-table-column>
            <el-table-column prop="id" label="角色ID" width="140"align="center"></el-table-column>
<!--            <el-table-column prop="userName" label="用户名" width="140"></el-table-column>-->
<!--            <el-table-column prop="realNaame" label="真实姓名" width="120"></el-table-column>-->
            <el-table-column prop="authorityKey" label="权限键值" width="200"align="center"></el-table-column>
            <el-table-column prop="position" label="职位" width="200"align="center"></el-table-column>
            <el-table-column prop="salary" label="薪水" width="200"align="center"></el-table-column>
            <el-table-column label="操作"align="center">
                <template slot-scope="scope">
                    <el-button type="info" @click="selectMenu(scope.row)">分配菜单 <i class="el-icon-menu"></i></el-button>
                    <el-button type="primary" @click="handleEdit(scope.row)">修改角色信息<i class="el-icon-folder"></i> </el-button>
                    <el-popconfirm
                            class= "ml-5"
                            confirm-button-text='确定辞退'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定要删除该角色信息吗？"
                            @confirm="deleteEmployee(scope.row.id)"
                         >
                            <el-button type="danger" slot="reference" >删除该角色<i class="el-icon-remove-outline"></i> </el-button>
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

        <el-dialog title="角色信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
<!--                <el-form-item label="用户名" >-->
<!--                    <el-input v-model="form.userName" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="薪水" >
                    <el-input v-model="form.salary" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="真实姓名" >-->
<!--                    <el-input v-model="form.realName" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="权限键值" >
                    <el-input v-model="form.authorityKey" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位" >
                    <el-select v-model="form.position" placeholder="请选择活动区域">
                        <el-option label="普通员工" value="普通员工"></el-option>
                        <el-option label="主管" value="主管"></el-option>
                        <el-option label="经理" value="经理"></el-option>
                        <el-option label="用户" value="用户"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
            <el-tree
                    :props="props"
                    :data="menuData"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expanded-keys="expends"
                    :default-checked-keys="checks">
             <span class="custom-tree-node" slot-scope="{ node, data }">
                <span><i :class="data.icon"></i> {{ data.name }}</span>
             </span>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="menuDialogVis = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "ManageEmployee",


        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,

                userName: "",
                nickname: "",
                phone: "",
                email: "",
                address: "",

                realName: "",
                salary: "",
                position: "",


                authorityKey:'',
                menuData:[],
                form: {},
                multipleSelection:[],
                dialogFormVisible: false,
                menuDialogVis:false,
                formLabelWidth:"120",
                props:{
                    label:'name'
                },
                expends:[],
                checks:[],
                roleId:0,
                roleFlag:''


            }
        },

        created() {

            this.load()

        },

        methods:{
            selectMenu(role){

                this.roleId  = role.id
                this.menuDialogVis =  true
                console.log(role.authorityKey+"这里是该角色的权限键值")
                this.roleFlag =role.authorityKey

                this.request.get("/menu" , {
                    params:{
                        name:"",
                    }
                }).then(res=>{
                    this.menuData = res
                    this.expends = this.menuData.map(v=>v.id)

                })
                this.request.get("/employee/rolemenu/" + this.roleId).then(res=>{
                    this.checks = res.data
                    this.menuDialogVis = true

                    this.request.get("/menu/ids").then(r =>{
                        const ids = r.data
                        ids.forEach(id => {
                            if (!this.checks.includes(id)) {
                                    this.$refs.tree.setChecked(id, false)
                            }
                        })
                    })

                })

            },

            reset(){
                this.position ="",
                    this.salary = "",
                    this.realName ="",
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
                this.request.delete("/employee/"+ id).then(res =>{
                    if(res){
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
                this.request.get("/employee/page" , {
                    params:{
                        pageNum: this.pageNum ,
                        pageSize: this.pageSize,

                        position: this.position,
                        salary: this.salary,
                        // realName: this.realName,
                    }
                }).then(res=>{
                   // console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                })

            },

            save(){
                this.request.post("/employee" , this.form).then(res =>{
                    //console.log(res)
                    if(res){
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
                this.request.post("/employee/del/batch" ,ids).then(res =>{

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
                window.open("http://localhost:9099/employee/export")
            },
            handleExcelImportSuccess(){
                this.$message.success("导入成功")
                this.load()
            },

            saveRoleMenu(){
                // console.log(this.$refs.tree.getCheckedNodes());
                this.request.post("/employee/rolemenu/" + this.roleId ,  this.$refs.tree.getCheckedKeys()).then(res =>{

                    if(res){

                        this.$message.success("权限绑定成功")
                        this.menuDialogVis = false

                        console.log(this.roleFlag)
                        if(this.roleFlag === 'MANAGER'){
                            this.$store.commit("logout")
                        }
                    }else {
                        this.$message.error("权限绑定失败")
                    }

                })


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
</style>
