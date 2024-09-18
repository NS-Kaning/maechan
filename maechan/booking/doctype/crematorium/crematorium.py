# Copyright (c) 2024, SE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Crematorium(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		age: DF.Data | None
		canton: DF.Literal[None]
		crematorium_name: DF.Literal["\u0e40\u0e15\u0e321", "\u0e40\u0e15\u0e322", "\u0e40\u0e15\u0e323"]
		crematory: DF.Literal["\u0e27\u0e31\u0e141", "\u0e27\u0e31\u0e142", "\u0e27\u0e31\u0e143"]
		crenatory_type: DF.Autocomplete | None
		date: DF.Date
		date_time: DF.Autocomplete | None
		death_certificate: DF.Attach | None
		district: DF.Literal[None]
		phone: DF.Data | None
		province: DF.Literal[None]
		relationship: DF.Literal["\u0e15\u0e32", "\u0e22\u0e32\u0e22", "\u0e1e\u0e48\u0e2d", "\u0e41\u0e21\u0e48", "\u0e25\u0e39\u0e01", "\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19", "\u0e2a\u0e32\u0e21\u0e35", "\u0e20\u0e23\u0e23\u0e22\u0e32", "\u0e0d\u0e32\u0e15\u0e34"]
		time: DF.Literal["14.00", "15.00", "16.00"]
		username: DF.Data | None
	# end: auto-generated types

	pass

@frappe.whitelist(allow_guest=True) 
def get_meta():
	return frappe.get_meta("Crematorium")