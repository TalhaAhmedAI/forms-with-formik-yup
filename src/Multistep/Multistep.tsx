import React, {useState} from 'react'
import {Card, CardContent, Button, Box, Step, StepLabel, Stepper, Grid, CircularProgress} from '@material-ui/core'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'

import MultistepSchema from './Schema'

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time))

export function Multistep() {
    return (
        <Card>
            <CardContent>
                <FormikStepper
                initialValues={{
                    firstName: '',
                    lastName: '',
                    millionare: false,
                    money: 0,
                    description: ''
                }} onSubmit={async (values) => {
                    await sleep(3000)
                    console.log("values", values)
                }}>
                        <FormikStep label="Personal Data">
                        <Box paddingBottom={2}>
                        <Field fullWidth name="firstName" component={TextField} label="First Name" />
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth name="lastName" component={TextField} label="Last Name" />
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth name="millionare" type="checkbox" component={CheckboxWithLabel} Label={{ label: "I'm a millionare"}} />
                        </Box>
                        </FormikStep>
                        <FormikStep label="Bank Information" validationSchema={MultistepSchema}>
                        <Box paddingBottom={2}>
                        <Field fullWidth name="money" type="number" component={TextField} label="Money" />
                        </Box>
                        </FormikStep>
                        <FormikStep label="More Info">
                        <Box paddingBottom={2}>
                        <Field fullWidth name="description" component={TextField} label="Description" />
                        </Box>
                        </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>
    )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props}: FormikConfig<FormikValues>) {

    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[]
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false)

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    return (
        <Formik 
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
                setCompleted(true)
            } else {
                setStep(s => s + 1)
            }
        }}>
            {({isSubmitting}) => (

                <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
                {currentChild}
                <Grid container spacing={2}>
                {step > 0 ? <Grid item> <Button disabled={isSubmitting} color="primary" variant="contained" onClick={() => {}}>Back</Button></Grid> : null}
                <Grid item><Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> :null } disabled={isSubmitting} color="primary" variant="contained" type="submit">{isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}</Button></Grid>
                </Grid>
                </Form>
            )}
        </Formik>
    )
}