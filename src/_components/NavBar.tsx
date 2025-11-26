/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useLanguageStore, {
  useBooleanValue,
  useUserDataStore,
} from "~/APIs/store";
import { cn } from "~/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import Spinner from "~/_components/Spinner";
import Switch from "~/_components/Switch";
import { RiHomeSmileFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogin } from "react-icons/tb";
import { useTranslation } from "~/hooks/useTranslatoins";

interface NavBarLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  small: boolean;
  url: string;
  onClick?: () => void;
}

const NavBarLink = ({
  onClick,
  href,
  icon: Icon,
  label,
  small,
  url,
}: NavBarLinkProps) => {
  const isActive = url === href;
  return (
    <li>
      <Link
        onClick={onClick}
        className={`flex ${small ? "w-[40px] px-2.5" : ""} text-md group m-4 items-center gap-x-3.5 rounded-lg py-2 font-sans font-semibold text-textSecondary hover:bg-bgSecondary hover:text-primary`}
        href={href}
      >
        <Icon
          className={`h-10 w-10 ${small ? "" : "pl-4"} ${
            isActive
              ? `${small ? "" : "border-l-2"} border-primary text-primary`
              : ""
          }`}
        />
        {!small && (
          <p className={`translate-y-0.5 ${isActive ? "text-primary" : ""}`}>
            {label}
          </p>
        )}
      </Link>
    </li>
  );
};

