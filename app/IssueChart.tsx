"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <>
      <Card>
        <ResponsiveContainer height={300} width={"100%"}>
          <BarChart data={data}>
            <XAxis dataKey={"label"}></XAxis>
            <YAxis></YAxis>
            <Bar
              barSize={90}
              style={{ fill: "var(--accent-9)" }}
              dataKey={"value"}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default IssueChart;
