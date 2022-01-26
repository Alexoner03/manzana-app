<template>
  <q-layout view="lHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          🥗 Manzana APP
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple to="/foods">
            <q-item-section avatar>
              <q-icon name="restaurant_menu" />
            </q-item-section>

            <q-item-section> Comidas </q-item-section>
          </q-item>

          <q-expansion-item
            v-if="user.isAdmin"
            expand-separator
            icon="lock"
            label="Admin"
            :content-inset-level="0.5"
          >
            <q-item clickable v-ripple :header-inset-level="0.5" to="/users">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section> Usuarios </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :header-inset-level="0.5"
              to="/admin-food"
            >
              <q-item-section avatar>
                <q-icon name="restaurant_menu" />
              </q-item-section>

              <q-item-section> Comidas </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="close" />
            </q-item-section>

            <q-item-section> Cerrar Sesión </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              :src="`https://ui-avatars.com/api/?name=${user.name}+${user.lastName}`"
            />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.name + " " + user.lastName }}
          </div>
          <div>{{ user.isAdmin ? "Administrador" : "Usuario" }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import authService from "../../Auth/services/auth.service";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FoodLayout",
  setup() {
    const service = authService();
    const router = useRouter();

    const checkLogin = async () => {
      const isLogged = await service.getInfoByToken();
      if (!isLogged) {
        router.replace("/");
      }
    };

    const logout = () => {
      service.logout()
      router.replace("/")
    }

    checkLogin()

    return {
      drawer: ref(false),
      user: service.userData,
      logout
    };
  },
});
</script>
