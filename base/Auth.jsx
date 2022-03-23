import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/auth";
import { signIn, signUp } from "../data/api/auth/services";
import {
    validationSchemaSignIn,
    validationSchemaSignUp,
} from "../data/validations/forms/auth";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";
import { getUserInfo } from "../data/api/user/services";
import { hideAuth, showAuth } from "../redux/actions/ui";
import Link from "next/link";

export default function Auth({ isTop, isHome, isMenuOpen }) {
    const ref = useRef();
    const dispatch = useDispatch();
    const { isVisible } = useSelector((state) => state.ui);
    const { isAuthenticated } = useSelector((state) => state.auth);

    //sates for ui management
    const [showRegister, setShowRegister] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);

    useEffect(async () => {
        //login user if jwt is active
        const sessionStorageData =
            JSON.parse(sessionStorage.getItem("FuranchosDeGaliciaUser")) || "";

        if (!isAuthenticated && sessionStorageData.access_token) {
            const response = await getUserInfo({
                token: sessionStorageData.access_token,
            });

            if (response.status === 200) {
                dispatch(
                    login(
                        response.data.usuario,
                        sessionStorageData.access_token,
                    ),
                );
                sessionStorage.setItem(
                    "FuranchosDeGaliciaUser",
                    JSON.stringify({
                        usuario: response.data.usuario,
                        access_token: sessionStorageData.access_token,
                    }),
                );
            }
        }
    }, []);

    const initialValuesSignIn = {
        email: "",
        password: "",
    };

    const initialValuesSignUp = {
        name: "",
        municipality: "",
        email: "",
        password: "",
        terms: false,
    };

    const handleSignIn = async (values) => {
        const response = await signIn(values);

        if (response.error) {
            setLoginError(response.error);

            return;
        }

        // save user data & JWT in global state and sessionStorage
        dispatch(login(response.data.usuario, response.data.token));
        sessionStorage.setItem(
            "FuranchosDeGaliciaUser",
            JSON.stringify({
                usuario: response.data.usuario,
                access_token: response.data.token,
            }),
        );

        dispatch(hideAuth());
    };

    const handleSignUp = async (values) => {
        const response = await signUp(values);

        if (!response?.error) {
            setRegisterError(false);
            setRegisterDone(
                "Congratulations your account has been successfully created. Now you can sign in.",
            );
        } else {
            setRegisterDone(false);
            setRegisterError(response.error);
        }
    };

    const cleanFeedback = () => {
        setLoginError(false);
        setRegisterError(false);
        setRegisterDone(false);
    };

    const handleLogout = () => {
        sessionStorage.clear("FuranchosDeGaliciaUser");
        dispatch(logout());
    };

    return (
        <div className="flex justify-center items-center" ref={ref}>
            {isAuthenticated ? (
                <div
                    className="bg-brand-blue text-white text-lg font-bold py-1 px-2 rounded select-none hover:bg-blue-700 cursor-pointer"
                    onClick={() => handleLogout()}
                >
                    Salir
                </div>
            ) : (
                <div className="flex">
                    <div
                        className="bg-brand-blue order-3 text-white text-[16px] font-semibold py-2 px-3 rounded select-none hover:bg-blue-700 cursor-pointer"
                        onClick={() => {
                            setShowRegister(true);
                            dispatch(showAuth());
                        }}
                    >
                        Acceder
                    </div>
                </div>
            )}
            <Modal
                className={`${isVisible ? "block" : "hidden"}`}
                close={() => {
                    cleanFeedback();
                    dispatch(hideAuth());
                }}
            >
                {/* Sign in form */}
                <div
                    className={`flex items-center bg-white ${
                        showRegister && "hidden"
                    } `}
                >
                    <div className="container mx-auto">
                        <div className="mx-auto">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700">
                                    Entrar
                                </h1>
                                <p className="text-gray-500">
                                    Entra para acceder a tu cuenta.
                                </p>
                            </div>
                            <div className="m-7">
                                <Formik
                                    initialValues={initialValuesSignIn}
                                    onSubmit={handleSignIn}
                                    validationSchema={validationSchemaSignIn}
                                >
                                    {(formik) => (
                                        <Form>
                                            {loginError && (
                                                <h6 className="flex text-red-600 mb-4">
                                                    <img
                                                        className="h-6 w-6 mr-2"
                                                        src="/icons/error.svg"
                                                        alt="Error"
                                                    />
                                                    {loginError}
                                                </h6>
                                            )}
                                            <div className="mb-4">
                                                <label className="block mb-1 text-sm text-gray-600">
                                                    Correo
                                                </label>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="email"
                                                    component="span"
                                                />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="usuario@ejemplo.com"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex justify-between mb-1">
                                                    <label className="text-sm text-gray-600">
                                                        Contraseña
                                                    </label>
                                                </div>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="password"
                                                    component="span"
                                                />
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Contraseña"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <button
                                                aria-label="Submit"
                                                className="text-xl w-full text-white bg-blue-500 px-3 py-3 mb-6 rounded-md hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                                                type="submit"
                                            >
                                                Entrar
                                            </button>
                                            <p className="text-sm text-center text-gray-400">
                                                No tienes una cuenta aún?
                                                <span
                                                    className="text-blue-400 cursor-pointer hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-500"
                                                    onClick={() => {
                                                        setShowRegister(true);
                                                        cleanFeedback();
                                                    }}
                                                >
                                                    Regístrate
                                                </span>
                                                .
                                            </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sign up form */}
                <div
                    className={`flex items-center bg-white ${
                        !showRegister && "hidden"
                    } `}
                >
                    <div className="container mx-auto">
                        <div className="mx-auto">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700">
                                    Resgistrarse
                                </h1>
                                <p className="text-gray-500">
                                    Regístrate para crear una cuenta.
                                </p>
                            </div>
                            <div className="m-7">
                                <Formik
                                    initialValues={initialValuesSignUp}
                                    onSubmit={handleSignUp}
                                    validationSchema={validationSchemaSignUp}
                                >
                                    {(formik) => (
                                        <Form>
                                            {registerError && (
                                                <h6 className="flex text-red-600 mb-4">
                                                    <img
                                                        className="h-6 w-6 mr-2"
                                                        src="/icons/error.svg"
                                                        alt="Error"
                                                    />
                                                    {registerError}
                                                </h6>
                                            )}
                                            {registerDone && (
                                                <h6 className="flex text-green-600 mb-4">
                                                    <img
                                                        className="h-6 w-6 mr-2"
                                                        src="/icons/check.svg"
                                                        alt="Error"
                                                    />
                                                    {registerDone}
                                                </h6>
                                            )}
                                            <div className="mb-4">
                                                <label className="block mb-1 text-sm text-gray-600">
                                                    Nombre y Apellidos
                                                </label>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="name"
                                                    component="span"
                                                />
                                                <Field
                                                    name="name"
                                                    placeholder="Nombre y Apellidos"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-1 text-sm text-gray-600">
                                                    Localidad
                                                </label>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="municipality"
                                                    component="span"
                                                />
                                                <Field
                                                    name="municipality"
                                                    placeholder="Localidad"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-1 text-sm text-gray-600">
                                                    Correo
                                                </label>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="email"
                                                    component="span"
                                                />
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="usuario@ejemplo.com"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex justify-between mb-1">
                                                    <label className="text-sm text-gray-600">
                                                        Contraseña
                                                    </label>
                                                </div>
                                                <ErrorMessage
                                                    className="text-xs text-red-600"
                                                    name="password"
                                                    component="span"
                                                />
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Contraseña"
                                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex items-center mb-1">
                                                    <Field
                                                        type="checkbox"
                                                        name="terms"
                                                    />
                                                    <label className="text-sm text-gray-600 ml-2">
                                                        Acepto la
                                                        <a href="/politica-privacidad">
                                                            {" "}
                                                            Política de
                                                            Privacidad{" "}
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
                                                Registrarse
                                            </button>
                                            <p className="text-sm text-center text-gray-400">
                                                Ya tienes una cuenta?
                                                <span
                                                    className="text-blue-400 cursor-pointer hover:text-blue-600 focus:outline-none focus:underline focus:text-blue-500"
                                                    onClick={() => {
                                                        setShowRegister(false);
                                                        cleanFeedback();
                                                    }}
                                                >
                                                    Entra
                                                </span>
                                                .
                                            </p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
