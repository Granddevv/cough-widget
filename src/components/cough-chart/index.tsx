import React from "react";
import {
  ChartAboutSame,
  ChartGettingWorse,
  ChartMuchBetter,
  ChartSomewhatBetter,
  ChartSomewhatWorse,
} from "../../assets/charts";
import { ECoughStatus } from "../../model";
import "./style.scss";

type CoughChartProps = {
  status: ECoughStatus;
};

const CoughChart: React.FC<CoughChartProps> = ({ status }) => {
  return (
    <div className={`chart-container-${status}`}>
      {status === ECoughStatus.MUCH_BETTER && <ChartMuchBetter />}
      {status === ECoughStatus.SOMEWHAT_BETTER && <ChartSomewhatBetter />}
      {status === ECoughStatus.ABOUT_SAME && <ChartAboutSame />}
      {status === ECoughStatus.SOMEWHAT_WORSE && <ChartSomewhatWorse />}
      {status === ECoughStatus.GETTING_WORSE && <ChartGettingWorse />}
    </div>
  );
};

export default CoughChart;
