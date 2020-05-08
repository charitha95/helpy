import React from 'react';
import { Line } from 'react-chartjs-2';

const UserChart = props => {
  const data = {
    labels: [...props.dates],
    datasets: [{
      label: 'Happiness',
      data: [...props.values],
      backgroundColor: [
        'rgba(99, 255, 110, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  }
  console.log(props)

  
  return <Line data={data} />
}

export default UserChart;