<template>
  <div class="w-full mr-[50px]">
     <div class="flex flex-col gap-2"> 
        <div class="w-full flex flex-row gap-2">
          <div class="card">
              <record-list @dblClick="select"></record-list>
          </div>

          <div class="card grow">
              <record-detail :cif="data.cif" :display="data.display"></record-detail>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { layoutStore } from '@/stores/layout';
import { authStore } from '@/stores/auth';
import { reactive, onMounted, inject } from 'vue';
import RecordDetail from '@/components/pdp/RecordDetail.vue';
import RecordList from '@/components/pdp/RecordList.vue';

const layout = layoutStore();
layout.name = "public";
layout.change('tenant');

const auth = authStore();
const axios = inject('axios');

const data = reactive({
  cif: "",
  display: "PROTECT"
})

function select(cif, display) {
  data.cif = cif;
  data.display = display;
}

onMounted(() => {
})

//const basePath = import.meta.env.VITE_BASE_PATH;
</script>
