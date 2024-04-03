import { BreadcrumbItem, Breadcrumbs, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useMemo } from "react"
import { FaHome, FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function RequestLicense() {

    const navigate = useNavigate()

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
                        <TableColumn>ใบอนุญาต</TableColumn>
                        <TableColumn>กิจการ</TableColumn>
                        <TableColumn>สถานะ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>A</TableCell>
                            <TableCell>B</TableCell>
                            <TableCell>C</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>

            </div>
        </div>

    )
}

export default RequestLicense