"use client";
import { Radar, Bar } from 'react-chartjs-2';

const TraitVisualization = ({ traitWeights }) => {
  const traits = Object.keys(traitWeights);
  const scores = Object.values(traitWeights);

  const radarData = {
    labels: traits,
    datasets: [
      {
        label: 'Your Trait Scores',
        data: scores,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        ticks: {
          font: {
            size: 12,
            weight: 'medium'
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      }
    },
  };

  const barData = {
    labels: traits,
    datasets: [
      {
        data: scores,
        backgroundColor: scores.map(score => 
          score >= 70 ? 'rgba(34, 197, 94, 0.6)' :
          score < 50 ? 'rgba(249, 115, 22, 0.6)' :
          'rgba(99, 102, 241, 0.6)'
        ),
        borderColor: scores.map(score => 
          score >= 70 ? 'rgb(34, 197, 94)' :
          score < 50 ? 'rgb(249, 115, 22)' :
          'rgb(99, 102, 241)'
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.raw}%`,
          title: (context) => context[0].label
        },
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: 'Score Percentage',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: { top: 10 }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 12,
          font: {
            size: 12,
            weight: 'bold'
          },
          align: 'center',
          crossAlign: 'far',
          callback: (value) => {
            const label = traits[value];
            return label.length > 20 ? [label.slice(0, 20) + '...'] : label;
          }
        },
        afterFit: (scaleInstance) => {
          scaleInstance.width = 180;
        }
      }
    },
    animation: {
      duration: 2000,
    },
    layout: {
      padding: {
        left: 20,
        right: 30,
        top: 20,
        bottom: 20
      }
    }
  };

  const chartOptions = {
    plugins: {
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.imageSmoothingQuality = "high";
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 print:gap-8">
      <div className="grid md:grid-cols-2 gap-4 print:gap-8">
        {/* Radar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm print:shadow-none print-chart">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 print:text-black">
            Trait Distribution
          </h3>
          <div className="aspect-square w-full max-w-[500px] mx-auto">
            <Radar 
              data={radarData} 
              options={{...radarOptions, ...chartOptions}}
              className="print:max-h-[300px]"
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm print:shadow-none print-chart">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Detailed Scores</h3>
          <div className="h-[400px] md:h-[500px] relative">
            <div className="absolute inset-0">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend with print optimization */}
      <div className="bg-white p-4 rounded-xl shadow-sm print:shadow-none print:mt-4">
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-8 min-w-[300px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Strong (≥70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Moderate (50-69%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Needs Development (≤49%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraitVisualization;
