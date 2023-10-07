import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { APIV1 } from "../redux/config/config";

function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const formatMonth = (month) => {
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return monthNames[month - 1];
  };

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await APIV1.get("/api/order/income");
        setIncomeData(res.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  const sortedIncomeData = incomeData.sort(
    (a, b) => a._id.year * 100 + a._id.month - (b._id.year * 100 + b._id.month)
  );

  const chartData = sortedIncomeData.map((data) => ({
    tháng: formatMonth(data._id.month),
    "Tổng doanh thu": data.total,
  }));

  const maxTotal = Math.max(...chartData.map((data) => data["Tổng doanh thu"]));

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return (tickItem / 1000000).toFixed(1) + "M VNĐ";
    } else if (tickItem >= 1000) {
      return (tickItem / 1000).toFixed(1) + "K VNĐ";
    } else {
      return tickItem + " VNĐ";
    }
  };

  const tickValues = chartData.map((data) => data.tháng);

  return (
    <div className="mt-10 ml-10">
      <h2 className="mx-auto text-center">Biểu đồ doanh thu năm 2023</h2>
      <ComposedChart
        width={1000}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis
          dataKey="tháng"
          tick={(props) => {
            const index = tickValues.indexOf(props.payload.value);
            if (index !== -1) {
              return (
                <text {...props} y={props.y + 15} textAnchor="middle">
                  {props.payload.value}
                </text>
              );
            }
            return null;
          }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={formatYAxis}
          allowDataOverflow={true}
          domain={[0, maxTotal]}
        />
        <YAxis yAxisId="right" orientation="right" allowDataOverflow={true} />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          dataKey="Tổng doanh thu"
          barSize={20}
          fill="#8884d8"
          yAxisId="left"
          label={{
            position: "top",
            formatter: (value) => formatYAxis(value),
          }}
        />
      </ComposedChart>
    </div>
  );
}

export default Income;
