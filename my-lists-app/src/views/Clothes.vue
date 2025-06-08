<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

onMounted(async () => {
  const response = await axios.get("/api/jf_list");
  console.log(response.data);
  jFashItems.value = response.data;
});

const jFashItems = ref([]);
const newItem = ref("");

const addItem = async () => {
  if (newItem.value.trim()) {
    await axios.post("/api/jf_list", { item: newItem.value });
    const response = await axios.get("/api/jf_list"); // Refresh the list
    list.value = response.data;
    newItem.value = "";
  }
};

const price = (price) => "$".repeat(Number(price));
</script>

<template>
  <div class="flex gap-35 h-200">
    <div class="card bg-base-100 w-96 shadow-sm" data-theme="valentine">
      <figure class="h-92">
        <img src="/clothes/lolita-dress.png" alt="J Fashion" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">J-Fashion</h2>

        <div class="card-actions justify-start">
          <ul class="w-100 list bg-base-100 rounded-box shadow-md">
            <li class="list-row" v-for="item in jFashItems">
              <div>
                <div class="list-col-grow">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.url"
                    >{{ item.name }}</a
                  >
                </div>
                <div class="text-xs uppercase font-semibold opacity-60">
                  {{ item.comment }}
                </div>
              </div>
              <div class="badge badge-md">{{ price(item.price) }}</div>
              <div>
                <svg
                  class="size-[1.2em]"
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
              </div>
            </li>
          </ul>
        </div>
        <div class="card-actions justify-start">
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 w-96 shadow-sm" data-theme="valentine">
      <figure class="h-92">
        <img src="/clothes/named.png" alt="Others" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Others</h2>

        <div class="card-actions justify-start">
          <ul class="w-100 list bg-base-100 rounded-box shadow-md">
            <li class="list-row" v-for="item in jFashItems">
              <div>
                <div class="list-col-grow">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.url"
                    >{{ item.name }}</a
                  >
                </div>
                <div class="text-xs uppercase font-semibold opacity-60">
                  {{ item.comment }}
                </div>
              </div>
              <div class="badge badge-md">{{ price(item.price) }}</div>
              <div>
                <svg
                  class="size-[1.2em]"
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
              </div>
            </li>
          </ul>
        </div>
        <div class="card-actions justify-start">
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 w-96 shadow-sm" data-theme="valentine">
      <figure class="h-92">
        <img src="/clothes/justin_tshirt.png" alt="Justin" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Justin</h2>

        <div class="card-actions justify-start">
          <ul class="w-100 list bg-base-100 rounded-box shadow-md">
            <li class="list-row" v-for="item in jFashItems">
              <div>
                <div class="list-col-grow">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.url"
                    >{{ item.name }}</a
                  >
                </div>
                <div class="text-xs uppercase font-semibold opacity-60">
                  {{ item.comment }}
                </div>
              </div>
              <div class="badge badge-md">{{ price(item.price) }}</div>
              <div>
                <svg
                  class="size-[1.2em]"
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
              </div>
            </li>
          </ul>
        </div>
        <div class="card-actions justify-start">
          <button class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
