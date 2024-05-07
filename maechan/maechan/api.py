import frappe

@frappe.whitelist(allow_guest=True)
def get_application_context() :
    website_setting =  frappe.get_single("Website Settings")

    return website_setting

@frappe.whitelist(allow_guest=True)
def get_user_roles():
    user_roles = frappe.get_roles(frappe.session.user)
    
    return user_roles
