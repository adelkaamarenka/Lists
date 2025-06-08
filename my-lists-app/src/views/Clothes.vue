<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import ClothesCard from "../components/clothes/ClothesCard.vue";

onMounted(async () => {
  const response = await axios.get("/api/jf_list");
  console.log(response.data);
  jFashItems.value = response.data;
});

const jFashItems = ref([]);
const newItem = ref("");
/* const shoppingLists = [
  {
    imgUrl: "/clothes/lolita-dress.png",
    listTitle: "J-Fashion",
    itemsList: jFashItems.value,
  },
  {
    imgUrl: "/clothes/named.png",
    listTitle: "Others",
    itemsList: [],
  },
  {
    imgUrl: "/clothes/justin_tshirt.png",
    listTitle: "Justin",
    itemsList: [],
  },
];
 */
const shoppingLists = computed(() => [
  {
    imgUrl: "/clothes/lolita-dress.png",
    listTitle: "J-Fashion",
    itemsList: jFashItems.value,
  },
  {
    imgUrl: "/clothes/named.png",
    listTitle: "Others",
    itemsList: [],
  },
  {
    imgUrl: "/clothes/justin_tshirt.png",
    listTitle: "Justin",
    itemsList: [],
  },
]);

const addItem = async () => {
  if (newItem.value.trim()) {
    await axios.post("/api/jf_list", { item: newItem.value });
    const response = await axios.get("/api/jf_list"); // Refresh the list
    list.value = response.data;
    newItem.value = "";
  }
};
</script>

<template>
  <div class="flex gap-35 h-200">
    <div v-for="list in shoppingLists">
      <ClothesCard v-bind="list" />
    </div>
  </div>
</template>

<style scoped></style>
