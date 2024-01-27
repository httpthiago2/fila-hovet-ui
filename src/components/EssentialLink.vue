<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="router.push(routeName ? { name: routeName } : { path: link })"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

export type EssentialLinkProps = {
  title: string;
  caption?: string;
  routeName?: string;
  icon?: string;
} & { link: string } | { routeName: string }

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
