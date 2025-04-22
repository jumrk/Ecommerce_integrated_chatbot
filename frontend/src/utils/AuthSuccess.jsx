import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, removeToken } from "./storage";
export const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            setToken(token);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-72 h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out]" />
            </div>
            <style>
                {`
                    @keyframes progress {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                `}
            </style>
        </div>
    );
};
export const LoginAdmin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/admin/dashboard");
        }, 2000);
    }, []);
    return (<div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-72 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out]" />
        </div>
        <style>
            {`
            @keyframes progress {
                from { width: 0%; }
                to { width: 100%; }
            }
        `}
        </style>
    </div>
    )
}

export const LogoutSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        removeToken();
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, []);
    return (<div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-72 h-5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out]" />
        </div>
        <style>
            {`
            @keyframes progress {
                from { width: 0%; }
                to { width: 100%; }
            }
        `}
        </style>
    </div>
    )
}