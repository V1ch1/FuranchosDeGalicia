import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
const TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
const UID = process.env.NEXT_PUBLIC_EMAILJS_USERID;

export default function contact() {
    const frmRef = useRef(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        emailjs.sendForm(SVC, TPL, evt.target, UID).then(
            (result) => {
                setShowSuccess(true);
                frmRef.current.reset();
            },
            (error) => {
                setShowFail(true);
                console.log("Message not sent.", error);
            },
        );
    };

    return (
        <div className="p-10 md:mx-14" style={{ marginTop: "100px" }}>
            <div className="inline-flex cursor-pointer">
                <span className="text-brand-blue text-xl font-bold mb-10 md:text-3xl text-center hover:text-blue-500">
                    Habla con nosotros
                </span>
            </div>
            <form onSubmit={handleSubmit} ref={frmRef}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="inname" for="inname">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="from_name"
                            id="inname"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="inapellidos" for="inapellidos">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            name="from_apellidos"
                            id="inapellidos"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="inemail" for="inemail">
                            Email
                        </label>
                        <input
                            type="email"
                            name="reply_to"
                            id="inemail"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="inphone" for="inphone">
                            <div className="flex align-items">Teléfono</div>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="inphone"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="insubject" for="insubject">
                            Título
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="insubject"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="inmsg" for="inmsg">
                            <div className="flex align-items">
                                Mensaje
                                <span className="ml-auto opacity-75">
                                    Max. 500 caracteres
                                </span>
                            </div>
                        </label>
                        <textarea
                            maxLength="500"
                            rows="4"
                            type="text"
                            id="inmessage"
                            name="message"
                            placeholder="Escribe aquí tu mensaje"
                            className="form-input px-3 py-2 rounded-md border border-black-600"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-start py-4">
                    <label style={{ fontSize: "0.8em" }}>
                        <input
                            type="checkbox"
                            name="cb-terminosservicio"
                            required
                        />
                        &nbsp;Al hacer click, aceptas la
                        <a href="/avisoLegal" style={{ color: "#0072ec" }}>
                            {" "}
                            política de protección de datos
                        </a>
                        .
                    </label>
                </div>
                <div className="col-12">
                    {showSuccess && (
                        <div
                            class="bg-red-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong class="font-bold">Gracias! </strong>
                            <span class="block sm:inline">
                                El email se ha enviado de forma correcta.
                            </span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg
                                    class="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Cerrar</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                </svg>
                            </span>
                        </div>
                    )}
                    {showFail && (
                        <div
                            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong class="font-bold">Hola! </strong>
                            <span class="block sm:inline">
                                El mensaje no se ha podido enviar. Contacta con
                                nosotros en el mail hola@blancoyenbatea.com
                            </span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg
                                    class="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Cerrar</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                </svg>
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}
