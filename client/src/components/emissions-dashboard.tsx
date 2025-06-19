import { Download } from "lucide-react";
import { motion } from "framer-motion";

interface YearData {
  year: number;
  value: number;
}

interface MetricData {
  title: string;
  primaryValue: number;
  unit: string;
  changeFromBaseline: {
    percentage: number;
    direction: 'up' | 'down';
    baselineYear: number;
  };
  yearlyData: YearData[];
}

const sampleData: MetricData[] = [
  {
    title: "Managed portfolio carbon footprint",
    primaryValue: 45048,
    unit: "tCO₂e",
    changeFromBaseline: {
      percentage: 16,
      direction: 'up',
      baselineYear: 2019
    },
    yearlyData: [
      { year: 2019, value: 38800 },
      { year: 2020, value: 42150 },
      { year: 2021, value: 43900 },
      { year: 2022, value: 44200 },
      { year: 2023, value: 45048 }
    ]
  },
  {
    title: "Energy intensity",
    primaryValue: 142.5,
    unit: "kWh/m²",
    changeFromBaseline: {
      percentage: 8,
      direction: 'down',
      baselineYear: 2019
    },
    yearlyData: [
      { year: 2019, value: 155.2 },
      { year: 2020, value: 148.7 },
      { year: 2021, value: 145.3 },
      { year: 2022, value: 143.8 },
      { year: 2023, value: 142.5 }
    ]
  },
  {
    title: "Total energy consumption",
    primaryValue: 287650,
    unit: "kWh",
    changeFromBaseline: {
      percentage: 12,
      direction: 'up',
      baselineYear: 2019
    },
    yearlyData: [
      { year: 2019, value: 256800 },
      { year: 2020, value: 268400 },
      { year: 2021, value: 275200 },
      { year: 2022, value: 281900 },
      { year: 2023, value: 287650 }
    ]
  }
];

function MetricPanel({ data }: { data: MetricData }) {
  const maxValue = Math.max(...data.yearlyData.map(d => d.value));
  const currentYear = Math.max(...data.yearlyData.map(d => d.year));
  
  return (
    <motion.div 
      className="metric-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="metric-header">
        <h3 className="metric-title">{data.title}</h3>
        <div className="metric-value-container">
          <span className="metric-primary-value">
            {data.primaryValue.toLocaleString()}
          </span>
          <span className="metric-unit">{data.unit}</span>
        </div>
        <div className="metric-change">
          <span className={`change-indicator ${data.changeFromBaseline.direction}`}>
            {data.changeFromBaseline.direction === 'up' ? '↑' : '↓'} {data.changeFromBaseline.percentage}%
          </span>
          <span className="change-baseline">from {data.changeFromBaseline.baselineYear}</span>
        </div>
      </div>
      
      <div className="metric-chart">
        <div className="bar-chart">
          {data.yearlyData.map((yearData, index) => {
            const percentage = (yearData.value / maxValue) * 100;
            const isCurrentYear = yearData.year === currentYear;
            
            return (
              <div key={yearData.year} className="bar-container">
                <div className="bar-background">
                  <motion.div 
                    className={`bar-fill ${isCurrentYear ? 'current-year' : 'previous-year'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
                <div className="bar-label">
                  <span className="bar-year">{yearData.year}</span>
                  <span className="bar-value">{yearData.value.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="metric-actions">
        <button className="download-btn">
          <Download size={16} />
          <span>Download</span>
        </button>
        <button className="breakdown-link">
          See full breakdown
        </button>
      </div>
    </motion.div>
  );
}

export function EmissionsDashboard() {
  return (
    <section className="emissions-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Portfolio Metrics Dashboard</h2>
          <p className="dashboard-subtitle">
            Track your portfolio's environmental impact and energy performance over time
          </p>
        </div>
        
        <div className="metrics-grid">
          {sampleData.map((metric, index) => (
            <MetricPanel key={index} data={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}