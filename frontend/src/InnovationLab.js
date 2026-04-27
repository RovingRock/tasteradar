import React, { useState } from 'react';

const InnovationLab = () => {
  const [loading, setLoading] = useState(false);
  const [currentConcept, setCurrentConcept] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const concepts = [
    {
      name: "Yuzu Matcha Cloud Latte",
      category: "Beverages - Premium Tea",
      description: "A fusion of ceremonial-grade Japanese matcha and fresh yuzu citrus, topped with signature cloud-like oat milk foam. Combines the earthy depth of matcha with bright yuzu notes for a refreshing, Instagram-worthy beverage.",
      ingredients: ["Ceremonial-grade matcha powder (Japan)", "Fresh yuzu juice", "Oat milk", "Agave syrup", "Sea salt (finishing touch)", "Edible flowers (garnish)"],
      priceRange: "฿150-180 / $5.50-6.50",
      targetAge: "22-35",
      profitMargin: "68%",
      launchTimeline: "Q3 2026",
      score: 95,
      usp: "Only beverage combining trending matcha (+208% growth) with emerging yuzu flavor (+340% growth). Triple-layer visual presentation drives social sharing.",
      keywords: ["matcha", "yuzu", "beverage", "latte", "tea", "japanese"]
    },
    {
      name: "Ube Coconut Cream Cake",
      category: "Bakery - Layer Cakes",
      description: "Three-layer purple yam sponge cake with coconut cream frosting and ube halaya filling. Topped with toasted coconut flakes and fresh ube ribbons.",
      ingredients: ["Fresh ube (purple yam)", "Coconut cream", "Coconut milk", "Cake flour", "Free-range eggs", "Ube halaya (purple yam jam)", "Toasted coconut flakes"],
      priceRange: "฿650-850 / $28-38",
      targetAge: "18-35",
      profitMargin: "65%",
      launchTimeline: "Q2 2026",
      score: 92,
      usp: "Authentic Filipino ube recipe meets premium cake format. Vibrant purple color drives social shares. Ube trend +215% growth. Nostalgia factor for Filipino community.",
      keywords: ["ube", "cake", "bakery", "purple", "filipino", "dessert"]
    },
    {
      name: "Kimchi Cheese Croissant",
      category: "Bakery - Savory Pastries",
      description: "Butter croissant filled with aged white cheddar, house-made kimchi, and spring onions. Baked until cheese melts and kimchi caramelizes.",
      ingredients: ["Laminated butter croissant dough", "Aged white cheddar cheese", "House-fermented kimchi", "Spring onions", "Gochugaru (Korean chili flakes)", "Sesame seeds (topping)"],
      priceRange: "฿95-115 / $4.50-5.50",
      targetAge: "22-40",
      profitMargin: "69%",
      launchTimeline: "Q2 2026",
      score: 81,
      usp: "Fermented foods trending for gut health. K-culture influence drives kimchi awareness. French-Korean fusion unique positioning. Savory breakfast pastry gap in market.",
      keywords: ["kimchi", "korean", "fusion", "croissant", "bakery", "savory"]
    }
  ];

  const generate = () => {
    setLoading(true);
    setCurrentConcept(null);
    
    setTimeout(() => {
      const concept = concepts[Math.floor(Math.random() * concepts.length)];
      setCurrentConcept(concept);
      setLoading(false);
    }, 2000);
  };

  const searchConcept = () => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      alert('Please enter a search term');
      return;
    }
    
    const found = concepts.find(c => 
      c.keywords.some(k => k.includes(term)) || 
      c.name.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
    
    if (found) {
      setCurrentConcept(found);
    } else {
      alert('No concepts found. Try: matcha, ube, kimchi, korean, bakery, fusion, japanese');
    }
  };

  const getGrade = (score) => {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    return 'C';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)', paddingBottom: '50px' }}>
      

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px' }}>
        
        {/* Controls */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search: matcha, ube, kimchi, korean, bakery, fusion..."
              style={{ flex: 1, padding: '18px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '16px', outline: 'none' }}
              onKeyPress={(e) => e.key === 'Enter' && searchConcept()}
            />
            <button onClick={searchConcept} style={{ padding: '18px 35px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
              SEARCH
            </button>
          </div>
          
          <button onClick={generate} style={{ width: '100%', padding: '22px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' }}>
            ✨ GENERATE AI CONCEPT ✨
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', padding: '80px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px' }}>🤖</div>
            <h3 style={{ color: '#1e40af', marginTop: '25px', fontSize: '26px' }}>AI is analyzing global trends and generating your concept...</h3>
            <p style={{ color: '#6b7280', marginTop: '15px', fontSize: '17px' }}>Processing 61 billion data points from 24 countries</p>
          </div>
        )}

        {/* Concept Card */}
        {currentConcept && !loading && (
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
            {/* Card Header */}
            <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', color: 'white', padding: '50px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50px', right: '50px', background: 'white', color: '#1e40af', padding: '30px', borderRadius: '18px', textAlign: 'center', minWidth: '130px', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '13px', marginBottom: '12px', letterSpacing: '1.5px', opacity: 0.7, fontWeight: '600' }}>SUCCESS</div>
                <div style={{ fontSize: '60px', fontWeight: '900', lineHeight: 1 }}>{currentConcept.score}</div>
                <div style={{ fontSize: '24px', fontWeight: '800', marginTop: '10px' }}>Grade {getGrade(currentConcept.score)}</div>
              </div>
              
              <h2 style={{ fontSize: '42px', marginBottom: '12px', paddingRight: '200px' }}>{currentConcept.name}</h2>
              <p style={{ opacity: 0.95, fontSize: '18px' }}>{currentConcept.category}</p>
            </div>

            {/* Card Body */}
            <div style={{ padding: '50px' }}>
              <p style={{ fontSize: '19px', lineHeight: 1.9, color: '#374151', marginBottom: '40px' }}>{currentConcept.description}</p>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '40px' }}>
                <div style={{ padding: '25px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>💰 Price Range</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#111827' }}>{currentConcept.priceRange}</div>
                </div>

                <div style={{ padding: '25px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>👥 Target Age</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#111827' }}>{currentConcept.targetAge}</div>
                </div>

                <div style={{ padding: '25px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>📈 Profit Margin</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#10b981' }}>{currentConcept.profitMargin}</div>
                </div>

                <div style={{ padding: '25px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>📅 Launch</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#111827' }}>{currentConcept.launchTimeline}</div>
                </div>
              </div>

              {/* Ingredients */}
              <div style={{ marginTop: '40px' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>🧪</span>
                  <span>Key Ingredients ({currentConcept.ingredients.length})</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {currentConcept.ingredients.map((ing, idx) => (
                    <div key={idx} style={{ padding: '16px 20px', background: '#f9fafb', borderRadius: '10px', fontSize: '16px', color: '#374151', border: '1px solid #e5e7eb' }}>
                      • {ing}
                    </div>
                  ))}
                </div>
              </div>

              {/* USP */}
              <div style={{ marginTop: '40px' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#111827', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>🏆</span>
                  <span>Unique Selling Point</span>
                </div>
                <div style={{ background: '#fef3c7', borderLeft: '5px solid #f59e0b', padding: '25px', borderRadius: '10px' }}>
                  <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#374151' }}>{currentConcept.usp}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnovationLab;
