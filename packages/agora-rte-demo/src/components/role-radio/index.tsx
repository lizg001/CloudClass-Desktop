import React from 'react';
import { Theme, RadioGroup, Radio, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { t } from '../../i18n';

const useStyles = makeStyles ((theme: Theme) => ({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  required: {
    fontSize: '12px',
    color: '#ff0000',
    lineHeight: '17px',
    position: 'absolute',
    top: '23px',
  }
}));

export const RoleRadio: React.FC<any> = (props) => {
  const classes = useStyles();
  // props.type === 3?
  return (
    <RadioGroup className={classes.radioGroup} row value={props.role} onChange={props.onChange}>
      <FormControlLabel
        className={"custom-radio align-left"}
        value="teacher"
        control={<Radio className={"custom-radio"} color="primary" />}
        label={t("home.teacher")}
        labelPlacement="end"
      />
      <FormControlLabel
        className={"custom-radio align-middle"}
        value="assistant"
        control={<Radio className={"custom-radio"} color="primary" />}
        label={t("home.assistant")}
        labelPlacement="end"
      /> 
      <FormControlLabel
        className={"custom-radio align-right"}
        value="invisible"
        control={<Radio className={"custom-radio"} color="primary" />}
        label={t("home.invisible")}
        labelPlacement="end"
      />
      <FormControlLabel
        className={"custom-radio align-right"}
        value="student"
        control={<Radio className={"custom-radio"} color="primary" />}
        label={t("home.student")}
        labelPlacement="end"
      />
      {props.requiredText ? <Typography className={classes.required}>{props.requiredText}</Typography> : null}
    </RadioGroup>
  )
}