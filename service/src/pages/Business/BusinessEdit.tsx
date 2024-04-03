import { Autocomplete, AutocompleteItem, BreadcrumbItem, Breadcrumbs, Button, Input, Skeleton } from "@nextui-org/react"
import { useAsyncList } from "@react-stately/data";
import { FrappeContext, useFrappeGetDoc, } from "frappe-react-sdk";
import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlertContext } from "../../providers/AlertProvider";
import { IBusiness } from "../../interfaces";

function BusinessEdit() {


    const { call } = useContext(FrappeContext) as FrappeConfig
    const navigate = useNavigate()
    const params = useParams()

    let list = useAsyncList({
        async load({ signal, filterText }) {
            let res = await call.post("maechan.maechan_core.api.house_filter", { keyword: filterText })
            return {
                items: res.message,
            };
        },
    });



    const [createForm, setCreateForm] = useState({
        business_name: "",
        business_address: "",
    } as IBusiness)

    useEffect(() => {
        setIsLoading(true)

        call.post("maechan.maechan_license.doctype.business.business.get_business_by_name", {
            name: params.id
        }).then(r => {
            setCreateForm(r.message)

            call.post("maechan.maechan_core.api.house_filter", { keyword: r.message.business_address }).then(
                houses => {
                    list.setFilterText(
                        houses.message.find(x => x.name == r.message.business_address).text_display
                    )
                    setIsLoading(false)
                }
            )



            console.log(r.message)
        })



    }, [])

    const updateForm = (target, key) => {
        setCreateForm({
            ...createForm,
            [target]: key
        })

    }

    const [error, setError] = useState({
        business_address: '',
        business_name: '',
        result: null,
    })

    const validate = () => {
        let localError = {
            business_address: '',
            business_name: ''
        }
        if (!createForm.business_address) {
            localError.business_address = 'กรุณากรอกข้อมูล'
        }

        if (!createForm.business_name) {
            localError.business_name = 'กรุณากรอกข้อมูล'
        }

        setError(localError)

        return !localError.business_address && !localError.business_name
    }

    const alert = useAlertContext()
    const [loading, setIsLoading] = useState(true)
    const submit = async () => {
        // console.log(createForm)
        let isValid = true//validate()
        setIsLoading(true)
        // console.log(isValid)
        if (isValid) {
            try {
                let result = await call.post("maechan.maechan_license.doctype.business.business.update_business", {
                    'business': createForm
                })
                console.log('submit result', result)
                setError({
                    ...error,
                    result: null
                })
            } catch (error) {
                console.log(error)
                alert.showError(JSON.stringify(error))
                setError({
                    ...error,
                    result: error
                })
            }

        }
        setIsLoading(false)

    }


    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><Link to={"/"}><FaHome /></Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={'/business'}>กิจการของท่าน</Link></BreadcrumbItem>
                <BreadcrumbItem>แก้ไขกิจการ : {params.id}</BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                แก้ไขกิจการ : {params.id}
            </div>

            {error.error?.message ? (<div className="flex flex-row lg:w-[50%] text-danger mb-3">
                {error.error?.message}
            </div>
            ) : null}

            <div className="flex flex-row lg:w-[50%] mb-3">
                <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                    <Input type="text"
                        isInvalid={!!error.business_name}
                        isRequired label="ชื่อกิจการ" placeholder="กรุณาระบุชื่อกิจการ" name="business_name" value={createForm.business_name} onChange={(e) => { updateForm('business_name', e.target.value) }} />
                </Skeleton>
            </div>

            <div className="flex flex-row lg:w-[50%] mb-3">
                <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                    <Input type="text"
                        label="เบอร์โทรศัพท์" placeholder="เบอร์โทรศัพท์" name="tel" value={createForm.tel} onChange={(e) => { updateForm('tel', e.target.value) }} />
                </Skeleton>
            </div>

            <div className="flex flex-row lg:w-[50%] mb-3">
                <Skeleton isLoaded={!loading} className="rounded-lg w-full">
                    <Autocomplete
                        className="w-full"

                        isRequired
                        inputValue={list.filterText}
                        isLoading={list.isLoading}
                        items={list.items}
                        label="ที่อยู่กิจการ (บ้านเลขที่)"
                        placeholder="Type to search..."
                        onInputChange={list.setFilterText}
                        onSelectionChange={(key) => updateForm('business_address', key)}
                        isInvalid={!!error.business_address}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.name} className="capitalize">
                                {item.text_display}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </Skeleton>
            </div>
            <div className="flex flex-row lg:w-[50%]">
                <Button isLoading={loading} color="primary" className="mr-3" onClick={submit}>บันทึก</Button>
                <Button isLoading={loading} color="default" onClick={() => navigate('/business')}>ยกเลิก</Button>
            </div>


        </div>


    )
}

export default BusinessEdit