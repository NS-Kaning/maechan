# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MaechanConfig(Document):
    
    seal : str
    title : str
    mayor_name : str
    mayor_position : str
    pass
