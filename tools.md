<div class="intro-box">
  <h2>🛠️ Tools & Applications</h2>
  <p>I made this page because I often found myself depending on different websites and tools for small day-to-day tasks. Sometimes a site wouldn’t load, sometimes I’d forget which one I had used before, and things just became a bit inconvenient. So I started building a few simple tools for myself and keeping them in one place. This page is a small collection of those tools. Hopefully you’ll find them interesting and useful.</p>
</div>

<div class="tools-grid">

  <!-- Palta Maker Card -->
  <div class="tool-card">
    <div class="tool-icon">🎵</div>
    <div class="tool-info">
      <h3>Alankar / Palta Maker</h3>
      <p>A simple tool to generate Hindustani music practice patterns (alankars and paltas) using different swaras.</p>
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
