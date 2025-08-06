<template>
  <div
    class="loading-container display-flex align-items-center justify-content-center flex-direction-column"
  >
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>
<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.loading-container {
  height: 100vh;
  font-size: 18px;
  color: #555;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid $primary-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
