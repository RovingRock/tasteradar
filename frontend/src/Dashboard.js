import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, Target, MessageCircle, Send, 
  Activity, Lightbulb, LayoutDashboard, Compass, 
  BarChart3, Brain, ChevronRight, Search, Bell, Settings, User, Menu, ChevronDown, Globe
} from 'lucide-react';
import KPIModal from './KPIModal';
import { thailandDrillDownData, singaporeDrillDownData } from './mockDrillDownData';


const regions = {
  "South East Asia": ["Singapore", "Malaysia", "Thailand", "Indonesia", "Philippines", "Vietnam"],
  "North Asia": ["China", "Japan", "South Korea", "Taiwan", "Hong Kong"],
  "South Asia": ["India", "Pakistan", "Bangladesh", "Sri Lanka"],
  "MENA": ["UAE", "Saudi Arabia", "Qatar", "Egypt"],
  "Pacific": ["Australia", "New Zealand"]
};

const navItems = [
  { id: 'overview', label: 'Market Overview', icon: LayoutDashboard },
  { id: 'opportunities', label: 'Opportunity Explorer', icon: Compass },
  { id: 'pricing', label: 'Pricing Intelligence', icon: BarChart3 },
  { id: 'ai', label: 'AI Strategy Hub', icon: Brain }
];

