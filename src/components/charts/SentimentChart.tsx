import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { NewsAnalysis } from '../../types/analysis';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentChartProps {
  sentiment: NewsAnalysis['sentiment'];
}

export function SentimentChart({ sentiment }: SentimentChartProps) {
  const data = {
    labels: ['Sentiment'],
    datasets: [
      {
        label: 'Score de sentiment',
        data: [sentiment.score],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: -1,
        max: 1,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <p className="mt-4 text-gray-700">{sentiment.explanation}</p>
    </div>
  );
}