import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { searchPlace } from "../redux/actions/places";
import { useRouter } from "next/router";
import { hideMenu, showMenu } from "../redux/actions/ui";
import Auth from "./Auth";

export default function Header({ isHome, areThereTabernas }) {
    const ref = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isTop, setIsTop] = useState(true);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const { isMenuOpen } = useSelector((state) => state.ui);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const initialValuesSearch = {
        search: "",
    };

    const toggleMenu = () => {
        dispatch(isMenuOpen ? hideMenu() : showMenu());
    };

    const handleSearch = ({ search }) => {
        if (search.trim()) {
            dispatch(searchPlace(search));
            router.push(`/furancho?q=${encodeURIComponent(search)}`);
        }
    };

    useEffect(() => {
        const banner = document.querySelector(".banner_section");

        if (banner) {
            const handleScroll = () => {
                setIsSearchVisible(banner.getBoundingClientRect().bottom < 80);
            };

            document.addEventListener("scroll", handleScroll);
            handleScroll();

            return () => {
                document.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                dispatch(hideMenu());
            }
        };

        const handleScroll = () => {
            setIsTop(window.scrollY === 0);
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isMenuOpen]);

    return (
        <nav
            className={`${
                isTop && isHome
                    ? "bg-transparent"
                    : "bg-white border-b-[1px] border-gray-300"
            } px-4 fixed w-full z-50 top-0 transition-[background] duration-300`}
            ref={ref}
        >
            <div className="flex justify-between w-full h-[82px] md:items-center">
                <div className="h-full flex items-center">
                    <Link href="/">
                        <div className="inline-flex cursor-pointer">
                            <Image
                                width={30}
                                height={30}
                                layout="fixed"
                                src={`/images/${
                                    isTop && isHome ? "logo-white" : "logo"
                                }.svg`}
                            />
                            <span
                                className={`${
                                    isTop && isHome
                                        ? "text-white"
                                        : `${
                                              isHome ? "" : "hidden sm:block"
                                          } text-brand-blue hover:text-blue-500`
                                } text-xl font-semibold ml-2 md:text-2xl`}
                            >
                                FuranchosEnGalicia
                            </span>
                        </div>
                    </Link>
                    {(!isHome || (!isTop && isSearchVisible)) && (
                        <Formik
                            initialValues={initialValuesSearch}
                            onSubmit={handleSearch}
                        >
                            {(formik) => (
                                <Form>
                                    <div
                                        className={`${
                                            isHome ? "hidden md:flex" : "flex"
                                        } ml-4 mr-2 border-[1px] rounded bg-gray-100 md:m-5 hover:border-brand-blue`}
                                    >
                                        <Field
                                            type="text"
                                            name="search"
                                            className="appearance-none w-full text-lg text-gray-700 outline-none bg-transparent px-4 py-2"
                                            placeholder="Buscar..."
                                            autoComplete="off"
                                        />
                                        <button
                                            aria-label="Submit"
                                            className="flex items-center justify-center px-3 stroke-gray-700 hover:stroke-brand-blue"
                                            type="submit"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="11"
                                                    cy="11"
                                                    r="8"
                                                ></circle>
                                                <line
                                                    x1="21"
                                                    y1="21"
                                                    x2="16.65"
                                                    y2="16.65"
                                                ></line>
                                            </svg>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
                {/* Mobile menu button */}
                <div className="lg:hidden" onClick={() => toggleMenu()}>
                    <button
                        type="button"
                        className="relative self-end top-0 right-0 h-full z-50 text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 md:absolute md:right-5"
                        aria-label="toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-7 w-7 duration-200 ${
                                isMenuOpen || !isHome
                                    ? "stroke-[#64748b] hover:stroke-black"
                                    : isTop
                                    ? "stroke-white"
                                    : "stroke-black"
                            } hover:h-8 hover:w-8`}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={`${
                                    isMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }`}
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                <div
                    className={`bg-[rgba(0,0,0,0.6)] absolute right-0 top-0 z-20 pl-1 grow justify-end items-start h-screen w-full ${
                        isMenuOpen ? "flex" : "hidden lg:flex"
                    } lg:static lg:justify-end lg:items-center lg:h-full lg:w-[initial] lg:p-0 lg:bg-transparent `}
                >
                    <div
                        className={`bg-white flex flex-col mt-0 pt-[82px] h-full lg:bg-transparent lg:justify-end lg:flex-row lg:pt-0 ${
                            isMenuOpen ? "w-[285px] lg:w-full" : "w-full"
                        }`}
                    >
                        <span
                            onClick={() => {
                                dispatch(hideMenu());
                                router.push("/furanchos");
                            }}
                            className={`flex order-2 items-center mt-10 text-[16px] px-2 cursor-pointer lg:mx-4 lg:my-0 lg:order-[initial] ${
                                isTop && isHome
                                    ? `${
                                          isMenuOpen
                                              ? "text-black hover:text-brand-blue"
                                              : "text-white"
                                      }`
                                    : "text-black hover:text-brand-blue"
                            }`}
                        >
                            Furanchos
                        </span>
                        <span
                            onClick={() => {
                                dispatch(hideMenu());
                                router.push("/contact");
                            }}
                            className={`flex order-2 items-center mt-10 text-[16px] px-2 cursor-pointer lg:mx-4 lg:my-0 lg:order-[initial] ${
                                isTop && isHome
                                    ? `${
                                          isMenuOpen
                                              ? "text-black hover:text-brand-blue"
                                              : "text-white"
                                      }`
                                    : "text-black hover:text-brand-blue"
                            }`}
                        >
                            Contacto
                        </span>
                        {areThereTabernas && (
                            <span
                                onClick={() => {
                                    dispatch(hideMenu());
                                    router.push("/tabernas");
                                }}
                                className={`flex order-2 items-center mt-10 text-[16px] px-2 cursor-pointer lg:mx-4 lg:my-0 lg:order-[initial] ${
                                    isTop && isHome
                                        ? `${
                                              isMenuOpen
                                                  ? "text-black hover:text-brand-blue"
                                                  : "text-white"
                                          }`
                                        : "text-black hover:text-brand-blue"
                                }`}
                            >
                                Tabernas
                            </span>
                        )}
                        {isAuthenticated && (
                            <span
                                onClick={() => {
                                    dispatch(hideMenu());
                                    router.push("/perfil");
                                }}
                                className={`flex order-2 items-center mt-10 text-[16px] px-2 cursor-pointer lg:mx-4 lg:my-0 lg:order-[initial] ${
                                    isTop && isHome
                                        ? `${
                                              isMenuOpen
                                                  ? "text-black hover:text-brand-blue"
                                                  : "text-white"
                                          }`
                                        : "text-black hover:text-brand-blue"
                                }`}
                            >
                                Perfil
                            </span>
                        )}
                        <div className="flex items-center justify-center bg-gray-100 h-[90px] lg:bg-transparent lg:h-auto">
                            <Auth
                                isTop={isTop}
                                isHome={isHome}
                                isMenuOpen={isMenuOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
