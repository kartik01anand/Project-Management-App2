'use client'

import React, { useState } from 'react';

// Card Component - back to original style
const Card = ({ id, title, imageUrl, imageClass, stats, columnId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleDragStart = (e) => {
    const payload = JSON.stringify({ cardId: id, sourceColumnId: columnId });
    e.dataTransfer.setData('application/json', payload);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-3 mb-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      draggable
      onDragStart={handleDragStart}
    >
      {imageUrl && (
        <div className="relative mb-2">
          <img src={`/images/${imageUrl}.jpg`} alt={cardTitle} className="w-full h-24 object-cover rounded-md" />
          {imageClass?.includes('tutorial') && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              <div className="w-20 h-2 rounded-sm bg-white bg-opacity-30"></div>
              <div className="w-20 h-2 rounded-sm bg-white bg-opacity-30"></div>
            </div>
          )}
          {imageClass?.includes('video-thumbnail') && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white bg-opacity-60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white bg-opacity-60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white bg-opacity-60"></div>
            </div>
          )}
        </div>
      )}
      {isEditing ? (
        <input
          type="text"
          value={cardTitle}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full text-sm font-semibold text-gray-800 outline-none"
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="text-sm font-semibold leading-snug text-gray-800">{cardTitle}</div>
      )}
      {stats && (
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          {stats.comments && (
            <div className="flex items-center gap-1">💬 {stats.comments}</div>
          )}
          {stats.completed !== undefined && stats.total !== undefined && (
            <div className="flex items-center gap-1">✅ {stats.completed}/{stats.total}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Column Component - back to original style
const Column = ({ title, columnId, cards, onAddCard, onDropCard }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      const { cardId, sourceColumnId } = JSON.parse(data);
      if (cardId !== undefined && sourceColumnId) {
        onDropCard(columnId, Number(cardId), String(sourceColumnId));
      }
    } catch {
      // ignore malformed drops
    }
  };

  const handleAdd = () => onAddCard(columnId);

  return (
    <div className="flex flex-col p-4 bg-white/90 backdrop-blur-sm rounded-2xl w-72 shrink-0 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <button className="text-xl text-gray-600 transition-opacity duration-200 opacity-70 hover:opacity-100">⋯</button>
      </div>
      <div className="flex-1 overflow-y-auto" onDragOver={handleDragOver} onDrop={handleDrop}>
        {cards.map(card => (
          <Card key={card.id} columnId={columnId} {...card} />
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="flex items-center w-full gap-2 px-4 py-2 mt-4 text-sm font-medium text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800"
      >
        <span>+</span>
        Add a card
      </button>
    </div>
  );
};

// Header Component - back to original style
const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
        Management board
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:-translate-y-px">
          ⚡ Automation
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:-translate-y-px">
          Share
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 rounded-md hover:bg-gray-200 hover:-translate-y-px">
          ⋯
        </button>
      </div>
    </header>
  );
};

// Sidebar Component - back to original style
const Sidebar = () => {
  return (
    <aside className="p-5 bg-white/90 backdrop-blur-sm rounded-2xl w-72 shrink-0 shadow-lg border border-gray-200">
      <h3 className="mb-4 text-base font-semibold text-gray-800">📥 Inbox</h3>
      <div className="p-4 text-center bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">Consolidate your to-dos</h4>
        <p className="text-xs leading-tight text-gray-600">
          Email it, say it, forward it to My App — however it comes.
        </p>
      </div>
    </aside>
  );
};

// Professional SaaS background with moving spherical balls
const ProfessionalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100"></div>
      
      {/* Moving spherical balls */}
      <div className="absolute inset-0">
        {/* Ball 1 - Large, slow moving */}
        <div 
          className="absolute w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float-slow"
          style={{
            top: '10%',
            left: '10%',
            animation: 'float-1 20s infinite ease-in-out'
          }}
        ></div>
        
        {/* Ball 2 - Medium, medium speed */}
        <div 
          className="absolute w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"
          style={{
            top: '60%',
            right: '15%',
            animation: 'float-2 25s infinite ease-in-out'
          }}
        ></div>
        
        {/* Ball 3 - Small, faster */}
        <div 
          className="absolute w-48 h-48 bg-indigo-200/25 rounded-full blur-2xl"
          style={{
            bottom: '20%',
            left: '30%',
            animation: 'float-3 15s infinite ease-in-out'
          }}
        ></div>
        
        {/* Ball 4 - Very subtle, large */}
        <div 
          className="absolute w-80 h-80 bg-cyan-200/15 rounded-full blur-3xl"
          style={{
            top: '40%',
            right: '40%',
            animation: 'float-4 30s infinite ease-in-out'
          }}
        ></div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(-25px, -40px) scale(1.05); }
          50% { transform: translate(35px, -10px) scale(0.95); }
          75% { transform: translate(-15px, 25px) scale(1.02); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -35px) scale(1.15); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          20% { transform: translate(20px, -15px) scale(1.03); }
          40% { transform: translate(-30px, -25px) scale(0.97); }
          60% { transform: translate(25px, 20px) scale(1.05); }
          80% { transform: translate(-15px, 30px) scale(0.98); }
        }
      `}</style>
    </div>
  );
};

// Main App Component - original functionality with professional background
const AestheticKanbanBoard = () => {
  const trelloGuideCards = [
    {
      id: 1,
      title: 'Capture from email, Slack, and Teams',
      imageClass: 'tutorial-1',
      imageUrl: '2',
      stats: { comments: 1, completed: 0, total: 6 }
    },
    {
      id: 2,
      title: 'Dive into Trello basics',
      imageClass: 'tutorial-2',
      imageUrl: '3',
      stats: { comments: 1, completed: 0, total: 7 }
    },
    {
      id: 3,
      title: 'Build your first board',
      imageClass: 'tutorial-3',
      imageUrl: '4',
    }
  ];

  const laterCards = [
    {
      id: 4,
      title: '🔮 New to My App? Start here',
      imageClass: 'video-thumbnail',
      imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    }
  ];

  const [columns, setColumns] = useState([
    { id: 'today', title: 'Today', cards: [{ id: 5, title: 'Start using My App' }] },
    { id: 'week', title: 'This Week', cards: [] },
    { id: 'later', title: 'Later', cards: laterCards }
  ]);
  
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDockVisible, setIsDockVisible] = useState(true);

  const allColumnCatalog = [
    { id: 'today', title: 'Planner', icon: '🗓️', defaultCards: [{ id: 5, title: 'Start using My App' }] },
    { id: 'week', title: 'Board', icon: '📋', defaultCards: [] },
    { id: 'later', title: 'Later', icon: '🕐', defaultCards: laterCards }
  ];

  const handleAddCard = (columnId) => {
    setColumns(prev => prev.map(col => {
      if (col.id === columnId) {
        const newCard = { id: Date.now(), title: `New Card ${col.cards.length + 1}` };
        return { ...col, cards: [...col.cards, newCard] };
      }
      return col;
    }));
  };

  const handleDropCard = (targetColumnId, cardId, sourceColumnId) => {
    if (targetColumnId === sourceColumnId) return;
    setColumns(prev => {
      let movingCard;
      const withoutFrom = prev.map(col => {
        if (col.id === sourceColumnId) {
          const remaining = col.cards.filter(c => {
            if (c.id === cardId) {
              movingCard = c;
              return false;
            }
            return true;
          });
          return { ...col, cards: remaining };
        }
        return col;
      });

      if (!movingCard) return prev;

      return withoutFrom.map(col =>
        col.id === targetColumnId ? { ...col, cards: [movingCard, ...col.cards] } : col
      );
    });
  };
  
  const toggleColumn = (id) => {
    setColumns(prev => {
      const exists = prev.some(c => c.id === id);
      if (exists) {
        return prev.filter(c => c.id !== id);
      }
      const catalog = allColumnCatalog.find(c => c.id === id);
      if (!catalog) return prev;
      return [...prev, { id: catalog.id, title: catalog.title, cards: catalog.defaultCards }];
    });
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 relative">
      {/* Professional background with moving spherical balls */}
      <ProfessionalBackground />
      
      <div className="relative z-10">
        <Header />
        <main className="flex gap-4 p-4 h-[calc(100vh-60px)] overflow-x-auto">
          {showSidebar && <Sidebar />}
          <div className="flex flex-1 gap-4 overflow-x-auto">
            {columns.map(col => (
              <Column
                key={col.id}
                title={col.title}
                columnId={col.id}
                cards={col.cards}
                onAddCard={handleAddCard}
                onDropCard={handleDropCard}
              />
            ))}
          </div>
        </main>
        <div
          className={`fixed z-50 flex items-center gap-3 px-3 py-2 text-sm bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl left-1/2 -translate-x-1/2 bottom-4 transition-transform duration-300 shadow-lg ${isDockVisible ? 'translate-y-0' : 'translate-y-24'}`}
        >
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`${showSidebar ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'} flex items-center gap-2 px-4 py-2 rounded-xl transition-colors border`}
            title="Inbox"
          >
            <span>📥</span>
            <span className="hidden sm:inline">Inbox</span>
          </button>
          {allColumnCatalog.map(({ id, title, icon }) => {
            const active = columns.some(c => c.id === id);
            return (
              <button
                key={id}
                onClick={() => toggleColumn(id)}
                className={`${active ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'} flex items-center gap-2 px-4 py-2 rounded-xl transition-colors border`}
                title={title}
              >
                <span>{icon}</span>
                <span className="hidden sm:inline">{title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AestheticKanbanBoard;