const marketData = {
  singapore: {
    name: "Singapore",
    kpis: {
      outletsTracked: 1294,
      mentionsAnalyzed: 2006,
      trendsDetected: 53,
      popularItems: 50,
      marketCoverage: 81
    },
    trending_items: [
      { rank: 1, item: "Yuzu Lemon Tea", category: "Beverage", growth: 47, mentions: 234, avg_price: 4.50, min_price: 3.80, max_price: 6.20, competitors: 8, menu_penetration: 12, social_demand: 89 },
      { rank: 2, item: "Truffle Fries", category: "Sides", growth: 38, mentions: 189, avg_price: 6.80, min_price: 5.50, max_price: 9.90, competitors: 12, menu_penetration: 18, social_demand: 76 },
      { rank: 3, item: "Ube Latte", category: "Beverage", growth: 35, mentions: 156, avg_price: 5.20, min_price: 4.50, max_price: 6.80, competitors: 6, menu_penetration: 8, social_demand: 82 },
      { rank: 4, item: "Korean Fried Chicken", category: "Mains", growth: 29, mentions: 143, avg_price: 12.90, min_price: 10.50, max_price: 16.80, competitors: 15, menu_penetration: 22, social_demand: 71 },
      { rank: 5, item: "Matcha Soft Serve", category: "Dessert", growth: 27, mentions: 128, avg_price: 3.80, min_price: 2.90, max_price: 5.50, competitors: 9, menu_penetration: 14, social_demand: 68 },
      { rank: 6, item: "Plant-Based Burger", category: "Mains", growth: 24, mentions: 117, avg_price: 13.90, min_price: 11.90, max_price: 17.50, competitors: 7, menu_penetration: 5, social_demand: 91 },
      { rank: 7, item: "Poke Bowl", category: "Mains", growth: 23, mentions: 112, avg_price: 11.50, min_price: 9.80, max_price: 14.90, competitors: 18, menu_penetration: 28, social_demand: 62 },
      { rank: 8, item: "Brown Sugar Boba", category: "Beverage", growth: 21, mentions: 98, avg_price: 5.50, min_price: 4.20, max_price: 7.20, competitors: 22, menu_penetration: 35, social_demand: 58 },
      { rank: 9, item: "Mala Hotpot", category: "Mains", growth: 18, mentions: 82, avg_price: 15.80, min_price: 12.90, max_price: 22.50, competitors: 11, menu_penetration: 16, social_demand: 64 },
      { rank: 10, item: "Cheese Tea", category: "Beverage", growth: 16, mentions: 76, avg_price: 4.80, min_price: 3.90, max_price: 6.50, competitors: 14, menu_penetration: 19, social_demand: 55 }
    ],
    whitespace_opportunities: [
      { 
        item: "Plant-Based Burger", 
        social_demand: 91, 
        menu_penetration: 5, 
        gap_score: 86,
        outlet_analysis: [
          { outlet_type: "Quick Service", penetration: 8, demand: 87 },
          { outlet_type: "Casual Dining", penetration: 12, demand: 92 },
          { outlet_type: "Delivery-Only", penetration: 2, demand: 94 },
          { outlet_type: "Fast Casual", penetration: 6, demand: 89 }
        ],
        recommendation: "CRITICAL OPPORTUNITY: 91% social demand vs 5% menu penetration. Delivery-Only outlets show 94% demand but only 2% have it."
      },
      { 
        item: "Ube Latte", 
        social_demand: 82, 
        menu_penetration: 8, 
        gap_score: 74,
        outlet_analysis: [
          { outlet_type: "Coffee Shops", penetration: 15, demand: 88 },
          { outlet_type: "Cafes", penetration: 6, demand: 82 },
          { outlet_type: "Bubble Tea", penetration: 3, demand: 79 }
        ],
        recommendation: "HIGH POTENTIAL: Strong demand (82%) but only 8% menu presence. Bubble tea shops severely underserving."
      },
      { 
        item: "Yuzu Lemon Tea", 
        social_demand: 89, 
        menu_penetration: 12, 
        gap_score: 77,
        outlet_analysis: [
          { outlet_type: "Bubble Tea", penetration: 28, demand: 91 },
          { outlet_type: "Coffee Shops", penetration: 4, demand: 86 },
          { outlet_type: "Fast Food", penetration: 1, demand: 89 }
        ],
        recommendation: "EXPANSION OPPORTUNITY: Strong in bubble tea (28%), untapped in fast food (1% vs 89%)."
      }
    ],
    price_elasticity: [
      { 
        item: "Matcha Soft Serve",
        price_points: [
          { price: 2.90, demand_index: 95, outlet_type: "Budget" },
          { price: 3.80, demand_index: 88, outlet_type: "Mid-range" },
          { price: 4.50, demand_index: 72, outlet_type: "Premium" },
          { price: 5.50, demand_index: 45, outlet_type: "Luxury" }
        ],
        optimal_price: 3.80,
        elasticity: -1.8,
        market_avg: 3.80
      },
      {
        item: "Plant-Based Burger",
        price_points: [
          { price: 11.90, demand_index: 78, outlet_type: "Budget" },
          { price: 13.90, demand_index: 85, outlet_type: "Mid-range" },
          { price: 15.90, demand_index: 82, outlet_type: "Premium" },
          { price: 17.50, demand_index: 68, outlet_type: "Luxury" }
        ],
        optimal_price: 13.90,
        elasticity: -0.6,
        market_avg: 13.90
      }
    ],
    pricing_by_category: [
      { category: "Beverages", min: 3.50, avg: 5.20, max: 8.50, items: 45 },
      { category: "Mains", min: 9.80, avg: 13.50, max: 22.50, items: 38 },
      { category: "Desserts", min: 2.90, avg: 4.80, max: 7.90, items: 28 },
      { category: "Sides", min: 4.50, avg: 6.50, max: 9.90, items: 22 }
    ],
    ai_queries_used: 247,
    ai_query_limit: 500,
    plan_type: "Country Pro"
},
  thailand: {
    name: "Thailand",
    kpis: {
      outletsTracked: 1240,
      mentionsAnalyzed: 187500,
      trendsDetected: 156,
      marketCoverage: 82
    },
    trending_items: [
      { rank: 1, item: "Matcha Latte", category: "Beverage", growth: 208, mentions: 5200, avg_price: 150, min_price: 120, max_price: 190, competitors: 45, menu_penetration: 38, social_demand: 94 },
      { rank: 2, item: "Croissant Egg Tart", category: "Dessert", growth: 82, mentions: 3800, avg_price: 115, min_price: 95, max_price: 140, competitors: 12, menu_penetration: 18, social_demand: 91 },
      { rank: 3, item: "Som Tam Pu Pla Ra", category: "Mains", growth: 45, mentions: 8100, avg_price: 65, min_price: 45, max_price: 95, competitors: 287, menu_penetration: 72, social_demand: 88 },
      { rank: 4, item: "Seaweed Pork Floss", category: "Snacks", growth: 67, mentions: 2400, avg_price: 95, min_price: 75, max_price: 130, competitors: 8, menu_penetration: 12, social_demand: 78 },
      { rank: 5, item: "Thai Sukiyaki", category: "Mains", growth: 30, mentions: 1950, avg_price: 285, min_price: 220, max_price: 380, competitors: 18, menu_penetration: 25, social_demand: 71 },
      { rank: 6, item: "Green Milk Tea", category: "Beverage", growth: 28, mentions: 1850, avg_price: 65, min_price: 50, max_price: 85, competitors: 62, menu_penetration: 58, social_demand: 69 },
      { rank: 7, item: "Thai Fried Chicken", category: "Mains", growth: 22, mentions: 6700, avg_price: 95, min_price: 65, max_price: 145, competitors: 124, menu_penetration: 68, social_demand: 74 },
      { rank: 8, item: "Sake Pairing Menu", category: "Beverages", growth: 51, mentions: 980, avg_price: 420, min_price: 280, max_price: 680, competitors: 14, menu_penetration: 8, social_demand: 64 },
      { rank: 9, item: "Fried Rice", category: "Mains", growth: 12, mentions: 9200, avg_price: 75, min_price: 50, max_price: 120, competitors: 445, menu_penetration: 89, social_demand: 92 },
      { rank: 10, item: "Box Noodles", category: "Mains", growth: 124, mentions: 1600, avg_price: 125, min_price: 95, max_price: 165, competitors: 6, menu_penetration: 5, social_demand: 86 }
    ],
    whitespace_opportunities: [
      { item: "Sake Pairing Menu", social_demand: 64, menu_penetration: 8, gap_score: 56, outlet_analysis: [{ outlet_type: "Fine Dining", penetration: 22, demand: 78 }, { outlet_type: "Izakaya", penetration: 15, demand: 71 }, { outlet_type: "Japanese Casual", penetration: 2, demand: 52 }, { outlet_type: "Fusion", penetration: 4, demand: 58 }], recommendation: "GROWING TREND: Sake bars expanding in Bangkok. Only 8% menu penetration vs 64% social interest." },
      { item: "Croissant Egg Tart", social_demand: 91, menu_penetration: 18, gap_score: 73, outlet_analysis: [{ outlet_type: "Bakeries", penetration: 28, demand: 94 }, { outlet_type: "Cafes", penetration: 22, demand: 89 }, { outlet_type: "Dessert Shops", penetration: 12, demand: 92 }, { outlet_type: "Malls", penetration: 8, demand: 88 }], recommendation: "VIRAL OPPORTUNITY: YOLK selling 100,000+ per month but only 18% market penetration." },
      { item: "Box Noodles", social_demand: 86, menu_penetration: 5, gap_score: 81, outlet_analysis: [{ outlet_type: "Delivery-Only", penetration: 8, demand: 92 }, { outlet_type: "Quick Service", penetration: 4, demand: 84 }, { outlet_type: "Food Courts", penetration: 2, demand: 82 }], recommendation: "CRITICAL GAP: Emily's won GrabThumbsUp Awards 2025. 86% demand but only 5% offering it." }
    ],
    price_elasticity: [
      { item: "Matcha Latte", price_points: [{ price: 120, demand_index: 82, outlet_type: "Budget" }, { price: 150, demand_index: 94, outlet_type: "Mid-range" }, { price: 170, demand_index: 88, outlet_type: "Premium" }, { price: 190, demand_index: 68, outlet_type: "Luxury" }], optimal_price: 150, elasticity: -0.8, market_avg: 150 },
      { item: "Croissant Egg Tart", price_points: [{ price: 95, demand_index: 91, outlet_type: "Budget" }, { price: 115, demand_index: 95, outlet_type: "Mid-range" }, { price: 135, demand_index: 78, outlet_type: "Premium" }, { price: 140, demand_index: 62, outlet_type: "Luxury" }], optimal_price: 115, elasticity: -1.4, market_avg: 115 }
    ],
    pricing_by_category: [
      { category: "Beverages", min: 50, avg: 95, max: 190, items: 78 },
      { category: "Mains", min: 50, avg: 145, max: 680, items: 124 },
      { category: "Desserts", min: 65, avg: 105, max: 170, items: 42 },
      { category: "Snacks", min: 45, avg: 85, max: 145, items: 35 }
    ],
    ai_queries_used: 0,
    ai_query_limit: 500,
    plan_type: "Country Pro"
  }
};

