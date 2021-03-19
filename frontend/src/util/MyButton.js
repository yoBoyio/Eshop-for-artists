import { Tooltip } from '@material-ui/core';
import React from 'react'
import IconButton from '@material-ui/core/IconButton';

export default  ({children, onClick,tip, btnClassName, tipClassname}) => (
    <Tooltip title={tip} className={tipClassname} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);