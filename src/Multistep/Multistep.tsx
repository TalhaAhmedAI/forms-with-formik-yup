import {Card, CardContent, Typography} from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'

export function Multistep() {
    return (
        <Card>
            <CardContent>
                <Formik initialValues={{
                    firstName: '',
                    lastName: '',
                    millionare: false,
                    money: 0,
                    description: ''
                }} onSubmit={() => {}}>
                    <Form autoComplete="off">
                        <Field name="firstName" component={TextField} label="First Name" />
                        <Field name="lastName" component={TextField} label="Last Name" />
                        <Field name="millionare" type="checkbox" component={CheckboxWithLabel} Label={{ label: "I'm a millionare"}} />
                        <Field name="money" type="number" component={TextField} label="Money" />
                        <Field name="description" component={TextField} label="Description" />
                    </Form>
                </Formik>
            </CardContent>
        </Card>
    )
}