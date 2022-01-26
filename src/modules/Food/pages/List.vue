<template>
  <q-page class="q-pt-md q-pl-md">
    <div class="row">
      <div class="col-10 row wrap justify-between" :key="foodList">
        <food-card
          v-for="food in foods"
          :key="food.id"
          :isOnUser="false"
          :food="food"
          @onUpdate="userList++"
        ></food-card>
      </div>

      <div class="col-2 column justify-start items-center content-center" :key="userList">
        <div class="text-h4 text-center q-mb-lg">
          Mis Comidas
        </div>
        <food-card
          v-for="food in user.foods"
          :isOnUser="true"
          :key="food.id"
          :food="food"
          @onDelete="userList++"
        ></food-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import foodService from "../services/food.service";
import authService from "../../Auth/services/auth.service";
import FoodCard from "../components/FoodCard.vue";
export default defineComponent({
  name: "FoodList",
  components: {
    FoodCard,
  },
  setup() {
    const service = foodService();
    const auth = authService();
    const foodList = ref<number>(1);
    const userList = ref<number>(10000);

    const loadFoods = async () => {
      await service.loadFoods();
    };

    loadFoods();

    return {
      foods: service.foods,
      user: auth.userData,
      userList,
      foodList
    };
  },
});
</script>
