import { useEffect, useState } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import Place from "../Place";
import style from "./map.module.css";

const defaultCenter = { lat: 42.113416, lng: -8.552935 };

const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
    withGoogleMap(({ GPS, places }) => {
        const { user } = useSelector((state) => state.auth);
        const [isModalVisible, setIsModalVisible] = useState(false);

        const [mapPlaces, setMapPlaces] = useState([]);

        useEffect(() => {
            setMapPlaces(places);
        }, [places]);

        if (places) {
            return (
                <div>
                    <GoogleMap
                        defaultZoom={8}
                        defaultCenter={defaultCenter}
                        defaultOptions={defaultOptions}
                    >
                        {mapPlaces.length > 0 &&
                            places.map(
                                (place, index) =>
                                    place.GPS.lat &&
                                    place.GPS.lng && (
                                        <div key={index}>
                                            <Marker
                                                onClick={() =>
                                                    setIsModalVisible(index)
                                                }
                                                position={place.GPS}
                                            />
                                            <Modal
                                                className={`${
                                                    isModalVisible === index
                                                        ? "block"
                                                        : "hidden"
                                                }`}
                                                isMap={true}
                                                close={() =>
                                                    setIsModalVisible(false)
                                                }
                                            >
                                                <Place
                                                    place={place}
                                                    favorite={user?.favoritos.includes(
                                                        place.uid,
                                                    )}
                                                    inMap={true}
                                                />
                                            </Modal>
                                        </div>
                                    ),
                            )}
                    </GoogleMap>
                </div>
            );
        }

        return (
            <GoogleMap
                defaultZoom={GPS ? 13 : 8}
                defaultCenter={GPS || defaultCenter}
                defaultOptions={defaultOptions}
            >
                {GPS && <Marker position={GPS} />}
            </GoogleMap>
        );
    }),
);

export default function GoogleMaps({ GPS, places = false }) {
    return (
        <RegularMap
            GPS={GPS}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAi1lpc1owD0-SqDUq3P-TNZWOWL1UgDT8"
            loadingElement={<div className="h-full" />}
            containerElement={
                <div className={`${places ? style.map : "h-[350px]"}`} />
            }
            mapElement={<div className="h-full" />}
            places={places.length > 0 ? places : false}
        />
    );
}
