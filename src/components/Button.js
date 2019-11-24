import React from 'react';
import Button from '@material-ui/core/Button'

export default function CalcButton(props) {
    return  <div className={props.elementClass}>
                <Button variant="contained" style={{width: '100%'}} color="primary" onClick={props.action} disabled={props.isDisabled}>
                    {props.label}
                </Button>
            </div>;
}
