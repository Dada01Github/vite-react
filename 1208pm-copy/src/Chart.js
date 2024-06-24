
// echart.js
import React from "react"
import ReactDOM from 'react-dom'
const echarts = require("echarts");
import './styles.css';

function Chart() {
    React.useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(
                "http://ccc.sea2rain.top:9999/data/jielongweekreport.json"
                //"http://localhost:9999/data/jielongweekreport.json"
            );
            const data1 = await response1.json();
            const list_durations1 = [];
            const list_times1 = [];
            const list_weekdays1 = Object.keys(data1);
            list_weekdays1.forEach((key) => {
                list_times1.push(data1[key][0]);
                list_durations1.push(data1[key][1]);
            });
            drawChart2(list_times1, list_durations1, list_weekdays1);
            const response2 = await fetch(
                "http://ccc.sea2rain.top:9999/data/jielongweek_last_report.json"
                //"http://localhost:9999/data/jielongweek_last_report.json"
            );
            const data2 = await response2.json();
            const list_durations2 = [];
            const list_times2 = [];
            const list_weekdays2 = Object.keys(data2);
            list_weekdays2.forEach((key) => {
                list_times2.push(data2[key][0]);
                list_durations2.push(data2[key][1]);
            });
            drawChart1(list_times2, list_durations2, list_weekdays2);
        };
        fetchData();
    }, []);

    const drawChart1 = (list_times, list_durations, list_weekdays) => {

        var chartDom = document.getElementById('mainChart1');
        var myChart = echarts.init(chartDom);
        var option;
        const colors = ['#5470C6', '#91CC75', '#EE6666'];
        option = {
            title: {
                text: ["小白慢爬营成长学习接龙周报(last)"],
                textStyle: {
                    fontSize: 15,
                    color: "blue",
                    fontWeight: "bold",
                },
            },
            color: colors,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            grid: {
                right: "20%",
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        type: "png",
                        name: "Jielong_last_week_report" + new Date().toDateString(),
                        backgroundColor: "white",
                    },
                },
            },
            legend: {
                data: ["接龙人数", "累计时长"],
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    // prettier-ignore
                    fontWeight: 'bold',
                    axisLabel: { fontSize: 8, color: "black", fontWeight: "bold" },
                    color: colors[2],
                    data: list_weekdays,
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "学习累计时长（小时）",
                    fontWeight: "bold",
                    yxisLabel: { fontSize: 10 },
                    position: "right",
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0],
                        },
                    },
                    axisLabel: {
                        formatter: "{value}",
                        fontWeight: "bold",
                    },
                },
                {
                    type: "value",
                    name: "接龙人数（人）",
                    fontWeight: "bold",
                    position: "left",
                    yxisLabel: { fontSize: 10 },
                    alignTicks: true,
                    offset: 0,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#83bff6",
                        },
                    },
                    axisLabel: {
                        formatter: "{value}",
                        fontWeight: "bold",
                    },
                },
            ],
            series: [
                {
                    name: "累计时长",
                    type: "bar",
                    barWidth: 35,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#83bff6",
                        },
                        { offset: 0.5, color: "#188df0" },
                        { offset: 1, color: "#188df0" },
                    ]),
                    label: {
                        show: true,
                        position: "inside",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                    },
                    data: list_durations,
                },
                {
                    name: "接龙人数",
                    type: "line",
                    lineStyle: { width: 4 },
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: "#00ff00",
                        },
                        { offset: 1, color: "#00a86b" },
                    ]),
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        position: "top",
                        color: "red",
                        fontWeight: "bold",
                    },
                    data: list_times,
                },
            ],
        };
        option && myChart.setOption(option);
    };

    const drawChart2 = (list_times, list_durations, list_weekdays) => {
        var chartDom = document.getElementById('mainChart2');
        var myChart = echarts.init(chartDom);
        var option;
        const colors = ['#5470C6', '#91CC75', '#EE6666'];
        option = {
            title: {
                text: ['小白慢爬营成长学习接龙周报(on)'],
                textStyle: {
                    fontSize: 15,
                    color: 'red',
                    fontWeight: 'bold'
                },

            },
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '20%'
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: true },
                    restore: { show: true },
                    saveAsImage: {
                        type: 'png',
                        name: 'Jielong_weekly_report' + new Date().toDateString(),
                        backgroundColor: 'white',
                    },
                }
            },
            legend: {
                data: ['接龙人数', '累计时长']
            },
            xAxis: [
                {
                    type: 'category',

                    axisTick: {
                        alignWithLabel: true
                    },
                    // prettier-ignore
                    fontWeight: 'bold',
                    axisLabel: { fontSize: 8, fontWeight: 'bold' },
                    color: colors[2],
                    data: list_weekdays
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '学习累计时长（小时）',
                    fontWeight: 'bold',
                    yxisLabel: { fontSize: 10 },
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        fontWeight: 'bold'
                    }
                },
                {
                    type: 'value',
                    name: '接龙人数（人）',
                    fontWeight: 'bold',
                    position: 'left',
                    yxisLabel: { fontSize: 10 },
                    alignTicks: true,
                    offset: 0,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        fontWeight: 'bold'
                    }
                },
            ],
            series: [
                {
                    name: '累计时长',
                    type: 'bar',
                    barWidth: 35,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0, color: '#00ff00'
                    }, {
                        offset: 1, color:
                            '#00a86b'
                    }]),
                    label: {
                        show: true,
                        position: 'inside',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold'
                    },
                    data: list_durations
                },
                {
                    name: '接龙人数',
                    type: 'line',
                    lineStyle: { width: 4 },
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0, color: '#83bff6'
                    }, {
                        offset: 0.5, color:
                            '#188df0'
                    }, { offset: 1, color: '#188df0' }]),
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: 12,
                        color: 'red',
                        fontWeight: 'bold'
                    },
                    data: list_times
                },
            ]
        };
        option && myChart.setOption(option);
    };

    return (
        
            <div className="bg-white p-10 rounded-lg shadow-lg">

                <div className="bg-white shadow rounded-lg p-5 mt-5">
                    <div id="mainChart2" style={{ width: '100%', minHeight: '290px' }}></div>
                    <div id="mainChart1" style={{ width: '100%', minHeight: '290px' }}></div>
                </div>


            </div>


        
    );
}

export default Chart;
//ReactDOM.render(<Chart />, document.getElementById('chart'));

