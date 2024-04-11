import { BreadcrumbItem, Breadcrumbs, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useContext, useEffect, useMemo, useState } from "react"
import { FaEdit, FaFileImage, FaHome, FaPlus, FaReceipt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { Doctype, IBusiness, IHouse, IRequestLicense } from "../../interfaces"
import { FaFileImport, FaMagnifyingGlass } from "react-icons/fa6"

function RequestLicense() {

    const navigate = useNavigate()
    const { call } = useContext(FrappeContext) as FrappeConfig

    const [isLoading, setIsLoading] = useState(true)
    const [requestLicenses, setRequestLicenses] = useState([] as (IRequestLicense & { business: IBusiness, house_no: IHouse })[])
    const [appointments, setAppointments] = useState({} as any)

    const loadRequestLicenses = async () => {
        setIsLoading(true)
        let response = await call.post('maechan.maechan_license.doctype.requestlicense.requestlicense.load_request_licenses')
        setRequestLicenses(response.message)
        setAppointments(response.appointment)
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

    const getDocStatus = (doc: IRequestLicense) => {
        if (doc.docstatus == 0) {
            if (doc.request_status == 'รอตรวจสถานที่') {
                return (
                    <div>
                        <div>{doc.request_status}</div>
                    </div>
                )
            }
            return doc.request_status
        } else if (doc.docstatus == 1) {
            return `${doc.request_status} (สำเร็จ)`
        } else {
            return `ยกเลิก`
        }

    }

    const getDocComment = (doc: IRequestLicense) => {
        if (doc.docstatus == 0) {
            if (doc.request_status == 'เอกสารไม่ครบ') {
                return (
                    <>
                    {doc.comment}
                    </>
                )
            }
            if (doc.request_status == 'รอตรวจสถานที่') {
                return (
                    <div>
                        <div>
                            {appointments[doc.name].map((a, i) => (
                                <ul key={a.name}>
                                    <li>
                                        <div>ครั้งที่ {i + 1} </div>
                                        <div>วันที่ {a.checklist_date}</div>
                                        <div>ผลการตรวจ : {a.checklist_result} </div>
                                    </li>
                                </ul>
                            ))}
                        </div>

                    </div>
                )
            } else if (doc.request_status == 'รอชำระเงิน') {
                return (
                    <div>ค่าธรรมเนียม {doc.license_fee} บาท</div>
                )
            }
            return null
        }
        return null;

    }

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
                    aria-label="รายการคำร้องใบอนุญาต"
                >
                    <TableHeader>
                        <TableColumn>คำร้อง</TableColumn>
                        <TableColumn>ที่อยู่</TableColumn>
                        <TableColumn>สถานะ</TableColumn>
                        <TableColumn>หมายเหตุ</TableColumn>
                        <TableColumn>การกระทำ</TableColumn>
                    </TableHeader>
                    <TableBody>

                        {
                            requestLicenses.map(x => (
                                <TableRow key={x.name}>
                                    <TableCell>
                                        <div>
                                            <div className="font-bold">{x.business.business_name}</div>
                                            <div>{x.request_type}</div>
                                        </div>
                                    </TableCell>

                                    <TableCell>{x.house_no.text_display}</TableCell>
                                    <TableCell>{getDocStatus(x)}</TableCell>
                                    <TableCell>{getDocComment(x)}</TableCell>
                                    <TableCell >
                                        <div className="flex flex-row gap-1 justify-center">
                                            {
                                                x.docstatus == 0 && ["รอชำระเงิน"].indexOf(x.request_status) >= 0 ?
                                                    (
                                                        <Tooltip placement="top" content="อัพโหลดหลักฐานการชำระเงิน" aria-label="อัพโหลดหลักฐานการชำระเงิน" >
                                                            <span
                                                                onClick={() => { navigate(`/licenseRequest/${x.name}/payment`) }}
                                                                className="text-lg cursor-pointer active:opacity-50">
                                                                <FaFileImport />
                                                            </span>
                                                        </Tooltip>
                                                    ) : (null)
                                            }
                                            {
                                                x.docstatus == 0 && ["เอกสารไม่ครบ", "สร้าง", "ไม่ผ่าน"].indexOf(x.request_status) >= 0 ?
                                                    (
                                                        <Tooltip placement="top" content="แก้ไข" aria-label="แก้ไข" >
                                                            <span
                                                                onClick={() => { navigate(`/licenseRequest/${x.name}/edit`) }}
                                                                className="text-lg cursor-pointer active:opacity-50">
                                                                <FaEdit />
                                                            </span>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip placement="top" content="ดู" aria-label="ดู" >
                                                            <span
                                                                onClick={() => { navigate(`/licenseRequest/${x.name}/view`) }}
                                                                className="text-lg cursor-pointer active:opacity-50">
                                                                <FaMagnifyingGlass />
                                                            </span>
                                                        </Tooltip>
                                                    )


                                            }



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