const NavBar = () => {
  const toggleNav = useBooleanValue((state) => state.toggle);
  const [profile, setProfile] = useState(false);
  const toggleProfile = () => {
    setProfile(!profile);
  };
  const [isClient, setIsClient] = useState(false);
  const userData = useUserDataStore.getState().userData;
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { theme, setTheme } = useTheme();
  const url = usePathname();
  const [small, setSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbarSmall = () => {
    setSmall(!small);
    toggleNav();
  };

  const navbarRef = useRef<HTMLDivElement>(null);
  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const OpenSideBar = () => {
    setIsOpen(!isOpen);
  };

  const { language, setLanguage } = useLanguageStore() as {
    language: string;
    setLanguage: (lang: string) => void;
  };
  const [isOpenL, setIsOpenL] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenL(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { t } = useTranslation();

  const navLinks = [
    { href: "/", icon: RiHomeSmileFill, label: t("dashboard") },
    { href: "/settings", icon: IoSettingsOutline, label: t("settings") },
    { href: "/login", icon: TbLogin, label: t("logout") },
  ];

  if (!isClient)
    return (
      <div className="absolute left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-bgPrimary">
        <Spinner />
      </div>
    );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40"
          onClick={toggleNavbar}
        ></div>
      )}
      <header dir={language === "ar" ? "rtl" : "ltr"} ref={navbarRef}>
        <div >
          <header
            dir={language === "ar" ? "rtl" : "ltr"}
            className={`sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap bg-bgPrimary py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4`}
          >
            <nav
              className="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="me-5 lg:me-0 lg:hidden">
                <Link
                  className="inline-block min-w-20 max-w-40 flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
                  href="/"
                  aria-label="Preline"
                >
                  <img src="/images/innovix.png" alt="#" />
                </Link>
              </div>
              <div className="ms-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
                <div className="hidden sm:block"></div>

                <div className="flex flex-row items-center justify-end gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex min-h-12 min-w-12 items-center gap-2 rounded-md p-2 hover:bg-bgSecondary"
                      onClick={() => setIsOpenL(!isOpenL)}
                    >
                      <span>
                        {language === "en" ? (
                          <img
                            src="/images/en.png"
                            className="h-6 w-6"
                            alt="#"
                          />
                        ) : (
                          <img
                            src="/images/ar.png"
                            className="h-6 w-6"
                            alt="#"
                          />
                        )}
                      </span>
                      <IoIosArrowDown className="size-3 text-textSecondary" />
                    </button>

                    {isOpenL && (
                      <div
                        className={`absolute ${language == "ar" ? "-right-10" : "right-0"} mt-2 w-28 rounded-md border bg-bgPrimary shadow-lg`}
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsOpenL(false);
                            }}
                            className={`flex w-full items-center justify-between gap-1 px-4 py-2 text-left hover:bg-bgSecondary ${
                              language === lang.code ? "bg-bgSecondary" : ""
                            }`}
                          >
                            {lang.label}
                            <img
                              src={`/images/${lang.code}.png`}
                              className="h-5 w-5"
                              alt="#"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Switch theme={theme || "light"} setTheme={setTheme} />
                  {/* notifications  */}
                  {/* <div className="relative">
                    <Link href="/notifies">
                      <IoMdNotificationsOutline className="size-6 text-textSecondary" />
                    </Link>
                  </div> */}
                  <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button
                          onClick={toggleProfile}
                          className="focus-none focus-none hover:bg-thead relative flex items-center rounded-full p-1 text-sm font-semibold text-gray-800"
                        >
                          <img
                            className="h-8 w-8 rounded-full ring-bgSecondary"
                            src={"/images/user.png"}
                            alt="User Avatar"
                          />
                        </button>
                      </DropdownMenu.Trigger>

                      {profile && (
                        <DropdownMenu.Content
                          className={`fixed text-textPrimary ${language == "ar" ? "" : "right-[20px]"} top-[20px] min-w-60 rounded-lg bg-bgPrimary p-2 shadow-md`}
                          aria-labelledby="hs-dropdown-with-header"
                          align="end"
                          sideOffset={5}
                        >
                          <div className="rounded-t-lg bg-bgPrimary px-5 py-3">
                            <p className="text-sm text-textPrimary">
                              {t("signedInAs")}
                            </p>
                            <p className="text-sm font-medium text-textPrimary">
                              {userData?.email}
                            </p>
                          </div>
                          <div className="mt-2 py-2">
                            <DropdownMenu.Item asChild>
                              <Link
                                className="flex items-center gap-x-3.5 rounded-lg border-none px-3 py-2 text-sm text-textPrimary outline-none hover:bg-bgSecondary"
                                href="/profile"
                              >
                                <svg
                                  className="h-4 w-4 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                {t("profile")}
                              </Link>
                            </DropdownMenu.Item>
                          </div>
                        </DropdownMenu.Content>
                      )}
                    </DropdownMenu.Root>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div className="border-borderPrimary sticky inset-x-0 top-0 z-20 border-y bg-bgPrimary px-4 sm:px-6 md:px-8 lg:hidden">
            <div className="flex items-center justify-between py-2">
              <ol className="ms-3 flex items-center whitespace-nowrap">
                <li className="flex items-center text-sm text-textPrimary">
                  {/* Breadcrumb or other content */}
                </li>
              </ol>

              <button
                onClick={OpenSideBar}
                type="button"
                className="border-borderPrimary flex items-center justify-center gap-x-1.5 rounded-lg border px-3 py-2 text-xs text-gray-500 hover:text-gray-600"
                data-hs-overlay="#application-sidebar"
                aria-controls="application-sidebar"
                aria-label="Sidebar"
              >
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
                </svg>
                <span className="sr-only">Sidebar</span>
              </button>
            </div>
          </div>

          <div
            id="application-sidebar"
            className={cn(
              "fixed inset-y-0 z-[60] transform bg-bgPrimary transition-all duration-300 ease-in lg:bottom-0 lg:end-auto lg:block",
              small ? "w-[90px]" : "w-[240px]",
              language === "ar" ? "end-0" : "start-0",
              small ? "" : "overflow-y-auto",
              "drop-shadow-2xl lg:drop-shadow-none",
              language === "ar"
                ? isOpen
                  ? "max-lg:translate-x-0"
                  : "max-lg:translate-x-full"
                : isOpen
                  ? "max-lg:translate-x-0"
                  : "max-lg:-translate-x-full",
            )}
          >
            <div className="px-8 pt-4">
              <Link href="/">
                {small ? (
                  <img
                    className="mt-5 w-10 scale-[2]"
                    src="/images/innovix.png"
                    alt="Logo"
                  />
                ) : (
                  <img className="w-26" src="/images/innovix.png" alt="Logo" />
                )}
              </Link>
            </div>
            <nav
              className={`hs-accordion-group flex w-full flex-col flex-wrap ${small ? "p-6" : ""}`}
              data-hs-accordion-always-open
            >
              <ul className="space-y-1.5">
                <div
                  className={`flex ${small ? "w-[40px]" : ""} justify-center`}
                >
                  {small && (
                    <button onClick={toggleNavbarSmall}>
                      <svg
                        className="h-6 w-6 text-textPrimary"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  )}
                </div>
                {navLinks.map((link) => (
                  <NavBarLink
                    onClick={() => setIsOpen(false)}
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    small={small}
                    url={url}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
