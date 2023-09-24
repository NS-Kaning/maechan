# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

@frappe.whitelist(allow_guest=True)
def get_all_province():
    if 'fields' in frappe.form_dict :
        
        fields = frappe.form_dict['fields']
    else :
        fields = "*"
    return frappe.db.get_all("Province",fields=fields)

@frappe.whitelist(allow_guest=True)
def get_all_amphure():
    
    if 'fields' in frappe.form_dict :
        fields = frappe.form_dict['fields']
    else :
        fields = "*"
    if 'filters' in frappe.form_dict :
        filters = frappe.form_dict['filters']
    else :
        filters = {}
    return frappe.db.get_all("Amphure",fields=fields,filters=filters)


@frappe.whitelist(allow_guest=True)
def get_all_tambon():
    
    if 'fields' in frappe.form_dict :
        fields = frappe.form_dict['fields']
    else :
        fields = "*"
    if 'filters' in frappe.form_dict :
        filters = frappe.form_dict['filters']
    else :
        filters = {}
    return frappe.db.get_all("Tambon",fields=fields,filters=filters)


class Province(Document):
    
    name_en : str
    name_th : str
    
    pass
