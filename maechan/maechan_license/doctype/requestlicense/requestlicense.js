// Copyright (c) 2023, SE and contributors
// For license information, please see license.txt

async function make_table(doctype, fieldName, show_fields, parent_values, add_fields, update_fields, request_type) {

    let title = "เพิ่มรายการ"
    async function make_add_button_function(doctype, title, add_fields, parent_values, reload_callback) {
        frappe.model.with_doctype(doctype, (r) => {

            let meta = frappe.get_meta(doctype)

            let df = new frappe.ui.Dialog({
                title: title,
                fields: [
                    ...(meta.fields.filter(f => add_fields.find(x => x === f.fieldname))),
                ],
                size: 'small', // small, large, extra-large
                primary_action_label: 'Submit',
                primary_action: async (values) => {

                    let r = await frappe.db.get_doc("RequestLicenseType", request_type)
                        .then(r => r)

                    let val = {
                        ...values,
                        ...parent_values,
                        checklist_extra: [],
                        checklist_list: [],
                    }
                    r.checklist_details.forEach(z => {
                        val.checklist_extra.push({
                            key: z.key
                        })

                    })
                    r.checklist.forEach(j => {

                        val.checklist_list.push({
                            key: j.key,
                            title_detail: j.title_detail
                        })
                    })

                    await fetch(`/api/resource/${doctype}/`, {
                        method: "POST",
                        body: JSON.stringify(val)
                    })
                    df.hide();
                    reload_callback()

                }

            })
            df.show()
        })

    }


    let self = async (frm) => {
        frappe.model.with_doctype(doctype, async (r) => {

            let meta = frappe.get_meta(doctype)

            // console.log(meta)


            let fields = [
                ...(meta.fields.filter(x => show_fields.find(f => x.fieldname === f)).map(x => {
                    return {
                        id: x.fieldname,
                        name: x.label,
                        width: x.columns === "" ? 1 : x.columns
                    }
                })),
                //                { id: 'edit_btn', name: '', width: 2 }
            ]

            // console.log("fields", JSON.stringify(fields))
            let self = async () => {
                frappe.db.get_list(doctype, {
                    fields: "*",
                    filters: parent_values
                }).then(docs => {

                    let data = docs.sort((a, b) => a.name < b.name ? -1 : 1)

                    // console.log("data", JSON.stringify(data))


                    let template = `
			<div class="form-group">
				<button class="btn btn-xs btn-default" data-fieldtype="AddButton" data-fieldname="{{fieldname}}" placeholder="" value="">เพิ่มรายการ</button>
			</div>
            <div class="form-grid">
                <div class="grid-heading-row">
                    <div class="grid-row">
                        <div class="data-row row">
							<div class="row-check sortable-handle col">
								<input type="checkbox" data-fieldname="{{fieldname}}" class="grid-row-check">
							</div>

                            {% for col in columns %}
                            <div class="grid-static-col col row-index col-xs-{{col['width']}}  ">
                                <span>{{col['name']}}</span>
                            </div>
                            {% endfor %}
                            <div class="col grid-static-col d-flex justify-content-center" style="cursor: pointer;">
                            <a><svg class="icon  icon-sm" style="filter: opacity(0.5)" aria-hidden="true">
                            <use class="" href="#icon-setting-gear"></use>
                            </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-body">
                {% if rows.length > 0 %}
                    {% for row in rows %}
                    <div class="rows">
                        <div class="grid-row">
                            <div class="data-row row">

	                            <div class="row-check sortable-handle col">
									<input type="checkbox" class="grid-row-check" data-name="{{row['name']}}">
								</div>
                                {% for col in columns %}
                                <div class="sortable-handle text-left col col-xs-{{col['width']}} {% if col['id'] =='name' %} bold {%endif%}">
                                    {% if col['id'] == 'edit_btn' %}
                                    <button class="btn btn-xs btn-default" data-fieldtype="Button" placeholder="" data-doctype="{{doctype}}" value="">แก้ไข</button>
                                    {% else %}

                                    {% if col['id'] == 'name' %}
                                    <a class="text-underline"><span>{{row[col['id']]}}</span></a>

                                    {% else %}
                                    <span>{{row[col['id']]}}</span>
                                    {% endif %}

                                    {% endif %}
                                </div>
                                {% endfor %}

                                <div class="col"><div class="btn-open-row" data-toggle="tooltip" data-placement="right" title="" data-original-title="Edit" aria-describedby="tooltip56951">
									<a class="edit_row" data="{{row.name}}">
									<svg data="{{row.name}}" class="icon  icon-xs" style="" aria-hidden="true">
									<use class="" href="#icon-edit"></use></svg></a>
									</div></div>
                            </div>
                        </div>
                    </div>

                    {% endfor %}
                    {% else %}
                    <div class="rows">
                    <div class="grid-row text-center">
                    No Data
                    </div>
                </div>
                    {% endif %}
                </div>
            </div>`

                    frm.set_df_property(fieldName, 'options', frappe.render(template, {
                        columns: fields,
                        rows: data,
                        doctype: doctype,
                        fieldname: fieldName,
                    }))
                    $(`[data-fieldtype=AddButton][data-fieldname=${fieldName}]`).unbind('click')
                    $(`[data-fieldtype=AddButton][data-fieldname=${fieldName}]`).click(async (e) => {
                        make_add_button_function(doctype, title, add_fields, parent_values, () => self(frm))
                    })

                    $(`[data-fieldname=${fieldName}] .grid-row-check`).unbind('click')
                    $(`[data-fieldname=${fieldName}] .grid-row-check`).click(async (e) => {
                        console.log(e)
                        let object = $(e.target)
                        let is_heading = $(object).parents(".grid-heading-row").length === 1
                        console.log(is_heading, object.prop('checked'))
                        if (is_heading) {
                            $(`[data-fieldname=${fieldName}] .grid-row-check`).prop('checked', object.prop('checked'))
                        }

                    })

                    $(`[data-fieldname=${fieldName}] .edit_row`).unbind('click')
                    $(`[data-fieldname=${fieldName}] .edit_row`).click(async (x) => {

                        let name = $(x.target).attr('data')
                        frappe.set_route(`requestlicenseinspect/${name}`);


                    })

                })
            }
            await self()
        })

    }
    return self
}



