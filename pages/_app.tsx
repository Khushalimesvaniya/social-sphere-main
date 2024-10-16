import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import Layout from "../components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import GenerateModal from "@/components/modals/GenerateModal";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSplashScreenLoaded = () => {
    setIsLoading(false);
  };

  return (
    isLoading ? (
      <SplashScreen onLoaded={handleSplashScreenLoaded} />
    ) : (
      <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      {/* <GenerateModal/> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    ));
}
