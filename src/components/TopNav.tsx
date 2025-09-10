import { useState } from "react";
import { Menu, Dropdown, Avatar, Drawer, Button } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

export default function TopNav() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const items = [
        { key: "NewApplications", label: "New Applications" },
        { key: "Applications", label: "Applications" },
        { key: "Proxies", label: "Proxies" },
        { key: "Transactions", label: "Transactions" },
        { key: "SpecieInfo", label: "Specie Info" },
    ];

    return (
        <nav className="sticky top-0 w-full bg-[#3F842E] text-white shadow-md z-50">
            <div className="flex items-center justify-between px-4 md:px-8 h-16">
                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 justify-center">
                    <Menu
                        mode="horizontal"
                        items={items}
                        defaultSelectedKeys={["home"]}
                        className="bg-transparent flex-1 justify-center border-none
                        [&>.ant-menu-item]:!text-white
                        [&>.ant-menu-item]:!font-bold
                        [&>.ant-menu-item:hover]:!text-gray-300
                        [&>.ant-menu-item::after]:!hidden
                        [&>.ant-menu-item-selected::after]:!hidden"
                    />
                </div>

                {/* Desktop Profile */}
                <div className="hidden md:flex items-center space-x-2">
                        <Dropdown
                            menu={{
                                items: [
                                    { key: "1", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Profile</span> },
                                    { key: "2", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Settings</span> },
                                    { key: "3", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Logout</span> },
                                ],
                            }}
                            placement="bottomLeft"
                            trigger={["click"]}
                        >
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <span className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Hello, Kagiso</span>
                                <Avatar size="large" icon={<UserOutlined />} />
                            </div>
                        </Dropdown>
                </div>

                {/* Mobile Hamburger */}
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
                     styles={{ body: { padding: 0, backgroundColor: "#3F842E" } }}
                >
                    <div className="flex flex-col p-4 space-y-4">
                        {items.map((item) => (
                            <a
                                key={item.key}
                                href="#"
                                className="text-white font-bold text-xs transition"
                                onClick={() => setDrawerOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="border-t border-white/50 my-2"></div>
                        <div className="text-xs">

                        </div>
                        <Dropdown
                            menu={{
                                items: [
                                    { key: "1", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Profile</span> },
                                    { key: "2", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Settings</span> },
                                    { key: "3", label: <span className="text-xs font-sans" style={{ fontFamily: "Inter, sans-serif" }}>Logout</span> },
                                ],
                            }}
                            placement="bottomLeft"
                            trigger={["click"]}
                        >
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <span className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Hello, Kagiso</span>
                                <Avatar size="small" icon={<UserOutlined />} />
                            </div>
                        </Dropdown>

                    </div>
                </Drawer>
            </div>
        </nav>
    );
}
