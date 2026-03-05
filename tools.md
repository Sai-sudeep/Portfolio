<div class="intro-box">
  <h2>🛠️ Tools & Applications</h2>
  <p>I built this page because I used to rely on different websites and tools for small day-to-day tasks. Sometimes a site would have server issues, other times I would forget which one I had used earlier. So I started putting together a few simple tools in one place to make things easier. Hope you find these tools interesting and useful.</p>
</div>

<div class="tools-grid">

  <!-- Palta Maker Card -->
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

  <!-- Add more tool cards here in future -->

</div>

<!-- Tool Embed Area -->
<div class="tool-embed" id="tool-embed" style="display:none;">
  <div class="tool-embed-header">
    <span id="tool-embed-title"></span>
    <button class="tool-close-btn" onclick="closeTool()">✕ Close</button>
  </div>
  <iframe id="tool-iframe" src="" frameborder="0" allowfullscreen></iframe>
</div>
