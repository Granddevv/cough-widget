import React from "react";
import "./style.scss";
import { ECoughStatus, TCoughInsight } from "../../model";
import IconMuchBetter from "../../assets/icons/icon_much_better.svg";
import IconSomewhatBetter from "../../assets/icons/icon_somewhat_better.svg";
import IconAboutSame from "../../assets/icons/icon_same.svg";
import IconSomewhatWorse from "../../assets/icons/icon_somewhat_worse.svg";
import IconGettingWorse from "../../assets/icons/icon_worse.svg";
import CoughChart from "../cough-chart";

type CoughItemProps = {
  data: TCoughInsight;
};

const CoughItem: React.FC<CoughItemProps> = ({ data }) => {
  return (
    <div className="cough_item">
      <div className="cough_item-left">
        <div className="cough_item-left-title">{data.coughs.toString()}</div>
        <div className="cough_item-left-desc">
          Last 24h comparing to the previous week
        </div>
        {data.status === ECoughStatus.MUCH_BETTER && (
          <div className="cough_item-left-alert">
            <img src={IconMuchBetter} />
            <span>Much better</span>
          </div>
        )}
        {data.status === ECoughStatus.SOMEWHAT_BETTER && (
          <div className="cough_item-left-alert">
            <img src={IconSomewhatBetter} />
            <span>Somewhat better</span>
          </div>
        )}
        {data.status === ECoughStatus.ABOUT_SAME && (
          <div className="cough_item-left-alert">
            <img src={IconAboutSame} />
            <span>About the same</span>
          </div>
        )}
        {data.status === ECoughStatus.SOMEWHAT_WORSE && (
          <div className="cough_item-left-alert">
            <img src={IconSomewhatWorse} />
            <span>Somewhat worse</span>
          </div>
        )}
        {data.status === ECoughStatus.GETTING_WORSE && (
          <div className="cough_item-left-alert">
            <img src={IconGettingWorse} />
            <span>Its getting worse</span>
          </div>
        )}
      </div>
      <div className="cough_item-right">
        <div className={`cough_item-right-label ${data.status}`}>
          {data.comparison.toString()}%
        </div>
        <div className="cough_item-right">
          <CoughChart status={data.status} />
        </div>
      </div>
    </div>
  );
};

export default CoughItem;
