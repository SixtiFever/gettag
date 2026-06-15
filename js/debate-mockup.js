(function () {
  const takes = [
    {
      video: '/assets/debate-demo/jase_speech.mp4',
      avatar: '/assets/debate-demo/jase.webp',
      username: '@jase',
    },
    {
      video: '/assets/debate-demo/hayley_speech.mp4',
      avatar: '/assets/debate-demo/rosieavatar.webp',
      username: '@rosie',
    },
    {
      video: '/assets/debate-demo/reid_speech.mp4',
      avatar: '/assets/debate-demo/jeremy.webp',
      username: '@reed',
    },
  ];

  function initMockup(root) {
    const video = root.querySelector('[data-debate-video]');
    const usernameEl = root.querySelector('[data-debate-username]');
    const avatarEls = root.querySelectorAll('[data-debate-avatar]');
    const connectorEls = root.querySelectorAll('[data-debate-connector]');

    let activeTake = 0;

    function renderTake(index) {
      const take = takes[index];
      video.src = take.video;
      usernameEl.textContent = take.username;

      avatarEls.forEach((el, i) => {
        const isActive = i === index;
        el.className = `w-10 h-10 rounded-full overflow-hidden border-2 z-10 relative transition-colors ${
          isActive
            ? 'bg-azure-blue-500 border-azure-blue-400 shadow-sm shadow-azure-blue-500/50'
            : 'bg-azure-blue-800 border-azure-blue-700 shadow-sm'
        }`;
        const img = el.querySelector('img');
        if (img) {
          img.src = takes[i].avatar;
          img.alt = takes[i].username;
          img.className = `w-full h-full object-cover ${isActive ? '' : 'opacity-70'}`;
        }
      });

      connectorEls.forEach((connector, i) => {
        connector.className = `w-4 h-[2px] rounded-full ${index >= i + 1 ? 'bg-azure-blue-500/50' : 'bg-azure-blue-800'}`;
      });

      video.load();
      video.play().catch(() => {});
    }

    video.addEventListener('ended', () => {
      activeTake = (activeTake + 1) % takes.length;
      renderTake(activeTake);
    });

    renderTake(activeTake);
  }

  document.querySelectorAll('#debate-mockup, #audiences-mockup').forEach(initMockup);
})();
