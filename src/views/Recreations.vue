<template>
   <div>
      <div>
         <div style="padding: 10px 0">
            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-search" placeholder="请输入活动名称" v-model="activity_name"></el-input>
            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-edit" placeholder="请输入活动类型" v-model="type"></el-input>
            <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-collection" placeholder="请输入活动id" v-model="id"></el-input>
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
            <el-button type="primary" @click="loaddate">按时间搜索</el-button>
         </div>
      </div>
      <div style="margin: 10px 0">
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
         <el-button type="primary" @click="handleAdd" style="margin-left: 5px">新增<i class="el-icon-circle-plus-outline"></i></el-button>
         <el-button type="primary" @click="exp" style="margin-left: 5px">导出 <i class="el-icon-top"></i></el-button>
         <el-upload action="http://localhost:9099/bookinfor/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
            <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
         </el-upload>
      </div>
      <div>
         <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">>
            <el-table-column type="selection" align="center" width="40"></el-table-column>
            <el-table-column prop="cover" align="center" label="活动照片" width="100">
               <template #default="scope">
                  <img :src="scope.row.cover" style="width: 70px; height: 100px">
               </template>
            </el-table-column>
            <el-table-column prop="activityName" align="center" label="活动名称" width="150"></el-table-column>
            <el-table-column prop="id" align="center" label="活动ID" width="100"></el-table-column>
            <el-table-column prop="audienceNumber" align="center" label="观众人数" width="100"></el-table-column>
            <el-table-column prop="performanceTeam" align="center" label="表演团队" width="150"></el-table-column>
            <el-table-column prop="transStartTime" align="center" label="开始时间" width="140"></el-table-column>
            <el-table-column prop="transEndTime" align="center" label="结束时间" width="140"></el-table-column>
            <el-table-column prop="type" align="center" label="活动类型" width="100"></el-table-column>
            <el-table-column prop="mydesc" align="center" label="活动描述" width="200"></el-table-column>
            <el-table-column align="center" label="操作" width="160">
               <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-popconfirm
                          style="margin-left: 5px"
                          confirm-button-text='确定'
                          cancel-button-text='我再想想'
                          icon="el-icon-info"
                          icon-color="red"
                          title="确认删除此记录？"
                          @confirm="del(scope.row.id)"
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
         <el-dialog title="活动信息" :visible.sync="editdialogFormVisible" width="40%">
            <el-form label-width="80px">
               <el-form-item label="活动照片" >
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
               <el-form-item label="活动ID" >
                  <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动名称" >
                  <el-input v-model="form.activityName" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="表演团队" >
                  <el-input v-model="form.performanceTeam" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动简介" >
                  <el-input v-model="form.mydesc" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="活动人数" >
                  <el-input v-model="form.audienceNumber" :disabled="true" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动类型" >
                  <el-select v-model="form.type" placeholder="请选择">
                     <el-option value="送戏下乡">送戏下乡</el-option>
                     <el-option value="文化演出">文化演出</el-option>
                     <el-option value="公益表演">公益表演</el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="起止时间" >
                  <el-date-picker
                          v-model="form.times"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                  </el-date-picker>
               </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="editdialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="save">确 定</el-button>
            </div>
         </el-dialog>
      </div>
      <div>
         <el-dialog title="新增活动信息" :visible.sync="infodialogFormVisible" width="60%">
            <el-form label-width="80px">
               <el-form-item label="活动照片" >
                  <el-upload
                          class="avatar-uploader"
                          action="http://localhost:9099/file/upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                     <img v-if="form.cover" :src="form.cover" class="avatar">
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
               </el-form-item>
               <el-form-item label="上传活动视频" >
                  <el-upload
                          class="upload-demo"
                          :action="getUrl"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeVideoUpload">
                     <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
               </el-form-item>
               <el-form-item label="活动名称" >
                  <el-input v-model="form.activityName" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="表演团队" >
                  <el-input v-model="form.performanceTeam" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动简介" >
                  <el-input v-model="form.mydesc" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item label="活动人数" >
                  <el-input v-model="form.audienceNumber" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动类型" >
                  <el-select v-model="form.type" placeholder="请选择">
                     <el-option value="送戏下乡">送戏下乡</el-option>
                     <el-option value="文化演出">文化演出</el-option>
                     <el-option value="公益表演">公益表演</el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="起止时间" >
                  <el-date-picker
                          v-model="form.times"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                  </el-date-picker>
               </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="infodialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="handleAddActivity">确 定</el-button>
            </div>
         </el-dialog>
      </div>
   </div>
