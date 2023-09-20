<script>
import { GoogleMap, Marker, InfoWindow, Polygon } from 'vue3-google-map'
import Multiselect from 'vue-multiselect'
import UTMLatLng from "utm-latlng"
import _ from 'underscore'
import dayjs from 'dayjs'
let DURATION = require('dayjs/plugin/duration')


dayjs.extend(DURATION)

export default {
  components: { GoogleMap, Polygon, Marker, InfoWindow, Multiselect },
  data() {
    return {
      apiKey: null,
      licenses: [],
      infos: [],
      districts: [],
      center: { lat: 20.138951, lng: 99.854991 },
      options: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      },

      zoom: 15,

      form: {
        disrtict: null,
      },
    }
  }, async mounted() {

    this.apiKey = await frappe.db.get_single_value('MaechanConfig', 'google_api_key')

    let licenses = await this.getLicenses()
    let districts = await frappe.db.get_list('District', { fields: ["*"] })

    for (let i = 0; i < licenses.length; i++) {
      licenses[i].showInfo = false;
    }

    this.licenses = licenses;
    this.districts = districts
  },
  methods: {
    getDurationDays : function(day){
      let end_date = dayjs(day)
      let today = dayjs()

      let duration = dayjs.duration(today.diff(end_date))
      let days =  duration.asDays()

      return parseInt(Math.abs(days))
    },
    getLicenses: async function (district_id) {
      let licenses = []
      if (district_id) {
        let response = await frappe.call({
          method: "maechan.maechan_core.api.license_chart",
          args: {
            district_id: district_id
          },
        })
        licenses = response.message
      } else {
        let response = await frappe.call({
          method: "maechan.maechan_core.api.license_chart",
          args: {
          },
        })
        licenses = response.message
      }

      let test = _.groupBy(licenses, (l) => l.house_id)
      console.log(test);
      _.each(test, (v) => console.log(v));


      return test;

    },
    filterLicense: async function (option, id) {
      let district = this.form.district;
      if (district) {
        let district_name = district.name
        let licenses = await this.getLicenses(district_name);
        this.licenses = licenses;
      } else {

        let licenses = await this.getLicenses();
        this.licenses = licenses;
      }

    },
    showInfo: function (license) {
      this.infos.push(license)
    },
    closeInfo: function (license) {
      let index = this.infos.indexOf(license)
      this.infos.splice(index, 1)
      // console.log(this.infos);
    }
  }
}
</script>

<style>
@import "vue-multiselect/dist/vue-multiselect.css";
</style>

<template>
  <div class="row">
    <div class="col-6">
      <multiselect @remove="filterLicense" @select="filterLicense" v-model="form.district" :options="districts"
        track-by="name" label="text_display"></multiselect>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col" v-if="apiKey">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 600px" :center="center" :zoom="zoom">

        <Marker v-for="license in licenses"
          :options="{ position: { lat: license[0].house_lat, lng: license[0].house_lng } }">
          <InfoWindow>
            <div id="contet">
              <div id="siteNotice"></div>
              <div id="bodyContent">
                <span class="font-bold">เลขที่</span> {{ license[0].house_no }} หมู่ที่ {{ license[0].house_moo }} ตำบล{{
                  license[0].tambon_th }}
                อำเภอ {{ license[0].amphure_th }} จังหวัด {{ license[0].province_th }}

                <hr />
                <template v-for="d in license">

                  <span class="font-bold">ใบอนุญาต</span> {{ d.license_main_type }} <br />
                  <span class="font-bold">ผู้ได้รับใบอนุญาต</span> {{ d.license_applicant_title }} <br />
                  <span class="font-bold">วันหมดอายุ</span> {{ d.license_end_date }}  ({{ getDurationDays(d.license_end_date) }} วัน)<br />
                  <hr />
                </template>


              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>

<style scoped>
.font-bold {
  font-weight: bold;
}
</style>