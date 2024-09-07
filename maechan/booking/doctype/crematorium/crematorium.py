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

		crematorium_name: DF.Data | None
		crematory: DF.Link | None
	# end: auto-generated types

	pass
