import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlace } from "../redux/actions/places";
import { updateFavorites } from "../data/api/user/services";
import Image from "next/image";
import { login } from "../redux/actions/auth";
import { showAuth, showMenu } from "../redux/actions/ui";
import _ from "lodash";

export default function Place({ place, favorite }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(favorite);
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);

    const goToPlace = () => {
        dispatch(setCurrentPlace({ ...place, favorite }));
        localStorage.setItem(
            "currentPlace",
            JSON.stringify({ ...place, favorite }),
        );
        router.push("/place");
    };

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

    useEffect(() => {
        if (user) {
            if (user.favoritos.includes(place.uid)) {
                setIsFavorite(true);
            }
        }
    }, [user]);

    return (
        <div className="relative w-full rounded select-none shadow-[inset_0_0_0px_1px_rgba(0,0,0,0.15)]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute z-10 right-2 top-2 w-[20px] h-[20px] tansition-all duration-200 cursor-pointer hover:w-6 hover:h-6"
                viewBox="0 0 18.64 18.232"
                onClick={() => toggleFavorite()}
            >
                <path
                    fill={`${
                        isFavorite ? "rgb(252, 92, 99)" : "rgba(0, 0, 0, 0.25)"
                    }`}
                    stroke="rgb(255, 255, 255)"
                    strokeWidth="2px"
                    d="M60.16,56h-.04a4.551,4.551,0,0,0-3.8,2.08A4.551,4.551,0,0,0,52.52,56h-.04A4.522,4.522,0,0,0,48,60.52a9.737,9.737,0,0,0,1.912,5.308A33.506,33.506,0,0,0,56.32,72a33.506,33.506,0,0,0,6.408-6.172A9.737,9.737,0,0,0,64.64,60.52,4.522,4.522,0,0,0,60.16,56Z"
                    transform="translate(-47 -55)"
                ></path>
            </svg>
            <figure
                className="block m-0 rounded-t max-w-full overflow-hidden cursor-pointer"
                onClick={() => goToPlace()}
            >
                <Image
                    className="object-cover object-center w-full h-full block"
                    src={place.imagenes}
                    alt={place.nombre}
                    width={250}
                    height={170}
                    quality={100}
                    placeholder="blur"
                    blurDataURL={place.imagenes}
                    layout="responsive"
                />
            </figure>
            <div className="p-[15px]">
                <div>
                    <p className="text-gray-400 text-[13px] overflow-hidden whitespace-nowrap text-ellipsis mb-0">
                        {place.direccion}
                    </p>
                    <h2
                        className="text-gray-900 overflow-hidden whitespace-nowrap text-ellipsis text-lg font-medium cursor-pointer"
                        onClick={() => goToPlace()}
                    >
                        {place.nombre}
                    </h2>
                    <div className="flex items-center">
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
                        <p className="text-black text-sm m-0 ml-2 font-semibold">
                            {place.rating === 0
                                ? ""
                                : place.rating < 3
                                ? "Mal"
                                : place.rating === 3
                                ? "Promedio"
                                : place.rating === 5
                                ? "Asombroso"
                                : "Bueno"}
                            {!!place.reviews
                                ? place.reviews.length <= 0
                                    ? ""
                                    : ` (${place.reviews.length})`
                                : ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
