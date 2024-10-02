"use client";
import Link from "next/link";
import React, {useState} from "react";

const Header = () => {
  const pages = [
    {name: "Home", href: "/"},
    {name: "Events", href: "/events"},
    // {
    //   name: "Blog",
    //   href: "/blog",
    //   subPages: [
    //     {name: "Blog 1", href: "/blog/1"},
    //     {name: "Blog 2", href: "/blog/2"},
    //     {name: "Blog 3", href: "/blog/3"},
    //   ],
    // },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  return (
    <header>
      <nav className="flex justify-around">
        <h1>Site Header</h1>
        <ul className="flex gap-5">
          {pages.map((page, index) => (
            <li key={page.href}>
              <div
                onMouseEnter={() => toggleDropdown(index)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link href={page.href}>{page.name}</Link>
                {page.subPages && (
                  <ul
                    style={{
                      display: dropdownOpen === index ? "block" : "none",
                      position: "absolute",
                      background: "lightgray",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {page.subPages.map((subPage) => (
                      <li key={subPage.href}>
                        <Link href={subPage.href}>{subPage.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
