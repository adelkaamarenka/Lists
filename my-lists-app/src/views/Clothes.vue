<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import ClothesCard from "../components/clothes/ClothesCard.vue";

const getLists = async () => {
  const response = await axios.get("/api/jf_list");
  console.log(response.data, Array.isArray(response.data));
  jFashItems.value = Array.isArray(response.data)
    ? response.data
    : [
        {
          name: "Luisa Sciolli",
          url: "https://luisasciolli.com/",
          comment: "designer",
          price: "3",
        },
        {
          name: "Namedcollective",
          url: "",
          comment: "hoodies, streetwear, tshirts",
          price: "1",
        },
      ];
};

onMounted(async () => {
  getLists();
});

const jFashItems = ref([]);
const newItem = ref("");

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
</script>

<template>
  <div class="flex gap-35 h-200">
    <div v-for="list in shoppingLists">
      <ClothesCard v-bind="list" @updateList="getLists" />
    </div>
  </div>
</template>

<style scoped></style>
