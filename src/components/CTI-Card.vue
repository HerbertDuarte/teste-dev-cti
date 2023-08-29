<template>
  <q-card class="min-h-view w-full">
    <q-card-section class="row bg-grey-2 q-py-sm">
      <q-icon size="md" :name="icon" />
      <div class="text-h6 q-ml-sm">{{ title }}</div>
    </q-card-section>

    <q-separator />
    <div class="q-pa-md">
      <slot />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["title", "icon"],
});
</script>
