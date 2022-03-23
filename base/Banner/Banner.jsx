import React from "react";
import { Carousel } from "antd";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { searchPlace } from "../../redux/actions/places";
import Image from "next/image";
import "antd/dist/antd.css";

const Banner = React.forwardRef(({ className, isHome, ...props }, ref) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const initialValuesSearch = {
        search: "",
    };

    const handleSearch = ({ search }) => {
        if (search.trim()) {
            dispatch(searchPlace(search));

            router.push("/places");
        }
    };

    return (
        <section
            ref={ref}
            className={`relative banner_section ${className ? className : ""}`}
            {...props}
        >
            <Carousel autoplay>
                <div className="banner relative">
                    <Image
                        className="object-cover object-center w-full h-full block"
                        src={"/images/banner/banner1.webp"}
                        alt="Banner"
                        priority={true}
                        layout="fill"
                    />
                </div>
                <div className="banner relative">
                    <Image
                        className="object-cover object-center w-full h-full block"
                        src={"/images/banner/banner2.webp"}
                        alt="Banner"
                        layout="fill"
                    />
                </div>
                <div className="banner relative">
                    <Image
                        className="object-cover object-center w-full h-full block"
                        src={"/images/banner/banner3.webp"}
                        alt="Banner"
                        layout="fill"
                    />
                </div>
            </Carousel>

            {isHome && (
                <div className="w-full absolute bottom-[10vh] px-4">
                    <div className="container mx-auto lg:max-w-[970px] xl:max-w-[1140px]">
                        <div className="container mx-auto bg-white rounded-lg p-[30px]">
                            <h2 className="text-3xl mb-[10px]">
                                Descubre los mejores furanchos y tabernas de
                                Galicia
                            </h2>
                            <p className="text-[15px] mb-0">
                                Compara entre más de 400 furanchos y tabernas.
                                Regístrate, guarda tus favoritos y valóralos.
                            </p>
                            <Formik
                                initialValues={initialValuesSearch}
                                onSubmit={handleSearch}
                            >
                                {(formik) => (
                                    <Form>
                                        <div className="flex border-[1px] rounded bg-gray-100 mt-[30px] hover:border-brand-blue">
                                            <Field
                                                type="text"
                                                name="search"
                                                className="appearance-none w-full h-[55px] text-lg text-gray-700 outline-none bg-transparent px-4 py-2"
                                                placeholder="Busca por nombre, localidad, provincia..."
                                            />
                                            <button
                                                aria-label="Submit"
                                                className="bg-brand-blue text-lg text-white rounded-r font-semibold min-w-[100px] h-[55px] flex items-center justify-center px-3 sm:min-w-[155px]"
                                                type="submit"
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});

export default Banner;
