<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;        <h1>这是主页</h1><h1>1.好看的背景</h1><h1>2.添加鼠标特效</h1>&ndash;&gt;-->
<!--        <el-row :gutter="10" style="margin-bottom: 80px">-->
<!--            <el-col :span="6">-->
<!--                <el-card style="color: #409EFF">-->
<!--                    <div><i class="el-icon-user-solid"></i> 注册用户总数</div>-->
<!--                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">-->
<!--                        100-->
<!--                    </div>-->
<!--                </el-card>-->
<!--            </el-col>-->

<!--            <el-col :span="6">-->
<!--                <el-card style="color: #F56C6C">-->
<!--                    <div ><i class="el-icon-s-flag"></i>实体书销售总量</div>-->
<!--                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">-->
<!--                        ￥100000-->
<!--                    </div>-->
<!--                </el-card>-->
<!--            </el-col>-->

<!--            <el-col :span="6">-->
<!--                <el-card style="color: #67C23A">-->
<!--                    <div><i class="el-icon-money"></i>盈利额度</div>-->
<!--                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">-->
<!--                        ￥300000-->
<!--                    </div>-->
<!--                </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--                <el-card style="color: #E6A23C">-->
<!--                    <div><i class="el-icon-s-shop"></i>门店数</div>-->
<!--                    <div style="padding: 10px 0  ; text-align: center ;font-wight: bold">-->
<!--                        20-->
<!--                    </div>-->
<!--                </el-card>-->
<!--            </el-col>-->

<!--        </el-row>-->



<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <div id = "main" style = "width: 500px ; height: 490px"></div>-->
<!--            </el-col>-->
<!--        </el-row>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import * as echarts from 'echarts';-->

<!--    var ROOT_PATH =-->
<!--        'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';-->

<!--    var chartDom = document.getElementById('main');-->
<!--    var myChart = echarts.init(chartDom);-->
<!--    var option;-->


