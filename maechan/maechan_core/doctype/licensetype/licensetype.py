# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class LicenseType(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from maechan.maechan_core.doctype.licensetypedetail.licensetypedetail import LicenseTypeDetail

		details: DF.Table[LicenseTypeDetail]
		group: DF.Link
		license_type: DF.Literal['ใบอนุญาต', 'หนังสือรับรองการแจ้ง']
		rule_year: DF.Data | None
		title: DF.Data
	# end: auto-generated types
	pass
