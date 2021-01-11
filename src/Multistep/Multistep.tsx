import React, {useState} from 'react'
import {Card, CardContent, Button} from '@material-ui/core'
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'

import MultistepSchema from './Schema'

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
                }} onSubmit={() => {}}>
                        <FormikStep>
                        <Field name="firstName" component={TextField} label="First Name" />
                        <Field name="lastName" component={TextField} label="Last Name" />
                        <Field name="millionare" type="checkbox" component={CheckboxWithLabel} Label={{ label: "I'm a millionare"}} />
                        </FormikStep>
                        <FormikStep validationSchema={MultistepSchema}>
                        <Field name="money" type="number" component={TextField} label="Money" />
                        </FormikStep>
                        <FormikStep>
                        <Field name="description" component={TextField} label="Description" />
                        </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>
    )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {

}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props}: FormikConfig<FormikValues>) {

    const childrenArray = React.Children.toArray(children)
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    console.log('children', currentChild)

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    return (
        <Formik {...props} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
            } else {
                setStep(s => s + 1)
            }
        }}>
            <Form autoComplete="off">
                {currentChild}
                {step > 0 ? <Button onClick={() => {}}>Back</Button> : null}
                <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
                </Form>
        </Formik>
    )
}