//function Practice() {
//    return (
//        <div>
//            <div>
//                <h1>연습용차트</h1>
//                <canvas id="myChart" width="400" height="400"></canvas>
//            </div>
//            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//            <script>
//                const labels = [
//                'January',
//                'February',
//                'March',
//                'April',
//                'May',
//                'June',
//                ];

//                const data = {
//                    labels: labels,
//                datasets: [{
//                    label: 'My First dataset',
//                backgroundColor: 'rgb(255, 99, 132)',
//                borderColor: 'rgb(255, 99, 132)',
//                data: [0, 10, 5, 2, 20, 30, 45],
//    }]
//  };

//                const config = {
//                    type: 'line',
//                data: data,
//                options: { }
//  };
//            </script>
//        </div>
//    );
//}

//export default Practice;



/*******************************************************************/
import React, { Component, useReducer } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const ACTION_TYPE = {
    ALL_LIST: 1,
    CHART_DATA_LOADED: 2
};
//Object.freeze(ACTION_TYPE);

const dataReducer = (state, action) => {
    console.log('dataReducer');
    switch (action.type) {
        case ACTION_TYPE.ALL_LIST:
            return {
                ...state,
                dataList: action.dataList,
                loading: action.loading,
            };
        case ACTION_TYPE.CHART_DATA_LOADED:
            console.log(action)
            return {
                ...state,
                chartLabels: action.chartLabels,
                chartData: action.chartData,
                chartLoading: true
            };
        default:
            return state;
    }
}

//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend
//);

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '약국 위치 자료',
        },
    },
};


const Practice = () => {
    console.log('Practice');
    const [state, dispatch] = useReducer(dataReducer, {
        dataList: [],
        loading: false,
        chartLoading: false,
        chartLabels: [],
        chartData: []
    }, initData);

    const data = {
        labels: !state.chartLoading ? [] : state.chartLabels,
        datasets: [
            {
                label: 'pharmacy data',
                data: !state.chartLoading ? [] : state.chartData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>data뭔지확인해야댐', state.chartData);

    const renderForecastsTable = (dataList) => {
        console.log('render');
        // return (
            //<table className='table table-striped' aria-labelledby="tabelLabel">
            //    <thead>
            //        <tr>
            //            <th>이름</th>
            //            <th>시도코드</th>
            //            <th>시도코드명</th>
            //            <th>시군구코드</th>
            //            <th>시군구코드명</th>
            //            <th>읍면동</th>
            //            <th>우편번호</th>
            //            <th>주소</th>
            //            <th>전화번호</th>
            //            <th>개설일자</th>
            //            <th>X좌표</th>
            //            <th>Y좌표</th>
            //        </tr>
            //    </thead>
            //    <tbody>
            //        {dataList.map(data =>
            //            <tr key={data.이름}>
            //                <td>{data.시도코드}</td>
            //                <td>{data.시도코드명}</td>
            //                <td>{data.시군구코드}</td>
            //                <td>{data.시군구코드명}</td>
            //                <td>{data.읍면동}</td>
            //                <td>{data.우편번호}</td>
            //                <td>{data.주소}</td>
            //                <td>{data.전화번호}</td>
            //                <td>{data.개설일자}</td>
            //                <td>{data.X좌표}</td>
            //                <td>{data.Y좌표}</td>
            //            </tr>
            //        )}
            //    </tbody>
            //</table>
      // );
    };

    async function initData() {
        console.log('init');
        await loadChartData();

        const response = await fetch('pharmacydata/AllList');
        dispatch({
            type: ACTION_TYPE.ALL_LIST,
            dataList: await response.json(),
            loading: true
        });
        console.log('init 끝???????????????/');
    }

    async function loadChartData() {
        console.log('load');
        fetch('pharmacydata/loadChartDataXXX')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: ACTION_TYPE.CHART_DATA_LOADED,
                    chartLabels: data.chartLabels,
                    chartData: data.chartData,
                    chart_loading: true
                });
            })
    }
        console.log('load 잘 끝남???????????????????');
    }


    //let contents = !state.loading
    //    ? <p><em>Loading...</em></p>
    //    : renderForecastsTable(state.dataList);

    //return (
    //    <div>
    //        <div>
    //            <Bar options={options} data={data} />
    //        </div>
    //        <div>
    //            <h1 id="tabelLabel" >Data</h1>
    //            {contents}
    //        </div>
    //    </div>
    //);

export default Practice;