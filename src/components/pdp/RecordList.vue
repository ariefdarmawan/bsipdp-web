<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-1 align-middle items-center">
            <s-input use-list :items="['None','Name','Email','CIF']" label="Field" keep-label v-model="data.field" class="min-w-[150px]" />
            <s-input label="Masukkan data yang ingin dicari" keep-label v-model="data.keyword" class="grow" />
            <s-button class="mt-3"
                :icon="data.display=='PROTECT'?'eyeOff':'eyeOutline'" 
                :tooltip="data.display=='PROTECT'?'Terproteksi':'Clear'" 
                @click="changeOp"
                />
        </div>
        <div>
            <s-button class="btn_primary" icon="refresh" label="Refresh" @click="refreshList" />
        </div>
        <div class="flex flex-col gap-2" v-if="data.records.length > 0 && !data.loading">
            <div v-for="record in data.records" 
                class="flex flex-col cursor:pointer even:bg-slate-100 p-1 hover:bg-slate-300"
                @dblclick="dblClick(record.cif, data.display)"
                >
                <div class="flex gap-1">
                    <div class="w-[120px]">{{  record.cif }}</div>
                    <div class="grow">
                        {{  record.name }} <br/>
                        {{  record.email }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="data.loading">
            <div class="p-2">
                Mohon tunggu sedang memproses ...
            </div>
        </div>
        <div v-else>
            <div class="p-2">
                Data yang dicari tidak ketemu
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue';
import { util , SInput, SButton } from 'suimjs';

const axios = inject("axios");

const emit = defineEmits({
    dblClick: null,
})

const data = reactive({
    loading: false,
    op: "REVEAL",
    display: "PROTECT",
    field: "None",
    keyword: "",
    records: []
})

function refreshList() {
    data.loading = true;
    axios.get(`/read?op=${data.op}&display=${data.display}&field=${data.field}&value=${data.keyword}`).then(r=> {
        data.records = r.data.records;
        data.loading = false;
    }, e => {
        data.loading = false;
        util.showError(e);
    })
}

function changeOp () {
    data.display = data.display=='PROTECT'?'REVEAL':'PROTECT';
    refreshList();
}

function dblClick (cif, display) {
    emit('dblClick', cif, display)
}

defineExpose({
    refreshList
})

onMounted(() => {
    refreshList();
})
</script>