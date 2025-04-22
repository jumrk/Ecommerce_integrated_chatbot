// src/hooks/useNearestShipper.js
import { useEffect, useState } from "react";
import { getAllShippers } from "../api/shipper/shipperSevice";
import { getAddressParamsAPI } from "../api/address/addressAPI";

export const useNearestShipper = (addressId) => {
    const [shipperId, setShipperId] = useState(null);
    const [loadingShiper, setLoadingShiper] = useState(false);

    useEffect(() => {
        const fetchNearestShipper = async () => {
            if (!addressId) return;

            setLoadingShiper(true);
            try {
                const addressRes = await getAddressParamsAPI(addressId);
                const addressData = addressRes.data;

                const shipperRes = await getAllShippers();
                const shippers = shipperRes.shippers;

                const matchedShipper = shippers.find(
                    (s) =>
                        s.status === "active" &&
                        s.province === addressData.province &&
                        s.district === addressData.district
                );

                setLoadingShiper(false);
                setShipperId(matchedShipper ? matchedShipper._id : null);
            } catch (err) {
                console.error("Lỗi tìm shipper:", err);
                setShipperId(null);
            }
        };

        fetchNearestShipper();
    }, [addressId]);

    return { shipperId, loadingShiper };
};
