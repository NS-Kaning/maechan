<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import Multiselect from 'vue-multiselect'

export default {
  components: { GoogleMap, Marker, InfoWindow, Multiselect },
  data() {
    return {
      greeting: 'Chaow!',
      houses: [],
      districts: [],
      center: { lat: 20.138951, lng: 99.854991 },
      apiKey : null,

      zoom: 15,

      form: {
        disrtict: null,
      },
    }
  }, async mounted() {


    this.apiKey = await frappe.db.get_single_value('MaechanConfig', 'google_api_key')

    let houses = await this.getHouses();
    let districts = await frappe.db.get_list('District', { fields: ["*"], order_by:"moo asc" })

    this.houses = houses
    this.districts = districts
  },
  methods: {
    getHouses: async function (district_id) {
      if (district_id) {
        let response = await frappe.call({
          method: "maechan.maechan_core.api.house_chart",
          args: {
            district_id: district_id
          },
        })
        let houses = response.message
        return houses;
      }else {
        let response = await frappe.call({
          method: "maechan.maechan_core.api.house_chart",
          args: {
          },
        })
        let houses = response.message
        return houses;

      }
    },
    filterHouse: async function (option, id) {
      let district = this.form.district;
      if (district) {
        let district_name = district.name
        let houses = await this.getHouses(district_name);
        this.houses = houses;
      } else {
        let houses = await this.getHouses();
        this.houses = houses;
      }

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
      <multiselect @remove="filterHouse" @select="filterHouse" v-model="form.district" :options="districts"
        track-by="name" label="text_display"></multiselect>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col" v-if="apiKey">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 80vh" :center="center"
        :zoom="zoom">
        <Marker v-for="d in houses" :options="{ position: { lat: d.house_lat, lng: d.house_lng } }">
          <InfoWindow>
            <div id="contet">
              <div id="siteNotice"></div>
              <div id="bodyContent">
                เลขที่ {{ d.house_no }} หมู่ที่ {{ d.house_moo }} ตำบล{{ d.tambon_th }}
                อำเภอ {{ d.amphure_th }} จังหวัด {{ d.province_th }}
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>
