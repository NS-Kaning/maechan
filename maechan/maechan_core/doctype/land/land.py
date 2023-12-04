# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Land(Document):
    
    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.types import DF

        geojson: DF.JSON | None
        lat : DF.Float
        lng : DF.Float
        lot : DF.Data
        parcel_no : DF.Data
        zone_id : DF.Data
        block_id : DF.Data
        land_owner : DF.Data
        land_size : DF.Data
        land_type : DF.Data
    
    pass
