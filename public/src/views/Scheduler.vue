<template>
  <div class="page-content">
    <h1>Scheduler Presets</h1>
    <div class="scheduler-card">
      <h2>Optimize Production Schedule</h2>
      <p class="desc">
    Optimized water production schedule based on current conditions and your preferences.
      </p>
      <div class="section">
        <label class="section-label">Environmental Conditions</label>
        <textarea class="section-box" readonly>
          .Temperature: 25°C
          .Humidity: 60
          .ph level:7.4 
          .Weather: Clear skies
        </textarea>
        <div class="section-hint">Provide details like temperature, humidity, weather forecast.</div>
      </div>
      <div class="section">
        <label class="section-label">User Preferences</label>
        <textarea class="section-box" readonly>
             .Desired water level: 80%
             .Usage pattern: Medium
             .prefer energy saving overnight.
        </textarea>
        <div class="section-hint">Specify desired water levels, usage patterns, energy saving goals.</div>
      </div>
      <button class="btn-suggest" @click="suggestSchedule">
        <span class="icon">💡</span>
        Suggest Schedule
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchedulerPage',
  methods: {
    suggestSchedule() {
      alert('AI will suggest a schedule here!');
    }
  }
}
</script>

<style scoped>
.page-content {
  padding: 32px;
  background: #eaf4fb;
  min-height: 100vh;
}
h1 {
  font-size: 1.5rem;
  margin-bottom: 24px;
}
.scheduler-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 28px 24px 24px 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.scheduler-card h2 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}
.desc {
  color: #4a6fa1;
  margin-bottom: 20px;
}
.section {
  margin-bottom: 24px;
}
.section-label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
}
.section-box {
  width: 100%;
  min-height: 60px;
  background: #e3f2fd;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  color: #333;
  resize: none;
  margin-bottom: 6px;
}
.section-hint {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 4px;
}
.btn-suggest {
  width: 100%;
  background: #6ec1ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
.btn-suggest:hover {
  background: #2196f3;
}
.icon {
  font-size: 1.2em;
}

/* Responsive */
@media (max-width: 900px) {
  .scheduler-card {
    padding: 18px 8px 16px 8px;
  }
  .page-content {
    padding: 12px;
  }
}
</style>