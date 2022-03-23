import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";

const Gallery = React.forwardRef(({ ...props }, ref) => {
    const [media, setMedia] = useState(null);
    const [nav, setNav] = useState(null);

    useEffect(() => {
        setMedia(media);
        setNav(nav);
    }, []);

    return (
        <div className="gallery" ref={ref}>
            <div className="gallery__current-image">
                <Carousel
                    asNavFor={nav}
                    touchMove={false}
                    dots={false}
                    ref={(carousel) => (media = carousel)}
                >
                    <figure className="relative w-full h-[500px]">
                        <Image
                            className="object-cover object-center block"
                            src={"/images/banner/banner1.webp"}
                            alt="Banner"
                            priority={true}
                            layout="fill"
                        />
                    </figure>
                    <figure className="relative w-full h-[500px]">
                        <Image
                            className="object-cover object-center block"
                            src={"/images/banner/banner2.webp"}
                            alt="Banner"
                            priority={true}
                            layout="fill"
                        />
                    </figure>
                    <figure className="relative w-full h-[500px]">
                        <Image
                            className="object-cover object-center block"
                            src={"/images/banner/banner3.webp"}
                            alt="Banner"
                            priority={true}
                            layout="fill"
                        />
                    </figure>
                    <figure className="relative w-full h-[500px]">
                        <Image
                            className="object-cover object-center block"
                            src={"/images/banner/banner1.webp"}
                            alt="Banner"
                            priority={true}
                            layout="fill"
                        />
                    </figure>
                </Carousel>
            </div>
            <Carousel
                slidesToShow={3}
                centerMode={true}
                asNavFor={media}
                draggable={true}
                ref={(carousel) => (nav = carousel)}
                swipeToSlide={true}
                touchThreshold={50}
                focusOnSelect={true}
            >
                <figure className="relative w-full h-[160px]">
                    <Image
                        className="object-cover object-center block"
                        src={"/images/banner/banner1.webp"}
                        alt="Banner"
                        priority={true}
                        layout="fill"
                    />
                </figure>
                <figure className="relative w-full h-[160px]">
                    <Image
                        className="object-cover object-center block"
                        src={"/images/banner/banner2.webp"}
                        alt="Banner"
                        priority={true}
                        layout="fill"
                    />
                </figure>
                <figure className="relative w-full h-[160px]">
                    <Image
                        className="object-cover object-center block"
                        src={"/images/banner/banner3.webp"}
                        alt="Banner"
                        priority={true}
                        layout="fill"
                    />
                </figure>
                <figure className="relative w-full h-[160px]">
                    <Image
                        className="object-cover object-center block"
                        src={"/images/banner/banner1.webp"}
                        alt="Banner"
                        priority={true}
                        layout="fill"
                    />
                </figure>
            </Carousel>
        </div>
    );
});

export default Gallery;
