<template>
    <div>
<!--        <h1>这是主页</h1><h1>1.好看的背景</h1><h1>2.添加鼠标特效</h1>-->
        <el-row :gutter="10" style="margin-bottom: 80px">
            <el-col :span="6">
                <el-card style="color: #409EFF">
                    <div><i class="el-icon-user-solid"></i> 注册用户总数</div>
                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">
                        100
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card style="color: #F56C6C">
                    <div ><i class="el-icon-s-flag"></i>实体书销售总量</div>
                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">
                        ￥100000
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card style="color: #67C23A">
                    <div><i class="el-icon-money"></i>盈利额度</div>
                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">
                        ￥300000
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #E6A23C">
                    <div><i class="el-icon-s-shop"></i>门店数</div>
                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">
                        20
                    </div>
                </el-card>
            </el-col>

        </el-row>



        <el-row>
            <el-col :span="12">
                <div id = "main" style = "width: 500px ; height: 490px"></div>
            </el-col>
            <el-col :span="12">
                <div id = "pie" style = "width: 500px ; height: 490px"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "Home",

        data(){

            return{

            }

        },

        mounted() { //页面元数元素渲染后再触发
            var option = {
                title: {
                    text: '各季度会员数量统计',
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
                    data: ['第一季度', '第二季度', '第三季度', '第四季度']
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

            this.request.get("/echarts/members").then(res => {
                //填空
                if (res.code === '200') {
                    this.$message.success("数据载入成功")
                    console.log(res.data)
                    // option.xAxis.data = res.data.x
                    option.series[0].data =res.data
                    option.series[1].data =res.data
             myChart.setOption(option);
                }

            })


            //饼图
            var pieOption = {
                title: {
                    text: '各季度会员数量统计',
                    subtext: '比例图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        //name: 'Access From',
                        type: 'pie',
                        radius: '60%',
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 14,    //文字的字体大小
                                    color: "#fff"
                                },
                                formatter:'{d}%'
                            }
                        },
                        data: [
                            // { value: 1048, name: 'Search Engine' },
                            // { value: 735, name: 'Direct' },
                            // { value: 580, name: 'Email' },
                            // { value: 484, name: 'Union Ads' },
                            // { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var pieDom = document.getElementById('pie');
            var pieChart = echarts.init(pieDom);
            this.request.get("/echarts/members").then(res => {

                pieOption.series[0].data = [
                    {name: "第一季度", value: res.data[0]},
                    {name: "第二季度", value: res.data[1]},
                    {name: "第三季度", value: res.data[2]},
                    {name: "第四季度", value: res.data[3]},
                ]
                pieChart.setOption(pieOption)
            });
        },
    }
</script>

<style scoped>

</style>