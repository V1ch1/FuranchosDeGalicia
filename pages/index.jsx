import Places from "../base/Places";
import Slider from "../base/Slider/Slider";
import Banner from "../base/Banner/Banner";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAppProps } from "./_app";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { filterByMunicipality } from "../redux/actions/places";

export default function Index({
    isConnected,
    popularFuranchos,
    popularTabernas,
    municipalitiesPlaces,
}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const goToMunicipalitiesPlaces = (value) => {
        dispatch(filterByMunicipality(value));

        router.push("/places");
    };

    return (
        <main>
            <Banner isHome={true} />
            <section className="container mx-auto mt-[50px] px-2">
                <h2 className="text-3xl text-gray-800">Explora destinos</h2>
                <Slider arrows={true} autoplay={false}>
                    {municipalitiesPlaces.map((place, index) => (
                        <figure
                            key={place.name}
                            className={`slider-item relative my-0 cursor-pointer ${
                                index !== municipalitiesPlaces.length - 1
                                    ? "mr-4"
                                    : ""
                            }`}
                            onClick={() => goToMunicipalitiesPlaces(place.name)}
                        >
                            <Image
                                className="rounded-md brightness-50"
                                alt={place.name}
                                src={place.img}
                                width={242}
                                height={310}
                                placeholder="blur"
                                blurDataURL={place.img}
                                layout={"fixed"}
                            />
                            <div className="absolute top-0 flex flex-col justify-center items-center left-0 w-full h-full">
                                <h3 className="text-white text-2xl font-semibold">
                                    {place.name}
                                </h3>
                                <p className="text-lg font-semibold text-white m-0">
                                    {place.furanchos} Furanchos
                                </p>
                                <p className="text-lg font-semibold text-white m-0">
                                    {place.tabernas} Tabernas
                                </p>
                            </div>
                        </figure>
                    ))}
                </Slider>
            </section>
            {popularFuranchos && popularFuranchos.length > 0 && (
                <section className="container mx-auto mt-[50px] px-2">
                    <h2 className="text-3xl text-gray-800">
                        Furanchos más populares
                    </h2>
                    <Places places={popularFuranchos} />
                </section>
            )}
            {popularTabernas && popularTabernas.length > 0 && (
                <section className="container mx-auto mt-[50px] px-2">
                    <h2 className="text-3xl text-gray-800">
                        Tabernas más populares
                    </h2>
                    <Places places={popularTabernas} />
                </section>
            )}
        </main>
    );
}

export async function getServerSideProps(context) {
    try {
        const places = await getAppProps();

        const furanchos = places.filter(
            (place) => place.categoria.toLowerCase() === "furancho",
        );
        const tabernas = places.filter(
            (place) => place.categoria.toLowerCase() === "taberna",
        );

        const popularFuranchos = _.take(
            _.reverse(_.sortBy(furanchos, ["reviews"])),
            10,
        );

        const popularTabernas = _.take(
            _.reverse(_.sortBy(tabernas, ["reviews"])),
            10,
        );

        let municipalitiesList = places.map((place) => place.municipio);
        municipalitiesList = _.remove(
            [...new Set(municipalitiesList)],
            (value) => value !== "",
        );

        let municipalitiesPlaces = [];
        municipalitiesList.forEach((value) =>
            municipalitiesPlaces.push({
                img: "/images/places/paris.jpg",
                name: value,
                furanchos: places.filter(
                    (place) =>
                        place.categoria.toLowerCase() === "furancho" &&
                        place.municipio === value,
                ).length,
                tabernas: places.filter(
                    (place) =>
                        place.categoria.toLowerCase() === "taberna" &&
                        place.municipio === value,
                ).length,
            }),
        );

        return {
            props: {
                isConnected: true,
                popularFuranchos,
                popularTabernas,
                municipalitiesPlaces,
            },
        };
    } catch (e) {
        console.error(e, "ERROR!!!");
        return {
            props: { isConnected: false },
        };
    }
}
