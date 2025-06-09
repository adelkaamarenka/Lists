<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import axios from "axios";

const props = defineProps(["imgUrl", "listTitle", "itemsList"]);
const emit = defineEmits("updateList");

const price = (price) => "$".repeat(Number(price));

const isValid = computed(
  () =>
    websiteName.value != "" &&
    websiteURL.value != "" &&
    websitePrice.value != ""
);

const addItem = async () => {
  if (addingItem.value) {
    if (!isValid.value) return;
    try {
      const response = await axios.post("/api/jf_list", {
        name: websiteName.value,
        url: websiteURL.value,
        comment: websiteComment.value,
        price: websitePrice.value,
      });
      console.log("Item added:", response.data);
      websiteName.value = "";
      websiteURL.value = "";
      websiteComment.value = "";
      websitePrice.value = "";
    } catch (error) {
      console.error("Error adding item:", error);
    }
    emit("updateList");
  }
  addingItem.value = !addingItem.value;
};

const deleteItem = async (itemID) => {
  try {
    await axios.delete(`/api/jf_list/${itemID}`);
    console.log("Item deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
  emit("updateList");
};

const addingItem = ref(false);
const websiteName = ref("");
const websiteURL = ref("");
const websiteComment = ref("");
const websitePrice = ref("");

const priceOptions = [
  { value: 1, label: "$" },
  { value: 2, label: "$$" },
  { value: 3, label: "$$$" },
];
</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm" data-theme="valentine">
    <figure class="h-92">
      <img :src="imgUrl" :alt="listTitle" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ listTitle }}</h2>

      <div class="card-actions justify-start">
        <ul class="w-100 list bg-base-100 rounded-box shadow-md">
          <li class="list-row gap-x-1" v-for="item in itemsList">
            <div>
              <div class="list-col-grow">
                <a target="_blank" rel="noopener noreferrer" :href="item.url">{{
                  item.name
                }}</a>
              </div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ item.comment }}
              </div>
            </div>
            <div class="badge badge-md my-1">
              {{ price(item.price) }}
            </div>
            <!-- heart svg -->
            <button
              class="btn btn-sm btn-ghost btn-square"
              @click="openWishlist"
            >
              <svg
                class="size-4.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  ></path>
                </g>
              </svg>
            </button>
            <!-- trash can svg -->
            <button
              class="btn btn-sm btn-ghost btn-square"
              @click="deleteItem(item.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div class="card-actions justify-start" v-show="addingItem">
        <input
          type="text"
          placeholder="Website Name"
          class="input input-neutral"
          v-model="websiteName"
        />
        <input
          type="text"
          placeholder="URL"
          class="input input-neutral"
          v-model="websiteURL"
        />
        <textarea
          class="textarea textarea-neutral"
          placeholder="Comment"
          v-model="websiteComment"
        ></textarea>
        <label for="radio-1">Price</label>
        <div v-for="option in priceOptions" :key="option.value" class="mx-1">
          <input
            type="radio"
            :id="'price_' + option"
            name="radio-1"
            class="radio mx-1"
            v-model="websitePrice"
            :value="option.value"
          />
          <label :for="'price_' + option" class="font-medium">{{
            option.label
          }}</label>
        </div>
      </div>
      <div class="card-actions justify-start">
        <button
          class="btn btn-primary"
          :class="{ 'btn-soft': !addingItem }"
          @click="addItem"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
