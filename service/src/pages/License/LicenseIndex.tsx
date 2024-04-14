import { BreadcrumbItem, Breadcrumbs, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useContext, useMemo } from "react";
import { FaEdit, FaFileDownload, FaFileImport, FaHome, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAlertContext } from "../../providers/AlertProvider";
import { FrappeContext, FrappeConfig, useSWR } from "frappe-react-sdk";

export default function LicenseIndex() {

    const siteName = import.meta.env.VITE_FRAPPE_URL ?? window.origin
    const navigate = useNavigate()
    const alert = useAlertContext()
    const { call } = useContext(FrappeContext) as FrappeConfig
    const fetcher = (url: any) => call.post(url).then((res) => res);

    const { data, error, isLoading } = useSWR(
        "maechan.maechan_license.doctype.license.license.load_licenses",
        fetcher
    );

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-row justify-between gap-3">
                <div></div>
                <Button className="" onClick={() => navigate("/licenseRequest/create")}
                    color="primary" endContent={<FaPlus />}>เพิ่มคำร้องใบอนุญาต</Button>
            </div>
        )
    }, [])

    return (<div className="flex flex-col">
        <Breadcrumbs className="mb-3">
            <BreadcrumbItem><Link to={"/"}><FaHome /></Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={'/pageLicense'}>ใบอนุญาต</Link></BreadcrumbItem>
        </Breadcrumbs>

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
                    <TableColumn>วันสิ้นอายุ</TableColumn>
                    <TableColumn className="text-center">การกระทำ</TableColumn>
                </TableHeader>
                {isLoading ? (
                    <TableBody emptyContent={"ไม่มีข้อมูล"}>{[]}</TableBody>)
                    : (
                        <TableBody>
                            {
                                data.message.map(x => (
                                    <TableRow key={x.name}>
                                        <TableCell>
                                            <div>
                                                <div className="font-bold">{x.license_applicant_title}</div>
                                                <div>{x.licensetype_title}</div>
                                            </div>
                                        </TableCell>

                                        <TableCell>{x.house_text_display}</TableCell>
                                        <TableCell>{x.license_end_date}</TableCell>

                                        <TableCell>

                                            <div className="flex flex-row gap-1 justify-center">
                                                <Tooltip placement="top" content="ใบอนุญาต" aria-label="ใบอนุญาติ" >
                                                    <span
                                                        onClick={() => { navigate(`/pageLicense/${x.name}/view`) }}
                                                        className="text-lg text-violet-600 cursor-pointer active:opacity-50">
                                                        <FaFileDownload />
                                                    </span>
                                                </Tooltip>
                                            </div>

                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>

                    )
                }

            </Table>

        </div>

    </div>)
}