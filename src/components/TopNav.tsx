import { useState } from "react";
import { Menu, Dropdown, Avatar, Drawer, Button } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const allItems = [
    { key: "new-applications", label: "New Applications", path: "/dashboard/new-applications" },
    { key: "applications", label: "Applications", path: "/dashboard/applications" },
    { key: "proxies", label: "Proxies", path: "/dashboard/proxies" },
    { key: "transactions", label: "Transactions", path: "/dashboard/transactions" },
    { key: "specie-info", label: "Specie Info", path: "/dashboard/specie-info" },

  ];


  const role = "user" as "admin" | "user";

  const items = allItems.filter(
    (item) => !(role === "admin" && item.key === "new-applications")
  );


  return (
    <nav className="sticky top-0 w-full bg-[#3F842E] text-white shadow-md z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">


        <div className="hidden md:flex flex-1 justify-center">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname.split("/")[2]]}
            onClick={(e) => {
              const item = items.find((i) => i.key === e.key);
              if (item) navigate(item.path);
            }}
            items={items.map((item) => ({
              key: item.key,
              label: item.label,
            }))}
            className="bg-transparent flex-1 justify-center border-none
              [&>.ant-menu-item]:!text-white
              [&>.ant-menu-item]:!font-bold
              [&>.ant-menu-item:hover]:!text-gray-300
              [&>.ant-menu-item::after]:!hidden
              [&>.ant-menu-item-selected::after]:!hidden
              transition-all duration-300"
          />
        </div>


        <div className="hidden md:flex items-center space-x-2">
          <Dropdown
            menu={{
              items: [
                { key: "1", label: <span className="text-xs font-sans">Profile</span> },
                { key: "2", label: <span className="text-xs font-sans">Settings</span> },
                { key: "3", label: <span className="text-xs font-sans">Logout</span> },
              ],
            }}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-semibold text-white">Hello, Kagiso</span>
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>


        <div className="md:hidden ml-auto">
          <Button
            type="text"
            icon={<MenuOutlined className="text-white text-2xl" />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>

        <Drawer
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0, backgroundColor: "#3F842E" }}
        >
          <div className="flex flex-col p-4 space-y-4">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                className="text-white font-bold text-xs text-left"
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-white/50 my-2"></div>

            <Dropdown
              menu={{
                items: [
                  { key: "1", label: <span className="text-xs font-sans">Profile</span> },
                  { key: "2", label: <span className="text-xs font-sans">Settings</span> },
                  { key: "3", label: <span className="text-xs font-sans">Logout</span> },
                ],
              }}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-sm font-semibold text-white">Hello, Kagiso</span>
                <Avatar size="small" icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Drawer>
      </div>
    </nav>
  );
}
