import React from 'react';
import { Line } from 'react-chartjs-2';

const UserChart = props => {
    const data = {
        labels: ['april-27', 'april-29', 'april-28', 'may-1', 'may-2'],
        datasets: [{
            label: 'Happiness',
            data: [1, 2, 4, 4, 6],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    }


    return <Line data={data} />
}

export default UserChart;