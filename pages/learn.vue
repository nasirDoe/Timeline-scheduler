<script setup lang="ts">
import events from '~~/data/events';
import { MonthSelected, Events } from '~~/types';
import { getDayNames } from '~~/data';

useHead({ title: 'Learn' });

const defaultMonth = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const pickedDate = ref<MonthSelected>(defaultMonth);
const selectedEvent = ref<Events | null>(null);

const onPickDate = (val: MonthSelected) => {
  pickedDate.value = val;
};

const onSlideClick = (event: Events) => {
  selectedEvent.value = event;
};

const dateSelectedEvent = computed(() => {
  const dateSelected = selectedEvent.value?.date;
  let dateLbl: Date;

  if (dateSelected) {
    dateLbl = new Date(dateSelected);
    if (dateLbl >= new Date()) {
      return 'Today';
    }
    return `${getDayNames[dateLbl.getDay()]}, ${dateLbl.getDate()}`;
  }
  return 'Today';
});

const additionalEvents = [
  {
    id: 1,
    title: 'Speaking Club',
    time: '08:00-09:30',
    color: '#f43aba',
  },
  {
    id: 2,
    title: 'Create a Cool portfolio',
    time: '10:00-11:30',
    color: '#E2ECE5',
  },
];
</script>

<template>
  <div class="relative flex-1 overflow-x-hidden bg-gray-200/30 px-4">
    <!-- Slider Date -->
    <div class="-mx-4 bg-black px-4">
      <div class="space-y-6 pt-6 md:px-6 xl:px-20">
        <LearnDatePicker month-picker @picked="onPickDate" />
        <LearnDateSlider
          :month="pickedDate"
          :events="events"
          @slide-click="onSlideClick"
        />
      </div>
    </div>
    <!-- Content -->
    <div v-if="selectedEvent?.events.length" class="py-7 md:pl-6 xl:pl-20">
      <div class="-mx-4 flex flex-wrap space-y-6 lg:space-y-0 xl:-mx-6">
        <div class="w-full px-4 lg:w-4/12 xl:px-6">
          <h2 class="mb-4 text-2xl font-semibold">
            {{ dateSelectedEvent }}
          </h2>
          <div class="space-y-4">
            <h3 class="text-sm font-medium text-gray-400">Courses</h3>
            <TransitionGroup
              name="list"
              tag="div"
              appear
              class="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div
                v-for="(course, index) in selectedEvent.events"
                :key="index"
                class="flex flex-wrap border-b border-gray-100 py-4 last:border-none"
              >
                <div class="px-4">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full"
                    :style="{ 'background-color': course.color }"
                  >
                    <IconHelpCircle class="text-2xl" />
                  </div>
                </div>
                <div class="relative flex-1">
                  <p class="font-medium">{{ course.name }}</p>
                  <span class="text-sm text-gray-400">
                    {{ course.progress }}
                  </span>
                  <button
                    class="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <IconDots class="text-xl text-gray-600" />
                  </button>
                </div>
              </div>
            </TransitionGroup>
            <h3 class="text-sm font-medium text-gray-400">Additional</h3>
            <TransitionGroup
              tag="div"
              name="list"
              class="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
              appear
            >
              <div
                v-for="additional in additionalEvents"
                :key="additional.id"
                class="flex flex-wrap border-b border-gray-100 py-4 last:border-none"
              >
                <div class="px-4">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full"
                    :style="{ 'background-color': additional.color }"
                  >
                    <IconCalendar class="text-2xl" />
                  </div>
                </div>
                <div class="relative flex-1">
                  <p class="font-medium">{{ additional.title }}</p>
                  <span class="text-sm text-gray-400">{{
                    additional.time
                  }}</span>
                  <button
                    class="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <IconDots class="text-xl text-gray-600" />
                  </button>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
        <div class="w-full px-4 lg:w-8/12 xl:px-6">
          <h2 class="mb-6 text-2xl font-semibold">Timetable</h2>
          <div class="-mx-4 xl:mx-6">
            <LearnTimeTable />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full py-8">
      <p class="text-center font-semibold text-gray-400">No event!</p>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all duration-300 ease-out;
}
.list-enter-from,
.list-leave-to {
  @apply translate-x-8 opacity-0;
}
.list-leave-active {
  @apply invisible absolute;
}
</style>
