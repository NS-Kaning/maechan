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

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

// function checkEnddate(date) {

// }

// function dateDiffInDays(a, b) {
//     const _MS_PER_DAY = 1000 * 60 * 60 * 24;
//     const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
//     const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
//     return Math.floor((utc2 - utc1) / _MS_PER_DAY);
//   }

// function checkEndDate(frm){
    
//     const today = new Date()
//     const endday = new Date(frm.doc.license_end_date)
//     console.log(`${endday.getFullYear()}-${endday.getMonth() + 1}-${endday.getDate()}`);
//     console.log(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

//     const diffdate = dateDiffInDays(today,endday);
//     console.log(diffdate);

//     const status = frm.doc.license_enddate
//     console.log(status);

//     if ( 60 >= diffdate && diffdate > 30 && status != "60วัน แจ้งเตือนแล้ว"){
//         console.log("60วัน");
//         frm.set_value('license_enddate',"60วัน")
//         frm.save()
//     }
//     if( 30 >= diffdate && diffdate > 15 && status != "30วัน แจ้งเตือนแล้ว"){
//         console.log("30วัน");
//         frm.set_value('license_enddate',"30วัน")
//         frm.save()
//     }
//     if( 15 >= diffdate &&  !(0 > diffdate) && status != "15วัน แจ้งเตือนแล้ว"){
//         console.log("15วัน");
//         frm.set_value('license_enddate',"15วัน")
//         frm.save()
//     }
//     if( 0 >= diffdate ){
//         console.log("หมดอายุ");
//         frm.set_value('license_enddate',"หมดอายุ")
//         frm.save()
//     }
//     if( diffdate > 60){
//         console.log("-");
//         frm.set_value('license_enddate',"-")
//         frm.save()
//     }

// }
frappe.ui.form.on('License', {
    refresh(frm) {
        console.log(frm)
        // your code here
        // frm.set_df_property("license_type", "read_only", frm.is_new() ? 0 : 1);


        frm.refresh_field('approve_histories');
    },

    async before_workflow_action(frm) {
        console.log(frm)
        frappe.dom.unfreeze();

        let add_comment_states = ["Reject", "Review"]

        let select_action = frm.selected_workflow_action

        if (add_comment_states.includes(select_action)) {

            let wait = true;

            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

            let d = new frappe.ui.Dialog({
                title: __('Enter Comment'),
                fields: [
                    {
                        label: __('Comment'),
                        fieldname: 'comment',
                        fieldtype: 'Text'
                    }
                ],
                size: 'small', // small, large, extra-large 
                primary_action_label: __('Submit'),
                primary_action: async (values) => {
                    let today = new Date()
                    let row = frm.add_child('approve_histories', {
                        workflow_action: frm.selected_workflow_action,
                        workflow_user: frappe.session.user,
                        datetime: formatDate(today),
                        comment: values.comment,

                    });
                    frm.refresh_field('approve_histories');
                    await frm.save()
                    frappe.dom.freeze();
                    wait = false
                    d.hide();
                }
            });

            d.show();



            while (wait) {
                await sleep(1000)
            }



        } else {

            let today = new Date()
            let row = frm.add_child('approve_histories', {
                workflow_action: frm.selected_workflow_action,
                workflow_user: frappe.session.user,
                datetime: formatDate(today),
                comment: '',

            });
            frappe.dom.freeze();
            frm.refresh_field('approve_histories');
            await frm.save()
        }
    },
    after_workflow_action(frm) {

    },

    btn_dialog_extra(frm) {
        console.log(frm.doc.license_type)
        if (frm.doc.license_type) {
            frappe.db.get_doc("LicenseType", frm.doc.license_type).then(r => {
                let licenseType = r;
                fields = []
                licenseType.details.forEach(x => {
                    let defaultValue = findValue(x.key, frm.doc.license_extra);
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
                        frm.doc.license_extra.forEach(x => {
                            console.log(values, x)
                            x.value = values[x.key]
                        })
                        d.hide();
                        frm.refresh_fields("license_extra");
                    }
                });

                d.show();
            })

        }





    },
    license_type(frm) {

        frm.clear_table("license_extra")

        frappe.db.get_doc("LicenseType", frm.doc.license_type)
            .then(r => {

                r.details.forEach(x => {
                    console.log(x)

                    extraDetails = frm.add_child("license_extra");
                    extraDetails.key = x.key

                })

                frm.refresh_fields("license_extra");
            })
    }
})