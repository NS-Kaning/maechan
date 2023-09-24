frappe.ready(function() {

	let provinces = []
	let amphures = []
	let tambons = []

	frappe.call("maechan.maechan_core.doctype.province.province.get_all_province",{
		fields:"*",
	}).then((r)=>{
		console.log(r)
		provinces = r.message
		frappe.web_form.set_df_property("license_applicant_address_province_th", "options", provinces.map(r=>r.name_th));

	})
	frappe.web_form.on("license_applicant_address_province_th", (field)=>{
		console.log(field.value)
		let filter_provinces = provinces.filter(x=>x.name_th == field.value)
		if(filter_provinces.length > 0 ) {
			let selProvince = filter_provinces[0].name
			

			frappe.call("maechan.maechan_core.doctype.province.province.get_all_amphure",{
				filters : {
					province_id : selProvince,
				},
				fields:"*",
			}).then((r)=>{
				console.log(r)
				amphures = r.message
				frappe.web_form.set_df_property("license_applicant_address_amphur_th", "options", amphures.map(r=>r.name_th));
				frappe.web_form.set_df_property("license_applicant_address_district_th", "options", []);
				frappe.web_form.set_value("license_applicant_address_amphur_th", null)
				frappe.web_form.set_value("license_applicant_address_district_th", null)

			})
		}
	});

	frappe.web_form.on("license_applicant_address_amphur_th", (field)=>{
		console.log(field.value)
		let filter_amphur = amphures.filter(x=>x.name_th == field.value)
		if(filter_amphur.length > 0 ) {
			let selAmphur = filter_amphur[0].name
			

			frappe.call("maechan.maechan_core.doctype.province.province.get_all_tambon",{
				filters : {
					amphure_id : selAmphur,
				},
				fields:"*",
			}).then((r)=>{
				console.log(r)
				tambons = r.message
				frappe.web_form.set_df_property("license_applicant_address_district_th", "options", tambons.map(r=>r.name_th));
				frappe.web_form.set_value("license_applicant_address_district_th", null)

			})
		}
	});

})