import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

//this dialog is wont props{setOpen(true,false) and open}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
    height: "70%",
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
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
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <div>picture select</div>;
    case 1:
      return <div>picture own bank</div>;
    case 2:
      return <div>upload image bank</div>;
    case 3:
      return <div>complete page and thankyou</div>;
    default:
      return "Unknown stepIndex";
  }
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

  const handleClose = () => {
    setActiveStep(0);
    props.setOpen(false);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={props.open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle
        id="max-width-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>{getStepContent(activeStep)}</div>
        </div>
      </DialogContent>
      <DialogActions>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleClose} color="primary">
            ปิด
          </Button>
        ) : (
          <>
            {activeStep !== 0 ? (
              <Button onClick={handleBack} color="primary">
                ย้อนกลับ
              </Button>
            ) : null}
            <Button onClick={handleNext} color="primary">
              ถัดไป
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
