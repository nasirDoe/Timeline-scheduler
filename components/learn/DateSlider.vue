<script setup lang="ts">
import { Navigation } from 'swiper';
import { Events, MonthSelected } from '@/types';
import { getDayNames } from '~~/data';

import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperOpt } from 'swiper';
import 'swiper/css';

interface Props {
  month: MonthSelected;
  events: Events[];
}

const props = defineProps<Props>();
const swiper = ref<SwiperOpt | null>(null);
const slidesDate = ref<Events[]>([]);

const emit = defineEmits(['slideClick']);

const onSwiper = (options: SwiperOpt) => {
  swiper.value = options;
};

function getAllDaysInMonth(year: number, month: number) {
  const date: Date = new Date(year, month, 1);
  const dates: Date[] = [];
  while (date.getMonth() === month) {
    date.setDate(date.getDate() + 1);
    dates.push(new Date(date));
  }
  return dates;
}

const toYMD = (date: Date) => new Date(date).toISOString().slice(0, 10);

const initSlidesData = (MonthSelect: MonthSelected) => {
  const dates = getAllDaysInMonth(MonthSelect?.year, MonthSelect?.month);
  const merged = dates.map((date) => {
    const dateParse = toYMD(date);
    const findEvent = props.events.find(
      (event) => event.date === dateParse
    );
    return {
      date: dateParse,
      events: findEvent?.events || [],
    };
  });
  slidesDate.value = merged;
};

const monthAndDate = (date: string) => {
  const parseDate = new Date(date);
  const dayDate = parseDate.getDate();
  const dayName = getDayNames[parseDate.getDay()];
  return {
    dayDate,
    dayName,
  };
};

const onSlideClick = (evt: Event, item: Events) => {
  const slides = document.querySelectorAll('.date-item');
  const currentSlide = (evt.target as HTMLElement).parentElement;
  for (const slide of slides) {
    if (slide.classList.contains('date-item--active')) {
      slide.classList.remove('date-item--active');
    }
  }
  currentSlide?.classList.add('date-item--active');
  emit('slideClick', item);
};

watchEffect(() => {
  initSlidesData(props.month);
});
</script>

<template>
  <div class="relative">
    <button
      class="prev-slide"
      :class="{ 'disabled-nav': swiper?.progress === 0 }"
      @click="swiper?.slidePrev()"
    >
      <IconArrowLeft />
    </button>
    <div class="pr-5 pl-10">
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="7"
        :space-between="20"
        @swiper="onSwiper"
        @slide-change="onSwiper"
      >
        <SwiperSlide
          v-for="(item, index) in slidesDate"
          :key="index"
          @click="onSlideClick($event, item)"
        >
          <div class="date-item">
            <div class="date-item__clicked-area" />
            <div class="date-item__bullets">
              <span class="bullet-item big" />
              <template v-for="bullet in item.events" :key="bullet.id">
                <span
                  class="bullet-item"
                  :style="{ backgroundColor: bullet.color }"
                />
              </template>
            </div>
            <div class="flex-1">
              <h2 class="date-item__date">
                {{ monthAndDate(item.date)?.dayDate }}
              </h2>
              <span class="date-item__dayName">{{
                monthAndDate(item.date)?.dayName
              }}</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <button
      class="next-slide"
      :class="{
        'disabled-nav': swiper?.progress === 1,
      }"
      @click="swiper?.slideNext()"
    >
      <IconArrowRight />
    </button>
  </div>
</template>

<style scoped>
.prev-slide,
.next-slide {
  @apply absolute top-6 z-[200] inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors;
  &:hover:not(.disabled-nav) {
    @apply bg-white/30;
  }
  &.disabled-nav {
    @apply pointer-events-none cursor-not-allowed text-white/40;
  }
}
.prev-slide {
  @apply left-0;
}
.next-slide {
  @apply right-0;
}
.date-item {
  @apply relative flex cursor-pointer pt-4;
  &__clicked-area {
    @apply absolute inset-0 z-20;
  }
  &__bullets {
    @apply relative mx-4 flex h-28 w-2 flex-col pt-5;
    &::before {
      content: '';
      @apply absolute left-1/2 bottom-0 top-5 w-0.5 -translate-x-1/2 bg-white/10;
    }
    .bullet-item {
      @apply relative z-10 mx-auto mb-0.5 inline-block h-1.5 w-1.5 rounded-full;
      &.big {
        @apply h-2.5 w-2.5 -translate-x-px border border-white/50 bg-black;
      }
    }
  }
  &__date,
  &__dayName {
    @apply block text-gray-500;
  }
  &__date {
    @apply text-4xl font-medium;
  }
  &__dayName {
    @apply text-sm;
  }
  &--active,
  &:hover {
    ^&__date,
    ^&__dayName {
      @apply text-white;
    }
    ^&__bullets {
      &::before {
        @apply bg-white/30;
      }
      .bullet-item.big {
        @apply bg-white;
      }
    }
  }
}
</style>
