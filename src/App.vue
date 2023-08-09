<template>
  <el-config-provider namespace="ep">
    <div>
      <div>
        <RouterView class="main-layout" />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-layout {
  width: 100%;
  align-content: center;
}
</style>
