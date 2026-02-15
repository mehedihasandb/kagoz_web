// components/Notch.tsx
'use client';  // Mark the components as a Client Component

import { useState } from "react";
import styles from "@/styles/modules/ThemePanel.module.css";
import { useTheme } from "@/context/ThemeContext";
import { FaGear, FaGears, FaUserGear } from "react-icons/fa6";
import { FiCommand } from "react-icons/fi";
import { MdOutlineFormatColorFill } from "react-icons/md";

interface ColorOption {
    id: string;
    colors: [string, string];
}

const ThemePanel = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { selectedTheme, setSelectedTheme } = useTheme() // Use the correct hook

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const changeThemeColor = (themeName: string) => {
        setSelectedTheme(themeName);
    };

    const colorOptions: ColorOption[] = [
        { id: "theme-green", colors: ["#1a572b", "#1e9b3d"] },
        { id: "theme-yellow", colors: ["#EDF31D", "#535353"] },
        { id: "theme-dark", colors: ["#595959", "#3d5a5a"] },
    ];

    const themeBg = `bg-${selectedTheme}-bg`;

    return (
        <div className={styles.container}>
            {/* Drawer */}
            <div className={`${styles.drawer} ${drawerOpen ? styles.open : ''}`}>
                <div className={styles.drawerNotch} onClick={toggleDrawer}>
                    {/* Use string template for dynamic Tailwind class */}
                    <span className={themeBg}>
                        {/* <FaGear className="loading-icon" /> */}
                        <MdOutlineFormatColorFill
                            style={{ color: '#f5dcdc', width: '42px', height: '42px' }}
                            className="loading-icon"
                        />
                    </span>
                </div>
                <div className={styles.drawerContent}>
                    <h2>Select a Color</h2>
                    <div className={styles.colorContainer}>
                        {colorOptions.map(option => (
                            <div
                                key={option.id}
                                className={`${styles.colorBox} ${selectedTheme === option.id ? styles.selected : ''}`}
                                onClick={() => changeThemeColor(option.id)}
                                style={{ background: `linear-gradient(to right, ${option.colors[0]} 50%, ${option.colors[1]} 50%)` }}
                            ></div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ThemePanel;
