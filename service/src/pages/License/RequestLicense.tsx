import { BreadcrumbItem, Breadcrumbs, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useContext, useEffect, useMemo, useState } from "react"
import { FaEdit, FaHome, FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { IBusiness, IHouse, IRequestLicense } from "../../interfaces"

function RequestLicense() {

    const navigate = useNavigate()
    const { call } = useContext(FrappeContext) as FrappeConfig

    const [isLoading, setIsLoading] = useState(true)
    const [requestLicenses, setRequestLicenses] = useState([] as (IRequestLicense & { business: IBusiness, house_no: IHouse })[])

    const loadRequestLicenses = async () => {
        setIsLoading(true)
        let response = await call.post('maechan.maechan_license.doctype.requestlicense.requestlicense.load_request_licenses')
        setRequestLicenses(response.message)
        setIsLoading(false)
    }

    useEffect(() => {
        loadRequestLicenses()
    }, [])


    const topContent = useMemo(() => {

        return (
            <div className="flex flex-row justify-between gap-3">
                <div></div>
                <Button className="" onClick={() => navigate("/licenseRequest/create")}
                    color="primary" endContent={<FaPlus />}>เพิ่มคำร้องใบอนุญาต</Button>
            </div>
        )
    }, [])

    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><Link to={"/"}><FaHome /></Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={'/licenseRequest'}>คำร้องขอใบอนุญาต</Link></BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                รายการคำร้องขอใบอนุญาต
            </div>

            <div className="flex flex-col">
                <Table isStriped shadow="none"
                    topContent={topContent}
                    topContentPlacement="outside"
                    classNames={{
                        wrapper: 'p-0'
                    }}
                >
                    <TableHeader>
                        <TableColumn>ประเภทคำร้อง</TableColumn>
                        <TableColumn>กิจการ</TableColumn>
                        <TableColumn>ที่อยู่</TableColumn>
                        <TableColumn>สถานะ</TableColumn>
                        <TableColumn>การกระทำ</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {
                            requestLicenses.map(x => (
                                <TableRow key="1">
                                    <TableCell>{x.request_type}</TableCell>
                                    <TableCell>{x.business.business_name}</TableCell>
                                    <TableCell>{x.house_no.text_display}</TableCell>
                                    <TableCell>{x.request_status}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-row w-fit gap-2">
                                            <Tooltip placement="top" content="แก้ไข" aria-label="แก้ไข" >
                                                <span
                                                    onClick={() => { navigate(`/licenseRequest/${x.name}/edit`) }}
                                                    className="text-lg cursor-pointer active:opacity-50">
                                                    <FaEdit />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>

                </Table>

            </div>
        </div>

    )
}

export default RequestLicense