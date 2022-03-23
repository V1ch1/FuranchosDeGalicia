import Link from "next/link";
import style from "./footer.module.css";

export default function Footer({ areThereTabernas }) {
    return (
        <footer
            className={`text-gray-600 pt-[50px] mt-[75px] flex flex-col items-center h-[250px] ${style.footer}`}
        >
            <Link href="/" scroll={false}>
                <span className="text-brand-blue text-xl font-bold cursor-pointer md:text-2xl hover:text-blue-500">
                    FuranchosDeGalicia
                </span>
            </Link>
            <div className="flex flex-wrap justify-center mt-6">
                <Link href="/aviso-legal">
                    <span className="flex font-semibold items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                        Aviso Legal
                    </span>
                </Link>
                <Link href="/politica-privacidad">
                    <span className="flex font-semibold items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                        Política de Privacidad{" "}
                    </span>
                </Link>
                <Link href="/cookies">
                    <span className="flex font-semibold items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                        Política de Cookies{" "}
                    </span>
                </Link>
                <Link href="/furanchos">
                    <span className="flex font-semibold items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                        Contacto
                    </span>
                </Link>
                {areThereTabernas && (
                    <Link href="/tabernas">
                        <span className="flex font-semibold items-center my-1 text-lg px-2 md:mx-4 md:my-0 cursor-pointer text-black hover:text-brand-blue">
                            Tabernas
                        </span>
                    </Link>
                )}
            </div>
            <p className="text-gray-500 text-[16px] mt-4">
                Copyright @ 2022 FuranchosDeGalicia, Inc.
            </p>
        </footer>
    );
}
