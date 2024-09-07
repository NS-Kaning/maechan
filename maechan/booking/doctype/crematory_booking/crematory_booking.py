# Copyright (c) 2024, SE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CrematoryBooking(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		crematorium: DF.Link | None
		date: DF.Date | None
		time: DF.Literal["13.00-14.00", "14.00-15.00"]
	# end: auto-generated types

	pass

