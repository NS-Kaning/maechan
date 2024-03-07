import frappe
from frappe.query_builder import DocType,Order
from maechan.maechan_core.doctype.license.license import License
from maechan.maechan_core.doctype.house.house import House

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
def license_chart():
    request = frappe.form_dict
    
    license_doctype : License = frappe.qb.DocType('License') # type: ignore
    house_doctype : House = frappe.qb.DocType('House') # type: ignore
    select_fields = [
        
    ]

    if "district_id" in request:
        
        
        district_id = request['district_id']

        licenses = (frappe.qb.from_(license_doctype) 
                        .inner_join(house_doctype)                                  # type: ignore
                        .on(license_doctype.house_id == house_doctype.name)         # type: ignore
                        .where(license_doctype.license_end_date >= frappe.utils.add_days(frappe.utils.nowdate(),-90))
                        .where( (license_doctype.workflow_state == 'Approved') | (license_doctype.workflow_state == 'Expired'))
                        .where(house_doctype.district_id == district_id)
                        .select(
                            license_doctype.name.as_('license_name'),
                            license_doctype.license_end_date,
                            
                            license_doctype.license_main_type,
                            license_doctype.license_applicant_title,
                            license_doctype.license_end_date,
                            license_doctype.license_end_date,

                            license_doctype.workflow_state,

                            house_doctype.house_no,
                            house_doctype.house_moo,
                            house_doctype.tambon_th,
                            house_doctype.amphure_th,
                            house_doctype.province_th, 
                            
                            house_doctype.name.as_('house_name'),
                            house_doctype.house_lat,
                            house_doctype.house_lng,
                        )).run(as_dict=True)                             # type: ignore



    else:

        licenses = (frappe.qb.from_(license_doctype)                            # type: ignore
                        .inner_join(house_doctype)                              # type: ignore
                        .on(license_doctype.house_id == house_doctype.name)     # type: ignore
                        .where(license_doctype.license_end_date >= frappe.utils.add_days(frappe.utils.nowdate(),-90))
                        .where( (license_doctype.workflow_state == 'Approved') | (license_doctype.workflow_state == 'Expired'))
                        .select(
                            license_doctype.name.as_('license_name'),
                            license_doctype.license_end_date,
                            
                            license_doctype.license_main_type,
                            license_doctype.license_applicant_title,
                            license_doctype.license_end_date,
                            license_doctype.license_end_date,

                            license_doctype.workflow_state,

                            house_doctype.house_no,
                            house_doctype.house_moo,
                            house_doctype.tambon_th,
                            house_doctype.amphure_th,
                            house_doctype.province_th,  

                            house_doctype.name.as_('house_name'),
                            house_doctype.house_lat,
                            house_doctype.house_lng,

                            

                        )).run(as_dict=True) 

    frappe.response['message'] = licenses
    # frappe.response['request'] = request


def district_list():
    request = frappe.form_dict
    # district = frappe.db.get_list("District", fields="*",order_by=['moo asc','tambon_id asc'])
    district = frappe.qb.from_("District").select("*").orderby('moo',order=frappe.qb.asc).orderby('tambon_id',order=frappe.qb.asc).run(as_dict=True)

    frappe.response['message'] = "District List"
    frappe.response['data'] = district

@frappe.whitelist()
def load_signature() :
    sig = frappe.db.get_all(
        "MaechanUserProfile", filters={"signature_owner": frappe.session.user}, fields='*')
    count = len(sig)
    if count >= 1 :
        frappe.response['message'] = sig
        frappe.response['count'] = len(sig)
    else :
        frappe.response['message'] = None
        frappe.response['count'] = 0 
    pass

@frappe.whitelist()
def update_signature() :
    from typing import List
    from maechan.maechan_core.doctype.maechanuserprofile.maechanuserprofile import MaechanUserProfile
    
    signatures : List[MaechanUserProfile] = frappe.db.get_all(
        "MaechanUserProfile", filters={"signature_owner": frappe.session.user}, fields='*') # type: ignore
    count = len(signatures) # type: ignore
    
    request = frappe.form_dict
    
    if 'signature' in request : 
    
        if count >= 1 :
            #update signature
            sig : MaechanUserProfile  = signatures[0] # type: ignore
            sig  = frappe.get_doc('MaechanUserProfile',sig.name) # type: ignore
            sig.signature = request['signature']
            sig.save()
            pass
        else :
            #create signature
            sig : MaechanUserProfile = frappe.new_doc('MaechanUserProfile') # type: ignore
            sig.signature_owner = frappe.session.user
            sig.signature = request['signature']
            
            sig.insert()
            pass 
        
        
        frappe.response['message'] = sig
    
        