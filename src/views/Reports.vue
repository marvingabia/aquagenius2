<template>
  <div class="page-content">
    <div class="reports-card">
      <div class="reports-header">
        <div>
          <h2>Water Production Analysis</h2>
          <div class="subtitle">
            Visualize water production patterns and efficiency over time.
          </div>
        </div>
        <button class="btn-export">
          <span style="font-size:1.2em; margin-right:8px;">⬇️</span>
          Export Report
        </button>
      </div>
      <div class="reports-controls">
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="text" class="input-date" readonly value="May 10, 2025 - May 16, 2025" />
        </div>
        <select class="input-select">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <button class="btn-generate">Generate Report</button>
      </div>
      <div class="no-data">
        No production data available for the selected period.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsPage'
}
</script>

<style scoped>
.page-content {
  padding: 32px;
  background: #eaf4fb;
  min-height: 100vh;
}
.reports-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 28px 24px 24px 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}
h2 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}
.subtitle {
  color: #4a6fa1;
  font-size: 1rem;
}
.btn-export {
  background: #e3f2fd;
  color: #2196F3;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.btn-export:hover {
  background: #b3e5fc;
}
.reports-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  align-items: center;
}
.input-group {
  display: flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 8px;
  padding: 0 12px;
  height: 44px;
}
.icon {
  margin-right: 8px;
  font-size: 1.2em;
}
.input-date {
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  width: 180px;
  outline: none;
}
.input-select {
  background: #e3f2fd;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  color: #333;
  outline: none;
}
.btn-generate {
  background: #6ec1ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-generate:hover {
  background: #2196f3;
}
.no-data {
  text-align: center;
  color: #4a6fa1;
  font-size: 1.1rem;
  margin-top: 48px;
  margin-bottom: 48px;
}

/* Responsive */
@media (max-width: 900px) {
  .reports-card {
    padding: 18px 8px 16px 8px;
  }
  .page-content {
    padding: 12px;
  }
  .reports-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .reports-header {
    flex-direction: column;
    gap: 8px;
  }
}
</style>