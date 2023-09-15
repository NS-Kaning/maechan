# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from maechan.maechan_core.doctype.district.district import District

class House(Document):
    
    district_id : str
    house_moo : str
    tambon_th : str
    amphure_th : str
    province_th : str
    text_display : str
    house_no : str
    
    
    def before_save(self) :
        doc = self
        if doc.district_id :
            district : District = frappe.get_doc("District",doc.district_id) # type: ignore
            
            doc.house_moo = district.moo
            doc.tambon_th = district.tambon_th
            doc.amphure_th = district.amphure_th
            doc.province_th = district.province_th
            
            doc.text_display = f"{doc.house_no} หมู่ {doc.house_moo} {doc.tambon_th} {doc.amphure_th} {doc.province_th}"
    pass
