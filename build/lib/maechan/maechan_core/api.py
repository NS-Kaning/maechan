import frappe
from frappe.query_builder import DocType,Order
from maechan.maechan_core.doctype.license.license import License
from maechan.maechan_core.doctype.house.house import House

@frappe.whitelist(allow_guest=True)
def land_chart():

    request = frappe.form_dict

    if "district_id" in request:
        district_id = request['district_id']
        lands = frappe.db.get_all(
            "Land", filters={"district_id": district_id}, fields='*')
    else:
        lands = frappe.db.get_all("Land", fields='*')

    frappe.response['message'] = lands
    # frappe.response['request'] = request


@frappe.whitelist(allow_guest=True)
def house_chart():
    request = frappe.form_dict

    if "district_id" in request:
        district_id = request['district_id']
        houses = frappe.db.get_all(
            "House", filters={"district_id": district_id}, fields='*')
    else:
        houses = frappe.db.get_all("House", fields='*')

    frappe.response['message'] = houses
    # frappe.response['request'] = request

@frappe.whitelist(allow_guest=True)
def license_chart():
    request = frappe.form_dict
    
    license_doctype : License = frappe.qb.DocType('License') # type: ignore
    house_doctype : House = frappe.qb.DocType('House') # type: ignore
    select_fields = [
        
    ]

    if "district_id" in request:
        
        
        district_id = request['district_id']

        licenses = (frappe.qb.from_(license_doctype) 
                        .inner_join(house_doctype)                                  # type: ignore
                        .on(license_doctype.house_id == house_doctype.name)         # type: ignore
                        .where(house_doctype.district_id == district_id)
                        .select('*')).run(as_dict=True)                             # type: ignore



    else:

        licenses = (frappe.qb.from_(license_doctype)                            # type: ignore
                        .inner_join(house_doctype)                              # type: ignore
                        .on(license_doctype.house_id == house_doctype.name)     # type: ignore
                        .select('*')).run(as_dict=True) 

    frappe.response['message'] = licenses
    # frappe.response['request'] = request


def district_list():
    request = frappe.form_dict
    district = frappe.db.get_list("District", fields="*")
    frappe.response['message'] = "District List"
    frappe.response['data'] = district
