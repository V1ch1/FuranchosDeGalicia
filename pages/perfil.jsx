import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {
    validationChangePassword,
    validationChangeProfileData,
} from "../data/validations/forms/changeProfileData";
import { changePassword, changeUserInfo } from "../data/api/user/services";
import { useDispatch, useSelector } from "react-redux";
import { showAuth } from "../redux/actions/ui";
import { getAppProps } from "./_app";
import Places from "../base/Places";

export default function Perfil({ places }) {
    const dispatch = useDispatch();
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);

    //profile errors and verfied changes
    const [changeDataError, setChangeDataError] = useState(false);
    const [changeDataDone, setChangeDataDone] = useState(false);

    //password errors and verfied changes
    const [changePasswordError, setChangePasswordError] = useState(false);
    const [changePasswordDone, setChangePasswordDone] = useState(false);

    //favorites places logic
    const [favoritePlaces, setFavoritePlaces] = useState([]);
    const [commentedPlaces, setCommentedPlaces] = useState([]);

    const initialValuesProfileData = {
        email: user?.correo || "",
        name: user?.nombre || "",
        municipality: user?.municipio || "",
        email: user?.correo || "",
    };

    const initialValuesPassword = {
        currentPassword: "",
        newPassword: "",
    };

    const handleChangeData = async (values) => {
        const response = await changeUserInfo({
            token,
            userId: user.uid,
            ...values,
        });

        if (!response?.error) {
            setChangeDataError(false);
            setChangeDataDone(
                "Your account data has been successfully updated.",
            );
        } else {
            setChangeDataDone(false);
            setChangeDataError(err);
        }
    };

    const handleChangePassword = async (values) => {
        const response = await changePassword({
            token,
            userId: user.uid,
            ...values,
        });

        if (!response?.error) {
            setChangePasswordError(false);
            setChangePasswordDone(
                "Your account has been successfully updated.",
            );
        } else {
            setChangePasswordDone(false);
            setChangePasswordError(err);
        }
    };

    useEffect(() => {
        if (changeDataError) {
            setTimeout(() => {
                setChangeDataError(false);
            }, 5000);
        }

        if (changeDataDone) {
            setTimeout(() => {
                setChangeDataDone(false);
            }, 5000);
        }

        if (changePasswordError) {
            setTimeout(() => {
                setChangePasswordError(false);
            }, 5000);
        }

        if (changePasswordDone) {
            setTimeout(() => {
                setChangePasswordDone(false);
            }, 5000);
        }
    }, [
        changeDataError,
        changeDataDone,
        changePasswordError,
        changePasswordDone,
    ]);

    useEffect(() => {
        let savedPlaces = [];
        let reviewedPlaces = [];
        if (user && user.uid) {
            places.forEach((place) => {
                if (user.favoritos.includes(place.uid)) {
                    savedPlaces.push(place);
                }
                if (place.reviews.length > 0) {
                    place.reviews.forEach((review) => {
                        if (
                            review.usuarioId === user.uid &&
                            !reviewedPlaces.includes(place)
                        ) {
                            reviewedPlaces.push(place);
                        }
                    });
                }
            });
        }
        if (savedPlaces.length > 0) {
            setFavoritePlaces(savedPlaces);
        }
        if (reviewedPlaces.length > 0) {
            setCommentedPlaces(reviewedPlaces);
        }
    }, [user]);

    if (!isAuthenticated) {
        return (
            <main className="container mx-auto h-screen flex justify-center items-center px-2">
                <h2 className="text-3xl text-gray-800">
                    Debe estar logueado para poder acceder a esta ruta.
                    <a
                        className="text-brand-blue font-bold cursor-pointer hover:text-blue-400"
                        onClick={() => dispatch(showAuth())}
                    >
                        Login
                    </a>
                </h2>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-2 font-semibold mt-[120px] mb-[80px]">
            <div className="mx-auto">
                <div className="mb-[50px]">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700">
                        Perfil
                    </h1>
                    <p className="text-gray-500">
                        En esta sección puede cambiar la información de su
                        perfil
                    </p>
                </div>
                <section className="m-7 grid md:grid-cols-2 gap-4 md:gap-20">
                    {/* Changes user data form */}
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValuesProfileData}
                        onSubmit={handleChangeData}
                        validationSchema={validationChangeProfileData}
                    >
                        {(formik) => (
                            <Form>
                                <h2 className="my-3 text-2xl font-semibold text-gray-700 mb-5">
                                    Datos del perfil
                                </h2>
                                {changeDataError && (
                                    <h6
                                        className="flex text-red-600 mb-4"
                                        key={index}
                                    >
                                        <img
                                            className="h-6 w-6 mr-2"
                                            src="/icons/error.svg"
                                            alt="Error"
                                        />
                                        {changeDataError}
                                    </h6>
                                )}
                                {changeDataDone && (
                                    <h6 className="flex text-green-600 mb-4">
                                        <img
                                            className="h-6 w-6 mr-2"
                                            src="/icons/check.svg"
                                            alt="Error"
                                        />{" "}
                                        {changeDataDone}
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
                                    <label className="flex flex-col mb-1 text-sm text-gray-600">
                                        Correo
                                        <ErrorMessage
                                            className="text-xs text-red-600"
                                            name="email"
                                            component="span"
                                        />
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="useremail@example.com"
                                            className="w-full px-3 py-2 mt-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                        />
                                    </label>
                                </div>
                                <button
                                    aria-label="Submit"
                                    className="text-xl w-full text-white bg-brand-blue px-3 py-3 mb-6 rounded-md hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                                    type="submit"
                                >
                                    Guardar cambios
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {/* Changes password form */}
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValuesPassword}
                        onSubmit={handleChangePassword}
                        validationSchema={validationChangePassword}
                    >
                        {(formik) => (
                            <Form>
                                <h2 className="my-3 text-2xl font-semibold text-gray-700 mb-5">
                                    Ajustes de contraseña
                                </h2>
                                {changePasswordError && (
                                    <h6
                                        className="flex text-red-600 mb-4"
                                        key={index}
                                    >
                                        <img
                                            className="h-6 w-6 mr-2"
                                            src="/icons/error.svg"
                                            alt="Error"
                                        />
                                        {changePasswordError}
                                    </h6>
                                )}
                                {changePasswordDone && (
                                    <h6 className="flex text-green-600 mb-4">
                                        <img
                                            className="h-6 w-6 mr-2"
                                            src="/icons/check.svg"
                                            alt="Error"
                                        />
                                        {changePasswordDone}
                                    </h6>
                                )}
                                <div className="mb-4">
                                    <label className="flex flex-col mb-1 text-sm text-gray-600">
                                        Contraseña actual
                                        <ErrorMessage
                                            className="text-xs text-red-600"
                                            name="currentPassword"
                                            component="span"
                                        />
                                        <Field
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Contraseña actual"
                                            className="w-full px-3 py-2 mt-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="flex flex-col mb-1 text-sm text-gray-600">
                                        Nueva contraseña
                                        <ErrorMessage
                                            className="text-xs text-red-600"
                                            name="newPassword"
                                            component="span"
                                        />
                                        <Field
                                            type="password"
                                            name="newPassword"
                                            placeholder="Nueva contraseña"
                                            className="w-full px-3 py-2 mt-1 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                        />
                                    </label>
                                </div>
                                <div className="flex">
                                    <button
                                        aria-label="Submit"
                                        className="text-xl w-full text-white bg-brand-blue px-3 py-3 mb-6 rounded-md hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                                        type="submit"
                                    >
                                        Actualizar contraseña
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
                {favoritePlaces.length > 0 && (
                    <section>
                        <h2 className="my-3 text-3xl font-semibold text-gray-700 mb-5">
                            Lugares favoritos
                        </h2>
                        <Places places={favoritePlaces} />
                    </section>
                )}
                {commentedPlaces.length > 0 && (
                    <section>
                        <h2 className="my-3 text-3xl font-semibold text-gray-700 mb-5">
                            Lugares comentados
                        </h2>
                        <Places places={commentedPlaces} />
                    </section>
                )}
            </div>
        </main>
    );
}

export async function getServerSideProps(context) {
    try {
        const places = await getAppProps();

        return {
            props: {
                isConnected: true,
                places,
            },
        };
    } catch (e) {
        console.error(e, "ERROR!!!");
        return {
            props: { isConnected: false },
        };
    }
}
