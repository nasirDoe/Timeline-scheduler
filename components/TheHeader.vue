<script setup>
import IcMenu from '~~/components/icon/Menu.vue';
import IcMenuRight from '~~/components/icon/MenuRight.vue';

const showMenu = ref(false);
const buttonMenu = ref(null);

const routes = [
  {
    label: 'Overview',
    path: '/',
  },
  {
    label: 'Learn',
    path: '/learn',
  },
  {
    label: 'Hub',
    path: '/hub',
  },
  {
    label: 'Activity',
    path: '/activity',
  },
  {
    label: 'Leaderboard',
    path: '/leaderboard',
  },
  {
    label: 'Community',
    path: '/community',
  },
  {
    label: 'Jobs',
    path: '/jobs',
  },
];

function clickOutside(e) {
  const windowSize = window.innerWidth;
  if (windowSize <= 991) {
    if (buttonMenu.value?.contains(e.target)) return;
    showMenu.value = false;
  }
}

function hideMenuOnMobile() {
  const windowSize = window.innerWidth;
  if (windowSize >= 992) {
    showMenu.value = true;
  } else {
    showMenu.value = false;
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutside);
  window.removeEventListener('resize', hideMenuOnMobile);
});

onBeforeMount(() => {
  hideMenuOnMobile();
  document.addEventListener('click', clickOutside);
  window.addEventListener('resize', hideMenuOnMobile);
});
</script>

<template>
  <header class="header">
    <div class="order-2 w-auto lg:order-first lg:mr-5">
      <IconNuxtLogo class="text-3xl text-white" />
    </div>
    <div class="order-first w-auto lg:order-2 lg:flex-1">
      <button
        ref="buttonMenu"
        class="relative z-[100] inline-block h-10 w-10 self-center outline-none lg:hidden"
        @click="showMenu = !showMenu"
      >
        <component
          :is="showMenu ? IcMenuRight : IcMenu"
          class="pointer-events-none text-2xl text-white"
        />
      </button>
      <Transition name="fade" mode="out-in">
        <nav v-if="showMenu" class="navbar">
          <ul class="navbar__list">
            <li
              v-for="route in routes"
              :key="route.path"
              class="navbar__item"
            >
              <NuxtLink :to="route.path" class="navbar__link">
                {{ route.label }}
                <span class="additional" />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
    <div class="order-last w-auto lg:order-2">
      <button
        class="relative z-[100] inline-block h-10 w-10 self-center outline-none lg:hidden"
      >
        <IconSearch class="text-2xl text-white" />
      </button>
      <ul class="nav-icon">
        <li class="nav-icon__item">
          <button class="nav-icon__button">
            <IconSearch />
          </button>
        </li>
        <li class="nav-icon__item">
          <button class="nav-icon__button nav-icon__button--active">
            <IconChatText />
          </button>
        </li>
        <li class="nav-icon__item">
          <button class="nav-icon__button">
            <IconHelpCircle />
          </button>
        </li>
        <li class="nav-icon__item">
          <button class="nav-icon__button">
            <IconCog />
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-300;
  .navbar__list {
    @apply transition-all duration-300;
  }
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
  .navbar__list {
    @apply -translate-x-full opacity-0;
  }
}
</style>
