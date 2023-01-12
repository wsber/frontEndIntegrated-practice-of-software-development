<template>
    <div>
        <div style="padding:  10px 0">
            <el-input style=" width:400px" placeholder="请输入查询的时期（精确到月）" suffix-icon="el-icon-reading" v-model = "time"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="margin:  10px 0">
<!--            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>-->
<!--            <el-button type="danger" @click="delBatch">批量辞退<i class="el-icon-remove-outline"></i></el-button>-->
            <el-upload action="http://localhost:9099/finance/import" accept=" xlsx " :on-success="handleExcelImportSuccess" style="display: inline-block">
                <el-button type="primary"class="ml-5">导入公司财务表<i class="el-icon-bottom"></i></el-button>
            </el-upload>
            <el-button type="primary" @click ="exp" class="ml-5">导出公司财务表<i class="el-icon-top"></i></el-button>
            <el-button type="success" @click ="incomeShow">公司盈利图<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="success" >公司营业额变化图<i class="el-icon-remove-outline"></i></el-button>
            <el-button type="success" >支出变化图<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="success" @click ="employeeShow" >员工数量变化图<i class="el-icon-remove-outline"></i></el-button>
        </div>


        <el-table :data="tableData" border stripe header-cell-class-name="headerBg" @selection-change="handleSelectionChange" width="200" :header-cell-style="{textAlign:'center'}"
                  :cell-style="{textAlign:'center'}">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column prop="time" label="时间" ></el-table-column>
            <el-table-column prop="employeeNum" label="员工数量" ></el-table-column>
            <el-table-column prop="turnover" label="营业额" ></el-table-column>
            <el-table-column prop="expenditure" label="支出额" ></el-table-column>
            <el-table-column prop="income" label="利润"></el-table-column>
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

        <el-row>
        <el-col align="center">
            <div align="center" v-show="show1" id = "main" style = "width: 500px ; height: 490px"></div>
<!--            <div align="center" v-show="show2" id = "pie" style = "width: 500px ; height: 490px"></div>-->
<!--            <div align="center" v-show="show3" id = "main" style = "width: 500px ; height: 490px"></div>-->
<!--            <div align="center" v-show="show4" id = "pie" style = "width: 500px ; height: 490px"></div>-->
        </el-col>
       </el-row>


    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "ManageFinance",
        mounted() { //页面元数元素渲染后再触发
            var option = {
                title: {
                    text: '公司盈利图',
                    subtext: '趋势图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {

                        data: [],
                        type: 'line'
                    },
                    {
                        data: [],
                        type: 'bar'
                    }


                ]
            };
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            // let tmp = this.multipleSelection.map(v =>v.id);
             //console.log(this.multipleSelection)
            // option.series[1].data = tmp ;
            // myChart.setOption(option);
           // // let ids = this.multipleSelection.map(v => v.id)
           //  console.log(ids)
            this.request.get("/echarts/income").then(res => {
                //填空
                    console.log(res.data)
                    option.xAxis.data = res.data.x
                    option.series[0].data =res.data.y
                    console.log(option.series[0].data)
                    option.series[1].data =res.data.y
                    myChart.setOption(option);
            })


            //展示员工变化图

        },
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                currentIndex: 1,
                show1:false,
                show4:false,


                time:"",
                form: {},
                multipleSelection: [],
                dialogFormVisible: false,
                formLabelWidth: "120"
            }
        },

        created() {

            this.load()

        },

        methods: {

            incomeShow(){
                this.show1 = !this.show1
                console.log(this.show1)
            },
            employeeShow(){
                this.show4 = !this.show4
                console.log(this.show4)
            },
            reset() {
                this.time = "",
                    this.load()
            },

            load() {
                this.request.get("/finance/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        time: this.time,
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                })
            },
            printIncome(){
                this.dialogFormVisible = true
                console.log(this.multipleSelection)
            },



            handleSizeChange(pageSize) {
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },

            handleCurrentChange(pageNum) {
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            handleSelectionChange(val) {

                this.multipleSelection = val
                this.form = val;
                console.log(this.form)

            },

            exp() {
                window.open("http://localhost:9099/finance/export")
            },
            handleExcelImportSuccess() {
                this.$message.success("导入成功")
                this.load()
            }

        }
    }
</script>

<style scoped>

</style>