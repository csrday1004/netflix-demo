import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(3)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      navigate(`/`);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <br/>
        <p>{time}초 후 메인페이지로 이동합니다.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
