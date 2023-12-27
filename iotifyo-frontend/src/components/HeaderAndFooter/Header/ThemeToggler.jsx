import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div
            aria-label='theme toggler'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{ cursor: 'pointer', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {theme === "dark" ? (
                // Light theme image (for when the current theme is dark)
                <img
                    src="icons/sunny-day.png"
                    alt="Light Theme"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            ) : (
                // Dark theme image (for when the current theme is light)
                <img
                    src="icons/moon.png"
                    alt="Dark Theme"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            )}
        </div>
    );
};

export default ThemeToggler;
