import React from "react"
import ReactDOM from 'react-dom'
//const echarts = require("echarts");
import './styles.css';

function App1() {
    const [sites, setSites] = React.useState([
        { name: 'xbmp', url: 'http://xbmp.org' },
        { name: 'youtube', url: 'http://youtube.com' },
        { name: 'cnn', url: 'http://cnn.com' },
        { name: 'Github', url: 'https://github.com/Dada01Github' },
        { name: 'AI', url: 'https://devv.ai/zh/search?threadId=d539jtc4hvy8' },


    ]);
    const [showModal, setShowModal] = React.useState(false);
    const [newSiteName, setNewSiteName] = React.useState('');
    const [newSiteUrl, setNewSiteUrl] = React.useState('');
    const [contextMenuSite, setContextMenuSite] = React.useState(null);
    const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });
    const [searchValue, setSearchValue] = React.useState('');

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    const clearSearch = () => {
        setSearchValue('');
    }
    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.search.value;
        const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        openInNewTab(url);
    };

    const addSite = () => {
        let formattedUrl = newSiteUrl;
        if (newSiteName && newSiteUrl) {
            if (!/^https?:\/\//i.test(newSiteUrl)) {
                if (!/^(file|File)/i.test(newSiteUrl)) {
                    formattedUrl = 'https://' + newSiteUrl;
                } else {
                    formattedUrl = newSiteUrl;
                }
            }

            // if (newSiteName && newSiteUrl) {
            // if (!/^https?:\/\//i.test(newSiteUrl)) {
            // formattedUrl = 'http://' + newSiteUrl;
            // }
            setSites([...sites, { name: newSiteName, url: formattedUrl }]);
            setShowModal(false);
            setNewSiteName('');
            setNewSiteUrl('');
        }
    };

    const handleContextMenu = (event, site) => {
        event.preventDefault();
        setContextMenuSite(site);
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        document.getElementById('context-menu').style.display = 'block';
    };

    const closeContextMenu = () => {
        document.getElementById('context-menu').style.display = 'none';
    };

    const editSite = () => {
        // Logic to edit the selected site
        const editedName = prompt("Enter the new name for the site", contextMenuSite.name);
        const editedUrl = prompt("Enter the new URL for the site", contextMenuSite.url);
        if (editedName && editedUrl) {
            setSites(sites.map(site => site.url === contextMenuSite.url ? { ...site, name: editedName, url: editedUrl } : site));
        }
        closeContextMenu();
    };

    const deleteSite = () => {
        setSites(sites.filter(s => s.url !== contextMenuSite.url));
        closeContextMenu();
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                // 执行取消操作的逻辑
                setShowModal(false); // 关闭模态框
                // 其他取消操作的逻辑...
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // 空数组表示只在组件挂载和卸载时执行

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center" onClick={closeContextMenu}>
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <form onSubmit={handleSearch} className="flex justify-between items-center mb-6">
                    <div className="relative flex items-center w-full mr-2">
                        <input
                            name="search"
                            type="text"
                            placeholder="search"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className="border p-2 w-full"
                        />
                        {searchValue && (
                            <button type="button" className="absolute right-0 mr-2 text-red-800" onClick={clearSearch}>
                                X
                            </button>
                        )}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-2 py-2 rounded">
                        🔎
                    </button>
                </form>
                <div className="grid grid-cols-5 gap-10 mx-auto px-70">
                    {sites.map((site, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center" style={{ height: '100px' }} onClick={() => openInNewTab(site.url)} onContextMenu={(e) => handleContextMenu(e, site)}>
                            <div className="flex items-center justify-center h-20 w-20 bg-blue-500 text-white rounded-full text-5xl font-bold mb-4 cursor-pointer">
                                {site.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="cursor-pointer font-bold text-green-300 text-1.5xl">{site.name}</p>
                        </div>
                    ))}

                    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-center cursor-pointer" onClick={() => setShowModal(true)}>   
                        <span style={{ fontSize: '3em', fontWeight: 'bold', color: 'lightblue', backgroundColor: 'white' }}>+</span>
                        {/* <i className="fas fa-plus text-6xl text-blue-500 bg-border-green-300 "></i>  
                        <span class="text-6xl text-blue-500 bg-border-green-300">+</span>
                        */}
                    </div>
                    <div id="context-menu" className="context-menu" style={{
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x
                    }}>
                        <div className="cursor-pointer" onClick={editSite}>修改</div>
                        <div className="cursor-pointer" onClick={deleteSite}>删除</div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-5 mt-5">
                    <div id="mainChart2" style={{ width: '100%', minHeight: '290px' }}></div>
                    <div id="mainChart1" style={{ width: '100%', minHeight: '290px' }}></div>
                </div>


            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">添加新网址</h3>
                            <div className="mt-2 px-7 py-3">
                                <input type="text" placeholder="网址名称" className="mb-3 px-3 py-2 border rounded w-full" value={newSiteName} onChange={(e) => setNewSiteName(e.target.value)} />
                                <input type="text" placeholder="链接网址" className="mb-3 px-3 py-2 border rounded w-full" value={newSiteUrl} onChange={(e) => setNewSiteUrl(e.target.value)} />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button id="ok-btn" onClick={addSite} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

//ReactDOM.render(<App />, document.getElementById('app'));
export default App1;

