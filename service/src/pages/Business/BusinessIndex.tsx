import { BreadcrumbItem, Breadcrumbs, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useContext, useEffect, useState } from "react"
import { useAlertContext } from "../../providers/AlertProvider"
import { FaHome } from "react-icons/fa"

function BusinessIndex() {

    const [businesses, setBusinesses] = useState([])
    const { call } = useContext(FrappeContext) as FrappeConfig
    const alert = useAlertContext()
    const loadBusiness = async () => {
        try {
            let result = await call.post('maechan.maechan_license.doctype.business.business.get_businesses')
            console.log(result)
            setBusinesses(result.message)
        } catch (error) {
            console.log(error)
            alert.showError(JSON.stringify(error))



        }


    }

    useEffect(() => {
        loadBusiness()
    }, [])

    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><FaHome /></BreadcrumbItem>

                <BreadcrumbItem>กิจการของท่าน</BreadcrumbItem>
                <BreadcrumbItem>รายการกิจการ</BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                รายการกิจการของท่าน
            </div>

            <div className="flex flex-row w-full text-xl mb-3">
                <Table isStriped shadow="none" aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>ชื่อกิจการ</TableColumn>
                        <TableColumn>ที่อยู่</TableColumn>

                    </TableHeader>

                    <TableBody emptyContent={"No rows to display."}>
                        {
                            businesses.map(b => (
                                <TableRow key={b.name}>
                                    <TableCell>{b.business_name}</TableCell>
                                    <TableCell>{b.business_address_text_display}</TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-row w-full mb-3">
                หากต้องการลบให้ติดต่อผู้ดูแลระบบ
            </div>



        </div>
    )
}

export default BusinessIndex