function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedMarket, setSelectedMarket] = useState('singapore');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: '👋 Hello! I am your AI Strategy Co-Pilot. Ask me about pricing strategies, market opportunities, or trend analysis.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);

  const data = marketData[selectedMarket];

  const drillDownData = selectedMarket === "thailand" ? thailandDrillDownData : singaporeDrillDownData;

  const handleKPIClick = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { role: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      const responses = [
        '💡 Based on whitespace analysis, Plant-Based Burger shows 86-point gap (91% demand vs 5% penetration). Delivery-Only segment is severely underserved at 2% penetration vs 94% demand.',
        '📊 Price elasticity data suggests Matcha Soft Serve is optimally priced at $3.80. Plant-Based Burger has low price sensitivity - you can position between $13.90-$15.90 without demand loss.',
        '🎯 Top momentum plays: Korean Fried Chicken (+29% growth, 15 competitors), Yuzu drinks (+47% growth, emerging price war $3.80-$6.20).',
        '⚠️ Competitive pressure building in Yuzu category. 8 active players, recommend differentiation through unique flavor profiles or premium positioning above $5.50.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages([...newMessages, { role: 'assistant', text: randomResponse }]);
    }, 800);
  };

  const handleMarketSelect = (market) => {
    setSelectedMarket(market.toLowerCase());
    setDropdownOpen(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="enterprise-dashboard">
      <header className="top-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <Menu size={20} />
          </button>
          <h1 className="header-title">TasteRadar</h1>
          <span className="header-subtitle">AI Powered F&B Intelligence Platform</span>
        </div>
        
        <div className="header-right">
          <div className="market-selector-wrapper" ref={dropdownRef}>
            <button 
              className="market-selector-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Globe size={18} />
              <span>{data.name}</span>
              <ChevronDown size={16} className={'chevron ' + (dropdownOpen ? 'open' : '')} />
            </button>
            
            {dropdownOpen && (
              <div className="market-dropdown">
                {Object.entries(regions).map(([region, countries]) => (
                  <div key={region} className="region-group">
                    <div className="region-header">{region}</div>
                    {countries.map(country => (
                      <button
                        key={country}
                        className={'country-option ' + (selectedMarket === country.toLowerCase() ? 'selected' : '')}
                        onClick={() => handleMarketSelect(country)}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search insights..." />
          </div>
          <button className="header-icon-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="header-icon-btn">
            <Settings size={20} />
          </button>
          <div className="user-avatar">
            <User size={18} />
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className={'sidebar ' + (sidebarCollapsed ? 'collapsed' : '')}>
          <div className="sidebar-section">
            <div className="sidebar-label">NAVIGATION</div>
            {navItems.map(item => (
              <button
                key={item.id}
                className={'sidebar-item ' + (activeView === item.id ? 'active' : '')}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon size={20} />
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && activeView === item.id && <ChevronRight size={16} className="item-arrow" />}
              </button>
            ))}
          </div>
        </aside>

        <main className="main-content">
          {activeView === 'overview' && (
            <div className="view-container">
              <div className="view-header">
                <h2>Market Overview</h2>
                <p>Real-time intelligence across {data.name} F&B market</p>
              </div>

              <div className="kpi-grid">
  <div className="kpi-card" onClick={() => handleKPIClick("outlets")}>
    <div className="kpi-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <Activity size={24} />
    </div>
    <div className="kpi-content">
      <div className="kpi-header">
        <div className="kpi-value">{data.kpis.outletsTracked.toLocaleString()}</div>
        <div className="info-icon" title="Total F&B establishments monitored">ⓘ</div>
      </div>
      <div className="kpi-label">Outlets Tracked</div>
      <div className="kpi-change positive">+12% vs last month</div>
    </div>
  </div>

  <div className="kpi-card" onClick={() => handleKPIClick("mentions")}>
    <div className="kpi-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
      <MessageCircle size={24} />
    </div>
    <div className="kpi-content">
      <div className="kpi-header">
        <div className="kpi-value">{data.kpis.mentionsAnalyzed.toLocaleString()}</div>
        <div className="info-icon" title="Total data points analyzed (menu images + reviews + social mentions including country-specific platforms like XiaoHongShu, Wongnai, TikTok)">ⓘ</div>
      </div>
      <div className="kpi-label">Mentions Analyzed</div>
      <div className="kpi-change positive">+8% vs last month</div>
    </div>
  </div>

  <div className="kpi-card" onClick={() => handleKPIClick("trends")}>
    <div className="kpi-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
      <TrendingUp size={24} />
    </div>
    <div className="kpi-content">
      <div className="kpi-header">
        <div className="kpi-value">{data.kpis.trendsDetected}</div>
        <div className="info-icon" title="Items showing significant growth (>50% Month-over-Month increase in mentions)">ⓘ</div>
      </div>
      <div className="kpi-label">Trends Detected</div>
      <div className="kpi-change positive">+15% vs last month</div>
    </div>
  </div>

  <div className="kpi-card" onClick={() => handleKPIClick("popular")}>
    <div className="kpi-icon" style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
      <Target size={24} />
    </div>
    <div className="kpi-content">
      <div className="kpi-header">
        <div className="kpi-value">{data.kpis.popularItems}</div>
        <div className="info-icon" title="Items with strong current momentum (mentioned 5 or more times across outlets)">ⓘ</div>
      </div>
      <div className="kpi-label">Popular Items</div>
      <div className="kpi-change">Mentioned 5+ times</div>
    </div>
  </div>

  <div className="kpi-card" onClick={() => handleKPIClick("coverage")}>
    <div className="kpi-icon" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
      <Target size={24} />
    </div>
    <div className="kpi-content">
      <div className="kpi-header">
        <div className="kpi-value">{data.kpis.marketCoverage}%</div>
        <div className="info-icon" title="Percentage of digitally-trackable F&B outlets currently monitored in this market">ⓘ</div>
      </div>
      <div className="kpi-label">Market Coverage</div>
      <div className="kpi-change positive">+5% vs last month</div>
    </div>
  </div>
</div>
              <div className="content-card">
                <div className="card-header">
                  <h3>Top 10 Trending Items</h3>
                  <p>Ranked by social media growth over 30 days</p>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data.trending_items.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="item" angle={-45} textAnchor="end" height={120} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="growth" fill="#667eea" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="content-grid-2">
                <div className="content-card">
                  <div className="card-header">
                    <h3>Category Distribution</h3>
                    <p>Trending items by category</p>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Beverages', value: 4, fill: '#667eea' },
                            { name: 'Mains', value: 4, fill: '#f093fb' },
                            { name: 'Desserts', value: 1, fill: '#4facfe' },
                            { name: 'Sides', value: 1, fill: '#43e97b' }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => entry.name}
                          outerRadius={100}
                          dataKey="value"
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header">
                    <h3>Quick Stats</h3>
                    <p>Market snapshot</p>
                  </div>
                  <div className="card-body">
                    <div className="stat-list">
                      <div className="stat-item">
                        <span className="stat-label">Trending Ingredients (30d)</span>
                        <span className="stat-value">18</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">New Flavor Launches (30d)</span>
                        <span className="stat-value">34</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Category Growth Rate</span>
                        <span className="stat-value">+23%</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Market Coverage</span>
                        <span className="stat-value">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'opportunities' && (
            <div className="view-container">
              <div className="view-header">
                <h2>Opportunity Explorer</h2>
                <p>Identify market gaps with high demand and low supply</p>
              </div>

              {data.whitespace_opportunities.map((opp, idx) => (
                <div key={idx} className="content-card opportunity-card">
                  <div className="card-header">
                    <div>
                      <h3>{opp.item}</h3>
                      <p className="gap-indicator">Gap Score: <strong style={{color: '#e74c3c'}}>{opp.gap_score}</strong></p>
                    </div>
                    <div className="opportunity-badge">
                      {opp.gap_score > 80 ? '🔥 Critical' : opp.gap_score > 60 ? '⚠️ High' : '💡 Medium'}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="demand-supply-chart">
                      <div className="chart-row">
                        <span className="chart-label">Social Demand</span>
                        <div className="chart-bar-container">
                          <div className="chart-bar demand-bar" style={{width: opp.social_demand + '%'}}>
                            <span>{opp.social_demand}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="chart-row">
                        <span className="chart-label">Menu Penetration</span>
                        <div className="chart-bar-container">
                          <div className="chart-bar supply-bar" style={{width: opp.menu_penetration + '%'}}>
                            <span>{opp.menu_penetration}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="outlet-analysis-grid">
                      {opp.outlet_analysis.map((outlet, i) => (
                        <div key={i} className="outlet-card">
                          <div className="outlet-header">{outlet.outlet_type}</div>
                          <div className="outlet-metrics">
                            <div className="outlet-metric">
                              <span>Penetration</span>
                              <strong style={{color: '#3b82f6'}}>{outlet.penetration}%</strong>
                            </div>
                            <div className="outlet-metric">
                              <span>Demand</span>
                              <strong style={{color: '#ef4444'}}>{outlet.demand}%</strong>
                            </div>
                            <div className="outlet-metric">
                              <span>Gap</span>
                              <strong style={{color: '#10b981'}}>{outlet.demand - outlet.penetration}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="recommendation-box">
                      <Lightbulb size={20} />
                      <p>{opp.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === 'pricing' && (
            <div className="view-container">
              <div className="view-header">
                <h2>Pricing Intelligence</h2>
                <p>Menu economics and price elasticity analysis</p>
              </div>

              <div className="content-card">
                <div className="card-header">
                  <h3>Pricing by Category</h3>
                  <p>Market price ranges across menu categories</p>
                </div>
                <div className="card-body">
                  {data.pricing_by_category.map((cat, idx) => (
                    <div key={idx} className="price-range-item">
                      <div className="price-range-header">
                        <strong>{cat.category}</strong>
                        <span className="item-count">{cat.items} items tracked</span>
                      </div>
                      <div className="price-range-visual">
                        <span className="price-point">${cat.min.toFixed(2)}</span>
                        <div className="price-range-bar">
                          <div className="price-track"></div>
                          <div className="price-marker avg-marker" style={{left: ((cat.avg - cat.min) / (cat.max - cat.min) * 100) + '%'}}>
                            <div className="marker-label">${cat.avg.toFixed(2)}</div>
                          </div>
                        </div>
                        <span className="price-point">${cat.max.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {data.price_elasticity.map((item, idx) => (
                <div key={idx} className="content-card">
                  <div className="card-header">
                    <div>
                      <h3>{item.item}</h3>
                      <p>Price Elasticity: <strong>{item.elasticity}</strong> | Optimal Price: <strong style={{color: '#10b981'}}>${item.optimal_price.toFixed(2)}</strong></p>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="content-grid-2">
                      <div>
                        <ResponsiveContainer width="100%" height={300}>
                          <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="price" name="Price ($)" />
                            <YAxis dataKey="demand_index" name="Demand Index" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Price Points" data={item.price_points} fill="#667eea">
                              {item.price_points.map((entry, index) => (
                                <Cell key={'cell-' + index} fill={entry.price === item.optimal_price ? '#10b981' : '#667eea'} />
                              ))}
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="pricing-insights">
                        <h4>Pricing Strategy Insights</h4>
                        <div className="insight-item">
                          <div className="insight-label">Market Average</div>
                          <div className="insight-value">${item.market_avg.toFixed(2)}</div>
                        </div>
                        <div className="insight-item">
                          <div className="insight-label">Optimal Price</div>
                          <div className="insight-value" style={{color: '#10b981'}}>${item.optimal_price.toFixed(2)}</div>
                        </div>
                        <div className="insight-item">
                          <div className="insight-label">Price Sensitivity</div>
                          <div className="insight-value">{Math.abs(item.elasticity) > 1 ? 'High' : 'Low'}</div>
                        </div>
                        <div className="insight-recommendation">
                          <Target size={18} />
                          <p>{Math.abs(item.elasticity) > 1 
                            ? 'High price sensitivity. Stay close to market average for volume.'
                            : 'Low price sensitivity. Premium positioning viable without demand loss.'
                          }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === 'ai' && (
            <div className="view-container ai-hub">
              <div className="view-header">
                <h2>AI Strategy Hub</h2>
                <p>Ask your AI co-pilot for strategic recommendations</p>
              </div>

              <div className="ai-hub-grid">
                <div className="content-card ai-chat-card">
                  <div className="card-header">
                    <h3>AI Co-Pilot</h3>
                    <div className="usage-indicator">
                      {data.ai_queries_used}/{data.ai_query_limit} queries used
                    </div>
                  </div>
                  <div className="card-body ai-chat-container">
                    <div className="ai-messages">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={'ai-message ' + msg.role}>
                          <div className="message-content">{msg.text}</div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="ai-input-container">
                      <input
                        type="text"
                        placeholder="Ask about pricing, trends, or opportunities..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button onClick={handleSendMessage}>
                        <Send size={20} />
                      </button>
                    </div>
                    <div className="ai-suggestions">
                      <button onClick={() => setChatInput("What's the optimal pricing for a new yuzu drink?")}>
                        💰 Pricing Strategy
                      </button>
                      <button onClick={() => setChatInput("Which whitespace opportunities should I prioritize?")}>
                        🎯 Opportunity Ranking
                      </button>
                      <button onClick={() => setChatInput("Analyze competitive pressure in the bubble tea category")}>
                        📊 Competitive Analysis
                      </button>
                    </div>
                  </div>
                </div>

                <div className="content-card ai-summary-card">
                  <div className="card-header">
                    <h3>Market Intelligence Summary</h3>
                  </div>
                  <div className="card-body">
                    <div className="summary-section">
                      <h4>🔥 Top Opportunities</h4>
                      <ul className="summary-list">
                        <li>Plant-Based Burger (86 gap score)</li>
                        <li>Ube Latte (74 gap score)</li>
                        <li>Yuzu Lemon Tea (77 gap score)</li>
                      </ul>
                    </div>
                    <div className="summary-section">
                      <h4>⚠️ Competitive Alerts</h4>
                      <ul className="summary-list">
                        <li>Yuzu drinks: 8 competitors, price war emerging</li>
                        <li>Brown Sugar Boba: 22 competitors, market saturation</li>
                      </ul>
                    </div>
                    <div className="summary-section">
                      <h4>💡 Pricing Insights</h4>
                      <ul className="summary-list">
                        <li>Matcha optimal at $3.80 (high sensitivity)</li>
                        <li>Plant-Based Burger: Low sensitivity, premium viable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <footer className="dashboard-footer">
            <p>© 2025 Roving Rock Pte Ltd. All rights reserved.</p>
          </footer>
        </main>
      </div>

      <KPIModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        data={modalType ? drillDownData[modalType] : {}}
        marketName={data.name}
      />
    </div>
  );
}

export default Dashboard;
