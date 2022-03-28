import Link from "next/link";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { Rate } from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import GoogleMaps from "../base/Map/Map";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment, updateFavorites } from "../data/api/user/services";
import Modal from "../components/Modal/Modal";
import { validationSchemaReview } from "../data/validations/forms/reviews";
import { login } from "../redux/actions/auth";
import { showAuth, showMenu } from "../redux/actions/ui";
import Gallery from "../base/Gallery/Gallery";
import Places from "../base/Places";
import { getAppProps } from "./_app";
import { removeAccents } from "../lib/utils";
import _ from "lodash";

export default function Index({ places }) {
    const router = useRouter();
    const { q, url } = router.query;

    //place details logic
    const ref = useRef();
    const dispatch = useDispatch();
    const [isTop, setIsTop] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [place, setPlace] = useState(
        useSelector((state) => state.currentPlace),
    );
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);
    const [isFavorite, setIsFavorite] = useState(false);

    //sates for user response management
    const [reviewError, setReviewError] = useState(false);
    const [reviewDone, setReviewDone] = useState(false);

    //state for rating system track
    const [rate, setRate] = useState(5);

    useEffect(() => {
        if (!!place) {
            localStorage.setItem(
                "currentPlace",
                JSON.stringify({
                    ...place,
                }),
            );
        }
    }, [place]);

    useEffect(() => {
        if (user && user.favoritos.includes(place.uid)) {
            setIsFavorite(true);
        }
    }, [user]);

    const toggleFavorite = async () => {
        if (isAuthenticated) {
            const { status } = await updateFavorites({
                userId: user.uid,
                token,
                placeId: place.uid,
            });
            if (status === 200) {
                isFavorite
                    ? _.remove(user.favoritos, (favorito) => {
                          return favorito === place.uid;
                      })
                    : user.favoritos.push(place.uid);

                dispatch(login(user, token));
                setIsFavorite(!isFavorite);
            }
        } else {
            dispatch(showMenu());
            dispatch(showAuth());
        }
    };

    const handleShowModalReview = () => {
        if (isAuthenticated) {
            setIsModalOpen(true);
        } else {
            dispatch(showMenu());
            dispatch(showAuth());
        }
    };

    useEffect(() => {
        const root = document.getElementById("__next");

        root.classList.add("no_scrollbar");
        root.style.overflowY = "scroll";
        root.style.scrollPaddingTop = "144px";
        root.style.maxHeight = "100vh";
        root.style.scrollBehavior = "smooth";

        return () => {
            root.classList.remove("no_scrollbar");
            root.removeAttribute("style");
        };
    }, []);

    useEffect(() => {
        if (!!place) {
            setPlace(JSON.parse(localStorage.getItem("currentPlace")));
        }

        if (!ref) {
            return;
        }

        const handleScroll = () => {
            if (!!ref.current) {
                setIsTop(
                    Math.abs(ref.current.getBoundingClientRect().top) <= 85,
                );
            }
        };

        document
            .getElementById("__next")
            .addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [ref]);

    const initialValues = {
        title: "",
        description: "",
    };

    const handlePostReview = async (values) => {
        if (rate <= 0 || rate > 5) {
            setReviewError("Debe selccionar una valoración váldia");
            return;
        }

        const response = await postComment({
            userId: user.uid,
            placeId: place.uid,
            nickname: user.correo.split("@")[0],
            rate,
            token,
            ...values,
        });

        if (response.error) {
            setReviewError(response.error);
            setReviewDone(false);

            return;
        }

        if (response.status === 200) {
            setPlace(response.data.lugar);
            localStorage.setItem(
                "currentPlace",
                JSON.stringify(response.data.lugar),
            );
        }

        setReviewError(false);
        setReviewDone("Your review has been successfully sent");
    };

    //search page logic
    const { search, municipality } = useSelector((state) => state.filterBy);
    const searchString = q ?? search;

    let filteredPlaces;
    if (searchString) {
        filteredPlaces = places.filter(
            (place) =>
                removeAccents(place.nombre)
                    .toLowerCase()
                    .includes(removeAccents(searchString.toLowerCase())) ||
                removeAccents(place.municipio.toLowerCase()) ===
                    removeAccents(searchString.toLowerCase()) ||
                removeAccents(place.provincia.toLowerCase()) ===
                    removeAccents(searchString.toLowerCase()),
        );
    } else if (municipality) {
        filteredPlaces = places.filter((place) => {
            return (
                removeAccents(place.municipio.toLowerCase()) ===
                removeAccents(municipality.toLowerCase())
            );
        });
    } else {
        filteredPlaces = places;
    }

    if (url.startsWith("furancho-")) {
        const placeName = url.replaceAll("-", " ").trim();
        const currentPlace = places.find(
            (place) => place.nombre.toLowerCase() === placeName.toLowerCase(),
        );

        if (!!currentPlace) {
            if (currentPlace.nombre !== place.nombre) {
                setPlace(currentPlace);
            }

            return (
                <main>
                    <Gallery />
                    <div
                        ref={ref}
                        className={`${
                            isTop ? "sticky z-10 top-[82px]" : ""
                        } w-full bg-white p-4 flex justify-between border-b-[1px] border-gray-300`}
                    >
                        <div className="flex overflow-x-scroll no_scrollbar mr-[15px]">
                            <Link href="#overview">
                                <span className="flex items-center text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                                    Información
                                </span>
                            </Link>
                            <Link href="#amenities">
                                <span className="flex items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                                    Comodidades
                                </span>
                            </Link>
                            <Link href="#location">
                                <span className="flex items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                                    Localización
                                </span>
                            </Link>
                            <Link href="#reviews">
                                <span className="flex items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                                    Valoraciones
                                </span>
                            </Link>
                        </div>
                        <button
                            aria-label="Toggle Favorite"
                            className="flex items-center text-[16px] font-semibold py-1 px-4 border-[1px] border-gray-300 rounded"
                            onClick={() => toggleFavorite()}
                        >
                            <svg
                                className="w-4 h-4 lg:mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 18.64 18.232"
                            >
                                <path
                                    stroke={`${
                                        isFavorite ? "#ef4444" : "black"
                                    }`}
                                    strokeWidth="1.8px"
                                    fill={`${
                                        isFavorite ? "#ef4444" : "transparent"
                                    }`}
                                    d="M60.16,56h-.04a4.551,4.551,0,0,0-3.8,2.08A4.551,4.551,0,0,0,52.52,56h-.04A4.522,4.522,0,0,0,48,60.52a9.737,9.737,0,0,0,1.912,5.308A33.506,33.506,0,0,0,56.32,72a33.506,33.506,0,0,0,6.408-6.172A9.737,9.737,0,0,0,64.64,60.52,4.522,4.522,0,0,0,60.16,56Z"
                                    transform="translate(-47 -55)"
                                ></path>
                            </svg>
                            <span className="hidden lg:block">
                                Añadir a Favoritos
                            </span>
                        </button>
                    </div>
                    <section
                        id="overview"
                        className="snap-start container mx-auto px-2 md:px-[50px] pt-[35px]"
                    >
                        <h2 className="text-3xl">{place.nombre}</h2>
                        <div className="text-gray-500 mb-4">
                            <img
                                className="w-[50px] h-[25px]  "
                                src="/icons/ubicacion.svg"
                                alt="ubicación"
                                style={{ float: "left" }}
                            />{" "}
                            {place.GPS && (
                                <a
                                    href={`https://maps.google.com/?ll=${place.GPS.lat},${place.GPS.lng}&z=19`}
                                    target="_blank"
                                >
                                    {place.direccion}, {place.municipio} -{" "}
                                    {place.provincia}
                                </a>
                            )}
                        </div>
                        {place.telefono && (
                            <div className="text-gray-500 mb-4">
                                <img
                                    className="w-[50px] h-[25px]  "
                                    src="/icons/telefono.svg"
                                    alt="telefono"
                                    style={{ float: "left" }}
                                />{" "}
                                {place.telefono && (
                                    <a
                                        href={`tel:+34${place.telefono}`}
                                        target="_blank"
                                    >
                                        {place.telefono}
                                    </a>
                                )}
                            </div>
                        )}
                        <div className="flex items-center ml-4">
                            {Array(5)
                                .fill(0)
                                .map((value, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill={`${
                                            place.rating > index
                                                ? "#0099cc"
                                                : "none"
                                        }`}
                                        viewBox="0 0 24 24"
                                        stroke="#0099cc"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                ))}
                            <p className="m-0 ml-2 font-semibold">
                                {place.rating === 0
                                    ? "Sin opiniones"
                                    : place.rating < 2
                                    ? "Mal"
                                    : place.rating < 3
                                    ? "Regular"
                                    : place.rating < 5
                                    ? "Bien"
                                    : place.rating === 5
                                    ? "Excelente"
                                    : "Excelente"}
                                {!!place.reviews
                                    ? place.reviews.length <= 0
                                        ? ""
                                        : ` (${place.reviews.length})`
                                    : ""}
                            </p>
                        </div>
                        <p>
                            {place.descripcion
                                ? place.descripcion
                                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                        </p>
                    </section>
                    <section
                        id="amenities"
                        className="container mx-auto px-2 md:px-[50px] pt-[35px]"
                    >
                        <h2 className="text-3xl">Comodidades</h2>
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <figure className="bg-gray-200 rounded py-6 flex flex-col items-center max-w-[250px]">
                                <img
                                    className="w-[145px] h-[85px]"
                                    src="/icons/wifi.svg"
                                    alt="wifi"
                                />
                                <h4 className="text-lg font-normal pt-4">
                                    Wifi
                                </h4>
                            </figure>
                            <figure className="bg-gray-200 rounded py-6 flex flex-col items-center max-w-[250px]">
                                <img
                                    className="w-[145px] h-[85px]"
                                    src="/icons/parque.svg"
                                    alt="parque"
                                />
                                <h4 className="text-lg font-normal pt-4">
                                    Parque infantil
                                </h4>
                            </figure>

                            <figure className="bg-gray-200 rounded py-6 flex flex-col items-center max-w-[250px]">
                                <img
                                    className="w-[145px] h-[85px]"
                                    src="/icons/coche.svg"
                                    alt="parque"
                                />
                                <h4 className="text-lg font-normal pt-4">
                                    Parking
                                </h4>
                            </figure>
                        </div>
                    </section>
                    <section
                        id="location"
                        className="container mx-auto px-2 md:px-[50px] pt-[35px]"
                    >
                        <h2 className="text-3xl">Localización</h2>
                        {place.GPS && (
                            <a
                                href={`https://maps.google.com/?ll=${place.GPS.lat},${place.GPS.lng}&z=19`}
                                target="_blank"
                            >
                                Abrir en Google Maps
                            </a>
                        )}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                        {place.GPS && <GoogleMaps GPS={place.GPS} />}
                    </section>
                    <section
                        id="reviews"
                        className="container mx-auto px-2 md:px-[50px] pt-[35px]"
                    >
                        <div className="flex flex-col items-center pb-[30px] mb-[50px] border-b-[1px] border-gray-300 sm:flex-row sm:justify-between">
                            <div className="mb-2 w-full inline-flex items-center justify-between sm:w-fit">
                                <div className="flex">
                                    {Array(5)
                                        .fill(0)
                                        .map((value, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill={`${
                                                    place.rating > index
                                                        ? "#0099cc"
                                                        : "none"
                                                }`}
                                                viewBox="0 0 24 24"
                                                stroke="#0099cc"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                />
                                            </svg>
                                        ))}
                                </div>
                                <h4 className="text-1xl sm:text-1xl m-0 mr-2 ml-3">
                                    {place.reviews && place.reviews.length > 0
                                        ? `${place.reviews.length} Opiniones`
                                        : "Sin opiniones"}
                                </h4>
                            </div>
                            <div className="w-full flex justify-end sm:w-fit">
                                <button
                                    aria-label="Show modal review"
                                    onClick={() => handleShowModalReview()}
                                    className="bg-brand-blue text-lg text-white font-bold w-fit rounded py-1 px-2"
                                >
                                    Opinar
                                </button>
                            </div>
                            <Modal
                                className={`${
                                    isModalOpen ? "block" : "hidden"
                                }`}
                                close={() => {
                                    setIsModalOpen(false);
                                    setReviewError(false);
                                    setReviewDone(false);
                                }}
                                size="lg"
                            >
                                <div className="flex flex-col">
                                    <h3 className="my-3 text-2xl font-semibold text-gray-800">
                                        Escribe una opinión
                                    </h3>
                                    <Rate
                                        defaultValue={5}
                                        allowClear={false}
                                        onChange={(value) => setRate(value)}
                                    />
                                    <div className="m-7">
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={handlePostReview}
                                            validationSchema={
                                                validationSchemaReview
                                            }
                                        >
                                            {(formik) => (
                                                <Form>
                                                    {reviewDone && (
                                                        <h6 className="flex text-green-600 mb-4">
                                                            <img
                                                                className="h-6 w-6 mr-2"
                                                                src="/icons/check.svg"
                                                                alt="Error"
                                                            />
                                                            {reviewDone}
                                                        </h6>
                                                    )}
                                                    {reviewError && (
                                                        <h6 className="flex text-red-600 mb-4">
                                                            <img
                                                                className="h-6 w-6 mr-2"
                                                                src="/icons/error.svg"
                                                                alt="Error"
                                                            />
                                                            {reviewError}
                                                        </h6>
                                                    )}
                                                    <div className="mb-4">
                                                        <label className="block mb-1 text-sm text-gray-600">
                                                            Título
                                                        </label>
                                                        <ErrorMessage
                                                            className="text-xs text-red-600"
                                                            name="title"
                                                            component="span"
                                                        />
                                                        <Field
                                                            type="text"
                                                            name="title"
                                                            placeholder="Escribe tú título aquí"
                                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <div className="flex justify-between mb-1">
                                                            <label className="text-sm text-gray-600">
                                                                Descripción
                                                            </label>
                                                        </div>
                                                        <ErrorMessage
                                                            className="text-xs text-red-600"
                                                            name="description"
                                                            component="span"
                                                        />
                                                        <Field
                                                            as="textarea"
                                                            name="description"
                                                            placeholder="Escribe tú descripción aquí"
                                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 focus:border-blue-300"
                                                        />
                                                    </div>
                                                    <button
                                                        aria-label="Submit"
                                                        className="text-xl w-full text-white bg-blue-500 px-3 py-3 mb-6 rounded-md hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                                                        type="submit"
                                                    >
                                                        Enviar opinión
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        {place.reviews &&
                            place.reviews.map((review) => (
                                <div className="pb-[25px] my-[20px] border-b-[1px] border-gray-300">
                                    <div className="inline-flex w-full justify-between items-center mb-4">
                                        <div className="inline-flex">
                                            <div className="text-white font-semibold flex items-center justify-center mr-2 bg-brand-blue w-[40px] h-[40px] rounded-full">
                                                {review.apodo[0].toUpperCase()}
                                                {review.apodo[1]
                                                    ? review.apodo[1].toUpperCase()
                                                    : ""}
                                            </div>
                                            <h3 className="flex items-center text-lg m-0">
                                                {review.apodo}
                                            </h3>
                                        </div>
                                        <div className="flex">
                                            {Array(5)
                                                .fill(0)
                                                .map((value, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill={`${
                                                            review.rate > index
                                                                ? "#0099cc"
                                                                : "none"
                                                        }`}
                                                        viewBox="0 0 24 24"
                                                        stroke="#0099cc"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                        />
                                                    </svg>
                                                ))}
                                        </div>
                                    </div>
                                    <h4 className="text-[15px] font-semibold">
                                        {review.titulo}
                                    </h4>
                                    <p className="text-[15px]">
                                        {review.descripcion}
                                    </p>
                                </div>
                            ))}
                    </section>
                </main>
            );
        }
    } else if (url === "furancho" && !!q) {
        return (
            <main className="container mx-auto mt-[100px] px-2 lg:px-8">
                {filteredPlaces && filteredPlaces.length > 0 ? (
                    <>
                        <h2 className="text-3xl pb-[50px] text-gray-800">
                            Resultado de la búsqueda:
                        </h2>
                        <Places
                            places={
                                searchString || municipality
                                    ? filteredPlaces
                                    : places
                            }
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl pb-[50px] text-gray-800">
                            No hay resultados para la búsqueda, pero le
                            sugerimos estos furanchos:
                        </h2>
                        <Places places={places} />
                    </>
                )}
            </main>
        );
    }

    return <DefaultErrorPage statusCode={404} />;
}

export async function getServerSideProps(context) {
    try {
        const places = await getAppProps();

        return {
            props: { isConnected: true, places },
        };
    } catch (e) {
        console.error(e, "ERROR!!!");
        return {
            props: { isConnected: false, places: [] },
        };
    }
}
