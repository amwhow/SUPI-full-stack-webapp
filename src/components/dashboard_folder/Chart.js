import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  // to customise with dynamic data record
  createData('JAN', 0),
  createData('FEB', 300),
  createData('MAR', 600),
  createData('APR', 800),
  createData('MAY', 1500),
  createData('JUN', 2000),
  createData('JUL', 2400),
  createData('AUG', 2400),
  createData('SEP', 1500),
  createData('OCT', 1300),
  createData('NOV', 800),
  createData('DEC', 500),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Cost Overview</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
