import React, { useCallback, useEffect, useState } from "react";
import CoughItem from "../cough-item";
import "./style.scss";
import IconClose from "../../assets/icons/icon_close.svg";
import axios from "axios";
import { ECoughStatus, TCoughData, TCoughInsight } from "../../model";
import { subDays } from "date-fns";

type CoughWidgetProps = {
  onClose: () => void;
};

const CoughWidget: React.FC<CoughWidgetProps> = ({ onClose }) => {
  const [coughItem, setCoughItem] = useState<TCoughInsight | null>(null);

  const getStatus = useCallback((average: number, current: number) => {
    if (average === 0) {
      if (current > 0) {
        return {
          status: ECoughStatus.MUCH_BETTER,
          comparison: 100,
        };
      }
      return { status: ECoughStatus.ABOUT_SAME, comparison: 0 };
    }

    const comparison: number = Math.round(
      ((current - average) / average) * 100
    );
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
      const average =
        coughData.reduce(
          (acc: number, currentItem: TCoughData, index: number) =>
            index === coughData.length - 1 ? acc : acc + currentItem.coughs,
          0
        ) /
        (coughData.length - 1);

      const status = getStatus(average, coughData[coughData.length - 1].coughs);

      let coughItem = {
        coughs: coughData[coughData.length - 1].coughs,
        ...status,
      };

      setCoughItem(coughItem);
    },
    [getStatus]
  );

  const handleLoadCoughData = useCallback(async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/dummy_cough_events`,
        {
          params: {
            from: subDays(new Date(), 8),
            to: new Date(),
            aggregation: "day",
          },
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
        {coughItem && <CoughItem data={coughItem} />}
      </div>
    </div>
  );
};

export default CoughWidget;
