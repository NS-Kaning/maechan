# Copyright (c) 2024, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Crematorium(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		crematorium_name: DF.Literal["\u0e40\u0e15\u0e321", "\u0e40\u0e15\u0e322", "\u0e40\u0e15\u0e323"]
		crematory: DF.Literal["\u0e27\u0e31\u0e141", "\u0e27\u0e31\u0e142", "\u0e27\u0e31\u0e143"]
		date: DF.Date | None
		time: DF.Time | None
	# end: auto-generated types

	pass
