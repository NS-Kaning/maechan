import { Avatar, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Skeleton, Link } from "@nextui-org/react"
import { FrappeContext, useFrappeAuth, useFrappeGetCall } from "frappe-react-sdk";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


function AppNavbarBrand() {

    const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall(
        "maechan.maechan.api.get_application_context", {}
    )


    return (
        <NavbarBrand>
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <Image
                    classNames={{ 'wrapper': 'mr-1' }}
                    height={40} width={40} src={`${import.meta.env.VITE_FRAPPE_URL}/${data?.message?.app_logo}`} />
            </Skeleton>

            <Skeleton isLoaded={!isLoading} className="rounded-lg w-[10rem]" >
                <p className="font-bold text-inherit">{data?.message?.app_name ?? ''}</p>
            </Skeleton>
        </NavbarBrand>
    )
}

function AppNavbar() {

    const auth = useFrappeAuth()

    const navigate = useNavigate()

    const doLogout = async () => {
        try {
            await auth.logout()
        } catch (error) {
            console.log("doLogout error", error)
        }

        navigate("/")

    }

    return (
        <Navbar isBordered maxWidth="xl">
            <AppNavbarBrand />
            <Skeleton isLoaded={!auth.isLoading} className="rounded-full">
                {auth.currentUser ? (
                    <Dropdown placement="bottom-end">

                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                name={auth.currentUser} classNames={{
                                    name: 'font-bold select-none',
                                    base: 'bg-success/30 text-green-800 cursor-default',
                                }} />
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem onClick={doLogout} key="logout">ออกจากระบบ</DropdownItem>

                        </DropdownMenu>

                    </Dropdown>
                ) : (
                    null
                )}

            </Skeleton>

        </Navbar>
    )
}

function MainPage() {


    const navigate = useNavigate();

    return (
        <div>
            <AppNavbar />
            <div className="flex  flex-row items-center justify-center">
                <div className="px-6 py-3 max-w-[1280px] lg:w-[1280px] self-center grid lg:grid-cols-12 grid-cols-1 gap-4">
                    <div className="lg:col-span-2 ">
                        <ul className="cursor-default">
                            <li className="mb-3">
                                <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
                                    <Link color="foreground" onClick={() => navigate("/")}>หน้าหลัก</Link>
                                </h5>
                            </li>
                            <li className="mb-3">
                                <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">กิจการ</h5>
                                <ul className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                                    <li>
                                        <Link onClick={() => navigate("/business")}
                                            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                            color="foreground">
                                            กิจการของท่าน
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">ใบอนุญาต</h5>
                                <ul className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                                    <li>
                                        <Link onClick={() => navigate("/license/create")}
                                            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                            color="foreground">
                                            ยื่นคำร้องขอใบอนุญาตใหม่
                                        </Link>

                                        <Link onClick={() => navigate("/license/create")}
                                            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                            color="foreground">
                                            ตรวจสอบรายการยื่นคำร้อง
                                        </Link>
                                        <Link onClick={() => navigate("/license/create")}
                                            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                            color="foreground">
                                            รายการใบอนุญาต
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage