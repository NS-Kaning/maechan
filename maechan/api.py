import json
import base64
from io import BytesIO

import frappe
import frappe.utils
import frappe.utils.logger
from frappe.utils.oauth import login_oauth_user, login_via_oauth2_id_token, get_info_via_oauth

from maechan.maechan_core.doctype.license.license import License


frappe.utils.logger.set_log_level("DEBUG")
logger = frappe.logger("maechan.api", allow_site=True, file_count=50)


@frappe.whitelist(allow_guest=True)
def hello():
    frappe.response['message'] = "Hello from code"


@frappe.whitelist(allow_guest=True)
def land_chart():

    request = frappe.form_dict

    if "district_id" in request:
        district_id = request['district_id']
        lands = frappe.db.get_all(
            "Land", filters={"district_id": district_id}, fields='*')
    else:
        lands = frappe.db.get_all("Land", fields='*')

    frappe.response['message'] = lands
    # frappe.response['request'] = request


@frappe.whitelist(allow_guest=True)
def house_chart():
    request = frappe.form_dict

    if "district_id" in request:
        district_id = request['district_id']
        houses = frappe.db.get_all(
            "House", filters={"district_id": district_id}, fields='*')
    else:
        houses = frappe.db.get_all("House", fields='*')

    frappe.response['message'] = houses
    # frappe.response['request'] = request


@frappe.whitelist(allow_guest=True)
def license_preivew() :
    request = frappe.form_dict
    if request['type'] == "License" :
        
        if 'name' in request :
            doc_name = request['name']
            doc : License = frappe.get_doc("License", doc_name) # type: ignore
            
            from frappe.core.doctype.file.utils import get_local_image
            
            if doc.license_signature_img :
                localImg = get_local_image(doc.license_signature_img)
                buffered = BytesIO()
                localImg[0].save(buffered, format="JPEG")
                img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
                
                doc.license_signature_img = 'data: image/png;base64, ' +  img_str # type: ignore
            
            
            content = frappe.render_template('templates/license/licensedefault.html', {'doc':doc})
            content = f"<html>{content}</html>"
            return content
        
    frappe.throw("Request is invalid")
    
    
@frappe.whitelist(allow_guest=True)
def login_via_line(code: str, state: str):
    provider = "line"
    decoder=decoder_compat
    info = get_info_via_oauth(provider, code, decoder, id_token=True)
    logger.debug("TEST")
    logger.debug(info)
    login_oauth_user(info, provider=provider, state=state)

def decoder_compat(b):
	# https://github.com/litl/rauth/issues/145#issuecomment-31199471
	return json.loads(bytes(b).decode("utf-8"))
