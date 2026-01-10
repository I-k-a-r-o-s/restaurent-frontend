import { useEffect, useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";

const ThemeSelector = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const themeList = ["light", "dark", "cupcake", "retro", "coffee"];

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeName = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Theme";
  };

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 rounded-full lg:rounded-none"
      >
        <p className="hidden lg:block">{themeName(theme)}</p>
        <IoColorPaletteOutline size={25} />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
      >
        {themeList.map((theme, key) => (
          <li key={key}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={themeName(theme)}
              value={theme}
              onClick={(e) => setTheme(e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ThemeSelector;
