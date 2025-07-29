const lazy = (() => {
  const directiveState = new WeakMap();
  return {
    bind(el, binding) {
      const state = {
        listener() {
          if (state.isLoading) {
            return;
          }
          window.requestAnimationFrame(() => {
            // event.preventDefault();
            const scrollPosition = el.scrollTop;

            if (
              // pseudo el is optional to add before after
              window.getComputedStyle(el).overflowY === 'visible' || // no i18n
              // Checking for upwards scrolling
              scrollPosition < state.previousPosition
            ) {
              state.previousPosition = scrollPosition;
              return;
            }

            let preemption;

            if (!isNaN(Number(binding.arg))) {
              preemption =
                // browser view (scroll height - scrolltop)
                el.scrollHeight - scrollPosition <
                el.clientHeight + Number(binding.arg);
            } else {
              preemption = el.scrollHeight - scrollPosition === el.clientHeight;
            }

            if (preemption && !state.isLoading) {
              state.isLoading = true;
              binding.value().then(() => {
                state.isLoading = false;
              });
            }
            state.previousPosition = scrollPosition;
          });
        },
        isLoading: false,
        previousPosition: 0,
      }; //state
      directiveState.set(el, state);
      el.addEventListener('scroll', state.listener, { passive: false });
    }, //bind
    unbind(el) {
      if (directiveState.has(el)) {
        const state = directiveState.get(el);
        el.removeEventListener('scroll', state.listener, { passive: false });
      }
    }, //unbind
  };
})();

export { lazy };
