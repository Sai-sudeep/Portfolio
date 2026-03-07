---
layout: page
title: Tools
permalink: /tools/
---

<div class="detail-page">
  <div class="about-content">

    <div class="intro-box">
      <h2>🛠️ Tools & Applications</h2>
      <p>I built this page because I used to rely on different websites and tools for small day-to-day tasks. Sometimes a site would have server issues, other times I would forget which one I had used earlier. So I started putting together a few simple tools in one place to make things easier. Hope you find these tools interesting and useful.</p>
    </div>

    <div class="tools-grid">

      <div class="tool-card">
        <div class="tool-icon">🎹</div>
        <div class="tool-info">
          <h3>E-board</h3>
          <p>A professional virtual electronic keyboard featuring physical modeling synthesis and a high-fidelity 3D interface. Supports a full 88-key range (A0-A7) with detented controls and haptic feedback.</p>
        </div>
        <div class="tool-actions">
          <button class="tool-btn tool-btn-preview" onclick="openTool('e-board')">👁️ Preview Here</button>
          <a class="tool-btn tool-btn-newpage" href="/assets/tools/e-board.html" target="_blank">↗ Open in New Page</a>
        </div>
      </div>

      <div class="tool-card">
        <div class="tool-icon">🎵</div>
        <div class="tool-info">
          <h3>Alankar / Palta Maker</h3>
          <p>Generate classical Hindustani music practice patterns (alankars and paltas) across swaras. Useful for vocalists and instrumentalists at all levels.</p>
        </div>
        <div class="tool-actions">
          <button class="tool-btn tool-btn-preview" onclick="openTool('palta-maker')">👁️ Preview Here</button>
          <a class="tool-btn tool-btn-newpage" href="/assets/tools/palta-maker.html" target="_blank">↗ Open in New Page</a>
        </div>
      </div>

      <div class="tool-card">
        <div class="tool-icon">🎮</div>
        <div class="tool-info">
          <h3>WORDLE Regex Solver</h3>
          <p>Solve Wordle puzzles step by step using regex patterns. Enter your guess, mark each letter grey / yellow / green, and watch the candidate list narrow down to the answer.</p>
        </div>
        <div class="tool-actions">
          <button class="tool-btn tool-btn-preview" onclick="openTool('wordle-regex-solver')">👁️ Preview Here</button>
          <a class="tool-btn tool-btn-newpage" href="/assets/tools/wordle-regex-solver.html" target="_blank">↗ Open in New Page</a>
        </div>
      </div>

      <div class="tool-card">
        <div class="tool-icon">📄</div>
        <div class="tool-info">
          <h3>PDF Page Surgeon</h3>
          <p>Reorder, delete pages, and apply N-up layouts (multiple pages per sheet) completely locally in your browser. No files are uploaded.</p>
        </div>
        <div class="tool-actions">
          <button class="tool-btn tool-btn-preview" onclick="openTool('pdf-surgeon')">👁️ Preview Here</button>
          <a class="tool-btn tool-btn-newpage" href="/assets/tools/pdf-surgeon.html" target="_blank">↗ Open in New Page</a>
        </div>
      </div>

    </div>

    <div class="tool-embed" id="tool-embed" style="display:none;">
      <div class="tool-embed-header">
        <span id="tool-embed-title"></span>
        <button class="tool-close-btn" onclick="closeTool()">✕ Close</button>
      </div>
      <iframe id="tool-iframe" src="" frameborder="0" allowfullscreen></iframe>
    </div>

  </div>
</div>

<style>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tool-card {
  background: #ffffff !important;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(8,37,103,0.15);
  border-color: #082567;
}

.tool-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.tool-info h3 {
  color: #082567 !important;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.tool-info p {
  color: #333333 !important;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  text-align: left !important;
}

.tool-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-wrap: wrap;
}

.tool-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none !important;
  transition: all 0.2s ease;
  border: none;
  font-family: var(--font-body);
}

.tool-btn-preview {
  background: #082567 !important;
  color: #ffffff !important;
}

.tool-btn-preview:hover {
  background: #061a4d !important;
  color: #ffffff !important;
  transform: translateY(-1px);
}

.tool-btn-newpage {
  background: #ffffff !important;
  color: #082567 !important;
  border: 2px solid #082567 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-btn-newpage:hover {
  background: #f5f5f5 !important;
  color: #082567 !important;
  transform: translateY(-1px);
  text-decoration: none !important;
}

.tool-embed {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(8,37,103,0.15);
  border: 1px solid #e5e7eb;
}

.tool-embed-header {
  background: #082567;
  color: #ffffff !important;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
}

#tool-embed-title {
  color: #ffffff !important;
}

.tool-close-btn {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: #ffffff !important;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.tool-close-btn:hover {
  background: rgba(255,255,255,0.25);
}

#tool-iframe {
  width: 100%;
  height: 700px;
  display: block;
  background: #ffffff;
}

@media (max-width: 768px) {
  #tool-iframe {
    height: 500px;
  }
  .tool-actions {
    flex-direction: column;
  }
}
</style>

<script>
var tools = {
  'e-board': {
    title: '🎹 E-board',
    src: '/assets/tools/e-board.html'
  },
  'palta-maker': {
    title: '🎵 Alankar / Palta Maker',
    src: '/assets/tools/palta-maker.html'
  },
  'wordle-regex-solver': {
    title: '🎮 WORDLE Regex Solver',
    src: '/assets/tools/wordle-regex-solver.html'
  },
  'pdf-surgeon': {
    title: '📄 PDF Page Surgeon',
    src: '/assets/tools/pdf-surgeon.html'
  }
};

function openTool(id) {
  var tool = tools[id];
  if (!tool) return;
  document.getElementById('tool-embed-title').textContent = tool.title;
  document.getElementById('tool-iframe').src = tool.src;
  var embed = document.getElementById('tool-embed');
  embed.style.display = 'block';
  setTimeout(function() {
    embed.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function closeTool() {
  document.getElementById('tool-embed').style.display = 'none';
  document.getElementById('tool-iframe').src = '';
}
</script>
