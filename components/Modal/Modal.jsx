import React from "react";

export default function Modal({
    children,
    close,
    className,
    size = "sm",
    isMap = false,
}) {
    return (
        <div
            className={`absolute top-0 left-0 h-screen max-w-screen flex justify-center items-center ${
                className ? className : ""
            }`}
        >
            <div className="h-full">
                <div
                    className={`fixed flex items-center h-full w-full z-50 ${
                        isMap ? "top-[60px]" : ""
                    }`}
                >
                    <div className="fixed h-full w-full bg-black opacity-60 z-10"></div>
                    <div
                        className={`relative w-full z-20 shadow-lg bg-white max-h-[80vh] overflow-auto rounded-lg pt-0 
                        ${isMap ? "m-4 p-1 max-w-[270px]" : "p-6  mx-auto"}
                        ${size === "lg" ? "max-w-[500px]" : "max-w-[375px]"}`}
                    >
                        <div className="sticky top-0 py-3 bg-white flex justify-end">
                            <button
                                aria-label="Close"
                                onClick={() => {
                                    close();
                                }}
                            >
                                <img
                                    className="h-6 w-6"
                                    src="/icons/close.svg"
                                    alt="Close"
                                />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
