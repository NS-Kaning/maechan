import frappe

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
