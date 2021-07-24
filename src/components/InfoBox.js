import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

const infoBox = ({
  active,
  title,
  cases,
  total,
  isGreen,
  isDark,
  isRed,
  ...props
}) => {
  // console.log(active);
  return (
    <Card
      onClick={props.onChangeCasesType}
      className={`infoBox ${active && "infoBox--selected"} 
      ${isGreen && "infoBox--green"} 
      ${isDark && "infoBox--dark"}
      ${isRed && "infoBox--red"}`}
      variant="outlined"
    >
      <CardContent>
        <Typography className="infoBox__title" color="textPrimary" variant="h5">
          {title}
        </Typography>
        <h2 className="infoBox__cases"> {cases} </h2>
        <Typography className="infoBox__total" variant="h5">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default infoBox;
