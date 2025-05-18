<template>
  <div class="dashboard-root">
    <aside class="sidebar">
      <div class="logo">
        <img src="@/assets/Logo.svg" alt="AquaGenius Logo" width="40" />
        <span class="brand">AquaGenius</span>
      </div>
      <nav>
        <router-link to="/dashboard" class="nav-link" exact-active-class="active">Dashboard</router-link>
        <router-link to="/reports" class="nav-link" exact-active-class="active">Reports</router-link>
        <router-link to="/settings" class="nav-link" exact-active-class="active">Settings</router-link>
        <router-link to="/scheduler" class="nav-link" exact-active-class="active">Scheduler</router-link>
      </nav>
      <div class="logout">
        <button @click="logout">Logout</button>
      </div>
    </aside>
    <main class="dashboard-main">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <div class="user-avatar"></div>
      </header>
      <section class="dashboard-cards">
        <!-- Water Level Card with Gallon Illustration -->
        <div class="card water-level-card">
          <h3>Water Level</h3>
          <div class="water-level-content">
            <div class="gallon-visual">
              <div class="gallon-svg">
                <svg viewBox="0 0 60 120" width="60" height="120">
                  <!-- Gallon outline -->
                  <rect x="10" y="10" width="40" height="100" rx="18" fill="#e3f2fd" stroke="#2196f3" stroke-width="3"/>
                  <!-- Water fill -->
                  <rect
                    x="10" 
                    :y="10 + (100 - 100 * waterLevel / waterCapacity)"
                    width="40"
                    :height="100 * waterLevel / waterCapacity"
                    fill="#2196f3"
                    style="transition: all 0.5s;"
                  />
                  <!-- Level lines and labels -->
                  <g v-for="n in 5" :key="n">
                    <line
                      :x1="10"
                      :x2="50"
                      :y1="10 + (100 - (n-1)*25)"
                      :y2="10 + (100 - (n-1)*25)"
                      stroke="#90caf9"
                      stroke-width="1"
                    />
                    <text
                      x="55"
                      :y="14 + (100 - (n-1)*25)"
                      font-size="8"
                      fill="#2196f3"
                      alignment-baseline="middle"
                    >{{ Math.round(waterCapacity * ((n-1)/4)) }}L</text>
                  </g>
                </svg>
              </div>
              <div class="gallon-label">Gallon</div>
            </div>
            <div class="water-level-info">
              <div class="water-level-value">{{ waterLevel }} L / {{ waterCapacity }} L</div>
              <div class="progress-bar">
                <div class="progress" :style="{width: waterPercent + '%'}"></div>
              </div>
              <div class="water-level-percent">{{ waterPercent.toFixed(1) }}% full</div>
            </div>
          </div>
        </div>
        <div class="card">
          <h3>Current Flow Rate</h3>
          <div class="flow-rate-value">{{ flowRate }} L/min</div>
          <div class="flow-rate-desc">Real-time dispensing rate</div>
        </div>
        <div class="card">
          <h3>System Status</h3>
          <div class="system-status">
            <span :class="['status-badge', systemStatus === 'Normal' ? 'status-normal' : 'status-error']">{{ systemStatus }}</span>
          </div>
          <div class="status-updated">Last updated: {{ lastUpdated }}</div>
        </div>
      </section>
      <section class="quick-controls">
        <h2>Quick Controls</h2>
        <button class="btn-primary" @click="startProduction">Start Optimized Production</button>
        <button @click="refreshData">Refresh System Data</button>
        <button @click="goToSettings">Go to Advanced Settings</button>
      </section>
      <section class="recent-activity">
        <h2>Recent Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, i) in activities" :key="i">
              <td>{{ activity.timestamp }}</td>
              <td><span class="badge" :class="activity.badge">{{ activity.event }}</span></td>
              <td>{{ activity.details }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = () => {
  localStorage.removeItem('user');
  router.push('/');
};

// Dynamic data (replace with API if needed)
const waterLevel = ref(750);
const waterCapacity = ref(1000);
const flowRate = ref(5.2);
const systemStatus = ref('Normal');
const lastUpdated = ref('');

function updateLastUpdated() {
  const now = new Date();
  lastUpdated.value = now.toLocaleString();
}
updateLastUpdated();

const activities = ref([
  {
    timestamp: '5/16/2025, 10:22:41 PM',
    event: 'Production Cycle Started',
    details: 'Target: 800L',
    badge: 'blue'
  },
  {
    timestamp: '5/16/2025, 10:52:41 PM',
    event: 'Water Level Reached 50%',
    details: 'Current: 500L',
    badge: 'blue'
  },
  {
    timestamp: '5/16/2025, 11:12:41 PM',
    event: 'Filter Maintenance Due Soon',
    details: 'Filter A usage at 85%',
    badge: 'blue'
  },
  {
    timestamp: '5/16/2025, 11:22:41 PM',
    event: 'Low Humidity Detected',
    details: 'Production efficiency may be affected',
    badge: 'blue'
  }
]);

const waterPercent = computed(() => (waterLevel.value / waterCapacity.value) * 100);

// Dummy actions for buttons
const startProduction = () => alert('Production started!');
const refreshData = () => {
  alert('System data refreshed!');
  updateLastUpdated();
};
const goToSettings = () => router.push('/settings');

// Auto-update lastUpdated every minute
let intervalId;
onMounted(() => {
  intervalId = setInterval(updateLastUpdated, 60000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<script>
export default {
  name: 'UserDashboard'
}
</script>

<style scoped>
.dashboard-root {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}
.sidebar {
  width: 250px;
  background: #fff;
  padding: 24px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.logo img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2196F3;
}
nav {
  flex: 1;
}
.nav-link {
  display: block;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}
.nav-link:hover {
  background: #f0f0f0;
}
.active {
  background: #e3f2fd;
  font-weight: bold;
}
.logout {
  margin-top: auto;
}
.logout button {
  width: 100%;
  padding: 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.dashboard-main {
  flex: 1;
  padding: 32px;
  min-width: 0;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
}
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  padding: 24px;
}
.water-level-card {
  position: relative;
  overflow: hidden;
}
.water-level-content {
  display: flex;
  align-items: center;
  gap: 18px;
}
.gallon-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}
.gallon-svg {
  margin-bottom: 4px;
}
.gallon-label {
  font-size: 0.9rem;
  color: #2196f3;
  font-weight: 600;
}
.water-level-info {
  flex: 1;
}
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e3f2fd;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
}
.progress {
  height: 100%;
  background: #2196F3;
  transition: width 0.3s;
}
.water-level-value {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 8px;
}
.water-level-percent {
  color: #888;
  font-size: 0.95rem;
}
.flow-rate-value {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 8px;
}
.flow-rate-desc {
  color: #888;
  font-size: 0.95rem;
}
.system-status {
  margin-top: 8px;
}
.status-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
}
.status-normal {
  background: #4caf50;
}
.status-error {
  background: #f44336;
}
.status-updated {
  color: #888;
  font-size: 0.9rem;
  margin-top: 8px;
}

.quick-controls {
  margin-bottom: 32px;
}
.btn-primary {
  padding: 12px 24px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 12px;
  display: block;
  width: 100%;
  max-width: 400px;
}
.quick-controls button:not(:first-child) {
  margin-top: 8px;
}
.recent-activity table {
  width: 100%;
  border-collapse: collapse;
}
.recent-activity th, .recent-activity td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}
.recent-activity th {
  background: #f9f9f9;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  color: white;
  font-size: 0.875rem;
}
.badge.blue {
  background: #2196F3;
}

/* Responsive Design */
@media (max-width: 900px) {
  .dashboard-root {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
  }
  .dashboard-main {
    padding: 16px;
  }
  .dashboard-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .dashboard-main {
    padding: 8px;
  }
  .dashboard-header h1 {
    font-size: 1.2rem;
  }
  .sidebar {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-primary {
    font-size: 0.95rem;
    padding: 10px 16px;
  }
  .water-level-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .gallon-visual {
    min-width: 0;
  }
}
</style>