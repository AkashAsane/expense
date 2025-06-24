import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import "./Barchart.css"

const CategoryBarChart = ({ category, amount }) => {
    const data = [
      {
        name: category,
        value: amount,
      },
    ];
  
    return (
      <div className="category-bar-chart">
        <h4 className="category-name">{category}:</h4>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={40}>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide  />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[0, 10, 10, 0]}  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default CategoryBarChart;