function findExtra(key, list_extra) {
    for (i = 0; i < list_extra.length; i++) {
        let x = list_extra[i];
        if (x.key == key) {
            return x;
        }
    }
    return null;
}

function findValue(key, list_extra) {

    let x = findExtra(key, list_extra)
    if (x != null) {
        return x.value
    }
    return null

}

function calAge(a, b) {
    const ms = 1000 * 60 * 60 * 24 * 365;
    const bDay = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const tDay = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((tDay - bDay) / ms);
}

frappe.ui.form.on("RequestLicense", {
    async refresh(frm) {

        console.log(frm)

        let parent_values = {
            request_license: frm.doc.name
        }

        let refreshAppointment = await make_table(
            'RequestLicenseInspect',
            'check_datatable',
            ['checklist_date', 'checklist_result', 'checklist_comment'],
            parent_values,
            ['checklist_date'],
            ['checklist_date', 'checklist_list', 'checklist_extra', 'checklist_result', 'checklist_comment'],
            frm.doc.request_type
        )
        refreshAppointment(frm)


    }, async after_workflow_action(frm) {
        // console.log(frm.doc.request_status);
        // if (frm.doc.request_status == 'รอออกใบอนุญาต') {
        //     // console.log("test");
        //     // console.log(frm.doc.request_status);
        //     frm.call('newLicense')
        // }

    }, async create_license_btn(frm) {
        console.log(frm.doc.workflow_state)
        let licensedata = {
            license_type : frm.doc.license_type ,
            request_license: frm.doc.name ,
            license_applicant_type: frm.doc.license_applicant_type ,
            license_applicant: frm.doc.license_applicant_type == 'นิติบุคคล' ? frm.doc.license_applicant : frm.doc.applicant_name ,
            license_applicant_by : frm.doc.applicant_name,
            license_applicant_title: frm.doc.applicant_title ,
            license_applicant_nationality: frm.doc.applicant_nationality ,
            license_applicant_ethnicity: frm.doc.applicant_ethnicity ,
            license_applicant_address_no: frm.doc.applicant_no ,
            license_applicant_address_moo: frm.doc.applicant_moo ,
            license_applicant_address_soi: frm.doc.applicant_soi ,
            license_applicant_address_road: frm.doc.applicant_road,
            license_applicant_address_district: frm.doc.applicant_distict ,
            license_applicant_telephone: frm.doc.applicant_tel,
            license_applicant_fax: frm.doc.applicant_fax,
            house_id: frm.doc.house_no,
            telephone: frm.doc.house_tel,
            license_fee : frm.doc.license_fee,
            
        }
        console.log(licensedata)
        frappe.new_doc("License", licensedata )

    }
    , before_load(frm) {
        const emailUser = frappe.session.user
        if (frm.doc.applicant_name == null) {
            frappe.db.get_doc("UserProfile", emailUser).then(r => {
                frappe.db.get_value("Tambon",
                    filters = {
                        name_th: r.address_district,
                        amphure_th: r.address_amphur,
                        province_th: r.address_province
                    },
                    'id').then(re => {
                        frm.set_value({
                            "applicant_distict": re.message.id
                        })
                    })
                const birthday = new Date(r.birthdate)
                const today = new Date()
                const age = calAge(birthday, today);
                frm.set_value({
                    "date": r.creation,
                    "applicant_name": r.fullname,
                    "applicant_nationality": r.nationality,
                    "applicant_ethnicity": r.race,
                    "applicant_tel": r.tel,
                    "applicant_no": r.address_no,
                    "applicant_moo": r.address_moo,
                    "applicant_soi": r.address_soi,
                    "applicant_road": r.address_road,
                    "applicant_age": age
                });

            })
        }
    },
    btn_request_type(frm) {
        if (frm.doc.request_type) {
            frappe.db.get_doc("RequestLicenseType", frm.doc.request_type).then(r => {
                let RequestLicenseType = r;
                fields = []
                RequestLicenseType.details.forEach(x => {
                    let defaultValue = findValue(x.key, frm.doc.request_extra);
                    let f = {
                        label: x.key,
                        fieldname: x.key,
                        fieldtype: x.datatype,
                        options: x.options,
                        default: defaultValue
                    }
                    fields.push(f)

                })

                let d = new frappe.ui.Dialog({
                    title: 'Enter details',
                    fields: fields,
                    size: 'small', // small, large, extra-large 
                    primary_action_label: 'Submit',
                    primary_action(values) {
                        frm.doc.request_extra.forEach(x => {
                            x.value = values[x.key]
                        })
                        d.hide();
                        frm.refresh_fields("request_extra");
                    }
                });

                d.show();
            })

        }

    },
    request_type(frm) {

        frm.clear_table("request_extra")
        frm.clear_table("attachment_extra")
        frm.clear_table("checklist_extra")
        frm.clear_table("checklist_list")

        frappe.db.get_doc("RequestLicenseType", frm.doc.request_type)
            .then(r => {

                r.details.forEach(x => {

                    extraDetails = frm.add_child("request_extra");
                    extraDetails.key = x.key

                })

                frm.refresh_fields("request_extra");

                r.attachment.forEach(y => {

                    extraDetails = frm.add_child("attachment_extra");
                    extraDetails.key = y.key

                })

                frm.refresh_fields("attachment_extra");

                r.checklist_details.forEach(z => {

                    extraDetails = frm.add_child("checklist_extra");
                    extraDetails.key = z.key

                })

                frm.refresh_fields("checklist_extra");

                r.checklist.forEach(j => {

                    extraDetails = frm.add_child("checklist_list");
                    extraDetails.key = j.key
                    extraDetails.title_detail = j.title_detail
                })

                frm.refresh_fields("checklist_list");
            })
    }
});


