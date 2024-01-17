import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ResumeForm from './ResumeForm';
import DescriptionForm from './DescriptionForm';
import PromptPicker from './PromptPicker';
import Review from './Review';
import GeneratedLetter from './GeneratedLetter';
import PromptObj from './PromptTypes';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://dereje1.github.io/Portfolio-V3/">
        Dereje Getahun
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Resume', 'Job Description', 'Prompt', 'Review'];

interface getStepContentProps {
  step: number,
  setResume: (resume: string) => void,
  resume: string,
  setDescription: (description: string) => void,
  description: string
  setActivePrompt: (prompt: string) => void
  activePrompt: string
}

function getStepContent({
  step,
  setResume,
  resume,
  setDescription,
  description,
  activePrompt,
  setActivePrompt
}: getStepContentProps) {
  switch (step) {
    case 0:
      return <ResumeForm updateResume={(resume) => setResume(resume)} resume={resume} />;
    case 1:
      return <DescriptionForm updateDescription={(description) => setDescription(description)} description={description} />;
    case 2:
      return <PromptPicker setActivePrompt={(prompt) => setActivePrompt(prompt)} activePrompt={activePrompt} />
    case 3:
      return <Review resume={resume} description={description} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CoverLetter() {
  const [activeStep, setActiveStep] = useState(0);
  const [resume, setResume] = useState('')
  const [description, setDescription] = useState('')
  const [activePrompt, setActivePrompt] = useState('prompt1');
  const [disableNextButton, setDisableNextButton] = useState(false);

  useEffect(() => {
    if (activeStep === 0) {
      setDisableNextButton(resume.trim().length === 0)
    } else if (activeStep === 1) {
      setDisableNextButton(description.trim().length === 0)
    } else {
      setDisableNextButton(false)
    }
  }, [resume, description, activeStep])

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 1 } }}>
          <Typography component="h1" variant="h5" align="center">
            Follow steps below to generate a cover letter
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ?
            <GeneratedLetter
              resume={resume}
              description={description}
              activePrompt={activePrompt}
            /> : (
              <React.Fragment>
                {getStepContent({
                  step: activeStep,
                  setResume,
                  resume,
                  setDescription,
                  description,
                  setActivePrompt,
                  activePrompt
                })}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ paddingTop: 4, fontWeight: 'bold' }}>
                    {
                      activeStep === steps.length - 1 ? `Prompt Type: ${PromptObj[activePrompt].name}` : ''
                    }
                  </Typography>
                  <div>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={disableNextButton}
                    >
                      {activeStep === steps.length - 1 ? 'Generate Letter' : 'Next'}
                    </Button>
                  </div>
                </Box>
              </React.Fragment>
            )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
