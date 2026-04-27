import React, { useState } from 'react';
import KPIModal from './KPIModal';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [selectedKPI, setSelectedKPI] = useState(null);

  const kpiData = {
    outlets: {
      title: 'Outlets Tracked',
      value: '847',
      change: '+12% vs last month',
      details: 'Real-time tracking across Singapore and Thailand F&B outlets including restaurants, cafes, bakeries, and bubble tea chains.',
      breakdown: [
        { label: 'Singapore', value: '521' },
        { label: 'Thailand', value: '326' }
      ]
    },
    mentions: {
      title: 'Mentions Analyzed',
      value: '125,600',
      change: '+8% vs last month',
      details: 'Social media mentions, reviews, and menu items analyzed across all tracked outlets.',
      breakdown: [
        { label: 'Instagram', value: '68,400' },
        { label: 'Facebook', value: '32,100' },
        { label: 'TikTok', value: '25,100' }
      ]
    },
    trends: {
      title: 'Trends Detected',
      value: '143',
      change: '+15% vs last month',
      details: 'Trending menu items, flavors, and ingredients identified based on social media growth patterns.',
      breakdown: [
        { label: 'Beverages', value: '52' },
        { label: 'Desserts', value: '43' },
        { label: 'Bakery', value: '28' },
        { label: 'Savory', value: '20' }
      ]
    },
    coverage: {
      title: 'Market Coverage',
      value: '78%',
      change: '+5% vs last month',
      details: 'Percentage of major F&B outlets in Singapore and Thailand that we actively track.',
      breakdown: [
        { label: 'Chain Restaurants', value: '92%' },
        { label: 'Independent Cafes', value: '68%' },
        { label: 'Bubble Tea Shops', value: '85%' }
      ]
    }
  };

  const quickStats = [
    {
      label: 'Trending Ingredients (30d)',
      value: '18',
      description: 'Ingredients showing +50% growth in social mentions'
    },
    {
      label: 'New Flavor Launches (30d)',
      value: '34',
      description: 'New products detected across tracked brands'
    },
    {
      label: 'Category Growth Rate',
      value: '+23%',
      description: 'Social media post volume increase month-over-month'
    },
    {
      label: 'Market Coverage',
      value: '78%',
      description: 'Major F&B outlets tracked in SG/TH markets'
    }
  ];

  const trendingItems = [
    { name: 'Yuzu Lemon Tea', growth: 48 },
    { name: 'Truffle Fries', growth: 38 },
    { name: 'Ube Latte', growth: 32 },
    { name: 'Korean Fried Chicken', growth: 27 },
    { name: 'Matcha Soft Serve', growth: 25 },
    { name: 'Plant-Based Burger', growth: 22 },
    { name: 'Poke Bowl', growth: 20 },
    { name: 'Brown Sugar Boba', growth: 18 },
    { name: 'Mala Hotpot', growth: 16 },
    { name: 'Cheese Tea', growth: 14 }
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button className="menu-btn">☰</button>
            <div className="brand">
              <h1>TasteRadar</h1>
              <span className="tagline">AI Powered F&B Intelligence Platform</span>
            </div>
          </div>
          <div className="header-right">
            <div className="location-selector">
              <span className="globe-icon">🌍</span>
              <select className="location-dropdown">
                <option>Singapore</option>
                <option>Thailand</option>
                <option>All Markets</option>
              </select>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search insights..." />
              <span className="search-icon">🔍</span>
            </div>
            <button className="notification-btn">
              🔔
              <span className="notification-badge">1</span>
            </button>
            <button className="settings-btn">⚙️</button>
            <button className="user-btn">👤</button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-section">
          <h3>NAVIGATION</h3>
          <nav className="nav-menu">
            <a href="#" className="nav-item active">
              <span className="nav-icon">📊</span>
              <span>Market Overview</span>
              <span className="nav-arrow">›</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🎯</span>
              <span>Opportunity Explorer</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💰</span>
              <span>Pricing Intelligence</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🤖</span>
              <span>AI Strategy Hub</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <h2>Market Overview</h2>
          <p className="subtitle">Real-time intelligence across Singapore F&B market</p>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card" onClick={() => setSelectedKPI(kpiData.outlets)}>
            <div className="kpi-icon outlets">📍</div>
            <div className="kpi-content">
              <div className="kpi-label">Outlets Tracked</div>
              <div className="kpi-value">847</div>
              <div className="kpi-change positive">+12% vs last month</div>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setSelectedKPI(kpiData.mentions)}>
            <div className="kpi-icon mentions">💬</div>
            <div className="kpi-content">
              <div className="kpi-label">Mentions Analyzed</div>
              <div className="kpi-value">125,600</div>
              <div className="kpi-change positive">+8% vs last month</div>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setSelectedKPI(kpiData.trends)}>
            <div className="kpi-icon trends">📈</div>
            <div className="kpi-content">
              <div className="kpi-label">Trends Detected</div>
              <div className="kpi-value">143</div>
              <div className="kpi-change positive">+15% vs last month</div>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setSelectedKPI(kpiData.coverage)}>
            <div className="kpi-icon coverage">🎯</div>
            <div className="kpi-content">
              <div className="kpi-label">Market Coverage</div>
              <div className="kpi-value">78%</div>
              <div className="kpi-change positive">+5% vs last month</div>
            </div>
          </div>
        </div>

        {/* Quick Stats - UPDATED FOR B2B */}
        <div className="quick-stats-section">
          <h3>Quick Stats</h3>
          <p className="section-subtitle">Market snapshot</p>
          <div className="quick-stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="quick-stat-card">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Items Chart */}
        <div className="chart-section">
          <div className="section-header">
            <h3>Top 10 Trending Items</h3>
            <p className="section-subtitle">Ranked by social media growth over 30 days</p>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {trendingItems.map((item, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-wrapper">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(item.growth / 50) * 100}%` }}
                    >
                      <span className="bar-value">{item.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* KPI Modal */}
      {selectedKPI && (
        <KPIModal 
          kpi={selectedKPI} 
          onClose={() => setSelectedKPI(null)} 
        />
      )}
    </div>
  );
}

export default Dashboard;
