import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles({
    Box:{
        width:"100%",
        height:"100%",
    },
    flexBox:{
        display:"flex",
        justifyContent:"space-between"
    },
    borderBox:{
        color:"rgb(255,255,255)",
        backgroundColor:"rgb(100,100,255)",
        border:"1px solid rgb(100,100,255)",
        borderRadius:"20px",
        width:"60px",
        padding:"5px",
        textAlign:"center",
        fontSize:"12px"
    },
    labelStyle:{
        color:"rgb(80,80,80)",
        fontWeight:"bold",
    },
    totalStyle:{
        color:"rgb(30,30,30)",
        fontWeight:"bold",
    },
    sinceDate:{
        marginLeft:"5%",
        color:"rgb(120,120,120)"
    },
    greenColor:{
        color: "rgb(0,150,0)"
    },
    redColor:{
        color: "rgb(255,5,5)"
    },
  });
  

export default function DashBoardDataBox(props){
    const classes = useStyles();
    return(
        <Box className={classes.Box}>
            <ListItem className={classes.flexBox}>
                <Typography className={classes.labelStyle} variant="h6">{props.label}</Typography>
                <p className={classes.borderBox}>{props.type}</p>
            </ListItem>
            <ListItem>
            <Typography variant="h6" className={classes.totalStyle}>{props.total}</Typography>
            </ListItem>
            <ListItem>
            <Typography className={props.profit >= 0 ? classes.greenColor : classes.redColor }>{props.profit > 0 ? "+" : ""}{props.profit}%</Typography>
            <Typography className={classes.sinceDate}>{props.sinceDate}</Typography>
            </ListItem>         
        </Box>
    )
} 
