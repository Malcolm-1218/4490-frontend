import React, { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { text } from "stream/consumers";
import { graph_colors } from "../../graph_colors";
import * as format from "../../helper/formatting";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";
import TileSelectBox from "../TileSelectBox";

export default function RegisteredVoters(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Set up dispatch to be able to add local periods
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Check if we need to fetch a new period for this corporation
    if (
      localPeriod !== props.globalPeriod &&
      !(localPeriod in corporation[props.corpId].periods)
    ) {
      dispatch(addCorporationPeriod(props.corpId, localPeriod));
    }
  }, [localPeriod]);

  // Access the redux store
  const corporation: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  if (localPeriod in corporation[props.corpId].periods) {
    const data: IRegisteredVoters[] =
      corporation[props.corpId].periods[localPeriod].registeredVoters;

    const formattedData: { name: string; value: number; fill: string }[] = [];
    for (const key in data[0]) {
      if (key === "republican") {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.republican,
        });
      } else if (key === "democratic") {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.democratic,
        });
      } else {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.independent,
        });
      }
    }

    // Custom label positioning and content
    const renderCustomLabel = (entry: any) => {
      const RADIAN = Math.PI / 180;

      // Unpack data from the entry
      const vBox: any = entry.viewBox;
      const cx: any = entry.cx;
      const cy: any = entry.cy;

      // Calculate correct position for the label
      const midAngle = (vBox.startAngle + vBox.endAngle) / 2;
      const radius = vBox.outerRadius * 0.825;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      let label;
      let text_color;
      if (entry.name === "republican") {
        text_color = " white";
        label = "R";
      } else if (entry.name === "democratic") {
        text_color = " white";
        label = "D";
      } else {
        text_color = " black";
        label = "I";
      }

      return (
        <text
          x={x}
          y={y}
          fill={text_color}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-md lg:text-xl"
        >
          {label}
        </text>
      );
    };

    // Custom tooltip style for each bar
    const CustomTooltip = ({ active, payload }: any) => {
      if (!active) {
        return null;
      }
      const data = payload[0].payload;

      let fill;
      let text_color;
      if (data.name == "democratic") {
        fill = graph_colors.democratic;
        text_color = " text-white";
      } else if (data.name == "republican") {
        fill = graph_colors.republican;
        text_color = " text-white";
      } else {
        fill = graph_colors.independent;
        text_color = " text-black";
      }

      return (
        <div
          className={"bg-other p-4 opacity-90 rounded-2xl" + text_color}
          style={{ backgroundColor: fill }}
        >
          <div>{format.capitalizeWord(data.name)} Party</div>
          <div>Received: ${format.formatNumber(data.value)}</div>
        </div>
      );
    };

    return (
      <div className="h-full w-full pb-4">
        <div className="w-full grid grid-cols-12">
          <span className="col-start-1 col-end-8 flex justify-start">
            Registered Voters
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              periods={["2017-2018", "2019-2020", "2021-2022"]}
              defaultValue={localPeriod}
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={formattedData}
              cx={"50%"}
              cy={"47.5%"}
              innerRadius={"60%"}
              outerRadius={"90%"}
            >
              <LabelList content={renderCustomLabel} />
            </Pie>

            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12">
          <span className="col-start-1 col-end-8 flex justify-start">
            Registered Voters
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              periods={["2017-2018", "2019-2020", "2021-2022"]}
              defaultValue={localPeriod}
            />
          </div>
        </div>
      </div>
    );
  }
}
