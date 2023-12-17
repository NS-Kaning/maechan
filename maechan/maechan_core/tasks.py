import frappe
from datetime import datetime

def update_expired_license():
    today = datetime.today()
    today_str = today.strftime("%Y-%m-%d")
    filters={
        'license_end_date': ['<',datetime.today()],
        'workflow_state' : ['!=','Expired']
        }
    expired_license = frappe.db.get_list('License',fields=['name'],filters=filters)
    try :
        for i in expired_license :
            frappe.db.set_value('License',i.name,'workflow_state','Expired')
            
        frappe.db.commit()
    except :
        frappe.db.rollback(save_point='before_update_expired')
        
    pass