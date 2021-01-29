import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function BreadCrumpsAddProduct(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {props.before.map((data,index)=>{
        return(
          <Link key={index} color="primary" href={data.href}>{data.name}</Link>
        )
      })}
      <Typography color="textPrimary">{props.presentpage}</Typography>
    </Breadcrumbs>
  );
}