import Head from "next/head";
import Banner from "../Home/Banner";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Dashboard Kost</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-gray-100 min-h-screen">
      {/* <Banner /> */}
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  );
};
