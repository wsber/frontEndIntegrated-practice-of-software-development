<template>
  <div>
    <div>
      <div style="padding: 10px 0">
        <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-search" placeholder="请输入活动名称" v-model="activityName"></el-input>
        <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-edit" placeholder="请输入省份" v-model="province"></el-input>
        <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-collection" placeholder="请输入市" v-model="region"></el-input>
        <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-collection" placeholder="请输入区" v-model="town"></el-input>
        <el-button type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
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
        <el-table-column prop="id" align="center" label="序号" width="50"></el-table-column>
        <el-table-column prop="province" align="center" label="省" width="100"></el-table-column>
        <el-table-column prop="region" align="center" label="市" width="150"></el-table-column>
        <el-table-column prop="town" align="center" label="区（县）" width="150"></el-table-column>
        <el-table-column prop="village" align="center" label="街道（村委）" width="150"></el-table-column>
        <el-table-column prop="type" align="center" label="活动类型" width="150"></el-table-column>
        <el-table-column prop="activityName" align="center" label="活动名称" width="200"></el-table-column>
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
          <el-form-item label="活动名称" >
            <el-input v-model="form.activityName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="活动类型" >
            <el-select v-model="form.type" placeholder="请选择">
              <el-option value="送戏下乡">送戏下乡</el-option>
              <el-option value="文化演出">文化演出</el-option>
              <el-option value="公益表演">公益表演</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="举办地点" >
            <div>
              <el-input placeholder="省份" size="small" v-model="form.province" autocomplete="off"></el-input>
              <el-input placeholder="市" size="small" v-model="form.region" autocomplete="off"></el-input>
              <el-input placeholder="区（县）" size="small" v-model="form.town" autocomplete="off"></el-input>
              <el-input placeholder="街道（村委）" size="small" v-model="form.village" autocomplete="off"></el-input>
            </div>
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
          <el-form-item label="活动名称" >
            <el-input v-model="form.activityName" autocomplete="off"></el-input>
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
          <el-form-item label="举办地点" >
            <div>
              <el-input placeholder="省份" size="small" v-model="form.province" autocomplete="off"></el-input>
              <el-input placeholder="市" size="small" v-model="form.region" autocomplete="off"></el-input>
              <el-input placeholder="区（县）" size="small" v-model="form.town" autocomplete="off"></el-input>
              <el-input placeholder="街道（村委）" size="small" v-model="form.village" autocomplete="off"></el-input>
            </div>
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
        name: "AreaRecreation",
      data(){
        return{
          tableData:[],
          multipleSelection: [],
          form: {},
          total:0,
          pageNum:1,
          pageSize:5,
          activityName:"",
          province:"",
          region:"",
          town:"",
          village:"",
          type:"",
          headerBg: 'headerBg',
          editdialogFormVisible: false,
          infodialogFormVisible: false,
        };
      },
      created() {
        this.load()
      },
      methods:{
        load(){
          //请求分页查询
          this.request.get("/recreationloacation/page",{
            params: {
              pageNum : this.pageNum,
              pageSize : this.pageSize,
              activityName : this.activityName,
              province : this.province,
              region : this.region,
              town : this.town,
              village: this.village
            }
          }).then(res => {console.log(res)
            this.tableData=res.records
            this.total=res.total
            console.log(this.tableData)
          })
        },
        reset(){
          this.province=""
          this.activityName=""
          this.region=""
          this.town=""
          this.village=""
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
          this.request.delete("/recreationloacation/"+id).then(res =>{
            if(res){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        save(){
          this.request.post("/recreationloacation",this.form).then(res =>{
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
          this.request.post("/recreationloacation/del/batch",ids).then(res =>{
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
        handleAvatarSuccess(res, file) {
          this.form.cover = URL.createObjectURL(file.raw);
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
          this.request.post("/recreationloacation",this.form).then(res =>{
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

</style>