import { useState } from "react";

const useShowMore = (items, initialCount) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const visibleItems = items.slice(0, visibleCount);

    const showMore = visibleCount < items.length;

    const toggleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, items.length));
    };

    return { visibleItems, showMore, toggleShowMore };
};

export default useShowMore;
