import * as Yup from "yup";

export const validationSchemaSignUp = Yup.object({
    name: Yup.string().required("* Requerido."),
    municipality: Yup.string().required("* Requerido."),
    email: Yup.string()
        .email("* El correo no tiene un formato válido.")
        .required("* Requerido."),
    password: Yup.string()
        .required("* Requerido.")
        .min(8, "* Debe tener 8 caracteres mínimo."),
    terms: Yup.boolean().oneOf(
        [true],
        "* Debe aceptar los términos y condiciones.",
    ),
});

export const validationSchemaSignIn = Yup.object({
    email: Yup.string()
        .email("* El correo no tiene un formato válido.")
        .required("* Requerido."),
    password: Yup.string().required("* Requerido."),
});
