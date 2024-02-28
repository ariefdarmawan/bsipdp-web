<template>
    <div>
        <div v-if="data.record.cif==''">
            Silahkan pilih data di sebelah kiri (double klik)
        </div>

        <div v-else>
            <div v-if="data.loading">
                Mohon tunggu, sedang memproses data ...
            </div>
            <div class="flex flex-col gap-[2px]" v-if="!data.loading">
                <div>
                    <s-button class="mt-3"
                        :icon="data.display=='PROTECT'?'eyeOff':'eyeOutline'" 
                        :tooltip="data.display=='PROTECT'?'Terproteksi':'Clear'" 
                        @click="changeOp"
                        />
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">CIF</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.cif }}</div>
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">Nama</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.name }}</div>
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">Email</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.email }}</div>
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">Phone</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.phone }}</div>
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">Alamat</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.address }}</div>
                </div>
                <div class="flex gap-1">
                    <div class="p-[2px] w-[200px]">Tanggal bergabung</div>
                    <div class="p-[2px] bg-slate-200">{{  data.record.join_date }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, inject, onMounted, watch } from 'vue';
import { util, SButton } from 'suimjs';

const props = defineProps({
    cif: {type: String, default:''},
    display: {type: String, default:'PROTECT'}
})

const axios = inject("axios");

const data = reactive({
    loading: false,
    display: props.display,
    record: {
        name: "",
        email: "",
        address: "",
        phone: "",
        cif: "",
        join_date: ""
    }
})

function changeOp () {
    data.display = data.display=='PROTECT'?'REVEAL':'PROTECT';
    refresh();
}

function refresh() {
    if (props.cif=="") {
        data.record = {
            name: "",
            email: "",
            address: "",
            phone: "",
            cif: "",
            join_date: ""
        };
        return;
    }
    data.loading = true;
    axios.get(`/read?op=${props.display}&field=cif&value=${props.cif}&display=${data.display}`).then(r => {
        if (r.data.records.length==0) {
            util.showError("invalid request");
            return;
        } else {
            data.record = r.data.records[0];
        }
        data.loading = false;
    }, e => {
        util.showError(e);
        data.loading = false;
    })
};

watch(() => props.cif, (nv) => {
    util.nextTickN(2, refresh);
})

onMounted(() => {
    refresh();
})

</script>