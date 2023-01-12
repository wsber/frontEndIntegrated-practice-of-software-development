<template>
    <div>
        <div style="padding: 10px 0">
            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-search" placeholder="请输入名字" v-model="username"></el-input>
            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-phone" placeholder="请输入电话号" v-model="tel"></el-input>
            <!--            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-user" placeholder="请选择会员等级" v-model="userid"></el-input>-->
            <el-select v-model="membership" placeholder="请选择会员等级">
                <el-option label="普通会员" value="普通会员"></el-option>
                <el-option label="白银会员" value="白银会员"></el-option>
                <el-option label="黄金会员" value="黄金会员"></el-option>
                <el-option label="铂金会员" value="铂金会员"></el-option>
                <el-option label="钻石会员" value="钻石会员"></el-option>
                <el-option label="超级大会员" value="超级大会员"></el-option>
            </el-select>
            <el-button type="primary" @click="load">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">注册新用户<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
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
            <el-upload action="http://localhost:8081/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
            </el-upload>
        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">>
            <el-table-column type="selection" align="center" width="40"></el-table-column>
            <el-table-column prop="username" align="center" label="用户名" width="100"></el-table-column>
            <el-table-column prop="userid" align="center" label="用户ID" width="120"></el-table-column>
            <el-table-column prop="tel" align="center" label="电话号" width="120"></el-table-column>
            <el-table-column prop="gender" align="center" label="性别" width="50"></el-table-column>
            <el-table-column prop="role" label="权限键值" width="120"></el-table-column>
            <el-table-column prop="regdate" align="center" label="注册日期" width="200"></el-table-column>
            <el-table-column prop="membership" align="center" label="会员等级" width="80"></el-table-column>
            <el-table-column prop="account" align="center" label="账户余额" width="70"></el-table-column>
            <el-table-column align="center" label="编辑用户信息" width="90">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEditPersonalInformation(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">充值</el-button>
                    <el-popconfirm
                            style="margin-left: 5px"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确认删除此记录？"
                            @confirm="del(scope.row.userid)"
                    >
                        <el-button size="mini" type="danger" slot="reference" >删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
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

        <el-dialog title="账户充值" :visible.sync="chargedialogFormVisible">
            <el-form label-width="80px">
                <el-form-item label="用户名" >
                    <el-input v-model="chargeform.username" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号">
                    <el-input v-model="chargeform.tel" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账户余额" >
                    <el-input v-model="chargeform.account" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请输入密码" label-width="100px">
                    <el-input v-model="chargeform.password"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="输入要充值的金额" label-width="140px">
                    <el-input v-model="chargeform.chargemoney" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"  class="dialog-footer">
                <el-button @click="chargedialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="handleCharge">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="用户信息" :visible.sync="infodialogFormVisible" width="40%">
            <el-form label-width="80px">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
                        <el-option v-for="(item) in roles" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户ID" :label-width="formLabelWidth" >
                    <el-input v-model="form.userid" autocomplete="off":disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话号" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="密码" :label-width="formLabelWidth" :disabled="true">-->
<!--                    <el-input v-model="form.password" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.gender" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员等级" :label-width="formLabelWidth" >
                    <el-input v-model="form.membership" autocomplete="off":disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="账户余额" :label-width="formLabelWidth">
                    <el-input v-model="form.account" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="infodialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <div>
            <el-dialog title="提示" :visible.sync="errordialogVisible" width="30%">
                <span>用户密码错误，请检查！</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="errordialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="errordialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return{
                username: "",
                userid: "",
                tel: "",
                password: "",
                inputpassword:"",
                gender: "",
                membership: "",
                account: '',
                regdate: "",
                chargemoney: '',
                tableData: [],
                multipleSelection: [],

                form: {},
                chargeform:{},
                total: 0,
                pageNum: 1,
                pageSize:5,
                headerBg: 'headerBg',
                formLabelWidth:'80px',
                chargedialogFormVisible:false,
                infodialogFormVisible: false,
                errordialogVisible: false,
                roles:[],
            }
        },
        created() {
            this.load()
        },
        methods: {
            load(){
                //请求分页查询
                this.request.get("/user/page",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        username : this.username,
                        tel: this.tel,
                        membership: this.membership,
                        account: this.account
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData=res.records
                    this.total=res.total
                })

                //浪费流量，需要后续优化
                this.request.get("/employee").then(res =>{

                    // let arr1 = this.unique(res.data.rows)
                   let flag =  this.unique(res.data.map(v => v.authorityKey))
                    this.roles = flag
                    console.log("这里是roles")
                     console.log(this.roles)

                })

            },
            reset() {
                this.membership=""
                this.tel=""
                this.username=""
                this.load()
            },
            handleSizeChange(pageSize){
                this.pageSize=pageSize
                this.load()
            },
            handleCurrentChange(pageNum){
                this.pageNum=pageNum
                this.load()
            },
            handleAdd(){
                this.infodialogFormVisible=true
                this.form={}
            },
            save(){
                this.request.post("/user",this.form).then(res =>{
                    if(res){
                        this.$message.success("保存成功")
                        this.infodialogFormVisible=false
                        this.load()
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
            handleEdit(row){
                this.chargeform=row
                this.chargeform.password=""
                this.chargedialogFormVisible=true
            },
            handleCharge(){
                this.request.post("/user/charge",this.chargeform).then(res =>{
                    if(res){
                        this.$message.success("充值成功")
                        this.chargedialogFormVisible=false
                        this.load()
                    }else {
                        this.errordialogVisible=true
                    }
                })
            },
            handleEditPersonalInformation(row){
                this.form = row
                this.infodialogFormVisible = true;

            },
            del(userid){
                this.request.delete("/user/"+userid).then(res =>{
                    if(res){
                        this.$message.success("删除成功")
                        this.load()
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection=val
            },
            delBatch(){
                let userids = this.multipleSelection.map(v => v.userid)
                this.request.post("/user/del/batch",userids).then(res =>{
                    if(res){
                        this.$message.success("批量删除成功")
                        this.load()
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            exp() {
                window.open("http://localhost:9099/user/export")
            },
            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.load()
            },
            // 去重，这里面的代码最好不要乱动，直接复制使用就行了
            unique (arr) {
                return Array.from(new Set(arr))
            },

        }
    }
</script>

<style>
    .headerBg{
        background: #55e0e5!important;
    }
</style>