<!--    export default {-->
<!--        name: "chooseSeat",-->

<!--        data(){-->

<!--            return{-->

<!--            }-->

<!--        },-->

<!--        mounted() { //页面元数元素渲染后再触发-->

<!--            $.get(ROOT_PATH + '/data/asset/geo/flight-seats.svg', function (svg) {-->
<!--                echarts.registerMap('flight-seats', { svg: svg });-->
<!--                const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F'];-->
<!--                option = {-->
<!--                    tooltip: {},-->
<!--                    geo: {-->
<!--                        map: 'flight-seats',-->
<!--                        roam: true,-->
<!--                        selectedMode: 'multiple',-->
<!--                        layoutCenter: ['50%', '50%'],-->
<!--                        layoutSize: '95%',-->
<!--                        tooltip: {-->
<!--                            show: true-->
<!--                        },-->
<!--                        itemStyle: {-->
<!--                            color: '#fff'-->
<!--                        },-->
<!--                        emphasis: {-->
<!--                            itemStyle: {-->
<!--                                color: undefined,-->
<!--                                borderColor: 'green',-->
<!--                                borderWidth: 2-->
<!--                            },-->
<!--                            label: {-->
<!--                                show: false-->
<!--                            }-->
<!--                        },-->
<!--                        select: {-->
<!--                            itemStyle: {-->
<!--                                color: 'green'-->
<!--                            },-->
<!--                            label: {-->
<!--                                show: false,-->
<!--                                textBorderColor: '#fff',-->
<!--                                textBorderWidth: 2-->
<!--                            }-->
<!--                        },-->
<!--                        regions: makeTakenRegions(takenSeatNames)-->
<!--                    }-->
<!--                };-->
<!--                function makeTakenRegions(takenSeatNames) {-->
<!--                    var regions = [];-->
<!--                    for (var i = 0; i < takenSeatNames.length; i++) {-->
<!--                        regions.push({-->
<!--                            name: takenSeatNames[i],-->
<!--                            silent: true,-->
<!--                            itemStyle: {-->
<!--                                color: '#bf0e08'-->
<!--                            },-->
<!--                            emphasis: {-->
<!--                                itemStyle: {-->
<!--                                    borderColor: '#aaa',-->
<!--                                    borderWidth: 1-->
<!--                                }-->
<!--                            },-->
<!--                            select: {-->
<!--                                itemStyle: {-->
<!--                                    color: '#bf0e08'-->
<!--                                }-->
<!--                            }-->
<!--                        });-->
<!--                    }-->
<!--                    return regions;-->
<!--                }-->
<!--                myChart.setOption(option);-->
<!--                // Get selected seats.-->
<!--                myChart.on('geoselectchanged', function (params) {-->
<!--                    const selectedNames = params.allSelected[0].name.slice();-->
<!--                    // Remove taken seats.-->
<!--                    for (var i = selectedNames.length - 1; i >= 0; i&#45;&#45;) {-->
<!--                        if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {-->
<!--                            selectedNames.splice(i, 1);-->
<!--                        }-->
<!--                    }-->
<!--                    console.log('selected', selectedNames);-->
<!--                });-->
<!--            });-->

<!--            //饼图-->
<!--            var pieOption = {-->
<!--                title: {-->
<!--                    text: '各季度会员数量统计',-->
<!--                    subtext: '比例图',-->
<!--                    left: 'center'-->
<!--                },-->
<!--                tooltip: {-->
<!--                    trigger: 'item'-->
<!--                },-->
<!--                legend: {-->
<!--                    orient: 'vertical',-->
<!--                    left: 'left'-->
<!--                },-->
<!--                series: [-->
<!--                    {-->
<!--                        //name: 'Access From',-->
<!--                        type: 'pie',-->
<!--                        radius: '60%',-->
<!--                        label:{            //饼图图形上的文本标签-->
<!--                            normal:{-->
<!--                                show:true,-->
<!--                                position:'inner', //标签的位置-->
<!--                                textStyle : {-->
<!--                                    fontWeight : 300 ,-->
<!--                                    fontSize : 14,    //文字的字体大小-->
<!--                                    color: "#fff"-->
<!--                                },-->
<!--                                formatter:'{d}%'-->
<!--                            }-->
<!--                        },-->
<!--                        data: [-->
<!--                            // { value: 1048, name: 'Search Engine' },-->
<!--                            // { value: 735, name: 'Direct' },-->
<!--                            // { value: 580, name: 'Email' },-->
<!--                            // { value: 484, name: 'Union Ads' },-->
<!--                            // { value: 300, name: 'Video Ads' }-->
<!--                        ],-->
<!--                        emphasis: {-->
<!--                            itemStyle: {-->
<!--                                shadowBlur: 10,-->
<!--                                shadowOffsetX: 0,-->
<!--                                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--                            }-->
<!--                        }-->
<!--                    }-->
<!--                ]-->
<!--            };-->
<!--            var pieDom = document.getElementById('pie');-->
<!--            var pieChart = echarts.init(pieDom);-->
<!--            this.request.get("/echarts/members").then(res => {-->
<!--                pieOption.series[0].data = [-->
<!--                    {name: "第一季度", value: res.data[0]},-->
<!--                    {name: "第二季度", value: res.data[1]},-->
<!--                    {name: "第三季度", value: res.data[2]},-->
<!--                    {name: "第四季度", value: res.data[3]},-->
<!--                ]-->
<!--                pieChart.setOption(pieOption)-->
<!--            });-->
<!--            ////////////////////////////////-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<!--<template>-->
<!--    <div>-->
<!--        <h1>深圳罗湖区&#45;&#45;svg地图</h1>-->
<!--        <div id="main"></div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    import * as echarts from "echarts";-->

<!--    import $ from "jquery";-->
<!--    import szmap from "../../node_modules/echarts/map/szmap.svg";-->
<!--    export default {-->
<!--        name: "chooseSeat",-->
<!--        data() {-->
<!--            return {};-->
<!--        },-->
<!--        methods: {-->
<!--            getmap() {-->
<!--                var chartDom = document.getElementById("main");-->
<!--                var myChart = echarts.init(chartDom);-->
<!--                var option;-->
<!--                $.get(szmap, function (svg) {-->
<!--                    // 首先向 echarts 注册 SVG 字符串或解析过的 SVG DOM-->
<!--                    echarts.registerMap("szmap", { svg: svg });-->
<!--                    option = {-->
<!--                        tooltip: {},-->

<!--                        series: [-->
<!--                            {-->
<!--                                name: "szmap",-->
<!--                                type: "map",-->
<!--                                map: "szmap",-->
<!--                                roam: true,-->
<!--                                emphasis: {-->
<!--                                    label: {-->
<!--                                        show: false,-->
<!--                                    },-->
<!--                                },-->

<!--                                selectedMode: false,-->
<!--                                data: [-->
<!--                                    { name: "罗湖区", value: 15 },-->
<!--                                    { name: "宝安区", value: 35 },-->
<!--                                ],-->
<!--                            },-->
<!--                        ],-->
<!--                    };-->
<!--                    myChart.setOption(option);-->
<!--                });-->
<!--            },-->
<!--        },-->
<!--        mounted() {-->
<!--            this.getmap();-->
<!--        },-->
<!--    };-->
<!--</script>-->
<!--<style scoped>-->
<!--    #main {-->
<!--        width: 100%;-->
<!--        height: 600px;-->
<!--        background-color: #ccc;-->
<!--    }-->
<!--</style>-->
