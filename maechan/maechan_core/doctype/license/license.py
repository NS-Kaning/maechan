# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt
import qrcode
import json
import base64
import datetime
import uuid

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


def getQrCodeBase64WithUUID(type,uuid) :
    qrdict = {
        "type" : type,
        "uuid" : uuid
    }
    
    qrdict = json.dumps(qrdict)
    
    qr = QRCode(
        version=10, 
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
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from maechan.maechan_core.doctype.licenseapprovehistory.licenseapprovehistory import LicenseApproveHistory
        from maechan.maechan_core.doctype.licensedetail.licensedetail import LicenseDetail

        amended_from: DF.Link | None
        approve_histories: DF.Table[LicenseApproveHistory]
        house_amphur: DF.Data | None
        house_id: DF.Link | None
        house_moo: DF.Data | None
        house_no: DF.Data | None
        house_province: DF.Data | None
        house_road: DF.Data | None
        house_soi: DF.Data | None
        house_tambon: DF.Data | None
        issue_position: DF.Data | None
        issuer_name: DF.Data | None
        license_applicant: DF.Data | None
        license_applicant_address_amphur: DF.Link | None
        license_applicant_address_amphur_th: DF.Data | None
        license_applicant_address_district: DF.Link | None
        license_applicant_address_district_th: DF.Data | None
        license_applicant_address_moo: DF.Data | None
        license_applicant_address_no: DF.Data | None
        license_applicant_address_province: DF.Link | None
        license_applicant_address_province_th: DF.Data | None
        license_applicant_address_road: DF.Data | None
        license_applicant_address_soi: DF.Data | None
        license_applicant_by: DF.Data | None
        license_applicant_ethnicity: DF.Data | None
        license_applicant_fax: DF.Data | None
        license_applicant_nationality: DF.Data | None
        license_applicant_telephone: DF.Data | None
        license_applicant_title: DF.Data | None
        license_applicant_type: DF.Literal["\u0e1a\u0e38\u0e04\u0e04\u0e25\u0e18\u0e23\u0e23\u0e21\u0e14\u0e32", "\u0e19\u0e34\u0e15\u0e34\u0e1a\u0e38\u0e04\u0e04\u0e25"]
        license_approve_status: DF.Literal["\u0e2a\u0e23\u0e49\u0e32\u0e07", "\u0e23\u0e30\u0e2b\u0e27\u0e48\u0e32\u0e07\u0e01\u0e32\u0e23\u0e1e\u0e34\u0e08\u0e32\u0e23\u0e13\u0e32", "\u0e23\u0e2d\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34", "\u0e2d\u0e19\u0e38\u0e21\u0e31\u0e15\u0e34", "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01", "\u0e2b\u0e21\u0e14\u0e2d\u0e32\u0e22\u0e38"]
        license_end_date: DF.Date | None
        license_enddate: DF.Literal["-", "60\u0e27\u0e31\u0e19", "60\u0e27\u0e31\u0e19 \u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e41\u0e25\u0e49\u0e27", "30\u0e27\u0e31\u0e19", "30\u0e27\u0e31\u0e19 \u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e41\u0e25\u0e49\u0e27", "15\u0e27\u0e31\u0e19", "15\u0e27\u0e31\u0e19 \u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e41\u0e25\u0e49\u0e27", "\u0e2b\u0e21\u0e14\u0e2d\u0e32\u0e22\u0e38"]
        license_extra: DF.Table[LicenseDetail]
        license_fee: DF.Currency
        license_main_type: DF.Data | None
        license_receipt_number: DF.Data | None
        license_seal: DF.AttachImage | None
        license_signature_img: DF.AttachImage | None
        license_start_date: DF.Date | None
        license_type: DF.Link | None
        qr_code_base64: DF.LongText | None
        receipt_date: DF.Date | None
        telephone: DF.Data | None
        uuid: DF.Data | None
        workflow_state: DF.Link | None
    # end: auto-generated types

        
    
    def before_submit(self) :
        if(self.license_approve_status in ("สร้าง","ระหว่างการพิจารณา","รออนุมัติ","ยกเลิก")) :
            return
        
        if self.license_signature_img == None or self.license_signature_img == "" :
            signatures = frappe.db.get_list('MaechanUserProfile',fields = "*",filters={
                "signature_owner" : frappe.session.user
            })
            
            if(len(signatures) == 0 ):
                frappe.throw("ยังไม่ได้แนบลายเซ็นต์")
            else :
                sig = signatures[0]
                self.license_signature_img = sig['signature']
           
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
        '''
        ปรับปรุงการทำงาน ตรวจสอบว่า qrcode มีอยู่หรือไม่ ถ้ามีอยู่แล้วไม่ต้องสร้างใหม่ แต่ถ้าไม่มี
        ให้สร้างใหม่ โดยการใช้ โครงกสร้างใหม่
        '''
        if(self.qr_code_base64 is None or self.qr_code_base64 == "") :
            
            if(self.uuid is None or self.uuid == "") :
                self.uuid = uuid.uuid4().__str__()
                self.db_set('uuid',self.uuid)
                frappe.db.commit()
            
            qrcode_base64 = 'data: image/png;base64, '+getQrCodeBase64WithUUID("License",self.uuid)
            self.db_set('qr_code_base64',qrcode_base64)
            frappe.db.commit()
        
        
    def on_update(self) :
        self._update_qr_code()

    def after_rename(self, old, new, merge=False):
        self.db_set('qr_code_base64',None)
        self.qr_code_base64 = None
        frappe.db.commit()
        self._update_qr_code()
