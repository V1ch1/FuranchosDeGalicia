import React, { useEffect, useRef, useState } from "react";

export default function Select({
    className,
    label,
    children,
    handleOnChange,
    updatedValue,
    reset,
    ...props
}) {
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);

    useEffect(() => {
        if (reset) {
            setOptionSelected(false);
        }
    }, [reset]);

    useEffect(() => {
        if (updatedValue) {
            setOptionSelected(updatedValue);
        }
    }, [updatedValue]);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="relative select">
            <div
                ref={ref}
                className={`h-[35px] w-[120px] border-[1px] rounded px-2 flex justify-between items-center relative cursor-pointer ${
                    className ?? ""
                }`}
                style={{ overflowY: "hidden" }}
                onClick={(e) => setIsOpen(!isOpen)}
                {...props}
            >
                <span
                    className={`overflow-x-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer ${
                        optionSelected ? "text-blackColor" : "text-gray-400"
                    } mx-2`}
                >
                    {optionSelected || label}
                </span>
                <img
                    className={`w-4 h-4 cursor-pointer ${
                        isOpen && "rotate-180"
                    }`}
                    src="/icons/arrow-down.svg"
                    alt="arrow"
                />
            </div>
            <ul
                className={`absolute w-full max-h-[200px] top-[45px] left-0 bg-gray-50 z-10 rounded shadow-lg overflow-y-auto ${
                    !isOpen && "hidden"
                }`}
            >
                <li
                    className="text-gray-400 hover:bg-gray-500 hover:text-gray-50 pl-[14px] rounded overflow-x-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                    onClick={() => {
                        setOptionSelected(false);
                        handleOnChange("");
                        setIsOpen(!isOpen);
                    }}
                >
                    {label}
                </li>
                {children.map((option, index) => (
                    <li
                        key={index}
                        className="pl-[14px] rounded-[8px] overflow-x-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:bg-gray-500 hover:text-gray-50"
                        onClick={(e) => {
                            setOptionSelected(e.target.innerHTML);
                            handleOnChange(e.target.innerHTML);
                            setIsOpen(!isOpen);
                        }}
                    >
                        {option.props.children}
                    </li>
                ))}
            </ul>
        </div>
    );
}
