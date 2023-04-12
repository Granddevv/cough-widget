import React, { useCallback, useEffect, useState } from "react";
import CoughItem from "../cough-item";
import "./style.scss";
import IconClose from "../../assets/icons/icon_close.svg";
import axios from "axios";
import { ECoughStatus, TCoughData, TCoughInsight } from "../../model";

type CoughWidgetProps = {
  onClose: () => void;
};

const CoughWidget: React.FC<CoughWidgetProps> = ({ onClose }) => {
  const [coughList, setCoughList] = useState<TCoughInsight[]>([]);

  const getStatus = useCallback((prev: number, after: number) => {
    if (prev === 0) {
      if (after > 0) {
        return {
          status: ECoughStatus.MUCH_BETTER,
          comparison: 100,
        };
      }
      return { status: ECoughStatus.ABOUT_SAME, comparison: 0 };
    }
    const comparison: number = Math.round(((after - prev) / prev) * 100);
    if (comparison >= 50) {
      return {
        status: ECoughStatus.MUCH_BETTER,
        comparison: comparison,
      };
    }
    if (comparison >= 10) {
      return { status: ECoughStatus.SOMEWHAT_BETTER, comparison: comparison };
    }
    if (comparison >= -10) {
      return { status: ECoughStatus.ABOUT_SAME, comparison: comparison };
    }
    if (comparison >= -50) {
      return { status: ECoughStatus.SOMEWHAT_WORSE, comparison: comparison };
    }

    return { status: ECoughStatus.GETTING_WORSE, comparison: comparison };
  }, []);

  const handleProcessData = useCallback(
    (coughData: TCoughData[]) => {
      const coughList = [];
      for (let index = 0; index < coughData.length; index++) {
        const status = getStatus(
          coughData[index - 1]?.coughs || 0,
          coughData[index].coughs
        );
        coughList.push({
          coughs: coughData[index].coughs,
          ...status,
        });
      }
      setCoughList(coughList);
    },
    [getStatus]
  );

  const handleLoadCoughData = useCallback(async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/dummy_cough_events`,
        {
          params: { from: "2020-01-01" },
        }
      );
      handleProcessData(data.data);
    } catch (error) {
      console.log("error --", error);
    }
  }, [handleProcessData]);

  useEffect(() => {
    handleLoadCoughData();
  }, [handleLoadCoughData]);

  return (
    <div className="cough_widget">
      <div className="cough_widget-header">
        <div className="cough_widget-header-wrapper">
          <div className="cough_widget-header-wrapper-action" onClick={onClose}>
            <img alt="close" src={IconClose} />
          </div>
          <div className="cough_widget-header-wrapper-title">Insights</div>
          <div
            className="cough_widget-header-wrapper-refresh"
            onClick={handleLoadCoughData}
          >
            Refresh
          </div>
        </div>
      </div>
      <div className="cough_widget-content">
        {coughList.map((item: TCoughInsight, index: number) => (
          <CoughItem data={item} key={`key-cough-item-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CoughWidget;
