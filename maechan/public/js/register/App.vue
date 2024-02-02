<template>
   <form @submit.prevent="submit">
      <div class="page-card container">
         <div class="form-group">
            <p>ชื่อ-สกุล</p><input type="text" v-model.trim="registerForm.fullname" required />
         </div>
         <div class="form-group col-75">
            <p>e-mail</p><input type="email" v-model="registerForm.email" required />
         </div>
         <div class="form-group col-75">
            <p>เบอร์โทรศัพท์</p><input type="text" v-model="registerForm.tel" required />
         </div>
         <div class="row">
            <div class="form-group col-50">
               <p>สัญชาติ</p><input type="text" v-model="registerForm.nationality" required />
            </div>
            <div class="form-group col-50">
               <p>วัน/เดือน/ปี เกิด</p><input type="date" v-model="registerForm.birthdate" required />
            </div>
         </div>

         <div class="row">
            <div class="form-group col-50">
               <p>บ้านเลขที่</p><input type="text" v-model="registerForm.address_no" required />
            </div>
            <div class="form-group col-50">
               <p>หมู่</p><input type="text" v-model="registerForm.address_moo" required />
            </div>

         </div>
         <div class="row">
            <div class="form-group col-50">
               <p>ตรอก/ซอย</p><input type="text" v-model="registerForm.address_soi">
            </div>
            <div class="form-group col-50">
               <p>ถนน</p><input type="text" v-model="registerForm.address_road">
            </div>
         </div>

         <div class="form-group col-75">
            <p>ตำบล</p><input type="text" v-model="registerForm.address_district" required />
         </div>
         <div class="form-group col-75">
            <p>อำเภอ</p><input type="text" v-model="registerForm.address_amphur" required />
         </div>
         <div class="form-group col-75">
            <p>จังหวัด</p><input type="text" v-model="registerForm.address_province" required />
         </div>
         <div class="form-group" style="display: grid;">
            <button class="btn btn-sm btn-primary btn-signup" type="submit">
               {{ buttonLabel }}
            </button>
         </div>
      </div>
   </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue'

const frappe = window.frappe;

window.disable_signup = false;

let buttonLabel = ref('Sign up');
let registerForm = reactive({
   fullname: "",
   nationality: "",
   birthdate: "",
   tel: "",
   email: "",
   address_no: "",
   address_moo: "",
   address_soi: "",
   address_road: "",
   address_district: "",
   address_amphur: "",
   address_province: "",
})
async function submit() {
   try {
      await checkEmail();
      if (buttonLabel.value == "Sign up") {
         await Promise.all([signup(), register()]);
         await addUserPermission();
      }
   } catch (error) {
      console.error(error);
   }

}
async function signup() {
   return frappe.call("maechan.api.createUser", {
      ...registerForm
   });
}
async function register() {
   return frappe.call("maechan.api.register", {
      ...registerForm
   })
}

async function addUserPermission() {
   return frappe.call("maechan.api.addUserPermission", {
      ...registerForm
   })
}

function checkEmail() {
   frappe.call("maechan.api.checkEmail", {
      ...registerForm
   }).then(r => {
      buttonLabel.value = (r.message) ? "Email Already Registered" : "Sign up";
   })
}

</script>

<style>
#page-register {
   background-color: var(--bg-light-gray)
}

.page-card {
   padding: 45px 10px;
   background-color: #fff;
   max-width: 400px;
   margin: 0 auto;
   border-radius: var(--border-radius-md);
   border: 1px solid var(--border-color);
}

.page-card .form-group {
   padding-inline: 15px;
   margin: 0%;
}

.page-card p {
   font-size: var(--text-sm);
   font-weight: var(--weight-regular);
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="number"] {
   border: none;
   color: var(--text-color);
   background-color: var(--control-bg);
   margin-bottom: 1rem;
   height: 28px;
   width: -webkit-fill-available;
   border-radius: 8px;
}

.row {
   display: flex;
   flex-wrap: nowrap;
   margin: 0%;
}

.col-30 {
   flex-basis: 0;
   flex-grow: 1;
   max-width: 33%;
}

.col-50 {
   flex-basis: 0;
   flex-grow: 1;
   max-width: 50%;
}

.col-75 {
   flex-basis: 0;
   flex-grow: 1;
   max-width: 75%;
}


.web-footer {
   display: none;
}
</style>