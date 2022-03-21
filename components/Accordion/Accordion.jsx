import React, { useState, useRef, useEffect } from "react";

function Accordion({ className, heading, children, ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        if (isOpen) {
            element.style.height = `${element.scrollHeight}px`;

            const animationEnd = () => {
                document.removeEventListener("transitionend", animationEnd);
                element.style.height = `${element.scrollHeight}px`;
            };

            document.addEventListener("transitionend", animationEnd);
        } else {
            element.style.height = `${element.firstChild.scrollHeight + 25}px`;

            const animationBackEnd = () => {
                document.removeEventListener("transitionend", animationBackEnd);
                element.style.height = `${
                    element.firstChild.scrollHeight + 25
                }px`;
            };

            document.addEventListener("transitionend", animationBackEnd);
        }
    }, [isOpen, ref]);

    return (
        <div
            ref={ref}
            className={`overflow-y-hidden transition-[height] py-[25px] duration-400 border-b-[1px] ${
                className ?? ""
            }`}
            data-collapsed={!isOpen}
            {...props}
        >
            <h5 className="text-lg font-medium flex justify-between">
                {heading}
                <img
                    className="ml-auto w-4 cursor-pointer"
                    src="/icons/arrow-down.svg"
                    alt="arrow"
                    onClick={(e) => {
                        setIsOpen(!isOpen);
                        e.target.style.transform = !isOpen
                            ? "rotate(180deg)"
                            : "";
                    }}
                />
            </h5>
            {children}
        </div>
    );
}

export default Accordion;
