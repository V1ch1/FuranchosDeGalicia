import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { validationSchemaSignUp } from "../data/validations/forms/auth";
// import * as Yup from "yup";
// import * as emailjs from "emailjs-com";

export default function contact() {
    return (
        <div className="container mx-auto">
            <div className="">
                <div className="text-center">
                    <h1 className="mt-14 text-3xl font-semibold text-gray-700">
                        Habla con nosotros
                    </h1>
                </div>

                <div className="m-14">
                    <Formik
                    // onSubmit={handleSignUp}
                    // validationSchema={validationSchemaSignUp}
                    >
                        <Form>
                            <div className="mb-4">
                                <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="name"
                                    component="span"
                                />
                                <Field
                                    name="name"
                                    placeholder="Nombre y Apellidos"
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="municipality"
                                    component="span"
                                />
                                <Field
                                    name="municipality"
                                    placeholder="Localidad"
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="email"
                                    component="span"
                                />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="usuario@ejemplo.com"
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="password"
                                    component="span"
                                />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center mb-1">
                                    <Field type="checkbox" name="terms" />
                                    <label className="text-sm text-gray-600 ml-2">
                                        Acepto la
                                        <a href="/politica-privacidad">
                                            {" "}
                                            Política de Privacidad{" "}
                                        </a>
                                    </label>
                                </div>
                                <ErrorMessage
                                    className="text-xs text-red-600"
                                    name="terms"
                                    component="span"
                                />
                            </div>
                            <button
                                aria-label="Submit"
                                className="text-xl w-full text-white bg-blue-500 px-3 py-3 mb-6 rounded-md hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                                type="submit"
                            >
                                Enviar
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
