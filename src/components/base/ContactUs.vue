<template>
  <div class="contact-us">
    <v-app-bar class="header" elevation="2">
      <p class="my-auto black-font">ارتباط با ما</p>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </v-app-bar>

    <p class="contact-us-text bold-font my-3">اگر سوال یا بازخوردی دارید، با ما تماس بگیرید!</p>

    <div class="contact-methods">
      <div class="method" style="margin-right: 10px">
        <v-img src="@/assets/whatsapp.png" width="50px" height="50px" ></v-img>
        <a :href="'https://api.whatsapp.com/send?phone=' + whatsappNumber">واتس آپ</a>
      </div>
      <div class="method">
        <img src="@/assets/instagram.png" />
        <a :href="'https://www.instagram.com/' + instagramUsername">اینستاگرام</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whatsappNumber: '+1234567890', // Replace with your WhatsApp number
      instagramUsername: 'example', // Replace with your Instagram username
    };
  },
  methods: {
    close() {
      this.$store.commit("profile/updateSelectedMenuItem", -1);
    },
  },
};
</script>

<style>
.contact-us {
  margin: 0 auto;
  text-align: center;
}

.contact-us-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-us-text {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
}

.method {
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.method i {
  font-size: 3rem;
  color: #333;
  margin-bottom: 10px;
  display: block;
}

.method a {
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
  font-family: 'Regular';
}

.method img {
  background-blend-mode: multiply;
  background-color: transparent;
  width: 30px;
  height: 30px;
}
</style>
