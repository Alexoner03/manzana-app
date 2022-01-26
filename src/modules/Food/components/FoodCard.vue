<template lang="html">
  <div
    :class="
      isOnUser
        ? 'row q-gutter-md q-mb-lg'
        : 'col-12 col-sm-6 col-md-3 q-gutter-lg q-mb-lg'
    "
  >
    <q-card :style="isOnUser ? 'max-width: 80%' : 'max-width: 90%'">
      <img :src="food.imagePath" />

      <q-card-section>
        <div class="text-h6">{{ food.name }}</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ food.description }}
      </q-card-section>

      <q-card-actions class="flex justify-end">
        <q-btn color="negative" v-if="isOnUser" :loading="isLoading" @click="removeFood(food.id)"
          >Remover de mi Lista
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" /> </template
        ></q-btn>
        <q-btn
          color="primary"
          :loading="isLoading"
          v-else
          @click="addFood(food.id)"
          >Agregar a mi Lista
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" /> </template
        ></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script lang="ts">
import { Food } from "../interafaces/food.interfaces";
import { defineComponent, ref } from "vue";
import authService from "../../Auth/services/auth.service";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FoodCard",
  props: {
    food: Object as () => Food,
    isOnUser: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onUpdate","onDelete"],
  setup(props, { emit }) {
    const auth = authService();
    const $q = useQuasar();
    const isLoading = ref<boolean>(false);

    const addFood = async (foodId: number) => {
      isLoading.value = true;
      const response = await auth.addFood(foodId);
      if (response[0] === "updated") {
        $q.notify("lista actualizada");
        emit("onUpdate");
      } else {
        response.forEach((msg) => $q.notify(msg));
      }
      isLoading.value = false;
    };

    const removeFood = async (foodId: number) => {
      isLoading.value = true;
      const response = await auth.removeFood(foodId);
      if (response[0] === "updated") {
        $q.notify("lista actualizada");
        emit("onDelete");
      } else {
        response.forEach((msg) => $q.notify(msg));
      }
      isLoading.value = false;
    };

    return {
      addFood,
      removeFood,
      isLoading,
    };
  },
});
</script>
<style></style>
