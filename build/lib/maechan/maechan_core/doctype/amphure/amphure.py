# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Amphure(Document):
    
    id : str
    name_en : str
    name_th : str
    province_id : str
    province_th : str
    
    pass
