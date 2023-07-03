import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { SignUpPage } from "../auth/pages/SignUpPage";
import { useUserStore } from "../hooks";
import { useEffect, useState } from "react";

export const AppRouter = () => {
  const [authStatus, setAuthStatus] = useState("not-authenticated");
  const { activeUser } = useUserStore();

  useEffect(() => {
    if (activeUser !== null) {
      setAuthStatus("authenticated");
    } else {
      setAuthStatus("not-authenticated");
    }
  }, [activeUser]);

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </>
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
