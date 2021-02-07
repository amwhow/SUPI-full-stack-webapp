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

const EvaluationChart = ({ reviewType, reviewRating }) => {
  const data = reviewRating
  // [{ name: "Order Date", rating: 5 }, { name: "Order Date", rating: 4.5 },{ name: "Order Date", rating: 4 },{ name: "Order Date", rating: 5 },{ name: "Order Date", rating: 5 }];
  return (
    <>
      <Title>{reviewType}</Title>
      <ResponsiveContainer>
    <LineChart
      width={550}
      height={200}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 5]}/>
      <Tooltip />
    </LineChart>
    </ResponsiveContainer>
    </>
  );
};

export default EvaluationChart;
