import React, { useState } from "react";
import classNames from "classnames";
import { Card, CardBody } from "shards-react";

const SmallStats = ({ label, value, variation }) => {

  const cardClasses = classNames(
    "stats-small",
    variation && `stats-small--${variation}`
  );

  const cardBodyClasses = classNames(
    variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
  );

  const innerWrapperClasses = classNames(
    "d-flex",
    variation === "1" ? "flex-column m-auto" : "px-3"
  );

  const dataFieldClasses = classNames(
    "stats-small__data",
    variation === "1" && "text-center"
  );

  const labelClasses = classNames(
    "stats-small__label",
    "text-uppercase",
    variation !== "1" && "mb-1"
  );

  const valueClasses = classNames(
    "stats-small__value",
    "count",
    variation === "1" ? "my-3" : "m-0"
  );

  return (
    <Card small className={cardClasses}>
      <CardBody className={cardBodyClasses}>
        <div className={innerWrapperClasses}>
          <div className={dataFieldClasses}>
            <span className={labelClasses}>{label}</span>
            <h6 className={valueClasses}>{value}</h6>
          </div>
        </div>
      </CardBody>
    </Card>
  );

}



SmallStats.defaultProps = {
  increase: true,
  percentage: 0,
  value: 0,
  label: "Label",
};

export default SmallStats;
