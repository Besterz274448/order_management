import React from "react";
import {
  makeStyles,
  Button,
  Typography,
  TextField,
  ListItem,
  ListItemText,
  List,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  PaperComponent: {
    marginTop: 20,
    padding: 15,
    minHeight: "80vh",
    maxHeight: "120vh",
    borderRadius: 5,
  },
  messageInteractArea: {
    height: "60vh",
    overflowY: "auto",
    width: "100%",
  },
  messageSendArea: {
    marginTop: 20,
  },
  sendButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  comment: {
    display: "inline-block",
    padding: 7,
    borderRadius: 6,
  },
  commentContact: {
    color: "black",
    background: "#EBEDEF",
    float: "left",
  },
  commentAgent: {
    color: "white",
    background: "#3f50b5",
    float: "right",
  },
  commentInfo: {
    fontSize: 12,
    opacity: 0.9,
  },
});

export default function LiveChat() {
  const classes = useStyles();

  return (
    <>
      <Paper variant="outlined" className={classes.PaperComponent}>
        <Typography variant="h6" color="textPrimary" display="initial">
          คอมเมนต์ทั้งหมด
        </Typography>
        <Divider />
        <List className={classes.messageInteractArea}>
          <ListItem key="1">
            <Grid container item xs={12} lg={8}>
              <Grid item xs={12} lg={12}>
                <Typography
                  className={`${classes.comment} ${classes.commentContact}`}
                >
                  Hey man, What's up ?
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <ListItemText
                  disableTypography
                  align="left"
                  secondary={
                    <Typography
                      className={`${classes.commentInfo}`}
                    >
                      Thongchai Trakulparn {">"} 09:30
                    </Typography>
                  }
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="2">
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  className={`${classes.comment} ${classes.commentAgent}`}
                >
                  Hey, Iam Good! What about you ?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align="right"
                  secondary={
                    <Typography
                      className={classes.commentInfo}
                    >
                      10:30
                    </Typography>
                  }
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Divider />
        <Grid container className={classes.messageSendArea}>
          <Grid item xs={12} md={9} lg={9}>
            <TextField
              id="outlined-basic-email"
              label="พิมพ์ข้อความที่นี่.."
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.sendButton}
              fullWidth
            >
              <SendIcon />
              &nbsp;&nbsp;ส่ง
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}