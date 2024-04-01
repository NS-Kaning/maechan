import { Avatar, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Skeleton, Link, ButtonProps } from "@nextui-org/react"
import { FrappeContext, useFrappeAuth, useFrappeGetCall } from "frappe-react-sdk";
import { PropsWithChildren, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FaBuilding, FaHome } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";

function AppSidebarButton(props: PropsWithChildren<ButtonProps>) {

    const { size, className, children } = props
    const location = useLocation()
    const navigate = useNavigate()

    let _className = "mb-1 justify-start w-full leading-3" + className
    let _size = size ?? 'md'
    let _startContent = props.startContent ?? null
    let _href = props.href ?? null

    let isActive = _href == location.pathname

    // console.log('isactive',isActive)
    let _variant = isActive ? "solid" : props.variant ?? 'light'
    let _color = isActive ? "primary" : "default"

    let _onClick = props.onClick ?? (() => {
        if (_href) {
            navigate(_href)
        }

    })


    return (
        <Button
            color={_color}
            variant={_variant}
            size={_size}
            className={_className}
            onClick={_onClick}
            startContent={_startContent}

        >
            {children}
        </Button>
    )
}

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
        <Navbar isBordered maxWidth="xl" classNames={{ wrapper: "p-1 md:p-6" }}>
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
            <div className="flex px-1 lg:px-0 lg:justify-center w-full">
                <div className="flex flex-col w-full lg:flex-row lg:w-[1280px] lg:px-6 mt-3">
                    <div className="mb-3 lg:mb-0 lg:w-[280px] w-full">
                        <ul>
                            <li>
                                <AppSidebarButton href="/" startContent={<FaHome />}>หน้าหลัก</AppSidebarButton>
                            </li>
                            <li>
                                <AppSidebarButton href="/business" startContent={<FaBuilding />}>กิจการของท่าน</AppSidebarButton>
                                <ul className="ml-6">
                                    <li>
                                        <AppSidebarButton href="/business/create">เพิ่มกิจการ</AppSidebarButton>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <AppSidebarButton href="/license" startContent={<FaFileLines />}>ใบอนุญาต</AppSidebarButton>
                            </li>


                        </ul>
                    </div>
                    <div className="lg:pl-3 lg:ml-3 p-3 lg:w-full border-1 lg:min-h-[600px] rounded-md">
                        <Outlet />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MainPage