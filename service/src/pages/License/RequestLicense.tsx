import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

function RequestLicense() {
    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><Link to={"/"}><FaHome /></Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={'/licenseRequest'}>คำร้องขอใบอนุญาต</Link></BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                รายการคำร้องขอใบอนุญาต
            </div>

            <div className="grid grid-cols-3">
                <div>

                </div>
            </div>


        </div>

    )
}

export default RequestLicense