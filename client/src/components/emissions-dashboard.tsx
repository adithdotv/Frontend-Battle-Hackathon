import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmissionData {
  id: string;
  category: string;
  year: number;
  value: number;
  type: "Refurbishment" | "New Build";
  status: "Complete" | "Estimate";
}

const emissionsData: EmissionData[] = [
  { id: "1", category: "Office Complex A", year: 2023, value: 420, type: "Refurbishment", status: "Complete" },
  { id: "2", category: "Residential Tower B", year: 2023, value: 680, type: "New Build", status: "Complete" },
  { id: "3", category: "Mixed Use Development", year: 2024, value: 540, type: "New Build", status: "Estimate" },
  { id: "4", category: "Retrofit Project C", year: 2024, value: 380, type: "Refurbishment", status: "Complete" },
  { id: "5", category: "Commercial Hub D", year: 2024, value: 720, type: "New Build", status: "Estimate" },
  { id: "6", category: "Sustainable Housing", year: 2025, value: 450, type: "New Build", status: "Estimate" },
  { id: "7", category: "Green Office Tower", year: 2025, value: 320, type: "Refurbishment", status: "Estimate" },
  { id: "8", category: "Innovation Campus", year: 2025, value: 580, type: "New Build", status: "Estimate" },
];

const targets = [
  { value: 500, label: "500 kgCO₂e/m² – Target 2030", color: "#059669" },
  { value: 600, label: "600 kgCO₂e/m² – Target 2025", color: "#DC2626" },
];

type FilterType = "All" | "Refurbishment" | "New Build";
type FilterStatus = "All" | "Complete" | "Estimate";

export function EmissionsDashboard() {
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");

  const filteredData = emissionsData.filter(item => {
    const typeMatch = typeFilter === "All" || item.type === typeFilter;
    const statusMatch = statusFilter === "All" || item.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const maxValue = Math.max(...emissionsData.map(item => item.value), 800);
  const chartHeight = 400;

  const getBarHeight = (value: number) => (value / maxValue) * chartHeight;
  const getBarColor = (item: EmissionData) => {
    if (item.type === "Refurbishment") {
      return item.status === "Complete" ? "#10B981" : "#6EE7B7";
    } else {
      return item.status === "Complete" ? "#3B82F6" : "#93C5FD";
    }
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Category,Year,Value (kgCO₂e/m²),Type,Status\n" +
      filteredData.map(item => 
        `${item.category},${item.year},${item.value},${item.type},${item.status}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emissions_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dashboard-container"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Embodied Carbon Emissions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Interactive dashboard visualizing carbon footprint across construction projects
            </p>
          </div>

          {/* Filters Section */}
          <motion.div 
            className="filters-section mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="filter-group">
                <label className="filter-label">
                  <Filter className="h-4 w-4 mr-2" />
                  Type
                </label>
                <div className="filter-buttons">
                  {(["All", "Refurbishment", "New Build"] as FilterType[]).map((type) => (
                    <motion.button
                      key={type}
                      className={`filter-pill ${typeFilter === type ? 'active' : ''}`}
                      onClick={() => setTypeFilter(type)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Status</label>
                <div className="filter-buttons">
                  {(["All", "Complete", "Estimate"] as FilterStatus[]).map((status) => (
                    <motion.button
                      key={status}
                      className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart Container */}
          <motion.div 
            className="chart-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="chart-header">
              <h3 className="chart-title">Emissions by Project</h3>
              <Button 
                onClick={handleDownload}
                className="download-btn"
                variant="outline"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Download className="h-4 w-4 mr-2" />
                </motion.div>
                Download Data
              </Button>
            </div>

            <div className="chart-wrapper">
              {/* Y-Axis Labels */}
              <div className="y-axis">
                {[0, 200, 400, 600, 800].map((value) => (
                  <div key={value} className="y-axis-label" style={{
                    bottom: `${(value / maxValue) * chartHeight}px`
                  }}>
                    {value}
                  </div>
                ))}
                <div className="y-axis-title">kgCO₂e/m²</div>
              </div>

              {/* Chart Area */}
              <div className="chart-area" style={{ height: `${chartHeight}px` }}>
                {/* Grid Lines */}
                {[0, 200, 400, 600, 800].map((value) => (
                  <div
                    key={value}
                    className="grid-line"
                    style={{ bottom: `${(value / maxValue) * chartHeight}px` }}
                  />
                ))}

                {/* Target Lines */}
                {targets.map((target) => (
                  <div key={target.value} className="target-line-container">
                    <div
                      className="target-line"
                      style={{ 
                        bottom: `${(target.value / maxValue) * chartHeight}px`,
                        borderColor: target.color 
                      }}
                    />
                    <div
                      className="target-label"
                      style={{ 
                        bottom: `${(target.value / maxValue) * chartHeight + 5}px`,
                        color: target.color 
                      }}
                    >
                      {target.label}
                    </div>
                  </div>
                ))}

                {/* Bars */}
                <div className="bars-container">
                  {filteredData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bar-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: getBarHeight(item.value), 
                        opacity: 1 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.6 + index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className="bar"
                        style={{
                          backgroundColor: getBarColor(item),
                          height: "100%"
                        }}
                      />
                      <div className="bar-value">{item.value}</div>
                      <div className="bar-label">{item.category}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#10B981" }}></div>
                <span>Refurbishment (Complete)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#6EE7B7" }}></div>
                <span>Refurbishment (Estimate)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#3B82F6" }}></div>
                <span>New Build (Complete)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: "#93C5FD" }}></div>
                <span>New Build (Estimate)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}