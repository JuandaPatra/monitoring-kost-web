import Head from "next/head";
import Banner from "../Home/Banner";
import { SidebarLayout } from "../Sidebar";
import BreadcrumbComponent from "../Breadcrumb";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Dashboard Kost</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex ">
        <SidebarLayout />
        <div className="flex-grow">
          <div className=" min-h-screen">
            <BreadcrumbComponent />
            {children}
            {/* <Banner /> */}
            {/* <div className="container mx-auto">{children}</div> */}
          </div>
        </div>
      </div>
    </>
  );
};
