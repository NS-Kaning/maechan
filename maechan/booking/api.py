import frappe


@frappe.whitelist(allow_guest=True)
def register() :
    request = frappe.form_dict
    pass