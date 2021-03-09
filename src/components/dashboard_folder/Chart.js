import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import Title from "./Title";

function createData(date, amount) {
  return { date, amount };
}

export default function Chart({ invoiceData }) {
  const theme = useTheme();
  // error handling and filter the paid invoice
  if (
    invoiceData &&
    invoiceData.filter((invoice) => invoice.paid === true).length > 0
  ) {
    let data = [];
    // sort data from earlier to the latest
    const sortDataByDate = invoiceData.sort((a, b) => {
      let dateA = new Date(a.receivedDate);
      let dateB = new Date(b.receivedDate);
      return dateA - dateB;
    });
    sortDataByDate.each((invoice) => {
      data.push(createData(invoice.receivedDate, invoice.totalPrice));
    });
    return (
      <>
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
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                }}
              >
                Costs ($)
              </Label>
            </YAxis>
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  } else {
    return (
      <>
        <Title>Cost Overview</Title>
        <ResponsiveContainer>
          <LineChart
            data={""}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                }}
              >
                Costs ($)
              </Label>
            </YAxis>
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
}
