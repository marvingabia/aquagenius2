<template>
  <div class="page-content">
    <h1>System Settings</h1>
    <div class="settings-card">
      <h2>Production Settings</h2>
      <p class="desc">Configure water generation schedule and limits.</p>
      <div class="settings-grid">
        <div>
          <label>Start Time</label>
          <input type="time" v-model="startTime" />
        </div>
        <div>
          <label>End Time</label>
          <input type="time" v-model="endTime" />
        </div>
        <div>
          <label>Target Water Level (%)</label>
          <input type="number" v-model="targetLevel" min="0" max="100" />
        </div>
      </div>
      <div class="settings-row">
        <label>Flow Rate Limit (L/min)</label>
        <input type="number" v-model="flowRateLimit" min="1" />
        <div class="hint">Maximum water dispensing rate.</div>
      </div>
      <div class="settings-row">
        <label>Purification Mode</label>
        <select v-model="purificationMode">
          <option>Auto</option>
          <option>Manual</option>
        </select>
      </div>
    </div>

    <div class="settings-card">
      <h2>Notification Preferences</h2>
      <p class="desc">Manage how you receive alerts from the system.</p>
      <div class="notif-grid">
        <div class="notif-row">
          <div>
            <div class="notif-title">Low Water Email</div>
            <div class="notif-desc">Receive email notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.lowWaterEmail">
            <span class="slider"></span>
          </label>
          <div>
            <div class="notif-title">Low Water Push</div>
            <div class="notif-desc">Receive push notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.lowWaterPush">
            <span class="slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div>
            <div class="notif-title">Error Email</div>
            <div class="notif-desc">Receive email notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.errorEmail">
            <span class="slider"></span>
          </label>
          <div>
            <div class="notif-title">Error Push</div>
            <div class="notif-desc">Receive push notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.errorPush">
            <span class="slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div>
            <div class="notif-title">Maintenance Email</div>
            <div class="notif-desc">Receive email notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.maintenanceEmail">
            <span class="slider"></span>
          </label>
          <div>
            <div class="notif-title">Maintenance Push</div>
            <div class="notif-desc">Receive push notifications.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.maintenancePush">
            <span class="slider"></span>
          </label>
        </div>
        <!-- ADDITIONAL NOTIFICATION PREFERENCES -->
        <div class="notif-row">
          <div>
            <div class="notif-title">Water Level 90% Notification</div>
            <div class="notif-desc">Notify when water level reaches 90%.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.waterLevel90">
            <span class="slider"></span>
          </label>
          <div>
            <div class="notif-title">Heavy Rain Notification</div>
            <div class="notif-desc">Notify when heavy rain is detected.</div>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="notif.heavyRain">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="save-btn-row">
        <button class="btn-save" @click="saveSettings">
          <span style="margin-right:8px;">💾</span>
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  data() {
    return {
      startTime: '06:00',
      endTime: '18:00',
      targetLevel: 80,
      flowRateLimit: 10,
      purificationMode: 'Auto',
      notif: {
        lowWaterEmail: true,
        lowWaterPush: true,
        errorEmail: true,
        errorPush: false,
        maintenanceEmail: true,
        maintenancePush: true,
        // ADDITIONAL NOTIFICATION PREFERENCES
        waterLevel90: true,
        heavyRain: true,
      }
    }
  },
  methods: {
    saveSettings() {
      alert('Settings saved!');
      // Dito mo ilalagay ang logic para i-save ang settings (localStorage/API)
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
.settings-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 28px 24px 24px 24px;
  max-width: 1100px;
  margin: 0 auto 32px auto;
}
.settings-card h2 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}
.desc {
  color: #4a6fa1;
  margin-bottom: 20px;
}
.settings-grid {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}
.settings-grid > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.settings-row {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
.settings-row label {
  font-weight: 600;
  margin-bottom: 6px;
}
.settings-row input,
.settings-row select,
.settings-grid input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}
.hint {
  color: #888;
  font-size: 0.95rem;
  margin-top: 4px;
}
.notif-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.notif-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 8px;
}
.notif-title {
  font-weight: 600;
}
.notif-desc {
  color: #888;
  font-size: 0.95rem;
}
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #e0e0e0;
  border-radius: 24px;
  transition: .3s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: .3s;
}
input:checked + .slider {
  background-color: #6ec1ff;
}
input:checked + .slider:before {
  transform: translateX(20px);
}
.save-btn-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}
.btn-save {
  background: #6ec1ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.btn-save:hover {
  background: #2196f3;
}

/* Responsive */
@media (max-width: 900px) {
  .settings-card {
    padding: 18px 8px 16px 8px;
  }
  .page-content {
    padding: 12px;
  }
  .settings-grid {
    flex-direction: column;
    gap: 8px;
  }
  .notif-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .save-btn-row {
    justify-content: center;
  }
}
</style>