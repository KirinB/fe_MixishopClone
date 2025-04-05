import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pathDefault } from "../common/path";
import axios from "axios";

const useCheckPermission = () => {
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(null); // Ban đầu là null để chờ API

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const checkPermission = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8397/api/v1/auth/check-permission",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHasPermission(true);
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền:", error);
        navigate(pathDefault.homePage);
      }
    };

    checkPermission();
  }, [token, navigate]);

  return hasPermission;
};

export default useCheckPermission;
