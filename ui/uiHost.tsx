"use client";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/Modal/LoginModal";
import { closeLogin, setAuthView } from "@/api/slices/uiSlice";
import { useRouter } from "next/navigation";

export function UIHost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginOpen, redirectPath, authView } = useSelector((s: any) => s.ui);

  return (
    <LoginModal
      isInsertModalOpen={loginOpen}
      redirectPath={redirectPath}
      showRegForm={authView === "register"}
      setShowRegForm={(val: boolean) =>
        dispatch(setAuthView(val ? "register" : "login"))
      }
      handleOk={() => {
        dispatch(closeLogin());
        if (redirectPath) router.push(redirectPath);
      }}
      onCancel={() => dispatch(closeLogin())}
    />
  );
}
