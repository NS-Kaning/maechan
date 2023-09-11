import frappe

@frappe.whitelist(allow_guest=True)
def hello():
    frappe.response['message'] = "Hello from code"