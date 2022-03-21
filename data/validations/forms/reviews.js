import * as Yup from "yup";

export const validationSchemaReview = Yup.object({
    title: Yup.string().required("* Requerido."),
    description: Yup.string().required("* Requerido."),
});
