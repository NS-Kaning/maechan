import { BreadcrumbItem, Breadcrumbs, Input, Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useContext, useEffect, useMemo, useState } from "react"
import { FaHome, FaPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { IAmphure, IBusiness, IProvince, IRequestDetail, IRequestLicense, IRequestLicenseType, ITambon, IUserProfile } from "../../interfaces"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useAsyncList } from "@react-stately/data"

export default function RequestLicenseCreate() {

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

    const [businesses, setBusinesses] = useState([] as IBusiness[])
    const [requestTypes, setRequestTypes] = useState([] as IRequestLicenseType[])

    const loadBusiness = async () => {
        setIsLoading(true)
        try {
            let result = await call.post('maechan.maechan_license.doctype.business.business.get_businesses')
            let resquestLicenseTypeResult = await call.post('maechan.maechan_license.doctype.requestlicensetype.requestlicensetype.get_request_license_type')

            console.log(result)
            setBusinesses(result.message)
            setRequestTypes(resquestLicenseTypeResult.message)
        } catch (error) {
            console.log(error)
            alert.showError(JSON.stringify(error))
        } finally {
            setIsLoading(false)
        }


    }


    let [createForm, setCreateForm] = useState({} as IRequestLicense)
    let [provinces, setProvinces] = useState([] as IProvince[])
    let [amphures, setAmphures] = useState([] as IAmphure[])
    let [districts, setDistricts] = useState([] as ITambon[])
    const [amphureLoad, setAmphureLoad] = useState(false)
    const [districtLoad, setDistrictLoad] = useState(false)
    let { call } = useContext(FrappeContext) as FrappeConfig

    const [isLoading, setIsLoading] = useState(true)


    const loadUserProfile = async () => {
        setIsLoading(true)

        try {

            let res = await call.post("maechan.maechan.doctype.userprofile.userprofile.get_current_userprofile")
            console.log(res)

            let user_profile = res.message as IUserProfile

            let pcall = call.post("maechan.maechan_core.doctype.province.province.get_all_province").then((r: { message: any; }) => {
                let provincesResult = r.message
                setProvinces(provincesResult)
            })
            let acall = null;
            let tcall = null;

            if (user_profile.address_province) {
                acall = call.post("maechan.maechan_core.doctype.province.province.get_all_amphure", {
                    filters: {
                        province_id: user_profile.address_province
                    }
                }).then((r: any) => {
                    let result = r.message
                    setAmphures(result)
                })
            }

            if (user_profile.address_amphur) {
                tcall = call.post("maechan.maechan_core.doctype.province.province.get_all_tambon", {
                    filters: {
                        province_id: user_profile.address_province,
                        amphure_id: user_profile.address_amphur
                    }
                }).then((r: any) => {
                    let result = r.message
                    setDistricts(result)
                })
            }

            await Promise.all([pcall, acall, tcall])


            function calAge(a, b) {
                let ms = 1000 * 60 * 60 * 24 * 365;
                let bDay = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                let tDay = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                return Math.floor((tDay - bDay) / ms);
            }


            let birthday = new Date(user_profile.birthdate)
            let today = new Date()
            let age = calAge(birthday, today);

            setCreateForm({
                ...createForm,
                "date": new Date(),
                "applicant_name": user_profile.fullname,
                "applicant_nationality": user_profile.nationality,
                "applicant_ethnicity": user_profile.race,
                "applicant_tel": user_profile.tel,
                "applicant_no": user_profile.address_no,
                "applicant_moo": user_profile.address_moo,
                "applicant_soi": user_profile.address_soi,
                "applicant_road": user_profile.address_road,
                "applicant_age": age,
                applicant_distict: user_profile.address_district,
                applicant_amphur: user_profile.address_amphur,
                applicant_province: user_profile.address_province,
            })

        } catch (error) {
            alert.showError(JSON.stringify(error))
        }
        setIsLoading(false)
    }

    const reloadProvinceAmphurDistrict = async (user_profile: IRequestLicense, key = '') => {


        if (user_profile.applicant_province && key == "applicant_province") {
            setAmphureLoad(true)
            call.post("maechan.maechan_core.doctype.province.province.get_all_amphure", {
                filters: {
                    province_id: user_profile.applicant_province
                }
            }).then((r: { message: any; }) => {
                let result = r.message
                setAmphures(result)
            }).finally(() => {
                setAmphureLoad(false)
            })

        }

        if (user_profile.applicant_amphur && key == "applicant_amphur") {
            setDistrictLoad(true)
            call.post("maechan.maechan_core.doctype.province.province.get_all_tambon", {
                filters: {
                    province_id: user_profile.applicant_province,
                    amphure_id: user_profile.applicant_amphur
                }
            }).then((r: any) => {
                let result = r.message
                setDistricts(result)
            }).finally(() => {
                setDistrictLoad(false)
            })
        }
    }

    const updateForm = async (key: string, value: string) => {

        let createFormValue = {
            ...createForm,
            [key]: value
        } as IRequestLicense

        if (key == "applicant_province") {
            createFormValue.applicant_amphur = ""
            createFormValue.applicant_distict = ""
        }
        else if (key == "applicant_amphur") {
            createFormValue.applicant_distict = ""
        }
        else if (key == "business") {
            let business = businesses.find(x => x.name == value)
            if (business) {
                createFormValue['house_no'] = business.business_address ?? ''
                createFormValue['house_tel'] = business.tel ?? ''
                setIsLoading(true)
                call.post("maechan.maechan_core.api.house_filter", { keyword: business.business_address }).then(
                    houses => {
                        list.setFilterText(
                            houses.message.find(x => x.name == business.business_address).text_display
                        )
                        setIsLoading(false)
                    }
                )
            }
        }else if (key == "house_no"){
            let house = list.items.find(x => x.name == value)
            console.log(house,key,value)
            list.setFilterText(house?.text_display ?? '')
            if(!value){
                createFormValue.house_no = ''
            }
        }
        reloadProvinceAmphurDistrict(createFormValue, key)
        setCreateForm(createFormValue)
    }


    useEffect(() => {
        loadUserProfile()
        loadBusiness()
    }, [])

    let list = useAsyncList({
        async load({ signal, filterText }) {
            let res = await call.post("maechan.maechan_core.api.house_filter", { keyword: filterText })
            return {
                items: res.message,
            };
        },
    });

    const [error, setError] = useState({
        business_address: '',
        business_name: '',
        result: null,
    })



    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><Link to={"/"}><FaHome /></Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={'/licenseRequest'}>คำร้องขอใบอนุญาต</Link></BreadcrumbItem>
                <BreadcrumbItem>เพิ่มคำร้องขอใบอนุญาต
                </BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                เพิ่มคำร้องขอใบอนุญาต
            </div>
            <div className="flex flex-row mb-3 gap-3">
                <div className="flex flex-row lg:w-[50%] ">
                    <Select
                        label="กิจการ"
                        className=""
                        onSelectionChange={(key) => { updateForm("business", Array.from(key)[0]) }}
                    >
                        {businesses.map((b) => (
                            <SelectItem key={b.name} >
                                {b.business_name}
                            </SelectItem>
                        ))}
                    </Select>

                </div>
                <div className="flex flex-row lg:w-[50%]">
                    <Select
                        label="ประเภทการขออนุญาต"
                        className=""
                        onSelectionChange={(k)=> updateForm('request_type',Array.from(k)[0])}
                    >
                        {requestTypes.map((b) => (
                            <SelectItem key={b.name} >
                                {b.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex flex-row lg:w-[50%] text-md mb-3">
                ข้อมูลผู้ขอใบอนุญาต
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
                <Input
                    value={createForm.applicant_name}
                    name="applicant_name"
                    type="text" label="ชื่อ-สกุล" />
                <Input
                    value={createForm.applicant_age}
                    name="applicant_age"
                    type="text" label="อายุ" />
                <Input
                    value={createForm.applicant_nationality}
                    name="applicant_nationality"
                    type="text" label="สัญชาติ" />
                <Input
                    value={createForm.applicant_tel}
                    name="applicant_tel"
                    type="text" label="เบอร์โทรศัพท์" />
                <Input
                    value={createForm.applicant_fax}
                    name="applicant_fax"
                    type="text" label="แฟกซ์" />
                <Input
                    value={createForm.applicant_ethnicity}
                    name="applicant_ethnicity"
                    type="text" label="เชื้อชาติ" />

            </div>
            <div className="flex flex-row lg:w-[50%] text-md mb-3">
                ที่อยู่ผู้ขอใบอนุญาต
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
                <Input
                    value={createForm.applicant_no}
                    name="applicant_no"
                    type="text" label="เลขที่" />
                <Input
                    value={createForm.applicant_moo}
                    name="applicant_moo"
                    type="text" label="หมู่" />
                <Input
                    value={createForm.applicant_soi}
                    name="applicant_soi"
                    type="text" label="ตรอก/ซอย" />
                <Input
                    value={createForm.applicant_road}
                    name="applicant_road"
                    type="text" label="ถนน" />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
                <Select
                    items={provinces}
                    label="จังหวัด"
                    selectedKeys={[createForm.applicant_province]}
                    onSelectionChange={(key) => {
                        updateForm('applicant_province', Array.from(key)[0])
                    }}
                >
                    {(province) => <SelectItem key={province.name}>{province.name_th}</SelectItem>}
                </Select>

                <Select
                    isLoading={amphureLoad}
                    isDisabled={amphureLoad}
                    items={amphures}
                    label="อำเภอ"
                    selectedKeys={[createForm.applicant_amphur]}
                    onSelectionChange={(key) => updateForm('applicant_amphur', Array.from(key)[0])}

                >
                    {(amphure) => <SelectItem key={amphure.name}>{amphure.name_th}</SelectItem>}
                </Select>
                <Select
                    isLoading={districtLoad}
                    isDisabled={districtLoad}
                    items={districts}
                    label="ตำบล"
                    selectedKeys={[createForm.applicant_distict]}
                    onSelectionChange={(key) => updateForm('applicant_distict', Array.from(key)[0])}

                >
                    {(district) => <SelectItem key={district.name}>{district.name_th}</SelectItem>}
                </Select>
            </div>

            <div className="flex flex-row lg:w-[50%] text-md mb-3">
                ที่อยู่สถานประกอบการ
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">

                <Autocomplete
                    className="w-full"

                    isRequired
                    inputValue={list.filterText}
                    isLoading={list.isLoading}
                    items={list.items}
                    label="ที่อยู่กิจการ (บ้านเลขที่)"
                    placeholder="Type to search..."
                    onInputChange={list.setFilterText}
                    onSelectionChange={(key) => updateForm('house_no', key)}
                    selectedKey={createForm.house_no}
                >
                    {(item) => (
                        <AutocompleteItem key={item.name} className="capitalize">
                            {item.text_display}
                        </AutocompleteItem>
                    )}
                </Autocomplete>

                <Input
                    value={createForm.house_tel}
                    name="house_tel"
                    type="text" label="เบอร์โทรศัพท์" />

            </div>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                <Button className="mr-3" color="primary">บันทึกและต่อไป</Button>
                <Button className="mr-3" onClick={()=>{navigate("/licenseRequest")}} color="default">ยกเลิก</Button>
            </div>
        </div>

    )
}