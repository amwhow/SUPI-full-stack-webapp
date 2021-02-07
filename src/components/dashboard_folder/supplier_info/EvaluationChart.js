import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from '../Title';


const data = [{ name: "Order Date", rating: 5 }, { name: "Order Date", rating: 4.5 },{ name: "Order Date", rating: 4 },{ name: "Order Date", rating: 5 },{ name: "Order Date", rating: 5 }];

const EvaluationChart = () => {
  return (
    <>
      <Title>Cost Overview</Title>
      <ResponsiveContainer>
    <LineChart
      width={550}
      height={200}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <XAxis dataKey="name" />
      <YAxis domain={[0, 5]}/>
      <Tooltip />
    </LineChart>
    </ResponsiveContainer>
    </>
  );
};

export default EvaluationChart;
