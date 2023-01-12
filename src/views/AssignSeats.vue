<template>
    <div>

        <div style="width:100%; background-color: #42b983; height: 50px"></div>
        <h1 style="margin-top: 20px;margin-left: 250px; font-size: 50px">请\选\择\座\位</h1>
<!--        <h5>{{this.item}}</h5>-->
        <div style="margin: 50px auto; background-color:rgba(142,142,142,0.6); width: 1200px; height: 750px; padding: 20px; border-radius: 10px">
            <el-row>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[0]" type="primary" class="myclass" @click="myclick(0)">{{ this.item[0] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[1]" type="primary" class="myclass" @click="myclick(1)">{{ this.item[1] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[2]" type="primary" class="myclass" @click="myclick(2)">{{ this.item[2] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[3]" type="primary" class="myclass" @click="myclick(3)">{{ this.item[3] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[4]" type="primary" class="myclass" @click="myclick(4)">{{ this.item[4] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[5]" type="primary" class="myclass" @click="myclick(5)">{{ this.item[5] }}</el-button>
            </el-row>
            <el-row style="margin-top: 45px">
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[6]" type="primary" class="myclass" @click="myclick(6)">{{ this.item[6] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[7]" type="primary" class="myclass" @click="myclick(7)">{{ this.item[7] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[8]" type="primary" class="myclass" @click="myclick(8)">{{ this.item[8] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[9]" type="primary" class="myclass" @click="myclick(9)">{{ this.item[9] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[10]" type="primary" class="myclass" @click="myclick(10)">{{ this.item[10] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[11]" type="primary" class="myclass" @click="myclick(11)">{{ this.item[11] }}</el-button>
            </el-row>
            <el-row style="margin-top: 45px">
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[12]" type="primary" class="myclass" @click="myclick(12)">{{ this.item[12] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[13]" type="primary" class="myclass" @click="myclick(13)">{{ this.item[13] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[14]" type="primary" class="myclass" @click="myclick(14)">{{ this.item[14] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[15]" type="primary" class="myclass" @click="myclick(15)">{{ this.item[15] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[16]" type="primary" class="myclass" @click="myclick(16)">{{ this.item[16] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[17]" type="primary" class="myclass" @click="myclick(17)">{{ this.item[17] }}</el-button>
            </el-row>
            <el-button type="warning" :disabled="true" style="margin-top:45px; margin-left: 480px;  width:170px; height:85px; font-size:25px">管理员座位</el-button>
            <el-row style="margin-top: 45px">
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[18]" type="primary" class="myclass" @click="myclick(18)">{{ this.item[18] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[19]" type="primary" class="myclass" @click="myclick(19)">{{ this.item[19] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[20]" type="primary" class="myclass" @click="myclick(20)">{{ this.item[20] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[21]" type="primary" class="myclass" @click="myclick(21)">{{ this.item[21] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[22]" type="primary" class="myclass" @click="myclick(22)">{{ this.item[22] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[23]" type="primary" class="myclass" @click="myclick(23)">{{ this.item[23] }}</el-button>
            </el-row>
            <el-row style="margin-top: 45px">
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[24]" type="primary" class="myclass" @click="myclick(24)">{{ this.item[24] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[25]" type="primary" class="myclass" @click="myclick(25)">{{ this.item[25] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[26]" type="primary" class="myclass" @click="myclick(26)">{{ this.item[26] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[27]" type="primary" class="myclass" @click="myclick(27)">{{ this.item[27] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[28]" type="primary" class="myclass" @click="myclick(28)">{{ this.item[28] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[29]" type="primary" class="myclass" @click="myclick(29)">{{ this.item[29] }}</el-button>
            </el-row>
            <el-row style="margin-top: 45px">
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[30]" type="primary" class="myclass" @click="myclick(30)">{{ this.item[30] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[31]" type="primary" class="myclass" @click="myclick(31)">{{ this.item[31] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[32]" type="primary" class="myclass" @click="myclick(32)">{{ this.item[32] }}</el-button>
                <el-button style="margin-left: 230px" icon="el-icon-user-solid" :disabled="disable[33]" type="primary" class="myclass" @click="myclick(33)">{{ this.item[33] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[34]" type="primary" class="myclass" @click="myclick(34)">{{ this.item[34] }}</el-button>
                <el-button style="margin-left: 50px" icon="el-icon-user-solid" :disabled="disable[35]" type="primary" class="myclass" @click="myclick(35)">{{ this.item[35] }}</el-button>
            </el-row>
        </div>

<!--        <clock :time="time" style="color: #4a89ff"></clock>-->
        <el-select v-model="value" clearable placeholder="请选择预约时长">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <br/><br/>
        <el-button type="primary" @click="confirmInfo">确定选座</el-button>

        <el-dialog v-model="getseat" title="座位预约信息" :visible.sync="dialogVisible" width="30%">
            <el-form>
                <el-form-item label="座位号:">
                    <el-input v-model="getseat.seatid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预约时长:">
                    <el-input v-model="getseat.lastingtime" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="chooseSeat">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    // import Clock from 'vue-clock2';
    export default {
        name: "AssignSeats",
        // components:{Clock},
        data(){
            return{
                options: [
                    {value: '30', label: '30分钟'},
                    {value: '45', label: '45分钟'},
                    {value: '60', label: '1小时'},
                    {value: '90', label: '1小时30分钟'},
                    {value: '120', label: '2小时'},
                    {value: '150', label: '2小时30分钟'}],
                value: '',
                seats:[],
                getseat:{
                    seatid:'',
                    lastingtime:"",
                    isempty:'',
                    ordertime:""
                },
                form:{},
                dialogVisible:false,
                time:"19:50",
                item:[] ,
                disable:[],
                test:[],
            }
        },
        methods:{
            load(){
                this.request.get("/seat").then(res => {
                    if(res){
                        console.log(res)
                        this.seats=res
                        for(var i=0;i<36;i++){
                            if(this.seats[i].isempty===1){
                                this.item[i]="空 闲"
                                this.disable[i]=false
                            }else if(this.seats[i].isempty===0){
                                this.item[i]="占 用"
                                this.disable[i]=true
                            }
                        }
                        console.log(this.item)
                        console.log(this.disable)
                    }
                    else{
                        this.$message.error("导入失败")
                    }
                })
            },
            confirmInfo(){
                this.getseat.lastingtime=this.value
                this.dialogVisible=true
            },
            chooseSeat(){
                this.request.post("/seat",this.getseat).then(res => {
                    if(res){
                        this.$message.success("选座成功")
                    } else {
                      this.$message.error("选座失败")
                    }
                })
                this.dialogVisible=false
                this.disable[this.getseat.seatid-1]=true
            },
            myclick(i){
                if(this.seats[i].isempty===1){
                    console.log("座位"+i+"占用")
                    this.item[i] = "占 用"
                    this.seats[i].isempty=0
                    this.getseat=this.seats[i]
                }
                else if(this.seats[i].isempty===0){
                    console.log("座位"+i+"空闲")
                    this.item[i] = "空 闲"
                    this.seats[i].isempty=1
                    this.getseat.seatid=''
                    this.getseat.isempty=''
                }
            },
            myclick0(){
                if(this.seats[0].isempty===1){
                    console.log("座位1占用")
                    this.item[0] = "占 用"
                    this.seats[0].isempty=0
                    this.getseat=this.seats[0]
                }else{
                    this.item[0] = "空 闲"
                    this.seats[0].isempty=1
                    this.getseat=null
                }
            },

            myclick1(){
                if(this.seats[1].isempty===1){
                    console.log("座位1占用")
                    this.item[1] = "占 用"
                    this.seats[1].isempty=0
                    this.getseat=this.seats[1]
                }else{
                    this.item[1] = "空 闲"
                    this.seats[1].isempty=1
                    this.getseat=null
                }
            },
            myclick2(){
                if(this.seats[2].isempty===1){
                    console.log("座位1占用")
                    this.item[2] = "占 用"
                    this.seats[2].isempty=0
                    this.getseat=this.seats[2]
                }else{
                    this.item[2] = "空 闲"
                    this.seats[2].isempty=1
                    this.getseat=null
                }
            },
            myclick3(){
                if(this.seats[3].isempty===1){
                    console.log("座位1占用")
                    this.item[3] = "占 用"
                    this.seats[3].isempty=0
                    this.getseat=this.seats[3]
                }else{
                    this.item[3] = "空 闲"
                    this.seats[3].isempty=1
                    this.getseat=null
                }
            },
        },
        created() {
            this.load()
            for(var i=0;i<36;i++){
                if(this.seats[i].isempty===1){
                    this.item[i]="空 闲"
                    this.disable[i]=false
                }else if(this.seats[i].isempty===0){
                    this.item[i]="占 用"
                    this.disable[i]=true
                }
            }
        },
        mounted() {
            this.time=getTime
        }
    }
</script>

<style scoped>
    .myclass{
        width: 100px;
        height: 50px;
        font-size: 20px;
    }
</style>