import {
  ErrorResponse,
  LoginResponse,
  User,
} from "../interfaces/auth.interfaces";
import { ref } from "vue";
import axios from "axios";
import { AxiosError } from "axios";
import { api } from "../../../boot/axios";

const userData = ref<User>({
  id: 0,
  name: "",
  lastName: "",
  email: "",
  isAdmin: false,
  foods: [],
});

export default () => {
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.post<LoginResponse>("/user/login", {
        email,
        password,
      });
      userData.value = data.user;
      localStorage.token = data.token;
    } catch (error) {
      return false;
    }

    return true;
  };

  const getInfoByToken = async (): Promise<boolean> => {
    if (!localStorage.token) {
      return false;
    }

    try {
      const { data } = await api.get<User>("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      userData.value = data;
    } catch (error) {
      return false;
    }

    return true;
  };

  const logout = (): boolean => {
    localStorage.removeItem("token");
    userData.value = {
      id: 0,
      name: "",
      lastName: "",
      email: "",
      isAdmin: false,
      foods: [],
    };
    return true;
  };

  const register = async (user: User, password: string): Promise<string[]> => {
    try {
      await api.post<User>("/user", {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: password,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;
        if (serverError && serverError.response) {
          const list: string[] = [];
          const errors = serverError.response.data.errors;

          Object.entries(errors).forEach(([key, value]) => {
            const subList = value as [];

            subList.forEach((i) => list.push(i));
          });

          return list;
        }
      }
    }

    return ["created"];
  };

  const addFood = async (foodId: number): Promise<string[]> => {
    try {
      const response = await api.put<User>(
        "/user/food",
        {
          user_id: userData.value.id,
          food_id: foodId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );

      userData.value = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;
        if (serverError && serverError.response) {
          const list: string[] = [];
          const errors = serverError.response.data.errors;

          Object.entries(errors).forEach(([key, value]) => {
            const subList = value as [];

            subList.forEach((i) => list.push(i));
          });

          return list;
        }
      }
    }
    return ["updated"];
  };

  const removeFood = async (foodId: number): Promise<string[]> => {
    try {
      const response = await api.delete<User>("/user/food", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        data: {
          user_id: userData.value.id,
          food_id: foodId,
        },
      });

      userData.value = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;
        if (serverError && serverError.response) {
          const list: string[] = [];
          const errors = serverError.response.data.errors;

          Object.entries(errors).forEach(([key, value]) => {
            const subList = value as [];

            subList.forEach((i) => list.push(i));
          });

          return list;
        }
      }
    }
    return ["updated"];
  };
  return {
    //model
    userData,

    //functions
    login,
    getInfoByToken,
    logout,
    register,
    addFood,
    removeFood,
  };
};
