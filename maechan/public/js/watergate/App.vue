<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import Multiselect from 'vue-multiselect'

export default {
  components: { GoogleMap, Marker, InfoWindow, Multiselect },
  data() {
    return {
      waterGates: [],
      center: { lat: 20.138951, lng: 99.854991 },
      apiKey: null,
      zoom: 15,
      test : null,

      red: 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png',
      orange: 'https://maps.google.com/mapfiles/kml/paddle/orange-circle.png',
      yellow: 'https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
      blue: 'https://maps.google.com/mapfiles/kml/paddle/blu-circle.png',

    }
  }, async mounted() {
    this.apiKey = await frappe.db.get_single_value('MaechanConfig', 'google_api_key')

    let waterGates = await this.getWaterGates();

    this.waterGates = waterGates
  },
  methods: {
    getWaterGates: async function () {
      let response = await frappe.call({
        method: "maechan.maechan_water.api.list_watergates",
        args: {

        },
      })
      let waterGates = response.message
      return waterGates;
    },

    openclose: async function (waterGate) {
      waterGate.isOpenInfo = false;
      let response = await fetch(`/api/resource/WaterGate/${waterGate.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "X-Frappe-CSRF-Token": frappe.csrf_token
        },
        body: JSON.stringify({
          "status": waterGate.status === "เปิด" ? "ปิด" : "เปิด"
        })
      })

      let result = await response.json()
    
      waterGate.status = result.data.status
      waterGate.isOpenInfo = false;
    },

    openCloseInfo : async function(waterGate) {
      // if (waterGate.isOpenInfo) {
      //   waterGate.isOpenInfo = false;
      // }else {
      //   waterGate.isOpenInfo = true;
      // }
    },

    getIcon : function (waterGate){
      if (waterGate.status == "เปิด") {
        return this.blue
      }else {
        return this.orange
      }
    }
  }
}
</script>

<style>
@import "vue-multiselect/dist/vue-multiselect.css";
</style>

<template>
  <div class="row mt-3">
    <div class="col" v-if="apiKey">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 80vh" :center="center" :zoom="zoom">
        <Marker @click="()=>d.isOpenInfo =false" v-for="d in waterGates" :options="{ icon : {url : getIcon(d), scaledSize:{width:40,height:40}} ,position: { lat: d.lat, lng: d.lng } }">
          <InfoWindow v-model="d.isOpenInfo">
            <div id="contet">
              <div id="siteNotice"></div>
              <div id="bodyContent">
                {{ d.name }} <br />
                <b>สถานะประตู</b> {{ d.status }} <br />
                <img :src="d.image" style="width: 10vw; height: auto;" />
                <br />
                <button class="btn btn-info" @click="openclose(d)">เปิด/ปิด ประตู</button>

              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>
