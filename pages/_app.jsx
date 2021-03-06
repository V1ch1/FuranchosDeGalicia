import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { useRouter } from "next/router";
import Header from "../base/Header";
import Footer from "../base/Footer/Footer";
import { useEffect } from "react";
import { getPlacesList } from "../data/api/places/services";
import "../styles/index.css";
import CookieConsent from "react-cookie-consent";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const isHome = router.pathname === "/";

    let areThereTabernas = false;

    useEffect(async () => {
        const places = await getPlacesList();

        areThereTabernas = places.some(
            (place) => place.categoria.toLowerCase() === "taberna",
        );
    }, []);

    useEffect(() => {
        TagManager.initialize({
            gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER,
        });
    }, []);

    return (
        <>
            <Provider store={store}>
                <Header isHome={isHome} areThereTabernas={areThereTabernas} />
                <Component {...pageProps} />
                {!["/furanchos", "/tabernas"].includes(router.pathname) && (
                    <Footer areThereTabernas={areThereTabernas} />
                )}
                <CookieConsent
                    location="bottom"
                    buttonText="Aceptar"
                    cookieName="myAwesomeCookieName2"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{
                        color: "white",
                        fontSize: "15px",
                        background: "#0099CC",
                        borderRadius: "3px",
                    }}
                    expires={150}
                >
                    Este sitio web utiliza cookies para mejorar su experiencia.
                    Asumiremos que estás de acuerdo con esto, pero puedes optar
                    por no hacerlo si lo deseas. Leer{" "}
                    <a href="/cookies"> Política de Cookies. </a>
                </CookieConsent>
            </Provider>
        </>
    );
}

export async function getAppProps() {
    const data = await getPlacesList();

    const places = data.map((place, _, array) => {
        // fake data for development

        place.imagenes = "/images/places/taberna1.webp";

        //-----real rating logic---------
        place.rating =
            place.rating.length > 0
                ? Math.floor(
                      place.rating.reduce((a, b) => a + b, 0) /
                          place.rating.length,
                  )
                : 0;

        //location desestructuring
        place.GPS = {
            lat: +place.GPS.split(",")[0].trim(),
            lng: +place.GPS.split(",")[1].trim(),
        };

        place.uid = place._id;
        delete place._id;

        return place;
    });

    return places;
}

export default MyApp;
