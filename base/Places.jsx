import { useSelector } from "react-redux";
import Place from "./Place";

export default function Places({ places, sm, className }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <section
            className={`container mx-auto px-2 pb-[20px] text-gray-600 body-font grid gap-4 ${
                sm
                    ? "grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            } ${className ? className : ""}`}
        >
            {places.map((place) => (
                <Place
                    key={place.uid}
                    place={place}
                    favorite={user?.favoritos.includes(place.uid)}
                />
            ))}
        </section>
    );
}
