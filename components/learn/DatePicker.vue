<script setup lang="ts">
import { MonthSelected } from '~~/types';
import { getMonthNames } from '~~/data';

const emit = defineEmits(['picked']);

const defaultMonth = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
const date = ref<MonthSelected>(defaultMonth);

const monthYearTitle = computed(() => {
  return `${getMonthNames[date.value.month]} ${date.value.year}`;
});

const onPickDate = (value: MonthSelected | Date) => {
  emit('picked', value);
};
</script>

<template>
  <div class="inline-block">
    <Datepicker
      v-model="date"
      auto-apply
      v-bind="$attrs"
      @update:model-value="onPickDate"
    >
      <template #trigger>
        <div class="inline-flex items-center">
          <span class="mr-4 flex-1 text-2xl font-medium text-white">
            {{ monthYearTitle }}
          </span>
          <button
            class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white outline-none hover:bg-white/20"
          >
            <IconCalendar />
          </button>
        </div>
      </template>
    </Datepicker>
  </div>
</template>
