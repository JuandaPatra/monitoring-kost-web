import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export function SidebarLayout() {
  const router = useRouter();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    // Update the activePath whenever the route changes
    setActivePath(router.pathname);
  }, [router.pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return activePath === "/";
    }
    // For other paths, use startsWith for dynamic and nested routes
    return activePath === path || activePath.startsWith(path + "/");
  };
  return (
    <div className="">


      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="h-full"
        collapsed={false}
      >
        <h1 className=" font-semibold text-3xl text-cyan-800 pl-3">
          ADMIN PAGE
        </h1>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie} active={isActive("/")}>
              Home
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Dashboard" open={router.pathname.startsWith("/dashboard") || router.pathname == "/dashboard"}  >
              <Sidebar.Item href={"/dashboard"} active={isActive("/dashboard")}>Linktree Page</Sidebar.Item>
              <Sidebar.Item href={"/dashboard/socmed"} active={isActive("/dashboard/socmed")}>Socmed</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href={"/kosts"} active={isActive("/kosts")} icon={HiInbox}>
              Kost
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
