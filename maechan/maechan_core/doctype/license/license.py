# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt
import qrcode
import json
import base64
import datetime

from io import BytesIO

import frappe
import frappe.utils
from frappe.model.document import Document
from frappe.types import DF
from qrcode.main import QRCode
from maechan.maechan_core.doctype.maechanconfig.maechanconfig import MaechanConfig

def getQrCodeBase64(type,name) :
    qrdict = {
		"type" : type,
		"name" : name
	}
    
    qrdict = json.dumps(qrdict)
    
    qr = QRCode(
		version=1,
		error_correction=qrcode.ERROR_CORRECT_L,
		box_size=10,
		border=4,
	)
    qr.add_data(qrdict)
    qr.make(fit=True)
    img = qr.make_image()
    
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str 


    


class License(Document):
    
    issuer_name : DF.Data
    issue_position : DF.Data
    license_signature_img : DF.Data
    license_end_date : DF.Date
    license_approve_status : DF.Data
    
    
    def before_submit(self) :
        if(self.license_approve_status in ("สร้าง","ระหว่างการพิจารณา","รออนุมัติ","ยกเลิก")) :
            return
        
        if self.license_signature_img == None or self.license_signature_img == "" :
           frappe.throw("ยังไม่ได้แนบลายเซ็นต์")
           
    def before_insert(self) :
        
        maechanConfig : MaechanConfig = frappe.get_single("MaechanConfig") # type: ignore
        
        if self.issuer_name == None  or self.issuer_name == "":
            self.issuer_name = maechanConfig.mayor_name
        
        if self.issue_position == None  or self.issue_position == "":
            self.issue_position = maechanConfig.mayor_position
            
        if self.license_seal == None or self.license_seal == "" :
           self.license_seal = maechanConfig.seal 
           
        if self.license_signature_img == None or self.license_signature_img == "" :
           self.license_signature_img = maechanConfig.mayor_signature 
           
    
    def before_save(self) :
        
        maechanConfig : MaechanConfig = frappe.get_single("MaechanConfig") # type: ignore
        
        if self.issuer_name == None  or self.issuer_name == "":
            self.issuer_name = maechanConfig.mayor_name
        
        if self.issue_position == None  or self.issue_position == "":
            self.issue_position = maechanConfig.mayor_position
            
        if self.license_seal == None or self.license_seal == "" :
           self.license_seal = maechanConfig.seal 
        
        
    def _update_qr_code(self) :
        qrcode_base64 = 'data: image/png;base64, '+getQrCodeBase64("License",self.name)
        self.db_set('qr_code_base64',qrcode_base64)
        frappe.db.commit()

        
    def on_update(self) :
        self._update_qr_code()

    def after_rename(self, old, new, merge=False):
        self._update_qr_code()
