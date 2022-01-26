import { Food } from "../interafaces/food.interfaces";
import { ref } from "vue";
import { api } from "../../../boot/axios";

const foods = ref<Food[]>([]);

export default () => {
  const loadFoods = async (): Promise<void> => {
    const { data } = await api.get<Food[]>("/foods", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    foods.value = data;
  };

  return {
    foods,
    loadFoods
  };
};
