import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../types";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(
    "https://62d742f351e6e8f06f1a83da.mockapi.io/api/produtos"
  );
  return data;
};

export const useProducts = () => {
  return useQuery("products", fetchProducts);
};