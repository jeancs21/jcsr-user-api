import * as yup from 'yup';

const userSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup.string().required('El correo es obligatorio').email('Ingresa un correo válido'),
  phone: yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .max(15, 'El teléfono debe tener máximo 15 caracteres'),
  company: yup.string().required('La empresa es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
}).required();

const patchUserSchema = yup.object({
  name: yup.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup.string().email('Ingresa un correo válido'),
  phone: yup.string()
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .max(15, 'El teléfono debe tener máximo 15 caracteres'),
  company: yup.string(),
  city: yup.string(),
});

export const validateUser = async (req, res, next) => {
    try {
        await userSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.reduce((acc, current) => {
            acc[current.path] = current.message;
            return acc;
        }, {});
        res.status(400).json({ errors });
    }
};

export const validatePatchUser = async (req, res, next) => {
    try {
        await patchUserSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.reduce((acc, current) => {
            acc[current.path] = current.message;
            return acc;
        }, {});
        res.status(400).json({ errors });
    }
};
