import { Children, useEffect, useRef, useState } from "react";

export default function Slider({ arrows, autoplay, children, className }) {
    const ref = useRef(null);
    const [showArrows, setShowArrows] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const childrenAsArray = Children.toArray(children);

    const getItemWidth = () => {
        const firstItem = document.querySelector(".slider-item");

        return firstItem ? firstItem.scrollWidth : 0;
    };

    const handleScroll = () => {
        // Current index logic.
        const scrollPosition =
            (document.querySelector(".slider-items").scrollLeft ?? 0) /
            (getItemWidth() || 1);

        setCurrentIndex(scrollPosition);

        // Arrows logic.
        if (arrows) {
            if (!ref.current) {
                return;
            }

            const left = ref.current.scrollLeft;

            setShowArrows({
                left: left > 32,
                right:
                    left !== ref.current.scrollWidth - ref.current.offsetWidth,
            });
        }
    };

    const handleArrowClick = (left) => {
        setCurrentIndex(currentIndex + (left ? -1 : 1));

        ref.current.scrollBy({
            top: 0,
            left: left ? -150 : 150,
            behavior: "smooth",
        });
    };

    const slideTo = (index) => {
        setCurrentIndex(index);

        ref.current.scroll({
            top: 0,
            left: index * getItemWidth(),
            behavior: "smooth",
        });
    };

    useEffect(() => {
        handleScroll();
    }, [arrows]);

    useEffect(() => {
        if (!autoplay) {
            return;
        }

        const interval = setInterval(() => {
            const nextIndex =
                currentIndex >= childrenAsArray.length - 1 ||
                ref.current.scrollLeft >=
                    ref.current.scrollWidth - ref.current.offsetWidth
                    ? 0
                    : currentIndex + 1;

            slideTo(nextIndex);
            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [autoplay, currentIndex]);

    return (
        <div className="relative">
            <button
                type="button"
                aria-label="Scroll left"
                disabled={!showArrows.left}
                className="bg-white rounded-full h-8 w-8 rotate-180 absolute top-[50%] left-[-7px] md:left-[-15px] z-20 shadow-[-2px_0px_15px_3px_rgba(0,0,0,0.3)] hover:bg-brand-blue"
                onClick={() => handleArrowClick(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 hover:stroke-[#ffffff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#0099cc"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
            <button
                type="button"
                aria-label="Scroll left"
                disabled={!showArrows.right}
                className="bg-white rounded-full h-8 w-8 absolute top-[50%] right-[-7px] md:right-[-15px] z-20 shadow-[-2px_0px_15px_3px_rgba(0,0,0,0.3)] hover:bg-brand-blue"
                onClick={() => handleArrowClick(false)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 hover:stroke-[#ffffff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#0099cc"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
            <div
                ref={ref}
                onScroll={handleScroll}
                className={`slider-items relative flex overflow-x-scroll no_scrollbar ${
                    className ? className : ""
                }`}
            >
                {Children.map(childrenAsArray, (child) => child)}
            </div>
        </div>
    );
}
