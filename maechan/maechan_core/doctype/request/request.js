// Copyright (c) 2023, SE and contributors
// For license information, please see license.txt

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

frappe.ui.form.on("Request", {
	refresh(frm) {

	},
    btn_request_type(frm) {
        console.log(frm.doc.request_type)
        if (frm.doc.request_type) {
            frappe.db.get_doc("RequestType", frm.doc.request_type).then(r => {
                let RequestType = r;
                fields = []
                RequestType.details.forEach(x => {
                    let defaultValue = findValue(x.key, frm.doc.request_extra);
                    console.log("DEFAULT", defaultValue)
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
                        console.log(values);
                        frm.doc.request_extra.forEach(x => {
                            console.log(values,x)
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

        frappe.db.get_doc("RequestType", frm.doc.request_type)
            .then(r => {

                r.details.forEach(x => {
                    console.log(x)

                    extraDetails = frm.add_child("request_extra");
                    extraDetails.key = x.key

                })

                frm.refresh_fields("request_extra");

                r.attachment.forEach(y => {
                    console.log(y)

                    extraDetails = frm.add_child("attachment_extra");
                    extraDetails.key = y.key

                })

                frm.refresh_fields("attachment_extra");

                r.checklist_details.forEach(z => {
                    console.log(z)

                    extraDetails = frm.add_child("checklist_extra");
                    extraDetails.key = z.key

                })

                frm.refresh_fields("checklist_extra");

                r.checklist.forEach(j => {
                    console.log(j)

                    extraDetails = frm.add_child("checklist_list");
                    extraDetails.key = j.key
                    extraDetails.title_detail = j.title_detail
                })

                frm.refresh_fields("checklist_list");
            })
    }
    
});


