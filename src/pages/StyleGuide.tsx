import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

export default function StyleGuide() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("topnav");
  const [themeMap, setThemeMap] = useState<{ [key: string]: "light" | "dark" }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const componentsList = [
    { key: "topnav", label: "Top Navigation", color: "#3F842E" },
    { key: "sidenav", label: "Sidebar", color: "#3F842E" },
    { key: "cardDetails", label: "Card Details", color: "#3F842E" },
    { key: "signature", label: "Signature", color: "#3F842E" },
    { key: "buttons", label: "Buttons", color: "#3F842E" },
    { key: "inputs", label: "Inputs", color: "#3F842E" },
    { key: "dropdowns", label: "Dropdowns", color: "#3F842E" },
    { key: "accordions", label: "Accordions", color: "#3F842E" },
    { key: "badges", label: "Badges", color: "#3F842E" },
    { key: "cards", label: "Cards", color: "#3F842E" },
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const comp of componentsList) {
        const section = sectionRefs.current[comp.key];
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveSection(comp.key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    const section = sectionRefs.current[key];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = (key: string) => {
    setThemeMap((prev) => ({
      ...prev,
      [key]: prev[key] === "dark" ? "light" : "dark",
    }));
  };

  const getThemeClasses = (key: string) => {
    return themeMap[key] === "dark"
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-gray-800 border-gray-300";
  };

  const activeComponentLabel = componentsList.find(c => c.key === activeSection)?.label || "";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Internal Sticky Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col sticky top-0 h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-6">Components</h2>
        <div className="flex flex-col gap-2">
          {componentsList.map((comp) => (
            <button
              key={comp.key}
              onClick={() => scrollToSection(comp.key)}
              className={`text-left px-3 py-2 rounded-md font-medium transition
                ${activeSection === comp.key ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              {comp.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Breadcrumb/Header */}
        <div className="sticky top-0 bg-gray-100 z-20 shadow-sm px-8 py-4">
          <p className="text-gray-500 text-sm mb-1">Style Guide / Components</p>
          <h1 className="text-3xl font-bold text-gray-800">{activeComponentLabel}</h1>
          <hr className="border-gray-300 mt-2" />
        </div>

        <div className="p-8">
          {componentsList.map((comp) => (
            <section
              key={comp.key}
              ref={(el) => (sectionRefs.current[comp.key] = el)}
              className="mb-12 scroll-mt-32"
            >
              {/* Section Header with color-coded separator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className="w-16 h-1 rounded mr-2"
                    style={{ backgroundColor: comp.color }}
                  ></div>
                  <h2 className="text-2xl font-semibold">{comp.label}</h2>
                </div>
                {/* Theme Toggle */}
                <button
                  onClick={() => toggleTheme(comp.key)}
                  className="px-3 py-1 text-sm font-medium rounded-md border hover:bg-gray-200 transition"
                >
                  {themeMap[comp.key] === "dark" ? "Light Preview" : "Dark Preview"}
                </button>
              </div>

              <p className="text-gray-600 mb-4">
                Preview of {comp.label} component with responsive behavior.
              </p>

              <div
                className={`border rounded-md p-4 shadow-sm ${getThemeClasses(comp.key)}`}
              >
                {comp.key === "topnav" && <TopNav />}
                {comp.key === "sidenav" && (
                  <div className="flex gap-6 items-start">
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isPreview={true}  onSelect={() => {}}/>
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                      >
                        Toggle Collapse
                      </button>
                      <p>Click to preview Sidebar collapsed/expanded states.</p>
                    </div>
                  </div>
                )}
                {comp.key === "cardDetails" && (
                  <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Card Number" className="border px-3 py-2 rounded-md" />
                    <input type="text" placeholder="Expiry Date" className="border px-3 py-2 rounded-md" />
                    <input type="text" placeholder="CVV" className="border px-3 py-2 rounded-md" />
                  </div>
                )}
                {comp.key === "signature" && (
                  <div className="flex flex-col gap-4">
                    <div className="border p-4 rounded-md">Draw Signature Placeholder</div>
                    <div className="border p-4 rounded-md">Upload Signature Placeholder</div>
                  </div>
                )}
                {comp.key === "buttons" && (
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md">Primary</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Secondary</button>
                    <button className="px-4 py-2 border border-gray-400 rounded-md">Outline</button>
                  </div>
                )}
                {comp.key === "inputs" && (
                  <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Text Input" className="border px-3 py-2 rounded-md" />
                    <input type="email" placeholder="Email Input" className="border px-3 py-2 rounded-md" />
                    <input type="password" placeholder="Password Input" className="border px-3 py-2 rounded-md" />
                  </div>
                )}
                {comp.key === "dropdowns" && (
                  <select className="border px-3 py-2 rounded-md w-full">
                    <option>Select an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                )}
                {comp.key === "accordions" && (
                  <div className="flex flex-col gap-2">
                    <div className="border-b py-2">
                      <button className="w-full text-left font-semibold">Accordion 1</button>
                    </div>
                    <div className="border-b py-2">
                      <button className="w-full text-left font-semibold">Accordion 2</button>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left font-semibold">Accordion 3</button>
                    </div>
                  </div>
                )}
                {comp.key === "badges" && (
                  <div className="flex gap-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">New</span>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">Urgent</span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Info</span>
                  </div>
                )}
                {comp.key === "cards" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Card 1</h3>
                      <p className="text-gray-600">Some dummy content for card 1.</p>
                    </div>
                    <div className="border rounded-md p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Card 2</h3>
                      <p className="text-gray-600">Some dummy content for card 2.</p>
                    </div>
                    <div className="border rounded-md p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Card 3</h3>
                      <p className="text-gray-600">Some dummy content for card 3.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
