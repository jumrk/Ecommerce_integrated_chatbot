import { useState, useEffect } from 'react';

const useLocationApi = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(false);

    // Lấy danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/p/');
            const data = await response.json();
            setProvinces(data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    // Lấy danh sách quận/huyện theo tỉnh
    const fetchDistricts = async (provinceCode) => {
        if (!provinceCode) {
            setDistricts([]);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            const data = await response.json();
            setDistricts(data.districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
        setLoading(false);
    };

    // Lấy danh sách phường/xã theo quận/huyện
    const fetchWards = async (districtCode) => {
        if (!districtCode) {
            setWards([]);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            const data = await response.json();
            setWards(data.wards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    return {
        provinces,
        districts,
        wards,
        loading,
        fetchDistricts,
        fetchWards
    };
};

export default useLocationApi;