import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import {
  StepLabel,
  StepContent,
  Grid,
  Card,
  Box,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import BTCustom from "./Element/BTCustom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Phone from "./Element/InputPhone";
import DragDrop from "./dragDropImg";
//this dialog is wont props{setOpen(true,false) and open}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: "100%",
  },
  cardSelect: { backgroundColor: "#ADFBF5" },
  imageBox: {
    width: "100%",
    margin: "auto auto",
    paddingTop: "10%",
    paddingBottom: "10%",
    height: "100%",
    border: "3px dashed rgb(200,200,200)",
  },
  imageContent: {
    textAlign: "center",
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
function getSteps() {
  return ["เลือกแพ็คเกจ", "ช่องทางการชำระเงิน", "แจ้งการชำระเงิน", "เสร็จสิ้น"];
}

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function DialogUpPackage(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [upgrade, setUpgrade] = React.useState({
    service: "",
    price: "",
    paymentBank: 0,
    paymentSlip: 0,
    status: "",
    time: "",

    bank: 0,
    packages: 0,
    amount: "",
    tel: "",
  });
  const changeUpgrade = (value, tag) => {
    let update = { ...upgrade };
    update[tag] = value;
    setUpgrade(update);
  };
  const handleClose = () => {
    setActiveStep(0);
    props.setOpen(false);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 1) {
      changeUpgrade(Date.now(), "date");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleDateChange = (date) => {
    changeUpgrade(date, "date");
  };
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                style={
                  upgrade.packages === 0 ? { backgroundColor: "#E6FEFC" } : null
                }
                raised={upgrade.packages === 0}
                onClick={
                  upgrade.packages === 0
                    ? null
                    : () => changeUpgrade(0, "packages")
                }
              >
                test
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                style={
                  upgrade.packages === 1 ? { backgroundColor: "#E6FEFC" } : null
                }
                raised={upgrade.packages === 1}
                onClick={
                  upgrade.packages === 1
                    ? null
                    : () => changeUpgrade(1, "packages")
                }
              >
                test
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                style={
                  upgrade.packages === 2 ? { backgroundColor: "#E6FEFC" } : null
                }
                raised={upgrade.packages === 2}
                onClick={
                  upgrade.packages === 2
                    ? null
                    : () => changeUpgrade(2, "packages")
                }
              >
                test
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                style={
                  upgrade.packages === 3 ? { backgroundColor: "#E6FEFC" } : null
                }
                raised={upgrade.packages === 3}
                onClick={
                  upgrade.packages === 3
                    ? null
                    : () => changeUpgrade(3, "packages")
                }
              >
                test
              </Card>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Card>
                <Box margin="3%" marginLeft="5%">
                  <p>ยอดที่ต้องชำระ</p>
                  <p>{952.3}บาท</p>
                  <p>การชำระรวมภาษีมูลล่าเพิ่ม</p>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <Box margin="1%">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <Box textAlign="center">
                            <AccountBalanceIcon style={{ fontSize: 80 }} />
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <p>ธนาคารกรุงเทพ</p>
                          <p>เลขที่บัญชี</p>
                          <p>ชื่อบัญชี</p>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Box margin="1%">
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <Box textAlign="center">
                            <AccountBalanceIcon style={{ fontSize: 80 }} />
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <p>ธนาคารกรุงเทพ</p>
                          <p>เลขที่บัญชี</p>
                          <p>ชื่อบัญชี</p>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      บัญชีธนาคาร
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={upgrade.paymentBank}
                      onChange={(e) => {
                        changeUpgrade(e.target.value, "paymentBank");
                      }}
                      label="บัญชีธนาคาร"
                    >
                      <MenuItem value={0}>ธนาคารกรุงเทพ</MenuItem>
                      <MenuItem value={1}>ธนาคารไทยพานิช</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.formControl}
                    required
                    error={upgrade.amount === ""}
                    id="outlined-number"
                    label="ยอดชำระ"
                    value={upgrade.amount}
                    type="number"
                    variant="outlined"
                    helperText="หากยอดชำระเกินจะดำเนินการคืนให้เป็น credit ในการชำระครั้งต่อไป"
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around"></Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="วันที่ชำระ"
                      value={upgrade.time}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TimePicker
                      variant="inline"
                      margin="normal"
                      id="time-picker"
                      label="เวลา"
                      value={upgrade.time}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12}>
                  <TextField
                    error={upgrade.tel === ""}
                    required
                    className={classes.formControl}
                    id="outlined-number"
                    label="เบอร์โทร"
                    value={upgrade.tel}
                    type="number"
                    variant="outlined"
                    helperText="หมายเลขสำหรับติดต่อกรณิเกิดปัญหา"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <DragDrop />
            </Grid>
          </Grid>
        );
      case 3:
        return <div>complete page and thankyou</div>;
      default:
        return "Unknown stepIndex";
    }
  };
  // React.useEffect(()=>
  // {
  //   setUpgrade(props.upgrade)
  // },[])
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle
        id="max-width-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <BTCustom disabled={activeStep === 0} onClick={handleBack}>
                      ย้อนกลับ
                    </BTCustom>
                    <BTCustom
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "เสร็จสิ้น" : "ถัดไป"}
                    </BTCustom>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
    </Dialog>
  );
}
