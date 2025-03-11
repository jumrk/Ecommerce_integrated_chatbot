import React, { useState, useRef, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ButtonBlack } from '../../button/Button';
import './Hero.css';

const Hero = () => {
    const [mainImageId, setMainImageId] = useState(1);
    const scrollRef = useRef(null);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const messages = [
        "Hãy trải nghiệm những sản phẩm tuyệt vời của chúng tôi!",
        "Lựa chọn sản phẩm theo phong cách của bạn"
    ];
    const period = 3000;
    const [delta, setDelta] = useState(80);

    const images = [
        { id: 1, src: 'images/HeroImg/banner4.png' },
        { id: 2, src: 'images/HeroImg/banner5.png' },
        { id: 3, src: 'images/HeroImg/banner5.png' },
        { id: 4, src: 'images/HeroImg/banner5.png' },
    ];

    const mainImage = images.find((img) => img.id === mainImageId).src;

    useEffect(() => {
        const interval = setInterval(() => {
            setMainImageId((prevId) => {
                const currentIndex = images.findIndex((img) => img.id === prevId);
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex].id;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        const activeImage = slider.querySelector(`[data-id="${mainImageId}"]`);
        if (activeImage) {
            const sliderWidth = slider.clientWidth;
            const imageWidth = activeImage.offsetWidth;
            const scrollPosition = activeImage.offsetLeft - (sliderWidth / 2) + (imageWidth / 2);
            slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [mainImageId]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text, isDeleting]);

    const tick = () => {
        let i = loopNum % messages.length;
        let fullText = messages[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(30);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(80);
        } else if (!isDeleting) {
            setDelta(80 + Math.random() * 20);
        }
    };

    const handleImageClick = (id) => {
        setMainImageId(id);
    };

    const scrollLeft = () => {
        const slider = scrollRef.current;
        if (slider) {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        const slider = scrollRef.current;
        if (slider) {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative bg-white min-h-screen flex flex-col items-center md:items-start overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.4) 0%, rgba(173, 216, 230, 0.3) 50%, rgba(255, 255, 255, 0) 100%)',
                    clipPath: 'ellipse(80% 60% at 30% 20%)',
                }}
            ></div>


            <div className="relative md:absolute md:inset-0 flex items-center justify-center w-full mt-4 md:mt-0">
                <img
                    src={mainImage}
                    alt="Central fashion model"
                    className="w-auto drop-shadow-2xl h-[50vh] md:h-[90vh] object-contain z-0 md:z-20"
                />
            </div>

            <div className="relative z-10 w-full text-center md:text-left px-4 md:pl-8 lg:pl-16 xl:pl-20 2xl:pl-28 md:pr-8 lg:pr-16 xl:pr-20 pt-8 md:pt-24">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#515151] drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] tracking-wider mb-4 leading-tight transform hover:scale-105 transition-transform duration-300">
                    THỜI TRANG THEO <br /> XU HƯỚNG <br /> CỦA BẠN
                </h1>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#6A695B] mb-6 md:mb-8 drop-shadow-md font-medium h-[3em] flex items-center justify-center md:justify-start">
                    <span className="typing-text">{text}</span>
                    <span className="typing-cursor">|</span>
                </p>
                <ButtonBlack text="Xem ngay" />
            </div>

            <div className="hidden md:flex absolute top-1/2 right-2 md:right-8 lg:right-10 transform -translate-y-1/2 z-10 max-w-[60vw] md:max-w-[40vw] lg:max-w-[30vw] flex-col items-center gap-4">
                <div
                    ref={scrollRef}
                    className="flex flex-row md:p-10 space-x-6 overflow-x-auto scrollbar-hidden snap-x snap-mandatory"
                >
                    {images.map((image) => (
                        <img
                            key={image.id}
                            data-id={image.id}
                            src={image.src}
                            alt={image.alt}
                            className={`w-32 md:w-36 lg:w-36 h-36 md:h-36 lg:h-36 object-contain rounded-xl border-2 cursor-pointer transition-all duration-300 flex-shrink-0 snap-center ${image.id === mainImageId
                                ? 'opacity-100 brightness-100 border-gray-800 shadow-xl scale-105 z-20'
                                : 'opacity-50 brightness-75 border-gray-200 shadow-md z-10'
                                }`}
                            onClick={() => handleImageClick(image.id)}
                        />
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={scrollLeft}
                        className="bg-gray-200 text-black text-xl md:text-2xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="bg-gray-200 text-black text-xl md:text-2xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;