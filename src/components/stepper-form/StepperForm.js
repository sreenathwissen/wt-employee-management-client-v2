import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import BasicInfo from "./BasicInfo";
import EmployeeAddress from "./EmployeeAddress";
import EmployeeAccount from "./EmployeeAccount";
import EmployeeSkill from "./EmployeeSkill";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import EmployeeInfo from "./EmployeeInfo";

function getSteps() {
  return [
    "Basic information",
    "Employee Address",
    "Employee Account",
    "Employee Skill",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfo />;

    case 1:
      return <EmployeeInfo />;

    case 2:
      return <EmployeeAddress />;

    case 3:
      return <EmployeeAccount />;
    case 4:
      return <EmployeeSkill />;
    default:
      return "unknown step";
  }
}

const StepperForm = () => {
  //   const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography
          //       variant="caption"
          //       align="center"
          //       style={{ display: "block" }}
          //     >
          //       optional
          //     </Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>
          <div style={{ display: "inline-block", marginLeft: "400px" }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              back
            </Button>
            <Button variant="outlined" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : ""}
              <ArrowCircleRightRoundedIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StepperForm;
