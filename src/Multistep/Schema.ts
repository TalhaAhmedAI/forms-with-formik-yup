import * as yup from 'yup';

let MultistepSchema = yup.object().shape({
    money: yup.mixed().when('millionare', {
        is: true,
        then: yup.number().required().min(1_000_000),
        otherwise: yup.number().required()
    })
})

export default MultistepSchema