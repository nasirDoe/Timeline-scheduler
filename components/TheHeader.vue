<script setup>
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
</script>

<template>
  <header class="header">
    <div class="mr-5 w-auto">
      <IconNuxtLogo class="text-3xl text-white" />
    </div>
    <div class="w-auto flex-1">
      <nav class="navbar">
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
    </div>
    <div class="w-full lg:w-auto">
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
