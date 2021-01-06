import * as yup from 'yup';

let SignupSchema = yup.object().shape({
    firstName: yup.string().required('This field is required.'), 
    lastName: yup.string().required('This field is required.'), 
    email: yup.string().email().required('This field is required.'), 
    password: yup.string()
        .min(6, 'Password is too short.')
        .max(20, 'Password is too long.')
        .required('This field is required.')
});

export default SignupSchema;