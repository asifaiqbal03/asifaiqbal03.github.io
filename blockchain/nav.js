// nav.js — Injects shared header, 3-bar slide drawer, and footer across all pages

document.addEventListener("DOMContentLoaded", () => {
  // 1. Determine active page for highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // 2. Inject Header + Drawer Markup
  const headerContainer = document.getElementById("site-header");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="sticky top-0 z-40 border-b border-brand-200/80 bg-white/95 backdrop-blur-md">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div class="flex items-center gap-4">
            <!-- 3-Bar Hamburger Button -->
            <button 
              id="menu-toggle-btn"
              type="button" 
              aria-label="Open Navigation Menu"
              aria-expanded="false"
              class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-brand-300 bg-brand-50 p-2 text-brand-900 transition-colors hover:bg-brand-100 focus:outline-none"
            >
              <span class="block h-0.5 w-6 bg-brand-900"></span>
              <span class="block h-0.5 w-6 bg-brand-900"></span>
              <span class="block h-0.5 w-6 bg-brand-900"></span>
            </button>

            <!-- Brand Logo -->
            <a href="index.html" class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded border border-brand-300 bg-brand-100 text-sm font-bold text-brand-800">QB</span>
              <span class="text-xl font-bold tracking-tight text-brand-900">Quinnipiac Blockchain</span>
            </a>
          </div>

          <a href="join.html" class="rounded bg-brand-600 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-700 transition-all">
            Join Club
          </a>
        </div>
      </header>

      <!-- Backdrop Overlay -->
      <div 
        id="drawer-backdrop" 
        class="fixed inset-0 z-40 bg-brand-900/40 opacity-0 pointer-events-none transition-opacity duration-300"
      ></div>

      <!-- Left Slide-Out Drawer -->
      <aside 
        id="drawer-nav" 
        class="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white border-r border-brand-200 shadow-2xl transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between"
      >
        <div class="p-6">
          <div class="flex items-center justify-between border-b border-brand-100 pb-4">
            <div class="flex items-center gap-2">
              <span class="flex h-8 w-8 items-center justify-center rounded border border-brand-300 bg-brand-100 text-xs font-bold text-brand-800">QB</span>
              <span class="text-lg font-bold text-brand-900">Navigation</span>
            </div>
            <button 
              id="close-drawer-btn" 
              type="button" 
              aria-label="Close Navigation Menu" 
              class="text-2xl text-brand-700 hover:text-brand-900 font-bold leading-none p-1"
            >
              ×
            </button>
          </div>

          <!-- Nav Links -->
          <nav class="mt-6 flex flex-col space-y-1 text-lg font-semibold text-brand-800">
            <a href="index.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'index.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">Home</a>
            <a href="about.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'about.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">About</a>
            <a href="activities.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'activities.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">What We Do</a>
            <a href="events.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'events.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">Events</a>
            <a href="values.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'values.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">Values</a>
            <a href="courses.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'courses.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">Courses</a>
            <a href="join.html" class="nav-item rounded px-3 py-2.5 transition-colors ${currentPath === 'join.html' ? 'bg-brand-100 text-brand-700' : 'hover:bg-brand-50 hover:text-brand-600'}">Connect & Join</a>
          </nav>
        </div>

        <div class="p-6 border-t border-brand-100 bg-brand-50/50">
          <p class="text-xs font-bold uppercase tracking-wider text-brand-700">Quinnipiac University</p>
          <p class="text-xs text-brand-600 mt-1">School of Business · Hamden, CT</p>
          <a href="join.html" class="mt-4 block w-full text-center rounded bg-brand-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-700 transition-all">
            Join Official Roster
          </a>
        </div>
      </aside>
    `;

    // Hook up drawer open/close listeners
    const menuBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("close-drawer-btn");
    const drawer = document.getElementById("drawer-nav");
    const backdrop = document.getElementById("drawer-backdrop");

    function openMenu() {
      drawer.classList.remove("-translate-x-full");
      backdrop.classList.remove("opacity-0", "pointer-events-none");
      backdrop.classList.add("opacity-100");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("overflow-hidden");
    }

    function closeMenu() {
      drawer.classList.add("-translate-x-full");
      backdrop.classList.add("opacity-0", "pointer-events-none");
      backdrop.classList.remove("opacity-100");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    }

    menuBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    backdrop?.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.classList.contains("-translate-x-full")) {
        closeMenu();
      }
    });
  }

  // 3. Inject Shared Footer
  const footerContainer = document.getElementById("site-footer");
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="border-t border-brand-200 bg-white py-12 text-base text-brand-800">
        <div class="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p class="text-lg font-bold text-brand-900">Quinnipiac Blockchain</p>
            <p class="text-sm text-brand-700 mt-1">School of Business · 275 Mount Carmel Ave, Hamden, CT 06518</p>
          </div>
          <nav class="flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-wider text-brand-800">
            <a href="about.html" class="hover:text-brand-600">About</a>
            <a href="activities.html" class="hover:text-brand-600">What We Do</a>
            <a href="events.html" class="hover:text-brand-600">Events</a>
            <a href="values.html" class="hover:text-brand-600">Values</a>
            <a href="courses.html" class="hover:text-brand-600">Courses</a>
            <a href="join.html" class="hover:text-brand-600">Join</a>
          </nav>
          <p class="text-xs uppercase tracking-wider text-brand-500">© 2026 QU BLOCKCHAIN</p>
        </div>
      </footer>
    `;
  }
});
