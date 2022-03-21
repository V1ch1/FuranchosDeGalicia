import * as Yup from "yup";

export const validationChangeProfileData = Yup.object({
    name: Yup.string().required("* Requerido."),
    municipality: Yup.string().required("* Requerido."),
    email: Yup.string()
        .email("* El correo no tiene un formato válido.")
        .required("* Requerido."),
});

export const validationChangePassword = Yup.object({
    currentPassword: Yup.string().required("* Requerido."),
    newPassword: Yup.string()
        .required("* Requerido.")
        .matches(
            /^(?=.*?[a-z])(?=.*?[0-9]).+$/i,
            "* Debe tener letras y números.",
        )
        .min(8, "*  Debe tener 8 caracteres mínimo."),
});
