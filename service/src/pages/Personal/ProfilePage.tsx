import { Autocomplete, AutocompleteItem, BreadcrumbItem, Breadcrumbs, Input, Select, SelectItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { FrappeContext } from "frappe-react-sdk";
import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useAlertContext } from "../../providers/AlertProvider";

export default function ProfilePage() {

    let { call } = useContext(FrappeContext)
    let [createForm, setCreateForm] = useState({})
    let [provinces, setProvinces] = useState([])
    let [amphures, setAmphures] = useState([])
    let [districts, setDistricts] = useState([])

    let alert = useAlertContext()

    const updateForm = async (key, value) => {
        let createFormValue = {
            ...createForm,
            [key]: value
        }

        if (key == "address_province") {
            createFormValue.address_amphur = ""
            createFormValue.address_district = ""
        }
        else if (key == "address_amphur") {
            createFormValue.address_district = ""
        }
        reloadProvinceAmphurDistrict(createFormValue)
        setCreateForm(createFormValue)
    }

    const reloadProvinceAmphurDistrict = async (user_profile) => {
        await call.post("maechan.maechan_core.doctype.province.province.get_all_province").then(r => {
            let provincesResult = r.message
            setProvinces(provincesResult)
        })

        if (user_profile.address_province) {
            await call.post("maechan.maechan_core.doctype.province.province.get_all_amphure", {
                filters: {
                    province_id: user_profile.address_province
                }
            }).then(r => {
                let result = r.message
                setAmphures(result)
            })
        }

        if (user_profile.address_amphur) {
            await call.post("maechan.maechan_core.doctype.province.province.get_all_tambon", {
                filters: {
                    province_id: user_profile.address_province,
                    amphure_id: user_profile.address_amphur
                }
            }).then(r => {
                let result = r.message
                setDistricts(result)
            })
        }
    }

    const loadUserProfile = async () => {
        try {
            let res = await call.post("maechan.maechan.doctype.userprofile.userprofile.get_current_userprofile")
            console.log(res)

            let user_profile = res.message

            await call.post("maechan.maechan_core.doctype.province.province.get_all_province").then(r => {
                let provincesResult = r.message
                setProvinces(provincesResult)
            })

            if (user_profile.address_province) {
                await call.post("maechan.maechan_core.doctype.province.province.get_all_amphure", {
                    filters: {
                        province_id: user_profile.address_province
                    }
                }).then(r => {
                    let result = r.message
                    setAmphures(result)
                })
            }

            if (user_profile.address_amphur) {
                await call.post("maechan.maechan_core.doctype.province.province.get_all_tambon", {
                    filters: {
                        province_id: user_profile.address_province,
                        amphure_id: user_profile.address_amphur
                    }
                }).then(r => {
                    let result = r.message
                    setDistricts(result)
                })
            }

            setCreateForm(res.message)

        } catch (error) {
            alert.showError(JSON.stringify(error))
        }

    }

    useEffect(
        () => {
            loadUserProfile()
        }, []
    )
    console.log(createForm)

    return (
        <div>
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><FaHome /></BreadcrumbItem>
                <BreadcrumbItem>ข้อมูลส่วนตัว</BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                ข้อมูลส่วนตัว
            </div>

            <div className="flex flex-col">

                <div className="text-medium font-bold mb-3">
                    ข้อมูลพื้นฐาน
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    <Input type="text" value={createForm.fullname} label="ชื่อ-สกุล" placeholder="ชื่อ-สกุล" />
                    <Input type="date" value={createForm.birthdate} label="วันเดือนปีเกิด (คศ.)" placeholder="วันเดือนปีเกิด (คศ.)" />
                    <Input type="text" value={createForm.tel} label="เบอร์โทรศัพท์" placeholder="เบอร์โทรศัพท์" />
                    <Input type="text" value={createForm.nationality} label="สัญชาติ" placeholder="สัญชาติ" />
                    <Input type="text" value={createForm.race} label="เชื้อชาติ" placeholder="เชื้อชาติ" />
                    <Input type="e-mail" value={createForm.email} label="อีเมล์" placeholder="อีเมล์" />
                </div>

                <div className="text-medium font-bold mb-3">
                    ที่อยู่
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    <Input type="text" value={createForm.address_no} label="เลขที่" placeholder="เลขที่" />
                    <Input type="text" value={createForm.address_moo} label="หมู่" placeholder="หมู่" />
                    <Input type="text" value={createForm.address_soi} label="ตรอก/ซอย" placeholder="ตรอก/ซอย" />
                    <Input type="text" value={createForm.address_road} label="ถนน" placeholder="ถนน" />
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">

                    <Select
                        items={provinces}
                        label="จังหวัด"
                        selectedKeys={[createForm.address_province]}
                        onSelectionChange={(key) => {
                            updateForm('address_province', Array.from(key)[0])
                        }}
                    >
                        {(province) => <SelectItem key={province.name}>{province.name_th}</SelectItem>}
                    </Select>


                    <Select
                        items={amphures}
                        label="อำเภอ"
                        selectedKeys={[createForm.address_amphur]}
                        onSelectionChange={(key) => updateForm('address_amphur', Array.from(key)[0])}

                    >
                        {(amphure) => <SelectItem key={amphure.name}>{amphure.name_th}</SelectItem>}
                    </Select>

                    <Select
                        items={districts}
                        label="ตำบล"
                        selectedKeys={[createForm.address_district]}
                        onSelectionChange={(key) => updateForm('address_district', Array.from(key)[0])}

                    >
                        {(district) => <SelectItem key={district.name}>{district.name_th}</SelectItem>}
                    </Select>
                </div>


            </div>
        </div>
    )
}