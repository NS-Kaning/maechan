# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Tambon(Document):
    
    name_th : str
    name_en : str
    amphure_id : str
    zipcode : str
    province_id : str
    amphure_th : str
    province_th : str
    
    
    pass
