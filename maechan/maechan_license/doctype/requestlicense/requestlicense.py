# Copyright (c) 2024, SE and contributors
# For license information, please see license.txt

from typing import List
import frappe
from frappe.model.naming import getseries
from frappe.model.document import Document
from maechan.maechan_license.doctype.requestlicensetype.requestlicensetype import RequestLicenseType


class RequestLicense(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF
        from maechan.maechan_license.doctype.attachment.attachment import Attachment
        from maechan.maechan_license.doctype.checklist.checklist import CheckList
        from maechan.maechan_license.doctype.checklistdetail.checklistdetail import CheckListDetail
        from maechan.maechan_license.doctype.licenseapprovehistory.licenseapprovehistory import LicenseApproveHistory
        from maechan.maechan_license.doctype.requestdetail.requestdetail import RequestDetail

        amended_from: DF.Link | None
        applicant_age: DF.Data | None
        applicant_amphur: DF.Link | None
        applicant_amphur_th: DF.Data | None
        applicant_distict: DF.Link | None
        applicant_distict_th: DF.Data | None
        applicant_ethnicity: DF.Data | None
        applicant_fax: DF.Data | None
        applicant_moo: DF.Data | None
        applicant_name: DF.Data | None
        applicant_nationality: DF.Data | None
        applicant_no: DF.Data | None
        applicant_province: DF.Link | None
        applicant_province_th: DF.Data | None
        applicant_road: DF.Data | None
        applicant_soi: DF.Data | None
        applicant_tel: DF.Data | None
        applicant_title: DF.Data | None
        approve_history: DF.Table[LicenseApproveHistory]
        attachment_extra: DF.Table[Attachment]
        business: DF.Link | None
        checklist_comment: DF.Data | None
        checklist_date: DF.Date | None
        checklist_extra: DF.Table[CheckListDetail]
        checklist_list: DF.Table[CheckList]
        date: DF.Date | None
        house_no: DF.Link | None
        house_tel: DF.Data | None
        license_type: DF.Link | None
        request_extra: DF.Table[RequestDetail]
        request_status: DF.Literal["\u0e2a\u0e23\u0e49\u0e32\u0e07", "\u0e23\u0e2d\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23", "\u0e40\u0e2d\u0e01\u0e2a\u0e32\u0e23\u0e44\u0e21\u0e48\u0e04\u0e23\u0e1a", "\u0e41\u0e01\u0e49\u0e44\u0e02",
                                   "\u0e23\u0e2d\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48", "\u0e44\u0e21\u0e48\u0e1c\u0e48\u0e32\u0e19", "\u0e23\u0e2d\u0e2d\u0e2d\u0e01\u0e43\u0e1a\u0e2d\u0e19\u0e38\u0e0d\u0e32\u0e15", "\u0e04\u0e33\u0e23\u0e49\u0e2d\u0e07\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08", "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"]
        request_type: DF.Link | None
        workflow_state: DF.Link | None
    # end: auto-generated types

    def autoname(self):
        number = getseries('REQ-LICENSE', 5)
        self.name = f"REQ-LICENSE-{number}"
        return self.name
    pass


@frappe.whitelist()
def load_request_license():
    request = frappe.form_dict
    assert 'name' in request

    name = request['name']
    return frappe.get_doc("RequestLicense", name)


@frappe.whitelist()
def load_request_licenses():
    user = frappe.session.user
    result = frappe.db.get_all("RequestLicense", filters={
        'owner': user
    })

    docs: List[RequestLicense] = [frappe.get_doc(
        'RequestLicense', x.name) for x in result]  # type: ignore
    for x in docs:
        x.business = frappe.get_doc('Business', x.business)  # type: ignore
        x.house_no = frappe.get_doc('House', x.house_no)  # type: ignore

    return docs


@frappe.whitelist()
def first_step_requestlicense():
    req = frappe.form_dict
    assert 'request' in req

    requestLicense = req['request']

    if 'doctype' not in requestLicense:
        requestLicense['doctype'] = 'RequestLicense'

    requestLicenseObj: RequestLicense = frappe.get_doc(
        requestLicense)  # type: ignore
    requestLicenseObj.save()

    if (requestLicenseObj.request_type):
        reqtypeObj: RequestLicenseType = frappe.get_doc(
            'RequestLicenseType', requestLicenseObj.request_type)  # type: ignore

        for x in reqtypeObj.details:
            found = False
            for i in requestLicenseObj.request_extra:
                if i.key == x.key:
                    found = True
                    break

            if not found:
                requestLicenseObj.append('request_extra', {
                    'key': x.key
                })

        for x in reqtypeObj.attachment:

            found = False
            for i in requestLicenseObj.attachment_extra:
                if i.key == x.key:
                    found = True
                    break

            if not found:
                requestLicenseObj.append('attachment_extra', {
                    'key': x.key
                })

        for x in reqtypeObj.checklist_details:

            found = False
            for i in requestLicenseObj.checklist_extra:
                if i.key == x.key:
                    found = True
                    break

            if not found:
                requestLicenseObj.append('checklist_extra', {
                    'key': x.key
                })

        for x in reqtypeObj.checklist:

            found = False
            for i in requestLicenseObj.checklist_list:
                if i.key == x.key:
                    found = True
                    break

            if not found:
                requestLicenseObj.append('checklist_list', {
                    'key': x.key,
                    'title_detail': x.title_detail

                })

        requestLicenseObj.save()

    frappe.response['message'] = requestLicenseObj