</template>

<script>
    export default {
        name: "Recreations",
        data(){
            return{
                tableData:[],
                multipleSelection: [],
                form: {},
                total:0,
                pageNum:1,
                pageSize:5,
                id:"",
                activityName:"",
                activityStarttime: new Date(),
                activityEndtime: new Date(),
                transStartTime:"",
                transEndTime:"",
                audienceNumber:"",
                mydesc:"",
                performanceTeam:"",
                cover:"",
                videoFile:"",
                clickNum:"",
                type:"",
                times:null,
                headerBg: 'headerBg',
                editdialogFormVisible: false,
                infodialogFormVisible: false,
                videoFile:""
            };
        },
        created() {
          this.load()
        },
        methods:{
            load(){
                //请求分页查询
                this.request.get("/ruralrecreation/page",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        activityName : this.activityName,
                        id: this.id,
                        type: this.type,
                    }
                }).then(res => {console.log(res)
                    this.tableData=res.records
                    this.total=res.total
                    console.log(this.tableData)
                    for(var i = 0 ;i <this.tableData.length ; i++){
                        this.tableData[i].transStartTime = this.tableData[i].activityStarttime[0] + "-" +this.tableData[i].activityStarttime[1]+ "-" + this.tableData[i].activityStarttime[2] ;
                        this.tableData[i].transEndTime = this.tableData[i].activityEndtime[1] + "-" +this.tableData[i].activityEndtime[1]+ "-" + this.tableData[i].activityEndtime[2] ;
                    }
                })
            },
            reset(){
                this.id=""
                this.activityName=""
                this.type=""
                this.times=[]
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
            loaddate(){
                if(this.times!=null){
                    let begin = this.times[0]
                    let end = this.times[1]
                    console.log("这里是开始时间")
                    console.log(begin)
                    console.log(end)

                    this.activityStartTime = this.transforTime(begin)
                    this.activityEndTime = this.transforTime(end)
                    console.log(this.activityStartTime)
                    console.log(this.activityEndTime)
                }
                this.request.get("/ruralrecreation/page/date",{
                    params: {
                        pageNum : this.pageNum,
                        pageSize : this.pageSize,
                        activityStartTime: this.activityStartTime,
                        activityEndTime: this.activityEndTime
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
            del(id){
                this.request.delete("/ruralrecreation/"+id).then(res =>{
                    if(res){
                        this.$message.success("删除成功")
                        this.load()
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },
            save(){
                this.request.post("/ruralrecreation",this.form).then(res =>{
                    if(res){
                        this.$message.success("保存成功")
                        this.editdialogFormVisible=false
                        this.load()
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
            delBatch(){
                let ids = this.multipleSelection.map(v => v.id)
                this.request.post("/ruralrecreation/del/batch",ids).then(res =>{
                    if(res){
                        this.$message.success("批量删除成功")
                        this.load()
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            getUrl(){
                this.request.post("/file/upload").then(res =>{
                    if(res){
                        this.$message.success("添加成功")
                        this.form.cover=res.toString()
                        this.infodialogFormVisible=false
                        this.load()
                    }else {
                        this.$message.error("添加失败")
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.cover = res;

                this.$message.success("导入成功")
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            },
           beforeVideoUpload(file) {
              const isvideo = file.type === 'mp4';
              if (!isvideo) {
                 this.$message.error('上传头像图片只能是 .mp4 格式!');
              }
              return isvideo ;
           },
            handleAdd(){
                this.infodialogFormVisible=true
                this.form={}
            },
            handleAddActivity(){
               // this.form.activityStarttime=this.times[0]
               // this.form.activityStarttime=this.times[1]
                this.request.post("/ruralrecreation",this.form).then(res =>{
                    if(res){
                        this.$message.success("添加成功")
                        this.infodialogFormVisible=false
                        this.load()
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
        }
    }
</script>

<style scoped>
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