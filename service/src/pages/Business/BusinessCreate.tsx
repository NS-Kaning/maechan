import { Autocomplete, AutocompleteItem, BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react"
import { useAsyncList } from "@react-stately/data";
import { FrappeContext, FrappeProvider } from "frappe-react-sdk";
import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function BusinessCreate() {


    const { call } = useContext(FrappeContext)
    const navigate = useNavigate()

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
    })

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
    const submit = async () => {
        // console.log(createForm)
        let isValid = true//validate()

        // console.log(isValid)
        if (isValid) {
            try {
                let result = await call.post("maechan.maechan_license.doctype.business.business.add_business", createForm)
                console.log('submit result', result)
                setError({
                    ...error,
                    result: null
                })

                navigate("/business")
            } catch (error) {
                console.log(error)
                setError({
                    ...error,
                    result: error
                })
            }

        }

    }


    return (
        <div className="flex flex-col">
            <Breadcrumbs className="mb-3">
                <BreadcrumbItem><FaHome /></BreadcrumbItem>
                <BreadcrumbItem><Link to={'/business'}>กิจการของท่าน</Link></BreadcrumbItem>
                <BreadcrumbItem>เพิ่มกิจการ</BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row lg:w-[50%] text-xl mb-3">
                เพิ่มกิจการ
            </div>

            {error.error?.message ? (<div className="flex flex-row lg:w-[50%] text-danger mb-3">
                {error.error?.message}
            </div>
            ) : null}

            <div className="flex flex-row lg:w-[50%] mb-3">
                <Input type="text"
                    isInvalid={!!error.business_name}
                    isRequired label="ชื่อกิจการ" placeholder="กรุณาระบุชื่อกิจการ" name="business_name" value={createForm.business_name} onChange={(e) => { updateForm('business_name', e.target.value) }} />

            </div>
            <div className="flex flex-row lg:w-[50%] mb-3">

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
            </div>
            <div className="flex flex-row lg:w-[50%]">
                <Button color="primary" className="mr-3" onClick={submit}>บันทึก</Button>
                <Button color="default" onClick={() => navigate('/business')}>ยกเลิก</Button>

            </div>


        </div>


    )
}

export default BusinessCreate