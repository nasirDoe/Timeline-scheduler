<script setup lang="ts">
const hours = [
  0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23,
];

function padZero(num: number) {
  return num < 10 ? '0' + num : num;
}
function startFrom(arr: number[], idx: number) {
  return arr.slice(idx);
}
</script>
<template>
  <div class="relative">
    <!-- Scope -->
    <div class="timeline__scope">
      <span class="text-sm font-medium text-gray-300">Additional</span>
    </div>
    <div class="timeline">
      <!-- Hours -->
      <div
        v-for="hour in startFrom(hours, 7)"
        :key="hour"
        class="timeline__col"
      >
        <div class="timeline__hour">
          <span class="timeline__hour-label">{{
            padZero(hour) + ':00'
          }}</span>
        </div>
        <!-- Events -->
        <div class="relative z-20 flex flex-wrap justify-center py-10">
          <template v-if="hour === 9">
            <div class="timeline__item timeline__item--start bg-green-200">
              <div class="flex items-center justify-between">
                <span
                  class="rounded-full bg-white px-2 py-1 text-xs font-medium"
                >
                  09:30-18:30
                </span>
                <button class="outline-none">
                  <IconDots class="text-sm text-black" />
                </button>
              </div>
              <div class="mb-0 mt-auto">
                <strong class="mb-1 block">
                  Practice: Writing and talking
                </strong>
                <smal class="text-xs text-gray-600"
                  >English: Level C1</smal
                >
              </div>
            </div>
          </template>
          <template v-if="hour === 11">
            <div class="timeline__item timeline__item--start bg-[#99C0FB]">
              <div class="flex items-center justify-between">
                <span
                  class="rounded-full bg-white px-2 py-1 text-xs font-medium"
                >
                  11:30-14:30
                </span>
                <button class="outline-none">
                  <IconDots class="text-sm text-black" />
                </button>
              </div>
              <div class="mb-0 mt-auto">
                <strong class="mb-1 block">
                  Interface animation in Principle
                </strong>
                <smal class="text-xs text-gray-600"
                  >UI/UX design Advance</smal
                >
              </div>
            </div>
          </template>
          <template v-if="hour === 10">
            <div class="timeline__item timeline__item--end bg-[#E2ECE5]">
              <div class="flex items-center justify-between">
                <span
                  class="rounded-full bg-white px-2 py-1 text-xs font-medium"
                >
                  10:30-15:30
                </span>
                <button class="outline-none">
                  <IconDots class="text-sm text-black" />
                </button>
              </div>
              <div class="mb-0 mt-auto">
                <strong class="mb-1 block">
                  Create a cool portfolio
                </strong>
                <smal class="text-xs text-gray-600">Lecture</smal>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  @apply relative flex flex-nowrap overflow-x-auto;
  &__col {
    @apply relative inline-flex min-h-[500px] w-44 flex-none justify-center;
    @screen xl {
      @apply min-h-[60vh];
    }
  }
  &__hour {
    @apply absolute left-1/2 top-0 h-full -translate-x-1/2;
    &::before {
      content: '';
      @apply absolute left-1/2 top-6 bottom-0 w-px -translate-x-1/2 bg-gray-200;
    }
    &-label {
      @apply relative z-10 py-1 text-sm font-medium text-gray-300;
    }
  }
  &__item {
    @apply flex min-h-[180px] min-w-[200px] flex-col rounded-lg p-3;
    &--start {
      @apply self-start;
    }
    &--end {
      @apply self-end;
    }
  }
  &__scope {
    @apply absolute top-1/2 left-4 -translate-y-1/2 lg:left-14;
  }
}
</style>
