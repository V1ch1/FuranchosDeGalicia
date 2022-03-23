import { useSelector } from "react-redux";
import Places from "../../base/Places";
import { getAppProps } from "../_app";
import _ from "lodash";

export default function index({ places }) {
    const { search: searchString, municipality } = useSelector(
        (state) => state.filterBy,
    );

    let filteredPlaces;
    if (searchString) {
        filteredPlaces = places.filter(
            (place) =>
                place.nombre
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) ||
                place.municipio.toLowerCase() === searchString.toLowerCase() ||
                place.provincia.toLowerCase() === searchString.toLowerCase(),
        );
    } else if (municipality) {
        filteredPlaces = places.filter((place) => {
            return place.municipio.toLowerCase() === municipality.toLowerCase();
        });
    } else {
        filteredPlaces = places;
    }

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
                        No hay resultados para la búsqueda, pero le sugerimos
                        estos furanchos:
                    </h2>
                    <Places places={places} />
                </>
            )}
        </main>
    );
}

export async function getServerSideProps(context) {
    try {
        const places = await getAppProps();

        let provinces = places.map((place) => place.provincia);
        provinces = _.remove([...new Set(provinces)], (value) => value !== "");

        let municipalities = places.map((place) => place.municipio);
        municipalities = _.remove(
            [...new Set(municipalities)],
            (value) => value !== "",
        );

        return {
            props: { isConnected: true, places, provinces, municipalities },
        };
    } catch (e) {
        console.error(e, "ERROR!!!");
        return {
            props: { isConnected: false, places: [] },
        };
    }
}
