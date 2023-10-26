# Copyright (c) 2023, SE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class LicenseGroup(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from maechan.maechan_core.doctype.licensetypedetail.licensetypedetail import LicenseTypeDetail

		details: DF.Table[LicenseTypeDetail]
		status: DF.Literal['พร้อมใช้งาน', 'อยู่ระหว่างการพัฒนา']
		template: DF.HTMLEditor | None
		template_2: DF.HTMLEditor | None
		template_3: DF.HTMLEditor | None
		template_4: DF.HTMLEditor | None
		template_5: DF.HTMLEditor | None
		template_6: DF.HTMLEditor | None
		template_7: DF.HTMLEditor | None
		template_warning: DF.HTMLEditor | None
		title: DF.Data | None
	# end: auto-generated types
	pass
