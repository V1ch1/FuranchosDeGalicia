import { useEffect, useState } from "react";
import GoogleMaps from "../../base/Map/Map";
import Places from "../../base/Places";
import { getAppProps } from "../_app";
import Select from "../../components/Select/Select";
import { Button } from "antd";
import _ from "lodash";
import "antd/dist/antd.css";

export default function Tabernas({ places, provinces, municipalities }) {
    //states for filters management
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [placesWithFilter, setPlacesWithFilter] = useState(places);
    const [filterApplied, setFilterApplied] = useState({
        province: "",
        municipality: "",
        pincho: "",
    });
    const [isReset, setIsReset] = useState(false);

    //states for control map
    const [isMapVisible, setIsMapVisible] = useState(true);

    useEffect(() => {
        setIsMapVisible(!isMapVisible);
    }, [placesWithFilter]);

    const handleChangeProvince = (value) => {
        if (value) {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.municipality === "" ||
                            place.municipio === filterApplied.municipality) &&
                        (filterApplied.pincho === "" ||
                            place.pincho === filterApplied.pincho) &&
                        place.provincia === value
                    );
                }),
            );
        } else {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.municipality === "" ||
                            place.municipio === filterApplied.municipality) &&
                        (filterApplied.pincho === "" ||
                            place.pincho === filterApplied.pincho)
                    );
                }),
            );
        }
        setIsMapVisible(!isMapVisible);
        setFilterApplied({ ...filterApplied, province: value });
        setIsReset(false);
    };

    const handleChangeMunicipality = (value) => {
        if (value) {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.province === "" ||
                            place.provincia === filterApplied.province) &&
                        (filterApplied.pincho === "" ||
                            place.pincho === filterApplied.pincho) &&
                        place.municipio === value
                    );
                }),
            );
        } else {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.province === "" ||
                            place.provincia === filterApplied.province) &&
                        (filterApplied.pincho === "" ||
                            place.pincho === filterApplied.pincho)
                    );
                }),
            );
        }
        setIsMapVisible(!isMapVisible);
        setFilterApplied({ ...filterApplied, municipality: value });
        setIsReset(false);
    };

    const handleChangePinchos = (value) => {
        if (value) {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.province === "" ||
                            place.provincia === filterApplied.province) &&
                        (filterApplied.municipality === "" ||
                            place.municipio === filterApplied.municipality) &&
                        place.pincho === value
                    );
                }),
            );
        } else {
            setPlacesWithFilter(
                places.filter((place) => {
                    return (
                        (filterApplied.province === "" ||
                            place.provincia === filterApplied.province) &&
                        (filterApplied.municipality === "" ||
                            place.municipio === filterApplied.municipality)
                    );
                }),
            );
        }
        setIsMapVisible(!isMapVisible);
        setFilterApplied({ ...filterApplied, pincho: value });
        setIsReset(false);
    };

    const clearFilters = () => {
        if (
            isMapVisible ||
            filterApplied.province ||
            filterApplied.municipality ||
            filterApplied.pincho
        ) {
            setIsMapVisible(!isMapVisible);
        }
        setPlacesWithFilter(places);
        setFilterApplied({ province: "", municipality: "", pincho: "" });
        setIsReset(true);
    };

    return (
        <main className="mt-[82px]">
            {places.length !== 0 ? (
                <>
                    <div className="fixed z-20 top-[82px] flex justify-between items-center bg-white w-full h-[75px] border-b-[1px] border-gray-300 sm:px-2">
                        <div className="filters hidden sm:flex">
                            {provinces.length > 0 && (
                                <Select
                                    className="mr-2"
                                    label="Provincias"
                                    handleOnChange={handleChangeProvince}
                                    updatedValue={filterApplied.province}
                                    reset={isReset}
                                >
                                    {provinces.map((province, index) => (
                                        <li key={index}>{province}</li>
                                    ))}
                                </Select>
                            )}
                            {municipalities.length > 0 && (
                                <Select
                                    className="mr-2"
                                    label="Municipios"
                                    handleOnChange={handleChangeMunicipality}
                                    updatedValue={filterApplied.municipality}
                                    reset={isReset}
                                >
                                    {municipalities.map(
                                        (municipality, index) => (
                                            <li key={index}>{municipality}</li>
                                        ),
                                    )}
                                </Select>
                            )}
                            <Select
                                className="mr-2"
                                label="Pinchos"
                                handleOnChange={handleChangePinchos}
                                updatedValue={filterApplied.pincho}
                                reset={isReset}
                            >
                                <li>Si</li>
                                <li>No</li>
                                <li>Desconocido</li>
                            </Select>

                            <Button
                                aria-label="Cancel filters"
                                onClick={clearFilters}
                            >
                                Reset
                            </Button>
                        </div>
                        <div className="filters sm:hidden">
                            <Button
                                aria-label="Open filers"
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            >
                                Filtros
                            </Button>
                            <div>
                                <div
                                    className={`filters-mobile bg-white w-full no_scrollbar ${
                                        isFiltersOpen ? "fixed" : "hidden"
                                    }`}
                                >
                                    <Accordion
                                        className="mx-8 mt-8 mb-4"
                                        heading="Provincias"
                                    >
                                        <Radio.Group
                                            onChange={(e) =>
                                                handleChangeMunicipality(
                                                    e.target.value,
                                                )
                                            }
                                            value={filterApplied.province}
                                        >
                                            <Radio value="">Todas</Radio>
                                            {provinces.map((province) => (
                                                <Radio
                                                    key={province}
                                                    value={province}
                                                >
                                                    {province}
                                                </Radio>
                                            ))}
                                        </Radio.Group>
                                    </Accordion>
                                    <Accordion
                                        className="mx-8 mb-4"
                                        heading="Municipios"
                                    >
                                        <Radio.Group
                                            onChange={(e) =>
                                                handleChangeMunicipality(
                                                    e.target.value,
                                                )
                                            }
                                            value={filterApplied.municipality}
                                        >
                                            <Radio value="">Todos</Radio>
                                            {municipalities.map(
                                                (municipality) => (
                                                    <Radio
                                                        key={municipality}
                                                        value={municipality}
                                                    >
                                                        {municipality}
                                                    </Radio>
                                                ),
                                            )}
                                        </Radio.Group>
                                    </Accordion>
                                    <Accordion
                                        className="mx-8 mb-4"
                                        heading="Pinchos"
                                    >
                                        <Radio.Group
                                            onChange={(e) =>
                                                handleChangePinchos(
                                                    e.target.value,
                                                )
                                            }
                                            value={filterApplied.pincho}
                                        >
                                            <Radio value="">Todos</Radio>
                                            <Radio value="Si">Sí</Radio>
                                            <Radio value="No">No</Radio>
                                            <Radio value="Desconocido">
                                                Desconocido
                                            </Radio>
                                        </Radio.Group>
                                    </Accordion>
                                    <div className="fixed w-full flex justify-end bottom-0 pb-[20px] pr-4">
                                        <Button
                                            aria-label="Cancel filters"
                                            onClick={() => clearFilters()}
                                        >
                                            Cancelar filtros
                                        </Button>
                                        <Button
                                            aria-label="Apply filters"
                                            type="primary"
                                            onClick={() =>
                                                setIsFiltersOpen(false)
                                            }
                                        >
                                            Aceptar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="font-bold mx-2">
                            Show Map
                            <input
                                type="checkbox"
                                checked={isMapVisible}
                                className="ml-2 scale-125 outline-none"
                                onChange={() => setIsMapVisible(!isMapVisible)}
                            />
                        </label>
                    </div>
                    <div
                        className={`mt-[200px] ${
                            isMapVisible
                                ? "md:grid md:grid-cols-[60%_40%] md:gap-8"
                                : ""
                        }`}
                    >
                        <Places
                            className={`${
                                isMapVisible
                                    ? "hidden md:grid md:cols-span-1 px-4"
                                    : "cols-span-2"
                            }`}
                            sm={isMapVisible}
                            places={placesWithFilter}
                        />
                        {isMapVisible && (
                            <div className="relative">
                                <GoogleMaps places={placesWithFilter} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <section className="container mx-auto pt-[100px] pb-[15vh] px-2">
                    <h2 className="text-3xl text-gray-800">
                        No hay tabernas...
                    </h2>
                </section>
            )}
        </main>
    );
}

export async function getServerSideProps(context) {
    try {
        const allPlaces = await getAppProps();

        const tabernas = allPlaces.filter(
            (place) => place.categoria.toLowerCase() === "taberna",
        );

        let provinces = allPlaces.map((place) => place.provincia);
        provinces = _.remove([...new Set(provinces)], (value) => value !== "");

        let municipalities = allPlaces.map((place) => place.municipio);
        municipalities = _.remove(
            [...new Set(municipalities)],
            (value) => value !== "",
        );

        return {
            props: {
                isConnected: true,
                places: tabernas,
                provinces,
                municipalities,
            },
        };
    } catch (e) {
        console.error(e, "ERROR!!!");
        return {
            props: { isConnected: false },
        };
    }
}
