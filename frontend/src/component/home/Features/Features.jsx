import BestSelling from "./BestSelling";
import Categories from "./Categories";
import CustomerReviews from "../CustomerReviews";
import DiscountedProducts from "./DiscountedProducts";
import FashionBlog from "../FashionBlog";
import PersonalizedSuggestions from "./PersonalizedSuggestions";
import { FadeInWhenVisible } from "../../animation/FadeInWhenVisible";
const Features = () => {
    const isLoggedIn = false;
    return (
        <section className="py-12 bg-gray-100">
            <FadeInWhenVisible direction='up' delay={0.2}>
                <div className="w-full h-20 text-base md:text-xl lg:text-2xl font-bold bg-black flex justify-center items-center text-white">
                    <FadeInWhenVisible direction='up' delay={0.3}>
                        DANH MỤC SẢN PHẨM
                    </FadeInWhenVisible>
                </div>
            </FadeInWhenVisible>
            <Categories />
            <BestSelling />
            <DiscountedProducts />
            <PersonalizedSuggestions isLoggedIn={isLoggedIn} />
            <FashionBlog />
            <CustomerReviews />
        </section>
    );
};

export default Features;