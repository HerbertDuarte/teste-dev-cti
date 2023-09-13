<template>
  <q-card class="min-h-view w-full">
    <q-card-section class="row bg-grey-2 q-py-sm">
      <div class="text-h6 q-ml-sm">
        <q-icon class="pb-2" size="md" :name="icon" />
        {{ title }}
      </div>
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
