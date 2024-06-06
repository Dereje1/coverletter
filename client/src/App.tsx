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
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import ResumeForm from './components/ResumeForm';
import DescriptionForm from './components/DescriptionForm';
import PromptPicker from './components/PromptPicker';
import Review from './components/Review';
import GeneratedLetter from './components/GeneratedLetter';
import PromptObj from './components/PromptTypes';
import APIKeyDialog from './components/Dialogs/APIKeyDialog';
import { getFromLocalStorage } from './utils/localstorage'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Dereje1/coverletter">
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

type api_keys = {
  key: string
  isActive: boolean
  id: number
}

type activeKeyType = {
  encryptedKey: string,
  maskedKey: string
} | null

const initialActiveKey: activeKeyType = null;

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [resume, setResume] = useState('')
  const [description, setDescription] = useState('')
  const [activePrompt, setActivePrompt] = useState('prompt1');
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [showAPIKeyDIalog, setShowAPIKeyDIalog] = useState(false);
  const [activeKey, setActiveKey] = useState(initialActiveKey);

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

  useEffect(() => {
    updateActiveKey()
  }, [])

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updateActiveKey = () => {
    const api_keys = getFromLocalStorage('api_keys');
    const active = api_keys.filter((a: api_keys) => a.isActive)
    if (active.length) {
      setActiveKey(
        {
          encryptedKey: active[0].encryptedKey,
          maskedKey: active[0].key
        }
      );
      return
    }
    setActiveKey(null)
  }

  const refresh = () => {
    setResume('');
    setDescription('');
    setActivePrompt('prompt1');
    setActiveStep(0);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 1 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              aria-label="save"
              size='large'
              onClick={() => setShowAPIKeyDIalog(true)}>
              <KeyIcon color={activeKey ? 'success' : 'error'} sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography component="h1" variant="caption" align="center">
              {`Active OpenAI API Key: ${activeKey ? activeKey.maskedKey : '🚫'}`}
            </Typography>
          </Box>
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
              activeKey={activeKey ? activeKey.encryptedKey : null}
              editInputs={() => setActiveStep(0)}
              refresh={refresh}
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
      {showAPIKeyDIalog && <APIKeyDialog
        handleClose={() => setShowAPIKeyDIalog(false)}
        open={showAPIKeyDIalog}
        updateActiveKey={updateActiveKey}
      />}
    </React.Fragment>
  );
}
