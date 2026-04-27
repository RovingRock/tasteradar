import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { X } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#f6d365', '#fda085'];

function KPIModal({ isOpen, onClose, type, data, marketName }) {
  if (!isOpen) return null;

  const renderOutletsContent = () => (
    <div className="modal-content-grid">
      <div className="modal-section full-width">
        <h4>📍 Tracked Outlet Locations</h4>
        <div className="map-container">
          <MapContainer 
            center={data.mapCenter || [13.7563, 100.5018]} 
            zoom={11} 
            style={{ height: '400px', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.outlets && data.outlets.map((outlet, idx) => (
              <Marker key={idx} position={[outlet.lat, outlet.lng]}>
                <Popup>
                  <strong>{outlet.name}</strong><br/>
                  {outlet.type} - {outlet.mentions} mentions
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="modal-section">
        <h4>🏆 Top 10 Outlets by Mentions</h4>
        <div className="outlet-list">
          {data.topOutlets && data.topOutlets.map((outlet, idx) => (
            <div key={idx} className="outlet-item">
              <div className="outlet-rank">#{idx + 1}</div>
              <div className="outlet-details">
                <div className="outlet-name">{outlet.name}</div>
                <div className="outlet-meta">{outlet.type} • {outlet.location}</div>
              </div>
              <div className="outlet-mentions">{outlet.mentions.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-section">
        <h4>📊 Breakdown by Outlet Type</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.outletTypes}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.outletTypes && data.outletTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="modal-section">
        <h4>🆕 Recent Additions (This Month)</h4>
        <div className="recent-outlets">
          {data.recentAdditions && data.recentAdditions.map((outlet, idx) => (
            <div key={idx} className="recent-outlet-card">
              <div className="recent-outlet-name">{outlet.name}</div>
              <div className="recent-outlet-info">
                <span className="outlet-type-badge">{outlet.type}</span>
                <span className="outlet-date">Added {outlet.daysAgo} days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentionsContent = () => (
    <div className="modal-content-grid">
      <div className="modal-section full-width">
        <h4>🔥 Trending Topics</h4>
        <div className="trending-topics-grid">
          {data.trendingTopics && data.trendingTopics.map((topic, idx) => (
            <div key={idx} className="topic-card">
              <div className="topic-rank">#{idx + 1}</div>
              <div className="topic-details">
                <div className="topic-name">{topic.name}</div>
                <div className="topic-stats">
                  <span className="topic-mentions">{topic.mentions.toLocaleString()} mentions</span>
                  <span className={'topic-growth ' + (topic.growth > 0 ? 'positive' : 'negative')}>
                    {topic.growth > 0 ? '+' : ''}{topic.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-section">
        <h4>😊 Sentiment Analysis</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.sentiment}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}%`}
              outerRadius={80}
              dataKey="value"
            >
              {data.sentiment && data.sentiment.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="modal-section">
        <h4>📱 Platform Breakdown</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.platforms}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mentions" fill="#667eea" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTrendsContent = () => (
    <div className="modal-content-grid">
      <div className="modal-section full-width">
        <h4>📈 All {data.totalTrends} Detected Trends</h4>
        <div className="trends-table">
          <div className="trends-header">
            <div>Rank</div>
            <div>Item</div>
            <div>Category</div>
            <div>Growth</div>
            <div>Mentions</div>
            <div>Competitors</div>
          </div>
          {data.allTrends && data.allTrends.slice(0, 50).map((trend, idx) => (
            <div key={idx} className="trends-row">
              <div>#{idx + 1}</div>
              <div className="trend-item-name">{trend.item}</div>
              <div><span className="category-badge">{trend.category}</span></div>
              <div className={'growth-value ' + (trend.growth > 50 ? 'high' : trend.growth > 20 ? 'medium' : 'low')}>
                +{trend.growth}%
              </div>
              <div>{trend.mentions.toLocaleString()}</div>
              <div>{trend.competitors}</div>
            </div>
          ))}
        </div>
        {data.allTrends && data.allTrends.length > 50 && (
          <div className="trends-note">Showing top 50 of {data.totalTrends} trends</div>
        )}
      </div>
    </div>
  );

  const renderCoverageContent = () => (
    <div className="modal-content-grid">
      <div className="modal-section full-width">
        <h4>🗺️ Geographic Coverage Heatmap</h4>
        <div className="map-container">
          <MapContainer 
            center={data.mapCenter || [13.7563, 100.5018]} 
            zoom={10} 
            style={{ height: '450px', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.provinces && data.provinces.map((province, idx) => (
              <CircleMarker
                key={idx}
                center={[province.lat, province.lng]}
                radius={province.coverage * 0.3}
                fillColor={province.coverage > 70 ? '#ef4444' : province.coverage > 40 ? '#f59e0b' : '#eab308'}
                fillOpacity={0.6}
                stroke={false}
              >
                <Popup>
                  <strong>{province.name}</strong><br/>
                  Coverage: {province.coverage}%<br/>
                  Outlets: {province.outlets}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="modal-section">
        <h4>📍 Coverage by Province/District</h4>
        <div className="province-list">
          {data.provinces && data.provinces.map((province, idx) => (
            <div key={idx} className="province-item">
              <div className="province-info">
                <div className="province-name">{province.name}</div>
                <div className="province-outlets">{province.outlets} outlets</div>
              </div>
              <div className="province-coverage">
                <div className="coverage-bar">
                  <div 
                    className="coverage-fill" 
                    style={{
                      width: `${province.coverage}%`,
                      backgroundColor: province.coverage > 70 ? '#10b981' : province.coverage > 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span className="coverage-percent">{province.coverage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-section">
        <h4>⚠️ Uncovered Areas</h4>
        <div className="uncovered-list">
          {data.uncovered && data.uncovered.map((area, idx) => (
            <div key={idx} className="uncovered-item">
              <div className="uncovered-name">{area.name}</div>
              <div className="uncovered-reason">{area.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const titles = {
    outlets: '🏪 Outlets Tracked',
    mentions: '💬 Mentions Analyzed',
    trends: '📈 Trends Detected',
    coverage: '🎯 Market Coverage'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{titles[type]}</h2>
            <p className="modal-subtitle">{marketName} Market Deep Dive</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {type === 'outlets' && renderOutletsContent()}
          {type === 'mentions' && renderMentionsContent()}
          {type === 'trends' && renderTrendsContent()}
          {type === 'coverage' && renderCoverageContent()}
        </div>
      </div>
    </div>
  );
}

export default KPIModal;
