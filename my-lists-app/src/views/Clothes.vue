<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import ClothesCard from "../components/clothes/ClothesCard.vue";

const placeholderList = [
  {
    name: "No data",
    url: "",
    comment: ":(",
    price: "3",
  },
];

const loading = ref({
  jf: true,
  others: true,
  justin: true,
});

const error = ref({
  jf: null,
  others: null,
  justin: null,
});

const fetchList = async (url, targetRef, type) => {
  try {
    const response = await axios.get(url);
    targetRef.value = Array.isArray(response.data)
      ? response.data
      : placeholderList;
  } catch (err) {
    error.value[type] = err.message || "Error fetching data";
    targetRef.value = placeholderList;
  } finally {
    loading.value[type] = false;
  }
};

const getLists = () => {
  fetchList("/api/items?type=jf", jFashItems, "jf");
  fetchList("/api/items?type=others", othersItems, "others");
  fetchList("/api/items?type=justin", justinItems, "justin");
};

onMounted(() => {
  getLists();
});

const jFashItems = ref([]);
const othersItems = ref([]);
const justinItems = ref([]);

const shoppingLists = computed(() => [
  {
    imgUrl: "/clothes/lolita-dress.png",
    listTitle: "J-Fashion & Dresses",
    listName: "jf",
    itemsList: jFashItems.value,
  },
  {
    imgUrl: "/clothes/named.png",
    listTitle: "Others",
    listName: "others",
    itemsList: othersItems.value,
  },
  {
    imgUrl: "/clothes/justin_tshirt.png",
    listTitle: "Justin",
    listName: "justin",
    itemsList: justinItems.value,
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
